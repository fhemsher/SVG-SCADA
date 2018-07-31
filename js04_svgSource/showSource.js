function showSourceJS()
{
    var jsString = myScript.text

    jsString = jsString.replace(/\</g, "&lt;")
    jsString = jsString.replace(/\>/g, "&gt;")
    jsCodeDiv.innerHTML = '<pre><code id="codeJS" class="javascript">'+jsString+'</code></pre>'

    var aCode = document.getElementById('codeJS');
    hljs.highlightBlock(aCode);

}
function showSourceSVG()
{
    var svgString = svgDiv.innerHTML

    svgString = svgString.replace(/\</g, "&lt;")
    svgString = svgString.replace(/\>/g, "&gt;\n")
    svgSourceDiv.innerHTML = '<pre><code id="codeSVG" class="xml">'+svgString+'</code></pre>'

    var aCode = document.getElementById('codeSVG');

    hljs.highlightBlock(aCode);

    svgSourceDiv.style.height = +svgSourceDiv.scrollHeight+"px"

}
function showSaveSVG()
{
    svgSaveDiv.style.height="1px"
    var saveSVG = mySVG.cloneNode(true)
    saveSVG.setAttribute("id", "schematicSVG")
    saveSVG.removeAttribute("onmousedown")
    saveSVG.removeAttribute("onmouseup")
    saveSVG.removeAttribute("onmousemove")
    saveSVG.removeAttribute("onclick")

    for(var k = saveSVG.childNodes.length-1; k>=0; k--)
    {
        var elem = saveSVG.childNodes.item(k)
        if(elem.nodeName!="#text")
        {
            var id = elem.getAttribute("id")
            elem.removeAttribute("pointer-events")
            //if(elem.nodeName=="style")saveSVG.removeChild(elem)
            //if(elem.nodeName=="defs")saveSVG.removeChild(elem)
            if(id=="domDrawX")saveSVG.removeChild(elem)
            if(id=="openerScadaG")saveSVG.removeChild(elem)
            if(id=="domWrapper")saveSVG.removeChild(elem)
            if(id=="coverRect")saveSVG.removeChild(elem)
            if(id=="domActiveElemG")saveSVG.removeChild(elem)
            if(id=="processRect")saveSVG.removeChild(elem)
            if(id=="componentRect")saveSVG.removeChild(elem)
            //if(elem.nodeName=="defs")saveSVG.removeChild(elem)


            if(id=="zoomG")
            {
                var zooomG=saveSVG.getElementsByTagName("g")[0]



                zooomG.removeChild(zooomG.firstChild) //---bgImage--
                zooomG.removeChild(zooomG.firstChild) //--grid---
                var elemG=zooomG.firstChild
                elemG.removeAttribute("class")

               // elemG.setAttribute("id","publishElemG")
                for(var e=0;e<elemG.childNodes.length;e++)
                {
                    var el=elemG.childNodes[e]
                    el.removeAttribute("onmousedown");
                    el.removeAttribute("style");
                   // el.removeAttribute("id")
                    el.removeAttribute("vector-effect")
                    el.removeAttribute("pointer-events")
                    //el.removeAttribute("type")
                    el.removeAttribute("cursor")
                    el.removeAttribute("onclick")
                    if(el.nodeName=="text" &&el.id.indexOf("icon")!=-1)
                        el.setAttribute("class","iconElem")

                }
            }
        }
    }

    var svgString = new XMLSerializer().serializeToString(saveSVG)


  svgString = svgString.replace(/\</g, "&lt;")
  svgString = svgString.replace(/\>/g, "&gt;\n")



    svgSaveDiv.innerHTML = '<pre><code id="saveSVG" class="xml">'+svgString+'</code></pre>'

    var sCode = document.getElementById('saveSVG');

    hljs.highlightBlock(sCode);

    svgSaveDiv.style.height = +svgSaveDiv.scrollHeight+"px"


}

function svgCopy()
{
	svgSaveDiv.style.display="block"
	showSaveSVG()
	scrollSVG()
}
function scrollSVG()
{

       var goTo="#svgSaveDiv"
         $('html, body').animate({
                scrollTop: $(goTo).offset().top
            }, 600);

}
