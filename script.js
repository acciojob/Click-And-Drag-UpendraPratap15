const itemsContainer = document.querySelector('.items');
let draggedItem = null;
let shiftX = 0;
let shiftY = 0;
let containerRect = itemsContainer.getBoundingClientRect();

function updateContainerBounds() {
  containerRect = itemsContainer.getBoundingClientRect();
}

function constrainToBounds(x, y, itemWidth, itemHeight) {
  const padding = 20;
  const maxX = containerRect.right - containerRect.left - itemWidth - padding;
  const maxY = containerRect.bottom - containerRect.top - itemHeight - padding;
  const minX = padding;
  const minY = padding;
  
  return {
    x: Math.max(minX, Math.min(maxX, x)),
    y: Math.max(minY, Math.min(maxY, y))
  };
}

function onMouseDown(event) {
  if (event.target.classList.contains('item')) {
    draggedItem = event.target;
    draggedItem.classList.add('active');
    itemsContainer.classList.add('active');
    
    shiftX = event.clientX - draggedItem.getBoundingClientRect().left;
    shiftY = event.clientY - draggedItem.getBoundingClientRect().top;
    
    draggedItem.style.position = 'absolute';
    draggedItem.style.zIndex = '1000';
    draggedItem.style.transition = 'none';
    
    updateContainerBounds();
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    
    event.preventDefault();
  }
}

function onMouseMove(event) {
  if (!draggedItem) return;
  
  const newX = event.clientX - containerRect.left - shiftX;
  const newY = event.clientY - containerRect.top - shiftY;
  
  const itemRect = draggedItem.getBoundingClientRect();
  const bounded = constrainToBounds(newX, newY, itemRect.width, itemRect.height);
  
  draggedItem.style.left = bounded.x + 'px';
  draggedItem.style.top = bounded.y + 'px';
}

function onMouseUp() {
  if (draggedItem) {
    draggedItem.classList.remove('active');
    draggedItem.style.transition = '';
    draggedItem = null;
    itemsContainer.classList.remove('active');
    
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
}

document.querySelectorAll('.item').forEach(item => {
  item.draggable = false;
});

itemsContainer.addEventListener('mousedown', onMouseDown);
window.addEventListener('resize', updateContainerBounds);
updateContainerBounds();
