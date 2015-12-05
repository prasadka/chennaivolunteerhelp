namespace App {
	let el: Element;
	let geocoder: google.maps.Geocoder;
	let map: google.maps.Map;
	let lastInfoWindow: google.maps.InfoWindow;

	export function initialize() {
		el = document.getElementById("map");
		geocoder = new google.maps.Geocoder();
		map = new google.maps.Map(el, {
			center: new google.maps.LatLng(13.0, 80.2),
			zoom: 12
		});
		
		let aidList = getAidList();
		renderMarkers(aidList);
	}
	
	function getAidList(): Aid[] {
		return [
			{
				"origin": Origin.OFFER,
				"address": "kodambakkam",
				"type": Type.TRANSPORT,
				"subtypes": ["car", "bus"],
				phone: "9003937161,8870911199"
			},
			{
				"origin": Origin.OFFER,
				"address": "avadi",
				"type": Type.SHELTER,
				"subtypes": ["house"],
				phone: "111-111-1234"
			}			
		];
	}

	function renderMarkers(aidList: Aid[]) {
		aidList.forEach((aid) => {
			let req: google.maps.GeocoderRequest = {
				address: aid.address,
				componentRestrictions: {
					country: "IN",
					locality: "chennai"
				}
			};

			geocoder.geocode(req, (results, status) => {
				if (status === google.maps.GeocoderStatus.OK) {
					results.forEach((result) => addMarker(aid, result));
				} else {
					console.warn("unable to geocode: ", aid.address, status);
				}
			});
		});
	}
	
	function addMarker(aid: Aid, result: google.maps.GeocoderResult) {		
		let marker = new google.maps.Marker({
			map: map,
			position: result.geometry.location,
			icon: getIcon(aid.type)
		});
		
		marker.addListener("click", () => {
			if (lastInfoWindow != null) {
				lastInfoWindow.close();
			}

			lastInfoWindow = new google.maps.InfoWindow({
				content: "phone: " + aid.phone
			});

			lastInfoWindow.open(map, marker);
		})
	} 
}
