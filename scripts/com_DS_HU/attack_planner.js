// -Numlock-
var version = "1.2";

var word_unit_speed = 0; //a világ egységsebessége
var word_speed = 0; //a világ sebessége

//audio
var sound;//a hangjelzéshez az interválok beállításához/leállításához
var mp = 0; 
var difference; //a kh és a gép órájának az eltérése, későbbi kalkuláláshoz
var gameTimeIsMore; //true/false, későbbi kulkuláláshoz

var village_units = {}; //az egységek eltárolása
var all_targets = 0; //cp kordik összszámban(HTML elementek id-jéhez)
var calculations = []; // tömb ami majd tárolni fogja az összes indítás teljes adatait
var saved_groups = {}; //a csoportok falutartalmainak a lekérése után eltárolja a script hogy ne keljen ismételten majd lekérni

if(document.location.href.indexOf("game.php?") > -1){
	//firssítésekkel kapcsolatos értesítés ha új verzió jelenik meg

	if(localStorage.getItem("plannerversion") == null){
		localStorage.setItem("plannerversion", version);
	}else if(localStorage.getItem("plannerversion") != version){
		if(confirm("A scriptnek a legújabb " + version + " verzióját használod, és " + localStorage.getItem("plannerversion") + " verzió óta nem használtad a scriptet ezen az eszközön. A legújabb frissítésben a stabilitási problémák voltak leginkább szem előtt tartva és lettek fikszálva, vagyis a tervezés folyamán már nem fog belassulni a script. Továbbá történt némi nem jelentős változtatás a kezelőfelületen, és végül - egy további biztonsági ellenőrző kódrész került be a scriptbe, ami ügyel arra hogy a különféle parancs típusoknál ne legyenek véletlenül rossz 'Leglassabb egységek' kiválasztva.(Számítgatások előtt a script figyelmeztet). Az 'Ok' gombra kattintva a script elnavigál a script fórum témájához, ahol a hozzászólások közt megtalálod a verziókkal kapcsolatos információkat. Ha nem érdekel, akkor kattints a mégse gombra.")){
			window.open("https://forum.klanhaboru.hu/index.php?threads/csoportos-t%C3%A1mad%C3%A1sszervez%C5%91-ind%C3%ADt%C3%A1si-asszisztens.5084/");
		}
		localStorage.setItem("plannerversion", version);
	}
	
	if(document.location.href.indexOf(document.location.host + "/game.php?village=" + game_data.village.id + "&screen=overview_villages&mode=units&type=own_home&group=0&page=-1&type=own_home") > -1){
	//---------------
		if(document.location.host.indexOf("hu51") > -1){
			word_unit_speed = 1;
			word_speed = 1;
		}else if(document.location.host.indexOf("hu54") > -1){
			word_unit_speed = 0.8;
			word_speed = 1.25;
		}else if(document.location.host.indexOf("hu56") > -1){
			word_unit_speed = 1;
			word_speed = 1;
		}else if(document.location.host.indexOf("hu57") > -1){
			word_unit_speed = 1;
			word_speed = 1;
		}else if(document.location.host.indexOf("hu58") > -1){
			word_unit_speed = 0.625;
			word_speed = 1.6;
		}else if(document.location.host.indexOf("hu59") > -1){
			word_unit_speed = 0.8;
			word_speed = 1.2;
		}else if(document.location.host.indexOf("hu60") > -1){
			word_unit_speed = 0.6;
			word_speed = 1.8;
		}else{
			var key = document.location.host.match(/\w+\d+/)[0];
			if(localStorage.getItem(key + "word") == null){
				if (window.confirm("A script nem rendelkezik a világ/egység sebességekkel, ezek nélkül a számítgatások hibásak lesznek. A folytatás előtt, kérlek add meg ezeket. Az 'Ok' gombra kattintva a script egy új lapon elnavigál a világ beállításainak a weboldalára, ahonnan ezeket az adatokat megtalálhatod és megadhatod a script számára.")){ 
					speedToScrn();
				}
			}else{
				word_speed = parseFloat(localStorage.getItem(key + "word"));
				word_unit_speed = parseFloat(localStorage.getItem(key + "unit"));
			}
		}
	//---------------
		readUnits();
		get_allGroup();
		create_controller();
		pretty_part();
	}else if(document.location.href.indexOf("screen=memo") > -1){
		$("#content_value").prepend(`<div class = "content-border" style = "margin-bottom: 10px; padding: 5px;">
			<label style = "color: #603000;"><b>A még indítandó parancsok száma: </b></label><b><span id = "launches" style = "color: #603000;">0</span></b><br>
			<label style = "color: #603000;"><b>Válassz hangjelzést: </b></label>
			<select id = "choosed_sound" size = "1" style = "width: 100px; border-radius: 4px;">
				<option value="snd1.mp3">Sound 1</option>
				<option value="snd2.mp3">Sound 2</option>
				<option value="snd3.mp3">Sound 3</option>
				<option value="snd4.mp3">Sound 4</option>
				<option value="snd5.mp3">Sound 5</option>
			</select>
			<input id = "testSound" class = "butt" type = "button" value = "Teszt"><br>
			<input id = "notif_time" type = "number" value = "5" style = "width: 30px; border-radius: 4px; margin-bottom: 5px;">
			<label for = "notif_time" style = "color: #603000;"> <b>- percel indítás előtt jelezzen</b></label><br>
			<input id = "notif_during" type = "number" value = "40" style = "width: 30px; border-radius: 4px;">
			<label for = "notif_during" style = "color: #603000;"> <b>- másodpercen keresztül jelezzen majd kapcsoljon ki (ha nem kapcsolod le manuálisan)</b></label><br>
			<label class = "wrong_commands" style = "color: red;" hidden><b>Figyelem! Hibás parancsok lettek észlelve a táblázatban! Ezeket a parancsokat a script figyelmen kívül fogja hagyni</b></label><br>
			<input id = "setit" class = "butt" type = "button" value = "Élesítés">
			<input id = "stop_play" class = "stopbutt" type = "button" value = "Elhallgattat" hidden>
			<audio id = "audioo" src="https://indexrprogs.netlify.com/snd1.mp3"></audio>
			<style>.butt{margin: 5px;backface-visibility: hidden;position: relative;cursor: pointer;white-space: nowrap;background: #6c4824;border-radius: 4px;border: 1px solid #000000;border-width: 1px 1px 1px 1px;padding: 1px 5px 1px 5px;box-shadow: 0px 0px 5px #6c4824,inset 0px 3px 5px lime;color: #ffffff;font-size: 12px;font-family: verdana;font-weight: 500;font-style: normal;text-shadow: 0px -1px 0px rgba(0%,0%,0%,0.4);}.butt:hover {background-color:#68e431;}.butt:active{position:relative;top:1px;}.stopbutt{margin: 5px;backface-visibility: hidden;position: relative;cursor: pointer;white-space: nowrap;background: #6c4824;border-radius: 4px;border: 1px solid #000000;border-width: 1px 1px 1px 1px;padding: 1px 5px 1px 5px;box-shadow: 0px 0px 5px #6c4824,inset 0px 3px 5px yellow;color: #ffffff;font-size: 12px;font-family: verdana;font-weight: 500;font-style: normal;text-shadow: 0px -1px 0px rgba(0%,0%,0%,0.4);}.stopbutt:hover {background-color:yellow;}.stopbutt:active{position:relative;top:1px;}</style>
		</div>`);
		//indítások beolvasása és az eltérések figyelembe vétele
		var game_time = new Date();
				game_time.setFullYear(parseInt($("#serverDate").text().match(/\d+/g)[2]));
				game_time.setMonth(parseInt($("#serverDate").text().match(/\d+/g)[1]) - 1);
				game_time.setDate(parseInt($("#serverDate").text().match(/\d+/g)[0]));
				game_time.setHours(parseInt($("#serverTime").text().match(/\d+/g)[0]));
				game_time.setMinutes(parseInt($("#serverTime").text().match(/\d+/g)[1]));
				game_time.setSeconds(parseInt($("#serverTime").text().match(/\d+/g)[2]));
				if(game_time > new Date()){
					var dif_date = new Date(game_time - new Date());
					difference = dif_date.getTime();
					gameTimeIsMore = true;
				}else{
					var dif_date = new Date(new Date() - game_time);
					difference = dif_date.getTime();
					gameTimeIsMore = false;
				}
			
		var tables = $(".bbcodetable");
		for(var y = 0; y < tables.length; y++){
			//ellenőrzés hogy a táblázat a script által generált-e
			if($(".bbcodetable").eq(y).find("tr").eq(0).find("th").length != 6 && $(".bbcodetable").eq(y).find("tr").eq(0).text().indexOf("Innen") < 0){
				continue;
			}
			
			var rows = $(tables[y]).find("tr");
			$(rows[0]).prepend(`<th></th>`);
			for(var x = 1; x < rows.length; x++){
				//gyorsgomb létrehozása a gyülekezőhelyhez
				var from = $(rows[x]).find("td").eq(0).find("a").eq(0).attr("href");
				var to = $(rows[x]).find("td").eq(1).find("a").eq(0).attr("href");
				//ha a cp kordi nem létezik
				if(to == undefined){
					$(".wrong_commands").prop("hidden", false);
					$(rows[x]).prepend(`<td></td>`);
					$(rows[x]).find("td").eq(2).attr("style", "background: orangered;");
					$(rows[x]).find("td").eq(5).attr("style", "background: orangered;");
					$(rows[x]).find("td").eq(6).attr("style", "background: orangered;");
					continue;
				}
				from = from.match(/\d+/g)[1];
				to = to.match(/\d+/g)[1];
				$(rows[x]).prepend(`<td><a class = "quick_open" title = "/game.php?village=${from}&screen=place&target=${to}" href = "javascript:;"><img src = "https://dshu.innogamescdn.com/asset/bf21430/graphic//buildings/place.png"></a></td>`);
				
				//a még indítandók kiszűrése és az indítottak zöldelése
				var launch = $(tables[y]).find("tr").eq(x).find("td").eq(6).text();
				var llaunch_time = new Date();
				llaunch_time.setFullYear(parseInt(launch.match(/\d+/g)[0]));
				llaunch_time.setMonth(parseInt(launch.match(/\d+/g)[1]) - 1);
				llaunch_time.setDate(parseInt(launch.match(/\d+/g)[2]));
				llaunch_time.setHours(parseInt(launch.match(/\d+/g)[3]));
				llaunch_time.setMinutes(parseInt(launch.match(/\d+/g)[4]));
				llaunch_time.setSeconds(parseInt(launch.match(/\d+/g)[5]));
				var time_now = new Date();
				if(gameTimeIsMore){
					time_now.setMilliseconds(time_now.getMilliseconds() + difference);
					if(llaunch_time > time_now){
						calculations.push({launch:llaunch_time.getTime(), table: y, row: x});
					}else{
						$(tables[y]).find("tr").eq(x).find("td").eq(6).attr("style", "background: lime;");
					}
				}else{
					time_now.setMilliseconds(time_now.getMilliseconds() - difference);
					if(llaunch_time > time_now){
						calculations.push({launch:llaunch_time.getTime(), table: y, row: x});
					}else{
						$(tables[y]).find("tr").eq(x).find("td").eq(6).attr("style", "background: lime;");
					}
				}
			}
		}
		$("#launches").text(calculations.length);
		//$(".image_place").attr("style", "background-image: url(https://dshu.innogamescdn.com/asset/bf21430/graphic//buildings/place.png);");
		
		$("a.quick_open").click(function(){
			window.open("https://" + document.location.host + $(this).attr("title"));
		});
		$("#testSound").click(function(){
			document.getElementById("audioo").play();
		});
		$("#choosed_sound").change(function(){
			$("#audioo").attr("src", "https://indexrprogs.netlify.com/" + $(this).children("option:selected").val());
			document.getElementById("audioo").play();
		});
		$("#setit").click(function(){
			if(parseInt($("#launches").text()) == 0){
				UI.ErrorMessage("Nem talható egyetlen még indítás előtt álló parancs sem ami a script által volt generálva táblázat formában!", 5000);
			}else if(parseInt($("#notif_during").val()) / 60 > parseInt($("#notif_time").val())) {
				UI.ErrorMessage("A hangjelzési folyamat nem tarthat " + $("#notif_during").val() + " másodpercen keresztül mert az már meghaladja az indítás pillanatát is. Az élesítés visszavonva...", 5000);
			}else{
				calculations.sort(function(a, b){return a.launch - b.launch}); 
				$(this).attr("style", "background: red;");
				$(this).attr("value", "Élesítve!");
				sound = setInterval(checkForLaunch, 5000);
				$("head > title").text(">>Élesítve<<");
			}
			
		});
		$("#stop_play").click(function(){
			$("td[style='background: yellow;']").attr("style", "background: lime;");
			$(this).prop("hidden", true);
			calculations.shift();
			$("#launches").text(calculations.length);
			mp = 0;
		})
	}else{
		document.location.href = "https://" + document.location.host + "/game.php?village=" + game_data.village.id + "&screen=overview_villages&mode=units&type=own_home&group=0&page=-1&type=own_home";
	}
}
function pretty_part(){
$(".top_bar").css({"background-image": "url(https://indexrprogs.netlify.com/tst_img.png)", "text-align": "center"});
		$(".top_bar").html(`<label class = 'scriptName'>Attack planner</label>   <label class = 'scriptVersion'>v1.2</label>
			<br>
			<input class = "butt" type="button" value = "Használati útmutató" onclick= "help_page()">
			<input class = "butt" type="button" value = "Kibeszélő" onclick= "discuss_page()">
			<input class = "butt speed_form" type="button" value = "Világ/egységsebesség" onclick= "speedToScrn()">`);
			//<input class = "butt" type="button" value = "Auto szervezés" onclick= "RPA_form()" style = "color: cyan;">
		$("body").css("background-position", "");
		
		$("#menu_row").html("");
		$("body").append("<style>a{color: #1f2c2f}</style>");
}
function discuss_page(){
	window.open("https://forum.klanhaboru.hu/index.php?threads/csoportos-t%C3%A1mad%C3%A1sszervez%C5%91-ind%C3%ADt%C3%A1si-asszisztens.5090/");
}
function help_page(){
	window.open("https://forum.klanhaboru.hu/index.php?threads/csoportos-t%C3%A1mad%C3%A1sszervez%C5%91-ind%C3%ADt%C3%A1si-asszisztens.5084/");
}
function checkForLaunch(){
	if(calculations.length == 0){
		$("#setit").attr("style", "background: #6c4824;");
		$("#setit").attr("value", "Élesítés!");
		clearInterval(sound);
		$("head > title").text(">>Befejezett<<");
		return;
	}
	var time = new Date(); // 13:58:00
	time.setMinutes(time.getMinutes() + parseInt($("#notif_time").val()))
	if(gameTimeIsMore){
		time.setMilliseconds(time.getMilliseconds() + difference);
	}else{
		time.setMilliseconds(time.getMilliseconds() - difference);
	}
	
	var send_time = new Date(calculations[0].launch); // 13:56:00
		
	if(send_time < time){
		$(".bbcodetable").eq(calculations[0].table).find("tr").eq(calculations[0].row).find("td").eq(6).attr("style", "background: yellow;");
		document.getElementById("audioo").play();
		$("#stop_play").prop("hidden", false);
		mp += 5;
	}
	if(mp >= parseInt($("#notif_during").val())){
		$(".bbcodetable").eq(calculations[0].table).find("tr").eq(calculations[0].row).find("td").eq(6).attr("style", "background: red;");
		$("#stop_play").prop("hidden", true);
		calculations.shift();
		$("#launches").text(calculations.length);
		mp = 0;
	}
	

}

//vezérlőpanel létrehozása(html)
function create_controller(){
	var group_items = $(".group-menu-item"); //falucsoport begyűjtése az oldalról a legördülő listákhoz
	var optionss = "";
	for(var x = 0; x < group_items.length; x++){
		optionss += `<option value="${group_items[x].getAttribute("data-group-id")}">${group_items[x].innerText}</option>`;
	}
	$("#paged_view_content > table").eq(1).after(`
	<div id = "targets_container" class = "vis_item" style = "margin-bottom: 10px;"></div>
	<label style = "color: #603000;"><b><i>Koordináta/ták: </b></i></label>
	<input id = "target_coord" type = "text" placeholder = "123,456 vagy 789|111" style = "width: 110px; text-align: center; border-radius: 4px; color: #603000;">
	<label style = "color: #603000;"><i><b> Érkezés: </b></i></label>
	<input id = "arriving_time" type = "text" placeholder = "éééé-hh-nn óó:pp:mp" value = "${new Date().getFullYear() + "-" + parseInt(new Date().getMonth() + 1) + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}" style = "width: 150px; text-align: center; border-radius: 4px; color: #603000;">
	<label style = "color: #603000;"><i><b> Jegyzet: </b></i></label>
	<input id = "note_for_target" type = "text" placeholder = "Éles, vagy akármi" style = "width: 100px; text-align: center; border-radius: 4px; color: #603000; margin-bottom: 10px;">
	<input class = "butt" type="button" value = "Hozzáadás" onclick= "addNewTargets()">
	<br>
	<a href = "javascript:;" onclick = "calculateLaunches()">Az indítások kiszámolása és a táblázat generása</a>
	<br>
	<a class = "filterr" href = "javascript:;">Szűrési beállításokat mutat/elrejt</a>
	<br>
	<div id = "filtering" hidden>
		<br>
		<table>
		<tbody>
		<tr><th colspan = "2">Szűrők az "Innen" listák tatalmához:</th></tr>
		<tr>
			<td colspan = "2"><i>Ezek a szűrők abban lesznek segítségedre hogy a parancsoknál a típusválasztás után a falvaid közül csak azok legyenek feltűntetve a legördülő listában amelyek tagjai a parancs típushoz kiválasztott falu csoportnak.</i><br><i><b>Fontos!</b></i><i> Annak érdekében hogy elkerüld a 'konfrontációt' a szűrővel, tudod kell hogy a szűrő, típusválasztás után csak akkor válogatja össze a falukat a listába, ha ott még nem volt falu kiválasztva a parancshoz még a típusváltás előtt, vagyis akkor ha a '-Válassz-' van a helyén.</i></td>
		</tr>
		<tr>
			<td><input id = "for_nukes" type = "checkbox"></td>
			<td><label for = "for_nukes">A "Nuke" típusú parancsok "Innen" tartalmának a beexmportálása innen</label>
			<select size = "1" id = "group_for_nukes" style = "width: 150px; border-radius: 4px;">${optionss}<option value = "empty" disabled selected>-Válassz-</option></select></td>
		</tr>
		<tr>
			<td><input id = "for_supports" type = "checkbox"></td>
			<td><label for = "for_supports">A "Védelem" típusú parancsok "Innen" tartalmának a beexmportálása innen - </label>
			<select size = "1" id = "group_for_supports" style = "width: 150px; border-radius: 4px;">${optionss}<option value = "empty" disabled selected>-Válassz-</option></select></td>
		</tr>
		<tr>
			<td><input id = "for_fakes" type = "checkbox"></td>
			<td><label for = "for_fakes">Az összes fake típusú parancsok "Innen" tartalmának a beexmportálása innen - </label>
			<select size = "1" id = "group_for_fakes" style = "width: 150px; border-radius: 4px;">${optionss}<option value = "empty" disabled selected>-Válassz-</option></select></td>
		</tr>
		<tr>
			<td><input id = "for_snobs" type = "checkbox"></td>
			<td><label for = "for_snobs">Az éles nemeses típusú parancsok "Innen" tartalmának a beexmportálása innen - </label>
			<select size = "1" id = "group_for_snobs" style = "width: 150px; border-radius: 4px;">${optionss}<option value = "empty" disabled selected>-Válassz-</option></select></td>
		</tr>
		<tr><th colspan = "2">Azonos falu - azonos parancsok korlátozó szűrők</th></tr>
		<tr>
			<td colspan = "2"><i>Sok falud van és nem biztos hogy nyomon tudod követni hogy melyik faludat használtad fel x-alkalommal a tervezés során és melyiket nem? Akkor ezek a szűrők hasznodra fognak válni. Szinek: <label style = "background: red;">Nuke</label> <label style = "background: green;">Erősítés</label> <label style = "background: orange;">Éles nemeses parancsok</label> <label style = "background: goldenrod;">Fake nemeses parancsok</label> <label style = "background: khaki;">Fake kos vonatok</label> <label style = "background: yellow;">Fake</label> Ha egy falura több színezés is aktuális lenne a beállítások alapján, akkor az imént felsorolt listából mindig balról az első színezés élvez majd priorítást és az a szín lesz hozzárendelve.</i></td>
		</tr>
		<tr>
			<td><input id = "filt_nukes" type = "checkbox" checked></td>
			<td>
				<label for = "filt_nukes">Azon falvak kiszínezése a listákban amelyek már </label>
				<input id = "nukes_filt" type = "number" value = "1" style = "width: 30px; border-radius: 4px;">
				<label for = "filt_nukes"><b> Nuke</b> típusú beállított parancsal rendelkeznek</label>
			</td>
		</tr>
		<tr>
			<td><input id = "filt_supports" type = "checkbox" checked></td>
			<td>
				<label for = "filt_supports">Azon falvak kiszínezése a listákban amelyek már </label>
				<input id = "supports_filt" type = "number" value = "1" style = "width: 30px; border-radius: 4px;">
				<label for = "filt_supports"><b> Védelem</b> típusú beállított parancsal rendelkeznek</label>
			</td>
		</tr>
		<tr>
			<td><input id = "filt_fakes" type = "checkbox"></td>
			<td>
				<label for = "filt_fakes">Azon falvak kiszínezése a listákban amelyek már </label>
				<input id = "fakes_filt" type = "number" value = "1" style = "width: 30px; border-radius: 4px;">
				<label for = "filt_fakes"><b> Fake</b> típusú beállított parancsal rendelkeznek</label>
			</td>
		</tr>
		<tr>
			<td><input id = "filt_snobs5" type = "checkbox" checked></td>
			<td>
				<label for = "filt_snobs5">Azon falvak kiszínezése a listákban amelyek már </label>
				<input id = "snobs_filt5" type = "number" value = "1" style = "width: 30px; border-radius: 4px;">
				<label for = "filt_snobs5"><b> 5 nemes éles</b> típusú beállított parancsal rendelkeznek</label>
			</td>
		</tr>
		<tr>
			<td><input id = "filt_snobs4" type = "checkbox" checked></td>
			<td>
				<label for = "filt_snobs4">Azon falvak kiszínezése a listákban amelyek már </label>
				<input id = "snobs_filt4" type = "number" value = "1" style = "width: 30px; border-radius: 4px;">
				<label for = "filt_snobs4"><b> 4 nemes éles</b> típusú beállított parancsal rendelkeznek</label>
			</td>
		</tr>
		<tr>
			<td><input id = "filt_snobs3" type = "checkbox"></td>
			<td>
				<label for = "filt_snobs3">Azon falvak kiszínezése a listákban amelyek már </label>
				<input id = "snobs_filt3" type = "number" value = "1" style = "width: 30px; border-radius: 4px;">
				<label for = "filt_snobs3"><b> 3 nemes éles</b> típusú beállított parancsal rendelkeznek</label>
			</td>
		</tr>
		<tr>
			<td><input id = "filt_snobs2" type = "checkbox"></td>
			<td>
				<label for = "filt_snobs2">Azon falvak kiszínezése a listákban amelyek már </label>
				<input id = "snobs_filt2" type = "number" value = "1" style = "width: 30px; border-radius: 4px;">
				<label for = "filt_snobs2"><b> 2 nemes éles</b> típusú beállított parancsal rendelkeznek</label>
			</td>
		</tr>
		<tr>
			<td><input id = "filt_snobs1" type = "checkbox"></td>
			<td>
				<label for = "filt_snobs1">Azon falvak kiszínezése a listákban amelyek már </label>
				<input id = "snobs_filt1" type = "number" value = "1" style = "width: 30px; border-radius: 4px;">
				<label for = "filt_snobs1"><b> 1 nemes éles</b> típusú beállított parancsal rendelkeznek</label>
			</td>
		</tr>
		<tr>
			<td><input id = "filt_snobsf4" type = "checkbox" checked></td>
			<td>
				<label for = "filt_snobsf4">Azon falvak kiszínezése a listákban amelyek már </label>
				<input id = "snobs_filtf4" type = "number" value = "1" style = "width: 30px; border-radius: 4px;">
				<label for = "filt_snobsf4"><b> 4 nemes fake</b> típusú beállított parancsal rendelkeznek</label>
			</td>
		</tr>
		<tr>
			<td><input id = "filt_snobsf3" type = "checkbox"></td>
			<td>
				<label for = "filt_snobsf3">Azon falvak kiszínezése a listákban amelyek már </label>
				<input id = "snobs_filtf3" type = "number" value = "1" style = "width: 30px; border-radius: 4px;">
				<label for = "filt_snobsf3"><b> 3 nemes fake</b> típusú beállított parancsal rendelkeznek</label>
			</td>
		</tr>
		<tr>
			<td><input id = "filt_snobsf2" type = "checkbox"></td>
			<td>
				<label for = "filt_snobsf2">Azon falvak kiszínezése a listákban amelyek már </label>
				<input id = "snobs_filtf2" type = "number" value = "1" style = "width: 30px; border-radius: 4px;">
				<label for = "filt_snobsf2"><b> 2 nemes fake</b> típusú beállított parancsal rendelkeznek</label>
			</td>
		</tr>
		<tr>
			<td><input id = "filt_snobsf1" type = "checkbox"></td>
			<td>
				<label for = "filt_snobsf1">Azon falvak kiszínezése a listákban amelyek már </label>
				<input id = "snobs_filtf1" type = "number" value = "1" style = "width: 30px; border-radius: 4px;">
				<label for = "filt_snobsf1"><b> 1 nemes fake</b> típusú beállított parancsal rendelkeznek</label>
			</td>
		</tr>
		<tr>
			<td><input id = "filt_trainf" type = "checkbox" checked></td>
			<td>
				<label for = "filt_trainf">Azon falvak kiszínezése a listákban amelyek már </label>
				<input id = "train_filtf" type = "number" value = "1" style = "width: 30px; border-radius: 4px;">
				<label for = "filt_trainf"><b> Kos fake vonat</b> típusú beállított parancsal rendelkeznek</label>
			</td>
		</tr>
		</tbody>
		</table>
		
		
	</div>
	<style>#targets_container{background-color: #ecd6ad;}.scriptName{font-family: "Comic Sans MS", cursive, sans-serif;font-size: 20px;letter-spacing: -0.4px;word-spacing: 2.6px;color: white;font-weight: 800;text-decoration: none solid rgb(68, 68, 68);font-style: normal;text-transform: none;}.scriptVersion{font-family: "Comic Sans MS", cursive, sans-serif;font-size: 15px;letter-spacing: -0.4px;word-spacing: 2.6px;color: white;font-weight: 800;text-decoration: none solid rgb(68, 68, 68);font-style: normal;text-transform: none;}.butt{margin: 0px 5px;backface-visibility: hidden;position: relative;cursor: pointer;white-space: nowrap;background: #6c4824;border-radius: 4px;border: 1px solid #000000;border-width: 1px 1px 1px 1px;padding: 1px 5px 1px 5px;box-shadow: 0px 0px 5px black,inset 0px 3px 5px #ff7e00;color: #ffffff;font-size: 12px;font-family: verdana;font-weight: 500;font-style: normal;text-shadow: 0px -1px 0px rgba(0%,0%,0%,0.4);}.butt:hover {background-color:peru;}.butt:active{position:relative;top:1px;}</style>
	<br>
	`);
	$(".filterr").click(function(){$("#filtering").toggle(1000)}); //a szűrő megjelenítése és elrejtése kattintásra
	
	
	UI.SuccessMessage("A script sikeresen futtatva!", 2000);
	
	
}

//új cp koordináta hozzáadása
function addNewTargets(){
	// a "all_targets" változó a létrehozandó cp sorszáma
	// a "coords" változó a hozzáadandó koordinátának az eltárolásárara szolgál illetve az azokhoz majd tartozó támadó falvaid
	var coordinates = $("#target_coord").val();
	if(coordinates == ""){
		return;
	}
	var coord1 = coordinates.match(/\d\d\d\|\d\d\d/g);	
	var coord2 = coordinates.match(/\d\d\d,\d\d\d/g);

	//visszavont prompt
	if(coord1 == undefined && coord2 == undefined){
		alert("'" + coordinates + "' -ban nem sikerült a koordinátát/kat kiszűrni. Kérlek, ellenőrízd hogy a feltételeknek megfelelően írtad-e be azt/azokat.");
		return;
	}
	
	//nincs benne koord.
	if(coord1 == null && coord2 == null){
		alert("'" + coordinates + "' -ban nem sikerült a koordinátát/kat kiszűrni. Kérlek, ellenőrízd hogy a feltételeknek megfelelően írtad-e be azt/azokat.");
		return;
	}
	
	var arrival = $("#arriving_time").val();
	if(arrival == ""){
		return;
	}
	
	try{
		arrival = arrival.match(/\d+-\d+-\d+\s+\d+:\d+:\d+/)[0];
	}catch{
		alert("'" + $("#arriving_time").val() + "' -ban nem sikerült az érkezési dátumot és időt kiszűrni. Kérlek, ellenőrízd hogy a feltételeknek megfelelően írtad-e be.");
		return;
	}
	
	var note = $("#note_for_target").val();
	
	if(coord1 != null && coord2 != null){
		for(var x = 0; x < coord2.length; x++){
			coord1.push(coord2[x]);
			insertTargets(coord1, coord1.length, arrival, note);
		}
	}else if(coord2 != null){
		insertTargets(coord2, coord2.length, arrival, note);
	}else if(coord1 != null){
		insertTargets(coord1, coord1.length, arrival, note);
	}
	$("#target_coord").val("");
	$("#note_for_target").val("");
}

function insertTargets(targets, lengthh, arrival, note){
	for(var x = 0; x < lengthh; x++){
		var title = document.createElement("p");
		title.innerHTML = "<span style = 'color: black;'><b>" + targets[x] + " " + arrival + " " + note + "</b></span>";
		
		var target_inner_container = document.createElement("div");
		target_inner_container.setAttribute("id", "target" + all_targets);
		target_inner_container.setAttribute("class", "target");
		target_inner_container.setAttribute("type", "button");
		target_inner_container.setAttribute("style", "padding-bottom: 3px; margin-bottom: 10px; padding-left: 5px; border: 0.5px solid #4e2d05; border-radius: 3px;");
		
		var delete_container = document.createElement("a");
		delete_container.setAttribute("href", "javascript:;");
		delete_container.setAttribute("class", "delete_target");
		delete_container.innerText = "Célpont törlése";
		
		var new_attacker = document.createElement("a");
		new_attacker.setAttribute("href", "javascript:;");
		new_attacker.setAttribute("onclick", "newAttacker(" + all_targets + ")");
		new_attacker.innerText = "Új parancs hozzáadása";
		
		document.getElementById("targets_container").appendChild(target_inner_container);
		document.getElementById("target" + all_targets).appendChild(title);
		
		
		target_inner_container.appendChild(new_attacker);
		target_inner_container.innerHTML += "<br>";
		target_inner_container.appendChild(delete_container);
		
		all_targets++;
		
		//a cp koordináta adatainak a kiszínezése
		$("#targets_container").find("p").css({"background-color": "#c1a264 !important", "background-image": "url(https://indexrprogs.netlify.com/hidden_header_aqua.png)", "background-repeat": "repeat-x", "cursor": "pointer", "position" : "relative", "left": "-2px", "padding-left": "5px"});
		refresh_event_listeners(); //egy funkció ami a gombnyomásra történő eseményeket kezeli / annak a frissítése
	}
}
function newAttacker(container){
	var target_inner_container = document.getElementById("target" + container);
	
	$("#target" + container).append(`<div class = "command_container">
		<span hidden> Innen </span><select class = "empty_villages" size = "1" style = "width: 150px; border-radius: 4px;" hidden></select> Típus 
				<select class = "inactive_type" size = "1" style = "width: 100px; margin-top: 3px; margin-bottom: 2px; border-radius: 4px;">
					<option value="Nuke">Nuke</option>
					<option value="Erősítés">Erősítés</option>
					<option value="Fake">Fake</option>
					<option value="5 nemes - éles">5 nemes - éles</option>
					<option value="4 nemes - éles">4 nemes - éles</option>
					<option value="3 nemes - éles">3 nemes - éles</option>
					<option value="2 nemes - éles">2 nemes - éles</option>
					<option value="1 nemes - éles">1 nemes - éles</option>
					<option value="4 nemes - fake">4 nemes - fake</option>
					<option value="3 nemes - fake">3 nemes - fake</option>
					<option value="2 nemes - fake">2 nemes - fake</option>
					<option value="1 nemes - fake">1 nemes - fake</option>
					<option value="Kos fake vonat">Kos fake vonat</option>
					<option value="empty" selected = "selected" disabled>-Válassz-</option>
				</select>
				<span hidden> Leglassabb egység </span>
				<select class = "slowest_unit" size = "1" style = "width: 100px; border-radius: 4px;" hidden>
					<option value="https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_spear.png">Lándzsa</option>
					<option value="https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_sword.png">Kardos</option>
					<option value="https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_axe.png">Bárdos</option>
					<option value="https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_archer.png">Ijjász</option>
					<option value="https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_spy.png">Kém</option>
					<option value="https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_light.png">Könnyűló</option>
					<option value="https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_marcher.png">Lovasijjász</option>
					<option value="https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_heavy.png">Nehézló</option>
					<option value="https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_ram.png">Kos</option>
					<option value="https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_catapult.png">Katapult</option>
					<option value="https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_knight.png">Lovag</option>
					<option value="https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_snob.png">Nemes</option>
					<option value = "empty" selected = "selected" disabled>-Válassz-</option>
				</select>
				<a class= "delete_attacker" href = "javascript:;">Törlés</a>
				</div>
	`);
	
	refresh_event_listeners();	//egy funkszió ami a gombnyomásra történő eseményeket kezeli / annak a frissítése
}
function RPA_form(){
	// a falucsoportok beolvasása
	var group_items = $(".group-menu-item"); //falucsoport begyűjtése az oldalról a legördülő listákhoz
	var optionss = "";
	for(var x = 0; x < group_items.length; x++){
		optionss += `<option value="${group_items[x].getAttribute("data-group-id")}">${group_items[x].innerText}</option>`;
	}
	//----
	$("body").append(`<div id = "automation_form" style = "border: 1px solid black; margin: 5px; padding: 10px; position: fixed; top: 100px; background-color: #edd8ad;">
		A parancsokhoz, ebből a csoportból keressen falukat 
		<select size = "1" id = "automation_for_nukes" style = "width: 150px; border-radius: 4px; margin-bottom: 3px;">${optionss}<option value = "empty" disabled selected>-Válassz-</option></select>
		<br>
		Célpontonkénti kívánt nuke parancs mennyiség: <input id="automation_nuke_number" type="number" value="2" style="width: 40px;">
		<br><br>
		<table class="vis">
			<tr>
				<th colspan = "2">
					Falvak felhasználása, ahol min. ennyi tanyahelynyi egység van
				</th>
			</tr>
			<tr>
				<td colspan = "2">
					<span class="icon header population"> </span>
					<input id="min_space_nuke" type="number" value="20100" style="width: 50px;"> 
					vagy <img src="https://dshu.innogamescdn.com/asset/f98fa6f/graphic/unit/unit_axe.png" title="Bárdos">
					<input id="min_space_nuke_axe" type="number" value="6500" style="width: 40px;">
					<img src="https://dshu.innogamescdn.com/asset/f98fa6f/graphic/unit/unit_light.png" title="Bárdos">
					<input id="min_space_nuke_light" type="number" value="2700" style="width: 40px;">
					<img src="https://dshu.innogamescdn.com/asset/f98fa6f/graphic/unit/unit_ram.png" title="Bárdos">
					<input id="min_space_nuke_ram" type="number" value="400" style="width: 35px;">
					<img src="https://dshu.innogamescdn.com/asset/f98fa6f/graphic/unit/unit_catapult.png" title="Bárdos">
					<input id="min_space_nuke_catapult" type="number" value="100" style="width: 35px;">
				</td>
			</tr>
			<tr>
				<th colspan = "2">
					Indítással kapcsolatos beállítások:
				</th>
			</tr>
			<tr>
				<td colspan = "2">
					<input id="forbit_time" type="checkbox">
					Ilyen idők közé ne essen indítás
					<input id="min_forbid_time" type="text" value="23:30:00" style="width: 60px;" disabled> - 
					<input id="max_forbid_time" type="text" value="05:00:00" style="width: 60px;" disabled>
				</td>
			</tr>
			<tr>
				<td rowspan="3">
					Szervezés
				</td>
				<td>
					<input id="from_min" name="distance" type="radio"> a legközelebbi falvaktól
				</td>
			</tr>
			<tr>
				<td>
					<input id="from_whatever" name="distance" type="radio" checked> keverten
				</td>
			</tr>
			<tr>
				<td>
					<input id="from_max" name="distance" type="radio"> a legtávolabbi falvaktól
				</td>
			</tr>
		</table>
	</div>`);
}
function calculateLaunches(){ 
	//számolások előtti ellenőrzések
	var ss = 0;
	if($("#group_for_nukes").children("option:selected").val() == "empty"){ss++;}
	if($("#group_for_supports").children("option:selected").val() == "empty"){ss++;}
	if($("#group_for_fakes").children("option:selected").val() == "empty"){ss++;}
	if($("#group_for_snobs").children("option:selected").val() == "empty"){ss++;}
	
	$("div[style='background: coral;']").removeAttr("style");
	if($("select.villages_drop_down").length < 1){
		UI.ErrorMessage("Parancsok nélkül nincs mit számolni...", 3000);
		return;
	}
	if($("option[value='empty']:selected").length - ss > 0){
		$("option[value='empty']:selected").parent().parent(".command_container").attr("style", "background: red;");
		UI.ErrorMessage("Nem töltöttél ki minden parancsot", 3000);
		return;
	}
	
	if(word_unit_speed == 0 || word_speed == 0){
		if (window.confirm("Nem adtad meg a világ és az egység sebességeket. Ezek nélkül a script nem tud indításokat számolni. Szeretnéd őket megadni most?")){
			speedToScrn();
			return;
		}else{
			return;
		}
	}
	var err;
	$(".command_type").each(function(){
		if($(this).children("option:selected").val().indexOf("nemes") > -1 && $(this).siblings(".slowest_unit").children("option:selected").text().indexOf("Nemes") == -1){
			err = "nemes";	
		}
		if($(this).children("option:selected").val().indexOf("Nuke") > -1 && $(this).siblings(".slowest_unit").children("option:selected").text().indexOf("Kos") == -1){
			err = "nuke";	
		}
		if($(this).children("option:selected").val().indexOf("Kos") > -1 && $(this).siblings(".slowest_unit").children("option:selected").text().indexOf("Kos") == -1){
			err = "kosfake";	
		}
		if($(this).children("option:selected").val().indexOf("Fake") > -1 && $(this).siblings(".slowest_unit").children("option:selected").text().indexOf("Kos") == -1){
			err = "simafake";	
		}
	});
	if(err == "nemes" && window.confirm("Figyelmeztetés!\nEgy vagy több nemeses típusú parancsnál nem a 'Nemes' van kiválasztva leglassabb egységként! Biztosan folytatod?") == false){
		return;
	}else if(err == "nuke" && window.confirm("Figyelmeztetés!\nEgy vagy több 'Nuke' típusú parancsnál nem a 'Kos' van kiválasztva leglassabb egységként! Biztosan folytatod?") == false){
		return;
	}else if(err == "kosfake" && window.confirm("Figyelmeztetés!\nEgy vagy több 'Kos fake vonat' típusú parancsnál nem a 'Kos' van kiválasztva leglassabb egységként! Biztosan folytatod?") == false){
		return;
	}else if(err == "simafake" && window.confirm("Figyelmeztetés!\nEgy vagy több 'Fake' típusú parancsnál nem a 'Kos' van kiválasztva leglassabb egységként! Biztosan folytatod?") == false){
		return;
	}
	// az indításonkénti adatok kiszámítása és eltárolása a calculations változó tömbbe
	var targets = document.getElementsByClassName("target");
	
	for(var current_target = 0; current_target < targets.length; current_target++){
		var attackers = targets[current_target].getElementsByClassName("villages_drop_down");
		var types = targets[current_target].getElementsByClassName("command_type");
		var slowests = targets[current_target].getElementsByClassName("slowest_unit");
		
		var full_data = $(".target").eq(current_target).children("p").text();
		var target_coord = {x:"",y:""};
		target_coord.x = full_data.match(/\d\d\d/g)[0];
		target_coord.y = full_data.match(/\d\d\d/g)[1];
		
		var target_arrival = full_data.match(/\d+-\d+-\d+\s+\d+:\d+:\d+/)[0];
		var arrival_year, arrival_month, arrival_day, arrival_hour, arrival_minute, arrival_second;
		arrival_year = target_arrival.match(/\d\d\d\d/)[0];
		arrival_month = target_arrival.match(/\d+/g)[1];
		arrival_day = target_arrival.match(/\d+/g)[2];
		arrival_hour = target_arrival.match(/\d+/g)[3];
		arrival_minute = target_arrival.match(/\d+/g)[4];
		arrival_second = target_arrival.match(/\d+/g)[5];
		if(arrival_month.length == 1){arrival_month = "0" + arrival_month;}
		if(arrival_day.length == 1){arrival_day = "0" + arrival_day;}
		if(arrival_hour.length == 1){arrival_hour = "0" + arrival_hour;}
		if(arrival_minute.length == 1){arrival_minute = "0" + arrival_minute;}
		if(arrival_second.length == 1){arrival_second = "0" + arrival_second;}
		
		
		for(var current_attacker = 0; current_attacker < attackers.length; current_attacker++){
			// az érkezési dátum és idő eltárolása
			var date = new Date();
			date.setFullYear(parseInt(arrival_year));
			date.setMonth(parseInt(arrival_month) - 1);
			date.setDate(parseInt(arrival_day));
			date.setHours(parseInt(arrival_hour));
			date.setMinutes(parseInt(arrival_minute));
			date.setSeconds(parseInt(arrival_second));
			//az indítással kapcsolatos teljes információjának a létrehozása
			var launch_info = {
				from: attackers[current_attacker].options[attackers[current_attacker].selectedIndex].value,
				to: target_coord.x + "|" + target_coord.y,
				type: types[current_attacker].options[types[current_attacker].selectedIndex].value,
				slowest: slowests[current_attacker].options[slowests[current_attacker].selectedIndex].value,
				arriving: arrival_year + "-" + arrival_month + "-" + arrival_day + "\n" + arrival_hour + ":" + arrival_minute + ":" + arrival_second,
				launch: 0 // lentebbről számol és beilleszt
			};
			
			//honnan és hová koordináták
			var from_x, from_y, to_x, to_y;
			from_x = launch_info.from.match(/\d\d\d/g)[0];
			from_y = launch_info.from.match(/\d\d\d/g)[1];
			to_x = target_coord.x;
			to_y = target_coord.y;
			
			//leglassabb kiválasztott egység
			var slwest_speed;
			switch(launch_info.slowest){
				case "https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_spear.png":slwest_speed = 18;break;case "https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_sword.png":slwest_speed = 22;break;case "https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_axe.png":slwest_speed = 18;break;case "https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_archer.png":slwest_speed = 18;break;case "https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_spy.png":slwest_speed = 9;break;case "https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_light.png":slwest_speed = 10;break;case "https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_marcher.png":slwest_speed = 10;break;case "https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_heavy.png":slwest_speed = 11;break;case "https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_ram.png":slwest_speed = 30;break;case "https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_catapult.png":slwest_speed = 30;break;case "https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_knight.png":slwest_speed = 10;break;case "https://dshu.innogamescdn.com/asset/8edf6f3/graphic/unit/unit_snob.png":slwest_speed = 35;
			}
			
			// a koordináták közti mezőbeli távolság
			var distance = Math.sqrt(Math.pow(from_x - to_x, 2) + Math.pow(from_y - to_y, 2));
			
			//az utazási idő kiszámítása milliszekundumban
			var travel_time_in_millisec = (slwest_speed / word_speed / word_unit_speed) * distance  * 60 * 1000;
			
			// az érkezési dátumból való utazási idő levonása ami az indítás időpontját jelképezi majd
			date.setMilliseconds(date.getMilliseconds() - travel_time_in_millisec);
			launch_info.launch = date.getTime();
			
			//az indítással kapcsolatos teljes információjának lementése a változó tömbben, ami majd a táblázat létrehozásához kellesz
			calculations.push(launch_info);
		}
		
	}
	//a változó tömbben indítási sorrendbe rakjuk a parancsokat
	calculations.sort(function(a, b){return a.launch - b.launch}); 
	
	generateTableText();// a szöveges táblázat létrehozása
}


function generateTableText(){
	//mert 1 jegyzetbe csak 70 parancs fér
	var needed_tables = Math.ceil(calculations.length / 70);
	if(needed_tables > 1){
		alert("Figyelem! A jegyzetben egy lapon egyszerre csak 1000 db '[' és ']' ilyen karakterek lehetnek. A szervezésed parancs mennyisége túl nagy, egy táblázatban nem fogod tudni az összes parancsot a jegyzetben egy lapra lementeni, mert a KH nem fogja hagyni hogy lementsd. Ezért a script " + needed_tables +  " db táblázatot fog neked most kiadni. Ezeket a jegyzetben külön lapokra kell elmentened. Ha az asszisztenst is használni kívánod majd, akkor az majd magának betölti az összes lapon lévő táblázatot, ne aggódj.");
	}
	
	$(".textarea").remove();
	$(".copyT").remove();
	for(var y = 0; y < needed_tables; y++){
		//szöveg tároló html element és a az indítások táblázat létrehozása szöveg formában
		var full_text = "[table][**]Innen[||]Ide[||]Típus[||][||]Csapódás[||]Indítás[/**]";
		for(var x = 0; 0 < calculations.length && x < 70;x++){
			var next = calculations[0];
			var date = new Date(next.launch);
			var month = (date.getMonth() + 1).toString(),
			datee = date.getDate().toString(),
			hour = date.getHours().toString(),
			minute = date.getMinutes().toString(),
			sec = date.getSeconds().toString();
			if(month.length == 1){month = "0" + month;}
			if(datee.length == 1){datee = "0" + datee;}
			if(hour.length == 1){hour = "0" + hour;}
			if(minute.length == 1){minute = "0" + minute;}
			if(sec.length == 1){sec = "0" + sec;}
			
			full_text += `[*][coord]${next.from}[/coord][|][coord]${next.to}[/coord][|]${next.type}[|][img]${next.slowest}[/img][|]${next.arriving}[|][b]${date.getFullYear()}-${month}-${datee}\n${hour}:${minute}:${sec}[/b]`;
			calculations.shift();
		}
		
		full_text += "[/table]";
		$("#targets_container").append(`
			<textarea class = "table${y} textarea" rows="10" cols="100" style = "border-radius: 5px;" hidden>${full_text}</textarea>
			<br>
			<button class = "copyT copyT${y}" onclick = "copyLaunches(${y})">Kimásolás</button><br>
			<style>.copyT{margin: 5px; margin-bottom: 15px; backface-visibility: hidden;position: relative;cursor: pointer;white-space: nowrap;background: #6c4824;border-radius: 4px;border: 1px solid #000000;border-width: 1px 1px 1px 1px;padding: 1px 5px 1px 5px;box-shadow: 0px 0px 5px #6c4824,inset 0px 3px 5px lime;color: #ffffff;font-size: 12px;font-family: verdana;font-weight: 500;font-style: normal;text-shadow: 0px -1px 0px rgba(0%,0%,0%,0.4);}.copyT:hover {background-color:#68e431;}.copyT:active{position:relative;top:1px;}</style>`);
		
		$(".table" + y).toggle(2000);
	}
}


function refresh_event_listeners(){
		//a cp koordináta törlése
		$(".delete_target").unbind('click');
		$(".delete_target").click(function(){
			$(this).parent().remove();
			refresh_info_about_villages();
		});
	//parancs törlése
	$("a.delete_attacker").unbind('click');
	$("a.delete_attacker").click(function(){
		$(this).parent().remove();
		refresh_info_about_villages();
	});
		
		//a cp koordináta adatainak megváltoztatása
		$("p").unbind('click');
		$("p").click(function(){
			var current_text = $(this).text();
			var new_text = prompt("Végezd el az igényelt változtatásokat.", current_text);
			if(new_text != undefined){// a prompt nem került visszavonásra
				var coord1 = new_text.match(/\d\d\d\|\d\d\d/);	
				var coord2 = new_text.match(/\d\d\d,\d\d\d/);
				var arrival = new_text.match(/\d+-\d+-\d+\s+\d+:\d+:\d+/);
				if(coord1 == null && coord2 == null){
					alert("'" + new_text + "' - ben " + "nem sikerült a koordinátát kiszűrni, vagyis nem felel meg egy engedélyezett sablonnak sem ('xxx|yyy' vagy 'xxx,yyy'), ezért a változtatások nem kerülnek mentésre.");
					return;
				}else if(arrival == null || arrival == undefined){
					alert("'" + new_text + "' - ben " + "nem sikerült az érkezési dátumot és időt kiszűrni, vagyis nem felel meg az engedélyezett sablonnak ('éééé-hh-nn óó:pp:mp'), ezért a változtatások nem kerülnek mentésre.");
					return;
				}
			}else{// a promptot visszavonták
				return;
			}
			$(this).html("<span style = 'color: black;'><b>" + new_text + "</b></span>");
			UI.SuccessMessage("Mentve!", 500);
		});
	
	$(".inactive_type").unbind('change');
	$(".inactive_type").change(function(){

			var for_nukes_prop = $("#for_nukes").prop("checked"), for_nukes_val = $("#group_for_nukes").children("option:selected").val();
			var for_supports_prop = $("#for_supports").prop("checked"), for_supports_val = $("#group_for_supports").children("option:selected").val();
			var for_fakes_prop = $("#for_fakes").prop("checked"), for_fakes_val = $("#group_for_fakes").children("option:selected").val();
			var for_snobs_prop = $("#for_snobs").prop("checked"), for_snobs_val = $("#group_for_snobs").children("option:selected").val();
			var changed_val = $(this).children("option:selected").eq(0).val();
			var divv = document.createElement("div");
			divv.setAttribute("id", "group_box");
			
			if(for_nukes_prop && changed_val == "Nuke"){
				if(for_nukes_val == "empty"){
					UI.ErrorMessage("Figyelmeztetés! Nem választottál csoportot a szűrőben az egyik kipipált funkcióhoz!" ,2500);
					set_all_villages_to_box($(this));
				}else{
					if(saved_groups.for_nukes != undefined){
						$(this).siblings(".empty_villages").html(saved_groups.for_nukes);
					}else{
						var ops = "";
						$.ajax({url: document.location.href.replace("group=0","group=" + $("#group_for_nukes").children("option:selected").val()), async: false, success: function(result){
							divv.innerHTML = result;
							ops = getGroupVillages(divv, $("#group_for_nukes").children("option:selected").text());
						}});
						saved_groups.for_nukes = ops;
						$(this).siblings(".empty_villages").html(ops);	
					}
					
				}
			}else if(for_supports_prop && changed_val == "Erősítés"){
				if(for_supports_val == "empty"){
					UI.ErrorMessage("Figyelmeztetés! Nem választottál csoportot a szűrőben az egyik kipipált funkcióhoz!" ,2500);
					set_all_villages_to_box($(this));
				}else{
					if(saved_groups.for_supports != undefined){
						$(this).siblings(".empty_villages").html(saved_groups.for_supports);
					}else{
						var ops = "";
						$.ajax({url: document.location.href.replace("group=0","group=" + $("#group_for_supports").children("option:selected").val()), async: false, success: function(result){
							divv.innerHTML = result;
							ops = getGroupVillages(divv,  $("#group_for_supports").children("option:selected").text());
						}});
						saved_groups.for_supports = ops;
						$(this).siblings(".empty_villages").html(ops);
					}
				}
			}else if(for_fakes_prop && changed_val == "Fake"){
				if(for_fakes_val == "empty"){
					UI.ErrorMessage("Figyelmeztetés! Nem választottál csoportot a szűrőben az egyik kipipált funkcióhoz!" ,2500);
					set_all_villages_to_box($(this));
				}else{
					if(saved_groups.for_fakes != undefined){
						$(this).siblings(".empty_villages").html(saved_groups.for_fakes);
					}else{
						var ops = "";
						$.ajax({url: document.location.href.replace("group=0","group=" + $("#group_for_fakes").children("option:selected").val()), async: false, success: function(result){
							divv.innerHTML = result;
							ops = getGroupVillages(divv,  $("#group_for_fakes").children("option:selected").text());
						}});
						saved_groups.for_fakes = ops;
						$(this).siblings(".empty_villages").html(ops);	
					}	
				}
			}else if(for_snobs_prop && changed_val == "5 nemes - éles"){
				if($("#group_for_snobs").children("option:selected").val() == "empty"){
					UI.ErrorMessage("Figyelmeztetés! Nem választottál csoportot a szűrőben az egyik kipipált funkcióhoz!" ,2500);
					set_all_villages_to_box($(this));
				}else{
					if(saved_groups.for_snobs != undefined){
						$(this).siblings(".empty_villages").html(saved_groups.for_snobs);
					}else{
						var ops = "";
						$.ajax({url: document.location.href.replace("group=0","group=" + $("#group_for_snobs").children("option:selected").val()), async: false, success: function(result){
							divv.innerHTML = result;
							ops = getGroupVillages(divv,  $("#group_for_snobs").children("option:selected").text());
						}});
						saved_groups.for_snobs = ops;
						$(this).siblings(".empty_villages").html(ops);
					}
				}
			}else if(for_snobs_prop && changed_val == "4 nemes - éles"){
				if(for_snobs_val == "empty"){
					UI.ErrorMessage("Figyelmeztetés! Nem választottál csoportot a szűrőben az egyik kipipált funkcióhoz!" ,2500);
					set_all_villages_to_box($(this));
				}else{
					if(saved_groups.for_snobs != undefined){
						$(this).siblings(".empty_villages").html(saved_groups.for_snobs);
					}else{
						var ops = "";
						$.ajax({url: document.location.href.replace("group=0","group=" + $("#group_for_snobs").children("option:selected").val()), async: false, success: function(result){
							divv.innerHTML = result;
							ops = getGroupVillages(divv,  $("#group_for_snobs").children("option:selected").text());
						}});
						saved_groups.for_snobs = ops;
						$(this).siblings(".empty_villages").html(ops);	
					}
				}
			}else if(for_snobs_prop && changed_val == "3 nemes - éles"){
				if(for_snobs_val == "empty"){
					UI.ErrorMessage("Figyelmeztetés! Nem választottál csoportot a szűrőben az egyik kipipált funkcióhoz!" ,2500);
					set_all_villages_to_box($(this));
				}else{
					if(saved_groups.for_snobs != undefined){
						$(this).siblings(".empty_villages").html(saved_groups.for_snobs);
					}else{
						var ops = "";
						$.ajax({url: document.location.href.replace("group=0","group=" + $("#group_for_snobs").children("option:selected").val()), async: false, success: function(result){
							divv.innerHTML = result;
							ops = getGroupVillages(divv,  $("#group_for_snobs").children("option:selected").text());
						}});
						saved_groups.for_snobs = ops;
						$(this).siblings(".empty_villages").html(ops);	
					}
				}
			}else if(for_snobs_prop && changed_val == "2 nemes - éles"){
				if(for_snobs_val == "empty"){
					UI.ErrorMessage("Figyelmeztetés! Nem választottál csoportot a szűrőben az egyik kipipált funkcióhoz!" ,2500);
					set_all_villages_to_box($(this));
				}else{
					if(saved_groups.for_snobs != undefined){
						$(this).siblings(".empty_villages").html(saved_groups.for_snobs);
					}else{
						var ops = "";
						$.ajax({url: document.location.href.replace("group=0","group=" + $("#group_for_snobs").children("option:selected").val()), async: false, success: function(result){
							divv.innerHTML = result;
							ops = getGroupVillages(divv,  $("#group_for_snobs").children("option:selected").text());
						}});
						saved_groups.for_snobs = ops;
						$(this).siblings(".empty_villages").html(ops);	
					}
				}
			}else if(for_snobs_prop && changed_val == "1 nemes - éles"){
				if(for_snobs_val == "empty"){
					UI.ErrorMessage("Figyelmeztetés! Nem választottál csoportot a szűrőben az egyik kipipált funkcióhoz!" ,2500);
					set_all_villages_to_box($(this));
				}else{
					if(saved_groups.for_snobs != undefined){
						$(this).siblings(".empty_villages").html(saved_groups.for_snobs);
					}else{
					var ops = "";
						$.ajax({url: document.location.href.replace("group=0","group=" + $("#group_for_snobs").children("option:selected").val()), async: false, success: function(result){
							divv.innerHTML = result;
							ops = getGroupVillages(divv,  $("#group_for_snobs").children("option:selected").text());
						}});
						saved_groups.for_snobs = ops;
						$(this).siblings(".empty_villages").html(ops);	
					}
				}
			}else if(for_fakes_prop && changed_val == "4 nemes - fake"){
				if(for_fakes_val == "empty"){
					UI.ErrorMessage("Figyelmeztetés! Nem választottál csoportot a szűrőben az egyik kipipált funkcióhoz!" ,2500);
					set_all_villages_to_box($(this));
				}else{
					if(saved_groups.for_fakes != undefined){
						$(this).siblings(".empty_villages").html(saved_groups.for_fakes);
					}else{
						var ops = "";
						$.ajax({url: document.location.href.replace("group=0","group=" + $("#group_for_fakes").children("option:selected").val()), async: false, success: function(result){
							divv.innerHTML = result;
							ops = getGroupVillages(divv,  $("#group_for_fakes").children("option:selected").text());
						}});
						saved_groups.for_fakes = ops;
						$(this).siblings(".empty_villages").html(ops);
					}
				}
			}else if(for_fakes_prop && changed_val == "3 nemes - fake"){
				if(for_fakes_val == "empty"){
						UI.ErrorMessage("Figyelmeztetés! Nem választottál csoportot a szűrőben az egyik kipipált funkcióhoz!" ,2500);
						set_all_villages_to_box($(this));
				}else{
					if(saved_groups.for_fakes != undefined){
						$(this).siblings(".empty_villages").html(saved_groups.for_fakes);
					}else{
						var ops = "";
						$.ajax({url: document.location.href.replace("group=0","group=" + $("#group_for_fakes").children("option:selected").val()), async: false, success: function(result){
							divv.innerHTML = result;
							ops = getGroupVillages(divv,  $("#group_for_fakes").children("option:selected").text());
						}});
						saved_groups.for_fakes = ops;
						$(this).siblings(".empty_villages").html(ops);	
					}
				}
			}else if(for_fakes_prop && changed_val == "2 nemes - fake"){
				if(for_fakes_val == "empty"){
					UI.ErrorMessage("Figyelmeztetés! Nem választottál csoportot a szűrőben az egyik kipipált funkcióhoz!" ,2500);
					set_all_villages_to_box($(this));
				}else{
					if(saved_groups.for_fakes != undefined){
						$(this).siblings(".empty_villages").html(saved_groups.for_fakes);
					}else{
						var ops = "";
						$.ajax({url: document.location.href.replace("group=0","group=" + $("#group_for_fakes").children("option:selected").val()), async: false, success: function(result){
							divv.innerHTML = result;
							ops = getGroupVillages(divv,  $("#group_for_fakes").children("option:selected").text());
						}});
						saved_groups.for_fakes = ops;
						$(this).siblings(".empty_villages").html(ops);	
					}
				}
			}else if(for_fakes_prop && changed_val == "1 nemes - fake"){
				if(for_fakes_val == "empty"){
					UI.ErrorMessage("Figyelmeztetés! Nem választottál csoportot a szűrőben az egyik kipipált funkcióhoz!" ,2500);
					set_all_villages_to_box($(this));
				}else{
					if(saved_groups.for_fakes != undefined){
						$(this).siblings(".empty_villages").html(saved_groups.for_fakes);
					}else{
						var ops = "";
						$.ajax({url: document.location.href.replace("group=0","group=" + $("#group_for_fakes").children("option:selected").val()), async: false, success: function(result){
							divv.innerHTML = result;
							ops = getGroupVillages(divv, $("#group_for_fakes").children("option:selected").text());
						}});
						saved_groups.for_fakes = ops;
						$(this).siblings(".empty_villages").html(ops);	
					}
				}
			}else if(for_fakes_prop && changed_val == "Kos fake vonat"){
				if(for_fakes_val == "empty"){
					UI.ErrorMessage("Figyelmeztetés! Nem választottál csoportot a szűrőben az egyik kipipált funkcióhoz!" ,2500);
					set_all_villages_to_box($(this));
				}else{
					if(saved_groups.for_fakes != undefined){
						$(this).siblings(".empty_villages").html(saved_groups.for_fakes);
					}else{
						var ops = "";
						$.ajax({url: document.location.href.replace("group=0","group=" + $("#group_for_fakes").children("option:selected").val()), async: false, success: function(result){
							divv.innerHTML = result;
							ops = getGroupVillages(divv, $("#group_for_fakes").children("option:selected").text());
						}});
						saved_groups.for_fakes = ops;
						$(this).siblings(".empty_villages").html(ops);	
					}
				}
			}else{
				set_all_villages_to_box($(this));
			}
			$(this).siblings("[hidden]").removeAttr("hidden");
			$(this).siblings(".empty_villages").attr("class", "under_choose");
			$(this).prop("disabled", true);

			//---------------------------------------Next_Step
			//a leglassabb egység autokipipálás
			if($(this).children("option:selected").val() == "Nuke" || $(this).children("option:selected").val() == "Fake" || $(this).children("option:selected").val() == "Kos fake vonat"){
				$(this).siblings(".slowest_unit").children("option").eq(8).attr("selected", "selected");
			}else if($(this).children("option:selected").val().indexOf("nemes") > -1){ //erősítésen kívül, minden más az nemes
				$(this).siblings(".slowest_unit").children("option").eq(11).attr("selected", "selected");
			}
		refresh_event_listeners();	
		refresh_info_about_villages();
	});

	$(".under_choose").unbind('change');
	$(".under_choose").change(function() {
		$(this).attr("class", "villages_drop_down");
		$(this).prop("disabled", true);
		$(this).siblings(".inactive_type").attr("class", "command_type");
		refresh_event_listeners();
		refresh_info_about_villages();
	});
}
function refresh_info_about_villages(){
			//felugró szöveg generálás ami tartalmazza a falu összes parancsait
			$("option[value!='groupName']").removeAttr("style");
			$(".under_choose").children("option").removeAttr("title");
			var tarolo = {};
			var villageSelect_lengthh =  $(".villages_drop_down");
			var commandType_lengthh =  $(".command_type");
			for(var x = 0; x < villageSelect_lengthh.length; x++){
				if(villageSelect_lengthh[x].value != "empty" && commandType_lengthh[x].value != "empty"){
					if(tarolo[villageSelect_lengthh[x].value + commandType_lengthh[x].value] == undefined){
						tarolo[villageSelect_lengthh[x].value + commandType_lengthh[x].value] = 1;
						continue;
					}
					tarolo[villageSelect_lengthh[x].value + commandType_lengthh[x].value] += 1;
				}	
			}
			//ha a változtatott típus előtt a falu listában már ki volt választva egy falu és ha ilyen típusu parancs van valahol min.1<------színezés
			var filt_nukes, filt_supports, filt_fakes, filt_snobs5, filt_snobs4, filt_snobs3, filt_snobs2, filt_snobs1, filt_snobsf4, filt_snobsf3, filt_snobsf2, filt_snobsf1, filt_trainf;
			filt_nukes = $("#filt_nukes").prop("checked");
			filt_supports = $("#filt_supports").prop("checked");
			filt_fakes = $("#filt_fakes").prop("checked");
			filt_snobs5 = $("#filt_snobs5").prop("checked");
			filt_snobs4 = $("#filt_snobs4").prop("checked");
			filt_snobs3 = $("#filt_snobs3").prop("checked");
			filt_snobs2 = $("#filt_snobs2").prop("checked");
			filt_snobs1 = $("#filt_snobs1").prop("checked");
			filt_snobsf4 = $("#filt_snobsf4").prop("checked");
			filt_snobsf3 = $("#filt_snobsf3").prop("checked");
			filt_snobsf2 = $("#filt_snobsf2").prop("checked");
			filt_snobsf1 = $("#filt_snobsf1").prop("checked");
			filt_trainf = $("#filt_trainf").prop("checked");
			//ha még a falu nem volt kiválasztva és ha meghaladja valamelyik falu a korlátot akkor kiszínezi a legördülő listában
			
				var options_length = $(".under_choose").children("option");
				for(var x = 0; x < options_length.length; x++){
					
					if(tarolo[options_length[x].value + "Fake"] != undefined && filt_fakes){
						if(tarolo[options_length[x].value + "Fake"] >= parseInt($("#fakes_filt").val())){
							$("option[value='"+ options_length[x].value +"']").attr("style", "background: yellow;");
						}
					}
					if(tarolo[options_length[x].value + "Kos fake vonat"] != undefined && filt_trainf){
						if(tarolo[options_length[x].value + "Kos fake vonat"] >= parseInt($("#train_filtf").val())){
							$("option[value='"+ options_length[x].value +"']").attr("style", "background: khaki;");
						}
					}
					if(tarolo[options_length[x].value + "4 nemes - fake"] != undefined && filt_snobsf4){
						if(tarolo[options_length[x].value + "4 nemes - fake"] >= parseInt($("#snobs_filtf4").val())){
							$("option[value='"+ options_length[x].value +"']").attr("style", "background: goldenrod;");
						}
					}
					if(tarolo[options_length[x].value + "3 nemes - fake"] != undefined && filt_snobsf3){
						if(tarolo[options_length[x].value + "3 nemes - fake"] >= parseInt($("#snobs_filtf3").val())){
							$("option[value='"+ options_length[x].value +"']").attr("style", "background: goldenrod;");
						}
					}
					if(tarolo[options_length[x].value + "2 nemes - fake"] != undefined && filt_snobsf2){
						if(tarolo[options_length[x].value + "2 nemes - fake"] >= parseInt($("#snobs_filtf2").val())){
							$("option[value='"+ options_length[x].value +"']").attr("style", "background: goldenrod;");
						}
					}
					if(tarolo[options_length[x].value + "1 nemes - fake"] != undefined && filt_snobsf1){
						if(tarolo[options_length[x].value + "1 nemes - fake"] >= parseInt($("#snobs_filtf1").val())){
							$("option[value='"+ options_length[x].value +"']").attr("style", "background: goldenrod;");
						}
					}
					if(tarolo[options_length[x].value + "5 nemes - éles"] != undefined && filt_snobs5){
						if(tarolo[options_length[x].value + "5 nemes - éles"] >= parseInt($("#snobs_filt5").val())){
							$("option[value='"+ options_length[x].value +"']").attr("style", "background: orange;");
						}
					}
					if(tarolo[options_length[x].value + "4 nemes - éles"] != undefined && filt_snobs4){
						if(tarolo[options_length[x].value + "4 nemes - éles"] >= parseInt($("#snobs_filt4").val())){
							$("option[value='"+ options_length[x].value +"']").attr("style", "background: orange;");
						}
					}
					if(tarolo[options_length[x].value + "3 nemes - éles"] != undefined && filt_snobs3){
						if(tarolo[options_length[x].value + "3 nemes - éles"] >= parseInt($("#snobs_filt3").val())){
							$("option[value='"+ options_length[x].value +"']").attr("style", "background: orange;");
						}
					}
					if(tarolo[options_length[x].value + "2 nemes - éles"] != undefined && filt_snobs2){
						if(tarolo[options_length[x].value + "2 nemes - éles"] >= parseInt($("#snobs_filt2").val())){
							$("option[value='"+ options_length[x].value +"']").attr("style", "background: orange;");
						}
					}
					if(tarolo[options_length[x].value + "1 nemes - éles"] != undefined && filt_snobs1){
						if(tarolo[options_length[x].value + "1 nemes - éles"] >= parseInt($("#snobs_filt1").val())){
							$("option[value='"+ options_length[x].value +"']").attr("style", "background: orange;");
						}
					}
					
					if(tarolo[options_length[x].value + "Erősítés"] != undefined && filt_supports){
						if(tarolo[options_length[x].value + "Erősítés"] >= parseInt($("#supports_filt").val())){
							$("option[value='"+ options_length[x].value +"']").attr("style", "background: green;");
						}
					}
					if(tarolo[options_length[x].value + "Nuke"] != undefined && filt_nukes){
						if(tarolo[options_length[x].value + "Nuke"] >= parseInt($("#nukes_filt").val())){
							$("option[value='"+ options_length[x].value +"']").attr("style", "background: red;");
						}
					}
					//felugró szöveg generálás ami tartalmazza a falu összes parancsai
					var opt_val = options_length[x].value;
					if(opt_val != "empty"){
						var n, s, f, n5, n4, n3, n2, n1, n4F, kv;
						if(tarolo[opt_val + "Nuke"] == undefined){n = "0";}else{n = tarolo[opt_val + "Nuke"]}
						if(tarolo[opt_val + "Erősítés"] == undefined){s = "0";}else{s = tarolo[opt_val + "Erősítés"]}
						if(tarolo[opt_val + "Fake"] == undefined){f = "0";}else{f = tarolo[opt_val + "Fake"]}
						if(tarolo[opt_val + "5 nemes - éles"] == undefined){n5 = "0";}else{n5 = tarolo[opt_val + "5 nemes - éles"]}
						if(tarolo[opt_val + "4 nemes - éles"] == undefined){n4 = "0";}else{n4 = tarolo[opt_val + "4 nemes - éles"]}
						if(tarolo[opt_val + "3 nemes - éles"] == undefined){n3 = "0";}else{n3 = tarolo[opt_val + "3 nemes - éles"]}
						if(tarolo[opt_val + "2 nemes - éles"] == undefined){n2 = "0";}else{n2 = tarolo[opt_val + "2 nemes - éles"]}
						if(tarolo[opt_val + "1 nemes - éles"] == undefined){n1 = "0";}else{n1 = tarolo[opt_val + "1 nemes - éles"]}
						if(tarolo[opt_val + "4 nemes - fake"] == undefined){n4F = "0";}else{n4F = tarolo[opt_val + "4 nemes - fake"]}
						if(tarolo[opt_val + "Kos fake vonat"] == undefined){kv = "0";}else{kv = tarolo[opt_val + "Kos fake vonat"]}
						
						$(options_length).eq(x).attr("title", `Nuke parancsok: ${n}
Erősítés parancsok: ${s}
Fake parancsok: ${f}
5 éles n. parancsok: ${n5}
4 éles n. parancsok: ${n4}
3 éles n. parancsok: ${n3}
2 éles n. parancsok: ${n2}
1 éles n. parancsok: ${n1}
4 fake n. parancsok: ${n4F}
Kos vonat parancsok: ${kv}
${village_units[options_length[x].value]}`);
					}
				}	
}
//a lögördülőbe adja vissza a falvakat HTML options formában egy bizonyos csoportba amik tartoznak
function getGroupVillages(htmll, group_name){
	var trs = htmll.getElementsByClassName("quickedit-vn");
	var villages = "<option value='groupName' style = 'background: lightCyan;' disabled>" + group_name + "</option>";
	for(var x = 0; x < trs.length; x++){
		villages += '<option value ="' + trs[x].innerText.match(/\d\d\d\|\d\d\d/) + '">' + trs[x].innerText + '</option>';
	}
	villages += '<option value = "empty" selected = "selected" disabled>-Válassz-</option>';
	return villages;
}

//a világ és egység sebességének a változtatásához létrehozandó form
function speedToScrn(){
	if(word_speed == 0){
		window.open("https://" + document.location.host + "/page/settings");
		$("body").append(`<div id="speeds_input_form">
			<input name = "word_speed" type = "number" placeholder = "Világ sebesség" style = "width: 90px; border-radius: 4px; position: absolute; left: 118px; top: 30px; text-align: center;">
			<input name = "unit_speed" type = "number" placeholder = "Egység sebesség" style = "width: 90px; border-radius: 4px; position: absolute; left: 118px; top: 60px; text-align: center;">
			<input class = "confirmbutt" type = "button" value = "Elment" style = "width: 60px; border-radius: 4px; position: absolute; left: 100px; top: 110px;">
			<input class = "cancelbutt" type = "button" value = "Mégsem" style = "width: 60px; border-radius: 4px; position: absolute; left: 168px; top: 110px;">
			
			<style>.confirmbutt {margin: 5px;backface-visibility: hidden;position: relative;cursor: pointer;white-space: nowrap;background: #6c4824;border-radius: 4px;border: 1px solid #000000;border-width: 1px 1px 1px 1px;padding: 1px 5px 1px 5px;box-shadow: 0px 0px 5px #6c4824,inset 0px 3px 5px lime;color: #ffffff;font-size: 12px;font-family: verdana;font-weight: 500;font-style: normal;text-shadow: 0px -1px 0px rgba(0%,0%,0%,0.4);}.confirmbutt:hover {background-color:#68e431;}.confirmbutt:active{position:relative;top:1px;}.cancelbutt {margin: 5px;backface-visibility: hidden;position: relative;cursor: pointer;white-space: nowrap;background: #6c4824;border-radius: 4px;border: 1px solid #000000;border-width: 1px 1px 1px 1px;padding: 1px 5px 1px 5px;box-shadow: 0px 0px 5px #6c4824,inset 0px 3px 5px red;color: #ffffff;font-size: 12px;font-family: verdana;font-weight: 500;font-style: normal;text-shadow: 0px -1px 0px rgba(0%,0%,0%,0.4);}.cancelbutt:hover {background-color:#ed3d2d;}.cancelbutt:active{position:relative;top:1px;}</style></div>`);
		$("#speeds_input_form").css({
									"background-image": "url('https://indexrprogs.netlify.com/input_img.png')",
									"position": "fixed",
									"top": "30%",
									"left": $(window).height() - 130 +"px",
									"width": "325px",
									"height": "183px"
		});
		$(".shadedBG").css("filter", "blur(1px)");
		
		$("input.confirmbutt").unbind('click');
		$("input.confirmbutt").click(function(){
			if($("input[name='word_speed']").val() == "" || $("input[name='unit_speed']").val() == ""){
				alert("Valamelyik mezőt üresen hagytad vagy nem korrektül írtad be a számot.");
				return;
			}
			var w_speed = parseFloat($("input[name='word_speed']").val());
			var u_speed = parseFloat($("input[name='unit_speed']").val());
			var key = document.location.host.match(/\w+\d+/)[0];
			localStorage.setItem(key+"word", w_speed);
			localStorage.setItem(key+"unit", u_speed);
			word_speed = w_speed;
			word_unit_speed = u_speed;
			UI.SuccessMessage("A beállítások sikeresen frissítve lettek!", 3000);
			$("#speeds_input_form").remove();
			$(".shadedBG").css("filter", "blur(0px)");	
		});
		$("input.cancelbutt").unbind('click');
		$("input.cancelbutt").click(function(){
			$("#speeds_input_form").remove();
			$(".shadedBG").css("filter", "blur(0px)");	
		});
	}else{
		UI.InfoMessage("Világ sebesség: " + word_speed + " Egység sebesség: " + word_unit_speed + " Kattints duplán a változtatáshoz", 4000);
	}
	$("input.speed_form").unbind('dblclick');
	$("input.speed_form").dblclick(function(){
		window.open("https://" + document.location.host + "/page/settings");
		$("body").append(`<div id="speeds_input_form">
			<input name = "word_speed" type = "number" placeholder = "Világ sebesség" style = "width: 90px; border-radius: 4px; position: absolute; left: 118px; top: 30px; text-align: center;">
			<input name = "unit_speed" type = "number" placeholder = "Egység sebesség" style = "width: 90px; border-radius: 4px; position: absolute; left: 118px; top: 60px; text-align: center;">
			<input class = "confirmbutt" type = "button" value = "Elment" style = "width: 60px; border-radius: 4px; position: absolute; left: 100px; top: 110px;">
			<input class = "cancelbutt" type = "button" value = "Mégsem" style = "width: 60px; border-radius: 4px; position: absolute; left: 168px; top: 110px;">
			
			<style>.confirmbutt {margin: 5px;backface-visibility: hidden;position: relative;cursor: pointer;white-space: nowrap;background: #6c4824;border-radius: 4px;border: 1px solid #000000;border-width: 1px 1px 1px 1px;padding: 1px 5px 1px 5px;box-shadow: 0px 0px 5px #6c4824,inset 0px 3px 5px lime;color: #ffffff;font-size: 12px;font-family: verdana;font-weight: 500;font-style: normal;text-shadow: 0px -1px 0px rgba(0%,0%,0%,0.4);}.confirmbutt:hover {background-color:#68e431;}.confirmbutt:active{position:relative;top:1px;}.cancelbutt {margin: 5px;backface-visibility: hidden;position: relative;cursor: pointer;white-space: nowrap;background: #6c4824;border-radius: 4px;border: 1px solid #000000;border-width: 1px 1px 1px 1px;padding: 1px 5px 1px 5px;box-shadow: 0px 0px 5px #6c4824,inset 0px 3px 5px red;color: #ffffff;font-size: 12px;font-family: verdana;font-weight: 500;font-style: normal;text-shadow: 0px -1px 0px rgba(0%,0%,0%,0.4);}.cancelbutt:hover {background-color:#ed3d2d;}.cancelbutt:active{position:relative;top:1px;}</style></div>`);
		$("#speeds_input_form").css({
									"background-image": "url('https://indexrprogs.netlify.com/input_img.png')",
									"position": "fixed",
									"top": "30%",
									"left": $(window).height() - 130 +"px",
									"width": "325px",
									"height": "183px"
		});
		$(".shadedBG").css("filter", "blur(1px)");
		
		$("input.confirmbutt").unbind('click');
		$("input.confirmbutt").click(function(){
			if($("input[name='word_speed']").val() == "" || $("input[name='unit_speed']").val() == ""){
				alert("Valamelyik mezőt üresen hagytad vagy nem korrektül írtad be a számot.");
				return;
			}
			var w_speed = parseFloat($("input[name='word_speed']").val());
			var u_speed = parseFloat($("input[name='unit_speed']").val());
			var key = document.location.host.match(/\w+\d+/)[0];
			localStorage.setItem(key+"word", w_speed);
			localStorage.setItem(key+"unit", u_speed);
			word_speed = w_speed;
			word_unit_speed = u_speed;
			UI.SuccessMessage("A beállítások sikeresen frissítve lettek!", 3000);
			$("#speeds_input_form").remove();
			$(".shadedBG").css("filter", "blur(0px)");	
		});
		$("input.cancelbutt").unbind('click');
		$("input.cancelbutt").click(function(){
			$("#speeds_input_form").remove();
			$(".shadedBG").css("filter", "blur(0px)");	
		});
	});
	
}
function readUnits(){
	var all_villages = $(".row_marker");
	var word_units = game_data.units;
	for(var x = 0; x < all_villages.length; x++){
		match_coord = $(".row_marker").eq(x).find("td").eq(0).text(); match_coord = match_coord.match(/\d\d\d\|\d\d\d/)[0];
		var units = $(".row_marker").eq(x).find(".unit-item");
		
		for(var y = 0; y < units.length; y++){
			if(village_units[match_coord] == undefined){
				village_units[match_coord] = "";
			}
			if(word_units[y] == "spear"){
				village_units[match_coord] += "Lándzs: " + $(".row_marker").eq(x).find(".unit-item").eq(y).text() + "\n";
			}
			if(word_units[y] == "sword"){
				village_units[match_coord] += "Kardos: " + $(".row_marker").eq(x).find(".unit-item").eq(y).text() + "\n";
			}
			if(word_units[y] == "axe"){
				village_units[match_coord] += "Bárdos: " + $(".row_marker").eq(x).find(".unit-item").eq(y).text() + "\n";
			}
			if(word_units[y] == "archer"){
				village_units[match_coord] += "Ijász: " + $(".row_marker").eq(x).find(".unit-item").eq(y).text() + "\n";
			}
			if(word_units[y] == "spy"){
				village_units[match_coord] += "Kém: " + $(".row_marker").eq(x).find(".unit-item").eq(y).text() + "\n";
			}
			if(word_units[y] == "light"){
				village_units[match_coord] += "Könnyű l: " + $(".row_marker").eq(x).find(".unit-item").eq(y).text() + "\n";
			}
			if(word_units[y] == "marcher"){
				village_units[match_coord] += "Lovas ij: " + $(".row_marker").eq(x).find(".unit-item").eq(y).text() + "\n";
			}
			if(word_units[y] == "heavy"){
				village_units[match_coord] += "Nehéz l: " + $(".row_marker").eq(x).find(".unit-item").eq(y).text() + "\n";
			}
			if(word_units[y] == "ram"){
				village_units[match_coord] += "Kos: " + $(".row_marker").eq(x).find(".unit-item").eq(y).text() + "\n";
			}
			if(word_units[y] == "catapult"){
				village_units[match_coord] += "Katap: " + $(".row_marker").eq(x).find(".unit-item").eq(y).text() + "\n";
			}
			if(word_units[y] == "knight"){
				village_units[match_coord] += "Lovag: " + $(".row_marker").eq(x).find(".unit-item").eq(y).text() + "\n";
			}
			if(word_units[y] == "snob"){
				village_units[match_coord] += "Nemes: " + $(".row_marker").eq(x).find(".unit-item").eq(y).text() + "\n";
			}
		}
	}
	
}
function set_all_villages_to_box(here){
	var identif = $(here).siblings(".empty_villages").eq(0);
	$(identif).html(saved_groups.all);
}
function get_allGroup(){
	//saját faluk legördülő listájához
	var villages_container = document.getElementById("units_table");
	var villages = villages_container.getElementsByTagName("tbody");
	var villages_htmldropdown = '<option value="groupName" style = "background: lightCyan;" disabled>Összes falud</option>';
	for(var x = 0; x < villages.length; x++){
		villages_htmldropdown += '<option value="' + villages[x].getElementsByTagName("td")[0].innerText.match(/\d\d\d\|\d\d\d/)[0] + '">' + villages[x].getElementsByTagName("td")[0].innerText + '</option>';
	}
	villages_htmldropdown += '<option value = "empty" selected = "selected" disabled>-Válassz-</option>';
	saved_groups["all"] = villages_htmldropdown;
}
function copyLaunches(ident){
	var textArea = document.getElementsByClassName("textarea")[ident];
	/*Szöveg kim.*/
	textArea.select();
	textArea.setSelectionRange(0, 99999); //telókra
	document.execCommand("copy");
	UI.SuccessMessage("Adatok kimásolva!", 2000);
}
