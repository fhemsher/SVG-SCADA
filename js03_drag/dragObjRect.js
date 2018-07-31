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
function startDragRect(evt)
{

    if(ActiveElem&&!DraggingObj||ActiveRectCopy==true) //---prevents dragging conflicts on other draggable elements---
    {
        if(evt.target.getAttribute("id")=="activeElem" || evt.target.getAttribute("id")=="dragDot"||ActiveRectCopy==true)
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
                var width = activeElem.getAttribute("width")
                var height = activeElem.getAttribute("height")
                drawRectWidthValue.value = width
                drawRectHeightValue.value = height
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
function dragRect(evt)
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

        if(objDragTarget.getAttribute("id")=="dragDot" &&(DrawRect==true||EditRect==true))
        {
            var width = parseFloat(ActiveElem.attr("width"))
            width= (Pnt.x+width)
            var height = parseFloat(ActiveElem.attr("height"))
            height = (Pnt.y+height)

            if(width>0&&height>0)
            {

                ActiveElem.attr("width", width)
                ActiveElem.attr("height", height)

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

                var width = activeElem.getAttribute("width")
                var Height = activeElem.getAttribute("height")
                drawRectWidthValue.value = width
                drawRectHeightValue.value = height

                elemSizeDiv.style.top = pnt.y+20+"px"
                elemSizeDiv.style.left = pnt.x+20+"px"

            }

        }
        else if((objDragTarget.getAttribute("id")=="activeElem")&& (DrawRect==true||EditRect==true))
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
        else if(ActiveRectCopy==true)
        {
            var transformRequest = CopyRect.ownerSVGElement.createSVGTransform()
            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = CopyRect.transform
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
function endDragRect(evt)
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
