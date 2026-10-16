// Set the background images for each section.
// These paths are relative to index.html.
const backgroundSlideshows = [
  {
    selector: ".intro--parallax",
    images: ["images/luffy2.png", "images/luffy1.png"],
  },
  {
    selector: ".commission-parallax",
    images: ["images/keychains.JPEG", "images/print.JPEG", "images/stickers.JPEG"],
  },
];

// Wait this many milliseconds before automatically showing the next image.
const slideInterval = 6500;

// Respect the visitor's reduced-motion preference by starting paused.
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Set up controls and automatic rotation for each slideshow.
backgroundSlideshows.forEach((slideshow) => {
  // Find the section that owns this slideshow.
  const section = document.querySelector(slideshow.selector);

  // Skip this slideshow if its section or images are missing.
  if (!section || slideshow.images.length === 0) return;

  // Find the buttons and slide number inside this section.
  const previousButton = section.querySelector("[data-previous]");
  const nextButton = section.querySelector("[data-next]");
  const rotationButton = section.querySelector("[data-toggle-rotation]");
  const slideCount = section.querySelector("[data-slide-count]");

  // Stop if any required control is missing from the HTML.
  if (!previousButton || !nextButton || !rotationButton || !slideCount) return;

  // Keep track of which image is currently shown.
  let currentIndex = 0;

  // Store the timer so it can be stopped when rotation is paused.
  let timerId = null;

  // Start paused for reduced-motion users or if there is only one image.
  let rotationPaused = prefersReducedMotion || slideshow.images.length < 2;

  // Show the image at the requested index, wrapping at either end.
  function showImage(index) {
    currentIndex = (index + slideshow.images.length) % slideshow.images.length;

    // Pass the current file path to CSS as a background-image value.
    section.style.setProperty(
      "--parallax-image",
      `url("${slideshow.images[currentIndex]}")`
    );

    // Update the small "1 / 2" indicator.
    slideCount.textContent = `${currentIndex + 1} / ${slideshow.images.length}`;
  }

  // Start or stop the timer based on the paused state.
  function updateRotation() {
    clearInterval(timerId);
    timerId = null;

    if (!rotationPaused && slideshow.images.length > 1) {
      timerId = setInterval(() => {
        showImage(currentIndex + 1);
      }, slideInterval);
    }

    // Change the button label to describe what clicking it will do.
    rotationButton.textContent = rotationPaused ? "Play" : "Pause";
    rotationButton.setAttribute(
      "aria-label",
      rotationPaused
        ? "Resume automatic image rotation"
        : "Pause automatic image rotation"
    );
  }

  // Show the previous image when the left arrow is clicked.
  previousButton.addEventListener("click", () => {
    showImage(currentIndex - 1);
  });

  // Show the next image when the right arrow is clicked.
  nextButton.addEventListener("click", () => {
    showImage(currentIndex + 1);
  });

  // Pause or resume automatic rotation when its button is clicked.
  rotationButton.addEventListener("click", () => {
    rotationPaused = !rotationPaused;
    updateRotation();
  });

  // Display the first image and start rotating if not paused.
  showImage(0);
  updateRotation();
});