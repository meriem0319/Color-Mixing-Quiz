// declare variables for the elements that we'll need to access 

var startBtn = document.querySelector(".start-btn button");
var infoSlide = document.querySelector(".info-slide");
var exitBtn = infoSlide.querySelector(".buttons .quit");
var continueBtn = infoSlide.querySelector(".buttons .next");
var quizSlide = document.querySelector(".quiz-slide");
var timerCount = quizSlide.querySelector(".timer .timer-sec");
var answerList = document.querySelector(".answer-list");


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
    displayQuestions(0);
    startTimer();
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
var counter;
var timeValue = 15;
var userScore = 0;


var nextBtn = quizSlide.querySelector(".next-question");
var resultSlide = document.querySelector(".result-slide");
var recordInitials = resultSlide.querySelector(".buttons .next");
var quitQuiz = resultSlide.querySelector(".buttons .quit");

//at the end of the quiz, the result container buttons will either reload page to restart quiz, or click to record initals

quitQuiz.onclick = ()=> {
    window.location.reload();
}

function handleLocalStrg (name) {
    var myEntry = {
        name: name, 
        highScore: userScore
    }
    localStorage.setItem("highScore", JSON.stringify(myEntry));
    console.log(localStorage.getItem("highScore"));
}

function getHs () { 
    var myEntryObject = JSON.parse(localStorage.getItem("highScore"));
    console.log(myEntryObject);
    return "Thank you for playing " + myEntryObject.name + "! Your score is " + myEntryObject.highScore; 
}

recordInitials.onclick = ()=> {
    var initials = window.prompt("Enter your Initials:", "Initials"); 
    if (initials != null) {
        handleLocalStrg(initials);
        document.getElementById("initials").innerHTML = getHs();        
    }
}


// if the next question button is clicked, use if loop to display next question 
nextBtn.onclick = ()=> {
    if (questCount < myQuestions.length - 1) {
         questCount++;
         displayQuestions(questCount);
         nextBtn.style.display = "none";        
    } else {        
         showResult();
    }    
}


// Set up the questions and answers using the array above 
function displayQuestions(index){
    var questionText = document.querySelector(".question-text");    
    var questionTag = '<span>' + myQuestions[index].question +'<span>';
    var answerTag = '<div class="answer">' + myQuestions[index].options[0] + '<span></span></div>'
                    + '<div class="answer">' + myQuestions[index].options[1] + '<span></span></div>'
                    + '<div class="answer">' + myQuestions[index].options[2] + '<span></span></div>';
    questionText.innerHTML = questionTag;
    answerList.innerHTML = answerTag;

    var answer = answerList.querySelectorAll(".answer");
    for (let i = 0; i < answer.length; i++) {
        answer[i].setAttribute("onclick", "answerSelected(this)");
    }
}

// adding an icon to the right (palette)/wrong (xmark) answers 

var paletteIcon = '<div class="icon palette"><i class="fa-solid fa-palette"></i></div>';

var xmarkIcon = '<div class="icon xmark"><i class="fa-solid fa-circle-xmark"></i></div>';

// indicate the wrong from right answers and show by color if wrong/right 
function answerSelected(ans) {          
    var userAnswer = ans.textContent;
    var corrAnswer = myQuestions[questCount].answer;
    var allAnswers = answerList.children.length;    
    if (userAnswer === corrAnswer) {
        ans.classList.add("corr");
        userScore += 1;
        ans.insertAdjacentHTML("beforeend", paletteIcon);
    } else {        
        ans.classList.add("incorr");
        timeValue = timeValue - 5;                             
        ans.insertAdjacentHTML("beforeend", xmarkIcon);                                    
    }
    for (let i = 0; i < allAnswers; i++) {        
        answerList.children[i].classList.add("disabled");        
    }      
    nextBtn.style.display = "block";
}


function showResult() {
    clearInterval(counter);
    infoSlide.classList.remove("activeInfo"); //hide the info
    quizSlide.classList.remove("activeQuiz");  //then hide quiz
    resultSlide.classList.add("activeResult"); //show the results
    var scoreText = resultSlide.querySelector(".score-text");
    if (userScore > 0) {
        let scoreTag = '<span>Your Score is: <p>' + userScore + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore === 0) {        
            let scoreTag = '<span>Sorry, you did not score any points!</span>';
            scoreText.innerHTML = scoreTag;            
    }
}

// adding a function for the timer 
function startTimer() {
    counter = setInterval(timer, 1000);
    function timer() {
        timerCount.textContent = timeValue;
        timeValue--;        
        if (timeValue < 0) {
            showResult();
            clearInterval(counter);
            alert("Time is Up!");
            timerCount.textContent = "00";                      
        }  
    }     
}

