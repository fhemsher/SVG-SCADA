//----mouse down---
var DraggingObjProcess = false
var objTransformRequestObjProcess
var objTransListProcess
var objDragTargetProcess = null;
var ObjStartXProcess
var ObjStartYProcess
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragProcess(evt)
{
              //----drag component 
    if((!DraggingObjProcess &&editElemProcessViz==true)||LoadedProcessArray.length>0) //---prevents dragging conflicts on other draggable elements---
    {

        if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
            objDragTargetProcess = evt.target.parentNode

         if(objDragTargetProcess)
        {
            addNoSelectAtText()
            //---used for align of projection/zoom on end drag---
            ActiveElemStartTrans =[SVGx, SVGy]

            var pnt = objDragTargetProcess.ownerSVGElement.createSVGPoint();
            pnt.x = evt.clientX;
            pnt.y = evt.clientY;
            //---elements in different(svg) viewports, and/or transformed ---
            var sCTM = objDragTargetProcess.getScreenCTM();
            var Pnt = pnt.matrixTransform(sCTM.inverse());

            objTransformRequestObjProcess = objDragTargetProcess.ownerSVGElement.createSVGTransform()

            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = objDragTargetProcess.transform
            objTransListProcess = myTransListAnim.baseVal

            ObjStartXProcess = Pnt.x
            ObjStartYProcess = Pnt.y

            DraggingObjProcess = true

        }
    }
    else
        DraggingObjProcess = false

}
//---mouse move---
function dragProcess(evt)
{
    if(DraggingObjProcess)
    {

        var pnt = objDragTargetProcess.ownerSVGElement.createSVGPoint();
        pnt.x = evt.clientX;
        pnt.y = evt.clientY;
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = objDragTargetProcess.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        Pnt.x -= ObjStartXProcess;
        Pnt.y -= ObjStartYProcess;

        objTransformRequestObjProcess.setTranslate(Pnt.x, Pnt.y)
        objTransListProcess.appendItem(objTransformRequestObjProcess)
        objTransListProcess.consolidate()



    }
}
//--mouse up---
function endDragProcess(evt)
{
    if(DraggingObjProcess)
    {

        DraggingObjProcess = false;

        objDragTargetProcess = null
        DraggingObjProcess = false

        removeNoSelectAtText()

    }
}
