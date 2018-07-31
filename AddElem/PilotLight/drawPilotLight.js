///---X button and iframe close all---
function closeDrawPilotLight()
{
    if(addElemPilotLightViz==true)
    {
        closeIframe("addElemPilotLight");
        coverOff()
        
        var cw = addElemPilotLightCw

        if(EditPilotLight==true && PilotLightDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawPilotLightEditId)
            elemObjEdit.style.display = "inline"

            elemObjEdit.setAttribute("onmousedown", "editPilotLightDraw("+DrawPilotLightEditId+",evt)")

        }
        DraggingObj = false
        DrawPilotLight = false
        EditPilotLight = false
        PilotLightDeleted = false

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

        cw.drawPilotLightFinishButton.disabled = true
        cw.drawPilotLightCancelButton.disabled = true
        cw.drawPilotLightCancelButton.style.borderColor = ""
        cw.drawPilotLightDeleteButton.style.visibility = "hidden"
        cw.drawPilotLightTopButton.style.visibility = "hidden"

            cw.drawPilotLightBotButton.disabled=true
        cw.drawPilotLightEditSpan.innerText = "Draw PilotLights"
        cw.containerDiv.style.backgroundColor = "#ABCDEF"
        cw.drawPilotLightOpacitySelect.selectedIndex=9
    }
}

//---on add icon DrawX follows cursor
function trackDrawPilotLight()
{
    var cw = addElemPilotLightCw

    if(ActiveElem==null&&EditPilotLight==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }
}

var EditPilotLight = false
var DrawPilotLight = false
var PilotLightDeleted = false

function startPilotLightDraw()
{
    var cw = addElemPilotLightCw
     elemSizeDiv.innerHTML="r = <input id=drawPilotLightRadiusValue type='text' style='width:30px;border=0' /> "
    if(EditPilotLight==false)
    {
        ActiveElem = null
        activeElem = null
        DrawPilotLight = true
        DrawX.style("display", "inline")
        mySVG.setAttribute('onclick', "plantPilotLight()") //---click to add more icons for this session---

    }

}

//--click on svg---
function plantPilotLight()
{
    var cw = addElemPilotLightCw
    coverOn()
    var scale=cw.drawPilotLightScaleSelect.options[cw.drawPilotLightScaleSelect.selectedIndex].text
    activeElem=pilotLightG.cloneNode(true)

     activeElem.setAttribute("id", "activeElem")
    ActiveElem = d3.select("#activeElem")
        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")scale("+scale+")")

        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)
         domActiveElemG.appendChild(activeElem)

         drawPilotLightStatusSelected()


        mySVG.removeAttribute('onclick')
        mySVG.style.cursor = ""
        mySVG.setAttribute("onmousedown", "startDragPilotLight(evt)")
        mySVG.setAttribute("onmousemove", "dragPilotLight(evt)")
        mySVG.setAttribute("onmouseup", "endDragPilotLight(evt)")

        cw.drawPilotLightCancelButton.disabled = false
        cw.drawPilotLightFinishButton.disabled = false
            cw.drawPilotLightBotButton.disabled=false

}

function drawPilotLightScaleSelected()
{
    if(ActiveElem)
    {
        var cw = addElemPilotLightCw
         var scale=+cw.drawPilotLightScaleSelect.options[cw.drawPilotLightScaleSelect.selectedIndex].text
        var matrix = activeElem.transform.baseVal.consolidate().matrix;
        matrix.a=scale
        matrix.d=scale
        activeElem.transform.baseVal.consolidate().matrix;
    }

}

function drawPilotLightStatusSelected()
{
    if(ActiveElem)
    {
      var cw = addElemPilotLightCw
     var color=cw.drawPilotLightStatusSelect.options[cw.drawPilotLightStatusSelect.selectedIndex].value
     var status=cw.drawPilotLightStatusSelect.options[cw.drawPilotLightStatusSelect.selectedIndex].text
     var opacity=cw.drawPilotLightOpacitySelect.options[cw.drawPilotLightOpacitySelect.selectedIndex].text
      activeElem.setAttribute("myStatus",status)
      activeElem.setAttribute("opacity",opacity)
      var circle=activeElem.firstChild
      var lineOff=activeElem.childNodes.item(1)
      var lineDisabled=activeElem.childNodes.item(2)
      var circleDefective=activeElem.childNodes.item(3)
      var lineDefective=activeElem.childNodes.item(4)

      lineOff.setAttribute("style","visibility:hidden")
      lineDisabled.setAttribute("style","visibility:hidden")
      circleDefective.setAttribute("style","visibility:hidden")
      lineDefective.setAttribute("style","visibility:hidden")


      if(color=="green")
        {
            circle.setAttribute("fill","url(#greenGradient)")
         }
        if(color=="red")
        {
             circle.setAttribute("fill","url(#redGradient)")
            lineOff.setAttribute("style","visibility:visible")
         }
        if(color=="grey")
        {     circle.setAttribute("fill","url(#greyGradient)")
            lineOff.setAttribute("style","visibility:visible")
            lineDisabled.setAttribute("style","visibility:visible")
        }
        if(color=="aqua")
        {     circle.setAttribute("fill","url(#aquaGradient)")
            circleDefective.setAttribute("style","visibility:visible")
            lineDefective.setAttribute("style","visibility:visible")

         }
       if(color=="violet")
        {
            circle.setAttribute("fill","url(#violetGradient)")
         }

    }


}
function finishDrawPilotLight()
{

    if(EditPilotLight==true )
        finishEditPilotLight()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemPilotLightCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "pilotLight"+new Date().getTime()

            finishedElem.setAttribute("id", id)
              finishedElem.setAttribute("class", "hmiElem")

            CurrentHMIElem=finishedElem.cloneNode(true)

            mySVG.removeAttribute("onmousedown")
            mySVG.removeAttribute("onmousemove")
            mySVG.removeAttribute("onmouseup")

            finishedElem.setAttribute("onmousedown", "editPilotLightDraw("+id+",evt)")
            domElemG.appendChild(finishedElem)




            ActiveElem = null
            activeElem = null

            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "plantPilotLight()") //---click to add more icons for this session---
            DrawX.style("display", "none")
            DragDot.style("visibility", "hidden")
            // topG.appendChild(dragDot)
            cw.drawPilotLightFinishButton.disabled = true
            cw.drawPilotLightCancelButton.disabled = true
            cw.drawPilotLightBotButton.disabled=true
       if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }


        }
}

function cancelDrawPilotLight()
{
    var cw = addElemPilotLightCw
    if(EditPilotLight==true)
        cancelEditPilotLight()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "plantPilotLight()") //---click to add more icons for this session---

            cw.drawPilotLightFinishButton.disabled = true
            cw.drawPilotLightCancelButton.disabled = true
            cw.drawPilotLightBotButton.disabled=true
            coverOff()

        }

        cw.drawPilotLightCancelButton.style.borderColor = ""

}

//====================edit/update circle===============================

var EditPilotLight = false
var DrawPilotLightEditId
var EditThisPilotLight
//--mousedown/right button on circle---
function editPilotLightDraw(elemObjEdit, evt)
{
    var isRightMB;
    evt = window.event;
    if ("which" in evt) // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = evt.which == 3;
    else if ("button" in evt) // IE, Opera
        isRightMB = evt.button == 2;

    if(isRightMB&&DrawPilotLight==false&&ZoomDrawing==false)
    {

        EditThisPilotLight = elemObjEdit

        DrawPilotLightEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditPilotLight = true
        if(addElemPilotLightLoad==false)
        {
            openIframe("AddElem", "addElemPilotLight", 10)

        }
        else if(addElemPilotLightViz==false)
        {
            openIframe("AddElem", "addElemPilotLight", 10)
            setEditPilotLight()
        }
        else
            setEditPilotLight()

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

        ZoomDraggedElems.push([dragTarget,"editPilotLightDraw("+dragTarget.id+",evt)",classed])
    }

}
//---after iframe loaded see sendSize() at addElemPilotLight.htm---
var EditPilotLightObj
function setEditPilotLight()
{
    coverOn()

    var cw = addElemPilotLightCw

    var elemObjEdit = document.getElementById(DrawPilotLightEditId)

    EditPilotLightObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditPilotLightObj.setAttribute("id", "activeElem")
    EditPilotLightObj.setAttribute("class", "dragTargetObj")
    EditPilotLightObj.removeAttribute("onmousedown")

    // EditPilotLightObj.style.cursor = "move"

    domActiveElemG.insertBefore(EditPilotLightObj, domActiveElemG.firstChild)
    ActiveElem = d3.select("#activeElem")
    activeElem = document.getElementById("activeElem")

    cw.drawPilotLightDeleteButton.style.visibility = "visible"
        cw.drawPilotLightTopButton.style.visibility = "visible"
        cw.drawPilotLightBotButton.style.visibility = "visible"
    cw.drawPilotLightEditSpan.innerHTML = "Edit Pilot Light"
    cw.containerDiv.style.backgroundColor = "orange"

    //domActiveElemG.setAttribute("transform", activeElem.getAttribute("transform"))
    //activeElem.removeAttribute("transform")
    cw.drawPilotLightCancelButton.disabled = false
    cw.drawPilotLightFinishButton.disabled = false
            cw.drawPilotLightBotButton.disabled=false




    //---update selections---
    var myStatus=activeElem.getAttribute("myStatus")
    if(myStatus=="ON")cw.drawPilotLightStatusSelect.selectedIndex=0
    if(myStatus=="ALARM")cw.drawPilotLightStatusSelect.selectedIndex=1
    if(myStatus=="INTERMITTENT")cw.drawPilotLightStatusSelect.selectedIndex=2
    if(myStatus=="DEFECTIVE")cw.drawPilotLightStatusSelect.selectedIndex=3
    if(myStatus=="NORMAL OFF")cw.drawPilotLightStatusSelect.selectedIndex=4
            var matrix = activeElem.getCTM()
             var scale=matrix.a

         if(scale==5)cw.drawPilotLightScaleSelect.selectedIndex=0
         if(scale==8)cw.drawPilotLightScaleSelect.selectedIndex=1
         if(scale==10)cw.drawPilotLightScaleSelect.selectedIndex=2
         if(scale==15)cw.drawPilotLightScaleSelect.selectedIndex=3
         if(scale==20)cw.drawPilotLightScaleSelect.selectedIndex=4
         if(scale==25)cw.drawPilotLightScaleSelect.selectedIndex=5
         if(scale==30)cw.drawPilotLightScaleSelect.selectedIndex=6
         if(scale==35)cw.drawPilotLightScaleSelect.selectedIndex=7
         if(scale==40)cw.drawPilotLightScaleSelect.selectedIndex=8
         if(scale==45)cw.drawPilotLightScaleSelect.selectedIndex=9
         if(scale==50)cw.drawPilotLightScaleSelect.selectedIndex=10

        var myOpacity=+activeElem.getAttribute("opacity")
        if(myOpacity)
         cw.drawPilotLightOpacitySelect.selectedIndex=10*myOpacity-1
        else
          cw.drawPilotLightOpacitySelect.selectedIndex=9
            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", "translate("+matrix.e+","+matrix.f+")")





            //--place dragDot----
            setPilotLightEditDrag()

            mySVG.style.cursor = ""
           
}

function drawPilotLightOpacitySelected()
{

    var cw = addElemPilotLightCw
  if(activeElem)
  {
   var opacity=cw.drawPilotLightOpacitySelect.options[cw.drawPilotLightOpacitySelect.selectedIndex].text
   activeElem.setAttribute("opacity",opacity)
  }

}

function setPilotLightEditDrag()
{


    activeElem.removeAttribute("onmousedown")

    mySVG.setAttribute("onmousedown", "startDragPilotLight(evt)")
    mySVG.setAttribute("onmousemove", "dragPilotLight(evt)")
    mySVG.setAttribute("onmouseup", "endDragPilotLight(evt)")
    ActiveElem.style("cursor", "move")

}

function finishEditPilotLight()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemPilotLightCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "hmiElem")

        finishedElem.setAttribute("id", DrawPilotLightEditId)
            CurrentHMIElem=finishedElem.cloneNode(true)

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("onmousedown", "editPilotLightDraw("+DrawPilotLightEditId+",evt)")
        finishedElem.setAttribute("id", DrawPilotLightEditId)
        domElemG.insertBefore(finishedElem, EditThisPilotLight)
        domElemG.removeChild(EditThisPilotLight)
       if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }


    }

    closeDrawPilotLight()
}

function resetEditPilotLight()
{

    var cw = addElemPilotLightCw

    document.getElementById(DrawPilotLightEditId).setAttribute("opacity", 1)

    EditPilotLight = false
    cw.drawPilotLightEditSpan.innerText = "Draw Pilot Lights"
    cw.drawPilotLightTopTable.style.backgroundColor = "#ABCDEF"
    ActiveElem = null
    activeElem = null

    DrawX.style("display", "none")
    DrawX.attr("stroke", "violet")
    DragDot.style("visibility", "hidden")

    cw.drawPilotLightDeleteButton.style.visibility = "hidden"
        cw.drawPilotLightTopButton.style.visibility = "hidden"
        cw.drawPilotLightBotButton.style.visibility = "hidden"
    cw.drawPilotLightCancelButton.disabled = false
    cw.drawPilotLightFinishButton.disabled = false
    DrawPilotLight = true
    mySVG.setAttribute('onclick', "plantPilotLight()")

}

function cancelEditPilotLight()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawPilotLightEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null
    ActiveElem = null

    closeDrawPilotLight()


}

//=======================delete circle==================
var PilotLightDeleted = false
//---button---
function removeCurrentDrawPilotLight()
{

    domActiveElemG.removeChild(activeElem)
     var elemObjEdit = document.getElementById(DrawPilotLightEditId)
     domElemG.removeChild(elemObjEdit)
    PilotLightDeleted = true

    var cw = addElemPilotLightCw

    closeDrawPilotLight()

}
//====================Top/Bot===================
function topDrawPilotLight()
{

    var elemObjEdit = document.getElementById(DrawPilotLightEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawPilotLightEditId)

    domActiveElemG.removeChild(document.getElementById("hmiElem"))
    activeElem=null
    ActiveElem=null

    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)

    closeDrawPilotLight()
}
function botDrawPilotLight()
{
    if(EditPilotLight)
    {
    var elemObjEdit = document.getElementById(DrawPilotLightEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawPilotLightEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null

    domElemG.removeChild(elemObjEdit)
    domElemG.insertBefore(finishedElem,domElemG.firstChild)

   closeDrawPilotLight()
   }
   else
   {
        finishDrawPilotLight()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }
}




