
//======================VFD MONITOR OBJECT========================================
function buildVariableFrequency(title,faceColor,scale)
{

    var defaultWidth=600
    var defaultHeight=500



    //---face rectangle---
    ActiveElem.append("rect")
    .attr("id","faceRect")
    .attr("height",defaultHeight)
    .attr("width",defaultWidth)
    .attr("rx",20)
    .attr("ry",20)
    .attr("fill",faceColor)
    .attr("stroke","black")
    .attr("stroke-width",3)

    var myTitle=ActiveElem.append("text")
    .attr("id","vfdTitle")
    .text(title)
    .attr("x",defaultWidth/2)
    .attr("dy","1em")
    .attr("font-family","arial")
    .attr("font-size","40")
    .attr("font-weight","bold")
    .attr("text-anchor","middle")

    //---chart size---
    var width=400
    var height=260
    //---timeline---
    var xTime = d3.scaleLinear()
    .domain([0, 60])
    .range([0, width])

    //---controller analog input---
    var yCI = d3.scaleLinear()
    .domain([0, 100]) // percent
    .range([height, 0]); // output
    //---hertz value---
    var yHZ = d3.scaleLinear()
    .domain([0, 130]) // input
    .range([height, 0]); // output
    //---voltage value---
    var yVAC = d3.scaleLinear()
    .domain([0, 500]) // input
    .range([height, 0]); // output


    // gridlines in x axis function
    function make_x_gridlines() {
    return d3.axisBottom(xTime)
    }

    // gridlines in y axis function
    function make_y_gridlines() {
    return d3.axisLeft(yCI)
    }

    var plotG=ActiveElem.append("g")
    .attr("id","plotG")
    .attr("transform","translate(70,90)")
    .attr("pointer-events","none")


    plotG.append("rect")
    .attr("id","plotRect")
    .attr("width",width)
    .attr("height",height)
    .attr("stroke","none")
    .attr("fill","ghostWhite")
    var defs=plotG.append("defs")
    defs.append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    //.attr("transform", "translate(100,50)")

    // add the X gridlines
    plotG.append("g")
    .attr("class", "gridVFD")
    .attr("transform", "translate(0," + height + ")")
    .call(make_x_gridlines()
    .tickSize(-height)
    .tickFormat("")
    )

    // add the Y gridlines
    plotG.append("g")
    .attr("class", "gridVFD")
    .call(make_y_gridlines()
    .tickSize(-width)
    .tickFormat("")
    )

    // Call the x axis timeLine in a group tag
    plotG.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height+ ")")
    .call(d3.axisBottom(xTime)) // Create an axis component with d3.axisBottom
    .selectAll("text")
    .attr("font-size","24")
    .attr("fill","black")
    .attr("stroke","black")
    .attr("stroke-width",".5")

    var unitText=plotG.append("text")
    .text("Minutes")
    .attr("x",width/2)
    .attr("y",height+45)
    .attr("font-family","arial")
    .attr("font-size","25")
    .attr("text-anchor","middle")


    // Call the CI y axis in a group tag
    var CI=plotG.append("text")
    .text("CI (%)")
    .attr("font-size",30)
    .attr("fill","purple")
    .attr("stroke","black")
    .attr("stroke-width","1")
    .attr("font-weight","bold")
    .attr("transform","translate(-60,-20)")

    var HZ=plotG.append("text")
    .text("HZ")
    .attr("font-size",30)
    .attr("fill","blue")
    .attr("stroke","black")
    .attr("stroke-width","1")
    .attr("font-weight","bold")
    .attr("transform","translate(400,-20)")
    var VAC=plotG.append("text")
    .text("VAC")
    .attr("font-size",30)
    .attr("fill","red")
    .attr("stroke","black")
    .attr("stroke-width","1")
    .attr("font-weight","bold")
    .attr("transform","translate(460,-20)")



    plotG.append("g")
    .attr("class", "y axis left axisPurple")
    .call(d3.axisLeft(yCI))
    .selectAll("text")
    .attr("font-size","24")
    .attr("fill","purple")
    .attr("stroke","black")
    .attr("stroke-width",".5")

    plotG.append("g")
    .attr("class", "y axis right axisBlue")
    .attr("transform", "translate("+(width+10)+",0)")
    .call(d3.axisRight(yHZ))
    .selectAll("text")
    .attr("font-size","24")
    .attr("fill","blue")
    .attr("stroke","black")
    .attr("stroke-width",".5")

    plotG.append("g")
    .attr("class", "y axis right axisRed")
    .attr("transform", "translate("+(width+70)+",0)")
    .call(d3.axisRight(yVAC))
    .selectAll("text")
    .attr("font-size","24")
    .attr("fill","red")
    .attr("stroke","black")
    .attr("stroke-width",".5")

    //--Data and Data Lines/Paths-->
    //---{CI,VAC,HZ} ---


        var lineCI = d3.line()
        .x(function(d, i) { return xTime(i); }) // set the x values for the line generator
        .y(function(d) { return yCI(d.CI); }) // set the y values for the line generator
        .curve(d3.curveMonotoneX) // apply smoothing to the line

        var lineVAC  = d3.line()
        .x(function(d, i) { return xTime(i); }) // set the x values for the line generator
        .y(function(d) { return yVAC(d.VAC); }) // set the y values for the line generator
        .curve(d3.curveMonotoneX) // apply smoothing to the line

        var lineHZ = d3.line()
        .x(function(d, i) { return xTime(i); }) // set the x values for the line generator
        .y(function(d) { return yHZ(d.HZ); }) // set the y values for the line generator
        .curve(d3.curveMonotoneX) // apply smoothing to the line



    // Append the path, bind the data, and call the line generator

        var pathCI=plotG.append("path")
        .attr("clip-path", "url(#clip)")
        .datum(DataVFD) // 10. Binds data to the line
        .attr("class", "chartLineCI") // Assign a class for styling
        .attr("d", lineCI); // 11. Calls the line generator


        var pathVAC=plotG.append("path")
        .attr("clip-path", "url(#clip)")
        .datum(DataVFD) // 10. Binds data to the line
        .attr("class", "chartLineVAC") // Assign a class for styling
        .attr("d", lineVAC); // 11. Calls the line generator


        var pathHZ=plotG.append("path")
        .attr("clip-path", "url(#clip)")
        .datum(DataVFD) // 10. Binds data to the line
        .attr("class", "chartLineHZ") // Assign a class for styling
        .attr("d", lineHZ); // 11. Calls the line generator



    var statusPanel=statusPanelG.cloneNode(true)
    statusPanel.setAttribute("id","statusPanel")
    statusPanel.setAttribute("transform","translate(150,430)rotate(90)")
    activeElem.appendChild(statusPanel)


    var fo=vfdFO.cloneNode(true)
    fo.setAttribute("id","digital")
   activeElem.appendChild(fo)


      activeElem.setAttribute("transform", "translate("+(SVGx)+" "+(SVGy)+")scale("+scale+")")


     ActiveElem.attr("type","variableFrequency")
    ActiveElem.attr("title",title)
    ActiveElem.attr("faceColor",faceColor)
    ActiveElem.attr("scale",scale)



}
var DataVFD=[
{CI:21,VAC:414,HZ:73},
{CI:24,VAC:411,HZ:67},
{CI:21,VAC:417,HZ:72},
{CI:20,VAC:419,HZ:60},
{CI:21,VAC:411,HZ:73},
{CI:23,VAC:436,HZ:66},
{CI:23,VAC:406,HZ:65},
{CI:22,VAC:431,HZ:66},
{CI:20,VAC:410,HZ:66},
{CI:24,VAC:439,HZ:64},
{CI:24,VAC:402,HZ:63},
{CI:22,VAC:424,HZ:74},
{CI:22,VAC:438,HZ:72},
{CI:20,VAC:431,HZ:71},
{CI:25,VAC:425,HZ:69},
{CI:24,VAC:430,HZ:69},
{CI:25,VAC:427,HZ:61},
{CI:21,VAC:432,HZ:71},
{CI:21,VAC:407,HZ:61},
{CI:24,VAC:427,HZ:73},
{CI:21,VAC:434,HZ:73},
{CI:20,VAC:422,HZ:70},
{CI:23,VAC:421,HZ:74},
{CI:23,VAC:413,HZ:62},
{CI:24,VAC:436,HZ:74},
{CI:21,VAC:427,HZ:65},
{CI:20,VAC:405,HZ:63},
{CI:25,VAC:404,HZ:70},
{CI:24,VAC:404,HZ:64},
{CI:24,VAC:426,HZ:62},
{CI:23,VAC:422,HZ:67},
{CI:22,VAC:430,HZ:71},
{CI:21,VAC:425,HZ:63},
{CI:21,VAC:431,HZ:65},
{CI:21,VAC:431,HZ:70},
{CI:22,VAC:421,HZ:75},
{CI:24,VAC:430,HZ:74},
{CI:22,VAC:430,HZ:74},
{CI:24,VAC:418,HZ:64},
{CI:23,VAC:427,HZ:69},
{CI:23,VAC:414,HZ:74},
{CI:23,VAC:419,HZ:68},
{CI:21,VAC:421,HZ:63},
{CI:24,VAC:408,HZ:67},
{CI:25,VAC:428,HZ:72},
{CI:21,VAC:434,HZ:71},
{CI:22,VAC:431,HZ:66},
{CI:24,VAC:408,HZ:64},
{CI:21,VAC:421,HZ:60},
{CI:20,VAC:402,HZ:68},
{CI:21,VAC:430,HZ:68},
{CI:24,VAC:415,HZ:65},
{CI:22,VAC:429,HZ:65},
{CI:20,VAC:423,HZ:65},
{CI:24,VAC:419,HZ:74},
{CI:23,VAC:438,HZ:69},
{CI:24,VAC:427,HZ:69},
{CI:25,VAC:439,HZ:70},
{CI:24,VAC:414,HZ:65},
{CI:21,VAC:422,HZ:64},
{CI:20,VAC:403,HZ:74}

]



