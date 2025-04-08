const questions = [
    {
        question:"What is the capital of india",
        options: ["Bhopal", "New Delhi", "Dispur", "patna"],
        answer:1,
        description: "New Delhi is the capital of india."
       },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 3,
    description: "JavaScript is the only one that runs in browsers directly."
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
    answer: 1,
    description: "CSS stands for Cascading Style Sheets."
  },
  {
    question: "What is the highest mountain in the world?",
    options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
    answer: 1,
    description: "CSS stands for Cascading Style Sheets."
  },
  {
    question: "What is the largest continent in the world?",
    options: ["Africa", "Europe", "Asia ", "North America"],
    answer: 2,
    description: "CSS stands for Cascading Style Sheets."
  },
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const descriptionEl = document.getElementById('description');
const timerEl = document.getElementById('timer');
const scoreBoard = document.getElementById('scoreBoard');
const restartBtn = document.getElementById('restartBtn');
const progressBar = document.getElementById('progressBar');

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  scoreBoard.style.display = 'none';
  restartBtn.style.display = 'none';
  nextBtn.style.display = 'inline-block';
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  updateTimer();
  timer = setInterval(updateTimer, 1000);

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  descriptionEl.textContent = '';

  q.options.forEach((opt, index) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(index);
    optionsEl.appendChild(btn);
  });

  progressBar.style.width = ((currentQuestion / questions.length) * 100) + '%';
}

function updateTimer() {
  timerEl.textContent = `Time: ${timeLeft}`;
  if (timeLeft <= 0) {
    clearInterval(timer);
    selectAnswer(-1);
  }
  timeLeft--;
}

function selectAnswer(selectedIndex) {
  clearInterval(timer);
  const q = questions[currentQuestion];
  const buttons = optionsEl.querySelectorAll('button');

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.answer) btn.classList.add('correct');
    else if (idx === selectedIndex) btn.classList.add('wrong');
  });

  if (selectedIndex === q.answer) {
    score++;
  }

  descriptionEl.textContent = q.description;
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
};

function showScore() {
  questionEl.textContent = '';
  optionsEl.innerHTML = '';
  descriptionEl.textContent = '';
  nextBtn.style.display = 'none';
  scoreBoard.style.display = 'block';
  scoreBoard.textContent = `You scored ${score} out of ${questions.length}`;
  restartBtn.style.display = 'inline-block';
  progressBar.style.width = '100%';
  timerEl.textContent = '';
}

restartBtn.onclick = () => startQuiz();

startQuiz();
