document.getElementById('get-horoscope').addEventListener('click', getHoroscope);

function getHoroscope() {
    const zodiacSign = document.getElementById('zodiac-sign').value;
    const horoscopeTextElement = document.getElementById('reading-text');

    // Add animation while loading
    horoscopeTextElement.innerHTML = "Loading your daily horoscope...";

    // Make API call to fetch horoscope for the selected zodiac sign
    fetchHoroscope(zodiacSign)
        .then(horoscopeText => {
            // Update the displayed horoscope with animation
            horoscopeTextElement.innerHTML = horoscopeText;
            horoscopeTextElement.classList.add('fade-in');
        })
        .catch(error => {
            // Handle any errors
            horoscopeTextElement.innerHTML = "Sorry, there was an error fetching the horoscope.";
            console.error("Error fetching horoscope:", error);
        });
}

async function fetchHoroscope(sign) {
    const apiUrl = `https://horoscope-app-api.vercel.app/horoscope/${sign}`;

    // Send the GET request to the Horoscope API
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.horoscope;  // The horoscope text is in the 'horoscope' field
}
