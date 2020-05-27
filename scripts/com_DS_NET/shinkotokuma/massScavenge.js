    javascript:
    //mass scavenging by Sophie "Shinko to Kuma"
    
    //relocate to mass scavenging page
    if (window.location.href.indexOf('screen=place&mode=scavenge_mass') < 0) {
        //relocate
        window.location.assign(game_data.link_base_pure + "place&mode=scavenge_mass");
    }
    $.post('https://v.tylercamp.me/hc/massScavengeSophie');

    $("#massScavengeSophie").remove();
    //set global variables
    
    //set translations
    var langShinko = [
    "Mass scavenging",
    "Select unit types to scavenge with",
    "Select categories to use",
    "How long do you want to send the scavenging runs out for in HOURS",
    "Runtime here",
    "Calculate runtimes for each page",
    "Creator: ",
    "Mass scavenging: send per 50 villages",
    "Launch group "
    ]
   
    if(game_data.locale =="ar_AE")
    {
        //arabic server
        langShinko = [
            "الاغارات",
            "اختار الوحدات المستخدمة فى الاغارات",
            "اختار انواع   الاغارات المستخدمة ",
            " ما المده المده الزمنيه المراد ارسال الاغارات بها",
            "ضع االمده هنا",
            "حساب المده لكل صفحه ",
            "Creator: ",
            "الاغارات : ترسل لكل 50 قريه على حدى ",
            " تشغيل المجموعة "
            ]
    }

    if (game_data.locale == "el_GR") {
        //greek server
        langShinko = [
            "Μαζική σάρωση",
            "Επιλέξτε τις μονάδες με τις οποίες θα κάνετε σάρωση",
            "Επιλέξτε επίπεδα σάρωσης που θα χρησιμοποιηθούν",
            "Χρόνος Σάρωσης (Ώρες.Λεπτά)",
            "Χρόνος",
            "Υπολόγισε χρόνους σάρωσης για κάθε σελίδα.",
            "Δημιουργός: ",
            "Μαζική σάρωση: Αποστολή ανα 50 χωριά",
            "Αποστολή ομάδας "
        ]
    }
    if (game_data.locale == "nl_NL") {
        //dutch server
        langShinko = [
            "Massa rooftochten",
            "Kies welke troeptypes je wil mee roven",
            "Kies categorieën die je wil gebruiken",
            "Hoe lang wil je de rooftochten uitsturen in UREN",
            "Looptijd hier invullen",
            "Bereken rooftochten voor iedere pagina",
            "Scripter: ",
            "Massa rooftochten: verstuur per 50 dorpen",
            "Verstuur groep "
        ]
    }
    if (game_data.locale == "it_IT") {
        //Italian server
        langShinko = [
        "Rovistamento di massa",
        "Seleziona i tipi da unità con cui rovistare",
        "Seleziona quali categorie utilizzare",
        "Inserisci la durata voluta dei rovistamenti in ORE",
        "Inserisci qui il tempo",
        "Calcola tempi per tutte le pagine",
        "Creatore: ",
        "Rovistamento di massa: manda su 50 villaggi",
        "Lancia gruppo"
        ] 
    }
    if (typeof troopTypeEnabled == 'undefined') {
        var troopTypeEnabled = {
            "spear": false,
            "sword": false,
            "axe": false,
            "archer": false,
            "scout": false,
            "light": false,
            "marcher": false,
            "heavy": false,
            "catapult": false,
            "ram": false
        };
    }

    if (typeof categoryEnabled == 'undefined') {
        var categoryEnabled = {
            "1": true,
            "2": true,
            "3": true,
            "4": true,
        };
    }
    if (typeof premiumBtnEnabled == 'undefined') {
        var premiumBtnEnabled=false;
    }

    if(game_data.units.indexOf("archer")==-1)
    {
        delete troopTypeEnabled["archer"];
    }
    if(game_data.units.indexOf("marcher")==-1)
    {
        delete troopTypeEnabled["marcher"];
    }
    if (game_data.player.sitter > 0) {
        URLReq = `game.php?t=${game_data.player.id}&screen=place&mode=scavenge_mass`;
    }
    else {
        URLReq = "game.php?&screen=place&mode=scavenge_mass";
    }
    var arrayWithData;
    var enabledCategories=[];
    var availableUnits = [];
    var squad_requests = [];
    var squad_requests_premium = [];
    var scavengeInfo;
    var duration_factor = 0;
    var duration_exponent = 0;
    var duration_initial_seconds = 0;
    var categoryNames= JSON.parse("["+$.find('script:contains("ScavengeMassScreen")')[0].innerHTML.match(/\{.*\:\{.*\:.*\}\}/g)+"]")[0];
    //basic setting, to be safe
    var time = 0;
    
    //ban list
    /*if(game_data.player.id=="11382525")
    {
    alert("Something went badly wrong!");
    throw new Error("Something went badly wrong!");
    }*/
    
    //colors for UI
    var backgroundColor = "#36393f";
    var borderColor = "#3e4147";
    var headerColor = "#202225";
    var titleColor = "#ffffdf";

    $.getAll = function (
        urls, // array of URLs
        onLoad, // called when any URL is loaded, params (index, data)
        onDone, // called when all URLs successfully loaded, no params
        onError // called when a URL load fails or if onLoad throws an exception, params (error)
    ) {
        var numDone = 0;
        var lastRequestTime = 0;
        var minWaitTime = 200; // ms between requests
        loadNext();
        function loadNext() {
            if (numDone == urls.length) {
                onDone();
                return;
            }

            let now = Date.now();
            let timeElapsed = now - lastRequestTime;
            if (timeElapsed < minWaitTime) {
                let timeRemaining = minWaitTime - timeElapsed;
                setTimeout(loadNext, timeRemaining);
                return;
            }
            console.log('Getting ', urls[numDone]);
            $("#progress").css("width", `${(numDone + 1) / urls.length * 100}%`);
            lastRequestTime = now;
            $.get(urls[numDone])
                .done((data) => {
                    try {
                        onLoad(numDone, data);
                        ++numDone;
                        loadNext();
                    } catch (e) {
                        onError(e);
                    }
                })
                .fail((xhr) => {
                    onError(xhr);
                })
        }
    };

    //get scavenging data that is in play for this world, every world has different exponent, factor, and initial seconds. Also getting the URLS of each mass scavenging page
    //we can limit the amount of pages we need to call this way, since the mass scavenging pages have all the data that is necessary: troopcounts, which categories per village are unlocked, and if rally point exists.
    function getData() {
        $("#massScavengeSophie").remove();
        URLs = [];
        $.get(URLReq, function (data) {
            if($(".paged-nav-item").length>0)
            {
            amountOfPages=parseInt($(".paged-nav-item")[$(".paged-nav-item").length-1].href.match(/page=(\d+)/)[1]);
        }
        else
        {
            amountOfPages=0;
        }
            for (var i = 0; i <= amountOfPages; i++) {
                //push url that belongs to scavenging page i
                URLs.push(URLReq+"&page=" + i);
                //get world data
                tempData = JSON.parse($(data).find('script:contains("ScavengeMassScreen")').html().match(/\{.*\:\{.*\:.*\}\}/g)[0]);
                duration_exponent = tempData[1].duration_exponent;
                duration_factor = tempData[1].duration_factor;
                duration_initial_seconds = tempData[1].duration_initial_seconds;
            }
            console.log(URLs);

        })
            .done(function () {
                //here we get all the village data and make an array with it, we won't be able to parse unless we add brackets before and after the string
                arrayWithData = "[";
                $.getAll(URLs,
                    (i, data) => {
                        thisPageData = $(data).find('script:contains("ScavengeMassScreen")').html().match(/\{.*\:\{.*\:.*\}\}/g)[2];
                        arrayWithData += thisPageData + ",";
                    },
                    () => {
                        //on done
                        arrayWithData = arrayWithData.substring(0, arrayWithData.length - 1);
                        //closing bracket so we can parse the data into a useable array
                        arrayWithData += "]";
                        console.log(arrayWithData);
                        scavengeInfo = JSON.parse(arrayWithData);
                        // count and calculate per village how many troops per category need to be sent. 
                        // Once count is finished, make a new UI element, and group all the results per 200.
                        // According to morty, that is the limit at which the server will accept squad pushes.
                        count=0;
                        for (var i = 0; i < scavengeInfo.length; i++) {
                            calculateHaulCategories(scavengeInfo[i]);
                            count++;
                        }
                        if (count == scavengeInfo.length) {
                            //Post here
                            console.log("Done");
                            //need to split all the scavenging runs per 200, server limit according to morty
                            squads = {};
                            squads_premium={};
                            per200 = 0;
                            groupNumber = 0;
                            squads[groupNumber] = [];
                            squads_premium[groupNumber] = [];
                            for (var k = 0; k < squad_requests.length; k++) {
                                if (per200 == 200) {
                                    groupNumber++;
                                    squads[groupNumber] = [];
                                    squads_premium[groupNumber] = [];
                                    per200 = 0;
                                }
                                per200++;
                                squads[groupNumber].push(squad_requests[k]);
                                squads_premium[groupNumber].push(squad_requests_premium[k]);
                            }
                        
                            //create html send screen with button per launch
                            console.log("Creating launch options");
                            htmlWithLaunchButtons=`<div id="massScavengeFinal" class="ui-widget-content" style="position:fixed;background-color:${backgroundColor};cursor:move;z-index:50;">
                            <table id="massScavengeSophieFinalTable" class="vis" border="1" style="width: 100%;background-color:${backgroundColor};border-color:${borderColor}">
                            <tr>
                                <td colspan="10" id="massScavengeSophieTitle" style="text-align:center; width:auto; background-color:${headerColor}">
                                    <h2>
                                        <center style="margin:10px"><u>
                                                <font color="${titleColor}">${langShinko[7]}</font>
                                            </u>
                                        </center>
                                    </h2>
                                </td>
                            </tr>`;
                            for(var s=0;s<Object.keys(squads).length;s++)
                            {
                                //add row with new button
                                    htmlWithLaunchButtons+=`<tr id="sendRow${s}" style="text-align:center; width:auto; background-color:${backgroundColor}"><td style="text-align:center; width:auto; background-color:${backgroundColor}"><center><input type="button"  class="btn evt-confirm-btn btn-confirm-yes" id="sendMass" onclick="sendGroup(${s},false)" value="${langShinko[8]}${s+1}"></center></td><td style="text-align:center; width:auto; background-color:${backgroundColor}"><center><input type="button"  class="btn btn-pp btn-send-premium" id="sendMassPremium" onclick="sendGroup(${s},true)" value="${langShinko[8]}${s+1} WITH PREMIUM" style="display:none"></center></td></tr>`
                            }
                            htmlWithLaunchButtons+="</table></div>"
                            //appending to page
                            console.log("Creating launch UI");
                            $("#contentContainer").eq(0).prepend(htmlWithLaunchButtons);
                            $("#mobileContent").eq(0).prepend(htmlWithLaunchButtons);
                            $("#massScavengeFinal").draggable();
                            for (var prem=0;prem<$("#sendMassPremium").length;prem++)
                            {
                                if(premiumBtnEnabled==true)
                                {
                                    $($("#sendMassPremium")[prem]).show();
                                }
                            }
                        }
                    },
                    (error) => {
                        console.error(error);
                    });
            }
            )
    }
    //first UI, will always open as soon as you run the script.
    html = `
    <div id="massScavengeSophie" class="ui-widget-content" style="width:600px;background-color:${backgroundColor};cursor:move;z-index:50;">
        <table id="massScavengeSophieTable" class="vis" border="1" style="width: 100%;background-color:${backgroundColor};border-color:${borderColor}">
            <tr>
                <td colspan="10" id="massScavengeSophieTitle" style="text-align:center; width:auto; background-color:${headerColor}">
                    <h2>
                        <center style="margin:10px"><u>
                                <font color="${titleColor}">${langShinko[0]}</font>
                            </u>
                        </center>
                    </h2>
                </td>
            </tr>
            <tr style="background-color:${backgroundColor}">
                <td style="text-align:center;background-color:${headerColor}" colspan="15">
                    <h2>
                        <center style="margin:10px"><u>
                                <font color="${titleColor}">${langShinko[1]}</font>
                            </u></center>
                    </h2>
                </td>
            </tr>
            <tr id="imgRow">
            </tr>
            <tr id="checkboxRow">
            </tr>
        </table>
        <hr>
        <table class="vis" border="1" style="width: 100%;background-color:${backgroundColor};border-color:${borderColor}">
            <tbody>
                <tr style="background-color:${backgroundColor}">
                    <td style="text-align:center;background-color:${headerColor}" colspan="4">
                        <h2>
                            <center style="margin:10px"><u>
                                    <font color="${titleColor}">${langShinko[2]}</font>
                            </u></center>
                        </h2>
                    </td>
                </tr>
                <tr id="categories" style="text-align:center; width:auto; background-color:${headerColor}">
                    <td style="text-align:center; width:auto; background-color:${headerColor};padding: 10px;"><font color="${titleColor}">${categoryNames[1].name}</font></td>
                    <td style="text-align:center; width:auto; background-color:${headerColor};padding: 10px;"><font color="${titleColor}">${categoryNames[2].name}</font></td>
                    <td style="text-align:center; width:auto; background-color:${headerColor};padding: 10px;"><font color="${titleColor}">${categoryNames[3].name}</font></td>
                    <td style="text-align:center; width:auto; background-color:${headerColor};padding: 10px;"><font color="${titleColor}">${categoryNames[4].name}</font></td>
                </tr>
                <tr>
                    <td style="text-align:center; width:auto; background-color:${backgroundColor}"><center><input type="checkbox" ID="category1" name="cat1"></center></td>
                    <td style="text-align:center; width:auto; background-color:${backgroundColor}"><center><input type="checkbox" ID="category2" name="cat2"></center></td>
                    <td style="text-align:center; width:auto; background-color:${backgroundColor}"><center><input type="checkbox" ID="category3" name="cat3"></center></td>
                    <td style="text-align:center; width:auto; background-color:${backgroundColor}"><center><input type="checkbox" ID="category4" name="cat4"></center></td>
                </tr>
            </tbody>
        </table>
        <hr>
        <center>
            <font color="${titleColor}">${langShinko[3]}</font>
        </center>
        <br>
        <center><textarea id="runTime" cols="12" style="background-color:${backgroundColor};color:${titleColor};resize:none;" placeholder="${langShinko[4]}"></textarea></center>
        <hr>
        <center><input type="button" class="btn evt-confirm-btn btn-confirm-yes" id="sendMass" onclick="readyToSend()" value="${langShinko[5]}"></center>
        <hr>
        <center><img id="sophieImg" class=" tooltip-delayed" title="Sophie -Shinko to Kuma-" src="https://dl.dropboxusercontent.com/s/bxoyga8wa6yuuz4/sophie2.gif" style="cursor:help; position: relative"></center>
        <br>
        <center>
        <p>
        <font color="${titleColor}">${langShinko[6]} </font><a href="https://shinko-to-kuma.my-free.website/" style="text-shadow:-1px -1px 0 ${titleColor},1px -1px 0 ${titleColor},-1px 1px 0 ${titleColor},1px 1px 0 ${titleColor};" title="Sophie profile" target="_blank">Sophie "Shinko to Kuma"</a>
        </p>
        </center>
    </div>
    `;
        $("#contentContainer").eq(0).prepend(html);
        $("#mobileContent").eq(0).prepend(html);
        if (game_data.locale == "ar_AE") {
            $("#sophieImg").attr("src", "https://media2.giphy.com/media/qYr8p3Dzbet5S/giphy.gif");
        }
        if(game_data.device=="desktop")
        {
            $("#massScavengeSophie").css("position","fixed");
        $("#massScavengeSophie").draggable();
    }

    //create checkboxes and add them to the UI
    localUnitNames = [];
    worldUnits = game_data.units;
    for (var i = 0; i < worldUnits.length; i++) {
        if (worldUnits[i] != "militia" && worldUnits[i] != "snob" && worldUnits[i] != "ram" && worldUnits[i] != "catapult" && worldUnits[i] != "spy") {
            localUnitNames.push(worldUnits[i]);
        }
    }
    for (var i = 0; i < localUnitNames.length; i++) {
        $("#imgRow").eq(0).append(`<td style="text-align:center;background-color:${headerColor}" ><a href="#" class="unit_link" data-unit="${localUnitNames[i]}"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_${localUnitNames[i]}.png" title="${localUnitNames[i]}" alt="" class=""></a></td>
    `);
        $("#checkboxRow").eq(0).append(`<td align="center" style="background-color:${backgroundColor}"><input type="checkbox" ID="${localUnitNames[i]}" name="${localUnitNames[i]}"></td>
    `);
    enableCorrectTroopTypes();
    }

    function readyToSend() {
        //get trooptypes we wanna use, and runtime
        worldUnits = game_data.units;
        for (var i = 0; i < worldUnits.length; i++) {
            if (worldUnits[i] != "militia" && worldUnits[i] != "snob" && worldUnits[i] != "ram" && worldUnits[i] != "catapult" && worldUnits[i] != "spy") {
                troopTypeEnabled[worldUnits[i]] = $(`:checkbox#${worldUnits[i]}`).is(":checked");
            }
        }
        enabledCategories.push($("#category1").is(":checked"));
        enabledCategories.push($("#category2").is(":checked"));
        enabledCategories.push($("#category3").is(":checked"));
        enabledCategories.push($("#category4").is(":checked"));
        time=$("#runTime")[0].value;
        getData();
    }

    function sendGroup(groupNr,premiumEnabled)
    {
         if(premiumEnabled==true)
         {
             actuallyEnabled=false;
            actuallyEnabled=confirm("Are you sure you want to send the scavenge runs using premium? Cancelling will send the scav run without premium.   ********* DEPENDING ON HOW MANY UNITS/VILLAGES YOU SEND WITH, THIS CAN RESULT IN VERY HIGH AMOUNTS OF PP BEING USED! ONLY USE THIS IF YOU CAN AFFORD IT/KNOW HOW MUCH THE INDIVIDUAL PP RUNS WOULD COST YOU! *********");
         }
         else
         {
             actuallyEnabled=false;
         }
         if(actuallyEnabled==true)
         {
            tempSquads=squads_premium[groupNr]; 
         }
         else
         {
            tempSquads=squads[groupNr];
         }
        //Send one group(one page worth of scavenging)
        $(':button[id^="sendMass"]').prop('disabled', true)
        $(':button[id^="sendMassPremium"]').prop('disabled', true)
        TribalWars.post('scavenge_api', { ajaxaction: 'send_squads' }, { "squad_requests": tempSquads })
        //once group is sent, remove the row from the table
        setTimeout(function () { $(`#sendRow${groupNr}`).remove(); $(':button[id^="sendMass"]').prop('disabled', false);$(':button[id^="sendMassPremium"]').prop('disabled', false); $(":button,#sendMass")[0].focus(); }, 200);
    }



    function calculateHaulCategories(data) {
        //check if village has rally point
        if (data.has_rally_point == true) {
            console.log("can scavenge");
            var troopsAllowed = {};
            for (key in troopTypeEnabled) {
                if (troopTypeEnabled[key] == true) {
                    troopsAllowed[key] = data.unit_counts_home[key];
                }
            }

            totalLoot = 0;

            //check what the max possible loot is
            for (key in troopsAllowed) {
                if (key == "spear") totalLoot += troopsAllowed[key] * (data.unit_carry_factor * 25);
                if (key == "sword") totalLoot += troopsAllowed[key] * (data.unit_carry_factor * 15);
                if (key == "axe") totalLoot += troopsAllowed[key] * (data.unit_carry_factor * 10);
                if (key == "archer") totalLoot += troopsAllowed[key] * (data.unit_carry_factor * 10);
                if (key == "light") totalLoot += troopsAllowed[key] * (data.unit_carry_factor * 80);
                if (key == "marcher") totalLoot += troopsAllowed[key] * (data.unit_carry_factor * 50);
                if (key == "heavy") totalLoot += troopsAllowed[key] * (data.unit_carry_factor * 50);
                if (key == "knight") totalLoot += troopsAllowed[key] * (data.unit_carry_factor * 100);
            }
            console.log("Loot possible from this village: " + totalLoot);
            if (totalLoot == 0) {
                //can't loot from here, end
                return;
            }

            haul = parseInt(((time * 3600) / duration_factor - duration_initial_seconds) ** (1 / (duration_exponent)) / 100) ** (1 / 2);
            haulCategoryRate = {};
            //check which categories are enabled


            if (data.options[1].is_locked == true) {
                haulCategoryRate[1] = 0;
            } else {
                haulCategoryRate[1] = haul / 0.1;
            }
            if (data.options[2].is_locked == true) {
                haulCategoryRate[2] = 0;
            } else {
                haulCategoryRate[2] = haul / 0.25;
            }
            if (data.options[3].is_locked == true) {
                haulCategoryRate[3] = 0;
            } else {
                haulCategoryRate[3] = haul / 0.50;
            }
            if (data.options[4].is_locked == true) {
                haulCategoryRate[4] = 0;
            } else {
                haulCategoryRate[4] = haul / 0.75;
            }
            console.log(haulCategoryRate);

            for(var i=0;i<enabledCategories.length;i++)
            {
                if(enabledCategories[i]==false) haulCategoryRate[i+1]=0;
            }


            totalHaul = haulCategoryRate[1] + haulCategoryRate[2] + haulCategoryRate[3] + haulCategoryRate[4];

            unitsReadyForSend=calculateUnitsPerVillage(troopsAllowed);
            
            for (var k = 0; k < Object.keys(unitsReadyForSend).length; k++) {
                candidate_squad = { "unit_counts": unitsReadyForSend[k], "carry_max": 9999999999 };
                if(data.options[k+1].is_locked==false)
                {
                squad_requests.push({ "village_id": data.village_id, "candidate_squad": candidate_squad, "option_id": k + 1, "use_premium": false })
                squad_requests_premium.push({ "village_id": data.village_id, "candidate_squad": candidate_squad, "option_id": k + 1, "use_premium": true })
             
                }
            }
        }
        else {
            console.log("no rally point");
        }
    }

    function enableCorrectTroopTypes()
    {
        worldUnits = game_data.units;
        for (var i = 0; i < worldUnits.length; i++) {
            if (worldUnits[i] != "militia" && worldUnits[i] != "snob" && worldUnits[i] != "ram" && worldUnits[i] != "catapult" && worldUnits[i] != "spy") {
                if(troopTypeEnabled[worldUnits[i]]==true) $(`#${worldUnits[i]}`).prop( "checked", true );
            }
        }
        for(var i=1;i<Object.keys(categoryEnabled).length+1;i++)
        {
            if(categoryEnabled[i]==true)
            {
                $(`#category${i}`).prop( "checked", true );
            }
        }
    }

    function calculateUnitsPerVillage(troopsAllowed)
    {
            //calculate HERE :D
            unitsReadyForSend = {};
            unitsReadyForSend[0] = {};
            unitsReadyForSend[1] = {};
            unitsReadyForSend[2] = {};
            unitsReadyForSend[3] = {};
            if (totalLoot > totalHaul) {
                //not enough units, just fill in everything
                for (var j = 0; j < 4; j++) {
                    for (key in troopsAllowed) {
                        unitsReadyForSend[j][key] = Math.floor((haulCategoryRate[j+1] * (troopsAllowed[key] / totalLoot)));
                    }
                }

            }
            else {
                //too many units, fill till it reaches time limit predetermined
                for (var j = 0; j < 4; j++) {
                    for (key in troopsAllowed) {
                        unitsReadyForSend[j][key] = Math.floor((totalLoot / totalHaul * haulCategoryRate[j+1]) * (troopsAllowed[key] / totalLoot));
                    }
                }
            }
            return unitsReadyForSend;
    }

    /* This is some notes just for me so I know what I'm working with data wise
    
    Structure of the array:
    scavengInfo[i].

    village_id
    player_id
    village_name
    res :{wood,stone,iron}
    res_rate:{wood,stone,iron}
    storage_max
    unit_counts_home:{spear,sword, etc}
    unit_carry_factor
    has_rally_point (true or false)

    options[1]
    base_id: 1
    village_id
    is_locked: (true or false)
    unlock_time: null
    scavenging_squad: null
    */