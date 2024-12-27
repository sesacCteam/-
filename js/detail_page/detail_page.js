//지도 누르고 나서 색 유지시키는것
let place;
const paths = document.querySelectorAll("path.symbol");
const infoBox = document.getElementById("infoBox");
let guname = "";
let placename = "";
// let placelist = [];
let koList = []; //구로 먼저 필터링하면 생기는 배열
let placeinfor = []; // 이름들을 필터링하면 생기는 배열
let finalarr = []; // 모든 배열들을 모아서 마지막에 객체 만드려고 선언
let rowlength = [];
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
    guname = path.getAttribute("alt");
    infoBox.textContent = `${dataValue}의 정보를 여기에 표시`;
    infoBox.style.display = "block";
    console.log(guname);
    getLocalPlace();
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

// const infoText = document.getElementsByName("#area1");
// infoText.textContent = districtInfo[initialDistrict];

//await 써야 데이터 받아옴
//async 가 await 짝
const getLocalPlace = async () => {
  // 클릭했을때 이미 데이터가 있다면 한번 초기화 하기
  if (koList !== null || placeinfor !== null || finalarr !== null) {
    koList = [];
    placeinfor = [];
    finalarr = [];
  }





  // console.log(test);

  for (let i = 0; i <3; i++) {
    if (i == 0){
      place = await fetch(
        `http://openapi.seoul.go.kr:8088/705277455931396a3130314a4e647645/json/TbVwAttractions/1/1000`
      );
    }else if( i==1){
      place = await fetch(
        `http://openapi.seoul.go.kr:8088/705277455931396a3130314a4e647645/json/TbVwAttractions/1001/2000`
      );
    }else if(i == 2){
      place = await fetch(
       `http://openapi.seoul.go.kr:8088/705277455931396a3130314a4e647645/json/TbVwAttractions/2001/2199`
    );
    }
    const placeData = await place.json();
    console.log(placeData)


    // console.log(i)
    rowlength = placeData.TbVwAttractions.row.length;

    for(j=0; j<rowlength; j++){
      const lang = placeData.TbVwAttractions.row[j].LANG_CODE_ID; 
      // console.log(lang)

      let test = placeData.TbVwAttractions.row[j].NEW_ADDRESS;
      const nametest = placeData.TbVwAttractions.row[j].POST_SJ;
      if (lang === "ko") {

        koList.push(test, nametest);
        // console.log(koList);
  
        // let result = placeData.filter((placeData.TbVwAttractions.row[0].LANG_CODE_ID) => placeData.TbVwAttractions.row[0].LANG_CODE_ID ==='');
      }

    }

  }
      
// console.log(koList)
  console.log( 'for 문 밖에 >>>>>>>>>>>>>>>>>>>>>>',koList);

  // 구 이름으로 필터 하기
  const placelist = koList.filter(function (koli, i) {
    // console.log('filter 함수 안에 >>>>>>>>>>',koli);
    if (koli.includes(guname)) {
      console.log("includes 안에 >>>>>>>>>>>>>>", koli.includes(guname));
      // placename.push(koList[i+1])
      (placename = koList[i + 1]), placeinfor.push(placename);

      return koli;
    }
  });

  // console.log('여기에 식당이름 나오면 좋겠다.',placename);

  // console.log('식당 이름 >>>>>>>>>' , placeinfor)
  // console.log('마지막 placelist',placelist)
  // 이름배열,주소배열을 하나의 객체로 만들기
  for (i = 0; i < placeinfor.length; i++) {
    let objs = {
      id: i,
      name: placeinfor[i],
      address: placelist[i],
    };
    finalarr.push(objs);
  }
  // 객체 완성된거 보는거
  console.log(finalarr);
  // 이름 불러오는법
  // console.log(finalarr[0].name);

  // console.log("잘됨! ", placelist);
  // 필터로 반복문을 만들어서 용산이라는 글자가 나올때까지 걸르는것

  // 필터한거 화면에 추가
  const infoBox = document.querySelector('#infoBox')
  const placetitle = document.createElement('h2')
  placetitle.textContent = guname;
  infoBox.append(placetitle);

  for(i=0 ; i<finalarr.length;i++){
    let finalarrName = document.createElement('h3');
    finalarrName.textContent = finalarr[i].name
    let finalarrAdd = document.createElement('h4');
    finalarrAdd.textContent = finalarr[i].address
    infoBox.append(finalarrName);
    infoBox.append(finalarrAdd);
  }





};

//데이터 정보 HTML에 표시하는 코드

// document.addEventListener("DOMContentLoaded", () => {
//   const symbolData = {
//     종로구: {
//       population: 100000,
//     },
//   };

//   const symbols = document.querySelectorAll("path.symbol");

//   districtData.forEach((district) => {
//     district.addEventListener("click", (event) => {
//       const symbolId = event.target.id;
//       const data = symbolData[symbolId];

//       if (data) {
//         document.getElementById("symbol-name").textContent = symbolId;
//         // document.getElementById('symbol-description').textContent = data.description
//         // document.getElementById('symbol-population').textContent = data.population.
//         // document.getElementById('symbol-area').textContent =
//       }
//     });
//   });
// });
// 작동안됨
