const board = document.getElementById("hexagon");
const currentPlayerDisplay = document.getElementById("display");
let current = "Red";
let red = 0;
let blue = 0;
let redS = 0;
let blueS = 0;
let gameInt;
let turnInt;
let pause = false;
const redScore = document.getElementById("redscore");
const blueScore = document.getElementById("bluescore");
const gameTimer = document.getElementById("gametimer");
const turnTimer = document.getElementById("turntimer");
const pauseB = document.getElementById("pause");
const resumeB = document.getElementById("resume");
let gameTime = 180;
const turnTime = 20;
nodeClicked = null;
gameOver = false;
function hex() {
    nodesFilled = [0, 0, 0];
    unlocked = 3;
    arr = [];
    edges = [{ from: 0, to: 1, weight: 8 }, { from: 1, to: 2, weight: 8 }, { from: 2, to: 3, weight: 9 }, { from: 3, to: 4, weight: 8 }, { from: 4, to: 5, weight: 8 }, { from: 5, to: 0, weight: 9 }, { from: 6, to: 7, weight: 5 }, { from: 7, to: 8, weight: 6 }, { from: 8, to: 9, weight: 4 }, { from: 9, to: 10, weight: 5 }, { from: 10, to: 11, weight: 6 }, { from: 11, to: 6, weight: 4 }, { from: 12, to: 13, weight: 1 }, { from: 13, to: 14, weight: 1 }, { from: 14, to: 15, weight: 3 }, { from: 15, to: 16, weight: 2 }, { from: 16, to: 17, weight: 1 }, { from: 17, to: 12, weight: 2 }];
    for (i = 1; i <= 3; i++) {
        for (j = 0; j < 6; j++) {
            const angle = 60 * j;
            const [x, y] = toCoordinates(120 * i, angle);
            const node = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            node.setAttribute("cx", x);
            node.setAttribute("cy", y);
            node.setAttribute("r", 15);
            node.dataset.occupied = "false";
            node.dataset.layer = i;
            node.addEventListener("click", function () {
                const layer = parseInt(node.dataset.layer);
                if (node.dataset.occupied == "false" && layer >= unlocked && ((current == "Red" && red < 4) || (current == "Blue" && blue < 4)) && nodeClicked == null) {
                    node.dataset.occupied = "true";
                    if (current == "Red") red++;
                    else blue++;
                    nodesFilled[layer - 1]++;
                    if (nodesFilled[layer - 1] == 6 && unlocked > 1)
                        unlocked--;
                    node.classList.add(`${current.toLowerCase()}`);
                    score();
                    if (nodesFilled[0] == 6) endGame();
                    switchh();
                }
                else if (node.dataset.occupied == "true" && node.classList.contains(current.toLowerCase())) {
                    if (nodeClicked != node) {
                        if (nodeClicked) {
                            nodeClicked.classList.remove("selected");
                        }
                        nodeClicked = node;
                        node.classList.add("selected");
                    }
                    else {
                        nodeClicked.classList.remove("selected");
                        nodeClicked = null;
                    }
                }
                else if (node.dataset.occupied == "false" && nodeClicked) {
                    const fromI = arr.indexOf(nodeClicked);
                    const toI = arr.indexOf(node);
                    const cnction = edges.some(e =>
                        (e.from == fromI && e.to == toI) || (e.to == fromI && e.from == toI)
                    )
                    if (cnction && layer >= unlocked) {
                        nodeClicked.dataset.occupied = "false";
                        nodeClicked.classList.remove("selected", current.toLowerCase());
                        node.dataset.occupied = "true";
                        node.classList.add(current.toLowerCase());
                        nodeClicked = null;
                        if (fromI - toI == 6 || fromI - toI == -6) {
                            nodesFilled[layer - 1]++;
                        }
                        if (nodesFilled[layer - 1] == 6 && unlocked > 1 && layer == unlocked)
                            unlocked--;
                        score();
                        switchh();
                        if (nodesFilled[0] == 6) endGame();
                    }
                }
                console.log(`red=${red}`);
                console.log(`blue=${blue}`);
                console.log(`nodes: ${nodesFilled}`);
                console.log(`unlocked=${unlocked}`);
            });
            board.appendChild(node);
            arr.push(node);
        }
    }
    console.log(red);
    console.log(blue);
    console.log(arr);
    for (i = 0; i < 12; i = i + 2) {
        if (i == 6) i++;
        const from = i;
        const to = i + 6;
        const weight = 1;
        edges.push({ from, to, weight });
    }
    edges.forEach(e => {
        const fromm = arr[e.from];
        const too = arr[e.to];
        const x1 = parseFloat(fromm.getAttribute("cx"));
        const y1 = parseFloat(fromm.getAttribute("cy"));
        const x2 = parseFloat(too.getAttribute("cx"));
        const y2 = parseFloat(too.getAttribute("cy"));
        const xMid = (x1 + x2) / 2;
        const yMid = (y1 + y2) / 2;
        let xm = 400 - xMid;
        let ym = 400 - yMid;
        const len = Math.sqrt(xm * xm + ym * ym);
        xm /= len;
        ym /= len;
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", fromm.getAttribute("cx"));
        line.setAttribute("y1", fromm.getAttribute("cy"));
        line.setAttribute("x2", too.getAttribute("cx"));
        line.setAttribute("y2", too.getAttribute("cy"));
        board.insertBefore(line, board.firstChild);
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        if ((fromm == arr[9] && too == arr[15]) || (fromm == arr[0] && too == arr[6])) {
            text.setAttribute("x", xMid);
            text.setAttribute("y", yMid - 14);
        }
        else if ((fromm == arr[2] && too == arr[8]) || (fromm == arr[4] && too == arr[10]) || (fromm == arr[11] && too == arr[17]) || (fromm == arr[7] && too == arr[13])) {
            text.setAttribute("x", xMid + 14);
            text.setAttribute("y", yMid);
        }
        else {
            text.setAttribute("x", xMid + xm * 14);
            text.setAttribute("y", yMid + ym * 14);
        }
        text.setAttribute("fill", "white");
        text.setAttribute("font-size", "23");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.textContent = e.weight;
        board.appendChild(text);
    });
    pauseB.addEventListener("click", function () {
        pause = true;
        pauseB.disabled = true;
        resumeB.disabled = false;
    });
    resumeB.addEventListener("click", function () {
        pause = false;
        resumeB.disabled = true;
        pauseB.disabled = false;
    });
}
function timerOverall() {
    gameTime = 180;
    gameTimer.textContent = gameTime;
    gameInt = setInterval(() => {
        if (!pause) {
            gameTime--;
            gameTimer.textContent = gameTime;
            if (gameTime == 0) {
                clearInterval(gameInt);
                clearInterval(turnInt);
                endGame();
            }
        }
    }, 1000);
}
function timerTurn() {
    let turnTime = 20;
    turnTimer.textContent = turnTime;
    if (turnInt) clearInterval(turnInt);
    turnInt = setInterval(() => {
        if (!pause) {
            turnTime--;
            turnTimer.textContent = turnTime;
            if (turnTime == 0) {
                switchh();
                timerTurn();
            }
        }
    }, 1000);
}
function endGame() {
    gameOver = true;
    clearInterval(turnInt);
    clearInterval(gameInt);
    win = redS > blueS ? "Red" : (redS == blueS ? "Draw" : "Blue");
    if (win != "Draw") alert(`Game Over! Final Score: Red-${redS} Blue-${blueS} The winner is ${win}!!`);
    else alert(`Game Over! Final Score: Red-${redS} Blue-${blueS} It's a draw!!`)
    reset();
}
function score() {
    redS = 0;
    blueS = 0;
    edges.forEach(e => {
        const from = arr[e.from];
        const to = arr[e.to];
        const fromOcc = from.dataset.occupied == "true" ? (from.classList.contains("red") ? "red" : "blue") : null;
        const toOcc = to.dataset.occupied == "true" ? (to.classList.contains("red") ? "red" : "blue") : null;
        if (fromOcc && fromOcc == toOcc) {
            if (fromOcc == "red") redS += e.weight;
            else blueS += e.weight;
        }
    });
    redScore.textContent = redS;
    blueScore.textContent = blueS;
}

function toCoordinates(r, theta) {
    const rad = Math.PI * theta / 180;
    return [400 + (r * Math.cos(rad)), 400 + (r * Math.sin(rad))];
}
function reset() {
    board.innerHTML = "";
    current = "Red";
    currentPlayerDisplay.textContent = current;
    blue = 0;
    red = 0;
    redS = 0;
    blueS = 0;
    redScore.textContent = redS;
    blueScore.textContent = blueS;
    pause = false;
    resumeB.disabled = true;
    pauseB.disabled = false;
    clearInterval(turnInt);
    clearInterval(gameInt);
    hex();
    timerOverall();
    timerTurn();
}
function switchh() {
    current = current == "Red" ? "Blue" : "Red";
    currentPlayerDisplay.textContent = current;
    timerTurn();
}

hex();
timerOverall();
timerTurn();