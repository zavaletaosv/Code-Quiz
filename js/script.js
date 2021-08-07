var timerElement = document.getElementById("time");
var questionsElement = document.getElementById("questions");
var answersElement = document.getElementById("answers");
var startButton = document.getElementById("start");
var submitButton = document.getElementById("submit");
var initialsElement = document.getElementById("initials");
var feedbackElement = document.getElementById("feedback");

var time = questions.length * 15;
var timerId;
var currentQuestion = 0;

function quizStart() {

    var quizStartElement = document.getElementById("quiz-start");
    quizStartElement.setAttribute("class", "hide");

    questionsElement.removeAttribute("class");

    timerId = setInterval(runTime, 1000);

    timerElement.textContent = time;

    showQuestion();
}

function showQuestion() {

    var question = questions[currentQuestion];

    var titleElement = document.getElementById("question-title");
    titleElement.textContent = question.title;

    answersElement.innerHTML = "";

    question.answers.forEach(function(answer, i) {

        var answerNode = document.createElement("button");

        answerNode.setAttribute("class", "answer");
        answerNode.setAttribute("value", answer);
        answerNode.textContent = i + 1 + "." + answer;
        answerNode.onclick = questionClick;

        answersElement.appendChild(answerNode);
    });
}

function questionClick() {

    if (this.value !== questions[currentQuestion].answer) {

        time -= 15;

        if (time < 0) {
            time =0;
        }

        timerElement.textContent =time;

        feedbackElement.textContent = "Incorrect!";
    } else {
        feedbackElement.textContent = "Correct!";
    }

    feedbackElement.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackElement.setAttribute("class", "feedback hide");
    }, 1000);

    currentQuestion++;

    if (currentQuestion === questions.length) {
        quizEnd();
    } else {
        showQuestion();
    }
}

function quizEnd() {

    clearInterval(timerId);

    var endScreenElement = document.getElementById("quiz-end");
    endScreenElement.removeAttribute("class");

    var finalScoreElement = document.getElementById("final-score");
    finalScoreElement.textContent = time;

    questionsElement.setAttribute("class", "hide");
}

function runTime() {
    time--;
    timerElement.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}

function saveScore() {

    var initials = initialsElement.value.trim();

    if (initials !== "") {
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        var newScore = {
            score: time,
            initials: initials
        };

        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        window.location.href = "scores.html";
    }
}

function checkForEnter(event) {

    if (event.key === "Enter") {
        saveScore();
    }
}

startButton.onclick = quizStart;
submitButton.onclick = saveScore;

initialsElement.onkeyup = checkForEnter;