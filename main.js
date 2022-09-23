const cursor = document.querySelector(".cursor");
const row = document.getElementsByClassName("row");
const holes = [...document.querySelectorAll(".hole")];
const scoreN = document.querySelector(".score");
const lifeN = document.querySelector(".life");
const startbutton = document.querySelector(".modal button");
const modal = document.querySelector(".modal");
const board = document.getElementById("board");
const gameOverModal = document.querySelector(".gameOverModal");
const gameOver = document.querySelector(".gameOver");
const retrybutton = document.querySelector(".gameOver button");
const level = document.querySelector(".level");
const levelModal = document.querySelector(".levelModal");
const levelButton = document.querySelector(".level button");
const levelText = document.getElementById("levelText");
let score = 0;
const defaultLife = 6;
const levelRow = 6;
const lastLevelRow = 8;
let life = defaultLife;
let startStop = 1;
let control = 0;
let levelControl = 1;
let levelSettings = [{},
{ kostebekSayisi: 1, timeOut: 2000, maxScore: 30 },
{ kostebekSayisi: 1, timeOut: 1700, maxScore: 60 },
{ kostebekSayisi: 1, timeOut: 1200, maxScore: 90 },
{ kostebekSayisi: 2, timeOut: 1000, maxScore: 120 },
{ kostebekSayisi: 3, timeOut: 1000, maxScore: 150 },
{ kostebekSayisi: 2, timeOut: 900, maxScore: 180 },
{ kostebekSayisi: 2, timeOut: 800, maxScore: 210 },
{ kostebekSayisi: 3, timeOut: 800, maxScore: 240 },
{ kostebekSayisi: 4, timeOut: 800, maxScore: 10000 }
];
let currentLevel = 1;
const sound = new Audio("sounds/smash.mp3");
const soundTwo = new Audio("sounds/ouch.mp3");
function run() {
    if (startStop) {
        let currentLevelSettings = levelSettings[currentLevel];
        let kostebekSayisi = currentLevelSettings.kostebekSayisi;
        let holeIndices = [];
        for (let j = 0; j < kostebekSayisi; j++) {
            let i = Math.floor(Math.random() * holes.length);
            holeIndices.push(i);
            let hole = holes[i];
            let timer = null;
            let img = document.createElement("img");
            img.classList.add("kostebek");
            img.src = "photo/kostebek.png";
            img.addEventListener("click", () => {
                control = 1;
                score += 5;
                levelControl = 1;
                sound.play();
                soundTwo.play();
                scoreN.textContent = score;
                img.src = "photo/kostebek1.png";
                timer = setTimeout(() => {
                    if (hole.childElementCount > 0) {
                        hole.removeChild(hole.children[0]);
                    }
                    control = 0;
                }, 120);
            });
            hole.appendChild(img);
        }
        timer = setTimeout(() => {
            for (let k = 0; k < holeIndices.length; k++) {
                let holeIndex = holeIndices[k];
                if (holeIndex > holes.length) {
                    break;

                }
                else {
                    let holeRemove = holes[holeIndex];
                    if (holeRemove.childElementCount > 0) {
                        holeRemove.removeChild(holeRemove.children[0]);
                    }
                }
            }
            run();
        }, currentLevelSettings.timeOut);
        if (score == currentLevelSettings.maxScore && levelControl) {
            levelModal.style.display = "block";
            cursor.style.display = "none";
        }
        function myFunction() {
            for (let n = 1; n <= currentLevel; n++) {
                if (n == currentLevel) {
                    let text = n;
                    document.getElementById("headerLevelSpan").innerHTML = text;
                    document.getElementById("levelText").innerHTML = text - 1;
                }
            }
        }
        myFunction();
    }
}
levelButton.addEventListener("click", () => {
    if (currentLevel >= levelRow && currentLevel <= lastLevelRow) {
        for (let k = 0; k < 1; k++) {
            addNewRow();
        }
    }
    levelModal.style.display = "none";
    cursor.style.display = "block";
    currentLevel += 1;
    levelControl = 0;

});
board.addEventListener("click", () => {
    if (control == 0 && startStop == 1 && life != 0) {
        life--;
    }
    lifeN.textContent = life;
    if (life == 0) {
        startStop = 0;
        gameOverModal.style.display = "block";
        cursor.style.display = "none";
        clearHolesForNewGame();
    }
    else {
        gameOverModal.style.display = "none";
        cursor.style.display = "block";
    }
})
function clearHolesForNewGame() {
    while (holes.length > 0) {
        holes.pop();
    }
    while (board.children.length > 0) {
        board.removeChild(board.children[0]);
    }
    addNewRow();
    addNewRow();
    addNewRow();
}
function addNewRow() {
    const div = document.createElement("div");
    div.setAttribute("class", "row");
    for (let m = 1; m <= 3; m++) {
        const newdiv = document.createElement("div");
        newdiv.setAttribute("class", "hole");
        div.appendChild(newdiv);
        board.appendChild(div);
        holes.push(newdiv);
    }
}
retrybutton.addEventListener("click", () => {
    startStop = 1;
    score = 0;
    scoreN.textContent = 0;
    gameOverModal.style.display = "none";
    lifeN.textContent = life;
    currentLevel = 1;
    cursor.style.display = "block";
    life = 6;
    run();
});
run();
board.addEventListener("mousemove", e => {
    cursor.style.top = e.pageY + "px";
    cursor.style.left = e.pageX + "px";
});
board.addEventListener("mousedown", (event) => {
    cursor.classList.add("active");
    event.preventDefault();
});
board.addEventListener("mouseup", (event) => {
    cursor.classList.remove("active");
    event.preventDefault();
});
startbutton.addEventListener("click", () => {
    modal.classList.add("modalclose");
});

