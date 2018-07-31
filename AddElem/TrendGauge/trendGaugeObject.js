function buildTrendGauge(title,units,timeLine,min,max,minErrorBand,maxErrorBand,width,height,ringColor,faceColor,setPoint)
{

   var valueSpan=max-min
   var pxVal =height/valueSpan
    //---simulation-----
     Data=[]
    if(!setPoint)
    {
    var dataBand=valueSpan*.5
      var vy=valueSpan*.1
    }
    else
    {
    var dataBand=(setPoint-min)
     var vy=valueSpan*.1
    }
    var pmFactor=-1
    for(var k=0;k<timeLine;k++)
    {
      var rv=Math.random()*vy*pmFactor+dataBand+min
       Data.push(rv)
       pmFactor=pmFactor*-1
    }


//  X scale will use the index of our data
var xTimeScale = d3.scaleLinear()
    .domain([0, timeLine])
    .range([0, width])


var yScale = d3.scaleLinear()
    .domain([min, max]) // input
    .range([height, 0]); // output


 ActiveElem=d3.select("#activeElem")


  // gridlines in x axis function
function make_x_gridlines() {
    return d3.axisBottom(xTimeScale)
}

// gridlines in y axis function
function make_y_gridlines() {
    return d3.axisLeft(yScale)
}


var faceRect=ActiveElem.append("rect")
 .attr("id","faceRect")
 .attr("stroke","none")
 .attr("fill",faceColor)
  var defs=ActiveElem.append("defs")

 ActiveElem.append("rect")
 .attr("id","baseRect")
 .attr("width",width)
 .attr("height",height)
 .attr("stroke","none")
 .attr("fill","ghostWhite")
// add the X gridlines
  ActiveElem.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(make_x_gridlines()
          .tickSize(-height)
          .tickFormat("")
      )

  // add the Y gridlines
  ActiveElem.append("g")
      .attr("class", "grid")
      .call(make_y_gridlines()
          .tickSize(-width)
          .tickFormat("")
      )



if(maxErrorBand)
{

     ActiveElem.append("rect")
     .attr("id","maxRect")
     .attr("width",width)
     .attr("height",height*maxErrorBand)
     .attr("stroke","none")
     .attr("fill","url(#warningMaxTrend)")
 }

 if(minErrorBand)
 {


    ActiveElem.append("rect")
     .attr("id","minRect")
     .attr("y",height-height*minErrorBand)
     .attr("width",width)
     .attr("height",height*minErrorBand)
     .attr("stroke","none")
     .attr("fill","url(#warningMinTrend)")
}


 var pxVal =height/valueSpan

 if(setPoint)
 {
     var x1=0
     var y1=(max-setPoint)*pxVal
     var x2=width
     var y2=(max-setPoint)*pxVal

    var setPointLine=ActiveElem.append("line")
     .attr("id","setPointLine")
     .attr("x1",x1)
     .attr("y1",y1)
     .attr("x2",x2)
     .attr("y2",y2)
     .attr("stroke","green")
     .attr("stroke-width","1")
    .attr("stroke-dasharray","2,2")
}

// Call the x axis in a group tag
ActiveElem.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xTimeScale) // Create an axis component with d3.axisBottom
     .ticks(""))

// Call the y axis in a group tag
ActiveElem.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)
     .ticks(4))

//--Data and Data Lines/Paths-->

var gaugeLine = d3.line()
    .x(function(d, i) { return xTimeScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d); }) // set the y values for the line generator
    .curve(d3.curveMonotoneX) // apply smoothing to the line

// eval("line"+name+"=gaugeLine")
    // Append the path, bind the data, and call the line generator

gaugePath=ActiveElem.append("path")
    .datum(Data) // 10. Binds data to the line
    .attr("stroke-width", "1")
    .attr("stroke", "black")
    .attr("fill", "none")
    .attr("d", gaugeLine) // 11. Calls the line generator
// eval("path"+name+"=gaugePath")


var pointer=ActiveElem.append("polygon")
    .attr("id","pointer"+name)
    .attr("stroke","pointer")
    .attr("fill","#000000")
    .attr("points","8 0 -4 -6.9282 -4 6.9282")



     var lastValue=Data[Data.length-1].toFixed(0)
    var valueLabel=ActiveElem.append("text")
    .attr("id","valueLabel")
    .attr("fill","black")
    .attr("dy",".5em")
    .attr("dx","1em")
    .text(lastValue +units)

     var titleLabel=ActiveElem.append("text")
         .attr("text-anchor","middle")
           .attr("dy","1.3em")
           .attr("font-size","15px")
           .attr("font-weight","bold")
           .attr("fill","black")
           .attr("y",height)
           .attr("x",width/2)
           .text(title)

    var pathSplit=gaugePath.attr("d").split(",")
        var splitX=pathSplit[pathSplit.length-2]
        var splitY=pathSplit[pathSplit.length-1]
        valueLabel.attr("x",splitX)
        valueLabel.attr("y",splitY)
    pointer.attr("transform","translate("+(splitX)+","+splitY+")scale(1.5)")

     var bb=document.getElementById("activeElem").getBBox()
        var padding=3 //---ring stroke width---
     faceRect.attr("x",bb.x-padding)
   faceRect.attr("y",bb.y-padding)
   faceRect.attr("width",bb.width+2*padding)
   faceRect.attr("height",bb.height+2*padding)


     ActiveElem.append("rect")
   .attr("x",bb.x-padding)
   .attr("y",bb.y-padding)
   .attr("width",bb.width+2*padding)
   .attr("height",bb.height+2*padding)
   .attr("stroke",ringColor)
   .attr("stroke-width","3")
   .attr("rx","3")
   .attr("ry","3")
   .attr("fill","white")
   .attr("fill-opacity","0")
   .attr("pointer-events","visible")

        var bb=activeElem.getBBox()
      var cx=bb.x+.5*bb.width
      var cy=bb.y+.5*bb.height
        activeElem.setAttribute("transform", "translate("+(SVGx-cx)+" "+(SVGy-cy)+")")

     ActiveElem.attr("type","trend")
    ActiveElem.attr("title",title)
    ActiveElem.attr("unit",units)
    ActiveElem.attr("min",min)
    ActiveElem.attr("max",max)
    ActiveElem.attr("minErrorBand",minErrorBand)
    ActiveElem.attr("maxErrorBand",maxErrorBand)
    ActiveElem.attr("width",width)
    ActiveElem.attr("height",height)
    ActiveElem.attr("ringColor",ringColor)
    ActiveElem.attr("faceColor",faceColor)
    ActiveElem.attr("setPoint",setPoint)


}

//==================END GAUGE OBJECT======================================



