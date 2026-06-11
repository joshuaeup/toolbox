# Adding a New App

Every app in this repo automatically gets the shared navbar. Follow these steps:

## 1. Create your HTML file

Add your `.html` file to the repo root. It must be a complete HTML document (with `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`).

## 2. Add the navbar

In your `<head>`, link the shared stylesheet:

```html
<link rel="stylesheet" href="navbar.css">
```

At the very top of `<body>`, inject the navbar script:

```html
<body>
<script src="navbar.js"></script>
<!-- rest of your content -->
```

## 3. Register the link in navbar.js

Open [`navbar.js`](navbar.js) and add an entry to the `NAV_LINKS` array:

```js
const NAV_LINKS = [
  { href: 'index.html',               label: 'Home' },
  { href: 'your-new-file.html',       label: 'Your App Name' },  // ← add here
  // ...existing entries
];
```

The navbar will automatically highlight the active page — no other configuration needed.

## 4. Add a card to index.html

Open [`index.html`](index.html) and add a tool card inside the `.grid-wrap` div (look for the `ADD NEW TOOL CARDS HERE` comment):

```html
<a class="tool-card" href="your-new-file.html">
  <div class="card-icon icon-green">🔧</div>
  <p class="card-title">Your App Name</p>
  <p class="card-desc">One or two sentences describing what this tool does.</p>
  <p class="card-arrow">Open →</p>
</a>
```

Available icon background classes: `icon-green`, `icon-blue`, `icon-gold`.

## That's it

Commit and push. If GitHub Pages is enabled, the app will be live at:
`https://joshuaeup.github.io/claude-tools/your-new-file.html`
