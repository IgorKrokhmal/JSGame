"use strict";
import tileMapClass from "./tile_map.js";
import DescriptionHandler from "./description_nav.js";
//оголошення змінних з документа
var infoElement = document.getElementById("info");
const canvas = document.getElementById("game");
const moveButton = document.getElementById("move");
const attackButton = document.getElementById("attack");
const roundAttackButton = document.getElementById("round_attack");
const singleAttackButton = document.getElementById("single_attack");
const returnButton = document.getElementById("return");
const mainButtons = document.getElementsByClassName("main_buttons");
const attackButtons = document.getElementsByClassName("attack_buttons");
var turnElement = document.getElementById("turn_count");
var scoreElement = document.getElementById("score");

function changeDisplayStyle(elements, displayValue) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = displayValue;
  }
}
//Карта
//0-hex
//1-hero
//2-enemy
//3-yellow hex(moveble)
var level = [
  [-1, -1, -1, 0, -1, 0, -1, 0, -1, -1, -1],
  [-1, -1, 0, -1, 0, -1, 0, -1, 0, -1, -1],
  [-1, 0, -1, 0, -1, 0, -1, 0, -1, 0, -1],
  [0, -1, 1, -1, 0, -1, 0, -1, 0, -1, 0],
  [-1, 0, -1, 0, -1, 0, -1, 0, -1, 0, -1],
  [-1, -1, 0, -1, 0, -1, 0, -1, 0, -1, -1],
  [-1, -1, -1, 0, -1, 0, -1, 0, -1, -1, -1],
];

//Генерація карти

const ctx = canvas.getContext("2d");
const tileSize = 512;

let tileMap = new tileMapClass(tileSize, level);

let Description = new DescriptionHandler();

let turnCounter = 1;
let scoreCounter = 0;

function roundAttackTileWithHero(event, tileMap) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;
  const column = Math.floor(x / tileSize);
  const row = Math.floor(y / tileSize);
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  if (
    row >= 0 &&
    row < tileMap.level.length &&
    column >= 0 &&
    column < tileMap.level[row].length
  ) {
    if (tileMap.level[row][column].canBeAttacked === true) {
      for (let i = 0; i < tileMap.level.length; i++) {
        for (let j = 0; j < tileMap.level[i].length; j++) {
          if (tileMap.level[i][j].canBeAttacked === true) {
            scoreCounter += Math.trunc(
              (tileMap.level[i][j].enemy.hitpoints *
                Math.trunc(hero.attack / 2)) /
                2
            );
            tileMap.level[i][j].enemy.hitpoints -= Math.trunc(hero.attack / 2);
            scoreElement.textContent = `SCORE:${scoreCounter}`;
            if (tileMap.level[i][j].enemy.hitpoints <= 0)
              tileMap.level[i][j] = 0;
          }
        }
      }

      tileMap.drawMap(ctx, tileMap.level);
      turnElement.textContent = `TURN:${turnCounter}`;
      turnCounter++;
    }
  }
}

function replaceTileWithHero(event, tileMap) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;
  const column = Math.floor(x / tileSize);
  const row = Math.floor(y / tileSize);

  if (
    row >= 0 &&
    row < tileMap.level.length &&
    column >= 0 &&
    column < tileMap.level[row].length
  ) {
    if (tileMap.level[row][column] === 3) {
      for (let i = 0; i < tileMap.level.length; i++) {
        for (let j = 0; j < tileMap.level[i].length; j++) {
          if (tileMap.level[i][j] === 3) {
            tileMap.level[i][j] = 0;
          }
        }
      }

      for (let i = 0; i < tileMap.level.length; i++) {
        for (let j = 0; j < tileMap.level[i].length; j++) {
          if (tileMap.level[i][j] === 1) {
            tileMap.level[i][j] = 0;
          }
        }
      }

      tileMap.level[row][column] = 1;
      tileMap.drawMap(ctx, tileMap.level);
      turnElement.textContent = `TURN:${turnCounter}`;
      turnCounter++;
    }
  }
}

//генерація ходу

moveButton.addEventListener(
  "click",
  function () {
    movebleHex(this.level);
    this.drawMap(ctx, this.level);
    console.log(this.level);
  }.bind(tileMap)
);
attackButton.addEventListener("click", function () {
  changeDisplayStyle(mainButtons, "none");
  changeDisplayStyle(attackButtons, "block");
});
returnButton.addEventListener("click", function () {
  changeDisplayStyle(mainButtons, "block");
  changeDisplayStyle(attackButtons, "none");
});

roundAttackButton.addEventListener(
  "click",
  function () {
    attackebleHex(this.level);
    this.drawMap(ctx, this.level);
    this.changeTilesAtAttack();
    console.log(this.level);
  }.bind(tileMap)
);
singleAttackButton.addEventListener("click", function () {});

canvas.addEventListener("click", function (event) {
  replaceTileWithHero(event, tileMap);
  roundAttackTileWithHero(event, tileMap);
});

function infoAbout(arr) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;
  const column = Math.floor(x / tileSize);
  const row = Math.floor(y / tileSize);
  if (row >= 0 && row < arr.length && column >= 0 && column < arr[row].length) {
    const tile = arr[row][column];
    // console.log(tile);
    if (tile === 1 || tile.type === 2) {
      if (tile === 1) {
        infoElement.textContent = `Hero: Hitpoints - ${hero.hitpoints} ❤️, Attack - ${hero.attack} ⚔️`;
      } else {
        infoElement.textContent = `Enemy: Hitpoints - ${tileMap.level[row][column].enemy.hitpoints} ❤️, Attack - ${tileMap.level[row][column].enemy.attack} ⚔️`;
      }
      infoElement.style.display = "block";
    } else {
      infoElement.style.display = "none";
    }
  }
}

//виведення інформації
canvas.addEventListener("mousemove", function (event) {
  // console.log("Row:", row, "Column:", column);
  infoAbout(tileMap.level);
});

//опції ходу
function movebleHex(arr) {
  for (let row = 0; row < arr.length; row++) {
    for (let column = 0; column < arr[row].length; column++) {
      let tile = arr[row][column];
      if (arr[row][column] === 1) {
        // Перевірка наявності -1 над 1 та обирання сусідніх нулів
        if (row > 0 && arr[row - 1][column] === -1) {
          // Встановлення значення 3 біля -1
          if (column > 0 && arr[row - 1][column - 1] === 0) {
            arr[row - 1][column - 1] = 3;
          }
          if (arr[row - 1][column + 1] === 0) {
            arr[row - 1][column + 1] = 3;
          }
        }

        // Обирання сусідніх нулів в рядку з 1
        // Обирання 0 на 2 рядка вище від 1 в тій же позиції
        if (row > 1 && arr[row - 2][column] === 0) {
          arr[row - 2][column] = 3;
        }

        // Обирання 0 на 2 рядка нижче від 1 в тій же позиції
        if (row < arr.length - 2 && arr[row + 2][column] === 0) {
          arr[row + 2][column] = 3;
        }

        // Обирання сусідніх нулів в рядку під 1
        if (row < arr.length - 1) {
          if (arr[row + 1][column] === -1) {
            if (column > 0 && arr[row + 1][column - 1] === 0) {
              arr[row + 1][column - 1] = 3;
            }
            if (arr[row + 1][column + 1] === 0) {
              arr[row + 1][column + 1] = 3;
            }
          }
        }
      }
      if (tile && tile.canBeAttacked) {
        tile.canBeAttacked = false;
      }
    }
  }
}
function attackebleHex(arr) {
  for (let row = 0; row < arr.length; row++) {
    for (let column = 0; column < arr[row].length; column++) {
      if (arr[row][column] === 1) {
        // Перевірка наявності -1 над 1 та обирання сусідніх нулів
        if (row > 0 && arr[row - 1][column] === -1) {
          // Встановлення значення 3 біля -1
          if (column > 0 && arr[row - 1][column - 1].type === 2) {
            arr[row - 1][column - 1].canBeAttacked = true;
          }
          if (arr[row - 1][column + 1].type === 2) {
            arr[row - 1][column + 1].canBeAttacked = true;
          }
        }

        // Обирання сусідніх нулів в рядку з 1
        // Обирання 0 на 2 рядка вище від 1 в тій же позиції
        if (row > 1 && arr[row - 2][column].type === 2) {
          arr[row - 2][column].canBeAttacked = true;
        }

        // Обирання 0 на 2 рядка нижче від 1 в тій же позиції
        if (row < arr.length - 2 && arr[row + 2][column].type === 2) {
          arr[row + 2][column].canBeAttacked = true;
        }

        // Обирання сусідніх нулів в рядку під 1
        if (row < arr.length - 1) {
          if (arr[row + 1][column] === -1) {
            if (column > 0 && arr[row + 1][column - 1].type === 2) {
              arr[row + 1][column - 1].canBeAttacked = true;
            }
            if (arr[row + 1][column + 1].type === 2) {
              arr[row + 1][column + 1].canBeAttacked = true;
            }
          }
        }
      }
    }
  }
}
//Персонажі
class Mobs {
  constructor(hitpoints, attack, blocking = false) {
    this.hitpoints = hitpoints;
    this.attack = attack;
    this.blocking = blocking;
  }
}
class Hero extends Mobs {
  constructor(hitpoints, attack, blocking) {
    super(hitpoints, attack, blocking);
  }
}

class Enemy extends Mobs {
  constructor(hitpoints, attack) {
    super(hitpoints, attack);
    this.tileType = 2;
    this.canBeAttacked = false;
  }
}

let hero = new Hero(20, 5, false);

class EnemyGenerator {
  static generateEnemies(numberOfEnemies) {
    let enemies = [];
    let hitPoints = 0;
    let enemyAttack = 0;
    for (let i = 0; i < numberOfEnemies; i++) {
      hitPoints++;
      if (hitPoints % 10 === 0) {
        enemyAttack++;
      }
      enemies.push(new Enemy(15 + hitPoints, 3 + enemyAttack));
    }
    return enemies;
  }
}

let numberOfEnemies = 10;
const enemies = EnemyGenerator.generateEnemies(numberOfEnemies);

let enemyCounter = 0;
while (enemyCounter < numberOfEnemies) {
  let row = Math.floor(Math.random() * tileMap.level.length);
  let column = Math.floor(Math.random() * tileMap.level[row].length);

  if (
    tileMap.level[row][column] !== -1 &&
    tileMap.level[row][column] !== 1 &&
    !tileMap.level[row][column].enemy
  ) {
    tileMap.level[row][column] = {
      type: 2,
      canBeAttacked: false,
      enemy: enemies[enemyCounter],
    };
    enemyCounter++;
  }
}

//оновлення екрану
// function update() {
//   tileMap.draw(canvas, ctx);
//   console.log("i'm gay");
//   requestAnimationFrame(update);
// }

// requestAnimationFrame(update);
function update() {
  tileMap.draw(canvas, ctx);
  // console.log("i'm gay");
  setTimeout(update, 60); // 1000 мс = 1 секунда
}

update(); // Спочатку викликаємо перший кадр
