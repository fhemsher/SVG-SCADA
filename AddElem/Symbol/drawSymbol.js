function closeDrawSymbol()
{
    if(addElemSymbolViz==true)
    {
        closeIframe("addElemSymbol");
        coverOff()

        var cw = addElemSymbolCw

        if(EditSymbol==true && SymbolDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawSymbolEditId)
            elemObjEdit.style.display = "inline"
            elemObjEdit.setAttribute("ondblclick", "editSymbolDraw("+DrawSymbolEditId+")")

        }
        DraggingObj = false
        DrawSymbol = false
        EditSymbol = false
        SymbolDeleted = false
         SymbolPlantStart=false
        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")

        mySVG.removeAttribute('onclick')

        if(document.getElementById("activeElem"))
        {
            document.getElementById("activeElem").removeAttribute("class")
            domActiveElemG.removeChild(document.getElementById("activeElem"))

        }
        activeElem = null
        ActiveElem = null
        ActiveSymbol = null

        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)

        cw.drawSymbolFinishButton.disabled = true
        cw.drawSymbolCancelButton.disabled = true
        cw.drawSymbolCancelButton.style.borderColor = ""
        cw.drawSymbolDeleteButton.style.visibility = "hidden"
        cw.drawSymbolEditSpan.innerText = "Draw Symbols"

        ///cw.drawSymbolTopTable.style.backgroundColor = "honeydew"

        if(cw.CheckedBND)
        {
            uncheck = cw.document.getElementById("request"+cw.CheckedBND+"Check")
            uncheck.checked = false
            var changeTD = cw.document.getElementById("td"+cw.CheckedBND)
            changeTD.style.backgroundColor = ""
        }
        cw.CheckedBND = null
        cw.SelectedSymbol = null
        cw.SelelectedScale = null
    }
}
function editSymbolStart(elemObjEdit)
{

              EditThisSymbol = elemObjEdit

            DrawSymbolEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

            ActiveElem = null
            activeElem = null

            EditSymbol = true
            if(addElemSymbolLoad==false)
            {
                openIframe("AddElem", "addElemSymbol", 10)

            }
            else if(addElemSymbolViz==false)
            {
                openIframe("AddElem", "addElemSymbol", 10)
            }


}
var SymbolPlantStart=false
function startSymbolDraw()
{
     SymbolPlantStart=true
    mySVG.setAttribute("onclick", "plantSymbol(event)")

}
//---on add icon DrawX follows cursor
var EditSymbol = false
var SymbolDeleted = false

function trackDrawSymbol()
{
    var cw = addElemSymbolCw
    if(cw.SelectedSymbol)
    {
        if(ActiveElem==null&&EditSymbol==false && SymbolDeleted==false)
        {
            DrawX.style("display", "inline")
            DrawX.attr("stroke", "violet")
            DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
        }
    }
}

//---click on app svg---
var ActiveSymbol = null
var DrawSymbol = false
function plantSymbol(event)
{
    var cw = addElemSymbolCw
    if(!ActiveSymbol&&cw.SelectedSymbol)
    {
        coverOn()
        DrawSymbol = true
       SymbolPlantStart=false
        var offsets = svgDiv.getBoundingClientRect();
        var top = offsets.top;
        var left = offsets.left;
        //---requred for FF----
        var eventObj = event || window.event;

        var x = eventObj.clientX-left
        var y = eventObj.clientY-top

        var nativeScale = cw.SelectedScale
        var symbolG = cw.SelectedSymbol.cloneNode(true)
        for(var k = 0; k<symbolG.childNodes.length; k++)
            symbolG.childNodes.item(k).setAttribute("transform", "scale("+nativeScale+")")

            activeElem = symbolG
            activeElem.id = "activeElem"
            ActiveElem = d3.select("#activeElem")
            activeElem.setAttribute("nativeScale", nativeScale)
            activeElem.setAttribute("myBnd", cw.CheckedBND)

            activeElem.setAttribute("class", "symbolElem")

            domActiveElemG.appendChild(activeElem)
            activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")
            DrawX.style("display", "inline")
            DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")

            SymbolCenter =[SVGx, SVGy]
            activeElem.style.cursor = "move"
            activeElem.setAttribute("class", "dragTargetObj")
            activeElem.setAttribute("pointer-events", null)
            mySVG.removeAttribute('onclick')
            mySVG.style.cursor = ""
            mySVG.setAttribute("onmousedown", "startDragSymbol(evt)")
            mySVG.setAttribute("onmousemove", "dragSymbol(evt)") //;showStarComment(evt)
            mySVG.setAttribute("onmouseup", "endDragSymbol(evt)")

        if(cw.drawSymbolShadowCheck.checked==true)
            activeElem.setAttribute("filter", "url(#drop-shadow)")


        cw.drawSymbolCancelButton.disabled = false
        cw.drawSymbolFinishButton.disabled = false

    }
}
function symbolNativeScaleSelected()
{
    var cw = addElemSymbolCw
    var nativeScale = cw.symbolNativeScaleSelect.options[cw.symbolNativeScaleSelect.selectedIndex].text
    if(ActiveElem)
    {
        activeElem.setAttribute("nativeScale", nativeScale)
        for(var k = 0; k<activeElem.childNodes.length; k++)
            activeElem.childNodes.item(k).setAttribute("transform", "scale("+nativeScale+")")
    }
}

function drawSymbolShadowChecked()
{

    var cw = addElemSymbolCw
    if(cw.drawSymbolShadowCheck.checked==true)
    {
        if(activeElem)
            activeElem.setAttribute("filter", "url(#drop-shadow)")

    }
    else
    {
        if(activeElem)
            activeElem.removeAttribute("filter")

    }

}


function finishDrawSymbol()
{

    if(EditSymbol==true)
        finishEditSymbol()
        else if(ActiveElem)
        {
            var cw = addElemSymbolCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()
            //---time stamp @ id---
            var utcMS = new Date().getTime()
            var id = "symbol"+utcMS
            var finishedElem = activeElem.cloneNode(true)
            finishedElem.id = id
            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(activeElem)


            finishedElem.setAttribute("onmousedown", "editSymbolDraw("+id+",evt)")


            var nativeScale = +finishedElem.getAttribute("nativeScale")




                finishedElem.setAttribute("class", "symbolElem")


            if(cw.drawSymbolShadowCheck.checked==true)
                finishedElem.setAttribute("filter", "url(#drop-shadow)")


                ActiveElem = null
                activeElem = null



            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "plantSymbol(event)") //---click to add more icons for this session---
            DrawX.style("display", "none")

            cw.drawSymbolFinishButton.disabled = true
            cw.drawSymbolCancelButton.disabled = true

            domElemG.appendChild(finishedElem)


        }
}

function cancelDrawSymbol()
{
    var cw = addElemSymbolCw
    if(EditSymbol==true)
        cancelEditSymbol()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null
            // d3SVG.style("cursor", "default")
            ActiveElem = null

            mySVG.setAttribute("onclick", "plantSymbol(event)")

            cw.drawSymbolFinishButton.disabled = true
            cw.drawSymbolCancelButton.disabled = true
            coverOff()

        }
        commentDiv.style.visibility = "hidden"

        cw.drawSymbolCancelButton.style.borderColor = ""

}
//====================edit/update circle===============================

var EditSymbol = false
var DrawSymbolEditId
var EditThisSymbol
//--dblclick on circle---
function editSymbolDraw(elemObjEdit,evt)
{

    var isRightMB;
    var evtW = window.event;
    if(evtW)
    {
        isRightMB = evtW.which == 3;
        if (!isRightMB) // IE, Opera
            isRightMB = evtW.button == 2;
    }
    else //---firefox--
        isRightMB = evt.which == 3;

    if(isRightMB&&DrawCircle==false&&ZoomDrawing==false)
    {
            EditThisSymbol = elemObjEdit

            DrawSymbolEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

            ActiveElem = null
            activeElem = null

            EditSymbol = true
            if(addElemSymbolLoad==false)
            {
                openIframe("AddElem", "addElemSymbol", 10)

            }
            else if(addElemSymbolViz==false)
            {
                openIframe("AddElem", "addElemSymbol", 10)
                setEditSymbol()
            }
            else
                setEditSymbol()
        }
    if(isRightMB&&ZoomDrawing==true) //---zoom drag
    {
        mySVG.setAttribute("onmousedown", "startDragZoom(evt)")
        mySVG.setAttribute("onmousemove", "dragZoom(evt)")
        mySVG.setAttribute("onmouseup", "endDragZoom(evt)")
        d3.select("#mySVG").on("mousedown.zoom", null)

        var dragTarget = evt.target

        var classed = dragTarget.getAttribute("class")
        dragTarget.setAttribute("class", "dragTargetObj")
        dragTarget.removeAttribute("onmousedown")
        dragTarget.setAttribute("style", "cursor:move")
        dragTarget.setAttribute("opacity", .4)
        DrawX.style("display", "none")
        ZoomDraggedElems.push([dragTarget, "editSymbolDraw("+dragTarget.id+",evt)", classed])
    }}
//---after iframe loaded see sendSize() at addElemSymbol.htm---
var EditSymbolObj
function setEditSymbol()
{
    coverOn()
    EditSymbol = true
    mySVG.removeAttribute('onclick')
    var cw = addElemSymbolCw
    var elemObjEdit = document.getElementById(DrawSymbolEditId)

    EditSymbolObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditSymbolObj.setAttribute("id", "activeElem")
    EditSymbolObj.setAttribute("class", "dragTargetObj")
    EditSymbolObj.removeAttribute("onmouseover")
    EditSymbolObj.removeAttribute("onmouseout")
    EditSymbolObj.removeAttribute("onmousedown")


            EditSymbolObj.style.cursor = "move"

            domActiveElemG.appendChild(EditSymbolObj)
            ActiveElem = d3.select("#activeElem")
            activeElem = document.getElementById("activeElem")
            cw.drawSymbolDeleteButton.style.visibility = "visible"
            cw.drawSymbolEditSpan.innerText = "Edit Symbol"
            var myBnd = activeElem.getAttribute("myBnd")
            cw.CheckedBND = myBnd
            cw.SelectedSymbol = cw.document.getElementById("band_"+myBnd)

            var changeTD = cw.document.getElementById("td"+myBnd)
            changeTD.style.backgroundColor = "orange"
            cw.drawSymbolCancelButton.disabled = false
            cw.drawSymbolFinishButton.disabled = false

            var changeCheck = cw.document.getElementById("request"+myBnd+"Check")
            changeCheck.checked = true
            var nativeScale = activeElem.getAttribute("nativeScale")
            var scaleSelect = cw.symbolNativeScaleSelect
            for(var k = 0; k<scaleSelect.options.length; k++)
        {
            var text = scaleSelect.options[k].text
            if(text==nativeScale)
            {
                scaleSelect.selectedIndex = k
                cw.SelelectedScale = nativeScale
                break
            }

        }



         if(EditSymbolObj.getAttribute("filter"))
           cw.drawSymbolShadowCheck.checked=true
          else
           cw.drawSymbolShadowCheck.checked=false



            var matrix = activeElem.transform.baseVal.consolidate().matrix;

        var transX = matrix.e
        var transY = matrix.f
        DrawX.attr("transform", "translate("+transX+" "+transY+")")

            
            ActiveElem.style("cursor", "move")
            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")


            mySVG.removeAttribute('onclick')
            //---timeout??---
            mySVG.setAttribute("onmousedown", "startDragSymbol(evt)")
            mySVG.setAttribute("onmousemove", "dragSymbol(evt)")
            mySVG.setAttribute("onmouseup", "endDragSymbol(evt)")

}

function finishEditSymbol()
{

    if(ActiveElem)
    {
        var cw = addElemSymbolCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "symbolElem")



        finishedElem.setAttribute("id", DrawSymbolEditId)

        if(cw.drawSymbolShadowCheck.checked==true)
            finishedElem.setAttribute("filter", "url(#drop-shadow")
            else
             finishedElem.removeAttribute("filter")







        domActiveElemG.removeChild(document.getElementById("activeElem"))
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("onmousedown", "editSymbolDraw("+DrawSymbolEditId+",evt)")
        finishedElem.setAttribute("id", DrawSymbolEditId)
        domElemG.insertBefore(finishedElem, EditThisSymbol)
        domElemG.removeChild(EditThisSymbol)



        closeDrawSymbol()
    }

}

function resetEditSymbol()
{

    var cw = addElemSymbolCw

    document.getElementById(DrawSymbolEditId).setAttribute("opacity", 1)

    EditSymbol = false
    cw.editSymbolSpan.innerText = "Draw Symbols"
    cw.drawSymbolTopTable.style.backgroundColor = "honeydew"
    ActiveElem = null
    activeElem = null
    starG.appendChild(dragDot) //--place drag dot on top---
    DrawX.style("display", "none")
    DrawX.attr("stroke", "honeydew")
    DragDot.style("visibility", "hidden")

    cw.drawSymbolDeleteButton.style.visibility = "hidden"
    cw.drawSymbolCancelButton.disabled = false
    cw.drawSymbolFinishButton.disabled = false
    DrawSymbol = true
    mySVG.setAttribute('onclick', "placeDrawSymbol()")


}

function cancelEditSymbol()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawSymbolEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null
    commentDiv.style.visibility = "hidden"
    ActiveElem = null
    starG.appendChild(dragDot) //--place drag dot on top---
    closeDrawSymbol()
    //setEditSymbol()

}


var CircleDeleted = false
//---button---
function removeCurrentDrawSymbol()
{

    domActiveElemG.removeChild(activeElem)
    var elemObjEdit = document.getElementById(DrawSymbolEditId)
    domElemG.removeChild(elemObjEdit)
    SymbolDeleted = true



    closeDrawSymbol()

}
