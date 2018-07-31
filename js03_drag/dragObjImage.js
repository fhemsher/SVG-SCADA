//----mouse down---
var DraggingObj=false
 var objTransformRequestObj
var objTransList
var objDragTarget=null;
var ObjStartX
var ObjStartY
var ActiveScale
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragImage(evt)
{

	if(ActiveElem&&!DraggingObj) //---prevents dragging conflicts on other draggable elements---
	{
        if(evt.target.getAttribute("id")=="activeElem")
        {



          if(evt.target.getAttribute("class")=="dragTargetObj")//---all other elems--
                	objDragTarget = evt.target
         }
       if(objDragTarget)
	   {
              ActiveElem.attr("opacity",.5)


  		var pnt = objDragTarget.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTarget.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());

            //---used for align of projection/zoom on end drag---
            ActiveElemStartTrans=[SVGx,SVGy]


			objTransformRequestObj = objDragTarget.ownerSVGElement.createSVGTransform()

			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=objDragTarget.transform
			objTransList=myTransListAnim.baseVal

			ObjStartX = Pnt.x
			ObjStartY = Pnt.y



			DraggingObj=true

             DrawX.style("display","inline")


		}
    }
	else
      	DraggingObj=false

}
//---mouse move---
function dragImage(evt)
{
	if(DraggingObj)
	{

        var pnt = objDragTarget.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTarget.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());

		Pnt.x -= ObjStartX;
		Pnt.y -= ObjStartY;





    	objTransformRequestObj.setTranslate(Pnt.x,Pnt.y)
	   objTransList.appendItem(objTransformRequestObj)
	   objTransList.consolidate()

       var t3=d3.transform(ActiveElem.attr("transform"))
       var transX=t3.translate[0]
       var transY=t3.translate[1]
        DrawX.attr("transform","translate("+transX+" "+transY+")rotate("+RotateAngle+")" )


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




                 var transform=objDragTarget.getAttribute("transform")
		var trfm=d3.transform(transform)
            OverlayScaleX=trfm.scale[0]
            OverlayScaleY=trfm.scale[1]

        objDragTarget.setAttribute("overlayScaleX",trfm.scale[0])
        	 objDragTarget.setAttribute("overlayScaleY",trfm.scale[1])





             var transX=trfm.translate[0]
             var transY=trfm.translate[1]

           

          ActiveElem.attr("opacity",null)

        objDragTarget=null
		  DraggingObj=false





    }
}




