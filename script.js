function submitOrder() {
  if (!selectedDrink) {
    alert("Please select a drink first.");
    return;
  }

  fetch(
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
    }
  )
  .then(() => {
    alert("Order submitted!");
    // optional reset
    // document.querySelector("form")?.reset();
  })
  .catch(err => {
    console.error(err);
    alert("Submission failed");
  });
}

