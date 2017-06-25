var ColumnChart = function (data) {

  var container = document.querySelector('#chart-data');

  var chart = new Highcharts.Chart({
    chart: {
      type: 'areasplinerange',
        backgroundColor: 'none',
        renderTo: container
      },

      title: {
          text: ''
      },

      yAxis: {
          title: {
              text: null
          }
      },

      tooltip: {
          crosshairs: true,
          shared: true,
          valueSuffix: '°C'
      },

      legend: {
          enabled: false
      },

      series: [{
          name: 'Temperature',
          data: data
      }],
      exporting: {
         enabled: false
       }
    });
}
