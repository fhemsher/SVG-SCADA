function setSelect(id,obj,value,edit)
{

      var editString=""
      if(edit)
      editString="Edit"
      var cw=eval("addElem"+id+editString+"Cw")

  
      var selectObj=cw.document.getElementById("draw"+id+editString+obj+"Select")
   var l=selectObj.options.length
   for(var s=0;s<l;s++)
   {
     var vlu=selectObj.options[s].value
	 if(!vlu)
     	vlu=selectObj.options[s].text
     if(value==vlu)
	 {
       selectObj.selectedIndex=s
	  if(cw.document.getElementById("draw"+id+editString+obj+"Bg"))
     	cw.document.getElementById("draw"+id+editString+obj+"Bg").style.backgroundColor=value
	   break
	 }
   }
}