<%@ Language=javascript %>
<%
	var sendXML =  Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var myData=sendXML.documentElement

    var updateDataXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
    var xmlFile='DATA/HotWaterSystem/flow.xml'
    var xmlMap=Server.MapPath(xmlFile)
    updateDataXML.load(xmlMap)

    var docXML=updateDataXML.documentElement

    docXML.appendChild(myData)
    updateDataXML.save(xmlMap)

   Response.Write("OK")

%>