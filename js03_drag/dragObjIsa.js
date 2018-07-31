//----mouse down---
var DraggingObjIsa = false
var objTransformRequestObjIsa
var objTransListIsa
var objDragTargetIsa = null;
var ObjStartXIsa
var ObjStartYIsa
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragIsa(evt)
{
              //----drag component 
    if((!DraggingObjIsa &&editElemIsaViz==true)||LoadedIsaArray.length>0) //---prevents dragging conflicts on other draggable elements---
    {

        if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
            objDragTargetIsa = evt.target.parentNode

         if(objDragTargetIsa)
        {
            addNoSelectAtText()
            //---used for align of projection/zoom on end drag---
            ActiveElemStartTrans =[SVGx, SVGy]

            var pnt = objDragTargetIsa.ownerSVGElement.createSVGPoint();
            pnt.x = evt.clientX;
            pnt.y = evt.clientY;
            //---elements in different(svg) viewports, and/or transformed ---
            var sCTM = objDragTargetIsa.getScreenCTM();
            var Pnt = pnt.matrixTransform(sCTM.inverse());

            objTransformRequestObjIsa = objDragTargetIsa.ownerSVGElement.createSVGTransform()

            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = objDragTargetIsa.transform
            objTransListIsa = myTransListAnim.baseVal

            ObjStartXIsa = Pnt.x
            ObjStartYIsa = Pnt.y

            DraggingObjIsa = true

        }
    }
    else
        DraggingObjIsa = false

}
//---mouse move---
function dragIsa(evt)
{
    if(DraggingObjIsa)
    {

        var pnt = objDragTargetIsa.ownerSVGElement.createSVGPoint();
        pnt.x = evt.clientX;
        pnt.y = evt.clientY;
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = objDragTargetIsa.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        Pnt.x -= ObjStartXIsa;
        Pnt.y -= ObjStartYIsa;

        objTransformRequestObjIsa.setTranslate(Pnt.x, Pnt.y)
        objTransListIsa.appendItem(objTransformRequestObjIsa)
        objTransListIsa.consolidate()



    }
}
//--mouse up---
function endDragIsa(evt)
{
    if(DraggingObjIsa)
    {

        DraggingObjIsa = false;

        objDragTargetIsa = null
        DraggingObjIsa = false

        removeNoSelectAtText()

    }
}
