let quoteArr = [
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
const itemFromLocalStorage = localStorage.getItem("Quotes");
const exportBtn = document.querySelector("#exportBtn");
const importBtn = document.querySelector("#importFile");
const categoryDropdown = document.getElementById("categoryFilter");

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

  saveQuotes();
  populateCategories();
}

function saveQuotes() {
  localStorage.setItem("Quotes", JSON.stringify(quoteArr));
}

function initializeQuotes() {
  if (itemFromLocalStorage !== null && itemFromLocalStorage !== "") {
    quoteArr = JSON.parse(itemFromLocalStorage);
  }
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quoteArr.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

function exportQuotes() {
  const exporData = JSON.stringify(quoteArr);

  const blob = new Blob([exporData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "data.json";
  a.click();
  URL.revokeObjectURL(url);
}

function populateCategories() {
  catArr = [];

  while (categoryDropdown.options.length > 1) {
    categoryDropdown.remove(1);
  }

  quoteArr.forEach((item) => {
    catArr.push(item.category);
  });

  const uniqueCategories = [...new Set(catArr)];
  uniqueCategories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;

    categoryDropdown.appendChild(option);
  });

  const savedCategory = localStorage.getItem("savedCategory");
  if (savedCategory) {
    categoryDropdown.value = savedCategory;
  }
}

function filterQuotes() {
  const selectedCategory = categoryDropdown.value.toLowerCase();
  if (selectedCategory !== "all") {
    localStorage.setItem("savedCategory", selectedCategory);

    const setCat = quoteArr.filter((item) => {
      return item.category.toLowerCase() === selectedCategory;
    });

    const randomIndex = Math.floor(Math.random() * setCat.length);
    const quote = setCat[randomIndex];

    quoteDisplay.innerHTML = `<p><q>${quote.text}</q> <br> ${quote.category}</p>`;
  } else {
    showRandomQuote();
  }
}

function domContentLoad() {
  initializeQuotes();
  createAddQuoteForm();
  populateCategories();
  filterQuotes();
}

// Event Litsnener
newQuoteBtn.addEventListener("click", showRandomQuote);
document.addEventListener("DOMContentLoaded", domContentLoad);
formBtn.addEventListener("click", addQuote);
exportBtn.addEventListener("click", exportQuotes);
importBtn.addEventListener("change", importFromJsonFile);
categoryDropdown.addEventListener("change", filterQuotes);
