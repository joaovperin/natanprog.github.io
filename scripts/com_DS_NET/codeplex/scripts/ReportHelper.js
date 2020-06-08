/* 
	Author	: Dale McKay
	Email	: dalesmckay@gmail.com
	
	TODO:
		* Belief
		* Battle Strength
		* Catapult Target
		* Important Information
		* Check defender.isCleared - should we use outside troops?
		* ODA/ODD/ODT calculations
		* Check troops outside AND troops in other multiple villages (after ennoblement)
		* Try to make it language independant (currently uses string comparison on: rams,catapults,Loyalty)
		* Identify UnKnown Haul/Resources/Troops/etc... (rather than display zero)
	
	NOTE	:
		* Use the following Client-side script launcher


javascript:

var win=(window.frames.length>0)?window.main:window;
win.$.getScript('http://crosstrigger.com/tw/v7/helperObj/report_helper.js',function(){fnExecuteScript();});

function fnExecuteScript(){
	var report=fnCreateReportHelper();
	alert(report.asString());
	alert('Attacker Name: ' + report.attacker.name);
}

void(0);



____________________________________________________________

Copyright (C) 2011 Dale McKay, all rights reserved
version 1.0, 23 February 2011

This software is provided 'as-is', without any express or implied warranty. In no event will the author be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:
The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
This notice may not be removed or altered from any source distribution.
____________________________________________________________

*/
/*
javascript:
*/

function fnCreateReportHelper(config){
	return new ReportHelper;
}

function ReportHelper(){	
	var myself=this;
				
	var win=(window.frames.length>0)?window.main:window;

	function fnSumArray(a){var sum=0;(a||[]).forEach(function(e){sum+=e;});return sum;}

	/* List of Available Units */
	var units=[];
	/* Try defender first, since it also has militia unit (if available) */
	win.$('#attack_info_def_units tr:eq(0) td img').each(function(i,e){units.push(e.src.match(/unit\_(\w+)\.png/i)[1]);});
	if(units.length<=0){
		win.$('#attack_info_att_units tr:eq(0) td img').each(function(i,e){units.push(e.src.match(/unit\_(\w+)\.png/i)[1]);});
	}

	/* Attacker Details */
	myself.attacker={
		id:win.$('#attack_info_att th a:eq(0)')[0].href.match(/id\=(\d+)/i)[1],
		name:win.$('#attack_info_att th a:eq(0)').text(),
		villageID:win.$('#attack_info_att td a:eq(0)')[0].href.match(/id\=(\d+)/i)[1],
		villageName:win.$('#attack_info_att td a:eq(0)').text(),
		villageK:(win.$('#attack_info_att td a:eq(0)').text().match(/.*(?:k\d+)*(k\d+)/i)||[null,'N/A'])[1],
		coord:win.$('#attack_info_att td a:eq(0)').text().replace(/.*\((\d+\|\d+)\).*/,'$1'),
		luck:win.$('#attack_luck b').text(),
		morale:win.$('#attack_info_att').prev('h4').text().replace(/(.*\:)(.*)/,'$2'),
		haul:{wood:0,clay:0,iron:0,total:0,capacity:0},
		haulArr:[0,0,0,0,0],
		ramDamage:win.$("#attack_results tr:has(th:contains('rams:')) td").text().match(/\d+/g),
		catDamage:win.$("#attack_results tr:has(th:contains('catapults:')) td").text().match(/\d+/g),
		units:{originalArr:[],original:{},lossesArr:[],losses:{},remainingArr:[],remaining:{}},
		stats:{lossRate:0,survivalRate:0,haulRate:0}
	};

	/* Defender Details */
	myself.defender={
		id:win.$('#attack_info_def th a:eq(0)')[0].href.match(/id\=(\d+)/i)[1],
		name:win.$('#attack_info_def th a:eq(0)').text(),
		villageID:win.$('#attack_info_def td a:eq(0)')[0].href.match(/id\=(\d+)/i)[1],
		villageName:win.$('#attack_info_def td a:eq(0)').text(),
		villageK:win.$('#attack_info_def td a:eq(0)').text().match(/.*(?:k\d+)*(k\d+)/i)[1],
		coord:win.$('#attack_info_def td a:eq(0)').text().replace(/.*\((\d+\|\d+)\).*/,'$1'),
		resources:{wood:0,clay:0,iron:0,total:0},
		resourcesArr:[0,0,0,0],
		loyalty:win.$("#attack_results tr:has(th:contains('Loyalty:')) td").text().match(/\-*\d+/g),
		units:{originalArr:[],original:{},lossesArr:[],losses:{},remainingArr:[],remaining:{},awayArr:[],away:{},},		
		buildings:{},
		stats:{lossRate:0,survivalRate:0},
		isCleared:function(){return((this.loyalty&&(this.loyalty[1]<=0))||((this.units.originalArr.length>0)&&(fnSumArray(this.units.remainingArr)<=0)));}
	};

	/* Additional Attacker Details */
	win.$('#attack_info_att_units tr:eq(1) td:gt(0)').each(function(i,e){myself.attacker.units.originalArr.push(myself.attacker.units.original[units[i]]=parseInt(e.innerHTML||'0',10));});
	win.$('#attack_info_att_units tr:eq(2) td:gt(0)').each(function(i,e){myself.attacker.units.lossesArr.push(myself.attacker.units.losses[units[i]]=parseInt(e.innerHTML||'0',10));});

	/* Calculate Attacker Remaining Troops */
	for(var key in myself.attacker.units.original){
		if(myself.attacker.units.original.hasOwnProperty(key)){
			myself.attacker.units.remainingArr.push(myself.attacker.units.remaining[key]=myself.attacker.units.original[key]-myself.attacker.units.losses[key]);
		}
	}
	
	/* Extract Attacker Haul */
	var res=win.$.trim(win.$('#attack_results td:lt(2)').text().replace(/\./g,'').replace('/',' ')).split(' ')
	$('#attack_results td:eq(0) img').each(function(i,e){
		if(e.src.match(/holz\.png/i)){
			myself.attacker.haul.wood=parseInt(res[i]||'0',10);
			myself.attacker.haulArr[0]=myself.attacker.haul.wood;
		}
		else if(e.src.match(/lehm\.png/i)){
			myself.attacker.haul.clay=parseInt(res[i]||'0',10);
			myself.attacker.haulArr[1]=myself.attacker.haul.clay;
		}
		else if(e.src.match(/eisen\.png/i)){
			myself.attacker.haul.iron=parseInt(res[i]||'0',10);
			myself.attacker.haulArr[2]=myself.attacker.haul.iron;
		}
	});
	myself.attacker.haul.total=parseInt(res[res.length-2]||'0',10);
	myself.attacker.haulArr[3]=myself.attacker.haul.total;
	myself.attacker.haul.capacity=parseInt(res[res.length-1]||'0',10);
	myself.attacker.haulArr[4]=myself.attacker.haul.capacity;
		
	/* Calculate Attacker Stats */
	myself.attacker.stats.lossRate=(fnSumArray(myself.attacker.units.lossesArr)/(fnSumArray(myself.attacker.units.originalArr)||1)*100).toFixed(2)+'%';
	myself.attacker.stats.survivalRate=(fnSumArray(myself.attacker.units.remainingArr)/(fnSumArray(myself.attacker.units.originalArr)||1)*100).toFixed(2)+'%';
	myself.attacker.stats.haulRate=(myself.attacker.haul.total/(myself.attacker.haul.capacity||1)*100).toFixed(2)+'%';

	/* Additional Defender Details */
	win.$("table[class=vis]:has(tr th img[src*=unit_snob]):last tr td").each(function(i,e){myself.defender.units.awayArr.push(myself.defender.units.away[units[i]]=parseInt(e.innerHTML||'0',10));});
	win.$('#attack_info_def_units tr:eq(1) td:gt(0)').each(function(i,e){myself.defender.units.originalArr.push(myself.defender.units.original[units[i]]=parseInt(e.innerHTML||'0',10));});
	win.$('#attack_info_def_units tr:eq(2) td:gt(0)').each(function(i,e){myself.defender.units.lossesArr.push(myself.defender.units.losses[units[i]]=parseInt(e.innerHTML||'0',10));});

	/* Calculate Defender Remaining Troops */
	for(var key in myself.defender.units.original){
		if(myself.defender.units.original.hasOwnProperty(key)){
			myself.defender.units.remainingArr.push(myself.defender.units.remaining[key]=myself.defender.units.original[key]-myself.defender.units.losses[key]);
		}
	}
	
	/* Extract Defender Resources */
	res=win.$.trim(win.$("#attack_spy tr:eq(0) td").text().replace(/\./g,'')).split(' ');
	if(res){
		myself.defender.resources.wood=parseInt(res[0]||'0',10);
		myself.defender.resourcesArr[0]=myself.defender.resources.wood;
		myself.defender.resources.clay=parseInt(res[1]||'0',10);
		myself.defender.resourcesArr[1]=myself.defender.resources.clay;
		myself.defender.resources.iron=parseInt(res[2]||'0',10);
		myself.defender.resourcesArr[2]=myself.defender.resources.iron;
		myself.defender.resources.total=fnSumArray(myself.defender.resourcesArr);
		myself.defender.resourcesArr[3]=myself.defender.resources.total;
	}
		
	/* Calculate Defender Stats */
	myself.defender.stats.lossRate=(fnSumArray(myself.defender.units.lossesArr)/(fnSumArray(myself.defender.units.originalArr)||1)*100).toFixed(2)+'%';
	myself.defender.stats.survivalRate=(fnSumArray(myself.defender.units.remainingArr)/(fnSumArray(myself.defender.units.originalArr)||1)*100).toFixed(2)+'%';
		
	/* Building Levels */
	var arrBRes=win.$("#attack_spy tr:eq(1) td:first").html();
	if(arrBRes){
		arrBRes=arrBRes.match(/\w+\s\w*\s*<b>\(\w+\s\d+\)/ig);
		if(arrBRes){
			arrBRes.forEach(function(e,i,a){
				myself.defender.buildings[win.$.trim(e.match(/[a-z]+\s*[a-z]*\s/i))]=parseInt(e.match(/\d+/),10);
			});
		}
	}
		
	/* Report Summary */
	myself.id=win.location.search.match(/view\=(\d+)/i)[1];
	myself.subject=win.$.trim(win.$('#labelText').text());
	myself.sent=win.$.trim(win.$('#labelText').closest('tr').next().find('td:gt(0)').text());
		
	var source=myself.defender.coord.split('|').map(function(e){return parseInt(e||'0',10);});
	var target=myself.attacker.coord.split('|').map(function(e){return parseInt(e||'0',10);});
	myself.distance=Math.sqrt(Math.pow(target[0]-source[0],2)+Math.pow(target[1]-source[1],2)).toFixed(2);

	return myself;
}

ReportHelper.prototype.asString=function(){
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
				case "function":output+="function";break;
				default:output+=object[key];break;        
			}
		}

		return output;
	}

	return fnAsString(this);
};