import './styles/style.css'
import { getWeather } from './weather.ts';
import { getJoke } from './joke.ts';


// Call functions
getJoke();          // Create joke at init
getWeather();       // Load weather data at init