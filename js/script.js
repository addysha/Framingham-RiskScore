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
    step = 1;

    // Reset the form elements to their initial values
    document.getElementById("calculator-form").reset();
    document.getElementById("calculator-form").style.display = "block";
    document.getElementById("Btns").style.display = "block";
    
    // Set the initial header text
    document.getElementById("s-Heading").innerText = "Step " + step + ": What is your gender?";
 

    // Hide the results section
    document.getElementById("results").style.display = "none";

    // Show only the "Next" button initially
    document.getElementById("prev-btn").style.display = "none";
    document.getElementById("next-btn").style.display = "inline-block";
    document.getElementById("result-btn").style.display = "none";
}

  
  
function nextStep() {
    if (step === 1) {
        if (!validateForm()) {
            return;
        }
        step++;
        getAge();
        document.getElementById("prev-btn").style.display = "inline-block"; // Show previous button from step 2 onward
    } else if (step === 2) {
        if (!validateAgeInput()) {
            return;
        }
        step++;
        getTotalCholesterol();
    } else if (step === 3) {
        if (!validateCholesterolInput()) {
            return;
        }
        step++;
        getSmoker();
    } else if (step === 4) {
        if (!validateRadioInput(document.querySelectorAll('input[name="smoker"]'))) {
            return;
        }
        step++;
        getCholesterolHDL();
    } else if (step === 5) {
        if (!validateHDLCholesterolInput()) {
            return;
        } 
        step++;
        getSystolicBP();
    }else if(step ==6){
        if(!validateSystolicBloodPressureInput() || !validateTreatedRadioInput() ){
            return;
        }
        calculateRisk();
        document.getElementById("next-btn").style.display = "none";
        document.getElementById("result-btn").style.display = "inline-block"; // Show Result button on the last step
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



// ---------------------------------------------------------------------------
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
// ---------------------------------------------------------------------------

function validateForm() {
    switch (step) {
        case 1:
            // Validation for Step 1 (Gender selection)
            if (!document.querySelector('input[name="gender"]:checked')) {
                return false;
            }
            break;
        
        case 2:
            // Validation for Step 2 (Age input)
            if (age < MIN_AGE || age > MAX_AGE) {               
                return false;
            }
            break;

        case 3:
            // Validation for Step 3 (Total cholesterol input)
            cholesterol = parseFloat(document.getElementById("total-cholesterol").value);
            if (isNaN(cholesterol) || cholesterol < MIN_CHOLESTEROL || cholesterol > MAX_CHOLESTEROL) {                
                return false;
            }
            break;

        case 4:
            // Validation for Step 4 (HDL cholesterol input)
            cholesterolHDL = parseFloat(document.getElementById("hdl-cholesterol").value);
            if (isNaN(cholesterolHDL) || cholesterolHDL < MIN_CHOLESTEROL_HDL || cholesterolHDL > MAX_CHOLESTEROL_HDL) {                
                return false;
            }
            break;

        case 5:
            // Validation for Step 5 (Systolic blood pressure input)
            systolicBloodPressure = parseFloat(document.getElementById("SystolicBP").value);
            if (isNaN(systolicBloodPressure) || systolicBloodPressure < MIN_SYSTOLIC_BLOOD_PRESSURE || systolicBloodPressure > MAX_SYSTOLIC_BLOOD_PRESSURE) {
                return false;
            }
            break;

        case 6:
            // Validation for Step 6 (Treatment status)
            treated = document.querySelector('input[name="treated"]:checked').value;
            if (treated !== "True" && treated !== "false") {              
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
    // Validate treated radio button input
    if (!validateTreatedRadioInput()) {
        return; // Stop proceeding if treated radio button input is not valid
    }

    // Implement your Framingham Risk Score calculation logic here
    // Update points, tenYearRisk, and other relevant variables
    // Display the results in the "results" section
    document.getElementById("calculator-form").style.display = "none";
    document.getElementById("Btns").style.display = "none";
    document.getElementById("results").style.display = "block";
    document.getElementById("points-span").textContent = points;
    document.getElementById("risk-span").textContent = tenYearRisk + "%";
    
}

function displayError(element, msg){               
    if (element.nextSibling.tagName === "SPAN" && element.nextSibling.textContent.trim() === msg.trim()) {
        return;                 
    }
    
    var msgElement = document.createElement("span");
    msgElement.textContent = msg;
    msgElement.style.color = "red";                 
    element.parentNode.insertBefore(msgElement, element.nextSibling);                 
    element.style.border = "solid 1px red";        
}

// Function to remove the error message and reset the element's border
function removeErrorMessage(element) {
    if (element.nextElementSibling && element.nextElementSibling.tagName === "SPAN" && element.nextElementSibling.style.color === "red") {
        element.nextElementSibling.remove();
        element.style.border = "";
    }
}


// Example validation function for number inputs
function validateNumberInput(inputElement, minValue, maxValue) {
    const value = parseFloat(inputElement.value);
    
    if (isNaN(value) || value < minValue || value > maxValue) {
        displayError(inputElement, "Please enter a valid value between " + minValue + " and " + maxValue + ".");
        return false;
    } else {
        removeErrorMessage(inputElement);
        return true;
    }
}

// Example validation function for radio buttons
function validateRadioInput(radioButtons) {
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            removeErrorMessage(radioButton);
            return true;
        }
    }
    
    displayError(radioButtons[0], "Please select an option.");
    return false;
}

// Example validation function for age input
function validateAgeInput() {
    const ageInput = document.getElementById("age");
    return validateNumberInput(ageInput, MIN_AGE, MAX_AGE);
}

// Example validation function for total cholesterol input
function validateCholesterolInput() {
    const cholesterolInput = document.getElementById("total-cholesterol");
    return validateNumberInput(cholesterolInput, MIN_CHOLESTEROL, MAX_CHOLESTEROL);
}

// Example validation function for HDL cholesterol input
function validateHDLCholesterolInput() {
    const hdlCholesterolInput = document.getElementById("hdl-cholesterol");
    return validateNumberInput(hdlCholesterolInput, MIN_CHOLESTEROL_HDL, MAX_CHOLESTEROL_HDL);
}

// Example validation function for systolic blood pressure input
function validateSystolicBloodPressureInput() {
    const systolicBPInput = document.getElementById("SystolicBP");
    return validateNumberInput(systolicBPInput, MIN_SYSTOLIC_BLOOD_PRESSURE, MAX_SYSTOLIC_BLOOD_PRESSURE);
}

// Example validation function for treated radio buttons
function validateTreatedRadioInput() {
    const treatedRadioButtons = document.querySelectorAll('input[name="treated"]');
    return validateRadioInput(treatedRadioButtons);
}

function restart() {
    

    start(); // Call the start function to reset form elements and display the initial page
    
    // Show only the first page (page1) and hide the other pages
    document.getElementById("page1").style.display = "block";
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "none";
    document.getElementById("page4").style.display = "none";
    document.getElementById("page5").style.display = "none";
    document.getElementById("page6").style.display = "none";
}
  
document.addEventListener("DOMContentLoaded", start)
document.getElementById("result-btn").addEventListener("click", calculateRisk);
document.getElementById("prev-btn").addEventListener("click", prevStep);
document.getElementById("next-btn").addEventListener("click", nextStep);
document.getElementById("restart-btn").addEventListener("click", restart);

