# Ezgi - Sevgililer Günü 💌

A romantic, playful single-page Valentine's Day website to ask Ezgi to be your Valentine.

## Quick Deploy to GitHub Pages

### 1. Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it something like `valentine` (or any name you like)
3. Keep it **Public** (required for free GitHub Pages)
4. **Don't** add a README (we already have one)
5. Click **Create repository**

### 2. Push the Code

Open Terminal in this project folder and run:

```bash
git init
git add .
git commit -m "Happy Valentine's Day 💕"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/valentine.git
git push -u origin main
```

> Replace `YOUR_USERNAME` with your actual GitHub username.

### 3. Enable GitHub Pages

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Branch: **main**, Folder: **/ (root)**
4. Click **Save**
5. Wait 1-2 minutes, then visit: `https://YOUR_USERNAME.github.io/valentine/`

## Project Structure

```
├── index.html          # Main page
├── style.css           # All styles & animations
├── script.js           # Interactive logic
├── images/             # Your photos (web-ready JPGs)
│   ├── IMG_5973.jpg
│   ├── IMG_6071.jpg
│   └── ... (22 photos)
├── Photos/             # Original photos (not needed for deployment)
└── README.md           # This file
```

## Customization

### Change the Letter Text
Edit `index.html` → find the `<div class="letter-body">` section and change the paragraphs.

### Add/Remove Photos
1. Add new `.jpg` files to the `images/` folder
2. Edit `script.js` → update the `photos` array at the top

### Add Background Music
1. Create a `music/` folder
2. Add your `.mp3` file (e.g., `music/song.mp3`)
3. In `index.html`, find the `<audio>` tag and uncomment/update the source:
   ```html
   <audio id="bgMusic" loop preload="auto">
     <source src="music/song.mp3" type="audio/mpeg">
   </audio>
   ```

### Change Colors
Edit `style.css` → modify the CSS variables in `:root` at the top.

### Change Rejection Messages
Edit `script.js` → update the `rejectionMessages` array.

## Features

- Mobile-first responsive design
- Playful "No" button that dodges, shrinks, and shows funny messages
- "Yes" button grows with each "No" click
- Beautiful letter reveal with typewriter-style animation
- Photo gallery with lightbox (click to enlarge, swipe on mobile)
- Floating hearts background animation
- Confetti celebration on "Yes"
- Background music toggle (add your own music file)
- Keyboard navigation in lightbox (arrows + Escape)

## License

Made with love 💗
