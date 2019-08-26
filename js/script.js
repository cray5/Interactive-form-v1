/*
    Project: Interactive form.
    Author: Chintan Ray.
    note:- 
    
    Real-time error messages and validation are on the following fields:-
    - Name Text Input.
    - Email Text Input.
    - Other Job Role Text input.
    - Credit Number Text Input.
    - Zip Code Text Input.
    - CVV Text Input.

    Submit error messages are on the following fields:-
     - Name Text Input.
    - Email Text Input.
    - Other Job Role Text Input.
    - Register for Activities Checkbox
    - Credit Number Text Input.
    - Zip Code Text Input.
    - CVV Text Input.


        
*/


// $(document).ready() is used to wrap the script, so that the javascript is executed only when the document is completely loaded in the DOM.

$(document).ready(function () {

    /*-----------------------------"Name" Text input section-----------------------------*/
    $("#name").focus(); // bring the focus i.e the text cursor on the Name field as soon the script is executed 

    $("#other-title").hide(); // the text input corresponding to the 'other' option in the Job Role dropdown is hidden
    /*-----------------------------"Name" Text input section-----------------------------*/

    /*-----------------------------"Job Role" dropdown and Text input section-----------------------------*/

    // A conditional switch statement is used to display the text input with id='other-title', 
    // if the 'other' job option is selected in the job role the text input is displayed other wise it is hidden.

    $('#title').change(function (event) {
        switch (this.value === 'other') {
            case true:
                $("#other-title").show();
                break;
            case false:
                $("#other-title").hide();
                break;
            default:
                $("#other-title").hide()
        }
    });
    /*-----------------------------"Job Role" dropdown and Text input section-----------------------------*/

    /*-----------------------------"T-Shirt Info" dropdown section-----------------------------*/

    $("#design option")
        .eq(0) //hides the 'Select Theme' option in the "Design" dropdown
        .attr("disabled", true)
        .attr("hidden", false);

    // creates the default message option 'Please select a T-shirt Theme',
    // and stores it in a variable $colorDefaultMsg
    const $colorDefaultMsg = $(
        '<option value="defaultMessage">Please select a T-shirt Theme</option>'
    );

    $("#color").prepend($colorDefaultMsg); //   appends the `$colorDefaultMsg` option to the "color" dropdown.
    $("#color option").attr("hidden", true); // hides all the options present in the "color" dropdown.
    $("#color option[value='defaultMessage']")
        .attr("selected", true) // the option created by appending `$colorDefaultMsg` is unhidden,
        .attr("hidden", false); // and it's "selected" attribute is set true.


    // A change event listener is set on the "Design" dropdown
    $("#design").change(function (event) {
        function optionDisplayer(index, isSelected, isHidden, isDisabled) {
            const option = $("#color option") //   function optionDisplayer is used to display the dropdown options in the "color".
                .eq(index) //                      it takes 4 arguments:-  1) index: the index of the option in the dropdown(integer starting with 0).      
                .attr("selected", isSelected) //  2) isSelected: sets the selected attribute(values: true/false).
                .attr("hidden", isHidden) //      3) isHidden: sets the hidden attribute(values: true/false).
                .attr("disabled", isDisabled); // 4) isDisabled: sets the isDisabled attribute(values: true/false).
            return option;
        };


        switch (this.value === "js puns") {
            case true: //conditional switch statement to check the value in the "Design" dropdown which is selected by the user
                optionDisplayer(0, false, false, true); //   if true:-
                optionDisplayer(1, true, false, false); //   The first 4 options i.e the default message and the first 3 options are shown. the default message
                optionDisplayer(2, false, false, false); //  is disabled.
                optionDisplayer(3, false, false, false);
                optionDisplayer(4, false, true, false);
                optionDisplayer(5, false, true, false);
                optionDisplayer(6, false, true, false);
                break;
            case false:
                optionDisplayer(0, false, false, true); //   if false:-
                optionDisplayer(1, false, true, false); //   The last 3 options and the default message are shown. the default message is disabled.
                optionDisplayer(2, false, true, false);
                optionDisplayer(3, false, true, false);
                optionDisplayer(4, true, false, false);
                optionDisplayer(5, false, false, false);
                optionDisplayer(6, false, false, false);
                break;
            default:
                optionDisplayer(0, true, false) //default state.

        }

    });
    /*-----------------------------"T-Shirt Info" dropdown section-----------------------------*/

    /*-----------------------------"Register for Activities" checkbox section-----------------------------*/

    /*-------Updating and displaying the total activity cost--------*/

    // initializing variable totalActivityCost = 0
    let totalActivityCost = 0;

    // appending totalActivityCost to activities .i.e "Register for Activities" fieldset inside a <span> element with id="total-cost"
    $('.activities').append(`<span id="total-cost">Total: $${totalActivityCost}</span>`); //`<span id="total-cost">${totalActivityCost}</span>`

    // attaching a change event listener to "Register for Activities" fieldset.
    //The event listener does two operations:- 
    //  1) Updating and displaying the total activity cost.
    //  2) Disabling conflicting activities

    $('.activities').on('change', function (event) {
        const isClicked = event.target; //to get the element where the change has happened.
        const $activityCost = $(isClicked) //to find the activity cost of the clicked element.
            .attr('data-cost') //to find the `data-cost` attribute of the clicked element.
            .replace(/[^0-9.-]+/g, ""); //regex to get string of the cost without the '$' sign.
        const cost = parseInt($activityCost, 10); //cost converts string to number with base of 10. 

        //conditional statement to check if an activity checkbox is checked or unchecked.
        if ($(isClicked).prop("checked") === true) {
            totalActivityCost += cost;
            $('#total-cost').text(`Total: $${totalActivityCost}`);
        } else {
            totalActivityCost -= cost;
            $('#total-cost').text(`Total: $${totalActivityCost}`);
        }
        /*-------Updating and displaying the total activity cost--------*/

        /*-------Disabling conflicting activities--------*/


        const checkboxes = document.querySelectorAll('.activities input'); //assigning an HTMLCollection object which has all the activities checkboxes to the variable `checkboxes`.
        const $activityDateTime = $(isClicked)
            .attr('data-day-and-time'); //getting the "data-day-and-time" attribute of the clicked checkbox and assigning it to the variable `$activityDateTime`.

        for (let i = 0; i < checkboxes.length; i++) { //looping through all the checkboxes which are stored in variable `checkboxes`
            const $checkboxDateTime = $(checkboxes[i]).attr('data-day-and-time'); // storing the "data-day-and-time" of the activity checkbox at index = i to the variable $checkboxDateTime.

            //conditional if statement to check if the "data-day-and-time" attribute of the clicked checkbox is same as that in the `$checkboxDateTime` 
            if ($activityDateTime === $checkboxDateTime && checkboxes[i] !== isClicked) {
                if ($(isClicked).prop('checked')) { //if the property 'checked' is present on isClicked
                    $(checkboxes[i]).attr("disabled", true); //disable all the other checkboxes with the same "data-day-and-time" value. 
                } else { // if the property 'checked' is not present on isClicked 
                    $(checkboxes[i]).attr("disabled", false); //active all the checkboxes with the same "data-day-and-time" value. 
                }
            }
        }

        /*-------Disabling conflicting activities--------*/
    });
    /*-------Updating and displaying the total activity cost--------*/


    /*-----------------------------"Register for Activities" checkbox section-----------------------------*/

    /*-------------------------------------------Payment section-------------------------------------------*/
    // when the page loads to show only the "Credit card" paymnet div, the "paypal" div and the "bitcoin" div are to be hidden 
    $('#paypal').hide(); //hiding the "paypal" div
    $('#bitcoin').hide(); //hiding the "bitcoin" div
    $('#payment option[value="select method"]').hide(); //hiding the 'Select Payment Method' option in the dropdown

    // attaching a change event listener on the payment dropdown, 
    // so that the correct payment div is displayed according to the selected payment method.
    $('#payment').on('change', (event) => {
        const isSelected = event.target;
        const paymentMethod = isSelected.value; //the value attribute of the selected payment method 
        if (paymentMethod === "Credit Card") {
            $('#credit-card').show();
            $('#paypal').hide(); // if value attribute === "Credit Card", hide the "paypal" and "bitcoin" div
            $('#bitcoin').hide();
        } else if (paymentMethod === "PayPal") {
            $('#credit-card').hide();
            $('#paypal').show(); // if value attribute === "PayPal", hide the "Credit Card" and "bitcoin" div
            $('#bitcoin').hide();
        } else {
            $('#credit-card').hide();
            $('#paypal').hide(); // if value attribute === "bitcoin", hide the "paypal" and "Credit Card" div 
            $('#bitcoin').show();
        }
    });

    /*-------------------------------------------Payment section-------------------------------------------*/

    /*-----------------------------"Form Validation and Validation Messages-----------------------------*/

    // function formValidation


    const nameInput = document.querySelector('#name'); //selecting the Name input element, so we can use the user text input to validate the data provided. 
    const nameError = (`<span id='name-error'>Can only contain letters a-z in lower case.</span>`); //error message to be displayed in case of invalid data.
    $("#name").after(nameError); //inserting the error message to be display after the Name input element.
    $("#name-error").hide(); //hiding the error message span element.

    //[I, II, III, IV, and V] that follow have the same function as the one commented above, but I unfortunately, have not been able to refractor them,
    //as the eventListener that come after are dependant on the variables initialized here.

    //I.) for Email Input
    const emailInput = document.querySelector('#mail');
    const emailError = (`<span id='email-error'>Enter a valid Email ID (e.g. john.smith@regex.com.)</span>`);
    $("#mail").after(emailError);
    $("#email-error").hide();

    //II.) for Other Job title Input
    const otherJobRoleInput = document.querySelector('#other-title');
    const otherTitleError = (`<span id='other-title-error'>Please enter your Job Role.</span>`);
    $("#other-title").after(otherTitleError);
    $("#other-title-error").hide();

    //III.) for credit card number input
    const creditCardNumInput = document.querySelector('#cc-num');
    const CardNumError = (`<span id='CardNum-error'>Enter a Card Number between 13-16 digits.(only numbers allowed.)</span>`);
    $("#cc-num").after(CardNumError);
    $("#CardNum-error").hide();

    //IV.) for credit card zip input 
    const creditCardZipInput = document.querySelector('#zip');
    const zipError = (`<span id='zip-error'>Enter a Zip Code between 4-5 digits.(only numbers allowed.)</span>`);
    $("#zip").after(zipError);
    $("#zip-error").hide();

    //V.)for credit card cvv input
    const creditCardCvvInput = document.querySelector('#cvv');
    const cvvError = (`<span id='cvv-error'>Can only 3 digits.(only numbers allowed.)</span>`);
    $("#cvv").after(cvvError);
    $("#cvv-error").hide();


    //Kraft, J. Regular Expressions in JavaScript[snippet]www.teamtreehouse.com.
    function showOrHideTip(show, element, spanIdToHide) {
        // show element when show is true, hide when false
        if (show) {
            element.style.display = "inherit";
            element.previousElementSibling.classList.add('error');
            element.classList.add('error');
            $(spanIdToHide).show();
        } else {
            element.style.display = "none";
            element.previousElementSibling.classList.remove('error');
            $(spanIdToHide).hide();
            element.classList.remove('error');
        }
    }

    //Kraft, J. Regular Expressions in JavaScript[snippet]www.teamtreehouse.com.
    function createListener(validator, spanIdToHide) {
        return e => {
            const text = e.target.value;
            const valid = validator(text);
            const showTip = text !== "" && !valid;
            const tooltip = e.target.nextElementSibling;
            showOrHideTip(showTip, tooltip, spanIdToHide);
        };
    }

    //1.)
    function isValidName(name) {
        return /^[a-z]+$/.test(name); //regex for validating Name Input.
    };

    console.log($('#name').text().length);
    nameInput.addEventListener("input", createListener(isValidName, '#name-error'));
    //input listener to check and verify input simultaneously while user updates the text field.

    //2.)
    function isValidEmail(email) {
        return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email); //regex for validating Email Input.
    };
    emailInput.addEventListener("input", createListener(isValidEmail, "#email-error"));
    //input listener to check and verify input simultaneously while user updates the text field.

    //3.)
    function isValidOtherJobRole(otherJobRole) {
        return /^[a-z -]+$/i.test(otherJobRole); //regex for validating "other job title" Input.
    };
    if ($("#other-title").attr('display') !== 'none') {
        otherJobRoleInput.addEventListener("input", createListener(isValidOtherJobRole, "#other-title-error"));
    }
    //input listener to check and verify input simultaneously while user updates the text field **[only when the "other job title" input is visible]**

    //4.)
    function isValidCCardNum(ccardnum) {
        return /^[0-9]{13}[0-9]?[0-9]?[0-9]?$/.test(ccardnum); //regex for credit card number Input.
    };

    //5.)
    function isValidCCardZip(ccardzip) {
        return /^[0-9]{4}[0-9]?$/.test(ccardzip); //regex for credit card Zip Input.
    };

    //6.)
    function isValidCCardCvv(ccardcvv) {
        return /^[0-9]{3}$/.test(ccardcvv); //regex for credit card CVV Input.
    };
    if ($('#credit-card').attr('display') !== 'none') {
        creditCardNumInput.addEventListener("input", createListener(isValidCCardNum, "#CardNum-error"));
        creditCardZipInput.addEventListener("input", createListener(isValidCCardZip, "#zip-error"));
        creditCardCvvInput.addEventListener("input", createListener(isValidCCardCvv, "#cvv-error"));
    };
    //input listener to check and verify input simultaneously while user updates the text field **[only when the "Credit card" payment option is checked]**

    $("form").on('submit', function (event) {
        event.preventDefault();
        const errorMessageActivities = $('<span id = "error-msg-activities">Select at least one Event.</span>')
        var checked = $(".activities input:checked").length > 0;
        if (!checked) {
            $('.activities').addClass('error');
            $('.activities').prepend(errorMessageActivities)
        } else {
            $('.activities').removeClass('error');
            $('error-msg-activities').hide();
        }
    });
    /*Submit listener to check if at least one activities checkbox is selected  **[only when the form is submitted]**
    it inserts the "error" class in the activities fieldset,and a span with error message when no checkbox is selected */

    $("form").on('submit', function (event) {
        event.preventDefault();
        const errorMessageMail = $('<span id = "error-msg-mail">Please enter a valid Email ID.</span>');
        var email = $("#mail").val().length;
        if (email === 0) {
            $('#mail').addClass('submit-error');
            $('#mail').before(errorMessageMail);
            $('#error-msg-mail').css({
                'color': 'red'
            });
        } else {
            $('#mail').removeClass('submit-error');
            $('#error-msg-mail').hide();
            $('#error-msg-mail').css({
                'color': '#111'
            });
        }

        if ($('#name').text().length === 0) {
            const submitName = (`<span id='submit-name'>Please enter a valid name</span>`);
            $(nameInput).before(submitName);
            $(nameInput).addClass('submit-error');
            $('#submit-name').css({
                'color': 'red'
            });
        }

        if ($('#cc-num').text().length || $('#zip').text().length || $('#cvv').text().length === 0) {
            const submitCC = (`<span id='submit-cc'>Please enter valid credit card details.</span>`);
            $('#credit-card').before(submitCC);
            $(creditCardNumInput).addClass('submit-error');
            $(creditCardZipInput).addClass('submit-error');
            $(creditCardCvvInput).addClass('submit-error');
            $('#submit-cc').css({
                'color': 'red'
            });
        }
    });
    /*Submit listener to check if Name, Email, Credit-card number, Zip, and CVV  has been entered  **[only when the form is submitted ]**
    it inserts the "submit-error" class on respective input element, and a span with error message when no input text has been provided */

    const designDropDownOption = $('#design option'); //the theme options in the design dropdown are stored in designDropDownOption 
    const colorDropdownDiv = $('#colors-js-puns'); //the div in which the color dropdown is located are stored in colorDropdownDiv
    colorDropdownDiv.css({
        'display': 'none' //the color dropdown and label are hidden i.e there display property has been set equal to 'none'
    });

    $('#design').on('change', function () {
        for (let i = 0; i < designDropDownOption.length; i++) {
            if ($(designDropDownOption).eq(i).text() === "Select Theme") {
                colorDropdownDiv.css({
                    'display': 'none'
                })
            } else {
                colorDropdownDiv.css({
                    'display': 'block'
                })
            }
        }
    });
    /*change listener to show the color option div and dropdown **[only when the design dropdown has a theme selected]**/

    /*-----------------------------"Form Validation and Validation Messages-----------------------------*/
});