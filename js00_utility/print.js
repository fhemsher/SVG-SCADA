function beforePrint()
{


  document.body.style.visibility="hidden"
    document.body.style.background="white"

   svgDiv.style.visibility='visible'
    svgDiv.style.position="fixed"
    svgDiv.style.margin="0px"
    svgDiv.style.top="0px"
    svgDiv.style.left="0px"

    svgDiv.style.border="0px"

   gridLayer.style.visibility="hidden"
}

function afterPrint()
{
    document.body.style.visibility=""
    document.body.style.background="#f0f8ff"
    svgDiv.style.visibility=''
    svgDiv.style.position=""

    svgDiv.style.top=""
    svgDiv.style.left=""
    svgDiv.style.margin=""
      svgDiv.style.border="1px solid black"

     gridLayer.style.visibility=""
}
//---Chrome Browser---
 if (window.matchMedia)
    {
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function(mql)
            {
                if (mql.matches)
                {
                    beforePrint();
                }
                else
                {
                    afterPrint();
                }
            }
        );
    }

     //---IE & FF---
window.onbeforeprint = beforePrint
window.onafterprint = afterPrint;