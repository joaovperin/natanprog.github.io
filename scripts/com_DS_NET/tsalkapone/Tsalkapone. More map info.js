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
			var tsalk_trans = (function() {
				    var tsalk_trans = {};
					tsalk_trans.en={
						tw:{   /* The values of these variables have to be exactly as they appear in the Map info of each server */
	mon1:"Jan",
	mon2:"Feb",
	mon3:"Mar",
	mon4:"Apr",
	mon5:"May",
	mon6:"Jun",
	mon6_2:"June",
	mon7:"Jul",
	mon7_2:"July",
	mon8:"Aug",
	mon9:"Sep",
	mon10:"Oct",
	mon11:"Nov",
	mon12:"Dec",	
	},
					};
					tsalk_trans.it={
                        tw:{   /* I valori di queste variabili devono essere esattamente come appaiono nella mappa informazioni di ogni server */

    mon1:"Gen",
    mon2:"Feb",
    mon3:"Mar",
    mon4:"Apr",
    mon5:"Mag",
    mon6:"Giu",
    mon7:"Lug",
    mon8:"Ago",
    mon9:"Set",
    mon10:"Ott",
    mon11:"Nov",
    mon12:"Dic",  
						},
					};
					tsalk_trans.gr={
						tw:{
mon1:"Ιαν",
	mon2:"Φεβ",
	mon3:"Μαρ",
	mon3_1:"Μάρ",
	mon4:"Απρ",
	mon5:"Μάι",
	mon6:"Ιουν",
	mon6_2:"Ιούν",
	mon7:"Ιούλ",
	mon7_2:"Ιουλ",
	mon8:"Αυγ",
	mon9:"Σεπ",
	mon10:"Οκτ",
	mon11:"Νοέ",
	mon12:"Δεκ",	
},
					};
					
		 return tsalk_trans[tsal_market];			
		}());
		
 var tsalkapone_trans = (function() {
				    var tsalkapone_trans = {};
    tsalkapone_trans.english= { 
	 general:{ 
	 script:"Additional Map Info",
	 instructions:"Instructions and variables for the Resource balancer",
	 notification:"Notification from",
         selected_one:"Current selected language",
         available:"Available languages",
		 button_list:"Buttons List",
		 add_info:"Click to read more about the additional info displayed of the selected template",
		 lang_sel:"Click to change the selected language",
		efarmogi:"Click to apply the selected template's settings",
		diagrafi:"Click to delete all saved data from the Map",
		protupo:"Click to select a settings template",
		sets:"Additional Settings",
		vals:"Value",
		set1:"Select a template setting for the hour display",
		set2:"Select method to calculate defence level",
		s1:"Days:Hours",
		s2:"Hours:Minutes",
		s3:"Troops population",
		s4:"Troops OD points",
		s5:"Enable/Disable data save while moving your cursor on Map",
		s6:"Enable to show current points instead of time",
		p0:"Select template",
		p1:"Village Growth",
		p2:"Conquers",
		p3:"Farming & Commands",
		p4:"Flags",
		p5:"Defence Level",
		p6:"Bonus Villages",
		p7:"Nuke Level",
		vil_time:"Data age of the current village",
		month:"mon",
		days:"d.",
		noflag:"No flag",
		hour:"h",
		day:"d",
		min:"m",
		hours:"hours",
		mins:"minutes ago",
		message_no:"No",
		message_yes:"Yes",
		message_1:"This script is activated on Map.",
		message_2:" Do you want to automatically assign your location to this page?",
		comm:"Feel free to send any message regarding script bugs or proposing ideas to",
		info_1:"Select an available method to display the time age of the data of each village on the Map.",
		info_2:"Enable this option to save data while you move your cursor on the Map.<br><br>It is highly recommended that you don't enable this option when you activate the template for the first time.<br><br>Activate the template and after you have noticed the village growths enable it to refresh the data of each village.",
		info_3:"In case you enable this option the time age of each village's data will be replaced by its current points.<br><br>Below this table you will be notified about the time age of the your current village's data age.",
		info_4:"Select an available method to calculate the level of defence/nuke of each one of your villages.<br><b><u>Troops population:</u></b><br>Select this option to calculate the level of defence/nuke according to troops' population in the village (21.000 population count as 1 village for defence, 19.000 population count as 1 village for nuke).<br><b><u>Troops OD points:</u></b><br>Select this option to calculate the level of defence based on the troops' ODA points (85.000 points count as 1 village) and the level of nuke on the troops' ODD points (72.000 points count as 1 village).",
		info1:"Add loot, report type and last attack time on map",
		info2:"Every village you have attacked and your units returned with full haul will be distinguished with the full haul image",
		info3:"Every village you have attacked and your units returned with partial haul will be shown with the partial haul image",
		info4:"For every village, the additional map info box will be colored accordingly to <b>YOUR</b> last report type. The colors represent the report type as known by the game. The rest colors are an exception to the rule",
		info5:"Exceptions",
		info6:"Report with full losses but one or more enemy buildings was demolished",
		info7:"Darkorange color",
		info8:"Report with full losses but successful scout report",
		info9:"Darkmagenta color",
		info10:"Time",
		info11:"If a village was last attacked by you more than 30 days ago the rest text will be shown",
		info12:"If a village was last attacked by you less than 30 days and more than 2 days ago, the rest text will be shown",
		info13:"the days ago you last attacked the village",
		info14:"If a village was last attacked by you less than 2 days ago but NOT the same day, the rest text will be shown",
		info15:"If a village was last attacked by you the same day, then the <b>hour</b> of your last attacked will be show in the additional info. For instance",
		info16:"ATTENTION",
		info17:"The additional map info represent information from YOUR OWN reports and not reports from allies or friends. Also, these information come from existed reports and not reports that have been deleted",
		info18:"This script is ONLY functionable with active premium account",
		info19:"If any script-bug occurs, or you have any idea or proposal you can communicate with",
		info20:"Loot",
		info21:"Report type",
		info22:"Show Growth on Map",
		info23:"Data Age",
		info24:"The Data Age (and its form) for each village on the Map is determined by the user. You can choose whether to save or not the data of each village. You may use this capability for your own purposes. <br><br>If the script doesn't find any saved data for a village it will mark the village with the following color",
		info25:"Growth",
		info26:"The script will calculate the difference between the saved points and the current points of each village and will display them on the Map. The colors below represent the kind of difference in points",
		info27:"No difference",
		info28:"The points have been increased",
		info29:"The points have been decreased",
		info30:"Show Conquers on Map",
		info31:"The colors below represent whether a village's owner has been changed (based on the saved data of each village)",
		info32:"The village's owner has been changed",
		info33:"The village's owner hasn't been changed",
		info34:"Conquers",
		info35:"Show Flags on Map",
		info36:"Flags",
		info37:"The script will show the flags assigned to each one of your villages on the Map using the color of the flag-size as background color and the flag-type as text below each village.<br><br>If a village doesn't have any flag assigned to it, it will be marked with the following color",
		info38:"Show Defence Level on Map",
		info39:"Level",
		info40:"The defence level will display the following text below each one of your villages",
		info41:"the amount of defensive units (archer, spear, sword, heavy cavalry, catapult) in your village",
		info42:"the level's indicator",
		info43:"Level Indicator",
		info44:"The level indicator is calculated by dividing the amount of the defensive units or their ODA points (additional settings) by a value that equals the strength of a complete defensive village.",
		info45:"It is recommended that you use the OD points as calculation method. It reflects better the strength of your units.",
		info46:"The following colors represent the defensive strength of your village",
		info47:"strength lower than 2 villages",
		info48:"strength between 2 and 3 villages",
		info49:"strength between 3 and 4 villages",
		info50:"strength between 4 and 5 villages",
		info51:"strength between 5 and 6 villages",
		info52:"strength large than 6 villages",
		info53:"Defensive",
		info54:"Nuke",
		info55:"of Defence",
		info56:"of Nuke",
		info57:"Show Nuke Level on Map",
		info58:"Show Bonus Villages on Map",
		info59:"Bonus Villages",
		info60:"The script will reveal the bonus type of each bonus village mentioning the building that affects (e.g. stable)",
		info61:"the amount of offensive units (axe, light cavalry, heavy cavalry, mounted archer, ram) belonging in your village",
		info62:"The nuke level will display the following text below each one of your villages",
		info63:"Read more on Additional Settings",
		info64:"the amount of snobs belonging to each village",
		},
	buttons:{
		lang_open:"Open language selection",
              lang_close:"Close language selection",
			  see_info:"Additional Map Info",
			  efarmogi:"Apply Template",
			  diagrafi:"Delete Data",
	},
	notes:{
		diagrafi:"The Map's saved data has been successfully removed from your localStorage.<br><br> The page will be automatically refreshed in 4 seconds.",
		protupo:"No selected settings template was detected.<br><br> Select a template and try again.",
	},
};
tsalkapone_trans.italian= { 
     general:{ 
     script:"Ulteriori info mappa",
     instructions:"Istruzioni e variabili per il sistema di bilanciamento delle risorse",
     notification:"Notifiche da",
         selected_one:"Corrente lingua selezionata",
         available:"Lingue disponibili",
         button_list:"Lista pulsanti",
         add_info:"Clicca per leggere di più sul informazioni aggiuntive visualizzate sul modello selezionato",
         lang_sel:"Clicca per cambiare la lingua selezionata",
        efarmogi:"Clicca per applicare le impostazioni modello selezionato",
        diagrafi:"Clicca per eliminare tutti i dati salvati dalla mappa",
        protupo:"Clicca per selezionare un modello di impostazioni",
        sets:"Altre impostazioni",
        vals:"Valore",
        set1:"Selezionare un'impostazione modello per la visualizzazione ora",
        set2:"Selezionare il metodo per calcolare il livello di difesa",
        s1:"Giorno:Ore",
        s2:"Ore:Minuti",
        s3:"Truppe",
        s4:"Truppe punti OD ",
        s5:"Abilita / Disabilita dati salvati mentre si sposta il cursore sulla mappa",
        s6:"Abilita per mostrare punti corrente invece di tempo",
        p0:"Seleziona modello",
        p1:"Crescita villi",
        p2:"Conquiste",
        p3:"Farming & Comandi",
        p4:"Bandiere",
        p5:"Levello difesa",
        p6:"Bonus Villaggi",
        p7:"Full Level",
        vil_time:"l'età dei dati del villo corrente",
        month:"mon",
        days:"d.",
        noflag:"senza bandiera",
        hour:"h",
        day:"d",
        min:"m",
        hours:"hours",
        mins:"minutes ago",
        message_no:"No",
        message_yes:"Si",
        message_1:"Questo script è attivo sulla mappa.",
        message_2:" Vuoi assegnare automaticamente la posizione su questa pagina?",
        comm:"Sentitevi liberi di inviare alcun messaggio relativo ai bugs di script o proporre idee, a",
        info_1:"Selezionare un metodo disponibile per visualizzare l'età (tempo) dei dati di ogni villo sulla mappa.",
        info_2:"Attivare questa opzione per salvare i dati, mentre si sposta il cursore sulla mappa.<br><br>Si consiglia vivamente di non attivare questa opzione quando si attiva il modello per la prima volta.<br><br>Attivare il modello solo dopo aver notato la crescita del villaggio, che consente di aggiornare i dati di ogni villaggio.",
        info_3:"Nel caso in cui si attiva questa opzione, l'età tempo dei dati di ogni villaggio sarà sostituito dai suoi punti attuali.<br><br>Sotto questa tabella sarai avvisato dell'età dei dati del tuo villaggio corrente.",
        info_4:"Selezionare un metodo disponibile per calcolare il livello di difesa / Nuke di ciascuno dei vostri villaggi.<br><b><u>Popolazione truppe:</u></b><br>Selezionare questa opzione per calcolare il livello di difesa / Nuke in base alle truppe' popolazione del villaggio (conta 21.000 popolazione 1 villaggio di difesa, 19.000 abitanti contano come 1 villaggio per Nuke).<br><b><u>truppe OD punti:</u></b><br>Selezionare questa opzione per calcolare il livello di difesa sulla base delle truppe' ODA punti (85.000 punti contano come 1 villaggio) e il livello di Nuke sulle truppe' ODD punti (72.000 punti contano come 1 villaggio).",
        info1:"Aggiungere bottino, tipo di rapporto e l'ultimo attacco sulla mappa",
        info2:"Ogni villaggio che è stato attaccato e le unità tornato con pieno raggio si distinguerà l'immagine completo raggio con",
        info3:"Ogni villaggio che è stato attaccato e le unità tornato con raggio parziale verrà visualizzata l'immagine parziale raggio con",
        info4:"Per ogni villo, la casella di informazioni aggiuntive mappa sarà colorata di conseguenza per <b>TUO</b> ultimo report. I colori rappresentano il tipo di rapporto come noto dal gioco. I colori di riposo sono un'eccezione alla regola",
        info5:"Eccezioni",
        info6:"Report con piene perdite, ma uno o più edifici nemici è stato demolito",
        info7:"Darkorange color",
        info8:"Report con piene perdite, ma rapporto espl di successo",
        info9:"Darkmagenta color",
        info10:"Tempo",
        info11:"Se un villaggio è stato attaccato più di 30 giorni fa, verrà mostrato il testo rimasto",
        info12:"Se un villaggio è stato attaccato meno di 30 giorni fa e più di 2 giorni fa, il testo rimasto verrà mostrato",
        info13:"i giorni fa dell ultimo attacco",
        info14:"Se un villaggio è stato attaccato meno di 2 giorni fa, ma non lo stesso giorno, il testo resto verrà mostrato",
        info15:"Se un villaggio è stato attaccato nello stesso giorno, poi il <b>tuo</b> attacco verrà mostrato in informazioni aggiuntive. Per esempio",
        info16:"ATTENZIONE",
        info17:"Le info aggiuntive per la mappa rappresentano informazioni sulle tue relazioni e non rapporti da alleati o amici. Inoltre, queste informazioni provengono da rapporti esistiti non quelli che sono stati eliminati",
        info18:"Questo script è funzionale SOLO con account premium attivo",
        info19:"Se si verifica qualsiasi bugs script o avete qualche idea, si-può comunicare o proporre",
        info20:"Bottino",
        info21:"Tipo report",
        info22:"Mostra crescita sulla mappa",
        info23:"L'età dei dati",
        info24:"L'età dei dati (e la sua forma) per ogni villo sulla mappa determinato dall'utente. È possibile scegliere se salvare o meno i dati di ogni villaggio. È possibile utilizzare questa funzionalità per i propri scopi. <br><br>Se lo script non trova i dati salvati per un villaggio, segnerà il villo con il seguente colore",
        info25:"Crescita",
        info26:"Lo script calcola la differenza tra i punti di salvataggio ed i punti correnti di ogni villaggio e li visualizza sulla mappa. I colori sotto rappresentano il tipo di differenza di punti",
        info27:"Nessuna differenza",
        info28:"I punti sono stati aumentati",
        info29:"I punti sono stati diminuiti",
        info30:"Mostra conquiste sulla mappa",
        info31:"I colori di seguito rappresentano la conquista - se il proprietario di un villaggio è stato modificato (sulla base dei dati salvati di ogni villaggio)",
        info32:"Il proprietario dell villo è stato modifficato",
        info33:"Il proprietario dell villo non è stato modifficato",
        info34:"Conquiste",
        info35:"Mostra bandiere sulla mappa",
        info36:"Bandiere",
        info37:"Lo script mostrerà le bandiere assegnate a ciascuno dei vostri villaggi sulla mappa utilizzando il colore della bandiera a grandezza naturale come colore di sfondo e il tipo di bandiere come testo, vicino ciascun villo.<br><br>Se un paese non dispone di una bandiera, sarà contrassegnato con il seguente colore",
        info38:"Mostra livello difesa sulla mappa",
        info39:"Livello",
        info40:"Il livello di difesa verrà visualizzato con il seguente testo sotto tutti i vostri villaggi",
        info41:"la quantità di unità di difesa (arciere, lancia, spada, cavalleria pesante, catapulta) nel tuo villaggio",
        info42:"indicatore di livello",
        info43:"Level Indicator",
        info44:"L'indicatore del livello viene calcolato dividendo l'importo delle unità di difesa o dei loro punti ODD (impostazioni aggiuntive) da un valore che è uguale alla forza di un villaggio di difesa completa.",
        info45:"Si consiglia di utilizzare i punti di OD come metodo di calcolo. Essa riflette meglio la forza delle tue unità.",
        info46:"I seguenti colori rappresentano la forza difensiva del tuo villaggio",
        info47:"forza inferiore a 2 villaggi",
        info48:"forza tra 2 e 3 villaggi",
        info49:"forza tra 3 e 4 villaggi",
        info50:"forza tra 4 e 5 villaggi",
        info51:"forza tra 5 e 6 villaggi",
        info52:"piu potente di 6 villaggi",
        info53:"Difesa",
        info54:"Nuke/Attacco",
        info55:"of Difesa",
        info56:"of Nuke",
        info57:"Mostra livello attacco sulla mappa",
        info58:"Mostra villaggi bonus sulla mappa",
        info59:"Mostra villaggi",
        info60:"Lo script rivelerà il tipo di bonus di ogni villaggio bonus, menzionando l'edificio (e.s. stalla)",
        info61:"La quantità di unità offensive (asce, ini, cavalleria pesante, arcieri a cavallo, arieti) presenti nel tuo villaggio",
        info62:"Il livello di attacco - visualizza il testo che segue sotto ogni uno dei vostri villaggi",
        info63:"Per saperne di più vai su Impostazioni aggiuntive",
        info64:"la quantità di snob appartenenti a ogni villaggio",
        },
    buttons:{
        lang_open:"Apri selezione lingua",
              lang_close:"Chiudi selezione lingua",
              see_info:"Ulteriori info mappa",
              efarmogi:"Applicare Template",
              diagrafi:"Elimina dati",
    },
    notes:{
        diagrafi:"I dati salvati delle mappe sono state rimosse con successo dal archiviazione locale.<br><br> La pagina verrà aggiornata automaticamente in 4 secondi.",
        protupo:"Nessun modello di impostazioni selezionato è stato rilevato. <br><br> Seleziona un modello e riprova.",
	},
};
tsalkapone_trans.greek= { 
	 general:{ 
	 script:"Πρόσθετα Χάρτη",
	 instructions:"Οδηγίες και μεταβλητές βοηθήματος για τον Ισορροπιστή Πόρων",
	 notification:"Ειδοποίηση από τον",
	 efarmogi:"Επιλέξτε για εφαρμογή των ρυθμίσεων του επιλεγμένου πρότυπου",
	 diagrafi:"Επιλέξτε για διαγραφή των αποθηκευμένων δεδομένων του Χάρτη",
	 protupo:"Επιλέξτε ένα διαθέσιμο πρότυπο ρυθμίσεων",
	 p0:"Επιλογή πρότυπου",
		p1:"Ανάπτυξη Χωριών",
		p2:"Κατακτήσεις",
		p3:"Farming & Εντολές",
		p4:"Σημαίες",
		p5:"Επίπεδο Άμυνας",
		p6:"Χωριά Bonus",
		p7:"Επίπεδο Εκκαθαριστικής",
		sets:"Πρόσθετες Ρυθμίσεις",
		vals:"Τιμή",
		set1:"Επιλέξτε μορφή εμφάνισης ώρας",
		set2:"Επιλέξτε μέθοδο υπολογισμού επιπέδου άμυνας",
		s1:"Μέρες:Ώρες",
		s2:"Ώρες:Λεπτά",
		s3:"Πληθυσμός στρατευμάτων",
		s4:"Μονάδες OD στρατευμάτων",
		s5:"Ενεργοποίηση/Απενεργοποίηση αποθήκευσης δεδομένων με τη κίνηση του cursor στο Χάρτη",
		s6:"Ενεργοποιείστε για να αντικαταστήσετε την ώρα με τους πόντους κάθε χωριού",
		vil_time:"Χρονική ηλικία δεδομένων του τρέχοντος χωριού",
		info_1:"Επιλέξτε μια διαθέσιμη μέθοδο εμφάνισης της χρονικής ηλικίας των δεδομένων κάθε χωριού στο Χάρτη.",
		info_2:"Ενεργοποιείστε τη συγκεκριμένη επιλογή για να αποθηκεύετε δεδομένα χωριών καθώς μετακινείτε το cursor σας στο Χάρτη.<br><br>Προτείνεται να μην ενεργοποιείστε τη συγκεκριμένη επιλογή με τη πρώτη ενεργοποίηση του πρότυπου.<br><br>Ενεργοποιείστε το πρότυπο και εφόσον παρατηρείστε τις αλλαγές ανάπτυξης των χωριών στο Χάρτη, έπειτα ενεργοποιείστε τη συγκεκριμένη επιλογή για ανανέωση των αποθηκευμένων δεδομένων.",
		info_3:"Ενεργοποιώντας τη συγκεκριμένη επιλογή αντικαθίσταται η χρονική ηλικία δεδομένων κάθε χωριού με τους τωρινούς πόντους.<br><br>Κάτω από το συγκεκριμένο πίνακα θα εμφανιστεί η χρονική ηλικία των δεδομένων του τρέχοντος χωριού σας.",
		info_4:"<b><u>Πληθυσμός στρατευμάτων:</u></b><br>Επιλέγοντας τη συγκεκριμένη μέθοδο το επίπεδο άμυνας/εκκαθαριστικής θα υπολογιστεί βάση του πληθυσμού αγροκτήματος των στρατευμάτων εντός του κάθε σας χωριού (21.000 πληθυσμός υπολογίζονται ως 1 χωριό για την άμυνα, 19.000 πληθυσμός υπολογίζονται ως 1 χωριό για την εκκαθαριστική).<br><b><u>Μονάδες OD στρατευμάτων:</u></b><br>Επιλέγοντας τη συγκεκριμένη μέθοδο το επίπεδο άμυνας υπολογίζεται βάση των μονάδων ODA των στρατευμάτων (85.000 μονάδας υπολογίζονται ως 1 χωριό) και το επίπεδο εκκαθαριστική βάση των μονάδων ODD των στρατευμάτων (72.000 μονάδες υπολογίζονται ως 1 χωριό).",
		noflag:"Χωρίς σημαία",
            selected_one:"Ενεργή γλώσσα",
            available:"Διαθέσιμες γλώσσες",
			button_list:"Πίνακας πλήκτρων",
			add_info:"Επιλέξτε για να διαβάσετε για τις επιπρόσθετες λεπτομέρειες στο Χάρτη του επιλεγμένου πρότυπου",
			lang_sel:"Επιλέξτε για να αλλάξετε την επιλεγμένη γλώσσσα",
			month:"μην",
			days:"μ.",
			hours:"ώρες",
			mins:"λεπτά πριν",
			hour:"ώ",
			day:"μ",
			min:"λ",
			message_no:"Όχι",
		message_yes:"Ναι",
		message_1:"Το συγκεκριμένο script ενεργοποιείται από το Χάρτη.",
		message_2:"Επιθυμείτε αυτόματη ανακατεύθυνση;",
		comm:"Επικοινωνήστε ανά πάσα στιγμή για οποιαδήποτε ιδέα ή πρόταση σχετικά με τα scripts με τον",
		info22:"Εμφάνιση Ανάπτυξης Χωριών στο Χάρτη",
		info23:"Χρονική Ηλικία Δεδομένων",
		info24:"Η χρονική ηλικία δεδομένων (και η μέθοδος εμφάνισής της) για το κάθε χωριό στο Χάρτη καθορίζεται από το χρήστη. Μπορείτε να επιλέξετε αν επιθυμείτε ή όχι αποθήκευση των δεδομένων. Μπορείτε να αξιοποιήσετε τη συγκεκριμένη δυνατότητα για προσωπικούς σκοπούς. <br><br>Σε περίπτωση που το script δεν εντοπίσει αποθηκευμένα δεδομένα για ένα χωριό θα το χρωματίσει με το ακόλουθο χρώμα",
		info25:"Ανάπτυξη",
		info26:"Το script υπολογίζει τους αποθηκευμένους πόντους κάθε χωριού και τους αφαιρεί από τους υπάρχοντες. Τα χρώματα παρακάτω υποδεικνύουν το είδος της διαφοράς",
		info27:"Καμιά αυξομείωση",
		info28:"Οι πόντοι αυξήθηκαν",
		info29:"Οι πόντοι μειώθηκαν",
		info19:"Επικοινωνήστε ανά πάσα στιγμή για οποιαδήποτε απορία ή πρόταση σχετικά με τα scripts με τον",
		info30:"Εμφάνιση Κατακτήσεων στο Χάρτη",
		info31:"Τα ακόλουθα χρώματα αντιπροσωπεύουν την αλλαγή του ιδιοκτήτη κάθε χωριού (βασισμένη στα αποθηκευμένα δεδομένα κάθε χωριού)",
		info32:"Ο ιδιοκτήτης του χωριού έχει αλλάξει",
		info33:"Ο ιδιοκτήτης του χωριού δεν έχει αλλάξει",
		info34:"Κατακτήσεις",
		info35:"Εμφάνιση Σημαίας στο Χάρτη",
		info36:"Σημαίες",
		info37:"Το script θα χρησιμοποιήσει το χρώμα του μεγέθους κάθε σημαίας ως χρώμα φόντου και ως κείμενο το είδος της σημαίας και θα τα εμφανίσει κάτω από το αντίστοιχο χωριό.<br><br>Αν σε ένα χωριό δεν έχει τοποθετηθεί σημαία θα διακριθεί στο Χάρτη με το εξής χρώμα",
		info38:"Εμφάνιση Επιπέδου Άμυνας στο Χάρτη",
		info39:"Επίπεδο",
		info40:"Το επίπεδο άμυνας θα εμφανίσει το παρακάτω κείμενο κάτω από κάθε σας χωριό",
		info41:"η ποσότητα των αμυντικών μονάδων (τοξότες, δορατοφόροι, ξιφομάχοι, βαρύ ιππικό, καταπέλτες) εντός κάθε σας χωριού",
		info42:"δείκτης επιπέδου",
		info43:"Δείκτης Επιπέδου",
		info44:"Ο δείκτης επιπέδου άμυνας υπολογίζεται διαιρώντας τη ποσότητα των μονάδων ή μονάδων ODA (ρυθμιζόμενη επιλογή) με μια τιμή ισάξια της δύναμης ενός ολοκληρωμένου αμυντικού χωριού.",
		info45:"Προτείνεται να επιλέξτε ως μέθοδο τις μονάδες OD. Αντανακλούν πιο αξιοκρατικά την δύναμη των μονάδων.",
		info46:"Τα ακόλουθα χρώματα αναπαριστούν τη δύναμη του χωριού σας",
		info47:"δύναμη μικρότερη των 2 χωριών",
		info48:"δύναμη μεταξύ 2 και 3 χωριών",
		info49:"δύναμη μεταξύ 3 και 4 χωριών",
		info50:"δύναμη μεταξύ 4 και 5 χωριών",
		info51:"δύναμη μεταξύ 5 και 6 χωριών",
		info52:"δύναμη μεγαλύτερη των 6 χωριών",
		info53:"Αμυντική",
		info54:"Επιθετική",
		info55:"Άμυνας",
		info56:"Εκκαθαριστικής",
		info57:"Εμφάνιση Επιπέδου Εκκαθαριστικής στο Χάρτη",
		info58:"Εμφάνιση Χωριών Bonus στο Χάρτη",
		info59:"Bonus Χωριά",
		info60:"Το script θα εμφανίσει στο Χάρτη το είδος του bonus των bonus χωριών αναγράφοντας το κτίριο που επηρεάζει το κάθε bonus (π.χ. στρατώνας)",
		info61:"η ποσότητα των επιθετικών μονάδων (τσεκούρι, ελαφρύ ιππικό, βαρύ ιππικό, έφιππος τοξότες, πολιορκητικός κριός) που ανήκουν στο χωριό σας",
		info62:"Το επίπεδο εκκαθαριστικής θα εμφανίσει το παρακάτω κείμενο κάτω από κάθε σας χωριό",
		info63:"Διαβάστε περισσότερα στις Πρόσθετες Ρυθμίσεις",
		info64:"η ποσότητα των αριστοκρατών που υπάρχει και ανήκει στο κάθε σας χωριό",
	},
	buttons:{		
			  lang_open:"Άνοιγμα επιλογής γλώσσας",
              lang_close:"Κλείσιμο επιλογής γλώσσας",
			  see_info:"Πρόσθετα Χάρτη",
			  efarmogi:"Εφαρμογή Πρότυπου",
			  diagrafi:"Διαγραφή Δεδομένων",
	},
	notes:{
		diagrafi:"Τα αποθηκευμένα δεδομένα του Χάρτη διαγράφηκαν επιτυχώς.<br><br> Θα πραγματοποιηθεί αυτόματη ανανέωση σελίδας σε 4 δευτερόλεπτα.",
		protupo:"Δεν εντοπίστηκε επιλεγμένο πρότυπο ρυθμίσεων.<br><br>Επιλέξτε ένα πρότυπο και δοκιμάστε πάλι.",
	},
};
    return tsalkapone_trans[lang];
    }());
	
	

var lang_img='';
        if (lang=="greek") {lang_img ='<img title="Ελληνικά" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif">';}
        else if (lang=="english") {lang_img ='<img height="20px" style="cursor:help;" title="English/American" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif">';}
        else if (lang=="italian") {lang_img ='<img height="20px" style="cursor:help;" title="Italian" width="30px" src="https://dl.dropboxusercontent.com/s/ho5ks4i0z7u5bpn/flag_italiano.gif">';}
 
var tsaldiamorfwsi='<link rel="stylesheet" type="text/css" href="https://dl.dropboxusercontent.com/s/r3ov8brxa6oxoal/Tsalkapone.Advanced_Coords_Extractor.css" />';
	var	tsalbody='<style>';
tsalbody+='.tsalkembed1{ font-family: "Comic Sans MS", cursive, sans-serif;font-style:italic;color: purple;-webkit-animation: mymove1 3s infinite; -moz-animation: mymove1 3s infinite; animation: mymove1 6s infinite;font-weight: bold;}';
tsalbody+='@-webkit-keyframes mymove1 {50% {color: red;}} @-moz-keyframes mymove1 {50% {color: red;}} @keyframes mymove1 {50% {color:red;}';
tsalbody+='</style>';
var tsalscript='<script type="text/javascript">function tsalpro () { var x=document.getElementById("protupo").value; var x1=document.getElementById("tsalset1"); var x2=document.getElementById("tsalset2"); var x3=document.getElementById("extra");';
tsalscript+=' if(x=="1") {x1.style.display=""; x3.style.display=""; x2.style.display="none";} else  if(x=="5" || x=="7") {x1.style.display="none";  x3.style.display="none"; x2.style.display="";} ';
tsalscript+=' else  if(x=="2") {x1.style.display="";  x3.style.display="none"; x2.style.display="none";} else {x1.style.display="none";  x3.style.display="none"; x2.style.display="none";}}';
tsalscript+='</script>';

$("head").append(tsaldiamorfwsi+tsalbody+tsalscript);    

	
	
	
	var tsalkaponecell = "";
	tsalkaponecell+='<div class="target-select clearfix vis float_left"><h4><font color=darkgreen><center>Tsalkapone. '+tsalkapone_trans.general.button_list+'</center></font></h4><table class="vis" style="width: 100%"><tbody>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.protupo+'</b></font></td>';
	tsalkaponecell+='<td><center><select style="font-style:bold" id="protupo" onchange="tsalpro();"><option style="color:blue;font-style:italic;" value="0">'+tsalkapone_trans.general.p0+'</option><option value="1">'+tsalkapone_trans.general.p1+'</option>';
	tsalkaponecell+='<option value="2">'+tsalkapone_trans.general.p2+'</option>';
	tsalkaponecell+='<option value="3">'+tsalkapone_trans.general.p3+'</option>';
	tsalkaponecell+='<option value="4">'+tsalkapone_trans.general.p4+'</option>';
	tsalkaponecell+='<option value="5">'+tsalkapone_trans.general.p5+'</option>';
	tsalkaponecell+='<option value="6">'+tsalkapone_trans.general.p6+'</option>';
	tsalkaponecell+='<option value="7">'+tsalkapone_trans.general.p7+'</option>';
	tsalkaponecell+='</center></select></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.efarmogi+'</b></font></td>';
	tsalkaponecell+='<td><input type="button" id="efarmogi" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.efarmogi+'"></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.diagrafi+'</b></font></td>';
	tsalkaponecell+='<td><input type="button" id="diagrafi" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.diagrafi+'"></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.add_info+'</b></font></td>';
	tsalkaponecell+='<td><input type="button" id=Tsalkaponeinfo class="btn tsalbutton" value="'+tsalkapone_trans.buttons.see_info+'"></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.lang_sel+'</b></font></td>';
tsalkaponecell+='<td><font style="font-family: \'Arial Black\', Gadget, sans-serif;"><span id="openfilter1"><input type="button" value="'+tsalkapone_trans.buttons.lang_open+'" id="openfilterbut1" class="btn tsalbutton"></span><span id="closefilter1" style="display:none">';
tsalkaponecell+='<input class="btn tsalbutton" type="button" value="'+tsalkapone_trans.buttons.lang_close+'" id="closefilterbut1"></span></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.selected_one+'</b></font></td>';
tsalkaponecell+='<td><span id="selectedone"><center>'+lang_img+'</center></span><span id="columnfilter1" style="display:none" class="vis"><font size="2">';
tsalkaponecell+='<br><br><center><font color="blue"><b><u>'+tsalkapone_trans.general.available+'</u></b></font></center>';
tsalkaponecell+='<input type="radio"  name="language" value="greek" id="greek_lang" ><img title="Greek \n\nBy Tsalkapone" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif"><br>';
tsalkaponecell+='<input type="radio"  name="language" value="english" id="english_lang" checked><img height="20px" style="cursor:help;" title="English/American \n\nBy Tsalkapone" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif"><br>';
tsalkaponecell+='<input type="radio"  name="language" value="italian" id="italian_lang" checked><img height="20px" style="cursor:help;" title="Italian \n\nBy sndb & im lovin it" width="30px" src="https://dl.dropboxusercontent.com/s/ho5ks4i0z7u5bpn/flag_italiano.gif"><br>';
tsalkaponecell+='</span></td></tr>';
tsalkaponecell+='</tbody></table>';
tsalkaponecell+='<span id="tsalset1" style="display:none;"><br><table class="vis" style="width: 100%"><tbody>';
tsalkaponecell+='<tr><th><center><font color="darkgreen">'+tsalkapone_trans.general.sets+'</font></center></th><th><center><font color="darkgreen">'+tsalkapone_trans.general.vals+'</font></center></th></tr>'; 
tsalkaponecell+='<tr><td style="padding:2px 25px;align:center;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.info_1+'</span></span>&nbsp;'+tsalkapone_trans.general.set1+'</td><td>';
tsalkaponecell+='<center><select id="set1"><option value="1">'+tsalkapone_trans.general.s1+'</option><option value="2">'+tsalkapone_trans.general.s2+'</option></select></center></td></tr>'; 
tsalkaponecell+='<tr><td style="padding:2px 25px;align:center;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.info_2+'</span></span>&nbsp;'+tsalkapone_trans.general.s5+'</td><td><center><input type="checkbox" id="xronos"></center></td></tr>';
tsalkaponecell+='<tr id="extra" style="display:none"><td style="padding:2px 25px;align:center;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.info_3+'</span></span>&nbsp;'+tsalkapone_trans.general.s6+'</td><td><center><input type="checkbox" id="pontoi"></center></td></tr>';
tsalkaponecell+='</tbody></table></span>';
tsalkaponecell+='<span id="tsalset2" style="display:none;"><br><table class="vis" style="width: 100%"><tbody>';
tsalkaponecell+='<tr><th><center><font color="darkgreen">'+tsalkapone_trans.general.sets+'</font></center></th><th><center><font color="darkgreen">'+tsalkapone_trans.general.vals+'</font></center></th></tr>'; 
tsalkaponecell+='<tr><td style="padding:2px 25px;align:center;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.info_4+'</span></span>&nbsp;'+tsalkapone_trans.general.set2+'</td><td>';
tsalkaponecell+='<center><select id="set2"><option value="1">'+tsalkapone_trans.general.s3+'</option><option value="2">'+tsalkapone_trans.general.s4+'</option></select></center></td></tr>'; 
tsalkaponecell+='</tbody></table></span>';
tsalkaponecell+='<br><span id="wra_xwriou"></span></div>';
if (! document.getElementById('Tsalkaponeinfo')){
		$('#content_value').prepend(tsalkaponecell);
		
		/*==== register ====*/
var script = {
	scriptname: 'Additinal Map Info',
	version: '1.2',
	author: 'Tsalkapone',
	email: 'tsalkapone@hotmail.com',
	broken: false
};
$.post(ScriptAPI.url,script);
		
}

       if (get_lang == "greek") {document.getElementById('greek_lang').checked = true;}
      else  if (get_lang == "english") {document.getElementById('english_lang').checked = true; }
	   else  if (get_lang == "italian") {document.getElementById('italian_lang').checked = true; }
         $("#english_lang").click(function(){
	localStorage.setItem("map_info_lang","english");     
location.reload();
    });
	   $("#italian_lang").click(function(){
	localStorage.setItem("map_info_lang","italian");     
location.reload();
    });
	
      $("#greek_lang").click(function(){
	localStorage.setItem("map_info_lang","greek");
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
	var content1 = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="red">'+tsalkapone_trans.general.info22+'</font></u></center></h2>' +
'<br><br><b><u><font color=darkgreen>'+tsalkapone_trans.general.info23+'</b></font></u>' +
'<br><br><b><font color="red">'+tsalkapone_trans.general.info63+'</b></font>' + 
'<br><br>'+tsalkapone_trans.general.info24+':' +                 
'<br><input type="color" value="#FF6FF3" disabled>' + 
'<br><br><br><b><u><font color=darkgreen>'+tsalkapone_trans.general.info25+'</font></u></b>' +
'<br><br>'+tsalkapone_trans.general.info26+':' +
'<br>1. <input type="color" value="#FFFF6F" disabled> &#8667; '+tsalkapone_trans.general.info27+'' + 
'<br>2. <input type="color" value="#00FF9E" disabled> &#8667; '+tsalkapone_trans.general.info28+'' + 
'<br>3. <input type="color" value="#FF0000" disabled> &#8667; '+tsalkapone_trans.general.info29+'' + 
'<br><br><center><img src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg"></center><br><font color=darkgreen><center>'+tsalkapone_trans.general.info19+' <a href="https://forum.tribalwars.net/index.php?members/tsalkapone.114063/" title="Tsalkapone\'s profile" target="_blank">Tsalkapone</a></center></font>' +
'</div>';

var content2 = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="red">'+tsalkapone_trans.general.info30+'</font></u></center></h2>' +
'<br><b><u><font color=darkgreen>'+tsalkapone_trans.general.info23+'</b></font></u>' +
'<br><br><b><font color="red">'+tsalkapone_trans.general.info63+'</b></font>' + 
'<br><br>'+tsalkapone_trans.general.info24+':' +                 
'<br><input type="color" value="#FFFFFF" disabled>' + 
'<br><br><br><b><u><font color=darkgreen>'+tsalkapone_trans.general.info25+'</font></u></b>' +
'<br><br>'+tsalkapone_trans.general.info26+':' +
'<br>1. <input type="color" value="#000000" disabled> &#8667; '+tsalkapone_trans.general.info27+'' + 
'<br>2. <input type="color" value="#058900" disabled> &#8667; '+tsalkapone_trans.general.info28+'' + 
'<br>3. <input type="color" value="#FF0000" disabled> &#8667; '+tsalkapone_trans.general.info29+'' + 
'<br><br><br><b><u><font color=darkgreen>'+tsalkapone_trans.general.info34+'</font></u></b>' +
'<br><br>'+tsalkapone_trans.general.info31+':' +
'<br>1. <input type="color" value="#FCFF00" disabled> &#8667; '+tsalkapone_trans.general.info32+'' + 
'<br>2. <input type="color" value="#ACF9FF" disabled> &#8667; '+tsalkapone_trans.general.info33+'' + 
'<br><br><center><img src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg"></center><br><font color=darkgreen><center>'+tsalkapone_trans.general.info19+' <a href="https://forum.tribalwars.net/index.php?members/tsalkapone.114063/" title="Tsalkapone\'s profile" target="_blank">Tsalkapone</a></center></font>' +
'</div>';

var content5 = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="red">'+tsalkapone_trans.general.info38+'</font></u></center></h2>' +
'<br><b><u><font color=darkgreen>'+tsalkapone_trans.general.info39+' '+tsalkapone_trans.general.info55+'</b></font></u>' +
'<br><br>'+tsalkapone_trans.general.info40+':' +                 
'<br><b>x|<font color="red">y</font></b>' + 
'<br>x &#8667; '+tsalkapone_trans.general.info41+'' +
'<br>y &#8667; '+tsalkapone_trans.general.info42+' '+tsalkapone_trans.general.info55+'' +
'<br><br><b><u><font color=darkgreen>'+tsalkapone_trans.general.info43+' '+tsalkapone_trans.general.info55+'</b></font></u>' +
'<br><br>'+tsalkapone_trans.general.info44+'' +  
'<br><br><font color="maroon"><b>'+tsalkapone_trans.general.info45+'</b></font>' +    
'<br><br>'+tsalkapone_trans.general.info46+':' + 
'<br><input type="color" value="#FFFFFF" disabled> &#8667; '+tsalkapone_trans.general.info53+' '+tsalkapone_trans.general.info47+'' +   
'<br><input type="color" value="#FFFA57" disabled> &#8667; '+tsalkapone_trans.general.info53+' '+tsalkapone_trans.general.info48+'' +   
'<br><input type="color" value="#ABFF00" disabled> &#8667; '+tsalkapone_trans.general.info53+' '+tsalkapone_trans.general.info49+'' +   
'<br><input type="color" value="#00B047" disabled> &#8667; '+tsalkapone_trans.general.info53+' '+tsalkapone_trans.general.info50+'' +   
'<br><input type="color" value="#00FFE2" disabled> &#8667; '+tsalkapone_trans.general.info53+' '+tsalkapone_trans.general.info51+'' +   
'<br><input type="color" value="#037CBD" disabled> &#8667; '+tsalkapone_trans.general.info53+' '+tsalkapone_trans.general.info52+'' + 
'<br><br><center><img src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg"></center><br><font color=darkgreen><center>'+tsalkapone_trans.general.info19+' <a href="https://forum.tribalwars.net/index.php?members/tsalkapone.114063/" title="Tsalkapone\'s profile" target="_blank">Tsalkapone</a></center></font>' +
'</div>';

var content7 = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="red">'+tsalkapone_trans.general.info57+'</font></u></center></h2>' +
'<br><b><u><font color=darkgreen>'+tsalkapone_trans.general.info39+' '+tsalkapone_trans.general.info56+'</b></font></u>' +
'<br><br>'+tsalkapone_trans.general.info62+':' +                 
'<br><b>x|<font color="red">y</font></b>' + 
'<br>x &#8667; '+tsalkapone_trans.general.info64+'' +
'<br>y &#8667; '+tsalkapone_trans.general.info42+' '+tsalkapone_trans.general.info56+'' +
'<br><br><b><u><font color=darkgreen>'+tsalkapone_trans.general.info43+' '+tsalkapone_trans.general.info56+'</b></font></u>' +
'<br><br>'+tsalkapone_trans.general.info44+'' +  
'<br><br><font color="maroon"><b>'+tsalkapone_trans.general.info45+'</b></font>' +    
'<br><br>'+tsalkapone_trans.general.info46+':' + 
'<br><input type="color" value="#FFFFFF" disabled> &#8667; '+tsalkapone_trans.general.info54+' '+tsalkapone_trans.general.info47+'' +   
'<br><input type="color" value="#FFFA57" disabled> &#8667; '+tsalkapone_trans.general.info54+' '+tsalkapone_trans.general.info48+'' +   
'<br><input type="color" value="#ABFF00" disabled> &#8667; '+tsalkapone_trans.general.info54+' '+tsalkapone_trans.general.info49+'' +   
'<br><input type="color" value="#00B047" disabled> &#8667; '+tsalkapone_trans.general.info54+' '+tsalkapone_trans.general.info50+'' +   
'<br><input type="color" value="#00FFE2" disabled> &#8667; '+tsalkapone_trans.general.info54+' '+tsalkapone_trans.general.info51+'' +   
'<br><input type="color" value="#037CBD" disabled> &#8667; '+tsalkapone_trans.general.info54+' '+tsalkapone_trans.general.info52+'' + 
'<br><br><center><img src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg"></center><br><font color=darkgreen><center>'+tsalkapone_trans.general.info19+' <a href="https://forum.tribalwars.net/index.php?members/tsalkapone.114063/" title="Tsalkapone\'s profile" target="_blank">Tsalkapone</a></center></font>' +
'</div>';

var content6 = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="red">'+tsalkapone_trans.general.info58+'</font></u></center></h2>' +
'<br><b><u><font color=darkgreen>'+tsalkapone_trans.general.info59+'</b></font></u>' +
'<br><br>'+tsalkapone_trans.general.info60+'' +                 
'<br><br><center><img src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg"></center><br><font color=darkgreen><center>'+tsalkapone_trans.general.info19+' <a href="https://forum.tribalwars.net/index.php?members/tsalkapone.114063/" title="Tsalkapone\'s profile" target="_blank">Tsalkapone</a></center></font>' +
'</div>';

var content4 = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="red">'+tsalkapone_trans.general.info35+'</font></u></center></h2>' +
'<br><b><u><font color=darkgreen>'+tsalkapone_trans.general.info36+'</b></font></u>' +
'<br><br>'+tsalkapone_trans.general.info37+':' +                 
'<br><input type="color" value="#FFFFFF" disabled>' + 
'<br><br><center><img src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg"></center><br><font color=darkgreen><center>'+tsalkapone_trans.general.info19+' <a href="https://forum.tribalwars.net/index.php?members/tsalkapone.114063/" title="Tsalkapone\'s profile" target="_blank">Tsalkapone</a></center></font>' +
'</div>';

		if (lang == "english" || lang=="italian") {
		 var content3 = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="red">'+tsalkapone_trans.general.info1+'</font></u></center></h2>' +
'<b><u><font color=darkgreen>'+tsalkapone_trans.general.info20+'</b></font></u>' +
'<br><br>1. '+tsalkapone_trans.general.info2+'.  <img src="/graphic/max_loot/1.png" class="">' +                 
'<br>2. '+tsalkapone_trans.general.info3+'.   <img src="/graphic/max_loot/0.png">' + 
'<br><br><br><b><u><font color=darkgreen>'+tsalkapone_trans.general.info21+'</font></u></b>' +
'<br><br>1. '+tsalkapone_trans.general.info4+':' +
'<br>2. '+tsalkapone_trans.general.info5+':' + 
'<br>-> '+tsalkapone_trans.general.info6+' : <input type="color" value="#FF8C00" disabled>.' +  
'<br>-> '+tsalkapone_trans.general.info8+' : <input type="color" value="#8B008B" disabled>.' + 
'<br><br><br><b><u><font color=darkgreen>'+tsalkapone_trans.general.info10+'</font></u></b>' +
'<br><br>1. '+tsalkapone_trans.general.info11+':<b> > '+tsalkapone_trans.general.month+'</b>' +   
'<br>2. '+tsalkapone_trans.general.info12+': <b> x > '+tsalkapone_trans.general.days+'</b>, x: '+tsalkapone_trans.general.info13+'.' +
'<br>3. '+tsalkapone_trans.general.info14+': <b>('+tsalkapone_trans.general.hours+')΄('+tsalkapone_trans.general.mins+')</b>' +
'<br>4. '+tsalkapone_trans.general.info15+': 16:45.' +
'<br><br> <b><font color=red>'+tsalkapone_trans.general.info16+':</font> '+tsalkapone_trans.general.info17+'.</font>' +
'<br><br><b><font color=red>'+tsalkapone_trans.general.info16+':</font> '+tsalkapone_trans.general.info18+'. </b> ' +
'<br><br><center><img src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg"></center><br><font color=darkgreen><center>'+tsalkapone_trans.general.info19+' <a href="https://forum.tribalwars.net/index.php?members/tsalkapone.114063/" title="Tsalkapone\'s profile" target="_blank">Tsalkapone</a></center></font>' +
'</div>';
}

else if (lang == "greek") {
 var content3 = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="red">Εμφάνισης λεηλασίας, τελευταίας επίθεσης και είδος αναφοράς</font></u></center></h2>' +
'<br><b><u><font color=darkgreen>Απεικόνιση Λεηλασίας</b></font></u>' +
'<br><br>1. Όσα χωριά έχετε επιτεθεί και έχουν επιστρέψει τα στρατεύματά σας με πλήρη λεηλασία θα φέρουν το εικονίδιο της πλήρης λεηλασίας.  <img src="/graphic/max_loot/1.png" class="">' +                 
'<br>2. Όσα χωριά έχετε επιτεθεί και είτε τα στρατεύματά σας δεν έχουν λεηλατήσει κανένα πόρο ή έχουν αδειάσει τους πόρους του χωριού θα φέρουν το εικονίδιο της ημιπλήρης λεηλασίας.   <img src="/graphic/max_loot/0.png">' + 
'<br><br><br><b><u><font color=darkgreen>Απεικόνιση είδους Αναφοράς</font></u></b>' +
'<br><br>1. Για κάθε χωριό το είδος αναφοράς απεικονίζεται στο χρωματισμό του φόντου του πλαισίου. Ο χρωματισμός αντιπροσωπεύει τα καθιερωμένα από το παιχνίδι χρώματα των ειδών αναφορών.' +
'<br>2. Εξαιρέσεις:' + 
'<br>2α. Αναφορά με πλήρεις απώλειες αλλά με κατεδάφιση εχθρικού κτιρίου -> <input type="color" value="#FF8C00" disabled>.' +  
'<br>2β. Αναφορά με απώλειες αλλά επιτυχή ανίχνευση -> <input type="color" value="#8B008B" disabled>.' + 
'<br><br><br><b><u><font color=darkgreen>Απεικόνιση ώρας</font></u></b>' +
'<br><br>1. Αν ένα χωριό επιτέθηκε από εσάς σε χρονικό διάστημα μεγαλύτερο από 30 μέρες πριν από την τρέχουσα ημερομηνία θα εμφανιστεί το κείμενο:<b> > μήν</b>.' +   
'<br>2. Αν ένα χωριό επιτέθηκε από εσάς σε χρονικό διάστημα λιγότερο από 30 μέρες και περισσότερες από 2 μέρες πριν από τη τρέχουσα ημερομηνία θα εμφανιστεί το κείμενο: <b> x > (μέρες πριν) μ.</b>, όπου χ οι μέρες που μεσολάβησαν από την τελευταία επίθεση στο συγκεκριμένο χωριό.' +
'<br>3. Αν ένα χωριό επιτέθηκε από εσάς σε χρονικό διάστημα λιγότερο από 2 μέρες αλλά όχι την ίδια μέρα με την τρέχουσα ημερομηνία θα εμφανιστεί το κείμενο: <b>(ώρες)΄(λεπτά πριν)</b>' +
'<br>4. Αν ένα χωριό επιτέθηκε από εσάς τη τρέχουσα μέρα θα εμφανιστεί στο κείμενο η <b>ώρα</b> που επιτεθήκατε, π.χ.: 16:45.' +
'<br><br> <b><font color=red>ΠΡΟΣΟΧΗ:</font> Οι απεικονίσεις αφορούν ΔΙΚΕΣ ΣΑΣ επιθέσεις και όχι συμμάχων, φίλων ή μελών της ίδιας φυλής και αναγνωρίζοναι από αναφορές που ΔΕΝ έχουν διαγραφεί.</font>' +
'<br><br><b><font color=red>ΠΡΟΣΟΧΗ:</font> Λειτουργεί ΜΟΝΟ με ενεργό λογαριασμό premium. </b> ' +
'<br><br><center><img src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg"></center><br><font color=darkgreen><center>Επικοινωνήστε ανά πάσα στιγμή για οποιαδήποτε απορία ή πρόταση σχετικά με τα scripts με τον <a href="https://forum.fyletikesmaxes.gr/member.php?27574-tsalkapone" title="Μετάβαση σε νέα καρτέλα στο προφίλ του Tsalkapone στο εξωτερικό φόρουμ" target="_blank">Tsalkapone.</a></center></font>' +
'</div>';
}

$("#Tsalkaponeinfo").click(function () {
var tsal_protupo = document.getElementById('protupo').value;
if (tsal_protupo=="3"){Dialog.show('map_additional_info', content3);}
else if (tsal_protupo=="1"){Dialog.show('map_additional_info', content1);}
else if (tsal_protupo=="2"){Dialog.show('map_additional_info', content2);}
else if (tsal_protupo=="4"){Dialog.show('map_additional_info', content4);}
else if (tsal_protupo=="5"){Dialog.show('map_additional_info', content5);}
else if (tsal_protupo=="6"){Dialog.show('map_additional_info', content6);}
else if (tsal_protupo=="7"){Dialog.show('map_additional_info', content7);}
else if (tsal_protupo=="0"){
UI.SuccessMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> '+tsalkapone_trans.notes.protupo+'', 3000)
}
});


		
	
	var script={
		name:'Εμφάνισης λεηλασίας στο χάρτη',
		version:1.00,
		minGameVersion:7.00,
		author:{
			name:'Tsalkapone',
			email:'tsalkapone@hotmail.com'
		},
		credit:'(Complete rewrite of the Map Overlay Script by: LastApparatus)',
		runOnce:true
	};
	localStorage.setItem('protupo_map_info',1);
	localStorage.setItem('xronos_map_info',1);
			var myself=this;
	var win=(window.main||window),doc=win.document,$=win.$;
	var chainedFunc=null;
		
	function fnOverlay(sector,data){
	
		var tsal_protupo = document.getElementById('protupo').value;
		
		var world=game_data.world;
		
		var x,y,village,lastAttack,serverDate,now,delta,sec,min,hrs,days,tsalresult,eleDIV,tsalvil,tsalflag,tsalplayer,tsalcolor,tsaldot;
		var tsalplayer=game_data.player.id;
		for(x in data.tiles){
			x=(parseInt(x,10));
			
			for(y in data.tiles[x]){
				
				y=parseInt(y,10);
				village=TWMap.villages[(data.x+x)*1000+data.y+y];
				tsalvil =TWMap.villages[(data.x+x)*1000+data.y+y];

				if(village&&($('#tsalkapone'+village.id).length<=0)&&TWMap.popup._cache[village.id]){
					village=TWMap.popup._cache[village.id];
		
					
	if (tsal_protupo == "1") {
		var protime=document.getElementById('set1').value;
		var pontoi_extra = document.getElementById('pontoi').checked;

		var xronologia = document.getElementById('serverDate').innerHTML;
	var xr = xronologia.split('/');
	var xr1 = xr[0]; var xr2 = xr[1];
	var tsalminas = Number(xr1); var tsalmera = Number(xr2);
var time = document.getElementById('serverTime').innerHTML;
var times = time.split(':');
var ωρα = Number(times[0]); var λεπτα= Number(times[1]); var δευτερα=Number(times[2]);
var tsaltime =[xr1,xr2,ωρα,λεπτα];
var xronos = document.getElementById('xronos').checked;
var tsalres; 
if (JSON.parse(localStorage.getItem('xronos_'+world+'_'+tsalvil.id)) !==null)
{ tsalx = JSON.parse(localStorage.getItem('xronos_'+world+'_'+tsalvil.id)); 

		var tsaldiaforameras; var διαφοραωρας,tsalwres,tsallepta;
		var minas = Number(tsalx[0]); var tsalmera2 = Number(tsalx[1]); var tsalwres = Number(tsalx[2]); var tsallepta = Number(tsalx[3]);
		var διαφοραμηνα = tsalminas - minas;
if (tsalmera >= tsalmera2) {tsaldiaforameras = tsalmera - tsalmera2;}
if (tsalmera < tsalmera2) {
if (minas ==1 || minas ==3 || minas ==5 || minas ==7 || minas ==9 || minas ==10 || minas ==12)
{tsaldiaforameras = tsalmera - tsalmera2 + 31;}
if (minas ==3 || minas ==6 || minas ==8 || minas ==11)
 {tsaldiaforameras = tsalmera - tsalmera2 + 30;}
if (minas ==2)
{tsaldiaforameras = tsalmera - tsalmera2 + 29;}
}	
var διαφοραωρας;
if (ωρα<tsalwres) {διαφοραωρας=ωρα*60 + λεπτα + 24*60 - tsalwres*60 - tsallepta;}
else {διαφοραωρας=ωρα*60 + λεπτα - tsalwres*60 - tsallepta;}
var διαφοραωρας2 = Math.floor((διαφοραωρας)/(60));
var διαφοραωρας3 = Math.floor(διαφοραωρας - (διαφοραωρας2)*60);

var to_xwrio = game_data.village.id;
if (tsalvil.id==to_xwrio && protime == "1" && pontoi_extra==false) 
{document.getElementById('wra_xwriou').innerHTML='<center><font color="maroon"><b>'+tsalkapone_trans.general.vil_time+':</b></font> <font color="red" size="4"><b>'+tsaldiaforameras+tsalkapone_trans.general.day+' '+διαφοραωρας2+tsalkapone_trans.general.hour+'</b></font></center>';}
else if (tsalvil.id==to_xwrio && protime == "2" && pontoi_extra==false) 
{document.getElementById('wra_xwriou').innerHTML='<center><font color="maroon"><b>'+tsalkapone_trans.general.vil_time+':</b></font> <font color="red" size="4"><b>'+διαφοραωρας2+tsalkapone_trans.general.hour+' '+διαφοραωρας3+tsalkapone_trans.general.min+'</b></font></center>';}
if (pontoi_extra==true) {tsalres=tsalvil.points;}
else if (protime == "1")
{tsalres=tsaldiaforameras+tsalkapone_trans.general.day+' '+διαφοραωρας2+tsalkapone_trans.general.hour;}
else if (protime =="2")
{ tsalres=διαφοραωρας2+tsalkapone_trans.general.hour+' '+διαφοραωρας3+tsalkapone_trans.general.min;}


}
else {tsalres='';}

					var tsal_id = tsalvil.id; var tsalpontoi; var tsalpoints; var tsal_points;var tsalplus='';
					var vil_points = tsalvil.points;var vi_points;var v_points;
					if (vil_points.indexOf(".") > -1)
					{	vi_points = vil_points.split('.'); v_points=vi_points[0]+''+vi_points[1];}
				else {v_points = vil_points;}
if(localStorage.getItem('xwrio_'+world+'_'+tsalvil.id)!==null) 
{tsalpontoi = localStorage.getItem('xwrio_'+world+'_'+tsalvil.id);

tsal_points = Math.floor(Number(v_points));
	tsalp = tsal_points - Math.floor(Number(tsalpontoi));
	if (tsalp>=1) {tsalcolor="#00FF9E";tsalplus='';}
	if (tsalp>0&&tsalp<1) {tsalp=0; tsalcolor="#FFFF6F";}
	if (tsalp==0) {tsalcolor="#FFFF6F";}
	if (tsalp<0) {tsalcolor="#FF0000";tsalp=Math.abs(tsalp);}
	} 
else {tsalpontoi=0; tsalcolor="#FF6FF3"; tsal_points = Math.floor(Number(v_points));
	tsalp = Math.floor(tsal_points - tsalpontoi);}
	

tsalresult='<b><font style="font-size:7px;">'+tsalres+'</font> <small>'+tsalplus+tsalp+'</small></b>';

eleDIV=$('<div></div>')
							.css({
								border:'1px coral solid',
								position:'absolute',
								backgroundColor:tsalcolor,
								filter:'alpha(opacity=80)',
								opacity:'.8',
								mozOpacity:'.8',
								width:'53px',
								height:'12px',
								marginTop:'25px',
								display:'block',
								color:'black',
								zIndex:'10',
								fontWeight:'normal',
								textAlign:'center'
							})
							.attr('id','tsalkapone'+village.id)
							.html(tsalresult)
						;

						sector.appendElement(eleDIV[0],data.x+x-sector.x,data.y+y-sector.y);
						if (xronos == true) {
localStorage.setItem('xwrio_'+world+'_'+tsalvil.id,tsal_points);
localStorage.setItem('xronos_'+world+'_'+tsalvil.id,JSON.stringify(tsaltime));
localStorage.setItem('paiktis_'+world+'_'+tsalvil.id,owner);
}
	}
	else if (tsal_protupo == "2") {
		var protime=document.getElementById('set1').value;
var owner = tsalvil.owner;
		var xronologia = document.getElementById('serverDate').innerHTML;
	var xr = xronologia.split('/');
	var xr1 = xr[0]; var xr2 = xr[1];
	var tsalminas = Number(xr1); var tsalmera = Number(xr2);
var time = document.getElementById('serverTime').innerHTML;
var times = time.split(':');
var ωρα = Number(times[0]); var λεπτα= Number(times[1]); var δευτερα=Number(times[2]);
var tsaltime =[xr1,xr2,ωρα,λεπτα];
var xronos = document.getElementById('xronos').checked;

var tsalres; var tsalowner;
if (JSON.parse(localStorage.getItem('xronos_'+world+'_'+tsalvil.id)) !==null && localStorage.getItem('paiktis_'+world+'_'+tsalvil.id) !==null)
{ tsalowner=localStorage.getItem('paiktis_'+world+'_'+tsalvil.id);
tsalx = JSON.parse(localStorage.getItem('xronos_'+world+'_'+tsalvil.id)); 
		var tsaldiaforameras; var διαφοραωρας,tsalwres,tsallepta;
		var minas = Number(tsalx[0]); var tsalmera2 = Number(tsalx[1]); var tsalwres = Number(tsalx[2]); var tsallepta = Number(tsalx[3]);
		var διαφοραμηνα = tsalminas - minas;
if (tsalmera >= tsalmera2) {tsaldiaforameras = tsalmera - tsalmera2;}
if (tsalmera < tsalmera2) {
if (minas ==1 || minas ==3 || minas ==5 || minas ==7 || minas ==9 || minas ==10 || minas ==12)
{tsaldiaforameras = tsalmera - tsalmera2 + 31;}
if (minas ==3 || minas ==6 || minas ==8 || minas ==11)
 {tsaldiaforameras = tsalmera - tsalmera2 + 30;}
if (minas ==2)
{tsaldiaforameras = tsalmera - tsalmera2 + 29;}
}	
var διαφοραωρας;
if (ωρα<tsalwres) {διαφοραωρας=ωρα*60 + λεπτα + 24*60 - tsalwres*60 - tsallepta;}
else {διαφοραωρας=ωρα*60 + λεπτα - tsalwres*60 - tsallepta;}
var διαφοραωρας2 = Math.floor((διαφοραωρας)/(60));
var διαφοραωρας3 = Math.floor(διαφοραωρας - (διαφοραωρας2)*60);

if (protime == "1")
{tsalres=tsaldiaforameras+tsalkapone_trans.general.day+' '+διαφοραωρας2+tsalkapone_trans.general.hour;}
else if (protime =="2")
{ tsalres=διαφοραωρας2+tsalkapone_trans.general.hour+' '+διαφοραωρας3+tsalkapone_trans.general.min;}


}
else {tsalres='';}


					var tsal_id = tsalvil.id; var tsalpontoi; var tsalpoints; var tsal_points;var tsalplus='';
					var vil_points = tsalvil.points;var vi_points;var v_points;
					if (vil_points.indexOf(".") > -1)
					{	vi_points = vil_points.split('.'); v_points=vi_points[0]+''+vi_points[1];}
				else {v_points = vil_points;}
if(localStorage.getItem('xwrio_'+world+'_'+tsalvil.id)!==null && localStorage.getItem('paiktis_'+world+'_'+tsalvil.id) !==null) 
{tsalpontoi = localStorage.getItem('xwrio_'+world+'_'+tsalvil.id);
var tsalcolor2;
tsal_points = Math.floor(Number(v_points));
	tsalp = tsal_points - Math.floor(Number(tsalpontoi)); 
	if (tsalp>1) {tsalcolor2="#058900";tsalplus='';}
	if (tsalp>0&&tsalp<1) {tsalp=0; tsalcolor2="#000000";}
	if (tsalp==0) {tsalcolor2="#000000";}
	if (tsalp<0) {tsalcolor2="#FF0000";}
	
	if (tsalowner!=owner)
	{tsalcolor='#FCFF00';}
else {tsalcolor='#ACF9FF';}
	}
else {tsalpontoi=0; tsalcolor2="#000000"; tsalcolor="#FFFFFF"; tsal_points = Math.floor(Number(v_points));
	tsalp = Math.floor(tsal_points - tsalpontoi);}
	
tsalresult='<b><font style="font-size:7px;">'+tsalres+'</font> <small>'+tsalp+'</small></b>';

eleDIV=$('<div></div>')
							.css({
								border:'1px coral solid',
								position:'absolute',
								backgroundColor:tsalcolor,
								filter:'alpha(opacity=80)',
								opacity:'.8',
								mozOpacity:'.8',
								width:'53px',
								height:'12px',
								marginTop:'25px',
								display:'block',
								color:tsalcolor2,
								zIndex:'10',
								fontWeight:'normal',
								textAlign:'center'
							})
							.attr('id','tsalkapone'+village.id)
							.html(tsalresult)
						;

						sector.appendElement(eleDIV[0],data.x+x-sector.x,data.y+y-sector.y);
						if (xronos == true) {
						localStorage.setItem('xwrio_'+world+'_'+tsalvil.id,tsal_points);
						localStorage.setItem('xronos_'+world+'_'+tsalvil.id,JSON.stringify(tsaltime));
localStorage.setItem('paiktis_'+world+'_'+tsalvil.id,owner);
						}
	}
	
else if (tsal_protupo == "4" && tsalvil.owner == tsalplayer) {
var tsalflag='';
var tsalcolor1;
if (village.flag)	
{ var flag_img = village.flag.image_path.split('//');
var flag_img1 = flag_img[1].split('/');
var flag1=flag_img1[6];
var flag = village.flag.short_desc.split(' ');
 var flag2=flag[1];
if (flag1.indexOf('1')> -1) {tsalcolor='#A2A2A2';tsalcolor1='black';}
if (flag1.indexOf('2')> -1) {tsalcolor='#B08D5B';tsalcolor1='black';}
if (flag1.indexOf('3')> -1) {tsalcolor='#FF002F';tsalcolor1='black';}
if (flag1.indexOf('4')> -1) {tsalcolor='#FFFC00';tsalcolor1='black';}
if (flag1.indexOf('5')> -1) {tsalcolor='#00C123';tsalcolor1='black';}
if (flag1.indexOf('6')> -1) {tsalcolor='#4B4EFF';tsalcolor1='black';}
if (flag1.indexOf('7')> -1) {tsalcolor='#00EFFF';tsalcolor1='black';}
if (flag1.indexOf('8')> -1) {tsalcolor='#FF47F7';tsalcolor1='black';}
if (flag1.indexOf('9')> -1) {tsalcolor='#010101';tsalcolor1='white';}
tsalresult='<font style="font-size:8px;"><b>'+flag2+'</b></font>';}	
else {
	tsalcolor='#FFFFFF'; tsalresult='<font style="font-size:8px;"><b>'+tsalkapone_trans.general.noflag+'</b></font>';
tsalcolor1='black';}
eleDIV=$('<div></div>')
							.css({
								border:'1px coral solid',
								position:'absolute',
								backgroundColor:tsalcolor,
								filter:'alpha(opacity=80)',
								opacity:'.8',
								mozOpacity:'.8',
								width:'53px',
								height:'12px',
								marginTop:'25px',
								display:'block',
								color:tsalcolor1,
								zIndex:'10',
								fontWeight:'normal',
								textAlign:'center'
							})
							.attr('id','tsalkapone'+village.id)
							.html(tsalresult)
						;

						sector.appendElement(eleDIV[0],data.x+x-sector.x,data.y+y-sector.y);
}
else if (tsal_protupo == "6" && tsalvil.bonus !== null) {

var tsalcolor1='black';
var bonus = tsalvil.bonus;
var bonus1=bonus[1].split('/');
var bonus2=bonus1[1].split('.');
var tsalbonus=bonus2[0];

tsalresult='<font style="font-size:12px;"><b>'+tsalbonus+'</b></font>';
tsalcolor='#E3FF50';

eleDIV=$('<div></div>')
							.css({
								border:'1px coral solid',
								position:'absolute',
								backgroundColor:tsalcolor,
								filter:'alpha(opacity=80)',
								opacity:'.8',
								mozOpacity:'.8',
								width:'53px',
								height:'12px',
								marginTop:'25px',
								display:'block',
								color:tsalcolor1,
								zIndex:'10',
								fontWeight:'normal',
								textAlign:'center'
							})
							.attr('id','tsalkapone'+village.id)
							.html(tsalresult)
						;

						sector.appendElement(eleDIV[0],data.x+x-sector.x,data.y+y-sector.y);
}
else if (tsal_protupo == "5" && tsalvil.owner == tsalplayer) {
var tsalcolor1; 
var units=village.units;
var epilogi = document.getElementById('set2').value;
if (units.archer.count.home) 
{ tsalcolor1='black'; 
var archer=Number(units.archer.count.home) + Number(units.archer.count.foreign);
	var heavy=Number(units.heavy.count.home) + Number(units.heavy.count.foreign);
var spear=Number(units.spear.count.home) + Number(units.spear.count.foreign);
var sword=Number(units.sword.count.home) + Number(units.sword.count.foreign);
var catapult=Number(units.catapult.count.home) + Number(units.catapult.count.foreign);
	var amuntika =archer+heavy+spear+sword+catapult;
	var farm = heavy*6+spear+sword+archer+catapult*8;
	var od = heavy*23+spear*4+sword*5+archer*5+catapult*12;
var tsalfarm = (farm/21000).toFixed(1);
var tsalod = (od/85000).toFixed(1);
if (tsalfarm<2) {tsalcolor='#FFFFFF';} else if (tsalfarm>=2 && tsalfarm<=3) {tsalcolor='#FFFA57';} 
else if (tsalfarm>3 && tsalfarm<=4) {tsalcolor='#ABFF00';} 
else if (tsalfarm>4 && tsalfarm<=5) {tsalcolor='#00B047';} 
else if (tsalfarm>5 && tsalfarm<=6) {tsalcolor='#00FFE2';}
else if (tsalfarm>6) {tsalcolor='#037CBD';}
var tsalex;
if (epilogi=="1") {tsalex=tsalfarm;} else if (epilogi=="2") {tsalex=tsalod;}
tsalresult='<font style="font-size:7px;"><b>'+amuntika+'</font>|<font style="font-size:9px;color:red;">'+tsalex+'</b></font>';
}
else { tsalcolor='black'; 
	var heavy=Number(units.heavy.count.home) + Number(units.heavy.count.foreign);
var spear=Number(units.spear.count.home) + Number(units.spear.count.foreign);
var sword=Number(units.sword.count.home) + Number(units.sword.count.foreign);
var catapult=Number(units.catapult.count.home) + Number(units.catapult.count.foreign);
	var amuntika =heavy+spear+sword+catapult;
	var farm = heavy*6+spear+sword+catapult*8;
	var od = heavy*23+spear*4+sword*5+catapult*12;
	var tsalfarm = (farm/21000).toFixed(1);
	var tsalod = (od/85000).toFixed(1);
	if (tsalfarm<2) {tsalcolor='#FFFFFF';} else if (tsalfarm>=2 && tsalfarm<=3) {tsalcolor='#FFFA57';} 
else if (tsalfarm>3 && tsalfarm<=4) {tsalcolor='#ABFF00';} 
else if (tsalfarm>4 && tsalfarm<=5) {tsalcolor='#00B047';} 
else if (tsalfarm>5 && tsalfarm<=6) {tsalcolor='#00FFE2';}
else if (tsalfarm>6) {tsalcolor='#037CBD';}
var tsalex;
if (epilogi=="1") {tsalex=tsalfarm;} else if (epilogi=="2") {tsalex=tsalod;}
tsalresult='<font style="font-size:7px;"><b>'+amuntika+'</font>|<font style="font-size:9px;color:red;">'+tsalex+'</b></font>';
}

eleDIV=$('<div></div>')
							.css({
								border:'1px coral solid',
								position:'absolute',
								backgroundColor:tsalcolor,
								filter:'alpha(opacity=80)',
								opacity:'.8',
								mozOpacity:'.8',
								width:'53px',
								height:'12px',
								marginTop:'25px',
								display:'block',
								color:tsalcolor1,
								zIndex:'10',
								fontWeight:'normal',
								textAlign:'center'
							})
							.attr('id','tsalkapone'+village.id)
							.html(tsalresult)
						;

						sector.appendElement(eleDIV[0],data.x+x-sector.x,data.y+y-sector.y);
}
else if (tsal_protupo == "7" && tsalvil.owner == tsalplayer) {
var tsalcolor1; 
var units=village.units;
var epilogi = document.getElementById('set2').value;
if (units.marcher.count.home) 
{ tsalcolor1='black'; 
var marcher=Number(units.marcher.count.home);
var axe=Number(units.axe.count.home);
var light=Number(units.light.count.home);
var ram=Number(units.ram.count.home);	
var heavy=Number(units.heavy.count.home);
var snob=Number(units.snob.count.home);
	var amuntika =marcher+axe+light+ram+heavy;
	var farm = marcher*5+axe+light*4+ram*5+heavy*6;
	var od = marcher*12+axe*4+light*13+ram*8+heavy*15;
var tsalfarm = (farm/19000).toFixed(1);
var tsalod = (od/72000).toFixed(1);
if (tsalfarm<2) {tsalcolor='#FFFFFF';} else if (tsalfarm>=2 && tsalfarm<=3) {tsalcolor='#FFFA57';} 
else if (tsalfarm>3 && tsalfarm<=4) {tsalcolor='#ABFF00';} 
else if (tsalfarm>4 && tsalfarm<=5) {tsalcolor='#00B047';} 
else if (tsalfarm>5 && tsalfarm<=6) {tsalcolor='#00FFE2';}
else if (tsalfarm>6) {tsalcolor='#037CBD';}
var tsalex;var tsalex1;
if (epilogi=="1") {tsalex=tsalfarm;} else if (epilogi=="2") {tsalex=tsalod;}
if (tsalex>1) {tsalex1=1;} else {tsalex1=tsalex;}
tsalresult='<font style="font-size:10px;"><b>'+snob+'</font> <img height="13px;" width="11px;" src="graphic/unit_map/snob.png">|<font style="font-size:10px;color:red;">'+tsalex1+'</b></font>';
}
else { tsalcolor='black'; 
var axe=Number(units.axe.count.home);
var light=Number(units.light.count.home);
var ram=Number(units.ram.count.home);	
var heavy=Number(units.heavy.count.home);
var snob=Number(units.snob.count.home);
	var amuntika =axe+light+ram+heavy;
	var farm = axe+light*4+ram*5+heavy*6;
	var od = axe*4+light*13+ram*8+heavy*15;
	var tsalfarm = (farm/19000).toFixed(1);
	var tsalod = (od/72000).toFixed(1);
	if (tsalfarm<2) {tsalcolor='#FFFFFF';} else if (tsalfarm>=2 && tsalfarm<=3) {tsalcolor='#FFFA57';} 
else if (tsalfarm>3 && tsalfarm<=4) {tsalcolor='#ABFF00';} 
else if (tsalfarm>4 && tsalfarm<=5) {tsalcolor='#00B047';} 
else if (tsalfarm>5 && tsalfarm<=6) {tsalcolor='#00FFE2';}
else if (tsalfarm>6) {tsalcolor='#037CBD';}
var tsalex; var tsalex1;
if (epilogi=="1") {tsalex=tsalfarm;} else if (epilogi=="2") {tsalex=tsalod;}
if (tsalex>1) {tsalex1=1;} else {tsalex1=tsalex;}
tsalresult='<font style="font-size:10px;"><b>'+snob+'</font> <img height="13px;" width="11px;" src="graphic/unit_map/snob.png">|<font style="font-size:10px;color:red;">'+tsalex1+'</b></font>';
}

eleDIV=$('<div></div>')
							.css({
								border:'1px coral solid',
								position:'absolute',
								backgroundColor:tsalcolor,
								filter:'alpha(opacity=80)',
								opacity:'.8',
								mozOpacity:'.8',
								width:'53px',
								height:'14px',
								marginTop:'25px',
								display:'block',
								color:tsalcolor1,
								zIndex:'10',
								fontWeight:'normal',
								textAlign:'center'
							})
							.attr('id','tsalkapone'+village.id)
							.html(tsalresult)
						;

						sector.appendElement(eleDIV[0],data.x+x-sector.x,data.y+y-sector.y);
}
else if (tsal_protupo == "3") {
if(village.attack){
						tsaldot=village.attack.dot; 
						tsalcolor=((tsaldot==1)?'#0bff1f':(tsaldot==2)?'#fcff0b':(tsaldot==3)?'#ff0000':(tsaldot==4)?'#00FFF7':(tsaldot==5)?'#FFAF00':'#E977FF');
						
						lastAttack=new Date(village.attack.time.split(' o')[0]);
						serverDate=$('#serverDate').html().split('/');
						now=new Date(serverDate[1]+'/'+serverDate[0]+'/'+serverDate[2]+' '+$('#serverTime').html());
						delta=now.getTime()-lastAttack.getTime();
						Tsaltime = village.attack.time.match(/\d+\:\d+/g);
			var tsalxronologia = $('#serverDate').text().split('/');  
				var tsalyear = Number(tsalxronologia[2]);
				   var tsalminas=Number(tsalxronologia[1]);
				var tsalmera = Number(tsalxronologia[0]);
                        var tsalxronos = $('#serverTime').text();
				var tsalxronoi = tsalxronos.split(':');
				var ωρα = Number(tsalxronoi[0]);
				var λεπτα = Number(tsalxronoi[1]);
				var δευτερα = tsalxronoi[2];
						var mines ="";
Tsaldate = village.attack.time.match(/\d+\,\d+/g);
						var tsaldate2 = village.attack.time.split(' ');
						var tsaldate21 = tsaldate2[1].split(',');
						var minas = tsaldate2[0].split(' ');
						var tsaldate4 = tsaldate2[2].split(':');
						var tsalwres = Number(tsaldate4[0]);
						var tsallepta = Number(tsaldate4[1]);


						var tsalxronos2 = Number(tsaldate21[1]);
					var apotelesma="";
						var tsalmera2 = Number(tsaldate21[0]);
						
						if (minas ==""+tsalk_trans.tw.mon11+"")  { mines+=11;}
						if (minas ==""+tsalk_trans.tw.mon10+"")  { mines+=10;}
						if (minas ==""+tsalk_trans.tw.mon9+"")  { mines+=9;}
						if (minas ==""+tsalk_trans.tw.mon12+"")  { mines+=12;}
						if (minas ==""+tsalk_trans.tw.mon1+"")  { mines+=1;}
						if (minas ==""+tsalk_trans.tw.mon2+"")  { mines+=2;}
						if (minas ==""+tsalk_trans.tw.mon3+"" || minas =="Μαρ")  { mines+=3;}
						if (minas ==""+tsalk_trans.tw.mon4+"")  { mines+=4;}
						if (minas ==""+tsalk_trans.tw.mon5+"")  { mines+=5;}
						if (minas ==""+tsalk_trans.tw.mon6+"" || minas==""+tsalk_trans.tw.mon6_2+"")  { mines+=6;}
						if (minas ==""+tsalk_trans.tw.mon7+"" || minas==""+tsalk_trans.tw.mon6_2+"")  { mines+=7;}
						if (minas ==""+tsalk_trans.tw.mon8+"")  { mines+=8;}
					var διαφοραμηνα = tsalminas - mines;

if (tsalmera >= tsalmera2) {var tsaldiaforameras = tsalmera - tsalmera2;}
if (tsalmera < tsalmera2) {
if (minas ==""+tsalk_trans.tw.mon1+"" || minas ==""+tsalk_trans.tw.mon3+"" || minas =="Μαρ" || minas ==""+tsalk_trans.tw.mon5+"" || minas ==""+tsalk_trans.tw.mon7+"" || minas==""+tsalk_trans.tw.mon7_2+"" || minas ==""+tsalk_trans.tw.mon9+"" || minas ==""+tsalk_trans.tw.mon10+"" || minas ==""+tsalk_trans.tw.mon12+"")
{var tsaldiaforameras = tsalmera - tsalmera2 + 31;}
if (minas ==""+tsalk_trans.tw.mon3+"" || minas ==""+tsalk_trans.tw.mon6+"" || minas==""+tsalk_trans.tw.mon6_2+"" || minas ==""+tsalk_trans.tw.mon8+"" || minas ==""+tsalk_trans.tw.mon11+"")
 {var tsaldiaforameras = tsalmera - tsalmera2 + 30;}
if (minas ==""+tsalk_trans.tw.mon2+"")
{var tsaldiaforameras = tsalmera - tsalmera2 + 29;}
}
		
if (ωρα<tsalwres) {var διαφοραωρας=ωρα*60 + λεπτα + 24*60 - tsalwres*60 - tsallepta;}
else {var διαφοραωρας=ωρα*60 + λεπτα - tsalwres*60 - tsallepta;}
var διαφοραωρας2 = Math.floor((διαφοραωρας)/(60));
var διαφοραωρας3 = διαφοραωρας - (διαφοραωρας2)*60;

						var μηνας ="";
						
						if (διαφοραμηνα >=2) {μηνας+="> 1 "+tsalkapone_trans.general.month+"";}
						if (διαφοραμηνα >=0 && διαφοραμηνα<2) {μηνας+=διαφοραμηνα;}
						if (διαφοραμηνα <0 && διαφοραμηνα+12>2) {μηνας+="> 1 "+tsalkapone_trans.general.month+"";}
						if (διαφοραμηνα <0 && διαφοραμηνα+12<2) {μηνας+=διαφοραμηνα+12;}
if(διαφοραμηνα <0 && διαφοραμηνα+12>=2 || διαφοραμηνα >=2) {apotelesma+=">"+tsalkapone_trans.general.month+"";}
else if (tsaldiaforameras >=2) {apotelesma+=">"+tsaldiaforameras+""+tsalkapone_trans.general.days+"";}
else if (tsaldiaforameras==1 && ωρα<tsalwres) { apotelesma+=διαφοραωρας2+"'"+διαφοραωρας3;}
else if (tsaldiaforameras==1 && ωρα>=tsalwres) { apotelesma+=24+διαφοραωρας2+"'"+διαφοραωρας3;}
else if (tsaldiaforameras==0) {apotelesma+=Tsaltime;}
var meres = Math.round(μηνας*24);


		
		
						if(village.attack.max_loot==1) {
							tsalresult='<img align="left" src="/graphic/max_loot/1.png"> <b>'+apotelesma+'</b>';
						}
						else{
							tsalresult='<img align="left" src="/graphic/max_loot/0.png"> <b>'+apotelesma+'</b>';
						}

					eleDIV=$('<div></div>')
							.css({
								border:'1px coral solid',
								position:'absolute',
								backgroundColor:tsalcolor,
								filter:'alpha(opacity=80)',
								opacity:'.8',
								mozOpacity:'.8',
								width:'53px',
								height:'12px',
								marginTop:'25px',
								display:'block',
								color:'black',
								zIndex:'10',
								fontWeight:'normal',
								textAlign:'center'
							})
							.attr('id','tsalkapone'+village.id)
							.html(tsalresult)
						;

						sector.appendElement(eleDIV[0],data.x+x-sector.x,data.y+y-sector.y);
}		}	
				
					
				}
			}
		}
	}

	function fnSpawnSectorHook(data,sector){
		if(chainedFunc){
			chainedFunc.call(this,data,sector);
		}
		
		$(doc).ajaxStop(function(){fnOverlay(sector,data);});
	}


$('#efarmogi').click(function(){
	var tsal_protupo = document.getElementById('protupo').value;
	if (tsal_protupo == "0") {
UI.ErrorMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> '+tsalkapone_trans.notes.protupo+'', 3000)
}		else {
	var url=win.location.href;

			
				if(!TWMap.tsalkaponeHook){
					TWMap.tsalkaponeHook=true;
					
					
					chainedFunc=TWMap.mapHandler.spawnSector;
					TWMap.mapHandler.spawnSector=fnSpawnSectorHook;
					TWMap.map.handler.spawnSector=fnSpawnSectorHook;
	
					TWMap.scriptMode=true;
					TWMap.map._loadedSectors={};
					TWMap.reload();
				}
				}
				});
				
				$('#diagrafi').click(function(){
	var keys = Object.keys(localStorage),
    prefix = "xronos_";
for (var i = 0; i < keys.length; i += 1) {
    if (keys[i].indexOf(prefix) === 0) {
        localStorage.removeItem(keys[i]);
    }
}			
var keys1 = Object.keys(localStorage),
    prefix1 = "xwrio_";
for (var i = 0; i < keys1.length; i += 1) {
    if (keys1[i].indexOf(prefix1) === 0) {
        localStorage.removeItem(keys1[i]);
    }
}

var keys2 = Object.keys(localStorage),
    prefix2 = "paiktis_";
for (var i = 0; i < keys2.length; i += 1) {
    if (keys2[i].indexOf(prefix2) === 0) {
        localStorage.removeItem(keys2[i]);
    }
}
UI.SuccessMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> '+tsalkapone_trans.notes.diagrafi+'', 5000)
setTimeout(function (){location.reload();},5000);				});
			
			
		}

	

	
			