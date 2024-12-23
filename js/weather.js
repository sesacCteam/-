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

  const currentWindSpeedSection = document.querySelector(".wind-speed");
  const currentWindSpeed = `${currentData.wind.speed}m/s`;
  currentWindSpeedSection.textContent = currentWindSpeed;

  const currentWindDegSection = document.querySelector(".wind-deg");
  const currentWindDeg = `${currentData.wind.deg}°`;
  currentWindDegSection.textContent = currentWindDeg;

  const currentGrndLevelSection = document.querySelector(".grnd-level");
  const currentGrndLevel = `${currentData.main.grnd_level}hpa`;
  currentGrndLevelSection.textContent = currentGrndLevel;

  const currentSeaLevelSection = document.querySelector(".sea-level");
  const currentSeaLevel = `${currentData.main.sea_level}hpa`;
  currentSeaLevelSection.textContent = currentSeaLevel;

  const currentSunriseSection = document.querySelector(".sunrise");
  const currentSunrise = currentData.sys.sunrise;
  currentSunriseSection.textContent = `AM ${convertSuntime(currentSunrise)}`;

  const currentSunsetSection = document.querySelector(".sunset");
  const currentSunset = currentData.sys.sunset;
  currentSunsetSection.textContent = `PM${convertSuntime(currentSunset)}`;

  function convertSuntime(timestamp) {
    // 밀리세컨즈로 변환하여 Date 객체 생성
    const date = new Date(timestamp * 1000);
    // 시간, 분 추출 + 두 자리 포맷팅
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  const today = new Date();
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  //   let day = today.getDay(); // 요일
  const currentTodaySection = document.querySelector(".today");
  const currentToday = `${month}월 ${date}일`;
  currentTodaySection.textContent = currentToday;

  //////////////////////////////////////////////////////////////////////////////////////////
  const forecast = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=Seoul&units=metric&lang=${lang}&appid=${API_KEY}`
  );
  const forecastData = await forecast.json();

  const content = document.querySelectorAll(".icon");
  function time(timeText) {
    if (timeText > 13) {
      return `오후 ${timeText - 12}시`;
    } else {
      return `오전 ${timeText}시`;
    }
  }

  console.log(forecastData);

  // 현재 날씨 목록
  for (let i = 0; i < 6; i++) {
    const right_top_wrapper = document.querySelector(".right-top-wrapper");

    const right_top_container = document.createElement("div");
    right_top_container.classList.add("right-top-container");
    right_top_wrapper.append(right_top_container);

    // document.querySelector(".right-top-wrapper").append(right_top_container);

    console.log(forecastData);
    const time = document.createElement("div");
    const timeValue = forecastData.list[i].dt_txt;
    let timeText = Number(timeValue.split(" ")[1].split(":")[0]);
    console.log(timeValue);
    console.log(timeText);
    if (timeText === 0) {
      timeText = "오전 12시";
    } else if (timeText > 13) {
      timeText = `오후 ${timeText - 12}시`;
    } else if (timeText === 12) {
      timeText = "오후 12시";
    } else {
      timeText = `오전 ${timeText}시`;
    }
    time.innerText = timeText;
    right_top_container.append(time);

    // document.querySelector(".right_top_container").append(time);

    const iconScr = forecastData.list[i].weather[0].icon;
    const iconURL = `http://openweathermap.org/img/wn/${iconScr}@2x.png`;
    const icon = document.createElement("img");
    icon.setAttribute("src", iconURL);
    // document.querySelector(".right_top_container").append(icon);
    right_top_container.append(icon);
    // console.log(iconScr);

    const div = document.createElement("div");
    const divText = forecastData.list[i].main.temp;
    div.innerText = `${divText}°`;
    right_top_container.append(div);
    // document.querySelector(".right_top_container").append(div);
  }

  for (let i = 0; i < forecastData.list.length; i = i + 8) {
    const forecast_list = document.querySelector(".forecast-list");

    const forecast_list_container = document.createElement("div");
    forecast_list_container.classList.add("forecast-list-container");
    forecast_list.append(forecast_list_container);

    const forecast_left = document.createElement("div");
    forecast_left.classList.add("forecast-left");
    forecast_list_container.append(forecast_left);

    const iconScr = forecastData.list[i].weather[0].icon;
    const iconURL = `http://openweathermap.org/img/wn/${iconScr}@2x.png`;
    const icon = document.createElement("img");
    icon.setAttribute("src", iconURL);
    forecast_left.append(icon);

    const max_tamp = document.createElement("div");
    const max_tamp_Value = forecastData.list[i].main.temp_max;
    max_tamp.innerText = `${max_tamp_Value}°`;
    forecast_left.append(max_tamp);
    forecast_left.append(max_tamp);

    const min_tamp = document.createElement("div");
    const min_tamp_Value = forecastData.list[i].main.temp_min;
    min_tamp.innerText = `${min_tamp_Value}°`;
    forecast_left.append(min_tamp);

    const date = document.createElement("div");
    const date_Value = forecastData.list[i].dt_txt;
    let date_ValueFn = date_Value.split(" ")[0].split("-");
    date_ValueFn = `${date_ValueFn[1]}월 ${date_ValueFn[2]}일`;
    date.innerText = date_ValueFn;
    forecast_left.append(date);

    console.log(date_ValueFn);

    console.log(forecastData.list[0].main.temp_max);

    // right_top_container.append(div);
  }

  console.log(forecastData.list);

  //////////////////////////////////////////////////////////////////////////////////////////
  const airPollution = await fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  const airPollutionData = await airPollution.json();

  const currentPm2_5Section = document.querySelector(".pm2_5");
  const currentPm2_5 = airPollutionData.list[0].components.pm2_5;
  currentPm2_5Section.textContent = currentPm2_5;

  const currentSo2Section = document.querySelector(".so2");
  const currentSo2 = airPollutionData.list[0].components.so2;
  currentSo2Section.textContent = currentSo2;

  const currentNo2Section = document.querySelector(".no2");
  const currentNo2 = airPollutionData.list[0].components.no2;
  currentNo2Section.textContent = currentNo2;

  const currentO3Section = document.querySelector(".o3");
  const currentO3 = airPollutionData.list[0].components.o3;
  currentO3Section.textContent = currentO3;
};

getWeather();
