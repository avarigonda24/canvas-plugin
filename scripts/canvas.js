export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function func(canvas_id) {
    const canvas = document.getElementById(canvas_id);
    const ctx = canvas.getContext("2d");

let x = 20;          // circle position
let y = 150;
let dx = 2;          // velocity

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw circle
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#3498db";
    ctx.fill();

    // update position
    x += dx;

    // bounce off edges
    if (x > canvas.width - 20 || x < 20) {
    dx = -dx;
    }

    requestAnimationFrame(animate);
}
setTimeout(() => {
    animate();
}, 3000);

}