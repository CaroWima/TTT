//elements (there's not much here)
const statusDiv = document.querySelector(".status");
const resetDiv = document.querySelector(".reset");
const cellBoxs = document.querySelectorAll(".bxbtn");

// game constants (so apparently that means these are unchangeable)
const xSymbol = "Crystals";
const oSymbol = "Skulls";

// game variables
let gameIsLive = true;
let xIsNext = true;

//functions
const letterToSymbol = (letter) => letter === "x" ? xSymbol : oSymbol;

const handleWin = (letter) => {
    gameIsLive = false;
        if (letter === "x") {
            statusDiv.innerHTML = `${letterToSymbol(letter)} have won!`;
        } else {
            statusDiv.innerHTML = `<span>${letterToSymbol(letter)} have won!</span>`;
        }
};

// game status

const checkGameStatus = () => {
    const topL = cellBoxs[0].classList[1];
    const topM = cellBoxs[1].classList[1];
    const topR = cellBoxs[2].classList[1];

    const middleL = cellBoxs[3].classList[1];
    const middleM = cellBoxs[4].classList[1];
    const middleR = cellBoxs[5].classList[1];

    const bottomL = cellBoxs[6].classList[1];
    const bottomM = cellBoxs[7].classList[1];
    const bottomR = cellBoxs[8].classList[1];


    //winner, yah or nah?

    if (topL && topL === topM && topL === topR){
        handleWin(topL); 
        cellBoxs[0].classList.add("won");
        cellBoxs[1].classList.add("won");
        cellBoxs[2].classList.add("won");
    } else if (middleL && middleL === middleM && middleL === middleR){
        handleWin(middleL);
        cellBoxs[3].classList.add("won");
        cellBoxs[4].classList.add("won");
        cellBoxs[5].classList.add("won");
    } else if (bottomL && bottomL === bottomM && bottomL === middleR){
        handleWin (bottomL);
        cellBoxs[6].classList.add("won");
        cellBoxs[7].classList.add("won");
        cellBoxs[8].classList.add("won");
    } else if (topL && topL === middleL && topL === bottomL){
        handleWin(topL);
        cellBoxs[0].classList.add("won");
        cellBoxs[3].classList.add("won");
        cellBoxs[6].classList.add("won");
    } else if (topM && topM === middleM && topM === bottomM){
        handleWin(topM);
        cellBoxs[1].classList.add("won");
        cellBoxs[4].classList.add("won");
        cellBoxs[7].classList.add("won");
    } else if (topR && topR === middleR && topR === bottomR){
        handleWin(topR);
        cellBoxs[2].classList.add("won");
        cellBoxs[5].classList.add("won");
        cellBoxs[8].classList.add("won");
    } else if (topL && topL === middleM && topL === bottomR){
        handleWin(topL);
        cellBoxs[0].classList.add("won");
        cellBoxs[4].classList.add("won");
        cellBoxs[8].classList.add("won");
    } else if (topR && topR === middleM && topR === bottomL){
        handleWin(topR); 
        cellBoxs[2].classList.add("won");
        cellBoxs[4].classList.add("won");
        cellBoxs[6].classList.add("won");
    } else if (topL && topM && topR && middleL && middleM && middleR && bottomL && bottomM && bottomR) {
        gameIsLive = false;
        statusDiv.innerHTML = "Game is tied!";
    } else {
        xIsNext = !xIsNext;
        if (xIsNext) {
             statusDiv.innerHTML = `${xSymbol} are next`;
        } else {
            statusDiv.innerHTML = `<span>${oSymbol} are next</span>`;
        }
           
    }
};




// event Handlers (that's what tutorial dude called them)
const handleReset = () => {
    xIsNext = true;
    statusDiv.innerHTML = `${xSymbol} is next`;
    letter = null;
    for (const cellBox of cellBoxs) {
        cellBox.classList.remove("x");
        cellBox.classList.remove("o");
        cellBox.classList.remove("won");
    }
    gameIsLive = true;
};

const handleCellClick = (e) => {
    const classList = e.target.classList;

    if (!gameIsLive || classList[1] === 'x' || classList[1] === 'o') {
        return;
      }

    if (xIsNext) {
        classList.add("x");
        checkGameStatus();
    } else {
        classList.add("o");
        checkGameStatus();
    }
};

//event Listeners (look up)

resetDiv.addEventListener("click",handleReset);

for (const cellBox of cellBoxs) {
    cellBox.addEventListener("click", handleCellClick)
}