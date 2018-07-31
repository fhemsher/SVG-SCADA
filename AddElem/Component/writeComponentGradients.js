var ComponentGradientArray=[]

function findComponentGradients()
{

   var gradients=defsGradient.childNodes
   for(var k=0;k<gradients.length;k++)
   {
      var gradient=gradients.item(k)

        ComponentGradientArray.push(gradient)

   }


}

function buildGradientTable()
{
     var cw = addElemGradientCw

  for(var k=0;k<ComponentGradientArray.length;k++)
  {

     var gradient=ComponentGradientArray[k]
     gradientId=gradient.id
    var savedGradient = gradient.cloneNode(true)

   // savedGradient.setAttribute("id", gradientId)

    cw.defsGradientSave.appendChild(savedGradient)

    var nextRow = cw.savedGradientTable.rows.length
    var gradientRow = cw.savedGradientTable.insertRow(nextRow)
    var gradientCell = gradientRow.insertCell(0)

    var type = gradient.nodeName
    if(type=="radialGradient")
        var elem = "<circle stroke=black stroke-width=.5 cx=25 cy=25 r=20 fill=url(#"+gradientId+") />"
        else
            var elem = "<rect x=10 y=0  stroke=black stroke-width=.5 width=40 height=40 fill=url(#"+gradientId+") />"

            gradientCell.innerHTML = "Fill:<input onClick=parent.useSavedGradient('"+gradientId+"','fill')  type=radio name=savedGradientRadio /><br><svg width=40 height=40 overflow=visible>"+elem+"</svg><br>Strk:<input onClick=parent.useSavedGradient('"+gradientId+"','stroke')  type=radio name=savedGradientRadio /><hr>"
  }


    ComponentSymbolArray=[]
}