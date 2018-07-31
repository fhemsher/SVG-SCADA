
function rotateComponentAdjust(factor)
{
    var cw = editElemComponentCw
    var mult = parseFloat(cw.rotateEditComponentAdjustSelect.options[cw.rotateEditComponentAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotateComponentValue.value = rotateAdd+parseFloat(cw.adjustedRotateComponentValue.value)

    if(EditComponentObj)
    {

     if(SetComponentCenter.length==0)
     {
         //---rotate from center---
    //var wrapperClone=activeElem.cloneNode(true)
    //domWrapper.appendChild(wrapperClone)
    var bb=EditComponentObj.getBBox()

    var cx=bb.x+.5*bb.width
    var cy=bb.y+.5*bb.width
    SetComponentCenter=[cx,cy]

   }
    var tfm=decomposeMatrix(EditComponentObj.getCTM())
     var rotation=tfm.rotation

     var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=EditComponentObj.transform
	var transformList=animTransformList.baseVal
	transformRequestObj.setRotate(rotateAdd,SetComponentCenter[0],SetComponentCenter[1])
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()



    }
}

var EditComponent = false
var DrawComponentEditId
var EditThisComponent
//--mousedown/right button on component---
function editDrawComponent(elemObjEdit, evt)
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


EditComponent = false
DrawComponentEditId = null
EditThisComponent = null
        ActiveElem = null
        activeElem = null

    if(isRightMB&&ZoomDrawing==false)
    {
        SetComponentCenter=[]

        EditThisComponent = elemObjEdit

        DrawComponentEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

        EditComponent = true
        if(editElemComponentLoad==false)
        {
            openIframe("AddElem", "editElemComponent", 10)

        }
        else if(editElemComponentViz==false)
        {
            openIframe("AddElem", "editElemComponent", 10)
            setEditComponent()
        }
        else
            setEditComponent()

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

        ZoomDraggedElems.push([dragTarget,"editDrawComponent("+dragTarget.id+",evt)",classed])
    }

}

var EditComponentObj
function setEditComponent()
{
    coverOn()
    domWrapper.removeAttribute("style")
    var cw = editElemComponentCw



    var elemObjEdit = document.getElementById(DrawComponentEditId)
    if(elemObjEdit)
    {
    EditThisComponent=elemObjEdit






    cw.scaleRangeValue.value=elemObjEdit.getAttribute("myscale")
    cw.scaleValue.value=elemObjEdit.getAttribute("myscale")
    cw.adjustedRotateComponentValue.value=0

    if(elemObjEdit.getAttribute("filter"))
        cw.editComponentShadowCheck.checked = true
   else
      cw.editComponentShadowCheck.checked = false


    EditComponentObj = elemObjEdit.cloneNode(true)
     elemObjEdit.style.display = "none"


    EditComponentObj.setAttribute("id", "activeElem")


   EditComponentObj.setAttribute("class", "dragTargetObj")
   var rects=EditComponentObj.getElementsByTagName("rect")
  rects[rects.length-1].removeAttribute("onmousedown")
rects[rects.length-1].setAttribute("stroke","orange")
rects[rects.length-1].setAttribute("vector-effects","non-scaling-stroke")
rects[rects.length-1].setAttribute("stroke-width","6")
rects[rects.length-1].setAttribute("stroke-opacity",".5")
rects[rects.length-1].style.cursor="move"

    ActiveElem = d3.select("#activeElem")
   activeElem = document.getElementById("activeElem")


        domActiveElemG.insertBefore(EditComponentObj,domActiveElemG.firstChild)


          setComponentEditDrag()

            mySVG.style.cursor = ""
    }
}

function setComponentEditDrag()
{



    mySVG.setAttribute("onmousedown", "startDragComponent(evt)")
    mySVG.setAttribute("onmousemove", "dragComponent(evt)")
    mySVG.setAttribute("onmouseup", "endDragComponent(evt)")

  showSourceSVG()
}

function finishEditComponent()
{

    if(document.getElementById("activeElem"))
    {
        var cw = editElemComponentCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "componentElem")


             finishedElem.setAttribute("id", DrawComponentEditId)


        finishedElem.setAttribute("id", DrawComponentEditId)

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        activeElem=null
        ActiveElem=null
            var rects=finishedElem.getElementsByTagName("rect")
       rects[rects.length-1].style.cursor = "default"
        rects[rects.length-1].removeAttribute("stroke")
        rects[rects.length-1].setAttribute("onmousedown", "editDrawComponent("+DrawComponentEditId+", evt)")



        finishedElem.setAttribute("myscale", cw.scaleValue.value)



        domElemG.insertBefore(finishedElem, EditThisComponent)
        domElemG.removeChild(EditThisComponent)
       


        EditComponentObj=null
     }
       if(CopyComponentArray.length>0)
       {
           for(var k=0;k<CopyComponentArray.length;k++)
           {

              var componentCopy=CopyComponentArray[k]
                componentCopy.removeAttribute("style")
                 var rects=componentCopy.getElementsByTagName("rect")
                rects[rects.length-1].style.cursor = "default"
                rects[rects.length-1].removeAttribute("stroke")



             rects[rects.length-1].setAttribute("onmousedown", "editDrawComponent("+componentCopy.id+", evt)")


           }
            CopyComponentArray=[]

         var elemObjEdit = document.getElementById(DrawComponentEditId)

         var rects=elemObjEdit.getElementsByTagName("rect")
       rects[rects.length-1].style.cursor = "default"
        rects[rects.length-1].removeAttribute("stroke")
        rects[rects.length-1].setAttribute("onmousedown", "editDrawComponent("+DrawComponentEditId+", evt)")




       }

      DrawComponentEditId=null

    closeEditComponent()
}



function cancelDrawEditComponent()
{
          var cw = editElemComponentCw

       var elemObjEdit = document.getElementById(DrawComponentEditId)
       elemObjEdit.style.display = ""



   if(CopyComponentArray.length>0)
       {
           for(var k=0;k<CopyComponentArray.length;k++)
           {

              var componentCopy=CopyComponentArray[k]
               domElemG.removeChild(componentCopy)


           }

          CopyComponentArray=[]
            cw.editComponentEditSpan.innerHTML = "Edit Component"
       }
       else if(EditComponentObj)
        domActiveElemG.removeChild(EditComponentObj)
     activeElem = null
    ActiveElem = null
    EditComponentObj = null
     DrawComponentEditId=null

setEditComponent()

}
//-------------------copy component-----------------
var ActiveComponentCopy = false
var CopyComponentArray =[]
var CopyComponentTransX
var CopyComponentTransY
//---toggle copy button----
function copyEditComponent()
{
    var cw = editElemComponentCw
    ActiveComponentCopy = true

    if(document.getElementById("activeElem"))
    {
        var copyMe = document.getElementById(DrawComponentEditId)

        CopyComponentTransX = 0
        CopyComponentTransY = 0
        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "componentElem")
           var rects=finishedElem.getElementsByTagName("rect")
       rects[rects.length-1].style.cursor = "default"

        finishedElem.setAttribute("id", DrawComponentEditId)
        domActiveElemG.removeChild(EditComponentObj)
        activeElem = null
       ActiveElem = null
         EditComponentObj=null
        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("id", DrawComponentEditId)
        domElemG.insertBefore(finishedElem, copyMe)
        domElemG.removeChild(copyMe)

        //CopyComponentArray.push(finishedElem)

       cw.editComponentEditSpan.innerHTML = "Copy &amp; drag copies"
       cw.editComponentDeleteButton.disabled=true
        coverOff()

        //mySVG.appendChild(dragDot) //--place drag dot on top---
        //dragDot.removeAttribute("cx")



        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)


        DraggingObj = false
        DrawComponent = false
        EditComponent = false
        ComponentDeleted = false

        mySVG.setAttribute("onmousedown", "startDragComponent(evt)")
        mySVG.setAttribute("onmousemove", "dragComponent(evt)")
        mySVG.setAttribute("onmouseup", "endDragComponent(evt)")

        mySVG.removeAttribute('onclick')

    }
    var copyMe = document.getElementById(DrawComponentEditId)
    var copied = copyMe.cloneNode(true)
      var rects=copied.getElementsByTagName("rect")
       rects[rects.length-1].style.cursor = "move"
    var id = "component"+new Date().getTime()
    copied.setAttribute("id", id)
    copied.setAttribute("class", "dragTargetObj")
    copied.setAttribute("onmousedown", "tagCopyComponent(evt)")
    CopyComponentTransX += 10
    CopyComponentTransY += 10

    var newTransform = mySVG.createSVGTransformFromMatrix(mySVG.createSVGMatrix().translate(CopyComponentTransX, CopyComponentTransY))
    copied.transform.baseVal.appendItem(newTransform)
    copied.transform.baseVal.consolidate()

    domElemG.appendChild(copied)
    CopyComponentArray.push(copied)

}
var CopyComponent
function tagCopyComponent(evt)
{
    CopyComponent = evt.target

}

function flipComponentX()
{
    if(EditComponentObj)
    {
        var bb=EditComponentObj.getBBox()

    var cx=bb.x+.5*bb.width
    var cy=bb.y+.5*bb.width

      var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=EditComponentObj.transform
	var transformList=animTransformList.baseVal

	transformRequestObj.setScale(-1,1)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()
     transformRequestObj.setTranslate(-bb.width,0)
   transformList.appendItem(transformRequestObj)
    transformList.consolidate()



    }




}
function flipComponentY()
{

     if(EditComponentObj)
    {
        var bb=EditComponentObj.getBBox()

    var cx=bb.x+.5*bb.width
    var cy=bb.y+.5*bb.width

      var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=EditComponentObj.transform
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
var ComponentDeleted = false
//---button---
function removeCurrentDrawComponent()
{

       domActiveElemG.removeChild(EditComponentObj)
    var elemObjEdit = document.getElementById(DrawComponentEditId)
    domElemG.removeChild(elemObjEdit)
    ComponentDeleted = true

    var cw = editElemComponentCw
     activeElem=null
     ActiveElem=null
     EditComponentObj=null
    closeEditComponent()


}
//====================Top/Bot===================
function topEditComponent()
{

    var elemObjEdit = document.getElementById(DrawComponentEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "componentElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawComponentEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null
    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)
    EditComponentObj=null
    closeEditComponent()
}
function botEditComponent()
{
    var elemObjEdit = document.getElementById(DrawComponentEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "componentElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawComponentEditId)

    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null
    domElemG.removeChild(elemObjEdit)
    domElemG.insertBefore(finishedElem,domElemG.firstChild)
    EditComponentObj=null
   closeEditComponent()
}

var ScaleComponent=false
var SetComponentCenter=[]
function scaleComponent(scale)
{
   if(EditComponentObj)
   {

       if(ScaleComponent==true)
       {
           var cw = editElemComponentCw
           cw.scaleValue.value=scale


         EditComponentObj.setAttribute("myscale",scale)

   if(SetComponentCenter.length==0)
   {

    var bb=EditComponentObj.getBBox()
    //domWrapper.removeChild(wrapperClone)
    var cx=bb.x+.5*bb.width
    var cy=bb.y+.5*bb.height
     SetComponentCenter=[cx,cy]
   }

   var tfm=decomposeMatrix(EditComponentObj.getCTM())
var currentScale=tfm.scaleX
 scale=+scale/currentScale

     var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=EditComponentObj.transform
	var transformList=animTransformList.baseVal

	transformRequestObj.setTranslate(-SetComponentCenter[0]*(scale-1), -SetComponentCenter[1]*(scale-1))
    transformList.appendItem(transformRequestObj)
    transformList.consolidate()
    transformRequestObj.setScale(scale,scale)
    transformList.appendItem(transformRequestObj)

	transformList.consolidate()




       }

   }




}


function editComponentShadowChecked()
{

    var cw = editElemComponentCw
    if(cw.editComponentShadowCheck.checked==true)
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
function closeEditComponent()
{


if(EditComponentObj)
        domActiveElemG.removeChild(EditComponentObj)
     activeElem = null
    ActiveElem = null
    EditComponentObj = null

   var elemObjEdit = document.getElementById(DrawComponentEditId)
   if(elemObjEdit)
   {
       elemObjEdit.style.display = ""
   var rects=elemObjEdit.getElementsByTagName("rect")
  rects[rects.length-1].setAttribute("onmousedown", "editDrawComponent("+DrawComponentEditId+",evt)")
    rects[rects.length-1].style.cursor = "default"
       rects[rects.length-1].removeAttribute("stroke")

   }


       DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)

      //----copies---
        for(var k = 0; k<CopyComponentArray.length; k++)
        {
            var copy = CopyComponentArray[k]
            var id = copy.getAttribute("id")

            var rects=copy.getElementsByTagName("rect")
            rects[rects.length-1].setAttribute("onmousedown", "editDrawComponent("+id+",evt)")

            rects[rects.length-1].style.cursor = "default"
       rects[rects.length-1].removeAttribute("stroke")




        }
        ActiveComponentCopy = false
        CopyComponentArray =[]

        EditComponent = false

EditThisComponent = null

     closeIframe("editElemComponent")


      coverOff()

     //coverRect.style.display="none"
        var cw = editElemComponentCw
        cw.editComponentEditSpan.innerHTML="Edit Component"
          cw.editComponentDeleteButton.disabled=false


}





function setMyFillSelect(EditThisComponent)
{
     var cw = editElemComponentCw
   var paths=EditThisComponent.getElementsByTagName("path")
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
    var cw = editElemComponentCw
    var clr=cw.pidColorSelect.options[cw.pidColorSelect.selectedIndex].value
    cw.pidColorBg.style.background=clr
    if(EditComponentObj)
        changePidColor(clr)
}
function changePidColor(clr)
{   var cw = editElemComponentCw
     var opacity=cw.pidFillOpacitySelect.options[cw.pidFillOpacitySelect.selectedIndex].text

  var paths=EditComponentObj.getElementsByTagName("path")
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
    var cw = editElemComponentCw
    var opacity=cw.pidFillOpacitySelect.options[cw.pidFillOpacitySelect.selectedIndex].text

    if(EditComponentObj)
    {
          var paths=EditComponentObj.getElementsByTagName("path")
          for(var k=0;k<paths.length;k++)
          {
            var path=paths[k]
            if(path.getAttribute("fill")!="none")
                path.setAttribute("fill-opacity",opacity)
          }
    }





}