//----mouse down---
var DraggingObjVariableFrequency=false
 var objTransformRequestObjVariableFrequency
var objTransListVariableFrequency
var objDragTargetVariableFrequency=null;
var ObjStartXVariableFrequency
var ObjStartYVariableFrequency
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragVariableFrequency(evt)
{

	if(!DraggingObjVariableFrequency &&addElemVariableFrequencyViz==true) //---prevents dragging conflicts on other draggable elements---
	{
                objDragTargetVariableFrequency=activeElem
           
       if(objDragTargetVariableFrequency)
	   {
            addNoSelectAtText()


  		var pnt = objDragTargetVariableFrequency.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetVariableFrequency.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());




			objTransformRequestObjVariableFrequency = objDragTargetVariableFrequency.ownerSVGElement.createSVGTransform()

			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=objDragTargetVariableFrequency.transform
			objTransListVariableFrequency=myTransListAnim.baseVal

			ObjStartXVariableFrequency = Pnt.x
			ObjStartYVariableFrequency = Pnt.y



			DraggingObjVariableFrequency=true



		}
    }
	else
      	DraggingObjVariableFrequency=false

}
//---mouse move---
function dragVariableFrequency(evt)
{
	if(DraggingObjVariableFrequency)
	{

        var pnt = objDragTargetVariableFrequency.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetVariableFrequency.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());

		Pnt.x -= ObjStartXVariableFrequency;
		Pnt.y -= ObjStartYVariableFrequency;


    	objTransformRequestObjVariableFrequency.setTranslate(Pnt.x,Pnt.y)
	   objTransListVariableFrequency.appendItem(objTransformRequestObjVariableFrequency)
	   objTransListVariableFrequency.consolidate()

           var matrix = objDragTargetVariableFrequency.transform.baseVal.consolidate().matrix;


                    var transX=matrix.e
                    var transY=matrix.f
       DrawX.attr("transform", "translate("+transX+" "+transY+")")


	}
}
//--mouse up---
function endDragVariableFrequency(evt)
{
	if(DraggingObjVariableFrequency)
	{

		DraggingObjVariableFrequency = false;




        objDragTargetVariableFrequency=null
		  DraggingObjVariableFrequency=false

      removeNoSelectAtText()



    }
}




