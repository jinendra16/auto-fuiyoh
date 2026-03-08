require('dotenv').config({path: '.env.local'});
const { GoogleGenAI } = require('@google/genai');

async function test() {
  const ai = new GoogleGenAI({
    vertexai: true,
    project: process.env.GOOGLE_CLOUD_PROJECT,
    location: process.env.GOOGLE_CLOUD_REGION ?? 'us-central1',
  });

  const operationName = 'projects/auto-fuyioh/locations/us-central1/publishers/google/models/veo-2.0-generate-001/operations/2b95deb9-cb88-4c8b-9d2c-82b6863910e8';

  const dummyOp = {
    name: operationName,
    _fromAPIResponse: ({ apiResponse }) => apiResponse
  };

  try {
    const rawOperation = await ai.operations.getVideosOperation({ operation: dummyOp });
    console.log('Success:', JSON.stringify(rawOperation, null, 2).substring(0, 500));
    
    if (rawOperation.response && rawOperation.response.predictOperationResponse) {
        // Vertex AI often nests the payload? 
    }
  } catch(e) {
    console.error('Error:', e);
  }
}
test();
