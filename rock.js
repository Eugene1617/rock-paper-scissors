const butt = document.querySelectorAll(".element");
const score = document.querySelector(".score");
const move = document.querySelector(".move");
const resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", () => {
  cont = {
    coscore: 0,
    plascore: 0,
    draw: 0
  };

  localStorage.removeItem("rps");

  score.innerHTML = "You: 0 | Computer: 0 | Draw: 0";
  move.innerHTML = "You: — | Computer: —";
});

let cont = {
  coscore: 0,
  plascore: 0,
  draw: 0
};

const saved = localStorage.getItem("rps");
if (saved) {
  cont = JSON.parse(saved);
  updateUI("—", "—", "Continue playing");
}

butt.forEach(bt => {
  bt.addEventListener("click", () => {
    game(bt.innerText);
  });
});

function game(player) {
  const options = ["Rock👊", "Paper🖐️", "Scissors✌️"];
  const computer = options[Math.floor(Math.random() * 3)];

  let result = "";

  if (player === computer) {
    cont.draw++;
    result = "Draw";
  } 
  else if (
    (player === "Rock👊" && computer === "Scissors✌️") ||
    (player === "Paper🖐️" && computer === "Rock👊") ||
    (player === "Scissors✌️" && computer === "Paper🖐️")
  ) {
    cont.plascore++;
    result = "You win";
  } 
  else {
    cont.coscore++;
    result = "You lose";
  }

  updateUI(player, computer, result);
  localStorage.setItem("rps", JSON.stringify(cont));
}

function updateUI(player, computer, result) {
  score.innerHTML = `
    You: ${cont.plascore} 
    Computer: ${cont.coscore} 
    Draw: ${cont.draw}
  `;
  move.innerHTML = `
    You: ${player} | Computer: ${computer} 
    <b>${result}</b>
  `;
}
