var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: [
        "numbers and strings",
        "other arrays",
        "booleans",
        "all of the above"
      ],
      answer: "all of the above"
    },
    {
      title:
        "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: "quotes"
    },
    {
      title:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
      answer: "console.log"
    }
  ];
    

    var qindex = 0
    //counts how many correct answers there are
    var points = 0
    const timer = document.querySelector(".timer")
    const startingMinutes = 3;
    let time = startingMinutes * 60;
    /*This variable exists so the quiz can't time out if completed before the time limit.
      When the quiz ends before the time limit is stopped, the timer will continue to tick even if the display is 
      gone. With that said, if that persisiting timer hits zero after the quiz has ended, the endQuiz funtion
      will run again.*/
    var quizOver = false;
    var scores = 0


// The array being stored into the local storage is called "scores". If it does not exist, create an array, if it does, leave it as is, so that new results can be 
// pushed into the array.
    function renderScores() {
      const savedScores = JSON.parse(localStorage.getItem("savedScores"));

      if(savedScores === null) {
        scores = [];
      } else {
        scores = savedScores;
        console.log(scores);
      }
    }

    renderScores();

  function checkAnswer(index) {
    //This is the index used for grading since the index moved up by one after each question is answered.
    var realIndex = index-1;
    var myForm = document.getElementsByName(`quizQuestion_${realIndex}`);
    const qAnswer = questions[realIndex].answer;

    for(var i = 0; i < myForm.length; i++) {
      const choice = myForm[i].checked
      const input = myForm[i].value;

      
      if(input === qAnswer && choice === true) {
        points += 1;
      }
    }
    console.log(points);
  }

  function nextQuestion(index) {
    document.querySelector('.answer').classList.remove('hiddenAnswer')
    setTimeout( function() { document.querySelector('.quiz').classList.toggle('hidden')
    if(index < questions.length) {    
      
      var randoQ = questions[index]
  
      var title = document.querySelector('.title')
      var choices = document.querySelector('.form')
      var answer = document.querySelector('.answer')
      answer.classList.add('hiddenAnswer');

      title.textContent = randoQ.title
      choices.innerHTML = randoQ.choices.map(choice => `<input type= "radio" id= "${choice}" name= "quizQuestion_${index}" value= "${choice}" required>
      <label for= "${choice}">${choice}</label>`).join('<br>')
      answer.textContent = randoQ.answer

    

      qindex++
      setTimeout(function(){
        document.querySelector('.quiz').classList.toggle('hidden')}, 500)
      
    }
     else {
      alert('quiz Over')
      quizOver = true;
      endQuiz()
    }
  }, 1000)
  }
  
function endQuiz() {
  const endCard = document.querySelector(".end")
  const results = document.querySelector(".results")
  results.innerHTML = `You have scored: ${points}/5 points.`

  endCard.classList.remove("hidden");
  timer.classList.add("hiddenTimer");
}

function saveInitials() {
  const initials = document.getElementById("initial").value;
  let minDisplay = Math.floor(time/60);
  let secDisplay = time % 60;

  const scoreCard = {
    Initals: initials,
    Score: points,
    RemainingTime: `${minDisplay}:${secDisplay}`
  }

  scores.push(scoreCard);
  
  localStorage.setItem("savedScores", JSON.stringify(scores));
}


function showScores(event) {
  event.preventDefault();
  saveInitials();
  const scores = JSON.parse(localStorage.getItem("savedScores"));
  console.log(scores);
  const resultsCard = document.querySelector(".scoreCard");
  const endCard = document.querySelector(".end");
  endCard.classList.add("hidden");
  resultsCard.classList.remove("hidden");


  
}

function updateTimer() {
  var runTime = setInterval(() => {
    
  
  let minDisplay = Math.floor(time/60);
  let secDisplay = time % 60;

  secDisplay = secDisplay < 10 ? '0' + secDisplay : secDisplay;

  time = time < 0 ? '0' : time;

  if(time <= 0 && quizOver === false) {
    timer.innerHTML = '0:00';
    alert('quiz over');
    endQuiz();
    clearInterval(runTime);
  }
  else if(quizOver === true) {
    clearInterval(runTime);
  }
  else{
  timer.innerHTML = `${minDisplay}:${secDisplay}`;
  time--
  }
}, 1000)
}


function displayTimer() {
  timer.classList.remove("hiddenTimer");
  updateTimer();
}



  document.querySelector('.next').addEventListener('click', function(){
    checkAnswer(qindex)
    nextQuestion(qindex)
  })
  
  document.querySelector('.take-quiz').addEventListener('click', function(){
    document.querySelector('.intro').classList.toggle('hidden')
    document.querySelector('.quiz').classList.toggle('hidden')
    displayTimer()
    nextQuestion(qindex)
  })
  
  document.querySelector("#submitInitials").addEventListener('click',
  showScores
  )