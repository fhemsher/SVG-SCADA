// fired at cursorLoc.js---
function trackDrawPath()
{
     var cw = addElemPathCw

    if
    (ActiveElem==null&&DrawPathStart==true&&cw.dragAddPathCheck.checked==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")

    }

    activeElem = document.getElementById("activeElem") //--for edit---

    if(activeElem&&ActiveElem&&ActiveElemStop==false) //   &&ActiveElemStop==false
    {


        var currentPoints = activeElem.getAttribute("d");

        var pnt = mySVG.createSVGPoint();
        pnt.x = SVGx;
        pnt.y = SVGy;
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = domActiveElemG.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        NextX = SVGx
        NextY = SVGy
        var pathSegs = activeElem.pathSegList
        var segs = pathSegs.numberOfItems
        if(currentPoints.indexOf("z")==-1)
            var lastSeg = pathSegs.getItem(segs-1)
            else
                var lastSeg = pathSegs.getItem(segs-2)

                var lastX = lastSeg.x
                var lastY = lastSeg.y

                //---rightAngle---
             if(cw.drawPathRightAngleCheck.checked==true)
            {
                var xDiff = Math.abs(lastX-SVGx);
                var yDiff = Math.abs(lastY-SVGy);
                if(xDiff>yDiff)NextY = lastY;
                if(yDiff>xDiff)NextX = lastX;

            }
        if(RubberLine&&PausePath==false&&PathClosed==false)
        {
            rubberLine.setAttribute("x2", NextX)
            rubberLine.setAttribute("y2", NextY)

        }

        SegNextX = NextX
        SegNextY = NextY

    }
}

var DrawPath = false
var DrawPathStart = false
var ActiveElemStop = false
//---on frame load or open drawPath---
function startPathDraw()
{
     DrawX.attr("stroke","violet")
    mySVG.setAttribute('onclick', "placeDrawPath()")
    ActiveElem = null
    DrawPathStart = true
    DrawPath = false
    NewEndArrow = null
    PathClosed=false
    window.addEventListener("keypress", keyPressPath, false);
    //---attach point drag to mySVG---
    mySVG.setAttribute("onmousedown", "startDragPoint(evt)")
    mySVG.setAttribute("onmousemove", "dragPoint(evt)")
    mySVG.setAttribute("onmouseup", "endDragPoint()")

    coverOn()

    var cw = addElemPathCw

}
//---click on svg layer---
var ActivePoint
function placeDrawPath()
{
    var cw = addElemPathCw

    PathLLArray =[]

    var strokeWidth = cw.drawPathStrokeWidthSelect.options[cw.drawPathStrokeWidthSelect.selectedIndex].text
    var strokeColor = cw.drawPathStrokeSelect.options[cw.drawPathStrokeSelect.selectedIndex].value
    var fillColor = cw.drawPathFillSelect.options[cw.drawPathFillSelect.selectedIndex].value
    var opacity= cw.drawPathOpacitySelect.options[cw.drawPathOpacitySelect.selectedIndex].text
    var opacityStroke= cw.drawPathOpacitySelect.options[cw.drawPathStrokeOpacitySelect.selectedIndex].text
    mySVG.addEventListener("keypress", keyPressPath, false)



    ActiveElem = ActiveElemG.append("path")
    .attr("id", "activeElem")
    .attr("fill", fillColor)
    .attr("fill-opacity",opacity)
    .attr("stroke", strokeColor)
    .attr("stroke-width", strokeWidth)
    .attr("stroke-opacity", opacityStroke)
    .style("cursor", "default")

    var firstX
    var firstY

    firstX = SVGx
    firstY = SVGy

    DrawX.style("display", "inline")
    tfm("domDrawX", firstX, firstY, 1)

    if(cw.drawPathStrokeDashCheck.checked==true)
        ActiveElem.attr("stroke-dasharray", "8 4")

    if(cw.drawPathShadowCheck.checked==true)
        ActiveElem.attr("filter", "url(#drop-shadow)")




      if(cw.drawPathPipe3DCheck.checked==true)
      {
          ActiveElem.attr("filter", "url(#pipe3D)")
          ActiveElem.attr("stroke-linejoin", "round")
          cw.drawPathShadowCheck.checked=false
          cw.drawPathShadowCheck.disabled=true
      }



        if(cw.drawPathStrokeArrowCheck.checked==true)
        ActiveElem.attr("marker-end", "url(#"+EndArrowId+")")

        activeElem = document.getElementById("activeElem")

        var pathSegM0 = activeElem.createSVGPathSegMovetoAbs(firstX, firstY)
        activeElem.pathSegList.appendItem(pathSegM0)

        RubberLine = ActiveElemG.append("line")
        .attr("id", "rubberLine")
        .attr("stroke", strokeColor)
        .attr("stroke-width", strokeWidth)
        //.attr("marker-end", "url(#endArrow)")
        .attr("x1", firstX)
        .attr("y1", firstY)
        .attr("x2", firstX)
        .attr("y2", firstY)

        DragCircleG = ActiveElemG.append("g")
        .attr("id", "dragCircleG")
        .append("circle")
        .attr("id", "dragPnt0")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("transform", "translate("+firstX+" "+firstY+")")
        .attr("r", 8)
        .attr("opacity", ".6")
        .attr("fill", "lime")
        .attr("stroke", "black")
        .attr("stroke-width", "1")
        .attr("Point", 0)
        .attr("class", "dragTarget")

        .style("cursor", "move")

      //  tfm("dragCircleG", PrevTransX, PrevTransY, PrevScale)
        SegSetX = firstX
        SegSetY = firstY

        FirstPathPointSet = true
        PathPointArray.push([firstX, firstY])

        mySVG.setAttribute('onclick', "clickNextPathPoint()")
        PathStart =[firstX, firstY]

        cw.drawPathPauseButton.disabled = true
        cw.drawPathUndoButton.disabled = true
        cw.drawPathCancelButton.disabled = true
        cw.drawPathFinishButton.disabled = true
        cw.drawPathCancelButton.innerText = "cancel[C]"
        cw.drawPathPauseButton.innerText = "pause [P]"
        cw.drawPathEncloseButton.disabled = true

        cw.drawPathPauseButton.disabled = false
        cw.drawPathCancelButton.disabled = false

        DrawPath = true
        cw.dragAddPathCheck.checked=false
    cw.dragAddPathCheck.disabled=true
}

var DragCircleG;
//var NextPoints;  //----used  to pick points 2+,
var DragPointArray =[]
var Point = 0;
var FirstPathPointSet = false;
var TwoPlusPointsSet = false;
var PathClosed = false;
var PathDecoupled = false;
var PathFinished = false;
var PathCancelled = false;
//---used to realign the last point on right angle, closed---
var RubberLine = null;
var DragPointOK = false
var DragThisPoint = null;
var DragPointOK = false;
var PathPointArray =[]
var PathLLArray =[]
var PausePathPoint = null
var PausePath = false
var PrevKeyPath = null
var PrevLatLng
//---tracking--
var NextX
var NextY

var SegSetX
var SegSetY
var SegNextX
var SegNextY

//----each mouse click fired from the SVG---
function clickNextPathPoint()
{

    var cw = addElemPathCw
    Point++;

    var pnt = mySVG.createSVGPoint();
    pnt.x = SVGx;
    pnt.y = SVGy;
    //---elements in different(svg) viewports, and/or transformed ---
    var sCTM = domActiveElemG.getScreenCTM();
    var Pnt = pnt.matrixTransform(sCTM.inverse());

    var nextX = SVGx
    var nextY = SVGy

      if(cw.drawPathPipe3DCheck.checked==true)
      {
          ActiveElem.attr("filter", "url(#pipe3D)")
          ActiveElem.attr("stroke-linejoin", "round")

      }


    //---rightAngle---
    if(cw.drawPathRightAngleCheck.checked==true)
    {
      if(cw.drawPathPipe3DCheck.checked==true &&Point==1)
      {
         ActiveElem.attr("filter", null)
          ActiveElem.attr("stroke-linejoin", null)

      }
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

    if(cw.drawPathStrokeArrowCheck.checked==true)
    {
        createPathArrow()
        activeElem.setAttribute("marker-end", "url(#"+EndArrowId+")")
    }

    SegSetX = nextX
    SegSetY = nextY
    var pathSegL = activeElem.createSVGPathSegLinetoAbs(nextX, nextY)
    activeElem.pathSegList.appendItem(pathSegL)
    //--update
    var d = activeElem.getAttribute("d")
    ActiveElem.attr("d", d)

    if(TwoPlusPointsSet==false)
        cw.drawPathFinishButton.disabled = false
        else if(TwoPlusPointsSet==true)
        {
            cw.drawPathEncloseButton.disabled = false
            cw.smoothPathButton.disabled = false
        }

        TwoPlusPointsSet = true;

    cw.drawPathUndoButton.disabled = false
    cw.drawPathFinishButton.disabled = false

    cw.drawPathUndoButton.disabled = false
    cw.drawPathFinishButton.disabled = false
    if(Point>1)
        cw.drawPathEncloseButton.disabled = false


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
var DrawPathSmooth
function drawPathSmoothSelected()
{
    var cw = addElemPathCw
    DrawPathType = "basis" //--bundle---
    var strokeWidth = cw.drawPathStrokeWidthSelect.options[cw.drawPathStrokeWidthSelect.selectedIndex].text
    var strokeColor = cw.drawPathStrokeSelect.options[cw.drawPathStrokeSelect.selectedIndex].value
    var fillColor = cw.drawPathFillSelect.options[cw.drawPathFillSelect.selectedIndex].value
    var opacity = cw.drawPathOpacitySelect.options[cw.drawPathOpacitySelect.selectedIndex].text

    //if(document.getElementById("drawPathSmooth"))
    //domActiveElemG.removeChild(document.getElementById("drawPathSmooth"))

    //---get linear points---
    if(!DrawPathSmooth)
    {
          if(activeElem.getAttribute("d").indexOf("z")==-1)
                 var line = d3.line().curve(d3.curveBasis);
               else
               var line = d3.line().curve(d3.curveBasisClosed);

        var data = PathPointArray
        DrawPathSmooth = ActiveElemG.append('path')
        .data([data])
        .attr("id", "drawPathSmooth")
        .attr("pointer-events", "none")
        .attr("fill", fillColor)
        .attr("fill-opacity", opacity)
        .attr("stroke", strokeColor)
        .attr("stroke-width", strokeWidth)
       .attr('d', line)

        activeElem.setAttribute("fill","none")
        activeElem.setAttribute("fill-opacity","0")

        if(cw.drawPathStrokeDashCheck.checked==true)
            DrawPathSmooth.attr("stroke-dasharray", "8 4")
        if(cw.drawPathShadowCheck.checked==true)
            DrawPathSmooth.attr("filter", "url(#drop-shadow)")
               if(cw.drawPathPipe3DCheck.checked==true)
               {
                    DrawPathSmooth.attr("filter", "url(#pipe3D)")
                    cw.drawPathShadowCheck.checked=false
                    cw.drawPathShadowCheck.disabled=true
                    drawPathSmooth.removeAttribute("stroke-linejoin")
              }
            if(cw.drawPathStrokeArrowCheck.checked==true)
            drawPathSmooth.setAttribute("marker-end", "url(#"+EndArrowId+")")

            cw.drawPathRightAngleCheck.checked=false
             activeElem.removeAttribute("rightAngle") 

        if(PathClosed==true)
        {
            var line = d3.line().curve(d3.curveBasisClosed);
            DrawPathSmooth.attr("d", line)
        }
        if(ActiveElem)
        {
            ActiveElem.attr("type", DrawPathType)
            ActiveElem.attr("linearD", ActiveElem.attr("d"))
            ActiveElem.attr("opacity", ".3")
        }
        //  ActiveElemG.attr("pointer-events","none")

        cw.smoothPathButton.innerHTML = "linear[S]"
         DrawPathType="basis"
    }
    else
    {
        if(ActiveElem)
        {     activeElem.setAttribute("fill",fillColor)
            activeElem.setAttribute("fill-opacity",opacity)
            activeElem.removeAttribute("opacity")
            activeElem.removeAttribute("linearD")
            activeElem.removeAttribute("opacity")
            dragCircleG.setAttribute("visibility", "visible")
            domActiveElemG.removeChild(drawPathSmooth)
            DrawPathSmooth = null

        }
        ActiveElemG.attr("pointer-events", null)
        cw.smoothPathButton.innerHTML = "smooth[S]"
         DrawPathType="linear"
    }
 window.focus()
}

function showDrawPathStrokeBg()
{
    var cw = addElemPathCw
    var stroke = cw.drawPathStrokeSelect.options[cw.drawPathStrokeSelect.selectedIndex].value
    if(stroke!="none")
        cw.drawPathStrokeBg.style.backgroundColor = stroke
        else
            cw.drawPathStrokeBg.style.backgroundColor = ""
            if(ActiveElem)
            ActiveElem.attr("stroke", stroke)
            if(cw.drawPathStrokeArrowCheck.checked==true)
        {
            createPathArrow()
            if(DrawPathType!="linear")
                DrawPathSmooth.attr("marker-end", "url(#"+EndArrowId+")")
        }
        if(DrawPathType!="linear")
        DrawPathSmooth.attr("stroke", stroke)
 window.focus()

        
}

function drawPathFillOpacitySelected()
{
    var cw = addElemPathCw
    var fillOpacity = cw.drawPathFillOpacitySelect.options[cw.drawPathFillOpacitySelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("fill-opacity", fillOpacity)
        if(DrawPathType!="linear")
        DrawPathSmooth.attr("fill-opacity", fillOpacity)
 window.focus()

}


function drawPathStrokeOpacitySelected()
{
    var cw = addElemPathCw
    var strokeOpacity = cw.drawPathStrokeOpacitySelect.options[cw.drawPathStrokeOpacitySelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("stroke-opacity", strokeOpacity)
        if(DrawPathType!="linear")
        DrawPathSmooth.attr("stroke-opacity", strokeOpacity)
 window.focus()

}



function drawPathStrokeSelected()
{
    var cw = addElemPathCw
    var stroke = cw.drawPathStrokeSelect.options[cw.drawPathStrokeSelect.selectedIndex].value

    if(ActiveElem)
        ActiveElem.attr("stroke", stroke)

        if(cw.drawPathStrokeArrowCheck.checked==true)
        drawPathStrokeArrowChecked()
 window.focus()

}

function drawPathStrokeWidthSelected()
{
    var cw = addElemPathCw
    var strokeWidth = cw.drawPathStrokeWidthSelect.options[cw.drawPathStrokeWidthSelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("stroke-width", strokeWidth)
        if(DrawPathType!="linear")
        DrawPathSmooth.attr("stroke-width", strokeWidth)
 window.focus()

}
function drawPathStrokeOpacitySelected()
{
    var cw = addElemPathCw
    var strokeOpacity = cw.drawPathStrokeOpacitySelect.options[cw.drawPathStrokeOpacitySelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("stroke-opacity", strokeOpacity)
        if(DrawPathType!="linear")
        DrawPathSmooth.attr("stroke-opacity", strokeOpacity)
 window.focus()

}

function drawPathStrokeDashChecked()
{
    var cw = addElemPathCw
    if(cw.drawPathStrokeDashCheck.checked==true)
    {
        if(ActiveElem)
            ActiveElem.attr("stroke-dasharray", "8 4")
            if(DrawPathType!="linear")
            DrawPathSmooth.attr("stroke-dasharray", "8 4")
    }
    else
    {
        if(ActiveElem)
            activeElem.removeAttribute("stroke-dasharray")
            if(DrawPathType!="linear")
            drawPathSmooth.removeAttribute("stroke-dasharray")
    }
 window.focus()

}



function drawPathPipe3DChecked()
  {
     var cw = addElemPathCw
    if(cw.drawPathPipe3DCheck.checked==true)
    {
         cw.drawPathShadowCheck.checked=false
         cw.drawPathShadowCheck.disabled=true
        if(ActiveElem)
        {    ActiveElem.attr("stroke-linejoin", "round")
            ActiveElem.attr("filter", "url(#pipe3D)")
            if(DrawPathType!="linear")
            DrawPathSmooth.attr("filter", "url(#pipe3D)")

        }
    }
    else
    {      cw.drawPathShadowCheck.disabled=false
        if(ActiveElem)
        {
            activeElem.removeAttribute("filter")
            activeElem.removeAttribute("stroke-linejoin")

            if(DrawPathType!="linear")
            drawPathSmooth.removeAttribute("filter")
        }

    }

 window.focus()


  }




function drawPathShadowChecked()
{
    var cw = addElemPathCw
    if(cw.drawPathShadowCheck.checked==true)
    {
        if(ActiveElem)
            ActiveElem.attr("filter", "url(#drop-shadow)")
            if(DrawPathType!="linear")
            DrawPathSmooth.attr("filter", "url(#drop-shadow)")
    }
    else
    {
        if(ActiveElem)
            activeElem.removeAttribute("filter")
            if(DrawPathType!="linear")
            drawPathSmooth.removeAttribute("filter")
    }
 window.focus()

}

function drawPathStrokeArrowChecked()
{
    var cw = addElemPathCw
    if(cw.drawPathStrokeArrowCheck.checked==true)
    {
        createPathArrow()

        if(ActiveElem)
            ActiveElem.attr("marker-end", "url(#"+EndArrowId+")")
            if(DrawPathType!="linear")
            DrawPathSmooth.attr("marker-end", "url(#"+EndArrowId+")")
    }
    else
    {
        if(ActiveElem)
            activeElem.removeAttribute("marker-end")
            if(DrawPathType!="linear")
            drawPathSmooth.removeAttribute("marker-end")
    }
 window.focus()

}
//---create and/or changes arrow id=pathArrow for this path--
var EndArrowId
var NewEndArrow = false
function createPathArrow()
{
    var cw = addElemPathCw
    var strokeColor = cw.drawPathStrokeSelect.options[cw.drawPathStrokeSelect.selectedIndex].value
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

function showDrawPathFillBg()
{
    var cw = addElemPathCw
    var fill = cw.drawPathFillSelect.options[cw.drawPathFillSelect.selectedIndex].value
    if(fill!="none")
        cw.drawPathFillBg.style.backgroundColor = fill
        else
            cw.drawPathFillBg.style.backgroundColor = ""

            if(ActiveElem)
            {

               if(DrawPathType!="linear")
                    DrawPathSmooth.attr("fill", fill)
            else
               ActiveElem.attr("fill", fill)

            }

 window.focus()


}
function showDrawPathFillBg()
{
    var cw = addElemPathCw
    var fill = cw.drawPathFillSelect.options[cw.drawPathFillSelect.selectedIndex].value
    var opacity = cw.drawPathOpacitySelect.options[cw.drawPathOpacitySelect.selectedIndex].value


    if(fill!="none")
            cw.drawPathFillBg.style.backgroundColor = fill
        else
            cw.drawPathFillBg.style.backgroundColor = ""



       if(ActiveElem)
        {
           if(cw.drawPathFillSelect.selectedIndex==0)
            {
                ActiveElem.attr("fill", "white")
                ActiveElem.attr("fill-opacity", 0)

            }
               if(DrawPathType!="linear")
               {
                    DrawPathSmooth.attr("fill", fill)
                    if(fill!="none")DrawPathSmooth.attr("fill", fill)

               }
            else
            {
               ActiveElem.attr("fill", fill)
                if(fill!="none")ActiveElem.attr("fill-opacity", opacity)

            }


      }
    
 window.focus()


}

function drawPathFillSelected()
{
    var cw = addElemPathCw
    var fill = cw.drawPathFillSelect.options[cw.drawPathFillSelect.selectedIndex].value
    if(cw.drawPathFillSelect.selectedIndex==0)
    {
        ActiveElem.attr("fill", "white")
        ActiveElem.attr("fill-opacity", 0)

    }
    else if(ActiveElem)
    {
        ActiveElem.attr("fill", fill)
        var opacity = cw.drawPathOpacitySelect.options[cw.drawPathOpacitySelect.selectedIndex].text

        ActiveElem.attr("fill-opacity", opacity)

    }
 window.focus()


}

function drawPathOpacitySelected()
{
    var cw = addElemPathCw
    var opacity = cw.drawPathOpacitySelect.options[cw.drawPathOpacitySelect.selectedIndex].text
    if(ActiveElem)
        ActiveElem.attr("fill-opacity", opacity)
        
 window.focus()

}
function rotatePathAdjust(factor)
{
    var cw = addElemPathCw
    var mult = parseFloat(cw.rotateDrawPathAdjustSelect.options[cw.rotateDrawPathAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotatePathValue.value = rotateAdd+parseFloat(cw.adjustedRotatePathValue.value)

    if(ActiveElem)
    {

        rote("domDrawX", rotateAdd)

        var t3r = d3.transform(DrawX.attr("transform"))

        var cx = t3r.translate[0]
        var cy = t3r.translate[1]

        var domElem = document.getElementById("domActiveElemG")
        var transformRequestObj = mySVG.createSVGTransform()
        var animTransformList = domElem.transform
        var transformList = animTransformList.baseVal
        transformRequestObj.setRotate(rotateAdd, cx, cy)
        transformList.appendItem(transformRequestObj)
        transformList.consolidate()
        var t3r = d3.transform(domElem.getAttribute("transform"))

        RotateAngle = t3r.rotate

    }
        
}

//---------------------DRAG PATH================================
var AddPathId
function dragAddPathChecked()
{
    var cw = addElemPathCw

    if(cw.dragAddPathCheck.checked)
    {
        mySVG.setAttribute("onmousedown", "startDragAddPath(evt)")
        mySVG.setAttribute("onmousemove", "dragAddPath(evt)")
        mySVG.setAttribute("onmouseup", "endDragAddPath(evt)")
        mySVG.removeAttribute("onclick")

        var dragPath=document.getElementById(AddPathId)

        dragPath.setAttribute("class", "dragTargetObj")
        dragPath.style.cursor="move"


    }
    else
    {
        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")

        var myPath=document.getElementById(AddPathId)
        myPath.setAttribute("class","pathElem")
        myPath.setAttribute("onmousedown", "startPathDrawEdit("+AddPathId+",evt)")
         myPath.style.cursor = "default"



        startPathDraw()
    }

}

function dragDrawPathAddFinish()
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

        //DrawX.attr("transform", "translate("+PathPointArray[0][0]+" "+PathPointArray[0][1]+")")
       /*
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
      */
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
