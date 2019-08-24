/*
    Project: Interactive form.
    Author: Chintan Ray.

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
        .attr("hidden", true);

    /*creates the default message option 'Please select a T-shirt Theme',
     and stores it in a variable $colorDefaultMsg*/
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
    //The event listener does two operations 1) Updating and displaying the total activity cost.

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
});