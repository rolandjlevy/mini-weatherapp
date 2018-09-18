const weatherUrl = "84f0f2104760927b465acbf6cca0ab2f";
const client_id = "b899d09e04d42d7c4a5d5f0a06b3e406f9bb09e388bf70dd2e69f296a43a887e";

function appendChild(parent,element){
    return parent.appendChild(element)
}

function createElement(element){
    return document.createElement(element)
}

// main function that fetches weather data
function getWeather(location){
    // location is user input
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${weatherUrl}`)
    .then(response => response.json())
    .then(body => {
        // get weather description
        const locationWeather = body.weather[0].description;
        getPhotos(location, locationWeather);
    })
}

const inputElement = document.querySelector(".search__input");
const form = document.querySelector("form");

// listen out for input value from submitted form
form.addEventListener("submit",function(e){
    e.preventDefault()
    getWeather(inputElement.value);
})

function getPhotos (location, locationWeather) {
    console.log(` The weather in ${location} is ${locationWeather} today`)
}