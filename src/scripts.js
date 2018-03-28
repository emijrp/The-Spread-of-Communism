/*
  Initialize Map
*/

var map = L.map('map', {
  minZoom: 2,
  maxZoom: 8
}).setView([51.505, -0.09], 13);

map.setZoom(2);
map.panTo(new L.LatLng(25, 0));
map.setMaxBounds([
    [72.5, 225],
    [-37.5, -225]
]);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1IjoiamVmZnJleXNoZW5jYyIsImEiOiJjamE5MDI4YmowMmMzMndzNDdoZmZnYzF5In0.zV3f0WhqbHeyixwY--TyZg'
}).addTo(map);

$.ajax({
  dataType: "json",
  url: "../assets/countries.geo.json",
  success: function(geojson) {
    var layer = L.geoJSON(geojson, {
      style: {
        fillColor: "#e74c3c",
        color: "#e74c3c",
        weight: 1,
        fillOpacity: 0,
        opacity: 0
      }
    }).addTo(map);

    updateDisplay();
    $.ajax({ //Read the csv
      type: "GET",
      url: "../assets/data.csv",
      dataType: "text",
      success: function(csv){
        startVisualization(layer, csv);
      }
    });
  },
  error: function(){

  }
});

/*
  Controls
*/

var year = 1917,
    paused = false,
    speed = 400;

function goBack(){
  if(year > 1917) year--;
  updateDisplay();
}

function goForward(){
  if(year < 2017) year++;
  else paused = true;
  updateDisplay();
}

function pause(){
  if(paused) paused = false;
  else paused = true;
  updateDisplay();
}

/*
  Visualization
*/

function updateDisplay(){
  $("#year").text(year);
  $("#playpause").html("<i class = 'fas fa-fw fa-" + (paused ? "play" : "pause") + "'></i>");
}

function startVisualization(geojsonLayer, csv){
  setInterval(function(){
    if(!paused){
      //Communism animations
      /*geojsonLayer.eachLayer(function(layer){
        //console.log(layer.feature.properties.A3);
        layer.setStyle({
          fillOpacity: 0.3,
          opacity: 1
        });
      });*/

      //Add year to killfeed
      $("#killfeed p").append("<span data-year = '" + year +"'>" + year + ": <br></span>");

      goForward();
    }

    //Killfeed animation
    $("#killfeed p span").each(function(){
      if($(this).data().year - year > 0) $(this).remove();
      else if($(this).data().year - year <= -3){
        $(this).fadeOut(function(){
          $(this).remove();
        });
      }
    });
  }, speed);
}
