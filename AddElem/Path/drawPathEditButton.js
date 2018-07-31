
var PathClosedEdit = false;
var PathDecoupledEdit = false;
var PathFinishedEdit = false;
var PathCancelledEdit = false;

var PausePathEdit = false
var PrevKeyPathEdit = null

function resetPathEdit()
{
    var cw = addElemPathEditCw

    //--return---
    DrawX.attr("stroke", "violet")

    DrawX.style("display", "none")
    domDrawX.removeAttribute("transform")
    NewEndArrow = false
    FillChange = false
    CurrentPathArrow = null
    DrawPathEdit = false
    DragPointArray =[]
    PathPointArray =[]
    Point = 0;
    FirstPathPointSet = false;
    TwoPlusPointsSet = false;
    PathClosedEdit = false;
    PathDecoupledEdit = false;
    PathFinishedEdit = false;
    PathCancelledEdit = false;
    ActiveElemStop = false
    if(document.getElementById("rubberLine"))
        domActiveElemG.removeChild(document.getElementById("rubberLine"))
        RubberLine = null;
    DrawPathStart = false
    DragThisPoint = null;
    DragPointOK = false;
    PointArray =[]
    PausePathPointEdit = null
    PausePathEdit = false
    PrevKeyPathEdit = null

    PrevArrowKey = null
    PrevDashKey = null
    cw.adjustedRotatePathValue.value = 0
    cw.drawPathEditRightAngleCheck.checked = false
    cw.drawPathEditStrokeDashCheck.checked = false
    cw.drawPathEditStrokeArrowCheck.checked = false

    cw.drawPathEditPauseButton.disabled = true
    cw.drawPathEditUndoButton.disabled = true
    cw.drawPathEditCancelButton.disabled = true
    cw.drawPathEditFinishButton.disabled = true
    cw.drawPathEditCancelButton.innerHTML = "cancel[C]"
    cw.drawPathEditPauseButton.innerHTML = "pause [P]"
    cw.drawPathEditEncloseButton.disabled = true
    cw.smoothPathEditButton.innerHTML = "smooth[S]"
    cw.smoothPathEditButton.disabled = true

    if(document.getElementById("dragCircleG"))
    {
        domActiveElemG.removeChild(document.getElementById("dragCircleG"))
        DragCircleG = null
    }

    if(ActiveElem)
    {

        if(activeElem)
            domActiveElemG.removeChild(activeElem)
            activeElem.removeAttribute("opacity")//--via smoothPath request---
            ActiveElem = null
    }
    var myFrame = document.getElementById('addElemPathEditFrame')
    addElemPathFrameDiv.style.height = addElemPathFrameDiv.scrollHeight+"px"
    myFrame.height = addElemPathEditFrameDiv.scrollHeight

    mySVG.removeAttribute('onclick')

}

//---X button---or[X] key---
function closeDrawPathEdit()
{
    var cw = addElemPathEditCw
   
    mySVG.removeAttribute("onclick")
    closeIframe("addElemPathEdit")
    FillChange = false
    DrawPathStart = false
   DrawPathEdit = false
    var cw = addElemPathEditCw
    var elemTimelinded = false

    DragPointArray =[]
    PathPointArray =[]
    Point = 0;
    FirstPathPointSet = false;
    TwoPlusPointsSet = false;
    PathClosedEdit = false;
    PathDecoupledEdit = false;
    PathFinishedEdit = false;
    PathCancelledEdit = false;
    ActiveElemStop = false
    if(document.getElementById("rubberLine"))
        domActiveElemG.removeChild(document.getElementById("rubberLine"))
        RubberLine = null;

    DragPointArray =[]
    PathPointArray =[]
    DragThisPoint = null;
    DragPointOK = false;
    PointArray =[]
    PausePathPointEdit = null
    PausePathEdit = false
    PrevKeyPathEdit = null
    PrevArrowKey = null
    PrevDashKey = null
    myKeyPath = null
    cw.drawPathEditRightAngleCheck.checked = false
    cw.drawPathEditPauseButton.disabled = true
    cw.drawPathEditUndoButton.disabled = true
    cw.drawPathEditCancelButton.disabled = true
    cw.drawPathEditFinishButton.disabled = true
    cw.drawPathEditCancelButton.innerHTML = "cancel[C]"
    cw.drawPathEditPauseButton.innerHTML = "pause [P]"
    cw.drawPathEditEncloseButton.disabled = true
    //--via legend reset---
    cw.drawPathEditStrokeArrowCheck.disabled = false
    cw.drawPathEditStrokeDashCheck.disabled = false
    cw.drawPathEditStrokeArrowCheck.checked = false
    cw.drawPathEditStrokeDashCheck.checked = false
    cw.drawPathEditStrokeSelect.disabled = false

    cw.drawPathEditCancelButton.style.backgroundColor = ""
    cw.drawPathEditCancelButton.title = "cancel this path"

    cw.drawPathEditTopButtons.style.visibility = "visible"
    cw.smoothPathEditButton.innerHTML = "smooth[S]"
    cw.smoothPathEditButton.disabled = true

    DrawPathType = 'linear'

    if(document.getElementById("activeElem"))
        domActiveElemG.removeChild(document.getElementById("activeElem"))
        if(document.getElementById("drawPathSmooth"))
        domActiveElemG.removeChild(document.getElementById("drawPathSmooth"))
        if(document.getElementById("dragCircleG"))
    {
        domActiveElemG.appendChild(domDrawX)
        domActiveElemG.appendChild(dragDot)
        domActiveElemG.removeChild(document.getElementById("dragCircleG"))

    }

     if(PathDeleted == false)
     {
         var elemObjEdit = document.getElementById(DrawPathEditId)
        elemObjEdit.style.display = ""


     }
      PathDeleted=false
   // DrawPathEditId = null

    ActiveElem = null
   ActivePathCopy = false
   Dragging=false
   CopyPathArray =[]
  cw.editSpan.innerHTML="Edit Path&nbsp;"
  cw.drawPathEditDeleteButton.style.visibility="visible"
    //---detach point drag to mySVG---
    mySVG.removeAttribute("onmousemove")
    mySVG.removeAttribute("onmousedown")
    mySVG.removeAttribute("onmouseup")
    window.removeEventListener("keypress", keyPressPathEdit)
    mySVG.removeEventListener("keypress", keyPressPathEdit)
    ActiveElemG.attr("transform", null)

    DrawX.style("display", "none")
    coverOff()
    // commentDiv.style.visibility = "hidden"
    cw.adjustedRotatePathValue.value = 0

}
var PrevKeyPathEdit = null
var PrevArrowKey = null
var PrevDashKey = null
var myKeyPath = null
function keyPressPathEdit(evt)
{

    myKeyPath = (evt.charCode)? evt.which: evt.keyCode //===ff===
        var cw = addElemPathEditCw

        if(myKeyPath) //--looses focus on finish/close---
    {

        if(ActiveElem)
        {
            //---e key for enclose path---!
            if(myKeyPath==101) //---E: enclose path
            {
                if(PathClosedEdit==false)
                    encloseDrawPathEdit()
                    else
                        reopenDrawPathEdit()
            }
            else if(myKeyPath==117) //---u:undo---!
            {
                undoDrawPathEdit()
            }
            else if(myKeyPath==112) //---p;pause---
            {
                if(PrevKeyPathEdit==112)
                    unPauseDrawPathEdit()
                    else
                        pauseDrawPathEdit()
            }
            else if(myKeyPath==99) //---C:cancel---!
                closeDrawPathEdit()
                else if(myKeyPath==102 && TwoPlusPointsSet==true) //---F; end,close,finish--
                {
                    stopPathPointsEdit()
                    finishDrawPathEdit()
                }
                else if(myKeyPath==120) //---X close---
                {

                    closeDrawPathEdit()
                }

                else if(myKeyPath==115) //[0]---Linear path---
                {

                    drawPathEditSmoothSelected()
                }

        }

        if(myKeyPath==100) //[D]---Dash---
        {
            if(PrevDashKey!=100)
            {
                cw.drawPathEditStrokeDashCheck.checked = true
                PrevDashKey = 100
            }
            else
            {
                cw.drawPathEditStrokeDashCheck.checked = false
                PrevDashKey = null
            }
            drawPathEditStrokeDashChecked()
        }
        else if(myKeyPath==97) //[Z]---Arrow---
        {
            if(PrevArrowKey!=97)
            {
                cw.drawPathEditStrokeArrowCheck.checked = true
                PrevArrowKey = 97
            }
            else
            {
                cw.drawPathEditStrokeArrowCheck.checked = false
                PrevArrowKey = null
            }
            drawPathEditStrokeArrowChecked()
        }
        else if(myKeyPath==108) //---L:right ANGLE---!
        {
            if(cw.drawPathEditRightAngleCheck.checked==true)
            {
                cw.drawPathEditRightAngleCheck.checked = false
                if(RubberLine)
                {
                    rubberLine.setAttribute("x2", SVGx)
                    rubberLine.setAttribute("y2", SVGy)
                }
            }
            else
            {
                cw.drawPathEditRightAngleCheck.checked = true
                if(RubberLine)
                {
                    rubberLine.setAttribute("x2", NextX)
                    rubberLine.setAttribute("y2", NextY)
                }
            }
        }

    }
    return false
}

var PausePathPointEdit = null
var PausePathEdit = false
//---toggle pause button[P]
function pauseDrawPathEdit()
{
    var cw = addElemPathEditCw
    if(PausePathEdit==false)
    {
        PausePathEdit = true //---stop track---
        //--get last dragPoint---
        PausePathPointEdit = document.getElementById("dragPnt"+Point)

        stopPathPointsEdit()

        PrevKeyPathEdit = 112

        cw.drawPathEditPauseButton.innerHTML = "restart[P]"
        //---remove click event---
        mySVG.removeAttribute("onclick")

        PathDecoupledEdit = true;

    }
    else
        unPauseDrawPathEdit()

}
//---pause, enclose, finish---
function stopPathPointsEdit()
{
    var cw = addElemPathEditCw
    if(PathCancelledEdit==false && PathDecoupledEdit==false && TwoPlusPointsSet==true)
    {
        RubberLine.style("visibility", "hidden")
        PathDecoupledEdit = true;
        //----remove startNewPath function from svg---
        mySVG.removeAttribute("onclick")

    }
}
function unPauseDrawPathEdit()
{
    PathDecoupledEdit = false;
    var cw = addElemPathEditCw

    RubberLine.style("visibility", "visible")
    .attr("x2", SVGx)
    .attr("y2", SVGy)
    PausePathEdit = false
    PrevKeyPathEdit = null
    cw.drawPathEditPauseButton.innerHTML = "pause [P]"
    mySVG.setAttribute('onclick', 'clickNextPathPointEdit()')

}

//---toggle Undo[U]----
function undoDrawPathEdit()
{
    var cw = addElemPathEditCw

    if(PathClosedEdit==false)
    {
        //---allows undo if pause in effect----
        if(PausePathEdit==true&& activeElem.pathSegList.numberOfItems>0)
            unPauseDrawPathEdit()

            if(RubberLine && activeElem.pathSegList.numberOfItems>1)
        {
            //---extract circle from array used for writeTrackTable()
            PathPointArray.splice(Point, 1)
            PathLLArray.splice(Point, 1)
            var segs = activeElem.pathSegList.numberOfItems
            var lastSeg = activeElem.pathSegList.getItem(segs-1)

            var dragPnt = document.getElementById("dragPnt"+(segs-1))

            if(dragPnt)
                dragCircleG.removeChild(dragPnt)

                activeElem.pathSegList.removeItem(segs-1)
                Point--
                var newD = activeElem.getAttribute("d")
                activeElem.setAttribute("d", newD)
                if(DrawPathType!="linear")
            {
                var line = d3.line().curve(d3.curveBasis);
                DrawPathEditSmooth.data([PathPointArray])
                DrawPathEditSmooth.attr('d', line);
            }

            if((segs-1)==1)
            {
                var segs = activeElem.pathSegList.numberOfItems
                var lastSeg = activeElem.pathSegList.getItem(segs-1)

                var x = lastSeg.x
                var y = lastSeg.y

                RubberLine.attr("x1", x)
                RubberLine.attr("y1", y)

                cw.drawPathEditUndoButton.disabled = true
                cw.drawPathEditFinishButton.disabled = true
            }

            if((segs-1)!=1)
            {
                var segs = activeElem.pathSegList.numberOfItems
                var lastSeg = activeElem.pathSegList.getItem(segs-1)

                var x = lastSeg.x
                var y = lastSeg.y
                RubberLine.attr("x1", x)
                RubberLine.attr("y1", y)

            }

            if((segs-1)<3)
                cw.drawPathEditEncloseButton.disabled = true

        }
    }
}

//--enclose[E] button----
function encloseDrawPathEdit()
{
    if(PathClosedEdit==false) //==needed for button---
    {

        var cw = addElemPathEditCw

        stopPathPointsEdit();
        cw.drawPathEditUndoButton.disabled = true
        cw.drawPathEditPauseButton.disabled = true

        //---adjust last point at right angle to first point---
        if(cw.drawPathEditRightAngleCheck.checked==true)
        {
            var pathSegs = activeElem.pathSegList
            var segs = pathSegs.numberOfItems

            var startSeg = pathSegs.getItem(0)
            var firstX = startSeg.x
            var firstY = startSeg.y
            var lastSeg = pathSegs.getItem(segs-1)
            var prevSeg = pathSegs.getItem(segs-2)

            var lastX = lastSeg.x
            var lastY = lastSeg.y
            var prevX = prevSeg.x
            var prevY = prevSeg.y

            if(prevX==lastX)
            {
                var finalY = firstY;
                var finalX = lastX;
            }
            if(prevY==lastY)
            {
                var finalX = firstX;
                var finalY = lastY;
            }

            lastSeg.x = finalX
            lastSeg.y = finalY
            var lastPoint = document.getElementById("dragPnt"+Point)
            lastPoint.setAttribute("transform", "translate("+finalX+" "+finalY+")");
            PathPointArray[Point] =[finalX, finalY]
        }

        var pathSegZ = activeElem.createSVGPathSegClosePath()
        activeElem.pathSegList.appendItem(pathSegZ)

        PathClosedEdit = true;
        cw.drawPathEditEncloseButton.innerHTML = "reopen [E]"

        if(cw.drawPathEditRightAngleCheck.checked==true)
        {
            var pathSegs = activeElem.pathSegList
            var segs = pathSegs.numberOfItems

            PathPointArray =[];
            for(var k = 0; k<segs; k++)
            {
                var mySeg = pathSegs.getItem(k)
                PathPointArray.push([mySeg.x, mySeg.y])
            }
        }
        if(DrawPathEditSmooth)
        {
            var line = d3.line().curve(d3.curveBasisClosed);
            DrawPathEditSmooth.attr("d", line)
        }

    }
    else //when selected via button---
        reopenDrawPathEdit()

}

function reopenDrawPathEdit()
{
    var pathSegs = activeElem.pathSegList
    var segs = pathSegs.numberOfItems

    activeElem.pathSegList.removeItem(segs-1)

    PausePathPointEdit = document.getElementById("dragPnt"+Point)
    unPauseDrawPathEdit()

    var cw = addElemPathEditCw
    cw.drawPathEditEncloseButton.innerHTML = "enclose[E]"
    cw.drawPathEditUndoButton.disabled = false
    cw.drawPathEditPauseButton.disabled = false

    PathClosedEdit = false;
    if(DrawPathEditSmooth)
    {
        var line = d3.line().curve(d3.curveBasis);
        DrawPathEditSmooth.attr("d", line)
    }
}

//---button or [F]---
function finishDrawPathEdit()
{

    if(ActivePathCopy==false)
    {
    var cw = addElemPathEditCw
    DrawPathEdit = false
    var elemObj = document.getElementById(DrawPathEditId)

       var fill = cw.drawPathEditFillSelect.options[cw.drawPathEditFillSelect.selectedIndex].value
    var fillOpacity = cw.drawPathEditOpacitySelect.options[cw.drawPathEditOpacitySelect.selectedIndex].value
    var strokeOpacity = cw.drawPathEditStrokeOpacitySelect.options[cw.drawPathEditStrokeOpacitySelect.selectedIndex].value

    var finishedElem = activeElem.cloneNode(true)

    if(EditPathFill.indexOf("url")!=-1&&cw.drawPathEditFillSelect.selectedIndex==0)
    {
        finishedElem.setAttribute("fill",EditPathFill)
        finishedElem.setAttribute("fill-opacity",EditPathFillOpacity)
    }
    else
    {
        finishedElem.setAttribute("fill",fill)
        finishedElem.setAttribute("fill-opacity",fillOpacity)
    }


    if(DrawPathType=="basis")
    {

        finishedElem.setAttribute("linearD", activeElem.getAttribute("d"))
        finishedElem.setAttribute("d", drawPathSmooth.getAttribute("d"))
        finishedElem.setAttribute("type", "basis")
        domActiveElemG.removeChild(drawPathSmooth)

    }
    else
    {

        finishedElem.setAttribute("type", "linear")

    }

    finishedElem.setAttribute("stroke-opacity", strokeOpacity)    
    finishedElem.removeAttribute("opacity")
    //finishedElem.setAttribute("stroke-opacity",opacityStroke)
    finishedElem.setAttribute("id", DrawPathEditId)
    finishedElem.setAttribute("class", "pathElem")
    finishedElem.style.cursor = "default"

    finishedElem.setAttribute("onmousedown", "startPathDrawEdit("+DrawPathEditId+",evt)")
    finishedElem.setAttribute("pointer-events", "visible")
    var ctm = finishedElem.getCTM()
    RAD2DEG = 180 / Math.PI;
    var rotateAngle = Math.atan2(ctm.b, ctm.a) * RAD2DEG;
    finishedElem.setAttribute("rotateAngle", rotateAngle)

    domElemG.insertBefore(finishedElem, elemObj)
    UpdateThisPath = finishedElem
    domElemG.removeChild(elemObj)
    }
    else
    {
       for(var m=0;m<CopyPathArray.length;m++)
       {
          var copy=CopyPathArray[m]
          var id=copy.id
          copy.setAttribute("onmousedown","startPathDrawEdit("+id+",evt)")
          copy.style.cursor = "default"

          var sCTM = copy.getCTM()
        var svgRoot = copy.ownerSVGElement

        var segList = copy.pathSegList
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

            }

            if(segObj.x1 && segObj.y1)
            {
                var mySVGPoint1 = svgRoot.createSVGPoint();
                mySVGPoint1.x = segObj.x1
                mySVGPoint1.y = segObj.y1
                mySVGPointTrans1 = mySVGPoint1.matrixTransform(sCTM)
                segObj.x1 = mySVGPointTrans1.x
                segObj.y1 = mySVGPointTrans1.y

            }
            if(segObj.x2 && segObj.y2)
            {
                var mySVGPoint2 = svgRoot.createSVGPoint();
                mySVGPoint2.x = segObj.x2
                mySVGPoint2.y = segObj.y2
                mySVGPointTrans2 = mySVGPoint2.matrixTransform(sCTM)
                segObj.x2 = mySVGPointTrans2.x
                segObj.y2 = mySVGPointTrans2.y

            }
        }

        copy.removeAttribute("transform")

       }


    }
    closeDrawPathEdit()

}

var UpdateThisPath