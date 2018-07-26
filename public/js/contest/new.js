$(() => {
    const $nameInput = $("#name");
    const $startTimeInput = $("#startTime");
    const $durationInput = $("#duration");

    const $prizeList = $("#prize-list");
    const $addPrizeForm = $("#add-prize-form");
    const $addPrizeInput = $("#add-prize-input");
    const $submitBtn = $("#submitBtn");
    
    // Event Listener for Add Prize Form
    $addPrizeForm.submit(event => {
        event.preventDefault();

        // Get Prize text
        const prizeText = $addPrizeInput.val();
        if (prizeText === "")
            return;
        // Remove Temporary Message if present
        $("#temp-message").remove();
        // Add new Prize
        $prizeList.append(`
            <li class="prize">${prizeText}</li>
        `);
        // Clear Add Prize Input
        $addPrizeInput.val("");
    });
    // Event Listener to remove Prize on Clicking Prize
    $prizeList.on("click", ".prize", event => {
        $(event.currentTarget).remove();
    });

    // Event Listener for Submitting form,
    // and making POST Request to Server for Creation of Contest
    $submitBtn.click(() => {
        const name = $nameInput.val();
        const startTime = $startTimeInput.val();
        const duration = $durationInput.val();

        if (!validateForm(name, startTime, duration))
            return;

        // TODO: Validate for all Form Fields
        $.post("/contests", {
            name, startTime, duration,
            prizes: $(".prize").toArray().map(prize => $(prize).text())
        })
         .then(data => {
             window.location = data;
         })
         .catch(err => {
             console.error(err.stack);
             displayFlashMessage("Something went Wrong, Please try again!");
         });
    });
});

// Function to Display the Flash Message
const displayFlashMessage = (flashText) => {
    const $flashMessage = $("#flash-message");
    $flashMessage.text(flashText);
    $flashMessage.show();
};

// Function to Hide the Flash Message
const hideFlash = () => $("#flash-message").hide();

// Function to validate the Form Fields
// and Display Flash Message if not valid
// Returns true if Form Valid
//         false if invalid
const validateForm = (name, startTime, duration) => {
    // Check for all Required Fields
    if (name === "") {
        displayFlashMessage("Name is Required!");
        return false; 
    }
    if (!moment(startTime).isValid()) {
        displayFlashMessage("Invalid Start Time!!");
        return false;
    }
    if (duration === "" || isNaN(duration)) {
        displayFlashMessage("Duration must be an Integer!!");
        return false;
    }
    
    // Check for Validity of Start Time
    if (moment(startTime).diff(Date.now(), "days") <= 0) {
        displayFlashMessage("Sorry, Contest Registration must be before 1 Day of Start of Contest!");
        return false;
    }

    return true;
};