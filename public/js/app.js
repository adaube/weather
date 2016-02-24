// var weatherData = {};
// var googleData = {};

$(document).ready(function(){
  var baseUrl = 'https://api.forecast.io/forecast/';
  var locationUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  $('#get-weather').on('click', google);

  function googleUrl(location){
    return locationUrl + location;
    console.log(this);
  };

  function google(){
    var location = $('#location').val();
    console.log(location);
    var jsonGoogle = {
      url: googleUrl(location),
      success: googleSuccess,
      error: errorHandler
    };
    $.ajax(jsonGoogle);
    console.log(location);
  };

  function googleSuccess(google){
    console.log(google);
    var lat = google.results[0].geometry.location.lat;
    var lon = google.results[0].geometry.location.lng;
    showInfo(lat, lon);
  };

  function buildUrl(lat, lon){
    return baseUrl + apiKey+'/'+lat+','+lon;
  };

  function errorHandler(error){
    console.log(error);
  };
  function showInfo(lat, lon){
    var ajaxOptions = {
      url: buildUrl(lat,lon),
      dataType: 'jsonp',
      success: showInfoSuccess,
      error: errorHandler
    }

    $.ajax(ajaxOptions);

  };



  function showInfoSuccess(weatherData){
    console.log(weatherData);
    var source = $('#info').html();
    var template = Handlebars.compile(source);
    var wc = weatherData.currently;
    var wd = weatherData.daily;
    var extractedData = {
      temperature: wc.temperature,
      icon: wc.icon,
      summary: wd.summary,
      time: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
      btnLink: "javascript:history.go(0)",
      btnText: "Click to Reload",
    };
    var html = template(extractedData);
    $('#test-output').html(html);
  };
});
