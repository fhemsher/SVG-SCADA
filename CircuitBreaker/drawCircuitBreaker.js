///---X button and iframe close all---
function closeDrawCircuitBreaker()
{
    if(addElemCircuitBreakerViz==true)
    {
        closeIframe("addElemCircuitBreaker");
        coverOff()
        
        var cw = addElemCircuitBreakerCw

        if(EditCircuitBreaker==true && CircuitBreakerDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawCircuitBreakerEditId)
            elemObjEdit.style.display = "inline"

            elemObjEdit.setAttribute("onmousedown", "editCircuitBreakerDraw("+DrawCircuitBreakerEditId+",evt)")

        }
        DraggingObj = false
        DrawCircuitBreaker = false
        EditCircuitBreaker = false
        CircuitBreakerDeleted = false

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

        cw.drawCircuitBreakerFinishCircuitBreaker.disabled = true
        cw.drawCircuitBreakerCancelCircuitBreaker.disabled = true
        cw.drawCircuitBreakerCancelCircuitBreaker.style.borderColor = ""
        cw.drawCircuitBreakerDeleteCircuitBreaker.style.visibility = "hidden"
                 cw.drawCircuitBreakerBotButton.disabled=true
        cw.drawCircuitBreakerTopButton.style.visibility = "hidden"
        cw.drawCircuitBreakerEditSpan.innerText = "Draw Circuit Breakers"
        cw.containerDiv.style.backgroundColor = "#ABCDEF"
        cw.adjustedRotateCircuitBreakerValue.value=0
        cw.drawCircuitBreakerScaleSelect.selectedIndex=2
    }
}

//---on add icon DrawX follows cursor
function trackDrawCircuitBreaker()
{
    var cw = addElemCircuitBreakerCw

    if(ActiveElem==null&&EditCircuitBreaker==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }
}

var EditCircuitBreaker = false
var DrawCircuitBreaker = false
var CircuitBreakerDeleted = false

function startCircuitBreakerDraw()
{
    var cw = addElemCircuitBreakerCw
    if(EditCircuitBreaker==false)
    {
        ActiveElem = null
        activeElem = null
        DrawCircuitBreaker = true
        DrawX.style("display", "inline")
        mySVG.setAttribute('onclick', "plantCircuitBreaker()") //---click to add more icons for this session---

    }

}

//--click on svg---
function plantCircuitBreaker()
{
    var cw = addElemCircuitBreakerCw
    coverOn()
    var scale=cw.drawCircuitBreakerScaleSelect.options[cw.drawCircuitBreakerScaleSelect.selectedIndex].value
    var status=cw.drawCircuitBreakerStatusSelect.options[cw.drawCircuitBreakerStatusSelect.selectedIndex].value



       activeElem=circuitBreakerG.cloneNode(true)
        var statusRect=activeElem.getElementsByTagName("rect")[0]
         var tripLine=activeElem.getElementsByTagName("line")[6]
     if(status=="on")
     {
       statusRect.setAttribute("fill","url(#radialGradientGreenCB)")
       tripLine.style.visibility="visible"
     }

     else
     {
        statusRect.setAttribute("fill","url(#radialGradientRedCB)")
        tripLine.style.visibility="hidden"
     }


     activeElem.setAttribute("id", "activeElem")
     activeElem.setAttribute("myScale", scale)
    ActiveElem = d3.select("#activeElem")

        var rotate= cw.adjustedRotateCircuitBreakerValue.value

        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")scale("+scale+")rotate("+rotate+")")

        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)
         domActiveElemG.appendChild(activeElem)

       //  drawCircuitBreakerStatusSelected()


        mySVG.removeAttribute('onclick')
        mySVG.style.cursor = ""
        mySVG.setAttribute("onmousedown", "startDragCircuitBreaker(evt)")
        mySVG.setAttribute("onmousemove", "dragCircuitBreaker(evt)")
        mySVG.setAttribute("onmouseup", "endDragCircuitBreaker(evt)")

        cw.drawCircuitBreakerCancelCircuitBreaker.disabled = false
        cw.drawCircuitBreakerFinishCircuitBreaker.disabled = false
                    cw.drawCircuitBreakerBotButton.disabled=false

}

function drawCircuitBreakerScaleSelected()
{
    if(ActiveElem)
    {
        var cw = addElemCircuitBreakerCw
         var scale=+cw.drawCircuitBreakerScaleSelect.options[cw.drawCircuitBreakerScaleSelect.selectedIndex].value
        var matrix = activeElem.transform.baseVal.consolidate().matrix;
        matrix.a=scale
        matrix.d=scale
        activeElem.transform.baseVal.consolidate().matrix;
    }

}

function drawCircuitBreakerStatusSelected()
{
    if(ActiveElem)
    {
      var cw = addElemCircuitBreakerCw
     var status=cw.drawCircuitBreakerStatusSelect.options[cw.drawCircuitBreakerStatusSelect.selectedIndex].value

         var statusRect=activeElem.getElementsByTagName("rect")[0]
         var tripLine=activeElem.getElementsByTagName("line")[6]
     if(status=="on")
     {
       statusRect.setAttribute("fill","url(#radialGradientGreenCB)")
       tripLine.style.visibility="visible"
     }

     else
     {
        statusRect.setAttribute("fill","url(#radialGradientRedCB)")
        tripLine.style.visibility="hidden"
     }




    }


}
function finishDrawCircuitBreaker()
{

    if(EditCircuitBreaker==true )
        finishEditCircuitBreaker()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemCircuitBreakerCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "circuitBreaker"+new Date().getTime()
             var scale=cw.drawCircuitBreakerScaleSelect.options[cw.drawCircuitBreakerScaleSelect.selectedIndex].value
            finishedElem.setAttribute("id", id)
             var status=cw.drawCircuitBreakerStatusSelect.options[cw.drawCircuitBreakerStatusSelect.selectedIndex].value
            finishedElem.setAttribute("myRotate",cw.adjustedRotateCircuitBreakerValue.value)
            finishedElem.setAttribute("myScale",scale)
            finishedElem.setAttribute("myStatus",status)
              finishedElem.setAttribute("class", "hmiElem")

                        CurrentHMIElem=finishedElem.cloneNode(true)


            mySVG.removeAttribute("onmousedown")
            mySVG.removeAttribute("onmousemove")
            mySVG.removeAttribute("onmouseup")

            finishedElem.setAttribute("onmousedown", "editCircuitBreakerDraw("+id+",evt)")
            domElemG.appendChild(finishedElem)




            ActiveElem = null
            activeElem = null

            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "plantCircuitBreaker()") //---click to add more icons for this session---
            DrawX.style("display", "none")
            DragDot.style("visibility", "hidden")
            // topG.appendChild(dragDot)
            cw.drawCircuitBreakerFinishCircuitBreaker.disabled = true
            cw.drawCircuitBreakerCancelCircuitBreaker.disabled = true
                       cw.drawCircuitBreakerBotButton.disabled=true
       if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }


        }
}

function cancelDrawCircuitBreaker()
{
    var cw = addElemCircuitBreakerCw
    if(EditCircuitBreaker==true)
        cancelEditCircuitBreaker()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "plantCircuitBreaker()") //---click to add more icons for this session---

            cw.drawCircuitBreakerFinishCircuitBreaker.disabled = true
            cw.drawCircuitBreakerCancelCircuitBreaker.disabled = true
            cw.drawCircuitBreakerBotButton.disabled=true
            coverOff()

        }

        cw.drawCircuitBreakerCancelCircuitBreaker.style.borderColor = ""

}

//====================edit/update circle===============================

var EditCircuitBreaker = false
var DrawCircuitBreakerEditId
var EditThisCircuitBreaker
//--mousedown/right button on circle---
function editCircuitBreakerDraw(elemObjEdit, evt)
{
    var isRightMB;
    evt = window.event;
    if ("which" in evt) // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = evt.which == 3;
    else if ("button" in evt) // IE, Opera
        isRightMB = evt.button == 2;

    if(isRightMB&&DrawCircuitBreaker==false&&ZoomDrawing==false )
    {

        EditThisCircuitBreaker = elemObjEdit

        DrawCircuitBreakerEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditCircuitBreaker = true
        if(addElemCircuitBreakerLoad==false)
        {
            openIframe("AddElem", "addElemCircuitBreaker", 10)

        }
        else if(addElemCircuitBreakerViz==false)
        {
            openIframe("AddElem", "addElemCircuitBreaker", 10)
            setEditCircuitBreaker()
        }
        else
            setEditCircuitBreaker()

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

        ZoomDraggedElems.push([dragTarget,"editCircuitBreakerDraw("+dragTarget.id+",evt)",classed])
    }

}
//---after iframe loaded see sendSize() at addElemCircuitBreaker.htm---
var EditCircuitBreakerObj
function setEditCircuitBreaker()
{
    coverOn()

    var cw = addElemCircuitBreakerCw

    var elemObjEdit = document.getElementById(DrawCircuitBreakerEditId)

    EditCircuitBreakerObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditCircuitBreakerObj.setAttribute("id", "activeElem")
    EditCircuitBreakerObj.setAttribute("class", "dragTargetObj")
    EditCircuitBreakerObj.removeAttribute("onmousedown")

    // EditCircuitBreakerObj.style.cursor = "move"

    domActiveElemG.insertBefore(EditCircuitBreakerObj, domActiveElemG.firstChild)
    ActiveElem = d3.select("#activeElem")
    activeElem = document.getElementById("activeElem")

    cw.drawCircuitBreakerDeleteCircuitBreaker.style.visibility = "visible"
    cw.drawCircuitBreakerEditSpan.innerHTML = "Edit Circuit Breaker"
    cw.containerDiv.style.backgroundColor = "orange"
        cw.drawCircuitBreakerBotButton.style.visibility = "visible"
        cw.drawCircuitBreakerTopButton.style.visibility = "visible"
                 cw.drawCircuitBreakerBotButton.disabled=false

    cw.drawCircuitBreakerCancelCircuitBreaker.disabled = false
    cw.drawCircuitBreakerFinishCircuitBreaker.disabled = false
    //---update selections---
    var myStatus=activeElem.getAttribute("myStatus")
    if(myStatus=="on")cw.drawCircuitBreakerStatusSelect.selectedIndex=0
    if(myStatus=="off")cw.drawCircuitBreakerStatusSelect.selectedIndex=1


     var myScale=+activeElem.getAttribute("myScale")
         cw.drawCircuitBreakerScaleSelect.selectedIndex=myScale*10-1


          var myRotate=activeElem.getAttribute("myRotate")
            cw.adjustedRotateCircuitBreakerValue.value=myRotate


                     var matrix = activeElem.getCTM()
             var scale=matrix.a
            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", "translate("+matrix.e+","+matrix.f+")")

            //--place dragDot----
            setCircuitBreakerEditDrag()

            mySVG.style.cursor = ""
           
}



function setCircuitBreakerEditDrag()
{


    activeElem.removeAttribute("onmousedown")

    mySVG.setAttribute("onmousedown", "startDragCircuitBreaker(evt)")
    mySVG.setAttribute("onmousemove", "dragCircuitBreaker(evt)")
    mySVG.setAttribute("onmouseup", "endDragCircuitBreaker(evt)")
    ActiveElem.style("cursor", "move")

}

function finishEditCircuitBreaker()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemCircuitBreakerCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "hmiElem")

        finishedElem.setAttribute("id", DrawCircuitBreakerEditId)
                    CurrentHMIElem=finishedElem.cloneNode(true)

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("onmousedown", "editCircuitBreakerDraw("+DrawCircuitBreakerEditId+",evt)")
        finishedElem.setAttribute("id", DrawCircuitBreakerEditId)
        domElemG.insertBefore(finishedElem, EditThisCircuitBreaker)
        domElemG.removeChild(EditThisCircuitBreaker)
       if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }


    }

    closeDrawCircuitBreaker()
}



function cancelEditCircuitBreaker()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawCircuitBreakerEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null
    ActiveElem = null

    closeDrawCircuitBreaker()


}

//=======================delete circle==================
var CircuitBreakerDeleted = false
//---button---
function removeCurrentDrawCircuitBreaker()
{

    domActiveElemG.removeChild(activeElem)
     var elemObjEdit = document.getElementById(DrawCircuitBreakerEditId)
     domElemG.removeChild(elemObjEdit)
    CircuitBreakerDeleted = true

    var cw = addElemCircuitBreakerCw

    closeDrawCircuitBreaker()

}
//====================Top/Bot===================
function topDrawCircuitBreaker()
{

    var elemObjEdit = document.getElementById(DrawCircuitBreakerEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawCircuitBreakerEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null

    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)

    closeDrawCircuitBreaker()
}
function botDrawCircuitBreaker()
{
    if(EditCircuitBreaker)
    {
    var elemObjEdit = document.getElementById(DrawCircuitBreakerEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawCircuitBreakerEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null

    domElemG.removeChild(elemObjEdit)
    domElemG.insertBefore(finishedElem,domElemG.firstChild)

   closeDrawCircuitBreaker()
   }
   else
   {
        finishDrawCircuitBreaker()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }
}


function rotateCircuitBreakerAdjust(factor)
{
    var cw = addElemCircuitBreakerCw
    var mult = parseFloat(cw.rotateDrawCircuitBreakerAdjustSelect.options[cw.rotateDrawCircuitBreakerAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotateCircuitBreakerValue.value = rotateAdd+parseFloat(cw.adjustedRotateCircuitBreakerValue.value)

    if(ActiveElem)
    {
        rote("activeElem", rotateAdd)
        rote("domDrawX", rotateAdd)
    }
}

