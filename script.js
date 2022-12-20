const navigation = document.getElementById('navigation');
const toggleElement = document.getElementById('toggleBtn');
const header = document.querySelector('header');
const navLinks = [...document.querySelectorAll('.header__nav-link')]

const toggleOpenAttributes = (arrayOfItems) => {
    arrayOfItems.forEach(ele => {
        const isOpen = ele.hasAttribute('data-open');
        isOpen ? ele.removeAttribute('data-open') : ele.setAttribute('data-open', '');  
    })
}

const handleMobileNavClick = (event) => {
    const isOpen = JSON.parse(event.target.getAttribute('aria-expanded'));
    event.target.setAttribute('aria-expanded', !isOpen)
    toggleOpenAttributes([header, navigation, toggleElement])
    document.body.classList.toggle('overflow')
}

function closeMobileNav() {
    navigation.removeAttribute('data-open')
    toggleElement.removeAttribute('data-open')
    header.removeAttribute('data-open')
    toggleElement.setAttribute('aria-expanded', false)
    document.body.classList.remove('overflow')
}

// Close the Navigation when clicked outside 
window.addEventListener('click', (event) => {
    if(event.target.closest('#navigation') ||  event.target.closest('#toggleBtn')) return
    closeMobileNav()
})

// Add Escape Key to close mobile navigation 
window.addEventListener('keydown', (event) => {
    if(!navigation.hasAttribute('data-open')) return
    event.key === "Escape" && closeMobileNav()
})

toggleElement.addEventListener('click', handleMobileNavClick);

// Stop animating during window resizing
let resizeTimer;
window.addEventListener("resize", () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer= setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
    }, 400);
});