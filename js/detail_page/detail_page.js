//지도 누르고 나서 색 유지시키는것
let place;
const paths = document.querySelectorAll("path.symbol");
const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';

// const infoBox = document.getElementById("infoBox");
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
    // infoBox.textContent = `${info}`;
  });
});

//지도에서 누른 구의 정보를 보여주는 것
paths.forEach((path) => {
  path.addEventListener("click", (event) => {
    //배열에 null이 아니면 초기화해라
    const infoBox = document.querySelector("#infoBox");
    infoBox.innerHTML = ""; // 기존 정보를 초기화

    const cardList = document.querySelector("#cardList");
    cardList.innerHTML = ""; // 카드 리스트 초기화

    const regionName = document.querySelector("path.symbol");
    const dataValue = path.getAttribute("href");
    guname = path.getAttribute("alt");
    path.removeAttribute("href");
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
  container.addEventListener("mouseover", () => {
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
      place = await fetch('/api/705767596565686735304e50706277/TbVwAttractions/1/1000');
      console.log('for문밖에',place)

  for (let i = 0; i < 3; i++) {
    if (i == 0) {
      place = await fetch('/api/705767596565686735304e50706277/TbVwAttractions/1/1000');
      console.log('test >>>',place);
    } else if (i == 1) {
      place = await fetch('/api/705767596565686735304e50706277/TbVwAttractions/1001/2000');
            console.log('test >>>',place);

    } else if (i == 2) {
      place = await fetch('/api/705767596565686735304e50706277/TbVwAttractions/2001/2199');
            console.log('test >>>',place);

    }
    const placeData = await place.json();
    console.log(placeData);

    // console.log(i)
    rowlength = placeData.TbVwAttractions.row.length;

    for (j = 0; j < rowlength; j++) {
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
  console.log("for 문 밖에 >>>>>>>>>>>>>>>>>>>>>>", koList);

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
  const infoBox = document.querySelector("#infoBox");
  const placetitle = document.createElement("h2");
  placetitle.textContent = guname;
  infoBox.append(placetitle);

  // for (i = 0; i < finalarr.length; i++) {
  //   let finalarrName = document.createElement("h3");
  //   finalarrName.textContent = finalarr[i].name;
  //   let finalarrAdd = document.createElement("h4");
  //   finalarrAdd.textContent = finalarr[i].address;
  //   cardList.append(finalarrName);
  //   cardList.append(finalarrAdd);

  //   cardList = document.querySelector("#cardList");
  //   cardList.classList.add("card-grid");

  //   placeCard = document.createElement("span");
  //   placeCard.classList.add("card");

  //   placeImg = document.createElement("img");
  //   placeImg.classList.add("card-top");
  //   img.setAttribute(
  //     "src",
  //     "./src/image/detail_page/서울시 광고1png.png" //이미지 사진 주소
  //   );
  //   placeText = document.createElement("div");
  //   placeText.classList.add("card-bottom");
  //   placeCard.append(placeImg, placeText);
  // }

  // 데이터를 가공 및 준비
  let preparedCards = []; // 가공된 데이터를 담을 배열
  // function sanitizeFileName(name) {
  //   return name.replace(/[^a-zA-Z0-9가-힣]/g, "").replace(/\s+/g, "-");
  // }

  for (let i = 0; i < finalarr.length; i++) {
    let cardData = {
      name: finalarr[i].name,
      address: finalarr[i].address,
      image: `/src/image/detail_page/${finalarr[i].name.replace(
        /  /g,
        ""
      )}.jpg`, // 각 카드에 사용할 이미지 경로
    };
    preparedCards.push(cardData); // 가공된 카드 데이터를 배열에 추가
  }

  // 화면에 카드 생성
  for (let i = 0; i < preparedCards.length; i++) {
    let cardData = preparedCards[i]; // 각 카드 데이터 가져오기

    // 카드 컨테이너 가져오기
    let cardList = document.querySelector("#cardList");
    cardList.classList.add("card-grid");

    // 카드 요소 생성
    let placeCard = document.createElement("span");
    placeCard.classList.add("card");

    // 카드 상단 이미지
    let placeImg = document.createElement("img");
    placeImg.classList.add("card-top");
    placeImg.setAttribute("src", cardData.image); // 이미지 설정
    placeCard.appendChild(placeImg);

    placeImg.style.width = "100%";
    placeImg.style.height = "100%";
    placeImg.style.objectFit = "cover";

    // 이미지 안불러와졌을떄
    placeImg.addEventListener("error", () => {
      placeImg.src = "/src/image/main_page/seoulseoullogo.png"; // 기본 이미지 경로
    });

    // 카드 하단 텍스트 컨테이너
    let placeText = document.createElement("div");
    placeText.classList.add("card-bottom");

    // placeText.style.backgroundColor = "#5eb3ff";
    placeText.style.width = "100%"; // 너비를 부모 요소에 맞춤
    // placeText.style.height = "100%"; // 높이를 텍스트에 맞게 자동 조정
    placeText.style.wordBreak = "break-word"; // 긴 단어를 줄바꿈
    placeText.style.whiteSpace = "normal"; // 줄바꿈 허용

    // 카드 제목 추가
    let placeTitle = document.createElement("h3");
    placeTitle.textContent = cardData.name;
    placeText.appendChild(placeTitle);

    // placeTitle.style.color = "black";
    // placeTitle.style.fontSize = "2rem";
    // placeTitle.style.paddingTop = "3px";

    // 카드 주소 추가
    let placeAddress = document.createElement("h4");
    placeAddress.textContent = cardData.address;

    placeAddress.style.wordBreak = "break-word";
    placeAddress.style.lineHeight = "1.2"; // 줄 간격 조정
    placeAddress.style.maxHeight = "2.4rem"; // 최대 높이 제한 (줄 간격 * 최대 줄 수)
    // placeAddress.style.fontSize = "1.6rem";
    placeAddress.style.paddingTop = "3px";

    placeText.appendChild(placeAddress);

    // 카드에 하단 텍스트 추가
    placeCard.appendChild(placeText);

    // 카드 리스트에 카드 추가
    cardList.appendChild(placeCard);
  }
};

// ///////////////////
// const infoBox = document.querySelector("#infoBox");
// infoBox.innerHTML = ""; // 이전 내용 초기화

// // 제목 추가
// const placetitle = document.createElement("h2");
// placetitle.textContent = guname;
// infoBox.appendChild(placetitle);

// // 카드 리스트 컨테이너 생성
// const cardList = document.createElement("div");
// cardList.classList.add("card-grid");
// infoBox.appendChild(cardList);

// // 카드 생성 및 추가
// for (let i = 0; i < finalarr.length; i++) {
//   // 카드 컨테이너
//   const card = document.createElement("div");
//   card.classList.add("card");

//   // 카드 상단 이미지
//   const cardImage = document.createElement("div");
//   cardImage.classList.add("card-top");
//   cardImage.style.backgroundImage = `url('/path/to/image.jpg')`; // 이미지 경로 추가 (임시)

//   // 카드 하단 텍스트
//   const cardText = document.createElement("div");
//   cardText.classList.add("card-bottom");

//   // 장소 이름
//   const finalarrName = document.createElement("h3");
//   finalarrName.textContent = finalarr[i].name;

//   // 장소 주소
//   const finalarrAdd = document.createElement("h4");
//   finalarrAdd.textContent = finalarr[i].address;

//   // 텍스트를 카드 하단에 추가
//   cardText.appendChild(finalarrName);
//   cardText.appendChild(finalarrAdd);

//   // 이미지와 텍스트를 카드에 추가
//   card.appendChild(cardImage);
//   card.appendChild(cardText);

//   // 카드 리스트에 카드 추가
//   cardList.appendChild(card);
// }

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
