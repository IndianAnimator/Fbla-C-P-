import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, set, ref, child, get, update, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUAKgUyEJV7WwXOp2zV1cP3Z5-mzz-XRM",
  authDomain: "fbla-coding-and-program-2024.firebaseapp.com",
  databaseURL: "https://fbla-coding-and-program-2024-default-rtdb.firebaseio.com",
  projectId: "fbla-coding-and-program-2024",
  storageBucket: "fbla-coding-and-program-2024.appspot.com",
  messagingSenderId: "924883999899",
  appId: "1:924883999899:web:328241f4ced6140a92ba3e"
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
  
  var fields = ["Name", "Type", "Resources", "ContactPerson", "Email", "Phone"];

  fields.forEach(function (field) {
    var label = document.createElement("label");
    label.textContent = field + ":";
    label.className = "form-label"; 

    var input = document.createElement("input");
    input.setAttribute("type", field.toLowerCase() === "email" ? "email" : "text");
    input.setAttribute("name", field.toLowerCase());
    input.setAttribute("required", "required");
    input.className = "form-input";

    var fieldContainer = document.createElement("div");
    fieldContainer.className = "input-container";
    form.appendChild(label);
    form.appendChild(input);

    form.appendChild(fieldContainer);
  });

  var submitButton = document.createElement("button");
  submitButton.textContent = "Add Partner";
  submitButton.className = "submit-button";

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    var partner = {};
    fields.forEach(function (field) {
      partner[field] = form.elements[field.toLowerCase()].value;
    });

    // Add partner data to the database
    set(child(ref(db, "Partners/" + partner.Name), partner.Name), partner)
      .then(() => {
        console.log('Added partner:', partner.Name);
      })
      .catch((error) => {
        console.error('Error adding partner:', error);
      });
  });

  form.appendChild(submitButton);
  formContainer.appendChild(form);
}

// Function to fetch partners data from Firebase and display them
function displayPartners() {
  var cardsContainer = document.getElementById("cards");
  cardsContainer.innerHTML = "";

  const partnersRef = ref(db, "Partners");
  get(partnersRef).then((snapshot) => {
    if (snapshot.exists()) {
      const partners = Object.values(snapshot.val());
      partners.forEach(function (partner, index) {
        var card = createCardElement(partner, index);
        cardsContainer.appendChild(card);
      });
    }
  }).catch((error) => {
    console.error("Error fetching partners:", error);
  });
}

// Function to create card element for a partner
function createCardElement(partner, index) {
  var card = document.createElement("div");
  card.className = "card";
  card.id = "card-" + index;

  var cardContent = document.createElement("div");
  cardContent.className = "card-content";

  // Add partner details to card content
  var details = ["Name", "Type", "Resources", "ContactPerson", "Email", "Phone"];
  details.forEach(function (detail) {
    var label = document.createElement("p");
    label.className = "card-text";
    label.innerHTML = "<strong>" + detail + ": </strong>" + partner[detail];
    cardContent.appendChild(label);
  });

  card.appendChild(cardContent);
  return card;
}


// Function to filter partners by type and display the filtered partners
function filterPartnersByType(type) {
  const partnersRef = ref(db, "Partners");
  get(partnersRef).then((snapshot) => {
    if (snapshot.exists()) {
      const partners = Object.values(snapshot.val());
      const filteredPartners = partners.filter((partner) => {
        return partner.Type.toLowerCase() === type.toLowerCase();
      });
      var cardsContainer = document.getElementById("cards");
      cardsContainer.innerHTML = "";
      filteredPartners.forEach((partner, index) => {
        var card = createCardElement(partner, index);
        cardsContainer.appendChild(card);
      });
    }
  }).catch((error) => {
    console.error("Error filtering partners by type:", error);
  });
}

// Function to search partners by name and display the filtered partners
function searchPartners(searchQuery) {
  const partnersRef = ref(db, "Partners");
  get(partnersRef).then((snapshot) => {
    if (snapshot.exists()) {
      const partners = Object.values(snapshot.val());
      const filteredPartners = partners.filter((partner) => {
        return partner.Name.toLowerCase().includes(searchQuery.toLowerCase());
      });
      var cardsContainer = document.getElementById("cards");
      cardsContainer.innerHTML = "";
      filteredPartners.forEach((partner, index) => {
        var card = createCardElement(partner, index);
        cardsContainer.appendChild(card);
      });
    }
  }).catch((error) => {
    console.error("Error searching partners:", error);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  displayPartners();
  addPartnerForm();

  // Add event listeners for filter and search
  document.getElementById("searchInput").addEventListener("input", function () {
    searchPartners(this.value);
  });
  document.getElementById("filterSelect").addEventListener("input", function () {
    filterPartnersByType(this.value);
  });
});
