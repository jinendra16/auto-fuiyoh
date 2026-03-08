import { GoogleGenAI, type GenerateVideosOperation } from '@google/genai';

const getVertexClient = () => {
  if (!process.env.GOOGLE_CLOUD_PROJECT) {
    throw new Error('GOOGLE_CLOUD_PROJECT is not set — Veo 2 requires Vertex AI credentials.');
  }
  return new GoogleGenAI({
    vertexai: true,
    project: process.env.GOOGLE_CLOUD_PROJECT,
    location: process.env.GOOGLE_CLOUD_REGION ?? 'us-central1',
  });
};

export async function startVideoGeneration(
  businessName: string,
  cuisineTypeEn: string,
  signatureDishes: string[],
  campaignThemeEn: string,
  toneOfVoice: string
): Promise<{ operationName: string; prompt: string }> {
  const ai = getVertexClient();
  const dish = signatureDishes[0] ?? 'signature dish';
  const prompt = `8-second vertical social media video for ${businessName} ${cuisineTypeEn} restaurant, showcasing ${dish}, ${campaignThemeEn}, ${toneOfVoice} style, cinematic, warm lighting, TikTok/Reels format`;

  const operation = await ai.models.generateVideos({
    model: 'veo-2.0-generate-001',
    prompt,
    config: {
      aspectRatio: '9:16',
      durationSeconds: 8,
    },
  });

  return { operationName: operation.name ?? '', prompt };
}

export async function pollVideoOperation(
  operationName: string
): Promise<{ done: boolean; videoUri?: string; error?: string }> {
  try {
    const ai = getVertexClient();

    // Mock the operation object to bypass the '@google/genai' SDK requirement
    // for _fromAPIResponse, so we can directly access the raw JSON payload.
    const dummyOp = {
      name: operationName,
      _fromAPIResponse: ({ apiResponse }: any) => apiResponse
    } as unknown as GenerateVideosOperation;

    const op = await ai.operations.getVideosOperation({ operation: dummyOp }) as any;

    if (op.done) {
      if (op.error) {
        return { done: true, error: op.error.message || 'Unknown video generation error' };
      }
      
      const base64Bytes = op.response?.videos?.[0]?.bytesBase64Encoded;
      if (base64Bytes) {
        return { done: true, videoUri: `data:video/mp4;base64,${base64Bytes}` };
      }
      return { done: true, error: 'No video bytes returned from Vertex AI' };
    }

    return { done: false };
  } catch (error: any) {
    console.error('[veo] Status check failed:', error);
    return { done: true, error: error.message };
  }
}
