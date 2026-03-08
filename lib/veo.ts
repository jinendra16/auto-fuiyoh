import { GoogleGenAI, type GenerateVideosOperation } from '@google/genai';

const getVertexClient = () =>
  new GoogleGenAI({
    vertexai: true,
    project: process.env.GOOGLE_CLOUD_PROJECT!,
    location: process.env.GOOGLE_CLOUD_REGION ?? 'us-central1',
  });

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
  const ai = getVertexClient();

  const op = await ai.operations.getVideosOperation({
    operation: { name: operationName } as unknown as GenerateVideosOperation,
  });

  if (op.done) {
    if (op.error) {
      return { done: true, error: String(op.error.message ?? 'Video generation failed') };
    }
    const uri = op.response?.generatedVideos?.[0]?.video?.uri;
    return { done: true, videoUri: uri };
  }

  return { done: false };
}
