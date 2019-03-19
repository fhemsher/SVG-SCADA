
var IsaDoc
function getIsaLibrary()
{

if(!IsaDoc)
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "Library/Isa.svg", true);
    xhr.onload = function()
    {
        var xmlString = this.responseText

        //---DOMParser---
        var parser = new DOMParser();
        IsaDoc = parser.parseFromString(xmlString, "text/xml").documentElement;
        //---clear previous table----
        var rows = isaTable.rows
        for(var k = rows.length-1; k>=0; k--)
            isaTable.deleteRow(rows[k])

           var rowCnt=1

            var row = isaTable.insertRow(0)
            row.align = "center"
            var titleCell = row.insertCell(0).innerHTML = "Title"
            var categoryCell = row.insertCell(1).innerHTML = "Category"
            var descriptionCell = row.insertCell(2).innerHTML = "Description"
           // var nameCell = row.insertCell(3).innerHTML = "Created By"
           // var dateCell = row.insertCell(4).innerHTML = "Date Created/Edited"

            var previewCell = row.insertCell(3)

            //----write table---
            var groups = IsaDoc.childNodes

        for(var k = 0; k<groups.length; k++)
        {
            var group = groups.item(k)
           if(group.nodeName!="#text")
           {
            var id = group.getAttribute("id")
            var category = group.getAttribute("category")
            var title = group.getAttribute("title")
            var description = group.getAttribute("description")
            var name = group.getAttribute("name")
            var utcMS = +group.getAttribute("utcMS")
            var date = new Date(utcMS).toLocaleString()

            var svgContainer=document.createElementNS(NS,"svg")
        svgContainer.setAttribute("width","100%")
        svgContainer.setAttribute("height","100%")

            svgContainer.setAttribute("overflow","visible")
              var clone=group.cloneNode(true)
              clone.setAttribute("myscale","1.0")
              svgContainer.appendChild(clone)
              var idSVG="SVG_ISA"+k
              svgContainer.setAttribute("id",idSVG)
           //var bb=clone.getBBox()
          // clone.setAttribute("viewBox","0 0 "+bb.width+" "+bb.height)
            // var svgString=new XMLSerializer().serializeToString(svg)
            var row = isaTable.insertRow(rowCnt++)

            var cntr = (rowCnt)/2+""
            if(cntr.indexOf('.')!=-1)
                var bg = "#aadc82"
                else
                    var bg = "#f0e99c"
                    row.style.background = bg

                    var titleCell = row.insertCell(0).innerHTML = title
                    var categoryCell = row.insertCell(1).innerHTML = category
                    var descriptionCell = row.insertCell(2).innerHTML = description
                    //var nameCell = row.insertCell(3).innerHTML = name
                    //var dateCell = row.insertCell(4).innerHTML = date
                    var previewCell = row.insertCell(3)
                     previewCell.style.padding="5px"

                     //previewCell.style.width=group.getAttribute("nativeWidth")+"px"
                     //previewCell.style.height=group.getAttribute("nativeHeight")+"px"
                     var svgString=new XMLSerializer().serializeToString(svgContainer)
                    previewCell.innerHTML ="<div style='width:40px;height:40px;'>"+svgString+"</div>"
                    previewCell.title="Click to place in drawing"
                    previewCell.setAttribute("onClick","this.style.border='4px inset violet';placeIsaInDrawing("+id+")")
                        var svg=document.getElementById(idSVG)
                    	var bb=svg.getBBox()
                    	var bbw=bb.width
                    	var bbh=bb.height
                          var divWH=40
                        //--use greater of bbw vs bbh--
                    	if(bbw>=bbh)
                    		var factor=bbw/divWH
                    	else
                    		var factor=bbh/divWH

                    	var vbWH=divWH*factor

                    	var vbX=(bbw-vbWH)/2
                    	var vbY=(bbh-vbWH)/2
                        //---IE/CH---
                    	if(!mySVG.viewBox.baseVal )
                    	{
                       	 	var ViewBox=svg.viewBox.baseVal
                    		ViewBox.x=vbX
                    		ViewBox.y=vbY
                    		ViewBox.width=vbWH
                    		ViewBox.height=vbWH
                    	}
                    	else
                    		svg.setAttribute("viewBox",vbX+" "+vbY+" "+vbWH+" "+vbWH)
              }

          }
         isaTableCloseButton.style.visibility = "visible"
        LoadedIsaArray=[]
        isaTableDiv.style.top = "60px"
        isaTableDiv.style.visibility = "visible"
        setIsaEditDrag()
         getIsaLibraryButton.style.borderStyle = "inset"
          hmiIntroDiv.style.visibility="hidden"






          disableAllButtons()
    }
    xhr.send()
    }
    else
    {
         isaTableCloseButton.style.visibility = "visible"
        LoadedIsaArray=[]
        isaTableDiv.style.top = "60px"
        isaTableDiv.style.visibility = "visible"
        setIsaEditDrag()
         disableAllButtons()
    }
}


var LoadedIsaArray=[]
function placeIsaInDrawing(id)
{



   var isa=id.cloneNode("true")





   isa.setAttribute("parentid",isa.id)

   isa.removeAttribute("title")
   isa.removeAttribute("description")

    var utcms=new Date().getTime()
    var id="isa"+utcms
   isa.setAttribute("id",id)

    isa.setAttribute("class", "dragTargetObj")
    var rects=isa.getElementsByTagName("rect")
    var rect=rects[rects.length-1]
    rect.style.cursor = "move"

   rect.setAttribute('onmousedown',"editIsaDraw("+id+",evt)")
    LoadedIsaArray.push(isa)

   domElemG.appendChild(isa)

        rect.removeAttribute("width")
        rect.removeAttribute("height")
        var bb=isa.getBBox()
        //rect.setAttribute("x",bb.x)
        //coverRect.setAttribute("y",bb.y)
        rect.setAttribute("width",bb.width)
        rect.setAttribute("height",bb.height)



}


function closeIsaTable()
{
   for(var k=0;k<LoadedIsaArray.length;k++)
   {
        var isa=LoadedIsaArray[k]
        isa.setAttribute("class","isaElem")
        var rects=isa.getElementsByTagName("rect")
        var coverRect=rects[rects.length-1]
        coverRect.setAttribute('onmousedown',"editIsaDraw("+isa.id+",evt)")

        coverRect.style.cursor="default"
    }
   mySVG.removeAttribute("onmousedown")
   mySVG.removeAttribute("onmousemove")
   mySVG.removeAttribute("onmouseup")

   LoadedIsaArray=[]
  showSourceSVG()
 isaTableDiv.style.visibility='hidden'
  isaTableCloseButton.style.visibility = "hidden"
  getIsaLibraryButton.style.borderStyle = ""
   enableAllButtons()
}

function rotateIsaAdjust(factor)
{
    var cw = editElemIsaCw
    var mult = parseFloat(cw.rotateEditIsaAdjustSelect.options[cw.rotateEditIsaAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotateIsaValue.value = rotateAdd+parseFloat(cw.adjustedRotateIsaValue.value)

    if(EditIsaObj)
    {

     if(SetIsaCenter.length==0)
     {
         //---rotate from center---
    //var wrapperClone=activeElem.cloneNode(true)
    //domWrapper.appendChild(wrapperClone)
    var bb=EditIsaObj.getBBox()

    var cx=bb.x+.5*bb.width
    var cy=bb.y+.5*bb.width
    SetIsaCenter=[cx,cy]

   }
    var tfm=decomposeMatrix(EditIsaObj.getCTM())
     var rotation=tfm.rotation
     console.log(rotation)
     var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=EditIsaObj.transform
	var transformList=animTransformList.baseVal
	transformRequestObj.setRotate(rotateAdd,SetIsaCenter[0],SetIsaCenter[1])
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()



    }
}

var EditIsa = false
var DrawIsaEditId
var EditThisIsa
//--mousedown/right button on component---
function editIsaDraw(elemObjEdit, evt)
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


EditIsa = false
DrawIsaEditId = null
EditThisIsa = null
        ActiveElem = null
        activeElem = null

    if(isRightMB&&ZoomDrawing==false)
    {
        SetIsaCenter=[]

        EditThisIsa = elemObjEdit

        DrawIsaEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditIsa = true
        if(editElemIsaLoad==false)
        {
            openIframe("AddElem", "editElemIsa", 10)

        }
        else if(editElemIsaViz==false)
        {
            openIframe("AddElem", "editElemIsa", 10)
            setEditIsa()
        }
        else
            setEditIsa()

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
        dragTarget.lastChild.setAttribute("style","cursor:move")
       dragTarget.setAttribute("opacity",.4)
        DrawX.style("display", "none")

        ZoomDraggedElems.push([dragTarget,"editIsaDraw("+dragTarget.id+",evt)",classed])
    }

}

var EditIsaObj
function setEditIsa()
{
    coverOn()
    domWrapper.removeAttribute("style")
    var cw = editElemIsaCw



    var elemObjEdit = document.getElementById(DrawIsaEditId)
    if(elemObjEdit)
    {
    EditThisIsa=elemObjEdit

   if(elemObjEdit.getAttribute("parentid")&&elemObjEdit.getAttribute("parentid").indexOf("ISA")!=-1)
   {
      cw.pidColorBg.style.visibility="visible"

      cw.flipTR.style.visibility="visible"
      setMyFillSelect(EditThisIsa)
   }
   else
   {
      cw.pidColorBg.style.visibility="hidden"
       cw.flipTR.style.visibility="hidden"
   }






    cw.scaleRangeValue.value=elemObjEdit.getAttribute("myscale")
    cw.scaleValue.value=elemObjEdit.getAttribute("myscale")
    cw.adjustedRotateIsaValue.value=0

    if(elemObjEdit.getAttribute("filter"))
        cw.editIsaShadowCheck.checked = true
   else
      cw.editIsaShadowCheck.checked = false


    EditIsaObj = elemObjEdit.cloneNode(true)
     elemObjEdit.style.display = "none"


    EditIsaObj.setAttribute("id", "activeElem")
        EditIsaObj.setAttribute("class", "dragTargetObj")
      var rects=EditIsaObj.getElementsByTagName("rect")





   var rects=EditIsaObj.getElementsByTagName("rect")
  rects[rects.length-1].removeAttribute("onmousedown")
rects[rects.length-1].setAttribute("stroke","orange")
rects[rects.length-1].setAttribute("vector-effects","non-scaling-stroke")
rects[rects.length-1].setAttribute("stroke-width","6")
rects[rects.length-1].setAttribute("stroke-opacity",".5")
rects[rects.length-1].style.cursor="move"

    ActiveElem = d3.select("#activeElem")
   activeElem = document.getElementById("activeElem")



        domActiveElemG.insertBefore(EditIsaObj,domActiveElemG.firstChild)

        //activeElem.getElementsByTagName("rect")[0].setAttribute("fill","violet")
        //activeElem.getElementsByTagName("rect")[0].setAttribute("fill-opacity",".4")







            //DragDot.attr("transform", "translate("+(transX)+" "+transY+")")

            //--place dragDot----
          setIsaEditDrag()

            mySVG.style.cursor = ""
    }
}

function setIsaEditDrag()
{



    mySVG.setAttribute("onmousedown", "startDragIsa(evt)")
    mySVG.setAttribute("onmousemove", "dragIsa(evt)")
    mySVG.setAttribute("onmouseup", "endDragIsa(evt)")

  showSourceSVG()
}

function finishEditIsa()
{

    if(document.getElementById("activeElem"))
    {
        var cw = editElemIsaCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "isaElem")


             finishedElem.setAttribute("id", DrawIsaEditId)


        finishedElem.setAttribute("id", DrawIsaEditId)

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        activeElem=null
        ActiveElem=null
            var rects=finishedElem.getElementsByTagName("rect")
       rects[rects.length-1].style.cursor = "default"
        rects[rects.length-1].removeAttribute("stroke")
        rects[rects.length-1].setAttribute("onmousedown", "editIsaDraw("+DrawIsaEditId+", evt)")





        finishedElem.setAttribute("myscale", cw.scaleValue.value)
        domElemG.insertBefore(finishedElem, EditThisIsa)
        domElemG.removeChild(EditThisIsa)
        EditIsaObj=null
     }
       if(CopyIsaArray.length>0)
       {
           for(var k=0;k<CopyIsaArray.length;k++)
           {

              var componentCopy=CopyIsaArray[k]
                componentCopy.removeAttribute("style")
                 var rects=componentCopy.getElementsByTagName("rect")
                rects[rects.length-1].style.cursor = "default"
                rects[rects.length-1].removeAttribute("stroke")



             rects[rects.length-1].setAttribute("onmousedown", "editIsaDraw("+componentCopy.id+", evt)")


           }
            CopyIsaArray=[]
           var elemObjEdit = document.getElementById(DrawIsaEditId)

         var rects=elemObjEdit.getElementsByTagName("rect")
       rects[rects.length-1].style.cursor = "default"
        rects[rects.length-1].removeAttribute("stroke")
        rects[rects.length-1].setAttribute("onmousedown", "editIsaDraw("+DrawIsaEditId+", evt)")




       }

      DrawIsaEditId=null

    closeEditIsa()
}



function cancelDrawEditIsa()
{
          var cw = editElemIsaCw

       var elemObjEdit = document.getElementById(DrawIsaEditId)
       elemObjEdit.style.display = ""



   if(CopyIsaArray.length>0)
       {
           for(var k=0;k<CopyIsaArray.length;k++)
           {

              var componentCopy=CopyIsaArray[k]
               domElemG.removeChild(componentCopy)


           }

          CopyIsaArray=[]
            cw.editIsaEditSpan.innerHTML = "Edit Isa"
       }
       else if(EditIsaObj)
        domActiveElemG.removeChild(EditIsaObj)
     activeElem = null
    ActiveElem = null
    EditIsaObj = null
    // DrawIsaEditId=null

setEditIsa()

}
//-------------------copy component-----------------
var ActiveIsaCopy = false
var CopyIsaArray =[]
var CopyIsaTransX
var CopyIsaTransY
//---toggle copy button----
function copyEditIsa()
{
    var cw = editElemIsaCw
    ActiveIsaCopy = true

    if(document.getElementById("activeElem"))
    {
        var copyMe = document.getElementById(DrawIsaEditId)

        CopyIsaTransX = 0
        CopyIsaTransY = 0
        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "elemIsa")
           var rects=finishedElem.getElementsByTagName("rect")
       rects[rects.length-1].style.cursor = "default"

        finishedElem.setAttribute("id", DrawIsaEditId)
        domActiveElemG.removeChild(EditIsaObj)
        activeElem = null
       ActiveElem = null
         EditIsaObj=null
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("id", DrawIsaEditId)
        domElemG.insertBefore(finishedElem, copyMe)
        domElemG.removeChild(copyMe)

        //CopyIsaArray.push(finishedElem)

       cw.editIsaEditSpan.innerHTML = "Copy &amp; drag copies"
       cw.editIsaDeleteButton.disabled=true
        coverOff()

        //mySVG.appendChild(dragDot) //--place drag dot on top---
        //dragDot.removeAttribute("cx")



        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)


        DraggingObj = false
        DrawIsa = false
        EditIsa = false
        IsaDeleted = false

        mySVG.setAttribute("onmousedown", "startDragIsa(evt)")
        mySVG.setAttribute("onmousemove", "dragIsa(evt)")
        mySVG.setAttribute("onmouseup", "endDragIsa(evt)")

        mySVG.removeAttribute('onclick')

    }
    var copyMe = document.getElementById(DrawIsaEditId)
    var copied = copyMe.cloneNode(true)
      var rects=copied.getElementsByTagName("rect")
       rects[rects.length-1].style.cursor = "move"
    var id = "component"+new Date().getTime()
    copied.setAttribute("id", id)
    copied.setAttribute("class", "dragTargetObj")
    copied.setAttribute("onmousedown", "tagCopyIsa(evt)")
    CopyIsaTransX += 10
    CopyIsaTransY += 10

    var newTransform = mySVG.createSVGTransformFromMatrix(mySVG.createSVGMatrix().translate(CopyIsaTransX, CopyIsaTransY))
    copied.transform.baseVal.appendItem(newTransform)
    copied.transform.baseVal.consolidate()

    domElemG.appendChild(copied)
    CopyIsaArray.push(copied)

}
var CopyIsa
function tagCopyIsa(evt)
{
    CopyIsa = evt.target

}

function flipIsaX()
{
    if(EditIsaObj)
    {
        var bb=EditIsaObj.getBBox()

    var cx=bb.x+.5*bb.width
    var cy=bb.y+.5*bb.width

      var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=EditIsaObj.transform
	var transformList=animTransformList.baseVal

	transformRequestObj.setScale(-1,1)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()
     transformRequestObj.setTranslate(-bb.width,0)
   transformList.appendItem(transformRequestObj)
    transformList.consolidate()



    }




}
function flipIsaY()
{

     if(EditIsaObj)
    {
        var bb=EditIsaObj.getBBox()

    var cx=bb.x+.5*bb.width
    var cy=bb.y+.5*bb.width

      var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=EditIsaObj.transform
	var transformList=animTransformList.baseVal

	transformRequestObj.setScale(1,-1)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()
        transformRequestObj.setTranslate(0,-bb.height)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()
    }




}


//=======================delete component==================
var IsaDeleted = false
//---button---
function removeCurrentDrawIsa()
{
            if(EditIsaObj&&EditIsaObj.parentNode==domActiveElemG)
        domActiveElemG.removeChild(EditIsaObj)

      
    var elemObjEdit = document.getElementById(DrawIsaEditId)
    domElemG.removeChild(elemObjEdit)
    IsaDeleted = true

    var cw = editElemIsaCw
     activeElem=null
     ActiveElem=null
     EditIsaObj=null
    closeEditIsa()


}
//====================Top/Bot===================
function topEditIsa()
{

    var elemObjEdit = document.getElementById(DrawIsaEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "isaElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawIsaEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null
    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)
      EditIsaObj=null    
    closeEditIsa()
}
function botEditIsa()
{
    var elemObjEdit = document.getElementById(DrawIsaEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "isaElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawIsaEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null
    domElemG.removeChild(elemObjEdit)
    domElemG.insertBefore(finishedElem,domElemG.firstChild)
     EditIsaObj=null
   closeEditIsa()
}

var ScaleIsa=false
var SetIsaCenter=[]
function scaleIsa(scale)
{
   if(EditIsaObj)
   {

       if(ScaleIsa==true)
       {
           var cw = editElemIsaCw
           cw.scaleValue.value=scale


         EditIsaObj.setAttribute("myscale",scale)

   if(SetIsaCenter.length==0)
   {

    var bb=EditIsaObj.getBBox()
    //domWrapper.removeChild(wrapperClone)
    var cx=bb.x+.5*bb.width
    var cy=bb.y+.5*bb.height
     SetIsaCenter=[cx,cy]
   }

   var tfm=decomposeMatrix(EditIsaObj.getCTM())
var currentScale=tfm.scaleX
 scale=+scale/currentScale

     var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=EditIsaObj.transform
	var transformList=animTransformList.baseVal

	transformRequestObj.setTranslate(-SetIsaCenter[0]*(scale-1), -SetIsaCenter[1]*(scale-1))
    transformList.appendItem(transformRequestObj)
    transformList.consolidate()
    transformRequestObj.setScale(scale,scale)
    transformList.appendItem(transformRequestObj)

	transformList.consolidate()




       }

   }




}


function editIsaShadowChecked()
{

    var cw = editElemIsaCw
    if(cw.editIsaShadowCheck.checked==true)
    {
        if(document.getElementById("activeElem"))
            document.getElementById("activeElem").setAttribute("filter", "url(#drop-shadow)")

    }
    else
    {
        if(document.getElementById("activeElem"))
            document.getElementById("activeElem").removeAttribute("filter")

    }

}
//---X---
function closeEditIsa()
{


if(EditIsaObj)
        domActiveElemG.removeChild(EditIsaObj)
     activeElem = null
    ActiveElem = null
    EditIsaObj = null

   var elemObjEdit = document.getElementById(DrawIsaEditId)
   if(elemObjEdit)
   {
       elemObjEdit.style.display = ""
   var rects=elemObjEdit.getElementsByTagName("rect")
  rects[rects.length-1].setAttribute("onmousedown", "editIsaDraw("+DrawIsaEditId+",evt)")
    rects[rects.length-1].style.cursor = "default"
       rects[rects.length-1].removeAttribute("stroke")

   }


       DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)

      //----copies---
        for(var k = 0; k<CopyIsaArray.length; k++)
        {
            var copy = CopyIsaArray[k]
            var id = copy.getAttribute("id")

            var rects=copy.getElementsByTagName("rect")
            rects[rects.length-1].setAttribute("onmousedown", "editIsaDraw("+id+",evt)")

            rects[rects.length-1].style.cursor = "default"
       rects[rects.length-1].removeAttribute("stroke")




        }
        ActiveIsaCopy = false
        CopyIsaArray =[]

        EditIsa = false

EditThisIsa = null

     closeIframe("editElemIsa")


      coverOff()

     //coverRect.style.display="none"
        var cw = editElemIsaCw
        cw.editIsaEditSpan.innerHTML="Edit Isa"
          cw.editIsaDeleteButton.disabled=false


}





function setMyFillSelect(EditThisIsa)
{
     var cw = editElemIsaCw
   var paths=EditThisIsa.getElementsByTagName("path")
  for(var k=0;k<paths.length;k++)
  {
    var path=paths[k]
    var fill=path.getAttribute("fill").toLowerCase()

    var fillOpacity=path.getAttribute("fill-opacity")
      

    for(j=0;j<cw.pidColorSelect.options.length;j++)
    {

       var clr=cw.pidColorSelect.options[j].value.toLowerCase()

           if(clr==fill)
           {
              cw.pidColorSelect.selectedIndex=j
               cw.pidColorBg.style.background=clr
            break
           }
           if(fill.indexOf("url")!=-1)
              {
                  cw.pidColorSelect.selectedIndex=0
                   cw.pidColorBg.style.background=""
                 break
            }

    }



    if(fillOpacity)
    for(m=0;m<cw.pidFillOpacitySelect.options.length;m++)
    {
       var opacity=cw.pidFillOpacitySelect.options[m].text
       if(opacity==fillOpacity)
       {
          cw.pidFillOpacitySelect.selectedIndex=m

        break
       }


    }
    else
     cw.pidFillOpacitySelect.selectedIndex=9


    break
  }


}

function pidColorSelected()
{
    var cw = editElemIsaCw
    var clr=cw.pidColorSelect.options[cw.pidColorSelect.selectedIndex].value
    cw.pidColorBg.style.background=clr
    if(EditIsaObj)
        changePidColor(clr)
}
function changePidColor(clr)
{   var cw = editElemIsaCw
     var opacity=cw.pidFillOpacitySelect.options[cw.pidFillOpacitySelect.selectedIndex].text

  var paths=EditIsaObj.getElementsByTagName("path")
  for(var k=0;k<paths.length;k++)
  {
    var path=paths[k]
    if(path.getAttribute("fill")!="none")
    {
        path.setAttribute("fill",clr)

         path.setAttribute("fill-opacity",opacity)

    }

  }
}

function pidFillOpacitySelected()
{
    var cw = editElemIsaCw
    var opacity=cw.pidFillOpacitySelect.options[cw.pidFillOpacitySelect.selectedIndex].text

    if(EditIsaObj)
    {
          var paths=EditIsaObj.getElementsByTagName("path")
          for(var k=0;k<paths.length;k++)
          {
            var path=paths[k]
            if(path.getAttribute("fill")!="none")
                path.setAttribute("fill-opacity",opacity)
          }
    }





}