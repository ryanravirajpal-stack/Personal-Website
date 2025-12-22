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
  
 
fetch("https://script.google.com/macros/s/AKfycbxcqRe5cayp4dn7JX-SyRgZPjiQf1i2rlXskNmhQNjK94a8A5SF6ysZB1j7RgUDU18B/exec", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(res => {
  if (res.success) alert("Order submitted!");
  else alert(res.error || "Something went wrong");
})
.catch(err => {
  console.error(err);
  alert("Submission failed");
})
  }

