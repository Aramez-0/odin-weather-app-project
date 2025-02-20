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

function inputUserLocation() {
    return location.value
}

async function displayData(unit) {
    let location = document.querySelector('#location')
    let value = location.value
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

    address.textContent = `Address: ${weather.address}`
    condition.textContent = `Condition: ${weather.condition}`
    description.textContent = `Description: ${weather.description}`
    temp.textContent = `Temperature: ${weather.temp}`
    feelsLike.textContent = `Feels Like: ${weather.feelsLike}`
    humidity.textContent = `Humidity: ${weather.humidity}%`
}
displayData()

let input = document.querySelector('#location')
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        displayData()
    }
})



// locations and units do not work sometimes. that is annoying


// F - C (x − 32) * 5/9
// F - K (x − 32) * 5/9 + 273.15

// let select = document.querySelector('#select-unit')
// select.addEventListener('change', () => {
//     if (select.value === 'C') {
//         displayData('C')
//     } else if (select.value === 'K') {
//         displayData('K')
//     }
// })

// if (unit === 'C') {
//     (weather.temp - 32) * 5/9;
//     (weather.feelsLike - 32) * 5/9;
// } else if (unit === 'K') {
//     (weather.temp - 32) * 5/9 + 273.15;
//     (weather.feelsLike - 32) * 5/9 + 273.15;
// };

