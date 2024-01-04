export default class TileMap {
  constructor(tileSize, level, canvas, ctx) {
    this.tileSize = tileSize;
    this.hex = this.image("Hex.png");
    this.level = level;
    this.canvas = canvas;
    this.ctx = ctx;
  }

  image(fileName) {
    const img = new Image();
    img.src = `images/${fileName}`;
    return img;
  }

  draw() {
    this.setCanvasSize();
    this.clearCanvas();
    this.drawMap();
  }

  drawMap() {
    const hexSize = this.tileSize;
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;

    const rows = [
      [1, 1, 0],
      [1, 1, 1],
      [0, 1, 1],
    ];

    const upperOffset = 15; // Зсув верхніх рядів вниз

    for (let row = 0; row < rows.length; row++) {
      const totalHexes = rows[row].reduce((acc, val) => acc + val, 0);
      let startX = centerX - (totalHexes / 2) * hexSize * 1.5;

      for (let col = 0; col < rows[row].length; col++) {
        if (rows[row][col] === 1) {
          const hexX = startX + hexSize * 1.5 * col;
          let hexY = centerY + (row - 1) * ((hexSize * Math.sqrt(3)) / 2);

          // Зсув верхніх рядів
          if (row === 0) {
            hexY += upperOffset;
          }

          this.ctx.drawImage(this.hex, hexX, hexY, hexSize, hexSize);
        }
      }
    }
  }

  clearCanvas() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setCanvasSize() {
    const newSize = this.tileSize * 5; // Розмір хексагону помножений на кількість, щоб утворити великий хексагон
    this.canvas.height = newSize * Math.sqrt(3); // Збільшуємо розмір канвасу
    this.canvas.width = newSize * 3; // Збільшуємо розмір канвасу
  }
}
