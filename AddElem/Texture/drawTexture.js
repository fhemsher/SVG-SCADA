///---X button and iframe close all---
function closeDrawTexture()
{
    var cw = addElemTextureCw
    if(addElemTextureViz==true)
    {
        cw.savedTextureDiv.style.visibility = "hidden"
        closeIframe("addElemTexture");

        var elems = domElemG.childNodes
        for(k = 0; k<elems.length; k++)
        {
            var elem = elems.item(k)
            elem.removeAttribute("onclick")
            var myClass = elem.getAttribute("class")
             var myId = elem.id
            if(myClass=="isaElem")
            {
                elem.lastChild.removeAttribute("onclick")
                elem.lastChild.setAttribute("onmousedown", "editIsaDraw("+myId+",evt)")
            }
             if(myClass=="circleElem") elem.setAttribute("onmousedown", "editCircleDraw("+myId+",evt)")
             if(myClass=="ellipseElem") elem.setAttribute("onmousedown", "editEllipseDraw("+myId+",evt)")
             if(myClass=="rectElem") elem.setAttribute("onmousedown", "editRectDraw("+myId+",evt)")
             if(myClass=="textElem") elem.setAttribute("onmousedown", "editTextDraw("+myId+",evt)")
             if(myClass=="polygonElem") elem.setAttribute("onmousedown", "editPolygonDraw("+myId+",evt)")
             if(myClass=="iconElem") elem.setAttribute("onmousedown", "editIconStart(evt)")
             if(myClass=="pathElem") elem.setAttribute("onmousedown", "startPathDrawEdit("+myId+",evt)")

        }

    }
}

var DrawTexture = false

function startTextureDraw()
{
    DrawTexture = true
    var elems = domElemG.childNodes
    for(k = 0; k<elems.length; k++)
    {
        var elem = elems.item(k)
        var myClass=elem.getAttribute("class")
        if(myClass!="componentElem"&&myClass!="processtElem")
        {
            if(myClass=="isaElem")
            {
                elem.lastChild.removeAttribute("onmousedown")
                elem.lastChild.setAttribute("onclick", "placeTexture(evt)")

            }
            else
            {
                elem.removeAttribute("onmousedown")
                elem.setAttribute("onclick", "placeTexture(evt)")
            }

        }
    }


    var cw = addElemTextureCw
    if(defsPattern.childNodes.length>0)
        cw.savedTextureDiv.style.visibility = "visible"

}

var SaveMePattern
function saveTextureButtonClicked()
{
    var cw = addElemTextureCw
    AddTexture = cw.AddTexture

    if(cw.AddTo=="fill")
        addToColor = "blue"
        else
            addToColor = "aqua"
            SaveMePattern = cw.DefsPattern.lastChild
            SaveMePattern.setAttribute("addTo",cw.AddTo)

            if(!document.getElementById(SaveMePattern.id))
        {
            defsPattern.appendChild(SaveMePattern.cloneNode(true))
            cw.defsPattern.appendChild(SaveMePattern.cloneNode(true))

        }
        UseTextureID = SaveMePattern.id
        var nextCell = cw.savedTextureTable.rows[0].cells.length

        var patternCell = cw.savedTextureTable.rows[0].insertCell(nextCell)
        patternCell.style.width = "40px"
        patternCell.innerHTML = "<svg width=40 height=40 overflow=visible><rect stroke="+addToColor+" stroke-width=1 width=40 height=40 fill="+AddTexture+" /></svg><center><input title='Apply this pattern to elements' onClick=parent.useSavedTexture('"+SaveMePattern.id+"') checked type=radio name=savedRadio /></center>"
        cw.savedTextureDiv.style.visibility = "visible"
        cw.saveTextureButton.disabled = true
}

var UseTextureID
function useSavedTexture(id)
{

    UseTextureID = id

}

var AddTexture
var Pattern
//--click on on shape-----
function placeTexture(evt)
{

    var cw = addElemTextureCw

    if(UseTextureID)
    {
        var target = evt.target
       if(target.parentNode.id.indexOf("isa")!=-1&& (cw.AddTo=="fill") )
        {
           var isa=target.parentNode
           var paths=isa.getElementsByTagName("path")
          for(var j=0;j<paths.length;j++)
          {
            var path=paths[j]
            if(path.getAttribute("fill")!="none")
                  path.setAttribute("fill", "url(#"+UseTextureID+")")

          }
        }
        else if(cw.AddTo=="fill")
        {
            target.setAttribute("fill", "url(#"+UseTextureID+")")
            target.removeAttribute("fill-opacity")
        }
        else
            target.setAttribute("stroke", "url(#"+UseTextureID+")")

    }

}
