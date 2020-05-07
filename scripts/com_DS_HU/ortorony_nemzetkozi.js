javascript:
        if (document.URL.match("mode=incomings&type=unignored&subtype=attacks")) {
                $("#incomings_table").find("tr").eq(0).find("th").last().after('<th>Őrtorony</th>');
                var url = "https://" + location.host + game_data.link_base_pure + "overview_villages&mode=buildings&group=0&page=-1",
                        url2 = "https://" + location.host + "/interface.php?func=get_unit_info",
                        towerCoords = [],
                        towerLevels = [],
                        unitSpeed = [],
                        metszespontok = [],
                        tomb = [],
                        timesRun = 1,
                        sorok = Number($("#incomings_table").find("th").first().text().replace("Command ", "").replace("(", "").replace(")", ""));

                function first() {
                        $.ajax({
                                url: url2,
                                success: function(data) {
                                        $.each(["sword", "axe", "spy", "light", "heavy", "ram", "snob"], function(key, val) {
                                                // egység sebességek kinyerése
                                                unitSpeed.push(Number($(data).find("config > " + val + " > speed").text()) * 60);
                                        })
                                        $.ajax({
                                                url: url,
                                                success: function(datas) {
                                                        $(datas).find("#villages").find("tr").each(function(key, val) {
                                                                if (Number($(val).find(".upgrade_building.b_watchtower").text()) > 0) {
                                                                        // őrtornyok koordinátáinak és szintjeinek kinyerése
                                                                        towerCoords.push($(val).find(".quickedit-label").text().match(/\d+\|\d+/)[0]);
                                                                        // őrtorony szinthez tartozó hatósugár
                                                                        var szint = Number($(val).find(".upgrade_building.b_watchtower").text());
                                                                        switch (szint) {
                                                                                case 1:
                                                                                        towerLevels.push(1.1);
                                                                                        break;
                                                                                case 2:
                                                                                        towerLevels.push(1.3);
                                                                                        break;
                                                                                case 3:
                                                                                        towerLevels.push(1.5);
                                                                                        break;
                                                                                case 4:
                                                                                        towerLevels.push(1.7);
                                                                                        break;
                                                                                case 5:
                                                                                        towerLevels.push(2);
                                                                                        break;
                                                                                case 6:
                                                                                        towerLevels.push(2.3);
                                                                                        break;
                                                                                case 7:
                                                                                        towerLevels.push(2.6);
                                                                                        break;
                                                                                case 8:
                                                                                        towerLevels.push(3);
                                                                                        break;
                                                                                case 9:
                                                                                        towerLevels.push(3.4);
                                                                                        break;
                                                                                case 10:
                                                                                        towerLevels.push(3.9);
                                                                                        break;
                                                                                case 11:
                                                                                        towerLevels.push(4.4);
                                                                                        break;
                                                                                case 12:
                                                                                        towerLevels.push(5.1);
                                                                                        break;
                                                                                case 13:
                                                                                        towerLevels.push(5.8);
                                                                                        break;
                                                                                case 14:
                                                                                        towerLevels.push(6.7);
                                                                                        break;
                                                                                case 15:
                                                                                        towerLevels.push(7.6);
                                                                                        break;
                                                                                case 16:
                                                                                        towerLevels.push(8.7);
                                                                                        break;
                                                                                case 17:
                                                                                        towerLevels.push(10);
                                                                                        break;
                                                                                case 18:
                                                                                        towerLevels.push(11.5);
                                                                                        break;
                                                                                case 19:
                                                                                        towerLevels.push(13.1);
                                                                                        break;
                                                                                case 20:
                                                                                        towerLevels.push(15);
                                                                                        break;
                                                                        }
                                                                }
                                                        })
                                                        if (towerCoords.length == 0) {
                                                                UI.ErrorMessage("Nincs őrtorony egyik falvadban sem!", 5000)
                                                        }
                                                },
                                        })
                                },
                        })
                }
                var doStuff = function() {
                        $.ajax({
                                url: url,
                                success: function() {
                                        metszespontok = [];
                                        tomb = [];
                                        // sor hozzáadása a táblázathoz
                                        $("#incomings_table").find("tr").eq(timesRun).find("td").last().after("<td></td>");
                                        // származási helyek és célállomások távolságainak kinyerése
                                        var distance = Number($("#incomings_table").find("tr").eq(timesRun).find("td").eq(4).text().trim());
                                        // származási helyek és célállomások koordinátáinak kinyerése
                                        var celallomas = $("#incomings_table").find("tr").eq(timesRun).find("td").eq(1).text().match(/\d+\|\d+/)[0];
                                        var szarmazasi_hely = $("#incomings_table").find("tr").eq(timesRun).find("td").eq(2).text().match(/\d+\|\d+/)[0];
                                        // érkezés kinyerése és átalakítása mp-re
                                        var hms = $("#incomings_table").find("tr").eq(timesRun).find("td").eq(6).text().split(':'),
                                                seconds = (+hms[0]) * 3600 + (+hms[1]) * 60 + (+hms[2]),
                                                // parancs kinyerése
                                                parancs = $("#incomings_table").find("tr").eq(timesRun).find("td").eq(0).text().trim();
                                        // érkezési idő átalakítása mezőre
                                        switch (parancs) {
                                                case "Sword":
                                                        var hatralevo_mezo = seconds / unitSpeed[0];
                                                        break;
                                                case "Axe":
                                                        var hatralevo_mezo = seconds / unitSpeed[1];
                                                        break;
                                                case "Spy":
                                                        var hatralevo_mezo = seconds / unitSpeed[2];
                                                        break;
                                                case "LCav":
                                                        var hatralevo_mezo = seconds / unitSpeed[3];
                                                        break;
                                                case "HCav":
                                                        var hatralevo_mezo = seconds / unitSpeed[4];
                                                        break;
                                                case "Ram":
                                                        var hatralevo_mezo = seconds / unitSpeed[5];
                                                        break;
                                                case "Noble":
                                                        var hatralevo_mezo = seconds / unitSpeed[6];
                                                        break;
                                        }
                                        // egyenes meredeksége m = (y1-y2) / (x1-x2), ha az osztó nulla, akkor osztó legyen egyenlő 1
                                        var cel = String(celallomas).split("|");
                                        var szarm = String(szarmazasi_hely).split("|");
                                        var oszto_nulla = Number(cel[0]) - Number(szarm[0]);
                                        if (oszto_nulla == 0) {
                                                oszto_nulla = 1;
                                        }
                                        var m = (Number(cel[1]) - Number(szarm[1])) / (oszto_nulla);
                                        // hol metszi az egyenes az y tengelyt y1 = mx1+b
                                        var n = (m * Number(cel[0]) - Number(cel[1])) / -1;
                                        for (var i = 0; i < towerCoords.length; i++) {
                                                var h = (String(towerCoords[i]).split("|"))[0];
                                                var k = (String(towerCoords[i]).split("|"))[1];
                                                var r = towerLevels[i];
                                                findCircleLineIntersections(r, h, k, m, n);
                                        }

                                        function findCircleLineIntersections(r, h, k, m, n) {
                                                // kör: (x - h)^2 + (y - k)^2 = r^2
                                                // egyenes: y = m * x + n
                                                // r: kör rádiusz
                                                // h: kör x koordinátája
                                                // k: kör y koordinátája
                                                // m: egyenes meredeksége
                                                // n: hol metszi az egyenes az y tengelyt
                                                // a, b, c értéke
                                                var a = 1 + Math.pow(m, 2);
                                                var b = -h * 2 + (m * (n - k)) * 2;
                                                var c = Math.pow(h, 2) + Math.pow(n - k, 2) - Math.pow(r, 2);
                                                // diszkrimináns értéke
                                                var d = Math.pow(b, 2) - 4 * a * c;
                                                if (d >= 0) {
                                                        // másodfokú egyenlet megoldóképlete
                                                        var intersections = [
                                                                (-b + Math.sqrt(d)) / 2 / a,
                                                                (-b - Math.sqrt(d)) / 2 / a
                                                        ];
                                                        if (d == 0) {
                                                                // az egyenes érintője a körnek(egy közös pont)
                                                                metszespontok.push((Number(intersections[0])) + "|" + (Number(m * intersections[0] + n)));
                                                        }
                                                        // az egyenes metszi a körvonalat(kettő közös pont)
                                                        metszespontok.push((Number(intersections[0])) + "|" + (Number(m * intersections[0] + n)));
                                                        metszespontok.push((Number(intersections[1])) + "|" + (Number(m * intersections[1] + n)));
                                                }
                                                // nincs közös pontjuk
                                        }
                                        console.log(metszespontok.length);
                                        // ha nincs közös pontjuk
                                        if (metszespontok.length == 0) {
                                                $("#incomings_table").find("tr").eq(timesRun).find("td").last().text("Nem érzékeli").css({
                                                        "font-weight": "bold",
                                                        "color": "red"
                                                });
                                                ++timesRun
                                                setTimeout(doStuff, 1);
                                        }
                                        // a származási faluhoz legközelebbi metszéspont a körön
                                        for (var i = 0; i < metszespontok.length; i++) {
                                                var metsz = metszespontok[i].split("|");
                                                // minden metszéspontnak kiszámoljuk a származási faluhoz mért távolságát
                                                var tavolsag = Math.sqrt((Math.pow((metsz[0] - szarm[0]), 2) + Math.pow((metsz[1] - szarm[1]), 2)));
                                                tomb.push(tavolsag);
                                        }
                                        console.log(tomb);
                                        // megkeressük a legkisebb távolság indexét
                                        idx = tomb.indexOf(Math.min.apply(null, tomb));
                                        console.log(idx);
                                        // az index-szel megkapjuk, melyik a legközelebbi metszéspont a származási faluhoz
                                        var legkozelebbi = metszespontok[idx];
                                        console.log(legkozelebbi);
                                        // hol járunk, azaz (teljes táv - hátralévő mező)
                                        var hol_jarunk = distance - hatralevo_mezo;
                                        // (a származási falu és a legközelebbi metszés pont a körön távolságából) kivonjuk a (hol járunk)
                                        // így megkapjuk, hogy hány mezőre van a támadás a kör metszéspontjától, majd ezt átváltjuk másodpercre (megszorozzuk az egységsebességgel)
                                        var M = legkozelebbi.split("|");
                                        var hatralevo = Math.sqrt((Math.pow((M[0] - szarm[0]), 2) + Math.pow((M[1] - szarm[1]), 2))) - hol_jarunk;
                                        console.log(hatralevo);
                                        switch (parancs) {
                                                case "Sword":
                                                        var mp = hatralevo * unitSpeed[0];
                                                        break;
                                                case "Axe":
                                                        var mp = hatralevo * unitSpeed[1];
                                                        break;
                                                case "Spy":
                                                        var mp = hatralevo * unitSpeed[2];
                                                        break;
                                                case "LCav":
                                                        var mp = hatralevo * unitSpeed[3];
                                                        break;
                                                case "HCav":
                                                        var mp = hatralevo * unitSpeed[4];
                                                        break;
                                                case "Ram":
                                                        var mp = hatralevo * unitSpeed[5];
                                                        break;
                                                case "Noble":
                                                        var mp = hatralevo * unitSpeed[6];
                                                        break;
                                        }
                                        // másodpercből visszaszámlálást csinálni
                                        var myTimer;

                                        function clock(x) {
                                                myTimer = setInterval(myClock, 1000);

                                                function myClock() {
                                                        --mp
                                                        var seconds = Math.floor(mp % 60);
                                                        var minutes = Math.floor((mp / 60) % 60);
                                                        var hours = Math.floor((mp / (60 * 60)));
                                                        // ha a szám kisebb, mint 10, akkor elétesz egy 0-t
                                                        seconds = seconds < 10 ? "0" + seconds : seconds;
                                                        minutes = minutes < 10 ? "0" + minutes : minutes;
                                                        hours = hours < 10 ? "0" + hours : hours;
                                                        ido = hours + ":" + minutes + ":" + seconds;
                                                        // idő hozzáadása a táblázathoz
                                                        if (mp < 0) {
                                                                // ha beért a hatósugárba a támadás, akkor a mp negatív
                                                                var ido = "Beérkezett";
                                                                $("#incomings_table").find("tr").eq(x).find("td").last().text(ido).css({
                                                                        "font-weight": "bold",
                                                                        "color": "green"
                                                                });
                                                        } else {
                                                                var ido = hours + ":" + minutes + ":" + seconds;
                                                                $("#incomings_table").find("tr").eq(x).find("td").last().text(ido).css("font-weight", "bold");
                                                        }
                                                        if (mp == 0) {
                                                                clearInterval(myTimer);
                                                        }
                                                }
                                        }
                                        clock(timesRun);
                                        console.log(towerCoords);
                                        console.log(towerLevels);
                                        console.log(distance);
                                        console.log(celallomas);
                                        console.log(szarmazasi_hely);
                                        console.log(unitSpeed);
                                        console.log(hatralevo_mezo);
                                        console.log(m);
                                        console.log(n);
                                        console.log(h);
                                        console.log(k);
                                        console.log(metszespontok);
                                        console.log(mp);
                                        if (++timesRun < sorok + 1) {
                                                setTimeout(doStuff, 1);
                                        }
                                },
                        })
                }
                $.ajax({
                        url: first(),
                        success: function() {
                                setTimeout(doStuff, 1);
                        }
                })
        } else {
                self.location = game_data.link_base_pure.replace(/screen\=\w*/i, "screen=overview_villages&mode=incomings&type=unignored&subtype=attacks");
        }
void(0);