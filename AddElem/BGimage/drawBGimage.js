
var ActiveBGImage
function placeDrawBGImage()
{
     bgImageG=document.getElementById("bgImageG")
    if(bgImageG.childNodes.length>0)
         bgImageG.removeChild(bgImageG.childNodes[0])


    var cw = addElemBGImageCw
    coverOn()

    var opacity = cw.drawBGImageOpacitySelect.options[cw.drawBGImageOpacitySelect.selectedIndex].text


    ActiveElem = ActiveElemG.append("g")
    .attr("id", "activeElem")
    .attr("class", "dragTargetObj")
    .attr("pointer-events", null)

    ActiveBGImage = ActiveElem.append("image")
    .attr("id", "activeBGImage")
    .style("cursor", "move")
    .attr("opacity", opacity)
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", BGImageHeight)
    .attr("width", BGImageWidth)
    .attr("href",ImageHREF)


    //---place ImgDragArrow in g---
    activeElem = document.getElementById("activeElem")

       domActiveElemG.appendChild(imgDragArrow)
        //ImgDragArrow.attr("cx", bb.width)




         ImgDragArrow.attr("class", "dragTargetObj")
        ImgDragArrow.attr("transform", "translate("+(SVGx+BGImageWidth)+" "+(SVGy+BGImageHeight)+")")
        ImgDragArrow.style("visibility", "visible")


        //activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")

    ActiveElem.attr("transform","translate("+SVGx+" "+SVGy+")")





        BGImageCorner =[0, 0]


        mySVG.removeAttribute('onclick')

        mySVG.setAttribute("onmousedown", "startDragBGImage(evt)")
        mySVG.setAttribute("onmousemove", "dragBGImage(evt)")
        mySVG.setAttribute("onmouseup", "endDragBGImage(evt)")

        cw.drawBGImageCancelButton.disabled = false
        cw.drawBGImageFinishButton.disabled = false

}

var ImageHREF
var BGImageWidth
var BGImageHeight
function loadBGImageFile()
{

    var cw = addElemBGImageCw

    var file = cw.document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function ()
        {

            ImageHREF = reader.result
             var image = new Image();
            image.src = reader.result;
            image.onload = function()
            {

                var initWidth=image.naturalWidth
                var initHeight=image.naturalHeight
                if(initWidth>600||initHeight>600)
                {
                 if(initWidth>=initHeight)
                    var maxSize=initWidth
                    else
                    var maxSize=initHeight

                     var sizeRatio=600/maxSize
                    BGImageWidth=initWidth*sizeRatio
                    BGImageHeight=initHeight*sizeRatio

                }
                else
                {
                    BGImageWidth=image.naturalWidth
                    BGImageHeight=image.naturalHeight
                }


                cw.bgImageWidthValue.value = BGImageWidth.toFixed(0)
                cw.bgImageHeightValue.value = BGImageHeight.toFixed(0)
            }
        }
        , false);

    if (file)
    {
        reader.readAsDataURL(file);

    }
}


///---X button and iframe close all---
function closeDrawBGImage()
{
    if(addElemBGImageViz==true)
    {
        RotateAngle = 0
        closeIframe("addElemBGImage");
        var cw = addElemBGImageCw

        if(EditBGImage==true && BGImageDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawBGImageEditId)
            elemObjEdit.style.visibility = ""

            elemObjEdit.setAttribute("onmousedown", "editBGImageDraw("+DrawBGImageEditId+",evt)")
        }
        DraggingObj = false
        DrawBGImage = false
        EditBGImage = false
        BGImageDeleted = false

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")
        mySVG.removeAttribute('onclick')
        if(document.getElementById("activeElem"))
        {
            mySVG.appendChild(imgDragArrow)
            document.getElementById("activeElem").removeAttribute("class")
            domActiveElemG.removeChild(document.getElementById("activeElem"))
        }

        if(ActiveElem)
            ActiveElem.style("cursor", null)

            ActiveElem = null
            DrawX.style("display", "none")
            DrawX.attr("stroke", "violet")
            DrawX.attr("transform", null)
            ImgDragArrow.style("visibility", "hidden")
            ImgDragArrow.attr("transform", null)
            ImgDragArrow.attr("x", -12.5)
            ImgDragArrow.attr("y", -12.5)
             var cw = addElemBGImageCw


            cw.drawBGImageFinishButton.disabled = true
            cw.drawBGImageCancelButton.disabled = true
            cw.drawBGImageDeleteButton.style.visibility = "hidden"
            cw.drawBGImageEditSpan.innerText = "Background Template Image"
            cw.drawBGImageTopTable.style.backgroundColor = "ghostwhite"
            cw.containerDiv.style.backgroundColor = "ghostwhite"

            coverOff()
            //domWrapper.style.display = "none"

            cw.adjustedRotateBGImageValue.value = 0
            closeIframe("addElemBGImage")
    }
}

//---on add icon DrawX follows cursor
function trackDrawBGImage()
{

    if(ActiveElem==null&&EditBGImage==false && BGImageDeleted==false)
    {
        DrawX.style("display", "inline")
      DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")

    }
}

var EditBGImage = false
var DrawBGImage = false
var BGImageDeleted = false

var ActiveBGImage

function startBGImageDraw()
{
    RotateAngle = 0
   // elemSizeDiv.innerHTML = "w = <input id=drawBGImageWidthValue type='text' style='width:30px;border=0' /> h = <input id=drawBGImageHeightValue type='text' style='width:30px;border=0' />"

    var cw = addElemBGImageCw
    if(EditBGImage==false)
    {
        activeElem = null

        ActiveElem = null
        DrawBGImage = true
        mySVG.setAttribute('onclick', " placeDrawBGImage()") //---click to add more icons for this session---
        DrawX.style("display", "inline")
    }

    if(cw.adjustedRotateBGImageValue)
        cw.adjustedRotateBGImageValue.value = 0
      cw.bgImgFile.value=""
      cw.bgImageWidthValue.value=""
      cw.bgImageHeightValue.value=""

}

//--click on svg---


function finishDrawBGImage()
{

    if(EditBGImage==true)
        finishEditBGImage()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemBGImageCw
            activeElem.removeAttribute("class")

            var finishedElem = document.getElementById("activeBGImage").cloneNode(true)

            DrawBGImageEditId = "bgImage"+new Date().getTime()
            finishedElem.setAttribute("id", DrawBGImageEditId)

            if(activeElem.getAttribute("transform"))
            finishedElem.setAttribute("transform", activeElem.getAttribute("transform"))

            var ctm = finishedElem.getCTM()
            RAD2DEG = 180 / Math.PI;
            var rotateAngle = Math.atan2(ctm.b, ctm.a) * RAD2DEG;
            finishedElem.setAttribute("rotateAngle", rotateAngle)

            finishedElem.setAttribute("class", "addElem")

            finishedElem.style.cursor = "default"


            DrawX.style("display", "none")
            ImgDragArrow.style("visibility", "hidden")

            cw.drawBGImageFinishButton.disabled = true
            cw.drawBGImageCancelButton.disabled = true
            coverOff()

            mySVG.appendChild(imgDragArrow)
            domActiveElemG.removeChild(document.getElementById("activeElem"))
            ActiveElem = null
            activeElem = null
            bgImageG.appendChild(finishedElem)
            closeDrawBGImage()
        }

        addElemBGImageCw.editTemplateCheck.checked=false

}

function cancelDrawBGImage()
{
    if(EditBGImage==true)
        cancelEditBGImage()
        else if(document.getElementById("activeElem"))
        {
            mySVG.appendChild(imgDragArrow)
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "placeDrawBGImage()") //---click to add more icons for this session---
            ImgDragArrow.style("visibility", "hidden")
            ImgDragArrow.attr("transform", null)
            //DrawX.style("visibility","hidden")
            DrawX.attr("transform", null)
            var cw = addElemBGImageCw
            cw.drawBGImageFinishButton.disabled = true
            cw.drawBGImageCancelButton.disabled = true
            cw.adjustedRotateBGImageValue.value = 0
            coverOff()
            cw.bgImgFile.value=""
              cw.bgImageWidthValue.value=""
              cw.bgImageHeightValue.value=""

        }
    addElemBGImageCw.editTemplateCheck.checked=false
}

function rotateBGImageAdjust(factor)
{
    var cw = addElemBGImageCw
    var mult = parseFloat(cw.rotateDrawBGImageAdjustSelect.options[cw.rotateDrawBGImageAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotateBGImageValue.value = rotateAdd+parseFloat(cw.adjustedRotateBGImageValue.value)

    if(ActiveElem)
    {
        rote("activeElem", rotateAdd)
        rote("domDrawX", rotateAdd)
    }
}
//====================edit/update rect===============================

var EditBGImage = false
var DrawBGImageEditId
var EditThisBGImage

//---after iframe loaded see sendSize() at addElemBGImage.htm---
var EditBGImageObj
function setEditBGImage()
{
    coverOn()
    mySVG.removeAttribute('onclick')
    var cw = addElemBGImageCw
    var elemObjEdit = document.getElementById(DrawBGImageEditId)

    EditBGImage=true

    ActiveElem = ActiveElemG.append("g")
    .attr("id", "activeElem")
    .attr("transform", elemObjEdit.getAttribute("transform"))
    .attr("class", "dragTargetObj")
    activeElem = document.getElementById("activeElem")
    EditBGImageObj = elemObjEdit.cloneNode(true)
    activeElem.appendChild(EditBGImageObj).setAttribute("id", "activeBGImage")

    ActiveBGImage = d3.select("#activeBGImage")
    .attr("transform", null)
    .attr("class", null)
    .attr("onmouseover", null)
    .attr("onmouseout", null)
    .attr("onmousedown", null)
    .attr("onmouseup", null)
    domActiveElemG.appendChild(imgDragArrow)

    //---is this text rotated?---
    var ctm = elemObjEdit.getCTM()
    RAD2DEG = 180 / Math.PI;
    var rotatedDeg = Math.atan2(ctm.b, ctm.a) * RAD2DEG;

    if(!rotatedDeg) rotatedDeg = 0
        cw.adjustedRotateBGImageValue.value = rotatedDeg

        elemObjEdit.style.visibility = "hidden"



        //  domActiveElemG.appendChild(EditBGImageObj)
        ActiveElem = d3.select("#activeElem")
        activeElem = document.getElementById("activeElem")

        cw.drawBGImageCancelButton.disabled = false
        cw.drawBGImageFinishButton.disabled = false

           cw.drawBGImageDeleteButton.style.visibility="visible"


                var opacity = EditBGImageObj.getAttribute("opacity")




            cw.drawBGImageEditSpan.innerHTML = "Edit Background Template"
            cw.drawBGImageTopTable.style.backgroundColor = "orange"

            cw.containerDiv.style.backgroundColor = "orange"
            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", ActiveElem.attr("transform"))

            //--place ImgDragArrow----
            var width = parseFloat(ActiveBGImage.attr("width"))
            var height = parseFloat(ActiveBGImage.attr("height"))
             imgDragArrow.setAttribute("x",width-12.5)
        imgDragArrow.setAttribute("y",height-12.5)
         imgDragArrow.setAttribute("transform",activeElem.getAttribute("transform"))


            setBGImageEditDrag()

}

function setBGImageEditDrag()
{

    activeElem.removeAttribute("onmousedown")
    ImgDragArrow.style("visibility", "visible")

    //---timeout??---
    mySVG.setAttribute("onmousedown", "startDragBGImage(evt)")
    mySVG.setAttribute("onmousemove", "dragBGImage(evt)")
    mySVG.setAttribute("onmouseup", "endDragBGImage(evt)")
    ActiveBGImage.style("cursor", "move")

}
function finishEditBGImage()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemBGImageCw
        activeElem.removeAttribute("class")
        var finishedElem = document.getElementById(DrawBGImageEditId)//.cloneNode(true)
        finishedElem.setAttribute("transform", ActiveElem.attr("transform"))
        finishedElem.setAttribute("width", ActiveBGImage.attr("width"))
        finishedElem.setAttribute("height", ActiveBGImage.attr("height"))
        finishedElem.setAttribute("class", "addElem")

     finishedElem.setAttribute("opacity", ActiveBGImage.attr("opacity"))


            finishedElem.setAttribute("rotateAngle", RotateAngle)

            mySVG.appendChild(imgDragArrow)
            domActiveElemG.removeChild(document.getElementById("activeElem"))
            ActiveElem = null
            activeElem = null
            finishedElem.style.cursor = "default"
            finishedElem.style.visibility = ""
            //---is this a timelined elem---
           // finishedElem.setAttribute("onmousedown", "editBGImageDraw("+DrawBGImageEditId+",evt)")
            finishedElem.setAttribute("id", DrawBGImageEditId)
            UpdateThisBGImage = finishedElem
            //updateBGImage()
            //domAddElemG.insertBefore(finishedElem, EditThisBGImage)
            //domAddElemG.removeChild(EditThisBGImage)

            EditBGImage = false

    }
    closeDrawBGImage()
}

function resetEditBGImage()
{

    var cw = addElemBGImageCw
    EditBGImage = false
    cw.editBGImageSpan.innerText = "Draw BGImages"
    cw.drawBGImageTopTable.style.backgroundColor = "honeydew"
    ActiveElem = null
    activeElem = null
    DrawX.style("display", "none")
    DrawX.attr("stroke", "violet")
    ImgDragArrow.style("visibility", "hidden")

    cw.drawBGImageCopyButton.style.visibility = "hidden"
    cw.drawBGImageDeleteButton.style.visibility = "hidden"
    cw.drawBGImageCancelButton.disabled = false
    cw.drawBGImageFinishButton.disabled = false
    DrawBGImage = true


    //---click to add more circles for this session---

}

function cancelEditBGImage()
{

 closeDrawBGImage()

}


//=======================delete rect==================
var BGImageDeleted = false
//---button---
function removeCurrentDrawBGImage()
{

    var cw = addElemBGImageCw
    mySVG.appendChild(imgDragArrow)
    domActiveElemG.removeChild(activeElem)
    var elemObjEdit = document.getElementById(DrawBGImageEditId)
    bgImageG.removeChild(elemObjEdit)
    BGImageDeleted = true
       cw.editTemplateCheck.checked=false
            cw.editTemplateCheckDiv.style.visibility="hidden"
           EditBGImage = false
            DrawBGImage = false

            DrawBGImageEditId=null
    closeDrawBGImage()

}

