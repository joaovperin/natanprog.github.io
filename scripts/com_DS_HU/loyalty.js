// ... by -Numlock- v1.0
var loy_increment = 0;

if(document.location.href.indexOf("game.php?") > -1){
	

		if(document.location.host.indexOf("hu51") > -1){
			loy_increment = 1;
		}else if(document.location.host.indexOf("hu54") > -1){
			loy_increment = 1.25;
		}else if(document.location.host.indexOf("hu56") > -1){
			loy_increment = 1;
		}else if(document.location.host.indexOf("hu57") > -1){
			loy_increment = 1;
		}else if(document.location.host.indexOf("hu58") > -1){
			loy_increment = 1.6;
		}else if(document.location.host.indexOf("hu59") > -1){
			loy_increment = 1.2;	
		}else if(document.location.host.indexOf("hu60") > -1){
			loy_increment = 1.8;	
		}else{
			var key = document.location.host.match(/\w+\d+/)[0];
			if(localStorage.getItem(key + "loyincrement") == null){
				if (window.confirm("A script nem rendelkezik a világ 'Hűség növekedése óránként' adatával, ezek nélkül a számítgatások hibásak lesznek. A folytatás előtt, kérlek add meg ezeket. Az 'Ok' gombra kattintva a script egy új lapon elnavigál a világ beállításainak a weboldalára, ahonnan ezeket az adatokat megtalálhatod és megadhatod a script számára. Ha megtaláltad akkor kattins a script általá generált 'Hűség/óra átállítás' gombra és írd be azt. Ezt az adatot csak egyszer kellesz megadnod ehez a világhoz.")){ 
					window.open("https://" + document.location.host + "/page/settings");
				}
			}else{
				loy_increment = parseFloat(localStorage.getItem(key + "loyincrement"));
			}
		}
	create_HTML();
	UI.SuccessMessage("A script sikeresen futtatva! Világ hűség növekedés/óra - " + loy_increment, 3000);
	
}

function create_HTML(){

		$("body").append(`<div id="speeds_input_form" align="center"><br>
			<label style = "background-color: black; color: cyan; font-size: 15px;">Hűség kalkulátor v1.0</label><br><br>
			<label class= "textt">Amit tudunk a faluról, dátum/hűség:</label><br>
			<input name = "last_date" type = "text" value = "${new Date().getFullYear() + "-" + parseInt(new Date().getMonth() + 1) + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}" style = "width: 110px; border-radius: 4px; text-align: center;"> 
			<input name = "last_loy" type = "number" value = "98" style = "width: 30px; border-radius: 4px; text-align: center;">
			<br><br>
			<label class= "textt">Erre az időpontra szeretnéd kideríteni:</label><br>
			<input name = "loy_at" type = "text" value = "${new Date().getFullYear() + "-" + parseInt(new Date().getMonth() + 1) + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}" style = "width: 110px; border-radius: 4px; text-align: center;">
			<br><br>
			<input class = "buttons" type = "button" value = "Számítás" onclick = "calculate_loy()">
			<input class = "buttons" type = "button" value = "Hűség/óra átállítás" onclick = "set_loy()">
			
			<style>.buttons{margin: 5px;backface-visibility: hidden;position: relative;cursor: pointer;white-space: nowrap;background: #6c4824;border-radius: 4px;border: 1px solid #000000;border-width: 1px 1px 1px 1px;padding: 1px 5px 1px 5px;box-shadow: 0px 0px 5px #6c4824,inset 0px 3px 5px cyan;color: #ffffff;font-size: 12px;font-family: verdana;font-weight: 500;font-style: normal;text-shadow: 0px -1px 0px rgba(0%,0%,0%,0.4);}.buttons:hover {background-color:cyan;}.buttons:active{position:relative;top:1px;}.textt{color: cyan;}</style>
			</div>`);
		$("#speeds_input_form").css({
									"background-image": "url('https://indexrprogs.netlify.com/input_img.png')",
									"position": "fixed",
									"top": "10%",
									"left": "70%",
									"width": "325px",
									"height": "183px"
		});	
}
function calculate_loy(){
	var last = $("input[name='last_date']").val();
	var loyalty = $("input[name='last_loy']").val();
	var neww = $("input[name='loy_at']").val();
	try {
		last = last.match(/\d+-\d+-\d+\s+\d+:\d+:\d+/)[0];
		loyalty = parseInt(loyalty.match(/\d+/)[0]);
		neww = neww.match(/\d+-\d+-\d+\s+\d+:\d+:\d+/)[0];
	}catch(ex){
		alert("Valamit hibásan írtál be, kérlek ellenőrízd a bevitt adatokat.");
		return;
	}
	if(loyalty < 0 || loyalty > 99){
		alert("Valamit hibásan írtál be, kérlek ellenőrízd a bevitt adatokat.");
		return;
	}
	
	
		last_date = new Date();
		last_date.setFullYear(parseInt(last.match(/\d\d\d\d/)[0]));
		last_date.setMonth(parseInt(last.match(/\d+/g)[1]) - 1);
		last_date.setDate(parseInt(last.match(/\d+/g)[2]));
		last_date.setHours(parseInt(last.match(/\d+/g)[3]));
		last_date.setMinutes(parseInt(last.match(/\d+/g)[4]));
		last_date.setSeconds(parseInt(last.match(/\d+/g)[5]));
		
		new_date = new Date();
		new_date.setFullYear(parseInt(neww.match(/\d\d\d\d/)[0]));
		new_date.setMonth(parseInt(neww.match(/\d+/g)[1]) - 1);
		new_date.setDate(parseInt(neww.match(/\d+/g)[2]));
		new_date.setHours(parseInt(neww.match(/\d+/g)[3]));
		new_date.setMinutes(parseInt(neww.match(/\d+/g)[4]));
		new_date.setSeconds(parseInt(neww.match(/\d+/g)[5]));
		
		var difference = new Date(new_date - last_date);
		
		console.log(parseFloat(((difference.getTime() / 1000 / 60 / 60) * loy_increment)).toFixed(1));
		new_loyalty = parseFloat(((difference.getTime() / 1000 / 60 / 60) * loy_increment) + loyalty).toFixed(1);
		if(new_loyalty > 100){
			new_loyalty = 100;
		}
		alert("Az általad megadott időpontkor a hűség ennyi lesz: " + new_loyalty);
}
function set_loy(){
	var new_loy = parseFloat(prompt("Ird be a hűség/óra növekedését ide, ponttal elválasztva ha tört számról van szó."));
	var key = document.location.host.match(/\w+\d+/)[0];
	if(new_loy > 0){
		loy_increment = new_loy;
		localStorage.setItem(key + "loyincrement", new_loy);
		UI.SuccessMessage("A hűséget sikeresen lementetted ehez a világhoz. Hűség: " + new_loy, 3000);
	}else{
		UI.ErrorMessage("Valamit hibásan írtál be, a hűséget nem sikerült lementeni.", 3000);
	}
}