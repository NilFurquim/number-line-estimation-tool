// components/DrawingCanvas.tsx
"use client";
import React, { useRef, useEffect, useState } from 'react';

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let [drawing, setDrawing] = useState<boolean>(false);
  let [currentLine, setCurrentLine] = useState<{ x: number; y: number }[]>([]);
  const [allLines, setAllLines] = useState<{ x: number; y: number }[][]>([]);
  let windowSize = [800, 600];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    windowSize = [800, 600];
    if (typeof window !== 'undefined') {
        windowSize = [window.innerWidth, window.innerHeight];
    }
    
    if (!canvas || !context) {
        return;
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
    //window.addEventListener("resize", resizeCanvas, false);

    function startDrawing(event: any) {
        event.preventDefault();
        drawing = true;
        context?.beginPath();
    }

    function moveDrawing(event: MouseEvent | TouchEvent) {
        event.preventDefault();
        if (!drawing) return;
      
        if (!canvas) return;
      
        const canvasRect = canvas.getBoundingClientRect();
      
        let offsetX: number = 0, offsetY: number = 0;
        let isValidDrawing = false;
        if (event instanceof MouseEvent) {
          offsetX = event.clientX - canvasRect.left;
          offsetY = event.clientY - canvasRect.top;
          isValidDrawing = true;
        } else if (event instanceof TouchEvent && event.touches.length > 0) {
          const touch = event.touches[0];
          offsetX = touch.clientX - canvasRect.left;
          offsetY = touch.clientY - canvasRect.top;
          isValidDrawing = true;
        } 
        
        if (isValidDrawing) {
            context?.lineTo(offsetX, offsetY);
            context?.stroke();
            currentLine.push({ x: offsetX, y: offsetY }); // Store the point in the current line    
        }
    }     

    function stopDrawing() {
        drawing = false;
        context?.closePath();
        if (currentLine.length > 0) {
            allLines.push([...currentLine]); // Store the current line in allLines
            currentLine = []; // Reset the current line
            //displayIntersections(); // Show intersection positions on mouse up
        }
    }

    function leaveDrawing() {
        drawing = false;
        //displayStoredLines(); // Show the stored lines on mouse leave
    }

    // Function to clear the canvas and the stored lines
    // function clearCanvas() {
    //     context?.clearRect(0, 0, canvas.width, canvas.height);
    //     allLines.length = 0; // Clear the stored lines
    // }


    // function displayIntersections() {
    //     const intersectionTable = document.getElementById("intersectionTable");
    //     intersectionTable.innerHTML = ""

    //     for (let i = 0; i < allLines.length; i++) {
    //         const intersectionElement = document.getElementById("intersectionTable").appendChild(document.createElement("tr"));
    //         const intersections = [];

    //         for (let j = 0; j < allLines[i].length - 1; j++) {
    //             const x1 = allLines[i][j].x;
    //             const y1 = allLines[i][j].y;
    //             const x2 = allLines[i][j + 1].x;
    //             const y2 = allLines[i][j + 1].y;

    //             // Check for intersection with the static line
    //             if ((y1 < middleY && y2 > middleY) || (y1 > middleY && y2 < middleY)) {
    //                 const intersectionX = x1 + ((middleY - y1) * (x2 - x1)) / (y2 - y1);
    //                 const percentage = ((intersectionX - leftX) / lineSize) * 100;
    //                 intersections.push({ x: intersectionX, y: middleY, p: percentage });
    //             }
    //         }        
    //         intersectionElement.innerHTML += `<td>${i + 1}</td>`;
    //         let ul = intersectionElement.appendChild(document.createElement("td")).appendChild(document.createElement("ul"))
    //         intersections.forEach((intersection, index) => {
    //             ul.innerHTML += `<li>Intersection ${index + 1}: P: ${intersection.p.toFixed(2)}</li>`;
    //         });
    //     }
    // }
    // Draw the static elements
    context.strokeStyle = "#000"; // Set line color to black
    context.lineWidth = 2; // Set line width

    // function getStoredLines() {
    //     return allLines;
    // }

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
  
    }, []);
  
    return (
        <div className='flex flex-col place-content-center'>
            <div className='text-center w-32 py-4'>
                X
            </div>
            <div className=''>
                <canvas
                ref={canvasRef}
                width={windowSize[0]}
                height={windowSize[1] * 0.5}>
                </canvas>    
            </div>
        </div>
      
    );
  };
  
  export default DrawingCanvas;