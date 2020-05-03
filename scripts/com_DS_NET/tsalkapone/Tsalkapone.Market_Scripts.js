/*
		scriptname:	Market Tools
		version:	1.0.0
		created: June 18, 2016
 		game version:	version	8.48.1
 		author:		Tsalkapone (tsalkapone@hotmail.com)
 
 ==== pages where this can be used ==== 
 * Market pages (Premium Exchange, Send Resources, My Offers)
  
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

function tsalkaponetool_ready() {
var get_lang = localStorage.getItem("market_scripts_lang");
    var lang="";
	var tsal_market=game_data.market;
    if (get_lang === null) 	 {if (tsal_market=="it") {lang="italian";}
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
	 script:"Market Tools",
	 script2:"Resources Balancer",
	 notification:"Notification from",
         selected_one:"Current selected language",
         available:"Available languages",
		 button_list:"Buttons List",
		 lang_sel:"Click to change the selected language",		
		message_no:"No",
		message_no1:"Go to Premium Exchange",
		message_no2:"Go to My Offers",
		message_no3:"Go to Send Resources",
		message_1:"This script is activated on the following Market's pages",
		message_2:"Premium Exchange, My Offers, Send Resources",
		message_3:" Do you want to automatically assign your location to one of these pages?",
		comm:"Feel free to send any message regarding script bugs or proposing ideas to",
		des:"Function description",
		but:"Buttons",
		edited_by:"Edited by",
		res_list:"Template's Settings",
		temp:"Template",
		title:"Template's title",
		wood:"Wood",
		clay:"Clay",
		iron:"Iron",
		syn:"Targets' coordinates",
		key:"Shortcut key",
		info_1:"<b><u>Title</u></b><br> Enter a title for each template.<br><br><b><u>Resources</u></b><br> Enter the value of each resource to be inserted in the relevant fields. <br><br><b><u>Targets</u></b><br> Enter the coordinates of the villages to send the selected resources. <br><br><b><u>Shortcut key</u></b><br> Enter a character (e.g. u) or a combination of characters (e.g. k+a) from your keyboard to assign to each template's function.<br><br> <b><u>Only one type of resource</u></b><br> Select only one type of resource to use all the available merchants to send the maximum value of this resource.",
	allwood:"Only wood",
	allclay:"Only clay",
	alliron:"Only iron",
	balance:"Balance Resources",
	offer:"Enter the amount of resource you want to offer",
	ask:"Enter the amount of resource you want to ask",
	dis:"Enter the maximum merchants' travel distance",
	info1:"Click to apply the selected settings. The script will balance the amount of the resource in the highest quantity and the resource in the lowest quantity making the needed offers using the values you selected.",
	info2:"Enter the amount of resource you will offer to each market offer you will make.",
	info3:"Enter the amount of resource you will ask to each market offer you will make.",
	info4:"Enter the allowed maximum travel distance of your merchants for each market offer you will make.",
	script3:"Premium Exchange Alarm",
	res_type:"Resource type",
	avail:"Available resources",
	capacity:"Stock capacity",
	alarm:"Quantity alarm",
	info5:"Every time a resource type is equal or exceeds the entered value in <b>Quantity alarm</b> the function of the script ceases and a video-song appears on the screen alarming you there is available amount to exchange.<br>The available resource type is highlighted with red color.<br><br> Click <b>Restart</b> to restart the script's function or refresh the page and re-activate the script. <br><br><b><font color='red'><u>Attention:</u></font></b><br>You have to keep the page-tab active for the alarm-function to work properly. Alternatively, you may open it on a new browser window while you keep playing on other window.",
	info6:"Save the entered value<br> on <b>Quantity alarm</b>",
	alarm_note:"The calculation of available resources and stock capacity has been stopped.",
		},
		tw:{
			create:"Create",
		},
	buttons:{
			  lang_open:"Open language selection",
              lang_close:"Close language selection",
			   save:"Save Settings",
			 hide:"Hide Settings",
			 bal_set:"Settings",
			 save_title:"Click here to save the selected settings of this script. <br><br> If you dont save the settings the selected values wont be applied.",
			 hide_title:"Click here to hide the current settings menu.",
			rest:"Restart",
	},
	notes:{
		activated:"The Market Tools script is already active",
		last:"These are the last selected coords. Activate the script again to restart.",
		values:"No saved values detected. You have to save the script settings values to operate the script.",
		saved:"The selected values have been successfully saved.",
		coords:"No selected coords were detected. Define some targets and try again.",
	},

};
tsalkapone_trans.italian= { 
	 general:{ 
	 script:"Tool per il mercato",
	 script2:"Bilancia risorse",
	 notification:"Notifica da",
            selected_one:"Lingua selezionata",
            available:"Lingue disponibili",
			button_list:"Lista tasti",
			lang_sel:"Clicca per cambiare la lingua selezionata",
			message_no:"No",
		message_no1:"Vai a Cambio del Premium",
		message_no2:"Vai alle Mie Offerte",
		message_no3:"Vai su Invia Risorse",
		message_1:"Lo script è attivo solo sulle seguenti pagine del mercato",
		message_2:"Cambio del Premium, Mie Offerte, Invia risorse",
		message_3:"Vuoi cambiare automaticamente pagina ?",
		comm:"Sentiti libero di inviare messaggi di ringraziamento o di segnalazioni bug o proposte a",
		des:"Descrizione funzione",
		but:"Tasti",
		edited_by:"Editato da",
		res_list:"Impostazioni template",
		temp:"Template",
		title:"Titolo template",
		wood:"Legno",
		clay:"Argilla",
		iron:"Ferro",
		syn:"Coordinate obiettivi",
		key:"Scorciatoia",
		info_1:"<b><u>Τitolo</u></b><br> Inserisci un titolo per ogni template.<br><br><b><u>Risorse</u></b><br> Inserisci il valore di ogni risorsa da inserire nel rispettivo campo di testo. <br><br><b><u>Obiettivi</u></b><br> Inserisci le coordinate dei villaggi a cui mandare le risorse selezionate. <br><br><b><u>Scorciatoia</u></b><br> Inserisci un carattere (Es. u) o una combinazione di caratteri (Es. k+a) dalla tua tastiera da assegnare ad ogni funzione del template.<br><br> <b><u>Solo un tipo di risorse</u></b><br> Seleziona un solo tipo di risorsa da tutti i mercanti disponibili per inviare il massimo valore di questa risorsa. ",
allwood:"Solo Legno",
	allclay:"Solo Argilla",
	alliron:"Solo Ferro",
	balance:"Bilancia risorse",
	offer:"Inserisci la quantità di risorse che vuoi offrire",
	ask:"Inserisci la quantità di risorse che vuoi chiedere ",
	dis:"Inserisci la distanza massima di viaggio per i mercanti",
	info1:"Clicca per aggiornare i settaggi selezionati. Lo script bilancerà il tipo di risorsa con maggiori quantità, con la risorsa di quantità minore con le offerte necessarie usando i valori selezionati ",
	info2:"Inserisci la quantità di risorse da offrire ad ogni offerta che farai sul mercato.",
	info3:"Inserisci la quantità di risorse da chiedere ad ogni offerta che farai sul mercato.",
	info4:"Inserisci la distanza massima di viaggio dei tuoi mercanti per ogni offerta che farai sul mercato.",
	script3:"Allarme Cambio del Premium",
	res_type:"Tipo risorse",
	avail:"Risorse disponibili",
	capacity:"Capacità magazzino",
	alarm:"Allarme per quantità",
	info5:"Ogni volta che un tipo di risorsa è uguale o supera il valore inserito nell' <b>Allarme per quantità</b> smette di funzionare lo script e una canzone/video appare su schermo avvertendoti della disponibilità di risorse da scambiare.<br> >Il tipo di risorse disponibili è evidenziato con un colore rosso.<br><br> Clicca <b>Ricomincia</b> per ricominciare ad usare questa funzione o aggiorna la pagina e riattiva lo script. <br><br><b><font color='red'><u>Attenzione:</u></font></b><br> devi lasciare la pagina/tab attiva affinchè lo script funzioni in modo opportuno. Altrimenti, puoi aprirla in una nuova finestra del browser, mentre giochi con un'altra finestra.",
	info6:"Salve il valore inserito<br> su <b>Allarme per quantità</b>",
	alarm_note:"Il calcolo di risorse disponibili e capacità immagazzinamento è stato fermato.",
	},
		tw:{
			create:"Crea",
		},
	buttons:{		
			  lang_open:"Apri selezione lingua",
              lang_close:"Chiudi selezione lingua",
			   save:"Salva impostazioni",
			 hide:"Nascondi impostazioni",
			 bal_set:"Impostazioni",
			 rest:"Ricomincia",
			 save_title:"Clicca qui per salvare le impostazioni selezionate di questo script. <br><br> Se non salvi le impostazioni, i valori selezionati non saranno applicati.",
			 hide_title:"Clicca qui per nascondere il menu impostazioni selezionato.",

	},
		notes:{
		activated:"Il tool per il mercato è già attivo",
		last:"Queste sono le ultime coordinate selezionate. Attiva di nuovo lo script per ricominciare.",
		values:"Nessun valore salvato trovato. Devi salvare i valori dei settaggi per usare questo script.",
		saved:"I valori selezionati sono stati salvati con successo.",
		coords:"Nessuna coordinata selezionata è stata trovata. Definisci qualche obiettivo e riprova.",
	},

};
tsalkapone_trans.greek= { 
	 general:{ 
	 script:"Εργαλεία Αγοράς",
	 script2:"Εξισορρόπηση Πόρων",
	 notification:"Ειδοποίηση από τον",
            selected_one:"Ενεργή γλώσσα",
            available:"Διαθέσιμες γλώσσες",
			button_list:"Πίνακας πλήκτρων",
			lang_sel:"Επιλέξτε για να αλλάξετε την επιλεγμένη γλώσσσα",
			message_no:"Όχι",
		message_no1:"Ανταλλαγή Premium",
		message_no2:"Οι προσφορές μου",
		message_no3:"Αποστολή πόρων",
		message_1:"Το συγκεκριμένο script ενεργοποιείται στις ακόλουθες σελίδες της Αγοράς",
		message_2:"Ανταλλαγή Premium, Οι προσφορές μου, Αποστολή πόρων",
		message_3:"Επιθυμείτε αυτόματη ανακατεύθυνση σε μία από τις παραπάνω σελίδες;",
		comm:"Επικοινωνήστε ανά πάσα στιγμή για οποιαδήποτε ιδέα ή πρόταση σχετικά με τα scripts με τον",
		des:"Περιγραφή λειτουργίας",
		but:"Πλήκτρα",
		edited_by:"Δημιουργήθηκε από τον",
		res_list:"Ρυθμίσεις Πρότυπου",
		temp:"Πρότυπο",
		title:"Τίτλος πρότυπου",
		wood:"Ξύλο",
		clay:"Πηλός",
		iron:"Σίδερο",
		syn:"Συντεταγμένες στόχων",
		key:"Πλήκτρο Συντόμευσης",
		info_1:"<b><u>Τίτλος</u></b><br> Εισάγετε ένα τίτλο για το κάθε πρότυπο.<br><br><b><u>Πόροι</u></b><br> Εισάγετε μια τιμή για κάθε είδος πόρου για να εισαχθεί στα αντίστοιχα πεδία. <br><br><b><u>Στόχοι</u></b><br> Εισάγετε τις συντεταγμένες των χωριών στα οποία επιθυμείτε να στείλετε πόρους. <br><br><b><u>Πλήκτρο συντόμευσης</u></b><br> Εισάγετε ένα χαρακτήρα (π.χ. Κ) ή ένα συνδυασμό χαρακτήρων (π.χ. Κ+Α) από το πληκτρολόγιό σας για να ενεργοποιείστε τη λειτουργία κάθε πρότυπου.<br><br> <b><u>Μόνο ένα είδος πόρου</u></b><br> Επιλέξτε τη συγκεκριμένη ρύθμιση για να χρησιμοποιήστε όλους τους διαθέσιμους εμπόρους για τη μεταφορά ενός μόνο πόρου.",
allwood:"Μόνο ξύλο",
	allclay:"Μόνο πηλό",
	alliron:"Μόνο σίδερο",
	balance:"Εξισορρόπηση Πόρων",
	offer:"Εισάγετε την ποσότητα προσφοράς",
	ask:"Εισάγετε την ποσότητα ζήτησης",
	dis:"Εισάγετε μέγιστη απόσταση εμπόρων",
	info1:"Επιλέξτε για την εφαρμογή των επιλεγμένων ρυθμίσεων. Το script θα δημιουργήσει προσφορές στην αγορά με τις επιλεγμένες τιμές για να εξισορροπήσει τις μονάδες του πόρου που βρίσκεται στη μεγαλύτερη ποσότητα με τις μονάδες του πόρου με τη μικρότερη ποσότητα.",
	info2:"Εισάγετε τη ποσότητα ζήτησης πόρου για κάθε προσφορά αγοράς.",
	info3:"Εισάγετε τη ποσότητα προσφοράς πόρου για κάθε προσφορά αγοράς.",
	info4:"Εισάγετε την μέγιστη επιτρεπόμενη απόσταση των εμπόρων για κάθε προσφορά αγοράς.",
	script3:"Ειδοποίηση Ανταλλαγής Premium",
	res_type:"Είδος πόρου",
	avail:"Διαθέσιμοι πόροι",
	capacity:"Διαφορά χωρητικότητας",
	alarm:"Εισάγετε ποσότητα ειδοποίησης",
	info5:"Κάθε φορά που ένα είδος πόρου είναι ίσο ή υπερβαίνει τη <b>ποσότητα ειδοποίησης</b> η λειτουργία του scrip σταματά και ένας ήχος ακούγεται στην οθόνη. <br><br> Επιλέξτε <b>Επανεκκίνηση</b> ή ανανέωση σελίδας για επανεκκίνηση της λειτουργίας του script. <br><br><b><font color='red'><u>Προσοχή:</u></font></b><br>Πρέπει να διατηρήσετε ενεργή τη σελίδα του browser για να εκτελείται η λειτουργία ειδοποίησης. Εναλλακτικά, εκτελέστε το script σε νέο παράθυρο ενώ μπορείτε να παίζετε σε άλλο ανοικτό παράθυρο.",
	info6:"Αποθηκεύστε τη τιμή<br> <b>ποσότητα ειδοποίησης</b>",
	alarm_note:"Η λειτουργία υπολογισμού διαθέσιμης χωρητικότητας και πόρων έχει διακοπεί",
	},
		tw:{
			create:"Δημιουργία",
		},
	buttons:{		
			  lang_open:"Άνοιγμα επιλογής γλώσσας",
              lang_close:"Κλείσιμο επιλογής γλώσσας",
			   save:"Αποθήκευση Ρυθμίσεων",
			 hide:"Απόκρυψη Ρυθμίσεων",
			 bal_set:"Ρυθμίσεις",
			 rest:"Επανεκκίνηση",
			 save_title:"Επιλέξτε εδώ για να αποθηκεύσετε τις επιλεγμένες τιμές του συγκεκριμένου script. <br><br> Σε περίπτωση που δεν αποθηκεύσετε τις ρυθμίσεις οι επιλεγμένες τιμές δεν θα εφαρμοστούν.",
			 hide_title:"Επιλέξτε εδώ για να κλείσετε το τρέχον μενού των ρυθμίσεων.",

	},
		notes:{
		activated:"Το script Εργαλεία Αγοράς έχει ήδη ενεργοποιηθεί",
		last:"Αυτές είναι οι τελευταίες αποθηκευμένες συντεταγμένες. Ενεργοποιήστε εκ νέου το script για επανεκκίνηση της ακολουθίας.",
		values:"Δεν εντοπίστηκαν αποθηκευμένες τιμές. Πρέπει να αποθηκεύσετε τις ρυθμίσεις του script πριν το ενεργοποιήσετε.",
		saved:"Οι επιλεγμένες ρυθμίσεις αποθηκεύτηκαν επιτυχώς.",
		coords:"Δεν εντοπίστηκαν αποθηκευμένες συντεταγμένες. Ορίστε μερικούς στόχους και ενεργοποιήστε εκ νέου το script.",
	},

};
    return tsalkapone_trans[lang];
    }());
	}
	var	shortcut = {
	'all_shortcuts':{},//All the shortcuts are stored in this array
	'add': function(shortcut_combination,callback,opt) {
		//Provide a set of default options
		var default_options = {
			'type':'keydown',
			'propagate':false,
			'disable_in_input':false,
			'target':document,
			'keycode':false
		}
		if(!opt) opt = default_options;
		else {
			for(var dfo in default_options) {
				if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
			}
		}

		var ele = opt.target;
		if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
		var ths = this;
		shortcut_combination = shortcut_combination.toLowerCase();

		//The function to be called at keypress
		var func = function(e) {
			e = e || window.event;
			
			if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
				var element;
				if(e.target) element=e.target;
				else if(e.srcElement) element=e.srcElement;
				if(element.nodeType==3) element=element.parentNode;

				if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
			}
	
			//Find Which key is pressed
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = String.fromCharCode(code).toLowerCase();
			
			if(code == 188) character=","; //If the user presses , when the type is onkeydown
			if(code == 190) character="."; //If the user presses , when the type is onkeydown

			var keys = shortcut_combination.split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp = 0;
			
			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			var shift_nums = {
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"^",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			}
			//Special Keys - and their codes
			var special_keys = {
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,
	
				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,
				
				'pause':19,
				'break':19,
				
				'insert':45,
				'home':36,
				'delete':46,
				'end':35,
				
				'pageup':33,
				'page_up':33,
				'pu':33,
	
				'pagedown':34,
				'page_down':34,
				'pd':34,
	
				'left':37,
				'up':38,
				'right':39,
				'down':40,
	
				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123
			}
	
			var modifiers = { 
				shift: { wanted:false, pressed:false},
				ctrl : { wanted:false, pressed:false},
				alt  : { wanted:false, pressed:false},
				meta : { wanted:false, pressed:false}	//Meta is Mac specific
			};
                        
			if(e.ctrlKey)	modifiers.ctrl.pressed = true;
			if(e.shiftKey)	modifiers.shift.pressed = true;
			if(e.altKey)	modifiers.alt.pressed = true;
			if(e.metaKey)   modifiers.meta.pressed = true;
                        
			for(var i=0; k=keys[i],i<keys.length; i++) {
				//Modifiers
				if(k == 'ctrl' || k == 'control') {
					kp++;
					modifiers.ctrl.wanted = true;

				} else if(k == 'shift') {
					kp++;
					modifiers.shift.wanted = true;

				} else if(k == 'alt') {
					kp++;
					modifiers.alt.wanted = true;
				} else if(k == 'meta') {
					kp++;
					modifiers.meta.wanted = true;
				} else if(k.length > 1) { //If it is a special key
					if(special_keys[k] == code) kp++;
					
				} else if(opt['keycode']) {
					if(opt['keycode'] == code) kp++;

				} else { //The special keys did not match
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
							character = shift_nums[character]; 
							if(character == k) kp++;
						}
					}
				}
			}
			
			if(kp == keys.length && 
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
				callback(e);
	
				if(!opt['propagate']) { //Stop the event
					//e.cancelBubble is supported by IE - this will kill the bubbling process.
					e.cancelBubble = true;
					e.returnValue = false;
	
					//e.stopPropagation works in Firefox.
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		this.all_shortcuts[shortcut_combination] = {
			'callback':func, 
			'target':ele, 
			'event': opt['type']
		};
		//Attach the function with the event
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
		else ele['on'+opt['type']] = func;
	},

	//Remove the shortcut - just specify the shortcut and I will remove the binding
	'remove':function(shortcut_combination) {
		shortcut_combination = shortcut_combination.toLowerCase();
		var binding = this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination])
		if(!binding) return;
		var type = binding['event'];
		var ele = binding['target'];
		var callback = binding['callback'];

		if(ele.detachEvent) ele.detachEvent('on'+type, callback);
		else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on'+type] = false;
	}
}	
var tsalmode1 = location.href.indexOf('mode=exchange') > -1;
var tsalmode2 = location.href.indexOf('mode=own_offer') > -1;	
var tsalmode3 = location.href.indexOf('mode=send') > -1;
      var tsalbody="input[type='number'] {width:70px;} .tsalbutton:hover {color:yellow;} .tsalselected {color: blue; font-style: italic;}";
var tsaldiamorfwsi='<link rel="stylesheet" type="text/css" href="https://dl.dropboxusercontent.com/s/tecuyt76fiz5z9s/Tsalkapone.Commander_script.css" />';
var tsaldiamorfwsifuletikwn= "<style>"+tsalbody+"</style>";
var	tsalbody1='<style>';
tsalbody1+='.tsalkembed1{ font-family: "Comic Sans MS", cursive, sans-serif;font-style:italic;color: purple;-webkit-animation: mymove1 3s infinite; -moz-animation: mymove1 3s infinite; animation: mymove1 6s infinite;font-weight: bold;}';
tsalbody1+='@-webkit-keyframes mymove1 {50% {color: red;}} @-moz-keyframes mymove1 {50% {color: red;}} @keyframes mymove1 {50% {color:red;}';
tsalbody1+='</style>';

$("head").append(tsaldiamorfwsi+tsalbody+tsalbody1);
	 
	 		/*==== register ====*/
var script = {
	scriptname: 'Market Tools',
	version: '1.0',
	author: 'Tsalkapone',
	email: 'tsalkapone@hotmail.com',
	broken: false
};
$.post(ScriptAPI.url,script);

if (tsalmode3) {
	
     
	
 	var lang_img='';
        if (lang=="greek") {lang_img ='<img title="Ελληνικά" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif">';}
        else if (lang=="english") {lang_img ='<img height="20px" style="cursor:help;" title="English/American" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif">';}
else if (lang=="italian") {lang_img ='<img height="20px" style="cursor:help;" title="Italian" width="30px" src="https://dl.dropboxusercontent.com/s/ho5ks4i0z7u5bpn/flag_italiano.gif">';}
        
		var temp1='';
if (localStorage.title1){temp1 = localStorage.getItem('title1');}
	else {temp1 = tsalkapone_trans.general.temp+' No1';  }
if (localStorage.title2){temp2 = localStorage.getItem('title2');}
	else {temp2 = tsalkapone_trans.general.temp+' No2';  }
	if (localStorage.title3){temp3 = localStorage.getItem('title3');}
	else {temp3 = tsalkapone_trans.general.temp+' No3';  }
	if (localStorage.title4){temp4 = localStorage.getItem('title4');}
	else {temp4 = tsalkapone_trans.general.temp+' No4';  }

    var tsalperiexomeno1 ='<div id="tsalperiexomeno1"><table class="vis"><tr><th colspan="10"><font color=maroon><center>'+tsalkapone_trans.general.res_list+'</center></font></th></tr>';
tsalperiexomeno1+='<tr><th><font color="darkgreen">'+tsalkapone_trans.general.title+'</font></th><td><input id="tsalrestitle1" type="text" value="'+temp1+'"></td></tr>';
tsalperiexomeno1+='<tr><th><span class="icon header wood"> </span>&nbsp;<font color="darkgreen">'+tsalkapone_trans.general.wood+'</font></th><td><input id="tsalwood1" name="tsalallwood1" type="number" min="0">&emsp;<input id="tsalallwood1" type="checkbox" >&nbsp;<b><font color="maroon">'+tsalkapone_trans.general.allwood+'</font></b></td></tr>';
tsalperiexomeno1+='<tr><th><span class="icon header stone"> </span>&nbsp;<font color="darkgreen">'+tsalkapone_trans.general.clay+'</font></th><td><input id="tsalclay1" name="tsalallclay1" type="number" min="0">&emsp;<input id="tsalallclay1" type="checkbox" >&nbsp;<b><font color="maroon">'+tsalkapone_trans.general.allclay+'</font></b></td></tr>';
tsalperiexomeno1+='<tr><th><span class="icon header iron"> </span>&nbsp;<font color="darkgreen">'+tsalkapone_trans.general.iron+'</font></th><td><input id="tsaliron1" name="tsalalliron1" type="number" min="0">&emsp;<input id="tsalalliron1" type="checkbox" >&nbsp;<b><font color="maroon">'+tsalkapone_trans.general.alliron+'</font></b></td></tr>';
tsalperiexomeno1+='<tr><th><font color="darkgreen">'+tsalkapone_trans.general.syn+'</font></th><td><textarea id=tsalcoords1 value="" rows="1" cols="50"></textarea></td></tr>';
tsalperiexomeno1+='<tr><th><font color="darkgreen">'+tsalkapone_trans.general.key+'</font></th><td><input id="tsalkey1" type="text"></td></tr>';
tsalperiexomeno1+='</table></div><br>';
tsalperiexomeno1+='<span class="tsaltooltip"><input id=Tsalsave1 type="button" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.save+'"><span class="tsalinfo" >'+tsalkapone_trans.buttons.save_title+'</span></span>';
tsalperiexomeno1+='<span class="tsaltooltip"><input id=Tsalhide type="button" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.hide+'"><span class="tsalinfo" >'+tsalkapone_trans.buttons.hide_title+'</span></span>';

var tsalperiexomeno2 ='<div id="tsalperiexomeno2"><table class="vis"><tr><th colspan="10"><font color=maroon><center>'+tsalkapone_trans.general.res_list+'</center></font></th></tr>';
tsalperiexomeno2+='<tr><th><font color="darkgreen">'+tsalkapone_trans.general.title+'</font></th><td><input id="tsalrestitle2" type="text" value="'+temp2+'"></td></tr>';
tsalperiexomeno2+='<tr><th><span class="icon header wood"> </span>&nbsp;<font color="darkgreen">'+tsalkapone_trans.general.wood+'</font></th><td><input id="tsalwood2" name="tsalallwood2" type="number" min="0">&emsp;<input id="tsalallwood2" type="checkbox" >&nbsp;<b><font color="maroon">'+tsalkapone_trans.general.allwood+'</font></b></td></tr>';
tsalperiexomeno2+='<tr><th><span class="icon header stone"> </span>&nbsp;<font color="darkgreen">'+tsalkapone_trans.general.clay+'</font></th><td><input id="tsalclay2" name="tsalallclay2" type="number" min="0">&emsp;<input id="tsalallclay2" type="checkbox" >&nbsp;<b><font color="maroon">'+tsalkapone_trans.general.allclay+'</font></b></td></tr>';
tsalperiexomeno2+='<tr><th><span class="icon header iron"> </span>&nbsp;<font color="darkgreen">'+tsalkapone_trans.general.iron+'</font></th><td><input id="tsaliron2" name="tsalalliron2" type="number" min="0">&emsp;<input id="tsalalliron2" type="checkbox" >&nbsp;<b><font color="maroon">'+tsalkapone_trans.general.alliron+'</font></b></td></tr>';
tsalperiexomeno2+='<tr><th><font color="darkgreen">'+tsalkapone_trans.general.syn+'</font></th><td><textarea id=tsalcoords2 value="" rows="1" cols="50"></textarea></td></tr>';
tsalperiexomeno2+='<tr><th><font color="darkgreen">'+tsalkapone_trans.general.key+'</font></th><td><input id="tsalkey2" type="text"></td></tr>';
tsalperiexomeno2+='</table></div><br>';
tsalperiexomeno2+='<span class="tsaltooltip"><input id=Tsalsave2 type="button" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.save+'"><span class="tsalinfo" >'+tsalkapone_trans.buttons.save_title+'</span></span>';
tsalperiexomeno2+='<span class="tsaltooltip"><input id=Tsalhide type="button" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.hide+'"><span class="tsalinfo" >'+tsalkapone_trans.buttons.hide_title+'</span></span>';

    var tsalperiexomeno3 ='<div id="tsalperiexomeno3"><table class="vis"><tr><th colspan="10"><font color=maroon><center>'+tsalkapone_trans.general.res_list+'</center></font></th></tr>';
tsalperiexomeno3+='<tr><th><font color="darkgreen">'+tsalkapone_trans.general.title+'</font></th><td><input id="tsalrestitle3" type="text" value="'+temp3+'"></td></tr>';
tsalperiexomeno3+='<tr><th><span class="icon header wood"> </span>&nbsp;<font color="darkgreen">'+tsalkapone_trans.general.wood+'</font></th><td><input id="tsalwood3" name="tsalallwood3" type="number" min="0">&emsp;<input id="tsalallwood3" type="checkbox" >&nbsp;<b><font color="maroon">'+tsalkapone_trans.general.allwood+'</font></b></td></tr>';
tsalperiexomeno3+='<tr><th><span class="icon header stone"> </span>&nbsp;<font color="darkgreen">'+tsalkapone_trans.general.clay+'</font></th><td><input id="tsalclay3" name="tsalallclay3" type="number" min="0">&emsp;<input id="tsalallclay3" type="checkbox" >&nbsp;<b><font color="maroon">'+tsalkapone_trans.general.allclay+'</font></b></td></tr>';
tsalperiexomeno3+='<tr><th><span class="icon header iron"> </span>&nbsp;<font color="darkgreen">'+tsalkapone_trans.general.iron+'</font></th><td><input id="tsaliron3" name="tsalalliron3" type="number" min="0">&emsp;<input id="tsalalliron3" type="checkbox" >&nbsp;<b><font color="maroon">'+tsalkapone_trans.general.alliron+'</font></b></td></tr>';
tsalperiexomeno3+='<tr><th><font color="darkgreen">'+tsalkapone_trans.general.syn+'</font></th><td><textarea id=tsalcoords3 value="" rows="1" cols="50"></textarea></td></tr>';
tsalperiexomeno3+='<tr><th><font color="darkgreen">'+tsalkapone_trans.general.key+'</font></th><td><input id="tsalkey3" type="text"></td></tr>';
tsalperiexomeno3+='</table></div><br>';
tsalperiexomeno3+='<span class="tsaltooltip"><input id=Tsalsave3 type="button" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.save+'"><span class="tsalinfo" >'+tsalkapone_trans.buttons.save_title+'</span></span>';
tsalperiexomeno3+='<span class="tsaltooltip"><input id=Tsalhide type="button" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.hide+'"><span class="tsalinfo" >'+tsalkapone_trans.buttons.hide_title+'</span></span>';

var tsalperiexomeno4 ='<div id="tsalperiexomeno4"><table class="vis"><tr><th colspan="10"><font color=maroon><center>'+tsalkapone_trans.general.res_list+'</center></font></th></tr>';
tsalperiexomeno4+='<tr><th><font color="darkgreen">'+tsalkapone_trans.general.title+'</font></th><td><input id="tsalrestitle4" type="text" value="'+temp4+'"></td></tr>';
tsalperiexomeno4+='<tr><th><span class="icon header wood"> </span>&nbsp;<font color="darkgreen">'+tsalkapone_trans.general.wood+'</font></th><td><input id="tsalwood4" name="tsalallwood4" type="number" min="0">&emsp;<input id="tsalallwood4" type="checkbox" >&nbsp;<b><font color="maroon">'+tsalkapone_trans.general.allwood+'</font></b></td></tr>';
tsalperiexomeno4+='<tr><th><span class="icon header stone"> </span>&nbsp;<font color="darkgreen">'+tsalkapone_trans.general.clay+'</font></th><td><input id="tsalclay4" name="tsalallclay4" type="number" min="0">&emsp;<input id="tsalallclay4" type="checkbox" >&nbsp;<b><font color="maroon">'+tsalkapone_trans.general.allclay+'</font></b></td></tr>';
tsalperiexomeno4+='<tr><th><span class="icon header iron"> </span>&nbsp;<font color="darkgreen">'+tsalkapone_trans.general.iron+'</font></th><td><input id="tsaliron4" name="tsalalliron4" type="number" min="0">&emsp;<input id="tsalalliron4" type="checkbox" >&nbsp;<b><font color="maroon">'+tsalkapone_trans.general.alliron+'</font></b></td></tr>';
tsalperiexomeno4+='<tr><th><font color="darkgreen">'+tsalkapone_trans.general.syn+'</font></th><td><textarea id=tsalcoords4 value="" rows="1" cols="50"></textarea></td></tr>';
tsalperiexomeno4+='<tr><th><font color="darkgreen">'+tsalkapone_trans.general.key+'</font></th><td><input id="tsalkey4" type="text"></td></tr>';
tsalperiexomeno4+='</table></div><br>';
tsalperiexomeno4+='<span class="tsaltooltip"><input id=Tsalsave4 type="button" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.save+'"><span class="tsalinfo" >'+tsalkapone_trans.buttons.save_title+'</span></span>';
tsalperiexomeno4+='<span class="tsaltooltip"><input id=Tsalhide type="button" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.hide+'"><span class="tsalinfo" >'+tsalkapone_trans.buttons.hide_title+'</span></span>';

   
		var menu="<span id='clickcounts'></span><div><table class='vis' id=tsalkaponemagicscripttable width='100%'><tr><th colspan='4'><font color='darkgreen' style='font-family:Comic Sans MS' size='3'><b>";
menu+='<img id="tsaltips" style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" >&emsp;Tsalkapone. '+tsalkapone_trans.general.script+'</b></th>';
menu+='<th><font style="font-family: \'Arial Black\', Gadget, sans-serif;"><span id="openfilter1"><input type="button" value="'+tsalkapone_trans.buttons.lang_open+'" id="openfilterbut1" class="btn tsalbutton"></span><span id="closefilter1" style="display:none"><input class="btn tsalbutton" type="button" value="'+tsalkapone_trans.buttons.lang_close+'" id="closefilterbut1"></span></th></tr>';
    menu+='<tr><td style="min-width: 80px"><a href="javascript:void(0);" id="Tsaltemp1">'+temp1+'</a></td>';
menu+='<td  style="min-width: 80px"><a href="javascript:void(0);" id="Tsaltemp2">'+temp2+'</a></td>';
    menu+='<td  style="min-width: 80px"><a href="javascript:void(0);" id="Tsaltemp3">'+temp3+'</a></td>';
    menu+='<td  style="min-width: 80px"><a href="javascript:void(0);" id="Tsaltemp4">'+temp4+'</a></td>';
menu+='<td>';
menu+='<span id="selectedone"><font color="maroon"><b>'+tsalkapone_trans.general.selected_one+':</b></font> '+lang_img+'</span><span id="columnfilter1" style="display:none" class="vis"><font size="2">';
menu+='<br><br><center><font color="blue"><b><u>'+tsalkapone_trans.general.available+'</u></b></font></center><input type="radio"  name="language" value="greek" id="greek_lang" ><img title="Greek" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif"><br>';
menu+='<input type="radio"  name="language" value="english" id="english_lang" checked><img height="20px" style="cursor:help;" title="English/American" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif"><br>';
menu+='<input type="radio"  name="language" value="italian" id="italian_lang" checked><img height="20px" style="cursor:help;" title="Italian \n\nBy sndb & im lovin it" width="30px" src="https://dl.dropboxusercontent.com/s/ho5ks4i0z7u5bpn/flag_italiano.gif"><br>';
menu+='</span></font></td>'; 
        menu+='</tr></table></div>';
    menu+='<span id=tsalepilogi></span>';          
 menu += "</th></tr></table></div><hr><br>";
menu+='<div class="target-select clearfix vis float_left"><h4><font color=maroon><center>Tsalkapone. '+tsalkapone_trans.general.button_list+'</center></font></h4><table class="vis" style="width: 100%"><tbody><tr><td>';
menu+='<input type="button" id="Tsaloffer1" class="attack btn tsalbutton btn tsalbutton-attack btn tsalbutton-target-action" value="'+temp1+'">';
    menu+='<input type="button" id="Tsaloffer2" class="attack btn tsalbutton btn tsalbutton-attack btn tsalbutton-target-action" value="'+temp2+'">';
menu+='<input type="button" id="Tsaloffer3" class="support btn tsalbutton btn tsalbutton-support btn tsalbutton-target-action" value="'+temp3+'">';
    menu+='<input type="button" id="Tsaloffer4" class="btn tsalbutton btn tsalbutton-recruit" value="'+temp4+'">';
   menu+='</tr></tbody></table></div><br><br><br><br><br><hr>';
    if (! document.getElementById('tsalkaponemagicscripttable')){   
	   $('#market-send-form').prepend(menu);
	
} else {UI.SuccessMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br>'+tsalkapone_trans.notes.activated+'.', 5000);}

	var Dialog1;(function(){'use strict';Dialog1={MAX_WIDTH:1200,closeCallback:null,show:function(id,content,closeCallback,options){options=$.extend({class_name:'',close_from_fader:true},options);this.closeCallback=closeCallback;var fullscreenElement=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement,container=fullscreenElement||'body',$container=$('.popup_box_container'),$box,$fader,$content,show_anim=false;if(!$container.length){show_anim=true;$container=$('<div class="popup_box_container" />');$box=$('<div class="popup_box" />').attr('id','popup_box_'+id).addClass(options.class_name).data('name',id).appendTo($container);$fader=$('<div class="fader" />').appendTo($container);$content=$('<div class="popup_box_content" />').appendTo($box);$container.appendTo($(container))}else{$box=$container.find('.popup_box');if($box.data('name')!==id){Dialog1.close();Dialog1.show(id,content,closeCallback,options);return};$content=$container.find('.popup_box_content');$box.css('width','auto')};$content.html(content);var height_buffer=125;if($(window).width()<500||$(window).height()<$content.height()+height_buffer){$box.addClass('mobile');$('.popup_box_content').css({'max-height':$(window).height()-(height_buffer/2)+'px'})};var border_width;if(typeof window.getComputedStyle==='function'){border_width=parseInt(getComputedStyle($box[0],null).borderLeftWidth)}else border_width=parseInt($box.css('border-left-width'));var min_width=200,width=Math.min(this.MAX_WIDTH,$content.width(),$(window).width()-border_width);if(width<min_width)width=min_width;if(!Modernizr.borderimage)width+=20;$box.css('width',width+'px');var hotkey_hint=(!mobile&&!mobiledevice&&HotKeys.enabled)?' :: ΟΟΞ½ΟΟΞΌΞ΅ΟΟΞ· ΟΞ»Ξ·ΞΊΟΟΞΏΞ»ΞΏΞ³Ξ―ΞΏΟ: <b>Esc</b>':'',tooltip_class=(!mobile&&!mobiledevice)?'tooltip-delayed':'',$close=$('<a class="popup_box_close '+tooltip_class+'" title="ΞΞ»Ξ΅Ξ―ΟΞ΅'+hotkey_hint+'" href="#">&nbsp;</a>').prependTo($content);UI.ToolTip($close,{delay:400});var close_elements=options.close_from_fader?'.fader, .popup_box_close, .popup_closer':'.popup_box_close, .popup_closer';$container.on('click',close_elements,function(){Dialog1.close(true);return false});if(show_anim)setTimeout(function(){$box.addClass('show')},50);UI.init();UnitPopup.init();setTimeout(QuestArrows.init,500)},close:function(by_user){$('.popup_box_container').remove();if(Dialog1.closeCallback)Dialog1.closeCallback(by_user);inlinePopupClose();$('.popup_style').hide();QuestArrows.init();return false},fetch:function(name,screen,get_params,callback,Dialog1_options,closeCallback){TribalWars.get(screen,get_params,function(data){Dialog1.show(name,data.Dialog1,closeCallback,Dialog1_options);if(callback)callback()})}}})();
 var contact_url = "https://forum.tribalwars.net/member.php?114063-Tsalkapone";
	   var content_1 = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="darkgreen">Tsalkapone. '+tsalkapone_trans.general.script+'</font></u></center></h2>' +
'<hr><p>'+tsalkapone_trans.general.info_1+'</p>' +
'<br><br><hr><center><img class="tooltip-delayed" title="<font color=darkgreen>Tsalkapone. '+tsalkapone_trans.general.script+'</font>" src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg" style="cursor:help; position: relative"></center><br><center><p>'+tsalkapone_trans.general.comm+' <a href="'+contact_url+'" title="Tsalkapone profile" target="_blank">Tsalkapone</a>.</p></center>' +
'</div>';     
 $("#tsaltips").mouseover(function () {
                                document.getElementById("tsaltips").style.border = "1px solid blue";
                               document.getElementById("tsaltips").style.cursor = "pointer";});
                            $("#tsaltips").mouseout(function () {
                                document.getElementById("tsaltips").style.border = "0px"; }); 
								$("#tsaltips").click(function () {
Dialog1.show('tsaltips_info', content_1);
    });
 if (get_lang == "greek") {document.getElementById('greek_lang').checked = true;}
      else  if (get_lang == "english") {document.getElementById('english_lang').checked = true; }
	  else  if (get_lang == "italian") {document.getElementById('italian_lang').checked = true; }
         $("#english_lang").click(function(){
	localStorage.setItem("market_scripts_lang","english");     
location.reload();
    });
	$("#italian_lang").click(function(){
	localStorage.setItem("market_scripts_lang","italian");     
location.reload();
    });
      $("#greek_lang").click(function(){
	localStorage.setItem("market_scripts_lang","greek");
location.reload();
    });
	 $("#Tsaltemp1").click(function(){
		 document.getElementById('tsalepilogi').innerHTML = tsalperiexomeno1;
	 $("#Tsaltemp1").addClass("tsalselected");
         $("#Tsaltemp2").removeClass("tsalselected");
         $("#Tsaltemp3").removeClass("tsalselected");
        $("#Tsaltemp4").removeClass("tsalselected");  
		var tsa = document.getElementById('tsalwood1');
		var tsal = document.getElementById('tsalclay1');
var tsalk = document.getElementById('tsaliron1');
if (localStorage.wood1)
{document.getElementById('tsalrestitle1').value=localStorage.getItem('title1');
document.getElementById('tsalwood1').value=localStorage.getItem('wood1');
document.getElementById('tsalclay1').value=localStorage.getItem('clay1');
document.getElementById('tsaliron1').value=localStorage.getItem('iron1');
document.getElementById('tsalcoords1').value=localStorage.getItem('coords1');
if (localStorage.getItem('allwood1') == 'true') {document.getElementById('tsalallwood1').checked= true;} else {document.getElementById('tsalallwood1').checked= false;}
if (localStorage.getItem('allclay1') == 'true') {document.getElementById('tsalallclay1').checked= true;} else {document.getElementById('tsalallclay1').checked= false;}
if (localStorage.getItem('alliron1') == 'true') {document.getElementById('tsalalliron1').checked= true;} else {document.getElementById('tsalalliron1').checked= false;}
if (localStorage.getItem('allwood1') == 'true' || localStorage.getItem('alliron1') == 'true' || localStorage.getItem('allclay1') == 'true')
{tsa.disabled = true; tsal.disabled = true; tsalk.disabled = true;}
document.getElementById('tsalkey1').value=localStorage.getItem('key1');
}
var x = document.getElementById('tsalallwood1');
var y = document.getElementById('tsalallclay1');
var z = document.getElementById('tsalalliron1');

$("#tsalallwood1").click(function(){	
if (x.checked === true) {y.checked = false; y.disabled = true; z.checked = false; z.disabled = true;}
else {y.disabled = false; z.disabled = false; }
if (x.checked === false && y.checked === false && z.checked == false) {tsa.disabled = false; tsal.disabled = false; tsalk.disabled = false;}
else {tsa.disabled = true; tsal.disabled = true; tsalk.disabled = true;}
    });
	$("#tsalallclay1").click(function(){	
if (y.checked === true) {x.checked = false; x.disabled = true; z.checked = false; z.disabled = true;}
else {x.disabled = false; z.disabled = false; }
if (x.checked === false && y.checked === false && z.checked == false) {tsa.disabled = false; tsal.disabled = false; tsalk.disabled = false;}
else {tsa.disabled = true; tsal.disabled = true; tsalk.disabled = true;}
    });
	$("#tsalalliron1").click(function(){	
if (z.checked === true) {y.checked = false; y.disabled = true; x.checked = false; x.disabled = true;}
else {y.disabled = false; x.disabled = false; }
if (x.checked === false && y.checked === false && z.checked == false) {tsa.disabled = false; tsal.disabled = false; tsalk.disabled = false;}
else {tsa.disabled = true; tsal.disabled = true; tsalk.disabled = true;}
    });
		$("#Tsalhide").click(function(){
        document.getElementById('tsalepilogi').innerHTML='';
    });
	$("#Tsalsave1").click(function(){
var title = document.getElementById('tsalrestitle1').value;
var iron = document.getElementById('tsaliron1').value;
var wood = document.getElementById('tsalwood1').value;
var clay = document.getElementById('tsalclay1').value;
var alliron = document.getElementById('tsalalliron1').checked;
var allwood = document.getElementById('tsalallwood1').checked;
var allclay = document.getElementById('tsalallclay1').checked;
var key = document.getElementById('tsalkey1').value;
var coords = document.getElementById('tsalcoords1').value;
localStorage.setItem('template1','OK');
  localStorage.setItem('title1',title);
  localStorage.setItem('iron1',iron);
localStorage.setItem('wood1',wood);
localStorage.setItem('clay1',clay);
 localStorage.setItem('alliron1',alliron);
localStorage.setItem('allwood1',allwood);
localStorage.setItem('allclay1',allclay);
localStorage.setItem('coords1',coords);
localStorage.setItem('key1',key);
UI.SuccessMessage('<font color=gold><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></font> <br><br> '+tsalkapone_trans.notes.saved+'', 5000);
    
    });
        });
			 $("#Tsaloffer1").click(function () { 
 if (localStorage.template1 =='OK') {
	 if (localStorage.getItem('allwood1') == 'true') {var Tsalkapone_ξύλο=localStorage.getItem('allwood1');}
else {var Tsalkapone_ξύλο=localStorage.getItem('wood1');}
if (localStorage.getItem('allclay1') == 'true') {var Tsalkapone_πηλός=localStorage.getItem('allclay1');}
else { var Tsalkapone_πηλός=localStorage.getItem('clay1'); }
if (localStorage.getItem('alliron1') == 'true') {var Tsalkapone_σίδερο=localStorage.getItem('alliron1');}
else {var Tsalkapone_σίδερο=localStorage.getItem('iron1'); }
var coords=""+localStorage.getItem('coords1')+"";
            Tsalinitiate(coords,Tsalkapone_ξύλο,Tsalkapone_πηλός,Tsalkapone_σίδερο);  
 }
else{UI.ErrorMessage('<font color=gold><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></font> <br><br> '+tsalkapone_trans.notes.values+'', 5000);
            } });
			
		$("#Tsaltemp2").click(function(){
			document.getElementById('tsalepilogi').innerHTML=tsalperiexomeno2;
	 $("#Tsaltemp1").removeClass("tsalselected");
         $("#Tsaltemp2").addClass("tsalselected");
         $("#Tsaltemp3").removeClass("tsalselected");
        $("#Tsaltemp4").removeClass("tsalselected"); 
			var tsa = document.getElementById('tsalwood2');
		var tsal = document.getElementById('tsalclay2');
var tsalk = document.getElementById('tsaliron2');
if (localStorage.wood2)
{document.getElementById('tsalrestitle2').value=localStorage.getItem('title2');
document.getElementById('tsalwood2').value=localStorage.getItem('wood2');
document.getElementById('tsalclay2').value=localStorage.getItem('clay2');
document.getElementById('tsaliron2').value=localStorage.getItem('iron2');
document.getElementById('tsalcoords2').value=localStorage.getItem('coords2');
if (localStorage.getItem('allwood2') == 'true') {document.getElementById('tsalallwood2').checked= true;} else {document.getElementById('tsalallwood2').checked= false;}
if (localStorage.getItem('allclay2') == 'true') {document.getElementById('tsalallclay2').checked= true;} else {document.getElementById('tsalallclay2').checked= false;}
if (localStorage.getItem('alliron2') == 'true') {document.getElementById('tsalalliron2').checked= true;} else {document.getElementById('tsalalliron2').checked= false;}
if (localStorage.getItem('allwood2') == 'true' || localStorage.getItem('alliron2') == 'true' || localStorage.getItem('allclay2') == 'true')
{tsa.disabled = true; tsal.disabled = true; tsalk.disabled = true;}
document.getElementById('tsalkey2').value=localStorage.getItem('key2');
}
var x = document.getElementById('tsalallwood2');
var y = document.getElementById('tsalallclay2');
var z = document.getElementById('tsalalliron2');

$("#tsalallwood2").click(function(){	
if (x.checked === true) {y.checked = false; y.disabled = true; z.checked = false; z.disabled = true;}
else {y.disabled = false; z.disabled = false; }
if (x.checked === false && y.checked === false && z.checked == false) {tsa.disabled = false; tsal.disabled = false; tsalk.disabled = false;}
else {tsa.disabled = true; tsal.disabled = true; tsalk.disabled = true;}
    });
	$("#tsalallclay2").click(function(){	
if (y.checked === true) {x.checked = false; x.disabled = true; z.checked = false; z.disabled = true;}
else {x.disabled = false; z.disabled = false; }
if (x.checked === false && y.checked === false && z.checked == false) {tsa.disabled = false; tsal.disabled = false; tsalk.disabled = false;}
else {tsa.disabled = true; tsal.disabled = true; tsalk.disabled = true;}
    });
	$("#tsalalliron2").click(function(){	
if (z.checked === true) {y.checked = false; y.disabled = true; x.checked = false; x.disabled = true;}
else {y.disabled = false; x.disabled = false; }
if (x.checked === false && y.checked === false && z.checked == false) {tsa.disabled = false; tsal.disabled = false; tsalk.disabled = false;}
else {tsa.disabled = true; tsal.disabled = true; tsalk.disabled = true;}
    });
$("#Tsalhide").click(function(){
        document.getElementById('tsalepilogi').innerHTML='';
    });		
			
			$("#Tsalsave2").click(function(){
var title = document.getElementById('tsalrestitle2').value;
var iron = document.getElementById('tsaliron2').value;
var wood = document.getElementById('tsalwood2').value;
var clay = document.getElementById('tsalclay2').value;
var alliron = document.getElementById('tsalalliron2').checked;
var allwood = document.getElementById('tsalallwood2').checked;
var allclay = document.getElementById('tsalallclay2').checked;
var key = document.getElementById('tsalkey2').value;
var coords = document.getElementById('tsalcoords2').value;
localStorage.setItem('template2','OK');
  localStorage.setItem('title2',title);
  localStorage.setItem('iron2',iron);
localStorage.setItem('wood2',wood);
localStorage.setItem('clay2',clay);
 localStorage.setItem('alliron2',alliron);
localStorage.setItem('allwood2',allwood);
localStorage.setItem('allclay2',allclay);
localStorage.setItem('coords2',coords);
localStorage.setItem('key2',key);
UI.SuccessMessage('<font color=gold><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></font> <br><br> '+tsalkapone_trans.notes.saved+'', 5000);
    });
	});
	$("#Tsaloffer2").click(function () { 
 if (localStorage.template2 =='OK') {
	 if (localStorage.getItem('allwood2') == 'true') {var Tsalkapone_ξύλο=localStorage.getItem('allwood2');}
else {var Tsalkapone_ξύλο=localStorage.getItem('wood2');}
if (localStorage.getItem('allclay2') == 'true') {var Tsalkapone_πηλός=localStorage.getItem('allclay2');}
else { var Tsalkapone_πηλός=localStorage.getItem('clay2'); }
if (localStorage.getItem('alliron2') == 'true') {var Tsalkapone_σίδερο=localStorage.getItem('alliron2');}
else {var Tsalkapone_σίδερο=localStorage.getItem('iron2'); }
var coords=""+localStorage.getItem('coords2')+"";

            Tsalinitiate(coords,Tsalkapone_ξύλο,Tsalkapone_πηλός,Tsalkapone_σίδερο);  
 }
else{UI.ErrorMessage('<font color=gold><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></font> <br><br> '+tsalkapone_trans.notes.values+'', 5000);
            } });
		$("#Tsaltemp3").click(function(){
			document.getElementById('tsalepilogi').innerHTML=tsalperiexomeno3;
	 $("#Tsaltemp1").removeClass("tsalselected");
         $("#Tsaltemp2").removeClass("tsalselected");
         $("#Tsaltemp3").addClass("tsalselected");
        $("#Tsaltemp4").removeClass("tsalselected");
		var tsa = document.getElementById('tsalwood3');
		var tsal = document.getElementById('tsalclay3');
var tsalk = document.getElementById('tsaliron3');
if (localStorage.wood3)
{document.getElementById('tsalrestitle3').value=localStorage.getItem('title3');
document.getElementById('tsalwood3').value=localStorage.getItem('wood3');
document.getElementById('tsalclay3').value=localStorage.getItem('clay3');
document.getElementById('tsaliron3').value=localStorage.getItem('iron3');
document.getElementById('tsalcoords3').value=localStorage.getItem('coords3');
if (localStorage.getItem('allwood3') == 'true') {document.getElementById('tsalallwood3').checked= true;} else {document.getElementById('tsalallwood3').checked= false;}
if (localStorage.getItem('allclay3') == 'true') {document.getElementById('tsalallclay3').checked= true;} else {document.getElementById('tsalallclay3').checked= false;}
if (localStorage.getItem('alliron3') == 'true') {document.getElementById('tsalalliron3').checked= true;} else {document.getElementById('tsalalliron3').checked= false;}
if (localStorage.getItem('allwood3') == 'true' || localStorage.getItem('alliron3') == 'true' || localStorage.getItem('allclay3') == 'true')
{tsa.disabled = true; tsal.disabled = true; tsalk.disabled = true;}
document.getElementById('tsalkey3').value=localStorage.getItem('key3');
}
var x = document.getElementById('tsalallwood3');
var y = document.getElementById('tsalallclay3');
var z = document.getElementById('tsalalliron3');

$("#tsalallwood3").click(function(){	
if (x.checked === true) {y.checked = false; y.disabled = true; z.checked = false; z.disabled = true;}
else {y.disabled = false; z.disabled = false; }
if (x.checked === false && y.checked === false && z.checked == false) {tsa.disabled = false; tsal.disabled = false; tsalk.disabled = false;}
else {tsa.disabled = true; tsal.disabled = true; tsalk.disabled = true;}
    });
	$("#tsalallclay3").click(function(){	
if (y.checked === true) {x.checked = false; x.disabled = true; z.checked = false; z.disabled = true;}
else {x.disabled = false; z.disabled = false; }
if (x.checked === false && y.checked === false && z.checked == false) {tsa.disabled = false; tsal.disabled = false; tsalk.disabled = false;}
else {tsa.disabled = true; tsal.disabled = true; tsalk.disabled = true;}
    });
	$("#tsalalliron3").click(function(){	
if (z.checked === true) {y.checked = false; y.disabled = true; x.checked = false; x.disabled = true;}
else {y.disabled = false; x.disabled = false; }
if (x.checked === false && y.checked === false && z.checked == false) {tsa.disabled = false; tsal.disabled = false; tsalk.disabled = false;}
else {tsa.disabled = true; tsal.disabled = true; tsalk.disabled = true;}
    });
$("#Tsalhide").click(function(){
        document.getElementById('tsalepilogi').innerHTML='';
    });
$("#Tsalsave3").click(function(){
var title = document.getElementById('tsalrestitle3').value;
var iron = document.getElementById('tsaliron3').value;
var wood = document.getElementById('tsalwood3').value;
var clay = document.getElementById('tsalclay3').value;
var alliron = document.getElementById('tsalalliron3').checked;
var allwood = document.getElementById('tsalallwood3').checked;
var allclay = document.getElementById('tsalallclay3').checked;
var key = document.getElementById('tsalkey3').value;
var coords = document.getElementById('tsalcoords3').value;
localStorage.setItem('template3','OK');
  localStorage.setItem('title3',title);
  localStorage.setItem('iron3',iron);
localStorage.setItem('wood3',wood);
localStorage.setItem('clay3',clay);
 localStorage.setItem('alliron3',alliron);
localStorage.setItem('allwood3',allwood);
localStorage.setItem('allclay3',allclay);
localStorage.setItem('coords3',coords);
localStorage.setItem('key3',key);
UI.SuccessMessage('<font color=gold><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></font> <br><br> '+tsalkapone_trans.notes.saved+'', 5000);
    });
        });
		$("#Tsaloffer3").click(function () { 
if (localStorage.template3 =='OK') {
if (localStorage.getItem('allwood3') == 'true') {var Tsalkapone_ξύλο=localStorage.getItem('allwood3');}
else {var Tsalkapone_ξύλο=localStorage.getItem('wood3');}
if (localStorage.getItem('allclay3') == 'true') {var Tsalkapone_πηλός=localStorage.getItem('allclay3');}
else { var Tsalkapone_πηλός=localStorage.getItem('clay3'); }
if (localStorage.getItem('alliron3') == 'true') {var Tsalkapone_σίδερο=localStorage.getItem('alliron3');}
else {var Tsalkapone_σίδερο=localStorage.getItem('iron3'); }
var coords=""+localStorage.getItem('coords3')+"";

            Tsalinitiate(coords,Tsalkapone_ξύλο,Tsalkapone_πηλός,Tsalkapone_σίδερο);  
 }
else{UI.ErrorMessage('<font color=gold><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></font> <br><br> '+tsalkapone_trans.notes.values+'', 5000);
            } });	
		$("#Tsaltemp4").click(function(){
			document.getElementById('tsalepilogi').innerHTML=tsalperiexomeno4;
	 $("#Tsaltemp1").removeClass("tsalselected");
         $("#Tsaltemp2").removeClass("tsalselected");
         $("#Tsaltemp3").removeClass("tsalselected");
        $("#Tsaltemp4").addClass("tsalselected");  
		var tsa = document.getElementById('tsalwood4');
		var tsal = document.getElementById('tsalclay4');
var tsalk = document.getElementById('tsaliron4');
if (localStorage.wood4)
{document.getElementById('tsalrestitle4').value=localStorage.getItem('title4');
document.getElementById('tsalwood4').value=localStorage.getItem('wood4');
document.getElementById('tsalclay4').value=localStorage.getItem('clay4');
document.getElementById('tsaliron4').value=localStorage.getItem('iron4');
document.getElementById('tsalcoords4').value=localStorage.getItem('coords4');
if (localStorage.getItem('allwood4') == 'true') {document.getElementById('tsalallwood4').checked= true;} else {document.getElementById('tsalallwood4').checked= false;}
if (localStorage.getItem('allclay4') == 'true') {document.getElementById('tsalallclay4').checked= true;} else {document.getElementById('tsalallclay4').checked= false;}
if (localStorage.getItem('alliron4') == 'true') {document.getElementById('tsalalliron4').checked= true;} else {document.getElementById('tsalalliron4').checked= false;}
if (localStorage.getItem('allwood4') == 'true' || localStorage.getItem('alliron4') == 'true' || localStorage.getItem('allclay4') == 'true')
{tsa.disabled = true; tsal.disabled = true; tsalk.disabled = true;}
document.getElementById('tsalkey4').value=localStorage.getItem('key4');
}
var x = document.getElementById('tsalallwood4');
var y = document.getElementById('tsalallclay4');
var z = document.getElementById('tsalalliron4');

$("#tsalallwood4").click(function(){	
if (x.checked === true) {y.checked = false; y.disabled = true; z.checked = false; z.disabled = true;}
else {y.disabled = false; z.disabled = false; }
if (x.checked === false && y.checked === false && z.checked == false) {tsa.disabled = false; tsal.disabled = false; tsalk.disabled = false;}
else {tsa.disabled = true; tsal.disabled = true; tsalk.disabled = true;}
    });
	$("#tsalallclay4").click(function(){	
if (y.checked === true) {x.checked = false; x.disabled = true; z.checked = false; z.disabled = true;}
else {x.disabled = false; z.disabled = false; }
if (x.checked === false && y.checked === false && z.checked == false) {tsa.disabled = false; tsal.disabled = false; tsalk.disabled = false;}
else {tsa.disabled = true; tsal.disabled = true; tsalk.disabled = true;}
    });
	$("#tsalalliron4").click(function(){	
if (z.checked === true) {y.checked = false; y.disabled = true; x.checked = false; x.disabled = true;}
else {y.disabled = false; x.disabled = false; }
if (x.checked === false && y.checked === false && z.checked == false) {tsa.disabled = false; tsal.disabled = false; tsalk.disabled = false;}
else {tsa.disabled = true; tsal.disabled = true; tsalk.disabled = true;}
    });
		$("#Tsalhide").click(function(){
        document.getElementById('tsalepilogi').innerHTML='';
    });
	$("#Tsalsave4").click(function(){
var title = document.getElementById('tsalrestitle4').value;
var iron = document.getElementById('tsaliron4').value;
var wood = document.getElementById('tsalwood4').value;
var clay = document.getElementById('tsalclay4').value;
var alliron = document.getElementById('tsalalliron4').checked;
var allwood = document.getElementById('tsalallwood4').checked;
var allclay = document.getElementById('tsalallclay4').checked;
var key = document.getElementById('tsalkey4').value;
var coords = document.getElementById('tsalcoords4').value;
localStorage.setItem('template4','OK');
  localStorage.setItem('title4',title);
  localStorage.setItem('iron4',iron);
localStorage.setItem('wood4',wood);
localStorage.setItem('clay4',clay);
 localStorage.setItem('alliron4',alliron);
localStorage.setItem('allwood4',allwood);
localStorage.setItem('allclay4',allclay);
localStorage.setItem('coords4',coords);
localStorage.setItem('key4',key);
 UI.SuccessMessage('<font color=gold><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></font> <br><br> '+tsalkapone_trans.notes.saved+'', 5000);
 });
        });
		$("#Tsaloffer4").click(function () { 
if (localStorage.template4 =='OK') {
	 if (localStorage.getItem('allwood4') == 'true') {var Tsalkapone_ξύλο=localStorage.getItem('allwood4');}
else {var Tsalkapone_ξύλο=localStorage.getItem('wood4');}
if (localStorage.getItem('allclay4') == 'true') {var Tsalkapone_πηλός=localStorage.getItem('allclay4');}
else { var Tsalkapone_πηλός=localStorage.getItem('clay4'); }
if (localStorage.getItem('alliron4') == 'true') {var Tsalkapone_σίδερο=localStorage.getItem('alliron4');}
else {var Tsalkapone_σίδερο=localStorage.getItem('iron4'); }
var coords=""+localStorage.getItem('coords4')+"";

            Tsalinitiate(coords,Tsalkapone_ξύλο,Tsalkapone_πηλός,Tsalkapone_σίδερο);  
 }
else{UI.ErrorMessage('<font color=gold><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></font> <br><br> '+tsalkapone_trans.notes.values+'', 5000);
            } });	
 
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
	var tsalkey1=''; if (localStorage.key1){tsalkey1=localStorage.getItem('key1');}
shortcut.add(""+tsalkey1+"",function() {
	$('#Tsaloffer1').click();
});	
var tsalkey2=''; if (localStorage.key2){tsalkey2=localStorage.getItem('key2');}
shortcut.add(""+tsalkey2+"",function() {
	$('#Tsaloffer2').click();
});	
var tsalkey3=''; if (localStorage.key3){tsalkey3=localStorage.getItem('key3');}
shortcut.add(""+tsalkey3+"",function() {
	$('#Tsaloffer3').click();
});	
var tsalkey4=''; if (localStorage.key4){tsalkey4=localStorage.getItem('key4');}
shortcut.add(""+tsalkey4+"",function() {
	$('#Tsaloffer4').click();
});	
	
	function Tsalinitiate(coords,Tsalkapone_ξύλο,Tsalkapone_πηλός,Tsalkapone_σίδερο){
		if(coords.replace(/^\s\s*/,'').replace(/\s\s*$/,'')===''){UI.ErrorMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> '+tsalkapone_trans.notes.coords+'', 5000);}
else {	
		  var doc=document;url=document.URL;
                coords=coords.split(" ");

	index=0;farmcookie=document.cookie.match('(^|;) ?farm=([^;]*)(;|$)');if(farmcookie!=null)index=parseInt(farmcookie[2]);
                if(index>=coords.length)UI.SuccessMessage('<font color=gold><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></font> <br><br> '+tsalkapone_trans.notes.last+'', 3000);
                if(index>=coords.length)index=0;coords=coords[index];coords=coords.split("|");
                index=index+1;cookie_date=new Date(2050,11,11);document.cookie ="farm="+index+";expires="+cookie_date.toGMTString ();
                doc.forms[0].x.value=coords[0];doc.forms[0].y.value=coords[1];
	if (Tsalkapone_ξύλο == 'true') {Market.Modes.send.insertMax('wood');} 
else if (Tsalkapone_πηλός == 'true') {Market.Modes.send.insertMax('stone');}
else if (Tsalkapone_σίδερο == 'true') {Market.Modes.send.insertMax('iron');}
else {
	document.getElementsByName('wood')[0].value=Tsalkapone_ξύλο;
	document.getElementsByName('stone')[0].value=Tsalkapone_πηλός;
	document.getElementsByName('iron')[0].value=Tsalkapone_σίδερο;
}
}}
	

}
else if (tsalmode2){
 var resTable = $("#own_offer_form");
 var menu = "";
 menu+='<div id="tsalmagic" class="target-select clearfix vis float_left"><h4><font color=maroon><center>Tsalkapone. '+tsalkapone_trans.general.button_list+'</center></font></h4><table class="vis" style="width: 100%"><tbody><tr><td>';
menu += "<input type='button' class='btn tsalbutton' align=right id=tsalofferexe value='"+tsalkapone_trans.general.balance+"'>";
menu+='<input type="button" id="Tsaloffer" class="btn tsalbutton btn tsalbutton-recruit" value="'+tsalkapone_trans.buttons.bal_set+'">';
menu+='</tr></tbody></table></div><br><br><br><span id=tsaloffermenu></span>';
                     if (!document.getElementById('tsalmagic')) {
					 resTable.after(menu);}
 else {UI.SuccessMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br>'+tsalkapone_trans.notes.activated+'.', 5000);}
	
	
	
	
                        $("#Tsaloffer").click(function () {
var tsalmarket = ""; 
tsalmarket+="<table class='vis' id='tsalpinakas' width='100%'><tbody><tr><th colspan='4'><font color='darkgreen' style='font-family:Comic Sans MS' size='3'><b>";
tsalmarket+='<img id="tsaltips1"  style="height:13px; width:13px" src="graphic/questionmark.png" >&emsp;Tsalkapone. '+tsalkapone_trans.general.script2+'</b></th></tr>';                      
tsalmarket+="<tr><td><font color='maroon'><b>"+tsalkapone_trans.general.offer+"</b></font></td><td><input type='number' id='tsalsumoffer' value='1000'></td></tr>";
tsalmarket+="<tr><td><font color='maroon'><b>"+tsalkapone_trans.general.ask+"</b></font>";
tsalmarket+="</td><td><input type='number' id='tsalsumask' value='1000'></td></tr>";
tsalmarket+="<tr><td><font color='maroon'><b>"+tsalkapone_trans.general.dis+"</b></font>&emsp;";
tsalmarket+="</td><td><input type='number' id='tsalmaxtime' value='40' ></td></tr></tbody></table>";                          
tsalmarket+="<br><input type='button' class='btn tsalbutton' id='Tsalsaveval' value='"+tsalkapone_trans.buttons.save+"' >";
tsalmarket+="&emsp;<input type='button' class='btn tsalbutton' id='Tsalkleisimore' value='"+tsalkapone_trans.buttons.hide+"'></span>";   

                             document.getElementById('tsaloffermenu').innerHTML= tsalmarket; 
var Dialog1;(function(){'use strict';Dialog1={MAX_WIDTH:1200,closeCallback:null,show:function(id,content,closeCallback,options){options=$.extend({class_name:'',close_from_fader:true},options);this.closeCallback=closeCallback;var fullscreenElement=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement,container=fullscreenElement||'body',$container=$('.popup_box_container'),$box,$fader,$content,show_anim=false;if(!$container.length){show_anim=true;$container=$('<div class="popup_box_container" />');$box=$('<div class="popup_box" />').attr('id','popup_box_'+id).addClass(options.class_name).data('name',id).appendTo($container);$fader=$('<div class="fader" />').appendTo($container);$content=$('<div class="popup_box_content" />').appendTo($box);$container.appendTo($(container))}else{$box=$container.find('.popup_box');if($box.data('name')!==id){Dialog1.close();Dialog1.show(id,content,closeCallback,options);return};$content=$container.find('.popup_box_content');$box.css('width','auto')};$content.html(content);var height_buffer=125;if($(window).width()<500||$(window).height()<$content.height()+height_buffer){$box.addClass('mobile');$('.popup_box_content').css({'max-height':$(window).height()-(height_buffer/2)+'px'})};var border_width;if(typeof window.getComputedStyle==='function'){border_width=parseInt(getComputedStyle($box[0],null).borderLeftWidth)}else border_width=parseInt($box.css('border-left-width'));var min_width=200,width=Math.min(this.MAX_WIDTH,$content.width(),$(window).width()-border_width);if(width<min_width)width=min_width;if(!Modernizr.borderimage)width+=20;$box.css('width',width+'px');var hotkey_hint=(!mobile&&!mobiledevice&&HotKeys.enabled)?' :: ΟΟΞ½ΟΟΞΌΞ΅ΟΟΞ· ΟΞ»Ξ·ΞΊΟΟΞΏΞ»ΞΏΞ³Ξ―ΞΏΟ: <b>Esc</b>':'',tooltip_class=(!mobile&&!mobiledevice)?'tooltip-delayed':'',$close=$('<a class="popup_box_close '+tooltip_class+'" title="ΞΞ»Ξ΅Ξ―ΟΞ΅'+hotkey_hint+'" href="#">&nbsp;</a>').prependTo($content);UI.ToolTip($close,{delay:400});var close_elements=options.close_from_fader?'.fader, .popup_box_close, .popup_closer':'.popup_box_close, .popup_closer';$container.on('click',close_elements,function(){Dialog1.close(true);return false});if(show_anim)setTimeout(function(){$box.addClass('show')},50);UI.init();UnitPopup.init();setTimeout(QuestArrows.init,500)},close:function(by_user){$('.popup_box_container').remove();if(Dialog1.closeCallback)Dialog1.closeCallback(by_user);inlinePopupClose();$('.popup_style').hide();QuestArrows.init();return false},fetch:function(name,screen,get_params,callback,Dialog1_options,closeCallback){TribalWars.get(screen,get_params,function(data){Dialog1.show(name,data.Dialog1,closeCallback,Dialog1_options);if(callback)callback()})}}})();
 var contact_url = "https://forum.tribalwars.net/member.php?114063-Tsalkapone";
	   var content_1 = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="darkgreen">Tsalkapone. '+tsalkapone_trans.general.script2+'</font></u></center></h2>' +
'<hr><p><u><b><font color="maroon">'+tsalkapone_trans.general.balance+'</font></b></u></p>' +
'<p>'+tsalkapone_trans.general.info1+'</p>' +
'<hr><p><u><b><font color="maroon">'+tsalkapone_trans.general.offer+'</font></b></u></p>' +
'<p>'+tsalkapone_trans.general.info2+'</p>' +
'<hr><p><u><b><font color="maroon">'+tsalkapone_trans.general.ask+'</font></b></u></p>' +
'<p>'+tsalkapone_trans.general.info3+'</p>' +
'<hr><p><u><b><font color="maroon">'+tsalkapone_trans.general.dis+'</font></b></u></p>' +
'<p>'+tsalkapone_trans.general.info4+'</p>' +
'<hr><center><img class="tooltip-delayed" title="<font color=darkgreen>Tsalkapone. '+tsalkapone_trans.general.script+'</font>" src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg" style="cursor:help; position: relative"></center><br><center><p>'+tsalkapone_trans.general.comm+' <a href="'+contact_url+'" title="Tsalkapone profile" target="_blank">Tsalkapone</a>.</p></center>' +
'</div>';     
 $("#tsaltips1").mouseover(function () {
                                document.getElementById("tsaltips1").style.border = "1px solid blue";
                               document.getElementById("tsaltips1").style.cursor = "pointer";});
                            $("#tsaltips1").mouseout(function () {
                                document.getElementById("tsaltips1").style.border = "0px"; }); 
								$("#tsaltips1").click(function () {
Dialog1.show('tsaltips1_info', content_1);
    });
                        var tsalsumoffer =   document.getElementById('tsalsumoffer');  
                          var tsalsumask =   document.getElementById('tsalsumask');  
                           var tsalmaxtime =   document.getElementById('tsalmaxtime'); 
                  
             if (typeof(Storage) !== "undefined") {
    
                           if (localStorage.getItem("tsalsumoffer1") === null) {
   localStorage.setItem("tsalsumoffer1" , "1000");}
                               else { var tsalsumoffer1 = localStorage.getItem("tsalsumoffer1"); 
                                  tsalsumoffer.value = tsalsumoffer1;  }

                 if (localStorage.getItem("tsalsumask1") === null) {
   localStorage.setItem("tsalsumask1" , "1000"); }
                               else { var tsalsumask1 = localStorage.getItem("tsalsumask1"); 
                                  tsalsumask.value = tsalsumask1;  } 
                 
                  if (localStorage.getItem("tsalmaxtime1") === null) {
   localStorage.setItem("tsalmaxtime1" , "40"); }
                               else { var tsalmaxtime1 = localStorage.getItem("tsalmaxtime1"); 
                                  tsalmaxtime.value = tsalmaxtime1;  } 
 
						} 
						 $("#Tsalsaveval").click(function () {
                                
       localStorage.setItem("tsalsumoffer1", tsalsumoffer.value);
                                localStorage.setItem("tsalsumask1", tsalsumask.value);
                                localStorage.setItem("tsalmaxtime1", tsalmaxtime.value);
                            UI.SuccessMessage('<font color=gold><center>'+tsalkapone_trans.general.notification+' Tsalkapone</center></font> <br><br> '+tsalkapone_trans.notes.saved+'', 3000)
                            });
                                    
                   $("#tsalofferexe").click(function () {         
                            
                            
      var doc = document;
  if (window.frames.length > 0) doc = document.main;
  
     var wood = new Number(doc.getElementById('wood').innerHTML);    
     var clay = new Number(doc.getElementById('stone').innerHTML);    
     var iron = new Number(doc.getElementById('iron').innerHTML);    
     var forms = doc.getElementsByTagName('form');    var table = "";   
     for (i = 0; i < forms.length && table == ""; i++) {       
         if (forms[i].action.indexOf('action=modify_offers') != -1)
         {            table = forms[i].getElementsByTagName('table')[0];        }    }   
     for (i = 1; table != "" && i < table.rows.length - 1; i++) 
     {        child = table.rows[i].cells[1].childNodes;        res = child[0].title;        num = "";       
      for (j = 0; j < child.length; j++)
      {            value = child[j].nodeValue;            if (value != null) num += value;        }       
      num = num.substring(0, num.length - 1);        num *= new Number(table.rows[i].cells[2].innerHTML);      
      if (res == 'Wood') wood += num;        if (res == 'Clay') clay += num;      
      if (res == 'Iron') iron += num;    }  
     doc.getElementById('res_sell_wood').checked = wood > clay && wood > iron;  
     doc.getElementById('res_sell_stone').checked = clay > wood && clay > iron;  
     doc.getElementById('res_sell_iron').checked = iron > clay && iron > wood;   
     doc.getElementById('res_buy_wood').checked = wood < clay && wood < iron;   
     doc.getElementById('res_buy_stone').checked = clay < wood && clay < iron;   
     doc.getElementById('res_buy_iron').checked = iron < clay && iron < wood;   
     wood = Math.round(wood / 1000);  
     clay = Math.round(clay / 1000);  
     iron = Math.round(iron / 1000);   
  var   offers = Math.max(Math.max(wood, clay), iron) - Math.min(Math.min(wood, clay), iron);   
  console.log(offers);
     offers = Math.round(offers / 2);    
	var x = document.getElementById('market_merchant_available_count').innerHTML;
	var y = Number(x);
	console.log(y);
var tsal_offers ='';
if (offers >= y)	{tsal_offers = y;} else {tsal_offers=offers;}
     inputs = doc.getElementsByTagName('input');    
     for (i = 0; i < inputs.length; i++) 
     {        if (inputs[i].value == ''+tsalkapone_trans.tw.create+'') inputs[i].focus();    }   
     doc.getElementsByName('multi')[0].value = tsal_offers;  
 console.log(tsal_offers);	 
     doc.getElementsByName('max_time')[0].value = localStorage.getItem("tsalmaxtime1");   
     doc.getElementsByName('sell')[0].value = localStorage.getItem("tsalsumask1");    
     doc.getElementsByName('buy')[0].value = localStorage.getItem("tsalsumoffer1");

 
                       
                       

                   });
                            
                            
$("#Tsalkleisimore").click(function () {  
    
   document.getElementById('tsaloffermenu').innerHTML= "";  
    
});
});	}

else if (tsalmode1) {
	var tsaltable = '<br><table class="vis" width="100%"><tbody>';
tsaltable+='<tr><th colspan="4"><font color="darkgreen" style="font-family:Comic Sans MS" size="3"><b><center>Tsalkapone. '+tsalkapone_trans.general.script3+'</center></b></font></th></tr>';
tsaltable+='<tr><th><font color=maroon><b>'+tsalkapone_trans.general.res_type+'</b></font></th><th><center><img src="/graphic/resources/wood_21x18.png" alt="" class=""> '+tsalkapone_trans.general.wood+'</th></center>';
 tsaltable+='<th><center><img src="/graphic/resources/stone_21x18.png" alt="" class=""> '+tsalkapone_trans.general.clay+'</th></center>';
tsaltable+='<th><center><img src="/graphic/resources/iron_21x18.png" alt="" class=""> '+tsalkapone_trans.general.iron+'</th></center></tr>';
tsaltable+='<tr><th><font color=maroon><b>'+tsalkapone_trans.general.capacity+'</b></font></th><td><font color=darkgreen><b><center><span id="ksilo"></span></center></b></font></td><td><font color=darkgreen><b><center><span id="pilos"></span></center></b></font></td><td><font color=darkgreen><b><center><span id="sidero"></span></center></b></font></td></tr>';
tsaltable+='<tr><th><font color=maroon><b>'+tsalkapone_trans.general.avail+'</b></font></th><td><font color=blue><b><center><span id="wood1"></span></center></b></font></td><td><font color=blue><b><center><span id="stone1"></span></center></b></font></td><td><font color=blue><b><center><span id="iron1"></span></center></b></font></td></tr>';
tsaltable+='<tr><th><font color=maroon><b><span class="tsaltooltip"><span class="tsalinfo">'+tsalkapone_trans.general.info5+'</span><img src="/graphic/questionmark.png" style="width: 13px; height: 13px; cursor: help;"></span>';
tsaltable+='&emsp;'+tsalkapone_trans.general.alarm+'</b></font></th><td><center><input type="number" id=poso value="5000" style="width: 5em" min="1"></center></td>';
tsaltable+='<td colspan="2"><center><span class="tsaltooltip"><span class="tsalinfo">'+tsalkapone_trans.general.info6+'</span><input type="button" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.save+'" id=tsalsave></span></center></td></tr>';            
            tsaltable+='</tbody></table><br><span id=eidopoiisi></span>';
   $('#premium_exchange_form').after(tsaltable);
  if (localStorage.posotita) {
   var x=   document.getElementById('poso');
      x.value = localStorage.getItem("posotita");
      
  }
         $("#tsalsave").click(function () { 
             var posotita = document.getElementById('poso');
             localStorage.setItem("posotita", posotita.value); 
         location.reload(); });    
            
            
   var Tsalupologismoi =         setInterval(function(){  
       var tsalwood1= game_data.village.wood;
                        var tsalstone1= game_data.village.stone;
                        var tsaliron1= game_data.village.iron;
     var prewood = document.getElementById('premium_exchange_stock_wood');
        var stockwood = document.getElementById('premium_exchange_capacity_wood');
            var preclay = document.getElementById('premium_exchange_stock_stone');
        var stockclay = document.getElementById('premium_exchange_capacity_stone');   
var preiron = document.getElementById('premium_exchange_stock_iron');
        var stockiron = document.getElementById('premium_exchange_capacity_iron'); 
         var ksilo =  document.getElementById('ksilo'); 
           var pilos =  document.getElementById('pilos');  
var sidero =  document.getElementById('sidero');        
        var poso = document.getElementById('poso').value;   
       document.getElementById('wood1').innerHTML = tsalwood1;
       document.getElementById('stone1').innerHTML = tsalstone1;  
document.getElementById('iron1').innerHTML = tsaliron1;    
                var wood = Number(stockwood.innerText)-Number(prewood.innerText);
                var clay = Number(stockclay.innerText)-Number(preclay.innerText);
                var iron = Number(stockiron.innerText)-Number(preiron.innerText);
           ksilo.innerHTML = Number(stockwood.innerText)-Number(prewood.innerText);    
             pilos.innerHTML = Number(stockclay.innerText)-Number(preclay.innerText);    
sidero.innerHTML = Number(stockiron.innerText)-Number(preiron.innerText);    
                
           if ( poso <=  wood || poso <= clay || poso <= iron )
              {
         if (poso<=wood) { ksilo.style.color="red";}    
                  if (poso<=clay) { pilos.style.color="red";}  
                  if (poso<=iron) { sidero.style.color="red";}  
                clearInterval(Tsalupologismoi)  
var tsalkin ='<center><input type="button" class="btn tsalbutton" id=tsalrestart value="'+tsalkapone_trans.buttons.rest+'" ></center><br>';
tsalkin+='<center><font size="3"><span class="tsalkembed1">'+tsalkapone_trans.general.alarm_note+'</span></font></center><br>';
tsalkin+='<iframe width="100%" height="200" src="https://www.youtube.com/embed/udlER1XPrK0?loop=1;autoplay=1;" frameborder="0" allowfullscreen></iframe>';
         document.getElementById('eidopoiisi').innerHTML = tsalkin;     
  $("#tsalrestart").click(function () {  location.reload();    });
              }}, 100);
}


else
	{
		var contact_url = "https://forum.tribalwars.net/member.php?114063-Tsalkapone";
	   var content = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="darkgreen">Tsalkapone. '+tsalkapone_trans.general.script+'</font></u></center></h2>' +
'<hr><p><center><font color=maroon><b>'+tsalkapone_trans.general.message_1+':</b></font></center></p>' +
'<p><center><font color=maroon><b>'+tsalkapone_trans.general.message_2+'</b></font></center></p>' +
'<p><center><font color=maroon><b>'+tsalkapone_trans.general.message_3+'</b></font></center></p>' +
'<br><br><center><input type="button" class="btn evt-confirm-btn btn-confirm-yes" id="go_man1" value="'+tsalkapone_trans.general.message_no1+'">&emsp;'+
'<input type="button" class="btn evt-confirm-btn btn-confirm-yes" id="go_man2" value="'+tsalkapone_trans.general.message_no2+'">&emsp;'+
'<input type="button" class="btn evt-confirm-btn btn-confirm-yes" id="go_man3" value="'+tsalkapone_trans.general.message_no3+'">&emsp;'+
'<input type="button" class="btn evt-cancel-btn btn-confirm-no" id="close_this" value="'+tsalkapone_trans.general.message_no+'"></center>'+ 
'<br><br><hr><center><img class="tooltip-delayed" title="<font color=darkgreen>Tsalkapone. '+tsalkapone_trans.general.script+'</font>" src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg" style="cursor:help; position: relative"></center><br><center><p>'+tsalkapone_trans.general.comm+' <a href="'+contact_url+'" title="Tsalkapone profile" target="_blank">Tsalkapone</a>.</p></center>' +
'</div>';            
Dialog.show('time_distance_intro', content);
$("#go_man1").click(function () { window.location.assign(game_data.link_base_pure+"market&mode=exchange");});  
$("#go_man2").click(function () { window.location.assign(game_data.link_base_pure+"market&mode=own_offer");});  
$("#go_man3").click(function () { window.location.assign(game_data.link_base_pure+"market&mode=send");});   
$("#close_this").click(function () { var close_this = document.getElementsByClassName('popup_box_close'); close_this[0].click(); });
	}


	 void(0);        
} ;

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

    

           