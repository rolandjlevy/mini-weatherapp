const weatherUrl = "84f0f2104760927b465acbf6cca0ab2f";
const client_id = "b899d09e04d42d7c4a5d5f0a06b3e406f9bb09e388bf70dd2e69f296a43a887e";

// main function that fetches weather data
function getWeather(location){
    // location is user input
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${weatherUrl}`)
    .then(response => response.json())
    .then(body => {
        // get weather description
        const locationWeather = body.weather[0].description.split(" ").join("+");
        getPhotos(location, locationWeather);
    })
}

const inputElement = document.querySelector(".search__input");
inputElement.value = "london"
const form = document.querySelector("form");
const mainPhotoContainer = document.querySelector(".photo");

// listen out for input value from submitted form
form.addEventListener("submit",function(e){
    e.preventDefault()
    getWeather(inputElement.value);
})

function getPhotos (location, locationWeather) {
    console.log(` The weather in ${location} is ${locationWeather} today`);
    const url = `https://api.unsplash.com/search/photos?query=${location}+${locationWeather}&client_id=${client_id}`;
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(body => {
        console.log(body.results)
        mainPhotoContainer.innerHTML ="";
        const firstPhoto = createElement("img");
        firstPhoto.src = body.results[0].urls.regular;
        console.log(firstPhoto.innerHTML)
        mainPhotoContainer.appendChild(firstPhoto);
        
        body.results.forEach(result => {
            // photo
            
            // console.log(firstPhoto.innerHTML)
            
          
        });
    });
}


function appendChild(parent,element){
    return parent.appendChild(element)
}

function createElement(element){
    return document.createElement(element)
}