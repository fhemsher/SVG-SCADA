//----mouse down---
var DraggingObjAutoManual=false
 var objTransformRequestObjAutoManual
var objTransListAutoManual
var objDragTargetAutoManual=null;
var ObjStartXAutoManual
var ObjStartYAutoManual
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragAutoManual(evt)
{

	if(!DraggingObjAutoManual &&addElemAutoManualViz==true) //---prevents dragging conflicts on other draggable elements---
	{

            if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
             	objDragTargetAutoManual = evt.target.parentNode

       if(objDragTargetAutoManual)
	   {
            addNoSelectAtText()


  		var pnt = objDragTargetAutoManual.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetAutoManual.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());




			objTransformRequestObjAutoManual = objDragTargetAutoManual.ownerSVGElement.createSVGTransform()

			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=objDragTargetAutoManual.transform
			objTransListAutoManual=myTransListAnim.baseVal

			ObjStartXAutoManual = Pnt.x
			ObjStartYAutoManual = Pnt.y



			DraggingObjAutoManual=true



		}
    }
	else
      	DraggingObjAutoManual=false

}
//---mouse move---
function dragAutoManual(evt)
{
	if(DraggingObjAutoManual)
	{

        var pnt = objDragTargetAutoManual.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetAutoManual.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());

		Pnt.x -= ObjStartXAutoManual;
		Pnt.y -= ObjStartYAutoManual;


    	objTransformRequestObjAutoManual.setTranslate(Pnt.x,Pnt.y)
	   objTransListAutoManual.appendItem(objTransformRequestObjAutoManual)
	   objTransListAutoManual.consolidate()

           var matrix = objDragTargetAutoManual.transform.baseVal.consolidate().matrix;


                    var transX=matrix.e
                    var transY=matrix.f
       DrawX.attr("transform", "translate("+transX+" "+transY+")")


	}
}
//--mouse up---
function endDragAutoManual(evt)
{
	if(DraggingObjAutoManual)
	{

		DraggingObjAutoManual = false;




        objDragTargetAutoManual=null
		  DraggingObjAutoManual=false

      removeNoSelectAtText()



    }
}




