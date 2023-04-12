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
timer.textContent = '00:00'

// create a component function
function queAndAnsw (que1, choices) {
    const mainDiv = document.createElement("div")
    const queDiv = document.createElement("div")
    const quepan = document.createElement("span")
    const choicesElement = document.createElement("div");

    // connect elements
    mainDiv.appendChild(queDiv)
    mainDiv.appendChild(quepan)


    // add content
    quepan.textContent = que1
  
    for (let i = 0; i < choices.length; i++) {
        const choice = choices[i];
    
        const choiceElement = document.createElement("div");
        choiceElement.classList.add("choice");
        const selectedAnswers = JSON.parse(localStorage.getItem("selectedAnswers")) || [];
        const currentQuestionIndex = 0;
        // <input type="radio" id="choice-1" name="choices" value="choice-1">
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

        mainDiv.appendChild(choicesElement)
      }
    
    

    // add classes
    mainDiv.classList.add("prtdiv")
    queDiv.classList.add("que")

    
    // return the parent
    return mainDiv
}



// show next question

// connect the entry point
const quizEntry = document.querySelector(".que-entry")

// call API
axios.get("https://private-1b8698-gabischool.apiary-mock.com/questions")
// response the data and check
.then(response => {
    const question = response.data[0].question
    const choices = response.data[0].choices

    nextQuestion.addEventListener("click", function showNextQuestion() {
    
        });


    quizEntry.appendChild(queAndAnsw(question, choices))

})
