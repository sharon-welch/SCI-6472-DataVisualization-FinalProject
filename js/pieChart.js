/* * * * * * * * * * * * * * * * * * * * * *
*          pieChart          *
* * * * * * * * * * * * * * * * * * * * * */

// /*
class PieChart {

    // constructor method to initialize Timeline object
    constructor(parentElement) {
        this.parentElement = parentElement;
        this.circleColors = ['#fff460', '#5d67f5'];

        // call initVis method
        this.initVis()
    }

    initVis() {
        let vis = this;

        // margin conventions
        vis.margin = {top: 10, right: 50, bottom: 10, left: 50};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        // add title
        vis.svg.append('g')
            .attr('class', 'title pie-title')
            .append('text')
            .text('Title for Pie Chart')
            .attr('transform', `translate(${vis.width / 2}, 20)`)
            .attr('text-anchor', 'middle');


        // TODO

        //creat pie chart group
        vis.pieChartGroup = vis.svg.append('g')
            .attr('class', 'pie-chart')
            .attr("transform", "translate(" + vis.width / 2 + "," + vis.height / 2 + ")");

        //define inner and outer radius
        //define pie layout
        //set up your path generator

        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'pieTooltip')



        // call next method in pipeline
        this.wrangleData();
    }

    // wrangleData method
    wrangleData() {


        let vis = this

        //TODO - convert data types
        vis.
        vis.displayData = []

        // generate random data
        for (let i = 0; i < 4; i++) {
            let random = Math.floor(Math.random() * 100)
            vis.displayData.push({
                value: random,
                color: vis.circleColors[i]
            })
        }

        vis.updateVis()

    }

    // updateVis method
    updateVis() {
        let vis = this;

        console.log("displayData: ", vis.displayData)

        // TODO

        //define inner and outer radius
        let outerRadius = vis.width / 2;
        let innerRadius = 0;

        //define pie layout
        vis.pie = d3.pie()
            .value(d => d.value);

        vis.arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

        // Bind data
        vis.arcs = vis.pieChartGroup.selectAll(".arc")
            .data(vis.pie(vis.displayData))

        console.log(vis.pie(vis.displayData));



        //set up your path generator
        //TODO: WHY ARE THERE ONLY 3 ARCS? + change color when I hover over them
        vis.arcs.enter()
            .append("path")
            .attr("d", vis.arc)
            .merge(vis.arcs)
            // .style("fill", function(d, index) { return vis.displayData.data[index]; });
            .style("fill", d => d.data.color)

            .on('mouseover', function(event, d){
                vis.tooltip
                    .style("opacity", 1)
                    .style("left", event.pageX + 20 + "px")
                    .style("top", event.pageY + "px")
                    .html(`
                         <div style="border: thin solid grey; border-radius: 5px; background: lightgrey; padding: 20px">
                             <h3>Arc with index #${d.index}<h3>
                             <h4> value: ${d.value}</h4>      
                             <h4> startAngle: ${d.startAngle}</h4>
                             <h4> endAngle: ${d.endAngle}</h4>   
                             <h4> data: ${JSON.stringify(d.data)}</h4>                         
                         </div>`)
            })

            .on('mouseout', function(event, d){
                d3.select(this)
                    .attr('stroke-width', '0px')
                    .attr("fill", d => d.data.color)

                vis.tooltip
                    .style("opacity", 0)
                    .style("left", 0)
                    .style("top", 0)
                    .html(``);
            })






    }
}

 // */
