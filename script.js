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
  
    fetch("https://script.google.com/macros/s/AKfycbxG-WTC9r9aNzBir9G5cxJUZy6aN2er0eBBm6lYbytozaNeitmLehHc6AFFJxXGaf9y/exec", {
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


function doPost(e) {
  try {
    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName("drink orders"); // <-- match your sheet name

    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No POST data received");
    }

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),          // Timestamp
      data.name || "",
      data.drink || "",
      data.size || "",
      data.milk || "",
      data.sweetness || "",
      data.notes || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(
        JSON.stringify({ success: false, error: error.message })
      )
      .setMimeType(ContentService.MimeType.JSON);
  }
}

  
