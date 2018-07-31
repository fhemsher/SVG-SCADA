/*
var pathPointDrag = d3.behavior.drag()
.on("dragstart", dragPointStart)
.on("drag", dragPointMove)
.on("dragend", dragPointEnd);
*/

//----mouse down---
var DraggingPoint
var DragThisPoint
var DragPointNum

//---dragging point with path segments following at right angles---
//----drag point in right angle path---
var PreX = null;
var PreY = null;
var PreCircle = null;
var PostCircle = null;
var PostX = null;
var PostY = null;
var PrePoint;
var PostPoint;

var TransformRequestObj
var TransList
var DragTarget = null;
var Dragging = false;
var OffsetX = 0;
var OffsetY = 0;
//---mouse down over element---
function startDragEdit(evt)
{
    if(!Dragging) //---prevents dragging conflicts on other draggable elements---
    {
        if(evt.target.getAttribute("class")=="dragTarget")
        {

            addNoSelectAtText()
            DragTarget = evt.target;

            var pnt = DragTarget.ownerSVGElement.createSVGPoint();
            pnt.x = SVGx
            pnt.y = SVGy
            //---elements in different(svg) viewports, and/or transformed ---
            var sCTM = DragTarget.getScreenCTM();
            var Pnt = pnt.matrixTransform(sCTM.inverse());

            OffsetX = Pnt.x
            OffsetY = Pnt.y

            TransformRequestObj = mySVG.createSVGTransform()
            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = DragTarget.transform
            TransList = myTransListAnim.baseVal
            DragPointNum = parseInt(DragTarget.getAttribute("Point"), 10)

            var path = document.getElementById("activeElem")

            var pathSegs = path.pathSegList
            var segs = pathSegs.numberOfItems

            DragPointArray =[];
            for(var k = 0; k<segs; k++)
            {
                var mySeg = pathSegs.getItem(k)
                DragPointArray.push([mySeg.x, mySeg.y])
            }

            var cw = addElemPathEditCw

            //---rightAngle---
            if(cw.drawPathEditRightAngleCheck.checked==true)
            {
                var pathSegs = path.pathSegList
                var segs = pathSegs.numberOfItems
                var pointZ = segs-1

                //---no Z last segment---
                if(path.pathSegList.getItem(segs-1).pathSegType!=1)
                {
                    var pointZ = segs-1

                    if(DragPointNum==0)
                        PrePoint = 0
                        else if(pointZ>=DragPointNum)
                            PrePoint = DragPointNum-1

                            if(DragPointNum==pointZ)
                            PostPoint = DragPointNum
                            else if(DragPointNum<pointZ)
                                PostPoint = DragPointNum+1
                }
                else //---last seg is a Z----
                {
                    var pointZ = segs-2

                    if(DragPointNum==0)
                        PrePoint = 1
                        else if(pointZ>=DragPointNum)
                            PrePoint = DragPointNum-1

                            if(DragPointNum==0)
                            PostPoint = pointZ
                            else if(DragPointNum==pointZ)
                                PostPoint = 0
                                else if(DragPointNum<pointZ)
                                    PostPoint = DragPointNum+1

                }

                ///get pre & post Circles///
                var circles = dragCircleG.childNodes //---includes DrawX---
                circleArray = new Array()
                for(i = 0; i<circles.length; i++)
                {
                    if(circles.item(i).nodeName=="circle") //---includes DrawX---
                        circleArray.push(circles.item(i))
                }

                PreCircle = circleArray[PrePoint]
                PostCircle = circleArray[PostPoint]
                var trackX = activeElem.pathSegList.getItem(DragPointNum).x
                var trackY = activeElem.pathSegList.getItem(DragPointNum).y
                PreX = activeElem.pathSegList.getItem(PrePoint).x
                PreY = activeElem.pathSegList.getItem(PrePoint).y
                PostX = activeElem.pathSegList.getItem(PostPoint).x
                PostY = activeElem.pathSegList.getItem(PostPoint).y
                if(trackX.toFixed(8)==PreX.toFixed(8))
                {
                    PreX = "track"
                }
                if(trackX.toFixed(8)==PostX.toFixed(8))
                {
                    PostX = "track"
                }
                if(trackY.toFixed(8)==PreY.toFixed(8))
                {
                    PreY = "track"
                }
                if(trackY.toFixed(8)==PostY.toFixed(8))
                {
                    PostY = "track"
                }

            }

            Dragging = true;
            // commentDiv.style.visibility="visible"
        }
    }
}
//---mouse move---
function dragEdit(evt)
{
    if(Dragging)
    {

        var pnt = DragTarget.ownerSVGElement.createSVGPoint();
        pnt.x = SVGx;
        pnt.y = SVGy;
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = DragTarget.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        var aCTM = activeElem.getScreenCTM();
        var next = pnt.matrixTransform(aCTM.inverse());
        next.x -= OffsetX;
        next.y -= OffsetY;

        Pnt.x -= OffsetX;
        Pnt.y -= OffsetY;

        TransformRequestObj.setTranslate(Pnt.x, Pnt.y)
        TransList.appendItem(TransformRequestObj)
        TransList.consolidate()
        //DragTarget.setAttribute("transform","translate("+SVGx+" "+SVGy+")")

        NextX = next.x
        NextY = next.y

        // commentDiv.innerHTML=LatLng[0].toFixed(6)+","+LatLng[1].toFixed(6)
        //  commentDiv.style.top=SVGy+30+"px"
        //  commentDiv.style.left=SVGx+10+"px"

        var path = document.getElementById("activeElem")

        path.pathSegList.getItem(DragPointNum).x = NextX
        path.pathSegList.getItem(DragPointNum).y = NextY
        var cw = addElemPathEditCw
        if(cw.drawPathEditRightAngleCheck.checked==false) //---rightAngle---
        {

            if(DragPointNum==0)
            {

                DrawX.attr("transform", "translate(" + NextX + "," + NextY + ")");

            }

        }
        else if(cw.drawPathEditRightAngleCheck.checked==true) //---rightAngle---
        {
            if(DragPointNum==0)
                DrawX.attr("transform", "translate(" + NextX + "," + NextY + ")");
            var prePnt = path.pathSegList.getItem(PrePoint)
            var myPnt = path.pathSegList.getItem(DragPointNum)
            var postPnt = path.pathSegList.getItem(PostPoint)
            var X, Y;
            myPnt.x = NextX
            myPnt.y = NextY

            if(PreX=="track") X = NextX; else X = PreX
                if(PreY=="track") Y = NextY; else Y = PreY

                PreCircle.setAttribute("transform", "translate(" + X + "," + Y + ")");
            PathPointArray[PrePoint] =[X, Y]
            if(PrePoint==0)
                DrawX.attr("transform", "translate(" + X + "," + Y + ")");

            prePnt.x = X
            prePnt.y = Y
            if(PostX=="track") X = NextX; else X = PostX
                if(PostY=="track") Y = NextY; else Y = PostY
                PostCircle.setAttribute("transform", "translate(" + X + "," + Y + ")");
            PathPointArray[PostPoint] =[X, Y]
            postPnt.x = X
            postPnt.y = Y
            NextX = X
            NextY = Y
            if(PostPoint==0)
                DrawX.attr("transform", "translate(" + X + "," + Y + ")");

        }

        PathPointArray[DragPointNum] =[NextX, NextY]

        SegNextX = NextX
        SegNextY = NextY

        if(DrawPathType=="basis")
        {

            DrawPathEditSmooth.data([PathPointArray])

            if(activeElem.getAttribute("d").indexOf("z")==-1)
                var line = d3.line().curve(d3.curveBasis);
            else
                var line = d3.line().curve(d3.curveBasisClosed);
            DrawPathEditSmooth.attr('d', line);

        }

    }
}
//--mouse up---
function endDragEdit()
{
    if(Dragging)
    {
        Dragging = false;
        var segList = activeElem.pathSegList

        var lastX = segList.getItem(Point).x
        var lastY = segList.getItem(Point).y

        RubberLine.attr("x1", lastX)
        RubberLine.attr("y1", lastY)
        //--build new array needed for tracktable if right angle---
        var cw = addElemPathEditCw
        if(cw.drawPathEditRightAngleCheck.checked==true)
        {

            var path = document.getElementById("activeElem")
            var pathSegs = path.pathSegList
            var segs = pathSegs.numberOfItems

            PathPointArray =[];
            for(var k = 0; k<segs; k++)
            {
                var mySeg = pathSegs.getItem(k)
                PathPointArray.push([mySeg.x, mySeg.y])
            }
        }
        removeNoSelectAtText()
    }
}
