"use strict";
import tileMapClass from "./tile_map_test.js";
const canvas = document.getElementById("game");
var level = [[0]];
const ctx = canvas.getContext("2d");
const tileSize = 512;
let canvasRect = canvas.getBoundingClientRect();

let tileMap = new tileMapClass(tileSize, level, canvas, ctx);

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.round(e.clientX - rect.left);
  const y = Math.round(e.clientY - rect.top);

  if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
    console.log(`Mouse position relative to canvas - x: ${x}, y: ${y}`);
  }
});

console.log(level);
function update() {
  tileMap.draw(canvas, ctx);
  // console.log("i'm gay");
  setTimeout(update, 60); // 1000 мс = 1 секунда
}

update(); // Спочатку викликаємо перший кадр
