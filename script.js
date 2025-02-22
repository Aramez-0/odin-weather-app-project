async function fetchWeatherData(location) {
    let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=BZKB9BP4XM77V7XXHBQUGFZF8&elements=conditions,feelslike,humidity,temp,description,icon`, {mode: 'cors'});
    let data = await response.json();
    let alerts = data.alerts;
    let address = data.resolvedAddress
    let condition = data.currentConditions.conditions;
    let description = data.description;
    let temp = data.currentConditions.temp;
    let feelsLike = data.currentConditions.feelslike;
    let humidity = data.currentConditions.humidity;
    let icon = data.currentConditions.icon
    return {alerts, condition, description, temp, feelsLike, humidity, address, icon};
};

async function displayData() {
    let location = document.querySelector('#location')
    let value = location.value
    let select = document.querySelector('#select-unit')
    
    if (!value) {
        value = 'us'
    }

    let weather = await fetchWeatherData(`${value}`)
    console.log(weather)
    let address = document.querySelector('#address')
    let condition = document.querySelector('#condition')
    let description = document.querySelector('#description')
    let temp = document.querySelector('#temp')
    let feelsLike = document.querySelector('#feels-like')
    let humidity = document.querySelector('#humidity')

    // the api unit selection hates me so i'm doing it manually
    if (select.value === 'C') {
        temp.textContent = `Temperature: ${Math.round(((weather.temp - 32) * 5/9))}°C`;
        feelsLike.textContent = `Feels Like: ${Math.round(((weather.feelsLike - 32) * 5/9))}°C`;
    } else if (select.value === 'K') {
        temp.textContent = `Temperature: ${Math.round(((weather.temp - 32) * 5/9 + 273.15))}°K`;
        feelsLike.textContent = `Feels Like: ${Math.round(((weather.feelsLike - 32) * 5/9 + 273.15))}°K`;
    } else {
        temp.textContent = `Temperature: ${weather.temp}°F`;
        feelsLike.textContent = `Feels Like: ${weather.feelsLike}°F`;
    };

    address.textContent = `Address: ${weather.address}`
    condition.textContent = `Condition: ${weather.condition}`
    description.textContent = `Description: ${weather.description}`
    humidity.textContent = `Humidity: ${weather.humidity}%`
}
displayData()

let input = document.querySelector('#location')
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        displayData()
    }
})

let search = document.querySelector('#search-location')
search.addEventListener('click', () => {displayData()})

let select = document.querySelector('#select-unit')
select.addEventListener('change', () => {
    displayData()
})