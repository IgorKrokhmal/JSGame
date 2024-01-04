export default class tileMap {
  constructor(tileSize, level) {
    this.tileSize = tileSize;
    this.hex = this.image("Hex.png");
    this.hero = this.image("hero.png");
    this.enemy = this.image("enemy.png");
    this.movebleHexImg = this.image("movebleHex.png");
    this.hexToAttackImg = this.image("hexToAttack.png");
    this.level = level;
  }

  image(fileName) {
    const img = new Image();
    img.src = `images/${fileName}`;
    return img;
  }

  draw(canvas, ctx) {
    this.setCanvasSize(canvas, this.level);
    this.clearCanvas(canvas, ctx);
    this.drawMap(ctx, this.level);
  }

  drawMap(ctx, arr) {
    for (let row = 0; row < arr.length; row++) {
      for (let column = 0; column < arr[row].length; column++) {
        const tile = arr[row][column];
        const hexX = column * this.tileSize;
        const hexY = row * this.tileSize;

        if (tile != -1) {
          ctx.drawImage(this.hex, hexX, hexY, this.tileSize, this.tileSize);
        }

        if (tile === 1 || tile === 3) {
          const image = tile === 1 ? this.hero : this.movebleHexImg;
          ctx.drawImage(image, hexX, hexY, this.tileSize, this.tileSize);
        } else if (tile.type === 2) {
          ctx.drawImage(this.hex, hexX, hexY, this.tileSize, this.tileSize);
          if (tile.canBeAttacked) {
            ctx.drawImage(
              this.hexToAttackImg,
              hexX,
              hexY,
              this.tileSize,
              this.tileSize
            );
          } else {
            ctx.drawImage(this.enemy, hexX, hexY, this.tileSize, this.tileSize);
          }
        }
      }
    }
  }

  clearCanvas(canvas, ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  setCanvasSize(canvas, arr) {
    canvas.height = arr.length * this.tileSize;
    canvas.width = arr[0].length * this.tileSize;
  }

  changeTilesOnAttack() {
    for (let row = 0; row < this.level.length; row++) {
      for (let column = 0; column < this.level[row].length; column++) {
        if (this.level[row][column] === 3) {
          this.level[row][column] = 0;
        }
      }
    }
  }
}
