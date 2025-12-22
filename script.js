let selectedDrink = "";
let selectedButton = null;
let expandedCard = null;

function selectDrink(drink, button) {
  const card = button.parentElement;

  // Collapse previous
  if (expandedCard && expandedCard !== card) {
    expandedCard.classList.remove("expanded");
    expandedCard.querySelector("button").classList.remove("selected");
  }

  // Toggle current
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


  function submitOrder() {
  const order = {
    name: document.getElementById("name").value,
    drink: selectedDrink,
    size: document.getElementById("size").value,
    milk: document.getElementById("milk").value,
    sweetness: document.getElementById("sweetness").value,
    notes: document.getElementById("notes").value
  };

  fetch("https://script.google.com/macros/s/AKfycbyc5zOJFe_iLJnNOuT7KjVXV0XXiwUs-DpW1M-FP4-fQipyd_IMUFXIB4zaPNOutyh0/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
  .then(res => res.text()) // ← ALWAYS read text first
  .then(text => {
    console.log("Server response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      alert("Server did not return valid JSON");
      return;
    }

    if (data.success) {
      alert("Order submitted!");
    } else {
      alert(data.error || "Something went wrong");
    }
  })
  .catch(err => {
    console.error(err);
    alert("Submission failed");
  });
}
