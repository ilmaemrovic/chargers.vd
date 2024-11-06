document.addEventListener('DOMContentLoaded', function () {
    // Function to set the language in localStorage and update the navbar
    //kad se ucita dom onda se pokrece kod 
    function setLanguage(language) {
        localStorage.setItem('language', language);
        updateNavbar(language);
        translatePage(language);
    }

    // Function to update the active language in the navbar
    // uzimam dropdown koji ima klasu (index.html) i stavlja trenutnu aktivnu sliku (kod ispod)
    function updateNavbar(language) {
        const dropdownToggle = document.getElementById('navbarDropdown');
        const dropdownItems = document.querySelectorAll('.dropdown-item');

        // Update dropdown toggle text and image  // ako je srpski jezik stavlja zastvu srb i dr.
        if (language === 'serbian') {
            dropdownToggle.innerHTML = '<img src="public/flags/serbian.png" alt="Serbian" width="20" height="14"> Srpski';
        } else {
            dropdownToggle.innerHTML = '<img src="public/flags/english.png" alt="English" width="20" height="14"> English';
        }
        /// srpski

        // Set active class on dropdown items
        dropdownItems.forEach(item => { // Prolazi kroz Srpski i Engleski
            if (item.innerHTML.includes(language === 'serbian' ? 'Serbian' : 'English')) { //provera da li je srpski trenutno aktivan,
                // menja tag u active ili ga brise
                item.classList.add('active');    
            } else {
                item.classList.remove('active');
            }
        });
    }

    function translatePage(language) {
        fetch('https://ilma.klasternit.rs/public/mockup/languages.json')     // radi fetch prevoda koji je hostovan na moj sajt 
        // salje request , vrati response u json i uzima data i data mi vraca sve prevedene jezike tj moj dokument sa prvodom
            .then(response => response.json())
            .then(data => {
                data["serbian"]  // kada uzimam data serbian dobijam na kraju objekat samo prevoda serbian 
                const languageData = data[language] || {};

                document.querySelectorAll('[data-i18n]').forEach(el => {
                    const key = el.getAttribute('data-i18n');     
                    const text = languageData[key] || key; // serbian[contact-us] -> Kontaktirajte nas
                    // uzme text radi language data  uzme text za taj kljuc koji sam dobila u moj prevod dokument 

                    // data uzima kljuc iz (index html  i18n)

                    if (el.hasAttribute('placeholder')) {
                        el.setAttribute('placeholder', text);
                    } else if (el.hasAttribute('title')) {
                        el.setAttribute('title', text);
                    } else {
                        el.textContent = text;
                    }
                });
            })
            .catch(error => console.error('Error loading language data:', error));
    }

    // Function to get the language from localStorage
    function getStoredLanguage() {
        return localStorage.getItem('language') || 'english'; // Default to English if no language is stored
        // ukoliko nema nikakav trenutni jezik koji je stavljen uzima  engl za default
    }

    // Initialize the page with the stored language // prevod mi pocinje odavde  i kaze uzmi trenutni jezik koji koristim
    // on uzima iz localstorage trenutni jezik koji koristim (gore)
    const storedLanguage = getStoredLanguage();
    updateNavbar(storedLanguage);         // i onda ga update u navbar (index.html)
    translatePage(storedLanguage);

    // Event listeners for language selection       // proverava koji je jezik izabran ako korisnik ubaci eng umest srpskog i sl
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function () {
            const selectedLanguage = this.innerHTML.includes('Serbian') ? 'serbian' : 'english';
            setLanguage(selectedLanguage);
        });
    });
});