// videos.js - Contains all logic for the Video Lectures feature.

const QuizifyVideos = {
    _app: null,
    _db: null,
    _allVideos: [],
    _currentCategory: 'competitive', // NEW: Default active category

    // DOM Elements
    page: null,
    videoListContainer: null,
    searchInput: null,
    playerModal: null,
    playerContainer: null,
    playerTitle: null,
    playerDescription: null,
    latestVideosContainer: null, // NEW
    tabsContainer: null, // NEW

    init(app, db) {
        this._app = app;
        this._db = db;

        this.page = document.getElementById('videos-page');
        this.videoListContainer = document.getElementById('video-list-container');
        this.searchInput = document.getElementById('video-search-input');
        this.playerModal = document.getElementById('video-player-modal');
        this.playerContainer = document.getElementById('video-player-container');
        this.playerTitle = document.getElementById('video-player-title');
        this.playerDescription = document.getElementById('video-player-description');
        this.latestVideosContainer = document.getElementById('latest-videos-container'); // NEW
        this.tabsContainer = document.getElementById('video-category-tabs'); // NEW

        this.initializeEventListeners();
        this.loadAllVideos();
    },

    initializeEventListeners() {
        if (!this.page) return;

        // Back button
        this.page.querySelector('.back-btn').addEventListener('click', () => this._app.goToHome());

        // Search input
        this.searchInput.addEventListener('input', () => this.renderVideos());

        // Video card clicks
        this.videoListContainer.addEventListener('click', (e) => {
            const videoCard = e.target.closest('.video-card');
            if (videoCard && videoCard.dataset.videoId) {
                this.openVideoPlayer(videoCard.dataset.videoId);
            }
        });

        // NEW: Add listener for latest videos section as well
        this.latestVideosContainer.addEventListener('click', (e) => {
            const videoCard = e.target.closest('.video-card');
            if (videoCard && videoCard.dataset.videoId) {
                this.openVideoPlayer(videoCard.dataset.videoId);
            }
        });

        // NEW: Tab clicks
        this.tabsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('profile-tab-btn')) {
                this._currentCategory = e.target.dataset.category;
                this.updateActiveTab();
                this.renderVideos();
            }
        });

        // Player Modal
        document.getElementById('close-video-player-btn').addEventListener('click', () => this.closeVideoPlayer());
        this.playerModal.addEventListener('click', (e) => {
            if (e.target === this.playerModal) this.closeVideoPlayer();
        });
    },

    async loadAllVideos() {
        try {
            const snapshot = await this._db.collection('videos').orderBy('timestamp', 'desc').get();
            this._allVideos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            this.renderLatestVideos(); // NEW: Render the latest videos section
            this.renderVideos(); // Initial render
        } catch (error) {
            console.error("Error loading videos:", error);
            this._app.showNotification('Could not load video lectures.', 'error');
        }
    },

    /**
     * NEW: Displays skeleton loaders for the video cards.
     * @param {number} count - The number of skeleton loaders to display.
     */
    showSkeletonLoaders(count = 6) {
        this.videoListContainer.innerHTML = ''; // Clear previous content
        const grid = document.createElement('div');
        grid.id = 'video-grid';

        for (let i = 0; i < count; i++) {
            const skeletonCard = document.createElement('div');
            skeletonCard.className = 'video-card-skeleton';
            skeletonCard.innerHTML = `
                <div class="skeleton-thumbnail"></div>
                <div class="skeleton-info">
                    <div class="skeleton-line skeleton-title"></div>
                    <div class="skeleton-line skeleton-desc"></div>
                </div>
            `;
            grid.appendChild(skeletonCard);
        }
        this.videoListContainer.appendChild(grid);
    },

    renderVideos() {
        const searchTerm = this.searchInput.value.toLowerCase().trim();

        // Filter videos based on search term first
        const filteredVideos = this._allVideos.filter(video => 
            video.title.toLowerCase().includes(searchTerm) || 
            (video.topic && video.topic.toLowerCase().includes(searchTerm))
        );

        this.videoListContainer.innerHTML = '';

        if (filteredVideos.length === 0 && searchTerm) {
            this.videoListContainer.innerHTML = '<p class="video-no-results">No videos found. Try a different search term.</p>';
            return;
        }

        // If there's a search term, display results in a simple grid
        if (searchTerm) {
            const searchResultsContainer = this.createTopicRow("Search Results", filteredVideos);
            this.videoListContainer.appendChild(searchResultsContainer);
            return;
        }

        // --- NEW: Tabbed Rendering Logic ---
        const videosForCurrentCategory = this._allVideos.filter(v => v.category === this._currentCategory);

        if (videosForCurrentCategory.length === 0) {
            this.videoListContainer.innerHTML = '<p class="video-no-results">No videos available in this category yet.</p>';
            return;
        }

        const videosByTopic = this.groupVideosByTopic(videosForCurrentCategory);
        this.renderTopicRows(videosByTopic, this.videoListContainer);
    },

    /**
     * NEW: Renders the 6 latest videos into their dedicated container.
     */
    renderLatestVideos() {
        const container = this.latestVideosContainer;
        if (!container) return;

        const latestVideos = [...this._allVideos].slice(0, 6);

        container.innerHTML = ''; // Clear previous content
        if (latestVideos.length > 0) {
            latestVideos.forEach(video => {
                const videoCard = this.createVideoCard(video);
                container.appendChild(videoCard);
            });
        } else {
            container.innerHTML = '<p class="video-no-results">No videos have been uploaded yet.</p>';
        }
    },

    /**
     * NEW: Updates the active state of the category tabs.
     */
    updateActiveTab() {
        this.tabsContainer.querySelectorAll('.profile-tab-btn').forEach(btn => {
            if (btn.dataset.category === this._currentCategory) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    },

    /**
     * NEW: Creates a full category row element with a title and a horizontal scroll container.
     * @param {string} title - The title of the category (e.g., "Latest Uploads").
     * @param {Array} videos - An array of video objects for this category.
     * @returns {HTMLElement} The complete section element.
     */
    createTopicRow(title, videos) {
        const section = document.createElement('div');
        section.className = 'video-category-section';

        const titleEl = document.createElement('h2');
        titleEl.className = 'video-category-title';
        titleEl.textContent = title;
        section.appendChild(titleEl);

        const row = document.createElement('div');
        row.className = 'video-row';

        videos.forEach(video => {
            const videoCard = this.createVideoCard(video);
            row.appendChild(videoCard);
        });

        section.appendChild(row);
        return section;
    },

    /**
     * NEW: Groups an array of videos by their topic.
     * @param {Array} videos - The array of videos to group.
     * @returns {object} - An object where keys are topics and values are arrays of videos.
     */
    groupVideosByTopic(videos) {
        return videos.reduce((acc, video) => {
            const topic = video.topic || 'General';
            if (!acc[topic]) {
                acc[topic] = [];
            }
            acc[topic].push(video);
            return acc;
        }, {});
    },

    /**
     * NEW: Renders topic rows into a given parent container.
     * @param {object} videosByTopic - The topic-grouped video object.
     * @param {HTMLElement} parentContainer - The container to append rows to.
     */
    renderTopicRows(videosByTopic, parentContainer) {
        for (const topic in videosByTopic) {
            const topicSection = this.createTopicRow(topic, videosByTopic[topic]);
            parentContainer.appendChild(topicSection);
        }
    },

    /**
     * NEW: Creates a single video card element.
     * @param {object} video - The video data object.
     * @returns {HTMLElement} The video card element.
     */
    createVideoCard(video) {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.dataset.videoId = video.id;
        videoCard.innerHTML = `
            <div class="video-thumbnail-container">
                <img src="${video.thumbnailUrl || 'https://via.placeholder.com/300x169.png?text=No+Thumbnail'}" alt="${video.title}" class="video-thumbnail" loading="lazy">
                <div class="video-play-icon-overlay">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
            </div>
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <p class="video-description">${video.description || 'No description available.'}</p>
            </div>
        `;
        return videoCard;
    },

    openVideoPlayer(videoId) {
        const video = this._allVideos.find(v => v.id === videoId);
        if (!video) return;

        this.playerTitle.textContent = video.title;
        this.playerDescription.textContent = video.description;
        // Handle both regular video URLs and YouTube URLs
        let videoSrc = video.videoUrl;
        if (videoSrc.includes('youtube.com/watch?v=')) {
            videoSrc = videoSrc.replace('watch?v=', 'embed/');
        }

        // --- NEW: Lazy Loading Facade ---
        // 1. Create a container for the facade (thumbnail + play button)
        const facadeContainer = document.createElement('div');
        facadeContainer.className = 'video-player-facade';
        facadeContainer.style.backgroundImage = `url('${video.thumbnailUrl || 'https://via.placeholder.com/400x225.png?text=Loading...'}')`;

        // 2. Create the play button
        const playButton = document.createElement('div');
        playButton.className = 'video-play-button';
        playButton.innerHTML = '▶'; // Play icon

        facadeContainer.appendChild(playButton);

        // 3. When the user clicks the facade, replace it with the actual video iframe
        facadeContainer.onclick = () => {
            // Add 'autoplay=1' to start the video immediately after loading
            const videoIframe = `<iframe id="video-player" src="${videoSrc}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            this.playerContainer.innerHTML = videoIframe;
        };

        // 4. Initially, show the facade instead of the iframe
        this.playerContainer.innerHTML = ''; // Clear previous content
        this.playerContainer.appendChild(facadeContainer);

        this.playerModal.classList.add('visible');
    },

    closeVideoPlayer() {
        this.playerModal.classList.remove('visible');
        this.playerContainer.innerHTML = ''; // Stop the video by removing the iframe
    },

    displayVideosPage() {
        this.showSkeletonLoaders(); // NEW: Show skeleton loaders immediately
        this.loadAllVideos(); // Fetch videos, which will then call renderVideos()
        this._app.showPage('videos-page');
    }
};
