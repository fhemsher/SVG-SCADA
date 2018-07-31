// fired at cursorLoc.js---
function trackDrawPathEdit()
{
    if(!Dragging)
    {
        var cw = addElemPathEditCw
        activeElem = document.getElementById("activeElem") //--for edit---
        var currentPoints = activeElem.getAttribute("d");

        var pnt = mySVG.createSVGPoint();
        pnt.x = SVGx
        pnt.y = SVGy
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = domActiveElemG.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        NextX = Pnt.x
        NextY = Pnt.y

        var pathSegs = activeElem.pathSegList
        var segs = pathSegs.numberOfItems
        if(currentPoints.indexOf("z")==-1)
            var lastSeg = pathSegs.getItem(segs-1)
            else
                var lastSeg = pathSegs.getItem(segs-2)

                var lastX = lastSeg.x
                var lastY = lastSeg.y

                //---rightAngle---
                if(cw.drawPathEditRightAngleCheck.checked==true)
            {
                var xDiff = Math.abs(lastX-SVGx);
                var yDiff = Math.abs(lastY-SVGy);
                if(xDiff>yDiff)NextY = lastY;
                if(yDiff>xDiff)NextX = lastX;
            }
            if(RubberLine)
        {
            rubberLine.setAttribute("x2", SVGx)
            rubberLine.setAttribute("y2", SVGy)

        }
        SegNextX = NextX
        SegNextY = NextY

    }

}

//---right click/mousedown on element to open iframe---

var elemObjEdit
function startPathDrawEdit(elemObj, evt)
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

    if(isRightMB&&ZoomDrawing==false)
    {
        elemObjEdit = elemObj

        DrawPathEditId = elemObjEdit.getAttribute("id")

        coverOn()

        if(addElemPathEditLoad==false)
            openIframe("AddElem", "addElemPathEdit", 10)
            else
            {
                openIframe("AddElem", "addElemPathEdit", 10)
                editAddPathElem(elemObjEdit)
            }

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

        ZoomDraggedElems.push([dragTarget,"startPathDrawEdit("+dragTarget.id+",evt)",classed])
    }
}

//================EDIT======================
var EditObj
var DrawPathEdit = false

var DrawPathEditId
var DrawPathEditObj
var CurrentPathArrow //--existing arrow id---
var PathDeleted = false
//---fired after frame loaded, via sendSize(), or cancel edit ---
function editAddPathElem(elemObjEdit)
{
    DrawPathEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--
    PathDeleted = false
    DrawPathEdit = false
    NewEndArrow = null
    mySVG.removeAttribute('onclick')
    window.addEventListener("keypress", keyPressPathEdit, false);
    mySVG.addEventListener("keypress", keyPressPathEdit, false);
    //---attach point drag to mySVG---
    mySVG.setAttribute("onmousedown", "startDragEdit(evt)")
    mySVG.setAttribute("onmousemove", "dragEdit(evt)")
    mySVG.setAttribute("onmouseup", "endDragEdit()")
    var cw = addElemPathEditCw

    cw.smoothPathEditButton.disabled = false
    cw.drawPathEditCancelButton.disabled = false

    cw.drawPathEditCancelButton.title = "cancel these changes"
    cw.drawPathEditFinishButton.disabled = false
    cw.dragPathCheck.checked = false
    cw.drawPathEditShadowCheck.checked = false
    //---set values in selections and drag points,etc.
    var fill = elemObjEdit.getAttribute("fill")
    if(fill.indexOf("url")!=-1)
    {
        fill = "none"
        cw.drawPathEditFillBg.style.background = ""
        cw.drawPathEditFillSelect.selectedIndex = 0
    }
    else
    {
        setSelect("Path", "Fill", fill, true)

    }
     cw.drawPathEditFillBg.style.background=fill
    var opacity = elemObjEdit.getAttribute("fill-opacity")

    var opacityStroke = elemObjEdit.getAttribute("stroke-opacity")
    for(var k=0;k<cw.drawPathEditStrokeOpacitySelect.options.length;k++)
    {
        var opStk=cw.drawPathEditStrokeOpacitySelect.options[k].text
        if(opacityStroke==opStk)
        {
           cw.drawPathEditStrokeOpacitySelect.selectedIndex=k
           break
        }
    }



    var pipe3dFilter = elemObjEdit.getAttribute("filter")


    var stroke = elemObjEdit.getAttribute("stroke")
      cw.drawPathEditStrokeBg.style.background=stroke
    var strokeWidth = elemObjEdit.getAttribute("stroke-width")
    var dash = elemObjEdit.getAttribute("stroke-dasharray")
    var shadow = elemObjEdit.getAttribute("filter")
    var rightAngle = elemObjEdit.getAttribute("rightAngle")
    var arrow = elemObjEdit.getAttribute("marker-end")
    DrawPathType = elemObjEdit.getAttribute("type")

    setSelect("Path", "Stroke", stroke, true)
    setSelect("Path", "StrokeWidth", strokeWidth, true)

    setSelect("Path", "Opacity", opacity, true)

    if(dash)
        cw.drawPathEditStrokeDashCheck.checked = true


        if(pipe3dFilter=="url(#pipe3D)")
        {
          cw.drawPathEditPipe3DCheck.checked = true
          cw.drawPathEditShadowCheck.checked = false
          cw.drawPathEditShadowCheck.disabled = true
        }


        if(shadow=="url(#drop-shadow)")
        cw.drawPathEditShadowCheck.checked = true

        if(arrow&&arrow!="null")
    {
        //---url(#arrowHex)---
        var urlId = arrow.split("url(#")[1].replace(/\)/, "")
        CurrentPathArrow = urlId
        cw.drawPathEditStrokeArrowCheck.checked = true
    }

    setActivePathEdit()

    cw.adjustedRotatePathValue.value = 0
    return false

}

var EditPathFill
var EditPathFillOpacity
var EditPathStrokeOpacity

function setActivePathEdit()
{

    var cw = addElemPathEditCw
    var elemObjEdit = document.getElementById(DrawPathEditId)
    EditPathFill=elemObjEdit.getAttribute("fill")
    EditPathFillOpacity=elemObjEdit.getAttribute("fill-opacity")
    EditPathStrokeOpacity=elemObjEdit.getAttribute("stroke-opacity")

    if(DrawPathType=="linear")
    {
        if(elemObjEdit.getAttribute("d").indexOf("z")!=-1)
            PathClosedEdit = true
            EditObj = elemObjEdit.cloneNode(true)
            EditObj.setAttribute("id", "activeElem")
            EditObj.removeAttribute("onmousedown")

            domActiveElemG.appendChild(EditObj)
    }
    else //---smooth path--
    {
        var pathSmooth = elemObjEdit.cloneNode(true)
        pathSmooth.removeAttribute("class")
        // pathSmooth.removeAttribute("transform")
        pathSmooth.setAttribute("id", "drawPathSmooth")
        pathSmooth.removeAttribute("onmousedown")

        pathSmooth.removeAttribute("onmouseover")
        pathSmooth.removeAttribute("onmouseout")

        domActiveElemG.appendChild(pathSmooth)
        DrawPathEditSmooth = d3.select("#drawPathSmooth")

        var straightPath = elemObjEdit.cloneNode(true)
        // straightPath.removeAttribute("transform")
        var linearD = elemObjEdit.getAttribute("linearD")
        straightPath.setAttribute("d", linearD)
        straightPath.setAttribute("stroke-opacity", .3)
        straightPath.setAttribute("fill", "none")

        EditObj = straightPath
        EditObj.setAttribute("id", "activeElem")
        domActiveElemG.appendChild(EditObj)

        if(linearD.indexOf("z")!=-1)
            PathClosedEdit = true

    }
    EditObj.removeAttribute("onmousedown")

    EditObj.removeAttribute("onmouseover")
    EditObj.removeAttribute("onmouseout")
    EditObj.removeAttribute("class")

    elemObjEdit.style.display = "none"

    activeElem = document.getElementById("activeElem")
    ActiveElem = d3.select("#activeElem")

    editThisPath()

}
function editThisPath()
{
    if(DrawPathEdit==false)
    {

        var cw = addElemPathEditCw

        var stroke = EditObj.getAttribute("stroke")
        var strokeWidth = EditObj.getAttribute("stroke-width")
        var fill = EditObj.getAttribute("fill")
        var opacity = EditObj.getAttribute("fill-opacity")

        //----rebuild---
        PathPointArray =[]

        var segList = EditObj.pathSegList
        var segs = segList.numberOfItems
        for(var k = 0; k<segs; k++)
        {
            var segObj = segList.getItem(k)

            if(segObj.x && segObj.y)
            {

                var pnt = mySVG.createSVGPoint();
                pnt.x = segObj.x
                pnt.y = segObj.y
                var sCTM = activeElem.getScreenCTM();
                var Pnt = pnt.matrixTransform(sCTM.inverse());

                PathPointArray.push([segObj.x, segObj.y])

            }

        }
        Point = PathPointArray.length-1
        TwoPlusPointsSet = true
        var x0, y0
        DragCircleG = ActiveElemG.append("g")
        .attr("id", "dragCircleG")
        .attr("transform", ActiveElem.attr("transform"))

        dragCircleG.appendChild(domDrawX)
        DrawX.style("display", "inline")
        DrawX.attr("stroke", "orange")
        DrawX.attr("transform", "translate("+PathPointArray[0][0]+" "+PathPointArray[0][1]+")")
        //---build Rubberline----
        RubberLine = ActiveElemG.append("line")
        .attr("id", "rubberLine")
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth)
        //.attr("marker-end", "url(#endArrow)")
        .style("visibility", "hidden")

        for(var k = 0; k<PathPointArray.length; k++)
        {
            var circle = document.createElementNS(NS, "circle")
            var transX = PathPointArray[k][0]
            var transY = PathPointArray[k][1]
            circle.setAttribute("id", "dragPnt"+k)
            circle.setAttribute("cx", 0)
            circle.setAttribute("cy", 0)
            circle.setAttribute("transform", "translate("+transX+" "+transY+")")
            circle.setAttribute("r", 8)
            circle.setAttribute("opacity", ".6")
            if(k==0)
                circle.setAttribute("fill", "lime")
                else
                    circle.setAttribute("fill", "white")

                    circle.setAttribute("stroke", "black")
                    circle.setAttribute("stroke-width", "1")
                    circle.setAttribute("Point", k)
                    circle.setAttribute("class", "dragTarget")
                    circle.setAttribute("style", "cursor:move")

                    dragCircleG.appendChild(circle)

                    if(k==0)
                {
                    x0 = transX
                    y0 = transY
                }
        }

        if(EditObj.getAttribute("rightAngle"))
            cw.drawPathEditRightAngleCheck.checked = true

            if(EditObj.getAttribute("d").indexOf("z")!=-1)
        {
            PathClosed = true
            PathDecoupled = true;
            cw.drawPathEditEncloseButton.innerText = "reopen [E]"
            cw.drawPathEditPauseButton.disabled = true
            cw.drawPathEditUndoButton.disabled = true
        }
        else
        {
            cw.drawPathEditUndoButton.disabled = false

            cw.drawPathEditPauseButton.disabled = false
            pauseDrawPathEdit()
        }
        cw.drawPathEditEncloseButton.disabled = false

        PausePathPoint = document.getElementById("dragPnt"+Point)
        var x = PathPointArray[Point][0]
        var y = PathPointArray[Point][1]
        var pnt = mySVG.createSVGPoint();
        pnt.x = x
        pnt.y = y
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = PausePathPoint.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        RubberLine.attr("x1", x)
        RubberLine.attr("y1", y)

        DrawPathEdit = true
        if(DrawPathType!="linear")
        {
            cw.smoothPathEditButton.innerText = "linear[S]"

            DrawPathEditSmooth.data([PathPointArray])
            // DrawPathEditSmooth.attr('d',ActiveElem.attr("d"))
            //   DrawPathEditSmooth.attr('d', d3.svg.line().interpolate(DrawPathType));
            if(PathClosed==true)
            {
                var d = DrawPathEditSmooth.attr("d")+"z"
                DrawPathEditSmooth.attr("d", d)
            }

        }

        coverOn()
        return false
    }
}
//----each mouse click fired from the SVG---
function clickNextPathPointEdit()
{

    var cw = addElemPathEditCw
    Point++;

    nextX = + RubberLine.attr("x2")
    nextY = + RubberLine.attr("y2")

    //---rightAngle---
    if(cw.drawPathEditRightAngleCheck.checked==true)
    {
        var pathSegs = activeElem.pathSegList
        var segs = pathSegs.numberOfItems
        var lastSeg = pathSegs.getItem(segs-1)
        var lastX = lastSeg.x
        var lastY = lastSeg.y

        var xDiff = Math.abs(lastX-SVGx);
        var yDiff = Math.abs(lastY-SVGy);
        if(xDiff>yDiff)nextY = lastY;
        if(yDiff>xDiff)nextX = lastX;
    }
    //---place a drag circle at each point--

    var circle = document.createElementNS(NS, "circle")
    circle.setAttribute("id", "dragPnt"+Point)
    circle.setAttribute("cx", 0)
    circle.setAttribute("cy", 0)
    circle.setAttribute("transform", "translate("+nextX+" "+nextY+")")
    circle.setAttribute("r", 8)
    circle.setAttribute("opacity", ".6")
    circle.setAttribute("fill", "white")
    circle.setAttribute("stroke", "black")
    circle.setAttribute("stroke-width", "1")
    circle.setAttribute("Point", Point)
    circle.setAttribute("class", "dragTarget")
    circle.setAttribute("style", "cursor:move")

    dragCircleG.appendChild(circle)

    RubberLine.attr("x1", nextX);
    RubberLine.attr("y1", nextY);
    PathPointArray.push([nextX, nextY])

    if(cw.drawPathEditStrokeArrowCheck.checked==true)
    {
        createPathEditArrow()
        activeElem.setAttribute("marker-end", "url(#"+EndArrowId+")")
    }

    SegSetX = nextX
    SegSetY = nextY
    var pathSegL = activeElem.createSVGPathSegLinetoAbs(nextX, nextY)
    activeElem.pathSegList.appendItem(pathSegL)
    //--update
    var d = activeElem.getAttribute("d")
    //ActiveElem.attr("d",d)

    if(TwoPlusPointsSet==false)
        cw.drawPathEditFinishButton.disabled = false
        else if(TwoPlusPointsSet==true)
            cw.drawPathEditEncloseButton.disabled = false

            TwoPlusPointsSet = true;

    cw.drawPathEditUndoButton.disabled = false
    cw.drawPathEditFinishButton.disabled = false

    cw.drawPathEditUndoButton.disabled = false
    cw.drawPathEditFinishButton.disabled = false
    if(Point>1)
        cw.drawPathEditEncloseButton.disabled = false
        if(DrawPathType=="basis")
    {

        if(activeElem.getAttribute("d").indexOf("z")==-1)
            var line = d3.line().curve(d3.curveBasis);
        else
            var line = d3.line().curve(d3.curveBasisClosed);

        d3.select("#drawPathSmooth").attr('d', line);

    }
}

var DrawPathType = 'linear'
var DrawPathEditSmooth
function drawPathEditSmoothSelected()
{
    var cw = addElemPathEditCw
    var currentType = DrawPathType


    var strokeWidth = cw.drawPathEditStrokeWidthSelect.options[cw.drawPathEditStrokeWidthSelect.selectedIndex].text
    var strokeColor = cw.drawPathEditStrokeSelect.options[cw.drawPathEditStrokeSelect.selectedIndex].value
    var fill = cw.drawPathEditFillSelect.options[cw.drawPathEditFillSelect.selectedIndex].value
    var fillOpacity = cw.drawPathEditOpacitySelect.options[cw.drawPathEditOpacitySelect.selectedIndex].value
    var strokeOpacity = cw.drawPathEditStrokeOpacitySelect.options[cw.drawPathEditStrokeOpacitySelect.selectedIndex].value




    if(currentType=="basis")
    {
        if(document.getElementById("drawPathSmooth"))
        {

             if(EditPathFill.indexOf("url")!=-1&&cw.drawPathEditFillSelect.selectedIndex==0)
            {
                activeElem.setAttribute("fill",EditPathFill)
                activeElem.setAttribute("fill-opacity",EditPathFillOpacity)
             }
             else
             {
                 activeElem.setAttribute("fill",fill)
                activeElem.setAttribute("fill-opacity",fillOpacity)
             }
                domActiveElemG.removeChild(document.getElementById("drawPathSmooth"))
                activeElem.setAttribute("stroke-opacity",strokeOpacity)

                activeElem.removeAttribute("opacity")




            DrawPathType = "linear"
            cw.smoothPathEditButton.innerHTML = "smooth[S]"

        }
    }
    else if(currentType=="linear")
    {
        var data = PathPointArray
        var smoothPath = activeElem.cloneNode(true)
          smoothPath.setAttribute("id", "drawPathSmooth")

        if(EditPathFill.indexOf("url")!=-1&&cw.drawPathEditFillSelect.selectedIndex==0)
            {
                smoothPath.setAttribute("fill",EditPathFill)
                smoothPath.setAttribute("fill-opacity",EditPathFillOpacity)
             }
             else
             {
                 smoothPath.setAttribute("fill",fill)
                smoothPath.setAttribute("fill-opacity",fillOpacity)
             }

              smoothPath.setAttribute("stroke-opacity",strokeOpacity) 


        domActiveElemG.insertBefore(smoothPath, activeElem)

        DrawPathEditSmooth = d3.select("#drawPathSmooth")
        if(smoothPath.getAttribute("d").indexOf("z")==-1)
            var line = d3.line().curve(d3.curveBasis);
        else
            var line = d3.line().curve(d3.curveBasisClosed);

        DrawPathEditSmooth.data([data])
        .attr('d', line);

        activeElem.setAttribute("stroke-opacity", '.5')
        activeElem.setAttribute("fill","none")

        DrawPathType = "basis"
        cw.smoothPathEditButton.innerHTML = "linear[S]"
        if(cw.drawPathEditStrokeDashCheck.checked==true)
            DrawPathEditSmooth.attr("stroke-dasharray", "8 4")
            if(cw.drawPathEditStrokeArrowCheck.checked==true)
        {

            var url = "url(#"+EndArrowId+")"

            DrawPathEditSmooth.attr("marker-end", url)

        }
        if(cw.drawPathEditRightAngleCheck.checked==true )
        {
            cw.drawPathEditRightAngleCheck.checked=false
            activeElem.removeAttribute("rightAngle")

        }

        if(PathClosedEdit==true)
        {
            var d = DrawPathEditSmooth.attr("d")+"z"
            DrawPathEditSmooth.attr("d", d)
        }

    }
    if(ActiveElem)
    {
        ActiveElem.attr("type", DrawPathType)
        ActiveElem.attr("linearD", ActiveElem.attr("d"))
      //  ActiveElem.attr("opacity", ".3")
    }
 window.focus()
}

function showDrawPathEditStrokeBg()
{
    var cw = addElemPathEditCw
    var stroke = cw.drawPathEditStrokeSelect.options[cw.drawPathEditStrokeSelect.selectedIndex].value
    if(stroke!="none")
        cw.drawPathEditStrokeBg.style.backgroundColor = stroke
        else
            cw.drawPathEditStrokeBg.style.backgroundColor = ""

            if(ActiveElem)
            activeElem.setAttribute("stroke", stroke)

            if(cw.drawPathEditStrokeArrowCheck.checked==true)
        {
            drawPathEditStrokeArrowChecked()

        }
        if(DrawPathType!="linear")
        DrawPathEditSmooth.attr("stroke", stroke)
 window.focus()

 }
var FillChange = false //----retains gradients/patterns---
function showDrawPathEditFillBg()
{
    var cw = addElemPathEditCw
    var fill = cw.drawPathEditFillSelect.options[cw.drawPathEditFillSelect.selectedIndex].value

    if(fill!="none")
        cw.drawPathEditFillBg.style.backgroundColor = fill
        else
            cw.drawPathEditFillBg.style.backgroundColor = ""

            if(ActiveElem)
            activeElem.setAttribute("fill", fill)

         if(DrawPathType!="linear")
        {
            DrawPathEditSmooth.attr("fill", fill)
            DrawPathEditSmooth.attr("fill-opacity", cw.drawPathEditOpacitySelect.options[cw.drawPathEditOpacitySelect.selectedIndex].text)
            activeElem.setAttribute("fill", "none")

        }
        else if(activeElem)
        {
           activeElem.setAttribute("fill", fill)
            activeElem.setAttribute("fill-opacity", cw.drawPathEditOpacitySelect.options[cw.drawPathEditOpacitySelect.selectedIndex].text)
        }
        FillChange = true
 window.focus()
}

function drawPathEditStrokeSelected()
{
    var cw = addElemPathEditCw
    var stroke = cw.drawPathEditStrokeSelect.options[cw.drawPathEditStrokeSelect.selectedIndex].value

    if(ActiveElem)
        activeElem.setAttribute("stroke", stroke)

        if(cw.drawPathEditStrokeArrowCheck.checked==true)
    {
        drawPathEditStrokeArrowChecked()
        if(ActiveElem)
            activeElem.setAttribute("marker-end", "url(#"+EndArrowId+")")
            if(DrawPathType!="linear")
            DrawPathEditSmooth.attr("marker-end", "url(#"+EndArrowId+")")
    }
 window.focus()

}

function drawPathEditStrokeWidthSelected()
{
    var cw = addElemPathEditCw
    var strokeWidth = cw.drawPathEditStrokeWidthSelect.options[cw.drawPathEditStrokeWidthSelect.selectedIndex].text
    if(ActiveElem)
        activeElem.setAttribute("stroke-width", strokeWidth)
        if(DrawPathType!="linear")
        DrawPathEditSmooth.attr("stroke-width", strokeWidth)
 window.focus()
}
function drawPathEditOpacitySelected()
{
    var cw = addElemPathEditCw
    var opacity = cw.drawPathEditOpacitySelect.options[cw.drawPathEditOpacitySelect.selectedIndex].text
    if(ActiveElem)
        activeElem.setAttribute("fill-opacity", opacity)
        if(DrawPathType!="linear")
        DrawPathEditSmooth.attr("fill-opacity", opacity)
 window.focus()
}
function drawPathEditStrokeOpacitySelected()
{
    var cw = addElemPathEditCw
    var opacity = cw.drawPathEditStrokeOpacitySelect.options[cw.drawPathEditStrokeOpacitySelect.selectedIndex].text
    if(ActiveElem)
        activeElem.setAttribute("stroke-opacity", opacity)
        if(DrawPathType!="linear")
        DrawPathEditSmooth.attr("stroke-opacity", opacity)
 window.focus()
}


function drawPathEditStrokeDashChecked()
{
    var cw = addElemPathEditCw
    if(cw.drawPathEditStrokeDashCheck.checked==true)
    {
        if(ActiveElem)
            activeElem.setAttribute("stroke-dasharray", "8 4")
            if(DrawPathType!="linear")
            DrawPathEditSmooth.attr("stroke-dasharray", "8 4")
    }
    else
    {
        if(ActiveElem)
            activeElem.removeAttribute("stroke-dasharray")
            if(DrawPathType!="linear")
            DrawPathEditSmooth.attr("stroke-dasharray",null)
    }
 window.focus()
}

function drawPathEditPipe3DChecked()
  {
     var cw = addElemPathEditCw
    if(cw.drawPathEditPipe3DCheck.checked==true)
    {
          cw.drawPathEditShadowCheck.checked=false
           cw.drawPathEditShadowCheck.disabled=true
        if(ActiveElem)
        {
            activeElem.setAttribute("stroke-linejoin", "round")
            ActiveElem.attr("filter", "url(#pipe3D)")
            if(DrawPathType!="linear")
            DrawPathEditSmooth.attr("filter", "url(#pipe3D)")

        }
    }
    else
    {       cw.drawPathEditShadowCheck.disabled=false
        if(ActiveElem)
        {
          activeElem.removeAttribute("filter")
          activeElem.removeAttribute("stroke-linejoin")

        }

            if(DrawPathType!="linear")
            drawPathEditSmooth.removeAttribute("filter")
    }

 window.focus()

  }


function drawPathEditShadowChecked()
{
    var cw = addElemPathEditCw
    if(cw.drawPathEditShadowCheck.checked==true)
    {
        if(ActiveElem)
            activeElem.setAttribute("filter", "url(#drop-shadow)")
            if(DrawPathType!="linear")
            DrawPathEditSmooth.attr("filter", "url(#drop-shadow)")
    }
    else
    {
        if(ActiveElem)
            activeElem.removeAttribute("filter")
            if(DrawPathType!="linear")
            drawPathEditSmooth.removeAttribute("filter")
    }
 window.focus()
}

function drawPathEditStrokeArrowChecked()
{
    var cw = addElemPathEditCw
    if(cw.drawPathEditStrokeArrowCheck.checked==true)
    {
        createPathEditArrow()

        if(DrawPathType!="linear")
            DrawPathEditSmooth.attr("marker-end", "url(#"+EndArrowId+")")

            if(ActiveElem)
            activeElem.setAttribute("marker-end", "url(#"+EndArrowId+")")

    }
    else
    {
        if(ActiveElem)
            activeElem.removeAttribute("marker-end")
            if(DrawPathType!="linear")
            drawPathEditSmooth.removeAttribute("marker-end")
    }
 window.focus()
}

//---create and/or changes arrow id=pathArrow for this path--
function createPathEditArrow()
{
    var cw = addElemPathEditCw
    var strokeColor = cw.drawPathEditStrokeSelect.options[cw.drawPathEditStrokeSelect.selectedIndex].value
    var colorHex = strokeColor.replace("#", "")
    EndArrowId = "arrow"+colorHex
    if(!document.getElementById(EndArrowId))
    {
        //---does an arrow have same fill color?--
        var found = false
        var arrows = arrowDefs.childNodes
        for(var k = 0; k<arrows.length; k++)
        {
            var fill = arrows.item(k).getAttribute("fill")
            var fillHex = fill.replace("#", "")
            arrows.item(k).setAttribute("id", "arrow"+fillHex)
            if(fill==strokeColor)
            {
                NewEndArrow = false
                found = true
                break
            }
        }
        if(found==false)
        {
            var addArrow = cloneArrow.cloneNode(true)
            addArrow.setAttribute("id", EndArrowId)
            addArrow.setAttribute("fill", strokeColor)
            arrowDefs.appendChild(addArrow)
            NewEndArrow = true

        }
    }

}

//=====================DELETE PATH==========================

//---button---
function deleteDrawPathEdit()
{

    var cw = addElemPathEditCw
    var deleteMe = document.getElementById(DrawPathEditId)

    deletePath(DrawPathEditId)

    closeIframe("addElemPathEdit")
    closeDrawPathEdit()
}

function deletePath(DrawPathEditId)
{

    var deleteMe = document.getElementById(DrawPathEditId)

    PathDeleted = true

    domElemG.removeChild(deleteMe)

}
//====================Top/Bot===================
function topDrawPathEdit()
{

    finishDrawPathEdit()
    var finishedElem = document.getElementById(DrawPathEditId)
     domElemG.appendChild(finishedElem)
}
function botDrawPathEdit()
{
       finishDrawPathEdit()
    var finishedElem = document.getElementById(DrawPathEditId)
       domElemG.insertBefore(finishedElem,domElemG.firstChild)

}

//--------------ROTATE PATH------------------

function rotatePathAdjust(factor)
{
    var cw = addElemPathEditCw
    var mult = parseFloat(cw.rotateDrawPathAdjustSelect.options[cw.rotateDrawPathAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotatePathValue.value = rotateAdd+parseFloat(cw.adjustedRotatePathValue.value)

    if(ActiveElem)
    {
        var transformRequestObj = mySVG.createSVGTransform()
        var animTransformList = activeElem.transform
        var transformList = animTransformList.baseVal
        transformRequestObj.setRotate(rotateAdd, PathPointArray[0][0], PathPointArray[0][1])
        transformList.appendItem(transformRequestObj)
        transformList.consolidate()
        rote("domDrawX", rotateAdd)
        if(DrawPathType!="linear")
        {
            var transformRequestObj = mySVG.createSVGTransform()
            var animTransformList = drawPathSmooth.transform
            var transformList = animTransformList.baseVal
            transformRequestObj.setRotate(rotateAdd, PathPointArray[0][0], PathPointArray[0][1])
            transformList.appendItem(transformRequestObj)
            transformList.consolidate()

        }

        dragDrawPathEditFinish()
    }
}

//---------------------DRAG PATH================================

function dragPathChecked()
{
    var cw = addElemPathEditCw

    if(cw.dragPathCheck.checked)
    {
        mySVG.setAttribute("onmousedown", "startDragPath(evt)")
        mySVG.setAttribute("onmousemove", "dragPath(evt)")
        mySVG.setAttribute("onmouseup", "endDragPath(evt)")

        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.style.cursor = "move"//("cursor","move")

        dragCircleG.setAttribute("visibility", "hidden")
    }
    else
    {
        mySVG.setAttribute("onmousedown", "startDragEdit(evt)")
        mySVG.setAttribute("onmousemove", "dragEdit(evt)")
        mySVG.setAttribute("onmouseup", "endDragEdit(evt)")

        activeElem.removeAttribute("class")
        activeElem.style.cursor = ""//("cursor","move")
        dragCircleG.setAttribute("visibility", "")
    }

}

function dragDrawPathEditFinish()
{
    if(ActiveElem)
    {
        PathPointArray =[]
        var sCTM = activeElem.getCTM()
        var svgRoot = activeElem.ownerSVGElement

        var segList = activeElem.pathSegList
        var segs = segList.numberOfItems
        //---change segObj values
        for(var k = 0; k<segs; k++)
        {
            var segObj = segList.getItem(k)

            if(segObj.x && segObj.y)
            {
                var mySVGPoint = svgRoot.createSVGPoint();
                mySVGPoint.x = segObj.x
                mySVGPoint.y = segObj.y
                mySVGPointTrans = mySVGPoint.matrixTransform(sCTM)
                segObj.x = mySVGPointTrans.x
                segObj.y = mySVGPointTrans.y
                PathPointArray.push([segObj.x, segObj.y])
            }

            if(segObj.x1 && segObj.y1)
            {
                var mySVGPoint1 = svgRoot.createSVGPoint();
                mySVGPoint1.x = segObj.x1
                mySVGPoint1.y = segObj.y1
                mySVGPointTrans1 = mySVGPoint1.matrixTransform(sCTM)
                segObj.x1 = mySVGPointTrans1.x
                segObj.y1 = mySVGPointTrans1.y
                PathPointArray.push([segObj.x1, segObj.y1])
            }
            if(segObj.x2 && segObj.y2)
            {
                var mySVGPoint2 = svgRoot.createSVGPoint();
                mySVGPoint2.x = segObj.x2
                mySVGPoint2.y = segObj.y2
                mySVGPointTrans2 = mySVGPoint2.matrixTransform(sCTM)
                segObj.x2 = mySVGPointTrans2.x
                segObj.y2 = mySVGPointTrans2.y
                PathPointArray.push([segObj.x2, segObj.y2])
            }
        }

        activeElem.removeAttribute("transform")

        DrawX.attr("transform", "translate("+PathPointArray[0][0]+" "+PathPointArray[0][1]+")")

        var circles = dragCircleG.childNodes
        var pntCnt = 0
        for(var k = 0; k<circles.length; k++)
        {
            if(circles.item(k).getAttribute("class")=="dragTarget")
            {
                var pnt = PathPointArray[pntCnt++]

                circles.item(k).setAttribute("transform", "translate("+pnt[0]+","+pnt[1]+")")

            }

        }

        if(DrawPathType!="linear")
        {
            var sCTM = drawPathSmooth.getCTM()
            var svgRoot = drawPathSmooth.ownerSVGElement

            var segList = drawPathSmooth.pathSegList
            var segs = segList.numberOfItems
            //---change segObj values
            for(var k = 0; k<segs; k++)
            {
                var segObj = segList.getItem(k)

                if(segObj.x && segObj.y)
                {
                    var mySVGPoint = svgRoot.createSVGPoint();
                    mySVGPoint.x = segObj.x
                    mySVGPoint.y = segObj.y
                    mySVGPointTrans = mySVGPoint.matrixTransform(sCTM)
                    segObj.x = mySVGPointTrans.x
                    segObj.y = mySVGPointTrans.y
                    //PathPointArray.push([segObj.x, segObj.y])
                }

                if(segObj.x1 && segObj.y1)
                {
                    var mySVGPoint1 = svgRoot.createSVGPoint();
                    mySVGPoint1.x = segObj.x1
                    mySVGPoint1.y = segObj.y1
                    mySVGPointTrans1 = mySVGPoint1.matrixTransform(sCTM)
                    segObj.x1 = mySVGPointTrans1.x
                    segObj.y1 = mySVGPointTrans1.y
                    //PathPointArray.push([segObj.x1, segObj.y1])
                }
                if(segObj.x2 && segObj.y2)
                {
                    var mySVGPoint2 = svgRoot.createSVGPoint();
                    mySVGPoint2.x = segObj.x2
                    mySVGPoint2.y = segObj.y2
                    mySVGPointTrans2 = mySVGPoint2.matrixTransform(sCTM)
                    segObj.x2 = mySVGPointTrans2.x
                    segObj.y2 = mySVGPointTrans2.y
                    //PathPointArray.push([segObj.x2, segObj.y2])
                }
            }

            drawPathSmooth.removeAttribute("transform")

        }

    }
}

//-------------------copy path-----------------
var ActivePathCopy = false
var CopyPathArray =[]
var CopyPathTransX
var CopyPathTransY
//---toggle copy button----
function copyDrawPathEdit()
{
    var cw = addElemPathEditCw
    ActivePathCopy = true
    Dragging=true
    if(document.getElementById("activeElem"))
    {




            var copyMe = document.getElementById(DrawPathEditId)
            var myCopy = copyMe.cloneNode(true)

           myCopy.setAttribute("id", DrawPathEditId)
        domElemG.insertBefore(myCopy, copyMe)
        domElemG.removeChild(copyMe)




        CopyPathTransX = 0
        CopyPathTransY = 0

        myCopy.setAttribute("class", "addElem")
        myCopy.removeAttribute("style")

        myCopy.setAttribute("id", DrawPathEditId)
        domActiveElemG.removeChild(document.getElementById("activeElem"))
        myCopy.style.cursor = "default"



        CopyPathArray.push(myCopy)

        cw.editSpan.innerHTML = "Copy &amp; drag copies"

        coverOff()

        //mySVG.appendChild(dragDot) //--place drag dot on top---
        //dragDot.removeAttribute("cx")

        activeElem = null
        ActiveElem = null

        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)
        dragCircleG.setAttribute("visibility", "hidden")

        DraggingObj = false
        DrawPath = false
        EditPath = false
        PathDeleted = false

        mySVG.setAttribute("onmousedown", "startDragPath(evt)")
        mySVG.setAttribute("onmousemove", "dragPath(evt)")
        mySVG.setAttribute("onmouseup", "endDragPath(evt)")

        mySVG.removeAttribute('onclick')
        cw.drawPathEditDeleteButton.style.visibility = "hidden"
        cw.drawPathEditCancelButton.disabled = true
    }
    var copyMe = document.getElementById(DrawPathEditId)
    var copied = copyMe.cloneNode(true)
    copied.setAttribute("style", "cursor:move")
    var id = "Path"+new Date().getTime()
    copied.setAttribute("id", id)
    copied.setAttribute("class", "dragTargetObj")
    copied.setAttribute("onmousedown", "tagCopyPath(evt)")
    CopyPathTransX += 10
    CopyPathTransY += 10

    var newTransform = mySVG.createSVGTransformFromMatrix(mySVG.createSVGMatrix().translate(CopyPathTransX, CopyPathTransY))
    copied.transform.baseVal.appendItem(newTransform)
    copied.transform.baseVal.consolidate()

    domElemG.appendChild(copied)
    CopyPathArray.push(copied)

}
var CopyPath
function tagCopyPath(evt)
{
    CopyPath = evt.target

}


