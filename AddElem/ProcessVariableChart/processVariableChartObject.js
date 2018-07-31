var DataPVC=[]


//======================PVC MONITOR OBJECT========================================
function buildProcessVariableChart(title, timeline, timelineUnits, faceColor, leftName, leftMin, leftMax, setpoint, right1Name, right1Min, right1Max,  right2Name, right2Min, right2Max,  scale)
{
    var defaultHeight=410
    //---chart size---
    var height=260
     var width=450

    if(leftName&&right1Name&&right2Name)
    var defaultWidth=700
    else if(leftName&&right1Name)
    var defaultWidth=600
    else if(leftName)
    var defaultWidth=550


    //---build init/temp data only for display---
    if(right1Name=="")
    {
       right1Min=false
     right1Max=false

    }
    if(right2Name=="")
    {
       right2Min=false
     right2Max=false

    }


    buildDataPVC(timeline,leftMin,leftMax,right1Min,right1Max,right2Min,right2Max)




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
    .attr("id","PVCTitle")
    .text(title)
    .attr("x",defaultWidth/2)
    .attr("dy","1em")
    .attr("font-family","arial")
    .attr("font-size","40")
    .attr("font-weight","bold")
    .attr("text-anchor","middle")


    //---timeline---
    var xTime = d3.scaleLinear()
    .domain([0, timeline])
    .range([0, width])


    var yLeft = d3.scaleLinear()
    .domain([leftMin, leftMax]) // measured
    .range([height, 0]); // output

    if(right1Name!="")
    var yRight1 = d3.scaleLinear()
    .domain([right1Min, right1Max]) // input
    .range([height, 0]); // output

     if(right2Name!="")
    var yRight2 = d3.scaleLinear()
    .domain([right2Min, right2Max]) // input
    .range([height, 0]); // output

    // gridlines in x axis function
    function make_x_gridlines() {
    return d3.axisBottom(xTime)
    }

    // gridlines in y axis function
    function make_y_gridlines() {
    return d3.axisLeft(yLeft)
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
    .text(timelineUnits)
    .attr("x",width/2)
    .attr("y",height+45)
    .attr("font-family","arial")
    .attr("font-size","25")
    .attr("text-anchor","middle")

    // Call the Left y axis in a group tag
   plotG.append("text")
    .text(leftName)
    .attr("font-size",30)
    .attr("fill","DarkViolet")
    .attr("stroke","black")
    .attr("stroke-width","1")
    .attr("font-weight","bold")
    .attr("transform","translate(-60,-20)")

    if(right1Name!="")
   plotG.append("text")
    .text(right1Name)
    .attr("font-size",30)
    .attr("fill","blue")
    .attr("stroke","black")
    .attr("stroke-width","1")
    .attr("font-weight","bold")
    .attr("transform","translate(340,-20)")

    if(right2Name!="")
   plotG.append("text")
    .text(right2Name)
    .attr("font-size",30)
    .attr("fill","red")
    .attr("stroke","black")
    .attr("stroke-width","1")
    .attr("font-weight","bold")
    .attr("transform","translate(510,-20)")

    plotG.append("g")
    .attr("class", "y axisDarkViolet")
    .call(d3.axisLeft(yLeft))
    .selectAll("text")
    .attr("font-size","24")
    .attr("fill","DarkViolet")
    .attr("stroke","black")
    .attr("stroke-width",".5")

    if(right1Name!="")
    plotG.append("g")
    .attr("class", "y axis right axisBlue")
    .attr("transform", "translate("+(width+10)+",0)")
    .call(d3.axisRight(yRight1))
    .selectAll("text")
    .attr("font-size","24")
    .attr("fill","blue")
    .attr("stroke","black")
    .attr("stroke-width",".5")

     if(right2Name!="")
    plotG.append("g")
    .attr("class", "y axis right axisred")
    .attr("transform", "translate("+(width+100)+",0)")
    .call(d3.axisRight(yRight2))
    .selectAll("text")
    .attr("font-size","24")
    .attr("fill","red")
    .attr("stroke","black")
    .attr("stroke-width",".5")


    //-----------setpoint line------------
    if(setpoint)
    {
        //---center of max
        var setpointValue=leftMax/2+leftMax*.05
        var pxPerValHt=height/(Math.abs(leftMax)-Math.abs(leftMin))
        var setPointY=pxPerValHt*(leftMax-setpointValue)
         var dash=width/30

        plotG.append("line")
        .attr("id", "setPointLeft")
        .attr("x1",0)
        .attr("y1", setPointY)
        .attr("x2", width)
        .attr("y2", setPointY)
        .attr("stroke", "green")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", dash+","+dash)
    }


        var lineLeft = d3.line()
        .x(function(d, i) { return xTime(i); }) // set the x values for the line generator
        .y(function(d) { return yLeft(d.Left); }) // set the y values for the line generator
        .curve(d3.curveMonotoneX) // apply smoothing to the line
          if(right1Name!="")
        var lineRight1 = d3.line()
        .x(function(d, i) { return xTime(i); }) // set the x values for the line generator
        .y(function(d) { return yRight1(d.Right1); }) // set the y values for the line generator
        .curve(d3.curveMonotoneX) // apply smoothing to the line
         if(right2Name!="")
        var lineRight2  = d3.line()
        .x(function(d, i) { return xTime(i); }) // set the x values for the line generator
        .y(function(d) { return yRight2(d.Right2); }) // set the y values for the line generator
        .curve(d3.curveMonotoneX) // apply smoothing to the line


    // Append the path, bind the data, and call the line generator



        var pathLeft=plotG.append("path")
        .attr("clip-path", "url(#clip)")
        .datum(DataPVC) // 10. Binds data to the line
        .attr("class", "chartLineLeft") // Assign a class for styling
        .attr("d", lineLeft); // 11. Calls the line generator

       if(right1Name!="")
        var pathRight1=plotG.append("path")
        .attr("clip-path", "url(#clip)")
        .datum(DataPVC) // 10. Binds data to the line
        .attr("class", "chartLineRight1") // Assign a class for styling
        .attr("d", lineRight1); // 11. Calls the line generator

        if(right2Name!="")
        var pathRight2=plotG.append("path")
        .attr("clip-path", "url(#clip)")
        .datum(DataPVC) // 10. Binds data to the line
        .attr("class", "chartLineRight2") // Assign a class for styling
        .attr("d", lineRight2); // 11. Calls the line generator


       activeElem.setAttribute("transform", "translate("+(SVGx)+" "+(SVGy)+")scale("+scale+")")


  ActiveElem.attr("type","processVariableChart")
    ActiveElem.attr("title",title)
    ActiveElem.attr("timeline",timeline)
    ActiveElem.attr("timelineUnits",timelineUnits)
    ActiveElem.attr("faceColor",faceColor)
    ActiveElem.attr("leftName",leftName)
    ActiveElem.attr("leftMin",leftMin)
    ActiveElem.attr("leftMax",leftMax)
    ActiveElem.attr("setpoint",setpoint)
    ActiveElem.attr("right1Name",right1Name)
    ActiveElem.attr("right1Min",right1Min)
    ActiveElem.attr("right1Max",right1Max)
    ActiveElem.attr("right2Name",right2Name)
    ActiveElem.attr("right2Min",right2Min)
    ActiveElem.attr("right2Max",right2Max)
    ActiveElem.attr("scale",scale)


}
function buildDataPVC(timeline,leftMin,leftMax,right1Min,right1Max,right2Min,right2Max)
{

    DataPVC=[]
    var leftMid=(leftMax-leftMin)/2

    if(right1Max)
        var right1Mid=(right1Max-right1Min)/2
    else
        var right1Mid=false

    if(right2Max)
        var right2Mid=(right2Max-right2Min)/2
    else
        var right2Mid=false


  for(var k=0;k<timeline;k++)
  {

        var left=Math.round(Math.random()*leftMid/5)+leftMid
        if(right1Mid)
         var right1=Math.round(Math.random()*right1Mid/5)+right1Mid
       else
        var right1=""

       if(right2Mid)
         var right2=Math.round(Math.random()*right2Mid/5)+right2Mid
       else
        var right2=""

      DataPVC[k]={Left:left,Right1:right1,Right2:right2}

  }

}





