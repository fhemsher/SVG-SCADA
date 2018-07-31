function closeDrawPgon()
{
    if(addElemPgonViz==true)
    {
        DrawX.style("display", "none")
        closeIframe("addElemPgon");
        mySVG.removeAttribute("onclick")
        var cw = addElemPgonCw
        //PgonDrawArray =[]

        for(var k = 0; k<domElemG.childNodes.length; k++)
        {
            var symbol=domElemG.childNodes[k]
            if(symbol.id.indexOf("symbol")!=-1)
            {
                symbol.setAttribute("cursor", "default")
                symbol.setAttribute("class", "pgonElem")
                symbol.setAttribute("onmousedown", "editPgonStart(evt)")
                symbol.removeAttribute("onclick")
            }
        }


        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")
        cw.deleteSymbolCheck.checked = false
        cw.dragSymbolCheck.checked = false
        cw.resizeSymbolCheck.checked = false
        cw.colorSymbolCheck.checked = false
        cw.undoButton.disabled = true
        cw.drawSymbolTopButton.style.borderStyle=""
        cw.drawSymbolBotButton.style.borderStyle=""
        SymbolTop = false
        SymbolBot = false

        DragSymbols = false
        DeleteSymbols = false
        ResizeSymbols = false
        ColorSymbols = false
        if(cw.PlantMeId)
        {
            var myDiv = cw.document.getElementById(cw.PlantMeId+"Div")
            myDiv.style.borderWidth = ""
            myDiv.style.borderStyle = ""
            myDiv.style.borderColor = ""
            cw.PlantMeId = null

        }
    }
    coverOff()

}
function editPgonStart(evt)
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

    if(isRightMB&&ZoomDrawing==false )
    {
        //openIframe("AddElem", "addElemPgon", 0)
       openAddPgonDraw()
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

        ZoomDraggedElems.push([dragTarget,"editPgonStart(evt)",classed])
    }

}

function startPgonDraw()
{

    mySVG.setAttribute("onclick", "plantPgonSymbol(event)")

}
//---on add icon DrawX follows cursor
var EditPgon = false
var PgonDeleted = false

function trackDrawPgon()
{
    var cw = addElemPgonCw
    if(cw.PlantMeId)
    {
        if(ShadowSymbols==false&&ActiveElem==null&&EditPgon==false && PgonDeleted==false&&DragSymbols==false&&DeleteSymbols==false&&ResizeSymbols==false&&ColorSymbols==false&&SymbolTop==false&&SymbolBot==false)
        {
            DrawX.style("display", "inline")
            DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
        }
    }
}
var DragSymbols = false
function dragSymbolChecked()
{
    var cw = addElemPgonCw
    if(cw.dragSymbolCheck.checked==true)
    {
        DragSymbols = true
        DrawX.style("display", "none")
        mySVG.removeAttribute("onclick")

        mySVG.setAttribute("onmousedown", "startDragPgon(evt)")
        mySVG.setAttribute("onmousemove", "dragPgon(evt)")
        mySVG.setAttribute("onmouseup", "endDragPgon(evt)")
        cw.deleteSymbolCheck.checked = false
        cw.resizeSymbolCheck.checked = false
        cw.colorSymbolCheck.checked = false
        cw.shadowSymbolCheck.checked = false
           cw.drawSymbolTopButton.style.borderStyle=""
            cw.drawSymbolBotButton.style.borderStyle=""
        ShadowSymbols = false
        DeleteSymbols = false
        ResizeSymbols = false
        ColorSymbols = false
        SymbolTop = false
        SymbolBot = false



        for(var k = 0; k<domElemG.childNodes.length; k++)
        {
            var symbol=domElemG.childNodes[k]
            if(symbol.id.indexOf("symbol")!=-1)
            {
                symbol.removeAttribute("onclick")
                symbol.removeAttribute("onmousedown")
                symbol.setAttribute("cursor", "move")
                symbol.setAttribute("class", "dragTargetObj")

            }
        }


    }
    else
    {
        DragSymbols = false
        mySVG.setAttribute("onclick", "plantPgonSymbol(event)")
        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")

    }

}
var ResizeSymbols = false
function resizeSymbolChecked()
{
    var cw = addElemPgonCw
    if(cw.resizeSymbolCheck.checked==true)
    {
        ResizeSymbols = true
        DrawX.style("display", "none")
        mySVG.removeAttribute("onclick")

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")
        cw.deleteSymbolCheck.checked = false
        cw.dragSymbolCheck.checked = false
        cw.colorSymbolCheck.checked = false
        cw.shadowSymbolCheck.checked = false
           cw.drawSymbolTopButton.style.borderStyle=""
            cw.drawSymbolBotButton.style.borderStyle=""
        ShadowSymbols = false
        DeleteSymbols = false
        DragSymbols = false
        ColorSymbols = false
        SymbolTop = false
        SymbolBot = false
        for(var k = 0; k<domElemG.childNodes.length; k++)
        {
            var symbol=domElemG.childNodes[k]
            if(symbol.id.indexOf("symbol")!=-1)
            {

                symbol.removeAttribute("onmousedown")
                symbol.setAttribute("cursor", "default")
                symbol.setAttribute("class", "pgonElem")
                symbol.setAttribute("onclick", "resizeMe(evt)")
            }
        }





    }
    else
    {
        ResizeSymbols = false
        mySVG.setAttribute("onclick", "plantPgonSymbol(event)")

    }

}
function resizeMe(evt)
{
    var cw = addElemPgonCw
    var pgon = evt.target.parentNode
  	var registerSize=+cw.registerSymbolSizeSelect.options[cw.registerSymbolSizeSelect.selectedIndex].text
    pgon.setAttribute("size", registerSize)

    var scale =registerSize/30
    var matrix = pgon.transform.baseVal.consolidate().matrix;
    var transX = matrix.e
    var transY = matrix.f
    pgon.setAttribute("transform", "translate("+transX+" "+transY+")scale("+scale+")")
}

var ShadowSymbols = false
function shadowSymbolChecked()
{
    var cw = addElemPgonCw
    if(cw.shadowSymbolCheck.checked==true)
    {
        ShadowSymbols = true
        DrawX.style("display", "none")
        mySVG.removeAttribute("onclick")

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")
        cw.resizeSymbolCheck.checked = false
        cw.deleteSymbolCheck.checked = false
        cw.dragSymbolCheck.checked = false
        cw.colorSymbolCheck.checked = false
           cw.drawSymbolTopButton.style.borderStyle=""
            cw.drawSymbolBotButton.style.borderStyle=""
        DeleteSymbols = false
        DragSymbols = false
        ResizeSymbols = false
        ColorSymbols = false
        SymbolTop = false
        SymbolBot = false
        for(var k = 0; k<domElemG.childNodes.length; k++)
        {
            var symbol=domElemG.childNodes[k]
            if(symbol.id.indexOf("symbol")!=-1)
            {

                symbol.removeAttribute("onmousedown")
                symbol.setAttribute("cursor", "default")
                symbol.setAttribute("class", "pgonElem")
                symbol.setAttribute("onclick", "shadowMe(evt)")
            }
        }


    }
    else
    {
        ShadowSymbols = false
        mySVG.setAttribute("onclick", "plantPgonSymbol(event)")

    }

}
function shadowMe(evt)
{
    var cw = addElemPgonCw
    var pgon = evt.target.parentNode
    pgon.setAttribute("filter", "url(#drop-shadow)")

}

var ColorSymbols = false
function colorSymbolChecked()
{
    var cw = addElemPgonCw
    if(cw.colorSymbolCheck.checked==true)
    {
        ColorSymbols = true
        DrawX.style("display", "none")
        mySVG.removeAttribute("onclick")

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")
        cw.deleteSymbolCheck.checked = false
        cw.dragSymbolCheck.checked = false
        cw.resizeSymbolCheck.checked = false
        cw.shadowSymbolCheck.checked = false
           cw.drawSymbolTopButton.style.borderStyle=""
            cw.drawSymbolBotButton.style.borderStyle=""
        ShadowSymbols = false
        DeleteSymbols = false
        DragSymbols = false
        ResizeSymbols = false
        SymbolTop = false
        SymbolBot = false
        cw.color1Div.style.visibility = "visible"
        cw.color2Div.style.visibility = "visible"
        cw.color3Div.style.visibility = "visible"
        cw.symbolRegisterColor1Select.disabled = false
        cw.symbolRegisterColor2Select.disabled = false
        cw.symbolRegisterColor3Select.disabled = false

        for(var k = 0; k<domElemG.childNodes.length; k++)
        {
            var symbol=domElemG.childNodes[k]
            if(symbol.id.indexOf("symbol")!=-1)
            {

                symbol.removeAttribute("onmousedown")
                symbol.setAttribute("cursor", "default")
                symbol.setAttribute("class", "pgonElem")
                symbol.setAttribute("onclick", "colorMe(evt)")
            }
        }

    }
    else
    {
        ColorSymbols = false
        mySVG.setAttribute("onclick", "plantPgonSymbol(event)")

    }

}
function colorMe(evt)
{
    var cw = addElemPgonCw

    var pgon = evt.target.parentNode

    var color1 = cw.symbolRegisterColor1Select.options[cw.symbolRegisterColor1Select.selectedIndex].value
    pgon.childNodes.item(0).setAttribute("fill", color1)
    if(pgon.childNodes.length==2)
    {

        var color2 = cw.symbolRegisterColor2Select.options[cw.symbolRegisterColor2Select.selectedIndex].value
        pgon.childNodes.item(1).setAttribute("fill", color2)
    }

    if(pgon.childNodes.length==3)
    {
        var color3 = cw.symbolRegisterColor3Select.options[cw.symbolRegisterColor3Select.selectedIndex].value
        pgon.childNodes.item(2).setAttribute("fill", color3)
    }

}

var DeleteSymbols = false
function deleteSymbolChecked()
{
    var cw = addElemPgonCw
    if(cw.deleteSymbolCheck.checked==true)
    {
        DeleteSymbols = true
        DrawX.style("display", "none")
        mySVG.removeAttribute("onclick")

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")
        cw.dragSymbolCheck.checked = false
        cw.resizeSymbolCheck.checked = false
        cw.colorSymbolCheck.checked = false
        cw.shadowSymbolCheck.checked = false
           cw.drawSymbolTopButton.style.borderStyle=""
            cw.drawSymbolBotButton.style.borderStyle=""
        ShadowSymbols = false
        ColorSymbols = false
        DragSymbols = false
        ResizeSymbols = false
        SymbolTop = false
        SymbolBot = false

        cw.dragSymbolCheck.checked = false
        for(var k = 0; k<domElemG.childNodes.length; k++)
        {
            var symbol=domElemG.childNodes[k]
            if(symbol.id.indexOf("symbol")!=-1)
            {

                symbol.removeAttribute("onmousedown")
                symbol.setAttribute("cursor", "default")
                symbol.setAttribute("class", "pgonElem")
                symbol.setAttribute("onclick", "deleteSymbol(evt)")
            }
        }


    }
}

function deleteSymbol(evt)
{
    var cw = addElemPgonCw
    target = evt.target.parentNode
    domElemG.removeChild(target)

    var pgonDrawArray=[]
    for(var k = 0; k<domElemG.childNodes.length; k++)
        if(domElemG.childNodes[k].getAttribute("class")=="pgonElem")
            pgonDrawArray.push(domElemG.childNodes[k])
    if(pgonDrawArray.length==0)
    {
           cw.drawSymbolTopButton.style.borderStyle=""
            cw.drawSymbolBotButton.style.borderStyle=""



        cw.undoButton.disabled = true
        cw.deleteSymbolCheck.disabled = true
        cw.dragSymbolCheck.disabled = true
        cw.resizeSymbolCheck.disabled = true
        cw.colorSymbolCheck.disabled = true

        cw.deleteSymbolCheck.checked = false
        cw.dragSymbolCheck.checked = false
        cw.resizeSymbolCheck.checked = false
        cw.colorSymbolCheck.checked = false
        cw.shadowSymbolCheck.checked = false
        ShadowSymbols = false
        DragSymbols = false
        DeleteSymbols = false
        ResizeSymbols = false
        ColorSymbols = false
        SymbolTop = false
        SymbolBot = false
        setTimeout('mySVG.setAttribute( "onclick","plantPgonSymbol(event)")', 800)
    }
}
//====================Top/Bot===================
var SymbolTop=false
function topDrawSymbol()
{    var cw = addElemPgonCw
    cw.drawSymbolTopButton.style.borderStyle="inset"
    cw.drawSymbolBotButton.style.borderStyle=""


           SymbolTop = true
        DrawX.style("display", "none")
        mySVG.removeAttribute("onclick")

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")
        cw.shadowSymbolCheck.checked = false
        cw.resizeSymbolCheck.checked = false
        cw.deleteSymbolCheck.checked = false
        cw.dragSymbolCheck.checked = false
        cw.colorSymbolCheck.checked = false
       ShadowSymbols = false
        DeleteSymbols = false
        DragSymbols = false
        ResizeSymbols = false
        ColorSymbols = false
        SymbolBot = false
        for(var k = 0; k<domElemG.childNodes.length; k++)
        {
            var symbol=domElemG.childNodes[k]
            if(symbol.id.indexOf("symbol")!=-1)
            {

                symbol.removeAttribute("onmousedown")
                symbol.setAttribute("cursor", "default")
                symbol.setAttribute("class", "pgonElem")
                symbol.setAttribute("onclick", "symbolTop(evt)")
            }
        }



}
function symbolTop(evt)
{
    var pgon = evt.target.parentNode

    domElemG.appendChild(pgon)


}


var SymbolBot=false
function botDrawSymbol()
{    var cw = addElemPgonCw
      cw.drawSymbolBotButton.style.borderStyle="inset"
    cw.drawSymbolTopButton.style.borderStyle=""

    SymbolBot = true

        DrawX.style("display", "none")
        mySVG.removeAttribute("onclick")

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")
        cw.shadowSymbolCheck.checked = false
        cw.resizeSymbolCheck.checked = false
        cw.deleteSymbolCheck.checked = false
        cw.dragSymbolCheck.checked = false
        cw.colorSymbolCheck.checked = false
       ShadowSymbols = false
        DeleteSymbols = false
        DragSymbols = false
        ResizeSymbols = false
        ColorSymbols = false
        SymbolTop = false
         for(var k = 0; k<domElemG.childNodes.length; k++)
        {
            var symbol=domElemG.childNodes[k]
            if(symbol.id.indexOf("symbol")!=-1)
            {

                symbol.removeAttribute("onmousedown")
                symbol.setAttribute("cursor", "default")
                symbol.setAttribute("class", "pgonElem")
                symbol.setAttribute("onclick", "symbolBot(evt)")
            }
        }


}
function symbolBot(evt)
{
    var pgon = evt.target.parentNode

    domElemG.insertBefore(pgon,domElemG.firstChild)


}


//---click on app svg---
function plantPgonSymbol(event)
{
    var cw = addElemPgonCw
    if(cw.PlantMeId)
    {

        var offsets = svgDiv.getBoundingClientRect();
        var top = offsets.top;
        var left = offsets.left;
        //---requred for FF----
        var eventObj = event || window.event;

        var x = eventObj.clientX-left
        var y = eventObj.clientY-top
        //---time stamp @ id---
        var utcMS = new Date().getTime()

        var defG = cw.document.getElementById(cw.PlantMeId)

        activeElem = defG.cloneNode(true)
        //activeElem.id = cw.PlantMeId+"_"+utcMS
        activeElem.id = "symbol"+utcMS
        var scale = +activeElem.getAttribute("size")/30

        activeElem.setAttribute("class", "pgonElem")

        domElemG.appendChild(activeElem)

        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")scale("+scale+")")
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")

        //PgonDrawArray.push(activeElem)
        cw.undoButton.disabled = false
        cw.deleteSymbolCheck.disabled = false
        cw.dragSymbolCheck.disabled = false

    }
}


function undoButtonClicked()
{
    var undoDrawArray=[]
        for(var k = 0; k<domElemG.childNodes.length; k++)
        {
            var symbol=domElemG.childNodes[k]
            if(symbol.id.indexOf("symbol")!=-1)
            {

                undoDrawArray.push(symbol)
            }
        }

        domElemG.removeChild(undoDrawArray[undoDrawArray.length-1])
         undoDrawArray.pop()




    if(undoDrawArray.length==0)
    {    var cw = addElemPgonCw   
        cw.undoButton.disabled = true
        cw.deleteSymbolCheck.disabled = true
        cw.dragSymbolCheck.disabled = true
        cw.drawSymbolTopButton.style.borderStyle=""
        cw.drawSymbolBotButton.style.borderStyle=""
        cw.deleteSymbolCheck.checked = false
        cw.dragSymbolCheck.checked = false

    }

}
