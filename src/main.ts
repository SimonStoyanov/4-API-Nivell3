import './styles/style.css'
import { getWeather } from './weather.ts';
import { getJoke } from './joke.ts';


// Create joke at init
getJoke();
getWeather();