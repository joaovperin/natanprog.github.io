var debugEnabled=true;
var branch=''; // for compatibility
// ########################################################################
// IMPORTANT: Version Information !!!
// ########################################################################
(window.main||self).twsfwConfig={
	id:'twsfwStandalone',
	version:'v0.08'
};
// ########################################################################

/* 
	Author	: Dale McKay
	Email	: dalesmckay@gmail.com
	Purpose	: To help simplify Tribal Wars scripting by providing a common framework.
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
	function fnPrint(msg,id){
		var myself=this;
		var outputID=(myself.id||win.twsfwConfig.id);
	
		if($('#'+outputID).length<=0){
			$('body').append('<div id="'+outputID+'"></div>');
		}
	
		$('#'+outputID).append('<span id="'+(id||'')+'">'+msg+'</span><br/>');
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
			fnPrint('Error: ' + errMsg);
			
			if((typeof(showAlert)=='undefined')||showAlert){
				alert('Error: ' + errMsg);
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
		fnPrint("Account: "+win.game_data.player.name);
		fnPrint("Premium: "+(twConfig.isPremium?"yes":"no"));
		fnPrint("Church : "+(twConfig.hasChurch?"yes":"no"));
		fnPrint("Statue : "+(twConfig.hasPaladin?"yes":"no"));
		fnPrint("Archer : "+(twConfig.hasArchers?"yes":"no"));
		fnPrint("Militia: "+(twConfig.hasMilitia?"yes":"no"));
		fnPrint("Notes  : "+(twConfig.hasVillageNotes?"yes":"no"));
		//fnPrint("Sitter : "+(win.location.href.match(/t\=\d+/i)?"yes":"no"));
		fnPrint("Sitter : "+((fnInt(win.game_data.player.sitter_id)>0)?("yes - "+win.game_data.player.sitter_id):"no"));
		fnPrint("=========================");
		fnPrint("Version: "+win.game_data.version);
		fnPrint("World  : "+win.game_data.world);
		fnPrint("Screen : "+win.game_data.screen);
		fnPrint("Mode   : "+win.game_data.mode);
		fnPrint("URL    : "+win.location.href);
		//fnDebug("isRTL  : "+(twConfig.isRTL?"yes":"no"));
		fnPrint("Browser: "+navigator.userAgent);
		fnPrint("=========================");
		fnPrint("Framework Version: "+win.twsfwConfig.version+' - '+win.twsfwConfig.id);
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
				return Math.floor(yr)+':'+((Math.round(mth)%(12))<10?'0':'')+Math.round(mth)%(12)+' Yr';
			}
			
			// Weeks:Days
			if(Math.floor(wk)>4){
				return Math.floor(wk)+':'+((Math.round(days)%(7))<10?'0':'')+Math.round(days)%(7)+' Wk';
			}
			
			// Days:Hours
			if(Math.floor(days)>0){
				return Math.floor(days)+':'+((Math.round(hrs)%(24))<10?'0':'')+Math.round(hrs)%(24)+' D';
			}
			
			// Hours:Minutes
			if(Math.floor(hrs)>0){
				return Math.floor(hrs)+':'+((Math.floor(min)%(60))<10?'0':'')+Math.floor(min)%(60)+' hrs';
			}
			
			// Minutes:Seconds
			return (Math.floor(min)%(60))+':'+((Math.floor(sec)%(60))<10?'0':'')+Math.floor(sec)%(60)+' min';
		}
		
		// Display as fraction.
		/*if(Math.floor(days)>0){
			return days.toFixed(2)+' D';
		}
		if(Math.floor(hrs)>0){
			return hrs.toFixed(2)+' hrs';
		}*/
		
		// Minutes:Seconds
		return (Math.floor(min)%(60))+':'+((Math.floor(sec)%(60))<10?'0':'')+Math.floor(sec)%(60)+' min';
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
			fnPrint('Refreshing villages from worldDAT...');

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
			fnPrint('Refreshing players from worldDAT...');

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
			fnPrint('Refreshing tribes from worldDAT...');

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
			fnPrint('Refreshing conquers from worldDAT...');

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
			fnPrint('Refreshing Building Translation Strings...');

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
					main:{name:'Village Headquarters'},
					barracks:{name:'Barracks'},
					stable:{name:'Stable'},
					garage:{name:'Workshop'},
					church:{name:'Church'},
					church_f:{name:'First church'},
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
			fnPrint('Refreshing unitConfig...');
			
			fnAjax('/interface.php','GET',{'func':'get_unit_info'},'xml',false,function(data,status,req){
				unitConfig=$.xml2json(data);
				cache.store('unitConfig',unitConfig);
			});
		}
			
		if(!unitConfig.spear.name){
			fnPrint('Refreshing Unit Translation Strings...');

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
//				fnPrint('<span style="color:red;">ERROR: Missing "/help2.php?article:units" page content... (SEND A SUPPORT TICKET!!!)</span>');
				
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
			fnPrint('Refreshing worldConfig...');
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
				
					if(confirm('Are you sure you really want to delete ALL LocalStorage\nitems from this Domain?\n(This action can NOT be undone)')){
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
				alert('Hi '+win.game_data.player.name+'!\n\nYour scripts have been disabled by dalesmckay\nSend him a mail if you wish to help with testing');
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

	fnPrint('<span style="color:red;font-weight:bold;">Provide the following info when asking for help:</span><br/>(also send a support ticket to Jon Dawson aka Morthy)<hr>');

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
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
/* 
	Author	: Dale McKay
	Email	: dalesmckay@gmail.com
	Purpose	: To help locate the best villages for farming.
	Credit	: 
	Todo	:
		* Add spinner when downloading DAT files.
		* Checkbox to ignore your own villages.
		* Checkbox to ignore your own Tribe.
		* Generate a farming script.
		* Make the DIV draggable.
		* Filter by bounding area (coord TL/BR).
		* Allow multiple coords for the radius.
		* Add a clear/reset button.
		* Add a spinner when Finding Farms.
		* Add checkbox to enable/disable each filter option.
	Notes	:
	

	######################
	Client Launcher (live):
	######################
	
javascript:
	var debugEnabled=true;
	var branch='http://dl.dropbox.com/u/25377948/twscripts/';
	(window.main||self).$.getScript(branch+'jquery.tw.farmfinder.js',function(){$.twFarmFinder(branch,debugEnabled);});
	void(0);

____________________________________________________________

Copyright (C) 2011 Dale McKay, all rights reserved
version 1.0, 14 July 2011

This software is provided 'as-is', without any express or implied warranty. In no event will the author be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:
The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
This notice may not be removed or altered from any source distribution.
____________________________________________________________
*/

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// $.twFarmFinder(branch,debugEnabled)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
(function($){
	var win=(window.main||self);

	var script={
		id:'{AD48DC2A-89F2-4B3D-A9E3-E9352A763DA0}',
		name:'Générateur : liste de villages',
		version:1.07,
		minGameVersion:7.00,
		author:{
			name:'dalesmckay & traduction fr par Artemisia',
			email:'dalesmckay@gmail.com',
			url:'http://forum.guerretribale.fr'
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
			
			var alertMsg='';
			if(!(villagesDAT&&$.trim(JSON.stringify(villagesDAT)))){
				alertMsg+='Vous devez mettre à jours les données des villages';
			}
			if(!(playersDAT&&$.trim(JSON.stringify(playersDAT)))){
				alertMsg+='Vous devez mettre à jours les données des villages';
			}
			if(!(tribesDAT&&$.trim(JSON.stringify(tribesDAT)))){
				alertMsg+='ous devez mettre à jours les données des tribus';
			}
			if(alertMsg){
				alert(alertMsg);

				return;
			}
			
			
			var curConfig=fnCurrentConfig();
			
			//NOTE: these fields are not part of the std config (we don't want to save it)
			var srcCoord=twUtil.extractCoord((curConfig.radius>0)?$.trim($('#dsmRadiusCentre').val()):'')||win.game_data.village.coord;
			var	mapRegion={
				topLeft:twUtil.extractCoord($.trim($('#dsmMRTopLeft').val()))||'000|000',
				bottomRight:twUtil.extractCoord($.trim($('#dsmMRBottomRight').val()))||'999|999',
			};
			
			var hasPlayerFilter=!!$.trim($('#dsmPlayers').val());
			var hasTribeFilter=!!$.trim($('#dsmTribes').val());
					
			// Build PlayerID List.
			// TODO...
			var playerIDs=fnBuildPlayerIDList(curConfig.players);
			
			//Build TribeID List.
			// TODO...
			var tribeIDs=fnBuildTribeIDList(curConfig.tribes);
			
			// Reset the co-ordinates.
			resultCoords=[];
			
			$.each(villagesDAT,function(i,e){
				var player=null;
				var tribe=null;
				// Ignore your own villages.
				if(e.ownerID==win.game_data.player.id){
					// TODO: allow your own villages.
					return true;
				}

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

				// Barb Filter.
				if(curConfig.barbsOnly){
					if(!e.ownerID){
						resultCoords.push(e.coord);
						detail[e.coord]={village:e,player:null,tribe:null};
						return true;
					}
				}
				else{
					player=fnFindPlayer(e.ownerID);
					tribe=player?fnFindTribe(player.tribeID):null;
					
					// Player Filter.
					if(hasPlayerFilter&&playerIDs&&(playerIDs.indexOf(e.ownerID)>=0)){
						resultCoords.push(e.coord);
						detail[e.coord]={village:e,player:player,tribe:tribe};
						return true;
					}
					
					// Tribe Filter.
					if(hasTribeFilter&&tribeIDs){
						if(player&&player.tribeID&&(tribeIDs.indexOf(player.tribeID)>=0)){					
							resultCoords.push(e.coord);
							detail[e.coord]={village:e,player:player,tribe:tribe};
							return true;
						}
					}
					
					if(!hasPlayerFilter&&!hasTribeFilter){
						resultCoords.push(e.coord);
						detail[e.coord]={village:e,player:player,tribe:tribe};
						return true;
					}
				}				
			});
			
			// Sort the co-ordinates.
			resultCoords=resultCoords.sort(function(a,b){return twUtil.fields(srcCoord,a)-twUtil.fields(srcCoord,b);});

			fnDisplayOutput();
			$('#dsmCoordCount').text('('+resultCoords.length+')');
		} // fnFindFarms
		// ........................................................................
		function fnCurrentConfig(){
			return{
				barbsOnly:$('#dsmBarbOnly').is(':checked'),
				continents:$.map(($('#dsmContinents').val()||'').match(/\d+/g)||[],function(e){return twUtil.int(e);}),
				minPoints:twUtil.int($('#dsmMinPoints').val()||'-1',10),
				maxPoints:twUtil.int($('#dsmMaxPoints').val()||'-1',10),
				radius:$.trim($('#dsmRadius').val())||'-1',
				players:($.trim($('#dsmPlayers').val())||'').split(','),
				tribes:($.trim($('#dsmTribes').val())||'').split(','),
				bbEncoded:$('#dsmBBEncoded').is(':checked'),
				format:$.trim($('#dsmFormat').val())||'{coord}'
			};
		} // fnCurrentConfig
		// ........................................................................
		function fnLoadConfig(){
			var curConfig=twCache.fetch(script.id+'.config')||{
				barbsOnly:false,
				continents:undefined,
				minPoints:-1,
				maxPoints:-1,
				radius:25,
				players:undefined,
				tribes:undefined,
				bbEncoded:false,
				format:'{coord}'
			};
			
			if(curConfig.players=='*** Coming Soon ***'){
				curConfig.players=undefined;
			}
			
			if(curConfig.tribes=='*** Coming Soon ***'){
				curConfig.tribes=undefined;
			}
			
			$('#dsmBarbOnly').attr('checked',curConfig.barbsOnly);
			$('#dsmContinents').val((curConfig.continents||[]).join(','));
			$('#dsmMRTopLeft').val('000|000');
			$('#dsmMRBottomRight').val('999|999');
			$('#dsmMinPoints').val((curConfig.minPoints>=0)?curConfig.minPoints:'');
			$('#dsmMaxPoints').val((curConfig.maxPoints>=0)?curConfig.maxPoints:'');
			$('#dsmBBEncoded').attr('checked',curConfig.bbEncoded);
			$('#dsmRadius').val((parseFloat(curConfig.radius||'0.0')>0.0)?curConfig.radius:'');
			$('#dsmRadiusCentre').val(win.game_data.village.coord);
			$('#dsmPlayers').val((curConfig.players||[]).join(','));
			$('#dsmTribes').val((curConfig.tribes||[]).join(','));
			$('#dsmFormat').val(curConfig.format||'{coord}');
		} // fnLoadConfig
		// ........................................................................
		function fnSaveConfig(){
			twCache.store(script.id+'.config',fnCurrentConfig());
		} // fnSaveConfig
		// ........................................................................
		function fnDisplayOutput(){
            var isBBEncoded=$('#dsmBBEncoded').is(':checked');
            var isLineEncoded = $('#dsmLineEncoded').is(':checked');
            var isListEncoded = $('#dsmListEncoded').is(':checked');
			
            var format=$.trim($('#dsmFormat').val());
            var counter_for_list_encoded = 1;
			if(format){
				var output='';
			
				$.each(resultCoords,function(i,e){
					var village=detail[e].village;
					var player=detail[e].player;
					var tribe=detail[e].tribe;
					
					if(player&&!player.id){
						player=null;
					}
					
					if(tribe&&!tribe.id){
						tribe=null;
					}
                                       
					twUtil.debug(JSON.stringify(player)+'<br/>'+JSON.stringify(tribe)+'<br/><br/>');
                    if (isBBEncoded && !isLineEncoded && !isListEncoded){
                        output += format
                            .replace(/\{coord\}/ig,'[coord]'+e+'[/coord]');
                        output = fnOutputFormattedOutput(output, (village && village.points)?village.points:'', (village && village.name)?village.name:'', (player && player.name)?player.name:'', (tribe && tribe.name)?tribe.name:'', (tribe && tribe.tag)?tribe.tag:'', (village && village.continent)?village.continent:'', (village && village.id)? village.id:'');
                        output += '\n';
                    } else if(isLineEncoded && !isListEncoded){
                        if(isBBEncoded){
                            output += format
                                .replace(/\{coord\}/ig,'[coord]'+e+'[/coord] ');
                        }else{
                            output += format
                                .replace(/\{coord\}/ig,e+' ');
                        }
                        output = fnOutputFormattedOutput(output, (village && village.points)?village.points:'', (village && village.name)?village.name:'', (player && player.name)?player.name:'', (tribe && tribe.name)?tribe.name:'', (tribe && tribe.tag)?tribe.tag:'', (village && village.continent)?village.continent:'', (village && village.id)? village.id:'');
                    } else if(isListEncoded && !isLineEncoded){
                        output += ''+counter_for_list_encoded+'. ';
                        if (isBBEncoded) output += '[coord]';
                        output += format.replace(/\{coord\}/ig,e);
                        output = fnOutputFormattedOutput(output, (village && village.points)?village.points:'', (village && village.name)?village.name:'', (player && player.name)?player.name:'', (tribe && tribe.name)?tribe.name:'', (tribe && tribe.tag)?tribe.tag:'', (village && village.continent)?village.continent:'', (village && village.id)? village.id:'');
                        if (isBBEncoded) output += '[/coord]';
                        output += '\n';
                        counter_for_list_encoded++;
                    }
                });
			
				$('#dsmOutput').val(output);
			}
			else{
                //$('#dsmOutput').val((isBBEncoded?'[coord]':'')+resultCoords.join(isBBEncoded?'[/coord]\n[coord]':' ')+(isBBEncoded?'[/coord]\n':''));
                output = 'Merci de remplir un format';
            }	
            

        } // fnDisplayOutput
        
        function fnOutputFormattedOutput(output, v_points = '', v_name = '', p_name = '', t_name = '', t_tag = '', v_continent = '', v_id = ''){
            var isBBEncoded=$('#dsmBBEncoded').is(':checked');
            output=output
                .replace(/\{points\}/ig,v_points)
                .replace(/\{name\}/ig,v_name)
                .replace(/\{player\}/ig,p_name?(isBBEncoded?'[player]'+p_name+'[/player]':p_name):'')
                .replace(/\{tribe\_name\}/ig,t_name?t_name:'')
                .replace(/\{tribe\}/ig,t_tag?(isBBEncoded?'[ally]'+t_tag+'[/ally]':t_tag):'')
                .replace(/\{continent\}/ig,v_continent)
                .replace(/\{id\}/ig,v_id)
            return output
        }

		// ........................................................................
		function fnCheckVillagesDAT(){
			var ageMS=undefined;
			
			var cacheVal=twCache.fetch('villagesDAT');
			if(cacheVal&&$.trim(JSON.stringify(cacheVal))){
				villagesDAT=cacheVal.data;
				ageMS=(new Date()).getTime()-cacheVal.lastRefresh;
			}
			
			if(ageMS!=undefined){
				$('#dsmVillagesDATAge').text(twUtil.formatMS2(ageMS,true));
				if(Math.floor(ageMS/(1000*60*60))>=1){
					$('#dsmRefreshVillagesDAT').show();
				}
				else{
					$('#dsmRefreshVillagesDAT').hide();
				}
			}
			else{
				$('#dsmVillagesDATAge').text('*** AUCUNE DONNEE ***');
				$('#dsmRefreshVillagesDAT').show();
			}
		} // fnCheckVillagesDAT
		// ........................................................................
		function fnCheckPlayersDAT(){
			var ageMS=undefined;
			
			var cacheVal=twCache.fetch('playersDAT');
			if(cacheVal&&$.trim(JSON.stringify(cacheVal))){
				playersDAT=cacheVal.data;
				ageMS=(new Date()).getTime()-cacheVal.lastRefresh;
			}
			
			if(ageMS!=undefined){
				$('#dsmPlayersDATAge').text(twUtil.formatMS2(ageMS,true));
				if(Math.floor(ageMS/(1000*60*60))>=1){
					$('#dsmRefreshPlayersDAT').show();
				}
				else{
					$('#dsmRefreshPlayersDAT').hide();
				}
			}
			else{
				$('#dsmPlayersDATAge').text('*** AUCUNE DONNEE ***');
				$('#dsmRefreshPlayersDAT').show();
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
				$('#dsmTribesDATAge').text(twUtil.formatMS2(ageMS,true));
				if(Math.floor(ageMS/(1000*60*60))>=1){
					$('#dsmRefreshTribesDAT').show();
				}
				else{
					$('#dsmRefreshTribesDAT').hide();
				}
			}
			else{
				$('#dsmTribesDATAge').text('*** AUCUNE DONNEE ***');
				$('#dsmRefreshTribesDAT').show();
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
			if($('#dsmFarmFinderPopup').length>0){
				$('#dsmFarmFinderPopup').show();
			
				return;
			}
		
			$('body').append('\
				<div id="dsmFarmFinderPopup" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:900;">\
					<div style="background:url(/graphic/background/bg-tile.jpg);opacity:0.8;position:fixed;top:0;left:0;width:100%;height:100%;z-index:5;"></div>\
\
					<div style="position:relative;margin:auto;padding:0;top:120px;width:702px;z-index:10;">\
						<a href="#" onclick="$(\'#dsmFarmFinderPopup\').hide();return false;" style="position:absolute;right:-8px;top:-8px;">\
							<img src="graphic/login_close.png" alt="Close" style="border:none;">\
						</a>\
\
						<div style="width:702px;height:22px;background:url(/graphic/index/sprites.png) no-repeat 0 -79px"></div>\
						<div style="padding:10px 20px;width:662px;height:100%;min-height:80px;background:url(/graphic/index/news_background.png) repeat-y">\
							<h1>'+script.name+' <sup><span style="font-size:small;">v'+script.version.toFixed(2)+'</span></sup><sub><span style="font-weight:bold;font-style:italic;text-decoration:none;font-size:x-small;"><a href="'+script.author.url+'" target="_blank"> by '+script.author.name+'</a></span></sub></h1>\
							<div style="margin:auto;"><table><tr>\
								<td>\
									<table id="dsmSettings" class="vis">\
										<tr><th style="padding:2px 10px;">Options</th><th style="padding:2px 10px;">Valeurs</th></tr>\
										<tr><td style="padding:2px 10px;"><span>barbares seuls</span></td><td style="padding:2px 10px;align:center;"><input id="dsmBarbOnly" type="checkbox"/></td></tr>\
										<tr><td style="padding:2px 10px;"><span>Continent(s)</span></td><td style="padding:2px 10px;align:center;"><input id="dsmContinents"/></td></tr>\
										<tr><td style="padding:2px 10px;"><span>Région rectangulaire de la carte</span></td><td style="padding:2px 10px;"><span style="margin-left:0.5em;margin-right:0.5em;">Nord-Ouest :</span><input id="dsmMRTopLeft" size="7"/><span style="margin-left:0.5em;margin-right:0.5em;">Sud-Est :</span><input id="dsmMRBottomRight" size="7"/></td></tr>\
										<tr><td style="padding:2px 10px;"><span>Points min</span></td><td style="padding:2px 10px;"><input id="dsmMinPoints"/></td></tr>\
										<tr><td style="padding:2px 10px;"><span>Points max</span></td><td style="padding:2px 10px;"><input id="dsmMaxPoints"/></td></tr>\
										<tr><td style="padding:2px 10px;"><span>Rayon</span></td><td style="padding:2px 10px;"><input id="dsmRadius" size="3"/><span style="margin-left:0.5em;margin-right:0.5em;">champs autour de : </span><input id="dsmRadiusCentre" size="7"/></td></tr>\
										<tr><td style="padding:2px 10px;"><span id="dsmPlayersTitle">Pseudo jour</span></td><td style="padding:2px 10px;"><input id="dsmPlayers"/></td></tr>\
										<tr><td style="padding:2px 10px;"><span id="dsmTribesTitle">Tag tribu</span></td><td style="padding:2px 10px;"><input id="dsmTribes"/></td></tr>\
										<tr><th><input id="dsmFindFarms" type="button" value="Générer" style="width:100%;"/></th><th style="padding:2px 10px;"><a id="dsmSaveConfig" href="#" style="text-align:right;">Sauvegarder</a></th></tr>\
									</table>\
								</td>\
								<td>\
									<table id="dsmResult" class="vis">\
										<tr><th style="padding:2px 10px;"><span>Liste de villages</span><div style="float:right;"><span id="dsmCoordCount">(0)</span></div></th></tr>\
										<tr><td style="padding:2px 10px;"><label for="dsmFormat">Format :</label><input id="dsmFormat" type="text" style="width:240px;margin-left:1em;" value="{coord}"/><span id="dsmHint"></span></td></tr>\
										<tr><td style="padding:2px 10px;"><textarea id="dsmOutput" cols="40" rows="17" style="overflow-x:hidden;overflow-y:auto;" onfocus="this.select();"></textarea></td></tr>\
										<tr><th style="padding:2px 10px;"><input id="dsmBBEncoded" type="checkbox"/><label for="dsmBBEncode">BB-Code</label></th></tr>\
										<tr><th style="padding:2px 10px;"><input id="dsmLineEncoded" type="checkbox"/><label for="dsmLineEncoded">En Ligne</label></th></tr>\
										<tr><th style="padding:2px 10px;"><input id="dsmListEncoded" type="checkbox"/><label for="dsmListEncoded">En Liste</label></th></tr>\
									</table>\
								</td>\
							</tr></table></div>\
\
							<span style="font-weight:bold;">Age des donnés sur les villages :</span>\
							<span id="dsmVillagesDATAge" style="margin-left:1em;"></span>\
							<a id="dsmRefreshVillagesDAT" href="#" style="margin-left:1em;display:none;">&lt;Refresh Now&gt; ...</a>\
							<br/>\
							<span style="font-weight:bold;">Age des donnés sur les joueurs :</span>\
							<span id="dsmPlayersDATAge" style="margin-left:1em;"></span>\
							<a id="dsmRefreshPlayersDAT" href="#" style="margin-left:1em;display:none;">&lt;Refresh Now&gt; ...</a>\
							<br/>\
							<span style="font-weight:bold;">Age des donnés sur les tribus :</span>\
							<span id="dsmTribesDATAge" style="margin-left:1em;"></span>\
							<a id="dsmRefreshTribesDAT" href="#" style="margin-left:1em;display:none;">&lt;Refresh Now&gt; ...</a>\
							<br/>\
							<span style="font-style:italic;color:red;">(ATTENTION: charger ces données peut prendre plusieurs minutes...)</span>\
							<br/>\
						</div>\
\
						<div style="width: 702px; height: 22px; background:url(/graphic/index/sprites.png) no-repeat 0 -101px;"></div>\
					</div>\
				</div>\
			');
			
			// Wire up any relevant events.
			$('#dsmBarbOnly').click(function(){fnRefreshControls();});
			$('#dsmFindFarms').click(function(){fnCheckVillagesDAT();fnCheckPlayersDAT();fnCheckTribesDAT();fnFindFarms();});
			$('#dsmSaveConfig').click(function(){fnSaveConfig();});
			$('#dsmBBEncoded').click(function(){fnDisplayOutput();});
			$('#dsmRefreshVillagesDAT').click(function(){fnRefreshVillagesDAT();});
			$('#dsmRefreshPlayersDAT').click(function(){fnRefreshPlayersDAT();});
			$('#dsmRefreshTribesDAT').click(function(){fnRefreshTribesDAT();});
			
			$('#dsmHint').html('{coord} - Village Co-ordinate<br/>{points} - Village Points<br/>{name} - Village Name<br/>{player} - Village Owner<br/>{tribe} - Village Owner Tribe Tag<br/>{tribe_name} - Village Owner Tribe Name<br/>{continent} - Village Continent<br/>');
			$('#dsmHint').css({
				display:'none',
				position:'absolute',
				left:$('#dsmFormat').css('right'),
				width:'300px',
				marginTop:'-4px',
				border:'1px solid #c93',
				padding:'10px 12px',
				backgroundColor:'#ffc'
			});


			fnLoadConfig();
			fnRefreshControls();
			fnCheckVillagesDAT();
			fnCheckPlayersDAT();
			fnCheckTribesDAT();
		} // fnInjectGUIControls
		// ........................................................................
		function fnRefreshControls(){
			var state=$('#dsmBarbOnly').is(':checked')?'disabled':'';
			var color=$('#dsmBarbOnly').is(':checked')?'gray':'black';
			
			$('#dsmPlayersTitle').css({color:color});
			
			$('#dsmTribesTitle').css({color:color});
		} //fnRefreshControls
		// ........................................................................
		function fnBootStrapper(){
			/*if(!twConfig.hasMinVersion(script.minGameVersion)){
				var msg='This script requires v'+script.minGameVersion.toFixed(2)+' or higher.\nYou are running: v'+twConfig.version.toFixed(2);
				twUtil.print(msg);
				alert(msg);
				return;
			}*/
			
			fnInjectGUIControls();
			
/*
			switch(win.game_data.screen){
				case 'report':				
					break;
		
				default:
					var msg='This script must be run from a Report Detail Screen!';
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
				fnAjax(branch+'jquery.tw.utils.js','GET',{},'script',true,function(){
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
			alert('Error: '+errMsg);
		}
	}} // fnExecute



	// Append to the jQuery Namespace.
	$.extend({
		'twFarmFinder':fnExecute
	});
})((window.main||self).jQuery);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
$.twFarmFinder(branch,debugEnabled);