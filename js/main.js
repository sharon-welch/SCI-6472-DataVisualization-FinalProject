
// init global variables & switches
let myCircleTimeline,
    myPieChart,
    myScatter;


function updateAllVisualizations(){
    myPieChart.wrangleData()
}

//NOTE for team: below in initVis each new instance of a viz is created through calling the specific array that is within promises (array of array). This means that EACH ELEMENT IN THE PROMISES BELOW NEEDS TO STAY IN ORDER
let promises = [

    //array for circle timeline

    //array for pie chart
    d3.csv("data/scoping_napier.csv", d => {
        //QUESTION - does year need to be a datetime object? -nah
        d.year = +d.year;
        d.value = +d.value;
        return d;
    })

    //array for scatterplot



];

Promise.all(promises)
    .then( function(data){ initVisualizations(data) })
    .catch( function (err){console.log(err)} );


function initVisualizations (listOfArrays) {
    console.log(listOfArrays);

    myPieChart = new PieChart('pie-chart-div', listOfArrays[0])
}