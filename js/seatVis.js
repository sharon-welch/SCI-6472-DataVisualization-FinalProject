/* * * * * * * * * * * * * * * * * * * * * *
*          seatVis        *
* * * * * * * * * * * * * * * * * * * * * */

// This is our novel visualization. We will be creating a bike seat with 3 radial heat maps.
// examples to follow: https://www.prcweb.co.uk/circularheatchart, https://d3-graph-gallery.com/graph/heatmap_basic.html


class SeatVis {

    constructor(parentElement, seatData, metricsData, gender) {
        this.parentElement = parentElement;
        this.seatData = seatData;
        this.metricsData = metricsData;
        this.gender = gender;

        //color gradient for male
        this.myMaleColor = d3.scaleLinear()
            .range(["white", "dodgerblue"])
            .domain([1,30])

        //color gradient for female
        this.myFemaleColor = d3.scaleLinear()
            .range(["white", "hotpink"])
            .domain([1,30])

        //initial color
        this.initialColor = "white";

        // call initVis method
        this.initVis()
    }

    initVis() {

        let vis = this;

        //margins
        vis.margin = {top: 10, right: 50, bottom: 10, left: 50};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        vis.myRows = Array.from(new Set(vis.seatData.map(d => d.row)))
        vis.myColumns = Array.from(new Set(vis.seatData.map(d => d.column)))

        //build x scale
        vis.xScale = d3.scaleBand()
            .range([ 0, vis.width ])
            .domain(vis.myRows)
            .padding(0.05);

        // Build Y scales
        vis.yScale = d3.scaleBand()
            .range([ vis.height, 0 ])
            .domain(vis.myColumns)
            .padding(0.05);

        vis.updateVis()
    }

    updateVis() {

        let vis = this;
        console.log("actual vis gender is " + vis.gender)

        vis.circleRadius = vis.width/32

        //add circles
        vis.svg.selectAll()
            .data(vis.seatData, function (d) {
                return d.column + ':' + d.row;
            })
            .join("circle")
            .attr("cx", function (d) {
                return vis.xScale(d.row)
            })
            .attr("cy", function (d) {
                return vis.yScale(d.column) + vis.circleRadius
            })
            .attr("r", vis.circleRadius)
            .style("fill", function (d) {
                if (vis.gender === "female") {
                    console.log("updating female dots")
                    return vis.myFemaleColor(d.value_female)
                }
                else {
                    if (vis.gender === "male") {
                        console.log("updating male dots")
                        return vis.myMaleColor(d.value_male)
                    }
                    else {
                        return vis.initialColor;
                    }
                }
            })
            .style("stroke-width", .5)
            .style("stroke", function (d) {
                if (vis.gender === "female") {
                    console.log("updating female circles")
                    if (d.value_female === 0) {
                        return "none";
                    } else {
                        return "gray";
                    }
                }
                else {
                    console.log("updating male circles")
                    if (d.value_male === 0) {
                        return "none";
                    } else {
                        return "gray";
                    }
                }
            })
    }

    updateText() {
        let vis = this;
        // update the selected gender in the dropdown based on user input
        let selectBox = document.getElementById("gender");
        let selectedGender = selectBox.options[selectBox.selectedIndex].value;
        vis.gender = selectedGender;
        vis.updateVis();

        // get metrics from data file
        let age_metrics = Array.from(new Set (vis.metricsData.map(d => d.age)));
        let height_metrics = Array.from(new Set (vis.metricsData.map(d => d.height)));
        let weight_metrics = Array.from(new Set (vis.metricsData.map(d => d.weight)));
        let pressure_metrics = Array.from(new Set (vis.metricsData.map(d => d.pressure)));

        // get metrics input by user
        let inputAge = document.getElementById("age");
        let selectedAge = inputAge.value;
        let inputHeight = document.getElementById("height");
        let selectedHeight = inputHeight.value;
        let inputWeight = document.getElementById("weight");
        let selectedWeight = inputWeight.value;

        let mean_index, sd_index;

        if(vis.gender === "female") {
            mean_index = 0;
            sd_index = 1;
        }
        else {
            mean_index = 2;
            sd_index = 3;
        }

        // calculate average bike seat pressure based on user input
        let age_percentage = (selectedAge-age_metrics[mean_index])/age_metrics[sd_index];
        let height_percentage = (selectedHeight-height_metrics[mean_index])/height_metrics[sd_index];
        let weight_percentage = (selectedWeight-weight_metrics[mean_index])/weight_metrics[sd_index];

        let avg_percentage = (age_percentage+height_percentage+weight_percentage)/3;
        let difference = (Math.round((avg_percentage*pressure_metrics[sd_index])*100))/100;
        let avg_pressure = pressure_metrics[mean_index];
        let user_pressure = avg_pressure + difference;

        // the seat pressure can't be negative, so round any seat negative pressures to 0
        if (user_pressure < 0) {
            user_pressure = 0;
            difference = -1*avg_pressure;
        }

        // once the user has selected a gender, display the sentence with their estimated average bike seat pressure
        if (selectedGender !== "chooseGender") {
            document.getElementById("metric-text").innerText =
                "The average standard saddle pressure for " + selectedGender + " riders with your metrics was " + user_pressure.toFixed(2) + " kPa, which is "
                + Math.abs(difference) + " kPa off from the average pressure for " + selectedGender + " riders, " + avg_pressure + " kPa."
        }
    }

}