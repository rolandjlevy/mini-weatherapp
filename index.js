// MINI WEATHER APP //

//Initialise API's and css selectors
const weatherAPIKey = "84f0f2104760927b465acbf6cca0ab2f";
const unsplashAPIKey = "b4574621f5145340d9c19e14e47c51c674c170b7b564908de5347e95916c8d08";
const inputElement = document.querySelector(".search__input");
const form = document.querySelector("form");
const mainPhotoContainer = document.querySelector(".photo");
const bodyContainer = document.querySelector("body");
const thumbContainer = document.querySelector(".thumbs");
const weatherDescription = document.querySelector("#conditions")
const credit = document.querySelector("#credit-user");

// listen out for input value from submitted form
form.addEventListener("submit", function (event) {
    event.preventDefault()
    getWeather(inputElement.value);
})

// main function that fetches weather data
function getWeather(location) {
    // location is from user input(form event listener above)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherAPIKey}`)
    .then(response => response.json())
    .then(body => {
        // get weather description
        const locationWeather = body.weather[0].description.split(" ").join("+");
        getPhotos(location, locationWeather);
    })
}

function getPhotos(location, locationWeather) {
    const url = `https://api.unsplash.com/search/photos?query=${location}+${locationWeather}&client_id=${unsplashAPIKey}`;
    fetch(url)
        .then(response => response.json())
        .then(body => {
            //clear mainContainer node/selector
            mainPhotoContainer.innerHTML = "";
            weatherDescription.innerHTML = `WEATHER IN ${location}: ${locationWeather.split("+").join(" ")}`;          
            renderThumbs(body.results);
            createThumbLinks();
        });
}

//creating the thumbnail images
function renderThumbs(resultsArray) {
    let hmtlOutput = "";
    resultsArray.forEach((result, index) => {
        let thumbClass = index === 0 ? `thumb active` : `thumb`;
        let user = resultsArray[index].user;
        hmtlOutput += `<div><img class="${thumbClass}" src="${result.urls.regular}" longDesc="${user.links.html}" name="${user.first_name} ${user.last_name}" title="${result.description}"></div>`;
    });
    thumbContainer.innerHTML = hmtlOutput;
}

function createThumbLinks() {
    bodyContainer.addEventListener('click', event => {
        if (event.target.matches('.thumb')){
            credit.innerHTML = `<a href="${event.target.longDesc}" target="_blank">${event.target.name}</a>`;
            mainPhotoContainer.innerHTML = `<img src="${event.target.src}">`;
            setActiveButton(event);
        }
    });
    document.querySelector(".active").click();
}

function setActiveButton (event){
    const prevThumb = document.querySelector(".active");
    if (prevThumb !== null) {
        prevThumb.classList.remove("active")
        event.target.classList.add("active")
    }
}
inputElement.value = "Greece"
getWeather(inputElement.value);