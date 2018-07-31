//----mouse down---
var DraggingRA=false
 var RaTransformRequestRA
var RaTransList
var RaDragTarget=null;
var RAStartX
var RAStartY

//---mouse down over element---
function startDragRA(evt)
{

	if(DraggingRA) //---prevents dragging conflicts on other draggable elements---
	{

             addNoSelectAtText()
         if(evt.target.getAttribute("class")=="dragTargetRA")//---all other elems--
            	RaDragTarget = evt.target

       if(RaDragTarget)
	   {



  		var pnt = RaDragTarget.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = RaDragTarget.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());




			RaTransformRequestRA = RaDragTarget.ownerSVGElement.createSVGTransform()

			//---attach new or existing transform to element, init its transform list---
			var myTransListAnim=RaDragTarget.transform
			RaTransList=myTransListAnim.baseVal

			RAStartX = Pnt.x
			RAStartY = Pnt.y

			DraggingRA=true


		}
    }
	else
      	DraggingRA=false

}
//---mouse move---
function dragRA(evt)
{
	if(DraggingRA)
	{
        var pnt = RaDragTarget.ownerSVGElement.createSVGPoint();
		pnt.x = evt.clientX;
		pnt.y = evt.clientY;
		//---elements in different(svg) viewports, and/or transformed ---
		var sCTM = RaDragTarget.getScreenCTM();
		var Pnt = pnt.matrixTransform(sCTM.inverse());

		Pnt.x -= RAStartX;
		Pnt.y -= RAStartY;

    	RaTransformRequestRA.setTranslate(Pnt.x,Pnt.y)
		RaTransList.appendItem(RaTransformRequestRA)
		RaTransList.consolidate()
    }



}
//--mouse up---
var transRAX
var transRAY
function endDragRA(evt)
{

         removeNoSelectAtText()
        RaDragTarget=null
		  DraggingRA=false
}




