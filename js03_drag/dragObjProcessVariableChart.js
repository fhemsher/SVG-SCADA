//----mouse down---
var DraggingObjProcessVariableChart=false
 var objTransformRequestObjProcessVariableChart
var objTransListProcessVariableChart
var objDragTargetProcessVariableChart=null;
var ObjStartXProcessVariableChart
var ObjStartYProcessVariableChart
var ActiveElemStartTrans
var ActiveElemEndTrans
//---mouse down over element---
function startDragProcessVariableChart(evt)
{

	if(!DraggingObjProcessVariableChart &&addElemProcessVariableChartViz==true) //---prevents dragging conflicts on other draggable elements---
	{
                objDragTargetProcessVariableChart=activeElem
           
       if(objDragTargetProcessVariableChart)
	   {
            addNoSelectAtText()


  		var pnt = objDragTargetProcessVariableChart.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetProcessVariableChart.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());




			objTransformRequestObjProcessVariableChart = objDragTargetProcessVariableChart.ownerSVGElement.createSVGTransform()

			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=objDragTargetProcessVariableChart.transform
			objTransListProcessVariableChart=myTransListAnim.baseVal

			ObjStartXProcessVariableChart = Pnt.x
			ObjStartYProcessVariableChart = Pnt.y



			DraggingObjProcessVariableChart=true



		}
    }
	else
      	DraggingObjProcessVariableChart=false

}
//---mouse move---
function dragProcessVariableChart(evt)
{
	if(DraggingObjProcessVariableChart)
	{

        var pnt = objDragTargetProcessVariableChart.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = objDragTargetProcessVariableChart.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());

		Pnt.x -= ObjStartXProcessVariableChart;
		Pnt.y -= ObjStartYProcessVariableChart;


    	objTransformRequestObjProcessVariableChart.setTranslate(Pnt.x,Pnt.y)
	   objTransListProcessVariableChart.appendItem(objTransformRequestObjProcessVariableChart)
	   objTransListProcessVariableChart.consolidate()

           var matrix = objDragTargetProcessVariableChart.transform.baseVal.consolidate().matrix;


                    var transX=matrix.e
                    var transY=matrix.f
       DrawX.attr("transform", "translate("+transX+" "+transY+")")


	}
}
//--mouse up---
function endDragProcessVariableChart(evt)
{
	if(DraggingObjProcessVariableChart)
	{

		DraggingObjProcessVariableChart = false;




        objDragTargetProcessVariableChart=null
		  DraggingObjProcessVariableChart=false

      removeNoSelectAtText()



    }
}




