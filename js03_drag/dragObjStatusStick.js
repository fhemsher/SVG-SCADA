//----mouse down---
var DraggingObjStatusStick=false
 var objTransformRequestObjStatusStick
var objTransListStatusStick
var objDragTargetStatusStick=null;
var ObjStartXStatusStick
var ObjStartYStatusStick
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragStatusStick(evt)
{

	if(!DraggingObjStatusStick &&addElemStatusStickViz==true) //---prevents dragging conflicts on other draggable elements---
	{

            if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
             	objDragTargetStatusStick = evt.target.parentNode

       if(objDragTargetStatusStick)
	   {
            addNoSelectAtText()


  		var pnt = objDragTargetStatusStick.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetStatusStick.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());




			objTransformRequestObjStatusStick = objDragTargetStatusStick.ownerSVGElement.createSVGTransform()

			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=objDragTargetStatusStick.transform
			objTransListStatusStick=myTransListAnim.baseVal

			ObjStartXStatusStick = Pnt.x
			ObjStartYStatusStick = Pnt.y



			DraggingObjStatusStick=true



		}
    }
	else
      	DraggingObjStatusStick=false

}
//---mouse move---
function dragStatusStick(evt)
{
	if(DraggingObjStatusStick)
	{

        var pnt = objDragTargetStatusStick.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetStatusStick.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());

		Pnt.x -= ObjStartXStatusStick;
		Pnt.y -= ObjStartYStatusStick;


    	objTransformRequestObjStatusStick.setTranslate(Pnt.x,Pnt.y)
	   objTransListStatusStick.appendItem(objTransformRequestObjStatusStick)
	   objTransListStatusStick.consolidate()

           var matrix = objDragTargetStatusStick.transform.baseVal.consolidate().matrix;


                    var transX=matrix.e
                    var transY=matrix.f
       DrawX.attr("transform", "translate("+transX+" "+transY+")")


	}
}
//--mouse up---
function endDragStatusStick(evt)
{
	if(DraggingObjStatusStick)
	{

		DraggingObjStatusStick = false;




        objDragTargetStatusStick=null
		  DraggingObjStatusStick=false

      removeNoSelectAtText()



    }
}




