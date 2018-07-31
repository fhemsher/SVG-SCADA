//----mouse down---
var DraggingObjZoom = false
var objTransformRequestObjZoom
var objTransListZoom
var objDragTargetZoom = null;
var ObjStartXZoom
var ObjStartYZoom

//---mouse down over element---
function startDragZoom(evt)
{
    if(!DraggingObjZoom) //---prevents dragging conflicts on other draggable elements---
    {



        if(evt.target.parentNode.getAttribute("class")=="dragTargetObj")
            objDragTargetZoom = evt.target.parentNode
        if(evt.target.getAttribute("class")=="dragTargetObj")
            objDragTargetZoom = evt.target

        if(objDragTargetZoom)
        {
            if(objDragTargetZoom.nodeName!="text")
            addNoSelectAtText()

            var pnt = objDragTargetZoom.ownerSVGElement.createSVGPoint();
            pnt.x = evt.clientX;
            pnt.y = evt.clientY;
            //---elements in different(svg) viewports, and/or transformed ---
            var sCTM = objDragTargetZoom.getScreenCTM();
            var Pnt = pnt.matrixTransform(sCTM.inverse());

            objTransformRequestObjZoom = objDragTargetZoom.ownerSVGElement.createSVGTransform()

            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = objDragTargetZoom.transform
            objTransListZoom = myTransListAnim.baseVal

            ObjStartXZoom = Pnt.x
            ObjStartYZoom = Pnt.y

            DraggingObjZoom = true

        }
    }
    else
        DraggingObjZoom = false

}
//---mouse move---
function dragZoom(evt)
{
    if(DraggingObjZoom)
    {
        var pnt = objDragTargetZoom.ownerSVGElement.createSVGPoint();
        pnt.x = evt.clientX;
        pnt.y = evt.clientY;
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = objDragTargetZoom.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        Pnt.x -= ObjStartXZoom;
        Pnt.y -= ObjStartYZoom;

        objTransformRequestObjZoom.setTranslate(Pnt.x, Pnt.y)
        objTransListZoom.appendItem(objTransformRequestObjZoom)
        objTransListZoom.consolidate()
    }
}
//--mouse up---
function endDragZoom(evt)
{
    if(DraggingObjZoom)
    {      if(objDragTargetZoom.nodeName!="text")
            removeNoSelectAtText()
        DraggingObjZoom = false;
        objDragTargetZoom = null
        DraggingObjZoom = false

        // d3.select("#mySVG").on("mousedown.zoom", ZoomMouseDown)
    }
}
