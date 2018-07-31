
var NS="http://www.w3.org/2000/svg"

function createGridLayer()
{
    //---clear previous---
    for(var k=gridLayer.childNodes.length-1;k>=0;k--)
        gridLayer.removeChild(gridLayer.childNodes.item(k))

    var gridWidth=+mySVG.getAttribute("width")
    var gridHeight=+mySVG.getAttribute("height")

    svgDiv.style.width=gridWidth+"px"
    svgDiv.style.height=gridHeight+"px"
    mySVG.setAttribute("width",gridWidth)
    mySVG.setAttribute("height",gridHeight)

    var gridLinesVert=(gridWidth/10).toFixed(0)
         var gridLinesHoriz=(gridHeight/10).toFixed(0)

    var grid=gridWidth/gridLinesVert


    var strokeThick="blue"
    var strokeThin="black"
    var centerColor="red"

    var dX=parseInt(gridWidth/grid)
    var dY=parseInt(gridHeight/grid)

    //----vertical start line---
    var x1V=0
    var y1V=0
    var x2V=0
    var y2V=gridHeight

    //---horizontal start line---
    var x1H=0
    var y1H=0
    var x2H=gridWidth
    var y2H=0
    //---vertical grid lines---
    for(i=0;i<gridLinesVert;i++)
    {
        stroke=strokeThin
        var strokeWidth=.1
        var num=i/2+""
        if(num.indexOf(".")==-1)
        {
            var stroke=strokeThick
            var strokeWidth=.2
        }

        var style="stroke:"+stroke+";stroke-width:"+strokeWidth

        if(i<dX)
        {
            var vert=document.createElementNS(NS,"line")
            x1V+=grid
            x2V+=grid
            vert.setAttribute("x1",x1V)
            vert.setAttribute("y1",y1V)
            vert.setAttribute("x2",x2V)
            vert.setAttribute("y2",y2V)
            vert.setAttribute("style",style)
            //vert.setAttribute("class","grid")
            gridLayer.appendChild(vert)
        }
        /*
        if(i<dY)
        {
            var horiz=document.createElementNS(NS,"line")
            y1H+=grid
            y2H+=grid
            horiz.setAttribute("x1",x1H)
            horiz.setAttribute("y1",y1H)
            horiz.setAttribute("x2",x2H)
            horiz.setAttribute("y2",y2H)
            horiz.setAttribute("style",style)
            //horiz.setAttribute("class","grid")
            gridLayer.appendChild(horiz)
        }
        */
    }
     //---horiz grid lines---
    for(i=0;i<gridLinesHoriz;i++)
    {
        stroke=strokeThin
        var strokeWidth=.1
        var num=i/2+""
        if(num.indexOf(".")==-1)
        {
            var stroke=strokeThick
            var strokeWidth=.2
        }

        var style="stroke:"+stroke+";stroke-width:"+strokeWidth
       /*
        if(i<dX)
        {
            var vert=document.createElementNS(NS,"line")
            x1V+=grid
            x2V+=grid
            vert.setAttribute("x1",x1V)
            vert.setAttribute("y1",y1V)
            vert.setAttribute("x2",x2V)
            vert.setAttribute("y2",y2V)
            vert.setAttribute("style",style)
            //vert.setAttribute("class","grid")
            gridLayer.appendChild(vert)
        }
        */
        if(i<dY)
        {
            var horiz=document.createElementNS(NS,"line")
            y1H+=grid
            y2H+=grid
            horiz.setAttribute("x1",x1H)
            horiz.setAttribute("y1",y1H)
            horiz.setAttribute("x2",x2H)
            horiz.setAttribute("y2",y2H)
            horiz.setAttribute("style",style)
            //horiz.setAttribute("class","grid")
            gridLayer.appendChild(horiz)
        }
    }

    //---add center point-----

        var centerPntGridG=document.createElementNS(NS,"g")
        centerPntGridG.setAttribute("id","centerPntGridG")

        var centerVert= document.createElementNS(NS,"line")
        var centerHoriz= document.createElementNS(NS,"line")
        var style="stroke:red;stroke-width:1;opacity:.6"

        var centerX=.5*gridWidth
        var centerY=.5*gridHeight
        centerVert.setAttribute("id","centerVert")
        centerVert.setAttribute("style",style)
        centerVert.setAttribute("x1",centerX)
        centerVert.setAttribute("y1",centerY-gridHeight/2)
        centerVert.setAttribute("x2",centerX)
        centerVert.setAttribute("y2",centerY+gridHeight/2)
        centerPntGridG.appendChild(centerVert)

        centerHoriz.setAttribute("id","centerHoriz")
        centerHoriz.setAttribute("style",style)
        centerHoriz.setAttribute("x1",centerX-gridWidth/2)
        centerHoriz.setAttribute("y1",centerY)
        centerHoriz.setAttribute("x2",centerX+gridWidth/2)
        centerHoriz.setAttribute("y2",centerY)
        centerPntGridG.appendChild(centerHoriz)

        gridLayer.appendChild(centerPntGridG)


}