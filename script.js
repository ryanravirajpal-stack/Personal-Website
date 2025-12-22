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
    const data = {
      name: document.getElementById("name").value,
      drink: selectedDrink,
      size: document.getElementById("size").value,
      milk: document.getElementById("milk").value,
      sweetness: document.getElementById("sweetness").value,
      notes: document.getElementById("notes").value
    };
  
    fetch("https://script.google.com/macros/s/AKfycbyYUVMyYRki1NFlCYlb-f4k38GQA4SilyrqoGN8rhz7kPUZiqBmL6PpESq5IBt8XTpi/exec", {
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(res => {
      if (res.success) alert("Order submitted!");
      else alert("Something went wrong");
    })
    .catch(err => alert("Submission failed"));
  }
  