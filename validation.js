document.addEventListener("DOMContentLoaded", function () {  // kad se louduje dom on inicijalizuje formu 
    const form = document.getElementById("contactForm");

    const nameField = document.getElementById("name");    // uzme iz svakog polja (imputa) text koji pise i erore (contact.html)
    const surnameField = document.getElementById("surname");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const surnameError = document.getElementById("surnameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    function showTooltip(input, message) {    // crne poruke na inpute 
        input.setAttribute('title', message);
        new bootstrap.Tooltip(input);
    }

    // Retrieve language from localStorage or default to English
    function getCurrentLanguage() {
        return localStorage.getItem('language') || 'english';
    }

    // Define error messages for both languages
    const errorMessages = {
        "english": {
            "name": "Name must contain only letters.",
            "surname": "Surname must contain only letters.",
            "email": "Please enter a valid email.",
            "message": "Message cannot be empty."
        },
        "serbian": {
            "name": "Ime mora sadržati samo slova.",
            "surname": "Prezime mora sadržati samo slova.",
            "email": "Unesite validnu email adresu.",
            "message": "Poruka ne sme biti prazna."
        }
    };

    // Tooltips for each input field
    nameField.addEventListener("focus", () => showTooltip(nameField, getCurrentLanguage() === 'serbian' ? "Unesite ime (samo slova)." : "Please enter your name (only letters).")); 
    // crne poruke, tooltip
    surnameField.addEventListener("focus", () => showTooltip(surnameField, getCurrentLanguage() === 'serbian' ? "Unesite prezime (samo slova)." : "Please enter your surname (only letters)."));
     // crne poruke, tooltip
    emailField.addEventListener("focus", () => showTooltip(emailField, getCurrentLanguage() === 'serbian' ? "Unesite validnu email adresu." : "Please enter a valid email address.")); 
    // crne poruke, tooltip
    messageField.addEventListener("focus", () => showTooltip(messageField, getCurrentLanguage() === 'serbian' ? "Unesite vašu poruku." : "Please enter your message."));
     // crne poruke, tooltip

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let valid = true;
        const language = getCurrentLanguage();

        // Name validation
        if (!/^[a-zA-Z]+$/.test(nameField.value)) { // regularni izraz za velika i mala slova (mozemo da unosimo velika i mala slova )
            nameError.textContent = errorMessages[language].name;
            nameError.style.display = "block";
            valid = false;
        } else {
            nameError.style.display = "none";
        }

        // Surname validation
        if (!/^[a-zA-Z]+$/.test(surnameField.value)) {  // regularni izraz za velika i mala slova
            surnameError.textContent = errorMessages[language].surname;
            surnameError.style.display = "block";
            valid = false;
        } else {
            surnameError.style.display = "none";
        }

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {  // regularni izraz za mejl
            emailError.textContent = errorMessages[language].email;
            emailError.style.display = "block";
            valid = false;                        // AKO DODLJE DO GRESKE VALID FALSE 
        } else {
            emailError.style.display = "none";
        }

        // Message validation
        if (messageField.value.trim() === "") {
            messageError.textContent = errorMessages[language].message;
            messageError.style.display = "block";
            valid = false;
        } else {
            messageError.style.display = "none";
        }

        // Redirect if all fields are valid
        if (valid) {                                   //AKO SVE UNESE KAKO TREBA ONDA CE VALID DA BUDE TRUE i salje me na succes.html
            window.location.href = "success.html";
        }
    });
});
