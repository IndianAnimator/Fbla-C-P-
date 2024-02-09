document.addEventListener("DOMContentLoaded", function() {

  var partners = [
    { name: "XYZ Corp", type: "Corporation", resources: "Financial support", contactPerson: "John Doe", email: "john.doe@example.com", phone: "470-555-1234" },
    { name: "ABC Foundation", type: "Non-profit", resources: "Volunteer opportunities", contactPerson: "Jane Smith", email: "jane.smith@example.com", phone: "470-555-5678" },
    { name: "Tech Innovators Inc.", type: "Corporation", resources: "Technology solutions", contactPerson: "Mark Johnson", email: "mark.johnson@example.com", phone: "555-9876" },
    { name: "Community Builders Network", type: "Non-profit", resources: "Community development", contactPerson: "Sarah Brown", email: "sarah.brown@example.com", phone: "470-555-4321" },
    { name: "Green Energy Solutions", type: "Corporation", resources: "Renewable energy initiatives", contactPerson: "Michael Green", email: "michael.green@example.com", phone: "470-555-8765" },
    { name: "Education Enrichment Foundation", type: "Non-profit", resources: "Educational programs", contactPerson: "David Taylor", email: "david.taylor@example.com", phone: "470-555-3456" },
    { name: "Innovate Tech Hub", type: "Corporation", resources: "Tech innovation support", contactPerson: "Emily White", email: "emily.white@example.com", phone: "470-555-6543" },
    { name: "Healthcare Heroes Foundation", type: "Non-profit", resources: "Healthcare initiatives", contactPerson: "Chris Miller", email: "chris.miller@example.com", phone: "470-555-7890" },
    { name: "Financial Wizards Inc.", type: "Corporation", resources: "Financial consulting", contactPerson: "Amanda Turner", email: "amanda.turner@example.com", phone: "470-555-2109" },
    { name: "Cultural Harmony Society", type: "Non-profit", resources: "Cultural exchange programs", contactPerson: "Kevin Lee", email: "kevin.lee@example.com", phone: "470-555-9012" },
    { name: "Infinite Innovations", type: "Corporation", resources: "Innovation support", contactPerson: "Rachel Adams", email: "rachel.adams@example.com", phone: "470-555-1122" },
    { name: "Green Earth Foundation", type: "Non-profit", resources: "Environmental conservation", contactPerson: "Daniel Moore", email: "daniel.moore@example.com", phone: "470-555-3344" },
    { name: "EduTech Solutions", type: "Corporation", resources: "Educational technology", contactPerson: "Laura Davis", email: "laura.davis@example.com", phone: "470-555-5566" },
    { name: "Arts and Culture Alliance", type: "Non-profit", resources: "Promoting arts and culture", contactPerson: "Brian Wilson", email: "brian.wilson@example.com", phone: "470-555-7788" },
    { name: "Global Health Initiative", type: "Corporation", resources: "Global health support", contactPerson: "Olivia Harris", email: "olivia.harris@example.com", phone: "470-555-9900" },
    { name: "Youth Empowerment Network", type: "Non-profit", resources: "Youth development programs", contactPerson: "Matthew Turner", email: "matthew.turner@example.com", phone: "470-555-1122" },
    { name: "TechSavvy Solutions", type: "Corporation", resources: "Technology consulting", contactPerson: "Sophie Martin", email: "sophie.martin@example.com", phone: "470-555-3344" },
    { name: "Nature Conservation Society", type: "Non-profit", resources: "Nature conservation projects", contactPerson: "Adam Brown", email: "adam.brown@example.com", phone: "470-555-5566" },
    { name: "Financial Freedom Advisors", type: "Corporation", resources: "Financial planning services", contactPerson: "Ella Thompson", email: "ella.thompson@example.com", phone: "470-555-7788" },
    { name: "Empower Women Foundation", type: "Non-profit", resources: "Women's empowerment programs", contactPerson: "Lucas Miller", email: "lucas.miller@example.com", phone: "470-555-9900" },
    { name: "Innovative Design Studios", type: "Corporation", resources: "Creative design solutions", contactPerson: "Natalie Clark", email: "natalie.clark@example.com", phone: "470-555-1122" },
    { name: "Community Wellness Network", type: "Non-profit", resources: "Wellness and health programs", contactPerson: "William Turner", email: "william.turner@example.com", phone: "470-555-3344" }
  ]
  // Function to display partners
  function displayPartners(partners) {
    var cardsContainer = document.getElementById("cards");
    cardsContainer.innerHTML = ""; // Clear existing content

    partners.forEach(function(partner, index) {
      var card = createCardElement(partner, index);
      cardsContainer.appendChild(card);
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
    var details = ["name", "type", "resources", "contactPerson", "email", "phone"];
    details.forEach(function(detail) {
      var label = document.createElement("p");
      label.className = "card-text";
      label.innerHTML = "<strong>" + detail.charAt(0).toUpperCase() + detail.slice(1) + ": </strong>" + partner[detail];
      cardContent.appendChild(label);
    });

    card.appendChild(cardContent);
    return card;
  }
  function isFilteringOrSearching() {
    var searchInput = document.getElementById("searchInput");
    var filterSelect = document.getElementById("filterSelect");

    return (
      searchInput.value.trim() !== "" ||
      filterSelect.value !== ""
    );
  }

  function filterPartners() {
    var filterSelect = document.getElementById("filterSelect");
    var selectedType = filterSelect.value;

    var filteredPartners = partners.filter(function(partner) {
      return selectedType === "" || partner.type === selectedType;
    });

    displayPartners(filteredPartners);
  }

  function searchPartners() {
    var searchInput = document.getElementById("searchInput");
    var searchQuery = searchInput.value.toLowerCase();

    var searchedPartners = partners.filter(function(partner) {
      return partner.name.toLowerCase().includes(searchQuery);
    });

    displayPartners(searchedPartners);
  }

  function addPartner(partner) {
    partners.push(partner); // Add the new partner to the array
    displayPartners(partners); // Update the display with the new partner added
  }


  function addPartnerForm() {
    var formContainer = document.getElementById("addPartnerFormContainer");
    formContainer.innerHTML = ""; // Clear existing content

    var form = document.createElement("form");
    form.className = "add-partner-form";

    var titleLabel = document.createElement("h2");
    titleLabel.textContent = "Add Partner";
    form.appendChild(titleLabel);

    var inputFields = [
      { label: "Name:", type: "text", name: "name" },
      { label: "Type:", type: "select", name: "type", options: ["Corporation", "Non-profit", "Microbusiness", "Franchise", "Partnership"] },
      { label: "Resources:", type: "text", name: "resources" },
      { label: "Contact Person:", type: "text", name: "contactPerson" },
      { label: "Email:", type: "email", name: "email" },
      { label: "Phone:", type: "tel", name: "phone" }
    ];

    inputFields.forEach(function(field) {
      var fieldContainer = document.createElement("div");
      fieldContainer.className = "input-container";

      var label = document.createElement("label");
      label.className = "form-label";
      label.textContent = field.label;

      var input;
      if (field.type === "select") {
        input = document.createElement("select");
        input.className = "form-input";
        input.setAttribute("name", field.name);
        field.options.forEach(function(option) {
          var optionElem = document.createElement("option");
          optionElem.textContent = option;
          input.appendChild(optionElem);
        });
      } else {
        input = document.createElement("input");
        input.className = "form-input";
        input.setAttribute("type", field.type);
        input.setAttribute("name", field.name);
      }

      fieldContainer.appendChild(label);
      fieldContainer.appendChild(input);
      form.appendChild(fieldContainer);
    });

    var submitButton = document.createElement("button");
    submitButton.className = "submit-button";
    submitButton.textContent = "Add Partner";
    submitButton.addEventListener("click", function(event) {
      event.preventDefault();
      var partner = {
        name: form.elements.name.value,
        type: form.elements.type.value,
        resources: form.elements.resources.value,
        contactPerson: form.elements.contactPerson.value,
        email: form.elements.email.value,
        phone: form.elements.phone.value
      };
      addPartner(partner);
      form.reset();
    });

    form.appendChild(submitButton);
    formContainer.appendChild(form);
  }
  // Display the add partner form
  addPartnerForm();

  // Display partners on page load
  displayPartners(partners);

  // Add event listeners for filter and search
  document.getElementById("filterSelect").addEventListener("change", filterPartners);
  document.getElementById("searchInput").addEventListener("input", searchPartners);
});