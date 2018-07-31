///---X button and iframe close all---
function closeDrawButton()
{
    if(addElemButtonViz==true)
    {
        closeIframe("addElemButton");
        coverOff()
        
        var cw = addElemButtonCw

        if(EditButton==true && ButtonDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawButtonEditId)
            elemObjEdit.style.display = "inline"

            elemObjEdit.setAttribute("onmousedown", "editButtonDraw("+DrawButtonEditId+",evt)")

        }
        DraggingObj = false
        DrawButton = false
        EditButton = false
        ButtonDeleted = false

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

        cw.drawButtonFinishButton.disabled = true
        cw.drawButtonCancelButton.disabled = true
        cw.drawButtonCancelButton.style.borderColor = ""
        cw.drawButtonDeleteButton.style.visibility = "hidden"
        cw.drawButtonEditSpan.innerText = "Draw Buttons"
        cw.containerDiv.style.backgroundColor = "#ABCDEF"

         cw.drawButtonTopButton.style.visibility = "hidden"
            cw.drawButtonBotButton.disabled=true

        cw.adjustedRotateButtonValue.value=0
        cw.drawButtonScaleSelect.selectedIndex=2
    }
}

//---on add icon DrawX follows cursor
function trackDrawButton()
{
    var cw = addElemButtonCw

    if(ActiveElem==null&&EditButton==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }
}

var EditButton = false
var DrawButton = false
var ButtonDeleted = false

function startButtonDraw()
{
    var cw = addElemButtonCw
     elemSizeDiv.innerHTML="r = <input id=drawButtonRadiusValue type='text' style='width:30px;border=0' /> "
    if(EditButton==false)
    {
        ActiveElem = null
        activeElem = null
        DrawButton = true
        DrawX.style("display", "inline")
        mySVG.setAttribute('onclick', "plantButton()") //---click to add more icons for this session---

    }

}

//--click on svg---
function plantButton()
{
    var cw = addElemButtonCw
    coverOn()
    var scale=cw.drawButtonScaleSelect.options[cw.drawButtonScaleSelect.selectedIndex].value
    var status=cw.drawButtonStatusSelect.options[cw.drawButtonStatusSelect.selectedIndex].value

       activeElem=offOnButtonG.cloneNode(true)
       var offONRect=activeElem.getElementsByTagName("rect")[0]
     if(status=="on")
         offONRect.setAttribute("fill","green")
    else
        offONRect.setAttribute("fill","red")




     activeElem.setAttribute("id", "activeElem")
     activeElem.setAttribute("myScale", scale)
    ActiveElem = d3.select("#activeElem")

        var rotate= cw.adjustedRotateButtonValue.value

        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")scale("+scale+")rotate("+rotate+")")

        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)
         domActiveElemG.appendChild(activeElem)

       //  drawButtonStatusSelected()


        mySVG.removeAttribute('onclick')
        mySVG.style.cursor = ""
        mySVG.setAttribute("onmousedown", "startDragButton(evt)")
        mySVG.setAttribute("onmousemove", "dragButton(evt)")
        mySVG.setAttribute("onmouseup", "endDragButton(evt)")

        cw.drawButtonCancelButton.disabled = false
        cw.drawButtonFinishButton.disabled = false
             cw.drawButtonBotButton.disabled=false
}

function drawButtonScaleSelected()
{
    if(ActiveElem)
    {
        var cw = addElemButtonCw
         var scale=+cw.drawButtonScaleSelect.options[cw.drawButtonScaleSelect.selectedIndex].value
        var matrix = activeElem.transform.baseVal.consolidate().matrix;
        matrix.a=scale
        matrix.d=scale
        activeElem.transform.baseVal.consolidate().matrix;
    }

}

function drawButtonStatusSelected()
{
    if(ActiveElem)
    {
      var cw = addElemButtonCw
     var status=cw.drawButtonStatusSelect.options[cw.drawButtonStatusSelect.selectedIndex].value

      var myTransform=activeElem.getAttribute("transform")
        //domActiveElemG.removeChild(activeElem)
     var offONRect=activeElem.getElementsByTagName("rect")[0]
     if(status=="on")
         offONRect.setAttribute("fill","green")
    else
        offONRect.setAttribute("fill","red")

        activeElem.setAttribute("myStatus",status)




    }


}
function finishDrawButton()
{

    if(EditButton==true )
        finishEditButton()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemButtonCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            activeElem.getElementsByTagName("g")[0].removeAttribute("cursor")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

             var id = "buttonOnOff"+new Date().getTime()
             var scale=cw.drawButtonScaleSelect.options[cw.drawButtonScaleSelect.selectedIndex].value
            finishedElem.setAttribute("id", id)
             var status=cw.drawButtonStatusSelect.options[cw.drawButtonStatusSelect.selectedIndex].value
            finishedElem.setAttribute("myRotate",cw.adjustedRotateButtonValue.value)
            finishedElem.setAttribute("myScale",scale)
            finishedElem.setAttribute("myStatus",status)
           finishedElem.setAttribute("class", "hmiElem")

              CurrentHMIElem=finishedElem.cloneNode(true)
                  CurrentHMIElem.removeAttribute("cursor")

                  CurrentHMIElem.removeAttribute("pointer-events")
                  CurrentHMIElem.removeAttribute("myScale")


            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))


            mySVG.removeAttribute("onmousedown")
            mySVG.removeAttribute("onmousemove")
            mySVG.removeAttribute("onmouseup")

            finishedElem.setAttribute("onmousedown", "editButtonDraw("+id+",evt)")
            domElemG.appendChild(finishedElem)




            ActiveElem = null
            activeElem = null

            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "plantButton()") //---click to add more icons for this session---
            DrawX.style("display", "none")
            DragDot.style("visibility", "hidden")
            // topG.appendChild(dragDot)
            cw.drawButtonFinishButton.disabled = true
            cw.drawButtonCancelButton.disabled = true
             cw.drawButtonBotButton.disabled=true
            if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }
        }
}

function cancelDrawButton()
{
    var cw = addElemButtonCw
    if(EditButton==true)
        cancelEditButton()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "plantButton()") //---click to add more icons for this session---

            cw.drawButtonFinishButton.disabled = true
            cw.drawButtonCancelButton.disabled = true
            cw.drawButtonBotButton.disabled=true
            coverOff()

        }

        cw.drawButtonCancelButton.style.borderColor = ""

}

//====================edit/update circle===============================

var EditButton = false
var DrawButtonEditId
var EditThisButton
//--mousedown/right button on circle---
function editButtonDraw(elemObjEdit, evt)
{
  var isRightMB;
    evt = window.event;
    if ("which" in evt) // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = evt.which == 3;
    else if ("button" in evt) // IE, Opera
        isRightMB = evt.button == 2;

    if(isRightMB&&DrawButton==false&&ZoomDrawing==false)
    {

        EditThisButton = elemObjEdit

        DrawButtonEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditButton = true
        if(addElemButtonLoad==false)
        {
            openIframe("AddElem", "addElemButton", 10)

        }
        else if(addElemButtonViz==false)
        {
            openIframe("AddElem", "addElemButton", 10)
            setEditButton()
        }
        else
            setEditButton()

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

        ZoomDraggedElems.push([dragTarget,"editButtonDraw("+dragTarget.id+",evt)",classed])
    }

}
//---after iframe loaded see sendSize() at addElemButton.htm---
var EditButtonObj
function setEditButton()
{
    coverOn()

    var cw = addElemButtonCw

    var elemObjEdit = document.getElementById(DrawButtonEditId)

    EditButtonObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditButtonObj.setAttribute("id", "activeElem")
    EditButtonObj.setAttribute("class", "dragTargetObj")
    EditButtonObj.removeAttribute("onmousedown")

    // EditButtonObj.style.cursor = "move"

    domActiveElemG.insertBefore(EditButtonObj, domActiveElemG.firstChild)
    ActiveElem = d3.select("#activeElem")
    activeElem = document.getElementById("activeElem")

    cw.drawButtonDeleteButton.style.visibility = "visible"
    cw.drawButtonEditSpan.innerHTML = "Edit Pilot Light"
    cw.containerDiv.style.backgroundColor = "orange"

    cw.drawButtonCancelButton.disabled = false
    cw.drawButtonFinishButton.disabled = false
            cw.drawButtonBotButton.disabled=false
    //---update selections---
    var myStatus=activeElem.getAttribute("myStatus")
    if(myStatus=="on")cw.drawButtonStatusSelect.selectedIndex=0
    if(myStatus=="off")cw.drawButtonStatusSelect.selectedIndex=1


     var myScale=+activeElem.getAttribute("myScale")
         cw.drawButtonScaleSelect.selectedIndex=myScale*10-1


          var myRotate=activeElem.getAttribute("myRotate")
            cw.adjustedRotateButtonValue.value=myRotate


                     var matrix = activeElem.getCTM()
             var scale=matrix.a
            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", "translate("+matrix.e+","+matrix.f+")")

            //--place dragDot----
            setButtonEditDrag()

            mySVG.style.cursor = ""
           
}



function setButtonEditDrag()
{


    activeElem.removeAttribute("onmousedown")

    mySVG.setAttribute("onmousedown", "startDragButton(evt)")
    mySVG.setAttribute("onmousemove", "dragButton(evt)")
    mySVG.setAttribute("onmouseup", "endDragButton(evt)")
    ActiveElem.style("cursor", "move")

}

function finishEditButton()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemButtonCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "hmiElem")



        finishedElem.removeAttribute("style")
        finishedElem.removeAttribute("cursor")
           finishedElem.getElementsByTagName("g")[0].removeAttribute("cursor")




        finishedElem.setAttribute("id", DrawButtonEditId)
            CurrentHMIElem=finishedElem.cloneNode(true)
        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.setAttribute("onmousedown", "editButtonDraw("+DrawButtonEditId+",evt)")

        domElemG.insertBefore(finishedElem, EditThisButton)
        domElemG.removeChild(EditThisButton)
       if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }

    }

    closeDrawButton()
}



function cancelEditButton()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawButtonEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null
    ActiveElem = null

    closeDrawButton()


}

//=======================delete circle==================
var ButtonDeleted = false
//---button---
function removeCurrentDrawButton()
{

    domActiveElemG.removeChild(activeElem)
     var elemObjEdit = document.getElementById(DrawButtonEditId)
     domElemG.removeChild(elemObjEdit)
    ButtonDeleted = true

    var cw = addElemButtonCw

    closeDrawButton()

}
//====================Top/Bot===================
function topDrawButton()
{

    var elemObjEdit = document.getElementById(DrawButtonEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawButtonEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null

    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)

    closeDrawButton()
}
function botDrawButton()
{
    if(EditButton)
    {
    var elemObjEdit = document.getElementById(DrawButtonEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawButtonEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null
    domElemG.removeChild(elemObjEdit)
    domElemG.insertBefore(finishedElem,domElemG.firstChild)

   closeDrawButton()
   }
   else
   {
        finishDrawButton()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }
}


function rotateButtonAdjust(factor)
{
    var cw = addElemButtonCw
    var mult = parseFloat(cw.rotateDrawButtonAdjustSelect.options[cw.rotateDrawButtonAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotateButtonValue.value = rotateAdd+parseFloat(cw.adjustedRotateButtonValue.value)

    if(ActiveElem)
    {
        rote("activeElem", rotateAdd)
        rote("domDrawX", rotateAdd)
    }
}

