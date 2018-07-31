//======================PVC MONITOR OBJECT========================================
function buildProcessVariableChart(id, title, timeLine, timeLineUnits, faceColor, leftVariable, minLeft, maxLeft, setPointLeft, right1Variable, minRight1, maxRight1,  right2Variable, minRight2, maxRight2,  scale, transX, transY)
{
    var defaultHeight=410
    //---chart size---
    var height=260
     var width=450

    if(leftVariable&&right1Variable&&right2Variable)
    var defaultWidth=700
    else if(leftVariable&&right1Variable)
    var defaultWidth=600
    else if(leftVariable)
    var defaultWidth=550


    var svg=d3.select("#mySVG")
    //---container---
    var PVCG=svg.append("g")
    .attr("id",id)
    .attr("text-rendering","geometricPrecision")
    .attr("shape-rendering","geometricPrecision")
    .attr("transform","translate("+transX+","+transY+")scale("+scale+")")

    //---face rectangle---
    PVCG.append("rect")
    .attr("id","faceRect"+id)
    .attr("height",defaultHeight)
    .attr("width",defaultWidth)
    .attr("rx",20)
    .attr("ry",20)
    .attr("fill",faceColor)
    .attr("stroke","black")
    .attr("stroke-width",3)

    var myTitle=PVCG.append("text")
    .attr("id","PVCTitle"+id)
    .text(title)
    .attr("x",defaultWidth/2)
    .attr("dy","1em")
    .attr("font-family","arial")
    .attr("font-size","40")
    .attr("font-weight","bold")
    .attr("text-anchor","middle")


    //---timeline---
    var xTime = d3.scaleLinear()
    .domain([0, timeLine])
    .range([0, width])


    var yLeft = d3.scaleLinear()
    .domain([minLeft, maxLeft]) // measured
    .range([height, 0]); // output
    //---hertz value---
    var yRight1 = d3.scaleLinear()
    .domain([minRight1, maxRight1]) // input
    .range([height, 0]); // output
    //---voltage value---
    var yRight2 = d3.scaleLinear()
    .domain([minRight2, maxRight2]) // input
    .range([height, 0]); // output

    // gridlines in x axis function
    function make_x_gridlines() {
    return d3.axisBottom(xTime)
    }

    // gridlines in y axis function
    function make_y_gridlines() {
    return d3.axisLeft(yLeft)
    }

    var plotG=PVCG.append("g")
    .attr("id","plotG"+id)
    .attr("transform","translate(70,90)")

    plotG.append("rect")
    .attr("id","plotRect")
    .attr("width",width)
    .attr("height",height)
    .attr("stroke","none")
    .attr("fill","ghostWhite")
    var defs=plotG.append("defs")
    defs.append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height)

    // add the X gridlines
    plotG.append("g")
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(make_x_gridlines()
    .tickSize(-height)
    .tickFormat("")
    )

    // add the Y gridlines
    plotG.append("g")
    .attr("class", "grid")
    .call(make_y_gridlines()
    .tickSize(-width)
    .tickFormat("")
    )

    // Call the x axis timeLine in a group tag
    plotG.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height+ ")")
    .call(d3.axisBottom(xTime)) // Create an axis component with d3.axisBottom
    .selectAll("text")
    .attr("font-size","24")
    .attr("fill","black")
    .attr("stroke","black")
    .attr("stroke-width",".5")

    var unitText=plotG.append("text")
    .text(timeLineUnits)
    .attr("x",width/2)
    .attr("y",height+45)
    .attr("font-family","arial")
    .attr("font-size","25")
    .attr("text-anchor","middle")

    // Call the Left y axis in a group tag
    var Left=plotG.append("text")
    .text(leftVariable)
    .attr("font-size",30)
    .attr("fill","DarkViolet")
    .attr("stroke","black")
    .attr("stroke-width","1")
    .attr("font-weight","bold")
    .attr("transform","translate(-60,-20)")

    if(right1Variable)
    var Right1=plotG.append("text")
    .text(right1Variable)
    .attr("font-size",30)
    .attr("fill","blue")
    .attr("stroke","black")
    .attr("stroke-width","1")
    .attr("font-weight","bold")
    .attr("transform","translate(340,-20)")

    if(right2Variable)
    var Right2=plotG.append("text")
    .text(right2Variable)
    .attr("font-size",30)
    .attr("fill","red")
    .attr("stroke","black")
    .attr("stroke-width","1")
    .attr("font-weight","bold")
    .attr("transform","translate(510,-20)")

    plotG.append("g")
    .attr("class", "y axisDarkViolet")
    .call(d3.axisLeft(yLeft))
    .selectAll("text")
    .attr("font-size","24")
    .attr("fill","DarkViolet")
    .attr("stroke","black")
    .attr("stroke-width",".5")
    if(right1Variable)
    plotG.append("g")
    .attr("class", "y axis right axisBlue")
    .attr("transform", "translate("+(width+10)+",0)")
    .call(d3.axisRight(yRight1))
    .selectAll("text")
    .attr("font-size","24")
    .attr("fill","blue")
    .attr("stroke","black")
    .attr("stroke-width",".5")
     if(right2Variable)
    plotG.append("g")
    .attr("class", "y axis right axisred")
    .attr("transform", "translate("+(width+100)+",0)")
    .call(d3.axisRight(yRight2))
    .selectAll("text")
    .attr("font-size","24")
    .attr("fill","red")
    .attr("stroke","black")
    .attr("stroke-width",".5")


    //-----------setpoint line------------
    if(setPointLeft)
    {
        var pxPerValHt=height/(Math.abs(maxLeft)-Math.abs(minLeft))
        var setPointY=pxPerValHt*(maxLeft-setPointLeft)
         var dash=width/30

        plotG.append("line")
        .attr("id", "setPointLeft")
        .attr("x1",0)
        .attr("y1", setPointY)
        .attr("x2", width)
        .attr("y2", setPointY)
        .attr("stroke", "green")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", dash+","+dash)
    }


     if(id=="hwsPVC")
    {
        lineLeftHwsPVC = d3.line()
        .x(function(d, i) { return xTime(i); }) // set the x values for the line generator
        .y(function(d) { return yLeft(d.Left); }) // set the y values for the line generator
        .curve(d3.curveMonotoneX) // apply smoothing to the line
   }
    if(id=="pumpPVC")
    {
        lineLeftPumpPVC = d3.line()
        .x(function(d, i) { return xTime(i); }) // set the x values for the line generator
        .y(function(d) { return yLeft(d.hws); }) // set the y values for the line generator
        .curve(d3.curveMonotoneX) // apply smoothing to the line
        if(right2Variable)
        lineRight2PumpPVC  = d3.line()
        .x(function(d, i) { return xTime(i); }) // set the x values for the line generator
        .y(function(d) { return yRight2(d.oat); }) // set the y values for the line generator
        .curve(d3.curveMonotoneX) // apply smoothing to the line
        if(right1Variable)
        lineRight1PumpPVC = d3.line()
        .x(function(d, i) { return xTime(i); }) // set the x values for the line generator
        .y(function(d) { return yRight1(d.gpm); }) // set the y values for the line generator
        .curve(d3.curveMonotoneX) // apply smoothing to the line
    }
    if(id=="fanPVC")
    {
        lineLeftFanPVC = d3.line()
        .x(function(d, i) { return xTime(i); }) // set the x values for the line generator
        .y(function(d) { return yLeft(d.Left); }) // set the y values for the line generator
        .curve(d3.curveMonotoneX) // apply smoothing to the line

        if(right1Variable)
        lineRight1FanPVC = d3.line()
        .x(function(d, i) { return xTime(i); }) // set the x values for the line generator
        .y(function(d) { return yRight1(d.Right1); }) // set the y values for the line generator
        .curve(d3.curveMonotoneX) // apply smoothing to the line
    }

    // Append the path, bind the data, and call the line generator
    if(id=="pumpPVC")
        Data=DataPump
    else if(id=="fanPVC")
        Data=DataFan
    else if(id=="hwsPVC")
        Data=DataHWS

    if(id=="hwsPVC")
    {
        var pathLeft=plotG.append("path")
        .attr("clip-path", "url(#clip)")
        .datum(Data) // 10. Binds data to the line
        .attr("class", "chartLineLeft") // Assign a class for styling
        .attr("d", lineLeftHwsPVC); // 11. Calls the line generator
        pathLeft.attr("id","pathLeft"+id)
   }


    if(id=="pumpPVC")
    {
        var pathLeft=plotG.append("path")
        .attr("clip-path", "url(#clip)")
        .datum(Data) // 10. Binds data to the line
        .attr("class", "chartLineLeft") // Assign a class for styling
        .attr("d", lineLeftPumpPVC); // 11. Calls the line generator
        pathLeft.attr("id","pathLeft"+id)
        if(right2Variable)
        var pathRight2=plotG.append("path")
        .attr("clip-path", "url(#clip)")
        .datum(Data) // 10. Binds data to the line
        .attr("class", "chartLineRight2") // Assign a class for styling
        .attr("d", lineRight2PumpPVC); // 11. Calls the line generator
        pathRight2.attr("id","pathRight2"+id)
       if(right1Variable)
        var pathRight1=plotG.append("path")
        .attr("clip-path", "url(#clip)")
        .datum(Data) // 10. Binds data to the line
        .attr("class", "chartLineRight1") // Assign a class for styling
        .attr("d", lineRight1PumpPVC); // 11. Calls the line generator
        pathRight1.attr("id","pathRight1"+id)
    }
    if(id=="fanPVC")
    {
         var pathLeft=plotG.append("path")
        .attr("clip-path", "url(#clip)")
        .datum(Data) // 10. Binds data to the line
        .attr("class", "chartLineLeft") // Assign a class for styling
        .attr("d", lineLeftFanPVC); // 11. Calls the line generator
        pathLeft.attr("id","pathLeft"+id)

        if(right1Variable)
        var pathRight1=plotG.append("path")
        .attr("clip-path", "url(#clip)")
        .datum(Data) // 10. Binds data to the line
        .attr("class", "chartLineRight1") // Assign a class for styling
        .attr("d", lineRight1FanPVC); // 11. Calls the line generator
        pathRight1.attr("id","pathRight1"+id)
    }


   /*  Digital Readout
    var fo=PVCFO.cloneNode(true)
    fo.setAttribute("id","digital"+id)
    document.getElementById(id).appendChild(fo)
    //---add digital values---
    var digitalLeft=fo.getElementsByTagName("input")[0]
    var digitalRight1=fo.getElementsByTagName("input")[1]
    var digitalRight2=fo.getElementsByTagName("input")[2]
    digitalLeft.value=Data[Data.length-1].Left
    if(right1Variable)
    digitalRight1.value=Data[Data.length-1].Right1
    else
    digitalRight1.style.display="none"
    if(right2Variable)
    digitalRight2.value=Data[Data.length-1].Right2
    else
     digitalRight2.style.display="none"

    var tr=fo.getElementsByTagName("tr")[1]
    var tdLeft=tr.getElementsByTagName("td")[0]
    var tdRight1=tr.getElementsByTagName("td")[1]
    var tdRight2=tr.getElementsByTagName("td")[2]
    tdLeft.innerHTML=leftVariable
    if(right1Variable)
    tdRight1.innerHTML=right1Variable
    if(right1Variable)
    tdRight2.innerHTML=right2Variable
  */

}

//==================END PVC OBJECT======================================

//---onload this page---
function createPVCs() //----this application configuration----
{
    //buildProcessVariableChart(id, title, timeLine, timeLineUnits, faceColor, leftVariable, minLeft, maxLeft, setPointLeft, right1Variable, minRight1, maxRight1, right2Variable, minRight2, maxRight2, scale, transX, transY)<br>
    buildProcessVariableChart("hwsPVC", "Heating Hot Water",60,"Minutes","yellow","HWS(\u00B0F)", 60, 220,160, null, null, null, null,null,null,.2,20,50);
    buildProcessVariableChart("fanPVC", "Fan Static Pressure",60,"Minutes","#ffd700","STP(in W.C.)", 0, 5, 3.25, "Fan(HZ)", 60, 180, null, null, null, .3,10,150);
    buildProcessVariableChart("pumpPVC", "Hot Water Flow ",60,"Minutes","#adff2f","HWS(\u00B0F)", 60, 220, 150, "Flow(GPM)", 0, 600,  "OAT(\u00B0F)",-20, 120,.4,20,290);
}

//var simulateInterval=setInterval("simulate()",2000)
function simulate()
{
    //slideHwsStripChart()
    slidePumpStripChart()
    //slideFanStripChart()
}

var lineLeftHwsPVC

var lineLeftPumpPVC
var lineRight1PumpPVC
var lineRight2PumpPVC
var lineLeftFanPVC
var lineRight1FanPVC
function slideHwsStripChart()
{
    var width=450
    DataHWS[DataHWS.length]=DataHWS[0] //---{Left} ---

    var pathLeft=d3.select("#pathLefthwsPVC")

    pathLeft.attr("d", lineLeftHwsPVC)
    .attr("transform", null);
    pathLeft.transition().duration(850).attr("transform", "translate(" + -width/60 + ",0)")

    DataHWS.shift()

}
function slidePumpStripChart()
{
    var width=450
    DataPump[DataPump.length]=DataPump[0] //---{Left,Right2,Right1} ---

    var pathRight2=d3.select("#pathRight2pumpPVC")
    var pathLeft=d3.select("#pathLeftpumpPVC")
    var pathRight1=d3.select("#pathRight1pumpPVC")

    pathRight2.attr("d", lineRight2PumpPVC)
    .attr("transform", null);
    pathLeft.attr("d", lineLeftPumpPVC)
    .attr("transform", null);
    pathRight1.attr("d", lineRight1PumpPVC)
    .attr("transform", null);

    pathRight2.transition().duration(850).attr("transform", "translate(" + -width/60 + ",0)")
    pathLeft.transition().duration(850).attr("transform", "translate(" + -width/60 + ",0)")
    pathRight1.transition().duration(850).attr("transform", "translate(" + -width/60 + ",0)")

    DataPump.shift()

}
function slideFanStripChart()
{
    var width=400
    DataFan[DataFan.length]=DataFan[0] //---{Left,Right2,Right1} ---
    var pathLeft=d3.select("#pathLeftfanPVC")
    var pathRight1=d3.select("#pathRight1fanPVC")

    pathRight1.attr("d", lineRight1FanPVC)
    .attr("transform", null);
    pathLeft.attr("d", lineLeftFanPVC)
    .attr("transform", null);

    pathLeft.transition().duration(850).attr("transform", "translate(" + -width/60 + ",0)")
    pathRight1.transition().duration(850).attr("transform", "translate(" + -width/60 + ",0)")
    DataFan.shift()
}

//---start dataBase-----------
var DataPump=[
{hws:138,oat:83,gpm:204},
{hws:169,oat:72,gpm:228},
{hws:167,oat:90,gpm:223},
{hws:147,oat:79,gpm:204},
{hws:139,oat:72,gpm:218},
{hws:156,oat:74,gpm:221},
{hws:159,oat:82,gpm:226},
{hws:167,oat:72,gpm:213},
{hws:153,oat:72,gpm:226},
{hws:142,oat:87,gpm:236},
{hws:145,oat:83,gpm:232},
{hws:153,oat:76,gpm:220},
{hws:131,oat:84,gpm:214},
{hws:164,oat:90,gpm:205},
{hws:155,oat:87,gpm:228},
{hws:166,oat:75,gpm:204},
{hws:138,oat:84,gpm:208},
{hws:132,oat:84,gpm:204},
{hws:168,oat:78,gpm:209},
{hws:150,oat:80,gpm:212},
{hws:132,oat:81,gpm:205},
{hws:146,oat:79,gpm:202},
{hws:144,oat:77,gpm:226},
{hws:138,oat:83,gpm:228},
{hws:160,oat:74,gpm:216},
{hws:160,oat:88,gpm:237},
{hws:135,oat:90,gpm:221},
{hws:151,oat:81,gpm:239},
{hws:134,oat:78,gpm:232},
{hws:154,oat:77,gpm:225},
{hws:144,oat:89,gpm:212},
{hws:132,oat:86,gpm:211},
{hws:132,oat:79,gpm:225},
{hws:144,oat:79,gpm:212},
{hws:134,oat:73,gpm:226},
{hws:137,oat:82,gpm:207},
{hws:159,oat:87,gpm:209},
{hws:165,oat:87,gpm:211},
{hws:152,oat:88,gpm:224},
{hws:164,oat:82,gpm:239},
{hws:154,oat:82,gpm:223},
{hws:133,oat:74,gpm:212},
{hws:152,oat:74,gpm:225},
{hws:168,oat:89,gpm:225},
{hws:135,oat:80,gpm:225},
{hws:149,oat:76,gpm:234},
{hws:154,oat:83,gpm:223},
{hws:159,oat:86,gpm:233},
{hws:155,oat:76,gpm:225},
{hws:165,oat:88,gpm:205},
{hws:155,oat:83,gpm:231},
{hws:152,oat:74,gpm:229},
{hws:156,oat:87,gpm:220},
{hws:167,oat:84,gpm:233},
{hws:155,oat:86,gpm:228},
{hws:147,oat:74,gpm:235},
{hws:167,oat:83,gpm:224},
{hws:131,oat:84,gpm:213},
{hws:169,oat:88,gpm:212},
{hws:142,oat:71,gpm:200}

]


function buildDataPump()
{      myValue.value="var DataPump=[\n"
 for(var k=0;k<60;k++)
     {

      var hws=Math.round(Math.random()*40)+130
      var gpm=Math.round(Math.random()*40)+200
      var oat=Math.round(Math.random()*20)+70

      myValue.value+="{Left:"+hws+",Right2:"+oat+",Right1:"+gpm+"},\n"
    }


}



var DataFan=[
{Left:2.634495418019192,Right1:104},
{Left:3.4051096238080323,Right1:101},
{Left:3.1727041242653913,Right1:81},
{Left:2.6442301565036637,Right1:91},
{Left:3.7343680905275,Right1:108},
{Left:2.9846109187131096,Right1:82},
{Left:3.45742594698292,Right1:93},
{Left:3.991184614678524,Right1:100},
{Left:3.7283499227927948,Right1:98},
{Left:3.804143814773777,Right1:101},
{Left:3.096779606261305,Right1:89},
{Left:3.4877178837606557,Right1:84},
{Left:2.7346915977309845,Right1:109},
{Left:2.615609060563392,Right1:92},
{Left:3.8403290066999567,Right1:96},
{Left:3.0355906871030216,Right1:87},
{Left:3.268843305453172,Right1:105},
{Left:3.826428634138113,Right1:104},
{Left:3.371842865004168,Right1:86},
{Left:3.5412948606334123,Right1:94},
{Left:3.8506680393610644,Right1:80},
{Left:3.6127266378907916,Right1:108},
{Left:3.71851922655116,Right1:82},
{Left:2.501600336989,Right1:103},
{Left:3.7448175680246556,Right1:101},
{Left:3.770635008546916,Right1:84},
{Left:3.2723395305871774,Right1:100},
{Left:3.7914508791183277,Right1:108},
{Left:3.562107441227077,Right1:106},
{Left:3.5240667795920153,Right1:97},
{Left:3.381976162581209,Right1:96},
{Left:3.962403085448793,Right1:89},
{Left:3.662480281311324,Right1:90},
{Left:2.7254453473688303,Right1:90},
{Left:2.714541318694905,Right1:103},
{Left:3.4256521460211724,Right1:100},
{Left:3.8852412177886038,Right1:103},
{Left:2.9899089800641363,Right1:88},
{Left:3.7640280357575104,Right1:107},
{Left:2.995231770396545,Right1:105},
{Left:2.772074015411541,Right1:105},
{Left:3.2945992175131433,Right1:107},
{Left:2.7560694568652564,Right1:103},
{Left:2.7020033228898632,Right1:98},
{Left:2.7064498302820783,Right1:91},
{Left:3.5571045789489006,Right1:85},
{Left:3.1734243658295362,Right1:98},
{Left:3.109579680176093,Right1:97},
{Left:2.6683793012638892,Right1:105},
{Left:2.634083888730652,Right1:82},
{Left:2.961306051762154,Right1:88},
{Left:3.826825133794236,Right1:86},
{Left:2.853989733679941,Right1:85},
{Left:3.604752216335224,Right1:91},
{Left:3.017321333448807,Right1:96},
{Left:3.367162540629901,Right1:104},
{Left:2.975564539556113,Right1:92},
{Left:3.0694197012349687,Right1:100},
{Left:2.939315435814734,Right1:99},
{Left:3.0004050774519397,Right1:95}

]
var DataHWS=[
{Left:155},
{Left:153},
{Left:174},
{Left:177},
{Left:147},
{Left:169},
{Left:160},
{Left:172},
{Left:180},
{Left:141},
{Left:156},
{Left:147},
{Left:149},
{Left:159},
{Left:165},
{Left:156},
{Left:152},
{Left:168},
{Left:149},
{Left:170},
{Left:150},
{Left:169},
{Left:143},
{Left:149},
{Left:176},
{Left:175},
{Left:167},
{Left:151},
{Left:152},
{Left:162},
{Left:165},
{Left:177},
{Left:148},
{Left:152},
{Left:153},
{Left:173},
{Left:169},
{Left:143},
{Left:151},
{Left:161},
{Left:158},
{Left:165},
{Left:178},
{Left:161},
{Left:156},
{Left:158},
{Left:142},
{Left:142},
{Left:147},
{Left:164},
{Left:144},
{Left:148},
{Left:151},
{Left:146},
{Left:160},
{Left:166},
{Left:164},
{Left:158},
{Left:152},
{Left:176}
]
