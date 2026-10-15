# Julian Bergado — art portfolio

A small art-first portfolio made with plain HTML and CSS, plus Instagram's public-post embed script. It has no build step, package manager, or framework. Open `index.html` in a browser to preview it.

## Files

- `index.html` contains the portfolio text, sections, links, and the nine Instagram post embeds.
- `styles.css` contains the colors, typography, spacing, and responsive layout.

## Update the portfolio

### Add or remove an Instagram post

In `index.html`, copy or remove one complete `<article class="instagram-card">...</article>` block inside `.instagram-grid`. Replace both post URLs in that block with the public post's permalink. Keep the embed script at the bottom of the page only once. Instagram's own caption and carousel appear in the embed; the link inside each block remains a fallback if Instagram does not load.

### Change the introduction, award details, or project descriptions

Edit the matching heading and paragraph in `index.html`. The section labels and comments mark where each part begins. Keep the text factual and update any numbers or dates when they change.

### Change the colors or layout

Edit the named color values at the top of `styles.css`. The phone layout rules are near the bottom in the `@media (max-width: 650px)` block.

## Preview and publish with GitHub Pages

1. To preview locally, open `index.html` in a browser. For the Instagram posts to render reliably, use a local web server or preview the published GitHub Pages site, since Instagram's embed script must load from the internet.
2. Upload `index.html`, `styles.css`, and this README to the root of the GitHub repository. If the repository already contains older portfolio files, replace the old `index.html` and `styles.css` with these versions.
3. In GitHub, open **Settings → Pages**. Select **Deploy from a branch**, choose the `main` branch and `/(root)` folder, then save.
4. Visit the published URL after GitHub Pages finishes deploying. Updates to files in the repository will trigger another deployment.

GitHub's instructions: [Configure a publishing source for GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
