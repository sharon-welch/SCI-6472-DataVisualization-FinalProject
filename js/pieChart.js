/* * * * * * * * * * * * * * * * * * * * * *
*          pieChart          *
* * * * * * * * * * * * * * * * * * * * * */

// /*
class PieChart {

    // constructor method to initialize Timeline object
    constructor(parentElement, pieData) {
        this.parentElement = parentElement;
        this.pieData = pieData;
        //TODO - array of circle colors and call colors below by spot in array
        // this.circleColors = ['#fff460', '#5d67f5'];

        //female, male, both
        this.pieColors = ['#7fcdbb', '#2c7fb8', '#edf8b1'];

        console.log(pieData)

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

        // TODO - add title
        vis.svg.append('g')
            .attr('class', 'title pie-title')
            .append('text')
            .text('Research Disparities: Gender and Seat Health')
            .attr('transform', `translate(${vis.width / 2}, 20)`)
            .attr('text-anchor', 'middle');


        // TODO - add legend

        //creat pie chart group
        vis.pieChartGroup = vis.svg.append('g')
            .attr('class', 'pie-chart')
            .attr("transform", "translate(" + vis.width / 2 + "," + vis.height / 2 + ")");

        //define inner and outer radius
        //define pie layout
        //set up your path generator

        vis.tooltip = d3.select("#" + vis.parentElement).append('div')
            .attr('class', "tooltip")
            .attr('id', 'pieTooltip')


        // call next method in pipeline
        this.wrangleData();
        this.updateVis()
    }

    //TODO - delete wrangle data

    // wrangleData method
    wrangleData() {

        let vis = this;

        vis.updateVis()

    }

    // updateVis method
    updateVis() {
        let vis = this;

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
            .data(vis.pie(vis.pieData))

        // console.log(vis.pie(vis.pieData));


        //set up path generator
        vis.arcs.enter()
            .append("path")
            .attr("d", vis.arc)
            .merge(vis.arcs)
            .style("fill", function(d,i) {
                if (vis.pieData[i].gender === "female") {
                    return vis.pieColors[0];
                    // return '#7fcdbb';
                }
                else if (vis.pieData[i].gender === "male") {
                    return vis.pieColors[1];
                }
                //QUESTION - why can't I put else here?
                else if (vis.pieData[i].gender === "both") {
                    return vis.pieColors[2];
                }
            })
            .style("stroke-dasharray", ("4,4"))
            .style("stroke-width", .25)
            .style("stroke", "black")


        .on('mouseover', function(event, d){
                vis.tooltip
                    .style("opacity", 1)
                    .style("left", event.pageX + 20 + "px")
                    .style("top", event.pageY + "px")
                    .html(`
                         <div style="border: thin solid grey; border-radius: 5px; background: lightgrey; padding: 20px">
                             <h3> Gender of Study: ${d.data.gender}<h3>
                             <h4> Study Name: ${d.data.study_name}</h4>
                             <h4> Study Type: ${d.data.study_type}</h4>
                             <h4> Publication Year: ${d.data.year}</h4>
                         
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
