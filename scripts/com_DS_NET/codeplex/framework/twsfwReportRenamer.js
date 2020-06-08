/* 
	Author	: Dale McKay
	Email	: dalesmckay@gmail.com
	Purpose	: To rename reports with a customizable format based on the report content.
	Credit	: 
	Todo	: 
		* Provide a GUI for customization.
		* Store/Fetch the custom configuration data.
	Notes	:
		-- removed "{delete-fake-report}" - now determined via function parameter "fakeUnitMax"
		-- removed hard coded string prefixes - they should be customized in the "mask" by the player
		-- added {refugee troops} - flags if troops are in other villages after it was nobled
		-- added {catapult target} - shows the building being targeted by any catapults
		-- added {first church} - identify a village containing the First Church
		-- display ? for unKnown values
	
	Mask Options:
		{attacker name}
		{attacker player id}
		{attacker village coord}
		{attacker village name}
		{attacker village id}
		{attacker village continent}
		{defender name}
		{defender player id}
		{defender village coord}
		{defender village name}
		{defender village id}
		{defender village continent}
		{report id}
		{distance}
		{resources}
		{wood}
		{clay}
		{iron}
		{attackers original troops}
		{attackers remaining troops}
		{attackers losses}
		{defenders original troops}
		{defenders remaining troops}
		{defenders losses}
		{outside troops}
		{refugee troops}
		{cleared}
		{%lost}
		{%killed}
		{%remaining}
		{%haul}
		{dead noble}
		{wall}
		{catapult target}
		{loyalty}
		{farmspace}
		{church level}
		{first church}
		{lc all}
		{lc per 8 hours}
		
	fakeUnitMax - the report is deleted if the number of original units sent by the attacker is less than this value.
	
	debugEnabled - set this to true to get additional debug information to provide to any Scripters attempting to fix any issues.
	

	######################
	Client Launcher (live):
	######################
	
javascript:
	var mask='{attacker name} -> {defender name} {defender village coord} @{distance} >> {defenders remaining troops} R:{%remaining} << {outside troops} | W:{wall} -- {cleared} L:{loyalty} {dead noble}';
	var fakeUnitMax=10;
	var debugEnabled=false;
	var branch='http://dl.dropbox.com/u/25377948/twscripts/';
	(window.main||window).$.getScript(branch+'jquery.tw.reportrenamer.js',function(){$.twRenameReport(branch,mask,fakeUnitMax,debugEnabled);});
	void(0);

____________________________________________________________

Copyright (C) 2011 Dale McKay, all rights reserved
version 1.0, 15 April 2011

This software is provided 'as-is', without any express or implied warranty. In no event will the author be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:
The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
This notice may not be removed or altered from any source distribution.
____________________________________________________________
*/

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Class: ReportRenamer
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
function ReportRenamer(){
	var myself=this;
	var win=(window.main||window),$=win.$;

	var script={
		name:'Report Renamer Script',
		version:1.02,
		minGameVersion:7.00,
		author:{
			name:'dalesmckay',
			email:'dalesmckay@gmail.com'
		},
		credit:'(Complete rewrite of the Report Renamer Script by: fluffy88)',
		runOnce:true
	};

	// Replace these strings with the correct language translation.
	var config={
		'buildings':{
			names:{
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
			},
			tags:{//NOTE: this must be kept separate from the "names" object, since the "names" may come from an external help page
				main:{tag:'Hq'},
				barracks:{tag:'Ba'},
				stable:{tag:'St'},
				garage:{tag:'Ws'},
				church:{tag:'Ch'},
				church_f:{tag:'Fc'},
				snob:{tag:'Ac'},
				smith:{tag:'Sm'},
				place:{tag:'Rp'},
				statue:{tag:'Pa'},
				market:{tag:'Mk'},
				wood:{tag:'Tc'},
				stone:{tag:'Cp'},
				iron:{tag:'Im'},
				farm:{tag:'Fm'},
				storage:{tag:'Wh'},
				hide:{tag:'Hp'},
				wall:{tag:'W'}
			}
		},
		'units':{
			names:{
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
			},
			tags:{//NOTE: this must be kept separate from the "names" object, since the "names" may come from an external help page
				spear:{tag:'Sp'},
				sword:{tag:'Sw'},
				axe:{tag:'Ax'},
				archer:{tag:'Ar'},
				spy:{tag:'Sc'},
				light:{tag:'Lc'},
				marcher:{tag:'Ma'},
				heavy:{tag:'Hc'},
				ram:{tag:'Ra'},
				catapult:{tag:'Ca'},
				knight:{tag:'Pa'},
				snob:{tag:'No'},
				militia:{tag:'Mi'}
			}
		},
		'userMsg':{
			cleared:'CLEARED',
			conquered:'CONQUERED',
			deadNoble:'DEAD NOBLE',
			firstChurch:'FIRST CHURCH',
			firstReport:'At First Report',
			refugees:'REFUGEES'
		}
	};
	// ........................................................................

	function fnScript(){try{
		// ........................................................................
		function fnUnitsToStr(objUnits){
			twUtil.debug('<span style="color:gray;">CALL: fnUnitsToStr()...</span>');

			var units=[];
			if(objUnits!==undefined){
				for(var unitID in objUnits){
					if(objUnits.hasOwnProperty(unitID)&&!unitID.match(/asArray/i)){
						if(objUnits[unitID]>0){
							units.push(twConfig.units[unitID].tag+':'+objUnits[unitID]);
						}
					}
				}
			}
		
			return $.trim(units.join(' '));
		} // fnUnitsToStr
		// ........................................................................
		function fnWallLevelAsStr(report){
			twUtil.debug('<span style="color:gray;">CALL: fnWallLevelAsStr()...</span>');

			var wallName=twConfig.buildings.wall.name;
			var lvl=(-1);

			if(report.defender.buildings===undefined){
				if(report.attacker.catTarget==wallName){
					lvl=(report.attacker.catDamage||[-1,-1])[1];
				}
				else{
					lvl=(report.attacker.ramDamage||[-1,-1])[1];
				}
			}
			else{
				lvl=parseInt(report.defender.buildings[wallName]||'0',10);
			}

			return (lvl>=0)?(lvl):(((report.defender.loyalty!=undefined)&&(report.defender.loyalty[1]<=0))?0:'?');
		} // fnWallLevelAsStr
		// ........................................................................
		function fnChurchLevelAsStr(report){
			twUtil.debug('<span style="color:gray;">CALL: fnChurchLevelAsStr()...</span>');

			if(twConfig.hasChurch){
				var churchName=twConfig.buildings.church.name;	
				return ((report.defender.buildings===undefined)||(typeof(report.defender.buildings[churchName])=='undefined'))?'?':report.defender.buildings[churchName]||'0';
			}
			
			return '';
		} // fnChurchLevelAsStr
		// ........................................................................
		function fnProduction(lvl) {
			twUtil.debug('<span style="color:gray;">CALL: fnProduction()...</span>');
			return ((lvl==0)?5:Math.round(30*Math.pow(80,(lvl-1)/29)))*parseInt(twConfig.world.speed||'1',10);
		} // fnProduction
		// ........................................................................
		function fnLcAll(resources){
			twUtil.debug('<span style="color:gray;">CALL: fnLcAll()...</span>');
			
			if(resources===undefined){
				return '?';
			}

			return Math.ceil(parseInt(resources.total||'0',10)/parseInt(twConfig.units.light.carry||'1',10));
		} // fnLcAll
		// ........................................................................
		function fnLCForPeriod(buildings,hours){
			var woodProd=fnProduction((buildings===undefined)?0:buildings[twConfig.buildings.wood.name]||0);
			var clayProd=fnProduction((buildings===undefined)?0:buildings[twConfig.buildings.stone.name]||0);
			var ironProd=fnProduction((buildings===undefined)?0:buildings[twConfig.buildings.iron.name]||0);

			return ((woodProd+clayProd+ironProd)*hours/parseInt(twConfig.units.light.carry||'1',10));
		} // fnLCForPeriod
		// ........................................................................
		function fnFarmSpace(buildings){
			twUtil.debug('<span style="color:gray;">CALL: fnFarmSpace()...</span>');

			var count=0;
			var total=0;
	
			if(buildings!==undefined){
				var level;
				var pop;
				var popFactor;
				var building;

				for(var buildingID in twConfig.buildings){
					if(twConfig.buildings.hasOwnProperty(buildingID)){
						building=twConfig.buildings[buildingID];
						level=buildings[building.name];

						if(typeof(level)!='undefined'){
							count++;
							pop=parseInt(building.pop||'1',10);
							popFactor=parseFloat(building.pop_factor);
							level=parseInt(level||building.min_level||'0',10);
							total+=Math.round(pop*Math.pow(popFactor,level-1));
						}
					}		
				}
			}

			return (count>0)?total:'?';
		} // fnFarmSpace
		// ........................................................................
		function fnBuildingConfigFrom(villageName){
			for(var buildingID in twConfig.buildings){
				if(twConfig.buildings.hasOwnProperty(buildingID)){
					if((twConfig.buildings[buildingID].name||'').match(villageName,'i')){
						return twConfig.buildings[buildingID];
					}
				}
			}
			
			return null;		
		} // fnBuildingConfigFrom
		// ........................................................................
		function fnNeedToDelete(report){
			twUtil.debug('<span style="color:gray;">CALL: fnNeedToDelete()...</span>');

			return report.isAttack
				&& ((fakeUnitMax||0)>0)
				&& (report.sumArray(report.attacker.units.original.asArray)<=fakeUnitMax)
				&& ((report.attacker.units.remaining.spy||0)<=0)
				&& ((report.attacker.units.original.snob||0)<=0)
			;
		} // fnNeedToDelete
		// ........................................................................
		function fnNextReport(){
			if($('a:contains("<<")').length>0){
				win.location=$('a:contains("<<")').attr('href');
			}
			else{
				alert(config.userMsg.firstReport);
			}
		} // fnNextReport
		// ........................................................................
		function fnDeleteReport(){
			win.location=$('[href*="action=del_one"]').attr('href');
		} // fnDeleteReport
		// ........................................................................
		function fnRenameReport(){
				twUtil.debug('<span style="color:gray;">CALL: fnRenameReport()...</span>');

				twUtil.debug('Report Dump:');
				twUtil.debug("=========================");
				twUtil.debug(report.asString().replace(/\n/g,'<br/>').replace(/\t/g,'<span style="color:transparent;">.....</span>'));
				twUtil.debug("=========================<br/>");

				var newReportName=(!report.isAttack)?'':$.trim((mask||'')
					.replace(/\{attacker\s+name\}/i,report.attacker.name)
					.replace(/\{attacker\s+player\s+id\}/i,(report.attacker.id===undefined)?'':report.attacker.id)
					.replace(/\{attacker\s+village\s+coord\}/i,report.attacker.village.coord)
					.replace(/\{attacker\s+village\s+name\}/i,report.attacker.village.name)
					.replace(/\{attacker\s+village\s+id\}/i,report.attacker.village.id)
					.replace(/\{attacker\s+village\s+continent\}/i,report.attacker.village.continent)
					.replace(/\{defender\s+name\}/i,report.defender.name)
					.replace(/\{defender\s+player\s+id\}/i,(report.defender.id===undefined)?'':report.defender.id)
					.replace(/\{defender\s+village\s+coord\}/i,report.defender.village.coord)
					.replace(/\{defender\s+village\s+name\}/i,report.defender.village.name)
					.replace(/\{defender\s+village\s+id\}/i,report.defender.village.id)
					.replace(/\{defender\s+village\s+continent\}/i,report.defender.village.continent)
					.replace(/\{report\s+id\}/i,report.id)
					.replace(/\{distance\}/i,report.distance)
					.replace(/\{resources\}/i,(report.defender.resources===undefined)?'?':report.defender.resources.total)
					.replace(/\{wood\}/i,(report.defender.resources===undefined)?'?':report.defender.resources.wood)
					.replace(/\{clay\}/i,(report.defender.resources===undefined)?'?':report.defender.resources.clay)
					.replace(/\{iron\}/i,(report.defender.resources===undefined)?'?':report.defender.resources.iron)
					.replace(/\{attackers\s+original\s+troops\}/i,fnUnitsToStr(report.attacker.units.original))
					.replace(/\{attackers\s+remaining\s+troops\}/i,fnUnitsToStr(report.attacker.units.remaining))
					.replace(/\{attackers\s+losses\}/i,fnUnitsToStr(report.attacker.units.losses))
					.replace(/\{defenders\s+original\s+troops\}/i,((report.defender.units===undefined)||(report.defender.units.original===undefined))?'?':fnUnitsToStr(report.defender.units.original))
					.replace(/\{defenders\s+remaining\s+troops\}/i,((report.defender.units===undefined)||(report.defender.units.remaining===undefined))?'?':fnUnitsToStr(report.defender.units.remaining))
					.replace(/\{defenders\s+losses\}/i,((report.defender.units===undefined)||(report.defender.units.losses===undefined))?'?':fnUnitsToStr(report.defender.units.losses))
					.replace(/\{outside\s+troops\}/i,((report.defender.units===undefined)||(report.defender.units.away===undefined))?'?':fnUnitsToStr(report.defender.units.away))
					.replace(/\{refugee\s+troops\}/i,((report.defender.units===undefined)||(report.defender.units.refugee===undefined))?'':(report.defender.units.refugee.length>0)?config.userMsg.refugees:'')
					.replace(/\{cleared\}/i,report.defender.village.isClear?(((report.defender.loyalty!==undefined)&&(report.defender.loyalty[1]<=0))?config.userMsg.conquered:config.userMsg.cleared):'')
					.replace(/\{\%lost\}/i,((report.attacker.stats.lossRate===undefined)?'?':Math.round(report.attacker.stats.lossRate*100)))
					.replace(/\{\%killed\}/i,((report.defender.stats.lossRate===undefined)?'?':Math.round(report.defender.stats.lossRate*100)))
					.replace(/\{\%remaining\}/i,((report.defender.stats.resourceRate===undefined)?'?':Math.round(report.defender.stats.resourceRate*100)))
					.replace(/\{\%haul\}/i,((report.attacker.stats.haulRate===undefined)?'?':Math.round(report.attacker.stats.haulRate*100)))
					.replace(/\{dead\s+noble\}/i,((report.attacker.units.losses.snob||0)>0)?config.userMsg.deadNoble:'')
					.replace(/\{wall\}/i,fnWallLevelAsStr(report))
					.replace(/\{catapult\s+target\}/i,(fnBuildingConfigFrom(report.attacker.catTarget)||{tag:(report.attacker.units.original.catapult>0?'?':'')}).tag)
					.replace(/\{loyalty\}/i,((report.defender.loyalty===undefined)?'?':report.defender.loyalty[1]))
					.replace(/\{farmspace\}/i,fnFarmSpace(report.defender.buildings))
					.replace(/\{church\s+level\}/i,fnChurchLevelAsStr(report))
					.replace(/\{first\s+church\}/i,((report.defender.buildings===undefined)||(typeof(report.defender.buildings[twConfig.buildings.church_f])=='undefined'))?'':config.userMsg.firstChurch)
					.replace(/\{lc\s+all\}/i,fnLcAll(report.defender.resources))
					.replace(/\{lc\s+per\s+8\s+hours\}/i,fnLCForPeriod(report.defender.buildings,8))
				);
			
				if(fnNeedToDelete(report)){
					fnDeleteReport();
				}
				else if(!newReportName||($('#editInput').val()==newReportName)){
					fnNextReport();
				}
				else{
					$('#editInput').val(newReportName);
					$('input[onclick*="editSubmit"]').click();
				}

				twUtil.debug('<span style="color:gray;">done.</span>');
		} // fnRenameReport
		// ........................................................................
		
		function fnLoadReportHelper(){
			if($.twReport){
				report=$.twReport();
				fnRenameReport();
			}
			else{
				twUtil.debug('<span style="color:gray;">ReportHelper loading...</span>');
				twUtil.ajax(win.twsfwConfig.branch+'jquery.tw.reporthelper.js','GET',{},'script',true,function(){
					twUtil.debug('<span style="color:gray;">ReportHelper ready.</span>');
					report=$.twReport();
					fnRenameReport();
				});
			}	
		} // fnLoadReportHelper
		// ........................................................................

		var report;
		var twUtil=$.twUtil();
		var twConfig=$.twConfig();
		
		// TODO: Make this user configurable!!!
		var mask='[{cleared}] [{dead noble}] [{attacker name}:({attacker village coord})] [{defender name}:({defender village coord} {defender village continent})] - [{defenders remaining troops}] [W:{wall}] [L:{loyalty}] [%L:{%lost}]-[%K:{%killed}]';
		var fakeUnitMax=10;
		
		if((win.game_data.screen!="report")||(!win.location.search.match(/view\=\d+/i))){
			throw('This script must be run from a Report Detail Screen!');
		}
			
		// Cache additional building detail.
		if(!twConfig.buildings.main.name){
			$.extend(true,twConfig.buildings,config.buildings.names);
			// TODO: update localStorage ???
		}
		if(!twConfig.buildings.main.tag){
			$.extend(true,twConfig.buildings,config.buildings.tags);
			// TODO: update localStorage ???
		}
					
		// Cache additional unit detail.
		if(!twConfig.units.spear.name){
			$.extend(true,twConfig.units,config.units.names);
			// TODO: update localStorage ???
		}
		if(!twConfig.units.spear.tag){
			$.extend(true,twConfig.units,config.units.tags);
			// TODO: update localStorage ???
		}
										
		fnLoadReportHelper();
	}
	catch(objError){
		var errMsg=String(objError.message||objError||'');
		if(errMsg){
			$('body').append('<span>'+errMsg+'</span><br/>');
			alert('Error: '+errMsg);
		}
	}} // fnScript
	// ........................................................................
	
	return $.extend({id:'ReportRenamer',execute:function(fwExt){fnScript.call($.extend({},myself,script,fwExt));}},script);
} // ReportRenamer::constructor
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
