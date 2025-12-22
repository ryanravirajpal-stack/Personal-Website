
// Drink Selection
let selectedDrink = "";
let selectedButton = null;
let expandedCard = null;

function selectDrink(drink, button) {
  const card = button.parentElement;

  // Collapse
  if (expandedCard && expandedCard !== card) {
    expandedCard.classList.remove("expanded");
    expandedCard.querySelector("button").classList.remove("selected");
  }

  // Toggle
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
    document.getElementById("selectedDrink").innerText =
      `Selected: ${drink}`;
  }
}

//Order Submission

  function submitOrder() {
  const order = {
    name: document.getElementById("name").value,
    drink: selectedDrink,
    size: document.getElementById("size").value,
    milk: document.getElementById("milk").value,
    sweetness: document.getElementById("sweetness").value,
    notes: document.getElementById("notes").value
  };

  fetch("https://script.google.com/macros/s/AKfycbzj7yGlX7qlsbXFt0dnqUZ_a90xiv-aTkjQ7YpkVTIx76W2Bb8CmpQ0PKZGStum8FS5/exec", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(order)
})
  .then(res => res.json())  // <-- parse JSON directly
  .then(data => {
    if (data.success) {
      alert("Order submitted! Row: " + data.row);
    } else {
      alert("Error: " + data.error);
    }
  })
  .catch(err => {
    console.error(err);
    alert("Submission failed");
  })
  }
