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
        vis.margin = {top: 40, right: 40, bottom: 40, left: 40};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

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
        vis.xScale.domain(d3.extent(vis.data, function (d) {return d.Gender}));

        vis.yScale.domain([0,
            (d3.max(vis.data, function (d)  {return d[selectedCategorySymbolY]}))])

        vis.circles = vis.svg.selectAll('.circle')
            .data(vis.displayData)


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
            .attr("stroke", "black")
            .attr("cx", d => vis.xScale(d.Gender)+ 100)
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

        let yText = '';
        if (selectedCategorySymbolY === "LUTS") {
            yText = "Urinary Wellness"
        } else if (selectedCategorySymbolY === "NumbScore") {
            yText = "Degree of Genital Numbness"
        } else if (selectedCategorySymbolY === "NumbTime") {
            yText = "Length of Feeling of Numbness"
        } else if (selectedCategoryScatterY === "UTI") {
            yText = "History of UTI"
        } else if (selectedCategoryScatterY === "UTINum") {
            yText = "Number of Prior UTIs"
        } else if (selectedCategoryScatterY === "Nodules") {
            yText = "History of Genital + Perineal Nodules"
        } else if (selectedCategoryScatterY === "SaddleSores") {
            yText = "History of Saddle Sores"
        } else if (selectedCategoryScatterY === "IPSS") {
            yText = "Prostate Symptoms"
        } else if (selectedCategoryScatterY === "UrinaryFilling") {
            yText = "Urinary Filling Dysfunction"
        } else if (selectedCategoryScatterY === "UrinaryVoiding") {
            yText = "Urinary Voiding Dysfunction"
        }


        vis.xAxisGroup.call(d3.axisBottom(vis.xScale).ticks(2));
        vis.yAxisGroup.call(d3.axisLeft(vis.yScale).ticks(5));

        vis.yLab = vis.svg.append('g')

        vis.yLab
            .attr('class', 'yAxisLabel')
            .append('text')
            .text(yText)
            .attr('transform', `translate(-30, ${vis.height / 2})rotate(270)`)
            .attr('text-anchor', 'middle');

        //vis.yLab.exit().remove();
    }

}