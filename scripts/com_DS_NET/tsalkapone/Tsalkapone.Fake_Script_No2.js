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
	 script:"Fake Script No2",
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
		info1:"The script will only use one type of unit, based on a customizable priority-order, to insert in the rally point. If the available units of a unit-type are equal to zero or below the selected value the script will skip this unit-type. The scouts are an exception to this rule and their value will be inserted regardless. You may re-order the priority of the units' choice by changing the units' order in the variable",
		info2:"The script chooses a coordinate out of the selected targets to insert in the rally point in a consecutive order. You may select a specific target from the targets' list which is displayed in the rally point",
		info3:"Define the value of the scouts to be inserted",
		info4:"Define the priority-order by changing the units' order and also define the value of each unit-type. The names of the units are the ones used as each unit's id in every server",
		info5:"Enter the coordinates of the desired targets. Add as many as you like separating them with space i.e.",
		info6:"The language of every rally point's script that doesn't display a settings menu is defined by the language selection in the script",
		info7:"Enter a value that will be used as the name of the targets' list",
		info8:"Define how many times the script will use a coordinate before changing to the next one in the list",
		info9:"Enter a value that will be used as cookie name for the script's settings",
	},
	notes:{
		coords:"No selected coords were detected. Define some targets and try again.",
		target:"Current target",
				list:"Target list",
				creator:"Created by",
				last:"These were the last selected coords. Activate the script again to restart.",
				 no_units:"There were found no available units. Change village or settings and try again.",
	},
};
tsalkapone_trans.greek= { 
	 general:{ 
	 script:"Fake Script No2",
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
		info1:"Το script θα επιλέξει μόνο ένα είδος μονάδας για να εισάγει στο Μέρος Συγκέντρωσης. Η επιλογή βασίζεται σε μια σειρά προτεραιότητας που μπορεί να ρυθμιστεί. Αν η τιμή μιας μονάδας εντός του μέρους συγκέντρωσης είναι μικρότερη από την επιλεγμένη τιμή ή ίση με το μηδέν τότε θα αγνοηθεί από το script. Οι ανιχνευτές αποτελούν εξαίρεση του κανόνα και η τιμή τους εισάγεται ανεξάρτητα από τις υπόλοιπες τιμές. Η σειρά προτεραιότητας των μονάδων καθορίζεται στη μεταβλητή",
		info2:"Το script επιλέγει συντεταγμένες, από τη λίστα των επιλεγμένων στόχων, με διαδοχική ακολουθία. Δύναται να επιλέξετε συγκεκριμένο στόχο από τη λίστα στόχων που εμφανίζεται στο Μέρος Συγκέντρωσης. Κάθε φορά που η ακολουθία ολοκληρώνεται θα λαμβάνετε σχετική ενημέρωση",
		info3:"Ορίστε τη τιμή των ανιχνευτών",
		info4:"Ορίστε τη σειρά προτεραιότητας των μονάδων και την τιμή τους. Τα ονόματα των μονάδων είναι αντίστοιχα των id κάθε είδους μονάδας που χρησιμοποιούνται από όλους τους servers",
		info5:"Εισάγετε τις συντεταγμένες των στόχων προσθέτοντας όσες επιθυμείτε διαχωρίζοντας τες με κενό π.χ.",
		info6:"Η γλώσσα κάθε script που λειτουργεί από το Μέρος Συγκέντρωσης και δεν διαθέτει ενσωματωμένο μενού ρυθμίσεων καθορίζεται από την επιλογή γλώσσας στο script",
		info7:"Εισάγετε μια τιμή που θα χρησιμοποιηθεί ως ονομασία της λίστας στόχων",
		info8:"Ορίστε πόσες φορές θα εισαχθεί μια συντεταγμένη πριν επιλεχθεί η επόμενη",
		info9:"Εισάγετε μια τιμή που θα χρησιμοποιηθεί ως ονομασία cookie για τις ρυθμίσεις του script",
	},
	notes:{
		coords:"Δεν εντοπίστηκαν αποθηκευμένες συντεταγμένες. Ορίστε μερικούς στόχους και ενεργοποιήστε εκ νέου το script.",
		target:"Τρέχων στόχος",
				list:"Λίστα στόχων",
				creator:"Δημιουργήθηκε από τον",
				last:"Αυτές ήταν οι τελευταίες αποθηκευμένες συντεταγμένες. Ενεργοποιήστε εκ νέου το script για επανεκκίνηση της ακολουθίας.",
				no_units:"Δεν βρέθηκαν διαθέσιμες μονάδες. Αλλάξτε χωριό ή ρυθμίσεις και δοκιμάστε ξανά.",
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
'<p>'+tsalkapone_trans.general.info1+' <font color="red"><b>Tsalkapone_units_order</b></font>.</p>'+
'<p><hr><font color=maroon><b><u>2. '+tsalkapone_trans.general.coords+'</u></b></font></p>' +
'<p>'+tsalkapone_trans.general.info2+'.</p>'+
'<p><hr><font color=maroon><b><u>3. '+tsalkapone_trans.general.variables+'</u></b></font></p>' +
'<font color="red"><b>Tsalkapone_scouts:</b></font> '+tsalkapone_trans.general.info3+'.'+
'<br><br><font color="red"><b>Tsalkapone_units_order:</b></font> '+tsalkapone_trans.general.info4+'.'+
'<br><br><font color="red"><b>Tsalkapone_coords:</b></font> '+tsalkapone_trans.general.info5+' <i>532|516 451|450 430|420</i>.'+
'<br><br><font color="red"><b>Tsalkapone_target:</b></font> '+tsalkapone_trans.general.info7+'.'+
'<br><br><font color="red"><b>Tsalkapone_repeat:</b></font> '+tsalkapone_trans.general.info8+'.'+
'<br><br><font color="red"><b>Tsalkapone_cookieID:</b></font> '+tsalkapone_trans.general.info9+'.'+
'<p><hr><font color=maroon><b><u>4. '+tsalkapone_trans.general.fake_lang+'</u></b></font></p>' +
'<p>'+tsalkapone_trans.general.info6+' <b><font color="blue">Commander Script</font></b>.</p>'+
'<center><img class="tooltip-delayed" title="<font color=darkgreen>Tsalkapone. '+tsalkapone_trans.general.script+'</font>" src="https://dl.dropboxusercontent.com/s/dt6t7jl1dqkjja9/Tsalkapone_joker.jpg" style="cursor:help; position: relative"></center><br><center>'+tsalkapone_trans.general.comm+' <a href="'+contact_url+'" title="Tsalkapone profile" target="_blank">Tsalkapone</a>.</center>' +
'</div>';            
Dialog1.show('fakescript1_info', content);
$("#go_man").click(function () { window.location.assign(game_data.link_base_pure+"place");});   
$("#close_this").click(function () { var close_this = document.getElementsByClassName('popup_box_close'); close_this[0].click(); });
 }
		  }
		  
	var doc=document;
//if(window.frames.length>0)doc=window.main.document;url=document.URL;

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
Dialog.show('fakescript2_info_intro', content);
$("#go_man").click(function () { window.location.assign(game_data.link_base_pure+"place");});   
$("#close_this").click(function () { var close_this = document.getElementsByClassName('popup_box_close'); close_this[0].click(); });
	} 
	else if(Tsalkapone_coords.replace(/^\s\s*/,'').replace(/\s\s*$/,'')==='')
	{UI.ErrorMessage('<font color=gold><b><center><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></center></b></font> <br><br> '+tsalkapone_trans.notes.coords+'', 5000);}
else {
			/*==== register ====*/
var script = {
	scriptname: 'Fake Script No2',
	version: '1.0',
	author: 'Tsalkapone',
	email: 'tsalkapone@hotmail.com',
	broken: false
};
$.post(ScriptAPI.url,script);

var coords=Tsalkapone_coords.split(' ');
function escapeStr(text)
{var specials=['/','.',',','~','`','@','#','%','-','_','*','+','?','|','$','=',':','!','^','<','>','(',')','[',']','{','}','\\'];
var sRE=new RegExp('(\\'+specials.join('|\\')+')','g');
return text.replace(sRE,'\\$1');}
function zeroPad(number,length)
{var n=number.toString();while(n.length<length){n='0'+n;}return n;}
function fnWriteCookie(index)
{var cookie_date=new Date(2099,11,11);
eleDoc.cookie=vWorld+'$'+config.Tsalkapone_target+'$'+config.Tsalkapone_cookieID+'='+(index+1)+';expires='+cookie_date.toGMTString();}
function fnAssignTsalkapone_μονάδες(index,isManualReset)
{if((index<0)||(index>=coords.length))
{index=0;
if(eleDoc.fakeSequence==1){UI.ErrorMessage('<span id=tsalkaponelastsyn><b><font color=gold><u>'+tsalkapone_trans.general.notification+' Tsalkapone</u></font></b></span><br><br>'+tsalkapone_trans.notes.last+'', 5000);}}
eleDoc.getElementById('fakescript2_Tsalkapone').selectedIndex=index;
var villa=coords[index].split('|');
if(!isManualReset&&(eleDoc.fakeSequence<config.Tsalkapone_repeat))
{eleDoc.fakeSequence++;}
else{eleDoc.fakeSequence=(isManualReset?2:1);
fnWriteCookie(isManualReset?index-1:index);}
var eleForm=document.forms[0];eleForm.x.value=villa[0];eleForm.y.value=villa[1];
var count;
if(Tsalkapone_scouts>0)
{count=parseInt(eleForm.spy.nextSibling.nextSibling.innerHTML.match(/\d+/));
if(count>0&&Tsalkapone_scouts<count){
	eleForm.spy.value=Math.min(Tsalkapone_scouts,count);}}
	for(var Tsalkapone in Tsalkapone_units_order){
		if(Tsalkapone_units_order.hasOwnProperty(Tsalkapone)){
			if((Tsalkapone_units_order[Tsalkapone]>0)&&(typeof(eleForm[Tsalkapone])!="undefined"))
			{count=parseInt(eleForm[Tsalkapone].nextSibling.nextSibling.innerHTML.match(/\d+/));
		if(count>0&&Tsalkapone_units_order[Tsalkapone]<count)
		{eleForm[Tsalkapone].value=Math.min(Tsalkapone_units_order[Tsalkapone],count);break;}
}}}}
//	var eleDoc=(window.frames.length>0)?window.main.document:document;
var eleDoc=document;
	if(typeof(eleDoc.fakeSequence)=='undefined'){eleDoc.fakeSequence=1;}
	var scrape,vScreen=(scrape=eleDoc.URL.match(/\&screen=(\w+)/i))?scrape[1]:null;
	var vWorld=(scrape=eleDoc.URL.match(/\/\/(\w+)\./i))?scrape[1]:null;
	var village=eleDoc.getElementsByTagName('title')[0].innerHTML.match(/\(\d+\|\d+\)/);
	if(vScreen=='place'){
		var index=0;var twCookie=eleDoc.cookie.match('[^|;]s?'+escapeStr(vWorld+'$'+config.Tsalkapone_target+'$'+config.Tsalkapone_cookieID+'=')+'([^;]*)[;|$]');
		if(twCookie){index=parseInt(twCookie[1],10);}
		if(!eleDoc.getElementById('fakescript2_Tsalkapone'))
		{var eleInputs=eleDoc.getElementsByTagName('input');
	if(eleInputs){for(var ii=0;ii<eleInputs.length;ii++)
	{if(eleInputs[ii].name=='support')
	{var optionList='';
for(var jj=0;jj<coords.length;jj++){optionList+='<option>'+zeroPad(jj+1,4)+':'+coords[jj]+'</option>';}
var fakeonoma = config.Tsalkapone_target;
var tsalkapone_div='<TD rowspan="2"><div id="fakes"><table class="main"><tr><td id="tsalkapone_fake_script2"><span style="font-weight:bold">';
tsalkapone_div+='<font color=darkgreen>'+tsalkapone_trans.notes.list+' ~ <font color=red>'+fakeonoma+'</font> :</font>';
tsalkapone_div+='</span><select id="fakescript2_Tsalkapone" name="fakescript2_Tsalkapone" size="1" onchange="fnAssignTsalkapone_μονάδες(this.selectedIndex,true);">';
tsalkapone_div+=''+optionList+'</select><span style="font-weight:100;font-style:italic;text-decoration:none;font-size:x-normal;">';
tsalkapone_div+='<a href="https://forum.tribalwars.net/member.php?114063-Tsalkapone" target="_blank"> '+tsalkapone_trans.notes.creator+' Tsalkapone</a></span></td></tr></table></div></TD>';
                   
eleInputs[ii].parentNode.parentNode.innerHTML+=tsalkapone_div;
break;}

	}}}}
fnAssignTsalkapone_μονάδες(index,false);


void(0);}