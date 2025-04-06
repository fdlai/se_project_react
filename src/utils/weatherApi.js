import clearDayImg from "../images/clear-day.svg";
import clearNightImg from "../images/clear-night.svg";
import cloudyDayImg from "../images/cloudy-day.svg";
import cloudyNightImg from "../images/cloudy-night.svg";
import rainyDayImg from "../images/rainy-day.svg";
import rainyNightImg from "../images/rainy-night.svg";
import stormyDayImg from "../images/stormy-day.svg";
import stormyNightImg from "../images/stormy-night.svg";
import snowyDayImg from "../images/snowy-day.svg";
import snowyNightImg from "../images/snowy-night.svg";
import foggyDayImg from "../images/foggy-day.svg";
import foggyNightImg from "../images/foggy-night.svg";
import defaultDayImg from "../images/day-default.svg";
import defaultNightImg from "../images/night-default.svg";

const APIkey = "6672e1b00e396679abc9813db01c701f";
const latitude = "27.964157";
const longitude = "-82.452606";

export const getWeather = (controller) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
    { signal: controller.signal }
  ).then((res) => {
    return processServerResponse(res);
  });
};

export const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export function getTempDescription(temperature) {
  if (temperature >= 80) {
    return "hot";
  } else if (temperature >= 68 && temperature < 80) {
    return "warm";
  } else if (temperature < 68) {
    return "cold";
  }
}

export function parseWeatherData(data) {
  const fahrenheit = data.main.temp;
  const celsius = ((fahrenheit - 32) * 5) / 9;
  const timeNow = Date.now() / 1000;
  const sunrise = data.sys.sunrise;
  const sunset = data.sys.sunset;
  const isDay = sunrise < timeNow && timeNow < sunset;
  //condition will be Clear, Clouds, Rain, Drizzle, etc...
  const condition = data.weather[0].main;

  return {
    ...data,
    temp: {
      F: Math.round(fahrenheit),
      C: Math.round(celsius),
    },
    condition,
    isDay,
    tempDescription: getTempDescription(fahrenheit),
  };
}

export function getWeatherCardImage(isDay, weatherCondition) {
  if (isDay) {
    switch (weatherCondition) {
      case "Clear":
        return clearDayImg;

      case "Clouds":
        return cloudyDayImg;

      case "Rain":
      case "Drizzle":
        return rainyDayImg;

      case "Thunderstorm":
        return stormyDayImg;

      case "Snow":
        return snowyDayImg;

      case "Fog":
      case "Mist":
      case "Smoke":
      case "Haze":
        return foggyDayImg;

      default:
        return defaultDayImg;
    }
  } else if (!isDay) {
    switch (weatherCondition) {
      case "Clear":
        return clearNightImg;

      case "Clouds":
        return cloudyNightImg;

      case "Rain":
      case "Drizzle":
        return rainyNightImg;

      case "Thunderstorm":
        return stormyNightImg;

      case "Snow":
        return snowyNightImg;

      case "Fog":
      case "Mist":
      case "Smoke":
      case "Haze":
        return foggyNightImg;

      default:
        return defaultNightImg;
    }
  }
}
