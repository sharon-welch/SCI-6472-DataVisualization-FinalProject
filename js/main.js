
// init global variables & switches
let myCircleTimeline,
    myPieChart;

function updateAllVisualizations(){
    myPieChart.wrangleData()
}



let promises = [
    d3.csv("data/demographics.csv")
];