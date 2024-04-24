const init = () => {
  const generateRandomFigure = () => {
        const gridSize = 5; // Size of the grid
        const cellSize = 50; // Size of each grid cell
        const gridSizePx = gridSize * cellSize;

        let svgContent = `<svg width="${gridSizePx}" height="${gridSizePx}" xmlns="http://www.w3.org/2000/svg">`;

        // Generate grid points
        const gridPoints = [];
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                gridPoints.push([i * cellSize, j * cellSize]);
            }
        }

        // Select 8 consecutive points from the grid to form a line
        const startIndex = Math.floor(Math.random() * (gridPoints.length - 6));
        const linePoints = gridPoints.slice(startIndex, startIndex + 8);

        // Drawing figure
        const pathData = getPathData(linePoints, cellSize);
        const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        svgContent += `<path d="${pathData}" fill="${color}" />`;

        svgContent += `</svg>`;

        return svgContent;
    }

    // Function to generate path data from points
    const getPathData = (points, cellSize) => {
        let pathData = `M ${points[0][0]} ${points[0][1]}`;
        for (let i = 1; i < points.length; i++) {
            const [x, y] = points[i];
            pathData += ` L ${x} ${y}`;
        }
        pathData += ' Z';
        return pathData;
    }

    const exportSVG = (svgContent) => {
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'random_figure_with_rules.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
    }

    let svgContent;

    document.getElementById('generateBtn').addEventListener('click', function () {
        svgContent = generateRandomFigure();
        document.getElementById('svgContainer').innerHTML = svgContent;
    });

    document.getElementById('downloadBtn').addEventListener('click', function () {
        exportSVG(svgContent);
    });
};

init();