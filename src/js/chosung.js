import data from '../Data/chosung.js';



function pickOne(data){
  return data[Math.floor(Math.random() * data.length)]
}

let chosenData = null
function chooseRandom(){
  console.log(pickOne(data))
  chosenData = pickOne(data)
  const chosungLabel = document.querySelector("#question--label");
  chosungLabel.textContent  = chosenData.question
}
function checkAnswer(){
  const chosungInput = document.querySelector("#chosung_input");
  console.log(chosungInput.text)
  const correct = chosenData.answer == chosungInput.text
  console.log(chosenData.answer, chosungInput.text, correct)
  console.log("checkAnswer")
  return false 
}
const chosungButton = document.querySelector("#chosung");
chosungButton.addEventListener("click", chooseRandom);

const chosungSubmitButton = document.querySelector("#chosung_submit");
chosungSubmitButton.addEventListener("click", checkAnswer);

export default {}
