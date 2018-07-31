///---X button and iframe close all---
function closeDrawAutoManual()
{
    if(addElemAutoManualViz==true)
    {
        closeIframe("addElemAutoManual");
        coverOff()
        
        var cw = addElemAutoManualCw

        if(EditAutoManual==true && AutoManualDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawAutoManualEditId)
            elemObjEdit.style.display = "inline"

            elemObjEdit.setAttribute("onmousedown", "editAutoManualDraw("+DrawAutoManualEditId+",evt)")

        }
        DraggingObj = false
        DrawAutoManual = false
        EditAutoManual = false
        AutoManualDeleted = false

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

        cw.drawAutoManualFinishButton.disabled = true
        cw.drawAutoManualCancelButton.disabled = true
        cw.drawAutoManualCancelButton.style.borderColor = ""
        cw.drawAutoManualDeleteButton.style.visibility = "hidden"
        cw.drawAutoManualTopButton.style.visibility = "hidden"

            cw.drawAutoManualBotButton.disabled=true
        cw.drawAutoManualEditSpan.innerText = "Draw Auto/Manual Overrides"
        cw.containerDiv.style.backgroundColor = "#ABCDEF"
       //----copies---

    }
}

//---on add icon DrawX follows cursor
function trackDrawAutoManual()
{
    var cw = addElemAutoManualCw

    if(ActiveElem==null&&EditAutoManual==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }
}

var EditAutoManual = false
var DrawAutoManual = false
var AutoManualDeleted = false

function startAutoManualDraw()
{
    var cw = addElemAutoManualCw
    if(EditAutoManual==false)
    {
        ActiveElem = null
        activeElem = null
        DrawAutoManual = true
        DrawX.style("display", "inline")
        mySVG.setAttribute('onclick', "plantAutoManual()") //---click to add more icons for this session---


    	var clrFill=cw.drawAutoManualFillSelect.options[cw.drawAutoManualFillSelect.selectedIndex].value
	cw.drawAutoManualFillBg.style.backgroundColor=clrFill


    }

}
function drawAutoManualScaleSelected()
{
    if(ActiveElem)
    {
        var cw = addElemAutoManualCw
         var scale=+cw.drawAutoManualScaleSelect.options[cw.drawAutoManualScaleSelect.selectedIndex].text
        var matrix = activeElem.transform.baseVal.consolidate().matrix;
        matrix.a=scale
        matrix.d=scale
        activeElem.transform.baseVal.consolidate().matrix;
    }

}
//--click on svg---
function plantAutoManual()
{
    var cw = addElemAutoManualCw
    coverOn()
     var scale=cw.drawAutoManualScaleSelect.options[cw.drawAutoManualScaleSelect.selectedIndex].text
    activeElem=AutoManualG.cloneNode(true)

     activeElem.setAttribute("id", "activeElem")
    ActiveElem = d3.select("#activeElem")
        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")scale("+scale+")")

        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)
         domActiveElemG.appendChild(activeElem)

        var fill = cw.drawAutoManualFillSelect.options[cw.drawAutoManualFillSelect.selectedIndex].value
        var ring = cw.drawAutoManualRingSelect.options[cw.drawAutoManualRingSelect.selectedIndex].value
      activeElem.getElementsByTagName("div")[0].style.background=fill
   activeElem.getElementsByTagName("div")[0].style.borderColor=ring



        mySVG.removeAttribute('onclick')
        mySVG.style.cursor = ""
        mySVG.setAttribute("onmousedown", "startDragAutoManual(evt)")
        mySVG.setAttribute("onmousemove", "dragAutoManual(evt)")
        mySVG.setAttribute("onmouseup", "endDragAutoManual(evt)")

        cw.drawAutoManualCancelButton.disabled = false
        cw.drawAutoManualFinishButton.disabled = false
            cw.drawAutoManualBotButton.disabled=false

}

function drawAutoManualScaleSelected()
{
    if(ActiveElem)
    {
        var cw = addElemAutoManualCw
         var scale=+cw.drawAutoManualScaleSelect.options[cw.drawAutoManualScaleSelect.selectedIndex].text
        var matrix = activeElem.transform.baseVal.consolidate().matrix;
        matrix.a=scale
        matrix.d=scale
        activeElem.transform.baseVal.consolidate().matrix;
    }

}

function finishDrawAutoManual()
{

    if(EditAutoManual==true )
        finishEditAutoManual()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemAutoManualCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "autoManual"+new Date().getTime()

            finishedElem.setAttribute("id", id)
            finishedElem.setAttribute("class", "hmiElem")
                        CurrentHMIElem=finishedElem.cloneNode(true)


            mySVG.removeAttribute("onmousedown")
            mySVG.removeAttribute("onmousemove")
            mySVG.removeAttribute("onmouseup")

            finishedElem.setAttribute("onmousedown", "editAutoManualDraw("+id+",evt)")
            domElemG.appendChild(finishedElem)




            ActiveElem = null
            activeElem = null

            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "plantAutoManual()") //---click to add more icons for this session---
            DrawX.style("display", "none")
            DragDot.style("visibility", "hidden")
            // topG.appendChild(dragDot)
            cw.drawAutoManualFinishButton.disabled = true
            cw.drawAutoManualCancelButton.disabled = true
            cw.drawAutoManualBotButton.disabled=true
       if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }


        }
}

function cancelDrawAutoManual()
{
    var cw = addElemAutoManualCw
    if(EditAutoManual==true)
        cancelEditAutoManual()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "plantAutoManual()") //---click to add more icons for this session---

            cw.drawAutoManualFinishButton.disabled = true
            cw.drawAutoManualCancelButton.disabled = true
            cw.drawAutoManualBotButton.disabled=true
            coverOff()

        }

        cw.drawAutoManualCancelButton.style.borderColor = ""

}

//====================edit/update circle===============================

var EditAutoManual = false
var DrawAutoManualEditId
var EditThisAutoManual
//--mousedown/right button on circle---
function editAutoManualDraw(elemObjEdit, evt)
{

    var isRightMB;
    evt = window.event;
    if ("which" in evt) // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = evt.which == 3;
    else if ("button" in evt) // IE, Opera
        isRightMB = evt.button == 2;

    if(isRightMB&&DrawAutoManual==false&&ZoomDrawing==false)
    {

        EditThisAutoManual = elemObjEdit

        DrawAutoManualEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditAutoManual = true
        if(addElemAutoManualLoad==false)
        {
            openIframe("AddElem", "addElemAutoManual", 10)

        }
        else if(addElemAutoManualViz==false)
        {
            openIframe("AddElem", "addElemAutoManual", 10)
            setEditAutoManual()
        }
        else
            setEditAutoManual()

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

        ZoomDraggedElems.push([dragTarget,"editAutoManualDraw("+dragTarget.id+",evt)",classed])
    }

}
//---after iframe loaded see sendSize() at addElemAutoManual.htm---
var EditAutoManualObj
function setEditAutoManual()
{
    coverOn()

    var cw = addElemAutoManualCw

    var elemObjEdit = document.getElementById(DrawAutoManualEditId)

    EditAutoManualObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditAutoManualObj.setAttribute("id", "activeElem")
    EditAutoManualObj.setAttribute("class", "dragTargetObj")
    EditAutoManualObj.removeAttribute("onmousedown")

    // EditAutoManualObj.style.cursor = "move"

    domActiveElemG.insertBefore(EditAutoManualObj, domActiveElemG.firstChild)
    ActiveElem = d3.select("#activeElem")
    activeElem = document.getElementById("activeElem")

    cw.drawAutoManualDeleteButton.style.visibility = "visible"
        cw.drawAutoManualTopButton.style.visibility = "visible"
        cw.drawAutoManualBotButton.style.visibility = "visible"
    cw.drawAutoManualEditSpan.innerHTML = "Edit Auto/Manual Override"
    cw.containerDiv.style.backgroundColor = "orange"

    //domActiveElemG.setAttribute("transform", activeElem.getAttribute("transform"))
    //activeElem.removeAttribute("transform")
    cw.drawAutoManualCancelButton.disabled = false
    cw.drawAutoManualFinishButton.disabled = false
            cw.drawAutoManualBotButton.disabled=false

           var matrix = activeElem.getCTM()
             var scale=matrix.a.toFixed(1)
         if(scale==1)cw.drawAutoManualScaleSelect.selectedIndex=0
         if(scale==.9)cw.drawAutoManualScaleSelect.selectedIndex=1
         if(scale==.8)cw.drawAutoManualScaleSelect.selectedIndex=2
         if(scale==.7)cw.drawAutoManualScaleSelect.selectedIndex=3
         if(scale==.6)cw.drawAutoManualScaleSelect.selectedIndex=4
         if(scale==.5)cw.drawAutoManualScaleSelect.selectedIndex=5
         if(scale==.4)cw.drawAutoManualScaleSelect.selectedIndex=6
         if(scale==.3)cw.drawAutoManualScaleSelect.selectedIndex=7
         if(scale==.2)cw.drawAutoManualScaleSelect.selectedIndex=8
         if(scale==.1)cw.drawAutoManualScaleSelect.selectedIndex=9


   fill = EditAutoManualObj.getElementsByTagName("div")[0].style.background
   ring = EditAutoManualObj.getElementsByTagName("div")[0].style.borderColor


   setSelect("AutoManual", "Fill", fill)
   setSelect("AutoManual", "Ring", ring)



    //---update bg colors---

    cw.drawAutoManualFillBg.style.backgroundColor = fill
    cw.drawAutoManualRingBg.style.backgroundColor = ring




            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", "translate("+matrix.e+","+matrix.f+")")





            //--place dragDot----
            setAutoManualEditDrag()

            mySVG.style.cursor = ""
            
}

function setAutoManualEditDrag()
{


    activeElem.removeAttribute("onmousedown")

    mySVG.setAttribute("onmousedown", "startDragAutoManual(evt)")
    mySVG.setAttribute("onmousemove", "dragAutoManual(evt)")
    mySVG.setAttribute("onmouseup", "endDragAutoManual(evt)")
    ActiveElem.style("cursor", "move")

}

function finishEditAutoManual()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemAutoManualCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "hmiElem")

        finishedElem.setAttribute("id", DrawAutoManualEditId)
            CurrentHMIElem=finishedElem.cloneNode(true)

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("onmousedown", "editAutoManualDraw("+DrawAutoManualEditId+",evt)")
        finishedElem.setAttribute("id", DrawAutoManualEditId)
        domElemG.insertBefore(finishedElem, EditThisAutoManual)
        domElemG.removeChild(EditThisAutoManual)

       if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }

    }

    closeDrawAutoManual()
}

function resetEditAutoManual()
{

    var cw = addElemAutoManualCw

    document.getElementById(DrawAutoManualEditId).setAttribute("opacity", 1)

    EditAutoManual = false
    cw.drawAutoManualEditSpan.innerText = "Draw Pilot Lights"
    cw.drawAutoManualTopTable.style.backgroundColor = "#ABCDEF"
    ActiveElem = null
    activeElem = null

    DrawX.style("display", "none")
    DrawX.attr("stroke", "violet")
    DragDot.style("visibility", "hidden")

    cw.drawAutoManualDeleteButton.style.visibility = "hidden"
        cw.drawAutoManualTopButton.style.visibility = "hidden"
        cw.drawAutoManualBotButton.style.visibility = "hidden"
    cw.drawAutoManualCancelButton.disabled = false
    cw.drawAutoManualFinishButton.disabled = false
    DrawAutoManual = true
    mySVG.setAttribute('onclick', "plantAutoManual()")

}

function cancelEditAutoManual()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawAutoManualEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null
    ActiveElem = null

    closeDrawAutoManual()


}

//=======================delete circle==================
var AutoManualDeleted = false
//---button---
function removeCurrentDrawAutoManual()
{

    domActiveElemG.removeChild(activeElem)
     var elemObjEdit = document.getElementById(DrawAutoManualEditId)
     domElemG.removeChild(elemObjEdit)
    AutoManualDeleted = true

    var cw = addElemAutoManualCw

    closeDrawAutoManual()

}
//====================Top/Bot===================
function topDrawAutoManual()
{

    var elemObjEdit = document.getElementById(DrawAutoManualEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawAutoManualEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null
    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)

    closeDrawAutoManual()
}
function botDrawAutoManual()
{
    if(EditAutoManual)
    {
    var elemObjEdit = document.getElementById(DrawAutoManualEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawAutoManualEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null
    domElemG.removeChild(elemObjEdit)
    domElemG.insertBefore(finishedElem,domElemG.firstChild)

   closeDrawAutoManual()
   }
   else
   {
        finishDrawAutoManual()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }
}



function showDrawAutoManualFillBg()
{
    var cw = addElemAutoManualCw
    var fill = cw.drawAutoManualFillSelect.options[cw.drawAutoManualFillSelect.selectedIndex].value
      cw.drawAutoManualFillBg.style.background=fill
     if(activeElem)
    {
    var div= activeElem.getElementsByTagName("div")[0]
   
    div.style.background=fill
    }
}

function drawAutoManualFillSelected()
{
    var cw = addElemAutoManualCw
    var fill = cw.drawAutoManualFillSelect.options[cw.drawAutoManualFillSelect.selectedIndex].value


    if(activeElem)
    {
    var div= activeElem.getElementsByTagName("div")[0]

    div.style.background=fill
    }
}

function showDrawAutoManualRingBg()
{
    var cw = addElemAutoManualCw
    var ring = cw.drawAutoManualRingSelect.options[cw.drawAutoManualRingSelect.selectedIndex].value
   cw.drawAutoManualRingBg.style.background=ring
    if(activeElem)
    {
       var div= activeElem.getElementsByTagName("div")[0]
    div.style.borderColor=ring
    }
}

function drawAutoManualRingSelected()
{
    var cw = addElemAutoManualCw
    var ring = cw.drawAutoManualRingSelect.options[cw.drawAutoManualRingSelect.selectedIndex].value
       if(activeElem)
    {
       var div= activeElem.getElementsByTagName("div")[0]
    div.style.borderColor=ring
    }

}

