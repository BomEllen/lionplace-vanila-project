let container = document.getElementById('map');
		let options = {
			center: new kakao.maps.LatLng(37.549071, 126.918957),
			level: 3
		};

		let map = new kakao.maps.Map(container, options);