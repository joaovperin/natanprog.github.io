/*
		scriptname:	Central Incoming Intelligence
		version:	1.0.0
		created: June 25, 2016
 		game version:	version	8.48.1
 		author:		Tsalkapone (tsalkapone@hotmail.com)
 
 ==== pages where this can be used ==== 
 * incoming overview (screen=overview_villages&mode=incomings)
  
 ==== changelog ====
 *	25 June 2016 - created
 
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
 
 var get_lang = localStorage.getItem("central_incoming_intelligence_lang");
    var lang="";
	var tsal_market=game_data.market;
	
    if (get_lang === null) {lang = "english";}
    else { lang = ""+get_lang+"";}
    var supported_languages =["greek","english"];
    var lang_check = supported_languages.indexOf(lang);
    if (lang_check < 0) {UI.ErrorMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> The selected language is not supported. Please select one of the supported languages.', 5000);}
    else {
		var tsalk_trans = (function() {
				    var tsalk_trans = {};
					tsalk_trans.en={
						tw:{   
attack:"Attack",	
	},
					};
					tsalk_trans.gr={
						tw:{
attack:"Επίθεση",	
},
					};
					
		 return tsalk_trans[tsal_market];			
		}());
 var tsalkapone_trans = (function() {
				    var tsalkapone_trans = {};
    tsalkapone_trans.english= { 
	 general:{ 
	 script:"Central Incoming Intelligence",
	 notification:"Notification from",
         selected_one:"Current selected language",
         available:"Available languages",
		 button_list:"Buttons List",
		 lang_sel:"Click to change the selected language",		
		message_no:"No",
		message_yes:"Yes",
		message_1:"This script is activated on Overviews -> Incoming.",
		message_2:" Do you want to automatically assign your location to this page?",
		comm:"Feel free to send any message regarding script bugs or proposing ideas to",
				des:"Function description",
		but:"Buttons",
		edited_by:"Edited by",
		created:"Created by",
		set_list:"Settings & Functions",
		res_list:"Script Settings",
		blank:"Click on any script's button to display its settings and values",
		script_1:"Define the incomings' label format",
		script_2:"Add styles and sort out the incomings",
		script_3:"Apply the saved style & sorting settings",
		script_4:"Define the general settings of the script",
		script_5:"Apply the saved label format",
		act:"Activate",
		extra:"Additional Text",
		desc:"Description",
		lab:"Label",
		ord:"Order",
		drag:"Drag to re-order",
		unit:"unit",
		coords:"coords",
		player:"name",
		dur:"duration",
		dis:"distance",
		ret:"return",
		sent:"sent",
		arr:"arrival",
		ori:"origin",
		desti:"destination",
		time:"server time",
		keimeno:"text",
		wave:"wave",
		wave_in:"Wave_",
		wave_info:"Insert the text <b>Wave_</b> plus a counting to distinguish the waves of incoming commands (not customizable text)",
		unit_info:"Estimated slowest unit speed assuming the command has just been launched",
		coords_info:"The coordinates of the incoming's origin village",
		player_info:"The name of the incoming's origin village's owner",
		dur_info:"The overall duration of each command based on the estimated slowest unit speed",
		dis_info:"The distance (in fields) between the command's origin village and the destination village",
		ret_info:"The estimated date and time the troops return based on the estimated slowest unit speed",
		sent_info:"The estimated date and time the troops were sent based on the estimated slowest unit speed",
		arr_info:"The arrival date and time of each command",
		ori_info:"Each command's origin village, with the following format:<br> <b>name (xxx|yyy) KYX</b>",
		desti_info:"Each command's destination village, with the following format:<br> <b>name (xxx|yyy) KYX</b>",
		time_info:"Insert the current server time in the label's format",
		keimeno_info:"Insert a text in the label's format",
		tsal_img:"Unit icon",
		tsal_color:"Command's label color",
		ram:"Ram",
		axe:"Axe",
		noble:"Noble",
		sword:"Sword",
		light:"LCav",
		spy:"Spy",
		inc_count:"Incoming commands per village",
		inc_co:"Incoming commands",
		inc_vil:"Village",
		temp:"Templates",
		temp1:"Ghost Raiders",
		temp2:"Armageddon",
		temp3:"R for Revenge",
		temp4:"Foes Bureau of Investigation",
		temp5:"Laconic Way",
		temp_0:"Default Template",
		temp_1:"Template No1",
		temp_2:"Template No2",
		temp_3:"Template No3",
		temp_4:"Template No4",
		unknown:"Unknown",
		gen:"Define Settings for the <b><font color='maroon'>Apply Settings</font></b> button",
		gen1:"Calculate incoming commands per village",
		gen2:"Apply color settings to the incoming commands",
		gen3:"Apply label on script's activation",
		gen4:"Show notification of the unlabelled incoming commands",
		gen5:"Activate automatic label",
		templates:"Templates' Settings",
		title:"Template's title",
		key:"Shortcut key",
		save_mes:"Choose a template to save the selected settings' values",
		save_attention:"ATTENTION: The script will only use the Default Template to apply changes in label's format. The other templates are used to save you some time in case you need to change your settings.",
		stat_save:"Saved Data",
		stat_no:"NO DATA",
		stat:"LocalStorage Status",
		tsal_info1:"<b><u><font color='darkgreen'>Available Settings:</font></u></b><br>1. Define the functions you want to operate each time you click on <b><font color='red'>Apply Settings</b></font>.<br>2. Define if you want to label the incomings on script's activation.<br>3. Define the title of <b><font color='red'>Your Templates</font></b>. You can save each template's settings on <b><font color='red'>Label Settings</font></b>.",
	tsal_info2:"Define the variables included in the <b><font color='maroon'>Label's format</b></font>. You can see their description for further details. You can use one of the default templates or you can create your own ones. <b>NEVER</b> forget to <b><font color='blue'>Save Settings</b></font>.<br> Every customizable variable is displayed on the following table. You can preview the label's format in every change you make. The texts of each variable are added before the variable in the format.",
	tsal_info3:"ATTENTION: Only the saved settings on Default Label template will be applied in the label's format.",
	tsal_info4:"1. Use this colors' settings to distinguish the incoming commands by their labelled units.<br>2. You can also create a table displaying the incoming commands per villages. Also, the amount of the incomings will be displayed on the incoming's table using colors (<b><font color='green'>green</font></b> for less than 4 commands, <b><font color='blue'>blue</font></b> for 4<= commands <10, <b><font color='darkorange'>darkorange</font></b> for 10<= commands < 20 and <b><font color='red'>red</font></b> for 20 or more commands).<br>3. You may also sort out the unlabelled incoming commands.",
	tsal_info5:"ATTENTION: The order of the format's options is not saved. For this reason, firstly load or save a template and then re-order the options.",
	},
	buttons:{
		lang_open:"Open language selection",
              lang_close:"Close language selection",
			  		  script_1:"Label Settings",
		script_2:"Stylization & Sorting",
		script_3:"Apply Settings",
		script_4:"General Settings",
		script_5:"Apply Label",
		save:"Save Settings",
		hide:"Hide Settings",
		res_set:"Reset Settings",
		res_count:"Reset Counting",
		tsal_count:"Incomings per village",
		tsal_apply:"Apply stylization",
		save1:"Save to",
		save_def:"Save as Default",
		tsal_sort:"Show unlabelled commands",
	},
	notes:{
		activated:"The script Central Incoming Intelligence is already active",
		save:"Your settings have been successfully saved.",
		no_saved:"No saved settings' values have been detected. Make sure you have saved the style and label settings before operating this function again.",
		no_saved1:"No saved settings have been detected for this template. Save settings into this template and try again.",
		res_set:"The settings have been successfully reseted. The page will be automatically refreshed in 3 seconds.",
		res_set2:"The settings have been successfully reseted.",
		res_count:"The counting settings have been succesfully reseted. The page will be automatically refreshed in 3 seconds.",
		res_set1:"The style settings have been successfully reseted. The page will be automatically refreshed in 3 seconds.",
		no_inc:"There were detected no incoming commands in the current page",
		no_colors:"No saved colors were detected. Make sure you have saved the style settings before operating this function again.",
		save1:"The color settings have been successfully saved.",
		alarm1:"Don't worry",
		alarm2:"No unlabelled commands were detected on the current page.",
		alarm4:"unlabelled incoming commands on the current page.",
		alarm3:"you have",
		found:"unlabelled commands were found in the current page.",
		not_found:"No unlabelled commands were detected in the current page.",
		no_saved_gen:"There were detected no saved settings for this button. Go to <b><font color='gold'>General Settings</font></b> and make sure you save the settings before operating this function again.",
	},
};
tsalkapone_trans.greek= { 
	 general:{ 
	 script:"Εργαλεία Πληροφοριών Εισερχομένων",
	 notification:"Ειδοποίηση από τον",
            selected_one:"Ενεργή γλώσσα",
            available:"Διαθέσιμες γλώσσες",
			button_list:"Πίνακας πλήκτρων",
			lang_sel:"Επιλέξτε για να αλλάξετε την επιλεγμένη γλώσσσα",
			message_no:"Όχι",
		message_yes:"Ναι",
		message_1:"Το συγκεκριμένο script ενεργοποιείται από τις Επισκοπήσεις -> Εισερχόμενα.",
		message_2:"Επιθυμείτε αυτόματη ανακατεύθυνση;",
		comm:"Επικοινωνήστε ανά πάσα στιγμή για οποιαδήποτε ιδέα ή πρόταση σχετικά με τα scripts με τον",
				des:"Περιγραφή λειτουργίας",
		but:"Πλήκτρα",
		edited_by:"Δημιουργήθηκε από τον",
		created:"Δημιουργήθηκε από τον",
		set_list:"Ρυθμίσεις & Λειτουργίες",
		res_list:"Ρυθμίσεις Script",
		blank:"Επιλέξτε ένα πλήκτρο οποιουδήποτε script για να εμφανιστούν οι ρυθμίσεις του",
		script_1:"Ρύθμιση της ονομασίας των εισερχόμενων εντολών",
		script_2:"Ρύθμιση πρόσθετων μορφοποιήσεων και διαχωρισμών",
		script_3:"Εφαρμογή των ρυθμίσεων μορφοποίησης",
		script_5:"Εφαρμογή των ρυθμίσεων ονομασίας ετικέτας",
		script_4:"Ρυθμίσεις γενικού περιεχομένου και εφαρμογής",
		act:"Ενεργοποίηση",
		extra:"Επιπρόσθετο κείμενο",
		desc:"Περιγραφή",
		lab:"Ετικέτα",
		ord:"Σειρά",
		drag:"Μετακινήστε τη γραμμή για να αλλάξετε σειρά εμφάνισης στην ετικέτα ονομασίας",
		unit:"μονάδα",
		coords:"συντεταγμένες",
		player:"παίκτης",
			dur:"διάρκεια",
		dis:"απόσταση",
		ret:"επιστροφή",
		sent:"αποστολή",
		arr:"άφιξη",
		ori:"προέλευση",
		desti:"προορισμός",
		time:"χρόνος server",
		keimeno:"κείμενο",
		wave:"κύμα",
		wave_in:"Κύμα_",
		wave_info:"Εισάγετε το κείμενο <b>Κύμα_</b> σε κάθε εντολή αναγνώρισης επιθέσεων (μη επεξεργάσιμο κείμενο)",
		unit_info:"Εκτιμώμενη βραδύτερη μονάδα κάθε εντολής υποθέτοντας πως η εντολή μόλις ξεκίνησε",
		coords_info:"Οι συντεταγμένες του χωριού προέλευσης κάθε εντολής",
		player_info:"Το όνομα του ιδιοκτήτη του χωριού προέλευσης κάθε εντολής",
		dur_info:"Η συνολική διάρκεια κάθε εντολής βασισμένη στην εκτιμώμενη βραδύτερη μονάδα",
		dis_info:"Η απόσταση (σε πεδία) μεταξύ των χωριών προέλευσης και προορισμού κάθε εντολής",
		ret_info:"Η εκτιμώμενη ημερομηνία και ώρα επιστροφής κάθε εντολής βασισμένη στην εκτιμώμενη βραδύτερη μονάδα",
		sent_info:"Η εκτιμώμενη ημερομηνία και ώρα αποστολής κάθε εντολής βασισμένη στην εκτιμώμενη βραδύτερη μονάδα",
		arr_info:"Η ημερομηνία και ώρα άφιξης κάθε εντολής",
		ori_info:"Το χωριό προέλευσης κάθε εντολής με την ακόλουθη μορφή:<br> <b>όνομα (xxx|yyy) KYX</b>",
		desti_info:"Το χωριό προορισμού κάθε εντολής με την ακόλουθη μορφή:<br> <b>όνομα (xxx|yyy) KYX</b>",
		time_info:"Εισάγετε το τρέχον χρόνο του server στην ονομασία ετικέτας",
		keimeno_info:"Εισάγετε ένα κείμενο στην ονομασία ετικέτας",
		tsal_img:"Εικονίδιο μονάδας",
		tsal_color:"Χρώμα ετικέτας εντολής",
		ram:"Κριός",
		axe:"Τσεκούρι",
		noble:"Αριστοκράτης",
		sword:"Ξίφος",
		light:"Ελαφρύ",
		spy:"Ανιχνευτής",
		inc_count:"Υπολογισμός εντολών ανά χωριό",
		inc_co:"Πλήθος εντολών",
		inc_vil:"Χωριό",
		temp:"Πρότυπα",
		temp1:"Άγνωστοι Εισβολείς",
		temp2:"Αρμαγεδών",
		temp3:"V for Vendetta",
		temp4:"Κέντρο Πληροφοριών Εχθρού",
		temp5:"Λακωνική Μέθοδος",
		temp_0:"Προκαθορισμένο Πρότυπο",
		temp_1:"Πρότυπο No1",
		temp_2:"Πρότυπο No2",
		temp_3:"Πρότυπο No3",
		temp_4:"Πρότυπο No4",
		unknown:"Άγνωστη",
		templates:"Ρυθμίσεις Πρότυπων",
		gen:"Προσδιορίστε τις λειτουργίες του πλήκτρου Εφαρμογής",
		gen1:"Υπολογισμός εισερχόμενων εντολών ανά χωριό",
		gen2:"Εφαρμογή χρωματισμού στις εισερχόμενες εντολές",
		gen3:"Εφαρμογή ετικέτας με την ενεργοποίηση του script",
		gen4:"Εμφάνιση ειδοποίησης μη αναγνωρισθέντων εισερχόμενων εντολών",
		gen5:"Ενεργοποίηση αυτόματης αναγνώρισης",
		title:"Τίτλος πρότυπου",
		key:"Πλήκτρο συντόμευσης",
		save_mes:"Επιλέξτε ένα πρότυπο για να αποθηκεύσετε τις τρέχουσες ρυθμίσεις",
		save_attention:"ΠΡΟΣΟΧΗ: Το script θα επιλέξει μόνο τις ρυθμίσεις του Προκαθορισμένου Πρότυπου για να εφαρμόσει την ονομασία της ετικέτας. Τα υπόλοιπα πρότυπα λειτουργούν ως μέθοδοι αποθήκευσης ρυθμίσεων για εξοικονόμηση χρόνου σε περίπτωση που επιθυμείτε να αλλάξετε ρυθμίσεις.",
		stat_save:"Αποθηκευμένο",
		stat_no:"Μη αποθηκευμένο",
		stat:"Κατάσταση αποθήκευσης",
		tsal_info1:"<b><u><font color='darkgreen'>Διαθέσιμες Ρυθμίσεις:</font></u></b><br>1. Ορίστε τις λειτουργίες που επιθυμείτε να εκτελούνται σε κάθε ενεργοποίηση του πλήκτρου <b><font color='red'>Εφαρμογή Ρυθμίσεων</b></font>.<br>2. Ορίστε αν επιθυμείτε να εκτελείται αναγνώριση εντολών με την ενεργοποίηση του script.<br>3. Ορίστε το τίτλο των δικών σας <b><font color='red'>Πρότυπων</font></b>. Μπορείτε να επεξεργαστείτε τις ρυθμίσεις τους στη κατηγορία <b><font color='red'>Ρυθμίσεις Ετικέτας</font></b>.",
		tsal_info2:"Ορίστε τις μεταβλητές που θα συμπεριληφθούν στην <b><font color='maroon'>Ετικέτα</b></font>. Μπορείτε να διαβάσετε τη περιγραφή τους για περισσότερες λεπτομέρειες. Εναλλακτικά μπορείτε να χρησιμοποιήσετε ένα από τα προκαθορισμένα πρότυπα ή να δημιουργήσετε τα δικά σας. <b>ΠΟΤΕ</b> μην ξεχνάτε να <b><font color='blue'>Αποθηκεύετε τις ρυθμίσεις</b></font>.<br> Κάθε μεταβλητή που μπορείτε να επεξεργαστείτε παρουσιάζεται στο παρακάτω πίνακα. Σε κάθε αλλαγή διαμορφώνεται αντίστοιχα η προεπισκόπηση. Τα επιλεγμένα κείμενα κάθε μεταβλητής προστίθενται μπροστά από τη μεταβλητή.",
	tsal_info3:"ΠΡΟΣΟΧΗ: Μόνο οι αποθηκευμένες ρυθμίσεις το Προκαθορισμένο Πρότυπο θα εφαρμοστούν στην ονομασία Ετικέτας.",
	tsal_info4:"1. Αξιοποιήστε τις ρυθμίσεις χρωμάτων για να διαχωρίσετε τις εισερχόμενες επιθέσεις ανά ταχύτητα μονάδας.<br>2. Δημιουργήστε ένα πίνακα που απεικονίζει τις εισερχόμενες επιθέσεις ανά χωριό και προσθέτει ανάλογο χρωματισμό (<b><font color='green'>πράσινο</font></b> για λιγότερες από 4 εντολές, <b><font color='blue'>μπλε</font></b> για 4<= εντολές <10, <b><font color='darkorange'>πορτοκαλί</font></b> για 10<= εντολές < 20 και <b><font color='red'>κόκκινο</font></b> για 20 ή περισσότερες εντολές).<br>3. Διαχωρίστε τις μη αναγνωρισμένες επιθέσεις.",
	tsal_info5:"ΠΡΟΣΟΧΗ: Η σειρά των ρυθμίσεων της ετικέτας δεν αποθηκεύεται. Για αυτό το λόγο πρώτα φορτώστε ή αποθηκεύσετε ένα πρότυπο και έπειτα ρυθμίστε τη σειρά.",
	},
	buttons:{		
			  lang_open:"Άνοιγμα επιλογής γλώσσας",
              lang_close:"Κλείσιμο επιλογής γλώσσας",
			  			  script_1:"Ρυθμίσεις Ετικέτας",
		script_2:"Μορφοποίηση",
		script_3:"Εφαρμογή Ρυθμίσεων",
		script_4:"Γενικές Ρυθμίσεις",
		script_5:"Εφαρμογή Ετικέτας",
		save:"Αποθήκευση Ρυθμίσεων",
		hide:"Απόκρυψη Ρυθμίσεων",
		res_set:"Επανεκκίνηση Ρυθμίσεων",
		res_count:"Επανεκκίνηση Αρίθμησης",
		tsal_count:"Εντολές ανά χωριό",
		tsal_apply:"Εφαρμογή χρωματισμού",
		save1:"Αποθήκευση σε",
		save_def:"Αποθήκευση ως Προεπιλογή",
		tsal_sort:"Εμφάνιση νέων επιθέσεων",
	},
	notes:{
		activated:"Το script Εργαλεία Πληροφοριών Εισερχομένων έχει ήδη ενεργοποιηθεί",
		save:"Οι επιλεγμένες ρυθμίσεις αποθηκεύτηκαν επιτυχώς.",
		no_saved:"Δεν εντοπίστηκαν αποθηκευμένες ρυθμίσεις. Βεβαιωθείτε ότι έχετε αποθηκεύσει τις ρυθμίσεις μορφοποίησης και ετικέτας και ενεργοποιείστε εκ νέου τη λειτουργία.",
		no_saved1:"Δεν βρέθηκαν αποθηκευμένες ρυθμίσεις για το συγκεκριμένο πρότυπο. Αποθηκεύστε ρυθμίσεις στο συγκεκριμένο πρότυπο και προσπαθείστε πάλι.",
		res_set:"Οι ρυθμίσεις επανήλθαν επιτυχώς στις προκαθορισμένες τιμές τους. Η σελίδα θα ανανεωθεί αυτόματα σε 3 δευτερόλεπτα.",
		res_set2:"Οι ρυθμίσεις επανήλθαν επιτυχώς στις προκαθορισμένες τιμές τους.",
		res_set1:"Οι ρυθμίσεις Μορφοποίησης επανήλθαν επιτυχώς στις προκαθορισμένες τιμές τους. Η σελίδα θα ανανεωθεί αυτόματα σε 3 δευτερόλεπτα.",
		res_count:"Οι ρυθμίσεις Αρίθμησης επανεκκινήθηκαν επιτυχώς. Η σελίδα θα ανανεωθεί αυτόματα σε 3 δευτερόλεπτα.",
		no_inc:"Δεν βρέθηκαν εισερχόμενες εντολές στη τρέχουσα σελίδα",
		no_colors:"Δεν βρέθηκαν αποθηκευμένες ρυθμίσεις χρωμάτων εντολών",
		save1:"Οι ρυθμίσεις χρωματισμών των εισερχόμενων εντολών αποθηκεύτηκαν επιτυχώς.",
		alarm1:"Μην αγχώνεστε κ.",
		alarm2:"Δεν βρέθηκαν μη αναγνωρισμένες επιθέσεις στη τρέχουσα σελίδα.",
		alarm3:"μη αναγνωρισμένες εισερχόμενες επιθέσεις στη τρέχουσα σελίδα.",
		alarm4:"έχετε",
		found:"μη αναγνωρισμένες επιθέσεις βρέθηκαν στη τρέχουσα σελίδα.",
		not_found:"Δεν εντοπίστηκαν μη αναγνωρισμένες επιθέσεις στη τρέχουσα σελίδα.",
		no_saved_gen:"Δεν εντοπίστηκαν αποθηκευμένες ρυθμίσεις για τη συγκεκριμένη λειτουργία. Μεταβείτε στις <b><font color='gold'>Γενικές Ρυθμίσεις</font></b>, αποθηκεύστε τις ρυθμίσεις και ενεργοποιείστε εκ νέου τη λειτουργία.",
	},
};
    return tsalkapone_trans[lang];
    }());
	
var Tsalactive = location.href.indexOf('mode=incomings') > -1;
	
			if (!Tsalactive) {
				var contact_url = "https://forum.tribalwars.net/index.php?members/tsalkapone.114063/";
	   var content = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="darkgreen">Tsalkapone. '+tsalkapone_trans.general.script+'</font></u></center></h2>' +
'<hr><p><center><font color=maroon><b>'+tsalkapone_trans.general.message_1+'</b></font></center></p>' +
'<p><center><font color=maroon><b>'+tsalkapone_trans.general.message_2+'</b></font></center></p>' +
'<br><br><center><input type="button" class="btn evt-confirm-btn btn-confirm-yes" id="go_man" value="'+tsalkapone_trans.general.message_yes+'">&emsp;<input type="button" class="btn evt-cancel-btn btn-confirm-no" id="close_this" value="'+tsalkapone_trans.general.message_no+'"></center>'+ 
'<br><br><hr><center><img class="tooltip-delayed" title="<font color=darkgreen>Tsalkapone. '+tsalkapone_trans.general.script+'</font>" src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg" style="cursor:help; position: relative"></center><br><center><p>'+tsalkapone_trans.general.comm+' <a href="'+contact_url+'" title="Tsalkapone profile" target="_blank">Tsalkapone</a>.</p></center>' +
'</div>';            
Dialog.show('central_intelligence_intro', content);
$("#go_man").click(function () { window.location.assign(game_data.link_base_pure+"overview_villages&mode=incomings");});   
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
var tsalscript='<script type="text/javascript">function tsalkapone_sample () {';
tsalscript+="document.getElementById('tsalkapone_sample').innerHTML = getTsalFormat();}";
tsalscript+="function getTsalFormat() {var format = '';var inputs = document.getElementById('tsalkapone_config').getElementsByTagName('input');var rows = document.getElementById('tsalkapone_config').getElementsByClassName('tsalkapone');";
tsalscript+="for(var i=0; i<rows.length; i++){if(inputs[i*2].checked){format += inputs[i*2+1].value; format += ''+rows[i].innerHTML+'';}}return format;}";
tsalscript+="function TsalSample (){var x1 ='<span class=\"inside\"><img src=\"graphic/unit/tiny/ram.png\"> '+tsalkapone_trans.general.ram+' - 500|500</span>&emsp;&emsp;';";
tsalscript+="var x2 ='<span class=\"inside\"><img src=\"graphic/unit/tiny/axe.png\"> '+tsalkapone_trans.general.axe+' - 501|501</span>&emsp;&emsp;';";
tsalscript+="var x3 ='<span class=\"inside\"><img src=\"graphic/unit/tiny/snob.png\"> '+tsalkapone_trans.general.noble+' - 502|500</span>';";
tsalscript+="var x4 ='<span class=\"inside\"><img src=\"graphic/unit/tiny/sword.png\"> '+tsalkapone_trans.general.sword+' - 502|501</span>&emsp;&emsp;';";
tsalscript+="var x5 ='<span class=\"inside\"><img src=\"graphic/unit/tiny/light.png\"> '+tsalkapone_trans.general.light+' - 502|502</span>&emsp;&emsp;';";
tsalscript+="var x6 ='<span class=\"inside\"><img src=\"graphic/unit/tiny/spy.png\"> '+tsalkapone_trans.general.spy+' - 501|502</span>';";
tsalscript+="document.getElementById('tsalkapone_sample').innerHTML='<center><b>'+x1+x2+x3+'<br>'+x4+x5+x6+'</b></center>';";
tsalscript+='var ram = document.getElementById("xrwma_ram").value;	var axe = document.getElementById("xrwma_axe").value;var snob =	document.getElementById("xrwma_snob").value;';	
tsalscript+='var light = document.getElementById("xrwma_light").value;	var sword = document.getElementById("xrwma_sword").value; var spy = document.getElementById("xrwma_spy").value;';			
tsalscript+="var g=document.getElementById('tsalkapone_sample');var name=g.getElementsByClassName('inside');name[0].setAttribute('style','color: '+ram+'');name[1].setAttribute('style','color: '+axe+'');name[2].setAttribute('style','color: '+snob+'');name[3].setAttribute('style','color: '+sword+'');name[4].setAttribute('style','color: '+light+'');name[5].setAttribute('style','color: '+spy+'');}";
tsalscript+="function loadConfig1 (x,y) {if (localStorage.getItem(''+x+'') && localStorage.getItem(''+y+'')) {var tsal_check = JSON.parse(localStorage.getItem(''+x+''));var tsal_check1 = JSON.parse(localStorage.getItem(''+y+''));";
tsalscript+="var rows = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_label');var rows1 = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_extra');";
tsalscript+="for (var i=0; i<rows.length; i++) {rows[i].checked = tsal_check[i];			}for (var i=0; i<rows1.length; i++) {rows1[i].value = tsal_check1[i];}return true;} else {return false;}}"; 
tsalscript+="function tsal_temps(){loadConfig1 ('tsalkapone_label_settings_ekkinisi','tsalkapone_label_settings1_ekkinisi');";
tsalscript+="var x=document.getElementById('tsalkapone_temp').value; var y=document.getElementsByClassName('tsal_label'); var z=document.getElementsByClassName('tsal_extra');";
tsalscript+=' if (x=="temp1"){ y[0].checked=false; y[1].checked=false; y[2].checked=false; y[3].checked=false; y[4].checked=false; y[5].checked=false; y[6].checked=false; y[7].checked=false; y[8].checked=false; y[9].checked=false; y[10].checked=false; y[11].checked=true; y[12].checked=true;';	
tsalscript+='z[11].value = tsalkapone_trans.general.unknown; z[12].value = " - "; tsalkapone_sample ();}';
tsalscript+=' if (x=="temp2"){ y[0].checked=true; y[1].checked=true; y[2].checked=true; y[3].checked=true; y[4].checked=false; y[5].checked=false; y[6].checked=false; y[7].checked=false; y[8].checked=false; y[9].checked=false; y[10].checked=false; y[11].checked=false; y[12].checked=false;';	
tsalscript+='z[1].value = " - ";  z[2].value = " - "; z[3].value = " - "; tsalkapone_sample ();}';
tsalscript+=' if (x=="temp3"){ y[0].checked=false; y[1].checked=true; y[2].checked=true; y[3].checked=true; y[4].checked=false; y[5].checked=false; y[6].checked=true; y[7].checked=false; y[8].checked=false; y[9].checked=false; y[10].checked=false; y[11].checked=false; y[12].checked=false;';	
tsalscript+='z[6].value = " - "; z[1].value = "";  z[2].value = " - "; z[3].value = " - "; tsalkapone_sample ();}';
tsalscript+=' if (x=="temp4"){ y[0].checked=false; y[1].checked=true; y[2].checked=true; y[3].checked=true; y[4].checked=false; y[5].checked=true; y[6].checked=true; y[7].checked=false; y[8].checked=false; y[9].checked=true; y[10].checked=false; y[11].checked=false; y[12].checked=false;';	
tsalscript+='z[5].value = " - "; z[6].value = " - "; z[9].value = " - "; z[1].value = "";  z[2].value = " - "; z[3].value = " - "; tsalkapone_sample ();}';
tsalscript+=' if (x=="temp5"){ y[0].checked=false; y[1].checked=true; y[2].checked=false; y[3].checked=true; y[4].checked=false; y[5].checked=false; y[6].checked=false; y[7].checked=false; y[8].checked=false; y[9].checked=false; y[10].checked=false; y[11].checked=false; y[12].checked=false;';	
tsalscript+='z[1].value = ""; z[3].value = " - "; tsalkapone_sample ();}';
tsalscript+='};';
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
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.script_3+'</b></font></td>';
	tsalkaponecell+='<td><input type="button" id="tsalscript3" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_3+'"></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.script_5+'</b></font></td>';
	tsalkaponecell+='<td><input type="button" id="tsalscript5" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.script_5+'"></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.lang_sel+'</b></font></td>';
tsalkaponecell+='<td><font style="font-family: \'Arial Black\', Gadget, sans-serif;"><span id="openfilter1"><input type="button" value="'+tsalkapone_trans.buttons.lang_open+'" id="openfilterbut1" class="btn tsalbutton"></span><span id="closefilter1" style="display:none">';
tsalkaponecell+='<input class="btn tsalbutton" type="button" value="'+tsalkapone_trans.buttons.lang_close+'" id="closefilterbut1"></span></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.selected_one+'</b></font></td>';
tsalkaponecell+='<td><span id="selectedone"><center>'+lang_img+'</center></span><span id="columnfilter1" style="display:none" class="vis"><font size="2">';
tsalkaponecell+='<br><br><center><font color="blue"><b><u>'+tsalkapone_trans.general.available+'</u></b></font></center>';
tsalkaponecell+='<input type="radio"  name="language" value="greek" id="greek_lang" ><img title="Greek \n\nBy Tsalkapone" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif"><br>';
tsalkaponecell+='<input type="radio"  name="language" value="english" id="english_lang" checked><img height="20px" style="cursor:help;" title="English/American \n\nBy Tsalkapone" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif"><br>';
tsalkaponecell+='</span></td></tr></tbody></table></div><br><hr><span id="tsalresult"></span></div>';
if (! document.getElementById('tsalkapone_div')){
		$('#paged_view_content').prepend(tsalkaponecell);
}		
else {UI.SuccessMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br>'+tsalkapone_trans.notes.activated+'.', 5000);}

var Dialog1;(function(){'use strict';Dialog1={MAX_WIDTH:1200,closeCallback:null,show:function(id,content,closeCallback,options){options=$.extend({class_name:'',close_from_fader:true},options);this.closeCallback=closeCallback;var fullscreenElement=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement,container=fullscreenElement||'body',$container=$('.popup_box_container'),$box,$fader,$content,show_anim=false;if(!$container.length){show_anim=true;$container=$('<div class="popup_box_container" />');$box=$('<div class="popup_box" />').attr('id','popup_box_'+id).addClass(options.class_name).data('name',id).appendTo($container);$fader=$('<div class="fader" />').appendTo($container);$content=$('<div class="popup_box_content" />').appendTo($box);$container.appendTo($(container))}else{$box=$container.find('.popup_box');if($box.data('name')!==id){Dialog1.close();Dialog1.show(id,content,closeCallback,options);return};$content=$container.find('.popup_box_content');$box.css('width','auto')};$content.html(content);var height_buffer=125;if($(window).width()<500||$(window).height()<$content.height()+height_buffer){$box.addClass('mobile');$('.popup_box_content').css({'max-height':$(window).height()-(height_buffer/2)+'px'})};var border_width;if(typeof window.getComputedStyle==='function'){border_width=parseInt(getComputedStyle($box[0],null).borderLeftWidth)}else border_width=parseInt($box.css('border-left-width'));var min_width=200,width=Math.min(this.MAX_WIDTH,$content.width(),$(window).width()-border_width);if(width<min_width)width=min_width;if(!Modernizr.borderimage)width+=20;$box.css('width',width+'px');var hotkey_hint=(!mobile&&!mobiledevice&&HotKeys.enabled)?' :: ΟΟΞ½ΟΟΞΌΞ΅ΟΟΞ· ΟΞ»Ξ·ΞΊΟΟΞΏΞ»ΞΏΞ³Ξ―ΞΏΟ: <b>Esc</b>':'',tooltip_class=(!mobile&&!mobiledevice)?'tooltip-delayed':'',$close=$('<a class="popup_box_close '+tooltip_class+'" title="ΞΞ»Ξ΅Ξ―ΟΞ΅'+hotkey_hint+'" href="#">&nbsp;</a>').prependTo($content);UI.ToolTip($close,{delay:400});var close_elements=options.close_from_fader?'.fader, .popup_box_close, .popup_closer':'.popup_box_close, .popup_closer';$container.on('click',close_elements,function(){Dialog1.close(true);return false});if(show_anim)setTimeout(function(){$box.addClass('show')},50);UI.init();UnitPopup.init();setTimeout(QuestArrows.init,500)},close:function(by_user){$('.popup_box_container').remove();if(Dialog1.closeCallback)Dialog1.closeCallback(by_user);inlinePopupClose();$('.popup_style').hide();QuestArrows.init();return false},fetch:function(name,screen,get_params,callback,Dialog1_options,closeCallback){TribalWars.get(screen,get_params,function(data){Dialog1.show(name,data.Dialog1,closeCallback,Dialog1_options);if(callback)callback()})}}})();


 if (get_lang == "greek") {document.getElementById('greek_lang').checked = true;}
      else  if (get_lang == "english") {document.getElementById('english_lang').checked = true; }
         $("#english_lang").click(function(){
	localStorage.setItem("central_incoming_intelligence_lang","english");     
location.reload();
    });
	
      $("#greek_lang").click(function(){
	localStorage.setItem("central_incoming_intelligence_lang","greek");
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
	
	

	function fnColoreaOrdenes()
	{ if (localStorage.getItem('tsalkapone_color_settings'))   {  var tsalcolor = JSON.parse(localStorage.getItem('tsalkapone_color_settings'));                     
	var spear = tsalcolor[0];
var sword = tsalcolor[1];
var axe = tsalcolor[2];
var archer = tsalcolor[3];
var spy = tsalcolor[4];
var light = tsalcolor[5];
var heavy = tsalcolor[6];
var marcher = tsalcolor[7];
var ram = tsalcolor[8];
var catapult = tsalcolor[9];
var snob = tsalcolor[10];
var knight = tsalcolor[11];	
									var g=$('.quickedit').get(),f=0,n=g.length;
      for(;f<n;f++){var name=$.trim(g[f].getElementsByClassName('quickedit-content')[0].innerHTML);
                    var c=g[f];
								if(name.search("ram.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+spear+'')}
                else if(name.search("catapult.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+catapult+'')}
                    else if(name.search("spy.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+spy+'')}
                    else if(name.search("knight.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+knight+'')}
                    else if(name.search("light.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+light+'')}
                    else if(name.search("marcher.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+marcher+'')}
                    else if(name.search("heavy.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+heavy+'')}
                   
                    else if(name.search("axe.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+axe+'')}
                    else if(name.search("spear.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+spear+'')}
                    else if(name.search("archer.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+archer+'')}
                    else if(name.search("sword.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+sword+'')}
                    else if(name.search("snob.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+snob+'')}

	}}else {UI.ErrorMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> '+tsalkapone_trans.notes.no_colors+'', 5000);}
 
	}
	
	
	function tsaleidopoiisi () {
	var Tsalmodeincomings = location.href.indexOf('&mode=incomings') > -1;
                                var Tsalsubtypeattacks = location.href.indexOf('subtype=attacks') > -1;
                                var tsalepitheseis = game_data.player.incomings;
                                
                           
                                if (Tsalmodeincomings  && tsalepitheseis>0) {
                          var accountplayer = game_data.player.name;       
       
                          var tsaleiserxomenes = document.getElementById('incomings_table').innerText;
var tsaldiafora = tsaleiserxomenes.match(/Επίθεση/ig);         
 var tsaldiafora2 = tsaleiserxomenes.match(/Attack/ig);                                    
                               
                    if (game_data.player.incomings > 0) {            
                       
                          if (tsaldiafora !== null )  {   
 setTimeout(function(){ UI.ErrorMessage('<center><b><font color="gold" size="3"><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></center><br><br> '+accountplayer+', '+tsalkapone_trans.notes.alarm3+' '+tsaldiafora.length+' '+tsalkapone_trans.notes.alarm4+'</b>', 5000)},500);}
      

            else  {setTimeout(function(){UI.SuccessMessage('<center><b><font color="gold" size="3"><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></center> <br><br><b>'+tsalkapone_trans.notes.alarm1+' '+accountplayer+'.<br><br>'+tsalkapone_trans.notes.alarm2+'\</b>', 5000)},500);}
            
                     if (tsaldiafora2 !== null )  {   
 setTimeout(function(){ UI.ErrorMessage('<center><b><font color="gold" size="3"><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></center><br><br> '+accountplayer+', '+tsalkapone_trans.notes.alarm3+' '+tsaldiafora2.length+' '+tsalkapone_trans.notes.alarm4+'</b>', 5000)},500);}
      
            
            else  {setTimeout(function(){UI.SuccessMessage('<center><b><font color="gold" size="3"><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></center> <br><br><b>'+tsalkapone_trans.notes.alarm1+' '+accountplayer+'.<br><br>'+tsalkapone_trans.notes.alarm2+'</b>', 5000)},500);}
                        
                                
                    }
	}  else {UI.ErrorMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> '+tsalkapone_trans.notes.no_inc+'.', 5000);}      }
	
	
	function Tsalapplylabel()
	{
if (localStorage.getItem('tsalkapone_label'))
{
	var tsal_waveclick='';
if (localStorage.tsal_waveactive == "tsalkapone")	
{
  if (localStorage.tsal_waveclick) {
            localStorage.tsal_waveclick = Number(localStorage.tsal_waveclick)+1;
        } else {
            localStorage.tsal_waveclick = 1;
} tsal_waveclick = localStorage.getItem('tsal_waveclick')+': ';
}
var tsal_format = localStorage.getItem('tsalkapone_label');
var tsal_time =$('#serverDate').html()+' '+$('#serverTime').html();
var tsalkapone_format = tsal_format.replace(/\%tsal_time%/ig,tsal_time).replace(/\%tsal_keimeno%/ig,'').replace(/\%tsal_wave%/ig,tsal_waveclick);
	$('#select_all').click();
		$('input[name=label_format]').val(tsalkapone_format).parents('form').find('input[name=label]').click();}
else {UI.ErrorMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> '+tsalkapone_trans.notes.no_saved+'', 5000);}
 		
	}
	
if (localStorage.getItem('tsalkapone_genika_settings1')) {var tsalgenika = JSON.parse(localStorage.getItem('tsalkapone_genika_settings')); 
if(tsalgenika[3] == true){
	var Tsalmodeincomings = location.href.indexOf('&mode=incomings') > -1;
                                var tsalepitheseis = game_data.player.incomings;
                                if (Tsalmodeincomings  && tsalepitheseis>0) { 
var x=document.getElementById('incomings_table');
 var y=[]; for (var i=1; i<x.rows.length-1; i++) 
 { var z=x.rows[i].cells[0].innerText; if (z.indexOf('Attack')>-1 || z.indexOf('Επίθεση')>-1) { y.push(z); }} 
if (y.length>0){ Tsalapplylabel();}
 else  {setTimeout(function(){UI.SuccessMessage('<center><b><font color="gold" size="3"><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></center> <br><br><b>'+tsalkapone_trans.notes.alarm1+' '+accountplayer+'.<br><br>'+tsalkapone_trans.notes.alarm2+'</b>', 5000)},500);}
          
                               

	} else {UI.ErrorMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> '+tsalkapone_trans.notes.no_inc+'.', 5000);}      }
	}	
	
	$("#tsalscript5").click(function(){	Tsalapplylabel(); });
	
	$("#tsalscript3").click(function(){	
	if (localStorage.getItem('tsalkapone_genika_settings'))
	{	var tsalgenika = JSON.parse(localStorage.getItem('tsalkapone_genika_settings'));

if (tsalgenika[0] == true) {function AttackCounter(){
	try{
		var _name='Μετρητής εισερχόμενων επιθέσεων ανά χωριό';
		var _version=7.04;
		var _min_game_version=7.00;
		var _author={
			name:'Tsalkapone',
			email:'tsalkapone@hotmail.com'
		};
		var _debugID = _name.replace(/\s/g,'');
		var _debugEnabled=true;
		var _win=(window.main||self),$=_win.$;
		

	

		if($('#' + _debugID + '_done').length > 0){
			UI.ErrorMessage('<table class="vis" width="100%"><tr><th>Ειδοποίηση από τον Tsalkapone</th></tr></table> <br><br> To script υπολογισμού εισερχόμενων επιθέσεων ανά χωριό έχει ήδη ενεργοποιηθεί', 4000);
		}

		var _gameVersion = _win.game_data.version.match(/[\d|\.]+/g);
		_gameVersion = (_gameVersion?parseFloat(_gameVersion[1]):-1);

		/* HACK: fix null mode */
		if(!_win.game_data.mode){
			var vmode=$('#overview_menu td[class="selected"] a').attr('href');
			vmode=vmode?vmode.match(/mode\=(\w*)/i):null;
			_win.game_data.mode=vmode?vmode[1]:null;
		}
	
		var _worldConfig = $(fnAjax('/interface.php','GET',{'func':'get_config'},'xml',false)).find('config');
		var _unitConfig = $(fnAjax('/interface.php','GET',{'func':'get_unit_info'},'xml',false)).find('config');
/*		
		var _buildingConfig = $(fnAjax('/interface.php','GET',{'func':'get_building_info'},'xml',false)).find('config');
*/

		var _isPremium = ($('#quickbar_outer').length>0);
		var _hasChurch = (parseInt(_worldConfig.find('game church').text()||'0',10)>0);
		var _hasPaladin = (parseInt(_worldConfig.find('game knight').text()||'0',10)>0);
		var _hasArchers = (parseInt(_worldConfig.find('game archer').text()||'0',10)>0);
		var _hasMilitia = (_unitConfig.find('militia').length>0);
		var _hasVillageNotes = ($('[src*="note.png"],[class*="note-icon"]').length>0);

		if(!fnHasMinVersion(_min_game_version)){
			throw('Το συγκεκριμένο script απαιτεί έκδοση v'+_min_game_version.toFixed(2)+' ή μεγαλύτερη.\nΗ τρέχουσα έκδοση παιχνιδιού είναι η εξής: v'+_gameVersion.toFixed(2));
		}
		
		if(_win.game_data.mode != 'incomings'){
			throw("Tsalkapone. Μετρητής εισερχόμενων επιθέσεων ανά χωριό. </br> Το συγκεκριμένο script ενεργοποιείται από τη σελίδα Εισερχομένων");
		}

		return{
			execute:function(){fnQueryIncomingAttacks();}
		};
	}
	catch(objError){
		fnHandleError(objError);
	}

	function fnPrint(msg,id){
		if($('#' + _debugID).length <= 0){
			$('body').append('<div id="' + _debugID + '"></div>');
		}
	
		$('#' + _debugID).append('<span id="'+((typeof(id)=='undefined')?'':id)+'">'+msg+'</span><br/>');
	}

	function fnDebug(msg){
		if((typeof(_debugEnabled) != "undefined") && _debugEnabled){
			fnPrint(msg);
		}
	}

	/* TODO: possibly add a max_version parameter */
	function fnHasMinVersion(min_version){
		return (_gameVersion >= min_version);
	}

	function fnHandleError(objError){
		var errMsg=String(objError.message||objError||'');
		if(errMsg){
			fnPrint('ΣΦΑΛΜΑ: ' + errMsg);
			UI.ErrorMessage(errMsg, 5000);
		}
	}

	function fnAjax(url,method,params,type,isAsync){
		var error = null;
		var payload = null;

		$.ajax({
			'async':isAsync,
			'url':url,
			'data':params,
			'dataType':type,
			'type':String(method||'GET').toUpperCase(),
			'error':function(req,status,err){error='ajax: ' + status;},
			'success':function(data,status,req){payload=data;}
		});

		if(error){
			throw(error);
		}

		return payload;
	}

	function fnPrintVersion(){
		fnPrint('<span style="color:red;">Αντιγράψτε τα παρακάτω δεδομένα για να ζητήσετε βοήθεια:</span>');
		fnPrint("=========================");
		fnPrint(_author.name + "'s " + _name + ": v" + _version.toFixed(2));
		fnPrint("=========================");
		fnPrint("Λογαριασμός premium: "+(_isPremium?"Ενεργός":"Απενεργοποιημένος"));
		fnPrint("Εκκλησία : "+(_hasChurch?"Ενεργή":"Απενεργοποιημένη"));
		fnPrint("Paladin : "+(_hasPaladin?"Ενεργός":"Απενεργοποιημένος"));
		fnPrint("Τοξότες : "+(_hasArchers?"Ενεργοί":"Απενεργοποιημένοι"));
		fnPrint("Εθνοφρουρά: "+(_hasMilitia?"Ενεργή":"Απενεργοποιημένη"));
		fnPrint("Σημειωματάριο  : "+(_hasVillageNotes?"Ενεργό":"Απενεργοποιημένο"));
		fnPrint("Επιτηρητής : "+(_win.location.href.match(/t\=\d+/i)?"Ενεργός":"Απενεργοποιημένος"));
		fnPrint("=========================");
		fnPrint("Έκδοση: "+_win.game_data.version);
		fnPrint("Κόσμος  : "+_win.game_data.world);
		fnPrint("Τοποθεσία σελίδας : : "+_win.game_data.screen);
		fnPrint("Κατεύθυνση σελίδας :   : "+_win.game_data.mode);
		fnPrint("URL    : "+_win.location.href);
		fnPrint("Έκδοση Browser: "+navigator.userAgent);
		fnPrint("=========================");
	}

	function fnQueryIncomingAttacks(){
		

		try{	
			var summary = [];
			
			/* Count incoming attacks for each village */
			$('#incomings_table tr:has(img[src*="/attack.png"]) td:nth-child(2)').each(function(i,e){
				var coords=$(e).text().match(/\d+\|\d+/g);
				coords = coords?coords[coords.length - 1]:null;
				if(typeof(summary[coords])=="undefined")
					summary[coords] = {tally:0,html:$(e).closest('tr').find('td:eq(1)').html()};
					
				summary[coords].tally++;
			});
			
			$('#incomings_table tr:has(img[src*="/attack.png"]) td:nth-child(2)').each(function(i,e){
				var coords=$(e).text().match(/\d+\|\d+/g);
				coords = coords?coords[coords.length - 1]:null;
				var x = document.getElementById("incomings_table").rows.length;
				var y = x-2;

				/* Inject the attack tally */
				var cell=$(e).closest('tr').find('td:eq(0)');
				var tsal_number = document.getElementsByClassName('tsal_number');
				if (tsal_number.length < y) {
				if (summary[coords].tally < 4) {
				cell.html('<b><font class="tsal_number" color="green">(' + summary[coords].tally + ')</font></b> ' + cell.html());
				}
			else if (summary[coords].tally >= 4 && summary[coords].tally < 10){
			cell.html('<b><font class="tsal_number" color="blue">(' + summary[coords].tally + ')</font></b> ' + cell.html());
			}
		else if (summary[coords].tally >= 10 && summary[coords].tally < 20){
			cell.html('<b><font class="tsal_number" color="darkorange">(' + summary[coords].tally + ')</font></b> ' + cell.html());
			}
			else {
			cell.html('<b><font class="tsal_number" color="red">(' + summary[coords].tally + ')</font></b> ' + cell.html());
			}
				}
			});
		
			/* Convert Associative Array to Indexed Array for sorting */
			var count=0;
			var attackSummary=[];
			for(var coords in summary){
				if(summary.hasOwnProperty(coords))
					attackSummary[count++]=summary[coords];
			}
		
			/* Sort the Attack Summary in descending order by tally */
			attackSummary.sort(function(a,b){return b.tally - a.tally;});

			/* Display results in a Table */
			if (attackSummary.length>0){
var  tsalmenu2='<div id="tsalkaponemagicscripttable" class="target-select clearfix vis"><h4 height="20px;">';
tsalmenu2+='<font color="maroon">Tsalkapone. '+tsalkapone_trans.general.inc_count+'</font></h4>';
tsalmenu2+='<table class="vis" width="100%"><tbody><tr><th>'+tsalkapone_trans.general.inc_vil+'</th><th>'+tsalkapone_trans.general.inc_co+'</th></tr>';
for(var ii=0; ii < attackSummary.length; ii++){
tsalmenu2+='<tr><td>'+attackSummary[ii].html+'</td><td><font color="red"><b>'+attackSummary[ii].tally+'</b></font></td></tr>';
	 }	
			tsalmenu2+='</tbody></table></div><br><hr>';
if (!document.getElementById('tsalkaponemagicscripttable')){				
$('#tsalkapone_div').append(tsalmenu2);}
			}
else {UI.ErrorMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> '+tsalkapone_trans.notes.no_inc+'.', 5000);}
  			

		}
		catch(objError){
			fnHandleError(objError);
		}
	}
}


if(typeof(scriptOb)=="undefined"){
	var scriptObj = new AttackCounter;
	scriptObj.execute();
}}			
if (tsalgenika[1] == true) {fnColoreaOrdenes();}
if (tsalgenika[2] == true) {tsaleidopoiisi();}
}
	else {UI.ErrorMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> '+tsalkapone_trans.notes.no_saved_gen+'', 8000);}
	
	});

$("#tsalscript4").click(function(){	
var temp1=''; var temp2=''; var temp3=''; var temp4='';
if (localStorage.getItem('tsalkapone_genika_settings1'))
{ var titles = JSON.parse(localStorage.getItem('tsalkapone_genika_settings1'));
temp1 = titles[0];
temp2 = titles[1];
temp3 = titles[2];
temp4 = titles[3];
}
else {
temp1 = tsalkapone_trans.general.temp_1;
temp2 = tsalkapone_trans.general.temp_2;
temp3 = tsalkapone_trans.general.temp_3;
temp4 = tsalkapone_trans.general.temp_4;
}
var stat1=''; var stat2=''; var stat3=''; var stat4='';
if (localStorage.getItem('tsalkapone1_label_settings')) {stat1='<center><font color="darkgreen"><b><span class="tsalshine">'+tsalkapone_trans.general.stat_save+'</span></b></font></center>';} else {stat1='<center><b><span class="pulse1">'+tsalkapone_trans.general.stat_no+'</span></b></center>';}
	if (localStorage.getItem('tsalkapone2_label_settings')) {stat2='<center><font color="darkgreen"><b><span class="tsalshine">'+tsalkapone_trans.general.stat_save+'</span></b></font></center>';} else {stat2='<center><b><span class="pulse1">'+tsalkapone_trans.general.stat_no+'</span></b></center>';}
if (localStorage.getItem('tsalkapone3_label_settings')) {stat3='<center><font color="darkgreen"><b><span class="tsalshine">'+tsalkapone_trans.general.stat_save+'</span></b></font></center>';} else {stat3='<center><b><span class="pulse1">'+tsalkapone_trans.general.stat_no+'</span></b></center>';}
if (localStorage.getItem('tsalkapone4_label_settings')) {stat4='<center><font color="darkgreen"><b><span class="tsalshine">'+tsalkapone_trans.general.stat_save+'</span></b></font></center>'; }else {stat4='<center><b><span class="pulse1">'+tsalkapone_trans.general.stat_no+'</span></b></center>';}

var tsalmenu ='<div class="target-select clearfix" width="100%">';
tsalmenu+='<div align="center" style="width:100%;height:30px;line-height:30px;background:url(https://dl.dropboxusercontent.com/s/wwavk9gdi2dhbo5/tsalkapone_top.png) repeat-x">';
tsalmenu+='<span class="tsaltooltip"><img style="cursor: help; height:20px; width:20px; margin-top:5px;" src="graphic/questionmark.png" ><span class="tsalinfo1">'+tsalkapone_trans.general.tsal_info1+'</span></span>&nbsp;';
tsalmenu+='<font color="darkorange" size="4"><b><u>'+tsalkapone_trans.buttons.script_4+'</u></b></font>';
tsalmenu+='&emsp;<a class="tsalprofile" href="https://forum.tribalwars.net/index.php?members/tsalkapone.114063/" target="_blank">'+tsalkapone_trans.general.edited_by+' Tsalkapone</a></div>';
tsalmenu+="<table id='tsalkapone_config'  width='100%'><tbody><tr><td width='50%'>";
tsalmenu+="<table id='tsalkapone1' class='vis' width='100%' ><tbody><tr><th>"+tsalkapone_trans.general.gen+"</th>";
tsalmenu+="<th>"+tsalkapone_trans.general.act+"</th></tr>";
tsalmenu+="<tr><td>"+tsalkapone_trans.general.gen1+"</td><td><input class='tsal_gen' type='checkbox' id='gen1'checked></td></tr>";
tsalmenu+="<tr><td>"+tsalkapone_trans.general.gen2+"</td><td><input class='tsal_gen' type='checkbox' id='gen2'checked></td></tr>";
tsalmenu+="<tr><td>"+tsalkapone_trans.general.gen4+"</td><td><input class='tsal_gen' type='checkbox' id='gen4'checked></td></tr>";
tsalmenu+="<tr><th>"+tsalkapone_trans.general.gen3+"</th><th>"+tsalkapone_trans.general.act+"</th></tr>";
tsalmenu+="<tr><td>"+tsalkapone_trans.general.gen5+"</td><td><input class='tsal_gen' type='checkbox' id='gen5'></td></tr>";
tsalmenu+="</tbody></table></td>";
tsalmenu+="<td width='50%'><table id='tsalkapone2'  class='vis' width='100%'><tbody><tr><th><b><font color='maroon'>"+tsalkapone_trans.general.templates+"</font></b></th>";
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
tsalmenu+='</tbody></table><br><center><input type="button" class="btn tsalbutton" id="Tsalsave" value="'+tsalkapone_trans.buttons.save+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalreset" value="'+tsalkapone_trans.buttons.res_set+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalhide" value="'+tsalkapone_trans.buttons.hide+'"></center></div><hr>';
document.getElementById('tsalresult').innerHTML = tsalmenu;


function saveConfig () {
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
	var	tsalkapone_genika_settings = options;
	var	tsalkapone_genika_settings1 = options1;
		
		localStorage.setItem('tsalkapone_genika_settings',JSON.stringify(tsalkapone_genika_settings));
		localStorage.setItem('tsalkapone_genika_settings1',JSON.stringify(tsalkapone_genika_settings1));
	}

	
	function loadConfig () {
		if (localStorage.getItem('tsalkapone_genika_settings') && localStorage.getItem('tsalkapone_genika_settings1')) {
			var tsal_check = JSON.parse(localStorage.getItem('tsalkapone_genika_settings'));
			var tsal_check1 = JSON.parse(localStorage.getItem('tsalkapone_genika_settings1'));
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
localStorage.removeItem("tsalkapone_genika_settings"); 
localStorage.removeItem("tsalkapone_genika_settings1"); 
UI.SuccessMessage('<span id=tsalkaponesuccesssave><b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></span><br><br>'+tsalkapone_trans.notes.res_set2+'', 3000);  
setTimeout(function(){ location.reload (); }, 4000);
	});
	$("#Tsalhide").click(function(){ document.getElementById('tsalresult').innerHTML=''; });
	$("#Tsalsave").click(function(){ saveConfig ();
 var tsalk_etiketa = localStorage.getItem('tsalkapone_genika_settings'); var tsalk_etiketa1 = localStorage.getItem('tsalkapone_genika_settings1');console.log('\n\nTsalkapone ~ General Settings:\n'+tsalk_etiketa+'\n'+tsalk_etiketa1);				
UI.SuccessMessage('<span id=tsalkaponesuccesssave><b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></span><br><br>'+tsalkapone_trans.notes.save+'', 3000);  
 })

});


	
$("#tsalscript1").click(function(){	
var temp0 = tsalkapone_trans.general.temp_0;
var temp1=''; var temp2=''; var temp3=''; var temp4='';
if (localStorage.getItem('tsalkapone_genika_settings1'))
{ var titles = JSON.parse(localStorage.getItem('tsalkapone_genika_settings1'));
temp1 = titles[0];
temp2 = titles[1];
temp3 = titles[2];
temp4 = titles[3];
}
else {
temp1 = tsalkapone_trans.general.temp_1;
temp2 = tsalkapone_trans.general.temp_2;
temp3 = tsalkapone_trans.general.temp_3;
temp4 = tsalkapone_trans.general.temp_4;
}

var tsaldrag='<div style="width: 11px; height:11px; background-image: url(https://dsen.innogamescdn.com/8.48.1/29746/graphic/sorthandle.png); cursor:move" class="qbhandle" title="'+tsalkapone_trans.general.drag+'"> </div>';
   

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
tsalmenu+='<option value="temp3">'+tsalkapone_trans.general.temp3+'</option>';
tsalmenu+='<option value="temp4">'+tsalkapone_trans.general.temp4+'</option>';
tsalmenu+='<option value="temp5">'+tsalkapone_trans.general.temp5+'</option></select>';
tsalmenu+='</div><br><br><hr><center><img id="tsalsample_img" height="80px;" width="200px;" src="https://dl.dropboxusercontent.com/s/1uhr6byjpq9cchr/Tsalkapone_sample.gif" ></center>';
tsalmenu+='<br>&nbsp;<font color="blue"><b><span id="tsalkapone_sample"></span></b></font></div><br>';
tsalmenu+='<hr>&emsp;<font style="font-family: \'Comic Sans MS\', cursive, sans-serif;" size="2" color="darkgreen"><b><u>'+game_data.player.name+' ~ '+tsalkapone_trans.general.temp+':</u></b></font>';
tsalmenu+='&emsp;<input type="button" class="btn tsalbutton" id="temp0" value="'+temp0+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="temp1" value="'+temp1+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="temp2" value="'+temp2+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="temp3" value="'+temp3+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="temp4" value="'+temp4+'"><hr><br>';
tsalmenu+="<table id='tsalkapone_config' class='vis' width='100%'><tbody><tr>";
tsalmenu+="<th>"+tsalkapone_trans.general.act+"</th>";
tsalmenu+="<th>"+tsalkapone_trans.general.extra+"</th>";
tsalmenu+="<th>"+tsalkapone_trans.general.lab+"</th>";
tsalmenu+="<th>"+tsalkapone_trans.general.desc+"</th>";
tsalmenu+="<th>"+tsalkapone_trans.general.ord+"</th></tr>";
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="tsal_wave" ></td><td><input type="text"  class="tsal_extra" value="'+tsalkapone_trans.general.wave_in+'" readonly></td><td>'+tsalkapone_trans.general.wave+'</td><td>'+tsalkapone_trans.general.wave_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone"> 1. :</td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="unit" checked></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" "></td><td>'+tsalkapone_trans.general.unit+'</td><td>'+tsalkapone_trans.general.unit_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone"><img src="/graphic/unit/tiny/ram.png"> '+tsalkapone_trans.general.ram+'</td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="coords" checked></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" - "></td><td>'+tsalkapone_trans.general.coords+'</td><td>'+tsalkapone_trans.general.coords_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone">500|500</td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="player" checked></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();"  class="tsal_extra" value=" - "></td><td>'+tsalkapone_trans.general.player+'</td><td>'+tsalkapone_trans.general.player_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone">Tsalkapone</td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="duration" ></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" - "></td><td>'+tsalkapone_trans.general.dur+'</td><td>'+tsalkapone_trans.general.dur_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone">1:48:10</td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="distance" ></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" - "></td><td>'+tsalkapone_trans.general.dis+'</td><td>'+tsalkapone_trans.general.dis_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone">3.6</td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="return" ></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" - "></td><td>'+tsalkapone_trans.general.ret+'</td><td>'+tsalkapone_trans.general.ret_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone">Jun 24, 18:05</td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="sent" ></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" - "></td><td>'+tsalkapone_trans.general.sent+'</td><td>'+tsalkapone_trans.general.sent_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone">Jun 24, 14:29</td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="arrival" ></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" - "></td><td>'+tsalkapone_trans.general.arr+'</td><td>'+tsalkapone_trans.general.arr_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone">Jun 24, 16:17</td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="origin" ></td><td><input type="text" onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" - "></td><td>'+tsalkapone_trans.general.ori+'</td><td>'+tsalkapone_trans.general.ori_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone">0001 (584|516) K55</td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="destination" ></td><td><input type="text"  onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" - " ></td><td>'+tsalkapone_trans.general.desti+'</td><td>'+tsalkapone_trans.general.desti_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone">0002 (586|519) K55</td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="tsal_keimeno" ></td><td><input type="text"  onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value="- '+tsalkapone_trans.general.keimeno+'"></td><td>'+tsalkapone_trans.general.keimeno+'</td><td>'+tsalkapone_trans.general.keimeno_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone"></td></tr>';
tsalmenu+='<tr><td><input type="checkbox" onchange="tsalkapone_sample ();" class="tsal_label" id="tsal_time" ></td><td><input type="text"  onkeydown="tsalkapone_sample ();" onkeyup="tsalkapone_sample ();" class="tsal_extra" value=" - "></td><td>'+tsalkapone_trans.general.time+'</td><td>'+tsalkapone_trans.general.time_info+'</td><td><center>'+tsaldrag+'</center></td><td style="display:none" class="tsalkapone">24/06/2016 16:55:18</td></tr>';
tsalmenu+='</tbody></table><hr><center><input type="button" class="btn tsalbutton" id="Tsalsave" value="'+tsalkapone_trans.buttons.save_def+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalsave1" value="'+tsalkapone_trans.buttons.save1+' '+temp1+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalsave2" value="'+tsalkapone_trans.buttons.save1+' '+temp2+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalsave3" value="'+tsalkapone_trans.buttons.save1+' '+temp3+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalsave4" value="'+tsalkapone_trans.buttons.save1+' '+temp4+'"><hr>';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalreset" value="'+tsalkapone_trans.buttons.res_set+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalreset_count" value="'+tsalkapone_trans.buttons.res_count+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalhide" value="'+tsalkapone_trans.buttons.hide+'"></center><hr>';
tsalmenu+='<center><span class="tsalkembed1"><img width="20px;" src="https://dl.dropboxusercontent.com/s/s9swak86tirwdpd/Tsalkapone.%20Warning.gif">&emsp;'+tsalkapone_trans.general.save_attention+'</span></center><br><br></div>';
document.getElementById('tsalresult').innerHTML = tsalmenu;



function saveConfig (x,y,z) {
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
		var tsal_wave = document.getElementById('tsal_wave').checked;
	if (tsal_wave == true) {localStorage.setItem('tsal_waveactive','tsalkapone');}
	else {localStorage.setItem('tsal_waveactive','0');}
		
	var	tsalkapone_label_settings = options;
	var	tsalkapone_label_settings1 = options1;
		
		localStorage.setItem(''+x+'',JSON.stringify(tsalkapone_label_settings));
		localStorage.setItem(''+y+'',JSON.stringify(tsalkapone_label_settings1));
		if (x!='tsalkapone_label_settings_ekkinisi')
		{UI.SuccessMessage('<span id=tsalkaponesuccesssave><b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></span><br><br>'+tsalkapone_trans.notes.save+'', 3000);}  
var tsal_etiketa1 =localStorage.getItem(''+x+'');
var tsal_etiketa2 =localStorage.getItem(''+y+'');
var tsalk_etiketa = tsal_etiketa1+'\n'+tsal_etiketa2;
		
		console.log('\n\nTsalkapone ~ '+z+' Settings:\n'+tsalk_etiketa); 
	}
	
function loadConfig (x,y) {
		if (localStorage.getItem(''+x+'') && localStorage.getItem(''+y+'')) {
			var tsal_check = JSON.parse(localStorage.getItem(''+x+''));
			var tsal_check1 = JSON.parse(localStorage.getItem(''+y+''));
			var rows = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_label');
			var rows1 = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_extra');
		for (var i=0; i<rows.length; i++) {
			rows[i].checked = tsal_check[i];			
		}
		for (var i=0; i<rows1.length; i++) {
			rows1[i].value = tsal_check1[i];			
		}
			return true;
		} else {
{UI.ErrorMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br>'+tsalkapone_trans.notes.no_saved1+'', 4000);}
}
	} 
	function loadConfig1 (x,y) {
		if (localStorage.getItem(''+x+'') && localStorage.getItem(''+y+'')) {
			var tsal_check = JSON.parse(localStorage.getItem(''+x+''));
			var tsal_check1 = JSON.parse(localStorage.getItem(''+y+''));
			var rows = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_label');
			var rows1 = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_extra');
		for (var i=0; i<rows.length; i++) {
			rows[i].checked = tsal_check[i];			
		}
		for (var i=0; i<rows1.length; i++) {
			rows1[i].value = tsal_check1[i];			
		}
			return true;
		} else {
			return false;
		}
	} 
 	loadConfig1 ('tsalkapone_label_settings','tsalkapone_label_settings1');
	if (localStorage.getItem('tsal_entoles_names_ekkinisi')===null){
	saveConfig ('tsalkapone_label_settings_ekkinisi','tsalkapone_label_settings1_ekkinisi','Tsalkapone');
	localStorage.setItem('tsal_entoles_names_ekkinisi',1);
	}
	
$("#temp0").click(function(){ loadConfig ('tsalkapone_label_settings','tsalkapone_label_settings1'); tsalkapone_sample ();	 });
$("#temp1").click(function(){ loadConfig ('tsalkapone1_label_settings','tsalkapone1_label_settings1');	tsalkapone_sample (); });
$("#temp2").click(function(){ loadConfig ('tsalkapone2_label_settings','tsalkapone2_label_settings1');	tsalkapone_sample (); });
$("#temp3").click(function(){ loadConfig ('tsalkapone3_label_settings','tsalkapone3_label_settings1');	tsalkapone_sample (); });
$("#temp4").click(function(){ loadConfig ('tsalkapone4_label_settings','tsalkapone4_label_settings1');	tsalkapone_sample (); });

	
function getFormat () {
		var format = '';
		var inputs = document.getElementById('tsalkapone_config').getElementsByTagName('input');
		var rows = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_label');
		for(var i=0; i<rows.length; i++){
			if(inputs[i*2].checked)
			{
				format += inputs[i*2+1].value;
				format += '%'+rows[i].id+'%';
			}
		}
		return format;
	}
	$("#Tsalreset_count").click(function(){ 
localStorage.removeItem('tsal_waveclick');
UI.SuccessMessage('<span id=tsalkaponesuccesssave><b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></span><br><br>'+tsalkapone_trans.notes.res_count+'', 3000);  
	});
	$("#Tsalreset").click(function(){ 
localStorage.removeItem("tsalkapone_label_settings"); 
localStorage.removeItem("tsalkapone_label_settings1"); 
localStorage.removeItem("tsalkapone1_label_settings"); 
localStorage.removeItem("tsalkapone1_label_settings1");
localStorage.removeItem("tsalkapone2_label_settings"); 
localStorage.removeItem("tsalkapone2_label_settings1");
localStorage.removeItem("tsalkapone3_label_settings"); 
localStorage.removeItem("tsalkapone3_label_settings1");
localStorage.removeItem("tsalkapone4_label_settings"); 
localStorage.removeItem("tsalkapone4_label_settings1");
localStorage.removeItem("tsalkapone_label"); 
localStorage.removeItem('tsal_waveclick');
localStorage.removeItem("tsalkapone_label_settings_ekkinisi");
localStorage.removeItem("tsalkapone_label_settings1_ekkinisi");
UI.SuccessMessage('<span id=tsalkaponesuccesssave><b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></span><br><br>'+tsalkapone_trans.notes.res_set+'', 3000);  
setTimeout(function(){ location.reload (); }, 4000);
	});
	
	$("#Tsalhide").click(function(){ document.getElementById('tsalresult').innerHTML=''; });
	$("#Tsalsave").click(function(){ var tsalk_etiketa = getFormat (); localStorage.setItem('tsalkapone_label',tsalk_etiketa); console.log(tsalk_etiketa); saveConfig ('tsalkapone_label_settings','tsalkapone_label_settings1','Default Label');});
	$("#Tsalsave1").click(function(){ saveConfig ('tsalkapone1_label_settings','tsalkapone1_label_settings1','Temp1');});
	$("#Tsalsave2").click(function(){ saveConfig ('tsalkapone2_label_settings','tsalkapone2_label_settings1','Temp2');});
	$("#Tsalsave3").click(function(){ saveConfig ('tsalkapone3_label_settings','tsalkapone3_label_settings1','Temp3');});
	$("#Tsalsave4").click(function(){ saveConfig ('tsalkapone4_label_settings','tsalkapone4_label_settings1','Temp4');});
	
$('#tsalkapone_config > tbody').sortable({handle: '.qbhandle', placeholder: 'sortable-placeholder'});
		$('#tsalkapone_config > tbody').on('sortstop', function(){
			tsalkapone_sample();
		});	
function getTsalFormat() {
		
		var format = '';
		var inputs = document.getElementById('tsalkapone_config').getElementsByTagName('input');
		var rows = document.getElementById('tsalkapone_config').getElementsByClassName('tsalkapone');
		for(var i=0; i<rows.length; i++){
			if(inputs[i*2].checked)
			{
				format += inputs[i*2+1].value; 
				format += ''+rows[i].innerHTML+'';
			}
		}
		return format;
	}
	function tsalkapone_sample () {
		document.getElementById('tsalkapone_sample').innerHTML =getTsalFormat();	}

	tsalkapone_sample ();
}); }
	

	
$("#tsalscript2").click(function(){	


var tsalmenu ='<div class="target-select clearfix vis" width="100%">';
tsalmenu+='<div align="center" style="width:100%;height:30px;line-height:30px;background:url(https://dl.dropboxusercontent.com/s/wwavk9gdi2dhbo5/tsalkapone_top.png) repeat-x">';
tsalmenu+='<span class="tsaltooltip"><img style="cursor: help; height:20px; width:20px; margin-top:5px;" src="graphic/questionmark.png" ><span class="tsalinfo1">'+tsalkapone_trans.general.tsal_info4+'</span></span>&nbsp;';
tsalmenu+='<font color="darkorange" size="4"><b><u>'+tsalkapone_trans.buttons.script_2+'</u></b></font>';
tsalmenu+='&emsp;<a class="tsalprofile" href="https://forum.tribalwars.net/index.php?members/tsalkapone.114063/" target="_blank">'+tsalkapone_trans.general.created+' Tsalkapone</a></div>';
tsalmenu+='<div><center><img id="tsalsample_img" height="80px;" width="200px;" src="https://dl.dropboxusercontent.com/s/1uhr6byjpq9cchr/Tsalkapone_sample.gif" ></center><br>&nbsp;<span id="tsalkapone_sample"></span></div><br>';
tsalmenu+="<table id='tsalkapone_config' class='vis' width='100%'><tbody><tr>";
tsalmenu+="<th><center>"+tsalkapone_trans.general.tsal_img+"</center></th>";
tsalmenu+="<th><center>"+tsalkapone_trans.general.tsal_color+"</center></th></tr>";
tsalmenu+='<tr><td><center><img src="graphic/unit/unit_spear.png"></td></center></td>';
tsalmenu+='<td><center><input class="tsal_color" id="xrwma_spear" type="color" onchange="TsalSample();" value="#ff9900"></center></td></tr>';
tsalmenu+='<tr><td><center><img src="graphic/unit/unit_sword.png"></td></center></td>';
tsalmenu+='<td><center><input class="tsal_color" id="xrwma_sword" type="color" onchange="TsalSample();" value="#33cc33"></center></td></tr>';
tsalmenu+='<tr><td><center><img src="graphic/unit/unit_axe.png"></td></center></td>';
tsalmenu+='<td><center><input class="tsal_color" id="xrwma_axe" type="color" onchange="TsalSample();" value="#ff9900"></center></td></tr>';
tsalmenu+='<tr><td><center><img src="graphic/unit/unit_archer.png"></td></center></td>';
tsalmenu+='<td><center><input class="tsal_color" id="xrwma_archer" type="color" onchange="TsalSample();" value="#ff9900"></center></td></tr>';
tsalmenu+='<tr><td><center><img src="graphic/unit/unit_spy.png"></td></center></td>';
tsalmenu+='<td><center><input class="tsal_color" id="xrwma_spy" type="color" onchange="TsalSample();" value="#3333cc"></center></td></tr>';
tsalmenu+='<tr><td><center><img src="graphic/unit/unit_light.png"></td></center></td>';
tsalmenu+='<td><center><input class="tsal_color" id="xrwma_light" type="color" onchange="TsalSample();" value="#000000"></center></td></tr>';
tsalmenu+='<tr><td><center><img src="graphic/unit/unit_heavy.png"></td></center></td>';
tsalmenu+='<td><center><input class="tsal_color" id="xrwma_heavy" type="color" onchange="TsalSample();" value="#cc33ff"></center></td></tr>';
tsalmenu+='<tr><td><center><img src="graphic/unit/unit_marcher.png"></td></center></td>';
tsalmenu+='<td><center><input class="tsal_color" id="xrwma_marcher" type="color" onchange="TsalSample();" value="#000000"></center></td></tr>';
tsalmenu+='<tr><td><center><img src="graphic/unit/unit_ram.png"></td></center></td>';
tsalmenu+='<td><center><input class="tsal_color" id="xrwma_ram" type="color" onchange="TsalSample();" value="#cc9900"></center></td></tr>';
tsalmenu+='<tr><td><center><img src="graphic/unit/unit_catapult.png"></td></center></td>';
tsalmenu+='<td><center><input class="tsal_color" id="xrwma_catapult" type="color" onchange="TsalSample();" value="#cc9900"></center></td></tr>';
tsalmenu+='<tr><td><center><img src="graphic/unit/unit_snob.png"></td></center></td>';
tsalmenu+='<td><center><input class="tsal_color" id="xrwma_snob" type="color" onchange="TsalSample();" value="#ff3300"></center></td></tr>';
tsalmenu+='<tr><td><center><img src="graphic/unit/unit_knight.png"></td></center></td>';
tsalmenu+='<td><center><input class="tsal_color" id="xrwma_knight" type="color" onchange="TsalSample();" value="#000000"></center></td></tr>';
tsalmenu+='</tbody></table><br><center><hr>';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalapply" value="'+tsalkapone_trans.buttons.tsal_apply+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalcount" value="'+tsalkapone_trans.buttons.tsal_count+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalsort" value="'+tsalkapone_trans.buttons.tsal_sort+'"><hr>';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalsave" value="'+tsalkapone_trans.buttons.save+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalreset" value="'+tsalkapone_trans.buttons.res_set+'">&emsp;';
tsalmenu+='<input type="button" class="btn tsalbutton" id="Tsalhide" value="'+tsalkapone_trans.buttons.hide+'"></center><br></div>';
document.getElementById('tsalresult').innerHTML = tsalmenu;

function TsalSample (){
var x1 ='<span class="inside"><img src="graphic/unit/tiny/ram.png"> '+tsalkapone_trans.general.ram+' - 500|500</span>&emsp;&emsp;';
var x2 ='<span class="inside"><img src="graphic/unit/tiny/axe.png"> '+tsalkapone_trans.general.axe+' - 501|501</span>&emsp;&emsp;';
var x3 ='<span class="inside"><img src="graphic/unit/tiny/snob.png"> '+tsalkapone_trans.general.noble+' - 502|500</span>';
var x4 ='<span class="inside"><img src="graphic/unit/tiny/sword.png"> '+tsalkapone_trans.general.sword+' - 502|501</span>&emsp;&emsp;';
var x5 ='<span class="inside"><img src="graphic/unit/tiny/light.png"> '+tsalkapone_trans.general.light+' - 502|502</span>&emsp;&emsp;';
var x6 ='<span class="inside"><img src="graphic/unit/tiny/spy.png"> '+tsalkapone_trans.general.spy+' - 501|502</span>';
document.getElementById('tsalkapone_sample').innerHTML='<center><b>'+x1+x2+x3+'<br>'+x4+x5+x6+'</b></center>';
var ram = document.getElementById("xrwma_ram").value;		
var axe = document.getElementById("xrwma_axe").value;
var snob =	document.getElementById("xrwma_snob").value;	
var light = document.getElementById("xrwma_light").value;	
var sword = document.getElementById("xrwma_sword").value;	
var spy = document.getElementById("xrwma_spy").value;		
									var g=document.getElementById('tsalkapone_sample');
      var name=g.getElementsByClassName('inside');
       name[0].setAttribute('style','color: '+ram+'');
	name[1].setAttribute('style','color: '+axe+'');
	name[2].setAttribute('style','color: '+snob+'');
	name[3].setAttribute('style','color: '+sword+'');
	name[4].setAttribute('style','color: '+light+'');
	name[5].setAttribute('style','color: '+spy+'');
}
TsalSample();

function saveConfig () {
		var rows = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_color');
		var options = new Array();
		for (var i=0; i<rows.length; i++) {
			options[i] = rows[i].value;			
		}
var	tsalkapone_color_settings = options;
		localStorage.setItem('tsalkapone_color_settings',JSON.stringify(tsalkapone_color_settings));
	}
	
	
	function loadConfig () {
		if (localStorage.getItem('tsalkapone_color_settings')) {
			var tsal_check = JSON.parse(localStorage.getItem('tsalkapone_color_settings'));
			var rows = document.getElementById('tsalkapone_config').getElementsByClassName('tsal_color');
		for (var i=0; i<rows.length; i++) {
			rows[i].value = tsal_check[i];			
		}
			return true;
		} else {
			return false;
		}
	}
	loadConfig ();


$("#Tsalreset").click(function(){ 
localStorage.removeItem("tsalkapone_color_settings"); 
UI.SuccessMessage('<span id=tsalkaponesuccesssave><b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></span><br><br>'+tsalkapone_trans.notes.res_set1+'', 3000);  
setTimeout(function(){ location.reload (); }, 4000);
	});
	$("#Tsalapply").click(function(){ fnColoreaOrdenes(); });
	$("#Tsalhide").click(function(){ document.getElementById('tsalresult').innerHTML=''; });
	$("#Tsalsave").click(function(){ saveConfig(); var tsalk_etiketa = localStorage.getItem('tsalkapone_color_settings'); console.log('\n\nTsalkapone ~ Color Settings:\n'+tsalk_etiketa);
UI.SuccessMessage('<span id=tsalkaponesuccesssave><b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></span><br><br>'+tsalkapone_trans.notes.save1+'', 3000);  
 });	

function filter_combine (){
		var attack_check = tsalk_trans.tw.attack;
var words_sel = attack_check;
		var words = words_sel.toLowerCase().split(" ");
		var table = document.getElementById('incomings_table');
		var ele;
		var row_count = 0;
		for (var r = 1; r < table.rows.length; r++)
		{
		    ele = table.rows[r].innerHTML.replace(/<[^>]+>/g,"");
		    var displayStyle = 'none';
		    for (var i = 0; i < words.length; i++)
                    {
                        if (ele.toLowerCase().indexOf(words[i]) >= 0)
			    displayStyle = '';
                        else
			{
			    displayStyle = 'none';
			    row_count++;
			    break;
			}
                    }
		    table.rows[r].style.display = displayStyle;}
	if (words.length >0)		
	{UI.ErrorMessage('<b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b><br><br>'+words.length+' '+tsalkapone_trans.notes.found+'', 3000);  }
 else	{UI.SuccessMessage('<b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b><br><br>'+tsalkapone_trans.notes.not_found+'', 3000);  }
 }
			
				$("#Tsalsort").click(function(){ filter_combine(); }); 
	
function fnColoreaOrdenes()
                                {
	var spear = document.getElementById("xrwma_spear").value;
var sword = document.getElementById("xrwma_sword").value;
var axe = document.getElementById("xrwma_axe").value;
var archer = document.getElementById("xrwma_archer").value;
var spy = document.getElementById("xrwma_spy").value;
var light = document.getElementById("xrwma_light").value;
var heavy = document.getElementById("xrwma_heavy").value;
var marcher = document.getElementById("xrwma_marcher").value;
var ram = document.getElementById("xrwma_ram").value;
var catapult = document.getElementById("xrwma_catapult").value;
var snob = document.getElementById("xrwma_snob").value;
var knight = document.getElementById("xrwma_knight").value;	
									var g=$('.quickedit').get(),f=0,n=g.length;
      for(;f<n;f++){var name=$.trim(g[f].getElementsByClassName('quickedit-content')[0].innerHTML);
                    var c=g[f];
								if(name.search("ram.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+spear+'')}
                else if(name.search("catapult.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+catapult+'')}
                    else if(name.search("spy.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+spy+'')}
                    else if(name.search("knight.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+knight+'')}
                    else if(name.search("light.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+light+'')}
                    else if(name.search("marcher.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+marcher+'')}
                    else if(name.search("heavy.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+heavy+'')}
                   
                    else if(name.search("axe.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+axe+'')}
                    else if(name.search("spear.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+spear+'')}
                    else if(name.search("archer.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+archer+'')}
                    else if(name.search("sword.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+sword+'')}
                    else if(name.search("snob.png")>-1){c.getElementsByTagName('a')[0].setAttribute('style','color: '+snob+'')}

					}}
				

				
				 $("#Tsalcount").click(function () {
                                

function AttackCounter(){
	try{
		var _name='Μετρητής εισερχόμενων επιθέσεων ανά χωριό';
		var _version=7.04;
		var _min_game_version=7.00;
		var _author={
			name:'Tsalkapone',
			email:'tsalkapone@hotmail.com'
		};
		var _debugID = _name.replace(/\s/g,'');
		var _debugEnabled=true;
		var _win=(window.main||self),$=_win.$;
		

	

		if($('#' + _debugID + '_done').length > 0){
			UI.ErrorMessage('<table class="vis" width="100%"><tr><th>Ειδοποίηση από τον Tsalkapone</th></tr></table> <br><br> To script υπολογισμού εισερχόμενων επιθέσεων ανά χωριό έχει ήδη ενεργοποιηθεί', 4000);
		}

		var _gameVersion = _win.game_data.version.match(/[\d|\.]+/g);
		_gameVersion = (_gameVersion?parseFloat(_gameVersion[1]):-1);

		/* HACK: fix null mode */
		if(!_win.game_data.mode){
			var vmode=$('#overview_menu td[class="selected"] a').attr('href');
			vmode=vmode?vmode.match(/mode\=(\w*)/i):null;
			_win.game_data.mode=vmode?vmode[1]:null;
		}
	
		var _worldConfig = $(fnAjax('/interface.php','GET',{'func':'get_config'},'xml',false)).find('config');
		var _unitConfig = $(fnAjax('/interface.php','GET',{'func':'get_unit_info'},'xml',false)).find('config');
/*		
		var _buildingConfig = $(fnAjax('/interface.php','GET',{'func':'get_building_info'},'xml',false)).find('config');
*/

		var _isPremium = ($('#quickbar_outer').length>0);
		var _hasChurch = (parseInt(_worldConfig.find('game church').text()||'0',10)>0);
		var _hasPaladin = (parseInt(_worldConfig.find('game knight').text()||'0',10)>0);
		var _hasArchers = (parseInt(_worldConfig.find('game archer').text()||'0',10)>0);
		var _hasMilitia = (_unitConfig.find('militia').length>0);
		var _hasVillageNotes = ($('[src*="note.png"],[class*="note-icon"]').length>0);

		if(!fnHasMinVersion(_min_game_version)){
			throw('Το συγκεκριμένο script απαιτεί έκδοση v'+_min_game_version.toFixed(2)+' ή μεγαλύτερη.\nΗ τρέχουσα έκδοση παιχνιδιού είναι η εξής: v'+_gameVersion.toFixed(2));
		}
		
		if(_win.game_data.mode != 'incomings'){
			throw("Tsalkapone. Μετρητής εισερχόμενων επιθέσεων ανά χωριό. </br> Το συγκεκριμένο script ενεργοποιείται από τη σελίδα Εισερχομένων");
		}

		return{
			execute:function(){fnQueryIncomingAttacks();}
		};
	}
	catch(objError){
		fnHandleError(objError);
	}

	function fnPrint(msg,id){
		if($('#' + _debugID).length <= 0){
			$('body').append('<div id="' + _debugID + '"></div>');
		}
	
		$('#' + _debugID).append('<span id="'+((typeof(id)=='undefined')?'':id)+'">'+msg+'</span><br/>');
	}

	function fnDebug(msg){
		if((typeof(_debugEnabled) != "undefined") && _debugEnabled){
			fnPrint(msg);
		}
	}

	/* TODO: possibly add a max_version parameter */
	function fnHasMinVersion(min_version){
		return (_gameVersion >= min_version);
	}

	function fnHandleError(objError){
		var errMsg=String(objError.message||objError||'');
		if(errMsg){
			fnPrint('ΣΦΑΛΜΑ: ' + errMsg);
			UI.ErrorMessage(errMsg, 5000);
		}
	}

	function fnAjax(url,method,params,type,isAsync){
		var error = null;
		var payload = null;

		$.ajax({
			'async':isAsync,
			'url':url,
			'data':params,
			'dataType':type,
			'type':String(method||'GET').toUpperCase(),
			'error':function(req,status,err){error='ajax: ' + status;},
			'success':function(data,status,req){payload=data;}
		});

		if(error){
			throw(error);
		}

		return payload;
	}

	function fnPrintVersion(){
		fnPrint('<span style="color:red;">Αντιγράψτε τα παρακάτω δεδομένα για να ζητήσετε βοήθεια:</span>');
		fnPrint("=========================");
		fnPrint(_author.name + "'s " + _name + ": v" + _version.toFixed(2));
		fnPrint("=========================");
		fnPrint("Λογαριασμός premium: "+(_isPremium?"Ενεργός":"Απενεργοποιημένος"));
		fnPrint("Εκκλησία : "+(_hasChurch?"Ενεργή":"Απενεργοποιημένη"));
		fnPrint("Paladin : "+(_hasPaladin?"Ενεργός":"Απενεργοποιημένος"));
		fnPrint("Τοξότες : "+(_hasArchers?"Ενεργοί":"Απενεργοποιημένοι"));
		fnPrint("Εθνοφρουρά: "+(_hasMilitia?"Ενεργή":"Απενεργοποιημένη"));
		fnPrint("Σημειωματάριο  : "+(_hasVillageNotes?"Ενεργό":"Απενεργοποιημένο"));
		fnPrint("Επιτηρητής : "+(_win.location.href.match(/t\=\d+/i)?"Ενεργός":"Απενεργοποιημένος"));
		fnPrint("=========================");
		fnPrint("Έκδοση: "+_win.game_data.version);
		fnPrint("Κόσμος  : "+_win.game_data.world);
		fnPrint("Τοποθεσία σελίδας : : "+_win.game_data.screen);
		fnPrint("Κατεύθυνση σελίδας :   : "+_win.game_data.mode);
		fnPrint("URL    : "+_win.location.href);
		fnPrint("Έκδοση Browser: "+navigator.userAgent);
		fnPrint("=========================");
	}

	function fnQueryIncomingAttacks(){
		

		try{	
			var summary = [];
			
			/* Count incoming attacks for each village */
			$('#incomings_table tr:has(img[src*="/attack.png"]) td:nth-child(2)').each(function(i,e){
				var coords=$(e).text().match(/\d+\|\d+/g);
				coords = coords?coords[coords.length - 1]:null;
				if(typeof(summary[coords])=="undefined")
					summary[coords] = {tally:0,html:$(e).closest('tr').find('td:eq(1)').html()};
					
				summary[coords].tally++;
			});
			
			$('#incomings_table tr:has(img[src*="/attack.png"]) td:nth-child(2)').each(function(i,e){
				var coords=$(e).text().match(/\d+\|\d+/g);
				coords = coords?coords[coords.length - 1]:null;
				var x = document.getElementById("incomings_table").rows.length;
				var y=x-2;
				
				/* Inject the attack tally */
				var cell=$(e).closest('tr').find('td:eq(0)');
				var tsal_number = document.getElementsByClassName('tsal_number');
				if (tsal_number.length < y) {
				if (summary[coords].tally < 4) {
				cell.html('<b><font class="tsal_number" color="green">(' + summary[coords].tally + ')</font></b> ' + cell.html());
				}
			else if (summary[coords].tally >= 4 && summary[coords].tally < 10){
			cell.html('<b><font class="tsal_number" color="blue">(' + summary[coords].tally + ')</font></b> ' + cell.html());
			}
		else if (summary[coords].tally >= 10 && summary[coords].tally < 20){
			cell.html('<b><font class="tsal_number" color="darkorange">(' + summary[coords].tally + ')</font></b> ' + cell.html());
			}
			else {
			cell.html('<b><font class="tsal_number" color="red">(' + summary[coords].tally + ')</font></b> ' + cell.html());
			}
				}
			});
		
			/* Convert Associative Array to Indexed Array for sorting */
			var count=0;
			var attackSummary=[];
			for(var coords in summary){
				if(summary.hasOwnProperty(coords))
					attackSummary[count++]=summary[coords];
			}
		
			/* Sort the Attack Summary in descending order by tally */
			attackSummary.sort(function(a,b){return b.tally - a.tally;});

			/* Display results in a Table */
			if (attackSummary.length>0){
var  tsalmenu2='<div id="tsalkaponemagicscripttable" class="target-select clearfix vis"><h4 height="20px;">';
tsalmenu2+='<font color="maroon">Tsalkapone. '+tsalkapone_trans.general.inc_count+'</font></h4>';
tsalmenu2+='<table class="vis" width="100%"><tbody><tr><th>'+tsalkapone_trans.general.inc_vil+'</th><th>'+tsalkapone_trans.general.inc_co+'</th></tr>';
for(var ii=0; ii < attackSummary.length; ii++){
tsalmenu2+='<tr><td>'+attackSummary[ii].html+'</td><td><font color="red"><b>'+attackSummary[ii].tally+'</b></font></td></tr>';
	 }	
			tsalmenu2+='</tbody></table></div><br><hr>';
if (!document.getElementById('tsalkaponemagicscripttable')){				
$('#tsalkapone_div').append(tsalmenu2);}
			}
else {UI.ErrorMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> '+tsalkapone_trans.notes.no_inc+'.', 5000);}
  			

		}
		catch(objError){
			fnHandleError(objError);
		}
	}
}


if(typeof(scriptOb)=="undefined"){
	var scriptObj = new AttackCounter;
	scriptObj.execute();
}

				            });
				
});



/*==== register ====*/
var script = {
	scriptname: 'Central Incomings Intelligence',
	version: '1.0',
	author: 'Tsalkapone',
	email: 'tsalkapone@hotmail.com',
	broken: false
};
$.post(ScriptAPI.url,script);

 }