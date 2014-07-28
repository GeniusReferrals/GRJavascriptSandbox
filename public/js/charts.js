function generateGraph(title, field, color) {
    var graph = new AmCharts.AmGraph();
    graph.title = title;
    graph.valueField = field;
    graph.lineThickness = 2;
    graph.lineColor = color;
    graph.fillAlphas = 0.3;
    return graph;
}

function generateLegend() {
    legend = new AmCharts.AmLegend();
    legend.align = "center";
    legend.markerType = "circle";
    return legend;
}

function generateChartPie(container, data) {
    chartPie = new AmCharts.AmPieChart();
    chartPie.addTitle("Averages", 14);
    chartPie.dataProvider = data;
    chartPie.titleField = "name";
    chartPie.valueField = "value";
    chartPie.sequencedAnimation = true;
    chartPie.startEffect = "elastic";
    chartPie.innerRadius = "30%";
    chartPie.startDuration = 2;
    chartPie.labelText = "";
    chartPie.colors = ["#3764a2", "#91c1db", "#ddbca6", "#d14f53", "#e1eb6e", "#82b400", "#daad41", "#fa7f00"];
    chartPie.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
    chartPie.addLegend(generateLegend());
    chartPie.depth3D = 10;
    chartPie.angle = 55;
    chartPie.invalidateSize();
    chartPie.write(container);
}


var chartSerial;
var chartData = [];
function generateChartSerial(container, data) {

    chartSerial = new AmCharts.AmSerialChart();
    chartSerial.pathToImages = $('#data').data('amcharts-images');
    chartSerial.dataProvider = data;
    chartData = data;
    chartSerial.categoryField = "date";
    chartSerial.addListener('dataUpdated', zoomChart);

    //Axis y
    var categoryAxis = chartSerial.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minorGridEnabled = true;
    categoryAxis.autoGridCount = false;
    categoryAxis.gridCount = 31;
    categoryAxis.axisColor = "#DADADA";
    categoryAxis.dateFormats = [{
            period: 'DD',
            format: 'DD'
        }, {
            period: 'WW',
            format: 'MMM DD'
        }, {
            period: 'MM',
            format: 'MMM'
        }, {
            period: 'YYYY',
            format: 'YYYY'
        }];

    //Axis x
    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.axisAlpha = 0;
    valueAxis.dashLength = 1;
    chartSerial.addValueAxis(valueAxis);

    chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorPosition = "mouse";
    chartCursor.pan = false;
    chartCursor.zoomable = true;
    chartSerial.addChartCursor(chartCursor);

    if (container == 'serial-chart-share-daily')
    {
        chartSerial.addGraph(generateGraph("Facebook share", "facebook_share", "#3764a2"));
        chartSerial.addGraph(generateGraph("Twitter post", "twitter_post", "#91c1db"));
        chartSerial.addGraph(generateGraph("Google plus", "google_plus", "#e1eb6e"));
        chartSerial.addGraph(generateGraph("LinkedIn post", "linkedin_post", "#ddbca6"));
        graph = generateGraph("Pin it", "pin_it", "#d14f53");
        chartSerial.addGraph(graph);
    }
    else if (container == 'serial-chart-click-daily')
    {
        chartSerial.addGraph(generateGraph("Facebook share", "facebook_share", "#3764a2"));
        chartSerial.addGraph(generateGraph("Twitter post", "twitter_post", "#91c1db"));
        chartSerial.addGraph(generateGraph("Google plus", "google_plus", "#e1eb6e"));
        chartSerial.addGraph(generateGraph("LinkedIn post", "linkedin_post", "#ddbca6"));
        chartSerial.addGraph(generateGraph("Pin it", "pin_it", "#d14f53"));
        chartSerial.addGraph(generateGraph("PURL", "personal_url", "#82b400"));
        graph = generateGraph("Email", "direct_email", "#daad41");
        chartSerial.addGraph(graph);
    }
    else
    {
        chartSerial.addGraph(generateGraph("Facebook share", "facebook_share", "#3764a2"));
        chartSerial.addGraph(generateGraph("Twitter post", "twitter_post", "#91c1db"));
        chartSerial.addGraph(generateGraph("Google plus", "google_plus", "#e1eb6e"));
        chartSerial.addGraph(generateGraph("LinkedIn post", "linkedin_post", "#ddbca6"));
        chartSerial.addGraph(generateGraph("Pin it", "pin_it", "#d14f53"));
        chartSerial.addGraph(generateGraph("PURL", "personal_url", "#82b400"));
        chartSerial.addGraph(generateGraph("Email", "direct_email", "#daad41"));
        graph = generateGraph("Other", "other", "#fa7f00");
        chartSerial.addGraph(graph);
    }

    var chartScrollbar = new AmCharts.ChartScrollbar();
    chartScrollbar.scrollbarHeight = 30;

    chartSerial.addChartScrollbar(chartScrollbar);

    chartSerial.addLegend(generateLegend());

    chartSerial.write(container);
}

function zoomChart() {
    chartSerial.zoomToIndexes(chartData.length - 7, chartData.length - 1);
}