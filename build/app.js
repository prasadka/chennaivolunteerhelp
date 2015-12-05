var App;
(function (App) {
    (function (Origin) {
        Origin[Origin["REQUEST"] = 0] = "REQUEST";
        Origin[Origin["OFFER"] = 1] = "OFFER";
    })(App.Origin || (App.Origin = {}));
    var Origin = App.Origin;
    (function (Type) {
        Type[Type["TRANSPORT"] = 0] = "TRANSPORT";
        Type[Type["FOOD"] = 1] = "FOOD";
        Type[Type["SHELTER"] = 2] = "SHELTER";
    })(App.Type || (App.Type = {}));
    var Type = App.Type;
    function getIcon(type) {
        switch (type) {
            case Type.FOOD:
                return "resources/restaurant-18.svg";
            case Type.SHELTER:
                return "resources/lodging-18.svg";
            case Type.TRANSPORT:
                return "resources/bus-18.svg";
        }
    }
    App.getIcon = getIcon;
})(App || (App = {}));
var App;
(function (App) {
    var el;
    var geocoder;
    var map;
    var lastInfoWindow;
    function initialize() {
        el = document.getElementById("map");
        geocoder = new google.maps.Geocoder();
        map = new google.maps.Map(el, {
            center: new google.maps.LatLng(13.0, 80.2),
            zoom: 12
        });
        var aidList = getAidList();
        renderMarkers(aidList);
    }
    App.initialize = initialize;
    function getAidList() {
        return [
            {
                "origin": App.Origin.OFFER,
                "address": "kodambakkam",
                "type": App.Type.TRANSPORT,
                "subtypes": ["car", "bus"],
                phone: "9003937161,8870911199"
            },
            {
                "origin": App.Origin.OFFER,
                "address": "avadi",
                "type": App.Type.SHELTER,
                "subtypes": ["house"],
                phone: "111-111-1234"
            }
        ];
    }
    function renderMarkers(aidList) {
        aidList.forEach(function (aid) {
            var req = {
                address: aid.address,
                componentRestrictions: {
                    country: "IN",
                    locality: "chennai"
                }
            };
            geocoder.geocode(req, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    results.forEach(function (result) { return addMarker(aid, result); });
                }
                else {
                    console.warn("unable to geocode: ", aid.address, status);
                }
            });
        });
    }
    function addMarker(aid, result) {
        var marker = new google.maps.Marker({
            map: map,
            position: result.geometry.location,
            icon: App.getIcon(aid.type)
        });
        marker.addListener("click", function () {
            if (lastInfoWindow != null) {
                lastInfoWindow.close();
            }
            lastInfoWindow = new google.maps.InfoWindow({
                content: "phone: " + aid.phone
            });
            lastInfoWindow.open(map, marker);
        });
    }
})(App || (App = {}));
//# sourceMappingURL=app.js.map