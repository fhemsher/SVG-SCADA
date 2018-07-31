///---X button and iframe close all---
function closeDrawCircle()
{
    if(addElemCircleViz==true)
    {
        closeIframe("addElemCircle");
        coverOff()

        var cw = addElemCircleCw

        if(EditCircle==true && CircleDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawCircleEditId)
            elemObjEdit.style.display = "inline"

            elemObjEdit.setAttribute("onmousedown", "editCircleDraw("+DrawCircleEditId+",evt)")

        }
        DraggingObj = false
        DrawCircle = false
        EditCircle = false
        CircleDeleted = false

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")

        mySVG.removeAttribute('onclick')

        if(document.getElementById("activeElem"))
        {
            // alert(document.getElementById("activeElem").parentNode.getAttribute("id"))
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
        cw.drawCircleFinishButton.disabled = true
        cw.drawCircleCancelButton.disabled = true
        cw.drawCircleShadowCheck.checked = false
        cw.drawCircleCancelButton.style.borderColor = ""
        cw.drawCircleDeleteButton.style.visibility = "hidden"
        cw.drawCircleCopyButton.style.visibility = "hidden"
        cw.drawCircleBotButton.disabled=true

        cw.drawCircleEditSpan.innerText = "Draw Circles"
        cw.drawCircleTopTable.style.backgroundColor = "linen"
        cw.containerDiv.style.backgroundColor = "linen"

        //----copies---
        for(var k = 0; k<CopyCircleArray.length; k++)
        {
            var copy = CopyCircleArray[k]
            var id = copy.getAttribute("id")
            copy.setAttribute("onmousedown", "editCircleDraw("+id+",evt)")
            copy.setAttribute("class", "circleElem")
            copy.removeAttribute("style")
        }
        ActiveCircleCopy = false
        CopyCircleArray =[]

    }
}

//---on add icon DrawX follows cursor
function trackDrawCircle()
{
    var cw = addElemCircleCw

    if(ZoomDrawing==false&&ActiveElem==null&&EditCircle==false && CircleDeleted==false&&ActiveCircleCopy==false)
    {
        DrawX.style("display", "inline")
       DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")



    }
}

var EditCircle = false
var DrawCircle = false
var CircleDeleted = false

function startCircleDraw()
{
    var cw = addElemCircleCw
    elemSizeDiv.innerHTML = "r = <input id=drawCircleRadiusValue type='text' style='width:30px;border=0' /> "
    if(EditCircle==false)
    {
        ActiveElem = null
        activeElem = null
        DrawCircle = true
        DrawX.style("display", "inline")
        mySVG.setAttribute('onclick', "placeDrawCircle()") //---click to add more icons for this session---

    }

}

//--click on svg---
function placeDrawCircle()
{
    var cw = addElemCircleCw
    coverOn()

    var strokeColor = cw.drawCircleStrokeSelect.options[cw.drawCircleStrokeSelect.selectedIndex].value
    var strokeWidth = cw.drawCircleStrokeWidthSelect.options[cw.drawCircleStrokeWidthSelect.selectedIndex].value
    var fillColor = cw.drawCircleFillSelect.options[cw.drawCircleFillSelect.selectedIndex].value
    var opacity = cw.drawCircleOpacitySelect.options[cw.drawCircleOpacitySelect.selectedIndex].text
    if(cw.drawCircleFillSelect.selectedIndex==0)
    {
        fillColor = "white"
        opacity = 0
    }

    ActiveElem = ActiveElemG.append("circle")
    .attr("id", "activeElem")
    .attr("stroke", strokeColor)
    .attr("stroke-width", strokeWidth)
    .attr("fill", fillColor)
    .attr("fill-opacity", opacity)

    if(cw.drawCircleShadowCheck.checked==true)
        ActiveElem.attr("filter", "url(#drop-shadow)")

        if(cw.drawCircleStrokeDashCheck.checked==true)
        ActiveElem.attr("stroke-dasharray", "8 4")

        activeElem = document.getElementById("activeElem")
        domActiveElemG.appendChild(dragDot) //--place drag dot on top---

        DragDot.attr("cx", 20)

        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
        DragDot.attr("transform", "translate("+(SVGx)+" "+SVGy+")")
        CircleCenter =[SVGx, SVGy]
        ActiveElem.style("cursor", "move")
        ActiveElem.attr("class", "dragTargetObj")
        ActiveElem.attr("pointer-events", null)

        ActiveElem.attr("r", 20)

        DragDot.style("visibility", "visible")

        mySVG.removeAttribute('onclick')
        mySVG.style.cursor = ""
        mySVG.setAttribute("onmousedown", "startDragCircle(evt)")
        mySVG.setAttribute("onmousemove", "dragCircle(evt)")
        mySVG.setAttribute("onmouseup", "endDragCircle(evt)")

        cw.drawCircleCancelButton.disabled = false
        cw.drawCircleFinishButton.disabled = false
            cw.drawCircleBotButton.disabled=false
}

function finishDrawCircle()
{

    if(EditCircle==true||ActiveCircleCopy==true)
        finishEditCircle()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemCircleCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "circle"+new Date().getTime()

            finishedElem.setAttribute("id", id)

            mySVG.removeAttribute("onmousedown")
            mySVG.removeAttribute("onmousemove")
            mySVG.removeAttribute("onmouseup")

            finishedElem.setAttribute("onmousedown", "editCircleDraw("+id+",evt)")
            domElemG.appendChild(finishedElem)

            finishedElem.setAttribute("class", "circleElem")

            ActiveElem = null
            activeElem = null

            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "placeDrawCircle()") //---click to add more icons for this session---
            DrawX.style("display", "none")
            DragDot.style("visibility", "hidden")
            // topG.appendChild(dragDot)
            cw.drawCircleFinishButton.disabled = true
            cw.drawCircleCancelButton.disabled = true
            cw.drawCircleBotButton.disabled=true

        }
}

function cancelDrawCircle()
{
    var cw = addElemCircleCw
    if(EditCircle==true)
        cancelEditCircle()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "placeDrawCircle()") //---click to add more icons for this session---
            DragDot.style("visibility", "hidden")
            mySVG.appendChild(dragDot)
            cw.drawCircleFinishButton.disabled = true
            cw.drawCircleCancelButton.disabled = true
            cw.drawCircleBotButton.disabled=true
            coverOff()

        }

        cw.drawCircleCancelButton.style.borderColor = ""

}

//====================edit/update circle===============================

var EditCircle = false
var DrawCircleEditId
var EditThisCircle
//--mousedown/right button on circle---
function editCircleDraw(elemObjEdit, evt)
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

    if(isRightMB&&DrawCircle==false&&ZoomDrawing==false)
    {
        elemSizeDiv.innerHTML = "r = <input id=drawCircleRadiusValue type='text' style='width:30px;border=0' /> "

        EditThisCircle = elemObjEdit

        DrawCircleEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditCircle = true
        if(addElemCircleLoad==false)
        {
            openIframe("AddElem", "addElemCircle", 10)

        }
        else if(addElemCircleViz==false)
        {
            openIframe("AddElem", "addElemCircle", 10)
            setEditCircle()
        }
        else
            setEditCircle()

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
        ZoomDraggedElems.push([dragTarget,"editCircleDraw("+dragTarget.id+",evt)",classed])
    }



}
//---after iframe loaded see sendSize() at addElemCircle.htm---
var EditCircleObj
function setEditCircle()
{
    coverOn()

    var cw = addElemCircleCw

    var elemObjEdit = document.getElementById(DrawCircleEditId)

    EditCircleObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditCircleObj.setAttribute("id", "activeElem")
    EditCircleObj.setAttribute("class", "dragTargetObj")
    EditCircleObj.removeAttribute("onmousedown")

    if(EditCircleObj.getAttribute("filter"))
        cw.drawCircleShadowCheck.checked = true

        domActiveElemG.insertBefore(EditCircleObj, domActiveElemG.firstChild)
        ActiveElem = d3.select("#activeElem")
        activeElem = document.getElementById("activeElem")
        domActiveElemG.appendChild(dragDot) //--place drag dot on top---
        cw.drawCircleDeleteButton.style.visibility = "visible"
        cw.drawCircleTopButton.style.visibility = "visible"
        cw.drawCircleBotButton.style.visibility = "visible"

        cw.drawCircleEditSpan.innerHTML = "Edit Circle"
        cw.drawCircleTopTable.style.backgroundColor = "orange"
        cw.drawCircleCopyButton.style.visibility = "visible"
        cw.containerDiv.style.backgroundColor = "orange"
        cw.drawCircleCancelButton.disabled = false
        cw.drawCircleFinishButton.disabled = false
            cw.drawCircleBotButton.disabled=false
        var stroke = EditCircleObj.getAttribute("stroke")
        var strokeWidth = EditCircleObj.getAttribute("stroke-width")
        var fill = EditCircleObj.getAttribute("fill")


        var opacity = EditCircleObj.getAttribute("fill-opacity")

     if(opacity!="0")
    {
        setSelect("Circle", "Opacity", opacity)
        setSelect("Circle", "Fill", fill)
        cw.drawCircleFillBg.style.backgroundColor = fill
    }
    else
    {
        cw.drawCircleFillBg.style.backgroundColor = ""
        cw.drawCircleFillSelect.selectedIndex = 0

    }
     if(fill.indexOf("url")!=-1) //---gradient or pattern---
     {
        cw.drawCircleFillBg.style.backgroundColor = ""
        cw.drawCircleFillSelect.selectedIndex = 0

     }




    setSelect("Circle", "Stroke", stroke)
    setSelect("Circle", "StrokeWidth", strokeWidth)
    //---update bg colors---
    cw.drawCircleStrokeBg.style.backgroundColor = stroke
    if(ActiveElem.attr("stroke-dasharray"))
        cw.drawCircleStrokeDashCheck.checked = true
        else
            cw.drawCircleStrokeDashCheck.checked = false

            var matrix = activeElem.getCTM()

            var transX = matrix.e
            var transY = matrix.f

            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", ActiveElem.attr("transform"))
            var radius = parseFloat(ActiveElem.attr("r"))
            DragDot.attr("cx", radius)

            DragDot.attr("transform", "translate("+(transX)+" "+transY+")")

            //--place dragDot----
            setCircleEditDrag()

            mySVG.style.cursor = ""

}

function setCircleEditDrag()
{

    activeElem.removeAttribute("onmousedown")
    DragDot.style("visibility", "visible")
    mySVG.setAttribute("onmousedown", "startDragCircle(evt)")
    mySVG.setAttribute("onmousemove", "dragCircle(evt)")
    mySVG.setAttribute("onmouseup", "endDragCircle(evt)")
    ActiveElem.style("cursor", "move")

}

function finishEditCircle()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemCircleCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "circleElem")

        finishedElem.setAttribute("id", DrawCircleEditId)

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("onmousedown", "editCircleDraw("+DrawCircleEditId+",evt)")
        finishedElem.setAttribute("id", DrawCircleEditId)
        domElemG.insertBefore(finishedElem, EditThisCircle)
        domElemG.removeChild(EditThisCircle)

    }

    closeDrawCircle()
}

function resetEditCircle()
{

    var cw = addElemCircleCw

    document.getElementById(DrawCircleEditId).setAttribute("opacity", 1)

    EditCircle = false
    cw.drawCircleEditSpan.innerText = "Draw Circles"
    cw.drawCircleTopTable.style.backgroundColor = "honeydew"
    ActiveElem = null
    activeElem = null
    mySVG.appendChild(dragDot) //--place drag dot on top---
    DrawX.style("display", "none")
    DrawX.attr("stroke", "violet")
    DragDot.style("visibility", "hidden")
    cw.drawCircleCopyButton.style.visibility = "hidden"
    cw.drawCircleDeleteButton.style.visibility = "hidden"
    cw.drawCircleCancelButton.disabled = false
    cw.drawCircleFinishButton.disabled = false
    DrawCircle = true
    mySVG.setAttribute('onclick', "placeDrawCircle()")

}

function cancelEditCircle()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawCircleEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null
    ActiveElem = null
    mySVG.appendChild(dragDot) //--place drag dot on top---
    closeDrawCircle()

}
//-------------------copy circle-----------------
var ActiveCircleCopy = false
var CopyCircleArray =[]
var CopyCircleTransX
var CopyCircleTransY
//---toggle copy button----
function copyDrawCircle()
{
    var cw = addElemCircleCw
    ActiveCircleCopy = true

    if(document.getElementById("activeElem"))
    {
        var copyMe = document.getElementById(DrawCircleEditId)

        CopyCircleTransX = 0
        CopyCircleTransY = 0
        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "circleElem")
        finishedElem.removeAttribute("style")

        finishedElem.setAttribute("id", DrawCircleEditId)
        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("id", DrawCircleEditId)
        domElemG.insertBefore(finishedElem, copyMe)
        domElemG.removeChild(copyMe)

        CopyCircleArray.push(finishedElem)

        cw.drawCircleEditSpan.innerHTML = "Copy &amp; drag copies"

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
        DrawCircle = false
        EditCircle = false
        CircleDeleted = false

        mySVG.setAttribute("onmousedown", "startDragCircle(evt)")
        mySVG.setAttribute("onmousemove", "dragCircle(evt)")
        mySVG.setAttribute("onmouseup", "endDragCircle(evt)")

        mySVG.removeAttribute('onclick')
        cw.drawCircleDeleteButton.style.visibility = "hidden"
        cw.drawCircleCancelButton.disabled = true
        cw.drawCircleTopButton.style.visibility = "hidden"
        cw.drawCircleBotButton.style.visibility = "hidden"
    }
    var copyMe = document.getElementById(DrawCircleEditId)
    var copied = copyMe.cloneNode(true)
    copied.setAttribute("style", "cursor:move")
    var id = "circle"+new Date().getTime()
    copied.setAttribute("id", id)
    copied.setAttribute("class", "dragTargetObj")
    copied.setAttribute("onmousedown", "tagCopyCircle(evt)")
    CopyCircleTransX += 10
    CopyCircleTransY += 10

    var newTransform = mySVG.createSVGTransformFromMatrix(mySVG.createSVGMatrix().translate(CopyCircleTransX, CopyCircleTransY))
    copied.transform.baseVal.appendItem(newTransform)
    copied.transform.baseVal.consolidate()

    domElemG.appendChild(copied)
    CopyCircleArray.push(copied)

}
var CopyCircle
function tagCopyCircle(evt)
{
    CopyCircle = evt.target

}

//=======================delete circle==================
var CircleDeleted = false
//---button---
function removeCurrentDrawCircle()
{

    domActiveElemG.removeChild(activeElem)
    var elemObjEdit = document.getElementById(DrawCircleEditId)
    domElemG.removeChild(elemObjEdit)
    CircleDeleted = true

    var cw = addElemCircleCw

    closeDrawCircle()

}

//====================Top/Bot===================
function topDrawCircle()
{

    var elemObjEdit = document.getElementById(DrawCircleEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "circleElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawCircleEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))

    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)

    closeDrawCircle()
}
function botDrawCircle()
{
    if(EditCircle)
    {
        var elemObjEdit = document.getElementById(DrawCircleEditId)
        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "circleElem")
        finishedElem.removeAttribute("style")
        finishedElem.style.cursor = "default"
        finishedElem.setAttribute("id", DrawCircleEditId)

        domActiveElemG.removeChild(document.getElementById("activeElem"))

        domElemG.removeChild(elemObjEdit)
        domElemG.insertBefore(finishedElem,domElemG.firstChild)

       closeDrawCircle()
   }
   else
   {
        finishDrawCircle()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }

}


function showDrawCircleStrokeBg()
{
    var cw = addElemCircleCw
    var stroke = cw.drawCircleStrokeSelect.options[cw.drawCircleStrokeSelect.selectedIndex].value
    if(stroke!="none")
        cw.drawCircleStrokeBg.style.backgroundColor = stroke
        else
            cw.drawCircleStrokeBg.style.backgroundColor = ""
            if(ActiveElem)
            ActiveElem.attr("stroke", stroke)

}

function drawCircleStrokeSelected()
{
    var cw = addElemCircleCw
    var stroke = cw.drawCircleStrokeSelect.options[cw.drawCircleStrokeSelect.selectedIndex].value

    if(ActiveElem)
        ActiveElem.attr("stroke", stroke)

}

function showDrawCircleFillBg()
{
    var cw = addElemCircleCw
    var fill = cw.drawCircleFillSelect.options[cw.drawCircleFillSelect.selectedIndex].value
    if(fill!="none")
        cw.drawCircleFillBg.style.backgroundColor = fill
        else
            cw.drawCircleFillBg.style.backgroundColor = ""
        if(ActiveElem&&cw.drawCircleFillSelect.selectedIndex==0)
        {  
            ActiveElem.attr("fill", "white")
            ActiveElem.attr("fill-opacity", 0)

        }
        else if(ActiveElem)
        {
            ActiveElem.attr("fill", fill)
            var opacity = cw.drawCircleOpacitySelect.options[cw.drawCircleOpacitySelect.selectedIndex].text

            ActiveElem.attr("fill-opacity", opacity)

        }

}

function drawCircleFillSelected()
{
    var cw = addElemCircleCw
    var fill = cw.drawCircleFillSelect.options[cw.drawCircleFillSelect.selectedIndex].value
    if(cw.drawCircleFillSelect.selectedIndex==0)
    {
        ActiveElem.attr("fill", "white")
        ActiveElem.attr("fill-opacity", 0)

    }
    else if(ActiveElem)
    {
        ActiveElem.attr("fill", fill)
        var opacity = cw.drawCircleOpacitySelect.options[cw.drawCircleOpacitySelect.selectedIndex].text

        ActiveElem.attr("fill-opacity", opacity)

    }

}

function drawCircleOpacitySelected()
{
    var cw = addElemCircleCw
    var opacity = cw.drawCircleOpacitySelect.options[cw.drawCircleOpacitySelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("fill-opacity", opacity)

}

function drawCircleStrokeWidthSelected()
{
    var cw = addElemCircleCw
    var strokeWidth = cw.drawCircleStrokeWidthSelect.options[cw.drawCircleStrokeWidthSelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("stroke-width", strokeWidth)

}

function drawCircleStrokeDashChecked()
{
    var cw = addElemCircleCw
    if(cw.drawCircleStrokeDashCheck.checked==true)
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

function drawCircleShadowChecked()
{

    var cw = addElemCircleCw
    if(cw.drawCircleShadowCheck.checked==true)
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