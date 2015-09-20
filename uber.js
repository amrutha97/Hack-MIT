var token = "kTKiSbrlx7zJohVcTBYYedeYliZAdwMlo6d4kV9r";

function getEstimate(start_latitude, start_longitude, end_latitude, end_longitude, renderResult) {
$.ajax ({
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
    success: function(data) {
        var result = getResult(data);
        renderResult(result);
    }
})
}




function getResult(data) {
        var price = data["prices"]["estimate"];
        return price;
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
