function buildPVStripChart()
{

var width=600
var height=100

//  X scale will use the index of our data
var xScale = d3.scaleLinear()
    .domain([0, 100]) // 100 minutes
    .range([0, width]); // output


var yScale = d3.scaleLinear()
    .domain([40,100]) // input
    .range([height, 0]); // output

  // gridlines in x axis function
function make_x_gridlines() {
    return d3.axisBottom(xScale)
       // .ticks(5)
}

// gridlines in y axis function
function make_y_gridlines() {
    return d3.axisLeft(yScale)
       // .ticks(5)
}

var graphG=d3.select("#pvStripChart")
// add the X gridlines
  graphG.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(make_x_gridlines()
          .tickSize(-height)
          .tickFormat("")
      )

  // add the Y gridlines
  graphG.append("g")
      .attr("class", "grid")
      .call(make_y_gridlines()
          .tickSize(-width)
          .tickFormat("")
      )

// Call the x axis in a group tag
graphG.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// Call the y axis in a group tag
graphG.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

var line = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d[1]); }) // set the y values for the line generator
    .curve(d3.curveMonotoneX) // apply smoothing to the line

var path=graphG.append("path")
    .datum(dataSTP) // 10. Binds data to the line
    .attr("class", "chartLineCv") // Assign a class for styling
    .attr("d", line); // 11. Calls the line generator

var lineSP = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d[0]); }) // set the y values for the line generator
    .curve(d3.curveMonotoneX) // apply smoothing to the line

var pathSP=graphG.append("path")
    .datum(dataSTP) // 10. Binds data to the line
    .attr("class", "chartLineSPr") // Assign a class for styling
    .attr("d", lineSP); // 11. Calls the line generator



}

var dataSTP=[] //---[setpoint,value]---
dataSTP[0]=[60+0,60+0]
dataSTP[1]=[60+0,60+1]
dataSTP[2]=[60+0,60+2]
dataSTP[3]=[60+0,60+3]
dataSTP[4]=[60+0,60+4]
dataSTP[5]=[60+0,60+5]
dataSTP[6]=[60+0,60+6]
dataSTP[7]=[60+0,60+8]
dataSTP[8]=[60+0,60+9]
dataSTP[9]=[60+0,70+1]

dataSTP[10]=[60+0,70+0]
dataSTP[11]=[60+0,60+9]
dataSTP[12]=[60+0,60+8]
dataSTP[13]=[60+0,60+7]
dataSTP[14]=[60+0,60+5]
dataSTP[15]=[60+0,60+3]
dataSTP[16]=[60+0,60+2]
dataSTP[17]=[60+0,60+1]
dataSTP[18]=[60+0,60+0]
dataSTP[19]=[60+0,60+0]

dataSTP[20]=[60+0,60+0]
dataSTP[21]=[60+0,60+0]
dataSTP[22]=[60+0,60+0]
dataSTP[23]=[60+0,60+0]
dataSTP[24]=[60+0,50+9]
dataSTP[25]=[60+0,50+8]
dataSTP[26]=[60+0,50+7]
dataSTP[27]=[60+0,50+8]
dataSTP[28]=[60+0,50+8]
dataSTP[29]=[60+0,50+8]

dataSTP[30]=[60+0,50+8]
dataSTP[31]=[60+0,50+9]
dataSTP[32]=[60+0,50+9]
dataSTP[33]=[60+0,60+0]
dataSTP[34]=[60+0,60+1]
dataSTP[35]=[60+0,60+2]
dataSTP[36]=[60+0,60+3]
dataSTP[37]=[60+0,60+4]
dataSTP[38]=[60+0,60+5]
dataSTP[39]=[60+0,60+5]

dataSTP[40]=[60+0,60+5]
dataSTP[41]=[60+0,60+5]
dataSTP[42]=[60+0,60+4]
dataSTP[43]=[60+0,60+3]
dataSTP[44]=[60+0,60+3]
dataSTP[45]=[60+0,60+2]
dataSTP[46]=[60+0,60+2]
dataSTP[47]=[60+0,60+1]
dataSTP[48]=[60+0,60+0]
dataSTP[49]=[60+0,60+0]

dataSTP[50]=[60+0,60+0]
dataSTP[51]=[60+0,50+9]
dataSTP[52]=[60+0,60+0]
dataSTP[53]=[60+0,60+0]
dataSTP[54]=[60+0,60+0]
dataSTP[55]=[60+0,60+2]
dataSTP[56]=[60+0,60+3]
dataSTP[57]=[60+0,60+4]
dataSTP[58]=[60+0,60+5]
dataSTP[59]=[60+0,60+6]
dataSTP[60]=[60+0,60+7]

dataSTP[61]=[60+0,60+1]
dataSTP[62]=[60+0,60+2]
dataSTP[63]=[60+0,60+3]
dataSTP[64]=[60+0,60+4]
dataSTP[65]=[60+0,60+5]
dataSTP[66]=[60+0,60+6]
dataSTP[67]=[60+0,60+8]
dataSTP[68]=[60+0,60+9]
dataSTP[69]=[60+0,70+1]

dataSTP[70]=[60+0,70+0]
dataSTP[71]=[60+0,60+9]
dataSTP[72]=[60+0,60+8]
dataSTP[73]=[60+0,60+7]
dataSTP[74]=[60+0,60+5]
dataSTP[75]=[60+0,60+3]
dataSTP[76]=[60+0,60+2]
dataSTP[77]=[60+0,60+1]
dataSTP[78]=[60+0,60+0]
dataSTP[79]=[60+0,60+0]

dataSTP[80]=[60+0,60+0]
dataSTP[81]=[60+0,60+0]
dataSTP[82]=[60+0,60+0]
dataSTP[83]=[60+0,60+0]
dataSTP[84]=[60+0,50+9]
dataSTP[85]=[60+0,50+8]
dataSTP[86]=[60+0,50+7]
dataSTP[87]=[60+0,50+8]
dataSTP[88]=[60+0,50+8]
dataSTP[89]=[60+0,50+8]

dataSTP[90]=[60+0,50+8]
dataSTP[91]=[60+0,50+9]
dataSTP[92]=[60+0,50+9]
dataSTP[93]=[60+0,60+0]
dataSTP[94]=[60+0,60+1]
dataSTP[95]=[60+0,60+2]
dataSTP[96]=[60+0,60+3]
dataSTP[97]=[60+0,60+4]
dataSTP[98]=[60+0,60+5]
dataSTP[99]=[60+0,60+5]