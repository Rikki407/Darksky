var map;
var co_ordinates = {lat: 28.7041, lng: 77.1025};
var apiKey = 'f2a6ea3670e958220ca51473735c7b7f/';
var endpoint = 'https://api.darksky.net/forecast/';
var paramenters = '';

var summary = $("#summary");
var temperature = $("#temperature");
var visibility = $("#visibility");
var pressure = $("#pressure");
var wind_speed = $("#wind_speed");
var cloudCover = $("#cloudCover");
var precipProbability = $("#precipProbability");
var humidity = $("#humidity");
var timezone = $("#time_zone")

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: co_ordinates,
        zoom: 6
    });

    var marker = null;
    google.maps.event.addListener(map, 'click', function (event) {

        placeMarker(event.latLng);
    });


    function placeMarker(location) {


        if (marker === null) {
            marker = new google.maps.Marker({
                position: location,
                map: map
            });
        }
        else {
            marker.setPosition(location);
        }

        var latt = location.lat();
        var lngg = location.lng();
        var apiKey = 'f2a6ea3670e958220ca51473735c7b7f/';
        var endpoint = 'https://api.darksky.net/forecast/';

        var paramenters =latt+','+lngg;
        var url = endpoint+apiKey+paramenters;
        var Data = [];
        console.log(paramenters);
        function AjaxRequest(url,callback) {
            $.ajax({ url : url,dataType: 'jsonp', success: function (data)
            {
                callback(data);
            }})
        }
        AjaxRequest(url, function (d) {
            Data.push(d);
            currentSummary(Data[0]);
        });


        function currentSummary(data) {
            var cs = data.currently;
            var tz = data.timezone;


            var current = {
                time: cs.time,
                summary: cs.summary,
                temperature: cs.temperature,
                humidity: cs.humidity,
                visibility: cs.visibility,
                pressure: cs.pressure,
                windSpeed: cs.windSpeed,
                cloudCover: cs.cloudCover,
                precipProbability: cs.precipProbability
            };
            summary.text(current.summary);
            temperature.text(current.temperature);
            humidity.text(current.humidity);
            visibility.text(current.visibility);
            pressure.text(current.pressure);
            wind_speed.text(current.windSpeed);
            cloudCover.text(current.windSpeed);
            precipProbability.text(current.precipProbability);
            timezone.text(tz);
            console.log(current.time);
        }

    }

    var input = document.getElementById('map_input');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        var place = autocomplete.getPlace();


        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        if (marker === null) {
            marker = new google.maps.Marker({
                position: place.geometry.location,
                map: map
            });
        }
        else {
            marker.setPosition(place.geometry.location);
        }
        var latt = place.geometry.location.lat();
        var lngg = place.geometry.location.lng();
        var apiKey = 'f2a6ea3670e958220ca51473735c7b7f/';
        var endpoint = 'https://api.darksky.net/forecast/';

        var paramenters = latt+','+lngg;
        var url = endpoint+apiKey+paramenters;
        var Data = [];
        console.log(paramenters);
        function AjaxRequest(url,callback) {
            $.ajax({ url : url,dataType: 'jsonp', success: function (data)
            {
                callback(data);
            }})
        }

        AjaxRequest(url, function (d) {
            Data.push(d);
            currentSummary(Data[0]);
        });


        function currentSummary(data) {
            var cs = data.currently;
            var tz = data.timezone;

            var current = {
                time: cs.time,
                summary: cs.summary,
                temperature: cs.temperature,
                humidity: cs.humidity,
                visibility: cs.visibility,
                pressure: cs.pressure,
                windSpeed: cs.windSpeed,
                cloudCover: cs.cloudCover,
                precipProbability: cs.precipProbability
            };
            summary.text(current.summary);
            temperature.text(current.temperature);
            humidity.text(current.humidity);
            visibility.text(current.visibility);
            pressure.text(current.pressure);
            wind_speed.text(current.windSpeed);
            cloudCover.text(current.windSpeed);
            precipProbability.text(current.precipProbability);
            timezone.text(tz);
            console.log(current.temperature);
        }
    });


}


