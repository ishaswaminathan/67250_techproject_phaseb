// ===== EXTERNAL LIBRARIES =====
// - jQuery 4.0.0: https://jquery.com
// - Leaflet.js 1.9.4: https://leafletjs.com
// - OpenStreetMap (map tiles): https://www.openstreetmap.org

/* ===== EARLY EXERCISES (COMMENTED OUT) =====

// Numeric addition
var x = 5;
var y = 7;

var z = x + y;

console.log(z);

// String concatenation
var A = "Hello ";
var B = "world!";

var C = A + B;

console.log(C);

// Basic function
function sumnPrint(x1, x2) {
    var result = x1 + x2;
    console.log(result);
}

sumnPrint(x, y);
sumnPrint(A, B);

// Conditional statement
if (C.length > z) {
    console.log(C);
} else if (C.length < z) {
    console.log(z);
} else {
    console.log("good job!");
}

// Arrays + Loops (Alerts)
var L1 = ["Watermelon", "Pineapple", "Pear", "Banana"];
var L2 = ["Apple", "Banana", "Kiwi", "Orange"];

function findTheBanana(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === "Banana") {
            alert("Banana found!");
        }
    }
}

// Using forEach
function findTheBanana(array) {
    array.forEach(function(item) {
        if (item === "Banana") {
            alert("Banana found!");
        }
    });
}

findTheBanana(L1);
findTheBanana(L2);

===== */

// ===== TIME-BASED GREETING =====
// Gets the current hour to determine the appropriate greeting on the home page

var now = new Date();
var hour = now.getHours();

// Updates the greeting element based on the time of day
// Only runs on the home page (index.html)
function greeting(x) {
    var element = document.getElementById("greeting");
    if (element && window.location.pathname.includes("index.html")) {
        if (x < 5 || x >= 20) {
            element.innerHTML = "Good Night!";
        } else if (x < 12) {
            element.innerHTML = "Good Morning!";
        } else if (x < 18) {
            element.innerHTML = "Good Afternoon!";
        } else {
            element.innerHTML = "Good Evening!";
        }
    }
}

greeting(hour);

// ===== DYNAMIC FOOTER YEAR =====
// Runs on page load to insert the current year into the footer copyright line

function addYear() {
    var year = new Date().getFullYear();
    document.getElementById("copyYear").innerHTML = "&copy; " + year + " MonoMuse. All rights reserved.";
}

// ===== ACTIVE NAVIGATION BAR =====
// Highlights the nav link that matches the current page URL

function ActiveNav() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (window.location.href === link.href) {
            link.classList.add("active");
        }
    });
}

ActiveNav();

// ===== BUY TICKETS: CALENDAR =====
// Dates that are fully booked (no tickets available)
var fullDates = [6, 12, 13, 19, 20];

// Handles date selection on the calendar
// Highlights the selected day and shows availability status
function selectDate(day) {
    console.log("selectDate called with day: " + day);

    // Remove selected styling from all days
    var allDays = document.querySelectorAll(".cal-day");
    allDays.forEach(function(d) {
        d.classList.remove("selected");
    });

    // Add selected styling to the clicked day
    allDays.forEach(function(d) {
        if (d.textContent == day) {
            d.classList.add("selected");
        }
    });

    var dateString = "April " + day + ", 2026";
    var isFull = fullDates.includes(day);

    // Update the date status title
    document.getElementById("dateStatusTitle").textContent = dateString;

    // Show full or available message based on date availability
    if (isFull) {
        document.getElementById("dateStatusText").innerHTML = "<span class='status-full'>Full</span> — No tickets available for this date.";
        document.getElementById("dateStatusBtn").style.display = "none";
    } else {
        document.getElementById("dateStatusText").innerHTML = "<span class='status-open'>Available</span> — Tickets are available!";
        document.getElementById("dateStatusBtn").style.display = "inline-block";
        document.getElementById("dateStatusBtn").setAttribute("onclick", "showForm('" + dateString + "')");
    }

    // Show the date status panel and hide the purchase form
    document.getElementById("dateStatus").className = "date-status-visible";
    document.getElementById("purchaseForm").className = "purchase-form-hidden";
}

// Reveals the purchase form and fills in the selected date
function showForm(dateString) {
    document.getElementById("purchaseForm").className = "";
    document.getElementById("selectedDate").value = dateString;
    document.getElementById("purchaseForm").scrollIntoView({ behavior: "smooth" });
}

// ===== TICKET PRICE CALCULATION =====
// All tickets cost $18 regardless of type
// Updates the total price display when ticket type or quantity changes

function updatePrice() {
    var typeEl = document.getElementById("ticketType");
    var qtyEl = document.getElementById("quantity");
    var priceDisplay = document.getElementById("priceDisplay");
    var totalEl = document.getElementById("totalPrice");

    // Only run if both elements exist on the page
    if (!typeEl || !qtyEl) return;

    var type = typeEl.value;
    var qty = parseInt(qtyEl.value);

    // Show total if a type is selected and quantity is valid
    if (type && !isNaN(qty) && qty >= 1 && qty <= 10) {
        var total = 18 * qty;
        totalEl.textContent = "$" + total.toFixed(2);
        priceDisplay.style.display = "block";
    } else {
        priceDisplay.style.display = "none";
    }
}

// ===== TICKET FORM VALIDATION AND SUBMISSION =====
// Validates all required fields with alerts
// Saves order data to sessionStorage and redirects to confirmation page

function submitForm() {
    var ticketType = document.getElementById("ticketType").value;
    var quantity = document.getElementById("quantity").value.trim();
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var zipcode = document.getElementById("zipcode").value.trim();

    var qty = parseInt(quantity);

    // Ticket type is required
    if (!ticketType) {
        alert("Please select a ticket type.");
        return;
    }

    // Quantity must be between 1 and 10
    if (!quantity || isNaN(qty) || qty < 1 || qty > 10) {
        alert("Please enter a number of tickets between 1 and 10.");
        return;
    }

    // Name is required
    if (!name) {
        alert("Please enter your name.");
        return;
    }

    // Email is required and must match standard format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        alert("Please enter your email address.");
        return;
    } else if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Zip code is optional but must be exactly 5 digits if filled in
    if (zipcode && !/^\d{5}$/.test(zipcode)) {
        alert("Zip code must be exactly 5 digits.");
        return;
    }

    // Calculate total and build order object
    var total = 18 * qty;
    var ticketTypeLabels = {
        general: "General Admission",
        student: "Student",
        member: "Member"
    };

    var orderData = {
        date: document.getElementById("selectedDate").value,
        ticketType: ticketTypeLabels[ticketType],
        quantity: qty,
        name: name,
        email: email,
        zipcode: zipcode,
        mailingList: document.getElementById("mailingList").checked,
        total: "$" + total.toFixed(2)
    };

    // Save order to sessionStorage and redirect to confirmation page
    sessionStorage.setItem("monoMuseOrder", JSON.stringify(orderData));
    window.location.href = "confirmation.html";
}

// ===== CONFIRMATION PAGE =====
// Reads order data from sessionStorage and fills in the confirmation page

function loadConfirmation() {
    var raw = sessionStorage.getItem("monoMuseOrder");
    if (!raw) return;

    var order = JSON.parse(raw);

    // Helper function to set text content of an element by id
    function set(id, val) {
        var el = document.getElementById(id);
        if (el && val !== undefined) el.textContent = val;
    }

    set("conf-date", order.date);
    set("conf-ticketType", order.ticketType);
    set("conf-quantity", order.quantity + (order.quantity === 1 ? " ticket" : " tickets"));
    set("conf-name", order.name);
    set("conf-email", order.email);
    set("conf-total", order.total);
    set("conf-email-note", order.email);

    // Show zip code row only if zip was provided
    if (order.zipcode) {
        set("conf-zip", order.zipcode);
        var zipRow = document.getElementById("conf-zip-row");
        if (zipRow) zipRow.style.display = "flex";
    }

    // Show mailing list row only if checkbox was checked
    if (order.mailingList) {
        var mailingRow = document.getElementById("conf-mailing-row");
        if (mailingRow) mailingRow.style.display = "flex";
    }
}

// ===== EVENT LISTENERS =====
// Attaches click handlers to calendar days and form buttons on page load

document.addEventListener("DOMContentLoaded", function() {

    // Attach click handler to each calendar day
    var allDays = document.querySelectorAll(".cal-day");
    allDays.forEach(function(d) {
        d.addEventListener("click", function() {
            selectDate(parseInt(d.textContent));
        });
    });

    // Attach click handler to Buy Now button
    var buyBtn = document.getElementById("dateStatusBtn");
    if (buyBtn) {
        buyBtn.onclick = function() {
            showForm();
        };
    }

    // Attach click handler to Place Order button
    var subBtn = document.getElementById("submitBtn");
    if (subBtn) {
        subBtn.onclick = function() {
            submitForm();
        };
    }
});

// ===== READ MORE / READ LESS TOGGLE (jQuery) =====
// Shows or hides the extended intro text on the home page

// Show long intro and hide Read More button
$("#readMore").click(function(){
    $("#longIntro").show();
    $("#readLess").show();
    $("#readMore").hide();
});

// Hide long intro and show Read More button
$("#readLess").click(function(){
    $("#longIntro").hide();
    $("#readLess").hide();
    $("#readMore").show();
});

// ===== HAMBURGER MENU TOGGLE =====
// Adds or removes the responsive class on the navbar for mobile navigation

function toggleMenu() {
    var nav = document.getElementById("navbar");
    nav.classList.toggle("responsive");
}

// ===== LEAFLET MAP =====
// Initializes the interactive map on the home page using OpenStreetMap tiles
// Only runs if the map container exists on the page

var mapElement = document.getElementById("map");
if (mapElement) {
    var map = L.map('map').setView([40.4466, -79.9922], 15);

    // Load map tiles from OpenStreetMap
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add a marker at the museum location with a popup
    L.marker([40.4466, -79.9922]).addTo(map)
        .bindPopup('1212 Smallman St, Pittsburgh, PA 15222')
        .openPopup();
}

// ===== DONATION FORM VALIDATION AND SUBMISSION =====
// Validates donation form fields with alerts
// Saves donation data to sessionStorage and redirects to thank you page

function submitDonation() {
    var name = document.getElementById("donorName").value.trim();
    var email = document.getElementById("donorEmail").value.trim();
    var type = document.getElementById("donationType").value;
    var amount = document.getElementById("donationAmount").value.trim();

    // Name is required
    if (!name) { alert("Please enter your name."); return; }

    // Email is required and must be valid format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) { alert("Please enter your email."); return; }
    if (!emailRegex.test(email)) { alert("Please enter a valid email."); return; }

    // Contribution type is required
    if (!type) { alert("Please select a contribution type."); return; }

    // Amount must be a positive number
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    // Save donation data to sessionStorage and redirect to thank you page
    sessionStorage.setItem("monoMuseDonation", JSON.stringify({
        name: name, email: email, type: type,
        amount: "$" + parseFloat(amount).toFixed(2)
    }));
    window.location.href = "thankyou.html";
}

// ===== THANK YOU PAGE =====
// Reads donation data from sessionStorage and fills in the thank you page

function loadDonation() {
    var raw = sessionStorage.getItem("monoMuseDonation");
    if (!raw) return;
    var data = JSON.parse(raw);

    // Helper function to set text content of an element by id
    function set(id, val) {
        var el = document.getElementById(id);
        if (el && val !== undefined) el.textContent = val;
    }

    set("don-name", data.name);
    set("don-email", data.email);
    set("don-type", data.type);
    set("don-amount", data.amount);
}

// ===== SLIDESHOW =====
// Controls the interactive image gallery on the explore page
// Tracks the current slide index and updates active class on slides and dots

var currentSlide = 0;

// Navigates to a specific slide by index
function goToSlide(n) {
    var slides = document.querySelectorAll(".slide");
    var dots = document.querySelectorAll(".dot");
    if (!slides.length) return;

    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    // Wrap around if at the beginning or end
    currentSlide = (n + slides.length) % slides.length;

    // Add active class to new slide and dot
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
}

// Moves forward or backward by one slide
function changeSlide(direction) {
    goToSlide(currentSlide + direction);
}
