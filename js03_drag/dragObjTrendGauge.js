//----mouse down---
var DraggingObjTrendGauge=false
 var objTransformRequestObjTrendGauge
var objTransListTrendGauge
var objDragTargetTrendGauge=null;
var ObjStartXTrendGauge
var ObjStartYTrendGauge
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragTrendGauge(evt)
{

	if(!DraggingObjTrendGauge &&addElemTrendGaugeViz==true) //---prevents dragging conflicts on other draggable elements---
	{

            if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
             	objDragTargetTrendGauge = evt.target.parentNode

       if(objDragTargetTrendGauge)
	   {
            addNoSelectAtText()


  		var pnt = objDragTargetTrendGauge.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetTrendGauge.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());




			objTransformRequestObjTrendGauge = objDragTargetTrendGauge.ownerSVGElement.createSVGTransform()

			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=objDragTargetTrendGauge.transform
			objTransListTrendGauge=myTransListAnim.baseVal

			ObjStartXTrendGauge = Pnt.x
			ObjStartYTrendGauge = Pnt.y



			DraggingObjTrendGauge=true



		}
    }
	else
      	DraggingObjTrendGauge=false

}
//---mouse move---
function dragTrendGauge(evt)
{
	if(DraggingObjTrendGauge)
	{

        var pnt = objDragTargetTrendGauge.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetTrendGauge.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());

		Pnt.x -= ObjStartXTrendGauge;
		Pnt.y -= ObjStartYTrendGauge;


    	objTransformRequestObjTrendGauge.setTranslate(Pnt.x,Pnt.y)
	   objTransListTrendGauge.appendItem(objTransformRequestObjTrendGauge)
	   objTransListTrendGauge.consolidate()

           var matrix = objDragTargetTrendGauge.transform.baseVal.consolidate().matrix;


                    var transX=matrix.e
                    var transY=matrix.f
       DrawX.attr("transform", "translate("+transX+" "+transY+")")


	}
}
//--mouse up---
function endDragTrendGauge(evt)
{
	if(DraggingObjTrendGauge)
	{

		DraggingObjTrendGauge = false;




        objDragTargetTrendGauge=null
		  DraggingObjTrendGauge=false

      removeNoSelectAtText()



    }
}




