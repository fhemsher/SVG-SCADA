//----mouse down---
var DraggingObjBarGauge=false
 var objTransformRequestObjBarGauge
var objTransListBarGauge
var objDragTargetBarGauge=null;
var ObjStartXBarGauge
var ObjStartYBarGauge
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragBarGauge(evt)
{

	if(!DraggingObjBarGauge &&addElemBarGaugeViz==true) //---prevents dragging conflicts on other draggable elements---
	{

            if(evt.target.parentNode.getAttribute("class")=="dragTargetObj") //---text elem w/ tspan--
             	objDragTargetBarGauge = evt.target.parentNode

       if(objDragTargetBarGauge)
	   {
            addNoSelectAtText()


  		var pnt = objDragTargetBarGauge.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetBarGauge.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());




			objTransformRequestObjBarGauge = objDragTargetBarGauge.ownerSVGElement.createSVGTransform()

			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=objDragTargetBarGauge.transform
			objTransListBarGauge=myTransListAnim.baseVal

			ObjStartXBarGauge = Pnt.x
			ObjStartYBarGauge = Pnt.y



			DraggingObjBarGauge=true



		}
    }
	else
      	DraggingObjBarGauge=false

}
//---mouse move---
function dragBarGauge(evt)
{
	if(DraggingObjBarGauge)
	{

        var pnt = objDragTargetBarGauge.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetBarGauge.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());

		Pnt.x -= ObjStartXBarGauge;
		Pnt.y -= ObjStartYBarGauge;


    	objTransformRequestObjBarGauge.setTranslate(Pnt.x,Pnt.y)
	   objTransListBarGauge.appendItem(objTransformRequestObjBarGauge)
	   objTransListBarGauge.consolidate()

           var matrix = objDragTargetBarGauge.transform.baseVal.consolidate().matrix;


                    var transX=matrix.e
                    var transY=matrix.f
       DrawX.attr("transform", "translate("+transX+" "+transY+")")


	}
}
//--mouse up---
function endDragBarGauge(evt)
{
	if(DraggingObjBarGauge)
	{

		DraggingObjBarGauge = false;




        objDragTargetBarGauge=null
		  DraggingObjBarGauge=false

      removeNoSelectAtText()



    }
}




