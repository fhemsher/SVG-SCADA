
///---X button and iframe close all---
function closeDrawProcessVariableChart()
{
    if(addElemProcessVariableChartViz==true)
    {
        closeIframe("addElemProcessVariableChart");
        coverOff()

        var cw = addElemProcessVariableChartCw

        if(EditProcessVariableChart==true && ProcessVariableChartDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawProcessVariableChartEditId)
            elemObjEdit.style.display = "inline"

            elemObjEdit.setAttribute("onmousedown", "editProcessVariableChartDraw("+DrawProcessVariableChartEditId+",evt)")

        }
        DraggingObj = false
        DrawProcessVariableChart = false
        EditProcessVariableChart = false
        ProcessVariableChartDeleted = false

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")

        mySVG.removeAttribute('onclick')

        if(document.getElementById("activeElem"))
        {
            // alert(document.getElementById("activeElem").parentNode.getAttribute("id"))
            document.getElementById("activeElem").removeAttribute("class")
            domActiveElemG.removeChild(document.getElementById("activeElem"))


        }
        activeElem = null
        ActiveElem = null

        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)
         cw.containerDiv.style.backgroundColor = "#ABCDEF"
        cw.drawProcessVariableChartFinishButton.disabled = false
        cw.drawProcessVariableChartCancelButton.disabled = false
        cw.drawProcessVariableChartCancelButton.style.borderColor = ""
        cw.drawProcessVariableChartDeleteButton.style.visibility = "hidden"
        cw.drawProcessVariableChartTopButton.style.visibility = "hidden"

            cw.drawProcessVariableChartBotButton.disabled=true
        cw.drawProcessVariableChartEditSpan.innerText = "Draw Variable Frequencies"




    }
}

//---on add icon DrawX follows cursor
function trackDrawProcessVariableChart()
{


    if(ActiveElem==null&&EditProcessVariableChart==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }
}

var EditProcessVariableChart = false
var DrawProcessVariableChart = false
var ProcessVariableChartDeleted = false

function startProcessVariableChartDraw()
{
    var cw = addElemProcessVariableChartCw
    if(EditProcessVariableChart==false)
    {
        ActiveElem = null
        activeElem = null
        DrawProcessVariableChart = true
        DrawX.style("display", "inline")
        mySVG.setAttribute('onclick', "plantProcessVariableChart()") //---click to add more icons for this session---

    }

}

//--click on svg---
function plantProcessVariableChart()
{
    var cw = addElemProcessVariableChartCw
    coverOn()

    activeElem=document.createElementNS(NS,"g")
    activeElem.setAttribute("id", "activeElem")
    domActiveElemG.appendChild(activeElem)

    ActiveElem=d3.select("#activeElem")
    .attr("text-rendering","geometricPrecision")
    .attr("shape-rendering","geometricPrecision")


    var title=cw.titleValue.value
    var timeline=+cw.timelineValue.value
    var timelineUnits=cw.timelineUnitsValue.value
    var faceColor=cw.faceColorProcessVariableChartSelect.options[cw.faceColorProcessVariableChartSelect.selectedIndex].value

    var leftName=cw.leftNameValue.value
    var leftMin=+cw.leftMinValue.value
    var leftMax=+cw.leftMaxValue.value
    var setpoint=cw.setpointCheck.checked

    var right1Name=cw.right1NameValue.value
    var right1Min=+cw.right1MinValue.value
    var right1Max=+cw.right1MaxValue.value

    var right2Name=cw.right2NameValue.value
    var right2Min=+cw.right2MinValue.value
    var right2Max=+cw.right2MaxValue.value

    var scale=+cw.processVariableChartScaleSelect.options[cw.processVariableChartScaleSelect.selectedIndex].text


    buildProcessVariableChart(title, timeline, timelineUnits, faceColor, leftName, leftMin, leftMax, setpoint, right1Name, right1Min, right1Max,  right2Name, right2Min, right2Max,  scale)


    activeElem.setAttribute("cursor", "move")
    activeElem.setAttribute("class", "dragTargetObj")
    activeElem.setAttribute("pointer-events", null)

    mySVG.removeAttribute('onclick')
    mySVG.style.cursor = ""
    mySVG.setAttribute("onmousedown", "startDragProcessVariableChart(evt)")
    mySVG.setAttribute("onmousemove", "dragProcessVariableChart(evt)")
    mySVG.setAttribute("onmouseup", "endDragProcessVariableChart(evt)")

    cw.drawProcessVariableChartCancelButton.disabled = false
    cw.drawProcessVariableChartFinishButton.disabled = false
            cw.drawProcessVariableChartBotButton.disabled=false

}

function finishDrawProcessVariableChart()
{

    if(EditProcessVariableChart==true )
        finishEditProcessVariableChart()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemProcessVariableChartCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "processVariableChart"+new Date().getTime()

            finishedElem.setAttribute("id", id)

                finishedElem.setAttribute("class", "hmiElem")
                        CurrentHMIElem=finishedElem.cloneNode(true)

            mySVG.removeAttribute("onmousedown")
            mySVG.removeAttribute("onmousemove")
            mySVG.removeAttribute("onmouseup")

            finishedElem.setAttribute("onmousedown", "editProcessVariableChartDraw("+id+",evt)")



         domElemG.appendChild(finishedElem)




            ActiveElem = null
            activeElem = null

            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "plantProcessVariableChart()") //---click to add more icons for this session---
            DrawX.style("display", "none")
            DragDot.style("visibility", "hidden")
            // topG.appendChild(dragDot)
           cw.drawProcessVariableChartFinishButton.disabled = true
          cw.drawProcessVariableChartCancelButton.disabled = true
            cw.drawProcessVariableChartBotButton.disabled=true

       if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }



        }
}

function cancelDrawProcessVariableChart()
{
    var cw = addElemProcessVariableChartCw
    if(EditProcessVariableChart==true)
        cancelEditProcessVariableChart()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "plantProcessVariableChart()") //---click to add more icons for this session---

            cw.drawProcessVariableChartFinishButton.disabled = true
            cw.drawProcessVariableChartCancelButton.disabled = true
            cw.drawProcessVariableChartBotButton.disabled=true
            coverOff()

        }

        cw.drawProcessVariableChartCancelButton.style.borderColor = ""

}

//====================edit/update GAUGE===============================

var EditProcessVariableChart = false
var DrawProcessVariableChartEditId
var EditThisProcessVariableChart
//--mousedown/right button on GAUGE---
function editProcessVariableChartDraw(elemObjEdit, evt)
{
    var isRightMB;
    evt = window.event;
    if ("which" in evt) // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = evt.which == 3;
    else if ("button" in evt) // IE, Opera
        isRightMB = evt.button == 2;

    if(isRightMB&&DrawProcessVariableChart==false&&ZoomDrawing==false)
    {

        EditThisProcessVariableChart = elemObjEdit

        DrawProcessVariableChartEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditProcessVariableChart = true
        if(addElemProcessVariableChartLoad==false)
        {
            openIframe("AddElem", "addElemProcessVariableChart", 10)

        }
        else if(addElemProcessVariableChartViz==false)
        {
            openIframe("AddElem", "addElemProcessVariableChart", 10)
            setEditProcessVariableChart()
        }
        else
            setEditProcessVariableChart()

    }
    if(isRightMB&&ZoomDrawing==true ) //---zoom drag
    {
        mySVG.setAttribute("onmousedown", "startDragZoom(evt)")
        mySVG.setAttribute("onmousemove", "dragZoom(evt)")
        mySVG.setAttribute("onmouseup", "endDragZoom(evt)")
        d3.select("#mySVG").on("mousedown.zoom", null)

        var dragTarget=evt.target.parentNode

        var classed=dragTarget.getAttribute("class")
        dragTarget.setAttribute("class", "dragTargetObj")
        dragTarget.removeAttribute("onmousedown")
        dragTarget.setAttribute("style","cursor:move")
       dragTarget.setAttribute("opacity",.4)
        DrawX.style("display", "none")

        ZoomDraggedElems.push([dragTarget,"editProcessVariableChartDraw("+dragTarget.id+",evt)",classed])
    }

}
//---after iframe loaded see sendSize() at addElemProcessVariableChart.htm---
var EditProcessVariableChartObj
function setEditProcessVariableChart()
{
    coverOn()

    var cw = addElemProcessVariableChartCw

    var elemObjEdit = document.getElementById(DrawProcessVariableChartEditId)

    EditProcessVariableChartObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditProcessVariableChartObj.setAttribute("id", "activeElem")
    EditProcessVariableChartObj.setAttribute("class", "dragTargetObj")
    EditProcessVariableChartObj.removeAttribute("onmousedown")

    // EditProcessVariableChartObj.style.cursor = "move"

    domActiveElemG.insertBefore(EditProcessVariableChartObj, domActiveElemG.firstChild)
    ActiveElem = d3.select("#activeElem")
    activeElem = document.getElementById("activeElem")

    cw.drawProcessVariableChartDeleteButton.style.visibility = "visible"
        cw.drawProcessVariableChartTopButton.style.visibility = "visible"
        cw.drawProcessVariableChartBotButton.style.visibility = "visible"
  cw.drawProcessVariableChartEditSpan.innerHTML = "Edit Process Variable"
    cw.containerDiv.style.backgroundColor = "orange"

    cw.drawProcessVariableChartCancelButton.disabled = false
    cw.drawProcessVariableChartFinishButton.disabled = false
               cw.drawProcessVariableChartBotButton.disabled=false


            var matrix = activeElem.transform.baseVal.consolidate().matrix;


                    var transX=matrix.e
                    var transY=matrix.f


            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", "translate("+matrix.e+","+matrix.f+")")

    var title=ActiveElem.attr("title")
    var timeline=ActiveElem.attr("timeline")
    var timelineUnits=ActiveElem.attr("timelineUnits")
    var faceColor=ActiveElem.attr("faceColor")
    var leftName=ActiveElem.attr("leftName")
    var leftMin=ActiveElem.attr("leftMin")
    var leftMax=ActiveElem.attr("leftMax")
    var setpoint=ActiveElem.attr("setpoint")
    var right1Name=ActiveElem.attr("right1Name")
    var right1Min=ActiveElem.attr("right1Min")
    var right1Max=ActiveElem.attr("right1Max")
    var right2Name=ActiveElem.attr("right2Name")
    var right2Min=ActiveElem.attr("right2Min")
    var right2Max=ActiveElem.attr("right2Max")
    var scale=ActiveElem.attr("scale")

    cw.titleValue.value=title
    var title=cw.titleValue.value
    cw.timelineValue.value=timeline
    cw.timelineUnitsValue.value= timelineUnits

    cw.leftNameValue.value=leftName
    cw.leftMinValue.value=leftMin
    cw.leftMaxValue.value=leftMax
    if(setpoint=="true")
        cw.setpointCheck.checked=true
    else
        cw.setpointCheck.checked=false

    cw.right1NameValue.value=right1Name
    cw.right1MinValue.value=right1Min
    cw.right1MaxValue.value=right1Max

    cw.right2NameValue.value=right2Name
    cw.right2MinValue.value=right2Min
    cw.right2MaxValue.value=right2Max


            for(var k=0;k<cw.faceColorProcessVariableChartSelect.options.length;k++)
            {
                color=cw.faceColorProcessVariableChartSelect.options[k].value
                if(color==faceColor)
                {
                    cw.faceColorProcessVariableChartSelect.selectedIndex=k
                   cw.faceColorBg.style.background=faceColor
                    break
                }
            }

           for(var k=0;k<cw.processVariableChartScaleSelect.options.length;k++)
            {
                var barScale=cw.processVariableChartScaleSelect.options[k].text
                if(scale==barScale)
                {
                    cw.processVariableChartScaleSelect.selectedIndex=k
                    break
                }
            }




            //--place dragDot----
            setProcessVariableChartEditDrag()

            mySVG.style.cursor = ""

}

function setProcessVariableChartEditDrag()
{


    activeElem.removeAttribute("onmousedown")

    mySVG.setAttribute("onmousedown", "startDragProcessVariableChart(evt)")
    mySVG.setAttribute("onmousemove", "dragProcessVariableChart(evt)")
    mySVG.setAttribute("onmouseup", "endDragProcessVariableChart(evt)")
    ActiveElem.style("cursor", "move")

}
function changeProcessVariableChart()
{
  if(ActiveElem)
  {
    var cw = addElemProcessVariableChartCw
    var matrix = activeElem.transform.baseVal.consolidate().matrix;
    var transX=matrix.e
    var transY=matrix.f
    domActiveElemG.removeChild(activeElem)

    activeElem=document.createElementNS(NS,"g")
    activeElem.setAttribute("id", "activeElem")
    domActiveElemG.appendChild(activeElem)
    ActiveElem=d3.select("#activeElem")
    .attr("text-rendering","geometricPrecision")
    .attr("shape-rendering","geometricPrecision")


    var title=cw.titleValue.value
    var timeline=+cw.timelineValue.value
    var timelineUnits=cw.timelineUnitsValue.value
    var faceColor=cw.faceColorProcessVariableChartSelect.options[cw.faceColorProcessVariableChartSelect.selectedIndex].value

    var leftName=cw.leftNameValue.value
    var leftMin=+cw.leftMinValue.value
    var leftMax=+cw.leftMaxValue.value
    var setpoint=cw.setpointCheck.checked

    var right1Name=cw.right1NameValue.value
    var right1Min=+cw.right1MinValue.value
    var right1Max=+cw.right1MaxValue.value

    var right2Name=cw.right2NameValue.value
    var right2Min=+cw.right2MinValue.value
    var right2Max=+cw.right2MaxValue.value

    var scale=+cw.processVariableChartScaleSelect.options[cw.processVariableChartScaleSelect.selectedIndex].text


    buildProcessVariableChart(title, timeline, timelineUnits, faceColor, leftName, leftMin, leftMax, setpoint, right1Name, right1Min, right1Max,  right2Name, right2Min, right2Max,  scale)



        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)



        activeElem.setAttribute("transform", "translate("+(transX)+" "+(transY)+")scale("+scale+")")

        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)

 }

}
function finishEditProcessVariableChart()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemProcessVariableChartCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "hmiElem")

        finishedElem.setAttribute("id", DrawProcessVariableChartEditId)
                  CurrentHMIElem=finishedElem.cloneNode(true)

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("onmousedown", "editProcessVariableChartDraw("+DrawProcessVariableChartEditId+",evt)")
        finishedElem.setAttribute("id", DrawProcessVariableChartEditId)
        domElemG.insertBefore(finishedElem, EditThisProcessVariableChart)
        domElemG.removeChild(EditThisProcessVariableChart)
       if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }


    }

    closeDrawProcessVariableChart()
}


function cancelEditProcessVariableChart()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawProcessVariableChartEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(EditProcessVariableChartObj)
    activeElem = null
    ActiveElem = null

    closeDrawProcessVariableChart()


}

//=======================delete circle==================
var ProcessVariableChartDeleted = false
//---button---
function removeCurrentDrawProcessVariableChart()
{

    domActiveElemG.removeChild(activeElem)
     var elemObjEdit = document.getElementById(DrawProcessVariableChartEditId)
     domElemG.removeChild(elemObjEdit)
    ProcessVariableChartDeleted = true



    closeDrawProcessVariableChart()

}
//====================Top/Bot===================
function topDrawProcessVariableChart()
{

    var elemObjEdit = document.getElementById(DrawProcessVariableChartEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawProcessVariableChartEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null
    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)

    closeDrawProcessVariableChart()
}
function botDrawProcessVariableChart()
{
    if(EditProcessVariableChart)
    {
    var elemObjEdit = document.getElementById(DrawProcessVariableChartEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawProcessVariableChartEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null

    domElemG.removeChild(elemObjEdit)
    domElemG.insertBefore(finishedElem,domElemG.firstChild)

   closeDrawProcessVariableChart()
   }
   else
   {
        finishDrawProcessVariableChart()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }
}

function faceColorProcessVariableChartSelected()
{
    var cw = addElemProcessVariableChartCw
    var faceColor=cw.faceColorProcessVariableChartSelect.options[cw.faceColorProcessVariableChartSelect.selectedIndex].value
    cw.faceColorBg.style.background=faceColor
    changeProcessVariableChart()
}



