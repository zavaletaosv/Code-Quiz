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

    var titleElement = document.getElementById("questions-title");
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