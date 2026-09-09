function changeMoney(teamMoneyElementId, amount) {
    let input = document.querySelector("#" + teamMoneyElementId + " input");
    input.value = Number(input.value) + amount;
}

let shouldRemoveQuestionFromBoard = false;
let currentQuestionColumn = 0, currentQuestionValue = 0;
function showQuestion(column, value) {
    if (column == "final") value = "final";
    shouldRemoveQuestionFromBoard = false;
    currentQuestionColumn = column;
    currentQuestionValue = value;
    let questionData = column == "final" ? finalJeopardy : questions[column]["question_" + value];
    document.getElementById("jeopardy-main-table").classList.add("hidden");
    document.getElementById("final-jeopardy-button").classList.add("hidden");
    document.getElementById("answer").classList.add("hidden");
    let actuallyShowQuestion = () => setTimeout(() => {
        document.getElementById("jeopardy-main-table").classList.add("no-display");
        document.getElementById("price").textContent = column == "final" ? "Final Jeopardy" : "$" + value;
        document.getElementById("question").textContent = questionData.question;
        let media = document.getElementById("media");
        while (media.children.length) media.children[0].remove();
        if (questionData.media !== undefined) {
            media.innerHTML = questionData.media;
        }
        let answerElement = document.getElementById("answer");
        answerElement.textContent = questionData.answer;
        document.getElementById("show-answer").onclick = () => {
            shouldRemoveQuestionFromBoard = true;
            answerElement.classList.remove("hidden");
            if (questionData.reference !== undefined && !answerElement.innerHTML.includes(questionData.reference))
                answerElement.innerHTML += "<br><span style='font-size:14px'>(See " + questionData.reference + ")</span>";
        }
        document.getElementById("questions").classList.remove("no-display");
        setTimeout(() => document.getElementById("questions").classList.remove("hidden"), 100);
    }, 500);
    if (questionData.dailyDouble) {
        document.getElementById("exit-daily-double").classList.remove("hidden");
        setTimeout(() => {
            document.getElementById("jeopardy-main-table").classList.add("no-display");
            document.getElementById("daily-double-info").classList.remove("no-display");
            document.getElementById("exit-daily-double").classList.remove("no-display");
            document.getElementById("exit-daily-double").onclick = () => {
                document.getElementById("exit-daily-double").classList.add("hidden");
                document.getElementById("daily-double-info").classList.add("hidden");
                setTimeout(() => {
                    document.getElementById("exit-daily-double").classList.add("no-display");
                    document.getElementById("daily-double-info").classList.add("no-display");
                    actuallyShowQuestion();
                }, 500);
            };
            setTimeout(() => {
                document.getElementById("daily-double-info").classList.remove("hidden");
            }, 100);
        }, 500);
    } else
        actuallyShowQuestion();
}
function exitQuestion() {
    if (shouldRemoveQuestionFromBoard) {
        if (currentQuestionColumn == "final")
            document.getElementById("final-jeopardy-button").classList.add("remove-question");
        else
            document.querySelector("tbody>:nth-child(" + (currentQuestionValue / 200) + ")>:nth-child(" + (currentQuestionColumn + 1) + ")").classList.add("remove-question");
    }
    document.getElementById("questions").classList.add("hidden");
    setTimeout(() => {
        document.getElementById("questions").classList.add("no-display");
        document.getElementById("jeopardy-main-table").classList.remove("no-display");
        setTimeout(() => {
            document.getElementById("jeopardy-main-table").classList.remove("hidden");
            document.getElementById("final-jeopardy-button").classList.remove("hidden");
        }, 100);
    }, 500);
}

let elements = [];
window.onload = () => {
    let column = 0, currentMoneyValue = 200;
    document.querySelectorAll("td").forEach(element => {
        elements.push(element);
        element.column = column;
        element.moneyValue = currentMoneyValue;
        element.onclick = event => {
            showQuestion(event.target.column, event.target.moneyValue);
        };
        column++;
        if (column > 5) {
            column = 0;
            currentMoneyValue += 200;
        }
    });
};