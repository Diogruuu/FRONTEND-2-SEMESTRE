// Lista de palavras (pode ser expandida)
const dictionary = ["SAGAZ", "NEGRO", "MEXER", "TERMO", "SENSO", "NOBRE", "ALGOZ", "AFETO", "PLENO", "MUITO", "SUTIL", "VIGOR", "FAZER", "ASSIM", "AUDIL"];
const targetWord = dictionary[Math.floor(Math.random() * dictionary.length)];

const keyboardLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
];

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;
const guesses = Array(6).fill().map(() => Array(5).fill(""));

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    createBoard();
    createKeyboard();
    document.addEventListener("keydown", handlePhysicalKeyboard);
});

function createBoard() {
    const board = document.getElementById("board");
    for (let r = 0; r < 6; r++) {
        const row = document.createElement("div");
        row.classList.add("row");
        row.setAttribute("id", `row-${r}`);
        for (let c = 0; c < 5; c++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.setAttribute("id", `tile-${r}-${c}`);
            row.appendChild(tile);
        }
        board.appendChild(row);
    }
}

function createKeyboard() {
    const keyboard = document.getElementById("keyboard");
    keyboardLayout.forEach(row => {
        const rowElement = document.createElement("div");
        rowElement.classList.add("keyboard-row");
        row.forEach(key => {
            const buttonElement = document.createElement("button");
            buttonElement.textContent = key === "BACKSPACE" ? "⌫" : key;
            buttonElement.classList.add("key");
            buttonElement.setAttribute("id", key);
            if (key === "ENTER" || key === "BACKSPACE") {
                buttonElement.classList.add("wide");
            }
            buttonElement.addEventListener("click", () => handleInput(key));
            rowElement.appendChild(buttonElement);
        });
        keyboard.appendChild(rowElement);
    });
}

function handlePhysicalKeyboard(e) {
    if (isGameOver) return;
    const key = e.key.toUpperCase();
    if (key === "ENTER" || key === "BACKSPACE") {
        handleInput(key);
    } else if (key.length === 1 && key >= "A" && key <= "Z") {
        handleInput(key);
    }
}

function handleInput(key) {
    if (isGameOver) return;

    document.getElementById("message-container").textContent = "";

    if (key === "BACKSPACE") {
        deleteLetter();
    } else if (key === "ENTER") {
        checkRow();
    } else {
        addLetter(key);
    }
}

function addLetter(letter) {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById(`tile-${currentRow}-${currentTile}`);
        tile.textContent = letter;
        guesses[currentRow][currentTile] = letter;
        currentTile++;
    }
}

function deleteLetter() {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById(`tile-${currentRow}-${currentTile}`);
        tile.textContent = "";
        guesses[currentRow][currentTile] = "";
    }
}

function checkRow() {
    if (currentTile < 5) {
        showMessage("Palavra muito curta");
        return;
    }

    const guess = guesses[currentRow].join("");

    // Análise das cores
    let targetWordCopy = targetWord;
    const tileColors = Array(5).fill("absent");

    // Primeira passagem: checar letras na posição correta (Verde)
    for (let i = 0; i < 5; i++) {
        if (guess[i] === targetWord[i]) {
            tileColors[i] = "correct";
            targetWordCopy = targetWordCopy.replace(guess[i], " ");
        }
    }

    // Segunda passagem: checar letras na posição errada (Amarelo)
    for (let i = 0; i < 5; i++) {
        if (tileColors[i] === "correct") continue;
        if (targetWordCopy.includes(guess[i])) {
            tileColors[i] = "present";
            targetWordCopy = targetWordCopy.replace(guess[i], " ");
        }
    }

    // Aplicar as cores ao tabuleiro e teclado
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${currentRow}-${i}`);
        setTimeout(() => {
            tile.classList.add(tileColors[i]);
            updateKeyboardColor(guess[i], tileColors[i]);
        }, i * 250); // Efeito de revelação em cascata
    }

    // Checar fim de jogo após a animação
    setTimeout(() => {
        if (guess === targetWord) {
            showMessage("Parabéns! Você acertou.");
            isGameOver = true;
        } else {
            if (currentRow >= 5) {
                isGameOver = true;
                showMessage(`Fim de jogo. A palavra era: ${targetWord}`);
            } else {
                currentRow++;
                currentTile = 0;
            }
        }
    }, 1500);
}

function updateKeyboardColor(letter, color) {
    const key = document.getElementById(letter);
    if (!key) return;

    // Evita sobrescrever verde com amarelo
    if (key.classList.contains("correct")) return;
    if (key.classList.contains("present") && color === "absent") return;

    key.classList.remove("present", "absent", "correct");

    // Aplica a cor diretamente via CSS no elemento para simplificar
    if (color === "correct") key.style.backgroundColor = "var(--color-correct)";
    if (color === "present") key.style.backgroundColor = "var(--color-present)";
    if (color === "absent") key.style.backgroundColor = "var(--color-absent)";
}

function showMessage(msg) {
    const messageContainer = document.getElementById("message-container");
    messageContainer.textContent = msg;
}