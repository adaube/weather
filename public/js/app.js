var weatherData = {};

$(document).ready(function(){
  var baseUrl = 'https://api.forecast.io/forecast/';
  var name = "Your Name";
  $('#get-weather').on('click', showInfo);

  function google(){
    var googleResults = $('#location').results[0].geometry.location(lat, lng);
  }

  function buildUrl(lat, lon){
    // return "https://api.forecast.io/forecast/099641b3c36867977fb67a197504e301/37.8267,-122.423"
    return baseUrl + apiKey+'/'+lat+','+lon;
  }

  function successHandler(data){
    weatherData = data;
    $('#output').text(JSON.stringify(data));
    console.log(data);
  }

  function errorHandler(error){
    console.log(error);
  }
  function showInfo(){
    var lat = google(lat);
    var lon = google(lng);
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
      latitude: hammer.latitude,
      longitude: hammer.longitude,
      icon: hammer.currently.icon || 'clear-night',
      summary: hammer.currently.summary,
      time: hammer.currently.time
    };
    var html = template(extractedData);
    $('#test-output').html(html);
  }
});
