class ScatterPlot {

    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;

        this.initVis()
    }

   initVis(){
        let vis = this;
        console.log(vis.data)

       vis.margin = {top: 20, right: 20, bottom: 20, left: 40};
       vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
       vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

       // init drawing area
       vis.svg = d3.select("#" + vis.parentElement).append("svg")
           .attr("width", vis.width + vis.margin.left + vis.margin.right)
           .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
           .append('g')
           .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

       //scales
       // vis.xScale = d3.scaleLinear()
       //     .range([0,vis.width])

       vis.xScale = d3.scaleBand()
           .range([0,vis.width])

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

        console.log(selectedCategoryScatterX)
        console.log(selectedCategoryScatterY)

        vis.updateVis()
    }

    updateVis(){

        let vis = this;
        console.log("here!")

        vis.xScale.domain(d3.extent(vis.data, function (d) {return d[selectedCategoryScatterX]}));

        vis.yScale.domain([(d3.min(vis.data, function (d)  {return d[selectedCategoryScatterY]})),
            (d3.max(vis.data, function (d)  {return d[selectedCategoryScatterY]}))])

        vis.circles = vis.svg.selectAll('.circle')
            .data(vis.data)

        vis.circles.exit().remove();

        vis.circles.enter()
            .append("circle")
            .attr("class", "circle")
            .merge(vis.circles)
            .attr("fill", function (d) {
                if (d.Gender === "Male") {
                    return "dodgerblue"
                } else {
                    return "hotpink"
                }
            })
            .attr("cx", d => vis.xScale(d[selectedCategoryScatterX]))
            .attr('cy', d => vis.yScale(d[selectedCategoryScatterY]))
            .attr("r", 3)


        vis.xAxisGroup.call(d3.axisBottom(vis.xScale).ticks(5));
        vis.yAxisGroup.call(d3.axisLeft(vis.yScale).ticks(5));
    }

}