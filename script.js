/*
  This file adds two small features to the otherwise static page:
  1. It inserts your real contact links when you provide them.
  2. It filters project cards when someone clicks a category.
  The page's content and layout still work if JavaScript is unavailable.
*/

// EDIT THESE: Keep an empty string until you have a real, public link to share.
// The text between quotation marks is a string (a piece of text).
const contact = {
  email: "", // Example: "julian@example.com" (replace with YOUR address).
  github: "", // Example: "https://github.com/your-username".
  linkedin: "" // Example: "https://www.linkedin.com/in/your-name/".
};

// Map each contact value to the id of the matching link in index.html.
const contactLinks = [
  { value: contact.email, elementId: "email-link", prefix: "mailto:" },
  { value: contact.github, elementId: "github-link", prefix: "" },
  { value: contact.linkedin, elementId: "linkedin-link", prefix: "" }
];

// Track whether at least one working link was supplied.
let hasContactLink = false;

// Run the same link setup for email, GitHub, and LinkedIn.
contactLinks.forEach((item) => {
  // Find the <a> element using its unique id.
  const link = document.getElementById(item.elementId);
  // trim() removes accidental spaces before and after the entered value.
  const value = item.value.trim();
  // If the value is empty, leave the link hidden and move to the next item.
  if (!value) return;
  // Email links need "mailto:"; web links already start with "https://".
  link.href = item.prefix + value;
  // Remove the HTML hidden attribute so visitors can see the working link.
  link.hidden = false;
  // Remember that the page now has at least one contact method.
  hasContactLink = true;
});

// Remove the setup reminder when visitors have a real way to reach you.
if (hasContactLink) document.getElementById("contact-placeholder").hidden = true;

// Put the current year in the footer instead of editing it each January.
document.getElementById("year").textContent = new Date().getFullYear();

// Turn the NodeList of buttons into an array so we can loop over it easily.
const filterButtons = [...document.querySelectorAll(".filter-button")];
// Find every project card; each has a space-separated data-category value.
const projectCards = [...document.querySelectorAll(".project-card")];
// This hidden status message tells screen readers how many results remain.
const filterStatus = document.getElementById("filter-status");

// Register a click handler for each filter button.
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // The clicked button's data-filter is "all", "software", etc.
    const selectedCategory = button.dataset.filter;
    // Count visible cards for the screen-reader status below.
    let visibleCount = 0;

    // Update all button styles and accessible pressed states.
    filterButtons.forEach((candidate) => {
      // Only the clicked button should be active.
      const isActive = candidate === button;
      candidate.classList.toggle("is-active", isActive);
      candidate.setAttribute("aria-pressed", String(isActive));
    });

    // Show a card if "all" is selected or its categories contain the filter.
    projectCards.forEach((card) => {
      // split(" ") turns "education software" into two category names.
      const categories = card.dataset.category.split(" ");
      const shouldShow = selectedCategory === "all" || categories.includes(selectedCategory);
      // The hidden property removes unmatched cards from view and keyboard focus.
      card.hidden = !shouldShow;
      if (shouldShow) visibleCount += 1;
    });

    // Announce the result count without adding visible text to the layout.
    filterStatus.textContent = `${visibleCount} project${visibleCount === 1 ? "" : "s"} shown.`;
  });
});
