//----mouse down---
var DraggingObjPID=false
 var objTransformRequestObjPID
var objTransListPID
var objDragTargetPID=null;
var ObjStartXPID
var ObjStartYPID
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragPID(evt)
{

	if(!DraggingObjPID &&addElemPIDViz==true) //---prevents dragging conflicts on other draggable elements---
	{
                objDragTargetPID=activeElem
           
       if(objDragTargetPID)
	   {
            addNoSelectAtText()


  		var pnt = objDragTargetPID.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetPID.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());




			objTransformRequestObjPID = objDragTargetPID.ownerSVGElement.createSVGTransform()

			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=objDragTargetPID.transform
			objTransListPID=myTransListAnim.baseVal

			ObjStartXPID = Pnt.x
			ObjStartYPID = Pnt.y



			DraggingObjPID=true



		}
    }
	else
      	DraggingObjPID=false

}
//---mouse move---
function dragPID(evt)
{
	if(DraggingObjPID)
	{

        var pnt = objDragTargetPID.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetPID.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());

		Pnt.x -= ObjStartXPID;
		Pnt.y -= ObjStartYPID;


    	objTransformRequestObjPID.setTranslate(Pnt.x,Pnt.y)
	   objTransListPID.appendItem(objTransformRequestObjPID)
	   objTransListPID.consolidate()

           var matrix = objDragTargetPID.transform.baseVal.consolidate().matrix;


                    var transX=matrix.e
                    var transY=matrix.f
       DrawX.attr("transform", "translate("+transX+" "+transY+")")


	}
}
//--mouse up---
function endDragPID(evt)
{
	if(DraggingObjPID)
	{

		DraggingObjPID = false;




        objDragTargetPID=null
		  DraggingObjPID=false

      removeNoSelectAtText()



    }
}




