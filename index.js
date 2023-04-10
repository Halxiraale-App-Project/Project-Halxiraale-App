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

// create a component function 


function queAndAnsw (que1, answe1, answe2, answe3, answe4) {
    const mainDiv = document.createElement("div")
    const queDiv = document.createElement("div")
    const quepan = document.createElement("span")
    const answDiv = document.createElement("div")
    const ans1p = document.createElement("p")
    const ans2p = document.createElement("p")
    const answ2Div = document.createElement("div")
    const ans3p = document.createElement("p")
    const ans4p = document.createElement("p")

    // connect elements
    mainDiv.appendChild(queDiv)
    mainDiv.appendChild(quepan)
    mainDiv.appendChild(answDiv)
    mainDiv.appendChild(ans1p)
    mainDiv.appendChild(ans2p)
    mainDiv.appendChild(answ2Div)
    mainDiv.appendChild(ans3p)
    mainDiv.appendChild(ans4p)

    // add content
    quepan.textContent = que1
    ans1p.textContent = answe1
    ans2p.textContent = answe2
    ans3p.textContent = answe3
    ans4p.textContent = answe4

    // add classes
    mainDiv.classList.add("prtdiv")
    queDiv.classList.add("que")
    answDiv.classList.add("answ")
    ans1p.classList.add("ans1")
    ans2p.classList.add("ans2")
    answ2Div.classList.add("answ2")
    ans3p.classList.add("ans3")
    ans4p.classList.add("ans4")
    
    // return the parent
    return mainDiv
}

// connect the entry point
const quizEntry = document.querySelector(".que-entry")

// call API
axios.get("https://private-1b8698-gabischool.apiary-mock.com/questions")

      .then(response => {
        response.data.forEach(element => {

    
            console.log(response)
        
         
        let que1 = element.que1
        let answe1 = element.answe1
        let answe2 = element.answe2
        let answe3= element.answe3
        let answe4= element.answe4
        
              
                
    
      quizEntry.appendChild(queAndAnsw(response.data))
    });


    });
  
  
// response the data and check




