






///---X button and iframe close all---
function closeDrawGauge()
{
    if(addElemGaugeViz==true)
    {
        closeIframe("addElemGauge");
        coverOff()
        
        var cw = addElemGaugeCw

        if(EditGauge==true && GaugeDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawGaugeEditId)
            elemObjEdit.style.display = "inline"

            elemObjEdit.setAttribute("onmousedown", "editGaugeDraw("+DrawGaugeEditId+",evt)")

        }
        DraggingObj = false
        DrawGauge = false
        EditGauge = false
        GaugeDeleted = false

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

        cw.drawGaugeFinishButton.disabled = false
        cw.drawGaugeCancelButton.disabled = false
        cw.drawGaugeCancelButton.style.borderColor = ""
        cw.drawGaugeDeleteButton.style.visibility = "hidden"
        cw.drawGaugeTopButton.style.visibility = "hidden"
           cw.drawGaugeBotButton.disabled=true
        cw.drawGaugeEditSpan.innerText = "Draw Round Gauges"
        cw.containerDiv.style.backgroundColor = "#ABCDEF"

       cw.editGaugePreviewButton.style.visibility = "hidden"

    }
}

//---on add icon DrawX follows cursor
function trackDrawGauge()
{
    var cw = addElemGaugeCw

    if(ActiveElem==null&&EditGauge==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }
}

var EditGauge = false
var DrawGauge = false
var GaugeDeleted = false

function startGaugeDraw()
{
    var cw = addElemGaugeCw
     elemSizeDiv.innerHTML="r = <input id=drawGaugeRadiusValue type='text' style='width:30px;border=0' /> "
    if(EditGauge==false)
    {
        ActiveElem = null
        activeElem = null
        DrawGauge = true
        DrawX.style("display", "inline")
        mySVG.setAttribute('onclick', "plantGauge()") //---click to add more icons for this session---

    }

}

//--click on svg---
function plantGauge()
{
    var cw = addElemGaugeCw
    coverOn()

      activeElem=document.createElementNS(NS,"g")
     activeElem.setAttribute("id", "activeElem")
      domActiveElemG.appendChild(activeElem)


           var name=cw.gaugeNameValue.value
     var label=cw.gaugeLabelValue.value
      var min=+cw.gaugeMinValue.value
       var max=+cw.gaugeMaxValue.value
       var majorTicks=+cw.gaugeMajorTickValue.value
       var minorTicks=+cw.gaugeMinorTickValue.value
       var ringColor=cw.ringColorSelect.options[cw.ringColorSelect.selectedIndex].value
       var faceColor=cw.faceColorGaugeSelect.options[cw.faceColorGaugeSelect.selectedIndex].value
       var diameter=+cw.gaugeDiaValue.value
       var orangeZoneRange=cw.gaugeOrangeZoneValue.value
        if(orangeZoneRange=="")
         orangeZoneRange=null
         else
        {
           var orangeZoneStart=+orangeZoneRange.split(",")[0]
           var orangeZoneEnd=+orangeZoneRange.split(",")[1]
           orangeZoneRange=[orangeZoneStart,orangeZoneEnd]

        }


       var redZoneRange=cw.gaugeRedZoneValue.value
        if(redZoneRange=="")
         redZoneRange=null
         else
        {
           var redZoneStart=+redZoneRange.split(",")[0]
           var redZoneEnd=+redZoneRange.split(",")[1]
           redZoneRange=[redZoneStart,redZoneEnd]

        }

       var greenZoneRange=cw.gaugeGreenZoneValue.value
        if(greenZoneRange=="")
         greenZoneRange=null
        else
        {
           var greenZoneStart=+greenZoneRange.split(",")[0]
           var greenZoneEnd=+greenZoneRange.split(",")[1]
           greenZoneRange=[greenZoneStart,greenZoneEnd]

        }

       var units=cw.gaugeUnitValue.value


        createGauge(name, label, min, max,majorTicks,minorTicks,ringColor,faceColor,diameter,orangeZoneRange,redZoneRange,greenZoneRange,units)



    ActiveElem = d3.select("#activeElem")
      ActiveElem.attr("name",name)
      ActiveElem.attr("type","round")
      ActiveElem.attr("label",label)
      ActiveElem.attr("min",min)
      ActiveElem.attr("max",max)
      ActiveElem.attr("majorTicks",majorTicks)
      ActiveElem.attr("minorTicks",minorTicks)
      ActiveElem.attr("ringColor",ringColor)
      ActiveElem.attr("faceColor",faceColor)
      ActiveElem.attr("diameter",diameter)
      ActiveElem.attr("orangeZoneRange",orangeZoneRange)
      ActiveElem.attr("redZoneRange",redZoneRange)
      ActiveElem.attr("greenZoneRange",greenZoneRange)
      ActiveElem.attr("units",units)

      var bb=activeElem.getBBox()
      var cx=bb.x+.5*bb.width
      var cy=bb.y+.5*bb.height

        activeElem.setAttribute("transform", "translate("+(SVGx-diameter/2)+" "+(SVGy-diameter/2)+")")

        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)

        mySVG.removeAttribute('onclick')
        mySVG.style.cursor = ""
        mySVG.setAttribute("onmousedown", "startDragGauge(evt)")
        mySVG.setAttribute("onmousemove", "dragGauge(evt)")
        mySVG.setAttribute("onmouseup", "endDragGauge(evt)")




        cw.drawGaugeCancelButton.disabled = false
        cw.drawGaugeFinishButton.disabled = false
                   cw.drawGaugeBotButton.disabled=false

}




function finishDrawGauge()
{

    if(EditGauge==true )
        finishEditGauge()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemGaugeCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var id = "roundGauge"+new Date().getTime()



            var finishedElem = document.getElementById("activeElem").cloneNode(true)
           finishedElem.setAttribute("class", "hmiElem")
           finishedElem.setAttribute("id", id)
              CurrentHMIElem=finishedElem.cloneNode(true)
                  CurrentHMIElem.removeAttribute("cursor")
                //  CurrentHMIElem.removeAttribute("id")
                  CurrentHMIElem.removeAttribute("pointer-events")
                  CurrentHMIElem.removeAttribute("myScale")

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))



            mySVG.removeAttribute("onmousedown")
            mySVG.removeAttribute("onmousemove")
            mySVG.removeAttribute("onmouseup")

            finishedElem.setAttribute("onmousedown", "editGaugeDraw("+id+",evt)")
            finishedElem.setAttribute("onmousedown", "editGaugeDraw("+id+",evt)")


         domElemG.appendChild(finishedElem)




            ActiveElem = null
            activeElem = null

            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "plantGauge()") //---click to add more icons for this session---
            DrawX.style("display", "none")
            DragDot.style("visibility", "hidden")
            // topG.appendChild(dragDot)
           cw.drawGaugeFinishButton.disabled = true
           cw.drawGaugeCancelButton.disabled = true
                       cw.drawGaugeBotButton.disabled=true

           if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }


        }
}

function cancelDrawGauge()
{
    var cw = addElemGaugeCw
    if(EditGauge==true)
        cancelEditGauge()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "plantGauge()") //---click to add more icons for this session---

            cw.drawGaugeFinishButton.disabled = true
            cw.drawGaugeCancelButton.disabled = true
            cw.drawGaugeBotButton.disabled=true
            coverOff()

        }

        cw.drawGaugeCancelButton.style.borderColor = ""

}

//====================edit/update GAUGE===============================

var EditGauge = false
var DrawGaugeEditId
var EditThisGauge
//--mousedown/right button on GAUGE---
function editGaugeDraw(elemObjEdit, evt)
{

    var isRightMB;
    evt = window.event;
    if ("which" in evt) // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = evt.which == 3;
    else if ("button" in evt) // IE, Opera
        isRightMB = evt.button == 2;

    if(isRightMB&&DrawGauge==false&&ZoomDrawing==false)
    {

        EditThisGauge = elemObjEdit

        DrawGaugeEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditGauge = true
        if(addElemGaugeLoad==false)
        {
            openIframe("AddElem", "addElemGauge", 10)

        }
        else if(addElemGaugeViz==false)
        {
            openIframe("AddElem", "addElemGauge", 10)
            setEditGauge()
        }
        else
            setEditGauge()

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

        ZoomDraggedElems.push([dragTarget,"editGaugeDraw("+dragTarget.id+",evt)",classed])
    }

}
//---after iframe loaded see sendSize() at addElemGauge.htm---
var EditGaugeObj
function setEditGauge()
{
    coverOn()

    var cw = addElemGaugeCw

    var elemObjEdit = document.getElementById(DrawGaugeEditId)

    EditGaugeObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditGaugeObj.setAttribute("id", "activeElem")
    EditGaugeObj.setAttribute("class", "dragTargetObj")
    EditGaugeObj.removeAttribute("onmousedown")

    // EditGaugeObj.style.cursor = "move"

    domActiveElemG.insertBefore(EditGaugeObj, domActiveElemG.firstChild)
    ActiveElem = d3.select("#activeElem")
    activeElem = document.getElementById("activeElem")

    cw.drawGaugeDeleteButton.style.visibility = "visible"
        cw.drawGaugeTopButton.style.visibility = "visible"
        cw.drawGaugeBotButton.style.visibility = "visible"
  cw.drawGaugeEditSpan.innerHTML = "Edit Gauge"
    cw.containerDiv.style.backgroundColor = "orange"
   cw.editGaugePreviewButton.style.visibility = "visible"
    //domActiveElemG.setAttribute("transform", activeElem.getAttribute("transform"))
    //activeElem.removeAttribute("transform")
    cw.drawGaugeCancelButton.disabled = false
    cw.drawGaugeFinishButton.disabled = false
                cw.drawGaugeBotButton.disabled=false


            var matrix = activeElem.transform.baseVal.consolidate().matrix;


                    var transX=matrix.e
                    var transY=matrix.f


            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", "translate("+matrix.e+","+matrix.f+")")


            //---change settings to match element---
            var name=ActiveElem.attr("name")
            var label=ActiveElem.attr("label")
            var min=ActiveElem.attr("min")
            var max=ActiveElem.attr("max")
            var majorTicks=ActiveElem.attr("majorTicks")
            var minorTicks=ActiveElem.attr("minorTicks")
            var ringColor=ActiveElem.attr("ringColor")
            var faceColor=ActiveElem.attr("faceColor")
            var diameter=ActiveElem.attr("diameter")
            var orangeZoneRange=ActiveElem.attr("orangeZoneRange")
            var redZoneRange=ActiveElem.attr("redZoneRange")
            var greenZoneRange=ActiveElem.attr("greenZoneRange")
            var units=ActiveElem.attr("units")
            cw.gaugeNameValue.value=name
            cw.gaugeLabelValue.value=label
            cw.gaugeMinValue.value=min
            cw.gaugeMaxValue.value=max
            cw.gaugeMajorTickValue.value=majorTicks
            cw.gaugeMinorTickValue.value=minorTicks
            for(var k=0;k<cw.ringColorSelect.options.length;k++)
            {
                color=cw.ringColorSelect.options[k].value
                if(color==ringColor)
                {
                    cw.ringColorSelect.selectedIndex=k
                   cw.ringColorBg.style.background=ringColor
                    break
                }
            }
            for(var k=0;k<cw.faceColorGaugeSelect.options.length;k++)
            {
                color=cw.faceColorGaugeSelect.options[k].value
                if(color==faceColor)
                {
                    cw.faceColorGaugeSelect.selectedIndex=k
                   cw.faceColorBg.style.background=faceColor
                    break
                }
            }
           cw.gaugeDiaValue.value=diameter
            cw.gaugeOrangeZoneValue.value=orangeZoneRange
            cw.gaugeRedZoneValue.value=redZoneRange
            cw.gaugeGreenZoneValue.value=greenZoneRange
            cw.gaugeUnitValue.value=units

            //--place dragDot----
            setGaugeEditDrag()

            mySVG.style.cursor = ""

}

function setGaugeEditDrag()
{


    activeElem.removeAttribute("onmousedown")

    mySVG.setAttribute("onmousedown", "startDragGauge(evt)")
    mySVG.setAttribute("onmousemove", "dragGauge(evt)")
    mySVG.setAttribute("onmouseup", "endDragGauge(evt)")
    ActiveElem.style("cursor", "move")

}
function editGaugePreviewDrawGauge()
{

    var cw = addElemGaugeCw
    var matrix = activeElem.transform.baseVal.consolidate().matrix;
    var transX=matrix.e
    var transY=matrix.f
    domActiveElemG.removeChild(activeElem)

    activeElem=document.createElementNS(NS,"g")
    activeElem.setAttribute("id", "activeElem")
    domActiveElemG.appendChild(activeElem)

      var name=cw.gaugeNameValue.value
     var label=cw.gaugeLabelValue.value
      var min=+cw.gaugeMinValue.value
       var max=+cw.gaugeMaxValue.value
       var majorTicks=+cw.gaugeMajorTickValue.value
       var minorTicks=+cw.gaugeMinorTickValue.value
       var ringColor=cw.ringColorSelect.options[cw.ringColorSelect.selectedIndex].value
       var faceColor=cw.faceColorGaugeSelect.options[cw.faceColorGaugeSelect.selectedIndex].value
       var diameter=+cw.gaugeDiaValue.value
       var orangeZoneRange=cw.gaugeOrangeZoneValue.value
        if(orangeZoneRange=="")
         orangeZoneRange=null
       var redZoneRange=cw.gaugeRedZoneValue.value
        if(redZoneRange=="")
         redZoneRange=null


       var greenZoneRange=cw.gaugeGreenZoneValue.value
        if(greenZoneRange=="")
         greenZoneRange=null


       var units=cw.gaugeUnitValue.value


        createGauge(name, label, min, max,majorTicks,minorTicks,ringColor,faceColor,diameter,orangeZoneRange,redZoneRange,greenZoneRange,units)



    ActiveElem = d3.select("#activeElem")
      ActiveElem.attr("name",name)
      ActiveElem.attr("label",label)
      ActiveElem.attr("min",min)
      ActiveElem.attr("max",max)
      ActiveElem.attr("majorTicks",majorTicks)
      ActiveElem.attr("minorTicks",minorTicks)
      ActiveElem.attr("ringColor",ringColor)
      ActiveElem.attr("faceColor",faceColor)
      ActiveElem.attr("diameter",diameter)
      ActiveElem.attr("orangeZoneRange",orangeZoneRange)
      ActiveElem.attr("redZoneRange",redZoneRange)
      ActiveElem.attr("greenZoneRange",greenZoneRange)
      ActiveElem.attr("units",units)


        activeElem.setAttribute("transform", "translate("+(transX)+" "+(transY)+")")

        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)



}
function finishEditGauge()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemGaugeCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
          finishedElem.setAttribute("class", "hmiElem")
          finishedElem.setAttribute("id", DrawGaugeEditId)

                        CurrentHMIElem=finishedElem.cloneNode(true)
                  CurrentHMIElem.removeAttribute("cursor")
                //  CurrentHMIElem.removeAttribute("id")
                  CurrentHMIElem.removeAttribute("pointer-events")
                  CurrentHMIElem.removeAttribute("myScale")





        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("onmousedown", "editGaugeDraw("+DrawGaugeEditId+",evt)")
        finishedElem.setAttribute("id", DrawGaugeEditId)
        domElemG.insertBefore(finishedElem, EditThisGauge)
        domElemG.removeChild(EditThisGauge)

      if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }
    }

    closeDrawGauge()
}

function resetEditGauge()
{

    var cw = addElemGaugeCw

    document.getElementById(DrawGaugeEditId).setAttribute("opacity", 1)

    EditGauge = false
    cw.drawGaugeEditSpan.innerText = "Draw Gauges"
    cw.drawGaugeTopTable.style.backgroundColor = "Draw Gauges"
    ActiveElem = null
    activeElem = null

    DrawX.style("display", "none")
    DrawX.attr("stroke", "violet")
    DragDot.style("visibility", "hidden")

    cw.drawGaugeDeleteButton.style.visibility = "hidden"
        cw.drawGaugeTopButton.style.visibility = "hidden"
        cw.drawGaugeBotButton.style.visibility = "hidden"
    cw.drawGaugeCancelButton.disabled = false
    cw.drawGaugeFinishButton.disabled = false
    DrawGauge = true
    mySVG.setAttribute('onclick', "plantGauge()")

}

function cancelEditGauge()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawGaugeEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null
    ActiveElem = null

    closeDrawGauge()


}

//=======================delete circle==================
var GaugeDeleted = false
//---button---
function removeCurrentDrawGauge()
{

    domActiveElemG.removeChild(activeElem)
     var elemObjEdit = document.getElementById(DrawGaugeEditId)
     domElemG.removeChild(elemObjEdit)
    GaugeDeleted = true

    var cw = addElemGaugeCw

    closeDrawGauge()

}
//====================Top/Bot===================
function topDrawGauge()
{

    var elemObjEdit = document.getElementById(DrawGaugeEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawGaugeEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null

    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)

    closeDrawGauge()
}
function botDrawGauge()
{
    if(EditGauge)
    {
    var elemObjEdit = document.getElementById(DrawGaugeEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawGaugeEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null

    domElemG.removeChild(elemObjEdit)
    domElemG.insertBefore(finishedElem,domElemG.firstChild)

   closeDrawGauge()
   }
   else
   {
        finishDrawGauge()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }
}

function ringColorSelected()
{
    var cw = addElemGaugeCw
    var ringColor=cw.ringColorSelect.options[cw.ringColorSelect.selectedIndex].value
    cw.ringColorBg.style.background=ringColor
}
function faceColorGaugeSelected()
{

     var cw = addElemGaugeCw
    var faceColor=cw.faceColorGaugeSelect.options[cw.faceColorGaugeSelect.selectedIndex].value
    cw.faceColorBg.style.background=faceColor


}



