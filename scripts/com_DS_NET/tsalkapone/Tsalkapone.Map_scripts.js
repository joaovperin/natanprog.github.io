/*
		scriptname:	Map Scripts 
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



function tsalkaponetool_ready() {
   var get_lang = localStorage.getItem("map_scripts_lang");
    var lang="";
	var tsal_market=game_data.market;
    if (get_lang === null) 
		 {if (tsal_market=="it") {lang="italian";}
	else if (tsal_market=="gr") {lang="greek";}
  else   {lang = "english";} }
    else { lang = ""+get_lang+"";}
    var supported_languages =["greek","english","italian"];
    var lang_check = supported_languages.indexOf(lang);
    if (lang_check < 0) {UI.ErrorMessage('<font color=gold><b><center>'+tsalkapone_trans.general.notification+' Tsalkapone</center></b></font> <br><br> The selected language is not supported. Please select one of the supported languages.', 5000);}
    else {
 var tsalkapone_trans = (function() {
				    var tsalkapone_trans = {};
    tsalkapone_trans.english= { 
	 general:{ 
	 script:"Map Scripts",
         menu:"Menu",
	 notification:"Notification from",
         selected_one:"Current selected language",
         available:"Available languages",
		 button_list:"Functions & Buttons List",
		 lang_sel:"Click to change the selected language",		
		message_no:"No",
		message_yes:"Yes",
		message_1:"This script is activated on Map.",
		message_2:" Do you want to automatically assign your location to this page?",
		comm:"Feel free to send any message regarding script bugs or proposing ideas to",
         funcs:"Functions' Description",
         buts:"Buttons",
         cofinder:"Extract and count every coord on the visible canvas of the Map",
         coex:"Extract the coords from selected villages and use or modify them through a variety of functions",
         copoints:"Extract coords from the visible canvas of the Map based on their type (barbarian or player's) and their points",
         religion:"Design infuence area of religion on Map's canvas based on any kind of church's type and level",
         resize:"Resize the visible canvas of the Map and the Minimap",
         typepo:"Define the type and points of villages to be searched",
         barbs:"Check to search for barbarian villages",
         players:"Check to search for players villages",
         mins:"Minimum points",
         maxs:"Maximum points",
         order:"Vertical/Horizontal order",
         barb_c:"You have included barbarian villages in the search",
         player_c:"You have included players villages in the search",
         barb_no:"You have excluded barbarian villages from the search",
         player_no:"You have excluded players villages from the search",
         context1:"Context of the extracted coordinations",
         results:"Total coords extracted",
         ex1:"Coords Extractor",
         ex2:"Add [claim] bb-code",
         ex3:"Show counting",
         ex4:"Design table for tribal forums",
         ex5:"Show points",
         expoints:"Points",
         excoords:"Coords",
         script_text:"Text that may be used in fake/farming/nuke scripts",
         no_coords:"No coords extracted",
         ask:"I ask for permission to claim the following villages",
         gen_text:"Context for the Claim List",
         activate:"Activate",
         targets:"Coords ~ Targets",
         ch_level:"Church Level",
         sel_op:"Select an option",
         av_op:"Available options",
         vil:"Current village",
         ovil:"Selected village",
         not_act:"Not activated",
         sel_ch:"Select church level",
         f1:"First Church",
         level:"Level",
         act:"Activated",
         res_rel:"Check this option to clear any belief radius on the Map. If you don't you won't be able to lower church levels",
         map:"Map",
		 info1:"Check to include the points of every extracted village",
		 info2:"Check to add the [claim] tag to the selected villages",
		 info3:"Check to design a table with the selected extracted data",
		 info4:"Check to add numbering to the extracted villages",
		 info5:"Check to order the extracted data vertically. Uncheck to order them horizontally",
	},
	buttons:{
			  lang_open:"Open language selection",
              lang_close:"Close language selection",
        cofinder:"Coords Finder",
         coex:"Coords Extractor",
         copoints:"Coords & Points",
         religion:"Religion Infuence",
         resize:"Resize Map",
        search:"Search for Coords",
        close_cofinder:"Close Coords Finder",
        close_area:"Close context",
        show_area:"Show context",
        hide_area:"Hide context",
         close_coex:"Close Extractor",
        claim_text:"Create claim text",
        fake_text:"Form text for script",
        close_rel:"Close Religion Infuence",
        apply_rel:"Apply Settings",
        close_resize:"Close Map Resize",
        map_info:"Note that some functions are available only under certain cirmustances. <br><br> For instance Map Resize is only available with inactive premium account and Infuence Religion only with active church config",
	},
        notes:{
			activated:"The script is already active. Search for the menu under the Map.",
            extractor1:"The script is already active. Search for the extractor's table under the minimap",
            extractor2:"In case you activated the script and closed its table you have to refresh the page to be able to re-activate it",
            resize:"Click here to resize the Map",
            applied:"The belief radius has been applied on the Map",
        },
};
tsalkapone_trans.italian= { 
     general:{ 
     script:"Script per la Mappa",
         menu:"Menu",
     notification:"Notifica data",
            selected_one:"Lingua corrente selezionata",
            available:"Lingue disponibili",
            button_list:"Lista Funzioni & Tasti",
            lang_sel:"Clicca per cambiare la lingua selezionata",
            message_no:"No",
        message_yes:"Si",
        message_1:"Questo script è attivato sulla Mappa",
        message_2:"Vuoi cambiare automaticamente la pagina?",
        comm:"Sentiti libero di inviare messaggi di ringraziamento o di segnalazioni bug o proposte a",
         funcs:"Descrizione Funzioni",
         buts:"Tasti",
         cofinder:"Estrai e conteggia tutte le coordinate dei villaggi visibili in mappa",
         coex:"Estrai le coordinate dai villaggi selezionati e usale o modificale attraverso una varietà di funzioni",
         copoints:"Estrai le coordinate e i punti dei villaggi dalla mappa visibile in base al loro tipo (Barbari o villaggi conquistati)",
         religion:"Mostra l'area di influenza della chiesa sulla mappa visibile, in base ad ogni tipo di chiesa e livello",
         resize:"Ridimensiona la mappa e la minimappa",
         typepo:"Definisci il tipo e i punti dei villaggi da cercare",
          barbs:"Seleziona per cercare i villaggi barbari",
         players:"Seleziona per cercare i villaggi conquistati",
          mins:"Punti minimi",
         maxs:"Punti massimi",
         order:"Ordina Verticalmente/Orizzontalmente",
         barb_c:"Hai incluso i villaggi barbari nella ricerca",
         player_c:"Hai incluso i villaggi conquistati nella ricerca",
          barb_no:"Hai escluso i villaggi barbari dalla ricerca",
         player_no:"Hai escluso i villaggi conquistati dalla ricerca",
         context1:"Contect dei coordinamenti estratti",
         results:"Totale coordinate estratte",
         ex1:"Estrattore coordinate",
         ex2:"Aggiungi il bb-code [claim]",
         ex3:"Mostra conteggio",
         ex4:"Disegna tabella per il forum",
         ex5:"Mostra punti",
         expoints:"Punti",
         excoords:"Coordinate",
         no_coords:"Nessuna coordinata estratta",
         script_text:"Testo che può essere usato in FAKE/FARMING/NUKE script",
         ask:"Chiedo il permesso per prenotare i seguenti villaggi",
         gen_text:"Contesto per lista claim",
         activate:"Attiva",
         targets:"Coordinate ~ Target",
         ch_level:"Livello chiesa",
         sel_op:"Seleziona un opzione",
         av_op:"Opzioni disponibili",
         vil:"Villaggio corrente",
         ovil:"Villaggio selezionato",
         not_act:"Non attivato",
         sel_ch:"Seleziona il livello della chiesa",
         f1:"Prima chiesa",
         level:"Livello",
         res_rel:"Spunta questa opzione per cancellare ogni area di influenza dalla mappa. Se non lo fai, non potrai diminuire il livello della chiesa",
         map:"Mappa",
         info1:"Spunta per includere i punti di ogni villaggio estratto",
         info2:"Spunta per aggiungere il tag [claim] ai villaggi selezionati",
         info3:"Spunta per disegnare una tabella (bb-code) con i dati appena estratti",
         info4:"Spunta per numerare i villaggi estratti",
         info5:"Spunta per ordinare i dati estratti verticalmente. Togli la spunta per ordinarli orizzontalmente.",
    },
    buttons:{       
              lang_open:"Apri selezione lingua",
              lang_close:"Chiudi selezione lingua",
        cofinder:"Cerca Coordinate",
         coex:"Estrattore Coordinate",
         copoints:"Coordinate & Punti",
         religion:"Influenza Chiesa",
         resize:"Ridimensiona mappa",
        search:"Cerca per coordinate",
        show_area:"Mostra area",
        hide_area:"Nascondi area",
        close_cofinder:"Chiudi Cerca Coordinate",
        close_area:"Chiudi area",
        close_coex:"Chiudi Estrattore Coordinate",
        claim_text:"Crea test [claim] ",
        fake_text:"Crea testo per fake script",
         close_rel:"Chiudi Influenza Chiesa",
        apply_rel:"Applica impostazioni",
        close_resize:"Chiudi ridimensiona mappa",
        map_info:"Nota che alcune funzioni sono disponibili solo in certe circostanze. <br><br> Ad esempio l'area di influenza della chiesa, attiva soltanto nei mondi con questa impostazione.",
    },
     notes:{
         activated:"Lo script è già attivo. Cerca il menu sotto la mappa.",
            extractor1:"Lo script è già attivo. cerca la tabella dell'estrattore sotto la minimappa",
         extractor2:"Nel caso in cui tu abbia attivato lo script e chiuso la sua tabella, devi aggiornare la pagina e riattivare lo script",
         resize:"Clicca qui per ridimensionare la mappa",
         applied:"L'area di influenza della chiesa è stata applicata alla mappa",
        },
};
tsalkapone_trans.greek= { 
	 general:{ 
	 script:"Scripts Χάρτη",
         menu:"Μενού",
	 notification:"Ειδοποίηση από τον",
            selected_one:"Ενεργή γλώσσα",
            available:"Διαθέσιμες γλώσσες",
			button_list:"Πίνακας πλήκτρων και λειτουργιών",
			lang_sel:"Επιλέξτε για να αλλάξετε την επιλεγμένη γλώσσα",
			message_no:"Όχι",
		message_yes:"Ναι",
		message_1:"Το συγκεκριμένο script ενεργοποιείται από το Χάρτη.",
		message_2:"Επιθυμείτε αυτόματη ανακατεύθυνση;",
		comm:"Επικοινωνήστε ανά πάσα στιγμή για οποιαδήποτε ιδέα ή πρόταση σχετικά με τα scripts με τον",
         funcs:"Περιγραφή λειτουργιών",
         buts:"Πλήκτρα",
         cofinder:"Εξαγωγή και υπολογισμός πλήθους συντεταγμένων στο ορατό πεδίο του Χάρτη",
         coex:"Εξαγωγή συντεταγμένων από επιλεγμένα χωριά και διαμόρφωση βάση διαφόρων λειτουργιών",
         copoints:"Εξαγωγή συντεταγμένων βάση τύπου χωριού (βάρβαρα ή παικτών) και πόντων",
         religion:"Σχεδιασμός ακτίνας επιρροής εκκλησίας βάση τύπου και επιπέδου εκκλησίας",
         resize:"Διαμόρφωση μεγέθους Χάρτη και Minimap",
         typepo:"Καθορισμός κριτηρίων αναζήτησης χωριών βάση πόντων",
          barbs:"Επιλογή για αναζήτηση βάρβαρων χωριών",
         players:"Επιλογή για αναζήτηση χωριών παικτών",
          mins:"Ελάχιστοι πόντοι",
         maxs:"Μέγιστοι πόντοι",
         order:"Κάθετη/Οριζόντια διάταξη",
         barb_c:"Έχετε επιλέξει χωριά βαρβάρων για αναζήτηση",
         player_c:"Έχετε επιλέξει χωριά παικτών για αναζήτηση",
          barb_no:"Έχετε αποκλείσει χωριά βαρβάρων από την αναζήτηση",
         player_no:"Έχετε αποκλείσει χωριά παικτών από την αναζήτηση",
         context1:"Πλαίσιο εμφανιζόμενων συντεταγμένων",
         results:"Σύνολο εξαχθέντων συντεταγμένων",
         ex1:"Εξαγωγή συντεταγμένων",
         ex2:"Εμφάνιση διεκδίκησης",
         ex3:"Εμφάνιση αρίθμησης",
         ex4:"Σχεδιασμός πίνακα",
         ex5:"Εμφάνιση πόντων",
         expoints:"Πόντοι",
         excoords:"Συντεταγμένες χωριών",
         no_coords:"Δεν εξήχθη καμιά συντεταγμένη",
         script_text:"Κείμενο για χρήση σε fake/farming scripts",
         ask:"Αιτούμαι άδεια διεκδίκησης για τα εξής χωριά",
         gen_text:"Κείμενο άδειας διεκδίκησης",
         activate:"Ενεργοποίηση",
         targets:"Συντεταγμένες ~ Στόχοι",
         ch_level:"Επίπεδο Εκκλησίας",
         sel_op:"Επιλέξτε συντεταγμένες",
         av_op:"Διαθέσιμες επιλογές",
         vil:"Τρέχον χωριό",
         ovil:"Επιλεγμένο χωριό",
         not_act:"Απενεργοποιημένο",
         sel_ch:"Επιλέξτε επίπεδο εκκλησίας",
         f1:"Πρώτη Εκκλησία",
         level:"Επίπεδο",
         res_rel:"Ενεργοποιήστε τη συγκεκριμένη ρύθμιση για να αφαιρέσετε κάθε ακτίνα επιρροής από το Χάρτη. Στην αντίθετη περίπτωση δεν θα μπορείτε να μειώσετε επίπεδα εκκλησιών",
         map:"Χάρτης",
		 info1:"Επιλέξτε για εμφάνιση των πόντων κάθε επιλεγμένου χωριού",
		 info2:"Επιλέξτε για να εφαρμόσετε την ετικέτα [claim] στα επιλεγμένα χωριά",
		 info3:"Επιλέξτε για να σχεδιάσετε πίνακα με τα εξαγώμενα δεδομένα",
		 info4:"Επιλέξτε για να εφαρμόσετε αρίθμηση των εξαγωμένων συντεταγμένων",
		 info5:"Επιλέξτε για να εφαρμόσετε κάθετη διάταξη εμφάνισης των δεδομένων και αποεπιλέξτε για οριζόντια διάταξη",
	},
	buttons:{		
			  lang_open:"Άνοιγμα επιλογής γλώσσας",
              lang_close:"Κλείσιμο επιλογής γλώσσας",
        cofinder:"Εύρεση συντεταγμένων",
         coex:"Εξαγωγέας συντεταγμένων",
         copoints:"Συντεταγμένες & Πόντοι",
         religion:"Επιρροή Εκκλησίας",
         resize:"Μέγεθος Χάρτη",
        search:"Αναζήτηση χωριών",
        show_area:"Εμφάνιση πλαισίου",
        hide_area:"Απόκρυψη πλαισίου",
        close_cofinder:"Κλείσιμο Αναζήτησης Συντεταγμένων",
        close_area:"Κλείσιμο πλαισίου",
        close_coex:"Κλείσιμο εξαγωγέα συντεταγμένων",
        claim_text:"Δημιουργία κειμένου διεκδίκησης",
        fake_text:"Διαμόρφωση για script",
         close_rel:"Κλείσιμο Επιρροής Εκκλησίας",
        apply_rel:"Εφαρμογή Ρυθμίσεων",
        close_resize:"Κλείσιμο Μεγέθους Χάρτη",
        map_info:"Υπόψιν ότι μερικές λειτουργίες ενεργοποιούνται υπό συγκεκριμένες συνθήκες. <br><br> Για παράδειγμα το Μέγεθος Χάρτη λειτουργεί μόνο με ανενεργό λογαριασμό Premium και η Επιρροή Εκκλησίας μόνο σε κόσμους με εκκλησίες",
	},
     notes:{
		 activated:"Το script έχει ήδη ενεργοποιηθεί. Αναζητήστε το μενού κάτω από το κεντρικό Χάρτη.",
            extractor1:"Το script έχει ενεργοποιηθεί. Αναζητήστε το πλαίσιο εξαγωγής συντεταγμένων δεξιά στην οθόνη σας, κάτω από το minimap",
         extractor2:"Σε περίπτωση που έχετε ήδη ενεργοποιήσει το script και επιλέξατε κλείσιμο της λειτουργίας του, εκτελέστε ανανέωση σελίδας για επανεργοποίηση της",
         resize:"Επιλέξτε το επιθυμητό Μέγεθος Χάρτη",
         applied:"Η ακτίνα επιρροής εφαρμόστηκε στο Χάρτη",
        },
};
    return tsalkapone_trans[lang];
    }());

      var Tsalmap = location.href.indexOf('screen=map') > -1;
        
        if (Tsalmap) {
var tsaldiamorfwsi='<link rel="stylesheet" type="text/css" href="https://dl.dropboxusercontent.com/s/r3ov8brxa6oxoal/Tsalkapone.Advanced_Coords_Extractor.css" />';
 var tsalbody='<script type="text/javascript" charset="utf-8">';
tsalbody+='function active_check (x) {var x_id = document.getElementById(x).checked; var x_class = document.getElementsByClassName(x); if (x_id ===true) { x_class[0].innerHTML="<img src=\'https://dl.dropboxusercontent.com/s/yqalwl4vennvrr0/approved.png\' height=\'30px;\'width=\'30px;\'>"; } else { x_class[0].innerHTML="<img src=\'https://dl.dropboxusercontent.com/s/rlsg4uoh4aiol05/fileclose.png\' height=\'30px;\'width=\'30px;\'>"; }}';
tsalbody+='function ch_check (x) { var x_class = document.getElementsByClassName(x); var text = $("#"+x+" option:selected").html(); var text1=text.replace(/[^0-9]/gi, "");  if (text == "First Church" || text == "Πρώτη Εκκλησία") {x_class[0].innerHTML = "<img src=\'/graphic/big_buildings/church_f1.png\' height=\'50px;\' width=\'50px;\'>";} else {x_class[0].innerHTML = "<img src=\'/graphic/big_buildings/church"+text1+".png\' height=\'50px;\' width=\'50px;\'>";}}';
tsalbody+='function sel_check (x) {var x_id = document.getElementById(x).value; var x_class = document.getElementsByClassName(x); var text = $("#"+x+" option:selected").html(); if (document.getElementById(x).value == 2)';
tsalbody+=' {var x1= parseInt(document.getElementById("mapx").value,10); var y1=parseInt(document.getElementById("mapy").value,10); x_class[0].innerHTML = "<input type=\'text\' value=\'"+x1+"\' id=\'x_"+x+"\' size=\'1\' readonly>&nbsp;<input type=\'text\' value=\'"+y1+"\' id=\'y_"+x+"\' size=\'1\' readonly>";}';
tsalbody+='else if (document.getElementById(x).value == 0)';
tsalbody+=' {x_class[0].innerHTML = "<font color=\'maroon\'><b>---</font></b>";}';
tsalbody+='else {x_class[0].innerHTML ="<input type=\'text\' value=\'\' id=\'x_"+x+"\' size=\'1\' maxlength=\'3\'>&nbsp;<input type=\'text\' value=\'\' id=\'y_"+x+"\' size=\'1\'  maxlength=\'3\'>";}}';
    tsalbody+='</script>';
tsalbody+='<style>';
    tsalbody+="input[type='number'] {width:50px;} .tsalbutton:hover {color:yellow;}";
tsalbody+="span.tsaltooltip span.tsalinfo1 {display:none;} span.tsaltooltip:hover span.tsalinfo1 {z-index:999;display:block;position: absolute;margin-bottom:-60px;margin-left: +100px;padding: 10px; text-align: justify;width:250px;height:auto; color: darkgreen; border: 2px dashed #804000; background-color: #F0D49A;text-transform: none;font-size: 9pt;font-weight: bold;}";
tsalbody+="span.tsaltooltip span.tsalinfo2 {display:none;} span.tsaltooltip:hover span.tsalinfo2 {z-index:999;display:block;position: absolute;margin-bottom:-60px;margin-left: +10px;padding: 10px; text-align: justify;width:250px;height:auto; color: darkgreen; border: 2px dashed #804000; background-color: #F0D49A;text-transform: none;font-size: 9pt;font-weight: bold;}";
tsalbody+='</style>';

$("head").append(tsaldiamorfwsi+tsalbody);
            var lang_img='';
        if (lang=="greek") {lang_img ='<img title="Ελληνικά" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif">';}
        else if (lang=="english") {lang_img ='<img height="20px" style="cursor:help;" title="English/American" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif">';}
        else if (lang=="italian") {lang_img ='<img height="20px" style="cursor:help;" title="Italian" width="30px" src="https://dl.dropboxusercontent.com/s/ho5ks4i0z7u5bpn/flag_italiano.gif">';}
        
     var resTable = $("#map_legend");
    

				        var  menu='<br><br><br><span id=Tsalkeno3></span><span id=Tsalkeno4></span><span id=Tsalkeno5></span><br><br><span id=Tsalkeno></span><br><span id=Tsalsyngen></span><br><br><div id="tsalkaponemagicscripttable" style="width:100%;" class="target-select clearfix vis float_left"><h4 height="20px;"><span class="tsaltooltip"><center><img src="/graphic/questionmark.png" style="height:15px; width:15px; cursor:help;"><span class="tsalinfo2" >'+tsalkapone_trans.buttons.map_info+'</span></span>';
menu+='&emsp;<font size="4" color=darkgreen>Tsalkapone. '+tsalkapone_trans.general.button_list+'</font></center></h4>';

menu += "<table class='vis' width='100%'><tbody><tr><th><font color=blue>"+tsalkapone_trans.general.funcs+"</font></th><th><font color=blue>"+tsalkapone_trans.general.buts+"</font></th></tr>";
menu += "<tr><td><font color='maroon'><b>"+tsalkapone_trans.general.cofinder+"</b></font></td><td><input type='button' class='btn tsalbutton' style='cursor: pointer' align=right id=Tsalsyn  value='"+tsalkapone_trans.buttons.cofinder+"'></td></tr>";
menu += "<tr><td><font color='maroon'><b>"+tsalkapone_trans.general.coex+"</b></font></td><td><input type='button' class='btn tsalbutton' style='cursor: pointer' align=right id=Tsalextractor value='"+tsalkapone_trans.buttons.coex+"'></td></tr>";
menu += "<tr><td><font color='maroon'><b>"+tsalkapone_trans.general.copoints+"</b></font></td><td><input type='button' class='btn tsalbutton' style='cursor: pointer' align=right id=Tsalxwria value='"+tsalkapone_trans.buttons.copoints+"'></td></tr>";
if (document.getElementById('belief_radius')) {
            menu += "<tr><td><font color='maroon'><b>"+tsalkapone_trans.general.religion+"</b></font></td><td><input type='button' class='btn tsalbutton' style='cursor: pointer' align=right id=Tsalaktinaepirrois value='"+tsalkapone_trans.buttons.religion+"'></td></tr>";
    }
            if (premium == true) {
menu += "<tr><td><font color='maroon'><b>"+tsalkapone_trans.general.resize+"</b></font></td><td><input type='button' class='btn tsalbutton' style='cursor: pointer' align=right id=Tsal_resize value='"+tsalkapone_trans.buttons.resize+"'></td></tr>";
            }
menu+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.lang_sel+'</b></font></td>';
menu+='<td><font style="font-family: \'Arial Black\', Gadget, sans-serif;"><span id="openfilter1"><input type="button" value="'+tsalkapone_trans.buttons.lang_open+'" id="openfilterbut1" class="btn tsalbutton"></span><span id="closefilter1" style="display:none">';
menu+='<input class="btn tsalbutton" type="button" value="'+tsalkapone_trans.buttons.lang_close+'" id="closefilterbut1"></span></td></tr>';
menu+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.selected_one+'</b></font></td>';
menu+='<td><span id="selectedone"><center>'+lang_img+'</center></span><span id="columnfilter1" style="display:none" class="vis"><font size="2">';
menu+='<br><br><center><font color="blue"><b><u>'+tsalkapone_trans.general.available+'</u></b></font></center>';
menu+='<input type="radio"  name="language" value="greek" id="greek_lang" ><img title="Greek \n\nBy Tsalkapone" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif"><br>';
menu+='<input type="radio"  name="language" value="english" id="english_lang" checked><img height="20px" style="cursor:help;" title="English/American \n\nBy Tsalkapone" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif"><br>';
menu+='<input type="radio"  name="language" value="italian" id="italian_lang" checked><img height="20px" style="cursor:help;" title="Italian \n\nBy sndb & im lovin it" width="30px" src="https://dl.dropboxusercontent.com/s/ho5ks4i0z7u5bpn/flag_italiano.gif"><br>';
menu+='</span></td></tr>';
menu+="</tbody></table></div>";
if (!document.getElementById('Tsalkeno3')) {
resTable.after(menu);
		/*==== register ====*/
var script = {
	scriptname: 'Map Scripts',
	version: '1.0',
	author: 'Tsalkapone',
	email: 'tsalkapone@hotmail.com',
	broken: false
};
$.post(ScriptAPI.url,script);

}
		else   {UI.SuccessMessage('<font color=gold><b><center>'+tsalkapone_trans.general.notification+' Tsalkapone</center></b></font> <br><br> '+tsalkapone_trans.notes.activated+'', 5000);}
                        if (get_lang == "greek") {document.getElementById('greek_lang').checked = true;}
      else  if (get_lang == "english") {document.getElementById('english_lang').checked = true; }
	  else  if (get_lang == "italian") {document.getElementById('italian_lang').checked = true; }
        
		$("#english_lang").click(function(){
	localStorage.setItem("map_scripts_lang","english");     
location.reload();
    });
	$("#italian_lang").click(function(){
	localStorage.setItem("map_scripts_lang","italian");     
location.reload();
    });
      $("#greek_lang").click(function(){
	localStorage.setItem("map_scripts_lang","greek");
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
    
                        
                         $("#Tsalxwria").click(function () {
                            
                               var resTable1 = $("#map_legend");
var menu1 = "<table class='vis' width='100%'>";
menu1+= "<tr><th><font color='darkgreen'><b>"+tsalkapone_trans.general.typepo+"</b></font></th></tr>";
menu1+= "<tr><td><img src='https://dsgr.innogamescdn.com/8.39.2/27644/graphic//map/version2/v3_left.png'>&nbsp;<input type='checkbox' style='cursor: pointer' align=right id=Tsalbarb>";
menu1+='&nbsp;<span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.barbs+'</span></span>';
menu1+="&emsp;<b>"+tsalkapone_trans.general.mins+":</b><input type='number' min='0' size='3' maxlength='5' value='0' id=barbmin >&emsp;<b>"+tsalkapone_trans.general.maxs+":</b><input type='number' min='0'  maxlength='5' value='2500' id=barbmax >&emsp;<span id='tsalepilogixwriwn1'><font color='darkmagenta'><b>"+tsalkapone_trans.general.barb_no+"</b></font></span>";
menu1+= "<br><img src='https://dsgr.innogamescdn.com/8.39.2/27644/graphic//map/version2/v4.png'>&nbsp;<input type='checkbox' style='cursor: pointer' align=right id=Tsalplayers >";
menu1+='&nbsp;<span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.players+'</span></span>';
menu1+="&emsp;<b>"+tsalkapone_trans.general.mins+":</b><input type='number' min='0' size='3' maxlength='5' value='0' id=playermin >&emsp;<b>"+tsalkapone_trans.general.maxs+":</b><input type='number' min='0' size='3' maxlength='5' value='1' id=playermax >&emsp;<span id='tsalepilogixwriwn2'><font color='darkmagenta'><b>"+tsalkapone_trans.general.player_no+"</b></font></span></td></tr>";
menu1+= "<br><br><br><input type='button' class='btn' style='cursor: pointer' align=right id=Tsalxwria1 value='"+tsalkapone_trans.buttons.search+"'>";
menu1+= "&emsp;&emsp;<input type='checkbox' style='cursor: pointer' align=right id=tsaldiaxw >&emsp;<b>"+tsalkapone_trans.general.order+"</b>";
menu1+= "<span id=Tsalkeno2></span>";
menu1+= "<br><span id=Tsalsyngen2></span>";
                        
				        document.getElementById("Tsalkeno3").innerHTML=menu1;
                             document.getElementById("Tsalkeno4").innerHTML="<input type='button' class='btn' style='cursor: pointer' align=right id=Tsalsynclose3  value='"+tsalkapone_trans.buttons.close_cofinder+"'>";  
                      
                                  $("#Tsalsynclose3").click(function Tsalxwriaentoli() {
     document.getElementById("Tsalkeno4").innerHTML= "";   
        document.getElementById("Tsalkeno3").innerHTML="";
                                     
       });       
                               $("#Tsalbarb").click(function () {
                                 var Tsalbarb = document.getElementById('Tsalbarb').checked;
  if (Tsalbarb === true) {  document.getElementById("tsalepilogixwriwn1").innerHTML = "<font color='darkmagenta'><b>"+tsalkapone_trans.general.barb_c+"</b></font>";  }  else { document.getElementById("tsalepilogixwriwn1").innerHTML = "<font color='darkmagenta'><b>"+tsalkapone_trans.general.barb_no+"</b></font>";  }
                                  });
                                  $("#Tsalplayers").click(function () {
                                      var Tsalplayers =  document.getElementById('Tsalplayers').checked;
     if (Tsalplayers === true){document.getElementById("tsalepilogixwriwn2").innerHTML = "<font color='darkmagenta'><b>"+tsalkapone_trans.general.player_c+"</b></font>"; } else {document.getElementById("tsalepilogixwriwn2").innerHTML = "<font color='darkmagenta'><b>"+tsalkapone_trans.general.player_no+"</b></font>"; } 
                                       });

                             
                             $("#Tsalxwria1").click(function () {
                                 var Tsalbarbmin = document.getElementById('barbmin').value;
                                 var Tsalbarbmax = document.getElementById('barbmax').value;
                                 var Tsalplayermin = document.getElementById('playermin').value;
                                 var Tsalplayermax = document.getElementById('playermax').value;
                                 var tsaldiax = document.getElementById('tsaldiaxw').checked;
                                 document.getElementById("Tsalsyngen2").innerHTML="<input type='button' class='btn' style='cursor: pointer' align=right id=Tsalsynclose2 value='"+tsalkapone_trans.buttons.close_area+"'>";  
                      
                                
                                  $("#Tsalsynclose2").click(function () {
     document.getElementById("Tsalkeno2").innerHTML= "";   
        document.getElementById("Tsalsyngen2").innerHTML="";
       });        if (Tsalbarb.checked === true) {
                                 var  Tsalkapone_πόντοι_βάρβαρων_χωριών={min:Tsalbarbmin,max:Tsalbarbmax}; 
                                  }
                                    
                                 else {var  Tsalkapone_πόντοι_βάρβαρων_χωριών={min:0,max:1};}

                                 if (Tsalplayers.checked === true) {
                                 var  Tsalkapone_πόντοι_χωριών_παικτών={min:Tsalplayermin,max:Tsalplayermax};  
                                 }
                                 else {var  Tsalkapone_πόντοι_χωριών_παικτών={min:0,max:1};}
                               var  editor="Tsalkapone";    
                             var  minVer="7.0";   
                             var  win=(window.frames.length>0)?window.main:window;   
                             var  ver=win.game_data.version.match(/[\d|\.]+/g);   
                             if(!ver||(parseFloat(ver[1])<minVer)){      alert("Tsalkapone. Αναζήτηση χωριών στο χάρτη βάση πόντων. \n\n Το συγκεκριμένο script απαιτεί v"+minVer+" ή μεγαλύτερη.\nΗ τρέχουσα έκδοση είναι v"+ver[1]);    }   
                             else{      if(win.game_data.screen=="map"){       
                                 var  coords=[];           
                                 var  col,row,coord,village,player,points;        
                                 for(row=0;row<TWMap.size[1];row++){  for(col=0;col<TWMap.size[0];col++){ coord=TWMap.map.coordByPixel( TWMap.map.pos[0]+(TWMap.tileSize[0]*col), TWMap.map.pos[1]+(TWMap.tileSize[1]*row));                   
                if(coord){village=TWMap.villages[coord.join("")]; if(village){player=null;  if(parseInt(village.owner|"0",10)){player=TWMap.players[village.owner];  }  
                           points=parseInt(village.points.replace(".",""),10); 
 if(player){ if(player.name!=win.game_data.player.name){if((!Tsalkapone_πόντοι_χωριών_παικτών.min||(points>=Tsalkapone_πόντοι_χωριών_παικτών.min))&&(!Tsalkapone_πόντοι_χωριών_παικτών.max||(points<=Tsalkapone_πόντοι_χωριών_παικτών.max))){coords.push(coord.join("|"));}}}               
                                                                              else{                  if((!Tsalkapone_πόντοι_βάρβαρων_χωριών.min||(points>=Tsalkapone_πόντοι_βάρβαρων_χωριών.min))&&(!Tsalkapone_πόντοι_βάρβαρων_χωριών.max||(points<=Tsalkapone_πόντοι_βάρβαρων_χωριών.max))){coords.push(coord.join("|"));  }  }}}}}           
                                document.getElementById("Tsalkeno2").innerHTML= "<table class='vis' width='100%'><tr><th><font color='darkgreen'><b>"+tsalkapone_trans.general.context1+" <br><font color=blue>"+tsalkapone_trans.general.results+":</font> <font color=maroon>"+coords.length+"</font></b></font></th></tr><tr><td><textarea rows=\"5\" style=\"width:95%;\" >"+(coords.join(tsaldiax?"\n":" "))+"</textarea></td></tr></table>";  }     
                                  else{ alert("Tsalkapone. Αναζήτηση χωριών στο χάρτη βάση πόντων.\n\n Το συγκεκριμένο script ενεργοποιείται από το Χάρτη.\n\n Επιλέξτε ΟΚ για να κατευθυνθείτε αυτόματα ...");        self.location=win.game_data.link_base_pure.replace(/screen\=/i,"screen=map");      }    }        void(0);
                             });  });
                        
                       
    $("#Tsalsyn").click(function () {  
                        
           document.getElementById("Tsalsyngen").innerHTML="<input type='button' class='btn' style='cursor: pointer' align=right id=Tsalsynclose value='"+tsalkapone_trans.buttons.close_area+"'>";  
    var doc=document;if(window.frames.length>0)doc=window.main.document;url=document.URL;if(url.indexOf('screen=map')==-1)alert('Tsalkapone εύρεση συντεταγμένων \n\n Το συγκεκριμένο script ενεργοποιείται από τον Χάρτη \n\n ΠΡΟΣΟΧΗ: Το συγκεκριμένο script εντοπίζει όλες τις συντεταγμένες στο πλαίσιο χάρτη στο οποίο το εφαρμόζετε. \n Ρυθμίστε την αναλογία του χάρτη κατά βούληση'); else  {var coords = [];
var col, row, coord, village;
for (row = 0; row < TWMap.size[1]; row++) {
for (col = 0; col < TWMap.size[0]; col++) {
coord = TWMap.map.coordByPixel(TWMap.map.pos[0] + (TWMap.tileSize[0] * col), TWMap.map.pos[1] + (TWMap.tileSize[1] * row));
if (coord) {
village = TWMap.villages[coord.join("")];
if (village) {
coords.push(coord.join("|"));}
}
}
}
document.getElementById("Tsalkeno").innerHTML= "<table class='vis' width='100%'><tr><th><font color='darkgreen'><b>"+tsalkapone_trans.general.context1+" <br><font color=blue>"+tsalkapone_trans.general.results+":</font> <font color=maroon>"+coords.length+"</font></b></font></th></tr><tr><td><textarea id=\"periexomeno\" rows=\"5\" style=\"width:95%;\" >"+(coords.join(" "))+"</textarea></td></tr></table>";}
    $("#Tsalsynclose").click(function () {
     document.getElementById("Tsalkeno").innerHTML= "";   
        document.getElementById("Tsalsyngen").innerHTML="";
       });                        
                    });
                        
                    
    
       $("#Tsalextractor").click(function () {             
     
win = window;
// === ScriptAPI lib ===
ScriptAPI.lib = {
    launchOnScreen: function (screen, onError, noConflict) {
        if (game_data.screen != screen) {
        	if (onError == null) return false;
            if (onError.substring(0, 1) == "/") window.location.href = onError;
            	else UI.ErrorMessage(onError, 5000);
            return false;
        }
        if (ScriptAPI.preventLaunch === true)  {
            UI.ErrorMessage('<b><font color=yellow>Tsalkapone. '+tsalkapone_trans.buttons.coex+'</b></font> <br></br> '+tsalkapone_trans.notes.extractor1+'.<br><br> '+tsalkapone_trans.notes.extractor2+'.', 15000);
            return false;
    	}
        win.DSSelectVillages.enableScript();
        ScriptAPI.preventLaunch = (noConflict !== false) ? true : false;
       	return true; 
    }
}
win.DSSelectVillages =
    {
        currentLang: 'gr',
        
        showWithCoords: true,
       
        showWithPoints: true,
        showWithPontous: true,
        
        showWithCounter: true,
        
        showWithNewLine: true,
        
        breakAfter: -1,
        
        enabled: false,
        
        villages: [],
        
        villagesId: [],
      
        villagesPoints: [],
        
        lang: {
            de: {
                UI: {
                    selectedVillages: "Ausgewählte Dörfer:",
                    enableShowWithCoords: "Mit BBCodes anzeigen",
                    enableShowWithCounter: "Mit Zähler anzeigen"
                }
            },
            fr: {
                UI: {
                    selectedVillages: "Selectionner des Villages",
                    enableShowWithCoords: "BBcodes",
                    enableShowWithCounter: "Liste",
                    enableShowWithNewLine: "Nouvelle ligne"
                }
            },
 gr: {
                UI: {
                    selectedVillages: ""+tsalkapone_trans.general.ex1+"",
                    enableShowWithCoords: ""+tsalkapone_trans.general.ex2+"",
                    enableShowWithCounter: ""+tsalkapone_trans.general.ex3+"",
                    enableShowWithPoints: ""+tsalkapone_trans.general.ex4+"",
                    enableShowWithNewLine: ""+tsalkapone_trans.general.order+"",
                    enableShowWithPontous: ""+tsalkapone_trans.general.ex5+""
                }
            }
        },
        
        enableScript: function () {
            this.enabled = true;
            this.enableShowWithPoints = win.enableShowWithPoints;
            this.enableShowWithPontous = win.enableShowWithPontous;
            this.showWithCoords = win.showWithCoords;
            this.showWithCounter = win.showWithCounter;
            this.breakAfter = win.breakAfter;
            win.TWMap.mapHandler.integratedSpawnSector = win.TWMap.mapHandler.spawnSector;
            win.TWMap.mapHandler.spawnSector = this.spawnSector;
            
            this.oldClickFunction = win.TWMap.mapHandler.onClick;
            win.TWMap.mapHandler.onClick = this.clickFunction;
            win.TWMap.reload();
            
            this.showUi();
        },
        
        spawnSector: function (data, sector) {
            win.TWMap.mapHandler.integratedSpawnSector(data, sector);
            for (var i = 0; i < win.DSSelectVillages.villagesId.length; i++) {
                var villageId = win.DSSelectVillages.villagesId[i];
                if(villageId === null){
                    continue;
                }
                 
                var v = $('#map_village_' + villageId);
                $('<div class="DSSelectVillagesOverlay" id="DSSelectVillages_overlay_' + villageId + '" style="width:52px; height:37px; position: absolute; z-index: 50; left:' + $(v).css('left') + '; top: ' + $(v).css('top') + ';"></div>').appendTo(v.parent());
                $('#DSSelectVillages_overlay_' + villageId).css('outline', 'rgba(51, 255, 0, 0.7) solid 2px').css('background-color', 'rgba(155, 252, 10, 0.14)');
            }
        },
        
        markVillageAsSelected: function (id) {
            $('#DSSelectVillages_overlay_' + id).css('outline', 'rgba(51, 255, 0, 0.7) solid 2px').css('background-color', 'rgba(155, 252, 10, 0.14)');
        },
        demarkVillageAsSelected: function (id) {
            $('#DSSelectVillages_overlay_' + id).css('outline', '').css('background-color', '');
        },
        
        disableScript: function () {
            this.enabled = false;
            this.villages = [];
            this.villagesId = [];
            this.villagesPoints = [];
            win.TWMap.mapHandler.onClick = this.oldClickFunction;
            win.TWMap.mapHandler.spawnSector = win.TWMap.mapHandler.integratedSpawnSector;
            win.TWMap.reload();
            $('#bb_main_div').remove();
            
        },
        
        showUi: function () {
            
            $('#map_config').prepend('<span id="Tsalpinakaseksagwgis"><table id="bb_main_div" class="vis" style="border-spacing:0px;border-collapse:collapse;margin-top:15px;" width="100%"><tbody>'
									+'<tr><th colspan="3" ><font color="darkgreen"><b>' + this.lang[this.currentLang].UI.selectedVillages + '</b></font></th></tr>'
									+'<tr>'
                                    +'	<td>'
                                    +'		<input type="checkbox" id="tsalpontoi">'
                                    +'	</td>'
                                    +'	<td>'
									+'		<label for="tsalpontoi"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.info1+'</span></span>&nbsp;' + this.lang[this.currentLang].UI.enableShowWithPontous + '</label>'
									+'	</td>'
                                    +'</tr>'
                                     +'<tr>'
                                    +'	<td>'  
                                    +'		<input type="checkbox" id="bbcode">'
                                    +'	</td>'
                                    +'	<td>'
									+'		<label for="warplanner_enabled"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.info2+'</span></span>&nbsp;' + this.lang[this.currentLang].UI.enableShowWithCoords + '</label>'
									+'	</td>'
                                    +'</tr>'
                                    +'<tr>'
                                    +'	<td>'
                                    +'		<input type="checkbox" id="tsalpoints" >'
                                    +'	</td>'
                                    +'	<td>'
									+'		<label for="warplanner_enabled"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.info3+'</span></span>&nbsp;' + this.lang[this.currentLang].UI.enableShowWithPoints + '</label>'
									+'	</td>'
                                    +'</tr>'
                                    +'<tr>'
                                    +'	<td>'
                                    +'		<input type="checkbox" id="zaehlen">'
                                    +'	</td>'
                                    +'	<td>'
									+'		<label for="warplanner_enabled"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.info4+'</span></span>&nbsp;' + this.lang[this.currentLang].UI.enableShowWithCounter + '</label>'
									+'	</td>'
                                    +'</tr>'
                                    +'<tr>'
                                    +'	<td>'
                                    +'		<input type="checkbox" id="new-line" >'
                                    +'	</td>'
                                    +'	<td>'
									+'		<label for="new-line"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.info5+'</span></span>&nbsp;' + this.lang[this.currentLang].UI.enableShowWithNewLine + '</label>'
									+'	</td>'
                                    +'</tr>'
                                    +'<tr><td></td>'
                                    +'	<td>'
                                     +'		<hr><span id="Tsaleksagwgi"><b><font color=darkgreen><u>'+tsalkapone_trans.general.context1+'</u></font></b>'
                                     +'<br><textarea id="output" rows="5" style="width:95%;" ></textarea><br><u><font color=maroon><i>'+tsalkapone_trans.general.results+': <i></font></u><b><font color=blue><span id=synsun></span></b></font></span>'
                                     +'<br><span id="tsalemfanisi"></span><span id="tsalapokripsi" style="display:"><input type="button" id="Tsalclose5" class="btn" value="'+tsalkapone_trans.buttons.hide_area+'"></span><br><input type="button" id="Tsalclose4" class="btn" value="'+tsalkapone_trans.buttons.close_coex+'">'
                                    +'<br><input type="button" id="Tsalforum" class="btn" value="'+tsalkapone_trans.buttons.claim_text+'">'
                                     +'<br><input type="button" id="Tsaltoscript" class="btn" value="'+tsalkapone_trans.buttons.fake_text+'">'
                                     +'		<span id="Tsaleksagwgi2"></span>'
                                     +'		<span id="Tsaleksagwgi3"></span>'
                                     +'	</td>'
                                    +'</tr>'
                                    +'</tbody></table>'
                                     +'</span>');
          var tsal_villas=    setInterval(function(){
             
              var villas= document.getElementById("output").value;
                   if (villas != ""){
                        var χωριά = villas.match(/\d+\|\d+/g);
                 if ( χωριά.length>0) {
             document.getElementById('synsun').innerHTML = χωριά.length;
                 }}
                   }, 100);
            
             
            
            
            
          $("#Tsaltoscript").click(function () {
              var tsalcheck1 = document.getElementById('tsalpontoi').checked;
                      var tsalcheck2 = document.getElementById('bbcode').checked;
                      var tsalcheck3 = document.getElementById('tsalpoints').checked;
                      var tsalcheck4 = document.getElementById('zaehlen').checked;
               
              if (tsalcheck1 != false) {  $('#tsalpontoi').click();}
                      if (tsalcheck2 != false) {  $('#bbcode').click();}
                      if (tsalcheck3 != false) {  $('#tsalpoints').click();}
                      if (tsalcheck4 != false) {  $('#zaehlen').click();}
                    
              var tsalarea="";
   if (document.getElementById("output").value !== undefined) { var tsalarea = document.getElementById("output").value;}
             else { tsalarea=""+tsalkapone_trans.general.no_coords+"";}
              var tsalarea1 = tsalarea.replace(/\n/g,'');
               var tsalarea2 = tsalarea1.replace(/  /g,' ');
                  var tsalforumenu ="";
                     tsalforumenu+= '<hr><b><font color=darkgreen><u>'+tsalkapone_trans.general.script_text+'</u></font></b><br><textarea id="tsalforump1" rows="5" style="width:95%;" >'+tsalarea2+'</textarea>';   
        tsalforumenu+='<br><input type="button" id="tsalforumclose1" class="btn" value="'+tsalkapone_trans.buttons.close_area+'">';
                                     
     document.getElementById("Tsaleksagwgi3").innerHTML= tsalforumenu;
                   $("#tsalforumclose1").click(function () {
                       document.getElementById("Tsaleksagwgi3").innerHTML="";});
                  
                });      
            
            
              $("#Tsalforum").click(function () {
                  var tsalarea = document.getElementById("output").value;
                  var tsalforumenu ="";
                     tsalforumenu+= '<hr><b><font color=darkgreen><u>'+tsalkapone_trans.general.gen_text+'</u></font></b><br><textarea id="tsalforump" rows="5" style="width:95%;" >[b][color=red]'+tsalkapone_trans.general.ask+':[/color][/b]\n\n'+tsalarea+'</textarea>';   
        tsalforumenu+='<br><input type="button" id="tsalforumclose" class="btn"  value="'+tsalkapone_trans.buttons.close_area+'">';
                                     
     document.getElementById("Tsaleksagwgi2").innerHTML= tsalforumenu;
                   $("#tsalforumclose").click(function () {
                       document.getElementById("Tsaleksagwgi2").innerHTML="";});
                  
       });       
            
            
            
            
            $("#Tsalclose4").click(function () {
     document.getElementById("Tsalpinakaseksagwgis").innerHTML= "";
                clearInterval(tsal_villas); 
        
       });       
            
             $("#Tsalclose5").click(function () {
                 var tsalapokripsi = document.getElementById("tsalapokripsi").style;
              tsalapokripsi.display="none";   
     document.getElementById("Tsaleksagwgi").innerHTML= ""; 
                 document.getElementById("tsalemfanisi").innerHTML='<input type="button" id="Tsalclose6" class="btn" value="'+tsalkapone_trans.buttons.show_area+'">';
         $("#Tsalclose6").click(function () {
          document.getElementById("Tsaleksagwgi").innerHTML= '<b><font color=darkgreen><u>'+tsalkapone_trans.general.context1+'</u></font></b><br><textarea id="output" rows="5" style="width:95%;" ></textarea><br><u><font color=maroon><i>'+tsalkapone_trans.general.results+': <i></font></u><b><font color=blue><span id=synsun></span></b></font></span>'; 
                 document.getElementById("tsalemfanisi").innerHTML="";
             tsalapokripsi.display="";
         });
       });        
            var chkbxBBcode = $('#bbcode');
            var chkbxcounter = $('#zaehlen');
            var chkbxShowWithNewLine = $('#new-line');
            var chkbxtsalpoints = $('#tsalpoints');
            var chkbxtsalpontoi = $('#tsalpontoi');
            chkbxtsalpoints.prop('checked', this.showWithPoints);
            chkbxBBcode.prop('checked', this.showWithCoords);
            chkbxcounter.prop('checked', this.showWithCounter);
            chkbxShowWithNewLine.prop('checked', this.showWithNewLine);
            chkbxtsalpontoi.prop('checked', this.showWithPontous);
             chkbxtsalpontoi.change(function () {
                win.DSSelectVillages.showWithPontous = this.checked;
                win.DSSelectVillages.outputCoords();
            });
            chkbxtsalpoints.change(function () {
                win.DSSelectVillages.showWithPoints = this.checked;
                win.DSSelectVillages.outputCoords();
            });
            chkbxBBcode.change(function () {
                win.DSSelectVillages.showWithCoords = this.checked;
                win.DSSelectVillages.outputCoords();
            });
            chkbxcounter.change(function () {
                win.DSSelectVillages.showWithCounter = this.checked;
                win.DSSelectVillages.outputCoords();
            });
            chkbxShowWithNewLine.change(function () {
            	win.DSSelectVillages.showWithNewLine = this.checked;
                win.DSSelectVillages.outputCoords();
            });
        },
        
        outputCoords: function () {
            var coordsOutput = "";
           
            for (var i = 0; i < this.villages.length; i++) {
                if (this.villages[i] === null) {
                    continue;
                }
                
                
                var realCount = 0;
                for (var j = 0; j <= i; j++) {
                    if (this.villages[j] != null) {
                        realCount++;
                    }
                }
     
                
                 var tsalOutput = "";
            var tsalOutput1 = "";
                var tsalname=$("#info_owner_row")
                tsalOutput += (this.showWithPoints ? (this.showWithCounter ? "[table][**][color=maroon][b]Α/Α[/b][/color][||][b][color=#0000ff]"+tsalkapone_trans.general.excoords+"[/color][/b]"+(this.showWithPontous? "[||][b][color=darkgreen]"+tsalkapone_trans.general.expoints+"[/color][/b][/**]":"[/**]"): "[table][**][b][color=#0000ff]"+tsalkapone_trans.general.excoords+"[/color][/b]"+(this.showWithPontous? "[||][b][color=darkgreen]"+tsalkapone_trans.general.expoints+"[/color][/b][/**]":"[/**]")) :"")+"\n";
                tsalOutput1 += (this.showWithPoints ? " [/table]" : "");
                coordsOutput +=   (this.showWithPoints ? "[*] " : "") + (this.showWithCounter ? (this.showWithPoints ? "[b][color=red]"+ realCount +"[/color][/b][|] " : "[b][color=red]"+ realCount +".[/color][/b] ")  : "" ) + (this.showWithCoords ? "[claim]" : "") + this.villages[i] + (this.showWithCoords ? "[/claim] " : " ")  + (this.showWithPontous ? "[|][b][color=darkmagenta]"+ this.villagesPoints[i] +"[/color][/b]" :" ") + (this.showWithNewLine ? "\n" : " ") ;
           //     coordsOutput += "[url=https://gr34.fyletikesmaxes.gr/game.php?village=3573&screen=info_player&id="+this.villages[i]+"]Ιδιοκτήτης[/url]";
                if (this.breakAfter != -1 && realCount % this.breakAfter == 0) {
                    coordsOutput += "\n ";
                }
            }
            $('#output').html(tsalOutput  + coordsOutput + tsalOutput1);
            $("#output").select();
    
        },
        
        handleVillage: function (x, y) {
            var coord = x + "|" + y;
            var index = this.villages.indexOf(coord);
            var village = win.TWMap.villages[(x) * 1000 + y];
           
            

            
            if (!village) {
                return;
            }
            if (index === -1) {
                this.villages.push(coord);
                this.villagesId.push(village.id);
                this.villagesPoints.push(village.points);
                this.markVillageAsSelected(village.id);
                win.TWMap.reload();
            } else {
                this.villages[index] = null;
                this.villagesPoints[index] = null;
                var indexId = this.villagesId.indexOf(village.id);
                this.villagesId[indexId] = null;
                this.demarkVillageAsSelected(village.id);
            }
            this.outputCoords();
        },
    
    
            
        
        clickFunction: function (x, y, event) {
            win.DSSelectVillages.handleVillage(x, y);
            return false; //Signal that the TWMap should not follow the URL associated to this click event
        },
        
        oldClickFunction: null
    };
ScriptAPI.lib.launchOnScreen('map', "Tsalkapone. Εξαγωγή Συντεταγμένων από το χάρτη. </br> Το συγκεκριμένο script ενεργοποιείται από το Χάρτη");    });               
                       
                        
    $("#Tsalaktinaepirrois").click(function () {  
        var belief_check = document.getElementById('belief_radius').checked;
        if (belief_check === false) {$('#belief_radius').click();}
 var resTable2 = $("#map_legend");
				        var menu2 = '<br><br><br><div class="target-select clearfix vis float_left" style="text-align:center;width: 100%">';
  menu2+='<h4><font color="darkgreen"><center>Tsalkapone. '+tsalkapone_trans.general.menu+'</center></font></h4><table class="vis" style="text-align:center; width: 100%"><tbody>'; 
menu2+="<tr><th><font style='color:maroon; font-size:bold'><center>"+tsalkapone_trans.general.activate+"</center></font></th><th><font style='color:maroon; font-size:bold'><center>"+tsalkapone_trans.general.targets+"</center></font></th><th><font style='color:maroon; font-size:bold'><center>"+tsalkapone_trans.general.ch_level+"</center></font></th></tr>";    
menu2+='<tr><td><input type="checkbox" id="check_1" onclick="active_check(this.id);">&emsp;<b><span class="check_1"><font color="red">'+tsalkapone_trans.general.not_act+'</font></span></b></td>';
menu2+='<td><font color="blue"><b>'+tsalkapone_trans.general.sel_op+': </b></font><select id="sel_1" onchange="sel_check(this.id)"><option value="0">'+tsalkapone_trans.general.av_op+'</option><option value="2">'+tsalkapone_trans.general.vil+'</option><option value="1">'+tsalkapone_trans.general.ovil+'</option></select><br><span class="sel_1"><font color="maroon"><b>'+tsalkapone_trans.general.sel_op+'</font></b></span></td>';
menu2+='<td><center><font color="blue"><b>'+tsalkapone_trans.general.sel_ch+': </b></font><select id="ch_1" onchange="ch_check(this.id)"><option value="6">'+tsalkapone_trans.general.f1+'</option><option value="4">'+tsalkapone_trans.general.level+' 1</option><option value="6">'+tsalkapone_trans.general.level+' 2</option><option value="8">'+tsalkapone_trans.general.level+' 3</option></select><center><br><br><span class="ch_1"><img src="/graphic/big_buildings/church_f1.png" height="50px;" width="50px;"></span></td></tr>';
menu2+='<tr><td><input type="checkbox" id="check_2" onclick="active_check(this.id);">&emsp;<b><span class="check_2"><font color="red">'+tsalkapone_trans.general.not_act+'</font></span></b></td>';
menu2+='<td><font color="blue"><b>'+tsalkapone_trans.general.sel_op+': </b></font><select id="sel_2" onchange="sel_check(this.id)"><option value="0">'+tsalkapone_trans.general.av_op+'</option><option value="2">'+tsalkapone_trans.general.vil+'</option><option value="1">Other village</option></select><br><span class="sel_2"><font color="maroon"><b>'+tsalkapone_trans.general.sel_op+'</font></b></span></td>';
menu2+='<td><center><font color="blue"><b>'+tsalkapone_trans.general.sel_ch+': </b></font><select id="ch_2" onchange="ch_check(this.id)"><option value="6">'+tsalkapone_trans.general.f1+'</option><option value="4">'+tsalkapone_trans.general.level+' 1</option><option value="6">'+tsalkapone_trans.general.level+' 2</option><option value="8">'+tsalkapone_trans.general.level+' 3</option></select><center><br><br><span class="ch_2"><img src="/graphic/big_buildings/church_f1.png" height="50px;" width="50px;"></span></td></tr>';
menu2+='<tr><td><input type="checkbox" id="check_3" onclick="active_check(this.id);">&emsp;<b><span class="check_3"><font color="red">'+tsalkapone_trans.general.not_act+'</font></span></b></td>';
menu2+='<td><font color="blue"><b>'+tsalkapone_trans.general.sel_op+': </b></font><select id="sel_3" onchange="sel_check(this.id)"><option value="0">'+tsalkapone_trans.general.av_op+'</option><option value="2">'+tsalkapone_trans.general.vil+'</option><option value="1">Other village</option></select><br><span class="sel_3"><font color="maroon"><b>'+tsalkapone_trans.general.sel_op+'</font></b></span></td>';
menu2+='<td><center><font color="blue"><b>'+tsalkapone_trans.general.sel_ch+': </b></font><select id="ch_3" onchange="ch_check(this.id)"><option value="6">'+tsalkapone_trans.general.f1+'</option><option value="4">'+tsalkapone_trans.general.level+' 1</option><option value="6">'+tsalkapone_trans.general.level+' 2</option><option value="8">'+tsalkapone_trans.general.level+' 3</option></select><center><br><br><span class="ch_3"><img src="/graphic/big_buildings/church_f1.png" height="50px;" width="50px;"></span></td></tr>';
menu2+='<tr><td><input type="checkbox" id="check_4" onclick="active_check(this.id);">&emsp;<b><span class="check_4"><font color="red">'+tsalkapone_trans.general.not_act+'</font></span></b></td>';
menu2+='<td><font color="blue"><b>'+tsalkapone_trans.general.sel_op+': </b></font><select id="sel_4" onchange="sel_check(this.id)"><option value="0">'+tsalkapone_trans.general.av_op+'</option><option value="2">'+tsalkapone_trans.general.vil+'</option><option value="1">Other village</option></select><br><span class="sel_4"><font color="maroon"><b>'+tsalkapone_trans.general.sel_op+'</font></b></span></td>';
menu2+='<td><center><font color="blue"><b>'+tsalkapone_trans.general.sel_ch+': </b></font><select id="ch_4" onchange="ch_check(this.id)"><option value="6">'+tsalkapone_trans.general.f1+'</option><option value="4">'+tsalkapone_trans.general.level+' 1</option><option value="6">'+tsalkapone_trans.general.level+' 2</option><option value="8">Level 3</option></select><center><br><br><span class="ch_4"><img src="/graphic/big_buildings/church_f1.png" height="50px;" width="50px;"></span></td></tr>';
menu2+='<tr><td><input type="checkbox" id="check_5" onclick="active_check(this.id);">&emsp;<b><span class="check_5"><font color="red">'+tsalkapone_trans.general.not_act+'</font></span></b></td>';
menu2+='<td><font color="blue"><b>'+tsalkapone_trans.general.sel_op+': </b></font><select id="sel_5" onchange="sel_check(this.id)"><option value="0">'+tsalkapone_trans.general.av_op+'</option><option value="2">'+tsalkapone_trans.general.vil+'</option><option value="1">Other village</option></select><br><span class="sel_5"><font color="maroon"><b>'+tsalkapone_trans.general.sel_op+'</font></b></span></td>';
menu2+='<td><center><font color="blue"><b>'+tsalkapone_trans.general.sel_ch+': </b></font><select id="ch_5" onchange="ch_check(this.id)"><option value="6">'+tsalkapone_trans.general.f1+'</option><option value="4">'+tsalkapone_trans.general.level+' 1</option><option value="6">'+tsalkapone_trans.general.level+' 2</option><option value="8">'+tsalkapone_trans.general.level+' 3</option></select><center><br><br><span class="ch_5"><img src="/graphic/big_buildings/church_f1.png" height="50px;" width="50px;"></span></td></tr>';
menu2+='</tbody></table></div>';
menu2+="<br><input type='checkbox' id='epanek'>&nbsp;<font color='blue'><b>"+tsalkapone_trans.general.res_rel+"</b></font><hr><input type='button' class='btn' style='cursor: pointer' align=right id=Tsalsynclose4 value='"+tsalkapone_trans.buttons.close_rel+"'>";  
menu2+="&emsp;<input type='button' class='btn' style='cursor: pointer' align=right id=Tsalefarmogi value='"+tsalkapone_trans.buttons.apply_rel+"'><hr>";
        document.getElementById("Tsalkeno5").innerHTML=menu2;
        $("#Tsalefarmogi").click(function () {
      var epanek = document.getElementById('epanek').checked;
var check1 = document.getElementById('check_1').checked;
var check2 = document.getElementById('check_2').checked; 
var check3 = document.getElementById('check_3').checked; 
var check4 = document.getElementById('check_4').checked; 
var check5 = document.getElementById('check_5').checked;
var ch1 = document.getElementById('ch_1').value;
var ch2 = document.getElementById('ch_2').value; 
var ch3 = document.getElementById('ch_3').value;
var ch4 = document.getElementById('ch_4').value;
var ch5 = document.getElementById('ch_5').value;
            if (document.getElementById('x_sel_1') && document.getElementById('y_sel_1') && check1 === true) {
var x1 = document.getElementById('x_sel_1').value; var y1 = document.getElementById('y_sel_1').value;
 if (x1 !== "" && y1 !== ""){var tsal_ch1 =[x1,y1,ch1]; }    else { tsal_ch1 ="";} }
            if (document.getElementById('x_sel_2') && document.getElementById('y_sel_2') && check2 === true) {
var x2 = document.getElementById('x_sel_2').value; var y2 = document.getElementById('y_sel_2').value;
             if (x2 !== "" && y2 !== ""){var tsal_ch2 =[x2,y2,ch2*ch2]; }    else { tsal_ch2 ="";}}
if (document.getElementById('x_sel_3') && document.getElementById('y_sel_3') && check3 === true) {
var x3 = document.getElementById('x_sel_3').value; var y3 = document.getElementById('y_sel_3').value; 
 if (x3 !== "" && y3 !== ""){var tsal_ch3 =[x3,y3,ch3*ch3]; }    else { tsal_ch3 ="";}}
if (document.getElementById('x_sel_4') && document.getElementById('y_sel_4') && check4 === true) {
var x4 = document.getElementById('x_sel_4').value; var y4 = document.getElementById('y_sel_4').value;
if (x4 !== "" && y4 !== ""){var tsal_ch4 =[x4,y4,ch4*ch4]; }    else { tsal_ch4 ="";}}
if (document.getElementById('x_sel_5') && document.getElementById('y_sel_5') && check5 === true) {
var x5 = document.getElementById('x_sel_5').value; var y5 = document.getElementById('y_sel_5').value;
if (x5 !== "" && y5 !== ""){var tsal_ch5 =[x5,y5,ch5*ch5]; }    else { tsal_ch5 ="";}}
        var addKirche = [x1, y1, ch1*ch1];
           var addKirche1 = [x2, y2, ch2*ch2];
           var addKirche2 = [x3, y3, ch3*ch3];
            var addKirche3 = [x4, y4, ch4*ch5];
            var addKirche4 = [x5, y5, ch5*ch5];
        var Anzahl = MapCanvas.churchData.length;
            if (epanek === true ) {
            MapCanvas.churchData[Anzahl-1] = addKirche;
           MapCanvas.churchData[Anzahl] = addKirche1;
           MapCanvas.churchData[Anzahl+1] = addKirche2;
            MapCanvas.churchData[Anzahl+2] = addKirche3;
            MapCanvas.churchData[Anzahl+3] = addKirche4;
            }
            else if (epanek === false ) {
               MapCanvas.churchData[Anzahl] = addKirche;
           MapCanvas.churchData[Anzahl+1] = addKirche1;
           MapCanvas.churchData[Anzahl+2] = addKirche2;
            MapCanvas.churchData[Anzahl+3] = addKirche3;
            MapCanvas.churchData[Anzahl+4] = addKirche4; 
            }
        
        TWMap.reload();
  UI.SuccessMessage('<font color=gold><b><center>'+tsalkapone_trans.general.notification+' Tsalkapone</center></b></font> <br><br> '+tsalkapone_trans.notes.applied+'', 5000);
        });
        
                                  $("#Tsalsynclose4").click(function Tsalekklisiaaktina() {document.getElementById("Tsalkeno5").innerHTML= "";});        
                             
                        
                        });
                     
            
           $("#Tsal_resize").click(function () {
               var tsalkaponemapresize1='<span id="tsal_resize"></span>';
		$('#map_config').append(tsalkaponemapresize1);	
var tsalkaponemapresize='<table class="vis" width="100%"><tbody><tr><th colspan="2"><font color=darkgreen>Tsalkapone. '+tsalkapone_trans.buttons.resize+'</font></th></tr><tr><td><table cellspacing="0"><tbody><tr><td width="80">'+tsalkapone_trans.general.map+':</td><td>';
tsalkaponemapresize+='<select id="map_chooser_select1" ><option id="current-map-size" value="15" style="display:none;">';
tsalkaponemapresize+='15x15</option><option value="4">4x4</option><option value="5">5x5</option><option value="7">7x7</option><option value="9">9x9</option><option value="10">10x10</option><option value="11">11x11</option><option value="12">12x12</option><option value="13">13x13</option>';
tsalkaponemapresize+='<option value="15" selected="selected">15x15</option><option value="17">17x17</option><option value="20">20x20</option><option value="30">30x30</option></select></td><td valign="middle">';
tsalkaponemapresize+='<img class="" src="/graphic//questionmark.png" style="cursor:help" class="tooltip-delayed" title="'+tsalkapone_trans.notes.resize+'" width="13" height="13"></td></tr></tbody></table><input type="hidden" value="/game.php?village=20972&amp;screen=settings&amp;ajaxaction=set_map_size&amp;h=5b82e4c2" id="change_map_size_link">';
tsalkaponemapresize+='</td></tr><tr><td><table cellspacing="0"><tbody><tr><td width="80">Minimap:</td><td colspan="2"><select id="minimap_chooser_select1" >';
tsalkaponemapresize+='<option id="current-minimap-size" value="90x90" style="display:none;">90x90</option><option value="20">20x20</option><option value="30">30x30</option><option value="40">40x40</option><option value="50">50x50</option>';
tsalkaponemapresize+='<option value="60">60x60</option><option value="70">70x70</option><option value="80">80x80</option><option value="90" selected="selected">90x90</option><option value="100">100x100</option><option value="110">110x110</option>';
tsalkaponemapresize+='<option value="120">120x120</option></select></td></tr></tbody></table><input type="hidden" value="/game.php?village=20972&amp;screen=settings&amp;ajaxaction=set_map_size&amp;h=5b82e4c2" id="change_map_size_link"></td></tr>';
tsalkaponemapresize+='<input type="button" class="btn" value="'+tsalkapone_trans.buttons.close_resize+'" id="close_resize">';              
tsalkaponemapresize+='</td></tr></tbody></table>';
               document.getElementById("tsal_resize").innerHTML = tsalkaponemapresize;
               
            var minimapsize = document.getElementById('minimap_chooser_select1'); 
            var mapsize = document.getElementById('map_chooser_select1'); 
            mapsize.onchange = function () {
                var mapsize_value = document.getElementById("map_chooser_select1").value; 
                TWMap.resize(Number(mapsize_value));
                localStorage.setItem("mapsize", mapsize_value);
                
    }
             
            minimapsize.onchange = function () {
                var minimapsize_value = document.getElementById('minimap_chooser_select1').value;
                TWMap.resizeMinimap(minimapsize_value);
                localStorage.setItem("minimapsize", this.value); }
         

    if (localStorage.mapsize) {TWMap.resize(Number(localStorage.getItem('mapsize'))); }
            if (localStorage.minimapsize) {TWMap.resizeMinimap(Number(localStorage.getItem('minimapsize')));minimapsize.value = localStorage.getItem('minimapsize');}
           $("#close_resize").click(function () {
                                document.getElementById("tsal_resize").innerHTML = "";});
           });
                        

    }
    else {
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
    } };


(function (func, GM_xmlhttpRequest) {

    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    if (window.mozInnerScreenX !== undefined) {
        // Firefox has troubles with renaming commands, villages, ... (it works some of the time)
        // But waiting for document.ready slows down the script so only wait for this on FF
        // An optimization could be to put document.readys only around those blocks that are
        // problematic.
        script.textContent = '$(document).ready(' + func + ');';

    } else {
        script.textContent = '(' + func + ')();';
    }
    
     
     
     document.head.appendChild(script); // run the script
    document.head.removeChild(script); // clean up
      

               
    
    }(tsalkaponetool_ready, (typeof GM_xmlhttpRequest === "undefined" ? undefined : GM_xmlhttpRequest)));

    

