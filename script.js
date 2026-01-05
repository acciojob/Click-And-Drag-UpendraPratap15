const slider = document.querySelector('.items');

let isDown = false;
let startX = 0;
let scrollStart = 0;

// mousedown: start drag
slider.addEventListener('mousedown', (e) => {
  // only left button (which: 1 for Cypress)
  if (e.which !== 1 && e.button !== 0) return;

  isDown = true;
  slider.classList.add('active');

  // position of mouse within slider, using pageX (as Cypress does)
  startX = e.pageX - slider.offsetLeft;
  scrollStart = slider.scrollLeft;

  e.preventDefault();
});

// mouseleave: stop drag
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

  const x = e.pageX - slider.offsetLeft;      // current mouse pos
  const walk = x - startX;                    // how far moved

  // move opposite to drag, so dragging left scrolls right
  slider.scrollLeft = scrollStart - walk;
});

