/*
		scriptname:	Resource Balancer
		version:	1.0.0
		created: June 10, 2016
 		game version:	version	8.47.1
 		author:		Tsalkapone (tsalkapone@hotmail.com)
 
 ==== pages where this can be used ==== 
 * rally point (screen=place)
  
 ==== changelog ====
 *	10 June 2016 - created
 
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

javascript:

var get_lang = localStorage.getItem("resource_balancer_lang");
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
	 script:"Resource balancer",
	 instructions:"Instructions and Available Optional Settings",
	 notification:"Notification from",
         selected_one:"Current selected language",
         available:"Available languages",
		 list:"Buttons list",
		 codetext:"Extracted data",
		 mer:"Maximum merchant(-s) travel distance",
		 inf:"Infinite",
		 fields:"Fields",
		 info_1:"Use this setting to define the maximum travel distance of your merchants. Take into consideration the fact that any change on this setting may change the merchant-groups that will be eventually used. Selecting the option \"Infinite\" you minimize the amount of merchant-groups.",
		title_1:"Send extra resources",
		info_2:"Activating this checkbox the script will send extra resources from villages with full level 30 farm to villages with less than 22.000 population. Use this setting to boost the production and recruitment where needed.",
		info_3:"Attention: This setting cancels every value on the setting \"Preserve resources\".",
		title_2:"Preserve resources",
		info_4:"The following settings allow you to preserve a minimum amount of each resource type to each village.",
		pr:"At least",
		wood:"wood",
		iron:"iron",
		clay:"clay",
		dont:"Don't preserve",
		all_r:"Preserve ALL",
		title_3:"How to use \"Preserve Resources\"",
		info_5:"In some occassions you may need to balance only one type of resource, i.e. clay. In this occassion, select \"Preserve ALL\" for wood and iron and \"Don\'t Preserve\" for clay. As a result of these settings the server of the Resource Balancer will calculate transfers including just the clay resource.",
		info_6:"In some occassions you may need to preserve one type of resource, regarding if there is plenty of it in a village. For instance, if you need to preserve 250.000 iron in your villages select \"At least 250.000 iron\".",
		tips:"More tips",
		info_7:"The data that script uses to create the transfer-links refer to the visible villages of the Production page in which you activated the script. You can modify the villages' list by selecting a specific group of villages or altering the villages shown per page.",
		update:"Upcoming features",
		update_link:"Click on the following link to post any ideas or proposals or read the upcoming features of future versions",
		url_link:"LINK",
		notes:"NOTE",
		message:"Script delivers resources based on a python algorithm that uses the farm population of each village and acts accordingly. For instance, villages with more thatn 23.950 population will receive the 85% of the average resource units, while villages with 22.000 population will receive more. The maximum resource units that a village may receive is 200% of the average.",
		message_no:"No",
		message_yes:"Yes",
		message_1:"This script is activated on Production Page from the Overview menu.",
		message_2:" Do you want to automatically assign your location to this page?",
		comm:"Feel free to send any message regarding script bugs or proposing ideas to",
		lang_select:"The language settings have been succesfully changed to the",
english_lang:"English language.",
greek_lang:"Greek language.",		
		lang_select_1:"The saved settings will be applied the next time you activate the script.", 
		lang_change:"Click here to change the language settings",
		},
	buttons:{
		lang_open:"Open language selection",
              lang_close:"Close language selection",
			  send:"Click here to send the extracted data to the server",
			  submit_s:"Send data & settings to server",
	},
};
tsalkapone_trans.greek= { 
	 general:{ 
	 script:"Ισορροπιστής Πόρων",
	 instructions:"Οδηγίες και Προαιρετικές Ρυθμίσεις",
	 notification:"Ειδοποίηση από τον",
            selected_one:"Ενεργή γλώσσα",
            available:"Διαθέσιμες γλώσσες",
			list:"Πίνακας πλήκτρων",
			codetext:"Εξαχθέντα δεδομένα",
			mer:"Μέγιστη απόσταση διαδρομής εμπόρου (-ων)",
			inf:"Απεριόριστη",
			fields:"Πεδία",
			info_1:"Χρησιμοποιήστε την εξής προαιρετική ρύθμιση για να καθορίσετε την απόσταση διαδρομής των εμπόρων. Σημειώτεον, ορισμένες αλλαγές στη συγκεκριμένη ρύθμιση ενδέχεται να μεταβάλλουν το συνηθισμένο αριθμό ομάδων-εμπόρων που χρησιμοποιείται. Επιλέγοντας απεριόριστη τιμή στη ρύθμιση ελαχιστοποιεί το πλήθος των ομάδων-εμπόρων που πρέπει να χρησιμοποιείστε.",
			title_1:"Αποστολή επιπλέον πόρων",
			info_2:"Επιλέγοντας τη συγκεκριμένη ρύθμιση ενεργοποιείται η αποστολή επιπλέον πόρων από χωριά με 24.000 πληθυσμό σε χωριά με πληθυσμό μικρότερο του 22.000. Προτιμήστε τη συγκεκριμένη ρύθμιση για να βελτιώστε το ρυθμό παραγωγής χωριών που απαιτούν πόρους για αναβάθμιση κτιρίων ή στρατολόγηση.",
			info_3:"Προσοχή: Η συγκεκριμένη ρύθμιση ακυρώνει το σύνολο των ρυθμίσεων διατήρησης πόρων.",
			title_2:"Διατήρηση πόρων",
			info_4:"Οι συγκεκριμένες προαιρετικές ρυθμίσεις σας επιτρέπουν να διατηρήστε μια ελάχιστη τιμή από το κάθε επιλεγμένο πόρο σε χωριά με πληθώρα από το συγκεκριμένο πόρο.",
			pr:"Διατήρησε τουλάχιστον",
			wood:"ξύλο",
			iron:"σίδερο",
			clay:"πηλό",
			dont:"Μη διατηρήσεις",
			all_r:"Διατήρησε ΟΛΟ το",
			title_3:"Αξιοποίηση των ρυθμίσεων διατήρησης πόρων",
			info_5:"Υπάρχουν περιπτώσεις που μπορεί να επιθυμείτε την εξισορρόπηση ενός πόρου, για παράδειγμα του πηλού.  Σε αυτή την περίπτωση επιλέξτε \"Διατήρηση ΟΛΟΥ\" για το ξύλο και το σίδερο, και αφήστε ανεπίλεκτη τη ρύθμιση διατήρησης του πηλού. Σαν αποτέλεσμα των ρυθμίσεων αυτών ο ισορροπιστής πόρων (resource balancer) θα εμφανίσει αποτελέσματα που αφορούν μόνο μεταφορές πηλού.",
			info_6:"Σε περίπτωση που επιθυμείτε, για προσωπικούς σκοπούς, να διατηρείστε τουλάχιστον μια ποσότητα πόρου στα χωριά ανεξάρτητα με το αν υπάρχει πληθώρα του συγκεκριμένου πόρου. Για παράδειγμα αν επιθυμείτε να διατηρείστε 250.000 σίδερο στα χωριά σας επιλέξτε \"Διατήρησε τουλάχιστον 250.000 σίδερο\" και αφήστε τις προκαθορισμένες ρυθμίσεις για το πηλό και το ξύλο.",
			tips:"Περισσότερες οδηγίες",
			info_7:"Τα δεδομένα που αξιοποιεί το script για να δημιουργήσει τους συνδέσμους μεταφοράς πόρων αναφέρονται στα ορατά χωριά της σελίδας Παραγωγής στην οποία ενεργοποιήθηκε το script. Μπορείτε να ρυθμίσετε τα χωριά επιλέγοντας συγκεκριμένη ομάδα χωριών ή μεταβάλλοντας το πλήθος των ορατών χωριών ανά σελίδα.",
			update:"Ανερχόμενα χαρακτηριστικά",
			update_link:"Επιλέξτε το παρακάτω σύνδεσμο για να εποπτεύεσετε τα ανερχόμενα χαρακτηριστικά μελλοντικών εκδόσεων ή για να δημοσιεύσετε μια ιδέα ή πρόταση",
			url_link:"ΕΔΩ",
			notes:"ΣΗΜΕΙΩΣΗ",
			message:"Τα χωριά με περισσότερο από 23950 πληθυσμό θα υποστούν μια εξισορρόπηση πόρων της τάξεως του 85% του μέσου όρου. Χωριά με λιγότερο από 22.000 πληθυσμό θα λαμβάνουν επιπλέον πόρους σε αύξουσα κλίμακα αντιστρόφως ανάλογη του πληθυσμού μέχρι ένα ανώτατο όριο της τάξεως του 200% του μέσου όρου.",
			message_no:"Όχι",
		message_yes:"Ναι",
		message_1:"Το συγκεκριμένο script ενεργοποιείται από τη σελίδα της Παραγωγής από το μενού των Επισκοπήσεων.",
		message_2:"Επιθυμείτε αυτόματη ανακατεύθυνση;",
		comm:"Επικοινωνήστε ανά πάσα στιγμή για οποιαδήποτε ιδέα ή πρόταση σχετικά με τα scripts με τον",
		lang_select:"Οι ρυθμίσεις της γλώσσας άλλαξαν επιτυχώς στην",
		english_lang:"Αγγλική γλώσσα.",
greek_lang:"Ελληνική γλώσσα.",		
		lang_select_1:"Οι αποθηκευμένες ρυθμίσεις θα εφαρμοστούν στην επόμενη ενεργοποίηση του script.", 
		lang_change:"Επιλέξτε εδώ για να αλλάξετε ρυθμίσεις γλώσσας",
			},
	buttons:{		
			  lang_open:"Άνοιγμα επιλογής γλώσσας",
              lang_close:"Κλείσιμο επιλογής γλώσσας",
			   send:"Επιλέξτε εδώ για να στείλετε τα εξαγώμενα δεδομένα στον server",
			   submit_s:"Αποστολή δεδομένων και ρυθμίσεων",
	},
};
    return tsalkapone_trans[lang];
    }());
 var lang_img='';
        if (lang=="greek") {lang_img ='<img title="Ελληνικά" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif">';}
        else if (lang=="english") {lang_img ='<img height="20px" style="cursor:help;" title="English/American" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif">';}
    

var MarketMain=function(){if("overview_villages"==game_data.screen&&"prod"==game_data.mode)
{var c=document.URL.split("/")[2],d="0"!=game_data.player.sitter,b="",a=$("#production_table").find(".nowrap"),g=a.length;a.each(function(a,d){var e=$(d),c=e.find("a:first"),h=e.find("td:eq(3) > span"),f=e.find("td:eq(6)").text().split("/"),l=$.trim(c.text()),m=c.attr("href").match(/village=(\d+)/)[1],c=c.text().match(/\d{1,3}\|\d{1,3}/)[0],n=h.eq(0).text().replace(".",""),p=h.eq(1).text().replace(".",""),h=
h.eq(2).text().replace(".",""),q=e.find("td:eq(5)").text().split("/")[0],e=e.find("td:eq(4)").text(),f=24E3<f[1]?f[0]-(f[1]-24E3):f[0];b+=l+"^ ";b+=m+"^ ";b+=c+"^ ";b+=n+"^ ";b+=p+"^ ";b+=h+"^ ";b+=q+"^ ";b+=e+"^ ";b+=f;a!=g-1&&(b+="&@& ")});
a='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
a+='<html xmlns="http://www.w3.org/1999/xhtml"><head>';
a+='<meta charset="utf-8" />';
a+='<link rel="shortcut icon" href="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg">';
a+='<title>Tsalkapone. '+tsalkapone_trans.general.script+'</title>';
a+='<link rel="stylesheet" type="text/css" href="https://dl.dropboxusercontent.com/s/yr3g1n4j01bbx3d/Tsalkapone.%20Ισορροπιστής%20πόρων%20κεντρικό%20μενού.css" />';
a+='<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>';
a+='<link type="text/css" href="https://dl.dropboxusercontent.com/s/yz331gj8yvdrew6/Tsalkapone.jquery-ui-1.8.16.custom.css" rel="stylesheet" />';
a+='<link type="text/css" href="https://dl.dropboxusercontent.com/s/ecq2bovs75ab1dv/Tsalkapone.UI.css" rel="stylesheet" />';
a+='<link rel="stylesheet" type="text/css" href="https://dl.dropboxusercontent.com/s/wospkrx52qhkbsy/Tsalkapone.resource_balancer.css" />';
a+='<script type="text/javascript" src="https://dl.dropboxusercontent.com/s/cuhnfeps6wot58v/Tsalkapone.jquery-1.6.2.min.js"></script>';
a+='<script type="text/javascript" src="https://dl.dropboxusercontent.com/s/qcza0xalv5ia9ri/Tsalkapone.jquery-ui-1.8.16.custom.min.js"></script>';
a+='<script type="text/javascript" src="https://dl.dropboxusercontent.com/s/tto9vbm9aawz5gc/Tsalkapone.UI.js"></script>';
a+='<script type="text/javascript" charset="utf-8">';
a+=' $(function(){var get_lang = localStorage.getItem("resource_balancer_lang"); if (get_lang == "greek") {document.getElementById(\'greek_lang\').checked = true;}else  if (get_lang == "english") {document.getElementById(\'english_lang\').checked = true; }';
a+='$("#english_lang").click(function(){localStorage.setItem("resource_balancer_lang","english"); UI.SuccessMessage("<span id=tsalkaponesuccesssave><b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></span><br><br>'+tsalkapone_trans.general.lang_select+' '+tsalkapone_trans.general.english_lang+' '+tsalkapone_trans.general.lang_select_1+'<br><br><font color=cyan><u>Global note</u><br> Changes will be applied next time you activate the script.</font>", 5000);});';
a+='$("#greek_lang").click(function(){localStorage.setItem("resource_balancer_lang","greek");UI.SuccessMessage("<span id=tsalkaponesuccesssave><b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></span><br><br>'+tsalkapone_trans.general.lang_select+' '+tsalkapone_trans.general.greek_lang+' '+tsalkapone_trans.general.lang_select_1+'<br><br><font color=cyan><u>Global note</u><br> Changes will be applied next time you activate the script.</font>", 5000);});';
a+='$("#openfilterbut1").click(function(){document.getElementById(\'columnfilter1\').style.display="";document.getElementById(\'openfilter1\').style.display="none";document.getElementById(\'closefilter1\').style.display="";});';
a+='$("#closefilterbut1").click(function(){document.getElementById(\'columnfilter1\').style.display="none";document.getElementById(\'openfilter1\').style.display="";document.getElementById(\'closefilter1\').style.display="none";});';
a+='});</script>';
a+='</head><body onload=window.focus() style="overflow:visible"> <p><p><p><table class="main" width="1200" align="center" cellspacing="5"><tr><td><p></td></tr><tr><td width="50%" valign="top"><table><tr><td>';
a+='<font color=maroon><b><u><i>'+tsalkapone_trans.general.codetext+':</i></u></b></font><br><br>';
a+='<form name=ResourceBalanceForm action="http://www.extremetw.com/cgi-bin/ResourceBalancerv4a.py" method="post"><textarea name="input" id="tsal_code" class="tsaltext" rows="30" cols="15">'+b+"</textarea></td></tr><tr><td>";
a+='<br><table class="tsaldesc" width="100%" ><tbody><tr><th colspan="2"><font color="darkgreen">Tsalkapone. '+tsalkapone_trans.general.list+'</font></th></tr>';
a+='<tr><td>'+tsalkapone_trans.buttons.send+'</td><td><center><input type="hidden"name="server" value="'+c+'"><input class="tsalbut" type="submit" value="'+tsalkapone_trans.buttons.submit_s+'"/><b></b>';
if (Number(game_data.player.sitter) > 0) {a+='<input type="hidden" name="sitter" value="t='+game_data.player.id+'&">';}
a+='</center></td></tr><tr><td>'+tsalkapone_trans.general.lang_change+'</td><td><center>';
a+='<font style="font-family: \'Arial Black\', Gadget, sans-serif;"><span id="openfilter1"><input class="tsalbut" type="button" value="'+tsalkapone_trans.buttons.lang_open+'" id="openfilterbut1"></span><span id="closefilter1" style="display:none">';
a+='<input class="tsalbut" type="button" value="'+tsalkapone_trans.buttons.lang_close+'" id="closefilterbut1"></span></center></td></tr>';
a+='<tr><td><span id="selectedone"><font color="maroon"><b>'+tsalkapone_trans.general.selected_one+'</b></font></span>';
a+='<span id="columnfilter1" style="display:none" class="vis"><font size="2">';
a+='<br><br><center><font color="blue"><b><u>'+tsalkapone_trans.general.available+'</u></b></font></center><input type="radio"  name="language" value="greek" id="greek_lang" ><img title="Greek \n\nBy Tsalkapone" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif"><br>';
a+='<input type="radio"  name="language" value="english" id="english_lang" checked><img height="20px" style="cursor:help;" title="English/American \n\nBy Tsalkapone" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif"><br>';
a+='</span></font></td>';
a+='<td><center> '+lang_img+' </center></td></tr>'; 
a+='</table></tr></td>';
a+='</table>';
a+='<map name="admap49369" id="admap49369"><area href="https://forum.tribalwars.net/member.php?114063-Tsalkapone" shape="rect" coords="0,0,580,350" title="" alt="" target="_blank" /></map>';
a+='<center> <img src="https://dl.dropboxusercontent.com/s/wz0c16e2a81tgpe/Tsalkapone.%20Why%20so%20serious.gif" width="580" height="350" usemap="#admap49369" border="0" alt="" /></center>';
a+='<td width="50%" valign="top"><center><span style="font-weight:100;font-style:italic;text-decoration:none;font-size:x-large;"><u>';
a+='<a href="https://forum.tribalwars.net/member.php?114063-Tsalkapone" title="Tsalkapone profile" target="_blank"> Tsalkapone. '+tsalkapone_trans.general.script+'</a></u></span><br><br><b><font size="3" color=maroon><i><u>'+tsalkapone_trans.general.instructions+'</u></i></font></b></center><br/>';
a+='<table class="tsaldesc1"><tr><td><font color="darkgreen" size="3"><b><u>&#8667; '+tsalkapone_trans.general.mer+'</u></b></font></td></tr>';
a+='<tr><td><select id="maxFields" name="maxFields"><option value="0">'+tsalkapone_trans.general.inf+'</option>';
a+='<option value="25"> < 25 '+tsalkapone_trans.general.fields+' </option><option value="50"> < 50 '+tsalkapone_trans.general.fields+' </option>';
a+='<option value="100"> < 100 '+tsalkapone_trans.general.fields+' </option><option value="200"> < 200 '+tsalkapone_trans.general.fields+' </option>';
a+='<option value="300"> < 300 '+tsalkapone_trans.general.fields+' </option><option value="500"> < 500 '+tsalkapone_trans.general.fields+' </option></select><br><br>';
a+=''+tsalkapone_trans.general.info_1+'</td></tr>';
a+='<tr><td><font color="darkgreen" size="3"><b><u>&#8667; '+tsalkapone_trans.general.title_1+'</u></font></b></td></tr>';
a+='<tr><td><input type="checkbox" name="extra" value="True"/> '+tsalkapone_trans.general.info_2+'';
a+='<br><br><font color="red"><u>'+tsalkapone_trans.general.info_3+'</u></font>';
a+='<tr><td><font color="darkgreen" size="3"><b><u>&#8667; '+tsalkapone_trans.general.title_2+'</u></font></b></td></tr>';
a+='<tr><td>'+tsalkapone_trans.general.info_4+'';
a+='<br><br><select id="wood_select" class="wood_select" name="wood"><option value="0" >'+tsalkapone_trans.general.dont+' '+tsalkapone_trans.general.wood+'</option><option value="50000" >'+tsalkapone_trans.general.pr+' 50.000 '+tsalkapone_trans.general.wood+'</option>';
a+='<option value="100000" >'+tsalkapone_trans.general.pr+' 100.000 '+tsalkapone_trans.general.wood+'</option><option value="150000" >'+tsalkapone_trans.general.pr+' 150.000 '+tsalkapone_trans.general.wood+'</option><option value="200000" >'+tsalkapone_trans.general.pr+' 200.000 '+tsalkapone_trans.general.wood+'</option><option value="250000" >'+tsalkapone_trans.general.pr+' 250.000 '+tsalkapone_trans.general.wood+'</option>'
a+='<option value="300000" >'+tsalkapone_trans.general.pr+' 300.000 '+tsalkapone_trans.general.wood+'</option><option value="350000">'+tsalkapone_trans.general.pr+' 350.000 '+tsalkapone_trans.general.wood+'</option><option value="400000">'+tsalkapone_trans.general.all_r+' '+tsalkapone_trans.general.wood+'</option></select>';
a+='<br><br><select id="clay_select" class="clay_select" name="clay"><option value="0" >'+tsalkapone_trans.general.dont+' '+tsalkapone_trans.general.clay+'</option>';
a+='<option value="50000" >'+tsalkapone_trans.general.pr+' 50.000 '+tsalkapone_trans.general.clay+'</option>\t<option value="100000" >'+tsalkapone_trans.general.pr+' 100.000 '+tsalkapone_trans.general.clay+'</option>';
a+='<option value="150000" >'+tsalkapone_trans.general.pr+' 150.000 '+tsalkapone_trans.general.clay+'</option><option value="200000" >'+tsalkapone_trans.general.pr+' 200.000 '+tsalkapone_trans.general.clay+'</option>';
a+='<option value="250000" >'+tsalkapone_trans.general.pr+' 250.000 '+tsalkapone_trans.general.clay+'</option><option value="300000" >'+tsalkapone_trans.general.pr+' 300.000 '+tsalkapone_trans.general.clay+'</option>';
a+='<option value="350000">'+tsalkapone_trans.general.pr+' 350.000 '+tsalkapone_trans.general.clay+'</option><option value="400000">'+tsalkapone_trans.general.all_r+' '+tsalkapone_trans.general.clay+'</option></select>';
a+='<br><br><select id="iron_select" class="iron_select" name="iron">\t<option value="0" >'+tsalkapone_trans.general.dont+' '+tsalkapone_trans.general.iron+'</option><option value="50000" >'+tsalkapone_trans.general.pr+' 50.000 '+tsalkapone_trans.general.iron+'</option>';
a+='<option value="100000" >'+tsalkapone_trans.general.pr+' 100.000 '+tsalkapone_trans.general.iron+'</option><option value="150000" >'+tsalkapone_trans.general.pr+' 150.000 '+tsalkapone_trans.general.iron+'</option>';
a+='<option value="200000" >'+tsalkapone_trans.general.pr+' 200.000 '+tsalkapone_trans.general.iron+'</option><option value="250000" >'+tsalkapone_trans.general.pr+' 250.000 '+tsalkapone_trans.general.iron+'</option>';
a+='<option value="300000" >'+tsalkapone_trans.general.pr+' 300.000 '+tsalkapone_trans.general.iron+'</option><option value="350000">'+tsalkapone_trans.general.pr+' 350.000 '+tsalkapone_trans.general.iron+'</option>';
a+='<option value="400000">'+tsalkapone_trans.general.all_r+' '+tsalkapone_trans.general.iron+'</option></select></td></tr>';
a+='<tr><td><font color="darkgreen" size="3"><b><u>&#8667; '+tsalkapone_trans.general.title_3+'</u></b></font></td></tr><tr><td><b>';
a+='1. </b>'+tsalkapone_trans.general.info_5+'<br><br>';
a+='<b>2. </b>'+tsalkapone_trans.general.info_6+'</form></td></tr>';
a+='<tr><td><font color="darkgreen" size="3"><b><u>&#8667; '+tsalkapone_trans.general.tips+'</u></b></font></td></tr><tr><td>'+tsalkapone_trans.general.info_7+'</td></tr>';
a+='<tr><td><font color="darkgreen" size="3"><b><u>&#8667; '+tsalkapone_trans.general.update+'</u></b></font></td></tr><tr><td>'+tsalkapone_trans.general.update_link+'';
a+=': <a href="http://forum.tribalwars.net/showthread.php?t=172320" target="_blank">'+tsalkapone_trans.general.url_link+'</a>';
a+='<p><u><b><font color="red">'+tsalkapone_trans.general.notes+':</font></b></u>';
a+=' '+tsalkapone_trans.general.message+'</p>';
a+='</td></td></table></td></tr></table></body></html>';

		/*==== register ====*/
var script = {
	scriptname: 'Resource Balancer',
	version: '1.0',
	author: 'Tsalkapone',
	email: 'tsalkapone@hotmail.com',
	broken: false
};
$.post(ScriptAPI.url,script);


c=window.open("","name");c.document.write(a);c.document.close()}
else {
	var contact_url="https://forum.tribalwars.net/member.php?114063-Tsalkapone";
	   var content = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="darkgreen">Tsalkapone. '+tsalkapone_trans.general.script+'</font></u></center></h2>' +
'<hr><p><center><font color=maroon><b>'+tsalkapone_trans.general.message_1+'</b></font></center></p>' +
'<p><center><font color=maroon><b>'+tsalkapone_trans.general.message_2+'</b></font></center></p>' +
'<br><br><center><input type="button" class="btn evt-confirm-btn btn-confirm-yes" id="go_man" value="'+tsalkapone_trans.general.message_yes+'">&emsp;<input type="button" class="btn evt-cancel-btn btn-confirm-no" id="close_this" value="'+tsalkapone_trans.general.message_no+'"></center>'+ 
'<br><br><hr><center><img class="tooltip-delayed" title="<font color=darkgreen>Tsalkapone. '+tsalkapone_trans.general.script+'</font>" src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg" style="cursor:help; position: relative"></center><br><center><p>'+tsalkapone_trans.general.comm+' <a href="'+contact_url+'" title="Tsalkapone profile" target="_blank">Tsalkapone</a>.</p></center>' +
'</div>';            
Dialog.show('resource_balancer_intro', content);
$("#go_man").click(function () { window.location.assign(game_data.link_base_pure+"overview_villages&mode=prod");});   
$("#close_this").click(function () { var close_this = document.getElementsByClassName('popup_box_close'); close_this[0].click(); });
	}
};

function getGameDoc(c){var d=c.document;if(!d.URL.match("game.php"))for(var b=0;b<c.frames.length;b++)c.frames[b].document.URL.match("game.php")&&(d=c.frames[b].document);return d}doc=getGameDoc(window);
function FillRes(){function c(a){a=parseInt(a,10);isNaN(a)&&(a=0);return a}
var d=doc.forms[0],b=c(d.wood.value),a=c(d.stone.value),g=c(d.iron.value);
if(!(0<b+a+g)){for(var k=doc.URL.split("&"),j=0;j<k.length;j++){var e=k[j].split("=");2==e.length&&("wood"==e[0]?b=parseInt(e[1]):"clay"==e[0]?a=parseInt(e[1]):"iron"==e[0]&&(g=parseInt(e[1])))}insertNumber(d.wood,b);insertNumber(d.stone,a);insertNumber(d.iron,g)}d=d.getElementsByTagName("input");for(b=0;b<d.length;b++)if(-1!=d[b].value.indexOf("OK")){d[b].click();
break}}doc.URL.match(/clay=/)||doc.URL.match(/confirm_send/)?FillRes():MarketMain(); 
	}
	
	
	