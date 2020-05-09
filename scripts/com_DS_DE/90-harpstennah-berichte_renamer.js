(function() {
	/* basiert auf den Report Renamer von chisum, -Vanguard.- */
	win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
	win.ScriptAPI.register( '90-Berichte Renamer', true, 'Mausmajor', 'support-nur-im-forum@arcor.de' );
	var oGD = win.game_data;
	var $ = win.$;
	var lang = oGD.market;
	var out = {k:' &Kat-', w: ' ^Wall: ', istw: ' w', a: ' $AG: ', ero: '++>', ang: '>>>', spyg: '>>>>',  zero: '0_leer_0', trUnit:'_', res: ' R: ', reskilo: 10000};
	var settings = {gamespeed: 1, unitspeed: 1, resspeed: 1,  unit: 'light', infoBP: true, BPalt: false};
	// Änderungen Version 1.3.3 (sendDate)
	var texts = {
	 de: {
		att: "Angreifer:",
		def: "Verteidiger:",
		from: "Herkunft:",
		to: "Ziel:",
		ram: "Schaden durch Rammböcke:",
		cat: "Schaden durch Katapultbeschuss:",
		loy: "Zustimmung:",
		bui: ['Kirche', 'Hauptgebäude', 'Kaserne', 'Stall', 'Werkstatt', 'Adelshof', 'Schmiede', 'Versammlungsplatz', 'Statue', 'Marktplatz', 'Holzfäller', 'Lehmgrube', 'Eisenmine', 'Bauernhof', 'Speicher', 'Versteck', 'Wall', 'Erste Kirche'],
		buik: ['#Ki', 'HG', 'Ka', 'St', 'Wst', 'AH', 'Sm', 'VP', 'St', 'Ma', 'Ho', 'Le', 'Fe', 'BH',  'Sp', 'Versteck', 'Wall', '1.K'],
		sendDate: /\s*0?(\d+)\.0?(\d+)\.(\d+)\s+0?(\d+):0?(\d+):0?(\d+)\s*/,
		buiLevel: /(.*)\s\(Stufe\s(\d+)\)/,
		},
	 zz: {
		att: "Attacker:",
		def: "Defender:",
		from: "Origin:",
		to: "Destination:",
		ram: "Damage by rams:",
		cat: "Damage by catapults:",
		loy: "Loyalty:",
		bui: ['Church', 'Headquarters', 'Barracks', 'Stable', 'Workshop', 'Academy', 'Smithy', 'Rally point','Statue', 'Market', 'Timber camp', 'Clay pit', 'Iron mine', 'Farm', 'Warehouse', 'Hiding place', 'Wall', 'First church'],
		buik: ['#Ch', 'HQ', 'Ka', 'St', 'Wst', 'AH', 'Sm', 'VP','St', 'Ma', 'Ho', 'Le', 'Fe', 'BH', 'Sp', 'Versteck', 'Wall', '1.K'],
		month: {Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12},
		sendDate: /\s*(\w+)\s+0?(\d+),\s+(\d+)\s+0?(\d+):0?(\d+):0?(\d+)\s*/ ,
		buiLevel: /(.*)\s\(Level\s(\d+)\)/,
		},
	};
	var units= {
		spear:{ speed: 18, carry: 25, def: 4, att: 1, bhp: 1},
		sword:{ speed: 22, carry: 15, def: 5, att: 2, bhp: 1},
		axe:{ speed: 18, carry: 10, def: 1, att: 4, bhp: 1},
		archer:{ speed: 18, carry: 10, def: 5, att: 2, bhp: 1},
		light:{ speed: 10, carry: 80, def: 5, att: 13, bhp: 4},
		marcher:{ speed: 10, carry: 50, def: 6, att: 12, bhp: 5},
		heavy:{ speed: 11, carry: 50, def: 23, att: 15, bhp: 6},
		knight:{ speed: 10, carry: 100, def: 40, att: 20, bhp: 10},
		spy:{speed: 9, carry: 0, def: 1, att: 2, bhp: 2},
		ram:{speed: 30, carry: 0, def: 4, att: 8, bhp: 5},
		catapult:{speed: 30, carry: 0, def: 12, att: 10, bhp: 8},
		priest:{speed: 0.02, carry: 0, def: 0, att: 0, bhp: 100},
		snob:{speed: 35, carry: 0, def: 200, att: 200, bhp: 100},
		militia:{speed: 0.02, carry: 0, def: 4, att: 0, bhp: 0},
	};

	if(typeof(dsrr_texts) != 'undefined') $.extend(texts, dsrr_texts);
	if(typeof(dsrr_out) != 'undefined') $.extend(out, dsrr_out);
	if(typeof(dsrr_settings) != 'undefined') $.extend(settings, dsrr_settings);

	function gid(id){return document.getElementById(id);}
	function getCoords(coords) {return coords.match(/^(.*)\((\d+\|\d+)\)\s*K(\d+).*$/)[2];}
	function getCon(coords) {return 'K' + coords.match(/^(.*)\((\d+\|\d+)\)\s*K(\d+).*$/)[3];}

	function main() {
		var t_AttName, t_AttVill, t_AttCoords,  t_1 ='', t_Units ='', t_Church ='', t_Wall ='', t_AG ='', t_DefName, t_DefVill, t_DefCoords, t_Kat ='', truppen = '', t_istWall ='', t_Bash = '';
		var  level = {church: 0, wood: 0, stone: 0, iron: 0, storage: 0, hide: 0, wall: 0};
 		var oldName = $('#content_value .quickedit-label').text();
		t_AttName = $('#attack_info_att th:contains("' + texts[lang].att + '") + th').text();
		t_DefName = ' ' + $('#attack_info_def th:contains("' + texts[lang].def + '") + th').text();
		if(t_DefName == ' ---') t_DefName = ' Barbaren' ;
		var att_village_string = $('#attack_info_att td:contains("' + texts[lang].from + '") + td').text();
		var def_village_string = $('#attack_info_def td:contains("' + texts[lang].to + '") + td').text();
		var def_village_id = getURLParam('id', $('#attack_info_def td:contains("' + texts[lang].to + '") + td').html());
		var wall_from = $('#attack_results th:contains("' + texts[lang].ram + '") + td b:eq(0)').text();
		var wall_to = $('#attack_results th:contains("' + texts[lang].ram + '") + td b:eq(1)').text();
		var catas_from = $('#attack_results th:contains("' + texts[lang].cat + '") + td b:eq(0)').text();
		var catas_to = $('#attack_results th:contains("' + texts[lang].cat + '") + td b:eq(1)').text();
		var catas_bui = $('#attack_results th:contains("' + texts[lang].cat + '") + td').text();
		var loyalty_from = $('#attack_results th:contains("' + texts[lang].loy + '") + td b:eq(0)').text();
		var loyalty_to = $('#attack_results th:contains("' + texts[lang].loy + '") + td b:eq(1)').text();

		/* Überlebende Einheiten */
		/*var vunits = $('#attack_info_def_units  tr:eq(1) td').toArray();
		var nunits = $('#attack_info_def_units  tr:eq(2) td').toArray();
		var sunits = 0;
		if (nunits.length > 0){
			var runits = new Array();
			for (a = 1; a < nunits.length; a++) {
				runits[a] = vunits[a].innerHTML - nunits[a].innerHTML;
				sunits += runits[a];
			}
			runits.shift();
			if (sunits==0 && out.zero != ''){
				t_Units = out.zero;
			}else{
				t_Units =  runits.join(out.trUnit);
			}
		}*/
		function Ueberlebende_Einheiten(vunits,nunits){
            var sunits = 0;
            var units = out.zero;
            if (nunits.length > 0){
    			var runits = new Array();
    			for (a = 1; a < nunits.length; a++) {
    				runits[a] = vunits[a].innerHTML - nunits[a].innerHTML;
    				sunits += runits[a];
    			}
    			runits.shift();
    			if (sunits!=0 && out.zero != ''){
    				units =  runits.join(out.trUnit);
    			}
    			return units;
		    }
        }
        var aUnits = Ueberlebende_Einheiten($('#attack_info_att_units  tr:eq(1) td').toArray(),$('#attack_info_att_units  tr:eq(2) td').toArray());
        var dUnits = Ueberlebende_Einheiten($('#attack_info_def_units  tr:eq(1) td').toArray(),$('#attack_info_def_units  tr:eq(2) td').toArray());
		/* Bashpunkte */
		// ODD oben
		function fAttackerBP(){
			var attacker_tr = $('#attack_info_att_units tr').toArray();
			var attackers_points = 0;
			var list = new Array();
			list = { "typ": {}, "kill":{}};
			var td0 = attacker_tr[0].getElementsByTagName('td'); // Einheitstypen
			var td2 = attacker_tr[2].getElementsByTagName('td');
			for (i = 1; i < td0.length; i++) {
				list.typ[i] = td0[i].getElementsByTagName('img')[0].getAttribute('src').match(/unit_([a-z]+)\.png/)[1];
				list.kill[i] = parseInt(td2[i].firstChild.data, 10);
				var bp = (settings.BPalt) ? units[list.typ[i]].bhp : units[list.typ[i]].att ;
				attackers_points += list.kill[i] * bp;
			}
			$('#attack_info_att_units tr:eq(2)').after('<tr><td id="SL_Report_Bash">ODD: ' + attackers_points + '</td></tr>');
			if (t_DefName == oGD.player.name && attackers_points > 0) t_Bash = "ODD:" + attackers_points;
		}
		//ODA unten
		function fDefenderBP(){
			var defender_tr = $('#attack_info_def_units tr').toArray();
			var defender_points = 0;
			var list = new Array();
			list = { "typ": {}, "kill":{}};
			var td0 = defender_tr[0].getElementsByTagName('td'); // Einheitstypen
			var td2 = defender_tr[2].getElementsByTagName('td');
			for (i = 1; i < td0.length; i++) {
				list.typ[i] = td0[i].getElementsByTagName('img')[0].getAttribute('src').match(/unit_([a-z]+)\.png/)[1];
				list.kill[i] = parseInt(td2[i].firstChild.data, 10);
				var bp = (settings.BPalt) ? units[list.typ[i]].bhp : units[list.typ[i]].def;
				defender_points += list.kill[i] * bp;
			}
			$('#attack_info_def_units tr:eq(2)').after('<tr><td id="SL_Report_Bash">ODA: ' + defender_points + '</td></tr>');
			if (t_AttName == oGD.player.name && defender_points > 0) t_Bash = "ODA:" + defender_points;
		}
		if (!gid("SL_Report_Bash") && settings.infoBP) { // "SL_Report_Bash" dient als Schalter um mehfaches Eintragen der BP zu verhindern
			if (gid("attack_info_att_units")) fAttackerBP();
			if (gid("attack_info_def_units")) fDefenderBP();
		}
		var cut_att = att_village_string.lastIndexOf(" (");
		var cut_def = def_village_string.lastIndexOf(" (");
		t_AttVill = att_village_string.substring(0, cut_att);
		t_DefVill = def_village_string.substring(0, cut_def);
		t_AttCoords = getCoords(att_village_string);
		t_DefCoords = getCoords(def_village_string);

		// erspähte Rohstoffe
		var res = {wood: 0, stone: 0, iron: 0,sum: ''};
		var prod = {wood: 0, stone: 0, iron: 0,sum: '--'};
		var farm = {wood: 0, stone: 0, iron: 0,sum: 0};
		var dZeile = $('#content_value .nopad').text();
		var sZeit = dZeile.match(texts[lang].sendDate);
		if(typeof(texts[lang].month) != "undefined"){
			var beta = [sZeit[0], sZeit[2],texts[lang].month[sZeit[1]],sZeit[3],sZeit[4],sZeit[5],sZeit[6]];
			sZeit = beta;
		}

		if ($('#attack_spy_resources').length){
			res.wood = Number($('#attack_spy_resources .wood:first').parent().text().replace('.',''));
            res.stone = Number($('#attack_spy_resources .stone:first').parent().text().replace('.',''));
            res.iron = Number($('#attack_spy_resources .iron:first').parent().text().replace('.',''));

			res.sum = res.wood + res.stone + res.iron;

			if (sZeit[3] < 2000){ sZeit[3] = parseInt(sZeit[3],10) + 2000}; // wandelt 2stellige Jahreszahl um
			var BerichtDatum = new Date(parseInt(sZeit[3],10), parseInt(sZeit[2]-1,10),parseInt(sZeit[1],10),parseInt(sZeit[4],10),parseInt(sZeit[5],10),parseInt(sZeit[6],10));
			var serverTime = gid("serverTime").textContent.split(":");
			var serverDate = gid("serverDate").textContent.split("/");
			var ServerDatum = new Date(parseInt(serverDate[2],10), parseInt(serverDate[1]-1,10), parseInt(serverDate[0],10), parseInt(serverTime[0],10), parseInt(serverTime[1],10), parseInt(serverTime[2],10));
			var BerichtAlter = (ServerDatum-BerichtDatum)/1000/60/60;

			// Gebäudestufen auswerten
			if($('#attack_spy_building_data').length){
                var building_data = $.parseJSON($('#attack_spy_building_data').val());
                for(var i=0; i<building_data.length;i++){
                    if(typeof level[building_data[i].id]!="undefined"){
                        level[building_data[i].id] = building_data[i].level;
                    }
                    else if(building_data[i].id == 'church_f'){
                        level.church = 2; // Erste Kirche
                    }
                }
            }
			if (level.storage > 0){ // Gebäude erspäht?
				out.ang = out.spyg ;
				t_istWall = out.istw + level.wall;
				// Produktion der Minen / Stunde
				prod.wood = Math.round((level.wood == 0 ? 5 :  Math.round(30  *  Math.pow(1.163118, level.wood - 1))) * settings.gamespeed  * settings.resspeed) ;
				prod.stone = Math.round((level.stone == 0 ? 5 :  Math.round(30  *  Math.pow(1.163118, level.stone - 1))) * settings.gamespeed * settings.resspeed) ;
				prod.iron = Math.round((level.iron == 0 ? 5 :  Math.round(30  *  Math.pow(1.163118, level.iron - 1))) * settings.gamespeed * settings.resspeed) ;
				// Laufzeit
				var ax = oGD.village.coord.split('|')[0];
				var ay = oGD.village.coord.split('|')[1];
				var dx = t_DefCoords.split('|')[0];
				var dy = t_DefCoords.split('|')[1];
				var entfernungIst = Math.sqrt((ax-dx)*(ax-dx) + (ay-dy)*(ay-dy));
				var LaufZeit = units[settings.unit].speed / settings.gamespeed / settings.unitspeed * entfernungIst / 60;
				// möglicher Farmertrag
				var SpKap = Math.round(1000 * Math.pow(1.2294934, level.storage - 1));
				var VsKap = Math.round(150 * Math.pow(1.3335, level.hide - 1));
				SpKap -= VsKap;
				farm.wood = res.wood + (LaufZeit + BerichtAlter) * prod.wood;
				if ( farm.wood > SpKap -1 ) farm.wood = SpKap;
				farm.stone = res.stone + (LaufZeit + BerichtAlter) * prod.stone;
				if ( farm.stone > SpKap -1 ) farm.stone = SpKap;
				farm.iron = res.iron + (LaufZeit + BerichtAlter) * prod.iron;
				if ( farm.iron > SpKap -1 ) farm.iron = SpKap;
				farm.sum = farm.wood + farm.stone + farm.iron;
			};
			if (level.church > 0) t_Church = texts[lang].buik[0] + level.church; // Kirche?

			var tragkraft = units[settings.unit].carry;
			if (tragkraft > 0){
				var resTruppen = Math.round( res.sum / tragkraft );
				var farmTruppen = Math.round( farm.sum / tragkraft );
				truppen = "[" + resTruppen + "/" + farmTruppen +"]";
			}
    		if (res.sum > out.reskilo) res.sum = Math.round(res.sum/1000) + "k";
    		res.sum = out.res + res.sum;
		}
		if(loyalty_from != '' && loyalty_to != ''){
			if(loyalty_to <= '0'){
				t_1 = out.ero;
			} else {
				t_1 = out.ang;
			}
		} else {
			t_1 = out.ang;
		}
		if(wall_from != '' && wall_to != '') t_Wall = out.w + wall_from + '->' + wall_to;
		if(catas_from != '' && catas_to != ''){
			t_Kat = out.k;
			for (a = 1; a < texts[lang].bui.length; a++) {
				if (catas_bui.match(texts[lang].bui[a])){
					t_Kat += texts[lang].buik[a] + ': ' + catas_from + '->' + catas_to;
				}
			}
		}
		if(loyalty_from != '' && loyalty_to != '') t_AG = out.a + loyalty_from + '->' + loyalty_to;

		/* Austausch der Platzhalter */
		var name=vorgabe.split("{old}").join(oldName);
		name=name.split("{aName}").join(t_AttName);
		name=name.split("{aVill}").join(t_AttVill);
		name=name.split("{aCoords}").join(t_AttCoords);
		name=name.split("{aK}").join(getCon(att_village_string));
		name=name.split("{dName}").join(t_DefName);
		name=name.split("{dVill}").join(t_DefVill);
		name=name.split("{dCoords}").join(t_DefCoords);
		name=name.split("{dK}").join(getCon(def_village_string));
		name=name.split("{aUnits}").join(aUnits);
		name=name.split("{dUnits}").join(dUnits);
		/*der Platzhalter Units wurde ersetzt daher kommt nun eine Fehlermeldung*/
		if(name.match('{Units}')) win.UI.InfoMessage("Der Platzhalter '{Units}' wurde durch den Platzhalter '{dUnits}' ersetzt. Bitte ändern Sie dies ab!" , 1000, 'error');
        name=name.split("{Units}").join(dUnits);
		name=name.split("{Wall}").join(t_Wall);
		name=name.split("{Kat}").join(t_Kat);
		name=name.split("{Church}").join(t_Church);
		name=name.split("{AG}").join(t_AG);
		name=name.split("{Status}").join(t_1);
		name=name.split("{Res}").join(res.sum);
		name=name.split("{Farm}").join(truppen);
		name=name.split("{istWall}").join(t_istWall);
		name=name.split("{Bash}").join(t_Bash);
		name=name.split("{DayTime}").join(sZeit[1]>9?sZeit[1]:'0'+sZeit[1]);
		name=name.split("{MonthTime}").join(sZeit[2]>9?sZeit[2]:'0'+sZeit[2]);
		name=name.split("{YearTime}").join(sZeit[3]>9?sZeit[3]:'0'+sZeit[3]);
		name=name.split("{HouerTime}").join(sZeit[4]>9?sZeit[4]:'0'+sZeit[4]);
		name=name.split("{MinutesTime}").join(sZeit[5]>9?sZeit[5]:'0'+sZeit[5]);
		name=name.split("{SecondTime}").join(sZeit[6]>9?sZeit[6]:'0'+sZeit[6]);
		name= name.trim();
		$('#content_value .quickedit').find('.rename-icon').click();
        $('#content_value .quickedit').find('input[type=text]').val(name);
        $('#content_value .quickedit').find('input[type=button]').click();
	}

	/* nach dem Script Inc-Renamer - Autor: SlowTarget, angepasst von RokKeT; ist aber auch sonst im I-Net zu finden; von mir modifiziert */
	function getURLParam(strParamName, strHref){
		 var strReturn = "";
		 if(typeof strHref == 'undefined'){var strHref = window.location.href;}
		 if ( strHref.indexOf("?") > - 1 ) {
			var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
			var aQueryString = strQueryString.split("&");
			for ( var iParam = 0; iParam < aQueryString.length;	iParam ++ ){
			if (aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > - 1 ) {
				var aParam = aQueryString[iParam].split("=");
				strReturn = aParam[1];
				break;
				}
			}
		}
		return unescape(strReturn)
	}

	var info_start = gid('attack_info_att');

	if(info_start && typeof texts[lang] != 'undefined') {
		main();
	} else {
		win.UI.InfoMessage("SL-Script Berichte-Renamer ist hier ohne Funktion" , 1000, 'error');
	}

 })();