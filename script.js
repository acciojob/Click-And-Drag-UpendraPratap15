// Your code goes here 

const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// Prepare cubes: place them in a grid and make them absolutely positioned
window.addEventListener('load', () => {
  const cols = 5;      // cubes per row
  const gap = 20;      // gap between cubes
  const cubeSize = 120;

  container.style.position = 'relative';

  cubes.forEach((cube, index) => {
    cube.style.position = 'absolute';
    cube.style.width = cubeSize + 'px';
    cube.style.height = cubeSize + 'px';

    const row = Math.floor(index / cols);
    const col = index % cols;

    const left = col * (cubeSize + gap);
    const top = row * (cubeSize + gap);

    cube.style.left = left + 'px';
    cube.style.top = top + 'px';
    cube.style.cursor = 'grab';
  });
});

// Start dragging when mousedown on a cube
cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    e.preventDefault();

    activeCube = cube;

    const cubeRect = cube.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // offset of mouse inside the cube
    offsetX = e.clientX - cubeRect.left;
    offsetY = e.clientY - cubeRect.top;

    cube.style.cursor = 'grabbing';
    cube.style.zIndex = 1000; // bring to front while dragging
  });
});

// Move cube with mouse
document.addEventListener('mousemove', (e) => {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeRect = activeCube.getBoundingClientRect();

  // Position relative to container
  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Boundaries: keep cube fully inside container
  const maxLeft = containerRect.width - cubeRect.width;
  const maxTop = containerRect.height - cubeRect.height;

  if (newLeft < 0) newLeft = 0;
  if (newTop < 0) newTop = 0;
  if (newLeft > maxLeft) newLeft = maxLeft;
  if (newTop > maxTop) newTop = maxTop;

  activeCube.style.left = newLeft + 'px';
  activeCube.style.top = newTop + 'px';
});

// Drop cube on mouseup
document.addEventListener('mouseup', () => {
  if (!activeCube) return;
  activeCube.style.cursor = 'grab';
  activeCube.style.zIndex = '';
  activeCube = null;
});
