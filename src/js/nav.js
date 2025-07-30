// Astro:page-load wrapper for View Transitions purposes
document.addEventListener("astro:page-load", () => {
  const CSbody = document.querySelector("body");
  const CSnavbarMenu = document.getElementById("cs-navigation");
  const CSUlWrapper = document.getElementById("cs-ul-wrapper");
  const mobileMenuToggle = document.querySelector(".cs-toggle");
  const dropdowns = document.querySelectorAll(".cs-dropdown");

  function toggleMenu() {
    mobileMenuToggle.classList.toggle("cs-active");
    CSnavbarMenu.classList.toggle("cs-active");
    CSUlWrapper.classList.toggle("cs-active");
    CSbody.classList.toggle("cs-open");
    ariaExpanded(mobileMenuToggle);
  }

  // Toggles the hamburger mobile menu
  mobileMenuToggle.addEventListener("click", function () {
    toggleMenu();
  });

  // Toggles dropdown visibility
  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".cs-li-link");
    button.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default link behavior
      dropdown.classList.toggle("cs-active");
    });
  });

  // Checks the value of aria-expanded on an element and changes it accordingly
  function ariaExpanded(element) {
    const isExpanded = element.getAttribute("aria-expanded");
    element.setAttribute(
      "aria-expanded",
      isExpanded === "false" ? "true" : "false"
    );
  }

  // Add .scroll class to #cs-navigation after scrolling down 100px
  document.addEventListener("scroll", () => {
    const scroll = document.documentElement.scrollTop;
    if (scroll >= 100) {
      CSnavbarMenu.classList.add("scroll");
    } else {
      CSnavbarMenu.classList.remove("scroll");
    }
  });
});
