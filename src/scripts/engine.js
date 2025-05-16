const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    timeId: null,
    gameVelocity: 500,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
  },
  actions: {
    countDownTimerId: setInterval(countDown, 1000),
  },
};

// Função que toca o som de acerto
function playSound() {
  let audio = new Audio("./src/audios/hit.m4a");
  audio.volume = 0.04;
  audio.play();
}

// Função para correr o tempo de forma interna e visual
function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    alert("Game Over! O seu resultado foi: " + state.values.result);
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

// Função que atribui o listener de click nas caixas
function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound();
      }
    });
  });
}

// Função inicial
function init() {
  moveEnemy();
  addListenerHitBox();
}

init();
