function getPosition(el) {
  var xPosition = 0;
  var yPosition = 0;


      xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPosition += (el.offsetTop - el.scrollTop + el.clientTop);

  return {
    x: xPosition,
    y: yPosition
  };
}
function reverse(s) {
    return s.split('').reverse().join('');
}
//=================================================================================
//---Usage: decomposeMatrix(document.getElementById('myElement').getCTM())
   function deltaTransformPoint(matrix, point)  {

        var dx = point.x * matrix.a + point.y * matrix.c + 0;
        var dy = point.x * matrix.b + point.y * matrix.d + 0;
        return { x: dx, y: dy };
    }


    function decomposeMatrix(matrix) {

        // @see https://gist.github.com/2052247

        // calculate delta transform point
        var px = deltaTransformPoint(matrix, { x: 0, y: 1 });
        var py = deltaTransformPoint(matrix, { x: 1, y: 0 });

        // calculate skew
        var skewX = ((180 / Math.PI) * Math.atan2(px.y, px.x) - 90);
        var skewY = ((180 / Math.PI) * Math.atan2(py.y, py.x));

        return {

            translateX: matrix.e,
            translateY: matrix.f,
            scaleX: Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b),
            scaleY: Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d),
            skewX: skewX,
            skewY: skewY,
            rotation: skewX // rotation is the same as skew x
        };
    }

 //---rotate elem----
function rote(id,angle)
{

    var domElem=document.getElementById(id)
	var transformRequestObjRote=mySVG.createSVGTransform()
	var animTransformListRote=domElem.transform
	var transformList=animTransformListRote.baseVal
	transformRequestObjRote.setRotate(angle,0,0)
	transformList.appendItem(transformRequestObjRote)
	transformList.consolidate()

    var ctm=domElem.getCTM()
     RAD2DEG = 180 / Math.PI;
RotateAngle = Math.atan2( ctm.b, ctm.a ) * RAD2DEG;



}
//---used when adding/editing elements---
function coverOn()
{

  CoverRect.style("display","block")


  domElemG.setAttribute("pointer-events","none")


}
function coverOff()
{

 CoverRect.style("display","none")


  domElemG.removeAttribute("pointer-events" )


}


//---return  transformed x,y from computed x,y---
function XY(x,y)
{
   	var pnt = domSVG.createSVGPoint();
	pnt.x = x
	pnt.y = y
	var sCTM = domSVG.getScreenCTM();
	var PNT = pnt.matrixTransform(sCTM.inverse());
  	return {x:PNT.x,y:PNT.y}
}




//---real numbers---
function numberWithCommas(str)
 {
  return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
    return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
  });
}

//---check svg element's svg properties---
function svg2Stng(svgElem)
{
 console.log(new XMLSerializer().serializeToString(svgElem))
}

