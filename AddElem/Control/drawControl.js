///---X button and iframe close all---
function closeDrawControl()
{
    if(addElemControlViz==true)
    {
        closeIframe("addElemControl");
        coverOff()
        RotateAngle = 0
        var cw = addElemControlCw
        cw.adjustedRotateControlValue.value = 0
        var elemTimelinded = false

        if(EditControl==true && ControlDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawControlEditId)
            elemObjEdit.style.display = "inline"
            elemObjEdit.setAttribute("onmousedown", "editControlDraw("+DrawControlEditId+",evt)")

        }
        DraggingObj = false
        DrawControl = false
        EditControl = false
        ControlDeleted = false

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")

        mySVG.removeAttribute('onclick')
        if(document.getElementById("activeElem"))
        {

            document.getElementById("activeElem").removeAttribute("class")
            domActiveElemG.removeChild(document.getElementById("activeElem"))
            topG.appendChild(dragDot) //--place drag dot on top---
            dragDot.removeAttribute("cx")

        }
        activeElem = null
        ActiveElem = null

        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)
        DragDot.attr("cx", null)
        DragDot.attr("transform", null)
        DragDot.style("visibility", "hidden")
        cw.drawControlCopyButton.style.visibility = "hidden"

        cw.drawControlFinishButton.disabled = true
        cw.drawControlCancelButton.disabled = true
        cw.drawControlCancelButton.style.borderColor = ""
        cw.drawControlDeleteButton.style.visibility = "hidden"
        cw.drawControlTopButton.style.visibility = "hidden"

            cw.drawControlBotButton.disabled=true
        cw.drawControlEditSpan.innerText = "Draw Controls"
        cw.drawControlTopTable.style.backgroundColor = "#ABCDEF"
        cw.containerDiv.style.backgroundColor = "#ABCDEF"
        //----copies---
        for(var k = 0; k<CopyControlArray.length; k++)
        {
            var copy = CopyControlArray[k]
            var id = copy.getAttribute("id")
            copy.setAttribute("onmousedown", "editControlDraw("+id+",evt)")
            copy.removeAttribute("style")
        }

        ActiveControlCopy = false
        CopyControlArray =[]

    }
}

//---on add icon DrawX follows cursor
function trackDrawControl()
{
    var cw = addElemControlCw

    if(ActiveElem==null&&EditControl==false && ControlDeleted==false&&ActiveControlCopy==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }
}

var EditControl = false
var DrawControl = false
var ControlDeleted = false
var ControlCenter =[]

function startControlDraw()
{
    var cw = addElemControlCw
    RotateAngle = 0
    elemSizeDiv.innerHTML = "rx = <input id=drawControlRxValue type='text' style='width:30px;border=0' /> ry = <input id=drawControlRyValue type='text' style='width:30px;border=0' />"

    if(EditControl==false)
    {
        ActiveElem = null
        activeElem = null

        DrawControl = true

        mySVG.setAttribute('onclick', "placeDrawControl()") //---click to add more icons for this session---

    }

    if(cw.adjustedRotateControlValue)
        cw.adjustedRotateControlValue.value = 0
}

//--click on svg---
function placeDrawControl()
{
    var cw = addElemControlCw
    coverOn()

    var strokeColor = cw.drawControlStrokeSelect.options[cw.drawControlStrokeSelect.selectedIndex].value
    var strokeWidth = cw.drawControlStrokeWidthSelect.options[cw.drawControlStrokeWidthSelect.selectedIndex].value
    var fillColor = cw.drawControlFillSelect.options[cw.drawControlFillSelect.selectedIndex].value
    var opacity = cw.drawControlOpacitySelect.options[cw.drawControlOpacitySelect.selectedIndex].text
    if(cw.drawControlFillSelect.selectedIndex==0)
    {
        fillColor = "white"
        opacity = 0
    }

    ActiveElem = ActiveElemG.append("ellipse")
    .attr("id", "activeElem")
    .attr("stroke", strokeColor)
    .attr("stroke-width", strokeWidth)
    .attr("fill", fillColor)
    .attr("fill-opacity", opacity)
    if(cw.drawControlShadowCheck.checked==true)
        ActiveElem.attr("filter", "url(#drop-shadow)")

        if(cw.drawControlStrokeDashCheck.checked==true)
        ActiveElem.attr("stroke-dasharray", "8 4")

        activeElem = document.getElementById("activeElem")
        domActiveElemG.appendChild(dragDot) //--place drag dot on top---

        DragDot.attr("cx", 20)

        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
        DragDot.attr("transform", "translate("+(SVGx)+" "+SVGy+")")
        ControlCenter =[SVGx, SVGy]
        ActiveElem.style("cursor", "move")
        ActiveElem.attr("class", "dragTargetObj")
        ActiveElem.attr("pointer-events", null)

        ActiveElem.attr("rx", 20)
        ActiveElem.attr("ry", 20*.42)

        DragDot.style("visibility", "visible")

        mySVG.removeAttribute('onclick')
        mySVG.style.cursor = ""
        mySVG.setAttribute("onmousedown", "startDragControl(evt)")
        mySVG.setAttribute("onmousemove", "dragControl(evt)") //;showStarComment(evt)
        mySVG.setAttribute("onmouseup", "endDragControl(evt)")

        cw.drawControlCancelButton.disabled = false
        cw.drawControlFinishButton.disabled = false
            cw.drawControlBotButton.disabled=false

}

function finishDrawControl()
{

    if(EditControl==true||ActiveControlCopy==true)
        finishEditControl()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemControlCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "control"+new Date().getTime()
            domElemG.appendChild(finishedElem)
            finishedElem.setAttribute("id", id)

            finishedElem.setAttribute("onmousedown", "editControlDraw("+id+",evt)")

            var ctm = finishedElem.getCTM()
            RAD2DEG = 180 / Math.PI;
            var rotateAngle = Math.atan2(ctm.b, ctm.a) * RAD2DEG;
            finishedElem.setAttribute("rotateAngle", rotateAngle)

            finishedElem.setAttribute("class", "hmiElem")

            ActiveElem = null
            activeElem = null

            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "placeDrawControl()") //---click to add more icons for this session---
            DrawX.style("display", "none")
            DragDot.style("visibility", "hidden")
            mySVG.appendChild(dragDot)
            cw.drawControlFinishButton.disabled = true
            cw.drawControlCancelButton.disabled = true
            cw.drawControlBotButton.disabled=true

        }
}

function cancelDrawControl()
{
    var cw = addElemControlCw
    if(EditControl==true)
        cancelEditControl()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null
            // d3SVG.style("cursor", "default")
            ActiveElem = null

            mySVG.setAttribute('onclick', "placeDrawControl()") //---click to add more icons for this session---
            DragDot.style("visibility", "hidden")
            topG.appendChild(dragDot)
            cw.drawControlFinishButton.disabled = true
            cw.drawControlCancelButton.disabled = true
            cw.drawControlBotButton.disabled=true
            cw.adjustedRotateControlValue.value = 0

            coverOff()

        }

        cw.drawControlCancelButton.style.borderColor = ""

}
//====================edit/update ellipse===============================

var EditControl = false
var DrawControlEditId
var EditThisControl
//--right button/mousedown on ellipse---
function editControlDraw(elemObjEdit, evt)
{

 var isRightMB;
    var evtW = window.event;
    if(evtW)
    {
        isRightMB = evtW.which == 3;
        if (!isRightMB) // IE, Opera
            isRightMB = evtW.button == 2;
    }
    else //---firefox--
        isRightMB = evt.which == 3;

    if(isRightMB&&DrawControl==false&&ZoomDrawing==false)
    {
        elemSizeDiv.innerHTML = "rx = <input id=drawControlRxValue type='text' style='width:30px;border=0' /> ry = <input id=drawControlRyValue type='text' style='width:30px;border=0' />"

        EditThisControl = elemObjEdit

        DrawControlEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null

        EditControl = true
        if(addElemControlLoad==false)
        {
            openIframe("AddElem", "addElemControl", 10)

        }
        else if(addElemControlViz==false)
        {
            openIframe("AddElem", "addElemControl", 10)
            setEditControl()
        }
        else
            setEditControl()

    }
    if(isRightMB&&ZoomDrawing==true ) //---zoom drag
    {
        mySVG.setAttribute("onmousedown", "startDragZoom(evt)")
        mySVG.setAttribute("onmousemove", "dragZoom(evt)")
        mySVG.setAttribute("onmouseup", "endDragZoom(evt)")
        d3.select("#mySVG").on("mousedown.zoom", null)

        var dragTarget=evt.target

        var classed=dragTarget.getAttribute("class")
        dragTarget.setAttribute("class", "dragTargetObj")
        dragTarget.removeAttribute("onmousedown")
        dragTarget.setAttribute("style","cursor:move")
       dragTarget.setAttribute("opacity",.4)
        DrawX.style("display", "none")

        ZoomDraggedElems.push([dragTarget,"editControlDraw("+dragTarget.id+",evt)",classed])
    }

}
//---after iframe loaded see sendSize() at addElemControl.htm---
var EditControlObj
function setEditControl()
{
    coverOn()

    mySVG.removeAttribute('onclick')
    var cw = addElemControlCw
    var elemObjEdit = document.getElementById(DrawControlEditId)

    EditControlObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditControlObj.setAttribute("id", "activeElem")
    EditControlObj.setAttribute("class", "dragTargetObj")

    EditControlObj.removeAttribute("onmousedown")
    if(EditControlObj.getAttribute("filter"))
        cw.drawControlShadowCheck.checked = true

        domActiveElemG.insertBefore(EditControlObj, domActiveElemG.firstChild)

        ActiveElem = d3.select("#activeElem")
        activeElem = document.getElementById("activeElem")
        domActiveElemG.appendChild(dragDot) //--place drag dot on top---
        cw.drawControlDeleteButton.style.visibility = "visible"
        cw.drawControlTopButton.style.visibility = "visible"
        cw.drawControlBotButton.style.visibility = "visible"
        cw.drawControlEditSpan.innerHTML = "Edit Control"
        cw.drawControlCopyButton.style.visibility = "visible"
        cw.drawControlTopTable.style.backgroundColor = "orange"
        cw.containerDiv.style.backgroundColor = "orange"
        cw.drawControlCancelButton.disabled = false
        cw.drawControlFinishButton.disabled = false
            cw.drawControlBotButton.disabled=false

        var stroke = EditControlObj.getAttribute("stroke")
        var strokeWidth = EditControlObj.getAttribute("stroke-width")
        var fill = EditControlObj.getAttribute("fill")
        var opacity = EditControlObj.getAttribute("fill-opacity")

        if(opacity!="0")
    {
        setSelect("Control", "Opacity", opacity)
        setSelect("Control", "Fill", fill)
        cw.drawControlFillBg.style.backgroundColor = fill
    }
    else
    {
        cw.drawControlFillBg.style.backgroundColor = ""
        cw.drawControlFillSelect.selectedIndex = 0

    }

    setSelect("Control", "Stroke", stroke)
    setSelect("Control", "StrokeWidth", strokeWidth)
    //---update bg colors---
    cw.drawControlStrokeBg.style.backgroundColor = stroke
    if(ActiveElem.attr("stroke-dasharray"))
        cw.drawControlStrokeDashCheck.checked = true
        else
            cw.drawControlStrokeDashCheck.checked = false

            var ctm = elemObjEdit.getCTM()
            RAD2DEG = 180 / Math.PI;
    var rotatedDeg = Math.atan2(ctm.b, ctm.a) * RAD2DEG;

    if(!rotatedDeg) rotatedDeg = 0
        cw.adjustedRotateControlValue.value = rotatedDeg
        var matrix = activeElem.getCTM()

        var transX = matrix.e
        var transY = matrix.f

        DrawX.attr("stroke", "darkorange")
        DrawX.style("display", "inline")
        DrawX.attr("transform", ActiveElem.attr("transform"))
        var radiusX = parseFloat(ActiveElem.attr("rx"))
        var radiusY = parseFloat(ActiveElem.attr("ry"))
        DragDot.attr("cx", radiusX)
        DragDot.attr("cy", radiusY)

        DragDot.attr("transform", "translate("+transX+" "+transY+")")

        mySVG.style.cursor = ""

        // activeElem.setAttribute('onclick',"setControlEditDrag()")
        setControlEditDrag()

}

function setControlEditDrag()
{

    activeElem.removeAttribute("onmousedown")
    DragDot.style("visibility", "visible")
    mySVG.setAttribute("onmousedown", "startDragControl(evt)")
    mySVG.setAttribute("onmousemove", "dragControl(evt)")
    mySVG.setAttribute("onmouseup", "endDragControl(evt)")
    ActiveElem.style("cursor", "move")

}
function finishEditControl()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemControlCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "hmiElem")
        finishedElem.setAttribute("onmousedown", "editControlDraw("+DrawControlEditId+",evt)")

        var rotate = ""
        if(RotateAngle!=0)
            rotate = "rotate("+RotateAngle+")"
            finishedElem.setAttribute("rotateAngle", RotateAngle)

            finishedElem.setAttribute("id", DrawControlEditId)

            domActiveElemG.removeChild(document.getElementById("activeElem"))
            finishedElem.style.cursor = "default"

            finishedElem.setAttribute("onmousedown", "editControlDraw("+DrawControlEditId+",evt)")
            finishedElem.setAttribute("id", DrawControlEditId)
            domElemG.insertBefore(finishedElem, EditThisControl)
            domElemG.removeChild(EditThisControl)

    }
    closeDrawControl()
}

function resetEditControl()
{

    var cw = addElemControlCw

    document.getElementById(DrawControlEditId).setAttribute("opacity", 1)

    EditControl = false
    cw.editControlSpan.innerText = "Draw Controls"
    cw.drawControlTopTable.style.backgroundColor = "gainsboro"
    ActiveElem = null
    activeElem = null
    topG.appendChild(dragDot) //--place drag dot on top---
    DrawX.style("display", "none")
    DrawX.attr("stroke", "violet")
    DragDot.style("visibility", "hidden")
    cw.drawControlCopyButton.style.visibility = "hidden"
    cw.drawControlDeleteButton.style.visibility = "hidden"
        cw.drawControlTopButton.style.visibility = "hidden"
        cw.drawControlBotButton.style.visibility = "hidden"
    cw.drawControlCancelButton.disabled = false
    cw.drawControlFinishButton.disabled = false
    DrawControl = true
    mySVG.setAttribute('onclick', "placeDrawControl()")

}

function cancelEditControl()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawControlEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null

    ActiveElem = null
    topG.appendChild(dragDot) //--place drag dot on top---
    closeDrawControl()
    //setEditControl()

}
//-------------------copy ellipse-----------------
var ActiveControlCopy = false
var CopyControlArray =[]
var CopyControlTransX
var CopyControlTransY
//---toggle copy button----
function copyDrawControl()
{
    var cw = addElemControlCw
    ActiveControlCopy = true

    if(document.getElementById("activeElem"))
    {
        var copyMe = document.getElementById(DrawControlEditId)

        CopyControlTransX = 0
        CopyControlTransY = 0
        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "hmiElem")
        finishedElem.removeAttribute("style")

        finishedElem.setAttribute("id", DrawControlEditId)
        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("id", DrawControlEditId)
        domElemG.insertBefore(finishedElem, copyMe)
        domElemG.removeChild(copyMe)

        CopyControlArray.push(finishedElem)

        cw.drawControlEditSpan.innerHTML = "Copy &amp; drag copies"

        coverOff()

        mySVG.appendChild(dragDot) //--place drag dot on top---
        dragDot.removeAttribute("cx")

        activeElem = null
        ActiveElem = null

        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)
        DragDot.attr("cx", null)
        DragDot.attr("transform", null)
        DragDot.style("visibility", "hidden")

        DraggingObj = false
        DrawControl = false
        EditControl = false
        ControlDeleted = false

        mySVG.setAttribute("onmousedown", "startDragControl(evt)")
        mySVG.setAttribute("onmousemove", "dragControl(evt)")
        mySVG.setAttribute("onmouseup", "endDragControl(evt)")

        mySVG.removeAttribute('onclick')

        cw.drawControlDeleteButton.style.visibility = "hidden"
        cw.drawControlTopButton.style.visibility = "hidden"
        cw.drawControlBotButton.style.visibility = "hidden"
        cw.drawControlCancelButton.disabled = true
        cw.drawControlTopButton.style.visibility = "hidden"
        cw.drawControlBotButton.style.visibility = "hidden"
    }
    var copyMe = document.getElementById(DrawControlEditId)
    var copied = copyMe.cloneNode(true)
    copied.setAttribute("style", "cursor:move")
    var id = "circle"+new Date().getTime()
    copied.setAttribute("id", id)
    copied.setAttribute("class", "dragTargetObj")
    copied.setAttribute("onmousedown", "tagCopyControl(evt)")
    CopyControlTransX += 10
    CopyControlTransY += 10

    var newTransform = mySVG.createSVGTransformFromMatrix(mySVG.createSVGMatrix().translate(CopyControlTransX, CopyControlTransY))
    copied.transform.baseVal.appendItem(newTransform)
    copied.transform.baseVal.consolidate()

    domElemG.appendChild(copied)
    CopyControlArray.push(copied)

}
var CopyControl
function tagCopyControl(evt)
{
    CopyControl = evt.target

}

//=======================delete ellipse==================
var ControlDeleted = false
//---button---
function removeCurrentDrawControl()
{

    domActiveElemG.removeChild(activeElem)
    var elemObjEdit = document.getElementById(DrawControlEditId)
    domElemG.removeChild(elemObjEdit)
    ControlDeleted = true

    closeDrawControl()

}
//====================Top/Bot===================
function topDrawControl()
{

    var elemObjEdit = document.getElementById(DrawControlEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawControlEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null
    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)

    closeDrawControl()
}
function botDrawControl()
{
    if(EditControl)
    {
    var elemObjEdit = document.getElementById(DrawControlEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawControlEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
     activeElem=null
    ActiveElem=null

    domElemG.removeChild(elemObjEdit)
    domElemG.insertBefore(finishedElem,domElemG.firstChild)

   closeDrawControl()
   }
   else
   {
        finishDrawControl()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }
}


function showDrawControlStrokeBg()
{
    var cw = addElemControlCw
    var stroke = cw.drawControlStrokeSelect.options[cw.drawControlStrokeSelect.selectedIndex].value
    if(stroke!="none")
        cw.drawControlStrokeBg.style.backgroundColor = stroke
        else
            cw.drawControlStrokeBg.style.backgroundColor = ""
            if(ActiveElem)
            ActiveElem.attr("stroke", stroke)

}

function drawControlStrokeSelected()
{
    var cw = addElemControlCw
    var stroke = cw.drawControlStrokeSelect.options[cw.drawControlStrokeSelect.selectedIndex].value

    if(ActiveElem)
        ActiveElem.attr("stroke", stroke)

}

function showDrawControlFillBg()
{
    var cw = addElemControlCw
    var fill = cw.drawControlFillSelect.options[cw.drawControlFillSelect.selectedIndex].value
    if(fill!="none")
        cw.drawControlFillBg.style.backgroundColor = fill
        else
            cw.drawControlFillBg.style.backgroundColor = ""
            if(cw.drawControlFillSelect.selectedIndex==0)
        {
            ActiveElem.attr("fill", "white")
            ActiveElem.attr("fill-opacity", 0)

        }
        else if(ActiveElem)
        {
            ActiveElem.attr("fill", fill)
            var opacity = cw.drawControlOpacitySelect.options[cw.drawControlOpacitySelect.selectedIndex].text

            ActiveElem.attr("fill-opacity", opacity)

        }

}

function drawControlFillSelected()
{
    var cw = addElemControlCw
    var fill = cw.drawControlFillSelect.options[cw.drawControlFillSelect.selectedIndex].value
    if(cw.drawControlFillSelect.selectedIndex==0)
    {
        ActiveElem.attr("fill", "white")
        ActiveElem.attr("fill-opacity", 0)

    }
    else if(ActiveElem)
    {
        ActiveElem.attr("fill", fill)
        var opacity = cw.drawControlOpacitySelect.options[cw.drawControlOpacitySelect.selectedIndex].text

        ActiveElem.attr("fill-opacity", opacity)

    }

}

function drawControlOpacitySelected()
{
    var cw = addElemControlCw
    var opacity = cw.drawControlOpacitySelect.options[cw.drawControlOpacitySelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("fill-opacity", opacity)

}

function drawControlStrokeWidthSelected()
{
    var cw = addElemControlCw
    var strokeWidth = cw.drawControlStrokeWidthSelect.options[cw.drawControlStrokeWidthSelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("stroke-width", strokeWidth)

}

function drawControlStrokeDashChecked()
{
    var cw = addElemControlCw
    if(cw.drawControlStrokeDashCheck.checked==true)
    {
        if(ActiveElem)
            ActiveElem.attr("stroke-dasharray", "8 4")

    }
    else
    {
        if(ActiveElem)
            ActiveElem.attr("stroke-dasharray", null)

    }

}

function rotateControlAdjust(factor)
{
    var cw = addElemControlCw
    var mult = parseFloat(cw.rotateDrawControlAdjustSelect.options[cw.rotateDrawControlAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotateControlValue.value = rotateAdd+parseFloat(cw.adjustedRotateControlValue.value)

    if(ActiveElem)
    {
        rote("activeElem", rotateAdd)
        rote("domDrawX", rotateAdd)
    }
}

function drawControlShadowChecked()
{

    var cw = addElemControlCw
    if(cw.drawControlShadowCheck.checked==true)
    {
        if(ActiveElem)
            ActiveElem.attr("filter", "url(#drop-shadow)")

    }
    else
    {
        if(ActiveElem)
            ActiveElem.attr("filter", null)

    }

}