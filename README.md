# ⚡ Auto-Fuiyoh

Auto-Fuiyoh is an AI-powered marketing and brand transformation web platform built for Malaysian F&B SMEs. It takes a business's Google Maps URL or website URL, analyses their brand using Gemini, and generates a complete marketing campaign including a new website, social media posts, trilingual copy, and a 30-day content calendar.

## 🌐 Live Demo

**[https://auto-fuiyoh-app-953020365489.asia-southeast1.run.app](https://auto-fuiyoh-app-953020365489.asia-southeast1.run.app)**

## Features

- **Brand Analysis**: Scrapes and understands your business using Gemini.
- **Trilingual Copy**: Generates culturally relevant captions in Bahasa Malaysia, English, and Mandarin.
- **Instant Website**: Creates a modern, mobile-first website with AI-generated images via Imagen 3.
- **Content Calendar**: Auto-generates a 30-day posting calendar.
- **Social Media Assets**: Generates images (Imagen 3) and videos (Veo 2) tailored for Instagram and TikTok.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **AI Models**: Gemini 3.1 Flash, Imagen 3, Veo 2
- **Image Generation**: Vertex AI (Imagen 3.0)
- **Video Generation**: Vertex AI (Veo 2)
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Deployment**: Google Cloud Run + GitHub Actions CI/CD

## Local Development Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/jinendra16/auto-fuiyoh.git
   cd auto-fuiyoh
   ```

2. **Environment Variables**:
   Copy `.env.example` to `.env.local` and add your API keys:

   ```bash
   cp .env.example .env.local
   ```

   Required variables:
   - `GEMINI_API_KEY`: Your Google Gemini API key.
   - `GOOGLE_PLACES_API_KEY`: Your Google Places API key.
   - `GOOGLE_CLOUD_PROJECT`: Your GCP project ID (for Imagen/Veo).
   - `GOOGLE_APPLICATION_CREDENTIALS`: Path to your Vertex AI service account JSON.

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Run the Development Server**:

   ```bash
   npm run dev
   ```

5. **Open the App**:
   Navigate to `http://localhost:3000` in your browser.

## Cloud Run Deployment

This project includes a GitHub Actions CI/CD pipeline that automatically deploys to Google Cloud Run on every push to `main`.

### Prerequisites

1. A Google Cloud project with billing enabled.
2. [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) installed.
3. Authenticate: `gcloud auth login`

### One-Time Setup

```bash
# Set your project
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable secretmanager.googleapis.com run.googleapis.com artifactregistry.googleapis.com

# Store secrets
echo -n "your-gemini-api-key" | gcloud secrets create GEMINI_API_KEY --data-file=-
echo -n "your-places-api-key" | gcloud secrets create GOOGLE_PLACES_API_KEY --data-file=-

# Create Artifact Registry
gcloud artifacts repositories create auto-fuiyoh \
  --repository-format=docker \
  --location=asia-southeast1 \
  --description="Auto-Fuiyoh container images"

# Create service account for GitHub Actions
gcloud iam service-accounts create github-deployer \
  --display-name="GitHub Actions Deployer"

# Grant required roles
SA_EMAIL="github-deployer@YOUR_PROJECT_ID.iam.gserviceaccount.com"
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" --role="roles/run.admin"
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" --role="roles/artifactregistry.repoAdmin"
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" --role="roles/iam.serviceAccountUser"

# Set up Workload Identity Federation
gcloud iam workload-identity-pools create github-pool \
  --location="global" --display-name="GitHub Pool"

gcloud iam workload-identity-pools providers create-oidc github-provider \
  --location="global" --workload-identity-pool="github-pool" \
  --display-name="GitHub Provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --attribute-condition="assertion.repository == 'YOUR_GITHUB_USER/auto-fuiyoh'" \
  --issuer-uri="https://token.actions.githubusercontent.com"

# Bind service account to WIF pool
PROJECT_NUMBER=$(gcloud projects describe YOUR_PROJECT_ID --format='value(projectNumber)')
gcloud iam service-accounts add-iam-policy-binding ${SA_EMAIL} \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github-pool/attribute.repository/YOUR_GITHUB_USER/auto-fuiyoh"

# Grant Secret Manager access to Cloud Run runtime
COMPUTE_SA="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:${COMPUTE_SA}" --role="roles/secretmanager.secretAccessor"

# Get WIF Provider value (save this for GitHub Secrets)
gcloud iam workload-identity-pools providers describe github-provider \
  --location="global" --workload-identity-pool="github-pool" --format="value(name)"
```

### GitHub Secrets

Add the following secrets in your GitHub repo (`Settings → Secrets → Actions`):

| Secret Name           | Value                                                     |
| --------------------- | --------------------------------------------------------- |
| `WIF_PROVIDER`        | Output from the last command above                        |
| `WIF_SERVICE_ACCOUNT` | `github-deployer@YOUR_PROJECT_ID.iam.gserviceaccount.com` |

Once configured, every push to `main` will automatically build and deploy to Cloud Run.

## Usage

1. Paste a Google Maps link or website URL on the home page.
2. Wait for the AI to analyse the brand and generate a profile.
3. Review and edit the brand profile, then select a campaign goal.
4. View your generated website, images, videos, captions, and content calendar on the results dashboard.
