// DOM элементы
const gameField = document.querySelector(".game-field");
const restartBtn = document.querySelector(".restart-btn");
const message = document.querySelector("#game-message");
const xScoreDisplay = document.querySelector("#x-score");
const oScoreDisplay = document.querySelector("#o-score");

const zero = `<div class="zero">
    <div class="half first"></div>
    <div class="half second"></div>
    <div class="half third"></div>
    <div class="half fourth"></div>
  </div>`;

const krest = `<div class="krest">
    <div class="part first-line"></div>
    <div class="part second-line"></div>
  </div>`;

// Состояние игры
let field = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let move = [krest, 1]; // [символ, значение]
let gameActive = true;
let scores = { x: 0, o: 0 };

// Отладка: Проверка, найден ли gameField
console.log("Game field:", gameField);

// Переключение между X и O
function setMove() {
  if (move[1] == 1) {
    move[0] = zero;
    move[1] = 2;
  } else {
    move[0] = krest;
    move[1] = 1;
  }
  console.log("Current move:", move);
}

// Обработчик клика по ячейке
function sellhit(e) {
  console.log("Click registered:", e.target);
  if (!gameActive || !e.target.classList.contains("cell")) return;
  const cell = e.target;
  const [x, y] = cell.id.split(" ").map(Number);

  if (field[y][x] !== 0) {
    console.log("Field already set:", x, y);
    return;
  }
  field[y][x] = move[1];
  cell.innerHTML = move[0];

  setMove();
  checkWin();
}

// Подсвечивание выигрышных ячеек
function highlightWin(cells) {
  cells.forEach(([x, y]) => {
    const cell = document.getElementById(`${x} ${y}`);
    cell.classList.add("winning");
  });
  console.log("Winning cells highlighted:", cells);
}

// Показ всплывающего сообщения
function showMessage(text) {
  message.textContent = text;
  message.classList.add("show");
  setTimeout(() => message.classList.remove("show"), 2000);
  console.log("Message shown:", text);
}

// Проверка на выигрыш или ничью
function checkWin() {
  // Строки
  for (let i = 0; i < 3; i++) {
    if (
      field[i][0] !== 0 &&
      field[i][0] === field[i][1] &&
      field[i][0] === field[i][2]
    ) {
      highlightWin([
        [0, i],
        [1, i],
        [2, i],
      ]);
      gameActive = false;
      if (field[i][0] === 1) {
        scores.x++;
        xScoreDisplay.textContent = scores.x;
        showMessage("X Wins!");
      } else {
        scores.o++;
        oScoreDisplay.textContent = scores.o;
        showMessage("O Wins!");
      }
      return;
    }
  }

  // Столбцы
  for (let j = 0; j < 3; j++) {
    if (
      field[0][j] !== 0 &&
      field[0][j] === field[1][j] &&
      field[0][j] === field[2][j]
    ) {
      highlightWin([
        [j, 0],
        [j, 1],
        [j, 2],
      ]);
      gameActive = false;
      if (field[0][j] === 1) {
        scores.x++;
        xScoreDisplay.textContent = scores.x;
        showMessage("X Wins!");
      } else {
        scores.o++;
        oScoreDisplay.textContent = scores.o;
        showMessage("O Wins!");
      }
      return;
    }
  }

  // Диагонали
  if (
    field[0][0] !== 0 &&
    field[0][0] === field[1][1] &&
    field[0][0] === field[2][2]
  ) {
    highlightWin([
      [0, 0],
      [1, 1],
      [2, 2],
    ]);
    gameActive = false;
    if (field[0][0] === 1) {
      scores.x++;
      xScoreDisplay.textContent = scores.x;
      showMessage("X Wins!");
    } else {
      scores.o++;
      oScoreDisplay.textContent = scores.o;
      showMessage("O Wins!");
    }
    return;
  }

  if (
    field[0][2] !== 0 &&
    field[0][2] === field[1][1] &&
    field[0][2] === field[2][0]
  ) {
    highlightWin([
      [2, 0],
      [1, 1],
      [0, 2],
    ]);
    gameActive = false;
    if (field[0][2] === 1) {
      scores.x++;
      xScoreDisplay.textContent = scores.x;
      showMessage("X Wins!");
    } else {
      scores.o++;
      oScoreDisplay.textContent = scores.o;
      showMessage("O Wins!");
    }
    return;
  }

  // Ничья
  let isDraw = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (field[i][j] === 0) {
        isDraw = false;
        break;
      }
    }
    if (!isDraw) break;
  }

  if (isDraw) {
    gameActive = false;
    showMessage("Draw!");
  }
}

// Сброс состояния игры
function resetGame() {
  field = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  move = [krest, 1];
  gameActive = true;
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("winning");
  });
  console.log("Game reset");
}

// Обработчики событий
gameField.addEventListener("click", sellhit);
restartBtn.addEventListener("click", resetGame);
