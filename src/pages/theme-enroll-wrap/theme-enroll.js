let container = document.getElementById('map');
let options = {
    center: new kakao.maps.LatLng(37.549071, 126.918957),  // 합정역 위도, 경도
    level: 3
};

let map = new kakao.maps.Map(container, options);

// 지도 클릭 시, 클릭한 위치로 지도 이동 및 URL로 이동
kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
    // 클릭한 위치의 위도, 경도 정보를 가져옵니다.
    let latLng = mouseEvent.latLng;

    // 지도 중심을 클릭한 위치로 이동
    map.setCenter(latLng);

    // 이동할 URL
    window.location.href = "/src/pages/theme-enroll/index.html";  // 원하는 URL로 변경
});
