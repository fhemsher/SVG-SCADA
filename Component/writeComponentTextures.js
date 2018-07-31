var SchematicTextureArray=[]

function findSchematicTextures()
{

   var patterns=defsPattern.childNodes
   for(var k=0;k<patterns.length;k++)
   {
      var pattern=patterns.item(k)

        SchematicTextureArray.push(pattern)

   }


}

function buildTextureTable()
{
     var cw = addElemTextureCw

  for(var k=0;k<SchematicTextureArray.length;k++)
  {
    var texture = SchematicTextureArray[k]
     var addTo=texture.getAttribute("addTo")
    if(addTo=="fill")
        addToColor = "blue"
        else
            addToColor = "aqua"

            cw.defsPattern.appendChild(texture.cloneNode(true))

          var id=texture.getAttribute("id")

        var nextCell = cw.savedTextureTable.rows[0].cells.length

        var patternCell = cw.savedTextureTable.rows[0].insertCell(nextCell)
        patternCell.style.width = "40px"
        patternCell.innerHTML = "<svg width=40 height=40 overflow=visible><rect stroke="+addToColor+" stroke-width=1 width=40 height=40 fill=url(#"+id+")  /></svg><center><input title='Apply this pattern to elements' onClick=parent.useSavedTexture('"+id+"')  type=radio name=savedRadio /></center>"

 }

    SchematicTextureArray=[]
}