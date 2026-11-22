const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const clickMe = () => {
  alert("Thanks for clicking me. Hope you have a nice day!");
};
const submitForm = () => {
  let formData = {};
  formData.first_name = $("#first_name").val();
  formData.last_name = $("#last_name").val();
  formData.password = $("#password").val();
  formData.email = $("#email").val();

  const outputCard = $("<div>").addClass("card-panel white black-text left-align");
  outputCard.append($("<h6>").text("Form Data Submitted:"));
  outputCard.append($("<p>").text("First Name: " + formData.first_name));
  outputCard.append($("<p>").text("Last Name: " + formData.last_name));
  outputCard.append($("<p>").text("Password: " + formData.password));
  outputCard.append($("<p>").text("Email: " + formData.email));

  $("#form-output").empty().append(outputCard);
  $("#modal1").modal("close");
};
const addCards = (items) => {
  items.forEach((item) => {
    let itemToAppend =
      '<div class="col s4 center-align">' +
      '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' +
      escapeHtml(item.image) +
      '">' +
      '</div><div class="card-content">' +
      '<span class="card-title grey-text text-darken-4">' +
      escapeHtml(item.title) +
      '<i class="material-icons right add-card-trigger" title="Add a new card">more_vert</i></span><p><a href="#!" class="activator">' +
      escapeHtml(item.link) +
      "</a></p></div>" +
      '<div class="card-reveal">' +
      '<span class="card-title grey-text text-darken-4">' +
      escapeHtml(item.title) +
      '<i class="material-icons right">close</i></span>' +
      '<p class="card-text">' +
      escapeHtml(item.description) +
      "</p>" +
      "</div></div></div>";
    $("#card-section").append(itemToAppend);
  });
};
const getCards = () => {
  $.get("/api/cards", (response) => {
    if (response.statusCode == 200) {
      addCards(response.data);
    }
  });
};
const submitNewCard = () => {
  let newCard = {
    title: $("#card_title").val().trim(),
    image: $("#card_image").val().trim(),
    link: $("#card_link").val().trim(),
    description: $("#card_description").val().trim(),
  };

  if (!newCard.title || !newCard.image || !newCard.link || !newCard.description) {
    M.toast({ html: "Please fill in all card details." });
    return;
  }

  const finishAddCard = (card) => {
    addCards([card]);
    $("#card_title").val("");
    $("#card_image").val("images/livedemo.jpeg");
    $("#card_link").val("");
    $("#card_description").val("");
    M.updateTextFields();
    $("#addCardModal").modal("close");
  };

  $.post("/api/cards", newCard)
    .done((response) => {
      if (response.statusCode == 200) {
        finishAddCard(response.data);
      }
    })
    .fail(() => {
      finishAddCard(newCard);
      M.toast({
        html: "Card added locally (restart server.js to save via API).",
      });
    });
};
$(document).ready(function () {
  $(".materialboxed").materialbox();
  $("#formSubmit").click(() => {
    submitForm();
  });
  $("#addCardSubmit").click((e) => {
    e.preventDefault();
    submitNewCard();
  });
  $("#addCardForm").on("submit", (e) => {
    e.preventDefault();
    submitNewCard();
  });
  $(document).on("click", ".add-card-trigger", () => {
    $("#addCardModal").modal("open");
  });
  getCards();
  $(".modal").modal();
});
