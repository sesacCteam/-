const API_KEY = "a0eb4c6eb0b1bb2fe1eedb7b2f0a62b3";
const city = "Seoul";
const lang = "kr";
const lat = "37.5519";
const lon = "126.9918";

const getWeather = async () => {
  // 현재 데이터 받아오기
  const current = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Seoul&units=metric&appid=${API_KEY}&lang=${lang}`
  );
  const currentData = await current.json();

  // 아이콘
  const iconSection = document.querySelector(".current-icon");
  const icon = currentData.weather[0].icon;
  const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  iconSection.setAttribute("src", iconURL);

  // 온도
  const currentTempSection = document.querySelector(".temp");
  const currentTemp = `${currentData.main.temp.toFixed(1)}°C`;
  currentTempSection.textContent = currentTemp;

  // 날씨 상태
  const currentWeatherSection = document.querySelector(".weather");
  const currentWeather = currentData.weather[0].description;
  currentWeatherSection.textContent = currentWeather;

  // 풍속
  const currentWindSpeedSection = document.querySelector(".wind-speed");
  const currentWindSpeed = `${currentData.wind.speed}m/s`;
  currentWindSpeedSection.textContent = currentWindSpeed;

  // 풍향
  const currentWindDegSection = document.querySelector(".wind-deg");
  const currentWindDeg = `${currentData.wind.deg}°`;
  currentWindDegSection.textContent = currentWindDeg;

  // 지상 대기압
  const currentGrndLevelSection = document.querySelector(".grnd-level");
  const currentGrndLevel = `${currentData.main.grnd_level}hpa`;
  currentGrndLevelSection.textContent = currentGrndLevel;

  // 해수면 대기압
  const currentSeaLevelSection = document.querySelector(".sea-level");
  const currentSeaLevel = `${currentData.main.sea_level}hpa`;
  currentSeaLevelSection.textContent = currentSeaLevel;

  // 일출
  const currentSunriseSection = document.querySelector(".sunrise");
  const currentSunrise = currentData.sys.sunrise;
  currentSunriseSection.textContent = `AM ${convertSuntime(currentSunrise)}`;

  // 일몰
  const currentSunsetSection = document.querySelector(".sunset");
  const currentSunset = currentData.sys.sunset;
  currentSunsetSection.textContent = `PM ${convertSuntime(currentSunset)}`;

  // 습도
  const currentHumiditySection = document.querySelector(".humidity");
  const currentHumidity = currentData.main.humidity;
  currentHumiditySection.textContent = `${currentHumidity}%`;

  // 기압
  const currentGrndLevel2Section = document.querySelector(".grnd_level");
  const currentGrndLevel2 = currentData.main.grnd_level;
  currentGrndLevel2Section.textContent = `${currentGrndLevel2}hPa`;

  // 가시거리
  const currentVisibilitySection = document.querySelector(".visibility");
  const currentVisibility = currentData.visibility;
  currentVisibilitySection.textContent = `${currentVisibility}m`;

  // 체감온도
  const currentFeelsLikeSection = document.querySelector(".feels_like");
  const currentFeelsLike = currentData.main.feels_like;
  currentFeelsLikeSection.textContent = `${currentFeelsLike.toFixed(1)}°C`;

  // 일몰 일출 시간 변환 함수
  function convertSuntime(timestamp) {
    // 밀리세컨즈로 변환하여 Date 객체 생성
    const date = new Date(timestamp * 1000);
    // 시간, 분 추출 + 두 자리 포맷팅
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  // 오늘 날짜
  const today = new Date();
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  //   let day = today.getDay(); // 요일
  const currentTodaySection = document.querySelector(".today");
  const currentToday = `${month}월 ${date}일`;
  currentTodaySection.textContent = currentToday;

  ////////////////////////////////////////////////////////////////////////////////////////////
  // 날씨 예보 데이터 받아오기
  const forecast = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=Seoul&units=metric&lang=${lang}&appid=${API_KEY}`
  );
  const forecastData = await forecast.json();

  // 현재 날씨 목록
  for (let i = 0; i < 6; i++) {
    const right_top_wrapper = document.querySelector(".right-top-wrapper");

    const right_top_container = document.createElement("div");
    right_top_container.classList.add("right-top-container");
    right_top_wrapper.append(right_top_container);

    const time = document.createElement("h4");
    const timeValue = forecastData.list[i].dt_txt;
    let timeText = Number(timeValue.split(" ")[1].split(":")[0]) + 9;

    if (timeText >= 24) timeText -= 24;

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

    // 아이콘
    const iconScr = forecastData.list[i].weather[0].icon;
    const iconURL = `http://openweathermap.org/img/wn/${iconScr}@2x.png`;
    const icon = document.createElement("img");
    icon.setAttribute("src", iconURL);
    icon.classList.add("forecastData-icon");
    right_top_container.append(icon);

    // 온도
    const div = document.createElement("h4");
    const divText = forecastData.list[i].main.temp;
    div.innerText = `${divText.toFixed(1)}°`;
    right_top_container.append(div);
  }

  // 날씨 예보 목록 생성 함수
  for (let i = 0; i < forecastData.list.length; i = i + 8) {
    const forecast_list = document.querySelector(".forecast-list");

    const forecast_list_container = document.createElement("div");
    forecast_list_container.classList.add("forecast-list-container");
    forecast_list.append(forecast_list_container);

    const forecast_left = document.createElement("div");
    forecast_left.classList.add("forecast-left");
    forecast_list_container.append(forecast_left);

    // 아이콘
    const iconScr = forecastData.list[i].weather[0].icon;
    const iconURL = `http://openweathermap.org/img/wn/${iconScr}@2x.png`;
    const icon = document.createElement("img");
    icon.setAttribute("src", iconURL);
    icon.classList.add("forecastData-icon2");
    forecast_left.append(icon);

    // 최대 온도
    const max_tamp = document.createElement("h4");
    const max_tamp_Value = forecastData.list[i].main.temp_max;
    max_tamp.innerText = `${max_tamp_Value.toFixed(1)}°`;
    forecast_left.append(max_tamp);

    // 슬래쉬
    const dash = document.createElement("h4");
    dash.innerText = "/";
    forecast_left.append(dash);

    // 최소 온도
    const min_tamp = document.createElement("h4");
    const min_tamp_Value = forecastData.list[i].main.temp_min;
    min_tamp.innerText = `${min_tamp_Value.toFixed(1)}°`;
    forecast_left.append(min_tamp);

    // 날짜 함수
    const date = document.createElement("h4");
    const date_Value = forecastData.list[i].dt_txt;
    let date_ValueFn = date_Value.split(" ")[0].split("-");
    date_ValueFn = `${date_ValueFn[1]}월 ${date_ValueFn[2]}일`;
    date.innerText = date_ValueFn;
    forecast_left.append(date);
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  // 공기 오염도 데이터
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
