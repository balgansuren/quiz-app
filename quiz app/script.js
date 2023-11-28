const questions = [
    {
        question: "What is the capital city of Mongolia?",
        answers: [
            { text: "Ulaanbaatar", correct: "true" },
            { text: "Zavkhan", correct: "false" },
            { text: "Govi-Altai", correct: "false" },
            { text: "Bulgan", correct: "false" },
        ]
    },

    {
        question: "How many continents are there in the world?",
        answers: [
            { text: "3", correct: "false" },
            { text: "7", correct: "true" },
            { text: "5", correct: "false" },
            { text: "Har mynga", correct: "false" },
        ]
    },

    {
        question: "What is the currency of Japan?",
        answers: [
            { text: "Yuan", correct: "false" },
            { text: "Yen", correct: "true" },
            { text: "Dollar", correct: "false" },
            { text: "Euro", correct: "false" },
        ]
    },

    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: "false" },
            { text: "Mars", correct: "true" },
            { text: "Venus", correct: "false" },
            { text: "Jupiter", correct: "false" },
        ]
    },

    {
        question: "In what year did the Titanic sink?",
        answers: [
            { text: "1905", correct: "false" },
            { text: "1912", correct: "true" },
            { text: "1920", correct: "false" },
            { text: "1935", correct: "false" },
        ]
    },

    {
        question: "Which country is known as the Land of the Rising Sun?",
        answers: [
            { text: "China", correct: "false" },
            { text: "South Korea", correct: "false" },
            { text: "Japan", correct: "true" },
            { text: "Vietnam", correct: "false" },
        ]
    },

    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            { text: "Charles Dickens", correct: "false" },
            { text: "William Shakespeare", correct: "true" },
            { text: "Jane Austen", correct: "false" },
            { text: "Mark Twain", correct: "false" },
        ]
    },

    {
        question: "What is the largest mammal on Earth?",
        answers: [
            { text: "Elephant", correct: "false" },
            { text: "Blue Whale", correct: "true" },
            { text: "Giraffe", correct: "false" },
            { text: "Gorilla", correct: "false" },
        ]
    },

    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", correct: "false" },
            { text: "Pablo Picasso", correct: "false" },
            { text: "Leonardo da Vinci", correct: "true" },
            { text: "Claude Monet", correct: "false" },
        ]
    },

    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: "false" },
            { text: "Indian Ocean", correct: "false" },
            { text: "Southern Ocean", correct: "false" },
            { text: "Pacific Ocean", correct: "true" },
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);

    };
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
})

startQuiz();
