//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const box-quiz = document.querySelector(".box-quiz");
const result_box = document.querySelector(".result_box");
const choices_list = document.querySelector(".choices_list");


// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    box-quiz.classList.add("activeQuiz"); //show quiz box
    showQuestions(0); //calling showQestions function
    quizCounter(1); //passing 1 parameter to queCounter
  
}
let quiz_count = 0;
let quiz_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    box-quiz.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    quiz_count = 0;
    quiz_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(quiz_count); //calling showQestions function
    quizCounter(quiz_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    next_btn.classList.remove("show"); //hide the next button
}
// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}
const next_btn = document.querySelector("footer .next_btn");
const bottom_quiz_counter = document.querySelector("footer .total_quiz");
// if Next Quiz button clicked
next_btn.onclick = ()=>{
    if(quiz_count < questions.length - 1){ //if question count is less than total question length
        quiz_count++; //increment the quiz_count value
        quiz_numb++; //increment the quiz_numb value
        showQuestions(quiz_count); //calling showQestions function
        quizCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}
// getting questions and options from array
function showQuestions(index){
    const quiz_text = document.querySelector(".quiz_text");
    //creating a new span and div tag for question and option and passing the value using array index
    let quiz_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let choice_tag = '<div class="choice"><span>'+ questions[index].choice[0] +'</span></div>'
    + '<div class="choice"><span>'+ questions[index].choice[1] +'</span></div>'
    + '<div class="choice"><span>'+ questions[index].choice[2] +'</span></div>'
    + '<div class="choice"><span>'+ questions[index].choice[3] +'</span></div>';
    quiz_text.innerHTML = quiz_tag; //adding new span tag inside que_tag
    choices_list.innerHTML = choices_tag; //adding new div tag inside option_tag
    
    const choice = choices_list.querySelectorAll(".option");
    // set onclick attribute to all available options
    for(i=0; i < choice.length; i++){
        choice[i].setAttribute("onclick", "choiceSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';
//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allChoices = choices_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");
        for(i=0; i < allOptions; i++){
            if(choices_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                choices_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                choices_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allChoices; i++){
        choices_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}
function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    box-quiz.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            const allChoices = choices_list.children.length; //getting all option items
            let correcAns = questions[quiz_count].answer; //getting correct answer from array
            for(i=0; i < allChoices; i++){
                if(choices_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    choices_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    choices_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allChoices; i++){
                choices_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}
function quizCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQuizCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_quiz_counter.innerHTML = totalQuizCounTag;  //adding new span tag inside bottom_ques_counter
}