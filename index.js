// Display photographer credits in bottom right hand corner with link to their portfolio on Unsplash
//  Display white border around thumbnail of image currently displayed as main image using active class

const weatherUrl = "84f0f2104760927b465acbf6cca0ab2f";
const client_id = "b899d09e04d42d7c4a5d5f0a06b3e406f9bb09e388bf70dd2e69f296a43a887e";

// main function that fetches weather data
function getWeather(location) {
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
inputElement.value = "london";
const form = document.querySelector("form");
const mainPhotoContainer = document.querySelector(".photo");
const thumbContainer = document.querySelector(".thumbs");

// listen out for input value from submitted form
form.addEventListener("submit", function (e) {
    e.preventDefault()
    getWeather(inputElement.value);
})

function getPhotos(location, locationWeather) {
    const url = `https://api.unsplash.com/search/photos?query=${location}+${locationWeather}&client_id=${client_id}`;
    fetch(url)
        .then(response => response.json())
        .then(body => {
            // createCreditsObject(body.results);
            mainPhotoContainer.innerHTML = "";
            loadFirstPhoto(body.results, locationWeather);
            renderThumbs(body.results);
            createThumbLinks(body.results);
        });
}

const weatherDescription = document.querySelector("#conditions")
const credit = document.querySelector("#credit-user");

function loadFirstPhoto(resultsArray, locationWeather) {
    const firstPhoto = createElement("img");
    firstPhoto.src = resultsArray[0].urls.regular;
    mainPhotoContainer.appendChild(firstPhoto);
    credit.innerHTML = `${resultsArray[0].user.first_name} ${resultsArray[0].user.last_name}`;
    weatherDescription.innerHTML = `${locationWeather.split("+").join(" ")}`;
}

function renderThumbs(resultsArray) {
    let hmtlOutput = "";
    resultsArray.forEach((result, index) => {
        let thumbClass = index === 0 ? `thumb active` : `thumb`;
        hmtlOutput += `<div><img class="${thumbClass}" src="${result.urls.regular}"></div>`;
    });
    thumbContainer.innerHTML = hmtlOutput;
    const thumbLinks = document.querySelectorAll(".thumb")
}

function createThumbLinks(resultsArray) {
    console.log(resultsArray)
    const thumbLinks = document.querySelectorAll(".thumb");
    thumbLinks.forEach((thumbImage, counter) => {
        let name = `${resultsArray[counter].user.first_name} ${resultsArray[counter].user.last_name}`;
        thumbImage.id = resultsArray[counter].id;
        thumbImage.name = name;
        thumbImage.addEventListener("click", function (event) {
            mainPhotoContainer.innerHTML = `<img src="${event.target.currentSrc}">`;
            credit.innerHTML = `<a>${thumbImage.name}</a>`;
            const prevThumb = document.querySelector(".active");
            if (prevThumb !== null) {
                prevThumb.classList.remove("active")
                event.target.classList.add("active")
            }
        })
    })
}

function appendChild(parent, element) {
    return parent.appendChild(element)
}

function createElement(element) {
    return document.createElement(element)
}