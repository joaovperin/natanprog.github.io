/*
		scriptname:	Time & Distance Calculator
		version:	1.0.0
		created: June 24, 2016
 		game version:	version	8.48.1
 		author:		Tsalkapone (tsalkapone@hotmail.com)
 
 ==== pages where this can be used ==== 
 * combined overview (screen=overview_villages&mode=combined)
  
 ==== changelog ====
 *	24 June 2016 - created
 
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


var get_lang = localStorage.getItem("time_distance_lang");
    var lang="";
    var tsal_market=game_data.market;
    if (get_lang === null) 	 {
	if (tsal_market=="gr") {lang="greek";}
  else   {lang = "english";} }
    else { lang = ""+get_lang+"";}
    var supported_languages =["greek","english"];
    var lang_check = supported_languages.indexOf(lang);
    if (lang_check < 0) {UI.ErrorMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> The selected language is not supported. Please select one of the supported languages.', 5000);}
    else {
 var tsalkapone_trans = (function() {
				    var tsalkapone_trans = {};
    tsalkapone_trans.english= { 
	 general:{ 
	 script:"Time & Distance Calculator",
	 notification:"Notification from",
         selected_one:"Current selected language",
         available:"Available languages",
		 button_list:"Buttons List",
		 lang_sel:"Click to change the selected language",		
		message_no:"No",
		message_yes:"Yes",
		message_1:"This script is activated on Overviews -> Combined page.",
		message_2:" Do you want to automatically assign your location to this page?",
		comm:"Feel free to send any message regarding script bugs or proposing ideas to",
		des:"Function description",
		but:"Buttons",
		edited_by:"Edited by",
		created:"Created by",
		set_list:"Settings & Functions",
		res_list:"Script Settings",
		blank:"Click on any script's button to display its settings and values",
		script_1:"Calculate the distance between two villages",
		script_2:"Calculate the back-time of a command",
		script_3:"Calculate a snipe time on a back-time command",
		script_4:"Calculate a snipe time on a command",
		script_5:"Open the Time Calculator on a new tab",
		script_6:"Calculate the max fields needed for each unit to reach the chosen duration",
		send:"Send",
		vil_from:"from",
		vil_to:"to",
		lau:"on",
		speed:"Unit Speed",
		amount:"Amount",
		ori:"Origin",
		dest:"Destination",
		lau_time:"Launch Time",
		list_form:"Snipe Times on list form",
		tab_form:"Snipe Times on table form",
		attention:"ATTENTION: It has been noticed that sometimes the server time displayed on the screen has 1 second delay. In this case substract 1 second from every time result.",
		vil1:"Origin",
		vil2:"Destination",
		dur:"Duration",
		tsal_apply:"Apply",
		tsal_search:"Calculate",
		spear:"Spearman",
		sword:"Swordsman",
		axe:"Axeman",
		archer:"Archer",
		spy:"Scout",
		light:"Light cavalry",
		heavy:"Heavy cavalry",
		marcher:"Mounted archer",
		ram:"Ram",
		cats:"Catapult",
		knight:"Paladin",
		snob:"Nobleman",
		tsal_time:"Arrival Time",
		tsal_target:"Target Village",
		tsal_speed:"Units Speed",
		tsal_unit:"Slowest Unit",
		tsal_dur:"Duration",
		tsal_error:"ERROR",
		tsal_notime:"No village can reach the target in the specified arrival time",
		info1:"Enter the coordinates of the origin village.",
		info2:"Enter the coordinates of the destination village.",
		info3:"Enter the arrival time of the command to the destination village. Insert the 3 first letters of the month in English, the day of the month, the year and hour:minutes:seconds of the arrival time.",
		info4:"Enter the slowest unit of the command from the origin village. If you haven't labeled the command pick a random unit. If you don't feel sure about your choice abandon the back-time snipe command.",
		info5:"Enter the coordinates of the target-village.",
		info6:"Check a box beside a unit-type to include its speed in the snipe's times calculation. Uncheck to exclude it.",
		info7:"Enter a duration in the following form hh:mm:ss (hours:minutes:seconds)",
		},
	buttons:{
			  lang_open:"Open language selection",
              lang_close:"Close language selection",
			  script_1:"Distance calculator",
		script_2:"Back-Time calculator",
		script_3:"Snipe Back-Time",
		script_4:"Snipe Calculator",
		script_5:"Time Calculator",
		script_6:"Fields Calculator",
		show_results:"Show Results",
		hide_results:"Hide Results",
		tsal_info:"Info & Tips",
	},
	notes:{
		activated:"The script Time & Distance Calculator is already active",
		tsal_notime:"No village can reach the target in the specified arrival time",
	},
};
tsalkapone_trans.greek= { 
	 general:{ 
	 script:"Υπολογισμοί Χρόνων & Αποστάσεων",
	 notification:"Ειδοποίηση από τον",
            selected_one:"Ενεργή γλώσσα",
            available:"Διαθέσιμες γλώσσες",
			button_list:"Πίνακας πλήκτρων",
			lang_sel:"Επιλέξτε για να αλλάξετε την επιλεγμένη γλώσσσα",
			message_no:"Όχι",
		message_yes:"Ναι",
		message_1:"Το συγκεκριμένο script ενεργοποιείται από τις Επισκοπήσεις -> Συνδυασμένα.",
		message_2:"Επιθυμείτε αυτόματη ανακατεύθυνση;",
		comm:"Επικοινωνήστε ανά πάσα στιγμή για οποιαδήποτε ιδέα ή πρόταση σχετικά με τα scripts με τον",
		des:"Περιγραφή λειτουργίας",
		but:"Πλήκτρα",
		edited_by:"Δημιουργήθηκε από τον",
		created:"Δημιουργήθηκε από τον",
		set_list:"Ρυθμίσεις & Λειτουργίες",
		res_list:"Ρυθμίσεις Script",
		blank:"Επιλέξτε ένα πλήκτρο οποιουδήποτε script για να εμφανιστούν οι ρυθμίσεις του",
		script_1:"Υπολογισμός απόστασης μεταξύ δυο χωριών",
		script_2:"Υπολογισμός χρόνου επιστροφής μιας εντολής",
		script_3:"Υπολογισμός snipe εντολής στο χρόνο μιας επιστρεφόμενης εντολής",
		script_4:"Υπολογισμός snipe εντολής",
		script_5:"Ανοίξτε σε νέα καρτέλα το εργαλείο Time Calculator",
		script_6:"Υπολογίστε τα μέγιστα πεδία κάθε μονάδας που απαιτούνται για την επιλεγμένη διάρκεια",
		send:"Στείλε",
		vil_from:"από το",
		vil_to:"στο",
		lau:"στις",
		speed:"Βραδύτερη Μονάδα",
		amount:"Ποσότητα",
		ori:"Προέλευση",
		dest:"Στόχος",
		lau_time:"Ώρα Εκκίνησης",
		list_form:"Χρόνοι Snipe σε μορφή λίστας",
		tab_form:"Χρόνοι Snipe σε μορφή πίνακα",
		attention:"ΠΡΟΣΟΧΗ: Έχει παρατηρηθεί ότι μερικές φορές ο χρόνος του server που εμφανίζεται στην οθόνη έχει 1 δευτερόλεπτο καθυστέρηση. Σε αυτή τη περίπτωση αφαιρέστε 1 δευτερόλεπτο από κάθε εξαγωμένο χρόνο.",
		vil1:"Χωριό Προέλευσης",
		vil2:"Χωριό Προορισμού",
		dur:"Διάρκεια",
		tsal_apply:"Εφαρμογή",
		tsal_search:"Υπολογισμός",
		tsal_speed:"Ταχύτητες Μονάδων",
		spear:"Δορατοφόρος",
		sword:"Ξιφομάχος",
		axe:"Τσεκουρομάχος",
		archer:"Τοξότης",
		spy:"Ανιχνευτής",
		light:"Ελαφρύ ιππικό",
		heavy:"Βαρύ ιππικό",
		marcher:"Έφιππος τοξότης",
		ram:"Πολιορκητικός κριός",
		cats:"Καταπέλτης",
		knight:"Paladin",
		snob:"Αριστοκράτης",
		tsal_time:"Ώρα Αφιξης",
		tsal_target:"Χωριό Στόχος",
		tsal_unit:"Αναγνωριμένη Μονάδα",
		tsal_dur:"Διάρκεια",
		tsal_error:"ΣΦΑΛΜΑ",
		tsal_notime:"Κανένα χωριό δεν δύναται να φτάσει τον επιλεγμένο προορισμό στη καθορισμένη ώρα άφιξης",
		info1:"Εισάγετε τις συντεταγμένες του χωριού προέλευσης της εντολής.",
		info2:"Εισάγετε τις συντεταγμένες του χωριού προορισμού της εντολής.",
		info3:"Στο συγκεκριμένο πλαίσιο εισάγετε ημερομηνία άφιξης εντολής αναγράφοντας το μήνα (τα πρώτα τρία γράμματα στα αγγλικά), ημερομηνία, έτος και την ώρα (ώρα:λεπτά:δευτερόλεπτα) σε 24ώρη κλίμακα.",
		info4:"Επιλέξτε την αναγνωρισμένη ως βραδύτερη μονάδα της εντολής. Αν δεν έχετε αναγνωρίσει σωστά μια εντολή επιλέξτε τυχαία μονάδα ή εγκατελείψτε την απόπειρα snipe.",
		info5:"Εισάγετε τις συντεταγμένες του χωριού-στόχου.",
		info6:"Επιλέξτε ένα κουτί δίπλα από μια μονάδα για να συμπεριλάβετε την ταχύτητά της στους υπολογισμούς χρόνων snipe. Αποεπιλέξτε για να την αποκλείσετε.",
		info7:"Εισάγετε μια χρονική διάρκεια με την εξής μορφή: ώρες:λεπτά:δεύτερα",
	},
	buttons:{		
			  lang_open:"Άνοιγμα επιλογής γλώσσας",
              lang_close:"Κλείσιμο επιλογής γλώσσας",
			  script_1:"Απόσταση",
		script_2:"Back-Time",
		script_3:"Snipe Back-Time",
		script_4:"Snipe",
		script_5:"Time Calculator",
		script_6:"Υπολογισμός Πεδίων",
		show_results:"Εμφάνιση Αποτελεσμάτων",
		hide_results:"Απόκρυψη Αποτελεσμάτων",
		tsal_info:"Οδηγίες Χρήσης",
	},
	notes:{
		activated:"Το script Υπολογισμοί Χρόνων & Αποστάσεων έχει ήδη ενεργοποιηθεί",
		tsal_notime:"Κανένα χωριό δεν δύναται να φτάσει τον επιλεγμένο προορισμό στη καθορισμένη ώρα άφιξης",
	},
};
    return tsalkapone_trans[lang];
    }());
	}
	var tsaldiamorfwsi='<link rel="stylesheet" type="text/css" href="https://dl.dropboxusercontent.com/s/r3ov8brxa6oxoal/Tsalkapone.Advanced_Coords_Extractor.css" />';
	var	tsalbody='<style>';
tsalbody+='.tsalkembed1{ font-family: "Comic Sans MS", cursive, sans-serif;font-style:italic;color: purple;-webkit-animation: mymove1 3s infinite; -moz-animation: mymove1 3s infinite; animation: mymove1 6s infinite;font-weight: bold;}';
tsalbody+='@-webkit-keyframes mymove1 {50% {color: red;}} @-moz-keyframes mymove1 {50% {color: red;}} @keyframes mymove1 {50% {color:red;}';
tsalbody+='</style>';

$("head").append(tsaldiamorfwsi+tsalbody);
	
function fnInjectOverviewBar(){
	
	

	
	/* Default to your own currently active village */
	var defaultCoords = fnExtractCoords(window.$("title").html());
	var defaultCoords1 ="500|500";
	
	/* Default to midnight of next day */
	var defaultDate = new Date();

	defaultDate.setTime(((Math.floor(defaultDate.getTime()/msPerDay)+1)*minsPerDay + defaultDate.getTimezoneOffset())*msPerMin);
	defaultDate = defaultDate.toString().replace(/\w+\s*/i,"").replace(/(\d*:\d*:\d*)(.*)/i,"$1");

	
	
	/* Perform the injection */
	fnInjectUnits();
	var lang_img='';
        if (lang=="greek") {lang_img ='<img title="Ελληνικά" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif">';}
        else if (lang=="english") {lang_img ='<img height="20px" style="cursor:help;" title="English/American" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif">';}
 
	var myself=this;
	var win=(window.main||window),doc=win.document,$=win.$;
	var chainedFunc=null;
	var tsalkaponecell = "";
	tsalkaponecell+='<div id="tsalkapone_div" class="target-select clearfix" width="100%">';
tsalkaponecell+='<div align="center" style="width:100%;height:30px;line-height:30px;background:url(https://dl.dropboxusercontent.com/s/wwavk9gdi2dhbo5/tsalkapone_top.png) repeat-x">';
tsalkaponecell+='<font color="darkorange" size="4"><b><u>'+tsalkapone_trans.general.script+'</u></b></font>';
tsalkaponecell+='&emsp;<a class="tsalprofile" href="https://forum.tribalwars.net/index.php?members/tsalkapone.114063/" target="_blank">'+tsalkapone_trans.general.created+' Tsalkapone</a></div><hr>';
tsalkaponecell+='<center><span class="tsalkembed1"><img width="20px;" src="https://dl.dropboxusercontent.com/s/s9swak86tirwdpd/Tsalkapone.%20Warning.gif">&emsp;'+tsalkapone_trans.general.attention+'</span></center><hr>';
	tsalkaponecell+='<table style="width: 100%"><tbody><tr><td width="50%">';
	tsalkaponecell+='<div id="tsalbuttons" class="target-select clearfix vis float_left" width="50%"><h4><font color=darkgreen><center>Tsalkapone. '+tsalkapone_trans.general.button_list+'</center></font></h4>';
	tsalkaponecell+='<table class="vis" style="width: 100%"><tbody>';
	tsalkaponecell+='<tr><th><font color="blue"><b>'+tsalkapone_trans.general.des+'</b></font></th>';
	tsalkaponecell+='</th><th><font color="blue"><b>'+tsalkapone_trans.general.but+'</b></font></th></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.script_1+'</b></font></td>';
	tsalkaponecell+='<td><input type="button" id="tsalscript1" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_1+'"></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.script_2+'</b></font></td>';
	tsalkaponecell+='<td><input type="button" id="tsalscript2" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_2+'"></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.script_3+'</b></font></td>';
	tsalkaponecell+='<td><input type="button" id="tsalscript3" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_3+'"></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.script_4+'</b></font></td>';
	tsalkaponecell+='<td><input type="button" id="tsalscript4" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_4+'"></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.script_6+'</b></font></td>';
	tsalkaponecell+='<td><input type="button" id="tsalscript5" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_6+'"></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.script_5+'</b></font></td>';
	tsalkaponecell+='<td><a href="http://www.scottseverance.us/html/time_calculator.htm" target="_blank">&nbsp;&raquo;'+tsalkapone_trans.buttons.script_5+'</a></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.lang_sel+'</b></font></td>';
tsalkaponecell+='<td><font style="font-family: \'Arial Black\', Gadget, sans-serif;"><span id="openfilter1"><input type="button" value="'+tsalkapone_trans.buttons.lang_open+'" id="openfilterbut1" class="btn tsalbutton"></span><span id="closefilter1" style="display:none">';
tsalkaponecell+='<input class="btn tsalbutton" type="button" value="'+tsalkapone_trans.buttons.lang_close+'" id="closefilterbut1"></span></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.selected_one+'</b></font></td>';
tsalkaponecell+='<td><span id="selectedone"><center>'+lang_img+'</center></span><span id="columnfilter1" style="display:none" class="vis"><font size="2">';
tsalkaponecell+='<br><br><center><font color="blue"><b><u>'+tsalkapone_trans.general.available+'</u></b></font></center>';
tsalkaponecell+='<input type="radio"  name="language" value="greek" id="greek_lang" ><img title="Greek \n\nBy Tsalkapone" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif"><br>';
tsalkaponecell+='<input type="radio"  name="language" value="english" id="english_lang" checked><img height="20px" style="cursor:help;" title="English/American \n\nBy Tsalkapone" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif"><br>';
tsalkaponecell+='</span></td></tr>';
tsalkaponecell+='</tbody></table></div></td><td>';
tsalkaponecell+='<div id="tsalresult_content" class="target-select clearfix vis"><h4><font color=darkgreen><center>Tsalkapone. '+tsalkapone_trans.general.res_list+'</center></font></h4>';
tsalkaponecell+='<hr><center><input type="button" class="btn tsalbutton" id="tsalinfo" value="'+tsalkapone_trans.buttons.tsal_info+'"></center><hr>';
tsalkaponecell+='<span id="tsalresult"><center><br><font color="maroon"><b><i>'+tsalkapone_trans.general.blank+'</i></b></font><br></center></span></div>';
tsalkaponecell+='</tr></tbody></table></div>';
if (! document.getElementById('tsalkapone_div')){
		$('#paged_view_content').prepend(tsalkaponecell);
		
				/*==== register ====*/
var script = {
	scriptname: 'Time& Distance Calculator',
	version: '1.0',
	author: 'Tsalkapone',
	email: 'tsalkapone@hotmail.com',
	broken: false
};
$.post(ScriptAPI.url,script);
}
else {UI.SuccessMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br>'+tsalkapone_trans.notes.activated+'.', 5000);}
var Dialog1;(function(){'use strict';Dialog1={MAX_WIDTH:1200,closeCallback:null,show:function(id,content,closeCallback,options){options=$.extend({class_name:'',close_from_fader:true},options);this.closeCallback=closeCallback;var fullscreenElement=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement,container=fullscreenElement||'body',$container=$('.popup_box_container'),$box,$fader,$content,show_anim=false;if(!$container.length){show_anim=true;$container=$('<div class="popup_box_container" />');$box=$('<div class="popup_box" />').attr('id','popup_box_'+id).addClass(options.class_name).data('name',id).appendTo($container);$fader=$('<div class="fader" />').appendTo($container);$content=$('<div class="popup_box_content" />').appendTo($box);$container.appendTo($(container))}else{$box=$container.find('.popup_box');if($box.data('name')!==id){Dialog1.close();Dialog1.show(id,content,closeCallback,options);return};$content=$container.find('.popup_box_content');$box.css('width','auto')};$content.html(content);var height_buffer=125;if($(window).width()<500||$(window).height()<$content.height()+height_buffer){$box.addClass('mobile');$('.popup_box_content').css({'max-height':$(window).height()-(height_buffer/2)+'px'})};var border_width;if(typeof window.getComputedStyle==='function'){border_width=parseInt(getComputedStyle($box[0],null).borderLeftWidth)}else border_width=parseInt($box.css('border-left-width'));var min_width=200,width=Math.min(this.MAX_WIDTH,$content.width(),$(window).width()-border_width);if(width<min_width)width=min_width;if(!Modernizr.borderimage)width+=20;$box.css('width',width+'px');var hotkey_hint=(!mobile&&!mobiledevice&&HotKeys.enabled)?' :: ΟΟΞ½ΟΟΞΌΞ΅ΟΟΞ· ΟΞ»Ξ·ΞΊΟΟΞΏΞ»ΞΏΞ³Ξ―ΞΏΟ: <b>Esc</b>':'',tooltip_class=(!mobile&&!mobiledevice)?'tooltip-delayed':'',$close=$('<a class="popup_box_close '+tooltip_class+'" title="ΞΞ»Ξ΅Ξ―ΟΞ΅'+hotkey_hint+'" href="#">&nbsp;</a>').prependTo($content);UI.ToolTip($close,{delay:400});var close_elements=options.close_from_fader?'.fader, .popup_box_close, .popup_closer':'.popup_box_close, .popup_closer';$container.on('click',close_elements,function(){Dialog1.close(true);return false});if(show_anim)setTimeout(function(){$box.addClass('show')},50);UI.init();UnitPopup.init();setTimeout(QuestArrows.init,500)},close:function(by_user){$('.popup_box_container').remove();if(Dialog1.closeCallback)Dialog1.closeCallback(by_user);inlinePopupClose();$('.popup_style').hide();QuestArrows.init();return false},fetch:function(name,screen,get_params,callback,Dialog1_options,closeCallback){TribalWars.get(screen,get_params,function(data){Dialog1.show(name,data.Dialog1,closeCallback,Dialog1_options);if(callback)callback()})}}})();
  
 var content=''; 
  content+='<h2 class="popup_box_header tsalkaponefont" style="font-family: Comic Sans MS;"><center><u><font color="red">Tsalkapone. '+tsalkapone_trans.general.script+'</font></u></center></h2><hr>';
content+='<font color="maroon"><b><u>'+tsalkapone_trans.general.vil1+': </u></b></font><br>'+tsalkapone_trans.general.info1+'<br><br>';
content+='<font color="maroon"><b><u>'+tsalkapone_trans.general.vil2+': </u></b></font><br>'+tsalkapone_trans.general.info2+'<br><br>';
content+='<font color="maroon"><b><u>'+tsalkapone_trans.general.tsal_time+': </u></b></font><br>'+tsalkapone_trans.general.info3+'<br><br>';
content+='<font color="maroon"><b><u>'+tsalkapone_trans.general.tsal_unit+': </u></b></font><br>'+tsalkapone_trans.general.info4+'<br><br>';
content+='<font color="maroon"><b><u>'+tsalkapone_trans.general.tsal_target+': </u></b></font><br>'+tsalkapone_trans.general.info5+'<br><br>';
content+='<font color="maroon"><b><u>'+tsalkapone_trans.general.tsal_dur+': </u></b></font><br>'+tsalkapone_trans.general.info7+'<br><br>';
content+='<font color="maroon"><b><u>'+tsalkapone_trans.general.tsal_speed+': </u></b></font><br>'+tsalkapone_trans.general.info6+'<br><br><img src="https://dl.dropboxusercontent.com/s/7gv7ajmc8xckj8o/Snipe1.png"><br><br>';
content+='<hr><center><img class="tooltip-delayed" title="<font color=darkgreen>Tsalkapone. '+tsalkapone_trans.general.script+'</font>" src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg" style="cursor:help; position: relative"></center><br><center><p>'+tsalkapone_trans.general.comm+' <a href="'+contact_url+'" title="Tsalkapone profile" target="_blank">Tsalkapone</a>.</p></center>';
content+='</div>';  



       if (get_lang == "greek") {document.getElementById('greek_lang').checked = true;}
      else  if (get_lang == "english") {document.getElementById('english_lang').checked = true; }
         $("#english_lang").click(function(){
	localStorage.setItem("time_distance_lang","english");     
location.reload();
    });
	
      $("#greek_lang").click(function(){
	localStorage.setItem("time_distance_lang","greek");
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
	$("#tsalinfo").click(function(){
    Dialog1.show('time_and_distance_info',content);
    });
	

	
	
	
	var tsalcell1='';
	var tsalcell2='';
	var tsalcell3='';
	var tsalcell4='';
	var tsalcell5='';
	tsalcell1+='<table class="vis" style="width: 100%"><tbody>';
tsalcell1+='<tr><th colspan="1"><b><font color="blue">'+tsalkapone_trans.general.vil1+'</font></b>';
tsalcell1+='</th><th colspan="1"><b><font color="maroon">'+tsalkapone_trans.general.vil2+'</font></b></th>';
tsalcell1+='</th><th colspan="1"><b><font color="darkmagenta">'+tsalkapone_trans.general.tsal_apply+'</font></b></th>';
tsalcell1+='<tr><td><input id="snipe_coord" value="'+defaultCoords+'" class="text-input inactive" size="7" onFocus="this.select(); tsalfocus(this.id);" />';
tsalcell1+='</td><td><input id="tsal_coord2" value="'+defaultCoords+'" class="text-input inactive" size="7" onFocus="this.select(); tsalfocus(this.id);">';
tsalcell1+='</td><td><input type="button" class="btn tsalbutton"  value="'+tsalkapone_trans.general.tsal_search+'" onClick="fnCalculateDistTime()" /></td>';	
tsalcell1+='</tr></tbody></table>';
tsalcell1+='<table class="vis" style="width: 100%"><tbody>';
tsalcell1+='<tr><th colspan="1"><img src="graphic/unit/unit_spear.png">';
tsalcell1+='</th><th colspan="1"><img src="graphic/unit/unit_sword.png">';
tsalcell1+='</th><th colspan="1"><img src="graphic/unit/unit_axe.png">';
tsalcell1+='</th><th colspan="1"><img src="graphic/unit/unit_archer.png">';
tsalcell1+='</th><th colspan="1"><img src="graphic/unit/unit_spy.png">';
tsalcell1+='</th><th colspan="1"><img src="graphic/unit/unit_knight.png"></th></tr>';
tsalcell1+='<tr><td colspan="1"><b><span id="t_spear"></span></b>';
tsalcell1+='</td><td colspan="1"><b><span id="t_sword"></span></b>';
tsalcell1+='</td><td colspan="1"><b><span id="t_axe"></span></b>';
tsalcell1+='</td><td colspan="1"><b><span id="t_archer"></span></b>';
tsalcell1+='</td><td colspan="1"><b><span id="t_spy"></span></b>';
tsalcell1+='</td><td colspan="1"><b><span id="t_knight"></span></b></td></tr>';
tsalcell1+='<tr><th colspan="1"><img src="graphic/unit/unit_light.png">';
tsalcell1+='</th><th colspan="1"><img src="graphic/unit/unit_heavy.png">';
tsalcell1+='</th><th colspan="1"><img src="graphic/unit/unit_marcher.png">';
tsalcell1+='</th><th colspan="1"><img src="graphic/unit/unit_ram.png">';
tsalcell1+='</th><th colspan="1"><img src="graphic/unit/unit_catapult.png">';
tsalcell1+='</th><th colspan="1"><img src="graphic/unit/unit_snob.png"></th></tr>';
tsalcell1+='<tr><td colspan="1"><b><span id="t_light"></span></b>';
tsalcell1+='</td><td colspan="1"><b><span id="t_heavy"></span></b>';
tsalcell1+='</td><td colspan="1"><b><span id="t_marcher"></span></b>';
tsalcell1+='</td><td colspan="1"><b><span id="t_ram"></span></b>';
tsalcell1+='</td><td colspan="1"><b><span id="t_catapult"></span></b>';
tsalcell1+='</td><td colspan="1"><b><span id="t_snob"></span></b></td>';
tsalcell1+='</tr></tbody></table>';

tsalcell5+='<table class="vis" style="width: 100%"><tbody>';
tsalcell5+='<tr><th colspan="1"><b><font color="blue">'+tsalkapone_trans.general.dur+'</font></b>';
tsalcell5+='</th><th colspan="1"><b><font color="darkmagenta">'+tsalkapone_trans.general.tsal_apply+'</font></b></th>';
tsalcell5+='<tr><td><input id="tsal_duration" value="01:30:00" class="text-input inactive" size="7" onFocus="this.select(); tsalfocus(this.id);" />';
tsalcell5+='</td><td><input type="button" class="btn tsalbutton"  value="'+tsalkapone_trans.general.tsal_search+'" onClick="fnCalculateFields()" /></td>';	
tsalcell5+='</tr></tbody></table>';
tsalcell5+='<table class="vis" style="width: 100%"><tbody>';
tsalcell5+='<tr><th colspan="1"><img src="graphic/unit/unit_spear.png">';
tsalcell5+='</th><th colspan="1"><img src="graphic/unit/unit_sword.png">';
tsalcell5+='</th><th colspan="1"><img src="graphic/unit/unit_axe.png">';
tsalcell5+='</th><th colspan="1"><img src="graphic/unit/unit_archer.png">';
tsalcell5+='</th><th colspan="1"><img src="graphic/unit/unit_spy.png">';
tsalcell5+='</th><th colspan="1"><img src="graphic/unit/unit_knight.png"></th></tr>';
tsalcell5+='<tr><td colspan="1"><b><span id="t_spear"></span></b>';
tsalcell5+='</td><td colspan="1"><b><span id="t_sword"></span></b>';
tsalcell5+='</td><td colspan="1"><b><span id="t_axe"></span></b>';
tsalcell5+='</td><td colspan="1"><b><span id="t_archer"></span></b>';
tsalcell5+='</td><td colspan="1"><b><span id="t_spy"></span></b>';
tsalcell5+='</td><td colspan="1"><b><span id="t_knight"></span></b></td></tr>';
tsalcell5+='<tr><th colspan="1"><img src="graphic/unit/unit_light.png">';
tsalcell5+='</th><th colspan="1"><img src="graphic/unit/unit_heavy.png">';
tsalcell5+='</th><th colspan="1"><img src="graphic/unit/unit_marcher.png">';
tsalcell5+='</th><th colspan="1"><img src="graphic/unit/unit_ram.png">';
tsalcell5+='</th><th colspan="1"><img src="graphic/unit/unit_catapult.png">';
tsalcell5+='</th><th colspan="1"><img src="graphic/unit/unit_snob.png"></th></tr>';
tsalcell5+='<tr><td colspan="1"><b><span id="t_light"></span></b>';
tsalcell5+='</td><td colspan="1"><b><span id="t_heavy"></span></b>';
tsalcell5+='</td><td colspan="1"><b><span id="t_marcher"></span></b>';
tsalcell5+='</td><td colspan="1"><b><span id="t_ram"></span></b>';
tsalcell5+='</td><td colspan="1"><b><span id="t_catapult"></span></b>';
tsalcell5+='</td><td colspan="1"><b><span id="t_snob"></span></b></td>';
tsalcell5+='</tr></tbody></table>';

tsalcell4+='<table class="vis" style="width: 100%"><tbody>';
tsalcell4+='<tr><th colspan="1"><b><font color="blue">'+tsalkapone_trans.general.tsal_target+'</font></b>';
tsalcell4+='</th><th colspan="1"><b><font color="maroon">'+tsalkapone_trans.general.tsal_time+'</font></b></th>';
tsalcell4+='</th><th colspan="1"><b><font color="darkmagenta">'+tsalkapone_trans.general.tsal_apply+'</font></b></th>';
tsalcell4+='<tr><td><input id="snipe_coord" value="'+defaultCoords+'" class="text-input inactive" size="7" onFocus="this.select(); tsalfocus(this.id);" />';
tsalcell4+='</td><td><input id="arrival_time" size="25" class="text-input inactive" value="'+defaultDate+'" onFocus="this.select(); tsalfocus(this.id);" />';
tsalcell4+='</td><td><input type="button" class="btn tsalbutton"  value="'+tsalkapone_trans.general.tsal_search+'" onClick="fnCalculateBackTime()" /></td>';	
tsalcell4+='</tr></tbody></table>';

tsalcell2+='<table class="vis" style="width: 100%"><tbody>';
tsalcell2+='<tr><th colspan="1"><b><font color="blue">'+tsalkapone_trans.general.vil1+'</font></b>';
tsalcell2+='</th><th colspan="1"><b><font color="blue">'+tsalkapone_trans.general.vil2+'</font></b></th>';
tsalcell2+='</th><th colspan="1"><b><font color="maroon">'+tsalkapone_trans.general.tsal_time+'</font></b></th>';
tsalcell2+='</th><th colspan="1"><b><font color="darkgreen">'+tsalkapone_trans.general.tsal_unit+'</font></b></th>';
tsalcell2+='</th><th colspan="1"><b><font color="darkmagenta">'+tsalkapone_trans.general.tsal_apply+'</font></b></th>';
tsalcell2+='<tr><td><input id="snipe_coord" value="'+defaultCoords1+'" class="text-input inactive" size="7" onFocus="this.select(); tsalfocus(this.id);">';
tsalcell2+='</td><td><input id="tsal_coord2" value="'+defaultCoords+'" class="text-input inactive" size="7" onFocus="this.select(); tsalfocus(this.id);">';
tsalcell2+='</td><td><input id="tsal_time" size="25" class="text-input inactive" value="'+defaultDate+'" onFocus="this.select(); tsalfocus(this.id);">';
tsalcell2+='</td><td><select id="monada"><option value="spear">'+tsalkapone_trans.general.spear+'</option>';
tsalcell2+='<option value="sword">'+tsalkapone_trans.general.sword+'</option>';
tsalcell2+='<option value="axe">'+tsalkapone_trans.general.axe+'</option>';
tsalcell2+='<option value="archer">'+tsalkapone_trans.general.archer+'</option>';
tsalcell2+='<option value="spy">'+tsalkapone_trans.general.spy+'</option>';
tsalcell2+='<option value="light">'+tsalkapone_trans.general.light+'</option>';
tsalcell2+='<option value="heavy">'+tsalkapone_trans.general.heavy+'</option>';
tsalcell2+='<option value="marcher">'+tsalkapone_trans.general.marcher+'</option>';
tsalcell2+='<option value="ram">'+tsalkapone_trans.general.ram+'</option>';
tsalcell2+='<option value="catapult">'+tsalkapone_trans.general.cats+'</option>';
tsalcell2+='<option value="snob">'+tsalkapone_trans.general.snob+'</option>';
tsalcell2+='</select></td>';	
tsalcell2+='</td><td><input type="button" class="btn tsalbutton" value="'+tsalkapone_trans.general.tsal_search+'" onClick="fnCalculateArriveTime()"></td>';	
tsalcell2+='</tr><tr><td colspan="5"><span id="back_time"></span></td></tr></tbody></table><br>';

tsalcell3+='<table class="vis" style="width: 100%"><tbody>';
tsalcell3+='<tr><th colspan="1"><b><font color="blue">'+tsalkapone_trans.general.vil1+'</font></b>';
tsalcell3+='</th><th colspan="1"><b><font color="blue">'+tsalkapone_trans.general.vil2+'</font></b></th>';
tsalcell3+='</th><th colspan="1"><b><font color="maroon">'+tsalkapone_trans.general.tsal_time+'</font></b></th>';
tsalcell3+='</th><th colspan="1"><b><font color="darkgreen">'+tsalkapone_trans.general.tsal_unit+'</font></b></th>';
tsalcell3+='</th><th colspan="1"><b><font color="darkmagenta">'+tsalkapone_trans.general.tsal_apply+'</font></b></th>';
tsalcell3+='<tr><td><input id="snipe_coord" value="'+defaultCoords1+'" class="text-input inactive" size="7" onFocus="this.select(); tsalfocus(this.id);">';
tsalcell3+='</td><td><input id="tsal_coord2" value="'+defaultCoords+'" class="text-input inactive" size="7" onFocus="this.select(); tsalfocus(this.id);">';
tsalcell3+='</td><td><input id="tsal_time" size="25" class="text-input inactive" value="'+defaultDate+'" onFocus="this.select(); tsalfocus(this.id);">';
tsalcell3+='</td><td><select id="monada"><option value="spear">'+tsalkapone_trans.general.spear+'</option>';
tsalcell3+='<option value="sword">'+tsalkapone_trans.general.sword+'</option>';
tsalcell3+='<option value="axe">'+tsalkapone_trans.general.axe+'</option>';
tsalcell3+='<option value="archer">'+tsalkapone_trans.general.archer+'</option>';
tsalcell3+='<option value="spy">'+tsalkapone_trans.general.spy+'</option>';
tsalcell3+='<option value="light">'+tsalkapone_trans.general.light+'</option>';
tsalcell3+='<option value="heavy">'+tsalkapone_trans.general.heavy+'</option>';
tsalcell3+='<option value="marcher">'+tsalkapone_trans.general.marcher+'</option>';
tsalcell3+='<option value="ram">'+tsalkapone_trans.general.ram+'</option>';
tsalcell3+='<option value="catapult">'+tsalkapone_trans.general.cats+'</option>';
tsalcell3+='<option value="snob">'+tsalkapone_trans.general.snob+'</option>';
tsalcell3+='</select></td>';	
tsalcell3+='</td><td><input type="button" class="btn tsalbutton" value="'+tsalkapone_trans.general.tsal_search+'" onClick="fnCalculateArriveTime2();setTimeout(function(){ fnCalculateBackTime(); }, 500);"></td>';	
tsalcell3+='</tr><tr><td colspan="5"><span id="back_time"></span></td></tr></tbody></table><br>';

$("#tsalscript5").click(function(){
	document.getElementById('tsalresult').innerHTML = tsalcell5;
});
$("#tsalscript4").click(function(){
	document.getElementById('tsalresult').innerHTML = tsalcell4;
});
$("#tsalscript2").click(function(){
	document.getElementById('tsalresult').innerHTML = tsalcell2;
});
$("#tsalscript3").click(function(){
	document.getElementById('tsalresult').innerHTML = tsalcell3;
});
$("#tsalscript1").click(function(){
	document.getElementById('tsalresult').innerHTML = tsalcell1;
});
	var srcHTML1 = "";
	srcHTML1 += "<br/>";
srcHTML1+='<div align="center" style="width:100%;height:30px;line-height:30px;background:url(https://dl.dropboxusercontent.com/s/wwavk9gdi2dhbo5/tsalkapone_top.png) repeat-x">';
srcHTML1+='<font color="darkorange" size="4"><b><u>'+tsalkapone_trans.general.script+'</u></b>';
srcHTML1+='<sup><span style="font-size:small;"><b><i><font color="darkorange">'+version+'</font></i></b></span></sup>&emsp;</font>';
srcHTML1+='<a class="tsalprofile" href="https://forum.tribalwars.net/index.php?members/tsalkapone.114063/" target="_blank">'+tsalkapone_trans.general.edited_by+' Tsalkapone</a></div>';
srcHTML1+='<hr><span id="tsalbut1" style="display:none;"><input type="button" id="tsalopen" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.show_results+'"></span>';	
srcHTML1+='<span id="tsalbut2"><input type="button" id="tsalclose" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.hide_results+'"></span>';	
	srcHTML1 += "<hr/><span id='tsalkapone_output'></span><br><br><br>";
window.$(srcHTML1).insertAfter(window.$('body'));

 $("#tsalopen").click(function(){
        document.getElementById('tsalbut2').style.display="";
		document.getElementById('tsalbut1').style.display="none";
		document.getElementById('tsalkapone_output').style.display="";
    });
    $("#tsalclose").click(function(){
        document.getElementById('tsalbut2').style.display="none";
		document.getElementById('tsalbut1').style.display="";
		document.getElementById('tsalkapone_output').style.display="none";
    });



	
 }
function tsalfocus(x){
	$("#"+x+"").removeClass("inactive");
}
function fnExtractCoords(src){
	var vv=src.match(/\d+\|\d+/ig);
	return (vv?vv[vv.length-1]:null);
}

function fnCalculateDistance(to,from){
	var target = fnExtractCoords(to).match(/(\d+)\|(\d+)/);
	var source = fnExtractCoords(from).match(/(\d+)\|(\d+)/);
	var fields = Math.sqrt(Math.pow(source[1]-target[1],2)+Math.pow(source[2]-target[2],2));
	
	return fields;
}

function fnDebugLog(msg){window.$("body").append("<span>"+msg+"</span><br/>");}


	/* sendMethod = "GET" || "POST", params = json, type = xml,json,text */
function fnAjaxRequest(url,sendMethod,params,type){
	var error=null,payload=null;

	window.$.ajax({
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

function fnCreateConfig(name){return window.$(fnAjaxRequest("/interface.php","GET",{"func":name},"xml")).find("config");}
function fnCreateUnitConfig(){return fnCreateConfig("get_unit_info");}
function fnCreateWorldConfig(){return fnCreateConfig("get_config");}

function fnHasArchers(){return (parseInt(window.game_data.worldConfig.find("game archer").text()||"0",10)>0);}

function fnCalculateFields(){
var dura=document.getElementById('tsal_duration').value;
var dur=dura.split(':');
var d1 = Number(dur[0])*60*60+Number(dur[1])*60+Number(dur[2]);	

var spear_speed = unitConfig.find("spear speed").text();	
 var spear_time =  (d1/(Number(spear_speed)*60)).toFixed(1);
 document.getElementById('t_spear').innerHTML=spear_time;
 
var sword_speed = unitConfig.find("sword speed").text();	
 var sword_time =  (d1/(Number(sword_speed)*60)).toFixed(1);
 document.getElementById('t_sword').innerHTML=sword_time;
 
 var axe_speed = unitConfig.find("axe speed").text();	
 var axe_time =  (d1/(Number(axe_speed)*60)).toFixed(1);
 document.getElementById('t_axe').innerHTML=axe_time;
 
 var archer_speed = unitConfig.find("archer speed").text();	
 var archer_time =  (d1/(Number(archer_speed)*60)).toFixed(1);
 document.getElementById('t_archer').innerHTML=archer_time;
 
 var spy_speed = unitConfig.find("spy speed").text();	
 var spy_time =  (d1/(Number(spy_speed)*60)).toFixed(1);
 document.getElementById('t_spy').innerHTML=spy_time;
 
 var light_speed = unitConfig.find("light speed").text();	
 var light_time =  (d1/(Number(light_speed)*60)).toFixed(1);
 document.getElementById('t_light').innerHTML=light_time;
 
 var heavy_speed = unitConfig.find("heavy speed").text();	
 var heavy_time =  (d1/(Number(heavy_speed)*60)).toFixed(1);
 document.getElementById('t_heavy').innerHTML=heavy_time;
 
 var marcher_speed = unitConfig.find("marcher speed").text();	
 var marcher_time =  (d1/(Number(marcher_speed)*60)).toFixed(1);
 document.getElementById('t_marcher').innerHTML=marcher_time;
 
 var ram_speed = unitConfig.find("ram speed").text();	
 var ram_time =  (d1/(Number(ram_speed)*60)).toFixed(1);
 document.getElementById('t_ram').innerHTML=ram_time;
 
 var catapult_speed = unitConfig.find("catapult speed").text();	
 var catapult_time =  (d1/(Number(catapult_speed)*60)).toFixed(1);
 document.getElementById('t_catapult').innerHTML=catapult_time;
 
 var knight_speed = unitConfig.find("knight speed").text();	
 var knight_time =  (d1/(Number(knight_speed)*60)).toFixed(1);
 document.getElementById('t_knight').innerHTML=knight_time;
 
 var snob_speed = unitConfig.find("snob speed").text();	
 var snob_time =  (d1/(Number(snob_speed)*60)).toFixed(1);
 document.getElementById('t_snob').innerHTML=snob_time;
}

function fnCalculateDistTime(){
var coord1 = document.getElementById('snipe_coord').value;
var coord2 = document.getElementById('tsal_coord2').value;
var distance = fnCalculateDistance(coord1,coord2);	

var spear_speed = unitConfig.find("spear speed").text();	
 var spear_time = distance*spear_speed*msPerMin;
 var spear_t = Math.round(spear_time/msPerSec);
 var days_spear = Math.floor(Math.ceil(spear_t)/60/60/24);
var hours_spear = String("0" + Math.floor ((Math.ceil(spear_t) -Math.floor(days_spear)*60*60*24)/60/60)).slice(-2);
var mins_spear= String("0" + Math.floor ((Math.ceil(spear_t) -Math.floor(hours_spear)*60*60 -Math.floor(days_spear)*60*60*24)/60)).slice(-2);
var secs_spear= String("0" + (Math.ceil(spear_t) - Math.floor(mins_spear)*60 - Math.floor(hours_spear)*60*60 - -Math.floor(days_spear)*60*60*24)).slice(-2); 
 document.getElementById('t_spear').innerHTML=days_spear + ':' + hours_spear + ':' + mins_spear + ':' + secs_spear;
 
var sword_speed = unitConfig.find("sword speed").text();	
 var sword_time = distance*sword_speed*msPerMin;
 var sword_t = Math.round(sword_time/msPerSec);
 var days_sword = Math.floor(Math.ceil(sword_t)/60/60/24);
var hours_sword = String("0" + Math.floor ((Math.ceil(sword_t) -Math.floor(days_sword)*60*60*24)/60/60)).slice(-2);
var mins_sword= String("0" + Math.floor ((Math.ceil(sword_t) -Math.floor(hours_sword)*60*60 -Math.floor(days_sword)*60*60*24)/60)).slice(-2);
var secs_sword= String("0" + (Math.ceil(sword_t) - Math.floor(mins_sword)*60 - Math.floor(hours_sword)*60*60 - -Math.floor(days_sword)*60*60*24)).slice(-2); 
 document.getElementById('t_sword').innerHTML=days_sword + ':' + hours_sword + ':' + mins_sword + ':' + secs_sword;
 
 var axe_speed = unitConfig.find("axe speed").text();	
 var axe_time = distance*axe_speed*msPerMin;
 var axe_t = Math.round(axe_time/msPerSec);
 var days_axe = Math.floor(Math.ceil(axe_t)/60/60/24);
var hours_axe = String("0" + Math.floor ((Math.ceil(axe_t) -Math.floor(days_axe)*60*60*24)/60/60)).slice(-2);
var mins_axe= String("0" + Math.floor ((Math.ceil(axe_t) -Math.floor(hours_axe)*60*60 -Math.floor(days_axe)*60*60*24)/60)).slice(-2);
var secs_axe= String("0" + (Math.ceil(axe_t) - Math.floor(mins_axe)*60 - Math.floor(hours_axe)*60*60 - -Math.floor(days_axe)*60*60*24)).slice(-2); 
 document.getElementById('t_axe').innerHTML=days_axe + ':' + hours_axe + ':' + mins_axe + ':' + secs_axe;
 
 var archer_speed = unitConfig.find("archer speed").text();	
 var archer_time = distance*archer_speed*msPerMin;
 var archer_t = Math.round(archer_time/msPerSec);
 var days_archer = Math.floor(Math.ceil(archer_t)/60/60/24);
var hours_archer = String("0" + Math.floor ((Math.ceil(archer_t) -Math.floor(days_archer)*60*60*24)/60/60)).slice(-2);
var mins_archer= String("0" + Math.floor ((Math.ceil(archer_t) -Math.floor(hours_archer)*60*60 -Math.floor(days_archer)*60*60*24)/60)).slice(-2);
var secs_archer= String("0" + (Math.ceil(archer_t) - Math.floor(mins_archer)*60 - Math.floor(hours_archer)*60*60 - -Math.floor(days_archer)*60*60*24)).slice(-2); 
 document.getElementById('t_archer').innerHTML=days_archer + ':' + hours_archer + ':' + mins_archer + ':' + secs_archer;
 
 var spy_speed = unitConfig.find("spy speed").text();	
 var spy_time = distance*spy_speed*msPerMin;
 var spy_t = Math.round(spy_time/msPerSec);
 var days_spy = Math.floor(Math.ceil(spy_t)/60/60/24);
var hours_spy = String("0" + Math.floor ((Math.ceil(spy_t) -Math.floor(days_spy)*60*60*24)/60/60)).slice(-2);
var mins_spy= String("0" + Math.floor ((Math.ceil(spy_t) -Math.floor(hours_spy)*60*60 -Math.floor(days_spy)*60*60*24)/60)).slice(-2);
var secs_spy= String("0" + (Math.ceil(spy_t) - Math.floor(mins_spy)*60 - Math.floor(hours_spy)*60*60 - -Math.floor(days_spy)*60*60*24)).slice(-2); 
 document.getElementById('t_spy').innerHTML=days_spy + ':' + hours_spy + ':' + mins_spy + ':' + secs_spy;
 
 var knight_speed = unitConfig.find("knight speed").text();	
 var knight_time = distance*knight_speed*msPerMin;
 var knight_t = Math.round(knight_time/msPerSec);
 var days_knight = Math.floor(Math.ceil(knight_t)/60/60/24);
var hours_knight = String("0" + Math.floor ((Math.ceil(knight_t) -Math.floor(days_knight)*60*60*24)/60/60)).slice(-2);
var mins_knight= String("0" + Math.floor ((Math.ceil(knight_t) -Math.floor(hours_knight)*60*60 -Math.floor(days_knight)*60*60*24)/60)).slice(-2);
var secs_knight= String("0" + (Math.ceil(knight_t) - Math.floor(mins_knight)*60 - Math.floor(hours_knight)*60*60 - -Math.floor(days_knight)*60*60*24)).slice(-2); 
 document.getElementById('t_knight').innerHTML=days_knight + ':' + hours_knight + ':' + mins_knight + ':' + secs_knight;
 
 var light_speed = unitConfig.find("light speed").text();	
 var light_time = distance*light_speed*msPerMin;
 var light_t = Math.round(light_time/msPerSec);
 var days_light = Math.floor(Math.ceil(light_t)/60/60/24);
var hours_light = String("0" + Math.floor ((Math.ceil(light_t) -Math.floor(days_light)*60*60*24)/60/60)).slice(-2);
var mins_light= String("0" + Math.floor ((Math.ceil(light_t) -Math.floor(hours_light)*60*60 -Math.floor(days_light)*60*60*24)/60)).slice(-2);
var secs_light= String("0" + (Math.ceil(light_t) - Math.floor(mins_light)*60 - Math.floor(hours_light)*60*60 - -Math.floor(days_light)*60*60*24)).slice(-2); 
 document.getElementById('t_light').innerHTML=days_light + ':' + hours_light + ':' + mins_light + ':' + secs_light;
 
 var heavy_speed = unitConfig.find("heavy speed").text();	
 var heavy_time = distance*heavy_speed*msPerMin;
 var heavy_t = Math.round(heavy_time/msPerSec);
 var days_heavy = Math.floor(Math.ceil(heavy_t)/60/60/24);
var hours_heavy = String("0" + Math.floor ((Math.ceil(heavy_t) -Math.floor(days_heavy)*60*60*24)/60/60)).slice(-2);
var mins_heavy= String("0" + Math.floor ((Math.ceil(heavy_t) -Math.floor(hours_heavy)*60*60 -Math.floor(days_heavy)*60*60*24)/60)).slice(-2);
var secs_heavy= String("0" + (Math.ceil(heavy_t) - Math.floor(mins_heavy)*60 - Math.floor(hours_heavy)*60*60 - -Math.floor(days_heavy)*60*60*24)).slice(-2); 
 document.getElementById('t_heavy').innerHTML=days_heavy + ':' + hours_heavy + ':' + mins_heavy + ':' + secs_heavy;
 
 var marcher_speed = unitConfig.find("marcher speed").text();	
 var marcher_time = distance*marcher_speed*msPerMin;
 var marcher_t = Math.round(marcher_time/msPerSec);
 var days_marcher = Math.floor(Math.ceil(marcher_t)/60/60/24);
var hours_marcher = String("0" + Math.floor ((Math.ceil(marcher_t) -Math.floor(days_marcher)*60*60*24)/60/60)).slice(-2);
var mins_marcher= String("0" + Math.floor ((Math.ceil(marcher_t) -Math.floor(hours_marcher)*60*60 -Math.floor(days_marcher)*60*60*24)/60)).slice(-2);
var secs_marcher= String("0" + (Math.ceil(marcher_t) - Math.floor(mins_marcher)*60 - Math.floor(hours_marcher)*60*60 - -Math.floor(days_marcher)*60*60*24)).slice(-2); 
 document.getElementById('t_marcher').innerHTML=days_marcher + ':' + hours_marcher + ':' + mins_marcher + ':' + secs_marcher;
 
 var ram_speed = unitConfig.find("ram speed").text();	
 var ram_time = distance*ram_speed*msPerMin;
 var ram_t = Math.round(ram_time/msPerSec);
 var days_ram = Math.floor(Math.ceil(ram_t)/60/60/24);
var hours_ram = String("0" + Math.floor ((Math.ceil(ram_t) -Math.floor(days_ram)*60*60*24)/60/60)).slice(-2);
var mins_ram= String("0" + Math.floor ((Math.ceil(ram_t) -Math.floor(hours_ram)*60*60 -Math.floor(days_ram)*60*60*24)/60)).slice(-2);
var secs_ram= String("0" + (Math.ceil(ram_t) - Math.floor(mins_ram)*60 - Math.floor(hours_ram)*60*60 - -Math.floor(days_ram)*60*60*24)).slice(-2); 
 document.getElementById('t_ram').innerHTML=days_ram + ':' + hours_ram + ':' + mins_ram + ':' + secs_ram;
 
 var catapult_speed = unitConfig.find("catapult speed").text();	
 var catapult_time = distance*catapult_speed*msPerMin;
 var catapult_t = Math.round(catapult_time/msPerSec);
 var days_catapult = Math.floor(Math.ceil(catapult_t)/60/60/24);
var hours_catapult = String("0" + Math.floor ((Math.ceil(catapult_t) -Math.floor(days_catapult)*60*60*24)/60/60)).slice(-2);
var mins_catapult= String("0" + Math.floor ((Math.ceil(catapult_t) -Math.floor(hours_catapult)*60*60 -Math.floor(days_catapult)*60*60*24)/60)).slice(-2);
var secs_catapult= String("0" + (Math.ceil(catapult_t) - Math.floor(mins_catapult)*60 - Math.floor(hours_catapult)*60*60 - -Math.floor(days_catapult)*60*60*24)).slice(-2); 
 document.getElementById('t_catapult').innerHTML=days_catapult + ':' + hours_catapult + ':' + mins_catapult + ':' + secs_catapult;
 
 var snob_speed = unitConfig.find("snob speed").text();	
 var snob_time = distance*snob_speed*msPerMin;
 var snob_t = Math.round(snob_time/msPerSec);
 var days_snob = Math.floor(Math.ceil(snob_t)/60/60/24);
var hours_snob = String("0" + Math.floor ((Math.ceil(snob_t) -Math.floor(days_snob)*60*60*24)/60/60)).slice(-2);
var mins_snob= String("0" + Math.floor ((Math.ceil(snob_t) -Math.floor(hours_snob)*60*60 -Math.floor(days_snob)*60*60*24)/60)).slice(-2);
var secs_snob= String("0" + (Math.ceil(snob_t) - Math.floor(mins_snob)*60 - Math.floor(hours_snob)*60*60 - -Math.floor(days_snob)*60*60*24)).slice(-2); 
 document.getElementById('t_snob').innerHTML=days_snob + ':' + hours_snob + ':' + mins_snob + ':' + secs_snob;
}


function fnCalculateArriveTime(source,target,unit,landingTime){
var arrivalTime = new Date(document.getElementById("tsal_time").value.split(":").slice(0,3).join(":"));
	var coord1 = document.getElementById('snipe_coord').value;

	var coord2 = document.getElementById('tsal_coord2').value;
	var distance = fnCalculateDistance(coord1,coord2);
	var tsalunit = document.getElementById('monada').value;
	var tsal_speed = unitConfig.find(tsalunit+" speed").text();
 var spear_time = distance*tsal_speed*msPerMin;

   var launchTime = new Date();
	launchTime.setTime(Math.round((arrivalTime.getTime() + spear_time)/msPerSec)*msPerSec);
	var showtime = launchTime.toString().replace(/\w+\s*/i,"").replace(/(\d*:\d*:\d*)(.*)/i,"$1");
	document.getElementById('back_time').innerHTML='<font size="4" color="red"><b><span id="arrival_time">'+showtime+'</span></b></font>';
}

function fnCalculateArriveTime2(source,target,unit,landingTime){
var arrivalTime = new Date(document.getElementById("tsal_time").value.split(":").slice(0,3).join(":"));
	var coord1 = document.getElementById('snipe_coord').value;

	var coord2 = document.getElementById('tsal_coord2').value;
	var distance = fnCalculateDistance(coord1,coord2);
	var tsalunit = document.getElementById('monada').value;
	var tsal_speed = unitConfig.find(tsalunit+" speed").text();
 var spear_time = distance*tsal_speed*msPerMin;

   var launchTime = new Date();
	launchTime.setTime(Math.round((arrivalTime.getTime() + spear_time)/msPerSec)*msPerSec);
	var showtime = launchTime.toString().replace(/\w+\s*/i,"").replace(/(\d*:\d*:\d*)(.*)/i,"$1");
	document.getElementById('back_time').innerHTML='<font size="4" color="red"><b><span id="arrival_time">'+showtime+'</span></b></font>';
}
	
function fnCalculateLaunchTime(source,target,unit,landingTime){
	var distance = fnCalculateDistance(target,source);
	var unitSpeed = unitConfig.find(unit+" speed").text();
	
   
	/* Convert minutes to milli-seconds */
	var unitTime = distance*unitSpeed*msPerMin;
	
	/* Truncate milli-second portion of the time */
	var launchTime = new Date();
	launchTime.setTime(Math.round((landingTime.getTime() - unitTime)/msPerSec)*msPerSec);

	return launchTime;
}

function fnWriteCookie(ele){
	var snipeConfig="";

	window.$("#combined_table tr:first th img[src*=unit_]").each(function(i,e){
		snipeConfig+=window.$("#view_"+e.src.match(/unit\_(.+)\.png?/i)[1]).is(':checked')?"1":"0";
	});

	var cookie_date=new Date(2099,11,11);
	window.document.cookie='$snipe='+snipeConfig+';expires='+cookie_date.toGMTString();
}

function fnInjectUnits(){
	var twCookie=window.document.cookie.match(/\$snipe\=([0|1]*)/i);
	if(twCookie){
		twCookie=twCookie[1];
		for(var ii=0;ii<twCookie.length;ii++){
		}
	}

	window.$("#combined_table tr:first th img[src*=unit_]").each(function(i,e){
		if(this.parentNode.nodeName=="A")
		{
			window.$('<input type="checkbox" style="cursor: pointer" '+((!twCookie||(twCookie[i]=="1"))?'checked="true"':'')+' id="view_'+e.src.match(/unit\_(.+)\.png?/i)[1]+'" OnClick="fnWriteCookie(this);"/>').insertBefore(window.$(this.parentNode));
		}
		else
		{
			window.$('<input type="checkbox" style="cursor: pointer" '+((!twCookie||(twCookie[i]=="1"))?'checked="true"':'')+' id="view_'+e.src.match(/unit\_(.+)\.png?/i)[1]+'" OnClick="fnWriteCookie(this);"/>').insertBefore(window.$(this));
		}
	});
	window.$("#combined_table tr:first th:has(img[src*=unit_])").attr("style","background-color:yellow");
}
	
function fnExtractUnits(){
	var units=[];

	window.$("#combined_table tr:first th img[src*=unit_]").each(function(i,e){
		units.push(e.src.match(/unit\_(.+)\.png?/i)[1]);
	});
	
	return units;
}
	
function fnCalculateBackTime(){

	var worldConfig = fnCreateWorldConfig();
	var hasChurch = worldConfig && parseInt(worldConfig.find("game church").text()||"0", 10);
	/*var arrivalTime = new Date(window.$("#arrival_time").attr("value").split(":").slice(0,3).join(":"));
	var target = window.$("#snipe_coord").attr("value");*/
	var arrivalTime='';
	if (document.getElementById('arrival_time').value != undefined)
	{
	arrivalTime = new Date(document.getElementById('arrival_time').value.split(":").slice(0,3).join(":"));
	}
	else {
	arrivalTime = new Date(document.getElementById('arrival_time').innerHTML.split(":").slice(0,3).join(":"));
	}

	var target = document.getElementById("snipe_coord").value;
	var servertime = window.$("#serverTime").html().match(/\d+/g);
	var serverDate = window.$("#serverDate").html().match(/\d+/g);
	serverTime = new Date(serverDate[1]+"/"+serverDate[0]+"/"+serverDate[2]+" "+servertime.join(":"));
	var output = [];
	var output1 =[];
	var ii,troop_count,source,launchTime;
	var units=fnExtractUnits();
	
	/* Loop through your own villages */
	window.$("#combined_table tr:gt(0)").each(function(i,e){
		source = fnExtractCoords($(this).find("td:eq(1)").html());		
		if(source != target){
			var isVisible = false;
			
			/* Process Each Unit */
			for(ii=0;ii<units.length;ii++){
				if(window.$("#view_"+units[ii]).is(':checked')){
					troop_count = parseInt($(this).find("td:eq("+(ii+(hasChurch?9:8))+")").text(),10);
				
					/* Do we have Units currently Available */
					if(troop_count > 0){
						launchTime=fnCalculateLaunchTime(source,target,units[ii],arrivalTime);
					
						/* Cache Units that can reach the target on time */
						if(launchTime.getTime() > serverTime.getTime()){
							isVisible = true;
							
							output.push([launchTime.getTime(),""+tsalkapone_trans.general.send+" [unit]"+units[ii]+"[/unit] (" + troop_count + ") "+tsalkapone_trans.general.vil_from+" "+source+" "+tsalkapone_trans.general.vil_to+" "+target+" "+tsalkapone_trans.general.lau+" "+launchTime.toString().replace(/\w+\s*/i,"").replace(/(\d*:\d*:\d*)(.*)/i,"$1"),e]);
						output1.push([launchTime.getTime(),"[*][unit]"+units[ii]+"[/unit] [|] " + troop_count + " [|] "+source+" [|] "+target+" [|] "+launchTime.toString().replace(/\w+\s*/i,"").replace(/(\d*:\d*:\d*)(.*)/i,"$1"),e]);
						
						}
					}
				}
			}
		}

		window.$(e).attr("style","display:"+(isVisible?"table-row":"none"));
	});

	/* Sort by Launch Time in Ascending Order */		
	output = output.sort(function(a,b){return (a[0]-b[0]);});
	for(var qq=0;qq<output.length;qq++){window.$("#combined_table").get(0).tBodies[0].appendChild(output[qq][2]);}
output1 = output1.sort(function(a,b){return (a[0]-b[0]);});
	for(var qq=0;qq<output1.length;qq++){window.$("#combined_table").get(0).tBodies[0].appendChild(output1[qq][2]);}
	/* Clear existing messages and display version */
	var srcHTML = "";


	if(output.length > 0){		
	srcHTML += "<span id='tsalboss3_1'><div align=\"center\">";
		srcHTML += "<table width='100%'><tr><td><table class='vis' width='100%'><tr><th><font color='darkgreen' size='3'><b>Tsalkapone. "+tsalkapone_trans.general.list_form+"</b></font></th></tr><tr><td><textarea wrap=\"off\"  cols=\"80\" rows=\"" + (output1.length+3) + "\" style=\"width:95%;background-color:transparent;\" onfocus=\"this.select();\">";

		for(ii=0;ii<output.length;ii++){
			srcHTML += output[ii][1] + "\n";
		}

		srcHTML += "</textarea></td></tr></table></td><td></span>";
		srcHTML += "<span id='tsalboss3_2'><div align=\"center\"><table class='vis' width='100%'><tr><th><font color='darkgreen' size='3'><b>Tsalkapone. "+tsalkapone_trans.general.tab_form+"</b></font></th></tr><tr><td><textarea wrap=\"off\"  cols=\"80\" rows=\"" + (output1.length+3) + "\" style=\"width:95%;background-color:transparent;\" onfocus=\"this.select();\">";
srcHTML += '[table][**]'+tsalkapone_trans.general.speed+'[||]'+tsalkapone_trans.general.amount+'[||][color=blue]'+tsalkapone_trans.general.ori+'[/color][||][color=blue]'+tsalkapone_trans.general.dest+'[/color][||][color=darkgreen]'+tsalkapone_trans.general.lau_time+'[/color][/**]\n';
		for(ii=0;ii<output1.length;ii++){
			srcHTML += output1[ii][1] + "\n";
		}

		srcHTML += "[/table]</textarea></td></tr></table></td></tr></table></div></span>";
	}
	else{
		srcHTML += "<center><span class='tsalkembed2 pulse1'><font size='6'>*** "+tsalkapone_trans.general.tsal_notime+" ***</font></span></center>";
   UI.ErrorMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> '+tsalkapone_trans.notes.tsal_notime+'', 5000 );
	}

	srcHTML += "<br/><br/><br/>";

document.getElementById('tsalkapone_output').innerHTML=srcHTML;
}


try{
	if(document.getElementById('combined_table'))
	{
		var author="dalesmckay@gmail.com";
		var minVer="7.0";
		//var window=(window.frames.length>0)?window.main:window;
		var window = window;

		var ver="Tsalkapone"; //window.game_data.version.match(/[\d|\.]+/g);
		if(ver!=="Tsalkapone"){
			alert("Το συγκεκριμένο script απαιτεί έκδοση v"+minVer+" ή μεγαλύτερη.\nΧρησιμοποείτε την έκδοση: v"+ver[1]);
		}
		else if($("#snipe_output").length <= 0){
			var msPerSec=1000;
			var secsPerMin=60;
			var minsPerHour=60;
			var hrsPerDay=24;
			var msPerMin=msPerSec*secsPerMin;
			var msPerHour=msPerMin*minsPerHour;
			var msPerDay=msPerHour*hrsPerDay;
			var minsPerDay=hrsPerDay*minsPerHour;

			var version='v1.1';

			var unitConfig=fnCreateUnitConfig();

			fnInjectOverviewBar();
			
		}
	}
	else
	{
		var contact_url = "https://forum.tribalwars.net/index.php?members/tsalkapone.114063/";
	   var content = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="darkgreen">Tsalkapone. '+tsalkapone_trans.general.script+'</font></u></center></h2>' +
'<hr><p><center><font color=maroon><b>'+tsalkapone_trans.general.message_1+'</b></font></center></p>' +
'<p><center><font color=maroon><b>'+tsalkapone_trans.general.message_2+'</b></font></center></p>' +
'<br><br><center><input type="button" class="btn evt-confirm-btn btn-confirm-yes" id="go_man" value="'+tsalkapone_trans.general.message_yes+'">&emsp;<input type="button" class="btn evt-cancel-btn btn-confirm-no" id="close_this" value="'+tsalkapone_trans.general.message_no+'"></center>'+ 
'<br><br><hr><center><img class="tooltip-delayed" title="<font color=darkgreen>Tsalkapone. '+tsalkapone_trans.general.script+'</font>" src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg" style="cursor:help; position: relative"></center><br><center><p>'+tsalkapone_trans.general.comm+' <a href="'+contact_url+'" title="Tsalkapone profile" target="_blank">Tsalkapone</a>.</p></center>' +
'</div>';            
Dialog.show('time_distance_intro', content);
$("#go_man").click(function () { window.location.assign(game_data.link_base_pure+"overview_villages&mode=combined");});   
$("#close_this").click(function () { var close_this = document.getElementsByClassName('popup_box_close'); close_this[0].click(); });
	}
}
catch(objError){
	var dbgMsg='<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br>'+tsalkapone_trans.general.tsal_error+': ' + String(objError.message||objError);
	UI.ErrorMessage(dbgMsg,3000);
}

void(0);        
                
