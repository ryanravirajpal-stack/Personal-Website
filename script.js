let selectedDrink = "";
let selectedButton = null;
let expandedCard = null;

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
    document.getElementById("selectedDrink").innerText =
      `Selected: ${drink}`;
  }
}

 function submitOrder() {
    if (!selectedDrink) {
      alert("Please select a drink first.");
      return;
    }
  
    const form = document.createElement("form");
    form.action = "https://docs.google.com/forms/d/e/1FAIpQLSdaLCstrUCUKr5QQwbfx_xQ4P31ERCj3vCjt4WEy9SSfPMuBA/formResponse";
    form.method = "POST";
    form.target = "_blank"; // optional: open in new tab
  
    const fields = {
      "entry.1208397499": document.getElementById("name").value,
      "entry.178730096": selectedDrink,
      "entry.1117680067": document.getElementById("size").value,
      "entry.1576239071": document.getElementById("ice").value,
      "entry.897010592": document.getElementById("sweetness").value,
      "entry.1899689055": document.getElementById("notes").value
    };
  
    for (const [key, value] of Object.entries(fields)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }
  
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  
    alert("Order submitted!");
  }

