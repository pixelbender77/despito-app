const inputs = document.querySelector(".inputs")
const thirdInputField = `<label for="input3" id="label3" >Weight <input id="input3" type="number" min="0" placeholder="" required></label>
`;
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const label1 = document.getElementById("label1");
const label2 = document.getElementById("label2");
let label3;
let input3;
const chat_text = document.getElementById("chat-text");
const actionButton = document.getElementById("action-button");

let userEmail;
let userName;
let age;
let height;
let weight;
let bmi = 0;
//

function calculateBMI(weight, height) {
    // Convert height from centimeters to meters
    height = height / 100;

    // Calculate BMI
    bmi = weight / (height * height);
}

function giveResult() {
    //getting the input elements once again since they were overwritten in the login function
    let _input1 = document.getElementById("input1");
    let _input2 = document.getElementById("input2");
    let _input3 = document.getElementById("input3");
    let advice_list = {
        "underweight": `Exercise: Hey there! If you're feeling a bit on the lighter side, how about trying some fun strength exercises? Things like lifting weights or even bodyweight exercises can help you build up some muscle.<br>
        Nutrition: I'd suggest focusing on foods that can help you gain a bit of healthy weight. You know, things like nuts, avocados, and whole grains can be your buddies here. <br>
        Disease Risk: Just a friendly reminder, it's good to keep an eye on your health, especially if you're underweight. Regular check-ups can make sure everything's A-OK. <br>
        Foods to Avoid: Ah, those tempting sugary snacks and processed foods might not be the best pals for you right now. Maybe stick to more nutritious options for a while. <br>`,

        "normal": `Exercise: Hey friend! Keeping active is always a good idea. Why not take a stroll or dance around the house? Anything to keep that body moving! <br>
        Nutrition: You're doing great with your weight, but it's still important to eat well. Load up on colorful fruits and veggies, and don't forget to treat yourself now and then.<br>
        Disease Risk: Just a gentle nudge to keep up the good work! By staying healthy, you're lowering your risk of all sorts of pesky health issues.<br>
        Foods to Avoid: Those sugary drinks and salty snacks might taste yummy, but they're not doing your body any favors. Maybe swap them out for some refreshing water or crunchy veggies?`,

        "overweight": `Exercise: Hey, I'm here to support you! How about adding a bit more movement to your day? Whether it's a walk in the park or a dance party in your living room, every bit helps!<br>
        Nutrition: Let's chat about making some tasty swaps in your diet. Think grilled chicken instead of fried, and maybe swap out that soda for some sparkling water with a splash of fruit juice.<br>
        Disease Risk: Just a gentle reminder that carrying extra weight can up your risk for things like diabetes and heart disease. But hey, we're in this together, and small changes can make a big difference!<br>
        Foods to Avoid: You know, those greasy fast-food meals and sugary treats might be tempting, but they're not doing your body any favors right now. How about exploring some healthier alternatives?`,

        "obese": `Exercise: Hey, I'm here to cheer you on! Let's find some activities you enjoy that can help get that heart pumping. Maybe it's swimming, biking, or even just dancing around the house.<br>
        Nutrition: Time to be besties with whole foods! Load up on colorful fruits and veggies, lean proteins, and healthy fats. Your body will thank you for it!<br>
        Disease Risk: I'm here to remind you that your health matters. By taking small steps to shed some pounds, you're reducing your risk of serious health issues down the road.<br>
        Foods to Avoid: Ah, those tempting fast-food meals and sugary snacks might be calling your name, but they're not doing your body any favors right now. How about exploring some delicious and nutritious options instead?`
    };
    let advice = ``;
    let status = ``;
    age = parseInt(_input1.value);
    height = parseInt(_input2.value);
    weight = parseInt(_input3.value);
    //
    calculateBMI(weight, height); //calculating and updating the bmi variable.
    console.log(`Age: ${age} Height: ${height} Weight: ${weight} BMI: ${bmi} `);
    if (bmi < 18.5) {
        advice = advice_list["underweight"];
        status = "Underweight";

    } else if (bmi > 18.5 && bmi < 24.9) {
        advice = advice_list["normal"];
        status = "Normal ";
    } else if (bmi > 24.9 && bmi < 29.9) {
        advice = advice_list["overweight"];
        status = "overweighted";

    } else {
        advice = advice_list["obese"];
        status = "Obese";
    }
    chat_text.innerHTML = `Alright ${userName} 😊, Your  <span class="emphasize">Body Mass Index is ${bmi.toFixed(1)}</span> Following your age ${age}, You are ${status} . <br> these are some advice that may help you.<br> ${advice}. <br> Good luck! 😊 `; //updating the text chat
    typeWrite(); //type writing what has been updated
    inputs.style.display = "none"; //removing input fields
    actionButton.textContent = "Reset"; //updating the action button text
    actionButton.onclick = resetForm; //updating the action button to reset the form
}

function login() {
    console.log("Checking entries");
    //removing white space from the text entered in the field with .trim()
    if (input1.value.trim() !== "" && input2.value.trim() !== "") { //making sure after whitespaces are removed from the inputs we are not left with empty string. In order words user should enter something before we proceed
        console.log("You entered stuff");
        userName = input1.value; //assigning input1 to userName variable
        userEmail = input2.value; //assigning input2 to userEmail variable
        // console.log(`Name: ${userName}  Email: ${userEmail}`);
        //Storing variables in browser
        localStorage.setItem("despito_userName", userName);
        localStorage.setItem("despito_userEmail", userEmail);

        //adding the third input field to the inputs
        inputs.insertAdjacentHTML('beforeend', thirdInputField);

        label3 = document.getElementById("label3");
        input3 = document.getElementById("input3");


        //updating the fields
        chat_text.textContent = `Greetings,${userName} 😊. I am Desta, your dietitian assistant. I am here to help you with your nutrition and wellness. Please share some information about yourself and I will offer you some guidance to improve your health `;
        typeWrite(); //We typewrite the new chat_text.

        label1.innerHTML = `Age       :<input id='input1' type='number' min="0" placeholder='What is your age?' required>
        `; //updating the first label's content, type and placeholder values.

        label2.innerHTML = `Height(cm):<input id='input2' type='number' min="0" placeholder='What is your Height?' required>`;
        //updating the second label's content, type and placeholder values.

        label3.innerHTML = `Weight(kg):<input id='input3' type='number' min="0" placeholder='What is your Weight?' required>`;
        //updating the second label's content, type and placeholder values.

        // actionButtonFunction = giveResult;
        //updating the function assigned to the action button to give the BMI result.
        actionButton.innerText = "Continue";
        actionButton.onclick = giveResult;
        //updating the text of the button

    } else {
        console.log("You didn't enter anything");

    }

}

function resetForm() {
    //reseting the text chat
    location.reload(); //refresh the page.
    chat_text.textContent = `welcome back ${userName} , I am Desta and i am your Dietician 😊.Tell me abit about you and i'
    ll give you some advice so you grow healthy.
    `; //setting a new welcome text 
    typeWrite(); //typewriting the new

    //reseting the variables
    userEmail = "";
    userName = "";
    age = 0;
    height = 0;
    weight = 0;
    bmi = 0;
    //resetting action button
    actionButton.textContent = "Start";
    actionButton.onclick = login;

}

function typeWrite() {
    let splitedText = chat_text.textContent.split(''); //spliting the text in the chat_container character wise and storing it in a variable.
    chat_text.innerText = ""; //now we set the textContent to an empty string so the type writter will start writting from 0
    console.log(splitedText);

    let index = 0;
    const typewritterLoop = setInterval(() => {
        if (index < splitedText.length) {
            chat_text.textContent += splitedText[index]; // adding the next character to the string (Chat text)
            index++;
        } else {
            clearInterval(typewritterLoop); //if we've added all the caracters then we stop can stop the typewritter
        }
    }, 20);
}

// === Start === 
typeWrite();

// let actionButtonFunction = login; //Initially, the action button points to login. // old approach
actionButton.onclick = login;

//Buttons and Listeners
actionButton.addEventListener("click", actionButtonFunction);

















//won't finally use this function.. but was good knowing how to do this.
//input check (checking inputs aren't null)
function checkInput(page) {
    console.log("Checking entries");
    inputValue1 = input1.value.trim(); //removing white space from the text entered in the field
    inputValue2 = input2.value.trim(); //removing white space from the text entered in the field
    inputValue3 = input3.value.trim(); //removing white space from the text entered in the field
    if (inputValue1 !== "" && inputValue2 !== "") { //making sure after whitespaces are removed from the inputs we are not left with empty string. In order words user should enter something before we proceed
        console.log("You entered stuff");
        if (page = 2) {
            if (inputValue3 !== "") {
                console.log("All three values have been entered");
                return true; // the first two inputs have been filled
            } else {
                return false; // the third input was not filled
            }
        } else {
            return true; //Page is 1 (name and email) and so there are only 2 inputs to check .. we can proceed
        }
    } else {
        console.log("You didn't enter anything");
        return false;

    }

}

//old way of doing the typewritter stuff
// chat_text.innerText = ""; //now we set the inner text to an empty string so the type writter will start writting from 0
// console.log(splitedText);
// for (let i = 0; i < splitedText.length; i++) {
//     chat_text.innerText += splitedText[i]; // adding all the characters of the chat_text progressively . The typewritter effect.. giving that bot effect.
// }   chat_text.innerText += splitedText[i]; // adding all the characters of the chat_text progressively . The typewritter effect.. giving that bot effect.
// }

//Problems
//updating label element's textContent overwrites also it's whole content. In other words if there was say an input field nested in the label, it will be overwritten