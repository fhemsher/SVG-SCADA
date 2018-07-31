//----mouse down---
var DraggingObjTankLevel=false
 var objTransformRequestObjTankLevel
var objTransListTankLevel
var objDragTargetTankLevel=null;
var ObjStartXTankLevel
var ObjStartYTankLevel
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragTankLevel(evt)
{

	if(!DraggingObjTankLevel &&addElemTankLevelViz==true) //---prevents dragging conflicts on other draggable elements---
	{

            if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
             	objDragTargetTankLevel = evt.target.parentNode

       if(objDragTargetTankLevel)
	   {
            addNoSelectAtText()


  		var pnt = objDragTargetTankLevel.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetTankLevel.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());




			objTransformRequestObjTankLevel = objDragTargetTankLevel.ownerSVGElement.createSVGTransform()

			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=objDragTargetTankLevel.transform
			objTransListTankLevel=myTransListAnim.baseVal

			ObjStartXTankLevel = Pnt.x
			ObjStartYTankLevel = Pnt.y



			DraggingObjTankLevel=true



		}
    }
	else
      	DraggingObjTankLevel=false

}
//---mouse move---
function dragTankLevel(evt)
{
	if(DraggingObjTankLevel)
	{

        var pnt = objDragTargetTankLevel.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetTankLevel.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());

		Pnt.x -= ObjStartXTankLevel;
		Pnt.y -= ObjStartYTankLevel;


    	objTransformRequestObjTankLevel.setTranslate(Pnt.x,Pnt.y)
	   objTransListTankLevel.appendItem(objTransformRequestObjTankLevel)
	   objTransListTankLevel.consolidate()

           var matrix = objDragTargetTankLevel.transform.baseVal.consolidate().matrix;


                    var transX=matrix.e
                    var transY=matrix.f
       DrawX.attr("transform", "translate("+transX+" "+transY+")")


	}
}
//--mouse up---
function endDragTankLevel(evt)
{
	if(DraggingObjTankLevel)
	{

		DraggingObjTankLevel = false;




        objDragTargetTankLevel=null
		  DraggingObjTankLevel=false

      removeNoSelectAtText()



    }
}




