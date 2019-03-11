//----mouse down---
var DraggingObj = false
var objTransformRequestObj
var objTransList
var objDragTarget = null;
var ObjStartX
var ObjStartY
var ActiveScale
var ImageUL =[]
//---mouse down over element---
function startDragImage(evt)
{

    if(activeElem&&!DraggingObj&&addElemImageViz==true) //---prevents dragging conflicts on other draggable elements---
    {
        if(evt.target.getAttribute("id")=="activeElem" || evt.target.getAttribute("id")=="imgDragArrow")
        {

          if(evt.target.getAttribute("class")=="dragTargetObj")//---all other elems--
                objDragTarget = evt.target

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
               // domWrapper.appendChild(activeElem)
                //var x = domWrapper.getBBox().x
                //var y = domWrapper.getBBox().y
                //domActiveElemG.appendChild(activeElem)
                //ImageUL =[x, y]


            objTransformRequestObj = objDragTarget.ownerSVGElement.createSVGTransform()

            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = objDragTarget.transform
            objTransList = myTransListAnim.baseVal

            ObjStartX = Pnt.x
            ObjStartY = Pnt.y

            DraggingObj = true

            if(objDragTarget.getAttribute("id")=="imgDragArrow")
            {
                    var cw = addElemImageCw
                var w = +activeElem.getAttribute("width")
                var h = +activeElem.getAttribute("height")
                cw.imageWidthValue.value = w.toFixed(0)
                cw.imageHeightValue.value = h.toFixed(0)


            }


        }
    }
    else
        DraggingObj = false

}
//---mouse move---
function dragImage(evt)
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

         if(objDragTarget.getAttribute("id")=="imgDragArrow" &&(DrawImage==true||EditImage==true))
        {
            var width = parseFloat(ActiveElem.attr("width"))
            width= (Pnt.x+width)
            var height = parseFloat(ActiveElem.attr("height"))
            height = (Pnt.y+height)

            if(width>0&&height>0)
            {

                ActiveElem.attr("width", width)
                ActiveElem.attr("height", height)

                //---rescale radius to current scale----

                objTransformRequestObj.setTranslate(Pnt.x, Pnt.y)
                objTransList.appendItem(objTransformRequestObj)
                objTransList.consolidate()

                var matrix = imgDragArrow.transform.baseVal.consolidate().matrix;

                var transX = matrix.e
                var transY = matrix.f

                imgDragArrow.setAttribute("transform", "translate("+(transX)+" "+transY+")")

                                    var cw = addElemImageCw

                cw.imageWidthValue.value = width.toFixed(0)
                cw.imageHeightValue.value = height.toFixed(0)




            }

        }

        else if (objDragTarget.getAttribute("id")=="activeElem")
        {
            var transformRequest = activeElem.ownerSVGElement.createSVGTransform()
            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = activeElem.transform
            var transList = myTransListAnim.baseVal

            transformRequest.setTranslate(Pnt.x, Pnt.y)
            transList.appendItem(transformRequest)
            transList.consolidate()

            var transformRequest = activeElem.ownerSVGElement.createSVGTransform()
            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = imgDragArrow.transform
            var transList = myTransListAnim.baseVal

            transformRequest.setTranslate(Pnt.x, Pnt.y)
            transList.appendItem(transformRequest)
            transList.consolidate()
        }

        if(ActiveElem)
        DrawX.attr("transform",ActiveElem.attr("transform"))

    }
}
//--mouse up---
var transObjX
var transObjY
function endDragImage(evt)
{
    if(DraggingObj)
    {

        DraggingObj = false;

        removeNoSelectAtText()

        objDragTarget = null
        DraggingObj = false


    }
}
