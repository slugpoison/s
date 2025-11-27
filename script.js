document.addEventListener("contextmenu", e => e.preventDefault());

const c = document.getElementById("px");
const ctx = c.getContext("2d");

const texts = [
    {text: "email", x: 100, y: 100, url: "mailto:example@example.com"},
    {text: "soundcloud", x: 100, y: 200, url: "https://soundcloud.com/username"},
    {text: "telegram", x: 100, y: 300, url: "https://t.me/username"}
];

function resizeCanvas() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    drawText();
}

function drawText(hoveredIndex = -1) {
    ctx.clearRect(0, 0, c.width, c.height);
    texts.forEach((t, i) => {
        ctx.font = i === hoveredIndex ? "italic 20px Arial" : "20px Arial";
        ctx.fillStyle = i === hoveredIndex ? "rgb(52,131,235)" : "black";
        ctx.fillText(t.text, t.x, t.y);
    });
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

c.addEventListener("mousemove", (e) => {
    const rect = c.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let hoveredIndex = -1;
    texts.forEach((t, i) => {
        const textWidth = ctx.measureText(t.text).width;
        const textHeight = 20;
        if(mouseX >= t.x && mouseX <= t.x + textWidth &&
           mouseY >= t.y - textHeight && mouseY <= t.y){
            hoveredIndex = i;
        }
    });

    c.style.cursor = hoveredIndex >= 0 ? "pointer" : "default";
    drawText(hoveredIndex);
});

c.addEventListener("click", (e) => {
    const rect = c.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    texts.forEach((t) => {
        const textWidth = ctx.measureText(t.text).width;
        const textHeight = 20;
        if(mouseX >= t.x && mouseX <= t.x + textWidth &&
           mouseY >= t.y - textHeight && mouseY <= t.y){
            window.open(t.url, "_blank");
        }
    });
});

c.addEventListener("mouseleave", () => {
    drawText();
    c.style.cursor = "default";
});
