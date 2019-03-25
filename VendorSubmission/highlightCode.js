
function showSourceJS()
{
    var jsString=myScript.text

    jsString=jsString.replace(/\</g,"&lt;")
    jsString=jsString.replace(/\>/g,"&gt;")
    jsCodeDiv.innerHTML='<pre><code id="codeJS" class="javascript">'+jsString+'</code></pre>'

    var aCode = document.getElementById('codeJS');
    hljs.highlightBlock(aCode);

}
function showSourceSVG()
{
    var svgString=svgDiv.innerHTML
    svgString=svgString.replace(/\</g,"&lt;")
    svgString=svgString.replace(/\>/g,"&gt;\n")
    svgSourceDiv.innerHTML='<pre><code id="codeSVG" class="xml">'+svgString+'</code></pre>'

    var aCode = document.getElementById('codeSVG');


    hljs.highlightBlock(aCode);


      if(svgSourceDiv.scrollHeight<300)
   svgSourceDiv.style.height=+svgSourceDiv.scrollHeight+"px"
   else
   svgSourceDiv.style.height="300px"


}

//=================js file code======================================
function showJSfile(fileJs)
{
    var http  = new XMLHttpRequest();
        http .onload = callback;
        http .open("GET", fileJs, true);
        http .send()
        function callback()
        {

            var jsString=http.responseText
            jsString=jsString.replace(/\</g,"&lt;")
            jsString=jsString.replace(/\>/g,"&gt;")
            jsFileDiv.innerHTML='<pre><code id=codeFile class="javascript">'+jsString+'</code></pre>'

            jsFileDiv.style.width="800px"
            jsFileDiv.style.visibility="visible"
            var aCode = document.getElementById('codeFile');

            hljs.highlightBlock(aCode);




        }

}

function showJSfile2(fileJs)
{
    var http  = new XMLHttpRequest();
        http .onload = callback;
        http .open("GET", fileJs, true);
        http .send()
        function callback()
        {

            var jsString=http.responseText
            jsString=jsString.replace(/\</g,"&lt;")
            jsString=jsString.replace(/\>/g,"&gt;")
            jsFile2Div.innerHTML='<pre><code id=codeFile2 class="javascript">'+jsString+'</code></pre>'

            jsFile2Div.style.width="800px"
            jsFile2Div.style.visibility="visible"
            var aCode = document.getElementById('codeFile2');

            hljs.highlightBlock(aCode);
        }

}

//---double click---
function closeJsFileDiv()
{
       jsFileDiv.style.visibility = 'hidden';
}

//==================================show HTML================================
//---double click---
function closeHTMLDiv()
{


        showHTMLDiv.style.visibility = 'hidden';

}
function showHTML(fileURL)
{
    var http  = new XMLHttpRequest();
    http .onload = callback;
    http .open("GET", fileURL, true);
    http .send()
    function callback()
    {
        showFunctionStringDiv.innerHTML=""
        showFunctionStringDiv.style.visibility="hidden"
        jsFileDiv.innerHTML=""
        jsFileDiv.style.visibility="hidden"

        var htmlString=http.responseText
        htmlString=htmlString.replace(/\</g,"&lt;")
        htmlString=htmlString.replace(/\>/g,"&gt;")
        showHTMLDiv.innerHTML='<div style=font-size:120%;position:absolute;top:0px;left:0px;><pre><code class="html">'+htmlString+'</code></pre></div>'

        var aCode = document.getElementsByTagName('code')[0];
        hljs.highlightBlock(aCode);

        showHTMLDiv.style.visibility="visible"
        showHTMLDiv.scrollTop=0

    }

}
