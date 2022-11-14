
// init global variables & switches
let myCircleTimeline,
    myPieChart,
    myScatter,
    mySymbol1,
    mySymbol2,
    mySymbol3;


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
    }),
    d3.csv("data/healthdata.csv", d => {
        d.Height = +d.Height;
        d.Weight = +d.Weight;
        d.BMI = +d.BMI;
        d.LUTS = +d.LUTS;
        d.NumbScore = +d.NumbScore;
        d.UTINum = +d.UTINum;
        d.IPSS = +d.IPSS;
        d.UrinaryFill = +d.UrinaryFill;
        d.UrinaryVoiding = +d.UrinaryFill;
        return d;
    }),
    d3.csv("data/saddlehealthdata.csv", d => {
        d.LUTS = +d.LUTS;
        d.NumbScore = +d.NumbScore;
        d.UTI = +d.UTI;
        d.UTINum = +d.UTINum;
        d.Nodules = +d.Nodules;
        d.SaddleSores = +d.SaddleSores
        d.IPSS = +d.IPSS;
        d.UrinaryFill = +d.UrinaryFill;
        d.UrinaryVoiding = +d.UrinaryFill;
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
    myScatter = new ScatterPlot('scatter-area', listOfArrays[1])
    // mySymbol1 = new SymbolPlot('symbol-area1', listOfArrays[2])
    // mySymbol2 = new SymbolPlot('symbol-area2', listOfArrays[2])
    // mySymbol3 = new SymbolPlot('symbol-area3', listOfArrays[2])
}

let selectedCategoryScatterX =  document.getElementById('categorySelectorScatterX').value;
let selectedCategoryScatterY =  document.getElementById('categorySelectorScatterY').value;

function categoryChangeScatter() {
    selectedCategoryScatterX =  document.getElementById('categorySelectorScatterX').value;
    selectedCategoryScatterY =  document.getElementById('categorySelectorScatterY').value;
    myScatter.wrangleData();
    console.log(selectedCategoryScatterX)
    console.log(selectedCategoryScatterY)
}

let selectedCategorySymbolY =  document.getElementById('categorySelectorSymbolY').value;

function categoryChangeSymbol() {
    selectedCategorySymbolY =  document.getElementById('categorySelectorSymbolY').value;
    // mySymbol1.wrangleData();
    // mySymbol2.wrangleData();
    // mySymbol3.wrangleData();
    console.log(selectedCategorySymbolY)
}
