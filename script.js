const slider = document.querySelector('.items');

let isDown = false;
let startX;
let scrollLeft;

// mousedown: start drag
slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');

  // Mouse position relative to slider
  startX = e.pageX - slider.offsetLeft;
  // Current scroll position
  scrollLeft = slider.scrollLeft;
});

// mouseleave: cancel drag if leaving area
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

// mouseup: stop drag
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

// mousemove: update scrollLeft while dragging
slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();

  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2; // multiplier = speed

  slider.scrollLeft = scrollLeft - walk;
});
