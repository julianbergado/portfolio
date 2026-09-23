# Julian's portfolio website

A single-page portfolio made with **HTML, CSS, and JavaScript**. It has no build step, package manager, account requirement, or external assets. You can open `index.html` directly in a browser and publish the same files on GitHub Pages.

## Files and what they do

| File | Purpose | Start here when you want to... |
| --- | --- | --- |
| `index.html` | All visible writing and the page's sections. | Edit your bio, projects, experience, or headings. |
| `styles.css` | Colors, type, spacing, drawings, and mobile layout. | Change how the site looks. |
| `script.js` | Contact links, current year, and project filters. | Add your links or study a small interactive feature. |
| `README.md` | This guide; GitHub displays it on your repository page. | Learn how to edit and publish. |

**Before publishing:** open `script.js` and fill in at least your real email address in the `contact` object near the top. Empty fields stay hidden. Review the experience and project descriptions in `index.html` and adjust any wording that does not match how you want to present your work. The portfolio intentionally has no invented project links, resume URL, or headshot.

## View it locally

1. Unzip the folder and open `index.html` in a browser. Its style and filtering work directly from a file.
2. Change a sentence in `index.html`, save, and refresh the browser tab.
3. Change `--lime` at the top of `styles.css`, save, and refresh again. That one variable changes the accent across the site.

If your editor has a local preview extension, you can use it, but it is optional.

## Put it on GitHub Pages

1. Create a new GitHub repository, such as `portfolio`. To use the shortest possible address, name it `<your-username>.github.io` instead.
2. Upload the **contents** of this folder (`index.html`, `styles.css`, `script.js`, and `README.md`) to the repository's top level. Do not upload only the ZIP: GitHub Pages needs the actual files.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, then choose **main** and **/(root)**. Click **Save**.
5. GitHub will show your live website address on that Pages settings screen after publishing. A normal project repository uses `https://<your-username>.github.io/<repository>/`; a repository named `<your-username>.github.io` uses `https://<your-username>.github.io/`.

GitHub's current instructions: [configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) and [creating a Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site). All site asset paths are relative (`styles.css`, not `/styles.css`), so they work at either address.

## A tiny code reading guide

The source files include comments near every section, variable, and piece of behavior. Here is the mental model:

```html
<section id="work">                <!-- Creates an addressable part of the page. -->
  <h2>Things I've worked on</h2>   <!-- The heading describes that part. -->
</section>                         <!-- Ends the section. -->
```

```css
:root { --ink: #172332; }          /* Defines one reusable color variable. */
.button { color: var(--ink); }      /* Applies that color to elements with class="button". */
```

```js
const selectedCategory = button.dataset.filter; // Reads data-filter from the clicked button.
card.hidden = !shouldShow;                 // Hides a project when it does not match.
```

HTML answers **what is on the page**. CSS answers **how it looks**. JavaScript answers **what happens when someone interacts**. A `class` can apply to many elements; an `id` identifies a particular element. The `#work` in an `<a href="#work">` link jumps to the element with `id="work"`.

The braces `{}` in CSS enclose style declarations. In JavaScript, they can enclose an object (like `contact`) or a block of instructions (like the body of a click handler). `const` declares a name whose binding does not get reassigned; `let` is used for a value that changes, such as the visible project count.

## Personalize it

### Update contact links

Edit these three strings near the top of `script.js`:

```js
const contact = {
  email: "you@example.com",
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-name/"
};
```

Use your **own** values. The script adds `mailto:` to the email link and reveals each nonempty link. Delete a value between quotes to hide that link again. If all three are empty, the site displays a reminder for you in the contact section.

### Change a project

In `index.html`, find `<section ... id="work">` and its three `<article class="project-card">` elements. Within one card, edit its `<h3>` title, `<p>` summary, and the `<li>` topic tags. The small label `COURSE PROJECT`, `PROTOTYPE`, or `TEACHING` tells visitors what stage the work reached.

The `data-category` attribute controls filtering. For example, `data-category="education software"` shows that card when either Education or Software is selected. Use the existing names `software`, `hardware`, and `education`. To add a fourth card, copy one entire `<article>...</article>` block and edit its contents and category.

### Change colors or spacing

At the top of `styles.css`, edit the `:root` variables. `--ink` changes the dark surfaces and text; `--paper` changes the page background; `--lime` and `--coral` change accent colors; `--max-width` sets the widest content area. The `@media` blocks at the bottom change layouts on tablets and phones.

### Add a real project link

Within a project card, add a link **after** its `<ul class="tags">` list and before the closing `</div>` for `project-body`:

```html
<a href="https://github.com/your-username/your-project" target="_blank" rel="noopener noreferrer">View project ↗</a>
```

Replace the example URL with a real public page. For a course project, check the course's rules before making solution code public. You can link a project write-up or demo instead.

### Add an image later

Create an `images` folder next to `index.html`, put a file such as `prototype.jpg` inside it, and refer to it with a **relative** path:

```html
<img src="images/prototype.jpg" alt="My Arduino prototype on a workbench">
```

Meaningful `alt` text describes an image for someone who cannot see it. The existing abstract project illustrations are made entirely with CSS, so there are no required image files.

## If something looks wrong

- **No styling on the live page:** verify that `styles.css` is next to `index.html` and has the same capitalization as the `<link>` in the HTML.
- **A 404 page:** check that `index.html` is at the top of the chosen publishing folder and that Pages is set to the correct branch and folder.
- **Contact buttons are missing:** fill in at least one value in the `contact` object in `script.js`.
- **Filters do nothing:** ensure `script.js` is next to `index.html`, then check your browser's developer console for errors.

## A note on the content

The copy is a starting point based on Julian's known work. Project cards deliberately distinguish a course project from a prototype or teaching materials. Replace descriptions with more precise outcomes, screenshots, or write-ups as projects develop.
