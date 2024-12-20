const API_KEY = "a0eb4c6eb0b1bb2fe1eedb7b2f0a62b3";
const city = "Seoul";
const lang = "kr";
const lat = "37.5519";
const lon = "126.9918";

const getWeather = async () => {
  const current = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Seoul&units=metric&appid=${API_KEY}&lang=${lang}`
  );

  const currentData = await current.json();

  const iconSection = document.querySelector(".current-icon");
  const icon = currentData.weather[0].icon;
  const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  iconSection.setAttribute("src", iconURL);

  const currentTempSection = document.querySelector(".temp");
  const currentTemp = `${currentData.main.temp}°C`;
  currentTempSection.textContent = currentTemp;

  const currentWeatherSection = document.querySelector(".weather");
  const currentWeather = currentData.weather[0].description;
  currentWeatherSection.textContent = currentWeather;

  const today = new Date();
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  //   let day = today.getDay(); // 요일
  const currentTodaySection = document.querySelector(".today");
  const currentToday = `${month}월 ${date}일`;
  currentTodaySection.textContent = currentToday;
  console.log(`${month}월 ${date}일`);

  //////////////////////////////////////////////////////////////////////////////////////////
  const forecast = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=Seoul&units=metric&lang=${lang}&appid=${API_KEY}`
  );
  const forecastData = await forecast.json();

  console.log(forecastData);

  const content = document.querySelectorAll(".icon");
  console.log(content);

  console.log(forecastData.list[0].main.temp);

  console.log(forecastData.list[0].weather[0].icon);

  for (let i = 0; i < 5; i++) {
    // const img = document.createElement("img");
    const div = document.createElement("div");

    const divText = forecastData.list[0].main.temp;
    console.log(divText);
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  const airPollution = await fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  const airPollutionData = await airPollution.json();

  console.log(forecastData);
};

getWeather();
