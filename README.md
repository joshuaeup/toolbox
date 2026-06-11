# Tools

A personal collection of interactive calculators and references, served as a static site via GitHub Pages.

## Apps

| App | File | Description |
|-----|------|-------------|
| Home | `index.html` | Landing page with links to all tools |
| Affordability Calculator | `home_affordability_calculator_v6.html` | Estimate max home price from income & DTI |
| Rent vs. Buy | `rent_vs_buy_calculator.html` | Long-term cost comparison with break-even chart |

## Adding a new app

See [ADDING_APPS.md](ADDING_APPS.md) for step-by-step instructions.

---

## Deploying to GitHub Pages

### First-time setup

1. Go to your repo on GitHub: `https://github.com/joshuaeup/toolbox`
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Set branch to `main`, folder to `/ (root)`, then click **Save**
5. After ~60 seconds, your site will be live at:
   **`https://joshuaeup.github.io/toolbox/`**

### Pushing updates

Every push to `main` redeploys automatically:

```bash
cd ~/Desktop/toolbox-repo
git add .
git commit -m "your message"
git push
```

GitHub Pages typically reflects changes within 1–2 minutes.

### Custom domain (optional)

1. Add a `CNAME` file to the repo root containing your domain (e.g. `tools.yourdomain.com`)
2. Point a DNS CNAME record at `joshuaeup.github.io`
3. Enable **Enforce HTTPS** in the Pages settings once DNS propagates
