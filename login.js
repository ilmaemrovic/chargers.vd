document.addEventListener('DOMContentLoaded', () => {
    // Fetch users from users.json    dom se pokrece kada se ucita cela login html i onda salje request na poziv tj link ispod
    // koja mi vraca listu users na dnu.
    fetch('https://ilma.klasternit.rs/public/mockup/users.json')
        .then(response => response.json())   //response pretvara u json
        .then(users => {
            document.querySelector('form').addEventListener('submit', (event) => { //pravim queriselektor za osluskivanje submita
                event.preventDefault();   // kad se submituje radi event prevent default
                
                const username = document.querySelector('input[type="text"]').value;   //uzimamo imput sa html imput text i pswrd
                const password = document.querySelector('input[type="password"]').value;
                
                const passwordHash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
                // sha256 enkripcija kako mi se ne bi desifrovala sifra

                const user = users.find(user => user.username === username && user.passwordHash === passwordHash);
                // ako postoji takav user uzima tog usera nakon provere i proverava sifru da li je hesovana

                if (user) {   // ako postoji takav korisnik onda je logovanje uspesno a ako nije onda je invalid username ili pswrd
                    alert('Login successful!');
                    localStorage.setItem('user', username);
                    window.location.href = 'index.html'; 
                } else {
                    alert('Invalid username or password.');
                }
            });
        })
        .catch(error => console.error('Error fetching user data:', error));
});



// const users = [
//     { username: 'user1', passwordHash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08' }, // password: "test"
//     { username: 'user2', passwordHash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8' }, // password: "password"
//     { username: 'ilma', passwordHash: '256d968af8d9013db546aa9f583b312de639f221d03f54a17e694e880fc790fe' } // password: "ilmailma"
// ];