//----mouse down---
var DraggingObjGauge=false
 var objTransformRequestObjGauge
var objTransListGauge
var objDragTargetGauge=null;
var ObjStartXGauge
var ObjStartYGauge
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragGauge(evt)
{

	if(!DraggingObjGauge &&addElemGaugeViz==true) //---prevents dragging conflicts on other draggable elements---
	{

            if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
             	objDragTargetGauge = evt.target.parentNode

       if(objDragTargetGauge)
	   {
            addNoSelectAtText()


  		var pnt = mySVG.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetGauge.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());




			objTransformRequestObjGauge = objDragTargetGauge.ownerSVGElement.createSVGTransform()

			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=objDragTargetGauge.transform
			objTransListGauge=myTransListAnim.baseVal

			ObjStartXGauge = Pnt.x
			ObjStartYGauge = Pnt.y



			DraggingObjGauge=true



		}
    }
	else
      	DraggingObjGauge=false

}
//---mouse move---
function dragGauge(evt)
{
	if(DraggingObjGauge)
	{

        var pnt = objDragTargetGauge.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetGauge.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());

		Pnt.x -= ObjStartXGauge;
		Pnt.y -= ObjStartYGauge;


    	objTransformRequestObjGauge.setTranslate(Pnt.x,Pnt.y)
	   objTransListGauge.appendItem(objTransformRequestObjGauge)
	   objTransListGauge.consolidate()

           var matrix = objDragTargetGauge.transform.baseVal.consolidate().matrix;


                    var transX=matrix.e
                    var transY=matrix.f
       DrawX.attr("transform", "translate("+transX+" "+transY+")")


	}
}
//--mouse up---
function endDragGauge(evt)
{
	if(DraggingObjGauge)
	{

		DraggingObjGauge = false;




        objDragTargetGauge=null
		  DraggingObjGauge=false

      removeNoSelectAtText()



    }
}




