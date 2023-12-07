//for that 7-day forecast, use another api: https://api.weather.gov/points/38.8894,-77.0352, or c/v `https://api.weather.gov/points/${lat},${lon}`

import { weatherApiKey, forbiddenKey } from "./keyring.js";

let cityInput = document.getElementById("cityInput")
let searchInject = document.getElementById("searchInject")
let currentTemp = document.getElementById("currentTemp");
let currentHighTemp = document.getElementById("currentHighTemp");
let currentSideHighTemp = document.getElementById("currentSideHighTemp");
let currentLowTemp = document.getElementById("currentLowTemp");
let currentSideLowTemp = document.getElementById("currentSideLowTemp");
let nineAM = document.getElementById("nineAM");
let twelvePM = document.getElementById("twelvePM");
let threePM = document.getElementById("threePM");
let sixPM = document.getElementById("sixPM");
let ninePM = document.getElementById("ninePM");
let twelveAM = document.getElementById("twelveAM");
let savedButton = document.getElementById("savedButton");
let openSavedButton = document.getElementById("openSavedButton");
let clear = document.getElementById("clear");
let name = document.getElementById("name");
let date = document.getElementById("date");
let clouds = document.getElementById("clouds");
let replaceWithCloud = document.getElementById("replaceWithCloud");

let savedCityArray = [];
let fiveArray = [];
let userInput = "";
let geoCity1 = [];
let geoCity2 = [];
let geoCity3 = [];
let geoCity4 = [];
let geoCity5 = [];
let geoData;
let fiveDayData;
let lat;
let lon;
let putCityToStorage = "";
let notListOpen = true;

if (localStorage.getItem("cities")) {
    savedCityArray = JSON.parse(localStorage.getItem("cities"));
};

//is temporarily 'keypress', was originally keyup
// keyup allows for autocomplete
cityInput.addEventListener("keypress", function (e) {
    if (event.key === "Enter") {
        userInput = cityInput.value;
        geoCall();
    }
});

async function geoCall() {
    if (userInput != "") {
        const promise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=${weatherApiKey}`)
        const data = await promise.json();
        geoData = await data;
        if (data[0]) {
            geoCity1 = [`${data[0].name}`, `${data[0].state}`, `${data[0].country}`]
        }
        if (data[1]) {
            geoCity2 = [`${data[1].name}`, ` ${data[1].state}`, ` ${data[1].country}`]
        }
        if (data[2]) {
            geoCity3 = [`${data[2].name}`, ` ${data[2].state}`, ` ${data[2].country}`]
        }
        if (data[3]) {
            geoCity4 = [`${data[3].name}`, ` ${data[3].state}`, ` ${data[3].country}`]
        }
        if (data[4]) {
            geoCity5 = [`${data[4].name}`, ` ${data[4].state}`, ` ${data[4].country}`]
        }
        showCities();

        console.log(data);
    } else {
        searchInject.innerHTML = "";
    }
};

function showCities() {
    searchInject.innerHTML = "";
    let cityOne = document.createElement("a");
    cityOne.className = "white d-flex justify-content-start";
    //for showCities, have if statement checking if .country = US. if true, remove US. if not true, remove state. This is in line with prototype

    // if (geoCity1 != []) {
    //     if (geoCity1[2] != "US") {
    //         geoCity1 = geoCity1.splice(geoCity1.indexOf("US"), 1);
    //         cityOne.textContent = geoCity1.join(", ");
    //         console.log(geoCity1);
    //     } else {
    //         geoCity1 = geoCity1.splice(geoCity1.indexOf(geoData[1].state), 1);
    //         cityOne.textContent = geoCity1.join(", ");
    //         console.log(geoCity1);
    //     }
    // }

    cityOne.textContent = geoCity1.join(", ");
    cityOne.addEventListener("click", function (e) {
        lat = geoData[0].lat;
        lon = geoData[0].lon;
        putCityToStorage = `${geoData[0].name}, ${geoData[0].state}, ${geoData[0].country}`
        CurrentWeatherCall();
        FiveDayCall();
        searchInject.innerHTML = "";
        cityInput.value = "";
    });

    let cityTwo = document.createElement("a");
    cityTwo.className = "white d-flex justify-content-start";
    cityTwo.textContent = geoCity2;
    cityTwo.addEventListener("click", function (e) {
        lat = geoData[1].lat;
        lon = geoData[1].lon;
        putCityToStorage = `${geoData[1].name}, ${geoData[1].state}, ${geoData[1].country}`
        CurrentWeatherCall();
        FiveDayCall();
        searchInject.innerHTML = "";
    });

    let cityThree = document.createElement("a");
    cityThree.className = "white d-flex justify-content-start";
    cityThree.textContent = geoCity3;
    cityThree.addEventListener("click", function (e) {
        lat = geoData[2].lat;
        lon = geoData[2].lon;
        putCityToStorage = `${geoData[2].name}, ${geoData[2].state}, ${geoData[2].country}`
        CurrentWeatherCall();
        FiveDayCall();
        searchInject.innerHTML = "";
    });

    let cityFour = document.createElement("a");
    cityFour.className = "white d-flex justify-content-start";
    cityFour.textContent = geoCity4;
    cityFour.addEventListener("click", function (e) {
        lat = geoData[3].lat;
        lon = geoData[3].lon;
        putCityToStorage = `${geoData[3].name}, ${geoData[3].state}, ${geoData[3].country}`
        CurrentWeatherCall();
        FiveDayCall();
        searchInject.innerHTML = "";
    });

    let cityFive = document.createElement("a");
    cityFive.className = "white d-flex justify-content-start";
    cityFive.textContent = geoCity5;
    cityFive.addEventListener("click", function (e) {
        lat = geoData[4].lat;
        lon = geoData[4].lon;
        putCityToStorage = `${geoData[4].name}, ${geoData[4].state}, ${geoData[4].country}`
        CurrentWeatherCall();
        FiveDayCall();
        searchInject.innerHTML = "";
    });

    let holderDiv = document.createElement("div");
    holderDiv.className = "searchBox";

    holderDiv.appendChild(cityOne);
    holderDiv.appendChild(cityTwo);
    holderDiv.appendChild(cityThree);
    holderDiv.appendChild(cityFour);
    holderDiv.appendChild(cityFive);
    searchInject.appendChild(holderDiv);
};

async function CurrentWeatherCall() {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`);
    const data = await promise.json();
    currentTemp.innerText = Math.round(data.main.temp) + "°F";
    currentSideHighTemp.innerText = Math.round(data.main.temp_max) + "°";
    currentHighTemp.innerText = Math.round(data.main.temp_max) + "°";
    currentSideLowTemp.innerText = Math.round(data.main.temp_min) + "°";
    currentLowTemp.innerText = Math.round(data.main.temp_min) + "°";

    name.innerText = putCityToStorage;

    let currentDate = await new Date((data.dt) * 1000);
    date.innerText = await currentDate.toLocaleString();

    clouds.innerText = await data.clouds.all;

    console.log(data);
};

async function FiveDayCall() {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`)
    const data = await promise.json();
    fiveDayData = data.list;

    HourlyForecast();
    // nineAM.innerText = await data.list[0].main.temp;
    // twelvePM.innerText = await data.list[1].main.temp;
    // threePM.innerText = await data.list[2].main.temp;
    // sixPM.innerText = await data.list[3].main.temp;
    // ninePM.innerText = await data.list[4].main.temp;
    // twelveAM.innerText = await data.list[5].main.temp;

    console.log(fiveDayData);
};

savedButton.addEventListener("click", function (e) {
    if (putCityToStorage == "") {
        console.log("hey")
    } else if (putCityToStorage != "" && putCityToStorage != savedCityArray[savedCityArray.indexOf(putCityToStorage)]) {
        savedCityArray.push(putCityToStorage);
        localStorage.setItem("cities", JSON.stringify(savedCityArray));

        console.log(savedCityArray);

    } else {
        let removeIndex = savedCityArray.indexOf(putCityToStorage);
        savedCityArray.splice(removeIndex, 1);
        localStorage.setItem("cities", JSON.stringify(savedCityArray));

        console.log(savedCityArray);
    }
});

//nothing below here works as intended



openSavedButton.addEventListener("click", function (e) {
    searchInject.innerHTML = "";
    if (notListOpen) {
        let holderDiv = document.createElement("div");
        holderDiv.className = "searchBox";

        for (let i = 0; i < savedCityArray.length; i++) {
            let faveCity = document.createElement("a");
            faveCity.className = "white d-flex justify-content-start";
            faveCity.textContent = savedCityArray[i];
            faveCity.addEventListener("click", function (e) {
                //no
                lat = geoData[4].lat;
                lon = geoData[4].lon;
                putCityToStorage = `${geoData[4].name}, ${geoData[4].state}, ${geoData[4].country}`

                CurrentWeatherCall();
                FiveDayCall();
                searchInject.innerHTML = "";
            });
            holderDiv.appendChild(faveCity);
        }

        searchInject.appendChild(holderDiv);
        notListOpen = false;
    } else {
        notListOpen = true;
    }
});

//debug
clear.addEventListener("click", function (e) {
    savedCityArray = [];
    console.log(savedCityArray);
});

//Shadow realm
function HourlyForecast() {
    //call all of the data from hourly forecast
    //put them into an array
    //check if DT is equal to current day DT
    //if true, remove from array.
    //check all of DT plus one, or next number, time stamps
    //get 9am - 12am
    //add that to variable
    //go to next DT
    //after five DT, end function

    for (let i = 0; i < fiveDayData.length; i++) {
        // fiveArray += fiveDayData[i];
        let currentDate = new Date((fiveDayData[i].dt) * 1000);
        console.log(currentDate.toGMTString());

        //huge pepega: data from api is in utc, locale convert brings it to utc-7, should be 8 but AAAAAAAAAA

    }
    // console.log(fiveArray)

    // for (let i = 0; i < fiveArray.length; i++) {
    //     let currentDate = new Date((fiveArray.dt) * 1000);
    //     console.log(currentDate.toLocaleString());
    // }


};
//i need to get the three hour forecast of a single day to show the temp at that time. I cannot use this for current day because openweather big suck. I can do this for the day after current day and 4 days after that. That leaves the current day and the last day that the forbidden one must be used.








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