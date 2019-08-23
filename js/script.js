/*
    Project: Interactive form.
    Author: Chintan Ray.

*/


// $(document).ready() is used to wrap the script, so that the javascript is executed only when the document is completely loaded in the DOM.

$(document).ready(function () {
    $("#name").focus(); // bring the focus i.e the text cursor is on the Name field as soon the script runs 

    $("#other-title").hide(); // the text input corresponding to the 'other' option in the Job Role dropdown is hidden

    /* A conditional switch statement is used to display the text input with id='other-title', 
    if the 'other' job option is selected in the job role the text input is displayed other wise it is hidden.*/

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
});