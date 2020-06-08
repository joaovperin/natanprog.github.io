/* overview.combined.sort.js */
/* 
	Author	: Jason Farmer (SlowTarget)
	Email	: jason@problemsolver.co.uk
	Notes	: This script adds jquery datatables to the overviews allowing sorting and filtering
	
	TODO	: stripey table... $("#mytable tr:odd").addClass("alt"); -- datatables does this so no need - just need to point it at the right css
				http://jamiethompson.co.uk/web/2008/07/21/jquerygetscript-does-not-cache/
				custom sorts for date columns
				custom sorts/splits for all columns that contain more than one sortable item
____________________________________________________________

Copyright (C) 2011 Jason Farmer, all rights reserved
version 1.0, 12 April 2011

This software is provided 'as-is', without any express or implied warranty. In no event will the author be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:
The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
This notice may not be removed or altered from any source distribution.
____________________________________________________________

http://zz2.beta.tribalwars.net/game.php?village=10146&screen=overview_villages&mode=combined
http://zz2.beta.tribalwars.net/game.php?village=10146&screen=overview_villages&mode=prod
http://zz2.beta.tribalwars.net/game.php?village=10146&screen=overview_villages&mode=trader
http://zz2.beta.tribalwars.net/game.php?village=10146&screen=overview_villages&mode=units
http://zz2.beta.tribalwars.net/game.php?village=10146&screen=overview_villages&mode=commands
http://zz2.beta.tribalwars.net/game.php?village=10146&screen=overview_villages&mode=incomings
http://zz2.beta.tribalwars.net/game.php?village=10146&screen=overview_villages&mode=buildings
http://zz2.beta.tribalwars.net/game.php?village=10146&screen=overview_villages&mode=tech
http://zz2.beta.tribalwars.net/game.php?village=10146&screen=overview_villages&mode=groups
!! game_data.mode will be null when revisiting the overview page using the main overview link

javascript:(window.main||window).$('.overview_table').each(function(count){alert(count+" "+this.id + " " + this.rows.length)});void 0; 
*/

	//var $=(window.main||window).$;
	$.ajaxSetup({ cache: true }); // we want these static scripts and css cached - by default getScript does not cache
	$('<link rel="stylesheet" type="text/css" href="http://dl.dropbox.com/u/1375102/TribalWars/scripts/trunk/scripts/sort/css/demo_table.css" >').appendTo("head");
	$.getScript("http://dl.dropbox.com/u/1375102/TribalWars/scripts/trunk/DataTables-1.7.6/media/js/jquery.dataTables.min.js",
				function(){					
					$('.overview_table').map(function(){
						/*props to http://aaron.jorb.in for this thead fix*/
						
						$(document).ready(function()
							{
						 $('.overview_table').prepend(
								$('<thead></thead>').append($('.overview_table tr:first').remove())
								);
						 		$('.overview_table > tbody > tr').removeClass('row_a row_b');
							}
						);
						$(document).ready(function(){$('.overview_table').dataTable({"bPaginate": false});});
					});
				});
	$.ajaxSetup({ cache: false });