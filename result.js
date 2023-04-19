
// const result = document.querySelector("#result")
// const score = document.querySelector("#score")

// function checkAndswers () {
    // const selectedAnswers = JSON.parse(localStorage.getItem('selectedAnswers'));
//     axios.get("https://private-1b8698-gabischool.apiary-mock.com/questions")
//     .then(response => {
//         const correctAnswers = response.data.choices.choice;
//         let numCorrect = 0;
//     for (let i = 0; i < correctAnswers.length; i++) {
//       if (selectedAnswers[i] === correctAnswers[i]) {
//         numCorrect++;
//       }
//     }
//     const scoreValue = numCorrect / correctAnswers.length * 100;
//     score.textContent = `Score: ${scoreValue}%`;
//     result.textContent = `${numCorrect} out of ${correctAnswers.length} answers correct`;    
// console.log(result)
//     })
// }




// create  varaible and  connect it to the local storate
// create a function to compare the results
// create variable for axios and connect it to the api

const result = document.querySelector("#result")
const score = document.querySelector("#score")

function checkResults() {
    const quizResults = localStorage.getItem("selectedAnswers");
axios.get("https://private-1b8698-gabischool.apiary-mock.com/questions")
  .then(response => {
    const quizData = response.data;
    let score = 0;
    const userAnswers = JSON.parse(quizResults);
    for (let i = 0; i < quizData.length; i++) {
      const correctAnswer = quizData[i].answer;
      const userAnswer = userAnswers[i];
      if (userAnswer === correctAnswer) {
        score++;
      }
    }
    const scoreElement = document.querySelector("#score");
    const totalQuestions = quizData.length;
    result.textContent = `You scored ${score} out of ${totalQuestions}`;
  })
  .catch(error => console.log(error));
}
 checkResults()

