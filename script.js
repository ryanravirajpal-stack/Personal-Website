<script>

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
    document.getElementById("drink").value = "";
    document.getElementById("selectedDrink").innerText = "No drink selected";
  } else {
    card.classList.add("expanded");
    button.classList.add("selected");
    selectedDrink = drink;
    expandedCard = card;
    document.getElementById("drink").value = drink; // ← AND THIS
    document.getElementById("selectedDrink").innerText =
      `Selected: ${drink}`;
  }
}


function submitOrder() {
  if (!document.getElementById("drink").value) {
    alert("Please select a drink first.");
    return;
  }

  const form = document.getElementById("orderForm");

  fetch("https://script.google.com/macros/s/AKfycbx90tWyTac44ZEIcuPjX1DgmvMe_0rrp8oUi8rUXVvQolttQvBpuE0KCmPBIde-0go/exec", {
    method: "POST",
    body: new FormData(form),
  mode: "no-cors" 
  })
  .then(() => {
    alert("Order submitted!");
    form.reset();
    document.getElementById("selectedDrink").innerText = "No drink selected";
  })
  .catch(err => {
    console.error(err);
    alert("Something went wrong.");
  });
}

</script>
