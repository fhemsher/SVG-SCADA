///---X button and iframe close all---
function closeDrawEllipse()
{
    if(addElemEllipseViz==true)
    {
        closeIframe("addElemEllipse");
        coverOff()

        RotateAngle = 0
        var cw = addElemEllipseCw
        cw.adjustedRotateEllipseValue.value = 0
        var elemTimelinded = false

        if(EditEllipse==true && EllipseDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawEllipseEditId)
            elemObjEdit.style.display = "inline"
            elemObjEdit.setAttribute("onmousedown", "editEllipseDraw("+DrawEllipseEditId+",evt)")

        }
        DraggingObj = false
        DrawEllipse = false
        EditEllipse = false
        EllipseDeleted = false

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")

        mySVG.removeAttribute('onclick')
        if(document.getElementById("activeElem"))
        {

            document.getElementById("activeElem").removeAttribute("class")
            domActiveElemG.removeChild(document.getElementById("activeElem"))
            mySVG.appendChild(dragDot) //--place drag dot on top---
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
        cw.drawEllipseCopyButton.style.visibility = "hidden"
        cw.drawEllipseTopButton.style.visibility = "hidden"
       // cw.drawEllipseBotButton.style.visibility = "hidden"
            cw.drawEllipseBotButton.disabled=true
        cw.drawEllipseFinishButton.disabled = true
        cw.drawEllipseCancelButton.disabled = true
        cw.drawEllipseCancelButton.style.borderColor = ""
        cw.drawEllipseDeleteButton.style.visibility = "hidden"
        cw.drawEllipseEditSpan.innerText = "Draw Ellipses"
        cw.drawEllipseTopTable.style.backgroundColor = "linen"
        cw.containerDiv.style.backgroundColor = "linen"
        //----copies---
        for(var k = 0; k<CopyEllipseArray.length; k++)
        {
            var copy = CopyEllipseArray[k]
            var id = copy.getAttribute("id")
            copy.setAttribute("onmousedown", "editEllipseDraw("+id+",evt)")
            copy.setAttribute("class", "ellipseElem")

            copy.removeAttribute("style")
        }

        ActiveEllipseCopy = false
        CopyEllipseArray =[]

    }
}

//---on add icon DrawX follows cursor
function trackDrawEllipse()
{
    var cw = addElemEllipseCw

    if(ActiveElem==null&&EditEllipse==false && EllipseDeleted==false&&ActiveEllipseCopy==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }
}

var EditEllipse = false
var DrawEllipse = false
var EllipseDeleted = false
var EllipseCenter =[]

function startEllipseDraw()
{
    var cw = addElemEllipseCw
    RotateAngle = 0
    elemSizeDiv.innerHTML = "rx = <input id=drawEllipseRxValue type='text' style='width:30px;border=0' /> ry = <input id=drawEllipseRyValue type='text' style='width:30px;border=0' />"

    if(EditEllipse==false)
    {
        ActiveElem = null
        activeElem = null

        DrawEllipse = true

        mySVG.setAttribute('onclick', "placeDrawEllipse()") //---click to add more icons for this session---

    }

    if(cw.adjustedRotateEllipseValue)
        cw.adjustedRotateEllipseValue.value = 0
}

//--click on svg---
function placeDrawEllipse()
{
    var cw = addElemEllipseCw
    coverOn()

    var strokeColor = cw.drawEllipseStrokeSelect.options[cw.drawEllipseStrokeSelect.selectedIndex].value
    var strokeWidth = cw.drawEllipseStrokeWidthSelect.options[cw.drawEllipseStrokeWidthSelect.selectedIndex].value
    var fillColor = cw.drawEllipseFillSelect.options[cw.drawEllipseFillSelect.selectedIndex].value
    var opacity = cw.drawEllipseOpacitySelect.options[cw.drawEllipseOpacitySelect.selectedIndex].text
    if(cw.drawEllipseFillSelect.selectedIndex==0)
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
    if(cw.drawEllipseShadowCheck.checked==true)
        ActiveElem.attr("filter", "url(#drop-shadow)")

        if(cw.drawEllipseStrokeDashCheck.checked==true)
        ActiveElem.attr("stroke-dasharray", "8 4")

        activeElem = document.getElementById("activeElem")
        domActiveElemG.appendChild(dragDot) //--place drag dot on top---

        DragDot.attr("cx", 20)

        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
        DragDot.attr("transform", "translate("+(SVGx)+" "+SVGy+")")
        EllipseCenter =[SVGx, SVGy]
        ActiveElem.style("cursor", "move")
        ActiveElem.attr("class", "dragTargetObj")
        ActiveElem.attr("pointer-events", null)

        ActiveElem.attr("rx", 20)
        ActiveElem.attr("ry", 15)

        DragDot.style("visibility", "visible")

        mySVG.removeAttribute('onclick')
        mySVG.style.cursor = ""
        mySVG.setAttribute("onmousedown", "startDragEllipse(evt)")
        mySVG.setAttribute("onmousemove", "dragEllipse(evt)") //;showStarComment(evt)
        mySVG.setAttribute("onmouseup", "endDragEllipse(evt)")

        cw.drawEllipseCancelButton.disabled = false
        cw.drawEllipseFinishButton.disabled = false
            cw.drawEllipseBotButton.disabled=false
}

function finishDrawEllipse()
{

    if(EditEllipse==true||ActiveEllipseCopy==true)
        finishEditEllipse()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemEllipseCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "ellipse"+new Date().getTime()
            domElemG.appendChild(finishedElem)
            finishedElem.setAttribute("id", id)

            finishedElem.setAttribute("onmousedown", "editEllipseDraw("+id+",evt)")

            var ctm = finishedElem.getCTM()
            RAD2DEG = 180 / Math.PI;
            var rotateAngle = Math.atan2(ctm.b, ctm.a) * RAD2DEG;
            finishedElem.setAttribute("rotateAngle", rotateAngle)

            finishedElem.setAttribute("class", "ellipseElem")

            ActiveElem = null
            activeElem = null

            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "placeDrawEllipse()") //---click to add more icons for this session---
            DrawX.style("display", "none")
            DragDot.style("visibility", "hidden")
            //topG.appendChild(dragDot)
            cw.drawEllipseFinishButton.disabled = true
            cw.drawEllipseCancelButton.disabled = true
            cw.drawEllipseBotButton.disabled=true
        }
}

function cancelDrawEllipse()
{
    var cw = addElemEllipseCw
    if(EditEllipse==true)
        cancelEditEllipse()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null
            // d3SVG.style("cursor", "default")
            ActiveElem = null

            mySVG.setAttribute('onclick', "placeDrawEllipse()") //---click to add more icons for this session---
            DragDot.style("visibility", "hidden")
           //topG.appendChild(dragDot)
            cw.drawEllipseFinishButton.disabled = true
            cw.drawEllipseBotButton.disabled=true
                cw.drawEllipseCancelButton.disabled = true
            cw.adjustedRotateEllipseValue.value = 0

            coverOff()

        }

        cw.drawEllipseCancelButton.style.borderColor = ""

}
//====================edit/update ellipse===============================

var EditEllipse = false
var DrawEllipseEditId
var EditThisEllipse
//--right button/mousedown on ellipse---
function editEllipseDraw(elemObjEdit, evt)
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

    if(isRightMB&&DrawEllipse==false&&ZoomDrawing==false)
    {
        elemSizeDiv.innerHTML = "rx = <input id=drawEllipseRxValue type='text' style='width:30px;border=0' /> ry = <input id=drawEllipseRyValue type='text' style='width:30px;border=0' />"

        EditThisEllipse = elemObjEdit

        DrawEllipseEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null

        EditEllipse = true
        if(addElemEllipseLoad==false)
        {
            openIframe("AddElem", "addElemEllipse", 10)

        }
        else if(addElemEllipseViz==false)
        {
            openIframe("AddElem", "addElemEllipse", 10)
            setEditEllipse()
        }
        else
            setEditEllipse()

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

        ZoomDraggedElems.push([dragTarget,"editEllipseDraw("+dragTarget.id+",evt)",classed])
    }
}
//---after iframe loaded see sendSize() at addElemEllipse.htm---
var EditEllipseObj
function setEditEllipse()
{
    coverOn()

    mySVG.removeAttribute('onclick')
    var cw = addElemEllipseCw
    var elemObjEdit = document.getElementById(DrawEllipseEditId)

    EditEllipseObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditEllipseObj.setAttribute("id", "activeElem")
    EditEllipseObj.setAttribute("class", "dragTargetObj")

    EditEllipseObj.removeAttribute("onmousedown")
    if(EditEllipseObj.getAttribute("filter"))
        cw.drawEllipseShadowCheck.checked = true

        domActiveElemG.insertBefore(EditEllipseObj, domActiveElemG.firstChild)

        ActiveElem = d3.select("#activeElem")
        activeElem = document.getElementById("activeElem")
        domActiveElemG.appendChild(dragDot) //--place drag dot on top---
        cw.drawEllipseDeleteButton.style.visibility = "visible"
        cw.drawEllipseEditSpan.innerHTML = "Edit Ellipse"
        cw.drawEllipseCopyButton.style.visibility = "visible"
        cw.drawEllipseTopButton.style.visibility = "visible"
        cw.drawEllipseBotButton.style.visibility = "visible"
        cw.drawEllipseTopTable.style.backgroundColor = "orange"
        cw.containerDiv.style.backgroundColor = "orange"
        cw.drawEllipseCancelButton.disabled = false
        cw.drawEllipseFinishButton.disabled = false
            cw.drawEllipseBotButton.disabled=false
        var stroke = EditEllipseObj.getAttribute("stroke")
        var strokeWidth = EditEllipseObj.getAttribute("stroke-width")
        var fill = EditEllipseObj.getAttribute("fill")
        var opacity = EditEllipseObj.getAttribute("fill-opacity")

        if(opacity!="0")
    {
        setSelect("Ellipse", "Opacity", opacity)
        setSelect("Ellipse", "Fill", fill)
        cw.drawEllipseFillBg.style.backgroundColor = fill
    }
    else
    {
        cw.drawEllipseFillBg.style.backgroundColor = ""
        cw.drawEllipseFillSelect.selectedIndex = 0

    }
      if(fill.indexOf("url")!=-1) //---gradient or pattern---
     {
        cw.drawEllipseFillBg.style.backgroundColor = ""
        cw.drawEllipseFillSelect.selectedIndex = 0

     }

    setSelect("Ellipse", "Stroke", stroke)
    setSelect("Ellipse", "StrokeWidth", strokeWidth)
    //---update bg colors---
    cw.drawEllipseStrokeBg.style.backgroundColor = stroke
    if(ActiveElem.attr("stroke-dasharray"))
        cw.drawEllipseStrokeDashCheck.checked = true
        else
            cw.drawEllipseStrokeDashCheck.checked = false

            var ctm = elemObjEdit.getCTM()
            RAD2DEG = 180 / Math.PI;
    var rotatedDeg = Math.atan2(ctm.b, ctm.a) * RAD2DEG;

    if(!rotatedDeg) rotatedDeg = 0
        cw.adjustedRotateEllipseValue.value = rotatedDeg
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

        // activeElem.setAttribute('onclick',"setEllipseEditDrag()")
        setEllipseEditDrag()

}

function setEllipseEditDrag()
{

    activeElem.removeAttribute("onmousedown")
    DragDot.style("visibility", "visible")
    mySVG.setAttribute("onmousedown", "startDragEllipse(evt)")
    mySVG.setAttribute("onmousemove", "dragEllipse(evt)")
    mySVG.setAttribute("onmouseup", "endDragEllipse(evt)")
    ActiveElem.style("cursor", "move")

}
function finishEditEllipse()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemEllipseCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "ellipseElem")
        finishedElem.setAttribute("onmousedown", "editEllipseDraw("+DrawEllipseEditId+",evt)")

        var rotate = ""
        if(RotateAngle!=0)
            rotate = "rotate("+RotateAngle+")"
            finishedElem.setAttribute("rotateAngle", RotateAngle)

            finishedElem.setAttribute("id", DrawEllipseEditId)

            domActiveElemG.removeChild(document.getElementById("activeElem"))
            finishedElem.style.cursor = "default"

            finishedElem.setAttribute("onmousedown", "editEllipseDraw("+DrawEllipseEditId+",evt)")
            finishedElem.setAttribute("id", DrawEllipseEditId)
            domElemG.insertBefore(finishedElem, EditThisEllipse)
            domElemG.removeChild(EditThisEllipse)

    }
    closeDrawEllipse()
}

function resetEditEllipse()   //---not used---
{

    var cw = addElemEllipseCw

    document.getElementById(DrawEllipseEditId).setAttribute("opacity", 1)

    EditEllipse = false
    cw.editEllipseSpan.innerText = "Draw Ellipses"
    cw.drawEllipseTopTable.style.backgroundColor = "honeydew"
    ActiveElem = null
    activeElem = null
    //topG.appendChild(dragDot) //--place drag dot on top---
    DrawX.style("display", "none")
    DrawX.attr("stroke", "violet")
    DragDot.style("visibility", "hidden")
    cw.drawEllipseCopyButton.style.visibility = "hidden"
    cw.drawEllipseTopButton.style.visibility = "hidden"
    //cw.drawEllipseBotButton.style.visibility = "hidden"
    cw.drawEllipseDeleteButton.style.visibility = "hidden"
    cw.drawEllipseCancelButton.disabled = false
    cw.drawEllipseFinishButton.disabled = false
    cw.drawEllipseBotButton.disabled=false
    DrawEllipse = true
    mySVG.setAttribute('onclick', "placeDrawEllipse()")

}

function cancelEditEllipse()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawEllipseEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null

    ActiveElem = null
    //topG.appendChild(dragDot) //--place drag dot on top---
    closeDrawEllipse()
    //setEditEllipse()

}
//-------------------copy ellipse-----------------
var ActiveEllipseCopy = false
var CopyEllipseArray =[]
var CopyEllipseTransX
var CopyEllipseTransY
//---toggle copy button----
function copyDrawEllipse()
{
    var cw = addElemEllipseCw
    ActiveEllipseCopy = true

    if(document.getElementById("activeElem"))
    {
        var copyMe = document.getElementById(DrawEllipseEditId)

        CopyEllipseTransX = 0
        CopyEllipseTransY = 0
        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "ellipseElem")
        finishedElem.removeAttribute("style")

        finishedElem.setAttribute("id", DrawEllipseEditId)
        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("id", DrawEllipseEditId)
        domElemG.insertBefore(finishedElem, copyMe)
        domElemG.removeChild(copyMe)

        CopyEllipseArray.push(finishedElem)

        cw.drawEllipseEditSpan.innerHTML = "Copy &amp; drag copies"

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
        DrawEllipse = false
        EditEllipse = false
        EllipseDeleted = false

        mySVG.setAttribute("onmousedown", "startDragEllipse(evt)")
        mySVG.setAttribute("onmousemove", "dragEllipse(evt)")
        mySVG.setAttribute("onmouseup", "endDragEllipse(evt)")

        mySVG.removeAttribute('onclick')

        cw.drawEllipseDeleteButton.style.visibility = "hidden"
        cw.drawEllipseTopButton.style.visibility = "hidden"
        cw.drawEllipseBotButton.style.visibility = "hidden"
        cw.drawEllipseCancelButton.disabled = true
    }
    var copyMe = document.getElementById(DrawEllipseEditId)
    var copied = copyMe.cloneNode(true)
    copied.setAttribute("style", "cursor:move")
    var id = "circle"+new Date().getTime()
    copied.setAttribute("id", id)
    copied.setAttribute("class", "dragTargetObj")
    copied.setAttribute("onmousedown", "tagCopyEllipse(evt)")
    CopyEllipseTransX += 10
    CopyEllipseTransY += 10

    var newTransform = mySVG.createSVGTransformFromMatrix(mySVG.createSVGMatrix().translate(CopyEllipseTransX, CopyEllipseTransY))
    copied.transform.baseVal.appendItem(newTransform)
    copied.transform.baseVal.consolidate()

    domElemG.appendChild(copied)
    CopyEllipseArray.push(copied)

}
var CopyEllipse
function tagCopyEllipse(evt)
{
    CopyEllipse = evt.target

}

//=======================delete ellipse==================
var EllipseDeleted = false
//---button---
function removeCurrentDrawEllipse()
{

    domActiveElemG.removeChild(activeElem)
    var elemObjEdit = document.getElementById(DrawEllipseEditId)
    domElemG.removeChild(elemObjEdit)
    EllipseDeleted = true

    closeDrawEllipse()

}
//====================Top/Bot===================
function topDrawEllipse()
{
        var elemObjEdit = document.getElementById(DrawEllipseEditId)
        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "ellipseElem")
        finishedElem.removeAttribute("style")
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("id", DrawEllipseEditId)

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        ActiveElem=null
        activeElem=null

        domElemG.removeChild(elemObjEdit)
        domElemG.appendChild(finishedElem)

        closeDrawEllipse()


}
function botDrawEllipse()
{
    if(EditEllipse)
    {
        var elemObjEdit = document.getElementById(DrawEllipseEditId)
        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "ellipseElem")
        finishedElem.removeAttribute("style")
        finishedElem.style.cursor = "default"
        finishedElem.setAttribute("id", DrawEllipseEditId)

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        ActiveElem=null
        activeElem=null


        domElemG.removeChild(elemObjEdit)
        domElemG.insertBefore(finishedElem,domElemG.firstChild)

        closeDrawEllipse()
   }
   else
   {
        finishDrawEllipse()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }

}



function showDrawEllipseStrokeBg()
{
    var cw = addElemEllipseCw
    var stroke = cw.drawEllipseStrokeSelect.options[cw.drawEllipseStrokeSelect.selectedIndex].value
    if(stroke!="none")
        cw.drawEllipseStrokeBg.style.backgroundColor = stroke
        else
            cw.drawEllipseStrokeBg.style.backgroundColor = ""
            if(ActiveElem)
            ActiveElem.attr("stroke", stroke)

}

function drawEllipseStrokeSelected()
{
    var cw = addElemEllipseCw
    var stroke = cw.drawEllipseStrokeSelect.options[cw.drawEllipseStrokeSelect.selectedIndex].value

    if(ActiveElem)
        ActiveElem.attr("stroke", stroke)

}

function showDrawEllipseFillBg()
{
    var cw = addElemEllipseCw
    var fill = cw.drawEllipseFillSelect.options[cw.drawEllipseFillSelect.selectedIndex].value
    if(fill!="none")
        cw.drawEllipseFillBg.style.backgroundColor = fill
        else
            cw.drawEllipseFillBg.style.backgroundColor = ""
            if(cw.drawEllipseFillSelect.selectedIndex==0)
        {
            ActiveElem.attr("fill", "white")
            ActiveElem.attr("fill-opacity", 0)

        }
        else if(ActiveElem)
        {
            ActiveElem.attr("fill", fill)
            var opacity = cw.drawEllipseOpacitySelect.options[cw.drawEllipseOpacitySelect.selectedIndex].text

            ActiveElem.attr("fill-opacity", opacity)

        }

}

function drawEllipseFillSelected()
{
    var cw = addElemEllipseCw
    var fill = cw.drawEllipseFillSelect.options[cw.drawEllipseFillSelect.selectedIndex].value
    if(cw.drawEllipseFillSelect.selectedIndex==0)
    {
        ActiveElem.attr("fill", "white")
        ActiveElem.attr("fill-opacity", 0)

    }
    else if(ActiveElem)
    {
        ActiveElem.attr("fill", fill)
        var opacity = cw.drawEllipseOpacitySelect.options[cw.drawEllipseOpacitySelect.selectedIndex].text

        ActiveElem.attr("fill-opacity", opacity)

    }

}

function drawEllipseOpacitySelected()
{
    var cw = addElemEllipseCw
    var opacity = cw.drawEllipseOpacitySelect.options[cw.drawEllipseOpacitySelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("fill-opacity", opacity)

}

function drawEllipseStrokeWidthSelected()
{
    var cw = addElemEllipseCw
    var strokeWidth = cw.drawEllipseStrokeWidthSelect.options[cw.drawEllipseStrokeWidthSelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("stroke-width", strokeWidth)

}

function drawEllipseStrokeDashChecked()
{
    var cw = addElemEllipseCw
    if(cw.drawEllipseStrokeDashCheck.checked==true)
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

function rotateEllipseAdjust(factor)
{
    var cw = addElemEllipseCw
    var mult = parseFloat(cw.rotateDrawEllipseAdjustSelect.options[cw.rotateDrawEllipseAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotateEllipseValue.value = rotateAdd+parseFloat(cw.adjustedRotateEllipseValue.value)

    if(ActiveElem)
    {
        rote("activeElem", rotateAdd)
        rote("domDrawX", rotateAdd)
    }
}

function drawEllipseShadowChecked()
{

    var cw = addElemEllipseCw
    if(cw.drawEllipseShadowCheck.checked==true)
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