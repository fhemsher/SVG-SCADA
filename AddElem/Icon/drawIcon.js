function closeDrawIcon()
{
    if(addElemIconViz==true)
    {
        DrawX.style("display", "none")
        closeIframe("addElemIcon");
        mySVG.removeAttribute("onclick")
        var cw = addElemIconCw
        cw.topBotDiv.style.visibility="hidden"
        IconActiveElem=null
        for(var k = 0; k<IconDrawArray.length; k++)
        {

                IconDrawArray[k].setAttribute("onmousedown", "editIconStart(evt)")
                IconDrawArray[k].setAttribute("class", "iconElem")
                IconDrawArray[k].setAttribute("cursor", "default")
                IconDrawArray[k].removeAttribute("onclick")

        }
        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")
        cw.deleteIconCheck.checked = false
        cw.dragIconCheck.checked = false
        cw.resizeIconCheck.checked = false
        cw.colorIconCheck.checked = false
        cw.undoButton.disabled = true
    cw.drawIconTopButton.style.borderStyle=""
    cw.drawIconBotButton.style.borderStyle=""
    IconTop=false
    IconBot=false
        DragIcons = false
        DeleteIcons = false
        ResizeIcons = false
        ColorIcons = false

         cw.containerDiv.style.background="linen"
         cw.iconDrawSpan.innerHTML="Select & Plant Icons"
         cw.editIconSpan.innerHTML="Select icon button, choose color/size, then click on drawing to plant it."

        var buttons = cw.document.getElementsByTagName("button")
        for(var k = 1; k<buttons.length; k++)
            buttons[k].style.borderStyle = ""
            cw.IconObj = null

    }
    coverOff()

}

var IconActiveElem
function editIconStart(evt)
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

         var cw = addElemIconCw
          IconActiveElem=evt.target



           cw.topBotDiv.style.visibility="visible"
         if(addElemIconLoad)
         {
              openIframe("AddElem", "addElemIcon", 0)
             cw.containerDiv.style.background="orange"
             cw.iconDrawSpan.innerHTML="Edit Icons"
             cw.editIconSpan.innerHTML="Select a checkbox below to choose the specific edit type. Then click on icon to edit it."

         }
         else //--allow time to create icons---
         {
            openIframe("AddElem", "addElemIcon", 0)

         }
    //cw.dragIconCheck.checked=true
         //dragIconChecked()
    }
    if(isRightMB&&ZoomDrawing==true ) //---zoom drag
    {
        mySVG.setAttribute("onmousedown", "startDragZoom(evt)")
        mySVG.setAttribute("onmousemove", "dragZoom(evt)")
        mySVG.setAttribute("onmouseup", "endDragZoom(evt)")
        d3.select("#mySVG").on("mousedown.zoom", null)

        var dragTarget=evt.target

        var classed=dragTarget.getAttribute("class")
        dragTarget.setAttribute("class", "dragTargetObj")
        dragTarget.removeAttribute("onmousedown")
        dragTarget.setAttribute("style","cursor:move")
       dragTarget.setAttribute("opacity",.4)
        DrawX.style("display", "none")

        ZoomDraggedElems.push([dragTarget,"editIconDraw("+dragTarget.id+",evt)",classed])
    }

}
function startIconDraw()
{
      IconDrawArray=[]
        for(var k = 0; k<domElemG.childNodes.length; k++)
                {
                        symbol = domElemG.childNodes[k]
                        if(symbol.getAttribute("class")=="iconElem")
                        {
                                IconDrawArray.push(symbol)
                        }
                }
    mySVG.setAttribute("onclick", "plantIcon(event)")

}

//---click on app svg---
var IconDrawArray =[]

function plantIcon(event)
{
    var cw = addElemIconCw


    if(cw.PlantUnicode)
    {
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
                ActiveElem = ElemG.append("text")
                .attr("id", "icon"+utcMS)
                .attr("class", "iconElem")
                .attr("font-size", fontSize)
                .attr("font-family", "Arial Unicode MS")
                .attr("stroke-width", strokeWidth)
                .attr("fill", fill)
                .attr("stroke", "black")
                .text(String.fromCharCode(code))

                var sizeMe = document.getElementById("icon"+utcMS)
                var bb = sizeMe.getBBox()
                ActiveElem.attr("x", -(bb.x+.5*bb.width))
                ActiveElem.attr("y", -(bb.y+.5*bb.height))
                ActiveElem.attr("transform", "translate("+SVGx+" "+SVGy+")")

                DrawX.style("display", "inline")
                DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")

                IconDrawArray.push(sizeMe)
                cw.undoButton.disabled = false
               // cw.deleteIconCheck.disabled = false
                //cw.dragIconCheck.disabled = false

                ActiveElem = null
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
        if(ShadowIcons==false&&ActiveElem==null&&EditIcon==false && IconDeleted==false&&DragIcons==false&&DeleteIcons==false&&ResizeIcons==false&&ColorIcons==false&&IconTop==false&&IconBot==false)
        {
            DrawX.style("display", "inline")
            DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
        }
    }
}
var DragIcons = false
function dragIconChecked()
{
    var cw = addElemIconCw
    if(cw.dragIconCheck.checked==true)
    {
        DragIcons = true
        DrawX.style("display", "none")
        mySVG.removeAttribute("onclick")

        mySVG.setAttribute("onmousedown", "startDragIcon(evt)")
        mySVG.setAttribute("onmousemove", "dragIcon(evt)")
        mySVG.setAttribute("onmouseup", "endDragIcon(evt)")
        cw.deleteIconCheck.checked = false
        cw.resizeIconCheck.checked = false
        cw.colorIconCheck.checked = false
        cw.shadowIconCheck.checked = false
    cw.drawIconTopButton.style.borderStyle=""
    cw.drawIconBotButton.style.borderStyle=""
    IconTop=false
    IconBot=false
        ShadowIcons = false
        DeleteIcons = false
        ResizeIcons = false
        ColorIcons = false
     
        for(var k = 0; k<IconDrawArray.length; k++)
        {
            var symbol = IconDrawArray[k]

            symbol.removeAttribute("onclick")

            symbol.setAttribute("cursor", "move")
            symbol.setAttribute("class", "dragTargetObj")

        }

    }
    else
    {
        DragIcons = false
        mySVG.setAttribute("onclick", "plantIcon(event)")
        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")

    }

}
var ResizeIcons = false
function resizeIconChecked()
{
    var cw = addElemIconCw
    if(cw.resizeIconCheck.checked==true)
    {
        ResizeIcons = true
        DrawX.style("display", "none")
        mySVG.removeAttribute("onclick")

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")
        cw.deleteIconCheck.checked = false
        cw.dragIconCheck.checked = false
        cw.colorIconCheck.checked = false
        cw.shadowIconCheck.checked = false
    cw.drawIconTopButton.style.borderStyle=""
    cw.drawIconBotButton.style.borderStyle=""
    IconTop=false
    IconBot=false
        ShadowIcons = false
        DeleteIcons = false
        DragIcons = false
        ColorIcons = false
            for(var k = 0; k<IconDrawArray.length; k++)
                {
                        symbol = IconDrawArray[k]
                        symbol.setAttribute("cursor", "default")
                        symbol.setAttribute("class", "iconElem")
                        symbol.setAttribute("onclick", "resizeIcon(evt)")

                }


    }
    else
    {
        ResizeIcons = false
        mySVG.setAttribute("onclick", "plantIcon(event)")

    }

}
function resizeIcon(evt)
{
    var cw = addElemIconCw
    var icon = evt.target

    var fontSize = +cw.drawIconFontSizeSelect[cw.drawIconFontSizeSelect.selectedIndex].text

    icon.setAttribute("font-size", fontSize)
}

var ShadowIcons = false
function shadowIconChecked()
{
    var cw = addElemIconCw
    if(cw.shadowIconCheck.checked==true)
    {
        ShadowIcons = true
        DrawX.style("display", "none")
        mySVG.removeAttribute("onclick")

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")
        cw.deleteIconCheck.checked = false
        cw.dragIconCheck.checked = false
        cw.colorIconCheck.checked = false
        cw.resizeIconCheck.checked = false
    cw.drawIconTopButton.style.borderStyle=""
    cw.drawIconBotButton.style.borderStyle=""
    IconTop=false
    IconBot=false
        ResizeIcons = false
        DeleteIcons = false
        DragIcons = false
        ColorIcons = false
            for(var k = 0; k<IconDrawArray.length; k++)
                {
                        symbol = IconDrawArray[k]
                        symbol.setAttribute("cursor", "default")
                        symbol.setAttribute("class", "iconElem")
                        symbol.setAttribute("onclick", "shadowIcon(evt)")

                }



    }
    else
    {
        ShadowIcons = false
        mySVG.setAttribute("onclick", "plantIcon(event)")

    }

}
function shadowIcon(evt)
{
    var cw = addElemIconCw
    var icon = evt.target

    icon.setAttribute("filter", "url(#drop-shadow)")
}

var ColorIcons = false
function colorIconChecked()
{
    var cw = addElemIconCw
    if(cw.colorIconCheck.checked==true)
    {
        ColorIcons = true
        DrawX.style("display", "none")
        mySVG.removeAttribute("onclick")

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")
        cw.deleteIconCheck.checked = false
        cw.dragIconCheck.checked = false
        cw.resizeIconCheck.checked = false
        cw.shadowIconCheck.checked = false
    cw.drawIconTopButton.style.borderStyle=""
    cw.drawIconBotButton.style.borderStyle=""
    IconTop=false
    IconBot=false
        ShadowIcons = false
        DeleteIcons = false
        DragIcons = false
        ResizeIcons = false

            for(var k = 0; k<IconDrawArray.length; k++)
                {
                        symbol = IconDrawArray[k]
                        symbol.setAttribute("cursor", "default")
                        symbol.setAttribute("class", "iconElem")
                        symbol.setAttribute("onclick", "colorIcon(evt)")

                }


    }
    else
    {
        ColorIcons = false
        mySVG.setAttribute("onclick", "plantIcon(event)")

    }

}
function colorIcon(evt)
{
    var cw = addElemIconCw

    var icon = evt.target
    var clr = cw.drawIconFillColorSelect.options[cw.drawIconFillColorSelect.selectedIndex].value
    icon.setAttribute("fill", clr)

}

var DeleteIcons = false
function deleteIconChecked()
{
    var cw = addElemIconCw
    if(cw.deleteIconCheck.checked==true)
    {
        DeleteIcons = true
        DrawX.style("display", "none")
        mySVG.removeAttribute("onclick")

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")
        cw.dragIconCheck.checked = false
        cw.resizeIconCheck.checked = false
        cw.colorIconCheck.checked = false
        cw.shadowIconCheck.checked = false
    cw.drawIconTopButton.style.borderStyle=""
    cw.drawIconBotButton.style.borderStyle=""
    IconTop=false
    IconBot=false
        ShadowIcons = false
        ColorIcons = false
        DragIcons = false
        ResizeIcons = false

        cw.dragIconCheck.checked = false
            for(var k = 0; k<IconDrawArray.length; k++)
                {
                        symbol = IconDrawArray[k]
                        symbol.setAttribute("cursor", "default")
                        symbol.setAttribute("class", "iconElem")
                        symbol.setAttribute("onclick", "deleteIcon(evt)")

                }


    }
    else
    {


        for(var k = 0; k<domElemG.childNodes.length; k++)
        {
            if(domElemG.childNodes[k].getAttribute("class")=="iconElem")
                domElemG.childNodes[k].removeAttribute("onclick")


        }

    }
}

function deleteIcon(evt)
{
    var cw = addElemIconCw
    target = evt.target
    domElemG.removeChild(target)
    IconDrawArray =[]
    for(var k = 0; k<domElemG.childNodes.length; k++)
        if(domElemG.childNodes[k].getAttribute("class")=="iconElem")
            IconDrawArray.push(domElemG.childNodes[k])

    if(IconDrawArray.length==0)
    {
        cw.undoButton.disabled = true
        //cw.deleteIconCheck.disabled = true
        //cw.dragIconCheck.disabled = true
        //cw.resizeIconCheck.disabled = true
        //cw.colorIconCheck.disabled = true
    cw.drawIconTopButton.style.borderStyle=""
    cw.drawIconBotButton.style.borderStyle=""
    IconTop=false
    IconBot=false
        cw.deleteIconCheck.checked = false
        cw.dragIconCheck.checked = false
        cw.resizeIconCheck.checked = false
        cw.colorIconCheck.checked = false
        cw.shadowIconCheck.checked = false
        ShadowIcons = false
        DragIcons = false
        DeleteIcons = false
        ResizeIcons = false
        ColorIcons = false
        setTimeout('mySVG.setAttribute( "onclick","plantIcon(event)")', 800)
    }
}
//====================Top/Bot===================
var IconTop=false
function topDrawIcon()
{
       domElemG.appendChild(IconActiveElem)
      closeDrawIcon()

}


var IconBot=false
function botDrawIcon()
{
     domElemG.insertBefore(IconActiveElem,domElemG.firstChild)
     closeDrawIcon()
}


function undoIconButtonClicked()
{
    var cw = addElemIconCw
    if(IconDrawArray.length>0)
    {
        var undoMe = IconDrawArray[IconDrawArray.length-1]
        IconDrawArray.pop()
        domElemG.removeChild(undoMe)

    }
    if(IconDrawArray.length==0)
    {
        cw.undoButton.disabled = true
        //cw.deleteIconCheck.disabled = true
        //cw.dragIconCheck.disabled = true

        //cw.deleteIconCheck.checked = false
        //cw.dragIconCheck.checked = false

    }

}
