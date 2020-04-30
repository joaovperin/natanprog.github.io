/*
		scriptname:	Village Renamer
		version:	1.0.0
		created: June 25, 2016
 		game version:	version	8.48.1
 		author:		Tsalkapone (tsalkapone@hotmail.com)
 
 ==== pages where this can be used ==== 
 * Overviews -> Combined (screen=overview_villages&mode=combined)
  
 ==== changelog ====
 *	19 July 2016 - created
 
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
 
 var get_lang = localStorage.getItem("village_renamer_lang");
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
	 script:"Village Renamer",
	 notification:"Notification from",
         selected_one:"Current selected language",
         available:"Available languages",
		 button_list:"Buttons List",
		 lang_sel:"Click to change the selected language",		
		message_no:"No",
		message_yes:"Yes",
		message_1:"This script is activated on Overviews -> Combined.",
		message_2:"Do you want to automatically assign your location to this page?",
		message_3:"The name's format you selected may exceed the limit of 32 characters per village's name. If you proceed to the renaming function the script will exclude any possible names that exceed the characters' limit.",
		message_4:"Do you still want to proceed to the renaming function?",
		message_5:"That means if a village's name exceeds the characters' limit its name won't be applied. However, the renaming process will still go on.",
		message_6:"In case all the formatted names exceed the characters' limit none of the villages will be renamed.",
		comm:"Feel free to send any message regarding script bugs or proposing ideas to",
		des:"Function description",
		but:"Buttons",
		edited_by:"Edited by",
		created:"Created by",
		set_list:"Settings & Functions",
		res_list:"Script Settings",
		res_title:"Container's title",
		blank:"Click on any script's button to display its settings and values",
		script_1:"Define the renamer's settings",
		script_2:"Save current villages' names and retrieve old ones",
		script2:"Import/Export Villages Names",
		script_3:"Create your own name pool",
		script_4:"Define the speed of the renaming function and the templates' titles",
		script3:"Names Pool Creator",
		pool1:"Pool Settings",
		pool2:"Settings",
		pool3:"Actions",
		new_year:"happy new year",
		new_year_info:"Pick a random language out of the tribal war's servers to wish a happy new year",
		year_info1:"Some of the phrases included in this name pool may contain html characters that are not allowed to be used in a village's name.<br><br>In this case the name won't be applied. However, the renaming process will still go on.",
		p_title:"Enter a title for the Name Pool",
		p_tit:"My Pool",
		p_method:"Select the method of inserting the pool's names",
		p_met1:"Consecutive",
		p_met2:"Random",
		pool4:"Modify the names of the pool separating them with <font color='blue' size='4'>,</font> (comma)",
		pool_info:"Insert names from your own name pool",
		pool_info1:"You may modify your own names pool using <b>Pool Creator</b>. If no names are saved the option will be ignored.",
		act:"Activate",
		extra:"Additional Text",
		counter:"Variables",
		desc:"Description",
		lab:"Name",
		ord:"Order",
		drag:"Drag to re-order",
		digits:"counting",
		digits1:"Start from number",
		digits2:"Amount of digits",
		digits_info:"Add counting in front of each of the villages' name.<br><br>Define a number to start the counting from and the amount of digits you want for each number.<br>Define if you wish to convert any number into its roman relevant.",
		tab1:"Add Counting",
		tab2:"Other Options",
		tab3:"Rename Method",
		descr:"Method's description",
		mode:"Select method",
		mod1:"Ovewrite current names",
		mod2:"Prepend to current names",
		mod3:"Append to current names",
		con:"continent",
		dis:"distance",
		sector:"map sector",
		dir:"direction",
		beer:"beer",
		wh:"whiskey",
		band:"music bands",
		sof:"random",
		keimeno:"text",
		con_info:"The number of the continent to which each village belongs",
		dis_info:"The distance (in map fields) from the selected coordinates. Insert the desired coordinates on the input field on the left",
		sector_info:"Caterogize each village according to its position in map using the following system:<br><b>continent:sector:field</b>",
		sector_info1:"The map is divided left to right, top to bottom.<br>The sector is divided according to the following system:<br><br>World - 100 continents (10x10)<br>Continent - 400 sectors (20x20)<br>Sector - 25 fields (5x5)",
		dir_info:"The direction of each village within the continent",
		beer_info:"Insert a random beer brand name",
		keimeno_info:"Insert a text in the name's format",
		wh_info:"Insert a random whiskey brand name",
		band_info:"Insert a random music band name",
		sof_info:"Insert a random stylish name",
		sof_info1:"The names included in this option have been entirely created and inspired by <b><font color='red'>Poison13</font></b>, a Greek female player of Tribal Wars.<br><br>It is recommended to disable any other available option if you wish to enable this one.",
		dir1:"NW", /* North West */
		dir2:"N", /* North */
		dir3:"NE", /* North East */
		dir4:"W", /* West */
		dir5:"C", /* Center */
		dir6:"E", /* East */
		dir7:"SW", /* South West */
		dir8:"S", /* South */
		dir9:"SE", /* South East */
		dir_info1:"Direction Explanation",
		dir_1:"North West",
		dir_2:"North",
		dir_3:"North East",
		dir_4:"West",
		dir_5:"Center",
		dir_6:"East",
		dir_7:"South West",
		dir_8:"South",
		dir_9:"South East",
		pl:"player",
		roman:"Roman numeral",
		pl_info:"Insert your account's name",
		name_attention:"ATTENTION: A village's name can't contain more than 32 characters or any special html character.",
		pro1:"Renaming process",
		temp:"Templates",
		apoth:"Reserved Names Settings",
		apothiki:"Reserved Containers",
		ren_speed:"Renaming Process Speed Settings",
		ren_speed1:"Speed",
		ren_speed2:"Approximate villages renamed per second",
		sp1:"High",
		sp2:"Medium",
		sp3:"Low",
		sp4:"Very low",
		sp_vil:"villages/sec",
		apothiki_1:"Container No1",
		apothiki_2:"Container No2",
		apothiki_3:"Container No3",
		apothiki_4:"Container No4",
		temp1:"Core Info",
		temp2:"Give me Style",
		temp_0:"Default Template",
		temp_1:"Template No1",
		temp_2:"Template No2",
		temp_3:"Template No3",
		temp_4:"Template No4",
		exp:"Export Options",
		exp_per:"Formatted code of villages' names",
		imp:"Import Options",
		templates:"Templates' Settings",
		title:"Template's title",
		stat_save:"Saved Data",
		stat_no:"NO DATA",
		stat:"LocalStorage Status",
		tsal_info1:"<center><b><font color='maroon'><u>Available Functions</u></font></b></center>1. Define the titles of the <b><font color='red'>Renaming Templates</font></b> and <b><font color='red'>Names' Containers</font></b>.<br>2. Save each template's settings on <b><font color='red'>Renamer Settings</font></b> and each container's settings on <b><font color='red'>Villages Names</font></b>.<br>3. Define the renaming process' speed. <b>It is highly recommended that you don't exceed the <font color='darkgreen'>Medium</font> speed</b>.<br><center><b>NEVER</b> forget to <b><font color='blue'>Save Settings</font></b></center>",
	tsal_info2:"Define the variables included in the <b><font color='maroon'>Renamer's format</b></font>. You can see their description for further details. You can use one of the default templates or you can create your own ones.<br><center><b>NEVER</b> forget to <b><font color='blue'>Save Settings.</b></font></center>Every customizable variable is displayed on the following table. You can preview the label's format in every change you make. The texts of each variable are added before the variable in the format.",
	tsal_info3:"<center><b><font color='maroon'><u>Available Functions</u></font></b></center><b><font color='red'>1. Export: </font></b>You may save the current names in one of the available names containers or export the current villages' names into a formatted code and save it as text in your notebook or your pc (<b>Export names</b>).<br><b><font color='red'>2. Import: </font></b>Import villages names from an available container or by pasting a saved formatted code of villages' names (<b>Import names</b>).<br><b><font color='red'>3. Rename: </font></b>Rename villages using the imported formatted code. You may modify the code before renaming the villages.<br><center><font color='blue'><b>Each container saves the current villages' names in a unique data file for this world.</font></b></center>",
	tsal_info5:"ATTENTION: The order of the format's options is not saved. For this reason, firstly load or save a template and then re-order the options.",
	},
	buttons:{
		lang_open:"Open language selection",
              lang_close:"Close language selection",
			  exp:"Export names",
			  exp_close:"Close names' code",
			  imp:"Import names",
			  imp1:"Load",
		script_1:"Renamer Settings",
		script_2:"Villages Names",
		script_3:"Rename Villages",
		script_4:"General Settings",
		script3:"Pool Creator",
		save:"Save Settings",
		hide:"Hide Settings",
		res_set:"Reset Settings",
		save1:"Save to",
		save_def:"Save as Default",
	},
	notes:{
		vils:"Number of villages that have been renamed",
		vils1:"Duration of the renaming process",
		vils2:"Total villages on the overviews' page",
		no_vils:"The selected format hasn't been applied to none of the page's villages",
		secs:"seconds",
		imp_fail:"No saved names have been detected in this container. Save the current names and try again.",
		activated:"The script Village Renamer is already active",
		save:"Your settings have been successfully saved.",
		save_exp:"Your current villages' names have been successfully saved.",
		no_saved1:"No saved settings have been detected for this template. Save settings into this template and try again.",
		res_set:"The settings have been successfully reseted. The page will be automatically refreshed in 3 seconds.",
		res_set2:"The settings have been successfully reseted.",
	},
};
tsalkapone_trans.italian= { 
	 general:{ 
	 script:"Rinomina Villaggi",
	 notification:"Notifica da",
         selected_one:"Lingua selezionata corrente",
         available:"Lingue disponibili",
		 button_list:"Lista tasti",
		 lang_sel:"Clicca pe cambiare la lingua selezionata",		
		message_no:"No",
		message_yes:"Si",
		message_1:"Questo script è attivato su Panoramiche -> Combinato",
		message_2:"Vuoi cambiare automaticamente pagina?",
		message_3:"Il format del nome selezionato può eccedere il limite di 32 caratteri. Se procedi con il rinomina, lo script escluderà eventuali nomi che supereranno tale limite",
		message_4:"Vuoi comunque procedere con il rinomina?",
		message_5:"Ciò significa che se il nome di un villaggio supera il limite caratteri non verra applicato nessun nome. Il processo andrà comunque avanti",
		message_6:"Nel caso in cui tutti i nomi dei villaggi superino il limite, nessun villaggio sarà rinominato.",
		comm:"Sentiti libero di inviare qualunque messaggio concerne bug o proposte a",
		des:"Descrizione funzione",
		but:"Tasti",
		edited_by:"Editato da",
		created:"Creato da",
		set_list:"Settaggi & Funzioni",
		res_list:"Settaggi script",
		res_title:"Titolo Contenitore",
		blank:"Clicca su un tasto script per mostrare i suoi settaggi e valori",
		script_1:"Definisci i settaggi di rinomina",
		script_2:"Salva i nomi dei villaggi attuali e ripristina i precedenti",
		script2:"Importa/Esporta i nomi dei villaggi",
		script_3:"Crea la tua cassa personale di nomi",
		script_4:"Imposta la velocità della funzione rinomina e dei titoli dei template",
		script3:"Creatore cassa di nomi",
		pool1:"Settaggi cassa",
		pool2:"Settaggi",
		pool3:"Azioni",
		new_year:"Buon anno nuovo",
		new_year_info:"Scegli una lingua a caso dai server di tribalwars per augurare un felice anno nuovo",
		year_info1:"Alcune delle frasi contenute in questa cassa di nomi possono contenere caratteli HTML che non possono essere utilizzati nel nome di un villaggio.<br><br>In questo caso il nome non sarà applicato. Comunque il processo di rinomina continuerà.",
		p_title:"Inserisci un titolo per la cassa di nomi",
		p_tit:"La mia cassa",
		p_method:"Seleziona il metodo di inserimento della cassa di nomi",
		p_met1:"Consecutivo",
		p_met2:"Casuale",
		pool4:"Modifica i nomi della cassa separandoli con <font color='blue' size='4'>,</font> (virgola)",
		pool_info:"Inserisci i nomi dalla tua cassa personale",
		pool_info1:"Puoi modificare la tua cassa di nomi usando <b>Creatore di cassa</b>. Se nessun nome è salvato l'opzione sarà ignorata",
		act:"Attiva",
		extra:"Testo addizionale",
		counter:"Variabili",
		desc:"Descrizione",
		lab:"Nome",
		ord:"Ordine",
		drag:"Trascina per riordinare",
		digits:"Conteggio",
		digits1:"Inizia dal numero",
		digits2:"Quantità di cifre",
		digits_info:"Aggiungi conteggio prima di ogni nome villaggio. <br><br>Imposta un numero da cui iniziare il conteggio e la quantità di cifre che vuoi per ogni numero.<br>Cambia, se desideri, ogni numero nel rispettivo numero romano (VII)",
		tab1:"Aggiungi conteggio",
		tab2:"Altre opzioni",
		tab3:"Metodo di rinomina",
		descr:"Descrizione metodi",
		mode:"Seleziona metodi",
		mod1:"Sovrascrivi nomi attuali",
		mod2:"Anteponi al nome attuale",
		mod3:"Posponi al nome attuale",
		con:"continente",
		dis:"distanza",
		sector:"settore mappa",
		dir:"direzione",
		beer:"birra",
		wh:"whiskey",
		band:"band musicali",
		sof:"casuale",
		keimeno:"testo",
		con_info:"Il numero di continente a cui ogni villaggio appartiene",
		dis_info:"La distanza (in campi di mappa) dalle coordinate selezionate. Inserisci le coordinate desiderate nel campo di testo a sinistra",
		sector_info:"Cataloga ogni villaggio in base alla sua posizione sulla mappa utilizzando il seguente sistema:<br><b>continente:settore:campo</b>",
		sector_info1:"La mappa è divisa da sinistra a destra, dall'alto al basso.<br>Il settore è diviso secondo il sistema seguente<br><br>Mondo - 100 continenti (10x10)<br>Continente - 400 settori (20x20)<br>Settori - 25 campi (5x5)",
		dir_info:"La direzione di ogni villaggio nel continente",
		beer_info:"Inserisci un nome casuale di un brand di birra",
		keimeno_info:"Inserisci un testo nel format del nome",
		wh_info:"Inserisci un nome casuale di un brand di whiskey",
		band_info:"Inserisci un nome casuale di una band musicale",
		sof_info:"Inserisci un nome elegante casuale",
		sof_info1:"I nomi contenuti in questa opzione sono stati interamente creati e ispirati da <b><font color='red'>Poison13</font></b>, una ragazza graca player di TribalWars.<br><br> È consigliato disattivare qualsiasi altra opzione disponibile se si desidera attivare questa",
		dir1:"NW", /* North West */
		dir2:"N", /* North */
		dir3:"NE", /* North East */
		dir4:"W", /* West */
		dir5:"C", /* Center */
		dir6:"E", /* East */
		dir7:"SW", /* South West */
		dir8:"S", /* South */
		dir9:"SE", /* South East */
		dir_info1:"Spiegazione direzione",
		dir_1:"Nord Ovest",
		dir_2:"Nord",
		dir_3:"Nord Est",
		dir_4:"Ovest",
		dir_5:"Centro",
		dir_6:"Est",
		dir_7:"Sud Ovest",
		dir_8:"Sud",
		dir_9:"Sud Est",
		pl:"player",
		roman:"Numeri romani",
		pl_info:"Inserisci il tuo nome account",
		name_attention:"ATTENZIONE: un nome villaggio non può contenere più di 32 caratteri o qualunque carattere speciale HTML",
		pro1:"Processo rinomina",
		temp:"Template",
		apoth:"Impostazioni nomi riservati",
		apothiki:"Contenitori riservati",
		ren_speed:"Impostazioni velocità processo rinomina",
		ren_speed1:"Velocità",
		ren_speed2:"Villaggi rinominati per secondo (approssimativamente)",
		sp1:"Alta",
		sp2:"Media",
		sp3:"Bassa",
		sp4:"Molto bassa",
		sp_vil:"villaggi/sec",
		apothiki_1:"Contenitore No1",
		apothiki_2:"Contenitore No2",
		apothiki_3:"Contenitore No3",
		apothiki_4:"Contenitore No4",
		temp1:"Informazioni di base",
		temp2:"Dammi stile",
		temp_0:"Template di default",
		temp_1:"Template No1",
		temp_2:"Template No2",
		temp_3:"Template No3",
		temp_4:"Template No4",
		exp:"Opzioni di esportazione",
		exp_per:"Codice formattato dei nomi villaggio",
		imp:"Opzioni d'importazione",
		templates:"Impostazioni template",
		title:"Titolo template",
		stat_save:"Dati salvati",
		stat_no:"NESSUN DATO",
		stat:"Stato immagazzinamento dati",
		tsal_info1:"<center><b><font color='maroon'><u>Funzioni disponibili</u></font></b></center>1. Imposta i titoli dei <b><font color='red'>Template rinomina</font></b> e <b><font color='red'>Contenitori nomi</font></b>.<br>2. Salva ogni settaggio di template su <b><font color='red'>Impostazioni rinomina</font></b> e ogni settaggio del contenitore su <b><font color='red'>Nomi villaggi</font></b>.<br>3. Imposta la velocità del processo di rinomina. <b>È altamente consigliato che tu non ecceda la velocità <font color='darkgreen'>Media</font></b>. Non dimenticare <br><center><b>MAI</b> di <b><font color='blue'>Salvare i settaggi</font></b></center>",
	tsal_info2:"Imposta le variabili incluse nel <b><font color='maroon'>Format rinomina</b></font>. Puoi vedere la loro descrizione per ulteriori dettagli. Puoi usare uno dei template di default o puoi creare il tuo personale. Non dimenticare <br><center><b>MAI</b> di <b><font color='blue'>Salvare i settaggi.</b></font></center>Ogni variabile personalizzabile è mostrata nella tabella seguente. Puoi vedere l'anteprima del format ad ogni cambiamento che farai. Il testo di ogni cariabile è aggiunto prima del format.",
	tsal_info3:"<center><b><font color='maroon'><u>Funzioni disponibili</u></font></b></center><b><font color='red'>1. Esporta: </font></b>Puoi salvare i nomi attuali in uno dei contenitori disponibili o puoi esportare i nomi attuali in un codice formattato e salvarlo come testo nel blocco note del tuo pc. (<b>Nomi di esportazione</b>).<br><b><font color='red'>2. Importa: </font></b>Importa i nomi dei villaggi da un contenitore disponibile o incollando il codice formattato salvato in precedenza (<b>Nomi d'importazione</b>).<br><b><font color='red'>3. Rinomina: </font></b>Rinomina villaggi usando il codice formattato. Puoi modificare il codice prima di rinominare i villaggi.<br><center><font color='blue'><b>Ogni contenitore salva i nomi attuali dei villaggi in un unico file dati per questo mondo.</font></b></center>",
	tsal_info5:"ATTENZIONE: l'ordine delle opzioni del format non è salvato. Per questo motivo, Prima carica o salva un template e poi riordina le opzioni.",
	},
	buttons:{
		lang_open:"Apri selezione lingua",
              lang_close:"Chiudi selezionelanguage selection",
			  exp:"Esporta nomi",
			  exp_close:"Chiudi il codice di nomi",
			  imp:"Importa nomi",
			  imp1:"Carica",
		script_1:"Settaggi rinomina",
		script_2:"Nomi villaggi",
		script_3:"Rinomina villaggi",
		script_4:"Settaggi generali",
		script3:"Creatore di cassa",
		save:"Salva settaggi",
		hide:"Nascondi settaggi",
		res_set:"Ripristina settaggi",
		save1:"Salva su",
		save_def:"Salva come default",
	},
	notes:{
		vils:"Numero di villaggi che sono stati rinominati",
		vils1:"Durata del processo di rinomina",
		vils2:"Villaggi totali sulla pagina panoramica",
		no_vils:"Il format selezionato non è stato applicato a nessun villaggio della pagina",
		secs:"secondi",
		imp_fail:"Nessun nome salvato è stato trovato in questo contenitore. Salva i nomi attuali e riprova.",
		activated:"Lo script Rinomina Villaggi è già attivo",
		save:"I tuoi settaggi sono stati salvati con successo.",
		save_exp:"I tuoi nomi attuali dei villaggi sono stati salvati con successo.",
		no_saved1:"Nessuna settaggio salvato è stato trovato per questo template. Salva i settaggi in questo template e riprova.",
		res_set:"I settaggi sono stati ripristinati con successo. La pagina si aggiornerà in 3 secondi.",
		res_set2:"I settaggi sono stati ripristinati con successo.",
	},
};
tsalkapone_trans.greek= { 
	 general:{ 
	 script:"Μετονομασία Χωριών",
	 notification:"Ειδοποίηση από",
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
		message_3:"Η επιλεγμένη μορφοποίηση ονομασιών ενδέχεται να υπερβαίνει το επιτρεπόμενο όριο των 32 χαρακτήρων για κάθε ονομασία. Σε περίπτωση που προχωρήσετε στη διαδικασία μετονομασίας το script θα αγνοήσει οποιαδήποτε ονομασία διαθέτει περισσότερους από 32 χαρακτήρες.",
		message_4:"Επιθυμείτε να προχωρήσετε στη διαδικασία μετονομασίας;",
		message_5:"Αυτό σημαίνει ότι οποιαδήποτε ονομασία ενός χωριού υπερβαίνει το όριο χαρακτήρων δεν θα εφαρμοστεί. Ωστόσο, η διαδικασία μετονομασίας θα συνεχιστεί.",
		message_6:"Σε περίπτωση που όλες οι ονομασίες υπερβαίνουν το επιτρεπόμενο όριο δεν θα εφαρμοστεί καμιά μετονομασία.",
		res_title:"Τίτλος αποθηκευμένου πρότυπου",
		blank:"Επιλέξτε ένα πλήκτρο οποιουδήποτε script για να εμφανιστούν οι ρυθμίσεις του",
		script_1:"Ορίστε τις ρυθμίσεις της λειτουργίας μετονομασίας χωριών",
		script_2:"Αποθηκεύστε τις τρέχουσες ονομασίες χωριών και επαναφέρετε ένα αποθηκευμένο πρότυπο ονομασιών",
		script2:"Εισαγωγή/Εξαγωγή Ονομασιών",
		script_3:"Δημιουργήστε τη δική σας ομάδα ονομασιών",
		script_4:"Ορίστε τους τίτλους των πρότυπων και τη ταχύτητα της διαδικασίας μετονομασίας",
		script3:"Δημιουργός Ομάδας Ονομασιών",
		pool1:"Ρυθμίσεις Ομάδας",
		pool2:"Ρυθμίσεις",
		pool3:"Ενέργειες",
		new_year:"καλή χρονιά",
		new_year_info:"Ευχηθείτε καλή χρονιά σε μια από τις γλώσσες των servers του παιχνιδιού",
		year_info1:"Μερικές ονομασίες που περιλαμβάνονται σε αυτή την ομάδα ίσως να περιέχουν χαρακτήρες html που δεν επιτρέπονται να χρησιμοποιηθούν σε ονομασία χωριού.<br><br>Σε αυτή τη περίπτωση η ονομασία του χωριού θα αγνοηθεί. Ωστόσο, η διαδικασία μετονομασίας θα συνεχιστεί κανονικά.",
		p_title:"Εισάγετε το τίτλο της Ομάδας Ονομασιών",
		p_tit:"Η Ομάδα μου",
		p_method:"Επιλέξτε τη μέθοδο εισαγωγής ονομασιών της ομάδας σας",
		p_met1:"Διαδοχική",
		p_met2:"Τυχαία",
		pool4:"Καθορίστε τις ονομασίες της ομάδας διαχωρίζοντάς τες με <font color='blue' size='4'>,</font> (κόμμα)",
		pool_info:"Εισάγετε ονομασίες από τη δική σας ομάδα",
		pool_info1:"Μπορείτε να καθορίσετε δικές σας ονομασίες δημιουργώντας μια ομάδα χρησιμοποιώντας το <b>Δημιουργό Ομάδας</b>. Αν δεν εντοπιστούν αποθηκευμένες ονομασίες η συγκεκριμένη επιλογή θα αγνοηθεί.",
		act:"Ενεργοποίηση",
		extra:"Επιπρόσθετο Κείμενο",
		counter:"Μεταβλητές",
		desc:"Περιγραφή",
		lab:"Ονομασία",
		ord:"Σειρά",
		drag:"Σύρετε για να αλλάξετε σειρά",
		digits:"αρίθμηση",
		digits1:"Εκκίνηση από",
		digits2:"¨Σύνολο ψηφίων",
		digits_info:"Προσθήκη αρίθμησης μπροστά από τις ονομασίες των χωριών.<br><br>Ορίστε από ποιο αριθμό επιθυμείτε να ξεκινήσει η αρίθμηση και το σύνολο των ψηφίων κάθε αριθμού.<br>Επίσης, ορίστε αν επιθυμείτε να μετατρέψετε τους αριθμούς στους αντίστοιχους λατινικούς.",
		tab1:"Προσθήκη Αρίθμησης",
		tab2:"Άλλες Επιλογές",
		tab3:"Μέθοδος Μετονομασίας",
		descr:"Περιγραφή μεθόδου",
		mode:"Επιλέξτε μέθοδο",
		mod1:"Αντικαταστήσετε τις υπάρχουσες ονομασίες",
		mod2:"Προσθήκη μετά από τις υπάρχουσες ονομασίες",
		mod3:"Πορσθήκη μπροστά από τις υπάρχουσες ονομασίες",
		con:"ήπειρος",
		dis:"απόσταση",
		sector:"τομέας χάρτη",
		dir:"κατεύθυνση",
		beer:"μπύρα",
		wh:"ουίσκι",
		band:"μουσικά συγκροτήματα",
		sof:"τυχαία ονομασία",
		keimeno:"κείμενο",
		con_info:"Ο αριθμός της Ηπείρου στην οποία ανήκει κάθε χωριό",
		dis_info:"Η απόσταση (σε πεδία στο Χάρτη) κάθε χωριού από τις επιλεγμένες συντεταγμένες. Εισάγετε τις επιλεγμένες συντεταγμένες στο πεδίο αριστερά.",
		sector_info:"Κατηγοριοποίηση κάθε χωριού βάση της θέσης του στο Χάρτη ακολουθώντας το ακόλουθο σύστημα:<br><b>ήπειρος:τομέας:πεδίο</b>",
		sector_info1:"Ο Χάρτης διαχωρίζεται αριστερά προς τα δεξία και από πάνω προς τα κάτω.<br>Ο κάθε τομέας διαχωρίζεται βάση του ακόλουθου συστήματος:<br><br>Κόσμος - 100 ήπειροι (10x10)<br>Ήπειρος - 400 τομείς (20x20)<br>Τομέας - 25 πεδία (5x5)",
		dir_info:"Η κατεύθυνση κάθε χωριού μέσα στην Ήπειρο που ανήκει",
		beer_info:"Εισαγωγή μιας τυχαίας μάρκας μπύρας",
		keimeno_info:"Εισαγωγή επιλεγμένου κειμένου στην ονομασία",
		wh_info:"Εισαγωγή μιας τυχαίας μάρκας ουίσκι",
		band_info:"Εισαγωγή ενός τυχαίου ονόματος ενός μουσικού συγκροτήματος",
		sof_info:"Εισαγωγή μιας τυχαίας ονομασίας",
		sof_info1:"Οι ονομασίες που περιλαμβάνονται στη συγκεκριμένη επιλογή αποτελούν αποκλειστική δημιουργία και έμπνευση της <b><font color='red'>Poison13</font></b>, μιας Ελληνίδας παίκτριας των φυλετικών μαχών.<br><br>Προτείνεται να απενεργοποιήστε οποιαδήποτε άλλη επιλογή αν επιθυμείτε να ενεργοποιήσετε τη συγκεκριμένη.",
		dir1:"ΒΔ", /* North West */
		dir2:"Β", /* North */
		dir3:"ΒΑ", /* North East */
		dir4:"Δ", /* West */
		dir5:"Κ", /* Center */
		dir6:"Α", /* East */
		dir7:"ΝΔ", /* South West */
		dir8:"Ν", /* South */
		dir9:"ΝΑ", /* South East */
		dir_info1:"Επεξήγηση Κατεύθυνσης",
		dir_1:"Βορειοδυτικά",
		dir_2:"Βόρεια",
		dir_3:"Βορειοανατολικά",
		dir_4:"Δυτικά",
		dir_5:"Κέντρο",
		dir_6:"Ανατολικά",
		dir_7:"Νοτιοδυτικά",
		dir_8:"Νότια",
		dir_9:"Νοτιοανατολικά",
		pl:"παίκτης",
		roman:"Λατινικοί αριθμοί",
		pl_info:"Εισαγωγή του ονόματος του λογαριασμού σας",
		name_attention:"ΠΡΟΣΟΧΗ: Η ονομασία ενός χωριού δεν επιτρέπεται να περιλαμβάνει περισσότερους από 32 χαρακτήρες ή ειδικούς χαρακτήρες html.",
		pro1:"Διαδικασία μετονομασίας",
		temp:"Πρότυπα",
		apoth:"Ρυθμίσεις Αποθηκευμένων Ονομασιών",
		apothiki:"Αποθηκευμένες Ονομασίες",
		ren_speed:"Ρυθμίσεις Ταχύτητας Διαδικασίας Μετονομασίας",
		ren_speed1:"Ταχύτητα",
		ren_speed2:"Πλήθος μετονομασθέντων χωριών κατά προσέγγιση ανά δευτερόλεπτο",
		sp1:"Υψηλή",
		sp2:"Μέτρια",
		sp3:"Χαμηλή",
		sp4:"Πολύ χαμηλή",
		sp_vil:"χωριά/δευτ",
		apothiki_1:"Ομάδα No1",
		apothiki_2:"Ομάδα No2",
		apothiki_3:"Ομάδα No3",
		apothiki_4:"Ομάδα No4",
		temp1:"Βασικές πληροφορίες",
		temp2:"Ονομασίες με Στυλ",
		temp_0:"Προκαθορισμένο Πρότυπο",
		temp_1:"Πρότυπο No1",
		temp_2:"Πρότυπο No2",
		temp_3:"Πρότυπο No3",
		temp_4:"Πρότυπο No4",
		exp:"Επιλογές Εξαγωγής",
		exp_per:"Κωδικοποιημένο κείμενο ονομασιών",
		imp:"Επιλογές Εισαγωγής",
		templates:"Ρυθμίσεις Πρότυπων",
		title:"Τίτλος Πρότυπου",
		stat_save:"Αποθηκευμένο",
		stat_no:"Μη αποθηκευμένο",
		stat:"Κατάσταση αποθήκευσης",
		tsal_info1:"<center><b><font color='maroon'><u>Διαθέσιμες Λειτουργίες</u></font></b></center>1. Ορίστε τους τίτλους των <b><font color='red'>Πρότυπων Μετονομασίας</font></b> και των <b><font color='red'>Ομάδων Ονομασιών</font></b>.<br>2. Αποθηκεύστε τις ρυθμίσεις κάθε πρότυπου στις <b><font color='red'>Ρυθμίσεις Μετονομασίας</font></b> και τις ρυθμίσεις κάθε ομάδας στις <b><font color='red'>Ονομασίες Χωριών</font></b>.<br>3. Ορίστε τη ταχύτητα μετονομασίας χωριών. <b>Προτείνεται να μην υπερβείτε τη <font color='darkgreen'>Μέτρια</font> ταχύτητα</b>.<br><center><b>ΜΗΝ</b> παραλείπετε να επιλέγετε <b><font color='blue'>Αποθήκευση Ρυθμίσεων</font></b></center>",
	tsal_info2:"Ορίστε τις μεταβλητές που περιλαμβάνονται στη <b><font color='maroon'>Μορφή Μετονομασίας</b></font>. Μπορείτε να ελέγξτε την περιγραφή κάθε επιλογής για περισσότερες πληροφορίες. Μπορείτε να χρησιμοποιήσετε ένα από τα προκαθορισμένα πρότυπα ή να δημιουργήσετε τα δικά σας.<br><center><b>ΜΗΝ</b> παραλείπετε να επιλέγετε <b><font color='blue'>Αποθήκευση Ρυθμίσεων.</b></font></center>Κάθε προσαρμόσιμη μεταβλητή παρουσιάζεται στο παρακάτω πίνακα. Μπορείτε να εποπτεύετε τη προεπισκόπηση ονομασίας σε κάθε αλλαγή που πραγματοποιείτε. Τα επιπρόσθετα κείμενα κάθε μεταβλητής προστίθονται μπροστά από την αντίστοιχη επιλογή.",
	tsal_info3:"<center><b><font color='maroon'><u>Διαθέσιμες Λειτουργίες</u></font></b></center><b><font color='red'>1. Εξαγωγή: </font></b>Αποθηκεύσετε τις τρέχουσες ονομασίες χωριών σε μια Ομάδα ονομασιών ή να εξάγετε ένα κωδικοποιημένο κείμενο των ονομασιών και να το αποθηκεύσετε στο pc σας (<b>Εξαγωγή ονομασιών</b>).<br><b><font color='red'>2. Εισαγωγή: </font></b>Εισάγετε αποθηκευμένες ονομασίες χωριών ή ένα αποθηκευμένο κωδικοποιημένο κείμενο ονομασιών (<b>Εισαγωγή ονομασιών</b>).<br><b><font color='red'>3. Μετονομασία: </font></b>Μετονομάστε τα χωριά χρησιμοποιώντας το εισαγόμενο κωδικοποιημένο κείμενο. Δύναται να το τροποποιήσετε πριν τη μετονομασία.<br><center><b><font color='blue'>Οι Ομάδες ονομασιών αποθηκεύονται σε ένα μοναδικό φάκελο δεδομένων για το συγκεκριμένο κόσμο.</font></b></center>",
	tsal_info5:"ΠΡΟΣΟΧΗ: Η σειρά των διαθέσιμων επιλογών μετονομασίας δεν αποθηκεύεται. Για αυτό το λόγο πρώτα ενεργοποιείστε ένα πρότυπο και έπειτα προσδιορίστε τη σειρά των επιλογών.",
	},
	buttons:{
		lang_open:"Άνοιγμα επιλογής γλώσσας",
              lang_close:"Κλείσιμο επιλογής γλώσσας",
			  exp:"Εξαγωγή ονομασιών",
			  exp_close:"Κλείσιμο κωδικοποιημένου κειμένου",
			  imp:"Εισαγωγή ονομασιών",
			  imp1:"Φόρτωση",
		script_1:"Ρυθμίσεις Μετονομασίας",
		script_2:"Ονομασίες Χωριών",
		script_3:"Μετονομασία Χωριών",
		script_4:"Γενικές Ρυθμίσεις",
		script3:"Δημιουργός Ομάδας",
		save:"Αποθήκευση Ρυθμίσεων",
		hide:"Απόκρυψη Ρυθμίσεων",
		res_set:"Επανεκκίνηση Ρυθμίσεων",
		save1:"Αποθήκευση σε",
		save_def:"Αποθήκευση ως Προκαθορισμένο",
	},
	notes:{
		vils:"Πλήθος χωριών που μετονομάστηκαν",
		vils1:"Διάρκεια διαδικασίας μετονομασίας",
		vils2:"Σύνολο χωριών στη σελίδα",
		no_vils:"Η επιλεγμένη μετονομασίας δεν εφαρμόστηκε σε κανένα από τα χωριά της σελίδας",
		secs:"δευτερόλεπτα",
		imp_fail:"Δεν εντοπίστηκαν αποθηκευμένες ονομασίες στη συγκεκριμένη Ομάδα. Αποθηκεύστε ονομασίες και δοκιμάστε εκ νέου.",
		activated:"Το script Μετονομασία Χωριών είναι ήδη ενεργό",
		save:"Οι ρυθμίσεις έχουν αποθηκευτεί επιτυχώς.",
		save_exp:"Οι τρέχουσες ονομασίες των χωριών έχουν αποθηκευτεί επιτυχώς.",
		no_saved1:"Δεν εντοπίστηκαν αποθηκευμένες ρυθμίσεις για το συγκεκριμένο πρότυπο. Αποθηκεύστε ρυθμίσεις στο συγκεκριμένο πρότυπο και δοκιμάστε εκ νέου.",
		res_set:"Οι ρυθμίσεις έχουν επανεκκινηθεί επιτυχώς. Η σελίδα θα ανανεωθεί αυτόματα σε 3 δευτερόλεπτα.",
		res_set2:"Οι ρυθμίσεις έχουν επανεκκινηθεί επιτυχώς.",
	},
};
    return tsalkapone_trans[lang];
    }());
	
var Tsalactive = document.getElementById('combined_table');
			if (!Tsalactive) {
				var contact_url = "https://forum.tribalwars.net/index.php?members/tsalkapone.114063/";
	   var content = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="darkgreen">Tsalkapone. '+tsalkapone_trans.general.script+'</font></u></center></h2>' +
'<hr><p><center><font color=maroon><b>'+tsalkapone_trans.general.message_1+'</b></font></center></p>' +
'<p><center><font color=maroon><b>'+tsalkapone_trans.general.message_2+'</b></font></center></p>' +
'<br><br><center><input type="button" class="btn evt-confirm-btn btn-confirm-yes" id="go_man" value="'+tsalkapone_trans.general.message_yes+'">&emsp;<input type="button" class="btn evt-cancel-btn btn-confirm-no" id="close_this" value="'+tsalkapone_trans.general.message_no+'"></center>'+ 
'<br><br><hr><center><img class="tooltip-delayed" title="<font color=darkgreen>Tsalkapone. '+tsalkapone_trans.general.script+'</font>" src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg" style="cursor:help; position: relative"></center><br><center><p>'+tsalkapone_trans.general.comm+' <a href="'+contact_url+'" title="Tsalkapone profile" target="_blank">Tsalkapone</a>.</p></center>' +
'</div>';            
Dialog.show('village_renamer_intro', content);
$("#go_man").click(function () { window.location.assign(game_data.link_base_pure+"overview_villages&mode=combined");});   
$("#close_this").click(function () { var close_this = document.getElementsByClassName('popup_box_close'); close_this[0].click(); });
	} 
	else {	

var lang_img='';
        if (lang=="greek") {lang_img ='<img title="Ελληνικά" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif">';}
        else if (lang=="english") {lang_img ='<img height="20px" style="cursor:help;" title="English/American" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif">';}
  else if (lang=="italian") {lang_img ='<img height="20px" style="cursor:help;" title="Italian" width="30px" src="https://dl.dropboxusercontent.com/s/ho5ks4i0z7u5bpn/flag_italiano.gif">';}
 
 var tsaldiamorfwsi='<link rel="stylesheet" type="text/css" href="https://dl.dropboxusercontent.com/s/r3ov8brxa6oxoal/Tsalkapone.Advanced_Coords_Extractor.css" />';
	var	tsalbody='<style>';
tsalbody+='.tsalkembed1{ font-family: "Comic Sans MS", cursive, sans-serif;font-style:italic;color: purple;-webkit-animation: mymove1 3s infinite; -moz-animation: mymove1 3s infinite; animation: mymove1 6s infinite;font-weight: bold;}';
tsalbody+='@-webkit-keyframes mymove1 {50% {color: red;}} @-moz-keyframes mymove1 {50% {color: red;}} @keyframes mymove1 {50% {color:red;}';
tsalbody+='</style>';
var tsalscript='<script type="text/javascript">';
tsalscript+="function tsal_temps(){ loadConfig1 ('tsalkapone_name_settings_ekkinisi','tsalkapone_name_settings1_ekkinisi','tsalkapone_name_settings2_ekkinisi');";
tsalscript+="var x=document.getElementById('tsalkapone_temp').value; var y=document.getElementsByClassName('tsal_label'); var z=document.getElementsByClassName('tsal_extra'); var x1=document.getElementById('counter'); var x2=document.getElementById('counter1'); var x3=document.getElementById('digits'); var x4=document.getElementById('roman');";
tsalscript+=' if (x=="temp1"){ y[0].checked=true; y[1].checked=false; y[2].checked=false; y[3].checked=true; y[4].checked=true; y[5].checked=false; y[6].checked=false; y[7].checked=false; y[8].checked=false; y[9].checked=false; y[10].checked=false; y[11].checked=false; y[12].checked=false;';	
tsalscript+='z[0].value = " K"; z[3].value = " "; z[4].value=" "; x1.checked=true; x4.checked=false; x2.value=1; x3.value=4; tsalkapone_sample ();}';
tsalscript+=' if (x=="temp2"){ y[0].checked=false; y[1].checked=true; y[2].checked=false; y[3].checked=false; y[4].checked=false; y[5].checked=false; y[6].checked=false; y[7].checked=false; y[8].checked=true; y[9].checked=false; y[10].checked=false; y[11].checked=false; y[12].checked=false;';	
tsalscript+='x1.checked=true; x2.value=1; x4.checked=false; x3.value=4; z[8].value=" "; z[1].value="."; tsalkapone_sample ();}';
tsalscript+='};';
tsalscript+="function loadConfig1 (x,y,w) {if (localStorage.getItem(''+x+'') && localStorage.getItem(''+y+'') && localStorage.getItem(''+w+'')) {var tsal_check = JSON.parse(localStorage.getItem(''+x+''));";
tsalscript+="var tsal_check1 = JSON.parse(localStorage.getItem(''+y+''));var tsal_check2 = JSON.parse(localStorage.getItem(''+w+'')); var rows = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_label');";
tsalscript+="var rows1 = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_extra'); var tsal_number = document.getElementById('counter').checked; var tsal_roman = document.getElementById('roman').checked; var tsal_nub = document.getElementById('counter1').value;";
tsalscript+="var tsal_dig =document.getElementById('digits').value; tsal_number=tsal_check2[0]; tsal_nub=tsal_check2[1]; tsal_dig=tsal_check2[2]; tsal_roman=tsal_check2[3]; for (var i=0; i<rows.length; i++) {rows[i].checked = tsal_check[i];}";
tsalscript+="for (var i=0; i<rows1.length; i++) {rows1[i].value = tsal_check1[i];			}return true;} else{return false;}}";
tsalscript+="function tsalkapone_sample () {";
tsalscript+="function TsalRoman(x) {var num = Math.floor(x), val, s= '', i= 0, v = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1], r = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];";
tsalscript+="function toBigRoman(n) {var ret = '', n1 = '', rem = n;while (rem > 1000) {var prefix = '', suffix = '', n = rem, s = '' + rem, magnitude = 1;while (n > 1000) { n /= 1000;";
tsalscript+="magnitude *= 1000;prefix += '(';suffix += ')';}n1 = Math.floor(n);rem = s - (n1 * magnitude);ret += prefix + n1.toRoman() + suffix;}return ret + rem.toRoman();}";
tsalscript+="if (x - num || num < 1) num = 0;if (num > 3999) return toBigRoman(num);while (num) {val = v[i];while (num >= val) {num -= val;s += r[i];}++i;}return s;}";
tsalscript+="function beer1() {var result;var namePool1=['Heineken','Asahi','Corona','Krombacher','Baltika','Antartica','Miller','Coors Light','Brahma','Harbin','Paulaner','Amstel','Mythos','Fix','Yanjing','Carslberg','Skol',";
tsalscript+="'Budweiser','Bud','Tsingtao','Snow','Aphrodisiaque','Blue','Busch','Keiths','Carling','Molson','Guinness','Victoria','Sagres'];for(var k=0;k<1;k++)";
tsalscript+="{randomInt=Math.round(Math.random()*(namePool1.length-1));result=namePool1[randomInt];}return result;} var beer=document.getElementById('tsalbeer');";
tsalscript+="beer.innerHTML=beer1();";
tsalscript+="function year1() {var result;var namePool1=['happy new year','gott nytt år','gelukkig nieuwjaar','feliz ano novo','un an nou fericit','godt nyttår',";
tsalscript+="'kali xronia','šťastný nový rok','boldog új évet','godt nytår','sretna nova godina','šťastný nový rok','feliz año nuevo','	felice anno nuovo',";
tsalscript+="'yeni yılınız kutlu olsun','onnellista uutta vuotta','عام سعيد','Frohes neues Jahr','szczęśliwego nowego roku','srečno novo leto','selamat tahun baru',";
tsalscript+="'sretna nova godina','laimingų Naujųjų Metų','честита нова година','С Новым Годом','Срећна Нова година'];";
tsalscript+="for(var k=0;k<1;k++)";
tsalscript+="{randomInt=Math.round(Math.random()*(namePool1.length-1));result=namePool1[randomInt];}return result;} var year=document.getElementById('tsalyear');";
tsalscript+="year.innerHTML=year1();";
tsalscript+="function whiskey1() {var result;";
tsalscript+="var namePool1=['Black Nikka','Black Velvet','Crown Royal','Ballantine’s','Jim Beam','Suntory','Jameson','Canadian Club',";
tsalscript+="'Johnnie Walker','Jack Daniel','Cutty Sark','Drambuie','Macallan','Glenfiddich','Dalmore','Glenfarclas','Chivas'];for(var k=0;k<1;k++)";
tsalscript+="{randomInt=Math.round(Math.random()*(namePool1.length-1));result=namePool1[randomInt];}return result;} var whiskey=document.getElementById('tsalwhiskey');";
tsalscript+="whiskey.innerHTML=whiskey1();";
tsalscript+="function band1() {var result;";
tsalscript+="var namePool1=['Pink Floyd','Muse','Beatles','Oasis','Metallica','Led Zeppelin','Radiohead','Nirvana','Rolling Stones','Green Day','Pearl Jam','Coldplay','Iron Maiden','Stereophonics',";
tsalscript+="'RHCP','Queen','Maroon5','Ramones','AC/DC','R.E.M.','Arctic Monkeys','Deep Purple','Eagles','The Killers','Pixies','Placebo','U2','The Who','The Clash','Kodaline','Iggy Pop','Editors'];";
tsalscript+="for(var k=0;k<1;k++)";
tsalscript+="{randomInt=Math.round(Math.random()*(namePool1.length-1));result=namePool1[randomInt];}return result;} var band=document.getElementById('tsalband');";
tsalscript+="band.innerHTML=band1();";
tsalscript+="function pool1() {var result;";
tsalscript+="if(localStorage.getItem('tsalkapone_user_pool_names')){var tsal_pool =localStorage.getItem('tsalkapone_user_pool_names');var namePool1=tsal_pool.split(',');";
tsalscript+="for(var k=0;k<1;k++)";
tsalscript+="{randomInt=Math.round(Math.random()*(namePool1.length-1));result=namePool1[randomInt];}}else{result='';}return result;} var pool=document.getElementById('tsalpool');";
tsalscript+="pool.innerHTML=pool1();";
tsalscript+="function sophie1() {var result;var namePool1=['My FaVoRiTe GaMe','BLaCk WiDoW','BuTTeRFLieS AnD HuRRiCaNeS','CaStLe In ThE AiR','CauGhT OuT In ThE RaiN','ThE OnE I LoVE',";
tsalscript+="'CouNtiNg StaRs','DaRk PaRaDi$e','DeVa SanSkRiT','DrEaM-CaTcHeR','NeVeR SaY NeVeR','PiE In ThE SkY','Poi$oN and WiNe','SkY FuLL Of STaRs','SHiNe BRiGhT LiKe A DiaMonD',";
tsalscript+="'STaRDuSt LaDy,TiMe Is RuNNiNg OuT','ThE PoiSoNeD RoSe','RaiNBoW In ThE DaRk','ReQuieM FoR a DrEaM','RuNNiNG Up THaT HiLL','WiSh UpOn A STaR','YouNg AnD BeaUtiFuL','LiTtLe PrINce',";
tsalscript+="'LeS MiSErAbLeS','ToiS PluS MoiS','FaiRyTaLe','FaTaL AttRaCtiOn','GhOsT Of A RoSe','HaSta La VisTa...BaBy','In ThE TWiLiGhT','JuSt LiKe PoiSoN','MaGiC TRiCkS','MoOnLiGhT ShaDoW'];";
tsalscript+="for(var k=0;k<1;k++)";
tsalscript+="{randomInt=Math.round(Math.random()*(namePool1.length-1));result=namePool1[randomInt];}return result;} var sophie=document.getElementById('tsalsophie');";
tsalscript+="sophie.innerHTML=sophie1();";
tsalscript+="var format1='';var counter = document.getElementById('counter');var counter1 = document.getElementById('counter1').value;var digs = document.getElementById('digits').value;";
tsalscript+="var roman=document.getElementById('roman');";
tsalscript+="if (counter.checked && !roman.checked){var number=Number(Number(counter1)+ 33);for(;String(number).length<digs;digs--)format1+='0';format1+=number;}";
tsalscript+="else if (counter.checked && roman.checked){var number=Number(Number(counter1)+ 33);format1+=TsalRoman(number);}";
tsalscript+="else {format1+='';}";
tsalscript+="document.getElementById('tsalkapone_sample').innerHTML =format1;document.getElementById('tsalkapone_sample').innerHTML+=getTsalFormat();	var x=document.getElementById('tsalkapone_sample').innerHTML; var y=document.getElementById('tsalattention'); if(x.length>32){y.style.display='';} else {y.style.display='none';}};"
tsalscript+="function getTsalFormat() {var format = '';var inputs = document.getElementById('tsalkapone_config').getElementsByTagName('input');";
tsalscript+="var rows = document.getElementById('tsalkapone_config').getElementsByClassName('tsalkapone'); for(var i=0; i<rows.length; i++){ if(inputs[i*2].checked)";
tsalscript+="{if (inputs[i*2].id=='distance'){format += ''+rows[i].innerHTML+'';}else {format += inputs[i*2+1].value; format += ''+rows[i].innerHTML+'';}}}return format;};";
tsalscript+="function Tsal_vel() { var tsal_sp =document.getElementById('tsal_speed').value; var aprox = document.getElementById('pre_speed');";
tsalscript+="if (tsal_sp=='1') {aprox.innerHTML='<b><font color=\"red\" size=\"4\">5</font> '+tsalkapone_trans.general.sp_vil+'</b>';}";
tsalscript+="else if (tsal_sp=='2') {aprox.innerHTML='<b><font color=\"red\" size=\"4\">3.3</font> '+tsalkapone_trans.general.sp_vil+'</b>';}";
tsalscript+="else if (tsal_sp=='3') {aprox.innerHTML='<b><font color=\"red\" size=\"4\">2.2</font> '+tsalkapone_trans.general.sp_vil+'</b>';}";
tsalscript+="else if (tsal_sp=='4') {aprox.innerHTML='<b><font color=\"red\" size=\"4\">1.6</font> '+tsalkapone_trans.general.sp_vil+'</b>';}}";
tsalscript+='</script>';

$("head").append(tsaldiamorfwsi+tsalbody+tsalscript);     

var tsalkaponecell = "";
	tsalkaponecell+='<div id="tsalkapone_div" width="100%">';
tsalkaponecell+='<div align="center" style="width:100%;height:30px;line-height:30px;background:url(https://dl.dropboxusercontent.com/s/wwavk9gdi2dhbo5/tsalkapone_top.png) repeat-x">';
tsalkaponecell+='<font color="darkorange" size="4"><b><u>'+tsalkapone_trans.general.script+'</u></b></font>';
tsalkaponecell+='&emsp;<a class="tsalprofile" href="https://forum.tribalwars.net/index.php?members/tsalkapone.114063/" target="_blank">'+tsalkapone_trans.general.created+' Tsalkapone</a></div>';
	tsalkaponecell+='<div id="tsalbuttons" class="target-select clearfix vis" width="100%"><h4><font color=darkgreen><center>Tsalkapone. '+tsalkapone_trans.general.button_list+'</center></font></h4>';
	tsalkaponecell+='<table class="vis" style="width: 100%"><tbody>';
	tsalkaponecell+='<tr><th><font color="blue"><b><center>'+tsalkapone_trans.general.des+'</center></b></font></th>';
	tsalkaponecell+='</th><th><font color="blue"><b><center>'+tsalkapone_trans.general.but+'</center></b></font></th></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.script_4+'</b></font></td>';
	tsalkaponecell+='<td><input type="button" id="tsalscript4" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_4+'"></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.script_1+'</b></font></td>';
	tsalkaponecell+='<td><input type="button" id="tsalscript1" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_1+'"></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.script_2+'</b></font></td>';
	tsalkaponecell+='<td><input type="button" id="tsalscript2" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_2+'"></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.script_3+' <font size="4">&#9997;</font></b></font></td>';
	tsalkaponecell+='<td><input type="button" id="tsalscript3" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script3+'"></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.lang_sel+'</b></font></td>';
tsalkaponecell+='<td><font style="font-family: \'Arial Black\', Gadget, sans-serif;"><span id="openfilter1"><input type="button" value="'+tsalkapone_trans.buttons.lang_open+'" id="openfilterbut1" class="btn tsalbutton"></span><span id="closefilter1" style="display:none">';
tsalkaponecell+='<input class="btn tsalbutton" type="button" value="'+tsalkapone_trans.buttons.lang_close+'" id="closefilterbut1"></span></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.selected_one+'</b></font></td>';
tsalkaponecell+='<td><span id="selectedone"><center>'+lang_img+'</center></span><span id="columnfilter1" style="display:none" class="vis"><font size="2">';
tsalkaponecell+='<br><br><center><font color="blue"><b><u>'+tsalkapone_trans.general.available+'</u></b></font></center>';
tsalkaponecell+='<input type="radio"  name="language" value="greek" id="greek_lang" ><img title="Greek \n\nBy Tsalkapone" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif"><br>';
tsalkaponecell+='<input type="radio"  name="language" value="english" id="english_lang" checked><img height="20px" style="cursor:help;" title="English/American \n\nBy Tsalkapone" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif"><br>';
tsalkaponecell+='<input type="radio"  name="language" value="italian" id="italian_lang" checked><img height="20px" style="cursor:help;" title="Italian \n\nBy sndb & im lovin it" width="30px" src="https://dl.dropboxusercontent.com/s/ho5ks4i0z7u5bpn/flag_italiano.gif"><br>';
tsalkaponecell+='</span></td></tr></tbody></table></div><br><hr><span id="tsalresult"></span></div>';
if (! document.getElementById('tsalkapone_div')){
		$('#paged_view_content').prepend(tsalkaponecell);
}		
else {UI.SuccessMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br>'+tsalkapone_trans.notes.activated+'.', 5000);}

var Dialog1;(function(){'use strict';Dialog1={MAX_WIDTH:1200,closeCallback:null,show:function(id,content,closeCallback,options){options=$.extend({class_name:'',close_from_fader:true},options);this.closeCallback=closeCallback;var fullscreenElement=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement,container=fullscreenElement||'body',$container=$('.popup_box_container'),$box,$fader,$content,show_anim=false;if(!$container.length){show_anim=true;$container=$('<div class="popup_box_container" />');$box=$('<div class="popup_box" />').attr('id','popup_box_'+id).addClass(options.class_name).data('name',id).appendTo($container);$fader=$('<div class="fader" />').appendTo($container);$content=$('<div class="popup_box_content" />').appendTo($box);$container.appendTo($(container))}else{$box=$container.find('.popup_box');if($box.data('name')!==id){Dialog1.close();Dialog1.show(id,content,closeCallback,options);return};$content=$container.find('.popup_box_content');$box.css('width','auto')};$content.html(content);var height_buffer=125;if($(window).width()<500||$(window).height()<$content.height()+height_buffer){$box.addClass('mobile');$('.popup_box_content').css({'max-height':$(window).height()-(height_buffer/2)+'px'})};var border_width;if(typeof window.getComputedStyle==='function'){border_width=parseInt(getComputedStyle($box[0],null).borderLeftWidth)}else border_width=parseInt($box.css('border-left-width'));var min_width=200,width=Math.min(this.MAX_WIDTH,$content.width(),$(window).width()-border_width);if(width<min_width)width=min_width;if(!Modernizr.borderimage)width+=20;$box.css('width',width+'px');var hotkey_hint=(!mobile&&!mobiledevice&&HotKeys.enabled)?' :: ΟΟΞ½ΟΟΞΌΞ΅ΟΟΞ· ΟΞ»Ξ·ΞΊΟΟΞΏΞ»ΞΏΞ³Ξ―ΞΏΟ: <b>Esc</b>':'',tooltip_class=(!mobile&&!mobiledevice)?'tooltip-delayed':'',$close=$('<a class="popup_box_close '+tooltip_class+'" title="ΞΞ»Ξ΅Ξ―ΟΞ΅'+hotkey_hint+'" href="#">&nbsp;</a>').prependTo($content);UI.ToolTip($close,{delay:400});var close_elements=options.close_from_fader?'.fader, .popup_box_close, .popup_closer':'.popup_box_close, .popup_closer';$container.on('click',close_elements,function(){Dialog1.close(true);return false});if(show_anim)setTimeout(function(){$box.addClass('show')},50);UI.init();UnitPopup.init();setTimeout(QuestArrows.init,500)},close:function(by_user){$('.popup_box_container').remove();if(Dialog1.closeCallback)Dialog1.closeCallback(by_user);inlinePopupClose();$('.popup_style').hide();QuestArrows.init();return false},fetch:function(name,screen,get_params,callback,Dialog1_options,closeCallback){TribalWars.get(screen,get_params,function(data){Dialog1.show(name,data.Dialog1,closeCallback,Dialog1_options);if(callback)callback()})}}})();


 if (get_lang == "greek") {document.getElementById('greek_lang').checked = true;}
      else  if (get_lang == "english") {document.getElementById('english_lang').checked = true; }
	   else  if (get_lang == "italian") {document.getElementById('italian_lang').checked = true; }
         $("#english_lang").click(function(){
	localStorage.setItem("village_renamer_lang","english");     
location.reload();
    });
	 $("#italian_lang").click(function(){
	localStorage.setItem("village_renamer_lang","italian");     
location.reload();
    });
	
      $("#greek_lang").click(function(){
	localStorage.setItem("village_renamer_lang","greek");
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
	scriptname: 'Village Renamer',
	version: '1.0',
	author: 'Tsalkapone',
	email: 'tsalkapone@hotmail.com',
	broken: false
};
$.post(ScriptAPI.url,script);


$("#tsalscript4").click(function(){	
var tsalkosmos=game_data.world;
var temp1=''; var temp2=''; var temp3=''; var temp4='';
if (localStorage.getItem('tsalkapone_genika_name_settings1'))
{ var titles = JSON.parse(localStorage.getItem('tsalkapone_genika_name_settings1'));
temp1 = titles[4];
temp2 = titles[5];
temp3 = titles[6];
temp4 = titles[7];
}
else {
temp1 = tsalkapone_trans.general.temp_1;
temp2 = tsalkapone_trans.general.temp_2;
temp3 = tsalkapone_trans.general.temp_3;
temp4 = tsalkapone_trans.general.temp_4;
}
var stat1=''; var stat2=''; var stat3=''; var stat4='';
if (localStorage.getItem('tsalkapone1_name_settings')) {stat1='<center><font color="darkgreen"><b><span class="tsalshine">'+tsalkapone_trans.general.stat_save+'</span></b></font></center>';} else {stat1='<center><b><span class="pulse1">'+tsalkapone_trans.general.stat_no+'</span></b></center>';}
	if (localStorage.getItem('tsalkapone2_name_settings')) {stat2='<center><font color="darkgreen"><b><span class="tsalshine">'+tsalkapone_trans.general.stat_save+'</span></b></font></center>';} else {stat2='<center><b><span class="pulse1">'+tsalkapone_trans.general.stat_no+'</span></b></center>';}
if (localStorage.getItem('tsalkapone3_name_settings')) {stat3='<center><font color="darkgreen"><b><span class="tsalshine">'+tsalkapone_trans.general.stat_save+'</span></b></font></center>';} else {stat3='<center><b><span class="pulse1">'+tsalkapone_trans.general.stat_no+'</span></b></center>';}
if (localStorage.getItem('tsalkapone4_name_settings')) {stat4='<center><font color="darkgreen"><b><span class="tsalshine">'+tsalkapone_trans.general.stat_save+'</span></b></font></center>'; }else {stat4='<center><b><span class="pulse1">'+tsalkapone_trans.general.stat_no+'</span></b></center>';}

var apothiki1=''; var apothiki2=''; var apothiki3=''; var apothiki4='';
if (localStorage.getItem('tsalkapone_genika_name_settings1'))
{ var titles1 = JSON.parse(localStorage.getItem('tsalkapone_genika_name_settings1'));
apothiki1 = titles1[0];
apothiki2 = titles1[1];
apothiki3 = titles1[2];
apothiki4 = titles1[3];
}
else {
apothiki1 = tsalkapone_trans.general.apothiki_1;
apothiki2 = tsalkapone_trans.general.apothiki_2;
apothiki3 = tsalkapone_trans.general.apothiki_3;
apothiki4 = tsalkapone_trans.general.apothiki_4;
}
var stat_1=''; var stat_2=''; var stat_3=''; var stat_4='';
if (localStorage.getItem('tsalkapone_save_'+tsalkosmos+'_names1')) {stat_1='<center><font color="darkgreen"><b><span class="tsalshine">'+tsalkapone_trans.general.stat_save+'</span></b></font></center>';} else {stat_1='<center><b><span class="pulse1">'+tsalkapone_trans.general.stat_no+'</span></b></center>';}
	if (localStorage.getItem('tsalkapone_save_'+tsalkosmos+'_names2')) {stat_2='<center><font color="darkgreen"><b><span class="tsalshine">'+tsalkapone_trans.general.stat_save+'</span></b></font></center>';} else {stat_2='<center><b><span class="pulse1">'+tsalkapone_trans.general.stat_no+'</span></b></center>';}
if (localStorage.getItem('tsalkapone_save_'+tsalkosmos+'_names3')) {stat_3='<center><font color="darkgreen"><b><span class="tsalshine">'+tsalkapone_trans.general.stat_save+'</span></b></font></center>';} else {stat_3='<center><b><span class="pulse1">'+tsalkapone_trans.general.stat_no+'</span></b></center>';}
if (localStorage.getItem('tsalkapone_save_'+tsalkosmos+'_names4')) {stat_4='<center><font color="darkgreen"><b><span class="tsalshine">'+tsalkapone_trans.general.stat_save+'</span></b></font></center>'; }else {stat_4='<center><b><span class="pulse1">'+tsalkapone_trans.general.stat_no+'</span></b></center>';}



var tsalmenu ='<div class="target-select clearfix" width="100%">';
tsalmenu+='<div align="center" style="width:100%;height:30px;line-height:30px;background:url(https://dl.dropboxusercontent.com/s/wwavk9gdi2dhbo5/tsalkapone_top.png) repeat-x">';
tsalmenu+='<span class="tsaltooltip"><img style="cursor: help; height:20px; width:20px; margin-top:5px;" src="graphic/questionmark.png" ><span class="tsalinfo1">'+tsalkapone_trans.general.tsal_info1+'</span></span>&nbsp;';
tsalmenu+='<font color="darkorange" size="4"><b><u>'+tsalkapone_trans.buttons.script_4+'</u></b></font>';
tsalmenu+='&emsp;<a class="tsalprofile" href="https://forum.tribalwars.net/index.php?members/tsalkapone.114063/" target="_blank">'+tsalkapone_trans.general.created+' Tsalkapone</a></div>';
tsalmenu+="<table id='tsalkapone_config'  width='100%'><tbody><tr><td width='50%'>";
tsalmenu+="<table id='tsalkapone1' class='vis' width='100%' ><tbody>";
tsalmenu+="<tr><th colspan='3'><center><b><font color='maroon'>"+tsalkapone_trans.general.apoth+"</font></b></center></th>";
tsalmenu+="<tr><th>"+tsalkapone_trans.general.apothiki+"</th>";
tsalmenu+="<th>"+tsalkapone_trans.general.res_title+"</th><th>"+tsalkapone_trans.general.stat+"</th></tr>";
tsalmenu+="<tr><td>"+apothiki1+"</td>";
tsalmenu+="<td><input type='text' class='tsal_temps' id='title1' value='"+apothiki1+"'></td>";
tsalmenu+="<td>"+stat_1+"</td></tr>";
tsalmenu+="<tr><td>"+apothiki2+"</td>";
tsalmenu+="<td><input type='text' class='tsal_temps' id='title2' value='"+apothiki2+"'></td>";
tsalmenu+="<td>"+stat_2+"</td></tr>";
tsalmenu+="<tr><td>"+apothiki3+"</td>";
tsalmenu+="<td><input type='text' class='tsal_temps' id='title3' value='"+apothiki3+"'></td>";
tsalmenu+="<td>"+stat_3+"</td></tr>";
tsalmenu+="<tr><td>"+apothiki4+"</td>";
tsalmenu+="<td><input type='text' class='tsal_temps' id='title4' value='"+apothiki4+"'></td>";
tsalmenu+="<td>"+stat_4+"</td></tr>";
tsalmenu+="</tbody></table></td>";
tsalmenu+="<td width='50%'><table id='tsalkapone2'  class='vis' width='100%'><tbody>";
tsalmenu+="<tr><th colspan='3'><center><b><font color='maroon'>"+tsalkapone_trans.general.templates+"</font></b></center></th>";
tsalmenu+="<tr><th>"+tsalkapone_trans.general.temp+"</th>";
tsalmenu+="<th>"+tsalkapone_trans.general.title+"</th><th>"+tsalkapone_trans.general.stat+"</th></tr>";
tsalmenu+="<tr><td>"+temp1+"</td>";
tsalmenu+="<td><input type='text' class='tsal_temps' id='title1' value='"+temp1+"'></td>";
tsalmenu+="<td>"+stat1+"</td></tr>";
tsalmenu+="<tr><td>"+temp2+"</td>";
tsalmenu+="<td><input type='text' class='tsal_temps' id='title2' value='"+temp2+"'></td>";
tsalmenu+="<td>"+stat2+"</td></tr>";
tsalmenu+="<tr><td>"+temp3+"</td>";
tsalmenu+="<td><input type='text' class='tsal_temps' id='title3' value='"+temp3+"'></td>";
tsalmenu+="<td>"+stat3+"</td></tr>";
tsalmenu+="<tr><td>"+temp4+"</td>";
tsalmenu+="<td><input type='text' class='tsal_temps' id='title4' value='"+temp4+"'></td>";
tsalmenu+="<td>"+stat4+"</td></tr>";
tsalmenu+="</tbody></table></td></tr>";
tsalmenu+="<table id='tsalkapone2' class='vis' width='100%' ><tbody>";
tsalmenu+="<tr><th colspan='2'><center><b><font color='maroon'>"+tsalkapone_trans.general.ren_speed+"</font></b></center></th>";
tsalmenu+="<tr><th><center>"+tsalkapone_trans.general.ren_speed1+"</center></th><th><center>"+tsalkapone_trans.general.ren_speed2+"</center></th></tr>";
tsalmenu+='<tr><td><center><select id="tsal_speed" onchange="Tsal_vel();"><option value="1">'+tsalkapone_trans.general.sp1+'</option>';
tsalmenu+='<option value="2">'+tsalkapone_trans.general.sp2+'</option>';
tsalmenu+='<option value="3">'+tsalkapone_trans.general.sp3+'</option>';
tsalmenu+='<option value="4">'+tsalkapone_trans.general.sp4+'</option></select></td>';
tsalmenu+='<td><center><span id="pre_speed"></span></td>';
tsalmenu+="</tr></tbody></table>";
tsalmenu+='</tbody></table><br><center><input type="button" class="btn tsalbutton" id="Tsalsave" value="'+tsalkapone_trans.buttons.save+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalreset" value="'+tsalkapone_trans.buttons.res_set+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalhide" value="'+tsalkapone_trans.buttons.hide+'"></center></div><hr>';
document.getElementById('tsalresult').innerHTML = tsalmenu;

var aprox = document.getElementById('pre_speed');

if (!localStorage.getItem('tsal_renaming_speed'))
{document.getElementById('tsal_speed').value="3"; Tsal_vel();}

function saveConfig () {
	var tsal_taxutita = document.getElementById('tsal_speed').value;
		var rows = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_gen');
		var rows1 = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_temps');
		var options = new Array();
		for (var i=0; i<rows.length; i++) {
			options[i] = rows[i].checked;			
		}
		var options1 = new Array();
		for (var i1=0; i1<rows1.length; i1++) {
			options1[i1] = rows1[i1].value;			
		}
	var	tsalkapone_genika_name_settings = options;
	var	tsalkapone_genika_name_settings1 = options1;
		
		localStorage.setItem('tsalkapone_genika_name_settings',JSON.stringify(tsalkapone_genika_name_settings));
		localStorage.setItem('tsalkapone_genika_name_settings1',JSON.stringify(tsalkapone_genika_name_settings1));
		localStorage.setItem('tsal_renaming_speed',tsal_taxutita);
	}

	
	function loadConfig () {
		if (localStorage.getItem('tsalkapone_genika_name_settings') && localStorage.getItem('tsalkapone_genika_name_settings1') && localStorage.getItem('tsal_renaming_speed')) {
			var tsal_check = JSON.parse(localStorage.getItem('tsalkapone_genika_name_settings'));
			var tsal_check1 = JSON.parse(localStorage.getItem('tsalkapone_genika_name_settings1'));
			var tsal_speed=localStorage.getItem('tsal_renaming_speed');
			document.getElementById('tsal_speed').value=tsal_speed;
if (tsal_speed=="1") {aprox.innerHTML='<b><font color="red" size="4">5</font> '+tsalkapone_trans.general.sp_vil+'</b>';}
else if (tsal_speed=="2") {aprox.innerHTML='<b><font color="red" size="4">3.3</font> '+tsalkapone_trans.general.sp_vil+'</b>';}
else if (tsal_speed=="3") {aprox.innerHTML='<b><font color="red" size="4">2.2</font> '+tsalkapone_trans.general.sp_vil+'</b>';}
else if (tsal_speed=="4") {aprox.innerHTML='<b><font color="red" size="4">1.6</font> '+tsalkapone_trans.general.sp_vil+'</b>';}
			var rows = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_gen');
			var rows1 = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_temps');
		for (var i=0; i<rows.length; i++) {
			rows[i].checked = tsal_check[i];			
		}
		for (var i1=0; i1<rows1.length; i1++) {
			rows1[i1].value= tsal_check1[i1];			
		}
			return true;
		} else {
			return false;
		}
	}
	loadConfig ();

$("#Tsalreset").click(function(){ 
localStorage.removeItem("tsalkapone_genika_name_settings"); 
localStorage.removeItem("tsalkapone_genika_name_settings1"); 
localStorage.removeItem("tsal_renaming_speed");
UI.SuccessMessage('<span id=tsalkaponesuccesssave><b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></span><br><br>'+tsalkapone_trans.notes.res_set2+'', 3000);  
$("#tsalscript4").click();
	});
	$("#Tsalhide").click(function(){ document.getElementById('tsalresult').innerHTML=''; });
	$("#Tsalsave").click(function(){ saveConfig ();
 var tsalk_etiketa = localStorage.getItem('tsalkapone_genika_name_settings'); var tsalk_etiketa1 = localStorage.getItem('tsalkapone_genika_name_settings1');console.log('\n\nTsalkapone ~ General Settings:\n'+tsalk_etiketa+'\n'+tsalk_etiketa1);				
UI.SuccessMessage('<span id=tsalkaponesuccesssave><b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></span><br><br>'+tsalkapone_trans.notes.save+'', 3000);  
 })

}); 


$("#tsalscript3").click(function(){	


var pool_title;
if (localStorage.getItem('tsalkapone_user_pool_title'))
{pool_title=localStorage.getItem('tsalkapone_user_pool_title');}
else {pool_title=tsalkapone_trans.general.p_tit;}

var pool_names;
if (localStorage.getItem('tsalkapone_user_pool_names'))
{pool_names=localStorage.getItem('tsalkapone_user_pool_names');}
else {pool_names='';}



var tsalmenu ='<div class="target-select clearfix" width="100%">';
tsalmenu+='<div align="center" style="width:100%;height:30px;line-height:30px;background:url(https://dl.dropboxusercontent.com/s/wwavk9gdi2dhbo5/tsalkapone_top.png) repeat-x">';
tsalmenu+='<font color="darkorange" size="4"><b><u>'+tsalkapone_trans.general.script3+'</u></b></font>';
tsalmenu+='&emsp;<a class="tsalprofile" href="https://forum.tribalwars.net/index.php?members/tsalkapone.114063/" target="_blank">'+tsalkapone_trans.general.created+' Tsalkapone</a></div>';
tsalmenu+="<table id='tsalkapone_config' class='vis' width='100%'><tbody>";
tsalmenu+="<tr><th colspan='2'><center><font color='maroon'>"+tsalkapone_trans.general.pool1+"</font></center></th></tr>";
tsalmenu+="<tr><th><center>"+tsalkapone_trans.general.pool2+"</center></th><th><center>"+tsalkapone_trans.general.pool3+"</center></th></tr>";
tsalmenu+='<tr><td>'+tsalkapone_trans.general.p_method+'</td><td><center><select id="p_method"><option value="1">'+tsalkapone_trans.general.p_met2+'</option><option value="2">'+tsalkapone_trans.general.p_met1+'</option></select></td></tr>';
tsalmenu+='<tr><td>'+tsalkapone_trans.general.p_title+'</td><td><center><input id="tsalpool1" type="text" value="'+pool_title+'"></td></tr>';
tsalmenu+="<tr><th colspan='2'><center><font color='maroon'>"+tsalkapone_trans.general.pool4+"</font></center></th></tr>";
tsalmenu+="<tr><td colspan='2'><center><textarea id='pool_names' rows='10' cols='100' >"+pool_names+"</textarea></center></td></tr>";
tsalmenu+="<tr><td colspan='2'><center><input type='button' id='Tsalsave' class='btn tsalbutton' value='"+tsalkapone_trans.buttons.save1+" "+pool_title+"'></center></td></tr>";
tsalmenu+='</tbody></table>';
tsalmenu+='<hr><center><input type="button" class="btn tsalbutton" id="Tsalreset" value="'+tsalkapone_trans.buttons.res_set+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalhide" value="'+tsalkapone_trans.buttons.hide+'"></center></div><hr>';
document.getElementById('tsalresult').innerHTML = tsalmenu;

if (localStorage.getItem('tsalkapone_user_pool_method'))
{var method =localStorage.getItem('tsalkapone_user_pool_method');
document.getElementById('p_method').value=method;
}


$("#Tsalsave").click(function(){ 
var x=document.getElementById('pool_names').value;
var y=document.getElementById('tsalpool1').value;
var z=document.getElementById('p_method').value;
localStorage.setItem("tsalkapone_user_pool_names",x);
localStorage.setItem("tsalkapone_user_pool_title",y);
localStorage.setItem("tsalkapone_user_pool_method",z);
UI.SuccessMessage('<b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b><br><br>'+tsalkapone_trans.notes.save+'', 3000);  
});
	$("#Tsalhide").click(function(){ document.getElementById('tsalresult').innerHTML=''; });
	$("#Tsalreset").click(function(){ 
localStorage.removeItem("tsalkapone_user_pool_names"); 
localStorage.removeItem("tsalkapone_user_pool_title"); 
localStorage.removeItem("tsalkapone_user_pool_method"); 
UI.SuccessMessage('<b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b><br><br>'+tsalkapone_trans.notes.res_set2+'', 3000);  
$("#tsalscript3").click();
	});
}); 

$("#tsalscript2").click(function(){	
var tsalkosmos = game_data.world;
var apothiki1=''; var apothiki2=''; var apothiki3=''; var apothiki4='';
if (localStorage.getItem('tsalkapone_genika_name_settings1'))
{ var titles1 = JSON.parse(localStorage.getItem('tsalkapone_genika_name_settings1'));
apothiki1 = titles1[0];
apothiki2 = titles1[1];
apothiki3 = titles1[2];
apothiki4 = titles1[3];
}
else {
apothiki1 = tsalkapone_trans.general.apothiki_1;
apothiki2 = tsalkapone_trans.general.apothiki_2;
apothiki3 = tsalkapone_trans.general.apothiki_3;
apothiki4 = tsalkapone_trans.general.apothiki_4;
}

var tsalmenu ='<div class="target-select clearfix" width="100%">';
tsalmenu+='<div align="center" style="width:100%;height:30px;line-height:30px;background:url(https://dl.dropboxusercontent.com/s/wwavk9gdi2dhbo5/tsalkapone_top.png) repeat-x">';
tsalmenu+='<span class="tsaltooltip"><img style="cursor: help; height:20px; width:20px; margin-top:5px;" src="graphic/questionmark.png" ><span class="tsalinfo1">'+tsalkapone_trans.general.tsal_info3+'</span></span>&nbsp;';
tsalmenu+='<font color="darkorange" size="4"><b><u>'+tsalkapone_trans.general.script2+'</u></b></font>';
tsalmenu+='&emsp;<a class="tsalprofile" href="https://forum.tribalwars.net/index.php?members/tsalkapone.114063/" target="_blank">'+tsalkapone_trans.general.created+' Tsalkapone</a></div>';
tsalmenu+="<table id='tsalkapone_config'  width='100%'><tbody>";
tsalmenu+="<tr><th><center><font color='maroon'>"+tsalkapone_trans.general.exp+"</font></center></th></tr>";
tsalmenu+='</tbody></table>';
tsalmenu+='<hr><center><input type="button" class="btn tsalbutton" id="exp1" value="'+tsalkapone_trans.buttons.exp+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="exp2" value="'+tsalkapone_trans.buttons.save1+' '+apothiki1+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="exp3" value="'+tsalkapone_trans.buttons.save1+' '+apothiki2+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="exp4" value="'+tsalkapone_trans.buttons.save1+' '+apothiki3+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="exp5" value="'+tsalkapone_trans.buttons.save1+' '+apothiki4+'"></center>';
tsalmenu+='<hr><center><span id="exp_per"></span></center>';
tsalmenu+="<table id='tsalkapone_config1'  width='100%'><tbody>";
tsalmenu+="<tr><th><center><font color='maroon'>"+tsalkapone_trans.general.imp+"</font></center></th></tr>";
tsalmenu+='</tbody></table>';
tsalmenu+='<hr><center><input type="button" class="btn tsalbutton" id="imp1" value="'+tsalkapone_trans.buttons.imp+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="imp2" value="'+tsalkapone_trans.buttons.imp1+' '+apothiki1+'" >&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="imp3" value="'+tsalkapone_trans.buttons.imp1+' '+apothiki2+'" >&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="imp4" value="'+tsalkapone_trans.buttons.imp1+' '+apothiki3+'" >&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="imp5" value="'+tsalkapone_trans.buttons.imp1+' '+apothiki4+'" ></center>';
tsalmenu+='<hr><center><span id="imp_per"></span></center>';
tsalmenu+='<br><center>';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalreset" value="'+tsalkapone_trans.buttons.res_set+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalhide" value="'+tsalkapone_trans.buttons.hide+'"></center></div><hr>';
document.getElementById('tsalresult').innerHTML = tsalmenu;

	var Tsalkapone_μοτίβο_διαχωρισμού= [",", ";"];
	 var vils = new Array();
	 var nameSaveButtons=new Array();
	 
var saveDelay;
if (localStorage.getItem('tsal_renaming_speed'))
{var tsal_sp =localStorage.getItem('tsal_renaming_speed');
if(tsal_sp=="1") {saveDelay=200;}
else if(tsal_sp=="2") {saveDelay=300;}	
else if(tsal_sp=="3") {saveDelay=450;}	
else if(tsal_sp=="4") {saveDelay=600;}		
}
else {saveDelay=450;}
	 
function Tsalrename (){
	var xwria = document.getElementById('vil_names').value;
        var  p = xwria.split(Tsalkapone_μοτίβο_διαχωρισμού[0]);
var villaname, id, village;
var i = 0;
var pro=0;
var x=0;

function myLoop (w,z) {         
	var rows = document.getElementById('combined_table').rows;
	var row_fix=rows.length-1;
	var dur=((row_fix*saveDelay)/1000).toFixed(1);
	var tsal_st=z;
	var xwria = row_fix - Number(tsal_st);
	var tsalratio=Math.floor((w/xwria)*100);
	UI.InfoMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br>'+tsalkapone_trans.general.pro1+': '+tsalratio+'%',3000,'success');
   setTimeout(function () {    
 id = p[i].split(Tsalkapone_μοτίβο_διαχωρισμού[1])[0];
villaname = p[i].split(Tsalkapone_μοτίβο_διαχωρισμού[1])[1];
if (villaname && villaname.length<=32){
	pro+=1; 
village = $('span[class="quickedit-vn"][data-id="'+id+'"]');
$(village).find('span').eq(1).text(villaname);
$(village).find('a').eq(1).click();
$(village).find('input').eq(0).val(villaname);
$(village).find('input').eq(1).click();
}
else {x+=1;}
      i++;                     
      if (i <p.length) {           
         myLoop(pro,x);             
      }
else {
UI.InfoMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font><br><br>'+tsalkapone_trans.notes.vils2+': <b><font color=gold>'+row_fix+'</font></b><br><br>'+tsalkapone_trans.notes.vils+': <b><font color=gold>'+xwria+'</font></b><br><br>'+tsalkapone_trans.notes.vils1+': <b><font color=gold>'+dur+'</font> '+tsalkapone_trans.notes.secs+'</b>',8000,'success');}	
}, saveDelay);
}

myLoop(pro,x);   
}

function saveVillageNames(x,y)
{ var savedCounter=y;
	var rows = document.getElementById('combined_table').rows;
	var row_fix=rows.length-1;
	var dur=((row_fix*saveDelay)/1000).toFixed(1);
/*	var tsal_st = localStorage.getItem('tsal_stathera'); */
var tsal_st=x;
	var xwria = row_fix - Number(tsal_st);
	
	if(nameSaveButtons.length>0)
{ window.setTimeout(function()
{var buttons=nameSaveButtons.pop();buttons.click();savedCounter++;
if(nameSaveButtons.length>0){
var tsalcount=savedCounter+1;
var tsalratio=Math.floor((tsalcount/xwria)*100);
UI.InfoMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br>'+tsalkapone_trans.general.pro1+': '+tsalratio+'%',3000,'success');
saveVillageNames(x,savedCounter);}
else{UI.InfoMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font><br><br>'+tsalkapone_trans.notes.vils2+': <b><font color=gold>'+row_fix+'</font></b><br><br>'+tsalkapone_trans.notes.vils+': <b><font color=gold>'+xwria+'</font></b><br><br>'+tsalkapone_trans.notes.vils1+': <b><font color=gold>'+dur+'</font> '+tsalkapone_trans.notes.secs+'</b>',8000,'success');}},saveDelay); }
else{UI.InfoMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br>'+tsalkapone_trans.notes.no_vils+'',8000,'error');}}

function main_import() {
var x="<table id='tsalkapone_exp'  width='100%'><tbody>";
x+='<tr><th><center><font color="darkgreen">'+tsalkapone_trans.general.exp_per+'</font></center></th></tr>';
x+='<tr><td><center><textarea id="vil_names" rows="10" cols="100" onclick="javascript:select();"></textarea></center></td></tr>';
x+='<tr><td><center><input type="button" class="btn tsalbutton" id="Tsalrename" value="&#9998; '+tsalkapone_trans.buttons.script_3+'">&emsp;<input type="button" class="btn tsalbutton" id="imp_close" value="'+tsalkapone_trans.buttons.exp_close+'"></center></td></tr>';
x+='</tbody></table><hr>';
document.getElementById('imp_per').innerHTML=x;
$("#Tsalrename").click(function(){ Tsalrename();});
$("#imp_close").click(function(){document.getElementById('imp_per').innerHTML='';});
}

function tsal_import(z,w) {
	if (localStorage.getItem(''+z+'')){
		var names = localStorage.getItem(''+z+'');
var x="<table id='tsalkapone_exp'  width='100%'><tbody>";
x+='<tr><th><center><font color="darkgreen">'+tsalkapone_trans.general.exp_per+' ~ </font><font color="red">'+w+'</font></center></th></tr>';
x+='<tr><td><center><textarea id="vil_names" rows="10" cols="100" onclick="javascript:select();">' + names + '</textarea></center></td></tr>';
x+='<tr><td><center><input type="button" class="btn tsalbutton" id="Tsalrename" value="&#9998; '+tsalkapone_trans.buttons.script_3+'">&emsp;<input type="button" class="btn tsalbutton" id="imp_close" value="'+tsalkapone_trans.buttons.exp_close+'"></center></td></tr>';
x+='</tbody></table><hr>';
document.getElementById('imp_per').innerHTML=x;
$("#Tsalrename").click(function(){ Tsalrename();});
$("#imp_close").click(function(){document.getElementById('imp_per').innerHTML='';});
}
else {
UI.ErrorMessage('<b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b><br><br>'+tsalkapone_trans.notes.imp_fail+'', 3000);
}}

function tsal_export() {
    var vlist = "";
var villaname, id;
$('.quickedit-vn').each(function()
{
id = $(this).attr('data-id');
villaname = $(this).find('span').eq(1).attr('data-text');
vlist += id+Tsalkapone_μοτίβο_διαχωρισμού[1]+villaname+Tsalkapone_μοτίβο_διαχωρισμού[0];
    });
var x="<table id='tsalkapone_exp'  width='100%'><tbody>";
x+='<tr><th><center><font color="darkgreen">'+tsalkapone_trans.general.exp_per+'</font></center></th></tr>';
x+='<tr><td><center><textarea rows="10" cols="100" onclick="javascript:select();">' + vlist + '</textarea></center></td></tr>';
x+='<tr><td><center><input type="button" class="btn tsalbutton" id="exp_close" value="'+tsalkapone_trans.buttons.exp_close+'"></center></td></tr>';
x+='</tbody></table><hr>';
document.getElementById('exp_per').innerHTML=x;
$("#exp_close").click(function(){document.getElementById('exp_per').innerHTML='';});
}

function save_export(z) {
	var Tsalkapone_μοτίβο_διαχωρισμού= [",", ";"];
    var vlist = "";
var villaname, id;
$('.quickedit-vn').each(function()
{
id = $(this).attr('data-id');
villaname = $(this).find('span').eq(1).attr('data-text');
vlist += id+Tsalkapone_μοτίβο_διαχωρισμού[1]+villaname+Tsalkapone_μοτίβο_διαχωρισμού[0];
    });
localStorage.setItem(''+z+'',vlist);
UI.SuccessMessage('<span id=tsalkaponesuccesssave><b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></span><br><br>'+tsalkapone_trans.notes.save_exp+'', 3000);
}

$("#exp1").click(function(){tsal_export();});
$("#exp2").click(function(){save_export('tsalkapone_save_'+tsalkosmos+'_names1');});
$("#exp3").click(function(){save_export('tsalkapone_save_'+tsalkosmos+'_names2');});
$("#exp4").click(function(){save_export('tsalkapone_save_'+tsalkosmos+'_names3');});
$("#exp5").click(function(){save_export('tsalkapone_save_'+tsalkosmos+'_names4');});

$("#imp1").click(function(){main_import();});
$("#imp2").click(function(){tsal_import('tsalkapone_save_'+tsalkosmos+'_names1',''+apothiki1+'');});
$("#imp3").click(function(){tsal_import('tsalkapone_save_'+tsalkosmos+'_names2',''+apothiki2+'');});
$("#imp4").click(function(){tsal_import('tsalkapone_save_'+tsalkosmos+'_names3',''+apothiki3+'');});
$("#imp5").click(function(){tsal_import('tsalkapone_save_'+tsalkosmos+'_names4',''+apothiki4+'');});

	$("#Tsalhide").click(function(){ document.getElementById('tsalresult').innerHTML=''; });
	$("#Tsalreset").click(function(){ 
localStorage.removeItem("tsalkapone_save_"+tsalkosmos+"_names1"); 
localStorage.removeItem("tsalkapone_save_"+tsalkosmos+"_names2"); 
localStorage.removeItem("tsalkapone_save_"+tsalkosmos+"_names3"); 
localStorage.removeItem("tsalkapone_save_"+tsalkosmos+"_names4");
UI.SuccessMessage('<span id=tsalkaponesuccesssave><b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></span><br><br>'+tsalkapone_trans.notes.res_set2+'', 3000);  
$("#tsalscript2").click();
	});
}); 
 
 $("#tsalscript1").click(function(){	
var temp0 = tsalkapone_trans.general.temp_0;
var temp1=''; var temp2=''; var temp3=''; var temp4='';
if (localStorage.getItem('tsalkapone_genika_name_settings1'))
{ var titles = JSON.parse(localStorage.getItem('tsalkapone_genika_name_settings1'));
temp1 = titles[4];
temp2 = titles[5];
temp3 = titles[6];
temp4 = titles[7];
}
else {
temp1 = tsalkapone_trans.general.temp_1;
temp2 = tsalkapone_trans.general.temp_2;
temp3 = tsalkapone_trans.general.temp_3;
temp4 = tsalkapone_trans.general.temp_4;
}
var own_pool;
if (localStorage.getItem('tsalkapone_user_pool_title'))
{own_pool=localStorage.getItem('tsalkapone_user_pool_title');}
else {own_pool=tsalkapone_trans.general.p_tit;}
var tsalplayer = game_data.player.name;
var tsaldrag='<div style="width: 11px; height:11px; background-image: url(https://dsen.innogamescdn.com/8.48.1/29746/graphic/sorthandle.png); cursor:move" class="qbhandle" title="'+tsalkapone_trans.general.drag+'"> </div>';
var dir_info='<center><b><font color="maroon"><u>'+tsalkapone_trans.general.dir_info1+'</u></font></b></center>';
dir_info+='<ul style="list-style-type:square"><li><b>'+tsalkapone_trans.general.dir1+'</b> &#8667; '+tsalkapone_trans.general.dir_1+'</li>';
dir_info+='<li><b>'+tsalkapone_trans.general.dir2+'</b> &#8667; '+tsalkapone_trans.general.dir_2+'</li>';
dir_info+='<li><b>'+tsalkapone_trans.general.dir3+'</b> &#8667; '+tsalkapone_trans.general.dir_3+'</li>';
dir_info+='<li><b>'+tsalkapone_trans.general.dir4+'</b> &#8667; '+tsalkapone_trans.general.dir_4+'</li>';
dir_info+='<li><b>'+tsalkapone_trans.general.dir5+'</b> &#8667; '+tsalkapone_trans.general.dir_5+'</li>';
dir_info+='<li><b>'+tsalkapone_trans.general.dir6+'</b> &#8667; '+tsalkapone_trans.general.dir_6+'</li>';
dir_info+='<li><b>'+tsalkapone_trans.general.dir7+'</b> &#8667; '+tsalkapone_trans.general.dir_7+'</li>';
dir_info+='<li><b>'+tsalkapone_trans.general.dir8+'</b> &#8667; '+tsalkapone_trans.general.dir_8+'</li>';
dir_info+='<li><b>'+tsalkapone_trans.general.dir9+'</b> &#8667; '+tsalkapone_trans.general.dir_9+'</li>';
dir_info+='</ul>';

var tsalmenu ='<div class="target-select clearfix vis" width="100%">';
tsalmenu+='<div align="center" style="width:100%;height:30px;line-height:30px;background:url(https://dl.dropboxusercontent.com/s/wwavk9gdi2dhbo5/tsalkapone_top.png) repeat-x">';
tsalmenu+='<span class="tsaltooltip"><img style="cursor: help; height:20px; width:20px; margin-top:5px;" src="graphic/questionmark.png" ><span class="tsalinfo1">'+tsalkapone_trans.general.tsal_info2+'<br><span class="tsalkembed1">'+tsalkapone_trans.general.tsal_info5+'</span></span></span>&nbsp;';
tsalmenu+='<font color="darkorange" size="4"><b><u>'+tsalkapone_trans.buttons.script_1+'</u></b></font>';
tsalmenu+='&emsp;<a class="tsalprofile" href="https://forum.tribalwars.net/index.php?members/tsalkapone.114063/" target="_blank">'+tsalkapone_trans.general.edited_by+' Tsalkapone</a></div>';
tsalmenu+='<div>';
tsalmenu+='<div class="float_right"><br>';
tsalmenu+='<font style="font-family: \'Comic Sans MS\', cursive, sans-serif;" size="2" color="darkgreen"><b><u>Tsalkapone ~ '+tsalkapone_trans.general.temp+':</u></b></font>';
tsalmenu+='&emsp;<select onchange="tsal_temps();" id="tsalkapone_temp" >';
tsalmenu+='<option value="temp1">'+tsalkapone_trans.general.temp1+'</option>';
tsalmenu+='<option value="temp2">'+tsalkapone_trans.general.temp2+'</option>';
tsalmenu+='</select>';
tsalmenu+='</div><br><br><hr><center><img id="tsalsample_img" height="80px;" width="200px;" src="https://dl.dropboxusercontent.com/s/1uhr6byjpq9cchr/Tsalkapone_sample.gif" ></center>';
tsalmenu+='<br>&nbsp;<font color="blue"><b><span id="tsalkapone_sample"></span></b></font><center><span id="tsalattention" style="display:none" class="tsalkembed1"><hr><img width="20px;" src="https://dl.dropboxusercontent.com/s/s9swak86tirwdpd/Tsalkapone.%20Warning.gif">&emsp;'+tsalkapone_trans.general.name_attention+'</span></center></div><br>';
tsalmenu+='<hr>&emsp;<font style="font-family: \'Comic Sans MS\', cursive, sans-serif;" size="2" color="darkgreen"><b><u>'+game_data.player.name+' ~ '+tsalkapone_trans.general.temp+':</u></b></font>';
tsalmenu+='&emsp;<input type="button" class="btn tsalbutton" id="temp0" value="'+temp0+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="temp1" value="'+temp1+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="temp2" value="'+temp2+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="temp3" value="'+temp3+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="temp4" value="'+temp4+'"><hr><br>';
tsalmenu+="<table id='tsalkapone_config1' class='vis' width='100%'><tbody><tr>";
tsalmenu+='<tr ><th colspan="4"><center><font color="maroon">'+tsalkapone_trans.general.tab1+'</font></center></th></tr>';
tsalmenu+="<th><center>"+tsalkapone_trans.general.act+"</center></th>";
tsalmenu+="<th><center>"+tsalkapone_trans.general.counter+"</center></th>";
tsalmenu+="<th><center>"+tsalkapone_trans.general.lab+"</center></th>";
tsalmenu+="<th><center>"+tsalkapone_trans.general.desc+"</center></th>";
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" id="counter" checked></td><td>'+tsalkapone_trans.general.digits1+':&emsp;<input type="number" onchange="tsalkapone_sample ();" id="counter1" min="0" value="1"><br>'+tsalkapone_trans.general.digits2+':&emsp;<input type="number" min="1" onchange="tsalkapone_sample ();" id="digits" value="3"><br>'+tsalkapone_trans.general.roman+':&emsp;<input type="checkbox" onchange="tsalkapone_sample ();" id="roman"></td><td>'+tsalkapone_trans.general.digits+'</td><td>'+tsalkapone_trans.general.digits_info+'</td></tr>';
tsalmenu+='</tbody></table><br>';
tsalmenu+="<table id='tsalkapone_config' class='vis' width='100%'><tbody><tr>";
tsalmenu+='<tr ><th colspan="5"><center><font color="maroon">'+tsalkapone_trans.general.tab2+'</font></center></th></tr>';
tsalmenu+="<th><center>"+tsalkapone_trans.general.act+"</center></th>";
tsalmenu+="<th><center>"+tsalkapone_trans.general.extra+"</center></th>";
tsalmenu+="<th><center>"+tsalkapone_trans.general.lab+"</center></th>";
tsalmenu+="<th><center>"+tsalkapone_trans.general.desc+"</center></th>";
tsalmenu+="<th><center>"+tsalkapone_trans.general.ord+"</center></th></tr>";
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="continent" checked></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" K"></td><td>'+tsalkapone_trans.general.con+'</td><td>'+tsalkapone_trans.general.con_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone">54</td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="keimeno1" ></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" - "></td><td>'+tsalkapone_trans.general.keimeno+'</td><td>'+tsalkapone_trans.general.keimeno_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone"></td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="distance" ></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();"  class="tsal_extra" value="500|500"></td><td>'+tsalkapone_trans.general.dis+'</td><td>'+tsalkapone_trans.general.dis_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone">12.47</td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="sector" ></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" "></td><td>'+tsalkapone_trans.general.sector+'</td><td>'+tsalkapone_trans.general.sector_info+'&emsp;<span class="tsaltooltip"><img style="cursor: help; height:15px; width:15px; margin-top:5px;" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.sector_info1+'</span></span></td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone">55:12:2</td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="direction" ></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" "></td><td>'+tsalkapone_trans.general.dir+'</td><td>'+tsalkapone_trans.general.dir_info+'&emsp;<span class="tsaltooltip"><img style="cursor: help; height:15px; width:15px; margin-top:5px;" src="graphic/questionmark.png" ><span class="tsalinfo">'+dir_info+'</span></span></td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone">'+tsalkapone_trans.general.dir3+'</td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="beer" ></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" - "></td><td>'+tsalkapone_trans.general.beer+'</td><td>'+tsalkapone_trans.general.beer_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone" id="tsalbeer"></td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="whiskey" ></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" - "></td><td>'+tsalkapone_trans.general.wh+'</td><td>'+tsalkapone_trans.general.wh_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone" id="tsalwhiskey"></td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="band" ></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" - "></td><td>'+tsalkapone_trans.general.band+'</td><td>'+tsalkapone_trans.general.band_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone" id="tsalband"></td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="random" ></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" - "></td><td>'+tsalkapone_trans.general.sof+'</td><td>'+tsalkapone_trans.general.sof_info+'&emsp;<span class="tsaltooltip"><img style="cursor: help; height:15px; width:15px; margin-top:5px;" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.sof_info1+'</span></span></td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone" id="tsalsophie"></td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="pool" ></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" - "></td><td>'+own_pool+'</td><td>'+tsalkapone_trans.general.pool_info+'&emsp;<span class="tsaltooltip"><img style="cursor: help; height:15px; width:15px; margin-top:5px;" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.pool_info1+'</span></span></td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone" id="tsalpool"></td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="new_year" ></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" - "></td><td>'+tsalkapone_trans.general.new_year+'</td><td><span class="tsaltooltip"><img style="cursor: help; height:15px; width:15px; margin-top:5px;" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.year_info1+'</span></span>&emsp;'+tsalkapone_trans.general.new_year_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone" id="tsalyear"></td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="player" ></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" - "></td><td>'+tsalkapone_trans.general.pl+'</td><td>'+tsalkapone_trans.general.pl_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone">'+tsalplayer+'</td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="keimeno2" ></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" - "></td><td>'+tsalkapone_trans.general.keimeno+'</td><td>'+tsalkapone_trans.general.keimeno_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone"></td></tr>';
tsalmenu+='</tbody></table><hr><center><input type="button" class="btn tsalbutton" id="Tsalsave" value="'+tsalkapone_trans.buttons.save_def+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalsave1" value="'+tsalkapone_trans.buttons.save1+' '+temp1+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalsave2" value="'+tsalkapone_trans.buttons.save1+' '+temp2+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalsave3" value="'+tsalkapone_trans.buttons.save1+' '+temp3+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalsave4" value="'+tsalkapone_trans.buttons.save1+' '+temp4+'"><hr>';
tsalmenu+="<table id='tsalkapone_config2' class='vis' width='100%'><tbody><tr>";
tsalmenu+='<tr ><th colspan="2"><center><font color="maroon">'+tsalkapone_trans.general.tab3+'</font></center></th></tr>';
tsalmenu+="<th><center>"+tsalkapone_trans.general.mode+"</center></th>";
tsalmenu+="<th><center>"+tsalkapone_trans.general.descr+"</center></th></tr>";
tsalmenu+='<tr><td><center><input type="radio" name="tsal_mod" id="tsal_mod" value="mod1" checked></center></td><td>'+tsalkapone_trans.general.mod1+'</td></tr>';
tsalmenu+='<tr><td><center><input type="radio" name="tsal_mod" id="tsal_mod" value="mod2"></center></td><td>'+tsalkapone_trans.general.mod2+'</td></tr>';
tsalmenu+='<tr><td><center><input type="radio" name="tsal_mod" id="tsal_mod" value="mod3"></center></td><td>'+tsalkapone_trans.general.mod3+'</td></tr>';
tsalmenu+='</tbody></table><br>';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalreset" value="'+tsalkapone_trans.buttons.res_set+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalapply" value="&#9998; '+tsalkapone_trans.buttons.script_3+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalhide" value="'+tsalkapone_trans.buttons.hide+'"></center><hr>';
tsalmenu+='<center><span class="tsalkembed1"><img width="20px;" src="https://dl.dropboxusercontent.com/s/s9swak86tirwdpd/Tsalkapone.%20Warning.gif">&emsp;'+tsalkapone_trans.general.name_attention+'</span></center><br></div>';
document.getElementById('tsalresult').innerHTML = tsalmenu;

function Tsaldistance(village1,village2)
{return Math.sqrt((village1[0]-village2[0])*(village1[0]-village2[0])+(village1[1]-village2[1])*(village1[1]-village2[1]));};

function Tsalmode()
{var result; var mode=document.getElementsByName('tsal_mod');
{if(mode[0].checked) {result=mode[0].value;} else if(mode[1].checked) {result=mode[1].value;}else if(mode[2].checked) {result=mode[2].value;}}
return result;}


function TsalRoman(x) {
    var num = Math.floor(x), 
        val, s= '', i= 0, 
        v = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1], 
        r = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']; 

    function toBigRoman(n) {
        var ret = '', n1 = '', rem = n;
        while (rem > 1000) {
            var prefix = '', suffix = '', n = rem, s = '' + rem, magnitude = 1;
            while (n > 1000) {
                n /= 1000;
                magnitude *= 1000;
                prefix += '(';
                suffix += ')';
            }
            n1 = Math.floor(n);
            rem = s - (n1 * magnitude);
            ret += prefix + n1.toRoman() + suffix;
        }
        return ret + rem.toRoman();
    }

    if (x - num || num < 1) num = 0;
    if (num > 3999) return toBigRoman(num);

    while (num) {
        val = v[i];
        while (num >= val) {
            num -= val;
            s += r[i];
        }
        ++i;
    }
    return s;
}

function Tsalrename (config,mode)
{var tsalcount=0;
var namecount=0;
 try{$('.quickedit-vn').each(function(key,village){var villageId=$(village).attr('data-id');
var $label=$(village).find('.quickedit-label');
var originalFullName=$label.text();
var originalName=$label.attr('data-text');
var continent=originalFullName.match(/[0-9]{1,2}/gi).pop();
var coordinates=originalFullName.match(/[0-9]{1,}\|[0-9]{1,}/gi).pop();
var coordX=coordinates.match(/[0-9]{1,}/);
var coordY=String(coordinates.match(/\|[0-9]{1,}/)).substring(1);
var name='';
var tsal_number=document.getElementById('counter');
var tsal_number1=document.getElementById('roman');
var counter = document.getElementById('counter1').value;
var digits= document.getElementById('digits').value;

if(tsal_number.checked && !tsal_number1.checked)
{var number=key+Number(counter);
for(;String(number).length<digits;digits--)
name+='0';name+=number;}

if(tsal_number.checked && tsal_number1.checked)
{var number=key+Number(counter);
name+=TsalRoman(number);}

for(var j=0;j<config.length;j++)
{if(config[j].checked)
{
	var tsalkapone = config[j+1].value;
if(config[j].id=='distance')
{var targetCoords=config[j+1].value.split('|');
var targetX=targetCoords[0].match(/[0-9]{1,}/);
var targetY=targetCoords[1].match(/[0-9]{1,}/);
var distance=Tsaldistance([targetX,targetY],[coordX,coordY]);
name+=Math.round(distance*10)/10;
}
else
{if(config[j].id=='keimeno1' || config[j].id=='keimeno2')
{name+=tsalkapone;}
if(config[j].id=='player')
{name+=tsalkapone+tsalplayer;}
if(config[j].id=='continent')
{name+=tsalkapone+continent;}
if(config[j].id=='beer')
{
var namePool=['Heineken','Asahi','Corona','Krombacher','Baltika','Antartica','Miller','Coors Light','Brahma','Harbin','Paulaner','Amster','Mythos','Fix','Yanjing','Carslberg','Skol',
'Budweiser','Bud','Tsingtao','Snow','Aphrodisiaque','Blue','Busch','Keiths','Carling','Molson','Guinness','Victoria','Sagres'];
	for(var k=0;k<1;k++)
{randomInt=Math.round(Math.random()*(namePool.length-1));
name+=tsalkapone+namePool[randomInt];}}
if(config[j].id=='whiskey')
{
var namePool=['Black Nikka','Black Velvet','Crown Royal','Ballantine’s','Jim Beam','Suntory','Jameson','Canadian Club','Johnnie Walker','Jack Daniel','Cutty Sark','Drambuie','Macallan','Glenfiddich','Dalmore','Glenfarclas','Chivas'];
	for(var k=0;k<1;k++)
{randomInt=Math.round(Math.random()*(namePool.length-1));
name+=tsalkapone+namePool[randomInt];}}
if(config[j].id=='band')
{
var namePool=['Pink Floyd','Muse','Beatles','Oasis','Metallica','Led Zeppelin','Radiohead','Nirvana','Rolling Stones','Green Day','Pearl Jam','Coldplay','Iron Maiden','Stereophonics',
'RHCP','Queen','Maroon5','Ramones','AC/DC','R.E.M.','Arctic Monkeys','Deep Purple','Eagles','The Killers','Pixies','Placebo','U2','The Who','The Clash','Kodaline','Iggy Pop','Editors'];
	for(var k=0;k<1;k++)
{randomInt=Math.round(Math.random()*(namePool.length-1));
name+=tsalkapone+namePool[randomInt];}}
if(config[j].id=='new_year')
{var namePool=['happy new year','gott nytt år','gelukkig nieuwjaar','feliz ano novo','un an nou fericit','godt nyttår',
'kali xronia','šťastný nový rok','boldog új évet','godt nytår','sretna nova godina','šťastný nový rok','feliz año nuevo','	felice anno nuovo',
'yeni yılınız kutlu olsun','onnellista uutta vuotta','عام سعيد','Frohes neues Jahr','szczęśliwego nowego roku','srečno novo leto','selamat tahun baru',
'sretna nova godina','laimingų Naujųjų Metų','честита нова година','С Новым Годом','Срећна Нова година'];
for(var k=0;k<1;k++)
{randomInt=Math.round(Math.random()*(namePool.length-1));
name+=tsalkapone+namePool[randomInt];}}
if(config[j].id=='random')
{
var namePool=['My FaVoRiTe GaMe','BLaCk WiDoW','BuTTeRFLieS AnD HuRRiCaNeS','CaStLe In ThE AiR','CauGhT OuT In ThE RaiN','ThE OnE I LoVE',
'CouNtiNg StaRs','DaRk PaRaDi$e','DeVa SanSkRiT','DrEaM-CaTcHeR','NeVeR SaY NeVeR','PiE In ThE SkY','Poi$oN and WiNe','SkY FuLL Of STaRs','SHiNe BRiGhT LiKe A DiaMonD',
'STaRDuSt LaDy,TiMe Is RuNNiNg OuT','ThE PoiSoNeD RoSe','RaiNBoW In ThE DaRk','ReQuieM FoR a DrEaM','RuNNiNG Up THaT HiLL','WiSh UpOn A STaR','YouNg AnD BeaUtiFuL','LiTtLe PrINce',
'LeS MiSErAbLeS','ToiS PluS MoiS','FaiRyTaLe','FaTaL AttRaCtiOn','GhOsT Of A RoSe','HaSta La VisTa...BaBy','In ThE TWiLiGhT','JuSt LiKe PoiSoN','MaGiC TRiCkS','MoOnLiGhT ShaDoW'];
for(var k=0;k<1;k++)
{randomInt=Math.round(Math.random()*(namePool.length-1));
name+=tsalkapone+namePool[randomInt];}}
if(config[j].id=='pool')
{ if(localStorage.getItem('tsalkapone_user_pool_names')){
	var tsal_pool =localStorage.getItem('tsalkapone_user_pool_names');
var namePool=tsal_pool.split(',');
var tsalcount_in=namePool.length-1;
if (localStorage.getItem('tsalkapone_user_pool_method')){
var method =localStorage.getItem('tsalkapone_user_pool_method');
if (method=="2")
{if (key<=tsalcount_in)
{name+=tsalkapone+namePool[key];}
else if (namecount<=tsalcount_in)
{ name+=tsalkapone+namePool[namecount]; namecount+=1;}
else {namecount=0; name+=tsalkapone+namePool[namecount];}}
else if (method=="1")
	{for(var k=0;k<1;k++)
{randomInt=Math.round(Math.random()*(namePool.length-1));
name+=tsalkapone+namePool[randomInt];}}}
else {
	for(var k=0;k<1;k++)
{randomInt=Math.round(Math.random()*(namePool.length-1));
name+=tsalkapone+namePool[randomInt];}
}
}
else {name+='';}}
if(config[j].id=='sector')
{var tempX=Number(coordX);var tempY=Number(coordY);if(Number(tempX)>=100)
tempX=Number(String(coordX).substring(1));
if(Number(tempY)>=100)
tempY=Number(String(coordY).substring(1));
var xPos=Math.floor(tempX/5);
var yPos=Math.floor(tempY/5);
var sector=yPos*20+ xPos;
if(Number(tempX)>=10)
tempX=Number(String(tempX).substring(1));
if(Number(tempY)>=10)
tempY=Number(String(tempY).substring(1));
if(Number(tempX)>=5)
tempX=tempX- 5;
if(Number(tempY)>=5)
tempY=tempY- 5;
var field=tempY*5+ tempX;
name+=tsalkapone+continent+':'+ sector+':'+ field;}
if(config[j].id=='direction')
{var directionNames=[[''+tsalkapone_trans.general.dir1+'',''+tsalkapone_trans.general.dir2+'',''+tsalkapone_trans.general.dir3+''],
[''+tsalkapone_trans.general.dir4+'',''+tsalkapone_trans.general.dir5+'',''+tsalkapone_trans.general.dir6+''],
[''+tsalkapone_trans.general.dir7+'',''+tsalkapone_trans.general.dir8+'',''+tsalkapone_trans.general.dir9+'']];
function getLocation(number)
{if(number>66){return 2;}else if(number>33){return 1;}else{return 0;}}
var xLocation=getLocation(coordX%100);var yLocation=getLocation(coordY%100);
name+=tsalkapone+directionNames[yLocation][xLocation];}}}
if(mode=='mod1')
name=name;
else if(mode=='mod2')
name=originalName+ name;
else if(mode=='mod3')
name=name+ originalName;

}
var finalname=name;
if(finalname.length<=32){$(village).find('.rename-icon').click();
$(village).find('input[type=text]').val(finalname);
var nameSaveButton=$(village).find('input[type=button]');
nameSaveButtons.unshift(nameSaveButton);
}
else{
	tsalcount+=1;
	/* localStorage.setItem('tsal_stathera',tsalcount); */
	}
});saveVillageNames(tsalcount,0);}catch(e){alert(e)}}


var nameSaveButtons=new Array();
 
var saveDelay;
if (localStorage.getItem('tsal_renaming_speed'))
{var tsal_sp =localStorage.getItem('tsal_renaming_speed');
if(tsal_sp=="1") {saveDelay=200;}
else if(tsal_sp=="2") {saveDelay=300;}	
else if(tsal_sp=="3") {saveDelay=450;}	
else if(tsal_sp=="4") {saveDelay=600;}		
}
else {saveDelay=450;}

function saveVillageNames(x,y)
{ var savedCounter=y;
	var rows = document.getElementById('combined_table').rows;
	var row_fix=rows.length-1;
	var dur=((row_fix*saveDelay)/1000).toFixed(1);
/*	var tsal_st = localStorage.getItem('tsal_stathera'); */
var tsal_st=x;
	var xwria = row_fix - Number(tsal_st);
	
	if(nameSaveButtons.length>0)
{ window.setTimeout(function()
{var buttons=nameSaveButtons.pop();buttons.click();savedCounter++;
if(nameSaveButtons.length>0){
var tsalcount=savedCounter+1;
var tsalratio=Math.floor((tsalcount/xwria)*100);
UI.InfoMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br>'+tsalkapone_trans.general.pro1+': '+tsalratio+'%',3000,'success');
saveVillageNames(x,savedCounter);}
else{UI.InfoMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font><br><br>'+tsalkapone_trans.notes.vils2+': <b><font color=gold>'+row_fix+'</font></b><br><br>'+tsalkapone_trans.notes.vils+': <b><font color=gold>'+xwria+'</font></b><br><br>'+tsalkapone_trans.notes.vils1+': <b><font color=gold>'+dur+'</font> '+tsalkapone_trans.notes.secs+'</b>',8000,'success');}},saveDelay); }
else{UI.InfoMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br>'+tsalkapone_trans.notes.no_vils+'',8000,'error');}}



function saveConfig (x,y,w,z) {
		var rows = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_label');
		var options = new Array();
		for (var i=0; i<rows.length; i++) {
			options[i] = rows[i].checked;			
		}
		var rows1 = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_extra');
		var options1 = new Array();
		for (var i=0; i<rows1.length; i++) {
			options1[i] = rows1[i].value;			
		}
		var tsal_number = document.getElementById('counter').checked;
		var tsal_roman = document.getElementById('roman').checked;
		var tsal_nub = document.getElementById('counter1').value;
		var tsal_dig =document.getElementById('digits').value;
		var options2 = new Array();
		options2[0]=tsal_number; options2[1]=tsal_nub; options2[2]=tsal_dig; options2[3]=tsal_roman;
	var	tsalkapone_name_settings = options;
	var	tsalkapone_name_settings1 = options1;
	var	tsalkapone_name_settings2 = options2;
		
		localStorage.setItem(''+x+'',JSON.stringify(tsalkapone_name_settings));
		localStorage.setItem(''+y+'',JSON.stringify(tsalkapone_name_settings1));
		localStorage.setItem(''+w+'',JSON.stringify(tsalkapone_name_settings2));
			if (x!='tsalkapone_name_settings_ekkinisi')
			{UI.SuccessMessage('<span id=tsalkaponesuccesssave><b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></span><br><br>'+tsalkapone_trans.notes.save+'', 3000); }
var tsal_etiketa1 =localStorage.getItem(''+x+'');
var tsal_etiketa2 =localStorage.getItem(''+y+'');
var tsal_etiketa3 =localStorage.getItem(''+w+'');
var tsalk_etiketa = tsal_etiketa1+'\n'+tsal_etiketa2+'\n'+tsal_etiketa3;
		
		console.log('\n\nTsalkapone ~ '+z+' Settings:\n'+tsalk_etiketa); 
	}
function loadConfig1 (x,y,w) {
		if (localStorage.getItem(''+x+'') && localStorage.getItem(''+y+'') && localStorage.getItem(''+w+'')) {
			var tsal_check = JSON.parse(localStorage.getItem(''+x+''));
			var tsal_check1 = JSON.parse(localStorage.getItem(''+y+''));
			var tsal_check2 = JSON.parse(localStorage.getItem(''+w+''));
			var rows = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_label');
			var rows1 = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_extra');
		var tsal_number = document.getElementById('counter');
			var tsal_roman = document.getElementById('roman');
		var tsal_nub = document.getElementById('counter1');
		var tsal_dig =document.getElementById('digits');
		tsal_number.checked=tsal_check2[0]; tsal_nub.value=tsal_check2[1]; tsal_dig.value=tsal_check2[2]; tsal_roman.checked=tsal_check2[3];
		for (var i=0; i<rows.length; i++) {
			rows[i].checked = tsal_check[i];			
		}
		for (var i=0; i<rows1.length; i++) {
			rows1[i].value = tsal_check1[i];			
		}
			
}} 
	
function loadConfig (x,y,w) {
		if (localStorage.getItem(''+x+'') && localStorage.getItem(''+y+'') && localStorage.getItem(''+w+'')) {
			var tsal_check = JSON.parse(localStorage.getItem(''+x+''));
			var tsal_check1 = JSON.parse(localStorage.getItem(''+y+''));
			var tsal_check2 = JSON.parse(localStorage.getItem(''+w+''));
			var rows = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_label');
			var rows1 = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_extra');
			var tsal_number = document.getElementById('counter');
			var tsal_roman = document.getElementById('roman');
		var tsal_nub = document.getElementById('counter1');
		var tsal_dig =document.getElementById('digits');
		tsal_number.checked=tsal_check2[0]; tsal_nub.value=tsal_check2[1]; tsal_dig.value=tsal_check2[2]; tsal_roman.checked=tsal_check2[3];
		for (var i=0; i<rows.length; i++) {
			rows[i].checked = tsal_check[i];			
		}
		for (var i=0; i<rows1.length; i++) {
			rows1[i].value = tsal_check1[i];			
		}}
else{UI.ErrorMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br>'+tsalkapone_trans.notes.no_saved1+'', 4000);}
	} 
 
	loadConfig1 ('tsalkapone_name_settings','tsalkapone_name_settings1','tsalkapone_name_settings2');
	if (localStorage.getItem('tsal_xwria_names_ekkinisi')===null){
	saveConfig ('tsalkapone_name_settings_ekkinisi','tsalkapone_name_settings1_ekkinisi','tsalkapone_name_settings2_ekkinisi','Tsalkapone');
	localStorage.setItem('tsal_xwria_names_ekkinisi',1);
	}
	
	
$("#temp0").click(function(){ loadConfig ('tsalkapone_name_settings','tsalkapone_name_settings1','tsalkapone_name_settings2');	tsalkapone_sample (); });
$("#temp1").click(function(){ loadConfig ('tsalkapone1_name_settings','tsalkapone1_name_settings1','tsalkapone1_name_settings2');	tsalkapone_sample (); });
$("#temp2").click(function(){ loadConfig ('tsalkapone2_name_settings','tsalkapone2_name_settings1','tsalkapone2_name_settings2');	tsalkapone_sample (); });
$("#temp3").click(function(){ loadConfig ('tsalkapone3_name_settings','tsalkapone3_name_settings1','tsalkapone3_name_settings2');	tsalkapone_sample (); });
$("#temp4").click(function(){ loadConfig ('tsalkapone4_name_settings','tsalkapone4_name_settings1','tsalkapone4_name_settings2');	tsalkapone_sample (); });
$("#Tsalapply").click(function(){ 
var sophie = document.getElementById('random');
var tsal1 = document.getElementById('beer');
var tsal2 = document.getElementById('whiskey');
var tsal3 = document.getElementById('band');
var tsal4 = document.getElementById('pool');
var tsal5 = document.getElementById('new_year');
var inputs = document.getElementById('tsalkapone_config').getElementsByTagName('input');
		var rows = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_label');
	var tsal_mod = Tsalmode();
	var tsalattention = document.getElementById('tsalattention');
	if (tsalattention.style.display=='' ||tsal_mod=="mod2" || tsal_mod=="mod3" || sophie.checked || tsal1.checked || tsal2.checked || tsal3.checked || tsal4.checked || tsal5.checked)
	{
						var contact_url = "https://forum.tribalwars.net/index.php?members/tsalkapone.114063/";
	   var content = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="darkgreen">Tsalkapone. '+tsalkapone_trans.general.script+'</font></u></center></h2>' +
'<hr><p><font color=maroon><b>'+tsalkapone_trans.general.message_3+'</b></font></p>' +
'<p><font color=blue><b>'+tsalkapone_trans.general.message_5+'</b></font></p>' +
'<p><b><font color=red>'+tsalkapone_trans.general.message_6+'</font></b></p>' +
'<hr><p><center><u><font color="darkmagenta" size="4"><b>'+tsalkapone_trans.general.message_4+'</b></font></u></center></p>' +
'<br><br><center><input type="button" class="btn evt-confirm-btn btn-confirm-yes" id="go_man" value="'+tsalkapone_trans.general.message_yes+'">&emsp;<input type="button" class="btn evt-cancel-btn btn-confirm-no" id="close_this" value="'+tsalkapone_trans.general.message_no+'"></center>'+ 
'<br><br><hr><center><img class="tooltip-delayed" title="<font color=darkgreen>Tsalkapone. '+tsalkapone_trans.general.script+'</font>" src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg" style="cursor:help; position: relative"></center><br><center><p>'+tsalkapone_trans.general.comm+' <a href="'+contact_url+'" title="Tsalkapone profile" target="_blank">Tsalkapone</a>.</p></center>' +
'</div>';            
Dialog.show('village_renamer_attention', content);
$("#go_man").click(function () { var close_this = document.getElementsByClassName('popup_box_close'); close_this[0].click(); Tsalrename(inputs,tsal_mod);});   
$("#close_this").click(function () { var close_this = document.getElementsByClassName('popup_box_close'); close_this[0].click(); });

	}
else
{Tsalrename(inputs,tsal_mod);}
});
	


	$("#Tsalreset").click(function(){ 
localStorage.removeItem("tsalkapone_name_settings"); 
localStorage.removeItem("tsalkapone_name_settings1"); 
localStorage.removeItem("tsalkapone1_name_settings"); 
localStorage.removeItem("tsalkapone1_name_settings1");
localStorage.removeItem("tsalkapone2_name_settings"); 
localStorage.removeItem("tsalkapone2_name_settings1");
localStorage.removeItem("tsalkapone3_name_settings"); 
localStorage.removeItem("tsalkapone3_name_settings1");
localStorage.removeItem("tsalkapone4_name_settings"); 
localStorage.removeItem("tsalkapone4_name_settings1");
localStorage.removeItem("tsalkapone1_name_settings2"); 
localStorage.removeItem("tsalkapone2_name_settings2"); 
localStorage.removeItem("tsalkapone3_name_settings2"); 
localStorage.removeItem("tsalkapone4_name_settings2"); 
localStorage.removeItem("tsalkapone_name_settings2"); 
localStorage.removeItem('tsal_xwria_names_ekkinisi');
UI.SuccessMessage('<span id=tsalkaponesuccesssave><b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></span><br><br>'+tsalkapone_trans.notes.res_set2+'', 3000);  
$("#tsalscript1").click();
	});
	
	$("#Tsalhide").click(function(){ document.getElementById('tsalresult').innerHTML=''; });
	$("#Tsalsave").click(function(){ saveConfig ('tsalkapone_name_settings','tsalkapone_name_settings1','tsalkapone_name_settings2','Default Renamer');});
	$("#Tsalsave1").click(function(){ saveConfig ('tsalkapone1_name_settings','tsalkapone1_name_settings1','tsalkapone1_name_settings2','Temp1');});
	$("#Tsalsave2").click(function(){ saveConfig ('tsalkapone2_name_settings','tsalkapone2_name_settings1','tsalkapone2_name_settings2','Temp2');});
	$("#Tsalsave3").click(function(){ saveConfig ('tsalkapone3_name_settings','tsalkapone3_name_settings1','tsalkapone3_name_settings2','Temp3');});
	$("#Tsalsave4").click(function(){ saveConfig ('tsalkapone4_name_settings','tsalkapone4_name_settings1','tsalkapone4_name_settings2','Temp4');});
	
$('#tsalkapone_config > tbody').sortable({handle: '.qbhandle', placeholder: 'sortable-placeholder'});
		$('#tsalkapone_config > tbody').on('sortstop', function(){
			tsalkapone_sample();
		});	
		
	tsalkapone_sample ();
}); }

	
	}
