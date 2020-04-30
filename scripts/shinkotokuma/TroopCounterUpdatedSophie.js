javascript:

/* troopcounter by Sophie "Shinko to Kuma" - UI needs update still*/

if (window.location.href.indexOf('overview_villages&mode=units&type=complete&group=0&page=-1&type=complete') < 0) {
    //relocate
    window.location.assign(game_data.link_base_pure + "overview_villages&mode=units&type=complete&group=0&page=-1&type=complete");
}
else {

    //declare variables (and find all rows with 'total' counts)
    var arrayWithTotal = $("td:contains('total')");
    var arrayWithOwn = $("td:contains('your own')");
    var arrayWithOutwards = $("td:contains('outwards')");
    var arrayInTransit = $("td:contains('in transit')");

    var colors = [
        "#FF0000", "#000000", "#FFFF00", "#808000", "#00FF00", "#008000", "#00FFFF", "#008080", "#0000FF", "#FF00FF", "#800080", "#FFFFFF", "#808080"
    ];
    var unitName = game_data.units;
    var troopCountTotal = [];
    var selfSupport = [];
    var currentVillage = [];
    var offensiveVillages = 0;
    var defensiveVillages = 0;
    var fullNuke = 0;
    var almostNuke = 0;
    var semiNuke = 0;
    var quarterNuke = 0;
    var fullDV = 0;
    var almostDV = 0;
    var semiDV = 0;
    var quarterDV = 0;
    currentVillage = [];
    //initialize array current Village
    for (var i = 0; i < unitName.length; i++) {
        currentVillage.push({
            name: unitName[i],
            number: parseInt(0)
        });
    }

    //look what units are on this world (fe no paladin, archer world, etc etc) and place them in an array
    for (var i = 0; i < unitName.length; i++) {
        troopCountTotal.push(0);
    }

    for (i = 4; i < arrayWithTotal.length; i++) {

        //add each cell to corresponding unit
        for (j = 0; j < unitName.length; j++) {
            currentVillage[j].number = 0;
            currentVillage[j].number += parseInt(arrayWithOwn[i].parentElement.children[j + 2].innerText);
            currentVillage[j].number += parseInt(arrayWithOutwards[i].parentElement.children[j + 1].innerText);
            currentVillage[j].number += parseInt(arrayInTransit[i].parentElement.children[j + 1].innerText);
            troopCountTotal[j] += parseInt(arrayWithTotal[i].parentElement.children[j + 1].innerText);;
        }
        //after getting data from village, check type of village
        currentVillagePopOff = 0;
        for (var k = 0; k < unitName.length; k++) {

            if (currentVillage[k].name == 'axe') {
                currentVillagePopOff += parseInt(currentVillage[k].number);
            }
            if (currentVillage[k].name == 'spy') {
                currentVillagePopOff += parseInt(currentVillage[k].number * 2);
            }
            if (currentVillage[k].name == 'light') {
                currentVillagePopOff += parseInt(currentVillage[k].number * 4);
            }
            if (currentVillage[k].name == 'ram') {
                currentVillagePopOff += parseInt(currentVillage[k].number * 5);
            }
            if (currentVillage[k].name == 'catapult') {
                currentVillagePopOff += parseInt(currentVillage[k].number * 8);
            }
            if (currentVillage[k].name == 'snob') {
                currentVillagePopOff += parseInt(currentVillage[k].number * 100);
            }
            if (currentVillage[k].name == 'knight') {
                currentVillagePopOff += parseInt(currentVillage[k].number);
            }
            if (currentVillage[k].name == 'marcher') {
                currentVillagePopOff += parseInt(currentVillage[k].number * 5);
            }
        }

        currentVillagePopDef = 0;
        for (var l = 0; l < unitName.length; l++) {
            if (currentVillage[l].name == 'spear') {
                currentVillagePopDef += parseInt(currentVillage[l].number);
            }
            if (currentVillage[l].name == 'sword') {
                currentVillagePopDef += parseInt(currentVillage[l].number);
            }
            if (currentVillage[l].name == 'archer') {
                currentVillagePopDef += parseInt(currentVillage[l].number);
            }
            if (currentVillage[l].name == 'spy') {
                currentVillagePopDef += parseInt(currentVillage[l].number * 2);
            }
            if (currentVillage[l].name == 'heavy') {
                currentVillagePopDef += parseInt(currentVillage[l].number * 6);
            }
            if (currentVillage[l].name == 'snob') {
                currentVillagePopDef += parseInt(currentVillage[l].number * 100);
            }
            if (currentVillage[l].name == 'knight') {
                currentVillagePopDef += parseInt(currentVillage[l].number);
            }
            if (currentVillage[l].name == 'catapult') {
                currentVillagePopDef += parseInt(currentVillage[l].number * 8);
            }
        }


        //add here what type village it is to category
        // Off
        if (currentVillagePopOff >= 20000) fullNuke += 1;
        if (currentVillagePopOff < 20000 && currentVillagePopOff >= 15000) almostNuke += 1;
        if (currentVillagePopOff < 15000 && currentVillagePopOff >= 10000) semiNuke += 1;
        if (currentVillagePopOff < 10000 && currentVillagePopOff >= 5000) quarterNuke += 1;

        // Def
        if (currentVillagePopDef >= 20000) fullDV += 1;
        if (currentVillagePopDef < 20000 && currentVillagePopDef >= 15000) almostDV += 1;
        if (currentVillagePopDef < 15000 && currentVillagePopDef >= 10000) semiDV += 1;
        if (currentVillagePopOff < 10000 && currentVillagePopOff >= 5000) quarterDV += 1;

    }

    //find selfsupport
    $.get('/game.php?&screen=overview_villages&mode=units&type=away_detail&group=0&page=-1&type=away_detail', function (test) {

        $test = $(test)
        checkboxes = $test.find('.village_checkbox')
        for (i = 0; i < checkboxes.length; i++) {
            //checking if support is at another player
            supportedPlayer = checkboxes[i].nextElementSibling.nextElementSibling;
            if (supportedPlayer) {
                //outside support
            }
            else {
                //selfsupport, get each troopnumber
                for (j = 0; j < unitName.length - 1; j++) {
                    troopCountTotal[j] -= parseInt(checkboxes[i].parentElement.parentElement.parentElement.children[j + 1].innerHTML);
                    //console.log(`Found ${checkboxes[i].parentElement.parentElement.parentElement.children[j + 1].innerHTML} ${unitName[j]}total.`);
                }
            }
        }
        Dialog.show("trooptable", troopHtml);
        for (i = 0; i < troopCountTotal.length; i++) {
            $("#troopCountTotalTable").eq(0).append(`<th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="${unitName[i]}"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_${unitName[i]}.png" title="${unitName[i]}" alt="" class=""></a></th>`);
            $("#troopcounts").eq(0).append(`<td>${numberWithCommas(troopCountTotal[i])}</td>`);
        }
    });

    var troopHtml = `<div id="Troopcounter" style="width: 800px">
                        <table class="vis overview_table" style="width:100%; margin: 0 auto; ">
                            <tr id="troopCountTotalTable">
                            </tr>
                            <tr id="troopcounts">
                            </tr>
                        </table>
                        <table class="vis overview_table" style="width:100%; margin: 0 auto;">
                        <tr>
                            <th>Full nuke</th>
                            <th>3/4 nuke</th>
                            <th>1/2 nuke</th>
                            <th>1/4 nuke</th>
                            <th></th>
                            <th>Full DV</th>
                            <th>3/4 DV</th>
                            <th>1/2 DV</th>
                            <th>1/4 DV</th>
                        </tr>
                        <tr>
                            <td>${numberWithCommas(fullNuke)}</td>
                            <td>${numberWithCommas(almostNuke)}</td>
                            <td>${numberWithCommas(semiNuke)}</td>
                            <td>${numberWithCommas(quarterNuke)}</td>
                            <td></td>
                            <td>${numberWithCommas(fullDV)}</td>
                            <td>${numberWithCommas(almostDV)}</td>
                            <td>${numberWithCommas(semiDV)}</td>
                            <td>${numberWithCommas(quarterDV)}</td>
                        </tr>
                        </table>
                        <div id="piecharts">
                            <table border="1" borderColor="#c1a264" align="center" style="background-color:#d2c09e" >
                            <tr>
                                <td id="troops" ></td>
                                <td id="villages" align="right"></td>
                            </tr>
                            <tr id="legend">
                                <td><table id="legendTroops"></table></td>
                                <td><table id="legendVillages" align="right"></table></td>
                            </tr>
                            </table>
                        </div>
                    </div>`;

    function numberWithCommas(x) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1.$2");
        return x;
    }
    var dataPoints = [];
    var villageDistribution = [];
    var totalVillagesCounted = fullNuke + almostNuke + semiNuke + fullDV + almostDV + semiDV;
    var totalUnits = 0;
    for (var i = 0; i < unitName.length; i++) {
        totalUnits += troopCountTotal[i];
    }
    for (var i = 0; i < unitName.length; i++) {

        dataPoints.push({ percentage: troopCountTotal[i] / totalUnits, label: unitName[i] })
    }

    villageDistribution = [{
        percentage: fullNuke / totalVillagesCounted, label: "Full nuke"
    },
    {
        percentage: almostNuke / totalVillagesCounted, label: "3/4 Nuke"
    },
    {
        percentage: semiNuke / totalVillagesCounted, label: "1/2 Nuke"
    },
    {
        percentage: fullDV / totalVillagesCounted, label: "Full DV"
    },
    {
        percentage: almostDV / totalVillagesCounted, label: "3/4 DV"
    },
    {
        percentage: semiDV / totalVillagesCounted, label: "1/2 DV"
    }]

    // expiremental piechart region

    var data = {
        size: 380,
        sectors: dataPoints
    }

    var villages = {
        size: 380,
        sectors: villageDistribution
    }

    function calculateSectors(data) {
        var sectors = [];

        var l = data.size / 2
        var a = 0 // Angle
        var aRad = 0 // Angle in Rad
        var z = 0 // Size z
        var x = 0 // Side x
        var y = 0 // Side y
        var X = 0 // SVG X coordinate
        var Y = 0 // SVG Y coordinate
        var R = 0 // Rotation


        data.sectors.map(function (item, key) {
            a = 360 * item.percentage;
            aCalc = (a > 180) ? 360 - a : a;
            aRad = aCalc * Math.PI / 180;
            z = Math.sqrt(2 * l * l - (2 * l * l * Math.cos(aRad)));
            if (aCalc <= 90) {
                x = l * Math.sin(aRad);
            }
            else {
                x = l * Math.sin((180 - aCalc) * Math.PI / 180);
            }

            y = Math.sqrt(z * z - x * x);
            Y = y;

            if (a <= 180) {
                X = l + x;
                arcSweep = 0;
            }
            else {
                X = l - x;
                arcSweep = 1;
            }

            sectors.push({
                percentage: item.percentage,
                label: item.label,
                color: colors[key],
                arcSweep: arcSweep,
                L: l,
                X: X,
                Y: Y,
                R: R
            });

            R = R + a;
        })


        return sectors
    }

    sectors = calculateSectors(data);
    var newSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newSVG.setAttributeNS(null, 'style', "width: " + data.size + "px; height: " + data.size + "px");
    document.getElementsByTagName("body")[0].appendChild(newSVG)


    sectors.map(function (sector) {

        var newSector = document.createElementNS("http://www.w3.org/2000/svg", "path");
        newSector.setAttributeNS(null, 'fill', sector.color);
        newSector.setAttributeNS(null, 'd', 'M' + sector.L + ',' + sector.L + ' L' + sector.L + ',0 A' + sector.L + ',' + sector.L + ' 0 ' + sector.arcSweep + ',1 ' + sector.X + ', ' + sector.Y + ' z');
        newSector.setAttributeNS(null, 'transform', 'rotate(' + sector.R + ', ' + sector.L + ', ' + sector.L + ')');

        newSVG.appendChild(newSector);
    })

    var midCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    midCircle.setAttributeNS(null, 'cx', data.size * 0.5);
    midCircle.setAttributeNS(null, 'cy', data.size * 0.5);
    midCircle.setAttributeNS(null, 'r', data.size * 0.28);
    midCircle.setAttributeNS(null, 'fill', '#d2c09e');

    newSVG.appendChild(midCircle);


    //village distribution chart

    villageSectors = calculateSectors(villages);
    var villageChart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    villageChart.setAttributeNS(null, 'style', "width: " + data.size + "px; height: " + data.size + "px");
    document.getElementsByTagName("body")[0].appendChild(villageChart)


    villageSectors.map(function (villageSector) {

        var VillagenewSector = document.createElementNS("http://www.w3.org/2000/svg", "path");
        VillagenewSector.setAttributeNS(null, 'fill', villageSector.color);
        VillagenewSector.setAttributeNS(null, 'd', 'M' + villageSector.L + ',' + villageSector.L + ' L' + villageSector.L + ',0 A' + villageSector.L + ',' + villageSector.L + ' 0 ' + villageSector.arcSweep + ',1 ' + villageSector.X + ', ' + villageSector.Y + ' z');
        VillagenewSector.setAttributeNS(null, 'transform', 'rotate(' + villageSector.R + ', ' + villageSector.L + ', ' + villageSector.L + ')');

        villageChart.appendChild(VillagenewSector);
    })

    var villagemidCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    villagemidCircle.setAttributeNS(null, 'cx', data.size * 0.5);
    villagemidCircle.setAttributeNS(null, 'cy', data.size * 0.5);
    villagemidCircle.setAttributeNS(null, 'r', data.size * 0.28);
    villagemidCircle.setAttributeNS(null, 'fill', '#d2c09e');

    villageChart.appendChild(villagemidCircle);
    

    setTimeout(function () {
        $("#troops").eq(0).append(newSVG);
        $("#villages").eq(0).append(villageChart);
        for (var i = 0; i < unitName.length; i++) {
            //make legend
            $("#legendTroops").eq(0).append(`<tr><td style="background-color:${colors[i]}"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_${unitName[i]}.png" title="${unitName[i]}" alt="" class=""></td><td>${unitName[i]}</td><td>${Math.round(troopCountTotal[i]/totalUnits*100)}  %</td></tr>`);
        }
        
        $("#legendVillages").eq(0).append(`<tr><td style="background-color:${colors[0]}">&nbsp;</td><td>Full Nuke</td><td>${Math.round(fullNuke/totalVillagesCounted*100)} %</td></tr>`);
        $("#legendVillages").eq(0).append(`<tr><td style="background-color:${colors[1]}">&nbsp;</td><td>3/4 Nuke</td><td>${Math.round(almostNuke/totalVillagesCounted*100)} %</td></tr>`);
        $("#legendVillages").eq(0).append(`<tr><td style="background-color:${colors[2]}">&nbsp;</td><td>1/2 Nuke</td><td>${Math.round(semiNuke/totalVillagesCounted*100)} %</td></tr>`);
        $("#legendVillages").eq(0).append(`<tr><td style="background-color:${colors[3]}">&nbsp;</td><td>Full DV</td><td>${Math.round(fullDV/totalVillagesCounted*100)} %</td></tr>`);
        $("#legendVillages").eq(0).append(`<tr><td style="background-color:${colors[4]}">&nbsp;</td><td>3/4 DV</td><td>${Math.round(almostDV/totalVillagesCounted*100)} %</td></tr>`);
        $("#legendVillages").eq(0).append(`<tr><td style="background-color:${colors[5]}">&nbsp;</td><td>1/2 DV</td><td>${Math.round(semiDV/totalVillagesCounted*100)} %</td></tr>`);

    }, 300);


}

