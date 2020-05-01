/**
 *	IncomingFilters.js
 *	extra optional filters for incoming overview:
		+ hide previously tagged attacks
		+ only show attacks within a specified timeframe
		
 *	last updated: April 13, 2014
 *	game compatibility:	version	20502 8.23
 *	@author		Nick Toby (cheesasaurus@gmail.com)

  ==== pages where this can be used ==== 
 * incoming overview (game.php?screen=incoming)
  
 ==== changelog ====
 *	14 may 2014 - released
 
 
 ==== license ====
 *	Copyright (C) 2014  Nick Toby

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see http://www.gnu.org/licenses/
 */

if(!twcheese)
	var twcheese={};
	
twcheese.IncomingFilters = {
	init: function () {
		this.createUI();
	},

	/**
	 *	remove from the page, attacks that have already been renamed
	 */
	filterTagged: function () {
		var table = document.getElementById('incomings_table');
		var count = 0;
		for (var row=1; row < table.rows.length-1; row++) {
			var name = $(table.rows[row]).find('.quickedit-label').text().trim();
			if (name != 'Attack') {
				$(table.rows[row]).remove();
				count++;
				row--;
			}
		}
		return count;
		//UI.InfoMessage(count+ ' previously tagged attacks have been filtered out.', 5000, 'success');
	},
	
	filterTime: function (from, to) {
		var table = document.getElementById('incomings_table');
		var count = 0;
		for (var row=1; row < table.rows.length-1; row++) {
			var time = twcheese.time.fromRelative($(table.rows[row].cells[5]).text());
			if (from) {
				if (time < from) {
					$(table.rows[row]).remove();
					count++;
					row--;
					continue;
				}
			}			
			if (to) {
				if (time > to) {
					$(table.rows[row]).remove();
					row--;
					count++;
				}
			}
		}
		return count;
		//UI.InfoMessage(count+ ' attacks have been filtered out.', 5000, 'success');		
	},
	
	applyFilters: function () {		
		try {
			var from = $('#twcheese_filter_timefrom').val();
			if (from == '') {
				from = false;
			} else {
				from = twcheese.time.fromString(from);
			}
			
			var to = $('#twcheese_filter_timeto').val();
			if (to == '') {
				to = false;
			} else {
				to = twcheese.time.fromString(to);
			}	
		} catch(e) {
			UI.InfoMessage('Invalid time specified', 3000, 'error');
			throw e;
		}		
		
		var count = 0;
		if ($('#twcheese_filter_tagged').prop('checked') == true) {
			count+= twcheese.IncomingFilters.filterTagged();
		}
		
		count+= twcheese.IncomingFilters.filterTime(from, to);
		
		UI.InfoMessage(count+ ' attacks have been filtered out.', 5000, 'success');
		$('#twcheese_filters').remove();
	},
	
	createUI: function () {
		var html = '<div id="twcheese_filters" style="position:fixed; top: 80px; left: 50px; background-color:#ebd7ac; padding: 5px; border: 1px solid black;">' +
			'<h3>Extra Filters</h3>' +
			
			'<div style="padding-bottom: 5px;">minimum arrival time: <input type="text" id="twcheese_filter_timefrom"></input></div>' +
			'<div style="padding-bottom: 5px;">maximum arrival time: <input type="text" id="twcheese_filter_timeto"></input></div>' +
			'<div style="padding-bottom: 5px;"><input type="checkbox" id="twcheese_filter_tagged"></input> hide attacks that have already been tagged</div>' +
			'<br/><a class="btn btn-default" onclick="twcheese.IncomingFilters.applyFilters()">Filter</a>' +
		'</div>';
		
		$('#contentContainer').append(html);
	}
};

twcheese.time = {
	/**
	 *	@return time:Date	the current server time
	 */
	getCurrent: function () {
		var time = Timing.getCurrentServerTime();
		var d = new Date();
		var offset = d.getTimezoneOffset()*60*1000;
		return new Date(time + offset);
	},
	
	/**
	 *	@param ele:HTMLElement - an element containing the relative time (today, tomorrow, etc).
	 *	@return time:Date
	 */
	fromRelative: function (text) {
		var time = this.getCurrent();
		
		var ms = text.match(/[0-9]{1,}/g).pop();
		var timeString = text.match(/[0-9]{1,2}\:[0-9]{2}\:[0-9]{2}/)[0];
		var hours = timeString.split(':')[0];
		var minutes = timeString.split(':')[1];
		var seconds = timeString.split(':')[2];
		
		if (text.search(twcheese.language['time']['today']) != -1) {
			//use today's year, month, and day			
		}
		else if (text.search(twcheese.language['time']['tomorrow']) != -1) {
			time = new Date(time.getTime() + 24*60*60*1000);
		} else {
			var dateString = text.match(/[0-9]{2}.[0-9]{2}./)[0];
			var day = dateString.split('.')[0];
			var month = Number(dateString.split('.')[1]-1);
			time.setMonth(month, day);
		}
		
		time.setMilliseconds(ms);
		time.setSeconds(seconds);
		time.setMinutes(minutes);
		time.setHours(hours);
		return time;
	},
	
	/**
	 *	@param text:String	- time with a specific date.
	 *	@return time:Date
	 */
	fromAbsolute: function (text) {
		var time = new Date();
		
		if (game_data.market == 'cz') {
			var targetString = text;
			var numbers = targetString.match(/[0-9]{1,}/g);

			sent.setSeconds(numbers[5]);
			sent.setMinutes(numbers[4]);
			sent.setHours(numbers[3]);
			sent.setMonth(numbers[1]-1,numbers[0]);
			sent.setYear('20' + numbers[2]);
		} else {
			var numbers = text.match(/[0-9]{1,}/g);
			var month = text.match(/\w{3,}/);					
			for (var m=0; m<12; m++) {
				if (month == twcheese.language['months'][m]) {
					break;
				}
			}

			if (numbers[5]) {
				time.setMilliseconds(numbers[5]);
			}
			time.setSeconds(numbers[4]);
			time.setMinutes(numbers[3]);
			time.setHours(numbers[2]);
			time.setMonth(m, numbers[0]);
			time.setYear(numbers[1]);
		}
		return time;
	},
	
	fromString: function (text) {
		if (text.search(twcheese.language['time']['at'])) {
			return this.fromRelative(text);
		} else {
			return this.fromAbsolute(text);
		}
	}
};

/*==== language ====*/
if(!twcheese.language)
	twcheese.language = {};	
if(!twcheese.language.months)
	twcheese.language.months = [];
if(!twcheese.language.time)
	twcheese.language.time = [];
switch(game_data.market)
{
	default:			
		/*==== tribalwars.net, tribalwars.us, tribalwars.co.uk, beta.tribalwars.net ====*/
		twcheese.language['months'][0] = 'Jan';
		twcheese.language['months'][1] = 'Feb';
		twcheese.language['months'][2] = 'Mar';
		twcheese.language['months'][3] = 'Apr';
		twcheese.language['months'][4] = 'May';
		twcheese.language['months'][5] = 'Jun';
		twcheese.language['months'][6] = 'Jul';
		twcheese.language['months'][7] = 'Aug';
		twcheese.language['months'][8] = 'Sep';
		twcheese.language['months'][9] = 'Oct';
		twcheese.language['months'][10] = 'Nov';
		twcheese.language['months'][11] = 'Dec';
		
		twcheese.language['time']['at'] = 'at';
		twcheese.language['time']['tomorrow'] = 'tomorrow';
		twcheese.language['time']['today'] = 'today';
		break;
		
	case 'cz':
		/*==== divokekmeny.cz/ ====*/		
		twcheese.language['months'][0] = 'Jan';
		twcheese.language['months'][1] = 'Feb';
		twcheese.language['months'][2] = 'Mar';
		twcheese.language['months'][3] = 'Apr';
		twcheese.language['months'][4] = 'May';
		twcheese.language['months'][5] = 'Jun';
		twcheese.language['months'][6] = 'Jul';
		twcheese.language['months'][7] = 'Aug';
		twcheese.language['months'][8] = 'Sep';
		twcheese.language['months'][9] = 'Oct';
		twcheese.language['months'][10] = 'Nov';
		twcheese.language['months'][11] = 'Dec';
		
		twcheese.language['time']['at'] = 'at'; //todo
		twcheese.language['time']['tomorrow'] = 'tomorrow'; //todo
		twcheese.language['time']['today'] = 'today'; //todo
		break;
		
	case 'se':
		twcheese.language['months'][0] = 'Jan';
		twcheese.language['months'][1] = 'Feb';
		twcheese.language['months'][2] = 'Mar';
		twcheese.language['months'][3] = 'Apr';
		twcheese.language['months'][4] = 'Maj';
		twcheese.language['months'][5] = 'Jun';
		twcheese.language['months'][6] = 'Jul';
		twcheese.language['months'][7] = 'Aug';
		twcheese.language['months'][8] = 'Sep';
		twcheese.language['months'][9] = 'Okt';
		twcheese.language['months'][10] = 'Nov';
		twcheese.language['months'][11] = 'Dec';
		
		twcheese.language['time']['at'] = 'at'; //todo
		twcheese.language['time']['tomorrow'] = 'tomorrow'; //todo
		twcheese.language['time']['today'] = 'today'; //todo
		break;
		
	/*==== fyletikesmaxes.gr/ ====*/
	case 'gr':
		twcheese.language['months'][0] = 'Ιαν';
		twcheese.language['months'][1] = 'Φεβ';
		twcheese.language['months'][2] = 'Μαρ';
		twcheese.language['months'][3] = 'Απρ';
		twcheese.language['months'][4] = 'Μαι';
		twcheese.language['months'][5] = 'Ιον';
		twcheese.language['months'][6] = 'Ιολ';
		twcheese.language['months'][7] = 'Αυγ';
		twcheese.language['months'][8] = 'Σεπ';
		twcheese.language['months'][9] = 'Οκτ';
		twcheese.language['months'][10] = 'Νοε';
		twcheese.language['months'][11] = 'Δεκ';
		
		twcheese.language['time']['at'] = 'at'; //todo
		twcheese.language['time']['tomorrow'] = 'tomorrow'; //todo
		twcheese.language['time']['today'] = 'today'; //todo
		break;
	
	/* the market where Arma plays :D */
	case 'hr':
		twcheese.language['months'][0] = 'Sij';
		twcheese.language['months'][1] = 'Vel';
		twcheese.language['months'][2] = 'Ožu';
		twcheese.language['months'][3] = 'Tra';
		twcheese.language['months'][4] = 'Svi';
		twcheese.language['months'][5] = 'Lip';
		twcheese.language['months'][6] = 'Srp';
		twcheese.language['months'][7] = 'Kol';
		twcheese.language['months'][8] = 'Ruj';
		twcheese.language['months'][9] = 'Lis';
		twcheese.language['months'][10] = 'Stu';
		twcheese.language['months'][11] = 'Pro';
		
		twcheese.language['time']['at'] = 'at'; //todo
		twcheese.language['time']['tomorrow'] = 'tomorrow'; //todo
		twcheese.language['time']['today'] = 'today'; //todo
		break;
}

/*==== register ====*/
var script = {
	scriptname: 'filter incomings',
	version: 8.23,
	author: 'Nicholas Toby',
	email: 'cheesasaurus@gmail.com',
	broken: false
};
$.post(ScriptAPI.url,script);

/*==== main ====*/
if (game_data.screen == 'overview_villages' && game_data.mode == 'incomings') {
	twcheese.IncomingFilters.init();
} else {
	UI.InfoMessage('Going to Incoming overview ...');
	document.location = game_data.link_base_pure + 'overview_villages&mode=incomings';
}