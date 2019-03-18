







///---X button and iframe close all---
function closeDrawTrendGauge()
{
    if(addElemTrendGaugeViz==true)
    {
        closeIframe("addElemTrendGauge");
        coverOff()

        var cw = addElemTrendGaugeCw

        if(EditTrendGauge==true && TrendGaugeDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawTrendGaugeEditId)
            elemObjEdit.style.display = "inline"

            elemObjEdit.setAttribute("onmousedown", "editTrendGaugeDraw("+DrawTrendGaugeEditId+",evt)")

        }
        DraggingObj = false
        DrawTrendGauge = false
        EditTrendGauge = false
        TrendGaugeDeleted = false

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

        cw.drawTrendGaugeFinishButton.disabled = false
        cw.drawTrendGaugeCancelButton.disabled = false
        cw.drawTrendGaugeCancelButton.style.borderColor = ""
        cw.drawTrendGaugeDeleteButton.style.visibility = "hidden"
        cw.drawTrendGaugeTopButton.style.visibility = "hidden"

            cw.drawTrendGaugeBotButton.disabled=true
        cw.drawTrendGaugeEditSpan.innerText = "Draw TrendGauges"
        cw.containerDiv.style.backgroundColor = "#ABCDEF"

       cw.previewTrendGaugeButton.disabled = true

    }
}

//---on add icon DrawX follows cursor
function trackDrawTrendGauge()
{


    if(ActiveElem==null&&EditGauge==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }
}

var EditTrendGauge = false
var DrawTrendGauge = false
var TrendGaugeDeleted = false

function startTrendGaugeDraw()
{
    var cw = addElemTrendGaugeCw
     elemSizeDiv.innerHTML="r = <input id=drawTrendGaugeRadiusValue type='text' style='width:30px;border=0' /> "
    if(EditTrendGauge==false)
    {
        ActiveElem = null
        activeElem = null
        DrawTrendGauge = true
        DrawX.style("display", "inline")
        mySVG.setAttribute('onclick', "plantTrendGauge()") //---click to add more icons for this session---

    }

}

//--click on svg---
function plantTrendGauge()
{
    var cw = addElemTrendGaugeCw
    coverOn()

      activeElem=document.createElementNS(NS,"g")
     activeElem.setAttribute("id", "activeElem")
      domActiveElemG.appendChild(activeElem)


        var title=cw.trendGaugeTitleValue.value
        var unit=cw.trendGaugeUnitValue.value
      var min=+cw.trendGaugeMinValue.value
       var max=+cw.trendGaugeMaxValue.value
      var width=+cw.trendGaugeWidthValue.value
       var height=+cw.trendGaugeHeightValue.value





       var ringColor=cw.trendGaugeRingColorSelect.options[cw.trendGaugeRingColorSelect.selectedIndex].value
       var faceColor=cw.trendGaugeFaceColorSelect.options[cw.trendGaugeFaceColorSelect.selectedIndex].value

       if(cw.trendGaugeSetpointCheck.checked)
            var setPoint=+cw.trendGaugeSetpointValue.value
       else
            var setPoint=false

       if(cw.trendGaugeMinErrorCheck.checked)
            var minErrorBand=+cw.trendGaugeMinErrorBandValue.value/100
       else
            var minErrorBand=false

       if(cw.trendGaugeMaxErrorCheck.checked)
            var maxErrorBand=+cw.trendGaugeMaxErrorBandValue.value/100
       else
            var maxErrorBand=false
            console.log(maxErrorBand)

buildTrendGauge(title,unit,10,min,max,minErrorBand,maxErrorBand,width,height,ringColor,faceColor,setPoint)










        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)




        mySVG.removeAttribute('onclick')
        mySVG.style.cursor = ""
        mySVG.setAttribute("onmousedown", "startDragTrendGauge(evt)")
        mySVG.setAttribute("onmousemove", "dragTrendGauge(evt)")
        mySVG.setAttribute("onmouseup", "endDragTrendGauge(evt)")



          cw.previewTrendGaugeButton.disabled = false
        cw.drawTrendGaugeCancelButton.disabled = false
        cw.drawTrendGaugeFinishButton.disabled = false
            cw.drawTrendGaugeBotButton.disabled=false

}




function finishDrawTrendGauge()
{

    if(EditTrendGauge==true )
        finishEditTrendGauge()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemTrendGaugeCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "trendGauge"+new Date().getTime()

            finishedElem.setAttribute("id", id)
             finishedElem.setAttribute("class", "hmiElem")
            CurrentHMIElem=finishedElem.cloneNode(true)

            mySVG.removeAttribute("onmousedown")
            mySVG.removeAttribute("onmousemove")
            mySVG.removeAttribute("onmouseup")

            finishedElem.setAttribute("onmousedown", "editTrendGaugeDraw("+id+",evt)")



         domElemG.appendChild(finishedElem)




            ActiveElem = null
            activeElem = null

            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "plantTrendGauge()") //---click to add more icons for this session---
            DrawX.style("display", "none")
            DragDot.style("visibility", "hidden")
            // topG.appendChild(dragDot)
            cw.drawTrendGaugeFinishButton.disabled = true
           cw.drawTrendGaugeCancelButton.disabled = true
                       cw.drawTrendGaugeBotButton.disabled=true

            if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }



        }
}

function cancelDrawTrendGauge()
{
    var cw = addElemTrendGaugeCw
    if(EditTrendGauge==true)
        cancelEditTrendGauge()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "plantTrendGauge()") //---click to add more icons for this session---

            cw.drawTrendGaugeFinishButton.disabled = true
            cw.drawTrendGaugeCancelButton.disabled = true
            cw.drawTrendGaugeBotButton.disabled=true
            coverOff()

        }

        cw.drawTrendGaugeCancelButton.style.borderColor = ""

}

//====================edit/update GAUGE===============================

var EditTrendGauge = false
var DrawTrendGaugeEditId
var EditThisTrendGauge
//--mousedown/right button on GAUGE---
function editTrendGaugeDraw(elemObjEdit, evt)
{
    var isRightMB;
    evt = window.event;
    if ("which" in evt) // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = evt.which == 3;
    else if ("button" in evt) // IE, Opera
        isRightMB = evt.button == 2;

    if(isRightMB&&DrawTrendGauge==false&&ZoomDrawing==false)
    {

        EditThisTrendGauge = elemObjEdit

        DrawTrendGaugeEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditTrendGauge = true
        if(addElemTrendGaugeLoad==false)
        {
            openIframe("AddElem", "addElemTrendGauge", 10)

        }
        else if(addElemTrendGaugeViz==false)
        {
            openIframe("AddElem", "addElemTrendGauge", 10)
            setEditTrendGauge()
        }
        else
            setEditTrendGauge()

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

        ZoomDraggedElems.push([dragTarget,"editTrendGaugeDraw("+dragTarget.id+",evt)",classed])
    }
}
//---after iframe loaded see sendSize() at addElemTrendGauge.htm---
var EditTrendGaugeObj
function setEditTrendGauge()
{
    coverOn()

    var cw = addElemTrendGaugeCw

    var elemObjEdit = document.getElementById(DrawTrendGaugeEditId)

    EditTrendGaugeObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditTrendGaugeObj.setAttribute("id", "activeElem")
    EditTrendGaugeObj.setAttribute("class", "dragTargetObj")
    EditTrendGaugeObj.removeAttribute("onmousedown")

    // EditTrendGaugeObj.style.cursor = "move"

    domActiveElemG.insertBefore(EditTrendGaugeObj, domActiveElemG.firstChild)
    ActiveElem = d3.select("#activeElem")
    activeElem = document.getElementById("activeElem")

    cw.drawTrendGaugeDeleteButton.style.visibility = "visible"
        cw.drawTrendGaugeTopButton.style.visibility = "visible"
        cw.drawTrendGaugeBotButton.style.visibility = "visible"
  cw.drawTrendGaugeEditSpan.innerHTML = "Edit Trend Gauge"
    cw.containerDiv.style.backgroundColor = "orange"
    cw.previewTrendGaugeButton.disabled = false
    //domActiveElemG.setAttribute("transform", activeElem.getAttribute("transform"))
    //activeElem.removeAttribute("transform")
    cw.drawTrendGaugeCancelButton.disabled = false
    cw.drawTrendGaugeFinishButton.disabled = false
            cw.drawTrendGaugeBotButton.disabled=false


            var matrix = activeElem.transform.baseVal.consolidate().matrix;


                    var transX=matrix.e
                    var transY=matrix.f


            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", "translate("+matrix.e+","+matrix.f+")")


            var title=ActiveElem.attr("title")
            var unit=ActiveElem.attr("unit")
            var min=ActiveElem.attr("min")
            var max=ActiveElem.attr("max")
            var minErrorBand=ActiveElem.attr("minErrorBand")
            var maxErrorBand=ActiveElem.attr("maxErrorBand")
            var width=ActiveElem.attr("width")
            var height=ActiveElem.attr("height")
            var ringColor=ActiveElem.attr("ringColor")
            var faceColor=ActiveElem.attr("faceColor")
            var setPoint=ActiveElem.attr("setPoint")

                 cw.trendGaugeTitleValue.value=title
                 cw.trendGaugeUnitValue.value=unit
                 cw.trendGaugeMinValue.value=min
                 cw.trendGaugeMaxValue.value=max
                 cw.trendGaugeWidthValue.value=width
                cw.trendGaugeHeightValue.value=height


            for(var k=0;k<cw.trendGaugeRingColorSelect.options.length;k++)
            {
                color=cw.trendGaugeRingColorSelect.options[k].value
                if(color==ringColor)
                {
                    cw.trendGaugeRingColorSelect.selectedIndex=k
                   cw.trendGaugeRingColorBg.style.background=ringColor
                    break
                }
            }
            for(var k=0;k<cw.trendGaugeFaceColorSelect.options.length;k++)
            {
                color=cw.trendGaugeFaceColorSelect.options[k].value
                if(color==faceColor)
                {
                    cw.trendGaugeFaceColorSelect.selectedIndex=k
                   cw.trendGaugeFaceColorBg.style.background=faceColor
                    break
                }
            }

                if(setPoint=="false")
                {
                  cw.trendGaugeSetpointCheck.checked=false
                  cw.trendGaugeSetpointValue.value =""
                }
                else
                {
                   cw.trendGaugeSetpointCheck.checked=true
                  cw.trendGaugeSetpointValue.value =setPoint
                }

                if(minErrorBand=="false")
                {
                  cw.trendGaugeMinErrorCheck.checked=false
                 cw.trendGaugeMinErrorBandValue.value=""
                }
                else
                {
                  cw.trendGaugeMinErrorCheck.checked=true
                 cw.trendGaugeMinErrorBandValue.value=+minErrorBand*100
                }


                if(maxErrorBand=="false")
                {
                  cw.trendGaugeMaxErrorCheck.checked=false
                 cw.trendGaugeMaxErrorBandValue.value=""
                }
                else
                {
                  cw.trendGaugeMaxErrorCheck.checked=true
                 cw.trendGaugeMaxErrorBandValue.value=+maxErrorBand*100
                }



            //--place dragDot----
            setTrendGaugeEditDrag()

            mySVG.style.cursor = ""

}

function setTrendGaugeEditDrag()
{


    activeElem.removeAttribute("onmousedown")

    mySVG.setAttribute("onmousedown", "startDragTrendGauge(evt)")
    mySVG.setAttribute("onmousemove", "dragTrendGauge(evt)")
    mySVG.setAttribute("onmouseup", "endDragTrendGauge(evt)")
    ActiveElem.style("cursor", "move")

}
function previewDrawTrendGauge()
{

    var cw = addElemTrendGaugeCw
    var matrix = activeElem.transform.baseVal.consolidate().matrix;
    var transX=matrix.e
    var transY=matrix.f
    domActiveElemG.removeChild(activeElem)
            plantTrendGauge()
     activeElem.setAttribute("transform", "translate("+(transX)+" "+(transY)+")")
/*
    activeElem=document.createElementNS(NS,"g")
    activeElem.setAttribute("id", "activeElem")
    domActiveElemG.appendChild(activeElem)


      var title=cw.trendGaugeTitleValue.value
        var unit=cw.trendGaugeUnitValue.value
      var min=+cw.trendGaugeMinValue.value
       var max=+cw.trendGaugeMaxValue.value
      var width=+cw.trendGaugeWidthValue.value
       var height=+cw.trendGaugeHeightValue.value





       var ringColor=cw.trendGaugeRingColorSelect.options[cw.trendGaugeRingColorSelect.selectedIndex].value
       var faceColor=cw.trendGaugeFaceColorSelect.options[cw.trendGaugeFaceColorSelect.selectedIndex].value

       if(cw.trendGaugeSetpointCheck.checked)
            var setPoint=+cw.trendGaugeSetpointValue.value
       else
            var setPoint=false

       if(cw.trendGaugeMinErrorCheck.checked)
            var minErrorBand=+cw.trendGaugeMinErrorBandValue.value/100
       else
            var minErrorBand=false

       if(cw.trendGaugeMaxErrorCheck.checked)
            var maxErrorBand=+cw.trendGaugeMaxErrorBandValue.value/100
       else
            var maxErrorBand=false


       buildTrendGauge(title,unit,10,min,max,minErrorBand,maxErrorBand,width,height,ringColor,faceColor,setPoint)



        activeElem.setAttribute("transform", "translate("+(transX)+" "+(transY)+")")

        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)

   */

}
function finishEditTrendGauge()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemTrendGaugeCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "hmiElem")

        finishedElem.setAttribute("id", DrawTrendGaugeEditId)
          CurrentHMIElem=finishedElem.cloneNode(true)
        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("onmousedown", "editTrendGaugeDraw("+DrawTrendGaugeEditId+",evt)")
        finishedElem.setAttribute("id", DrawTrendGaugeEditId)
        domElemG.insertBefore(finishedElem, EditThisTrendGauge)
        domElemG.removeChild(EditThisTrendGauge)

              if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }

    }

    closeDrawTrendGauge()
}

function resetEditTrendGauge()
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
var TrendGaugeDeleted = false
//---button---
function removeCurrentDrawTrendGauge()
{

    domActiveElemG.removeChild(activeElem)
     var elemObjEdit = document.getElementById(DrawTrendGaugeEditId)
     domElemG.removeChild(elemObjEdit)
    TrendGaugeDeleted = true



    closeDrawTrendGauge()

}
//====================Top/Bot===================
function topDrawTrendGauge()
{

    var elemObjEdit = document.getElementById(DrawTrendGaugeEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawTrendGaugeEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null

    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)

    closeDrawTrendGauge()
}
function botDrawTrendGauge()
{
    if(EditTrendGauge)
    {
    var elemObjEdit = document.getElementById(DrawTrendGaugeEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawTrendGaugeEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null

    domElemG.removeChild(elemObjEdit)
    domElemG.insertBefore(finishedElem,domElemG.firstChild)

   closeDrawTrendGauge()
   }
   else
   {
        finishDrawTrendGauge()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }
}

function trendGaugeRingColorSelected()
{
    var cw = addElemTrendGaugeCw
    var ringColor=cw.trendGaugeRingColorSelect.options[cw.trendGaugeRingColorSelect.selectedIndex].value
    cw.trendGaugeRingColorBg.style.background=ringColor
}
function trendGaugeFaceColorSelected()
{

     var cw = addElemTrendGaugeCw
    var faceColor=cw.trendGaugeFaceColorSelect.options[cw.trendGaugeFaceColorSelect.selectedIndex].value
    cw.trendGaugeFaceColorBg.style.background=faceColor


}


