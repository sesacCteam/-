
let cardList; // 카드 전체 영역
let placeCard; // 카드 1장
let placeImg; // 카드에서 위에꺼
let placeText; // 카드에서 아래꺼
let placeNames = [];

function clickEvent (){
    let dest = document.querySelector('#dest').value

    // console.log('카드 리스트 콘솔 출력',cardList)
    // console.log('하위 span들 선택', document.querySelectorAll('#cardList > span'))
    // 카드들이 생성되어있다면 삭제하기
    if(cardList!= null){
        const allspan = document.querySelectorAll('#cardList > span');
        for(i=0 ; i< allspan.length ; i++){
            const removeSpan = document.querySelector('#cardList > span')
            // removeSpan.classList.remove('card')
            cardList.classList.remove('card-grid')
            removeSpan.remove()

        }
        // console.log('section이 나와야함',parent)
        // parent.removeChild(removeSpan);
        console.log('카드 여러개 생김 여기서 이제 지워야해')
   
    }


    // alert(`${dest}라고 입력하셨습니다.`)   
    // 장소 검색 객체 생성
var ps = new kakao.maps.services.Places(); 

// console.log(ps)

// 키워드로 장소를 검색합니다
ps.keywordSearch(`${dest}`, placesSearchCB); 

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        for (var i=0; i<data.length; i++) {
            displayMarker(data[i]);    
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }       

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    } 
}


// 지도에 마커 표시하는 코드
function displayMarker(place) {

    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x) 
    });

    // 마커에 클릭이벤트를 등록합니다
    window.kakao.maps.event.addListener(marker, 'click', function() {
        // console.log(marker)
        // console.log(map)
        // console.log(place)
        // 이미 한번 클릭해서 카드가 생셩되어있다면 아래 내용 실행
        if(placeNames.includes(place.place_name)){
            console.log('이미 한번 클릭한 식당입니다.')
            // 이거 지금 됐다가 안됐다가 그럼 이거 공백이 아이디에 들어가서임
            const moreClick = document.querySelector(`#${place.place_name}`);
            // console.log(moreClick);
            moreClick.remove();
            //이미 클릭한 식당이라면 배열에서 삭제
            placeNames = placeNames.filter(function(e){
                return e != place.place_name; 
            })
            console.log(placeNames)
            // 클릭한 마커에 해당하는 식당 카드 삭제

            // 다 취소 눌렀다면 여백 제거
            if(placeNames.length == 0){
                cardList.classList.remove('card-grid')
            }

            // moreClick.remove()
        }else{
            placeNames.push(place.place_name);
            console.log(placeNames)

        var infowindow = new window.kakao.maps.InfoWindow({});
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);

    //    지도 밑에 주소에대한 설명 추가되는 코드 시작
        cardList = document.querySelector('#cardList')
        cardList.classList.add('card-grid');
        // 카드형태 만들기
        placeCard = document.createElement('span');
        placeCard.classList.add('card');
        // 지역 이름으로 카드에 id추가
        placeCard.setAttribute('id',place.place_name)
        cardList.append(placeCard)
        // 카드 안에 상자 2개로 나누기(이미지칸, 정보칸)
        placeImg = document.createElement('div');
        placeImg.classList.add('card-top');
        placeText = document.createElement('div');
        placeText.classList.add('card-bottom');
        placeCard.append(placeImg,placeText);
        // 이미지칸에 카테고리별로 이미지 변경
        const placebackImg = document.createElement('img');
       const category = place.category_group_code;
        if(category == "FD6"){
            placebackImg.setAttribute('src','https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/d5/ce/6d/savor-the-exquisite-taste.jpg?w=600&h=-1&s=1')
            placebackImg.classList.add('cardImg')
            placeImg.append(placebackImg)
        }else if(category == "AT4"){
            placebackImg.setAttribute('src','https://pimg.mk.co.kr/meet/neds/2020/12/image_readtop_2020_1263248_16074725144464348.jpg')
            placebackImg.classList.add('cardImg')
            placeImg.append(placebackImg)
        }
        else{
            placebackImg.setAttribute('src','https://www.thinkfood.co.kr/news/photo/201911/85600_110319_1815.jpg')
            placebackImg.classList.add('cardImg')
            placeImg.append(placebackImg)
        }
    
        //정보칸에 이름 입력
        const placeTitle = document.createElement('h3');
        placeTitle.textContent = place.place_name;
        placeText.append(placeTitle);
        //정보칸에 주소 입력
        const placeAdd = document.createElement('h4');
        placeAdd.textContent = place.address_name;
        placeText.append(placeAdd)

        var location = document.querySelector(".card-bottom").offsetTop // 버튼이 생성된 위치의 좌표 구하기
        window.scrollTo({top:location,left:0,behavior:'smooth'}); // 구한 좌표로 스크롤
        }
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        // console.log(place)
        // console.log(place.place_name);
        // console.log()
        

        // 식당이름 출력
        // const addtitle = document.createElement('h2');
        // addtitle.innerHTML = place.place_name;
        // addtitle.classList.add('placetitle')
        // addressInfor.append(addtitle);
        // // 식당 주소 출력
        // const addsubtitle = document.createElement('h3');
        // addsubtitle.innerHTML = `${place.address_name}`
        // addtitle.classList.add('placeaddress')
        // addressInfor.append(addsubtitle)
        // // 장소 전화번호 출력
        // const phone = document.createElement('h3');
        // phone.innerHTML = `${place.phone}`
        // addressInfor.append(phone)  
        // // 길찾기 버튼 출력
        // const findLoadbtn = document.createElement('button');
        // findLoadbtn.innerHTML = '자세히 보기'
        // addressInfor.append(findLoadbtn)
        // findLoadbtn.classList.add('movekakaobtn')
        // console.log(place.id)
        // findLoadbtn.setAttribute('onclick',`location.href = '${place.place_url}'`)
        // ///////////////////////////////////////////////////////////////////////





        // function test(){
        //     location.href = `https://map.kakao.com/link/map/${place.id}`
        // }
    });

   
}
}
// 위도와 경도를 알아오는 코드
navigator.geolocation.getCurrentPosition(function(position) {

        lat = position.coords.latitude, // 위도
        lon = position.coords.longitude; // 경도

    });

// 지도 완성하는 코드
    var container = document.getElementById('map');
    var options = {
     center: new window.kakao.maps.LatLng(37.5756032, 126.9767925),
    level: 3
    };
    var map = new window.kakao.maps.Map(container, options);
    // console.log(map)
// console.log(window)


