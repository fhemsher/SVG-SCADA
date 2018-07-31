


var CurrentHMIElem
function showHMISource()
{
      hmiSourceContainer.style.display="block"
      CurrentHMIElem.removeAttribute("cursor")
      CurrentHMIElem.removeAttribute("pointer-events")
      CurrentHMIElem.removeAttribute("style")


    var svgString = new XMLSerializer().serializeToString(CurrentHMIElem)

   // svgString = svgString.replace(/\</g, "&lt;")
   svgString = svgString.replace(/\g>/g, "g>\n\n")
    hmiSourceValue.value = svgString

    //var aCode = document.getElementById('hmiSVG');

    //hljs.highlightBlock(aCode);
    //hmiSourceDiv.style.height=hmiSourceContainer.scrollHeight+"px"


}

function closeHMISource()
{

   hmiSourceContainer.style.display="none"

}