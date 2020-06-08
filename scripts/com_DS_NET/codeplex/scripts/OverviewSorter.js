/*
javascript:
*/

/* 
	Author	: Dale McKay
	Email	: dalesmckay@gmail.com
	Credit	: based on SlowTargets original Sorting Script.
	
	TODO	:
		* loading XML from localStorage does not currently work in IE.
		* Fix the Row Shading (every 2nd row should be highlighted, even after sorting)
		* Optimize the jQuery for very large accounts
	
	NOTES	:
		* Sample Client-side script launcher:
		javascript:var vScript={URLs:['http://crosstrigger.com/tw/v7/OverviewSorter.js','http://taktimer.net/scripts/dales/OverviewSorter.js'],id:'fnOverviewSorter',config:{},action:function(){win[vScript.id](vScript.config);},runOnce:true};var win=(window.frames.length>0)?window.main:window;win.$(win.document).ready(function(){var isLoaded=false;var ii=0;function fnEmbedScript(){if(isLoaded||(ii>=vScript.URLs.length)){return;}win.$.getScript(vScript.URLs[ii]+'?'+Math.round(Math.random()*1000000),function(){if(!isLoaded){isLoaded=true;win.setTimeout(function(a,b){vScript.action();},200);}});ii++;if(!isLoaded){win.setTimeout(function(a,b){fnEmbedScript();},3000);}}if(win[vScript.id]){if(!vScript.runOnce){vScript.action();}}else{fnEmbedScript();}});void(0);
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
	var theScript=new OverviewSorter(config);
	theScript.execute();
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* Class: OverviewSorter                                                    */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* This is basically a NameSpace to prevent cluttering the window variable  */
function OverviewSorter(config){
	try{
		var myself=this;
		
		/* Add any missing functionality */
		myself.ensureBrowserConsistency();

		/* ************** */
		/* CUSTOMIZE THIS */
		/* ************** */
		myself.name='Overview Sorter';
		myself.version=7.06;
		myself.minGameVersion=6.50;
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

OverviewSorter.prototype.runScript=function(){
	var myself=this;

	myself.valueArray=[];
	
	var overviewConfig = myself.defineOverviewConfig();		
	if(myself.win.game_data.screen == 'overview_villages'){
		var overview = (myself.twConfig.isPremium?myself.win.game_data.mode:'non-premium');
		myself.activeOverview = overviewConfig[overview];
	}

	if(typeof(myself.activeOverview) == 'undefined'){
		throw('The script can not be run on this Screen');
	}
	
	myself.injectCustomCSS();
	myself.injectCustomColumnHeaders();
	myself.injectSortingArrows();
	myself.extractSortableData();
}; /* OverviewSorter::runScript */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.onClick=function(myself,sender){
	myself.debug('CALL: OverviewSorter::onClick');

	if(sender.className.match(/\bEventActive\b/)){
		return;
	}

	/* Clear any highlighted sorting arrows */
	myself.win.$(myself.activeOverview.table + ' tr:eq(0) th div[class*="EventActive"]').each(function(i,e){
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
	myself.valueArray=myself.valueArray.sort(function(a,b){
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
	myself.win.$(myself.activeOverview.table + ' tr:gt(0)').remove();
	
	/* Insert the Sorted Table Rows */
	myself.win.$(myself.valueArray.map(function(value){return value[0];}).join('')).insertAfter(myself.win.$(myself.activeOverview.table + ' tr:eq(0)'));

	return false;
}; /* OverviewSorter::onClick */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.injectCustomCSS=function(){
	var myself=this;
	myself.debug('CALL: OverviewSorter::injectCustomCSS');

	myself.win.$('head').append('\
		<style>\
			div.clear{clear:both;vertical-align:bottom;}\
			div.text{float:left;}\
			div.sort{float:left;width:0.7em;}\
			div.asc{width:0;height:0;line-height:0;margin-top:.0em;border-top:0px solid;border-right:.3em solid rgb(222,211,185);border-bottom:.8em solid;border-left:.3em solid rgb(222,211,185);float:left;margin-left:0px;}\
			div.desc{width:0;height:0;margin-top:.2em;line-height:0;border-top:.8em solid ;border-left:.3em solid rgb(222,211,185);border-right:.3em solid rgb(222,211,185);border-bottom:0px solid;float:left;}\
			div.EventHover{border-top-color:#0082BE;border-bottom-color:#0082BE;}\
			div.EventActive{border-top-color:#C00;border-bottom-color:#C00;}\
			div.EventInactive{border-top-color:#fff;border-bottom-color:#fff;}\
		</style>\
	');
}; /* OverviewSorter::injectCustomCSS */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.injectCustomColumnHeaders=function(){
	var myself=this;
	myself.debug('CALL: OverviewSorter::injectCustomColumnHeaders');

	for(var ii=0; ii<myself.activeOverview.cols.length; ii++){
		if(typeof(myself.activeOverview.cols[ii]['custom']) != 'undefined'){
			myself.win.$('<th>' + myself.activeOverview.cols[ii].name + '</th>').insertBefore(myself.win.$(myself.activeOverview.table + ' tr:eq(0) th:eq(' + ii + ')'));
		
			myself.win.$(myself.activeOverview.table + ' tr:gt(0)').each(function(i,e){
				myself.win.$('<td></td>').insertBefore(myself.win.$(e).find('td:eq(' + ii + ')'));
			});
		}
	}
}; /* OverviewSorter::injectCustomColumnHeaders */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.injectSortingArrows=function(){
	var myself=this;
	myself.debug('CALL: OverviewSorter::injectSortingArrows');

	var colAdjust = 0;
	var length=myself.activeOverview.cols.length;	

	myself.win.$(myself.activeOverview.table + ' tr:eq(0) th').each(function(i,e){
		var srcHTML = '<div class="text">'+myself.win.$(e).html()+'</div>';
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

		myself.win.$(e).html('<div class="clear">'+srcHTML+'</div>');
		
		/* HACK: to get the onClick to work */
		myself.win.$('div[id*=SORT_]').each(function(i,e){
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

	myself.win.$(myself.activeOverview.table + ' tr:gt(0) td').each(function(i,e){
		var index = (i + colAdjust) % length;

		if((i > 0) && !index){
			myself.valueArray.push([srcHTML,rowData]);
			rowData={};
			itemCount=0;
		}
	
		srcHTML = myself.win.$(myself.win.$('<div></div>').html(myself.win.$(e.parentNode).clone())).html();
	
		while(!myself.activeOverview.cols[index].visible){
			colAdjust++;
			index = (i + colAdjust) % length;
		}

		/* Inject Custom Data */
		if(typeof(myself.activeOverview.cols[index]['custom']) != 'undefined'){
			cellIndex = myself.activeOverview.cols[index].custom[0];
			cellRegex = myself.activeOverview.cols[index].custom[1];
			myself.win.$(e).html('<div class="text">'+myself.win.$(e.parentNode).find('td:eq(' + cellIndex + ')').html().match(cellRegex)[1]+'</div>');
		}

		cellRegex = myself.activeOverview.cols[index].regex;
		rowData[myself.activeOverview.cols[index].name] = (cellRegex?myself.win.$(e).text().match(cellRegex).slice(1):[]);

		itemCount++;
	});

	if(itemCount>0){
		myself.valueArray.push([srcHTML,rowData]);
		rowData={};
		itemCount=0;
	}
}; /* OverviewSorter::extractSortableData */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.defineOverviewConfig=function(){
	var myself = this;
	
	return{
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
				{name:'notes',        regex:null,                                          desc:[],                                                         visible:myself.hasMinVersion(7.0)&&myself.twConfig.hasVillageNotes},
				{name:'village',      regex:/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,             desc:[['text'],['number',' ('],['number','|'],['number',') K']], visible:true},
				{name:'Headquarters', regex:null,                                          desc:[],                                                         visible:true},
				{name:'Barracks',     regex:null,                                          desc:[],                                                         visible:true},
				{name:'Stable',       regex:null,                                          desc:[],                                                         visible:true},
				{name:'Workshop',     regex:null,                                          desc:[],                                                         visible:true},
				{name:'Smithy',       regex:null,                                          desc:[],                                                         visible:true},
				{name:'Belief',       regex:null,                                          desc:[],                                                         visible:myself.twConfig.hasChurch},
				{name:'Farm',         regex:/(\d+)\s*\((\d+)\)/,                           desc:[['number'],['number','(',')']],                            visible:true},
				{name:'spear',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'sword',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'axe',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'archer',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:myself.twConfig.hasArchers},
				{name:'spy',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'light',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'marcher',      regex:/(\d+)/,                                       desc:[['number']],                                               visible:myself.twConfig.hasArchers},
				{name:'heavy',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'ram',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'catapult',     regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'knight',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:myself.twConfig.hasPaladin},
				{name:'snob',         regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'militia',      regex:/(\d+)/,                                       desc:[['number']],                                               visible:myself.hasMinVersion(7.0)&&myself.twConfig.hasMilitia},
				{name:'market',       regex:/(\d+)\/(\d+)/,                                desc:[['number'],['number','/']],                                visible:true}
			]
		},
		'prod':{
			'table':'#production_table',
			'cols':[
				{name:'Notes',        regex:null,                                          desc:[],                                                         visible:myself.hasMinVersion(7.0)&&myself.twConfig.hasVillageNotes},
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
				{name:'archer',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:myself.twConfig.hasArchers},
				{name:'spy',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'light',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'marcher',      regex:/(\d+)/,                                       desc:[['number']],                                               visible:myself.twConfig.hasArchers},
				{name:'heavy',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'ram',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'catapult',     regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'knight',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:myself.twConfig.hasPaladin},
				{name:'snob',         regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'militia',      regex:/(\d+)/,                                       desc:[['number']],                                               visible:myself.hasMinVersion(7.0)&&myself.twConfig.hasMilitia},
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
				{name:'archer',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:myself.twConfig.hasArchers},
				{name:'spy',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'light',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'marcher',      regex:/(\d+)/,                                       desc:[['number']],                                               visible:myself.twConfig.hasArchers},
				{name:'heavy',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'ram',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'catapult',     regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'knight',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:myself.twConfig.hasPaladin},
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
				{name:'origin',       regex:/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,             desc:[['text'],['number',' ('],['number','|'],['number',') K']], visible:myself.hasMinVersion(7.0)},
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
				{name:'demolish',     regex:null,                                          desc:[],                                                         visible:myself.hasMinVersion(7.0)},
				{name:'village',      regex:/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,             desc:[['text'],['number',' ('],['number','|'],['number',') K']], visible:true},
				{name:'points',       regex:/\b(\d*\.?\d+)\b/,                             desc:[['number']],                                               visible:true},
				{name:'main',         regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'barracks',     regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'stable',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'garage',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'church',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:myself.twConfig.hasChurch},
				{name:'church_f',     regex:/(\d+)/,                                       desc:[['number']],                                               visible:myself.twConfig.hasChurch},
				{name:'snob',         regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'smith',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'place',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'statue',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:myself.twConfig.hasPaladin},
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
				{name:'activate',     regex:null,                                          desc:[],                                                         visible:myself.hasMinVersion(7.0)},
				{name:'village',      regex:/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,             desc:[['text'],['number',' ('],['number','|'],['number',') K']], visible:true},
				{name:'points',       regex:/\b(\d*\.?\d+)\b/,                             desc:[['number']],                                               visible:true},
				{name:'spear',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'sword',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'axe',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'archer',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:myself.twConfig.hasArchers},
				{name:'spy',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'light',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'marcher',      regex:/(\d+)/,                                       desc:[['number']],                                               visible:myself.twConfig.hasArchers},
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
				{name:'points',       regex:/\b(\d*\.?\d+)\b/,                             desc:[['number']],                                               visible:myself.hasMinVersion(7.0)},
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
};
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.handleError=function(objError){
	var myself=this;

	/* >>> CUSTOM HANDLING CAN OVERRIDE THE FOLLOWING <<< */

	var errMsg=String(objError.message||objError||'');
	if(errMsg){
		this.print('Error: ' + errMsg);
		alert('Error: ' + errMsg);
	}
}; /* OverviewSorter::handleError */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.print=function(msg,id){
	var myself=this;
	if(myself.win.$('#' + myself.debugID).length <= 0){
		myself.win.$('body').append('<div id="' + myself.debugID + '"></div>');
	}
	
	myself.win.$('#' + myself.debugID).append('<span id="'+((typeof(id)=='undefined')?'':id)+'">'+msg+'</span><br/>');
}; /* OverviewSorter::print */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.debug=function(msg){
	var myself=this;
	if((typeof(myself.debugEnabled) != 'undefined') && myself.debugEnabled){
		myself.print(msg);
	}
}; /* OverviewSorter::debug */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* TODO: possibly add a maxVersion parameter */
OverviewSorter.prototype.hasMinVersion=function(minVersion){
	var myself=this;
	return (myself.twConfig.gameVersion >= minVersion);
}; /* OverviewSorter::hasMinVersion */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.printVersion=function(){
	var myself=this;

	if(myself.win.$('#' + myself.debugID + '_done').length > 0){
		return;
	}

	myself.print('<span style="color:red;">Provide the following info when asking for help:</span>');
	myself.print("=========================");
	myself.print(myself.author.name + "'s " + myself.name + ": v" + myself.version.toFixed(2));
	myself.print("(based on SlowTarget's original Sort script)");
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
}; /* OverviewSorter::printVersion */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.ensureBrowserConsistency=function(){
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
}; /* OverviewSorter::ensureBrowserConsistency */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.setup=function(){
	var myself=this;
	myself.debug('CALL: OverviewSorter::setup');

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
}; /* OverviewSorter::setup */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.execute=function(){
	try{
		var myself=this;
		myself.debug('CALL: OverviewSorter::execute');

		if(myself.win.$('#' + myself.debugID + '_done').length > 0){
			throw('This script has already been executed');
		}

		myself.runScript();
		
		myself.print('<br/>execution completed',myself.debugID + '_done');
	}
	catch(objError){
		this.handleError(objError);
	}
}; /* OverviewSorter::execute */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

OverviewSorter.prototype.asString=function(AObj){
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
}; /* OverviewSorter::asString */
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
/* Class: TWConfig */
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
		if(!xml){
			return false;
		}
		
		if(window.ActiveXObject){
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

	function fnAjax(url,method,params,type){
		var error = null;
		var payload = null;

		$.ajax({
			'async':false,
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
	
	/* NOTE: this will be slow the very first time the script is ever run as it downloads several remote XML files and caches them in local storage */
	myself.worldConfig=$(parseXML(cache.fetch('worldConfig'))||cache.store('worldConfig',xmlToStr(fnAjax('/interface.php','GET',{'func':'get_config'},'xml'))))[window.ActiveXObject?'find':'filter']('config');
	myself.unitConfig=$(parseXML(cache.fetch('unitConfig'))||cache.store('unitConfig',xmlToStr(fnAjax('/interface.php','GET',{'func':'get_unit_info'},'xml'))))[window.ActiveXObject?'find':'filter']('config');
	myself.buildingConfig=$(parseXML(cache.fetch('buildingConfig'))||cache.store('buildingConfig',xmlToStr(fnAjax('/interface.php','GET',{'func':'get_building_info'},'xml'))))[window.ActiveXObject?'find':'filter']('config');
	
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

/*
fnOverviewSorter({debugEnabled:true});
void(0);
*/