/*
		scriptname:	Advanced Coords Extractor
		version:	1.0.0
		created: June 18, 2016
 		game version:	version	8.48.1
 		author:		Tsalkapone (tsalkapone@hotmail.com)
 
 ==== pages where this can be used ==== 
 * all pages 
  
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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// $.twFarmFinder(branch,debugEnabled)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

(function($){
	var get_lang = localStorage.getItem("advanced_extractor_lang");
    var lang="";
    if (get_lang === null) {lang = "english";}
    else { lang = ""+get_lang+"";}
    var supported_languages =["greek","english"];
    var lang_check = supported_languages.indexOf(lang);
    if (lang_check < 0) {UI.ErrorMessage('<font color=gold><b><center>'+tsalkapone_trans.general.notification+' Tsalkapone</center></b></font> <br><br> The selected language is not supported. Please select one of the supported languages.', 5000);}
    else {
 var tsalkapone_trans = (function() {
				    var tsalkapone_trans = {};
    tsalkapone_trans.english= { 
	 general:{ 
	 script:"Advanced Coords-Extractor",
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
criteria:"Click to show/hide the Searching Criteria",	
major_list:"Core Functions",	
sxediasmos:"Click to show/hide the Table Design",
scripts_pro:"Click to show/hide the Command-Scripts Production",
tsal_styles:"Click to show/hide the Additional Stylization",
tsal_useful:"Click to show/hide the Useful Links & Infos",
updated:"Updated",
vils:"Villages",
pontoi:"Points",
tribe:"Tribe",
owner:"Owner",
seq:"S/N",                   /* Sequence Number */
no_data:"NO DATA",
edited_by:"Edited by",
crit:"Searching Criteria",
crit1:"Variables",
type_villages:"Select village type",
all_villages:"All",
selected_villages:"Selected",
bonus_villages:"Bonus",
tsal_villages:"Templates",
choice1:"Bonus Hunters",
choice2:"Ghost Barbarians",
choice3:"The Train Stop",
choice4:"Foreign Fortresses",
choice5:"The Veterans",
choice6:"The Rookies",
choice7:"The Gold Mines",
choice8:"The Unbroken Villages",
yours:"Villages",
my_tribe:"Τribe's villages",
tsal_attention:"Available only with <u>Templates</u>",
bonus_attention:"Available only with <u>Bonus</u>",
no_tribe:"Players with no tribe",
yes_tribe:"Players with tribe",
barbs:"Barbarian villages",
timi:"Values",
cons:"Continent(-s)",
map_area:"Map Area",
vil_min:"Minimum village points",
vil_max:"Maximum village points",
square:"Distance Radius",
fields:"Fields",
center:"Symmetry center",
names:"Players' names",
exnames:"Friends",
extags:"Family & Allies",
tags:"Tribes' tags",
left_top:"Top-left",
right_bot:"Bottom-right",
vil_bonus:"Bonus villages",
type_bonus:"Bonus type",
active_bonus:"Activate",
barb_find:"Barbarians",
barb_vil:"Barbarian village",
wood_bonus:"+100% Wood Production",
stone_bonus:"+100% Clay Production",
iron_bonus:"+100% Iron Production",
farm_bonus:"+10% Farm Population",
inf_bonus:"-33% Infantry Recruitment",
cav_bonus:"-33% Cavalry Recruitment",
gar_bonus:"-50% Workshop Recruitment",
res_bonus:"+30% All Resources",
mer_bonus:"+50% Merchants & Storage",
temp1:"The following table displays the searching's criteria of each template",
temp2:"Template's name",
temp3:"Criteria",
temp1_info:"All bonus villages that belong to players",
temp2_info:"All abandoned villages that exceed the maximum points of the barbarian villages. These are villages which used to be owned by players who got banned or restarted",
temp2_info1:"Minimum points limit",
temp3_info:"All villages that don't belong to your tribe or you and are inside the snob's distance's limit area from the selected village in <u>Symmetry's center</u>",
temp4_info:"All non-barbarian villages that don't belong to your tribe or you and have a bonus on recruitments or bonus on farm population",
temp5_info:"All villages that belong to players with lower id than yours (indicating that their account has logged in before yours)",
temp6_info:"All villages that belong to players with higher id than yours (indicating that their account has logged in after yours)",
temp7_info:"All villages that don't belong to your tribe or you and have any bonus on resources and more than 5.000 points. Also, all villages with more than 9.000 points",
temp8_info:"All non-barbarian villages that don't belong to your tribe or you with bonus on workshop's recruitment",
info_1:"Select one of the options displayed on the right.<br><br> If you select <b>All</b> any option regarding village's type, owner's name and tribe's tag will be disabled. You may select to include or exclude your tribe's or your own villages. <br><br> If you select <b>Selected</b> all of the following settings, except from <i>Bonus villages</i> and <i>Templates</i>, will be applied accordingly.<br><br> If you select <b>Bonus</b> the only village's type setting that will be applied are the ones displayed on the row titled as <u>Bonus Villages</u>.<br><br>If you select <b>Templates</b> a menu with various mixed settings will be displayed. Every other setting regarding villages' type will be disabled.",  
info_2:"<b>Check</b> this option to include barbarian villages in the searching's criteria. <br><b>Uncheck</b> to exclude them.",
info_3:"<b>Check</b> this option to include players' villages, who don't belong in a tribe, in the searching's criteria. <br><b>Uncheck</b> to exclude them.",
info_4:"<b>Check</b> this option to include players' villages, who belong in a tribe, in the searching's criteria. <br><b>Uncheck</b> to exclude them.",
info_5:"<b>Check</b> any of the following options to include specific types of bonus villages in the searching's criteria. <br><br> Checking the option <b>Barbarians</b> the script will search for every non-bonus barbarian village.<br><br><b>Uncheck</b> any option to exclude it from the searching's criteria.",
info_7:"<b>Check</b> this option to include your villages in the searching's criteria. <br><b>Uncheck</b> to exclude them.",
info_8:"<b>Check</b> this option to include your tribe's villages in the searching's criteria. <br><b>Uncheck</b> to exclude them.",
info1:"Enter the desired number(-s) of a continent (i.e. 445). <br><br> Enter as many as you wish separating them with <b>comma (,)</b>. For instance <b><i>45,55,45,54</i></b>.",
info2:"Enter a <b>Top-left</b> and a <b>Bottom-right</b> <b><font color='red'>coordinate</font></b> to design a map area in which villages will be searched. <br><br> This method designs a rectangle in the Map where the script will execute the search of villages who fulfill the rest selected criteria.", 
info3:"Enter the minimun points of villages to be searched. The script will search for villages who have equal or more points than the entered value. <br><br> <u><b>Attention:</b></u> Don't use full stop (.) when entering a value i.e. enter 5000 instead of 5.000.",
info4:"Enter the maximum points of villages to be searched. The script will search for villages who have equal or less points than the entered value. <br><br> <u><b>Attention:</b></u> Don't use full stop (.) when entering a value i.e. enter 5000 instead of 5.000.",
info5:"Enter a number in the <b>Fields</b> and a coordinate in the <b>Symmetry center</b> to search for villages that are in a certain distance from a village. <br><br> <b>Fields:</b> The script will search for villages that are in equal or less distance than the entered value. <br><br><b>Symmetry center:</b> The script will search for villages around this coordinate. Every distance value is applied on this coordinate.",
info6:"Enter the players' name whose villages will be included in the searching on the defined area of map. <br><br> Add as many players as you wish separating their names with <b> -- </b>. For instance <i>Tsalkapone--Dream Slayer</i>.",
info7:"Enter the tribes' tag (not name) whose villages included in the searching on the defined area of map. <br><br> Add as many tribes as you wish separating their names with <b> -- </b>. For instance <i>G.O.--N*M</i>.",
info8:"Enter the players' name whose villages will be <b><font color='red'>excluded</font></b> from the searching's criteria. <br><br> Add as many players as you wish separating their names with <b> -- </b>. For instance <i>Tsalkapone--Dream Slayer</i>.",
info9:"Enter the tribes' tag (not name) whose villages will be <b><font color='red'>excluded</font></b> from the searching's criteria. <br><br> Add as many tribes as you wish separating their names with <b> -- </b>. For instance <i>G.O.--N*M</i>.",
table_des:"Table Design",
col_con:"Columns' Settings",
col_styles:"Styles' Settings",
sequ:"Numbering",
col_plus:"Add column",
syn:"Coords",
settingsmenu:"Settings Menu",
tsal_background:"Click to enable/disable a more stylish background",
cur_vil:"Click to enter the last saved coordinate",
all_map:"Click to enter values wherever needed (Map area, Continents, Distance radius) to include the whole map in the searching's criteria",
claim_tag:"Add the [claim] tag to every coordinate displayed on the table.",
points_bold:"Add the [b] tag (bold) to villages' points.",
owner_bb:"Add the [player] tag to every player's name displayed on the table.",
tribe_bb:"Add the [ally] tag to every tribe's tag displayed on the table.",
seq_bb:"Add the [b] tag and <b><font color='red'>red color</font></b> to every numbering displayed on the table.",
co_tit:"Title",
col_title:"Enter a title for the extra column.",
bb_codes:"BB-Codes",
bold:"Bold",
bold_color:"Bold & red color",
player_tag:"Add the [player] tag to every row of this column.",
t_player:"Player",
t_name:"Name",
player_tag_all:"Add a specific player's name to every row of this column.",
tribe_tag:"Add the [tribe] tag to every row of this column.",
t_tribe:"Tribe",
t_tag:"Tag",
tribe_tag_all:"Add a specific tribe's tag to every row of this column.",
col_info:"<b>Check</b> any box on this column to enter a new column on the table's code using the checkbox's label as <b>column's title</b>. Each title represents the data-type of each extracted village that will be included in the table. <br><br> Checking an <b>Add column</b> option offers you the potential to enter your desired title.",
tsal_links:"Useful Links & Infos",
linkth:"Description",
infoth:"Link & Infos",
link1:"World Settings",
link2:"World Stats",
link3:"Growth Rankings",
link4:"Conquer Map",
link5:"Last updated ennoblements",
link6:"Live ennoblements",
link7:"Maximum barbarians' points",
link8:"Maximum snob distance (in map fields)",
new_tab:"Open link on a new tab",
scripts_prod:"Produce Commands' Scripts",
script1:"Fake Script No1",
script2:"Fake Script No2",
script3:"Fake scripts for tribal forum or mail",
script4:"Farming Script",
script5:"Nuke/Support Script",
script_info1:"<b><u>Units Method:</u></b> This script chooses only one unit type to insert in the rally point. The unit's selection is based on the the units' speed. The first choice is ram and the last one is heavy. You can change the order in the variable <b><font color='red'>Tsalkapone_units_order</font></b>. <br><br><b><font color='maroon'>Note:</font></b> Scouts are an exception to this rule. Their selected value will be inserted regardless.  <br><br> <b><u>Coords Method:</u></b> The script chooses a random coordinate out of the selected targets to enter as a target in the rally point.<br><br> Press <b>T</b> on your keyboard after you activate the script for more info.",
script_info2:"<b><u>Units Method:</u></b> This script chooses only one unit type to insert in the rally point. The unit's selection is based on the the units' speed. The first choice is ram and the last one is heavy. You can change the order in the variable <b><font color='red'>Tsalkapone_units_order</font></b>. <br><br><b><font color='maroon'>Note:</font></b> Scouts are an exception to this rule. Their selected value will be inserted regardless.  <br><br> <b><u>Coords Method:</u></b> The script chooses coordinates out of the selected targets in a consecutive order. You may enter a desired target choosing its coordinates from the <b>Targets' List</b>.<br><br> Press <b>T</b> on your keyboard after you activate the script for more info.",
script_info3:"The code displayed on the right consists of the following scripts:<br><br>1. Fake script using all the available units and random coords' selection (see <b>Fake Script No1</b> for more info). <br><br>2. Fake script using all the available units and random coords' selection (see <b>Fake Script No2</b> for more info). <br><br>3. Fake script using ram or catapult and random coords' selection.<br><br> The code displayed is compatible with the game's bb-codes and can be paste as it is in tribal forums or as message's text in mail.",
script_info4:"<b><u>Units Method:</u></b> This script chooses only one unit type to insert in the rally point. The unit's selection is based on the a unit's customizable priority-order. <br><br><b><font color='maroon'>Note:</font></b> Scouts are an exception to this rule. Their selected value will be inserted regardless. <br><br> <b><u>Coords Method:</u></b> The script chooses coordinates out of the selected targets in a consecutive order displaying the order's number of each target.<br><br> Press <b>T</b> on your keyboard after you activate the script for more info.",
script_info5:"<b><u>Units Method:</u></b> The script will insert every selected value of every unit. If the available units of a unit-type are equal to zero the script will skip this unit-type. If it is above zero but below the selected value every remaining amount of the unit will be inserted. If you want to insert all the units of a specific unit-type just enter a high enough value i.e. <b>24000 or 1e6 (=1 million)</b>. For instance if you enter <b>1e6</b> in spears and swords the script will enter all the spearmen and the swordmen</u></b> . <br><br> <b><u>Coords Method:</u></b> The script chooses coordinates out of the selected targets in a consecutive order displaying the order's number of each target.<br><br><b><font color='red'>The script displayed on the right is modified to be used as a nuke script. It inserts every axe, light, ram, marcher and 100 scouts in the rally point.</font></b>.<br><br> Press <b>T</b> on your keyboard after you activate the script for more info.",
c_results:"Searching's Results",
tsal_format:"Define results' format",
add_styles:"Additional Stylization",
style_coords:"Coordinates",
style_players:"Players",
style_tribes:"Tribes",
style_numbering:"Style numbering",
style_order:"Vertical/Horizontal order",
style_info1:"<b>Check</b> to add the [claim] bb-code to every extracted coordinate",
style_info2:"<b>Check</b> to add the [player] bb-code to every extracted coordinate's owner",
style_info3:"<b>Check</b> to add the [ally] bb-code to every extracted coordinate's owner's tribe",
style_info4:"<b>Check</b> to add the [b] bb-code to every extracted coordinate's numbering element",
style_info5:"<b>Check</b> to display the extracted coordinated in vertical order.<br><br><b>Uncheck</b> to display them in horizontal order",
data_files:"Data's files information",
data_type:"File's name",
data_age:"File's age",
data_status:"Files' status",
data_tribes:"World's tribes' data file",
data_players:"World's players' data file",
data_villages:"World's villages' data file",
data_attention:"ATTENTION: The transaction of each data's file may last up to several seconds",
hint1:"Format's available codes",
hint2:"Include numbering to every result",
hint3:"Village's coordinates",
hint4:"Village's points",
hint5:"Village's name",
hint6:"Village's owner's name",
hint7:"Village's owner's tribe's tag",
hint8:"Village's owner's tribe's name",
hint9:"The continent where each village is",
hint10:"Village's owner's tribe's points",
hint11:"Village's owner's tribe's rank",
hint12:"Village's owner's rank",
hint13:"Village's owner's points",
hint14:"Village's bonus",
sample_text:"Format's preview example",
format_info:"<b>Click</b> on the following text input to view the format's available codes. You may enter as many codes as you like. Any other character or symbol you add, that doesn't match any of the available codes, will be added as it is in every extracted coordinate. <br><br><b>Move your mouse</b> over the image on the left to preview an output's example of the current format.",
core_info:"<b>Click</b> on any of the following buttons to operate one of the corresponding functions.<br><br><b>Search Villages:</b> search every village that fulfills the selected criteria.<br><br><b>Save Settings:</b> save every customizable value of the script. <u>Symmetry center</u>'s and <u>Map Area</u>'s values won't be saved. You may save the <u>Symmetry center</u>'s entered coordinates and use them by clicking on <u>Last village</u> button.<br>The <u>ON-OFF</u> values will also be saved.<br><br><b>Select Results:</b> select the output's text displayed on <u>Searching's Results</u>",
data_info1:"This column displays how much time has passed since the last update of each data's file",
data_info2:"If you haven't transacted a data's file the following text will appear",
data_info3:"If a data's file consists of a large amount of elements you will be able to update it any time. In this case the following icon will appear",
data_info4:"If a data's file hasn't been updated for more than an hour or consists of a large amount of elements you will be able to update it",
forum_sc1:"Fake Script No1 - Random Coordinate",
forum_sc2:"Fake Script No2 - Consecutive Coordinates",
forum_sc3:"Fake Script No3 - Random Coordinate, Ram & Catapult Only",
forum_1:"Press [b]T[/b] on your keyboard after you activate the script for more info regarding its variables and settings.",
forum_2:"Script Code",
	},
	buttons:{
			  lang_open:"Open language selection",
              lang_close:"Close language selection",
			  set_show:"Show",
			  set_hide:"Hide",
			  close_popup:"Close popup",
			  table_show:"Show table's code",
			  table_hide:"Hide table's code",
			  searching:"Search Villages",
			  save_set:"Save Settings",
			  results_select:"Select Results",
			  show_bonus:"Show List",
			  hide_bonus:"Hide List",
			  cur_vil:"Last village",
			  all_map:"All map",
			  data_update:"Update data's file",
	},
        notes:{
            saved:"The Settings have been successfully saved",
			active:"The Advanced Coords-Extractor is already active",
			delayed:"Advanced Coords-Extractor has been activated. The loading may last some seconds to be completed. Thanks for your patience",
			up_vil:"You need to update the data files of the world's villages",
			up_pl:"You need to update the data files of the world's players",
			up_tr:"You need to update the data files of the world's tribes",
			last_coord:"There weren't found any saved coordinates. Make sure you click on Save Settings",
			searching:"Searching for villages. Do not interrupt while searching...",
        },
};
tsalkapone_trans.greek= { 
	 general:{ 
	 script:"Αναζήτηση Χωριών",
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
		 settingsmenu:"Κεντρικό μενού ρυθμίσεων",
tsal_background:"Επιλογή για ενεργοποίηση/απενεργοποίηση εφέ εικόνας στο φόντο",
		 criteria:"Επιλογή εμφάνισης/απόκρυψης Κριτηριών Αναζήτησης",
		 major_list:"Κύριες λειτουργίες",
		 sxediasmos:"Επιλογή εμφάνισης/απόκρυψης Σχεδιασμού Πίνακα",
		 scripts_no:"Επιλογή εμφάνισης/απόκρυψης Παραγωγής scripts εντολών",
		 tsal_styles:"Επιλογή εμφάνισης/απόκρυψης Πρόσθετων διαμορφώσεων",
		 tsal_useful:"Επιλογή εμφάνισης/απόκρυψης Χρήσιμων Συνδέσμων & Πληροφοριών",
		 updated:"Ανανεωμένο",
		 vils:"Χωριά",
pontoi:"Πόντοι",
tribe:"Φυλή",
owner:"Ιδιοκτήτης",
seq:"Α/Α", 
no_data:"ΔΕΝ ΒΡΕΘΗΚΑΝ ΔΕΔΟΜΕΝΑ",
edited_by:"Δημιουργήθηκε από τον",
crit:"Κριτήρια Αναζήτησης",
crit1:"Μεταβλητές",
type_villages:"Επιλογή είδους χωριών",
all_villages:"Όλα",
selected_villages:"Επιλογή",
bonus_villages:"Bonus",
tsal_villages:"Πρότυπα",
yours:"Χωριά",
cur_vil:"Επιλέξτε για να εισάγετε τη τελευταία αποθηκευμένη συντεταγμένη",
my_tribe:"Τα χωριά της φυλής",
choice1:"Κυνηγοί bonus",
choice2:"Βάρβαρα-Φαντάσματα",
choice3:"Η Στάση του Τρένου",
choice4:"Ξένα Φρούρια",
choice5:"Οι Βετεράνοι",
choice6:"Οι Αρχάριοι",
choice7:"Τα Χρυσωρυχεία",
choice8:"Τα Απόρθητα Χωριά",
tsal_attention:"Διαθέσιμο μόνο με <u>Πρότυπα</u>",
bonus_attention:"Διαθέσιμο μόνο με <u>Bonus</u>",
no_tribe:"Παίκτες χωρίς φυλή",
yes_tribe:"Παίκτες με φυλή",
barbs:"Χωριά βαρβάρων",
timi:"Τιμές",
cons:"Ήπειρος (-οι)",
map_area:"Περιοχή Χάρτη",
all_map:"Επιλέξτε για να εισάγετε τιμές όπου χρειάζεται (Ήπειροι, Περιοχή Χάρτη, Ακτίνα απόστασης) για να συμπεριληφθεί όλος ο χάρτης στην αναζήτηση",
vil_min:"Ελάχιστοι πόντοι χωριού",
vil_max:"Μέγιστοι πόντοι χωριού",
square:"Ακτίνα απόστασης",
fields:"Πεδία",
center:"Κέντρο",
names:"Ονόματα παικτών",
exnames:"Φίλοι",
extags:"Φυλή & Σύμμαχοι",
tags:"Ετικέτες φυλών",
left_top:"Πάνω αριστερά",
right_bot:"Κάτω δεξιά",
vil_bonus:"Χωριά Bonus",
type_bonus:"Είδος Bonus",
active_bonus:"Ενεργοποίηση",
barb_find:"Βάρβαρα",
barb_vil:"Χωριό βαρβάρων",
wood_bonus:"+100% Παραγωγή Ξύλου",
stone_bonus:"+100% Παραγωγή Πηλού",
iron_bonus:"+100% Παραγωγή Σιδήρου",
farm_bonus:"+10% Πληθυσμός",
inf_bonus:"-33% Στρατολόγηση Στρατώνα",
cav_bonus:"-33% Στρατολόγηση Σταύλου",
gar_bonus:"-50% Στρατολόγηση Εργαστηρίου",
res_bonus:"+30% Όλοι οι πόροι",
mer_bonus:"+50% 'Εμποροι & Αποθήκη",
temp1:"Ο ακόλουθος πίνακας παρουσιάζει τα κριτήρια αναζήτησης κάθε πρότυπου",
temp2:"Ονομασία πρότυπου",
temp3:"Κριτήρια",
temp1_info:"Όλα τα bonus χωριά που ανήκουν σε παίκτες",
temp2_info:"Όλα τα χωριά βαρβάρων που υπερβαίνουν τους μέγιστους πόντους των βάρβαρων δηλώνοντας ότι κάποτε άνηκαν σε παίκτη",
temp2_info1:"Κατώτατο όριο πόντων",
temp3_info:"Όλα τα χωριά που δεν ανήκουν στη φυλή σου ή σε σένα και βρίσκονται εντός της επιτρεπόμενης απόστασης αριστοκράτη από το επιλεγμένο χωριό στο πεδίο <u>Κέντρο</u>",
temp4_info:"Όλα τα χωριά παικτών που δεν ανήκουν στη φυλή σου ή σε σένα και έχουν κάποιο bonus στρατολόγησης ή πληθυσμού",
temp5_info:"Όλα τα χωριά παικτών που έχουν μικρότερο id από το δικό σου (δηλώνοντας ότι δημιούργησαν το λογαριασμό τους νωρίτερα από το δικό σου)",
temp6_info:"Όλα τα χωριά παικτών που έχουν μεγαλύτερο id από το δικό σου (δηλώνοντας ότι δημιούργησαν το λογαριασμό τους αργότερα από το δικό σου)",
temp7_info:"Όλα τα χωριά που δεν ανήκουν σε σένα ή στη φυλή σου και έχουν κάποιο bonus παραγωγής πόρου και περισσότερους από 5.000 πόντους. Επίσης, όλα τα χωριά με περισσότερους από 9.000 πόντους",
temp8_info:"Όλα τα χωριά παικτών που δεν ανήκουν σε σένα ή στη φυλή σου και έχουν bonus στρατολόγησης στο Εργαστήριο",
info_1:"Επιλέξτε μία από τις διαθέσιμες επιλογές στα δεξιά.<br><br> Επιλέγοντας <b>Όλα</b> απενεργοποιείται κάθε ρύθμιση που αφορά είδος χωριού, όνομα ιδιοκτήτη και ετικέτα φυλής. Μπορείτε να καθορίσετε αν θα συμπεριληφθούν ή όχι τα χωριά σας ή τα χωριά της φυλής σας στην αναζήτηση. <br><br> Επιλέγοντας <b>Επιλογή</b> θα εφαρμοστούν όλες οι επιλεγμένες ρυθμίσεις, εκτός από αυτές που περιλαμβάνονται στις κατηγορίες <i>Χωριά Bonus</i> και <i>Πρότυπα</i>.<br><br> Επιλέγοντας <b>Bonus</b> θα εφαρμοστούν μόνο οι ρυθμίσεις στη κατηγορία <i>Χωριά Bonus</i> για τα είδη χωριών.<br><br> Επιλέγοντας <b>Πρότυπα</b> μια πληθώρα έτοιμων ρυθμίσεων θα εμφανιστεί. Επιλέξτε κατά βούληση. Η συγκεκριμένη επιλογή απενεργοποιεί κάθε άλλη ρύθμιση που αφορά είδη χωριών.",
info_2:"<b>Επιλέξτε</b> τη συγκεκριμένη ρύθμιση για να συμπεριλάβετε στην αναζήτηση χωριά βαρβάρων. <br><b>Αποεπιλέξτε</b> για να αποκλείσετε.",
info_3:"<b>Επιλέξτε</b> τη συγκεκριμένη ρύθμιση για να συμπεριλάβετε στην αναζήτηση χωριά παικτών χωρίς φυλή. <br><b>Αποεπιλέξτε</b> για να αποκλείσετε.",
info_4:"<b>Επιλέξτε</b> τη συγκεκριμένη ρύθμιση για να συμπεριλάβετε στην αναζήτηση χωριά παικτών που ανήκουν σε φυλή. <br><b>Αποεπιλέξτε</b> για να αποκλείσετε.",
info_5:"<b>Επιλέξτε</b> οποιοδήποτε επιλογή από τις ακόλουθες για να συμπεριλάβετε τα αναγραφόμενα είδη χωριών στην αναζήτηση. <br><br> Επιλέγοντας <b>Βάρβαρα</b> το script θα αναζητήσει κάθε βάρβαρο χωριό χωρίς bonus.<br><br><b>Αποεπιλέξτε</b> οποιαδήποτε επιλογή για να αποκλείσετε το αναγραφόμενο είδος χωριού από την αναζήτηση.",
info_7:"<b>Επιλέξτε</b> τη συγκεκριμένη ρύθμιση για να συμπεριλάβετε στην αναζήτηση τα δικά σας χωριά. <br><b>Αποεπιλέξτε</b> για να αποκλείσετε.",
info_8:"<b>Επιλέξτε</b> τη συγκεκριμένη ρύθμιση για να συμπεριλάβετε στην αναζήτηση τα χωριά της φυλής σας. <br><b>Αποεπιλέξτε</b> για να αποκλείσετε.",
info1:"Εισάγετε τον επιθυμητό αριθμό Ηπείρου π.χ. 44. <br><br> Προσθέστε περισσότερους Ηπείρους διαχωρίζοντας τα νούμερά τους με <b>κόμμα</b>. Π.χ. <b><i>45,55,54,44</i></b>.",
info2:"Εισάγετε στα πεδία <b>Πάνω αριστερά</b> και <b>Κάτω δεξιά</b> <u>συντεταγμένες χωριών</u> μεταξύ των οποίων θα αναζητηθούν χωριά στο χάρτη. <br><br>Η συγκεκριμένη μέθοδος αναζήτησης εφαρμόζει ένα πλαίσιο ορθογωνίου παραλληλογράμμου στο χάρτη εντός των ορίων του οποίου θα εκτελεστεί η διαδικασία αναζήτησης χωριών βάση κριτηρίων.", 
info3:"Εισάγετε τους <b>ελάχιστους πόντους</b> των χωριών βάση των οποίων θα αναζητηθούν χωριά στο χάρτη. <br><br>Σε περίπτωση που χρησιμοποιήσετε τετραψήφιο ή πενταψήφιο αριθμό μην προσθέσετε τελεία για διαχωρισμό χιλιάδων π.χ. εισάγετε 5000 αντί για 5.000.",
info4:"Εισάγετε τους <b>μέγιστους πόντους</b> των χωριών βάση των οποίων θα αναζητηθούν χωριά στο χάρτη. <br><br>Σε περίπτωση που χρησιμοποιήσετε τετραψήφιο ή πενταψήφιο αριθμό μην προσθέσετε τελεία για διαχωρισμό χιλιάδων π.χ. εισάγετε 5000 αντί για 5.000.",
info5:"Στη συγκεκριμένη κατηγορία αναζητείτε χωριά βάση <b>απόστασης</b> από μια συγκεκριμένη συντεταγμένη στο χάρτη. Η αναζήτηση απαιτεί το καθορισμό των εξής παραμέτρων: <br><br> <b><u>Πεδία:</u></b> εισάγετε τα μέγιστα πεδία απόστασης στο χάρτη από την επιλεγμένη συντεταγμένη βάση των οποίων θα αναζητηθούν χωριά. <br><br> <b><u>Κέντρο:</u></b> εισάγετε μια συντεταγμένη στο χάρτη που θα αποτελέσει το κέντρο συμμετρίας από το οποίο θα υπολογιστούν οι αποστάσεις αναζήτησης χωριών.",
info6:"Εισάγετε ονόματα παικτών, των οποίων τα χωριά θα συμπεριληφθούν στην αναζήτηση στη καθορισμένη περιοχή χάρτη. <br><br>Προσθέστε ονόματα διαχωρίζοντας τα με <b> -- </b> π.χ. Tsalkapone--Dream Slayer",
info7:"Εισάγετε ετικέτες (όχι ονομασίες) φυλών, των οποίων τα χωριά θα συμπεριληφθούν στην αναζήτηση στη καθορισμένη περιοχή χάρτη. <br><br> Προσθέστε ετικέτες φυλών διαχωρίζοντας τες με <b> -- </b> π.χ. GO--N*M",	
info8:"Εισάγετε ονόματα παικτών, των οποίων τα χωριά θα <b><font color='red'>αποκλειστούν</font></b> από την αναζήτηση. <br><br>Προσθέστε ονόματα διαχωρίζοντας τα με <b> -- </b> π.χ. Tsalkapone--Dream Slayer",
info9:"Εισάγετε ετικέτες (όχι ονομασίες) φυλών, των οποίων τα χωριά θα <b><font color='red'>αποκλειστούν</font></b> από την αναζήτηση. <br><br> Προσθέστε ετικέτες φυλών διαχωρίζοντας τες με <b> -- </b> π.χ. GO--N*M",	
table_des:"Σχεδιασμός Πίνακα",
col_con:"Ρυθμίσεις στηλών",
col_styles:"Ρυθμίσεις εμφάνισης",
sequ:"Αρίθμηση",
col_plus:"Επιπλέον στήλη",
syn:"Συντεταγμένες",
claim_tag:"Προσθήκη του bb-code [claim] σε κάθε συντεταγμένη του πίνακα.",
points_bold:"Προσθήκη του bb-code [b] (έντονη γραφή) στους πόντους των χωριών του πίνακα.",
owner_bb:"Προσθήκη του bb-code [player] σε κάθε παίκτη του πίνακα.",
tribe_bb:"Προσθήκη του bb-code [ally] σε κάθε φυλή του πίνακα.",
seq_bb:"Προσθήκη του bb-code [b] (έντονη γραφή) και <b><font color='red'>κόκκινου χρωματισμού</font></b> σε κάθε αρίθμηση του πίνακα.",
co_tit:"Τίτλος",
col_title:"Εισαγωγή τίτλου για την πρόσθετη στήλη.",
bb_codes:"BB-Codes",
bold:"Έντονη γραφή",
bold_color:"Έντονη γραφή & χρώμα",
player_tag:"Προσθήκη του bb-code [player] σε κάθε γραμμή της συγκεκριμένης στήλης.",
t_player:"Παίκτης",
t_name:"Όνομα",
player_tag_all:"Προσθήκη συγκεκριμένου ονόματος παίκτη σε κάθε γραμμή της συγκεκριμένης στήλης.",
tribe_tag:"Προσθήκη του bb-code [tribe] σε κάθε γραμμή της συγκεκριμένης στήλης.",
t_tribe:"Φυλή",
t_tag:"Ετικέτα",
tribe_tag_all:"Προσθήκη συγκεκριμένης ετικέτας φυλής σε κάθε γραμμή της συγκεκριμένης στήλης.",
col_info:"<b>Επιλέξτε</b> οποιαδήποτε επιλογή της συγκεκριμένης στήλης για να προσθέτε μια στήλη στο πίνακα διατηρώντας την ετικέτα κάθε επιλογής ως <b>τίτλο στήλης</b>. Ο κάθε τίτλος αντιπροσωπεύει το είδος του δεδομένου κάθε εξαγώμενης συντεταγμένης που θα συμπεριληφθεί στο πίνακα. <br><br> Επιλέγοντας την επιλογή <b>Επιπλέον στήλη</b> σας προσφέρεται η δυνατότητα να εισάγετε ένα επιθυμητό τίτλο.",
tsal_links:"Χρήσιμοι Σύνδεσμοι & Πληροφορίες",
linkth:"Περιγραφή",
infoth:"Σύνδεσμοι & Πληροφορίες",
link1:"Ρυθμίσεις κόσμου",
link2:"Στατιστικά κόσμου",
link3:"Στατιστικά ανάπτυξης παικτών",
link4:"Χάρτης κατακτήσεων",
link5:"Τελευταία ενημέρωνες κατακτήσεις",
link6:"Κατακτήσεις σε παρόντα χρόνο",
link7:"Μέγιστοι πόντοι βάρβαρων",
link8:"Μέγιστη απόσταση αριστοκράτη (σε πεδία στο χάρτη)",
new_tab:"Άνοιγμα συνδέσμου σε νέα καρτέλα",
scripts_pro:"Επιλογή εμφάνισης/απόκρυψης της Παραγωγής Scripts Εντολών",
scripts_prod:"Παραγωγή Scripts Εντολών",
script1:"Fake Script No1",
script2:"Fake Script No2",
script3:"Fake scripts για φυλετικό φόρουμ ή ταχυδρομείο",
script4:"Farming Script",
script5:"Nuke/Support Script",
script_info1:"<b><u>Μέθοδος Μονάδων:</u></b> Το συγκεκριμένο script επιλέγει μόνο ένα είδος μονάδας για εισαγωγή. Η επιλογή μονάδας εξαρτάται από τη ταχύτητα των μονάδων. Αρχικά επιλέγει κριό και εν τέλει βαρύ. Δύναται να αλλάξετε τη σειρά προτεραιότητας στη μεταβλητή <b><font color='red'>Tsalkapone_units_order</font></b>. <br><br><b><font color='maroon'>Σημείωση:</font></b> Οι ανιχνευτές αποτελούν εξαίρεση στο κανόνα και η τιμή τους εισάγεται ανεξάρτητα.  <br><br> <b><u>Μέθοδος Συντεταγμένων:</u></b> Το script επιλέγει μια τυχαία συντεταγμένη από τους επιλεγμένους στόχους για εισαγωγή.",
script_info2:"<b><u>Μέθοδος Μονάδων:</u></b> Το συγκεκριμένο script επιλέγει μόνο ένα είδος μονάδας για εισαγωγή. Η επιλογή μονάδας εξαρτάται από τη ταχύτητα των μονάδων. Αρχικά επιλέγει κριό και εν τέλει βαρύ. Δύναται να αλλάξετε τη σειρά προτεραιότητας στη μεταβλητή <b><font color='red'>Tsalkapone_units_order</font></b>. <br><br><b><font color='maroon'>Σημείωση:</font></b> Οι ανιχνευτές αποτελούν εξαίρεση στο κανόνα και η τιμή τους εισάγεται ανεξάρτητα.  <br><br> <b><u>Μέθοδος Συντεταγμένων:</u></b>  Το script ακολουθεί διαδοχική επιλογή συντεταγμένων για εισαγωγή. Δύναται να επιλέξετε συγκεκριμένο στόχο από τη <b>Λίστα στόχων</b>",
script_info3:"Ο κώδικας που παρατίθεται στα δεξιά περιλαμβάνει τα εξής scripts:<br><br>1. Fake script με τις διαθέσιμες μονάδες και τυχαία επιλογή στόχου (δείτε το <b>Fake Script No1</b> για περισσότερες πληροφορίες). <br><br>2. Fake script με διαθέσιμες μονάδες και διαδοχική και συγκεκριμένη επιλογή στόχου (δείτε το <b>Fake Script No2</b> για περισσότερες πληροφορίες). <br><br>3. Fake script με κριό ή καταπέλτη και τυχαία επιλογή στόχου.<br><br> Ο κώδικας είναι συμβατός με τους bb-codes του παιχνιδιού και δύναται να επικολληθεί όπως είναι σε φυλετικό φόρουμ ή σε μήνυμα ταχυδρομείου.",
script_info4:"<b><u>Μέθοδος Μονάδων:</u></b> Το συγκεκριμένο script επιλέγει μόνο ένα είδος μονάδας για εισαγωγή. Η επιλογή μονάδας εξαρτάται από μια ρυθμιζόμενη σειρά προτεραιότητας. Αρχικά επιλέγει ελαφρύ ιππικό και εν τέλει κριό. <br><br><b><font color='maroon'>Σημείωση:</font></b> Οι ανιχνευτές αποτελούν εξαίρεση στο κανόνα και η τιμή τους εισάγεται ανεξάρτητα.  <br><br> <b><u>Μέθοδος Συντεταγμένων:</u></b> Το script επιλέγει τις συντεταγμένες με διαδοχική ακολουθία παρουσιάζοντας κάθε φορά τη σειρά του στόχου στο σύνολο.",
script_info5:"<b><u>Μέθοδος Μονάδων:</u></b> To script θα εισάγει τις επιλεγμένες τιμές κάθε μονάδας. Αν η τιμή μιας μονάδας εντός του μέρους συγκέντρωσης είναι ίση με το μηδέν τότε θα αγνοηθεί από το script. Αν είναι μικρότερη της επιλεγμένης θα εισαχθούν όλες οι εναπομείνατες μονάδες. Αν επιθυμείτε να εισάγετε όλο το πλήθος μιας μονάδας απλά επιλέξτε μια μεγάλη τιμή π.χ. 24000 ή 1e6 (=1.000.000).  <br><br> <b><u>Μέθοδος Συντεταγμένων:</u></b> Το script επιλέγει τις συντεταγμένες με διαδοχική ακολουθία παρουσιάζοντας κάθε φορά τη σειρά του στόχου στο σύνολο.",
c_results:"Αποτελέσματα Αναζήτησης",
tsal_format:"Μορφή εξαγωγής αποτελεσμάτων",
add_styles:"Πρόσθετες διαμορφώσεις αποτελεσμάτων",
style_coords:"Συντεταγμένες",
style_players:"Παίκτες",
style_tribes:"Φυλές",
style_numbering:"Στυλ αρίθμησης",
style_order:"Κάθετη/Οριζόντια διάταξη",	
style_info1:"<b>Επιλέξτε</b> για να προσθέτε την ετικέτα [claim] σε κάθε συντεταγμένη",
style_info2:"<b>Επιλέξτε</b> για να προσθέτε την ετικέτα [player] στον ιδιοκτήτη κάθε συντεταγμένης",
style_info3:"<b>Επιλέξτε</b> για να προσθέτε την ετικέτα [ally] στη φυλή κάθε ιδιοκτήτη κάθε συντεταγμένης",
style_info4:"<b>Επιλέξτε</b> για να προσθέτε την ετικέτα [b] σε κάθε αρίθμηση κάθε συντεταγμένης",
style_info5:"<b>Επιλέξτε</b> για να εφαρμόσετε κάθετη διάταξη στη μορφή αποτελεσμάτων.<br><br><b>Αποεπιλέξτε</b> για να εφαρμόσετε οριζόντια διάταξη στη μορφή αποτελεσμάτων",
data_files:"Δεδομένα αρχείων κόσμου",
data_type:"Όνομα αρχείου",
data_age:"Χρονική ηλικία αρχείου",
data_status:"Κατάσταση ανανέωσης αρχείου",
data_tribes:"Αρχείο φυλών του κόσμου",
data_players:"Αρχείο παικτών του κόσμου",
data_villages:"Αρχείο χωριών του κόσμου",
data_attention:"ΠΡΟΣΟΧΗ: Η μεταφόρτωση των αρχείων του κόσμου ενδέχεται να αργήσει μέχρι μερικά δευτερόλεπτα",
hint1:"Διαθέσιμοι κώδικες μορφοποίησης",
hint2:"Εφαρμογή αρίθμησης",
hint3:"Συντεταμένες χωριού",
hint4:"Πόντοι χωριού",
hint5:"Ονομασία χωριού",
hint6:"Όνομα ιδιοκτήτη χωριού",
hint7:"Ετικέτα φυλής ιδιοκτήτη χωριού",
hint8:"Ονομασία φυλής ιδιοκτήτη χωριού",
hint9:"Ήπειρος χωριού",
hint10:"Πόντοι φυλής ιδιοκτήτη χωριού",
hint11:"Κατάταξη φυλής ιδιοκτήτη χωριού",
hint12:"Κατάταξη ιδιοκτήτη χωριού",
hint13:"Πόντοι ιδιοκτήτη χωριού",
hint14:"Bonus χωριού",
sample_text:"Παράδειγμα τρέχουσας μορφοποίησης",
format_info:"<b>Κλικάρετε</b> πάνω στο ακόλουθο πλαίσιο για να εμφανιστούν οι διαθέσιμοι κώδικες μορφοποίησης. Οποιοδήποτε άλλο σύμβολο ή χαρακτήρα εισάγετε στο πλαίσιο, που δεν είναι πανομοιότυπο με οποιοδήποτε από τους διαθέσιμους κώδικες, θα εισαχθεί σε κάθε εξαγώμενη συντεταγμένη όπως είναι. Η σειρά εμφάνισης κάθε χαρακτήρα ή κώδικα θα τηρήσει τη θέση του στο πλαίσιο. <br><br><b>Μετακινήστε το ποντίκι</b> πάνω από την εικόνα στα αριστερά για προεπισκόπηση ενός υποτιθέμενου εξαγώμενου αποτελέσματος.",
core_info:"<b>Επιλέξτε</b> σε ένα από τα ακόλουθα πλήκτρα για να ενεργοποιήσετε την αντίστοιχη λειτουργία.<br><br><b>Αναζήτηση Χωριών:</b> αναζητήστε κάθε χωριό που πληρεί τα επιλεγμένα κριτήρια αναζήτησης.<br><br><b>Αποθήκευση Ρυθμίσεων:</b> αποθηκεύστε κάθε τιμή του script. Οι τιμές των πεδίων <u>Κέντρο</u> και <u>Περιοχή Χάρτη</u> δεν θα αποθηκευτούν. Ωστόσο, μπορείτε να αποθηκεύσετε τη τιμή του πεδίου <u>Κέντρο</u> και να την εισάγετε επιλέγοντας το πλήκτρο <u>Τελευταίο χωριό</u>.<br>Οι <u>ON-OFF</u> επιλογές θα αποθηκευτούν επίσης.<br><br><b>Επιλογή Αποτελεσμάτων:</b> επιλέξτε το κείμενο που εμφανίζεται στο πλαίσιο <u>Αποτελεσμάτων Αναζήτησης</u>",
data_info1:"Η συγκεκριμένη στήλη υποδεικνύει το χρόνο που έχει μεσολαβήσει από τη τελευταία ενημέρωση κάθε τύπου αρχείου δεδομένων",
data_info2:"Αν δεν έχετε μεταμορφώσει ένα αρχείο θα εμφανιστεί το ακόλουθο κείμενο",
data_info3:"Αν ένα αρχείο αποτελείται από δεδομένα μεγάλου μεγέθους θα μπορείτε να το ανανεώνετε οποιαδήποτε στιγμή. Σε αυτή τη περίπτωση θα εμφανιστεί η ακόλουθη εικόνα",
data_info4:"Αν ένα αρχείο δεν έχει ενημερωθεί για περισσότερο από μια ώρα ή αποτελείται από δεδομένα μεγάλου μεγέθους θα μπορείτε να το ανανεώσετε",
forum_sc1:"Fake Script No1 - Τυχαία επιλογή συντεταγμένης",
forum_sc2:"Fake Script No2 - Διαδοχική επιλογή συντεταγμένης",
forum_sc3:"Fake Script No3 - Τυχαία επιλογή, μόνο κριός ή καταπέλτης",
forum_1:"Επιλέξτε [b]T[/b] στο πληκτρολόγιό σας, εφόσον ενεργοποιήσετε το script για να λάβετε περισσότερες πληροφορίες για τις μεταβλητές του και πως μπορείτε να το ρυθμίσετε κατά βούληση",
forum_2:"Κώδικας Script",
},
	buttons:{		
			  lang_open:"Άνοιγμα επιλογής γλώσσας",
              lang_close:"Κλείσιμο επιλογής γλώσσας",  
				set_show:"Εμφάνιση",
			  set_hide:"Απόκρυψη",	
			close_popup:"Κλείσιμο παραθύρου",
			table_show:"Εμφάνιση κώδικα πίνακα",
			table_hide:"Απόκρυψη κώδικα πίνακα",
			searching:"Αναζήτηση Χωριών",
			save_set:"Αποθήκευση Ρυθμίσεων",
			results_select:"Επιλογή Αποτελεσμάτων",
			show_bonus:"Εμφάνιση Λίστας",
			hide_bonus:"Απόκρυψη Λίστας",
			cur_vil:"Τελευταίο χωριό",
			all_map:"Όλος ο Χάρτης",
			data_update:"Ανανέωση δεδομένων",
	},
     notes:{
         saved:"Οι Ρυθμίσεις αποθηκεύτηκαν επιτυχώς",
		 active:"Η Αναζήτηση Χωριών έχει ήδη ενεργοποιηθεί",
		 delayed:"Η Αναζήτηση Χωριών ενεργοποιήθηκε. Η φόρτωση του script μπορεί να διαρκέσει μερικά δευτερόλεπτα. Ευχαριστώ για την υπομονή σας",
		 up_vil:"Πρέπει να ανανεώσετε τα αρχεία δεδομένων των χωριών του κόσμου",
			up_pl:"Πρέπει να ανανεώσετε τα αρχεία δεδομένων των παικτών του κόσμου",
			up_tr:"Πρέπει να ανανεώσετε τα αρχεία δεδομένων των φυλών του κόσμου",
			last_coord:"Δεν βρέθηκαν αποθηκευμένες συντεταγμένες.",
			data_update:"Ανανέωση δεδομένων",
			searching:"Αναζήτηση χωριών. Μην διακόψετε την αναζήτηση μέχρι να ολοκληρωθεί...",
        },
};
    return tsalkapone_trans[lang];
    }());
	
	if (document.getElementById('tsalkapone_FarmFinderPopup'))
	{UI.SuccessMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> '+tsalkapone_trans.notes.active+'.', 5000);}
 
	else {
	


		{UI.SuccessMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> '+tsalkapone_trans.notes.delayed+'.', 5000);}
var tsaldiamorfwsi='<link rel="stylesheet" type="text/css" href="https://dl.dropboxusercontent.com/s/r3ov8brxa6oxoal/Tsalkapone.Advanced_Coords_Extractor.css" />';
	var	tsalbody='<style>';
tsalbody+='.tsalkembed1{ font-family: "Comic Sans MS", cursive, sans-serif;font-style:italic;color: gold;-webkit-animation: mymove1 3s infinite; -moz-animation: mymove1 3s infinite; animation: mymove1 6s infinite;font-weight: bold;}';
tsalbody+='@-webkit-keyframes mymove1 {50% {color: red;}} @-moz-keyframes mymove1 {50% {color: red;}} @keyframes mymove1 {50% {color:red;}';
tsalbody+='</style>';

$("head").append(tsaldiamorfwsi+tsalbody);


    var lang_img='';
        if (lang=="greek") {lang_img ='<img title="Ελληνικά" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif">';}
        else if (lang=="english") {lang_img ='<img height="20px" style="cursor:help;" title="English/American" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif">';}
	
	var win=(window.main||self);

	var script={
		id:'{AD48DC2A-89F2-4B3D-A9E3-E9352A763DA0}',
		name:'Advanced Coords Extractor',
		version:1.01,
		minGameVersion:7.00,
		author:{
			name:'Tsalkapone',
			email:'tsalkapone@hotmail.com',
			url:'https://forum.tribalwars.net/index.php?members/tsalkapone.114063/'
		},
		credit:'',
		runOnce:true
	};

	// Replace these strings with the correct language translation.
	var config={
		'userMsg':{
		}
	};

	// ........................................................................
	function fnAjax(url,method,params,type,isAsync,callback){
		var payload=null;
		
		$.ajax({
			'async':isAsync,
			'url':url,
			'data':params,
			'dataType':type,
			'type':String(method||'GET').toUpperCase(),
			'error':function(req,status,err){throw(status);},
			'success':function(data,status,req){if(!isAsync){payload=data;}if(typeof(callback)=='function'){callback(data,status,req);}}
		});
		
		if(!isAsync){
			if(typeof(callback)=='function'){
				callback(payload);
			}

			return payload;
		}
	} // fnAjax
	// ........................................................................
	
function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      myFunction(xmlhttp);
    }
  };
  xmlhttp.open("GET", "/interface.php?func=get_config", true);
  xmlhttp.send();
}
function myFunction(xml) {
  var xmlDoc = xml.responseXML;
  var table="";
  var x = xmlDoc.getElementsByTagName("config")[0];
  var x1=x.getElementsByTagName('barbarian_max_points')[0].childNodes[0].textContent; /* or textContent */
  var x2=x.getElementsByTagName('max_dist')[0].childNodes[0].textContent;
localStorage.setItem('barb_max',x1);
localStorage.setItem('snob_dist',x2);
  }

loadXMLDoc();
  var pageurltsal = window.location.href;
    var pageurltsal1 = pageurltsal.split("//");
    var pageurltsal2 = pageurltsal1[1].split("/");
    var pageurltsal3 = pageurltsal1[1].split(".");
    var pageurltsal5 = pageurltsal3[2].split("/");
	 var xwra ='';
    if (game_data.market != "en") { xwra = game_data.market+"."; }
    var pageurltsal4 = pageurltsal3[1]+"."+pageurltsal5[0];
	 var Tsalsite1='http://' +xwra+'twstats.com/' + game_data.world +    '/index.php?page=ennoblements&live=live';
        var Tsalsite2='https://' + pageurltsal2[0] +    '/stat.php?mode=settings';
        var Tsalsite3='https://' + pageurltsal2[0] +    '/stat.php';
    var Tsalsite4='http://' +xwra+'twstats.com/' + game_data.world +    '/index.php?page=ennoblements';
    var Tsalsite5='http://' +xwra+'twstats.com/' + game_data.world +    '/index.php?page=growth_rankings';
    var Tsalsite6='http://' +xwra+'twstats.com/' + game_data.world +    '/index.php?page=conquer_map';
	
	
	
	
	function fnExecute(branch,debugEnabled){try{
		var villagesDAT=null;
		var playersDAT=null;
		var tribesDAT=null;
		var resultCoords=[];
		var detail={};
		
			
		// ........................................................................
		function fnBuildPlayerIDList(playerNames){
			var playerIDList=null;
			
			if(playerNames&&(playerNames.length>0)){
				playerIDList=[];
				
				$.each(playerNames,function(i,e){
					var name=e.toLowerCase();
					
					if(playersDAT[name]){
						playerIDList.push(playersDAT[name].id);
					}
				});
			}
			
			return playerIDList;
		} // fnBuildPlayerIDList
		// ........................................................................
		function fnBuildTribeIDList(tribeTags){
			var tribeIDList=null;
			
			if(tribeTags&&(tribeTags.length>0)){
				tribeIDList=[];

				$.each(tribeTags,function(i,e){
					var tag=e.toLowerCase();
				
					if(tribesDAT[tag]){
						tribeIDList.push(tribesDAT[tag].id);
					}
				});
			}
			
			return tribeIDList;
		} //fnBuildTribeIDList
		// ........................................................................
		function fnFindPlayer(playerID){
			var player=null;
			
			$.each(playersDAT,function(i,e){
				if(e.id==playerID){
					player=e;
					return true;
				}
			});
			
			return player;
		} //fnFindPlayer
		// ........................................................................
		function fnFindTribe(tribeID){
			var tribe=null;
			
			$.each(tribesDAT,function(i,e){
				if(e.id==tribeID){
					tribe=e;
					return true;
				}
			});
			
			return tribe;
		} //fnFindTribe
		// ........................................................................
		function Point(x,y){return {'x':x,'y':y};}
		// ........................................................................
		function Rect(top,left,bottom,right){return {'top':top,'left':left,'bottom':bottom,'right':right};}
		// ........................................................................
		function pointInRect(point,rect){return(point.x>=rect.left&&point.x<=rect.right&&point.y>=rect.top&&point.y<=rect.bottom);}
		// ........................................................................
		function fnIsInsideRegion(coord,mapRegion){
			var tempCoord1=twUtil.extractCoord(coord);
			if(!tempCoord1){
				return false;
			}
			
			var tempCoord2=twUtil.extractCoord(mapRegion.topLeft);
			if(!tempCoord2){
				return false;
			}
			
			var tempCoord3=twUtil.extractCoord(mapRegion.bottomRight);
			if(!tempCoord3){
				return false;
			}
			
			tempCoord1=tempCoord1.split('|');
			tempCoord2=tempCoord2.split('|');
			tempCoord3=tempCoord3.split('|');
			
			// ##################################################################
			// HACK: not sure why I need to reverse the x/y co-ordinates here ???			
			// ##################################################################
			var point=Point(tempCoord1[1],tempCoord1[0]);
			// ##################################################################

			var rect=Rect(tempCoord2[0],tempCoord2[1],tempCoord3[0],tempCoord3[1]);
			
			return pointInRect(point,rect);
		} // fnIsInsideRegion
		// ........................................................................
		
		function fnFindFarms(){
			
			twUtil.debug('<span style="color:gray;">CALL: fnFindFarms()...</span>');
			
			var alertMsg='<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font><br><br>';
			if(!(villagesDAT&&$.trim(JSON.stringify(villagesDAT)))){
				alertMsg+='<font color=white><b>'+tsalkapone_trans.notes.up_vil+'</b></font><br>';
			}
			if(!(playersDAT&&$.trim(JSON.stringify(playersDAT)))){
				alertMsg+='<font color=white><b>'+tsalkapone_trans.notes.up_pl+'</b></font><br>';
			}
			if(!(tribesDAT&&$.trim(JSON.stringify(tribesDAT)))){
				alertMsg+='<font color=white><b>'+tsalkapone_trans.notes.up_tr+'</b></font><br>';
			}
			if(!(villagesDAT&&$.trim(JSON.stringify(villagesDAT))) || !(playersDAT&&$.trim(JSON.stringify(playersDAT))) || !(tribesDAT&&$.trim(JSON.stringify(tribesDAT)))){
				UI.ErrorMessage(alertMsg, 10000);
				

				return;
			}
				
			
			var curConfig=fnCurrentConfig();
			
			//NOTE: these fields are not part of the std config (we don't want to save it)
			var srcCoord=twUtil.extractCoord((curConfig.radius>0)?$.trim($('#tsalkapone_RadiusCentre').val()):'')||win.game_data.village.coord;
			var	mapRegion={
				topLeft:twUtil.extractCoord($.trim($('#tsalkapone_MRTopLeft').val()))||'000|000',
				bottomRight:twUtil.extractCoord($.trim($('#tsalkapone_MRBottomRight').val()))||'999|999',
			};
			var hasPlayerFilter1=!!$.trim($('#tsalkapone_exPlayers').val());
			var hasTribeFilter1=!!$.trim($('#tsalkapone_exTribes').val());
			var hasPlayerFilter=!!$.trim($('#tsalkapone_Players').val());
			var hasTribeFilter=!!$.trim($('#tsalkapone_Tribes').val());
					
			// Build PlayerID List.
			// TODO...
			var playerIDs=fnBuildPlayerIDList(curConfig.players);
			var playerIDs1=fnBuildPlayerIDList(curConfig.explayers);
			
			//Build TribeID List.
			// TODO...
			var tribeIDs=fnBuildTribeIDList(curConfig.tribes);
			var tribeIDs1=fnBuildTribeIDList(curConfig.extribes);
			
			// Reset the co-ordinates.
			resultCoords=[];
			
			$.each(villagesDAT,function(i,e){
				var player=null;
				var tribe=null;  

				// Ignore your own villages.
		/*		if(curConfig.myvillages){
				if(e.ownerID==win.game_data.player.id){
					player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
					resultCoords.push(e.coord);
						detail[e.coord]={village:e,player:player,tribe:tribe};   // TODO: allow your own villages.
					return true;
				}
				} */

				// Min Points Filter.
				if((curConfig.minPoints>=0)&&(e.points<curConfig.minPoints)){
					return true;
				}
				
				// Max Points Filter.
				if((curConfig.maxPoints>=0)&&(e.points>curConfig.maxPoints)){
					return true;
				}
				
				// Radius Filter.
				if((curConfig.radius>0)&&srcCoord&&(twUtil.fields(srcCoord,e.coord)>curConfig.radius)){
					return true;
				}
				
				// Map Region Filter.
				if(!fnIsInsideRegion(e.coord,mapRegion)){
					return true;
				}
				
				// Continent Filter.
				if(curConfig.continents&&(curConfig.continents.length>0)&&(curConfig.continents.indexOf(e.continent)<0)){
					return true;
				}
				
				// All villages Filter.
				if(curConfig.AllVillages){
					
				player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
					if(e.ownerID==win.game_data.player.id&&!curConfig.myvillages){
					
					return true;
				}
				if (!curConfig.mytribe&&player.tribeID==win.game_data.player.ally&&e.ownerID!=win.game_data.player.id){
							return true;
						}
				
				
				else{
					player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
					resultCoords.push(e.coord);
						detail[e.coord]={village:e,player:player,tribe:tribe};   
					return true;
				}
				
			}
			// Selected Criteria Filter
			
					else if(curConfig.Selectedcriteria){
						
					player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
			
					// Player Filter.
					if(hasPlayerFilter1&&playerIDs1&&(playerIDs1.indexOf(e.ownerID)>=0)){
						
						return true;
					}
					
					// Tribe Filter.
					if(hasTribeFilter1&&tribeIDs1){
						if(player&&player.tribeID&&(tribeIDs1.indexOf(player.tribeID)>=0)){					
						
							return true;
					}		}	
						
						
					if (curConfig.mytribe){
							player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
					if(player.tribeID==win.game_data.player.ally&&e.ownerID!=win.game_data.player.id){
						resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
						return true;
					}
						}
						else if (e.tribeID==win.game_data.player.ally){
							return true;
						}

			if(!curConfig.myvillages) {
					if(e.ownerID==win.game_data.player.id){
					
					return true;
			}}
			else if (e.ownerID==win.game_data.player.id){
					player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
					resultCoords.push(e.coord);
						detail[e.coord]={village:e,player:player,tribe:tribe};   // TODO: allow your own villages.
					return true;
				}
						// No tribe Filter.
				if(curConfig.Notribe){
					player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
					if(e.ownerID>0&&player.tribeID==0){
						resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
						return true;
					}
				}
				
				// With tribe Filter.
				if(curConfig.Yestribe){
					player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
					if(e.ownerID>0&&player.tribeID>0){
						resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
						return true;
					}
				}

				// Barb Filter.
				if(curConfig.barbsOnly){
					if(!e.ownerID){
						resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:null,tribe:null};
						return true;
					}	
					
				}
				
				player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
					
					// Player Filter.
					if(hasPlayerFilter&&playerIDs&&(playerIDs.indexOf(e.ownerID)>=0)){
						resultCoords.push(e.coord);
						detail[e.coord]={village:e,player:player,tribe:tribe};
						return true;
					}
					
					// Tribe Filter.
				else	if(hasTribeFilter&&tribeIDs){
						if(player&&player.tribeID&&(tribeIDs.indexOf(player.tribeID)>=0)){					
							resultCoords.push(e.coord);
							detail[e.coord]={village:e,player:player,tribe:tribe};
							return true;
						}	
				
				
				}	}
			
				else if(curConfig.tsalvillages){
				// Bonus Hunters template.
if(curConfig.tsalchoices == "tsal_ch1"){
if(e.bonus>0 && e.ownerID>0){
			player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
						resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
						return true;
					}	
					
				}
				
				// Ghost Barbarians template
		if(curConfig.tsalchoices == "tsal_ch2"){		
				var pontoi = localStorage.getItem('barb_max');
				var orio = Number(pontoi)+500;
			if(e.points>orio && !e.ownerID){
			
						resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:null,tribe:null};
						return true;
					}	
		}
		// The Train Stop template
		if(curConfig.tsalchoices == "tsal_ch3"){	
		var apostasi = localStorage.getItem('snob_dist');
		player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
		if(srcCoord&&(twUtil.fields(srcCoord,e.coord)<=apostasi)&&e.ownerID!=win.game_data.player.id&&player.tribeID!=win.game_data.player.ally){
			
					resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
					return true;
				}
				
				}
				// Foreign Fortresses template
		if(curConfig.tsalchoices == "tsal_ch4"){	
		player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
		if (e.bonus>=4 && e.bonus<=7 && e.ownerID>0 && e.ownerID!=win.game_data.player.id&&player.tribeID!=win.game_data.player.ally) {
			
					resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
					return true;
				}
				
				}
				// Veterans template
		if(curConfig.tsalchoices == "tsal_ch5"){
		
		player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
					
		if (e.ownerID<win.game_data.player.id) {
			
					resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
					return true;
				}
				
				}
				// Rookies template
		if(curConfig.tsalchoices == "tsal_ch6"){	
		player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
		if (e.ownerID>0 && e.ownerID>win.game_data.player.id) {
			
					resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
					return true;
				}
				
				}
				// The Gold Mines template
		if(curConfig.tsalchoices == "tsal_ch7"){	
		player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
		if (e.bonus>=1 && e.bonus<=3 && e.ownerID!=win.game_data.player.id&&player.tribeID!=win.game_data.player.ally && e.points >=5000|| e.bonus==8 && e.ownerID!=win.game_data.player.id&&player.tribeID!=win.game_data.player.ally && e.points>=5000 || e.points >=9000 && e.ownerID!=win.game_data.player.id&&player.tribeID!=win.game_data.player.ally ) {
			
					resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
					return true;
				}
				
				}
				// The Unbroken Villages
		if(curConfig.tsalchoices == "tsal_ch8"){	
		player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
		if (e.bonus==7 && e.ownerID>0 && e.ownerID!=win.game_data.player.id&&player.tribeID!=win.game_data.player.ally) {
			
					resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
					return true;
				}
				
				}
					}
				
					
				else if(curConfig.Bonusvillages){
					player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
					if (curConfig.mytribe&&player.tribeID==win.game_data.player.ally){
					
						resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
							return true;
						}
						if(e.ownerID==win.game_data.player.id&&curConfig.myvillages){
							
						resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
							return true;
				}
	
				// Bonus filter 0.
if(curConfig.tsalbonus0){
if(e.bonus==0 && !e.ownerID ){
					player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
						resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
						return true;
					}	
					
				}
				
// Bonus filter 1.
if(curConfig.tsalbonus1){
if(e.bonus == 1){
					player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
						resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
						return true;
					}	
					
				}
				
				// Bonus filter 2.
if(curConfig.tsalbonus2){
if(e.bonus == 2){
					player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
						resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
						return true;
					}	
					
				}
				
				// Bonus filter 3.
if(curConfig.tsalbonus3){
if(e.bonus == 3){
					player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
						resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
						return true;
					}	
					
				}
				
				// Bonus filter 4.
if(curConfig.tsalbonus4){
if(e.bonus == 4){
					player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
						resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
						return true;
					}	
					
				}
				
				// Bonus filter 5.
if(curConfig.tsalbonus5){
if(e.bonus == 5){
					player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
						resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
						return true;
					}	
					
				}
				
				// Bonus filter 6.
if(curConfig.tsalbonus6){
if(e.bonus == 6){
					player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
						resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
						return true;
					}	
					
				}
				
				// Bonus filter 7.
if(curConfig.tsalbonus7){
if(e.bonus == 7){
					player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
						resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
						return true;
					}	
					
				}
				
				// Bonus filter 8.
if(curConfig.tsalbonus8){
if(e.bonus == 8){
					player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
						resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
						return true;
					}	
					
				}
				
				// Bonus filter 9.
if(curConfig.tsalbonus9){
if(e.bonus == 9){
					player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
						resultCoords.push(e.coord);
					detail[e.coord]={village:e,player:player,tribe:tribe};
						return true;
					}	
					
				}
				
				}	
	
			});
			
			// Sort the co-ordinates.
			resultCoords=resultCoords.sort(function(a,b){return twUtil.fields(srcCoord,a)-twUtil.fields(srcCoord,b);});

			fnDisplayOutput();
			$('#tsalkapone_CoordCount').text('('+resultCoords.length+')');
		} // fnFindFarms
		// ........................................................................
		function fnCurrentConfig(){
			return{
				barbsOnly:$('#tsalkapone_BarbOnly').is(':checked'),
				radiuscenter:$('#tsalkapone_RadiusCentre').val(), 
			myvillages:$('#tsalkapone_MyVil').is(':checked'),
			mytribe:$('#tsalkapone_Mytribe').is(':checked'),
				tsalchoices:$('#tsalkapone_choices').val(),
				tsalbonus0:$('#tsal_bonus0').is(':checked'),
				tsalbonus1:$('#tsal_bonus1').is(':checked'),
				tsalbonus2:$('#tsal_bonus2').is(':checked'),
				tsalbonus3:$('#tsal_bonus3').is(':checked'),
				tsalbonus4:$('#tsal_bonus4').is(':checked'),
				tsalbonus5:$('#tsal_bonus5').is(':checked'),
				tsalbonus6:$('#tsal_bonus6').is(':checked'),
				tsalbonus7:$('#tsal_bonus7').is(':checked'),
				tsalbonus8:$('#tsal_bonus8').is(':checked'),
				tsalbonus9:$('#tsal_bonus9').is(':checked'),
				Notribe:$('#tsalkapone_Notribe').is(':checked'),
				Yestribe:$('#tsalkapone_Yestribe').is(':checked'),
				AllVillages:$('#tsalkapone_AllVillages').is(':checked'),
				tsalset1:$('#tsalset1').is(':checked'),
				tsalset2:$('#tsalset2').is(':checked'),
				tsalset3:$('#tsalset3').is(':checked'),
				tsalset4:$('#tsalset4').is(':checked'),
				tsalset5:$('#tsalset5').is(':checked'),
				tsalset6:$('#tsalset6').is(':checked'),
				tsalset7:$('#tsalset7').is(':checked'),
				Bonusvillages:$('#tsalkapone_Bonusvillages').is(':checked'),
				tsalvillages:$('#tsalkapone_tsalvillages').is(':checked'),
				Selectedcriteria:$('#tsalkapone_Selectedcriteria').is(':checked'),
				continents:$.map(($('#tsalkapone_Continents').val()||'').match(/\d+/g)||[],function(e){return twUtil.int(e);}),
				minPoints:twUtil.int($('#tsalkapone_MinPoints').val()||'-1',10),
				maxPoints:twUtil.int($('#tsalkapone_MaxPoints').val()||'-1',10),
				radius:$.trim($('#tsalkapone_Radius').val())||'-1',
				players:($.trim($('#tsalkapone_Players').val())||'').split('--'),
				tribes:($.trim($('#tsalkapone_Tribes').val())||'').split('--'),
				explayers:($.trim($('#tsalkapone_exPlayers').val())||'').split('--'),
				extribes:($.trim($('#tsalkapone_exTribes').val())||'').split('--'),
				bbEncoded:$('#tsalkapone_BBEncoded').is(':checked'),
				bbplayerEncoded:$('#tsalBBplayerEncoded').is(':checked'),
				bbtribeEncoded:$('#tsalBBtribeEncoded').is(':checked'),
				bb1Encoded:$('#tsalBB1Encoded').is(':checked'),
				bb4Encoded:$('#tsalBB4Encoded').is(':checked'),
				bb2Encoded:$('#tsalBB2Encoded').is(':checked'),
				bb3Encoded:$('#tsalBB3Encoded').is(':checked'),
				bb21Encoded:$('#tsalBB21Encoded').is(':checked'),
				bb31Encoded:$('#tsalBB31Encoded').is(':checked'),
				bb22Encoded:$('#tsalBB22Encoded').is(':checked'),
				bb32Encoded:$('#tsalBB32Encoded').is(':checked'),
                                tsalEncoded:$('#tsalBBEncoded').is(':checked'),
				tsalsyn:$('#Tsalsyntetagmenes').is(':checked'),
				tsalbbmetritis:$('#TsalBBmet').is(':checked'),
				tsalmetrisi:$('#Tsalmet1').is(':checked'),
				tsalbbmetrisi:$('#TsalBBmet1').is(':checked'),
				tsalpaiktis:$('#Tsalowner').is(':checked'),
				tsalpontoi:$('#Tsalpoints').is(':checked'),
				tsalfules:$('#Tsaltribe').is(':checked'),
				tsalpros:$('#Tsalpros').is(':checked'),
				tsalpros1:$('#Tsalpros1').is(':checked'),
				format:$.trim($('#tsalkapone_Format').val())||'{c}'
			};
		} // fnCurrentConfig
		// ........................................................................
		function fnLoadConfig(){
			var curConfig=twCache.fetch(script.id+'.config')||{
				barbsOnly:false,
				myvillages:false,
				mytribe:false,
				tsalchoices:undefined,
				tsalbonus0:false,
				tsalbonus1:false,
				tsalbonus2:false,
				tsalbonus3:false,
				tsalbonus4:false,
				tsalbonus5:false,
				tsalbonus6:false,
				tsalbonus7:false,
				tsalbonus8:false,
				tsalbonus9:false,
				Notribe:false,
				Yestribe:false,
				AllVillages:true,
				tsalset1:true,
				tsalset2:false,
				tsalset3:false,
				tsalset4:true,
				tsalset5:false,
				tsalset6:true,
				tsalset7:true,
				Bonusvillages:false,
				tsalvillages:false,
				Selectedcriteria:false,
				continents:undefined,
				minPoints:-1,
				maxPoints:-1,
				radius:25,
				players:undefined,
				tribes:undefined,
				bbEncoded:false,
				bbplayerEncoded:false,
				bbtribeEncoded:false,
				bb1Encoded:false,
				bb4Encoded:false,
				bb2Encoded:false,
				bb3Encoded:false,
				bb21Encoded:false,
				bb31Encoded:false,
				bb22Encoded:false,
				bb32Encoded:false,
				tsalsyn:true,
				tsalpaiktis:false,
       				tsalpontoi:false,
				tsalbbmetritis:false,
				tsalmetrisi:false,
				tsalbbmetrisi:false,
				tsalfules:false,
				tsalpros:false,
				tsalpros1:false,
				radiuscenter:win.game_data.village.coord, 
                                tsalEncoded:true,
				format:'{c}'
			};
			
			if(curConfig.players=='*** Coming Soon ***'){
				curConfig.players=undefined;
			}
			
			if(curConfig.tribes=='*** Coming Soon ***'){
				curConfig.tribes=undefined;
			}
			$('#tsalkapone_choices').val(curConfig.tsalchoices);
			$('#tsalkapone_MyVil').attr('checked',curConfig.myvillages);
			$('#tsalkapone_Mytribe').attr('checked',curConfig.mytribe);
			$('#tsal_bonus0').attr('checked',curConfig.tsalbonus0);
			$('#tsal_bonus1').attr('checked',curConfig.tsalbonus1);
			$('#tsal_bonus2').attr('checked',curConfig.tsalbonus2);
			$('#tsal_bonus3').attr('checked',curConfig.tsalbonus3);
			$('#tsal_bonus4').attr('checked',curConfig.tsalbonus4);
			$('#tsal_bonus5').attr('checked',curConfig.tsalbonus5);
			$('#tsal_bonus6').attr('checked',curConfig.tsalbonus6);
			$('#tsal_bonus7').attr('checked',curConfig.tsalbonus7);
			$('#tsal_bonus8').attr('checked',curConfig.tsalbonus8);
			$('#tsal_bonus9').attr('checked',curConfig.tsalbonus9);
			$('#tsalkapone_Notribe').attr('checked',curConfig.Notribe);
			$('#tsalkapone_Yestribe').attr('checked',curConfig.Yestribe);
			$('#tsalkapone_AllVillages').attr('checked',curConfig.AllVillages);
			$('#tsalset1').attr('checked',curConfig.tsalset1);
			$('#tsalset2').attr('checked',curConfig.tsalset2);
			$('#tsalset3').attr('checked',curConfig.tsalset3);
			$('#tsalset4').attr('checked',curConfig.tsalset4);
			$('#tsalset5').attr('checked',curConfig.tsalset5);
			$('#tsalset6').attr('checked',curConfig.tsalset6);
			$('#tsalset7').attr('checked',curConfig.tsalset7);
			$('#tsalkapone_Bonusvillages').attr('checked',curConfig.Bonusvillages);
			$('#tsalkapone_tsalvillages').attr('checked',curConfig.tsalvillages);
			$('#tsalkapone_Selectedcriteria').attr('checked',curConfig.Selectedcriteria);
			$('#tsalkapone_Continents').val((curConfig.continents||[]).join(','));
			$('#tsalkapone_MRTopLeft').val('000|000');
			$('#tsalkapone_MRBottomRight').val('999|999');
			$('#tsalkapone_MinPoints').val((curConfig.minPoints>=0)?curConfig.minPoints:'');
			$('#tsalkapone_MaxPoints').val((curConfig.maxPoints>=0)?curConfig.maxPoints:'');
			$('#tsalkapone_BBEncoded').attr('checked',curConfig.bbEncoded);
			$('#tsalBBplayerEncoded').attr('checked',curConfig.bbplayerEncoded);
			$('#tsalBBtribeEncoded').attr('checked',curConfig.bbtribeEncoded);
			$('#tsalBB1Encoded').attr('checked',curConfig.bb1Encoded);
			$('#tsalBB4Encoded').attr('checked',curConfig.bb4Encoded);
			$('#tsalBB2Encoded').attr('checked',curConfig.bb2Encoded);
			$('#tsalBB3Encoded').attr('checked',curConfig.bb3Encoded);
			$('#tsalBB21Encoded').attr('checked',curConfig.bb21Encoded);
			$('#tsalBB31Encoded').attr('checked',curConfig.bb31Encoded);
			$('#tsalBB22Encoded').attr('checked',curConfig.bb22Encoded);
			$('#tsalBB32Encoded').attr('checked',curConfig.bb32Encoded);
                        $('#tsalBBEncoded').attr('checked',curConfig.tsalEncoded);
			$('#Tsalpoints').attr('checked',curConfig.tsalpontoi);
			$('#Tsalsyntetagmenes').attr('checked',curConfig.tsalsyn);
			$('#TsalBBmet').attr('checked',curConfig.tsalbbmetritis);
			$('#TsalBBmet1').attr('checked',curConfig.tsalbbmetrisi);
			$('#Tsalmet1').attr('checked',curConfig.tsalmetrisi);
			$('#Tsalowner').attr('checked',curConfig.tsalpaiktis);
			$('#Tsaltribe').attr('checked',curConfig.tsalfules);
			$('#Tsalpros').attr('checked',curConfig.tsalpros);
			$('#Tsalpros1').attr('checked',curConfig.tsalpros1);
			$('#tsalkapone_Radius').val((parseFloat(curConfig.radius||'0.0')>0.0)?curConfig.radius:'');
/*	$('#tsalkapone_RadiusCentre').val(curConfig.radiuscenter||win.game_data.village.coord); */
			$('#tsalkapone_RadiusCentre').val(win.game_data.village.coord);
			$('#tsalkapone_Players').val((curConfig.players||[]).join(','));
			$('#tsalkapone_Tribes').val((curConfig.tribes||[]).join(','));
			$('#tsalkapone_exPlayers').val((curConfig.explayers||[]).join(','));
			$('#tsalkapone_exTribes').val((curConfig.extribes||[]).join(','));
			$('#tsalkapone_Format').val(curConfig.format||'{c}');
		} // fnLoadConfig
		// ........................................................................
		function fnSaveConfig(){
			twCache.store(script.id+'.config',fnCurrentConfig());
			UI.SuccessMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> '+tsalkapone_trans.notes.saved+'', 5000);
		} // fnSaveConfig
		// ........................................................................
	function	fnTsalcoords(){
		var x = document.getElementById('tsalkapone_RadiusCentre').value;
		localStorage.setItem('last_coord',x);
	}//fnTsalcoords
		// ........................................................................
		function Tsalkaponebackground() {
		var y=	document.getElementById('tsal_back_style'); 
		var x = document.getElementById('tsalset6').checked;
		var x1 = 'https://dl.dropboxusercontent.com/s/2hmdpx3fmu93zix/xruAdS3.jpg';
		var x2 = '/graphic/background/bg-tile.jpg';
		if (x == true) { y.style.backgroundImage="url('"+x1+"')";}
		else { y.style.backgroundImage="url('"+x2+"')";}
		}
		//fnTsalkaponebackground
		// ........................................................................
		function fnTsalkaponemagic(){
	var x1 = document.getElementById('tsalsettings');
var x2 = document.getElementById('tsalsxediasmos');
if (x1.style.display == "none" && x2.style.display == "none")
{setTimeout(function(){document.getElementById('olakena').innerHTML = '<iframe width="500" height="350" src="https://www.youtube.com/embed/aop1Fn-IBzQ?loop=1;autoplay=1;" frameborder="0" allowfullscreen></iframe>';},500);}
else {document.getElementById('olakena').innerHTML = '';}	
		}	
		//fnTsalkaponemagic
		// ........................................................................
		function tsalkaponemagic(x) {
var tsal_check = document.getElementById(x).checked;
		var tsal_ele = document.getElementsByClassName(x);
if (tsal_check == true)
{for(var i =0, il = tsal_ele.length;i<il;i++){
     tsal_ele[i].style.display="";}}
		else {for(var i =0, il = tsal_ele.length;i<il;i++){
     tsal_ele[i].style.display="none";}}
	}
	//tsalkaponemagic
		// ........................................................................
		function fnDisplayOutput(){
			var isBBEncoded=$('#tsalkapone_BBEncoded').is(':checked');
			var isBBplayerEncoded=$('#tsalBBplayerEncoded').is(':checked');
				var isBBtribeEncoded=$('#tsalBBtribeEncoded').is(':checked');
				var isBB1Encoded=$('#tsalBB1Encoded').is(':checked');
				var isBB4Encoded=$('#tsalBB4Encoded').is(':checked');
				var isBB2Encoded=$('#tsalBB2Encoded').is(':checked');
				var isBB3Encoded=$('#tsalBB3Encoded').is(':checked');

				var isBB21Encoded=$('#tsalBB21Encoded').is(':checked');
				var isBB31Encoded=$('#tsalBB31Encoded').is(':checked');
				var isBB22Encoded=$('#tsalBB22Encoded').is(':checked');
				var isBB32Encoded=$('#tsalBB32Encoded').is(':checked');
			var istsalbbmetritis=$('#TsalBBmet').is(':checked');
                        var istsalEncoded=$('#tsalBBEncoded').is(':checked');
var istsalpontoi=$('#Tsalpoints').is(':checked');
var istsalfules=$('#Tsaltribe').is(':checked');
var istsalpros=$('#Tsalpros').is(':checked');
var istsalpros1=$('#Tsalpros1').is(':checked');
var istsalsyn=$('#Tsalsyntetagmenes').is(':checked');
var istsalbbmetrisi=$('#TsalBBmet1').is(':checked');
var istsalmetrisi=$('#Tsalmet1').is(':checked');
var istsalpaiktis=$('#Tsalowner').is(':checked');
			
			var format=$.trim($('#tsalkapone_Format').val());
			
			if(format){
				var output='';

var tsaltable='';
var tsalmenu1='';
var tsalmenu2='';
var tsalmenu3='';
var tsalmenu4='';
var tsalmenu5='';
var tsalmenu6='';
var tsalmenu7='';
var tsalgrammes='';
                var tsalxwria='';
var tsaltitlos=document.getElementById("Tsalstili1").value;
var tsaltitlos1=document.getElementById("Tsalstili2").value;
var tsalkapone1=document.getElementById("Tsalper1").value;
var tsalkapone2=document.getElementById("Tsalper2").value;
var tsalkapone3=document.getElementById("Tsalper3").value;
var tsalkapone4=document.getElementById("Tsalper4").value;
var tsalbb21=document.getElementById("tsalBB21Encoded");
var tsalbb31=document.getElementById("tsalBB31Encoded");
var tsalbb22=document.getElementById("tsalBB22Encoded");
var tsalbb32=document.getElementById("tsalBB32Encoded");
var tsal21=document.getElementById("Tsalper1");
var tsal31=document.getElementById("Tsalper2");
var tsal22=document.getElementById("Tsalper3");
var tsal32=document.getElementById("Tsalper4");

if (isBB21Encoded) 
{tsalbb31.disabled = true;  tsal31.disabled = true; tsalbb31.checked = false;} 
if (isBB31Encoded) {tsalbb21.disabled = true; tsal21.disabled = true; tsalbb21.checked = false;}
if (!isBB31Encoded && !isBB21Encoded) {tsalbb31.disabled = false;  tsal31.disabled = false; tsal21.disabled = false; tsalbb21.disabled = false;}

if (isBB22Encoded) 
{tsalbb32.disabled = true;  tsal32.disabled = true; tsalbb32.checked = false;} 
if (isBB32Encoded) {tsalbb22.disabled = true; tsal22.disabled = true; tsalbb22.checked = false;}
if (!isBB32Encoded && !isBB22Encoded) {tsalbb32.disabled = false;  tsal32.disabled = false; tsal22.disabled = false; tsalbb22.disabled = false;}


				$.each(resultCoords,function(i,e){

					var village=detail[e].village;
					var player=detail[e].player;
					var tribe=detail[e].tribe;
					var tsalkapone_bonus=detail[e].village.bonus;
					
					if(player&&!player.id){
						player=null;
					}
					
					if(tribe&&!tribe.id){
						tribe=null;
					}
					
					twUtil.debug(JSON.stringify(player)+'<br/>'+JSON.stringify(tribe)+'<br/><br/>');
var realCount = 0;
                for (var j = 0; j <= i; j++) {
                    if (resultCoords[j] != null) {
                        realCount++;
                    }
                }
				var vil_bonus ='';
	
	if (tsalkapone_bonus == 1){vil_bonus =''+tsalkapone_trans.general.wood_bonus+'';}
	else if (tsalkapone_bonus == 8){vil_bonus =''+tsalkapone_trans.general.res_bonus+'';}
	else if (tsalkapone_bonus == 2){vil_bonus =''+tsalkapone_trans.general.stone_bonus+'';}
	else if (tsalkapone_bonus == 3){vil_bonus =''+tsalkapone_trans.general.iron_bonus+'';}
	else if (tsalkapone_bonus == 4){vil_bonus =''+tsalkapone_trans.general.farm_bonus+'';}
	else if (tsalkapone_bonus == 5){vil_bonus =''+tsalkapone_trans.general.inf_bonus+'';}
	else if (tsalkapone_bonus == 6){vil_bonus =''+tsalkapone_trans.general.cav_bonus+'';}
	else if (tsalkapone_bonus == 7){vil_bonus =''+tsalkapone_trans.general.gar_bonus+'';}
	else if (tsalkapone_bonus == 9){vil_bonus =''+tsalkapone_trans.general.mer_bonus+'';}
	else if (player === null){vil_bonus =''+tsalkapone_trans.general.barb_vil+'';}
	
			
					output+=format
						.replace(/\{ct\}/ig,(istsalbbmetritis?'[b]'+realCount+'.[/b]':''+realCount+'.'))
						.replace(/\{c\}/ig,(isBBEncoded?'[claim]'+e+'[/claim]':e))
						.replace(/\{cp\}/ig,village.points)
						.replace(/\{cn\}/ig,village.name)
						.replace(/\{p\}/ig,player?(isBBplayerEncoded?'[player]'+player.name+'[/player]':player.name):'')
						.replace(/\{tn\}/ig,tribe?tribe.name:'')
						.replace(/\{pr\}/ig,player?player.rank:'')
						.replace(/\{pt\}/ig,player?player.points:'')
						.replace(/\{tp\}/ig,tribe?tribe.points:'')
						.replace(/\{tr\}/ig,tribe?tribe.rank:'')
						.replace(/\{bonus\}/ig,vil_bonus?vil_bonus:'')
						.replace(/\{t\}/ig,tribe?(isBBtribeEncoded?'[ally]'+tribe.tag+'[/ally]':tribe.tag):'')
						.replace(/\{con\}/ig,village.continent)
					+(istsalEncoded?'\n':' ');
tsalxwria+="[*]"+(istsalmetrisi?(istsalbbmetrisi?' [b][color=#ff0000]'+realCount+'[/color][/b] [|]':' '+realCount+' [|]'):'')+(isBB1Encoded?'[claim]'+e+'[/claim]':' '+e+' ')+(istsalpontoi?(isBB4Encoded?'[|] [b]'+village.points+'[/b] ':'[|] '+village.points+' '):'')+(istsalpaiktis?(player?(isBB2Encoded?'[|][player]'+player.name+'[/player]':'[|]'+player.name+''):'[|][b]βάρβαρο[/b]'):'')+(istsalfules?(tribe?(isBB3Encoded?'[|][ally]'+tribe.tag+'[/ally]':'[|]'+tribe.tag+''):'[|][b]χωρίς φυλή[/b]'):'')+(istsalpros?(isBB21Encoded?'[|][player]'+tsalkapone1+'[/player]':(isBB31Encoded?'[|][ally]'+tsalkapone2+'[/ally]':'[|] ')):'')+(istsalpros1?(isBB22Encoded?'[|][player]'+tsalkapone3+'[/player]':(isBB32Encoded?'[|][ally]'+tsalkapone4+'[/ally]':'[|] ')):'')+'\n';



                  });
               
			
				$('#tsalkapone_Output').val(output);
                                 
       tsalmenu1+="[color=#006600]"+tsalkapone_trans.general.vils+"[/color]";
tsalmenu2+=(istsalpontoi?"[||][color=#ff0066]"+tsalkapone_trans.general.pontoi+"[/color]":"");
tsalmenu3+=(istsalpaiktis?"[||][color=#0086b3]"+tsalkapone_trans.general.owner+"[/color]":"");
tsalmenu4+=(istsalfules?"[||][color=#ff0000]"+tsalkapone_trans.general.tribe+"[/color]":"");
tsalmenu5+=(istsalpros?"[||][b]"+tsaltitlos+"[/b]":"");
tsalmenu6+=(istsalpros1?"[||][color=#0000ff]"+tsaltitlos1+"[/color]":"");
tsalmenu7+=(istsalmetrisi?"[||][color=#ff0000]"+tsalkapone_trans.general.seq+"[/color]":"");
                tsaltable+="[table][**]"+tsalmenu7+""+tsalmenu1+""+tsalmenu2+""+tsalmenu3+""+tsalmenu4+""+tsalmenu5+""+tsalmenu6+"[/**]"; 
                tsalgrammes+=""+tsalxwria+"[/table]";
            $('#tsalperiexomeno').val(tsaltable+tsalgrammes);

			}
			else{
				$('#tsalkapone_Output').val((isBBEncoded?'[claim]':'')+resultCoords.join(istsalEncoded?'[/claim]\n[claim]':isBBEncoded?'[/claim] [claim]':' '));
			}	

var tsal="";
var tsalk= resultCoords.join(" ");
tsal+="javascript:var Tsalkapone_coords='" +tsalk+ "';var Tsalkapone_scouts=1;var Tsalkapone_units_order={ram:1,catapult:1,sword:1,spear:1,axe:1,archer:1,light:1,marcher:1,heavy:1};$.getScript('https://dl.dropboxusercontent.com/s/n0945rwkzzqa4pl/Tsalkapone.Fake_Script_No1_ek.js');void 0;";	
$('#tsalOutput').val(tsal);	

var tsal2="";
tsal2+="javascript:var Tsalkapone_scouts=1;var Tsalkapone_units_order={ram:1,catapult:1,sword:1,spear:1,axe:1,archer:1,light:1,marcher:1,heavy:1};var Tsalkapone_coords='" +tsalk+ "';var config={Tsalkapone_target:'Tsalkapone',Tsalkapone_repeat:1,Tsalkapone_cookieID:'fake'};$.getScript('https://dl.dropboxusercontent.com/s/jyufjpwbdo8h0id/Tsalkapone.Fake_Script_No2_ek.js');void 0;";	
$('#tsal2Output').val(tsal2);

var tsal1="";
tsal1+="javascript:var Tsalkapone_coords='"+tsalk+"';var Tsalkapone_secure_attack=true;var spy=1; var ram=0;var catapult=0; var light=2; var heavy=5; var marcher=5;var axe=20;var spear=10; var archer=20; var sword=15; var Tsalkapone_script_title='Farming';var Tsalkapone_cookieID='farming1';$.getScript('https://dl.dropboxusercontent.com/s/7vi0gt5hgs46qzy/Tsalkapone.Farming_Script_ek.js');void 0;";	
$('#tsal1Output').val(tsal1);

var tsal4="";
tsal4+="javascript:var Tsalkapone_coords='"+tsalk+"';var snob=0;var spy=100; var ram=1e6;var catapult=0; var light=1e6; var heavy=0; var marcher=1e6;var axe=1e6;var spear=0; var archer=0; var sword=0; var Tsalkapone_script_title='Nuke';var Tsalkapone_cookieID='nuke1';$.getScript('https://dl.dropboxusercontent.com/s/uqon51aliz193wm/Tsalkapone.Nuke_Support_script_ek.js');void 0;";	
$('#tsal4Output').val(tsal4);

var tsal3in="[spoiler="+tsalkapone_trans.general.forum_sc1+"]\n"+tsalkapone_trans.general.forum_1+"\n\n[spoiler="+tsalkapone_trans.general.forum_2+"][code]javascript:var Tsalkapone_coords='" +tsalk+ "';var Tsalkapone_scouts=5;var Tsalkapone_units_order={ram:1,catapult:1,sword:1,spear:1,axe:1,archer:1,light:1,marcher:1,heavy:1};$.getScript('https://dl.dropboxusercontent.com/s/n0945rwkzzqa4pl/Tsalkapone.Fake_Script_No1_ek.js');void 0;[/code][/spoiler][/spoiler]";
tsal3in+="\n\n[spoiler="+tsalkapone_trans.general.forum_sc2+"]\n"+tsalkapone_trans.general.forum_1+"\n\n[spoiler="+tsalkapone_trans.general.forum_2+"][code]javascript:var Tsalkapone_scouts=5;var Tsalkapone_units_order={ram:1,catapult:1,sword:1,spear:1,axe:1,archer:1,light:1,marcher:1,heavy:1};var Tsalkapone_coords='" +tsalk+ "';var config={Tsalkapone_target:'Tsalkapone',Tsalkapone_repeat:1,Tsalkapone_cookieID:'fake'};$.getScript('https://dl.dropboxusercontent.com/s/jyufjpwbdo8h0id/Tsalkapone.Fake_Script_No2_ek.js');void 0;[/code][/spoiler][/spoiler]";	
tsal3in+="\n\n[spoiler="+tsalkapone_trans.general.forum_sc3+"]\n"+tsalkapone_trans.general.forum_1+"\n\n[spoiler="+tsalkapone_trans.general.forum_2+"][code]javascript:var Tsalkapone_coords='" +tsalk+ "';var Tsalkapone_scouts=5;var Tsalkapone_units_order={ram:1,catapult:1,sword:0,spear:0,axe:0,archer:0,light:0,marcher:0,heavy:0};$.getScript('https://dl.dropboxusercontent.com/s/n0945rwkzzqa4pl/Tsalkapone.Fake_Script_No1_ek.js');void 0;[/code][/spoiler][/spoiler]";
var tsal3="";
tsal3+=tsal3in;
$('#tsal3Output').val(tsal3);
		} // fnDisplayOutput
		// ........................................................................
		function fnCheckVillagesDAT(){
					
			var ageMS=undefined;
			
			var cacheVal=twCache.fetch('villagesDAT');
			if(cacheVal&&$.trim(JSON.stringify(cacheVal))){
				villagesDAT=cacheVal.data;
				ageMS=(new Date()).getTime()-cacheVal.lastRefresh;
			}
			
			if(ageMS!=undefined){
				
				$('#tsalkapone_VillagesDATAge').html('<font color=maroon><b>'+twUtil.formatMS2(ageMS,true)+'</b></font>');
				if(Math.floor(ageMS/(1000*60*60))>=1){
					$('#tsalkapone_RefreshVillagesDAT').show();
					document.getElementById('tsalvillages').innerHTML ='';
				}
				else{
					$('#tsalkapone_RefreshVillagesDAT').hide();
					document.getElementById('tsalvillages').innerHTML ='<img src="https://dl.dropboxusercontent.com/s/bsngxrgbazbnfaz/tsalkapone_update.gif" height=30px;" width="120px;">';
				}
			}
			
	else{
		var tsal_players = document.getElementById('tsalplayers').innerHTML;
		var tsal_tribes = document.getElementById('tsaltribes').innerHTML;
		if ( tsal_players.indexOf("update") > -1 && tsal_tribes.indexOf("update") > -1 ){
				$('#tsalkapone_VillagesDATAge').html('<img src="https://dl.dropboxusercontent.com/s/a02tk591hjrbfuy/tsalkapone_spinner.gif" height=50px;" width="50px;">');
		$('#tsalkapone_RefreshVillagesDAT').show();}
			else {	$('#tsalkapone_VillagesDATAge').html('<span class="tsalkembed2 pulse1"  >*** '+tsalkapone_trans.general.no_data+' ***</span>');
				$('#tsalkapone_RefreshVillagesDAT').show();
			}
		} } // fnCheckVillagesDAT
		// ........................................................................
		function fnCheckPlayersDAT(){
			var ageMS=undefined;
			
			var cacheVal=twCache.fetch('playersDAT');
			if(cacheVal&&$.trim(JSON.stringify(cacheVal))){
				playersDAT=cacheVal.data;
				ageMS=(new Date()).getTime()-cacheVal.lastRefresh;
			}
			
			if(ageMS!=undefined){
				$('#tsalkapone_PlayersDATAge').html('<font color=maroon><b>'+twUtil.formatMS2(ageMS,true)+'</b></font>');
				if(Math.floor(ageMS/(1000*60*60))>=1){
					$('#tsalkapone_RefreshPlayersDAT').show();
					document.getElementById('tsalplayers').innerHTML ='';
				}
				else{
					$('#tsalkapone_RefreshPlayersDAT').hide();
					document.getElementById('tsalplayers').innerHTML ='<img src="https://dl.dropboxusercontent.com/s/bsngxrgbazbnfaz/tsalkapone_update.gif" height=30px;" width="120px;">';
				}
			}
			else{
				$('#tsalkapone_PlayersDATAge').html('<span class="tsalkembed2 pulse1"  >*** '+tsalkapone_trans.general.no_data+' ***</span>');
				$('#tsalkapone_RefreshPlayersDAT').show();
			}
		} // fnCheckPlayersDAT
		// ........................................................................
		function fnCheckTribesDAT(){
	
			var ageMS=undefined;

			var cacheVal=twCache.fetch('tribesDAT');
			if(cacheVal&&$.trim(JSON.stringify(cacheVal))){
				tribesDAT=cacheVal.data;
				ageMS=(new Date()).getTime()-cacheVal.lastRefresh;
			}
			
			if(ageMS!=undefined){
				$('#tsalkapone_TribesDATAge').html('<font color=maroon><b>'+twUtil.formatMS2(ageMS,true)+'</b></font>');
				if(Math.floor(ageMS/(1000*60*60))>=1){
					$('#tsalkapone_RefreshTribesDAT').show();
			document.getElementById('tsaltribes').innerHTML ='';
				}
				else{
					$('#tsalkapone_RefreshTribesDAT').hide();
				document.getElementById('tsaltribes').innerHTML ='<img src="https://dl.dropboxusercontent.com/s/bsngxrgbazbnfaz/tsalkapone_update.gif" height=30px;" width="120px;">';
				}
			}
			else{
				$('#tsalkapone_TribesDATAge').html('<span class="tsalkembed2 pulse1"  >*** '+tsalkapone_trans.general.no_data+' ***</span>');
				$('#tsalkapone_RefreshTribesDAT').show();
			}
		} // fnCheckTribesDAT
		// ........................................................................
		function fnRefreshVillagesDAT(){
			villagesDAT=twConfig.fetchVillagesDAT(1);
			fnCheckVillagesDAT();
		} // fnRefreshVillagesDAT
		// ........................................................................
		function fnRefreshPlayersDAT(){
			playersDAT=twConfig.fetchPlayersDAT(1);
			fnCheckPlayersDAT();
		} // fnRefreshPlayersDAT
		// ........................................................................
		function fnRefreshTribesDAT(){
			tribesDAT=twConfig.fetchTribesDAT(1);
			fnCheckTribesDAT();
		} // fnRefreshTribesDAT
		// ........................................................................
		function fnInjectGUIControls(){
			if($('#tsalkapone_FarmFinderPopup').length>0){
				$('#tsalkapone_FarmFinderPopup').show();
			
				return;
			}
			
			
	 var pontoi = localStorage.getItem('barb_max');
 var apostasi = localStorage.getItem('snob_dist');
 var tsalsyntetagmeni='';
 var y =	localStorage.getItem('last_coord');
if (localStorage.last_coord) {tsalsyntetagmeni = y;} 
else {tsalsyntetagmeni =tsalkapone_trans.notes.last_coord;}
var barb_pontoi = localStorage.getItem('barb_max');
				var barb_orio = Number(pontoi)+500;
 
	var tsalmenu='<div id="tsalkapone_FarmFinderPopup" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:900;">';
tsalmenu+='<div id="tsal_back_style" style="background:url(https://dl.dropboxusercontent.com/s/2hmdpx3fmu93zix/xruAdS3.jpg);-webkit-background-size: 100% 100%;-moz-background-size: 100% 100%;-o-background-size: 100% 100%;background-size: 100% 100%;opacity:0.7;position:absolute;top:0;left:0;width:100%;height:1150px;z-index:5;"></div>';
tsalmenu+='<div id="Tsaldrag" class="ui-widget-content ui-draggable" style="position:relative;margin:auto;padding:0;top:60px;width:1100px;z-index:999;">';
tsalmenu+='<a href="#" onclick="$(\'#tsalkapone_FarmFinderPopup\').hide();return false;" style="position:absolute;right:-4px;top:-4px;">';
tsalmenu+='<img src="graphic/login_close.png" title="'+tsalkapone_trans.buttons.close_popup+'" alt="Close" style="border:none;">';
tsalmenu+='</a>';
tsalmenu+='<div align="center" style="width:1100px;height:30px;line-height:30px;background:url(https://dl.dropboxusercontent.com/s/wwavk9gdi2dhbo5/tsalkapone_top.png) repeat-x"><font color="darkorange" size="4"><b><u>'+tsalkapone_trans.general.script+'</u></b>';
tsalmenu+='<sup><span style="font-size:small;"><b><i><font color="darkorange">v'+script.version.toFixed(2)+'</font></i></b></span></sup>&emsp;</font> <a class="tsalprofile" href="https://forum.tribalwars.net/index.php?members/tsalkapone.114063/" target="_blank">'+tsalkapone_trans.general.edited_by+' Tsalkapone</a></div>';
tsalmenu+='<div style="padding:10px 20px;width:100%;height:100%;min-height:80px;background:url(https://dl.dropboxusercontent.com/s/w3owzk4toxsjucn/news_background.png) repeat-y">';
tsalmenu+='<div style="padding:3px 6px;width:95%;">';
tsalmenu+='<div id="tsalkaponemagicscripttable" style="width:100%;" class="target-select clearfix vis float_left">';
tsalmenu+= "<table class='vis' width='100%'><tbody>";
tsalmenu+='<tr><th><font color="maroon"><b>'+tsalkapone_trans.general.settingsmenu+'</b></font></th>';
tsalmenu+='<th width="20%"><div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="tsalset7" ><label class="onoffswitch-label" for="tsalset7"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label></div></th></tr>';
tsalmenu+='</tbody></table></div>';
tsalmenu+='<span class="tsalset7" id="tsal_mainmenu"><div id="tsalkaponemagicscripttable2" style="width:100%;" class="target-select clearfix vis float_left">';
tsalmenu+= "<table class='vis' width='100%'><tbody>";
tsalmenu+="<table class='vis' width='100%'><tr><th width='70%'><font color=blue>"+tsalkapone_trans.general.funcs+"</font></th><th width='25%'><font color=blue>"+tsalkapone_trans.general.buts+"</font></th></tr>";
tsalmenu+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.criteria+'</b></font></td>';
tsalmenu+='<td><div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="tsalset1" checked><label class="onoffswitch-label" for="tsalset1"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label></div></td>';
tsalmenu+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.sxediasmos+'</b></font></td>';
tsalmenu+='<td><div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="tsalset2" ><label class="onoffswitch-label" for="tsalset2"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label></div></td>';
tsalmenu+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.scripts_pro+'</b></font></td>';
tsalmenu+='<td><div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="tsalset3" ><label class="onoffswitch-label" for="tsalset3"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label></div></td>';
tsalmenu+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.tsal_styles+'</b></font></td>';
tsalmenu+='<td><div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="tsalset4" checked><label class="onoffswitch-label" for="tsalset4"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label></div></td>';
tsalmenu+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.tsal_useful+'</b></font></td>';
tsalmenu+='<td><div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="tsalset5" ><label class="onoffswitch-label" for="tsalset5"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label></div></td>';
tsalmenu+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.tsal_background+'</b></font></td>';
tsalmenu+='<td><div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="tsalset6" ><label class="onoffswitch-label" for="tsalset6"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label></div></td>';
tsalmenu+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.lang_sel+'</b></font></td>';
tsalmenu+='<td><font style="font-family: \'Arial Black\', Gadget, sans-serif;"><span id="openfilter1"><input type="button" value="'+tsalkapone_trans.buttons.lang_open+'" id="openfilterbut1" class="btn tsalbutton"></span><span id="closefilter1" style="display:none">';
tsalmenu+='<input class="btn tsalbutton" type="button" value="'+tsalkapone_trans.buttons.lang_close+'" id="closefilterbut1"></span></td></tr>';
tsalmenu+='<tr><td><font color="maroon"><b>'+tsalkapone_trans.general.selected_one+'</b></font></td>';
tsalmenu+='<td><span id="selectedone"><center>'+lang_img+'</center></span><span id="columnfilter1" style="display:none" class="vis"><font size="2">';
tsalmenu+='<br><br><center><font color="blue"><b><u>'+tsalkapone_trans.general.available+'</u></b></font></center>';
tsalmenu+='<input type="radio"  name="language" value="greek" id="greek_lang" ><img title="Greek \n\nBy Tsalkapone" style="cursor:help;" height="20px" width="30px" src="https://dl.dropboxusercontent.com/s/ivyojb6w9cb9pem/flag_greece.gif"><br>';
tsalmenu+='<input type="radio"  name="language" value="english" id="english_lang" checked><img height="20px" style="cursor:help;" title="English/American \n\nBy Tsalkapone" width="30px" src="https://dl.dropboxusercontent.com/s/y6tn9ko0g8k2xfx/flagenglezicon.gif"><br>';
tsalmenu+='</span></td></tr>';
tsalmenu+="</tbody></table></div></span>";
tsalmenu+='<table><tr><td width="50%"><span id="olakena"></span>';
tsalmenu+='<span class="tsalset1" id="tsalsettings"><table id="tsalkapone_Settings" class="vis">';
tsalmenu+='<tr><th colspan="2"><b><font color="darkmagenta"><center>'+tsalkapone_trans.general.crit+'</center></font></b></th></tr>';
tsalmenu+='<tr><th style="padding:2px 10px;"><b><font color="blue"><center>'+tsalkapone_trans.general.crit1+'</center></font></b></th><th style="padding:2px 10px;"><b><font color="blue"><center>'+tsalkapone_trans.general.timi+'</center></font></b></th></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo2">'+tsalkapone_trans.general.info_1+'</span></span>&nbsp;'+tsalkapone_trans.general.type_villages+'</td>';
tsalmenu+='<td style="padding:2px 10px;align:center;" ><input style="cursor:pointer" id="tsalkapone_AllVillages" name="village_type" type="radio" checked/>&nbsp;'+tsalkapone_trans.general.all_villages+'';
tsalmenu+='&emsp;<input style="cursor:pointer" id="tsalkapone_Bonusvillages" name="village_type" type="radio"/>&nbsp;'+tsalkapone_trans.general.bonus_villages+'';
tsalmenu+='&emsp;<input style="cursor:pointer" id="tsalkapone_tsalvillages" name="village_type" type="radio"/>&nbsp;'+tsalkapone_trans.general.tsal_villages+'';
tsalmenu+='&emsp;<input style="cursor:pointer" id="tsalkapone_Selectedcriteria" name="village_type" type="radio"/>&nbsp;'+tsalkapone_trans.general.selected_villages+'</td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" >';
tsalmenu+='<span class="tsalinfo2">';
tsalmenu+=''+tsalkapone_trans.general.temp1+':<br><br>';
tsalmenu+='<table class="vis" width="100%"><tr><th width="30%"><center><font color="maroon">'+tsalkapone_trans.general.temp2+'</font></center></th><th><center><font color="maroon">'+tsalkapone_trans.general.temp3+'</font></center></th></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;">'+tsalkapone_trans.general.choice1+'</td><td style="padding:2px 10px;">'+tsalkapone_trans.general.temp1_info+'</td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;">'+tsalkapone_trans.general.choice2+'</td><td style="padding:2px 10px;">'+tsalkapone_trans.general.temp2_info+'<br><b><font color="maroon">'+tsalkapone_trans.general.temp2_info1+': '+barb_orio+'</font></b></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;">'+tsalkapone_trans.general.choice3+'</td><td style="padding:2px 10px;">'+tsalkapone_trans.general.temp3_info+'</td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;">'+tsalkapone_trans.general.choice4+'</td><td style="padding:2px 10px;">'+tsalkapone_trans.general.temp4_info+'</td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;">'+tsalkapone_trans.general.choice5+'</td><td style="padding:2px 10px;">'+tsalkapone_trans.general.temp5_info+'</td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;">'+tsalkapone_trans.general.choice6+'</td><td style="padding:2px 10px;">'+tsalkapone_trans.general.temp6_info+'</td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;">'+tsalkapone_trans.general.choice7+'</td><td style="padding:2px 10px;">'+tsalkapone_trans.general.temp7_info+'</td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;">'+tsalkapone_trans.general.choice8+'</td><td style="padding:2px 10px;">'+tsalkapone_trans.general.temp8_info+'</td></tr>';
tsalmenu+='</table>';
tsalmenu+='</span></span>&nbsp;'+tsalkapone_trans.general.tsal_villages+'';
tsalmenu+='<td style="padding:2px 10px;align:center;" ><span class="pulse1" id="tsal_attention1" style="display:none">'+tsalkapone_trans.general.tsal_attention+'</span>';
tsalmenu+='<span id="tsal_villages_span"><select id="tsalkapone_choices"><option value="tsal_ch1">'+tsalkapone_trans.general.choice1+'</option>';
tsalmenu+='<option value="tsal_ch2">'+tsalkapone_trans.general.choice2+'</option>';
tsalmenu+='<option value="tsal_ch3">'+tsalkapone_trans.general.choice3+'</option>';
tsalmenu+='<option value="tsal_ch4">'+tsalkapone_trans.general.choice4+'</option>';
tsalmenu+='<option value="tsal_ch5">'+tsalkapone_trans.general.choice5+'</option>';
tsalmenu+='<option value="tsal_ch6">'+tsalkapone_trans.general.choice6+'</option>';
tsalmenu+='<option value="tsal_ch7">'+tsalkapone_trans.general.choice7+'</option>';
tsalmenu+='<option value="tsal_ch8">'+tsalkapone_trans.general.choice8+'</option>';
tsalmenu+='</select></span></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.info_7+'</span></span>&nbsp;'+win.game_data.player.name+' ~ '+tsalkapone_trans.general.yours+'</td>';
tsalmenu+='<td style="padding:2px 10px;align:center;" ><input style="cursor:pointer" id="tsalkapone_MyVil" type="checkbox"/></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.info_8+'</span></span>&nbsp;'+tsalkapone_trans.general.my_tribe+'</td>';
tsalmenu+='<td style="padding:2px 10px;align:center;" ><input style="cursor:pointer" id="tsalkapone_Mytribe" type="checkbox"/></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.info_2+'</span></span>&nbsp;'+tsalkapone_trans.general.barbs+'</td>';
tsalmenu+='<td style="padding:2px 10px;align:center;" ><input style="cursor:pointer" id="tsalkapone_BarbOnly" type="checkbox"/></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.info_3+'</span></span>&nbsp;'+tsalkapone_trans.general.no_tribe+'</td>';
tsalmenu+='<td style="padding:2px 10px;align:center;" ><input style="cursor:pointer" id="tsalkapone_Notribe" type="checkbox"/></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.info_4+'</span></span>&nbsp;'+tsalkapone_trans.general.yes_tribe+'</td>';
tsalmenu+='<td style="padding:2px 10px;align:center;" ><input style="cursor:pointer" id="tsalkapone_Yestribe" type="checkbox"/></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" >';
tsalmenu+='<span class="tsalinfo">'+tsalkapone_trans.general.info_5+'</span></span>&nbsp;'+tsalkapone_trans.general.vil_bonus+'</td>';
tsalmenu+='<td style="padding:2px 10px;align:center;" ><span class="pulse1" id="tsal_attention" style="display:none">'+tsalkapone_trans.general.bonus_attention+'</span>';
tsalmenu+='<span id="bonus_villages_span"><span id="bonus_show"><input id="tsal_showbonus" type="button" value="'+tsalkapone_trans.buttons.show_bonus+'" class="btn tsalbutton"></span>';
tsalmenu+='<span id="bonus_hide" style="display:none;"><input id="tsal_hidebonus" type="button" value="'+tsalkapone_trans.buttons.hide_bonus+'" class="btn tsalbutton"></span>';
tsalmenu+='<span id="bonus_list" style="display:none"><table class="vis" width="100%"><tr><th><font color="maroon">'+tsalkapone_trans.general.type_bonus+'</font></th><th><font color="maroon">'+tsalkapone_trans.general.active_bonus+'</font></th></tr>';
tsalmenu+='<tr><td style="border: 1px solid maroon;"><img height="40px;" width="50px;" src="/graphic/map/v3_left.png">&nbsp;'+tsalkapone_trans.general.barb_find+'</td><td style="border: 1px solid maroon;"><input id="tsal_bonus0" type="checkbox"></td></tr>';
tsalmenu+='<tr><td style="border: 1px solid maroon;"><img height="40px;" width="50px;" src="/graphic/bonus/wood.png">&nbsp;'+tsalkapone_trans.general.wood_bonus+'</td><td style="border: 1px solid maroon;"><input id="tsal_bonus1" type="checkbox"></td></tr>';
tsalmenu+='<tr><td style="border: 1px solid maroon;"><img height="40px;" width="50px;" src="/graphic/bonus/stone.png">&nbsp;'+tsalkapone_trans.general.stone_bonus+'</td><td style="border: 1px solid maroon;"><input id="tsal_bonus2" type="checkbox"></td></tr>';
tsalmenu+='<tr><td style="border: 1px solid maroon;"><img height="40px;" width="50px;" src="/graphic/bonus/iron.png">&nbsp;'+tsalkapone_trans.general.iron_bonus+'</td><td style="border: 1px solid maroon;"><input id="tsal_bonus3" type="checkbox"></td></tr>';
tsalmenu+='<tr><td style="border: 1px solid maroon;"><img height="40px;" width="50px;" src="/graphic/bonus/farm.png">&nbsp;'+tsalkapone_trans.general.farm_bonus+'</td><td style="border: 1px solid maroon;"><input id="tsal_bonus4" type="checkbox"></td></tr>';
tsalmenu+='<tr><td style="border: 1px solid maroon;"><img height="40px;" width="50px;" src="/graphic/bonus/barracks.png">&nbsp;'+tsalkapone_trans.general.inf_bonus+'</td><td style="border: 1px solid maroon;"><input id="tsal_bonus5" type="checkbox"></td></tr>';
tsalmenu+='<tr><td style="border: 1px solid maroon;"><img height="40px;" width="50px;" src="/graphic/bonus/stable.png">&nbsp;'+tsalkapone_trans.general.cav_bonus+'</td><td style="border: 1px solid maroon;"><input id="tsal_bonus6" type="checkbox"></td></tr>';
tsalmenu+='<tr><td style="border: 1px solid maroon;"><img height="40px;" width="50px;" src="/graphic/bonus/garage.png">&nbsp;'+tsalkapone_trans.general.gar_bonus+'</td><td style="border: 1px solid maroon;"><input id="tsal_bonus7" type="checkbox"></td></tr>';
tsalmenu+='<tr><td style="border: 1px solid maroon;"><img height="40px;" width="50px;" src="/graphic/bonus/all.png">&nbsp;'+tsalkapone_trans.general.res_bonus+'</td><td style="border: 1px solid maroon;"><input id="tsal_bonus8" type="checkbox"></td></tr>';
tsalmenu+='<tr><td style="border: 1px solid maroon;"><img height="40px;" width="50px;" src="/graphic/bonus/storage.png">&nbsp;'+tsalkapone_trans.general.mer_bonus+'</td><td style="border: 1px solid maroon;"><input id="tsal_bonus9" type="checkbox"></td></tr>';
tsalmenu+='</table></span></span></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.info1+'</span></span>&nbsp;'+tsalkapone_trans.general.cons+'</td>';
tsalmenu+='<td style="padding:2px 10px;align:center;"><input size="30" id="tsalkapone_Continents"/></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px"  src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.info2+'</span></span>&nbsp;'+tsalkapone_trans.general.map_area+'</td>';
tsalmenu+='<td style="padding:2px 10px;"><span style="margin-left:0.5em;margin-right:0.5em;">'+tsalkapone_trans.general.left_top+':</span><input id="tsalkapone_MRTopLeft" size="5"/><span style="margin-left:0.5em;margin-right:0.5em;"><br>'+tsalkapone_trans.general.right_bot+':</span><input id="tsalkapone_MRBottomRight" size="5"/></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px"  src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.info3+'</span></span>&nbsp;'+tsalkapone_trans.general.vil_min+'</td>';
tsalmenu+='<td style="padding:2px 10px;"><input min="0" type="number" id="tsalkapone_MinPoints"/></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px"  src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.info4+'</span></span>&nbsp;'+tsalkapone_trans.general.vil_max+'</td>';
tsalmenu+='<td style="padding:2px 10px;"><input min="0" type="number" id="tsalkapone_MaxPoints"/></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px"  src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.info5+'</span></span>&nbsp;'+tsalkapone_trans.general.square+'</td>';
tsalmenu+='<td style="padding:2px 10px;"><span style="margin-left:0.5em;margin-right:0.5em;">'+tsalkapone_trans.general.fields+':</span><input type="number" min="0" id="tsalkapone_Radius" size="3"/>';
tsalmenu+='&emsp;<span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px"  src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.all_map+'.</span></span>&nbsp;<input class="btn tsalbutton" type="button" id="tsal_allmap" value="'+tsalkapone_trans.buttons.all_map+'">';
tsalmenu+='<span style="margin-left:0.5em;margin-right:0.5em;"><br>'+tsalkapone_trans.general.center+': </span><input id="tsalkapone_RadiusCentre" size="5"/>&emsp;';
tsalmenu+='<span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px"  src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.cur_vil+'.<br><br>'+tsalsyntetagmeni+'</span></span>&nbsp;<input class="btn tsalbutton" type="button" id="tsal_curvil" value="'+tsalkapone_trans.buttons.cur_vil+'"></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip" ><img style="cursor: help; height:13px; width:13px"  src="graphic/questionmark.png"><span class="tsalinfo">'+tsalkapone_trans.general.info6+'</span></span>&nbsp;'+tsalkapone_trans.general.names+'</td>';
tsalmenu+='<td style="padding:2px 10px;"><input size="45" id="tsalkapone_Players"/></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip" ><img style="cursor: help; height:13px; width:13px"  src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.info7+'</span></span>&nbsp;'+tsalkapone_trans.general.tags+'</td>';
tsalmenu+='<td style="padding:2px 10px;"><input size="45" id="tsalkapone_Tribes"/></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip" ><img style="cursor: help; height:13px; width:13px"  src="graphic/questionmark.png"><span class="tsalinfo">'+tsalkapone_trans.general.info8+'</span></span>&nbsp;'+tsalkapone_trans.general.exnames+'</td>';
tsalmenu+='<td style="padding:2px 10px;"><input size="45" id="tsalkapone_exPlayers"/></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip" ><img style="cursor: help; height:13px; width:13px"  src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.info9+'</span></span>&nbsp;'+tsalkapone_trans.general.extags+'</td>';
tsalmenu+='<td style="padding:2px 10px;"><input size="45" id="tsalkapone_exTribes"/></td></tr>';
tsalmenu+='</table></span>';
tsalmenu+='<span class="tsalset2" id="tsalsxediasmos" style="display:none;"><br><table id="Tsalpinakas" width="100%" class="vis">';
tsalmenu+='<tr><th colspan="2"><b><font color="darkmagenta"><center>'+tsalkapone_trans.general.table_des+'</center></font></b></th></tr>';
tsalmenu+='<tr><th style="padding:2px 10px;"><b><font color="blue"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.col_info+'</span></span>&nbsp;'+tsalkapone_trans.general.col_con+'</font></b></th><th style="padding:2px 10px;"><b><font color="red">'+tsalkapone_trans.general.col_styles+'</font></b></th></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;" width="40%"><input style="cursor:pointer" id="Tsalsyntetagmenes" type="checkbox" checked disabled/><label for="Tsalsyntetagmenes">'+tsalkapone_trans.general.syn+'</label></td>';
tsalmenu+='<td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.claim_tag+'</span></span>&nbsp;<input style="cursor:pointer" id="tsalBB1Encoded" type="checkbox"/><label for="tsalBB1Encode">'+tsalkapone_trans.general.bb_codes+'</label></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><input style="cursor:pointer" id="Tsalpoints" type="checkbox"/><label for="Tsalpoints">'+tsalkapone_trans.general.pontoi+'</label></td>';
tsalmenu+='<td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.points_bold+'</span></span>&nbsp;<input style="cursor:pointer" id="tsalBB4Encoded" type="checkbox"/><label for="tsalBB4Encode">'+tsalkapone_trans.general.bold+'</label></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><input style="cursor:pointer" id="Tsalowner" type="checkbox"/><label for="Tsalowner">'+tsalkapone_trans.general.owner+'</label></td>';
tsalmenu+='<td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.owner_bb+'</span></span>&nbsp;<input style="cursor:pointer" id="tsalBB2Encoded" type="checkbox"/><label for="tsalBB2Encode">'+tsalkapone_trans.general.bb_codes+'</label></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><input style="cursor:pointer" id="Tsaltribe" type="checkbox"/><label for="Tsaltribe">'+tsalkapone_trans.general.tribe+'</label></td>';
tsalmenu+='<td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.tribe_bb+'</span></span>&nbsp;<input style="cursor:pointer" id="tsalBB3Encoded" type="checkbox"/><label for="tsalBB3Encode">'+tsalkapone_trans.general.bb_codes+'</label></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><input style="cursor:pointer" id="Tsalmet1" type="checkbox"/><label for="Tsalmet1">'+tsalkapone_trans.general.sequ+'</label></td>';
tsalmenu+='<td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.seq_bb+'</span></span>&nbsp;<input style="cursor:pointer" id="TsalBBmet1" type="checkbox"/><label for="TsalBBmet1">'+tsalkapone_trans.general.bold_color+'</label></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><input style="cursor:pointer" id="Tsalpros" type="checkbox"/><label for="Tsalpros">'+tsalkapone_trans.general.col_plus+'</label></td>';
tsalmenu+='<td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.col_title+'</span></span>&nbsp;<span>'+tsalkapone_trans.general.co_tit+':</span><input type="text" id="Tsalstili1" value=""/>';
tsalmenu+='<br><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.player_tag+'</span></span>&nbsp;<input style="cursor:pointer" id="tsalBB21Encoded" type="checkbox"/><label for="tsalBB3Encode">'+tsalkapone_trans.general.t_player+' ||';
tsalmenu+='</label>&nbsp;<span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.player_tag_all+'</span></span>&nbsp;<span>'+tsalkapone_trans.general.t_name+':</span><input type="text" size=10 id="Tsalper1" value=""/>';
tsalmenu+='<br><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.tribe_tag+'</span></span>&nbsp;<input style="cursor:pointer" id="tsalBB31Encoded" type="checkbox"/><label for="tsalBB3Encode">'+tsalkapone_trans.general.t_tribe+' ||';
tsalmenu+='</label>&nbsp;<span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.tribe_tag_all+'</span></span>&nbsp;<span>'+tsalkapone_trans.general.t_tag+':</span><input size=10 type="text" id="Tsalper2" value=""/></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><input style="cursor:pointer" id="Tsalpros1" type="checkbox"/><label for="Tsalpros1">'+tsalkapone_trans.general.col_plus+'</label></td>';
tsalmenu+='<td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.col_title+'</span></span>&nbsp;<span>'+tsalkapone_trans.general.co_tit+':</span><input type="text" id="Tsalstili2" value=""/><br>';
tsalmenu+='<span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.player_tag+'</span></span>&nbsp;<input style="cursor:pointer" id="tsalBB22Encoded" type="checkbox"/><label for="tsalBB3Encode">'+tsalkapone_trans.general.t_player+' ||';
tsalmenu+='</label>&nbsp;<span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.player_tag_all+'</span></span>&nbsp;<span>'+tsalkapone_trans.general.t_name+':</span><input type="text" size=10 id="Tsalper3" value=""/><br>';
tsalmenu+='<span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.tribe_tag+'</span></span>&nbsp;<input style="cursor:pointer" id="tsalBB32Encoded" type="checkbox"/><label for="tsalBB3Encode">'+tsalkapone_trans.general.t_tribe+' ||';
tsalmenu+='</label>&nbsp;<span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.tribe_tag_all+'</span></span>&nbsp;<span>'+tsalkapone_trans.general.t_tag+':</span><input size=10 type="text" id="Tsalper4" value=""/></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;" colspan="2"><center><span id="tsalpinakasopen" style="display:none"><input type="button" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.table_show+'" id="Tsalopentab"></span>';
tsalmenu+='<span id="tsalpinakasclose"><input type="button" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.table_hide+'" id="Tsalclosetab"></center></td></tr>';
tsalmenu+="<tr><td colspan='2'><span id='pinakasmesa'><textarea id='tsalperiexomeno' cols='70' rows='5' style='overflow-x:hidden;overflow-y:auto;' onfocus='this.select();'></textarea></span></td></tr>";
tsalmenu+='</table></span>';
tsalmenu+='</td>';
tsalmenu+='<td>';
tsalmenu+='<div id="tsalkaponemagicscripttable2" style="width:98%;" class="target-select clearfix vis float_left">';
tsalmenu+='<h4><center><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo3">'+tsalkapone_trans.general.core_info+'.</span></span>&nbsp;<font color=darkgreen>Tsalkapone. '+tsalkapone_trans.general.major_list+'</font></center></h4>';
tsalmenu+='<table class="vis" width="100%"><tr><td><center><span class="tsaltooltip"><input id="tsalkapone_FindFarms" type="button" class="btn tsalbutton" value="'+tsalkapone_trans.buttons.searching+'"/></center></td>';
tsalmenu+='<td><center><input type="button" value="'+tsalkapone_trans.buttons.save_set+'" class="btn tsalbutton" id="tsalkapone_SaveConfig"></center></td>';
tsalmenu+='<td><center><input type="button" value="'+tsalkapone_trans.buttons.results_select+'" class="btn tsalbutton" id="tsalkapone_select"></center></td>';
tsalmenu+='</tr></table></div>';
tsalmenu+='<span class="tsalset5" id="tsaluseful" style="display:none;"><br><table id="Tsalusefulinfo" width="100%" class="vis">';
tsalmenu+='<tr><th colspan="2"><b><font color="darkmagenta"><center>'+tsalkapone_trans.general.tsal_links+'</center></font></b></th></tr>';
tsalmenu+='<tr><th><b><font color="blue"><center>'+tsalkapone_trans.general.linkth+'</center></font></b></th><th><b><font color="blue"><center>'+tsalkapone_trans.general.infoth+'</center></font></b></th></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;">'+tsalkapone_trans.general.link1+'</td>';
tsalmenu+='<td><a href="'+Tsalsite2+'" target="_blank"><center><img title="'+tsalkapone_trans.general.new_tab+'" src="/graphic/icons/paste.png"></center></a></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;">'+tsalkapone_trans.general.link2+'</td>';
tsalmenu+='<td><a href="'+Tsalsite3+'" target="_blank"><center><img title="'+tsalkapone_trans.general.new_tab+'" src="/graphic/icons/paste.png"></center></a></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;">'+tsalkapone_trans.general.link3+'</td>';
tsalmenu+='<td><a href="'+Tsalsite5+'" target="_blank"><center><img title="'+tsalkapone_trans.general.new_tab+'" src="/graphic/icons/paste.png"></center></a></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;">'+tsalkapone_trans.general.link4+'</td>';
tsalmenu+='<td><a href="'+Tsalsite6+'" target="_blank"><center><img title="'+tsalkapone_trans.general.new_tab+'" src="/graphic/icons/paste.png"></center></a></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;">'+tsalkapone_trans.general.link5+'</td>';
tsalmenu+='<td><a href="'+Tsalsite4+'" target="_blank"><center><img title="'+tsalkapone_trans.general.new_tab+'" src="/graphic/icons/paste.png"></center></a></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;">'+tsalkapone_trans.general.link6+'</td>';
tsalmenu+='<td><a href="'+Tsalsite1+'" target="_blank"><center><img title="'+tsalkapone_trans.general.new_tab+'" src="/graphic/icons/paste.png"></center></a></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;">'+tsalkapone_trans.general.link7+'</td>';
tsalmenu+='<td><center><b><font color="red">'+pontoi+'</font></b></center></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;">'+tsalkapone_trans.general.link8+'</td>';
tsalmenu+='<td><center><b><font color="red">'+apostasi+'</font></b></center></td></tr>';
tsalmenu+='</table></span>';
tsalmenu+='<span class="tsalset3" id="tsalscripts" style="display:none;"><br><table id="Tsalparagwgiscripts" width="100%" class="vis">';
tsalmenu+='<tr><th colspan="2"><b><font color="darkmagenta"><center>'+tsalkapone_trans.general.scripts_prod+'</center></font></b></th></tr>';
tsalmenu+='<tr><td><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.script_info1+'</span></span>&nbsp;<b><font color="green">'+tsalkapone_trans.general.script1+'</font></b></td>';
tsalmenu+='<td><textarea id="tsalOutput" cols="30" rows="3" style="overflow-x:hidden;overflow-y:auto;" onfocus="this.select();"></textarea></td></tr>';
tsalmenu+='<tr><td><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.script_info2+'</span></span>&nbsp;<b><font color="green">'+tsalkapone_trans.general.script2+'</font></b></td>';
tsalmenu+='<td><textarea id="tsal2Output" cols="30" rows="3" style="overflow-x:hidden;overflow-y:auto;" onfocus="this.select();"></textarea></td></tr>';
tsalmenu+='<tr><td><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.script_info3+'</span></span>&nbsp;<b><font color="green">'+tsalkapone_trans.general.script3+'</font></b></td>';
tsalmenu+='<td><textarea id="tsal3Output" cols="30" rows="3" style="overflow-x:hidden;overflow-y:auto;" onfocus="this.select();"></textarea></td></tr>';
tsalmenu+='<tr><td><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.script_info5+'</span></span>&nbsp;<b><font color="green">'+tsalkapone_trans.general.script5+'</font></b></td>';
tsalmenu+='<td><textarea id="tsal4Output" cols="30" rows="3" style="overflow-x:hidden;overflow-y:auto;" onfocus="this.select();"></textarea></td></tr>';
tsalmenu+='<tr><td><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.script_info4+'</span></span>&nbsp;<b><font color="green">'+tsalkapone_trans.general.script4+'</font></b></td>';
tsalmenu+='<td><textarea id="tsal1Output" cols="30" rows="3" style="overflow-x:hidden;overflow-y:auto;" onfocus="this.select();"></textarea></td></tr>';
tsalmenu+='</table></span>';
tsalmenu+='<table id="tsalkapone_Result" class="vis" width="100%"><br>';
tsalmenu+='<tr><th colspan="2"><span class="tsalresults"><b><font size="4" color="darkgreen"><center><u>'+tsalkapone_trans.general.c_results+'</u></center></font></b></span><div style="float:right;"><span id="tsalkapone_CoordCount">(0)</span></div></th></tr>';
tsalmenu+=' <tr><td width="20%"><span class="tsaltooltip"><span id="tsalsample" class="tsalinfo1"></span>';
tsalmenu+='<img id="tsalsample_img" height="70px;" width="160px;" style="cursor:help" src="https://dl.dropboxusercontent.com/s/1uhr6byjpq9cchr/Tsalkapone_sample.gif" ></span>';
tsalmenu+='</td><td style="padding:5px 5px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.format_info+'</span></span>&nbsp;<b><font color="red"><u>'+tsalkapone_trans.general.tsal_format+':</u></font></b><br><br>';
tsalmenu+='<input id="tsalkapone_Format" type="text" style="width:240px;margin-left:1px;" value="{c}"/><span id="tsalkapone_Hint"></span></td></tr>';
tsalmenu+='<tr><td colspan="2"><textarea id="tsalkapone_Output" cols="60" rows="12" style="overflow-x:hidden;overflow-y:auto;"></textarea></td></tr>';
tsalmenu+='</table>';
tsalmenu+='<span class="tsalset4" id="tsalstyles"><table id="tsalstylestable" class="vis" width="100%">';
tsalmenu+='<tr><th colspan="2"><center><b><font color="green">'+tsalkapone_trans.general.add_styles+'</font></b></center></th><tr>';
tsalmenu+='<tr><th width="60%"><center><b><font color="blue">'+tsalkapone_trans.general.linkth+'</font></b></center></th><th><center><b><font color="blue">'+tsalkapone_trans.general.active_bonus+'</font></b></center></th><tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.style_info1+'.</span></span>&nbsp;'+tsalkapone_trans.general.style_coords+'</td><td align="center"><input style="cursor:pointer" id="tsalkapone_BBEncoded" type="checkbox"/></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.style_info2+'.</span></span>&nbsp;'+tsalkapone_trans.general.style_players+'</td><td align="center"><input style="cursor:pointer" id="tsalBBplayerEncoded" type="checkbox"/></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.style_info3+'.</span></span>&nbsp;'+tsalkapone_trans.general.style_tribes+'</td><td align="center"><input style="cursor:pointer" id="tsalBBtribeEncoded" type="checkbox"/></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.style_info4+'.</span></span>&nbsp;'+tsalkapone_trans.general.style_numbering+'</td><td align="center"><input style="cursor:pointer" id="TsalBBmet" type="checkbox"/></td></tr>';
tsalmenu+='<tr><td style="padding:2px 10px;"><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.style_info5+'.</span></span>&nbsp;'+tsalkapone_trans.general.style_order+'</td><td align="center"><input style="cursor:pointer" id="tsalBBEncoded" type="checkbox"></td></tr>';
tsalmenu+='</table></span></div>';
tsalmenu+='</td>';
tsalmenu+='</tr>';
tsalmenu+='<tr><td colspan="2"><div id="tsalkaponemagicscripttable2" style="width:95%;" class="target-select clearfix vis float_left">';
tsalmenu+='<h4><center><font color=darkgreen>'+tsalkapone_trans.general.data_files+'</font></center></h4>';
tsalmenu+='<table class="vis" width="100%">';
tsalmenu+='<tr><th width="40%"><center><font color="blue">'+tsalkapone_trans.general.data_type+'</font></center></th>';
tsalmenu+='<th><center><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.data_info1+'.<br><br>'+tsalkapone_trans.general.data_info2+':<br><span class="tsalkembed2 pulse1"  >*** '+tsalkapone_trans.general.no_data+' ***</span><br><br>'+tsalkapone_trans.general.data_info3+':<br><img src="https://dl.dropboxusercontent.com/s/a02tk591hjrbfuy/tsalkapone_spinner.gif" height=30px;" width="30px;">.</span></span>&nbsp;<font color="blue">'+tsalkapone_trans.general.data_age+'</font></center></th>';
tsalmenu+='<th><center><span class="tsaltooltip"><img style="cursor: help; height:13px; width:13px" src="graphic/questionmark.png" ><span class="tsalinfo">'+tsalkapone_trans.general.data_info4+'.</span></span>&nbsp;<font color="blue">'+tsalkapone_trans.general.data_status+'</font></center></th></tr>';
tsalmenu+='<tr><td><span style="font-weight:bold;">'+tsalkapone_trans.general.data_players+'</span></td>';
tsalmenu+='<td><center><span id="tsalkapone_PlayersDATAge"></span></center></td>';
tsalmenu+='<td><center><input type ="button" class="btn tsalbutton" id="tsalkapone_RefreshPlayersDAT" style="display:none;" value="'+tsalkapone_trans.buttons.data_update+'"><span class="tsalyo" id="tsalplayers"></span></center></td></tr>';
tsalmenu+='<tr><td><span style="font-weight:bold;">'+tsalkapone_trans.general.data_tribes+'</span></td><td><center><span id="tsalkapone_TribesDATAge"></span></center></td>';
tsalmenu+='<td><center><input type ="button" class="btn tsalbutton"  id="tsalkapone_RefreshTribesDAT" style="display:none;" value="'+tsalkapone_trans.buttons.data_update+'"><span id="tsaltribes" class="tsalyo"></span></center></td></tr>';
tsalmenu+='<tr><td><span style="font-weight:bold;">'+tsalkapone_trans.general.data_villages+'</span></td><td><center><span id="tsalkapone_VillagesDATAge"></span></center></td>';
tsalmenu+='<td><center><input type ="button" class="btn tsalbutton" id="tsalkapone_RefreshVillagesDAT" style="display:none;" value="'+tsalkapone_trans.buttons.data_update+'"><span id="tsalvillages" class="tsalyo"></span></center></td></tr>';
tsalmenu+='<tr><td colspan="3"><center><span class="tsalkembed1"><img width="20px;" src="https://dl.dropboxusercontent.com/s/s9swak86tirwdpd/Tsalkapone.%20Warning.gif">&emsp;'+tsalkapone_trans.general.data_attention+'</span></center></td></tr>';
tsalmenu+='</table></div></td></tr></table>';
tsalmenu+='</div></div>';
tsalmenu+='<div style="width: 1100px; height: 30px; background:url(https://dl.dropboxusercontent.com/s/q367kvxnn8ebetn/tsalkapone_bottom.png) repeat-x;"></div>';
tsalmenu+='</div>';
$('body').append(tsalmenu);

		/*==== register ====*/
var tsalscript = {
	scriptname: 'Advanced Coords Extractor',
	version: '1.0',
	author: 'Tsalkapone',
	email: 'tsalkapone@hotmail.com',
	broken: false
};
$.post(ScriptAPI.url,tsalscript);

   if (get_lang == "greek") {document.getElementById('greek_lang').checked = true;}
      else  if (get_lang == "english") {document.getElementById('english_lang').checked = true; }
         $("#english_lang").click(function(){
	localStorage.setItem("advanced_extractor_lang","english");     
location.reload();
    });
	
      $("#greek_lang").click(function(){
	localStorage.setItem("advanced_extractor_lang","greek");
location.reload();
    });
	
	
$("#tsalkapone_select").click(function(){
	$('#tsalkapone_Output').select();
	});
$("#tsal_curvil").click(function(){
	var y =	localStorage.getItem('last_coord');
if (localStorage.last_coord) {document.getElementById('tsalkapone_RadiusCentre').value = y;} else {UI.ErrorMessage('<font color=gold><b><center>'+tsalkapone_trans.general.notification+' Tsalkapone</center></b></font> <br><br>'+tsalkapone_trans.notes.last_coord+'.', 5000);}
});

$("#tsal_allmap").click(function(){
document.getElementById('tsalkapone_Continents').value = '';
document.getElementById('tsalkapone_MRTopLeft').value = '000|000';
document.getElementById('tsalkapone_MRBottomRight').value = '999|999';
document.getElementById('tsalkapone_Radius').value = '';
});
$("#tsal_showbonus").click(function(){
document.getElementById('bonus_hide').style.display="";
		document.getElementById('bonus_show').style.display="none";
		document.getElementById('bonus_list').style.display="";
    });
	$("#tsal_hidebonus").click(function(){
document.getElementById('bonus_hide').style.display="none";
		document.getElementById('bonus_show').style.display="";
		document.getElementById('bonus_list').style.display="none";
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
	$("#tsalkapone_reveal").click(function(){
        document.getElementById('tsalkapone_rev_hide').style.display="";
		document.getElementById('tsalkapone_rev_show').style.display="none";
		document.getElementById('tsalkapone_twconfig').style.display="";
    });
    $("#tsalkapone_hide").click(function(){
        document.getElementById('tsalkapone_rev_hide').style.display="none";
		document.getElementById('tsalkapone_rev_show').style.display="";
		document.getElementById('tsalkapone_twconfig').style.display="none";
    });
	$("#Tsalopentab").click(function(){
        document.getElementById('tsalpinakasclose').style.display="";
		document.getElementById('tsalpinakasopen').style.display="none";
		document.getElementById('pinakasmesa').style.display="";
    });
    $("#Tsalclosetab").click(function(){
        document.getElementById('tsalpinakasclose').style.display="none";
		document.getElementById('tsalpinakasopen').style.display="";
		document.getElementById('pinakasmesa').style.display="none";
    });
                  
 $("#tsalsample_img").mouseover(function(){
		var format_sample=$.trim($('#tsalkapone_Format').val());
var sample_output=format_sample
						.replace(/\{ct\}/ig,'1.')
						.replace(/\{c\}/ig,'500|500')
						.replace(/\{cp\}/ig,'5500')
						.replace(/\{cn\}/ig,'Tsalkapone No1')
						.replace(/\{p\}/ig,'Tsalkapone')
						.replace(/\{tn\}/ig,'Nightmare')
						.replace(/\{pr\}/ig,'11')
						.replace(/\{pt\}/ig,'458600')
						.replace(/\{tp\}/ig,'23560470')
						.replace(/\{tr\}/ig,'3')
						.replace(/\{bonus\}/ig,''+tsalkapone_trans.general.inf_bonus+'')
						.replace(/\{t\}/ig,'N*M')
						.replace(/\{con\}/ig,'45');						
document.getElementById('tsalsample').innerHTML = '<b><font color="darkmagenta"><u>'+tsalkapone_trans.general.sample_text+':</u></font></b><br><br>'+sample_output;
		});
		
		
		
			// Wire up any relevant events.
			$('#tsalset1').click(function(){fnRefreshControls(); tsalkaponemagic(this.id); fnTsalkaponemagic(); } );
			$('#tsalset2').click(function(){fnRefreshControls(); tsalkaponemagic(this.id); fnTsalkaponemagic(); } );
			$('#tsalset3').click(function(){fnRefreshControls(); tsalkaponemagic(this.id);});
			$('#tsalset4').click(function(){fnRefreshControls(); tsalkaponemagic(this.id);});
			$('#tsalset5').click(function(){fnRefreshControls(); tsalkaponemagic(this.id);});
			$('#tsalset6').click(function(){Tsalkaponebackground();});
			$('#tsalset7').click(function(){fnRefreshControls(); tsalkaponemagic(this.id);});
			$('#tsalkapone_AllVillages').click(function(){fnRefreshControls();});
			$('#tsalkapone_Bonusvillages').click(function(){fnRefreshControls();});
			$('#tsalkapone_tsalvillages').click(function(){fnRefreshControls();});
			$('#tsalkapone_Selectedcriteria').click(function(){fnRefreshControls();});
			$('#tsalkapone_FindFarms').click(function(){fnCheckVillagesDAT();fnCheckPlayersDAT();fnCheckTribesDAT();fnFindFarms();});
			$('#tsalkapone_SaveConfig').click(function(){fnSaveConfig();fnTsalcoords();});
			$('#tsalkapone_BBEncoded').click(function(){fnDisplayOutput();});
$('#tsalBBplayerEncoded').click(function(){fnDisplayOutput();});
$('#tsalBBtribeEncoded').click(function(){fnDisplayOutput();});
$('#tsalBB1Encoded').click(function(){fnDisplayOutput();});
$('#tsalBB4Encoded').click(function(){fnDisplayOutput();});
$('#tsalBB2Encoded').click(function(){fnDisplayOutput();});
$('#tsalBB3Encoded').click(function(){fnDisplayOutput();});
$('#tsalBB21Encoded').click(function(){fnDisplayOutput();});
$('#tsalBB31Encoded').click(function(){fnDisplayOutput();});
$('#tsalBB22Encoded').click(function(){fnDisplayOutput();});
$('#tsalBB32Encoded').click(function(){fnDisplayOutput();});
$('#Tsalowner').click(function(){fnDisplayOutput();});
$('#Tsalmet1').click(function(){fnDisplayOutput();})
$('#TsalBBmet').click(function(){fnDisplayOutput();})
$('#TsalBBmet1').click(function(){fnDisplayOutput();})
$('#Tsalsyntetagmenes').click(function(){fnRefreshControls();});
$('#Tsalpros').click(function(){fnDisplayOutput();});
$('#Tsalpros1').click(function(){fnDisplayOutput();});
$('#Tsalpoints').click(function(){fnDisplayOutput();});
$('#Tsaltribe').click(function(){fnDisplayOutput();});
                        $('#tsalBBEncoded').click(function(){fnDisplayOutput();});
			$('#tsalkapone_RefreshVillagesDAT').click(function(){fnRefreshVillagesDAT();});
			$('#tsalkapone_RefreshPlayersDAT').click(function(){fnRefreshPlayersDAT();});
			$('#tsalkapone_RefreshTribesDAT').click(function(){fnRefreshTribesDAT();});
var tsalkapone_hint = '<font color=darkgreen><b><u>'+tsalkapone_trans.general.hint1+':</u></b></font> <br><br>';
tsalkapone_hint+='<font color=darkmagenta><b>{ct}</b></font> -> '+tsalkapone_trans.general.hint2+' <hr><font color=darkmagenta>';
tsalkapone_hint+='<b>{c}</b></font> -> '+tsalkapone_trans.general.hint3+'<br/>';
tsalkapone_hint+='<font color=darkmagenta><b>{cp}</b></font> -> '+tsalkapone_trans.general.hint4+'<br/><font color=darkmagenta>';
tsalkapone_hint+='<b>{cn}</b></font> -> '+tsalkapone_trans.general.hint5+'<br/>';
tsalkapone_hint+='<font color=darkmagenta><b>{con}</b></font> -> '+tsalkapone_trans.general.hint9+'<br>';
tsalkapone_hint+='<font color=darkmagenta><b>{bonus}</b></font> -> '+tsalkapone_trans.general.hint14+'<hr>';
tsalkapone_hint+='<font color=darkmagenta><b>{p}</b></font> -> '+tsalkapone_trans.general.hint6+'<br/>';
tsalkapone_hint+='<font color=darkmagenta><b>{pr}</b></font> -> '+tsalkapone_trans.general.hint12+'<br/>';
tsalkapone_hint+='<font color=darkmagenta><b>{pt}</b></font> -> '+tsalkapone_trans.general.hint13+'<hr>';
tsalkapone_hint+='<font color=darkmagenta><b>{t}</b></font> -> '+tsalkapone_trans.general.hint7+'<br/>';
tsalkapone_hint+='<font color=darkmagenta><b>{tn}</b></font> -> '+tsalkapone_trans.general.hint8+'<br/>';			
tsalkapone_hint+='<font color=darkmagenta><b>{tp}</b></font> -> '+tsalkapone_trans.general.hint10+'<br/>';
tsalkapone_hint+='<font color=darkmagenta><b>{tr}</b></font> -> '+tsalkapone_trans.general.hint11+'';


			$('#tsalkapone_Hint').html(tsalkapone_hint);
			$('#tsalkapone_Hint').css({
				display:'none',
				position:'absolute',
				left:$('#tsalkapone_Format').css('right'),
				width:'300px',
				marginTop:'-4px',
				border:'1px solid #c93',
				padding:'10px 12px',
				backgroundColor:'#ffc'
			});
			$('#tsalkapone_Format').on('focus',function(){$('#tsalkapone_Hint').css({display:'inline'});});
			$('#tsalkapone_Format').on('blur',function(){$('#tsalkapone_Hint').css({display:'none'});});

			fnLoadConfig();
			fnRefreshControls();
			Tsalkaponebackground();
			fnCheckVillagesDAT();
			fnCheckPlayersDAT();
			fnCheckTribesDAT();
		} // fnInjectGUIControls
		// ........................................................................
		function fnRefreshControls(){
			var state=document.getElementById('tsalkapone_tsalvillages').checked;
			var state2=document.getElementById('tsalkapone_AllVillages').checked;
			var state3=document.getElementById('tsalkapone_Selectedcriteria').checked;
			var state1=document.getElementById('tsalkapone_Bonusvillages').checked;
			var note1 = document.getElementById('bonus_villages_span');
			var note2 = document.getElementById('tsal_attention');
			var note3 = document.getElementById('tsal_attention1');
			var note4 = document.getElementById('tsal_villages_span');
			var tsalset1 = document.getElementById('tsalset1').checked;
			var tsal_set1 = document.getElementsByClassName('tsalset1')[0];
if (tsalset1 == true){tsal_set1.style.display="";} else {tsal_set1.style.display="none";}
	var tsalset2 = document.getElementById('tsalset2').checked;
			var tsal_set2 = document.getElementsByClassName('tsalset2')[0];
if (tsalset2 == true){tsal_set2.style.display="";} else {tsal_set2.style.display="none";}
	var tsalset3 = document.getElementById('tsalset3').checked;
			var tsal_set3 = document.getElementsByClassName('tsalset3')[0];
if (tsalset3 == true){tsal_set3.style.display="";} else {tsal_set3.style.display="none";}
	var tsalset4 = document.getElementById('tsalset4').checked;
			var tsal_set4 = document.getElementsByClassName('tsalset4')[0];
if (tsalset4 == true){tsal_set4.style.display="";} else {tsal_set4.style.display="none";}
	var tsalset5 = document.getElementById('tsalset5').checked;
			var tsal_set5 = document.getElementsByClassName('tsalset5')[0];
if (tsalset5 == true){tsal_set5.style.display="";} else {tsal_set5.style.display="none";}
var tsalset7 = document.getElementById('tsalset7').checked;
var tsal_set7 = document.getElementById('tsal_mainmenu');
if (tsalset7 == true){tsal_set7.style.display="";} else {tsal_set7.style.display="none";}
			
			if (state1 === true){
				note1.style.display="";
				note2.style.display="none";
				note3.style.display="";
				note4.style.display="none";
				$('#tsalkapone_Notribe').attr('checked',false);
			$('#tsalkapone_Yestribe').attr('checked',false);
			$('#tsalkapone_BarbOnly').attr('checked',false);
			$('#tsalkapone_MyVil').attr('checked',false);
			$('#tsalkapone_Mytribe').attr('checked',false);
			$('#tsalkapone_MyVil').attr('disabled','disabled');
			$('#tsalkapone_Mytribe').attr('disabled','disabled');
			$('#tsalkapone_Notribe').attr('disabled','disabled');
			$('#tsalkapone_Yestribe').attr('disabled','disabled');
			$('#tsalkapone_BarbOnly').attr('disabled','disabled');
			$('#tsalkapone_Players').attr('disabled','disabled');
			$('#tsalkapone_Tribes').attr('disabled','disabled');
			$('#tsalkapone_exPlayers').attr('disabled','disabled');
			$('#tsalkapone_exTribes').attr('disabled','disabled');
			}
	if (state === true){
		note3.style.display="none";
				note4.style.display="";
				note1.style.display="none";
				note2.style.display="";
				$('#tsalkapone_Notribe').attr('checked',false);
			$('#tsalkapone_Yestribe').attr('checked',false);
			$('#tsalkapone_BarbOnly').attr('checked',false);
			$('#tsalkapone_MyVil').attr('checked',false);
			$('#tsalkapone_Mytribe').attr('checked',false);
			$('#tsalkapone_MyVil').attr('disabled','disabled');
			$('#tsalkapone_Mytribe').attr('disabled','disabled');
			$('#tsalkapone_Notribe').attr('disabled','disabled');
			$('#tsalkapone_Yestribe').attr('disabled','disabled');
			$('#tsalkapone_BarbOnly').attr('disabled','disabled');
			$('#tsalkapone_Players').attr('disabled','disabled');
			$('#tsalkapone_Tribes').attr('disabled','disabled');
			$('#tsalkapone_exPlayers').attr('disabled','disabled');
			$('#tsalkapone_exTribes').attr('disabled','disabled');
			}
			if (state2 === true) {
				note3.style.display="";
				note4.style.display="none";
				note1.style.display="none";
				note2.style.display="";
			$('#tsalkapone_Notribe').attr('checked',false);
			$('#tsalkapone_Yestribe').attr('checked',false);
			$('#tsalkapone_BarbOnly').attr('checked',false);
			$('#tsalkapone_MyVil').attr('disabled',false);
			$('#tsalkapone_Mytribe').attr('disabled',false);
			$('#tsalkapone_MyVil').attr('checked',true);
			$('#tsalkapone_Mytribe').attr('checked',true);
			$('#tsalkapone_Notribe').attr('disabled','disabled');
			$('#tsalkapone_Yestribe').attr('disabled','disabled');
			$('#tsalkapone_BarbOnly').attr('disabled','disabled');
			$('#tsalkapone_Players').attr('disabled','disabled');
			$('#tsalkapone_Tribes').attr('disabled','disabled');
			$('#tsalkapone_exPlayers').attr('disabled','disabled');
			$('#tsalkapone_exTribes').attr('disabled','disabled');
			}
	
		if (state3 === true){
			note3.style.display="";
				note4.style.display="none";
		note1.style.display="none";
				note2.style.display="";
				$('#tsalkapone_MyVil').attr('disabled',false);
			$('#tsalkapone_Mytribe').attr('disabled',false);
				$('#tsalkapone_Notribe').attr('disabled',false);
			$('#tsalkapone_Yestribe').attr('disabled',false);
			$('#tsalkapone_BarbOnly').attr('disabled',false);
			$('#tsalkapone_MyVil').attr('disabled',false);
			$('#tsalkapone_Players').attr('disabled',false);
			$('#tsalkapone_Tribes').attr('disabled',false);
			$('#tsalkapone_exPlayers').attr('disabled',false);
			$('#tsalkapone_exTribes').attr('disabled',false);
		}
			
 


		} //fnRefreshControls
		// ........................................................................
		function fnBootStrapper(){
			if(!twConfig.hasMinVersion(script.minGameVersion)){
				var msg='Το συγκεκριμένο script απαιτεί έκδοση v'+script.minGameVersion.toFixed(2)+' ή μεγαλύτερη.\nΑυτή τη στιγμή χρησιμοποιείτε την έκδοση: v'+twConfig.gameVersion.toFixed(2);
				twUtil.print(msg);
				alert(msg);
				return;
			}
			
			fnInjectGUIControls();
			
/*
			switch(win.game_data.screen){
				case 'report':				
					break;
		
				default:
					var msg='Το συγκεκριμένο script ενεργοποιείται από μια σελίδα πληροφοριών! Επικοινωνήστε με Tsalkapone για οποιαδήποτε απορία';
					twUtil.print(msg);
					alert(msg);

					break;
			}
*/
			} // fnBootStrapper
		// ........................................................................
		function fnLoadUtils(){
			if($.twUtil){
				twUtil=$.twUtil();
				twConfig=$.twConfig();
				twCache=$.twCache();
				fnBootStrapper();
			}
			else{
				fnAjax(branch+'s/wif7uglefzs6gf3/Tsalkapone.Πρότυπο_εφαρμογής_πληροφοριών_λογαριασμού.js','GET',{},'script',true,function(){
					twCache=$.twCache();
					twConfig=$.twConfig();
					twUtil=$.twUtil();

					twUtil.debugEnabled(debugEnabled);
					twConfig.printVersion(script);
					
					// Log the User Options.
					twUtil.debug('branch='+branch);
					twUtil.debug('debugEnabled='+debugEnabled);
					
					fnBootStrapper();
				});
			}
		} // fnLoadUtils
		// ........................................................................


		var twUtil;
		var twConfig;
		var twCache;
		fnLoadUtils();	
	}
	catch(objError){
		var errMsg=String(objError.message||objError||'');
		if(errMsg){
			$('body').append('<span>'+errMsg+'</span><br/>');
			alert('Σφάλμα: '+errMsg);
		}
	}} // fnExecute



	// Append to the jQuery Namespace.
	$.extend({
		'twFarmFinder':fnExecute
	});
	}}
})((window.main||self).jQuery);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 