# Green Bombers Baseball IQ ⚾

A gamified baseball situational awareness quiz app for the Green Bombers 8U team.

## Live Site

Deployed on Netlify: [your-site-name.netlify.app](https://your-site-name.netlify.app)

## Project Structure

```
baseball-iq-site/
├── netlify.toml          # Netlify deploy config
├── .gitignore
├── README.md
└── public/               # Everything in here gets deployed
    ├── index.html         # Main page
    ├── css/
    │   └── styles.css     # All styling
    ├── js/
    │   └── app.js         # Game logic & all scenarios
    └── images/
        ├── field.jpg      # Baseball diamond background
        └── logo.jpg       # Team logo
```

## Deploy Instructions

### First Time Setup

1. Create a GitHub account at [github.com](https://github.com) if you don't have one
2. Create a new repository: [github.com/new](https://github.com/new)
   - Name: `baseball-iq`
   - Public
   - Click **Create repository**
3. On the repo page, click **"uploading an existing file"**
4. Drag the **entire contents** of this project folder in (not the folder itself — the files inside it)
5. Click **Commit changes**

### Connect to Netlify

1. Go to [app.netlify.com](https://app.netlify.com) — sign up with GitHub
2. Click **Add new site → Import an existing project**
3. Choose **GitHub** → select your `baseball-iq` repo
4. Deploy settings are auto-detected from `netlify.toml`
5. Click **Deploy site**
6. Your site is live in ~30 seconds!

### Rename Your URL

1. In Netlify, go to **Site configuration → Change site name**
2. Set it to something like `green-bombers-iq`
3. Your URL becomes: `green-bombers-iq.netlify.app`

## Making Changes

After the initial setup, any changes you push to GitHub auto-deploy:

1. Edit files on GitHub (click any file → pencil icon → edit → commit)
2. Netlify detects the change and redeploys in ~15 seconds
3. Changes are live!

## Adding New Scenarios

Edit `public/js/app.js` and add entries to the `SCENARIOS` array:

```javascript
{
  id: 32,
  category: "Backing Up Overthrows",
  situation: "Describe what happens...",
  question: "You're the RIGHT FIELDER. What do you do?",
  runners: ["1B"],
  yourPosition: "RF",
  emoji: "⚾",
  ballPath: [
    { from: "HOME", to: "SS", type: "hit" },
    { from: "SS", to: "past1B", type: "overthrow" }
  ],
  options: [
    { text: "Wrong answer", correct: false, feedback: "Why it's wrong..." },
    { text: "Right answer", correct: true, feedback: "Why it's right..." },
    { text: "Wrong answer", correct: false, feedback: "Why it's wrong..." }
  ]
}
```

### Position Keys
- **Bases:** `HOME`, `1B`, `2B`, `3B`
- **Fielders:** `P`, `C`, `SS`, `1Bf`, `2Bf`, `3Bf`, `LF`, `LC`, `RC`, `RF`
- **Overthrows:** `past1B`, `past2B`, `past3B`, `pastHOME`

### Ball Path Types
- `hit` — white dashed line (ball hit from batter)
- `throw` — green dashed line (fielder throw)
- `overthrow` — red dashed line (errant throw)

### Categories
- `"Backing Up Overthrows"`
- `"Base Running"`
- `"Fielding Positions"`
- `"Game Smarts"`
