/*
		scriptname:	Script Loader
		version:	1.0.0
		created: July 06, 2016
 		game version:	version	8.48.1
 		author:		Tsalkapone (tsalkapone@hotmail.com)
 
 ==== pages where this can be used ==== 
 * incoming overview (screen=overview_villages&mode=incomings)
  
 ==== changelog ====
 *	06 July 2016 - created
 
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
 
 var get_lang = localStorage.getItem("script_loader_lang");
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
	 script:"Script Loader",
	 notification:"Notification from",
         selected_one:"Current selected language",
         available:"Available languages",
		 button_list:"Scripts List",
		 lang_sel:"Click to change the selected language",		
		message_no:"No",
		message_yes:"Yes",
		message_1:"This script is activated on Settings -> Quick Bar -> Add new link.",
		message_2:" Do you want to automatically assign your location to this page?",
		comm:"Feel free to send any message regarding script bugs or proposing ideas to",
				des:"Function description",
		but:"Buttons",
		title:"Script title",
		edited_by:"Edited by",
		created:"Created by",
		script1:"Additional Map Info",
		script1_t:"Map Info",
		script1_info:"Displays a variety of additional infos on map's villages. The additional infos contain data gathered from the user's battle reports.",
		script2:"Advanced Coords Extractor",
		script2_t:"A.C.E.",
		script2_info:"Search villages through specified criteria and modify/use the results through a large variety of options and tools.",
		script3:"Central Incomings Intelligence",
		script3_t:"C.I.I.",
		script3_info:"Label, sort and colour the incoming commands through a variety of options.",
		script4:"Commander Script",
		script4_t:"Commander",
		script4_info:"Send fake/support/farming/fake commands through a complete variety of options.",
		script5:"Resource Balancer",
		script5_t:"Balancer",
		script5_info:"A script to balance resources among your villages.",
		script6:"Map Scripts",
		script6_t:"Map Tools",
		script6_info:"Find coordinates, display belief radius and resize map through a variety of options and modifications.",
		script7:"Fake Script No1",
		script7_t:"Fake 1",
		script7_info:"Send fake commands with a random choice of target.",
		script8:"Fake Script No2",
		script8_t:"Fake 2",
		script8_info:"Send fake commands with a consecutive choice of target.",
		script9:"Farming Script",
		script9_t:"Farming",
		script9_info:"Send farming commands with a new practical way.",
		script10:"Nuke/Support Script",
		script10_t:"N/S",
		script10_info:"Send nuke/support commands with an elegant way.",
		script11:"Army's Reporter",
		script11_t:"Troops",
		script11_info:"Count and categorize your troops in 40 different templates.",
		script12:"Market Tools",
		script12_t:"Market Tools",
		script12_info:"Balance resources, create offers and send resources using various options.",
		script13:"Time & Distance Calculator",
		script13_t:"Snipe",
		script13_info:"Calculate snipe & back-time commands and distance between two villages.",
		script14:"FA KeyPress",
		script14_t:"KeyPress",
		script14_info:"Sort out villages and send commands through the Loot Assistant using keyboards' shortcuts.",
		script15:"Tsalkapone ToolKit",
		script15_t:"T~T",
		script15_info:"Display a large variety of useful tools, pages, guides, tips & maps.",
		script16:"Script Loader",
		script16_t:"Load a Script",
		script16_info:"A script to help you load a script.",
		script17:"Tribe & Player Stats",
		script17_t:"Stats",
		script17_info:"A scripts that provides various stats, graphs, infos, creates attack plan, generates scripts and design tables.",
		script18:"Village Renamer",
		script18_t:"Renamer",
		script18_info:"A script that provides various tools to help you rename your villages.",
		
	 },
	 buttons:{
		 lang_open:"Open language selection",
              lang_close:"Close language selection",
		 script_load:"Load",
		 more_info:"Click for more info for each script",
	 },
	 notes:{
		activated:"The script Script Loader is already active",
	 },
};
tsalkapone_trans.greek= { 
	 general:{ 
	 script:"Βοηθός Φόρτωσης Script",
	 notification:"Ειδοποίηση από τον",
            selected_one:"Ενεργή γλώσσα",
            available:"Διαθέσιμες γλώσσες",
			button_list:"Λίστα Scripts",
			lang_sel:"Επιλέξτε για να αλλάξετε την επιλεγμένη γλώσσσα",
			message_no:"Όχι",
		message_yes:"Ναι",
		message_1:"Το συγκεκριμένο script ενεργοποιείται από τις Ρυθμίσεις -> Μπάρα συντομεύσεων -> Προσθήκη νέου συνδέσμου.",
		message_2:"Επιθυμείτε αυτόματη ανακατεύθυνση;",
		comm:"Επικοινωνήστε ανά πάσα στιγμή για οποιαδήποτε ιδέα ή πρόταση σχετικά με τα scripts με τον",
				des:"Περιγραφή λειτουργίας",
		but:"Πλήκτρα",
		title:"Τίτλος script",
		edited_by:"Δημιουργήθηκε από τον",
		created:"Δημιουργήθηκε από τον",
	script1:"Additional Map Info",
		script1_t:"Πρόσθετα Χάρτη",
		script1_info:"Εμφανίζει πρόσθετες πληροφορίες στο Χάρτη, εξαγώμενες από τα δεδομένα αναφορών του χρήστη.",
		script2:"Advanced Coords Extractor",
		script2_t:"Εξαγωγέας",
		script2_info:"Αναζητεί χωριά βάση μιας πληθώρας κριτηρίων αναζήτησης και προσφέρει ποικίλα εργαλεία και επιλογής διαμόρφωσης και επεξεργασίας.",
		script3:"Central Incomings Intelligence",
		script3_t:"Αναγνώριση",
		script3_info:"Αναγνώριση, διαχωρισμός και χρωματισμός των εισερχόμενων εντολών μέσα από ποικίλες επιλογές.",
		script4:"Commander Script",
		script4_t:"Εντολές",
		script4_info:"Στείλτε fake/εκκαθαριστικές/υποστηρίξεις/farming εντολές μέσα από μια ποικιλία επιλογών.",
		script5:"Resource Balancer",
		script5_t:"Ισορροπιστής",
		script5_info:"Ένα script για να ισορροπείστε τους πόρους μεταξύ των χωριών σας.",
		script6:"Map Scripts",
		script6_t:"Εργαλεία Χάρτη",
		script6_info:"Εξάγετε συντεταγμένες, σχεδιάστε ακτίνα επιρροής πίστης και διαμορφώστε το μέγεθος του χάρτη μέσα από μια πληθώρα εργαλείων.",
		script7:"Fake Script No1",
		script7_t:"Fake 1",
		script7_info:"Στείλτε fake σε τυχαία επιλεγμένο στόχο.",
		script8:"Fake Script No2",
		script8_t:"Fake 2",
		script8_info:"Στείλτε fake με κυκλική επιλογή στόχου.",
		script9:"Farming Script",
		script9_t:"Farming",
		script9_info:"Στείλτε farming εντολές με πρακτικό τρόπο.",
		script10:"Nuke/Support Script",
		script10_t:"N/S",
		script10_info:"Στείλε εκκαθαριστική/υποστήριξη με πρακτικό τρόπο.",
		script11:"Army's Reporter",
		script11_t:"Στρατός",
		script11_info:"Υπολογίστε και κατηγοριοποιείστε τα στρατεύματά σας σε 40 διαφορετικά πρότυπα.",
		script12:"Market Tools",
		script12_t:"Εργαλεία Αγοράς",
		script12_info:"Ισορροπείστε ή στείλτε πόρους και δημιουργείστε προσφορές μέσα από μια πληθώρα εργαλείων.",
		script13:"Time & Distance Calculator",
		script13_t:"Snipe",
		script13_info:"Υπολογίστε χρόνους snipe ή back-time και αποστάσεις μεταξύ δυο χωριών.",
		script14:"FA KeyPress",
		script14_t:"Farm",
		script14_info:"Διαχωρίστε χωριά και στείλετε επιθέσεις από τον Βοηθό Λεηλασιών χρησιμοποιώντας πλήκτρα συντόμευσης.",
		script15:"Tsalkapone ToolKit",
		script15_t:"T~T",
		script15_info:"Χρησιμοποιείστε μια τεράστια ποικιλία οδηγών, εργαλείων, σελίδων και συμβουλών.",
		script16:"Script Loader",
		script16_t:"Φόρτωση script",
		script16_info:"Ένα script για να σας βοηθήσει να φορτώσετε ένα script στη μπάρα συντομεύσεων.",
		script17:"Tribe & Player Stats",
		script17_t:"Στατιστικά",
		script17_info:"Ένα script που παρέχει διάφορα στατιστικά και εργαλεία σχεδιασμού πλάνου, πίνακα και scripts.",
		script18:"Μετονομασία Χωριών",
		script18_t:"Μετονομασία",
		script18_info:"Ένα script που παρέχει διάφορα εργαλεία για να μετονομάσετε τα χωριά σας.",
	 },
	 buttons:{
		 lang_open:"Άνοιγμα επιλογής γλώσσας",
              lang_close:"Κλείσιμο επιλογής γλώσσας",
		 script_load:"Φόρτωση",
		 more_info:"Επιλέξτε για περισσότερες πληροφορίες για κάθε script",
	 },
	  notes:{
		activated:"Το script Βοηθός Φόρτωσης Script έχει ήδη ενεργοποιηθεί",
	 },
};
    return tsalkapone_trans[lang];
    }());
	
var Tsalactive = location.href.indexOf('mode=quickbar_edit') > -1;
			if (!Tsalactive) {
				var contact_url = "https://forum.tribalwars.net/member.php?114063-Tsalkapone";
	   var content = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="darkgreen">Tsalkapone. '+tsalkapone_trans.general.script+'</font></u></center></h2>' +
'<hr><p><center><font color=maroon><b>'+tsalkapone_trans.general.message_1+'</b></font></center></p>' +
'<p><center><font color=maroon><b>'+tsalkapone_trans.general.message_2+'</b></font></center></p>' +
'<br><br><center><input type="button" class="btn evt-confirm-btn btn-confirm-yes" id="go_man" value="'+tsalkapone_trans.general.message_yes+'">&emsp;<input type="button" class="btn evt-cancel-btn btn-confirm-no" id="close_this" value="'+tsalkapone_trans.general.message_no+'"></center>'+ 
'<br><br><hr><center><img class="tooltip-delayed" title="<font color=darkgreen>Tsalkapone. '+tsalkapone_trans.general.script+'</font>" src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg" style="cursor:help; position: relative"></center><br><center><p>'+tsalkapone_trans.general.comm+' <a href="'+contact_url+'" title="Tsalkapone profile" target="_blank">Tsalkapone</a>.</p></center>' +
'</div>';            
Dialog.show('script_loader_intro', content);
$("#go_man").click(function () { window.location.assign(game_data.link_base_pure+"settings&mode=quickbar_edit");});   
$("#close_this").click(function () { var close_this = document.getElementsByClassName('popup_box_close'); close_this[0].click(); });
	} 
	else {	

var lang_img='';
        if (lang=="greek") {lang_img ='<img title="Ελληνικά" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif">';}
        else if (lang=="english") {lang_img ='<img height="20px" style="cursor:help;" title="English/American" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif">';}
 var tsaldiamorfwsi='<link rel="stylesheet" type="text/css" href="https://dl.dropboxusercontent.com/s/r3ov8brxa6oxoal/Tsalkapone.Advanced_Coords_Extractor.css" />';
	var	tsalbody='<style>';
tsalbody+='.tsalkembed1{ font-family: "Comic Sans MS", cursive, sans-serif;font-style:italic;color: purple;-webkit-animation: mymove1 3s infinite; -moz-animation: mymove1 3s infinite; animation: mymove1 6s infinite;font-weight: bold;}';
tsalbody+='@-webkit-keyframes mymove1 {50% {color: red;}} @-moz-keyframes mymove1 {50% {color: red;}} @keyframes mymove1 {50% {color:red;}';
tsalbody+='</style>';
var tsalscript='<script type="text/javascript">';
tsalscript+='function load_script (x) {';
tsalscript+="var y = document.getElementsByName(''+x+''); var x1 = document.getElementsByName('name')[0]; var x2 = document.getElementsByName('hovertext')[0]; var x3 = document.getElementsByName('href')[0];";
tsalscript+="x1.value = y[1].innerHTML;  x2.value = y[2].innerHTML; x3.value = y[0].innerHTML; };";
tsalscript+='</script>';

$("head").append(tsaldiamorfwsi+tsalbody+tsalscript);     

var tsalkaponecell = "";
	tsalkaponecell+='<div id="tsalkapone_div" width="100%">';
tsalkaponecell+='<div align="center" style="width:100%;height:30px;line-height:30px;background:url(https://dl.dropboxusercontent.com/s/wwavk9gdi2dhbo5/tsalkapone_top.png) repeat-x">';
tsalkaponecell+='<font color="darkorange" size="4"><b><u>'+tsalkapone_trans.general.script+'</u></b></font>';
tsalkaponecell+='&emsp;<a class="tsalprofile" href="https://forum.tribalwars.net/member.php?114063-Tsalkapone" target="_blank">'+tsalkapone_trans.general.created+' Tsalkapone</a></div>';
	tsalkaponecell+='<div id="tsalbuttons" class="target-select clearfix vis" width="100%"><h4><font color=darkgreen><center>Tsalkapone. '+tsalkapone_trans.general.button_list+'</center></font></h4>';
	tsalkaponecell+='<hr><center><a href="https://dl.dropboxusercontent.com/s/8vnqdhps0romnla/Tsalkapone.NET_Scripts_Project.html" target="_blank"><input type="button" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.more_info+'"></a></center><hr>';
	tsalkaponecell+='<table class="vis" style="width: 100%"><tbody>';
	tsalkaponecell+='<tr><th><font color="blue"><b>'+tsalkapone_trans.general.title+'</b></font></th>';
	tsalkaponecell+='</th><th><font color="blue"><b>'+tsalkapone_trans.general.des+'</b></font></th>';
		tsalkaponecell+='<th><font color="blue"><b>'+tsalkapone_trans.general.but+'</b></font></th></tr>';
tsalkaponecell+='<tr><td style="display:none;"><span name="script1">javascript:$.getScript("https://dl.dropboxusercontent.com/s/kcysj3qhgoc04cu/Tsalkapone.more_map_info.js");void 0;</span></td>';
tsalkaponecell+='<td><font color="maroon"><b><span name="script1" style="display:none">'+tsalkapone_trans.general.script1_t+'</span>'+tsalkapone_trans.general.script1+'</b></font></td>';
tsalkaponecell+='<td><span name="script1">'+tsalkapone_trans.general.script1_info+'</span></td>';
tsalkaponecell+='<td><input type="button" onclick="load_script(this.id);" id="script1" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_load+'"></td></tr>';
tsalkaponecell+="<tr><td style='display:none;'><span name='script2'>javascript:$.getScript('https://dl.dropboxusercontent.com/s/u6f4fro64tbcovr/Tsalkapone.Advanced_Coords_Extractor_ek.js');void 0;</span></td>";
tsalkaponecell+='<td><font color="maroon"><b><span name="script2" style="display:none">'+tsalkapone_trans.general.script2_t+'</span>'+tsalkapone_trans.general.script2+'</b></font></td>';
tsalkaponecell+='<td><span name="script2">'+tsalkapone_trans.general.script2_info+'</span></td>';
tsalkaponecell+='<td><input type="button" onclick="load_script(this.id);" id="script2" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_load+'"></td></tr>';
tsalkaponecell+="<tr><td style='display:none;'><span name='script3'>javascript:$.getScript('https://dl.dropboxusercontent.com/s/839m6tduezyrnew/Tsalkapone.Central_Intelligence_Script_ek.js');void 0;</span></td>";
tsalkaponecell+='<td><font color="maroon"><b><span name="script3" style="display:none">'+tsalkapone_trans.general.script3_t+'</span>'+tsalkapone_trans.general.script3+'</b></font></td>';
tsalkaponecell+='<td><span name="script3">'+tsalkapone_trans.general.script3_info+'</span></td>';
tsalkaponecell+='<td><input type="button" onclick="load_script(this.id);" id="script3" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_load+'"></td></tr>';
tsalkaponecell+="<tr><td style='display:none;'><span name='script4'> javascript:$.getScript('https://dl.dropboxusercontent.com/s/1kfp8ja9k9io86b/Tsalkapone.rally_point_script.js');void 0;</span></td>";
tsalkaponecell+='<td><font color="maroon"><b><span name="script4" style="display:none">'+tsalkapone_trans.general.script4_t+'</span>'+tsalkapone_trans.general.script4+'</b></font></td>';
tsalkaponecell+='<td><span name="script4">'+tsalkapone_trans.general.script4_info+'</span></td>';
tsalkaponecell+='<td><input type="button" onclick="load_script(this.id);" id="script4" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_load+'"></td></tr>';
tsalkaponecell+="<tr><td style='display:none;'><span name='script5'>javascript:$.getScript('https://dl.dropboxusercontent.com/s/1a13gasf5t2g8jy/Tsalkapone.resource_balancer.js');void 0;</span></td>";
tsalkaponecell+='<td><font color="maroon"><b><span name="script5" style="display:none">'+tsalkapone_trans.general.script5_t+'</span>'+tsalkapone_trans.general.script5+'</b></font></td>';
tsalkaponecell+='<td><span name="script5">'+tsalkapone_trans.general.script5_info+'</span></td>';
tsalkaponecell+='<td><input type="button" onclick="load_script(this.id);" id="script5" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_load+'"></td></tr>';
tsalkaponecell+="<tr><td style='display:none;'><span name='script6'>javascript:$.getScript('https://dl.dropboxusercontent.com/s/9m6y4nwjs9luyoh/Tsalkapone.Map_scripts.js');void 0;</span></td>";
tsalkaponecell+='<td><font color="maroon"><b><span name="script6" style="display:none">'+tsalkapone_trans.general.script6_t+'</span>'+tsalkapone_trans.general.script6+'</b></font></td>';
tsalkaponecell+='<td><span name="script6">'+tsalkapone_trans.general.script6_info+'</span></td>';
tsalkaponecell+='<td><input type="button" onclick="load_script(this.id);" id="script6" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_load+'"></td></tr>';
tsalkaponecell+="<tr><td style='display:none;'><span name='script7'> javascript:var Tsalkapone_scouts=1;var Tsalkapone_units_order={ram:1,catapult:1,sword:1,spear:1,axe:1,archer:1,light:1,marcher:1,heavy:1};var Tsalkapone_coords='';var config={Tsalkapone_target:'Tsalkapone',Tsalkapone_repeat:1,Tsalkapone_cookieID:'fake'};$.getScript('https://dl.dropboxusercontent.com/s/jyufjpwbdo8h0id/Tsalkapone.Fake_Script_No2_ek.js');void 0;</span></td>";
tsalkaponecell+='<td><font color="maroon"><b><span name="script7" style="display:none">'+tsalkapone_trans.general.script7_t+'</span>'+tsalkapone_trans.general.script7+'</b></font></td>';
tsalkaponecell+='<td><span name="script7">'+tsalkapone_trans.general.script7_info+'</span></td>';
tsalkaponecell+='<td><input type="button" onclick="load_script(this.id);" id="script7" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_load+'"></td></tr>';
tsalkaponecell+="<tr><td style='display:none;'><span name='script8'>javascript:var Tsalkapone_scouts=1;var Tsalkapone_units_order={ram:1,catapult:1,sword:1,spear:1,axe:1,archer:1,light:1,marcher:1,heavy:1};var Tsalkapone_coords='';var config={Tsalkapone_target:'Tsalkapone',Tsalkapone_repeat:1,Tsalkapone_cookieID:'fake'};$.getScript('https://dl.dropboxusercontent.com/s/jyufjpwbdo8h0id/Tsalkapone.Fake_Script_No2_ek.js');void 0;</span></td>";
tsalkaponecell+='<td><font color="maroon"><b><span name="script8" style="display:none">'+tsalkapone_trans.general.script8_t+'</span>'+tsalkapone_trans.general.script8+'</b></font></td>';
tsalkaponecell+='<td><span name="script8">'+tsalkapone_trans.general.script8_info+'</span></td>';
tsalkaponecell+='<td><input type="button" onclick="load_script(this.id);" id="script8" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_load+'"></td></tr>';
tsalkaponecell+="<tr><td style='display:none;'><span name='script9'> javascript:var Tsalkapone_coords='';var Tsalkapone_secure_attack=true;var spy=1; var ram=0;var catapult=0; var light=2; var heavy=5; var marcher=5;var axe=20;var spear=10; var archer=20; var sword=15; var Tsalkapone_script_title='Farming';var Tsalkapone_cookieID='farming1';$.getScript('https://dl.dropboxusercontent.com/s/7vi0gt5hgs46qzy/Tsalkapone.Farming_Script_ek.js');void 0;</span></td>";
tsalkaponecell+='<td><font color="maroon"><b><span name="script9" style="display:none">'+tsalkapone_trans.general.script9_t+'</span>'+tsalkapone_trans.general.script9+'</b></font></td>';
tsalkaponecell+='<td><span name="script9">'+tsalkapone_trans.general.script9_info+'</span></td>';
tsalkaponecell+='<td><input type="button" onclick="load_script(this.id);" id="script9" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_load+'"></td></tr>';
tsalkaponecell+="<tr><td style='display:none;'><span name='script10'>javascript:var Tsalkapone_coords='';var snob=0;var spy=100; var ram=1e6;var catapult=0; var light=1e6; var heavy=0; var marcher=1e6;var axe=1e6;var spear=0; var archer=0; var sword=0; var Tsalkapone_script_title='Nuke';var Tsalkapone_cookieID='nuke1';$.getScript('https://dl.dropboxusercontent.com/s/uqon51aliz193wm/Tsalkapone.Nuke_Support_script_ek.js');void 0;</span></td>";
tsalkaponecell+='<td><font color="maroon"><b><span name="script10" style="display:none">'+tsalkapone_trans.general.script10_t+'</span>'+tsalkapone_trans.general.script10+'</b></font></td>';
tsalkaponecell+='<td><span name="script10">'+tsalkapone_trans.general.script10_info+'</span></td>';
tsalkaponecell+='<td><input type="button" onclick="load_script(this.id);" id="script10" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_load+'"></td></tr>';
tsalkaponecell+="<tr><td style='display:none;'><span name='script11'>javascript:$.getScript('https://dl.dropboxusercontent.com/s/4zpqbmdy716xeua/Tsalkapone.Count_and_categorize_troops.js');void 0; </span></td>";
tsalkaponecell+='<td><font color="maroon"><b><span name="script11" style="display:none">'+tsalkapone_trans.general.script11_t+'</span>'+tsalkapone_trans.general.script11+'</b></font></td>';
tsalkaponecell+='<td><span name="script11">'+tsalkapone_trans.general.script11_info+'</span></td>';
tsalkaponecell+='<td><input type="button" onclick="load_script(this.id);" id="script11" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_load+'"></td></tr>';
tsalkaponecell+="<tr><td style='display:none;'><span name='script12'>javascript:$.getScript('https://dl.dropboxusercontent.com/s/fuvabndcnyzeb3i/Tsalkapone.Market_tools_ek.js');void 0; </span></td>";
tsalkaponecell+='<td><font color="maroon"><b><span name="script12" style="display:none">'+tsalkapone_trans.general.script12_t+'</span>'+tsalkapone_trans.general.script12+'</b></font></td>';
tsalkaponecell+='<td><span name="script12">'+tsalkapone_trans.general.script12_info+'</span></td>';
tsalkaponecell+='<td><input type="button" onclick="load_script(this.id);" id="script12" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_load+'"></td></tr>';
tsalkaponecell+="<tr><td style='display:none;'><span name='script13'>javascript:$.getScript('https://dl.dropboxusercontent.com/s/y32vs0i6392wfoc/Tsalkapone.Snipe_script.js');void 0; </span></td>";
tsalkaponecell+='<td><font color="maroon"><b><span name="script13" style="display:none">'+tsalkapone_trans.general.script13_t+'</span>'+tsalkapone_trans.general.script13+'</b></font></td>';
tsalkaponecell+='<td><span name="script13">'+tsalkapone_trans.general.script13_info+'</span></td>';
tsalkaponecell+='<td><input type="button" onclick="load_script(this.id);" id="script13" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_load+'"></td></tr>';
tsalkaponecell+="<tr><td style='display:none;'><span name='script14'>javascript:cookieName='keypress1';$.getScript('https://dl.dropboxusercontent.com/s/r0g5u11qsc8mvpy/Tsalkapone.%20FA%20key%20press%20edit_ek.js');void(0); </span></td>";
tsalkaponecell+='<td><font color="maroon"><b><span name="script14" style="display:none">'+tsalkapone_trans.general.script14_t+'</span>'+tsalkapone_trans.general.script14+'</b></font></td>';
tsalkaponecell+='<td><span name="script14">'+tsalkapone_trans.general.script14_info+'</span></td>';
tsalkaponecell+='<td><input type="button" onclick="load_script(this.id);" id="script14" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_load+'"></td></tr>';
tsalkaponecell+="<tr><td style='display:none;'><span name='script15'> javascript:$.getScript('https://dl.dropboxusercontent.com/s/0unlti8bzsj196f/Tsalkapone.ToolKit.js');void(0);</span></td>";
tsalkaponecell+='<td><font color="maroon"><b><span name="script15" style="display:none">'+tsalkapone_trans.general.script15_t+'</span>'+tsalkapone_trans.general.script15+'</b></font></td>';
tsalkaponecell+='<td><span name="script15">'+tsalkapone_trans.general.script15_info+'</span></td>';
tsalkaponecell+='<td><input type="button" onclick="load_script(this.id);" id="script15" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_load+'"></td></tr>';
tsalkaponecell+="<tr><td style='display:none;'><span name='script16'>javascript:$.getScript('https://dl.dropboxusercontent.com/s/3ls8pz6mogdkmuh/Tsalkapone.Script_loader.js');void(0);</span></td>";
tsalkaponecell+='<td><font color="maroon"><b><span name="script16" style="display:none">'+tsalkapone_trans.general.script16_t+'</span>'+tsalkapone_trans.general.script16+'</b></font></td>';
tsalkaponecell+='<td><span name="script16">'+tsalkapone_trans.general.script16_info+'</span></td>';
tsalkaponecell+='<td><input type="button" onclick="load_script(this.id);" id="script16" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_load+'"></td></tr>';
tsalkaponecell+="<tr><td style='display:none;'><span name='script17'>javascript:$.getScript('https://dl.dropboxusercontent.com/s/qplvy48chieqlh7/Tsalkapone.Player_Profile_Scripts.js');void 0; </span></td>";
tsalkaponecell+='<td><font color="maroon"><b><span name="script17" style="display:none">'+tsalkapone_trans.general.script17_t+'</span>'+tsalkapone_trans.general.script17+'</b></font></td>';
tsalkaponecell+='<td><span name="script17">'+tsalkapone_trans.general.script17_info+'</span></td>';
tsalkaponecell+='<td><input type="button" onclick="load_script(this.id);" id="script17" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_load+'"></td></tr>';
tsalkaponecell+="<tr><td style='display:none;'><span name='script18'>javascript:$.getScript('https://dl.dropboxusercontent.com/s/kkaro0wvg8ec03t/Tsalkapone.Village_Renamer.js');void 0;</span></td>";
tsalkaponecell+='<td><font color="maroon"><b><span name="script18" style="display:none">'+tsalkapone_trans.general.script18_t+'</span>'+tsalkapone_trans.general.script18+'</b></font></td>';
tsalkaponecell+='<td><span name="script18">'+tsalkapone_trans.general.script18_info+'</span></td>';
tsalkaponecell+='<td><input type="button" onclick="load_script(this.id);" id="script18" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_load+'"></td></tr>';

	tsalkaponecell+='<tr><th colspan="2"><font color="darkgreen"><b>'+tsalkapone_trans.general.lang_sel+'</b></font></th>';
tsalkaponecell+='<th ><center><font style="font-family: \'Arial Black\', Gadget, sans-serif;"><span id="openfilter1"><input type="button" value="'+tsalkapone_trans.buttons.lang_open+'" id="openfilterbut1" class="btn tsalbutton"></span><span id="closefilter1" style="display:none">';
tsalkaponecell+='<input class="btn tsalbutton" type="button" value="'+tsalkapone_trans.buttons.lang_close+'" id="closefilterbut1"></span></center></th></tr>';
	tsalkaponecell+='<tr><td colspan="2"><font color="maroon"><b>'+tsalkapone_trans.general.selected_one+'</b></font></td>';
tsalkaponecell+='<td><span id="selectedone"><center>'+lang_img+'</center></span><span id="columnfilter1" style="display:none" class="vis"><font size="2">';
tsalkaponecell+='<br><br><center><font color="blue"><b><u>'+tsalkapone_trans.general.available+'</u></b></font></center>';
tsalkaponecell+='<input type="radio"  name="language" value="greek" id="greek_lang" ><img title="Greek \n\nBy Tsalkapone" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif"><br>';
tsalkaponecell+='<input type="radio"  name="language" value="english" id="english_lang" checked><img height="20px" style="cursor:help;" title="English/American \n\nBy Tsalkapone" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif"><br>';
tsalkaponecell+='</span></td></tr></tbody></table></div><br><hr><span id="tsalresult"></span></div>';
if (! document.getElementById('tsalkapone_div')){
		$('#content_value').prepend(tsalkaponecell);
}		
else {UI.SuccessMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br>'+tsalkapone_trans.notes.activated+'.', 5000);}


 if (get_lang == "greek") {document.getElementById('greek_lang').checked = true;}
      else  if (get_lang == "english") {document.getElementById('english_lang').checked = true; }
         $("#english_lang").click(function(){
	localStorage.setItem("script_loader_lang","english");     
location.reload();
    });
	
      $("#greek_lang").click(function(){
	localStorage.setItem("script_loader_lang","greek");
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
	
	

/*==== register ====*/
var script = {
	scriptname: 'Script Loader',
	version: '1.0',
	author: 'Tsalkapone',
	email: 'tsalkapone@hotmail.com',
	broken: false
};
$.post(ScriptAPI.url,script);

	} }