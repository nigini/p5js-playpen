/**
 * Based on code from: https://www.d3-graph-gallery.com/graph/connectedscatter_multi.html
 */

let margin = {top: 10, right: 100, bottom: 30, left: 30},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

let svg, myColor, line, x, y;
let viz_groups;

function viz_setup(groups) {
    viz_groups = groups;
    svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    myColor = d3.scaleOrdinal()
        .domain(groups)
        .range(d3.schemeSet2);

    x = d3.scaleLinear()
        .domain([0, 30])
        .range([0, width]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    line = d3.line()
        .x(function (d) {
            return x(+d.time)
        })
        .y(function (d) {
            return y(+d.value)
        })
}

function viz_update(gameData) {
    let data = transformGameData(gameData);
    console.log("DATA: " + JSON.stringify(data));

    let linesPath = svg.selectAll(".myLines");
    linesPath.remove();
    linesPath = svg.selectAll(".myLines");
    linesPath.data(data)
        .enter()
        .append("path")
        .classed("myLines", true)
        .attr("d", function (d) {
            return line(d.values)
        })
        .attr("stroke", function (d) {
            return myColor(d.name)
        })
        .style("stroke-width", 4)
        .style("fill", "none");
    //linesPath.exit().remove();

    let dotsPath = svg.selectAll(".myDots");
    dotsPath.remove();
    dotsPath = svg.selectAll(".myDots");
    dotsPath.data(data)
        .enter()
        .append('g')
        .classed("myDots", true)
        .style("fill", function (d) {
            return myColor(d.name)
        })
        .selectAll("myPoints")
        .data(function (d) {
            return d.values
        })
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return x(d.time)
        })
        .attr("cy", function (d) {
            return y(d.value)
        })
        .attr("r", 5)
        .attr("stroke", "white");
    //dotsPath.exit().remove();

    let labelsPaths = svg.selectAll(".myLabels");
    labelsPaths.remove();
    labelsPaths = svg.selectAll(".myLabels");
    labelsPaths.data(data)
        .enter()
        .append('g')
        .classed("myLabels", true)
        .append("text")
        .datum(function (d) {
            return {name: d.name, value: d.values[d.values.length - 1]};
        }) // keep only the last value of each time series
        .attr("transform", function (d) {
            return "translate(" + x(d.value.time) + "," + y(d.value.value) + ")";
        }) // Put the text at the position of the last point
        .attr("x", 12) // shift the text a bit more right
        .text(function (d) {
            return d.name;
        })
        .style("fill", function (d) {
            return myColor(d.name)
        })
        .style("font-size", 15);
    //labelsPaths.exit().remove();
}

function transformGameData(gameData) {
    let vizData = [
        {name: viz_groups[0], values: []},
        {name: viz_groups[1], values: []},
        {name: viz_groups[2], values: []},
    ];
    for(let day of gameData.days) {
        for(let vizDataType of vizData) {
            vizDataType.values.push({time: day, value: gameData[vizDataType.name][day]})
        }
    }
    return vizData;
}