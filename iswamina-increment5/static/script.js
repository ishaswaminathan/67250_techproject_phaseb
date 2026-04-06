/*
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

*/

// Increment 3: Time-Based Greeting
// Gets the current hour to determine the appropriate greeting
var now = new Date();
var hour = now.getHours();

// Displays a greeting based on the time of day (only on the home page)
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

// Dynamic Footer Year (All Pages)
// Updates the footer with the current year automatically
function addYear() {
    var year = new Date().getFullYear();
    document.getElementById("copyYear").innerHTML = "&copy; " + year + " MonoMuse. All rights reserved.";
}

// Increment 4: Active Navigation Bar
// Highlights the current page link in the navigation
function ActiveNav() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (window.location.href === link.href) {
            link.classList.add("active");
        }
    });
}

ActiveNav();

// Increment 4: Buy Tickets Calendar and Form
// Array of dates that are fully booked
var fullDates = [6, 12, 13, 19, 20];

// Handles date selection on the calendar
function selectDate(day) {
    console.log("selectDate called with day: " + day);

    // Remove selected state from all days
    var allDays = document.querySelectorAll(".cal-day");
    allDays.forEach(function(d) {
        d.classList.remove("selected");
    });

    // Add selected state to clicked day
    allDays.forEach(function(d) {
        if (d.textContent == day) {
            d.classList.add("selected");
        }
    });

    var dateString = "April " + day + ", 2026";
    var isFull = fullDates.includes(day);

    document.getElementById("dateStatusTitle").textContent = dateString;

    // Show availability status based on whether date is full
    if (isFull) {
        document.getElementById("dateStatusText").innerHTML = "<span class='status-full'>Full</span> — No tickets available for this date.";
        document.getElementById("dateStatusBtn").style.display = "none";
    } else {
        document.getElementById("dateStatusText").innerHTML = "<span class='status-open'>Available</span> — Tickets are available!";
        document.getElementById("dateStatusBtn").style.display = "inline-block";
        document.getElementById("dateStatusBtn").setAttribute("onclick", "showForm('" + dateString + "')");
    }

    document.getElementById("dateStatus").className = "date-status-visible";
    document.getElementById("purchaseForm").className = "purchase-form-hidden";
}

// Reveals the purchase form and sets the selected date
function showForm(dateString) {
    document.getElementById("purchaseForm").className = "";
    document.getElementById("selectedDate").value = dateString;
    document.getElementById("purchaseForm").scrollIntoView({ behavior: "smooth" });
}

// Validates and submits the ticket form
function submitForm() {
    var form = document.getElementById("ticketForm");
    if (form.checkValidity()) {
        alert("Redirecting to payment system.");
    } else {
        form.reportValidity();
    }
}

// Event listeners for calendar days, Buy Now button, and submit button
document.addEventListener("DOMContentLoaded", function() {
    var allDays = document.querySelectorAll(".cal-day");
    allDays.forEach(function(d) {
        d.addEventListener("click", function() {
            selectDate(parseInt(d.textContent));
        });
    });

    var buyBtn = document.getElementById("dateStatusBtn");
    if (buyBtn) {
        buyBtn.onclick = function() {
            showForm();
        };
    }

    var subBtn = document.getElementById("submitBtn");
    if (subBtn) {
        subBtn.onclick = function() {
            submitForm();
        };
    }
});

// Increment 4: Read More / Read Less Toggle (jQuery)
// Shows the long intro and hides Read More button
$("#readMore").click(function(){
    $("#longIntro").show();
    $("#readLess").show();
    $("#readMore").hide();
});

// Hides the long intro and shows Read More button
$("#readLess").click(function(){
    $("#longIntro").hide();
    $("#readLess").hide();
    $("#readMore").show();
});

// Increment 5: Hamburger Menu Toggle
// Toggles the responsive class on the navbar for mobile navigation
function toggleMenu() {
    var nav = document.getElementById("navbar");
    nav.classList.toggle("responsive");
}

// Increment 5: Leaflet Map
// Initializes the map only on pages that have the map container
var mapElement = document.getElementById("map");
if (mapElement) {
    var map = L.map('map').setView([40.4466, -79.9922], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([40.4466, -79.9922]).addTo(map)
        .bindPopup('MonoMuse')
        .openPopup();
}