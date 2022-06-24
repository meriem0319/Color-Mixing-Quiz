// declare variables for the elements that we'll need to access 

var startBtn = document.querySelector(".start-btn button");
var infoSlide = document.querySelector(".info-slide");
var exitBtn = infoSlide.querySelector(".buttons .quit");
var continueBtn = infoSlide.querySelector(".buttons .next");
var quizSlide = document.querySelector(".quiz-slide");

// add click listener if start button is clicked then show the quiz rules
startBtn.onclick = ()=>{
    infoSlide.classList.add("activeInfo");
}

// add click listener if exit button is clicked then do not show the quiz rules
exitBtn.onclick = ()=>{
    infoSlide.classList.remove("activeInfo");
}

// add click listener if continue button is clicked then show the quiz container
continueBtn.onclick = ()=>{
    infoSlide.classList.remove("activeInfo"); //hide the info
    quizSlide.classList.add("activeQuiz");  //then show the first quiz
}

// Need to list the questions in the quiz 
var myQuestions = [
    {
        numb: 1,
        question: "What color do you get when you mix red and blue?",
        answer: "Purple",
        options: [
            "Orange",
            "Purple",
            "Navy Blue"
        ]            
    },
    {
        numb: 2,
        question: "What color do you get when you mix blue and yellow?",
        answer: "Green",
        options: [
            "Chartreuse",
            "Orange",
            "Green"
        ]            
    },
    {
        numb: 3,
        question: "What color do you get when you mix red and yellow?",
        answer: "Orange",
        options: [
            "Orange",
            "Brown",
            "Pink"
        ]            
    },
    {
        numb: 4,
        question: "What color do you get when you mix red and blue and yellow?",
        answer: "Black",
        options: [
            "Black",
            "Brown",
            "Gray"
        ]            
    },   
]

var questCount = 0;

// Set up the questions and answers using the array above 
// function displayQuestions(){
//     var questionText = document.querySelector(".question-text");
    
// }


