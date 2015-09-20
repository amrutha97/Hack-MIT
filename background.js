//Creates JSON lcoation object

//get current location
navigator.geolocation.getCurrentPosition(function (position) {
    var start_latitude = position.coords.latitude;
    var start_longtitude = position.coords.longitude;
}, function (position) {
    console.log(position)
});

//get destination's location
function getCurrentTabUrl(callback) {
    // Query filter to be passed to chrome.tabs.query - see
    // https://developer.chrome.com/extensions/tabs#method-query
    var queryInfo = {
        active: true,
        currentWindow: true
    };


    chrome.tabs.query(queryInfo, function (tabs) {
        var tab = tabs[0];
        var url = tab.url;
        console.assert(typeof url == 'string', 'tab.url should be a string');

        //IF IT BREAKS- check if url pathname is correct
        var locationArray = url.substring((url.indexOf('@') + 1)).split(',');
        var end_latitude = locationArray[0];
        var end_longitude = locationArray[1];

        callback({
            latitude: end_latitude,
            longitude: end_longitude
        });

    });
}

function getLocations() {
    getCurrentTabUrl(function (end_location) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var start_latitude = position.coords.latitude;
            var start_longtitude = position.coords.longitude;
            getEstimate(start_latitude, start_longtitude, end_location.latitude, end_location.longitude, renderStatus)
        }, function (position) {
            console.log(position)
        });
    });
}

//Sushi's code that accesses the Uber API
var token = "bZttHxBNzJRQN2_HIvAXCJbKjaVWwPapVrElS7e7";


function getEstimate(start_latitude, start_longitude, end_latitude, end_longitude, renderResult) {


    $.ajax({
        url: "https://api.uber.com/v1/estimates/price",
        method: "GET",
        data: {
            start_latitude: start_latitude,
            start_longitude: start_longitude,
            end_latitude: end_latitude,
            end_longitude: end_longitude,

        },
        headers: {
            Authorization: "Token " + token
        },
        success: function (data) {
            var result = getResult(data);
            renderResult(result);
        }
    })
}

function getResult(data) {
    return {
        estimate: data["prices"][0]["estimate"]
    }
}


//var token = "kTKiSbrlx7zJohVcTBYYedeYliZAdwMlo6d4kV9r";
//var xhr = new XMLHttpRequest();
//var response = xhr.open('GET', 'https://api.uber.com/v1/products?latitude=37.7759792&longitude=-122.41823');
//xhr.setRequestHeader("Authorization", "Token "+token);
//xhr.setRequestHeader('Content-Type', 'application/json');
//response = xhr.send();
//debugger;
//response;
//if(typeof(response) !== 'undefined') {
//    alert(response);
//}


function renderStatus(info) {
    var price = info.estimate;
    document.getElementById("price-box").innerHTML = price;
}

$(function () {
    $("#trigger").click(function () {
        getLocations();
    });
});
