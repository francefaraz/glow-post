# GlowPost Backend Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project
- (Optional) OpenAI API key for AI content generation

## Step 1: Install Dependencies

```bash
cd glowpost-backend
npm install
# or
yarn install
```

## Step 2: Set Up Environment Variables

Create a `.env` file in the `glowpost-backend` directory:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key

# OpenAI Configuration (optional - will use mock if not set)
OPENAI_API_KEY=your_openai_api_key

# Server Configuration
PORT=8080
```

### How to Get Supabase Credentials:

1. Go to [Supabase](https://supabase.com) and create a project
2. Go to Project Settings → API
3. Copy the `Project URL` (this is your `SUPABASE_URL`)
4. Copy the `anon public` key (this is your `SUPABASE_KEY`)

### How to Get OpenAI API Key (Optional):

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Create an account or sign in
3. Go to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

**Note:** If you don't provide an OpenAI API key, the generate endpoint will return mock responses for testing.

## Step 3: Set Up Database

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase.sql`
4. Run the SQL script to create all necessary tables:
   - `posts` - Stores generated posts
   - `schedule` - Stores scheduled posts
   - `brand_settings` - Stores brand configuration
   - `contact_messages` - Stores contact form submissions

## Step 4: Start the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:8080` (or the PORT you specified in `.env`)

## Step 5: Verify Installation

Test the health endpoint:
```bash
curl http://localhost:8080/health
```

You should receive: `{"status":"ok"}`

## API Endpoints

All endpoints are documented in `API_ENDPOINTS.md`

### Quick Test:

```bash
# Test creating a post
curl -X POST http://localhost:8080/api/posts \
  -H "Content-Type: application/json" \
  -d '{"content":"Test post","topic":"Testing","tone":"Friendly"}'

# Test getting all posts
curl http://localhost:8080/api/posts

# Test generating content
curl -X POST http://localhost:8080/api/generate \
  -H "Content-Type: application/json" \
  -d '{"topic":"Social media","tone":"Professional","keywords":"tech,innovation"}'
```

## Troubleshooting

### Error: "Missing SUPABASE_URL or SUPABASE_KEY"
- Make sure your `.env` file exists and contains the correct values
- Check that there are no extra spaces or quotes around the values

### Error: "relation does not exist"
- Make sure you've run the SQL script in Supabase SQL Editor
- Check that all tables were created successfully

### Error: "Connection refused" or "Network error"
- Verify your Supabase project is active
- Check that your Supabase URL and key are correct
- Ensure your Supabase project allows connections from your IP

### OpenAI API not working
- Check that your API key is valid
- Verify you have credits in your OpenAI account
- The endpoint will use mock responses if the API key is missing

## Next Steps

1. Connect your frontend to the backend by setting `NEXT_PUBLIC_API_URL=http://localhost:8080` in your frontend `.env`
2. Test all endpoints using the frontend or tools like Postman
3. Deploy the backend to a hosting service (Vercel, Railway, Render, etc.)

## Production Deployment

For production deployment:

1. Set up environment variables on your hosting platform
2. Update CORS settings if needed (currently allows all origins)
3. Consider adding authentication/authorization
4. Set up proper logging and monitoring
5. Configure rate limiting for API endpoints

