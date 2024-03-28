document.addEventListener('DOMContentLoaded', function() {
    // Get all nav buttons
    const navButtons = document.querySelectorAll('.nav-button');

    // Add click event listener to each nav button
    navButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get the URL from the data-url attribute of the button
            const url = this.dataset.url;

            // Navigate to the URL
            window.location.href = url;
        });
    });
});

// TypeScript
var typing = new Typed(".text", {
    strings: ["", "Tombitz", "IT's Binfinity.", "Innovative", "Dedicated", "a Team", "Versatile", "Programmers", "an Advocate"],
    typeSpeed: 100,
    backSpeed: 40,
    loop: true
});

// GSAP
gsap.registerPlugin(ScrollTrigger);
const introsplitTypes = document.querySelectorAll(".left-part h1");
introsplitTypes.forEach((char, i) => {
    const i_text = new SplitType(char);
    gsap.to(i_text.chars, {
        y: 0,
        stagger: 0.08, // text splitting transition
        duration: 0.3 // full text duration
    });
});