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

export function getTempDescription(temperature) {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66 && temperature <= 85) {
    return "warm";
  } else if (temperature <= 65) {
    return "cold";
  }
}

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
