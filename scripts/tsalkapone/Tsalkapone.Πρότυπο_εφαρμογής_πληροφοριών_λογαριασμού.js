// ########################################################################
// IMPORTANT: Version Information !!!
// ########################################################################
(window.main||self).twsfwConfig={
	id:'tsalkapone_twconfig',
	version:'v0.08'
};
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
		twconfig:"Click to show/hide the configurations' and errors log in case you encounter any bug or error issues",
		helpers:"The following text can be used to provide essential data in case you encounter errors or bugs",
		help_contact:"If you don't find any scripter you can always seek for assistance from Tsalkapone",
		years:"years",
			weeks:"weeks",
			days:"days",
			hours:"hours",
			mins:"mins",
		
	},
	buttons:{
			  lang_open:"Open language selection",
              lang_close:"Close language selection",
			  set_show:"Show",
			  set_hide:"Hide",
	},
        notes:{
            saved:"The Settings have been successfully saved",
			active:"The Advanced Coords-Extractor is already active",
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
twconfig:"Επιλέξτε για εμφάνιση/απόκρυψη σημειώσεων των ρυθμίσεων και αποτελεσμάτων σε περίπτωση που παρατηρήσετε οποιοδήποτε bug ή σφάλμα",
helpers:"Το ακόλουθο κείμενο μπορεί να προωθηθεί σε οποιοδήποτε scripter σε περίπτωση σφάλματος",
		help_contact:"Σε περίπτωση που επικοινωνήστε με τον Tsalkapone φροντίστε να του παρέχετε το ακόλουθο κείμενο",
		years:"χρόνια",
			weeks:"εβδομάδες",
			days:"μέρες",
			hours:"ώρες",
			mins:"λεπτά",
	},
	buttons:{		
			  lang_open:"Άνοιγμα επιλογής γλώσσας",
              lang_close:"Κλείσιμο επιλογής γλώσσας",  
				set_show:"Εμφάνιση",
			  set_hide:"Απόκρυψη",			  
	},
     notes:{
         saved:"Οι Ρυθμίσεις αποθηκεύτηκαν επιτυχώς",
		 active:"Η Αναζήτηση Χωριών έχει ήδη ενεργοποιηθεί",
        },
};
    return tsalkapone_trans[lang];
    }());
// ########################################################################

/* 
	Authors	: Tsalkapone, Dale McKay
	Email	: tsalkapone@hotmail.com
	Purpose	: Πρότυπο script για διάφορες χρήσεις στις φυλετικές μάχες
	Credit	: 
	Todo	:
	Notes	:

____________________________________________________________

Copyright (C) 2011 Dale McKay, all rights reserved
version 1.0, 10 April 2011

This software is provided 'as-is', without any express or implied warranty. In no event will the author be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:
The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
This notice may not be removed or altered from any source distribution.
____________________________________________________________
*/


/* *************************************** */
// Borrowed plugin for converting XML to JSON
/* *************************************** */
if(!(window.main||self).jQuery.xml2json){
/*
 ### jQuery XML to JSON Plugin v1.0 - 2008-07-01 ###
 * http://www.fyneworks.com/ - diego@fyneworks.com
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 ###
 Website: http://www.fyneworks.com/jquery/xml-to-json/
*/
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}(';5(10.M)(w($){$.N({11:w(j,k){5(!j)t{};w B(d,e){5(!d)t y;6 f=\'\',2=y,E=y;6 g=d.x,12=l(d.O||d.P);6 h=d.v||d.F||\'\';5(d.G){5(d.G.7>0){$.Q(d.G,w(n,a){6 b=a.x,u=l(a.O||a.P);6 c=a.v||a.F||\'\';5(b==8){t}z 5(b==3||b==4||!u){5(c.13(/^\\s+$/)){t};f+=c.H(/^\\s+/,\'\').H(/\\s+$/,\'\')}z{2=2||{};5(2[u]){5(!2[u].7)2[u]=p(2[u]);2[u][2[u].7]=B(a,R);2[u].7=2[u].7}z{2[u]=B(a)}}})}};5(d.I){5(d.I.7>0){E={};2=2||{};$.Q(d.I,w(a,b){6 c=l(b.14),C=b.15;E[c]=C;5(2[c]){5(!2[c].7)2[c]=p(2[c]);2[c][2[c].7]=C;2[c].7=2[c].7}z{2[c]=C}})}};5(2){2=$.N((f!=\'\'?A J(f):{}),2||{});f=(2.v)?(D(2.v)==\'16\'?2.v:[2.v||\'\']).17([f]):f;5(f)2.v=f;f=\'\'};6 i=2||f;5(k){5(f)i={};f=i.v||f||\'\';5(f)i.v=f;5(!e)i=p(i)};t i};6 l=w(s){t J(s||\'\').H(/-/g,"18")};6 m=w(s){t(D s=="19")||J((s&&D s=="K")?s:\'\').1a(/^((-)?([0-9]*)((\\.{0,1})([0-9]+))?$)/)};6 p=w(o){5(!o.7)o=[o];o.7=o.7;t o};5(D j==\'K\')j=$.S(j);5(!j.x)t;5(j.x==3||j.x==4)t j.F;6 q=(j.x==9)?j.1b:j;6 r=B(q,R);j=y;q=y;t r},S:w(a){6 b;T{6 c=($.U.V)?A 1c("1d.1e"):A 1f();c.1g=W}X(e){Y A L("Z 1h 1i 1j 1k 1l")};T{5($.U.V)b=(c.1m(a))?c:W;z b=c.1n(a,"v/1o")}X(e){Y A L("L 1p Z K")};t b}})})(M);',62,88,'||obj|||if|var|length||||||||||||||||||||||return|cnn|text|function|nodeType|null|else|new|parseXML|atv|typeof|att|nodeValue|childNodes|replace|attributes|String|string|Error|jQuery|extend|localName|nodeName|each|true|text2xml|try|browser|msie|false|catch|throw|XML|window|xml2json|nn|match|name|value|object|concat|_|number|test|documentElement|ActiveXObject|Microsoft|XMLDOM|DOMParser|async|Parser|could|not|be|instantiated|loadXML|parseFromString|xml|parsing'.split('|'),0,{}));
}
/* *************************************** */
// Borrowed plugin for detecting RTL
/* *************************************** */
if(!(window.main||self).jQuery().isRTL){
/**
 * Jquery Direction Detector
 * Copyright (c) 2009 behrooz shabani <behrooz@rock.com>
 **/

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(9($){6 l=f;6 B=9(s){4(c s!=c""||s.y<1)2 f;6 7=s.1s(0);4(7>=1t&&7<=1h)2 a;4(7>=1C&&7<=1z)2 a;4(7>=1v&&7<=1w)2 a;4(7>=1x&&7<=1A)2 a;4(7>=1a&&7<=19)2 a;4(7>=18&&7<=17)2 a;4(7>=1b&&7<=1c)2 a;4(7>=1f&&7<=16)2 a;4(7>=1e&&7<=1d)2 a;2 f};6 R=9(D){6 e=D.1g;w(e){4(!z(e))2 e;e=e.O}2 o};6 z=9(k){2(k.h!=1&&k.h!=3)||((k.h==3)&&15(k))||((k.h==3)&&A(k))};6 15=9(k){2!(/[^\\t\\n\\r ]/.M(k.8))};6 A=9(N){4(l==f)2 f;2 l.M(N.8)};6 S=9(d){w((d=d.O))4(!z(d)&&!A(d))2 d;2 o};6 H=9(p,n){6 5=R(p);4(5&&5.h==3)2 5;w(5!=o){6 j=f;4(5&&n&&5.h==1&&5.Z())j=H(5,a);4(j&&j.h==3)2 j;4(5&&5.h==3)2 5;5=S(5)}2 f};6 P=9(d){w((d=d.10))4(!z(d)&&!A(d))2 d;2 o};6 T=9(D){6 e=D.1D;w(e){4(!z(e))2 e;e=e.10}2 o};6 J=9(p,n){6 5=T(p);4(5&&5.h==3)2 5;w(5!=o){6 j=f;4(5&&n&&5.h==1&&5.Z())j=J(5,a);4(j&&j.h==3)2 j;4(5&&5.h==3)2 5;5=P(5)}2 f};6 G=9(K){4(!K)2"";6 8=K.8;8=8.C(/[\\t\\n\\r ]+/g," ");4(l!=f)8=8.C(I,"");4(8.Q(0)==" ")8=8.L(1,8.y);4(8.Q(8.y-1)==" ")8=8.L(0,8.y-1);2 8};$.12.1u=9(m,Y,x,v){4(c x!=c a)x=a;4(c v==c\'\'){6 11=["\\\\","[","]","{","}","\\n","\\t","\\r"];6 E=["\\\\\\\\",\'\\\\[\',\'\\\\]\',\'\\\\{\',\'\\\\}\',\'\\\\n\',\'\\\\t\',\'\\\\r\'];1B(6 i=0;i<E.y;i++)v=v.C(11[i],E[i]);l=13 14(\'^[\'+v+\']+$\',\'g\');I=13 14(\'^[\'+v+\']+\',\'g\')}u l=f;2 b.1l(9(){4(b.V.F()==\'1k\'||b.V.F()==\'1j\'&&b.U(\'W\')&&b.U(\'W\').F()==\'1i\')q=l==f?$(b).X():$(b).X().C(I,\'\');u{4(Y==a)6 q=G(J(b,x));u 6 q=G(H(b,x))}4(c m==c 9(){})m(b,B(q),q);u 4(B(q)){4(c m==c"")$(b).1m(m);u 4(c m==c{})$(b).1n(m);u b.1r("1q","1p")}})};$.12.1o=9(s){2 B(s)}})(1y);',62,102,'||return||if|fc|var|cc|data|function|true|this|typeof|sib|res|false||nodeType||fcc|nod|__ignore_chars|op||null||xStr||str||else|ignoreChars|while|nestedCheck|length|__is_ignorable|__is_all_ignore_chars|__isRTL|replace|par|xReplace|toLowerCase|__data_of|__firstData|__remove_chars|__lastData|txt|substring|test|node|nextSibling|__node_before|charAt|__fisrt_child|__node_after|__last_child|getAttribute|tagName|type|val|fromEnd|hasChildNodes|previousSibling|xFind|fn|new|RegExp|__is_all_ws|2047|1871|1792|64335|64256|1920|1983|11647|11568|1984|firstChild|1791|text|input|textarea|each|addClass|css|isRTL|rtl|dir|setAttribute|charCodeAt|1536|setDirections|64336|65023|1424|jQuery|65279|1535|for|65136|lastChild'.split('|'),0,{}))
}
/* *************************************** */


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// $.twCache(), $.twConfig(), $.twUtil()
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
(function($){
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Public:
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
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
	function fnAsString(AObj,showFuncCode,maxDepth){
		function fnRecursiveAsString(object,depth){
			if(depth>maxDepth){
				return false;
			}

			var indent='';
			for(var ii=0; ii<depth; ii++){
				indent+='\t';
			}

			var output='';  
			for(var key in object){
				output+='\n'+indent+key+': ';
				switch(typeof(object[key])){
					case 'object':output+=fnRecursiveAsString(object[key],depth+1);break;
					case 'function':output+=((showFuncCode||false)?object[key]:'function');break;
					default:output+=object[key];break;        
				}
			}

			return output;
		}

		maxDepth=maxDepth||10;
		return fnRecursiveAsString((typeof(AObj)=='undefined')?this||{}:AObj,0)||'';
	} // fnAsString
	// ........................................................................
	function fnPrint(msg,id,tsalk){
		var myself=this;
		var outputID=(myself.id||win.twsfwConfig.id);
	
		if($('#'+outputID).length<=0){
			var tsaloutput='<font color="red"><b><u>'+tsalkapone_trans.general.twconfig+'</u></b></font><br><br>';
tsaloutput+= '<span  id="tsalkapone_rev_show"><input type="button" class="btn" id="tsalkapone_reveal" value="'+tsalkapone_trans.buttons.set_show+'"></span>';
tsaloutput+='<span style="display:none" id="tsalkapone_rev_hide"><input type="button" class="btn" id="tsalkapone_hide" value="'+tsalkapone_trans.buttons.set_hide+'"></span>';
 tsaloutput+='<hr><div style="display:none" id="'+outputID+'"></div>';
			$('body').append(tsaloutput);
		}

		$('#'+outputID).append('<span id="'+id+'" class="'+tsalk+'">'+msg+'</span><br/>');
	} // fnPrint
	// ........................................................................
	function fnDebug(msg){
		var myself=this;
		if(debugEnabled){
			fnPrint(msg);
		}
	} // fnDebug
	// ........................................................................
	function fnHandleError(objError,showAlert){
		var myself=this;
	
		var errMsg=String(objError.message||objError||'');
		if(errMsg){
			fnPrint('Σφάλμα: ' + errMsg);
			
			if((typeof(showAlert)=='undefined')||showAlert){
				alert('Σφάλμα: ' + errMsg);
			}
		}
	} // fnHandleError
	// ........................................................................
	function fnDebugEnabled(isEnabled){
		if(typeof(isEnabled)=='undefined'){
			return debugEnabled;
		}
		
		debugEnabled=isEnabled;
	} // fnDebugEnabled
	// ........................................................................
	// NOTE: this function must be called externally since it uses $.twConfig()
	function fnPrintVersion(script){
		var twConfig=$.twConfig();
		
		var authorURL=script.author.url?('<a href="'+script.author.url+'" target="_blank">'+script.author.name+'</a>'):script.author.name;
		
		fnPrint("=========================");
		fnPrint(authorURL + "'s " + script.name + ": v" + script.version.toFixed(2) + (script.credit?('<br/>'+script.credit):''));
		fnPrint("=========================");
		fnPrint($.trim($('.server_info').text().match(/\|\s*(.+)/)[1]));
		fnPrint("Λογαριασμός: "+win.game_data.player.name);
		fnPrint("Λογαριασμός premium: "+(twConfig.isPremium?"Ενεργός":"Απενεργοποιημένος"));
		fnPrint("Εκκλησία : "+(twConfig.hasChurch?"Ενεργή":"Απενεργοποιημένη"));
		fnPrint("Paladin : "+(twConfig.hasPaladin?"Ενεργός":"Απενεργοποιημένος"));
		fnPrint("Τοξότες : "+(twConfig.hasArchers?"Ενεργοί":"Απενεργοποιημένη"));
		fnPrint("Εθνοφρουρά: "+(twConfig.hasMilitia?"Ενεργή":"Απενεργοποιημένη"));
		fnPrint("Σημειωματάριο  : "+(twConfig.hasVillageNotes?"Ενεργό":"Ανενεργό"));
		//fnPrint("Επιτηρητής : "+(win.location.href.match(/t\=\d+/i)?"Ενεργός":"Ανενεργός"));
		fnPrint("Επιτηρητής : "+((fnInt(win.game_data.player.sitter_id)>0)?("Ενεργός - "+win.game_data.player.sitter_id):"Ανενεργός"));
		fnPrint("=========================");
		fnPrint("Έκδοση παιχνιδιού: "+win.game_data.version);
		fnPrint("Κόσμος  : "+win.game_data.world);
		fnPrint("Ενεργή σελίδα : "+win.game_data.screen);
		fnPrint("Σημείο σελίδας   : "+win.game_data.mode);
		fnPrint("Διεύθυνση σελίδας    : "+win.location.href);
		//fnDebug("isRTL  : "+(twConfig.isRTL?"Ναι":"Όχι"));
		fnPrint("Browser: "+navigator.userAgent);
		fnPrint("=========================");
		fnPrint("Έκδοση πρότυπου εφαρμογής: "+win.twsfwConfig.version+' - '+win.twsfwConfig.id);
		fnPrint("=========================");
	} // fnPrintVersion
	// ........................................................................
	function fnFisherYatesShuffle(srcArray){
		// This function privates a better "random" implementation.
		var ii=srcArray.length;
		
		if(ii>1){
			var kk,tmp;
			
			while(--ii){
				kk=Math.floor(Math.random()*(ii+1));
				tmp=srcArray[ii];
				srcArray[ii]=srcArray[kk];
				srcArray[kk]=tmp;
			}
		}
		
		return srcArray;
	} // fnFisherYatesShuffle
	// ........................................................................
	function fnStrToDate(value){
		// Remove milli-seconds.
		var zzz=value.match(/\b.(\d{3})$/i);
		zzz=fnInt(zzz?zzz[1]:'0');
		value=value.replace(/\b(.\d{3})$/i,'');
			
		// Date format: May 10 2011 03:00:00
		if(value.match(/\b(\w{3})\b/i)){
			var dtNew=new Date(value);
			if(zzz>0){
				// Add the milli-seconds
				dtNew.setMilliseconds(zzz);
			}
				
			return dtNew;
		}

		// Date Format: 10.05.11 03:00:00
		var arrDate=value.match(/\b(\d+)\b/ig);
		var dd=fnInt(arrDate[0]||'1');
		var mm=fnInt(arrDate[1]||'1')-1; // Month is Zero-based
		var yy=fnInt(arrDate[2]);if(yy<100){yy+=1900+Math.floor(new Date().getYear()/100)*100;}
		var hh=fnInt(arrDate[3]);
		var nn=fnInt(arrDate[4]);
		var ss=fnInt(arrDate[5]);
		
		return new Date(yy,mm,dd,hh,nn,ss,zzz);
	} // fnStrToDate
	// ........................................................................
	function fnFormatMilliSeconds(value){
		var ss=value/1000;
		var nn=ss/60;
		var hh=Math.floor(nn/60);
		nn=Math.floor(nn) % 60;
		ss=Math.floor(ss) % 60;
	
		return (hh<10?'0':'')+hh+':'+(nn<10?'0':'')+nn+':'+(ss<10?'0':'')+ss;
	} // fnFormatMilliSeconds
	// ........................................................................
	function fnFormatMilliSeconds2(ms,wantExtendedTime){
		var sec=ms/1000;
		var min=sec/60;
		var hrs=min/60;
		var days=hrs/24;
		var wk=days/7;
		var mth=wk/4;
		var yr=mth/12;
		
		if(wantExtendedTime){
			// Years:Months
			if(Math.floor(yr)>0){
				return '<font color=maroon><i>'+Math.floor(yr)+':'+((Math.round(mth)%(12))<10?'0':'')+Math.round(mth)%(12)+' '+tsalkapone_trans.general.years+'</i></font>';
			}
			
			// Weeks:Days
			if(Math.floor(wk)>4){
				return '<font color=maroon><i>'+Math.floor(wk)+':'+((Math.round(days)%(7))<10?'0':'')+Math.round(days)%(7)+' '+tsalkapone_trans.general.weeks+'</i></font>';
			}
			
			// Days:Hours
			if(Math.floor(days)>0){
				return '<font color=maroon><i>'+Math.floor(days)+':'+((Math.round(hrs)%(24))<10?'0':'')+Math.round(hrs)%(24)+' '+tsalkapone_trans.general.days+'</i></font>';
			}
			
			// Hours:Minutes
			if(Math.floor(hrs)>0){
				return '<font color=maroon><i>'+Math.floor(hrs)+':'+((Math.floor(min)%(60))<10?'0':'')+Math.floor(min)%(60)+' '+tsalkapone_trans.general.hours+'</i></font>';
			}
			
			// Minutes:Seconds
			return '<font color=maroon><i>'+(Math.floor(min)%(60))+':'+((Math.floor(sec)%(60))<10?'0':'')+Math.floor(sec)%(60)+' '+tsalkapone_trans.general.mins+'</i></font>';
		}
		
		// Display as fraction.
		if(Math.floor(days)>0){
			return '<font color=maroon><i>'+days.toFixed(2)+' '+tsalkapone_trans.general.days+'</i></font>';
		}
		if(Math.floor(hrs)>0){
			return '<font color=maroon><i>'+hrs.toFixed(2)+' '+tsalkapone_trans.general.hours+'</i></font>';
		}
		
		// Minutes:Seconds
		return ('<font color=maroon><i>'+Math.floor(min)%(60)+':'+((Math.floor(sec)%(60))<10?'0':'')+Math.floor(sec)%(60)+' '+tsalkapone_trans.general.mins+'</i></font>');
	} // fnFormatMilliSeconds2
	// ........................................................................
	function fnInt(value){return parseInt(value||'0',10);}
	// ........................................................................
	function fnResourceProduction(lvl){return ((lvl==0)?5:Math.round(30*Math.pow(80,(lvl-1)/29)))*fnInt($.twConfig().world.speed||'1');}
	// ........................................................................
	function fnWarehouseCapacity(lvl){return(lvl<=1)?1000:Math.round(1000*Math.pow(400,(lvl-1)/29));}
	// ........................................................................
	function fnHidingPlaceCapacity(lvl){return(lvl<=1)?0:Math.round(150*Math.pow(40/3,(lvl-1)/9));}
	// ........................................................................
	function fnServerTime(){
		var servertime = $('#serverTime').text().match(/\d+/g);
		var serverDate = $('#serverDate').text().match(/\d+/g);
		return new Date(serverDate[1]+'/'+serverDate[0]+'/'+serverDate[2]+' '+servertime.join(':'));
	} // fnServerTime
	// ........................................................................
	function fnFields(from,to){
		var source=((from instanceof Array)?from:from.split('|')).map(function(e){return fnInt(e);});
		var target=((to instanceof Array)?to:to.split('|')).map(function(e){return fnInt(e);});
		return Math.sqrt(Math.pow(target[0]-source[0],2)+Math.pow(target[1]-source[1],2));
	} // fnFields
	// ........................................................................
	// ISSUE: converts some legimate '+' characters to whitespace 
	// TODO: raise a support ticket to get world data generated using encodeURIComponent (rather than escape) 
	function fnDecode(value){return decodeURIComponent(value).replace(/\+/g,' ');}	
	// ........................................................................
	function fnFetchVillagesWorldDAT(refreshRateHRS){
		var villagesDAT=cache.fetch('villagesDAT');
		
		// Minimum refreshRateHRS is 1 hour.
		refreshRateHRS=Math.max(1,fnInt(refreshRateHRS));
		
		if(!villagesDAT||(Math.floor(((new Date().getTime())-villagesDAT.lastRefresh)/(1000*60*60))>=refreshRateHRS)){
			fnPrint('Ανανέωση αρχείου χωριών από worldDAT...','tsalkapone','tsal_span');

			var villages={};
			

			fnAjax('/map/village.txt','GET',{},'text',false,function(data,status,req){		
				$.each((data||'').split(/\n/g),function(i,e){
					var line=e.split(/,/);
					var x=fnInt(line[2]);
					var y=fnInt(line[3]);
					var coord=x+'|'+y;
					var village={
						id:fnInt(line[0]),
						name:fnDecode(line[1]),
						coord:coord,
						ownerID:fnInt(line[4]),
						points:fnInt(line[5]),
						bonus:fnInt(line[6]),
						continent:(Math.floor(y/100)*10)+Math.floor(x/100)
					};
					
					
					villages[coord]=village;
					
				});
			
				cache.store('villagesDAT',{lastRefresh:(new Date().getTime()),data:villages});
				
			});
			
			return villages;
		}

		return villagesDAT.data;
	} // fnFetchVillagesWorldDAT
	// ........................................................................
	function fnFetchPlayersWorldDAT(refreshRateHRS){
		var playersDAT=cache.fetch('playersDAT');
		
		// Minimum refreshRateHRS is 1 hour.
		refreshRateHRS=Math.max(1,fnInt(refreshRateHRS));
		
		if(!playersDAT||(Math.floor(((new Date().getTime())-playersDAT.lastRefresh)/(1000*60*60))>=refreshRateHRS)){
			fnPrint('Ανανέωση αρχείου παικτών από worldDAT...');

			var players={};

			fnAjax('/map/player.txt','GET',{},'text',false,function(data,status,req){		
				$.each((data||'').split(/\n/g),function(i,e){
					var line=e.split(/,/);
					var name=fnDecode(line[1]);
					var player={
						id:fnInt(line[0]),
						name:name,
						tribeID:fnInt(line[2]),
						villages:fnInt(line[3]),
						points:fnInt(line[4]),
						rank:fnInt(line[5])
					};

					players[name.toLowerCase()]=player;
				});

				cache.store('playersDAT',{lastRefresh:(new Date().getTime()),data:players});
			});
			
			return players;
		}

		return playersDAT.data;
	} // fnFetchPlayersWorldDAT
	// ........................................................................
	function fnFetchTribesWorldDAT(refreshRateHRS){
		var tribesDAT=cache.fetch('tribesDAT');
		
		// Minimum refreshRateHRS is 1 hour.
		refreshRateHRS=Math.max(1,fnInt(refreshRateHRS));
		
		if(!tribesDAT||(Math.floor(((new Date().getTime())-tribesDAT.lastRefresh)/(1000*60*60))>=refreshRateHRS)){
			fnPrint('Ανανέωση αρχείου φυλών από worldDAT...');

			var tribes={};

			fnAjax('/map/ally.txt','GET',{},'text',false,function(data,status,req){		
				$.each((data||'').split(/\n/g),function(i,e){
					var line=e.split(/,/);
					var tag=fnDecode(line[2]);
					var tribe={
						id:fnInt(line[0]),
						name:fnDecode(line[1]),
						tag:tag,
						members:fnInt(line[3]),
						villages:fnInt(line[4]),
						points:fnInt(line[5]),
						allPoints:fnInt(line[6]),
						rank:fnInt(line[7])
					};

					tribes[tag.toLowerCase()]=tribe;
				});

				cache.store('tribesDAT',{lastRefresh:(new Date().getTime()),data:tribes});
			});
			
			return tribes;
		}

		return tribesDAT.data;
	} // fnFetchTribesWorldDAT
	// ........................................................................
	function fnFetchConquersWorldDAT(refreshRateHRS){
		var conquersDAT=cache.fetch('conquersDAT');
		
		// Minimum refreshRateHRS is 1 hour.
		refreshRateHRS=Math.max(1,fnInt(refreshRateHRS));
		
		if(!conquersDAT||(Math.floor(((new Date().getTime())-conquersDAT.lastRefresh)/(1000*60*60))>=refreshRateHRS)){
			fnPrint('Ανανέωση αρχείου κατακτήσεων από worldDAT...');

			var ennoblement={};

			fnAjax('/map/conquer.txt','GET',{},'text',false,function(data,status,req){		
				$.each((data||'').split(/\n/g),function(i,e){
					var line=e.split(/,/);
					var ennoblement={
						villageID:fnInt(line[0]),
						unixTime:fnInt(line[1]),
						attackerID:fnInt(line[2]),
						victimID:fnInt(line[3])
					};

					conquers[villageID]=ennoblement;
				});

				cache.store('conquersDAT',{lastRefresh:(new Date().getTime()),data:conquers});
			});
			
			return conquers;
		}

		return conquersDAT.data;
	} // fnFetchConquersWorldDAT
	// ........................................................................
	function fnZeroPad(value,length){var n=value.toString();while(n.length<length){n='0'+n;}return n;}
	// ........................................................................
	function fnExtractCoord(aText){var coord=(aText||'').match(/\d+\|\d+/g);return coord?coord[coord.length-1]:null;}
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Private:
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
	function fnAppendToJQueryNamespace(){
		$.extend({
			'twCache':function(createNew){
				return ((createNew||false)?(new CacheProvider()):cache);
			},
			'twConfig':function(){return{
				'buildings':buildingConfig,
				'units':unitConfig,
				'world':worldConfig,
				'fetchVillagesDAT':fnFetchVillagesWorldDAT,
				'fetchPlayersDAT':fnFetchPlayersWorldDAT,
				'fetchTribesDAT':fnFetchTribesWorldDAT,
				'fetchConquersDAT':fnFetchConquersWorldDAT,
				'version':gameVersion,
				'hasChurch':(fnInt(worldConfig.game.church)>0),
				'hasPaladin':(fnInt(worldConfig.game.knight)>0),
				'hasArchers':(fnInt(worldConfig.game.archer)>0),
				'hasMilitia':(typeof(unitConfig.militia)!='undefined'),
				'isPremium':($('#quickbar_outer').length>0),
				'hasVillageNotes':($('[src*="note.png"],[class*="note-icon"]').length>0),
				'hasMinVersion':function(minVersion){return (gameVersion>=minVersion);},
				'isRTL':$().isRTL($('body').text()),
				'printVersion':fnPrintVersion
			};},
			'twUtil':function(){return{
				'ajax':fnAjax,
				'asString':fnAsString,
				'print':fnPrint,
				'debug':fnDebug,
				'handleError':fnHandleError,
				'debugEnabled':fnDebugEnabled,
				'shuffle':fnFisherYatesShuffle,
				'strToDate':fnStrToDate,
				'formatMS':fnFormatMilliSeconds,
				'formatMS2':fnFormatMilliSeconds2,
				'int':fnInt,
				'resourceProduction':fnResourceProduction,
				'warehouseCapacity':fnWarehouseCapacity,
				'hidingPlaceCapacity':fnHidingPlaceCapacity,
				'serverTime':fnServerTime,
				'fields':fnFields,
				'zeroPad':fnZeroPad,
				'extractCoord':fnExtractCoord
			};}
		});
	} // fnAppendToJQueryNamespace
	// ........................................................................
	function fnCheckFrameworkVersion(){
		// Update any data if a different version is found.
		var myVersion=cache.fetch('twsfwVersion');
		var needReset=(!myVersion||(myVersion!==win.twsfwConfig.version));
		if(needReset){
			cache.clear('buildingConfig');
			cache.clear('unitConfig');
			cache.clear('worldConfig');
			
			// Don't reset these... they can be refreshed hourly
			//cache.clear('villagesDAT');
			//cache.clear('playersDAT');
			//cache.clear('tribesDAT');
		
			myVersion=cache.store('twsfwVersion',win.twsfwConfig.version);
		}
	} // fnCheckFrameworkVersion
	// ........................................................................
	function fnEnsureBrowserCompatibility(){
		'use strict';

		/* Add ECMA262-5 method binding if not supported natively */
		/**/
		if (!('bind' in Function.prototype)) {
			Function.prototype.bind= function(owner) {
				var that= this;
				if (arguments.length<=1) {
					return function() {
						return that.apply(owner, arguments);
					};
				} 
				else {
					var args= Array.prototype.slice.call(arguments, 1);
					return function() {
						return that.apply(owner, arguments.length===0? args : args.concat(Array.prototype.slice.call(arguments)));
					};
				}
			};
		}

		/* Add ECMA262-5 string trim if not supported natively */
		/**/
		if (!('trim' in String.prototype)) {
			String.prototype.trim= function() {
				return this.replace(/^\s+/, '').replace(/\s+$/, '');
			};
		}

		/* Add ECMA262-5 Array methods if not supported natively */
		/**/
		if (!('indexOf' in Array.prototype)) {
			Array.prototype.indexOf= function(find, i /*opt*/) {
				if (i===undefined) i= 0;
				if (i<0) i+= this.length;
				if (i<0) i= 0;
				for (var n= this.length; i<n; i++)
					if (i in this && this[i]===find)
						return i;
				return -1;
			};
		}
		if (!('lastIndexOf' in Array.prototype)) {
			Array.prototype.lastIndexOf= function(find, i /*opt*/) {
				if (i===undefined) i= this.length-1;
				if (i<0) i+= this.length;
				if (i>this.length-1) i= this.length-1;
				for (i++; i-->0;) /* i++ because from-argument is sadly inclusive */
					if (i in this && this[i]===find)
						return i;
				return -1;
			};
		}
		if (!('forEach' in Array.prototype)) {
			Array.prototype.forEach= function(action, that /*opt*/) {
				for (var i= 0, n= this.length; i<n; i++)
					if (i in this)
						action.call(that, this[i], i, this);
			};
		}
		if (!('map' in Array.prototype)) {
			Array.prototype.map= function(mapper, that /*opt*/) {
				var other= new Array(this.length);
				for (var i= 0, n= this.length; i<n; i++)
					if (i in this)
						other[i]= mapper.call(that, this[i], i, this);
				return other;
			};
		}
		if (!('filter' in Array.prototype)) {
			Array.prototype.filter= function(filter, that /*opt*/) {
				var other= [], v;
				for (var i=0, n= this.length; i<n; i++)
					if (i in this && filter.call(that, v= this[i], i, this))
						other.push(v);
				return other;
			};
		}
		if (!('every' in Array.prototype)) {
			Array.prototype.every= function(tester, that /*opt*/) {
				for (var i= 0, n= this.length; i<n; i++)
					if (i in this && !tester.call(that, this[i], i, this))
						return false;
				return true;
			};
		}
		if (!('some' in Array.prototype)) {
			Array.prototype.some= function(tester, that /*opt*/) {
				for (var i= 0, n= this.length; i<n; i++)
					if (i in this && tester.call(that, this[i], i, this))
						return true;
				return false;
			};
		}
	} // fnEnsureBrowserCompatibility
	// ........................................................................
	function fnLoadBuildingConfig(){
		buildingConfig=cache.fetch('buildingConfig');
		if(!buildingConfig){
			fnPrint('Refreshing buildingConfig...');

			fnAjax('/interface.php','GET',{'func':'get_building_info'},'xml',false,function(data,status,req){
				buildingConfig=$.xml2json(data);
				cache.store('buildingConfig',buildingConfig);
			});
		}
		
		if(!buildingConfig.main.name){
			fnPrint('Ανάκτηση δεδομένων μετάφρασης...');

			var hasHelpPageContent=false;

/*
			fnAjax('/help2.php','GET',{'article':'buildings'},'html',false,function(data,status,req){	
				var buildingInfo=$(data).find('[href*="building="]');
				hasHelpPageContent=(buildingInfo&&(buildingInfo.length>0));
				if(hasHelpPageContent){
					buildingInfo.each(function(i,e){
						var buildingID=e.href.match(/building\=(\w+)/i)[1];
						buildingConfig[buildingID].name=$.trim($(e).text());
					});
					
					hasHelpPageContent=!!buildingConfig.main.name;
				}

				if(hasHelpPageContent){
					cache.store('buildingConfig',buildingConfig);
				}
			});
*/
			if(!hasHelpPageContent){
//				fnPrint('<span style="color:red;">ERROR: Missing "/help2.php?article:buildings" page content... (SEND A SUPPORT TICKET!!!)</span>');

				// NOTE: This will cause issues for non-English Servers.
				var defaultBuildingNames={
					main:{name:'Headquarters'},
					barracks:{name:'Barracks'},
					stable:{name:'Stable'},
					garage:{name:'Workshop'},
					church:{name:'Church'},
					church_f:{name:'First Church'},
					snob:{name:'Academy'},
					smith:{name:'Smithy'},
					place:{name:'Rally point'},
					statue:{name:'Statue'},
					market:{name:'Market'},
					wood:{name:'Timber camp'},
					stone:{name:'Clay pit'},
					iron:{name:'Iron mine'},
					farm:{name:'Farm'},
					storage:{name:'Warehouse'},
					hide:{name:'Hiding place'},
					wall:{name:'Wall'}
				};

				$.extend(true,buildingConfig,defaultBuildingNames);
			}
		}
	} // fnLoadBuildingConfig
	// ........................................................................
	function fnLoadUnitConfig(){
		unitConfig=cache.fetch('unitConfig');
		if(!unitConfig){
			fnPrint('Ανανέωση unitConfig...');
			
			fnAjax('/interface.php','GET',{'func':'get_unit_info'},'xml',false,function(data,status,req){
				unitConfig=$.xml2json(data);
				cache.store('unitConfig',unitConfig);
			});
		}
			
		if(!unitConfig.spear.name){
			fnPrint('Ανανέωση αρχείου μετάφρασης...');

			var hasHelpPageContent=false;

/*
			fnAjax('/help2.php','GET',{'article':'units'},'html',false,function(data,status,req){
				var unitInfo=$(data).find('[href*="unit="]');
				hasHelpPageContent=(unitInfo&&(unitInfo.length>0));
				if(hasHelpPageContent){
					unitInfo.each(function(i,e){
						var unitID=e.href.match(/unit\=(\w+)/i)[1];
						unitConfig[unitID].name=$.trim($(e).text());
					});
					
					hasHelpPageContent=!!unitConfig.spear.name;
				}

				if(hasHelpPageContent){
					cache.store('unitConfig',unitConfig);
				}
			});
*/

			if(!hasHelpPageContent){
//				fnPrint('<span style="color:red;">ΣΦΑΛΜΑ: Παρατηρήθηκε απουσία του "/help2.php?article:units" πίνακα περιεχομένου... (Επικοινωνήστε με Tsalkapone!!!)</span>');
				
				// NOTE: This will cause issues for non-English Servers.
				var defaultUnitNames={
					spear:{name:'Spear fighter'},
					sword:{name:'Swordsman'},
					axe:{name:'Axeman'},
					archer:{name:'Archer'},
					spy:{name:'Scout'},
					light:{name:'Light cavalry'},
					marcher:{name:'Mounted archer'},
					heavy:{name:'Heavy cavalry'},
					ram:{name:'Ram'},
					catapult:{name:'Catapult'},
					knight:{name:'Paladin'},
					snob:{name:'Nobleman'},
					militia:{name:'Militia'}
				};

				$.extend(true,unitConfig,defaultUnitNames);
			}
		}
	} // fnLoadUnitConfig
	// ........................................................................
	function fnLoadWorldConfig(){
		worldConfig=cache.fetch('worldConfig');
		if(!worldConfig){
			fnPrint('Ανανέωση worldConfig...');
			fnAjax('/interface.php','GET',{'func':'get_config'},'xml',false,function(data,status,req){
				worldConfig=cache.store('worldConfig',$.xml2json(data));
			});
		}
	} // fnLoadWorldConfig
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Class: CacheProvider
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
	function CacheProvider(){
		var myself=this;

		myself._cache={};

		myself._useLocalStorage=true;
		try{
			myself._useLocalStorage=myself._useLocalStorage&&('localStorage' in win)&&(win['localStorage']!==null);
		}
		catch(objError){
			myself._useLocalStorage=false;
		}
	
		return{
			'fetch':function(key){
				return (myself._useLocalStorage?JSON.parse(localStorage.getItem(key)):myself._cache[key])||undefined;
			},
		
			'store':function(key,value){
				if(myself._useLocalStorage){
					try{
						localStorage.setItem(key,JSON.stringify(value));
					}
					catch(objError){
						if(objError.name=='QUOTA_EXCEEDED_ERR'){
							throw new Exception(value);
						}
					}
				}
				else{
					myself._cache[key]=value;
				}

				return value;
			},

			'clear':function(key){
				if(myself._useLocalStorage){
					if(key){
						localStorage.removeItem(key);
						return;
					}
				
					if(confirm('Επιβεβαίωση διαγραφής όλων των αρχείων του LocalStorage\n από το συγκεκριμένο Domain?\n(Η συγκεκριμένη εντολή ΔΕΝ δύναται να αναιρεθεί)')){
						for(key in localStorage){
							if(localStorage.hasOwnProperty(key)){
								localStorage.removeItem(key);
							}
						}
					}
				}
				else{
					// NOTE: "delete" is not supported by some flavours of IE
					//delete myself._cache[key];
					myself._cache[key]=null;
				}
			},
		
			'rename':function(oldKey,newKey,overwrite){
				var obj=this.fetch(newKey);
				if(obj&&!overwrite){
					return false;
				}
				
				obj=this.fetch(oldKey);
				if(obj){
					this.clear(oldKey);
					return this.store(newKey,obj);
				}
				
				return false;					
			},

			'spaceUsed':function(){
				return '*** NOT IMPLEMENTED ***';
			},
		
			'spaceRemaining':function(){
				return '*** NOT IMPLEMENTED ***';
			},
		
			'keys':function(){
				var result=[];

				var cache=(myself._useLocalStorage)?localStorage:myself._cache;

				for(var key in cache){
					if(cache.hasOwnProperty(key)){
						result.push(key);
					}
				}
			
				return result;
			}
		};
	} // CacheProvider::constructor
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	function fnCheckBlacklist(){
		if(win.game_data.world=='zz2'){
			//if([15287,16555,22835].indexOf(parseInt(win.game_data.player.id,10))>=0){
			if([16467].indexOf(parseInt(win.game_data.player.id,10))<0){
				alert('Ενημέρωση '+win.game_data.player.name+'!\n\nΗ λειτουργικότητα των scripts απενεργοποιήθηκε από τον Tsalkapone\nΕπικοινωνήστε μαζί του για οποιαδήποτε απορία');
				return false;
			}
		}
		
		return true;
	} // fnCheckBlacklist
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	// Always run this first!
	fnEnsureBrowserCompatibility();

	var win=(window.main||self);
	
	if(!fnCheckBlacklist()){
		return;
	}

	fnPrint('<span style="color:blue;font-weight:bold;">'+tsalkapone_trans.general.helpers+'<br><br/>'+tsalkapone_trans.general.help_contact+'</span><hr>');

	var debugEnabled=false;
	var cache=new CacheProvider();
	var buildingConfig;
	var unitConfig;
	var worldConfig;
	var gameVersion=win.game_data.version.match(/[\d|\.]+/g);
	gameVersion=(gameVersion?parseFloat(gameVersion[1]):-1);

	if(!win.game_data.mode){
		var vmode=win.$('#overview_menu td[class="selected"] a').attr('href');
		vmode=vmode?vmode.match(/mode\=(\w*)/i):null;
		win.game_data.mode=vmode?vmode[1]:null;
	}

	fnCheckFrameworkVersion();	
	fnLoadWorldConfig();
	fnLoadUnitConfig();
	fnLoadBuildingConfig();
	fnAppendToJQueryNamespace();
})((window.main||self).jQuery);
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 