// Each slideshow points to a section in index.html and lists its images.
// Add or remove image paths here to change the slides.
const backgroundSlideshows = [
  {
    selector: ".intro--parallax",
    images: ["images/luffy2.png", "images/luffy1.png"],
  },
  {
    selector: ".commission-parallax",
    images: [
      "images/keychains.JPEG",
      "images/print.JPEG",
      "images/stickers.JPEG",
    ],
  },
];

// Time between automatic image changes, in milliseconds.
const slideInterval = 6500;

// Duration of the swipe animation, in milliseconds.
// Keep this matched to the 720ms duration in styles.css.
const swipeDuration = 720;

// Check whether the visitor has asked their device to reduce motion.
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Set up the controls and slideshow behavior for each section.
backgroundSlideshows.forEach((slideshow) => {
  // Find the section this slideshow belongs to.
  const section = document.querySelector(slideshow.selector);

  // Skip this slideshow if its section or image list is missing.
  if (!section || slideshow.images.length === 0) return;

  // Find this section's previous, next, play/pause, and count controls.
  const previousButton = section.querySelector("[data-previous]");
  const nextButton = section.querySelector("[data-next]");
  const rotationButton = section.querySelector("[data-toggle-rotation]");
  const slideCount = section.querySelector("[data-slide-count]");

  // The slideshow needs all four controls to work.
  if (!previousButton || !nextButton || !rotationButton || !slideCount) {
    return;
  }

  // The index tells us which image is currently shown.
  let currentIndex = 0;

  // The timer automatically advances the slideshow.
  let timerId = null;

  // This prevents another click from interrupting an active swipe.
  let isTransitioning = false;

  // Reduced-motion visitors start with automatic rotation paused.
  // A one-image slideshow also has nothing to rotate.
  let rotationPaused = prefersReducedMotion || slideshow.images.length < 2;

  // Put the current image into the section's CSS background.
  function setCurrentImage() {
    section.style.setProperty(
      "--parallax-image",
      `url("${slideshow.images[currentIndex]}")`
    );

    // Show the current slide number, such as "1 / 2".
    slideCount.textContent =
      `${currentIndex + 1} / ${slideshow.images.length}`;
  }

  // Move to an image and animate it in from the requested direction.
  // Direction 1 means the next image comes in from the right.
  // Direction -1 means the previous image comes in from the left.
  function showImage(requestedIndex, direction = 1) {
    // Ignore clicks while an image is already swiping into view.
    if (isTransitioning) return;

    // Wrap around so moving past either end returns to the other end.
    const newIndex =
      (requestedIndex + slideshow.images.length) % slideshow.images.length;

    // Do nothing if the requested image is already visible.
    if (newIndex === currentIndex) return;

    // Remember whether this is a real change after the first image.
    const shouldAnimate = !prefersReducedMotion;

    // Update the index and slide number.
    currentIndex = newIndex;
    slideCount.textContent =
      `${currentIndex + 1} / ${slideshow.images.length}`;

    // Visitors who prefer reduced motion get an instant image change.
    if (!shouldAnimate) {
      setCurrentImage();
      return;
    }

    // Tell CSS which image should slide over the current background.
    section.style.setProperty(
      "--incoming-image",
      `url("${slideshow.images[currentIndex]}")`
    );

    // Set which side the new image should enter from.
    section.style.setProperty(
      "--swipe-start",
      direction > 0 ? "100%" : "-100%"
    );

    // Lock the arrow buttons until the swipe finishes.
    isTransitioning = true;
    previousButton.disabled = true;
    nextButton.disabled = true;

    // Restart the animation cleanly if this slideshow ran before.
    section.classList.remove("is-swiping");
    void section.offsetWidth;

    // Adding this class starts the CSS swipe animation.
    section.classList.add("is-swiping");

    // When the animation ends, make the incoming image the new background.
    window.setTimeout(() => {
      section.classList.remove("is-swiping");
      section.style.removeProperty("--incoming-image");
      section.style.removeProperty("--swipe-start");

      setCurrentImage();

      isTransitioning = false;
      previousButton.disabled = false;
      nextButton.disabled = false;
    }, swipeDuration);
  }

  // Start or stop automatic rotation, depending on the pause state.
  function updateRotation() {
    // Clear any existing timer before making a new one.
    window.clearInterval(timerId);
    timerId = null;

    // Start the timer only when rotation is on and multiple images exist.
    if (!rotationPaused && slideshow.images.length > 1) {
      timerId = window.setInterval(() => {
        showImage(currentIndex + 1, 1);
      }, slideInterval);
    }

    // The button label describes what clicking it will do.
    rotationButton.textContent = rotationPaused ? "Play" : "Pause";
    rotationButton.setAttribute(
      "aria-label",
      rotationPaused
        ? "Resume automatic image rotation"
        : "Pause automatic image rotation"
    );
  }

  // The left arrow shows the previous image, entering from the left.
  previousButton.addEventListener("click", () => {
    showImage(currentIndex - 1, -1);
  });

  // The right arrow shows the next image, entering from the right.
  nextButton.addEventListener("click", () => {
    showImage(currentIndex + 1, 1);
  });

  // Toggle automatic rotation when the play/pause button is clicked.
  rotationButton.addEventListener("click", () => {
    rotationPaused = !rotationPaused;
    updateRotation();
  });

  // Set up the first image and the initial play/pause button label.
  setCurrentImage();
  updateRotation();
});