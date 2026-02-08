# Multi-API Dashboard - Activity 03 - Discovery Challenge

Welcome to the ultimate API integration challenge! This template teaches you to work with multiple APIs simultaneously, combining data from different sources to create a rich, interactive dashboard.

## 🎯 Learning Objectives

By completing this activity, you will:
- Master multiple API authentication methods (path-based and query-based)
- Coordinate parallel API calls with Promise.all()
- Handle mixed success/failure scenarios across services
- Build secure API key management systems
- Create unified dashboards combining multiple data sources
- Implement professional error handling across different APIs

## 🚀 Getting Started

### ⚡ Quick Start (See Results in 30 Seconds!)

**IMPORTANT: This template includes WORKING UI and helper functions! You can test the interface immediately:**

1. **Navigate to this folder** in your terminal/command prompt
2. **Start a local server** (choose one):
   ```bash
   # Mac/Linux:
   python3 -m http.server 8000

   # Windows:
   python -m http.server 8000

   # Alternative using Node.js:
   npx http-server -p 8000
   ```
3. **Open your browser** to: http://localhost:8000
4. **You'll see the dashboard interface** with 5 API panels ready to configure

### 🔑 Phase 1: API Setup (Required)

Before implementing the TODOs, you need to obtain free API keys from these services:

#### 1. Superhero API
- Visit: [superheroapi.com](https://superheroapi.com/)
- **Time to activate:** Instant
- **Features:** Superhero data, powers, stats, images
- **Rate limit:** Generous for learning

#### 2. NASA API ⚠️ IMPORTANT: Get Your Own API Key
- Visit: [api.nasa.gov](https://api.nasa.gov/)
- **Time to activate:** Instant (email delivery)
- **DEMO_KEY Limitations:** Only 30 requests/hour (shared across all users)
- **Free API Key:** 1000 requests/hour (much better for development!)
- **How to Get Your Key:**
  1. Go to https://api.nasa.gov/
  2. Fill out the simple form (30 seconds)
  3. Check your email for the API key
  4. Replace `DEMO_KEY` in the code with your key
- **Features:** Space images, Mars rover photos, astronomy data

#### 3. GIPHY API ⚠️ Rate Limits Apply
- Visit: [developers.giphy.com](https://developers.giphy.com/)
- **Time to activate:** Instant
- **Free Tier:** 100 API calls per hour (beta keys)
- **Features:** GIF search, trending, random GIFs
- **Rating filters:** G, PG, PG-13, R
- **Note:** If you see authentication errors, you may need to upgrade from beta key

#### 4. TMDB (The Movie Database)
- Visit: [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
- **Time to activate:** Usually instant
- **Features:** Movie search, popular films, ratings, images

### 🎯 What's Already Working

**65% of the code is implemented for you:**
- ✅ Complete UI with tabbed navigation (fully working)
- ✅ API key management with localStorage (fully working)
- ✅ Loading states and error handling utilities (fully working)
- ✅ Display functions for all 4 APIs (fully working)
- ✅ Tab switching and configuration panel (fully working)
- ⚠️ Superhero API integration (3 functions TODO)
- ⚠️ NASA API integration (4 functions TODO)
- ⚠️ GIPHY API integration (4 functions TODO)
- ⚠️ TMDB API integration (4 functions TODO)
- ⚠️ Multi-API dashboard features (2 functions TODO)

### 📝 Your Learning Tasks

1. **First, explore the working UI** to understand the dashboard structure
2. **Configure your API keys** in the settings panel
3. **Complete TODO 1-4** to integrate each API individually
4. **Complete TODO 5** to combine all APIs into unified dashboards
5. **Test edge cases** like invalid keys, network errors, and empty results

## 📋 Tasks to Complete

### TODO 1: Superhero API Integration (Medium)
Complete 3 functions to integrate the Superhero API using path-based authentication.

**Functions to implement:**
1. `testSuperheroAPI()` - Validate API key works
2. `searchSuperhero()` - Search heroes by name
3. `getRandomSuperhero()` - Get random hero (ID range: 1-731)

**API Endpoint Pattern:**
```javascript
// Path-based authentication (key in URL)
`https://superheroapi.com/api/${apiKey}/search/${heroName}`
`https://superheroapi.com/api/${apiKey}/${heroId}`
```

**Success Criteria:**
- Test button shows "Connected!" with valid API key
- Search displays hero card with image, stats, and biography
- Random button generates different heroes each time
- Error handling works for invalid API keys and search terms

**Key Learning:** Path-based authentication (key embedded in URL path)

---

### TODO 2: NASA API Integration (Medium)
Complete 4 functions to integrate NASA's space image APIs using query parameter authentication.

**Functions to implement:**
1. `testNASAAPI()` - Validate API key (or use DEMO_KEY)
2. `getNASAImage()` - Get astronomy image for specific date
3. `getTodaysNASAImage()` - Get today's space image
4. `getMarsPhotos()` - Get Mars rover photos

**API Endpoint Pattern:**
```javascript
// Query parameter authentication (key as ?api_key=)
`https://api.nasa.gov/planetary/apod?api_key=${key}&date=${date}`
`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${key}`
```

**Success Criteria:**
- Test button validates API connection
- Date picker fetches historical space images
- Today's image button shows current APOD
- Mars photos display rover images correctly
- Both DEMO_KEY and real keys work

**Key Learning:** Query parameter authentication and multiple parameter chaining

---

### TODO 3: GIPHY API Integration (Medium)
Complete 4 functions to integrate GIPHY's media API with content filtering.

**Functions to implement:**
1. `testGiphyAPI()` - Validate API key
2. `searchGIFs()` - Search GIFs by term
3. `getTrendingGIFs()` - Get trending GIFs
4. `getRandomGIF()` - Get random GIF

**API Endpoint Pattern:**
```javascript
// Query parameters with content filtering
`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${query}&limit=12&rating=g`
`https://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=12&rating=g`
```

**Success Criteria:**
- Test button confirms API connection
- Search displays grid of 12 GIFs
- Trending button shows current popular GIFs
- Random button gets single random GIF
- All content filtered to G-rating

**Key Learning:** Media API integration and content filtering

---

### TODO 4: TMDB (Movie Database) API Integration (Medium)
Complete 4 functions to integrate TMDB's movie database API.

**Functions to implement:**
1. `testTMDBAPI()` - Validate API key
2. `searchMovies()` - Search movies by title
3. `getPopularMovies()` - Get popular movies
4. `getNowPlaying()` - Get currently playing movies

**API Endpoint Pattern:**
```javascript
// Movie database with image CDN
`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}`
`https://api.themoviedb.org/3/movie/popular?api_key=${key}&page=1`

// Image URLs (prepend to poster_path)
`https://image.tmdb.org/t/p/w300${movie.poster_path}`
```

**Success Criteria:**
- Test button validates TMDB connection
- Search displays movie posters and info
- Popular movies button shows top films
- Now Playing shows current releases
- Movie ratings display correctly

**Key Learning:** Working with CDN image URLs and paginated data

---

### TODO 5: Multi-API Dashboard Integration (Advanced)
Complete 2 advanced functions that combine data from all APIs simultaneously.

**Functions to implement:**
1. `createRandomDashboard()` - Fetch random data from all 4 APIs in parallel
2. `createThemedDashboard()` - Create themed content across all APIs

**Key Concepts to Master:**
```javascript
// Parallel API calls with Promise.all()
const [hero, space, gifs, movies] = await Promise.all([
  getRandomSuperhero(),
  getTodaysNASAImage(),
  getRandomGIF(),
  getPopularMovies()
]);

// Error handling with Promise.allSettled()
const results = await Promise.allSettled([...apiCalls]);
const successes = results.filter(r => r.status === 'fulfilled');
const failures = results.filter(r => r.status === 'rejected');
```

**Success Criteria:**
- Random dashboard combines all 4 APIs successfully
- Themed dashboard searches all APIs with same keyword
- Parallel loading shows multi-spinner animation
- Partial failures handled gracefully (show what works)
- Dashboard displays in unified grid layout

**Key Learning:** Promise.all(), Promise.allSettled(), and coordinating multiple async operations

## 🛠 Helper Functions Already Included

### Display Functions (Fully Implemented)
You don't need to write these - they're already working! Just call them with your API data:

```javascript
displaySuperhero(hero)    // Formats superhero card with stats
displayNASAImage(data)    // Formats space image with description
displayGIFs(gifs)         // Creates GIF grid layout
displayMovies(movies)     // Creates movie poster grid
```

### Utility Functions (Fully Implemented)
```javascript
showLoading(message)      // Shows loading spinner with custom message
hideLoading()             // Hides loading spinner
showError(message)        // Shows error toast for 5 seconds
saveKeys()                // Saves API keys to localStorage
updateConfigStatus()      // Updates API configuration progress bar
```

## 🧪 Testing Your Work

### Manual Testing Checklist

**Superhero API:**
- [ ] Test button validates connection
- [ ] Search works with hero names (try "batman", "superman")
- [ ] Random hero button shows different heroes
- [ ] Invalid API key shows error message

**NASA API:**
- [ ] Test button validates connection (DEMO_KEY works)
- [ ] Date picker fetches historical images
- [ ] Today's button shows current space image
- [ ] Mars photos display correctly

**GIPHY API:**
- [ ] Test button validates connection
- [ ] Search displays 12 GIFs in grid
- [ ] Trending button shows popular GIFs
- [ ] Random button gets single GIF

**TMDB API:**
- [ ] Test button validates connection
- [ ] Movie search works (try "avengers", "inception")
- [ ] Popular movies button displays top films
- [ ] Now Playing shows current releases

**Multi-API Dashboard:**
- [ ] Random dashboard combines all 4 APIs
- [ ] Themed dashboard searches all APIs with keyword
- [ ] Parallel loading animation appears
- [ ] Partial failures handled gracefully

### Debugging Tips
1. **Open Developer Tools** (F12 in most browsers)
2. **Check Console tab** for detailed error messages and API responses
3. **Use Network tab** to inspect API requests and status codes
4. **Test one API at a time** before attempting multi-API features
5. **Verify API keys** in the configuration panel before testing

### Common Issues & Solutions

**Issue:** "Please configure your API key first!"
**Solution:** Enter your API key in the configuration panel and click away from the input to save

**Issue:** API test fails with 401 Unauthorized
**Solution:** Double-check your API key is correct and hasn't expired

**Issue:** CORS errors in console
**Solution:** Make sure you're using a local server (python -m http.server) not opening HTML directly

**Issue:** "Cannot read property of undefined"
**Solution:** Check API response structure - some APIs return arrays, others return objects

**Issue:** Dashboard shows "X API calls failed"
**Solution:** Check that ALL 4 APIs are configured with valid keys

## 🎨 Features Included

### User Interface
- **Tabbed navigation** - Switch between API panels
- **Responsive design** - Works on desktop and mobile
- **Loading animations** - Multi-spinner for parallel requests
- **Error toasts** - Auto-dismissing error messages
- **Configuration panel** - Collapsible API key management
- **Progress indicator** - Visual API configuration status

### API Key Management
- **LocalStorage persistence** - Keys saved automatically
- **Secure input fields** - Password-type inputs for keys
- **Test buttons** - Validate each API immediately
- **Auto-save** - Keys save on input change

### Loading & Error States
- **Contextual messages** - Different messages for each operation
- **Graceful degradation** - Show what works, hide what fails
- **User-friendly errors** - Helpful messages with suggestions
- **5-second auto-dismiss** - Error toasts clear automatically

## 🏆 Success Criteria

Your project is complete when:
- ✅ All 4 individual APIs work with test buttons
- ✅ API keys persist after page refresh
- ✅ Each search/fetch function displays data correctly
- ✅ Random dashboard combines all APIs successfully
- ✅ Themed dashboard searches across all APIs
- ✅ Loading states appear during API calls
- ✅ Error handling works gracefully
- ✅ Project works on both desktop and mobile

## 🚀 Extension Challenges

Ready for more? Try these bonus features:

### Beginner Extensions
- **Favorites system:** Save favorite heroes, movies, or GIFs to localStorage
- **Search history:** Track recent searches and show quick-access buttons
- **Image counter:** Display how many items viewed from each API
- **Share buttons:** Add social media sharing for cool finds

### Intermediate Extensions
- **Advanced filtering:** Filter TMDB by rating, GIPHY by trending period
- **Pagination:** Add "Load More" for movie results
- **Comparison view:** Compare two superheroes side-by-side
- **Caching layer:** Cache API responses for 5 minutes to reduce API calls

### Advanced Extensions
- **Cross-API relationships:** Find superhero movies in TMDB automatically
- **Custom dashboard layouts:** Drag-and-drop dashboard arrangement
- **Data visualization:** Add charts showing hero power stats
- **Export dashboard:** Generate shareable dashboard images
- **Keyboard shortcuts:** Add hotkeys for common actions

### Expert Extensions
- **Real-time collaboration:** Share dashboard with friends using WebSockets
- **Machine learning:** Recommend content based on viewing history
- **API rate limit display:** Show remaining API calls visually
- **Offline PWA:** Convert to Progressive Web App with offline support
- **Voice commands:** Add voice search using Web Speech API

## 📚 Additional Resources

### API Documentation
- [Superhero API Docs](https://superheroapi.com/) - Hero data and images
- [NASA API Docs](https://api.nasa.gov/) - Space images and data
- [GIPHY API Docs](https://developers.giphy.com/docs/api) - GIF search and trending
- [TMDB API Docs](https://developers.themoviedb.org/3) - Movie database

### JavaScript Concepts
- [Promise.all() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) - Parallel API calls
- [Promise.allSettled() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) - Handle mixed results
- [Async/Await Guide](https://javascript.info/async-await) - Modern async patterns
- [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - Persistent storage

### API Integration
- [REST API Best Practices](https://restfulapi.net/) - Design patterns
- [API Authentication Methods](https://nordicapis.com/api-authentication-methods/) - Security patterns
- [CORS Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) - Cross-origin requests

## 🎉 Congratulations!

Once you complete this project, you'll have:
- **Integrated 4 different APIs** with various authentication methods
- **Mastered parallel API calls** with Promise.all() and Promise.allSettled()
- **Built a production-ready dashboard** combining multiple data sources
- **Implemented professional error handling** across complex async operations
- **Managed secure API keys** with localStorage persistence
- **Created a responsive UI** that works across all devices

This is the most advanced template in the W3.5 series - it combines everything you've learned about API integration into a real-world application that demonstrates enterprise-level skills!

---

**Need Help?**
- **Start with one API at a time** - Complete TODO 1, test it fully, then move to TODO 2
- **Use the browser DevTools** - Network tab shows API requests, Console shows errors
- **Check API documentation** - Each API has slightly different response formats
- **Test your API keys** - Use the test buttons before implementing search functions
- **Read the console logs** - The template includes helpful console.log() messages
- **Compare with helper functions** - Look at how display functions work for patterns

**Pro Tips:**
- NASA's DEMO_KEY works immediately - start there if waiting for other keys
- Superhero API IDs range from 1-731 for random selection
- GIPHY requires `rating=g` parameter for school-appropriate content
- TMDB poster paths need the CDN URL prepended: `https://image.tmdb.org/t/p/w300`

Remember: This is challenging but incredibly rewarding! You're building real skills used by professional developers every day. Take your time, test thoroughly, and have fun exploring these amazing APIs!

Happy coding! 🚀✨