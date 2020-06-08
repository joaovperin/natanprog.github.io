// ########################################################################
// IMPORTANT: Version Information !!!
// ########################################################################
(window.main||window).twsfwConfig={
	id:'twsfw',
	version:'v0.04 (dev)',
	branch:'http://dl.dropbox.com/u/1375102/TribalWars/scripts/trunk/framework/',
	tabs : {
					'main' : { 'id':'main','name' : 'Main'},
					'help' : { 'name' : 'Help', 'title':'Help for script users'},//e.g 'href':'http://forum.tribalwars.co.uk/showpost.php?p=264019&postcount=1' // off domain so doesn't work
					'debug': { 'name' : 'Debug','title':'Low level information for debugging purposes'},
					'store': { 'name' : 'Store','title':'Local Storage Items'}
				}
	
	//branch:'http://dl.dropbox.com/u/25377948/twscripts/beta/'
	//branch:'http://dl.dropbox.com/u/25377948/twscripts/live/'
};
// ########################################################################

/* 
	Author	: Dale McKay
	Email	: dalesmckay@gmail.com
	Purpose	: To help simplify Tribal Wars scripting by providing a common framework.
	Credit	: 
	Modified by : Jason Farmer
	Mods    	: add jqueryui specifically tabs
	Mod Todo	: 
	Mod Notes	: need the ui loaded early ... for messages , although some scripts then change the width of the content - which is a pain as it mucks up the look... maybe this needs to be done much much later. 
				Perhaps create some hidden? divs early for messages etc and then pull them into the tabs when we're ready for tabs... Some scripts might want to create tabs of their own, and doing this would allow for that.

	***************
	Developer Launcher:
	***************	
	javascript:(window.main||window).$.getScript('http://dl.dropbox.com/u/25377948/twscripts/development/jquery.twscriptingfw.js');void(0);
	javascript:(window.main||window).$.getScript('http://dl.dropbox.com/u/1375102/TribalWars/scripts/trunk/framework/jquery.twscriptingfw.js');void(0);

	***************
	Tester Launcher:
	***************
	javascript:(window.main||window).$.getScript('http://dl.dropbox.com/u/25377948/twscripts/beta/jquery.twscriptingfw.js');void(0);

	***************
	Live Launcher:
	***************
	javascript:(window.main||window).$.getScript('http://dl.dropbox.com/u/25377948/twscripts/live/jquery.twscriptingfw.js');void(0);
	
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
if(!(window.main||window).jQuery.xml2json){
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



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Tribal Wars Scripting Framework.
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
(function($){
	// TODO: This will eventually download an external configuration file (XML/JSON/etc.).
	function fnFetchApprovedScriptConfig(){
		var config={
			scripts:{
				'map':[
					{file:'twsfwFarmFinder.js',classNames:['FarmFinder'],modes:[]}
				],
		
				'overview_villages':[
					{file:'twsfwOverviewSorter.js',classNames:['OverviewSorter'],modes:['combined','prod','commands','incomings','buildings','tech']},
					{file:'twsfwWithdrawSupport.js',classNames:['WithdrawSupport'],modes:['units']}
				],
				
				//'place':[
				//	{file:'twsfwReportEvaluator.js',classNames:['ReportEvaluator'],modes:[]}
				//],
				
				'report':[
					//{file:'twsfwReportEvaluator.js',classNames:['ReportEvaluator'],modes:[]}
					{file:'twsfwReportRenamer.js',classNames:['ReportRenamer'],modes:[]}
				],
		
				'train':[
					{file:'twsfwMassRecruit.js',classNames:['MassRecruit'],modes:['mass']}
				]
			}
		};

		return config;	
	}
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
	}
	// ........................................................................
	function fnPrint(msg,tab,id){
		var myself=this;
		var outputTab=(myself.tab||"debug");
		var outputID=(myself.id||"");
		// default tab is debug... use that if the specified one is missing
		var outputTabID=win.twsfwConfig.tabs[outputTab].contentId;
		if($(outputTabID).length<=0){
			outputTabID=win.twsfwConfig.tabs.debug.contentId;
			outputTab="debug";
			//fall back to body if tab is missing
			if($(outputTabID).length<=0){
				outputTabID="#ds_body";
				outputTab="main";
				//fall back to a messy alert if no body
				if($(outputTabID).length<=0){
					alert("Cannot print - no tab - no body - no luck - tab:"+outputTab+" msg:"+msg);
				}
			}
			// the tab specified didn't exist, so perhaps only the id was sent
			var outputID=(myself.id||myself.tab||win.twsfwConfig.id);
		}
		//$("#ds_body").append('<span><p>msg:'+msg+': tab:'+tab+": id:"+id+": outputTab:"+outputTab+": outputTabID:"+outputTabID+": outputID:"+outputID+"\r\n</p></span><br/>");
		outputID=win.twsfwConfig.id+"_"+win.twsfwConfig.tabs[outputTab].id+"_"+outputID;
		if($('#'+outputID).length<=0){
			$(outputTabID).append('<div id="'+outputID+'"></div>');
		}
	
		$('#'+outputID).append('<span>'+msg+"\r\n</span><br/>");
		return outputID;
	}
	// ........................................................................
	function fnDebug(msg){
		var myself=this;
		if(debugEnabled){
			fnPrint(msg,"debug");
		}
	}
	// ........................................................................
	function fnHandleError(objError,showAlert){
		var myself=this;
	
		var errMsg=String(objError.message||objError||'');
		if(errMsg){
			fnPrint('Error: ' + errMsg,"debug");
			
			if((typeof(showAlert)=='undefined')||showAlert){
				alert('Error: ' + errMsg);
			}
		}
	}
	// ........................................................................
	function fnDebugEnabled(isEnabled){
		if(typeof(isEnabled)=='undefined'){
			return debugEnabled;
		}
		
		debugEnabled=isEnabled;
	}
	// ........................................................................
	// NOTE: this function must be called externally since it uses $.twConfig()
	function fnPrintVersion(script){
		var twConfig=$.twConfig();
		
		
		fnDebug("=========================");
		fnDebug(script.author.name + "'s " + script.name + ": v" + script.version.toFixed(2));
		fnDebug("=========================");
		fnDebug("Account: "+win.game_data.player.name);
		fnDebug("Premium: "+(twConfig.isPremium?"yes":"no"));
		fnDebug("Church : "+($.twConfig().hasChurch?"yes":"no"));
		fnDebug("Statue : "+($.twConfig().hasPaladin?"yes":"no"));
		fnDebug("Archer : "+($.twConfig().hasArchers?"yes":"no"));
		fnDebug("Militia: "+($.twConfig().hasMilitia?"yes":"no"));
		fnDebug("Notes  : "+($.twConfig().hasVillageNotes?"yes":"no"));
		//fnDebug("Sitter : "+(win.location.href.match(/t\=\d+/i)?"yes":"no"));
		fnDebug("Sitter : "+((parseInt(win.game_data.player.sitter_id||'0',10)>0)?"yes":"no"));
		fnDebug("Version: "+win.game_data.version);
		fnDebug("World  : "+win.game_data.world);
		fnDebug("Screen : "+win.game_data.screen);
		fnDebug("Mode   : "+win.game_data.mode);
		fnDebug("URL    : "+win.location.href);
		fnDebug("Browser: "+navigator.userAgent);
		fnDebug("=========================");
		fnDebug("Framework Version: "+win.twsfwConfig.version);
		fnDebug("=========================");
	}
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
	}
	// ........................................................................
	function fnRegisterScriptClass(config){
		try{
			var instance=(registry[config['class']]||(new config['class']()));
			try{
				if(!registry[config['class']]){
					instance['frameworkEx']={id:instance.id};
				
					registry[config['class']]=instance;

					fnPrintVersion.call(instance['frameworkEx'],instance);
				}
				else if(instance.runOnce){
					throw('This Script can only be run once.\nRefresh your webbrowser before running it again.');
				}

				if(!$.twConfig().hasMinVersion(instance.minGameVersion)){
					throw('This script requires v'+instance.minGameVersion.toFixed(2)+' or higher.\nYou are running: v'+$.twConfig().gameVersion.toFixed(2));
				}

				fnPrint.call(instance['frameworkEx'],'<span style="color:gray;">'+instance.id+' loading...</span>',"debug");
				instance.execute(instance['frameworkEx']);
				fnPrint.call(instance['frameworkEx'],'<span style="color:gray;">'+instance.id+' ready.</span>',"debug");
				fnPrint.call(instance['frameworkEx'],"=========================<br/>","debug");
			}
			catch(objError){
				fnHandleError.call(instance['frameworkEx'],objError);
			}
		}
		catch(objError){
			fnHandleError(objError);
		}
	}
	// ........................................................................
	function fnLoadApprovedScripts(){
		var count=0;
		var modes;
		var scriptConfig=fnFetchApprovedScriptConfig();		
		var scripts=(scriptConfig.scripts[win.game_data.screen.toLowerCase()]||[]);
		// ........................................................................
		function fnFetchNextScript(index){
			while(true){
				if((index<0)||(index>=scripts.length)){
					if(count<=0){
						fnPrint('There are currently no scripts registered for this screen',"debug")
						alert('There are currently no scripts registered for this screen');
					}

					return;
				}

				modes=scripts[index].modes;
				if(!modes||(modes.length<=0)||(modes.indexOf(win.game_data.mode)>=0)){
					break;
				}
				
				index++;
			}
			
			fnAjax(win.twsfwConfig.branch+scripts[index].file,'GET',{},'script',true,function(data,status,req){
				count++;

				scripts[index].classNames.forEach(function(e,i){
					fnRegisterScriptClass({
						'class':win[e],
						'branch':win.twsfwConfig.branch
					});
				});

				fnFetchNextScript(index+1);
			});
		}
		// ........................................................................
		fnFetchNextScript(0);
	}
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// $.twCache()
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
	function CacheProvider(){
		var myself=this;

		myself._cache={};

		myself._useLocalStorage=true;
		try{
			myself._useLocalStorage=myself._useLocalStorage&&('localStorage' in window)&&(window['localStorage']!==null);
		}
		catch(objError){
			myself._useLocalStorage=false;
		}
	
		return{
			'fetch':function(key){
				return (myself._useLocalStorage?JSON.parse(localStorage.getItem(key)):myself._cache[key])||undefined;
			},
			'fetchJSON':function(key){
				myself.value =(myself._useLocalStorage?localStorage.getItem(key):JSON.stringify(myself._cache[key]))||undefined;
				
				//alert(key + " : "+(typeof myself.value)+" : "+ ((typeof myself.value == "undefined")?"":myself.value));
				if(typeof myself.value == "undefined"){myself.value ="";}
				var tmpX=myself.value.indexOf("{");
				return (myself.value.indexOf('{')<0)?'{"'+key+'":'+myself.value+'}':myself.value; // fake a json string if it isnt one - better would be to change the store function to make all stored strings json ...
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
					delete myself._cache[key];
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
	}
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// $.twConfig()
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
	}
	// ........................................................................
	function fnLoadBuildingConfig(){
		buildingConfig=cache.fetch(win.twsfwConfig.id+'BuildingConfig');
		if(!buildingConfig){
			fnPrint('refreshing buildingConfig...');

			fnAjax('/interface.php','GET',{'func':'get_building_info'},'xml',false,function(data,status,req){
				buildingConfig=$.xml2json(data);
				
				fnAjax('/help2.php','GET',{'article':'buildings'},'html',false,function(data,status,req){
					$(data).find('[href*="building="]').each(function(i,e){
						var buildingID=e.href.match(/building\=(\w+)/i)[1];
						buildingConfig[buildingID].name=$.trim($(e).text());
					});

					cache.store(win.twsfwConfig.id+'BuildingConfig',buildingConfig);
				});
			});
		}
	}
	// ........................................................................
	function fnLoadUnitConfig(){
		unitConfig=cache.fetch(win.twsfwConfig.id+'UnitConfig');
		if(!unitConfig){
			fnPrint('refreshing unitConfig...');
			
			fnAjax('/interface.php','GET',{'func':'get_unit_info'},'xml',false,function(data,status,req){
				unitConfig=$.xml2json(data);

				fnAjax('/help2.php','GET',{'article':'units'},'html',false,function(data,status,req){
					$(data).find('[href*="unit="]').each(function(i,e){
						var unitID=e.href.match(/unit\=(\w+)/i)[1];
						unitConfig[unitID].name=$.trim($(e).text());
					});

					cache.store(win.twsfwConfig.id+'UnitConfig',unitConfig);
				});
			});
		}
	}
	// ........................................................................
	function fnLoadWorldConfig(){
		worldConfig=cache.fetch(win.twsfwConfig.id+'WorldConfig');
		if(!worldConfig){
			fnPrint('refreshing worldConfig...');
			fnAjax('/interface.php','GET',{'func':'get_config'},'xml',false,function(data,status,req){
				worldConfig=cache.store(win.twsfwConfig.id+'WorldConfig',$.xml2json(data));
			});
		}
	}
	// ........................................................................
	function fnAppendToJQueryNamespace(){
		$.extend({
			'twCache':function(createNew){
				return ((createNew||false)?(new CacheProvider()):cache);
			},
			'twConfig':function(){return{
				'buildings':buildingConfig,
				'units':unitConfig,
				'world':worldConfig,
				'version':gameVersion,
				'hasChurch':(parseInt(worldConfig.game.church||'0',10)>0),
				'hasPaladin':(parseInt(worldConfig.game.knight||'0',10)>0),
				'hasArchers':(parseInt(worldConfig.game.archer||'0',10)>0),
				'hasMilitia':(typeof(unitConfig.militia)!='undefined'),
				'isPremium':($('#quickbar_outer').length>0),
				'hasVillageNotes':($('[src*="note.png"],[class*="note-icon"]').length>0),
				'hasMinVersion':function(minVersion){return (gameVersion>=minVersion);}
			};},
			'twUtil':function(){return{
				'ajax':fnAjax,
				'asString':fnAsString,
				'print':fnPrint,
				'debug':fnDebug,
				'handleError':fnHandleError,
				'debugEnabled':fnDebugEnabled,
				'printVersion':fnPrintVersion
			};}
		});
	}
	// ........................................................................
	function fnCheckFrameworkVersion(){
		// Remove obsolete data.
		cache.clear('twsfVersion');
		cache.clear('worldConfig');
		cache.clear('buildingConfig');
		cache.clear('unitConfig');
		cache.clear('buildings');
		cache.clear('units');
		
		var myVersion=cache.fetch(win.twsfwConfig.id+'Version');
		var needReset=(!myVersion||(myVersion!==win.twsfwConfig.version));
		if(needReset){
			cache.clear(win.twsfwConfig.id+'BuildingConfig');
			cache.clear(win.twsfwConfig.id+'UnitConfig');
			cache.clear(win.twsfwConfig.id+'WorldConfig');
		
			myVersion=cache.store(win.twsfwConfig.id+'Version',win.twsfwConfig.version);
		}
	} // fnCheckFrameworkVersion
	// ........................................................................
	
function CreateTableView(objArray) {
	
	var colHeads=[];
	colHeads.push("key");
	subHeads=[];
	var blFirst=true;
	var blOneTable=true;
	// check that all the keys have the same number and type of sub items eg, unit info etc // it doesnt check that they are in the same order! which would break this...
	$.each(objArray,function(key,value)	{
		if(blOneTable==true){
			if(typeof value=='object'){
				$.each(value,function(subkey,subvalue)	{	
					if(blFirst==true){
						subHeads.push(subkey);
					}else{
						if(subHeads.indexOf(subkey)<0){
							blOneTable=false;
						}
					}
				});
				blFirst=false;
			}else{
				blOneTable=false;
			}
		}
	});
	if(blOneTable==true){
		var str = '<table class="vis overview_table nowrap" style="border-collapse: separate;border-spacing: 2px;empty-cells: show !important;">';
		str += '<thead><tr>';
		//colHeads=colHeads.union(subHeads); // apparently not a function!
		$.each(subHeads,function(index,key){colHeads.push(key);});
		$.each(colHeads,function(index,key){str+='<th scope="col">' + key + '</th>';});
		str += '</tr></thead>';
		str += '<tbody>';
		
    	$.each(objArray,function(key,value)	{
			str += '<tr><th scope="row">'+key+'</th>';
			$.each(value,function(subkey,subvalue)	{	
				strContent=(typeof subvalue == 'object')?JSON.stringify(subvalue):subvalue;
				str+='<td>' + htmlEncode(strContent) + '</td>';
			});
			str+='</tr>';
		});
		str += '</tbody>'
    	str += '</table>';
		return str;

    }else{
		return dump(objArray);

	}
}
/**
 * Function : dump()
 * Arguments: The data - array,hash(associative array),object
 *    The level - OPTIONAL
 * Returns  : The textual representation of the array.
 * This function was inspired by the print_r function of PHP.
 * This will accept some data as the argument and return a
 * text that will be a more readable version of the
 * array/hash/object that is given.
 * Docs: http://www.openjs.com/scripts/others/dump_function_php_print_r.php // modified to create a table..
 */
function dump(arr,level) {
	var dumped_text = '<table class="vis overview_table nowrap" style="border-collapse: separate;border-spacing: 2px;empty-cells: show !important;"><tbody>';
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	//for(var j=0;j<level+1;j++) level_padding += "&nbsp;";
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			dumped_text += "<tr>" 
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += "<th>" + item + "</th><td>"+dump(value,level+1)+"</td>";
			} else {
				dumped_text += "<td>" + item + "</td><td>"+htmlEncode(value)+"</td>";
			}
			dumped_text += "</tr>" 
			
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text += "<tr><th>" + typeof(arr) + "</th><td>"+htmlEncode(arr)+"</td></tr>"; 
	}
	dumped_text += "</tbody></table>";
	return dumped_text;
}
function htmlEncode(s)
 {
	if(typeof s=='undefined'){return "undefined";}
 	return s.replace(/&(?!\w+([;\s]|$))/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
 }

	function fnAddUI(){
		$('<link rel="stylesheet" type="text/css" href="http://dl.dropbox.com/u/1375102/TribalWars/scripts/trunk/jqueryui/css/custom-theme/jquery-ui-1.8.11.custom.css" >').appendTo("head");
	    $.getScript("http://dl.dropbox.com/u/1375102/TribalWars/scripts/trunk/jqueryui/js/jquery-ui-1.8.11.custom.min.js",
			function() {
				
				var strPrefix=win.twsfwConfig.id+"_";
				var strTabsID=strPrefix+"Tabs";
				// create the new tabs div 
				$('#contentContainer').before('<div id="'+strTabsID+'"></div>');
				strTabsID="#"+strTabsID;
				
				$.each(win.twsfwConfig.tabs,function(tabId,objTab){win.twsfwConfig.tabs[tabId].contentId='#'+strPrefix+tabId;win.twsfwConfig.tabs[tabId].id=tabId;});
				$(strTabsID).append('<ul></ul>');
				$.each(win.twsfwConfig.tabs,function(tabId,objTab){href=(objTab.href||objTab.contentId+'tab'); $(strTabsID+' > ul').append('<li><a href="'+href+'">'+objTab.name+'</a></li>');
												$(strTabsID).append('<div id="'+strPrefix+tabId+'tab"></div>');});
				$(win.twsfwConfig.tabs.main.contentId+'tab').append($('#contentContainer')); //didn't know how to reference the key of main so added the id (well duh...)
				// copy the same table layout as main into the other tabs... (i know - not very future proofed - it would probably be better doing this by copying #contentContainer elements and removing what we don't want )
				var tableWidth=$('#contentContainer').width();
				// leave main alone
				
				// insert table layout into the rest
				// first get the ids
				var arrTabIds=[];
				$.each(win.twsfwConfig.tabs,function(tabId,objTab){if(tabId!="main"){arrTabIds.push(objTab.contentId+'tab');}});
				var strTabIds=arrTabIds.join(",");
				
				$(strTabIds).append('<table align="center" width="'+tableWidth+'px"><tr><td><table class="content-border" width="100%" cellspacing="0"><tr><td><table class="main" align="left"><tr><td><h2></h2><table width="100%"><tr><td class="tabcontent"></td></tr></table></td></tr></table></td></tr></table></td></tr></table>');
				// set the headings inside the tabs ..  and set an id for the tab content - except for the debug tab which we'll handle separately.
				$.each(win.twsfwConfig.tabs,function(tabId,objTab){$(objTab.contentId+'tab h2').append(objTab.title);
											   if(tabId!="debug"){$(objTab.contentId+'tab .tabcontent').attr('id',strPrefix+objTab.id);}											
				});
				
				// have the debug output go into a textbox for easy copying
				var textWidth=$('#contentContainer').width() - 50;
				var textHeight=$('#contentContainer').height() - 50;
				
				$(win.twsfwConfig.tabs.debug.contentId+'tab .tabcontent').append('<h3 style="color:red;font-weight:bold;">Provide the following info when asking for help:</h3><textarea id="'+strPrefix+win.twsfwConfig.tabs.debug.id+'" readonly="readonly" style="width:'+textWidth+'px;height:'+textHeight+'px;"></textarea>');
				
				fnDebug("table width :"+tableWidth);
				fnDebug("text width :"+textWidth);
				fnDebug("text height :"+textHeight);
				
				//populate the debug tab with native local storage items... handy for developers to see what they've got... 
				
				fnDebug("");
				fnDebug("Local storage Items");
				fnDebug('cache keys :'+cache.keys());
				fnDebug("--------------------");
				$.each(cache.keys(),function(index,keyId){if(keyId!="length"){fnDebug("");fnDebug(keyId);fnDebug(JSON.stringify(cache.fetch(keyId)));}});
				// populate the store tab for users .... possible enhancements will be to add functionality to copy and paste to and from notebook, edit values directly, delete items etc
				$.each(cache.keys(),function(index,keyId){if(keyId!='length'){$(win.twsfwConfig.tabs.store.contentId).append('<div style="margin:20px;"><h3>'+keyId+'</h3><span>'+CreateTableView(cache.fetch(keyId))+'</span></div>');}});
				// stripe the tables
				$(win.twsfwConfig.tabs.store.contentId+" tr:nth-child(even)").addClass("row_a");
				$(win.twsfwConfig.tabs.store.contentId+" tr:nth-child(even)").addClass("row_b");
				$(win.twsfwConfig.tabs.store.contentId+" tr").mouseover(function(){$(this).addClass("selected");}).mouseout(function(){$(this).removeClass("selected");});
				
				//$('#twhelp').append('<iframe src="http://forum.tribalwars.co.uk/showpost.php?p=264019&postcount=1"><p>Your browser does not support iframes.</p></iframe>'); //tw forum doesnt like iframes
				// display the framework config in Debug...
				$(win.twsfwConfig.tabs.debug.contentId+'tab .tabcontent').append('<div style="margin:20px;"><h3>'+"Framework Config : win.twsfwConfig"+'</h3><span>'+CreateTableView(win.twsfwConfig)+'</span></div>');
				$(win.twsfwConfig.tabs.debug.contentId+" tr:nth-child(even)").addClass("row_a");
				$(win.twsfwConfig.tabs.debug.contentId+" tr:nth-child(even)").addClass("row_b");
				$(win.twsfwConfig.tabs.debug.contentId+" tr").mouseover(function(){$(this).addClass("selected");}).mouseout(function(){$(this).removeClass("selected");});

			//tabify all we've just done
				$(strTabsID).tabs(
					{ajaxOptions: 
						{error: function( xhr, status, index, anchor ) {
							$( anchor.hash ).html(
									"Couldn't load this tab. We'll try to fix this as soon as possible. " +
									"If this wouldn't be a demo." 
							);
						}
						}
					}
				);
			}
		);
	}

	

	var win=(window.main||window);
	try{
		if($('#twtabs').length<=0){fnAddUI();} 
		// Always run this first!
		fnEnsureBrowserCompatibility();

		var registry={};
		var debugEnabled=true;
		//var debugEnabled=false;
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
		fnLoadApprovedScripts();
	}
	catch(objError){
		fnHandleError(objError);
		throw('');
	}
})((window.main||window).jQuery);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
