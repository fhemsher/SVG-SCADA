

function saveSvgAsFile()
{

  if(inputFileNameToSaveAs.value!="")
  {
        showSaveSVG()
        //showSourceSVG()

        var textToSave = svgSaveDiv.innerText.replace(/\\n/g,"")
       textToSave.replace(/\&/g,"&amp;")
        //---or use this---
        //var textToSave = new XMLSerializer().serializeToString(mySVG)

        var textToSaveAsBlob = new Blob([textToSave], {type:"text/xml"});
        var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
        var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
        if(fileNameToSaveAs.indexOf(".svg")==-1)
        fileNameToSaveAs+=".svg"
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        downloadLink.href = textToSaveAsURL;
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        downloadLink.click();
    }
}





function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}



function clearButtonClicked()
{
   closeAllFrames()
   removeSCADA()
   mySVG.removeAttribute("onclick")
   mySVG.removeAttribute("onmousedown")
   mySVG.removeAttribute("onmousemove")
   mySVG.removeAttribute("onmouseup")

              DrawX.style("display", "none")
          DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)


   if(ZoomDrawing==true)
   {
        myZoom.transform(d3.select("#mySVG"), d3.zoomIdentity);

    //---clear previous transforms---
   // zoomG.removeAttribute("transform")
    	ZoomG.transition().attr("transform", "translate(0,0)scale(1,1)")


       disableZoom()
       zoomButton.title="Mousewheel Zoom Drawing"
       zoomButton.style.background="transparent"
       ZoomDrawing=false
   }

   	for(var k=domActiveElemG.childNodes.length-1;k>=0;k--)
	{
		if(domActiveElemG.childNodes.item(k).getAttribute("id")!="domDrawX"&&domActiveElemG.childNodes.item(k).getAttribute("id")!="dragDot")
			domActiveElemG.removeChild(domActiveElemG.childNodes.item(k))
	}

    for(var k=domElemG.childNodes.length-1;k>=0;k--)
      	domElemG.removeChild(domElemG.childNodes.item(k))


    if(bgImageG.childNodes.length>0)bgImageG.removeChild(bgImageG.lastChild)
	inputFileNameToSaveAs.value=""
	inputFileNameToSaveAs.placeholder="Include your fileName.svg"
	processTableDiv.style.visibility='hidden'
	LoadedProcessArray=[]
	ProcessDoc=null
	//showSourceSVG()
	showSaveSVG()
	enableAllButtons()
}

//=============publish=============
var PublishElems=[]
function publishSVG()
{
    PublishElems=[]
    publishSVGValue.value=''
    var publishSVG = mySVG.cloneNode(true)
    publishSVG.setAttribute("id", "publishSVG")
    publishSVG.removeAttribute("onmousedown")
    publishSVG.removeAttribute("onmouseup")
    publishSVG.removeAttribute("onmousemove")
    publishSVG.removeAttribute("onclick")
    for(var k = publishSVG.childNodes.length-1; k>=0; k--)
    {
        var elem = publishSVG.childNodes.item(k)
        if(elem.nodeName!="#text")
        {
            var id = elem.getAttribute("id")
            elem.removeAttribute("pointer-events")
            if(elem.nodeName=="style")publishSVG.removeChild(elem)
            //if(elem.nodeName=="defs")publishSVG.removeChild(elem)
            if(id=="domDrawX")publishSVG.removeChild(elem)
            if(id=="openerScadaG")publishSVG.removeChild(elem)
            if(id=="domWrapper")publishSVG.removeChild(elem)
            if(id=="coverRect")publishSVG.removeChild(elem)
            if(id=="domActiveElemG")publishSVG.removeChild(elem)
            if(id=="processRect")publishSVG.removeChild(elem)
            if(id=="componentRect")publishSVG.removeChild(elem)
             if(elem.nodeName=="defs")publishSVG.removeChild(elem)


            if(id=="zoomG")
            {
                var zooomG=publishSVG.getElementsByTagName("g")[0]
                zooomG.setAttribute("id","publishG")


                zooomG.removeChild(zooomG.firstChild) //---bgImage--
                zooomG.removeChild(zooomG.firstChild) //--grid---
                var elemG=zooomG.firstChild
                elemG.removeAttribute("class")

                elemG.setAttribute("id","publishElemG")
                for(var e=0;e<elemG.childNodes.length;e++)
                {
                    var el=elemG.childNodes[e]
                    el.removeAttribute("onmousedown");
                    el.removeAttribute("style");
                    el.removeAttribute("class");
                    el.removeAttribute("id")
                    el.removeAttribute("vector-effect")
                    el.removeAttribute("pointer-events")
                    el.removeAttribute("type")
                    el.removeAttribute("cursor")
                    el.removeAttribute("onclick")
                    el.removeAttribute("name")
                    el.removeAttribute("email")
                    el.removeAttribute("category")
                    el.removeAttribute("parentId")
                    el.removeAttribute("utcms")
                    el.removeAttribute("nativeheight")
                    el.removeAttribute("nativewidth")
                    el.removeAttribute("myscale")
                    var rects=el.getElementsByTagName("rect")
                    if(rects.length>0)
                    {
                        var coverRect=rects[rects.length-1]
                        coverRect.removeAttribute("onmousedown")
                    }

                }
            }
        }
    }
    var sheet = document.createElement('style')
    publishSVG.insertBefore(sheet,publishSVG.firstChild)
    var defs = document.createElement('defs')
    publishSVG.insertBefore(defs,publishSVG.childNodes.item(1))



    //---get base classes and base defs
    var svgString = new XMLSerializer().serializeToString(publishSVG)
    //---style classes---

    if(svgString.indexOf("gridVFD")!=-1)
    {
        sheet.innerHTML += ".gridVFD line {stroke: black;stroke-opacity: 0.5;}"
        sheet.innerHTML += ".gridVFD path {stroke-width: 0;}"
    }
    if(svgString.indexOf("gaugeLine")!=-1)
        sheet.innerHTML += ".gaugeLine {fill: none;stroke: black;stroke-width: 1;}"

    if(svgString.indexOf("axisRed")!=-1)
    {
        sheet.innerHTML += ".axisRed line{stroke: red;}"
        sheet.innerHTML += ".axisRed path{stroke: red;}"
    }
    if(svgString.indexOf("axisBlue")!=-1)
    {
        sheet.innerHTML += ".axisBlue line{stroke: blue;}"
        sheet.innerHTML += ".axisBlue path{stroke: blue;}"
    }

    if(svgString.indexOf("axisPurple")!=-1)
    {
        sheet.innerHTML += ".axisPurple line{stroke: purple;}"
        sheet.innerHTML += ".axisPurple path{stroke: purple;}"
    }

    if(svgString.indexOf("chartLineLeft")!=-1)
        sheet.innerHTML += ".chartLineLeft {fill: none;stroke: DarkViolet;stroke-width: 3;}"
    if(svgString.indexOf("chartLineRight2")!=-1)
        sheet.innerHTML += ".chartLineRight2 {fill: none;stroke: red;stroke-width: 3;}"
    if(svgString.indexOf("chartLineRight1")!=-1)
        sheet.innerHTML += ".chartLineRight1 {fill: none;stroke: blue;stroke-width: 3;}"
    if(svgString.indexOf("chartLineCI")!=-1)
        sheet.innerHTML += ".chartLineCI {fill: none;stroke: purple;stroke-width: 3;}"
    if(svgString.indexOf("chartLineVAC")!=-1)
        sheet.innerHTML += ".chartLineVAC {fill: none;stroke: red;stroke-width: 3;}"
    if(svgString.indexOf("chartLineHZ")!=-1)
        sheet.innerHTML += ".chartLineHZ {fill: none;stroke: blue;stroke-width: 3;}"
    if(svgString.indexOf("axisred")!=-1)
    {
        sheet.innerHTML += ".axisred line{stroke: red;}"
        sheet.innerHTML += ".axisred path{stroke: red;}"
    }
    if(svgString.indexOf("axisBlue")!=-1)
    {
        sheet.innerHTML += ".axisBlue line{stroke: blue;}"
        sheet.innerHTML += ".axisBlue path{stroke: blue;}"
    }
    if(svgString.indexOf("axisDarkViolet")!=-1)
    {
        sheet.innerHTML += ".axisDarkViolet line{stroke: DarkViolet;}"
        sheet.innerHTML += ".axisDarkViolet path{stroke: DarkViolet;}"
    }
    if(svgString.indexOf("track")!=-1)
    {
        sheet.innerHTML += ""+
        ".ticks-automanual {font: 10px sans-serif;}"+
        ".track,.track-inset,.track-overlay {stroke-linecap: round;}"+
        ".track {stroke: #000;stroke-opacity: 0.3;stroke-width: 12px;}"+
        ".track-inset {stroke: #ddd;stroke-width: 8px;}"+
        ".track-overlay {pointer-events: stroke;stroke-width: 50px;stroke: transparent;}"+
        ".handle {stroke: #000;stroke-opacity: 0.5;stroke-width: 1.25px;}"
    }






    //-------------- append defs---

    if(svgString.indexOf("url(#greenGradient)")!=-1)
        publishSVG.appendChild(pilotLightDefs.cloneNode(true))
    if(arrowDefs.childNodes.length>0)
        publishSVG.appendChild(arrowDefs.cloneNode(true))
    if(defsPattern.childNodes.length>0)
        publishSVG.appendChild(defsPattern.cloneNode(true))
    if(defsGradient.childNodes.length>0)
        publishSVG.appendChild(defsGradient.cloneNode(true))

    if(svgString.indexOf("url(#drop-shadow)")!=-1)
        publishSVG.appendChild(defsShadow.cloneNode(true))

    if(svgString.indexOf("url(#pipe3D)")!=-1)
        publishSVG.appendChild(pipe3dDefs.cloneNode(true))


    if(svgString.indexOf("url(#warningMaxTrend)")!=-1)
        publishSVG.appendChild(alarmWarningTrendDefs.cloneNode(true))
    if(svgString.indexOf("url(#warningMaxBar)")!=-1)
        publishSVG.appendChild(alarmWarningBarDefs.cloneNode(true))

    if(svgString.indexOf("url(#warningMaxTankLevel)")!=-1)
        publishSVG.appendChild(alarmWarningTankLevelDefs.cloneNode(true))

    var svgString = new XMLSerializer().serializeToString(publishSVG)
    publishSVGValue.value=svgString


    openPublishSVG()

}

function publishSvgAsFile()
{

  if(inputPublishFileNameToSaveAs.value!="")
  {


        var textToPublish =publishSVGValue.value.replace(/\\n/g,"")
       textToPublish.replace(/\&/g,"&amp;")
        //---or use this---
        //var textToPublish = new XMLSerializer().serializeToString(mySVG)

        var textToPublishAsBlob = new Blob([textToPublish], {type:"text/xml"});
        var textToPublishAsURL = window.URL.createObjectURL(textToPublishAsBlob);
        var fileNameToPublishAs = document.getElementById("inputPublishFileNameToSaveAs").value;
        if(fileNameToPublishAs.indexOf(".svg")==-1)
        fileNameToPublishAs+=".svg"
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToPublishAs;
        downloadLink.innerHTML = "Download File";
        downloadLink.href = textToPublishAsURL;
        downloadLink.onclick = destroyClickedPublishElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        downloadLink.click();
        closePublishDiv()
    }
}





function destroyClickedPublishElement(event)
{
    document.body.removeChild(event.target);
}
function openPublishSVG()
{
    publishSVGDiv.style.display="block"
    closePublishDivButton.style.visibility="visible"

}
function closePublishDiv()
{
    publishSVGDiv.style.display="none"
    closePublishDivButton.style.visibility="hidden"
     publishSVGValue.value=''
}


//================insert/edit existing svg================

function openExistingSVG()
{
    existingSVGDiv.style.display="block"
    closeExistingDivButton.style.visibility="visible"
    existingSVGValue.focus()
}
function closeExistingDiv()
{
    existingSVGDiv.style.display="none"
    closeExistingDivButton.style.visibility="hidden"

}




var InsertSymbolArray=[]
function insertExistingSVG()
{
    InsertSymbolArray=[] //---build symbol table---
    clearButtonClicked()
    var svgString=existingSVGValue.value.replace(/\\n/g,"")
    var parser = new DOMParser();
    var SVGdoc=parser.parseFromString(svgString,"text/xml").documentElement;
    var svgWidth=SVGdoc.getAttribute("width")
    var svgHeight=SVGdoc.getAttribute("height")
    svgWidthValue.value=svgWidth
    svgHeightValue.value=svgHeight
    svgDiv.style.width=svgWidth+"px"
    svgDiv.style.height=svgHeight+"px"
    mySVG.setAttribute("width",svgWidth)
    mySVG.setAttribute("height",svgHeight)
    mySVG.setAttribute("viewBox", "0 0 "+svgWidth+" "+svgHeight)
    createGridLayer()

	var zooomG=SVGdoc.getElementsByTagName("g")[0]
	for(var k=0;k<SVGdoc.childNodes.length;k++)
	{
		var elem=SVGdoc.childNodes.item(k)
		if(elem.nodeName!="#text")
		{
			if(elem.id=="arrowDefs")
			{
				var arrows=elem.childNodes
				for(var a=0;a<arrows.length;a++)
				if(arrows.item(a).nodeName!="#text")
					arrowDefs.appendChild(arrows.item(a).cloneNode(true))
			}
			if(elem.id=="defsPattern")
			{
				var patterns=elem.childNodes
				for(var a=0;a<patterns.length;a++)
				if(patterns.item(a).nodeName!="#text")
					defsPattern.appendChild(patterns.item(a).cloneNode(true))
			}
			if(elem.id=="defsGradient")
			{
				var gradients=elem.childNodes
				for(var a=0;a<gradients.length;a++)
				if(gradients.item(a).nodeName!="#text")
					defsGradient.appendChild(gradients.item(a).cloneNode(true))
			}
		}
	}
	for(var m=0;m<zooomG.childNodes.length;m++)
	{
		var elem=zooomG.childNodes.item(m)
		if(elem.nodeName!="#text")
		{
			if(elem.id=="domElemG")
			{


                            var els=elem.childNodes
                            for(var e=0;e<els.length;e++)
                            {

                                var el=els.item(e)
                              if(el.nodeName!="#text")
                              {
                                var id=el.id
                                var myClass=el.getAttribute("class")
                                if(myClass=="iconElem")el.setAttribute("onmousedown","editIconStart("+id+",evt)")
                                if(myClass=="pathElem")el.setAttribute("onmousedown","startPathDrawEdit("+id+",evt)")
                                if(myClass=="circleElem")el.setAttribute("onmousedown","editCircleDraw("+id+",evt)")
                                if(myClass=="ellipseElem")el.setAttribute("onmousedown","editEllipseDraw("+id+",evt)")
                                if(myClass=="rectElem")el.setAttribute("onmousedown","editRectDraw("+id+",evt)")
                                if(myClass=="textElem")el.setAttribute("onmousedown","editTextDraw("+id+",evt)")
                                if(myClass=="polygonElem")el.setAttribute("onmousedown","editPolygonDraw("+id+",evt)")
                                if(myClass=="symbolElem")el.setAttribute("onmousedown","editSymbolDraw("+id+",evt)")
                                if(myClass=="componentElem")
                                {
                                    	var gz=el.getElementsByTagName("rect")
                						var coverRect=gz[gz.length-1]
                						coverRect.setAttribute("onmousedown","editComponentDraw("+id+",evt)");
                               }
                                if(myClass=="isaElem")
                                {
                                    	var gz=el.getElementsByTagName("rect")
                						var coverRect=gz[gz.length-1]
                						coverRect.setAttribute("onmousedown","editIsaDraw("+id+",evt)");
                               }
                               if(myClass=="processElem")
                                {
                                    	var gz=el.getElementsByTagName("rect")
                						var coverRect=gz[gz.length-1]
                						coverRect.setAttribute("onmousedown","editProcessDraw("+id+",evt)");
                                 }
                                if(myClass=="hmiElem")
                                {
                                    if(id.indexOf("control")!=-1)
            							el.setAttribute("onmousedown","editControlDraw("+id+",evt)");
            						if(id.indexOf("pilotLight")!=-1)
            							el.setAttribute("onmousedown","editPilotLightDraw("+id+",evt)");
            						if(id.indexOf("button")!=-1)
            							el.setAttribute("onmousedown","editButtonDraw("+id+",evt)");
            						if(id.indexOf("PID")!=-1)
            							el.setAttribute("onmousedown","editPIDDraw("+id+",evt)");
            						if(id.indexOf("roundGauge")!=-1)
            							el.setAttribute("onmousedown","editGaugeDraw("+id+",evt)");
            						if(id.indexOf("barGauge")!=-1) //---barGauge---
            							el.setAttribute("onmousedown","editBarGaugeDraw("+id+",evt)");
            						if(id.indexOf("circuitBreaker")!=-1) //---circuitBreaker---
            							el.setAttribute("onmousedown","editCircuitBreakerDraw("+id+",evt)");
            						if(id.indexOf("digitalReadout")!=-1) //---digitalReadout---
            							el.setAttribute("onmousedown","editDigitalReadoutDraw("+id+",evt)");
            						if(id.indexOf("processVariableChart")!=-1) //---processVariableChart---
            							el.setAttribute("onmousedown","editProcessVariableChartDraw("+id+",evt)");
            						if(id.indexOf("statusStick")!=-1) //---statusStick---
            							el.setAttribute("onmousedown","editStatusStickDraw("+id+",evt)");
            						if(id.indexOf("SubstationDigital")!=-1) //---substationDigital---
            							el.setAttribute("onmousedown","editSubstationDigitalDraw("+id+",evt)");
            						if(id.indexOf("tankLevel")!=-1) //---tankLevel---
            							el.setAttribute("onmousedown","editTankLevelDraw("+id+",evt)");
            						if(id.indexOf("trendGauge")!=-1) //---trendGauge---
            							el.setAttribute("onmousedown","editTrendGaugeDraw("+id+",evt)");
            						if(id.indexOf("variableFrequency")!=-1) //---variableFrequency---
            							el.setAttribute("onmousedown","editVariableFrequencyDraw("+id+",evt)");
            						if(id.indexOf("autoManual")!=-1) //---autoManual---
            							el.setAttribute("onmousedown","editAutoManualDraw("+id+",evt)");
                                 }


                                domElemG.appendChild(el)
                               }
                            }




			}
		}//---#text
	} //---zoomG---

    closeExistingDiv()
   // showSourceSVG()
    showSaveSVG()

}

