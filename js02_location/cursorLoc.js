
var SVGx
var SVGy

function startCursorLoc()
{
 
    MySVG.on("mousemove", function()
        {
         SVGx = d3.mouse(this)[0]
        SVGy = d3.mouse(this)[1]


                if(addElemCircleViz==true)trackDrawCircle()
                if(addElemEllipseViz==true)trackDrawEllipse()
                if(addElemRectViz==true)trackDrawRect()
                if(addElemBGImageViz==true)trackDrawBGImage()
                if(DrawTextStarted==true)trackDrawText()
                if(DrawPath==true||DrawPathStart==true)trackDrawPath()
                if(DrawPathEdit==true)trackDrawPathEdit()
                if(addElemSymbolViz==true)trackDrawSymbol()
                if(addElemPilotLightViz==true)trackDrawPilotLight()
                if(addElemStatusStickViz==true)trackDrawStatusStick()
                if(addElemButtonViz==true)trackDrawButton()
                if(addElemCircuitBreakerViz==true)trackDrawCircuitBreaker()
                if(addElemControlViz==true)trackDrawControl()
                if(addElemPIDViz==true)trackDrawPID()
                if(addElemGaugeViz==true)trackDrawGauge()
                if(addElemTrendGaugeViz==true)trackDrawTrendGauge()
                if(addElemBarGaugeViz==true)trackDrawBarGauge()
                if(addElemTankLevelViz==true)trackDrawTankLevel()
                if(addElemSubstationDigitalViz==true)trackDrawSubstationDigital()
                if(addElemVariableFrequencyViz==true)trackDrawVariableFrequency()
                if(addElemProcessVariableChartViz==true)trackDrawProcessVariableChart()
                if(addElemIconViz==true)trackDrawIcon()
                if(addElemImageViz==true)trackDrawImage()
                if(addElemPolygonViz==true)trackDrawPolygon()
                if(addElemComponentViz==true)trackDrawComponent()
                if(addElemDigitalReadoutViz==true)trackDrawDigitalReadout()
                if(addElemAutoManualViz==true)trackDrawAutoManual()
                if(ZoomDrawing==true)trackZoom()
                 
        }
    );

}


