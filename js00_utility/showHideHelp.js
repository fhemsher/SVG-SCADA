function openHelp()
{
    var height=600
    d3.select("#helpDiv").transition().duration(800).style("height", height+"px")
    helpDiv.style.visibility="visible"
    helpDiv.style.overflow="auto"
    hmiIntroDiv.style.visibility="hidden"

   componentHelpLibraryDiv.style.height="1px"
    componentHelpLibraryDiv.style.visibility="hidden"
   ProcessHelpLibraryDiv.style.visibility="hidden"
   ProcessHelpLibraryDiv.style.height="1px"
        hmiHelpDiv.style.visibility="hidden"
   hmiHelpDiv.style.height="1px"
    hmiTableCloseButton.style.visibility="hidden"
   isaHelpDiv.style.visibility="hidden"
      isaHelpDiv.style.height="1px"
    isaTableCloseButton.style.visibility="hidden"
}
function closeHelp()
{
    var height=1
    d3.select("#helpDiv").transition().duration(800).style("height", height+"px")
    setTimeout('helpDiv.style.visibility="hidden"',900)
}


function openComponentHelp()
{
                componentHelpLibraryDiv.style.top = "60px"


    var height=componentHelpLibraryDiv.scrollHeight
    d3.select("#componentHelpLibraryDiv").transition().duration(800).style("height", height+"px")
    componentHelpLibraryDiv.style.visibility="visible"
    hmiIntroDiv.style.visibility="hidden"

   helpDiv.style.visibility="hidden"
   helpDiv.style.height="1px"

   ProcessHelpLibraryDiv.style.visibility="hidden"
   ProcessHelpLibraryDiv.style.height="1px"
        hmiHelpDiv.style.visibility="hidden"
   hmiHelpDiv.style.height="1px"
    hmiTableCloseButton.style.visibility="hidden"
    isaHelpDiv.style.visibility="hidden"
   isaHelpDiv.style.height="1px"
    isaTableCloseButton.style.visibility="hidden"

}
function closeComponentHelp()
{
    var height=1
    d3.select("#componentHelpLibraryDiv").transition().duration(800).style("height", height+"px")
    setTimeout('componentHelpLibraryDiv.style.visibility="hidden"',900)
}
function openIsaHelp()
{

	isaHelpDiv.style.top = "60px"


	var height=isaHelpDiv.scrollHeight
	d3.select("#isaHelpDiv").transition().duration(800).style("height", height+"px")
	isaHelpDiv.style.visibility="visible"
	hmiIntroDiv.style.visibility="hidden"

   componentHelpLibraryDiv.style.height="1px"
    componentHelpLibraryDiv.style.visibility="hidden"
	helpDiv.style.visibility="hidden"
	helpDiv.style.height="1px"
	ProcessHelpLibraryDiv.style.visibility="hidden"
	ProcessHelpLibraryDiv.style.height="1px"
	hmiHelpDiv.style.visibility="hidden"
	hmiHelpDiv.style.height="1px"
	hmiTableCloseButton.style.visibility="hidden"
}
function closeIsaHelp()
{
    var height=1
    d3.select("#isaHelpDiv").transition().duration(800).style("height", height+"px")
    setTimeout('isaHelpDiv.style.visibility="hidden"',900)
}
function openProcessHelp()
{
	var pos = getPosition(openProcessButton)
	ProcessHelpLibraryDiv.style.top = (pos.y+10)+"px"


	var height=ProcessHelpLibraryDiv.scrollHeight
	d3.select("#ProcessHelpLibraryDiv").transition().duration(800).style("height", height+"px")
	ProcessHelpLibraryDiv.style.visibility="visible"
	hmiIntroDiv.style.visibility="hidden"
	helpDiv.style.visibility="hidden"
	helpDiv.style.height="1px"
	componentHelpLibraryDiv.style.visibility="hidden"
	componentHelpLibraryDiv.style.height="1px"
	hmiHelpDiv.style.visibility="hidden"
	hmiHelpDiv.style.height="1px"
	hmiTableCloseButton.style.visibility="hidden"
	isaHelpDiv.style.visibility="hidden"
	isaHelpDiv.style.height="1px"
	isaTableCloseButton.style.visibility="hidden"

}
function closeProcessHelp()
{
    var height=1
    d3.select("#ProcessHelpLibraryDiv").transition().duration(800).style("height", height+"px")
    setTimeout('ProcessHelpLibraryDiv.style.visibility="hidden"',900)
}

function openHMIHelp()
{
	var height=560
	d3.select("#hmiHelpDiv").transition().duration(800).style("height", height+"px")
	hmiHelpDiv.style.visibility="visible"

	hmiTableCloseButton.style.visibility="visible"
	hmiIntroDiv.style.visibility="hidden"
	helpDiv.style.visibility="hidden"
	helpDiv.style.height="1px"

	componentHelpLibraryDiv.style.visibility="hidden"
	componentHelpLibraryDiv.style.height="1px"
	ProcessHelpLibraryDiv.style.visibility="hidden"
	ProcessHelpLibraryDiv.style.height="1px"
   
    	isaHelpDiv.style.visibility="hidden"
	isaHelpDiv.style.height="1px"
	isaTableCloseButton.style.visibility="hidden"

}
function closeHMIHelp()
{

	var height=1
	d3.select("#hmiHelpDiv").transition().duration(800).style("height", height+"px")
	setTimeout('hmiHelpDiv.style.visibility="hidden"',900)
	hmiTableCloseButton.style.visibility="hidden"
}

function openZoomHelp()
{
	var height=zoomHelpDiv.scrollHeight
	d3.select("#zoomHelpDiv").transition().duration(500).style("height", height+"px")
	zoomHelpDiv.style.visibility="visible"
}
function closeZoomHelp()
{
	var height=1
	d3.select("#zoomHelpDiv").transition().duration(500).style("height", height+"px")
	setTimeout('zoomHelpDiv.style.visibility="hidden"',600)
}

