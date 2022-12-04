class ScatterPlot {

    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;
        this.yDomain = [];
        this.xDomain = [];
        this.xBump = 0;

        this.initVis()
    }

    initVis() {
        let vis = this;

        vis.margin = {top: 30, right: 20, bottom: 50, left: 50};

        //vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        //vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - 20;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`)

        // tooltip
        vis.tooltip = d3.select("#" + vis.parentElement).append('div')
            .attr('class', "tooltip")
            .attr('id', 'scatterTooltip')

        // axis groups
        vis.xAxisGroup = vis.svg.append('g')
            .attr('class', 'axis x-axis')
        vis.yAxisGroup = vis.svg.append('g')
            .attr('class', 'axis y-axis');

        this.wrangleData();

    }

    wrangleData() {

        let vis = this

        // sorting the y axis
        if (selectedCategoryScatterY === "LUTS") {
            vis.yDomain = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
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
            vis.xDomain = ["< 5 miles/hr","5 miles/hr","6-10 miles/hr","11-15 miles/hr","16-20 miles/hr","> 20 miles/hr","Don't know"]
        } else if (selectedCategoryScatterX === "Standing") {
            vis.xDomain = ["0%","5%","10%","20%","More than 20%"]
        } else if (selectedCategoryScatterX === "PaddedShorts") {
            vis.xDomain = ["Never","Rarely","Sometimes","Mostly","Always"]
        } else if (selectedCategoryScatterX === "SaddleType") {
            vis.xDomain = ["Narrow, unpad","Narrow, mid pad","Wide, unpad","Wide, heavy pad","Wide, cruiser","Noseless","Dual pad"]
        } else if (selectedCategoryScatterX === "SaddleAngle") {
            vis.xDomain = ["Level","Nose up","Nose down","Don't know"]
        } else if (selectedCategoryScatterX === "BikeType") {
            vis.xDomain = ["Road","Mountain","BMX","Folding","Hybrid","Electric", "Recumbent", "Other","Don't know"]
        } else if (selectedCategoryScatterX === "HandleBars") {
            vis.xDomain = ["Lower than saddle","Higher or even with saddle"]
        } else if (selectedCategoryScatterX === "Surface") {
            vis.xDomain = ["Stationary bike","Urban streets","Rural streets","Off road"]
        }

        // getting proper alignment for the x axis domain
        if (selectedCategoryScatterX === "RidingHistory") {
            vis.xBump = 0;
        } else if (selectedCategoryScatterX === "RidingFrequency") {
            vis.xBump = -8;
        } else if (selectedCategoryScatterX === "LongestDist") {
            vis.xBump = -8;
        } else if (selectedCategoryScatterX === "AverageDist") {
            vis.xBump = -8;
        } else if (selectedCategoryScatterX === "Speed") {
            vis.xBump = -12;
        } else if (selectedCategoryScatterX === "Standing") {
            vis.xBump = 0;
        } else if (selectedCategoryScatterX === "PaddedShorts") {
            vis.xBump = 0;
        } else if (selectedCategoryScatterX === "SaddleType") {
            vis.xBump = -12;
        } else if (selectedCategoryScatterX === "SaddleAngle") {
            vis.xBump = 16;
        } else if (selectedCategoryScatterX === "BikeType") {
            vis.xBump = -20;
        } else if (selectedCategoryScatterX === "HandleBars") {
            vis.xBump = 60;
        } else if (selectedCategoryScatterX === "Surface") {
            vis.xBump = 16;
        }

        console.log(vis.xBump)


        vis.updateVis()
    }

    updateVis() {

        let vis = this;

        vis.xScale = d3.scaleBand()
            .rangeRound([vis.margin.left, vis.width-vis.margin.right])
            //.rangeRound(vis.xRange)
            .domain(vis.xDomain)

        vis.yScale = d3.scaleBand()
            .rangeRound([vis.height-vis.margin.top -vis.margin.bottom,0]).padding(1)
            //.rangeRound([vis.height,0]).padding(1)
            .domain(vis.yDomain)

        xText, yText =  getText(selectedCategoryScatterX,selectedCategoryScatterY)
        // Get the Title for the selected category
        vis.titletext = 'Effect of ' + xText + " on " + yText;


        vis.circles = vis.svg.selectAll('.circle')
            .data(vis.data)

        vis.circles.enter()
            .append("circle")
            .attr("class", "circle")
            .merge(vis.circles)
            .attr("fill", d => color(d.Gender))
            .style("stroke", "black")
            .style("opacity", 0.2)
            .attr("cx", function (d) {
                if (d.Gender === "Male") {
                    //return (vis.xScale(d[selectedCategoryScatterX]) - 10)
                    return (vis.xScale(d[selectedCategoryScatterX]) - 10 + vis.xBump)
                } else {
                    //return (vis.xScale(d[selectedCategoryScatterX]) + 10)
                    return (vis.xScale(d[selectedCategoryScatterX]) + 10 + vis.xBump)
                }
            })
            .attr('cy', d => vis.yScale(d[selectedCategoryScatterY]))
            .attr("r", 5)
            .on('mouseover', function (event, d) {
                console.log(event)
                vis.tooltip
                    .style("opacity", 1)
                    .style("left", event.offsetX-90 + "px")
                    .style("top", event.offsetY + "px")
                    //.style("font", 30px)
                    .html(`
                    <div style="border: thin solid grey; border-radius: 5px;  background: white; padding: 10px">
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

        vis.title = vis.svg.selectAll('.title')
            .data(vis.data)


        vis.title.enter().append("text")
            .attr('class', 'title')
            .merge(vis.title)
            .text(vis.titletext)
            .attr('class', 'title')
            .attr('transform', `translate(${(vis.width-vis.margin.left) / 2}, -10)`)
            .attr('text-anchor', 'middle');

        vis.xAxisGroup
            .attr('transform', `translate (${- vis.margin.left}, ${vis.height - vis.margin.top - vis.margin.bottom})`)
            .transition().duration(300)
            .call(d3.axisBottom(vis.xScale));
        vis.yAxisGroup.transition().duration(300)
            .call(d3.axisLeft(vis.yScale));

        // x axis label
        vis.xAxisLabel = vis.svg.selectAll('.xAxisLabel')
            .data(xText)

        vis.xAxisLabel.enter().append("text")
            .attr('class', 'xAxisLabel')
            .merge(vis.xAxisLabel)
            .text(xText)
            .attr('transform', `translate(${(vis.width-vis.margin.left) / 2}, ${vis.height - vis.margin.top - vis.margin.right + 10})`)
            .attr('text-anchor', 'middle');

        vis.xAxisLabel.exit().remove()

        // y axis label
        vis.yAxisLabel = vis.svg.selectAll('.yAxisLabel')
            .data(yText)

        vis.yAxisLabel.enter().append("text")
            .attr('class', 'yAxisLabel')
            .merge(vis.yAxisLabel)
            .text(yText)
            .attr('transform', `translate(-30, ${vis.height / 2})rotate(270)`)
            .attr('text-anchor', 'middle');

        vis.yAxisLabel.exit().remove()

        vis.circles.exit().remove();

        // color function
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
