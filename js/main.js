
// init global variables & switches
let myMaleCircleTimeline,
    myFemaleCircleTimeline,
    myPieChart,
    myScatter,
    mySymbol1,
    mySymbol2,
    mySymbol3,
    mySeatVis;


function updateAllVisualizations(){
    myPieChart.wrangleData()
}

//NOTE for team: below in initVis each new instance of a viz is created through calling the specific array that is within promises (array of array). This means that EACH ELEMENT IN THE PROMISES BELOW NEEDS TO STAY IN ORDER
let promises = [

    //array for circle timelines [0]
    d3.csv("data/demographics.csv", d => {
        d.year = +d.year;
        d.all_trips = +d.all_trips;
        d.female_trip_count = +d.female_trip_count;
        d.female_trip_percentage = +d.female_trip_percentage;
        d.male_trip_count = +d.male_trip_count;
        d.male_trip_percentage = +d.male_trip_percentage;
        return d;
    }),

    //array for pie chart [1]
    d3.csv("data/scoping_napier.csv", d => {
        //QUESTION - does year need to be a datetime object? -nah
        d.year = +d.year;
        d.value = +d.value;
        return d;
    }),

    //array for scatter plot [2]
    d3.csv("data/healthdata.csv", d => {
        d.Height = +d.Height;
        d.Weight = +d.Weight;
        d.BMI = +d.BMI;
        d.LUTS = +d.LUTS;
        d.NumbScore = +d.NumbScore;
        d.UTINum = +d.UTINum;
        d.IPSS = +d.IPSS;
        d.UrinaryFill = +d.UrinaryFill;
        d.UrinaryVoiding = +d.UrinaryVoiding;
        return d;
    }),

    //array for symbol charts [3]
    d3.csv("data/saddlehealthdata.csv", d => {
        d.LUTS = +d.LUTS;
        d.NumbScore = +d.NumbScore;
        d.UTI = +d.UTI;
        d.UTINum = +d.UTINum;
        d.Nodules = +d.Nodules;
        d.SaddleSores = +d.SaddleSores
        d.IPSS = +d.IPSS;
        d.UrinaryFill = +d.UrinaryFill;
        d.UrinaryVoiding = +d.UrinaryVoiding;
        return d;
    }),

    //array for bike seat vis - pressure for standard saddle [4]
    d3.csv("data/pressure_data_standard.csv", d => {
            d.value_female = +d.value_female;
            d.value_male = +d.value_male;
            return d;
    }),

    //array for bike seat vis - pressure for partial cutout saddle [5]
    d3.csv("data/pressure_data_partial_cutout.csv", d => {
        d.value_female = +d.value_female;
        d.value_male = +d.value_male;
        return d;
    }),

    //array for bike seat vis - pressure for complete cutout saddle [6]
    d3.csv("data/pressure_data_complete_cutout.csv", d => {
        d.value_female = +d.value_female;
        d.value_male = +d.value_male;
        return d;
    }),

    //array for bike seat vis [7]
    d3.csv("data/pressuremetrics_data.csv", d => {
        d.age = +d.age;
        d.height = +d.height;
        d.weight = +d.weight;
        d.pressure = +d.pressure;
        return d;
    })
];

Promise.all(promises)
    .then( function(data){ initVisualizations(data) })
    .catch( function (err){console.log(err)} );


function initVisualizations (listOfArrays) {
    // console.log(listOfArrays);
    myMaleCircleTimeline = new CircleTimeline('male-timeline-div', listOfArrays[0], "male")
    myFemaleCircleTimeline = new CircleTimeline('female-timeline-div', listOfArrays[0], "female")
    myPieChart = new PieChart('pie-chart-div', listOfArrays[1])
    myScatter = new ScatterPlot('scatter-area', listOfArrays[2])
    mySymbol1 = new SymbolPlot('symbol-area1', listOfArrays[3])
    mySymbol2 = new SymbolPlot('symbol-area2', listOfArrays[3])
    mySymbol3 = new SymbolPlot('symbol-area3', listOfArrays[3])
    // mySeatVis = new SeatVis('bike-seat-div', listOfArrays[4], listOfArrays[5], "female")
    mySeatVis1 = new SeatVis('bike-map1', listOfArrays[4], listOfArrays[7], "female")
    mySeatVis2 = new SeatVis('bike-map2', listOfArrays[5], listOfArrays[7], "female")
    mySeatVis3 = new SeatVis('bike-map3', listOfArrays[6], listOfArrays[7], "female")

}

function updateBikeSeat () {
    mySeatVis.updateText();
}

let selectedCategoryScatterX =  document.getElementById('categorySelectorScatterX').value;
let ScatterXLabel =  document.getElementById('categorySelectorScatterX').text;
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
    mySymbol1.wrangleData();
    mySymbol2.wrangleData();
    mySymbol3.wrangleData();
    console.log(selectedCategorySymbolY)
}
