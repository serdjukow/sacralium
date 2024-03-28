const form = document.getElementById("form");
const getNameLink = "https://forum-dev.sacralium.game/forum/api/get_names";
const registerLink = "https://forum-dev.sacralium.game/forum/api/register";
const inputField = document.getElementById("name");
const hintButton = document.getElementById("hint-button");
const hintButtonContainer = document.getElementById("hint-names");
const hintNames = document.querySelectorAll(".form__hint-name");

const testLink = "./../data.json";

function validateInput() {
  const inputValue = inputField.value.trim();
  const regex = /^[a-zA-Zа-яА-Я0-9_\- ]{3,20}$/;

  if (regex.test(inputValue)) {
    inputField.style.color = "green";
    inputField.style.borderColor = "green";
  } else {
    inputField.style.color = "red";
    inputField.style.borderColor = "red";
  }
}

inputField.addEventListener("input", () => validateInput());

hintButton.addEventListener("click", () => {
  getName();
});

async function getName() {
  try {
    const response = await fetch(getNameLink, {});
    if (!response.ok) {
      throw new Error("Ошибка HTTP: " + response.status);
    }
    const data = await response.json();
    hintButtonContainer.innerHTML = nameRender(data.names);
  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
}

hintButtonContainer.addEventListener("click", (e) => {
  inputField.value = e.target.innerText;
  validateInput();
});

const nameToHtml = (name) => `<div class="form__hint-name">${name}</div>`;
const nameRender = (names) => names.map(nameToHtml).join("");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let formData = new FormData(form);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });
  console.log(formObject);
  form.reset();
  hintButtonContainer.innerHTML = "";
});
