function submitForm() {
  if (!document.getElementById("name").value) {
    alert("Please enter your name.");
    return;
  }

  const form = document.getElementById("rsvpForm");

  fetch("https://script.google.com/macros/s/AKfycbzta1srp-01IdwlobyJbeBEwR_YWChVOG1sphKf-gPQpl78VD-_RSEuf5UfLvJhUDKy/exec", {
    method: "POST",
    body: new FormData(form),
  mode: "no-cors" 
  })
  .then(() => {
    alert("Thank you for your RSVP!");
    form.reset();
    document.getElementById("submitHeading").innerText = "Thank you for your RSVP!";
  })
  .catch(err => {
    console.error(err);
    alert("Something went wrong.");
  });
}
