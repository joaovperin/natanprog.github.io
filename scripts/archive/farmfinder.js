/* 
	Author	: Dale McKay
	Email	: dalesmckay@gmail.com
	Purpose	: To help identify potential Farms on the Map Screen.
	Credit	: 
	Todo	:
		* Add a GUI
		* Persistent configuration
		* Add the map highlighter
		* Add the map Co-ordinate Picker
		* Add the Vizualizer (to graph co-ordinates)
	Notes	:
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
// Class: FarmFinder
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
function FarmFinder(){
	var myself=this;
	
	var script={
		name:'Farm Finder Script',
		version:2.04,
		minGameVersion:7.00,
		author:{
			'name':'dalesmckay',
			'email':'dalesmckay@gmail.com'
		},
		runOnce:false
	};
	// ........................................................................
	function fnScript(){
		// Use 'this' to get correct context.
		this.execute();
	} // fnScript
	// ........................................................................

	return $.extend({id:'FarmFinder',execute:function(fwExt){fnScript.call($.extend({},myself,script,fwExt));}},script);
} // FarmFinder::constructor
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FarmFinder.prototype.execute=function(){
	var myself=this;
	var win=(window.main||window),$=win.$;

	$.twUtil().debug('CALL: '+myself.id+'::execute');
	

	function zeroPad(number,length){var n=number.toString();while(n.length<length){n="0"+n;}return n;}
		
	var radius=0.0;
	var barb_size={min:0,max:0};
	var village_size={min:0,max:500};

	var coords=[];
	var col,row,coord,village,player,tribe,points;
	var home=win.game_data.village.coord.split("|").map(function(x){return parseInt(x,10);});
		
	for(row=0;row<TWMap.size[1];row++){
		for(col=0;col<TWMap.size[0];col++){
			coord=TWMap.map.coordByPixel(
				TWMap.map.pos[0]+(TWMap.tileSize[0]*col),
				TWMap.map.pos[1]+(TWMap.tileSize[1]*row)
			);
				
			if(coord){
				coord=coord.map(function(e){return zeroPad(e,3);});

				village=TWMap.villages[coord.join("")];
				if(village){
					player=null;
					if(parseInt(village.owner||"0",10)){
						player=TWMap.players[village.owner];
					}
						
					points=parseInt(village.points.replace(".",""),10);
					if(player){
						if(player.id!=win.game_data.player.id){
							if((player.ally>0)&&(player.ally!=win.game_data.ally_id)){
								if((!village_size.min||(points>=village_size.min))&&(!village_size.max||(points<=village_size.max))){
									coords.push(coord.join("|"));
								}
							}
						}
					}
					else{
						if((!barb_size.min||(points>=barb_size.min))&&(!barb_size.max||(points<=barb_size.max))){
							coords.push(coord.join("|"));
						}
					}
				}
			}
		}
	}
		
	if(radius>0.0){
		coords=coords.filter(function(item,index,arr){
			var aa=item.split("|").map(function(x){return parseInt(x,10);});
			return(Math.sqrt(Math.pow(home[0]-aa[0],2)+Math.pow(home[1]-aa[1],2))<=radius);
		});
	}
	
	coords=coords.sort(function(a,b){
		var aa=a.split("|").map(function(x){return parseInt(x,10);});
		bb=b.split("|").map(function(x){return parseInt(x,10);});
		return(Math.sqrt(Math.pow(home[0]-aa[0],2)+Math.pow(home[1]-aa[1],2))-Math.sqrt(Math.pow(home[0]-bb[0],2)+Math.pow(home[1]-bb[1],2)));
	});
	
	alert((coords.length>0)?coords.join(" "):"No villages match the Criteria");
}; // FarmFinder::execute
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
