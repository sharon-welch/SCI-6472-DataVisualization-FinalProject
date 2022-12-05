/* * * * * * * * * * * * * * * * * * * * * *
*          pieChart          *
* * * * * * * * * * * * * * * * * * * * * */

// /*
class PieChart {

    // constructor method to initialize PieChart object
    constructor(parentElement, pieData) {
        this.parentElement = parentElement;
        this.pieData = pieData;

        //female, male, both
        //this.pieColors = ['#7fcdbb', '#2c7fb8', '#edf8b1'];
        this.pieColors = ['hotpink', 'dodgerblue', '#8F7DDA'];
        this.id = "pie-legend";

        // console.log("pieData", pieData)

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

        // title
        vis.svg.append('g')
            .attr('class', 'title pie-title')
            .append('text')
            .text('Research Disparities: Gender and Seat Health')

            .attr('transform', `translate(${vis.width / 2}, 20)`)
            .attr('text-anchor', 'middle');


        // add color legend
        vis.legend = d3.select("#" + vis.id).append("svg")
            .attr("width", 80)
            .attr("height", 60)
            .attr("style", "outline: thin solid black;");

        vis.maleLegend = vis.legend.append("circle").attr("cx", 10).attr("cy", 10).attr("r", 6).attr('stroke', 'black').style("fill", "dodgerblue")
        vis.maleLegendText = vis.legend.append("text").attr("x", 20).attr("y", 10).text("Male").style("font-size", "15px").attr("alignment-baseline","middle")
        vis.femaleLegend = vis.legend.append("circle").attr("cx",10).attr("cy", 30).attr("r", 6).attr('stroke', 'black').style("fill", "hotpink")
        vis.femaleLegendText = vis.legend.append("text").attr("x", 20).attr("y", 30).text("Female").style("font-size", "15px").attr("alignment-baseline","middle")
        vis.bothLegend = vis.legend.append("circle").attr("cx",10).attr("cy", 50).attr("r", 6).attr('stroke', 'black').style("fill", '#8F7DDA')
        vis.bothLegendText = vis.legend.append("text").attr("x", 20).attr("y", 50).text("Both").style("font-size", "15px").attr("alignment-baseline","middle")

        //create pie chart group
        vis.pieChartGroup = vis.svg.append('g')
            .attr('class', 'pie-chart')
            .attr("transform", "translate(" + vis.width / 2 + "," + vis.height / 2 + ")");

        // tooltip
        vis.tooltip = d3.select("#" + vis.parentElement).append('div')
            .attr('class', "tooltip")
            .attr('id', 'pieTooltip')


        // call next method in pipeline
        this.updateVis();
    }


    // updateVis method
    updateVis() {
        let vis = this;

        //define inner and outer radius
        let outerRadius = vis.height/2.5;
        // let outerRadius = 150;
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
                }
                else if (vis.pieData[i].gender === "male") {
                    return vis.pieColors[1];
                }
                //QUESTION - why can't I put else here?
                else if (vis.pieData[i].gender === "both") {
                    return vis.pieColors[2];
                }
            })
            .style("stroke-width", .25)
            .style("stroke", "black")

            //tooltip
            .on('mouseover', function(event, d){
                vis.tooltip
                    .style("opacity", 1)
                    .style("left", event.offsetX - 100 + "px")
                    .style("top", event.offsetY + 5 + "px")
                    .html(`
                         <div style="border: thin solid grey; border-radius: 5px; background: white; padding: 10px">
                             <p> Gender of Study: ${d.data.gender}<p>
                             <p> Study Name: ${d.data.study_name}</p>
                             <p> Study Type: ${d.data.study_type}</p>
                             <p> Publication Year: ${d.data.year}</p>
                         
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
