    class MyCharts
    {
        constructor(Xdata, Ydata, chartname)
        {

            this.Xdata = Xdata;
            this.Ydata = Ydata;
            this.chartname = chartname;
            this.options = {
                height: 200
              };
        }
        createGraph()
        {
            var data = 
            {
                labels: this.Xdata,
                series: 
                [
                    this.Ydata    
                ]
            }

            new Chartist.Line(this.chartname, data, this.options);
        }
    }

    var Xdata_temp = [];
    var Ydata_temp = [];
    
    var Xdata_humid = [];
    var Ydata_humid = [];

    var Xdata_volt = [];
    var Ydata_volt = [];
    
    var Xdata_curr = [];
    var Ydata_curr = [];

    var obj = new MyCharts(Xdata_temp, Ydata_temp, '.ct-chart');
    obj.createGraph();

    var obj2 = new MyCharts(Xdata_humid, Ydata_humid, '.ct2-chart');
    obj2.createGraph();
    
    var obj3 = new MyCharts(Xdata_volt, Ydata_volt, '.ct3-chart');
    obj2.createGraph();
    
    var obj4 = new MyCharts(Xdata_curr, Ydata_curr, '.ct4-chart');
    obj2.createGraph();
    
    function requestTemp() {
        var requests = $.get('/api/temperature');
        var tm = requests.done(function (result){
            
            Xdata_temp.push(result[0]);
            Ydata_temp.push(result[1]);
            
            if (Xdata_temp.length >= 10) {
                Xdata_temp.shift()
                Ydata_temp.shift()
            }

            var obj = new MyCharts(Xdata_temp, Ydata_temp, '.ct-chart');
            obj.createGraph();
            document.getElementById("card-temp").innerHTML = result[1];
            
            setTimeout(requestTemp, 2000);
            setTimeout(requestHumidity, 2000);
            setTimeout(requestVoltage, 2000);
            setTimeout(requestCurrent, 2000);
        });
    }

    function requestHumidity() {
        var requests = $.get('/api/humidity');
        var tm = requests.done(function (result){
            
            Xdata_humid.push(result[0]);
            Ydata_humid.push(result[1]);
            
            if (Xdata_volt.length >= 10) {
                Xdata_humid.shift()
                Ydata_humid.shift()
            }

            var obj1 = new MyCharts(Xdata_humid, Ydata_humid, '.ct2-chart');
            obj1.createGraph();
            document.getElementById("card-humid").innerHTML = result[1];

        });
    }


    function requestVoltage() {
        var requests = $.get('/api/voltage');
        var tm = requests.done(function (result){
            
            Xdata_volt.push(result[0]);
            Ydata_volt.push(result[1]);
            
            if (Xdata_volt.length >= 10) {
                Xdata_volt.shift()
                Ydata_volt.shift()
            }

            var obj1 = new MyCharts(Xdata_volt, Ydata_volt, '.ct3-chart');
            obj1.createGraph();
            document.getElementById("card-voltage").innerHTML = result[1];

        });
    }


    function requestCurrent() {
        var requests = $.get('/api/current');
        var tm = requests.done(function (result){
            
            Xdata_curr.push(result[0]);
            Ydata_curr.push(result[1]);
            
            if (Xdata_curr.length >= 10) {
                Xdata_curr.shift()
                Ydata_curr.shift()
            }

            var obj1 = new MyCharts(Xdata_curr, Ydata_curr, '.ct4-chart');
            obj1.createGraph();
            document.getElementById("card-curr").innerHTML = result[1];

        });
    }

    requestTemp();