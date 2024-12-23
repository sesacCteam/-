
let lat ;
let lot;

function clickEvent (){
    const dest = document.querySelector('#dest').value

    console.log(dest);

    // alert(`${dest}라고 입력하셨습니다.`)   
    // 장소 검색 객체 생성
var ps = new kakao.maps.services.Places(); 

console.log(ps)

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
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        console.log(place)
        console.log(place.place_name);
        // console.log()
        var infowindow = new window.kakao.maps.InfoWindow({});
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);

    //    지도 밑에 주소에대한 설명 추가되는 코드
        const mapdiv = document.querySelector('#map');
        const addressInfor = document.createElement('article');
        mapdiv.after(addressInfor)
        // 식당이름 출력
        const addtitle = document.createElement('h2');
        addtitle.innerHTML = place.place_name;
        addtitle.classList.add('placetitle')
        addressInfor.append(addtitle);
        // 식당 주소 출력
        const addsubtitle = document.createElement('h3');
        addsubtitle.innerHTML = `${place.address_name}`
        addtitle.classList.add('placeaddress')
        addressInfor.append(addsubtitle)
        // 장소 전화번호 출력
        const phone = document.createElement('h3');
        phone.innerHTML = `${place.phone}`
        addressInfor.append(phone)  
        // 길찾기 버튼 출력
        const findLoadbtn = document.createElement('button');
        findLoadbtn.innerHTML = '자세히 보기'
        addressInfor.append(findLoadbtn)
        findLoadbtn.classList.add('movekakaobtn')
        console.log(place.id)
        findLoadbtn.setAttribute('onclick',`location.href = '${place.place_url}'`)
        // 밑줄 생성
        const hr = document.createElement('hr')
        addressInfor.append(hr)
        // 생성된곳으로 스크롤
        var location = document.querySelector(".movekakaobtn").offsetTop // 좌표 구하기
        window.scrollTo({top:location,left:0,behavior:'smooth'});

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
console.log('lat >> ',lat)
// 지도 완성하는 코드
    var container = document.getElementById('map');
    var options = {
     center: new window.kakao.maps.LatLng(37.5756032, 126.9767925),
    level: 3
    };
    var map = new window.kakao.maps.Map(container, options);
    // console.log(map)
// console.log(window)


