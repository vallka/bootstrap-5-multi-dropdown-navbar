document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggleLinks = document.querySelectorAll('.dropdown-menu a.dropdown-toggle');

    dropdownToggleLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const el = this;
            const parent = el.offsetParent;
            const subMenu = el.nextElementSibling;

            if (!subMenu.classList.contains('show')) {
                const dropdownMenu = el.closest('.dropdown-menu');
                const activeItems = dropdownMenu.querySelectorAll('.show');
                activeItems.forEach(item => item.classList.remove('show'));
            }

            subMenu.classList.toggle('show');
            el.parentElement.classList.toggle('show');

            if (!parent.parentElement.classList.contains('navbar-nav')) {
                subMenu.style.top = `${el.offsetTop}px`;
                subMenu.style.left = `${parent.offsetWidth - 4}px`;
            }

            e.preventDefault();
            e.stopPropagation();
        });
    });

    const dropdownElements = document.querySelectorAll('.dropdown');

    dropdownElements.forEach(dropdown => {
        dropdown.addEventListener('hidden.bs.dropdown', function () {
            // Close all nested dropdowns
            const nestedDropdowns = dropdown.querySelectorAll('.show');
            nestedDropdowns.forEach(nestedDropdown => {
                nestedDropdown.classList.remove('show');
            });
        });
    });

    // only on big screens hover will work
    if (getComputedStyle(document.querySelector('.navbar-toggler')).display=='none') {

        const dropdownTopToggleLinks = document.querySelectorAll('.navbar-hoverable a.dropdown-toggle');
        dropdownTopToggleLinks.forEach(link => {
            link.addEventListener('mouseenter', function (e) {
                const el = this;
                if (!el.classList.contains('show')) {
                    el.click();
                    el.blur()
                }
            });
        });
        
        const dropdownItemLinks = document.querySelectorAll('.navbar-hoverable .dropdown-menu a.dropdown-item');
        dropdownItemLinks.forEach(link => {
            if (!link.classList.contains('dropdown-toggle')) {
                link.addEventListener('mouseenter', function (e) {
                    const el = this;
                    const dropdownMenu = el.closest('.dropdown-menu');
                    const activeItems = dropdownMenu.querySelectorAll('.show');
                    activeItems.forEach(item => item.classList.remove('show'));
                });
            }
        });
    
        const dropdownTopItemLinks = document.querySelectorAll('.navbar-hoverable a.nav-link');
        dropdownTopItemLinks.forEach(link => {
            if (!link.classList.contains('dropdown-toggle')) {
                link.addEventListener('mouseenter', function (e) {
                    const el = this;
                    const dropdownMenu = el.closest('.navbar-nav');
                    const activeItems = dropdownMenu.querySelectorAll('.show');
                    activeItems.forEach(item => item.classList.remove('show'));
                });
            }
        });
    
        const navbarLinks = document.querySelectorAll('.navbar-hoverable .navbar-nav a');
        navbarLinks.forEach(link => {
                link.addEventListener('mouseleave', function (e) {
                    clearTimeout(closeAllHoveredDropdowns_timer);
                    closeAllHoveredDropdowns_timer = setTimeout(closeAllHoveredDropdowns,500)
                });
        });
    
        document.addEventListener('mousemove', (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        });
    }
});

let mouseX = 0;
let mouseY = 0;
let closeAllHoveredDropdowns_timer = null;

function closeAllHoveredDropdowns() {
    const dropdowns = document.querySelectorAll('.navbar-hoverable .navbar-nav .show');
    let isInside = false;
    dropdowns.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (mouseX >= rect.left && mouseX <= rect.right &&
            mouseY >= rect.top && mouseY <= rect.bottom) {
            isInside = true; // Mouse is inside the element
        }
    });

    if (!isInside) {
        dropdowns.forEach(el => {
            el.classList.remove('show');
        });
    }
}
