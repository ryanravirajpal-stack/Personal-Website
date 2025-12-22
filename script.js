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
      ice: document.getElementById("ice").value,
      sweetness: document.getElementById("sweetness").value,
      notes: document.getElementById("notes").value
    };
  
 
    "https://docs.google.com/forms/d/e/1FAIpQLSdaLCstrUCUKr5QQwbfx_xQ4P31ERCj3vCjt4WEy9SSfPMuBA/formResponse",
    {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams({
        "entry.1208397499": document.getElementById("name").value,
        "entry.178730096": selectedDrink,
        "entry.1117680067": document.getElementById("size").value,
        "entry.1576239071": document.getElementById("ice").value,
        "entry.897010592": document.getElementById("sweetness").value,
        "entry.1899689055": document.getElementById("notes").value
      })
      .then(() => {
        alert("Order submitted!");
        // optional reset
        // document.querySelector("form")?.reset();
      })
      .catch(err => {
        console.error(err);
        alert("Submission failed");
      })}}
