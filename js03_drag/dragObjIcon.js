//----mouse down---
var DraggingObjIcon = false
var objTransformRequestObjIcon
var objTransListIcon
var objDragTargetIcon = null;
var ObjStartXIcon
var ObjStartYIcon
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragIcon(evt)
{

    if(!DraggingObjIcon &&addElemIconViz==true) //---prevents dragging conflicts on other draggable elements---
    {

        if(evt.target.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
            objDragTargetIcon = evt.target
       


        if(objDragTargetIcon)
        {
            //addNoSelectAtText()

            var pnt = objDragTargetIcon.ownerSVGElement.createSVGPoint();
            pnt.x = evt.clientX;
            pnt.y = evt.clientY;
            //---elements in different(svg) viewports, and/or transformed ---
            var sCTM = objDragTargetIcon.getScreenCTM();
            var Pnt = pnt.matrixTransform(sCTM.inverse());

            objTransformRequestObjIcon = objDragTargetIcon.ownerSVGElement.createSVGTransform()

            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = objDragTargetIcon.transform
            objTransListIcon = myTransListAnim.baseVal

            ObjStartXIcon = Pnt.x
            ObjStartYIcon = Pnt.y

            DraggingObjIcon = true

        }
    }
    else
        DraggingObjIcon = false

}
//---mouse move---
function dragIcon(evt)
{
    if(DraggingObjIcon)
    {

        var pnt = objDragTargetIcon.ownerSVGElement.createSVGPoint();
        pnt.x = evt.clientX;
        pnt.y = evt.clientY;
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = objDragTargetIcon.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        Pnt.x -= ObjStartXIcon;
        Pnt.y -= ObjStartYIcon;

        objTransformRequestObjIcon.setTranslate(Pnt.x, Pnt.y)
        objTransListIcon.appendItem(objTransformRequestObjIcon)
        objTransListIcon.consolidate()

        var matrix = objDragTargetIcon.transform.baseVal.consolidate().matrix;

        var transX = matrix.e
        var transY = matrix.f
        DrawX.attr("transform", "translate("+transX+" "+transY+")")

    }
}
//--mouse up---
function endDragIcon(evt)
{
    if(DraggingObjIcon)
    {

        DraggingObjIcon = false;

        objDragTargetIcon = null
        DraggingObjIcon = false

        //removeNoSelectAtText()

    }
}
