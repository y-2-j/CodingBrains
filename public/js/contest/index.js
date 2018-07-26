$(() => {
    const $days = $("#days");
    const $hours = $("#hours");
    const $minutes = $("#minutes");
    const $seconds = $("#seconds");

    // Set the date we're counting down to
    const countDownDate = new Date($("#start-time").text()).getTime();

    // Update the count down every 1 second
    const x = setInterval(() => {

        // Get todays date and time
        const now = new Date().getTime();

        // Find the distance between now an the count down date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        $days.text(days);
        $hours.text(hours);
        $minutes.text(minutes);
        $seconds.text(seconds);

        // If the count down is over, write Contest has started
        if (distance < 0) {
            clearInterval(x);
            $("#countdown").text("Contest Started!");
        }
    }, 1000);
});