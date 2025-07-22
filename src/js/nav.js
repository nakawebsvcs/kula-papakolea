  // Astro:page-load wrapper for View Transitions purposes
document.addEventListener('astro:page-load', () => { 
    // Make the script controlling the <Hamburger /> mobile menu component available after navigating to a new page.

    const CSbody = document.querySelector('body');
    const CSnavbarMenu = document.getElementById('cs-navigation');
    const CSUlWrapper = document.getElementById('cs-ul-wrapper');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");

    function toggleMenu() {
        mobileMenuToggle.classList.toggle('cs-active');
        CSnavbarMenu.classList.toggle('cs-active');
        CSbody.classList.toggle('cs-open');
    }

    // Toggles the hamburger mobile menu
    mobileMenuToggle.addEventListener('click', function () {
        toggleMenu();
        ariaExpanded(mobileMenuToggle);
    });

    // Checks the value of aria expanded on an element and changes it accordingly whether it is expanded or not
    function ariaExpanded(element) {
        const isExpanded = element.getAttribute('aria-expanded');
        element.setAttribute('aria-expanded', isExpanded === 'false' ? 'true' : 'false');
    }

    // Add event listeners to each dropdown element for accessibility
    const dropdownElements = document.querySelectorAll(".cs-dropdown");
    dropdownElements.forEach(element => {
        let escapePressed = false;

        element.addEventListener("focusout", function (event) {
            if (escapePressed) {
                escapePressed = false;
                return;
            }
            if (!element.contains(event.relatedTarget)) {
                element.classList.remove("cs-active");
                const dropdownButton = element.querySelector(".cs-dropdown-button");
                if (dropdownButton) {
                    ariaExpanded(dropdownButton);
                }
            }
        });

        element.addEventListener("keydown", function (event) {
            const dropdownButton = element.querySelector(".cs-dropdown-button");
            if (element.classList.contains("cs-active")) {
                event.stopPropagation();
            }

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                element.classList.toggle("cs-active");
                if (dropdownButton) {
                    ariaExpanded(dropdownButton);
                }
            }

            if (event.key === "Escape") {
                escapePressed = true;
                element.classList.remove("cs-active");
                if (dropdownButton) {
                    ariaExpanded(dropdownButton);
                }
            }
        });

        const maxWidthMediaQuery = window.matchMedia("(max-width: 63.9375rem)");
        if (maxWidthMediaQuery.matches) {
            element.addEventListener("click", (e) => {
                element.classList.toggle("cs-active");
                const dropdownButton = element.querySelector(".cs-dropdown-button");
                if (dropdownButton) {
                    ariaExpanded(dropdownButton);
                }
            });

            document.addEventListener("keydown", (event) => {
                if (event.key === "Escape" && mobileMenuToggle.classList.contains("cs-active")) {
                    toggleMenu();
                }
            });
        }
    });

    // Pressing Enter will redirect to the href
    const dropdownLinks = document.querySelectorAll(".cs-drop-li > .cs-li-link");
    dropdownLinks.forEach(link => {
        link.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                window.location.href = this.href;
            }
        });
    });

    // Add classes for mobile navigation toggling
    CShamburgerMenu.addEventListener('click', function() {
        CShamburgerMenu.classList.toggle("cs-active");
        CSnavbarMenu.classList.toggle("cs-active");
        CSbody.classList.toggle("cs-open");
        ariaExpandedNav();
    });

    // Checks the value of aria-expanded on the cs-ul and changes it accordingly
    function ariaExpandedNav() {
        const csUL = document.querySelector('#cs-expanded');
        const csExpanded = csUL.getAttribute('aria-expanded');
        csUL.setAttribute('aria-expanded', csExpanded === 'false' ? 'true' : 'false');
    }

    // Mobile nav toggle code for dropdowns
    const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
    for (const item of dropDowns) {
        const onClick = () => {
            item.classList.toggle('cs-active');
        };
        item.addEventListener('click', onClick);
    }

    // Add .scroll class to #cs-navigation after scrolling down 100px
    document.addEventListener('scroll', () => {
        const scroll = document.documentElement.scrollTop;
        if (scroll >= 100) {
            CSnavbarMenu.classList.add('scroll');
        } else {
            CSnavbarMenu.classList.remove('scroll');
        }
    });
});