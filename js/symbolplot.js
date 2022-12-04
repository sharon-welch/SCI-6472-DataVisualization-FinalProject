class SymbolPlot {

    constructor(parentElement, data, saddleType) {
        this.parentElement = parentElement;
        this.data = data;
        this.saddleType = saddleType;
        this.displayData = [];

        this.initVis()

    }

    initVis(){

        let vis = this;
        vis.margin = {top: 40, right: 40, bottom: 40, left: 50};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        vis.xScale = d3.scaleBand()
            .rangeRound([0,vis.width]).padding(1)

        vis.yScale = d3.scaleLinear()
            .range([vis.height,0]);

        // axis groups
        vis.xAxisGroup = vis.svg.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate (0,${vis.height})`);
        vis.yAxisGroup = vis.svg.append('g')
            .attr('class', 'axis y-axis');

        this.wrangleData();

    }

    wrangleData(){

        let vis = this

        for (let i = 0; i < vis.data.length; i++) {
            if (vis.parentElement === "symbol-area1") {
                if (vis.data[i].SaddleType === "Standard") {
                   vis.displayData.push(vis.data[i])
                }
            } else if (vis.parentElement === "symbol-area2") {
                if (vis.data[i].SaddleType === "Partial") {
                    vis.displayData.push(vis.data[i])
                }
            } else if (vis.parentElement === "symbol-area3") {
                if (vis.data[i].SaddleType === "Complete") {
                    vis.displayData.push(vis.data[i])
                }
            }
        }

       console.log(vis.displayData)

        vis.updateVis()
    }

    updateVis(){

        let vis = this;
        vis.xScale.domain(["Male","Female"]) // allows control over order

        vis.yScale.domain([0,
            (d3.max(vis.data, function (d)  {return d[selectedCategorySymbolY]}))])

        vis.circles = vis.svg.selectAll('.circle')
            .data(vis.displayData)

        vis.circles.exit()
            .transition()
            .duration(500).remove();

        vis.circles.enter()
            .append("circle")
            .attr("class", "circle")
            .merge(vis.circles)
            .transition()
            .duration(500)
            .attr("fill", function (d) {
                if (d.Gender === "Male") {
                    return "dodgerblue"
                } else {
                    return "hotpink"
                }
            })
            .attr("stroke", "black")
            .attr("cx", d => vis.xScale(d.Gender))
            .attr('cy', d => vis.yScale(d[selectedCategorySymbolY]))
            .attr("r", 10)

        let title = '';
        if (vis.parentElement === 'symbol-area1') {
            title = "Health Outcomes for Standard Saddle"
        } else if (vis.parentElement === 'symbol-area2') {
            title = "Health Outcomes for Partial Cutout Saddle"
        } else if (vis.parentElement === 'symbol-area3') {
            title = "Health Outcomes for Complete Cutout Saddle"
        }

        vis.svg
            .append('g')
            .attr('class', 'title')
            .append('text')
            .text(title)
            .attr('transform', `translate(${vis.width / 2}, -20)`)
            .attr('text-anchor', 'middle');

        console.log(selectedCategorySymbolY)

        yTextSymbol =  getTextSymbol(selectedCategorySymbolY)

        console.log("test - " + yText)

        vis.xAxisGroup.call(d3.axisBottom(vis.xScale).ticks(2));

        vis.yAxisGroup.transition().duration(500)
            .call(d3.axisLeft(vis.yScale).ticks(5));

        vis.yAxisLabel = vis.svg.selectAll('.yAxisLabel1')
            .data(yTextSymbol)

        vis.yAxisLabel.enter().append("text")
            .attr('class', 'yAxisLabel1')
            .merge(vis.yAxisLabel)
            .text(yTextSymbol)
            .attr('transform', `translate(-30, ${vis.height / 2})rotate(270)`)
            .attr('text-anchor', 'middle');

        vis.yAxisLabel.exit().remove();

    }

}