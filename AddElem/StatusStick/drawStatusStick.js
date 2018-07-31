///---X button and iframe close all---
function closeDrawStatusStick()
{
    if(addElemStatusStickViz==true)
    {
        closeIframe("addElemStatusStick");
        coverOff()
        
        var cw = addElemStatusStickCw

        if(EditStatusStick==true && StatusStickDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawStatusStickEditId)
            elemObjEdit.style.display = "inline"

            elemObjEdit.setAttribute("onmousedown", "editStatusStickDraw("+DrawStatusStickEditId+",evt)")

        }
        DraggingObj = false
        DrawStatusStick = false
        EditStatusStick = false
        StatusStickDeleted = false

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

        cw.drawStatusStickFinishButton.disabled = true
        cw.drawStatusStickCancelButton.disabled = true
        cw.drawStatusStickCancelButton.style.borderColor = ""
        cw.drawStatusStickDeleteButton.style.visibility = "hidden"
        cw.drawStatusStickTopButton.style.visibility = "hidden"

            cw.drawStatusStickBotButton.disabled=true
        cw.drawStatusStickEditSpan.innerText = "Draw Status Sticks"
        cw.containerDiv.style.backgroundColor = "#ABCDEF"
        cw.adjustedRotateStatusStickValue.value=0
        cw.drawStatusStickScaleSelect.selectedIndex=2
    }
}

//---on add icon DrawX follows cursor
function trackDrawStatusStick()
{
    var cw = addElemStatusStickCw

    if(ActiveElem==null&&EditStatusStick==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }
}

var EditStatusStick = false
var DrawStatusStick = false
var StatusStickDeleted = false

function startStatusStickDraw()
{
    var cw = addElemStatusStickCw
    if(EditStatusStick==false)
    {
        ActiveElem = null
        activeElem = null
        DrawStatusStick = true
        DrawX.style("display", "inline")
        mySVG.setAttribute('onclick', "plantStatusStick()") //---click to add more icons for this session---

    }

}

//--click on svg---
function plantStatusStick()
{
    var cw = addElemStatusStickCw
    coverOn()
    var scale=cw.drawStatusStickScaleSelect.options[cw.drawStatusStickScaleSelect.selectedIndex].value
    activeElem=statusStickG.cloneNode(true)




     activeElem.setAttribute("id", "activeElem")
     activeElem.setAttribute("myScale", scale)
    ActiveElem = d3.select("#activeElem")

        var rotate= cw.adjustedRotateStatusStickValue.value

        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")scale("+scale+")rotate("+rotate+")")

        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)
         domActiveElemG.appendChild(activeElem)

         drawStatusStickStatusSelected()


        mySVG.removeAttribute('onclick')
        mySVG.style.cursor = ""
        mySVG.setAttribute("onmousedown", "startDragStatusStick(evt)")
        mySVG.setAttribute("onmousemove", "dragStatusStick(evt)")
        mySVG.setAttribute("onmouseup", "endDragStatusStick(evt)")

        cw.drawStatusStickCancelButton.disabled = false
        cw.drawStatusStickFinishButton.disabled = false
            cw.drawStatusStickBotButton.disabled=false

}

function drawStatusStickScaleSelected()
{
    if(ActiveElem)
    {
        var cw = addElemStatusStickCw
         var scale=+cw.drawStatusStickScaleSelect.options[cw.drawStatusStickScaleSelect.selectedIndex].value
        var matrix = activeElem.transform.baseVal.consolidate().matrix;
        matrix.a=scale
        matrix.d=scale
        activeElem.transform.baseVal.consolidate().matrix;
    }

}

function drawStatusStickStatusSelected()
{
    if(ActiveElem)
    {
      var cw = addElemStatusStickCw
     var status=cw.drawStatusStickStatusSelect.options[cw.drawStatusStickStatusSelect.selectedIndex].value
      activeElem.setAttribute("myStatus",status)



        var gz=activeElem.getElementsByTagName("g")

        var onPl=gz[0]
        var alarmPl=gz[1]
        var intermittentPl=gz[2]
        var defectivePl=gz[3]
        var normalOffPl=gz[4]
        onPl.setAttribute("opacity",.25)
        onPl.setAttribute("transform","translate(0,-100)scale(20)")
        alarmPl.setAttribute("opacity",.25)
        alarmPl.setAttribute("transform","translate(0,-50)scale(20)")
        intermittentPl.setAttribute("opacity",.25)
        intermittentPl.setAttribute("transform","translate(0,0)scale(20)")
        defectivePl.setAttribute("opacity",.25)
        defectivePl.setAttribute("transform","translate(0,50)scale(20)")
        normalOffPl.setAttribute("opacity",.25)
        normalOffPl.setAttribute("transform","translate(0,100)scale(20)")

        if(status=="on")
        {
            onPl.removeAttribute("opacity")
     var matrix = onPl.transform.baseVal.consolidate().matrix;
        matrix.a=24
        matrix.d=24
        onPl.transform.baseVal.consolidate().matrix;        }
        if(status=="alarm")
        {
            alarmPl.removeAttribute("opacity")
     var matrix = alarmPl.transform.baseVal.consolidate().matrix;
        matrix.a=24
        matrix.d=24
        alarmPl.transform.baseVal.consolidate().matrix;        }
        if(status=="intermittent")
        {
            intermittentPl.removeAttribute("opacity")
     var matrix = intermittentPl.transform.baseVal.consolidate().matrix;
        matrix.a=24
        matrix.d=24
        intermittentPl.transform.baseVal.consolidate().matrix;        }
        if(status=="defective")
        {
            defectivePl.removeAttribute("opacity")
     var matrix = defectivePl.transform.baseVal.consolidate().matrix;
        matrix.a=24
        matrix.d=24
        defectivePl.transform.baseVal.consolidate().matrix;        }
        if(status=="normalOff")
        {
            normalOffPl.removeAttribute("opacity")
     var matrix = normalOffPl.transform.baseVal.consolidate().matrix;
        matrix.a=24
        matrix.d=24
        normalOffPl.transform.baseVal.consolidate().matrix;        }

    }


}
function finishDrawStatusStick()
{

    if(EditStatusStick==true )
        finishEditStatusStick()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemStatusStickCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "pilotLight"+new Date().getTime()
             var scale=cw.drawStatusStickScaleSelect.options[cw.drawStatusStickScaleSelect.selectedIndex].value
            finishedElem.setAttribute("id", id)
            finishedElem.setAttribute("myRotate",cw.adjustedRotateStatusStickValue.value)
            finishedElem.setAttribute("myScale",scale)
             finishedElem.setAttribute("class", "hmiElem")
                        CurrentHMIElem=finishedElem.cloneNode(true)



            mySVG.removeAttribute("onmousedown")
            mySVG.removeAttribute("onmousemove")
            mySVG.removeAttribute("onmouseup")

            finishedElem.setAttribute("onmousedown", "editStatusStickDraw("+id+",evt)")
            domElemG.appendChild(finishedElem)




            ActiveElem = null
            activeElem = null

            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "plantStatusStick()") //---click to add more icons for this session---
            DrawX.style("display", "none")
            DragDot.style("visibility", "hidden")
            // topG.appendChild(dragDot)
            cw.drawStatusStickFinishButton.disabled = true
            cw.drawStatusStickCancelButton.disabled = true
            cw.drawStatusStickBotButton.disabled=true
       if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }


        }
}

function cancelDrawStatusStick()
{
    var cw = addElemStatusStickCw
    if(EditStatusStick==true)
        cancelEditStatusStick()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "plantStatusStick()") //---click to add more icons for this session---

            cw.drawStatusStickFinishButton.disabled = true
            cw.drawStatusStickCancelButton.disabled = true
            cw.drawStatusStickBotButton.disabled=true
            coverOff()

        }

        cw.drawStatusStickCancelButton.style.borderColor = ""

}

//====================edit/update circle===============================

var EditStatusStick = false
var DrawStatusStickEditId
var EditThisStatusStick
//--mousedown/right button on circle---
function editStatusStickDraw(elemObjEdit, evt)
{

   var isRightMB;
    evt = window.event;
    if ("which" in evt) // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = evt.which == 3;
    else if ("button" in evt) // IE, Opera
        isRightMB = evt.button == 2;

    if(isRightMB&&DrawStatusStick==false&&ZoomDrawing==false)
    {

        EditThisStatusStick = elemObjEdit

        DrawStatusStickEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditStatusStick = true
        if(addElemStatusStickLoad==false)
        {
            openIframe("AddElem", "addElemStatusStick", 10)

        }
        else if(addElemStatusStickViz==false)
        {
            openIframe("AddElem", "addElemStatusStick", 10)
            setEditStatusStick()
        }
        else
            setEditStatusStick()

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

        ZoomDraggedElems.push([dragTarget,"editStatusStickDraw("+dragTarget.id+",evt)",classed])
    }

}
//---after iframe loaded see sendSize() at addElemStatusStick.htm---
var EditStatusStickObj
function setEditStatusStick()
{
    coverOn()

    var cw = addElemStatusStickCw

    var elemObjEdit = document.getElementById(DrawStatusStickEditId)

    EditStatusStickObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditStatusStickObj.setAttribute("id", "activeElem")
    EditStatusStickObj.setAttribute("class", "dragTargetObj")
    EditStatusStickObj.removeAttribute("onmousedown")

    // EditStatusStickObj.style.cursor = "move"

    domActiveElemG.insertBefore(EditStatusStickObj, domActiveElemG.firstChild)
    ActiveElem = d3.select("#activeElem")
    activeElem = document.getElementById("activeElem")

    cw.drawStatusStickDeleteButton.style.visibility = "visible"
        cw.drawStatusStickTopButton.style.visibility = "visible"
        cw.drawStatusStickBotButton.style.visibility = "visible"
    cw.drawStatusStickEditSpan.innerHTML = "Edit Status Stick"
    cw.containerDiv.style.backgroundColor = "orange"

    cw.drawStatusStickCancelButton.disabled = false
    cw.drawStatusStickFinishButton.disabled = false
            cw.drawStatusStickBotButton.disabled=false
    //---update selections---
    var myStatus=activeElem.getAttribute("myStatus")
    if(myStatus=="on")cw.drawStatusStickStatusSelect.selectedIndex=0
    if(myStatus=="alarm")cw.drawStatusStickStatusSelect.selectedIndex=1
    if(myStatus=="intermittent")cw.drawStatusStickStatusSelect.selectedIndex=2
    if(myStatus=="defective")cw.drawStatusStickStatusSelect.selectedIndex=3
    if(myStatus=="normalOff")cw.drawStatusStickStatusSelect.selectedIndex=4

     var myScale=+activeElem.getAttribute("myScale")
         cw.drawStatusStickScaleSelect.selectedIndex=myScale*10-1


          var myRotate=activeElem.getAttribute("myRotate")
            cw.adjustedRotateStatusStickValue.value=myRotate


                     var matrix = activeElem.getCTM()
             var scale=matrix.a
            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", "translate("+matrix.e+","+matrix.f+")")

            //--place dragDot----
            setStatusStickEditDrag()

            mySVG.style.cursor = ""
           
}



function setStatusStickEditDrag()
{


    activeElem.removeAttribute("onmousedown")

    mySVG.setAttribute("onmousedown", "startDragStatusStick(evt)")
    mySVG.setAttribute("onmousemove", "dragStatusStick(evt)")
    mySVG.setAttribute("onmouseup", "endDragStatusStick(evt)")
    ActiveElem.style("cursor", "move")

}

function finishEditStatusStick()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemStatusStickCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "hmiElem")

        finishedElem.setAttribute("id", DrawStatusStickEditId)
                  CurrentHMIElem=finishedElem.cloneNode(true)

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("onmousedown", "editStatusStickDraw("+DrawStatusStickEditId+",evt)")
        finishedElem.setAttribute("id", DrawStatusStickEditId)
        domElemG.insertBefore(finishedElem, EditThisStatusStick)
        domElemG.removeChild(EditThisStatusStick)
       if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }


    }

    closeDrawStatusStick()
}

function resetEditStatusStick()
{

    var cw = addElemStatusStickCw

    document.getElementById(DrawStatusStickEditId).setAttribute("opacity", 1)

    EditStatusStick = false
    cw.drawStatusStickEditSpan.innerText = "Draw Pilot Lights"
    cw.drawStatusStickTopTable.style.backgroundColor = "#ABCDEF"
    ActiveElem = null
    activeElem = null

    DrawX.style("display", "none")
    DrawX.attr("stroke", "violet")
    DragDot.style("visibility", "hidden")

    cw.drawStatusStickDeleteButton.style.visibility = "hidden"
        cw.drawStatusStickTopButton.style.visibility = "hidden"
        cw.drawStatusStickBotButton.style.visibility = "hidden"
    cw.drawStatusStickCancelButton.disabled = false
    cw.drawStatusStickFinishButton.disabled = false
    DrawStatusStick = true
    mySVG.setAttribute('onclick', "plantStatusStick()")

}

function cancelEditStatusStick()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawStatusStickEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null
    ActiveElem = null

    closeDrawStatusStick()


}

//=======================delete circle==================
var StatusStickDeleted = false
//---button---
function removeCurrentDrawStatusStick()
{

    domActiveElemG.removeChild(activeElem)
     var elemObjEdit = document.getElementById(DrawStatusStickEditId)
     domElemG.removeChild(elemObjEdit)
    StatusStickDeleted = true

    var cw = addElemStatusStickCw

    closeDrawStatusStick()

}
//====================Top/Bot===================
function topDrawStatusStick()
{

    var elemObjEdit = document.getElementById(DrawStatusStickEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawStatusStickEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null
    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)

    closeDrawStatusStick()
}
function botDrawStatusStick()
{
    if(EditStatusStick)
    {
    var elemObjEdit = document.getElementById(DrawStatusStickEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawStatusStickEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null

    domElemG.removeChild(elemObjEdit)
    domElemG.insertBefore(finishedElem,domElemG.firstChild)

   closeDrawStatusStick()
   }
   else
   {
        finishDrawStatusStick()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }
}


function rotateStatusStickAdjust(factor)
{
    var cw = addElemStatusStickCw
    var mult = parseFloat(cw.rotateDrawStatusStickAdjustSelect.options[cw.rotateDrawStatusStickAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotateStatusStickValue.value = rotateAdd+parseFloat(cw.adjustedRotateStatusStickValue.value)

    if(ActiveElem)
    {
        rote("activeElem", rotateAdd)
        rote("domDrawX", rotateAdd)
    }
}

