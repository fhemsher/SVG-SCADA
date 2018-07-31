var ProcessDoc
function getProcessLibrary()
{
    if(!ProcessDoc)
    {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "LIBRARY/Process.svg", true);
    xhr.onload = function()
    {
        var xmlString = this.responseText

        //---DOMParser---
        var parser = new DOMParser();
        ProcessDoc = parser.parseFromString(xmlString, "text/xml").documentElement;


          var rowCnt=1
        //---clear previous table----
        var rows = processTable.rows
        for(var k = rows.length-1; k>=0; k--)
            processTable.deleteRow(rows[k])
            var row = processTable.insertRow(0)
            row.align = "center"
            var categoryCell = row.insertCell(0).innerHTML = "Category"

            var titleCell = row.insertCell(1).innerHTML = "Title"


            var previewCell = row.insertCell(2)

            //----write table---
            var svgz = ProcessDoc.childNodes
       var utcMS=new Date().getTime()

        for(var k = 0; k<svgz.length; k++)
        {

            var svg = svgz.item(k)
            if(svg.nodeName!="#text")
            {
            var myClass=svg.getAttribute("class")
            var id = myClass+utcMS+rowCnt
            var category = myClass
            var title = svg.getAttribute("title")

        var nativeWidth=svg.getAttribute("width")
        var nativeHeight=svg.getAttribute("height")

        svg.setAttribute("width","100%")
        svg.setAttribute("height","100%")
        svg.setAttribute("nativewidth",nativeWidth)
        svg.setAttribute("nativeheight",nativeHeight)

            svg.setAttribute("overflow","visible")
              var clone=svg.cloneNode(true)
              clone.setAttribute("id",id)
              clone.setAttribute("myscale","1.0")
            //---customize linear gradient fills to prevent cross-contamination---
          var linearGrads=clone.getElementsByTagName("linearGradient")
          var gradientIdz=[]
          for(j=0;j<linearGrads.length;j++)
          {
              var lg=linearGrads[j]
              var myId=lg.id
              lg.id=myId+"_"+k
              gradientIdz.push([myId,myId+"_"+k])

          }

        var paths=clone.getElementsByTagName("path")
         for(j=0;j<paths.length;j++)
         {
            var path=paths[j]
            if(path.getAttribute("fill").indexOf("url")!=-1)
            {
                var urlId=path.getAttribute("fill").split(/\(#/)[1].split(/\)/)[0]
                for(i=0;i<gradientIdz.length;i++)
                {
                     var oldId=gradientIdz[i][0]
                     var newId=gradientIdz[i][1]
                     if(urlId==oldId)
                     {
                       path.setAttribute("fill","url(#"+newId+")")

                        break
                     }

                }

            }
         }




            var row = processTable.insertRow(rowCnt++)

            var cntr = (rowCnt+1)/2+""
            if(cntr.indexOf('.')!=-1)
                var bg = "#e0ffff"
                else
                    var bg = "#7fffd4"
                    row.style.background = bg

                    var categoryCell = row.insertCell(0).innerHTML = category

                    var titleCell = row.insertCell(1).innerHTML = title

                    var previewCell = row.insertCell(2)
                     previewCell.style.padding="5px"

                    
                     var svgString=new XMLSerializer().serializeToString(clone)
                    previewCell.innerHTML ="<div style='width:60px;height:60px;'>"+svgString+"</div>"
                    previewCell.title="Click to place in drawing"


                    previewCell.setAttribute("onClick","this.style.border='4px inset violet';placeProcessInDrawing("+id+")")
                        var processSVG=document.getElementById(id)
                    	var bb=processSVG.getBBox()
                    	var bbw=bb.width
                    	var bbh=bb.height
                          var divWH=60
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
        processTableCloseButton.style.visibility="visible"
        hmiIntroDiv.style.visibility="hidden"

   componentHelpLibraryDiv.style.visibility="hidden"
   componentHelpLibraryDiv.style.height="1px"
   ProcessHelpLibraryDiv.style.visibility="hidden"
   ProcessHelpLibraryDiv.style.height="1px"
   helpDiv.style.visibility="hidden"
   helpDiv.style.height="1px"
        processTableDiv.style.top = "60px"
        processTableDiv.style.visibility = "visible"
        console.log(rowCnt)
        setProcessEditDrag()
         getProcessLibraryButton.style.borderStyle = "inset"
         disableAllButtons()
    }
    xhr.send()
   }
    else
    {    processTableCloseButton.style.visibility="visible"
        hmiIntroDiv.style.visibility="hidden"

        componentHelpLibraryDiv.style.visibility="hidden"
        componentHelpLibraryDiv.style.height="1px"
        ProcessHelpLibraryDiv.style.visibility="hidden"
        ProcessHelpLibraryDiv.style.height="1px"
        helpDiv.style.visibility="hidden"
        helpDiv.style.height="1px"
        processTableDiv.style.top = "60px"
        processTableDiv.style.visibility = "visible"
         LoadedProcessArray=[]
        setProcessEditDrag()
          disableAllButtons()
    }

}


var LoadedProcessArray=[]
function placeProcessInDrawing(id)
{


   var process=id.cloneNode("true")
   process.removeAttribute("id")


  // process.removeAttribute("title")
  var nativeWidth=process.getAttribute("nativewidth")
  var nativeHeight=process.getAttribute("nativeheight")
   var processG=document.createElementNS(NS,"g")


    processG.setAttribute("title",process.getAttribute("title"))
    processG.setAttribute("parentid",process.id)
  process.setAttribute("width",nativeWidth)
  process.setAttribute("height",nativeHeight)
  processG.setAttribute("nativewidth",nativeWidth)
  processG.setAttribute("nativeheight",nativeHeight)
  processG.setAttribute("myscale",".5")
  processG.setAttribute("transform","scale(.5)")

    var utcms=new Date().getTime()
    var id="process"+utcms
   processG.setAttribute("id",id)
   var myRect=document.createElementNS(NS,"rect")
   myRect.setAttribute("width",nativeWidth)
   myRect.setAttribute("height",nativeHeight)
   myRect.setAttribute("stroke","none")
   myRect.setAttribute("stroke-width","2")
   myRect.setAttribute("fill","white")
   myRect.setAttribute("fill-opacity",0)
    processG.setAttribute("class", "dragTargetObj")
    myRect.style.cursor="move"
     myRect.setAttribute('onmousedown',"editProcess("+id+",evt)")

  processG.appendChild(process)
  processG.appendChild(myRect)

    LoadedProcessArray.push(processG)

   domElemG.appendChild(processG)


   showSourceSVG()
}


function closeProcessTable()
{
   for(var k=0;k<LoadedProcessArray.length;k++)
   {
      var processG=LoadedProcessArray[k]
      processG.getElementsByTagName("rect")[0].setAttribute('onmousedown',"editProcess("+processG.id+",evt)")
      processG.removeAttribute("class")
    processG.getElementsByTagName("rect")[0].style.cursor="default"


   }
   mySVG.removeAttribute("onmousedown")
   mySVG.removeAttribute("onmousemove")
   mySVG.removeAttribute("onmouseup")
      getProcessLibraryButton.style.borderStyle = ""
    enableAllButtons()
   processTableCloseButton.style.visibility="hidden"
  processTableDiv.style.visibility='hidden'
}


//=======================================

function rotateProcessAdjust(factor)
{
    var cw = editElemProcessCw
    var mult = parseFloat(cw.rotateEditProcessAdjustSelect.options[cw.rotateEditProcessAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotateProcessValue.value = rotateAdd+parseFloat(cw.adjustedRotateProcessValue.value)

    if(ActiveElem)
    {

     if(SetProcessCenter.length==0)
     {
         //---rotate from center---
    //var wrapperClone=activeElem.cloneNode(true)
    //domWrapper.appendChild(wrapperClone)
    var bb=activeElem.getBBox()

    var cx=bb.x+.5*bb.width
    var cy=bb.y+.5*bb.width
    SetProcessCenter=[cx,cy]

   }
    var tfm=decomposeMatrix(activeElem.getCTM())
     var rotation=tfm.rotation
     console.log(rotation)
     var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=activeElem.transform
	var transformList=animTransformList.baseVal
	transformRequestObj.setRotate(rotateAdd,SetProcessCenter[0],SetProcessCenter[1])
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()



    }
}

function flipProcessX()
{
    if(ActiveElem)
    {
        var bb=activeElem.getBBox()

    var cx=bb.x+.5*bb.width
    var cy=bb.y+.5*bb.width

      var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=activeElem.transform
	var transformList=animTransformList.baseVal

	transformRequestObj.setScale(-1,1)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()
     transformRequestObj.setTranslate(-bb.width,0)
   transformList.appendItem(transformRequestObj)
    transformList.consolidate()



    }




}
function flipProcessY()
{

     if(ActiveElem)
    {
        var bb=activeElem.getBBox()

    var cx=bb.x+.5*bb.width
    var cy=bb.y+.5*bb.width

      var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=activeElem.transform
	var transformList=animTransformList.baseVal

	transformRequestObj.setScale(1,-1)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()
        transformRequestObj.setTranslate(0,-bb.height)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()
    }




}

var EditProcess = false
var DrawProcessEditId
var EditThisProcess
//--mousedown/right button on component---
function editProcess(elemObjEdit, evt)
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

    if(isRightMB&&ZoomDrawing==false)
    {
        SetProcessCenter=[]

        EditThisProcess = elemObjEdit

        DrawProcessEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null

       if(processTableDiv.style.visibility=='visible')
        closeProcessTable()


        EditProcess = true
        if(editElemProcessLoad==false)
        {
            openIframe("AddElem", "editElemProcess", 10)

        }
        else if(editElemProcessViz==false)
        {
            openIframe("AddElem", "editElemProcess", 10)
            setEditProcess()
        }
        else
            setEditProcess()

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

        elemObjEdit.setAttribute("style","cursor:move")
       dragTarget.setAttribute("opacity",.4)
        DrawX.style("display", "none")

        ZoomDraggedElems.push([dragTarget,"editProcess("+dragTarget.id+",evt)",classed])
    }

}













var EditProcessObj
function setEditProcess()
{
    coverOn()
    domWrapper.removeAttribute("style")
    var cw = editElemProcessCw
    cw.editProcessDeleteButton.disabled=false






    var elemObjEdit = document.getElementById(DrawProcessEditId)
       EditThisProcess = elemObjEdit

     cw.editProcessEditSpan.innerHTML=elemObjEdit.getAttribute("title")




    cw.scaleRangeValue.value=elemObjEdit.getAttribute("myscale")
    cw.scaleValue.value=elemObjEdit.getAttribute("myscale")
    cw.adjustedRotateProcessValue.value=0

    if(elemObjEdit.getAttribute("filter"))
        cw.editProcessShadowCheck.checked = true
   else
      cw.editProcessShadowCheck.checked = false


    EditProcessObj = elemObjEdit.cloneNode(true)
     elemObjEdit.style.display = "none"


    EditProcessObj.setAttribute("id", "activeElem")


   EditProcessObj.setAttribute("class", "dragTargetObj")
   EditProcessObj.getElementsByTagName("rect")[0].removeAttribute("onmousedown")

    EditProcessObj.getElementsByTagName("rect")[0].style.cursor="move"





        domActiveElemG.insertBefore(EditProcessObj,domActiveElemG.firstChild)
        ActiveElem = d3.select("#activeElem")
        activeElem = document.getElementById("activeElem")


        activeElem.getElementsByTagName("rect")[0].setAttribute("stroke","orange")








          setProcessEditDrag()

            mySVG.style.cursor = ""

}

function setProcessEditDrag()
{



    mySVG.setAttribute("onmousedown", "startDragProcess(evt)")
    mySVG.setAttribute("onmousemove", "dragProcess(evt)")
    mySVG.setAttribute("onmouseup", "endDragProcess(evt)")


}

function finishEditProcess()
{

    if(document.getElementById("activeElem"))
    {
        var cw = editElemProcessCw

        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "processElem")

        finishedElem.setAttribute("id", DrawProcessEditId)
        finishedElem.getElementsByTagName("rect")[0].setAttribute("onmousedown", "editProcess("+DrawProcessEditId+", evt)")
        finishedElem.setAttribute("id", DrawProcessEditId)

        domActiveElemG.removeChild(document.getElementById("activeElem"))
        activeElem=null
        ActiveElem=null

       finishedElem.getElementsByTagName("rect")[0].style.cursor = "default"
       finishedElem.getElementsByTagName("rect")[0].setAttribute("stroke","none")



        finishedElem.setAttribute("myscale", cw.scaleValue.value)
        domElemG.insertBefore(finishedElem, EditThisProcess)
        domElemG.removeChild(EditThisProcess)
     }
       if(CopyProcessArray.length>0)
       {
           for(var k=0;k<CopyProcessArray.length;k++)
           {

              var componentCopy=CopyProcessArray[k]
                componentCopy.removeAttribute("style")
        componentCopy.getElementsByTagName("rect")[0].style.cursor = "default"
       componentCopy.getElementsByTagName("rect")[0].setAttribute("stroke","none")
             componentCopy.getElementsByTagName("rect")[0].setAttribute("onmousedown", "editProcess("+componentCopy.id+", evt)")


           }

          CopyProcessArray=[]
           var elemObjEdit = document.getElementById(DrawProcessEditId)

         elemObjEdit.getElementsByTagName("rect")[0].setAttribute("onmousedown", "editProcess("+DrawProcessEditId+", evt)")
          elemObjEdit.getElementsByTagName("rect")[0].style.cursor = "default"
       elemObjEdit.getElementsByTagName("rect")[0].setAttribute("stroke","none")

       }



    closeEditProcess()
}



function cancelDrawEditProcess()
{
          var cw = editElemProcessCw

       var elemObjEdit = document.getElementById(DrawProcessEditId)
       elemObjEdit.style.display = ""



   if(CopyProcessArray.length>0)
       {
           for(var k=0;k<CopyProcessArray.length;k++)
           {

              var componentCopy=CopyProcessArray[k]
               domElemG.removeChild(componentCopy)


           }

          CopyProcessArray=[]
            cw.editProcessEditSpan.innerHTML = "Edit Process"
       }
       else if(activeElem)
        domActiveElemG.removeChild(document.getElementById("activeElem"))
     activeElem = null
    ActiveElem = null


setEditProcess()

}
//-------------------copy component-----------------
var ActiveProcessCopy = false
var CopyProcessArray =[]
var CopyProcessTransX
var CopyProcessTransY
//---toggle copy button----
function copyEditProcess()
{
    var cw = editElemProcessCw
    ActiveProcessCopy = true

    if(document.getElementById("activeElem"))
    {
        var copyMe = document.getElementById(DrawProcessEditId)

        CopyProcessTransX = 0
        CopyProcessTransY = 0
        var finishedElem = document.getElementById("activeElem").cloneNode(true)
        finishedElem.setAttribute("class", "processElem")
        finishedElem.removeAttribute("style")

        finishedElem.setAttribute("id", DrawProcessEditId)
        domActiveElemG.removeChild(document.getElementById("activeElem"))
        activeElem = null
       ActiveElem = null

        finishedElem.style.cursor = "default"

        finishedElem.setAttribute("id", DrawProcessEditId)
        domElemG.insertBefore(finishedElem, copyMe)
        domElemG.removeChild(copyMe)

        //CopyProcessArray.push(finishedElem)

       cw.editProcessEditSpan.innerHTML = "Copy &amp; drag copies"
       cw.editProcessDeleteButton.disabled=true
        coverOff()

        //mySVG.appendChild(dragDot) //--place drag dot on top---
        //dragDot.removeAttribute("cx")



        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)


        DraggingObj = false
        DrawProcess = false
        EditProcess = false
        ProcessDeleted = false

        mySVG.setAttribute("onmousedown", "startDragProcess(evt)")
        mySVG.setAttribute("onmousemove", "dragProcess(evt)")
        mySVG.setAttribute("onmouseup", "endDragProcess(evt)")

        mySVG.removeAttribute('onclick')

    }
    var copyMe = document.getElementById(DrawProcessEditId)
    var copied = copyMe.cloneNode(true)
    copied.setAttribute("style", "cursor:move")
    var id = "component"+new Date().getTime()
    copied.setAttribute("id", id)
    copied.setAttribute("class", "dragTargetObj")
    copied.setAttribute("onmousedown", "tagCopyProcess(evt)")
    CopyProcessTransX += 10
    CopyProcessTransY += 10

    var newTransform = mySVG.createSVGTransformFromMatrix(mySVG.createSVGMatrix().translate(CopyProcessTransX, CopyProcessTransY))
    copied.transform.baseVal.appendItem(newTransform)
    copied.transform.baseVal.consolidate()

    domElemG.appendChild(copied)
    CopyProcessArray.push(copied)

}
var CopyProcess
function tagCopyProcess(evt)
{
    CopyProcess = evt.target

}

//=======================delete component==================
var ProcessDeleted = false
//---button---
function removeCurrentDrawProcess()
{

    domActiveElemG.removeChild(activeElem)
    var elemObjEdit = document.getElementById(DrawProcessEditId)
    domElemG.removeChild(elemObjEdit)
    ProcessDeleted = true

    var cw = editElemProcessCw
     activeElem=null
     ActiveElem=null
    closeEditProcess()

}
//====================Top/Bot===================
function topEditProcess()
{

    var elemObjEdit = document.getElementById(DrawProcessEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "processElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawProcessEditId)
     finishedElem.getElementsByTagName("rect")[0].setAttribute("onmousedown", "editProcess("+DrawProcessEditId+", evt)")
         finishedElem.getElementsByTagName("rect")[0].style.cursor = "default"
       finishedElem.getElementsByTagName("rect")[0].setAttribute("stroke","none")

    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)


    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem=null
    ActiveElem=null
    closeIframe("editElemProcess")
       coverOff()
}
function botEditProcess()
{
    var elemObjEdit = document.getElementById(DrawProcessEditId)
    var finishedElem = document.getElementById("activeElem").cloneNode(true)
    finishedElem.setAttribute("class", "processElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawProcessEditId)
     finishedElem.getElementsByTagName("rect")[0].setAttribute("onmousedown", "editProcess("+DrawProcessEditId+", evt)")
              finishedElem.getElementsByTagName("rect")[0].style.cursor = "default"
       finishedElem.getElementsByTagName("rect")[0].setAttribute("stroke","none")


 domActiveElemG.removeChild(document.getElementById("activeElem"))
   activeElem=null
   ActiveElem=null

    domElemG.removeChild(elemObjEdit)
    domElemG.insertBefore(finishedElem,domElemG.firstChild)

  closeIframe("editElemProcess")
       coverOff()

}

var ScaleProcess=false
var SetProcessCenter=[]
function scaleProcess(scale)
{
   if(activeElem)
   {
       if(ScaleProcess==true)
       {
           var cw = editElemProcessCw
           cw.scaleValue.value=scale


         activeElem.setAttribute("myscale",scale)

   if(SetProcessCenter.length==0)
   {
               //---scale from center---
    //var wrapperClone=activeElem.cloneNode(true)
   // domWrapper.appendChild(wrapperClone)
    var bb=activeElem.getBBox()
    //domWrapper.removeChild(wrapperClone)
    var cx=bb.x+.5*bb.width
    var cy=bb.y+.5*bb.width
     SetProcessCenter=[cx,cy]
   }

   var tfm=decomposeMatrix(activeElem.getCTM())
var currentScale=tfm.scaleX
 scale=+scale/currentScale

     var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=activeElem.transform
	var transformList=animTransformList.baseVal

	transformRequestObj.setTranslate(-SetProcessCenter[0]*(scale-1), -SetProcessCenter[1]*(scale-1))
    transformList.appendItem(transformRequestObj)
    transformList.consolidate()
    transformRequestObj.setScale(scale,scale)
    transformList.appendItem(transformRequestObj)

	transformList.consolidate()




       }

   }




}


function editProcessShadowChecked()
{

    var cw = editElemProcessCw
    if(cw.editProcessShadowCheck.checked==true)
    {
        if(ActiveElem)
            ActiveElem.attr("filter", "url(#drop-shadow)")

    }
    else
    {
        if(ActiveElem)
            activeElem.removeAttribute("filter")

    }

}
//---X---
function closeEditProcess()
{

if(activeElem)
{

    domActiveElemG.removeChild(activeElem)
        activeElem=null
        ActiveElem=null

}

var elemObjEdit = document.getElementById(DrawProcessEditId)
if(elemObjEdit)
{
       elemObjEdit.style.display = ""
  elemObjEdit.getElementsByTagName("rect")[0].style.cursor = "default"
     elemObjEdit.getElementsByTagName("rect")[0].setAttribute("stroke","none")

      //----copies---
        for(var k = 0; k<CopyProcessArray.length; k++)
        {
            var copy = CopyProcessArray[k]
            var id = copy.getAttribute("id")
            copy.getElementsByTagName("rect")[0].setAttribute("onmousedown", "editProcess("+id+",evt)")

           copy.getElementsByTagName("rect")[0].style.cursor = "default"
       copy.getElementsByTagName("rect")[0].removeAttribute("stroke")




        }
        ActiveProcessCopy = false


     EditProcessObj.getElementsByTagName("rect")[0].setAttribute("onmousedown", "editProcess("+DrawProcessEditId+", evt)")
}
       DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)
     closeIframe("editElemProcess")
       coverOff()
     coverRect.style.display="none"
}

