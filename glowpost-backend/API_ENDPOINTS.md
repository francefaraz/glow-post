# GlowPost Backend API Documentation

Base URL: `http://localhost:8080`

## Health Check
- `GET /health` - Returns `{ status: 'ok' }`

## Posts API (`/api/posts`)
- `POST /api/posts` - Create a new post
  - Body: `{ content, topic, tone, keywords, platform }`
  - Returns: Created post object
  
- `GET /api/posts` - Get all posts (ordered by created_at DESC)
  - Returns: Array of posts
  
- `PUT /api/posts/:id` - Update a post
  - Body: `{ content?, topic?, tone?, keywords?, platform? }`
  - Returns: Updated post object
  
- `DELETE /api/posts/:id` - Delete a post
  - Returns: `{ success: true }`

## Schedule API (`/api/schedule`)
- `POST /api/schedule` - Create a scheduled post
  - Body: `{ post_id, scheduled_time, platform }`
  - Returns: Created schedule object
  
- `GET /api/schedule` - Get all scheduled posts (ordered by scheduled_time ASC)
  - Returns: Array of scheduled posts
  
- `DELETE /api/schedule/:id` - Delete a scheduled post
  - Returns: `{ success: true }`

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
  - Body: `{ name, email, message }`
  - Returns: `{ success: true }`
  - Note: Currently just logs to console

## Generate API (`/api/generate`)
- `POST /api/generate` - Generate AI content
  - Body: `{ topic?, tone?, keywords? }`
  - Returns: `{ result: "generated text" }`
  - Uses OpenAI API (falls back to mock if API key not set)

