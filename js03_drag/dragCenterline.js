//----mouse down---
var DraggingCL = false
var CLTransformRequestCL
var CLTransList
var CLDragTarget = null;
var CLStartX
var CLStartY

//---mouse down over element---
function startDragCL(evt)
{



            if(evt.target.parentNode.getAttribute("class")=="dragTargetCL")//---all other elems--
                CLDragTarget = evt.target.parentNode

        if(CLDragTarget)
        {
            addNoSelectAtText()

            var pnt = CLDragTarget.ownerSVGElement.createSVGPoint();
            pnt.x = evt.clientX;
            pnt.y = evt.clientY;
            //---elements in different(svg) viewports, and/or transformed ---
            var sCTM = CLDragTarget.getScreenCTM();
            var Pnt = pnt.matrixTransform(sCTM.inverse());




                CLStartX = Pnt.x
                CLStartY = Pnt.y

                DraggingCL = true


        }
    }
    else
        DraggingCL = false

}
//---mouse move---
function dragCL(evt)
{
    if(DraggingCL)
    {

        var pnt = CLDragTarget.ownerSVGElement.createSVGPoint();
        pnt.x = evt.clientX;
        pnt.y = evt.clientY;
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = CLDragTarget.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        Pnt.x -= CLStartX;
        Pnt.y -= CLStartY;
         CLTransformRequestCL.setTranslate(Pnt.x, Pnt.y)
                CLTransList.appendItem(CLTransformRequestCL)
                CLTransList.consolidate()


    }
}
//--mouse up---

function endDragCL(evt)
{
    if(DraggingCL)
    {

        DraggingCL = false;

        removeNoSelectAtText()

        elemSizeDiv.style.visibility = "hidden"

        CLDragTarget = null
        DraggingCL = false


    }

}
