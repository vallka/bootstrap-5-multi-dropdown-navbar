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
});
