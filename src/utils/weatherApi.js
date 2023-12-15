const APIkey = "6672e1b00e396679abc9813db01c701f";
const latitude = "27.964157";
const longitude = "-82.452606";

export const getWeather = (controller) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
    { signal: controller.signal }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((data) => {
      return data;
    });
};

export function getWeatherCardImage(isDay, weatherCondition) {
  if (isDay) {
    switch (weatherCondition) {
      case "Clear":
        return require("../images/clear-day.svg").default;

      case "Clouds":
        return require("../images/cloudy-day.svg").default;

      case "Rain" || "Drizzle":
        return require("../images/rainy-day.svg").default;

      case "Thunderstorm":
        return require("../images/stormy-day.svg").default;

      case "Snow":
        return require("../images/snowy-day.svg").default;

      case "Fog" || "Mist" || "Smoke" || "Haze":
        return require("../images/foggy-day.svg").default;

      default:
        return require("../images/day-default.svg").default;
    }
  } else if (!isDay) {
    switch (weatherCondition) {
      case "Clear":
        return require("../images/clear-night.svg").default;

      case "Clouds":
        return require("../images/cloudy-night.svg").default;

      case "Rain" || "Drizzle":
        return require("../images/rainy-night.svg").default;

      case "Thunderstorm":
        return require("../images/stormy-night.svg").default;

      case "Snow":
        return require("../images/snowy-night.svg").default;

      case "Fog" || "Mist" || "Smoke" || "Haze":
        return require("../images/foggy-night.svg").default;

      default:
        return require("../images/night-default.svg").default;
    }
  }
}

const weatherObj = {
  coord: {
    lon: -82.4526,
    lat: 27.9642,
  },
  weather: [
    {
      id: 803,
      main: "Clouds",
      description: "broken clouds",
      icon: "04n",
    },
  ],
  base: "stations",
  main: {
    temp: 61.79,
    feels_like: 61.81,
    temp_min: 59.9,
    temp_max: 63.9,
    pressure: 1026,
    humidity: 88,
  },
  visibility: 10000,
  wind: {
    speed: 11.5,
    deg: 20,
    gust: 20.71,
  },
  clouds: {
    all: 75,
  },
  dt: 1702538763,
  sys: {
    type: 2,
    id: 2078520,
    country: "US",
    sunrise: 1702555974,
    sunset: 1702593362,
  },
  timezone: -18000,
  id: 4174757,
  name: "Tampa",
  cod: 200,
};
