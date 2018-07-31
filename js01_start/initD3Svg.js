


var NS = "http://www.w3.org/2000/svg"


var ZoomG
var ElemG
var Grid
//var TopG

//var AddElemG //---all added elems container---
//var AddPathG //---all added paths container---
//var AddHmiG
///////////var AddStripChartG

////////////var CenterlineG
//var AddSymbolG //---all added pgon symbols container---
//var AddProcessG //---all added components symbols container---
//var AddComponentG //---all added components symbols container---
//var AddIsaG //---all added ISA symbols container---
//var AddIconG //---all added icon container---
var CoverRect
var ProcessRect
var ComponentRect
var ActiveElemG
var ActiveElem = null
var Wrapper //---svg wrapper---
var DrawX
var DragDot //---used for circles/rects---
var MySVG
//---called via onload---
function initD3Svg()
{
    MySVG = d3.select("#mySVG")
    var defs = MySVG.append("defs")
    .attr("id", "endArrowDefs")
    .append("marker")
    .attr("id", "endArrow")
    .attr("viewBox", "0 0 8000 8000")
    .attr("vector-effect", "non-scaling-stroke")
    .attr("refX", "250")
    .attr("refY", "150")
    .attr("markerUnits", "strokeWidth")
    .attr("markerWidth", "300")
    .attr("markerHeight", "300")
    .attr("orient", "auto")
    .attr("fill", "violet")
    .attr("stroke-linejoin", "bevel")
    .append("path")
    .attr("d", "M2 59,293 148,1 243,121 151,Z")
    .attr("stroke", "RGB(0,0,0)")
    defs.append("marker")
    .attr("id", "cloneArrow")
    .attr("viewBox", "0 0 8000 8000")
    .attr("vector-effect", "non-scaling-stroke")
    .attr("refX", "250")
    .attr("refY", "150")
    .attr("markerUnits", "strokeWidth")
    .attr("markerWidth", "300")
    .attr("markerHeight", "300")
    .attr("orient", "auto")
    .attr("fill", "#000000")
    .attr("stroke-linejoin", "bevel")
    .append("path")
    .attr("d", "M2 59,293 148,1 243,121 151,Z")
    .attr("stroke", "RGB(0,0,0)")


  var defs = MySVG.append("defs")
    .attr("id", "pilotLightDefs")

  var blueGrad=defs.append("radialGradient")
   .attr("id","blueGradient")
   .attr("cx","50%")
   .attr("cy","50%")
   .attr("r","75%")
   blueGrad.append("stop")
   .attr("offset","0%")
   .attr("stop-color","rgb(0,0,255)")
  .attr("stop-opacity","1")
   blueGrad.append("stop")
   .attr("offset","100%")
   .attr("stop-color","rgb(0,0,0)")
  .attr("stop-opacity","1")

  var greenGrad=defs.append("radialGradient")
   .attr("id","greenGradient")
   .attr("cx","50%")
   .attr("cy","50%")
   .attr("r","75%")
   greenGrad.append("stop")
   .attr("offset","0%")
   .attr("stop-color","rgb(0,191,0)")
  .attr("stop-opacity","1")
   greenGrad.append("stop")
   .attr("offset","100%")
   .attr("stop-color","rgb(0,0,0)")
  .attr("stop-opacity","1")

  var greyGrad=defs.append("radialGradient")
   .attr("id","greyGradient")
   .attr("cx","50%")
   .attr("cy","50%")
   .attr("r","75%")
  greyGrad .append("stop")
   .attr("offset","0%")
   .attr("offset","0%")
   .attr("stop-color","rgb(255,255,255)")
  .attr("stop-opacity","1")
   greyGrad.append("stop")
   .attr("offset","100%")
   .attr("stop-color","rgb(0,0,0)")
  .attr("stop-opacity","1")

  var redGrad=defs.append("radialGradient")
   .attr("id","redGradient")
   .attr("cx","50%")
   .attr("cy","50%")
   .attr("r","75%")
   redGrad.append("stop")
   .attr("offset","0%")
   .attr("stop-color","rgb(255,0,0)")
  .attr("stop-opacity","1")
   redGrad.append("stop")
   .attr("offset","100%")
   .attr("stop-color","rgb(0,0,0)")
  .attr("stop-opacity","1")

  var violetGrad=defs.append("radialGradient")
   .attr("id","violetGradient")
   .attr("cx","50%")
   .attr("cy","50%")
   .attr("r","75%")
   violetGrad.append("stop")
   .attr("offset","0%")
   .attr("stop-color","rgb(219,0,219)")
  .attr("stop-opacity","1")
   violetGrad.append("stop")
   .attr("offset","100%")
   .attr("stop-color","rgb(0,0,0)")
  .attr("stop-opacity","1")

  var aquaGrad=defs.append("radialGradient")
   .attr("id","aquaGradient")
   .attr("cx","50%")
   .attr("cy","50%")
   .attr("r","75%")
   aquaGrad.append("stop")
   .attr("offset","0%")
   .attr("stop-color","aqua")
  .attr("stop-opacity","1")
   aquaGrad.append("stop")
   .attr("offset","100%")
   .attr("stop-color","rgb(0,0,0)")
  .attr("stop-opacity","1")



    //--holds all path end arrows---
    MySVG.append("defs")
    .attr("id", "arrowDefs")


    var defsPattern=MySVG.append("defs")
    .attr("id","defsPattern")

    var defsGradient=MySVG.append("defs")
    .attr("id","defsGradient")
    var defsShadow=MySVG.append("defs")
    .attr("id","defsShadow")
 var filter = defsShadow.append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "150%") 
    .attr("width", "150%");

// SourceAlpha refers to opacity of graphic that this filter will be applied to
// convolve that with a Gaussian with standard deviation 3 and store result
// in blur
filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 5)
    .attr("result", "blur");

// translate output of Gaussian blur to the right and downwards with 2px
// store result in offsetBlur
filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 5)
    .attr("dy", 5)
    .attr("result", "offsetBlur");

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");


    var defs3DPipe=MySVG.append("defs")
    .attr("id", "pipe3dDefs")
    var pipeFilter=defs3DPipe.append("filter")
    .attr("id","pipe3D")
    pipeFilter.append("feFlood").attr("flood-color","black")
    pipeFilter.append("feComposite").attr("operator","out").attr("in2","SourceGraphic")
    pipeFilter.append("feGaussianBlur").attr("stdDeviation","6")
    pipeFilter.append("feComposite").attr("operator","atop").attr("in2","SourceGraphic")

//----alarm zone bar gauge---
var defs=MySVG.append("defs")
     .attr("id","alarmWarningTrendDefs")

  var warningMax=defs.append("linearGradient")
      .attr("id","warningMaxTrend")
      .attr("x1","84%")
      .attr("y1","24%")
      .attr("x2","82%")
      .attr("y2","72%")
    warningMax.append("stop")
    .attr("offset","0%")
    .attr("stop-color","#FF0000")
    .attr("stop-opacity","1")
    warningMax.append("stop")
    .attr("offset","100%")
    .attr("stop-color","#FFA500")
    .attr("stop-opacity","1")
    .attr("stop-offset","100%")
 var warningMin=defs.append("linearGradient")
      .attr("id","warningMinTrend")
      .attr("x1","84%")
      .attr("y1","24%")
      .attr("x2","82%")
      .attr("y2","72%")
    warningMin.append("stop")
    .attr("offset","0%")
    .attr("stop-color","#FFA500")
    .attr("stop-opacity","1")
    .attr("stop-offset","0%")
    warningMin.append("stop")
    .attr("offset","100%")
    .attr("stop-color","#FF0000")
    .attr("stop-opacity","1")


//----alarm zone bar gauge---
var defs=MySVG.append("defs")
     .attr("id","alarmWarningBarDefs")
 var lg1=defs.append("linearGradient")
 .attr("id","warningMaxBar")
 .attr("y1","84%")
 .attr("x1","24%")
 .attr("y2","82%")
 .attr("x2","72%")
 lg1.append("stop")
  .attr("offset","0")
 .attr("stop-color","#FFA500")
 .attr("stop-opacity","1")
 lg1.append("stop")
  .attr("offset","100%")
 .attr("stop-color","#FF0000")
 .attr("stop-opacity","1")
 .attr("stop-offset","100%")

 var lg2=defs.append("linearGradient")
 .attr("id","warningMinBar")
 .attr("y2","84%")
 .attr("x2","24%")
 .attr("y1","82%")
 .attr("x1","72%")
 lg2.append("stop")
  .attr("offset","0")
 .attr("stop-color","#FFA500")
 .attr("stop-opacity","1")
 lg2.append("stop")
  .attr("offset","100%")
 .attr("stop-color","#FF0000")
 .attr("stop-opacity","1")
 .attr("stop-offset","100%")
 //---tankLevel-------
    var defs=MySVG.append("defs")
    .attr("id","alarmWarningTankLevelDefs")
    var warningMax=defs.append("linearGradient")
    .attr("id","warningMaxTankLevel")
    .attr("x1","84%")
    .attr("y1","24%")
    .attr("x2","82%")
    .attr("y2","72%")
    warningMax.append("stop")
    .attr("offset","0%")
    .attr("stop-color","#FF0000")
    .attr("stop-opacity","1")
    warningMax.append("stop")
    .attr("offset","100%")
    .attr("stop-color","#FFA500")
    .attr("stop-opacity","1")
    .attr("stop-offset","100%")
    var warningMin=defs.append("linearGradient")
    .attr("id","warningMinTankLevel")
    .attr("x1","84%")
    .attr("y1","24%")
    .attr("x2","82%")
    .attr("y2","72%")
    warningMin.append("stop")
    .attr("offset","0%")
    .attr("stop-color","#FFA500")
    .attr("stop-opacity","1")
    .attr("stop-offset","0%")
    warningMin.append("stop")
    .attr("offset","100%")
    .attr("stop-color","#FF0000")
    .attr("stop-opacity","1")

    ZoomG=MySVG.append("g")
    .attr("id", "zoomG")
    var bgImageG=ZoomG.append("g")
        .attr("id", "bgImageG")
    Grid = ZoomG.append("g")
    .attr("id", "gridLayer")
     .attr("shape-rendering","geometricPrecision")
    .attr("pointer-events", "none")


    ElemG = ZoomG.append("g")
   .attr("id", "domElemG")
    .attr("shape-rendering","geometricPrecision")
     .attr("text-rendering", "geometricPrecision")
     .attr("class", "noselect")


    Wrapper = MySVG.append("svg")
    .attr("pointer-events", "none")
    .attr("id", "domWrapper")

    //---text/icon/path drag protect---
    CoverRect = MySVG.append("rect")
    .style("display", "none")
    .attr("id", "coverRect")
    .attr("pointer-events", "none")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "white")
    .attr("opacity", 0)

    //---holds on the single Active Elem under construction---
    //---top of svg ---
    ActiveElemG = MySVG.append("g")
   .attr("id", "domActiveElemG")
   .attr("shape-rendering","geometricPrecision")
    .attr("text-rendering","geometricPrecision")

   ProcessRect=MySVG.append("rect")
   .attr("id","processRect")
   .attr("pointer-events","none")
   .attr("stroke","none")
   .attr("fill","#7df9ff")
   .attr("fill-opacity",".4")

   ComponentRect=MySVG.append("rect")
   .attr("id","componentRect")
   .attr("pointer-events","none")
   .attr("stroke","none")
   .attr("fill","#c9a0dc")
   .attr("fill-opacity",".4")

    DrawX = MySVG.append("g") //---place in mysvg so zoom works---
    .style("display", "none")
    .attr("id", "domDrawX")
    .attr("stroke", "violet")
    .attr("stroke-width", "2")
    .attr("pointer-events", "none")
    DrawX.append("circle")
    .attr("vector-effect", "non-scaling-stroke")
    .attr("cx", "0")
    .attr("cy", "0")
    .attr("r", "3")
    .attr("fill", "black")
    DrawX.append("line")
    .attr("vector-effect", "non-scaling-stroke")
    .attr("x1", "0")
    .attr("y1", "-30")
    .attr("x2", "0")
    .attr("y2", "30")
    DrawX.append("line")
    .attr("vector-effect", "non-scaling-stroke")
    .attr("x1", "-20")
    .attr("y1", "0")
    .attr("x2", "20")
    .attr("y2", "0")

    DragDot = ActiveElemG.append("circle")
    .attr("id", "dragDot")
    .attr("class", "dragTargetObj")
    .attr("cx", "0")
    .attr("cy", "0")
    .attr("r", "12")
    .attr("fill", "white")
    .attr("fill-opacity", ".5")
    .attr("stroke", "black")
    .attr("stroke-width", "1")
    .attr("vector-effect", "non-scaling-stroke")
    .style("visibility", "hidden")
    .style("cursor", "default")

   var openerScada=MySVG.append("g")
     .attr("id","openerScadaG")
     .attr("transform","translate(200,20)")
     .attr("opacity",0)
  var pipe=openerScada.append("path")
  .attr("id","pipeScada")
  .attr("fill","none")
  .attr("fill-opacity","1.0")
  .attr("stroke","#adff2f")
  .attr("stroke-width","25")
  .attr("stroke-opacity","1")
  .attr("stroke-linejoin","round")
  .attr("filter","url(#pipe3D)")
  .attr("d","M 185 140 L 363 140 L 363 351 L 257 351 L 257 279 L 33 279 L 33 166 L 185 166 z")
 var arrowLine1=openerScada.append("path")
  .attr("id","arrowLine1")
  .attr("fill","none")
  .attr("stroke","violet")
  .attr("stroke-width","2.5")
  .attr("marker-end","url(#endArrow)")
  .attr("d","M0,0 20,0 40,0")
 var arrowLine2=openerScada.append("path")
  .attr("id","arrowLine2")
  .attr("fill","none")
  .attr("stroke","violet")
  .attr("stroke-width","2.5")
  .attr("marker-end","url(#endArrow)")
  .attr("d","M0,0 20,0 40,0")
   var svgText=openerScada.append("text")
   .attr("id","textJS")
   .attr("text-anchor","middle")
   .attr("x","200")
   .attr("y","30")
   .attr("dy",".33em")
   .attr("font-size","60")
   .attr("font-family","times new roman")
   .attr("font-weight","bold")
   .attr("fill","red")
   .attr("stroke-width","1")
   .attr("stroke","black")
   .attr("opacity","1")
   .attr("filter","url(#drop-shadow)")
   .text("SVG + JavaScript = SCADA")

   var svgText=MySVG.append("text")
   .attr("id","textSVG")
   .attr("text-anchor","middle")
   .attr("x","50%")
   .attr("y","50%")
   .attr("dy",".33em")
   .attr("font-size","350")
   .attr("font-family","times new roman")
   .attr("font-weight","bold")
   .attr("fill","red")
   .attr("stroke-width","5")
   .attr("stroke","black")
   .attr("opacity","1")
   .attr("filter","url(#drop-shadow)")
   .text("SVG")



   callZoomBehavior()
  //disableZoom()
}
