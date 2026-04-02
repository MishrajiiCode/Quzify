<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Google Drive Video Streamer</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

        body {
            font-family: 'Inter', 'Segoe UI', sans-serif;
            background-color: #f0f2f5;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            margin: 0;
            color: #1a1a1a;
        }

        header {
            text-align: center;
            margin-bottom: 30px;
        }

        .player-wrapper {
            display: none; /* Hidden initially */
            background: white;
            padding: 15px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 900px;
            margin-bottom: 30px;
            box-sizing: border-box;
        }

        .video-container {
            position: relative;
            padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
            height: 0;
            overflow: hidden;
            background-color: #000;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .close-btn {
            background-color: #e53e3e;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            margin-bottom: 15px;
            transition: background 0.2s;
        }

        .close-btn:hover {
            background-color: #c53030;
        }

        /* New styles for the Video Gallery */
        .video-gallery {
            display: grid;
            /* Responsive grid: 1 column on tiny screens, 2+ on larger */
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
            width: 100%;
            max-width: 1000px;
        }

        .video-card {
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            cursor: pointer;
            transition: transform 0.2s;
            border: 1px solid #eaeaea;
        }

        .video-card:hover {
            transform: translateY(-5px);
        }

        .video-card img {
            width: 100%;
            height: 160px; /* Taller thumbnail for better look */
            object-fit: cover;
            background-color: #e2e8f0;
        }

        .video-card h4 {
            margin: 15px;
            font-size: 16px;
            color: #333;
            text-align: left;
        }

        .video-container p {
            color: #888;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }

        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }
    </style>
</head>
<body>
    <header>
        <h1 style="margin-top: 10px;">My Video Platform</h1>
        <p style="color: #666; margin-top: -10px;">Select a video to start watching</p>
    </header>

    <div class="player-wrapper" id="playerWrapper">
        <button id="closeBtn" class="close-btn">&larr; Back to Gallery</button>
        
        <div class="video-container" id="videoContainer">
        </div>
    </div>
    
    <!-- Video Gallery Section -->
    <div class="video-gallery" id="videoGallery"></div>

    <!-- Firebase SDK and custom script -->
    <!-- Use type="module" so we can import Firebase tools -->
    <script type="module">
        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
        import { getFirestore, collection, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyAy-7QGZ05wNf0fLG1-AY2FxJy_fdILdoM",
            authDomain: "quizifyapp-4c5ca.firebaseapp.com",
            projectId: "quizifyapp-4c5ca",
            storageBucket: "quizifyapp-4c5ca.firebasestorage.app",
            messagingSenderId: "948606346917",
            appId: "1:948606346917:web:ab385f7753da5c20710f4c",
            measurementId: "G-C8BJ139KHE"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        // Get references to HTML elements
        const videoGallery = document.getElementById('videoGallery');
        const videoContainer = document.getElementById('videoContainer');
        const playerWrapper = document.getElementById('playerWrapper');
        const closeBtn = document.getElementById('closeBtn');

        // Close player functionality
        closeBtn.addEventListener('click', () => {
            playerWrapper.style.display = 'none';
            videoContainer.innerHTML = ''; // Stop video from playing in background
            videoGallery.style.display = 'grid'; // Show gallery again
        });

        // --- 2. DISPLAY UPLOADED VIDEOS IN GALLERY ---
        const q = query(collection(db, "videos"), orderBy("createdAt", "desc")); // Order by newest first
        
        // Real-time listener for the video collection
        onSnapshot(q, (snapshot) => {
            videoGallery.innerHTML = ''; // Clear current gallery content
            
            snapshot.forEach((doc) => {
                const data = doc.data();
                
                const videoCard = document.createElement('div');
                videoCard.className = 'video-card';
                videoCard.innerHTML = `
                    <img src="${data.thumbnail || 'https://via.placeholder.com/200x120?text=No+Thumbnail'}" alt="${data.title}">
                    <h4>${data.title}</h4>
                `;
                
                // When a video card is clicked, play the video in the main player
                videoCard.addEventListener('click', () => {
                    // Show the player and hide gallery
                    playerWrapper.style.display = 'block';
                    videoGallery.style.display = 'none';
                    
                    const embedUrl = `https://drive.google.com/file/d/${data.driveVideoId}/preview`;
                    videoContainer.innerHTML = `
                        <iframe 
                            src="${embedUrl}" 
                            allow="autoplay; fullscreen" 
                            allowfullscreen>
                        </iframe>
                    `;
                    
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
                
                videoGallery.appendChild(videoCard);
            });
        });
    </script>
</body>
</html>
