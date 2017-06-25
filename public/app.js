
var app = function(){

  var mainMap = new MapWrapper();


  var container = document.getElementById('main-map');
  container.style.height = document.body.scrollHeight +"px";

  var displayWeatherByCity = function(city){
    var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + ",uk&cnt=7&appid=8d45e814885786cd7adbc48c1754c9cb"
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', function(){
      var weatherData = JSON.parse(request.responseText);
      updateTable(weatherData);
      var latlng = new google.maps.LatLng(weatherData.city.coord.lat, weatherData.city.coord.lon - 0.06);
      mainMap.googleMap.panTo(latlng)
      var data = getData(weatherData.list)
      new ColumnChart(data);
    })
    request.send();
  };

  

  // set to grab default city from local storage
  // var city = "London"
  // getWeatherByCity(city)
// onload = use local data to store last
  displayWeatherByCity("London");

  var updateTable = function(weatherData){
    var table = document.getElementById("weather-data");
    table.innerHTML = "";
    createHeaderRow(weatherData.city.name);
    createWeatherRows(weatherData.list);
  }

  var createHeaderRow = function(cityName){
    var table = document.getElementById("weather-data");
    var tableRow = document.createElement("tr");
    var tableHeader = document.createElement("th");

    tableHeader.innerText = cityName;
    tableHeader.colSpan = "3";
    tableRow.appendChild(tableHeader);
    var blankCell1 = document.createElement("th");
    var blankCell2 = document.createElement("th");
    tableRow.appendChild(blankCell1);
    tableRow.appendChild(blankCell2);
    table.appendChild(tableRow);
  }

  var createWeatherRows = function(weatherArray){
    var dayStrings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    var table = document.getElementById("weather-data");
    for ( i = 0; i < weatherArray.length; i++ ){
      var row = document.createElement("tr");
      var dateCell = document.createElement("td");
      var day = timeStampToDay(weatherArray[i].dt);
      dateCell.innerText = dayStrings[day];
      row.appendChild(dateCell);
      var iconCell = document.createElement("td");
      var img = document.createElement("img");
      img.src = "images/" + weatherArray[i].weather[0].icon + ".png"
      iconCell.appendChild(img);
      row.appendChild(iconCell)
      var weatherCell = document.createElement("td");
      weatherCell.innerHTML = kToC(weatherArray[i].temp.max) + "<sup>°C</sup> " + kToC(weatherArray[i].temp.min) + "<sup>°C</sup>";
      row.appendChild(weatherCell);
      table.appendChild(row);
    }
  }

  var timeStampToDay = function(timestamp){
    var date = new Date(timestamp * 1000);
    var day = date.getDay();
    return day;
  }

  var kToC = function(kelvins) {
    return Math.round( kelvins - 273.15 )
  }


  var button = document.getElementById("city-button")
  button.addEventListener('click', function(){
    var userInput = document.getElementById("city-input")
    city = userInput.value;
    console.log(mainMap.googleMap)
    // this.googleMap.setStyle({invert_lightness: true});
    displayWeatherByCity(city)
  });

  var getData = function(weatherArray){
    returnArray = [];
    var dayStrings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    for ( var i = 0; i < weatherArray.length; i++ ){
      var day = timeStampToDay(weatherArray[i].dt);
      var tempObject = {
        low: kToC(weatherArray[i].temp.min),
        high: kToC(weatherArray[i].temp.max),
        name: dayStrings[day],
        color: "#00FF00"
      };
      returnArray.push(tempObject);
    }
    return(returnArray)
  }

  var toggleChart = document.getElementById("toggle-chart-button");

  toggleChart.addEventListener('click', function(){
    var chart = document.getElementById("chart-block");
    var overlay = document.getElementById("overlay-elements");
    if (chart.style.visibility === "hidden"){
      chart.style.visibility = "visible";
      overlay.style.overflow = "auto";
      overlay.style.pointerEvents = "all";
    } else {
      chart.style.visibility = "hidden";
      overlay.style.pointerEvents = "none";
      overlay.style.overflow = "visible";
    }
  })


}

window.addEventListener('load', app);
