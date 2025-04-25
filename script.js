const gameField = document.querySelector('.game-field') // Получаем элемент игрового поля из DOM

gameField.addEventListener('click', (e) => sellhit(e)) // Добавляем обработчик клика на игровое поле, при клике вызывается функция sellhit

let field = [ // Создаем двумерный массив (матрицу), представляющий игровое поле. 0 - пустая ячейка
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

move = [0, 1]; // Массив, который должен содержать информацию о текущем ходе 

function setMove() { // Функция для смены хода 
    if (move[0] == 0) {
        move[0] = 'x' 
        move[1] = 2
    } else {
        move[0] = 0
        move[1] = 1
    }
}

function sellhit(e) { // Функция, вызываемая при клике на ячейку игрового поля
    let cell = e.target // Получаем элемент, на который кликнули (ячейку)
    let coordinates = cell.id.split(' ') // Получаем координаты ячейки из ее id (например, "0 1")
    field[coordinates[1]][coordinates[0]] = move[1] // Записываем ход игрока в массив field 
    cell.innerHTML = `${move[0]}`
    console.log(field) // Выводим текущее состояние игрового поля в консоль
    setMove() // Меняем ход
    checkWin() // Проверяем, есть ли победитель или ничья после каждого хода
}


function highlightWin(cells) {
    cells.forEach(([x, y]) => {
        const cell = document.getElementById(`${x} ${y}`);
        cell.classList.add('winning');
    });
}

function checkWin() {
    // Проверка по строкам
    for (let i = 0; i < 3; i++) {
        if (field[i][0] !== 0 && field[i][0] === field[i][1] && field[i][0] === field[i][2]) {
            highlightWin([[0, i], [1, i], [2, i]]);
            return setTimeout(() => alert(field[i][0]), 100);
        }
    }

    // Проверка по столбцам
    for (let j = 0; j < 3; j++) {
        if (field[0][j] !== 0 && field[0][j] === field[1][j] && field[0][j] === field[2][j]) {
            highlightWin([[j, 0], [j, 1], [j, 2]]);
            return setTimeout(() => alert(field[0][j]), 100);
        }
    }

    // Диагонали
    if (field[0][0] !== 0 && field[0][0] === field[1][1] && field[0][0] === field[2][2]) {
        highlightWin([[0, 0], [1, 1], [2, 2]]);
        return setTimeout(() => alert(field[0][0]), 100);
    }

    if (field[0][2] !== 0 && field[0][2] === field[1][1] && field[0][2] === field[2][0]) {
        highlightWin([[2, 0], [1, 1], [0, 2]]);
        return setTimeout(() => alert(field[0][2]), 100);
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
        return setTimeout(() => alert('draw'), 100);
    }

    return null;
}