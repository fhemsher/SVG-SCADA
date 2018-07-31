//----mouse down---
var DraggingObjCircuitBreaker=false
 var objTransformRequestObjCircuitBreaker
var objTransListCircuitBreaker
var objDragTargetCircuitBreaker=null;
var ObjStartXCircuitBreaker
var ObjStartYCircuitBreaker
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragCircuitBreaker(evt)
{

	if(!DraggingObjCircuitBreaker &&addElemCircuitBreakerViz==true) //---prevents dragging conflicts on other draggable elements---
	{

            if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
             	objDragTargetCircuitBreaker = evt.target.parentNode

       if(objDragTargetCircuitBreaker)
	   {
            addNoSelectAtText()


  		var pnt = objDragTargetCircuitBreaker.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetCircuitBreaker.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());




			objTransformRequestObjCircuitBreaker = objDragTargetCircuitBreaker.ownerSVGElement.createSVGTransform()

			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=objDragTargetCircuitBreaker.transform
			objTransListCircuitBreaker=myTransListAnim.baseVal

			ObjStartXCircuitBreaker = Pnt.x
			ObjStartYCircuitBreaker = Pnt.y



			DraggingObjCircuitBreaker=true



		}
    }
	else
      	DraggingObjCircuitBreaker=false

}
//---mouse move---
function dragCircuitBreaker(evt)
{
	if(DraggingObjCircuitBreaker)
	{

        var pnt = objDragTargetCircuitBreaker.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetCircuitBreaker.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());

		Pnt.x -= ObjStartXCircuitBreaker;
		Pnt.y -= ObjStartYCircuitBreaker;


    	objTransformRequestObjCircuitBreaker.setTranslate(Pnt.x,Pnt.y)
	   objTransListCircuitBreaker.appendItem(objTransformRequestObjCircuitBreaker)
	   objTransListCircuitBreaker.consolidate()

           var matrix = objDragTargetCircuitBreaker.transform.baseVal.consolidate().matrix;


                    var transX=matrix.e
                    var transY=matrix.f
       DrawX.attr("transform", "translate("+transX+" "+transY+")")


	}
}
//--mouse up---
function endDragCircuitBreaker(evt)
{
	if(DraggingObjCircuitBreaker)
	{

		DraggingObjCircuitBreaker = false;




        objDragTargetCircuitBreaker=null
		  DraggingObjCircuitBreaker=false

      removeNoSelectAtText()



    }
}




