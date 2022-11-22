/* * * * * * * * * * * * * * * * * * * * * *
*          CircleTimeline         *
* * * * * * * * * * * * * * * * * * * * * */


class CircleTimeline {

    constructor(parentElement, timelineData, gender) {
        this.parentElement = parentElement;
        this.timelineData = timelineData;
        this.gender = gender;

        //     define male and female colors
        this.colors = ["dodgerblue", "hotpink"]

        // console.log(timelineData);

        this.initVis()
    }

    initVis() {

        let vis = this;

        // margin conventions
        vis.margin = {top: 20, right: 20, bottom: 20, left: 40};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

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
                return 20 + i*150;
            })
            .attr('cy', 50)
            .attr('r', function(d) {
                if (vis.gender === "male") {
                    return d.male_trip_count / 10000;
                }
                else {
                    return d.female_trip_count / 10000;
                }
            })

        if (vis.gender === "female") {
            vis.circles.enter().append("text")
                .text(function(d) {
                    return d.year;
                })
                .attr('x', (d, i) => {
                    return i*150;
                })
                .attr('y', 150)
        }

    }

}

