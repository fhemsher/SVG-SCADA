function unicodeTypeSelected()
{
    dingbatTable.style.display = "none"
    geometricTable.style.display = "none"
    arrowTable.style.display = "none"
    mathTable.style.display = "none"
    technicalTable.style.display = "none"
    symbolTable.style.display = "none"
    table = eval(unicodeTypeSelect.options[unicodeTypeSelect.selectedIndex].value+"Table")
    table.style.display = "block"
    drawIconButtonDiv.scrollTop = 0
}

var IconUnicode =[]

var dingbatArray =["2708", "2720", "2721", "2722", "2723", "2724", "2725", "2726", "2727", "2729", "272A", "272B", "272C", "272D", "272E", "272F", "2730", "2731", "2732", "2733", "2734", "2735", "2736", "2737", "2738", "2739", "273A", "273B", "273C", "273D", "273E", "273F", "2740", "2741", "2742", "2743", "2744", "2745", "2746", "2747", "2748", "2749", "274A", "274B", "2756", "2762", "2763", "2764", "2765", "2766", "2767", "2776", "2777", "2778", "2779", "277A", "277B", "277C", "277D", "277E", "277F", "2780", "2781", "2782", "2783", "2784", "2785", "2786", "2787", "2788", "2789", "2798", "2799", "279A", "279B", "279C", "279D", "279E", "279F", "27A0", "27A1", "27A2", "27A3", "27A4", "27A5", "27A6", "27A7", "27A8", "27A9", "27AA", "27AB", "27AC", "27AD", "27AE", "27AF", "27B1", "27B2", "27B3", "27B4", "27B5", "27B6", "27B7", "27B8", "27B9", "27BA", "27BB", "27BC", "27BD", "27BE"]
function buildDingbatButton()
{
    var fontSize = 30
    var strokeFactor = .02
    var strokeWidth = strokeFactor*fontSize

    var svg = d3.select("#sizerSVG")
    for(var k = 0; k<dingbatArray.length; k++)
    {

        var unicode = dingbatArray[k]
        IconUnicode.push(unicode)
        var code = parseInt(unicode, 16)
        var icon = svg.append("text")
        .attr("id", "icon_"+unicode)
        .attr("font-size", fontSize)
        .attr("font-family", "Arial Unicode MS")
        .attr("stroke-width", strokeWidth)
        .attr("fill", "red")
        .attr("stroke", "black")
        .text(String.fromCharCode(code))

        var sizeMe = document.getElementById("icon_"+unicode)
        var bb = sizeMe.getBBox()
        var centerX = bb.x+.5*bb.width
        var centerY = bb.y+.5*bb.height

        icon.attr("centerX", centerX)
        icon.attr("centerY", centerY)

        var row = dingbatTable.insertRow(k)
        var buttonCell = row.insertCell(0)
        buttonCell.style.width = "40px"
        buttonCell.style.height = "40px"
        buttonCell.style.overflow = "hidden"

        buttonCell.innerHTML = '<button onclick=plantThisIcon(event);this.style.borderStyle="inset";this.style.borderColor="violet" style="padding:0px;background:white;border-width:3px;width:40px;height:40px"><svg  width=30 height=30 overflow="hidden" xmlns="http://www.w3.org/2000/svg"  ><text font-size="'+fontSize+'" font-family="Arial Unicode MS" stroke-width="'+strokeWidth+'" fill="#C64DDB" stroke="black" unicode="'+unicode+'" x="'+(-bb.x)+'" y="'+(-bb.y)+'">'+String.fromCharCode(code)+'</text></svg></button>'
    }
}

var geometricArray =["25A0", "25A1", "25A2", "25A3", "25A4", "25A5", "25A6", "25A7", "25A8", "25A9", "25B0", "25B1", "25B2", "25B3", "25B4", "25B5", "25B6", "25B7", "25B8", "25B9", "25BA", "25BB", "25BC", "25BD", "25BE", "25BF", "25C0", "25C1", "25C2", "25C3", "25C4", "25C5", "25C6", "25C7", "25C8", "25C9", "25CA", "25CB", "25CC", "25CD", "25CE", "25CF", "25D0", "25D1", "25D2", "25D3", "25D4", "25D5", "25D6", "25D7", "25D8", "25D9", "25E2", "25E3", "25E4", "25E5", "25E7", "25E8", "25E9", "25EA", "25EB", "25EC", "25ED", "25EE", "25F0", "25F1", "25F2", "25F3", "25F4", "25F5", "25F6", "25F7", "25F8", "25F9", "25FA", "25FB", "25FC", "25FF"]

function buildGeometricButton()
{
    var fontSize = 30
    var strokeFactor = .02
    var strokeWidth = strokeFactor*fontSize

    var svg = d3.select("#sizerSVG")
    for(var k = 0; k<geometricArray.length; k++)
    {

        var unicode = geometricArray[k]
        IconUnicode.push(unicode)
        var code = parseInt(unicode, 16)
        var icon = svg.append("text")
        .attr("id", "icon_"+unicode)
        .attr("font-size", fontSize)
        .attr("font-family", "Arial Unicode MS")
        .attr("stroke-width", strokeWidth)
        .attr("fill", "red")
        .attr("stroke", "black")
        .text(String.fromCharCode(code))

        var sizeMe = document.getElementById("icon_"+unicode)
        var bb = sizeMe.getBBox()
        var centerX = bb.x+.5*bb.width
        var centerY = bb.y+.5*bb.height

        icon.attr("centerX", centerX)
        icon.attr("centerY", centerY)

        var row = geometricTable.insertRow(k)
        var buttonCell = row.insertCell(0)
        buttonCell.style.width = "40px"
        buttonCell.style.height = "40px"
        buttonCell.style.overflow = "hidden"

        buttonCell.innerHTML = '<button onclick=plantThisIcon(event);this.style.borderStyle="inset";this.style.borderColor="violet" style="padding:0px;background:white;border-width:3px;width:40px;height:40px"><svg  width=30 height=30 overflow="hidden" xmlns="http://www.w3.org/2000/svg"  ><text font-size="'+fontSize+'" font-family="Arial Unicode MS" stroke-width="'+strokeWidth+'" fill="#C64DDB" stroke="black" unicode="'+unicode+'" x="'+(-bb.x)+'" y="'+(-bb.y)+'">'+String.fromCharCode(code)+'</text></svg></button>'
    }
}

var arrowArray =["2190", "2191", "2192", "2193", "2194", "2195", "2196", "2197", "2198", "2199", "219A", "219B", "219C", "219D", "219E", "219F", "21A0", "21A1", "21A2", "21A3", "21A4", "21A5", "21A6", "21A7", "21A8", "21A9", "21AA", "21AB", "21AC", "21AD", "21AE", "21AF", "21B0", "21B1", "21B2", "21B3", "21B4", "21B5", "21B6", "21B7", "21B8", "21B9", "21BA", "21BB", "21BC", "21BD", "21BE", "21BF", "21C0", "21C1", "21C2", "21C3", "21C4", "21C5", "21C6", "21C7", "21C8", "21C9", "21CA", "21CB", "21CC", "21CD", "21CE", "21CF", "21D0", "21D1", "21D2", "21D3", "21D4", "21D5", "21D6", "21D7", "21D8", "21D9", "21DA", "21DB", "21DC", "21DD", "21DE", "21DF", "21E0", "21E1", "21E2", "21E3", "21E4", "21E5", "21E6", "21E7", "21E8", "21E9", "21EA", "21EB", "21EC", "21ED", "21EE", "21EF", "21F0", "21F1", "21F2", "21F3", "21F4", "21F5", "21F6", "21F7", "21F8", "21F9", "21FA", "21FB", "21FC", "21FD", "21FE", "21FF",
    , "27F0", "27F1", "27F2", "27F3", "27F4", "27F5", "27F6", "27F7", "27F8", "27F9", "27FA", "27FB", "27FC", "27FD", "27FE", "27FF", "2900", "2901", "2902", "2903", "2904", "2905", "2906", "2907", "2908", "2909", "290A", "290B", "290C", "290D", "290E", "290F", "2910", "2911", "2912", "2913", "2914", "2915", "2916", "2917", "2918", "2919", "291A", "291B", "291C", "291D", "291E", "291F", "2920", "2921", "2922", "2923", "2924", "2925", "2926", "2927", "2928", "29", "29", "292A", "292B", "292C", "292D", "292E", "292F", "2930", "2931", "2932", "2933", "2934", "2935", "2936", "2937", "2938", "2939", "293A", "293B", "293C", "293D", "293E", "293F", "2940", "2941", "2942", "2943", "2944", "2945", "2946", "2947", "2948", "2949", "294A", "294B", "294C", "294D", "294E", "294F", "2950", "2951", "2952", "2953", "2954", "2955", "2956", "2957", "2958", "2959", "295A", "295B", "295C", "295D", "295E", "295F", "2960", "2961", "2962", "2963", "2964", "2965", "2966", "2967", "2968", "2969", "296A", "296B", "296C", "296D", "296E", "296F", "2970", "2971", "2972", "2973", "2974", "2975", "2976", "2977", "2978", "2979", "297A", "297B", "297C", "297D", "297E", "297F"
]
function buildArrowButton()
{
    var fontSize = 30
    var strokeFactor = .02
    var strokeWidth = strokeFactor*fontSize

    var svg = d3.select("#sizerSVG")
    for(var k = 0; k<arrowArray.length; k++)
    {

        var unicode = arrowArray[k]
        IconUnicode.push(unicode)
        var code = parseInt(unicode, 16)
        var icon = svg.append("text")
        .attr("id", "icon_"+unicode)
        .attr("font-size", fontSize)
        .attr("font-family", "Arial Unicode MS")
        .attr("stroke-width", strokeWidth)
        .attr("fill", "red")
        .attr("stroke", "black")
        .text(String.fromCharCode(code))

        var sizeMe = document.getElementById("icon_"+unicode)
        var bb = sizeMe.getBBox()
        var centerX = bb.x+.5*bb.width
        var centerY = bb.y+.5*bb.height

        icon.attr("centerX", centerX)
        icon.attr("centerY", centerY)

        var row = arrowTable.insertRow(k)
        var buttonCell = row.insertCell(0)
        buttonCell.style.width = "40px"
        buttonCell.style.height = "40px"
        buttonCell.style.overflow = "hidden"

        buttonCell.innerHTML = '<button onclick=plantThisIcon(event);this.style.borderStyle="inset";this.style.borderColor="violet" style="padding:0px;background:white;border-width:3px;width:40px;height:40px"><svg  width=30 height=30 overflow="hidden" xmlns="http://www.w3.org/2000/svg"  ><text font-size="'+fontSize+'" font-family="Arial Unicode MS" stroke-width="'+strokeWidth+'" fill="#C64DDB" stroke="black" unicode="'+unicode+'" x="'+(-bb.x)+'" y="'+(-bb.y)+'">'+String.fromCharCode(code)+'</text></svg></button>'
    }
}

var mathArray =["2200", "2201", "2202", "2203", "2204", "2205", "2206", "2207", "2208", "2209", "220A", "220B", "220C", "220D", "220E", "220F", "2210", "2211", "2212", "2213", "2214", "2215", "2216", "2217", "2218", "2219", "221A", "221B", "221C", "221D", "221E", "221F", "2220", "2221", "2222", "2223", "2224", "2225", "2226", "2227", "2228", "2229", "222A", "222B", "222C", "222D", "222E", "222F", "2230", "2231", "2232", "2233", "2234", "2235", "2236", "2237", "2238", "2239", "223A", "223B", "223C", "223D", "223E", "223F", "2240", "2241", "2242", "2243", "2244", "2245", "2246", "2247", "2248", "2249", "224A", "224B", "224C", "224D", "224E", "224F", "2250", "2251", "2252", "2253", "2254", "2255", "2256", "2257", "2258", "2259", "225A", "225B", "225C", "225D", "225E", "225F", "2260", "2261", "2262", "2263", "2264", "2265", "2266", "2267", "2268", "2269", "226A", "226B", "226C", "226D", "226E", "226F", "2270", "2271", "2272", "2273", "2274", "2275", "2276", "2277", "2278", "2279", "227A", "227B", "227C", "227D", "227E", "227F", "2280", "2281", "2282", "2283", "2284", "2285", "2286", "2287", "2288", "2289", "228A", "228B", "228C", "228D", "228E", "228F", "2290", "2291", "2292", "2293", "2294", "2295", "2296", "2297", "2298", "2299", "229A", "229B", "229C", "229D", "229E", "229F", "22A0", "22A1", "22A2", "22A3", "22A4", "22A5", "22A6", "22A7", "22A8", "22A9", "22AA", "22AB", "22AC", "22AD", "22AE", "22AF", "22B0", "22B1", "22B2", "22B3", "22B4", "22B5", "22B6", "22B7", "22B8", "22B9", "22BA", "22BB", "22BC", "22BD", "22BE", "22BF", "22C0", "22C1", "22C2", "22C3", "22C4", "22C5", "22C6", "22C7", "22C8", "22C9", "22CA", "22CB", "22CC", "22CD", "22CE", "22CF", "22D0", "22D1", "22D2", "22D3", "22D4", "22D5", "22D6", "22D7", "22D8", "22D9", "22DA", "22DB", "22DC", "22DD", "22DE", "22DF", "22E0", "22E1", "22E2", "22E3", "22E4", "22E5", "22E6", "22E7", "22E8", "22E9", "22EA", "22EB", "22EC", "22ED", "22EE", "22EF", "22F0", "22F1", "22F2", "22F3", "22F4", "22F5", "22F6", "22F7", "22F8", "22F9", "22FA", "22FB", "22FC", "22FD", "22FE", "22FF"
    , "27C0", "27C1", "27C2", "27C3", "27C4", "27C5", "27C6", "27C7", "27C8", "27C9", "27CA", "27CB", "27CC", "27CD", "27CE", "27CF", "27D0", "27D1", "27D2", "27D3", "27D4", "27D5", "27D6", "27D7", "27D8", "27D9", "27DA", "27DB", "27DC", "27DD", "27DE", "27DF", "27E0", "27E1", "27E2", "27E3", "27E4", "27E5", "27E6", "27E7", "27E8", "27E9", "27EA", "27EB", "27EC", "27ED", "27EE", "27EF", "2980", "2981", "2982", "2983", "2984", "2985", "2986", "2987", "2988", "2989", "298A", "298B", "298C", "298D", "298E", "298F", "2990", "2991", "2992", "2993", "2994", "2995", "2996", "2997", "2998", "2999", "299A", "299B", "299C", "299D", "299E", "299F", "29A0", "29A1", "29A2", "29A3", "29A4", "29A5", "29A6", "29A7", "29A8", "29A9", "29AA", "29AB", "29AC", "29AD", "29AE", "29AF", "29B0", "29B1", "29B2", "29B3", "29B4", "29B5", "29B6", "29B7", "29B8", "29B9", "29BA", "29BB", "29BC", "29BD", "29BE", "29BF", "29C0", "29C1", "29C2", "29C3", "29C4", "29C5", "29C6", "29C7", "29C8", "29C9", "29CA", "29CB", "29CC", "29CD", "29CE", "29CF", "29D0", "29D1", "29D2", "29D3", "29D4", "29D5", "29D6", "29D7", "29D8", "29D9", "29DA", "29DB", "29DC", "29DD", "29DE", "29DF", "29E0", "29E1", "29E2", "29E3", "29E4", "29E5", "29E6", "29E7", "29E8", "29E9", "29EA", "29EB", "29EC", "29ED", "29EE", "29EF", "29F0", "29F1", "29F2", "29F3", "29F4", "29F5", "29F6", "29F7", "29F8", "29F9", "29FA", "29FB", "29FC", "29FD", "29FE", "29FF", "2A00", "2A01", "2A02", "2A03", "2A04", "2A05", "2A06", "2A07", "2A08", "2A09", "2A0A", "2A0B", "2A0C", "2A0D", "2A0E", "2A0F", "2A10", "2A11", "2A12", "2A13", "2A14", "2A15", "2A16", "2A17", "2A18", "2A19", "2A1A", "2A1B", "2A1C", "2A1D", "2A1E", "2A1F", "2A20", "2A21", "2A22", "2A23", "2A24", "2A25", "2A26", "2A27", "2A28", "2A29", "2A", "2A", "2A2B", "2A2C", "2A2D", "2A2E", "2A2F", "2A30", "2A31", "2A32", "2A33", "2A34", "2A35", "2A36", "2A37", "2A38", "2A39", "2A3A", "2A3B", "2A3C", "2A3D", "2A3E", "2A3F", "2A40", "2A41", "2A42", "2A43", "2A44", "2A45", "2A46", "2A47", "2A48", "2A49", "2A4A", "2A4B", "2A4C", "2A4D", "2A4E", "2A4F", "2A50", "2A51", "2A52", "2A53", "2A54", "2A55", "2A56", "2A57", "2A58", "2A59", "2A5A", "2A5B", "2A5C", "2A5D", "2A5E", "2A5F", "2A60", "2A61", "2A62", "2A63", "2A64", "2A65", "2A66", "2A67", "2A68", "2A69", "2A6A", "2A6B", "2A6C", "2A6D", "2A6E", "2A6F", "2A70", "2A71", "2A72", "2A73", "2A74", "2A75", "2A76", "2A77", "2A78", "2A79", "2A7A", "2A7B", "2A7C", "2A7D", "2A7E", "2A7F", "2A80", "2A81", "2A82", "2A83", "2A84", "2A85", "2A86", "2A87", "2A88", "2A89", "2A8A", "2A8B", "2A8C", "2A8D", "2A8E", "2A8F", "2A90", "2A91", "2A92", "2A93", "2A94", "2A95", "2A96", "2A97", "2A98", "2A99", "2A9A", "2A9B", "2A9C", "2A9D", "2A9E", "2A9F", "2AA0", "2AA1", "2AA2", "2AA3", "2AA4", "2AA5", "2AA6", "2AA7", "2AA8", "2AA9", "2AAA", "2AAB", "2AAC", "2AAD", "2AAE", "2AAF", "2AB0", "2AB1", "2AB2", "2AB3", "2AB4", "2AB5", "2AB6", "2AB7", "2AB8", "2AB9", "2ABA", "2ABB", "2ABC", "2ABD", "2ABE", "2ABF", "2AC0", "2AC1", "2AC2", "2AC3", "2AC4", "2AC5", "2AC6", "2AC7", "2AC8", "2AC9", "2ACA", "2ACB", "2ACC", "2ACD", "2ACE", "2ACF", "2AD0", "2AD1", "2AD2", "2AD3", "2AD4", "2AD5", "2AD6", "2AD7", "2AD8", "2AD9", "2ADA", "2ADB", "2ADC", "2ADD", "2ADE", "2ADF", "2AE0", "2AE1", "2AE2", "2AE3", "2AE4", "2AE5", "2AE6", "2AE7", "2AE8", "2AE9", "2AEA", "2AEB", "2AEC", "2AED", "2AEE", "2AEF", "2AF0", "2AF1", "2AF2", "2AF3", "2AF4", "2AF5", "2AF6", "2AF7", "2AF8", "2AF9", "2AFA", "2AFB", "2AFC", "2AFD", "2AFE", "2AFF"
]
function buildMathButton()
{
    var fontSize = 30
    var strokeFactor = .02
    var strokeWidth = strokeFactor*fontSize

    var svg = d3.select("#sizerSVG")
    for(var k = 0; k<mathArray.length; k++)
    {

        var unicode = mathArray[k]
        IconUnicode.push(unicode)
        var code = parseInt(unicode, 16)
        var icon = svg.append("text")
        .attr("id", "icon_"+unicode)
        .attr("font-size", fontSize)
        .attr("font-family", "Arial Unicode MS")
        .attr("stroke-width", strokeWidth)
        .attr("fill", "red")
        .attr("stroke", "black")
        .text(String.fromCharCode(code))

        var sizeMe = document.getElementById("icon_"+unicode)
        var bb = sizeMe.getBBox()
        var centerX = bb.x+.5*bb.width
        var centerY = bb.y+.5*bb.height

        icon.attr("centerX", centerX)
        icon.attr("centerY", centerY)

        var row = mathTable.insertRow(k)
        var buttonCell = row.insertCell(0)
        buttonCell.style.width = "40px"
        buttonCell.style.height = "40px"
        buttonCell.style.overflow = "hidden"

        buttonCell.innerHTML = '<button onclick=plantThisIcon(event);this.style.borderStyle="inset";this.style.borderColor="violet" style="padding:0px;background:white;border-width:3px;width:40px;height:40px"><svg  width=30 height=30 overflow="hidden" xmlns="http://www.w3.org/2000/svg"  ><text font-size="'+fontSize+'" font-family="Arial Unicode MS" stroke-width="'+strokeWidth+'" fill="#C64DDB" stroke="black" unicode="'+unicode+'" x="'+(-bb.x)+'" y="'+(-bb.y)+'">'+String.fromCharCode(code)+'</text></svg></button>'
    }
}

var technicalArray =["2300", "2301", "2302", "2303", "2305", "2306", "2307", "2312", "2313", "2314", "2315", "2316", "2317", "2318", "2324", "2325", "2326", "2327", "2328", "2329", "232A", "232B", "232C", "232D", "232E", "232F", "2330", "2331", "2332", "2333", "2334", "2335", "2336", "2337", "2338", "2339", "233A", "233B", "233C", "233D", "233E", "233F", "2340", "2341", "2342", "2343", "2344", "2345", "2346", "2347", "2348", "2349", "234A", "234B", "234C", "234D", "234E", "234F", "2350", "2351", "2352", "2353", "2354", "2355", "2356", "2357", "2358", "2359", "235A", "235B", "235C", "235D", "235E", "235F", "2360", "2361", "2362", "2363", "2364", "2365", "2366", "2367", "2368", "2369", "236A", "236B", "236C", "236D", "236E", "236F", "2370", "2371", "2372", "2373", "2374", "2375", "2376", "2377", "2378", "2379", "237A", "237B", "237C", "237D", "237E", "237F", "2380", "2381", "2382", "2383", "2384", "2385", "2386", "2387", "2388", "2389", "238A", "238B", "238C", "238D", "238E", "238F", "2390", "2391", "2392", "2393", "2394", "2395", "2396", "2397", "2398", "2399", "239A", "23B2", "23B3", "23B6", "23B7", "23C0", "23C1", "23C2", "23C3", "23C4", "23C5", "23C6", "23C7", "23C8", "23C9", "23CA", "23CB", "23CC", "23CD", "23CE", "23CF", "23D0", "23D1", "23D2", "23D3", "23D4", "23D5", "23D6", "23D7", "23D8", "23D9", "23DA", "23DB", "23E2", "23E3", "23E7", "23E8", "23E9", "23EA", "23EB", "23EC", "23ED", "23EE", "23EF", "23F1", "23F2", "23F4", "23F5", "23F6", "23F7", "23F8", "23F9", "23FA"]

function buildTechnicalButton()
{
    var fontSize = 30
    var strokeFactor = .02
    var strokeWidth = strokeFactor*fontSize

    var svg = d3.select("#sizerSVG")
    for(var k = 0; k<technicalArray.length; k++)
    {

        var unicode = technicalArray[k]
        IconUnicode.push(unicode)
        var code = parseInt(unicode, 16)
        var icon = svg.append("text")
        .attr("id", "icon_"+unicode)
        .attr("font-size", fontSize)
        .attr("font-family", "Arial Unicode MS")
        .attr("stroke-width", strokeWidth)
        .attr("fill", "red")
        .attr("stroke", "black")
        .text(String.fromCharCode(code))

        var sizeMe = document.getElementById("icon_"+unicode)
        var bb = sizeMe.getBBox()
        var centerX = bb.x+.5*bb.width
        var centerY = bb.y+.5*bb.height

        icon.attr("centerX", centerX)
        icon.attr("centerY", centerY)

        var row = technicalTable.insertRow(k)
        var buttonCell = row.insertCell(0)
        buttonCell.style.width = "40px"
        buttonCell.style.height = "40px"
        buttonCell.style.overflow = "hidden"

        buttonCell.innerHTML = '<button onclick=plantThisIcon(event);this.style.borderStyle="inset";this.style.borderColor="violet" style="padding:0px;background:white;border-width:3px;width:40px;height:40px"><svg  width=30 height=30 overflow="hidden" xmlns="http://www.w3.org/2000/svg"  ><text font-size="'+fontSize+'" font-family="Arial Unicode MS" stroke-width="'+strokeWidth+'" fill="#C64DDB" stroke="black" unicode="'+unicode+'" x="'+(-bb.x)+'" y="'+(-bb.y)+'">'+String.fromCharCode(code)+'</text></svg></button>'
    }
}

var symbolArray =["2600", "2601", "2602", "2603", "2604", "2605", "2606", "2607", "2608", "2609", "260A", "260B", "260C", "260D", "2611", "2612", "2613", "2616", "2617", "2618", "2619", "2620", "2623", "2624", "2625", "2626", "2627", "2628", "2629", "262A", "262B", "262C", "262D", "262E", "262F", "2630", "2631", "2632", "2633", "2634", "2635", "2636", "2637", "2638", "2639", "263A", "263B", "263C", "263D", "263E", "263F", "2640", "2641", "2642", "2643", "2644", "2645", "2646", "2647", "2648", "2649", "264A", "264B", "264C", "264D", "264E", "264F", "2650", "2651", "2652", "2653", "2654", "2655", "2656", "2657", "2658", "2659", "265A", "265B", "265C", "265D", "265E", "265F", "2660", "2661", "2662", "2663", "2664", "2665", "2666", "2667", "2668", "2669", "266A", "266B", "266C", "266D", "266E", "266F", "2670", "2671", "2672", "2673", "2674", "2675", "2676", "2677", "2678", "2679", "267A", "267B", "267C", "267D", "267E", "267F", "2680", "2681", "2682", "2683", "2684", "2685", "2686", "2687", "2688", "2689", "268A", "268B", "268C", "268D", "268E", "268F", "2690", "2691", "2692", "2694", "2695", "2696", "2697", "2698", "2699", "269A", "269B", "269C", "269D", "269E", "269F", "26A0", "26A2", "26A3", "26A4", "26A5", "26A6", "26A7", "26A8", "26A9", "26AD", "26AE", "26AF", "26B0", "26B1", "26B2", "26B3", "26B4", "26B5", "26B6", "26B7", "26B8", "26B9", "26BA", "26BB", "26BC", "26BF", "26C7", "26C8", "26C9", "26CA", "26CB", "26CC", "26CD", "26CF", "26D0", "26D1", "26D2", "26D3", "26D5", "26D6", "26D7", "26D8", "26D9", "26DA", "26DB", "26DC", "26DD", "26DE", "26DF", "26E0", "26E1", "26E2", "26E3", "26E4", "26E5", "26E6", "26E7", "26E8", "26E9", "26EB", "26EC", "26ED", "26EE", "26EF", "26F0", "26F4", "26F6", "26FB", "26FC", "26FF", "2B00", "2B01", "2B02", "2B03", "2B04", "2B05", "2B06", "2B07", "2B08", "2B09", "2B0A", "2B0B", "2B0C", "2B0D", "2B0E", "2B0F", "2B10", "2B11", "2B14", "2B15", "2B16", "2B17", "2B18", "2B19", "2B1A", "2B1F", "2B20", "2B21", "2B22", "2B23", "2B24", "2B25", "2B26", "2B27", "2B28", "2B29", "2B2A", "2B", "2B", "2B2C", "2B2D", "2B2E", "2B2F", "2B30", "2B31", "2B32", "2B33", "2B34", "2B35", "2B36", "2B37", "2B38", "2B39", "2B3A", "2B3B", "2B3C", "2B3D", "2B3E", "2B3F", "2B40", "2B41", "2B42", "2B43", "2B44", "2B45", "2B46", "2B47", "2B48", "2B49", "2B4A", "2B4B", "2B4C", "2B4D", "2B4E", "2B4F", "2B51", "2B52", "2B53", "2B54", "2B56", "2B57", "2B58", "2B59", "2B5A", "2B5B", "2B5C", "2B5D", "2B5E", "2B5F", "2B60", "2B61", "2B62", "2B63", "2B64", "2B65", "2B66", "2B67", "2B68", "2B69", "2B6A", "2B6B", "2B6C", "2B6D", "2B6E", "2B6F", "2B70", "2B71", "2B72", "2B73", "2B76", "2B77", "2B78", "2B79", "2B7A", "2B7B", "2B7C", "2B7D", "2B7E", "2B7F", "2B80", "2B81", "2B82", "2B83", "2B84", "2B85", "2B86", "2B87", "2B88", "2B89", "2B8A", "2B8B", "2B8C", "2B8D", "2B8E", "2B8F", "2B90", "2B91", "2B92", "2B93", "2B94", "2B95", "2B98", "2B99", "2B9A", "2B9B", "2B9C", "2B9D", "2B9E", "2B9F", "2BA0", "2BA1", "2BA2", "2BA3", "2BA4", "2BA5", "2BA6", "2BA7", "2BA8", "2BA9", "2BAA", "2BAB", "2BAC", "2BAD", "2BAE", "2BAF", "2BB0", "2BB1", "2BB2", "2BB3", "2BB4", "2BB5", "2BB6", "2BB7", "2BB8", "2BBD", "2BBE", "2BBF", "2BC0", "2BC1", "2BC2", "2BC3", "2BC4", "2BC5", "2BC6", "2BC7", "2BC8", "2BCA", "2BCB", "2BCC", "2BCD", "2BCE", "2BCF", "2BD0"]
function buildSymbolButton()
{
    var fontSize = 30
    var strokeFactor = .02
    var strokeWidth = strokeFactor*fontSize

    var svg = d3.select("#sizerSVG")
    for(var k = 0; k<symbolArray.length; k++)
    {

        var unicode = symbolArray[k]
        IconUnicode.push(unicode)
        var code = parseInt(unicode, 16)
        var icon = svg.append("text")
        .attr("id", "icon_"+unicode)
        .attr("font-size", fontSize)
        .attr("font-family", "Arial Unicode MS")
        .attr("stroke-width", strokeWidth)
        .attr("fill", "red")
        .attr("stroke", "black")
        .text(String.fromCharCode(code))

        var sizeMe = document.getElementById("icon_"+unicode)
        var bb = sizeMe.getBBox()
        var centerX = bb.x+.5*bb.width
        var centerY = bb.y+.5*bb.height

        icon.attr("centerX", centerX)
        icon.attr("centerY", centerY)

        var row = symbolTable.insertRow(k)
        var buttonCell = row.insertCell(0)
        buttonCell.style.width = "40px"
        buttonCell.style.height = "40px"
        buttonCell.style.overflow = "hidden"

        buttonCell.innerHTML = '<button onclick=plantThisIcon(event);this.style.borderStyle="inset";this.style.borderColor="violet" style="padding:0px;background:white;border-width:3px;width:40px;height:40px"><svg  width=30 height=30 overflow="hidden" xmlns="http://www.w3.org/2000/svg"  ><text font-size="'+fontSize+'" font-family="Arial Unicode MS" stroke-width="'+strokeWidth+'" fill="#C64DDB" stroke="black" unicode="'+unicode+'" x="'+(-bb.x)+'" y="'+(-bb.y)+'">'+String.fromCharCode(code)+'</text></svg></button>'
    }
}
