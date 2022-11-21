class ScatterPlot {

    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;

        this.initVis()
    }

    initVis(){
        let vis = this;
        console.log(vis.data)

        vis.margin = {top: 40, right: 20, bottom: 50, left: 50};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // tooltip
        vis.tooltip = d3.select("#" + vis.parentElement).append('div')
            .attr('class', "tooltip")
            .attr('id', 'scatterTooltip')

        //scales
        // vis.xScale = d3.scaleLinear()
        //     .range([0,vis.width])
        //
        // vis.xScale = d3.scaleBand()
        //     .range([0,vis.width])
        //
        // vis.yScale = d3.scaleLinear()
        //     .range([vis.height,0]);

        // vis.yScale = d3.scaleBand()
        //     .range([vis.height,0]);

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

        vis.xScale = d3.scaleBand()
            .range([0,vis.width])
            .domain(vis.data.map( function (d) {return d[selectedCategoryScatterX]}))

        vis.yScale = d3.scaleLinear()
            .domain([0, (d3.max(vis.data, function (d)  {return d[selectedCategoryScatterY]}))])
            .range([vis.height,0])

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
            .attr("fill", function (d) {
                if (d.Gender === "Male") {
                    return "dodgerblue"
                } else {
                    return "hotpink"
                }
            })
            .style("opacity", 0.2)
            .attr("x", d => vis.xScale(d[selectedCategoryScatterX])+vis.margin.left)
            .attr('y', d => vis.yScale(d[selectedCategoryScatterY]))
            .attr("cx", function (d){
                console.log(vis.xScale(d[selectedCategoryScatterX]))
                vis.xPos = vis.xScale(d[selectedCategoryScatterX])+ (vis.margin.left -6)
                return vis.xPos;
            })
            .attr('cy', d => vis.yScale(d[selectedCategoryScatterY]))
            .attr("r", 5)
            .on('mouseover', function(event, d){

                console.log(event);

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
            .on('mouseout', function(event, d){
                vis.tooltip
                    .style("opacity", 0)
                    .style("left", 0)
                    .style("top", 0)
                    .html(``);})
            //.merge(vis.circles)




        let xText = '';
        if (selectedCategoryScatterX === "RidingHistory") {
            xText = "Length of Time Biking"
        } else if (selectedCategoryScatterX === "RidingFrequency") {
            xText = "Biking Frequency"
        } else if (selectedCategoryScatterX === "LongestDist") {
            xText = "Longest Distance Traveled"
        } else if (selectedCategoryScatterX === "AverageDist") {
            xText = "Average Distance Traveled"
        } else if (selectedCategoryScatterX === "Speed") {
            xText = "Average Speed"
        } else if (selectedCategoryScatterX === "Standing") {
            xText = "% Time Standing During a Ride"
        } else if (selectedCategoryScatterX === "PaddedShorts") {
            xText = "How Often Padded Shorts Are Worn"
        } else if (selectedCategoryScatterX === "SaddleType") {
            xText = "Type of Saddle"
        } else if (selectedCategoryScatterX === "SaddleAngle") {
            xText = "Angle of Saddle"
        } else if (selectedCategoryScatterX === "BikeType") {
            xText = "Type of Bike"
        } else if (selectedCategoryScatterX === "HandleBars") {
            xText = "Height of Handlebars (Compared to Saddle)"
        } else if (selectedCategoryScatterX === "Surface") {
            xText = "Typical Surface for Biking"
        }

        let yText = '';
        if (selectedCategoryScatterY === "LUTS") {
            yText = "Urinary Wellness"
        } else if (selectedCategoryScatterY === "NumbScore") {
            yText = "Degree of Genital Numbness"
        } else if (selectedCategoryScatterY === "NumbTime") {
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


        let titletext = 'Effect of ' + xText + " on " + yText;
        console.log(titletext)

        //vis.title = vis.svg.append('g')

        //vis.title.enter()
        vis.svg.append('g')
            .attr('class', 'title')
            .append('text')
            //.merge(vis.title)
            .text(titletext)
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

    }

}