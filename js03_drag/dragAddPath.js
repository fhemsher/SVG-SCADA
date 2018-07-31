//----mouse down---
var DraggingObj = false
var objTransformRequestObj
var objTransList
var objDragTarget = null;
var ObjStartX
var ObjStartY

//---mouse down over element---
function startDragAddPath(evt)
{

    if(!DraggingObj) //---prevents dragging conflicts on other draggable elements---
    {
        if(evt.target.getAttribute("id")==AddPathId)
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

            objTransformRequestObj = objDragTarget.ownerSVGElement.createSVGTransform()

            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = objDragTarget.transform
            objTransList = myTransListAnim.baseVal

            ObjStartX = Pnt.x
            ObjStartY = Pnt.y

            DraggingObj = true

        }
    }
    else
        DraggingObj = false

}
//---mouse move---
function dragAddPath(evt)
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

        var transformRequest = objDragTarget.ownerSVGElement.createSVGTransform()
        //---attach new or existing transform to element, init its transform list---
        var myTransListAnim = objDragTarget.transform
        var transList = myTransListAnim.baseVal

        transformRequest.setTranslate(Pnt.x, Pnt.y)
        transList.appendItem(transformRequest)
        transList.consolidate()
        if(DrawPathSmooth)
        {
            DrawPathSmooth.attr("transform", objDragTarget.getAttribute("transform"))

        }

    }
}
//--mouse up---
var transObjX
var transObjY
function endDragAddPath(evt)
{
    if(DraggingObj)
    {

        DraggingObj = false;

        dragDrawPathAddFinish()

        removeNoSelectAtText()

        objDragTarget = null


        //showSourceSVG()
    }

}
