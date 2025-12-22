let selectedDrink = "";
let expandedCard = null;

// Toggle drink selection
function selectDrink(drink, button) {
  const card = button.parentElement;

  if (expandedCard && expandedCard !== card) {
    expandedCard.classList.remove("expanded");
    expandedCard.querySelector("button").classList.remove("selected");
  }

  const isExpanded = card.classList.contains("expanded");

  if (isExpanded) {
    card.classList.remove("expanded");
    button.classList.remove("selected");
    selectedDrink = "";
    expandedCard = null;
    document.getElementById("selectedDrink").innerText = "No drink selected";
  } else {
    card.classList.add("expanded");
    button.classList.add("selected");
    selectedDrink = drink;
    expandedCard = card;
    document.getElementById("selectedDrink").innerText = `Selected: ${drink}`;
  }
}

// Form submission
const form = document.getElementById("orderForm");

form.addEventListener("submit", e => {
  e.preventDefault();

  if (!selectedDrink) {
    alert("Please select a drink before submitting!");
    return;
  }

  const data = new FormData(form);
  data.append("drink", selectedDrink);

  fetch("https://script.google.com/macros/s/AKfycbyYUVMyYRki1NFlCYlb-f4k38GQA4SilyrqoGN8rhz7kPUZiqBmL6PpESq5IBt8XTpi/exec", {
    method: "POST",
    body: data
})
.then(res => res.json())
.then(res => {
    if(res.success) {
        alert("Order submitted!");
        form.reset();
        selectedDrink = "";
        document.getElementById("selectedDrink").innerText = "No drink selected";
        if (expandedCard) {
            expandedCard.classList.remove("expanded");
            expandedCard.querySelector("button").classList.remove("selected");
            expandedCard = null;
        }
    } else {
        alert("Error: " + res.error);
    }
})
.catch(err => alert("Submission failed: " + err));

