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
  function showInfo(lat, lon){
    //var lat = googleSuccess(lat);
    //var lon = googleSuccess(lon);
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
