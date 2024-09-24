

//Hero Parallax Effect
document.addEventListener('mousemove', handleMouseEvents);
const nextHero = document.getElementById('nextHero');
const cursor = document.querySelector(".cursor");
const hoverElement = document.querySelectorAll('.hoverElement');

function updateCursorPosition(e) {
    cursor.style.left = `${e.clientX - 4}px`;
    cursor.style.top = `${e.clientY - 4}px`;
}

function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

const parallaxDiv = document.querySelector('.parallaxDiv');
const images = parallaxDiv.querySelectorAll('img');

function handleMouseEvents(e) {

    let speed;

    if (isTouchDevice()) {
        speed = 0.2
    }else{
        speed = 1.4
    }

    images.forEach((image, index) => {
        const x = (window.innerWidth - e.pageX * speed * (index % 2 === 0 ? -1 : 1)) / 100;
        const y = (window.innerHeight - e.pageY * speed * (index % 2 === 0 ? -1 : 1)) / 100;
        image.style.transform = `translate(${x}px, ${y}px)`;
    });


    updateCursorPosition(e);
}

// Add the active class and move the cursor on mouse down
document.addEventListener('mousedown', (e) => {
    cursor.classList.add('active');
});

// Remove the active class on mouse up
document.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});


hoverElement.forEach((elem) => {
    elem.addEventListener('mouseover', () => {
        cursor.classList.add('active');
    })
    elem.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    })
})



const about_p = document.getElementById('about_p');
const animatedGraph = document.getElementById('animatedGraph');
let typed = false

function textTypingEffect(element, text, i = 0) {
    if (!typed) {
        return
    }

    element.textContent += text[i];

    if (i === text.length - 1) {

        return;
    }

    setTimeout(() => textTypingEffect(element, text, i + 1), 20)
}


// reveal on scroll All 
const revealElements = document.querySelectorAll('.revealElements');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100; // Adjust this value as needed

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
};

revealOnScroll()



const navbar = document.getElementById('navbar')
window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;

    // Move the h1 element to the left based on the scroll position
    nextHero.style.transform = `translateX(${-(scrollY / 4)}px)`;


    //For Reveal Effect

    let scrollTop = window.scrollY;
    if (scrollTop > 100) {
        navbar.classList.add('active')
    } else {
        navbar.classList.remove('active')
    }


    //Reveal

    let windowHeight = window.innerHeight;
    let aboutParaReveal = about_p.getBoundingClientRect().top;
    let aboutParaRevealPoint = 140;

    if (aboutParaReveal < windowHeight - aboutParaRevealPoint) {
        if (!typed) {
            typed = true;
            textTypingEffect(about_p, "Next's mission is to empower startups and entrepreneurs by providing them with the resources, support, and expertise they need to turn their visions into reality.");
        }
    } else {
        typed = false;
        about_p.textContent = '';
    }

    //For All Others
    let graphReveal = about_p.getBoundingClientRect().top;
    let graphRevealPoint = 100;

    if (graphReveal < windowHeight - graphRevealPoint) {
        if (!animatedGraph.classList.contains('active')) {
            animatedGraph.classList.add('active');
            animatedGraph.setAttribute('data', './assets/Graph-Anim2.svg')
        }
    } else {
        animatedGraph.classList.remove('active');
        animatedGraph.setAttribute('data', '')
    }

    revealOnScroll()

});



// For Swiper


var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
});



const navul = document.getElementById('navul')
const closeMenu = document.getElementById('closeMenu');
const humburger = document.getElementById('humburger')

humburger.addEventListener('click', () => {
    navul.classList.add('activated')
})


closeMenu.addEventListener('click', () => {
    navul.classList.remove('activated');
})

const handleNavUl = ()=>{
    closeMenu.click();
}

function countUp(element, start, end, duration) {
    let startTime = null;
    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start).toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
}


const counter = document.getElementById('counter');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            counter.classList.add('visible');
            countUp(counter, 0, 4345256, 2000); // Adjust the duration (4000ms = 4 seconds) as needed
        }
    });
}, {
    threshold: 0.5 // Adjust the threshold as needed
});

observer.observe(counter);


// Email System


//Throw Alert Function 
const throwAlert = (message) => {
    const alertBox = document.getElementById('alertBox')
    document.getElementById('alertMessage').innerText = message;
    if (alertBox.classList.contains('animAlert')) {
        return
    }
    alertBox.classList.add('animAlert');
    setTimeout(() => {
        alertBox.classList.remove('animAlert')
    }, 3000)
}


const contactForm = document.getElementById("contactForm");

const sendEmail = (e)=>{
    e.preventDefault();
    console.log("first")
    //Contact Me If you are unaware about emailjs @Teenage Programmer
    emailjs.sendForm('service_9uclz9f','template_n8izqtp','#contactForm','fqpWaHEk6TkDpEAX-')
    .then(()=>{
        throwAlert("Message Sent Successfully ✅")
        contactForm.reset()
    },()=>{
        throwAlert("Message not Sent (Server Error) ❌")
    })
}
contactForm.addEventListener('submit',sendEmail)