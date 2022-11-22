class ScatterPlot {

    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;

        this.initVis()
    }

    initVis() {
        let vis = this;

        vis.margin = {top: 30, right: 20, bottom: 20, left: 50};

        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .append('g')
            .attr('transform', `translate (${vis.margin.left + vis.margin.right}, -${vis.margin.top + vis.margin.bottom})`);

        // tooltip
        vis.tooltip = d3.select("#" + vis.parentElement).append('div')
            .attr('class', "tooltip")
            .attr('id', 'scatterTooltip')


        // axis groups
        vis.xAxisGroup = vis.svg.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate (0,${vis.height})`);
        vis.yAxisGroup = vis.svg.append('g')
            .attr('class', 'axis y-axis');

        this.wrangleData();

    }

    wrangleData() {

        let vis = this

       vis.data = vis.data.sort((a, b) => {
            return b[selectedCategoryScatterY] - a[selectedCategoryScatterY]
        })

        vis.updateVis()
    }

    updateVis() {

        let vis = this;

        vis.xScale = d3.scaleBand()
            .rangeRound([0, vis.width]).padding(1)
            .domain(vis.data.map(function (d) {
                return d[selectedCategoryScatterX]
            }))


        vis.yScale = d3.scaleBand()
            .rangeRound([0, vis.height])
            //.padding(1)
            .domain(vis.data.map(function (d) {
                return d[selectedCategoryScatterY]}
            ))
        xText, yText =  getText(selectedCategoryScatterX,selectedCategoryScatterY)
        // Get the Title for the selected category
        vis.titletext = 'Effect of ' + xText + " on " + yText;


        vis.xAxisGroup.transition().duration(300)
            .attr('transform', `translate (0, ${vis.height})`)
            .call(d3.axisBottom(vis.xScale));

        vis.yAxisGroup.call(d3.axisLeft(vis.yScale));


        vis.circles = vis.svg.selectAll('.circle')
            .data(vis.data)


        vis.circles.enter()
            .append("circle")
            .attr("class", "circle")
            .merge(vis.circles)
            .attr("fill", d => color(d.Gender))
            .style("opacity", 0.2)
            .attr("cx", d=> vis.xScale(d[selectedCategoryScatterX]))
            .attr('cy', d => vis.yScale(d[selectedCategoryScatterY]))
            .attr("r", 5)
            .on('mouseover', function (event, d) {

                vis.tooltip
                    .style("opacity", 1)
                    .style("left", event.pageX + 20 + "px")
                    .style("top", event.pageY + "px")
                    .html(`
                    <div style="border: thin solid grey; border-radius: 5px; background: white; padding: 10px">
                        <div style="font-size: 6px;">Gender: ${d.Gender}</div> 
                        <div style="font-size: 6px;">Length of Time Biking: ${d.RidingHistory}</div>     
                        <div style="font-size: 6px;">Biking Frequency: ${d.RidingFrequency}</div>
                        <div style="font-size: 6px;">Longest Distance Traveled: ${d.LongestDist}</div>
                        <div style="font-size: 6px;">Average Distance Traveled: ${d.AverageDist}</div>
                        <div style="font-size: 6px;">Average Speed: ${d.Speed}</div>
                        <div style="font-size: 6px;">Saddle Type: ${d.SaddleType}</div>
                        <div style="font-size: 6px;">Type of Bike: ${d.BikeType}</div>               
                    </div>`);
            })
            .on('mouseout', function (event, d) {
                vis.tooltip
                    .style("opacity", 0)
                    .style("left", 0)
                    .style("top", 0)
                    .html(``);
            })
        //.merge(vis.circles)


        vis.svg.selectAll(".title")
            .append('g')
            .attr('class', 'title')
            .append('text')
            .text(vis.titletext)
            .attr('transform', `translate(${vis.width / 2}, -20)`)
            .attr('text-anchor', 'middle');


        vis.svg
            .append('g')
            .attr('class', 'xAxisLabel')
            .append('text')
            .text(xText)
            .attr('transform', `translate(${vis.width / 2}, ${vis.height + 40})`)
            .attr('text-anchor', 'middle');

        vis.svg
            .append('g')
            .attr('class', 'yAxisLabel')
            .append('text')
            .text(yText)
            .attr('transform', `translate(-30, ${vis.height / 2})rotate(270)`)
            .attr('text-anchor', 'middle');

        vis.circles.exit().remove();

        function

        color(gender) {
            if (gender === "Male") {
                return "dodgerblue";
            } else {
                return "hotpink";
            }
        }

    }


}

