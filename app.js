const quizData = [
  {
    id: 0,
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "JavaScript",
    quizscore: 10,
  },
  {
    id: 1,
    question: " What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "Hypertext Markup Language",
    quizscore: 10,
  },
  {
    id: 2,
    question: "How do you set the background color to black in CSS?",
    a: "background = black;",
    b: "background {black};",
    c: "background: black;",
    d: "background is black;",
    correct: "background: black;",
    quizscore: 20,
  },
  {
    id: 3,
    question: "How do you create a function in Javascript?",
    a: "function:myFunction()",
    b: "function = myFunction()",
    c: "function myFunction()",
    d: "function() myFunction()",
    correct: "function myFunction()",
    quizscore: 15,
  },
  {
    id: 4,
    question:
      "Which built-in method removes the last element from an array and returns that element?",
    a: "last()",
    b: "get()",
    c: "pop()",
    d: "None of the above.",
    correct: "pop()",
    quizscore: 45,
  },
];


const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a = document.getElementById("a");
const b = document.getElementById("b");
const c = document.getElementById("c");
const d = document.getElementById("d");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const prevBtn = document.getElementById("prev");

let storedAnswers = {};
let currentQuiz = 0;
let score = 0;
let topscore = [];
loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  a.value = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  b.value = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  c.value = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
  d.value = currentQuizData.d;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
  let answer;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

function updateLocalStorage() {
  localStorage.removeItem("storedAnswers");
  localStorage.setItem("storedAnswers", JSON.stringify(storedAnswers));
}

const next = () => {
  var ans = document.querySelector('input[name="answer"]:checked').value;
  if (ans) {
    storedAnswers[currentQuiz] = ans;
    updateLocalStorage();
  }
  if (currentQuiz < quizData.length - 1) {
    currentQuiz++;
    loadQuiz();
  } else {
    let localS = JSON.parse(localStorage.getItem("storedAnswers"));
    quizData.forEach((item) => {
      if (localS[item.id] == item.correct) {
        score += item.quizscore;
      }
    });
    quiz.innerHTML = `
               <h2>Tebrikler oyun bitti ,toplam puanınız : ${score} </h2>
            <button onclick="location.reload()">Reload</button>
        `;
    console.log("puan " + score);
  }
};
const prev = () => {
  if (currentQuiz != 0) {
    currentQuiz--;
    loadQuiz();
  }
};
