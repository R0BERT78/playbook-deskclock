$( document ).ready(function() {
	// Current location (for Yahoo weather)
	var YAHOO_WEATHER_LAT = 43.212360;
	var YAHOO_WEATHER_LON = -79.779831;
	
	// API key for newsapi.org: https://newsapi.org/register
	var NEWS_API_KEY = "<<Insert API key>>";
	
	// Refresh intervals
	var UPDATE_TIME_INTERVAL = 1000 * 60;
	var UPDATE_WEATHER_INTERVAL = 1000 * 60 * 60;
	var UPDATE_NEWS_INTERVAL = 1000 * 60 * 60;
	var CYCLE_NEWS_INTERVAL = 1000 * 60;

	// Updates the clock and date
	function updateDateTime() {
		$('#clock').html(moment().format('h:mm'));
		$('#date').html(moment().format('ddd[<br>]MMM[<br><span id="date-day">]D[</span>]').toUpperCase());
	}
	
	// Retrieves weather periodically
	function updateWeather(){
		$.ajax({
			url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text%3D%22(" + YAHOO_WEATHER_LAT + "%2C" + YAHOO_WEATHER_LON + ")%22)%20and%20u%3D%22C%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
			dataType: 'json'
		}).done(function(data) {
			try {
				var forecast = data.query.results.channel.item.forecast[0];
				$('#weather-summary').html(forecast.text);
				$('#weather-low').html(forecast.low);
				$('#weather-high').html(forecast.high);
				$('#weather-icon').html(setWeatherIcon(forecast.code));
			} catch (err) {
				console.log(err.message);
				updateWeather();
			}
		});
	}
	
	// Retrieves news articles periodically
	var cycleNewsInterval = null;
	function updateNews(){
		$.ajax({
			url: "https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=" + NEWS_API_KEY,
			dataType: 'json'
		}).done(function(data) {
			try {
				var articles = data.articles;
				var index = 0;
				if(cycleNewsInterval) {
					clearInterval(cycleNewsInterval);
				}
				setNewsArticle(data.articles[index]);
				cycleNewsInterval = setInterval(function(){
					index++;
					index = index % articles.length;
					setNewsArticle(data.articles[index]);
				}, CYCLE_NEWS_INTERVAL);
			} catch (err) {
				console.log(err.message);
			}
		});
	}
	
	// Updates the news section with the given article
	function setNewsArticle(article){
		$('#news-title').html(article.title);
		$('#news-description').html(article.description);
		$('#news-image').attr("src", article.urlToImage);
		$("#news").click(function() {
			window.open(article.url);
		});
	}
	
	// Call update methods on load, and set an interval so it refreshes 
	updateDateTime();
	updateWeather();
	updateNews();
	setInterval(updateDateTime, UPDATE_TIME_INTERVAL);
	setInterval(updateWeather, UPDATE_WEATHER_INTERVAL);
	setInterval(updateNews, UPDATE_NEWS_INTERVAL);
	
	// Helper function to turn a Yahoo weather code into a weather icon class
	function setWeatherIcon(condid) {
		var icon = '';
		switch(condid) {
			case '0': icon  = 'wi-tornado';
			break;
			case '1': icon = 'wi-storm-showers';
			break;
			case '2': icon = 'wi-tornado';
			break;
			case '3': icon = 'wi-thunderstorm';
			break;
			case '4': icon = 'wi-thunderstorm';
			break;
			case '5': icon = 'wi-snow';
			break;
			case '6': icon = 'wi-rain-mix';
			break;
			case '7': icon = 'wi-rain-mix';
			break;
			case '8': icon = 'wi-sprinkle';
			break;
			case '9': icon = 'wi-sprinkle';
			break;
			case '10': icon = 'wi-hail';
			break;
			case '11': icon = 'wi-showers';
			break;
			case '12': icon = 'wi-showers';
			break;
			case '13': icon = 'wi-snow';
			break;
			case '14': icon = 'wi-storm-showers';
			break;
			case '15': icon = 'wi-snow';
			break;
			case '16': icon = 'wi-snow';
			break;
			case '17': icon = 'wi-hail';
			break;
			case '18': icon = 'wi-hail';
			break;
			case '19': icon = 'wi-cloudy-gusts';
			break;
			case '20': icon = 'wi-fog';
			break;
			case '21': icon = 'wi-fog';
			break;
			case '22': icon = 'wi-fog';
			break;
			case '23': icon = 'wi-cloudy-gusts';
			break;
			case '24': icon = 'wi-cloudy-windy';
			break;
			case '25': icon = 'wi-thermometer';
			break;
			case '26': icon = 'wi-cloudy';
			break;
			case '27': icon = 'wi-night-cloudy';
			break;
			case '28': icon = 'wi-day-cloudy';
			break;
			case '29': icon = 'wi-night-cloudy';
			break;
			case '30': icon = 'wi-day-cloudy';
			break;
			case '31': icon = 'wi-night-clear';
			break;
			case '32': icon = 'wi-day-sunny';
			break;
			case '33': icon = 'wi-night-clear';
			break;
			case '34': icon = 'wi-day-sunny-overcast';
			break;
			case '35': icon = 'wi-hail';
			break;
			case '36': icon = 'wi-day-sunny';
			break;
			case '37': icon = 'wi-thunderstorm';
			break;
			case '38': icon = 'wi-thunderstorm';
			break;
			case '39': icon = 'wi-thunderstorm';
			break;
			case '40': icon = 'wi-storm-showers';
			break;
			case '41': icon = 'wi-snow';
			break;
			case '42': icon = 'wi-snow';
			break;
			case '43': icon = 'wi-snow';
			break;
			case '44': icon = 'wi-cloudy';
			break;
			case '45': icon = 'wi-lightning';
			break;
			case '46': icon = 'wi-snow';
			break;
			case '47': icon = 'wi-thunderstorm';
			break;
			case '3200': icon = 'wi-cloud';
			break;
			default: icon = 'wi-cloud';
			break;
		}
		return '<i class="wi '+icon+'"></i>';
	}
});
