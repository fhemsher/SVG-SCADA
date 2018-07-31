///---X button and iframe close all---
function closeDrawPID()
{
    if(addElemPIDViz==true)
    {
        closeIframe("addElemPID");
        coverOff()
        
        var cw = addElemPIDCw

        if(EditPID==true && PIDDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawPIDEditId)
            elemObjEdit.style.display = "inline"

            elemObjEdit.setAttribute("onmousedown", "editPIDDraw("+DrawPIDEditId+",evt)")

        }
        DraggingObj = false
        DrawPID = false
        EditPID = false
        PIDDeleted = false

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

        cw.drawPIDFinishButton.disabled = true
        cw.drawPIDCancelButton.disabled = true
        cw.drawPIDCancelButton.style.borderColor = ""
        cw.drawPIDDeleteButton.style.visibility = "hidden"
        cw.drawPIDTopButton.style.visibility = "hidden"

            cw.drawPIDBotButton.disabled=true
        cw.drawPIDEditSpan.innerText = "Draw PIDs"
        cw.containerDiv.style.backgroundColor = "#ABCDEF"
       //----copies---

    }
}

//---on add icon DrawX follows cursor
function trackDrawPID()
{
    var cw = addElemPIDCw

    if(ActiveElem==null&&EditPID==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }
}

var EditPID = false
var DrawPID = false
var PIDDeleted = false

function startPIDDraw()
{
    var cw = addElemPIDCw
    if(EditPID==false)
    {
        ActiveElem = null
        activeElem = null
        DrawPID = true
        DrawX.style("display", "inline")
        mySVG.setAttribute('onclick', "plantPID()") //---click to add more icons for this session---
	cw.drawPIDFillSelect.selectedIndex=22
	cw.drawPIDStrokeSelect.selectedIndex=116
	var clr=cw.drawPIDStrokeSelect.options[cw.drawPIDStrokeSelect.selectedIndex].value
	cw.drawPIDStrokeBg.style.backgroundColor=clr
    	var clrFill=cw.drawPIDFillSelect.options[cw.drawPIDFillSelect.selectedIndex].value
	cw.drawPIDFillBg.style.backgroundColor=clrFill
    }

}
function drawPIDScaleSelected()
{
    if(ActiveElem)
    {
        var cw = addElemPIDCw
         var scale=+cw.drawPIDScaleSelect.options[cw.drawPIDScaleSelect.selectedIndex].text
        var matrix = activeElem.transform.baseVal.consolidate().matrix;
        matrix.a=scale
        matrix.d=scale
        activeElem.transform.baseVal.consolidate().matrix;
    }

}
//--click on svg---
function plantPID()
{
    var cw = addElemPIDCw
    coverOn()
     var scale=cw.drawPIDScaleSelect.options[cw.drawPIDScaleSelect.selectedIndex].text
    var fill=  cw.drawPIDFillSelect.options[cw.drawPIDFillSelect.selectedIndex].value
    var stroke = cw.drawPIDStrokeSelect.options[cw.drawPIDStrokeSelect.selectedIndex].value

    activeElem=PIDG.cloneNode(true)

     activeElem.setAttribute("id", "activeElem")
    ActiveElem = d3.select("#activeElem")
        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")scale("+scale+")")

        activeElem.setAttribute("cursor", "move")
        activeElem.setAttribute("class", "dragTargetObj")
        activeElem.setAttribute("pointer-events", null)

            activeElem.firstChild.setAttribute("fill", fill)
            activeElem.firstChild.setAttribute("stroke", stroke)

         domActiveElemG.appendChild(activeElem)





        mySVG.removeAttribute('onclick')
        mySVG.style.cursor = ""
        mySVG.setAttribute("onmousedown", "startDragPID(evt)")
        mySVG.setAttribute("onmousemove", "dragPID(evt)")
        mySVG.setAttribute("onmouseup", "endDragPID(evt)")

        cw.drawPIDCancelButton.disabled = false
        cw.drawPIDFinishButton.disabled = false
            cw.drawPIDBotButton.disabled=false
}

function drawPIDScaleSelected()
{
    if(ActiveElem)
    {
        var cw = addElemPIDCw
         var scale=+cw.drawPIDScaleSelect.options[cw.drawPIDScaleSelect.selectedIndex].text
        var matrix = activeElem.transform.baseVal.consolidate().matrix;
        matrix.a=scale
        matrix.d=scale
        activeElem.transform.baseVal.consolidate().matrix;
    }

}

function finishDrawPID()
{

    if(EditPID==true )
        finishEditPID()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemPIDCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "PID"+new Date().getTime()

            finishedElem.setAttribute("id", id)
            finishedElem.setAttribute("class", "hmiElem")
                CurrentHMIElem=finishedElem.cloneNode(true)
                CurrentHMIElem.removeAttribute("cursor")
                CurrentHMIElem.removeAttribute("pointer-events")
                CurrentHMIElem.removeAttribute("style")


            mySVG.removeAttribute("onmousedown")
            mySVG.removeAttribute("onmousemove")
            mySVG.removeAttribute("onmouseup")

            finishedElem.setAttribute("onmousedown", "editPIDDraw("+id+",evt)")
            domElemG.appendChild(finishedElem)




            ActiveElem = null
            activeElem = null

            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "plantPID()") //---click to add more icons for this session---
            DrawX.style("display", "none")
            DragDot.style("visibility", "hidden")
            // topG.appendChild(dragDot)
            cw.drawPIDFinishButton.disabled = true
            cw.drawPIDCancelButton.disabled = true
            cw.drawPIDBotButton.disabled=true

             if(cw.sourceHMICheck.checked==true)
                {

                    showHMISource()
                }


        }
}

function cancelDrawPID()
{
    var cw = addElemPIDCw
    if(EditPID==true)
        cancelEditPID()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "plantPID()") //---click to add more icons for this session---

            cw.drawPIDFinishButton.disabled = true
            cw.drawPIDCancelButton.disabled = true
            cw.drawPIDBotButton.disabled=true
            coverOff()

        }

        cw.drawPIDCancelButton.style.borderColor = ""

}

//====================edit/update circle===============================

var EditPID = false
var DrawPIDEditId
var EditThisPID
//--mousedown/right button on circle---
function editPIDDraw(elemObjEdit, evt)
{
    var isRightMB;
    evt = window.event;
    if ("which" in evt) // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = evt.which == 3;
    else if ("button" in evt) // IE, Opera
        isRightMB = evt.button == 2;

    if(isRightMB&&DrawPID==false&&ZoomDrawing==false)
    {

        EditThisPID = elemObjEdit

        DrawPIDEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditPID = true
        if(addElemPIDLoad==false)
        {
            openIframe("AddElem", "addElemPID", 10)

        }
        else if(addElemPIDViz==false)
        {
            openIframe("AddElem", "addElemPID", 10)
            setEditPID()
        }
        else
            setEditPID()

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

        ZoomDraggedElems.push([dragTarget,"editPIDDraw("+dragTarget.id+",evt)",classed])
    }

}
//---after iframe loaded see sendSize() at addElemPID.htm---
var EditPIDObj
function setEditPID()
{
    coverOn()

    var cw = addElemPIDCw

    var elemObjEdit = document.getElementById(DrawPIDEditId)

    EditPIDObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditPIDObj.setAttribute("id", "activeElem")
    EditPIDObj.setAttribute("class", "dragTargetObj")
    EditPIDObj.removeAttribute("onmousedown")

    // EditPIDObj.style.cursor = "move"

    domActiveElemG.insertBefore(EditPIDObj, domActiveElemG.firstChild)
    ActiveElem = d3.select("#activeElem")
    activeElem = document.getElementById("activeElem")

    cw.drawPIDDeleteButton.style.visibility = "visible"
        cw.drawPIDTopButton.style.visibility = "visible"
        cw.drawPIDBotButton.style.visibility = "visible"
    cw.drawPIDEditSpan.innerHTML = "Edit PID"
    cw.containerDiv.style.backgroundColor = "orange"

    //domActiveElemG.setAttribute("transform", activeElem.getAttribute("transform"))
    //activeElem.removeAttribute("transform")
    cw.drawPIDCancelButton.disabled = false
    cw.drawPIDFinishButton.disabled = false
                cw.drawPIDBotButton.disabled=false

           var matrix = activeElem.getCTM()
             var scale=matrix.a.toFixed(1)

         if(scale==1)cw.drawPIDScaleSelect.selectedIndex=0
         if(scale==.9)cw.drawPIDScaleSelect.selectedIndex=1
         if(scale==.8)cw.drawPIDScaleSelect.selectedIndex=2
         if(scale==.7)cw.drawPIDScaleSelect.selectedIndex=3
         if(scale==.6)cw.drawPIDScaleSelect.selectedIndex=4
         if(scale==.5)cw.drawPIDScaleSelect.selectedIndex=5
         if(scale==.4)cw.drawPIDScaleSelect.selectedIndex=6
         if(scale==.3)cw.drawPIDScaleSelect.selectedIndex=7
         if(scale==.2)cw.drawPIDScaleSelect.selectedIndex=8
         if(scale==.1)cw.drawPIDScaleSelect.selectedIndex=9

    var stroke = EditPIDObj.getElementsByTagName("ellipse")[0].getAttribute("stroke")
    var fill = EditPIDObj.getElementsByTagName("ellipse")[0].getAttribute("fill")


        setSelect("PID", "Fill", fill)


    setSelect("PID", "Stroke", stroke)
    //---update bg colors---
    cw.drawPIDStrokeBg.style.backgroundColor = stroke
    cw.drawPIDFillBg.style.backgroundColor = fill




            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", "translate("+matrix.e+","+matrix.f+")")





            //--place dragDot----
            setPIDEditDrag()

            mySVG.style.cursor = ""
            
}

function setPIDEditDrag()
{


    activeElem.removeAttribute("onmousedown")

    mySVG.setAttribute("onmousedown", "startDragPID(evt)")
    mySVG.setAttribute("onmousemove", "dragPID(evt)")
    mySVG.setAttribute("onmouseup", "endDragPID(evt)")
    ActiveElem.style("cursor", "move")

}

function finishEditPID()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemPIDCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "hmiElem")

        finishedElem.setAttribute("id", DrawPIDEditId)
         CurrentHMIElem=finishedElem.cloneNode(true)
        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("onmousedown", "editPIDDraw("+DrawPIDEditId+",evt)")
        finishedElem.setAttribute("id", DrawPIDEditId)
        domElemG.insertBefore(finishedElem, EditThisPID)
        domElemG.removeChild(EditThisPID)
          if(cw.sourceHMICheck.checked==true)
            {

               showHMISource()
            }

    }

    closeDrawPID()
}

function resetEditPID()
{

    var cw = addElemPIDCw

    document.getElementById(DrawPIDEditId).setAttribute("opacity", 1)

    EditPID = false
    cw.drawPIDEditSpan.innerText = "Draw Pilot Lights"
    cw.drawPIDTopTable.style.backgroundColor = "#ABCDEF"
    ActiveElem = null
    activeElem = null

    DrawX.style("display", "none")
    DrawX.attr("stroke", "violet")
    DragDot.style("visibility", "hidden")

    cw.drawPIDDeleteButton.style.visibility = "hidden"
        cw.drawPIDTopButton.style.visibility = "hidden"
        cw.drawPIDBotButton.style.visibility = "hidden"
    cw.drawPIDCancelButton.disabled = false
    cw.drawPIDFinishButton.disabled = false
    DrawPID = true
    mySVG.setAttribute('onclick', "plantPID()")

}

function cancelEditPID()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawPIDEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null
    ActiveElem = null

    closeDrawPID()


}

//=======================delete circle==================
var PIDDeleted = false
//---button---
function removeCurrentDrawPID()
{

    domActiveElemG.removeChild(activeElem)
     var elemObjEdit = document.getElementById(DrawPIDEditId)
     domElemG.removeChild(elemObjEdit)
    PIDDeleted = true

    var cw = addElemPIDCw

    closeDrawPID()

}
//====================Top/Bot===================
function topDrawPID()
{

    var elemObjEdit = document.getElementById(DrawPIDEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawPIDEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null
    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)

    closeDrawPID()
}
function botDrawPID()
{
    if(EditPID)
    {
    var elemObjEdit = document.getElementById(DrawPIDEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "hmiElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawPIDEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null


    domElemG.removeChild(elemObjEdit)
    domElemG.insertBefore(finishedElem,domElemG.firstChild)

   closeDrawPID()
   }
   else
   {
        finishDrawPID()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }
}


function showDrawPIDStrokeBg()
{
    var cw = addElemPIDCw
    var stroke = cw.drawPIDStrokeSelect.options[cw.drawPIDStrokeSelect.selectedIndex].value
    if(stroke!="none")
        cw.drawPIDStrokeBg.style.backgroundColor = stroke
        else
            cw.drawPIDStrokeBg.style.backgroundColor = ""
            if(ActiveElem)
            activeElem.firstChild.setAttribute("stroke", stroke)

}

function drawPIDStrokeSelected()
{
    var cw = addElemPIDCw
    var stroke = cw.drawPIDStrokeSelect.options[cw.drawPIDStrokeSelect.selectedIndex].value

    if(ActiveElem)
         activeElem.firstChild.setAttribute("stroke", stroke)

}

function showDrawPIDFillBg()
{
    var cw = addElemPIDCw
    var fill = cw.drawPIDFillSelect.options[cw.drawPIDFillSelect.selectedIndex].value
    if(fill!="none")
        cw.drawPIDFillBg.style.backgroundColor = fill
        else
            cw.drawPIDFillBg.style.backgroundColor = ""
            if(cw.drawPIDFillSelect.selectedIndex==0)
        {
            activeElem.firstChild.setAttribute("fill", "white")
            activeElem.firstChild.setAttribute("fill-opacity", 0)

        }
   if(ActiveElem)
    {
         activeElem.firstChild.setAttribute("fill", fill)


    }

}

function drawPIDFillSelected()
{
    var cw = addElemPIDCw
    var fill = cw.drawPIDFillSelect.options[cw.drawPIDFillSelect.selectedIndex].value
    if(cw.drawPIDFillSelect.selectedIndex==0)
    {
       activeElem.firstChild.setAttribute("fill", "white")
        activeElem.firstChild.setAttribute("fill-opacity", 0)

    }
    else if(ActiveElem)
    {
        activeElem.firstChild.setAttribute("fill", fill)


    }

}
