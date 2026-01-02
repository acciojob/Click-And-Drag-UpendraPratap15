// Global angle for rotation
let angle = 0;

// Run when the page loads
window.onload = function () {
  // Create the line div
  const line = document.createElement("div"); // [web:22]
  line.id = "line";
  line.style.position = "absolute";
  line.style.width = "200px";
  line.style.height = "2px";
  line.style.backgroundColor = "#000000";
  line.style.top = "50%";
  line.style.left = "50%";
  // Center the line and allow rotation around center
  line.style.transform = "translate(-50%, -50%) rotate(0deg)"; // [web:26][web:40]
  line.style.transformOrigin = "50% 50%"; // [web:40]

  document.body.appendChild(line);

  // Rotate every 20 ms, increasing angle by 2 degrees
  setInterval(function () { // [web:36][web:39]
    angle += 2;
    // Keep angle from growing too large (optional, but cleaner)
    if (angle >= 360) {
      angle -= 360;
    }
    line.style.transform = "translate(-50%, -50%) rotate(" + angle + "deg)"; // [web:22][web:40]
  }, 20);
};
