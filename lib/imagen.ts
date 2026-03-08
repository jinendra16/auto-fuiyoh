import { GoogleGenAI } from '@google/genai';
import type { ImageGenerationResult } from '@/lib/types';

const getVertexClient = () =>
  new GoogleGenAI({
    vertexai: true,
    project: process.env.GOOGLE_CLOUD_PROJECT!,
    location: process.env.GOOGLE_CLOUD_REGION ?? 'us-central1',
  });

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

  const results = await Promise.all(
    dishes.map(async (dish, idx) => {
      const prompt = `Professional food photography of ${dish}, ${cuisineTypeEn} cuisine, ${campaignThemeEn} campaign, ${toneOfVoice} aesthetic, warm natural lighting, vibrant colors, Malaysian restaurant, square format, Instagram-ready`;
      try {
        const response = await ai.models.generateImages({
          model: 'imagen-3.0-generate-002',
          prompt,
          config: {
            numberOfImages: 1,
            aspectRatio: '1:1',
            outputMimeType: 'image/png',
          },
        });
        const imageBytes = response.generatedImages?.[0]?.image?.imageBytes;
        if (!imageBytes) throw new Error('No image bytes returned');
        const base64Data = Buffer.from(imageBytes).toString('base64');
        return {
          id: `img-${idx + 1}`,
          base64Data,
          mimeType: 'image/png',
          prompt,
        } satisfies ImageGenerationResult;
      } catch (err) {
        console.error(`[imagen] Failed to generate image for dish "${dish}":`, err);
        throw err;
      }
    })
  );

  return results;
}
