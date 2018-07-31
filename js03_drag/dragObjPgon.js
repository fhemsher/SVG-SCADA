//----mouse down---
var DraggingObjPgon = false
var objTransformRequestObjPgon
var objTransListPgon
var objDragTargetPgon = null;
var ObjStartXPgon
var ObjStartYPgon
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragPgon(evt)
{
    
    if(!DraggingObjPgon &&addElemPgonViz==true) //---prevents dragging conflicts on other draggable elements---
    {

        if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
            objDragTargetPgon = evt.target.parentNode

            if(objDragTargetPgon)
        {
            addNoSelectAtText()
            //---used for align of projection/zoom on end drag---
            ActiveElemStartTrans =[SVGx, SVGy]

            var pnt = objDragTargetPgon.ownerSVGElement.createSVGPoint();
            pnt.x = evt.clientX;
            pnt.y = evt.clientY;
            //---elements in different(svg) viewports, and/or transformed ---
            var sCTM = objDragTargetPgon.getScreenCTM();
            var Pnt = pnt.matrixTransform(sCTM.inverse());

            objTransformRequestObjPgon = objDragTargetPgon.ownerSVGElement.createSVGTransform()

            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = objDragTargetPgon.transform
            objTransListPgon = myTransListAnim.baseVal

            ObjStartXPgon = Pnt.x
            ObjStartYPgon = Pnt.y

            DraggingObjPgon = true

        }
    }
    else
        DraggingObjPgon = false

}
//---mouse move---
function dragPgon(evt)
{
    if(DraggingObjPgon)
    {

        var pnt = objDragTargetPgon.ownerSVGElement.createSVGPoint();
        pnt.x = evt.clientX;
        pnt.y = evt.clientY;
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = objDragTargetPgon.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        Pnt.x -= ObjStartXPgon;
        Pnt.y -= ObjStartYPgon;

        objTransformRequestObjPgon.setTranslate(Pnt.x, Pnt.y)
        objTransListPgon.appendItem(objTransformRequestObjPgon)
        objTransListPgon.consolidate()

        var matrix = objDragTargetPgon.transform.baseVal.consolidate().matrix;

        var transX = matrix.e
        var transY = matrix.f
        DrawX.attr("transform", "translate("+transX+" "+transY+")")

    }
}
//--mouse up---
function endDragPgon(evt)
{
    if(DraggingObjPgon)
    {

        DraggingObjPgon = false;

        objDragTargetPgon = null
        DraggingObjPgon = false

        removeNoSelectAtText()


    }
}
