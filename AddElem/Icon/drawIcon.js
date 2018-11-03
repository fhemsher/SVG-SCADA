function closeDrawIcon()
{
    if(addElemIconViz==true)
    {
        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        closeIframe("addElemIcon");
        mySVG.removeAttribute("onclick")
        var cw = addElemIconCw
         cw.PlantUnicode=null
        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")
        ActiveElem=null
        DrawIcon=false
        EditIcon=false
        ActiveIconId=null

        cw.containerDiv.style.background = "linen"
        cw.iconDrawSpan.innerHTML = "Select & Plant Icons"
        //cw.editIconSpan.innerHTML = "Select icon button, choose color/size, then click on drawing to plant it."

        var buttons = cw.drawIconButtonDiv.getElementsByTagName("button")
        for(var k = 0; k<buttons.length; k++)
        {
            buttons[k].style.borderStyle = ""
            buttons[k].style.borderColor = ""

        }

            cw.IconObj = null
                           cw.drawIconTopTable.style.backgroundColor = "linen"
                 cw.iconDrawSpan.innerHTML="Select & Plant Icons"
            cw.drawIconDeleteButton.style.visibility="hidden"
            cw.cancelDrawIconButton.disabled=true
            cw.finishDrawIconButton.disabled=true

    }
    coverOff()

}

var IconActiveElem


var  DrawIcon=false
function startIconDraw()
{     DrawIcon=true
     coverOn()
    mySVG.setAttribute("onclick", "plantIcon(event)")

}

//---click on app svg---
var ActiveIconId
function plantIcon(event)
{
    var cw = addElemIconCw
       if(cw.PlantUnicode)
        {

                cw.finishDrawIconButton.disabled=false
            cw.cancelDrawIconButton.disabled=false

        var unicode = cw.PlantUnicode

        for(var k = 0; k<cw.IconUnicode.length; k++)
        {
            var myCode = cw.IconUnicode[k]


            if(myCode==unicode)
            {

                var code = parseInt(myCode, 16)
                //var textNode=document.createTextNode(String.fromCharCode(code))
                var fontSize = +cw.drawIconFontSizeSelect[cw.drawIconFontSizeSelect.selectedIndex].text

                var strokeFactor = .02
                var strokeWidth = strokeFactor*fontSize

                var strokeWidth = strokeFactor*fontSize
                var fill = cw.drawIconFillColorSelect.options[cw.drawIconFillColorSelect.selectedIndex].value

                var utcMS = new Date().getTime()

                 ActiveIconId= "icon"+utcMS
                ActiveElem = ActiveElemG.append("text")
                .attr("id", "icon"+utcMS)
                .attr("class", "iconElem")
                .attr("font-size", fontSize)
                .attr("font-family", "Arial Unicode MS")
                .attr("stroke-width", strokeWidth)
                .attr("fill", fill)
                .attr("stroke", "black")
                .attr("code", code)
                .text(String.fromCharCode(code))

                var sizeMe = document.getElementById("icon"+utcMS)
                var bb = sizeMe.getBBox()
                ActiveElem.attr("x", -(bb.x+.5*bb.width))
                ActiveElem.attr("y", -(bb.y+.5*bb.height))

                       if(cw.drawIconShadowCheck.checked==true)
                            ActiveElem.attr("filter", "url(#drop-shadow)")



                        ActiveElem.attr("transform", "translate("+SVGx+" "+SVGy+")")
                        DrawX.style("display", "inline")
                        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")

                        CircleCenter =[SVGx, SVGy]
                        ActiveElem.style("cursor", "move")
                        ActiveElem.attr("class", "dragTargetObj")
                        ActiveElem.attr("pointer-events", null)



                mySVG.removeAttribute('onclick')
                mySVG.style.cursor = ""
                mySVG.setAttribute("onmousedown", "startDragIcon(evt)")
                mySVG.setAttribute("onmousemove", "dragIcon(evt)") //;showStarComment(evt)
                mySVG.setAttribute("onmouseup", "endDragIcon(evt)")

                break

            }

        }

    }
}

//---on add icon DrawX follows cursor
var EditIcon = false
var IconDeleted = false

function trackDrawIcon()
{
    var cw = addElemIconCw
    if(cw.PlantUnicode)
    {
        if(ActiveElem==null&&EditIcon==false && IconDeleted==false)
        {
            DrawX.style("display", "inline")
            DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
        }
    }
}

function drawIconFontSizeSelected()
{

    if(ActiveElem)
    {
        var cw = addElemIconCw
        var fontSize=+cw.drawIconFontSizeSelect.options[cw.drawIconFontSizeSelect.selectedIndex].text

        ActiveElem.attr("font-size", fontSize)
        var strokeFactor = .02
        var strokeWidth = strokeFactor*fontSize
        ActiveElem.attr("stroke-width", strokeWidth)

        if(EditIcon)
            var sizeMe = document.getElementById("activeElem")
        else
            var sizeMe = document.getElementById(ActiveIconId)

        var myX=+sizeMe.getAttribute("x")
        var myY=+sizeMe.getAttribute("y")



        var bb = sizeMe.getBBox()
        if(EditIcon==false)
        {
            ActiveElem.attr("x", -(bb.x+.5*bb.width)+myX)
            ActiveElem.attr("y", -(bb.y+.5*bb.height)+myY)
        }
        else
        {
            ActiveElem.attr("x", -(bb.x+.5*bb.width)+myX)
            ActiveElem.attr("y", -(bb.y+.5*bb.height)+myY)

        }
    }

}
function drawIconShadowChecked()
{

    var cw = addElemIconCw
    if(cw.drawIconShadowCheck.checked==true)
    {
        if(ActiveElem)
            ActiveElem.attr("filter", "url(#drop-shadow)")

    }
    else
    {
        if(ActiveElem)
            ActiveElem.attr("filter",null)

    }

}


var IconType="dingbat"
var Unicode
function finishDrawIcon()
{

    if(EditIcon==true)
        finishEditIcon()
        else if(document.getElementById(ActiveIconId))
        {coverOff()
            var cw = addElemIconCw
            document.getElementById(ActiveIconId).removeAttribute("class")

            var finishedElem = document.getElementById(ActiveIconId).cloneNode(true)
            domActiveElemG.removeChild(document.getElementById(ActiveIconId))




            finishedElem.style.cursor = "default"


            finishedElem.removeAttribute("onmouseup")

            finishedElem.setAttribute("onmousedown", "editIconDraw("+ActiveIconId+",evt)")



                finishedElem.setAttribute("class", "iconElem")
                finishedElem.setAttribute("iconType", IconType)
                finishedElem.setAttribute("unicode", Unicode)
               if(cw.drawIconShadowCheck.checked==true)
                finishedElem.setAttribute("filter", "url(#drop-shadow)")

                    ActiveElem = null
                    activeElem = null

                    //d3SVG.style("cursor", "default")
                    mySVG.setAttribute('onclick', "plantIcon(event)") //---click to add more icons for this session---

                    DrawX.attr("transform", null)
                    DrawX.style("display", "none")
                    cw.finishDrawIconButton.disabled = true
                    cw.cancelDrawIconButton.disabled = true
                   domElemG.appendChild(finishedElem)
        }
}

function cancelDrawIcon()
{
    if(EditIcon==true)
        cancelEditIcon()
        else if(ActiveIconId&&document.getElementById(ActiveIconId))
        {
            domActiveElemG.removeChild(document.getElementById(ActiveIconId))

            activeElem = null
            //d3SVG.style("cursor", "default")
            ActiveElem = null

            mySVG.setAttribute('onclick', "plantIcon(event)") //---click to add more icons for this session---
            //DrawX.style("display","none")
            var cw = addElemIconCw
            cw.finishDrawIconButton.disabled = true
            cw.cancelDrawIconButton.disabled = true
            coverOff()
            domWrapper.style.display = "none"
             cw.drawIconCommentValue.value="Icon comment goes here(optional)..."
        }
}
//====================edit/update icon===============================

var EditIcon = false
var DrawIconEditId
var EditThisIcon
var DrawIconEditScale
function editIconDraw(elemObjEdit,evt) //--onmousedown on icon---
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

    if(isRightMB&&ZoomDrawing==false)
    {

            EditThisIcon = elemObjEdit

            DrawIconEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

            ActiveIconId=DrawIconEditId
            //d3SVG.style("cursor", "default")
            ActiveElem = null

            EditIcon = true
            if(addElemIconLoad==false)
            {
                openIframe("AddElem", "addElemIcon", 10)

            }
            else if(addElemIconViz==false)
            {
                openIframe("AddElem", "addElemIcon", 10)
                setEditIcon()
            }
            else
                setEditIcon()
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
        ZoomDraggedElems.push([dragTarget, "editIconDraw("+dragTarget.id+",evt)", classed])
    }

}
//---after iframe loaded see sendSize() at addElemIcon.htm---
var EditIconObj
function setEditIcon()
{
    coverOn()

    EditIconObj = EditThisIcon.cloneNode(true)
    var cw = addElemIconCw


    mySVG.removeAttribute('onclick')

    var elemObjEdit = document.getElementById(DrawIconEditId)

    // var initZoom = parseInt(elemObjEdit.getAttribute("InitZoom"), 10)
    // MyMap.setZoom(initZoom)

    elemObjEdit.style.visibility = "hidden"
    EditIconObj.setAttribute("id", "activeElem")
    EditIconObj.setAttribute("class", "dragTargetObj")
    EditIconObj.removeAttribute("onmousedown")


                EditIconObj.style.cursor = "move"

                domActiveElemG.appendChild(EditIconObj)
                ActiveElem = d3.select("#activeElem")
                activeElem = document.getElementById("activeElem")



                cw.drawIconTopTable.style.backgroundColor = "orange"
                 cw.iconDrawSpan.innerHTML="Edit This Icon"
                cw.drawIconDeleteButton.style.visibility = "visible"
                cw.finishDrawIconButton.disabled = false
                cw.cancelDrawIconButton.disabled = false
                //---set values in selections ---
                var fontSize = EditIconObj.getAttribute("font-size")
                var fill = EditIconObj.getAttribute("fill")
                 var iconText=cw.drawIconButtonDiv.getElementsByTagName("text")
                for(var k=0;k<iconText.length;k++)
                {
                   var icon=iconText[k]
                   icon.setAttribute("fill",fill)
                }

          if(EditIconObj.getAttribute("filter"))
           cw.drawIconShadowCheck.checked=true
          else
           cw.drawIconShadowCheck.checked=false
                    setIconButton()


               // setSelect("Icon", "", alias) //drawIconSelect
                setSelect("Icon", "FontSize", fontSize)
                setSelect("Icon", "FillColor", fill)
                //---update bg colors---
                cw.drawIconFillBg.style.backgroundColor = fill

                   var matrix = activeElem.getCTM()

                        var transX = matrix.e
                        var transY = matrix.f

                        DrawX.attr("stroke", "darkorange")
                        DrawX.style("display", "inline")
                        DrawX.attr("transform", ActiveElem.attr("transform"))

                //d3SVG.style("cursor", "default")
                ActiveElem.style("cursor", "move")

                mySVG.removeAttribute('onclick')
                //---timeout??---
                mySVG.setAttribute("onmousedown", "startDragIcon(evt)")
                mySVG.setAttribute("onmousemove", "dragIcon(evt)")
                mySVG.setAttribute("onmouseup", "endDragIcon(evt)")

}

function setIconButton()
{
    var cw = addElemIconCw

    var iconType = EditIconObj.getAttribute("iconType")
    for(var k=0;k<cw.unicodeTypeSelect.options.length;k++)
    {
        var type=cw.unicodeTypeSelect.options[k].value
        if(type==iconType)
        {
            cw.unicodeTypeSelect.selectedIndex=k
            cw.unicodeTypeSelected()
            break
        }
    }

    var unicode = EditIconObj.getAttribute("unicode")
    cw.PlantUnicode=unicode
    var buttonTable=eval("cw."+iconType+"Table")

    var buttons=buttonTable.getElementsByTagName("button")
    var unicodeButton="button"+unicode

    for(var k=0;k<buttons.length;k++)
    {
        var buttonId=buttons[k].id
        if(buttonId==unicodeButton)
        {
            buttons[k].style.borderStyle="inset"
            buttons[k].style.borderColor="violet"
            //----scroll button to top----
            buttons[k].scrollIntoView();
            break;
        }
    }

}

function finishEditIcon()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemIconCw
        activeElem.removeAttribute("class")

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "iconElem")

        if(cw.drawIconShadowCheck.checked==true)
            finishedElem.setAttribute("filter", "url(#drop-shadow")
            else
             finishedElem.removeAttribute("filter")



            finishedElem.style.cursor = "default"




         // finishedElem.setAttribute("alias", alias) //--used in edit--


        domActiveElemG.removeChild(document.getElementById("activeElem"))



            UpdateThisIcon = finishedElem
            finishedElem.removeAttribute("onmouseup")
            finishedElem.setAttribute("onmousedown", "editIconDraw("+DrawIconEditId+",evt)")
            finishedElem.setAttribute("id", DrawIconEditId)
            domElemG.insertBefore(finishedElem, EditThisIcon)
            domElemG.removeChild(EditThisIcon)





        closeDrawIcon()

    }
}
function resetEditIcon()
{

    var cw = addElemIconCw
    EditIcon = false
    cw.editIconSpan.innerText = "Add Icon(s)"
    cw.drawIconTopTable.style.backgroundColor = "linen"
    ActiveElem = null
    activeElem = null

    //d3SVG.style("cursor", "default")
    DrawX.style("display", "none")
    DrawX.attr("stroke", "violet")


    cw.finishDrawIconButton.disabled = true
    cw.cancelDrawIconButton.disabled = true
    DrawIcon = true
    mySVG.setAttribute('onclick', " placeDrawIcon()")

    //---click to add more icons for this session---

}

function cancelEditIcon()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawIconEditId)
    elemObjEdit.style.visibility = "visible"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    ActiveElem = null
    activeElem = null
    setEditIcon()
}



//=======================delete icon==================

var IconDeleted = false
//---button---
function removeCurrentDrawIcon()
{

    domActiveElemG.removeChild(activeElem)
    var elemObjEdit = document.getElementById(DrawIconEditId)
    domElemG.removeChild(elemObjEdit)
    IconDeleted = true
   closeDrawIcon()
}
