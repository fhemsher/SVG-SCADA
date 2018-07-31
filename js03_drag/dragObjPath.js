//----mouse down---
var DraggingObj = false
var objTransformRequestObj
var objTransList
var objDragTarget = null;
var ObjStartX
var ObjStartY
var ActiveScale
//---mouse down over element---
function startDragPath(evt)
{

    if(ActiveElem&&!DraggingObj) //---prevents dragging conflicts on other draggable elements---
    {
        if(evt.target.getAttribute("id")=="activeElem")
        {

            if(evt.target.getAttribute("class")=="dragTargetObj")
                objDragTarget = evt.target.parentNode

        }
        if(objDragTarget)
        {

            addNoSelectAtText()

            var pnt = objDragTarget.ownerSVGElement.createSVGPoint();
            pnt.x = evt.clientX;
            pnt.y = evt.clientY;
            //---elements in different(svg) viewports, and/or transformed ---
            var sCTM = objDragTarget.getScreenCTM();
            var Pnt = pnt.matrixTransform(sCTM.inverse());

            objTransformRequestObj = objDragTarget.ownerSVGElement.createSVGTransform()

            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = objDragTarget.transform
            objTransList = myTransListAnim.baseVal

            ObjStartX = Pnt.x
            ObjStartY = Pnt.y

            DraggingObj = true

            //DrawX.style("display","inline")
            //DragDot.style("display","inline")

        }
    }
    else
        DraggingObj = false

}
//---mouse move---
function dragPath(evt)
{
    if(DraggingObj)
    {

        var pnt = objDragTarget.ownerSVGElement.createSVGPoint();
        pnt.x = evt.clientX;
        pnt.y = evt.clientY;
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = objDragTarget.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        Pnt.x -= ObjStartX;
        Pnt.y -= ObjStartY;

        if(objDragTarget.getAttribute("id")=="dragDot")
        {
            var width = Pnt.x +parseFloat(ActiveRect.attr("width"))
            var height = Pnt.y +parseFloat(ActiveRect.attr("height"))
            if(width>0&& height>0)
            {
                objTransformRequestObj.setTranslate(Pnt.x, Pnt.y)
                objTransList.appendItem(objTransformRequestObj)
                objTransList.consolidate()

                ActiveRect.attr("width", width)
                ActiveRect.attr("height", height)

                var cornerX = RectCorner[0]
                var cornerY = RectCorner[1]
                var wx = cornerX+width
                var wy = cornerY
                var hx = cornerX+height
                var hy = cornerY+height
                commentDiv.innerHTML = numberWithCommas(width)+" x "+numberWithCommas(height)

                //objDragTarget.setAttribute("comment",numberWithCommas(width)+" x "+numberWithCommas(height) )

                var cw = addElemRectCw
                if(cw.drawRectStrokeRoundCheck.checked==true)
                {
                    ActiveRect.attr("rx", 5*parseFloat(ActiveRect.attr("stroke-width")))
                    ActiveRect.attr("ry", 5*parseFloat(ActiveRect.attr("stroke-width")))
                }

            }
        }
        else if (objDragTarget.getAttribute("id")!="dragDot")
        {
            objTransformRequestObj.setTranslate(Pnt.x, Pnt.y)
            objTransList.appendItem(objTransformRequestObj)
            objTransList.consolidate()
            DrawX.attr("transform", ActiveElem.attr("transform"))

        }

    }
}
//--mouse up---
var transObjX
var transObjY
function endDragPath(evt)
{
    if(DraggingObj)
    {

        //var t3=d3.transform(ActiveElem.attr("transform"))
        //var transX=t3.translate[0]
        // var transY=t3.translate[1]

        //Celestial.ActiveLL=Celestial.mapProjection.invert([transX,transY])

        removeNoSelectAtText()

        objDragTarget = null
        DraggingObj = false

    }
}
