//----mouse down---
var DraggingObjComponent = false
var objTransformRequestObjComponent
var objTransListComponent
var objDragTargetComponent = null;
var ObjStartXComponent
var ObjStartYComponent
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragComponent(evt)
{
              //----drag component 
    if((!DraggingObjComponent &&editElemComponentViz==true)||LoadedComponentArray.length>0) //---prevents dragging conflicts on other draggable elements---
    {

        if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
            objDragTargetComponent = evt.target.parentNode

         if(objDragTargetComponent)
        {
            addNoSelectAtText()
            //---used for align of projection/zoom on end drag---
            ActiveElemStartTrans =[SVGx, SVGy]

            var pnt = objDragTargetComponent.ownerSVGElement.createSVGPoint();
            pnt.x = evt.clientX;
            pnt.y = evt.clientY;
            //---elements in different(svg) viewports, and/or transformed ---
            var sCTM = objDragTargetComponent.getScreenCTM();
            var Pnt = pnt.matrixTransform(sCTM.inverse());

            objTransformRequestObjComponent = objDragTargetComponent.ownerSVGElement.createSVGTransform()

            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = objDragTargetComponent.transform
            objTransListComponent = myTransListAnim.baseVal

            ObjStartXComponent = Pnt.x
            ObjStartYComponent = Pnt.y

            DraggingObjComponent = true

        }
    }
    else
        DraggingObjComponent = false

}
//---mouse move---
function dragComponent(evt)
{
    if(DraggingObjComponent)
    {

        var pnt = objDragTargetComponent.ownerSVGElement.createSVGPoint();
        pnt.x = evt.clientX;
        pnt.y = evt.clientY;
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = objDragTargetComponent.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        Pnt.x -= ObjStartXComponent;
        Pnt.y -= ObjStartYComponent;

        objTransformRequestObjComponent.setTranslate(Pnt.x, Pnt.y)
        objTransListComponent.appendItem(objTransformRequestObjComponent)
        objTransListComponent.consolidate()



    }
}
//--mouse up---
function endDragComponent(evt)
{
    if(DraggingObjComponent)
    {

        DraggingObjComponent = false;

        objDragTargetComponent = null
        DraggingObjComponent = false

        removeNoSelectAtText()

    }
}
