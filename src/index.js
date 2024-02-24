// === nav bar: top-menu and sub-menu ==============
// menu data structure
var menuLinks = [
    { text: 'about', href: '/about' }, 
    { text: 'locations', href: '#', subLinks: [
        {text: 'all', href: '/locations/all'},
        {text: 'adults', href: '/locations/adults'},
        {text: 'children', href: '/locations/children'},
        {text: 'quick links', href: '/locations/quick'}
    ]},
    { text: 'find a doctor', href: '#', subLinks: [
        {text: 'all', href: '/doctor/all'},
        {text: 'adults', href: '/doctor/adults'},
        {text: 'children', href: '/doctor/children'},
        {text: 'quick links', href: '/doctor/quick'}
    ]},
    { text: 'patients & visitors', href: '#', subLinks: [
        {text: 'FAQs', href: '/patients/faqs'},
        {text: 'schedule appointments online', href: '/patients/schedule-online'}, 
        {text: 'quick links', href: '/patients/quick'},
        {text: 'contact us', href: '/patients/contactus'}
    ]},
    { text: 'my health account', href: '/myaccount'}
]

// top-menu
const topMenuEl = document.getElementById('top-menu');
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add('flex-around');

helperBuildMenu(menuLinks, topMenuEl);

// helper function to build menu elements for all top-menu & sub-menu
function helperBuildMenu(links, menuEl) {
    menuEl.innerHTML = "";
    links.forEach((link) => {
        const anchor = document.createElement('a');
        anchor.setAttribute('href', link.href);
        anchor.textContent = link.text;
        menuEl.appendChild(anchor);
    })
}

// sub-menu
const subMenuEl = document.querySelector('#sub-menu');
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add('flex-around');
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

// interaction between top-menu & sub-menu
const topMenuLinks = topMenuEl.querySelectorAll('a');
topMenuEl.addEventListener('click', function(event) {
    const clickedEvent = event.target;
    event.preventDefault();
    if (clickedEvent.tagName !== 'A') { return; }

    clickedEvent.classList.toggle('active');
    topMenuLinks.forEach(function(link) {
        link.classList.remove('active');
    })

    const hasSubLinks = menuLinks.find((link) => link.text === clickedEvent.textContent).subLinks;

    if (clickedEvent.classList !== 'active') {
        if (hasSubLinks) {
            subMenuEl.style.top = "100%";
            helperBuildMenu(hasSubLinks, subMenuEl);
        } else {
            subMenuEl.style.top = "0";
        }
    }
})

// --- Todo: to build a function for all addEventListener
// function helperAddEventListener(menuEl, ) {} 

subMenuEl.addEventListener('click', function(event) {
    const clickEvent = event.target;
    event.preventDefault();
    if (clickEvent.tagName !== 'A') { return; }

    if (subMenuEl.style.top === "100%") {
        subMenuEl.style.top = "0";
    }

    topMenuLinks.forEach((link) => {
        link.classList.remove('active');
    })
})



// === ===============================