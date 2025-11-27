document.addEventListener("contextmenu", e => e.preventDefault());

const c = document.getElementById("px");
const ctx = c.getContext("2d");

c.width = 200;
c.height = 60;

const texts = [
    {text: "email", x: 60, y: 15, url: "mailto:example@example.com"},
    {text: "soundcloud", x: 70, y: 30, url: "https://soundcloud.com/username"},
    {text: "telegram", x: 80, y: 45, url: "https://t.me/username"}
];

function drawText(hoveredIndex = -1) {
    ctx.clearRect(0, 0, c.width, c.height);
    texts.forEach((t, i) => {
        ctx.font = i === hoveredIndex ? "italic 12px Arial" : "12px Arial";
        ctx.fillStyle = i === hoveredIndex ? "rgb(52,131,235)" : "black";
        ctx.fillText(t.text, t.x, t.y);
    });
}

drawText();

c.addEventListener("mousemove", (e) => {
    const rect = c.getBoundingClientRect();
    const scaleX = c.width / rect.width;
    const scaleY = c.height / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    let hoveredIndex = -1;
    texts.forEach((t, i) => {
        const textWidth = ctx.measureText(t.text).width;
        const textHeight = 12;
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
    const scaleX = c.width / rect.width;
    const scaleY = c.height / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    texts.forEach((t) => {
        const textWidth = ctx.measureText(t.text).width;
        const textHeight = 12;
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
