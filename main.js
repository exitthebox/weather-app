angular.module('CastApp', []);

angular.module('CastApp')
  .factory('CastFactory', ['$http', CastFactory]);

function CastFactory ($http) {

  return {
    getLocationKey: function (url) {
      return $http.jsonp(url + "&callback=JSON_CALLBACK");

    },
    getDailyForcast: function (location) {
      return $http.jsonp('https://dataservice.accuweather.com/forecasts/v1/daily/1day/'+location+'.json?apikey=pTusYgzrC6QmPNQ9ALIaMCefCkuBMvB2&callback=JSON_CALLBACK')
        .success(function(data)
      {
        // console.log(data.found);
      });
  }
  };
}

angular.module("CastApp").controller("CastCtrl", ['CastFactory', CastCtrl]);

function CastCtrl (CastFactory) {
  var cCtrl = this;
  cCtrl.search = "";
  cCtrl.urlEnd = "";
  cCtrl.urlFirst = "http://dataservice.accuweather.com/locations/v1/search?apikey=pTusYgzrC6QmPNQ9ALIaMCefCkuBMvB2&q=";

  cCtrl.submit = function (){
    cCtrl.urlEnd = cCtrl.urlFirst + cCtrl.search;
    console.log("CastCtrl controller",cCtrl.urlEnd, CastFactory.getLocationKey);
    CastFactory.getLocationKey(cCtrl.urlEnd).then(function(response){
      console.log('response:',response.data[0].Key)
      CastFactory.getDailyForcast(response.data[0].Key).then(function(response){
        cCtrl.forecastLow = response.data.DailyForecasts[0].Temperature.Minimum;
        cCtrl.forecastHigh = response.data.DailyForecasts[0].Temperature.Maximum;
        cCtrl.fLow = "Low: " + cCtrl.forecastLow.Value;
        cCtrl.fHigh = "High: " + cCtrl.forecastHigh.Value;
        cCtrl.fUnit = cCtrl.forecastLow.Unit;
      })
    })
  };
//   CastFactory.getLocationKey().then(function(response){
//     cCtrl.locationKey = response.data;
// });
    // ========= Need Object for locationKey ========

    // CastFactory.getDailyForcast().then(function(response) {

  // });
}

// var forecastData = response.data || {}
// var DailyForecasts = forecastData.DailyForecasts || {}
// var Temperature = DailyForecasts.pop() || {}
// var Minimum = Temperature.Minimum || {}
// var Value = Minimum.Value || 0
