/*
		scriptname:	Additional Map Info 
		version:	1.0.0
		created: June 19, 2016
 		game version:	version	8.48.1
 		author:		Tsalkapone (tsalkapone@hotmail.com)
 
 ==== pages where this can be used ==== 
 * Map (screen=map)
  
 ==== changelog ====
 *	19 June 2016 - created
 
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
 
 var get_lang = localStorage.getItem("map_info_lang");
    var lang="";
	var tsal_market=game_data.market;
    if (get_lang === null) 
	{if (tsal_market=="it") {lang="italian";}
	else if (tsal_market=="gr") {lang="greek";}
  else   {lang = "english";} }
    else { lang = ""+get_lang+"";}
    var supported_languages =["greek","english","italian"];
    var lang_check = supported_languages.indexOf(lang);
    if (lang_check < 0) {UI.ErrorMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> The selected language is not supported. Please select one of the supported languages.', 5000);}
    else {
 var tsalkapone_trans = (function() {
				    var tsalkapone_trans = {};
    tsalkapone_trans.english= { 
	 general:{ 
	 script:"Additional Map Info",
	 notification:"Notification from",
         selected_one:"Current selected language",
         available:"Available languages",
		 button_list:"Buttons List",
		 add_info:"Click to read more about the additional info displayed",
		 lang_sel:"Click to change the selected language",		
		month:"mon",
		days:"d.",
		message_no:"No",
		message_yes:"Yes",
		message_1:"This script is activated on Map.",
		message_2:" Do you want to automatically assign your location to this page?",
		comm:"Feel free to send any message regarding script bugs or proposing ideas to",
	},
	buttons:{
			  lang_open:"Open language selection",
              lang_close:"Close language selection",
			  see_info:"Additional Map Info",
	},
};
tsalkapone_trans.italian= { 
 general:{ 
     script:"Ulteriori info mappa",
     notification:"Notifiche da",
         selected_one:"Corrente lingua selezionata",
         available:"lingue disponibili",
         button_list:"Lista pulsanti",
         add_info:"Clicca per leggere più informazioni aggiuntive",
         lang_sel:"Clicca per cambiare la lingua selezionata",      
        month:"mon",
        days:"d.",
        message_no:"No",
        message_yes:"Si",
        message_1:"Questo script è attivo sulla mappa.",
        message_2:" Vuoi assegnare automaticamente la posizione su questa pagina?",
        comm:"Sentitevi liberi di inviare alcun messaggio relativo ai bugs-script o proporre idee a",
    },
buttons:{
              lang_open:"Open language selection",
              lang_close:"Close language selection",
              see_info:"Additional Map Info",
},
 };
tsalkapone_trans.greek= { 
	 general:{ 
	 script:"Πρόσθετα Χάρτη",
	 instructions:"Οδηγίες και μεταβλητές βοηθήματος για τον Ισορροπιστή Πόρων",
	 notification:"Ειδοποίηση από τον",
            selected_one:"Ενεργή γλώσσα",
            available:"Διαθέσιμες γλώσσες",
			button_list:"Πίνακας πλήκτρων",
			add_info:"Επιλέξτε για να διαβάσετε για τις επιπρόσθετες λεπτομέρειες στο Χάρτη",
			lang_sel:"Επιλέξτε για να αλλάξετε την επιλεγμένη γλώσσσα",
			month:"μην",
			days:"μ.",
			message_no:"Όχι",
		message_yes:"Ναι",
		message_1:"Το συγκεκριμένο script ενεργοποιείται από το Χάρτη.",
		message_2:"Επιθυμείτε αυτόματη ανακατεύθυνση;",
		comm:"Επικοινωνήστε ανά πάσα στιγμή για οποιαδήποτε ιδέα ή πρόταση σχετικά με τα scripts με τον",
	},
	buttons:{		
			  lang_open:"Άνοιγμα επιλογής γλώσσας",
              lang_close:"Κλείσιμο επιλογής γλώσσας",
			  see_info:"Πρόσθετα Χάρτη",
	},
};
    return tsalkapone_trans[lang];
    }());
	}
	var Tsalmap = location.href.indexOf('screen=map') > -1;
			if (!Tsalmap) {
				var contact_url = "https://forum.tribalwars.net/index.php?members/tsalkapone.114063/";
	   var content = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="darkgreen">Tsalkapone. '+tsalkapone_trans.general.script+'</font></u></center></h2>' +
'<hr><p><center><font color=maroon><b>'+tsalkapone_trans.general.message_1+'</b></font></center></p>' +
'<p><center><font color=maroon><b>'+tsalkapone_trans.general.message_2+'</b></font></center></p>' +
'<br><br><center><input type="button" class="btn evt-confirm-btn btn-confirm-yes" id="go_man" value="'+tsalkapone_trans.general.message_yes+'">&emsp;<input type="button" class="btn evt-cancel-btn btn-confirm-no" id="close_this" value="'+tsalkapone_trans.general.message_no+'"></center>'+ 
'<br><br><hr><center><img class="tooltip-delayed" title="<font color=darkgreen>Tsalkapone. '+tsalkapone_trans.general.script+'</font>" src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg" style="cursor:help; position: relative"></center><br><center><p>'+tsalkapone_trans.general.comm+' <a href="'+contact_url+'" title="Tsalkapone profile" target="_blank">Tsalkapone</a>.</p></center>' +
'</div>';            
Dialog.show('map_info_intro', content);
$("#go_man").click(function () { window.location.assign(game_data.link_base_pure+"map");});   
$("#close_this").click(function () { var close_this = document.getElementsByClassName('popup_box_close'); close_this[0].click(); });
	} 
	else {
		$.getScript('https://dl.dropboxusercontent.com/s/omtgou25ppnclfs/Tsalkapone.%20More%20map%20info.js');void(0);
	}
