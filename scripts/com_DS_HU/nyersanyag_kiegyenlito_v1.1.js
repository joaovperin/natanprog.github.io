

if (document.URL.match("screen=overview_villages&mode=prod")) {
                var incoming = [];
				var tomb_pozitiv = [];
				var tomb_negativ = [];
				var osszegek = [];
				var raktar_atlag_pre = 0;
				var raktar_atlag = 0;
				var fa_atlag_pre = 0;
				var agyag_atlag_pre = 0;
				var vas_atlag_pre = 0;
				var falvak_szama = parseInt($("#production_table").find("th").eq(1).text().match(/\d+/)[0]);
				var url = "https://" + window.location.host + "/game.php?village=" + game_data.village.id + "&mode=trader&screen=overview_villages&type=inc&page=-1";
				var link = [];
				var idx = 0;

                function focusToIframe() {
                        $('#frameId').focus();
                }

                function iframeOngoingRemove() {
                        $("iframe#ongoing").remove();
                }

                function createStats() {
                        htmlString = '<tr><td><div id="stats">Elkészült: <b id="text">0</b> / <b>'+link.length+'</b><br>A kiegyenlítéshez felhasznált falvak: <b>'+falvak_szama+'</b><img src="graphic/buildings/main.png"><br>Beérkező fa: <b>'+loop()[0]+'</b><img src="graphic/buildings/wood.png"><br>Beérkező agyag: <b>'+loop()[1]+'</b><img src="graphic/buildings/stone.png"><br>Beérkező vas: <b>'+loop()[2]+'</b><img src="graphic/buildings/iron.png"><br>Átlagos fa falvanként(beérkezővel együtt): <b>'+fa_atlag.toFixed()+'</b><img src="graphic/buildings/wood.png"><br>Átalogs agyag falvanként(beérkezővel együtt): <b>'+agyag_atlag.toFixed()+'</b><img src="graphic/buildings/stone.png"><br>Átlagos vas falvanként(beérkezővel együtt): <b>'+vas_atlag.toFixed()+'</b><img src="graphic/buildings/iron.png"><br>A fa teljes mennyisége, ezekben a falvakban(beérkezővel együtt): <b>'+fa_atlag_pre+'</b><img src="graphic/buildings/wood.png"><br>Az agyag teljes mennyisége, ezekben a falvakban(beérkezővel együtt): <b>'+agyag_atlag_pre+'</b><img src="graphic/buildings/stone.png"><br>A vas teljes mennyisége, ezekben a falvakban(beérkezővel együtt): <b>'+vas_atlag_pre+'</b><img src="graphic/buildings/iron.png"></div></td></tr>';
                        $(htmlString).insertBefore("#inner-border > table > tbody > tr");
                }

                function hideStats() {
                        $("#stats").hide();
                }

                function createIframeText() {
                        text = "Nyersanyag kiegyenlítő";
                        $("#frameId").contents().find("body").append(text.bold());
                }

                function botAlert() {
                        UI.InfoMessage("<b>A nyersanyag kiegyenlítő botvédelmet észlelt. Kérlek reagálj rá, hogy foytatni tudd a kiegyenlítést.</b>", 15000);
                }

                function balancingDoneMessage() {
                        UI.SuccessMessage("<b>A kiegyenlítés elkészült.</b>", 15000);
                }

                function removeSenderFrame() {
                        $('iframe').remove();
                }

                function pressOk() {
                        $("#frameId").contents().find("[type=submit]").trigger("click");
                }

                function statsCounter(idx) {
                        $("#text").text(idx);
                }

                function nextSenderFrameSrc(idx) {
                        $('#frameId').attr('src', link[idx]);
                }

                function createSenderFrame() {
					//
					var frame = document.createElement("iframe");
					frame.setAttribute("id","frameId");
					frame.setAttribute("height","300");
					frame.setAttribute("width","600");
					
					frame.setAttribute("style", "borderColor: red; border: 7px solid rgba(121,0,0,0.71); border-image-slice: 7 7 7 7; border-image-source: url(https://dsen.innogamescdn.com/asset/cf2959e7/graphic/border/frame-gold-red.png);");
					
					var fullElem = document.getElementById("inner-border");
					var before = fullElem.getElementsByTagName("table")[0];
					fullElem.insertBefore(frame, before);
					//
                    removeLoader();
                }

                function createLoader() {
                        $("body").append('<div id=loader>');
                        $("#loader").css({
                                "position": "fixed",
                                "top": "50%",
                                "left": "50%",
                                "border": "8px solid #f3f3f3",
                                "border-top": "8px solid #555",
                                "border-radius": "50%",
                                "width": "50px",
                                "height": "50px",
                                "animation": "spin 1s linear infinite"
                        })
                        $("body").append(`<div id='loader-text'>Betöltés...<div id = "infoo">Ha a script nem tölt be, akkor az alternatív verzióját ajánljuk, ami kissé lassabb mint az eredeti de az igényeknek megfelelő. Kód:<br>javascript:$.getScript('https://media.innogamescdn.com/com_DS_HU/scripts/kiegyenlito.js');void(0);</div></div>`);
                        $("#loader-text").css({
                                "position": "fixed",
                                "top": "60%",
                                "left": "50%",
                                "font-weight": "bold"
                        })
						$("#infoo").css({
								"position": "fixed",
                                "background": "white",
                                "top": "20%",
                                "left": "0%",
                                "font-weight": "bold"
                        })
                        $(".shadedBG").css({
                                "filter": "blur(1px)"
                        })
                }

                function removeLoader() {
                        $("#loader, #loader-text").remove();
                        $(".shadedBG").css({
                                "filter": "blur(0px)"
                        })
                }

                function botCheck() {
                        if ($("#frameId").contents().find('iframe').length > 0 ||
                                $("iframe#frameId").contents().find("#bot_check").length > 0 ||
                                $("iframe#frameId").contents().find("#bot_check").is(":visible")) {
                                return true
                        } else {
                                return false
                        }
                }

                function findResourcesInURL(idx) {
                        wood = parseInt(String(link[idx]).match(/wood=(\d+)/g)[0].split("=")[1]);
                        stone = parseInt(String(link[idx]).match(/clay=(\d+)/g)[0].split("=")[1]);
                        iron = parseInt(String(link[idx]).match(/iron=(\d+)/g)[0].split("=")[1]);
                        return [wood, stone, iron];
                }

                function fillResources() {
                        $("#frameId").contents().find('input[name="wood"]').first().val(findResourcesInURL(idx)[0]);
                        $("#frameId").contents().find('input[name="stone"]').first().val(findResourcesInURL(idx)[1]);
                        $("#frameId").contents().find('input[name="iron"]').first().val(findResourcesInURL(idx)[2]);
                }

                function makeItPretty() {
                        iframeOngoingRemove();
                        $('#frameId').fadeIn(3000, function() {
                                $("#stats").slideDown(3000, function() {
                                        focusToIframe();
                                        bodyOnClick();
                                })
                        })
                }

                function bodyOnClick() {
                        $('body').on("click", function() {
                                console.log("focus");
                                focusToIframe();
                        })
                }

                function removeLinkIfNull() {
                        for (var i = 0; i < link.length; i++) {
                                wood = parseInt(String(link[i]).match(/wood=(\d+)/g)[0].split("=")[1]);
                                stone = parseInt(String(link[i]).match(/clay=(\d+)/g)[0].split("=")[1]);
                                iron = parseInt(String(link[i]).match(/iron=(\d+)/g)[0].split("=")[1]);
                                if (wood + stone + iron == 0) {
                                        link.splice(i, 1);
                                }
                        }
                }

                function loop() {
                        var incWood = 0;
                        var incStone = 0;
                        var incIron = 0;
                        for (var i = 0; i < incoming.length; i++) {
                                for (var j = 1; j < falvak_szama + 1; j++) {
                                        villageCoords = $("#production_table").find("tr").eq(j).children("td").eq(1).text().match(/\d+\|\d+/)[0];
                                        incCoords = incoming[i][0];
                                        if (incCoords == villageCoords) {
                                                incWood += incoming[i][1];
                                                incStone += incoming[i][2];
                                                incIron += incoming[i][3];
                                        }
                                }
                        }
                        return [incWood, incStone, incIron];
                }

                function iframe_ongoing(callback) {
                        createLoader();
                        $('<iframe>')
                                .attr({
                                        src: url,
                                        id: "ongoing",
                                        height: "300",
                                        width: "600"
                                }).insertBefore("body").hide();
                        $('iframe#ongoing').one('load', function() {
                                $("#ongoing").contents().find("#trades_table").find("tr").not(":first").each(function(key, val) {
                                        koordinata = $("#ongoing").contents().find("#trades_table").find("tr").eq(key + 1).find("td").eq(3).text().match(/\d+\|\d+/)[0];
                                        if (parseInt($("#ongoing").contents().find("#trades_table").find("th").first().text()) < 200) {
                                                if ($(val).find("td").last().find(".icon.header.wood").length) {
                                                        faInc = parseInt($(val).find("td").last().find(".icon.header.wood").parent(".nowrap").text().trim().replace(".", ""));
                                                } else {
                                                        faInc = 0;
                                                }
                                                if ($(val).find("td").last().find(".icon.header.stone").length) {
                                                        agyagInc = parseInt($(val).find("td").last().find(".icon.header.stone").parent(".nowrap").text().trim().replace(".", ""));
                                                } else {
                                                        agyagInc = 0;
                                                }
                                                if ($(val).find("td").last().find(".icon.header.iron").length) {
                                                        vasInc = parseInt($(val).find("td").last().find(".icon.header.iron").parent(".nowrap").text().trim().replace(".", ""));
                                                } else {
                                                        vasInc = 0;
                                                }
                                        } else {
                                                if ($(val).find("td").last().find(".res.wood").length) {
                                                        faInc = Number($(val).find("td").last().find(".res.wood").text().replace(".", ""));
                                                } else {
                                                        faInc = 0;
                                                }
                                                if ($(val).find("td").last().find(".res.stone").length) {
                                                        agyagInc = Number($(val).find("td").last().find(".res.stone").text().replace(".", ""));
                                                } else {
                                                        agyagInc = 0;
                                                }
                                                if ($(val).find("td").last().find(".res.iron").length) {
                                                        vasInc = Number($(val).find("td").last().find(".res.iron").text().replace(".", ""));
                                                } else {
                                                        vasInc = 0;
                                                }
                                        }
                                        incoming.push([koordinata, faInc, agyagInc, vasInc]);
                                })
                                callback();
                        })
                }
                iframe_ongoing(kovi)

                function kovi() {
                        $("#production_table").find("tr").not(":first").each(function(key, val) {
                                fa = parseInt($(val).children("td").eq(3).children("span").eq(0).text().replace(".", ""));
                                agyag = parseInt($(val).children("td").eq(3).children("span").eq(1).text().replace(".", ""));
                                vas = parseInt($(val).children("td").eq(3).children("span").eq(2).text().replace(".", ""));
                                raktar = parseInt($(val).children("td").eq(4).text());
                                raktar_atlag_pre += raktar;
                                fa_atlag_pre += fa;
                                agyag_atlag_pre += agyag;
                                vas_atlag_pre += vas;
                        })
                        fa_atlag_pre = fa_atlag_pre + loop()[0];
                        agyag_atlag_pre = agyag_atlag_pre + loop()[1];
                        vas_atlag_pre = vas_atlag_pre + loop()[2];
                        // koordinĂĄtĂĄk, nyersanyagok, raktĂĄrak, szabad kereskedĹk kinyerĂŠse
                        $("#production_table").find("tr").not(":first").each(function(key, val) {
                                faluID = parseInt($(val).children("td").eq(1).find("a").attr("href").match(/village\=\d+/)[0].split("=")[1]);
                                koordinata = $(val).children("td").eq(1).text().match(/\d+\|\d+/)[0];
                                fa = parseInt($(val).children("td").eq(3).children("span").eq(0).text().replace(".", ""));
                                agyag = parseInt($(val).children("td").eq(3).children("span").eq(1).text().replace(".", ""));
                                vas = parseInt($(val).children("td").eq(3).children("span").eq(2).text().replace(".", ""));
                                raktar = parseInt($(val).children("td").eq(4).text());
                                szabad_kereskedok = parseInt($(val).children("td").eq(5).text().split("/")[0]);
                                raktar_atlag = raktar_atlag_pre / falvak_szama;
                                fa_atlag = fa_atlag_pre / falvak_szama;
                                agyag_atlag = agyag_atlag_pre / falvak_szama;
                                vas_atlag = vas_atlag_pre / falvak_szama;
                                osszes_nyersanyag_atlag = 0;
                                if (fa-fa_atlag > 0) { osszes_nyersanyag_atlag += fa-fa_atlag }
                                if (agyag-agyag_atlag > 0) { osszes_nyersanyag_atlag += agyag-agyag_atlag }
                                if (vas-vas_atlag > 0) { osszes_nyersanyag_atlag += vas-vas_atlag }
                                igazitas_szabadkereskedokhoz = szabad_kereskedok * 1000 / osszes_nyersanyag_atlag;
                                if (raktar > fa_atlag) {
                                        fa_elteres = fa - fa_atlag;
                                        if (fa_elteres > 0) {
                                                if (szabad_kereskedok * 1000 < osszes_nyersanyag_atlag) {
                                                        fa_elteres_pozitiv = fa_elteres * igazitas_szabadkereskedokhoz;
                                                        fa_elteres_negativ = 0;
                                                } else {
                                                        fa_elteres_pozitiv = fa_elteres;
                                                        fa_elteres_negativ = 0;
                                                }
                                        } else {
                                                fa_elteres_pozitiv = 0;
                                                fa_elteres_negativ = fa_elteres;
                                        }
                                } else {
                                        fa_elteres = fa - raktar;
                                        if (fa_elteres > 0) {
                                                fa_elteres_pozitiv = fa_elteres * igazitas_szabadkereskedokhoz;
                                                fa_elteres_negativ = 0;
                                        } else {
                                                fa_elteres_pozitiv = 0;
                                                fa_elteres_negativ = fa_elteres;
                                        }
                                }
                                if (raktar > agyag_atlag) {
                                        agyag_elteres = agyag - agyag_atlag;
                                        if (agyag_elteres > 0) {
                                                if (szabad_kereskedok * 1000 < osszes_nyersanyag_atlag) {
                                                        agyag_elteres_pozitiv = agyag_elteres * igazitas_szabadkereskedokhoz;
                                                        agyag_elteres_negativ = 0;
                                                } else {
                                                        agyag_elteres_pozitiv = agyag_elteres;
                                                        agyag_elteres_negativ = 0;
                                                }
                                        } else {
                                                agyag_elteres_pozitiv = 0;
                                                agyag_elteres_negativ = agyag_elteres;
                                        }
                                } else {
                                        agyag_elteres = agyag - raktar;
                                        if (agyag_elteres > 0) {
                                                agyag_elteres_pozitiv = agyag_elteres * igazitas_szabadkereskedokhoz;
                                                agyag_elteres_negativ = 0;
                                        } else {
                                                agyag_elteres_pozitiv = 0;
                                                agyag_elteres_negativ = agyag_elteres;
                                        }
                                }
                                if (raktar > vas_atlag) {
                                        vas_elteres = vas - vas_atlag;
                                        if (vas_elteres > 0) {
                                                if (szabad_kereskedok * 1000 < osszes_nyersanyag_atlag) {
                                                        vas_elteres_pozitiv = vas_elteres * igazitas_szabadkereskedokhoz;
                                                        vas_elteres_negativ = 0;
                                                } else {
                                                        vas_elteres_pozitiv = vas_elteres;
                                                        vas_elteres_negativ = 0;
                                                }
                                        } else {
                                                vas_elteres_pozitiv = 0;
                                                vas_elteres_negativ = vas_elteres;
                                        }
                                } else {
                                        vas_elteres = vas - raktar;
                                        if (vas_elteres > 0) {
                                                vas_elteres_pozitiv = vas_elteres * igazitas_szabadkereskedokhoz;
                                                vas_elteres_negativ = 0;
                                        } else {
                                                vas_elteres_pozitiv = 0;
                                                vas_elteres_negativ = vas_elteres;
                                        }
                                }
                                fa_elteres_pozitiv = Math.floor(fa_elteres_pozitiv / 1000) * 1000;
                                agyag_elteres_pozitiv = Math.floor(agyag_elteres_pozitiv / 1000) * 1000;
                                vas_elteres_pozitiv = Math.floor(vas_elteres_pozitiv / 1000) * 1000;
                                fa_elteres_negativ = Math.floor(fa_elteres_negativ / 1000) * 1000;
                                agyag_elteres_negativ = Math.floor(agyag_elteres_negativ / 1000) * 1000;
                                vas_elteres_negativ = Math.floor(vas_elteres_negativ / 1000) * 1000;
                                osszes_pozitiv_nyersanyag = fa_elteres_pozitiv + agyag_elteres_pozitiv + vas_elteres_pozitiv;
                                osszes_negativ_nyersanyag = fa_elteres_negativ + agyag_elteres_negativ + vas_elteres_negativ;
                                tomb_pozitiv.push([faluID, koordinata, fa_elteres_pozitiv, agyag_elteres_pozitiv, vas_elteres_pozitiv, raktar, szabad_kereskedok, osszes_pozitiv_nyersanyag, fa_atlag, fa_elteres, agyag_atlag, agyag_elteres, vas_atlag, vas_elteres, igazitas_szabadkereskedokhoz]);
                                tomb_negativ.push([faluID, koordinata, fa_elteres_negativ, agyag_elteres_negativ, vas_elteres_negativ, raktar, szabad_kereskedok, osszes_negativ_nyersanyag]);
                        });
                        // a beĂŠrkezĹ nyersanyag hozzĂĄadĂĄsa a negatĂ­v tĂśmbhĂśz
                        for (var i = 0; i < incoming.length; i++) {
                                for (var j = 0; j < tomb_negativ.length; j++) {
                                        if (incoming[i][0] == tomb_negativ[j][1]) {
                                                tomb_negativ[j][2] = tomb_negativ[j][2] + incoming[i][1];
                                                tomb_negativ[j][3] = tomb_negativ[j][3] + incoming[i][2];
                                                tomb_negativ[j][4] = tomb_negativ[j][4] + incoming[i][3];
                                                if (tomb_negativ[j][2] > 0) {
                                                        tomb_negativ[j][2] = 0;
                                                }
                                                if (tomb_negativ[j][3] > 0) {
                                                        tomb_negativ[j][3] = 0;
                                                }
                                                if (tomb_negativ[j][4] > 0) {
                                                        tomb_negativ[j][4] = 0;
                                                }
                                        }
                                }
                        }
                        while (tomb_pozitiv.length > 0) {
                                osszegek = [];
                                for (var n = 0; n < tomb_pozitiv.length; n++) {
                                        for (var m = 0; m < tomb_negativ.length; m++) {
                                                if (tomb_pozitiv[n][1] != tomb_negativ[m][1]) {
                                                        if (tomb_pozitiv[n][2] >= Math.abs(tomb_negativ[m][2])) {
                                                                faelt = tomb_negativ[m][2];
                                                        } else {
                                                                faelt = -tomb_pozitiv[n][2];
                                                        }
                                                        if (tomb_pozitiv[n][3] >= Math.abs(tomb_negativ[m][3])) {
                                                                agyagelt = tomb_negativ[m][3];
                                                        } else {
                                                                agyagelt = -tomb_pozitiv[n][3];
                                                        }
                                                        if (tomb_pozitiv[n][4] >= Math.abs(tomb_negativ[m][4])) {
                                                                vaselt = tomb_negativ[m][4];
                                                        } else {
                                                                vaselt = -tomb_pozitiv[n][4];
                                                        }
                                                        kuldo_ID = tomb_pozitiv[n][0];
                                                        fogado_ID = tomb_negativ[m][0];
                                                        iindex = n;
                                                        jindex = m;
                                                        sum = faelt + agyagelt + vaselt;
                                                        osszegek.push([kuldo_ID, fogado_ID, faelt, agyagelt, vaselt, sum, iindex, jindex]);
                                                }
                                        }
                                }
                                if (osszegek.length == 0) {
                                        break
                                }

                                function smallestOfFour() {
                                        var smallest = 1000000,
                                                smallestOrigin = [],
                                                indexOfSmallest;
                                        for (var z = 0; z < osszegek.length; z++) {
                                                for (var p = 5; p < 6; p++) {
                                                        if (osszegek[z][p] < smallest) {
                                                                smallest = osszegek[z][p];
                                                                smallestOrigin = osszegek[z];
                                                                indexOfSmallest = z;
                                                        }
                                                }
                                        }
                                        return [smallestOrigin, indexOfSmallest]
                                }
                                smallestOfFour();
                                console.log(smallestOfFour());
                                village = smallestOfFour()[0][0];
                                target = smallestOfFour()[0][1];
                                fa = Math.abs(smallestOfFour()[0][2]);
                                agyag = Math.abs(smallestOfFour()[0][3]);
                                vas = Math.abs(smallestOfFour()[0][4]);
                                link.push(["https://" + window.location.host + "/game.php?village=" + village + "&screen=market&mode=send&target=" + target + "&wood=" + fa + "&clay=" + agyag + "&iron=" + vas + ""]);
                                if (fa + agyag + vas == 0) {
                                        break;
                                }
                                // vĂĄltozĂĄs visszatĂĄrolĂĄsa a tĂśmbbe
                                tomb_pozitiv[smallestOfFour()[0][6]][2] = tomb_pozitiv[smallestOfFour()[0][6]][2] - fa;
                                tomb_pozitiv[smallestOfFour()[0][6]][3] = tomb_pozitiv[smallestOfFour()[0][6]][3] - agyag;
                                tomb_pozitiv[smallestOfFour()[0][6]][4] = tomb_pozitiv[smallestOfFour()[0][6]][4] - vas;
                                tomb_negativ[smallestOfFour()[0][7]][2] = tomb_negativ[smallestOfFour()[0][7]][2] + fa;
                                tomb_negativ[smallestOfFour()[0][7]][3] = tomb_negativ[smallestOfFour()[0][7]][3] + agyag;
                                tomb_negativ[smallestOfFour()[0][7]][4] = tomb_negativ[smallestOfFour()[0][7]][4] + vas;
                                // ha mindhĂĄrom nyersanyag nulla a tĂśmbĂśkben, akkor tĂĄroljĂĄk azt az elemet ĂŠs ÄĹşrÄÂ­tjÄĹşk az ÄĹsszegek tÄĹmbÄĹt is
                                for (var s = 0; s < tomb_pozitiv.length; s++) {
                                        if (tomb_pozitiv[s][2] == 0 && tomb_pozitiv[s][3] == 0 && tomb_pozitiv[s][4] == 0) {
                                                tomb_pozitiv.splice(s, 1);
                                        }
                                }
                                for (var q = 0; q < tomb_negativ.length; q++) {
                                        if (tomb_negativ[q][2] == 0 && tomb_negativ[q][3] == 0 && tomb_negativ[q][4] == 0) {
                                                tomb_negativ.splice(q, 1);
                                        }
                                }
                        }
                        removeLinkIfNull();
                        uccso();
                }

                function uccso() {
                        target = function() {
                                if ($("#frameId").get(0).contentWindow.location.href.match("target")) {
                                        return true
                                } else {
                                        return false
                                }
                        }
                        confirmSend = function() {
                                if ($("#frameId").get(0).contentWindow.location.href.match("confirm_send")) {
                                        return true
                                } else {
                                        return false
                                }
                        }
                        villageItem = function() {
                                if ($("#frameId").contents().find(".village-item").is(":visible")) {
                                        return true
                                } else {
                                        return false
                                }
                        }

                        function control() {
                                if (!target() && !confirmSend()) {
                                        if (idx == link.length) {
                                                removeSenderFrame();
                                                balancingDoneMessage();
                                        } else {
                                                nextSenderFrameSrc(idx);
                                        }
                                } else if (villageItem()) {
                                        findResourcesInURL(idx);
                                        fillResources();
                                        ++idx;
                                        pressOk();
                                } else if (confirmSend()) {
                                        statsCounter(idx);
                                        pressOk();
                                }
                        }
                        createSenderFrame();
                        // a szÄĹveg vÄÄltozÄĹban szerepel a leÄÂ­rÄÄs a scriptrÄš?l, illetve ha beÄĹşt a botvÄĹ delem akkor ezt is jelezni fogja
                        $("#frameId").one("load", function() {
                                createIframeText();
                                createStats();
                                hideStats();
                                makeItPretty();
                        })

                        function endOfBotAlert() {
                                $("#frameId").contents().find("#bot_check").one("DOMNodeRemoved", function(event) {
                                        var elm = $(event.target);
                                        if (elm.attr("id") !== undefined) {
                                                console.log("Removed element id name: " + elm.attr("id"));
                                                control();
                                                focusToIframe();
                                        }
                                })
                        }
                        $('#frameId').load(function() {
                                console.log("loaded");
                                $(this).contents().find("body").one('keydown', function(event) {
                                        switch (event.keyCode) {
                                                case 17:
                                                        if (botCheck()) {
                                                                botAlert();
                                                                endOfBotAlert();
                                                                console.log("botAlert");
                                                        } else {
                                                                control();
                                                                console.log("control");
                                                        }
                                        }
                                })
                        })
                }
                console.log(link);
        } else {
                self.location = game_data.link_base_pure.replace(/screen\=\w*/i, "screen=overview_villages&mode=prod");
        }