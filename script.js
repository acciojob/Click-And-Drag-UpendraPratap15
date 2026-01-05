const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let dragItem = null;
let offsetX = 0;
let offsetY = 0;

// Position items absolutely at their initial places
items.forEach(item => {
  const rect = item.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  item.style.position = 'absolute';
  item.style.left = rect.left - containerRect.left + container.scrollLeft + 'px';
  item.style.top = rect.top - containerRect.top + container.scrollTop + 'px';
});

// Clamp helper
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function onMouseDown(e) {
  if (!e.target.classList.contains('item')) return;

  dragItem = e.target;

  const itemRect = dragItem.getBoundingClientRect();
  offsetX = e.clientX - itemRect.left;
  offsetY = e.clientY - itemRect.top;

  dragItem.style.zIndex = 1000;

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  e.preventDefault();
}

function onMouseMove(e) {
  if (!dragItem) return;

  const containerRect = container.getBoundingClientRect();
  const itemRect = dragItem.getBoundingClientRect();

  let newLeft = e.clientX - containerRect.left - offsetX + container.scrollLeft;
  let newTop = e.clientY - containerRect.top - offsetY + container.scrollTop;

  const maxLeft = container.scrollWidth - itemRect.width;
  const maxTop = containerRect.height - itemRect.height;

  newLeft = clamp(newLeft, 0, maxLeft);
  newTop = clamp(newTop, 0, maxTop);

  dragItem.style.left = newLeft + 'px';
  dragItem.style.top = newTop + 'px';
}

function onMouseUp() {
  if (!dragItem) return;

  dragItem.style.zIndex = '';
  dragItem = null;

  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}

container.addEventListener('mousedown', onMouseDown);
