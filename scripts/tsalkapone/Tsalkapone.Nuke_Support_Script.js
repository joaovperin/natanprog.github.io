 var get_lang = localStorage.getItem("rally_point_script_lang");
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
	 script:"Nuke/Support Script",
	 notification:"Notification from",		
		message_no:"No",
		message_yes:"Yes",
		message_1:"This script is activated on Rally Point.",
		message_2:" Do you want to automatically assign your location to this page?",
		comm:"Feel free to send any message regarding script bugs or proposing ideas to",
		units:"Units' Inserting Method",
		coords:"Coords' Inserting Method",
		variables:"Customizable Variables",
		fake_lang:"Language",
		info1:"The script will insert every selected value of every unit. If the available units of a unit-type are equal to zero the script will skip this unit-type. If it is above zero but below the selected value every remaining amount of the unit will be inserted. If you want to insert all the units of a specific unit-type just enter a high enough value i.e. <b>24000 or 1e6 (=1 million)</b>. For instance if you enter <b>1e6</b> in spears and swords the script will enter all the spearmen and the swordmen",
		info2:"The script chooses a coordinate in a consecutive order out of the selected targets  to insert in the rally point. The process of the order will be displayed in every script activation",
		info3:"Enter a value that will be used as the name of the script",
		info4:"Enter a value that will be used as cookie name for the coords' order",
		info5:"Enter the coordinates of the desired targets. Add as many as you like separating them with space i.e.",
		info6:"Enter the desired values for each unit",
		info7:"The language of every rally point's script that doesn't display a settings menu is defined by the language selection in the script",
	},
	notes:{
		coords:"No selected coords were detected. Define some targets and try again.",
		 no_units:"There were found no available units. Change village or settings and try again.",
		 last:"These are the last selected coords. Activate the script again to restart.",
		 target:"Current target",
	},
};
tsalkapone_trans.greek= { 
	 general:{ 
	 script:"Nuke/Support Script",
	 notification:"Ειδοποίηση από τον",
			message_no:"Όχι",
		message_yes:"Ναι",
		message_1:"Το συγκεκριμένο script ενεργοποιείται από το Μέρος Συγκέντρωσης.",
		message_2:"Επιθυμείτε αυτόματη ανακατεύθυνση;",
		comm:"Επικοινωνήστε ανά πάσα στιγμή για οποιαδήποτε ιδέα ή πρόταση σχετικά με τα scripts με τον",
		units:"Μέθοδος Εισαγωγής Μονάδων",
		coords:"Μέθοδος Εισαγωγής Συντεταγμένων",
		variables:"Προσαρμόσιμες Μεταβλητές",
		fake_lang:"Επιλογή Γλώσσας",
		info1:"To script θα εισάγει τις επιλεγμένες τιμές κάθε μονάδας. Αν η τιμή μιας μονάδας εντός του μέρους συγκέντρωσης είναι ίση με το μηδέν τότε θα αγνοηθεί από το script. Αν είναι μικρότερη της επιλεγμένης θα εισαχθούν όλες οι εναπομείνατες μονάδες. Αν επιθυμείτε να εισάγετε όλο το πλήθος μιας μονάδας απλά επιλέξτε μια μεγάλη τιμή π.χ. 24000 ή 1e6 (=1.000.000)",
		info2:"Το script επιλέγει μια συντεταγμένη σε διαδοχική σειρά, από τη λίστα των επιλεγμένων στόχων, για να εισάγει στο Μέρος Συγκέντρωσης",
		info3:"Εισάγετε μια τιμή που θα χρησιμοποιηθεί ως ονομασία του script",
		info4:"Εισάγετε μια τιμή που θα χρησιμοποιηθεί ως ονομασία cookie για τη σειρά των συντεταγμένων",
		info5:"Εισάγετε τις συντεταγμένες των στόχων προσθέτοντας όσες επιθυμείτε διαχωρίζοντας τες με κενό π.χ.",
		info6:"Ορίστε τις επιθυμητές τιμές για κάθε μονάδα",
		info7:"Η γλώσσα κάθε script που λειτουργεί από το Μέρος Συγκέντρωσης και δεν διαθέτει ενσωματωμένο μενού ρυθμίσεων καθορίζεται από την επιλογή γλώσσας στο script",
	},
	notes:{
		coords:"Δεν εντοπίστηκαν αποθηκευμένες συντεταγμένες. Ορίστε μερικούς στόχους και ενεργοποιήστε εκ νέου το script.",
		no_units:"Δεν βρέθηκαν διαθέσιμες μονάδες. Αλλάξτε χωριό ή ρυθμίσεις και δοκιμάστε ξανά.",
		target:"Τρέχων στόχος",
		last:"Αυτές είναι οι τελευταίες αποθηκευμένες συντεταγμένες. Ενεργοποιήστε εκ νέου το script για επανεκκίνηση της ακολουθίας.",
		
	},
};
    return tsalkapone_trans[lang];
    }());
	}
	
var Dialog1;(function(){'use strict';Dialog1={MAX_WIDTH:1200,closeCallback:null,show:function(id,content,closeCallback,options){options=$.extend({class_name:'',close_from_fader:true},options);this.closeCallback=closeCallback;var fullscreenElement=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement,container=fullscreenElement||'body',$container=$('.popup_box_container'),$box,$fader,$content,show_anim=false;if(!$container.length){show_anim=true;$container=$('<div class="popup_box_container" />');$box=$('<div class="popup_box" />').attr('id','popup_box_'+id).addClass(options.class_name).data('name',id).appendTo($container);$fader=$('<div class="fader" />').appendTo($container);$content=$('<div class="popup_box_content" />').appendTo($box);$container.appendTo($(container))}else{$box=$container.find('.popup_box');if($box.data('name')!==id){Dialog1.close();Dialog1.show(id,content,closeCallback,options);return};$content=$container.find('.popup_box_content');$box.css('width','auto')};$content.html(content);var height_buffer=125;if($(window).width()<500||$(window).height()<$content.height()+height_buffer){$box.addClass('mobile');$('.popup_box_content').css({'max-height':$(window).height()-(height_buffer/2)+'px'})};var border_width;if(typeof window.getComputedStyle==='function'){border_width=parseInt(getComputedStyle($box[0],null).borderLeftWidth)}else border_width=parseInt($box.css('border-left-width'));var min_width=200,width=Math.min(this.MAX_WIDTH,$content.width(),$(window).width()-border_width);if(width<min_width)width=min_width;if(!Modernizr.borderimage)width+=20;$box.css('width',width+'px');var hotkey_hint=(!mobile&&!mobiledevice&&HotKeys.enabled)?' :: ΟΟΞ½ΟΟΞΌΞ΅ΟΟΞ· ΟΞ»Ξ·ΞΊΟΟΞΏΞ»ΞΏΞ³Ξ―ΞΏΟ: <b>Esc</b>':'',tooltip_class=(!mobile&&!mobiledevice)?'tooltip-delayed':'',$close=$('<a class="popup_box_close '+tooltip_class+'" title="ΞΞ»Ξ΅Ξ―ΟΞ΅'+hotkey_hint+'" href="#">&nbsp;</a>').prependTo($content);UI.ToolTip($close,{delay:400});var close_elements=options.close_from_fader?'.fader, .popup_box_close, .popup_closer':'.popup_box_close, .popup_closer';$container.on('click',close_elements,function(){Dialog1.close(true);return false});if(show_anim)setTimeout(function(){$box.addClass('show')},50);UI.init();UnitPopup.init();setTimeout(QuestArrows.init,500)},close:function(by_user){$('.popup_box_container').remove();if(Dialog1.closeCallback)Dialog1.closeCallback(by_user);inlinePopupClose();$('.popup_style').hide();QuestArrows.init();return false},fetch:function(name,screen,get_params,callback,Dialog1_options,closeCallback){TribalWars.get(screen,get_params,function(data){Dialog1.show(name,data.Dialog1,closeCallback,Dialog1_options);if(callback)callback()})}}})();
 	
	 window.addEventListener("keydown", tsalentoleskeyboard, false);   
     function tsalentoleskeyboard(e) {
           
 if (e.keyCode == "84") {
	 var contact_url = "https://forum.tribalwars.net/member.php?114063-Tsalkapone";
	   var content = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="darkgreen">Tsalkapone. '+tsalkapone_trans.general.script+'</font></u></center></h2>' +
'<hr><p><font color=maroon><b><u>1. '+tsalkapone_trans.general.units+'</u></b></font></p>' +
'<p>'+tsalkapone_trans.general.info1+'.</p>'+
'<p><hr><font color=maroon><b><u>2. '+tsalkapone_trans.general.coords+'</u></b></font></p>' +
'<p>'+tsalkapone_trans.general.info2+'.</p>'+
'<p><hr><font color=maroon><b><u>3. '+tsalkapone_trans.general.variables+'</u></b></font></p>' +
'<font color="red"><b>Tsalkapone_script_title:</b></font> '+tsalkapone_trans.general.info3+'.'+
'<br><br><font color="red"><b>Tsalkapone_cookieID:</b></font> '+tsalkapone_trans.general.info4+'.'+
'<br><br><font color="red"><b>Tsalkapone_coords:</b></font> '+tsalkapone_trans.general.info5+' <i>532|516 451|450 430|420</i>.'+
'<br><br><font color="red"><b>spy,spear,axe,light,ram etc:</b></font> '+tsalkapone_trans.general.info6+'.'+
'<p><hr><font color=maroon><b><u>4. '+tsalkapone_trans.general.fake_lang+'</u></b></font></p>' +
'<p>'+tsalkapone_trans.general.info7+' <b><font color="blue">Commander Script</font></b>.</p>'+
'<hr><center><img class="tooltip-delayed" title="<font color=darkgreen>Tsalkapone. '+tsalkapone_trans.general.script+'</font>" src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg" style="cursor:help; position: relative"></center><br><center><p>'+tsalkapone_trans.general.comm+' <a href="'+contact_url+'" title="Tsalkapone profile" target="_blank">Tsalkapone</a>.</p></center>' +
'</div>';            
Dialog1.show('farmingscript_info', content);
$("#go_man").click(function () { window.location.assign(game_data.link_base_pure+"place");});   
$("#close_this").click(function () { var close_this = document.getElementsByClassName('popup_box_close'); close_this[0].click(); });
 }
		  }
var Tsalactivepage = location.href.indexOf('screen=place') > -1;
			if (!Tsalactivepage) {
				var contact_url = "https://forum.tribalwars.net/member.php?114063-Tsalkapone";
	   var content = '<div style=max-width:1000px;>' +
'<h2 class="popup_box_header"><center><u><font color="darkgreen">Tsalkapone. '+tsalkapone_trans.general.script+'</font></u></center></h2>' +
'<hr><p><center><font color=maroon><b>'+tsalkapone_trans.general.message_1+'</b></font></center></p>' +
'<p><center><font color=maroon><b>'+tsalkapone_trans.general.message_2+'</b></font></center></p>' +
'<br><br><center><input type="button" class="btn evt-confirm-btn btn-confirm-yes" id="go_man" value="'+tsalkapone_trans.general.message_yes+'">&emsp;<input type="button" class="btn evt-cancel-btn btn-confirm-no" id="close_this" value="'+tsalkapone_trans.general.message_no+'"></center>'+ 
'<br><br><hr><center><img class="tooltip-delayed" title="<font color=darkgreen>Tsalkapone. '+tsalkapone_trans.general.script+'</font>" src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg" style="cursor:help; position: relative"></center><br><center><p>'+tsalkapone_trans.general.comm+' <a href="'+contact_url+'" title="Tsalkapone profile" target="_blank">Tsalkapone</a>.</p></center>' +
'</div>';            
Dialog.show('farminscript_info_intro', content);
$("#go_man").click(function () { window.location.assign(game_data.link_base_pure+"place");});   
$("#close_this").click(function () { var close_this = document.getElementsByClassName('popup_box_close'); close_this[0].click(); });
	} 
	else if(Tsalkapone_coords.replace(/^\s\s*/,'').replace(/\s\s*$/,'')==='')
	{UI.ErrorMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> '+tsalkapone_trans.notes.coords+'', 5000);}
else {		  var d=document;

		/*==== register ====*/
var script = {
	scriptname: 'Nuke-Support Script',
	version: '1.0',
	author: 'Tsalkapone',
	email: 'tsalkapone@hotmail.com',
	broken: false
};
$.post(ScriptAPI.url,script);

     var scripttitle = Tsalkapone_script_title;
	   var scriptno= Tsalkapone_cookieID;
  
if (document.getElementById('units_entry_all_spear')) {   var spear1 = parseInt( $('#units_entry_all_spear').text().replace(/[^0-9]/gi, ''));} else { spear1 = 0;}
 if (document.getElementById('units_entry_all_axe')) {   var axe1 = parseInt( $('#units_entry_all_axe').text().replace(/[^0-9]/gi, ''));} else { axe1 = 0;}
if (document.getElementById('units_entry_all_sword')) {   var sword1 = parseInt( $('#units_entry_all_sword').text().replace(/[^0-9]/gi, ''));} else { sword1= 0;}
if (document.getElementById('units_entry_all_light')) {   var light1 = parseInt( $('#units_entry_all_light').text().replace(/[^0-9]/gi, ''));} else { light1 = 0;}                
if (document.getElementById('units_entry_all_spy')) {   var spy1 = parseInt( $('#units_entry_all_spy').text().replace(/[^0-9]/gi, ''));} else { spy1 = 0;}
if (document.getElementById('units_entry_all_heavy')) {   var heavy1 = parseInt( $('#units_entry_all_heavy').text().replace(/[^0-9]/gi, ''));} else { heavy1 = 0;}
if (document.getElementById('units_entry_all_ram')) {   var ram1 = parseInt( $('#units_entry_all_ram').text().replace(/[^0-9]/gi, ''));} else { ram1 = 0;}
if (document.getElementById('units_entry_all_catapult')) {   var catapult1 = parseInt( $('#units_entry_all_catapult').text().replace(/[^0-9]/gi, ''));} else { catapult1 = 0;}
if (document.getElementById('units_entry_all_snob')) {   var snob1 = parseInt( $('#units_entry_all_snob').text().replace(/[^0-9]/gi, ''));} else { snob1 = 0;}
 if (document.getElementById('unit_input_archer')) {
if (document.getElementById('units_entry_all_archer')) { var archer1 = parseInt( $('#units_entry_all_archer').text().replace(/[^0-9]/gi, '')); }else { archer1 = 0;}
if (document.getElementById('units_entry_all_marcher')) { var marcher1 = parseInt( $('#units_entry_all_marcher').text().replace(/[^0-9]/gi, ''));} else { marcher1 = 0;}
}
ελαφρύ = light;
βαρύ = heavy;
έφιππος = marcher;
τσεκούρι = axe;
τοξότης = archer;
δόρυ = spear;
ξίφος = sword;
κριός = ram;
καταπέλτης = catapult;
ανιχνευτής = spy;
άριστος = snob;

 
function tsalkapone_insert_troops1() {   
 if (light1 >= ελαφρύ && ελαφρύ>0) {   d.forms[0].light.value= ελαφρύ; }
else if (light1 < ελαφρύ && light1>0 && ελαφρύ>0) {   d.forms[0].light.value= light1; }
if (heavy1 >= βαρύ && βαρύ>0) {   d.forms[0].heavy.value= βαρύ; }
else if (heavy1 < βαρύ && heavy1>0 && βαρύ>0) {   d.forms[0].heavy.value= heavy; } 
if (document.getElementById('unit_input_marcher') && marcher1 >= έφιππος && έφιππος>0) {   d.forms[0].marcher.value= έφιππος; }
else if (document.getElementById('unit_input_marcher') && marcher1 < έφιππος && marcher1>0 && έφιππος>0) {   d.forms[0].marcher.value= marcher1; }   
         
if (axe1 >= τσεκούρι && τσεκούρι>0) {   d.forms[0].axe.value= τσεκούρι; }
else if (axe1 < τσεκούρι && axe1>0 && τσεκούρι>0) {   d.forms[0].axe.value= axe1; }
 if (spear1 >= δόρυ && δόρυ>0) {   d.forms[0].spear.value= δόρυ; }
else if (spear1 < δόρυ && spear1>0 && δόρυ>0) {   d.forms[0].spear.value= spear1; } 
if (document.getElementById('unit_input_archer') && archer1 >= τοξότης && τοξότης>0) {   d.forms[0].archer.value= τοξότης; }
else if (document.getElementById('unit_input_archer') && archer1 < τοξότης && archer1>0 && τοξότης>0) {   d.forms[0].archer.value= archer1; } 
 if (sword1 >= ξίφος && ξίφος>0) {   d.forms[0].sword.value= ξίφος; }
else if (sword1 < ξίφος && sword1>0 && ξίφος>0) {   d.forms[0].sword.value= sword1; }    
if (snob1 >= άριστος && άριστος>0) {   d.forms[0].snob.value= άριστος; }
else if (snob1 < άριστος && snob1>0 && άριστος>0) {   d.forms[0].snob.value= snob1; }    

     if (ram1 >= κριός && κριός>0) {   d.forms[0].ram.value= κριός; }
else if (ram1 <= κριός && ram1>0 && κριός>0) {   d.forms[0].ram.value= ram1; }
if (catapult1 >= καταπέλτης && καταπέλτης>0) {   d.forms[0].catapult.value= καταπέλτης; }
    else if (catapult1 <= καταπέλτης && catapult1>0 && καταπέλτης>0) {   d.forms[0].catapult.value= catapult1; }
if (spy1 >= ανιχνευτής && ανιχνευτής>0) {   d.forms[0].spy.value= ανιχνευτής; }
    else if (spy1 <= ανιχνευτής && spy1>0 && ανιχνευτής>0) {   d.forms[0].spy.value= spy1; }
	
}
     tsalkapone_insert_troops1();
     
   if (Tsalkapone_coords.replace(/^\s\s*/,'').replace(/\s\s*$/,'')==='') {UI.ErrorMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> '+tsalkapone_trans.notes.coords+'', 5000);}
                   else {     var doc=document;if(window.frames.length>0)doc=window.main.document;url=document.URL;
                        var d=document;if(window.frames.length>0){d=window.main.document;}if(d.forms[0].x.value==="")
Tsalkapone_coords=Tsalkapone_coords.split(" ");var index=0;var farmcookie=d.cookie.match('(^|;) ?'+scriptno+'=([^;]*)(;|$)');
if(farmcookie!==null) index=parseInt(farmcookie[2]);if(index>=Tsalkapone_coords.length) index=0;
var coord=Tsalkapone_coords[index];
coord=coord.split("|");
d.forms[0].x.value=coord[0];d.forms[0].y.value=coord[1];
d.getElementsByTagName("h3")[0].innerHTML="<font color=blue>"+scripttitle+". "+tsalkapone_trans.notes.target+" (" + (index+1) + "/" + Tsalkapone_coords.length + ")</font>";
                                             
                         
index=index+1;
       d.cookie=""+scriptno+"=" + index + ";expires=Πέμπτη, 25 Σεπ 2064 09:55:00 GMT";
	      if (index == Tsalkapone_coords.length ){
UI.SuccessMessage('<span id=tsalkaponelastsyn><b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></span><br><br>'+tsalkapone_trans.notes.last+'', 5000);
       }  }   
   
 };