// Multi-API Dashboard - Discovery Challenge
// Explore API authentication, integration patterns, and data orchestration!

// API Configuration - Study these endpoint patterns
const API_ENDPOINTS = {
    // Note: Superhero API doesn't support CORS, so we wrap it in a proxy
    superhero: 'https://www.superheroapi.com/api.php',
    nasa: 'https://api.nasa.gov',
    giphy: 'https://api.giphy.com/v1/gifs',
    tmdb: 'https://api.themoviedb.org/3'
};

// CORS Proxy for Superhero API
const PROXY_URL = 'https://corsproxy.io/?';


// Global state
let currentPanel = 'superhero';
let apiKeys = {
    superhero: '175f3ab4717432c8ba28b568e3f8fdde',
    nasa: '7TlCywWxQZFccx02d5TaUdghI43aiMfCNSyZRE2Z', // NASA provides a demo key
    giphy: 'iWjpGIAqyF0Bzx27GU1JpyeoqLX0Wv4K',
    tmdb: '5077ba37b741e80987d616a22fb2758d'
};

// DOM Elements
const apiTabs = document.querySelectorAll('.api-tab');
const apiPanels = document.querySelectorAll('.api-panel');
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingMessage = document.getElementById('loadingMessage');
const errorToast = document.getElementById('errorToast');
const errorMessage = document.getElementById('errorMessage');
const configStatus = document.getElementById('configStatus');

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    setupTabNavigation();
    loadSavedKeys();
    updateConfigStatus();
    setTodaysDate();
});

// Tab Navigation
function setupTabNavigation() {
    apiTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const apiName = tab.dataset.api;
            switchToPanel(apiName);
        });
    });
}

function switchToPanel(panelName) {
    // Update tabs
    apiTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.api === panelName) {
            tab.classList.add('active');
        }
    });

    // Update panels
    document.querySelectorAll('.api-panel').forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `${panelName}-panel`) {
            panel.classList.add('active');
        }
    });

    currentPanel = panelName;
}

// API Key Management
function loadSavedKeys() {
    const saved = localStorage.getItem('multiapi-keys');
    if (saved) {
        apiKeys = { ...apiKeys, ...JSON.parse(saved) };

        // Populate inputs if they exist
        if (document.getElementById('superheroKey')) {
            document.getElementById('superheroKey').value = apiKeys.superhero || '';
            document.getElementById('nasaKey').value = apiKeys.nasa || '';
            document.getElementById('giphyKey').value = apiKeys.giphy || '';
            document.getElementById('tmdbKey').value = apiKeys.tmdb || '';
        }
    }
}

function saveKeys() {
    apiKeys.superhero = document.getElementById('superheroKey').value;
    apiKeys.nasa = document.getElementById('nasaKey').value || 'DEMO_KEY';
    apiKeys.giphy = document.getElementById('giphyKey').value;
    apiKeys.tmdb = document.getElementById('tmdbKey').value;

    localStorage.setItem('multiapi-keys', JSON.stringify(apiKeys));
    updateConfigStatus();
}

function toggleConfig() {
    const panel = document.getElementById('apiConfigPanel');
    panel.classList.toggle('hidden');

    // Smooth scroll to panel if opening
    if (!panel.classList.contains('hidden')) {
        panel.scrollIntoView({ behavior: 'smooth' });
    }
}

function updateConfigStatus() {
    const configured = Object.values(apiKeys).filter(key => key && key !== '').length;
    const total = Object.keys(apiKeys).length;

    configStatus.innerHTML = `
        <p>API Configuration: ${configured}/${total} APIs configured</p>
        <div style="background: #e2e8f0; border-radius: 4px; height: 8px; margin-top: 0.5rem;">
            <div style="background: #48bb78; height: 100%; width: ${(configured / total) * 100}%; border-radius: 4px; transition: width 0.3s ease;"></div>
        </div>
    `;
}

// Utility Functions
function showLoading(message = 'Loading API data...') {
    loadingMessage.textContent = message;
    loadingOverlay.classList.remove('hidden');
}

function hideLoading() {
    loadingOverlay.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorToast.classList.remove('hidden');
    setTimeout(() => hideErrorToast(), 5000);
}

function hideErrorToast() {
    errorToast.classList.add('hidden');
}

function setTodaysDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('nasaDate').value = today;
}

// DISCOVERY CHALLENGE 1: API Authentication Patterns
// Research Question: How do different APIs handle authentication?
// Goal: Implement API key-based authentication and validation

async function testSuperheroAPI() {
    const key = document.getElementById('superheroKey').value;
    if (!key) {
        showError('Please enter your Superhero API key first!');
        return;
    }

    showLoading('Testing Superhero API connection...');
    try {
        // We Use Batman (ID 70) as a stable test
        const apiUrl = `${API_ENDPOINTS.superhero}/${key}/70`;
        const response = await fetch(`${PROXY_URL}${encodeURIComponent(apiUrl)}`);

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        if (data.response === 'success') {
            alert('SuperHero API Connected Successfully!');
            saveKeys(); // Save the working key
        } else {
            showError(`Superhero API: ${data.error || 'Connection failed'}`);
        }
    } catch (error) {
        console.error('Superhero API test failed:', error);
        showError('Superhero API connection failed. This API often has CORS issues; we are using a proxy to help.');
    } finally {
        hideLoading();
    }
}

async function searchSuperhero() {
    const query = document.getElementById('superheroSearch').value.trim();
    const key = document.getElementById('superheroKey').value || apiKeys.superhero;

    if (!query) {
        showError('Please enter a superhero name to search!');
        return;
    }

    if (!key) {
        showError('Please configure your Superhero API key first!');
        return;
    }

    showLoading(`Searching for ${query}...`);
    try {
        const apiUrl = `${API_ENDPOINTS.superhero}/${key}/search/${encodeURIComponent(query)}`;
        const response = await fetch(`${PROXY_URL}${encodeURIComponent(apiUrl)}`);
        const data = await response.json();

        if (data.response === 'success' && data.results && data.results.length > 0) {
            displaySuperhero(data.results[0]);
        } else {
            showError(`No superhero found matching "${query}"`);
        }
    } catch (error) {
        console.error('Superhero search failed:', error);
        showError('Superhero search failed. Check your API key or try again.');
    } finally {
        hideLoading();
    }
}

async function getRandomSuperhero() {
    const key = document.getElementById('superheroKey').value || apiKeys.superhero;

    if (!key) {
        showError('Please configure your Superhero API key first!');
        return;
    }

    showLoading('Fetching a random superhero...');
    try {
        const randomId = Math.floor(Math.random() * 731) + 1;
        const apiUrl = `${API_ENDPOINTS.superhero}/${key}/${randomId}`;
        const response = await fetch(`${PROXY_URL}${encodeURIComponent(apiUrl)}`);
        const data = await response.json();

        if (data.response === 'success') {
            displaySuperhero(data);
        } else {
            showError('Failed to fetch a random superhero. Try again.');
        }
    } catch (error) {
        console.error('Random superhero fetch failed:', error);
        showError('Random superhero fetch failed.');
    } finally {
        hideLoading();
    }
}

// DISCOVERY CHALLENGE 2: Query Parameter Authentication
// Research Question: How do different APIs structure their requests?
// Goal: Master query parameter-based authentication and data fetching

async function testNASAAPI() {
    const key = document.getElementById('nasaKey').value || 'DEMO_KEY';

    showLoading('Testing NASA API connection...');
    try {
        const response = await fetch(`${API_ENDPOINTS.nasa}/planetary/apod?api_key=${key}`);

        if (response.ok) {
            alert('NASA API Connected Successfully!');
            apiKeys.nasa = key;
            saveKeys();
        } else {
            const errorData = await response.json();
            showError(`NASA API: ${errorData.error?.message || 'Connection failed'}`);
        }
    } catch (error) {
        console.error('NASA API test failed:', error);
        showError('NASA API test failed.');
    } finally {
        hideLoading();
    }
}

async function getNASAImage() {
    const key = apiKeys.nasa || 'DEMO_KEY';

    showLoading('Fetching a random cosmic wonder...');
    try {
        // count=1 returns a random image in an array
        const response = await fetch(`${API_ENDPOINTS.nasa}/planetary/apod?api_key=${key}&count=1`);
        const data = await response.json();

        if (response.ok && data.length > 0) {
            displayNASAImage(data[0]);
        } else {
            showError('Failed to fetch a random space image.');
        }
    } catch (error) {
        console.error('NASA Random Image fetch failed:', error);
        showError('Failed to fetch a random NASA image.');
    } finally {
        hideLoading();
    }
}

async function getTodaysNASAImage() {
    const key = apiKeys.nasa || 'DEMO_KEY';

    showLoading("Fetching today's space image...");
    try {
        const response = await fetch(`${API_ENDPOINTS.nasa}/planetary/apod?api_key=${key}`);
        const data = await response.json();

        if (response.ok) {
            displayNASAImage(data);
        } else {
            showError('Failed to fetch today\'s image.');
        }
    } catch (error) {
        console.error('NASA Today Image fetch failed:', error);
        showError('NASA API call failed.');
    } finally {
        hideLoading();
    }
}

async function getNASAImageByDate() {
    const date = document.getElementById('nasaDate').value;
    const key = apiKeys.nasa || 'DEMO_KEY';

    if (!date) return;

    showLoading(`Fetching space image for ${date}...`);
    try {
        const response = await fetch(`${API_ENDPOINTS.nasa}/planetary/apod?api_key=${key}&date=${date}`);
        const data = await response.json();

        if (response.ok) {
            displayNASAImage(data);
        } else {
            showError(`NASA API: ${data.msg || 'Failed to fetch image for this date'}`);
        }
    } catch (error) {
        console.error('NASA Date Image fetch failed:', error);
        showError('Failed to fetch NASA image.');
    } finally {
        hideLoading();
    }
}

// DISCOVERY CHALLENGE 3: Media API Integration
// Research Question: How do you handle media-rich API responses?
// Goal: Master media APIs and content filtering

async function testGiphyAPI() {
    const key = document.getElementById('giphyKey').value;
    if (!key) {
        showError('Please enter your GIPHY API key first!');
        return;
    }

    showLoading('Testing GIPHY API connection...');
    try {
        const response = await fetch(`${API_ENDPOINTS.giphy}/trending?api_key=${key}&limit=1`);

        if (response.ok) {
            alert('GIPHY API Connected Successfully!');
            apiKeys.giphy = key;
            saveKeys();
        } else {
            showError('GIPHY API: Invalid API key or connection failed');
        }
    } catch (error) {
        console.error('GIPHY API test failed:', error);
        showError('GIPHY API test failed.');
    } finally {
        hideLoading();
    }
}

async function searchGIFs() {
    const query = document.getElementById('giphySearch').value.trim();
    const key = apiKeys.giphy;

    if (!query) {
        showError('Please enter a search term for GIFs!');
        return;
    }

    showLoading(`Searching for GIFs: ${query}...`);
    try {
        const response = await fetch(`${API_ENDPOINTS.giphy}/search?api_key=${key}&q=${query}&limit=12&rating=g`);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
            displayGIFs(data.data);
        } else {
            showError(`No GIFs found for "${query}"`);
        }
    } catch (error) {
        console.error('GIF search failed:', error);
        showError('GIF search failed.');
    } finally {
        hideLoading();
    }
}

async function getTrendingGIFs() {
    const key = apiKeys.giphy;

    showLoading('Fetching trending GIFs...');
    try {
        const response = await fetch(`${API_ENDPOINTS.giphy}/trending?api_key=${key}&limit=12&rating=g`);
        const data = await response.json();
        displayGIFs(data.data);
    } catch (error) {
        console.error('Trending GIFs fetch failed:', error);
        showError('Trending GIFs fetch failed.');
    } finally {
        hideLoading();
    }
}

async function getRandomGIF() {
    const key = apiKeys.giphy;

    showLoading('Fetching a random GIF...');
    try {
        const response = await fetch(`${API_ENDPOINTS.giphy}/random?api_key=${key}&rating=g`);
        const data = await response.json();
        displayGIFs([data.data]);
    } catch (error) {
        console.error('Random GIF fetch failed:', error);
        showError('Random GIF fetch failed.');
    } finally {
        hideLoading();
    }
}

// TODO 4: Complete TMDB (Movie) API Integration
async function testTMDBAPI() {
    const key = document.getElementById('tmdbKey').value;
    if (!key) {
        showError('Please enter your TMDB API key first!');
        return;
    }

    showLoading('Testing TMDB API connection...');
    try {
        const response = await fetch(`${API_ENDPOINTS.tmdb}/movie/popular?api_key=${key}&page=1`);

        if (response.ok) {
            alert('TMDB API Connected Successfully!');
            apiKeys.tmdb = key;
            saveKeys();
        } else {
            showError('TMDB API: Invalid API key or connection failed');
        }
    } catch (error) {
        console.error('TMDB API test failed:', error);
        showError('TMDB API test failed.');
    } finally {
        hideLoading();
    }
}

async function searchMovies() {
    const query = document.getElementById('tmdbSearch').value.trim();
    const key = apiKeys.tmdb || '5077ba37b741e80987d616a22fb2758d';

    if (!query) {
        showError('Please enter a movie title to search!');
        return;
    }

    showLoading(`Searching for movies: ${query}...`);
    try {
        const response = await fetch(`${API_ENDPOINTS.tmdb}/search/movie?api_key=${key}&query=${query}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            displayMovies(data.results);
        } else {
            showError(`No movies found for "${query}"`);
        }
    } catch (error) {
        console.error('Movie search failed:', error);
        showError('Movie search failed.');
    } finally {
        hideLoading();
    }
}

async function getPopularMovies() {
    const key = apiKeys.tmdb || '5077ba37b741e80987d616a22fb2758d';

    showLoading('Fetching popular movies...');
    try {
        const response = await fetch(`${API_ENDPOINTS.tmdb}/movie/popular?api_key=${key}&page=1`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            displayMovies(data.results);
        } else {
            showError('No popular movies found.');
        }
    } catch (error) {
        console.error('Popular movies fetch failed:', error);
        showError('Popular movies fetch failed.');
    } finally {
        hideLoading();
    }
}

async function getNowPlaying() {
    const key = apiKeys.tmdb || '5077ba37b741e80987d616a22fb2758d';

    showLoading('Fetching now playing movies...');
    try {
        const response = await fetch(`${API_ENDPOINTS.tmdb}/movie/now_playing?api_key=${key}&page=1`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            displayMovies(data.results);
        } else {
            showError('No movies currently playing found.');
        }
    } catch (error) {
        console.error('Now playing movies fetch failed:', error);
        showError('Now playing movies fetch failed.');
    } finally {
        hideLoading();
    }
}

// TODO 5: Complete Multi-API Dashboard Features
async function createRandomDashboard() {
    showLoading('Creating awesome multi-API dashboard...');

    try {
        const results = await Promise.allSettled([
            fetchRandomSuperheroData(),
            fetchRandomNASAData(),
            fetchRandomGiphyData(),
            fetchRandomMovieData()
        ]);

        const dashboardResults = document.getElementById('dashboardResults');
        dashboardResults.innerHTML = '';

        const grid = document.createElement('div');
        grid.className = 'dashboard-grid-container'; // We can define this in styles or use existing grid

        const components = [
            { name: 'Superhero', icon: '🦸' },
            { name: 'Space', icon: '🌌' },
            { name: 'Reaction', icon: '🎬' },
            { name: 'Movie', icon: '🍿' }
        ];

        results.forEach((result, index) => {
            const card = document.createElement('div');
            card.className = 'dashboard-item';

            if (result.status === 'fulfilled' && result.value) {
                const data = result.value;
                const info = components[index];

                let contentHTML = '';
                if (index === 0) { // Superhero
                    contentHTML = `
                        <h4>${data.name}</h4>
                        <img src="${data.image?.url}" alt="${data.name}" onerror="this.src='https://via.placeholder.com/300x300?text=${data.name}'">
                        <p>${data.biography?.['full-name'] || data.name} • ${data.biography?.publisher || 'Hero'}</p>
                    `;
                } else if (index === 1) { // NASA
                    contentHTML = `
                        <h4>${data.title}</h4>
                        <img src="${data.url}" alt="${data.title}" onerror="this.src='https://via.placeholder.com/300x200?text=Space'">
                        <p>Discovery from the cosmos</p>
                    `;
                } else if (index === 2) { // GIPHY
                    contentHTML = `
                        <h4>Random Reaction</h4>
                        <img src="${data.images?.fixed_height?.url}" class="dashboard-gif" alt="GIF" onerror="this.src='https://via.placeholder.com/300x200?text=GIF'">
                        <p>Powered by GIPHY</p>
                    `;
                } else if (index === 3) { // Movie
                    contentHTML = `
                        <h4>${data.title}</h4>
                        <img src="https://image.tmdb.org/t/p/w300${data.poster_path}" alt="${data.title}" onerror="this.src='https://via.placeholder.com/300x450?text=Movie'">
                        <p>Rating: ⭐ ${data.vote_average}</p>
                    `;
                }

                card.innerHTML = `
                    <div class="card-tag">${info.icon} ${info.name}</div>
                    ${contentHTML}
                `;
            } else {
                card.innerHTML = `
                    <div class="card-tag">⚠️ Error</div>
                    <p>Failed to load ${components[index].name} data. Check API configuration.</p>
                `;
            }
            dashboardResults.appendChild(card);
        });

    } catch (error) {
        console.error('Dashboard creation failed:', error);
        showError('Could not create dashboard. Check your API keys.');
    } finally {
        hideLoading();
    }
}

async function createThemedDashboard() {
    const theme = prompt('Enter a theme (e.g., space, action, batman, cats):');
    if (!theme) return;

    showLoading(`Creating ${theme}-themed dashboard...`);

    try {
        const results = await Promise.allSettled([
            fetchThemedSuperhero(theme),
            fetchRandomNASAData(), // NASA APOD is always date-based, we'll keep it as "today"
            fetchThemedGiphy(theme),
            fetchThemedMovie(theme)
        ]);

        const dashboardResults = document.getElementById('dashboardResults');
        dashboardResults.innerHTML = '';

        const components = [
            { name: 'Hero Search', icon: '🦸' },
            { name: 'Space News', icon: '🌌' },
            { name: 'Themed GIF', icon: '🎬' },
            { name: 'Themed Movie', icon: '🍿' }
        ];

        results.forEach((result, index) => {
            const card = document.createElement('div');
            card.className = 'dashboard-item';

            if (result.status === 'fulfilled' && result.value) {
                const data = result.value;
                const info = components[index];

                let contentHTML = '';
                if (index === 0) { // Superhero
                    contentHTML = `
                        <h4>${data.name}</h4>
                        <img src="${data.image?.url}" alt="${data.name}" onerror="this.src='https://via.placeholder.com/300x300?text=${data.name}'">
                        <p>${data.biography?.['full-name'] || data.name} • ${data.biography?.publisher || 'Hero'}</p>
                    `;
                } else if (index === 1) { // NASA
                    contentHTML = `
                        <h4>${data.title}</h4>
                        <img src="${data.url}" alt="${data.title}" onerror="this.src='https://via.placeholder.com/300x200?text=Space'">
                        <p>Space discovery of the day</p>
                    `;
                } else if (index === 2) { // GIPHY
                    contentHTML = `
                        <h4>${theme.toUpperCase()} Reaction</h4>
                        <img src="${data.images?.fixed_height?.url}" class="dashboard-gif" alt="GIF" onerror="this.src='https://via.placeholder.com/300x200?text=GIF'">
                        <p>Trending ${theme} reaction</p>
                    `;
                } else if (index === 3) { // Movie
                    contentHTML = `
                        <h4>${data.title}</h4>
                        <img src="https://image.tmdb.org/t/p/w300${data.poster_path}" alt="${data.title}" onerror="this.src='https://via.placeholder.com/300x450?text=Movie'">
                        <p>Released: ${data.release_date || 'Unknown'}</p>
                    `;
                }

                card.innerHTML = `
                    <div class="card-tag">${info.icon} ${info.name}</div>
                    ${contentHTML}
                `;
            } else {
                card.innerHTML = `
                    <div class="card-tag">⚠️ ${components[index].name}</div>
                    <p>No matches found for "${theme}" in this category.</p>
                `;
            }
            dashboardResults.appendChild(card);
        });

    } catch (error) {
        console.error('Themed dashboard creation failed:', error);
        showError('Could not create themed dashboard.');
    } finally {
        hideLoading();
    }
}

// Helper fetchers for Dashboard
async function fetchRandomSuperheroData() {
    const key = document.getElementById('superheroKey').value || apiKeys.superhero;
    if (!key) return null;
    const randomId = Math.floor(Math.random() * 731) + 1;
    const apiUrl = `${API_ENDPOINTS.superhero}/${key}/${randomId}`;
    const response = await fetch(`${PROXY_URL}${encodeURIComponent(apiUrl)}`);
    return await response.json();
}


async function fetchRandomNASAData() {
    const key = apiKeys.nasa || 'DEMO_KEY';
    const response = await fetch(`${API_ENDPOINTS.nasa}/planetary/apod?api_key=${key}&count=1`);
    const data = await response.json();
    return Array.isArray(data) ? data[0] : data;
}

async function fetchRandomGiphyData() {
    const key = apiKeys.giphy;
    if (!key) return null;
    const response = await fetch(`${API_ENDPOINTS.giphy}/random?api_key=${key}&rating=g`);
    const data = await response.json();
    return data.data;
}

async function fetchRandomMovieData() {
    const key = apiKeys.tmdb || '5077ba37b741e80987d616a22fb2758d';
    // Pick a random page from the first 50 pages of popular movies
    const randomPage = Math.floor(Math.random() * 50) + 1;
    const response = await fetch(`${API_ENDPOINTS.tmdb}/movie/popular?api_key=${key}&page=${randomPage}`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        return data.results[randomIndex];
    }
    return null;
}

async function fetchThemedSuperhero(theme) {
    const key = document.getElementById('superheroKey').value || apiKeys.superhero;
    if (!key) return null;
    const apiUrl = `${API_ENDPOINTS.superhero}/${key}/search/${encodeURIComponent(theme)}`;
    const response = await fetch(`${PROXY_URL}${encodeURIComponent(apiUrl)}`);
    const data = await response.json();
    return data.results ? data.results[0] : null;
}

async function fetchThemedGiphy(theme) {
    const key = apiKeys.giphy;
    if (!key) return null;
    const response = await fetch(`${API_ENDPOINTS.giphy}/search?api_key=${key}&q=${theme}&limit=1&rating=g`);
    const data = await response.json();
    return data.data ? data.data[0] : null;
}

async function fetchThemedMovie(theme) {
    const key = apiKeys.tmdb || '5077ba37b741e80987d616a22fb2758d';
    const response = await fetch(`${API_ENDPOINTS.tmdb}/search/movie?api_key=${key}&query=${theme}`);
    const data = await response.json();
    return data.results ? data.results[0] : null;
}

function clearDashboard() {
    document.getElementById('dashboardResults').innerHTML = `
        <div class="dashboard-placeholder">
            <h3>🎯 Multi-API Integration</h3>
            <p>This dashboard combines data from all APIs to create rich, integrated experiences!</p>
            <div class="features-grid">
                <div class="feature-card">
                    <h4>🔄 Data Fusion</h4>
                    <p>Combine superhero and movie data</p>
                </div>
                <div class="feature-card">
                    <h4>🎨 Rich Media</h4>
                    <p>Mix images, GIFs, and text</p>
                </div>
                <div class="feature-card">
                    <h4>⚡ Parallel Loading</h4>
                    <p>Fetch multiple APIs simultaneously</p>
                </div>
                <div class="feature-card">
                    <h4>🎪 Interactive</h4>
                    <p>Click to explore connections</p>
                </div>
            </div>
        </div>
    `;
}

// TODO 6: Helper Functions for Display
function displaySuperhero(hero) {
    const results = document.getElementById('superheroResults');

    // TODO: Create and display superhero card with image, stats, biography

    results.innerHTML = `
        <div class="superhero-card">
            <div class="card-header">
                <h3>${hero.name}</h3>
                <img src="${hero.image?.url || 'https://via.placeholder.com/200?text=No+Image'}" class="card-image" alt="${hero.name}">
            </div>
            <div class="card-content">
                <div>
                    <h4>Biography</h4>
                    <p><strong>Full Name:</strong> ${hero.biography?.['full-name'] || 'Unknown'}</p>
                    <p><strong>Publisher:</strong> ${hero.biography?.publisher || 'Unknown'}</p>
                    <p><strong>First Appearance:</strong> ${hero.biography?.['first-appearance'] || 'Unknown'}</p>
                </div>
                <div>
                    <h4>Power Stats</h4>
                    <div class="stat-grid">
                        <div class="stat-item">
                            <h4>Intelligence</h4>
                            <p>${hero.powerstats?.intelligence || '?'}</p>
                        </div>
                        <div class="stat-item">
                            <h4>Strength</h4>
                            <p>${hero.powerstats?.strength || '?'}</p>
                        </div>
                        <div class="stat-item">
                            <h4>Speed</h4>
                            <p>${hero.powerstats?.speed || '?'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function displayNASAImage(data) {
    const results = document.getElementById('nasaResults');

    results.innerHTML = `
        <div class="nasa-card">
            <div class="card-header">
                <h3>${data.title}</h3>
                <img src="${data.url}" class="card-image" alt="${data.title}">
            </div>
            <div class="card-content">
                <div>
                    <h4>Description</h4>
                    <p>${data.explanation}</p>
                </div>
                <div>
                    <h4>Details</h4>
                    <p><strong>Date:</strong> ${data.date}</p>
                    <p><strong>Media Type:</strong> ${data.media_type}</p>
                    ${data.copyright ? `<p><strong>Copyright:</strong> ${data.copyright}</p>` : ''}
                </div>
            </div>
        </div>
    `;
}

function displayGIFs(gifs) {
    const results = document.getElementById('giphyResults');

    const gifHTML = gifs.map(gif => `
        <div class="gif-item">
            <img src="${gif.images.fixed_height.url}" alt="${gif.title}">
        </div>
    `).join('');

    results.innerHTML = `
        <div>
            <h3>🎬 GIF Results</h3>
            <div class="gif-grid">
                ${gifHTML}
            </div>
        </div>
    `;
}

function displayMovies(movies) {
    const results = document.getElementById('tmdbResults');

    if (!movies || movies.length === 0) {
        results.innerHTML = '<p class="placeholder">No movies found.</p>';
        return;
    }

    const movieHTML = movies.slice(0, 12).map(movie => `
        <div class="movie-item">
            <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" class="movie-poster" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/300x450?text=No+Poster'">
            <div class="movie-info">
                <h4>${movie.title}</h4>
                <p>${movie.overview ? movie.overview.substring(0, 100) + '...' : 'No description available.'}</p>
                <span class="movie-rating">⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
            </div>
        </div>
    `).join('');

    results.innerHTML = `
        <div>
            <h3>🍿 Movie Results</h3>
            <div class="movie-grid">
                ${movieHTML}
            </div>
        </div>
    `;
}

// Event listeners for saving API keys
document.getElementById('superheroKey').addEventListener('change', saveKeys);
document.getElementById('nasaKey').addEventListener('change', saveKeys);
document.getElementById('giphyKey').addEventListener('change', saveKeys);
document.getElementById('tmdbKey').addEventListener('change', saveKeys);

/*
STUDENT INSTRUCTIONS:

🚀 MULTI-API INTEGRATION CHALLENGE

This is the most advanced template in the series! You'll integrate 4 different APIs
with authentication, error handling, and create a combined dashboard.

PHASE 1: API SETUP (TODOs 1-4)
1. Get API keys from:
   - Superhero API: https://superheroapi.com/ (free)
   - NASA API: https://api.nasa.gov/ (free, instant)
   - GIPHY: https://developers.giphy.com/ (free)
   - TMDB: https://www.themoviedb.org/settings/api (free)

2. Complete each API integration:
   - TODO 1: Superhero API (search heroes, get random hero)
   - TODO 2: NASA API (space images, Mars photos)
   - TODO 3: GIPHY API (search GIFs, trending, random)
   - TODO 4: TMDB API (search movies, popular, now playing)

PHASE 2: MULTI-API DASHBOARD (TODO 5)
- Combine data from multiple APIs
- Use Promise.all() for parallel requests
- Create rich, interactive displays
- Handle mixed success/failure scenarios

KEY CONCEPTS TO MASTER:
✅ API authentication with keys
✅ Error handling and user feedback
✅ Multiple API coordination
✅ Data transformation and display
✅ Local storage for API keys
✅ Promise.all() for parallel requests

DEBUGGING TIPS:
- Use Network tab to inspect API requests
- Check API documentation for exact endpoints
- Test one API at a time before combining
- Handle CORS issues with proper error messages
- Use console.log() to debug API responses

SUCCESS CRITERIA:
- All 4 APIs work individually
- API keys are saved and loaded properly
- Dashboard combines multiple API data
- Error handling works gracefully
- Mobile responsive design works

This project teaches real-world API integration skills! 🎯
*/