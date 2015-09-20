//Creates JSON lcoation object

chrome.tabs.query(function(tabs) {    
    var tab = tabs[0]; 
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
      
      //IF IT BREAKS- check if url pathname is correct
      var locationArray = url.pathname.substring((window.location.pathname.indexOf('@')+1)).split(',');
      var locationLatitude = locationArray[0];
      var locationLongitude = locationArray[1];
          
      var location = {
        latitude: locationLatitude,
        longitude: locationLongitude
      }   
      return location;
});


//get current location 

function getCurrentLocation() {
}


function computePrice(location) {
    //Sushi's code that accesses the Uber API
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = computePrice(location);
}