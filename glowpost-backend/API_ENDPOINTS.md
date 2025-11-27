# GlowPost Backend API Documentation

Base URL: `http://localhost:8080`

## Health Check
- `GET /health` - Returns `{ status: 'ok' }`

## Posts API (`/api/posts`)
- `POST /api/posts` - Create a new post
  - Body: `{ content (required), topic, tone, keywords, platform }`
  - Validates that content is not empty
  - Returns: Created post object (201)
  
- `GET /api/posts` - Get all posts (ordered by created_at DESC)
  - Returns: Array of posts
  
- `PUT /api/posts/:id` - Update a post
  - Body: `{ content?, topic?, tone?, keywords?, platform? }`
  - Validates that post exists and content is not empty if provided
  - Returns: Updated post object or 404 if not found
  
- `DELETE /api/posts/:id` - Delete a post
  - Validates that post exists before deletion
  - Returns: `{ success: true }` or 404 if not found

## Schedule API (`/api/schedule`)
- `POST /api/schedule` - Create a scheduled post
  - Body: `{ post_id (required), scheduled_time (required), platform }`
  - Validates that post exists before creating schedule
  - Returns: Created schedule object (201)
  
- `GET /api/schedule` - Get all scheduled posts (ordered by scheduled_time ASC)
  - Returns: Array of scheduled posts with full post data included
  
- `DELETE /api/schedule/:id` - Delete a scheduled post
  - Validates that schedule exists before deletion
  - Returns: `{ success: true }` or 404 if not found

## Brand Settings API (`/api/brand`)
- `POST /api/brand` - Create/Update brand settings (upserts with id=1)
  - Body: `{ tone, keywords, brand_color, brand_name, brand_voice, target_audience }`
  - Returns: Brand settings object
  
- `GET /api/brand` - Get brand settings
  - Returns: Brand settings object or `null`

## Templates API (`/api/templates`)
- `GET /api/templates` - Get all templates
  - Returns: Array of template objects with id, title, price_inr, price_usd, description
  
- `GET /api/templates/:id` - Get a specific template
  - Returns: Template object or 404

## Pricing API (`/api/pricing`)
- `GET /api/pricing` - Get pricing information
  - Returns: `{ inr: { pro: 199, agency: 799 }, usd: { pro: 2.99, agency: 9.99 } }`

## Contact API (`/api/contact`)
- `POST /api/contact` - Submit contact form
  - Body: `{ name (required), email (required), message (required) }`
  - Validates email format
  - Stores message in database
  - Returns: `{ success: true, id: message_id }` (201)

## Generate API (`/api/generate`)
- `POST /api/generate` - Generate AI content
  - Body: `{ topic?, tone?, keywords? }`
  - Automatically uses brand settings if available (tone, keywords, brand_voice, target_audience)
  - Falls back to provided values or defaults if brand settings don't exist
  - Returns: `{ result: "generated text" }`
  - Uses OpenAI API (falls back to mock if API key not set)

