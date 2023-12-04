//for geoCity, have if statement checking if country === US. if true, remove US. if not true, remove state. This is in line with prototype
//for that 7-day forecast, use another api: https://api.weather.gov/points/38.8894,-77.0352, or c/v `https://api.weather.gov/points/${lat},${lon}`

import { weatherApiKey } from "./keyring.js";

let cityInput = document.getElementById("cityInput")
let searchInject = document.getElementById("searchInject")
let cDay = document.getElementById("cDay");
let fDay = document.getElementById("fDay");

let userInput;
let geoCity1;
let geoCity2;
let geoCity3;
let geoCity4;
let geoCity5;
let geoData;
let lat;
let lon;

cityInput.addEventListener("keydown", function (e) {
    if (event.key === "Enter") {
        userInput = cityInput.value.toLowerCase();
        geoCall();
    };
}); 

async function geoCall() {
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
};

function showCities(){
    let cityOne = document.createElement("a");
    cityOne.className = "btn btn-primary d-flex justify-content-start";
    cityOne.textContent = geoCity1;
    cityOne.addEventListener("click", function (e) {
        lat = geoData[0].lat;
        lon = geoData[0].lon;
        CurrentWeatherCall();
        FiveDayCall();
    });

    let cityTwo = document.createElement("a");
    cityTwo.className = "btn btn-primary d-flex justify-content-start";
    cityTwo.textContent = geoCity2;
    cityTwo.addEventListener("click", function (e) {
        lat = geoData[1].lat;
        lon = geoData[1].lon;
        CurrentWeatherCall();
        FiveDayCall();
    });

    let cityThree = document.createElement("a");
    cityThree.className = "btn btn-primary d-flex justify-content-start";
    cityThree.textContent = geoCity3;
    cityThree.addEventListener("click", function (e) {
        lat = geoData[2].lat;
        lon = geoData[2].lon;
        CurrentWeatherCall();
        FiveDayCall();
    });

    let cityFour = document.createElement("a");
    cityFour.className = "btn btn-primary d-flex justify-content-start";
    cityFour.textContent = geoCity4;
    cityFour.addEventListener("click", function (e) {
        lat = geoData[3].lat;
        lon = geoData[3].lon;
        CurrentWeatherCall();
        FiveDayCall();
    });

    let cityFive = document.createElement("a");
    cityFive.className = "btn btn-primary d-flex justify-content-start";
    cityFive.textContent = geoCity5;
    cityFive.addEventListener("click", function (e) {
        lat = geoData[4].lat;
        lon = geoData[4].lon;
        CurrentWeatherCall();
        FiveDayCall();
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
    cDay.innerText = await data.main.temp + "°F";

    console.log(data);
};

async function FiveDayCall() {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`)
    const data = await promise.json();

    //huh
    fDay.innerText = await data[0];

    console.log(data.list);
};