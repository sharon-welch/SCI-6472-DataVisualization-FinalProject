/* * * * * * * * * * * * * * * * * * * * * *
*          CircleTimeline         *
* * * * * * * * * * * * * * * * * * * * * */


class CircleTimeline {

    constructor(parentElement, timelineData, gender) {
        this.parentElement = parentElement;
        this.timelineData = timelineData;
        this.gender = gender;
        this.id = "circle-legend";

        //     define male and female colors
        this.colors = ["dodgerblue", "hotpink"]

        // console.log(timelineData);

        this.initVis()
    }

    initVis() {

        let vis = this;

        // margin conventions
        vis.margin = {top: 20, right: 20, bottom: 20, left: 30};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")")
            .style("display", "block")
            .style("margin", "auto");

        vis.tooltip = d3.select("#" + vis.parentElement).append('div')
            .attr('class', "tooltip")
            .attr('id', 'timelineTooltip')

        vis.wrangleData();
    }

    wrangleData() {
        let vis = this;

        vis.updateVis();
    }

    updateVis() {
        let vis = this;

        vis.circles = vis.svg.selectAll('circle').data(vis.timelineData);

        vis.circles.enter().append('circle')
            .attr('class', 'circle')
            .merge(vis.circles)
            .attr('stroke', 'black')
            .attr('fill', function(d) {
                if (vis.gender === "male") {
                    return vis.colors[0];
                }
                else {
                    return vis.colors[1];
                }
            })
            .attr('cx', (d,i) => {
                if (i <= 4) {
                    return (vis.width/2) - 50 - (100*(4-i))
                    //return (vis.width/2) - (0.6*((vis.width/2)/5)) - ((4-i)*((vis.width/2)/5))
                }
                else {
                    return (vis.width/2) + 50 + (100*(i-5))
                    //return (vis.width/2) + (0.6*((vis.width/2)/5)) + ((i-5)*((vis.width/2)/5))
                }
            })
            .attr('cy', function(d) {
                if(vis.gender === "male") {
                    return 60;
                }
                else {
                    return 20;
                }
            })
            .attr('r', function(d) {
                if (vis.gender === "male") {
                    return (d.male_trip_count/10000)/1.5;
                }
                else {
                    return (d.female_trip_count/10000)/1.5;
                }
            })
            .on('mouseover', function(event, d) {
                vis.tooltip
                    .style("opacity", 1)
                    .style("left", event.offsetX - 80 + "px")
                    .style("top", event.offsetY + 5 + "px")
                    .html(`
                         <div style="border: thin solid grey; border-radius: 5px; background: white; padding: 10px">
                             <p> Number of bike trips by male riders: ${d.male_trip_count}<p>
                             <p> Number of bike trips by female riders: ${d.female_trip_count}<p>
                         </div>`)
            })
            .on('mouseout', function(event, d){
                 vis.tooltip
                     .style("opacity", 0)
                     .style("left", 0)
                     .style("top", 0)
                     .html(``)
            })

        if (vis.gender === "female") {
            vis.circles.enter().append("text")
                .text(function(d) {
                    return d.year;
                })
                .attr('x', (d, i) => {
                    if (i <= 4) {
                        return (vis.width/2) - 50 - (100*(4-i)) - 20;
                    }
                    else {
                        return (vis.width/2) + 50 + (100*(i-5)) - 20;
                    }
                })
                .attr('y', 70)

            vis.legend = d3.select("#" + vis.id).append("svg")
                .attr("width", vis.width)
                .attr("height", 50)
                //.attr("style", "outline: thin solid black;")

            vis.box = vis.legend.append("rect")
                .attr("x", 200)
                .attr("y", 5)
                .attr("height", 40)
                .attr("width", 90)
                .attr("fill", "transparent")
                .attr("style", "outline: thin solid black;");

            vis.maleLegend = vis.legend.append("circle").attr("cx", 210).attr("cy", 15).attr("r", 6).attr('stroke', 'black').style("fill", "dodgerblue")
            vis.maleLegendText = vis.legend.append("text").attr("x", 230).attr("y", 15).text("Male").style("font-size", "15px").attr("alignment-baseline","middle")
            vis.femaleLegend = vis.legend.append("circle").attr("cx",210).attr("cy", 35).attr("r", 6).attr('stroke', 'black').style("fill", "hotpink")
            vis.femaleLegendText = vis.legend.append("text").attr("x", 230).attr("y", 35).text("Female").style("font-size", "15px").attr("alignment-baseline","middle")
        }

    }

}

