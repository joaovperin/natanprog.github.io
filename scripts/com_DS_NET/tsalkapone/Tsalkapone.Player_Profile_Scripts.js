 /*
		scriptname:	Tribe & Player Stats
		version:	1.0.0
		created: June 30, 2016
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
 
 var get_lang = localStorage.getItem("tribe_player_stats_lang");
    var lang="";
    if (get_lang === null) {lang = "english";}
    else { lang = ""+get_lang+"";}
    var supported_languages =["greek","english"];
	var tsal_market=game_data.market;
    var lang_check = supported_languages.indexOf(lang);
    if (lang_check < 0) {UI.ErrorMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> The selected language is not supported. Please select one of the supported languages.', 5000);}
    else {
		var tsalk_trans = (function() {
				    var tsalk_trans = {};
					tsalk_trans.en={
						tw:{
		leftover:"Display all leftover",
		vil:"Villages",
		points:"Points",
		od:"Opponents defeated",
		tribe:"Tribe",
	},
					};
					tsalk_trans.gr={
						tw:{
		leftover:"Εμφάνιση όλων των εναπομείναντων",
		vil:"Χωριά",
		points:"Πόντοι",
		od:"Νικημένοι αντίπαλοι",
		tribe:"Φυλή",
	},	
					};
	tsalk_trans.si={
						tw:{
	leftover:"Prikaži vse ostale",
vil:"Vasi",
points:"Točke",
od:"Premagani nasprotniki",
tribe:"Pleme",
						},
					};
					
		 return tsalk_trans[tsal_market];			
		}());
 var tsalkapone_trans = (function() {
				    var tsalkapone_trans = {};
    tsalkapone_trans.english= { 
	 general:{ 
	 script:"Tribe & Player Stats",
	 notification:"Notification from",
         selected_one:"Current selected language",
         available:"Available languages",
		 button_list:"Buttons List",
		 menu:"Extracted Villages",
		 lang_sel:"Click to change the selected language",		
		message_no:"No",
		message_yes1:"Go to players' rankings",
		message_yes2:"Go to tribes' rankings",
		message_1:"This script is activated on a player's profile, a tribe's profile, or a tribe's member list.",
		message_2:" Do you want to automatically assign your location to the world's rankings?",
		comm:"Feel free to send any message regarding script bugs or proposing ideas to",
		scripts:"Generate various scripts",
		plan:"Generate customizable attack plan",
		plano:"Plan for",
		lall:"All villages",
		diag:"Diagram",
		sunolo:"Extracted villages",
		forum_sc1:"Fake Script No1 - Random Coordinate",
forum_sc2:"Fake Script No2 - Consecutive Coordinates",
forum_sc3:"Fake Script No3 - Random Coordinate, Ram & Catapult Only",
forum_1:"Press [b]T[/b] on your keyboard after you activate the script for more info regarding its variables and settings.",
forum_2:"Script Code",
script_title:"Available scripts for",
script_title1:"Fake Script",
script_title2:"Nuke Script",
script_title3:"Scripts for Mail or Forum post",
script_info:"The coordinates used as targets in the following scripts are the ones displayed on the coords' extractor area",
order:"Vertical/Horizontal order",
plano1:"Hide settings for",
plan1:"Add color and [b] tag to any numbering",
plan2:"Generate fake scripts",
plan3:"Include table design",
plan4:"Include village list",
plan5:"Tribe stats & map",
plan6:"Player stats & graphs",
plan7:"Extra info",
plan8:"Main heading",
plan9:"Add [claim] tag in every coordinate in the village list",
plan10:"Add <b>---> [player][/player]</b> text in every coordinate in the village list",
plan_set:"Plan Settings",
des_tab:"Click to show/hide table designer",
graphs:"Click to show/hide graphs & stats",
graphs1:"Click to show/hide tribe's graphs & stats",
tsal_vil:"Click to show/hide villages' list",
tab_ex:"Table Code",
opt:"Available Options",
opt_info:"Description",
opt_info1:"Define the columns of the table and their context's data.<br>You may also add color for each heading's title.",
opt_info2:"Define the method according to which rows of the villages' list will be included in the designed table.",
active:"Activate",
opt1:"Add numbering",
opt2:"Add [claim] tag on coordinates",
opt3:"Add village's points",
opt4:"Add a noble planner button to each row",
opt5:"Add new column",
opt6:"Method",
opt7:"Select villages",
col1:"Points",
col2:"Noble Planner",
col3:"Villages",
col4:"Numbering",
color:"Heading color",
sel1:"All rows",
sel2:"Up to row number",
sel3:"Depended on points",
sel4:"All villages",
sel5:"Select extracted villages",
sel6:"Select villages depended on points",
vil_show:"villages will be included in the table",
vil_show2:"select the desired group of extracted villages",
catalog1:"Available Graphs",
catalog2:"Available Stats",
stats1:"Go to TW~Stats profile",
stats2:"Conquer Periods",
stats3:"Points & OD history",
stats4:"Conquers",
row_num:"Row number",
pontoi_min:"Minimum points",
pontoi_max:"Maximum points",
table_designer:"Table designer",
act_info1:"Add [player] tag in every row of the particular column.",
act_info2:"Add [ally] tag in every row of the particular column.",
active1:"[player] tag",
active2:"[ally] tag",
active3:"Title",
act_info3:"Insert a heading title for the particular column.",
act_info4:"The following code is compatible with tribal forums and notebook.",
act_info5:"Define the method of selecting coordinates to be included in the plan's villages' list.",
tit:"Title",
plano_per:"Plan's Code",
p_stats:"Player's Stats",
dia_stats:"Stats & Graphs",
diag:"Graphs",
d_gen:"General Stats",
d_oda:"ODA Graph",
d_odd:"ODD Graph",
d_points:"Points Graph",
d_vils:"Villages Graph",
d_stats:"Stats",
p_points:"Points",
p_od:"OD points",
plano_info1:"Stats Type",
plano_info2:"Link",
plano_info3:"TW~Stats profile",
plano_info4:"Conquer periods",
plano_info5:"Activity history",
plano_info6:"Conquer history",
t_stats:"Tribe's Stats",
p_tribe:"Tribe",
no_tribe:"No tribe",
plano_info7:"Map",
claim_col:"Reservation",
can_col:"Cancel",
tsal_claim:"Click to add/remove reservation status columns to the villages' list",
p_vils:"Villages list",
noble_pl:"Noble Planner",
tab_spoiler:"Villages Table",
ex_h1:"Heading title",
ex_t1:"Plan Information",
ex_t:"Title",
ex_k:"Text",
ex_c:"Title color",
ex_h2:"Additional text",
ex_t2:"Landing period of attacks",
ex_t3:"Plan's goals",
ex_t4:"Notes",
ex_ex:"Activate to customize the available options",
big_k:"Claim the villages you want to conquer by writing their coordinates or their number in the list",
dis_info:"You need to activate the <b>village list</b> to enable this option",
dis_info1:"Activating this option the table you generated using the <b>Table Designer</b> will be included in the code.<br><br> In case you haven't generated any table an empty spoiler will be included in the code.",
all_show:"Show all villages",
con_show:"Show the villages of the continent",
attention:"ATTENTION: You are not allowed to post any text that contains more than 1000 <b>]</b> (brackets)",
t_members:"Members Graph",
stats5:"Conquer Stats",
stats6:"Members' Changes",
n1:"Points Graph",
n2:"Villages Graph",
n3:"ODA Graph",
n4:"ODD Graph",
n5:"Define graphs",
ex_gc:"Rows' text's color",
data_con:"Customizable options",
tab_data:"Insert member's table data",
plus_data:"Insert additional columns",
tr_data:"Insert a tribe's tag in every row of this column",
pl_data:"Insert a player's name in every row of this column",
tab1:"Member's name",
tab2:"Rank in tribe",
tab3:"Points",
tab4:"Global rank",
tab5:"Member's villages",
tab6:"Insert a column with the [ally] tag in every row",
tab7:"Insert a column with the [player] tag in every row",
tab8:"Add more columns",
plithos:"Amount",
me_tab:"Design table for a tribe's members",
gr_text:"Insert text in every row",
tsal1:"Player",
tsal2:"Rank",
tsal3:"Points",
tsal4:"Global rank",
tsal5:"Villages",
tsal6:"Tribe",
tsal7:"Tribe's tag",
tsal8:"Player",
tsal9:"Player's name",
tsal10:"Heading",
					},
	buttons:{
		lang_open:"Open language selection",
              lang_close:"Close language selection",
		save:"Save Settings",
		hide:"Hide Settings",
		gen_plano:"Generate plan",
		gr_open:"Show Graphs & Stats",
		gr_close:"Hide Graphs & Stats",
		des_open:"Open Designer",
		des_close:"Close Designer",
		vil_open:"Show list",
		vil_close:"Hide list",
		tab_gen:"Generate table code",
		claim_open:"Add columns",
		claim_close:"Remove columns",
		tab_des:"Design table",
	},
	notes:{
		activated:"The script Tribe & Player Stats is already active",
		save:"Your settings have been successfully saved.",
		},
};
tsalkapone_trans.greek= { 
	 general:{ 
	 script:"Εργαλεία Πληροφοριών Εισερχομένων",
	 notification:"Ειδοποίηση από τον",
            selected_one:"Ενεργή γλώσσα",
            available:"Διαθέσιμες γλώσσες",
			button_list:"Πίνακας πλήκτρων",
			menu:"Εξαχθέντα Χωριά",
			lang_sel:"Επιλέξτε για να αλλάξετε την επιλεγμένη γλώσσσα",
			message_no:"Όχι",
		message_yes1:"Μετάβαση στη κατάταξη παικτών",
		message_yes2:"Μετάβαση στη κατάταξη φυλών",
		message_1:"Το συγκεκριμένο script ενεργοποιείται από το προφίλ ενός παίκτη, το προφίλ μιας φυλής ή τη λίστα μελών μιας φυλής.",
		message_2:"Επιθυμείτε αυτόματη ανακατεύθυνση σε μια από τις ακόλουθες κατατάξεις του κόσμου;",
		comm:"Επικοινωνήστε ανά πάσα στιγμή για οποιαδήποτε ιδέα ή πρόταση σχετικά με τα scripts με τον",
		scripts:"Παραγωγή fake scripts",
		plan:"Δημιουργία πλάνου",
		plano:"Πλάνο για",
		lall:"Όλα τα χωριά",
		diag:"Διάγραμμα",
		sunolo:"Σύνολο εξαχθέντων χωριών",
		forum_sc1:"Fake Script No1 - Τυχαία επιλογή συντεταγμένης",
forum_sc2:"Fake Script No2 - Διαδοχική επιλογή συντεταγμένης",
forum_sc3:"Fake Script No3 - Τυχαία επιλογή, μόνο κριός ή καταπέλτης",
forum_1:"Επιλέξτε [b]T[/b] στο πληκτρολόγιό σας, εφόσον ενεργοποιήσετε το script για να λάβετε περισσότερες πληροφορίες για τις μεταβλητές του και πως μπορείτε να το ρυθμίσετε κατά βούληση",
forum_2:"Κώδικας Script",
script_title:"Διαθέσιμα scripts για το λογαριασμό",
script_title1:"Fake Script",
script_title2:"Nuke Script",
script_title3:"Scripts για δημοσίευση σε ταχυδρομείο ή φυλετικό φόρουμ",
script_info:"Οι συντεταγμένες που αξιοποιούνται ως στόχοι στα ακόλουθα scripts είναι αυτές που εμφανίζονται στο πλαίσιο εξαγωγής συντεταγμένων",
order:"Κάθετη/Οριζόντια διάταξη",
plano1:"Απόκρυψη πλάνου για",
plan1:"Προσθήκη έντονης γραφής και χρώματος σε κάθε αρίθμηση",
plan2:"Παραγωγή fake scripts",
plan3:"Εισαγωγή σχεδιασμένου πίνακα",
plan4:"Εισαγωγή λίστας χωριών",
plan5:"Στατιστικά φυλής και χάρτης",
plan6:"Στατιστικά παίκτη και διαγράμματα",
plan7:"Πρόσθετες πληροφορίες",
plan8:"Κύρια κεφαλίδα",
plan9:"Προσθήκη ετικέτας [claim] σε κάθε συντεταγμένη στη λίστα χωριών",
plan10:"Προσθήκη του κειμένου <b>---> [player][/player]</b> σε κάθε συντεταγμένη στη λίστα χωριών",
plan_set:"Ρυθμίσεις Πλάνου",
des_tab:"Επιλέξτε για σχεδιασμό πίνακα",
graphs:"Eμφάνιση/απόκρυψη στατιστικών & διαγραμμάτων",
graphs1:"Eμφάνιση/απόκρυψη στατιστικών & διαγραμμάτων της φυλής",
tsal_vil:"Eμφάνιση/απόκρυψη της λίστας χωριών",
tab_ex:"Κώδικας Πίνακα",
opt:"Διαθέσιμες Επιλογές",
opt_info:"Περιγραφή",
opt_info1:"Ορίστε τις στήλες του πίνακα και το περιεχόμενο των γραμμών τους.<br>Μπορείτε, επίσης, να προσθέτε χρώμα στο τίτλο κάθε κεφαλίδας.",
opt_info2:"Ορίστε τη μέθοδο επιλογής των γραμμών της λίστας των χωριών που επιθυμείτε να εισάγετε στο πίνακα.",
active:"Ενεργοποίηση",
opt1:"Προσθήκη αρίθμησης",
opt2:"Προσθήκη της ετικέτας [claim] σε κάθε συντεταγμένη",
opt3:"Προσθήκη των πόντων κάθε χωριού",
opt4:"Προσθήκη πλήκτρου πλάνου διεκδίκησης σε κάθε σειρά",
opt5:"Προσθήκη νέας στήλης",
opt6:"Μέθοδος",
opt7:"Επιλογή χωριών",
col1:"Πόντοι",
col2:"Πλάνο",
col3:"Χωριά",
col4:"Αρίθμηση",
color:"Χρώμα κεφαλίδας",
sel1:"Όλες οι γραμμές",
sel2:"Μέχρι τη γραμμή",
sel3:"Επιλογή βάση πόντων",
sel4:"Όλα τα χωριά",
sel5:"Επιλογή εξαχθέντων χωριών",
sel6:"Επιλογή χωριών βάση πόντων",
vil_show:"χωριά θα συμπεριληφθούν στο πίνακα",
vil_show2:"επιλέξτε την επιθυμητή ομάδα χωριών",
catalog1:"Διαθέσιμα διαγράμματα",
catalog2:"Διαθέσιμα στατιστικά",
stats1:"Μετάβαση στο προφίλ του TW~Stats",
stats2:"Περίοδοι Κατακτήσεων",
stats3:"Διακύμανση πόντων και OD",
stats4:"Κατακτήσεις",
row_num:"Αριθμός γραμμής",
pontoi_min:"Ελάχιστοι πόντοι",
pontoi_max:"Μέγιστοι πόντοι",
table_designer:"Σχεδιασμός Πίνακα",
act_info1:"Προσθήκη ετικέτας [player] σε κάθε γραμμή της συγκεκριμένης στήλης.",
act_info2:"Προσθήκη ετικέτας [ally] σε κάθε γραμμή της συγκεκριμένης στήλης.",
active1:"ετικέτα [player]",
active2:"ετικέτα [ally]",
active3:"Τίτλος",
act_info3:"Εισάγετε ένα τίτλο κεφαλίδας για τη συγκεκριμένη στήλη.",
act_info4:"Ο ακόλουθος πίνακας είναι συμβατός με φυλετικά φόρουμ και με το σημειωματάριο.",
act_info5:"Επιλέξτε τη μέθοδο επιλογής συντεταγμένων που θα συμπεριληφθούν στη λίστα των χωριών του πλάνου.",
tit:"Τίτλος",
plano_per:"Κώδικας Πλάνου",
p_stats:"Στατιστικά παίκτη",
dia_stats:"Στατιστικά & Διαγράμματα",
diag:"Διαγράμματα",
d_gen:"Γενικά στατιστικά",
d_oda:"Διάγραμμα ODA",
d_odd:"Διάγραμμα ODD",
d_points:"Διάγραμμα πόντων",
d_vils:"Διάγραμμα χωριών",
d_stats:"Στατιστικά",
p_points:"Πόντοι",
p_od:"OD μονάδες",
plano_info1:"Είδος στατιστικού",
plano_info2:"Σύνδεσμος",
plano_info3:"TW~Stats προφίλ",
plano_info4:"Περίοδοι κατακτήσεων",
plano_info5:"Ιστορικό δραστηριότητας",
plano_info6:"Ιστορικό κατακτήσεων",
t_stats:"Στατιστικά φυλής",
p_tribe:"Φυλή",
no_tribe:"Χωρίς φυλή",
plano_info7:"Χάρτης",
claim_col:"Κατοχύρωση",
can_col:"Ακύρωση",
tsal_claim:"Προσθήκη/διαγραφή στηλών κατοχύρωσης στη λίστα των χωριών",
p_vils:"Λίστα χωριών παίκτη",
noble_pl:"Πλάνο διεκδικήσεων",
tab_spoiler:"Πίνακας χωριών",
ex_h1:"Τίτλος κεφαλίδας",
ex_t1:"Λεπτομέρειες πλάνου",
ex_t:"Τίτλος",
ex_k:"Κείμενο",
ex_c:"Χρώμα τίτλου",
ex_h2:"Πρόσθετος τίτλος",
ex_t2:"Χρονική περίοδος άφιξης επιθέσεων",
ex_t3:"Στόχοι πλάνου",
ex_t4:"Σημειώσεις",
ex_ex:"Ενεργοποιήστε για να ρυθμίσετε τις διαθέσιμες επιλογές",
big_k:"Δηλώστε το χωριό(-ά) που επιθυμείτε να κατακτήσετε αναγράφοντας τις συντεταγμένες ή τον αριθμό του χωριού στη λίστα και δίπλα το όνομά σας",
dis_info:"Πρέπει να ενεργοποιείστε την επιλογή <b>λίστα χωριών</b> για να ενεργοποιηθεί η συγκεκριμένη επιλογή",
dis_info1:"Ο πίνακας που θα εισαχθεί, ενεργοποιώντας τη συγκεκριμένη επιλογή, θα είναι αυτός που σχεδιάσατε με τη ρύθμιση σχεδιασμού πίνακα. <br><br>Αν δεν έχετε σχεδιάσει πίνακα, ενεργοποιώντας τη συγκεκριμένη ρύθμιση θα εισαχθεί ένα κενό spoiler στο κώδικα.",
all_show:"Εμφάνιση όλων των χωριών",
con_show:"Εμφάνιση των χωριών της Ηπείρου",
attention:"ΠΡΟΣΟΧΗ: Δεν επιτρέπεται να δημοσιεύσετε οποιοδήποτε κείμενο που περιλαμβάνει περισσότερους από 1000 <b>]</b> χαρακτήρες",
t_members:"Διάγραμμα Μέλη",
stats5:"Στατιστικά Κατακτήσεων",
stats6:"Αλλαγές Μελών",
n1:"Διάγραμμα πόντων",
n2:"Διάγραμμα χωριών",
n3:"Διάγραμμα ODA",
n4:"Διάγραμμα ODD",
n5:"Καθορισμός διαγραμμάτων",
ex_gc:"Χρώμα κειμένου γραμμών",
data_con:"Ρυθμίσεις δεδομένων",
tab_data:"Εισαγωγή δεδομένων από το πίνακα μελών",
plus_data:"Εισαγωγή επιπρόσθετων δεδομένων",
tr_data:"Εισαγωγή μιας ετικέτας φυλής σε κάθε γραμμή της συγκεκριμένης στήλης",
pl_data:"Εισαγωγή ενός ονόματος παίκτη σε κάθε γραμμή της συγκεκριμένης στήλης",
tab1:"Όνομα παίκτη",
tab2:"Κατάταξη στη φυλή",
tab3:"Πόντοι",
tab4:"Παγκόσμια κατάταξη",
tab5:"Χωριά παίκτη",
tab6:"Εισαγωγή στήλης που περιλαμβάνει την ετικέτα [ally] σε κάθε σειρά",
tab7:"Εισαγωγή στήλης που περιλαμβάνει την ετικέτα [player] σε κάθε σειρά",
tab8:"Προσθήκη επιπλέον στηλών",
plithos:"Πλήθος",
me_tab:"Σχεδιασμός πίνακα μελών φυλής",
gr_text:"Εισαγωγή κειμένου σε κάθε γραμμή",
tsal1:"Παίκτης",
tsal2:"Θέση",
tsal3:"Πόντοι",
tsal4:"Κατάταξη",
tsal5:"Χωριά",
tsal6:"Φυλή",
tsal7:"Ετικέτα φυλής",
tsal8:"Παίκτης",
tsal9:"Όνομα παίκτη",
tsal10:"Τίτλος",
				},
	buttons:{		
			  lang_open:"Άνοιγμα επιλογής γλώσσας",
              lang_close:"Κλείσιμο επιλογής γλώσσας",
		save:"Αποθήκευση Ρυθμίσεων",
		hide:"Απόκρυψη Ρυθμίσεων",
		gen_plano:"Δημιουργία πλάνου",
		gr_open:"Εμφάνιση στατιστικών",
		gr_close:"Απόκρυψη στατιστικών",
		des_open:"Εμφάνιση σχεδιασμού",
		des_close:"Απόκρυψη σχεδιασμού",
		vil_open:"Εμφάνιση λίστας",
		vil_close:"Απόκρυψη λίστας",
		tab_gen:"Παραγωγή κώδικα πίνακα",
		claim_open:"Προσθήκη",
		claim_close:"Διαγραφή",
		tab_des:"Σχεδιασμός πίνακα",
	},
	notes:{
		activated:"Το script Εργαλεία Πληροφοριών Εισερχομένων έχει ήδη ενεργοποιηθεί",
		save:"Οι επιλεγμένες ρυθμίσεις αποθηκεύτηκαν επιτυχώς.",
	},
};
    return tsalkapone_trans[lang];
    }());
	
var Tsalactive = location.href.indexOf('info_ally') > -1;
var Tsalactive1 = location.href.indexOf('info_player') > -1;
var Tsalactive2 = location.href.indexOf('info_member') > -1;
			if (!Tsalactive && !Tsalactive1 && !Tsalactive2) {
				var contact_url = "https://forum.tribalwars.net/index.php?members/tsalkapone.114063/";
	   var content = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="darkgreen">Tsalkapone. '+tsalkapone_trans.general.script+'</font></u></center></h2>' +
'<hr><p><center><font color=maroon><b>'+tsalkapone_trans.general.message_1+'</b></font></center></p>' +
'<p><center><font color=maroon><b>'+tsalkapone_trans.general.message_2+'</b></font></center></p>' +
'<br><br><center><input type="button" class="btn evt-confirm-btn btn-confirm-yes" id="go_man1" value="'+tsalkapone_trans.general.message_yes1+'">&emsp;' +
'<input type="button" class="btn evt-confirm-btn btn-confirm-yes" id="go_man2" value="'+tsalkapone_trans.general.message_yes2+'">&emsp;' +
'<input type="button" class="btn evt-cancel-btn btn-confirm-no" id="close_this" value="'+tsalkapone_trans.general.message_no+'"></center>'+ 
'<br><br><hr><center><img class="tooltip-delayed" title="<font color=darkgreen>Tsalkapone. '+tsalkapone_trans.general.script+'</font>" src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg" style="cursor:help; position: relative"></center><br><center><p>'+tsalkapone_trans.general.comm+' <a href="'+contact_url+'" title="Tsalkapone profile" target="_blank">Tsalkapone</a>.</p></center>' +
'</div>';            
Dialog.show('tribe_player_stats_intro', content);
$("#go_man1").click(function () { window.location.assign(game_data.link_base_pure+"ranking&mode=player&rank=1");});   
$("#go_man2").click(function () { window.location.assign(game_data.link_base_pure+"ranking&mode=ally&rank=1");}); 
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
var tsalscript='<script type="text/javascript">function tsal_align () {tsalkapone();}';
tsalscript+='function tsal_select() { var x=document.getElementById("tsal_plithos").value; var y1 = document.getElementById("sel1"); var y2 = document.getElementById("sel2"); var y3 = document.getElementById("sel3");';
tsalscript+='if (x=="0") {y1.style.display=""; y2.style.display="none"; y3.style.display="none";} if (x=="1") {y1.style.display="none"; y2.style.display=""; y3.style.display="none";} if (x=="2") {y1.style.display="none"; y2.style.display="none"; y3.style.display="";} }';
tsalscript+='function tsal_select1() { var x=document.getElementById("tsal_plithos1").value; var y1 = document.getElementById("sel4"); var y2 = document.getElementById("sel5"); var y3 = document.getElementById("sel6");';
tsalscript+='if (x=="0") {y1.style.display=""; y2.style.display="none"; y3.style.display="none";} if (x=="1") {y1.style.display="none"; y2.style.display=""; y3.style.display="none";} if (x=="2") {y1.style.display="none"; y2.style.display="none"; y3.style.display="";} }';
tsalscript+='function tsal_check(){var x1 = document.getElementById("tsal_act1"); var x2= document.getElementById("tsal_act2"); if (x1.checked==true) {x2.disabled=true;} else {x2.disabled=false;} if (x2.checked==true) {x1.disabled=true;} else {x1.disabled=false;}}';
tsalscript+='function tsal_extra(){var x = document.getElementById("plan7"); var y=document.getElementById("tsal_extra"); var z=document.getElementById("tsal_extra1");if (x.checked){y.style.display="";z.style.display="none";} else {y.style.display="none";z.style.display="";}}'
tsalscript+='function tsal_disable(){var x = document.getElementById("plan4"); var y=document.getElementById("plan9"); var z=document.getElementById("plan10");if (x.checked){y.disabled=false;z.disabled=false;} else {y.disabled=true;z.disabled=true;}}'
tsalscript+='</script>';

$("head").append(tsaldiamorfwsi+tsalbody+tsalscript);     
   

   if (Tsalactive1) {
										
 var pageurltsal = window.location.href;
 var pageurl1 = pageurltsal.split("=");
 var pageurl2; var pageid;
 if (pageurl1[3] != undefined) {
 pageurl2 = pageurl1[3].split("#");
pageid = pageurl2[0];
 }
 else {
	 pageid = game_data.player.id;
 }
    var pageurltsal1 = pageurltsal.split("//");
    var pageurltsal2 = pageurltsal1[1].split("/");
    var pageurltsal3 = pageurltsal1[1].split(".");
    var pageurltsal5 = pageurltsal3[2].split("/");
    var pageurltsal4 = pageurltsal3[1]+"."+pageurltsal5[0];
	var tsal_market = game_data.market;
	var main_url = pageurltsal1[0]+"//"+pageurltsal2[0]+game_data.link_base_pure;
	var urlPrefix = "";
 if (game_data.market == "en") {
                urlPrefix = "";
            } 

            else {
                urlPrefix = '.'+game_data.market;
            }
	
 var graphs ='<table id="tsalkaponemagic" width="100%" class="vis"><tbody><tr><th colspan="2"><center><font color="blue"><b>'+tsalkapone_trans.general.catalog1+'</b></font></center></th></tr>';
graphs+='<tr><td><center><div id="spoiler"><input type="button" class="btn tsalbutton" value="TribalWarsMap.com" onclick="toggle_spoiler(this)"><div><span style="display:none">';
graphs+='<img src="http://'+pageurltsal3[0]+'.tribalwarsmap.com/'+game_data.market+'/graph/player/'+pageid+'" title="TribalWarsMap.com"></span></div></div></center></td></tr><tr><td><center><div id="spoiler">';
graphs+='<input type="button" class="btn tsalbutton" value="'+tsalkapone_trans.general.d_oda+'" onclick="toggle_spoiler(this)"><div>';
graphs+='<span style="display:none"><img src="http://'+pageurltsal3[0]+'.tribalwarsmap.com/'+game_data.market+'/graph/oda_player/'+pageid+'" title="TribalWarsMap.com"></span></div></div></center></td></tr><tr><td><center><div id="spoiler">';
graphs+='<input type="button" class="btn tsalbutton" value="'+tsalkapone_trans.general.d_odd+'" onclick="toggle_spoiler(this)"><div><span style="display:none">';
graphs+='<img src="http://'+pageurltsal3[0]+'.tribalwarsmap.com/'+game_data.market+'/graph/odd_player/'+pageid+'" title="TribalWarsMap.com"></span></div></div></td></tr>';
graphs+='<tr><th><center><font color="blue"><b>'+tsalkapone_trans.general.catalog2+'</b></font></center></th></tr>';
graphs+='<tr><td><a href="http://www' + urlPrefix + '.twstats.com/'+pageurltsal3[0]+'/index.php?page=player&id='+pageid+'&utm_source=en&utm_medium=player&utm_campaign=dsref" target="_blank"><img src="graphic/welcome/ext.png"> '+tsalkapone_trans.general.stats1+'</a></td></tr>';
graphs+='<tr><td><a href="http://www' + urlPrefix + '.twstats.com/'+pageurltsal3[0]+'/index.php?page=player&id='+pageid+'&mode=conquer_periods" target="_blank"><img src="graphic/welcome/ext.png"> '+tsalkapone_trans.general.stats2+'</a></td></tr>';
graphs+='<tr><td><a href="http://www' + urlPrefix + '.twstats.com/'+pageurltsal3[0]+'/index.php?page=player&id='+pageid+'&mode=history" target="_blank"><img src="graphic/welcome/ext.png"> '+tsalkapone_trans.general.stats3+'</a></td></tr>';
graphs+='<tr><td><a href="http://www' + urlPrefix + '.twstats.com/'+pageurltsal3[0]+'/index.php?page=player&mode=conquers&id='+pageid+'" target="_blank"><img src="graphic/welcome/ext.png"> '+tsalkapone_trans.general.stats4+'</a></td></tr>';
graphs+='</tbody></table>';


										
  var villageTable = $("th:contains('"+tsalk_trans.tw.vil+"')").parent().parent();     
     var playerTable = villageTable.parent().parent();
      var thePlayer1 = playerTable.find("th:first").text().replace(/\s+/, "");
	  var thePlayer = thePlayer1.trim();
	  var playerId;
	  var Tsalactive3 = location.href.indexOf('id=') > -1;
	  if (Tsalactive3){
		playerId = document.URL.match(/id\=(\d+)/i)[1];  
	  }
     else { playerId = game_data.player.id;}
 var server = document.URL.match(/\/\/([a-z0-9]{1,5})\./i)[1];
            
            var theTribeTd = playerTable.find("td:contains('"+tsalk_trans.tw.tribe+":')").next("td");

            var tribeId = 0;
            var theTribe = theTribeTd.html().match(/.*>(.*)<\/a>/i);
            if (theTribe) {
                theTribe = theTribe[1];
                tribeId = parseInt(theTribeTd.html().match(/id\=(\d+)/i)[1], 10);
}
var thePoints = playerTable.find("td:contains('"+tsalk_trans.tw.points+":')").next("td").text();
            var OD = playerTable.find("td:contains('"+tsalk_trans.tw.od+":')").next("td").text();         

	var lexpand=tsalk_trans.tw.leftover;

	



function tsalscripts() {

var tsal="";

var tsalk= document.getElementById('taCoords').value;
var tsal3in="[spoiler="+tsalkapone_trans.general.forum_sc1+"]\n"+tsalkapone_trans.general.forum_1+"\n\n[spoiler="+tsalkapone_trans.general.forum_2+"][code]javascript:var Tsalkapone_coords='" +tsalk+ "';var Tsalkapone_scouts=5;var Tsalkapone_units_order={ram:1,catapult:1,sword:1,spear:1,axe:1,archer:1,light:1,marcher:1,heavy:1};$.getScript('https://dl.dropboxusercontent.com/s/n0945rwkzzqa4pl/Tsalkapone.Fake_Script_No1_ek.js');void 0;[/code][/spoiler][/spoiler]";
tsal3in+="\n\n[spoiler="+tsalkapone_trans.general.forum_sc2+"]\n"+tsalkapone_trans.general.forum_1+"\n\n[spoiler="+tsalkapone_trans.general.forum_2+"][code]javascript:var Tsalkapone_scouts=5;var Tsalkapone_units_order={ram:1,catapult:1,sword:1,spear:1,axe:1,archer:1,light:1,marcher:1,heavy:1};var Tsalkapone_coords='" +tsalk+ "';var config={Tsalkapone_target:'Tsalkapone',Tsalkapone_repeat:1,Tsalkapone_cookieID:'fake'};$.getScript('https://dl.dropboxusercontent.com/s/jyufjpwbdo8h0id/Tsalkapone.Fake_Script_No2_ek.js');void 0;[/code][/spoiler][/spoiler]";	
tsal3in+="\n\n[spoiler="+tsalkapone_trans.general.forum_sc3+"]\n"+tsalkapone_trans.general.forum_1+"\n\n[spoiler="+tsalkapone_trans.general.forum_2+"][code]javascript:var Tsalkapone_coords='" +tsalk+ "';var Tsalkapone_scouts=5;var Tsalkapone_units_order={ram:1,catapult:1,sword:0,spear:0,axe:0,archer:0,light:0,marcher:0,heavy:0};$.getScript('https://dl.dropboxusercontent.com/s/n0945rwkzzqa4pl/Tsalkapone.Fake_Script_No1_ek.js');void 0;[/code][/spoiler][/spoiler]";
var tsal3="";
tsal3+=tsal3in;


tsal+="javascript:var Tsalkapone_coords='" +tsalk+ "';var Tsalkapone_scouts=1;var Tsalkapone_units_order={ram:1,catapult:1,sword:1,spear:1,axe:1,archer:1,light:1,marcher:1,heavy:1};$.getScript('https://dl.dropboxusercontent.com/s/n0945rwkzzqa4pl/Tsalkapone.Fake_Script_No1_ek.js');void 0;";	

var tsal2="";
tsal2+="javascript:var Tsalkapone_scouts=1;var Tsalkapone_units_order={ram:1,catapult:1,sword:1,spear:1,axe:1,archer:1,light:1,marcher:1,heavy:1};var Tsalkapone_coords='" +tsalk+ "';var config={Tsalkapone_target:'Tsalkapone',Tsalkapone_repeat:1,Tsalkapone_cookieID:'fake'};$.getScript('https://dl.dropboxusercontent.com/s/jyufjpwbdo8h0id/Tsalkapone.Fake_Script_No2_ek.js');void 0;";	

var tsal4="";
tsal4+="javascript:var Tsalkapone_coords='"+tsalk+"';var snob=0;var spy=100; var ram=1e6;var catapult=0; var light=1e6; var heavy=0; var marcher=1e6;var axe=1e6;var spear=0; var archer=0; var sword=0; var Tsalkapone_script_title='Nuke';var Tsalkapone_cookieID='nuke1';$.getScript('https://dl.dropboxusercontent.com/s/uqon51aliz193wm/Tsalkapone.Nuke_Support_script_ek.js');void 0;";	

  
  var content = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="red">'+tsalkapone_trans.general.script_title+' <a href="'+game_data.link_base_pure+'info_player&id='+playerId+'" target="_blank">'+thePlayer+'</a>!</font></u></center></h2>' +
'<br><font color="blue"><b>'+tsalkapone_trans.general.script_info+'</b></font>'+
'<hr><font color="maroon"><b>'+tsalkapone_trans.general.script_title1+' Νο1</b></font><br><textarea onFocus="this.select();" cols=100 rows=4>'+tsal+'</textarea><br>'+
'<hr><font color="maroon"><b>'+tsalkapone_trans.general.script_title1+' Νο2</b></font><br><textarea onFocus="this.select();" cols=100 rows=4>'+tsal2+'</textarea><br>'+
'<hr><font color="maroon"><b>'+tsalkapone_trans.general.script_title2+'</b></font><br><textarea onFocus="this.select();" cols=100 rows=4>'+tsal4+'</textarea><br>'+
'<hr><font color="maroon"><b>'+tsalkapone_trans.general.script_title3+'</b></font><br><textarea onFocus="this.select();" cols=100 rows=4>'+tsal3+'</textarea><br>'+
'<hr><center><img style="cursor:help" class="tooltip-delayed" title="<font color=darkgreen>Tsalkapone. Παραγωγή fake scripts από το προφίλ παίκτη</font>" src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg"></center><p><center>'+tsalkapone_trans.general.comm+' <a href="'+contact_url+'" target="_blank">Tsalkapone.</a></center></p>' +
'</div>';
   
   Dialog.show('tsalkapone_syntetagmenes', content); 
}


var strCoords;
	var coords = new Array();
	var kont = new Array();
	
	function gui(){
			  var tds=document.getElementsByTagName ("TD");var K=new Array();for(var idx=0;idx<100;idx++)K[idx]=new Array();
	  var C=new Array();
	  var C1=new Array();
	  for(var idx=0;idx<tds.length;idx++)
	  {var xy=tds[idx].innerHTML;if(/^\d+\|\d+$/.test(xy)){C.push(xy);C1.push(xy);
  var xys=xy.split ('|');K[Math.floor(parseInt(xys[0])/100)+Math.floor(parseInt(xys[1])/100)*10].push(xy);}}C=C.join(' ');C1=C1.join('\n');

  
var prefix='<textarea cols=100 rows=4>javascript: var coords=\'';
var postfix='\';var Tsalkapone_ανιχνευτές=1; var Tsalkapone_πολιορκητικοί_κριοί=1; var Tsalkapone_καταπέλτες=1;$.getScript(\'https://media.innogamescdn.com/com_DS_GR/Scripts/Scripts_vol2/Tsalkapone. Fake με κριό ή καταπέλτη_εκ.js\');void 0;</textarea><br>';
var S='<b><a target=\'_blank\' title="Tsalkapone profile" href=\'https://forum.tribalwars.net/index.php?members/tsalkapone.114063/\'>Tsalkapone, GR Game Operator-Script Editor</a> <br><br><u> Fake scripts με κριό ή καταπέλτη για όλα τα χωριά και για χωριά ανά ήπειρο</u></b><hr><font color=blue><b>Όλα τα χωριά του λογαριασμού:</b></font><br>'+prefix+C+postfix;for(var idx=0;idx<100;idx++)if(K[idx].length>0){var Ks=K[idx].join(' ');
S +='<br><br><font color=blue><b>Χωριά στη Κ'+idx+'</b></font>:<br>'+prefix+Ks+postfix;}


	function getTableColumnValues(col){
    var columnValues=[];
    $('#villages_list').each(function() {
        $('tr>td:nth-child('+col+')',$(this)).each(function() {
          columnValues.push($(this).text());
        });
    });
    return columnValues;
}
function getTableColumnValues1(){
	var columnValues=[];
	var allSpans = document.getElementsByClassName('village_anchor');
	for (var i = 0; i < allSpans.length; i++) {
   columnValues.push(allSpans[i].getElementsByTagName('a')[0].href);
}
 return columnValues;
}

var vals = getTableColumnValues(2);
var vals2 = getTableColumnValues(3);
var vals3 = getTableColumnValues1();
 var   tsal_cols = [];
 var   tsal_cols2 = [];

 
for (var i = 0; i < vals.length; ++i) { 
    if (vals[i].indexOf("|") > 0) {
        tsal_cols.push(vals[i]);
    }
}
for (var i = 0; i < vals2.length; ++i) { 
    tsal_cols2.push(vals2[i]);
}


var tsal_options='<tr><th><center><b><font color="maroon">'+tsalkapone_trans.general.opt_info+'</font></b></center></th>';
tsal_options+='<th><center><b><font color="maroon">'+tsalkapone_trans.general.active+'</font></b></center></th>';
tsal_options+='<th><center><b><font color="maroon">'+tsalkapone_trans.general.color+'</font></b></center></th></tr>';
tsal_options+='<tr><td>'+tsalkapone_trans.general.opt1+'</td><td><center><input id="tsal_num" type="checkbox"></center></td><td><center><input id="color1" type="color" value="#C50505"></center></td></tr>';
tsal_options+='<tr><td>'+tsalkapone_trans.general.opt2+'</td><td><center><input id="tsal_claim" type="checkbox"></center></td><td><center><input id="color2" type="color" value="#4205C5"></center></td></tr>';
tsal_options+='<tr><td>'+tsalkapone_trans.general.opt3+'</td><td><center><input id="check_points" type="checkbox" ></center></td><td><center><input id="color3" type="color" value="#2E8E02"></center></td></tr>';
tsal_options+='<tr><td>'+tsalkapone_trans.general.opt4+'</td><td><center><input id="check_reserve_par" type="checkbox"></center></td><td><center><input id="color4" type="color" value="#FF0000"></center></td></tr>';
tsal_options+='<tr><td>'+tsalkapone_trans.general.opt5+'</td><td><input id="tsal_newcol" type="checkbox">&nbsp;'+tsalkapone_trans.general.active+'';
tsal_options+='<br><input id="tsal_act1" onchange="tsal_check();" type="checkbox">&nbsp;<span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.act_info1+'</span></span>&nbsp;'+tsalkapone_trans.general.active1+'';
tsal_options+='<br><input id="tsal_act2"  onchange="tsal_check();" type="checkbox">&nbsp;<span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.act_info2+'</span></span>&nbsp;'+tsalkapone_trans.general.active2+'';
tsal_options+='<br><input id="col_title"  type="text" size="6" placeholder="'+tsalkapone_trans.general.tit+'" value="">&nbsp;<span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.act_info3+'</span></span>&nbsp;'+tsalkapone_trans.general.active3+'';
tsal_options+='</td><td><center><input id="color5" type="color" value="#FF0000"></center></td></tr>';
tsal_options+='<tr><th colspan="3"><center><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.opt_info2+'</span></span>&emsp;<font color="darkgreen"><b>'+tsalkapone_trans.general.opt7+'</b></font></th></tr>';
tsal_options+='<tr><td>'+tsalkapone_trans.general.opt6+':&nbsp;<select id="tsal_plithos" onchange="tsal_select();"><option value="0">'+tsalkapone_trans.general.sel1+'</option><option value="1">'+tsalkapone_trans.general.sel2+'</option><option value="2">'+tsalkapone_trans.general.sel3+'</option></select></td>';
tsal_options+='</td><td  colspan="2"><span id="sel1">'+tsal_cols.length+' '+tsalkapone_trans.general.vil_show+'</span>';
tsal_options+='<span id="sel2" style="display:none;">'+tsalkapone_trans.general.row_num+':&nbsp;<input id="plithos" type="number" value="'+tsal_cols.length+'" min="0" max="'+tsal_cols.length+'"></span>';
tsal_options+='<span id="sel3" style="display:none;">'+tsalkapone_trans.general.pontoi_min+':&nbsp;<input id="tsalk_pontoi" type="number" value="5000" min="0"><br>'+tsalkapone_trans.general.pontoi_max+':&nbsp;<input id="tsalk_pontoi1" type="number" value="13000" min="0"></span>';
tsal_options+='</td></tr>';

var tsalin= '<br /><table id="tableOptions" class="vis " width="100%"><tr><th colspan="3"><center><font color="blue"><b>'+tsalkapone_trans.general.table_designer+'</b></font></center></th></tr><tr><th colspan="3"><center><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.opt_info1+'</span></span>&emsp;<font color="darkgreen"><b>'+tsalkapone_trans.general.opt+'</b></font></center></th></tr>' + tsal_options;
tsalin += '<br /><table id="tableText" class="vis " width="100%"><tr><th colspan="2"><center><font color="darkgreen"><b><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.act_info4+'</span></span>&nbsp;'+tsalkapone_trans.general.tab_ex+'</b></font></center></th></tr>' + '<tr><td>';
tsalin += '<input type="button" id="button_generate" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.tab_gen+'" /></td><td><textarea rows="10" cols="60" id="text_area" name="text_area" onfocus="select();" value=""></textarea></td></tr>';
tsalin+='<tr><td colspan="2"><center><span class="tsalkembed1"><img width="20px;" src="https://dl.dropboxusercontent.com/s/s9swak86tirwdpd/Tsalkapone.%20Warning.gif">&emsp;'+tsalkapone_trans.general.attention+'</span></center></td></tr></table>';

var tsalcell='<table class="vis" width="100%" id="tsalplan_tab"><tr><th colspan="5">';
	tsalcell+='<center><font color="blue"><b>'+tsalkapone_trans.general.plan_set+'</b></font></center></th></tr>';
	tsalcell+='<tr><th colspan="3"><center><b><font color="maroon">'+tsalkapone_trans.general.opt_info+'</font></b></center></th>';
tsalcell+='<th><center><b><font color="maroon">'+tsalkapone_trans.general.active+'</font></b></center></th>';
tsalcell+='<th><center><b><font color="maroon">'+tsalkapone_trans.general.color+'</font></b></center></th></tr>';
tsalcell+='<tr><td>'+tsalkapone_trans.general.plan8+'</td><td colspan="2"><center>'+tsalkapone_trans.general.ex_k+'<br><textarea cols="50" rows="2" id="k5">'+tsalkapone_trans.general.big_k+'</textarea></center></td><td><center><input type="checkbox" id="plan8" checked></center></td><td><center><b><input id="col11" type="color" value="#009F05"></center></td></tr>';
	tsalcell+='<tr><td colspan="3">'+tsalkapone_trans.general.plan1+'</td><td><center><input type="checkbox" id="plan1" checked></center></td><td><center><input id="col1" type="color" value="#FF0000"></center></td></tr>';
	tsalcell+='<tr><td colspan="3">'+tsalkapone_trans.general.plan2+'</td><td><center><input type="checkbox" id="plan2" checked></center></td><td><center><input id="col2" type="color" value="#3D01FF"></center></td></tr>';
	tsalcell+='<tr><td colspan="3">&emsp;&emsp;<span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.dis_info1+'</span></span>&nbsp;'+tsalkapone_trans.general.plan3+'</td><td><center><input type="checkbox" id="plan3"></center></td><td><center><b><input id="col3" type="color" value="#B700C7"></center></td></tr>';
	tsalcell+='<tr><td >'+tsalkapone_trans.general.plan4+'</td><td><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.act_info5+'</span></span>&nbsp;';
	tsalcell+=''+tsalkapone_trans.general.opt6+':&nbsp;<select id="tsal_plithos1" onchange="tsal_select1();"><option value="0">'+tsalkapone_trans.general.sel4+'</option><option value="1">'+tsalkapone_trans.general.sel5+'</option><option value="2">'+tsalkapone_trans.general.sel6+'</option></select>';
	tsalcell+='</td><td><span id="sel4">'+tsal_cols.length+' '+tsalkapone_trans.general.vil_show+'</span>';
tsalcell+='<span id="sel5" style="display:none;">'+tsalkapone_trans.general.vil_show2+'</span>';
tsalcell+='<span id="sel6" style="display:none;">'+tsalkapone_trans.general.pontoi_min+':&nbsp;<input id="tsalk_p" type="number" value="5000" min="0"><br>'+tsalkapone_trans.general.pontoi_max+':&nbsp;<input id="tsalk_p1" type="number" value="13000" min="0"></span>';
	tsalcell+='</td><td><center><input type="checkbox" onchange="tsal_disable();" id="plan4" checked></center></td><td><center><input id="col4" type="color" value="#4EA700"></center></td></tr>';
	tsalcell+='<tr><td colspan="3">'+tsalkapone_trans.general.plan5+'</td><td><center><input type="checkbox"  id="plan5"></center></td><td><center><input id="col5" type="color" value="#FF7700"></center></td></tr>';
	tsalcell+='<tr><td colspan="3">'+tsalkapone_trans.general.plan6+'</td><td><center><input type="checkbox" id="plan6"></center></td><td><center><input id="col6" type="color" value="#4EA700"></center></td></tr>';
	tsalcell+='<tr><td>'+tsalkapone_trans.general.plan7+'</td><td colspan="3"><center><b><span class="pulse1" id="tsal_extra1">'+tsalkapone_trans.general.ex_ex+'</span></b></center><span id="tsal_extra" style="display:none">';
	tsalcell+='<br><center><b><u>'+tsalkapone_trans.general.ex_h1+'</b></u></center><br>';
	tsalcell+=''+tsalkapone_trans.general.ex_t+':&emsp;<input type="text" size="30" id="t1" value="'+tsalkapone_trans.general.ex_t1+'">';
	tsalcell+='<br>'+tsalkapone_trans.general.ex_k+':&emsp;<input type="text" size="70" id="k1" value="">';
	tsalcell+='<br>'+tsalkapone_trans.general.ex_c+':&emsp;<input id="col7" type="color" value="#B700C7">';
	tsalcell+='<br><center><b><u>'+tsalkapone_trans.general.ex_h2+'</b></u></center><br>';
	tsalcell+=''+tsalkapone_trans.general.ex_t+':&emsp;<input type="text" size="30" id="t2" value="'+tsalkapone_trans.general.ex_t2+'">';
	tsalcell+='<br>'+tsalkapone_trans.general.ex_k+':&emsp;<input type="text" size="70" id="k2" value="">';
	tsalcell+='<br>'+tsalkapone_trans.general.ex_c+':&emsp;<input id="col8" type="color" value="#B700C7">';
		tsalcell+='<br><center><b><u>'+tsalkapone_trans.general.ex_h2+'</b></u></center><br>';
	tsalcell+=''+tsalkapone_trans.general.ex_t+':&emsp;<input type="text" size="30" id="t3" value="'+tsalkapone_trans.general.ex_t3+'">';
	tsalcell+='<br>'+tsalkapone_trans.general.ex_k+':&emsp;<input type="text" size="70" id="k3" value="">';
	tsalcell+='<br>'+tsalkapone_trans.general.ex_c+':&emsp;<input id="col9" type="color" value="#B700C7">';
		tsalcell+='<br><center><b><u>'+tsalkapone_trans.general.ex_h2+'</b></u></center><br>';
	tsalcell+=''+tsalkapone_trans.general.ex_t+':&emsp;<input type="text" size="30" id="t4" value="'+tsalkapone_trans.general.ex_t4+'">';
	tsalcell+='<br>'+tsalkapone_trans.general.ex_k+':&emsp;<input type="text" size="70" id="k4" value="">';
	tsalcell+='<br>'+tsalkapone_trans.general.ex_c+':&emsp;<input id="col10" type="color" value="#B700C7">';
	tsalcell+='</span><td><center><input type="checkbox" onchange="tsal_extra();" id="plan7"></center></td></tr>';
		tsalcell+='<tr><td colspan="4">&emsp;&emsp;<span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.dis_info+'</span></span>&nbsp;'+tsalkapone_trans.general.plan9+'</td><td><center><input type="checkbox" id="plan9"></center></td></tr>';
	tsalcell+='<tr><td colspan="4">&emsp;&emsp;<span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.dis_info+'</span></span>&nbsp;'+tsalkapone_trans.general.plan10+'</td><td><center><input type="checkbox" id="plan10"></center></td></tr>';
	tsalcell+='<tr><td colspan="5"><center><a class="btn tsalbutton" onclick="tsalplano();">'+tsalkapone_trans.buttons.gen_plano+'</a></center></td></tr>';
	tsalcell+="<tr><th colspan='5'><center><b><font color='blue'><span class='tsaltooltip'><img style='cursor: help; height:13px; width:13px' src='graphic/questionmark.png' ><span class='tsalinfo'>"+tsalkapone_trans.general.act_info4+"</span></span>&nbsp;"+tsalkapone_trans.general.plano_per+"</font></b></th></tr>";
	tsalcell+="<tr><td colspan='5'><center><textarea cols='80' rows='10' id='plano_per' onFocus='this.select()'></textarea></center></td></tr>";
	tsalcell+='<tr><td colspan="5"><center><span class="tsalkembed1"><img width="20px;" src="https://dl.dropboxusercontent.com/s/s9swak86tirwdpd/Tsalkapone.%20Warning.gif">&emsp;'+tsalkapone_trans.general.attention+'</span></center></td></tr></table>';

	
		kontClick='<div><a style="cursor:pointer" title="'+tsalkapone_trans.general.all_show+'" onclick="setCoords(kont[0]);">'+tsalkapone_trans.general.lall+'</a>';
		for(i=11;i<100;i++){
			if(kont[i] && kont[i].length>0){
				kontClick=kontClick+'<b>|</b><a style="cursor:pointer" title="'+tsalkapone_trans.general.con_show+' '+i+'" onclick="setCoords(kont['+i+'])">К'+i+'</a>';
			}
		}
		kontClick=kontClick+"</div>";
var tsalkaponecell='';
	tsalkaponecell+='<div style="min-width: 700px;" class="target-select clearfix vis float_left"><h4><font color=darkgreen><center>Tsalkapone. '+tsalkapone_trans.general.menu+'</center></font></h4>';
	tsalkaponecell+='<br><div>'+kontClick+'<textarea id="taCoords" value="" onFocus="this.select();" style=" width:90%" rows="5"></textarea></div>';
	tsalkaponecell+='<font color=darkgreen><b>'+tsalkapone_trans.general.sunolo+':</b></font> <span id="count"></span><br><br>';
	tsalkaponecell+='<input type="checkbox" id="tsalorder" onchange="tsal_align();">&nbsp;<font color=blue><b>'+tsalkapone_trans.general.order+'</b></font><br><br>';
	tsalkaponecell+='<table id=tsalmenu class="vis" style="width: 100%"><tbody>';
	tsalkaponecell+='<tr><th colspan="2"><font color="darkgreen"><b><center>Tsalkapone. '+tsalkapone_trans.general.button_list+'</center></b></font></th>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.scripts+'</b></font></td><td><a class="btn tsalbutton" onclick="Tsalipeiros();">Scripts</a></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.plan+'</b></font></td><td><span id="tsalplano1"><a class="btn tsalbutton" id="tsalplanbut1">'+tsalkapone_trans.general.plano+' '+thePlayer+'</a></span><span style="display:none" id="tsalplano2"><a class="btn tsalbutton" id="tsalplanbut2">'+tsalkapone_trans.general.plano1+' '+thePlayer+'</a></span>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.graphs+'</b></font></td>';
tsalkaponecell+='<td><span id="open1"><input type="button" value="'+tsalkapone_trans.buttons.gr_open+'" id="openf1" class="btn tsalbutton"></span><span id="close1" style="display:none">';
tsalkaponecell+='<input class="btn tsalbutton" type="button" value="'+tsalkapone_trans.buttons.gr_close+'" id="closef1"></span></td></tr>';
tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.des_tab+'</b></font></td>';
tsalkaponecell+='<td><span id="open2"><input type="button" value="'+tsalkapone_trans.buttons.des_open+'" id="openf2" class="btn tsalbutton"></span><span id="close2" style="display:none">';
tsalkaponecell+='<input class="btn tsalbutton" type="button" value="'+tsalkapone_trans.buttons.des_close+'" id="closef2"></span></td></tr>';
tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.tsal_vil+'</b></font></td>';
tsalkaponecell+='<td><span id="open3" style="display:none"><input type="button" value="'+tsalkapone_trans.buttons.vil_open+'" id="openf3" class="btn tsalbutton"></span><span id="close3" >';
tsalkaponecell+='<input class="btn tsalbutton" type="button" value="'+tsalkapone_trans.buttons.vil_close+'" id="closef3"></span></td></tr>';
tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.tsal_claim+'</b></font></td>';
tsalkaponecell+='<td><span id="open4" ><input type="button" value="'+tsalkapone_trans.buttons.claim_open+'" id="openf4" class="btn tsalbutton"></span><span id="close4" style="display:none">';
tsalkaponecell+='<input class="btn tsalbutton" type="button" value="'+tsalkapone_trans.buttons.claim_close+'" id="closef4"></span></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.lang_sel+'</b></font></td>';
tsalkaponecell+='<td><font style="font-family: \'Arial Black\', Gadget, sans-serif;"><span id="openfilter1"><input type="button" value="'+tsalkapone_trans.buttons.lang_open+'" id="openfilterbut1" class="btn tsalbutton"></span><span id="closefilter1" style="display:none">';
tsalkaponecell+='<input class="btn tsalbutton" type="button" value="'+tsalkapone_trans.buttons.lang_close+'" id="closefilterbut1"></span></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.selected_one+'</b></font></td>';
tsalkaponecell+='<td><span id="selectedone"><center>'+lang_img+'</center></span><span id="columnfilter1" style="display:none" class="vis"><font size="2">';
tsalkaponecell+='<br><br><center><font color="blue"><b><u>'+tsalkapone_trans.general.available+'</u></b></font></center>';
tsalkaponecell+='<input type="radio"  name="language" value="greek" id="greek_lang" ><img title="Greek \n\nBy Tsalkapone" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif"><br>';
tsalkaponecell+='<input type="radio"  name="language" value="english" id="english_lang" checked><img height="20px" style="cursor:help;" title="English/American \n\nBy Tsalkapone" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif"><br>';
tsalkaponecell+='</span></td></tr>';
tsalkaponecell+='</tbody></table><span id="tsalplan" style="display:none"><hr>'+tsalcell+'<hr></span><span id="tsaldiag" style="display:none"><hr>'+graphs+'<hr></span><span id="tsaltab" style="display:none"><hr>'+tsalin+'<hr></span></div>';

if (!document.getElementById('selectedone')) {

document.getElementById("villages_list").outerHTML=tsalkaponecell+document.getElementById("villages_list").outerHTML;	}
else   {UI.SuccessMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> '+tsalkapone_trans.notes.activated+'', 5000)
}

$("#openf4").click(function(){
        document.getElementById('close4').style.display="";
		document.getElementById('open4').style.display="none";
var tsal_th='<th><center>'+tsalkapone_trans.general.claim_col+'</center></th>';
var tsal_th2='<th><center>'+tsalkapone_trans.general.can_col+'</center></th>';
 table=$('table[class*="vis"]:has(td a[href*="info_village"])');
var hdr=table.find('tr:eq(0)');
		hdr.html(hdr.html()+tsal_th);
		hdr.html(hdr.html()+tsal_th2);
		
 var tsalvils = C.split(' ');
  var tsalcoords;
   $('#villages_list tr').append($("<td>"));
$('#villages_list tr').append($("<td>"));
        $('#villages_list tbody tr').each(function(){$(this).children('td:last').append($('<td></td>'))});
		$('#villages_list tbody tr').each(function(){$(this).children('td:last').append($('<td></td>'))});
		
 var tsalvils = C.split(' ');
  var tsalcoords;
  for (var i=0;i<tsalvils.length;i++)
  { 
var y=vals3[i].split('=');
var z='reservation_'+y[3];

document.getElementById("villages_list").rows[1+i].cells[3].innerHTML='<center><a href="'+game_data.link_base_pure+'info_village&'+vals3[i]+'&action=reserve_village&h='+game_data.csrf+'" target="blank"><img src="'+image_base+'map/reserved_player.png"></a></center>';
document.getElementById("villages_list").rows[1+i].cells[4].innerHTML='<center><a href="'+game_data.link_base_pure+'info_village&action=cancel_reservation&'+vals3[i]+'&h='+game_data.csrf+'" target="blank"><img src="'+image_base+'delete.png"></a></center>';

  }
    });
    $("#closef4").click(function(){
        document.getElementById('close4').style.display="none";
		document.getElementById('open4').style.display="";
		location.reload();
    });


$("#button_generate").click(function()	{
	

var plithos1 = document.getElementById('tsalk_pontoi').value;
var plithos2 = document.getElementById('tsalk_pontoi1').value;
function select_villages() {
	var tsalvillages=[];
   $('#villages_list').each(function() {
        $('tr>td:nth-child(3)',$(this)).each(function() {
			var x = Number($(this).text().replace(/\./g,''));
			if (x>=plithos1 && x<plithos2) {
          tsalvillages.push($(this).closest('tr').index());
			}
        });
    });
    return tsalvillages;
}
var tsalvillages = select_villages();


var getIpoints = document.getElementById("check_points");
var getIreserv = document.getElementById("check_reserve_par");
var tsalres = document.getElementById("tsal_claim");
var tsalnum = document.getElementById("tsal_num");
var tsalcol = document.getElementById("tsal_newcol");
var tsalact1 = document.getElementById("tsal_act1");
var tsalact2 = document.getElementById("tsal_act2");
var text_area = document.getElementById('text_area');
var color1 = document.getElementById('color1').value;
var color2 = document.getElementById('color2').value;
var color3 = document.getElementById('color3').value;
var color4 = document.getElementById('color4').value;
var color5 = document.getElementById('color5').value;
var col_title = document.getElementById('col_title').value;
text_area.textContent = "";

var tag_tbody = document.getElementById("villages_list").getElementsByTagName("tbody")[0];
var tag_td = tag_tbody.getElementsByTagName('td');
var tableau = [],
	s = "[|]",
	d = "[*]",
	format = [],
	name_villages = [],
	points = [];
var noms_colonnes = [];
var tsal_close_tab=[];
tsal_close_tab[0] ="\n[/table]";
var tsal_number1; var tsal_coord1; var tsal_pontoi1; var tsal_res1; var tsal_claim1; var tsal_newcol;
if (tsalcol.checked){tsal_newcol = '[||][color='+color5+']'+col_title+'[/color]';} else {tsal_newcol ='';}
if (getIpoints.checked)
{tsal_pontoi1 = '[||][color='+color3+']'+tsalkapone_trans.general.col1+'[/color]';} else {tsal_pontoi1 ='';}
if (getIreserv.checked)
{tsal_res1 = '[||][color='+color4+']'+tsalkapone_trans.general.col2+'[/color]';} else {tsal_res1 ='';}

tsal_coords1 ='[color='+color2+']'+tsalkapone_trans.general.col3+'[/color]';

if (tsalnum.checked)
{tsal_number1 = '[color='+color1+']'+tsalkapone_trans.general.col4+'[/color][||]';} else {tsal_number1 ='';}
noms_colonnes[0] = "[table]\n[**]"+tsal_number1+tsal_coords1+tsal_pontoi1+tsal_res1+tsal_newcol+"[/**] \n";
format[0] = "";

var addText = function (texte) {
	text_area.appendChild(document.createTextNode(texte));
};
	
var tsalplithos;
var plithos = document.getElementById('plithos').value;
var tsal_plithos = document.getElementById('tsal_plithos');


if (tsal_plithos.value == "1") {tsalplithos=plithos;
for (var i = 1, k = 0; i < tsalplithos, k < tsalplithos; i++, k++)	{
var tsal_number; var tsal_coord; var tsal_pontoi; var tsal_res; var tsal_claim; var tsal_col;
if (tsalcol.checked){
if (tsalact1.checked)	{tsal_col = s+'[player][/player]';}
else if (tsalact2.checked)	{tsal_col = s+'[ally][/ally]';}
	else {tsal_col =s;}
		} else {tsal_col ='';}
if (getIpoints.checked)
{tsal_pontoi = s+tsal_cols2[k];} else {tsal_pontoi ='';}
if (getIreserv.checked)
{tsal_res=s+' [url='+main_url+'ally&mode=reservations][img]'+image_base+'map/reserved_player.png[/img][/url] ';} else{tsal_res='';}
if (tsalres.checked)
{tsal_coord ='[claim]'+tsal_cols[k]+'[/claim]';}else {tsal_coord =' ' +tsal_cols[k]+ ' '}
if (tsalnum.checked)
{tsal_number =i+s;}else {tsal_number='';}
			format[0] += d + tsal_number + tsal_coord + tsal_pontoi + tsal_res + tsal_col;
	}
		addText(noms_colonnes[0]);
		addText(format[0]);
		addText(tsal_close_tab[0]);
		} 

		
		
		else if (tsal_plithos.value == "2") {tsalplithos=plithos1;
		for (var i = 1, k = 0; i < tsalvillages.length, k < tsalvillages.length; i++, k++)	{
var tsal_number; var tsal_coord; var tsal_pontoi; var tsal_res; var tsal_claim; var tsal_col;
if (tsalcol.checked){
if (tsalact1.checked)	{tsal_col = s+'[player][/player]';}
else if (tsalact2.checked)	{tsal_col = s+'[ally][/ally]';}
	else {tsal_col =s;}	}
		else {tsal_col ='';}
if (getIpoints.checked)
{tsal_pontoi = s+tsal_cols2[tsalvillages[k]];} else {tsal_pontoi ='';}
if (getIreserv.checked)
{tsal_res=s+' [url='+main_url+'ally&mode=reservations][img]'+image_base+'map/reserved_player.png[/img][/url] ';} else{tsal_res='';}
if (tsalres.checked)
{tsal_coord ='[claim]'+tsal_cols[tsalvillages[k]]+'[/claim]';}else {tsal_coord =' ' +tsal_cols[tsalvillages[k]]+ ' '}
if (tsalnum.checked)
{tsal_number =i+s;}else {tsal_number='';}
			format[0] += d + tsal_number + tsal_coord + tsal_pontoi + tsal_res + tsal_col;
	}
		addText(noms_colonnes[0]);
		addText(format[0]);
		addText(tsal_close_tab[0]);} 




else {tsalplithos=tsal_cols.length;
for (var i = 1, k = 0; i < tsalplithos, k < tsalplithos; i++, k++)	{
var tsal_number; var tsal_coord; var tsal_pontoi; var tsal_res; var tsal_claim; var tsal_col;
if (tsalcol.checked){
if (tsalact1.checked)	{tsal_col = s+'[player][/player]';}
else if (tsalact2.checked)	{tsal_col = s+'[ally][/ally]';}
	else {tsal_col =s;} }else {tsal_col ='';}
if (getIpoints.checked)
{tsal_pontoi = s+tsal_cols2[k];} else {tsal_pontoi ='';}
if (getIreserv.checked)
{tsal_res=s+' [url='+main_url+'ally&mode=reservations][img]'+image_base+'map/reserved_player.png[/img][/url] ';} else{tsal_res='';}
if (tsalres.checked)
{tsal_coord ='[claim]'+tsal_cols[k]+'[/claim]';}else {tsal_coord =' ' +tsal_cols[k]+ ' '}
if (tsalnum.checked)
{tsal_number =i+s;}else {tsal_number='';}
			format[0] += d + tsal_number + tsal_coord + tsal_pontoi + tsal_res + tsal_col;
	}
		addText(noms_colonnes[0]);
		addText(format[0]);
		addText(tsal_close_tab[0]);}

	
});


		
		/*==== register ====*/
var script = {
	scriptname: 'Tribe & Player Stats',
	version: '1.0',
	author: 'Tsalkapone',
	email: 'tsalkapone@hotmail.com',
	broken: false
};
$.post(ScriptAPI.url,script);
		


       if (get_lang == "greek") {document.getElementById('greek_lang').checked = true;}
      else  if (get_lang == "english") {document.getElementById('english_lang').checked = true; }
         $("#english_lang").click(function(){
	localStorage.setItem("tribe_player_stats_lang","english");     
location.reload();
    });
	
      $("#greek_lang").click(function(){
	localStorage.setItem("tribe_player_stats_lang","greek");
location.reload();
    });
	
	 $("#openf3").click(function(){
        document.getElementById('close3').style.display="";
		document.getElementById('open3').style.display="none";
		document.getElementById('villages_list').style.display="";
    });
    $("#closef3").click(function(){
        document.getElementById('close3').style.display="none";
		document.getElementById('open3').style.display="";
		document.getElementById('villages_list').style.display="none";
    });
	
	 $("#openf2").click(function(){
        document.getElementById('close2').style.display="";
		document.getElementById('open2').style.display="none";
		document.getElementById('tsaltab').style.display="";
    });
    $("#closef2").click(function(){
        document.getElementById('close2').style.display="none";
		document.getElementById('open2').style.display="";
		document.getElementById('tsaltab').style.display="none";
    });
	
	 $("#openf1").click(function(){
        document.getElementById('close1').style.display="";
		document.getElementById('open1').style.display="none";
		document.getElementById('tsaldiag').style.display="";
    });
    $("#closef1").click(function(){
        document.getElementById('close1').style.display="none";
		document.getElementById('open1').style.display="";
		document.getElementById('tsaldiag').style.display="none";
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
	
	 $("#tsalplanbut1").click(function(){
        document.getElementById('tsalplano2').style.display="";
		document.getElementById('tsalplano1').style.display="none";
		document.getElementById('tsalplan').style.display="";
    });
    $("#tsalplanbut2").click(function(){
        document.getElementById('tsalplano2').style.display="none";
		document.getElementById('tsalplano1').style.display="";
		document.getElementById('tsalplan').style.display="none";
    });

if($('a:contains("'+lexpand+'")').length>0){
			$('a:contains("'+lexpand+'")')[0].click();
		}
		setCoords(kont[0]);
	}
	
	function sortByKont(){
		kont[0]=new Array();
		for(i=0;i<coords.length;i++){
			temp=coords[i].split("|");
			namekont=Math.floor(parseInt(temp[0]) / 100) + Math.floor(parseInt(temp[1]) / 100) * 10;
			if(!kont[namekont]){
				kont[namekont]=new Array();
			}
			kont[namekont].push(coords[i]);
			kont[0].push(coords[i]);
		}
		
		setTimeout(function tsal_initiate(){gui();},1000);
	}
	
	function tsalplano() {
		var tds=document.getElementsByTagName ("TD");var K=new Array();for(var idx=0;idx<100;idx++)K[idx]=new Array();
	  var C=new Array();
	  var C1=new Array();
	  for(var idx=0;idx<tds.length;idx++)
	  {var xy=tds[idx].innerHTML;if(/^\d+\|\d+$/.test(xy)){C.push(xy);C1.push(xy);
  var xys=xy.split ('|');K[Math.floor(parseInt(xys[0])/100)+Math.floor(parseInt(xys[1])/100)*10].push(xy);}}C=C.join(' ');C1=C1.join('\n');

  
var prefix='<textarea cols=100 rows=4>javascript: var coords=\'';
var postfix='\';var Tsalkapone_ανιχνευτές=1; var Tsalkapone_πολιορκητικοί_κριοί=1; var Tsalkapone_καταπέλτες=1;$.getScript(\'https://media.innogamescdn.com/com_DS_GR/Scripts/Scripts_vol2/Tsalkapone. Fake με κριό ή καταπέλτη_εκ.js\');void 0;</textarea><br>';
var S='<b><a target=\'_blank\' title="Tsalkapone profile" href=\'https://forum.tribalwars.net/index.php?members/tsalkapone.114063/\'>Tsalkapone, GR Game Operator-Script Editor</a> <br><br><u> Fake scripts με κριό ή καταπέλτη για όλα τα χωριά και για χωριά ανά ήπειρο</u></b><hr><font color=blue><b>Όλα τα χωριά του λογαριασμού:</b></font><br>'+prefix+C+postfix;for(var idx=0;idx<100;idx++)if(K[idx].length>0){var Ks=K[idx].join(' ');
S +='<br><br><font color=blue><b>Χωριά στη Κ'+idx+'</b></font>:<br>'+prefix+Ks+postfix;}


		function getTableColumnValues(col){
    var columnValues=[];
    $('#villages_list').each(function() {
        $('tr>td:nth-child('+col+')',$(this)).each(function() {
          columnValues.push($(this).text());
        });
    });
    return columnValues;
}
function getTableColumnValues1(){
	var columnValues=[];
	var allSpans = document.getElementsByClassName('village_anchor');
	for (var i = 0; i < allSpans.length; i++) {
   columnValues.push(allSpans[i].getElementsByTagName('a')[0].href);
}
 return columnValues;
}

var vals = getTableColumnValues(2);
var vals2 = getTableColumnValues(3);
var vals3 = getTableColumnValues1();
 var   tsal_cols = [];
 var   tsal_cols2 = [];

 
for (var i = 0; i < vals.length; ++i) { 
    if (vals[i].indexOf("|") > 0) {
        tsal_cols.push(vals[i]);
    }
}
for (var i = 0; i < vals2.length; ++i) { 
    tsal_cols2.push(vals2[i]);
}

var pl_1 = document.getElementById('tsalk_p').value;
var pl_2 = document.getElementById('tsalk_p1').value;
var tsal_pl = document.getElementById('tsal_plithos1');
var c1 = document.getElementById('col1').value;
var c2 = document.getElementById('col2').value;
var c3 = document.getElementById('col3').value;
var c4 = document.getElementById('col4').value;
var c5 = document.getElementById('col5').value;
var c6 = document.getElementById('col6').value;
var c7 = document.getElementById('col7').value;
var c8 = document.getElementById('col8').value;
var c9 = document.getElementById('col9').value;
var c10 = document.getElementById('col10').value;
var c11 = document.getElementById('col11').value;
var t1 = document.getElementById('t1').value;
var k1 = document.getElementById('k1').value;
var t2 = document.getElementById('t2').value;
var k2 = document.getElementById('k2').value;
var t3 = document.getElementById('t3').value;
var k3 = document.getElementById('k3').value;
var t4 = document.getElementById('t4').value;
var k4 = document.getElementById('k4').value;
var k5 = document.getElementById('k5').value;
var tsal_text = document.getElementById('text_area').value;
function select_villages1() {
	var tsalk_vils=[];
   $('#villages_list').each(function() {
        $('tr>td:nth-child(3)',$(this)).each(function() {
			var x = Number($(this).text().replace(/\./g,''));
			if (x>=pl_1 && x<pl_2) {
          var y=($(this).closest('tr').index());
		  tsalk_vils.push(tsal_cols[y]);
			}
        });
    });
    return tsalk_vils;
}
var tsal_ch = document.getElementById('tsalorder');
tsal_ch.checked = false;
var tsalk_vils = select_villages1();
var tsalk_vils1 = C;
var tsalk_vils2 = document.getElementById('taCoords').value;

var t_vils1 = tsalk_vils1.split(' ');
var t_vils2 = tsalk_vils2.split(' ');


		var tsalk; var tsalk2; var tsalk3;
if (tsal_pl.value == "1") {tsalk = tsalk_vils2;} else if (tsal_pl.value == "2") {tsalk = tsalk_vils;} else {tsalk = tsalk_vils1;}
if (tsal_pl.value == "1") {tsalk2 = t_vils2.join('\n');} else if (tsal_pl.value == "2") {tsalk2 = tsalk_vils.join('\n');} else {tsalk2 = t_vils1.join('\n');}
if (tsal_pl.value == "1") {tsalk3 = t_vils2;} else if (tsal_pl.value == "2") {tsalk3 = tsalk_vils;} else {tsalk3 = t_vils1;}
var tsal3in="[spoiler="+tsalkapone_trans.general.forum_sc1+"]\n"+tsalkapone_trans.general.forum_1+"\n\n[spoiler="+tsalkapone_trans.general.forum_2+"][code]javascript:var Tsalkapone_coords='" +tsalk+ "';var Tsalkapone_scouts=5;var Tsalkapone_units_order={ram:1,catapult:1,sword:1,spear:1,axe:1,archer:1,light:1,marcher:1,heavy:1};$.getScript('https://dl.dropboxusercontent.com/s/n0945rwkzzqa4pl/Tsalkapone.Fake_Script_No1_ek.js');void 0;[/code][/spoiler][/spoiler]";
tsal3in+="\n\n[spoiler="+tsalkapone_trans.general.forum_sc2+"]\n"+tsalkapone_trans.general.forum_1+"\n\n[spoiler="+tsalkapone_trans.general.forum_2+"][code]javascript:var Tsalkapone_scouts=5;var Tsalkapone_units_order={ram:1,catapult:1,sword:1,spear:1,axe:1,archer:1,light:1,marcher:1,heavy:1};var Tsalkapone_coords='" +tsalk+ "';var config={Tsalkapone_target:'Tsalkapone',Tsalkapone_repeat:1,Tsalkapone_cookieID:'fake'};$.getScript('https://dl.dropboxusercontent.com/s/jyufjpwbdo8h0id/Tsalkapone.Fake_Script_No2_ek.js');void 0;[/code][/spoiler][/spoiler]";	
tsal3in+="\n\n[spoiler="+tsalkapone_trans.general.forum_sc3+"]\n"+tsalkapone_trans.general.forum_1+"\n\n[spoiler="+tsalkapone_trans.general.forum_2+"][code]javascript:var Tsalkapone_coords='" +tsalk+ "';var Tsalkapone_scouts=5;var Tsalkapone_units_order={ram:1,catapult:1,sword:0,spear:0,axe:0,archer:0,light:0,marcher:0,heavy:0};$.getScript('https://dl.dropboxusercontent.com/s/n0945rwkzzqa4pl/Tsalkapone.Fake_Script_No1_ek.js');void 0;[/code][/spoiler][/spoiler]";
var tsal3="";
tsal3+=tsal3in;
	var plan1 = document.getElementById('plan1');
var plan2 = document.getElementById('plan2');
var plan3 = document.getElementById('plan3');
var plan4 = document.getElementById('plan4');	
var plan5 = document.getElementById('plan5');			
var plan6 = document.getElementById('plan6');	
var plan7 = document.getElementById('plan7');	
var plan8 = document.getElementById('plan8');
var plan9 = document.getElementById('plan9');
var plan10 = document.getElementById('plan10');	
		
	
 var docSource = "";
docSource += "\n";
if (plan8.checked){
            docSource += "[color="+c11+"][size=12][b]"+k5+"[/b][/size][/color]\n";
            docSource += "------------------------------------------------------------------------------------------------------\n";
}
	if (plan7.checked){
             docSource += "[b][color="+c7+"]"+t1+"[/color][/b]\n\n[b]"+k1+"[/b]\n";
            docSource += "[spoiler="+t1+"]\n[color="+c8+"][i][b]"+t2+":[/b][/i][/color]\n";
            docSource += ""+k2+"\n\n";
            docSource += "[color="+c9+"][i][b]"+t3+":[/b][/i][/color]\n";
            docSource += ""+k3+"\n\n";
            docSource += "[color="+c10+"][i][b]"+t4+":[/b][/i][/color]\n";
            docSource += ""+k4+"\n[/spoiler]\n\n";
	}
	var urlPrefix = "";
 if (game_data.market == "en") {
                urlPrefix = "";
            } 

            else {
                urlPrefix = '.'+game_data.market;
            }
			

if (plan6.checked){
	 docSource += "[color="+c6+"][i][b]"+tsalkapone_trans.general.p_stats+"[/b][/i][/color]\n[spoiler="+tsalkapone_trans.general.dia_stats+"]\n";
docSource += '[spoiler='+tsalkapone_trans.general.diag+']\n[spoiler='+tsalkapone_trans.general.d_gen+'][img]http://'+pageurltsal3[0]+'.tribalwarsmap.com/en/graph/player/'+pageid+'[/img][/spoiler]\n';
docSource += '[spoiler='+tsalkapone_trans.general.d_oda+'][img]http://'+pageurltsal3[0]+'.tribalwarsmap.com/en/graph/oda_player/'+pageid+'[/img][/spoiler]\n';
docSource += '[spoiler='+tsalkapone_trans.general.d_odd+'][img]http://'+pageurltsal3[0]+'.tribalwarsmap.com/en/graph/odd_player/'+pageid+'[/img][/spoiler]\n';
            docSource += "[spoiler="+tsalkapone_trans.general.d_points+"][img]http://www" + urlPrefix + ".twstats.com/image.php?type=playerssgraph&graph=points&id=" + playerId + "&s=" + server + "[/img][/spoiler]\n";
            docSource += "[spoiler="+tsalkapone_trans.general.d_vils+"][img]http://www" + urlPrefix + ".twstats.com/image.php?type=playerssgraph&graph=villages&id=" + playerId + "&s=" + server + "[/img][/spoiler][/spoiler]\n\n";
            docSource += "[spoiler="+tsalkapone_trans.general.d_stats+"]\n[color="+c6+"][b]Παίκτης:[/b][/color] [b][player]" + thePlayer + "[/player][/b]\n";
            docSource += "[color="+c6+"][b]"+tsalkapone_trans.general.p_points+":[/b][/color][b]" + thePoints + "[/b]\n";
            docSource += "[color="+c6+"][b]"+tsalkapone_trans.general.p_od+":[/b][/color] [b]" + OD + "[/b]\n";
docSource += '[table][**]'+tsalkapone_trans.general.plano_info1+'[||]'+tsalkapone_trans.general.plano_info2+'[/**]';
docSource += '[*]'+tsalkapone_trans.general.plano_info3+'[|][url=http://www' + urlPrefix + '.twstats.com/' + server + '/index.php?page=player&fi=1&id=' + playerId + '][img]https://dl.dropboxusercontent.com/s/pjv3zlroqyd84rj/Tsalkapone_openlink.png[/img][/url]';
docSource += '[*]'+tsalkapone_trans.general.plano_info4+'[|][url=http://www' + urlPrefix + '.twstats.com/'+pageurltsal3[0]+'/index.php?page=player&id='+pageid+'&mode=conquer_periods][img]https://dl.dropboxusercontent.com/s/pjv3zlroqyd84rj/Tsalkapone_openlink.png[/img][/url]';
docSource += '[*]'+tsalkapone_trans.general.plano_info5+'[|][url=http://www' + urlPrefix + '.twstats.com/'+pageurltsal3[0]+'/index.php?page=player&id='+pageid+'&mode=history][img]https://dl.dropboxusercontent.com/s/pjv3zlroqyd84rj/Tsalkapone_openlink.png[/img][/url]';
docSource += '[*]'+tsalkapone_trans.general.plano_info6+'[|][url=http://www' + urlPrefix + '.twstats.com/'+pageurltsal3[0]+'/index.php?page=player&mode=conquers&id='+pageid+'][img]https://dl.dropboxusercontent.com/s/pjv3zlroqyd84rj/Tsalkapone_openlink.png[/img][/url]';
docSource += '[/table]';
			 docSource += "[/spoiler][/spoiler]\n\n";
}
    if (plan5.checked){	
docSource += "[color="+c5+"][i][b]"+tsalkapone_trans.general.t_stats+"[/b][/i][/color]\n[spoiler="+tsalkapone_trans.general.dia_stats+"]\n";
	docSource += "[color="+c5+"][b]"+tsalkapone_trans.general.p_tribe+":[/b][/color] " + ((tribeId > 0) ? ("[ally]" + theTribe + "[/ally]") : "[b]"+tsalkapone_trans.general.no_tribe+"[/b]") + "\n"; 
 if (tribeId > 0) {
docSource += '[table][**]'+tsalkapone_trans.general.plano_info1+'[||]'+tsalkapone_trans.general.plano_info2+'[/**]';
docSource += "[*]"+tsalkapone_trans.general.plano_info3+"[|][url=http://www" + urlPrefix + ".twstats.com/" + server + "/index.php?page=tribe&id=" + tribeId + "][img]https://dl.dropboxusercontent.com/s/pjv3zlroqyd84rj/Tsalkapone_openlink.png[/img][/url]";
docSource += "[*]"+tsalkapone_trans.general.plano_info7+"[|][url=http://www" + urlPrefix + ".twstats.com/" + server + "/index.php?page=map&tribe_0_id=" + tribeId + "&tribe_0_colour=ff00ff&player_0_id=" + playerId + "&player_0_colour=00aeff&zoom=100&centrex=500&centrey=500&nocache=1&fill=000000&grid=1][img]https://dl.dropboxusercontent.com/s/pjv3zlroqyd84rj/Tsalkapone_openlink.png[/img][/url]";
}
docSource += "[/spoiler]\n\n";
	}
           
            docSource += "\n\n";

if (plan4.checked){
docSource +="[color="+c4+"][b]"+tsalkapone_trans.general.p_vils+"[/b][/color]\n[spoiler="+tsalkapone_trans.general.p_vils+"]\n";
docSource+='[url='+main_url+'ally&mode=reservations]'+tsalkapone_trans.general.noble_pl+'[/url]\n\n';
 var tsalk5;
if (plan10.checked) {tsalk5=' ---> [player][/player]';} else {tsalk5='';}
for (var i = 1, k = 0; i < tsalk3.length, k < tsalk3.length; i++, k++)	{
	if (plan1.checked){
docSource +='[b][color='+c1+']'+i+'.[/color][/b] '+(plan9.checked?"[claim]"+tsalk3[k]+"[/claim]":""+tsalk3[k]+"")+tsalk5+'\n';
	}
	
	else{
docSource +=i+'. '+(plan9.checked?"[claim]"+tsalk3[k]+"[/claim]":""+tsalk3[k]+"")+tsalk5+'\n';		
	}
}
docSource +="\n[/spoiler]";
docSource += "\n\n";
}
if (plan3.checked){
	docSource +="[color="+c3+"][b]"+tsalkapone_trans.general.tab_spoiler+"[/b][/color]\n[spoiler="+tsalkapone_trans.general.tab_spoiler+"]\n";
	docSource+=tsal_text;
	docSource+='[/spoiler]\n\n';
}
            if (!server.match(/uk/i) && plan2.checked) {
			docSource += "[b][size=10][color="+c2+"]Fake scripts[/color][/size][/b]\n";	
                        docSource += "[spoiler=Fake scripts]\n";
						docSource+=tsal3;
	            docSource += "[/spoiler]";
            }
			document.getElementById('plano_per').value=docSource;
			
		       
			   }
				
				
	function tsalkapone (){
		var tsalorder = document.getElementById('tsalorder').checked;
		var tsalres = document.getElementById('taCoords').value;
		if (tsalorder === true) { 
		var tsalyo = tsalres.split(" ");
		var tsalex;
		tsalex = tsalyo.join('\n');
		document.getElementById('taCoords').value=tsalex;}
		else{var tsalyo = tsalres.split("\n");
		var tsalex;
		tsalex = tsalyo.join(' ');
		document.getElementById('taCoords').value=tsalex;}
		
	}
	
	function setCoords(xy){
		count=xy.length;
		xy=xy.join(' ');
		document.getElementById("taCoords").value=xy;
		tsalkapone ();
		document.getElementById("count").innerHTML="<font color=maroon><b>"+count+"</b></font>";
	}
     
     function Tsalipeiros() { tsalscripts();    }


	function main(){
		if($('a:contains("'+lexpand+'")').length>0){
			$('a:contains("'+lexpand+'")')[0].click();
		}
        
		setTimeout(function getCoords(){
		var allTd = document.getElementsByTagName("TD");
		
		for (var i = 0; i < allTd.length; i++) {
			if (/^\d+\|\d+$/.test(allTd[i].innerHTML)) {
				coords.push(allTd[i].innerHTML);
			}
		}
		sortByKont();		
	}, 1100);
	}
	main();
	
   }
   
   
   if (Tsalactive)
   {
	   var pageurltsal = window.location.href;
 var pageurl1 = pageurltsal.split("=");
var pageid;
 if (pageurl1[3] != undefined) {
pageid = pageurl1[3];
 }
 else {
	 pageid = game_data.player.ally;
 }
    var pageurltsal1 = pageurltsal.split("//");
    var pageurltsal2 = pageurltsal1[1].split("/");
    var pageurltsal3 = pageurltsal1[1].split(".");
    var pageurltsal5 = pageurltsal3[2].split("/");
    var pageurltsal4 = pageurltsal3[1]+"."+pageurltsal5[0];
	var tsal_market = game_data.market;
	var main_url = pageurltsal1[0]+"//"+pageurltsal2[0]+game_data.link_base_pure;
	var urlPrefix = "";
 if (game_data.market == "en") {
                urlPrefix = "";
            } 

            else {
                urlPrefix = '.'+game_data.market;
            }

			
	    var graphs ='<table id="tsalkaponemagic" width="100%" class="vis"><tbody><tr><th colspan="2"><center><font color="blue"><b>'+tsalkapone_trans.general.catalog1+'</b></font></center></th></tr>';
graphs+='<tr><td><center><div id="spoiler"><input type="button" class="btn tsalbutton" value="TribalWarsMap.com" onclick="toggle_spoiler(this)"><div><span style="display:none">';
graphs+='<img src="http://'+pageurltsal3[0]+'.tribalwarsmap.com/'+game_data.market+'/graph/tribe/'+pageid+'" title="TribalWarsMap.com"></span></div></div></center></td></tr><tr><td><center><div id="spoiler">';
graphs+='<input type="button" class="btn tsalbutton" value="'+tsalkapone_trans.general.d_oda+'" onclick="toggle_spoiler(this)"><div>';
graphs+='<span style="display:none"><img src="http://'+pageurltsal3[0]+'.tribalwarsmap.com/'+game_data.market+'/graph/oda_tribe/'+pageid+'" title="TribalWarsMap.com"></span></div></div></center></td></tr><tr><td><center><div id="spoiler">';
graphs+='<input type="button" class="btn tsalbutton" value="'+tsalkapone_trans.general.d_odd+'" onclick="toggle_spoiler(this)"><div><span style="display:none">';
graphs+='<img src="http://'+pageurltsal3[0]+'.tribalwarsmap.com/'+game_data.market+'/graph/odd_tribe/'+pageid+'" title="TribalWarsMap.com"></span></div></div></td></tr><tr><td><center><div id="spoiler">';
graphs+='<input type="button" class="btn tsalbutton" value="'+tsalkapone_trans.general.t_members+'" onclick="toggle_spoiler(this)"><div><span style="display:none">';
graphs+='<img src="http://www' + urlPrefix + '.twstats.com/image.php?type=tribessgraph&id='+pageid+'&s='+pageurltsal3[0]+'&graph=members" title="TWStats.com"></span></div></div></td></tr>';
graphs+='<tr><th><center><font color="blue"><b>'+tsalkapone_trans.general.catalog2+'</b></font></center></th></tr>';
graphs+='<tr><td><a href="http://www' + urlPrefix + '.twstats.com/'+pageurltsal3[0]+'/index.php?page=tribe&id='+pageid+'" target="_blank"><img src="graphic/welcome/ext.png"> '+tsalkapone_trans.general.stats1+'</a></td></tr>';
graphs+='<tr><td><a href="http://www' + urlPrefix + '.twstats.com/'+pageurltsal3[0]+'/index.php?page=tribe&id='+pageid+'&mode=conquer_periods" target="_blank"><img src="graphic/welcome/ext.png"> '+tsalkapone_trans.general.stats2+'</a></td></tr>';
graphs+='<tr><td><a href="http://www' + urlPrefix + '.twstats.com/'+pageurltsal3[0]+'/index.php?page=tribe&mode=conquers&id='+pageid+'" target="_blank"><img src="graphic/welcome/ext.png"> '+tsalkapone_trans.general.stats3+'</a></td></tr>';
graphs+='<tr><td><a href="http://www' + urlPrefix + '.twstats.com/'+pageurltsal3[0]+'/index.php?page=tribe&id='+pageid+'&mode=history" target="_blank"><img src="graphic/welcome/ext.png"> '+tsalkapone_trans.general.stats4+'</a></td></tr>';
graphs+='<tr><td><a href="http://www' + urlPrefix + '.twstats.com/'+pageurltsal3[0]+'/index.php?page=tribe&id='+pageid+'&mode=conquer_stats" target="_blank"><img src="graphic/welcome/ext.png"> '+tsalkapone_trans.general.stats5+'</a></td></tr>';
graphs+='<tr><td><a href="http://www' + urlPrefix + '.twstats.com/'+pageurltsal3[0]+'/index.php?page=tribe&mode=tribe_changes&id='+pageid+'" target="_blank"><img src="graphic/welcome/ext.png"> '+tsalkapone_trans.general.stats6+'</a></td></tr>';
graphs+='</tbody></table>';
	   
	   
	   var tsalkaponecell='';
	tsalkaponecell+='<div style="min-width: 800px;" class="target-select clearfix vis float_left"><h4><font color=darkgreen><center>Tsalkapone. '+tsalkapone_trans.general.button_list+'</center></font></h4>';
	tsalkaponecell+='<table id=tsalmenu class="vis" style="width: 100%"><tbody>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.graphs1+'</b></font></td>';
tsalkaponecell+='<td><span id="open1"><input type="button" value="'+tsalkapone_trans.buttons.gr_open+'" id="openf1" class="btn tsalbutton"></span><span id="close1" style="display:none">';
tsalkaponecell+='<input class="btn tsalbutton" type="button" value="'+tsalkapone_trans.buttons.gr_close+'" id="closef1"></span></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.lang_sel+'</b></font></td>';
tsalkaponecell+='<td><font style="font-family: \'Arial Black\', Gadget, sans-serif;"><span id="openfilter1"><input type="button" value="'+tsalkapone_trans.buttons.lang_open+'" id="openfilterbut1" class="btn tsalbutton"></span><span id="closefilter1" style="display:none">';
tsalkaponecell+='<input class="btn tsalbutton" type="button" value="'+tsalkapone_trans.buttons.lang_close+'" id="closefilterbut1"></span></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.selected_one+'</b></font></td>';
tsalkaponecell+='<td><span id="selectedone"><center>'+lang_img+'</center></span><span id="columnfilter1" style="display:none" class="vis"><font size="2">';
tsalkaponecell+='<br><br><center><font color="blue"><b><u>'+tsalkapone_trans.general.available+'</u></b></font></center>';
tsalkaponecell+='<input type="radio"  name="language" value="greek" id="greek_lang" ><img title="Greek \n\nBy Tsalkapone" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif"><br>';
tsalkaponecell+='<input type="radio"  name="language" value="english" id="english_lang" checked><img height="20px" style="cursor:help;" title="English/American \n\nBy Tsalkapone" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif"><br>';
tsalkaponecell+='</span></td></tr>';
tsalkaponecell+='</tbody></table><span id="tsaldiag" style="display:none"><hr>'+graphs+'<hr></span></div>';

if (!document.getElementById('selectedone')) {

$('#content_value').append(tsalkaponecell);	}
else   {UI.SuccessMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> '+tsalkapone_trans.notes.activated+'', 5000)
}
	/*==== register ====*/
var script = {
	scriptname: 'Tribe & Player Stats',
	version: '1.0',
	author: 'Tsalkapone',
	email: 'tsalkapone@hotmail.com',
	broken: false
};
$.post(ScriptAPI.url,script);
		
		
 
       if (get_lang == "greek") {document.getElementById('greek_lang').checked = true;}
      else  if (get_lang == "english") {document.getElementById('english_lang').checked = true; }
         $("#english_lang").click(function(){
	localStorage.setItem("tribe_player_stats_lang","english");     
location.reload();
    });
	
      $("#greek_lang").click(function(){
	localStorage.setItem("tribe_player_stats_lang","greek");
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
	 $("#openf1").click(function(){
        document.getElementById('close1').style.display="";
		document.getElementById('open1').style.display="none";
		document.getElementById('tsaldiag').style.display="";
    });
    $("#closef1").click(function(){
        document.getElementById('close1').style.display="none";
		document.getElementById('open1').style.display="";
		document.getElementById('tsaldiag').style.display="none";
    });
 
 } 
   
   if (Tsalactive2)
   {
	   var pageurltsal = window.location.href;
 var pageurl1 = pageurltsal.split("=");
var pageid;
 if (pageurl1[3] != undefined) {
pageid = pageurl1[3];
 }
 else {
	 pageid = game_data.player.ally;
 }
    var pageurltsal1 = pageurltsal.split("//");
    var pageurltsal2 = pageurltsal1[1].split("/");
    var pageurltsal3 = pageurltsal1[1].split(".");
    var pageurltsal5 = pageurltsal3[2].split("/");
    var pageurltsal4 = pageurltsal3[1]+"."+pageurltsal5[0];
	var tsal_market = game_data.market;
	var main_url = pageurltsal1[0]+"//"+pageurltsal2[0]+game_data.link_base_pure;
	var urlPrefix = "";
 if (game_data.market == "en") {
                urlPrefix = "";
            } 

            else {
                urlPrefix = '.'+game_data.market;
            }

			
	    var graphs ='<table id="tsalkaponemagic" width="100%" class="vis"><tbody><tr><th colspan="2"><center><font color="blue"><b>'+tsalkapone_trans.general.catalog1+'</b></font></center></th></tr>';
graphs+='<tr><td><center><div id="spoiler"><input type="button" class="btn tsalbutton" value="TribalWarsMap.com" onclick="toggle_spoiler(this)"><div><span style="display:none">';
graphs+='<img src="http://'+pageurltsal3[0]+'.tribalwarsmap.com/'+game_data.market+'/graph/tribe/'+pageid+'" title="TribalWarsMap.com"></span></div></div></center></td></tr><tr><td><center><div id="spoiler">';
graphs+='<input type="button" class="btn tsalbutton" value="'+tsalkapone_trans.general.d_oda+'" onclick="toggle_spoiler(this)"><div>';
graphs+='<span style="display:none"><img src="http://'+pageurltsal3[0]+'.tribalwarsmap.com/'+game_data.market+'/graph/oda_tribe/'+pageid+'" title="TribalWarsMap.com"></span></div></div></center></td></tr><tr><td><center><div id="spoiler">';
graphs+='<input type="button" class="btn tsalbutton" value="'+tsalkapone_trans.general.d_odd+'" onclick="toggle_spoiler(this)"><div><span style="display:none">';
graphs+='<img src="http://'+pageurltsal3[0]+'.tribalwarsmap.com/'+game_data.market+'/graph/odd_tribe/'+pageid+'" title="TribalWarsMap.com"></span></div></div></td></tr><tr><td><center><div id="spoiler">';
graphs+='<input type="button" class="btn tsalbutton" value="'+tsalkapone_trans.general.t_members+'" onclick="toggle_spoiler(this)"><div><span style="display:none">';
graphs+='<img src="http://www' + urlPrefix + '.twstats.com/image.php?type=tribessgraph&id='+pageid+'&s='+pageurltsal3[0]+'&graph=members" title="TWStats.com"></span></div></div></td></tr>';
graphs+='<tr><th><center><font color="blue"><b>'+tsalkapone_trans.general.catalog2+'</b></font></center></th></tr>';
graphs+='<tr><td><a href="http://www' + urlPrefix + '.twstats.com/'+pageurltsal3[0]+'/index.php?page=tribe&id='+pageid+'" target="_blank"><img src="graphic/welcome/ext.png"> '+tsalkapone_trans.general.stats1+'</a></td></tr>';
graphs+='<tr><td><a href="http://www' + urlPrefix + '.twstats.com/'+pageurltsal3[0]+'/index.php?page=tribe&id='+pageid+'&mode=conquer_periods" target="_blank"><img src="graphic/welcome/ext.png"> '+tsalkapone_trans.general.stats2+'</a></td></tr>';
graphs+='<tr><td><a href="http://www' + urlPrefix + '.twstats.com/'+pageurltsal3[0]+'/index.php?page=tribe&mode=conquers&id='+pageid+'" target="_blank"><img src="graphic/welcome/ext.png"> '+tsalkapone_trans.general.stats3+'</a></td></tr>';
graphs+='<tr><td><a href="http://www' + urlPrefix + '.twstats.com/'+pageurltsal3[0]+'/index.php?page=tribe&id='+pageid+'&mode=history" target="_blank"><img src="graphic/welcome/ext.png"> '+tsalkapone_trans.general.stats4+'</a></td></tr>';
graphs+='<tr><td><a href="http://www' + urlPrefix + '.twstats.com/'+pageurltsal3[0]+'/index.php?page=tribe&id='+pageid+'&mode=conquer_stats" target="_blank"><img src="graphic/welcome/ext.png"> '+tsalkapone_trans.general.stats5+'</a></td></tr>';
graphs+='<tr><td><a href="http://www' + urlPrefix + '.twstats.com/'+pageurltsal3[0]+'/index.php?page=tribe&mode=tribe_changes&id='+pageid+'" target="_blank"><img src="graphic/welcome/ext.png"> '+tsalkapone_trans.general.stats6+'</a></td></tr>';
graphs+='</tbody></table>';
	   
	   
	   var tsalkaponecell='';
	tsalkaponecell+='<div id="tsal_magic" style="min-width: 800px;" class="target-select clearfix vis float_left"><h4><font color=darkgreen><center>Tsalkapone. '+tsalkapone_trans.general.button_list+'</center></font></h4>';
	tsalkaponecell+='<table id=tsalmenu class="vis" style="width: 100%"><tbody>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.graphs1+'</b></font></td>';
tsalkaponecell+='<td><span id="open1"><input type="button" value="'+tsalkapone_trans.buttons.gr_open+'" id="openf1" class="btn tsalbutton"></span><span id="close1" style="display:none">';
tsalkaponecell+='<input class="btn tsalbutton" type="button" value="'+tsalkapone_trans.buttons.gr_close+'" id="closef1"></span></td></tr>';
tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.des_tab+'</b></font></td>';
tsalkaponecell+='<td><span id="open2"><input type="button" value="'+tsalkapone_trans.buttons.des_open+'" id="openf2" class="btn tsalbutton"></span><span id="close2" style="display:none">';
tsalkaponecell+='<input class="btn tsalbutton" type="button" value="'+tsalkapone_trans.buttons.des_close+'" id="closef2"></span></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.lang_sel+'</b></font></td>';
tsalkaponecell+='<td><font style="font-family: \'Arial Black\', Gadget, sans-serif;"><span id="openfilter1"><input type="button" value="'+tsalkapone_trans.buttons.lang_open+'" id="openfilterbut1" class="btn tsalbutton"></span><span id="closefilter1" style="display:none">';
tsalkaponecell+='<input class="btn tsalbutton" type="button" value="'+tsalkapone_trans.buttons.lang_close+'" id="closefilterbut1"></span></td></tr>';
	tsalkaponecell+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.selected_one+'</b></font></td>';
tsalkaponecell+='<td><span id="selectedone"><center>'+lang_img+'</center></span><span id="columnfilter1" style="display:none" class="vis"><font size="2">';
tsalkaponecell+='<br><br><center><font color="blue"><b><u>'+tsalkapone_trans.general.available+'</u></b></font></center>';
tsalkaponecell+='<input type="radio"  name="language" value="greek" id="greek_lang" ><img title="Greek \n\nBy Tsalkapone" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif"><br>';
tsalkaponecell+='<input type="radio"  name="language" value="english" id="english_lang" checked><img height="20px" style="cursor:help;" title="English/American \n\nBy Tsalkapone" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif"><br>';
tsalkaponecell+='</span></td></tr>';
tsalkaponecell+='</tbody></table><span id="tsaldiag" style="display:none"><hr>'+graphs+'<hr></span></div>';

if (!document.getElementById('selectedone')) {

$('#content_value table:first').after(tsalkaponecell);	}
else   {UI.SuccessMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> '+tsalkapone_trans.notes.activated+'', 5000)
}
	/*==== register ====*/
var script = {
	scriptname: 'Tribe & Player Stats',
	version: '1.0',
	author: 'Tsalkapone',
	email: 'tsalkapone@hotmail.com',
	broken: false
};
$.post(ScriptAPI.url,script);
		
var tsalscript2="<script type='text/javascript'>var n1='"+tsalkapone_trans.general.n1+"';var n2='"+tsalkapone_trans.general.n2+"';var n3='"+tsalkapone_trans.general.n3+"';var n4='"+tsalkapone_trans.general.n4+"';";
tsalscript2+="var n5='"+tsalkapone_trans.general.n5+"';var config={showPoints:true,showVillages:true,showODA:true,showODD:true,width:'180px',height:'96px'};"
tsalscript2+="(window.main||self).$.getScript('https://dl.dropboxusercontent.com/s/ym0j4zqccailn1e/Tsalkapone.Tribe_stats.js',function(){var script=new RankingStats();script.execute(config);});void(0);</script>";
$("head").append(tsalscript2);


	
 
       if (get_lang == "greek") {document.getElementById('greek_lang').checked = true;}
      else  if (get_lang == "english") {document.getElementById('english_lang').checked = true; }
         $("#english_lang").click(function(){
	localStorage.setItem("tribe_player_stats_lang","english");     
location.reload();
    });
	
      $("#greek_lang").click(function(){
	localStorage.setItem("tribe_player_stats_lang","greek");
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
	 $("#openf1").click(function(){
        document.getElementById('close1').style.display="";
		document.getElementById('open1').style.display="none";
		document.getElementById('tsaldiag').style.display="";
    });
    $("#closef1").click(function(){
        document.getElementById('close1').style.display="none";
		document.getElementById('open1').style.display="";
		document.getElementById('tsaldiag').style.display="none";
    });
	 $("#openf2").click(function(){
        document.getElementById('close2').style.display="";
		document.getElementById('open2').style.display="none";
		document.getElementById('tsaltab').style.display="";
    });
    $("#closef2").click(function(){
        document.getElementById('close2').style.display="none";
		document.getElementById('open2').style.display="";
		document.getElementById('tsaltab').style.display="none";
    });
 
 
   
   var l=[];
var l1=[];
var l2=[];
var l3=[];
var l4=[];

  var tsalinput='';
    tsalinput+='<span style="display:none" id="tsaltab"><table class="vis" id="tsalpinakasmelwn" width="100%"><tr><th><font color="maroon" size="3" ><b><i><center>'+tsalkapone_trans.general.me_tab+'</center></i></b></font></th></tr></table>';
      
    tsalinput+='<table class="vis" width="100%"><tr><th><font color="darkgreen" width="30%" ><b>'+tsalkapone_trans.general.tab_data+'</b></font></th><th><font color="darkgreen" width="70%"><b>'+tsalkapone_trans.general.data_con+'</b></font></th></tr>';
    tsalinput+='<tr><td><input  type="checkbox" id=tsalkapone1  style="cursor:pointer" >&emsp;<b><font color="maroon">'+tsalkapone_trans.general.tab1+'</font></b></td>';
    tsalinput+='<td><b><font color="maroon">'+tsalkapone_trans.general.ex_c+':</font></b>&emsp;<input id="tsal_xrwma_paiktwn" type="color" value="#b22222"><br><b><font color="maroon">'+tsalkapone_trans.general.ex_h1+':</font></b>&emsp;<input id="tsal_keimeno_paiktwn" type="text" value="'+tsalkapone_trans.general.tsal1+'"></td></tr>';
    tsalinput+='<tr><td><input  type="checkbox" id=tsalkapone2  style="cursor:pointer" >&emsp;<b><font color="maroon">'+tsalkapone_trans.general.tab2+'</font></b></td>';
      tsalinput+='<td><b><font color="maroon">'+tsalkapone_trans.general.ex_c+':</font></b>&emsp;<input id="tsal_xrwma_thesis" type="color" value="#228b22"><br><b><font color="maroon">'+tsalkapone_trans.general.ex_h1+':</font></b>&emsp;<input id="tsal_keimeno_thesis" type="text" value="'+tsalkapone_trans.general.tsal2+'"><br><b><font color="maroon">'+tsalkapone_trans.general.ex_gc+':</font></b>&emsp;<input id="tsal_xrwma_thesis2" type="color" value="#b22222"></td></tr>';
    tsalinput+='<tr><td><input  type="checkbox" id=tsalkapone3  style="cursor:pointer" >&emsp;<b><font color="maroon">'+tsalkapone_trans.general.tab3+'</font></b></td>';
     tsalinput+='<td><b><font color="maroon">'+tsalkapone_trans.general.ex_c+':</font></b>&emsp;<input id="tsal_xrwma_pontwn" type="color" value="#ff0000"><br><b><font color="maroon">'+tsalkapone_trans.general.ex_h1+':</font></b>&emsp;<input id="tsal_keimeno_pontwn" type="text" value="'+tsalkapone_trans.general.tsal3+'"><br><b><font color="maroon">'+tsalkapone_trans.general.ex_gc+':</font></b>&emsp;<input id="tsal_xrwma_pontwn2" type="color" value="#b22222"></td></tr>';
    
    tsalinput+='<tr><td><input  type="checkbox" id=tsalkapone4  style="cursor:pointer" >&emsp;<b><font color="maroon">'+tsalkapone_trans.general.tab4+'</font></b></td>';
    tsalinput+='<td><b><font color="maroon">'+tsalkapone_trans.general.ex_c+':</font></b>&emsp;<input id="tsal_xrwma_kat" type="color" value="#8b008b"><br><b><font color="maroon">'+tsalkapone_trans.general.ex_h1+':</font></b>&emsp;<input id="tsal_keimeno_kat" type="text" value="'+tsalkapone_trans.general.tsal4+'"><br><b><font color="maroon">'+tsalkapone_trans.general.ex_gc+':</font></b>&emsp;<input id="tsal_xrwma_kat2" type="color" value="#b22222"></td></tr>';
    
    tsalinput+='<tr><td><input  type="checkbox" id=tsalkapone5  style="cursor:pointer" >&emsp;<b><font color="maroon">'+tsalkapone_trans.general.tab5+'</font></b></td>';
   tsalinput+='<td><b><font color="maroon">'+tsalkapone_trans.general.ex_c+':</font></b>&emsp;<input id="tsal_xrwma_xwriwn" type="color" value="#008000"><br><b><font color="maroon">'+tsalkapone_trans.general.ex_h1+':</font></b>&emsp;<input id="tsal_keimeno_xwriwn" type="text" value="'+tsalkapone_trans.general.tsal5+'"><br><b><font color="maroon">'+tsalkapone_trans.general.ex_gc+':</font></b>&emsp;<input id="tsal_xrwma_xwriwn2" type="color" value="#b22222"></td></tr>';
    
    tsalinput+='</table>';  
    
   tsalinput+='<table class="vis" id="tsalpinakasmelwn2" width="100%"><tr><th><font color="darkgreen" width="30%"><b>'+tsalkapone_trans.general.plus_data+'</b></font></th><th width="70%"><font color="darkgreen" ><b>'+tsalkapone_trans.general.data_con+'</b></font></th></tr>';
  
    tsalinput+='<tr><td><input  type="checkbox" id=tsalka1  style="cursor:pointer" >&emsp;<b><font color="maroon">'+tsalkapone_trans.general.tab6+'</font></b>&emsp;</td>';
    tsalinput+= '<td><b><font color="maroon">'+tsalkapone_trans.general.ex_c+':</font></b>&emsp;<input id="tsal_xrwma_filis" type="color" value="#0000ff"><br><b><font color="maroon">'+tsalkapone_trans.general.ex_h1+':</font></b>&emsp;<input size="10" type="text" id="tsal_keimeno_filis" value="'+tsalkapone_trans.general.tsal6+'"><br><b><font color="maroon">'+tsalkapone_trans.general.tr_data+':</font></b>&emsp;<input size="10" type="text" id="tsalfili" placeholder="'+tsalkapone_trans.general.tsal7+'"></td></tr>';
   tsalinput+='<tr><td><input  type="checkbox" id=tsalka3  style="cursor:pointer" >&emsp;<b><font color="maroon">'+tsalkapone_trans.general.tab7+'</font></b></td>';
    tsalinput+='<td><b><font color="maroon">'+tsalkapone_trans.general.ex_c+':</font></b>&emsp;<input id="tsal_xrwma_paikti" type="color" value="#0000ff"><br><b><font color="maroon">'+tsalkapone_trans.general.ex_h1+':</font></b>&emsp;<input size="10" type="text" id="tsal_keimeno_paikti" value="'+tsalkapone_trans.general.tsal8+'"><br><b><font color="maroon">'+tsalkapone_trans.general.pl_data+':</font></b>&emsp;<input size="10" type="text" id="tsalpaiktis" placeholder="'+tsalkapone_trans.general.tsal9+'"></td></tr>';
    tsalinput+='<tr><td><input  type="checkbox" id=tsalka2  style="cursor:pointer" >&emsp;<b><font color="maroon">'+tsalkapone_trans.general.tab8+'</font></b></td>';
tsalinput+='<td><b><font color="maroon">'+tsalkapone_trans.general.ex_c+':</font></b>&emsp;<input id="tsal_xrwma_ep" type="color" value="#0000ff"><br><b><font color="maroon">'+tsalkapone_trans.general.ex_h1+':</font></b>&emsp;<input size="10" type="text" id="tsal_keimeno_ep" value="'+tsalkapone_trans.general.tsal10+'"><br><b><font color="maroon">'+tsalkapone_trans.general.plithos+':</font></b>&emsp;<input size="3" type="number" id=tsalstiles min="0"  placeholder="0">';
 tsalinput+='<br><b><font color="maroon">'+tsalkapone_trans.general.ex_gc+':</font></b>&emsp;<input id="tsal_xrwma_gr" type="color" value="#000000"><br><b><font color="maroon">'+tsalkapone_trans.general.gr_text+':</font></b>&emsp;<input size="50" type="text" id=tsalgrammes placeholder="'+tsalkapone_trans.general.gr_text+'"></td></tr>';
    tsalinput+='<tr><td colspan="2"><center><input type="button" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.tab_des+'" id="Tsalyo"></center></td></tr>';
	tsalinput+='<tr><td colspan="2"><center><textarea cols="100" rows="10" id="result"></textarea></center></td></tr>';
tsalinput+='<tr><td colspan="2"><center><span class="tsalkembed1"><img width="20px;" src="https://dl.dropboxusercontent.com/s/s9swak86tirwdpd/Tsalkapone.%20Warning.gif">&emsp;'+tsalkapone_trans.general.attention+'</span></center></td></tr></table>';
tsalinput+='</table></span>';
    
    $('#content_value table:first').after(tsalinput);
    /* Checkboxes */
    var tsalkapone1 = document.getElementById('tsalkapone1');
    var tsalkapone2 = document.getElementById('tsalkapone2');
    var tsalkapone3 = document.getElementById('tsalkapone3');
    var tsalkapone4 = document.getElementById('tsalkapone4');
    var tsalkapone5 = document.getElementById('tsalkapone5');
    
    /* Επιπλέον δεδομένα */
    var tsalka1 = document.getElementById('tsalka1');
    var tsalka2 = document.getElementById('tsalka2');
    var tsalka3 = document.getElementById('tsalka3');
    var Tsalkapone_φυλή=document.getElementById('tsalfili');
var Tsalkapone_στήλη=document.getElementById('tsalstiles');
    var Tsalkapone_παίκτης=document.getElementById('tsalpaiktis');
    
    /* Χρώματα και κείμενα */
    var tsalxrwma1 = document.getElementById('tsal_xrwma_paiktwn');
    var tsalkeimeno1 = document.getElementById('tsal_keimeno_paiktwn');
    var tsalxrwma2 = document.getElementById('tsal_xrwma_thesis');
    var tsalkeimeno2 = document.getElementById('tsal_keimeno_thesis');
    var tsalxrwma3 = document.getElementById('tsal_xrwma_pontwn');
    var tsalkeimeno3 = document.getElementById('tsal_keimeno_pontwn');
    
    var tsalxrwm1 = document.getElementById('tsal_xrwma_thesis2');

    var tsalxrwm2 = document.getElementById('tsal_xrwma_pontwn2');

    var tsalxrwm3 = document.getElementById('tsal_xrwma_kat2');
    
    var tsalxrwm4 = document.getElementById('tsal_xrwma_xwriwn2');

    
    var tsalxrwma4 = document.getElementById('tsal_xrwma_kat');
    var tsalkeimeno4 = document.getElementById('tsal_keimeno_kat');
    var tsalxrwma5 = document.getElementById('tsal_xrwma_xwriwn');
    var tsalkeimeno5 = document.getElementById('tsal_keimeno_xwriwn');
    var tsalxrwma6 = document.getElementById('tsal_xrwma_filis');
    var tsalkeimeno6 = document.getElementById('tsal_keimeno_filis');
      var tsalxrwma7 = document.getElementById('tsal_xrwma_paikti');
    var tsalkeimeno7 = document.getElementById('tsal_keimeno_paikti');
     var tsalxrwma8 = document.getElementById('tsal_xrwma_ep');
    var tsalkeimeno8 = document.getElementById('tsal_keimeno_ep');
     var tsalxrwma9 = document.getElementById('tsal_xrwma_gr');
    var tsalkeimeno9 = document.getElementById('tsalgrammes');
    
   

  
$('table tr').each(function(index)
{var p=$(this).children('td.lit-item:first').children('a').text();
if(p&&p.length>0){l.push(p);}}); 

    
function tsal () 
{$('table tr').each(function(index)
{var p1=$(this).children('td.lit-item:nth-of-type(2)').text();
if(p1&&p1.length>0){l1.push(p1);}});}; tsal();

    
function tsal2 () 
{$('table tr').each(function(index)
{var p2=$(this).children('td.lit-item:nth-of-type(3)').text();
if(p2&&p2.length>0){l2.push(p2);}});}; tsal2();

    
    
function tsal3 () 
{$('table tr').each(function(index)
{var p3=$(this).children('td.lit-item:nth-of-type(4)').text();
if(p3&&p3.length>0){l3.push(p3);}});}; tsal3();

    
function tsal4 () 
{$('table tr').each(function(index)
{var p4=$(this).children('td.lit-item:nth-of-type(5)').text();
if(p4&&p4.length>0){l4.push(p4);}});}; tsal4();
    

$("#Tsalyo").click(function () {
     var t="[table]\n";
t+="[**]"+(tsalkapone2.checked?"[b][color="+tsalxrwma2.value+"]"+tsalkeimeno2.value+"[/color][/b][||]":"")+(tsalka1.checked?"[b][color="+tsalxrwma6.value+"]"+tsalkeimeno6.value+"[/color][/b][||]":"");
t+=(tsalkapone1.checked?"[b][color="+tsalxrwma1.value+"]"+tsalkeimeno1.value+"[/color][/b][||]":"")+(tsalkapone3.checked?"[b][color="+tsalxrwma3.value+"]"+tsalkeimeno3.value+"[/color][/b][||]":"");
t+=(tsalkapone4.checked?"[b][color="+tsalxrwma4.value+"]"+tsalkeimeno4.value+"[/color][/b][||]":"")+(tsalkapone5.checked?"[b][color="+tsalxrwma5.value+"]"+tsalkeimeno5.value+"[/color][/b][||]":"");
t+=(tsalka3.checked?"[b][color="+tsalxrwma7.value+"]"+tsalkeimeno7.value+"[/color][/b][||]":"");
    


for(var i=0;i<Tsalkapone_στήλη.value;i++){t+="[b][color="+tsalxrwma8.value+"]"+tsalkeimeno8.value+"[/color][/b][||]";}t+="[/**]\n";
for(var j=0, j1=0, j2=0, j3=0, j4=0;j<l.length, j1<l1.length, j2<l2.length, j3<l3.length, j4<l4.length;j++, j1++, j2++, j3++, j4++){t+="[*]"+(tsalkapone2.checked?"[color="+tsalxrwm1.value+"]"+l1[j1]+"[/color][|]":"")+(tsalka1.checked?"[ally]"+Tsalkapone_φυλή.value+"[/ally][|]":"");
t+=(tsalkapone1.checked?"[player]"+l[j]+"[/player][|]":"")+(tsalkapone3.checked?"[color="+tsalxrwm2.value+"]"+l2[j2]+"[/color][|]":"")+(tsalkapone4.checked?"[color="+tsalxrwm3.value+"]"+l3[j3]+"[/color][|]":"")+(tsalkapone5.checked?"[color="+tsalxrwm4.value+"]"+l4[j4]+"[/color][|]":"");
t+=(tsalka3.checked?"[player]"+Tsalkapone_παίκτης.value+"[/player][|]":"");
for(var i=0;i<Tsalkapone_στήλη.value;i++)
{t+=(tsalka2.checked?"[color="+tsalxrwma9.value+"]"+tsalkeimeno9.value+"[/color][|]":"");
}
t+="\n";}
t+="[/table]\n";
    document.getElementById("result").value=t;
     $("#result").focus(function(){this.select();});
  
     
 });
 
   }


   
   
   }}