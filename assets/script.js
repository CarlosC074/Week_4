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
  
  

  function checkAnswer(index) {
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
    }
  }, 1000)
  }
  
  document.querySelector('.next').addEventListener('click', function(){
    checkAnswer(qindex)
    nextQuestion(qindex)})
  
  document.querySelector('.take-quiz').addEventListener('click', function(){
    document.querySelector('.intro').classList.toggle('hidden')
    document.querySelector('.quiz').classList.toggle('hidden')
    nextQuestion(qindex)
  })
  