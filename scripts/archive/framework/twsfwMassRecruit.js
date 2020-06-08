/* 
	Author	: Dale McKay
	Email	: dalesmckay@gmail.com
	Purpose	: To provide a simple and configurable Mass Recruitment functionality.
	Credit	: Thanks to slowtarget for the GUI idea.
	Notes	: This is currently a merge of slowtarget's MassRecruit Script and dalesmckay's MassRecruit Script.
	Todo	:
		* Lots of stuff (currently under heavy construction)
			-- implement queue times (min/max hours to train)
			-- Get it working on the single village overview screen
			-- refactor the code
			-- add a refresh button (currently only runs when the script is executed)
			-- optimize for large village sets
			-- make sure the DOM Element Class does not conflict with any TW Classes.

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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Class: MassRecruit
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
function MassRecruit(){
	var myself=this;
	
	var script={
		name:'Mass Recruit Script',
		version:1.00,
		minGameVersion:7.00,
		author:{
			name:'dalesmckay',
			email:'dalesmckay@gmail.com'
		},
		credit:'(Complete rewrite of the Mass Recruit Script by: SlowTarget)',
		runOnce:false
	};
	// ........................................................................
	function fnScript(){
		// Use 'this' to get correct context.
		this.execute();
	} // fnScript
	// ........................................................................

	return $.extend({id:'MassRecruit',execute:function(fwExt){fnScript.call($.extend({},myself,script,fwExt));}},script);
} // MassRecruit::constructor
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

MassRecruit.prototype.formatTime=function(ms){
	var sec=ms/1000;
	var min=sec/60;
	var hrs=Math.floor(min/60);
	min=Math.floor(min) % 60;
	sec=Math.floor(sec) % 60;
	
	return (hrs<10?'0':'')+hrs+':'+(min<10?'0':'')+min+':'+(sec<10?'0':'')+sec;
}; // MassRecruit::formatTime
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

MassRecruit.prototype.refreshUnit=function(sender,autoSave){
	var myself=this;
	var win=(window.main||window),$=win.$;

	$.twUtil().debug('CALL: '+myself.id+'::refreshUnit');

	// ........................................................................
	function fnTotal(id){
		var total=0;
		
		$('[class*="'+id+'"]').each(function(i,e){
			total+=parseInt($(e).text()||'0',10);
		});
		
		return total;		
	} // fnTotal
	// ........................................................................
	function fnTimeTotal(where){
		var total=0;
		
		$('[class*="timeSubtotal"]').each(function(i,e){
			var unit=e.className.match(/(\w+)\stimeSubtotal/i)[1];
			
			if(myself.unitBuildings[myself.unitLocations[unit]]===where){
				var qty=parseInt($('[class*="'+unit+' unitQty"]').val()||'0',10);
				total+=parseInt($.twConfig().units[unit].build_time||'-1',10)*qty;
			}
		});
		
		return total;		
	} // fnTimeTotal
	// ........................................................................

	var unit='';
	var qty=0;
	
	if(sender&&sender.className){
		unit=sender.className.match(/(\w+)\sunitQty/i);
		unit=unit?unit[1]:'';
		qty=parseInt(sender.value||'0',10);
	}

	if(unit){
		if(qty>0){
			// Display the Unit Subtotals.
			$('#'+unit+'Subtotal').html('\
				<img src="/graphic/holz.png" alt="wood"/><span class="'+unit+' woodSubtotal">'+(parseInt($.twConfig().units[unit].wood||'-1',10)*qty)+'</span><br/>\
				<img src="/graphic/lehm.png" alt="clay"/><span class="'+unit+' claySubtotal">'+(parseInt($.twConfig().units[unit].stone||'-1',10)*qty)+'</span><br/>\
				<img src="/graphic/eisen.png" alt="iron"/><span class="'+unit+' ironSubtotal">'+(parseInt($.twConfig().units[unit].iron||'-1',10)*qty)+'</span><br/>\
				<img src="/graphic/face.png" alt="farm space"/><span class="'+unit+'popSubtotal">'+(parseInt($.twConfig().units[unit].pop||'-1',10)*qty)+'</span><br/>\
				<img src="/graphic/buildings/'+myself.unitBuildings[myself.unitLocations[unit]]+'.png" alt="queue time"/><span class="'+unit+' timeSubtotal">'+myself.formatTime(parseInt($.twConfig().units[unit].build_time||'-1',10)*qty/myself.worldSpeed*1000)+'</span>\
			');
		}
		else{
			// Clear the Unit Subtotals.
			$('#'+unit+'Subtotal').html('');
		}
	}
		
	// Refresh Totals.
	$('#woodTotal').text(fnTotal('woodSubtotal'));
	$('#clayTotal').text(fnTotal('claySubtotal'));
	$('#ironTotal').text(fnTotal('ironSubtotal'));
	$('#popTotal').text(fnTotal('popSubtotal'));
	$('#barracksTotal').text(myself.formatTime(fnTimeTotal('barracks')/myself.worldSpeed*1000));
	$('#stableTotal').text(myself.formatTime(fnTimeTotal('stable')/myself.worldSpeed*1000));
	$('#garageTotal').text(myself.formatTime(fnTimeTotal('garage')/myself.worldSpeed*1000));
	
	if((typeof(autoSave)=='undefined')||autoSave){
		myself.save();

/* TODO: very slow on large village sets... perhaps add a refresh button or just run on initial script load
		myself.refreshVillages();
*/
	}
}; // MassRecruit::refreshUnit
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

MassRecruit.prototype.refreshVillages=function(){
	var myself=this;
	var win=(window.main||window),$=win.$;
	
	$.twUtil().debug('CALL: '+myself.id+'::refreshVillages');

	// ........................................................................
	function arrayMin(array){
		$.twUtil().debug('CALL: arrayMin');

		if(array&&(array.length>0)){
			var value=array[0];

			for(var t=1;t<array.length;t++){
				if(array[t]<value){
					value=array[t];
				}
			}
			
			return value;
		}

		return false;
	} // arrayMin
	// ........................................................................
	function linearDivideArray(array1,array2){
		$.twUtil().debug('CALL: linearDivideArray');

		var value=[];
		
		if(array1.length===array2.length){
			for(var t=0;t<array1.length;t++){
				value.push((array2[t]>0)?array1[t]/array2[t]:0);
			}
		}

		return value;
	} // linearDivideArray
	// ........................................................................
	function getMaxTrain(index){
		$.twUtil().debug('CALL: getMaxTrain');

		var value=[0,0,0,0,0,0,0,0,0,0];
		var data,maxQty;
		
		if(massmode){
			$('#mass_train_table tr:eq('+index+') td:has(input[type="text"][name*="units"])').each(function(i,e){
				maxQty=$(e).find('a[href*="set_max"]').text().match(/\((\d+)\)/);
				value[i]+=parseInt(maxQty?maxQty[1]:0,10);
			});
		}
		else{
			$('table[class="vis"] tr td a[href*="set_max"]').each(function(i,e){
				value[units.indexOf(e.id.match(/(\w+)\_a/i)[1])]+=parseInt($(e).html().match(/\d+/)||'0',10);
			});
		}

		return value;
	} // getMaxTrain
	// ........................................................................
	function getQueue(index){
		$.twUtil().debug('CALL: getQueue');

		var value=[0,0,0,0,0,0,0,0,0,0];
		var data,qty,pp;
		
		if(massmode){
			$('#mass_train_table tr:eq('+index+') a img,#mass_train_table tr:eq('+index+') input:disabled[name*="units"]').each(function(i,e){
				value[i]+=parseInt(e.title||'0',10);
			});
		}
		else{
			$('table[class=vis] tr:has(a[href*="action=cancel"]) td:first-child').each(function(i,e){
				data=$(e).html().match(/(\d+)\s*([\w|\s]+)/i);
				if(data){
					qty=parseInt(data[1]||'0',10);
					pp=(qty>1)?unitsEN.indexOf(data[2]):unitsEN_singular.indexOf(data[2]);
					value[pp]+=qty;
				}
			});
		}

		return value;
	} // getQueue
	// ........................................................................
	function getResource(id){
		$.twUtil().debug('CALL: getResource('+id+')');

		return parseInt($('#'+id).text()||'0',10);
	} // getResource
	// ........................................................................
	function getResources(row){
		$.twUtil().debug('CALL: getResources');

		var value=[0,0,0,0];
	
		if(massmode){
			// HACK: IE doesn't like split('\n')
			var res=$($(row.cells[1]).html().replace(/\<br[\s|\/]*\s*\>/ig,'|')).text().split('|');

			value[0]=Math.max(0,parseInt(res[0].replace('.','')||'0',10)-parseInt(($('[class*="wood reserve"]').val()||'').match(/\d+/)||'0',10));
			value[1]=Math.max(0,parseInt(res[1].replace('.','')||'0',10)-parseInt(($('[class*="clay reserve"]').val()||'').match(/\d+/)||'0',10));
			value[2]=Math.max(0,parseInt(res[2].replace('.','')||'0',10)-parseInt(($('[class*="iron reserve"]').val()||'').match(/\d+/)||'0',10));
			value[3]=Math.max(0,getFarmSpace(row)-parseInt(($('[class*="pop reserve"]').val()||'').match(/\d+/)||'0',10));
		}
		else{
			value[0]=Math.max(0,getResource('wood')-parseInt(($('[class*="wood reserve"]').val()||'').match(/\d+/)||'0',10));
			value[1]=Math.max(0,getResource('stone')-parseInt(($('[class*="clay reserve"]').val()||'').match(/\d+/)||'0',10));
			value[2]=Math.max(0,getResource('iron')-parseInt(($('[class*="iron reserve"]').val()||'').match(/\d+/)||'0',10));
			value[3]=Math.max(0,getFarmSpace()-parseInt(($('[class*="pop reserve"]').val()||'').match(/\d+/)||'0',10));
		}

		return value;
	} // getResources
	// ........................................................................
	function getFarmSpace(row){
		$.twUtil().debug('CALL: getFarmSpace');

		if(massmode){
			var farm=$(row.cells[2]).html().split('/');
			return Math.max(0,parseInt(farm[1],10)-parseInt(farm[0],10));
		}
		else{
			return Math.max(0,getResource('pop_max')-getResource('pop_current'));
		}
	} // getFarmSpace
	// ........................................................................
	function getProduced(index){
		$.twUtil().debug('CALL: getProduced');

		var value=[0,0,0,0,0,0,0,0,0,0];
		var data,unit;

		if(massmode){
			$('#mass_train_table tr:eq('+index+') td div').each(function(i,e){
				value[i]=parseInt($.trim($(e).text()).match(/\d+/)||'0',10);
			});
		}
		else{
			$('table[class*="vis"] tr:has(td a[href*="popup_scroll"])').each(function(i,e){
				unit=$(e).html().match(/unit\=(\w+)/i);
				if(unit){
					data=((e.cells.length>1)?$(e.cells[6]).html():'0/0').match(/(\d+)\/(\d+)/);
					value[units.indexOf(unit[1])]=parseInt(data[2]||'0',10);
				}
			});
		}

		return value;
	} // getProduced
	// ........................................................................
	
	if(win.game_data.screen != 'train'){
		win.location = win.game_data.link_base_pure.replace(/screen\=\w*/i,'screen=train') + '&mode=mass';
		throw('');
	}
	
	var massmode=(win.location.href.match(/mode\=mass/i)!==null);
	
	var total_costs=[0,0,0,0];
	var resourceIDs=['wood','stone','iron','pop'];
	var ii,jj;
	var factor;
	var number;
	var queue=[];
	var produced=[];
	var resources=[];
	var maxTrain=[];
	var subconf;
	var inputBox;

	// TODO: add multi-lingual support.
	var unitsEN=['Spear fighters','Swordsmen','Axemen','Archers','Scouts','Light cavalry','Mounted archers','Heavy cavalry','Rams','Catapults'];
	var unitsEN_singular=['Spear fighter','Swordsman','Axeman','Archer','Scout','Light cavalry','Mounted archer','Heavy cavalry','Ram','Catapult'];
	if(!$.twConfig().hasArchers){
		unitsEN.splice(6,1);
		unitsEN.splice(3,1);
		unitsEN_singular.splice(6,1);
		unitsEN_singular.splice(3,1);
	}
	
	function fnRecruitTroops(ele,index){
		subconf=[];
		$.twUtil().debug('CALL: fnRecruitTroops');

		myself.units.forEach(function(e,i){
			subconf.push(parseInt($('[class*="'+e+' unitQty"]').val()||'0',10));
		});
		
		total_costs=[0,0,0,0];
		resources=getResources(ele);
		queue=getQueue(index);
		produced=getProduced(index);
		maxTrain=getMaxTrain(index);
		
		myself.units.forEach(function(e,i){
			subconf[i]=Math.min(maxTrain[i],Math.max(0,subconf[i]-(queue[i]+produced[i])));

			for(jj=0;jj<resourceIDs.length;jj++){
				total_costs[jj]+=parseInt($.twConfig().units[e][resourceIDs[jj]]||'-1',10)*subconf[i];
			}
		});
		
		factor=arrayMin(linearDivideArray(resources,total_costs));
		if(factor > 1.0){
			factor=1.0;
		}
		
		myself.units.forEach(function(e,i){
			number=Math.min(subconf[i],Math.floor(subconf[i]*factor));
			
			inputBox=massmode?ele.cells[3+i].childNodes[3]:$('#'+e)[0];
			if(inputBox){
				inputBox.value=number;
				inputBox.defaultValue=number;
			}
		});
	}
	
	if(massmode){
		// Accomadate the 3 injected rows.
		var injectedRows=3;
		$('#mass_train_table tr:gt('+injectedRows+')').each(function(i,e){fnRecruitTroops(e,i+1+injectedRows);});
	}
	else{
		fnRecruitTroops();
	}

	$('input[value="Recruit"]').focus();
}; // MassRecruit::refreshVillages
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

MassRecruit.prototype.configChange=function(e){
	var win=(window.main||window);
	var myself=this;

	$.twUtil().debug('CALL: '+myself.id+'::configChange');

	var evt=(win.event||e);
	var sender=(evt.srcElement||evt);
	myself.refreshUnit(sender);
}; // MassRecruit::configChange
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

MassRecruit.prototype.load=function(groupID){
	var myself=this;
	var win=(window.main||window),$=win.$;
	
	$.twUtil().debug('CALL: '+myself.id+'::load');

	var data=$.twCache().fetch(win.twsfwConfig.id+myself.id+'::'+(groupID||(win.location.href.match(/group\=(\d+)/i)||[null,win.game_data.village.group])[1]));
	data=(data||'').split('|');
	if(data&&(data.length>0)){
		$('[class*="mrInput"]').each(function(i,e){
			$(e).val(data[i]);
		});

		$('[class*="unitQty"]').each(function(i,e){
			myself.refreshUnit(e,false);
		});

		myself.refreshVillages();
	}
}; // MassRecruit::load
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

MassRecruit.prototype.save=function(groupID){
	var myself=this;
	var win=(window.main||window),$=win.$;
	
	$.twUtil().debug('CALL: '+myself.id+'::save');

	var data=[];
	$('[class*="mrInput"]').each(function(i,e){
		data.push(($(e).val()||'').match(/\d+/)||'0');
	});
	
	$.twCache().store(win.twsfwConfig.id+myself.id+'::'+(groupID||(win.location.href.match(/group\=(\d+)/i)||[null,win.game_data.village.group])[1]),data.join('|'));
}; // MassRecruit::save
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
		
MassRecruit.prototype.execute=function(){
	var myself=this;
	var win=(window.main||window),$=win.$;
	
	$.twUtil().debug('CALL: '+myself.id+'::execute');

	myself.units=[];
	$('#mass_train_table tr:first th img[src*="unit_"]').each(function(i,e){
		myself.units.push(e.src.match(/unit\_(\w+)\.png/i)[1]);
	});
	
	myself.worldSpeed=parseInt($.twConfig().world.speed||'1',10);
	myself.unitLocations={'spear':0,'sword':0,'archer':0,'axe':0,'spy':1,'light':1,'marcher':1,'heavy':1,'ram':2,'catapult':2};
	myself.unitBuildings=['barracks','stable','garage'];
	myself.unitBuildingsEN=['barracks','stable','workshop'];
	myself.buildTimes={'barracks':{'min':24,'max':96},'stable':{'min':24,'max':48},'garage':{'min':24,'max':48}};
		
	function fnInjectGUI(){
		$.twUtil().debug('CALL: fnInjectGUI');

		// Delete the existing Configuration.
		$('[class*="mrRow"]').remove();
		
		var srcHTML='';
		
		srcHTML+='\
			<tr class="mrRow nowrap info row_b">\
				<td>\
					<b>Group: '+$('table[class*="vis"]:has(a[href*="group="])').html().match(/[>|&gt;]([^>;]+?)&lt;/)[1]+'</b>\
					<br/>\
		';
			
		myself.unitBuildings.forEach(function(e,i){
			srcHTML+='\
					<img src="/graphic/buildings/'+e+'.png" alt="'+myself.unitBuildingsEN[i]+' queue length target (min - max) (hours)"/>\
					<input value="'+myself.buildTimes[e].min+'" class="mrInput '+e+' minTime" size="2" style="text-align:right;"/>\
					-\
					<input value="'+myself.buildTimes[e].max+'" class="mrInput '+e+' maxTime" size="2" style="text-align:right;"/>\
					(hrs)\
					<br/>\
			';
		});
		srcHTML+='\
				</td>\
		';

		srcHTML+='\
				<td>\
					<b>Reserve:</b>\
					<br/>\
					<img src="/graphic/holz.png" alt="wood"/>\
					<input value="0" class="mrInput wood reserve" size="2" style="text-align:right;"/>\
					,000\
					<br/>\
					<img src="/graphic/lehm.png" alt="clay"/>\
					<input value="0" class="mrInput clay reserve" size="2" style="text-align:right;"/>\
					,000\
					<br/>\
					<img src="/graphic/eisen.png" alt="iron"/>\
					<input value="0" class="mrInput iron reserve" size="2" style="text-align:right;"/>\
					,000\
				</td>\
				<td>\
					<img src="/graphic/face.png" alt="farm space reserve"/>\
					<input value="0" class="mrInput pop reserve" size="2" style="text-align:right;"/>\
				</td>\
		';

		myself.units.forEach(function(e,i){
			srcHTML+='\
				<td><input value="0" class="mrInput '+e+' unitQty" size="3" style="text-align:right;"/></td>\
			';
		});
		
		srcHTML+='\
			</tr>\
		';
		
		srcHTML+='\
			<tr class="mrRow nowrap info row_a">\
				<td>\
					<b>Total Costs:</b>\
					<br/>\
					<img src="/graphic/buildings/barracks.png" alt="barracks queue total time for this config (hours)"/>\
					<span id="barracksTotal">'+myself.formatTime(0)+'</span>\
					<br/>\
					<img src="/graphic/buildings/stable.png" alt="stable queue total time for this config (hours)"/>\
					<span id="stableTotal">'+myself.formatTime(0)+'</span>\
					<br/>\
					<img src="/graphic/buildings/garage.png" alt="workshop queue total time for this config (hours)"/>\
					<span id="garageTotal">'+myself.formatTime(0)+'</span>\
				</td>\
				<td>\
					<img src="/graphic/holz.png" alt="total wood"/>\
					<span id="woodTotal">0</span>\
					<br/>\
					<img src="/graphic/lehm.png" alt="total clay"/>\
					<span id="clayTotal">0</span>\
					<br/>\
					<img src="/graphic/eisen.png" alt="total iron"/>\
					<span id="ironTotal">0</span>\
				</td>\
				<td>\
					<img src="/graphic/face.png" alt="total farm space"/>\
					<span id="popTotal">0</span>\
				</td>\
		';
		
		myself.units.forEach(function(e,i){
			srcHTML+='\
				<td id="'+e+'Subtotal"></td>\
			';
		});		
		
		srcHTML+='\
			</tr>\
		';
		
		srcHTML+='\
			<tr class="mrRow nowrap info row_b">\
				<td>\
					<b>World Settings:</b>\
					<br/>\
					'+win.location.hostname+'\
				</td>\
				<td>\
					<b>World Speed:</b>\
					<br/>\
					x'+myself.worldSpeed+'\
				</td>\
				<td>\
					<img src="/graphic/unit_big/archer'+($.twConfig().hasArchers?'':'_cross')+'.png" alt="Archer World?"/>\
				</td>\
		';
		
		myself.units.forEach(function(e,i){
			srcHTML+='\
				<td>\
					<img src="/graphic/holz.png" alt="wood"/>'+$.twConfig().units[e].wood+'<br/>\
					<img src="/graphic/lehm.png" alt="clay"/>'+$.twConfig().units[e].stone+'<br/>\
					<img src="/graphic/eisen.png" alt="iron"/>'+$.twConfig().units[e].iron+'<br/>\
					<img src="/graphic/face.png" alt="farm space"/>'+$.twConfig().units[e].pop+'<br/>\
					<img src="/graphic/buildings/'+myself.unitBuildings[myself.unitLocations[e]]+'.png" alt="queue time"/>'+myself.formatTime(parseInt($.twConfig().units[e].build_time||'-1',10)/myself.worldSpeed*1000)+'\
				</td>\
			';
		});
		
		srcHTML+='\
			</tr>\
		';

		// Injection.
		$(srcHTML).insertBefore($('#mass_train_table tr:eq(1)'));

		// Bind onkeyup Events.
		$('[class*="mrInput"]').keyup(function(){myself.configChange.call(myself,true);});
	}
	
	fnInjectGUI();
	myself.load();
}; // MassRecruit::execute
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
