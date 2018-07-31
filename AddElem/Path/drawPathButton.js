function resetPath()
{

    var cw = addElemPathCw
   // cw.drawPathRightAngleCheck.checked = false
    //--return---
    DrawX.style("display", "none")
    domDrawX.setAttribute("transform", "")
    domDrawX.removeAttribute("transform")

    NewEndArrow = false
    CurrentPathArrow = null
    DrawPath = false
    DragPointArray =[]
    PathPointArray =[]
    Point = 0;
    FirstPathPointSet = false;
    TwoPlusPointsSet = false;
    PathClosed = false;
    PathDecoupled = false;
    PathFinished = false;
    PathCancelled = false;
    ActiveElemStop = false
    if(document.getElementById("rubberLine"))
    domActiveElemG.removeChild(document.getElementById("rubberLine"))
    DrawX.attr("stroke","violet")

    RubberLine = null;

    DragThisPoint = null;
    DragPointOK = false;
    PointArray =[]
    PausePathPoint = null
    PausePath = false
    PrevKeyPath = null

    //cw.drawPathRightAngleCheck.checked = false
    cw.drawPathShadowCheck.disabled=false
    cw.drawPathPauseButton.disabled = true
    cw.drawPathUndoButton.disabled = true
    cw.drawPathCancelButton.disabled = true
    cw.drawPathFinishButton.disabled = true
    cw.drawPathCancelButton.innerHTML = "cancel[C]"
    cw.drawPathPauseButton.innerHTML = "pause [P]"
    cw.smoothPathButton.innerHTML = "smooth[S]"
    cw.smoothPathButton.disabled = true
    cw.drawPathEncloseButton.disabled = true

    DrawPathSmooth = null
    DrawPathType = 'linear'
    // cw.drawPathSmoothSelect.selectedIndex=0
    if(document.getElementById("drawPathSmooth"))
        domActiveElemG.removeChild(document.getElementById("drawPathSmooth"))

        if(document.getElementById("dragCircleG"))
    {
        DragCircleG.attr("transform", null)
        domActiveElemG.removeChild(document.getElementById("dragCircleG"))
        DragCircleG = null
    }

    if(ActiveElem)
    {
        ActiveElem.attr("transform", null)
        if(activeElem)
            domActiveElemG.removeChild(activeElem)
            ActiveElem.attr("opacity", null)//--via smoothPath request---

    }

    ActiveElem = null
    DrawPathSmooth = null

    var myFrame = document.getElementById('addElemPathFrame')
    addElemPathFrameDiv.style.height = addElemPathFrameDiv.scrollHeight+"px"
    myFrame.height = addElemPathFrameDiv.scrollHeight

}
function cancelDrawPath()
{

    resetPath()
    mySVG.setAttribute('onclick', "placeDrawPath()")

}

//---X button---or[X] key---
function closeDrawPath()
{

    var cw = addElemPathCw
    mySVG.removeAttribute('onclick')

    if(cw.dragAddPathCheck.checked)
    {
        var myPath=document.getElementById(AddPathId)
        myPath.setAttribute("class","pathElem")
        myPath.setAttribute("onmousedown", "startPathDrawEdit("+AddPathId+",evt)")
         myPath.style.cursor = "default"

    }

    cw.dragAddPathCheck.checked=false
    cw.dragAddPathCheck.disabled=true


    DrawPath = false
    DrawPathStart = false

    DrawPath = false
    DragPointArray =[]
    PathPointArray =[]
    Point = 0;
    FirstPathPointSet = false;
    TwoPlusPointsSet = false;
    PathClosed = false;
    PathDecoupled = false;
    PathFinished = false;
    PathCancelled = false;
    ActiveElemStop = false
    if(document.getElementById("rubberLine"))
        domActiveElemG.removeChild(document.getElementById("rubberLine"))
        RubberLine = null;

    DragThisPoint = null;
    DragPointOK = false;
    PointArray =[]
    PausePathPoint = null
    PausePath = false
    PrevKeyPath = null
    PrevArrowKey = null
    PrevDashKey = null
    myKeyPath = null
    //cw.drawPathRightAngleCheck.checked = false
    //cw.drawPathShadowCheck.disabled=false
    cw.drawPathPauseButton.disabled = true
    cw.drawPathUndoButton.disabled = true
    cw.drawPathCancelButton.disabled = true
    cw.drawPathFinishButton.disabled = true
    cw.drawPathCancelButton.innerHTML = "cancel[C]"
    cw.drawPathPauseButton.innerHTML = "pause [P]"
    cw.drawPathEncloseButton.disabled = true

    cw.drawPathStrokeArrowCheck.disabled = false
    cw.drawPathStrokeDashCheck.disabled = false
    cw.drawPathStrokeSelect.disabled = false

    cw.topTable.style.backgroundColor = "linen"
    cw.editSpan.innerHTML = "Add"
    cw.drawPathCancelButton.style.backgroundColor = ""
    cw.drawPathCancelButton.title = "cancel this path"
    //---show: needed--
    cw.rightAngleSpan.style.visibility = "visible"
    //cw.drawPathSmoothSelect.style.visibility="visible"
    cw.drawPathTopButtons.style.visibility = "visible"
    DrawPathSmooth = null
    DrawPathType = 'linear'
    //cw.drawPathSmoothSelect.selectedIndex=0
    if(document.getElementById("drawPathSmooth"))
        domActiveElemG.removeChild(document.getElementById("drawPathSmooth"))
        if(document.getElementById("dragCircleG"))
        domActiveElemG.removeChild(document.getElementById("dragCircleG"))
        if(document.getElementById("activeElem"))
        if(ActiveElemG.select("#activeElem"))
        domActiveElemG.removeChild(document.getElementById("activeElem"))
        //----edit in process---

        ActiveElem = null

        var myFrame = document.getElementById('addElemPathFrame')
        addElemPathFrameDiv.style.height = addElemPathFrameDiv.scrollHeight+"px"
        myFrame.height = addElemPathFrameDiv.scrollHeight

        //---detach point drag to mySVG---
        mySVG.removeAttribute("onmousedown")

        mySVG.removeAttribute("onmouseup")
        window.removeEventListener("keypress", keyPressPath)
        mySVG.removeEventListener("keypress", keyPressPath)

        DrawX.style("display", "none")
        coverOff()


}
var PrevKeyPath = null
var PrevArrowKey = null
var PrevDashKey = null
var myKeyPath = null
function keyPressPath(evt)
{
    var cw = addElemPathCw
    // myKeyPath=event.keyCode;
    myKeyPath = (evt.charCode)? evt.which: evt.keyCode //===ff===

        if(myKeyPath) //--looses focus on finish/close---
    {
        if(myKeyPath==120) //---X close---
        {
            closeIframe("addElemPath")
            closeDrawPath()
        }

        if(ActiveElem)
        {
            //---e key for enclose path---!
            if(myKeyPath==101) //---E: enclose path
            {
                if(PathClosed==false)
                    encloseDrawPath()
                    else
                        reopenDrawPath()
            }
            else if(myKeyPath==117) //---u:undo---!
            {
                undoDrawPath()
            }
            else if(myKeyPath==112) //---p;pause---
            {
                if(PrevKeyPath==112)
                    unPauseDrawPath()
                    else
                        pauseDrawPath()
            }
            else if(myKeyPath==99) //---C:cancel---!
                cancelDrawPath()
                else if(myKeyPath==102 && TwoPlusPointsSet==true) //---F; end,close,finish--
                {
                    stopPathPoints()
                    finishDrawPath()
                }

                else if(myKeyPath==115) //[0]---Linear path---
                {
                    // cw.drawPathSmoothSelect.selectedIndex=0
                    drawPathSmoothSelected()
                }

        }

        if(myKeyPath==100) //[D]---Dash---
        {
            if(PrevDashKey!=100)
            {
                cw.drawPathStrokeDashCheck.checked = true
                PrevDashKey = 100
            }
            else
            {
                cw.drawPathStrokeDashCheck.checked = false
                PrevDashKey = null
            }
            drawPathStrokeDashChecked()
        }
        else if(myKeyPath==97) //[Z]---Arrow---
        {
            if(PrevArrowKey!=97)
            {
                cw.drawPathStrokeArrowCheck.checked = true
                PrevArrowKey = 97
            }
            else
            {
                cw.drawPathStrokeArrowCheck.checked = false
                PrevArrowKey = null
            }
            drawPathStrokeArrowChecked()
        }
        else if(myKeyPath==108) //---L:right ANGLE---!
        {
            if(cw.drawPathRightAngleCheck.checked==true)
            {
                cw.drawPathRightAngleCheck.checked = false
                if(RubberLine)
                {
                    rubberLine.setAttribute("x2", SVGx)
                    rubberLine.setAttribute("y2", SVGy)
                }
            }
            else
            {
                cw.drawPathRightAngleCheck.checked = true
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

var PausePathPoint = null
var PausePath = false
//---toggle pause button[P]
function pauseDrawPath()
{
    var cw = addElemPathCw
    if(PausePath==false)
    {
        PausePath = true //---stop track---
        //--get last dragPoint---
        PausePathPoint = document.getElementById("dragPnt"+Point)

        stopPathPoints()

        PrevKeyPath = 112

        cw.drawPathPauseButton.innerHTML = "restart[P]"

        mySVG.setAttribute("onmousedown", "startDragPoint(evt)")
        mySVG.setAttribute("onmousemove", "dragPoint(evt)")
        mySVG.setAttribute("onmouseup", "endDragPoint()")
        //---remove click event---
        mySVG.removeAttribute('onclick')

        PathDecoupled = true;

    }
    else
        unPauseDrawPath()

}
//---pause, enclose, finish---
function stopPathPoints()
{
    var cw = addElemPathCw
    if(PathCancelled==false && PathDecoupled==false && TwoPlusPointsSet==true)
    {
        RubberLine.style("visibility", "hidden")
        PathDecoupled = true;
        //----remove startNewPath function from svg---
        mySVG.removeAttribute('onclick')
    }
}
function unPauseDrawPath()
{
    PathDecoupled = false;
    var cw = addElemPathCw
    RubberLine.style("visibility", "visible")
    .attr("x2", SVGx)
    .attr("y2", SVGy)
    PausePath = false
    PrevKeyPath = null
    cw.drawPathPauseButton.innerHTML = "pause [P]"
    ActiveElem.style("cursor", "default")
    mySVG.setAttribute('onclick', "clickNextPathPoint()")
    mySVG.setAttribute("onmousedown", "startDragPoint(evt)")
    mySVG.setAttribute("onmousemove", "dragPoint(evt)")
    mySVG.setAttribute("onmouseup", "endDragPoint()")

}

//---toggle Undo[U]----
function undoDrawPath()
{
    var cw = addElemPathCw

    if(PathClosed==false)
    {
        //---allows undo if pause in effect----
        if(PausePath==true&& activeElem.pathSegList.numberOfItems>0)
            unPauseDrawPath()

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
                ActiveElem.attr("d", newD)

                if((segs-1)==1)
            {
                var segs = activeElem.pathSegList.numberOfItems
                var lastSeg = activeElem.pathSegList.getItem(segs-1)

                var x = lastSeg.x
                var y = lastSeg.y

                RubberLine.attr("x1", x)
                RubberLine.attr("y1", y)
                cw.drawPathUndoButton.disabled = true
                cw.drawPathFinishButton.disabled = true
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
                cw.drawPathEncloseButton.disabled = true


                     if(DrawPathSmooth)
                     {
                             var line = d3.line().curve(d3.curveBasis);
                          DrawPathSmooth.data([PathPointArray])
                          .attr('d', line)
                    }


        }
    }
}

//--enclose[E] button----
function encloseDrawPath()
{
    if(PathClosed==false) //==needed for button---
    {

        var cw = addElemPathCw

        stopPathPoints();
        cw.drawPathUndoButton.disabled = true
        cw.drawPathPauseButton.disabled = true

        //---adjust last point at right angle to first point---
        if(cw.drawPathRightAngleCheck.checked==true)
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

            if(prevX.toFixed(8)==lastX.toFixed(8))
            {
                var finalY = firstY;
                var finalX = lastX;
            }
            if(prevY.toFixed(8)==lastY.toFixed(8))
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

        PathClosed = true;
        cw.drawPathEncloseButton.innerHTML = "reopen [E]"
         if(DrawPathSmooth)
            {
             var line = d3.line().curve(d3.curveBasisClosed);

              DrawPathSmooth.attr('d', line)

            }

    }
    else //when selected via button---
        reopenDrawPath()

}

function reopenDrawPath()
{
    var pathSegs = activeElem.pathSegList
    var segs = pathSegs.numberOfItems

    activeElem.pathSegList.removeItem(segs-1)

    PausePathPoint = document.getElementById("dragPnt"+Point)
    unPauseDrawPath()

    var cw = addElemPathCw
    cw.drawPathEncloseButton.innerHTML = "enclose[E]"
    cw.drawPathUndoButton.disabled = false
    cw.drawPathPauseButton.disabled = false
    if(DrawPathSmooth)
    {
       var line = d3.line().curve(d3.curveBasis);
        DrawPathSmooth.attr('d', line)
    }

    PathClosed = false;

}
//---button or [F]---
function finishDrawPath()
{
    var cw = addElemPathCw
    var finishedElem = activeElem.cloneNode(true)


    var fillColor = cw.drawPathFillSelect.options[cw.drawPathFillSelect.selectedIndex].value
    var opacity= cw.drawPathOpacitySelect.options[cw.drawPathOpacitySelect.selectedIndex].text
 var elemFill=finishedElem.getAttribute("fill")
     if(elemFill.indexOf("url")==-1&&cw.drawPathFillSelect.selectedIndex==0)
    {
        fillColor = "white"
        opacity = 0
    }
    else
    {

    finishedElem.setAttribute("fill", fillColor)
    finishedElem.setAttribute("fill-opacity", opacity)
    }

    finishedElem.removeAttribute("opacity")
    finishedElem.removeAttribute("stroke-opacity")

    if(DrawPathType=="basis")
    {

        finishedElem.setAttribute("d", drawPathSmooth.getAttribute("d"))

        var smoothD = finishedElem.getAttribute("d")
        var re33 = /3333333333/g
        var re66 = /6666666666/g
        var re99 = /9999999999/g
        smoothD = smoothD.replace(re33, "")
        smoothD = smoothD.replace(re66, "")
        smoothD = smoothD.replace(re99, "")
        finishedElem.setAttribute("d", smoothD)
        finishedElem.setAttribute("type", "basis")
        finishedElem.setAttribute("linearD", activeElem.getAttribute("d"))
        domActiveElemG.removeChild(drawPathSmooth)

    }
    else
    {

        finishedElem.setAttribute("type", "linear")

    }

    if(cw.drawPathRightAngleCheck.checked==true)
        finishedElem.setAttribute("rightAngle", "true")


        console.log("bogie - for date")
        var date = new Date()
        var utcMS = date.getTime()

        var id = "path"+utcMS
        finishedElem.setAttribute("id", id)

        finishedElem.setAttribute("onmousedown", "startPathDrawEdit("+id+",evt)")

        finishedElem.setAttribute("pointer-events", "visible")

        //      finishedElem.setAttribute("transform",domActiveElemG.getAttribute("transform") )

        //finishedElem.setAttribute("ll0",ll[0])
        //finishedElem.setAttribute("ll1",ll[1])

        var myTransform = domActiveElemG.getAttribute("transform")
        var linearD = activeElem.getAttribute("d")

        if(cw.drawPathRightAngleCheck.checked==true)
    {
        var pathSegs = activeElem.pathSegList
        var segs = pathSegs.numberOfItems

    }

    /*
  domWrapper.appendChild(activeElem)
  var bb = domWrapper.getBBox()
  var bbx = bb.x
  var bby = bb.y
  var bbw = bb.width
  var bbh = bb.height
  var bbCx = bbx+.5*bbw
  var bbCy = bby+.5*bbh
  activeElem.setAttribute("transform", "translate("+(-bbCx)+" "+(-bbCy)+")")
  var bb = domWrapper.getBBox()
  var bbx = bb.x
  var bby = bb.y
  var bbw = bb.width
  var bbh = bb.height
  var bbCx = bbx+.5*bbw
  var bbCy = bby+.5*bbh




  activeElem.removeAttribute("transform")

 */
    domActiveElemG.appendChild(activeElem)
    // AddPathCoordsArray.push([PathLLArray,ActiveScale,id,linearD])

    finishedElem.setAttribute("class", "pathElem")
    finishedElem.style.cursor = "default"

    domElemG.appendChild(finishedElem)
    //---update d Celestial map with this path---

    domActiveElemG.removeAttribute("transform")
    domActiveElemG.removeChild(activeElem)
    activeElem = null

    // newPath(id) //---send to server---
    resetPath()
    startPathDraw()
    AddPathId=finishedElem.getAttribute("id")
    cw.dragAddPathCheck.disabled=false


}

function newPath(id)
{
    var sendMe = document.getElementById(id).cloneNode("true")
    var sendObjString = new XMLSerializer().serializeToString(sendMe)

    //--remove redundent namespace--
    sendObjString = sendObjString.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/, "")

    var sendXML = "<SEND  folder=\""+FOLDER+"\" >"+sendObjString+"</SEND>"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Path/newPath.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);

    //setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---

}

function sendArrowDef(id)
{

    var sendMe = document.getElementById(id).cloneNode("true")
    var sendObjString = new XMLSerializer().serializeToString(sendMe)

    //--remove redundent namespace--
    sendObjString = sendObjString.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/, "")

    var sendXML = "<SEND  folder=\""+FOLDER+"\" >"+sendObjString+"</SEND>"

    var XMLFile = new XMLHttpRequest();
    XMLFile.open("POST", "../AddElem/Path/newEndArrow.asp", true);
    XMLFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
    XMLFile.send(sendXML);

    //setTimeout(aspResponse,2500)  //--remove 'var' from XMLFile (in mapSVGcomp.js)---

}