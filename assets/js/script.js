// emailjs

const PUBLIC_KEY = "rMW7CvR31kA2kF3Zk";
const SERVICE_ID = "service_vu4a1id";
const TEMPLATE_ID = "template_5iv7b1v";

(function () {
    emailjs.init({
        publicKey: PUBLIC_KEY,
    })
})()

const form = document.querySelector("form")


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

// submit form

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    const message = `
    Event Type: ${formData.get("event-type")}
    Event Date: ${formData.get("event-date") || "Not decided"}
    Event Time: ${formData.get("event-time") || "Not decided"}
    Date Undecided: ${formData.get("not-decided-date") ? "Yes" : "No"}
    Time Undecided: ${formData.get("not-decided-time") ? "Yes" : "No"}

    Name: ${formData.get("name")}
    Contact Info: ${formData.get("contact-info")}
    Preferred Contact Method: ${formData.get("contact-method")}
  `;

    const templateParams = {
        title: "Web 1 Service Form",
        name: formData.get("name"),
        message: message.trim()
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams).then(
        () => {
            alert("Message sent successfully!");
            form.reset();
        },
        (error) => {
            console.error("FAILED...", error);
            alert("Failed to send message.");
        }
    );
});