document.addEventListener('DOMContentLoaded', () => {
    // ---- Audio Initialization ----
    const audio = document.getElementById('bg-audio');
    const audioToggle = document.getElementById('audio-toggle');
    const audioIcon = document.getElementById('audio-icon');

    let isPlaying = false;
    // Volume is now 100% native according to the user's device. No volume override.

    // Handle play toggle
    audioToggle.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            // Update lucide icon from volume-2 back to volume-x
            audioToggle.innerHTML = '<i data-lucide="volume-x"></i>';
            lucide.createIcons();
        } else {
            // Attempt to play
            audio.play().then(() => {
                isPlaying = true;
                // Update lucide icon to unmuted volume state
                audioToggle.innerHTML = '<i data-lucide="volume-2"></i>';
                lucide.createIcons();
            }).catch((e) => {
                console.error('CRITICAL: Audio file not found or browser blocked play:', e);
                alert("Audio Error: The file 'raga_guitar.mp3' must be in the exact same folder as index.html. Check the console for details.");
            });
        }
    });

    // Optionally attempt to play on first generic interaction 
    // Commented out by default to avoid startling user without clicking the button directly,
    // but useful if 'autoplay' illusion is desired anywhere on first scroll/click.
    /*
    document.body.addEventListener('click', () => {
        if(!isPlaying) { audio.play(); isPlaying = true; audioToggle.innerHTML = '<i data-lucide="volume-2"></i>'; lucide.createIcons(); }
    }, { once: true });
    */


    // ---- Canvas Background Animation ----
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    let particlesArray;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    // Particle Class
    class Particle {
        constructor(x, y, dx, dy, size, color) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.size = size;
            this.color = color;
            this.opacity = Math.random() * 0.5 + 0.1; // 0.1 to 0.6 opacity
            this.glowOffset = Math.random() * Math.PI * 2; // Unique pulsing rate
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);

            // Soft pulsating effect
            const currentOpacity = this.opacity + Math.sin(Date.now() * 0.001 + this.glowOffset) * 0.1;

            ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.05, currentOpacity)})`;
            ctx.fill();
        }

        update() {
            // Slowly drift vertically
            this.y += this.dy;
            this.x += this.dx;

            // Screen wrapping
            if (this.y < -10) this.y = canvas.height + 10;
            if (this.y > canvas.height + 10) this.y = -10;
            if (this.x < -10) this.x = canvas.width + 10;
            if (this.x > canvas.width + 10) this.x = -10;

            this.draw();
        }
    }

    // Initialize particle array
    function initParticles() {
        particlesArray = [];
        const numParticles = (canvas.width * canvas.height) / 7000; // Density
        for (let i = 0; i < numParticles; i++) {
            let size = (Math.random() * 1.5) + 0.5;
            let x = Math.random() * innerWidth;
            let y = Math.random() * innerHeight;
            let dy = (Math.random() * 0.4) - 0.2; // very slow vertical drift
            let dx = (Math.random() * 0.2) - 0.1; // slight horizontal drift
            let color = 'white';
            particlesArray.push(new Particle(x, y, dx, dy, size, color));
        }
    }

    // Animate loop
    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }

    initParticles();
    animateParticles();
});
