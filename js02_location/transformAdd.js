



function tfm(id,transX,transY,scale)
{
	var domElem=document.getElementById(id)
      var matrix = domElem.getCTM()

	if(!scale)
	{
		var scale=matrix.a
    }
	if(!transX)
	{



                    var transX=matrix.e
                    var transY=matrix.f

	}
	domElem.setAttribute("transform","")
	domElem.removeAttribute("transform")

	var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=domElem.transform
	var transformList=animTransformList.baseVal

	transformRequestObj.setTranslate(transX,transY)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()

	transformRequestObj.setScale(scale,scale)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()


}

function addScale(elem,scale)
{
      

        var bb=elem.getBBox()

        var cx=bb.x+.5*bb.width
        var cy=bb.y+.5*bb.height
        var elemCenter=[cx,cy]


        elem.setAttribute("myscale",scale)
        var transformRequestObj=mySVG.createSVGTransform()
        var animTransformList=elem.transform
        var transformList=animTransformList.baseVal

        transformRequestObj.setTranslate(-elemCenter[0]*(scale-1), -elemCenter[1]*(scale-1))
        transformList.appendItem(transformRequestObj)
        transformList.consolidate()
        transformRequestObj.setScale(scale,scale)
        transformList.appendItem(transformRequestObj)

        transformList.consolidate()

}
function addTranslate(elem,transX,transY)
{
    	var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=elem.transform
	var transformList=animTransformList.baseVal

	transformRequestObj.setTranslate(transX,transY)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()

}
function roteElem(id,angle)
{
	var domElem=document.getElementById(id)
	var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=domElem.transform
	var transformList=animTransformList.baseVal
	transformRequestObj.setRotate(angle,0,0)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()
}

function rotePath(angle)
{
    var transform=domDrawX.getAttribute("transform")
		var pt=d3.transform(transform)
		var cx=pt.translate[0]
		var cy=pt.translate[1]


	var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=domActiveElemG.transform
	var transformList=animTransformList.baseVal
	transformRequestObj.setRotate(angle,cx,cy)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()

      var transform=ActiveElemG.attr("transform")
	var pt=d3.transform(transform)
	ActiveElemG.data([{x: pt.translate[0] , y: pt.translate[1],scale:pt.scale[0],rotate:pt.rotate}])
    console.log(pt.scale)

   
}

