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

// event type

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

// contact method

contactMethods.forEach((radio, index) => {
    radio.addEventListener("change", () => {
        inputFields.forEach((field, i) => {
            field.removeAttribute("id");

            if (i !== index) {

                const select = field.querySelector("select");
                const input = field.querySelector("input");

                if (select) select.selectedIndex = 0;
                if (input) input.value = "";
            }
        });

        if (radio.checked) {
            inputFields[index].id = "checked";
        }
    });
});

// disable time and day input when not decided checked

const dateInput = document.querySelector('input[name="event-date"]');
const timeInput = document.querySelector('select[name="event-time"]');
const dateCheckbox = document.querySelector('input[name="not-decided-date"]');
const timeCheckbox = document.querySelector('input[name="not-decided-time"]');


dateCheckbox.addEventListener("change", () => {
    dateInput.disabled = dateCheckbox.checked;
});

timeCheckbox.addEventListener("change", () => {
    timeInput.disabled = timeCheckbox.checked;
});


// submit form

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    const selectedMethod = formData.get("contact-method");

    let contactInfo = "";

    switch (selectedMethod) {
        case "call":
            contactInfo = `+${formData.get("country-code-call")} ${formData.get("contact-info-call")}`;
            break;
        case "whatsapp":
            contactInfo = `+${formData.get("country-code-whatsapp")} ${formData.get("contact-info-whatsapp")}`;
            break;
        case "sms":
            contactInfo = `+${formData.get("country-code-sms")} ${formData.get("contact-info-sms")}`;
            break;
        case "email":
            contactInfo = `${formData.get("contact-info-email")}`;
            break;
    }

    const isDateUndecided = formData.get("not-decided-date");
    const isTimeUndecided = formData.get("not-decided-time");

    const eventDateOutput = isDateUndecided ? "Not decided" : formData.get("event-date");
    const eventTimeOutput = isTimeUndecided ? "Not decided" : formData.get("event-time");


    const message = `
    Event Type: ${formData.get("event-type")}
    Event Date: ${eventDateOutput}
    Event Time: ${eventTimeOutput}
    Name: ${formData.get("name")}
    Contact Info: ${contactInfo}
    Preferred Contact Method: ${selectedMethod}
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