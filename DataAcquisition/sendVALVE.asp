<%@ Language=javascript %>
<%
	var sendXML =  Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)
    //"<scada valve='"+data+"' />"
	var myData=sendXML.documentElement

    var updateDataXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
    var xmlFile='DATA/HotWaterSystem.xml'
    var xmlMap=Server.MapPath(xmlFile)
    updateDataXML.load(xmlMap)

    var docXML=updateDataXML.documentElement
    var  utcms=new Date().getTime()
    var prevData=docXML.lastChild
    var prevOAT=prevData.getAttribute("oat")
    var prevHWS=prevData.getAttribute("hws")
    var prevFLOW=prevData.getAttribute("flow")
    // prevVALVE=prevData.getAttribute("valve")
    myData.setAttribute("utcms",utcms)
    myData.setAttribute("oat",prevOAT)
    myData.setAttribute("hws",prevHWS)
    myData.setAttribute("flow",prevFLOW)
    // myData.setAttribute("valve",prevVALVE)



    docXML.appendChild(myData)
    updateDataXML.save(xmlMap)

   Response.Write("OK")

%>