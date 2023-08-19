document.addEventListener("DOMContentLoaded", function () {
  const rollButton = document.getElementById("rollButton");
  const holdButton = document.getElementById("HOLD");
  const dice = document.getElementById("dice");
  const box = document.querySelector(".box");
  const box2 = document.querySelector(".box2");
  const playercurrentscore = document.querySelector(".player-current-score");
  const totalScoreBox1 = document.querySelector(".total-score-box1");
  const totalScoreBox2 = document.querySelector(".total-score-box2");
  const popup = document.querySelector(".popup"); // 팝업 엘리먼트

  let currentPlayer = 1;
  let currentScore = 0;
  let player1Score = 0;
  let player2Score = 0;
  let player1TotalScore = 0;
  let player2TotalScore = 0;

  const winningScore = 50;

  box.classList.add("active"); // 추가된 부분
  box2.classList.remove("active"); // 추가된 부분

  rollButton.addEventListener("click", function () {
    if (currentPlayer === 1) {
      player1Turn();
    } else {
      player2Turn();
    }
  });

  holdButton.addEventListener("click", function () {
    if (currentPlayer === 1) {
      player1TotalScore += currentScore;
      if (player1TotalScore >= winningScore) {
        playercurrentscore.textcontent = `Current Score: ${currentScore}`;
        totalScoreBox1.textContent = `Total Score: ${player1TotalScore}`;
        showWinnerPopup("Player 1");
        return; // 게임 종료
      }
      playercurrentscore.textcontent = `Current Score: ${currentScore}`;
      totalScoreBox1.textContent = `Total Score: ${player1TotalScore}`;
      player1Score = 0;
      currentScore = 0;

      currentPlayer = 2; // 수정된 부분
      box.classList.remove("active");
      box2.classList.add("active");
    } else {
      player2TotalScore += currentScore;
      if (player2TotalScore >= winningScore) {
        playercurrentscore.textcontent = `Current Score: ${currentScore}`;
        totalScoreBox2.textContent = `Total Score: ${player2TotalScore}`;
        showWinnerPopup("Player 2");
        return; // 게임 종료
      }
      playercurrentscore.textcontent = `Current Score: ${currentScore}`;
      totalScoreBox2.textContent = `Total Score: ${player2TotalScore}`;
      player2Score = 0;
      currentScore = 0;

      currentPlayer = 1; // 수정된 부분
      box2.classList.remove("active");
      box.classList.add("active");
    }
  });

  function player1Turn() {
    const existingDots = document.querySelectorAll(".dot");
    existingDots.forEach((dot) => dot.remove());

    const numDots = Math.floor(Math.random() * 6) + 1;

    if (numDots === 1 || numDots === 2) {
      currentScore = 0;
      playercurrentscore.textcontent = `Current Score: ${currentScore}`;
      totalScoreBox1.textContent = `Total Score: ${player1TotalScore}`;
      box.classList.remove("active");
      box2.classList.add("active");
      currentPlayer = 2;
    } else {
      currentScore += numDots;
    }

    updateCurrentPlayerDisplay(currentScore);
    updateDiceDots(numDots);
  }

  function player2Turn() {
    const existingDots = document.querySelectorAll(".dot");
    existingDots.forEach((dot) => dot.remove());

    const numDots = Math.floor(Math.random() * 6) + 1;

    if (numDots === 1 || numDots === 2) {
      currentScore = 0;
      playercurrentscore.textcontent = `Current Score: ${currentScore}`;
      totalScoreBox2.textContent = `Total Score: ${player2TotalScore}`;
      box2.classList.remove("active");
      box.classList.add("active");
      currentPlayer = 1;
    } else {
      currentScore += numDots;
    }

    updateCurrentPlayerDisplay(currentScore);
    updateDiceDots(numDots);
  }

  function updateCurrentPlayerDisplay(score) {
    if (currentPlayer === 1) {
      const playerCurrentScore = box.querySelector(".player-current-score");
      playerCurrentScore.textContent = `Current Score: ${score}`;
    } else {
      const playerCurrentScore = box2.querySelector(".player-current-score");
      playerCurrentScore.textContent = `Current Score: ${score}`;
    }
  }
  function updateDiceDots(numDots) {
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement("span");
      dot.className = "dot";
      dice.querySelector(".side").appendChild(dot);
    }
  }
  function showWinnerPopup(winner) {
    alert(`${winner} wins!`);
    resetGame();
  }

  function resetGame() {
    player1Score = 0;
    player2Score = 0;
    currentScore = 0;
    player1TotalScore = 0;
    player2TotalScore = 0;
    totalScoreBox1.textContent = "Total Score: 0";
    totalScoreBox2.textContent = "Total Score: 0";
    playercurrentscore.textContent = "Current Score: 0"; // currentScore 초기화 추가

    rollButton.disabled = false; // 게임 리셋 시 주사위 굴리기 활성화
    holdButton.disabled = false; // 게임 리셋 시 홀드 버튼 활성화
  }
});
