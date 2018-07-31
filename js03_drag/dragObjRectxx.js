//----mouse down---
var DraggingObj = false
var objTransformRequestObj
var objTransList
var objDragTarget = null;
var ObjStartX
var ObjStartY
var ActiveScale
var RectUL =[]
//---mouse down over element---
function startDragRect(evt)
{

    if(ActiveElem&&!DraggingObj||ActiveRectCopy==true) //---prevents dragging conflicts on other draggable elements---
    {
        if(evt.target.getAttribute("id")=="activeRect" || evt.target.getAttribute("id")=="dragDot"||ActiveRectCopy==true)
        {

            //if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---g--

            if(evt.target.getAttribute("id")=="dragDot")
                objDragTarget = evt.target
                else if(ActiveRectCopy==false)
                    objDragTarget = evt.target.parentNode
                    else if(ActiveRectCopy==true)
                        objDragTarget = evt.target

        }
        if(objDragTarget)
        {
            addNoSelectAtText()

            var pnt = objDragTarget.ownerSVGElement.createSVGPoint();
            pnt.x = SVGx;
            pnt.y = SVGy;
            //---elements in different(svg) viewports, and/or transformed ---
            var sCTM = objDragTarget.getScreenCTM();
            var Pnt = pnt.matrixTransform(sCTM.inverse());

            //---used for align of projection/zoom on end drag---
            if(objDragTarget.getAttribute("id")=="activeElem")
            {
                ActiveElemStartTrans =[SVGx, SVGy]

            }
            else if(ActiveRectCopy==false)
            {
               // domWrapper.style.display = "block"
                domWrapper.appendChild(activeElem)
                var x = domWrapper.getBBox().x
                var y = domWrapper.getBBox().y
                domActiveElemG.appendChild(activeElem)
                RectUL =[x, y]

            }

            objTransformRequestObj = objDragTarget.ownerSVGElement.createSVGTransform()

            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = objDragTarget.transform
            objTransList = myTransListAnim.baseVal

            ObjStartX = Pnt.x
            ObjStartY = Pnt.y

            DraggingObj = true

            if(objDragTarget.getAttribute("id")=="dragDot")
            {

                var w = ActiveRect.attr("width")
                var h = ActiveRect.attr("height")
                drawRectWidthValue.value = w
                drawRectHeightValue.value = h
                elemSizeDiv.style.visibility = "visible"
                elemSizeDiv.style.top = evt.clientY+20+"px"
                elemSizeDiv.style.left = evt.clientX+20+"px"

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
        pnt.x = SVGx;
        pnt.y = SVGy;
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

                var cw = addElemRectCw
                if(cw.drawRectStrokeRoundCheck.checked==true)
                {
                    ActiveRect.attr("rx", 5*parseFloat(ActiveRect.attr("stroke-width")))
                    ActiveRect.attr("ry", 5*parseFloat(ActiveRect.attr("stroke-width")))
                }

                var w = ActiveRect.attr("width")
                var h = ActiveRect.attr("height")
                drawRectWidthValue.value = w
                drawRectHeightValue.value = h

                elemSizeDiv.style.top = evt.clientY+20+"px"
                elemSizeDiv.style.left = evt.clientX+20+"px"

            }
        }
        else if (ActiveRectCopy==false && objDragTarget.getAttribute("id")!="dragDot")
        {
            objTransformRequestObj.setTranslate(Pnt.x, Pnt.y)
            objTransList.appendItem(objTransformRequestObj)
            objTransList.consolidate()
            DrawX.attr("transform", ActiveElem.attr("transform"))

        }
        if(ActiveRectCopy==true)
        {
            var transformRequest = CopyRect.ownerSVGElement.createSVGTransform()
            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = CopyRect.transform
            var transList = myTransListAnim.baseVal

            transformRequest.setTranslate(Pnt.x, Pnt.y)
            transList.appendItem(transformRequest)
            transList.consolidate()
        }
        //if(ActiveElem)
        //DrawX.attr("transform",ActiveElem.attr("transform"))

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

        objDragTarget = null
        DraggingObj = false
        elemSizeDiv.style.visibility = "hidden"
        showSourceSVG()

    }
}
