 var myZoom
 var ZoomMouseDown
//--onload---
function callZoomBehavior()
{
    myZoom=d3.zoom().scaleExtent([1, 50]).on("zoom", mouseWheelZoom)

	//---attach to root svg---
	d3.select("#mySVG")
	.call(myZoom)


  // ZoomMouseDown = 	d3.select("#mySVG").on("mousedown.zoom"); // save



   disableZoom()
}
function disableZoom() {
    MySVG.on('.zoom', null);
}
function enableZoom() {
    d3.select("#mySVG")
	.call(myZoom)
}

var ZoomDrawing=false
var ZoomDraggedElems=[] //---reset dragged elems [elem,viz,onmousedown]
function zoomDrawing()
{
   if(ZoomDrawing==false )
   {
       enableZoom()
       zoomButton.title="Close Zoom Drawing"
       zoomButton.style.background="red"
       ZoomDrawing=true
       closeAllFrames()
       disableAllButtons()
       mySVG.appendChild(domDrawX) 
   }
   else
      {
        //---resets to initial scale(1)/pan [0,0]---
    myZoom.transform(d3.select("#mySVG"), d3.zoomIdentity);

    //---clear previous transforms---
   // zoomG.removeAttribute("transform")
   	ZoomG.transition().attr("transform", "translate(0,0)scale(1,1)")


       disableZoom()
       zoomButton.title="Mousewheel Zoom Drawing"
       zoomButton.style.background="transparent"
       ZoomDrawing=false
       enableAllButtons()
              DrawX.style("display", "none")
          DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)
        //----dragged elems---
         mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")

        for(var k=0;k<ZoomDraggedElems.length;k++)
        {
            var elem=ZoomDraggedElems[k][0]

            var downmouse=ZoomDraggedElems[k][1]
            var classed=ZoomDraggedElems[k][2]
            elem.setAttribute("onmousedown",downmouse)
            elem.setAttribute("style","cursor:default")
            elem.setAttribute("class",classed)
            elem.removeAttribute("opacity")

        }

        ZoomDraggedElems=[]


   }




}

var PrevScale=1 //--previous scale event---
var PrevTransX=0 //--previous scale event---
var PrevTransY=0 //--previous scale event---
function mouseWheelZoom()
{
    if(!ActiveElem)
    {

    	if(PrevScale!=d3.event.transform.k) //--transition on scale change--
    	{
    		ZoomG.transition().attr("transform", "translate("+d3.event.transform.x+","+d3.event.transform.y+ ")scale("+d3.event.transform.k+","+ d3.event.transform.k+")")
    	}
    	else //--no transition on pan---
    	{
    		ZoomG.attr("transform", "translate(" + d3.event.transform.x+","+d3.event.transform.y+ ")scale("+d3.event.transform.k+","+ d3.event.transform.k+")")
    	}

    	PrevScale=d3.event.transform.k
        PrevTransX= d3.event.transform.x
        PrevTransY= d3.event.transform.y

    }
}

function trackZoom()
{


        DrawX.style("display", "inline")
       DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")


}
