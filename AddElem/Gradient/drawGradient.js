///---X button and iframe close all---
function closeDrawGradient()
{
    var cw = addElemGradientCw
    if(addElemGradientViz==true)
    {
        //cw.savedGradientTable.style.visibility = "hidden"
        closeIframe("addElemGradient");

        var elems = domElemG.childNodes
        for(k = 0; k<elems.length; k++)
        {
            var elem = elems.item(k)
            elem.removeAttribute("onclick")
            var myClass = elem.getAttribute("class")
            var myId = elem.id

            if(myClass=="circleElem") elem.setAttribute("onmousedown", "editCircleDraw("+myId+",evt)")
                if(myClass=="ellipseElem") elem.setAttribute("onmousedown", "editEllipseDraw("+myId+",evt)")
                if(myClass=="rectElem") elem.setAttribute("onmousedown", "editRectDraw("+myId+",evt)")
                if(myClass=="textElem") elem.setAttribute("onmousedown", "editTextDraw("+myId+",evt)")
                if(myClass=="polygonElem") elem.setAttribute("onmousedown", "editPolygonDraw("+myId+",evt)")
                if(myClass=="iconElem") elem.setAttribute("onmousedown", "editIconStart(evt)")
                if(myClass=="pathElem") elem.setAttribute("onmousedown", "startPathDrawEdit("+myId+",evt)")
                if(myClass=="arcElem") elem.setAttribute("onmousedown", "editArcDraw("+myId+",evt)")

        }

    }

}

var DrawGradient = false
function startGradientDraw()
{
    DrawGradient = true
    var elems = domElemG.childNodes
    for(k = 0; k<elems.length; k++)
    {
        var elem = elems.item(k)
        var myClass = elem.getAttribute("class")
        if(myClass!="componentElem"&&myClass!="schematicElem")
        {
            elem.removeAttribute("onmousedown")
            elem.setAttribute("onclick", "placeGradient(evt)")

        }
    }

}

var SaveMeGradient
function saveGradientButtonClicked()
{

    var cw = addElemGradientCw
    MyGradient = cw.MyGradient

    UseGradientID = "gradient"+new Date().getTime()

    var savedGradient = MyGradient.cloneNode(true)
    savedGradient.firstChild.removeAttribute("id")
    savedGradient.lastChild.removeAttribute("id")
    savedGradient.setAttribute("id", UseGradientID)
    defsGradient.appendChild(savedGradient)
    cw.defsGradientSave.appendChild(savedGradient.cloneNode(true))

    var nextRow = cw.savedGradientTable.rows.length
    var gradientRow = cw.savedGradientTable.insertRow(nextRow)
    var gradientCell = gradientRow.insertCell(0)

    var type = MyGradient.nodeName
    if(type=="radialGradient")
        var elem = "<circle stroke=black stroke-width=.5 cx=25 cy=25 r=20 fill=url(#"+UseGradientID+") />"
        else
            var elem = "<rect x=10 y=0  stroke=black stroke-width=.5 width=40 height=40 fill=url(#"+UseGradientID+") />"

            gradientCell.innerHTML = "Fill:<input onClick=parent.useSavedGradient('"+UseGradientID+"','fill') checked type=radio name=savedGradientRadio /><br><svg width=40 height=40 overflow=visible>"+elem+"</svg><br>Strk:<input onClick=parent.useSavedGradient('"+UseGradientID+"','stroke')  type=radio name=savedGradientRadio /><hr>"

}

var UseGradientID
var Where = "fill"
function useSavedGradient(id, where)
{

    UseGradientID = id
    Where = where

}

var MyGradient
var GradientTarget
var GradientCnt = 0
//--click on on shape-----
function placeGradient(evt)
{
    var cw = addElemTextureCw

    if(UseGradientID)
    {
        var target = evt.target
        if(target.parentNode.id.indexOf("isa")!=-1&& (Where=="fill"))
        {
            var isa = target.parentNode
            var paths = isa.getElementsByTagName("path")
            for(var j = 0; j<paths.length; j++)
            {
                var path = paths[j]
                if(path.getAttribute("fill")!="none")
                    path.setAttribute("fill", "url(#"+UseGradientID+")")

            }
        }
        else if(Where=="fill")
        {
            target.setAttribute("fill", "url(#"+UseGradientID+")")
            target.removeAttribute("fill-opacity")
        }
        else
            target.setAttribute("stroke", "url(#"+UseGradientID+")")

    }

}