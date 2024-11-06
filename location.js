const apiKey = 'f83443ea-d469-4590-8fe0-83a65533759d';  
// api kez prvo proverava (kod na dnu) da li je korisnik ulogovan 

function checkUserAuthentication() {
    const user = localStorage.getItem('user'); // Adjust this based on your localStorage structure
    // uzima iz local storage usera (kad se ulogujem setujem u localStorage usera)
    if (!user) {
        // Redirect to login page if no user data is found
        alert("You need to log in to use these feature!")
        window.location.href = 'login.html'; // Replace with the actual login page URL
    }
}

function showLoading() {
    document.getElementById('loadingPlaceholder').style.display = 'block';
    document.getElementById('stations').style.display = 'none';
}

function hideLoading() {
    document.getElementById('loadingPlaceholder').style.display = 'none';
    document.getElementById('stations').style.display = 'flex';
}

async function fetchStations(latitude, longitude) {
    showLoading();
    const apiUrl = `https://api.openchargemap.io/v3/poi/?output=json&latitude=${latitude}&longitude=${longitude}&maxresults=10&compact=true&verbose=false&key=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const stations = await response.json();
        displayStations(stations);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        hideLoading();
    }
}

function displayStations(stations) {
    const stationsDiv = document.getElementById('stations');
    stationsDiv.innerHTML = ''; // Clear previous results

    if (stations.length === 0) {
        stationsDiv.innerHTML = '<p class="text-center">No charging stations found.</p>';
    } else {
        stations.forEach(station => {
            const stationCard = `
                <div class="col-md-4">
                    <div class="card mb-4 shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title">${station.AddressInfo.Title}</h5>
                            <p class="card-text">
                                Address: ${station.AddressInfo.AddressLine1}, ${station.AddressInfo.Town}, ${station.AddressInfo.StateOrProvince}
                            </p>
                            <p class="card-text">Contact: ${station.AddressInfo.ContactTelephone1 || 'N/A'}</p>
                            <p class="card-text">Distance: ${station.AddressInfo.Distance ? station.AddressInfo.Distance.toFixed(2) + ' km' : 'N/A'}</p>
                        </div>
                    </div>
                </div>`;
            stationsDiv.innerHTML += stationCard;
        });
    }
}

document.getElementById('locationForm').addEventListener('submit', function(event) { //search
    event.preventDefault();
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    fetchStations(latitude, longitude);
});

document.getElementById('citySelect').addEventListener('change', function() { //biram grad, nece da fetchuje dok ne kliknem search 
    const selectedCity = this.value.split(',');
    document.getElementById('latitude').value = selectedCity[0];  // uzima vrednost sa (station.html) kordinate pored nabrojanih gradova
    document.getElementById('longitude').value = selectedCity[1];
});

document.addEventListener('DOMContentLoaded', checkUserAuthentication);
