/* * * * * * * * * * * * * * * * * * * * * *
*          pieChart          *
* * * * * * * * * * * * * * * * * * * * * */

// /*
class PieChart {

    // constructor method to initialize PieChart object
    constructor(parentElement, pieData) {
        this.parentElement = parentElement;
        this.pieData = pieData;
        //TODO - array of circle colors and call colors below by spot in array
        // this.circleColors = ['#fff460', '#5d67f5'];

        //female, male, both
        //this.pieColors = ['#7fcdbb', '#2c7fb8', '#edf8b1'];
        this.pieColors = ['hotpink', 'dodgerblue', '#8F7DDA'];

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


        // TODO - add legend
        // add color legend
    vis.legend = vis.svg.append("g");
        vis.maleLegend = vis.legend.append("circle").attr("cx", vis.width/2).attr("cy", vis.height-40).attr("r", 6).attr('stroke', 'black').style("fill", "dodgerblue")
        vis.maleLegendText = vis.legend.append("text").attr("x", vis.width/2+10).attr("y", vis.height-40).text("Male").style("font-size", "15px").attr("alignment-baseline","middle")
        vis.femaleLegend = vis.legend.append("circle").attr("cx",vis.width/2).attr("cy", vis.height-20).attr("r", 6).attr('stroke', 'black').style("fill", "hotpink")
        vis.femaleLegendText = vis.legend.append("text").attr("x", vis.width/2+10).attr("y", vis.height-20).text("Female").style("font-size", "15px").attr("alignment-baseline","middle")
        vis.bothLegend = vis.legend.append("circle").attr("cx",vis.width/2).attr("cy", vis.height).attr("r", 6).attr('stroke', 'black').style("fill", '#8F7DDA')
        vis.bothLegendText = vis.legend.append("text").attr("x", vis.width/2+10).attr("y", vis.height).text("Both").style("font-size", "15px").attr("alignment-baseline","middle")

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
        // this.wrangleData()
        this.updateVis();
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

        //TODO - fix width of pie chart

        //define inner and outer radius
        // let outerRadius = vis.width / 2;
        let outerRadius = 150;
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


            //TODO - fix position


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
