class ScatterPlot {

    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;
        this.yDomain = [];
        this.xDomain = [];

        this.initVis()
    }

    initVis() {
        let vis = this;

        vis.margin = {top: 30, right: 0, bottom: 0, left: 50};

        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .append('g')
            .attr('transform', `translate (${vis.margin.left + vis.margin.right}, -${vis.margin.top + vis.margin.bottom})`)

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

        // sorting the y axis
        if (selectedCategoryScatterY === "LUTS") {
            vis.yDomain = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
        } else if (selectedCategoryScatterY === "NumbScore") {
            vis.yDomain = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        } else if (selectedCategoryScatterY === "NumbTime") {
            vis.yDomain = ["N/A","Less than 60 Seconds","1-59 Minutes","1- 24 Hours","More than 24 hours"]
        } else if (selectedCategoryScatterY === "UTI") {
            vis.yDomain = ["No","Yes"]
        } else if (selectedCategoryScatterY === "UTINum") {
            vis.yDomain = [0, 1, 2, 3, 4, 5]
        } else if (selectedCategoryScatterY === "Nodules") {
            vis.yDomain = ["No","Yes"]
        } else if (selectedCategoryScatterY === "SaddleSores") {
            vis.yDomain = ["No","Yes"]
        } else if (selectedCategoryScatterY === "IPSS") {
            vis.yDomain = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]
        } else if (selectedCategoryScatterY === "UrinaryFilling") {
            // there's something wrong with this...
            vis.yDomain = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        } else if (selectedCategoryScatterY === "UrinaryVoiding") {
            vis.yDomain = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        }

        // sorting the x axis
        if (selectedCategoryScatterX === "RidingHistory") {
            vis.xDomain = ["6 months or less","6 months - 1year", "2 - 5 years", "5 -10 years","More than 10 years"]
        } else if (selectedCategoryScatterX === "RidingFrequency") {
            vis.xDomain = ["Yearly","Monthly","Once/ week","Twice/ week","3-5 times/ week", "Daily"]
        } else if (selectedCategoryScatterX === "LongestDist") {
            vis.xDomain = ["Less than 1 mile","1-5 miles","5-10 miles","10-25 miles","25-50 miles","More than 50 miles"]
        } else if (selectedCategoryScatterX === "AverageDist") {
            vis.xDomain = ["Less than 1 mile","1-5 miles","5-10 miles","10-25 miles","25-50 miles","More than 50 miles"]
        } else if (selectedCategoryScatterX === "Speed") {
            vis.xDomain = ["Less than 5miles/hr","5 miles/hr","6-10 miles/hr","11-15 miles/hr","16-20 miles/hr","More than 20 miles/hr","Dont know"]
        } else if (selectedCategoryScatterX === "Standing") {
            vis.xDomain = ["0%","5%","10%","20%","More than 20%"]
        } else if (selectedCategoryScatterX === "PaddedShorts") {
            vis.xDomain = ["Never","Rarely","Sometimes","Mostly","Always"]
        } else if (selectedCategoryScatterX === "SaddleType") {
            vis.xDomain = ["(A) Wide, unpadded seat","(B) Long, narrow, with minimal padding seat","(C) Narrow, medium padded seat","(D) Wide, heavily padded seat","(E) Wide, well padded cruiser seat","(F) Noseless seat","(G) Dual pad seat"]
        } else if (selectedCategoryScatterX === "SaddleAngle") {
            vis.xDomain = ["Level","Nose up","Nose down","Dont know"]
        } else if (selectedCategoryScatterX === "BikeType") {
            vis.xDomain = ["Road bike","Mountain bike","BMX Bike","Folding bike","Hybrid bike","Electric bike","Other","Dont know"]
        } else if (selectedCategoryScatterX === "HandleBars") {
            vis.xDomain = ["Lower than saddle","Higher or even with saddle"]
        } else if (selectedCategoryScatterX === "Surface") {
            vis.xDomain = ["Stationary bike","Urban streets","Rural streets","Off road"]
        }

        vis.updateVis()
    }

    updateVis() {

        let vis = this;

        vis.xScale = d3.scaleBand()
            .rangeRound([0, vis.width]).padding(1)
            .domain(vis.xDomain)

        vis.yScale = d3.scaleBand()
            //.rangeRound([0, vis.height]).padding(1)
            .rangeRound([vis.height,0]).padding(1)
            .domain(vis.yDomain)

        xText, yText =  getText(selectedCategoryScatterX,selectedCategoryScatterY)
        // Get the Title for the selected category
        vis.titletext = 'Effect of ' + xText + " on " + yText;


        vis.xAxisGroup.transition().duration(300)
            .attr('transform', `translate (0, ${vis.height})`)
            .call(d3.axisBottom(vis.xScale));

        vis.yAxisGroup.transition().duration(300)
            .call(d3.axisLeft(vis.yScale));


        vis.circles = vis.svg.selectAll('.circle')
            .data(vis.data)


        vis.circles.enter()
            .append("circle")
            .attr("class", "circle")
            .merge(vis.circles)
            // .transition()
            // .duration(200)
            .attr("fill", d => color(d.Gender))
            .style("stroke", "black")
            .style("opacity", 0.2)
            .attr("cx", function (d) {
                if (d.Gender === "Male") {
                    return (vis.xScale(d[selectedCategoryScatterX]) - 10)
                } else {
                    return (vis.xScale(d[selectedCategoryScatterX]) + 10)
                }
            })
            .attr('cy', d => vis.yScale(d[selectedCategoryScatterY]))
            .attr("r", 5)
            .on('mouseover', function (event, d) {
                console.log(event)
                vis.tooltip
                    .style("opacity", 1)
                    .style("left", event.offsetX + 20 + "px")
                    .style("top", event.offsetY + "px")
                    .html(`
                    <div style="border: thin solid grey; border-radius: 5px; background: white; font-size: 15px; padding: 10px">
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


        vis.svg
            .append('g')
            .attr('class', 'title')
            .append('text')
            .text(vis.titletext)
            .attr('transform', `translate(${vis.width / 2}, 60)`)
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
