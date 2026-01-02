// Your code goes here

const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// When page loads, place cubes in a grid (absolute) so they can move freely
window.addEventListener('load', () => {
  const cols = 5; // how many cubes per row
  const gap = 20; // space between cubes

  const cubeWidth = 120;
  const cubeHeight = 120;

  container.style.position = 'relative';

  cubes.forEach((cube, index) => {
    cube.style.position = 'absolute';
    cube.style.width = cubeWidth + 'px';
    cube.style.height = cubeHeight + 'px';

    const row = Math.floor(index / cols);
    const col = index % cols;

    const left = col * (cubeWidth + gap);
    const top = row * (cubeHeight + gap);

    cube.style.left = left + 'px';
    cube.style.top = top + 'px';

    cube.style.cursor = 'grab';
  });
});

// Start dragging
cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    e.preventDefault();

    activeCube = cube;

    const cubeRect = cube.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Mouse offset inside the cube
    offsetX = e.clientX - cubeRect.left;
    offsetY = e.clientY - cubeRect.top;

    cube.style.cursor = 'grabbing';
  });
});

// Dragging while mouse moves
document.addEventListener('mousemove', (e) => {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeRect = activeCube.getBoundingClientRect();

  // Calculate new position relative to container
  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Boundary conditions: keep cube fully inside container
  const maxLeft = containerRect.width - cubeRect.width;
  const maxTop = containerRect.height - cubeRect.height;

  if (newLeft < 0) newLeft = 0;
  if (newTop < 0) newTop = 0;
  if (newLeft > maxLeft) newLeft = maxLeft;
  if (newTop > maxTop) newTop = maxTop;

  activeCube.style.left = newLeft + 'px';
  activeCube.style.top = newTop + 'px';
});

// Stop dragging
document.addEventListener('mouseup', () => {
  if (!activeCube) return;
  activeCube.style.cursor = 'grab';
  activeCube = null;
});
