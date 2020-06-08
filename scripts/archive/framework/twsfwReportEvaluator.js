/* 
	Author	: Dale McKay
	Email	: dalesmckay@gmail.com
	Purpose	: To rename reports with a customizable format based on the report content.
	Credit	: 
	Todo	: 
		* Provide a GUI for customization.
		* Store/Fetch the custom configuration data.
	Notes	:


javascript:alert(localStorage.getItem('twsfwBooReporter'));void(0);


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
// Class: ReportEvaluator
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
function ReportEvaluator(){
	var myself=this;
	var win=(window.main||window),$=win.$;

	var script={
		name:'Report Evaluator Script',
		version:1.00,
		minGameVersion:7.00,
		author:{
			name:'dalesmckay',
			email:'dalesmckay@gmail.com'
		},
		credit:'(Complete rewrite of the Report Evaluator Script by: SlowTarget)',
		runOnce:false
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
		},
		'userMsg':{
			cleared:'CLEARED',
			nobled:'NOBLED',
			deadNoble:'DEAD NOBLE',
			firstChurch:'FIRST CHURCH',
			firstReport:'At First Report',
			refugees:'REFUGEES'
		}
	};
	// ........................................................................

	function fnScript(){try{
		// ........................................................................
		function fnProduction(lvl){return ((lvl==0)?5:Math.round(30*Math.pow(80,(lvl-1)/29)))*parseInt(twConfig.world.speed||'1',10);}
		// ........................................................................
		function fnGetDistance(from,to){return Math.sqrt(Math.pow(from[0]-to[0],2)+Math.pow(from[1]-to[1],2));}
		// ........................................................................
		function fnWarehouse(lvl){return(lvl<=1)?1000:Math.round(1000*Math.pow(400,(lvl-1)/29));}
		// ........................................................................
		function fnHide(lvl){return(lvl<=1)?0:Math.round(150*Math.pow(40/3,(lvl-1)/9));}
		// ........................................................................
		function fnStrDate(txtDate){
			arrMs=txtDate.match(/\b(\d{3})$/i);
			if(arrMs)txtDate=txtDate.replace(/\b(.\d{3})$/i,'');
			if(txtDate.match(/\b([a-z]{3})\b/i)){
				var dtNew=new Date(txtDate);
				if(arrMs)dtNew.setMilliseconds(arrMs[1]);
				return dtNew;
			}
			var arrDate=txtDate.match(/\b(\d+)\b/ig);
			arrDate.push(0);arrDate.push(0);
			if(arrMs)arrDate[6]=fnInt(arrMs[1]);
			arrDate=arrDate.map(fnInt);
			if(arrDate[2]<2000)arrDate[2]+=2000;
			dtNew = new Date(arrDate[2],arrDate[1]-1,arrDate[0],arrDate[3],arrDate[4],arrDate[5],arrDate[6]);
			return dtNew;
		} // fnStrDate
		// ........................................................................
		function fnFormatTime(ms){
			var sec=ms/1000;
			var min=sec/60;
			var hrs=Math.floor(min/60);
			min=Math.floor(min) % 60;
			sec=Math.floor(sec) % 60;
	
			return (hrs<10?'0':'')+hrs+':'+(min<10?'0':'')+min+':'+(sec<10?'0':'')+sec;
		} // fnFormatTime
		// ........................................................................
		function fnServerTime(){
			var arrDate=($('#serverDate').text()+' '+$('#serverTime').text()).match(/\d+/g);
			return new Date(arrDate[2],arrDate[1]-1,arrDate[0],arrDate[3],arrDate[4],arrDate[5]);
		} // fnServerTime
		// ........................................................................
		function fnInsertUnit(strUnit,intLeave,blAssignUnit){
			var maxUnits=Math.max(0,parseInt($('#unit_input_'+strUnit+'~a:first').text().match(/\d+/)||'0',10));
			maxUnits=Math.max(0,(intLeave<0)?Math.min(maxUnits,-intLeave):Math.max(0,maxUnits-intLeave));

			if(blAssignUnit){
				$('#unit_input_'+strUnit).val(maxUnits);
			}

			return maxUnits;
		} // fnInsertUnit
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
		function fnEvaluateReport(){
			twUtil.debug('<span style="color:gray;">CALL: fnEvaluateReport()...</span>');

			twUtil.debug('Report Dump:');
			twUtil.debug('=========================');
			twUtil.debug(report.asString().replace(/\n/g,'<br/>').replace(/\t/g,'<span style="color:transparent;">.....</span>'));
			twUtil.debug('=========================<br/>');

			// Determine Actual Building Levels Used in Calculations.
			var wood=(report.defender.buildings?parseInt(report.defender.buildings[twConfig.buildings.wood.name]||'20',10):20);
			var clay=(report.defender.buildings?parseInt(report.defender.buildings[twConfig.buildings.stone.name]||'20',10):20);
			var iron=(report.defender.buildings?parseInt(report.defender.buildings[twConfig.buildings.iron.name]||'20',10):20);
			var storage=(report.defender.buildings?parseInt(report.defender.buildings[twConfig.buildings.storage.name]||'30',10):30);
			var hide=(report.defender.buildings?parseInt(report.defender.buildings[twConfig.buildings.hide.name]||'10',10):10);
			var wall=(report.defender.buildings?parseInt(report.defender.buildings[twConfig.buildings.wall.name]||'0',10):0);

			// Log any Estimated Building Levels.
			if(!report.buildings){
				twUtil.debug(
					'Assumed Building Levels: ' + 
					twConfig.buildings.wood.name + '=' + wood + ', ' +
					twConfig.buildings.stone.name + '=' + clay + ', ' +
					twConfig.buildings.iron.name + '=' + iron + ', ' +
					twConfig.buildings.storage.name + '=' + storage + ', ' +
					twConfig.buildings.hide.name + '=' + hide + ', ' +
					twConfig.buildings.wall.name + '=' + wall
				);
			}

			// Check for Duplicate Report.
			var arrCookie=twCache.fetch(win.twsfwConfig.id+'BooReporter');
			if(arrCookie&&(arrCookie.id==report.id)){
				twUtil.debug('Skipping duplicate report');
				fnNextReport();
				return;
			}

			// Construct Cookie.
			arrCookie={
				id:report.id,
				reportDate:fnStrDate(report.sent).getTime(),
				targetCoord:report.defender.village.coord,
				useReportCoord:blSameAsReport,
				resources:{
					wood:(report.defender.resources?report.defender.resources.wood||0:0),
					clay:(report.defender.resources?report.defender.resources.clay||0:0),
					iron:(report.defender.resources?report.defender.resources.iron||0:0),
					capacity:Math.max(0,fnWarehouse(storage)-fnHide(hide))
				},
				production:{
					wood:fnProduction(wood),
					clay:fnProduction(clay),
					iron:fnProduction(iron)
				},
				wall:wall
			};
				
			// Store the new Cookie.
			twCache.store(win.twsfwConfig.id+'BooReporter',arrCookie);

			// Open the Rally Point Screen.
			var villageID=(blSameAsReport?report.attacker.village.id:win.game_data.village.id);
			var url=win.game_data.link_base_pure.replace(/screen\=\w*/i,'screen=place&mode=command&target='+report.defender.village.id).replace(/village\=\d*/i,'village='+villageID);
			twUtil.debug('Opening New Window... : ' + url);
			window.open(url, 'newwindow', config='toolbar=yes,menubar=yes,scrollbars=yes,resizable=yes,location=yes,directories=yes,status=yes');

			twUtil.debug('<span style="color:gray;">done.</span>');
		} // fnEvaluateReport
		// ........................................................................
		function fnRallyPoint(){
			var arrCookie=twCache.fetch(win.twsfwConfig.id+'BooReporter');
			twUtil.debug('Cookie Dump:');
			twUtil.debug('=========================');
			twUtil.debug(twUtil.asString(arrCookie).replace(/\n/g,'<br/>').replace(/\t/g,'<span style="color:transparent;">.....</span>'));
			twUtil.debug('=========================<br/>');
		
			if(!arrCookie||(typeof(arrCookie)!='object')||!arrCookie.id){
				return;
			}
		
			if(arrCookie.targetCoord!=($('#inputx').val()+'|'+$('#inputy').val())){
				twUtil.print('You have switched targets since last using this script. Unable to compute units needed.');
				return;
			}
		
			var elapsedMS=fnServerTime()-arrCookie.reportDate;
			twUtil.debug('Elapsed (hrs): '+(elapsedMS/(3600*1000)).toFixed(2));
		
			// Clear the Rally point Units.
			win.$('input[class="unitsInput"]').val('');
		
			var distance=fnGetDistance(win.game_data.village.coord.split('|'),arrCookie.targetCoord.split('|'));
			twUtil.debug('Current location: '+win.game_data.village.coord);
			twUtil.debug('Target location: '+arrCookie.targetCoord);
			twUtil.debug('Distance (fields): '+distance.toFixed(2));
			twUtil.debug('Max resource : '+arrCookie.resources.capacity);

			// Initialize Units.
			var speed,carry,attack,available,detail,estimate,elapsedHrs,arrUnit=[];
			for(var unit in twConfig.units){
				available=fnInsertUnit(unit,0,false);
				carry=parseInt(twConfig.units[unit].carry,10);
				speed=parseFloat(twConfig.units[unit].speed);
				attack=parseInt(twConfig.units[unit].attack,10);

				elapsedHrs=(elapsedMS+(speed*60*1000*distance))/(3600*1000);
				estimate={
					minsPerField:fnFormatTime(speed*60*1000),
					totalHrs:fnFormatTime(elapsedHrs*3600*1000),
					wood:Math.min(arrCookie.resources.wood+Math.ceil(arrCookie.production.wood*elapsedHrs),arrCookie.resources.capacity),
					clay:Math.min(arrCookie.resources.clay+Math.ceil(arrCookie.production.clay*elapsedHrs),arrCookie.resources.capacity),
					iron:Math.min(arrCookie.resources.iron+Math.ceil(arrCookie.production.iron*elapsedHrs),arrCookie.resources.capacity),
				};
				estimate.total=estimate.wood+estimate.clay+estimate.iron;
				
				detail={id:unit,available:available,capacity:carry,speed:speed,strength:attack,estimate:estimate};
				arrUnit.push(detail);
				twUtil.debug(JSON.stringify(detail));
			}
		
			// Insert Scouts.
			var minSpy=(parseInt(twConfig.world.game.spy||'1',10)==3)?5:1;
			if(fnInsertUnit('spy',-minSpy,true)<minSpy){twUtil.debug('You should send scouts but you don\'t have any available!');}
			
			// Determine Siege Units required to knock down the wall.
			maxWallLevel=Math.max(twConfig.buildings.wall.min_level,maxWallLevel||10);
			if(maxWallLevel<0){
				maxWallLevel=twConfig.buildings.wall.max_level+1;
			}

			var removeWall=(arrCookie.wall>0)&&(arrCookie.wall>maxWallLevel);
			if(removeWall){
				var siegeLevels={
					ram:     [2,4, 7,10,14,19,24,30,37,46,55,65, 77, 91,107,124,144,166,195,220],
					catapult:[2,6,10,15,21,28,36,45,56,68,82,98,115,136,159,185,215,248,286,328]
				};
				
				twUtil.debug(siegeLevels.ram[arrCookie.wall]+' ram(s) required');
				twUtil.debug(siegeLevels.catapult[arrCookie.wall]+' catapult(s) required');

				var wallLevel=arrCookie.wall;
				
				var ramsAvailable=fnInsertUnit('ram',0,false);
				var ramsRequired=0;
				var ramDamage=0;
				siegeLevels.ram.forEach(function(e,i){
					if(ramsAvailable<e){
						return false;
					}
					
					ramDamage=i+1;
					ramsRequired=e;
				});
				
				wallLevel-=ramDamage;
				
				var catsAvailable=fnInsertUnit('catapult',0,false);
				var catsRequired=0;
				var catDamage=0;
				if(ramDamage<arrCookie.wall){
					siegeLevels.catapult.forEach(function(e,i){
						if(catsAvailable<e){
							return false;
						}
					
						catDamage=i+1;
						catsRequired=e;
					});

					wallLevel-=catDamage;
				}
				
				fnInsertUnit('ram',-ramsRequired,true);				
				fnInsertUnit('catapult',-catsRequired,true);
				// TODO: insert escort troops.
				
				if(wallLevel>0){
					twUtil.debug('Not enough units available to level the '+twConfig.buildings.wall.name);
				}

				if(ramsRequired){
					twUtil.debug('Sending '+ramsRequired+' '+twConfig.units.ram.name+'(s) to knock the '+twConfig.buildings.wall.name+' from '+arrCookie.wall+' to '+(arrCookie.wall-ramDamage));
				}

				if(catsRequired){
					twUtil.debug('Sending '+catsRequired+' '+twConfig.units.catapult.name+'(s) to knock the '+twConfig.buildings.wall.name+' from '+(arrCookie.wall-ramDamage)+' to '+wallLevel);
				}
			}	
			
			// Sort Units by Speed
			//arrUnit.sort(function(a,b){return fastestUnitsFirst?(a.speed-b.speed):(b.speed-a.speed);});
			arrUnit.sort(function(a,b){return (b.speed-a.speed);});
			arrUnit.forEach(function(e,i){
			});
			
			
			var filtered=arrUnit.filter(function(e,i){return (e.capacity>0)&&(e.available>0)&&(e.capacity*e.available>=minResource)&&(e.speed*distance<maxDurationMinutes);});
			filtered.sort(function(a,b){return (b.speed-a.speed);});
			
			twUtil.debug('Units Available:');
			twUtil.debug('=========================');
			twUtil.debug(twUtil.asString(filtered).replace(/\n/g,'<br/>').replace(/\t/g,'<span style="color:transparent;">.....</span>'));
			twUtil.debug('=========================<br/>');

			var length=filtered.length-1;
			var totalRes;
			var unitsRequired;
			var unitsUsed=[];
			var offset=(fastestUnitsFirst?-1:1);
			var ii=(fastestUnitsFirst?length:0);
			var maxResources=filtered[ii].estimate.total;
			var jj;
			while((ii>=0)&&(ii<=length)){
				totalRes=filtered[ii].estimate.total;
				
				if(fastestUnitsFirst){
					unitsUsed=[];
				}
				
				for(jj=(fastestUnitsFirst?length:0);((jj>=ii)&&(jj<=length));jj+=offset){
					unitsRequired=Math.min(filtered[jj].available,Math.ceil(totalRes/filtered[jj].capacity));
					unitsUsed.push({id:filtered[jj].id,qty:unitsRequired});
					totalRes-=filtered[jj].capacity*unitsRequired;
										
					if(totalRes<minResource){
						ii=(-2);
						break;
					}
				}
				
				ii+=offset;
			}
			
			twUtil.debug('Units Used:');
			twUtil.debug('=========================');
			twUtil.debug(twUtil.asString(unitsUsed).replace(/\n/g,'<br/>').replace(/\t/g,'<span style="color:transparent;">.....</span>'));
			twUtil.debug('=========================<br/>');

			unitsUsed.forEach(function(e,i){
				fnInsertUnit(e.id,-e.qty,true);
			});

			var haulRate=(maxResources-totalRes)/(maxResources||1);
			twUtil.debug('You are picking up '+Math.min(100.00,(haulRate*100)).toFixed(2)+'% of the resources');
		} // fnRallyPoint
		// ........................................................................

		function fnLoadReportHelper(){
			switch(win.game_data.screen){
				case 'report':
					if($.twReport){
						report=$.twReport();
						fnEvaluateReport();
					}
					else{
						twUtil.debug('<span style="color:gray;">ReportHelper loading...</span>');
						twUtil.ajax(win.twsfwConfig.branch+'jquery.tw.reporthelper.js','GET',{},'script',true,function(){
							twUtil.debug('<span style="color:gray;">ReportHelper ready.</span>');
							report=$.twReport();
							fnEvaluateReport();
						});
					}	
					
					break;
					
				case 'place':
					fnRallyPoint();
					break;
		
				default:
					break;
			}
		} // fnLoadReportHelper
		// ........................................................................

		var report;
		var twUtil=$.twUtil();
		var twConfig=$.twConfig();
		var twCache=$.twCache();

/* TODO:
		if((win.game_data.screen!='report')||(!win.location.search.match(/view\=\d+/i))){
			throw('This script must be run from a Report Detail Screen!');
		}
*/
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

		// TODO: configurable options
		var blSameAsReport=true;
		var minResource=0;
		var maxDurationMinutes=300;
		var fastestUnitsFirst=false;
		var maxWallLevel=5;
	
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

	return $.extend({id:'ReportEvaluator',execute:function(fwExt){fnScript.call($.extend({},myself,script,fwExt));}},script);
} // ReportEvaluator::constructor
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
