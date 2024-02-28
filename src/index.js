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

// -- helper function to build menu elements for all top-menu & sub-menu
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

// -- helper function for all addEventListener
function addGlobalEventListener(element, type, selector, callback) {
    element.addEventListener(type, e => {
        e.preventDefault();
        if (e.target.tagName !== 'A') { return; }

        e.target.classList.toggle('active');

        if (e.target.matches(selector)) callback(e)

        topMenuLinks.forEach(function(link) {
            link.classList.remove('active');
        })
    })
} 

// interaction between top-menu & sub-menu
const topMenuLinks = topMenuEl.querySelectorAll('a');
addGlobalEventListener(topMenuEl, 'click', 'a', e => {
    const hasSubLinks = menuLinks.find((link) => link.text === e.target.textContent).subLinks;

        if (e.target.classList !== 'active') {
            if (hasSubLinks) {
                subMenuEl.style.top = "100%";
                helperBuildMenu(hasSubLinks, subMenuEl);
            } else {
                subMenuEl.style.top = "0";
            }
        }
})

addGlobalEventListener(subMenuEl, 'click', 'a', e => {
    if (subMenuEl.style.top === "100%") {
        subMenuEl.style.top = "0";
    }
})


// ===  ===============================
let openHours = document.getElementById('open');

// handle date change
let field = document.querySelector('#date')
field.min = new Date().toISOString().split('T')[0];

date.addEventListener('input', function () {
    let date = new Date(`${field.value}T00:00`);
    console.log(date.getDay());

    // update the operation hours on that day
    if (date.getDay() === 0 || date.getDay() === 6) {
        openHours.innerHTML = 'Hours of operation: 9AM - 6PM EST'
    } else {
        openHours.innerHTML = 'Hours of operation: 8AM - 8PM EST' 
    }

    // clear previous dateDemo if there is a next sibling
    if (field.nextSibling) {
        let previousDateDemo = document.querySelector('#dateDemo');
        if (previousDateDemo) {
            previousDateDemo.remove();
        }
    }

    // create and append new dateDemo
    const dateDemo = document.createElement('div');
    dateDemo.id = 'dateDemo';
    dateDemo.style.padding = '10px 0';
    dateDemo.textContent = `${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}`;
    field.parentNode.insertBefore(dateDemo, field.nextSibling);


    // update available time
})