const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let quizData = []
let score = 0;

async function loadquizData(){
    try {
        const response = await fetch("question.json");
        quizData = await response.json();
        loadQuestion();
    } catch (error) {
        console.error("Error loading questions:", error);
        questionElement.innerText = "Failed to load questions.";
        nextButton.style.display='none'
    }
}

function loadQuestion() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    
    currentQuestion.options.forEach(option=>{
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", ()=> checkAnswer(option,button));
        optionsContainer.appendChild(button);
    })
}

function checkAnswer(selectedOption, button) {
    let correctAnswer = quizData[currentQuestionIndex].answer;
    if(selectedOption === correctAnswer) {
        score++;
        button.classList.add("correct");
    }
    else{
        button.classList.add("wrong");
    }
    document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);
    nextButton.style.display = "block";

}

function nextQuestion() {
    currentQuestionIndex++;
    if(currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.innerHTML = "";
    optionsContainer.innerHTML = "";
    resultContainer.classList.remove("hidden");
    scoreElement.innerText = `You scored ${score} out of ${quizData.length}`;
    nextButton.style.display = "none";

}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    loadQuestion();
}

function resetState(){
    optionsContainer.innerHTML = "";
    nextButton.style.display = "none";
}

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", resetQuiz);

loadquizData();
