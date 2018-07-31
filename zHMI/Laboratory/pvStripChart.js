function buildPVStripChart()
{

var width=700
var height=200
    pvBGrect.setAttribute("width",width)
    pvBGrect.setAttribute("height",height)
    console.log(pvBGrect)

//  X scale will use the index of our data
var xTimeScale = d3.scaleLinear()
    .domain([0, 100]) // 100 minutes
    .range([0, width]); // output


var yCfmScale = d3.scaleLinear()
    .domain([-100, 800]) // input
    .range([height, 0]); // output

  // gridlines in x axis function
function make_x_gridlines() {
    return d3.axisBottom(xTimeScale)
       // .ticks(5)
}

// gridlines in y axis function
function make_y_gridlines() {
    return d3.axisLeft(yCfmScale)
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
  graphG.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height)
   // .attr("transform", "translate(5,0)")
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
    .call(d3.axisBottom(xTimeScale)); // Create an axis component with d3.axisBottom

// Call the y axis in a group tag
graphG.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yCfmScale))
    .selectAll("text")
     .attr("font-size","12")
     .attr("fill","#6600FF")
     .attr("stroke","none")
     .attr("font-weight","bold")

var yRightScale = d3.scaleLinear() //---Static Pressure---
    .domain([-.04 ,.04]) // input
    .range([height, 0]) // output

 graphG.append("g")
    .attr("class", "y axis right")
    .attr("transform", "translate("+width+",0)")
    .call(d3.axisRight(yRightScale) )
    .selectAll("text")
     .attr("font-size","12")
     .attr("fill","#996515")
     .attr("stroke","none")
     .attr("font-weight","bold")

//--Data and Data Lines/Paths-->
// d3's line generator {time,OAT,SP,HWS,CO}
 lineAF1 = d3.line()
    .x(function(d, i) { return xTimeScale(i); }) // set the x values for the line generator
    .y(function(d) { return yCfmScale(d.AF1); }) // set the y values for the line generator
    .curve(d3.curveMonotoneX) // apply smoothing to the line
 lineAF2 = d3.line()
    .x(function(d, i) { return xTimeScale(i); }) // set the x values for the line generator
    .y(function(d) { return yCfmScale(d.AF2); }) // set the y values for the line generator
    .curve(d3.curveMonotoneX) // apply smoothing to the line
 lineAF3 = d3.line()
    .x(function(d, i) { return xTimeScale(i); }) // set the x values for the line generator
    .y(function(d) { return yCfmScale(d.AF3); }) // set the y values for the line generator
    .curve(d3.curveMonotoneX) // apply smoothing to the line
 lineAFdiff = d3.line()
    .x(function(d, i) { return xTimeScale(i); }) // set the x values for the line generator
    .y(function(d) { return yCfmScale(d.AFdiff); }) // set the y values for the line generator
    .curve(d3.curveMonotoneX) // apply smoothing to the line

 lineStaticPress = d3.line()
    .x(function(d, i) { return xTimeScale(i); }) // set the x values for the line generator
    .y(function(d) { return yRightScale(d.STP); }) // set the y values for the line generator
    .curve(d3.curveMonotoneX) // apply smoothing to the line
 lineStaticPressSetpoint = d3.line()
    .x(function(d, i) { return xTimeScale(i); }) // set the x values for the line generator
    .y(function(d) { return yRightScale(d.STPset); }) // set the y values for the line generator
    .curve(d3.curveMonotoneX) // apply smoothing to the line



    // Append the path, bind the data, and call the line generator
pathAF1=graphG.append("path")
  .attr("clip-path", "url(#clip)")
    .datum(Data) // 10. Binds data to the line
    .attr("class", "chartLineCFM") // Assign a class for styling
    .attr("d", lineAF1); // 11. Calls the line generator
pathAF2=graphG.append("path")
  .attr("clip-path", "url(#clip)")
    .datum(Data) // 10. Binds data to the line
    .attr("class", "chartLineCFM") // Assign a class for styling
    .attr("d", lineAF2); // 11. Calls the line generator
pathAF3=graphG.append("path")
  .attr("clip-path", "url(#clip)")
    .datum(Data) // 10. Binds data to the line
    .attr("class", "chartLineCFM") // Assign a class for styling
    .attr("d", lineAF3); // 11. Calls the line generator
pathAFdiff=graphG.append("path")
  .attr("clip-path", "url(#clip)")
    .datum(Data) // 10. Binds data to the line
    .attr("class", "chartLineCFMdiff") // Assign a class for styling
    .attr("d", lineAFdiff); // 11. Calls the line generator


pathStaticPressure=graphG.append("path")
 .attr("clip-path", "url(#clip)")
    .datum(Data) // 10. Binds data to the line
    .attr("class", "chartLineStaticPressure") // Assign a class for styling
    .attr("d", lineStaticPress); // 11. Calls the line generator

pathStaticPressSetpoint=graphG.append("path")
 .attr("clip-path", "url(#clip)")
    .datum(Data) // 10. Binds data to the line
    .attr("class", "chartLineStaticPressSetpoint") // Assign a class for styling
    .attr("d", lineStaticPressSetpoint); // 11. Calls the line generator


}

var lineAF1
var lineAF2
var lineAF3
var lineAFdiff
var lineStaticPress
var lineStaticPressSetpoint

var pathAF1
var pathAF2
var pathAF3
var pathAFdiff
var pathStaticPress
var pathStaticPressSetpoint

//---start dataBase-----------

var Data=[{AF1:702.84,AF2:309.38,AF3:404.59,AFdiff:-11,STP:-0.019,STPset:-0.0175},
{AF1:702.59,AF2:300.46,AF3:409.88,AFdiff:-8,STP:-0.020,STPset:-0.0175},
{AF1:720.95,AF2:304.41,AF3:408.30,AFdiff:8,STP:-0.019,STPset:-0.0175},
{AF1:729.66,AF2:303.80,AF3:401.41,AFdiff:24,STP:-0.017,STPset:-0.0175},
{AF1:725.60,AF2:309.33,AF3:402.65,AFdiff:14,STP:-0.016,STPset:-0.0175},
{AF1:720.67,AF2:308.51,AF3:407.91,AFdiff:4,STP:-0.016,STPset:-0.0175},
{AF1:713.16,AF2:304.56,AF3:409.80,AFdiff:-1,STP:-0.016,STPset:-0.0175},
{AF1:720.32,AF2:307.90,AF3:402.07,AFdiff:10,STP:-0.017,STPset:-0.0175},
{AF1:710.28,AF2:309.70,AF3:407.36,AFdiff:-7,STP:-0.016,STPset:-0.0175},
{AF1:727.01,AF2:300.96,AF3:409.61,AFdiff:16,STP:-0.015,STPset:-0.0175},
{AF1:726.29,AF2:301.62,AF3:404.97,AFdiff:20,STP:-0.015,STPset:-0.0175},
{AF1:707.02,AF2:305.44,AF3:405.87,AFdiff:-4,STP:-0.015,STPset:-0.0175},
{AF1:728.17,AF2:305.12,AF3:402.43,AFdiff:21,STP:-0.015,STPset:-0.0175},
{AF1:713.71,AF2:305.04,AF3:407.13,AFdiff:2,STP:-0.018,STPset:-0.0175},
{AF1:722.59,AF2:305.95,AF3:400.89,AFdiff:16,STP:-0.017,STPset:-0.0175},
{AF1:716.17,AF2:301.03,AF3:408.26,AFdiff:7,STP:-0.018,STPset:-0.0175},
{AF1:720.52,AF2:308.90,AF3:409.50,AFdiff:2,STP:-0.017,STPset:-0.0175},
{AF1:701.87,AF2:302.31,AF3:403.56,AFdiff:-4,STP:-0.019,STPset:-0.0175},
{AF1:727.93,AF2:309.02,AF3:407.06,AFdiff:12,STP:-0.016,STPset:-0.0175},
{AF1:715.67,AF2:308.59,AF3:406.40,AFdiff:1,STP:-0.019,STPset:-0.0175},
{AF1:702.57,AF2:302.96,AF3:400.58,AFdiff:-1,STP:-0.019,STPset:-0.0175},
{AF1:709.78,AF2:305.31,AF3:403.21,AFdiff:1,STP:-0.016,STPset:-0.0175},
{AF1:720.79,AF2:305.05,AF3:402.66,AFdiff:13,STP:-0.017,STPset:-0.0175},
{AF1:708.11,AF2:301.51,AF3:408.39,AFdiff:-2,STP:-0.017,STPset:-0.0175},
{AF1:700.39,AF2:300.42,AF3:408.63,AFdiff:-9,STP:-0.019,STPset:-0.0175},
{AF1:703.57,AF2:308.26,AF3:405.65,AFdiff:-10,STP:-0.016,STPset:-0.0175},
{AF1:704.54,AF2:309.66,AF3:405.56,AFdiff:-11,STP:-0.016,STPset:-0.0175},
{AF1:701.21,AF2:307.80,AF3:405.98,AFdiff:-13,STP:-0.016,STPset:-0.0175},
{AF1:729.77,AF2:305.79,AF3:401.00,AFdiff:23,STP:-0.019,STPset:-0.0175},
{AF1:706.44,AF2:303.99,AF3:403.84,AFdiff:-1,STP:-0.019,STPset:-0.0175},
{AF1:711.86,AF2:307.27,AF3:408.04,AFdiff:-3,STP:-0.019,STPset:-0.0175},
{AF1:706.20,AF2:306.34,AF3:407.77,AFdiff:-8,STP:-0.019,STPset:-0.0175},
{AF1:713.50,AF2:301.75,AF3:409.60,AFdiff:2,STP:-0.018,STPset:-0.0175},
{AF1:709.56,AF2:307.32,AF3:402.91,AFdiff:-1,STP:-0.019,STPset:-0.0175},
{AF1:712.13,AF2:306.51,AF3:403.56,AFdiff:2,STP:-0.019,STPset:-0.0175},
{AF1:702.51,AF2:309.58,AF3:409.57,AFdiff:-17,STP:-0.015,STPset:-0.0175},
{AF1:704.26,AF2:302.94,AF3:401.59,AFdiff:-0,STP:-0.020,STPset:-0.0175},
{AF1:709.04,AF2:304.96,AF3:407.48,AFdiff:-3,STP:-0.015,STPset:-0.0175},
{AF1:711.25,AF2:303.38,AF3:400.50,AFdiff:7,STP:-0.015,STPset:-0.0175},
{AF1:726.11,AF2:303.18,AF3:404.89,AFdiff:18,STP:-0.017,STPset:-0.0175},
{AF1:720.50,AF2:303.96,AF3:409.88,AFdiff:7,STP:-0.020,STPset:-0.0175},
{AF1:708.84,AF2:300.47,AF3:402.86,AFdiff:6,STP:-0.018,STPset:-0.0175},
{AF1:715.03,AF2:301.03,AF3:409.61,AFdiff:4,STP:-0.017,STPset:-0.0175},
{AF1:708.27,AF2:305.20,AF3:403.92,AFdiff:-1,STP:-0.016,STPset:-0.0175},
{AF1:710.25,AF2:302.89,AF3:400.74,AFdiff:7,STP:-0.019,STPset:-0.0175},
{AF1:716.05,AF2:302.26,AF3:405.12,AFdiff:9,STP:-0.017,STPset:-0.0175},
{AF1:718.27,AF2:307.04,AF3:402.26,AFdiff:9,STP:-0.016,STPset:-0.0175},
{AF1:704.91,AF2:308.55,AF3:404.14,AFdiff:-8,STP:-0.020,STPset:-0.0175},
{AF1:720.73,AF2:301.74,AF3:400.60,AFdiff:18,STP:-0.016,STPset:-0.0175},
{AF1:725.56,AF2:304.06,AF3:405.33,AFdiff:16,STP:-0.018,STPset:-0.0175},
{AF1:721.75,AF2:309.84,AF3:401.70,AFdiff:10,STP:-0.020,STPset:-0.0175},
{AF1:703.28,AF2:301.22,AF3:402.99,AFdiff:-1,STP:-0.017,STPset:-0.0175},
{AF1:718.80,AF2:301.53,AF3:407.90,AFdiff:9,STP:-0.016,STPset:-0.0175},
{AF1:708.65,AF2:306.83,AF3:407.98,AFdiff:-6,STP:-0.015,STPset:-0.0175},
{AF1:715.22,AF2:306.85,AF3:406.55,AFdiff:2,STP:-0.016,STPset:-0.0175},
{AF1:717.05,AF2:302.92,AF3:401.57,AFdiff:13,STP:-0.016,STPset:-0.0175},
{AF1:724.39,AF2:303.79,AF3:407.26,AFdiff:13,STP:-0.018,STPset:-0.0175},
{AF1:729.10,AF2:301.52,AF3:403.76,AFdiff:24,STP:-0.019,STPset:-0.0175},
{AF1:701.65,AF2:305.37,AF3:403.76,AFdiff:-7,STP:-0.015,STPset:-0.0175},
{AF1:726.29,AF2:308.93,AF3:409.63,AFdiff:8,STP:-0.017,STPset:-0.0175},
{AF1:712.26,AF2:302.86,AF3:403.23,AFdiff:6,STP:-0.016,STPset:-0.0175},
{AF1:729.53,AF2:307.81,AF3:404.66,AFdiff:17,STP:-0.018,STPset:-0.0175},
{AF1:718.69,AF2:303.14,AF3:405.52,AFdiff:10,STP:-0.016,STPset:-0.0175},
{AF1:717.44,AF2:306.17,AF3:402.48,AFdiff:9,STP:-0.015,STPset:-0.0175},
{AF1:707.89,AF2:302.54,AF3:406.15,AFdiff:-1,STP:-0.017,STPset:-0.0175},
{AF1:727.32,AF2:300.22,AF3:403.83,AFdiff:23,STP:-0.018,STPset:-0.0175},
{AF1:707.05,AF2:308.36,AF3:401.27,AFdiff:-3,STP:-0.018,STPset:-0.0175},
{AF1:708.06,AF2:307.44,AF3:409.56,AFdiff:-9,STP:-0.017,STPset:-0.0175},
{AF1:710.32,AF2:301.41,AF3:400.36,AFdiff:9,STP:-0.019,STPset:-0.0175},
{AF1:706.29,AF2:304.06,AF3:405.82,AFdiff:-4,STP:-0.016,STPset:-0.0175},
{AF1:718.42,AF2:306.26,AF3:404.45,AFdiff:8,STP:-0.019,STPset:-0.0175},
{AF1:709.24,AF2:306.82,AF3:406.56,AFdiff:-4,STP:-0.016,STPset:-0.0175},
{AF1:707.82,AF2:302.30,AF3:406.80,AFdiff:-1,STP:-0.018,STPset:-0.0175},
{AF1:701.08,AF2:304.08,AF3:409.77,AFdiff:-13,STP:-0.020,STPset:-0.0175},
{AF1:721.01,AF2:307.38,AF3:407.62,AFdiff:6,STP:-0.016,STPset:-0.0175},
{AF1:714.81,AF2:303.56,AF3:405.73,AFdiff:6,STP:-0.019,STPset:-0.0175},
{AF1:706.42,AF2:307.00,AF3:402.45,AFdiff:-3,STP:-0.018,STPset:-0.0175},
{AF1:726.93,AF2:302.52,AF3:406.68,AFdiff:18,STP:-0.017,STPset:-0.0175},
{AF1:715.64,AF2:306.44,AF3:405.43,AFdiff:4,STP:-0.016,STPset:-0.0175},
{AF1:717.35,AF2:303.67,AF3:407.19,AFdiff:6,STP:-0.015,STPset:-0.0175},
{AF1:711.28,AF2:301.84,AF3:407.01,AFdiff:2,STP:-0.019,STPset:-0.0175},
{AF1:709.45,AF2:307.05,AF3:400.86,AFdiff:2,STP:-0.017,STPset:-0.0175},
{AF1:725.92,AF2:301.11,AF3:404.75,AFdiff:20,STP:-0.018,STPset:-0.0175},
{AF1:721.05,AF2:301.70,AF3:400.38,AFdiff:19,STP:-0.020,STPset:-0.0175},
{AF1:709.53,AF2:303.80,AF3:405.60,AFdiff:0,STP:-0.019,STPset:-0.0175},
{AF1:719.99,AF2:305.35,AF3:409.44,AFdiff:5,STP:-0.018,STPset:-0.0175},
{AF1:708.27,AF2:306.80,AF3:404.09,AFdiff:-3,STP:-0.015,STPset:-0.0175},
{AF1:724.95,AF2:307.38,AF3:400.79,AFdiff:17,STP:-0.019,STPset:-0.0175},
{AF1:706.32,AF2:300.62,AF3:400.33,AFdiff:5,STP:-0.019,STPset:-0.0175},
{AF1:702.06,AF2:309.47,AF3:401.29,AFdiff:-9,STP:-0.017,STPset:-0.0175},
{AF1:726.78,AF2:307.91,AF3:400.09,AFdiff:19,STP:-0.018,STPset:-0.0175},
{AF1:729.75,AF2:305.49,AF3:404.49,AFdiff:20,STP:-0.020,STPset:-0.0175},
{AF1:711.04,AF2:301.17,AF3:401.64,AFdiff:8,STP:-0.020,STPset:-0.0175},
{AF1:719.06,AF2:300.64,AF3:401.46,AFdiff:17,STP:-0.019,STPset:-0.0175},
{AF1:720.12,AF2:303.67,AF3:401.70,AFdiff:15,STP:-0.015,STPset:-0.0175},
{AF1:720.86,AF2:304.78,AF3:408.80,AFdiff:7,STP:-0.019,STPset:-0.0175},
{AF1:705.14,AF2:306.35,AF3:409.04,AFdiff:-10,STP:-0.020,STPset:-0.0175},
{AF1:704.49,AF2:302.49,AF3:406.01,AFdiff:-4,STP:-0.016,STPset:-0.0175},
{AF1:716.18,AF2:302.90,AF3:408.31,AFdiff:5,STP:-0.018,STPset:-0.0175},
{AF1:708.36,AF2:308.49,AF3:403.65,AFdiff:-4,STP:-0.016,STPset:-0.0175}
]

