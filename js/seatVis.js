/* * * * * * * * * * * * * * * * * * * * * *
*          seatVis        *
* * * * * * * * * * * * * * * * * * * * * */

// This is our novel visualization. We will be creating a bike seat with 3 radial heat maps.
// examples to follow: https://www.prcweb.co.uk/circularheatchart, https://d3-graph-gallery.com/graph/heatmap_basic.html


class SeatVis {

    constructor(parentElement, seatData) {
        this.parentElement = parentElement;
        this.seatData = seatData;
        //TODO - array of circle colors and call colors below by spot in array
        // this.circleColors = ['#fff460', '#5d67f5'];

        //color scale
        this.myColor = d3.scaleLinear()
            .range(["white", "black"])
            .domain([1,30])

        // console.log(seatData);

        // call initVis method
        this.initVis()
    }

    initVis() {

        let vis = this

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

        // console.log(vis.myRows);
        // console.log(vis.myColumns);

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

        vis.circleRadius = 40

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
            //TODO - create a radius that isn't hardcoded
            .attr("r", vis.circleRadius)
            // .attr("width", x.bandwidth() )
            // .attr("height", y.bandwidth() )
            .style("fill", function (d) {
                return vis.myColor(d.value)
            })
            .style("stroke-width", 2)
            .style("stroke", function (d) {
                if (d.value === 0) {
                    return "none";
                } else {
                    return "black";
                }
            })
    }

}