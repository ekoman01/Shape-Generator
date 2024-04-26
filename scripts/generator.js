const init = () => {
  const gridSize = 500;
  const stepSizes = [100, 200, 300]; // Array of step sizes
  const cellSize = stepSizes.reduce((acc, val) => Math.max(acc, val)) / 2; // Maximum step size divided by 2
  let svgContent;
  let diagonalMoves = 0; // Track diagonal moves

  const generateSVGShape = (gridSize) => {
    const targetArea = Math.floor(gridSize * gridSize * 0.9); // % of the grid area

    const numbers = [];
    for (let i = 0; i < gridSize + cellSize; i += cellSize) {
      numbers.push(i);
    }

    let startX = numbers[Math.floor(Math.random() * numbers.length)];
    let startY = numbers[Math.floor(Math.random() * numbers.length)];

    let currentX = startX;
    let currentY = startY;

    let points = `${currentX},${currentY} `;
    let currentArea = cellSize * cellSize;

    while (currentArea < targetArea) {
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

      // If no available moves, break the loop
      if (availableMoves.length === 0) {
        break;
      }

      // Choose a random available move
      let move =
        availableMoves[Math.floor(Math.random() * availableMoves.length)];
      currentX = move.x;
      currentY = move.y;
      points += `${currentX},${currentY} `;
      currentArea += cellSize * cellSize;
    }

    console.log(points);

    let svg = `<svg width="${gridSize}" height="${gridSize}">`;
    svg += `<polygon points="${points}" fill="black" stroke="black"> </polygon>`;
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
    rotateAngle = 0;
    svgContent = generateSVGShape(gridSize);
    document.getElementById("svgContainer").innerHTML = svgContent;
    // Reset diagonalMoves on generating new shape
    diagonalMoves = 0;
  });

  document.getElementById("downloadBtn").addEventListener("click", function () {
    exportSVG(svgContent);
  });

  let rotateAngle = 0;

  const rotateSVG = () => {
    rotateAngle += 90;
    const svgElement = document.querySelector("svg");
    svgElement.style.transform = "rotate(" + rotateAngle + "deg)";
  };

  document.getElementById("rotateBtn").addEventListener("click", function () {
    rotateSVG();
  });
};

init();
