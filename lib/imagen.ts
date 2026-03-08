import { GoogleGenAI } from '@google/genai';
import type { ImageGenerationResult } from '@/lib/types';

const getVertexClient = () => {
  if (!process.env.GOOGLE_CLOUD_PROJECT) {
    throw new Error('GOOGLE_CLOUD_PROJECT is not set — Imagen requires Vertex AI credentials.');
  }
  return new GoogleGenAI({
    vertexai: true,
    project: process.env.GOOGLE_CLOUD_PROJECT,
    location: process.env.GOOGLE_CLOUD_REGION ?? 'us-central1',
  });
};

export async function generateMarketingImages(
  businessName: string,
  cuisineTypeEn: string,
  signatureDishes: string[],
  campaignThemeEn: string,
  toneOfVoice: string,
  count = 3
): Promise<ImageGenerationResult[]> {
  const ai = getVertexClient();
  const dishes = signatureDishes.slice(0, count);

  const results: ImageGenerationResult[] = [];
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  for (let idx = 0; idx < dishes.length; idx++) {
    const dish = dishes[idx];
    const prompt = `Professional food photography of ${dish}, ${cuisineTypeEn} cuisine, ${campaignThemeEn} campaign, ${toneOfVoice} aesthetic, warm natural lighting, vibrant colors, Malaysian restaurant, square format, Instagram-ready`;
      try {
        const response = await ai.models.generateImages({
          model: 'imagen-3.0-generate-002',
          prompt,
          config: { numberOfImages: 1, aspectRatio: '1:1' },
        });
        const imageBytes = response.generatedImages?.[0]?.image?.imageBytes;
        if (!imageBytes) throw new Error('No image bytes returned');
        // imageBytes is already a base64 string from the SDK — use directly
        results.push({
          id: `img-${idx + 1}`,
          base64Data: imageBytes,
          mimeType: 'image/jpeg',
          prompt,
        });
      // Wait 3 seconds instead of 1 second between requests to respect strict Vertex AI Imagen rate limits on base model
      if (idx < dishes.length - 1) {
        await delay(3000);
      }
    } catch (err) {
      console.error(`[imagen] Failed for dish "${dish}":`, err);
      // We don't throw, we just skip to allow partial completions instead of full failure
    }
  }

  return results;
}
