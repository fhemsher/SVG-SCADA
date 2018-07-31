<%@ Language=javascript %>
<%
	var sendXML =  Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var mySVG=sendXML.documentElement
     var myId=mySVG.getAttribute("id")
    var updateComponentSVG = Server.CreateObject("Msxml2.DOMDocument.6.0");
    var svgFile='../LIBRARY/Component.svg'
    var svgMap=Server.MapPath(svgFile)
    updateComponentSVG.load(svgMap)


   var docSVG=updateComponentSVG.documentElement


    for(var k=0;k<docSVG.childNodes.length;k++)
    {
       var svg=docSVG.childNodes.item(k)
       var id=svg.getAttribute("id")

       if(id==myId)
       {
         docSVG.removeChild(svg)
         docSVG.appendChild(mySVG)

          Response.Write("OK")
         updateComponentSVG.save(svgMap)
          break;


       }


    }

%>