import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  child,
  get,
  update,
  remove,
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

// Function to fetch partners data from Firebase and display them
function displayPartners() {
  var cardsContainer = document.getElementById("cards");
  cardsContainer.innerHTML =
    "<span class = 'error' >Partners are being Loaded......<span>";

  const partnersRef = ref(db, "Partners");
  get(partnersRef)
    .then((snapshot) => {
      cardsContainer.innerHTML = "";
      if (snapshot.exists()) {
        const partners = Object.values(snapshot.val());
        console.log(partners);
        partners.forEach(function (partner, index) {
          var card = createCardElement(partner, index);
          cardsContainer.appendChild(card);
        });
      }
    })
    .catch((error) => {
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
  var details = [
    "Name",
    "Type",
    "Resources",
    "ContactPerson",
    "Email",
    "Phone",
  ];
  details.forEach(function (detail) {
    var label = document.createElement("p");
    label.className = "card-text";
    label.innerHTML = "<strong>" + detail + ": </strong>" + partner[detail];
    cardContent.appendChild(label);
  });

  // add delete button (with trash icon)
  var deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.innerHTML = "Delete";

  deleteButton.addEventListener("click", function () {
    var card = document.getElementById("card-" + index);
    var name = card
      .querySelector(".card-text")
      .textContent.split(":")[1]
      .trim();
    deletePartner(name);
    card.remove();
  });

  cardContent.appendChild(deleteButton);

  card.appendChild(cardContent);
  return card;
}

// Function to filter partners by type and display the filtered partners
function filterPartnersByType(type) {
  const partnersRef = ref(db, "Partners");
  get(partnersRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const partners = Object.values(snapshot.val());

        const filteredPartners = partners.filter((partner) => {
          return partner.Type.toLowerCase() === type.toLowerCase();
        });
        if (type === "All") {
          displayPartners();
          return;
        }

        var cardsContainer = document.getElementById("cards");
        cardsContainer.innerHTML = "";
        filteredPartners.forEach((partner, index) => {
          var card = createCardElement(partner, index);
          cardsContainer.appendChild(card);
        });
        if (filteredPartners.length === 0) {
          cardsContainer.innerHTML =
            "<span class = 'error' >No Partners Found!<span>";
        }
      }
    })
    .catch((error) => {
      console.error("Error filtering partners by type:", error);
    });
}

// Function to search partners by name and display the filtered partners
function searchPartners(searchQuery) {
  const partnersRef = ref(db, "Partners");
  get(partnersRef)
    .then((snapshot) => {
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
        if (filteredPartners.length === 0) {
          cardsContainer.innerHTML =
            "<span class = 'error' >No Partners Found!<span>";
        }
      }
    })
    .catch((error) => {
      console.error("Error searching partners:", error);
    });
}

function deletePartner(name) {
  const partnersRef = ref(db, "Partners");
  get(partnersRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const partners = snapshot.val();
        if (partners[name]) {
          remove(ref(db, "Partners/" + name), name)
            .then(() => {
              console.log("Deleted partner:", name);
            })
            .catch((error) => {
              console.error("Error deleting partner:", error);
            });
        }
      }
    })
    .catch((error) => {
      console.error("Error deleting partner:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  displayPartners();

  // Add event listeners for filter and search
  document.getElementById("searchInput").addEventListener("input", function () {
    searchPartners(this.value);
  });
  document
    .getElementById("filterSelect")
    .addEventListener("input", function () {
      filterPartnersByType(this.value);
    });
});
