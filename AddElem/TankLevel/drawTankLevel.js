
///---X button and iframe close all---
function closeDrawTankLevel()
{
    if(addElemTankLevelViz==true)
    {
        closeIframe("addElemTankLevel");
        coverOff()

        var cw = addElemTankLevelCw

        if(EditTankLevel==true && TankLevelDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawTankLevelEditId)
            elemObjEdit.style.display = "inline"

            elemObjEdit.setAttribute("onmousedown", "editTankLevelDraw("+DrawTankLevelEditId+",evt)")

        }
        DraggingObj = false
        DrawTankLevel = false
        EditTankLevel = false
        TankLevelDeleted = false

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")

        mySVG.removeAttribute('onclick')

        if(document.getElementById("activeElem"))
        {
            // alert(document.getElementById("activeElem").parentNode.getAttribute("id"))
            document.getElementById("activeElem").removeAttribute("class")
            domActiveElemG.removeChild(document.getElementById("activeElem"))


        }
        activeElem = null
        ActiveElem = null

        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)
         cw.containerDiv.style.backgroundColor = "#ABCDEF"
        cw.drawTankLevelFinishButton.disabled = false
        cw.drawTankLevelCancelButton.disabled = false
        cw.drawTankLevelCancelButton.style.borderColor = ""
        cw.drawTankLevelDeleteButton.style.visibility = "hidden"
        cw.drawTankLevelTopButton.style.visibility = "hidden"

            cw.drawTankLevelBotButton.disabled=true
        cw.drawTankLevelEditSpan.innerText = "Draw Tank Levels"




    }
}

//---on add icon DrawX follows cursor
function trackDrawTankLevel()
{


    if(ActiveElem==null&&EditTankLevel==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }
}

var EditTankLevel = false
var DrawTankLevel = false
var TankLevelDeleted = false

function startTankLevelDraw()
{
    var cw = addElemTankLevelCw
    if(EditTankLevel==false)
    {
        ActiveElem = null
        activeElem = null
        DrawTankLevel = true
        DrawX.style("display", "inline")
        mySVG.setAttribute('onclick', "plantTankLevel()") //---click to add more icons for this session---

    }

}

//--click on svg---
function plantTankLevel()
{
    var cw = addElemTankLevelCw
    coverOn()

activeElem=document.createElementNS(NS,"g")
activeElem.setAttribute("id", "activeElem")
domActiveElemG.appendChild(activeElem)

ActiveElem=d3.select("#activeElem")






       var barTankColor=cw.barTankColorSelect.options[cw.barTankColorSelect.selectedIndex].value
       var faceColor=cw.faceColorSelect.options[cw.faceColorSelect.selectedIndex].value

       var title=cw.titleValue.value
var units=cw.unitValue.value
var max=+cw.maxValue.value

var setPoint=+cw.setPointValue.value
 maxAlert=+cw.maxAlertValue.value
 minAlert=+cw.minAlertValue.value
var initialValue=+cw.initValue.value
var scale=+cw.tankLevelScaleSelect.options[cw.tankLevelScaleSelect.selectedIndex].text

buildTankLevel(title,units,max,barTankColor,faceColor,minAlert,maxAlert,setPoint,initialValue,scale)








        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)




        mySVG.removeAttribute('onclick')
        mySVG.style.cursor = ""
        mySVG.setAttribute("onmousedown", "startDragTankLevel(evt)")
        mySVG.setAttribute("onmousemove", "dragTankLevel(evt)")
        mySVG.setAttribute("onmouseup", "endDragTankLevel(evt)")

        cw.drawTankLevelCancelButton.disabled = false
        cw.drawTankLevelFinishButton.disabled = false
            cw.drawTankLevelBotButton.disabled=false

}




function finishDrawTankLevel()
{

    if(EditTankLevel==true )
        finishEditTankLevel()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemTankLevelCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "tankLevel"+new Date().getTime()

            finishedElem.setAttribute("id", id)
            finishedElem.setAttribute("class", "hmiElem")

              CurrentHMIElem=finishedElem.cloneNode(true)
            mySVG.removeAttribute("onmousedown")
            mySVG.removeAttribute("onmousemove")
            mySVG.removeAttribute("onmouseup")

            finishedElem.setAttribute("onmousedown", "editTankLevelDraw("+id+",evt)")



         domElemG.appendChild(finishedElem)




            ActiveElem = null
            activeElem = null

            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "plantTankLevel()") //---click to add more icons for this session---
            DrawX.style("display", "none")
            DragDot.style("visibility", "hidden")
            // topG.appendChild(dragDot)
            cw.drawTankLevelFinishButton.disabled = true
            cw.drawTankLevelCancelButton.disabled = true
                       cw.drawTankLevelBotButton.disabled=true

       if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }




        }
}

function cancelDrawTankLevel()
{
    var cw = addElemTankLevelCw
    if(EditTankLevel==true)
        cancelEditTankLevel()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "plantTankLevel()") //---click to add more icons for this session---

            cw.drawTankLevelFinishButton.disabled = true
            cw.drawTankLevelCancelButton.disabled = true
            cw.drawTankLevelBotButton.disabled=true
            coverOff()

        }

        cw.drawTankLevelCancelButton.style.borderColor = ""

}

//====================edit/update GAUGE===============================

var EditTankLevel = false
var DrawTankLevelEditId
var EditThisTankLevel
//--mousedown/right button on GAUGE---
function editTankLevelDraw(elemObjEdit, evt)
{
    var isRightMB;
    evt = window.event;
    if ("which" in evt) // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = evt.which == 3;
    else if ("button" in evt) // IE, Opera
        isRightMB = evt.button == 2;

    if(isRightMB&&DrawTankLevel==false&&ZoomDrawing==false )
    {

        EditThisTankLevel = elemObjEdit

        DrawTankLevelEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditTankLevel = true
        if(addElemTankLevelLoad==false)
        {
            openIframe("AddElem", "addElemTankLevel", 10)

        }
        else if(addElemTankLevelViz==false)
        {
            openIframe("AddElem", "addElemTankLevel", 10)
            setEditTankLevel()
        }
        else
            setEditTankLevel()

    }
    if(isRightMB&&ZoomDrawing==true ) //---zoom drag
    {
        mySVG.setAttribute("onmousedown", "startDragZoom(evt)")
        mySVG.setAttribute("onmousemove", "dragZoom(evt)")
        mySVG.setAttribute("onmouseup", "endDragZoom(evt)")
        d3.select("#mySVG").on("mousedown.zoom", null)

        var dragTarget=evt.target.parentNode

        var classed=dragTarget.getAttribute("class")
        dragTarget.setAttribute("class", "dragTargetObj")
        dragTarget.removeAttribute("onmousedown")
        dragTarget.setAttribute("style","cursor:move")
       dragTarget.setAttribute("opacity",.4)
        DrawX.style("display", "none")

        ZoomDraggedElems.push([dragTarget,"editTankLevelDraw("+dragTarget.id+",evt)",classed])
    }

}
//---after iframe loaded see sendSize() at addElemTankLevel.htm---
var EditTankLevelObj
function setEditTankLevel()
{
    coverOn()

    var cw = addElemTankLevelCw

    var elemObjEdit = document.getElementById(DrawTankLevelEditId)

    EditTankLevelObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditTankLevelObj.setAttribute("id", "activeElem")
    EditTankLevelObj.setAttribute("class", "dragTargetObj")
    EditTankLevelObj.removeAttribute("onmousedown")

    // EditTankLevelObj.style.cursor = "move"

    domActiveElemG.insertBefore(EditTankLevelObj, domActiveElemG.firstChild)
    ActiveElem = d3.select("#activeElem")
    activeElem = document.getElementById("activeElem")

    cw.drawTankLevelDeleteButton.style.visibility = "visible"
        cw.drawTankLevelTopButton.style.visibility = "visible"
        cw.drawTankLevelBotButton.style.visibility = "visible"
  cw.drawTankLevelEditSpan.innerHTML = "Edit Tank Level"
    cw.containerDiv.style.backgroundColor = "orange"

    cw.drawTankLevelCancelButton.disabled = false
    cw.drawTankLevelFinishButton.disabled = false
            cw.drawTankLevelBotButton.disabled=false


            var matrix = activeElem.transform.baseVal.consolidate().matrix;


                    var transX=matrix.e
                    var transY=matrix.f


            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", "translate("+matrix.e+","+matrix.f+")")


            var title=ActiveElem.attr("title")
            var units=ActiveElem.attr("unit")
            var max=ActiveElem.attr("max")
            var min=ActiveElem.attr("min")
            var initialValue=ActiveElem.attr("initialValue")
            var minAlert=+ActiveElem.attr("minAlert")
            var maxAlert=+ActiveElem.attr("maxAlert")
              var setPoint=ActiveElem.attr("setPoint")
            var scale=ActiveElem.attr("scale")
             var barTankColor=ActiveElem.attr("barTankColor")
            var faceColor=ActiveElem.attr("faceColor")

 cw.titleValue.value=title
cw.unitValue.value=units
cw.maxValue.value=max

cw.setPointValue.value=setPoint

cw.maxAlertValue.value=maxAlert
cw.minAlertValue.value=minAlert
cw.initValue.value=initialValue

            for(var k=0;k<cw.barTankColorSelect.options.length;k++)
            {
                color=cw.barTankColorSelect.options[k].value
                if(color==barTankColor)
                {
                    cw.barTankColorSelect.selectedIndex=k
                   cw.barTankColorBg.style.background=barTankColor
                    break
                }
            }
            for(var k=0;k<cw.faceColorSelect.options.length;k++)
            {
                color=cw.faceColorSelect.options[k].value
                if(color==faceColor)
                {
                    cw.faceColorSelect.selectedIndex=k
                   cw.faceColorBg.style.background=faceColor
                    break
                }
            }

           for(var k=0;k<cw.tankLevelScaleSelect.options.length;k++)
            {
                var barScale=cw.tankLevelScaleSelect.options[k].text
                if(scale==barScale)
                {
                    cw.tankLevelScaleSelect.selectedIndex=k
                    break
                }
            }




            //--place dragDot----
            setTankLevelEditDrag()

            mySVG.style.cursor = ""

}

function setTankLevelEditDrag()
{


    activeElem.removeAttribute("onmousedown")

    mySVG.setAttribute("onmousedown", "startDragTankLevel(evt)")
    mySVG.setAttribute("onmousemove", "dragTankLevel(evt)")
    mySVG.setAttribute("onmouseup", "endDragTankLevel(evt)")
    ActiveElem.style("cursor", "move")

}
function changeTankLevel()
{
  if(ActiveElem)
  {
    var cw = addElemTankLevelCw
    var matrix = activeElem.transform.baseVal.consolidate().matrix;
    var transX=matrix.e
    var transY=matrix.f
    domActiveElemG.removeChild(activeElem)

    activeElem=document.createElementNS(NS,"g")
    activeElem.setAttribute("id", "activeElem")
    domActiveElemG.appendChild(activeElem)
    ActiveElem=d3.select("#activeElem")
       var barTankColor=cw.barTankColorSelect.options[cw.barTankColorSelect.selectedIndex].value
       var faceColor=cw.faceColorSelect.options[cw.faceColorSelect.selectedIndex].value

       var title=cw.titleValue.value
var units=cw.unitValue.value
var max=+cw.maxValue.value

var setPoint=+cw.setPointValue.value
var maxAlert=cw.maxAlertValue.value
var minAlert=cw.minAlertValue.value
if(cw.maxAlertValue.value!="")
 maxAlert=+cw.maxAlertValue.value
if(cw.minAlertValue.value!="")
 minAlert=+cw.minAlertValue.value
var initialValue=+cw.initValue.value
var scale=+cw.tankLevelScaleSelect.options[cw.tankLevelScaleSelect.selectedIndex].text

buildTankLevel(title,units,max,barTankColor,faceColor,minAlert,maxAlert,setPoint,initialValue,scale)


        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)



        activeElem.setAttribute("transform", "translate("+(transX)+" "+(transY)+")scale("+scale+")")

        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)

 }

}
function finishEditTankLevel()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemTankLevelCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "hmiElem")

        finishedElem.setAttribute("id", DrawTankLevelEditId)
                   CurrentHMIElem=finishedElem.cloneNode(true)

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("onmousedown", "editTankLevelDraw("+DrawTankLevelEditId+",evt)")
        finishedElem.setAttribute("id", DrawTankLevelEditId)
        domElemG.insertBefore(finishedElem, EditThisTankLevel)
        domElemG.removeChild(EditThisTankLevel)

       if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }

    }

    closeDrawTankLevel()
}


function cancelEditTankLevel()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawTankLevelEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(EditTankLevelObj)
    activeElem = null
    ActiveElem = null

    closeDrawTankLevel()


}

//=======================delete circle==================
var TankLevelDeleted = false
//---button---
function removeCurrentDrawTankLevel()
{

    domActiveElemG.removeChild(activeElem)
     var elemObjEdit = document.getElementById(DrawTankLevelEditId)
     domElemG.removeChild(elemObjEdit)
    TankLevelDeleted = true



    closeDrawTankLevel()

}
//====================Top/Bot===================
function topDrawTankLevel()
{

    var elemObjEdit = document.getElementById(DrawTankLevelEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawTankLevelEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null

    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)

    closeDrawTankLevel()
}
function botDrawTankLevel()
{
    if(EditTankLevel)
    {
    var elemObjEdit = document.getElementById(DrawTankLevelEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawTankLevelEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null

    domElemG.removeChild(elemObjEdit)
    domElemG.insertBefore(finishedElem,domElemG.firstChild)

   closeDrawTankLevel()
   }
   else
   {
        finishDrawTankLevel()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }
}

function faceColorSelected()
{
    var cw = addElemTankLevelCw
    var faceColor=cw.faceColorSelect.options[cw.faceColorSelect.selectedIndex].value
    cw.faceColorBg.style.background=faceColor
    changeTankLevel()
}
function barTankColorSelected()
{

     var cw = addElemTankLevelCw
    var barTankColor=cw.barTankColorSelect.options[cw.barTankColorSelect.selectedIndex].value
    cw.barTankColorBg.style.background=barTankColor
    changeTankLevel()


}


