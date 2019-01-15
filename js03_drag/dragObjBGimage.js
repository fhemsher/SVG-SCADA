//----mouse down---
var DraggingObj = false
var objTransformRequestObj
var objTransList
var objDragTarget = null;
var ObjStartX
var ObjStartY
var ActiveScale
var BGImageUL =[]
//---mouse down over element---
function startDragBGImage(evt)
{

    if(activeElem&&!DraggingObj&&addElemBGImageViz==true) //---prevents dragging conflicts on other draggable elements---
    {
        if(evt.target.getAttribute("id")=="activeBGImage" || evt.target.getAttribute("id")=="imgDragArrow")
        {

            //if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---g--

          if(evt.target.getAttribute("id")=="imgDragArrow")
                objDragTarget = evt.target
           else if(evt.target.getAttribute("id")=="activeBGImage")
                objDragTarget = evt.target.parentNode

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

               // domWrapper.style.display = "block"
                domWrapper.appendChild(activeElem)
                var x = domWrapper.getBBox().x
                var y = domWrapper.getBBox().y
                domActiveElemG.appendChild(activeElem)
                BGImageUL =[x, y]


            objTransformRequestObj = objDragTarget.ownerSVGElement.createSVGTransform()

            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = objDragTarget.transform
            objTransList = myTransListAnim.baseVal

            ObjStartX = Pnt.x
            ObjStartY = Pnt.y

            DraggingObj = true

            if(objDragTarget.getAttribute("id")=="imgDragArrow")
            {
                    var cw = addElemBGImageCw
                var w = +activeBGImage.getAttribute("width")
                var h = +activeBGImage.getAttribute("height")
                cw.bgImageWidthValue.value = w.toFixed(0)
                cw.bgImageHeightValue.value = h.toFixed(0)


            }


        }
    }
    else
        DraggingObj = false

}
//---mouse move---
function dragBGImage(evt)
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

        if(objDragTarget.getAttribute("id")=="imgDragArrow")
        {
            var width = Pnt.x +parseFloat(activeBGImage.getAttribute("width"))
            var height = Pnt.y +parseFloat(activeBGImage.getAttribute("height"))

                objTransformRequestObj.setTranslate(Pnt.x, Pnt.y)
                objTransList.appendItem(objTransformRequestObj)
                objTransList.consolidate()

                activeBGImage.setAttribute("width", width)
                activeBGImage.setAttribute("height", height)

                var cw = addElemBGImageCw


                var w = +activeBGImage.getAttribute("width")
                var h = +activeBGImage.getAttribute("height")
                 cw.bgImageWidthValue.value = w.toFixed(0)
                cw.bgImageHeightValue.value = h.toFixed(0)



        }
        else if (objDragTarget.getAttribute("id")!="imgDragArrow")
        {
            objTransformRequestObj.setTranslate(Pnt.x, Pnt.y)
            objTransList.appendItem(objTransformRequestObj)
            objTransList.consolidate()
            DrawX.attr("transform", ActiveElem.attr("transform"))

            var transformRequest = activeElem.ownerSVGElement.createSVGTransform()
            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = imgDragArrow.transform
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
function endDragBGImage(evt)
{
    if(DraggingObj)
    {

        DraggingObj = false;

        removeNoSelectAtText()

        objDragTarget = null
        DraggingObj = false


    }
}
