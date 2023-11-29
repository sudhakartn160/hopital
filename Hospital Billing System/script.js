function login() {
    var userType = document.getElementById("userType").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (userType === "doctor" && username === "doctorUser" && password === "doctorPass") {
        alert("Doctor Login Successful");
        window.location.href = "invoice.html"; // Redirect to the invoice page
    } else if (userType === "staff" && username === "staffUser" && password === "staffPass") {
        alert("Staff Login Successful");
        window.location.href = "invoice.html"; // Redirect to the invoice page
    } else {
        alert("Invalid credentials");
    }
}

function addService() {
    var servicesContainer = document.getElementById("servicesContainer");

    // Create a new service container
    var newServiceContainer = document.createElement("div");
    newServiceContainer.className = "service";

    // Create a service type dropdown
    var serviceTypeDropdown = document.createElement("select");
    serviceTypeDropdown.className = "serviceType";
    serviceTypeDropdown.name = "serviceType";
    serviceTypeDropdown.required = true;
    var serviceTypes = ["consultation", "bloodTest", "xRay", "ultrasound", "medication"];
    serviceTypes.forEach(function (type) {
        var option = document.createElement("option");
        option.value = type;
        option.text = type.charAt(0).toUpperCase() + type.slice(1); // Capitalize the first letter
        serviceTypeDropdown.add(option);
    });

    // Create a service amount input field
    var serviceAmountInput = document.createElement("input");
    serviceAmountInput.className = "serviceAmount";
    serviceAmountInput.type = "number";
    serviceAmountInput.name = "serviceAmount";
    serviceAmountInput.placeholder = "Amount";
    serviceAmountInput.required = true;

    // Append the dropdown and input to the new service container
    newServiceContainer.appendChild(serviceTypeDropdown);
    newServiceContainer.appendChild(serviceAmountInput);

    // Append the new service container to the services container
    servicesContainer.appendChild(newServiceContainer);
}

function calculateAmount() {
    var serviceContainers = document.querySelectorAll(".service");
    var totalAmount = 0;

    serviceContainers.forEach(function (serviceContainer) {
        var serviceType = serviceContainer.querySelector(".serviceType").value;
        var serviceAmount = parseFloat(serviceContainer.querySelector(".serviceAmount").value) || 0;

        // Example costs for services
        var serviceCosts = {
            consultation: 500,
            bloodTest: 1200,
            xRay: 2000,
            ultrasound: 3000,
            medication: 500,
            minorsurgery:20000,
            majorsurgery:50000,
        };

        // Calculate total amount for each service
        totalAmount += serviceAmount * serviceCosts[serviceType];
    });

    // Display the calculated amount
    document.getElementById("totalAmount").value = totalAmount.toFixed(2);
}

function generateInvoice() {
    var patientName = document.getElementById("patientName").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var doctorName = document.getElementById("doctorName").value;
    var totalAmount = document.getElementById("totalAmount").value;

    // Validate inputs
    if (!patientName || !phoneNumber || !doctorName || !totalAmount) {
        alert("Please fill in all the fields and calculate the total amount");
        return;
    }

    // Generate invoice HTML
    var servicesContainers = document.querySelectorAll(".service");
    var servicesHTML = Array.from(servicesContainers).map(function (serviceContainer) {
        var serviceType = serviceContainer.querySelector(".serviceType").value;
        var serviceAmount = parseFloat(serviceContainer.querySelector(".serviceAmount").value) || 0;

        return `<p><strong>${serviceType}:</strong> ${serviceAmount.toFixed(3)}</p>`;
    }).join('');

    var invoiceHTML = `
        <h2>Invoice</h2>
        <p><strong>Patient Name:</strong> ${patientName}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Doctor Name:</strong> ${doctorName}</p>
        <p><strong>Services:</strong></p>
        ${servicesHTML}
        <p><strong>Total Amount:</strong> Rs.${totalAmount}</p>
    `;

    // Display the invoice
    var invoiceOutput = document.getElementById("invoiceOutput");
    invoiceOutput.innerHTML = invoiceHTML;
}
