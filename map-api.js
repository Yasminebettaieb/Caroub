let x = 0;
var place, place1;

function initMap() {
    var input = document.getElementById('PickupLocationInput');
    var input1 = document.getElementById('DropoffLocationInput');
    var autocomplete = new google.maps.places.Autocomplete(input);
    var autocomplete1 = new google.maps.places.Autocomplete(input1);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
            if (document.getElementById('Price') != null) {
                document.getElementById('Price').value = "Calculer";
                locationChangeHandler(autocomplete, autocomplete1);
            }
        }
    );
    google.maps.event.addListener(autocomplete1, 'place_changed', function () {
            if (document.getElementById('Price') != null) {
                document.getElementById('Price').value = "Calculer";
                locationChangeHandler(autocomplete, autocomplete1);
            }
        }
    );
}


initMap();

function locationChangeHandler(autoc, autoc1) {

    place = autoc.getPlace();
    place1 = autoc1.getPlace();
    if (place && place1) {

        if (document.getElementById('Price') != null) {
            document.getElementById('Price').value = "Calculer";
        }
        if(place1 && place) {
            getPriceFromApi(place, place1);
        }
    }


}

function calcul() {
    if (document.getElementById('Price') != null) {
        if(x == 0) {
            document.getElementById('Price').value = "Zone non couverte";
        } else {
            document.getElementById('Price').value = x + " CHF";
        }
    }
}

function getPriceFromApi(place, place1) {
    const date = new Date();
    date.setHours(date.getHours() - 1);
   $.post('https://us-central1-car5f4d4e5.cloudfunctions.net/api', {
        "client_id": "47SQyP7rDbOgWpiWyuBoF4Cuxnq1",
        "client_secret": "dfe992acee3db0ffa70a",
        "type": "quote",
        "date": date.toISOString(),
        "origin": {
            "latitude": place.geometry.location.lat(),
            "longitude": place.geometry.location.lng(),
            "text": place.formatted_address,
        },
        "destination": {
            "latitude": place1.geometry.location.lat(),
            "longitude": place1.geometry.location.lng(),
            "text": place1.formatted_address,
        }
    }, function (response) {
        const data = JSON.parse(response);
        x = data.quote.length ? data.quote[0].total / 1000 : 0;
        calcul();
    })
}
