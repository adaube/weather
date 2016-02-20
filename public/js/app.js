var weatherData = {};
var googleData = {};

$(document).ready(function(){
  var baseUrl = 'https://api.forecast.io/forecast/';
  var locationUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  $('#get-weather').on('click', showInfo);

  function googleUrl(location){
    return locationUrl + location;
  };

  function google(location){
    var location = $('#location').text();
    var jsonGoogle = {
      url: googleUrl(location),
      success: googleSuccess,
      error: errorHandler
    };

  function googleSuccess(google){
    console.log(google);
    var googleData = {
      lat: google.results[0].geometry.location.lat,
      lon: google.results[0].geometry.location.lng,
    };
  };

  function buildUrl(lat, lon){
    // return "https://api.forecast.io/forecast/099641b3c36867977fb67a197504e301/37.8267,-122.423"
    return baseUrl + apiKey+'/'+lat+','+lon;
  };

  // function successHandler(data){
  //   weatherData = data;
  //   $('#output').text(JSON.stringify(data));
  //   console.log(data);
  // }

  function errorHandler(error){
    console.log(error);
  };
  function showInfo(){
    var lat = googleSuccess(lat);
    var lon = googleSuccess(lon);
    var ajaxOptions = {
      url: buildUrl(lat,lon),
      dataType: 'jsonp',
      success: showInfoSuccess,
      error: errorHandler
    }

    $.ajax(ajaxOptions);

  };

  function showInfoSuccess(hammer){
    console.log(hammer);
    var source = $('#info').html();
    var template = Handlebars.compile(source);
    var extractedData = {
      temperature: hammer.currently.temperature,
      summary: hammer.currently.summary,
      time: hammer.currently.time
    };
    var html = template(extractedData);
    $('#test-output').html(html);
  };
});
