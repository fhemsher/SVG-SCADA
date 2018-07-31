//----mouse down---
var DraggingObjPilotLight=false
 var objTransformRequestObjPilotLight
var objTransListPilotLight
var objDragTargetPilotLight=null;
var ObjStartXPilotLight
var ObjStartYPilotLight
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragPilotLight(evt)
{

	if(!DraggingObjPilotLight &&addElemPilotLightViz==true) //---prevents dragging conflicts on other draggable elements---
	{

            if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
             	objDragTargetPilotLight = evt.target.parentNode

       if(objDragTargetPilotLight)
	   {
            addNoSelectAtText()


  		var pnt = objDragTargetPilotLight.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetPilotLight.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());




			objTransformRequestObjPilotLight = objDragTargetPilotLight.ownerSVGElement.createSVGTransform()

			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=objDragTargetPilotLight.transform
			objTransListPilotLight=myTransListAnim.baseVal

			ObjStartXPilotLight = Pnt.x
			ObjStartYPilotLight = Pnt.y



			DraggingObjPilotLight=true



		}
    }
	else
      	DraggingObjPilotLight=false

}
//---mouse move---
function dragPilotLight(evt)
{
	if(DraggingObjPilotLight)
	{

        var pnt = objDragTargetPilotLight.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetPilotLight.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());

		Pnt.x -= ObjStartXPilotLight;
		Pnt.y -= ObjStartYPilotLight;


    	objTransformRequestObjPilotLight.setTranslate(Pnt.x,Pnt.y)
	   objTransListPilotLight.appendItem(objTransformRequestObjPilotLight)
	   objTransListPilotLight.consolidate()

           var matrix = objDragTargetPilotLight.transform.baseVal.consolidate().matrix;


                    var transX=matrix.e
                    var transY=matrix.f
       DrawX.attr("transform", "translate("+transX+" "+transY+")")


	}
}
//--mouse up---
function endDragPilotLight(evt)
{
	if(DraggingObjPilotLight)
	{

		DraggingObjPilotLight = false;




        objDragTargetPilotLight=null
		  DraggingObjPilotLight=false

      removeNoSelectAtText()



    }
}




