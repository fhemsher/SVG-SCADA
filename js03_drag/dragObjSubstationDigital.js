//----mouse down---
var DraggingObjSubstationDigital=false
 var objTransformRequestObjSubstationDigital
var objTransListSubstationDigital
var objDragTargetSubstationDigital=null;
var ObjStartXSubstationDigital
var ObjStartYSubstationDigital
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragSubstationDigital(evt)
{

	if(!DraggingObjSubstationDigital &&addElemSubstationDigitalViz==true) //---prevents dragging conflicts on other draggable elements---
	{
                objDragTargetSubstationDigital=activeElem
           
       if(objDragTargetSubstationDigital)
	   {
            addNoSelectAtText()


  		var pnt = objDragTargetSubstationDigital.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetSubstationDigital.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());




			objTransformRequestObjSubstationDigital = objDragTargetSubstationDigital.ownerSVGElement.createSVGTransform()

			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=objDragTargetSubstationDigital.transform
			objTransListSubstationDigital=myTransListAnim.baseVal

			ObjStartXSubstationDigital = Pnt.x
			ObjStartYSubstationDigital = Pnt.y



			DraggingObjSubstationDigital=true



		}
    }
	else
      	DraggingObjSubstationDigital=false

}
//---mouse move---
function dragSubstationDigital(evt)
{
	if(DraggingObjSubstationDigital)
	{

        var pnt = objDragTargetSubstationDigital.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetSubstationDigital.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());

		Pnt.x -= ObjStartXSubstationDigital;
		Pnt.y -= ObjStartYSubstationDigital;


    	objTransformRequestObjSubstationDigital.setTranslate(Pnt.x,Pnt.y)
	   objTransListSubstationDigital.appendItem(objTransformRequestObjSubstationDigital)
	   objTransListSubstationDigital.consolidate()

           var matrix = objDragTargetSubstationDigital.transform.baseVal.consolidate().matrix;


                    var transX=matrix.e
                    var transY=matrix.f
       DrawX.attr("transform", "translate("+transX+" "+transY+")")


	}
}
//--mouse up---
function endDragSubstationDigital(evt)
{
	if(DraggingObjSubstationDigital)
	{

		DraggingObjSubstationDigital = false;




        objDragTargetSubstationDigital=null
		  DraggingObjSubstationDigital=false

      removeNoSelectAtText()



    }
}




