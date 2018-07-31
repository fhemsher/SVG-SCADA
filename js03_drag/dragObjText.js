//----mouse down---
var DraggingObj = false
var objTransformRequestObj
var objTransList
var objDragTarget = null;
var ObjStartX
var ObjStartY
var ActiveScale
//---mouse down over element---
function startDragText(evt)
{

    if(ActiveElem&&!DraggingObj) //---prevents dragging conflicts on other draggable elements---
    {
        if(evt.target.parentNode.getAttribute("id")=="activeText")
        {
            if(evt.target.parentNode.parentNode.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
                objDragTarget = evt.target.parentNode.parentNode

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
            ActiveElemStartTrans =[SVGx, SVGy]

            objTransformRequestObj = activeElem.ownerSVGElement.createSVGTransform()

            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = activeElem.transform
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
function dragText(evt)
{
    if(DraggingObj)
    {

        var pnt = activeElem.ownerSVGElement.createSVGPoint();
        pnt.x = evt.clientX;
        pnt.y = evt.clientY;
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = activeElem.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        Pnt.x -= ObjStartX;
        Pnt.y -= ObjStartY;

        objTransformRequestObj.setTranslate(Pnt.x, Pnt.y)
        objTransList.appendItem(objTransformRequestObj)
        objTransList.consolidate()
        /*
  var t3=d3.transform(objDragTarget.getAttribute("transform"))
     var transX=t3.translate[0]
     var transY=t3.translate[1]
     var rotateAngle=t3.rotate
     var rotate=""
     if(rotateAngle!=0)
     rotate="rotate("+rotateAngle+")"
  */
        DrawX.attr("transform", activeElem.getAttribute("transform"))

    }
}
//--mouse up---
var transObjX
var transObjY
function endDragText(evt)
{
    if(DraggingObj)
    {

        DraggingObj = false;

        removeNoSelectAtText()

        //---align drag with previous d3.event.translate---

        objDragTarget = null

    }
}
