<%@ Language=javascript %>
<%
	var sendXML =  Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var mySVG=sendXML.documentElement

    var updateComponentSVG = Server.CreateObject("Msxml2.DOMDocument.6.0");
    var svgFile='../LIBRARY/Component.svg'
    var svgMap=Server.MapPath(svgFile)
    updateComponentSVG.load(svgMap)

    var docSVG=updateComponentSVG.documentElement

    docSVG.appendChild(mySVG)
    updateComponentSVG.save(svgMap)

   Response.Write("OK")

%>