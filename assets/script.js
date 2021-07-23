const test= [
    {
    question: "When 'this' is not used within a function as the global object within an object function, 'this' is ______",
    answers: ["The boolean", "The DOM", "The window object", "All of the above"],
    correct: "The window object"
     },

    {
    question: "Event bubbling causes an element's event(s) to also affect ______",
    answers: ["The element's parent", "The element itself, causing the event to happen recursively in an indefinite loop", "Both", "Neither"],
    correct: "The element's parent"
    },

    {
    question: "Timers in javascript are calculated in this unit of time:",
    answers: ["second", "milliseconds", "nanoseconds", "clock outputs"],
    correct: "milliseconds"
    }
]

//determines if you are on question 1, 2, etc. qindex 0 means you're on the first question. 
var qIndex= 0;

function ask(index) {
    if (index < test.length) {
        

        //will measure which question you are on and places the quiz elements accordingly
        var currentQ = test[index];
    
        var quizQuestion = document.querySelector(".question");
        var quizAnswers = document.querySelector(".answers");
        var quizCorrect = document.querySelector(".correct");

        quizQuestion.innerHTML = currentQ.question;


    }
}

//Function Activates when the "take quiz" button is clicked. Makes the intro card dissappear and the quiz cards take its place. 
function startQuiz() {
    var introCard = document.querySelector(".intro");

    introCard.setAttribute("style", "display: none");

    var quizCard  = document.querySelector(".quiz");
    quizCard.classList.toggle("hidden");

    ask(qIndex);
}

//the quiz card is already active. what needs to be done is to attach the elements to the quiz then make that card visible.
