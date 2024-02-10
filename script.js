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

var enterName = document.querySelector("#partnerName");
var enterType = document.querySelector("#partnerType");
var enterResources = document.querySelector("#partnerResources");
var enterContactPerson = document.querySelector("#partnerContactPerson");
var enterEmail = document.querySelector("#partnerEmail");
var enterPhone = document.querySelector("#partnerPhone");

var insertBtn = document.querySelector("#addPartner");


// Function to display the add partner form
function addPartnerForm() {
  set(ref(db, "Partners/" +  enterName.value),{
    Name: enterName.value,
    Type: enterType.value,
    Resources: enterResources.value,
    ContactPerson: enterContactPerson.value,
    Email: enterEmail.value,
    Phone: enterPhone.value
  })
  .then(()=>{
      alert("Data added successfully");
  })
  .catch((error)=>{
      alert(error);
  });
}

// Function to display partners
function displayPartners(partners) {
  // your display function
  const dbref = ref(db);

  get(child(dbref, "partners/"))

}

// Function to filter partners by type
function filterPartners() {
  // your filter function
}

// Function to search partners by name
function searchPartners() {
  const dbref = ref(db);

  get(child(dbref, "Partners/" + findName.value))
  .then((snapshot)=>{
      if(snapshot.exists()){
          findName.innerHTML = "Name: " + snapshot.val().Name;
          findType.innerHTML = "Age: " + snapshot.val().Type;
          findEmail.innerHTML = "Email: " + snapshot.val().Email;
          findPhone.innerHTML = "Phone: " + snapshot.val().Phone;
          findContactPerson.innerHTML = "Contact Person: " + snapshot.val().ContactPerson;
          findResources.innerHTML = "Resources: " + snapshot.val().Resources;
      } else {
          alert("No data found");
      }
  })
  .catch((error)=>{
      alert(error)
  })
}

// Display the add partner form
addPartnerForm();

// Add event listeners for filter and search
document.getElementById("filterSelect").addEventListener("change", filterPartners);
document.getElementById("searchInput").addEventListener("input", searchPartners);