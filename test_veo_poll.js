const { GoogleAuth } = require('google-auth-library');

async function test() {
  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();

  const operationName = "projects/auto-fuyioh/locations/us-central1/publishers/google/models/veo-2.0-generate-001/operations/2b95deb9-cb88-4c8b-9d2c-82b6863910e8";
  
  // Try v1beta1
  let url = `https://us-central1-aiplatform.googleapis.com/v1beta1/${operationName}`;
  console.log('Testing', url);
  let res = await fetch(url, { headers: { Authorization: `Bearer ${token.token}` } });
  console.log('v1beta1 status:', res.status, await res.text());

  // Try v1
  url = `https://us-central1-aiplatform.googleapis.com/v1/${operationName}`;
  console.log('Testing', url);
  res = await fetch(url, { headers: { Authorization: `Bearer ${token.token}` } });
  console.log('v1 status:', res.status, await res.text());
}
test();
