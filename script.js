const questions = [
  {
      questionText: "Commonly used data types DO NOT include:",
      options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
      answer: "3. alerts",
  },
  {
      questionText: "Arrays in JavaScript can be used to store ______.",
      options: [
          "1. numbers and strings",
          "2. other arrays",
          "3. booleans",
          "4. all of the above",
      ],
      answer: "4. all of the above",
  },
  {
      questionText:
          "String values must be enclosed within _____ when being assigned to variables.",
      options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
      answer: "3. quotes",
  },
  {
      questionText:
          "A very useful tool used during development and debugging for printing content to the debugger is:",
      options: [
          "1. JavaScript",
          "2. terminal/bash",
          "3. for loops",
          "4. console.log",
      ],
      answer: "4. console.log",
  },
  {
      questionText:
          "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
      options: ["1. break", "2. stop", "3. halt", "4. exit"],
      answer: "1. break",
  },
];


let counter = 1, score = 9, key, startTime = -1, timer;
let questionDiv = document.getElementById("question")
let finalScoreDiv = document.getElementById("finalScore")
let highScoreDiv = document.getElementById("highScore")
let scoreDiv = document.getElementById("scoreDiv")
let infoDiv = document.getElementById("info")
let scoreValue = document.getElementById("scoreValue")
let initials = document.getElementById("initials")
let time = document.getElementById("time")

writeScore();

function answerHandler(e) {

  switch ((counter) < questions.length) {
      case true:
          const { questionText, options } = questions[counter];
          questionDiv.children[0].innerText = questionText;
          questionDiv.children[1].innerText = options[0];
          questionDiv.children[2].innerText = options[1];
          questionDiv.children[3].innerText = options[2];
          questionDiv.children[4].innerText = options[3];
          questionDiv.children[5].style.display = "block";
          checkanswer(e);
          counter++
          break;

      case false:
          checkanswer(e);
          declareResults();

          break;
  }

}

function checkanswer(indexSelected) {
  let actualAnswer = questions[counter - 1].answer;
  let selectedAnswer = questions[counter - 1].options[indexSelected];

  switch (actualAnswer === selectedAnswer) {
      case true:
          questionDiv.children[6].innerText = "Correct!"
          score += 10
          break;

      case false:
          questionDiv.children[6].innerText = "Incorrect!"
          startTime<10?declareResults():startTime -= 10
          break;
  }
}


function setTimer() {
  timer = setInterval(() => {
      switch (startTime) {
          case 0:
              declareResults();
              break;
          case -1:
              break;
          default:
              startTime -= 1;
              time.innerText = startTime
              break;
      }
  }, 1000)
}

function startHandler() {
  infoDiv.style.display = "none";
  questionDiv.style.display = "flex";
  startTime = 50;
  score = 0;
  counter=1;
  resetQuestion()
  setTimer()
}

function declareResults() {
  questionDiv.style.display = "none";
  finalScoreDiv.style.display = "flex";
  scoreValue.innerText = (score);
  clearInterval(timer);
  initials.value = ""

}

function submitScore() {
  if(initials.value===""){
      alert("Please Enter a name")
  }
  else{
      localStorage.setItem(key, JSON.stringify(score))
      finalScoreDiv.style.display = "none";
      highScoreDiv.style.display = "flex";
      let p = document.createElement("p")
      p.innerHTML = key + ": " + localStorage.getItem(key)
      scoreDiv.appendChild(p);
  }       
}

function setInitials() {
  key = initials.value
}

function viewScore() {
  highScoreDiv.style.display = "flex"
  infoDiv.style.display = "none"
}

function closeScore() {
  highScoreDiv.style.display = "none"
  infoDiv.style.display = "flex"
}

function writeScore() {
  for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
          let p1 = document.createElement("p")
          p1.innerText = key + ": " + localStorage.getItem(key)
          scoreDiv.appendChild(p1);
      }
  }
}

function resetQuestion() {
  const { questionText, options } = questions[0];
  questionDiv.children[0].innerText = questionText;
  questionDiv.children[1].innerText = options[0];
  questionDiv.children[2].innerText = options[1];
  questionDiv.children[3].innerText = options[2];
  questionDiv.children[4].innerText = options[3];
  questionDiv.children[5].style.display = "none";
  questionDiv.children[6].innerText = ""
}