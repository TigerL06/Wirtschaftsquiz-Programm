let containerM = document.querySelector("#container");
let parent = document.querySelector("#main");
let art;
let numberQuestion = 0;
let nameCollection;



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
  description.innerHTML = "Waehlen Sie aus, ob Sie eine Multiple Choice Frage erstellen wollen, eine normale oder eine Richtig Falsch Frage."
  
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
  backB.innerHTML = "Zurueck zum Hauptmenu";
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
      window.home();
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
    window.home();
  });

  finishB.addEventListener("click", function () {
    if(inputF.value === ""){
      let title = document.querySelector("#titelF")
      title.innerHTML = "Es fehlt der Name Fragensammlung";
      title.style.color = "red";
    }else {
      let type = "Quiz";
      container.remove();
      postSammlung(inputF.value, type)
      numberQuestion = 0;
      window.home();
    }
  });
}

function multi(){
  if(fragensammlung === null){
    let title = document.querySelector("#titelF")
    title.innerHTML = "Geben Sie hier ihre Frage ein.";
    title.style.color = "black";
  }
  let containerM = document.querySelector("#container")
  let container = document.createElement("div");
  container.setAttribute("id", "center");

  let subtitle = document.createElement("h3");
  subtitle.innerHTML = "Fragen hinzufügen."

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


  container.appendChild(subtitle);
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
    input1 = inputO1.value
    input2 = inputO2.value
    input3 = inputO3.value
    let choices = [input1, input2, input3]

    if(fragensammlung === null){
      if(input.value === ""){
        let title = document.querySelector("#titelF")
        title.innerHTML = "Es fehlt der Name Fragensammlung";
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
    }else{
      container.remove();
      containerM.remove();
      postQuestion(fragensammlung, question, inputQ.value, inputA.value, modus, choices)
      window.editSammlung(fragensammlungID, fragensammlung)
      window.fragensammlung = null;
    }
  });


}

function normal(){
  if(fragensammlung === null){
    let title = document.querySelector("#titelF")
    title.innerHTML = "Geben Sie hier ihre Frage ein.";
    title.style.color = "black";
  }
  let containerM = document.querySelector("#container")
  let container = document.createElement("div");
  container.setAttribute("id", "center");
  let subtitle = document.createElement("h3");
  subtitle.innerHTML = "Fragen hinzufügen."

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

  container.appendChild(subtitle);
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
    if(fragensammlung === null){
      if(input.value === ""){
        console.log("FEhler")
        let title = document.querySelector("#titelF")
        title.innerHTML = "Es fehlt der Name Fragensammlung";
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
          postQuestion(question, input.value, inputQ.value, inputA.value, modus, question)
        }
      }
    }else{
      container.remove();
      containerM.remove();
      postQuestion(fragensammlung, question, inputQ.value, inputA.value, modus, question)
      window.editSammlung(fragensammlungID, fragensammlung)
      window.fragensammlung = null;
    }
    
  });

}

function trueA(){
  let answer;
  if(fragensammlung === null){
    let title = document.querySelector("#titelF")
    title.innerHTML = "Geben Sie hier ihre Frage ein.";
    title.style.color = "black";
  }
  let antwort;
  let containerM = document.querySelector("#container")
  let container = document.createElement("div");
  container.setAttribute("id", "center");

  let subtitle = document.createElement("h3");
  subtitle.innerHTML = "Fragen hinzufügen."

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


  container.appendChild(subtitle);
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
    if(fragensammlung === null){
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
    }else{
      container.remove();
      containerM.remove();
      postQuestion(fragensammlung, question, inputQ.value, answer, modus, question)
      window.editSammlung(fragensammlungID, fragensammlung)
      window.fragensammlung = null;

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
  console.log(auswahl)
  let numberOutput = document.querySelector("#numberOutput");
  if (numberQuestion != null) {
    let number = numberQuestion;
    if(fragensammlung === null){
      numberOutput.innerHTML = number;
    }
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

window.addF = addF;
window.addQ = addQ;
window.trueA = trueA;
window.multi = multi;
window.normal = normal;
window.parent = parent;
window.containerM = containerM;