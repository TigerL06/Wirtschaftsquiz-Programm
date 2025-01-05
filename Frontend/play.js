let currentIndex = 0;
let questionLength;
let questions;
let quiz

function normalPlay(frage, antwort, nameQuiz){
  let header = document.querySelector("#header");
  header.innerHTML = nameQuiz;
  let containerM = document.createElement("div")
  containerM.setAttribute("id", "container")
  let container = document.createElement("div");
  container.setAttribute("id", "center");
  let share = document.createElement("h3");
  share.innerHTML = `Wenn Sie dieses Quiz mit Schülern teilen wollen geben Sie ihnen diesen Namen: ${nameQuiz}`;

  let desQ = document.createElement("p");
  desQ.innerHTML = frage;

  let desA = document.createElement("p");
  desA.innerHTML = "Geben Sie hier ihre Antwort ein."

  let inputA = document.createElement("input")
  inputA.setAttribute("id", "AI");

  let button = document.createElement("button");
  button.setAttribute("id", "FMulti")
  button.innerHTML = "Beantworten"



  container.appendChild(desQ);
  container.appendChild(desA);
  container.appendChild(inputA);
  container.appendChild(button);
  if(authen === true){
    containerM.appendChild(share);
  }
  containerM.appendChild(container)
  parent.appendChild(containerM);



  button.addEventListener("click", function () {
    containerM.remove();
    TestAnswer(inputA.value, antwort)
  });
}

function truePlay(frage, antwort, nameQuiz){
  console.log(frage)
  let header = document.querySelector("#header");
  header.innerHTML = nameQuiz;
  let containerM = document.createElement("div")
  containerM.setAttribute("id", "container")
  let container = document.createElement("div");
  container.setAttribute("id", "center");

  let share = document.createElement("h3");
  share.innerHTML = `Wenn Sie dieses Quiz mit Schülern teilen wollen geben Sie ihnen diesen Namen: ${nameQuiz}`;


  let desQ = document.createElement("p");
  desQ.innerHTML = frage;

  let desA = document.createElement("p");
  desA.innerHTML = "Wählen Sie aus, ob die Antwort für die Frage richtig oder falsch ist."

  let buttonR = document.createElement("button");
  buttonR.setAttribute("id", "playF")
  buttonR.innerHTML = "richtig";

  let buttonF = document.createElement("button");
  buttonF.setAttribute("id", "playR")
  buttonF.innerHTML = "falsch";


  
  let buttonB = document.createElement("button");
  buttonB.innerHTML = "Zurück"



  container.appendChild(desQ);
  container.appendChild(desA);
  container.appendChild(buttonR);
  container.appendChild(buttonF);
  if(authen === true){
    containerM.appendChild(share);
  }
  containerM.appendChild(container)
  parent.appendChild(containerM);



  buttonR.addEventListener("click", function () {
    containerM.remove();
    TestAnswer(buttonR.textContent, antwort)

  });

  buttonF.addEventListener("click", function () {
    containerM.remove();
    TestAnswer(buttonF.textContent, antwort)
  });
}

function multiPlay(frage, antwort, auswahl, auswahl2, auswahl3, nameQuiz){
  console.log(auswahl)
  console.log(auswahl2)
  console.log(auswahl3)
  let header = document.querySelector("#header");
  header.innerHTML = nameQuiz;
  let containerM = document.createElement("div")
  containerM.setAttribute("id", "container")
  let container = document.createElement("div");
  container.setAttribute("id", "center");
  let answerPart = document.createElement("div");
  answerPart.setAttribute("id", "answerPart");

  let share = document.createElement("h3");
  share.innerHTML = `Wenn Sie dieses Quiz mit Schülern teilen wollen geben Sie ihnen diesen Namen: ${nameQuiz}`;

  let desQ = document.createElement("p");
  desQ.innerHTML = frage;

  let desA = document.createElement("p");
  desA.innerHTML = "Klicken Sie die Antwort an."

  let answers = [antwort, auswahl, auswahl2, auswahl3];

  // Antworten zufällig anordnen
  let shuffledAnswers = shuffleArray(answers);

  // Buttons erstellen
  let answer = document.createElement("button");
  answer.innerHTML = shuffledAnswers[0];
  answer.setAttribute("id", "option1");

  let answer2 = document.createElement("button");
  answer2.innerHTML = shuffledAnswers[1];
  answer2.setAttribute("id", "option2");

  let answer3 = document.createElement("button");
  answer3.innerHTML = shuffledAnswers[2];
  answer3.setAttribute("id", "option3");

  let answer4 = document.createElement("button");
  answer4.innerHTML = shuffledAnswers[3];
  answer4.setAttribute("id", "option4");

  let buttonB = document.createElement("button");
  buttonB.innerHTML = "Zurück";


  container.appendChild(desQ);
  container.appendChild(desA);
  answerPart.appendChild(answer);
  answerPart.appendChild(answer2);
  answerPart.appendChild(answer3);
  answerPart.appendChild(answer4);
  container.appendChild(answerPart);
  if(authen === true){
    containerM.appendChild(share);
  }
  containerM.appendChild(container)
  parent.appendChild(containerM);

  answer.addEventListener("click", function(){
    containerM.remove();
    TestAnswer(answer.textContent, antwort)
  });

  answer2.addEventListener("click", function(){
    containerM.remove();
    TestAnswer(answer2.textContent, antwort)
  });

  answer3.addEventListener("click", function(){
    containerM.remove();
    TestAnswer(answer3.textContent, antwort)

  });

  answer4.addEventListener("click", function(){
    containerM.remove();
    TestAnswer(answer4.textContent, antwort)

  });

}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function TestAnswer(answer, correctAnswer){
  let output;
  let containerM = document.createElement("div")
  containerM.setAttribute("id", "container");

  let title = document.createElement("h2");
  if(answer === correctAnswer){
    output = "Das war die richtige Antwort"
    title.style.color = "green"
  }else{
    output = `Das war die falsche Antwort. Die richtige Antwort wäre: ${correctAnswer}`;
    title.style.color = "red"
  }
  title.innerHTML = output;


  let button = document.createElement("button");
  button.innerHTML = "Weiter";

  containerM.appendChild(title)
  containerM.appendChild(button);
  parent.appendChild(containerM);

  button.addEventListener("click", function(){
    currentIndex++;
    if (currentIndex < questionLength) {
        containerM.remove();
        showQuestion();
    } else {
        console.log('Quiz beendet!');
        document.querySelector("#container")?.remove();
        if(authen === true){
          home();
        }else{
          authenticate();
        }
    }
  })

}

// Funktion zum Abrufen und Durchgehen der Fragen nach Quiz
async function playQuiz(quizName) {
    quiz = quizName
    let error = false;
    const response = await fetch(`http://localhost:3000/questions/by-quiz/${quizName}`);

    if (!response.ok) {
      if(authen === true){
        error = true
        alert("Es gibt keine Fragen zu diesem Spiel");
        home();
      }else{
        error = true;
        alert("Es gibt keine Fragen zu diesem Spiel");
        authenticate();
      }
    }

    questions = await response.json();

    if (questions.length === 0 || questions === null) {

      if(authen === true){
        alert("Es gibt keine Fragen zu diesem Spiel");
        home();

      }else{
        alert("Es gibt keine Fragen zu diesem Spiel");

        authenticate();

      }
      error = false;
  }else{
    if(error === false){
      currentIndex = 0;
      // Starte die erste Frage
      showQuestion();
    }
  }

}

// Funktion zum Anzeigen der aktuellen Frage
function showQuestion() {
  questionLength = questions.length;
  const currentQuestion = questions[currentIndex];

  if (currentQuestion.modus === 'multiple choice') {
      multiPlay(
          currentQuestion.frage,
          currentQuestion.antwort,
          currentQuestion.auswahl[0],
          currentQuestion.auswahl[1],
          currentQuestion.auswahl[2],
          quiz
      );
  } else if (currentQuestion.modus === 'true or false') {
      truePlay(currentQuestion.frage, currentQuestion.antwort, quiz);
  } else if (currentQuestion.modus === 'normal') {
      normalPlay(currentQuestion.frage, currentQuestion.antwort, quiz);
  }

}