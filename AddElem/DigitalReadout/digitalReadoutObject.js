//======================DIGITAL READOUT OBJECT========================================
function buildDigitalReadout(id,title,units,max,faceColor,numBorderColor,numColor,numBgColor,transX,transY,scale)
{
    var digitalReadout=digitalReadoutDefs.firstChild.cloneNode(true)  //---<g> element---
    digitalReadout.id=id
    var foreignObject=digitalReadout.childNodes.item(0)
    var containerDiv=foreignObject.childNodes.item(0)

    var titleDiv=containerDiv.childNodes.item(0)
    var input=containerDiv.childNodes.item(1)
    var unitsDiv=containerDiv.childNodes.item(2)

    containerDiv.style.background=faceColor
    titleDiv.innerHTML=title
    unitsDiv.innerHTML=units

    input.value=max

    input.style.color=numColor
    input.style.borderColor=numBorderColor
    input.style.background=numBgColor

    digitalReadout.setAttribute("transform","translate("+transX+","+transY+")scale("+scale+")")
    mySVG.appendChild(digitalReadout)
}