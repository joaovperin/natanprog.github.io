/* 
	Author	: Dale McKay
	Email	: dalesmckay@gmail.com
	Purpose	: To help select supported villages based on user defined search criteria.
	Credit	: 
	Todo	:
	Notes	:
	

	######################
	Client Launcher (live):
	######################
	
javascript:(window.main||self).$.getScript('http://dl.dropbox.com/u/25377948/twscripts/withdraw_support.js',function(){var script=new WithdrawSupport();script.execute();});void(0);

____________________________________________________________

Copyright (C) 2011 Dale McKay, all rights reserved
version 1.0, 1 May 2011

This software is provided 'as-is', without any express or implied warranty. In no event will the author be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:
The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
This notice may not be removed or altered from any source distribution.
____________________________________________________________
*/

function WithdrawSupport(){
	var myself=this;
	var win=(window.main||window),$=win.$;
	
	var script={
		name:'Withdraw Support',
		version:1.04,
		minGameVersion:7.00,
		author:{
			name:'dalesmckay',
			email:'dalesmckay@gmail.com'
		}
	};
	
	function fnEscape(value){return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,'\\$&');}
	
	function fnSelectVillages(){
		var isOk,obj;
		var kind=$('option.dsm:selected').val();
		var mask=fnEscape($('#dsmValue').val());
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
	}

	function fnInjectControls(){
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
						'<input id="dsmSelect" type="button" value="Select"/>'+
					'</div>'
				);
				
				$('#dsmSelect').click(function(){fnSelectVillages();});
			}
		}
	}

	return{
		execute:function(){
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
				alert('Redirecting to the correct screen...\nRun the script again.');
				win.location=win.game_data.link_base_pure.replace(/screen\=\w*/i,'screen=overview_villages&mode=units&type=away_detail&filter_villages=1');
			}
		}
	};
}