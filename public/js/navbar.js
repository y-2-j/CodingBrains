// Script for Navbar Login, Signup
$(() => {
    // Show Login Modal
    $("#login-signup-btn").click(() => {
        $("#login-modal").show(200);
    });
    $("#login-btn").click(() => {
        $("#signup-modal").hide();
        $("#login-modal").show();
    });

    // Hide Login Modal
    $("#login-close-btn").click(() => {
        $("#login-modal").hide(200);
    });
    $("#login-modal").click(event => {
        if (event.currentTarget === event.target)
            $("#login-modal").hide(200);
    });

    // Show Signup Modal
    $("#signup-btn").click(()=> {
       $("#login-modal").hide();
       $("#signup-modal").show();
    });

    // Hide Signup Modal
    $("#signup-close-btn").click(() => {
        $("#signup-modal").hide(200);
    });
    $("#signup-modal").click(event => {
        if (event.currentTarget === event.target)
            $("#signup-modal").hide(200);
    });
});
