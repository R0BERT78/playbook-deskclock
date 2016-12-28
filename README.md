# Playbook Deskclock

A simple desk clock for the Blackberry Playbook. Optimized for the Playbook screen, but CSS can be modified to better fit other tablets. 

### Setup

1. In `script.js`, modify the following values
    ```
    // Current location (for Yahoo weather)
    var YAHOO_WEATHER_LAT = 43.708412;
    var YAHOO_WEATHER_LON = -79.3900443;
    
    // API key for newsapi.org: https://newsapi.org/register
    var NEWS_API_KEY = "<<Insert API key>>";
    ```
2. Host the website somewhere
3. Download OragamiBrowser from Blackberry World, navigate to website
4. In the OragamiBrowser menu, turn on "Keep screen on"
5. Your desk clock is ready to go

### Credits

* [Yahoo! Weather] - Gets the current weather
* [News API] - Gets current news articles

![alt text](http://i.imgur.com/B6kpwkv.jpg "Playbook Deskclock")

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Yahoo! Weather]: <https://developer.yahoo.com/weather/>
   [News API]: <https://newsapi.org/>
