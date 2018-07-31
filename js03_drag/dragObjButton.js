//----mouse down---
var DraggingObjButton=false
 var objTransformRequestObjButton
var objTransListButton
var objDragTargetButton=null;
var ObjStartXButton
var ObjStartYButton
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragButton(evt)
{

	if(!DraggingObjButton &&addElemButtonViz==true) //---prevents dragging conflicts on other draggable elements---
	{

            if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
             	objDragTargetButton = evt.target.parentNode

       if(objDragTargetButton)
	   {
            addNoSelectAtText()


  		var pnt = objDragTargetButton.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetButton.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());




			objTransformRequestObjButton = objDragTargetButton.ownerSVGElement.createSVGTransform()

			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=objDragTargetButton.transform
			objTransListButton=myTransListAnim.baseVal

			ObjStartXButton = Pnt.x
			ObjStartYButton = Pnt.y



			DraggingObjButton=true



		}
    }
	else
      	DraggingObjButton=false

}
//---mouse move---
function dragButton(evt)
{
	if(DraggingObjButton)
	{

        var pnt = objDragTargetButton.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetButton.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());

		Pnt.x -= ObjStartXButton;
		Pnt.y -= ObjStartYButton;


    	objTransformRequestObjButton.setTranslate(Pnt.x,Pnt.y)
	   objTransListButton.appendItem(objTransformRequestObjButton)
	   objTransListButton.consolidate()

           var matrix = objDragTargetButton.transform.baseVal.consolidate().matrix;


                    var transX=matrix.e
                    var transY=matrix.f
       DrawX.attr("transform", "translate("+transX+" "+transY+")")


	}
}
//--mouse up---
function endDragButton(evt)
{
	if(DraggingObjButton)
	{

		DraggingObjButton = false;




        objDragTargetButton=null
		  DraggingObjButton=false

      removeNoSelectAtText()



    }
}




