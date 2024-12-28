let containerM = document.querySelector("#container");
let parent = document.querySelector("#main");
let user = "lehrer"
let password = "supertool"
let buttonL = document.querySelector("#login");
let buttonQ = document.querySelector("#start");
let art;
let numberQuestion = 0;
let nameCollection;
let currentIndex = 0;
let questionLength;
let questions;
let quiz;
let authen = false;

document.addEventListener("DOMContentLoaded", function () {
  let input = document.querySelector("#quiz");
  console.log(input); // Sollte das <input> Element ausgeben
});


buttonL.addEventListener("click", function () {
  let nameInput = document.querySelector("#name");
  let passwordInput = document.querySelector("#password");
  let eingabeN = nameInput.value
  let eingabeP = passwordInput.value

  if(eingabeN === user && eingabeP === password){
    containerM.remove();
    home();
    authen = true;
  }
});

buttonQ.addEventListener("click", function () {
  let input = document.querySelector("#quiz")
  console.log(document.querySelector("#quiz"));
  let text = input.value;
  containerM.remove();
  console.log(text)
  playQuiz(text);

});

function authenticate() {
  let header = document.querySelector("#header");
  header.innerHTML = "Wirtschaftquiz";

  // Container erstellen
  let container = document.createElement("div");
  container.setAttribute("id", "container");

  // Top-Div erstellen
  let top = document.createElement("div");
  top.setAttribute("id", "top");

  // Login-Überschrift
  let h2Login = document.createElement("h2");
  h2Login.innerHTML = "Login";
  top.appendChild(h2Login);

  // Username-Beschriftung
  let usernameLabel = document.createElement("p");
  usernameLabel.innerHTML = "Username";
  top.appendChild(usernameLabel);

  // Username-Input
  let usernameInput = document.createElement("input");
  usernameInput.setAttribute("type", "text");
  usernameInput.setAttribute("id", "name");
  top.appendChild(usernameInput);

  // Line Break
  top.appendChild(document.createElement("br"));

  // Passwort-Beschriftung
  let passwordLabel = document.createElement("p");
  passwordLabel.innerHTML = "Passwort";
  top.appendChild(passwordLabel);

  // Passwort-Input
  let passwordInput = document.createElement("input");
  passwordInput.setAttribute("type", "text");
  passwordInput.setAttribute("id", "password");
  top.appendChild(passwordInput);

  // Line Break
  top.appendChild(document.createElement("br"));

  // Login-Button
  let loginButton = document.createElement("button");
  loginButton.setAttribute("id", "login");
  loginButton.innerHTML = "Login";
  top.appendChild(loginButton);

  // Top-Div zum Container hinzufügen
  container.appendChild(top);

  // Quiz-Überschrift
  let h2Quiz = document.createElement("h2");
  h2Quiz.innerHTML = "Quiz";
  container.appendChild(h2Quiz);

  // Quiz-Input
  let quizInput = document.createElement("input");
  quizInput.setAttribute("type", "text");
  quizInput.setAttribute("id", "quiz");
  container.appendChild(quizInput);

  // Start-Button
  let startButton = document.createElement("button");
  startButton.setAttribute("id", "start");
  startButton.innerHTML = "Start";
  container.appendChild(startButton);

  // Container zum Haupt-Element hinzufügen
  let parent = document.querySelector("#main" || "body"); // Falls es ein #main gibt, sonst body
  parent.appendChild(container);

  // Event Listeners können hier hinzugefügt werden
  loginButton.addEventListener("click", function() {
    let nameInput = document.querySelector("#name");
    let passwordInput = document.querySelector("#password");
    let eingabeN = nameInput.value
    let eingabeP = passwordInput.value
  
    if(eingabeN === user && eingabeP === password){
      container.remove();
      home();
      authen = true;
    }
  });

  startButton.addEventListener("click", function() {
    let input = document.querySelector("#quiz")
    container.remove();
    playQuiz(input.value);

  });
}


function home(){
  let header = document.querySelector("#header");
  header.innerHTML = "Wirtschaftquiz";
  let container = document.createElement('div');
  container.setAttribute("id", "container");
  let top = document.createElement("div");
  top.setAttribute("id", "topH");
  let button = document.createElement("button");
  button.innerHTML = "Fragesammlung erstellen";
  button.setAttribute("id", "add");

  let buttonQ = document.createElement("button");
  buttonQ.innerHTML = "Quiz erstellen";
  buttonQ.setAttribute("id", "addQ");
  let main = document.createElement("div");
  main.setAttribute("id", "center");
  top.appendChild(button);
  top.appendChild(buttonQ);
  container.appendChild(top);
  container.appendChild(main);
  parent.appendChild(container);
  getSammlungen();

  button.addEventListener("click", function () {
    container.remove();
    addF();
  });

  buttonQ.addEventListener("click", function () {
    container.remove();
    addQ();
  });
}

function addF(){
  art = "Fragensammlung";
  let header = document.querySelector("#header");
  header.innerHTML = "Fragensammlung erstellen";
  let container = document.createElement('div');
  container.setAttribute("id", "container");
  let top = document.createElement("div");
  top.setAttribute("id", "topH");
  let titel = document.createElement("h3");
  titel.setAttribute("id", "titelF")
  titel.innerHTML = "Geben Sie hier den Namen ihrer Fragensammlung ein."
  let inputF = document.createElement("input");
  inputF.setAttribute("id", "nameFS");
  let description = document.createElement("h3");
  description.innerHTML = "Wählen Sie aus, ob Sie eine Multiple Choice Frage erstellen wollen, eine normale oder eine Richtig Falsch Frage."
  
  let button = document.createElement("button");
  button.innerHTML = "Multiple Choice Frage";
  button.setAttribute("id", "multi");

  let buttonN = document.createElement("button");
  buttonN.innerHTML = "Normale Frage";
  buttonN.setAttribute("id", "normal");

  let buttonR = document.createElement("button");
  buttonR.innerHTML = "Richtig Falsch Fragen";
  buttonR.setAttribute("id", "right");

  let end = document.createElement("div");
  end.setAttribute("id", "end");

  let backB = document.createElement("button");
  backB.innerHTML = "Zurück zum Hauptmenu";
  backB.setAttribute("id", "back");

  let finishB = document.createElement("button");
  finishB.innerHTML = "Fertig mit der Fragensammlung";
  finishB.setAttribute("id", "finish");


  let main = document.createElement("div");
  main.setAttribute("id", "center");

  
  let numberOutput = document.createElement("p");
  numberOutput.innerHTML = numberQuestion;
  numberOutput.setAttribute("id", "numberOutput");

  top.appendChild(titel);
  top.appendChild(inputF);
  top.appendChild(description);
  top.appendChild(button);
  top.appendChild(buttonN);
  top.appendChild(buttonR);
  end.appendChild(backB);
  end.appendChild(finishB)
  container.appendChild(top);
  container.appendChild(end);
  container.appendChild(main);
  container.appendChild(numberOutput);
  parent.appendChild(container);

  button.addEventListener("click", function () {
    let elementM = document.querySelector("#center")
    elementM.remove();
    multi();
  });

  buttonN.addEventListener("click", function () {
    let elementM = document.querySelector("#center")
    elementM.remove()
    normal();
  });

  buttonR.addEventListener("click", function () {
    let elementM = document.querySelector("#center")
    elementM.remove()
    trueA();
  });

  backB.addEventListener("click", function () {
    container.remove();
    home();
  });

  finishB.addEventListener("click", function () {
    if(inputF.value === ""){
      title.innerHTML = "Es fehlt der Name der Fragesammlung"
      title.style.color = "red";
    }else {
      let type = "Fragesammlung";
      container.remove();
      postSammlung(inputF.value, type)
      numberQuestion = 0;
      home();
    }
  });
}

function addQ(){
  art = "Quiz"
  let header = document.querySelector("#header");
  header.innerHTML = "Quiz erstellen";
  let container = document.createElement('div');
  container.setAttribute("id", "container");
  let top = document.createElement("div");
  top.setAttribute("id", "topH");
  let titel = document.createElement("h3");
  titel.setAttribute("id", "titelF")
  titel.innerHTML = "Geben Sie hier den Namen ihres Quizs ein."
  let inputF = document.createElement("input");
  inputF.setAttribute("id", "nameFS");
  let description = document.createElement("h3");
  description.innerHTML = "Wenn sie dem Quiz noch eine Frage hinzufügen wollen. Wählen Sie aus, ob Sie eine Multiple Choice Frage erstellen wollen, eine normale oder eine Richtig Falsch Frage."
  
  let button = document.createElement("button");
  button.innerHTML = "Multiple Choice Frage";
  button.setAttribute("id", "multi");

  let buttonN = document.createElement("button");
  buttonN.innerHTML = "Normale Frage";
  buttonN.setAttribute("id", "normal");

  let buttonR = document.createElement("button");
  buttonR.innerHTML = "Richtig Falsch Fragen";
  buttonR.setAttribute("id", "right");

  let end = document.createElement("div");
  end.setAttribute("id", "end");

  let backB = document.createElement("button");
  backB.innerHTML = "Zurück zum Hauptmenu";
  backB.setAttribute("id", "back");

  let finishB = document.createElement("button");
  finishB.innerHTML = "Fertig mit dem Quiz";
  finishB.setAttribute("id", "finish");


  let main = document.createElement("div");
  main.setAttribute("id", "center");

  let fragST = document.createElement("div");
  fragST.setAttribute("id", "collectionPart");

  let questionTyp = document.createElement("div");
  questionTyp.setAttribute("id", "questionTyp");

  let numberOutput = document.createElement("p");
  numberOutput.innerHTML = numberQuestion;
  numberOutput.setAttribute("id", "numberOutput");


  top.appendChild(titel);
  top.appendChild(inputF);
  questionTyp.appendChild(description);
  questionTyp.appendChild(button);
  questionTyp.appendChild(buttonN);
  questionTyp.appendChild(buttonR);
  end.appendChild(backB);
  end.appendChild(finishB)
  container.appendChild(top);
  container.appendChild(fragST)
  container.appendChild(end);
  container.appendChild(questionTyp);
  container.appendChild(main);
  container.appendChild(numberOutput);
  parent.appendChild(container);
  getCollection();

  button.addEventListener("click", function () {
    let elementM = document.querySelector("#center")
    elementM.remove();
    multi();
  });

  buttonN.addEventListener("click", function () {
    let elementM = document.querySelector("#center")
    elementM.remove()
    normal();
  });

  buttonR.addEventListener("click", function () {
    let elementM = document.querySelector("#center")
    elementM.remove()
    trueA();
  });

  backB.addEventListener("click", function () {
    container.remove();
    home();
  });

  finishB.addEventListener("click", function () {
    if(inputF.value === ""){
      title.innerHTML = "Es fehlt der Name der Fragesammlung"
      title.style.color = "red";
    }else {
      let type = "Quiz";
      container.remove();
      postSammlung(inputF.value, type)
      numberQuestion = 0;
      home();
    }
  });
}

function multi(){
  let title = document.querySelector("#titelF")
  title.innerHTML = "Geben Sie hier ihre Frage ein.";
  title.style.color = "black";
  let containerM = document.querySelector("#container")
  let container = document.createElement("div");
  container.setAttribute("id", "center");

  let desQ = document.createElement("p");
  desQ.innerHTML = "Geben Sie hier ihre Frage ein."

  let inputQ = document.createElement("input")
  inputQ.setAttribute("id", "FI");

  let desA = document.createElement("p");
  desA.innerHTML = "Geben Sie hier ihre Antwort ein."

  let inputA = document.createElement("input")
  inputA.setAttribute("id", "AI");

  let desC = document.createElement("p");
  desC.innerHTML = "Geben Sie hier ihre anderen Antwort Optionen ein."

  let desC1 = document.createElement("p");
  desC1.innerHTML = "Option 1"

  let inputO1 = document.createElement("input")
  inputO1.setAttribute("id", "O1I");

  let desC2 = document.createElement("p");
  desC2.innerHTML = "Option 2"

  let inputO2 = document.createElement("input")
  inputO2.setAttribute("id", "O2I");

  let desC3 = document.createElement("p");
  desC3.innerHTML = "Option 3"

  let inputO3 = document.createElement("input")
  inputO3.setAttribute("id", "O3I");

  let button = document.createElement("button");
  button.setAttribute("id", "FMulti")
  button.innerHTML = "Fertig"


  container.appendChild(desQ);
  container.appendChild(inputQ);
  container.appendChild(desA);
  container.appendChild(inputA);
  container.appendChild(desC);
  container.appendChild(desC1);
  container.appendChild(inputO1);
  container.appendChild(desC2);
  container.appendChild(inputO2);
  container.appendChild(desC3);
  container.appendChild(inputO3);
  container.appendChild(button);
  containerM.appendChild(container)
  parent.appendChild(containerM);


  button.addEventListener("click", function () {
    let containerM = document.querySelector("#container");
    let input = document.querySelector("#nameFS");
    let modus = "multiple choice";
    let question = "";
    let choices = {
      option1: inputO1.value,
      option2: inputO2.value,
      option3: inputO3.value
    };

    if(input.value === ""){
      title.innerHTML = "Es fehlt der Name der Fragesammlung"
      title.style.color = "red";
    }else {
      container.remove();
      containerM.remove();
      nameCollection = input.value;
      if( art === "Fragensammlung"){
        addF();
        numberQuestion++;
        let inputT = document.querySelector("#nameFS");
        inputT.value = nameCollection;
        postQuestion(input.value, question, inputQ.value, inputA.value, modus, choices)
      }else if(art === "Quiz"){
        addQ();
        numberQuestion++;
        let inputT = document.querySelector("#nameFS");
        inputT.value = nameCollection;
        postQuestion(question, input.value, inputQ.value, inputA.value, modus, choices)
      }
    }
  });


}

function normal(){
  let title = document.querySelector("#titelF")
  title.innerHTML = "Geben Sie hier ihre Frage ein.";
  title.style.color = "black";
  let containerM = document.querySelector("#container")
  let container = document.createElement("div");
  container.setAttribute("id", "center");

  let desQ = document.createElement("p");
  desQ.innerHTML = "Geben Sie hier ihre Frage ein."

  let inputQ = document.createElement("input")
  inputQ.setAttribute("id", "FI");

  let desA = document.createElement("p");
  desA.innerHTML = "Geben Sie hier ihre Antwort ein."

  let inputA = document.createElement("input")
  inputA.setAttribute("id", "AI");


  let button = document.createElement("button");
  button.setAttribute("id", "FMulti")
  button.innerHTML = "Fertig"


  container.appendChild(desQ);
  container.appendChild(inputQ);
  container.appendChild(desA);
  container.appendChild(inputA);
  container.appendChild(button);
  containerM.appendChild(container)
  parent.appendChild(containerM);


  button.addEventListener("click", function () {
    let containerM = document.querySelector("#container");
    let input = document.querySelector("#nameFS");
    let modus = "normal";
    let question = "";
    if(input.value === ""){
      title.innerHTML = "Es fehlt der Name der Fragesammlung"
      title.style.color = "red";
    }else {
      container.remove();
      containerM.remove();
      nameCollection = input.value;
      if( art === "Fragensammlung"){
        addF();
        numberQuestion++;
        let inputT = document.querySelector("#nameFS");
        inputT.value = nameCollection;
        postQuestion(input.value, question, inputQ.value, inputA.value, modus, question)
      }else if(art === "Quiz"){
        addQ();
        numberQuestion++;
        let inputT = document.querySelector("#nameFS");
        inputT.value = nameCollection;
        postQuestion(question, input.value, desQ.value, inputA.value, modus, question)
      }
    }
    
  });

}

function trueA(){
  let answer;
  let title = document.querySelector("#titelF")
  title.innerHTML = "Geben Sie hier ihre Frage ein.";
  title.style.color = "black";
  let antwort;
  let containerM = document.querySelector("#container")
  let container = document.createElement("div");
  container.setAttribute("id", "center");

  let desQ = document.createElement("p");
  desQ.innerHTML = "Geben Sie hier ihre Frage ein."

  let inputQ = document.createElement("input")
  inputQ.setAttribute("id", "FI");

  let desA = document.createElement("p");
  desA.innerHTML = "Wählen Sie aus, ob die Antwort für die Frage richtig oder falsch ist."

  let buttonR = document.createElement("button");
  buttonR.setAttribute("id", "falschB")
  buttonR.innerHTML = "Richtig";

  let buttonF = document.createElement("button");
  buttonF.setAttribute("id", "richtigB")
  buttonF.innerHTML = "Falsch";

  let space = document.createElement("br");

  let button = document.createElement("button");
  button.setAttribute("id", "FMulti")
  button.innerHTML = "Fertig";

  let text = document.createElement("p");
  text.innerHTML = "";
  text.setAttribute("id", "AT")


  container.appendChild(desQ);
  container.appendChild(inputQ);
  container.appendChild(desA);
  container.appendChild(buttonR);
  container.appendChild(buttonF);
  container.appendChild(text);
  container.appendChild(space);
  container.appendChild(button);
  containerM.appendChild(container)
  parent.appendChild(containerM);


  button.addEventListener("click", function () {
    let containerM = document.querySelector("#container");
    let input = document.querySelector("#nameFS");
    let text = document.querySelector("#AT");
    let modus = "true or false";
    let question = "";
    if(input.value === ""){
      title.innerHTML = "Es fehlt der Name der Fragesammlung"
      title.style.color = "red";
    }else {
      container.remove();
      containerM.remove();
      nameCollection = input.value;
      if( art === "Fragensammlung"){
        addF();
        numberQuestion++;
        let inputT = document.querySelector("#nameFS");
        inputT.value = nameCollection;
        postQuestion(input.value, question, inputQ.value, answer, modus, question)
      }else if(art === "Quiz"){
        addQ();
        let inputT = document.querySelector("#nameFS");
        inputT.value = nameCollection;
        numberQuestion++;
        postQuestion(question, input.value, inputQ.value, answer, modus, question)
      }
    }
  });

  buttonR.addEventListener("click", function () {
    answer = "richtig";
    let text = document.querySelector("#AT");
    text.innerHTML = "Antwort: richtig";



  });

  buttonF.addEventListener("click", function () {
    answer = "falsch";
    let text = document.querySelector("#AT");
    text.innerHTML = "Antwort: falsch";

  });
}

async function postQuestion(fragesammlung, quiz, frage, antwort, modus, auswahl){
  let numberOutput = document.querySelector("#numberOutput");
  if (numberQuestion != null) {
    let number = numberQuestion;
    numberOutput.innerHTML = number;
  } else {
    numberOutput.innerHTML = 0;
  }
  const newFrage = {
    fragesammlung,
    quiz,
    frage,
    antwort,
    modus,
    auswahl,
  };


    const response = await fetch('http://localhost:3000/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFrage),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Erfolgreich gespeichert:', result);
  
}

async function postSammlung(name, type){
  const newSammlung ={
    name: name,
    type: type
  };
  await fetch(`http://localhost:3000/collections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSammlung),
  });
}

async function getSammlungen(){
  try {
    const response = await fetch(`http://localhost:3000/collections`);

    if (!response.ok) {
      throw new Error('Fehler beim Abrufen der Daten');
    }

    const collections = await response.json();
    let Container = document.querySelector("#center");

    // Display notes
    collections.forEach(collection => {
      let collectionDiv = document.createElement("div");
      collectionDiv.className = "collection";

      let title = document.createElement("h2");
      title.textContent = collection.title;

      let mainText = document.createElement("p");
      mainText.textContent = collection.name;

      let buttonE = document.createElement("button");
      buttonE.innerHTML = "Verändern";

      let buttonP = document.createElement("button");
      buttonP.innerHTML = "Spielen";

      // Event listener for edit
      buttonE.addEventListener("click", function () {
        let container = document.querySelector("#container");
        container.remove();
        editSammlung(collection._id, collection.name);
      });

      // Add elements
      collectionDiv.appendChild(title);
      collectionDiv.appendChild(mainText);
      if(collection.type ==="Fragesammlung"){
        collectionDiv.appendChild(buttonE);
      }
      if(collection.type === "Quiz"){
        collectionDiv.setAttribute("class", "quiz")
        collectionDiv.appendChild(buttonP)
      }

      // Event listener for Play button
      buttonP.addEventListener("click", function () {
        console.log(`Spiel starten für Quiz: ${collection.name}`);
        // Hier könnte zusätzliche Logik hinzugefügt werden
        container.remove();
        playQuiz(collection.name);
      });

      Container.appendChild(collectionDiv);
    });
  } catch (error) {
    console.error("Fehler:", error);
  }
}

async function getCollection(){
  try {
    const response = await fetch(`http://localhost:3000/collections`);

    if (!response.ok) {
      throw new Error('Fehler beim Abrufen der Daten');
    }

    const collections = await response.json();
    let Container = document.querySelector("#collectionPart");

    // Display notes
    collections.forEach(collection => {
      if(collection.type === "Fragesammlung"){
        let titleQ = document.querySelector("#titelF")
        let input = document.querySelector("#nameFS")
        let collectionDiv = document.createElement("div");
        collectionDiv.className = "collection";
  
        let title = document.createElement("h2");
        title.textContent = collection.title;
  
        let mainText = document.createElement("p");
        mainText.textContent = collection.name;
  
        let button = document.createElement("button");
        button.innerHTML = "Add";
  
        let text = document.createElement("p");
  
        // Add elements
        collectionDiv.appendChild(title);
        collectionDiv.appendChild(mainText);
        collectionDiv.appendChild(button);
        collectionDiv.appendChild(text);
  
        Container.appendChild(collectionDiv);
        
        button.addEventListener("click", function () {
          if(input.value === ""){
            titleQ.innerHTML = "Es fehlt der Name des Quizs"
            titleQ.style.color = "red";
          }else{
            titleQ.innerHTML = "Geben Sie hier den Namen ihres Quizs ein."
            titleQ.style.color = "black";
            text.innerHTML = "Fragensammlung zum Quiz hinzugefügt.";
            text.style.color = "green";
            console.log(collection.name);
            updateQuestionsQuiz(collection.name, input.value);
            button.remove();
          }
        });
      }else{
        console.log("Quiz");
      }

    });
  } catch (error) {
    console.error("Fehler:", error);
  }
}

function getQuestionfromSammlung(sammlung){

}

async function getSammlungfromType(type){

}

async function putCollection(id, _name) {
  const updatName = { name: _name };
  let _id = id;
  console.log(_id)
  console.log("http://localhost:3000/collections/update/${id}")
  const response = await fetch(`http://localhost:3000/collections/update/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatName)
  });

  if (!response.ok) {
    throw new Error(`Fehler beim Aktualisieren der Fragensammlung: ${response.status}`);
  }
}

async function putQuestion(id, question, answer, type, option) {
  const updatName = { 
    frage: question,
    antwort: answer,
    auswahl: option
  };
  let _id = id;
  console.log(_id)
  const response = await fetch(`http://localhost:3000/questions/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatName)
  });

  if (!response.ok) {
    throw new Error(`Fehler beim Aktualisieren der Fragensammlung: ${response.status}`);
  }

  const updatedCollection = await response.json();
  console.log("Fragensammlung erfolgreich aktualisiert:", updatedCollection);
  alert("Fragensammlung erfolgreich aktualisiert!");
  
}

function editSammlung(id, name){
  let answer;
  let _id = id;
  let title = document.querySelector("#header")
  title.innerHTML = "Fragensammlung verändern";
  let containerM = document.createElement('div');
  containerM.setAttribute("id", "container");
  let container = document.createElement("div");
  container.setAttribute("id", "center");

  let desQ = document.createElement("p");
  desQ.innerHTML = "Name von der Fragensammlung"
  desQ.style.color = "black";

  let input = document.createElement("input")
  input.setAttribute("id", "FP");
  input.value = name;

  let space = document.createElement("br");

  let button = document.createElement("button");
  button.setAttribute("id", "updateF")
  button.innerHTML = "Verändern";

  let buttonB = document.createElement("button");
  buttonB.setAttribute("id", "BackF")
  buttonB.innerHTML = "Zurück zur Startseite";

  let des = document.createElement("p");
  des.innerHTML = "Alle Fragen von der Fragensammlung"

  let questionPart = document.createElement("div");
  questionPart.setAttribute("id", "questionPart")
  console.log("test")
  console.log(id);
  editQuestion(name, id);

  container.appendChild(desQ);
  container.appendChild(input);
  container.appendChild(space);
  container.appendChild(button);
  container.appendChild(buttonB)
  containerM.appendChild(container)
  containerM.appendChild(questionPart)
  parent.appendChild(containerM);


  button.addEventListener("click", function () {
    let containerM = document.querySelector("#container");
    if(input.value === ""){
      desQ.innerHTML = "Es fehlt der Name der Fragesammlung"
      desQ.style.color = "red";
    }else {
      container.remove();
      containerM.remove();

      putCollection(_id, input.value);
      updateQuestionsCollection(name, input.value);
      home();
    }
  });

  buttonB.addEventListener("click", function (){
    let containerM = document.querySelector("#container");
    container.remove();
    containerM.remove();
    home();
  });

}


async function editQuestion(fragesammlung, id){
  console.log(`http://localhost:3000/questions/by-fragesammlung/${fragesammlung}`)
  const response = await fetch(`http://localhost:3000/questions/by-fragesammlung/${fragesammlung}`);

  if (!response.ok) {
    throw new Error('Fehler beim Abrufen der Fragen');
  }

  const questions = await response.json();
  let questionPart = document.querySelector("#questionPart");

  questions.forEach(question => {
    let questionDiv = document.createElement("div");
    questionDiv.className = "question";

    let title = document.createElement("h3");
    title.textContent = question.frage;

    let answer = document.createElement("p");
    answer.textContent = `Antwort: ${question.antwort}`;

    let modus = document.createElement("p");
    modus.textContent = `Modus: ${question.modus}`;

    let editButton = document.createElement("button");
    editButton.innerHTML = "Edit";

    let auswahlen = [];
    let i = 0;
    Object.values(question.auswahl).forEach(element => {
      auswahlen[i] = element;
      console.log(auswahlen[i])
      i++;
      
    });

    // Event listener für den Edit-Button
    editButton.addEventListener("click", function () {
      if(question.modus === "multiple choice"){
        let containerM = document.querySelector("#container");
        containerM.remove();
        multiEdit(question._id, question.frage, question.antwort, auswahlen[0], auswahlen[1], auswahlen[2], id, fragesammlung)
      }else if(question.modus === "normal"){
        let containerM = document.querySelector("#container");
        containerM.remove();
        normalEdit(question._id, question.frage, question.antwort, id, fragesammlung)
      }else if(question.modus === "true or false"){
        let containerM = document.querySelector("#container");
        containerM.remove();
        trueEdit(question._id, question.frage, question.antwort, id, fragesammlung)
      }
    });

    // Elemente hinzufügen
    questionDiv.appendChild(title);
    questionDiv.appendChild(answer);
    questionDiv.appendChild(modus);
    questionDiv.appendChild(editButton);

    questionPart.appendChild(questionDiv);
  });

}

function normalEdit(frageID, frage, antwort, id, name){
  let type = "normal";
  let option = "";
  let title = document.querySelector("#header")
  title.innerHTML = "Frage verändern";
  title.style.color = "black";
  let containerM = document.createElement("div")
  containerM.setAttribute("id", "container")
  let container = document.createElement("div");
  container.setAttribute("id", "center");

  let desQ = document.createElement("p");
  desQ.innerHTML = "Geben Sie hier ihre Frage ein."

  let inputQ = document.createElement("input")
  inputQ.setAttribute("id", "FI");
  inputQ.value = frage;

  let desA = document.createElement("p");
  desA.innerHTML = "Geben Sie hier ihre Antwort ein."

  let inputA = document.createElement("input")
  inputA.setAttribute("id", "AI");
  inputA.value = antwort;

  let button = document.createElement("button");
  button.setAttribute("id", "FMulti")
  button.innerHTML = "Fertig"

  let buttonB = document.createElement("button");
  buttonB.innerHTML = "Zurück"




  container.appendChild(desQ);
  container.appendChild(inputQ);
  container.appendChild(desA);
  container.appendChild(inputA);
  container.appendChild(button);
  container.appendChild(buttonB)
  containerM.appendChild(container)
  parent.appendChild(containerM);


  buttonB.addEventListener("click", function(){
    let containerM = document.querySelector("#container");
    container.remove();
    containerM.remove();
    editSammlung(id, name);
  });
  button.addEventListener("click", function () {
    let containerM = document.querySelector("#container");
    container.remove();
    containerM.remove();
    putQuestion(frageID, inputQ.value, inputA.value, type, option);
    editSammlung(id, name);
  });
}

function trueEdit(frageID, frage, antwort, id, name){
  let type = "true or false";
  let option = "";
  let title = document.querySelector("#header")
  title.innerHTML = "Frage bearbeiten";
  let containerM = document.createElement("div")
  containerM.setAttribute("id", "container")
  let container = document.createElement("div");
  container.setAttribute("id", "center");

  let desQ = document.createElement("p");
  desQ.innerHTML = "Geben Sie hier ihre Frage ein."

  let inputQ = document.createElement("input")
  inputQ.setAttribute("id", "FI");
  inputQ.value = frage;

  let desA = document.createElement("p");
  desA.innerHTML = "Wählen Sie aus, ob die Antwort für die Frage richtig oder falsch ist."

  let text = document.createElement("p");
  text.innerHTML = "Antwort: " + antwort;
  text.setAttribute("id", "AT")

  let buttonR = document.createElement("button");
  buttonR.setAttribute("id", "falschB")
  buttonR.innerHTML = "Richtig";

  let buttonF = document.createElement("button");
  buttonF.setAttribute("id", "richtigB")
  buttonF.innerHTML = "Falsch";

  let space = document.createElement("br");

  let button = document.createElement("button");
  button.setAttribute("id", "FMulti")
  button.innerHTML = "Fertig";

  
  let buttonB = document.createElement("button");
  buttonB.innerHTML = "Zurück"



  container.appendChild(desQ);
  container.appendChild(inputQ);
  container.appendChild(desA);
  container.appendChild(buttonR);
  container.appendChild(buttonF);
  container.appendChild(space);
  container.appendChild(button);
  container.appendChild(buttonB)
  container.appendChild(text);
  containerM.appendChild(container)
  parent.appendChild(containerM);


  buttonB.addEventListener("click", function(){
    let containerM = document.querySelector("#container");
    container.remove();
    containerM.remove();
    editSammlung(id, name);
  });
  button.addEventListener("click", function () {
    let containerM = document.querySelector("#container");
      container.remove();
      containerM.remove();
      putQuestion(frageID, inputQ.value, answer, type, option);
      editSammlung(id, name);
  });

  buttonR.addEventListener("click", function () {
    answer = "richtig";
    if(document.querySelector("#AT")){
      let text = document.querySelector("#AT");
      text.innerHTML = "Antwort: richtig";

    }else{
      let container = document.querySelector("#center");
      let text = document.createElement("p");
      text.innerHTML = "Antwort: richtig";
      text.setAttribute("id", "AT")
      container.appendChild(text);
    }

  });

  buttonF.addEventListener("click", function () {
    answer = "falsch";
    if(document.querySelector("#AT")){
      let text = document.querySelector("#AT");
      text.innerHTML = "Antwort: falsch";
    }else{
      let container = document.querySelector("#center");
      container.appendChild(text);
    }
  });
}

function multiEdit(frageID, frage, antwort, auswahl, auswahl2, auswahl3, id, name){
  console.log(auswahl)
  console.log(auswahl2)
  console.log(auswahl3)
  let type = "multiple choice";
  let option = [];
  let title = document.querySelector("#header")
  title.innerHTML = "Frage verändern";
  title.style.color = "black";
  let containerM = document.createElement("div")
  containerM.setAttribute("id", "container")
  let container = document.createElement("div");
  container.setAttribute("id", "center");

  let desQ = document.createElement("p");
  desQ.innerHTML = "Geben Sie hier ihre Frage ein."

  let inputQ = document.createElement("input")
  inputQ.setAttribute("id", "FI");
  inputQ.value = frage;

  let desA = document.createElement("p");
  desA.innerHTML = "Geben Sie hier ihre Antwort ein."

  let inputA = document.createElement("input")
  inputA.setAttribute("id", "AI");
  inputA.value = antwort;

  let desC = document.createElement("p");
  desC.innerHTML = "Geben Sie hier ihre anderen Antwort Optionen ein."

  let desC1 = document.createElement("p");
  desC1.innerHTML = "Option 1"

  let inputO1 = document.createElement("input")
  inputO1.setAttribute("id", "O1I");
  inputO1.value = auswahl;

  let desC2 = document.createElement("p");
  desC2.innerHTML = "Option 2"

  let inputO2 = document.createElement("input")
  inputO2.setAttribute("id", "O2I");
  inputO2.value = auswahl2;

  let desC3 = document.createElement("p");
  desC3.innerHTML = "Option 3"

  let inputO3 = document.createElement("input")
  inputO3.setAttribute("id", "O3I");
  inputO3.value = auswahl3;

  let button = document.createElement("button");
  button.setAttribute("id", "FMulti")
  button.innerHTML = "Fertig"

  let buttonB = document.createElement("button");
  buttonB.innerHTML = "Zurück"




  container.appendChild(desQ);
  container.appendChild(inputQ);
  container.appendChild(desA);
  container.appendChild(inputA);
  container.appendChild(desC);
  container.appendChild(desC1);
  container.appendChild(inputO1);
  container.appendChild(desC2);
  container.appendChild(inputO2);
  container.appendChild(desC3);
  container.appendChild(inputO3);
  container.appendChild(button);
  container.appendChild(buttonB)
  containerM.appendChild(container)
  parent.appendChild(containerM);


  buttonB.addEventListener("click", function(){
    let containerM = document.querySelector("#container");
    container.remove();
    containerM.remove();
    editSammlung(id, name);
  });
  button.addEventListener("click", function () {
    let containerM = document.querySelector("#container");
      container.remove();
      containerM.remove();
      option [0] = inputO1.value;
      option [1] = inputO2.value;
      option [2] = inputO3.value;
      putQuestion(frageID, inputQ.value, inputA.value, type, option);
      editSammlung(id, name);
  });
}

async function updateQuestionsCollection(currentCollection, newCollection) {
  try {
      // URL mit der aktuellen Fragensammlung
      const url = `http://localhost:3000/questions/update-by-collection-or-quiz/${currentCollection}`;

      // Body mit den Änderungen
      const body = {
          fragesammlung: newCollection // Die neue Fragensammlung
      };

      // Fetch-Request senden
      const response = await fetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
      });

      // Ergebnis prüfen
      if (!response.ok) {
          throw new Error(`Fehler beim Aktualisieren: ${response.status}`);
      }

  } catch (error) {
      console.error('Fehler:', error);  }
}

async function updateQuestionsQuiz(Collection, Quiz) {
  try {
      // URL mit der aktuellen Fragensammlung
      const url = `http://localhost:3000/questions/update-by-collection-or-quiz/${Collection}`;

      // Body mit den Änderungen
      const body = {
          quiz: Quiz // Die neue Fragensammlung
      };

      // Fetch-Request senden
      const response = await fetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
      });

      // Ergebnis prüfen
      if (!response.ok) {
          throw new Error(`Fehler beim Aktualisieren: ${response.status}`);
      }

  } catch (error) {
      console.error('Fehler:', error);  }
}

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