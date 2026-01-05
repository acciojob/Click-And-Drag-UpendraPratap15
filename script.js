const slider = document.querySelector('.items');

let isDown = false;
let startX;
let scrollLeft;

// Mouse down: start dragging
slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');

  // Starting mouse position
  startX = e.pageX - slider.offsetLeft;
  // Current scroll position
  scrollLeft = slider.scrollLeft;
});

// Mouse leave: stop dragging
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

// Mouse up: stop dragging
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

// Mouse move: scroll while dragging
slider.addEventListener('mousemove', (e) => {
  if (!isDown) return; // only when mouse is down
  e.preventDefault();

  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX); // distance moved
  slider.scrollLeft = scrollLeft - walk;
});
