

///---X button and iframe close all---
function closeDrawRect()
{
    if(addElemRectViz==true)
    {
        closeIframe("addElemRect");
        coverOff()

        RotateAngle = 0
        var cw = addElemRectCw
        cw.adjustedRotateRectValue.value = 0
        var elemTimelinded = false

        if(EditRect==true && RectDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawRectEditId)
            elemObjEdit.style.display = "inline"
            elemObjEdit.setAttribute("onmousedown", "editRectDraw("+DrawRectEditId+",evt)")

        }
        DraggingObj = false
        DrawRect = false
        EditRect = false
        RectDeleted = false
        cw.drawRectStrokeRoundCheck.checked=false
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
        cw.drawRectCopyButton.style.visibility = "hidden"
        cw.drawRectTopButton.style.visibility = "hidden"
       // cw.drawRectBotButton.style.visibility = "hidden"
            cw.drawRectBotButton.disabled=true
        cw.drawRectFinishButton.disabled = true
        cw.drawRectCancelButton.disabled = true
        cw.drawRectCancelButton.style.borderColor = ""
        cw.drawRectDeleteButton.style.visibility = "hidden"
        cw.drawRectEditSpan.innerText = "Draw Rects"
        cw.drawRectTopTable.style.backgroundColor = "linen"
        cw.containerDiv.style.backgroundColor = "linen"
        //----copies---
        for(var k = 0; k<CopyRectArray.length; k++)
        {
            var copy = CopyRectArray[k]
            var id = copy.getAttribute("id")
            copy.setAttribute("onmousedown", "editRectDraw("+id+",evt)")
            copy.setAttribute("class", "rectElem")

            copy.removeAttribute("style")
        }

        ActiveRectCopy = false
        CopyRectArray =[]

    }
}




//---on add icon DrawX follows cursor
function trackDrawRect()
{

    if(ActiveElem==null&&EditRect==false && RectDeleted==false&&ActiveRectCopy==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")

    }
}

var EditRect = false
var DrawRect = false
var RectDeleted = false



function startRectDraw()
{
    RotateAngle = 0
    elemSizeDiv.innerHTML = "w = <input id=drawRectWidthValue type='text' style='width:30px;border=0' /> h = <input id=drawRectHeightValue type='text' style='width:30px;border=0' />"

    var cw = addElemRectCw
    if(EditRect==false)
    {
        activeElem = null

        ActiveElem = null
        DrawRect = true
        mySVG.setAttribute('onclick', " placeDrawRect()") //---click to add more icons for this session---
        DrawX.style("display", "inline")
    }

    if(cw.adjustedRotateRectValue)
        cw.adjustedRotateRectValue.value = 0
}


//--click on svg---
function placeDrawRect()
{
    var cw = addElemRectCw
    coverOn()

    var strokeColor = cw.drawRectStrokeSelect.options[cw.drawRectStrokeSelect.selectedIndex].value
    var strokeWidth = cw.drawRectStrokeWidthSelect.options[cw.drawRectStrokeWidthSelect.selectedIndex].value
    var fillColor = cw.drawRectFillSelect.options[cw.drawRectFillSelect.selectedIndex].value
    var opacity = cw.drawRectOpacitySelect.options[cw.drawRectOpacitySelect.selectedIndex].text
    var cornerRadius = cw.rectCornerRadiusSelect.options[cw.rectCornerRadiusSelect.selectedIndex].text
    if(cw.drawRectFillSelect.selectedIndex==0)
    {
        fillColor = "white"
        opacity = 0
    }

    ActiveElem = ActiveElemG.append("rect")
    .attr("id", "activeElem")
    .attr("stroke", strokeColor)
    .attr("stroke-width", strokeWidth)
    .attr("fill", fillColor)
    .attr("fill-opacity", opacity)
    if(cw.drawRectShadowCheck.checked==true)
        ActiveElem.attr("filter", "url(#drop-shadow)")

        if(cw.drawRectStrokeDashCheck.checked==true)
        ActiveElem.attr("stroke-dasharray", "8 4")

        if(cw.drawRectStrokeRoundCheck.checked==true)
        {

            ActiveElem.attr("rx", cornerRadius)
            ActiveElem.attr("ry", cornerRadius)

        }
        activeElem = document.getElementById("activeElem")
        domActiveElemG.appendChild(dragDot) //--place drag dot on top---

        DragDot.attr("cx", 20)
        DragDot.attr("cy", 20)

        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
        DragDot.attr("transform", "translate("+(SVGx)+" "+SVGy+")")
        RectCenter =[SVGx, SVGy]
        ActiveElem.style("cursor", "move")
        ActiveElem.attr("class", "dragTargetObj")
        ActiveElem.attr("pointer-events", null)

        ActiveElem.attr("width", 20)
        ActiveElem.attr("height", 20)

        DragDot.style("visibility", "visible")

        mySVG.removeAttribute('onclick')
        mySVG.style.cursor = ""
        mySVG.setAttribute("onmousedown", "startDragRect(evt)")
        mySVG.setAttribute("onmousemove", "dragRect(evt)") //;showStarComment(evt)
        mySVG.setAttribute("onmouseup", "endDragRect(evt)")

        cw.drawRectCancelButton.disabled = false
        cw.drawRectFinishButton.disabled = false
            cw.drawRectBotButton.disabled=false
}



function finishDrawRect()
{

    if(EditRect==true||ActiveRectCopy==true)
        finishEditRect()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemRectCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "rect"+new Date().getTime()
            domElemG.appendChild(finishedElem)
            finishedElem.setAttribute("id", id)

            finishedElem.setAttribute("onmousedown", "editRectDraw("+id+",evt)")

            var ctm = finishedElem.getCTM()
            RAD2DEG = 180 / Math.PI;
            var rotateAngle = Math.atan2(ctm.b, ctm.a) * RAD2DEG;
            finishedElem.setAttribute("rotateAngle", rotateAngle)

            finishedElem.setAttribute("class", "rectElem")

            ActiveElem = null
            activeElem = null

            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "placeDrawRect()") //---click to add more icons for this session---
            DrawX.style("display", "none")
            DragDot.style("visibility", "hidden")
            //topG.appendChild(dragDot)
            cw.drawRectFinishButton.disabled = true
            cw.drawRectCancelButton.disabled = true
            cw.drawRectBotButton.disabled=true
        }
}




function cancelDrawRect()
{
    var cw = addElemRectCw
    if(EditRect==true)
        cancelEditRect()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null
            // d3SVG.style("cursor", "default")
            ActiveElem = null

            mySVG.setAttribute('onclick', "placeDrawRect()") //---click to add more icons for this session---
            DragDot.style("visibility", "hidden")
           //topG.appendChild(dragDot)
            cw.drawRectFinishButton.disabled = true
            cw.drawRectBotButton.disabled=true
                cw.drawRectCancelButton.disabled = true
            cw.adjustedRotateRectValue.value = 0

            coverOff()

        }

        cw.drawRectCancelButton.style.borderColor = ""

}
//====================edit/update rect===============================

var EditRect = false
var DrawRectEditId
var EditThisRect
function editRectDraw(elemObjEdit, evt) //--right button/mousedown on rect---
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

    if(isRightMB&&DrawRect==false&&ZoomDrawing==false)
    {
        EditThisRect = elemObjEdit
        elemSizeDiv.innerHTML = "w = <input id=drawRectWidthValue type='text' style='width:30px;border=0' /> h = <input id=drawRectHeightValue type='text' style='width:30px;border=0' />"

        DrawRectEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        EditRect = true
        if(addElemRectLoad==false)
        {
            openIframe("AddElem", "addElemRect", 10)

        }
        else if(addElemRectViz==false)
        {
            openIframe("AddElem", "addElemRect", 10)
            setEditRect()
        }
        else
            setEditRect()

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
        ZoomDraggedElems.push([dragTarget,"editRectDraw("+dragTarget.id+",evt)",classed])
    }
}
//---after iframe loaded see sendSize() at addElemRect.htm---
var EditRectObj

function setEditRect()
{
    coverOn()

    mySVG.removeAttribute('onclick')
    var cw = addElemRectCw
    var elemObjEdit = document.getElementById(DrawRectEditId)

    EditRectObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditRectObj.setAttribute("id", "activeElem")
    EditRectObj.setAttribute("class", "dragTargetObj")

    EditRectObj.removeAttribute("onmousedown")
    if(EditRectObj.getAttribute("filter"))
        cw.drawRectShadowCheck.checked = true

        domActiveElemG.insertBefore(EditRectObj, domActiveElemG.firstChild)

        ActiveElem = d3.select("#activeElem")
        activeElem = document.getElementById("activeElem")
        domActiveElemG.appendChild(dragDot) //--place drag dot on top---
        cw.drawRectDeleteButton.style.visibility = "visible"
        cw.drawRectEditSpan.innerHTML = "Edit Rect"
        cw.drawRectCopyButton.style.visibility = "visible"
        cw.drawRectTopButton.style.visibility = "visible"
        cw.drawRectBotButton.style.visibility = "visible"
        cw.drawRectTopTable.style.backgroundColor = "orange"
        cw.containerDiv.style.backgroundColor = "orange"
        cw.drawRectCancelButton.disabled = false
        cw.drawRectFinishButton.disabled = false
            cw.drawRectBotButton.disabled=false
        var stroke = EditRectObj.getAttribute("stroke")
        var strokeWidth = EditRectObj.getAttribute("stroke-width")
        var fill = EditRectObj.getAttribute("fill")
        var opacity = EditRectObj.getAttribute("fill-opacity")
        var cornerRadius = +EditRectObj.getAttribute("rx")
     if(cornerRadius)
     {
        cw.drawRectStrokeRoundCheck.checked=true
        cw.rectCornerRadiusSelect.selectedIndex=cornerRadius/4-1
     }


     if(opacity!="0")
    {
        setSelect("Rect", "Opacity", opacity)
        setSelect("Rect", "Fill", fill)
        cw.drawRectFillBg.style.backgroundColor = fill
    }
    else
    {
        cw.drawRectFillBg.style.backgroundColor = ""
        cw.drawRectFillSelect.selectedIndex = 0

    }
     if(fill.indexOf("url")!=-1) //---gradient or pattern---
     {
        cw.drawRectFillBg.style.backgroundColor = ""
        cw.drawRectFillSelect.selectedIndex = 0

     }




    setSelect("Rect", "Stroke", stroke)
    setSelect("Rect", "StrokeWidth", strokeWidth)
    //---update bg colors---
    cw.drawRectStrokeBg.style.backgroundColor = stroke
    if(ActiveElem.attr("stroke-dasharray"))
        cw.drawRectStrokeDashCheck.checked = true
        else
            cw.drawRectStrokeDashCheck.checked = false

            var ctm = elemObjEdit.getCTM()
            RAD2DEG = 180 / Math.PI;
    var rotatedDeg = Math.atan2(ctm.b, ctm.a) * RAD2DEG;

    if(!rotatedDeg) rotatedDeg = 0
        cw.adjustedRotateRectValue.value = rotatedDeg
        var matrix = activeElem.getCTM()

        var transX = matrix.e
        var transY = matrix.f

        DrawX.attr("stroke", "darkorange")
        DrawX.style("display", "inline")
        DrawX.attr("transform", ActiveElem.attr("transform"))
        var width = parseFloat(ActiveElem.attr("width"))
        var height = parseFloat(ActiveElem.attr("height"))
        DragDot.attr("cx", width)
        DragDot.attr("cy", height)

        DragDot.attr("transform", "translate("+transX+" "+transY+")")

        mySVG.style.cursor = ""

        // activeElem.setAttribute('onclick',"setRectEditDrag()")
        setRectEditDrag()

}
function setRectEditDrag()
{

    activeElem.removeAttribute("onmousedown")
    DragDot.style("visibility", "visible")

    //---timeout??---
    mySVG.setAttribute("onmousedown", "startDragRect(evt)")
    mySVG.setAttribute("onmousemove", "dragRect(evt)")
    mySVG.setAttribute("onmouseup", "endDragRect(evt)")
    ActiveElem.style("cursor", "move")

}




function finishEditRect()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemRectCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "rectElem")
        finishedElem.setAttribute("onmousedown", "editRectDraw("+DrawRectEditId+",evt)")

        var rotate = ""
        if(RotateAngle!=0)
            rotate = "rotate("+RotateAngle+")"
            finishedElem.setAttribute("rotateAngle", RotateAngle)

            finishedElem.setAttribute("id", DrawRectEditId)

            domActiveElemG.removeChild(document.getElementById("activeElem"))
            finishedElem.style.cursor = "default"

            finishedElem.setAttribute("onmousedown", "editRectDraw("+DrawRectEditId+",evt)")
            finishedElem.setAttribute("id", DrawRectEditId)
            domElemG.insertBefore(finishedElem, EditThisRect)
            domElemG.removeChild(EditThisRect)

    }
    closeDrawRect()
}



function cancelEditRect()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawRectEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null

    ActiveElem = null
    //topG.appendChild(dragDot) //--place drag dot on top---
    closeDrawRect()
    //setEditEllipse()

}


//-------------------copy rect-----------------
var ActiveRectCopy = false
var CopyRectArray =[]
var CopyRectTransX
var CopyRectTransY
//---toggle copy button----
function copyDrawRect()
{
    var cw = addElemRectCw
    ActiveRectCopy = true

    if(document.getElementById("activeElem"))
    {
        var copyMe = document.getElementById(DrawRectEditId)

        CopyRectTransX = 0
        CopyRectTransY = 0
        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "rectElem")
        finishedElem.removeAttribute("style")

        finishedElem.setAttribute("id", DrawRectEditId)
        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("id", DrawRectEditId)
        domElemG.insertBefore(finishedElem, copyMe)
        domElemG.removeChild(copyMe)

        CopyRectArray.push(finishedElem)

        cw.drawRectEditSpan.innerHTML = "Copy &amp; drag copies"

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
        DrawRect = false
        EditRect = false
        RectDeleted = false

        mySVG.setAttribute("onmousedown", "startDragRect(evt)")
        mySVG.setAttribute("onmousemove", "dragRect(evt)")
        mySVG.setAttribute("onmouseup", "endDragRect(evt)")

        mySVG.removeAttribute('onclick')
        cw.drawRectDeleteButton.style.visibility = "hidden"
        cw.drawRectCancelButton.disabled = true
        cw.drawRectTopButton.style.visibility = "hidden"
        cw.drawRectBotButton.style.visibility = "hidden"
    }
    var copyMe = document.getElementById(DrawRectEditId)
    var copied = copyMe.cloneNode(true)
    copied.setAttribute("style", "cursor:move")
    var id = "circle"+new Date().getTime()
    copied.setAttribute("id", id)
    copied.setAttribute("class", "dragTargetObj")
    copied.setAttribute("onmousedown", "tagCopyRect(evt)")
    CopyRectTransX += 10
    CopyRectTransY += 10

    var newTransform = mySVG.createSVGTransformFromMatrix(mySVG.createSVGMatrix().translate(CopyRectTransX, CopyRectTransY))
    copied.transform.baseVal.appendItem(newTransform)
    copied.transform.baseVal.consolidate()

    domElemG.appendChild(copied)
    CopyRectArray.push(copied)

}
var CopyRect
function tagCopyRect(evt)
{
    CopyRect = evt.target

}

//=======================delete rect==================
var RectDeleted = false
//---button---
function removeCurrentDrawRect()
{

    var cw = addElemRectCw
    mySVG.appendChild(dragDot)
    domActiveElemG.removeChild(activeElem)
    var elemObjEdit = document.getElementById(DrawRectEditId)
    domElemG.removeChild(elemObjEdit)
    RectDeleted = true

    closeDrawRect()

}

//====================Top/Bot===================
function topDrawRect()
{
        var elemObjEdit = document.getElementById(DrawRectEditId)
        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "rectElem")
        finishedElem.removeAttribute("style")
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("id", DrawRectEditId)

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        ActiveElem=null
        activeElem=null

        domElemG.removeChild(elemObjEdit)
        domElemG.appendChild(finishedElem)

        closeDrawRect()


}
function botDrawRect()
{
    if(EditRect)
    {
        var elemObjEdit = document.getElementById(DrawRectEditId)
        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "rectElem")
        finishedElem.removeAttribute("style")
        finishedElem.style.cursor = "default"
        finishedElem.setAttribute("id", DrawRectEditId)

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        ActiveElem=null
        activeElem=null


        domElemG.removeChild(elemObjEdit)
        domElemG.insertBefore(finishedElem,domElemG.firstChild)

        closeDrawRect()
   }
   else
   {
        finishDrawRect()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }

}



function showDrawRectStrokeBg()
{
    var cw = addElemRectCw
    var stroke = cw.drawRectStrokeSelect.options[cw.drawRectStrokeSelect.selectedIndex].value
    if(stroke!="none")
        cw.drawRectStrokeBg.style.backgroundColor = stroke
        else
            cw.drawRectStrokeBg.style.backgroundColor = ""
            if(ActiveElem)
            ActiveElem.attr("stroke", stroke)

}

function drawRectStrokeSelected()
{
    var cw = addElemRectCw
    var stroke = cw.drawRectStrokeSelect.options[cw.drawRectStrokeSelect.selectedIndex].value

    if(ActiveElem)
        ActiveElem.attr("stroke", stroke)

}

function showDrawRectFillBg()
{
    var cw = addElemRectCw
    var fill = cw.drawRectFillSelect.options[cw.drawRectFillSelect.selectedIndex].value
    if(fill!="none")
        cw.drawRectFillBg.style.backgroundColor = fill
        else
            cw.drawRectFillBg.style.backgroundColor = ""
         if(ActiveElem&&cw.drawRectFillSelect.selectedIndex==0)
        {
            ActiveElem.attr("fill", "white")
            ActiveElem.attr("fill-opacity", 0)

        }
        else if(ActiveElem)
        {
            ActiveElem.attr("fill", fill)
            var opacity = cw.drawRectOpacitySelect.options[cw.drawRectOpacitySelect.selectedIndex].text

            ActiveElem.attr("fill-opacity", opacity)

        }

}

function drawRectFillSelected()
{
    var cw = addElemRectCw
    var fill = cw.drawRectFillSelect.options[cw.drawRectFillSelect.selectedIndex].value
    if(ActiveElem&&cw.drawRectFillSelect.selectedIndex==0)
    {
        ActiveElem.attr("fill", "white")
        ActiveElem.attr("fill-opacity", 0)

    }
    else if(ActiveElem)
    {
        ActiveElem.attr("fill", fill)
        var opacity = cw.drawRectOpacitySelect.options[cw.drawRectOpacitySelect.selectedIndex].text

        ActiveElem.attr("fill-opacity", opacity)

    }

}

function drawRectOpacitySelected()
{
    var cw = addElemRectCw
    var opacity = cw.drawRectOpacitySelect.options[cw.drawRectOpacitySelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("fill-opacity", opacity)

}

function drawRectStrokeWidthSelected()
{
    var cw = addElemRectCw
    var strokeWidth = cw.drawRectStrokeWidthSelect.options[cw.drawRectStrokeWidthSelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("stroke-width", strokeWidth)

}

function drawRectStrokeDashChecked()
{
    var cw = addElemRectCw
    if(cw.drawRectStrokeDashCheck.checked==true)
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
function rectCornerRadiusSelected()
{
    var cw = addElemRectCw
    var cornerRadius = cw.rectCornerRadiusSelect.options[cw.rectCornerRadiusSelect.selectedIndex].value

    if(ActiveElem &&cw.drawRectStrokeRoundCheck.checked==true)
    {
    ActiveElem.attr("rx", cornerRadius)
    ActiveElem.attr("ry", cornerRadius)

    }


}
function drawRectStrokeRoundChecked()
{
    var cw = addElemRectCw
    var cornerRadius = cw.rectCornerRadiusSelect.options[cw.rectCornerRadiusSelect.selectedIndex].value
    if(ActiveElem)
    {
        if(cw.drawRectStrokeRoundCheck.checked==true)
        {

            ActiveElem.attr("rx",cornerRadius)
            ActiveElem.attr("ry",cornerRadius)

        }
        else
        {
            ActiveElem.attr("rx", null)
            ActiveElem.attr("ry", null)

        }

    }
}
function rotateRectAdjust(factor)
{
    var cw = addElemRectCw
    var mult = parseFloat(cw.rotateDrawRectAdjustSelect.options[cw.rotateDrawRectAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotateRectValue.value = rotateAdd+parseFloat(cw.adjustedRotateRectValue.value)

    if(ActiveElem)
    {
        rote("activeElem", rotateAdd)
        rote("domDrawX", rotateAdd)
    }
}

function drawRectShadowChecked()
{

    var cw = addElemRectCw
    if(cw.drawRectShadowCheck.checked==true)
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