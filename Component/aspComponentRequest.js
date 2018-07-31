
var LoadedComponentArray=[]  //---hide edit send div---
//---'send' button---
var AddArrowDefs
function sendComponent()
{
           var cw=addElemComponentCw
    var description = cw.myComponentDescriptionValue.value
    var name = cw.myComponentNameValue.value
    var email = cw.myComponentEmailValue.value
    var title = cw.myComponentTitleValue.value
    if(cw.componentCategorySelect.selectedIndex!=0)
    var category = cw.componentCategorySelect.options[cw.componentCategorySelect.selectedIndex].text
   else
   var category="Other"
setCookie("name",name,720)
setCookie("email",email,720)
setCookieValues(name,email)


    var componentG=domElemG.lastChild
     var bb=componentG.getBBox()
     var cx=bb.x+.5*bb.width
     var cy=bb.y+.5*bb.height


    var saveComponent = componentG.cloneNode(true)



      var transX=+saveComponent.getAttribute("nativeWidth")/2
      var transY=+saveComponent.getAttribute("nativeHeight")/2
    saveComponent.setAttribute("transform", "translate("+(-cx+transX)+","+(-cy+transY)+")")  //---upper left at(0,0)--

     AddArrowDefs=document.createElementNS(NS,"defs")
  for(var k=0;k<saveComponent.childNodes.length;k++)
    {
       saveComponent.childNodes.item(k).removeAttribute("onmousedown")
       saveComponent.childNodes.item(k).removeAttribute("style")
       saveComponent.childNodes.item(k).removeAttribute("rotateAngle")
       saveComponent.childNodes.item(k).removeAttribute("class")
       //--- //----include defs for arrow markers---
       var elem=saveComponent.childNodes.item(k)
       if(elem.getAttribute("marker-end"))
       {
            var marker=elem.getAttribute("marker-end")


            var arrows=arrowDefs.childNodes

            for(m=0;m<arrows.length;m++)
            {
                var arrowDef=arrows[m]
                var arrowId=arrowDef.id
                if(marker.indexOf(arrowId)!=-1)
                {
                    AddArrowDefs.appendChild(arrowDef.cloneNode(true))
                }
            }

       }


    }

    if(AddArrowDefs.childNodes.length>0)
    {
        saveComponent.insertBefore(AddArrowDefs,saveComponent.firstChild)


    }

    saveComponent.setAttribute("category", category)
    saveComponent.setAttribute("title", title)
    saveComponent.setAttribute("description", description)
    saveComponent.setAttribute("name", name)
    saveComponent.setAttribute("email", email)

    var utcMS = new Date().getTime()
    saveComponent.setAttribute("utcMS", utcMS)
    var myId = "component"+utcMS
    saveComponent.setAttribute("id", myId)
    saveComponent.setAttribute("parentid", myId)



    LoadedComponentArray.push(saveComponent)
    var svgString = new XMLSerializer().serializeToString(saveComponent)

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "_ASP/sendComponent.asp", true);
    xhr.onload = function()
    {
        if (this.status == 200)
        {
           
            cw.sendComponentMessageSpan.innerHTML = "Thanks, your component has been received and placed in the library."
             cw.refreshComponentLibraryButton.disabled=false
               cw.sendButton.disabled=true
        }


    };

    xhr.send(svgString);
}

function libraryComponentRemoveButtonClicked()
{
    sendComponentUpdateMessageSpan.innerHTML = ""
    libraryComponentRemoveButton.disabled = true
    var myId = retrieveComponentIdValue.value
    var myEmail = retrieveComponentEmailValue.value
    var svgString = "<remove myId='"+myId+"' myEmail='"+myEmail+"' />"

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "_ASP/removeComponent.asp", true);
    xhr.onload = function()
    {
        if (this.status == 200)
        {

             sendComponentUpdateMessageSpan.innerHTML = "Your component has been successfully removed from the library."

            retrieveComponentIdValue.value = ""

        }


    };

    xhr.send(svgString);

}

function sendUpdateComponent()
{
    sendComponentUpdateMessageSpan.innerHTML=''
    var myId = retrieveComponentIdValue.value
    var title = myComponentTitleUpdateValue.value
    var description = myComponentDescriptionUpdateValue.value
    var name = myComponentNameUpdateValue.value
    var email = myComponentEmailUpdateValue.value
    if(myComponentCategoryUpdateSelect.selelectedIndex!=0)
        var category = myComponentCategoryUpdateSelect.options[myComponentCategoryUpdateSelect.selelectedIndex].text
    else
        var category="Other"


     var componentG=document.createElementNS(NS,"g")

     //---get all elements in the drawing and build the component---
     var paths=domAddPathG.childNodes
     var elems=domAddElemG.childNodes
      var HMIs=domAddHmiG.childNodes
     var symbols=domAddSymbolG.childNodes
     var icons=domAddIconG.childNodes
     var components=domAddComponentG.childNodes


     componentG.setAttribute("id",myId)
     componentG.setAttribute("category",category)
     componentG.setAttribute("title",title)
     componentG.setAttribute("description",description)
     componentG.setAttribute("name",name)
     componentG.setAttribute("email",email)

    for(k=0;k<paths.length;k++)
    {
        var el=paths.item(k).cloneNode(true)
        el.removeAttribute("onmousedown")
        el.removeAttribute("class")
        el.removeAttribute("id")
        el.removeAttribute("style")
      componentG.appendChild(el)
    }
    for(k=0;k<elems.length;k++)
    {
        var el=elems.item(k).cloneNode(true)
        el.removeAttribute("onmousedown")
        el.removeAttribute("class")
        el.removeAttribute("id")
        el.removeAttribute("style")
      componentG.appendChild(el)
    }
    for(k=0;k<HMIs.length;k++)
    {
        var el=HMIs.item(k).cloneNode(true)
        el.removeAttribute("onmousedown")
        el.removeAttribute("class")
        el.removeAttribute("id")
        el.removeAttribute("style")
      componentG.appendChild(el)
    }
    for(k=0;k<symbols.length;k++)
    {
        var el=symbols.item(k).cloneNode(true)
        el.removeAttribute("onmousedown")
        el.removeAttribute("class")
        el.removeAttribute("id")
        el.removeAttribute("style")
      componentG.appendChild(el)
    }
    for(k=0;k<icons.length;k++)
    {
        var el=icons.item(k).cloneNode(true)
        el.removeAttribute("onmousedown")
        el.removeAttribute("class")
        el.removeAttribute("id")
        el.removeAttribute("style")
      componentG.appendChild(el)
    }
    for(k=0;k<components.length;k++)
    {
        var el=components.item(k).cloneNode(true)
        el.removeAttribute("onmousedown")
        el.removeAttribute("class")
        el.removeAttribute("id")
        el.removeAttribute("style")
        componentG.appendChild(el)
    }
    domWrapper.style.display="block"
    domWrapper.appendChild(componentG)
    var bbW=domWrapper.getBBox()
    var cxW=bbW.x+.5*bbW.width
    var cyW=bbW.y+.5*bbW.height



    var rect=document.createElementNS(NS,"rect")
    rect.setAttribute("width",bbW.width )
    rect.setAttribute("height",bbW.height)
    rect.setAttribute("stroke","none")
    rect.setAttribute("fill","orange")
    rect.setAttribute("fill-opacity",".4")
   // rect.setAttribute("onmousedown","editComponent("+myId+",evt)")
     rect.setAttribute("transform","translate("+(bbW.x)+","+(bbW.y)+")")
     componentG.appendChild(rect)


          componentG.setAttribute("transform","translate(0,0)")

   // componentG.setAttribute("transform","translate("+(cxW)+","+(cyW)+")")
    componentG.setAttribute("nativeWidth",bbW.width)
    componentG.setAttribute("nativeHeight",bbW.height)




    domAddComponentG.appendChild(componentG)


     componentG.lastChild.setAttribute("fill","white")
     componentG.lastChild.setAttribute("fill-opacity","0")

    ComponentEditArray=[]
    var svgString = new XMLSerializer().serializeToString(componentG)

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "_ASP/sendUpdateComponent.asp", true);
    xhr.onload = function()
    {
        if (this.status == 200)
        {
             retrieveComponentUpdateDiv.style.display="none"
            sendComponentUpdateMessageSpan.innerHTML = "Your edited component (<b>"+myId+"</b>) has been received and updated in the library."

        }


    };

    xhr.send(svgString);
}
