/* Remove the comments if running locally (ie. non-hosted)
javascript:
*/

/* 
	Author	: Dale McKay
	Email	: dalesmckay@gmail.com
	Credit	: based on SlowTargets original Sorting Script.
	
	TODO	:
		* Namespace the localStorage data (eg. encapsulate within a single JSON Object)
		  -- make sure it won't conflict with any other developer by adding a prefix ID
		* Add scope to the localStorage data (eg Global\World\Player accessibility)
		* Add localStorage security 
	
	NOTES	:
		* Sample Client-side script launcher:
		javascript:var vScript={URLs:['http://crosstrigger.com/tw/v7/TEMPLATE.js','http://taktimer.net/scripts/dales/TEMPLATE.js'],id:'fnTEMPLATE',config:{debugEnabled:true},action:function(){win[vScript.id](vScript.config);},runOnce:true};var win=(window.frames.length>0)?window.main:window;win.$(win.document).ready(function(){var isLoaded=false;var ii=0;function fnEmbedScript(){if(isLoaded||(ii>=vScript.URLs.length)){return;}win.$.getScript(vScript.URLs[ii]+'?'+Math.round(Math.random()*1000000),function(){if(!isLoaded){isLoaded=true;win.setTimeout(function(a,b){vScript.action();},200);}});ii++;if(!isLoaded){win.setTimeout(function(a,b){fnEmbedScript();},3000);}}if(win[vScript.id]){if(!vScript.runOnce){vScript.action();}}else{fnEmbedScript();}});void(0);
____________________________________________________________

Copyright (C) 2011 Dale McKay, all rights reserved
version 1.0, 6 February 2011

This software is provided 'as-is', without any express or implied warranty. In no event will the author be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:
The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
This notice may not be removed or altered from any source distribution.
____________________________________________________________
*/

function fnTEMPLATE(config){
	var theScript=new TEMPLATE(config);
	theScript.execute();
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* Class: TEMPLATE */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* This is basically a NameSpace to prevent cluttering the window variable  */
function TEMPLATE(config){
	try{
		var myself=this;

		/* Add any missing functionality */
		myself.ensureBrowserConsistency();

		/* ************** */
		/* CUSTOMIZE THIS */
		/* ************** */
		myself.name='Script Name';
		myself.version=1.00;
		myself.minGameVersion=7.00;
		myself.author={
			name:'dalesmckay',
			email:'dalesmckay@gmail.com'
		};
		myself.debugEnabled=(typeof(config)!='undefined')&&(typeof(config).debugEnabled!='undefined')&&config.debugEnabled;
		/* ************** */

		myself.debugID = myself.name.replace(/\s/g,'');

		myself.win=(window.frames.length>0)?window.main:window;
		
		/* Shallow Copy */
		myself.config=config;
		
		myself.twConfig=new TWConfig();
		
		myself.setup();
		
		return myself;
	}
	catch(objError){
		this.handleError(objError);
		throw('');
	}
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

TEMPLATE.prototype.runScript=function(){
	var myself=this;

	myself.debug('CALL: TEMPLATE::runScript');

	/* >>> YOUR IMPLEMENTATION HERE <<< */

}; /* TEMPLATE::runScript */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

TEMPLATE.prototype.handleError=function(objError){
	var myself=this;

	/* >>> CUSTOM HANDLING CAN OVERRIDE THE FOLLOWING <<< */

	var errMsg=String(objError.message||objError||'');
	if(errMsg){
		this.print('Error: ' + errMsg);
		alert('Error: ' + errMsg);
	}
}; /* TEMPLATE::handleError */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

TEMPLATE.prototype.print=function(msg,id){
	var myself=this;
	if(myself.win.$('#' + myself.debugID).length <= 0){
		myself.win.$('body').append('<div id="' + myself.debugID + '"></div>');
	}
	
	myself.win.$('#' + myself.debugID).append('<span id="'+((typeof(id)=='undefined')?'':id)+'">'+msg+'</span><br/>');
}; /* TEMPLATE::print */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

TEMPLATE.prototype.debug=function(msg){
	var myself=this;
	if((typeof(myself.debugEnabled) != 'undefined') && myself.debugEnabled){
		myself.print(msg);
	}
}; /* TEMPLATE::debug */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* TODO: possibly add a maxVersion parameter */
TEMPLATE.prototype.hasMinVersion=function(minVersion){
	var myself=this;
	return (myself.twConfig.gameVersion >= minVersion);
}; /* TEMPLATE::hasMinVersion */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

TEMPLATE.prototype.printVersion=function(){
	var myself=this;

	if(myself.win.$('#' + myself.debugID + '_done').length > 0){
		return;
	}

	myself.print('<span style="color:red;">Provide the following info when asking for help:</span>');
	myself.print("=========================");
	myself.print(myself.author.name + "'s " + myself.name + ": v" + myself.version.toFixed(2));
	myself.print("=========================");
	myself.print("Premium: "+(myself.twConfig.isPremium?"yes":"no"));
	myself.print("Church : "+(myself.twConfig.hasChurch?"yes":"no"));
	myself.print("Statue : "+(myself.twConfig.hasPaladin?"yes":"no"));
	myself.print("Archer : "+(myself.twConfig.hasArchers?"yes":"no"));
	myself.print("Militia: "+(myself.twConfig.hasMilitia?"yes":"no"));
	myself.print("Notes  : "+(myself.twConfig.hasVillageNotes?"yes":"no"));
	myself.print("Sitter : "+(myself.win.location.href.match(/t\=\d+/i)?"yes":"no"));
	myself.print("=========================");
	myself.print("Version: "+myself.win.game_data.version);
	myself.print("World  : "+myself.win.game_data.world);
	myself.print("Screen : "+myself.win.game_data.screen);
	myself.print("Mode   : "+myself.win.game_data.mode);
	myself.print("URL    : "+myself.win.location.href);
	myself.print("Browser: "+navigator.userAgent);
	myself.print("=========================");
}; /* TEMPLATE::printVersion */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

TEMPLATE.prototype.ensureBrowserConsistency=function(){
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
}; /* TEMPLATE::ensureBrowserConsistency
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

TEMPLATE.prototype.setup=function(){
	var myself=this;
	myself.debug('CALL: TEMPLATE::setup');

	/* HACK: fix null mode */
	if(!myself.win.game_data.mode){
		var vmode=myself.win.$('#overview_menu td[class="selected"] a').attr('href');
		vmode=vmode?vmode.match(/mode\=(\w*)/i):null;
		myself.win.game_data.mode=vmode?vmode[1]:null;
	}
	
	myself.printVersion();

	if(!myself.hasMinVersion(myself.minGameVersion)){
		throw('This script requires v'+myself.minGameVersion.toFixed(2)+' or higher.\nYou are running: v'+myself.gameVersion.toFixed(2));
	}
}; /* TEMPLATE::setup */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

TEMPLATE.prototype.execute=function(){
	try{
		var myself=this;
		myself.debug('CALL: TEMPLATE::execute');

/* TODO:		
		if(myself.win.$('#' + myself.debugID + '_done').length > 0){
			throw('This script has already been executed');
		}
*/

		myself.runScript();
		
		myself.print('<br/>execution completed',myself.debugID + '_done');
	}
	catch(objError){
		this.handleError(objError);
	}
}; /* TEMPLATE::execute */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

TEMPLATE.prototype.asString=function(AObj){
	function fnAsString(object,depth,max){
		depth=depth||0;
		max=max||10;

		if(depth>max){
			return false;
		}

		var indent="";
		for(var ii=0; ii<depth; ii++){
			indent+="\t";
		}

		var output="";  
		for(var key in object){
			output+="\n"+indent+key+": ";
			switch(typeof object[key]){
				case "object":output+=fnAsString(object[key],depth+1,max);break;
				/* case "function":output+="function";break; */
				default:output+=object[key];break;        
			}
		}

		return output;
	}

	return fnAsString(AObj||this);
}; /* TEMPLATE::asString */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* Class: CacheProvider                                                     */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* Uses an in-memory object if LocalStorage is not available */
function CacheProvider(useLocalStorageIfAvailable){
	var myself=this;

	myself._cache={};

	myself._useLocalStorage=(typeof(useLocalStorageIfAvailable)=='undefined')||useLocalStorageIfAvailable;
	try{
		myself._useLocalStorage=myself._useLocalStorage&&('localStorage' in window)&&(window['localStorage']!==null);
	}
	catch(objError){
		myself._useLocalStorage=false;
	}
	
	return{
		fetch:function(key){
			return (myself._useLocalStorage?JSON.parse(localStorage.getItem(key)):myself._cache[key])||undefined;
		},
		
		store:function(key,value){
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

		clear:function(key){
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
		
		spaceUsed:function(){
			return '*** NOT IMPLEMENTED ***';
		},
		
		spaceRemaining:function(){
			return '*** NOT IMPLEMENTED ***';
		},
		
		keys:function(){
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
} /* CacheProvider */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* Class: TWConfig                                                          */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function TWConfig(cache){
	var myself=this;	
	
	cache=cache||(new CacheProvider());
	
	var win=(window.main||window);
	var $=win.$;
	
	function xmlToStr(xml){
		return (window.ActiveXObject)?(xml?xml.xml:''):(new XMLSerializer()).serializeToString(xml);
	}
	
	function parseXML(xml){
	    if(window.ActiveXObject){
			if(!xml){
				return false;
			}
		
			/* HACK: IE won't load the default XML String */
			xml=xml
				.replace(/\\r/g,'\r')
				.replace(/\\n/g,'\n')
				.replace(/\\t/g,'\t')
				/* Convert then remove the quotes */
				.replace(/\\"/g,'\"')
				.replace(/\"/g,'')
				/* ****************************** */
				.replace(/.*\?\>/i,'')
			;
			
			var xmlDoc=new ActiveXObject('Microsoft.XMLDOM');
			xmlDoc.async='false';
			xmlDoc.loadXML(xml);

    	    xml=xmlDoc;
	    }
    
    	return xml;
	}

	 /* This is a blocking function for developer convenience */
	function fnAjax(url,method,params,type){
		var error = null;
		var payload = null;

		$.ajax({
			'async':false,  /* intentionally blocking */
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

	/* Scrapes the native language Building Names from the Buildings Help Screen
	   Limitation: page content is missing from some servers */
	function fnFetchBuildings(){
		var myself=this;	

		var buildings={};

		var srcHTML=fnAjax('/help2.php','GET',{'article':'buildings'},'html');
	
		$(srcHTML).find('[href*="building="]').each(function(i,e){
			buildings[e.href.match(/building\=(\w+)/i)[1]]=$(e).text();
		});

		return buildings;
	}

	/* Scrapes the native language Unit Names from the Units Help Screen
	   Limitation: page content is missing from some servers */
	function fnFetchUnits(){
		var myself=this;	

		var units={};

		var srcHTML=fnAjax('/help2.php','GET',{'article':'units'},'html');
	
		$(srcHTML).find('[href*="unit="]').each(function(i,e){
			units[e.href.match(/unit\=(\w+)/i)[1]]=$(e).text();
		});

		return units;
	}

	/* NOTE: this will be slow the very first time the script is ever run as it downloads several remote XML files and caches them in local storage */
	myself.worldConfig=$(parseXML(cache.fetch('worldConfig'))||cache.store('worldConfig',xmlToStr(fnAjax('/interface.php','GET',{'func':'get_config'},'xml'))))[window.ActiveXObject?'find':'filter']('config');
	myself.unitConfig=$(parseXML(cache.fetch('unitConfig'))||cache.store('unitConfig',xmlToStr(fnAjax('/interface.php','GET',{'func':'get_unit_info'},'xml'))))[window.ActiveXObject?'find':'filter']('config');
	myself.buildingConfig=$(parseXML(cache.fetch('buildingConfig'))||cache.store('buildingConfig',xmlToStr(fnAjax('/interface.php','GET',{'func':'get_building_info'},'xml'))))[window.ActiveXObject?'find':'filter']('config');
	
	/* TODO: perhaps combine this with buildingConfig */
	myself.buildings=cache.fetch('buildings')||cache.store('buildings',fnFetchBuildings());
	
	/* TODO: perhaps combine this with unitConfig */
	myself.units=cache.fetch('units')||cache.store('units',fnFetchUnits());
	
	/* TODO: Probably not necessary to Cache these ??? */
	myself.gameVersion = win.game_data.version.match(/[\d|\.]+/g);
	myself.gameVersion = (myself.gameVersion?parseFloat(myself.gameVersion[1]):-1);
	myself.hasChurch = (parseInt(myself.worldConfig.find('game church').text()||'0',10)>0);
	myself.hasPaladin = (parseInt(myself.worldConfig.find('game knight').text()||'0',10)>0);
	myself.hasArchers = (parseInt(myself.worldConfig.find('game archer').text()||'0',10)>0);
	myself.hasMilitia = (myself.unitConfig.find('militia').length>0);

	/* Do NOT Cache these */
	myself.isPremium = ($('#quickbar_outer').length>0);
	myself.hasVillageNotes = ($('[src*="note.png"],[class*="note-icon"]').length>0);
	/* myself.isMobile = */

	return myself;
} /* TWConfig */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


/* Remove the comments if running locally (ie. non-hosted)
fnTEMPLATE({debugEnabled:true});
void(0);
*/
