let user = "lehrer"
let password = "supertool"
let buttonL = document.querySelector("#login");
let buttonQ = document.querySelector("#start");
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
  let parentDiv = document.querySelector("#main" || "body"); // Falls es ein #main gibt, sonst body
  parentDiv.appendChild(container);

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
  window.parent.appendChild(container);
  getSammlungen();

  button.addEventListener("click", function () {
    container.remove();
    window.addF();
  });

  buttonQ.addEventListener("click", function () {
    container.remove();
    window.addQ();
  });
}

window.home = home;