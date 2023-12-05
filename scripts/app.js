//for geoCity, have if statement checking if country === US. if true, remove US. if not true, remove state. This is in line with prototype
//for that 7-day forecast, use another api: https://api.weather.gov/points/38.8894,-77.0352, or c/v `https://api.weather.gov/points/${lat},${lon}`

import { weatherApiKey, forbiddenKey } from "./keyring.js";

let cityInput = document.getElementById("cityInput")
let searchInject = document.getElementById("searchInject")
let currentTemp = document.getElementById("currentTemp");
let currentHighTemp = document.getElementById("currentHighTemp");
let currentLowTemp = document.getElementById("currentLowTemp");
let nineAM = document.getElementById("nineAM");
let twelvePM = document.getElementById("twelvePM");
let threePM = document.getElementById("threePM");
let sixPM = document.getElementById("sixPM");
let ninePM = document.getElementById("ninePM");
let twelveAM = document.getElementById("twelveAM");

let userInput = "";
let geoCity1;
let geoCity2;
let geoCity3;
let geoCity4;
let geoCity5;
let geoData;
let fiveDayData;
let lat;
let lon;

cityInput.addEventListener("keyup", function (e) {
    userInput = cityInput.value.toLowerCase();
    geoCall();
});

async function geoCall() {
    if (userInput != "") {
        const promise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=${weatherApiKey}`)
        const data = await promise.json();
        geoData = await data;
        geoCity1 = `${data[0].name}, ${data[0].state}, ${data[0].country}`
        geoCity2 = `${data[1].name}, ${data[1].state}, ${data[1].country}`
        geoCity3 = `${data[2].name}, ${data[2].state}, ${data[2].country}`
        geoCity4 = `${data[3].name}, ${data[3].state}, ${data[3].country}`
        geoCity5 = `${data[4].name}, ${data[4].state}, ${data[4].country}`
        showCities();

        console.log(data);
    }else{
        searchInject.innerHTML = "";
    }
};

function showCities() {
    searchInject.innerHTML = "";
    let cityOne = document.createElement("a");
    cityOne.className = "btn btn-primary d-flex justify-content-start";
    cityOne.textContent = geoCity1;
    cityOne.addEventListener("click", function (e) {
        lat = geoData[0].lat;
        lon = geoData[0].lon;
        CurrentWeatherCall();
        FiveDayCall();
        searchInject.innerHTML = "";
    });

    let cityTwo = document.createElement("a");
    cityTwo.className = "btn btn-primary d-flex justify-content-start";
    cityTwo.textContent = geoCity2;
    cityTwo.addEventListener("click", function (e) {
        lat = geoData[1].lat;
        lon = geoData[1].lon;
        CurrentWeatherCall();
        FiveDayCall();
        searchInject.innerHTML = "";
    });

    let cityThree = document.createElement("a");
    cityThree.className = "btn btn-primary d-flex justify-content-start";
    cityThree.textContent = geoCity3;
    cityThree.addEventListener("click", function (e) {
        lat = geoData[2].lat;
        lon = geoData[2].lon;
        CurrentWeatherCall();
        FiveDayCall();
        searchInject.innerHTML = "";
    });

    let cityFour = document.createElement("a");
    cityFour.className = "btn btn-primary d-flex justify-content-start";
    cityFour.textContent = geoCity4;
    cityFour.addEventListener("click", function (e) {
        lat = geoData[3].lat;
        lon = geoData[3].lon;
        CurrentWeatherCall();
        FiveDayCall();
        searchInject.innerHTML = "";
    });

    let cityFive = document.createElement("a");
    cityFive.className = "btn btn-primary d-flex justify-content-start";
    cityFive.textContent = geoCity5;
    cityFive.addEventListener("click", function (e) {
        lat = geoData[4].lat;
        lon = geoData[4].lon;
        CurrentWeatherCall();
        FiveDayCall();
        searchInject.innerHTML = "";
    });

    let holderDiv = document.createElement("div");

    holderDiv.appendChild(cityOne);
    holderDiv.appendChild(cityTwo);
    holderDiv.appendChild(cityThree);
    holderDiv.appendChild(cityFour);
    holderDiv.appendChild(cityFive);
    searchInject.appendChild(holderDiv);
};

async function CurrentWeatherCall() {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`)
    const data = await promise.json();
    currentTemp.innerText = await data.main.temp + "°F";
    currentHighTemp.innerText = await data.main.temp_max + "°";
    currentLowTemp.innerText = await data.main.temp_min + "°";

    console.log(data);
};

async function FiveDayCall() {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`)
    const data = await promise.json();
    fiveDayData = data;

    nineAM.innerText = await data.list[0].main.temp;
    twelvePM.innerText = await data.list[1].main.temp;
    threePM.innerText = await data.list[2].main.temp;
    sixPM.innerText = await data.list[3].main.temp;
    ninePM.innerText = await data.list[4].main.temp;
    twelveAM.innerText = await data.list[5].main.temp;

    console.log(data.list);
};



// async function theForbiddenOne() {
//     const url = 'https://meteostat.p.rapidapi.com/stations/hourly?station=10637&start=2020-01-01&end=2020-01-01&tz=Europe%2FBerlin';
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '`${forbiddenKey}`',
//             'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
//         }
//     };

//     try {
//         const response = await fetch(url, options);
//         const result = await response.text();
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// }

// theForbiddenOne()