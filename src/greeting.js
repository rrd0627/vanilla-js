const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");


const USER_NAME = "username";
function loadName() {
    const curUser = localStorage.getItem("USER_NAME");
    if (curUser === null) {
        askForName();
    }
    else {
        paintGreeting(curUser);
    }
}

function SaveName(text) {
    localStorage.setItem("USER_NAME", text);

}

function handleSubmit(event) {
    event.preventDefault();
    const curValue = input.value;
    paintGreeting(curValue);
    SaveName(curValue);
}

function askForName() {
    form.classList.add("showing");
    form.addEventListener("submit", handleSubmit);

}

function paintGreeting(text) {
    form.classList.remove("showing");
    greeting.classList.add("showing");
    greeting.innerText = `Hello ${text}`;
}


function init() {
    loadName();
}

init();