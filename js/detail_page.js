//지도 누르고 나서 색 유지시키는것

const paths = document.querySelectorAll("path.symbol");
const infoBox = document.getElementById("infoBox");

// 각 path에 이벤트 추가
paths.forEach((path) => {
  // 호버 시 관련 정보를 임시로 표시
  path.addEventListener("mouseover", () => {
    const info = path.getAttribute("href");
    // infoBox.textContent = `Hovering: ${info}`;
  });

  // 클릭 시 상태 유지 및 정보 업데이트
  path.addEventListener("click", () => {
    // 모든 path에서 "active" 클래스 제거
    paths.forEach((p) => p.classList.remove("active"));

    // 클릭한 path에만 "active" 클래스 추가
    path.classList.add("active");

    // 선택한 path의 정보를 infoBox에 표시
    const info = path.getAttribute("href");
    infoBox.textContent = `${info}`;
  });
});

//지도에서 누른 구의 정보를 보여주는 것
paths.forEach((path) => {
  path.addEventListener("click", (event) => {
    const regionName = document.querySelector("path.symbol");
    const dataValue = path.getAttribute("href");
    infoBox.textContent = `${dataValue}의 정보를 여기에 표시`;
    infoBox.style.display = "block";
  });
});

// Scroll to top
// scrollToTop = function() {
//   $('html, body').animate({scrollTop:0}, '300');
// }

document.querySelectorAll(".photo").forEach((photo) => {
  photo.addEventListener("click", () => {
    document
      .querySelectorAll(".photo")
      .forEach((p) => p.classList.remove("active"));

    photo.classList.add("active");
  });
});

// 추천 이미지 상시로 하나 열려있는 코드
const containers = document.querySelectorAll(".image-container");

containers[0].classList.add("active");

containers.forEach((container) => {
  container.addEventListener("click", () => {
    // 모든 컨테이너에서 active 제거
    containers.forEach((c) => c.classList.remove("active"));

    // 클릭한 컨테이너에 active 추가
    container.classList.add("active");
  });
});

// const images = document.querySelectorAll(".image-container img");

// document.querySelector(".image-container img").classList.add("active");

const infoText = document.getElementsByName("#area1");
infoText.textContent = districtInfo[initialDistrict];
