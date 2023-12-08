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
let bigData = [];
let fiveArray = [];
let userInput = "";
let fiveDayData;
let lat;
let lon;
let putCityToStorage = "";
let notListOpen = true;

//checks if user has cities saved on local stoage
if (localStorage.getItem("cities")) {
    savedCityArray = JSON.parse(localStorage.getItem("cities"));
};


//is temporarily 'keypress', was originally keyup
// keyup allows for autocomplete
//takes the user's input and sends it to the geolocater function
cityInput.addEventListener("keypress", function (e) {
    if (event.key === "Enter") {
        userInput = cityInput.value;
        geoCall();
    }
});

//calls the geolocater api to gather a list of cities
async function geoCall() {
    if (userInput != "") {
        const promise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=${weatherApiKey}`)
        const data = await promise.json();

        bigData = [];
        for (let i = 0; i < data.length; i++) {
            bigData.push(`${data[i].name}, ${data[i].state}, ${data[i].country}, ${data[i].lat}, ${data[i].lon}`);
        }

        console.log(bigData);
        showCities();
    } else {
        searchInject.innerHTML = "";
    }
};

//creates the searchbar dropdown
function showCities() {
    searchInject.innerHTML = "";
    let holderDiv = document.createElement("div");
    holderDiv.className = "searchBox";

    for (let i = 0; i < bigData.length; i++) {
        let geoArray = bigData[i].split(", ");
        let popCity = document.createElement("a");
        popCity.className = "white d-flex justify-content-start";
        if (geoArray[2] != "US") {
            popCity.textContent = `${geoArray[0]}, ${geoArray[2]}`;
        } else {
            popCity.textContent = `${geoArray[0]}, ${geoArray[1]}`;
        }
        popCity.addEventListener("click", function (e) {
            lat = geoArray[3];
            lon = geoArray[4];
            putCityToStorage = `${geoArray[0]}, ${geoArray[1]}, ${geoArray[2]}, ${geoArray[3]}, ${geoArray[4]}`

            CurrentWeatherCall();
            FiveDayCall();
            searchInject.innerHTML = "";
        });
        holderDiv.appendChild(popCity);
    }
    searchInject.appendChild(holderDiv);
};

//calls the current weather api
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

//calls the five day-three hour api
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

//saves cities to local storage
savedButton.addEventListener("click", function (e) {
    if (putCityToStorage == "") {
        console.log("hey");
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

//opens and closes the saved cities list
openSavedButton.addEventListener("click", function (e) {
    searchInject.innerHTML = "";
    if (notListOpen) {
        let holderDiv = document.createElement("div");
        holderDiv.className = "searchBox";

        for (let i = 0; i < savedCityArray.length; i++) {
            let faveCity = document.createElement("a");
            faveCity.className = "white d-flex justify-content-start";
            let displayedArray = savedCityArray[i].split(", ");
            if (displayedArray[2] != "US") {
                faveCity.textContent = `${displayedArray[0]}, ${displayedArray[2]}`;
            } else {
                faveCity.textContent = `${displayedArray[0]}, ${displayedArray[1]}`;
            }
            faveCity.addEventListener("click", function (e) {
                lat = displayedArray[3];
                lon = displayedArray[4];
                putCityToStorage = `${displayedArray[0]}, ${displayedArray[1]}, ${displayedArray[2]}, ${displayedArray[3]}, ${displayedArray[4]}`

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

//debug, removes all saved cities from local storage
clear.addEventListener("click", function (e) {
    savedCityArray = [];
    console.log(savedCityArray);
});

//nothing below here works as intended
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

//for that 7-day forecast, use another api: https://api.weather.gov/points/38.8894,-77.0352, or c/v `https://api.weather.gov/points/${lat},${lon}`