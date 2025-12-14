const quoteArr = [
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    category: "Motivation",
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    category: "Life",
  },
  {
    text: "He who has a why to live can bear almost any how.",
    category: "Purpose",
  },
  {
    text: "The best way to predict the future is to create it.",
    category: "Leadership",
  },
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const div = document.createElement("div");
const form = document.createElement("form");
const firstInput = document.createElement("input");
const secondInput = document.createElement("input");
const formBtn = document.createElement("button");

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quoteArr.length);

  quoteArr.forEach((item, index) => {
    if (index === randomIndex) {
      quoteDisplay.innerHTML = `<p><q>${item.text}</q> <br> ${item.category}</p>`;
    }
  });
}

function createAddQuoteForm() {
  firstInput.setAttribute("id", "newQuoteText");
  firstInput.setAttribute("type", "text");
  firstInput.setAttribute("placeholder", "Enter a new quote");

  secondInput.setAttribute("id", "newQuoteCategory");
  secondInput.setAttribute("type", "text");
  secondInput.setAttribute("placeholder", "Enter quote category");

  formBtn.textContent = "Add Quote";

  form.appendChild(firstInput);
  form.appendChild(secondInput);
  form.appendChild(formBtn);

  div.appendChild(form);
  document.body.appendChild(div);
}

function addQuote(e) {
  e.preventDefault();

  if (firstInput.value === "" || secondInput.value === "") {
    alert("Please fill the empty box");
  } else {
    if (confirm("Are you sure?")) {
      quoteArr.push({
        text: firstInput.value,
        category: secondInput.value,
      });

      firstInput.value = "";
      secondInput.value = "";
    }
  }

}



// Event Litsnener
newQuoteBtn.addEventListener("click", showRandomQuote);
document.addEventListener("DOMContentLoaded", createAddQuoteForm);
formBtn.addEventListener("click", addQuote);
