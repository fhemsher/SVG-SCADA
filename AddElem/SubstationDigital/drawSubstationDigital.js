///---X button and iframe close all---
function closeDrawSubstationDigital()
{
    if(addElemSubstationDigitalViz==true)
    {
        closeIframe("addElemSubstationDigital");
        coverOff()
        
        var cw = addElemSubstationDigitalCw

        if(EditSubstationDigital==true && SubstationDigitalDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawSubstationDigitalEditId)
            elemObjEdit.style.display = "inline"

            elemObjEdit.setAttribute("onmousedown", "editSubstationDigitalDraw("+DrawSubstationDigitalEditId+",evt)")

        }
        DraggingObj = false
        DrawSubstationDigital = false
        EditSubstationDigital = false
        SubstationDigitalDeleted = false

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

        cw.drawSubstationDigitalFinishButton.disabled = true
        cw.drawSubstationDigitalCancelButton.disabled = true
        cw.drawSubstationDigitalCancelButton.style.borderColor = ""
        cw.drawSubstationDigitalDeleteButton.style.visibility = "hidden"
        cw.drawSubstationDigitalTopButton.style.visibility = "hidden"

            cw.drawSubstationDigitalBotButton.disabled=true
        cw.drawSubstationDigitalEditSpan.innerText = "Draw Substation Digital Monitors"
        cw.containerDiv.style.backgroundColor = "#ABCDEF"
       //----copies---

    }
}

//---on add icon DrawX follows cursor
function trackDrawSubstationDigital()
{
    var cw = addElemSubstationDigitalCw

    if(ActiveElem==null&&EditSubstationDigital==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }
}

var EditSubstationDigital = false
var DrawSubstationDigital = false
var SubstationDigitalDeleted = false

function startSubstationDigitalDraw()
{
    var cw = addElemSubstationDigitalCw
    if(EditSubstationDigital==false)
    {
        ActiveElem = null
        activeElem = null
        DrawSubstationDigital = true
        DrawX.style("display", "inline")
        mySVG.setAttribute('onclick', "plantSubstationDigital()") //---click to add more icons for this session---
	cw.drawSubstationDigitalFillSelect.selectedIndex=134

    	var clrFill=cw.drawSubstationDigitalFillSelect.options[cw.drawSubstationDigitalFillSelect.selectedIndex].value
	cw.drawSubstationDigitalFillBg.style.backgroundColor=clrFill
    }

}
function drawSubstationDigitalScaleSelected()
{
    if(ActiveElem)
    {
        var cw = addElemSubstationDigitalCw
         var scale=+cw.drawSubstationDigitalScaleSelect.options[cw.drawSubstationDigitalScaleSelect.selectedIndex].text
        var matrix = activeElem.transform.baseVal.consolidate().matrix;
        matrix.a=scale
        matrix.d=scale
        activeElem.transform.baseVal.consolidate().matrix;
    }

}
//--click on svg---
function plantSubstationDigital()
{
    var cw = addElemSubstationDigitalCw
    coverOn()
     var scale=cw.drawSubstationDigitalScaleSelect.options[cw.drawSubstationDigitalScaleSelect.selectedIndex].text
    activeElem=SubstationDigitalG.cloneNode(true)

     activeElem.setAttribute("id", "activeElem")
    ActiveElem = d3.select("#activeElem")
        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")scale("+scale+")")

        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)
         domActiveElemG.appendChild(activeElem)

      
    var fill = cw.drawSubstationDigitalFillSelect.options[cw.drawSubstationDigitalFillSelect.selectedIndex].value

   var tables=activeElem.getElementsByTagName("table")

  if(cw.drawSubstationDigitalFillSelect.selectedIndex==0)
    {
              tables[1].style.background="white"
        tables[2].style.background="white"


        //activeElem.firstChild.setAttribute("fill-opacity", 0)

    }
    else if(ActiveElem)
    {
        tables[1].style.background=fill
        tables[2].style.background=fill


    }



        mySVG.removeAttribute('onclick')
        mySVG.style.cursor = ""
        mySVG.setAttribute("onmousedown", "startDragSubstationDigital(evt)")
        mySVG.setAttribute("onmousemove", "dragSubstationDigital(evt)")
        mySVG.setAttribute("onmouseup", "endDragSubstationDigital(evt)")

        cw.drawSubstationDigitalCancelButton.disabled = false
        cw.drawSubstationDigitalFinishButton.disabled = false
            cw.drawSubstationDigitalBotButton.disabled=false

}

function drawSubstationDigitalScaleSelected()
{
    if(ActiveElem)
    {
        var cw = addElemSubstationDigitalCw
         var scale=+cw.drawSubstationDigitalScaleSelect.options[cw.drawSubstationDigitalScaleSelect.selectedIndex].text
        var matrix = activeElem.transform.baseVal.consolidate().matrix;
        matrix.a=scale
        matrix.d=scale
        activeElem.transform.baseVal.consolidate().matrix;
    }

}

function finishDrawSubstationDigital()
{

    if(EditSubstationDigital==true )
        finishEditSubstationDigital()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemSubstationDigitalCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "SubstationDigital"+new Date().getTime()

            finishedElem.setAttribute("id", id)
            finishedElem.setAttribute("class", "hmiElem")
                        CurrentHMIElem=finishedElem.cloneNode(true)


            mySVG.removeAttribute("onmousedown")
            mySVG.removeAttribute("onmousemove")
            mySVG.removeAttribute("onmouseup")

            finishedElem.setAttribute("onmousedown", "editSubstationDigitalDraw("+id+",evt)")
            domElemG.appendChild(finishedElem)




            ActiveElem = null
            activeElem = null

            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "plantSubstationDigital()") //---click to add more icons for this session---
            DrawX.style("display", "none")
            DragDot.style("visibility", "hidden")
            // topG.appendChild(dragDot)
            cw.drawSubstationDigitalFinishButton.disabled = true
            cw.drawSubstationDigitalCancelButton.disabled = true
            cw.drawSubstationDigitalBotButton.disabled=true
       if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }


        }
}

function cancelDrawSubstationDigital()
{
    var cw = addElemSubstationDigitalCw
    if(EditSubstationDigital==true)
        cancelEditSubstationDigital()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "plantSubstationDigital()") //---click to add more icons for this session---

            cw.drawSubstationDigitalFinishButton.disabled = true
            cw.drawSubstationDigitalCancelButton.disabled = true
            cw.drawSubstationDigitalBotButton.disabled=true
            coverOff()

        }

        cw.drawSubstationDigitalCancelButton.style.borderColor = ""

}

//====================edit/update circle===============================

var EditSubstationDigital = false
var DrawSubstationDigitalEditId
var EditThisSubstationDigital
//--mousedown/right button on circle---
function editSubstationDigitalDraw(elemObjEdit, evt)
{

    var isRightMB;
    evt = window.event;
    if ("which" in evt) // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = evt.which == 3;
    else if ("button" in evt) // IE, Opera
        isRightMB = evt.button == 2;

    if(isRightMB&&DrawSubstationDigital==false&&ZoomDrawing==false)
    {

        EditThisSubstationDigital = elemObjEdit

        DrawSubstationDigitalEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditSubstationDigital = true
        if(addElemSubstationDigitalLoad==false)
        {
            openIframe("AddElem", "addElemSubstationDigital", 10)

        }
        else if(addElemSubstationDigitalViz==false)
        {
            openIframe("AddElem", "addElemSubstationDigital", 10)
            setEditSubstationDigital()
        }
        else
            setEditSubstationDigital()

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

        ZoomDraggedElems.push([dragTarget,"editSubstationDigitalDraw("+dragTarget.id+",evt)",classed])
    }

}
//---after iframe loaded see sendSize() at addElemSubstationDigital.htm---
var EditSubstationDigitalObj
function setEditSubstationDigital()
{
    coverOn()

    var cw = addElemSubstationDigitalCw

    var elemObjEdit = document.getElementById(DrawSubstationDigitalEditId)

    EditSubstationDigitalObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditSubstationDigitalObj.setAttribute("id", "activeElem")
    EditSubstationDigitalObj.setAttribute("class", "dragTargetObj")
    EditSubstationDigitalObj.removeAttribute("onmousedown")

    // EditSubstationDigitalObj.style.cursor = "move"

    domActiveElemG.insertBefore(EditSubstationDigitalObj, domActiveElemG.firstChild)
    ActiveElem = d3.select("#activeElem")
    activeElem = document.getElementById("activeElem")

    cw.drawSubstationDigitalDeleteButton.style.visibility = "visible"
        cw.drawSubstationDigitalTopButton.style.visibility = "visible"
        cw.drawSubstationDigitalBotButton.style.visibility = "visible"
    cw.drawSubstationDigitalEditSpan.innerHTML = "Edit Substation Digital Monitor"
    cw.containerDiv.style.backgroundColor = "orange"

    //domActiveElemG.setAttribute("transform", activeElem.getAttribute("transform"))
    //activeElem.removeAttribute("transform")
    cw.drawSubstationDigitalCancelButton.disabled = false
    cw.drawSubstationDigitalFinishButton.disabled = false
            cw.drawSubstationDigitalBotButton.disabled=false

           var matrix = activeElem.getCTM()
             var scale=matrix.a

         if(scale==1)cw.drawSubstationDigitalScaleSelect.selectedIndex=0
         if(scale==.9)cw.drawSubstationDigitalScaleSelect.selectedIndex=1
         if(scale==.8)cw.drawSubstationDigitalScaleSelect.selectedIndex=2
         if(scale==.7)cw.drawSubstationDigitalScaleSelect.selectedIndex=3
         if(scale==.6)cw.drawSubstationDigitalScaleSelect.selectedIndex=4
         if(scale==.5)cw.drawSubstationDigitalScaleSelect.selectedIndex=5
         if(scale==.4)cw.drawSubstationDigitalScaleSelect.selectedIndex=6
         if(scale==.3)cw.drawSubstationDigitalScaleSelect.selectedIndex=7
         if(scale==.2)cw.drawSubstationDigitalScaleSelect.selectedIndex=8
         if(scale==.1)cw.drawSubstationDigitalScaleSelect.selectedIndex=9


    var fill = EditSubstationDigitalObj.getElementsByTagName("table")[1]


        setSelect("SubstationDigital", "Fill", fill)



    //---update bg colors---

    cw.drawSubstationDigitalFillBg.style.backgroundColor = fill




            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", "translate("+matrix.e+","+matrix.f+")")





            //--place dragDot----
            setSubstationDigitalEditDrag()

            mySVG.style.cursor = ""
            
}

function setSubstationDigitalEditDrag()
{


    activeElem.removeAttribute("onmousedown")

    mySVG.setAttribute("onmousedown", "startDragSubstationDigital(evt)")
    mySVG.setAttribute("onmousemove", "dragSubstationDigital(evt)")
    mySVG.setAttribute("onmouseup", "endDragSubstationDigital(evt)")
    ActiveElem.style("cursor", "move")

}

function finishEditSubstationDigital()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemSubstationDigitalCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "hmiElem")

        finishedElem.setAttribute("id", DrawSubstationDigitalEditId)
            CurrentHMIElem=finishedElem.cloneNode(true)

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("onmousedown", "editSubstationDigitalDraw("+DrawSubstationDigitalEditId+",evt)")
        finishedElem.setAttribute("id", DrawSubstationDigitalEditId)
        domElemG.insertBefore(finishedElem, EditThisSubstationDigital)
        domElemG.removeChild(EditThisSubstationDigital)

       if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }

    }

    closeDrawSubstationDigital()
}

function resetEditSubstationDigital()
{

    var cw = addElemSubstationDigitalCw

    document.getElementById(DrawSubstationDigitalEditId).setAttribute("opacity", 1)

    EditSubstationDigital = false
    cw.drawSubstationDigitalEditSpan.innerText = "Draw Pilot Lights"
    cw.drawSubstationDigitalTopTable.style.backgroundColor = "#ABCDEF"
    ActiveElem = null
    activeElem = null

    DrawX.style("display", "none")
    DrawX.attr("stroke", "violet")
    DragDot.style("visibility", "hidden")

    cw.drawSubstationDigitalDeleteButton.style.visibility = "hidden"
        cw.drawSubstationDigitalTopButton.style.visibility = "hidden"
        cw.drawSubstationDigitalBotButton.style.visibility = "hidden"
    cw.drawSubstationDigitalCancelButton.disabled = false
    cw.drawSubstationDigitalFinishButton.disabled = false
    DrawSubstationDigital = true
    mySVG.setAttribute('onclick', "plantSubstationDigital()")

}

function cancelEditSubstationDigital()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawSubstationDigitalEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null
    ActiveElem = null

    closeDrawSubstationDigital()


}

//=======================delete circle==================
var SubstationDigitalDeleted = false
//---button---
function removeCurrentDrawSubstationDigital()
{

    domActiveElemG.removeChild(activeElem)
     var elemObjEdit = document.getElementById(DrawSubstationDigitalEditId)
     domElemG.removeChild(elemObjEdit)
    SubstationDigitalDeleted = true

    var cw = addElemSubstationDigitalCw

    closeDrawSubstationDigital()

}
//====================Top/Bot===================
function topDrawSubstationDigital()
{

    var elemObjEdit = document.getElementById(DrawSubstationDigitalEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawSubstationDigitalEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null
    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)

    closeDrawSubstationDigital()
}
function botDrawSubstationDigital()
{
    if(EditSubstationDigital)
    {
    var elemObjEdit = document.getElementById(DrawSubstationDigitalEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawSubstationDigitalEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null
    domElemG.removeChild(elemObjEdit)
    domElemG.insertBefore(finishedElem,domElemG.firstChild)

   closeDrawSubstationDigital()
   }
   else
   {
        finishDrawSubstationDigital()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }
}



function showDrawSubstationDigitalFillBg()
{
    var cw = addElemSubstationDigitalCw
    var fill = cw.drawSubstationDigitalFillSelect.options[cw.drawSubstationDigitalFillSelect.selectedIndex].value
      cw.drawSubstationDigitalFillBg.style.backgroundColor = fill
   if(activeElem)
   {
            var tables=activeElem.getElementsByTagName("table")

          if(fill!="none")
                cw.drawSubstationDigitalFillBg.style.backgroundColor = fill
                else
                    cw.drawSubstationDigitalFillBg.style.backgroundColor = ""
                if(cw.drawSubstationDigitalFillSelect.selectedIndex==0)
                {
                             tables[1].style.background="white"
                            tables[2].style.background="white"

                }
           if(ActiveElem)
            {
                tables[1].style.background=fill
                tables[2].style.background=fill


            }
  }
}

function drawSubstationDigitalFillSelected()
{
    var cw = addElemSubstationDigitalCw
    var fill = cw.drawSubstationDigitalFillSelect.options[cw.drawSubstationDigitalFillSelect.selectedIndex].value

   var tables=activeElem.getElementsByTagName("table")

  if(cw.drawSubstationDigitalFillSelect.selectedIndex==0)
    {
              tables[1].style.background="white"
        tables[2].style.background="white"


        //activeElem.firstChild.setAttribute("fill-opacity", 0)

    }
    else if(ActiveElem)
    {
        tables[1].style.background=fill
        tables[2].style.background=fill


    }

}
