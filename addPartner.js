import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  child,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUAKgUyEJV7WwXOp2zV1cP3Z5-mzz-XRM",
  authDomain: "fbla-coding-and-program-2024.firebaseapp.com",
  databaseURL:
    "https://fbla-coding-and-program-2024-default-rtdb.firebaseio.com",
  projectId: "fbla-coding-and-program-2024",
  storageBucket: "fbla-coding-and-program-2024.appspot.com",
  messagingSenderId: "924883999899",
  appId: "1:924883999899:web:328241f4ced6140a92ba3e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
var db = getDatabase();

// Function to create and display the add partner form
function addPartnerForm() {
  var formContainer = document.getElementById("addPartnerFormContainer");
  formContainer.innerHTML = "";

  var form = document.createElement("form");
  form.className = "add-partner-form";

  var fields = ["Name", "Resources", "ContactPerson", "Email", "Phone"];

  fields.forEach(function (field) {
    var label = document.createElement("label");
    label.textContent = field + ":";
    label.className = "form-label";

    var input = document.createElement("input");
    input.setAttribute(
      "type",
      field.toLowerCase() === "email" ? "email" : "text"
    );
    input.setAttribute("name", field.toLowerCase());
    input.setAttribute("required", "required");
    input.className = "form-input";

    var fieldContainer = document.createElement("div");
    fieldContainer.className = "input-container";
    form.appendChild(label);
    form.appendChild(input);

    form.appendChild(fieldContainer);
  });

  //   add a type dropdown of options
  var label = document.createElement("label");
  label.textContent = "Type:";
  label.className = "form-label";

  var select = document.createElement("select");
  select.setAttribute("name", "type");
  select.setAttribute("required", "required");
  select.className = "form-input";

  var options = [
    "Select a type",
    "Non-profit",
    "Corporation",
    "Microbusiness",
    "Franchise",
    "Partnership",
  ];

  options.forEach(function (option) {
    var optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    select.appendChild(optionElement);
  });

  var fieldContainer = document.createElement("div");
  fieldContainer.className = "input-container";
  form.appendChild(label);
  form.appendChild(select);
  form.appendChild(fieldContainer);

  var submitButton = document.createElement("button");
  submitButton.textContent = "Add Partner";
  submitButton.className = "submit-button";

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    var partner = {};
    fields.forEach(function (field) {
      partner[field] = form.elements[field.toLowerCase()].value;
    });

    partner["Type"] = form.elements["type"].value;

    // Add partner data to the database
    set(ref(db, "Partners/" + partner.Name), partner)
      .then(() => {
        console.log("Added partner:", partner.Name);
        window.location = "partnerPage.html";
      })
      .catch((error) => {
        console.error("Error adding partner:", error);
      });
  });

  form.appendChild(submitButton);
  formContainer.appendChild(form);
}

document.addEventListener("DOMContentLoaded", function () {
  addPartnerForm();
});
