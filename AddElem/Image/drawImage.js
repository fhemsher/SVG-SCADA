function trackDrawImage()
{
    var cw = addElemImageCw

    if(ActiveElem==null&&ImageHREF&&EditImage==false && ImageDeleted==false)
    {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")

    }
}
var EditImage = false
var DrawImage = false
var ImageDeleted = false

function startImageDraw()
{
    var cw = addElemImageCw
    if(EditImage==false)
    {
        ActiveElem = null
        activeElem = null
        DrawImage = true
        DrawX.style("display", "inline")
        mySVG.setAttribute('onclick', "placeDrawImage()") //---click to add more icons for this session---
        cw.drawImageTopButton.style.visibility = "hidden"
    mySVG.setAttribute("cursor","default")

    }

}

function placeDrawImage()
{
    var cw = addElemImageCw
    if(cw.imgFile.value!="")
    {

        coverOn()

        var opacity = cw.drawImageOpacitySelect.options[cw.drawImageOpacitySelect.selectedIndex].text


        ActiveElem = ActiveElemG.append("image")
        .attr("id", "activeElem")
        .attr("fill-opacity", opacity)

        activeElem=document.getElementById("activeElem")
        activeElem.setAttribute("height", ImageHeight)
        activeElem.setAttribute("width", ImageWidth)
        activeElem.setAttribute("href", ImageHREF)

        activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")

        ActiveElem.style("cursor", "move")
        ActiveElem.attr("class", "dragTargetObj")
        ActiveElem.attr("pointer-events", null)

        domActiveElemG.appendChild(imgDragArrow)




         ImgDragArrow.attr("class", "dragTargetObj")
        ImgDragArrow.attr("transform", "translate("+(SVGx+ImageWidth)+" "+(SVGy+ImageHeight)+")")
        ImgDragArrow.style("visibility", "visible")


        //activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")


        cw.imageWidthValue.value = ImageWidth
        cw.imageHeightValue.value = ImageHeight
        ImageCorner =[SVGx, SVGy]

        mySVG.removeAttribute('onclick')

        mySVG.setAttribute("onmousedown", "startDragImage(evt)")
        mySVG.setAttribute("onmousemove", "dragImage(evt)")
        mySVG.setAttribute("onmouseup", "endDragImage(evt)")

        cw.drawImageCancelButton.disabled = false
        cw.drawImageFinishButton.disabled = false

    }
}

var ImageHREF
var ImageWidth
var ImageHeight

function loadImageFile()
{

    var cw = addElemImageCw

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
                if(initWidth>400||initHeight>400)
                {
                 if(initWidth>=initHeight)
                    var maxSize=initWidth
                    else
                    var maxSize=initHeight

                     var sizeRatio=400/maxSize
                    ImageWidth=initWidth*sizeRatio
                    ImageHeight=initHeight*sizeRatio

                }
                else
                {
                    ImageWidth=image.naturalWidth
                    ImageHeight=image.naturalHeight
                }


                cw.imageWidthValue.value = ImageWidth.toFixed(0)
                cw.imageHeightValue.value = ImageHeight.toFixed(0)
            }
        }
        , false);

    if (file)
    {
        reader.readAsDataURL(file);

    }
}


///---X button and iframe close all---
function closeDrawImage()
{
    if(addElemImageViz==true)
    {
        closeIframe("addElemImage");
        coverOff()

        RotateAngle = 0
        var cw = addElemImageCw
        cw.adjustedRotateImageValue.value = 0
        var elemTimelinded = false

        if(EditImage==true && ImageDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawImageEditId)
            elemObjEdit.style.display = "inline"
            elemObjEdit.setAttribute("onmousedown", "editImageDraw("+DrawImageEditId+",evt)")

        }
        DraggingObj = false
        DrawImage = false
        EditImage = false
        ImageDeleted = false

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")
        mySVG.removeAttribute('onclick')
        if(document.getElementById("activeElem"))
        {

            document.getElementById("activeElem").removeAttribute("class")
            domActiveElemG.removeChild(document.getElementById("activeElem"))
            mySVG.appendChild(imgDragArrow) //--place drag dot on top---


        }
        activeElem = null
        ActiveElem = null
        ImageHREF = null
        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)

        ImgDragArrow.attr("transform", null)
        ImgDragArrow.style("visibility", "hidden")
        imgDragArrow.setAttribute("x",-12.5)
        imgDragArrow.setAttribute("y",-12.5)
        cw.drawImageTopButton.style.visibility = "hidden"
        // cw.drawImageBotButton.style.visibility = "hidden"
        cw.drawImageBotButton.disabled = true
        cw.drawImageFinishButton.disabled = true
        cw.drawImageCancelButton.disabled = true
        cw.drawImageCancelButton.style.borderColor = ""
        cw.drawImageDeleteButton.style.visibility = "hidden"
        cw.drawImageEditSpan.innerText = "Draw Images"
        cw.drawImageTopTable.style.backgroundColor = "linen"
        cw.containerDiv.style.backgroundColor = "linen"



    }
}

var EditImage = false
var DrawImage = false
var ImageDeleted = false

function startImageDraw()
{
    RotateAngle = 0
    // elemSizeDiv.innerHTML = "w = <input id=drawImageWidthValue type='text' style='width:30px;border=0' /> h = <input id=drawImageHeightValue type='text' style='width:30px;border=0' />"

    var cw = addElemImageCw
    if(EditImage==false)
    {
        activeElem = null

        ActiveElem = null
        DrawImage = true
        mySVG.setAttribute('onclick', " placeDrawImage()") //---click to add more icons for this session---
        DrawX.style("display", "inline")
    mySVG.setAttribute("cursor","default")
  }


        cw.adjustedRotateImageValue.value = 0
        cw.imgFile.value = ""
        cw.imageWidthValue.value = ""
        cw.imageHeightValue.value = ""
        ImageHREf = null

}

//--click on svg---

function finishDrawImage()
{

    if(EditImage==true)
        finishEditImage()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemImageCw
            activeElem.removeAttribute("class")
            activeElem.removeAttribute("onmouseup")
            coverOff()

            var finishedElem = document.getElementById("activeElem").cloneNode(true)

            finishedElem.style.cursor = "default"
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            var id = "image"+new Date().getTime()
            domElemG.appendChild(finishedElem)
            finishedElem.setAttribute("id", id)

            finishedElem.setAttribute("onmousedown", "editImageDraw("+id+",evt)")

            var ctm = finishedElem.getCTM()
            RAD2DEG = 180 / Math.PI;
            var rotateAngle = Math.atan2(ctm.b, ctm.a) * RAD2DEG;
            finishedElem.setAttribute("rotateAngle", rotateAngle)

            finishedElem.setAttribute("class", "imageElem")

            ActiveElem = null
            activeElem = null
             ImageHREF = null
            // d3SVG.style("cursor", "default")
            mySVG.setAttribute('onclick', "placeDrawImage()") //---click to add more icons for this session---


            DrawX.style("display", "none")
            ImgDragArrow.style("visibility", "hidden")
            //topG.appendChild(imgDragArrow)
            cw.drawImageFinishButton.disabled = true
            cw.drawImageCancelButton.disabled = true
            cw.drawImageBotButton.disabled = true
        }

}

function cancelDrawImage()
{
    var cw = addElemImageCw
    if(EditImage==true)
        cancelEditImage()
        else if(document.getElementById("activeElem"))
        {
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null
            // d3SVG.style("cursor", "default")
            ActiveElem = null
            ImageHREF = null
            mySVG.setAttribute('onclick', "placeDrawImage()") //---click to add more icons for this session---
            ImgDragArrow.style("visibility", "hidden")
            ImgDragArrow.attr("transform", null)
            cw.drawImageFinishButton.disabled = true
            cw.drawImageBotButton.disabled = true
            cw.drawImageCancelButton.disabled = true
            cw.adjustedRotateImageValue.value = 0
            cw.imgFile.value=""
            cw.imageWidthValue.value=""
            cw.imageHeightValue.value=""

            coverOff()


        }

}

//====================edit/update rect===============================
//====================edit/update circle===============================

var EditImage = false
var DrawImageEditId
var EditThisImage
//--mousedown/right button on circle---
function editImageDraw(elemObjEdit, evt)
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

    var myZoomLevel=+elemObjEdit.getAttribute("InitZoom")
    if(isRightMB&&DrawImage==false)
    {
        //  elemSizeDiv.innerHTML = "r = <input id=drawImageRadiusValue type='text' style='width:30px;border=0' /> "

        EditThisImage = elemObjEdit

        DrawImageEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        activeElem = null
         ImageHREF = null
        EditImage = true
        if(addElemImageLoad==false)
        {
            openIframe("AddElem", "addElemImage", 10)

        }
        else if(addElemImageViz==false)
        {
            openIframe("AddElem", "addElemImage", 10)
            setEditImage()
        }
        else
            setEditImage()

    }
}

var EditImage = false
var DrawImageEditId
var EditThisImage

//---after iframe loaded see sendSize() at addElemImage.htm---
var EditImageObj
function setEditImage()
{
    coverOn()


    mySVG.removeAttribute('onclick')
    var cw = addElemImageCw
    var elemObjEdit = document.getElementById(DrawImageEditId)
 EditImageObj = elemObjEdit.cloneNode(true)
    elemObjEdit.style.display = "none"
    EditImageObj.setAttribute("id", "activeElem")
    EditImageObj.setAttribute("class", "dragTargetObj")

    EditImageObj.removeAttribute("onmousedown")

        domActiveElemG.insertBefore(EditImageObj, domActiveElemG.firstChild)

        ActiveElem = d3.select("#activeElem")
        activeElem = document.getElementById("activeElem")
        domActiveElemG.appendChild(imgDragArrow) //--place drag dot on top---
        cw.drawImageDeleteButton.style.visibility = "visible"
        cw.drawImageEditSpan.innerHTML = "Edit Image"

        cw.drawImageTopButton.style.visibility = "visible"
        cw.drawImageBotButton.style.visibility = "visible"
        cw.drawImageTopTable.style.backgroundColor = "orange"
        cw.containerDiv.style.backgroundColor = "orange"
        cw.drawImageCancelButton.disabled = false
        cw.drawImageFinishButton.disabled = false
        cw.drawImageBotButton.disabled = false

        //...slocate dargdot---
        var bb=domActiveElemG.firstChild.getBBox()
        imgDragArrow.setAttribute("x",bb.width-12.5)
        imgDragArrow.setAttribute("y",bb.height-12.5)
                imgDragArrow.setAttribute("transform",activeElem.getAttribute("transform"))

        setImageEditDrag()

}

function setImageEditDrag()
{

    activeElem.removeAttribute("onmousedown")
    ImgDragArrow.style("visibility", "visible")

    //---timeout??---
    mySVG.setAttribute("onmousedown", "startDragImage(evt)")
    mySVG.setAttribute("onmousemove", "dragImage(evt)")
    mySVG.setAttribute("onmouseup", "endDragImage(evt)")
    ActiveElem.style("cursor", "move")

}
function finishEditImage()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemImageCw
        activeElem.removeAttribute("class")
        var finishedElem = activeElem.cloneNode(true)
        finishedElem.setAttribute("transform", ActiveElem.attr("transform"))

        finishedElem.setAttribute("class", "addElem")

        finishedElem.setAttribute("opacity", ActiveElem.attr("opacity"))

        finishedElem.setAttribute("rotateAngle", RotateAngle)

         mySVG.appendChild(imgDragArrow)
        imgDragArrow.removeAttribute("transform")

        ActiveElem = null
        activeElem = null
        finishedElem.style.cursor = "default"
        finishedElem.style.visibility = ""
        //---is this a timelined elem---

        finishedElem.setAttribute("onmousedown", "editImageDraw("+DrawImageEditId+",evt)")
        finishedElem.setAttribute("id", DrawImageEditId)
        UpdateThisImage = finishedElem
        //updateImage()
        domElemG.insertBefore(finishedElem, EditThisImage)
        domElemG.removeChild(EditThisImage)


        EditImage = false

    }
    closeDrawImage()
}

function resetEditImage()
{

    var cw = addElemImageCw
    EditImage = false
    cw.editImageSpan.innerText = "Draw Images"
    cw.drawImageTopTable.style.backgroundColor = "honeydew"
    ActiveElem = null
    activeElem = null
    DrawX.style("display", "none")
    DrawX.attr("stroke", "violet")
    ImgDragArrow.style("visibility", "hidden")

    cw.drawImageCopyButton.style.visibility = "hidden"
    cw.drawImageDeleteButton.style.visibility = "hidden"
    cw.drawImageCancelButton.disabled = false
    cw.drawImageFinishButton.disabled = false
    DrawImage = true

    //---click to add more circles for this session---

}

function cancelEditImage()
{

    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawImageEditId)

    elemObjEdit.style.display = "inline"
    domActiveElemG.removeChild(document.getElementById("activeElem"))
    activeElem = null

    ActiveElem = null
    //topG.appendChild(imgDragArrow) //--place drag dot on top---
    closeDrawImage()
    //setEditEllipse()

}

//=======================delete image==================
var ImageDeleted = false
//---button---
function removeCurrentDrawImage()
{

    var cw = addElemImageCw
    var elemObjEdit = document.getElementById(DrawImageEditId)
    domElemG.removeChild(elemObjEdit)
    ImageDeleted = true

    EditImage = false
    DrawImage = false

    DrawImageEditId = null
    closeDrawImage()

}


function rotateImageAdjust(factor)
{
    var cw = addElemImageCw
    var mult = parseFloat(cw.rotateDrawImageAdjustSelect.options[cw.rotateDrawImageAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotateImageValue.value = rotateAdd+parseFloat(cw.adjustedRotateImageValue.value)

    if(ActiveElem)
    {
        rote("activeElem", rotateAdd)
        rote("domDrawX", rotateAdd)
    }
}

//====================Top/Bot===================
function topDrawImage()
{

    var elemObjEdit = document.getElementById(DrawImageEditId)
    var finishedElem = document.getElementById("activeElem").firstChild.cloneNode(true)

    finishedElem.setAttribute("transform", document.getElementById("activeElem").getAttribute("transform"))
    finishedElem.setAttribute("class", "imageElem")
    finishedElem.removeAttribute("style")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawImageEditId)

    activeElem.id = "domActiveElemG"
    activeElem.removeAttribute("transform")
    imgDragArrow.removeAttribute("transform")

    activeElem.removeChild(activeElem.firstChild)

    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)
    activeElem = null
    closeDrawImage()
}
function botDrawImage()
{
    if(EditImage)
    {
        var elemObjEdit = document.getElementById(DrawImageEditId)
        var finishedElem = document.getElementById("activeElem").firstChild.cloneNode(true)

        finishedElem.setAttribute("transform", document.getElementById("activeElem").getAttribute("transform"))
        finishedElem.setAttribute("class", "imageElem")
        finishedElem.removeAttribute("style")
        finishedElem.style.cursor = "default"
        finishedElem.setAttribute("id", DrawImageEditId)

        activeElem.id = "domActiveElemG"
        activeElem.removeAttribute("transform")
        imgDragArrow.removeAttribute("transform")
        domElemG.removeChild(elemObjEdit)
        activeElem.removeChild(activeElem.firstChild)
        domElemG.insertBefore(finishedElem, domElemG.firstChild)
        activeElem = null
        closeDrawImage()
    }
    else
    {
        finishDrawImage()
        domElemG.insertBefore(domElemG.lastChild, domElemG.firstChild)
    }

}