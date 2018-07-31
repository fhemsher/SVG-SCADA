







///---X button and iframe close all---
function closeDrawBarGauge()
{
    if(addElemBarGaugeViz==true)
    {
        closeIframe("addElemBarGauge");
        coverOff()

        var cw = addElemBarGaugeCw

        if(EditBarGauge==true && BarGaugeDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawBarGaugeEditId)
            elemObjEdit.style.display = "inline"

            elemObjEdit.setAttribute("onmousedown", "editBarGaugeDraw("+DrawBarGaugeEditId+",evt)")

        }
        DraggingObj = false
        DrawBarGauge = false
        EditBarGauge = false
        BarGaugeDeleted = false

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
        cw.drawBarGaugeFinishButton.disabled = false
        cw.drawBarGaugeCancelButton.disabled = false
        cw.drawBarGaugeCancelButton.style.borderColor = ""
        cw.drawBarGaugeDeleteButton.style.visibility = "hidden"
        cw.drawBarGaugeTopButton.style.visibility = "hidden"
       // cw.drawEllipseBotButton.style.visibility = "hidden"
            cw.drawBarGaugeBotButton.disabled=true
        cw.drawBarGaugeEditSpan.innerText = "Draw Bar Gauges"




    }
}

//---on add icon DrawX follows cursor
function trackDrawBarGauge()
{


    if(ActiveElem==null&&EditGauge==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }
}

var EditBarGauge = false
var DrawBarGauge = false
var BarGaugeDeleted = false

function startBarGaugeDraw()
{
    var cw = addElemBarGaugeCw
    if(EditBarGauge==false)
    {
        ActiveElem = null
        activeElem = null
        DrawBarGauge = true
        DrawX.style("display", "inline")
        mySVG.setAttribute('onclick', "plantBarGauge()") //---click to add more icons for this session---

    }

}

//--click on svg---
function plantBarGauge()
{
    var cw = addElemBarGaugeCw
    coverOn()

activeElem=document.createElementNS(NS,"g")
activeElem.setAttribute("id", "activeElem")
domActiveElemG.appendChild(activeElem)








       var barColor=cw.barColorSelect.options[cw.barColorSelect.selectedIndex].value
       var faceColor=cw.faceColorSelect.options[cw.faceColorSelect.selectedIndex].value

       var title=cw.titleValue.value
var units=cw.unitValue.value
var min=+cw.minValue.value
var max=+cw.maxValue.value

var setPoint=+cw.setPointValue.value
 maxAlert=+cw.maxAlertValue.value
 minAlert=+cw.minAlertValue.value
var initialValue=+cw.initValue.value
var scale=+cw.barGaugeScaleSelect.options[cw.barGaugeScaleSelect.selectedIndex].text

buildBarGauge(title,units,min,max,barColor,faceColor,setPoint,maxAlert,minAlert,initialValue,scale)









        activeElem.setAttribute("scale", scale)
        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)




        mySVG.removeAttribute('onclick')
        mySVG.style.cursor = ""
        mySVG.setAttribute("onmousedown", "startDragBarGauge(evt)")
        mySVG.setAttribute("onmousemove", "dragBarGauge(evt)")
        mySVG.setAttribute("onmouseup", "endDragBarGauge(evt)")




        cw.drawBarGaugeCancelButton.disabled = false
        cw.drawBarGaugeFinishButton.disabled = false
            cw.drawBarGaugeBotButton.disabled=false
}




function finishDrawBarGauge()
{

    if(EditBarGauge==true )
        finishEditBarGauge()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemBarGaugeCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "barGauge"+new Date().getTime()

            finishedElem.setAttribute("id", id)
             finishedElem.setAttribute("class", "hmiElem")
              CurrentHMIElem=finishedElem.cloneNode(true)

                mySVG.removeAttribute("onmousedown")
            mySVG.removeAttribute("onmousemove")
            mySVG.removeAttribute("onmouseup")

            finishedElem.setAttribute("onmousedown", "editBarGaugeDraw("+id+",evt)")



         domElemG.appendChild(finishedElem)




            ActiveElem = null
            activeElem = null

            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "plantBarGauge()") //---click to add more icons for this session---
            DrawX.style("display", "none")
            DragDot.style("visibility", "hidden")
            // topG.appendChild(dragDot)
             cw.drawBarGaugeFinishButton.disabled = true
            cw.drawBarGaugeCancelButton.disabled = true

            cw.drawBarGaugeBotButton.disabled=true
             if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }


        }
}

function cancelDrawBarGauge()
{
    var cw = addElemBarGaugeCw
    if(EditBarGauge==true)
        cancelEditBarGauge()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "plantBarGauge()") //---click to add more icons for this session---

            cw.drawBarGaugeFinishButton.disabled = true
            cw.drawBarGaugeCancelButton.disabled = true
            coverOff()
                cw.drawBarGaugeBotButton.disabled=true
        }

        cw.drawBarGaugeCancelButton.style.borderColor = ""

}

//====================edit/update GAUGE===============================

var EditBarGauge = false
var DrawBarGaugeEditId
var EditThisBarGauge
//--mousedown/right button on GAUGE---
function editBarGaugeDraw(elemObjEdit, evt)
{

    var isRightMB;
    evt = window.event;
    if ("which" in evt) // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = evt.which == 3;
    else if ("button" in evt) // IE, Opera
        isRightMB = evt.button == 2;

    if(isRightMB&&DrawBarGauge==false&&ZoomDrawing==false)
    {

        EditThisBarGauge = elemObjEdit

        DrawBarGaugeEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditBarGauge = true
        if(addElemBarGaugeLoad==false)
        {
            openIframe("AddElem", "addElemBarGauge", 10)

        }
        else if(addElemBarGaugeViz==false)
        {
            openIframe("AddElem", "addElemBarGauge", 10)
            setEditBarGauge()
        }
        else
            setEditBarGauge()

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

        ZoomDraggedElems.push([dragTarget,"editBarGaugeDraw("+dragTarget.id+",evt)",classed])
    }


}
//---after iframe loaded see sendSize() at addElemBarGauge.htm---
var EditBarGaugeObj
function setEditBarGauge()
{
    coverOn()

    var cw = addElemBarGaugeCw

    var elemObjEdit = document.getElementById(DrawBarGaugeEditId)

    EditBarGaugeObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditBarGaugeObj.setAttribute("id", "activeElem")
    EditBarGaugeObj.setAttribute("class", "dragTargetObj")
    EditBarGaugeObj.removeAttribute("onmousedown")

    // EditBarGaugeObj.style.cursor = "move"

    domActiveElemG.insertBefore(EditBarGaugeObj, domActiveElemG.firstChild)
    ActiveElem = d3.select("#activeElem")
    activeElem = document.getElementById("activeElem")

    cw.drawBarGaugeDeleteButton.style.visibility = "visible"
    cw.drawBarGaugeTopButton.style.visibility = "visible"
    cw.drawBarGaugeBotButton.style.visibility = "visible"
  cw.drawBarGaugeEditSpan.innerHTML = "Edit Bar Gauge"
    cw.containerDiv.style.backgroundColor = "orange"

    cw.drawBarGaugeCancelButton.disabled = false
    cw.drawBarGaugeFinishButton.disabled = false
        cw.drawBarGaugeBotButton.disabled=false

            var matrix = activeElem.transform.baseVal.consolidate().matrix;


                    var transX=matrix.e
                    var transY=matrix.f


            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", "translate("+matrix.e+","+matrix.f+")")


            var title=ActiveElem.attr("title")
            var units=ActiveElem.attr("unit")
            var max=ActiveElem.attr("max")
            var min=ActiveElem.attr("min")
            var initialValue=ActiveElem.attr("initialValue")
            var minAlert=+ActiveElem.attr("minAlert")
            var maxAlert=+ActiveElem.attr("maxAlert")
              var setPoint=ActiveElem.attr("setPoint")
            var scale=activeElem.getAttribute("scale")
             var barColor=ActiveElem.attr("barColor")
            var faceColor=ActiveElem.attr("faceColor")
            var faceColor=ActiveElem.attr("faceColor")

 cw.titleValue.value=title
cw.unitValue.value=units
cw.minValue.value=min
cw.maxValue.value=max

cw.setPointValue.value=setPoint

cw.maxAlertValue.value=maxAlert
cw.minAlertValue.value=minAlert
cw.initValue.value=initialValue

            for(var k=0;k<cw.barColorSelect.options.length;k++)
            {
                color=cw.barColorSelect.options[k].value
                if(color==barColor)
                {
                    cw.barColorSelect.selectedIndex=k
                   cw.barColorBg.style.background=barColor
                    break
                }
            }
            for(var k=0;k<cw.faceColorSelect.options.length;k++)
            {
                color=cw.faceColorSelect.options[k].value
                if(color==faceColor)
                {
                    cw.faceColorSelect.selectedIndex=k
                   cw.faceColorBg.style.background=faceColor
                    break
                }
            }

           for(var k=0;k<cw.barGaugeScaleSelect.options.length;k++)
            {
                var barScale=cw.barGaugeScaleSelect.options[k].text
                if(scale==barScale)
                {
                    cw.barGaugeScaleSelect.selectedIndex=k
                    break
                }
            }




            //--place dragDot----
            setBarGaugeEditDrag()

            mySVG.style.cursor = ""

}

function setBarGaugeEditDrag()
{


    activeElem.removeAttribute("onmousedown")

    mySVG.setAttribute("onmousedown", "startDragBarGauge(evt)")
    mySVG.setAttribute("onmousemove", "dragBarGauge(evt)")
    mySVG.setAttribute("onmouseup", "endDragBarGauge(evt)")
    ActiveElem.style("cursor", "move")

}
function changeBarGauge()
{
  if(ActiveElem)
  {
    var cw = addElemBarGaugeCw
    var matrix = activeElem.transform.baseVal.consolidate().matrix;
    var transX=matrix.e
    var transY=matrix.f
    domActiveElemG.removeChild(activeElem)

    activeElem=document.createElementNS(NS,"g")
    activeElem.setAttribute("id", "activeElem")
    domActiveElemG.appendChild(activeElem)

       var barColor=cw.barColorSelect.options[cw.barColorSelect.selectedIndex].value
       var faceColor=cw.faceColorSelect.options[cw.faceColorSelect.selectedIndex].value

       var title=cw.titleValue.value
var units=cw.unitValue.value
var min=+cw.minValue.value
var max=+cw.maxValue.value

var setPoint=+cw.setPointValue.value
var maxAlert=cw.maxAlertValue.value
var minAlert=cw.minAlertValue.value
if(cw.maxAlertValue.value!="")
 maxAlert=+cw.maxAlertValue.value
if(cw.minAlertValue.value!="")
 minAlert=+cw.minAlertValue.value
var initialValue=+cw.initValue.value
var scale=+cw.barGaugeScaleSelect.options[cw.barGaugeScaleSelect.selectedIndex].text

buildBarGauge(title,units,min,max,barColor,faceColor,setPoint,maxAlert,minAlert,initialValue,scale)


        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)



        activeElem.setAttribute("transform", "translate("+(transX)+" "+(transY)+")scale("+scale+")")

        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)

 }

}
function finishEditBarGauge()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemBarGaugeCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "hmiElem")

        finishedElem.setAttribute("id", DrawBarGaugeEditId)
            CurrentHMIElem=finishedElem.cloneNode(true)

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("onmousedown", "editBarGaugeDraw("+DrawBarGaugeEditId+",evt)")
        finishedElem.setAttribute("id", DrawBarGaugeEditId)
        domElemG.insertBefore(finishedElem, EditThisBarGauge)
        domElemG.removeChild(EditThisBarGauge)
       if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }


    }

    closeDrawBarGauge()
}


function cancelEditBarGauge()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawBarGaugeEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(EditBarGaugeObj)
    activeElem = null
    ActiveElem = null

    closeDrawBarGauge()


}

//=======================delete circle==================
var BarGaugeDeleted = false
//---button---
function removeCurrentDrawBarGauge()
{

    domActiveElemG.removeChild(activeElem)
     var elemObjEdit = document.getElementById(DrawBarGaugeEditId)
     domElemG.removeChild(elemObjEdit)
    BarGaugeDeleted = true



    closeDrawBarGauge()

}
//====================Top/Bot===================
function topDrawBarGauge()
{

    var elemObjEdit = document.getElementById(DrawBarGaugeEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawBarGaugeEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null

    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)

    closeDrawBarGauge()
}
function botDrawBarGauge()
{
    if(EditBarGauge)
    {
    var elemObjEdit = document.getElementById(DrawBarGaugeEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawBarGaugeEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null
    domElemG.removeChild(elemObjEdit)
    domElemG.insertBefore(finishedElem,domElemG.firstChild)

   closeDrawBarGauge()
      }
   else
   {
        finishDrawBarGauge()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }


}

function faceColorSelected()
{
    var cw = addElemBarGaugeCw
    var faceColor=cw.faceColorSelect.options[cw.faceColorSelect.selectedIndex].value
    cw.faceColorBg.style.background=faceColor
    changeBarGauge()
}
function barColorSelected()
{

     var cw = addElemBarGaugeCw
    var barColor=cw.barColorSelect.options[cw.barColorSelect.selectedIndex].value
    cw.barColorBg.style.background=barColor
    changeBarGauge()


}


