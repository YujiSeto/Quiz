// Initial Data
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

// Events
document.querySelector(".scoreArea button").addEventListener("click", resetEvent);

// Functions
function showQuestion() {
  if (questions[currentQuestion]) {
    let q = questions[currentQuestion];

    let pct = Math.floor((currentQuestion / questions.length) * 100);

    document.querySelector(".progress--bar").style.width = `${pct}%`;

    document.querySelector(".scoreArea").style.display = "none";
    document.querySelector(".questionArea").style.display = "block";

    document.querySelector(".question").innerHTML = q.question;
    let optionsHtml = "";
    for (let i in q.options) {
      optionsHtml += `<div data-op="${i}"class="option"><span>${parseInt(i) + 1}</span> ${q.options[i]}</div>`;
    }
    document.querySelector(".options").innerHTML = optionsHtml;

    document.querySelectorAll(".options .option").forEach((item) => {
      item.addEventListener("click", optionClickEvent);
    });
  } else {
    finishQuiz();
  }
}

function optionClickEvent(e) {
  let clickedOption = parseInt(e.target.getAttribute("data-op"));

  if (questions[currentQuestion].answer == clickedOption) {
    correctAnswers++;
  }

  currentQuestion++;
  showQuestion();
}

function finishQuiz() {
  let points = Math.floor((correctAnswers / questions.length) * 100);

  if (points < 30) {
    document.querySelector(".scoreText1").innerHTML = "Sorry, you need to improve!";
    document.querySelector(".scorePct").style.color = "#ff0000";
    document.querySelector(".prizeImage").src = "sad.png";
  } else if (points >= 30 && points < 70) {
    document.querySelector(".scoreText1").innerHTML = "Good job, but you can do better!";
    document.querySelector(".scorePct").style.color = "#ff8000";
    document.querySelector(".prizeImage").src = "sad.png";
  } else if (points >= 70) {
    document.querySelector(".scoreText1").innerHTML = "Congratulations!";
    document.querySelector(".scorePct").style.color = "#0d630d";
    document.querySelector(".prizeImage").src = "prize.png";
  }

  document.querySelector(".scorePct").innerHTML = `You Scored ${points}%`;
  document.querySelector(".scoreText2").innerHTML = `You answered ${questions.length} questions and got ${correctAnswers} correct!`;
  document.querySelector(".questionArea").style.display = "none";
  document.querySelector(".scoreArea").style.display = "block";
  document.querySelector(".progress--bar").style.width = "100%";
}
function resetEvent() {
  correctAnswers = 0;
  currentQuestion = 0;

  showQuestion();
}
