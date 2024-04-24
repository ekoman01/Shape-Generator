const init = () => {
  const gridSize = 500;
  const stepSize = 300;
  const cellSize = stepSize / 2;
  let svgContent;

  const generateSVGShape = (gridSize) => {
    const numbers = [];
    for (let i = 0; i < gridSize + stepSize; i += stepSize) {
      numbers.push(i);
    }

    let startX = numbers[Math.floor(Math.random() * numbers.length)];
    let startY = numbers[Math.floor(Math.random() * numbers.length)];

    let currentX = startX;
    let currentY = startY;

    let points = `${currentX},${currentY} `;

    while (true) {
      let availableMoves = [];

      // Check adjacent cells for available moves
      for (let dx = -cellSize; dx <= cellSize; dx += cellSize) {
        for (let dy = -cellSize; dy <= cellSize; dy += cellSize) {
          let nextX = currentX + dx;
          let nextY = currentY + dy;

          // Ensure the move is within the grid and not revisiting a previous point
          if (nextX >= 0 && nextX <= gridSize && nextY >= 0 && nextY <= gridSize && !points.includes(`${nextX},${nextY}`)) {
            availableMoves.push({ x: nextX, y: nextY });
          }
        }
      }

      // Choose a random available move
      if (availableMoves.length > 0) {
        let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        currentX = move.x;
        currentY = move.y;
        points += `${currentX},${currentY} `;
      } else {
        // If no available moves, break the loop
        break;
      }
    }

    console.log(points);

    let svg = `<svg width="${gridSize}" height="${gridSize}">`;
    svg += `<polygon points="${points}" fill="black"> </polygon>`;
    svg += "</svg>";
    return svg;
  };

  const exportSVG = (svgContent) => {
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "random_figure_with_rules.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  document.getElementById("generateBtn").addEventListener("click", function () {
    svgContent = generateSVGShape(gridSize);
    document.getElementById("svgContainer").innerHTML = svgContent;
  });

  document.getElementById("downloadBtn").addEventListener("click", function () {
    exportSVG(svgContent);
  });
};

init();
