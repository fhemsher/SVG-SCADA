
///---X button and iframe close all---
function closeDrawVariableFrequency()
{
    if(addElemVariableFrequencyViz==true)
    {
        closeIframe("addElemVariableFrequency");
        coverOff()

        var cw = addElemVariableFrequencyCw

        if(EditVariableFrequency==true && VariableFrequencyDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawVariableFrequencyEditId)
            elemObjEdit.style.display = "inline"

            elemObjEdit.setAttribute("onmousedown", "editVariableFrequencyDraw("+DrawVariableFrequencyEditId+",evt)")

        }
        DraggingObj = false
        DrawVariableFrequency = false
        EditVariableFrequency = false
        VariableFrequencyDeleted = false

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
        cw.drawVariableFrequencyFinishButton.disabled = false
        cw.drawVariableFrequencyCancelButton.disabled = false
        cw.drawVariableFrequencyCancelButton.style.borderColor = ""
        cw.drawVariableFrequencyDeleteButton.style.visibility = "hidden"
        cw.drawVariableFrequencyTopButton.style.visibility = "hidden"

            cw.drawVariableFrequencyBotButton.disabled=true
        cw.drawVariableFrequencyEditSpan.innerText = "Draw Variable Frequencies"




    }
}

//---on add icon DrawX follows cursor
function trackDrawVariableFrequency()
{


    if(ActiveElem==null&&EditVariableFrequency==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }
}

var EditVariableFrequency = false
var DrawVariableFrequency = false
var VariableFrequencyDeleted = false

function startVariableFrequencyDraw()
{
    var cw = addElemVariableFrequencyCw
    if(EditVariableFrequency==false)
    {
        ActiveElem = null
        activeElem = null
        DrawVariableFrequency = true
        DrawX.style("display", "inline")
        mySVG.setAttribute('onclick', "plantVariableFrequency()") //---click to add more icons for this session---

    }

}

//--click on svg---
function plantVariableFrequency()
{
    var cw = addElemVariableFrequencyCw
    coverOn()

activeElem=document.createElementNS(NS,"g")
activeElem.setAttribute("id", "activeElem")
domActiveElemG.appendChild(activeElem)

ActiveElem=d3.select("#activeElem")
.attr("text-rendering","geometricPrecision")
.attr("shape-rendering","geometricPrecision")





       var faceColor=cw.faceColorVariableFrequencySelect.options[cw.faceColorVariableFrequencySelect.selectedIndex].value

       var title=cw.titleValue.value

var scale=+cw.variableFrequencyScaleSelect.options[cw.variableFrequencyScaleSelect.selectedIndex].text

buildVariableFrequency(title,faceColor,scale)








        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)




        mySVG.removeAttribute('onclick')
        mySVG.style.cursor = ""
        mySVG.setAttribute("onmousedown", "startDragVariableFrequency(evt)")
        mySVG.setAttribute("onmousemove", "dragVariableFrequency(evt)")
        mySVG.setAttribute("onmouseup", "endDragVariableFrequency(evt)")

        cw.drawVariableFrequencyCancelButton.disabled = false
        cw.drawVariableFrequencyFinishButton.disabled = false
            cw.drawVariableFrequencyBotButton.disabled=false

}




function finishDrawVariableFrequency()
{

    if(EditVariableFrequency==true )
        finishEditVariableFrequency()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemVariableFrequencyCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "variableFrequency"+new Date().getTime()

            finishedElem.setAttribute("id", id)
                finishedElem.setAttribute("class", "hmiElem")

                        CurrentHMIElem=finishedElem.cloneNode(true)


            mySVG.removeAttribute("onmousedown")
            mySVG.removeAttribute("onmousemove")
            mySVG.removeAttribute("onmouseup")

            finishedElem.setAttribute("onmousedown", "editVariableFrequencyDraw("+id+",evt)")



         domElemG.appendChild(finishedElem)




            ActiveElem = null
            activeElem = null

            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "plantVariableFrequency()") //---click to add more icons for this session---
            DrawX.style("display", "none")
            DragDot.style("visibility", "hidden")
            // topG.appendChild(dragDot)
            cw.drawVariableFrequencyFinishButton.disabled = true
           cw.drawVariableFrequencyCancelButton.disabled = true
            cw.drawVariableFrequencyBotButton.disabled=true
       if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }




        }
}

function cancelDrawVariableFrequency()
{
    var cw = addElemVariableFrequencyCw
    if(EditVariableFrequency==true)
        cancelEditVariableFrequency()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "plantVariableFrequency()") //---click to add more icons for this session---

            cw.drawVariableFrequencyFinishButton.disabled = true
            cw.drawVariableFrequencyCancelButton.disabled = true
            cw.drawVariableFrequencyBotButton.disabled=true
            coverOff()

        }

        cw.drawVariableFrequencyCancelButton.style.borderColor = ""

}

//====================edit/update GAUGE===============================

var EditVariableFrequency = false
var DrawVariableFrequencyEditId
var EditThisVariableFrequency
//--mousedown/right button on GAUGE---
function editVariableFrequencyDraw(elemObjEdit, evt)
{

    var isRightMB;
    evt = window.event;
    if ("which" in evt) // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = evt.which == 3;
    else if ("button" in evt) // IE, Opera
        isRightMB = evt.button == 2;

    if(isRightMB&&DrawVariableFrequency==false&&ZoomDrawing==false)
    {

        EditThisVariableFrequency = elemObjEdit

        DrawVariableFrequencyEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditVariableFrequency = true
        if(addElemVariableFrequencyLoad==false)
        {
            openIframe("AddElem", "addElemVariableFrequency", 10)

        }
        else if(addElemVariableFrequencyViz==false)
        {
            openIframe("AddElem", "addElemVariableFrequency", 10)
            setEditVariableFrequency()
        }
        else
            setEditVariableFrequency()

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
        ZoomDraggedElems.push([dragTarget,"editVariableFrequencyDraw("+dragTarget.id+",evt)",classed])
    }
}
//---after iframe loaded see sendSize() at addElemVariableFrequency.htm---
var EditVariableFrequencyObj
function setEditVariableFrequency()
{
    coverOn()

    var cw = addElemVariableFrequencyCw

    var elemObjEdit = document.getElementById(DrawVariableFrequencyEditId)

    EditVariableFrequencyObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditVariableFrequencyObj.setAttribute("id", "activeElem")
    EditVariableFrequencyObj.setAttribute("class", "dragTargetObj")
    EditVariableFrequencyObj.removeAttribute("onmousedown")

    // EditVariableFrequencyObj.style.cursor = "move"

    domActiveElemG.insertBefore(EditVariableFrequencyObj, domActiveElemG.firstChild)
    ActiveElem = d3.select("#activeElem")
    activeElem = document.getElementById("activeElem")

    cw.drawVariableFrequencyDeleteButton.style.visibility = "visible"
        cw.drawVariableFrequencyTopButton.style.visibility = "visible"
        cw.drawVariableFrequencyBotButton.style.visibility = "visible"
  cw.drawVariableFrequencyEditSpan.innerHTML = "Edit Variable Frequency"
    cw.containerDiv.style.backgroundColor = "orange"

    cw.drawVariableFrequencyCancelButton.disabled = false
    cw.drawVariableFrequencyFinishButton.disabled = false
            cw.drawVariableFrequencyBotButton.disabled=false


            var matrix = activeElem.transform.baseVal.consolidate().matrix;


                    var transX=matrix.e
                    var transY=matrix.f


            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", "translate("+matrix.e+","+matrix.f+")")


            var title=ActiveElem.attr("title")

            var scale=ActiveElem.attr("scale")

            var faceColor=ActiveElem.attr("faceColor")

 cw.titleValue.value=title



            for(var k=0;k<cw.faceColorVariableFrequencySelect.options.length;k++)
            {
                color=cw.faceColorVariableFrequencySelect.options[k].value
                if(color==faceColor)
                {
                    cw.faceColorVariableFrequencySelect.selectedIndex=k
                   cw.faceColorBg.style.background=faceColor
                    break
                }
            }

           for(var k=0;k<cw.variableFrequencyScaleSelect.options.length;k++)
            {
                var barScale=cw.variableFrequencyScaleSelect.options[k].text
                if(scale==barScale)
                {
                    cw.variableFrequencyScaleSelect.selectedIndex=k
                    break
                }
            }




            //--place dragDot----
            setVariableFrequencyEditDrag()

            mySVG.style.cursor = ""

}

function setVariableFrequencyEditDrag()
{


    activeElem.removeAttribute("onmousedown")

    mySVG.setAttribute("onmousedown", "startDragVariableFrequency(evt)")
    mySVG.setAttribute("onmousemove", "dragVariableFrequency(evt)")
    mySVG.setAttribute("onmouseup", "endDragVariableFrequency(evt)")
    ActiveElem.style("cursor", "move")

}
function changeVariableFrequency()
{
  if(ActiveElem)
  {
    var cw = addElemVariableFrequencyCw
    var matrix = activeElem.transform.baseVal.consolidate().matrix;
    var transX=matrix.e
    var transY=matrix.f
    domActiveElemG.removeChild(activeElem)

    activeElem=document.createElementNS(NS,"g")
    activeElem.setAttribute("id", "activeElem")
    domActiveElemG.appendChild(activeElem)
    ActiveElem=d3.select("#activeElem")
       var faceColor=cw.faceColorVariableFrequencySelect.options[cw.faceColorVariableFrequencySelect.selectedIndex].value

       var title=cw.titleValue.value

var scale=+cw.variableFrequencyScaleSelect.options[cw.variableFrequencyScaleSelect.selectedIndex].text

buildVariableFrequency(title,faceColor,scale)


        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)



        activeElem.setAttribute("transform", "translate("+(transX)+" "+(transY)+")scale("+scale+")")

        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)

 }

}
function finishEditVariableFrequency()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemVariableFrequencyCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "hmiElem")

        finishedElem.setAttribute("id", DrawVariableFrequencyEditId)
                   CurrentHMIElem=finishedElem.cloneNode(true)

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("onmousedown", "editVariableFrequencyDraw("+DrawVariableFrequencyEditId+",evt)")
        finishedElem.setAttribute("id", DrawVariableFrequencyEditId)
        domElemG.insertBefore(finishedElem, EditThisVariableFrequency)
        domElemG.removeChild(EditThisVariableFrequency)
       if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }


    }

    closeDrawVariableFrequency()
}


function cancelEditVariableFrequency()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawVariableFrequencyEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(EditVariableFrequencyObj)
    activeElem = null
    ActiveElem = null

    closeDrawVariableFrequency()


}

//=======================delete circle==================
var VariableFrequencyDeleted = false
//---button---
function removeCurrentDrawVariableFrequency()
{

    domActiveElemG.removeChild(activeElem)
     var elemObjEdit = document.getElementById(DrawVariableFrequencyEditId)
     domElemG.removeChild(elemObjEdit)
    VariableFrequencyDeleted = true



    closeDrawVariableFrequency()

}
//====================Top/Bot===================
function topDrawVariableFrequency()
{

    var elemObjEdit = document.getElementById(DrawVariableFrequencyEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawVariableFrequencyEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null

    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)

    closeDrawVariableFrequency()
}
function botDrawVariableFrequency()
{
    if(EditVariableFrequency)
    {
    var elemObjEdit = document.getElementById(DrawVariableFrequencyEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawVariableFrequencyEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null
    domElemG.removeChild(elemObjEdit)
    domElemG.insertBefore(finishedElem,domElemG.firstChild)

   closeDrawVariableFrequency()
   }
   else
   {
        finishDrawVariableFrequency()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }
}

function faceColorVariableFrequencySelected()
{
    var cw = addElemVariableFrequencyCw
    var faceColor=cw.faceColorVariableFrequencySelect.options[cw.faceColorVariableFrequencySelect.selectedIndex].value
    cw.faceColorBg.style.background=faceColor
    changeVariableFrequency()
}



