javascript:

/*	twcheese_BRE.js
 *	Battle Report Evaluator
 *	version 1.0_06
 *	game compatability: version 9750 6.5
 *	market: uk
 *	author Nick Toby (cheesasaurus@gmail.com)

 ==== when viewing a report ====
 *	use script on: game.php?screen=report&view=x (a report)
 *	effect: include some extra features on the page:
	-loyalty calculations
	-raiding calculator
	-remaining defense
	-opponents defeated
	-population summary
	-timing summary
	-twcheese's json encoded representation of the report (for copy+pasting somewhere that other scripts would interpret it)
	-renamer (limit of 256 characters?)

 ==== when viewing the reports folder, with the 'Attacks' filter on ====
 *	use script on:	game.php?screen=report&mode=attack
 *	effects:
		-mark checkboxes of reports with non-full hauls
		-include some extra features on the page:
			-links to 'attack again with same troops' from the current village
			-links to 'attack again with same troops' from the original attacking village (works with reports named in twcheese format)
			-distance to attacked village, from current village (works with reports that still have their default names, and reports named in twcheese format)
			-todo:
				-select details shown (with save as default option) (works with reports named in twcheese format)
				-show details
				-sort buttons		
 
 ==== license ====
 *	Copyright (C) 2010  Nick Toby

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

/*==== imagePaths ====*/

	var imagePaths = new Array();
	imagePaths['spear'] = 'http://' + document.domain + '/graphic/unit/unit_spear.png?1';
	imagePaths['sword'] = 'http://' + document.domain + '/graphic/unit/unit_sword.png?1';
	imagePaths['axe'] = 'http://' + document.domain + '/graphic/unit/unit_axe.png?1';
	imagePaths['archer'] = 'http://' + document.domain + '/graphic/unit/unit_archer.png?1';
	imagePaths['lcav'] = 'http://' + document.domain + '/graphic/unit/unit_light.png?1';
	imagePaths['acav'] = 'http://' + document.domain + '/graphic/unit/unit_marcher.png?1';
	imagePaths['hcav'] = 'http://' + document.domain + '/graphic/unit/unit_heavy.png?1';
	imagePaths['ram'] = 'http://' + document.domain + '/graphic/unit/unit_ram.png?1';;
	imagePaths['catapult'] = 'http://' + document.domain + '/graphic/unit/unit_catapult.png?1';;
	
	imagePaths['hq'] = 'http://' + document.domain + '/graphic/buildings/main.png?1';
	imagePaths['barracks'] = 'http://' + document.domain + '/graphic/buildings/barracks.png?1';
	imagePaths['stable'] = 'http://' + document.domain + '/graphic/buildings/stable.png?1';
	imagePaths['workshop'] = 'http://' + document.domain + '/graphic/buildings/garage.png?1';
	imagePaths['church'] = 'http://' + document.domain + '/graphic/buildings/church.png?1';
	imagePaths['church_f'] = 'http://' + document.domain + '/graphic/buildings/church.png?1';
	imagePaths['academy'] = 'http://' + document.domain + '/graphic/buildings/snob.png?1';
	imagePaths['smithy'] = 'http://' + document.domain + '/graphic/buildings/smith.png?1';
	imagePaths['rally'] = 'http://' + document.domain + '/graphic/buildings/place.png?1';
	imagePaths['statue'] = 'http://' + document.domain + '/graphic/buildings/statue.png?1';
	imagePaths['market'] = 'http://' + document.domain + '/graphic/buildings/market.png?1';
	imagePaths['timber'] = 'http://' + document.domain + '/graphic/buildings/wood.png?1';
	imagePaths['clay'] = 'http://' + document.domain + '/graphic/buildings/stone.png?1';
	imagePaths['iron'] = 'http://' + document.domain + '/graphic/buildings/iron.png?1';
	imagePaths['warehouse'] = 'http://' + document.domain + '/graphic/buildings/farm.png?1';
	imagePaths['farm'] = 'http://' + document.domain + '/graphic/buildings/storage.png?1';
	imagePaths['hiding'] = 'http://' + document.domain + '/graphic/buildings/hide.png?1';
	imagePaths['wall'] = 'http://' + document.domain + '/graphic/buildings/wall.png?1';
	
	imagePaths['repeatFromCurrent'] = 'http://' + document.domain + '/graphic/command/attack.png?1';
	imagePaths['repeatFromOriginal'] = 'http://' + document.domain + '/graphic/command/attack.png?1';	


/*==== templates ====*/

	/**
	 * Reinforcements template
	 * @attribute	troops:Array(spear,sword,archer,axe,scout,lcav,acav,hcav,ram,cat,paladin,noble)	- the troop count of the army supporting
	 * @attribute	village:Array(x,y,id)	- the information about the village being supported.
	 */
	function twcheese_Reinforcements()
	{
		this.troops = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
		this.village = new Array(0,0,0);
	}
	
	/**
	 *	object representation of a battle report
	 */
	function twcheese_BattleReport()
	{
		this.attacker;
		this.attackerLosses;
		this.attackerQuantity;
		this.attackerVillage;
		this.buildingLevels;
		this.defender;
		this.defenderLosses;
		this.defenderQuantity;
		this.defenderVillage;
		this.dot;
		this.espionageLevel;
		this.haul;
		this.loyalty;
		this.luck;
		this.morale;
		this.reportID;
		this.resources;
		this.sent;
		this.unitsInTransit;
		this.unitsOutside;
	}

/*==== report scraper functions ====*/

	/**
	 * reads an HTMLElement with the timber count, clay count, and iron count, and converts it to an array of Numbers
	 * @param	resElement:HTMLElement	the html of the resources
	 * @return	resources:Array(timber:Number,clay:Number,iron:Number)
	 */
	function twcheese_resElementToNumbers(resElement)
	{
		var resNames = new Array('Wood','Clay','Iron');
		var resources = new Array(0,0,0);		
		
		/*==== remove the grey periods ====*/
		while(resElement.getElementsByTagName('span').length > 0)
			resElement.removeChild(resElement.getElementsByTagName('span')[0]);
		
		/*==== set resources ====*/
		var images = resElement.getElementsByTagName('img');
		
		if(navigator.appName == 'Microsoft Internet Explorer') /* internet explorer */
		{
			for(var i=0; i < images.length; i++)
			{
				/*==== if timber image is found, set timber ====*/
				if(images[i].title == resNames[0])
					resources[0] = Number(images[i].nextSibling.data);
				
				/*==== if clay image is found, set clay ====*/
				if(images[i].title == resNames[1])
					resources[1] = Number(images[i].nextSibling.data);
				
				/*==== if iron image is found, set iron ====*/
				if(images[i].title == resNames[2])
					resources[2] = Number(images[i].nextSibling.data);
			}
		}
		else /* if(navigator.appName == 'Opera' || navigator.appName == 'Netscape') //opera, netscape */
		{
			for(var i=0; i < images.length; i++)
			{			
				/*==== if timber image is found, set timber ====*/
				if(images[i].title == resNames[0])
					resources[0] = Number(images[i].nextSibling.wholeText);
				
				/*==== if clay image is found, set clay ====*/
				if(images[i].title == resNames[1])
					resources[1] = Number(images[i].nextSibling.wholeText);
				
				/*==== if iron image is found, set iron ====*/
				if(images[i].title == resNames[2])
					resources[2] = Number(images[i].nextSibling.wholeText);
			}
		}
		return resources;
	}

	/**
	 * @param	playerLink:HTMLAnchor - a link to a player profile
	 * @return	player:Array(id,name)
	 */
	function twcheese_getPlayerInfo(playerLink)
	{
		var player = new Array(0,0);
		player[0] = playerLink.href.substring(playerLink.href.indexOf('player&id=') + 11);
		player[1] = playerLink.innerHTML;
		return player;
	}

	/**
	 * @param	troopRow:HTMLTableRowElement	- a row of cells containing troop counts
	 * @return	troops:Array(spear,sword,archer,axe,scout,lcav,acav,hcav,ram,cat,paladin,noble)
	 */
	function twcheese_getTroopCount(troopRow)
	{
		var troops = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
		troops[0] = Number(troopRow.cells[0].innerHTML);
		troops[1] = Number(troopRow.cells[1].innerHTML);
		
		if(troopRow.cells.length <11) /* classic */
		{
			troops[3] = Number(troopRow.cells[2].innerHTML);
			troops[4] = Number(troopRow.cells[3].innerHTML);
			troops[5] = Number(troopRow.cells[4].innerHTML);
			troops[7] = Number(troopRow.cells[5].innerHTML);
			troops[8] = Number(troopRow.cells[6].innerHTML);
			troops[9] = Number(troopRow.cells[7].innerHTML);
			
			if(troopRow.cells.length == 9) /* classic without paladin*/
			{
				troops[11] = Number(troopRow.cells[8].innerHTML);
			}
			else if(troopRow.cells.length == 10) /* classic with paladin */
			{
				troops[10] = Number(troopRow.cells[8].innerHTML);
				troops[11] = Number(troopRow.cells[9].innerHTML);
			}
		}
		else /* new units */
		{
			troops[2] = Number(troopRow.cells[2].innerHTML);
			troops[3] = Number(troopRow.cells[3].innerHTML);
			troops[4] = Number(troopRow.cells[4].innerHTML);
			troops[5] = Number(troopRow.cells[5].innerHTML);
			troops[6] = Number(troopRow.cells[6].innerHTML);
			troops[7] = Number(troopRow.cells[7].innerHTML);
			troops[8] = Number(troopRow.cells[8].innerHTML);
			troops[9] = Number(troopRow.cells[9].innerHTML);
			
			if(troopRow.cells.length == 11) /* new units without paladin */
			{
				troops[11] = Number(troopRow.cells[10].innerHTML);
			}
			else if(troopRow.cells.length == 12) /* new units with paladin */
			{			
				troops[10] = Number(troopRow.cells[10].innerHTML);
				troops[11] = Number(troopRow.cells[11].innerHTML);
			}
		}
		return troops;
	}

	/**
	 * @param	villageLink:HTMLAnchor - a link to a village with the name and coordinates
	 * @return	village:Array(x,y,id)
	 */
	function twcheese_getVillageInfo(villageLink)
	{
		var village = new Array(0,0,0);
		village[0] = Number(villageLink.innerHTML.substring(villageLink.innerHTML.lastIndexOf('(')+1,villageLink.innerHTML.lastIndexOf('|')));
		village[1] = Number(villageLink.innerHTML.substring(villageLink.innerHTML.lastIndexOf('|')+1,villageLink.innerHTML.lastIndexOf(')')));
		village[2] = Number(villageLink.href.substring(villageLink.href.indexOf('village&id=') + 11));
		return village;
	}

	/**
	 * removes the label from a troop count row
	 * @return	troopRowCopy:HTMLTableRowElement - a row of troop counts suitable for the twcheese_getTroopCount function
	 * @param	troopRow:HTMLTableRowElement - the row of troop counts with the label
	 */
	function twcheese_removeTroopsLabel(troopRow)
	{
		var troopRowCopy = document.createElement('tr');
		for(var i = 1; i < troopRow.cells.length; i++)
		{
			troopRowCopy.appendChild(document.createElement('td'));
			troopRowCopy.cells[i-1].innerHTML = troopRow.cells[i].innerHTML;
		}			
		return troopRowCopy;
	}
	
	/**
	 *	Report Scraper Template
	 *	scrapes a battle report for information
	 *	@param	gameDocument:HTMLDocument
	 */
	function twcheese_BattleReportScraper(gameDocument)
	{	
		try
		{
			this.gameDocument = gameDocument;
			this.attackerTable = gameDocument.getElementById('attack_info_att');
			this.attackerUnitsTable = gameDocument.getElementById('attack_info_att_units');
			this.defenderTable = gameDocument.getElementById('attack_info_def');
			this.defenderUnitsTable = gameDocument.getElementById('attack_info_def_units');
			this.espionageTable = gameDocument.getElementById('attack_spy');
			this.resultsTable = gameDocument.getElementById('attack_results');
			this.supportKilledTable = gameDocument.getElementById('attack_away_units');
			
			/* functions */
			
			/**
			 * @return	player:Array(id,name)
			 */
			this.getAttacker = function()
			{
				if(this.attackerTable)
					return twcheese_getPlayerInfo(this.attackerTable.rows[0].cells[1].firstChild);
			};

			/**
			 * @return	troops:Array(spear,sword,archer,axe,scout,lcav,acav,hcav,ram,cat,paladin,noble)
			 */
			this.getAttackerLosses = function()
			{
				if(this.attackerUnitsTable)
					return twcheese_getTroopCount(twcheese_removeTroopsLabel(this.attackerUnitsTable.rows[2]));	
			};
			
			/**
			 * @return	troops:Array(spear,sword,archer,axe,scout,lcav,acav,hcav,ram,cat,paladin,noble)
			 */
			this.getAttackerQuantity = function()
			{
				if(this.attackerUnitsTable)
					return twcheese_getTroopCount(twcheese_removeTroopsLabel(this.attackerUnitsTable.rows[1]));	
			};
			
			/**
			 * @return	village:Array(x,y,id)
			 */
			this.getAttackerVillage = function()
			{
				if(this.attackerTable)
					return twcheese_getVillageInfo(this.attackerTable.rows[1].cells[1].firstChild);
			};

			/**
			 * @return	buildingLevels:Array()
			 * if no buildings were scouted, returns boolean false
			 * -------------------
			 * Building		Index
			 * hq:			0
			 * barracks:	1
			 * stable:		2
			 * workshop:	3
			 * church:		4
			 * church_f:	5
			 * academy:		6
			 * smithy:		7
			 * rally:		8
			 * statue:		9
			 * market:		10
			 * timber:		11
			 * clay:		12
			 * iron:		13
			 * farm:		14
			 * warehouse:	15
			 * hiding:		16
			 * wall:		17
			 */
			this.getBuildingLevels = function()
			{
				if(this.getEspionageLevel() >= 2)
				{
					var buildingLevels = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
					var buildingNames = new Array('village headquarters','barracks','stable','workshop','church','first church','academy','smithy','rally point','statue','market','timber camp','clay pit','iron mine','farm','warehouse','hiding place','wall');
					var buildingsStringSplit = this.espionageTable.getElementsByTagName('td')[1].innerHTML.toLowerCase().split('br');
					for(i = 0; i < buildingsStringSplit.length; i++)
					{
						for(n = 0; n < 18; n++)
						{
							if(buildingsStringSplit[i].search(buildingNames[n]) != -1)
							{
								buildingLevels[n] = Number(buildingsStringSplit[i].substring(buildingsStringSplit[i].indexOf('(') + 7, buildingsStringSplit[i].indexOf(')')));
							}
						}
					}		
					return buildingLevels;
				}	
				else
					return Boolean(false);
			};
			
			/**
			 * @return	player:Array(id,name)
			 */
			this.getDefender = function()
			{
				if(this.defenderTable)
				{
					if(this.defenderTable.rows[0].cells[1].innerHTML == ' (deleted)')
						return new Array(-1,' (deleted)');
					else if(this.defenderTable.rows[0].cells[1].innerHTML == '---')
						return new Array(0,'---');
					else
						return twcheese_getPlayerInfo(this.defenderTable.rows[0].cells[1].firstChild);
				}
			};

			/**
			 * @return	troops:Array(spear,sword,archer,axe,scout,lcav,acav,hcav,ram,cat,paladin,noble)
			 * if no information about the strength of the enemy's army could be collected, returns boolean false
			 */
			this.getDefenderLosses = function()
			{
				if(this.defenderUnitsTable)
					return twcheese_getTroopCount(twcheese_removeTroopsLabel(this.defenderUnitsTable.rows[2]));
				else
					return false;
			};
			
			/**
			 * @return	troops:Array(spear,sword,archer,axe,scout,lcav,acav,hcav,ram,cat,paladin,noble)
			 * if no information about the strength of the enemy's army could be collected, returns boolean false
			 */
			this.getDefenderQuantity = function()
			{
				if(this.defenderUnitsTable)
					return twcheese_getTroopCount(twcheese_removeTroopsLabel(this.defenderUnitsTable.rows[1]));
				else
					return false;
			};
			
			/**
			 * @return	village:Array(x,y,id)
			 */
			this.getDefenderVillage = function()
			{
				if(this.defenderTable)
					return twcheese_getVillageInfo(this.defenderTable.rows[1].cells[1].firstChild);
			};

			/**
			 * @return	color:String - blue, green, yellow, or red
			 */
			this.getDotColor = function()
			{
				var images = gameDocument.getElementsByTagName('img');
				for(var i = 0; i < images.length; i++)
				{
					if(images[i].src.search('dots') != -1)
						return images[i].src.substring(images[i].src.indexOf('dots')+5,images[i].src.indexOf('.png'));
				}
			};
			
			/**
			 * @return	espionageLevel:Number
			 *---------------------------
			 * value	significance
			 * 0		nothing scouted
			 * 1		resources
			 * 2		buildings
			 * 3		external troops
			 */
			this.getEspionageLevel = function()
			{
				if(this.espionageTable)
				{
					var thElements = this.espionageTable.getElementsByTagName('th');
					if(thElements.length < 3)
						return thElements.length;
					else
						return 3;
				}
				else
					return 0;
			};
			
			/**
			 * @return	resources:Array(timber:Number,clay:Number,iron:Number)
			 */
			this.getHaul = function()
			{
				if(this.resultsTable)
				{
					var thElements = this.resultsTable.getElementsByTagName('th');
					for(var i = 0; i < thElements.length; i++)
					{
						if(thElements[i].innerHTML == 'Haul:')
						{
							return twcheese_resElementToNumbers(thElements[i].parentNode.cells[1]);
						}
					}
					return false;
				}
			};
			
			/**
			 * @return	luck:Number
			 */
			this.getLuck = function()
			{
				if(gameDocument.getElementById('attack_luck'))
				{
					var luckString = this.gameDocument.getElementById('attack_luck').getElementsByTagName('b')[0].innerHTML;
					return new Number(luckString.substring(0,luckString.indexOf('%')));
				}
			};
			
			/**
			 * @return	loyalty:Array(from:Number,to:Number)
			 * if no change was detected, returns boolean false
			 */
			this.getLoyalty = function()
			{
				if(this.resultsTable)
				{
					var thElements = this.resultsTable.getElementsByTagName('th');
					for(var i = 0; i < thElements.length; i++)
					{
						if(thElements[i].innerHTML == 'Loyalty:')
						{
							var bElements = thElements[i].parentNode.getElementsByTagName('b');
							return new Array(bElements[0].innerHTML,bElements[1].innerHTML);
						}
					}
					return false;
				}
			};

			/**
			 * @return	morale:Number
			 */
			this.getMorale = function()
			{
				if(gameDocument.getElementById('attack_moral'))
				{
					var moraleString = this.gameDocument.getElementById('attack_moral').getElementsByTagName('h4')[0].innerHTML;
					return new Number(moraleString.substring(moraleString.indexOf(' ')+1,moraleString.indexOf('%')));
				}
			};

			/**
			 * @return	reportID:Number
			 */
			this.getReportId = function()
			{
				return new Number(this.gameDocument.URL.substring(this.gameDocument.URL.indexOf('view=') + 5));
			};
			
			/**
			 * @return	resources:Array(timber:Number,clay:Number,iron:Number)
			 */
			this.getResources = function()
			{
				if(this.espionageTable)
					return twcheese_resElementToNumbers(this.espionageTable.rows[0].cells[1]);
				else
					return false;
			};
			
			
			/**
			 * @return	sent:Date
			 */
			this.getSent = function()
			{
				var tdElements = this.gameDocument.getElementsByTagName('td');
				var sent = new Date();
				for(i=0; i < tdElements.length; i++)
				{
					if(tdElements[i].innerHTML == 'Sent')
					{
						var sentStrings = tdElements[i+1].innerHTML.split(' ');
						if(sentStrings.length == 4)
						{						
							sent.setSeconds(sentStrings[3].split(':')[2]);
							sent.setMinutes(sentStrings[3].split(':')[1]);
							sent.setHours(sentStrings[3].split(':')[0]);
							sent.setYear(sentStrings[2]);

						}
						else /* for some reason there is an extra space sometimes */
						{
							sent.setSeconds(sentStrings[4].split(':')[2]);
							sent.setMinutes(sentStrings[4].split(':')[1]);
							sent.setHours(sentStrings[4].split(':')[0]);
							sent.setYear(sentStrings[2]);
						}
						switch(sentStrings[0])
						{
							case 'Jan':
								sent.setMonth(0);
								break;
							case 'Feb':
								sent.setMonth(1);
								break;
							case 'Mar':
								sent.setMonth(2);
								break;
							case 'Apr':
								sent.setMonth(3);
								break;
							case 'May':
								sent.setMonth(4);
								break;
							case 'Jun':
								sent.setMonth(5);
								break;
							case 'Jul':
								sent.setMonth(6);
								break;
							case 'Aug':
								sent.setMonth(7);
								break;
							case 'Sep':
								sent.setMonth(8);
								break;
							case 'Oct':
								sent.setMonth(9);
								break;
							case 'Nov':
								sent.setMonth(10);
								break;
							case 'Dec':
								sent.setMonth(11);
								break;
						}
						sent.setDate(sentStrings[1].split(',')[0]);
						return sent;
					}
				}
			};
			
			/**
			 * @return	reinforcements:Array(reinforcement0:Reinforcements, reinforcement1:Reinforcements, reinforcement2:Reinforcements...)
			 * if no "Defender's troops in other villages" were killed, returns boolean false
			 */
			this.getSupportKilled = function()
			{
				if(this.supportKilledTable)
				{
					var reinforcements = new Array();
					for(var i = 1; i < this.supportKilledTable.rows.length; i++)
					{
						var currentReinforcement = new Reinforcements();
						currentReinforcement.troops = twcheese_getTroopCount(twcheese_removeTroopsLabel(this.supportKilledTable.rows[i]));
						currentReinforcement.village = twcheese_getVillageInfo(this.supportKilledTable.rows[i].cells[0].firstChild);
						reinforcements.push(currentReinforcement);
					}
					return reinforcements;
				}
				else
					return false;
			};
			
			/**
			 * @return	troops:Array(spear,sword,archer,axe,scout,lcav,acav,hcav,ram,cat,paladin,noble)
			 * returns boolean false if no units In transit were detected
			 */
			this.getUnitsInTransit = function()
			{
				var h4elements = gameDocument.getElementsByTagName('h4');
				for(var i = 0; i < h4elements.length; i++)
				{
					if(h4elements[i].innerHTML.search('Defender\'s troops, that were in transit') != -1)
						return twcheese_getTroopCount(h4elements[i].nextSibling.nextSibling.rows[1]);
				}
				return false;
			};
			
			/**
			 * @return	troops:Array(spear,sword,archer,axe,scout,lcav,acav,hcav,ram,cat,paladin,noble)
			 * returns boolean false if no units outside were detected
			 */
			this.getUnitsOutside = function()
			{
				if(this.getEspionageLevel() == 3)
				{
					return twcheese_getTroopCount(this.espionageTable.rows[3].getElementsByTagName('table')[0].rows[1]);
				}
				else
					return false;
			};
		}
		catch(err)
		{
			alert('Report Scraper initialization error: \n' + err);
		}
	}
	
	/**
	 *	scrapes a battle report for information and returns the information as an object representation of the report
	 *	@param	gameDocument:HTMLDocument
	 *	@return report:twcheese_BattleReport
	 */
	function twcheese_scrapeBattleReport(gameDoc)
	{
		var reportScraper = new twcheese_BattleReportScraper(gameDoc);

		var report = new twcheese_BattleReport;
		report.attacker = reportScraper.getAttacker();
		report.attackerLosses = reportScraper.getAttackerLosses();
		report.attackerQuantity = reportScraper.getAttackerQuantity();
		report.attackerVillage = reportScraper.getAttackerVillage();
		report.buildingLevels = reportScraper.getBuildingLevels();
		report.defender = reportScraper.getDefender();
		report.defenderLosses = reportScraper.getDefenderLosses();
		report.defenderQuantity = reportScraper.getDefenderQuantity();
		report.defenderVillage = reportScraper.getDefenderVillage();
		report.dot = reportScraper.getDotColor();
		report.espionageLevel = reportScraper.getEspionageLevel();
		report.haul = reportScraper.getHaul();
		report.loyalty = reportScraper.getLoyalty();
		report.luck = reportScraper.getLuck();
		report.morale = reportScraper.getMorale();
		report.reportID = reportScraper.getReportId();
		report.resources = reportScraper.getResources();
		report.sent = reportScraper.getSent();
		report.unitsOutside = reportScraper.getUnitsOutside();
		report.unitsInTransit = reportScraper.getUnitsInTransit();
		
		return report;
	}

/*==== JSON (http://www.json.org/json2.js)====*/

	if (!this.JSON) {
		this.JSON = {};
	}
	(function () {
		function f(n) {
			return n < 10 ? '0' + n : n;
		}
		if (typeof Date.prototype.toJSON !== 'function') {

			Date.prototype.toJSON = function (key) {

				return isFinite(this.valueOf()) ?
					   this.getUTCFullYear()   + '-' +
					 f(this.getUTCMonth() + 1) + '-' +
					 f(this.getUTCDate())      + 'T' +
					 f(this.getUTCHours())     + ':' +
					 f(this.getUTCMinutes())   + ':' +
					 f(this.getUTCSeconds())   + 'Z' : null;
			};

			String.prototype.toJSON =
			Number.prototype.toJSON =
			Boolean.prototype.toJSON = function (key) {
				return this.valueOf();
			};
		}
		var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			gap,
			indent,
			meta = {    // table of character substitutions
				'\b': '\\b',
				'\t': '\\t',
				'\n': '\\n',
				'\f': '\\f',
				'\r': '\\r',
				'"' : '\\"',
				'\\': '\\\\'
			},
			rep;
		function quote(string) {
			escapable.lastIndex = 0;
			return escapable.test(string) ?
				'"' + string.replace(escapable, function (a) {
					var c = meta[a];
					return typeof c === 'string' ? c :
						'\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
				}) + '"' :
				'"' + string + '"';
		}
		function str(key, holder) {
			var i,          // The loop counter.
				k,          // The member key.
				v,          // The member value.
				length,
				mind = gap,
				partial,
				value = holder[key];
			if (value && typeof value === 'object' &&
					typeof value.toJSON === 'function') {
				value = value.toJSON(key);
			}
			if (typeof rep === 'function') {
				value = rep.call(holder, key, value);
			}
			switch (typeof value) {
			case 'string':
				return quote(value);

			case 'number':
				return isFinite(value) ? String(value) : 'null';
			case 'boolean':
			case 'null':
				return String(value);
			case 'object':
				if (!value) {
					return 'null';
				}
				gap += indent;
				partial = [];
				if (Object.prototype.toString.apply(value) === '[object Array]') {
					length = value.length;
					for (i = 0; i < length; i += 1) {
						partial[i] = str(i, value) || 'null';
					}
					v = partial.length === 0 ? '[]' :
						gap ? '[\n' + gap +
								partial.join(',\n' + gap) + '\n' +
									mind + ']' :
							  '[' + partial.join(',') + ']';
					gap = mind;
					return v;
				}
				if (rep && typeof rep === 'object') {
					length = rep.length;
					for (i = 0; i < length; i += 1) {
						k = rep[i];
						if (typeof k === 'string') {
							v = str(k, value);
							if (v) {
								partial.push(quote(k) + (gap ? ': ' : ':') + v);
							}
						}
					}
				} else {
					for (k in value) {
						if (Object.hasOwnProperty.call(value, k)) {
							v = str(k, value);
							if (v) {
								partial.push(quote(k) + (gap ? ': ' : ':') + v);
							}
						}
					}
				}
				v = partial.length === 0 ? '{}' :
					gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
							mind + '}' : '{' + partial.join(',') + '}';
				gap = mind;
				return v;
			}
		}
		if (typeof JSON.stringify !== 'function') {
			JSON.stringify = function (value, replacer, space) {
				var i;
				gap = '';
				indent = '';
				if (typeof space === 'number') {
					for (i = 0; i < space; i += 1) {
						indent += ' ';
					}
				} else if (typeof space === 'string') {
					indent = space;
				}
				rep = replacer;
				if (replacer && typeof replacer !== 'function' &&
						(typeof replacer !== 'object' ||
						 typeof replacer.length !== 'number')) {
					throw new Error('JSON.stringify');
				}
				return str('', {'': value});
			};
		}
		if (typeof JSON.parse !== 'function') {
			JSON.parse = function (text, reviver) {
				var j;

				function walk(holder, key) {
					var k, v, value = holder[key];
					if (value && typeof value === 'object') {
						for (k in value) {
							if (Object.hasOwnProperty.call(value, k)) {
								v = walk(value, k);
								if (v !== undefined) {
									value[k] = v;
								} else {
									delete value[k];
								}
							}
						}
					}
					return reviver.call(holder, key, value);
				}
				text = String(text);
				cx.lastIndex = 0;
				if (cx.test(text)) {
					text = text.replace(cx, function (a) {
						return '\\u' +
							('0000' + a.charCodeAt(0).toString(16)).slice(-4);
					});
				}
				if (/^[\],:{}\s]*$/
	.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
	.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
	.replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
					j = eval('(' + text + ')');
					return typeof reviver === 'function' ?
						walk({'': j}, '') : j;
				}
				throw new SyntaxError('JSON.parse');
			};
		}
	}());

/*==== page modifier functions ====*/

	/**
	 *	modifies report page
	 *	@param	gameDoc:HTMLDocument	the document from game.php?screen=report&mode=attack
	 *	@param	report:twcheese_BattleReport	the report data to use
	 */
	function twcheese_BattleReportEnhancer(gameDoc,report)
	{
		var contentValueElement = gameDoc.getElementById('content_value');		
		
		this.includeReportTools = function()
		{
			var toolTable = document.createElement('table');
			toolTable.id = 'twcheese_BRE_tools';
			toolTable.border = 3;
			toolTable.insertRow(-1);
			toolTable.rows[0].insertCell(-1); /* spot for raid calculator */
			toolTable.rows[0].cells[0].vAlign = 'top';
			toolTable.rows[0].insertCell(-1); /* spot for demolition information */
			toolTable.rows[0].cells[1].vAlign = 'top';
			toolTable.insertRow(-1);
			toolTable.rows[1].insertCell(-1); /* spot for renamer */
			toolTable.rows[1].cells[0].colSpan = 2;
			contentValueElement.insertBefore(toolTable,contentValueElement.getElementsByTagName('h2')[0]);
			
			/*==== raider table ====*/
			if(report.espionageLevel >= 1)
			{
				var raiderTable = document.createElement('table');
				raiderTable.id = 'twcheese_raider_calculator';
				raiderTable.insertRow(-1);
				raiderTable.rows[0].insertCell(-1);
				raiderTable.rows[0].cells[0].innerHTML = '<span align="center"><h2>Raiders</h2></span>';
				raiderTable.insertRow(-1);
				raiderTable.rows[1].align = 'center';
				raiderTable.rows[1].insertCell(-1);
				if(report.espionageLevel >= 2)
					raiderTable.rows[1].cells[0].innerHTML = '<select id="twcheese_raider_selection" onchange="twcheese_changeRaidMode(gameDoc.getElementById(\'twcheese_raider_selection\').value)"><option value="scouted">raid scouted resources</option><option value="predicted">raid predicted resources</option><option value="periodic">periodically raid resources</option></select>';
				else if(report.espionageLevel >= 1)
					raiderTable.rows[1].cells[0].innerHTML = '<select id="twcheese_raider_selection" onchange="twcheese_changeRaidMode(gameDoc.getElementById(\'twcheese_raider_selection\').value)"><option value="scouted">raid scouted resources</option></select>';
				else
					raiderTable.rows[1].cells[0].innerHTML = '<select id="twcheese_raider_selection" onchange="twcheese_changeRaidMode(gameDoc.getElementById(\'twcheese_raider_selection\').value)"></select>';
				
				raiderTable.rows[1].cells[0].innerHTML += ' <a href="'+ game_data.link_base_pure +'place&target='+ report.defenderVillage[2] +'">&raquo; Send troops</a>';
				raiderTable.rows[1].cells[0].innerHTML += '<button onclick="twcheese_BRESettings.period=gameDoc.getElementById(\'twcheese_period\').value;twcheese_BRESettings.raid=gameDoc.getElementById(\'twcheese_raider_selection\').value;twcheese_setBRESettings(twcheese_BRESettings);alert(\'Settings Saved\');">Use current selection as default</button>';
				raiderTable.rows[1].cells[0].innerHTML += '<div id="twcheese_periodic_options">Period (hours):<input id="twcheese_period" type="text" size=3 maxlength=3 value=8 /><button onclick="' + 'twcheese_currentReport.raidPeriodic=twcheese_calculateRaidPeriodic(twcheese_currentReport.buildingLevels,parseInt(gameDoc.getElementById(\'twcheese_period\').value),twcheese_gameConfig.speed);' + 'twcheese_setRaiders(gameDoc.getElementById(\'twcheese_raider_units\'),twcheese_currentReport.raidPeriodic);">Calculate</button></div>';
				
				var raiderUnitsTable = document.createElement('table');
				raiderUnitsTable.id = 'twcheese_raider_units';
				raiderUnitsTable.border = 1;
				raiderUnitsTable.cellspacing = 0;
				raiderUnitsTable.insertRow(-1);
				raiderUnitsTable.rows[0].className = 'center';
				
				var unitLanguage = new Array('spear','sword','axe','archer','lcav','acav','hcav');
				for(var i=0; i < 7; i++)
				{
					raiderUnitsTable.rows[0].insertCell(-1);
					raiderUnitsTable.rows[0].cells[i].width="35px";
					raiderUnitsTable.rows[0].cells[i].innerHTML = '<img src="'+imagePaths[unitLanguage[i]]+'" alt="'+unitLanguage[i]+'" />';
				}

				raiderUnitsTable.insertRow(-1);
				raiderUnitsTable.rows[1].className = 'center';
				for(var i=0; i < 7; i++)
					raiderUnitsTable.rows[1].insertCell(-1);
				raiderTable.insertRow(-1);
				raiderTable.rows[2].insertCell(-1);
				raiderTable.rows[2].align = 'center';
				raiderTable.rows[2].cells[0].appendChild(raiderUnitsTable);
				
				toolTable.rows[0].cells[0].appendChild(raiderTable);
			}
			
			/*==== demolition table ====*/
			if(report.demolition)
			{
				var demolitionTable = document.createElement('table');
				demolitionTable.id = 'twcheese_demolition_calculator';

				demolitionTable.insertRow(-1);
				demolitionTable.rows[0].insertCell(-1);
				demolitionTable.rows[0].cells[0].innerHTML = '<span align="center"><h2>Demolition</h2></span>';
				
				var demolitionUnitsTable = document.createElement('table');
				demolitionUnitsTable.id = 'twcheese_demolition_units';
				demolitionUnitsTable.border = 1;
				demolitionUnitsTable.cellspacing = 0;
				demolitionUnitsTable.insertRow(-1);
				demolitionUnitsTable.rows[0].className = 'center'
				demolitionUnitsTable.insertRow(-1);
				demolitionUnitsTable.rows[1].className = 'center';
				demolitionUnitsTable.insertRow(-1);
				demolitionUnitsTable.rows[2].className = 'center';
				demolitionUnitsTable.insertRow(-1);
				demolitionUnitsTable.rows[3].className = 'center';
				
				demolitionUnitsTable.rows[0].insertCell(-1);
				demolitionUnitsTable.rows[0].insertCell(-1);
				demolitionUnitsTable.rows[0].cells[0].colSpan = 17;
				demolitionUnitsTable.rows[0].cells[0].innerHTML = '<img src="'+imagePaths['catapult']+'" alt="catapults" />';
				demolitionUnitsTable.rows[0].cells[1].innerHTML = '<img src="'+imagePaths['ram']+'" alt="rams" />';
				
				var buildingLanguage = new Array('hq','barracks','stable','workshop','church','church_f','academy','smithy','rally','statue','market','timber','clay','iron','farm','warehouse','hiding','wall');
				for(var i=0; i < 18; i++)
				{
					demolitionUnitsTable.rows[1].insertCell(-1);
					demolitionUnitsTable.rows[1].cells[i].width="35px";
					demolitionUnitsTable.rows[1].cells[i].innerHTML = '<img src="'+imagePaths[buildingLanguage[i]]+'" alt="'+buildingLanguage[i]+'" />';
					demolitionUnitsTable.rows[2].insertCell(-1);
					demolitionUnitsTable.rows[2].cells[i].innerHTML = report.demolition[0][i];
					demolitionUnitsTable.rows[3].insertCell(-1);
					demolitionUnitsTable.rows[3].cells[i].innerHTML = report.demolition[1][i]; 
				}
				
				demolitionTable.insertRow(-1);
				demolitionTable.rows[1].insertCell(-1);
				demolitionTable.rows[1].cells[0].appendChild(demolitionUnitsTable);
				
				toolTable.rows[0].cells[1].appendChild(demolitionTable);
			}
			
			/*==== renamer table ====*/
			var renamerTable = document.createElement('table');
			renamerTable.id = 'twcheese_renamer';
			renamerTable.align = 'center';
				
				/*==== renamer options ====*/
				var renamerOptions = '<option>nothing</option>';
				renamerOptions += '<option value="buildings:all" >building levels: All</option>';
				renamerOptions += '<option value="buildings:hq" >building level: HQ</option>';
				renamerOptions += '<option value="buildings:barracks">building level: Barracks</option>';
				renamerOptions += '<option value="buildings:stable">building level: Stable</option>';
				renamerOptions += '<option value="buildings:workshop">building level: Workshop</option>';
				renamerOptions += '<option value="buildings:church">building level: Church</option>';
				renamerOptions += '<option value="buildings:church_f">building level: First Church</option>';
				renamerOptions += '<option value="buildings:academy">building level: Academy</option>';
				renamerOptions += '<option value="buildings:smithy">building level: Smithy</option>';
				renamerOptions += '<option value="buildings:rally">building level: Rally Point</option>';
				renamerOptions += '<option value="buildings:statue">building level: Statue</option>';
				renamerOptions += '<option value="buildings:market">building level: Market</option>';
				renamerOptions += '<option value="buildings:timber">building level: Timber Camp</option>';
				renamerOptions += '<option value="buildings:clay">building level: Clay Pit</option>';
				renamerOptions += '<option value="buildings:iron">building level: Iron Mine</option>';
				renamerOptions += '<option value="buildings:farm">building level: Farm</option>';
				renamerOptions += '<option value="buildings:warehouse">building level: Warehouse</option>';
				renamerOptions += '<option value="buildings:hiding">building level: Hiding Place</option>';
				renamerOptions += '<option value="buildings:wall">building level: Wall</option>';
				renamerOptions += '<option value="troops:defSurvivors">troops: Remaining Defense</option>';
				renamerOptions += '<option value="resources:all">resources: Total Remaining</option>';
				renamerOptions += '<option value="time:launched">time: Launched</option>';
				renamerOptions += '<option value="loyalty">Loyalty</option>';				
				
			renamerTable.insertRow(-1);
			renamerTable.rows[0].insertCell(-1);
			renamerTable.rows[0].cells[0].innerHTML = '<span align="center"><h2>Renamer</h2></span>';
			renamerTable.rows[0].cells[0].colSpan = '6';
			
			renamerTable.insertRow(-1);
			for(var i=0; i < 6; i++)
			{
				renamerTable.rows[1].insertCell(-1);
				renamerTable.rows[1].cells[i].innerHTML = '<select id="twcheese_renameOption'+i+'" onchange="twcheese_previewNewName(twcheese_currentReport);">'+renamerOptions+'</select>';
			}
			
			renamerTable.insertRow(-1);
			renamerTable.rows[2].insertCell(-1);
			renamerTable.rows[2].insertCell(-1);
			renamerTable.rows[2].cells[0].innerHTML = '<b>Preview:</b>'
			renamerTable.rows[2].cells[1].colSpan = 5;
			renamerTable.rows[2].cells[1].id = 'twcheese_rename_preview';
			
			renamerTable.insertRow(-1);
			renamerTable.rows[3].insertCell(-1);
			renamerTable.rows[3].cells[0].colSpan = 6;
			renamerTable.rows[3].cells[0].align = 'center';
			renamerTable.rows[3].cells[0].innerHTML = '<button onclick="pageMod.renameReport(gameDoc.getElementById(\'twcheese_renameOption0\').value,gameDoc.getElementById(\'twcheese_renameOption1\').value,gameDoc.getElementById(\'twcheese_renameOption2\').value,gameDoc.getElementById(\'twcheese_renameOption3\').value,gameDoc.getElementById(\'twcheese_renameOption4\').value,gameDoc.getElementById(\'twcheese_renameOption5\').value);">Rename</button>';
			renamerTable.rows[3].cells[0].innerHTML += '<button onclick="pageMod.saveRenameSettings();alert(\'saved renamer configuration\');">Use current selection as default</button>';
			renamerTable.rows[3].cells[0].innerHTML += '  <span title="Next time this script is ran: automatically rename reports, using the default renamer settings">auto rename</span><input type="checkbox" id="twcheese_auto_rename" onclick="twcheese_BRESettings.autoRename = gameDoc.getElementById(\'twcheese_auto_rename\').checked; twcheese_setBRESettings(twcheese_BRESettings)" />'
			
			toolTable.rows[1].cells[0].appendChild(renamerTable);
		};
		
		this.includeExtraInformation = function()
		{
			var reportTable = gameDoc.getElementById('attack_luck').parentNode.parentNode.parentNode.parentNode;
			
			/*==== surviving defenders ====*/
			if(gameDoc.getElementById('attack_info_def_units'))
			{
				var defenseUnitsTable = gameDoc.getElementById('attack_info_def_units');
				var survivorsRow = defenseUnitsTable.insertRow(-1);
				survivorsRow.className = "center";
				survivorsRow.insertCell(-1);
				survivorsRow.cells[0].innerHTML = 'Survivors:';
				for(var i=1; i < 13; i++)
				{
					survivorsRow.insertCell(-1);
					if(report.survivors[i-1] == 0)
						survivorsRow.cells[i].className="hidden";
					survivorsRow.cells[i].innerHTML = report.survivors[i-1];
				}
			}
			
			/*==== population summary ====*/
			if(report.espionageLevel >= 2)
			{
				var espionageTable = gameDoc.getElementById('attack_spy');
				var populationRow = espionageTable.insertRow(-1);
				var populationHeader = document.createElement('th');
				populationHeader.innerHTML = 'Population:';
				populationRow.appendChild(populationHeader);
				populationRow.insertCell(-1);
				populationRow.cells[1].innerHTML = 'Buildings <b>('+report.populationSummary[0]+')</b><br/>Military <b>('+report.populationSummary[1]+')</b><br/>';
				if(report.espionageLevel == 3)
					populationRow.cells[1].innerHTML += 'Idle';
				else
					populationRow.cells[1].innerHTML += 'Unknown';
				populationRow.cells[1].innerHTML += ' <b>('+report.populationSummary[2]+')</b>';
			}
			
			/*==== loyalty ====*/
			if(report.loyalty)
			{
				var resultsHeaders = gameDoc.getElementById('attack_results').getElementsByTagName('th');
				var loyaltyRow;
				for(var i=0; i < resultsHeaders.length; i++)
					if(resultsHeaders[i].innerHTML == 'Loyalty:')
						loyaltyRow = resultsHeaders[i].parentNode;
						
				var loyaltyHTML = loyaltyRow.cells[1].innerHTML;
				loyaltyRow.removeChild(loyaltyRow.cells[1]);
				loyaltyRow.insertCell(-1);
				loyaltyRow.cells[1].innerHTML = loyaltyHTML;
				loyaltyRow.cells[1].innerHTML += '<br/><span title="the current predicted loyalty, based on time passed since this report">@Current Time: '+report.loyaltyExtra[0]+'</span>';
				loyaltyRow.cells[1].innerHTML += '<br/><span title="the predicted loyalty at time of arrival, should you send a nobleman from your current village right now">@Arrival: '+report.loyaltyExtra[1]+'</span>';
			}
			
			/*==== opponents defeated ====*/
			var oddRow = gameDoc.getElementById('attack_info_att').insertRow(-1);
			var oddHeader = document.createElement('th');
			oddHeader.innerHTML = 'ODD:';
			oddRow.appendChild(oddHeader);
			oddRow.insertCell(-1);
			oddRow.cells[1].innerHTML = 'The defender defeated '+report.opponentsDefeatedSummary[1]+' opponents.';
						
			var odaRow = gameDoc.getElementById('attack_info_def').insertRow(-1);
			var odaHeader = document.createElement('th');
			odaHeader.innerHTML = 'ODA:';
			odaRow.appendChild(odaHeader);
			odaRow.insertCell(-1);
			odaRow.cells[1].innerHTML = 'The attacker defeated '+report.opponentsDefeatedSummary[0]+' opponents.';
			
			/*==== timing info ====*/			
			var launchRow = reportTable.insertRow(2);
			launchRow.insertCell(-1);
			launchRow.cells[0].innerHTML = '<span title="the time the attacker sent the attack">Launched</span>';
			launchRow.insertCell(-1);
			launchRow.cells[1].innerHTML = twcheese_dateToString(report.timingInfo[0]);
			
				/*==== determine whether return time should be displayed. ====*/
				var attackerSurvivors = twcheese_calculateSurvivors(report.attackerQuantity,report.attackerLosses);
				var showReturnTime = false;
				for(var i=0; i < attackerSurvivors.length; i++)
					if(attackerSurvivors[i] > 0)
						showReturnTime = true;
			
			var returnRow = reportTable.insertRow(3);
			returnRow.insertCell(-1);			
			if(showReturnTime)
			{				
				returnRow.cells[0].innerHTML = '<span title="the time the attacking troops return to the attacker\'s village">Returns</span>';
				returnRow.insertCell(-1);
				returnRow.cells[1].innerHTML = twcheese_dateToString(report.timingInfo[1]);
			}
			
			/*==== json representation ====*/
			var jsonRow = reportTable.insertRow(5);
			jsonRow.insertCell(-1);
			jsonRow.cells[0].colSpan=2;
			jsonRow.cells[0].innerHTML = '<b>JSON</b><br/><textarea cols=50 readonly=true>' +JSON.stringify(report)+ '</textarea>';
			
		};
		
		/**
		 *	renames the report
		 *	@param op1	first option to include in the report
		 */
		this.renameReport = function(op1,op2,op3,op4,op5,op6)
		{
			var newName = 'twCheese: ' + report.attacker[1] + ' ('+report.attackerVillage[0]+'|'+report.attackerVillage[1]+','+report.attackerVillage[2]+') attacks '+report.defender[1]+' ('+report.defenderVillage[0]+'|'+report.defenderVillage[1]+','+report.defenderVillage[2]+')' + twcheese_renameText(op1,report) + twcheese_renameText(op2,report) + twcheese_renameText(op3,report) + twcheese_renameText(op4,report) + twcheese_renameText(op5,report) + twcheese_renameText(op6,report);
			
			/*==== retrieve key required for certain events ====*/
			var text = String(gameDoc.getElementById('edit').getElementsByTagName('input')[1].onclick);
			var hash = text.substring(text.indexOf('&h=')+3,text.indexOf('&report_id'));
		
			/*==== rename report ====*/
			gameDoc.getElementById('editInput').value = newName;
			var submitLink = game_data.link_base_pure +'report&action=edit_subject&h='+hash+'&report_id='+report.reportID;
			editSubmit('label', 'labelText', 'edit', 'editInput', submitLink);
		};
		
		this.saveRenameSettings = function()
		{
			for(var i=0; i < 6; i++)
				eval('twcheese_BRESettings.rename'+Number(i+1)+' = gameDoc.getElementById(\'twcheese_renameOption'+i+'\').value;');
			twcheese_setBRESettings(twcheese_BRESettings)						
		};
	}
	
	/**
	 *	displays the potential new name
	 */
	function twcheese_previewNewName(report)
	{
		var newName = 'twCheese: ' + report.attacker[1] + ' ('+report.attackerVillage[0]+'|'+report.attackerVillage[1]+','+report.attackerVillage[2]+') attacks '+report.defender[1]+' ('+report.defenderVillage[0]+'|'+report.defenderVillage[1]+','+report.defenderVillage[2]+')';
		for(var i=0; i < 6; i++)
			newName += twcheese_renameText(gameDoc.getElementById('twcheese_renameOption'+i).value,report);
		gameDoc.getElementById('twcheese_rename_preview').innerHTML = newName;
	}
	
	/**
	 *	sets raiders displayed in the raider calculator
	 *	@param	raiderTable:HTMLTableElement
	 *	@param	units:Array	the units to display
	 */
	function twcheese_setRaiders(raiderTable,units)
	{
		for(var i=0; i < 7; i++)
			raiderTable.rows[1].cells[i].innerHTML = units[i];
	}
	
	/**
	 *	@param	mode:String	represents which mode to use
	 */
	function twcheese_changeRaidMode(mode)
	{
		if(mode == 'scouted')
		{
			gameDoc.getElementById('twcheese_raider_selection').value = 'scouted';			
			twcheese_setRaiders(gameDoc.getElementById('twcheese_raider_units'),twcheese_currentReport.raidScouted);
			gameDoc.getElementById('twcheese_periodic_options').style.display = 'none';
		}
		else if(mode == 'predicted')
		{
			gameDoc.getElementById('twcheese_raider_selection').value = 'predicted';			
			twcheese_setRaiders(gameDoc.getElementById('twcheese_raider_units'),twcheese_currentReport.raidPredicted);
			gameDoc.getElementById('twcheese_periodic_options').style.display = 'none';
		}
		else if(mode == 'periodic')
		{
			gameDoc.getElementById('twcheese_raider_selection').value = 'periodic';
			twcheese_currentReport.raidPeriodic = twcheese_calculateRaidPeriodic(twcheese_currentReport.buildingLevels,parseInt(gameDoc.getElementById('twcheese_period').value),twcheese_gameConfig.speed);
			twcheese_setRaiders(gameDoc.getElementById('twcheese_raider_units'),twcheese_currentReport.raidPeriodic);
			gameDoc.getElementById('twcheese_periodic_options').style.display = '';
		}
	}
	
	/**
	 *	modifies page on the reports folder view
	 *	@param gameDoc:HTMLDocument	the document from game.php?screen=report&mode=attack
	 */
	function twcheese_BattleReportsFolderEnhancer(gameDoc)
	{
		/**
		 *	add distance to the reports table
		 */
		this.includeDistances = function()
		{
			var distanceHeader = document.createElement('th');
			distanceHeader.innerHTML = '<b>Distance</b>';
			reportsTable.rows[0].insertBefore(distanceHeader,reportsTable.rows[0].getElementsByTagName('th')[0]);
			for(var i=1; i < reportsTable.rows.length - 1; i++)
			{
				var distanceCell = reportsTable.rows[i].insertCell(0);
				distanceCell.innerHTML = reports[i-1].defenderDistance;
			}
			var spacer = document.createElement('th');
			reportsTable.rows[reportsTable.rows.length - 1].insertBefore(spacer,reportsTable.rows[reportsTable.rows.length-1].getElementsByTagName('th')[0]);
		};
	
		/**
		 *	add links to 'attack again with same troops' from the current village
		 */
		this.includeRepeatCurrentLinks = function()
		{
			var repeatCurrentHeader = document.createElement('th');
			repeatCurrentHeader.innerHTML = '<b>Repeat</b>';
			reportsTable.rows[0].insertBefore(repeatCurrentHeader,reportsTable.rows[0].getElementsByTagName('th')[0]);
			for(var i=1; i < reportsTable.rows.length - 1; i++)
			{
				var repeatCell = reportsTable.rows[i].insertCell(0);
				repeatCell.innerHTML = '<a href="' + game_data.link_base_pure + 'place&try=confirm&type=same&report_id=' +reports[i-1].reportID+ '" ><img src = "'+ imagePaths['repeatFromCurrent'] +'" title="attack from your current village, with the same troops" alt="current"/></a>'
			}
			var spacer = document.createElement('th');
			reportsTable.rows[reportsTable.rows.length - 1].insertBefore(spacer,reportsTable.rows[reportsTable.rows.length-1].getElementsByTagName('th')[0]);
		};
		
		/**
		 *	add links to 'attack again with same troops' from the original village
		 */
		this.includeRepeatOriginalLinks = function()
		{
			for(var i=1; i < reportsTable.rows.length - 1; i++)
			{
				if(reports[i-1].attackerVillage)
				{
					if(reports[i-1].attackerVillage.length == 3)
					{
						var repeatCell = reportsTable.rows[i].cells[0];
						var babySit = '';
						if(game_data.link_base_pure.search('&t=') != -1)
							babySit = game_data.link_base_pure.substring(game_data.link_base_pure.indexOf('&t='));
						repeatCell.innerHTML += ' | <a href="http://' + document.domain + '/game.php?village='+ reports[i-1].attackerVillage[2] + babySit +'&screen=place&try=confirm&type=same&report_id=' +reports[i-1].reportID+ '" ><img src = "'+ imagePaths['repeatFromOriginal'] +'" title="attack from the original village, with the same troops" alt="current"/></a>'
					}
				}
			}
		};
		
		/**
		 *	mark checkboxes for reports with partial hauls
		 */
		this.markPartialHauls = function()
		{
			for(var i=0; i < partialHauls.length; i++)
				gameDoc.getElementsByName('id_' + partialHauls[i])[0].checked = true;
		};
		 
		/**
		 *	@param	link:HTMLAnchor	a link to a report
		 *	@return	reportId:Number the reportId of the linked report
		 */
		this.scrapeReportId = function(link)
		{
			var address = link.href;
			return address.substring(address.indexOf('&view=') + 6);
		}
		 
		/*==== find reports table ====*/
		var reportsTable = gameDoc.getElementById('content_value').getElementsByTagName('table')[3];
		
		/*==== scrape report information  ====*/
		var reports = new Array();
		var partialHauls = new Array();
		var home = game_data.village.coord.split('|');

		for(var i=1; i < reportsTable.rows.length-1; i++)
		{
			var report = twcheese_interpretReportName(reportsTable.rows[i].cells[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerHTML);
			report.reportID = this.scrapeReportId(reportsTable.rows[i].cells[0].getElementsByTagName('a')[0])
			
			if(report.defenderVillage)
				try
				{
					report.defenderDistance = twcheese_calculateDistance(home,report.defenderVillage);
				}
				catch(err)
				{
					alert(err);
					report.defenderDistance = '?';
				}
					
			else
				report.defenderDistance = '?';
			
			reports.push(report);
			if(reportsTable.rows[i].getElementsByTagName('img')[1].src.search('max_loot/0.png') != -1) /* haul is partial */
				partialHauls.push(report.reportID);
		}
	}

/*==== calculator functions ====*/
	
	/**
	 *	calculates surviving troops
	 *	@param quantity:Array	an array of troops, in specific, the ones before the battle
	 *	@param losses:Array	an array of troops, in specific, the ones that died
	 *	@return	survivors:Array	an array of troops, in specific, the ones that survived
	 */
	function twcheese_calculateSurvivors(quantity,losses)
	{
		var survivors = new Array();
		for(var i=0; i < quantity.length; i++)
			survivors[i] = quantity[i] - losses[i];
			
		return survivors;
	}
	
	/**
	 *	calculates some population information based on a scout report
	 *	@param	buildings:Array	an array of the building levels in the village
	 *	@param 	troopsDefending:Array	an array of troops, in specific, the ones defending the village
	 *	@param	troopsOutside:Array	an array of troops, in specific, the ones outside the village
	 *	@return	population:Array(buildingPop:Number,militaryPop:Number,idlePop:Number)
	 */
	function twcheese_calculatePopulation(buildings,troopsDefending,troopsOutside)
	{
		var buildingPopBases = new Array(1.17,1.17,1.17,1.17,1.55,1.55,1.17,1.17,1.17,1.17,1.17,1.155,1.14,1.17,1,1.15,1.17,1.17);
		var buildingPopFactors = new Array(5,7,8,8,5,5000,80,20,0,10,20,5,10,10,0,0,2,5);
		var troopPopulation = new Array(1,1,1,1,2,4,5,6,5,8,10,100);		
		
		var buildingPopulation = 0;
		var militaryPopulation = 0;
		var maxPopulation = Math.round(240 * Math.pow(1.172103,buildings[14]-1));
		for(var i=0; i < 18; i++)
		{
			if(buildings[i] > 0)
			{
				buildingPopulation += Math.round(buildingPopFactors[i] * Math.pow(buildingPopBases[i],(buildings[i] - 1)));
			}
		}
		for(var i=0; i < 12; i++)
		{
			militaryPopulation += troopPopulation[i]*Number(troopsDefending[i]);
			if(troopsOutside)
				militaryPopulation += troopPopulation[i]*Number(troopsOutside[i]);
		}		
		return new Array(buildingPopulation,militaryPopulation,(maxPopulation - buildingPopulation - militaryPopulation));	
	}
	
	/**
	 *	calculate opponents defeated
	 *	@param attackerLosses:Array
	 *	@param defenderLosses:Array
	 *	@reutrn odScore:Array(attacker:Number,defender:Number)
	 */
	function twcheese_calculateOd(attackerLosses,defenderLosses)
	{
		var offScores = new Array(4,5,1,5,1,5,6,23,4,12,40,200);
		var deffScores = new Array(1,2,4,2,2,13,12,15,8,10,20,200);
		
		var attacker = 0;
		var defender = 0;
		
		for(var i=0; i < 12; i++)
		{
			attacker += offScores[i] * defenderLosses[i];
			if(defenderLosses)
				defender += deffScores[i] * attackerLosses[i];
		}
		
		return new Array(attacker,defender);
	}
	
	/**
	 *	calculate loyalty
	 *	@param	loyalty:Number
	 *	@param	timeSent:Date
	 *	@param	home:Array(x,y)
	 *	@param	target:Array(x,y)
	 *	@return loyaltyExtra:Array(now:Number,arrival:Number)
	 */
	function twcheese_calculateLoyalty(worldSpeed,unitSpeed,loyalty,timeSent,timeNow,home,target)
	{
		if(loyalty <= 0)
			loyalty = 25;
			
		var loyaltyExtra = new Array();
		
		/*=== calculate current loyalty ====*/
		var hoursPassed = (timeNow - timeSent)/3600000;
		if(Number(parseInt(loyalty) + parseInt(hoursPassed*worldSpeed)) > 100)
			loyaltyExtra[0] = 100;
		else
			loyaltyExtra[0] = Math.floor(Number(parseInt(loyalty) + parseInt(hoursPassed*worldSpeed)));
		
		/*==== calculate loyalty at TOA ====*/
		var distance = twcheese_calculateDistance(home,target);
		var travelTime = (distance * 35 / worldSpeed / unitSpeed) / 60;
		if(loyaltyExtra[0] + travelTime*worldSpeed > 100)
			loyaltyExtra[1] = 100;
		else
			loyaltyExtra[1] = Math.floor(loyaltyExtra[0] + travelTime*worldSpeed);
			
		return loyaltyExtra;		
	}
	
	/**
	 *	@param	village1:Array(x,y)
	 *	@param	village1:Array(x,y)
	 *	@return	distance:Number
	 */
	function twcheese_calculateDistance(village1,village2)
	{
		return Math.round((Math.sqrt((village1[0]-village2[0])*(village1[0]-village2[0]) + (village1[1]-village2[1])*(village1[1]-village2[1])))*100)/100;
	}
	
	/**
	 *	@param	timeOfArrival:Date
	 *	@param	attackerTroops:Array	an array of troops
	 *	@param	attackerVillage:Array(x:Number,y:Number)
	 *	@param	defenderVillage:Array(x:Number,y:Number)
	 *	@return	timingInfo:Array(launchedTime:Number,returnTime:Number)
	 */
	function twcheese_calculateTimingInfo(worldSpeed,unitSpeed,timeOfArrival,attackerTroops,attackerVillage,defenderVillage)
	{
		
		var timingInfo = new Array();
		var distance = twcheese_calculateDistance(attackerVillage,defenderVillage);
		var attackSpeed;
		if(attackerTroops[11] > 0)
			attackSpeed = 35 / worldSpeed / unitSpeed;
		else if(attackerTroops[8] > 0 || attackerTroops[9] > 0)
			attackSpeed = 30 / worldSpeed / unitSpeed;
		else if(attackerTroops[1] > 0)
			attackSpeed = 22 / worldSpeed / unitSpeed;
		else if(attackerTroops[0] > 0 || attackerTroops[2] > 0 || attackerTroops[3] > 0)
			attackSpeed = 18 / worldSpeed / unitSpeed;
		else if(attackerTroops[7] > 0)
			attackSpeed = 11 / worldSpeed / unitSpeed;
		else if(attackerTroops[5] > 0 || attackerTroops[6] > 0 || attackerTroops[10] > 0)
			attackSpeed = 10 / worldSpeed / unitSpeed;
		else
			attackSpeed = 9 / worldSpeed / unitSpeed;
			
		var travelTime = new Date();
		travelTime.setTime(attackSpeed*distance*60000);
		
		timingInfo[0] = new Date(timeOfArrival.getTime() - travelTime.getTime());
		timingInfo[1] = new Date(timeOfArrival.getTime() + travelTime.getTime());
		return timingInfo;
	}
	
	/**
	 *	@param	buildings:Array	an array of the building levels scouted
	 *	@return smashUnits:Array(demoScouted:Array,demoBuffer:Array)	an array of arrays of #cats to downgrade each building as much as possible (and #rams for wall). demoScouted is for scouted levels, demoBuffer is for buildings 1 level higher than scouted
	 */
	function twcheese_calculateDemolition(buildings)
	{
		var demoScouted = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		var demoBuffer = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		var catAmountsZero = new Array(0,2,6,10,15,21,28,36,45,56,68,82,98,115,136,159,185,215,248,286,328,376,430,490,558,634,720,815,922,1041,1175);
		var catAmountsOne = new Array(0,0,2,6,11,17,23,31,39,49,61,74,89,106,126,148,173,202,234,270,312,358,410,469,534,608,691,784,888,1005,1135);
		var catAmountsChurch = new Array();
		var ramAmounts = new Array(0,2,4,7,10,14,19,24,30,37,45,55,65,77,91,106,124,143,166,191,219);
		
		/*==== hq ====*/
		demoScouted[0] = catAmountsOne[buildings[0]];
		if(buildings[0] < 30)
			demoBuffer[0] = catAmountsOne[buildings[0]+1];
		else
			demoBuffer[0] = demoScouted[0];
		
		/*==== barracks ====*/
		demoScouted[1] = catAmountsOne[buildings[1]];
		if(buildings[1] < 30 && buildings[0] >= 3)
			demoBuffer[1] = catAmountsOne[buildings[1]+1];
		else
			demoBuffer[1] = demoScouted[1];
		
		/*==== stable ====*/
		demoScouted[2] = catAmountsOne[buildings[2]];
		if(buildings[2] < 20 && buildings[0] >= 10 && buildings[1] >= 5 && buildings[7] >= 5)
			demoBuffer[2] = catAmountsOne[buildings[2]+1];
		else
			demoBuffer[2] = demoScouted[2];
		
		/*==== workshop ====*/
		demoScouted[3] = catAmountsOne[buildings[3]];
		if(buildings[3] < 15 && buildings[0] >= 10 && buildings[7] >= 10)
			demoBuffer[3] = catAmountsOne[buildings[3]+1];
		else
			demoBuffer[3] = demoScouted[3];
			
		/*==== church ====*/
		
		/*==== church_f ====*/
		demoScouted[5] = 'NA';
		demoBuffer[5] = 'NA';
		
		/*==== academy ====*/
		demoScouted[6] = catAmountsOne[buildings[6]];
		if(buildings[6] < 3 && buildings[0] >= 20 && buildings[7] == 20 && buildings[10] >= 10)
			demoBuffer[6] = catAmountsOne[buildings[6]+1];
		else
			demoBuffer[6] = demoScouted[6];
		
		/*==== smithy ====*/
		demoScouted[7] = catAmountsOne[buildings[7]];
		if(buildings[7] < 20 && buildings[0] >= 5 && buildings[1] >= 1)
			demoBuffer[7] = catAmountsOne[buildings[7]+1];
		else
			demoBuffer[7] = demoScouted[7];
		
		/*==== statue and rally point====*/
		for(var i=8; i <= 9; i++)
		{
			demoScouted[i] = catAmountsZero[buildings[i]];
			if(buildings[i] < 1)
				demoBuffer[i] = catAmountsZero[buildings[i]+1];
			else
				demoBuffer[i] = demoScouted[i];
		}
		
		/*==== market ====*/
		demoScouted[10] = catAmountsZero[buildings[10]];
		if(buildings[10] < 25 && buildings[0] >= 3 && buildings[15] >= 2)
			demoBuffer[10] = catAmountsZero[buildings[10]+1];
		else
			demoBuffer[10] = demoScouted[10];
		
		/*==== timber camp, clay pit, and iron mine ====*/
		for(var i = 11; i <= 13; i++)
		{
			demoScouted[i] = catAmountsZero[buildings[i]];
			if(buildings[i] < 30)
				demoBuffer[i] = catAmountsZero[buildings[i]+1];
			else
				demoBuffer[i] = demoScouted[i];
		}
		
		/*==== farm ====*/
		demoScouted[14] = catAmountsOne[buildings[14]];
		if(buildings[14] < 30)
			demoBuffer[14] = catAmountsOne[buildings[14]+1];
		else
			demoBuffer[14] = demoScouted[14];
		
		/*==== warehouse ====*/
		demoScouted[15] = catAmountsOne[buildings[15]];
		if(buildings[15] < 30)
			demoBuffer[15] = catAmountsOne[buildings[15]+1];
		else
			demoBuffer[15] = demoScouted[15];
			
		/*==== hiding place ====*/
		demoScouted[16] = 'NA';
		demoBuffer[16] = 'NA';
			
		/*==== wall ====*/
		demoScouted[17] = ramAmounts[buildings[17]];
		if(buildings[1] >= 1 && buildings[17] < 20)
			demoBuffer[17] = ramAmounts[buildings[17]+1];
		
		return new Array(demoScouted,demoBuffer);
	}
	
	/**
	 *	@param	resourcesScouted:Array(timber,clay,iron)
	 *	@return	troops:Array(spear,sword,axe,archer,lcav,acav,hcav)	an array of how many of each type of troop should be sent to take all resources, provided only one type of troop is sent
	 */
	function twcheese_calculateRaidScouted(resourcesScouted)
	{
		var totalResources = resourcesScouted[0] + resourcesScouted[1] + resourcesScouted[2];
		return twcheese_calculateRaidUnits(totalResources);
	}
	
	/**
	 *	@param	resourcesScouted:Array(timber,clay,iron)
	 *	@param	buildings:Array	an array of the building levels
	 *	@param	home:Array(x,y)
	 *	@param	target:Array(x,y)
	 *	@param	timeSent:Date	the time the player received the report
	 *	@param	timeNow:Date	the current time
	 *	@return	troops:Array(spear,sword,axe,archer,lcav,acav,hcav)	an array of how many of each type of troop should be sent to take all resources, provided only one type of troop is sent
	 */
	function twcheese_calculateRaidPredicted(resourcesScouted,buildings,home,target,timeSent,timeNow,gameSpeed)
	{
		
		var capacity = 1000 * Math.pow(1.2294934,(buildings[15] - 1));
		var hidden = new Array(0,150,200,267,356,474,632,843,1125,1500,2000);
		var maxHaul = capacity - hidden[buildings[16]];
		var speeds = new Array(18,22,18,18,10,10,11);
		var resources = resourcesScouted.slice();
		
		/*==== calculate production rates ====*/
		var production = new Array(0,0,0);
		for(i=0; i < 3; i++)
		{
			if(buildings[i+11] > 0)
				production[i] = gameSpeed * 30 * Math.pow(1.163118,(buildings[i+11] - 1));
			else
				production[i] = gameSpeed * 5;
		}
		
		/*==== add resources produced between the current time and the time of the report*/
		var timeElapsed = (timeNow - timeSent) / 3600000;
		for(i=0; i<3; i++)
		{
			resources[i] += timeElapsed * production[i];
			if(resources[i] > maxHaul)
				resources[i] = maxHaul;
		}

		/*==== calculate travel times (in hours) ====*/
		var travelTimes = new Array();
		for(var i=0; i < 7; i++)
			travelTimes[i] = speeds[i] * twcheese_calculateDistance(home,target) / 60;
		
		/*==== add resources produced during travel ====*/
		var totalResources = new Array(0,0,0,0,0,0,0);
		for(var i=0; i < 7; i++)
		{
			var resTotal = new Array(0,0,0);
			for(j=0; j<3; j++)
			{
				resTotal[j] = resources[j] + travelTimes[i] * production[j];
				if(resTotal[j] > maxHaul)
					resTotal[j] = maxHaul;
			}
			totalResources[i] = resTotal[0] + resTotal[1] + resTotal[2];
		}
		

		/*==== calculate units to take resources ====*/
		var units = new Array(0,0,0,0,0,0,0);
		var hauls = new Array(25,15,10,10,80,50,50);
		for(var i = 0; i < 7; i++)
			units[i] = Math.round((totalResources[i] / hauls[i])*10)/10;
			
		return units;
	}

	/**
	 *	@param	buildings:Array	an array of the building levels
	 *	@param	period:Number	the number of hours that resources have been accumulating
	 *	@param	gameSpeed:Number
	 *	@return	troops:Array(spear,sword,axe,archer,lcav,acav,hcav)	an array of how many of each type of troop should be sent to take all resources, provided only one type of troop is sent
	 */	
	function twcheese_calculateRaidPeriodic(buildings,period,gameSpeed)
	{
		/*==== calculate maximum of each resource hauled ====*/
		var capacity = 1000 * Math.pow(1.2294934,(buildings[15] - 1));
		var hidden = new Array(0,150,200,267,356,474,632,843,1125,1500,2000);
		var maxHaul = capacity - hidden[buildings[16]];
		
		/*==== calculate production rates ====*/
		var production = new Array(0,0,0);
		for(i=0; i < 3; i++)
		{
			if(buildings[i+11] > 0)
				production[i] = gameSpeed * 30 * Math.pow(1.163118,(buildings[i+11] - 1));
			else
				production[i] = gameSpeed * 5;
		}

		/*==== calculate resources produced */
		var resources = new Array(0,0,0);
		for(i=0; i<3; i++)
		{
			resources[i] = period * production[i];
			if(resources[i] > maxHaul)
				resources[i] = maxHaul;			
		}
		var totalResources = resources[0]+resources[1]+resources[2];
		return twcheese_calculateRaidUnits(totalResources);
	}
	
	/**
	 *	@param	resources	the total resources to be raided
	 *	@return	troops:Array(spear,sword,axe,archer,lcav,acav,hcav)	an array of how many of each type of troop should be sent to take all resources, provided only one type of troop is sent
	 */
	function twcheese_calculateRaidUnits(resources)
	{
		var units = new Array(0,0,0,0,0,0,0);
		var hauls = new Array(25,15,10,10,80,50,50);
		for(var i = 0; i < 7; i++)
			units[i] = Math.round((resources / hauls[i])*10)/10;
		return units;
	}

/*==== cookie functions ====*/
	
	function getCookie(c_name)
	{
	if (document.cookie.length>0)
	  {
	  c_start=document.cookie.indexOf(c_name + "=");
	  if (c_start!=-1)
		{
		c_start=c_start + c_name.length+1;
		c_end=document.cookie.indexOf(";",c_start);
		if (c_end==-1) c_end=document.cookie.length;
		return unescape(document.cookie.substring(c_start,c_end));
		}
	  }
	return "";
	}

	function setCookie(c_name,value,expiredays)
	{
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
	}

	function checkCookie()
	{
	username=getCookie('username');
	if (username!=null && username!="")
	  {
	  alert('Welcome again '+username+'!');
	  }
	else
	  {
	  username=prompt('Please enter your name:',"");
	  if (username!=null && username!="")
		{
		setCookie('username',username,365);
		}
	  }
	}

/*==== other functions ====*/
		
	/**
	 *	interprets a report named with twCheese format
	 *	@param reportName:String
	 *	@return report:twcheese_BattleReport
	 */
	function twcheese_interpretReportName(reportName)
	{			
		var report = new twcheese_BattleReport();
		
		var pattern = /\(.*?\)/gi;
		var data = reportName.match(pattern);
		if(data)
		{
			report.defenderVillage = new Array();
			if(reportName.split(' ')[0] == 'twCheese:') /* report named with twCheese format */
			{
				/*==== set attacker village ====*/
				try
				{						
					data[0] = data[0].substring(data[0].lastIndexOf('(')+1,data[0].lastIndexOf(')'));
					report.attackerVillage = new Array();
					report.attackerVillage[0] = data[0].split(',')[0].split('|')[0];
					report.attackerVillage[1] = data[0].split(',')[0].split('|')[1];
					report.attackerVillage[2] = data[0].split(',')[1];
				}
				catch(err)
				{
				}
				
				/*==== set defender village ====*/
				try
				{						
					data[1] = data[1].substring(data[1].lastIndexOf('(')+1,data[1].lastIndexOf(')'));					
					report.defenderVillage[0] = data[1].split(',')[0].split('|')[0];
					report.defenderVillage[1] = data[1].split(',')[0].split('|')[1];
					report.defenderVillage[2] = data[1].split(',')[1];
				}
				catch(err)
				{
					report.defenderVillage = null;
				}
			}
			else
			{
				/*==== set defender village ====*/
				try
				{
					
					var defIndex;
					if(reportName.charAt(reportName.length-1) == ')') /* report was renamed by the game based on the command name */
						defIndex = data.length - 2
					else
						defIndex = data.length - 1
						
					data[defIndex] = data[defIndex].substring(data[defIndex].lastIndexOf('(')+1,data[defIndex].lastIndexOf(')'));
					report.defenderVillage[0] = data[defIndex].split(',')[0].split('|')[0];
					report.defenderVillage[1] = data[defIndex].split(',')[0].split('|')[1];
				}
				catch(err)
				{
					report.defenderVillage = null;
				}
			}	
		}
		
		return report;
	}
	
	/**
	 *	
	 *	@param	option:String	indicates what type of text to return
	 *	@param	report:twcheese_BattleReport	the report to get data from
	 *	@return	text:String
	 */
	function twcheese_renameText(option,report)
	{
		if(option == 'nothing')
		{
			return '';
		}
		else
		{
			var text = '';
			if(report.espionageLevel >=2)
			{
				if(option == 'buildings:all')
					text += ' __ buildings: ' + JSON.stringify(report.buildingLevels);
				if(option == 'buildings:hq')
					text += ' __ hq (level ' + report.buildingLevels[0] +')';
				if(option == 'buildings:barracks')
					if(report.buildingLevels[1] > 0)
						text += ' __ barracks (level ' + report.buildingLevels[1] +')';
				if(option == 'buildings:stable')
					if(report.buildingLevels[2] > 0)
						text += ' __ stable (level ' + report.buildingLevels[2] +')';
				if(option == ' __ buildings:workshop')
					if(report.buildingLevels[3] > 0)
						text += ' __ workshop (level ' + report.buildingLevels[3] +')';
				if(option == 'buildings:church')
					if(report.buildingLevels[4] > 0)
						text += ' __ church (level ' + report.buildingLevels[4] +')';
				if(option == 'buildings:church_f')
					if(report.buildingLevels[5] > 0)
						text += ' __ first church (level ' + report.buildingLevels[5] +')';
				if(option == 'buildings:academy')
					if(report.buildingLevels[6] > 0)
						text += ' __ academy (level ' + report.buildingLevels[6] +')';
				if(option == 'buildings:smithy')
					if(report.buildingLevels[7] > 0)
						text += ' __ smithy (level ' + report.buildingLevels[7] +')';
				if(option == 'buildings:rally')
					if(report.buildingLevels[8] > 0)
						text += ' __ rally point (level ' + report.buildingLevels[8] +')';
				if(option == 'buildings:statue')
					if(report.buildingLevels[9] > 0)
						text += ' __ statue (level ' + report.buildingLevels[9] +')';
				if(option == 'buildings:market')
					if(report.buildingLevels[10] > 0)
						text += ' __ market (level ' + report.buildingLevels[10] +')';
				if(option == 'buildings:timber')
					if(report.buildingLevels[11] > 0)
						text += ' __ timber camp (level ' + report.buildingLevels[11] +')';
				if(option == 'buildings:clay')
					if(report.buildingLevels[12] > 0)
						text += ' __ clay pit(level ' + report.buildingLevels[12] +')';
				if(option == 'buildings:iron')
					if(report.buildingLevels[13] > 0)
						text += ' __ iron mine (level ' + report.buildingLevels[13] +')';
				if(option == 'buildings:farm')
					text += ' __ farm (level ' + report.buildingLevels[14] +')';
				if(option == 'buildings:warehouse')
					text += ' __ warehouse (level ' + report.buildingLevels[15] +')';
				if(option == 'buildings:hiding')
					if(report.buildingLevels[16] > 0)
						text += ' __ hiding place (level ' + report.buildingLevels[16] +')';
				if(option == 'buildings:wall')
					if(report.buildingLevels[17] > 0)
						text += ' __ wall (level ' + report.buildingLevels[17] +')';
			}
			if(report.espionageLevel >= 1)
			{
				if(option == 'resources:all')
				{
					var totalResources = report.resources[0]+report.resources[1]+report.resources[2];
					if(totalResources > 0)
						text += ' __ resources: ' + totalResources;
				}
				
			}
			if(option == 'troops:defSurvivors')
				text += ' __ defense remaining: ' + JSON.stringify(report.survivors);
			if(option == 'loyalty')
				if(report.loyalty)
					text += ' __ loyalty: ' + report.loyalty[1];
			if(option == 'time:launched')
				text += ' __ launched@ ' + twcheese_dateToString(report.timingInfo[0]);
					
			return text;
		}
	}
	
	/**
	 *	@param time:Date
	 *	@return time:String	formatted TW style
	 */
	
	function twcheese_dateToString(time)
	{
		var monthText = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
		var timeString = '';
		timeString += monthText[time.getMonth()] + ' ';
		if(time.getDate() < 10)
			timeString += '0';
		timeString += time.getDate() + ', ';
		timeString += time.getFullYear() + '  ';
		if(time.getHours() < 10)
			timeString += '0';
		timeString += time.getHours() + ':';
		if(time.getMinutes() < 10)
			timeString += '0';
		timeString += time.getMinutes() + ':';
		if(time.getSeconds() < 10)
			timeString += '0';
		timeString += time.getSeconds();
		return timeString;
	}
	
	/**
	 *	requests the xml from a page
	 *	@param	targetUrl:String	the url of the page to get the document from
	 *	@return	requestedXML:String
	 */
	function twcheese_requestXML(targetUrl)
	{
		var xmlhttp;
		if (window.XMLHttpRequest)
			xmlhttp=new XMLHttpRequest();
		else
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		xmlhttp.open("GET",targetUrl,false);
		xmlhttp.send("");

		return xmlhttp.responseText;
	}
	
	/**
	 *	@return serverTime:Date();
	 */
	function twcheese_getServerTime()
	{
		var serverTime = new Date();
		var date = gameDoc.getElementById('serverDate').innerHTML;
		var time = gameDoc.getElementById('serverTime').innerHTML;
		
		serverTime.setSeconds(time.split(':')[2]);
		serverTime.setMinutes(time.split(':')[1]);
		serverTime.setHours(time.split(':')[0]);
		serverTime.setDate(date.split('/')[0]);
		serverTime.setMonth(date.split('/')[1]-1);
		serverTime.setYear(date.split('/')[2]);
		
		return serverTime;
	}
	
	function twcheese_getServerSettings()
	{
		var gameConfig = new function(){};
		
		if(!getCookie('twcheese_game_config'))
		{
			var configXML = twcheese_requestXML('http://' + document.domain + '/interface.php?func=get_config')
			
			gameConfig.speed = configXML.match(/\<SPEED>.*?\<\/SPEED>/gi)[0].toLowerCase().replace('<speed>','').replace('</speed>','');
			gameConfig.unit_speed = configXML.match(/\<UNIT_SPEED>.*?\<\/UNIT_SPEED>/gi)[0].toLowerCase().replace('<unit_speed>','').replace('</unit_speed>','');
			
			setCookie('twcheese_game_config',escape(JSON.stringify(gameConfig)),30);
		}
		else
			gameConfig = JSON.parse(unescape(getCookie('game_config')));
			
		return gameConfig;
	}
	
	function twcheese_getBRESettings()
	{
		if(!getCookie('twcheese_breSettings'))
		{
			var breSettings = new function(){};
			breSettings.rename1 = 'nothing';
			breSettings.rename2 = 'nothing';
			breSettings.rename3 = 'nothing';
			breSettings.rename4 = 'nothing';
			breSettings.rename5 = 'nothing';
			breSettings.rename6 = 'nothing';
			breSettings.autoRename = false;
			breSettings.period = 8;
			breSettings.raid = 'scouted';
			return breSettings;
		}
		else
			return JSON.parse(unescape(getCookie('twcheese_breSettings')));
	}
	
	function twcheese_setBRESettings(breSettings)
	{
		setCookie('twcheese_breSettings',escape(JSON.stringify(breSettings)),30);		
	}

/*==== main ====*/

	var gameDoc = (window.frames.length>0)?window.main.document:document;
	
	/*==== get server settings ====*/
	var twcheese_gameConfig = twcheese_getServerSettings();
		
	/*==== get user settings ====*/
	var twcheese_BRESettings = twcheese_getBRESettings();
	
	/*==== do the dew ====*/
	if(game_data.screen == 'report' && gameDoc.URL.search('&view=') != -1) /* viewing single report	*/
	{
		/*==== calculate additional information ===*/
		var twcheese_currentReport = new twcheese_scrapeBattleReport(gameDoc);
		if(twcheese_currentReport.defenderQuantity)
			twcheese_currentReport.survivors = twcheese_calculateSurvivors(twcheese_currentReport.defenderQuantity,twcheese_currentReport.defenderLosses);		
		if(twcheese_currentReport.buildingLevels)
			twcheese_currentReport.populationSummary = twcheese_calculatePopulation(twcheese_currentReport.buildingLevels,twcheese_currentReport.defenderQuantity,twcheese_currentReport.unitsOutside);
		twcheese_currentReport.opponentsDefeatedSummary = twcheese_calculateOd(twcheese_currentReport.attackerLosses,twcheese_currentReport.defenderLosses);
		if(twcheese_currentReport.loyalty)
			twcheese_currentReport.loyaltyExtra = twcheese_calculateLoyalty(twcheese_gameConfig.speed,twcheese_gameConfig.unit_speed,twcheese_currentReport.loyalty[1],twcheese_currentReport.sent,twcheese_getServerTime(),game_data.village.coord.split('|'),twcheese_currentReport.defenderVillage);
		twcheese_currentReport.timingInfo = twcheese_calculateTimingInfo(twcheese_gameConfig.speed,twcheese_gameConfig.unit_speed,twcheese_currentReport.sent,twcheese_currentReport.attackerQuantity,twcheese_currentReport.attackerVillage,twcheese_currentReport.defenderVillage);
		if(twcheese_currentReport.buildingLevels)
			twcheese_currentReport.demolition = twcheese_calculateDemolition(twcheese_currentReport.buildingLevels);
		if(twcheese_currentReport.espionageLevel >= 1)
			twcheese_currentReport.raidScouted = twcheese_calculateRaidScouted(twcheese_currentReport.resources);
		if(twcheese_currentReport.espionageLevel >= 2)
		{
			twcheese_currentReport.raidPredicted = twcheese_calculateRaidPredicted(twcheese_currentReport.resources,twcheese_currentReport.buildingLevels,game_data.village.coord.split('|'),twcheese_currentReport.defenderVillage,twcheese_currentReport.sent,twcheese_getServerTime(),twcheese_gameConfig.speed);
			twcheese_currentReport.raidPeriodic = twcheese_calculateRaidPeriodic(twcheese_currentReport.buildingLevels,8,twcheese_gameConfig.speed);
		}
		
		/*==== add stuff to the page ====*/
		pageMod = new twcheese_BattleReportEnhancer(gameDoc,twcheese_currentReport);
		if(twcheese_BRESettings.autoRename)
			pageMod.renameReport(twcheese_BRESettings.rename1,twcheese_BRESettings.rename2,twcheese_BRESettings.rename3,twcheese_BRESettings.rename4,twcheese_BRESettings.rename5,twcheese_BRESettings.rename6);
		pageMod.includeExtraInformation();
		pageMod.includeReportTools();
		
		/*==== set to user defaults ====*/		
		if(twcheese_currentReport.espionageLevel >=1)
		{
			twcheese_changeRaidMode(twcheese_BRESettings.raid);
			gameDoc.getElementById('twcheese_period').value = twcheese_BRESettings.period;
		}
		
		for(var i=0; i < 6; i++)
			eval('gameDoc.getElementById(\'twcheese_renameOption'+i+'\').value = twcheese_BRESettings.rename'+Number(i+1));
		gameDoc.getElementById('twcheese_auto_rename').checked = twcheese_BRESettings.autoRename;
		twcheese_previewNewName(twcheese_currentReport);
	}
	else if(game_data.screen == 'report' && game_data.mode == 'attack') /* viewing reports folder with 'Attacks' filter on	*/
	{
		if(!twcheese_reportsFolderEnhanced)
		{
			pageMod = new twcheese_BattleReportsFolderEnhancer(gameDoc);
			pageMod.includeDistances();
			pageMod.includeRepeatCurrentLinks();
			pageMod.includeRepeatOriginalLinks();
			pageMod.markPartialHauls();
			var twcheese_reportsFolderEnhanced = true;
		}
	}
	else
	{
		alert('try using this on:\n1) reports folder with Attacks filter on\n2) a battle report');
	}

