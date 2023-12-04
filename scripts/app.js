//for geoCity, have if statement checking if country === US. if true, remove US. if not true, remove state. This is in line with prototype
//

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
    geoData = data;
    geoCity1 = `${data[0].name}, ${data[0].state}, ${data[0].country}`
    geoCity2 = `${data[1].name}, ${data[1].state}, ${data[1].country}`
    geoCity3 = `${data[2].name}, ${data[2].state}, ${data[2].country}`
    geoCity4 = `${data[3].name}, ${data[3].state}, ${data[3].country}`
    geoCity5 = `${data[4].name}, ${data[4].state}, ${data[4].country}`
    console.log(data);
    showCities();
};

function showCities(){
    let cityOne = document.createElement("a");
    cityOne.className = "btn btn-primary d-flex justify-content-start";
    cityOne.textContent = geoCity1;
    cityOne.addEventListener("click", function (e) {
        alert("I was clicked");
    });

    let cityTwo = document.createElement("a");
    cityTwo.className = "btn btn-primary d-flex justify-content-start";
    cityTwo.textContent = geoCity2;
    cityTwo.addEventListener("click", function (e) {
        alert("I was clicked");
    });

    let cityThree = document.createElement("a");
    cityThree.className = "btn btn-primary d-flex justify-content-start";
    cityThree.textContent = geoCity3;
    cityThree.addEventListener("click", function (e) {
        alert("I was clicked");
    });

    let cityFour = document.createElement("a");
    cityFour.className = "btn btn-primary d-flex justify-content-start";
    cityFour.textContent = geoCity4;
    cityFour.addEventListener("click", function (e) {
        alert("I was clicked");
    });

    let cityFive = document.createElement("a");
    cityFive.className = "btn btn-primary d-flex justify-content-start";
    cityFive.textContent = geoCity5;
    cityFive.addEventListener("click", function (e) {
        alert("I was clicked");
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
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=37.9577&lon=-121.2908&appid=${weatherApiKey}`)
    const data = await promise.json();
    console.log(data);
};

async function FiveDayCall() {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=37.9577&lon=-121.2908&appid=${weatherApiKey}`)
    const data = await promise.json();
    console.log(data.list);
};