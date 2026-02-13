/* ============================================
   VALENTINE'S DAY - EZGI
   Interactive logic & animations
   ============================================ */

// ---------- PHOTO LIST ----------
const photos = [
  'images/IMG_5973.jpg',
  'images/IMG_6071.jpg',
  'images/IMG_6754.jpg',
  'images/IMG_7667.jpg',
  'images/IMG_8140.jpg',
  'images/0ab0d9bf-177e-464f-bc33-9c06214287d7.jpg',
  'images/89582274-cad5-4354-b8a4-7eae7f23b926.jpg',
  'images/IMG_0088.jpg',
  'images/IMG_0163.jpg',
  'images/8837671b-6139-4fd2-a188-1e095097a121.jpg',
  'images/IMG_3321.jpg',
  'images/IMG_3373.jpg',
  'images/IMG_3544.jpg',
  'images/IMG_3598.jpg',
  'images/IMG_3648.jpg',
  'images/IMG_3801.jpg',
  'images/IMG_4014.jpg',
  'images/IMG_8955.jpg',
  'images/IMG_9472.jpg',
  'images/IMG_9535.jpg',
  'images/IMG_9824.jpg',
  'images/IMG_2477.jpg',
];

// ---------- REJECTION MESSAGES ----------
const rejectionMessages = [
  'Kalbimi kırıyorsun 🥲',
  'He he… tekrar dene 😌',
  'Zor kurtulursun benden 😎',
  'Yanlış butona bastın galiba 🤔',
  'Bir daha düşün 💭',
  'Emin misin? 🥺',
  'Hayır diye bir seçenek yok aslında 💅',
  'Bu buton çalışmıyor gibi 🤷‍♂️',
  'Son şansın… ya da değil 😏',
  'İnatçısın ama ben daha inatçıyım 😤',
  'Neredeyse kabul ediyordun, gördüm 👀',
  'Kalbin evet diyor, biliyorum 💓',
];

// ---------- DOM ELEMENTS ----------
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const rejectionText = document.getElementById('rejectionText');
const hintText = document.getElementById('hintText');
const landingScreen = document.getElementById('landingScreen');
const letterScreen = document.getElementById('letterScreen');
const galleryGrid = document.getElementById('galleryGrid');
const heartsBg = document.getElementById('heartsBg');
const celebration = document.getElementById('celebration');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const bgMusic = document.getElementById('bgMusic');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

// ---------- STATE ----------
let noClickCount = 0;
let yesScale = 1;
let currentLightboxIndex = 0;
let isMusicPlaying = false;

// ---------- FLOATING HEARTS ----------
function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('floating-heart');

  const hearts = ['💕', '💗', '💖', '💓', '❤️', '🩷', '🤍', '💘'];
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

  const size = Math.random() * 20 + 14;
  heart.style.fontSize = size + 'px';
  heart.style.left = Math.random() * 100 + '%';
  heart.style.animationDuration = Math.random() * 8 + 8 + 's';
  heart.style.animationDelay = Math.random() * 2 + 's';

  heartsBg.appendChild(heart);

  // Clean up after animation
  setTimeout(() => {
    heart.remove();
  }, 18000);
}

// Spawn hearts at interval
setInterval(createFloatingHeart, 1200);
// Create initial batch
for (let i = 0; i < 6; i++) {
  setTimeout(createFloatingHeart, i * 400);
}

// ---------- NO BUTTON LOGIC ----------
btnNo.addEventListener('click', () => {
  noClickCount++;

  // Show rejection message
  const msgIndex = (noClickCount - 1) % rejectionMessages.length;
  rejectionText.textContent = rejectionMessages[msgIndex];
  rejectionText.classList.remove('visible');
  // Force reflow for re-animation
  void rejectionText.offsetWidth;
  rejectionText.classList.add('visible');

  // Shake the No button
  btnNo.classList.remove('shake');
  void btnNo.offsetWidth;
  btnNo.classList.add('shake');

  // Grow the Yes button
  yesScale += 0.08;
  btnYes.style.transform = `scale(${yesScale})`;
  btnYes.classList.add('glowing');

  // Shrink the No button slightly
  const noScale = Math.max(0.6, 1 - noClickCount * 0.05);
  btnNo.style.transform = `scale(${noScale})`;
  btnNo.style.opacity = Math.max(0.5, 1 - noClickCount * 0.06);

  // After 3 clicks, show hint
  if (noClickCount >= 3) {
    hintText.textContent = '💡 İpucu: Büyük butona bas…';
    hintText.classList.add('visible');
  }

  // After 5 clicks, make No button run away on desktop
  if (noClickCount >= 5 && window.innerWidth > 640) {
    moveNoButton();
  }
});

function moveNoButton() {
  const container = btnNo.parentElement;
  const rect = container.getBoundingClientRect();

  const maxX = rect.width - btnNo.offsetWidth;
  const maxY = 100;

  const randomX = Math.random() * maxX - maxX / 2;
  const randomY = Math.random() * maxY - maxY / 2;

  btnNo.style.position = 'relative';
  btnNo.style.left = randomX + 'px';
  btnNo.style.top = randomY + 'px';
  btnNo.style.transition = 'left 0.3s ease, top 0.3s ease';
}

// ---------- YES BUTTON LOGIC ----------
btnYes.addEventListener('click', () => {
  // Trigger celebration
  launchCelebration();

  // Start music automatically when she says Yes
  startMusic();

  // Transition to letter screen
  landingScreen.style.opacity = '0';
  landingScreen.style.transition = 'opacity 0.8s ease';

  setTimeout(() => {
    landingScreen.classList.remove('active');
    letterScreen.classList.add('active');

    // Scroll to top of letter screen
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Speed up floating hearts temporarily
    for (let i = 0; i < 15; i++) {
      setTimeout(createFloatingHeart, i * 100);
    }
  }, 800);
});

// ---------- AUTO-START MUSIC ----------
function startMusic() {
  if (isMusicPlaying) return;
  bgMusic.volume = 0;
  bgMusic.play().then(() => {
    isMusicPlaying = true;
    musicToggle.classList.add('playing');
    musicIcon.textContent = '♫';
    // Fade in smoothly over 2 seconds
    let vol = 0;
    const fadeIn = setInterval(() => {
      vol += 0.05;
      if (vol >= 0.5) {
        vol = 0.5;
        clearInterval(fadeIn);
      }
      bgMusic.volume = vol;
    }, 100);
  }).catch(() => {
    // Browser blocked autoplay - that's okay, she can use the toggle
  });
}

// ---------- CELEBRATION EFFECT ----------
function launchCelebration() {
  const colors = ['#ff85a1', '#e63970', '#ff6b8a', '#ffd1dc', '#fff0f3', '#d4a574', '#ff4081'];
  const shapes = ['❤️', '💖', '💕', '✨', '🌸', '💗'];

  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const piece = document.createElement('div');
      piece.classList.add('confetti-piece');

      // Mix of emoji and colored squares
      if (Math.random() > 0.5) {
        piece.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        piece.style.fontSize = Math.random() * 16 + 12 + 'px';
      } else {
        piece.style.width = Math.random() * 10 + 6 + 'px';
        piece.style.height = Math.random() * 10 + 6 + 'px';
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      }

      piece.style.left = Math.random() * 100 + '%';
      piece.style.animationDuration = Math.random() * 2 + 2 + 's';
      piece.style.animationDelay = Math.random() * 0.5 + 's';

      celebration.appendChild(piece);

      setTimeout(() => piece.remove(), 4500);
    }, i * 30);
  }
}

// ---------- PHOTO GALLERY ----------
function buildGallery() {
  photos.forEach((src, index) => {
    const item = document.createElement('div');
    item.classList.add('gallery-item');

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Bizim anımız ${index + 1}`;
    img.loading = 'lazy';

    // Handle image load errors gracefully
    img.onerror = () => {
      item.style.display = 'none';
    };

    item.appendChild(img);
    item.addEventListener('click', () => openLightbox(index));
    galleryGrid.appendChild(item);
  });
}

buildGallery();

// ---------- LIGHTBOX ----------
function openLightbox(index) {
  currentLightboxIndex = index;
  lightboxImg.src = photos[index];
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  currentLightboxIndex = (currentLightboxIndex + direction + photos.length) % photos.length;
  lightboxImg.style.animation = 'none';
  void lightboxImg.offsetWidth;
  lightboxImg.style.animation = 'zoomIn 0.3s ease-out';
  lightboxImg.src = photos[currentLightboxIndex];
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
lightboxNext.addEventListener('click', () => navigateLightbox(1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});

// Touch swipe for lightbox
let touchStartX = 0;
lightbox.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    navigateLightbox(diff > 0 ? 1 : -1);
  }
});

// ---------- MUSIC TOGGLE ----------
musicToggle.addEventListener('click', () => {
  if (isMusicPlaying) {
    bgMusic.pause();
    musicToggle.classList.remove('playing');
    musicIcon.textContent = '♪';
  } else {
    bgMusic.volume = 0.5;
    bgMusic.play().catch(() => {});
    musicToggle.classList.add('playing');
    musicIcon.textContent = '♫';
  }
  isMusicPlaying = !isMusicPlaying;
});

// ---------- PREVENT CONTEXT MENU ON PHOTOS ----------
document.addEventListener('contextmenu', (e) => {
  if (e.target.closest('.gallery-item') || e.target.closest('.lightbox')) {
    e.preventDefault();
  }
});
