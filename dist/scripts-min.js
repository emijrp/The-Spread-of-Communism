var country_codes,json;$.ajax({type:"GET",url:"../assets/country_codes.json",dataType:"text",success:function(e){country_codes=JSON.parse(e)}}),$.ajax({type:"GET",url:"../assets/data.json",dataType:"text",success:function(e){json=JSON.parse(e)}});var map=L.map("map",{minZoom:2,maxZoom:8}).setView([51.505,-.09],13);function getNameFromCode(e){for(var a=0;a<country_codes.length;a++)if(country_codes[a].code==e)return country_codes[a].name;return null}map.setZoom(2),map.panTo(new L.LatLng(25,0)),map.setMaxBounds([[72.5,225],[-37.5,-225]]),L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",{attribution:'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',id:"mapbox.light",accessToken:"pk.eyJ1IjoiamVmZnJleXNoZW5jYyIsImEiOiJjamE5MDI4YmowMmMzMndzNDdoZmZnYzF5In0.zV3f0WhqbHeyixwY--TyZg"}).addTo(map),$.ajax({dataType:"json",url:"../assets/countries.geo.json",success:function(e){for(;!country_codes;);var a=L.geoJSON(e,{style:{fillColor:"#e74c3c",color:"#e74c3c",weight:1,fillOpacity:0,opacity:0}}).bindTooltip(function(e){return getNameFromCode(e.feature.properties.A3)},{sticky:!0}).addTo(map);for(updateDisplay();!json;);startVisualization(a)}});var year=1917,paused=!1,speed=400;function goBack(){year>1917&&year--,updateDisplay()}function goForward(){year<2017?year++:paused=!0,updateDisplay()}function pause(){paused=!paused,updateDisplay()}function updateDisplay(){$("#year").text(year),$("#playpause").html("<i class = 'fas fa-fw fa-"+(paused?"play":"pause")+"'></i>")}function startVisualization(e){setInterval(function(){if(updateDisplay(),!paused){for(var a=[],t=[],o=0;o<json.length;o++)json[o].start<=year&&(null==json[o].end||year<=json[o].end)?(json[o].start==year&&$("#killfeed p").append("<span data-year = '"+year+"'>"+year+": "+json[o].name+" fell to communism<br></span>"),json[o].country_codes.forEach(function(e){a.push(e)})):null!=json[o].end&&(year>json[o].end||year<json[o].start)&&json[o].country_codes.forEach(function(e){t.push(e)});(a.length>0||t.length>0)&&e.eachLayer(function(e){a.includes(e.feature.properties.A3)?e.setStyle({fillOpacity:.3,opacity:1}):t.includes(e.feature.properties.A3)&&e.setStyle({fillOpacity:0,opacity:0})}),goForward()}$("#killfeed p span").each(function(){$(this).data().year-year>0?$(this).remove():$(this).data().year-year<=-3&&$(this).fadeOut(function(){$(this).remove()})})},speed)}