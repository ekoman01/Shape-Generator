const init = () => {
  const gridSize = 500;
  const stepSizes = [100, 200, 300]; // Array of step sizes
  const cellSize = stepSizes.reduce((acc, val) => Math.max(acc, val)) / 2; // Maximum step size divided by 2
  let svgContent;
  let diagonalMoves = 0; // Track diagonal moves

  const generateSVGShape = (gridSize) => {
    const numbers = [];
    for (let i = 0; i < gridSize + cellSize; i += cellSize) {
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
          if (
            nextX >= 0 &&
            nextX <= gridSize &&
            nextY >= 0 &&
            nextY <= gridSize &&
            !points.includes(`${nextX},${nextY}`)
          ) {
            // Allow diagonal move only if diagonalMoves is less than 4
            if (dx !== 0 && dy !== 0 && diagonalMoves >= 4) continue;

            // Increment diagonalMoves if a diagonal move is made
            if (Math.abs(dx) === cellSize && Math.abs(dy) === cellSize) {
              diagonalMoves++;
            }

            availableMoves.push({ x: nextX, y: nextY });
          }
        }
      }

      // Choose a random available move
      if (availableMoves.length > 0) {
        let move =
          availableMoves[Math.floor(Math.random() * availableMoves.length)];
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
    // Choose a random step size from stepSizes array
    const stepSize = stepSizes[Math.floor(Math.random() * stepSizes.length)];
    // Update cellSize based on the chosen step size
    const cellSize = stepSize / 2;
    svgContent = generateSVGShape(gridSize, stepSize, cellSize);
    document.getElementById("svgContainer").innerHTML = svgContent;
    // Reset diagonalMoves on generating new shape
    diagonalMoves = 0;
  });

  document.getElementById("downloadBtn").addEventListener("click", function () {
    exportSVG(svgContent);
  });
};

init();