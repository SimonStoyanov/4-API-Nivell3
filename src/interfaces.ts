export interface JsonRes {
    id: string,
    joke: string,
    status: number
}

export interface JsonWeather {
    coord: {
        lon: number,
        lat: number
    },
    weather: {
        id: number,
        main: string,
        description: string,
        icon: string
    }[],
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number,
        gust: number
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    id: number,
    name: string,
    cod: number
}

/**
 * @joke the joke in string
 * @score (optional) only can be of 1, 2 or 3
 * @date date of the report in ISO format
 */
export interface Report {
    joke: string,
    score?: 1 | 2 | 3 | undefined;
    date: string
}