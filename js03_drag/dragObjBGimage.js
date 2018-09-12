//----mouse down---
var DraggingObj = false
var objTransformRequestObj
var objTransList
var objDragTarget = null;
var ObjStartX
var ObjStartY
var ActiveScale
var BGimageUL =[]
//---mouse down over element---
function startDragBGimage(evt)
{

    if(activeElem&&!DraggingObj&&addElemBGimageViz==true) //---prevents dragging conflicts on other draggable elements---
    {
        if(evt.target.getAttribute("id")=="activeBGimage" || evt.target.getAttribute("id")=="imgDragArrow")
        {

            //if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---g--

          if(evt.target.getAttribute("id")=="imgDragArrow")
                objDragTarget = evt.target
           else if(evt.target.getAttribute("id")=="activeBGimage")
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
                BGimageUL =[x, y]


            objTransformRequestObj = objDragTarget.ownerSVGElement.createSVGTransform()

            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = objDragTarget.transform
            objTransList = myTransListAnim.baseVal

            ObjStartX = Pnt.x
            ObjStartY = Pnt.y

            DraggingObj = true

            if(objDragTarget.getAttribute("id")=="imgDragArrow")
            {
                    var cw = addElemBGimageCw
                var w = +activeBGimage.getAttribute("width")
                var h = +activeBGimage.getAttribute("height")
                cw.bgImageWidthValue.value = w.toFixed(0)
                cw.bgImageHeightValue.value = h.toFixed(0)


            }


        }
    }
    else
        DraggingObj = false

}
//---mouse move---
function dragBGimage(evt)
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
            var width = Pnt.x +parseFloat(activeBGimage.getAttribute("width"))
            var height = Pnt.y +parseFloat(activeBGimage.getAttribute("height"))

                objTransformRequestObj.setTranslate(Pnt.x, Pnt.y)
                objTransList.appendItem(objTransformRequestObj)
                objTransList.consolidate()

                activeBGimage.setAttribute("width", width)
                activeBGimage.setAttribute("height", height)

                var cw = addElemBGimageCw


                var w = +activeBGimage.getAttribute("width")
                var h = +activeBGimage.getAttribute("height")
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
function endDragBGimage(evt)
{
    if(DraggingObj)
    {

        DraggingObj = false;

        removeNoSelectAtText()

        objDragTarget = null
        DraggingObj = false


    }
}
