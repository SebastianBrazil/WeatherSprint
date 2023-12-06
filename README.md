# WeatherSprint

Sebastian Breve-Sanchez

12/8/23

Weather Sprint

This program is a weather app, designed to show information such as the temperature and chance of rain up to a week in advance for any city searchd up. A saved button will allow any user to save their favorite cities and provide quicker access to their data, even after a website refresh. 

12/4/23: Created the document and built out much of javascript for the data retrieval from APIs. Got some data from the current-day forecast to populate on screen, but the 5-day forecast is being less cooperative. 12/5/23: The 5-day forecast is now functional, I forgot to do data.list.main, instead what I did yesterday was data.main . The current weather API displays all of its necessary information, but the 5-day forecast doesn't display its information as I plan on writing out a function to gather all timestamps of each individual day. I started work on the local storage, currently it is non-functional. 12/6/23: The function for gathering the temperatures for every three hours has been complicated by the fact that the API is in UTC time, JS's locale conversion is UTC-7, and I need UTC-8. I got the local storage to function, however calling cities from the favorites is nonfunctional. I tried to get some syntax for my search results functioning, but no luck.

Peer Review by:
