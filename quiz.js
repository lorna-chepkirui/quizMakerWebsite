var questionBank = [
    {
    question: "Which of the following is not a HTML5 tag?",
    answer: "Slider",
    option: ["track", "video", "slider", "source"]
  },
    {
    question: "An HTML document can contain?",
    answer: "All the answers are correct",
    option: ["Attributes", "Tags", "Raw text", "All the answers are correct"]
  },
    {
    question: "Suppose we want to arrange three DIVs so that DIV 3 is placed above DIV1. Now, which CSS property are we going to use to control the stack order??",
    answer: "z-index",
    option: ["s-index", "z-index", "d-index", "x-index"]
  },
    {
    question: "Can we define the direction of the text via a CSS property?",
    answer: "Yes its possible",
    option: ["Yes it's possible", "No it's not possible"]
  },
    {
  
    question: "If we want to use a nice green dotted border around an image, which css property are we going to use??",
    answer: "border-style",
    option: ["border-line", "border-style", "border-decoration"]
  },
];
var question= document.getElementById('question');
var quizContainer= document.getElementById('quiz-container');
var scorecard= document.getElementById('scorecard');
var option0= document.getElementById('option0');
var option1= document.getElementById('option1');
var option2= document.getElementById('option2');
var option3= document.getElementById('option3');
var next= document.querySelector('.next');
var points= document.getElementById('score');
var span= document.querySelectorAll('span');
var i=0;
var score= 0;

//function to display questions
function displayQuestion(){
    for(var a=0;a<span.length;a++){
        span[a].style.background='none';
    }
    question.innerHTML= 'Q.'+(i+1)+' '+questionBank[i].question;
    option0.innerHTML= questionBank[i].option[0];
    option1.innerHTML= questionBank[i].option[1];
    option2.innerHTML= questionBank[i].option[2];
    option3.innerHTML= questionBank[i].option[3];
    stat.innerHTML= "Question"+' '+(i+1)+' '+'of'+' '+questionBank.length;
}

//function to calculate scores
function calcScore(e){
    if(e.innerHTML===questionBank[i].answer && score<questionBank.length)
    {
        score= score+1;
        document.getElementById(e.id).style.background= 'limegreen';
    }
    else{
        document.getElementById(e.id).style.background= 'tomato';
    }
    setTimeout(nextQuestion,300);
}

//function to display next question
function nextQuestion(){
    if(i<questionBank.length-1)
    {
        i=i+1;
        displayQuestion();
    }
    else{
        points.innerHTML= score+ '/'+ questionBank.length;
        quizContainer.style.display= 'none';
        scoreboard.style.display= 'block'
    }
}

//click events to next button
next.addEventListener('click',nextQuestion);

//Back to Quiz button event
function backToQuiz(){
    location.reload();
}

//function to check Answers
function checkAnswer(){
    var answerBank= document.getElementById('answerBank');
    var answers= document.getElementById('answers');
    answerBank.style.display= 'block';
    scoreboard.style.display= 'none';
    for(var a=0;a<questionBank.length;a++)
    {
        var list= document.createElement('li');
        list.innerHTML= questionBank[a].answer;
        answers.appendChild(list);
    }
}


displayQuestion();