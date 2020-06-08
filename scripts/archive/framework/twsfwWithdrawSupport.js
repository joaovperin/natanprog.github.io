/* 
	Author	: Dale McKay
	Email	: dalesmckay@gmail.com
	Purpose	: To be able to quickly withdraw support in other villages using custom filtering.
	Credit	: 
	Todo	:
	Notes	:
____________________________________________________________

Copyright (C) 2011 Dale McKay, all rights reserved
version 1.0, 19 April 2011

This software is provided 'as-is', without any express or implied warranty. In no event will the author be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:
The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
This notice may not be removed or altered from any source distribution.
____________________________________________________________
*/

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Class: WithdrawSupport
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
function WithdrawSupport(){
	var win=(window.main||window),$=win.$;
	var myself=this;
	
	var script={
		name:'Withdraw Support Script',
		version:1.00,
		minGameVersion:7.00,
		author:{
			'name':'dalesmckay',
			'email':'dalesmckay@gmail.com'
		},
		runOnce:true
	};
	
	// ........................................................................
	function fnSelect(){
		$.twUtil().debug('CALL: '+myself.id+'->fnSelect');

		var isOk,obj;
		var kind=$('option.dsm:selected').val();
		var mask=$('#dsmValue').val();
		var regEx=new RegExp(mask,'i');
		$('span:has(.village_checkbox)').each(function(i,e){
			isOk=false;
		
			if(kind=='*'){
				isOk=($(e).text().match(regEx)!==null);
			}
			else{
				obj=$(e).find('a[href*="info_'+kind+'"]');
				isOk=((obj.length>0)&&(obj.text().match(regEx)));
			}
		
			if(isOk){
				$(e).find('.village_checkbox').attr('checked',true);
			}
		});
	
		$('input[name="submit_units_back"]').focus();
	} //fnSelect
	// ........................................................................
	function fnInjectControls(){
		$.twUtil().debug('CALL: '+myself.id+'->fnInjectControls');
		
		if($('#dsmInject').length<=0){
			var cell=$('#units_table tr:eq(0) th:eq(0)');
			if(cell.length>0){
				cell.html(cell.html()+
					'<div id="dsmInject">'+
						'<select>'+
							'<option class="dsm" value="*" selected>All</option>'+
							'<option class="dsm" value="village">Village</option>'+
							'<option class="dsm" value="player">Player</option>'+
							'<option class="dsm" value="ally">Tribe</option>'+
						'</select>'+
						'<input id="dsmValue"/>'+
						'<input type="button" value="Select" id="dsmSelect"/>'+
					'</div>'
				);
			}
		}
		
		$('#dsmSelect').click(function(){fnSelect();});
	} //fnInjectControls
	// ........................................................................
	function fnScript(){
		$.twUtil().debug('CALL: '+myself.id+'::execute');
		
		var url=win.location.href;

		if(
			url.match(/screen\=overview\_villages/i)&&
			url.match(/mode\=units/i)&&
			(url.match(/type\=away\_detail/i)||url.match(/type\=support\_detail/i))&&
			url.match(/filter\_villages\=1/i)
		){
			fnInjectControls();
		}
		else{
			alert('Updating settings...\nPlease run this script again.');
			win.location=win.game_data.link_base_pure.replace(/screen\=\w*/i,'screen=overview_villages&mode=units&type=away_detail&filter_villages=1');
		}
	} //fnScript
	// ........................................................................
	
	return $.extend({id:'WithdrawSupport',execute:function(fwExt){fnScript.call($.extend({},myself,script,fwExt));}},script);
} // WithdrawSupport::constructor
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
