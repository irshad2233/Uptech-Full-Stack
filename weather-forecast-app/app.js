async function getWeather() {

const city = document.getElementById("city").value

// Step 1: Get Latitude & Longitude
const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`

const geoResponse = await fetch(geoURL)
const geoData = await geoResponse.json()

if(!geoData.results){
alert("City not found")
return
}

const lat = geoData.results[0].latitude
const lon = geoData.results[0].longitude

// Step 2: Get Weather
const weatherURL =
`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`

const weatherResponse = await fetch(weatherURL)
const weatherData = await weatherResponse.json()

showCurrentWeather(weatherData)
showForecast(weatherData)

}

function showCurrentWeather(data){

const weather = data.current_weather

document.getElementById("currentWeather").innerHTML = `

<h2 class="text-xl font-bold">Current Weather</h2>

<p class="text-lg mt-2">
Temperature: ${weather.temperature}°C
</p>

<p>
Wind Speed: ${weather.windspeed} km/h
</p>

`

}

function showForecast(data){

const dates = data.daily.time
const max = data.daily.temperature_2m_max
const min = data.daily.temperature_2m_min

let forecastHTML = ""

for(let i=0; i<7; i++){

forecastHTML += `

<div class="bg-blue-50 p-3 rounded text-center">

<p class="font-bold">${dates[i]}</p>

<p>Max: ${max[i]}°C</p>

<p>Min: ${min[i]}°C</p>

</div>

`

}

document.getElementById("forecast").innerHTML = forecastHTML

}