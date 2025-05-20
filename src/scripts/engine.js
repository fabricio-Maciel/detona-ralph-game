const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    record: document.querySelector("#record"),
    resetGame: document.querySelector("#reset"),
    buttonResetYes: document.querySelector("#button-sim"),
    buttonResetNo: document.querySelector("#button-nao"),
    endGame: document.querySelector("#end-game"),
    startGame: document.querySelector("#start-game"),
    buttonStart: document.querySelector(".start-button"),
  },
  values: {
    timeId: null,
    gameVelocity: 500,
    hitPosition: 0,
    result: 0,
    currentTime: 10,
    recordAtual: 0,
  },
  actions: {
    countDownTimerId: null,
  },
};

// Função inicial
function init() {
  addListenerStart();
}

init();

// Função para startar o jogo
function addListenerStart() {
  state.view.buttonStart.addEventListener("click", () => {
    state.view.startGame.style.display = "none";
    startGameAgain();
  });
}

// Função que recomeça o jogo
function startGameAgain() {
  clearInterval(state.actions.countDownTimerId);
  clearInterval(state.values.timeId);
  moveEnemy();
  timer();
  addListenerHitBox();
  addListenerButtons();
}

// Função para correr o tempo de forma interna, visual e finalizar o game
function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.values.timeId);
    state.view.resetGame.style.display = "block";

    removeListenerHitBox();
    if (state.values.result > state.values.recordAtual) {
      state.values.recordAtual = state.values.result;
      state.view.record.textContent = `RECORD ${state.values.recordAtual} `;
    }
  }
}

// Função para randomizar qual elemento irá receber a classe enemy, e remover da anterior
function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

// Função que modifica a classe enemy em determinado tempo
function moveEnemy() {
  state.values.timeId = setInterval(randomSquare, state.values.gameVelocity);
}

// Função que chama a função responsável por decrementar o cronômetro do jogo, a cada um segundo
function timer() {
  state.actions.countDownTimerId = setInterval(countDown, 1000);
}

// Função que atribui o listener de click nas caixas e confere se a caixa clicada, é a certa ou não
function handleHitBoxClick(event) {
  const square = event.currentTarget;

  if (square.id === state.values.hitPosition) {
    state.values.result++;
    state.view.score.textContent = state.values.result;
    state.values.hitPosition = null;
  }
}

// Função que atribui o listener de click aos botões de jogar novamente
function addListenerButtons() {
  state.view.buttonResetYes.addEventListener("click", () => {
    state.view.resetGame.style.display = "none";
    state.values.result = 0;
    state.view.score.textContent = 0;
    state.values.currentTime = 10;
    console.log(state.values.currentTime);
    console.log(state.values.result);
    startGameAgain();
  });
  state.view.buttonResetNo.addEventListener("click", () => {
    state.view.resetGame.style.display = "none";
    state.view.endGame.style.display = "block";
  });
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", handleHitBoxClick);
  });
}

// Função que remove o listener das caixas quando acaba o jogo
function removeListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.removeEventListener("mousedown", handleHitBoxClick);
  });
}
