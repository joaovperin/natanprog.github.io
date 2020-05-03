/*
		scriptname:	Count & Categorize Troops
		version:	1.0.0
		created: June 18, 2016
 		game version:	version	8.48.1
 		author:		Tsalkapone (tsalkapone@hotmail.com)
 
 ==== pages where this can be used ==== 
 * Overviews -> Units -> All (screen=overview_villages&mode=units&type=complete)
  
 ==== changelog ====
 *	18 June 2016 - created
 
 ==== license ====
 *	Copyright (C) 2016 Tsalkapone ~ Apostolos Tsalkitzis

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see http://www.gnu.org/licenses/
 */
 
var get_lang = localStorage.getItem("troops_counter_lang");
    var lang="";
    if (get_lang === null) {lang = "english";}
    else { lang = ""+get_lang+"";}
    var supported_languages =["greek","english"];
    var lang_check = supported_languages.indexOf(lang);
    if (lang_check < 0) {UI.ErrorMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> The selected language is not supported. Please select one of the supported languages.', 5000);}
    else {
 var tsalkapone_trans = (function() {
				    var tsalkapone_trans = {};
    tsalkapone_trans.english= { 
	 general:{ 
	 script:"Troops Counting & Grouping",
	 notification:"Notification from",		
	 twconfig:"Click to show/hide the configurations' and errors log in case you encounter any bug or error issues",
		message_no:"No",
		message_yes:"Yes",
		   selected_one:"Current selected language",
         available:"Available languages",
		 button_list:"Buttons List",
		 lang_sel:"Click to change the selected language",		
		message_1:"This script is activated on Overviews-> Troops-> All/Defenses/Support pages",
		message_2:" Do you want to automatically assign your location to one of these pages?",
		message_units1:"Go to All page",
		message_units2:"Go to Defenses page",
		message_units3:"Go to Support page",
		comm:"Feel free to send any message regarding script bugs or proposing ideas to",
		temp1:"Safe noble-trains",
		temp2:"Casual noble-trains",
		temp3:"Full defensive trains",
		temp4:"Less than 4 noblemen",
		temp5:"Full Nuke",
		temp6:"3/4 Nuke",
		temp7:"1/2 Nuke",
		temp8:"1/4 Nuke",
		temp9:"Nukes with more than 100 catapults",
		temp10:"Nukes with more than 800 rams",
		temp11:"Nukes with 500-800 rams",
		temp12:"Nukes with 250-499 rams",
		temp13:"Nukes with 100-249 rams",
		temp14:"Complete defense",
		temp15:"3/4 defense",
		temp16:"1/2 defense",
		temp17:"1/4 defense",
		temp18:"Complete cat-villages",
		temp19:"3/4 cat-villages",
		temp20:"1/2 cat-villages",
		temp21:"Cat-villages with 500-1000 cats",
		temp22:"At least 1000 heavy",
		temp23:"archers",
		temp24:"At least 1000 spears",
		temp25:"At least 1000 swords",
		temp26:"At least 1000 swords & spears",
		temp27:"At least 1000",
		temp28:"At least 1000 heavy & spears",
		temp29:"Complete scout-villages",
		temp30:"3/4 scout-villages",
		temp31:"1/2 scout-villages",
		temp32:"1/4 scout-villages",
		temp33:"500-2500 scouts",
		temp34:"Villages with low population",
		temp35:"Other villages with noblemen",
		temp36:"swords & archers",
		temp37:"spears & catapults",
		temp38:"catapults",
		temp39:"Mixed villages",
		temp40:"Offensive with heavy",
		temp41:"Defensive with rams",
		temp42:"Defensive with light for farming",
		temp43:"Offensive with defense",
		edited:"Edited by",
		spear:"Spearmen",
		sword:"Swordsmen",
		axe:"Axemen",
		archer:"Archers",
		spy:"Scouts",
		light:"Light cavalry",
		heavy:"Heavy cavalry",
		marcher:"Mounted archers",
		ram:"Rams",
		cats:"Catapults",
		knight:"Paladin",
		snob:"Noblemen",
		militia:"Militia",
		offensive:"Offensive units",
		defensive:"Defensive units",
		plithos:"Total units",
		monades:"Units",
		other:"Other units",
		farm:"Total farmspace",
		report:"Troops report",
		unit_info:"Every number displayed below refers to farmspace occupied by each unit or category of units",
		sun:"and",
		groups:"Village Groups",
		counting:"Troops Counting",
		group1:"Villages with noblemen",
		group2:"Offensive villages",
		group3:"Building Breakers",
		group4:"Defensive Villages",
		group5:"Villages with catapults",
		group6:"Defensive Templates",
		group7:"Scouting Villages",
		group8:"Other types of villages",
		group9:"Offensive units",
		group10:"Defensive units",
		group11:"Other units",
		group12:"Total units",
		group13:"Table code for tribal forums",
		group14:"Troops-report for mail/tribal forums",
		group15:"Selected Group Coordinates",
		player_name:"Player",
		oda_count:"ODA",
		pop_count:"Full Def Pop",
	},
	buttons:{
		lang_open:"Open language selection",
              lang_close:"Close language selection",
			  set_show:"Show",
			  set_hide:"Hide",
			  close_table:"Close",
	},
	
};
tsalkapone_trans.greek= { 
	 general:{ 
	 script:"Ανάλυση και Κατηγοριοποίηση Στρατευμάτων",
	 notification:"Ειδοποίηση από τον",
	 twconfig:"Επιλέξτε για εμφάνιση/απόκρυψη σημειώσεων των ρυθμίσεων και αποτελεσμάτων σε περίπτωση που παρατηρήσετε οποιοδήποτε bug ή σφάλμα",
	 selected_one:"Ενεργή γλώσσα",
            available:"Διαθέσιμες γλώσσες",
			button_list:"Πίνακας πλήκτρων",
			lang_sel:"Επιλέξτε για να αλλάξετε την επιλεγμένη γλώσσσα",
			message_no:"Όχι",
		message_yes:"Ναι",
		message_1:"Το συγκεκριμένο script ενεργοποιείται από τις Επισκοπήσεις->Στρατεύματα-> Όλα/Άμυνα/Υποστήριξη.",
		message_2:"Επιθυμείτε αυτόματη ανακατεύθυνση σε μία από τις παραπάνω σελίδες;",
		message_units1:"Μετάβαση σε Όλα",
		message_units2:"Μετάβαση σε Άμυνα",
		message_units3:"Μετάβαση σε Υποστήριξη",
		comm:"Επικοινωνήστε ανά πάσα στιγμή για οποιαδήποτε ιδέα ή πρόταση σχετικά με τα scripts με τον",
	temp1:"Ασφαλή τρένα",
		temp2:"Ολοκληρωμένες εκκαθαριστικές-τρένα",
		temp3:"Ολοκληρωμένα αμυντικά-τρένα",
		temp4:"Λιγότεροι από 4 αριστοκράτες",
		temp5:"Ολοκληρωμένη εκκαθαριστική",
		temp6:"3/4 εκκαθαριστικής",
		temp7:"1/2 εκκαθαριστικής",
		temp8:"1/4 εκκαθαριστικής",
		temp9:"Εκκαθαριστική με τουλάχιστον 100 καταπέλτες",
		temp10:"Εκκαθαριστικές με τουλάχιστον 800 κριούς",
		temp11:"Εκκαθαριστικές με 500-800 κριούς",
		temp12:"Εκκαθαριστικές με 250-499 κριούς",
		temp13:"Εκκαθαριστικές με 100-249 κριούς",
		temp14:"Ολοκληρωμένα αμυντικά",
		temp15:"3/4 αμυντικά",
		temp16:"1/2 αμυντικά",
		temp17:"1/4 αμυντικά",
		temp18:"Ολοκληρωμένα καταπελτάδικα",
		temp19:"3/4 καταπελτάδικα",
		temp20:"1/2 καταπελτάδικα",
		temp21:"Καταπελτάδικα με 500-1000 καταπέλτες",
		temp22:"Τουλάχιστον 1000 βαρύ",
		temp23:"τοξότες",
		temp24:"Τουλάχιστον 1000 δορατοφόροι",
		temp25:"Τουλάχιστον 1000 ξιφομάχοι",
		temp26:"Τουλάχιστον 1000 ξιφομάχοι & δορατοφόροι",
		temp27:"Τουλάχιστον 1000",
		temp28:"Τουλάχιστον 1000 βαρύ & δορατοφόροι",
		temp29:"Ολοκληρωμένα ανιχνευτάδικα",
		temp30:"3/4 ανιχνευτάδικα",
		temp31:"1/2 ανιχνευτάδικα",
		temp32:"1/4 ανιχνευτάδικα",
		temp33:"500-2500 ανιχνευτές",
		temp34:"Χωριά με μικρό πληθυσμό",
		temp35:"Άλλα χωριά με αρίστους",
		temp36:"ξιφομάχοι & τοξότες",
		temp37:"δορατοφόροι & καταπέλτες",
		temp38:"καταπέλτες",
		temp39:"Mικτά χωριά",
		temp40:"Επιθετικά με βαρύ",
		temp41:"Αμυντικά με κριούς",
		temp42:"Αμυντικά για farming",
		temp43:"Επιθετικά με άμυνα",
		edited:"Δημιουργήθηκε από τον",
		spear:"Δορατοφόροι",
		sword:"Ξιφομάχοι",
		axe:"Τσεκουρομάχοι",
		archer:"Τοξότες",
		spy:"Ανιχνευτές",
		light:"Ελαφρύ ιππικό",
		heavy:"Βαρύ ιππικό",
		marcher:"Έφιπποι τοξότες",
		ram:"Πολιορκητικοί κριοί",
		cats:"Καταπέλτες",
		knight:"Paladin",
		snob:"Αριστοκράτες",
		militia:"Εθνοφρουρά",
		offensive:"Επιθετικές μονάδες",
		defensive:"Αμυντικές μονάδες",
		plithos:"Σύνολο μονάδων",
		monades:"Μονάδες",
		other:"Άλλες μονάδες",
		farm:"Συνολικός χώρος αγροκτήματος",
		report:"Αναφορά στρατευμάτων",
		unit_info:"Κάθε αριθμός που παρουσιάζεται παρακάτω δηλώνει το χώρο αγροκτήματος που καταλαμβάνει μια μονάδα ή μια κατηγορία μονάδων",
		sun:"και",
		groups:"Ομάδες Χωριών",
		counting:"Υπολογισμός Στρατευμάτων",
		group1:"Χωριά με αρίστους",
		group2:"Επιθετικά χωριά",
		group3:"Χωριά καταρρίψεων",
		group4:"Αμυντικά χωριά",
		group5:"Χωριά με καταπέλτες",
		group6:"Πακέτα αμυνών",
		group7:"Χωριά με ανιχνευτές",
		group8:"Άλλα είδη χωριών",
		group9:"Επιθετικές Μονάδες",
		group10:"Αμυντικές Μονάδες",
		group11:"Άλλα είδη μονάδων",
		group12:"Συνολικές Μονάδες",
		group13:"Πίνακας στρατευμάτων για φυλετικό forum",
		group14:"Αναφορά στρατευμάτων για mail/forum",
		group15:"Συντεταγμένες επιλεγμένης Ομάδας",
		player_name:"Όνομα παίκτη",
		oda_count:"ODA",
		pop_count:"Σύνολο αμυντικών χωριών",
	},
		buttons:{		
			  lang_open:"Άνοιγμα επιλογής γλώσσας",
              lang_close:"Κλείσιμο επιλογής γλώσσας",
			  set_show:"Εμφάνιση",
			  set_hide:"Απόκρυψη",
			  close_table:"Κλείσιμο",
	},
};
    return tsalkapone_trans[lang];
    }());
	}
	var Tsalpage1 = location.href.indexOf('type=own_home') > -1;
	var Tsalpage2 = location.href.indexOf('type=away') > -1;
	var Tsalpage3 = location.href.indexOf('type=moving') > -1;
	var Tsalpage4 = location.href.indexOf('type=there') > -1;
	var Tsalpage5 = location.href.indexOf('type=support_detail') > -1;
	var Tsalpage6 = location.href.indexOf('type=away_detail') > -1;
	var Tsalactivepage = location.href.indexOf('mode=units') > -1;
	          function Tsal_Number(x) {
         if (x=='' || x===undefined) {return x;}
   else { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");}
}
			if (!Tsalactivepage || Tsalpage2 && !Tsalpage6 || Tsalpage3 || Tsalpage4) {
				var contact_url = "https://forum.tribalwars.net/member.php?114063-Tsalkapone";
	   var content = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="darkgreen">Tsalkapone. '+tsalkapone_trans.general.script+'</font></u></center></h2>' +
'<hr><p><center><font color=maroon><b>'+tsalkapone_trans.general.message_1+'</b></font></center></p>' +
'<p><center><font color=maroon><b>'+tsalkapone_trans.general.message_2+'</b></font></center></p>' +
'<br><br><center><input type="button" class="btn evt-confirm-btn btn-confirm-yes" id="go_man1" value="'+tsalkapone_trans.general.message_units1+'">&emsp;<input type="button" class="btn evt-confirm-btn btn-confirm-yes" id="go_man2" value="'+tsalkapone_trans.general.message_units2+'">&emsp;<input type="button" class="btn evt-confirm-btn btn-confirm-yes" id="go_man3" value="'+tsalkapone_trans.general.message_units3+'">&emsp;<input type="button" class="btn evt-cancel-btn btn-confirm-no" id="close_this" value="'+tsalkapone_trans.general.message_no+'"></center>'+ 
'<br><br><hr><center><img class="tooltip-delayed" title="<font color=darkgreen>Tsalkapone. '+tsalkapone_trans.general.script+'</font>" src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg" style="cursor:help; position: relative"></center><br><center><p>'+tsalkapone_trans.general.comm+' <a href="'+contact_url+'" title="Tsalkapone profile" target="_blank">Tsalkapone</a>.</p></center>' +
'</div>';            
Dialog.show('fakescript1_info_intro', content);
$("#go_man1").click(function () { window.location.assign(game_data.link_base_pure+"overview_villages&mode=units&type=complete");});
$("#go_man2").click(function () { window.location.assign(game_data.link_base_pure+"overview_villages&mode=units&type=support_detail");});   
$("#go_man3").click(function () { window.location.assign(game_data.link_base_pure+"overview_villages&mode=units&type=away_detail");});      
$("#close_this").click(function () { var close_this = document.getElementsByClassName('popup_box_close'); close_this[0].click(); });
	} 
	else if (Tsalpage1) {
		
		
		
	}
else if (Tsalpage5 || Tsalpage6)
{function Tsalkapone_Count_Support() {
	var doc=document;
function ADS_Unterstuetzung_zaehlen(doc){
	var output = '';
	var world = ($("#units_table thead tr th:eq(5) img").attr("src").indexOf("unit_spy") == -1);
var ar_img='<th style="text-align:center" ><img src="/graphic/unit/unit_spear.png" ></th><th style="text-align:center" ><img src="/graphic/unit/unit_sword.png" ></th>';
ar_img+='<th style="text-align:center" ><img src="/graphic/unit/unit_archer.png" ></th><th style="text-align:center" ><img src="/graphic/unit/unit_spy.png" ></th>';
ar_img+='<th style="text-align:center" ><img src="/graphic/unit/unit_marcher.png" ></th><th style="text-align:center" ><img src="/graphic/unit/unit_heavy.png" ></th>';
ar_img+='<th style="text-align:center" ><img src="/graphic/unit/unit_catapult.png" ></th><th style="text-align:center" ><img src="/graphic/unit/unit_knight.png" ></th>';
var nonar_img='<th style="text-align:center" ><img src="/graphic/unit/unit_spear.png" ></th><th style="text-align:center" ><img src="/graphic/unit/unit_sword.png" ></th>';
nonar_img+='<th style="text-align:center" ><img src="/graphic/unit/unit_spy.png" ></th><th style="text-align:center" ><img src="/graphic/unit/unit_heavy.png" ></th>';
nonar_img+='<th style="text-align:center" ><img src="/graphic/unit/unit_catapult.png" ></th><th style="text-align:center" ><img src="/graphic/unit/unit_knight.png" ></th>';
	var num_spear = 0; 
	var num_sword = 1;
	var num_archer = (world ? 3:-999);
	var num_spy = (world ? 4:3);
	var num_marcher = (world ? 6:-999);
	var num_heavy = (world ? 7:5);	
	var num_catapult = (world ? 9:7);
	var num_knight = (world ? 10:8);
	var units_img=(world ? ar_img:nonar_img);
	var obj = new Object();
	$('#units_table tr.row_a, #units_table tr.row_b').each(function(a) {
		acc = '';
		$(this).find('a').each(function(b) {
			if ($(this).attr('href').search(/info_player&/) != -1) {acc = '<a href="'+$(this).attr('href')+'" target="_blank">'+$(this).html()+'</a>';}
		}
		);
		if (acc != '') {
			var count = obj[acc];
			if (obj[acc] == undefined) {
				count = new Object();
				count.spear = 0;
				count.sword = 0;
				count.archer = 0;
				count.spy = 0;
				count.marcher = 0;
				count.heavy = 0;
				count.catapult = 0;
				count.knight = 0;
				obj[acc] = count;
			}
			count.spear += parseInt($(this).find('td.unit-item:eq('+ num_spear +')').html());
			count.sword += parseInt($(this).find('td.unit-item:eq('+ num_sword +')').html());					
			if (world) count.archer += parseInt($(this).find('td.unit-item:eq('+ num_archer +')').html());
			count.spy += parseInt($(this).find('td.unit-item:eq('+ num_spy +')').html());			
			if (world) count.marcher += parseInt($(this).find('td.unit-item:eq('+ num_marcher +')').html());
			count.heavy += parseInt($(this).find('td.unit-item:eq('+ num_heavy +')').html());			
			count.catapult += parseInt($(this).find('td.unit-item:eq('+ num_catapult +')').html());
			count.knight += parseInt($(this).find('td.unit-item:eq('+ num_knight +')').html());
			obj[acc] = count;
		}
	});
	var counter = 0;
	var sum = 0;
	troops = (typeof(Truppenanzahl) == 'undefined') ? 20000 : Truppenanzahl;
	$.each(obj, function(acc,count) {
		counter++;
deffs = ((count.spear + count.sword + count.archer + 2*count.spy + 5*count.marcher + 6*count.heavy + 8*count.catapult)/troops).toFixed(1);
odd= 4*count.spear + 5*count.sword + 6*count.archer + 1*count.spy + 6*count.marcher + 23*count.heavy + 12*count.catapult;
output +='<tr><td><center>'+acc+ '</center></td><td><center>'+deffs+'</center></td><td><center>'+Tsal_Number(odd)+'</center></td><td><center>';
var troops_count=Tsal_Number(count.spear)+'</center></td><td><center>'+Tsal_Number(count.sword)+'</center></td><td><center>'+Tsal_Number(count.archer)+'</center></td><td><center>'+Tsal_Number(count.spy)+'</center></td><td><center>';
troops_count+=Tsal_Number(count.marcher)+'</center></td><td><center>'+Tsal_Number(count.heavy)+'</center></td><td><center>'+Tsal_Number(count.catapult)+'</center></td><td><center>'+Tsal_Number(count.knight)+'</center></td></<tr>';
var troops_count1=Tsal_Number(count.spear)+'</center></td><td><center>'+Tsal_Number(count.sword)+'</center></td><td><center>'+Tsal_Number(count.spy)+'</center></td><td><center>';
troops_count1+=Tsal_Number(count.heavy)+'</center></td><td><center>'+Tsal_Number(count.catapult)+'</center></td><td><center>'+Tsal_Number(count.knight)+'</center></td></<tr>';
output+=(world ? troops_count:troops_count1);
		sum += Math.round(Number(deffs)*10)/10;
//var output1+=tsalkapone_trans.general.support_units+'<br>[spoiler=Info]<br>[unit]spear[/unit]:'+Tsal_Number(count_spear)+'<br>[unit]sword[/unit]:'+Tsal_Number(count_sword)+'<br>[unit]archer[/unit]:
	});
	if ($('#ADS_Display').size()==0){
var tsal_output="<div id='ADS_Display' style='border-radius: 8px; border: 2px #804000 solid; background-color: #F1EBDD'>";
tsal_output+="<div id='inline_popup_menu' style='cursor: move; text-align:center;'><font color='maroon'>"+ game_data.player.name +" ("+ $('#serverDate').text() +")</font></div>";
tsal_output+='<table class="vis" width="100%"><thead><tr><th><center><font color="maroon">'+tsalkapone_trans.general.player_name+'</font></center></th><th><center><font color="maroon">'+tsalkapone_trans.general.pop_count+'</font></center></th><th><center><font color="maroon">'+tsalkapone_trans.general.oda_count+'</font></center></th>'+units_img+'</tr></thead><tbody>';
tsal_output+=output+'</tbody></table>';
tsal_output+="<div style='padding: 15px 10px 5px 10px;'><table id='ADS_Display_Main' style='vertical-align:middle;'></table><hr><center><a onclick='$(\"#ADS_Display\").slideUp(2000);' style='cursor: pointer;' class='btn'>"+tsalkapone_trans.buttons.close_table+"</a></center></div></div>";
			$('#paged_view_content').prepend(tsal_output);
		} else {
			$("#ADS_Display").show();
		}
};    ADS_Unterstuetzung_zaehlen(doc);
	}
	Tsalkapone_Count_Support();
          
}
else {

function fnExecuteScript(){
try{
	var strVersion="v1.0";
	
	var unitDesc = {
		"spear":""+tsalkapone_trans.general.spear+"",
		"sword":""+tsalkapone_trans.general.sword+"",
		"axe":""+tsalkapone_trans.general.axe+"",
		"archer":""+tsalkapone_trans.general.archer+"",
		"spy":""+tsalkapone_trans.general.spy+"",
		"light":""+tsalkapone_trans.general.light+"",
		"marcher":""+tsalkapone_trans.general.marcher+"",
		"heavy":""+tsalkapone_trans.general.heavy+"",
		"ram":""+tsalkapone_trans.general.ram+"",
		"catapult":""+tsalkapone_trans.general.cats+"",
		"knight":""+tsalkapone_trans.general.knight+"",
		"snob":""+tsalkapone_trans.general.snob+"",
		"militia":""+tsalkapone_trans.general.militia+"",
		"offense":""+tsalkapone_trans.general.offensive+"",
		"defense":""+tsalkapone_trans.general.defensive+""
	};
	var imageDesc = {
		"spear":"<img src='graphic/unit/unit_spear.png'>",
		"sword":"<img src='graphic/unit/unit_sword.png'>",
		"axe":"<img src='graphic/unit/unit_axe.png'>",
		"archer":"<img src='graphic/unit/unit_archer.png'>",
		"spy":"<img src='graphic/unit/unit_spy.png'>",
		"light":"<img src='graphic/unit/unit_light.png'>",
		"marcher":"'<img src='graphic/unit/unit_marcher.png'>",
		"heavy":"<img src='graphic/unit/unit_heavy.png'>",
		"ram":"<img src='graphic/unit/unit_ram.png'>",
		"catapult":"<img src='graphic/unit/unit_catapult.png'>",
		"knight":"<img src='graphic/unit/unit_knight.png'>",
		"snob":"<img src='graphic/unit/unit_snob.png'>",
		"militia":"<img src='graphic/unit/unit_milita.png'>",
		"offense":"<img style='top:+5px; width:35px;height:30px; position: relative;' src='https://media.innogamescdn.com/com_DS_GR/Scripts/images/Tsalkapone_master_tool_images/Tsalkapone_off.png'>",
		"defense":"<img style='top:+5px; width:35px;height:30px; position: relative;' src='https://media.innogamescdn.com/com_DS_GR/Scripts/images/Tsalkapone_master_tool_images/Tsalkapone_gendef.png'>"
	};
		var tsaloutput='<font color="red"><b><u>'+tsalkapone_trans.general.twconfig+'</u></b></font><br><br>';
tsaloutput+= '<span  id="tsalkapone_rev_show"><input type="button" class="btn" id="tsalkapone_reveal" value="'+tsalkapone_trans.buttons.set_show+'"></span>';
tsaloutput+='<span style="display:none" id="tsalkapone_rev_hide"><input type="button" class="btn" id="tsalkapone_hide" value="'+tsalkapone_trans.buttons.set_hide+'"></span>';
 tsaloutput+="<hr><div id='tsalkapone_twconfig1' style='display:none;'></div>";
 $("#ds_body").append(tsaloutput);
	function fnDebugLog(msg){
	$('#tsalkapone_twconfig1').append('<span>'+msg+'</span><br/>');
	}
		
		
		$("#tsalkapone_reveal").click(function(){
        document.getElementById('tsalkapone_rev_hide').style.display="";
		document.getElementById('tsalkapone_rev_show').style.display="none";
		document.getElementById('tsalkapone_twconfig1').style.display="";
    });
    $("#tsalkapone_hide").click(function(){
        document.getElementById('tsalkapone_rev_hide').style.display="none";
		document.getElementById('tsalkapone_rev_show').style.display="";
		document.getElementById('tsalkapone_twconfig1').style.display="none";
    });
	
	
	/* sendMethod = "GET" || "POST", params = json, type = xml,json,text */
	function fnAjaxRequest(url,sendMethod,params,type){
		var error=null,payload=null;
		
		$.ajax({
			"async":false,
			"url":url,
			"data":params,
			"dataType":type,
			"type":String(sendMethod||"GET").toUpperCase(),
			"error":function(req,status,err){error="ajax: " + status;},
			"success":function(data,status,req){payload=data;}
		});
	
		if(error){
			throw(error);
		}
		
		return payload;
	}

	function fnCreateConfig(name){return $(fnAjaxRequest("/interface.php","GET",{"func":name},"xml")).find("config");}
	function fnCreateWorldConfig(){return fnCreateConfig("get_config");}
	function fnCreateBuildingConfig(){return fnCreateConfig("get_building_info");}
	function fnCreateUnitConfig(){return fnCreateConfig("get_unit_info");}

	function fnHasArchers(){return (parseInt(game_data.worldConfig.find("game archer").text()||"0",10)>0);}
	function fnHasChurch(){return (parseInt(game_data.worldConfig.find("game church").text()||"0",10)>0);}
	function fnHasNotebook(){return ($('[src*="note.png"],[class*="note-icon"]').length>0);}
	function fnHasPaladin(){return (parseInt(game_data.worldConfig.find("game knight").text()||"0",10)>0);}
	function fnHasMilitia(){return (game_data.unitConfig.find("militia").length>0);}
    
	function fnTranslate(id){
		var tsald =""; var tsald2='';
if(fnHasArchers()){tsald=tsalkapone_trans.general.temp36; tsald2=tsalkapone_trans.general.temp23;}
 else {tsald=tsalkapone_trans.general.temp37; tsald2=tsalkapone_trans.general.temp38;}
		var translation={
			"en":[
			
			""+tsalkapone_trans.general.temp1+"",
			""+tsalkapone_trans.general.temp2+"",
			""+tsalkapone_trans.general.temp3+"",
			""+tsalkapone_trans.general.temp4+"",
			""+tsalkapone_trans.general.temp35+"",
            ""+tsalkapone_trans.general.temp5+"",
			""+tsalkapone_trans.general.temp6+"",
			""+tsalkapone_trans.general.temp7+"",
			""+tsalkapone_trans.general.temp8+"",
			""+tsalkapone_trans.general.temp9+"",
			""+tsalkapone_trans.general.temp10+"",
            ""+tsalkapone_trans.general.temp11+"",
            ""+tsalkapone_trans.general.temp12+"",
            ""+tsalkapone_trans.general.temp13+"",
            ""+tsalkapone_trans.general.temp14+"",
			""+tsalkapone_trans.general.temp15+"",
			""+tsalkapone_trans.general.temp16+"",
			""+tsalkapone_trans.general.temp17+"",
			""+tsalkapone_trans.general.temp18+"",
            ""+tsalkapone_trans.general.temp19+"",
            ""+tsalkapone_trans.general.temp20+"",
            ""+tsalkapone_trans.general.temp21+"",
            ""+tsalkapone_trans.general.temp22+"",
            ""+tsalkapone_trans.general.temp27+" "+tsald2+"",
            ""+tsalkapone_trans.general.temp24+"",
			""+tsalkapone_trans.general.temp25+"",
			""+tsalkapone_trans.general.temp26+"",
			""+tsalkapone_trans.general.temp27+" "+tsald+"",
			""+tsalkapone_trans.general.temp28+"",
			""+tsalkapone_trans.general.temp29+"",
			""+tsalkapone_trans.general.temp30+"",
			""+tsalkapone_trans.general.temp31+"",
			""+tsalkapone_trans.general.temp32+"",
			""+tsalkapone_trans.general.temp33+"",
            ""+tsalkapone_trans.general.temp34+"",
			""+tsalkapone_trans.general.temp39+"",
			""+tsalkapone_trans.general.temp40+"",
			""+tsalkapone_trans.general.temp41+"",
			""+tsalkapone_trans.general.temp42+"",
			""+tsalkapone_trans.general.temp43+"",
				"<font color='darkorange'>"+tsalkapone_trans.general.script+"</font>",
				"<font color='darkgreen'>"+tsalkapone_trans.general.group1+"</font>",
				"<font color='darkgreen'>"+tsalkapone_trans.general.group2+"</font>",
                                "<font color='darkgreen'>"+tsalkapone_trans.general.group3+"</font>",
				"<font color='darkgreen'>"+tsalkapone_trans.general.group4+"</font>",
                                "<font color='darkgreen'>"+tsalkapone_trans.general.group5+"</font>",
                                "<font color='darkgreen'>"+tsalkapone_trans.general.group6+"</font>",
				"<font color='darkgreen'>"+tsalkapone_trans.general.group7+"</font>",
				"<font color='darkgreen'>"+tsalkapone_trans.general.group8+"</font>",
				"<font color='darkgreen'>"+tsalkapone_trans.general.group9+"</font>",
				"<font color='darkgreen'>"+tsalkapone_trans.general.group10+"</font>",
				"<font color='darkgreen'>"+tsalkapone_trans.general.group11+"</font>",
				"<font color='darkgreen'>"+tsalkapone_trans.general.group12+"</font>",
                "<font color='darkgreen'>"+tsalkapone_trans.general.group13+"</font>",
				"<font color='darkgreen'>"+tsalkapone_trans.general.group14+"</font>",
				"<font color='darkgreen'>"+tsalkapone_trans.general.group15+":</font>"
			]
		};
		
		/* Default to English "en". */
		var lang=typeof(translation[game_data.market]=="undefined")?"en":game_data.market;
		if(typeof(translation[lang][id])=="undefined"){
			return "";
		}
		
		return translation[lang][id];
	}

	

	function fnGetTroopCount(){				
		/* returns an array of: {"x":"xxx","y":"yyy","coords":"xxx|yyy","troops":[0,0,0,0,0,0,0,0,0,0,0,0,0]} */

		/* Number of Columns - VillageColumn - ActionColumn */
		var gameVersion = 100.0; //parseFloat(game_data.version.match(/[\d|\.]+/g)[1]);
		var colCount = $('#units_table '+((gameVersion>=7.1)?'thead':'tbody:eq(0)')+' th').length - 2;
		var villageTroopInfo=[];
				
		$('#units_table tbody'+((gameVersion<7.1)?':gt(0)':'')).each(function(row,eleRow){
			/* Reset for next Village */
			var villageData={"troops":[0,0,0,0,0,0,0,0,0,0,0,0,0]};

			/* Village */
			coords=$(eleRow).find("td:eq(0)").text().match(/\d+\|\d+/g);
			coords=(coords?coords[coords.length-1].match(/(\d+)\|(\d+)/):null);
			villageData.x = parseInt(coords[1],10);
			villageData.y = parseInt(coords[2],10);
			villageData.coords = coords[0];

			/* Skip the Village Cell */
			$(eleRow).find("td:gt(0):not(:has(>a))").each(function(cell,eleCell){
				/* Skip the RowType Cell */
				if(cell%colCount){
					/* Ignore In the village (your own + foreign) */
					if(Math.floor(cell/colCount) != 1){
						villageData.troops[cell%colCount-1] += parseInt($(eleCell).text()||"0",10);
					}
				}
			});

			/* Cache the Data */
			villageTroopInfo.push(villageData);
		});
			
		return villageTroopInfo;
	}

	function fnLogVersionInfo(){
		fnDebugLog("=========================");
		fnDebugLog("Tsalkapone - "+tsalkapone_trans.general.script+" : " + strVersion);
		fnDebugLog("=========================");
		fnDebugLog("Λογαριασμός Premium: "+(game_data.isPremium?"Ενεργός":"Απενεργοποιημένος"));
		fnDebugLog("Εκκλησία : "+(fnHasChurch()?"Ενεργή":"Απενεργοποιημένη"));
		fnDebugLog("Paladin : "+(fnHasPaladin()?"Ενεργός":"Απενεργοποιημένος"));
		fnDebugLog("Τοξότες : "+(fnHasArchers()?"Ενεργοί":"Απενεργοποιημένοι"));
		fnDebugLog("Εθνοφρουρά: "+(fnHasMilitia()?"Ενεργή":"Απενεργοποιημένη"));
		fnDebugLog("Επιτηρητής : "+(location.href.match(/t\=\d+/i)?"Ενεργός":"Απενεργοποιημένος"));
		fnDebugLog("=========================");
		fnDebugLog("Έκδοση: "+game_data.version);
		fnDebugLog("Κόσμος  : "+game_data.world);
		fnDebugLog("Τοποθεσία σελίδας : "+game_data.screen);
		fnDebugLog("Κατεύθυνση σελίδας   : "+game_data.mode);
		fnDebugLog("URL    : "+location.href);
		fnDebugLog("Έκδοση Browser: "+navigator.userAgent);
		fnDebugLog("=========================");
	}

	function fnCriteriaToStr(criteria){
		var valueStr = "";

		if(criteria && (criteria.length > 0)){
             var valueStr1="<u><b><font color='maroon'>"+tsalkapone_trans.general.unit_info+":</b></font></u><br><br>";
			for(var ii=0; ii < criteria.length; ii++){
              
				if(typeof(criteria[ii].minpop) != "undefined"){
					valueStr += (valueStr?" "+tsalkapone_trans.general.sun+" ":"") + ""+ imageDesc[criteria[ii].unit] + " >= " + criteria[ii].minpop + "";
				}
				if(typeof(criteria[ii].maxpop) != "undefined"){
					valueStr += (valueStr?" "+tsalkapone_trans.general.sun+" ":"") + "" + imageDesc[criteria[ii].unit] + " < " + criteria[ii].maxpop + "";
				}
			}
		}
	
		return valueStr1+valueStr;
	}

	function fnCalculateTroopCount(){
		var maxGroups=40;
		var tsal_debug="";
		var tsal_debug1='';
		var tsal_debug2='';
		if(fnHasArchers()){
			tsal_debug="archer";
			tsal_debug1=1000;
			tsal_debug2="sword";
		} else {tsal_debug="catapult"; tsal_debug1=3200; tsal_debug2="spear";}
		var outputSummary = {
			"Τουλάχιστον 5 αρίστους":{
				"group":"Nobles",
				"criteria":[{"unit":"snob","minpop":500}],
				"descID":0
			},
			"Ολοκληρωμένες εκκαθαριστικές με τουλάχιστον 4 αρίστους":{
				"group":"Nobles",
				"criteria":[{"unit":"snob","minpop":400},{"unit":"offense","minpop":19600}],
				"descID":1
			},
			"Ολοκληρωμένα αμυντικά με τουλάχιστον 4 αρίστους":{
				"group":"Nobles",
				"criteria":[{"unit":"snob","minpop":400},{"unit":"defense","minpop":19600}],
				"descID":2
			},
			"Ολοκληρωμένα χωριά με λιγότερους από 4 αρίστους":{
				"group":"Nobles",
				"criteria":[{"unit":"snob","maxpop":400},{"unit":"defense","minpop":19600},{"unit":"offense","minpop":19600}],
				"descID":3
			},
                        "Άλλα χωριά με αρίστους":{
				"group":"Nobles",
				"criteria":[{"unit":"snob","minpop":100},{"unit":"defense","maxpop":19600},{"unit":"offense","maxpop":19600}],
				"descID":4
			},
			"Ολοκληρωμένες εκκαθαριστικές":{
				"group":"Επιθετικά",
				"criteria":[{"unit":"snob","maxpop":100},{"unit":"offense","minpop":20000}],
				"descID":5
			},
			"3/4 Εκκαθαριστικής":{
				"group":"Επιθετικά",
				"criteria":[{"unit":"offense","minpop":15000,"maxpop":20000}],
				"descID":6
			},
			"1/2 Εκκαθαριστικής":{
				"group":"Επιθετικά",
				"criteria":[{"unit":"offense","minpop":10000,"maxpop":15000}],
				"descID":7
			},
			"1/4 Εκκαθαριστικής":{
				"group":"Επιθετικά",
				"criteria":[{"unit":"offense","minpop":5000,"maxpop":10000}],
				"descID":8
			},
			"Επιθετικά με τουλάχιστον 100 καταπέλτες":{
				"group":"Κατάρριψη",
				"criteria":[{"unit":"catapult","minpop":800},{"unit":"offense","minpop":20000}],
				"descID":9
			},
                        "Επιθετικά με περισσότερους από 800 κριούς":{
				"group":"Κατάρριψη",
				"criteria":[{"unit":"ram","minpop":4000},{"unit":"offense","minpop":20000}],
				"descID":10
			},
                        "Επιθετικά με 500-800 κριούς":{
				"group":"Κατάρριψη",
				"criteria":[{"unit":"ram","minpop":2500,"maxpop":4000},{"unit":"offense","minpop":20000}],
				"descID":11
			},
            "Επιθετικά με 250-499 κριούς":{
				"group":"Κατάρριψη",
				"criteria":[{"unit":"ram","minpop":1250,"maxpop":2495},{"unit":"offense","minpop":20000}],
				"descID":12
			},
             "Επιθετικά με 100-249 κριούς":{
				"group":"Κατάρριψη",
				"criteria":[{"unit":"ram","minpop":500,"maxpop":1245},{"unit":"offense","minpop":20000}],
				"descID":13
			},
          
			"Ολοκληρωμένα αμυντικά":{
				"group":"Αμυντικά",
				"criteria":[{"unit":"defense","minpop":20000}],
				"descID":14
			},
			"3/4 Αμυντικά":{
				"group":"Αμυντικά",
				"criteria":[{"unit":"defense","minpop":15000,"maxpop":20000}],
				"descID":15
			},
			"1/2 Αμυντικά":{
				"group":"Αμυντικά",
				"criteria":[{"unit":"defense","minpop":10000,"maxpop":15000}],
				"descID":16
			},
			"1/4 Αμυντικά":{
				"group":"Αμυντικά",
				"criteria":[{"unit":"defense","minpop":5000,"maxpop":10000}],
				"descID":17
                        },
			"Ολοκληρωμένα Καταπελτάδικα":{
				"group":"Καταπελτάδικα",
				"criteria":[{"unit":"catapult","minpop":20000}],
				"descID":18
                        },
                        "3/4 Καταπελτάδικα":{
				"group":"Καταπελτάδικα",
				"criteria":[{"unit":"catapult","minpop":15000,"maxpop":20000}],
				"descID":19
                        },
             "1/2 Καταπελτάδικα":{
				"group":"Καταπελτάδικα",
				"criteria":[{"unit":"catapult","minpop":8000,"maxpop":15000}],
				"descID":20
                        },
			"Χωριά με 500-1000 καταπέλτες":{
				"group":"Καταπελτάδικα",
				"criteria":[{"unit":"catapult","minpop":4000, "maxpop":8000}],
				"descID":21
			},
                          "Αμυντικά με 1000 βαρύ ιππικό":{
				"group":"πακέτα",
				"criteria":[{"unit":"heavy","minpop":6000}],
				"descID":22
                         },
                          "Αμυντικά με 1000 τοξότες":{
				"group":"πακέτα",
				"criteria":[{"unit":""+tsal_debug+"","minpop":tsal_debug1}],
				"descID":23
                         },
						 "Αμυντικά με 1000 δορατοφόρους":{
				"group":"πακέτα",
				"criteria":[{"unit":"spear","minpop":1000}],
				"descID":24
                         },
						 "Αμυντικά με 1000 ξιφομάχους":{
				"group":"πακέτα",
				"criteria":[{"unit":"sword","minpop":6000}],
				"descID":25
                         },
						 "Αμυντικά με 1000 ξιφομάχους-δορατοφόρους":{
				"group":"πακέτα",
				"criteria":[{"unit":"sword","minpop":1000},{"unit":"spear","minpop":1000}],
				"descID":26
                         },
						 "Αμυντικά με 1000 ξιφομάχους-τοξότες":{
				"group":"πακέτα",
				"criteria":[{"unit":""+tsal_debug2+"","minpop":1000},{"unit":""+tsal_debug+"","minpop":tsal_debug1}],
				"descID":27
                         },
						 "Αμυντικά με 1000 βαρύ ιππικό-δορατοφόρους":{
				"group":"πακέτα",
				"criteria":[{"unit":"heavy","minpop":1000},{"unit":"spear","minpop":1000}],
				"descID":28
                         },
			"Ολοκληρωμένα ανιχνευτάδικα":{
				"group":"Ανιχνευτές",
				"criteria":[{"unit":"spy","minpop":20000}],
				"descID":29
			},
			"3/4 Ανιχνευτάδικα":{
				"group":"Ανιχνευτές",
				"criteria":[{"unit":"spy","minpop":15000,"maxpop":20000}],
				"descID":30
			},
			"1/2 Ανιχνευτάδικα":{
				"group":"Ανιχνευτές",
				"criteria":[{"unit":"spy","minpop":10000,"maxpop":15000}],
				"descID":31
			},
			"1/4 Ανιχνευτάδικα":{
				"group":"Ανιχνευτές",
				"criteria":[{"unit":"spy","minpop":5000,"maxpop":10000}],
				"descID":32
			},
                        "Χωριά με 500-2500 ανιχνευτές":{
				"group":"Ανιχνευτές",
				"criteria":[{"unit":"spy","minpop":1000,"maxpop":5000}],
				"descID":33
			},
			"Άλλα No1":{
				"group":"Other",
				"criteria":[{"unit":"spy","maxpop":1000},{"unit":"defense","maxpop":5000},{"unit":"offense","maxpop":5000},],
				"descID":34
			},
			"Άλλα No4":{
				"group":"Other",
				"criteria":[{"unit":"spy","minpop":1000},{"unit":"defense","minpop":5000},{"unit":"offense","minpop":5000}],
				"descID":35
			},
			"Άλλα No2":{
				"group":"Other",
				"criteria":[{"unit":"heavy","minpop":2500},{"unit":"offense","minpop":15000}],
				"descID":36
			},
			"Άλλα No3":{
				"group":"Other",
				"criteria":[{"unit":"defense","minpop":15000},{"unit":"ram","maxpop":120}],
				"descID":37
			},
			"Άλλα No5":{
				"group":"Other",
				"criteria":[{"unit":"defense","minpop":10000},{"unit":"light","minpop":400}],
				"descID":38
			},
			"Άλλα No6":{
				"group":"Other",
				"criteria":[{"unit":"defense","maxpop":5000},{"unit":"offense","minpop":10000}],
				"descID":39
			}
		};	
	
		var ii,jj,village,total,index,count,unit,item,key,criteria,condition,isValid;
		var defense = ["spear","sword","heavy","catapult"];
		var offense = ["axe","light","ram","catapult"];
		
		if(fnHasMilitia()){
			defense.push("militia");
		}
		
		if(fnHasArchers()){
			defense.push("archer");
			offense.push("marcher");
		}
/*	
		if(fnHasPaladin()){
			offense.push("knight");
		}
*/	

		/* Initialize */
		var summary = {
			unitTotal:{"tally":0,"population":0},
			defense:{"tally":0,"count":0,"population":0,"coords":[]},
			offense:{"tally":0,"count":0,"population":0,"coords":[]}
		};
		
		$(game_data.unitConfig).children().each(function(i,e){
			summary[e.nodeName]={"tally":0,"count":0,"population":0,"coords":[]};
		});

		for(item in outputSummary){
			if(outputSummary.hasOwnProperty(item)){
				summary[item]={"tally":0,"count":0,"population":0,"coords":[]};
			}
		}
					
		var villageTroops = fnGetTroopCount();
		for(ii=0;ii<villageTroops.length;ii++){
			village = villageTroops[ii];
			total = {
				defense:{"tally":0,"count":0,"population":0,"coords":[]},
				offense:{"tally":0,"count":0,"population":0,"coords":[]}
			};

			$(game_data.unitConfig).children().each(function(i,e){
				total[e.nodeName]={"tally":0,"count":0,"population":0,"coords":[]};
			});
			
			/* Calculate total count & population for each unit type */
			index=0;
			$(game_data.unitConfig).children().each(function(i,e){
				var unit=e.nodeName;
				total[unit].count += village.troops[index];
				total[unit].population += village.troops[index]*parseInt($(e).find("pop").text(),10);

				/* Defense */
				if (new RegExp('^(' + defense.join('|') + ')$').test(unit)){
					total.defense.count += total[unit].count;
					total.defense.population += total[unit].population;
				}
	
				/* Offense */
				if (new RegExp('^(' + offense.join('|') + ')$').test(unit)){
					total.offense.count += total[unit].count;
					total.offense.population += total[unit].population;
				}
			
				/* Units */
				summary[unit].count += total[unit].count;
				summary[unit].population += total[unit].population;
					
				/* All Units */
				summary.unitTotal.tally += total[unit].count;
				summary.unitTotal.population += total[unit].population;
			
				index++;
			});
		
			summary.defense.count += total.defense.count;
			summary.defense.population += total.defense.population;
		
			summary.offense.count += total.offense.count;
			summary.offense.population += total.offense.population;
				
			/* Calculate other summaries */
			for(item in outputSummary){
				if(outputSummary.hasOwnProperty(item)){
					isValid=true;
					
					for(jj=0;jj<outputSummary[item].criteria.length;jj++){
						criteria=outputSummary[item].criteria[jj];
						
						if(!((typeof(criteria.minpop)=="undefined")||!criteria.minpop||(total[criteria.unit].population>=criteria.minpop))){
							isValid=false;
						}
									
						if(!((typeof(criteria.maxpop)=="undefined")||!criteria.maxpop||(total[criteria.unit].population<criteria.maxpop))){
							isValid=false;
						}
					}
				
					if(isValid){
						summary[item].coords.push(village.coords);
						summary[item].tally++;
					}
				}
			}
		}
		
		var groupSummary={};
		for(item in outputSummary){
			if(outputSummary.hasOwnProperty(item)){
				if(typeof(groupSummary[outputSummary[item].group])=="undefined"){
					groupSummary[outputSummary[item].group]=[];
				}
				
				groupSummary[outputSummary[item].group].push(item);
			}
		}
		
		var curGroup=maxGroups;
		var lang_img='';
        if (lang=="greek") {lang_img ='<img title="Ελληνικά" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif">';}
        else if (lang=="english") {lang_img ='<img height="20px" style="cursor:help;" title="English/American" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif">';}

	var tsalkaponecell = "";
	tsalkaponecell+='<div id="tsal_counter" class="target-select clearfix vis float_left"><h4><font color=darkgreen><center>Tsalkapone. '+tsalkapone_trans.general.button_list+'</center></font></h4><table class="vis" style="width: 100%"><tbody>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.lang_sel+'</b></font></td>';
tsalkaponecell+='<td><font style="font-family: \'Arial Black\', Gadget, sans-serif;"><span id="openfilter1"><input type="button" value="'+tsalkapone_trans.buttons.lang_open+'" id="openfilterbut1" class="btn"></span><span id="closefilter1" style="display:none">';
tsalkaponecell+='<input class="btn" type="button" value="'+tsalkapone_trans.buttons.lang_close+'" id="closefilterbut1"></span></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.selected_one+'</b></font></td>';
tsalkaponecell+='<td><span id="selectedone"><center>'+lang_img+'</center></span><span id="columnfilter1" style="display:none" class="vis"><font size="2">';
tsalkaponecell+='<br><br><center><font color="blue"><b><u>'+tsalkapone_trans.general.available+'</u></b></font></center>';
tsalkaponecell+='<input type="radio"  name="language" value="greek" id="greek_lang" ><img title="Greek \n\nBy Tsalkapone" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif"><br>';
tsalkaponecell+='<input type="radio"  name="language" value="english" id="english_lang" checked><img height="20px" style="cursor:help;" title="English/American \n\nBy Tsalkapone" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif"><br>';
tsalkaponecell+='</span></td></tr>';
tsalkaponecell+='</tbody></table></div>';
if (! document.getElementById('tsal_counter')){
		$('#content_value').prepend(tsalkaponecell);
}

       if (get_lang == "greek") {document.getElementById('greek_lang').checked = true;}
      else  if (get_lang == "english") {document.getElementById('english_lang').checked = true; }
         $("#english_lang").click(function(){
	localStorage.setItem("troops_counter_lang","english");     
location.reload();
    });
	
      $("#greek_lang").click(function(){
	localStorage.setItem("troops_counter_lang","greek");
location.reload();
    });
    
    $("#openfilterbut1").click(function(){
        document.getElementById('columnfilter1').style.display="";
		document.getElementById('openfilter1').style.display="none";
		document.getElementById('closefilter1').style.display="";
    });
    $("#closefilterbut1").click(function(){
        document.getElementById('columnfilter1').style.display="none";
		document.getElementById('openfilter1').style.display="";
		document.getElementById('closefilter1').style.display="none";
    });
	
	
		var docSource = "";
		var kosmos=game_data.world;
		docSource += "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">\n";
		docSource += "<html>\n";
docSource += "<style>";
docSource += "body {";
docSource += "    background-image: url(\"https://dl.dropboxusercontent.com/s/2rtiz142mgg0gua/Tsalkapone_bg-image.jpg\");";
docSource += "}";
docSource += "<\/style>";
		docSource += "<head>\n";
                docSource +="<link rel=\"shortcut icon\" href=\"https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg\">";
		docSource += "<title>Tsalkapone - "+tsalkapone_trans.general.script+"</title>\n";
		docSource += "<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\"/>\n";				

/*
		docSource += "<link rel=\"stylesheet\" type=\"text/css\" href=\"https://dsgr.innogamescdn.com/assets/gr34/385a0cdb501ac5cb3f661c458a0294cb/css/game/overview_base.css\"/>\n";
*/docSource += '<link rel="stylesheet" type="text/css" href="https://dl.dropboxusercontent.com/s/auhazqvi7p92go5/Tsalkapone.Count_and_Troops.css" />';
		docSource += "<link rel=\"stylesheet\" type=\"text/css\" href=\"https://dsen.innogamescdn.com/assets/"+kosmos+"/95c3ab748f3d3f5fbdbab6c8189ba568/merged/game.css\"/>\n";

		docSource += "<script type=\"text/javascript\">\n";
		docSource += "<!--\n";
		docSource += "function fnShowCoords(id,description){\n";
		docSource += "var coords={};\n";
		for(item in outputSummary){
			if(outputSummary.hasOwnProperty(item)){
				if(summary[item].coords.length){
					docSource += "coords[\"" + item + "\"] = \"" + summary[item].coords.join(" ") + "\";\n";
				}
			}
		}
		docSource += "document.getElementById(\"coords_group\").innerHTML = description;\n";
		docSource += "\n";
		docSource += "var eleCoords = document.getElementById(\"coords_container\");\n";
		docSource += "eleCoords.value = coords[id]?coords[id]:\"\";\n";
		docSource += "eleCoords.focus();\n";
		docSource += "eleCoords.select();\n";
		docSource += "}\n";		
		docSource += "-->\n";
		docSource += "</script>\n";
		docSource += "</head>\n";
		docSource += "\n";
		docSource += "<body>\n";
		docSource += "<table align=\"center\" width='50%'><tr><td>\n";
		docSource += "<table class=\"content-border\" width='100%'><tr><td>\n";
		docSource += "<table class=\"main\" width=\"100%\" align=\"center\">\n";
		docSource += "<tr>\n";
		docSource += "<td id=\"content_value\">\n";
		docSource += "<u><center><h1>" + fnTranslate(curGroup++) + "<sup><span style=\"font-size:small;\"><font color='darkorange'>" + strVersion + "</font></span></sup><sub><br><span style=\"font-weight:70;font-style:italic;text-decoration:none;font-size:x-medium;\"><a href=\"https://forum.tribalwars.net/member.php?114063-Tsalkapone\" target=\"_blank\">"+tsalkapone_trans.general.edited+" Tsalkapone</a></span></sub></h1></center></u>\n";
		docSource += "<hr>\n";

		docSource += "<center><table>\n";
		docSource += "<tr><td width=\"450\" valign=\"top\"><table class=\"vis\" width=\"100%\"><tr><th width='50%' colspan=\"2\"><center><font color='maroon'>" + tsalkapone_trans.general.groups + "</font></center></th></tr>\n";
		for(item in groupSummary){
			if(groupSummary.hasOwnProperty(item)){
				count=0;
				docSource += "<tr><th colspan=\"2\">" + fnTranslate(curGroup++) + "</th></tr>\n";
				for(jj=0;jj<groupSummary[item].length;jj++){
					docSource += "<tr class=\"" + ((count++%2)?"row_b":"row_a") + "\">\n";
					docSource += "<td width=\"240\" style=\"white-space:nowrap;\">";
docSource+='<span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+ fnCriteriaToStr(outputSummary[groupSummary[item][jj]].criteria) +'</span></span>&nbsp;';
                    docSource+="<a href=\"#\" onclick=\"fnShowCoords('" + groupSummary[item][jj] + "','" + fnTranslate(outputSummary[groupSummary[item][jj]].descID) + "');\" >";
                    
                   docSource += " &raquo;&nbsp; " + fnTranslate(outputSummary[groupSummary[item][jj]].descID) + "</a></td>\n";
					docSource += "<td width=\"240\"" + ((summary[groupSummary[item][jj]].tally>0)?"":" class=\"hidden\"") + " style=\"text-align:right;\"><span>" + summary[groupSummary[item][jj]].tally + "</span></td>\n";
					docSource += "</tr>\n";								
				}
			}
		}
		docSource += "</table></center>\n";
		docSource += "<td valign=\"top\">\n";
		
		/* Offensive Units */						
		docSource += "<table class=\"vis\" width=\"100%\">\n";
		docSource += "<tr><th colspan=\"2\"><center><font color='maroon'>" + tsalkapone_trans.general.counting + "</font></center></th></tr>\n<tr><th colspan=\"2\" style=\"white-space:nowrap;\"><img style='top:+5px; width:35px;height:30px; position: relative;' src='https://media.innogamescdn.com/com_DS_GR/Scripts/images/Tsalkapone_master_tool_images/Tsalkapone_off.png'>&nbsp;" + fnTranslate(curGroup++) + "</th></tr>\n";
		count = 0;		
		for(key in offense){
			if(offense.hasOwnProperty(key)){
				docSource += "<tr class=\"" + ((count++%2)?"row_b":"row_a") + "\"><td><img src=\"https://" + location.hostname + "/graphic/unit/unit_" + offense[key] + ".png?1\" alt=\"\"/></td><td style=\"white-space:nowrap;\"><span> " + summary[offense[key]].count + " " + unitDesc[offense[key]] + "</span></td></tr>\n";
			}
		}
		docSource += "</table>\n";
      
		
		/* Defensive Units */
		docSource += "<table class=\"vis\" width=\"100%\">\n";
		docSource += "<tr><th colspan=\"2\" style=\"white-space:nowrap;\"><img style='top:+5px; width:35px;height:30px; position: relative;' src='https://media.innogamescdn.com/com_DS_GR/Scripts/images/Tsalkapone_master_tool_images/Tsalkapone_gendef.png'>&nbsp;" + fnTranslate(curGroup++) + "</th></tr>\n";
		count = 0;		
		for(key in defense){
			if(defense.hasOwnProperty(key)){
				docSource += "<tr class=\"" + ((count++%2)?"row_b":"row_a") + "\"><td><img src=\"https://" + location.hostname + "/graphic/unit/unit_" + defense[key] + ".png?1\" alt=\"\"/></td><td style=\"white-space:nowrap;\"><span> " + summary[defense[key]].count + " " + unitDesc[defense[key]] + "</span></td></tr>\n";
			}
		}
		docSource += "</table>\n";

		/* Other Units */
		docSource += "<table class=\"vis\" width=\"100%\">\n";
		docSource += "<tr><th colspan=\"2\" style=\"white-space:nowrap;\">" + fnTranslate(curGroup++) + "</th></tr>\n";
		count = 0;
		$(game_data.unitConfig).children().each(function(i,e){
			var unit=e.nodeName;
			if(!new RegExp('^(' + defense.join('|') + '|' + offense.join('|') + ')$').test(unit)){
				docSource += "<tr class=\"" + ((count++%2)?"row_b":"row_a") + "\"><td><img src=\"https://" + location.hostname + "/graphic/unit/unit_" + unit + ".png?1\" alt=\"\"/></td><td style=\"white-space:nowrap;\"><span> " + summary[unit].count + " " + unitDesc[unit] + "</span></td></tr>\n";
			}
		});
		docSource += "</table>\n";
		
		/* Total Units */
		docSource += "<table class=\"vis\" width=\"100%\">\n";
		docSource += "<tr><th colspan=\"2\" style=\"white-space:nowrap;\">" + fnTranslate(curGroup++) + "</th></tr>\n";
		docSource += "<tr class=\"" + "row_a" + "\"><td><b><font color='red'><span>"+tsalkapone_trans.general.plithos+":</span></font></b></td><td style=\"white-space:nowrap;\"><span> " + summary.unitTotal.tally + " </span></td></tr>\n";
		docSource += "<tr class=\"" + "row_b" + "\"><td><b><font color='red'><span>"+tsalkapone_trans.general.farm+":</span></font></b></td><td style=\"white-space:nowrap;\"><span> " + summary.unitTotal.population + "</span></td></tr>\n";
         /* Units in Table */	
        		docSource += "<tr><th colspan='2'>" + fnTranslate(curGroup++) + "</th></tr>";
        docSource += "<tr class=\"" + "row_b" + "\"><td colspan='2'>";
		docSource += "<textarea onclick='this.select();' rows='5' cols='50'>[spoiler="+game_data.player.name+" - "+tsalkapone_trans.general.report+"][table]";
        docSource+="[**]"+tsalkapone_trans.general.offensive+"[||]"+tsalkapone_trans.general.monades+"[/**]";
		count = 0;		
        docSource += "";
		for(key in offense){
			if(offense.hasOwnProperty(key)){
                
				docSource += "[*][unit]" + offense[key] + "[/unit][|]";
                docSource += "" + summary[offense[key]].count + "\n";
               
			}}
        docSource+="[/*][**]"+tsalkapone_trans.general.defensive+"[||]"+tsalkapone_trans.general.monades+"[/**]";
        for(key in defense){
        if(defense.hasOwnProperty(key)){
                
				docSource += "[*][unit]" + defense[key] + "[/unit][|]";
                docSource += "" + summary[defense[key]].count + "\n";
               
			}}
			docSource+="[/*][**]"+tsalkapone_trans.general.other+"[||]"+tsalkapone_trans.general.monades+"[/**]";
				count = 0;
		$(game_data.unitConfig).children().each(function(i,e){
			var unit=e.nodeName;
			if(!new RegExp('^(' + defense.join('|') + '|' + offense.join('|') + ')$').test(unit)){
docSource += "[*][unit]" + unit + "[/unit][|]";
docSource += "" + summary[unit].count + "\n";
		}});

         docSource+="[/table][/spoiler]</textarea></td></tr>";
		 /* Units for Mail, Forum */	
        		docSource += "<tr><th colspan='2'>" + fnTranslate(curGroup++) + "</th></tr>";
        docSource += "<tr class=\"" + "row_b" + "\"><td colspan='2'>";
		docSource += "<textarea onclick='this.select();' rows='5' cols='50'>";
        docSource+="[spoiler="+game_data.player.name+" - "+tsalkapone_trans.general.report+"][b][color=red]"+tsalkapone_trans.general.offensive+"[/color][/b]\n[spoiler]";
		count = 0;		
        docSource += "";
		for(key in offense){
			if(offense.hasOwnProperty(key)){
                
				docSource += "[unit]" + offense[key] + "[/unit] -> ";
                docSource += "" + summary[offense[key]].count + "\n";
               
			}}
        docSource+="[/spoiler]\n[b][color=red]"+tsalkapone_trans.general.defensive+"[/color][/b]\n[spoiler]";
        for(key in defense){
        if(defense.hasOwnProperty(key)){
                
				docSource += "[unit]" + defense[key] + "[/unit] -> ";
                docSource += "" + summary[defense[key]].count + "\n";
               
			}}
			docSource+="[/spoiler]\n[b][color=red]"+tsalkapone_trans.general.other+"[/color][/b]\n[spoiler]";
				count = 0;
		$(game_data.unitConfig).children().each(function(i,e){
			var unit=e.nodeName;
			if(!new RegExp('^(' + defense.join('|') + '|' + offense.join('|') + ')$').test(unit)){
docSource += "[unit]" + unit + "[/unit] -> ";
docSource += "" + summary[unit].count + "\n";
		}});

      docSource+="[/spoiler][/spoiler]</textarea></td></tr><tr><td><img width='400px;' height='200px;' src='https://dl.dropboxusercontent.com/s/oi7m7wj2qa4odbm/Why_so_serious.gif'></td></tr>";
		docSource += "</table>\n";

		docSource += "</td>\n";
		docSource += "</td>\n";
		docSource += "</tr>\n";
		docSource += "</table>\n";
		docSource += "<hr>\n";
		docSource += "<table id=\"coordinate_table\" class=\"vis\" style=\"width:100%;\">\n";
		docSource += "<tr><th>" + fnTranslate(curGroup++) + " <i><b><font color='maroon'><span id=\"coords_group\" style=\"font-weight:100;\"></span></font></b></i>\n";
		docSource += "<tr><td style=\"padding:1em;\"><textarea id=\"coords_container\" style=\"width:100%;\"></textarea></td></tr>\n";
		docSource += "";
         
		docSource += "</table>\n";
		docSource += "</table>\n";	
        docSource += "</table>\n";
		docSource += "</body>\n";
		docSource += "</html>\n";

		var popup=open('about:blank','Tsalkapone_Aνάλυση_&_Κατηγοριοποίηση_Στρατευμάτων','width=1000,height=700,scrollbars=yes');
		popup.document.open('text/html','replace');
		popup.document.write(docSource);
		popup.document.close();
	}

		/*==== register ====*/
var script = {
	scriptname: 'Army Reported',
	version: '1.0',
	author: 'Tsalkapone',
	email: 'tsalkapone@hotmail.com',
	broken: false
};
$.post(ScriptAPI.url,script);

	var win=window;

	/* HACK: fix null mode */
	if(!game_data.mode){
		var vmode=$("#overview_menu td[class=selected] a").attr("href").match(/mode\=(\w*)/i);
		if(vmode){
			game_data.mode=vmode[1];
		}
	}
		
	game_data.isPremium=($("#quickbar_outer").length>0);
	
	if(typeof(game_data.worldConfig)=="undefined"){
		game_data.worldConfig=fnCreateWorldConfig();
	}

	if(typeof(game_data.unitConfig)=="undefined"){
		game_data.unitConfig=fnCreateUnitConfig();
	}
	
	/* Todo: Handle different scripts by name */
	if(typeof(game_data.versionDumped)=="undefined"){
		game_data.versionDumped=fnLogVersionInfo();
	}
	


	fnCalculateTroopCount();

	void(0);
}
catch(objError){
	var errMsg=String(objError.message||objError||"");
	if(errMsg){
		fnDebugLog("ΕΙΔΟΠΟΙΗΣΗ: " + errMsg);
		alert("ΕΙΔΟΠΟΙΗΣΗ: " + errMsg);
	}
}}

fnExecuteScript();                       
                         
                         
}


    
