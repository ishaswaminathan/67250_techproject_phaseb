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
var now = new Date();
var hour = now.getHours();

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

// Dymanic Footer Yeat (All Pages)

function addYear() {
    var year = new Date().getFullYear();
    document.getElementById("copyYear").innerHTML = "&copy; " + year + " MonoMuse. All rights reserved.";
}