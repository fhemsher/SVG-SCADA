 //======================BAR GAUGE OBJECT========================================
function buildBarGauge(title,units,min,max,barColor,faceColor,setPoint,maxAlert,minAlert,initialValue,scale)
{
    //---default size---
    var gaugeWidth=300
    var gaugeHeight=80

  ActiveElem=d3.select("#activeElem")
    var gaugeRect=ActiveElem.append("rect")
    .attr("width",gaugeWidth)
    .attr("height",gaugeHeight)
    .attr("fill",faceColor)
    .attr("rx","5")
    .attr("ry","5")
    .attr("stroke","black")
    .attr("stroke-width",1)

    var myTitle=ActiveElem.append("text")
    .text(title)
    .attr("x",gaugeWidth/2)
    .attr("dy","1em")
    .attr("font-family","arial")
    .attr("font-weight","bold")
    .attr("text-anchor","middle")
    .attr("class", "noselect")

    var myUnits=ActiveElem.append("text")
    .attr("id","unitsText")
    .text(initialValue+" "+units)
    .attr("x",gaugeWidth/2)
    .attr("y",gaugeHeight)
    .attr("dy","-.5em")
    .attr("font-family","arial")
    .attr("text-anchor","middle")
    .attr("class", "noselect")

    var lrPadding=20
    var barHeight=gaugeHeight/4
    var barWidth=gaugeWidth-2*lrPadding
    var minMaxSpan=max-min
    var pxPerUnit=barWidth/minMaxSpan
    //---bgRect
    ActiveElem.append("rect")
    .attr("id", "barBgRect")
    .attr("y", barHeight )
    .attr("x", lrPadding )
    .attr("width", barWidth )
    .attr("fill", "gainsboro")
    .attr("height",barHeight);

    var xBar = d3.scaleLinear()
    .range([0, barWidth]);

    xBar.domain([min, max])

    if(min<=0)
        var valueSpan=initialValue+Math.abs(min)
    else
        var valueSpan=initialValue-min
    var valueWidth=barWidth*valueSpan/minMaxSpan

    ActiveElem.append("rect")
    .attr("id", "barRect")
    .attr("fill", barColor)
    .attr("opacity", "1")
    .attr("width", 0 )
    .transition().duration(800)
    .attr("width", valueWidth )
    .attr("y", barHeight )
    .attr("x", lrPadding )
    .attr("height", barHeight);

    //----alarm----------------------------
    if(maxAlert!="")
    {
        if(min<=0)
            var maxAlertSpan=maxAlert+Math.abs(min)
        else
            var maxAlertSpan=maxAlert-min
        var maxAlertWidth=barWidth-barWidth*maxAlertSpan/minMaxSpan

        ActiveElem.append("rect")
        .attr("id","maxErrorRect")
        .attr("x",barWidth-maxAlertWidth+lrPadding)
        .attr("y",barHeight+barHeight/3)
        .attr("width",maxAlertWidth)
        .attr("height",barHeight/3)
        .attr("stroke","none")
        .attr("fill","url(#warningMaxBar)")
    }

    if(minAlert!="")
    {
        if(min<=0)
            var minAlertSpan=minAlert+Math.abs(min)
        else
            var minAlertSpan=minAlert-min

        var minAlertWidth=barWidth*minAlertSpan/minMaxSpan
        ActiveElem.append("rect")
        .attr("id","minErrorRect")
        .attr("x",lrPadding)
        .attr("y",barHeight+barHeight/3)
        .attr("width",minAlertWidth)
        .attr("height",barHeight/3)
        .attr("stroke","none")
        .attr("fill","url(#warningMinBar)")
    }

    //-----------setpoint line------------
    if(setPoint!="")
    {
        if(min<=0)
        {
            var span=setPoint+Math.abs(min)
            var setPointX=barWidth*span/(Math.abs(min)+Math.abs(max))+lrPadding
        }
        else
        {
            var span=setPoint-min
            var setPointX=barWidth*(span/(max-min))+lrPadding
        }
        var dash=barHeight/5

        ActiveElem.append("line")
        .attr("id", "lineSP")
        .attr("x1",setPointX)
        .attr("y1", barHeight)
        .attr("x2", setPointX)
        .attr("y2", barHeight*2)
        .attr("stroke", "lime")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", dash+","+dash)
    }

        // add the x Axis
    ActiveElem.append("g")
    .style("font-size",10)
    .attr("class", "noselect")
    .attr("transform", "translate("+lrPadding+"," + barHeight*2 + ")")
    .call(d3.axisBottom(xBar));

    var bb=activeElem.getBBox()
    var cx=bb.x+.5*bb.width
    var cy=bb.y+.5*bb.height
    activeElem.setAttribute("transform", "translate("+(SVGx-cx)+" "+(SVGy-cy)+")scale("+scale+")")


     ActiveElem.attr("type","bar")
    ActiveElem.attr("title",title)
    ActiveElem.attr("unit",units)
    ActiveElem.attr("min",min)
    ActiveElem.attr("max",max)
    ActiveElem.attr("minAlert",minAlert)
    ActiveElem.attr("maxAlert",maxAlert)

    ActiveElem.attr("barColor",barColor)
    ActiveElem.attr("faceColor",faceColor)
    ActiveElem.attr("setPoint",setPoint)
    ActiveElem.attr("initialValue",initialValue)
    ActiveElem.attr("scale",scale)
}



