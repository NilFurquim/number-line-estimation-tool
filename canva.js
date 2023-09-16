const canvas = document.getElementById("drawingCanvas");
const context = canvas.getContext("2d");
let drawing = false;
let currentLine = []; // Store the current line being drawn
const allLines = []; // Store all lines drawn

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.3;
}

// Add event listeners for both mouse and touch events
canvas.addEventListener("mousedown", startDrawing, false);
canvas.addEventListener("mousemove", moveDrawing, false);
canvas.addEventListener("mouseup", stopDrawing, false);
canvas.addEventListener("mouseleave", leaveDrawing, false);

canvas.addEventListener("touchstart", startDrawing, false);
canvas.addEventListener("touchmove", moveDrawing, false);
canvas.addEventListener("touchend", stopDrawing, false);
canvas.addEventListener("touchcancel", leaveDrawing, false);

// Call resizeCanvas on page load and when the window is resized
resizeCanvas();
window.addEventListener("resize", resizeCanvas, false);

function startDrawing(event) {
    event.preventDefault();
    drawing = true;
    context.beginPath();
}

function moveDrawing(event) {
    event.preventDefault();
    if (!drawing) return;
    const x = event.clientX || event.touches[0].clientX;
    const y = event.clientY || event.touches[0].clientY;
    const canvasRect = canvas.getBoundingClientRect();
    const offsetX = x - canvasRect.left;
    const offsetY = y - canvasRect.top;
    context.lineTo(offsetX, offsetY);
    context.stroke();
    currentLine.push({ x: offsetX, y: offsetY }); // Store the point in the current line
}

function stopDrawing() {
    drawing = false;
    context.closePath();
    if (currentLine.length > 0) {
        allLines.push([...currentLine]); // Store the current line in allLines
        currentLine = []; // Reset the current line
        displayIntersections(); // Show intersection positions on mouse up
    }
}

function leaveDrawing() {
    drawing = false;
    displayStoredLines(); // Show the stored lines on mouse leave
}

// Function to clear the canvas and the stored lines
function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    allLines.length = 0; // Clear the stored lines
}


function displayIntersections() {
    const intersectionTable = document.getElementById("intersectionTable");
    intersectionTable.innerHTML = ""

    for (let i = 0; i < allLines.length; i++) {
        const intersectionElement = document.getElementById("intersectionTable").appendChild(document.createElement("tr"));
        const intersections = [];

        for (let j = 0; j < allLines[i].length - 1; j++) {
            const x1 = allLines[i][j].x;
            const y1 = allLines[i][j].y;
            const x2 = allLines[i][j + 1].x;
            const y2 = allLines[i][j + 1].y;

            // Check for intersection with the static line
            if ((y1 < middleY && y2 > middleY) || (y1 > middleY && y2 < middleY)) {
                const intersectionX = x1 + ((middleY - y1) * (x2 - x1)) / (y2 - y1);
                const percentage = ((intersectionX - leftX) / lineSize) * 100;
                intersections.push({ x: intersectionX, y: middleY, p: percentage });
            }
        }        
        intersectionElement.innerHTML += `<td>${i + 1}</td>`;
        let ul = intersectionElement.appendChild(document.createElement("td")).appendChild(document.createElement("ul"))
        intersections.forEach((intersection, index) => {
            ul.innerHTML += `<li>Intersection ${index + 1}: P: ${intersection.p.toFixed(2)}</li>`;
        });
    }
}
// Draw the static elements
context.strokeStyle = "#000"; // Set line color to black
context.lineWidth = 2; // Set line width

function getStoredLines() {
    return allLines;
}

const middleY = canvas.height * 0.5;
const leftX = canvas.width * 0.1;
const lineSize = canvas.width * 0.8;
const numVerticalLines = 10; // Number of vertical lines (0%, 10%, 20%, ..., 100%)

// Calculate the interval between vertical lines
const verticalLineInterval = lineSize / 10;


context.beginPath();
context.moveTo(leftX, middleY);
context.lineTo(leftX + lineSize, middleY);
context.moveTo(canvas.width * 0.1, middleY - 10);
context.lineTo(canvas.width * 0.1, middleY + 10);
context.moveTo(canvas.width * 0.9, middleY - 10);
context.lineTo(canvas.width * 0.9, middleY + 10);

for (let i = 1; i < numVerticalLines; i++) {
    const x = leftX + i * verticalLineInterval;
    context.moveTo(x, middleY - 10);
    context.lineTo(x, middleY + 10);

    // Display the percentage below each vertical line
    const percentage = i * 10;
    context.fillText(`${percentage}`, x - 10, middleY + 30);
}
context.stroke();

// Add labels
context.fillStyle = "#000"; // Set text color to black
context.font = "16px Arial";
context.fillText(" 0", canvas.width * 0.1 - 10, middleY + 30);
context.fillText("100", canvas.width * 0.9 - 10, middleY + 30);