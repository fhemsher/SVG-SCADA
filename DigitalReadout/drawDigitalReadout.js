








///---X button and iframe close all---
function closeDrawDigitalReadout()
{
    if(addElemDigitalReadoutViz==true)
    {
        closeIframe("addElemDigitalReadout");
        coverOff()
        
        var cw = addElemDigitalReadoutCw

        if(EditDigitalReadout==true && DigitalReadoutDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawDigitalReadoutEditId)
            elemObjEdit.style.display = "inline"

            elemObjEdit.setAttribute("onmousedown", "editDigitalReadoutDraw("+DrawDigitalReadoutEditId+",evt)")

        }
        DraggingObj = false
        DrawDigitalReadout = false
        EditDigitalReadout = false
        DigitalReadoutDeleted = false

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

        cw.drawDigitalReadoutFinishButton.disabled = false
        cw.drawDigitalReadoutCancelButton.disabled = false
        cw.drawDigitalReadoutCancelButton.style.borderColor = ""
        cw.drawDigitalReadoutDeleteButton.style.visibility = "hidden"
        cw.drawDigitalReadoutTopButton.style.visibility = "hidden"

            cw.drawDigitalReadoutBotButton.disabled=true
        cw.drawDigitalReadoutEditSpan.innerText = "Draw Digital Readouts"
        cw.containerDiv.style.backgroundColor = "#ABCDEF"

       //cw.editDigitalReadoutPreviewButton.style.visibility = "hidden"

    }
}

//---on add icon DrawX follows cursor
function trackDrawDigitalReadout()
{
    var cw = addElemDigitalReadoutCw

    if(ActiveElem==null&&EditDigitalReadout==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }
}

var EditDigitalReadout = false
var DrawDigitalReadout = false
var DigitalReadoutDeleted = false

function startDigitalReadoutDraw()
{
    var cw = addElemDigitalReadoutCw
    if(EditDigitalReadout==false)
    {
        ActiveElem = null
        activeElem = null
        DrawDigitalReadout = true
        DrawX.style("display", "inline")
        mySVG.setAttribute('onclick', "plantDigitalReadout()") //---click to add more icons for this session---

    }

}

//--click on svg---
function plantDigitalReadout()
{
    var cw = addElemDigitalReadoutCw
       var scale=cw.digitalReadoutScaleSelect.options[cw.digitalReadoutScaleSelect.selectedIndex].text
       var title=cw.digitalReadoutTitleValue.value
       var units=cw.digitalReadoutUnitValue.value
       var max=cw.digitalReadoutMaxValue.value
       var faceColor=cw.digitalReadoutFaceColorSelect.options[cw.digitalReadoutFaceColorSelect.selectedIndex].value
       var numBorderColor=cw.digitalReadoutBorderColorSelect.options[cw.digitalReadoutBorderColorSelect.selectedIndex].value
       var numColor=cw.digitalReadoutNumberColorSelect.options[cw.digitalReadoutNumberColorSelect.selectedIndex].value
       var numBgColor=cw.digitalReadoutNumberBgColorSelect.options[cw.digitalReadoutNumberBgColorSelect.selectedIndex].value


    coverOn()



     activeElem=document.getElementById("digitalReadoutG").cloneNode(true)  //---<g> element---
    activeElem.id="activeElem"
   domActiveElemG.appendChild(activeElem)



    var foreignObject=activeElem.childNodes.item(0)

    var containerFO=foreignObject.childNodes.item(0)
    var titleDiv=containerFO.childNodes.item(0)
    var input=containerFO.childNodes.item(1)

   var unitsDiv=containerFO.childNodes.item(2)


    containerFO.style.background=faceColor
    titleDiv.innerHTML=title
    unitsDiv.innerHTML=units

    input.innerHTML=max

    input.style.color=numColor
    input.style.borderColor=numBorderColor
    input.style.background=numBgColor

     activeElem.setAttribute("transform", "translate("+(SVGx)+" "+(SVGy)+")scale("+scale+")")




    ActiveElem = d3.select("#activeElem")
      ActiveElem.attr("title",title)
      ActiveElem.attr("scale",scale)

      ActiveElem.attr("units",units)

      ActiveElem.attr("max",max)
      ActiveElem.attr("faceColor",faceColor)
      ActiveElem.attr("numBorderColor",numBorderColor)
      ActiveElem.attr("numColor",numColor)
      ActiveElem.attr("numBgColor",numBgColor)


        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)




        mySVG.removeAttribute('onclick')
        mySVG.style.cursor = ""
        mySVG.setAttribute("onmousedown", "startDragDigitalReadout(evt)")
        mySVG.setAttribute("onmousemove", "dragDigitalReadout(evt)")
        mySVG.setAttribute("onmouseup", "endDragDigitalReadout(evt)")




        cw.drawDigitalReadoutCancelButton.disabled = false
        cw.drawDigitalReadoutFinishButton.disabled = false
            cw.drawDigitalReadoutBotButton.disabled=false

}

//----on change----
function changeDigitalReadout()
{
    if(ActiveElem)
    {
      var cw = addElemDigitalReadoutCw
       var scale=cw.digitalReadoutScaleSelect.options[cw.digitalReadoutScaleSelect.selectedIndex].text
       var title=cw.digitalReadoutTitleValue.value
       var units=cw.digitalReadoutUnitValue.value
       var max=cw.digitalReadoutMaxValue.value
       var faceColor=cw.digitalReadoutFaceColorSelect.options[cw.digitalReadoutFaceColorSelect.selectedIndex].value
       var numBorderColor=cw.digitalReadoutBorderColorSelect.options[cw.digitalReadoutBorderColorSelect.selectedIndex].value
       var numColor=cw.digitalReadoutNumberColorSelect.options[cw.digitalReadoutNumberColorSelect.selectedIndex].value
       var numBgColor=cw.digitalReadoutNumberBgColorSelect.options[cw.digitalReadoutNumberBgColorSelect.selectedIndex].value

  var foreignObject=activeElem.childNodes.item(0)
    var containerFO=foreignObject.childNodes.item(0)

    var titleDiv=containerFO.childNodes.item(0)
    var input=containerFO.childNodes.item(1)

    var unitsDiv=containerFO.childNodes.item(2)

    containerFO.style.background=faceColor
    titleDiv.innerHTML=title
    unitsDiv.innerHTML=units

    input.value=max

    input.style.color=numColor
    input.style.borderColor=numBorderColor
    input.style.background=numBgColor

   var mtx=  decomposeMatrix(activeElem.getCTM())
  activeElem.setAttribute("transform", "translate("+(mtx.translateX)+" "+(mtx.translateY)+")scale("+scale+")")

      ActiveElem.attr("title",title)
      ActiveElem.attr("scale",scale)

      ActiveElem.attr("units",units)

      ActiveElem.attr("max",max)
      ActiveElem.attr("faceColor",faceColor)
      ActiveElem.attr("numBorderColor",numBorderColor)
      ActiveElem.attr("numColor",numColor)
      ActiveElem.attr("numBgColor",numBgColor)
   }

}


function finishDrawDigitalReadout()
{

    if(EditDigitalReadout==true )
        finishEditDigitalReadout()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemDigitalReadoutCw
            cw.drawDigitalReadoutFinishButton.disabled=true
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "digitalReadout"+new Date().getTime()

            finishedElem.setAttribute("id", id)

            finishedElem.setAttribute("class", "hmiElem")
               CurrentHMIElem=finishedElem.cloneNode(true)
            mySVG.removeAttribute("onmousedown")
            mySVG.removeAttribute("onmousemove")
            mySVG.removeAttribute("onmouseup")

            finishedElem.setAttribute("onmousedown", "editDigitalReadoutDraw("+id+",evt)")


         domElemG.appendChild(finishedElem)



            ActiveElem = null
            activeElem = null


          //  DrawX.style("display", "none")

            mySVG.setAttribute('onclick', "plantDigitalReadout()")
                        cw.drawDigitalReadoutFinishButton.disabled = true
            cw.drawDigitalReadoutCancelButton.disabled = true
                       cw.drawDigitalReadoutBotButton.disabled=true
       if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }


        }
}

function cancelDrawDigitalReadout()
{
    var cw = addElemDigitalReadoutCw
    if(EditDigitalReadout==true)
        cancelEditDigitalReadout()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "plantDigitalReadout()") //---click to add more icons for this session---

            cw.drawDigitalReadoutFinishButton.disabled = true
            cw.drawDigitalReadoutCancelButton.disabled = true
            cw.drawDigitalReadoutBotButton.disabled=true
            coverOff()

        }

        cw.drawDigitalReadoutCancelButton.style.borderColor = ""

}

//====================edit/update GAUGE===============================

var EditDigitalReadout = false
var DrawDigitalReadoutEditId
var EditThisDigitalReadout
//--mousedown/right button on GAUGE---
function editDigitalReadoutDraw(elemObjEdit, evt)
{

    var isRightMB;
    evt = window.event;
    if ("which" in evt) // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = evt.which == 3;
    else if ("button" in evt) // IE, Opera
        isRightMB = evt.button == 2;

    if(isRightMB&&DrawDigitalReadout==false&&ZoomDrawing==false)
    {

        EditThisDigitalReadout = elemObjEdit

        DrawDigitalReadoutEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditDigitalReadout = true
        if(addElemDigitalReadoutLoad==false)
        {
            openIframe("AddElem", "addElemDigitalReadout", 10)

        }
        else if(addElemDigitalReadoutViz==false)
        {
            openIframe("AddElem", "addElemDigitalReadout", 10)
            setEditDigitalReadout()
        }
        else
            setEditDigitalReadout()

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

        ZoomDraggedElems.push([dragTarget,"editDigitalReadoutDraw("+dragTarget.id+",evt)",classed])
    }
}
//---after iframe loaded see sendSize() at addElemDigitalReadout.htm---
var EditDigitalReadoutObj
function setEditDigitalReadout()
{
    coverOn()

    var cw = addElemDigitalReadoutCw

    var elemObjEdit = document.getElementById(DrawDigitalReadoutEditId)

    EditDigitalReadoutObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditDigitalReadoutObj.setAttribute("id", "activeElem")
    EditDigitalReadoutObj.setAttribute("class", "dragTargetObj")
    EditDigitalReadoutObj.removeAttribute("onmousedown")

    // EditDigitalReadoutObj.style.cursor = "move"

    domActiveElemG.insertBefore(EditDigitalReadoutObj, domActiveElemG.firstChild)
    ActiveElem = d3.select("#activeElem")
    activeElem = document.getElementById("activeElem")

    cw.drawDigitalReadoutDeleteButton.style.visibility = "visible"
        cw.drawDigitalReadoutTopButton.style.visibility = "visible"
        cw.drawDigitalReadoutBotButton.style.visibility = "visible"
  cw.drawDigitalReadoutEditSpan.innerHTML = "Edit Digital Readout"
  cw.containerDiv.style.backgroundColor = "orange"

    //domActiveElemG.setAttribute("transform", activeElem.getAttribute("transform"))
    //activeElem.removeAttribute("transform")
    cw.drawDigitalReadoutCancelButton.disabled = false
    cw.drawDigitalReadoutFinishButton.disabled = false
               cw.drawDigitalReadoutBotButton.disabled=false


            var matrix = activeElem.transform.baseVal.consolidate().matrix;


                    var transX=matrix.e
                    var transY=matrix.f


            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", "translate("+matrix.e+","+matrix.f+")")

         //---coordinate selections----
      var title=ActiveElem.attr("title")
       var scale=ActiveElem.attr("scale")
       var units=ActiveElem.attr("units")
       var max=ActiveElem.attr("max")
       var faceColor=ActiveElem.attr("faceColor")
       var numBorderColor=ActiveElem.attr("numBorderColor")
       var numColor=ActiveElem.attr("numColor")
       var numBgColor=ActiveElem.attr("numBgColor")


       cw.digitalReadoutTitleValue.value=title
       cw.digitalReadoutUnitValue.value=units
       cw.digitalReadoutMaxValue.value=max

        var options=cw.digitalReadoutScaleSelect.options.length
        for(var k=0;k<options;k++)
        {
            option=cw.digitalReadoutScaleSelect.options[k].text
            if(option==scale)
            {
                cw.digitalReadoutScaleSelect.selectedIndex=k
                break
            }
        }

        var options=cw.digitalReadoutFaceColorSelect.options.length
        for(var k=0;k<options;k++)
        {
            option=cw.digitalReadoutFaceColorSelect.options[k].value
            if(option==faceColor)
            {
                cw.digitalReadoutFaceColorSelect.selectedIndex=k
                cw.digitalReadoutFaceColorBg.style.background=option
                break
            }
        }


        var options=cw.digitalReadoutBorderColorSelect.options.length
        for(var k=0;k<options;k++)
        {
            option=cw.digitalReadoutBorderColorSelect.options[k].value
            if(option==numBorderColor)
            {
                cw.digitalReadoutBorderColorSelect.selectedIndex=k
                cw.digitalReadoutBorderColorBg.style.background=option
                break
            }
        }

        var options=cw.digitalReadoutNumberColorSelect.options.length
        for(var k=0;k<options;k++)
        {
            option=cw.digitalReadoutNumberColorSelect.options[k].value
            if(option==numColor)
            {
                cw.digitalReadoutNumberColorSelect.selectedIndex=k
                cw.digitalReadoutNumberColorBg.style.background=option
                break
            }
        }

        var options=cw.digitalReadoutNumberBgColorSelect.options.length
        for(var k=0;k<options;k++)
        {
            option=cw.digitalReadoutNumberBgColorSelect.options[k].value
            if(option==numBgColor)
            {
                cw.digitalReadoutNumberBgColorSelect.selectedIndex=k
                cw.digitalReadoutNumberBgColorBg.style.background=option
                break
            }
        }


            //--place dragDot----
            setDigitalReadoutEditDrag()

            mySVG.style.cursor = ""

}

function setDigitalReadoutEditDrag()
{


    activeElem.removeAttribute("onmousedown")

    mySVG.setAttribute("onmousedown", "startDragDigitalReadout(evt)")
    mySVG.setAttribute("onmousemove", "dragDigitalReadout(evt)")
    mySVG.setAttribute("onmouseup", "endDragDigitalReadout(evt)")
    ActiveElem.style("cursor", "move")

}

function finishEditDigitalReadout()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemDigitalReadoutCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "hmiElem")

        finishedElem.setAttribute("id", DrawDigitalReadoutEditId)
                    CurrentHMIElem=finishedElem.cloneNode(true)

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("onmousedown", "editDigitalReadoutDraw("+DrawDigitalReadoutEditId+",evt)")
        finishedElem.setAttribute("id", DrawDigitalReadoutEditId)
        domElemG.insertBefore(finishedElem, EditThisDigitalReadout)
        domElemG.removeChild(EditThisDigitalReadout)
       if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }


    }

    closeDrawDigitalReadout()
}

function resetEditDigitalReadout()
{

    var cw = addElemDigitalReadoutCw

    document.getElementById(DrawDigitalReadoutEditId).setAttribute("opacity", 1)

    EditDigitalReadout = false
    cw.drawDigitalReadoutEditSpan.innerText = "Draw DigitalReadouts"
    cw.drawDigitalReadoutTopTable.style.backgroundColor = "#abcdef"
    ActiveElem = null
    activeElem = null

    DrawX.style("display", "none")
    DrawX.attr("stroke", "violet")
    DragDot.style("visibility", "hidden")

    cw.drawDigitalReadoutDeleteButton.style.visibility = "hidden"
        cw.drawDigitalReadoutTopButton.style.visibility = "hidden"
        cw.drawDigitalReadoutBotButton.style.visibility = "hidden"
    cw.drawDigitalReadoutCancelButton.disabled = false
    cw.drawDigitalReadoutFinishButton.disabled = false
    DrawDigitalReadout = true
    mySVG.setAttribute('onclick', "plantDigitalReadout()")

}

function cancelEditDigitalReadout()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawDigitalReadoutEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null
    ActiveElem = null

    closeDrawDigitalReadout()


}

//=======================delete==================
var DigitalReadoutDeleted = false
//---button---
function removeCurrentDrawDigitalReadout()
{

    domActiveElemG.removeChild(activeElem)
     var elemObjEdit = document.getElementById(DrawDigitalReadoutEditId)
     domElemG.removeChild(elemObjEdit)
    DigitalReadoutDeleted = true

    var cw = addElemDigitalReadoutCw

    closeDrawDigitalReadout()

}
//====================Top/Bot===================
function topDrawDigitalReadout()
{

    var elemObjEdit = document.getElementById(DrawDigitalReadoutEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawDigitalReadoutEditId)

    domActiveElemG.removeChild(document.getElementById("hmiElem"))
    activeElem=null
    ActiveElem=null

    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)

    closeDrawDigitalReadout()
}
function botDrawDigitalReadout()
{
    if(EditDigitalReadout)
    {
    var elemObjEdit = document.getElementById(DrawDigitalReadoutEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawDigitalReadoutEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null

    domElemG.removeChild(elemObjEdit)
    domElemG.insertBefore(finishedElem,domElemG.firstChild)

   closeDrawDigitalReadout()
   }
   else
   {
        finishDrawDigitalReadout()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }
}





function digitalReadoutFaceColorSelected()
{

    var cw = addElemDigitalReadoutCw
    var faceColor=cw.digitalReadoutFaceColorSelect.options[cw.digitalReadoutFaceColorSelect.selectedIndex].value
    cw.digitalReadoutFaceColorBg.style.background=faceColor
changeDigitalReadout()
}


function digitalReadoutBorderColorSelected()
{

     var cw = addElemDigitalReadoutCw
    var borderColor=cw.digitalReadoutBorderColorSelect.options[cw.digitalReadoutBorderColorSelect.selectedIndex].value
    cw.digitalReadoutBorderColorBg.style.background=borderColor
    changeDigitalReadout()

}
function digitalReadoutNumberColorSelected()
{

     var cw = addElemDigitalReadoutCw
    var numColor=cw.digitalReadoutNumberColorSelect.options[cw.digitalReadoutNumberColorSelect.selectedIndex].value
    cw.digitalReadoutNumberColorBg.style.background=numColor
   changeDigitalReadout()

}
function digitalReadoutNumberBgColorSelected()
{

     var cw = addElemDigitalReadoutCw
    var numColor=cw.digitalReadoutNumberBgColorSelect.options[cw.digitalReadoutNumberBgColorSelect.selectedIndex].value
    cw.digitalReadoutNumberBgColorBg.style.background=numColor
    changeDigitalReadout()

}



