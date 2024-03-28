feather.replace()

$(document).on('click', 'a[href^="#"]', function(event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});

/**-------------------- NAVBAR  -------------------------*/

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

/**-------------------- END -------------------------*/



/***************************************************** */
const slideElements = ['.back__slide', '.card__slide', '.content__slide'];
let inProgress = false;

const goToSlide = (slideElements, index) => {
    if (!inProgress) {
        inProgress = true;

        $('.active').addClass('exit');
        $('.active').removeClass('active');
        slideElements.forEach(elem => {
            $(`${elem}:nth-child(${index})`).addClass('active');
        });

        const evenSlide = index % 2 === 0;
        if (evenSlide)
            $('.content__ping').addClass('content__ping--right');
        else

            $('.content__ping').removeClass('content__ping--right');
        $('.content__ping--noanimation').removeClass('content__ping--noanimation');

        setTimeout(() => $('.exit').removeClass('exit'), 1000);
        setTimeout(() => inProgress = false, 2000);
    }
};

$('.content__slide:nth-child(1) .button').on('click', () => goToSlide(slideElements, 2));
$('.content__slide:nth-child(2) .button').on('click', () => goToSlide(slideElements, 1));

setTimeout(() => goToSlide(slideElements, 2), 2000);
setTimeout(() => goToSlide(slideElements, 1), 6000);

let amount = 0;
let slide = 0;

const progress = () => {
    amount++
    $('.active .progress').css('transform', `scaleX(${amount/400})`)
    if (amount >= 400) {
        amount = 0;
        $('.active .progress').css('transform', `scaleX(${amount/400})`)
        slide = (slide + 1) % 2;
        goToSlide(slideElements, slide + 1);
        clearInterval(progressInterval);
        setTimeout(() => {
            progressInterval = setInterval(progress, 20);
            $('.back__slide:not(.active) .progress').css('transform', 'scaleX(0)')
        }, 2000);
    }
}

let progressInterval = setInterval(progress, 20);

/** */

// Detect Browsers
const isFirefox = typeof InstallTrigger !== 'undefined';
const detectFFVersion = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);
const targetVersion = detectFFVersion ? parseInt(detectFFVersion[1]) : 0;
const isIE = /*@cc_on!@*/ false || !!document.documentMode;
const isEdge = !isIE && !!window.StyleMedia;

//DOM elements
const heroSection = document.getElementById("hero");
const infinityBlock = document.getElementById('infinity');
const rightBlock = document.getElementById('right-block');
const leftBlock = document.getElementById('left-block');
const leftIndicator = document.getElementById('left-indicator');
const rightIndicator = document.getElementById('right-indicator');

let rectangle = document.getElementById('mask');

if (isFirefox) {
    if (targetVersion > 57) {
        infinityBlock.classList.add('ff');
    } else {
        infinityBlock.classList.add('ff-old');
    }
}

if (isIE) {
    rectangle = document.getElementById('trident');
    infinityBlock.classList.add('ie');
    leftBlock.classList.add('ie');
    rightBlock.classList.add('ie')
    if (window.innerWidth < 1400) {
        heroSection.classList.add('laptop-ie')
    }
}

if (isEdge) {
    infinityBlock.classList.add('edge');
    leftBlock.classList.add('edge');
    rightBlock.classList.add('edge')
}

//Detect touchable device
const isTouchDevice = 'ontouchstart' in document.documentElement;

//Lottie animations variables https://github.com/airbnb/lottie-web
var circles;
var bg;
var loopAnim;

//Timers
let timerIn;
let timerOut;

//Flags
let isRight = false;
let isLeft = true;
let isCircleHalf = false;
let isBgHalf = false;
let isLoopHalf = false;


// Animation params
let circlesParams = {
    container: document.getElementById('circles'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'https://s3-us-west-1.amazonaws.com/zajno-storage0/rocket-source/circles.json'
};

let bgParams = {
    container: document.getElementById('animated-bg'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'https://s3-us-west-1.amazonaws.com/zajno-storage0/rocket-source/bg.json'
};

let loopParams = {
    container: document.getElementById('loop'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'https://s3-us-west-1.amazonaws.com/zajno-storage0/rocket-source/loop.json'
};

//Init animations
circles = lottie.loadAnimation(circlesParams);
bg = lottie.loadAnimation(bgParams);
loopAnim = lottie.loadAnimation(loopParams);

//Get animations total frames
var firstFrame = 0;
var totalFramesCircles;
var totalFramesBg;
var totalFramesLoop;

// loader element
const loader = document.getElementById('load');

// on animation frames load get total frames
circles.addEventListener('DOMLoaded', function() {
    totalFramesCircles = circles.totalFrames;
    loader.classList.remove('active')
    heroSection.classList.add('active')
})

bg.addEventListener('DOMLoaded', function() {
    totalFramesBg = bg.totalFrames;
})

loopAnim.addEventListener('DOMLoaded', function() {
    totalFramesLoop = loopAnim.totalFrames;
})

// Add eventLinsteners
if (!isTouchDevice) {
    addListener(leftIndicator, 'mouseenter', playLeftBlockAnimation)
    addListener(rightIndicator, 'mouseenter', playRightBlockAnimation)
} else {
    addListener(leftIndicator, 'touchstart', playLeftBlockAnimation)
    addListener(rightIndicator, 'touchstart', playRightBlockAnimation)
}

function addListener(element, eventName, action) {
    element.addEventListener(eventName, function() {
        action()
    });
}

//Animation play functions
function playCircleAnimation() {
    if (!isCircleHalf) {
        circles.playSegments([firstFrame, totalFramesCircles / 2], true);
        isCircleHalf = true;
    } else {
        circles.playSegments([totalFramesCircles / 2, totalFramesCircles], true);
        isCircleHalf = false;
    }
}

function playBgAnimation() {
    if (!isBgHalf) {
        bg.playSegments([firstFrame, totalFramesBg / 2], true);
        isBgHalf = true;
    } else {
        bg.playSegments([totalFramesBg / 2, totalFramesBg], true);
        isBgHalf = false;
    }
}

function playLoopAnimation() {
    if (!isBgHalf) {
        loopAnim.playSegments([firstFrame, totalFramesLoop / 2], true);
        showRectangle()
        isLoopHalf = true;
    } else {
        loopAnim.playSegments([totalFramesLoop / 2, totalFramesLoop], true);
        showRectangle()
        isLoopHalf = false;
    }
}

function showRectangle() {
    clearTimeout(timerIn)
    clearTimeout(timerOut)
    timerIn = setTimeout(function() {
        rectangle.style.zIndex = 2
        timerOut = setTimeout(function() {
            rectangle.style.zIndex = 3
        }, 500);
    }, 500)
}

function playRightBlockAnimation() {
    if (!isRight) {
        rightBlock.classList.add("active");
        leftBlock.classList.remove("active");
        isLeft = false;
        isRight = true;
        playCircleAnimation();
        playLoopAnimation();
        playBgAnimation();
    }
}