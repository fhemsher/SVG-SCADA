
var ActiveBGimage
function placeDrawBGimage()
{

    if(bgImageG.childNodes.length>0)
         bgImageG.removeChild(bgImageG.childNodes[0])


    var cw = addElemBGimageCw
    coverOn()

    var opacity = cw.drawBGimageOpacitySelect.options[cw.drawBGimageOpacitySelect.selectedIndex].text


    ActiveElem = ActiveElemG.append("g")
    .attr("id", "activeElem")
    .attr("class", "dragTargetObj")
   .attr("pointer-events", null)

    ActiveBGimage = ActiveElem.append("image")
    .attr("id", "activeBGimage")
    .style("cursor", "move")

    .attr("opacity", opacity)
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", 200)

    //---place dragDot in g---
    activeElem = document.getElementById("activeElem")
    activeElem.appendChild(dragDot)
      DragDot.style("visibility", "visible")

        BGimageCorner =[0, 0]


        mySVG.removeAttribute('onclick')

        mySVG.setAttribute("onmousedown", "startDragBGimage(evt)")
        mySVG.setAttribute("onmousemove", "dragBGimage(evt)")
        mySVG.setAttribute("onmouseup", "endDragBGimage(evt)")

        cw.drawBGimageCancelButton.disabled = false
        cw.drawBGimageFinishButton.disabled = false

}



 function loadBGImageFile() {

    var cw=addElemBGimageCw

    var file    = cw.document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
    reader.addEventListener("load", function ()
    {

        placeDrawBGimage()

        activeBGimage.setAttribute("href",reader.result)
        activeBGimage.onload = function()
        {
            var bb=activeBGimage.getBBox()
            cw.bgImageWidthValue.value =bb.width.toFixed(0)
            cw.bgImageHeightValue.value =bb.height.toFixed(0)
            activeBGimage.setAttribute("width",bb.width)
            activeBGimage.setAttribute("height",bb.height)
            DragDot.attr("transform", "translate("+(bb.width)+" "+(bb.height)+")")
            DragDot.attr("cx", null)
             cw.editTemplateCheck.checked=false
            cw.editTemplateCheckDiv.style.visibility="hidden"
           EditBGimage = false
            DrawBGimage = false
            BGimageDeleted = false
            DrawBGimageEditId=null

        };


  }, false);

  if (file) {
    reader.readAsDataURL(file);

  }
}




///---X button and iframe close all---
function closeDrawBGimage()
{
    if(addElemBGimageViz==true)
    {
        RotateAngle = 0
        closeIframe("addElemBGimage");
        var cw = addElemBGimageCw

        if(EditBGimage==true && BGimageDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawBGimageEditId)
            elemObjEdit.style.visibility = ""

            elemObjEdit.setAttribute("onmousedown", "editBGimageDraw("+DrawBGimageEditId+",evt)")
        }
        DraggingObj = false
        DrawBGimage = false
        EditBGimage = false
        BGimageDeleted = false

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")
        mySVG.removeAttribute('onclick')
        if(document.getElementById("activeElem"))
        {
            mySVG.appendChild(dragDot)
            document.getElementById("activeElem").removeAttribute("class")
            domActiveElemG.removeChild(document.getElementById("activeElem"))
        }

        if(ActiveElem)
            ActiveElem.style("cursor", null)

            ActiveElem = null
            DrawX.style("display", "none")
            DrawX.attr("stroke", "violet")
            DrawX.attr("transform", null)
            DragDot.style("visibility", "hidden")
            DragDot.attr("transform", null)

            var cw = addElemBGimageCw


            cw.drawBGimageFinishButton.disabled = true
            cw.drawBGimageCancelButton.disabled = true
            cw.drawBGimageDeleteButton.style.visibility = "hidden"
            cw.drawBGimageEditSpan.innerText = "Background Template Image"
            cw.drawBGimageTopTable.style.backgroundColor = "ghostwhite"
            cw.containerDiv.style.backgroundColor = "ghostwhite"

            coverOff()
            //domWrapper.style.display = "none"

            cw.adjustedRotateBGimageValue.value = 0


    }
}

//---on add icon DrawX follows cursor
function trackDrawBGimage()
{

    if(ActiveElem==null&&EditBGimage==false && BGimageDeleted==false)
    {
        //DrawX.style("display", "inline")
       // DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")

    }
}

var EditBGimage = false
var DrawBGimage = false
var BGimageDeleted = false

var ActiveBGimage

function startBGimageDraw()
{
    RotateAngle = 0
   // elemSizeDiv.innerHTML = "w = <input id=drawBGimageWidthValue type='text' style='width:30px;border=0' /> h = <input id=drawBGimageHeightValue type='text' style='width:30px;border=0' />"

    var cw = addElemBGimageCw
    if(EditBGimage==false)
    {
        activeElem = null

        ActiveElem = null
        DrawBGimage = true
        mySVG.setAttribute('onclick', " placeDrawBGimage()") //---click to add more icons for this session---
        DrawX.style("display", "inline")
    }

    if(cw.adjustedRotateBGimageValue)
        cw.adjustedRotateBGimageValue.value = 0
      cw.bgImgFile.value=""
      cw.bgImageWidthValue.value=""
      cw.bgImageHeightValue.value=""


}

//--click on svg---


function finishDrawBGimage()
{

    if(EditBGimage==true)
        finishEditBGimage()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemBGimageCw
            activeElem.removeAttribute("class")

            var finishedElem = document.getElementById("activeBGimage").cloneNode(true)

            DrawBGimageEditId = "bgImage"+new Date().getTime()
            finishedElem.setAttribute("id", DrawBGimageEditId)

            if(activeElem.getAttribute("transform"))
            finishedElem.setAttribute("transform", activeElem.getAttribute("transform"))

            var ctm = finishedElem.getCTM()
            RAD2DEG = 180 / Math.PI;
            var rotateAngle = Math.atan2(ctm.b, ctm.a) * RAD2DEG;
            finishedElem.setAttribute("rotateAngle", rotateAngle)

            finishedElem.setAttribute("class", "addElem")
            finishedElem.style.cursor = "default"

         //   finishedElem.setAttribute("onmousedown", "editBGimageDraw("+BGImageID+",evt)")

            DrawX.style("display", "none")
            DragDot.style("visibility", "hidden")

            cw.drawBGimageFinishButton.disabled = true
            cw.drawBGimageCancelButton.disabled = true
            coverOff()

            mySVG.appendChild(dragDot)
            domActiveElemG.removeChild(document.getElementById("activeElem"))
            ActiveElem = null
            activeElem = null

            bgImageG.appendChild(finishedElem)
            closeDrawBGimage()
        }

        addElemBGimageCw.editTemplateCheck.checked=false
}

function cancelDrawBGimage()
{
    if(EditBGimage==true)
        cancelEditBGimage()
        else if(document.getElementById("activeElem"))
        {
            mySVG.appendChild(dragDot)
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "placeDrawBGimage()") //---click to add more icons for this session---
            DragDot.style("visibility", "hidden")
            DragDot.attr("transform", null)
            //DrawX.style("visibility","hidden")
            DrawX.attr("transform", null)
            var cw = addElemBGimageCw
            cw.drawBGimageFinishButton.disabled = true
            cw.drawBGimageCancelButton.disabled = true
            cw.adjustedRotateBGimageValue.value = 0
            coverOff()
            cw.bgImgFile.value=""
              cw.bgImageWidthValue.value=""
              cw.bgImageHeightValue.value=""

        }
    addElemBGimageCw.editTemplateCheck.checked=false
}

//====================edit/update rect===============================

var EditBGimage = false
var DrawBGimageEditId
var EditThisBGimage

//---after iframe loaded see sendSize() at addElemBGimage.htm---
var EditBGimageObj
function setEditBGimage()
{
    coverOn()
    mySVG.removeAttribute('onclick')
    var cw = addElemBGimageCw
    var elemObjEdit = document.getElementById(DrawBGimageEditId)

    EditBGimage=true

    ActiveElem = ActiveElemG.append("g")
    .attr("id", "activeElem")
    .attr("transform", elemObjEdit.getAttribute("transform"))
    .attr("class", "dragTargetObj")
    activeElem = document.getElementById("activeElem")
    EditBGimageObj = elemObjEdit.cloneNode(true)
    activeElem.appendChild(EditBGimageObj).setAttribute("id", "activeBGimage")

    ActiveBGimage = d3.select("#activeBGimage")
    .attr("transform", null)
    .attr("class", null)
    .attr("onmouseover", null)
    .attr("onmouseout", null)
    .attr("onmousedown", null)
    .attr("onmouseup", null)
    activeElem.appendChild(dragDot)

    //---is this text rotated?---
    var ctm = elemObjEdit.getCTM()
    RAD2DEG = 180 / Math.PI;
    var rotatedDeg = Math.atan2(ctm.b, ctm.a) * RAD2DEG;

    if(!rotatedDeg) rotatedDeg = 0
        cw.adjustedRotateBGimageValue.value = rotatedDeg

        elemObjEdit.style.visibility = "hidden"



        //  domActiveElemG.appendChild(EditBGimageObj)
        ActiveElem = d3.select("#activeElem")
        activeElem = document.getElementById("activeElem")

        cw.drawBGimageCancelButton.disabled = false
        cw.drawBGimageFinishButton.disabled = false

           cw.drawBGimageDeleteButton.style.visibility="visible"


                var opacity = EditBGimageObj.getAttribute("opacity")




            cw.drawBGimageEditSpan.innerHTML = "Edit Background Template"
            cw.drawBGimageTopTable.style.backgroundColor = "orange"

            cw.containerDiv.style.backgroundColor = "orange"
            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", ActiveElem.attr("transform"))

            //--place dragDot----
            var width = parseFloat(ActiveBGimage.attr("width"))
            var height = parseFloat(ActiveBGimage.attr("height"))

            DragDot.attr("transform", "translate("+(width)+" "+(height)+")")

            setBGimageEditDrag()

}

function setBGimageEditDrag()
{

    activeElem.removeAttribute("onmousedown")
    DragDot.style("visibility", "visible")

    //---timeout??---
    mySVG.setAttribute("onmousedown", "startDragBGimage(evt)")
    mySVG.setAttribute("onmousemove", "dragBGimage(evt)")
    mySVG.setAttribute("onmouseup", "endDragBGimage(evt)")
    ActiveBGimage.style("cursor", "move")

}
function finishEditBGimage()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemBGimageCw
        activeElem.removeAttribute("class")
        var finishedElem = document.getElementById(DrawBGimageEditId)//.cloneNode(true)
        finishedElem.setAttribute("transform", ActiveElem.attr("transform"))
        finishedElem.setAttribute("width", ActiveBGimage.attr("width"))
        finishedElem.setAttribute("height", ActiveBGimage.attr("height"))
        finishedElem.setAttribute("class", "addElem")

     finishedElem.setAttribute("opacity", ActiveBGimage.attr("opacity"))


            finishedElem.setAttribute("rotateAngle", RotateAngle)

            domActiveElemG.appendChild(dragDot)
            domActiveElemG.removeChild(document.getElementById("activeElem"))
            ActiveElem = null
            activeElem = null
            finishedElem.style.cursor = "default"
            finishedElem.style.visibility = ""
            //---is this a timelined elem---

           // finishedElem.setAttribute("onmousedown", "editBGimageDraw("+DrawBGimageEditId+",evt)")
            finishedElem.setAttribute("id", DrawBGimageEditId)
            UpdateThisBGimage = finishedElem
            //updateBGimage()
            //domAddElemG.insertBefore(finishedElem, EditThisBGimage)
            //domAddElemG.removeChild(EditThisBGimage)

            EditBGimage = false

    }
    closeDrawBGimage()
}

function resetEditBGimage()
{

    var cw = addElemBGimageCw
    EditBGimage = false
    cw.editBGimageSpan.innerText = "Draw BGimages"
    cw.drawBGimageTopTable.style.backgroundColor = "honeydew"
    ActiveElem = null
    activeElem = null
    DrawX.style("display", "none")
    DrawX.attr("stroke", "violet")
    DragDot.style("visibility", "hidden")

    cw.drawBGimageCopyButton.style.visibility = "hidden"
    cw.drawBGimageDeleteButton.style.visibility = "hidden"
    cw.drawBGimageCancelButton.disabled = false
    cw.drawBGimageFinishButton.disabled = false
    DrawBGimage = true


    //---click to add more circles for this session---

}

function cancelEditBGimage()
{

 closeDrawBGimage()
 /*
       var cw = addElemBGimageCw
    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawBGimageEditId)
    elemObjEdit.style.visibility = ""
  mySVG.appendChild(dragDot)
  domActiveElemG.removeChild(document.getElementById("activeElem"))
    //--place dragDot----
            var width = parseFloat(elemObjEdit.getAttribute("width"))
            var height = parseFloat(elemObjEdit.getAttribute("height"))
              cw.bgImageWidthValue.value = width.toFixed(0)
                cw.bgImageHeightValue.value = width.toFixed(0)
            dragDot.setAttribute("transform", "translate("+(width)+" "+(height)+")")
   // ActiveElem = null
    //setEditBGimage()
    */
}


//=======================delete rect==================
var BGimageDeleted = false
//---button---
function removeCurrentDrawBGimage()
{

    var cw = addElemBGimageCw
    mySVG.appendChild(dragDot)
    domActiveElemG.removeChild(activeElem)
    var elemObjEdit = document.getElementById(DrawBGimageEditId)
    bgImageG.removeChild(elemObjEdit)
    BGimageDeleted = true
       cw.editTemplateCheck.checked=false
            cw.editTemplateCheckDiv.style.visibility="hidden"
           EditBGimage = false
            DrawBGimage = false

            DrawBGimageEditId=null
    closeDrawBGimage()

}

function showDrawBGimageStrokeBg()
{
    var cw = addElemBGimageCw
    var stroke = cw.drawBGimageStrokeSelect.options[cw.drawBGimageStrokeSelect.selectedIndex].value
    if(stroke!="none")
        cw.drawBGimageStrokeBg.style.backgroundColor = stroke
        else
            cw.drawBGimageStrokeBg.style.backgroundColor = ""
            if(ActiveElem)
            ActiveBGimage.attr("stroke", stroke)

}

function drawBGimageStrokeSelected()
{
    var cw = addElemBGimageCw
    var stroke = cw.drawBGimageStrokeSelect.options[cw.drawBGimageStrokeSelect.selectedIndex].value

    if(ActiveElem)
        ActiveBGimage.attr("stroke", stroke)

}

function showDrawBGimageFillBg()
{
    var cw = addElemBGimageCw
    var fill = cw.drawBGimageFillSelect.options[cw.drawBGimageFillSelect.selectedIndex].value
    if(fill!="none")
        cw.drawBGimageFillBg.style.backgroundColor = fill
        else
            cw.drawBGimageFillBg.style.backgroundColor = ""
            if(cw.drawBGimageFillSelect.selectedIndex==0)
        {
            ActiveBGimage.attr("fill", "white")
            ActiveBGimage.attr("fill-opacity", 0)

        }
        else if(ActiveElem)
        {
            ActiveBGimage.attr("fill", fill)
            var opacity = cw.drawBGimageOpacitySelect.options[cw.drawBGimageOpacitySelect.selectedIndex].text

            ActiveBGimage.attr("fill-opacity", opacity)

        }

}

function drawBGimageFillSelected()
{
    var cw = addElemBGimageCw
    var fill = cw.drawBGimageFillSelect.options[cw.drawBGimageFillSelect.selectedIndex].value
    if(cw.drawBGimageFillSelect.selectedIndex==0)
    {
        ActiveBGimage.attr("fill", "white")
        ActiveBGimage.attr("fill-opacity", 0)

    }
    else if(ActiveElem)
    {
        ActiveBGimage.attr("fill", fill)
        var opacity = cw.drawBGimageOpacitySelect.options[cw.drawBGimageOpacitySelect.selectedIndex].text

        ActiveBGimage.attr("fill-opacity", opacity)

    }

}

function drawBGimageOpacitySelected()
{
    var cw = addElemBGimageCw
    var opacity = cw.drawBGimageOpacitySelect.options[cw.drawBGimageOpacitySelect.selectedIndex].text
    if(ActiveElem)
        ActiveBGimage.attr("opacity", opacity)

}

function drawBGimageStrokeWidthSelected()
{
    var cw = addElemBGimageCw
    var strokeWidth = cw.drawBGimageStrokeWidthSelect.options[cw.drawBGimageStrokeWidthSelect.selectedIndex].text
    if(ActiveElem)
    {
        ActiveBGimage.attr("stroke-width", strokeWidth)
        if(cw.drawBGimageStrokeDashCheck.checked==true)
        {
            da1 = 8
            da2 = 3

            ActiveBGimage.attr("stroke-dasharray", da1+" "+da2)

        }
        if(cw.drawBGimageStrokeRoundCheck.checked==true)
        {
            rxy = 5*strokeWidth

            ActiveBGimage.attr("rx", rxy)
            ActiveBGimage.attr("ry", rxy)

        }

    }

}

function drawBGimageStrokeRoundChecked()
{
    var cw = addElemBGimageCw
    var strokeWidth = parseFloat(cw.drawBGimageStrokeWidthSelect.options[cw.drawBGimageStrokeWidthSelect.selectedIndex].text)
    if(ActiveElem)
    {
        if(cw.drawBGimageStrokeRoundCheck.checked==true)
        {

            ActiveBGimage.attr("rx", 5*strokeWidth)
            ActiveBGimage.attr("ry", 5*strokeWidth)

        }
        else
        {
            ActiveBGimage.attr("rx", null)
            ActiveBGimage.attr("ry", null)

        }

    }
}

function drawBGimageStrokeDashChecked()
{
    var cw = addElemBGimageCw
    if(cw.drawBGimageStrokeDashCheck.checked==true)
    {
        if(ActiveElem)
        {
            var strokeWidth = parseFloat(cw.drawBGimageStrokeWidthSelect.options[cw.drawBGimageStrokeWidthSelect.selectedIndex].text)
            da1 = 8
            da2 = 3

            ActiveBGimage.attr("stroke-dasharray", da1+" "+da2)

        }

    }
    else
    {
        if(ActiveElem)
            ActiveBGimage.attr("stroke-dasharray", null)
    }

}

function rotateBGimageAdjust(factor)
{
    var cw = addElemBGimageCw
    var mult = parseFloat(cw.rotateDrawBGimageAdjustSelect.options[cw.rotateDrawBGimageAdjustSelect.selectedIndex].text)
    var rotateAdd = parseFloat(factor)*mult

    cw.adjustedRotateBGimageValue.value = rotateAdd+parseFloat(cw.adjustedRotateBGimageValue.value)

    if(ActiveElem)
    {
        rote("activeElem", rotateAdd)
        rote("domDrawX", rotateAdd)
    }
}

function drawBGimageShadowChecked()
{

    var cw = addElemBGimageCw
    if(cw.drawBGimageShadowCheck.checked==true)
    {
        if(ActiveBGimage)
            ActiveBGimage.attr("filter", "url(#drop-shadow)")

    }
    else
    {
        if(ActiveBGimage)
            ActiveBGimage.attr("filter", null)

    }

}