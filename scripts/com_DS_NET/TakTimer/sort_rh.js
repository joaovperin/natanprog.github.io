/* 
	Author	: Dale McKay
	Email	: dalesmckay@gmail.com
	Credit	: based on SlowTargets original Sorting Script.
	
	TODO	:
		* Fix the Row Shading (every 2nd row should be highlighted, even after sorting)
	
	NOTE	:
		* Use the following Client-side script launcher
		javascript:var vScript={URLs:['http://crosstrigger.com/tw/v7/sort_rh.js','http://taktimer.net/scripts/dales/sort_rh.js'],id:'fnOverviewSorter',config:{},action:function(){win[vScript.id](vScript.config);},runOnce:true};var win=(window.frames.length>0)?window.main:window;win.$(win.document).ready(function(){var isLoaded=false;var ii=0;function fnEmbedScript(){if(isLoaded||(ii>=vScript.URLs.length)){return;}win.$.getScript(vScript.URLs[ii]+'?'+Math.round(Math.random()*1000000),function(){if(!isLoaded){isLoaded=true;win.setTimeout(function(a,b){vScript.action();},200);}});ii++;if(!isLoaded){win.setTimeout(function(a,b){fnEmbedScript();},3000);}}if(win[vScript.id]){if(!vScript.runOnce){vScript.action();}}else{fnEmbedScript();}});void(0);
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

function fnOverviewSorter(config){
	var theScript=new OverviewSorter;
	theScript.execute();
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* Class: OverviewSorter                                                    */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function OverviewSorter(){
	try{
		this._name='Overview Sorter';
		this._version=7.04;
		this._min_game_version=6.50;
		this._author={
			name:'dalesmckay',
			email:'dalesmckay@gmail.com'
		};
		this._debugID = this._name.replace(/\s/g,'');
		this._debugEnabled=true;
		this._win=(window.frames.length>0)?window.main:window;
		this._valueArray=[];

		if(this._win.$('#' + this._debugID + '_done').length > 0){
			throw('This script has already been executed');
		}
		
		this.setup();
	}
	catch(objError){
		this.handleError(objError);
		throw('');
	}
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.__defineGetter__('overviewConfig',function(){
	if(typeof(this._overviewConfig)=="undefined"){
		this._overviewConfig={
			'non-premium':{
				'table':'#production_table',
				'cols':[
					{name:'village',      regex:/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,             desc:[['text'],['number',' ('],['number','|'],['number',') K']], visible:true},
					{name:'points',       regex:/\b(\d*\.?\d+)\b/,                             desc:[['number']],                                               visible:true},
					{name:'Resources',    regex:/\b(\d*\.?\d+)\s\b(\d*\.?\d+)\s\b(\d*\.?\d+)/, desc:[['number'],['number'],['number']],                         visible:true},
					{name:'Warehouse',    regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'Farm',         regex:/(\d+)\/(\d+)/,                                desc:[['number'],['number','/']],                                visible:true}
				]
			},
			'combined':{
				'table':'#combined_table',
				'cols':[
					{name:'notes',        regex:null,                                          desc:[],                                                         visible:this.hasMinVersion(7.0)&&this.hasVillageNotes},
					{name:'village',      regex:/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,             desc:[['text'],['number',' ('],['number','|'],['number',') K']], visible:true},
					{name:'Headquarters', regex:null,                                          desc:[],                                                         visible:true},
					{name:'Barracks',     regex:null,                                          desc:[],                                                         visible:true},
					{name:'Stable',       regex:null,                                          desc:[],                                                         visible:true},
					{name:'Workshop',     regex:null,                                          desc:[],                                                         visible:true},
					{name:'Smithy',       regex:null,                                          desc:[],                                                         visible:true},
					{name:'Belief',       regex:null,                                          desc:[],                                                         visible:this.hasChurch},
					{name:'Farm',         regex:/(\d+)\s*\((\d+)\)/,                           desc:[['number'],['number','(',')']],                            visible:true},
					{name:'spear',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'sword',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'axe',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'archer',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:this.hasArchers},
					{name:'spy',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'light',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'marcher',      regex:/(\d+)/,                                       desc:[['number']],                                               visible:this.hasArchers},
					{name:'heavy',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'ram',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'catapult',     regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'knight',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:this.hasPaladin},
					{name:'snob',         regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'militia',      regex:/(\d+)/,                                       desc:[['number']],                                               visible:this.hasMinVersion(7.0)&&this.hasMilitia},
					{name:'market',       regex:/(\d+)\/(\d+)/,                                desc:[['number'],['number','/']],                                visible:true}
				]
			},
			'prod':{
				'table':'#production_table',
				'cols':[
					{name:'Notes',        regex:null,                                          desc:[],                                                         visible:this.hasMinVersion(7.0)&&this.hasVillageNotes},
					{name:'Village',      regex:/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,             desc:[['text'],['number',' ('],['number','|'],['number',') K']], visible:true},
					{name:'Points',       regex:/\b(\d*\.?\d+)\b/,                             desc:[['number']],                                               visible:true},
					{name:'Resources',    regex:/\b(\d*\.?\d+)\s\b(\d*\.?\d+)\s\b(\d*\.?\d+)/, desc:[['number'],['number'],['number']],                         visible:true},
					{name:'Warehouse',    regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'Merchants',    regex:/(\d+)\/(\d+)/,                                desc:[['number'],['number','/']],                                visible:true},
					{name:'Farm',         regex:/(\d+)\/(\d+)/,                                desc:[['number'],['number','/']],                                visible:true},
					{name:'construction', regex:/(.*)/,                                        desc:[],                                                         visible:true},
					{name:'research',     regex:/(.*)/,                                        desc:[],                                                         visible:true},
					{name:'recruitment',  regex:/(.*)/,                                        desc:[],                                                         visible:true}
				]
			},
/* TODO: fix trades that do not have all 3 resource types
			'trader':{
				'table':'#trades_table',
				'cols':[
					{name:'direction',    regex:null,                                          desc:[],                                                         visible:true},
					{name:'sender',       regex:/([.\s\S\w\W\d\D]*)/,                          desc:[['text']],                                                 visible:true},
					{name:'origin',       regex:/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,             desc:[['text'],['number',' ('],['number','|'],['number',') K']], visible:true},
					{name:'recipient',    regex:/([.\s\S\w\W\d\D]*)/,                          desc:[['text']],                                                 visible:true},
					{name:'village',      regex:/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,             desc:[['text'],['number',' ('],['number','|'],['number',') K']], visible:true},
					{name:'arrival time', regex:/([.\s\S\w\W\d\D]*)/,                          desc:[['text']],                                                 visible:true},
					{name:'arrival in',   regex:/([.\s\S\w\W\d\D]*)/,                          desc:[['text']],                                                 visible:true},
					{name:'merchants',    regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'resources',    regex:/\b(\d*\.?\d+)\s\b(\d*\.?\d+)\s\b(\d*\.?\d+)/, desc:[['number'],['number'],['number']],                         visible:true}
				]
			},
*/
/* TODO: implement this
			'units':{
				'table':'#units_table',
				'cols':[
					{name:'Village',      regex:/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,             desc:[['text'],['number',' ('],['number','|'],['number',') K']], visible:true},
					{name:'location',     regex:null,                                          desc:[],                                                         visible:true},
					{name:'spear',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'sword',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'axe',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'archer',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:this.hasArchers},
					{name:'spy',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'light',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'marcher',      regex:/(\d+)/,                                       desc:[['number']],                                               visible:this.hasArchers},
					{name:'heavy',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'ram',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'catapult',     regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'knight',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:this.hasPaladin},
					{name:'snob',         regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'militia',      regex:/(\d+)/,                                       desc:[['number']],                                               visible:this.hasMinVersion(7.0)&&this.hasMilitia},
					{name:'action',       regex:null,                                          desc:[],                                                         visible:true}
				]
			},
*/
			'commands':{
				'table':'#commands_table',
				'cols':[
					{name:'Attack ID',    regex:/(\d+)/,                                       desc:[['number']],                                               visible:true, custom:[2,/id\=(\d+)\b/i]},
					{name:'type',         regex:/(.*)/,                                        desc:[['text']],                                                 visible:true, custom:[2,/type\=(\w+)\b/i]},
					{name:'command',      regex:/([.\s\S\w\W\d\D]*)/,                          desc:[['text']],                                                 visible:true},
					{name:'origin',       regex:/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,             desc:[['text'],['number',' ('],['number','|'],['number',') K']], visible:true},
					{name:'arrival',      regex:/([.\s\S\w\W\d\D]*)/,                          desc:[['text']],                                                 visible:true},
					{name:'spear',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'sword',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'axe',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'archer',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:this.hasArchers},
					{name:'spy',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'light',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'marcher',      regex:/(\d+)/,                                       desc:[['number']],                                               visible:this.hasArchers},
					{name:'heavy',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'ram',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'catapult',     regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'knight',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:this.hasPaladin},
					{name:'snob',         regex:/(\d+)/,                                       desc:[['number']],                                               visible:true}
				]
			},
			'incomings':{
				'table':'#incomings_table',
				'cols':[
					{name:'Attack ID',    regex:/(\d+)/,                                       desc:[['number']],                                               visible:true, custom:[2,/id\=(\d+)\b/i]},
					{name:'type',         regex:/(.*)/,                                        desc:[['text']],                                                 visible:true, custom:[2,/type\=(\w+)\b/i]},
					{name:'command',      regex:/([.\s\S\w\W\d\D]*)/,                          desc:[['text']],                                                 visible:true},
					{name:'destination',  regex:/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,             desc:[['text'],['number',' ('],['number','|'],['number',') K']], visible:true},
/*
					{name:'origin',       regex:/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,             desc:[['text'],['number',' ('],['number','|'],['number',') K']], visible:this.hasMinVersion(7.0)},
*/
					{name:'player',       regex:/([.\s\S\w\W\d\D]*)/,                          desc:[['text']],                                                 visible:true},
					{name:'arrival time', regex:/([.\s\S\w\W\d\D]*)/,                          desc:[['text']],                                                 visible:true},
					{name:'arrival in',   regex:/([.\s\S\w\W\d\D]*)/,                          desc:[['text']],                                                 visible:true},
					{name:'req support',  regex:null,                                          desc:[],                                                         visible:true}
				]
			},
			'buildings':{
				'table':'#buildings_table',
				'cols':[
					{name:'construct',    regex:null,                                          desc:[],                                                         visible:true},
					{name:'demolish',     regex:null,                                          desc:[],                                                         visible:this.hasMinVersion(7.0)},
					{name:'village',      regex:/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,             desc:[['text'],['number',' ('],['number','|'],['number',') K']], visible:true},
					{name:'points',       regex:/\b(\d*\.?\d+)\b/,                             desc:[['number']],                                               visible:true},
					{name:'main',         regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'barracks',     regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'stable',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'garage',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'church',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:this.hasChurch},
					{name:'church_f',     regex:/(\d+)/,                                       desc:[['number']],                                               visible:this.hasChurch},
					{name:'snob',         regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'smith',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'place',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'statue',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:this.hasPaladin},
					{name:'market',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'wood',         regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'stone',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'iron',         regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'farm',         regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'storage',      regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'hide',         regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'wall',         regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'assignments',  regex:null,                                          desc:[],                                                         visible:true}
				]
			},
			'tech':{
				'table':'#techs_table',
				'cols':[
					{name:'activate',     regex:null,                                          desc:[],                                                         visible:this.hasMinVersion(7.0)},
					{name:'village',      regex:/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,             desc:[['text'],['number',' ('],['number','|'],['number',') K']], visible:true},
					{name:'points',       regex:/\b(\d*\.?\d+)\b/,                             desc:[['number']],                                               visible:true},
					{name:'spear',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'sword',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'axe',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'archer',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:this.hasArchers},
					{name:'spy',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'light',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'marcher',      regex:/(\d+)/,                                       desc:[['number']],                                               visible:this.hasArchers},
					{name:'heavy',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'ram',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'catapult',     regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'sum',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'research',     regex:null,                                          desc:[],                                                         visible:true}
				]
/* TODO: fix issue with additional row when 'edit' is clicked
			},
			'groups':{
				'table':'#group_assign_table',
				'cols':[
					{name:'village',      regex:/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,             desc:[['text'],['number',' ('],['number','|'],['number',') K']], visible:true},
					{name:'qty',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
					{name:'points',       regex:/\b(\d*\.?\d+)\b/,                             desc:[['number']],                                               visible:this.hasMinVersion(7.0)},
					{name:'groups',       regex:/([.\s\S\w\W\d\D]*)/,                          desc:[['text']],                                                 visible:true},
					{name:'edit',         regex:null,                                          desc:[],                                                         visible:true}
				]
			},
*/
/* TODO: implement this
			'accountmanager':{
				'table':'#overview_menu',
				'cols':[
				]
*/
			}
		};
	}
	
	return this._overviewConfig;
});
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.print=function(msg,id){
	if(this._win.$('#' + this._debugID).length <= 0){
		this._win.$('body').append('<div id="' + this._debugID + '"></div>');
	}
	
	this._win.$('#' + this._debugID).append('<span id="'+((typeof(id)=='undefined')?'':id)+'">'+msg+'</span><br/>');
}; /* OverviewSorter::print */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.debug=function(msg){
	if((typeof(this._debugEnabled) != "undefined") && this._debugEnabled){
		this.print(msg);
	}
}; /* OverviewSorter::debug */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* TODO: possible add a max_version parameter */
OverviewSorter.prototype.hasMinVersion=function(min_version){
	return (this.gameVersion >= min_version);
}; /* OverviewSorter::hasMinVersion */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.handleError=function(objError){
	var errMsg=String(objError.message||objError||'');
	if(errMsg){
		this.print('Error: ' + errMsg);
		alert('Error: ' + errMsg);
	}
}; /* OverviewSorter::handleError */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.ajax=function(url,method,params,type,isAsync){
	var error = null;
	var payload = null;

	this._win.$.ajax({
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
}; /* OverviewSorter::ajax */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.printVersion=function(){
	this.print('<span style="color:red;">Provide the following info when asking for help:</span>');
	this.print("=========================");
	this.print(this._author.name + "'s " + this._name + ": v" + this._version.toFixed(2));
	this.print("(based on SlowTarget's original Sort script)");
	this.print("=========================");
	this.print("Premium: "+(this.isPremium?"yes":"no"));
	this.print("Church : "+(this.hasChurch?"yes":"no"));
	this.print("Statue : "+(this.hasPaladin?"yes":"no"));
	this.print("Archer : "+(this.hasArchers?"yes":"no"));
	this.print("Militia: "+(this.hasMilitia?"yes":"no"));
	this.print("Notes  : "+(this.hasVillageNotes?"yes":"no"));
	this.print("Sitter : "+(this._win.location.href.match(/t\=\d+/i)?"yes":"no"));
	this.print("=========================");
	this.print("Version: "+this._win.game_data.version);
	this.print("World  : "+this._win.game_data.world);
	this.print("Screen : "+this._win.game_data.screen);
	this.print("Mode   : "+this._win.game_data.mode);
	this.print("URL    : "+this._win.location.href);
	this.print("Browser: "+navigator.userAgent);
	this.print("=========================");
	
	return true;
}; /* OverviewSorter::printVersion */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.__defineGetter__('gameVersion',function(){
	if(typeof(this._gameVersion)=="undefined"){
		this._gameVersion = this._win.game_data.version.match(/[\d|\.]+/g);
		this._gameVersion = (this._gameVersion?parseFloat(this._gameVersion[1]):-1);
	}
	
	return this._gameVersion;
});
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.__defineGetter__('activeOverview',function(){
	if(typeof(this._activeOverview)=="undefined"){
		if(this._win.game_data.screen == 'overview_villages'){
			var overview = (this.isPremium?this._win.game_data.mode:'non-premium');
			this._activeOverview = this.overviewConfig[overview];
		}
	}
	
	return this._activeOverview;
});
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.__defineGetter__('isPremium',function(){
	if(typeof(this._isPremium)=="undefined"){
		this._isPremium = (this._win.$('#quickbar_outer').length>0);
	}
	
	return this._isPremium;
});
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.__defineGetter__('hasChurch',function(){
	if(typeof(this._hasChurch)=="undefined"){
		this._hasChurch = (parseInt(this.worldConfig.find('game church').text()||'0',10)>0);
	}
	
	return this._hasChurch;
});
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.__defineGetter__('hasPaladin',function(){
	if(typeof(this._hasPaladin)=="undefined"){
		this._hasPaladin = (parseInt(this.worldConfig.find('game knight').text()||'0',10)>0);
	}
	
	return this._hasPaladin;
});
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.__defineGetter__('hasArchers',function(){
	if(typeof(this._hasArchers)=="undefined"){
		this._hasArchers = (parseInt(this.worldConfig.find('game archer').text()||'0',10)>0);
	}
	
	return this._hasArchers;
});
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.__defineGetter__('hasMilitia',function(){
	if(typeof(this._hasMilitia)=="undefined"){
		this._hasMilitia = (this.unitConfig.find('militia').length>0);
	}
	
	return this._hasMilitia;
});
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.__defineGetter__('hasVillageNotes',function(){
	if(typeof(this._hasVillageNotes)=="undefined"){
		this._hasVillageNotes = (this._win.$('[src*=note.png],[class*=note-icon]').length>0);
	}
	
	return this._hasVillageNotes;
});
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.__defineGetter__('worldConfig',function(){
	if(typeof(this._worldConfig)=="undefined"){
		this._worldConfig = this._win.$(this.ajax('/interface.php','GET',{'func':'get_config'},'xml',false)).find('config');
	}
	
	return this._worldConfig;
});
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.__defineGetter__('unitConfig',function(){
	if(typeof(this._unitConfig)=="undefined"){
		this._unitConfig = this._win.$(this.ajax('/interface.php','GET',{'func':'get_unit_info'},'xml',false)).find('config');
	}
	
	return this._unitConfig;
});
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.__defineGetter__('buildingConfig',function(){
	if(typeof(this._buildingConfig)=="undefined"){
		this._buildingConfig = this._win.$(this.ajax('/interface.php','GET',{'func':'get_building_info'},'xml',false)).find('config');
	}
	
	return this._buildingConfig;
});
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.setup=function(){
	var myself=this;
	myself.debug('CALL: OverviewSorter::setup');

	/* HACK: fix null mode */
	if(!myself._win.game_data.mode){
		var vmode=myself._win.$('#overview_menu td[class=selected] a').attr('href');
		vmode=vmode?vmode.match(/mode\=(\w*)/i):null;
		myself._win.game_data.mode=vmode?vmode[1]:null;
	}
	
	myself.printVersion();

	if(!this.hasMinVersion(myself._min_game_version)){
		throw('This script requires v'+myself._min_game_version.toFixed(2)+' or higher.\nYou are running: v'+myself.gameVersion.toFixed(2));
	}
	
	if(typeof(this.activeOverview) == 'undefined'){
		throw('The script can not be run on this Screen');
	}
}; /* OverviewSorter::setup */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.onClick=function(myself,sender){
	myself.debug('CALL: OverviewSorter::onClick');

	if(sender.className.match(/\bEventActive\b/)){
		return;
	}

	/* Clear any highlighted sorting arrows */
	myself._win.$(myself.activeOverview.table + ' tr:eq(0) th div[class*=EventActive]').each(function(i,e){
		e.className = e.className.replace(/EventActive/i,'EventInactive');
	});

	/* Highlight the active sorting arrow */
	sender.className = sender.className.replace(/EventInactive/i,'EventActive');

	/* Extract the detail of the column to be sorted */
	var sortDetail = sender.id.match(/SORT\_([\w|\W]+)\_(\d+)\_(\w+)\_(\w+)$/i);
	var fieldName  = sortDetail[1];
	var fieldIndex = sortDetail[2];
	var sortDir = (sortDetail[3]=='asc')?1:-1;
	var fieldType = sortDetail[4];
	
	function fnAdjustNumber(value){return parseInt(value.toString().replace('.','','g')||'0',10);}

	/* Sort the active column */
	myself._valueArray=myself._valueArray.sort(function(a,b){
		switch(sortDetail[4]){
			case 'number' : return (fnAdjustNumber(a[1][fieldName][fieldIndex]) - fnAdjustNumber(b[1][fieldName][fieldIndex])) * sortDir;
			case 'float'  : return (a[1][fieldName][fieldIndex] - b[1][fieldName][fieldIndex]) * sortDir;
			case 'text'   : return a[1][fieldName][fieldIndex].localeCompare(b[1][fieldName][fieldIndex]) * sortDir;
			case 'date'   : /* TODO: */ break;
			case 'time'   : /* TODO: */ break;
		}
		
		return a[1][fieldName][fieldIndex].localeCompare(b[1][fieldName][fieldIndex]) * sortDir;
	});

	/* Clear the Table Rows (except the header) */
	myself._win.$(myself.activeOverview.table + ' tr:gt(0)').remove();
	
	/* Insert the Sorted Table Rows */
	myself._win.$(myself._valueArray.map(function(value){return value[0];}).join('')).insertAfter(myself._win.$(myself.activeOverview.table + ' tr:eq(0)'));

	return false;
}; /* OverviewSorter::onClick */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.injectCustomCSS=function(){
	var myself=this;
	myself.debug('CALL: OverviewSorter::injectCustomCSS');

	myself._win.$('head').append(
		'<style>' +
			'div.clear{clear:both;vertical-align:bottom;}'+
			'div.text{float:left;}'+
			'div.sort{float:left;width:0.7em;}'+
			'div.asc{width:0;height:0;line-height:0;margin-top:.0em;border-top:0px solid;border-right:.3em solid rgb(222,211,185);border-bottom:.8em solid;border-left:.3em solid rgb(222,211,185);float:left;margin-left:0px;}'+
			'div.desc{width:0;height:0;margin-top:.2em;line-height:0;border-top:.8em solid ;border-left:.3em solid rgb(222,211,185);border-right:.3em solid rgb(222,211,185);border-bottom:0px solid;float:left;}'+
			'div.EventHover{border-top-color:#0082BE;border-bottom-color:#0082BE;}'+
			'div.EventActive{border-top-color:#C00;border-bottom-color:#C00;}'+
			'div.EventInactive{border-top-color:#fff;border-bottom-color:#fff;}'+
		'</style>'
	);
}; /* OverviewSorter::injectCustomCSS */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.injectCustomColumnHeaders=function(){
	var myself=this;
	myself.debug('CALL: OverviewSorter::injectCustomColumnHeaders');

	for(var ii=0; ii<myself.activeOverview.cols.length; ii++){
		if(typeof(myself.activeOverview.cols[ii]['custom']) != 'undefined'){
			myself._win.$('<th>' + myself.activeOverview.cols[ii].name + '</th>').insertBefore(myself._win.$(myself.activeOverview.table + ' tr:eq(0) th:eq(' + ii + ')'));
		
			myself._win.$(myself.activeOverview.table + ' tr:gt(0)').each(function(i,e){
				myself._win.$('<td></td>').insertBefore(myself._win.$(e).find('td:eq(' + ii + ')'));
			});
		}
	}
}; /* OverviewSorter::injectCustomColumnHeaders */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.injectSortingArrows=function(){
	var myself=this;
	this.debug('CALL: OverviewSorter::injectSortingArrows');

	var colAdjust = 0;
	var length=myself.activeOverview.cols.length;	

	myself._win.$(myself.activeOverview.table + ' tr:eq(0) th').each(function(i,e){
		var srcHTML = '<div class="text">'+myself._win.$(e).html()+'</div>';
		var index = (i+colAdjust);
	
		while(!myself.activeOverview.cols[index].visible){
			colAdjust++;
			index=(i+colAdjust)%length;
		}

		for(var ii=0; ii<myself.activeOverview.cols[index].desc.length; ii++){
			if((myself.activeOverview.cols[index].desc[ii].length>1)&&myself.activeOverview.cols[index].desc[ii][1]){
				srcHTML += '<div class="text">' + myself.activeOverview.cols[index].desc[ii][1] + '</div>';
			}

			if(myself.activeOverview.cols[index].desc[ii].length>0){
				srcHTML += 
					'<div class="sort">' +
						'<div onclick="onClick(this);" class="asc EventInactive" id="SORT_'+myself.activeOverview.cols[index].name+'_'+ii+'_asc_'+myself.activeOverview.cols[index].desc[ii][0]+'"></div>' +
						'<div onclick="onClick(this);" class="desc EventInactive" id="SORT_'+myself.activeOverview.cols[index].name+'_'+ii+'_desc_'+myself.activeOverview.cols[index].desc[ii][0]+'"></div>' +
					'</div>';
			}

			if((myself.activeOverview.cols[index].desc[ii].length>2)&&myself.activeOverview.cols[index].desc[ii][2]){
				srcHTML += '<div class="text">' + myself.activeOverview.cols[index].desc[ii][2] + '</div>';
			}
		}

		myself._win.$(e).html('<div class="clear">'+srcHTML+'</div>');
		
		/* HACK: to get the onClick to work */
		myself._win.$('div[id*=SORT_]').each(function(i,e){
			e.onClick=function(){myself.onClick(myself,e);};
		});
	});
}; /* OverviewSorter::injectSortingArrows */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.extractSortableData=function(){
	var myself=this;
	myself.debug('CALL: OverviewSorter::extractSortableData');

	var colAdjust = 0;
	var srcHTML = '';
	var itemCount = 0;
	var cellIndex;
	var cellRegex;
	var rowData = {};
	var length = myself.activeOverview.cols.length;

	myself._win.$(myself.activeOverview.table + ' tr:gt(0) td').each(function(i,e){
		var index = (i + colAdjust) % length;

		if((i > 0) && !index){
			myself._valueArray.push([srcHTML,rowData]);
			rowData={};
			itemCount=0;
		}
	
		srcHTML = myself._win.$(myself._win.$('<div></div>').html(myself._win.$(e.parentNode).clone())).html();
	
		while(!myself.activeOverview.cols[index].visible){
			colAdjust++;
			index = (i + colAdjust) % length;
		}

		/* Inject Custom Data */
		if(typeof(myself.activeOverview.cols[index]['custom']) != 'undefined'){
			cellIndex = myself.activeOverview.cols[index].custom[0];
			cellRegex = myself.activeOverview.cols[index].custom[1];
			myself._win.$(e).html('<div class="text">'+myself._win.$(e.parentNode).find('td:eq(' + cellIndex + ')').html().match(cellRegex)[1]+'</div>');
		}

		cellRegex = myself.activeOverview.cols[index].regex;
		if(cellRegex){
			/* ******** */
			/* BUG Hunt */
			/* ******** */
/*
			myself.debug('');
			myself.debug('DEBUG: ' + 'index => ' + index);
			myself.debug('DEBUG: ' + 'myself.activeOverview.cols[index].name => ' + myself.activeOverview.cols[index].name);
			myself.debug('DEBUG: ' + 'myself._win.$(e).text() => ' + myself._win.$(e).text());
			myself.debug('DEBUG: ' + 'cellRegex => ' + cellRegex);
			myself.debug('DEBUG: ' + 'myself._win.$(e).text().match(cellRegex) => ' + myself._win.$(e).text().match(cellRegex));
*/
			/* ******** */
			
			rowData[myself.activeOverview.cols[index].name] = myself._win.$(e).text().match(cellRegex).slice(1);
		}
		else{
			rowData[myself.activeOverview.cols[index].name] = [];
		}

		itemCount++;
	});

	if(itemCount>0){
		myself._valueArray.push([srcHTML,rowData]);
		rowData={};
		itemCount=0;
	}
}; /* OverviewSorter::extractSortableData */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.execute=function(){
	var myself=this;
	myself.debug('CALL: OverviewSorter::execute');

	try{
		if(this._win.$('#' + this._debugID + '_done').length > 0){
			throw('This script has already been executed');
		}
		
		myself.injectCustomCSS();
		myself.injectCustomColumnHeaders();
		myself.injectSortingArrows();
		myself.extractSortableData();
		
		myself.print('<br/>execution completed',this._debugID + '_done');
	}
	catch(objError){
		this.handleError(objError);
	}
}; /* OverviewSorter::execute */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */