const canvans = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const ctx = canvans.getContext("2d");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave")

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
canvans.width = CANVAS_SIZE;
canvans.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
// ctx.fillStyle = "green"
// ctx.fillRect(50, 20, 100, 49);
let painting = false;
let filling = false;

function startPainting() {
  painting = true;
}
function stopPainting() {
  painting = false;
}
function onMouseMove(event) {
  const x = event.offsetX
  const y = event.offsetY
  // console.log(x, y)
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function onMouseDown(event) {
  painting = true;
  
}

function onMouseUp(event) {
  painting = false;
}
function onMouseLeave(event) {
  painting = false;
}
function handleColorClick(event) {
  // console.log(event.target.style);
  const color = event.target.style.backgroundColor;
  // console.log(color)
  ctx.strokeStyle = color;
  ctx.fillStyle = color;


}
function handleRangeChange(event) {
  const size = event.target.value
  ctx.lineWidth = size;
  // console.log(event.target.value)
}
function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "FILL"
  } else {
    filling = true;
    mode.innerText = "Paint"
    ctx.fillStyle = ctx.strokeStyle;
  }
}
function handleCanvasClick(event) {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  }
  
}
function handleRigthClick(event) {
  // console.log(event)
  event.preventDefault();
}
function handleSaveClick(event) {
  const image = canvans.toDataURL()
  const link = document.createElement("a");
  link.href = image
  link.download = "PaintJs";
  link.click();
}
if (canvans) {
  canvans.addEventListener("mousemove", onMouseMove);  
  canvans.addEventListener("mousedown", startPainting);
  canvans.addEventListener("mouseup", stopPainting);
  canvans.addEventListener("mouseleave", stopPainting)
  canvans.addEventListener("click", handleCanvasClick)
  canvans.addEventListener("contextmenu", handleRigthClick)
}


// console.log(Array.from(colors));
// console.log(colors)

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));


if (range) {
  range.addEventListener("input", handleRangeChange)
}
if (mode) {
  mode.addEventListener("click", handleModeClick)
}
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick)
}