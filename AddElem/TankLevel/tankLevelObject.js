//======================TANK LEVEL OBJECT========================================

function buildTankLevel(title,units,max,barTankColor,faceColor,minAlert,maxAlert,setPoint,initialValue,scale)
{
     //---default size---
    var tankLevelWidth=300
    var tankLevelHeight=400


    var tankLevelRect=ActiveElem.append("rect")
    .attr("width",tankLevelWidth)
    .attr("height",tankLevelHeight)
    .attr("fill",faceColor)
    .attr("rx","55")
    .attr("ry","55")
    .attr("stroke","black")
    .attr("stroke-width",1)

    var myTitle=ActiveElem.append("text")
    .text(title)
    .attr("x",tankLevelWidth/2)
    .attr("dy","1.5em")
    .attr("font-family","arial")
    .attr("font-size","25")
    .attr("font-weight","bold")
    .attr("text-anchor","middle")
    .attr("class","noselect")

    var myUnits=ActiveElem.append("text")
    .attr("id","unitsText")
    .text(initialValue+" "+units)
    .attr("x",tankLevelWidth/2)
    .attr("y",tankLevelHeight)
    .attr("dy","-.75em")
    .attr("font-family","arial")
    .attr("font-size","25")
    .attr("text-anchor","middle")
    .attr("class","noselect")


    var leftPadding=50
    var rightPadding=20
    var topPadding=50
    var botPadding=50

    var levelBarHeight=tankLevelHeight-topPadding-botPadding
    var levelBarWidth=tankLevelWidth-leftPadding-rightPadding
    var minMaxSpan=max

    //---bgRect
    ActiveElem.append("rect")
    .attr("id", "levelBarBgRect")
    .attr("y", topPadding )
    .attr("x", leftPadding )
    .attr("width", levelBarWidth )
    .attr("fill", "gainsboro")
    .attr("height",levelBarHeight);

    var yBar = d3.scaleLinear()
    .range([0, levelBarHeight]);

    yBar.domain([max, 0])



    var pxPerValHt=levelBarHeight/minMaxSpan
    var initValueY=levelBarHeight-pxPerValHt*initialValue+topPadding

    ActiveElem.append("rect")
    .attr("id", "levelBarRect")
    .attr("fill", barTankColor)
    .attr("opacity", "1")
    .attr("x", leftPadding)
    .attr("width", levelBarWidth)
    .attr("y", levelBarHeight+topPadding )
    .attr("height", 0 )
    .transition().duration(800)
    .attr("height", levelBarHeight-initValueY+topPadding )
    .attr("y", initValueY  )

    var defs=ActiveElem.append("defs")
    var alarmXindent=60
    //----alarm----------------------------
    if(maxAlert!="")
    {
        var maxAlarmHeight=levelBarHeight-pxPerValHt*maxAlert

        ActiveElem.append("rect")
        .attr("id","maxErrorRect")
        .attr("x",leftPadding+alarmXindent)
        .attr("y",topPadding)
        .attr("width",levelBarWidth-alarmXindent*2)
        .attr("height",maxAlarmHeight)
        .attr("stroke","none")
        .attr("fill","url(#warningMaxTankLevel)")
    }

    if(minAlert!="")
    {
        var minAlarmHeight=pxPerValHt*minAlert
        ActiveElem.append("rect")
        .attr("id","minErrorRect")
        .attr("x",leftPadding+alarmXindent)
        .attr("y",topPadding+levelBarHeight-minAlarmHeight)
        .attr("width",levelBarWidth-alarmXindent*2)
        .attr("height",minAlarmHeight)
        .attr("stroke","none")
        .attr("fill","url(#warningMinTankLevel)")
    }

    //-----------setpoint line------------
    if(setPoint!="")
    {
        var setPointY=levelBarHeight-pxPerValHt*setPoint+topPadding

        var dash=levelBarWidth/15

        ActiveElem.append("line")
        .attr("id", "lineSP")
        .attr("x1",leftPadding)
        .attr("y1", setPointY)
        .attr("x2", leftPadding+levelBarWidth)
        .attr("y2", setPointY)
        .attr("stroke", "lime")
        .attr("stroke-width", 4)
        .attr("stroke-dasharray", dash+","+dash)
    }

    // add the y Axis
    ActiveElem.append("g")
    .style("font-size",18)
    .attr("transform", "translate("+leftPadding+"," + topPadding + ")")
    .attr("class","noselect")  
    .call(d3.axisLeft(yBar));

    
    activeElem.setAttribute("transform", "translate("+(SVGx)+" "+(SVGy)+")scale("+scale+")")


     ActiveElem.attr("type","tankLevel")
    ActiveElem.attr("title",title)
    ActiveElem.attr("unit",units)
    ActiveElem.attr("max",max)
    ActiveElem.attr("minAlert",minAlert)
    ActiveElem.attr("maxAlert",maxAlert)
    ActiveElem.attr("barTankColor",barTankColor)
    ActiveElem.attr("faceColor",faceColor)
    ActiveElem.attr("setPoint",setPoint)
    ActiveElem.attr("initialValue",initialValue)
    ActiveElem.attr("scale",scale)
}




