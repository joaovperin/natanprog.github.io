/* 
	Author	: Dale McKay
	Email	: dalesmckay@gmail.com
	Purpose	: To provide a map overlay that displays the duration since a village was last attacked.
	Credit	: Rewrite of the script by LastApparatus (original concept was by an unKnown source).
	Todo	:
	Notes	:
	

	######################
	Client Launcher (live):
	######################
	
javascript:(window.main||self).$.getScript('http://dl.dropbox.com/u/25377948/twscripts/map_attack_overlay.js',function(){var script=new MapAttackOverlay();script.execute();});void(0);

____________________________________________________________

Copyright (C) 2011 Dale McKay, all rights reserved
version 1.0, 3 May 2011

This software is provided 'as-is', without any express or implied warranty. In no event will the author be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:
The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
This notice may not be removed or altered from any source distribution.
____________________________________________________________
*/

function MapAttackOverlay(){
	var myself=this;
	var win=(window.main||window),doc=win.document,$=win.$;
	var chainedFunc=null;
	
	var script={
		name:'Map Last Attack (overlay)',
		version:1.00,
		minGameVersion:7.00,
		author:{
			name:'dalesmckay',
			email:'dalesmckay@gmail.com'
		},
		credit:'(Complete rewrite of the Map Overlay Script by: LastApparatus)',
		runOnce:true
	};
	
	function fnOverlay(sector,data){
		var x,y,village,lastAttack,serverDate,now,delta,sec,min,hrs,days,reportTime,eleDIV;
		
		for(x in data.tiles){
			x=(parseInt(x,10));
			
			for(y in data.tiles[x]){
				y=parseInt(y,10);
				village=TWMap.villages[(data.x+x)*1000+data.y+y];

				if(village&&($('#dsm'+village.id).length<=0)&&TWMap.popup._cache[village.id]){
					village=TWMap.popup._cache[village.id];
					
					if(village.attack){
						lastAttack=new Date(village.attack.time.split(' o')[0]);
						serverDate=$('#serverDate').html().split('/');
						now=new Date(serverDate[1]+'/'+serverDate[0]+'/'+serverDate[2]+' '+$('#serverTime').html());
						delta=now.getTime()-lastAttack.getTime();

						sec=delta/1000;
						min=sec/60;
						hrs=Math.floor(min/60);
						days=Math.round(hrs/24);
						min=Math.floor(min)%(60);
						sec=Math.floor(sec)%(60);
		
						if(days>0){
							reportTime=days+' D';
						}
						else if(hrs>0){
							reportTime=hrs+' H';
						}
						else{
							reportTime=(min<10?'0':'')+min+':'+(sec<10?'0':'')+sec;
						}
		
						eleDIV=$('<div></div>')
							.css({
								border:'1px coral solid',
								position:'absolute',
								backgroundColor:((village.attack.max_loot==1)?'#40e0d0':'#f0fff0'),
								filter:'alpha(opacity=80)',
								opacity:'.8',
								mozOpacity:'.8',
								width:'53px',
								height:'12px',
								marginTop:'25px',
								display:'block',
								color:'black',
								zIndex:'10',
								fontWeight:'normal',
								textAlign:'center'
							})
							.attr('id','dsm'+village.id)
							.html(reportTime)
						;

						sector.appendElement(eleDIV[0],data.x+x-sector.x,data.y+y-sector.y);
					}
				}
			}
		}
	}

	function fnSpawnSectorHook(data,sector){
		if(chainedFunc){
			chainedFunc.call(this,data,sector);
		}
		
		$(doc).ajaxStop(function(){fnOverlay(sector,data);});
	}

	return{
		execute:function(){
			var url=win.location.href;

			if(url.match(/screen\=map/i)){
				if(!TWMap.dsmHook){
					TWMap.dsmHook=true;
					
					chainedFunc=TWMap.mapHandler.spawnSector;
					TWMap.mapHandler.spawnSector=fnSpawnSectorHook;
					TWMap.map.handler.spawnSector=fnSpawnSectorHook;
	
					TWMap.scriptMode=true;
					TWMap.map._loadedSectors={};
					TWMap.reload();
				}
			}
			else if(confirm('This option can only be used in the map!\nWould you like to be redirected automatically?')){
				win.location=win.game_data.link_base_pure.replace(/screen\=\w*/i,'screen=map');
			}
		}
	};
}