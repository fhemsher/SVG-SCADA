var SchematicSymbolArray=[]

function findSchematicSymbols()
{
   var nativeString=","
   var symbols=domAddSymbolG.childNodes
   for(var k=0;k<symbols.length;k++)
   {
      var symbol=symbols.item(k)
      var nativeid=symbol.getAttribute("nativeid")

      if(nativeString.indexOf(nativeid)==-1)
      {
        nativeString+=nativeid+","
        SchematicSymbolArray.push(symbol)
      }
   }
   console.log(SchematicSymbolArray.length)
}

function buildSymbolTable()
{

     var cw = addElemPgonCw

    for(var i=0;i<SchematicSymbolArray.length;i++)
    {
        var symbol=SchematicSymbolArray[i]

        var def=symbol.cloneNode(true)
        def.id=symbol.getAttribute("nativeid")
        def.removeAttribute("transform")
        def.removeAttribute("onmousedown")
        cw.SymbolDefs.appendChild(def)

       var plantSymbol=symbol.cloneNode(true)
       plantSymbol.removeAttribute("onmousedown")


    	//---size this for convenient user selection: size=30---
    	var mySize=+plantSymbol.getAttribute("size")
    	if(mySize!=30)
    	{
    		var resize=30/mySize
    		for(var k=0;k<plantSymbol.childNodes.length;k++)
    		{
    			var pgon=plantSymbol.childNodes.item(k)
    			pgon.setAttribute("transform","scale("+resize+")")
    			computePolyPoints(plantSVG,pgon)
    		}
    	}

    	var defId=plantSymbol.getAttribute("nativeid")
    	plantSymbol.id=defId+"Plant"
    	plantSymbol.setAttribute("transform","translate(15 15)")
      var plantSVG=cw.document.createElementNS('http://www.w3.org/2000/svg',"svg")
      plantSVG.appendChild(plantSymbol)


    	var  plantSymbolString=new XMLSerializer().serializeToString(plantSVG)
    	var tr = cw.plantSymbolTable.insertRow(cw.plantSymbolTable.rows.length);
    	var td = tr.insertCell(tr.cells.length);
    	td.innerHTML ="<div title='Plant Me' onClick=plantThisSymbol('"+defId+"') id="+defId+"Div style='width:30px;height:30px;overflow:hidden'>"+plantSymbolString+"</div>"+mySize+"px"



    }
    SchematicSymbolArray=[]


}