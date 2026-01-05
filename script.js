// script.js

const slider = document.querySelector('.items');

let isDown = false;
let startX = 0;
let scrollStart = 0;

// Start drag
slider.addEventListener('mousedown', (e) => {
  // Cypress sends which: 1 for left button
  if (e.which !== 1 && e.button !== 0) return;

  isDown = true;
  slider.classList.add('active');

  // Use pageX (Cypress also uses pageX in trigger)
  startX = e.pageX - slider.offsetLeft;
  scrollStart = slider.scrollLeft;

  e.preventDefault();
});

// End drag on mouseup
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

// Also end drag if mouse leaves the element
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

// While moving, update scrollLeft
slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;

  e.preventDefault();

  const x = e.pageX - slider.offsetLeft;
  const walk = x - startX;         // distance mouse moved

  // Scroll opposite to drag direction
  slider.scrollLeft = scrollStart - walk;
});
