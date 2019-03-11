function disableAllButtons()
{
  selectDrawElemDiv.style.visibility="hidden"
       hmiSymbolSelect.disabled=true
       hmiSymbolSelect.selectedIndex=0
      openAddComponentButton.disabled=true
    openAddCircleButton.disabled=true
    openAddIconButton.disabled=true
    openAddImageButton.disabled=true

    openAddEllipseButton.disabled=true
    openAddRectButton.disabled=true
    openAddBGImageButton.disabled=true
    openAddTextButton.disabled=true
    openAddPathButton.disabled=true
    openAddSymbolButton.disabled=true
    openAddPolygonButton.disabled=true

    openAddTextureButton.disabled=true
    openAddGradientButton.disabled=true
    getComponentLibraryButton.disabled=true
    getIsaLibraryButton.disabled=true
    getProcessLibraryButton.disabled=true
   removeSCADA() //---remove opener animation---
}
function enableAllButtons()
{
             hmiSymbolSelect.disabled=false
       hmiSymbolSelect.selectedIndex=0

  selectDrawElemDiv.style.visibility="visible"

       openAddComponentButton.disabled=false
    openAddCircleButton.disabled=false
    openAddIconButton.disabled=false
    openAddImageButton.disabled=false

    openAddEllipseButton.disabled=false
    openAddRectButton.disabled=false
    openAddBGImageButton.disabled=false
    openAddTextButton.disabled=false
    openAddPathButton.disabled=false
    openAddSymbolButton.disabled=false
    openAddPolygonButton.disabled=false

    openAddTextureButton.disabled=false
    openAddGradientButton.disabled=false
       getComponentLibraryButton.disabled=false
       getIsaLibraryButton.disabled=false
    getProcessLibraryButton.disabled=false


         openAddComponentButton.style.borderColor=""
    openAddCircleButton.style.borderColor=""
    openAddIconButton.style.borderColor=""
    openAddImageButton.style.borderColor=""

    openAddEllipseButton.style.borderColor=""
    openAddRectButton.style.borderColor=""
    openAddBGImageButton.style.borderColor=""



    openAddTextButton.style.borderColor="" 
    openAddPathButton.style.borderColor="" 
    openAddSymbolButton.style.borderColor="" 
    openAddPolygonButton.style.borderColor="" 

    openAddTextureButton.style.borderColor=""
    openAddGradientButton.style.borderColor=""
       getComponentLibraryButton.style.borderColor=""
       getIsaLibraryButton.style.borderColor=""
    getProcessLibraryButton.style.borderColor=""

    if(svgSaveDiv.style.display!="none")
        showSaveSVG()


}


function openAddSymbolDraw()
{
    if(addElemSymbolLoad==true)
        startSymbolDraw()

        openIframe("AddElem", "addElemSymbol", 0)
        mySVG.setAttribute("onclick", "plantSymbolSymbol(event)")

        openAddSymbolButton.style.borderStyle = "inset"
}
function openAddComponentDraw()
{
    if(addElemComponentLoad==true)
    {
         startComponentDraw()
          addElemComponentCw.sendComponentMessageSpan.innerHTML=""
          addElemComponentCw.componentCategorySelect.selectedIndex=0
          addElemComponentCw.myComponentTitleValue.value=""
          addElemComponentCw.myComponentDescriptionValue.value=""
          addElemComponentCw.saveToLibraryDiv.style.opacity=.5
    }


        openIframe("AddElem", "addElemComponent", 0)
       // mySVG.setAttribute("onclick", "plantComponent(event)")

        openAddComponentButton.style.borderStyle = "inset"
}


function openEditProcess()
{
    //if(editElemProcessLoad==true)
        //startProcessDraw()

        openIframe("AddElem", "editElemProcess", 0)
       // mySVG.setAttribute("onclick", "plantComponent(event)")


}

function openAddIconDraw()
{
    if(addElemIconLoad==true)
        startIconDraw()

        openIframe("AddElem", "addElemIcon", 0)
        mySVG.setAttribute("onclick", "plantIcon(event)")

        openAddIconButton.style.borderStyle = "inset"

}

function openAddImageDraw()
{
    if(addElemImageLoad==true)
        startImageDraw()

        openIframe("AddElem", "addElemImage", 0)
        mySVG.setAttribute("onclick", "plantImage(event)")

        openAddImageButton.style.borderStyle = "inset"

}


function openAddTexture()
{
    if(addElemTextureLoad==true)
        startTextureDraw()

        openIframe("AddElem", "addElemTexture", 0)
       // mySVG.setAttribute("onclick", "plantSymbolSymbol(event)")

        openAddTextureButton.style.borderStyle = "inset"
}


function openAddBGImage()
{
   if(addElemBGImageLoad==true)
       startBGImageDraw()
    if(document.getElementById(DrawBGImageEditId))
    {   var cw = addElemBGImageCw
        cw.editTemplateCheckDiv.style.visibility="visible"


    }

        openIframe("AddElem", "addElemBGImage", 0)
       // mySVG.setAttribute("onclick", "plantSymbolSymbol(event)")

        openAddBGImageButton.style.borderStyle = "inset"
}

function openAddGradient()
{
    if(addElemGradientLoad==true)
        startGradientDraw()

        openIframe("AddElem", "addElemGradient", 0)
       // mySVG.setAttribute("onclick", "plantSymbolSymbol(event)")

        openAddGradientButton.style.borderStyle = "inset"
}



function openAddPilotLightDraw()
{
    if(addElemPilotLightLoad==true)
        startPilotLightDraw()

        openIframe("AddElem", "addElemPilotLight", 0)
        mySVG.setAttribute("onclick", "plantPilotLight()")


}


function openAddStatusStickDraw()
{
    if(addElemStatusStickLoad==true)
        startStatusStickDraw()

        openIframe("AddElem", "addElemStatusStick", 0)
        mySVG.setAttribute("onclick", "plantStatusStick()")


}
function openAddAutoManualDraw()
{
    if(addElemAutoManualLoad==true)
        startAutoManualDraw()

        openIframe("AddElem", "addElemAutoManual", 0)
        mySVG.setAttribute("onclick", "plantAutoManual()")


}


function openAddButtonDraw()
{
    if(addElemButtonLoad==true)
        startButtonDraw()

        openIframe("AddElem", "addElemButton", 0)
        mySVG.setAttribute("onclick", "plantButton()")


}

function openAddCircuitBreakerDraw()
{
    if(addElemCircuitBreakerLoad==true)
        startCircuitBreakerDraw()

        openIframe("AddElem", "addElemCircuitBreaker", 0)
        mySVG.setAttribute("onclick", "plantCircuitBreaker()")


}



function openAddCircleDraw()
{
    if(addElemCircleLoad==true)
        startCircleDraw()

        openIframe("AddElem", "addElemCircle", 0)

        openAddCircleButton.style.borderStyle = "inset"
}

function openAddControlDraw()
{
    if(addElemControlLoad==true)
        startControlDraw()

        openIframe("AddElem", "addElemControl", 0)


}

function openAddPIDDraw()
{
    if(addElemPIDLoad==true)
        startPIDDraw()

        openIframe("AddElem", "addElemPID", 0)


}

function openAddGaugeDraw()
{
    if(addElemGaugeLoad==true)
        startGaugeDraw()

        openIframe("AddElem", "addElemGauge", 0)



}

function openAddTrendGaugeDraw()
{
    if(addElemTrendGaugeLoad==true)
        startTrendGaugeDraw()

        openIframe("AddElem", "addElemTrendGauge", 0)



}

function openAddBarGaugeDraw()
{
    if(addElemBarGaugeLoad==true)
        startBarGaugeDraw()

        openIframe("AddElem", "addElemBarGauge", 0)



}
function openAddTankLevelDraw()
{
    if(addElemTankLevelLoad==true)
        startTankLevelDraw()

        openIframe("AddElem", "addElemTankLevel", 0)



}
function openAddSubstationDigitalDraw()
{
    if(addElemSubstationDigitalLoad==true)
        startSubstationDigitalDraw()

        openIframe("AddElem", "addElemSubstationDigital", 0)



}
function openAddVariableFrequencyDraw()
{
    if(addElemVariableFrequencyLoad==true)
        startVariableFrequencyDraw()

        openIframe("AddElem", "addElemVariableFrequency", 0)



}
function openAddProcessVariableChartDraw()
{
    if(addElemProcessVariableChartLoad==true)
        startProcessVariableChartDraw()

        openIframe("AddElem", "addElemProcessVariableChart", 0)



}


function openAddDigitalReadoutDraw()
{
    if(addElemDigitalReadoutLoad==true)
        startDigitalReadoutDraw()

        openIframe("AddElem", "addElemDigitalReadout", 0)



}
function openAddEllipseDraw()
{
    if(addElemEllipseLoad==true)
        startEllipseDraw()

        openIframe("AddElem", "addElemEllipse", 0)

        openAddEllipseButton.style.borderStyle = "inset"
}

function openAddPolygonDraw()
{
    if(addElemPolygonLoad==true)
        startPolygonDraw()

        openIframe("AddElem", "addElemPolygon", 0)

        openAddPolygonButton.style.borderStyle = "inset"
}


function openAddRectDraw()
{
    if(addElemRectLoad==true)
        startRectDraw()

        openIframe("AddElem", "addElemRect", 0)

        openAddRectButton.style.borderStyle = "inset"
}

function openAddTextDraw()
{
    if(addElemTextLoad==true)
        startTextDraw()
        openIframe("AddElem", "addElemText", 0)

        openAddTextButton.style.borderStyle = "inset"

}
function openAddPathDraw()
{

    if(addElemPathLoad==false)
        openIframe("AddElem", "addElemPath", 0)
        else
        {
            openIframe("AddElem", "addElemPath", 0)
            startPathDraw()
        }

        openAddPathButton.style.borderStyle = "inset"

}

var AddElemOpen = false //--true if any addElem Frame is viz=true
function isAddElemOpen() //---called from iframeSelection.js---
{
    AddElemOpen = false
    if(editElemProcessViz==true)AddElemOpen = true;
    if(editElemComponentViz==true)AddElemOpen = true;
    if(editElemIsaViz==true)AddElemOpen = true;
    if(addElemComponentViz==true)AddElemOpen = true;
    if(addElemTextViz==true)AddElemOpen = true;
    if(addElemCircleViz==true)AddElemOpen = true;
    if(addElemIconViz==true)AddElemOpen = true;
    if(addElemImageViz==true)AddElemOpen = true;
    if(addElemControlViz==true)AddElemOpen = true;
    if(addElemPIDViz==true)AddElemOpen = true;
    if(addElemGaugeViz==true)AddElemOpen = true;
    if(addElemTrendGaugeViz==true)AddElemOpen = true;
    if(addElemBarGaugeViz==true)AddElemOpen = true;
    if(addElemSubstationDigitalViz==true)AddElemOpen = true;
    if(addElemVariableFrequencyViz==true)AddElemOpen = true;
    if(addElemTankLevelViz==true)AddElemOpen = true;
    if(addElemDigitalReadoutViz==true)AddElemOpen = true;
    if(addElemAutoManualViz==true)AddElemOpen = true;
    if(addElemEllipseViz==true)AddElemOpen = true;
    if(addElemRectViz==true)AddElemOpen = true;
    if(addElemTextViz==true)AddElemOpen = true;
    if(addElemSymbolViz==true)AddElemOpen = true;
    if(addElemPilotLightViz==true)AddElemOpen = true;
    if(addElemStatusStickViz==true)AddElemOpen = true;
    if(addElemButtonViz==true)AddElemOpen = true;
    if(addElemCircuitBreakerViz==true)AddElemOpen = true;
    if(addElemTextureViz==true)AddElemOpen = true;
    if(addElemGradientViz==true)AddElemOpen = true;
    if(addElemPolygonViz==true)AddElemOpen = true;

}

function openIframe(Dir, name, left)
{
    if(ZoomDrawing==false)
    {
            closeAllFrames()
            disableAllButtons()

            var top = 50

            var fName = eval(name+"Load")
            var myFrame = document.getElementById(name+'Frame')
            var myDiv = d3.select("#"+name+"FrameDiv")

            if(fName==false)
            {
                eval(name+"Load=true")
                myFrame.src = Dir+"/"+name+".htm";
                eval(name+"Cw=document.getElementById(name+'Frame').contentWindow")
            }
            else
            {

                var height = myFrame.scrollHeight

            }
            myFrame.style.overflow = "hidden"

            myDiv.transition().duration(800).style("height", height+"px")

            eval(name+"Viz=true")

            myDiv.style("visibility", "visible")
            myDiv.style("left", left+"px")
            myDiv.style("top", top+"px")

            if(name=="addElemRect")
                startRectDraw()
                if(name=="addElemCircle")
                startCircleDraw()

                if(name=="addElemText")
                startTextDraw()
    }
}

//---fired from iframe onload----
function sizeFrame(name, width, height)
{
    var myFrame = document.getElementById(name+'Frame')
    var myDiv = d3.select("#"+name+"FrameDiv")

    myFrame.style.width = width+"px"
    myFrame.style.height = height+"px"

    myDiv.style("width", width+"px")
    myDiv.transition().duration(800).style("height", height+"px")

}
//---X button in iframe---
function closeIframe(name)
{

    mySVG.removeAttribute("onclick")



    openAddComponentButton.style.borderStyle = ""
    openAddCircleButton.style.borderStyle = ""
    openAddIconButton.style.borderStyle = ""
    openAddImageButton.style.borderStyle = ""

    openAddEllipseButton.style.borderStyle = ""
    openAddRectButton.style.borderStyle = ""
    openAddBGImageButton.style.borderStyle = ""
    openAddTextButton.style.borderStyle = ""
    openAddPathButton.style.borderStyle = ""
    openAddSymbolButton.style.borderStyle = ""
    openAddPolygonButton.style.borderStyle = ""

    openAddTextureButton.style.borderStyle = ""
    openAddGradientButton.style.borderStyle = ""
    getComponentLibraryButton.style.borderStyle = ""
    getIsaLibraryButton.style.borderStyle = ""
    getProcessLibraryButton.style.borderStyle = ""

    enableAllButtons()
    var myDiv = d3.select("#"+name+"FrameDiv")
    myDiv.transition().style("height", 1+"px")
    .on("end", function()
        {
            myDiv.style("visibility", "hidden")
        }
    )
    eval(name+"Viz=false")

}

//---Only one frame visable: fired when another  frame is chosen
function closeAllFrames()
{
    hmiIntroDiv.style.visibility="hidden"

    closeHelp()
    closeComponentHelp()
    closeProcessHelp()
        closeHMIHelp()
   closeComponentTable()
   closeComponentHelp()
   closeIsaTable()
   closeIsaHelp()


    if(svgSaveDiv.style.display=="block")
        showSaveSVG()


         openAddCircleButton.style.borderStyle = ""
         openAddComponentButton.style.borderStyle = ""
         openAddIconButton.style.borderStyle = ""
         openAddImageButton.style.borderStyle = ""


   openAddEllipseButton.style.borderStyle = ""
    openAddRectButton.style.borderStyle = ""
    openAddBGImageButton.style.borderStyle = ""
    openAddTextButton.style.borderStyle = ""
    openAddPathButton.style.borderStyle = ""
    openAddSymbolButton.style.borderStyle = ""
    openAddPolygonButton.style.borderStyle = ""

    openAddTextureButton.style.borderStyle = ""
    openAddGradientButton.style.borderStyle = ""
    getComponentLibraryButton.style.borderStyle = ""
    getIsaLibraryButton.style.borderStyle = ""
    getProcessLibraryButton.style.borderStyle = ""


    for(var k = 0; k<iframeNameArray.length; k++)
    {
        var name = iframeNameArray[k]
        var viz = eval(name+"Viz")
        if(viz==true)
        {
            if(name=="editElemComponent")closeEditComponent()
             else if(name=="editElemProcess")closeEditProcess()
            else if(name=="editElemIsa")closeEditIsa()
            else if(name=="addElemText")closeDrawText()
            else if(name=="addElemCircle")closeDrawCircle()
            else if(name=="addElemTexture")closeDrawTexture()
            else if(name=="addElemControl")closeDrawControl()
            else if(name=="addElemPID")closeDrawPID()
            else if(name=="addElemGauge")closeDrawGauge()
            else if(name=="addElemTrendGauge")closeDrawTrendGauge()
            else if(name=="addElemPilotLight")closeDrawPilotLight()
            //---added---
            else if(name=="addElemComponent")closeDrawComponent()
            else if(name=="addElemButton")closeDrawButton()
            else if(name=="addElemCircuitBreaker")closeDrawCircuitBreaker()
            else if(name=="addElemDigitalReadout")closeDrawDigitalReadout()
            else if(name=="addElemProcessVariableChart")closeDrawVariableChart()
            else if(name=="addElemStatusStick")closeDrawStatusStick()
            else if(name=="addElemSubstationDigital")closeDrawSubstationDigital()
            else if(name=="addElemTankLevel")closeDrawTankLevel()
            else if(name=="addElemVariableFrequency")closeDrawVariableFrequency()
            else if(name=="addElemAutoManual")closeDrawAutoManual()

            else if(name=="addElemEllipse")closeDrawEllipse()
            else if(name=="addElemRect")closeDrawRect()
            else if(name=="addElemPath")closeDrawPath()
            else if(name=="addElemSymbol")closeDrawSymbol()
            else if(name=="addElemPolygon")closeDrawPolygon()


            var myDiv = d3.select("#"+name+"FrameDiv")
            myDiv.style("height", 1+"px")
            myDiv.style("visibility", "hidden")
            myDiv.style("overflow", "hidden")


        }
        eval(name+"Viz=false")
    }

}
var editElemProcessLoad = false
var addElemControlLoad = false
var addElemComponentLoad = false
var editElemComponentLoad = false
var editElemIsaLoad = false
var addElemPIDLoad = false
var addElemGaugeLoad = false
var addElemAutoManualLoad = false
var addElemTrendGaugeLoad = false
var addElemBarGaugeLoad = false
var addElemTankLevelLoad = false
var addElemDigitalReadoutLoad = false
var addElemVariableFrequencyLoad = false
var addElemProcessVariableChartLoad = false
var addElemSubstationDigitalLoad = false
var addElemCircleLoad = false
var addElemIconLoad = false
var addElemImageLoad = false
var addElemSymbolLoad = false
var addElemPolygonLoad = false
var addElemTextureLoad = false
var addElemGradientLoad = false
var addElemPilotLightLoad = false
var addElemStatusStickLoad = false
var addElemButtonLoad = false
var addElemCircuitBreakerLoad = false
var addElemSymbolEditLoad = false
var addElemEllipseLoad = false
var addElemRectLoad = false
var addElemBGImageLoad = false
var addElemTextLoad = false
var addElemPathLoad = false
var addElemPathEditLoad = false
var editElemProcessViz = false
var addElemCircleViz = false
var addElemComponentViz = false
var editElemComponentViz = false
var editElemIsaViz = false
var addElemIconViz = false
var addElemImageViz = false
var addElemControlViz = false
var addElemPIDViz = false
var addElemGaugeViz = false
var addElemAutoManualViz = false
var addElemTrendGaugeViz = false
var addElemBarGaugeViz = false
var addElemSubstationDigitalViz = false
var addElemVariableFrequencyViz = false
var addElemProcessVariableChartViz = false
var addElemTankLevelViz = false
var addElemDigitalReadoutViz = false
var addElemSymbolViz = false
var addElemPolygonViz = false
var addElemTextureViz = false
var addElemGradientViz = false
var addElemPilotLightViz = false
var addElemStatusStickViz = false
var addElemButtonViz = false
var addElemCircuitBreakerViz = false
var addElemSymbolEditViz = false
var addElemEllipseViz = false
var addElemRectViz = false
var addElemBGImageViz = false
var addElemTextViz = false
var addElemPathViz = false
var addElemPathEditViz = false
var editElemProcessCw
var addElemCircleCw
var addElemComponentCw
var editElemComponentCw
var editElemIsaCw
var addElemIconCw
var addElemImageCw
var addElemControlCw
var addElemPIDCw
var addElemGaugeCw
var addElemAutoManualCw
var addElemTrendGaugeCw
var addElemBarGaugeCw
var addElemTankLevelCw
var addElemDigitalReadoutCw
var addElemSubstationDigitalCw
var addElemSymbolCw
var addElemVariableFrequencyCw
var addElemProcessVariableChartCw
var addElemPolygonCw
var addElemTextureCw
var addElemGradientCw
var addElemPilotLightCw
var addElemPilotLightCw
var addElemCircuitBreakerCw
var addElemButtonCw
var addElemSymbolEditCw
var addElemEllipseCw
var addElemRectCw
var addElemBGImageCw
var addElemTextCw
var addElemPathCw
var addElemPathEditCw

//---each iframe---

var iframeNameArray =[]

iframeNameArray[0] = 'addElemText'

iframeNameArray[1] = 'addElemPath'
iframeNameArray[2] = 'addElemPathEdit'

iframeNameArray[3] = 'addElemCircle'
iframeNameArray[4] = 'addElemEllipse'
iframeNameArray[5] = 'addElemRect'
iframeNameArray[6] = 'addElemSymbol'
iframeNameArray[7] = 'addElemSymbolEdit'
iframeNameArray[8] = 'addElemPilotLight'
iframeNameArray[9] = 'addElemControl'
iframeNameArray[10] = 'addElemPID'
iframeNameArray[11] = 'addElemGauge'
iframeNameArray[12] = 'addElemTexture'
iframeNameArray[13] = 'addElemIcon'
iframeNameArray[14] = 'addElemGradient'
iframeNameArray[15] = 'addElemPolygon'
iframeNameArray[16] = 'addElemComponent'
iframeNameArray[17] = 'editElemComponent'
iframeNameArray[18] = 'editElemProcess'
iframeNameArray[19] = 'editElemIsa'
iframeNameArray[20] = 'addElemDigitalReadout'
iframeNameArray[21] = 'addElemTrendGauge'
iframeNameArray[22] = 'addElemStatusStick'
iframeNameArray[23] = 'addElemButton'
iframeNameArray[24] = 'addElemCircuitBreaker'
iframeNameArray[25] = 'addElemBarGauge'
iframeNameArray[26] = 'addElemTankLevel'
iframeNameArray[27] = 'addElemSubstationDigital'
iframeNameArray[28] = 'addElemVariableFrequency'
iframeNameArray[29] = 'addElemProcessVariableChart'
iframeNameArray[30] = 'addElemBGImage'
iframeNameArray[31] = 'addElemAutoManual'
iframeNameArray[32] = 'addElemImage'

