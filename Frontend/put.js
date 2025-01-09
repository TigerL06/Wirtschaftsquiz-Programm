let fragensammlung = null;
let fragensammlungID

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
  fragensammlungID = id;
  let _id = id;
  let title = document.querySelector("#header")
  title.innerHTML = "Fragensammlung verändern";
  let containerM = document.createElement('div');
  containerM.setAttribute("id", "container");
  let container = document.createElement("div");
  container.setAttribute("id", "main");

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
  
  let addDiv = document.createElement("div");
  addDiv.setAttribute("id", "addDiv")

  let addMultiButton = document.createElement("button");
  addMultiButton.innerHTML = "Multiple Choice Frage hinzufügen";

  let addNormalButton = document.createElement("button");
  addNormalButton.innerHTML = "Normale Frage hinzufügen";

  let addTrueOrFalseButton = document.createElement("button");
  addTrueOrFalseButton.innerHTML = "True or False Frage hinzufügen";


  container.appendChild(desQ);
  container.appendChild(input);
  container.appendChild(space);
  container.appendChild(button);
  container.appendChild(space);
  addDiv.appendChild(addMultiButton)
  addDiv.appendChild(addTrueOrFalseButton)
  addDiv.appendChild(addNormalButton)
  container.appendChild(addDiv);
  container.appendChild(space);
  container.appendChild(buttonB)
  containerM.appendChild(container)
  containerM.appendChild(questionPart)
  parent.appendChild(containerM);

  addMultiButton.addEventListener("click", function(){
    if(document.querySelector("#center")){
      let elementM = document.querySelector("#center")
      elementM.remove();
    }
    fragensammlung = name;
    multi()

  });

  addNormalButton.addEventListener("click", function(){

    if(document.querySelector("#center")){
      let elementM = document.querySelector("#center")
      elementM.remove();
    }
    fragensammlung = name;
    normal()

  });

  addTrueOrFalseButton.addEventListener("click", function(){
    if(document.querySelector("#center")){
      let elementM = document.querySelector("#center")
      elementM.remove();
    }
    fragensammlung = name;
    trueA()

  });

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
  let answer;
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

window.getCollection = getCollection;
window.getSammlungen = getSammlungen;
window.fragensammlung = fragensammlung;
window.fragensammlungID = fragensammlungID;
window.editQuestion = editQuestion;
window.editSammlung = editSammlung;