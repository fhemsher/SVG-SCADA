//----mouse down---
var DraggingObjPolygon = false
var objTransformRequestObjPolygon
var objTransListPolygon
var objDragTargetPolygon = null;
var ObjStartXPolygon
var ObjStartYPolygon
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragPolygon(evt)
{

    if(!DraggingObjPolygon &&addElemPolygonViz==true) //---prevents dragging conflicts on other draggable elements---
    {

        if(evt.target.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
            objDragTargetPolygon = evt.target

            if(objDragTargetPolygon)
        {
            addNoSelectAtText()

            var pnt = objDragTargetPolygon.ownerSVGElement.createSVGPoint();
            pnt.x = evt.clientX;
            pnt.y = evt.clientY;
            //---elements in different(svg) viewports, and/or transformed ---
            var sCTM = objDragTargetPolygon.getScreenCTM();
            var Pnt = pnt.matrixTransform(sCTM.inverse());

            objTransformRequestObjPolygon = objDragTargetPolygon.ownerSVGElement.createSVGTransform()

            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = objDragTargetPolygon.transform
            objTransListPolygon = myTransListAnim.baseVal

            ObjStartXPolygon = Pnt.x
            ObjStartYPolygon = Pnt.y

            DraggingObjPolygon = true

        }
    }
    else
        DraggingObjPolygon = false

}
//---mouse move---
function dragPolygon(evt)
{
    if(DraggingObjPolygon)
    {

        var pnt = objDragTargetPolygon.ownerSVGElement.createSVGPoint();
        pnt.x = evt.clientX;
        pnt.y = evt.clientY;
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = objDragTargetPolygon.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        Pnt.x -= ObjStartXPolygon;
        Pnt.y -= ObjStartYPolygon;

        objTransformRequestObjPolygon.setTranslate(Pnt.x, Pnt.y)
        objTransListPolygon.appendItem(objTransformRequestObjPolygon)
        objTransListPolygon.consolidate()

        var matrix = objDragTargetPolygon.transform.baseVal.consolidate().matrix;

        var transX = matrix.e
        var transY = matrix.f
        DrawX.attr("transform", "translate("+transX+" "+transY+")")

    }
}
//--mouse up---
function endDragPolygon(evt)
{
    if(DraggingObjPolygon)
    {

        DraggingObjPolygon = false;

        objDragTargetPolygon = null
        DraggingObjPolygon = false

        removeNoSelectAtText()

    }
}
