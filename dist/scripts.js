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

/*$.ajax({
  dataType: "json",
  url: "../assets/countries.geo.json",
  success: function(data) {
    L.geoJSON(data).addTo(map);
  },
  error: function(){

  }
});*/

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

$("document").ready(function(){
  updateDisplay();
  setInterval(function(){ //Start visualization
    if(!paused) goForward();
  }, speed);
});
