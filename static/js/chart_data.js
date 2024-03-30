var temperature = document.getElementById('temperature');


function getdevice(){
    var requests = $.get('/api/data');
    
    var tm = requests.done(function (result){
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        addData(temp_chart, time, result[1]);
        addData(humid_chart, time, result[2]);
        addData(volt_chart, time, result[3]);
        addData(current_chart, time, result[4]);
        document.getElementById("card-temp").innerHTML = result[1];
        document.getElementById("card-humidity").innerHTML = result[2];
        document.getElementById("card-voltage").innerHTML = result[3];
        document.getElementById("card-curr").innerHTML = result[4];
        if (couter >= 10 ){
            removeData(temp_chart);
            removeData(humid_chart);
            removeData(volt_chart);
            removeData(current_chart);
        }
        couter++;

        setTimeout(getdevice, 2000);
        
    
    });
    
}

//temperature chart object created 
var temp_chart = new Chart(temperature, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperature W.R.T. Time',
            data: [],
            fill:true,
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            borderColor:'rgba(244, 67, 54, 1)',
            borderWidth: 3
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


var humidity = document.getElementById('humidity');
var humid_chart = new Chart(humidity, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Humidity W.R.T. Time',
            data: [],
            fill:true,
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            borderColor:'rgba(33, 150, 243, 1)',
            borderWidth: 3
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

var voltage = document.getElementById('voltage');
var volt_chart = new Chart(voltage, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Voltage W.R.T. Time',
            data: [],
            fill:true,
            backgroundColor: 'rgba(0, 150, 136, 0.1)',
            borderColor:'rgba(0, 150, 136, 1)',
            borderWidth: 3
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


var current = document.getElementById('current');
var current_chart = new Chart(current, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Current W.R.T. Time',
            data: [],
            fill:true,
            backgroundColor: 'rgba(255, 152, 0, 0.1)',
            borderColor:'rgba(255, 152, 0, 1)',
            borderWidth: 3
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
    });
    chart.update();
}

var couter = 0; 

getdevice();
