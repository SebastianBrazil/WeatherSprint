# WeatherSprint

Sebastian Breve-Sanchez

12/8/23

Weather Sprint

This program is a weather app, designed to show information such as the temperature and chance of rain up to a week in advance for any city searchd up. A saved button will allow any user to save their favorite cities and provide quicker access to their data, even after a website refresh. 

12/4/23: Created the document and built out much of javascript for the data retrieval from APIs. Got some data from the current-day forecast to populate on screen, but the 5-day forecast is being less cooperative. 
12/5/23: The 5-day forecast is now functional, I forgot to do data.list.main, instead what I did yesterday was data.main . The current weather API displays all of its necessary information, but the 5-day forecast doesn't display its information as I plan on writing out a function to gather all timestamps of each individual day. I started work on the local storage, currently it is non-functional. 
12/6/23: The function for gathering the temperatures for every three hours has been complicated by the fact that the API is in UTC time, JS's locale conversion is UTC-7, and I need UTC-8. I got the local storage to function, however calling cities from the favorites is nonfunctional. I tried to get some syntax for my search results functioning, but no luck. 
12/7/23: I spent most of my time working on crafting custom images for the CSS design in GIMP, but I didn't create the code to implement those images into the website yet. While i fleshed out the saved city list button a bit more, I didn't do much else in JS, and as such didn’t get the 3-hour function working properly. Note: night commit - finished the saved cities button using a for loop, and used that code to rehash a few functions to cut out excess code. hopefully it will make the 3 hour function simpler to create due to increased knoweldge of how JS works and the way data is handled. The chance of fully finishing is looking quite slim.
12/8/23: I managed to create the function that displays the images I created yesterday. However, any attempt to build out the three-hour function results in non-functional code. The css is also quite bare-boned. Its so joever.

Peer Review by:
