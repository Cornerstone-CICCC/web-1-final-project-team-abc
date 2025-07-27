const eventTypes = document.querySelectorAll(".event-options div")

const contactMethods = document.querySelectorAll('form .contact-field div input[type="radio"]')
const inputFields = document.querySelectorAll(".input-field")


eventTypes.forEach(option => {
    const eventTypeInput = option.querySelector('input[type="radio"]')

    eventTypeInput.addEventListener("change", () => {
        eventTypes.forEach(event => event.classList.remove("select"))
        if (eventTypeInput.checked) {
            option.classList.add("select")
        }
    })
});

contactMethods.forEach((radio, index) => {
    radio.addEventListener("change", () => {
        inputFields.forEach(field => field.removeAttribute("id")); // Remove ID from all

        if (radio.checked) {
            inputFields[index].id = "checked"; // Add ID to corresponding input-field
        }
    });
});

// portfolio
 document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab");
    const galleries = document.querySelectorAll(".tab-content");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        galleries.forEach((g) => g.classList.add("hidden"));

        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.remove("hidden");
      });
    });
  });
  console.log("Script loaded");
