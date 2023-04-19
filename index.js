// This is HTML simple to build our component

/* <div class="prtdiv">
    <div class="que">
        <span>question info</span>
    </div>
    <div class="answ">
        <p class="ans1"></p>
        <p class="ans2"></p>
    </div>
    <div class="answ2">
        <p class="ans3"></p>
        <p class="ans4"></p>
    </div>
</div> */

// **************************************************************

const nextQuestion = document.querySelector("#nextQuestion");
const timer = document.querySelector("#timer");
let timeLimit = 60;
let timeLeft = timeLimit;
let timerId;
timer.textContent = '01:00';

// function to start the timer
function startTimer() {
  timerId = setInterval(() => {
    timeLeft--;
    timer.textContent = formatTime(timeLeft);
    if (timeLeft === 0) {
      clearInterval(timerId);
      console.log("Time's up!");
    }
  }, 1000);
}

// function to format time
function formatTime(time) {
  const minutes = Math.floor(time / 60).toString().padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// create a component function 
function queAndAnsw (que1, choices, questionNumber) {
    const mainDiv = document.createElement("div")
    const queDiv = document.createElement("div")
    const quepan = document.createElement("span")
    const choicesElement = document.createElement("div")
    
    // connect elements
    mainDiv.appendChild(queDiv)
    mainDiv.appendChild(quepan)
    
    // add content
    quepan.textContent = `Question ${questionNumber}: ${que1}`

    for (let i = 0; i < choices.length; i++) {
        const choice = choices[i];
    
        const choiceElement = document.createElement("div");
        choiceElement.classList.add("choice");
        const selectedAnswers = JSON.parse(localStorage.getItem("selectedAnswers")) || [];
        const currentQuestionIndex = 0;

        const radioButton = document.createElement("input");
        radioButton.setAttribute("type", "radio");
        radioButton.setAttribute("id", `choice-${i}`);
        radioButton.setAttribute("name", "choices");
        radioButton.setAttribute("value", choice.choice);
        radioButton.addEventListener("change", function () {
            selectedAnswers[currentQuestionIndex] = this.value;
            localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
        });
    
        const label = document.createElement("label");
        label.setAttribute("for", `choice-${i}`);
        label.textContent = choice.choice;
    
        choiceElement.appendChild(radioButton);
        choiceElement.appendChild(label);
        choicesElement.appendChild(choiceElement);
        mainDiv.appendChild(choicesElement);
    }
    
    // add classes
    mainDiv.classList.add("prtdiv")
    
    // return the parent
    return mainDiv
}

// connect the entry point
const quizEntry = document.querySelector(".que-entry")

// call API
axios.get("https://private-1b8698-gabischool.apiary-mock.com/questions")
    .then(response => {
        let currentQuestionIndex = 0;
        const selectedAnswers = JSON.parse(localStorage.getItem("selectedAnswers")) || [];
        const question = response.data[currentQuestionIndex].question;
        const choices = response.data[currentQuestionIndex].choices;
        quizEntry.appendChild(queAndAnsw(question, choices, currentQuestionIndex + 1));
        startTimer();
        
        nextQuestion.addEventListener("click", function showNextQuestion() {
            clearInterval(timerId);
            timeLeft = timeLimit;
            currentQuestionIndex++;
            if (currentQuestionIndex < response.data.length) {
                const question = response.data[currentQuestionIndex].question;
                const choices = response.data[currentQuestionIndex].choices;
                quizEntry.textContent = "";
                quizEntry.appendChild(queAndAnsw(question, choices, currentQuestionIndex + 1));
                startTimer();
                console.log(selectedAnswers);
            } else {
                console.log("Quiz completed!");
            }

           });
        });
        