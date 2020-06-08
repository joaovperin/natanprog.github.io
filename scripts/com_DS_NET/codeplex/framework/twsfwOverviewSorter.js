/* 
	Author	: Dale McKay
	Email	: dalesmckay@gmail.com
	Credit	: based on SlowTargets original Sorting Script.
	
	Todo	:
		* Fix the Row Shading (every 2nd row should be highlighted, even after sorting)
		* Optimize the jQuery for very large accounts
	
	Notes	:
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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Class: OverviewSorter
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
function OverviewSorter(){
	var myself=this;
	
	var script={
		name:'Overview Sorter Script',
		version:7.10,
		minGameVersion:6.50,
		author:{
			name:'dalesmckay',
			email:'dalesmckay@gmail.com'
		},
		credit:'(Complete rewrite of the Sort Script by: SlowTarget)',
		runOnce:true
	};
	
	function fnScript(){
		// Use 'this' to get correct context.
		this.execute();
	}
	
	return $.extend({id:'OverviewSorter',execute:function(fwExt){fnScript.call($.extend({},myself,script,fwExt));}},script);
} // OverviewSorter::constructor
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

OverviewSorter.prototype.execute=function(){
	var myself=this;
	var win=(window.main||window),$=win.$;
	myself.valueArray=[];
	
	$.twUtil().debug('CALL: '+myself.id+'::execute');

	var overviewConfig = myself.defineOverviewConfig();		
	if(win.game_data.screen == 'overview_villages'){
		var overview = ($.twConfig().isPremium?win.game_data.mode:'non-premium');
		myself.activeOverview = overviewConfig[overview];
	}

	if(typeof(myself.activeOverview) == 'undefined'){
		throw('The script can not be run on this Screen');
	}
	
	myself.injectCustomCSS();
	myself.injectCustomColumnHeaders();
	myself.injectSortingArrows();
	myself.extractSortableData();
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

OverviewSorter.prototype.extractSortableData=function(){
	var myself=this;
	var win=(window.main||window),$=win.$;
	$.twUtil().debug('CALL: '+myself.id+'::extractSortableData');

	var colAdjust = 0;
	var srcHTML = '';
	var itemCount = 0;
	var cellIndex;
	var cellRegex;
	var rowData = {};
	var length = myself.activeOverview.cols.length;

	$(myself.activeOverview.table + ' tr:gt(0) td').each(function(i,e){
		var index = (i + colAdjust) % length;

		if((i > 0) && !index){
			myself.valueArray.push([srcHTML,rowData]);
			rowData={};
			itemCount=0;
		}
	
		srcHTML = $($('<div></div>').html($(e.parentNode).clone())).html();
	
		while(!myself.activeOverview.cols[index].visible){
			colAdjust++;
			index = (i + colAdjust) % length;
		}

		// Inject Custom Data.
		if(typeof(myself.activeOverview.cols[index]['custom']) != 'undefined'){
			cellIndex = myself.activeOverview.cols[index].custom[0];
			cellRegex = myself.activeOverview.cols[index].custom[1];
			$(e).html('<div class="text">'+$(e.parentNode).find('td:eq(' + cellIndex + ')').html().match(cellRegex)[1]+'</div>');
		}

		cellRegex = myself.activeOverview.cols[index].regex;
		rowData[myself.activeOverview.cols[index].name] = (cellRegex?$(e).text().match(cellRegex).slice(1):[]);

		itemCount++;
	});

	if(itemCount>0){
		myself.valueArray.push([srcHTML,rowData]);
		rowData={};
		itemCount=0;
	}
}; // OverviewSorter::extractSortableData
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

OverviewSorter.prototype.injectCustomColumnHeaders=function(){
	var myself=this;
	var win=(window.main||window),$=win.$;
	$.twUtil().debug('CALL: '+myself.id+'::injectCustomColumnHeaders');

	for(var ii=0; ii<myself.activeOverview.cols.length; ii++){
		if(typeof(myself.activeOverview.cols[ii]['custom']) != 'undefined'){
			$('<th>' + myself.activeOverview.cols[ii].name + '</th>').insertBefore($(myself.activeOverview.table + ' tr:eq(0) th:eq(' + ii + ')'));
		
			$(myself.activeOverview.table + ' tr:gt(0)').each(function(i,e){
				$('<td></td>').insertBefore($(e).find('td:eq(' + ii + ')'));
			});
		}
	}
}; // OverviewSorter::injectCustomColumnHeaders
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

OverviewSorter.prototype.injectCustomCSS=function(){
	var myself=this;
	var win=(window.main||window),$=win.$;
	$.twUtil().debug('CALL: '+myself.id+'::injectCustomCSS');

	$('head').append('\
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
}; // OverviewSorter::injectCustomCSS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

OverviewSorter.prototype.injectSortingArrows=function(){
	var myself=this;
	var win=(window.main||window),$=win.$;
	$.twUtil().debug('CALL: '+myself.id+'::injectSortingArrows');

	var colAdjust = 0;
	var length=myself.activeOverview.cols.length;	

	$(myself.activeOverview.table + ' tr:eq(0) th').each(function(i,e){
		var srcHTML = '<div class="text">'+$(e).html()+'</div>';
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
						'<div class="asc EventInactive" id="SORT_'+myself.activeOverview.cols[index].name+'_'+ii+'_asc_'+myself.activeOverview.cols[index].desc[ii][0]+'"></div>' +
						'<div class="desc EventInactive" id="SORT_'+myself.activeOverview.cols[index].name+'_'+ii+'_desc_'+myself.activeOverview.cols[index].desc[ii][0]+'"></div>' +
					'</div>';
			}

			if((myself.activeOverview.cols[index].desc[ii].length>2)&&myself.activeOverview.cols[index].desc[ii][2]){
				srcHTML += '<div class="text">' + myself.activeOverview.cols[index].desc[ii][2] + '</div>';
			}
		}

		$(e).html('<div class="clear">'+srcHTML+'</div>');
		
		// HACK: to get the onClick to work.
		$('div[id*="SORT_"]').click(function(e){myself.sortClick.call(myself,[e]);});
	});
}; // OverviewSorter::injectSortingArrows
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

OverviewSorter.prototype.sortClick=function(e){
	var myself=this;
	var win=(window.main||window),$=win.$;
	$.twUtil().debug('CALL: '+myself.id+'::sortClick');

	var evt=(win.event||e);
	var sender=(evt.srcElement||evt);
	if(sender.className.match(/\bEventActive\b/)){
		return;
	}

	// Clear any highlighted sorting arrows.
	$(myself.activeOverview.table + ' tr:eq(0) th div[class*="EventActive"]').each(function(i,e){
		e.className = e.className.replace(/EventActive/i,'EventInactive');
	});

	// Highlight the active sorting arrow.
	sender.className = sender.className.replace(/EventInactive/i,'EventActive');

	// Extract the detail of the column to be sorted.
	var sortDetail = sender.id.match(/SORT\_([\w|\W]+)\_(\d+)\_(\w+)\_(\w+)$/i);
	var fieldName  = sortDetail[1];
	var fieldIndex = sortDetail[2];
	var sortDir = (sortDetail[3]=='asc')?1:-1;
	var fieldType = sortDetail[4];

	function fnAdjustNumber(value){return parseInt(value.toString().replace('.','','g')||'0',10);}
	
	// Sort the active column.
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

	// Clear the Table Rows (except the header).
	$(myself.activeOverview.table + ' tr:gt(0)').remove();
	
	// Insert the Sorted Table Rows.
	$(myself.valueArray.map(function(value){return value[0];}).join('')).insertAfter($(myself.activeOverview.table + ' tr:eq(0)'));

	return false;
}; // OverviewSorter::sortClick
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

OverviewSorter.prototype.defineOverviewConfig=function(){
	var myself = this;
	var win=(window.main||window),$=win.$;
	$.twUtil().debug('CALL: '+myself.id+'::defineOverviewConfig');
	
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
				{name:'notes',        regex:null,                                          desc:[],                                                         visible:$.twConfig().hasMinVersion(7.0)&&$.twConfig().hasVillageNotes},
				{name:'village',      regex:/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,             desc:[['text'],['number',' ('],['number','|'],['number',') K']], visible:true},
				{name:'Headquarters', regex:null,                                          desc:[],                                                         visible:true},
				{name:'Barracks',     regex:null,                                          desc:[],                                                         visible:true},
				{name:'Stable',       regex:null,                                          desc:[],                                                         visible:true},
				{name:'Workshop',     regex:null,                                          desc:[],                                                         visible:true},
				{name:'Smithy',       regex:null,                                          desc:[],                                                         visible:true},
				{name:'Belief',       regex:null,                                          desc:[],                                                         visible:$.twConfig().hasChurch},
				{name:'Farm',         regex:/(\d+)\s*\((\d+)\)/,                           desc:[['number'],['number','(',')']],                            visible:true},
				{name:'spear',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'sword',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'axe',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'archer',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:$.twConfig().hasArchers},
				{name:'spy',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'light',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'marcher',      regex:/(\d+)/,                                       desc:[['number']],                                               visible:$.twConfig().hasArchers},
				{name:'heavy',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'ram',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'catapult',     regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'knight',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:$.twConfig().hasPaladin},
				{name:'snob',         regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'militia',      regex:/(\d+)/,                                       desc:[['number']],                                               visible:$.twConfig().hasMinVersion(7.0)&&$.twConfig().hasMilitia},
				{name:'market',       regex:/(\d+)\/(\d+)/,                                desc:[['number'],['number','/']],                                visible:true}
			]
		},
		'prod':{
			'table':'#production_table',
			'cols':[
				{name:'Notes',        regex:null,                                          desc:[],                                                         visible:$.twConfig().hasMinVersion(7.0)&&$.twConfig().hasVillageNotes},
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
				{name:'archer',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:$.twConfig().hasArchers},
				{name:'spy',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'light',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'marcher',      regex:/(\d+)/,                                       desc:[['number']],                                               visible:$.twConfig().hasArchers},
				{name:'heavy',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'ram',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'catapult',     regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'knight',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:$.twConfig().hasPaladin},
				{name:'snob',         regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'militia',      regex:/(\d+)/,                                       desc:[['number']],                                               visible:$.twConfig().hasMinVersion(7.0)&&$.twConfig().hasMilitia},
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
				{name:'archer',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:$.twConfig().hasArchers},
				{name:'spy',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'light',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'marcher',      regex:/(\d+)/,                                       desc:[['number']],                                               visible:$.twConfig().hasArchers},
				{name:'heavy',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'ram',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'catapult',     regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'knight',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:$.twConfig().hasPaladin},
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
				{name:'origin',       regex:/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,             desc:[['text'],['number',' ('],['number','|'],['number',') K']], visible:$.twConfig().hasMinVersion(7.0)},
*/
				{name:'player',       regex:/([.\s\S\w\W\d\D]*)/,                          desc:[['text']],                                                 visible:true},
				{name:'arrival time', regex:/([.\s\S\w\W\d\D]*)/,                          desc:[['text']],                                                 visible:true},
				
				// NOTE: produces an inaccurate sort result since hours are not zero padded (eg.    6:00:00 > 59:00:00)
				{name:'arrival in',   regex:/([.\s\S\w\W\d\D]*)/,                          desc:[['text']],                                                 visible:true},
				{name:'req support',  regex:null,                                          desc:[],                                                         visible:true}
			]
		},
		'buildings':{
			'table':'#buildings_table',
			'cols':[
				{name:'construct',    regex:null,                                          desc:[],                                                         visible:true},
				{name:'demolish',     regex:null,                                          desc:[],                                                         visible:$.twConfig().hasMinVersion(7.0)},
				{name:'village',      regex:/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,             desc:[['text'],['number',' ('],['number','|'],['number',') K']], visible:true},
				{name:'points',       regex:/\b(\d*\.?\d+)\b/,                             desc:[['number']],                                               visible:true},
				{name:'main',         regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'barracks',     regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'stable',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'garage',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'church',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:$.twConfig().hasChurch},
				{name:'church_f',     regex:/(\d+)/,                                       desc:[['number']],                                               visible:$.twConfig().hasChurch},
				{name:'snob',         regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'smith',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'place',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'statue',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:$.twConfig().hasPaladin},
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
				{name:'activate',     regex:null,                                          desc:[],                                                         visible:$.twConfig().hasMinVersion(7.0)},
				{name:'village',      regex:/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,             desc:[['text'],['number',' ('],['number','|'],['number',') K']], visible:true},
				{name:'points',       regex:/\b(\d*\.?\d+)\b/,                             desc:[['number']],                                               visible:true},
				{name:'spear',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'sword',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'axe',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'archer',       regex:/(\d+)/,                                       desc:[['number']],                                               visible:$.twConfig().hasArchers},
				{name:'spy',          regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'light',        regex:/(\d+)/,                                       desc:[['number']],                                               visible:true},
				{name:'marcher',      regex:/(\d+)/,                                       desc:[['number']],                                               visible:$.twConfig().hasArchers},
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
				{name:'points',       regex:/\b(\d*\.?\d+)\b/,                             desc:[['number']],                                               visible:$.twConfig().hasMinVersion(7.0)},
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
}; // OverviewSorter::defineOverviewConfig
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
