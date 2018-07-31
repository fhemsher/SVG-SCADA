
//----create regular polygon based on a radius length:circumradius (radius of a circle passing through all points)--
function regPolyCircleRad(vCnt, radius, centerX, centerY)
{

    activeElem.setAttribute("vCnt", vCnt)
    activeElem.setAttribute("radius", radius)
    var myPoints = activeElem.points
    myPoints.clear()
    var polyXPts = Array(vCnt);
    var polyYPts = Array(vCnt);
    var vertexAngle = 360/vCnt;
    //---init polygon points processor---
    for(var v = 0; v<vCnt; v++)
    {
        theAngle = (v*vertexAngle)*Math.PI/180;
        polyXPts[v] = radius*Math.cos(theAngle);
        polyYPts[v] = -radius*Math.sin(theAngle);
    }
    //--note points are CCW(this is important for future ref)---
    for(var v = 0; v<vCnt; v++)
    {
        var point = mySVG.createSVGPoint();
        point.x = centerX+polyXPts[v]
        point.y = centerY+polyYPts[v]
        myPoints.appendItem(point)
    }
}

///---X button and iframe close all---
function closeDrawPolygon()
{
    if(addElemPolygonViz==true)
    {
        closeIframe("addElemPolygon");
        coverOff()

        var cw = addElemPolygonCw

        if(EditPolygon==true && PolygonDeleted==false)
        {         mySVG.appendChild(dragDot) //--place drag dot on top---
            dragDot.removeAttribute("cx")
            var elemObjEdit = document.getElementById(DrawPolygonEditId)
            elemObjEdit.style.display = "inline"
             if(domActiveElemG.childNodes.length>0)
             domActiveElemG.removeChild(domActiveElemG.firstChild)
            elemObjEdit.setAttribute("onmousedown", "editPolygonDraw("+DrawPolygonEditId+",evt)")

        }
        DraggingObj = false
        DrawPolygon = false
        EditPolygon = false
        PolygonDeleted = false

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
        cw.adjustedRotatePolygonValue.value = 0
        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)
        DragDot.attr("cx", null)
        DragDot.attr("transform", null)
        DragDot.style("visibility", "hidden")
        cw.drawPolygonFinishButton.disabled = true
        cw.drawPolygonCancelButton.disabled = true
        cw.drawPolygonCancelButton.style.borderColor = ""
        cw.drawPolygonDeleteButton.style.visibility = "hidden"
        cw.drawPolygonCopyButton.style.visibility = "hidden"
        cw.drawPolygonTopButton.style.visibility = "hidden"
       // cw.drawEllipseBotButton.style.visibility = "hidden"
            cw.drawPolygonBotButton.disabled=true
        cw.drawPolygonEditSpan.innerText = "Draw Polygons"
        cw.drawPolygonTopTable.style.backgroundColor = "linen"
        cw.containerDiv.style.backgroundColor = "linen"
        //----copies---
        for(var k = 0; k<CopyPolygonArray.length; k++)
        {
            var copy = CopyPolygonArray[k]
            var id = copy.getAttribute("id")
            copy.setAttribute("onmousedown", "editPolygonDraw("+id+",evt)")
            copy.setAttribute("class", "polygonElem")
            copy.removeAttribute("style")
        }
        ActivePolygonCopy = false
        CopyPolygonArray =[]
        showSourceSVG()
    }
}

//---on add icon DrawX follows cursor
function trackDrawPolygon()
{
    var cw = addElemPolygonCw

    if(ActiveElem==null&&EditPolygon==false && PolygonDeleted==false&&ActivePolygonCopy==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }
}

var EditPolygon = false
var DrawPolygon = false
var PolygonDeleted = false

function startPolygonDraw()
{
    var cw = addElemPolygonCw
    if(EditPolygon==false)
    {
        ActiveElem = null
        activeElem = null
        DrawPolygon = true
        DrawX.style("display", "inline")
        mySVG.setAttribute('onclick', "placeDrawPolygon()") //---click to add more icons for this session---

    }
    if(cw.adjustedRotatePolygonValue)
        cw.adjustedRotatePolygonValue.value = 0
}

//--click on svg---
function placeDrawPolygon()
{
    var cw = addElemPolygonCw
    coverOn()

    var strokeColor = cw.drawPolygonStrokeSelect.options[cw.drawPolygonStrokeSelect.selectedIndex].value
    var strokeWidth = cw.drawPolygonStrokeWidthSelect.options[cw.drawPolygonStrokeWidthSelect.selectedIndex].value
    var fillColor = cw.drawPolygonFillSelect.options[cw.drawPolygonFillSelect.selectedIndex].value
    var opacity = cw.drawPolygonOpacitySelect.options[cw.drawPolygonOpacitySelect.selectedIndex].text
    if(cw.drawPolygonFillSelect.selectedIndex==0)
    {
        fillColor = "white"
        opacity = 0
    }

    ActiveElem = ActiveElemG.append("polygon")
    .attr("id", "activeElem")
    .attr("stroke", strokeColor)
    .attr("stroke-width", strokeWidth)
    .attr("fill", fillColor)
    .attr("fill-opacity", opacity)

    if(cw.drawPolygonShadowCheck.checked==true)
        ActiveElem.attr("filter", "url(#drop-shadow)")

        if(cw.drawPolygonStrokeDashCheck.checked==true)
        ActiveElem.attr("stroke-dasharray", "8 4")

        activeElem = document.getElementById("activeElem")
        var radius = +cw.drawPolygonRadiusSelect.options[cw.drawPolygonRadiusSelect.selectedIndex].text
        var vCnt = +cw.drawPolygonVerticeSelect.options[cw.drawPolygonVerticeSelect.selectedIndex].text
        regPolyCircleRad(vCnt, radius, 0, 0)

        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
        DragDot.style("visibility", "hidden")
        PolygonCenter =[SVGx, SVGy]
        ActiveElem.style("cursor", "move")
        ActiveElem.attr("class", "dragTargetObj")
        ActiveElem.attr("pointer-events", null)

        mySVG.removeAttribute('onclick')
        mySVG.style.cursor = ""
        mySVG.setAttribute("onmousedown", "startDragPolygon(evt)")
        mySVG.setAttribute("onmousemove", "dragPolygon(evt)")
        mySVG.setAttribute("onmouseup", "endDragPolygon(evt)")

        cw.drawPolygonCancelButton.disabled = false
        cw.drawPolygonFinishButton.disabled = false
            cw.drawPolygonBotButton.disabled=false
}

function finishDrawPolygon()
{

    if(EditPolygon==true||ActivePolygonCopy==true)
        finishEditPolygon()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemPolygonCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "polygon"+new Date().getTime()

            finishedElem.setAttribute("id", id)

            mySVG.removeAttribute("onmousedown")
            mySVG.removeAttribute("onmousemove")
            mySVG.removeAttribute("onmouseup")

            finishedElem.setAttribute("onmousedown", "editPolygonDraw("+id+",evt)")
            domElemG.appendChild(finishedElem)
            var ctm = finishedElem.getCTM()
            RAD2DEG = 180 / Math.PI;
            var rotateAngle = Math.atan2(ctm.b, ctm.a) * RAD2DEG;
            finishedElem.setAttribute("rotateAngle", rotateAngle)

            finishedElem.setAttribute("class", "polygonElem")

            ActiveElem = null
            activeElem = null

            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "placeDrawPolygon()") //---click to add more icons for this session---
            DrawX.style("display", "none")
            DragDot.style("visibility", "hidden")
            // topG.appendChild(dragDot)
            cw.drawPolygonFinishButton.disabled = true
            cw.drawPolygonCancelButton.disabled = true
            cw.drawPolygonBotButton.disabled=true

        }
}

function cancelDrawPolygon()
{
    var cw = addElemPolygonCw
    if(EditPolygon==true)
        cancelEditPolygon()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "placeDrawPolygon()") //---click to add more icons for this session---
            DragDot.style("visibility", "hidden")
            mySVG.appendChild(dragDot)
            cw.drawPolygonFinishButton.disabled = true
            cw.drawPolygonCancelButton.disabled = true
            cw.adjustedRotatePolygonValue.value = 0
            cw.drawPolygonBotButton.disabled=true

            coverOff()

        }

        cw.drawPolygonCancelButton.style.borderColor = ""

}

//====================edit/update circle===============================

var EditPolygon = false
var DrawPolygonEditId
var EditThisPolygon
//--mousedown/right button on circle---
function editPolygonDraw(elemObjEdit, evt)
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

    if(isRightMB&&DrawPolygon==false&&ZoomDrawing==false)
    {

        EditThisPolygon = elemObjEdit

        DrawPolygonEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--
         DragDot.style("visibility", "hidden")
        ActiveElem = null
        activeElem = null

        EditPolygon = true
        if(addElemPolygonLoad==false)
        {
            openIframe("AddElem", "addElemPolygon", 10)

        }
        else if(addElemPolygonViz==false)
        {
            openIframe("AddElem", "addElemPolygon", 10)
            setEditPolygon()
        }
        else
            setEditPolygon()

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

        ZoomDraggedElems.push([dragTarget,"editPolygonDraw("+dragTarget.id+",evt)",classed])
    }

}
//---after iframe loaded see sendSize() at addElemPolygon.htm---
var EditPolygonObj
function setEditPolygon()
{
    coverOn()

    var cw = addElemPolygonCw

    var elemObjEdit = document.getElementById(DrawPolygonEditId)

    EditPolygonObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditPolygonObj.setAttribute("id", "activeElem")
    EditPolygonObj.setAttribute("class", "dragTargetObj")
    EditPolygonObj.removeAttribute("onmousedown")

    if(EditPolygonObj.getAttribute("filter"))
        cw.drawPolygonShadowCheck.checked = true
        else
            cw.drawPolygonShadowCheck.checked = false

            //---is this text rotated?---
            var ctm = elemObjEdit.getCTM()
            RAD2DEG = 180 / Math.PI;
    var rotatedDeg = Math.atan2(ctm.b, ctm.a) * RAD2DEG;
    if(!rotatedDeg) rotatedDeg = 0
        cw.adjustedRotatePolygonValue.value = rotatedDeg



        domActiveElemG.insertBefore(EditPolygonObj, domActiveElemG.firstChild)
        ActiveElem = d3.select("#activeElem")
        activeElem = document.getElementById("activeElem")
        domActiveElemG.appendChild(dragDot) //--place drag dot on top---
        cw.drawPolygonDeleteButton.style.visibility = "visible"
        cw.drawPolygonEditSpan.innerHTML = "Edit Polygon"
        cw.drawPolygonTopTable.style.backgroundColor = "orange"
        cw.containerDiv.style.backgroundColor = "orange"
        cw.drawPolygonCopyButton.style.visibility = "visible"
        cw.drawPolygonTopButton.style.visibility = "visible"
        cw.drawPolygonBotButton.style.visibility = "visible"
        //domActiveElemG.setAttribute("transform", activeElem.getAttribute("transform"))
        //activeElem.removeAttribute("transform")
        cw.drawPolygonCancelButton.disabled = false
        cw.drawPolygonFinishButton.disabled = false
            cw.drawPolygonBotButton.disabled=false

        var stroke = EditPolygonObj.getAttribute("stroke")
        var strokeWidth = EditPolygonObj.getAttribute("stroke-width")
        var fill = EditPolygonObj.getAttribute("fill")
        var opacity = EditPolygonObj.getAttribute("fill-opacity")
        var vcnt=+EditPolygonObj.getAttribute("vcnt")
        cw.drawPolygonVerticeSelect.selectedIndex=3-vcnt

        if(opacity!="0")
    {
        setSelect("Polygon", "Opacity", opacity)
        setSelect("Polygon", "Fill", fill)
        cw.drawPolygonFillBg.style.backgroundColor = fill
    }
    else
    {
        cw.drawPolygonFillBg.style.backgroundColor = ""
        cw.drawPolygonFillSelect.selectedIndex = 0

    }

     if(fill.indexOf("url")!=-1) //---gradient or pattern---
     {
        cw.drawPolygonFillBg.style.backgroundColor = ""
        cw.drawPolygonFillSelect.selectedIndex = 0

     }


    setSelect("Polygon", "Stroke", stroke)
    setSelect("Polygon", "StrokeWidth", strokeWidth)

    var vCnt = EditPolygonObj.getAttribute("vCnt")
    for(var k = 0; k<cw.drawPolygonVerticeSelect.options.length; k++)
    {
        var txt = cw.drawPolygonVerticeSelect.options[k].text
        if(txt==vCnt)
        {
            cw.drawPolygonVerticeSelect.selectedIndex = k
            break
        }
    }
    var radius = EditPolygonObj.getAttribute("radius")
    for(var k = 0; k<cw.drawPolygonRadiusSelect.options.length; k++)
    {
        var txt = cw.drawPolygonRadiusSelect.options[k].text
        if(txt==radius)
        {
            cw.drawPolygonRadiusSelect.selectedIndex = k
            break
        }
    }
    //---update bg colors---
    cw.drawPolygonStrokeBg.style.backgroundColor = stroke
    if(ActiveElem.attr("stroke-dasharray"))
        cw.drawPolygonStrokeDashCheck.checked = true
        else
            cw.drawPolygonStrokeDashCheck.checked = false

            var matrix = activeElem.getCTM()

            var transX = matrix.e
            var transY = matrix.f

            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", ActiveElem.attr("transform"))
            DragDot.style("visibility", "hidden")
            //--place dragDot----
            setPolygonEditDrag()

            mySVG.style.cursor = ""

}

function setPolygonEditDrag()
{

    activeElem.removeAttribute("onmousedown")
    //DragDot.style("visibility", "visible")
    mySVG.setAttribute("onmousedown", "startDragPolygon(evt)")
    mySVG.setAttribute("onmousemove", "dragPolygon(evt)")
    mySVG.setAttribute("onmouseup", "endDragPolygon(evt)")
    ActiveElem.style("cursor", "move")

}

function finishEditPolygon()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemPolygonCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "polygonElem")

        finishedElem.setAttribute("id", DrawPolygonEditId)
        var ctm = finishedElem.getCTM()
        RAD2DEG = 180 / Math.PI;
        var rotateAngle = Math.atan2(ctm.b, ctm.a) * RAD2DEG;
        finishedElem.setAttribute("rotateAngle", rotateAngle)

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("onmousedown", "editPolygonDraw("+DrawPolygonEditId+",evt)")
        finishedElem.setAttribute("id", DrawPolygonEditId)
        domElemG.insertBefore(finishedElem, EditThisPolygon)
        domElemG.removeChild(EditThisPolygon)

    }

    closeDrawPolygon()
}

function resetEditPolygon()
{

    var cw = addElemPolygonCw

    document.getElementById(DrawPolygonEditId).setAttribute("opacity", 1)

    EditPolygon = false
    cw.drawPolygonEditSpan.innerText = "Draw Polygons"
    cw.drawPolygonTopTable.style.backgroundColor = "linen"
    ActiveElem = null
    activeElem = null

    DrawX.style("display", "none")
    DrawX.attr("stroke", "violet")
    DragDot.style("visibility", "hidden")
    cw.drawPolygonCopyButton.style.visibility = "hidden"
    cw.drawPolygonTopButton.style.visibility = "hidden"
    cw.drawPolygonBotButton.style.visibility = "hidden"
    cw.drawPolygonDeleteButton.style.visibility = "hidden"
    cw.drawPolygonCancelButton.disabled = false
    cw.drawPolygonFinishButton.disabled = false
    DrawPolygon = true
    mySVG.setAttribute('onclick', "placeDrawPolygon()")

}

function cancelEditPolygon()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawPolygonEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null
    ActiveElem = null
    mySVG.appendChild(dragDot) //--place drag dot on top---
    closeDrawPolygon()

}
//-------------------copy circle-----------------
var ActivePolygonCopy = false
var CopyPolygonArray =[]
var CopyPolygonTransX
var CopyPolygonTransY
//---toggle copy button----
function copyDrawPolygon()
{
    var cw = addElemPolygonCw
    ActivePolygonCopy = true

    if(document.getElementById("activeElem"))
    {
        var copyMe = document.getElementById(DrawPolygonEditId)

        CopyPolygonTransX = 0
        CopyPolygonTransY = 0
        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "polygonElem")
        finishedElem.removeAttribute("style")

        finishedElem.setAttribute("id", DrawPolygonEditId)
        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("id", DrawPolygonEditId)
        domElemG.insertBefore(finishedElem, copyMe)
        domElemG.removeChild(copyMe)

        CopyPolygonArray.push(finishedElem)

        cw.drawPolygonEditSpan.innerHTML = "Copy &amp; drag copies"

        coverOff()



        activeElem = null
        ActiveElem = null

        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)


        DraggingObj = false
        DrawPolygon = false
        EditPolygon = false
        PolygonDeleted = false

        mySVG.setAttribute("onmousedown", "startDragPolygon(evt)")
        mySVG.setAttribute("onmousemove", "dragPolygon(evt)")
        mySVG.setAttribute("onmouseup", "endDragPolygon(evt)")

        mySVG.removeAttribute('onclick')
        cw.drawPolygonDeleteButton.style.visibility = "hidden"
        cw.drawPolygonCancelButton.disabled = true
        cw.drawPolygonTopButton.style.visibility = "hidden"
        cw.drawPolygonBotButton.style.visibility = "hidden"
    }
    var copyMe = document.getElementById(DrawPolygonEditId)
    var copied = copyMe.cloneNode(true)
    copied.setAttribute("style", "cursor:move")
    var id = "circle"+new Date().getTime()
    copied.setAttribute("id", id)
    copied.setAttribute("class", "dragTargetObj")
    copied.setAttribute("onmousedown", "tagCopyPolygon(evt)")
    CopyPolygonTransX += 10
    CopyPolygonTransY += 10

    var newTransform = mySVG.createSVGTransformFromMatrix(mySVG.createSVGMatrix().translate(CopyPolygonTransX, CopyPolygonTransY))
    copied.transform.baseVal.appendItem(newTransform)
    copied.transform.baseVal.consolidate()

    domElemG.appendChild(copied)
    CopyPolygonArray.push(copied)

}
var CopyPolygon
function tagCopyPolygon(evt)
{
    CopyPolygon = evt.target

}

//=======================delete circle==================
var PolygonDeleted = false
//---button---
function removeCurrentDrawPolygon()
{

    domActiveElemG.removeChild(activeElem)
    var elemObjEdit = document.getElementById(DrawPolygonEditId)
    domElemG.removeChild(elemObjEdit)
    PolygonDeleted = true

    var cw = addElemPolygonCw

    closeDrawPolygon()

}

//====================Top/Bot===================
function topDrawPolygon()
{

    var elemObjEdit = document.getElementById(DrawPolygonEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "polygonElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawPolygonEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))

    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)

    closeDrawPolygon()
}
function botDrawPolygon()
{
    if(EditPolygon)
    {
    var elemObjEdit = document.getElementById(DrawPolygonEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "polygonElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawPolygonEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))

    domElemG.removeChild(elemObjEdit)
    domElemG.insertBefore(finishedElem,domElemG.firstChild)

   closeDrawPolygon()
   }
   else
   {
        finishDrawPolygon()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }
}


function showDrawPolygonStrokeBg()
{
    var cw = addElemPolygonCw
    var stroke = cw.drawPolygonStrokeSelect.options[cw.drawPolygonStrokeSelect.selectedIndex].value
    if(stroke!="none")
        cw.drawPolygonStrokeBg.style.backgroundColor = stroke
        else
            cw.drawPolygonStrokeBg.style.backgroundColor = ""
            if(ActiveElem)
            ActiveElem.attr("stroke", stroke)

}

function drawPolygonStrokeSelected()
{
    var cw = addElemPolygonCw
    var stroke = cw.drawPolygonStrokeSelect.options[cw.drawPolygonStrokeSelect.selectedIndex].value

    if(ActiveElem)
        ActiveElem.attr("stroke", stroke)

}

function showDrawPolygonFillBg()
{
    var cw = addElemPolygonCw
    var fill = cw.drawPolygonFillSelect.options[cw.drawPolygonFillSelect.selectedIndex].value
    if(fill!="none")
        cw.drawPolygonFillBg.style.backgroundColor = fill
        else
            cw.drawPolygonFillBg.style.backgroundColor = ""
            if(cw.drawPolygonFillSelect.selectedIndex==0)
        {
            ActiveElem.attr("fill", "white")
            ActiveElem.attr("fill-opacity", 0)

        }
        else if(ActiveElem)
        {
            ActiveElem.attr("fill", fill)
            var opacity = cw.drawPolygonOpacitySelect.options[cw.drawPolygonOpacitySelect.selectedIndex].text

            ActiveElem.attr("fill-opacity", opacity)

        }

}

function drawPolygonFillSelected()
{
    var cw = addElemPolygonCw
    var fill = cw.drawPolygonFillSelect.options[cw.drawPolygonFillSelect.selectedIndex].value
    if(cw.drawPolygonFillSelect.selectedIndex==0)
    {
        ActiveElem.attr("fill", "white")
        ActiveElem.attr("fill-opacity", 0)

    }
    else if(ActiveElem)
    {
        ActiveElem.attr("fill", fill)
        var opacity = cw.drawPolygonOpacitySelect.options[cw.drawPolygonOpacitySelect.selectedIndex].text

        ActiveElem.attr("fill-opacity", opacity)

    }

}

function drawPolygonOpacitySelected()
{
    var cw = addElemPolygonCw
    var opacity = cw.drawPolygonOpacitySelect.options[cw.drawPolygonOpacitySelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("fill-opacity", opacity)

}
function drawPolygonVerticeSelected()
{
    var cw = addElemPolygonCw
    var vCnt = +cw.drawPolygonVerticeSelect.options[cw.drawPolygonVerticeSelect.selectedIndex].text
    var radius = +cw.drawPolygonRadiusSelect.options[cw.drawPolygonRadiusSelect.selectedIndex].text
    if(ActiveElem)
        regPolyCircleRad(vCnt, radius, 0, 0)

}
function drawPolygonRadiusSelected()
{
    var cw = addElemPolygonCw
    var vCnt = +cw.drawPolygonVerticeSelect.options[cw.drawPolygonVerticeSelect.selectedIndex].text
    var radius = +cw.drawPolygonRadiusSelect.options[cw.drawPolygonRadiusSelect.selectedIndex].text
    if(ActiveElem)
        regPolyCircleRad(vCnt, radius, 0, 0)

}

function drawPolygonStrokeWidthSelected()
{
    var cw = addElemPolygonCw
    var strokeWidth = cw.drawPolygonStrokeWidthSelect.options[cw.drawPolygonStrokeWidthSelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("stroke-width", strokeWidth)

}

function drawPolygonStrokeDashChecked()
{
    var cw = addElemPolygonCw
    if(cw.drawPolygonStrokeDashCheck.checked==true)
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

function drawPolygonShadowChecked()
{

    var cw = addElemPolygonCw
    if(cw.drawPolygonShadowCheck.checked==true)
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

function rotatePolygonAdjust(factor)
{
    var cw = addElemPolygonCw
    var mult = parseFloat(cw.rotateDrawPolygonAdjustSelect.options[cw.rotateDrawPolygonAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotatePolygonValue.value = rotateAdd+parseFloat(cw.adjustedRotatePolygonValue.value)

    if(ActiveElem)
    {
        rote("activeElem", rotateAdd)
        rote("domDrawX", rotateAdd)
        ActiveElem.attr("rotateAngle",RotateAngle)

    }
}