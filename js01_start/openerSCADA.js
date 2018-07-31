
var OpenerSCADADoc
var StartScada //---timeout---
function loadOpenerSCADA()
{
     if(!OpenerSCADADoc)
    {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "js01_start/openerSCADA.svg", true);
        xhr.onload = function()
        {
            var xmlString = this.responseText

            //---DOMParser---
            var parser = new DOMParser();
            OpenerSCADADoc = parser.parseFromString(xmlString, "text/xml").documentElement;
            openerScadaG.appendChild(OpenerSCADADoc.firstChild)
            placeAsImpeller()
           MyArrows=SVG.adopt(document.getElementById("pipeScada"))
            StartScada=setTimeout(runArrows,5000)
       }
        xhr.send()
   }
}



var MyArrows   //---onload:  MyArrows=SVG.adopt(pipe)  ---
function runArrows()
{
    var duration=4000
    var rotateAngle=1440
    var pipe=document.getElementById("pipeScada")
    StartScada=null

    var pathLength=pipe.getTotalLength()
    var arrow2Offset=pipe.getTotalLength()*.33
    MyArrows.animate(duration).during(
    function(pos) //---setter--
    {
            var length=pathLength*pos
            var Pnt0=pipe.getPointAtLength(length) //--start
            var Pnt1=pipe.getPointAtLength(length+20) //--mid---
            var Pnt2=pipe.getPointAtLength(length+40) //---end---
            var d="M"+[Pnt0.x,Pnt0.y,Pnt1.x,Pnt1.y,Pnt2.x,Pnt2.y].toString()
            arrowLine1.setAttribute("d",d)

        if(length<(pathLength-arrow2Offset))
        {
            var Pnt0=pipe.getPointAtLength(length+arrow2Offset) //--start
            var Pnt1=pipe.getPointAtLength(length+20+arrow2Offset) //--mid---
            var Pnt2=pipe.getPointAtLength(length+40+arrow2Offset) //---end---
            var d="M"+[Pnt0.x,Pnt0.y,Pnt1.x,Pnt1.y,Pnt2.x,Pnt2.y].toString()
            arrowLine2.setAttribute("d",d)
        }
        else if(length>=(pathLength-arrow2Offset))
        {
            var myLength=length-arrow2Offset
            var Pnt0=pipe.getPointAtLength(myLength-arrow2Offset) //--start
            var Pnt1=pipe.getPointAtLength(myLength+20-arrow2Offset) //--mid---
            var Pnt2=pipe.getPointAtLength(myLength+40-arrow2Offset) //---end---
            var d="M"+[Pnt0.x,Pnt0.y,Pnt1.x,Pnt1.y,Pnt2.x,Pnt2.y].toString()
            arrowLine2.setAttribute("d",d)
        }
        document.getElementById("Impeller").setAttribute("transform","rotate("+(rotateAngle*pos)+" "+cx+" "+cy+")")


    })
    .after(function(){
        runArrows()
    })
}
//---0n/0ff button---
    function buttonEvent(event) {
      if ((event.type == "click" && event.button == 0) ||
          (event.type == "keydown" && (event.keyCode == 32 || event.keyCode ==13))) {

        var target = event.target; /* Should be rectangle ButtonBase */

	var setPressed = false;
	var setText = "OFF";
   MyArrows.pause()

	if ( target.getAttribute("aria-pressed") == "false" ) {
	  setPressed = true;
	  setText = "ON";

      MyArrows.play()
        }

	target.setAttribute("aria-pressed", setPressed );

	var parent = target.parentNode;
	var child = parent.firstChild;
	while (child != null) {
 	  if (child.nodeName == "text" && child.hasChildNodes() ) {
	    child.firstChild.nodeValue = setText;
	  }
	  child = child.nextSibling;
	}
      }
    }


//==============Impeller==============
//--onload---
//---impeller rotate center point---
var cx
var cy
function placeAsImpeller()
{
    var fontSize=80
    var unicode="273D"
    var code = parseInt(unicode, 16)
    var icon = d3.select("#openerScadaG").append("text")
    .attr("id", "Impeller")
    .attr("x", 183)
    .attr("y", 158)
    .attr("text-anchor", "middle")
    .attr("font-size", fontSize)
    .attr("font-family", "Arial Unicode MS")
    .attr("dy",fontSize/2-4)
    .attr("stroke-width", 2)
    .attr("fill", "blue")
    .attr("stroke", "black")
    .text(String.fromCharCode(code))
    //---get rotate center point---
   var bb=Impeller.getBBox()
   cx=bb.x+.5*bb.width
   cy=bb.y+.5*bb.height
}

var Kaput=false
function removeSCADA()
{
    if(Kaput==false)
    {
        if(StartScada)
            clearTimeout(StartScada);
        if(MyArrows)
        {
            MyArrows.pause()
            d3.select("#openerScadaG").transition().duration(1000).attr("opacity",0)
            setTimeout('mySVG.removeChild(openerScadaG)',1000)
        }
        else
            mySVG.removeChild(openerScadaG)
        Kaput=true
    }
}

