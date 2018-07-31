<%@ Language=javascript %>
<%

    var updateComponentSVG = Server.CreateObject("Msxml2.DOMDocument.6.0");
    var svgFile='../LIBRARY/ComponentID.svg'
    var svgMap=Server.MapPath(svgFile)
    updateComponentSVG.load(svgMap)


   var docSVG=updateComponentSVG.documentElement
   var idCnt=0

    for(var k=0;k<docSVG.childNodes.length;k++)
    {
       var g=docSVG.childNodes.item(k)
       if(g.nodeName!="#text")
       {     idCnt++
            g.setAttribute("id","componentISA"+idCnt)

       }
    }
    updateComponentSVG.save(svgMap)
     Response.Write("OK")
%>