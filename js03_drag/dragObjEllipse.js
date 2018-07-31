//----mouse down---
var DraggingObj = false
var objTransformRequestObj
var objTransList
var objDragTarget = null;
var ObjStartX
var ObjStartY
var ActiveScale
var ActiveElemStartTrans
var ActiveElemEndTrans
var CentXY
//---mouse down over element---
function startDragEllipse(evt)
{

    if(ActiveElem&&!DraggingObj||ActiveEllipseCopy==true) //---prevents dragging conflicts on other draggable elements---
    {
        if(evt.target.getAttribute("id")=="activeElem" || evt.target.getAttribute("id")=="dragDot"||ActiveEllipseCopy==true)
        {

            if(evt.target.getAttribute("class")=="dragTargetObj")//---all other elems--
                objDragTarget = evt.target
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

            //---used for align of projection/zoom on end drag---
            if(objDragTarget.getAttribute("id")=="activeElem")
                ActiveElemStartTrans =[SVGx, SVGy]

                objTransformRequestObj = objDragTarget.ownerSVGElement.createSVGTransform()

                //---attach new or existing transform to element, init its transform list---
                var myTransListAnim = objDragTarget.transform
                objTransList = myTransListAnim.baseVal

                ObjStartX = Pnt.x
                ObjStartY = Pnt.y

                DraggingObj = true
                if(objDragTarget.getAttribute("id")=="dragDot")
            {
                var rx = activeElem.getAttribute("rx")
                var ry = activeElem.getAttribute("ry")
                drawEllipseRxValue.value = rx
                drawEllipseRyValue.value = ry
                elemSizeDiv.style.visibility = "visible"
                elemSizeDiv.style.top = pnt.y+20+"px"
                elemSizeDiv.style.left = pnt.x+20+"px"

            }
            else
                elemSizeDiv.style.visibility = "hidden"

        }
    }
    else
        DraggingObj = false

}
//---mouse move---
function dragEllipse(evt)
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

        if(objDragTarget.getAttribute("id")=="dragDot" &&(DrawEllipse==true||EditEllipse==true))
        {
            var radiusX = parseFloat(ActiveElem.attr("rx"))
            radiusX = (Pnt.x+radiusX)
            var radiusY = parseFloat(ActiveElem.attr("ry"))
            radiusY = (Pnt.y+radiusY)

            if(radiusX>0&&radiusY>0)
            {

                ActiveElem.attr("rx", radiusX)
                ActiveElem.attr("ry", radiusY)

                //---rescale radius to current scale----

                objTransformRequestObj.setTranslate(Pnt.x, Pnt.y)
                objTransList.appendItem(objTransformRequestObj)
                objTransList.consolidate()

                var x = evt.clientX
                var y = evt.clientY+30

                var matrix = dragDot.transform.baseVal.consolidate().matrix;

                var transX = matrix.e
                var transY = matrix.f

                dragDot.setAttribute("transform", "translate("+(transX)+" "+transY+")")

                var rx = activeElem.getAttribute("rx")
                var ry = activeElem.getAttribute("ry")
                drawEllipseRxValue.value = rx
                drawEllipseRyValue.value = ry

                elemSizeDiv.style.top = pnt.y+20+"px"
                elemSizeDiv.style.left = pnt.x+20+"px"

            }

        }
        else if((objDragTarget.getAttribute("id")=="activeElem")&& (DrawEllipse==true||EditEllipse==true))
        {

            var transformRequest = activeElem.ownerSVGElement.createSVGTransform()
            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = activeElem.transform
            var transList = myTransListAnim.baseVal

            transformRequest.setTranslate(Pnt.x, Pnt.y)
            transList.appendItem(transformRequest)
            transList.consolidate()

            var transformRequest = activeElem.ownerSVGElement.createSVGTransform()
            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = dragDot.transform
            var transList = myTransListAnim.baseVal

            transformRequest.setTranslate(Pnt.x, Pnt.y)
            transList.appendItem(transformRequest)
            transList.consolidate()

        }
        else if(ActiveEllipseCopy==true)
        {
            var transformRequest = CopyEllipse.ownerSVGElement.createSVGTransform()
            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = CopyEllipse.transform
            var transList = myTransListAnim.baseVal

            transformRequest.setTranslate(Pnt.x, Pnt.y)
            transList.appendItem(transformRequest)
            transList.consolidate()
        }
        if(ActiveElem)
            DrawX.attr("transform", ActiveElem.attr("transform"))

    }
}
//--mouse up---
var transObjX
var transObjY
function endDragEllipse(evt)
{
    if(DraggingObj)
    {

        DraggingObj = false;

        removeNoSelectAtText()

        elemSizeDiv.style.visibility = "hidden"

        objDragTarget = null
        DraggingObj = false

        showSourceSVG()
    }

}
