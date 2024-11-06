// Initialize the map
// const map = L.map('map').setView([44.0, 21.0], 7); // Center on Serbia with a zoom level of 7
const map = L.map('map', {
    dragging: false,
    touchZoom: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    zoomControl: false, // Optional: Disables the zoom control buttons
}).setView([44.0, 21.0], 7);  // kordinate Srbije odzumirane na 7 zbog vidljivosti 

// Add a Tile Layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {  //sajt sa kojeg uzimam mapu po api keyu kako bi setViev
    // za nas popunio kordinate kada unesemo adresu 
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to get charger data from Open Charge Map API
async function getChargerData() {    // radi ger charger data koji se povezuje sa mojim api kljucem i stavlja da trazi
    // za RS 10 rezultata
    const response = await fetch('https://api.openchargemap.io/v3/poi/?output=json&countrycode=RS&maxresults=10&compact=true&verbose=false&key=f83443ea-d469-4590-8fe0-83a65533759d');
    const data = await response.json();

    // Add markers to the map     //i onda za svaki podatak uzima charger latitud i longitud i radi popup text koji je boldovan 
    // tj porukice na mapi 
    data.forEach(charger => {
        const lat = charger.AddressInfo.Latitude;
        const lon = charger.AddressInfo.Longitude;
        const popupText = `<b>${charger.AddressInfo.Title}</b><br/>${charger.AddressInfo.AddressLine1}<br/>${charger.AddressInfo.Town}, ${charger.AddressInfo.StateOrProvince}`;
        L.marker([lat, lon]).addTo(map).bindPopup(popupText);
    });
}

// Fetch the charger data
getChargerData();