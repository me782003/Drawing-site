
// localStorage.clear()

//===============

const canvas = document.getElementById("canvas")
const body = document.querySelector('body');

canvas.height = window.innerHeight
canvas.width = window.innerWidth

var theColor = '';
var lineW = 5;
let prevX = null
let prevY = null
let draw = false

body.style.backgroundColor = "#FFFFFF";
var theInput = document.getElementById("favcolor");

const ctx = canvas.getContext("2d")
ctx.fillStyle = '#fff';

theInput.addEventListener("input", function(){
    theColor = theInput.value;    
    ctx.fillStyle = theColor;
    ctx.fillRect(0,0,canvas.width, canvas.height);
    
}, false);

ctx.lineWidth = lineW;

document.getElementById("ageInputId").oninput = function() {
    draw = null
    lineW = document.getElementById("ageInputId").value;
    document.getElementById("ageOutputId").innerHTML = lineW;
    ctx.lineWidth = lineW;
}; 

let clrs = document.querySelectorAll(".clr")
clrs = Array.from(clrs);
clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.dataset.clr
    })
})

let clearBtn = document.querySelector(".clear")
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

let saveBtn = document.querySelector(".save")
saveBtn.addEventListener("click", () => {
    let data = canvas.toDataURL("imag/png")
    let a = document.createElement("a")
    a.href = data
    a.download = "sketch.png"
    a.click()
})

window.addEventListener("mousedown", (e) => draw = true)
window.addEventListener("mouseup", (e) => draw = false)

window.addEventListener("mousemove", (e) => {   

    //draw = fasle
    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX;
        prevY = e.clientY-canvas.offsetTop;
        return
    }
    
    
    console.log('after return');
    let currentX = e.clientX;
    let currentY = e.clientY-canvas.offsetTop;
    console.log(`prevX => ${prevX}`);
    console.log(`currentX => ${currentX}`);
    
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    
    prevX = e.clientX;
    prevY = e.clientY - canvas.offsetTop;
})



