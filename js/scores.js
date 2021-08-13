function printScores() {

    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    highscores.sort(function(a, b) {
        return b.score - a.score;
    });

    highscores.forEach(function(score) {
        var liTag = document.createElement("li");
        liTag.textContent = score.initials + "-" + score.score;

        var olElement = document.getElementById("highscores");
        olElement.appendChild(liTag);
    });
}

    function clearScores() {
        window.localStorage.removeItem("highscores");
        window.location.reload();
    }

printScores();

    document.getElementById("clear").onclick = clearScores;