/* 
	Author	: Dale McKay
	Email	: dalesmckay@gmail.com
	Purpose	: To provide a helper Class for accessing information on the Attack Report Detail Screen.
	Credit	: 
	Notes	: Must be run from an Attack Report Detail Screen.

	Todo	:
		* Belief
		* Battle Strength
		* Important Information
		* ODA/ODD/ODT calculations
		* Try to make it language independant (currently uses string comparison on: rams,catapults,Loyalty)
	
	Example:

javascript:
	var $=(window.main||window).$;
	$.getScript(
		'http://dl.dropbox.com/u/25377948/twscripts/jquery.tw.reporthelper.js',
		function(){
			alert($.twReport().asString());
			alert($.twReport().asString($.twReport().attacker.village));
			alert($.twReport().defender.resources.wood);
		}
	);
	
	void(0);
slow:
javascript:
    var $=(window.main||window).$;
	$.getScript(
		'http://dl.dropbox.com/u/1375102/TribalWars/scripts/trunk/framework/jquery.tw.reporthelper.js',
		function(){
			$('body').append('<pre>'+$.twReport().asString()+'</pre>');
		}
	);
	void(0);
____________________________________________________________

Copyright (C) 2011 Dale McKay, all rights reserved
version 1.0, 23 February 2011
version 1.01 17 August 2011 Jason Farmer - fix to morale for tw7.3
This software is provided 'as-is', without any express or implied warranty. In no event will the author be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:
The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
This notice may not be removed or altered from any source distribution.
____________________________________________________________

*/

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// $.twReport()
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
(function($){	
	var win=(window.main||window);
	
	// Requires Translation for relevant language.
	var lang={
		rams:'rams:',
		catapults:'catapults:',
		loyalty:'Loyalty:'
	};

	// ........................................................................

	function fnSumArray(a){var sum=0;(a||[]).forEach(function(e){sum+=e;});return sum;}
	
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

	function fnParseAttackReport(){
		// List of Available Units.
		var units=[];
		// Try defender first, since it also has militia unit (if available).
		$('#attack_info_def_units tr:eq(0) td img').each(function(i,e){units.push(e.src.match(/unit\_(\w+)\.png/i)[1]);});
		if(units.length<=0){
			$('#attack_info_att_units tr:eq(0) td img').each(function(i,e){units.push(e.src.match(/unit\_(\w+)\.png/i)[1]);});
		}

		// Attacker Details.
		report.attacker={
			id:(($('#attack_info_att th a:eq(0)').attr('href')||'').match(/id\=(\d+)/i)||[undefined,undefined])[1],
			name:($('#attack_info_att th a:eq(0)').text()||$('#attack_info_att th:eq(1)').text()),
			village:{
				id:$('#attack_info_att td a:eq(0)').attr('href').match(/id\=(\d+)/i)[1],
				coord:$('#attack_info_att td a:eq(0)').text().replace(/.*\((\d+\|\d+)\).*/,'$1'),
				name:$('#attack_info_att td a:eq(0)').text(),
				continent:($('#attack_info_att td a:eq(0)').text().match(/.*(?:k\d+)*(k\d+)/i)||[undefined,undefined])[1]
			},
			luck:$('#attack_luck b').text(),
			//morale:($('#attack_info_att').prev('h4').text().replace(/(.*\:)(.*)/,'$2')||undefined), <-- wasn't working on 7.3
			morale:($('#attack_luck').next('h4').text().replace(/(.*\:)(.*)/,'$2')||undefined), // <-- replacement morale code for 7.3
			haul:{wood:0,clay:0,iron:0,total:0,capacity:0,asArray:[0,0,0,0,0]},
			ramDamage:$('#attack_results tr:has(th:contains("'+lang.rams+'")) td').text().match(/\d+/g),
			catDamage:$('#attack_results tr:has(th:contains("'+lang.catapults+'")) td').text().match(/\d+/g),
			catTarget:($('#attack_results tr:has(th:contains("'+lang.catapults+'")) td').text().match(/The\s+(.+)\s+has/i)||[undefined,undefined])[1],
			units:{original:{asArray:[]},losses:{asArray:[]},remaining:{asArray:[]}},
			stats:{lossRate:0,survivalRate:0,haulRate:0}
		};

		// Defender Details.
		report.defender={
			id:(($('#attack_info_def th a:eq(0)').attr('href')||'').match(/id\=(\d+)/i)||[undefined,undefined])[1],
			name:($('#attack_info_def th a:eq(0)').text()||$('#attack_info_def th:eq(1)').text()),
			village:{
				id:$('#attack_info_def td a:eq(0)').attr('href').match(/id\=(\d+)/i)[1],
				coord:$('#attack_info_def td a:eq(0)').text().replace(/.*\((\d+\|\d+)\).*/,'$1'),
				name:$('#attack_info_def td a:eq(0)').text(),
				continent:$('#attack_info_def td a:eq(0)').text().match(/.*(?:k\d+)*(k\d+)/i)[1],
				isClear:undefined
			},
			resources:undefined,
			loyalty:($('#attack_results tr:has(th:contains("'+lang.loyalty+'")) td').text().match(/\-*\d+/g)||undefined),
			units:undefined,
			buildings:undefined,
			stats:{lossRate:undefined,survivalRate:undefined,resourceRate:undefined}
		};

		// Additional Attacker Details.
		$('#attack_info_att_units tr:eq(1) td:gt(0)').each(function(i,e){report.attacker.units.original.asArray.push(report.attacker.units.original[units[i]]=parseInt(e.innerHTML||'0',10));});
		$('#attack_info_att_units tr:eq(2) td:gt(0)').each(function(i,e){report.attacker.units.losses.asArray.push(report.attacker.units.losses[units[i]]=parseInt(e.innerHTML||'0',10));});

		// Calculate Attacker Remaining Troops.
		for(var key in report.attacker.units.original){
			if(report.attacker.units.original.hasOwnProperty(key)){
				if(key!='asArray'){
					report.attacker.units.remaining.asArray.push(report.attacker.units.remaining[key]=report.attacker.units.original[key]-report.attacker.units.losses[key]);
				}
			}
		}
	
		// Extract Attacker Haul.
		var resources=$.trim($('#attack_results td:lt(2)').text().replace(/\./g,'').replace('/',' '));
		resources=(resources.match(/[^\d|^\s]/))?[0,0,0,0,0]:resources.split(' ');
		$('#attack_results td:eq(0) img').each(function(i,e){
			if(e.src.match(/holz\.png/i)){
				report.attacker.haul.wood=parseInt(resources[i]||'0',10);
			}
			else if(e.src.match(/lehm\.png/i)){
				report.attacker.haul.clay=parseInt(resources[i]||'0',10);
			}
			else if(e.src.match(/eisen\.png/i)){
				report.attacker.haul.iron=parseInt(resources[i]||'0',10);
			}
		});
		report.attacker.haul.total=parseInt(resources[resources.length-2]||'0',10);
		report.attacker.haul.capacity=parseInt(resources[resources.length-1]||'0',10);
		report.attacker.haul.asArray=[
			report.attacker.haul.wood,
			report.attacker.haul.clay,
			report.attacker.haul.iron,
			report.attacker.haul.total,
			report.attacker.haul.capacity
		];
		
		// Calculate Attacker Stats.
		report.attacker.stats.lossRate=fnSumArray(report.attacker.units.losses.asArray)/(fnSumArray(report.attacker.units.original.asArray)||1);
		report.attacker.stats.survivalRate=fnSumArray(report.attacker.units.remaining.asArray)/(fnSumArray(report.attacker.units.original.asArray)||1);
		report.attacker.stats.haulRate=report.attacker.haul.total/(report.attacker.haul.capacity||1);

		// Extract Defender Resources.
		resources=$.trim($('#attack_spy tr:eq(0) td').text().replace(/\./g,'')).split(' ');
		if(resources){
			resources=resources.map(function(e){return parseInt(e||'0',10);});

			report.defender.resources={};
			report.defender.resources.asArray=[
				report.defender.resources.wood=resources[0],
				report.defender.resources.clay=resources[1],
				report.defender.resources.iron=resources[2],
				report.defender.resources.total=fnSumArray(resources)
			];
		}
		
		// Additional Defender Details.
		if($('#attack_info_def_units tr:eq(1) td:gt(0)').length>0){
			// Units original/losses
			report.defender.units={original:{asArray:[]},losses:{asArray:[]},remaining:{asArray:[]},away:{asArray:[]},refugee:[]};
			$('#attack_info_def_units tr:eq(1) td:gt(0)').each(function(i,e){report.defender.units.original.asArray.push(report.defender.units.original[units[i]]=parseInt(e.innerHTML||'0',10));});
			$('#attack_info_def_units tr:eq(2) td:gt(0)').each(function(i,e){report.defender.units.losses.asArray.push(report.defender.units.losses[units[i]]=parseInt(e.innerHTML||'0',10));});

			// Calculate Defender Remaining Troops.
			for(var key in report.defender.units.original){
				if(report.defender.units.original.hasOwnProperty(key)){
					if(key!='asArray'){
						report.defender.units.remaining.asArray.push(report.defender.units.remaining[key]=report.defender.units.original[key]-report.defender.units.losses[key]);
					}
				}
			}

			// Units in transit.
			$('table[class*="vis"]:has(tr th img[src*="unit_snob"]):last tr td').each(function(i,e){report.defender.units.away.asArray.push(report.defender.units.away[units[i]]=parseInt(e.innerHTML||'0',10));});

		 	// Units in other villages (only available after ennoblement).
			$('#attack_away_units tr:gt(0)').each(function(row,eleRow){
				var village={
					id:$(eleRow).find('td:eq(0) a:eq(0)').attr('href').match(/id\=(\d+)/i)[1],
					coord:$(eleRow).find('td:eq(0) a:eq(0)').text().replace(/.*\((\d+\|\d+)\).*/,'$1'),
					name:$(eleRow).find('td:eq(0) a:eq(0)').text(),
					continent:$(eleRow).find('td:eq(0) a:eq(0)').text().match(/.*(?:k\d+)*(k\d+)/i)[1],
					units:{asArray:[]}
				};
			
				$(eleRow).find('td:gt(0)').each(function(col,eleCol){
					village.units.asArray.push(village.units[units[col]]=parseInt(eleCol.innerHTML||'0',10));
				});
		
				report.defender.units.refugee.push(village);
			});

			// Calculate Defender Stats.
			report.defender.stats.lossRate=fnSumArray(report.defender.units.losses.asArray)/(fnSumArray(report.defender.units.original.asArray)||1);
			report.defender.stats.survivalRate=fnSumArray(report.defender.units.remaining.asArray)/(fnSumArray(report.defender.units.original.asArray)||1);
			if(report.defender.resource!==undefined){
				report.defender.stats.resourceRate=report.defender.resources.total/(report.attacker.haul.capacity||1);
			}

			// Is the Dender Cleared of Troops.
			report.defender.village.isClear=((report.defender.loyalty&&(report.defender.loyalty[1]<=0))||((report.defender.units.original.asArray.length>0)&&(fnSumArray(report.defender.units.remaining.asArray)<=0)));
	 	}

		// Defender Building Levels.
		var buildings=$('#attack_spy tr:eq(1) td:first').html();
		if(buildings){
			buildings=buildings.match(/\w+\s\w*\s*<b>\(\w+\s\d+\)/ig);
			if(buildings){
				report.defender.buildings={};
				buildings.forEach(function(e,i,a){
					report.defender.buildings[$.trim(e.match(/[a-z]+\s*[a-z]*\s/i))]=parseInt(e.match(/\d+/),10);
				});
			}
		}
		
		// Distance between villages.
		var source=report.defender.village.coord.split('|').map(function(e){return parseInt(e||'0',10);});
		var target=report.attacker.village.coord.split('|').map(function(e){return parseInt(e||'0',10);});
		report.distance=Math.sqrt(Math.pow(target[0]-source[0],2)+Math.pow(target[1]-source[1],2)).toFixed(2);
	}	

	// ........................................................................

	// Report Summary.
	var report={
		id:win.location.search.match(/view\=(\d+)/i)[1],
		subject:$.trim($('#labelText').text()),
		sent:$.trim($('#labelText').closest('tr').next('tr').find('td:gt(0)').text()),
		isAttack:($('#attack_info_att_units').length>0),
		asString:fnAsString,
		sumArray:fnSumArray
	};
	
	// Forwarding Detail.
	if($('#labelText').closest('tr').next().next().next().html()){
		report.forwarded={
			on:$.trim($('#labelText').closest('tr').next().next().find('td:gt(0)').text())||undefined,
			by:{
				id:($.trim($('#labelText').closest('tr').next().next().next().find('td:gt(0) a:eq(0)').attr('href')||'').match(/id\=(\d+)/i)||[undefined,undefined])[1],
				name:$.trim($('#labelText').closest('tr').next().next().next().find('td:gt(0) a:eq(0)').text())||undefined
			}
		};
	}
	
	// Process different report types here.
	if(report.isAttack){
		fnParseAttackReport();
	}

	// Append to the jQuery Namespace.
	$.extend({
		'twReport':function(){return report;}
	});
})((window.main||window).jQuery);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
