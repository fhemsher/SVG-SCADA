//----mouse down---
var DraggingObjDigitalReadout=false
 var objTransformRequestObjDigitalReadout
var objTransListDigitalReadout
var objDragTargetDigitalReadout=null;
var ObjStartXDigitalReadout
var ObjStartYDigitalReadout
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragDigitalReadout(evt)
{

	if(!DraggingObjDigitalReadout &&addElemDigitalReadoutViz==true) //---prevents dragging conflicts on other draggable elements---
	{

            if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
             	objDragTargetDigitalReadout = evt.target.parentNode

       if(objDragTargetDigitalReadout)
	   {
            addNoSelectAtText()


  		var pnt = objDragTargetDigitalReadout.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetDigitalReadout.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());




			objTransformRequestObjDigitalReadout = objDragTargetDigitalReadout.ownerSVGElement.createSVGTransform()

			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=objDragTargetDigitalReadout.transform
			objTransListDigitalReadout=myTransListAnim.baseVal

			ObjStartXDigitalReadout = Pnt.x
			ObjStartYDigitalReadout = Pnt.y



			DraggingObjDigitalReadout=true



		}
    }
	else
      	DraggingObjDigitalReadout=false

}
//---mouse move---
function dragDigitalReadout(evt)
{
	if(DraggingObjDigitalReadout)
	{

        var pnt = objDragTargetDigitalReadout.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetDigitalReadout.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());

		Pnt.x -= ObjStartXDigitalReadout;
		Pnt.y -= ObjStartYDigitalReadout;


    	objTransformRequestObjDigitalReadout.setTranslate(Pnt.x,Pnt.y)
	   objTransListDigitalReadout.appendItem(objTransformRequestObjDigitalReadout)
	   objTransListDigitalReadout.consolidate()

           var matrix = objDragTargetDigitalReadout.transform.baseVal.consolidate().matrix;


                    var transX=matrix.e
                    var transY=matrix.f
       DrawX.attr("transform", "translate("+transX+" "+transY+")")


	}
}
//--mouse up---
function endDragDigitalReadout(evt)
{
	if(DraggingObjDigitalReadout)
	{

		DraggingObjDigitalReadout = false;




        objDragTargetDigitalReadout=null
		  DraggingObjDigitalReadout=false

      removeNoSelectAtText()



    }
}




