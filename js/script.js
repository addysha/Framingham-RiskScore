const MIN_AGE = 20;
const MAX_AGE = 79;
const MIN_CHOLESTEROL = 0;
const MAX_CHOLESTEROL = 500;
const MIN_CHOLESTEROL_HDL = 0;
const MAX_CHOLESTEROL_HDL = 200;
const MIN_SYSTOLIC_BLOOD_PRESSURE = 0;
const MAX_SYSTOLIC_BLOOD_PRESSURE = 300;
const pages = ["page1", "page2", "page3", "page4", "page5", "page6"];

var currentPageIndex;
var gender;
var age;
var cholesterol;
var cigareteSmoker;
var cholesterolHDL;
var systolicBloodPressure;
var treated;
var tenYearRisk;
var points;
var step;



function start() {
    points = 0;
    step =1;

    document.getElementById("calculator-form").reset();
    document.getElementById("calculator-form").style.display = "block";
   
    document.getElementById("results").style.display = "none";

    // Show only the "Next" button initially
    document.getElementById("prev-btn").style.display = "none";
    document.getElementById("next-btn").style.display = "inline-block";
    document.getElementById("result-btn").style.display = "none";

    
}
  
  
function nextStep() {
    if (step == 1) {
        step++;
        getAge();
        document.getElementById("prev-btn").style.display = "inline-block"; // Show previous button from step 2 onward
    } else if (step == 2) {
        step++;
        getTotalCholesterol();
    } else if (step == 3) {
        step++;
        getSmoker();
    } else if (step == 4) {
        step++;
        getCholesterolHDL();
    } else if (step == 5) {
        step++;
        getSystolicBP();
        document.getElementById("next-btn").style.display = "none";
        document.getElementById("result-btn").style.display = "inline-block" // Hide next button on the last step
    }
    document.getElementById("prev-btn").style.display = "inline-block"; // Show previous button for steps 2 and onward
}

function prevStep() {
    if (step == 2) {
        step--;
        document.getElementById("s-Heading").innerText = "Step " + step + ": What is your gender?";
        document.getElementById("page1").style.display = "block"; // Show previous question
        document.getElementById("page2").style.display = "none"; // Hide current question
        document.getElementById("prev-btn").style.display = "none"; // Hide previous button on step 1
    } else if (step == 3) {
        step--;
        document.getElementById("s-Heading").innerText = "Step " + step + ": What is your age?";
        document.getElementById("page2").style.display = "block"; // Show previous question
        document.getElementById("page3").style.display = "none"; // Hide current question
    } else if (step == 4) {
        step--;
        document.getElementById("s-Heading").innerText = "Step " + step + ": What is your total cholesterol?";
        document.getElementById("page3").style.display = "block"; // Show previous question
        document.getElementById("page4").style.display = "none"; // Hide current question
    } else if (step == 5) {
        step--;
        document.getElementById("s-Heading").innerText = "Step " + step + ": Are you a smoker?";
        document.getElementById("page4").style.display = "block"; // Show previous question
        document.getElementById("page5").style.display = "none"; // Hide current question
        document.getElementById("next-btn").style.display = "inline-block"; // Show next button when going back from step 6
    } else if (step == 6) {
        step--;
        document.getElementById("s-Heading").innerText = "Step " + step + ": What is your HDL Cholesterol?";
        document.getElementById("page5").style.display = "block"; // Show previous question
        document.getElementById("page6").style.display = "none"; // Hide current question
        document.getElementById("next-btn").style.display = "inline-block"; // Show next button when going back from step 6
    }
    document.getElementById("result-btn").style.display = "none"; // Hide the Results button
}



function getAge(){
    document.getElementById("s-Heading").innerText = "Step " + step + ": What is your age?";

    document.getElementById("page2").style.display = "block"; // Show current question
    document.getElementById("page1").style.display = "none"; // Hide previous question
    document.getElementById("page3").style.display = "none"; // Hide next question
}

function getTotalCholesterol(){
    document.getElementById("s-Heading").innerText = "Step " + step + ": What is your total cholesterol";

    document.getElementById("page3").style.display = "block"; // Show current question
    document.getElementById("page2").style.display = "none"; // Hide previous question
    document.getElementById("page4").style.display = "none"; // Hide next question
}

function getSmoker(){
    document.getElementById("s-Heading").innerText = "Step " + step + ": Are you a smoker?";

    document.getElementById("page4").style.display = "block"; // Show current question
    document.getElementById("page3").style.display = "none"; // Hide previous question
    document.getElementById("page5").style.display = "none"; // Hide next question
}

function getCholesterolHDL(){
    document.getElementById("s-Heading").innerText = "Step " + step + ": What is your HDL Cholesterol";

    document.getElementById("page5").style.display = "block"; // Show current question
    document.getElementById("page4").style.display = "none"; // Hide previous question
    document.getElementById("page6").style.display = "none"; // Hide next question
}

function getSystolicBP(){
    document.getElementById("s-Heading").innerText = "Step " + step + ": What is your Systolic BP";

    document.getElementById("page6").style.display = "block"; // Show current question
    document.getElementById("page5").style.display = "none"; // Hide previous question
}


function validateForm() {
    switch (step) {
        case 1:
            // Validation for Step 1 (Gender selection)
            if (!document.querySelector('input[name="gender"]:checked')) {
                alert("Please select a gender.");
                return false;
            }
            break;
        
        case 2:
            // Validation for Step 2 (Age input)
            if (age < MIN_AGE || age > MAX_AGE) {
                alert("Please enter a valid age between " + MIN_AGE + " and " + MAX_AGE + ".");
                return false;
            }
            break;

        case 3:
            // Validation for Step 3 (Total cholesterol input)
            cholesterol = parseFloat(document.getElementById("total-cholesterol").value);
            if (isNaN(cholesterol) || cholesterol < MIN_CHOLESTEROL || cholesterol > MAX_CHOLESTEROL) {
                alert("Please enter a valid total cholesterol value.");
                return false;
            }
            break;

        case 4:
            // Validation for Step 4 (HDL cholesterol input)
            cholesterolHDL = parseFloat(document.getElementById("hdl-cholesterol").value);
            if (isNaN(cholesterolHDL) || cholesterolHDL < MIN_CHOLESTEROL_HDL || cholesterolHDL > MAX_CHOLESTEROL_HDL) {
                alert("Please enter a valid HDL cholesterol value.");
                return false;
            }
            break;

        case 5:
            // Validation for Step 5 (Systolic blood pressure input)
            systolicBloodPressure = parseFloat(document.getElementById("SystolicBP").value);
            if (isNaN(systolicBloodPressure) || systolicBloodPressure < MIN_SYSTOLIC_BLOOD_PRESSURE || systolicBloodPressure > MAX_SYSTOLIC_BLOOD_PRESSURE) {
                alert("Please enter a valid systolic blood pressure value.");
                return false;
            }
            break;

        case 6:
            // Validation for Step 6 (Treatment status)
            treated = document.querySelector('input[name="treated"]:checked').value;
            if (treated !== "True" && treated !== "false") {
                alert("Please select whether you have been treated.");
                return false;
            }
            break;

        default:
            // If no specific validation needed for the current step, return true
            return true;
    }
    
    // If all validation passes for the current step, return true
    return true;
}
  
function getGender() {
    gender = document.querySelector('input[name="gender"]:checked').value;
}
  
function AgeSetUp() {
    age = parseInt(document.getElementById("age").value);
}
  
function maleSetUp() {
    gender = "male";
}
  
function FemaleSetUp() {
    gender = "female";
}
  
function calculateRisk() {
    // Implement your Framingham Risk Score calculation logic here
    // Update points, tenYearRisk, and other relevant variables
    // Display the results in the "results" section
    document.getElementById("calculator-form").style.display = "none";
    document.getElementById("Btns").style.display = "none";
    document.getElementById("results").style.display = "block";
    document.getElementById("points-span").textContent = points;
    document.getElementById("risk-span").textContent = tenYearRisk + "%";
}

  
document.addEventListener("DOMContentLoaded", start);
// document.getElementById("next-btn").addEventListener("click", nextStep);
// document.getElementById("prev-btn").addEventListener("click", prevStep);
start();