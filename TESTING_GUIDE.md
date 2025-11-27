# 🧪 GlowPost AI App - Complete Testing Guide

## 📋 Understanding Your Requirements

Based on your app structure, here's what I understand:

### **GlowPost AI App** - Social Media Content Creation Platform

**Core Features:**
1. ✅ **AI Content Generation** - Generate social media posts using OpenAI
2. ✅ **Post Management** - Create, save, edit, and delete posts
3. ✅ **Post Scheduling** - Schedule posts for future publishing
4. ✅ **Brand Settings** - Customize brand voice, tone, keywords, and colors
5. ✅ **Calendar View** - Visual calendar showing scheduled posts
6. ✅ **Contact Form** - Submit inquiries and messages
7. ✅ **Templates** - Browse and purchase content templates
8. ✅ **Pricing** - View pricing plans (Free, Pro, Agency)

---

## 🚀 Pre-Testing Setup

### Step 1: Verify Backend Setup

```bash
cd glowpost-backend

# Check if .env file exists and has all required variables
cat .env
```

**Required variables:**
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_key
PORT=8080
```

### Step 2: Verify Database Setup

1. Go to Supabase Dashboard → SQL Editor
2. Verify these tables exist:
   - `posts`
   - `schedule`
   - `brand_settings`
   - `contact_messages`

### Step 3: Start Backend Server

```bash
cd glowpost-backend
npm run dev
```

**Expected output:**
```
GlowPost backend running on port 8080
```

**Test backend health:**
```bash
curl http://localhost:8080/health
# Should return: {"status":"ok"}
```

### Step 4: Verify Frontend Setup

```bash
cd glowpost-frontend

# Check if .env.local exists
cat .env.local
```

**Required variable:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Step 5: Start Frontend Server

```bash
cd glowpost-frontend
npm run dev
```

**Expected output:**
```
- ready started server on 0.0.0.0:3000
- Local: http://localhost:3000
```

---

## ✅ Complete Testing Checklist

### 🎯 Test 1: Backend Health Check

**Objective:** Verify backend is running

**Steps:**
1. Open browser: `http://localhost:8080/health`
2. Or use terminal: `curl http://localhost:8080/health`

**Expected Result:**
```json
{"status":"ok"}
```

**✅ Pass Criteria:** Returns status "ok"

---

### 🎯 Test 2: AI Content Generation

**Objective:** Test OpenAI integration for generating posts

**Steps:**
1. Navigate to: `http://localhost:3000/create-post`
2. Enter a topic: "Summer Sale"
3. Enter keywords: "discount, sale, summer"
4. Select tone: "Sales"
5. Click "Generate Post" button
6. Wait for generation (should show loading spinner)

**Expected Results:**
- ✅ Loading spinner appears
- ✅ AI-generated content appears in preview
- ✅ Content is relevant to topic/keywords/tone
- ✅ Toast notification: "Content generated successfully!"

**❌ If fails:**
- Check browser console for errors
- Check backend logs for OpenAI API errors
- Verify `OPENAI_API_KEY` in backend `.env`
- Check OpenAI account has credits

**Test without API key:**
- Remove `OPENAI_API_KEY` from `.env`
- Should show mock response with note

---

### 🎯 Test 3: Save Post

**Objective:** Test saving generated content

**Steps:**
1. After generating content (Test 2)
2. Click "Save Post" button
3. Wait for save confirmation

**Expected Results:**
- ✅ Loading state on button
- ✅ Toast notification: "Post saved successfully!"
- ✅ Form resets (topic, keywords cleared)
- ✅ Generated content cleared

**Verify in database:**
- Go to Supabase → Table Editor → `posts`
- Should see new entry with your content

---

### 🎯 Test 4: View Saved Posts

**Objective:** Test fetching and displaying saved posts

**Steps:**
1. Navigate to: `http://localhost:3000/saved-posts`
2. Wait for posts to load

**Expected Results:**
- ✅ Loading spinner appears initially
- ✅ All saved posts display in cards
- ✅ Each post shows: topic, content, tone, date
- ✅ Edit and Delete buttons visible

**If no posts:**
- ✅ Shows empty state message
- ✅ "No saved posts yet. Create your first post!"

---

### 🎯 Test 5: Edit Post

**Objective:** Test inline editing of posts

**Steps:**
1. Go to Saved Posts page
2. Click Edit button (pencil icon) on any post
3. Modify the content in textarea
4. Click "Save" button
5. Click "Cancel" button (test this too)

**Expected Results:**
- ✅ Textarea appears with current content
- ✅ Save button updates post
- ✅ Toast: "Post updated successfully!"
- ✅ Cancel button closes edit mode
- ✅ Updated content reflects in list

**Verify in database:**
- Check Supabase `posts` table - content should be updated

---

### 🎯 Test 6: Delete Post

**Objective:** Test post deletion

**Steps:**
1. Go to Saved Posts page
2. Click Delete button (trash icon) on any post
3. Confirm deletion in browser dialog
4. Cancel deletion (test this too)

**Expected Results:**
- ✅ Confirmation dialog appears
- ✅ Post removed from list after confirmation
- ✅ Toast: "Post deleted successfully!"
- ✅ Cancel keeps post in list

**Verify in database:**
- Post should be removed from `posts` table

---

### 🎯 Test 7: Brand Settings - Load

**Objective:** Test loading existing brand settings

**Steps:**
1. Navigate to: `http://localhost:3000/brand-settings`
2. Wait for page to load

**Expected Results:**
- ✅ Loading spinner appears initially
- ✅ If settings exist: fields populated with saved values
- ✅ If no settings: fields show defaults

---

### 🎯 Test 8: Brand Settings - Save

**Objective:** Test saving brand settings

**Steps:**
1. Go to Brand Settings page
2. Fill in fields:
   - Brand Name: "My Brand"
   - Default Tone: "Professional"
   - Brand Keywords: "innovative, premium, quality"
   - Brand Voice: "Friendly and approachable"
   - Target Audience: "Young professionals aged 25-35"
   - Brand Color: Pick a color (e.g., #3B82F6)
3. Click "Save Brand Settings"

**Expected Results:**
- ✅ Loading state on button
- ✅ Toast: "Brand settings saved successfully!"
- ✅ Settings persist after page refresh

**Verify in database:**
- Check Supabase `brand_settings` table
- Should have one row with id=1

---

### 🎯 Test 9: Brand Settings Integration with AI

**Objective:** Test that brand settings affect AI generation

**Steps:**
1. Save brand settings (Test 8)
2. Go to Create Post page
3. Enter topic: "New Product Launch"
4. Leave tone/keywords empty (or use different values)
5. Click "Generate Post"

**Expected Results:**
- ✅ Generated content uses brand settings
- ✅ Tone matches brand default tone
- ✅ Keywords include brand keywords
- ✅ Content reflects brand voice and target audience

---

### 🎯 Test 10: Schedule Post

**Objective:** Test scheduling a post

**Steps:**
1. Ensure you have at least one saved post
2. Navigate to: `http://localhost:3000/scheduler`
3. Wait for posts to load in dropdown
4. Select a post from dropdown
5. Select a future date
6. Select a time
7. Click "Save Schedule"

**Expected Results:**
- ✅ Post dropdown populated with saved posts
- ✅ Date and time pickers work
- ✅ Loading state on save button
- ✅ Toast: "Schedule created successfully!"
- ✅ Form resets
- ✅ New schedule appears in "Upcoming Scheduled Posts"

**Verify in database:**
- Check Supabase `schedule` table
- Should see new entry with post_id and scheduled_time

---

### 🎯 Test 11: View Scheduled Posts

**Objective:** Test viewing all scheduled posts

**Steps:**
1. Go to Scheduler page
2. Scroll to "Upcoming Scheduled Posts" section

**Expected Results:**
- ✅ All scheduled posts listed
- ✅ Shows post title/topic
- ✅ Shows date and time
- ✅ Ordered by scheduled time (earliest first)
- ✅ Delete button visible for each

**If no schedules:**
- ✅ Shows "No scheduled posts yet"

---

### 🎯 Test 12: Delete Schedule

**Objective:** Test removing a scheduled post

**Steps:**
1. Go to Scheduler page
2. Find a scheduled post
3. Click delete button (trash icon)
4. Confirm deletion

**Expected Results:**
- ✅ Confirmation dialog
- ✅ Schedule removed from list
- ✅ Toast: "Schedule deleted successfully!"

---

### 🎯 Test 13: Calendar View

**Objective:** Test calendar display of scheduled posts

**Steps:**
1. Ensure you have scheduled posts
2. Navigate to: `http://localhost:3000/calendar`
3. Wait for calendar to load
4. Look for dates with purple dots (scheduled dates)
5. Click on a scheduled date

**Expected Results:**
- ✅ Loading spinner initially
- ✅ Calendar displays current month
- ✅ Scheduled dates have purple dots
- ✅ Clicking date opens modal
- ✅ Modal shows schedule details (post title, time, content preview)
- ✅ Can navigate between months

**Test month navigation:**
- Click previous/next month arrows
- Scheduled dates should update for that month

---

### 🎯 Test 14: Contact Form

**Objective:** Test contact form submission

**Steps:**
1. Navigate to: `http://localhost:3000/contact`
2. Fill in form:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Message: "Test message"
3. Click "Send Message"

**Expected Results:**
- ✅ Form validation works (try submitting empty)
- ✅ Loading state on button
- ✅ Toast: "Message sent successfully!"
- ✅ Form resets after success

**Verify in database:**
- Check Supabase `contact_messages` table
- Should see new entry

**Test validation:**
- Try invalid email format
- Try empty fields
- Should show error messages

---

### 🎯 Test 15: Templates Page

**Objective:** Test templates display

**Steps:**
1. Navigate to: `http://localhost:3000/templates`

**Expected Results:**
- ✅ Template cards display
- ✅ Shows title, price (INR/USD), description
- ✅ Preview and Buy buttons visible

**Note:** Currently uses mock data from backend

---

### 🎯 Test 16: Pricing Page

**Objective:** Test pricing display

**Steps:**
1. Navigate to: `http://localhost:3000/pricing`

**Expected Results:**
- ✅ Three pricing tiers: Free, Pro, Agency
- ✅ Currency switcher (INR/USD) works
- ✅ Features listed for each tier
- ✅ Prices update based on currency

---

### 🎯 Test 17: Error Handling

**Objective:** Test error scenarios

**Test Cases:**

1. **Backend offline:**
   - Stop backend server
   - Try any API call
   - Should show error toast

2. **Invalid data:**
   - Try saving post without content
   - Should show validation error

3. **Network error:**
   - Disconnect internet
   - Try generating content
   - Should show network error

4. **404 errors:**
   - Try editing non-existent post
   - Should show "Post not found" error

---

### 🎯 Test 18: Responsive Design

**Objective:** Test mobile/tablet views

**Steps:**
1. Open browser DevTools (F12)
2. Toggle device toolbar
3. Test on different screen sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)

**Expected Results:**
- ✅ All pages responsive
- ✅ Navigation works on mobile
- ✅ Forms usable on small screens
- ✅ Calendar displays properly

---

## 🐛 Common Issues & Solutions

### Issue 1: Backend not starting
**Symptoms:** Port 8080 already in use
**Solution:**
```bash
# Find process using port 8080
lsof -i :8080
# Kill process
kill -9 <PID>
# Or change PORT in .env
```

### Issue 2: CORS errors
**Symptoms:** Browser console shows CORS errors
**Solution:** Backend already has CORS enabled. Check backend is running.

### Issue 3: Database connection errors
**Symptoms:** "Missing SUPABASE_URL or SUPABASE_KEY"
**Solution:** 
- Check `.env` file exists in backend
- Verify credentials are correct
- Restart backend server

### Issue 4: OpenAI not working
**Symptoms:** Mock responses instead of AI content
**Solution:**
- Check `OPENAI_API_KEY` in backend `.env`
- Verify key is valid
- Check OpenAI account has credits
- Restart backend server

### Issue 5: Frontend can't connect to backend
**Symptoms:** Network errors in browser console
**Solution:**
- Check `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- Verify backend is running on correct port
- Check firewall settings

---

## 📊 Testing Summary

### ✅ Core Features (Must Work)
- [ ] AI Content Generation
- [ ] Save Posts
- [ ] View Saved Posts
- [ ] Edit Posts
- [ ] Delete Posts
- [ ] Schedule Posts
- [ ] View Schedules
- [ ] Brand Settings Save/Load
- [ ] Calendar View
- [ ] Contact Form

### ✅ Additional Features
- [ ] Templates Display
- [ ] Pricing Display
- [ ] Error Handling
- [ ] Loading States
- [ ] Toast Notifications
- [ ] Responsive Design

---

## 🎯 Quick Test Script

Run this to test all endpoints quickly:

```bash
# Test backend health
curl http://localhost:8080/health

# Test create post
curl -X POST http://localhost:8080/api/posts \
  -H "Content-Type: application/json" \
  -d '{"content":"Test post","topic":"Testing"}'

# Test get posts
curl http://localhost:8080/api/posts

# Test generate
curl -X POST http://localhost:8080/api/generate \
  -H "Content-Type: application/json" \
  -d '{"topic":"Test","tone":"Friendly"}'
```

---

## 📝 Notes

- All tests should be done in order (some depend on previous tests)
- Keep browser DevTools open to see console errors
- Check backend terminal for server logs
- Verify database changes in Supabase dashboard
- Test both success and error scenarios

---

## ✅ Sign-Off Checklist

Before considering testing complete:

- [ ] All core features work end-to-end
- [ ] No console errors in browser
- [ ] No errors in backend logs
- [ ] Database operations work correctly
- [ ] Error handling works properly
- [ ] UI is responsive
- [ ] Loading states work
- [ ] Toast notifications appear
- [ ] Forms validate correctly
- [ ] Data persists after page refresh

---

**Happy Testing! 🚀**

