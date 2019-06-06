mapboxgl.accessToken = 'pk.eyJ1IjoiamF0aW4yMDAwIiwiYSI6ImNqdTFteGdoazAwdDQ0NG12cGcyN2ZxdHgifQ.Y2YxRibUAforpmRYzG9PNw';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [78.800144,22.060187],
zoom: 5
});

var resetBtn = document.querySelector("#reset");

//Array of longitude/latitude pairs
var predefined = [
  [81.391133,18.474399],
  [80.293166,21.529737],
  [82.928285,23.558952],
  [79.590468,23.478362],
  [78.580339,26.544309],
  [77.570210,23.397724],
  [74.100637,23.438049],
  [76.867512,21.488852],
  [75.857383,18.516075],
  [78.624258,20.339476]
];


//Map Manipulatition
map.on('load', function () {

  //GeoJSON Data Obj required to push and pop coordinates
  var data = {
  "type": "Feature",
  "properties": {},
  "geometry": {
  "type": "LineString",
  "coordinates": []
  }
  };

//Adding the main style layer
map.addLayer({
"id": "route",
"type": "line",
"source": {
"type": "geojson",
"data": {
"type": "Feature",
"properties": {},
"geometry": {
"type": "LineString",
"coordinates":[]
}
}
},
"layout": {
"line-join": "round",
"line-cap": "round"
},
"paint": {
"line-color": "#003366",
"line-width": 4
}
});


var resetID;//ID of last setInterval, used at time of resetting


//reset button work
resetBtn.addEventListener('click', function() {
  clearInterval(resetID);
  animate(predefined);
});

//Calling animation function
animate(predefined);


//Reset Coordinates to set of all pairs
function resetCoordinates(arr){
  data.geometry.coordinates = [];
  arr.forEach(function(element){
    data.geometry.coordinates.push(element);
  });
}

//Main Animation Function
function animate(arr){
  var p1 = new Promise(function(resolve,reject){
    resetCoordinates(arr);//Adding all the pairs
    map.getSource("route").setData(data);//Changing the source
    resolve();
  });

  p1.then(function(){
    var i = arr.length;
    //Recurring animation every 1s
    resetID = setInterval(function(arr){
      if(i==1){
        resetCoordinates(arr)
        i=arr.length;
      }else{
        data.geometry.coordinates.pop();//Poping out one pair
        i--;
      }
      map.getSource("route").setData(data);//Changing the source
    }, 1000, arr);
  })
}

});
