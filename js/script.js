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
var isMale = false;



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
        const totalPoints = calculateTotalPoints();
        const riskPercentage = calculateRisk(totalPoints);


        document.getElementById("next-btn").style.display = "none";
        document.getElementById("result-btn").style.display = "inline-block"; // Show Result button on the last step

        // Display results
        document.getElementById("calculator-form").style.display = "none";
        document.getElementById("Btns").style.display = "none";
        document.getElementById("results").style.display = "block";
        document.getElementById("points-span").textContent = totalPoints;
        document.getElementById("risk-span").textContent = riskPercentage;
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
    isMale = true;
    
}
  
function FemaleSetUp() {
    isMale = false;
    
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
//This is fine it works
function calculateTotalPoints() {
    const age = parseInt(document.getElementById("age").value);
    const totalCholesterol = parseInt(document.getElementById("total-cholesterol").value);
    const isSmoker = document.querySelector('input[name="smoker"]:checked').value === "True";
    const hdlCholesterol = parseInt(document.getElementById("hdl-cholesterol").value);
    const systolicBP = parseInt(document.getElementById("SystolicBP").value);
    const isTreated = document.querySelector('input[name="treated"]:checked').value === "True";
    const isMale = document.querySelector('input[name="gender"]:checked').value === "male";

    const agePoints = calculateAgePoints(age, isMale);
    const cholesterolPoints = calculateTotalCholesterolPoints(age, totalCholesterol, isMale);
    const smokerPoints = calculateSmokerPoints(isSmoker, age, isMale);
    const hdlPoints = calculateHDLPoints(hdlCholesterol, isMale);
    const systolicBPPoints = calculateSystolicBPPoints(systolicBP, isTreated, isMale);

    const totalPoints = agePoints + cholesterolPoints + smokerPoints + hdlPoints + systolicBPPoints;
    return totalPoints;
}
//This is fine it works as well
function calculateSystolicBPPoints(systolicBP, isTreated, isMale) {
    let points = 0;

    if (isMale) {
        if (!isTreated) {
            if (systolicBP < 120) {
                points += 0;
            } else if (systolicBP >= 120 && systolicBP <= 129) {
                points += 0;
            } else if (systolicBP >= 130 && systolicBP <= 139) {
                points += 1;
            } else if (systolicBP >= 140 && systolicBP <= 159) {
                points += 1;
            } else if (systolicBP >= 160) {
                points += 2;
            }
        } else { // Treated
            if (systolicBP < 120) {
                points += 0;
            } else if (systolicBP >= 120 && systolicBP <= 129) {
                points += 1;
            } else if (systolicBP >= 130 && systolicBP <= 139) {
                points += 2;
            } else if (systolicBP >= 140 && systolicBP <= 159) {
                points += 2;
            } else if (systolicBP >= 160) {
                points += 3;
            }
        }
    } else { // Female
        if (!isTreated) {
            if (systolicBP < 120) {
                points += 0;
            } else if (systolicBP >= 120 && systolicBP <= 129) {
                points += 1;
            } else if (systolicBP >= 130 && systolicBP <= 139) {
                points += 2;
            } else if (systolicBP >= 140 && systolicBP <= 159) {
                points += 3;
            } else if (systolicBP >= 160) {
                points += 4;
            }
        } else { // Treated
            if (systolicBP < 120) {
                points += 0;
            } else if (systolicBP >= 120 && systolicBP <= 129) {
                points += 3;
            } else if (systolicBP >= 130 && systolicBP <= 139) {
                points += 4;
            } else if (systolicBP >= 140 && systolicBP <= 159) {
                points += 5;
            } else if (systolicBP >= 160) {
                points += 6;
            }
        }
    }

    return points;
}

//This also works
function calculateHDLPoints(hdlCholesterol, isMale) {
    let points = 0;

    if (isMale) {
        if (hdlCholesterol >= 60) {
            points -= 1;
        } else if (hdlCholesterol >= 50 && hdlCholesterol <= 59) {
            points += 0;
        } else if (hdlCholesterol >= 40 && hdlCholesterol <= 49) {
            points += 1;
        } else if (hdlCholesterol < 40) {
            points += 2;
        }
    } else { // Female
        if (hdlCholesterol >= 60) {
            points -= 1;
        } else if (hdlCholesterol >= 50 && hdlCholesterol <= 59) {
            points += 0;
        } else if (hdlCholesterol >= 40 && hdlCholesterol <= 49) {
            points += 1;
        } else if (hdlCholesterol < 40) {
            points += 2;
        }
    }

    return points;
}

// This also works
function calculateSmokerPoints(isSmoker, age, isMale) {
    let points = 0;

    if (isSmoker) {
        if (isMale) {
            if (age >= 20 && age <= 39) {
                points += 8;
            } else if (age >= 40 && age <= 49) {
                points += 5;
            } else if (age >= 50 && age <= 59) {
                points += 3;
            } else if (age >= 60 && age <= 69) {
                points += 1;
            } else if (age >= 70 && age <= 79) {
                points += 1;
            }
        } else if (isMale() == false){ // Female
            if (age >= 20 && age <= 39) {
                points += 9;
            } else if (age >= 40 && age <= 49) {
                points += 7;
            } else if (age >= 50 && age <= 59) {
                points += 4;
            } else if (age >= 60 && age <= 69) {
                points += 2;
            } else if (age >= 70 && age <= 79) {
                points += 1;
            }
        }
    } else {
        points = 0;
    }

    return points;
}

//This also works
function calculateTotalCholesterolPoints(age, totalCholesterol, isMale) {
    let points = 0;

    if (isMale) {
        if (age >= 20 && age <= 39) {
            if (totalCholesterol < 160) points -= 0;
            else if (totalCholesterol <= 199) points += 4;
            else if (totalCholesterol <= 239) points += 7;
            else if (totalCholesterol <= 279) points += 9;
            else points += 11;
        } else if (age >= 40 && age <= 49) {
            if (totalCholesterol < 160) points -= 0;
            else if (totalCholesterol <= 199) points += 3;
            else if (totalCholesterol <= 239) points += 5;
            else if (totalCholesterol <= 279) points += 6;
            else points += 8;
        } else if (age >= 50 && age <= 59) {
            if (totalCholesterol < 160) points -= 0;
            else if (totalCholesterol <= 199) points += 2;
            else if (totalCholesterol <= 239) points += 3;
            else if (totalCholesterol <= 279) points += 4;
            else points += 5;
        } else if (age >= 60 && age <= 69) {
            if (totalCholesterol < 160) points -= 0;
            else if (totalCholesterol <= 199) points += 1;
            else if (totalCholesterol <= 239) points += 1;
            else if (totalCholesterol <= 279) points += 2;
            else points += 3;
        } else if (age >= 70 && age <= 79) {
            if (totalCholesterol < 160) points -= 0;
            else if (totalCholesterol <= 199) points += 0;
            else if (totalCholesterol <= 239) points += 0;
            else if (totalCholesterol <= 279) points += 1;
            else points += 1;
        }
    } else{
        if (age >= 20 && age <= 39) {
            if (totalCholesterol < 160) points -= 0;
            else if (totalCholesterol <= 199) points += 4;
            else if (totalCholesterol <= 239) points += 8;
            else if (totalCholesterol <= 279) points += 11;
            else points += 13;
        } else if (age >= 40 && age <= 49) {
            if (totalCholesterol < 160) points -= 0;
            else if (totalCholesterol <= 199) points += 3;
            else if (totalCholesterol <= 239) points += 6;
            else if (totalCholesterol <= 279) points += 8;
            else points += 10;
        } else if (age >= 50 && age <= 59) {
            if (totalCholesterol < 160) points -= 0;
            else if (totalCholesterol <= 199) points += 2;
            else if (totalCholesterol <= 239) points += 4;
            else if (totalCholesterol <= 279) points += 5;
            else points += 7;
        } else if (age >= 60 && age <= 69) {
            if (totalCholesterol < 160) points -= 0;
            else if (totalCholesterol <= 199) points += 1;
            else if (totalCholesterol <= 239) points += 2;
            else if (totalCholesterol <= 279) points += 3;
            else points += 4;
        } else if (age >= 70 && age <= 79) {
            if (totalCholesterol < 160) points -= 0;
            else if (totalCholesterol <= 199) points += 1;
            else if (totalCholesterol <= 239) points += 1;
            else if (totalCholesterol <= 279) points += 2;
            else points += 2;
        }
    }

    return points;
}

//This also works
function calculateAgePoints(age, isMale) {
    let points = 0;

    if (isMale) {
        if (age >= 20 && age <= 34) points -= 9;
        else if (age >= 35 && age <= 39) points -= 4;
        else if (age >= 40 && age <= 44) points += 0;
        else if (age >= 45 && age <= 49) points += 3;
        else if (age >= 50 && age <= 54) points += 6;
        else if (age >= 55 && age <= 59) points += 8;
        else if (age >= 60 && age <= 64) points += 10;
        else if (age >= 65 && age <= 69) points += 11;
        else if (age >= 70 && age <= 74) points += 12;
        else if (age >= 75 && age <= 79) points += 13;
    } else {
        if (age >= 20 && age <= 34) points -= 7;
        else if (age >= 35 && age <= 39) points -= 3;
        else if (age >= 40 && age <= 44) points += 0;
        else if (age >= 45 && age <= 49) points += 3;
        else if (age >= 50 && age <= 54) points += 6;
        else if (age >= 55 && age <= 59) points += 8;
        else if (age >= 60 && age <= 64) points += 10;
        else if (age >= 65 && age <= 69) points += 12;
        else if (age >= 70 && age <= 74) points += 14;
        else if (age >= 75 && age <= 79) points += 16;
    }

    return points;
}

function calculateRisk(totalPoints, isMale) {
    console.log("Calculating risk for totalPoints:", totalPoints);

    if (isMale) {
        if (totalPoints === 0) {
            return "<1%";
        } else if (totalPoints >= 1 && totalPoints <= 4) {
            return "1%";
        } else if (totalPoints >= 5 && totalPoints <= 6) {
            return "2%";
        } else if (totalPoints === 7) {
            return "3%";
        } else if (totalPoints === 8) {
            return "4%";
        } else if (totalPoints === 9) {
            return "5%";
        } else if (totalPoints === 10) {
            return "6%";
        } else if (totalPoints === 11) {
            return "8%";
        } else if (totalPoints === 12) {
            return "10%";
        } else if (totalPoints === 13) {
            return "12%";
        } else if (totalPoints === 14) {
            return "16%";
        } else if (totalPoints === 15) {
            return "20%";
        } else if (totalPoints === 16) {
            return "25%";
        } else if (totalPoints >= 17) {
            return "Over 30%";
        }
    } else{ // Female
        if (totalPoints < 9) {
            return "<1%";
        } else if (totalPoints >= 9 && totalPoints <= 12) {
            return "1%";
        } else if (totalPoints === 13 || totalPoints === 14) {
            return "2%";
        } else if (totalPoints === 15) {
            return "3%";
        } else if (totalPoints === 16) {
            return "4%";
        } else if (totalPoints === 17) {
            return "5%";
        } else if (totalPoints === 18) {
            return "6%";
        } else if (totalPoints === 19) {
            return "8%";
        } else if (totalPoints === 20) {
            return "11%";
        } else if (totalPoints === 21) {
            return "14%";
        } else if (totalPoints === 22) {
            return "17%";
        } else if (totalPoints === 23) {
            return "22%";
        } else if (totalPoints === 24) {
            return "27%";
        } else if (totalPoints >= 25) {
            return "Over 30%";
        }
    }
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