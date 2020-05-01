/**
 *	cFRS.js
 *	cFRS (commands: Filter, Rename, Share)
 *	@version	1.0.6
 *	last updated: April 13, 2014
 *	game compatability:	version	20017 8.20
 *	@author		Nick Toby (cheesasaurus@gmail.com)
 
 ==== pages where this can be used ==== 
 * commands overview (game.php?screen=overview_villages&mode=commands)
  
 ==== changelog ====
 *	19 sep 2013 - fixed button colors
 *	14 oct 2013 - fixed for archer world (was setting axes as archers)
 *	14 oct 2013 - no longer display archer columns for non-archer worlds
 *	22 oct 2013 - added ability to delete filters from load/save screens
 *	22 oct 2013 - fixed display bug with textarea resizing in share widget
 *	19 mar 2014 - updated for version 8.20 quickedit
 *	13 apr 2014 - added 'no overwrite' mode (only renames/tags commands that haven't been renamed yet). also updated for new command icons
 
 
 ==== license ====
 *	Copyright (C) 2013  Nick Toby

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
	var twcheese = {};
	
/*==== images ====*/
	var imagePaths = new Array();
	imagePaths['units'] = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
	imagePaths['units'][0] = 'graphic/unit/unit_spear.png?1';
	imagePaths['units'][1] = 'graphic/unit/unit_sword.png?1';
	imagePaths['units'][2] = 'graphic/unit/unit_axe.png?1';
	imagePaths['units'][3] = 'graphic/unit/unit_archer.png?1';
	imagePaths['units'][4] = 'graphic/unit/unit_spy.png?1';
	imagePaths['units'][5] = 'graphic/unit/unit_light.png?1';
	imagePaths['units'][6] = 'graphic/unit/unit_marcher.png?1';
	imagePaths['units'][7] = 'graphic/unit/unit_heavy.png?1';
	imagePaths['units'][8] = 'graphic/unit/unit_ram.png?1';
	imagePaths['units'][9] = 'graphic/unit/unit_catapult.png?1';
	imagePaths['units'][10] = 'graphic/unit/unit_knight.png?1';
	imagePaths['units'][11] = 'graphic/unit/unit_snob.png?1';
	
	imagePaths['delete'] = 'graphic/delete.png?1';
	
/*==== configuration ====*/

	twcheese.loadGameConfig = function()
	{
		if(!localStorage.getItem('twcheese.gameConfig'))
		{
			var xml = twcheese.requestXML('interface.php?func=get_config');			
			function setting(name)
			{
				return xml.getElementsByTagName(name)[0].firstChild.nodeValue;
			}
			
			twcheese.gameConfig = {
				speed: setting('speed'),
				unitSpeed: setting('unit_speed'),
				archer: setting('archer'),
				paladin: setting('knight')			
			};
			localStorage.setItem('twcheese.gameConfig', JSON.stringify(twcheese.gameConfig));
		}
		else
			twcheese.gameConfig = JSON.parse(localStorage.getItem('twcheese.gameConfig'));
	};

	twcheese.cFRS_config = {
		autoFilter: false,
		autoTag: false,
		namePrepend: false,
		noOverwrite: true,
		
		showWidget: true,
		tab: 'rename',
		
	
		activeFilter : {
			destEnabled: false,
			destCoord: '',
			destK: '',
			
			arrivalEnabled: false,
			arrivalMin: 0,
			arrivalMax: 8640000000000000,
			
			unitsEnabled: [
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false
			],
			
			unitsMin: [
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0
			],
			
			unitsMax: [
				24000,
				24000,
				24000,
				24000,
				12000,
				6000,
				4800,
				4000,
				4800,
				3000,
				1,
				240
			]
		}
	};
	
	twcheese.cFRS_filters = [
		{
			name: 'nukes',
			
			tag: '&nuke',			
			tagAttack: true,
			tagSupport: false,
			
			destEnabled: false,
			destCoord: '',
			destK: '',
			
			arrivalEnabled: false,
			arrivalMin: 0,
			arrivalMax: 8640000000000000,
			
			unitsEnabled: [
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				true,
				false,
				false,
				false
			],
			
			unitsMin: [
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				213,
				0,
				0,
				0
			],
			
			unitsMax: [
				24000,
				24000,
				24000,
				24000,
				12000,
				6000,
				4800,
				4000,
				4800,
				3000,
				1,
				240
			]
		},
		
		{
			name: 'nobility',
			
			tag: '&noble',
			tagAttack: true,
			tagSupport: false,
			
			destEnabled: false,
			destCoord: '',
			destK: '',
			
			arrivalEnabled: false,
			arrivalMin: 0,
			arrivalMax: 8640000000000000,
			
			unitsEnabled: [
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				true
			],
			
			unitsMin: [
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				1
			],
			
			unitsMax: [
				24000,
				24000,
				24000,
				24000,
				12000,
				6000,
				4800,
				4000,
				4800,
				3000,
				1,
				240
			]
		},
		
		{
			name: 'scouting missions',
			
			tag: '&spy',
			tagAttack: true,
			tagSupport: false,
			
			destEnabled: false,
			destCoord: '',
			destK: '',
			
			arrivalEnabled: false,
			arrivalMin: 0,
			arrivalMax: 8640000000000000,
			
			unitsEnabled: [
				false,
				false,
				false,
				false,
				true,
				false,
				false,
				false,
				false,
				false,
				false,
				false
			],
			
			unitsMin: [
				0,
				0,
				0,
				0,
				61,
				0,
				0,
				0,
				0,
				0,
				0,
				0
			],
			
			unitsMax: [
				24000,
				24000,
				24000,
				24000,
				12000,
				6000,
				4800,
				4000,
				4800,
				3000,
				1,
				240
			]
		},
		
		{
			name: 'raiding party!',
			
			tag: '&raid',
			tagAttack: true,
			tagSupport: false,
			
			destEnabled: false,
			destCoord: '',
			destK: '',
			
			arrivalEnabled: false,
			arrivalMin: 0,
			arrivalMax: 8640000000000000,
			
			unitsEnabled: [
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				true,
				true,
				false,
				true
			],
			
			unitsMin: [
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0
			],
			
			unitsMax: [
				24000,
				24000,
				24000,
				24000,
				12000,
				6000,
				4800,
				4000,
				0,
				0,
				1,
				0
			]			
		},
		
		{
			name: 'demolition crews',
			tag: '&demo',
			
			tagAttack: true,
			tagSupport: false,
			
			destEnabled: false,
			destCoord: '',
			destK: '',
			
			arrivalEnabled: false,
			arrivalMin: 0,
			arrivalMax: 8640000000000000,
			
			unitsEnabled: [
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				true,
				false,
				true
			],
			
			unitsMin: [
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				1,
				0,
				0
			],
			
			unitsMax: [
				24000,
				24000,
				24000,
				24000,
				12000,
				6000,
				4800,
				4000,
				4800,
				3000,
				1,
				0
			]			
		},
		
		{
			name: 'distractions',
			tag: '&lure',
			
			tagAttack: true,
			tagSupport: false,
			
			destEnabled: false,
			destCoord: '',
			destK: '',
			
			arrivalEnabled: false,
			arrivalMin: 0,
			arrivalMax: 8640000000000000,
			
			unitsEnabled: [
				true,
				true,
				true,
				true,
				false,
				true,
				true,
				true,
				false,
				false,
				false,
				false
			],
			
			unitsMin: [
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				1,
				0,
				0
			],
			
			unitsMax: [
				1,
				1,
				1,
				1,
				60,
				1,
				1,
				1,
				24,
				15,
				1,
				240
			]			
		},
		
		{
			name: 'first aid',
			
			tag: '&hcD',			
			tagAttack: false,
			tagSupport: true,
			
			destEnabled: false,
			destCoord: '',
			destK: '',
			
			arrivalEnabled: false,
			arrivalMin: 0,
			arrivalMax: 8640000000000000,
			
			unitsEnabled: [
				true,
				false,
				false,
				true,
				false,
				false,
				false,
				true,
				false,
				false,
				false,
				false
			],
			
			unitsMin: [
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				500,
				0,
				0,
				0,
				0
			],
			
			unitsMax: [
				1,
				24000,
				24000,
				1,
				12000,
				6000,
				4800,
				4000,
				4800,
				3000,
				1,
				240
			]
		},
	];

/*==== widgets ====*/

	twcheese.cFRS_createMainWidget = function()
	{
		var mainContainer = document.createElement('div');
		mainContainer.id = 'twcheese_commands_widget';
		mainContainer.width = '100%';
		mainContainer.style.border = '1px solid #7D510F';
		mainContainer.style.marginBottom = '20px';
		
		/*==== title bar ====*/
		var titleBar = document.createElement('div');
		titleBar.style.background = '#C1A264 url("http://cdn2.tribalwars.net/graphic/screen/tableheader_bg3.png?2cef7") repeat-x';
		titleBar.style.padding = '4px';
				
			/*==== widget toggle button ====*/
			var toggleButton = document.createElement('span');
			toggleButton.id = 'twcheese_cFRS_toggle_button';
			toggleButton.onclick = function(){
				if(this.style.backgroundImage.search('graphic/minus.png') != -1)
					twcheese.cFRS_hideMainWidget();
				else
					twcheese.cFRS_showMainWidget();
			};
			toggleButton.style.cursor = 'pointer';
			toggleButton.style.cssFloat = 'right';
			toggleButton.style.backgroundImage = 'url(\'graphic/plus.png\')';
			toggleButton.style.height = '12px';
			toggleButton.style.width = '12px';
			toggleButton.style.display = 'inline-block';
			
			/*==== title ====*/
			var titleEle = document.createElement('span');
			titleEle.innerHTML = 'cFRS';
			titleEle.id = 'twcheese_main_widget_title';
			titleEle.title = '<b>c</b>ommands: <b>F</b>ilter, <b>R</b>ename, <b>S</b>hare';
			titleEle.style.fontWeight = '600';
			UI.ToolTip(titleEle);
			
			/*==== narcisism ====*/
			var contactEle = document.createElement('span');
			contactEle.innerHTML = ' created by <a href="http://forum.tribalwars.net/member.php?u=28484">cheesasaurus</a>';
			contactEle.style.fontSize = '8px';
			
			titleBar.appendChild(titleEle);
			titleBar.appendChild(contactEle);
			titleBar.appendChild(toggleButton);
			mainContainer.appendChild(titleBar);
		
		/*==== content ====*/
		var content = document.createElement('div');
		content.id = 'twcheese_cFRS_widget_content';
		content.style.display = 'none';
		content.style.height = '200px';
		
			/*==== tabs ====*/
			var tabBar = document.createElement('div');
			tabBar.style.marginTop = '5px';
			
			var renameTab = document.createElement('span');
			renameTab.id = 'twcheese_tab_rename';
			renameTab.innerHTML = 'Rename';
			renameTab.onclick = function(){twcheese.cFRS_switchTab('rename')};
			twcheese.style.tabInactive(renameTab);
			tabBar.appendChild(renameTab);
			
			var filterTab = document.createElement('span');
			filterTab.id = 'twcheese_tab_filter';
			filterTab.innerHTML = 'Filter';
			filterTab.onclick = function(){twcheese.cFRS_switchTab('filter')};
			twcheese.style.tabInactive(filterTab);
			tabBar.appendChild(filterTab);
			
			var shareTab = document.createElement('span');
			shareTab.id = 'twcheese_tab_share';
			shareTab.innerHTML = 'Share';
			shareTab.onclick = function(){twcheese.cFRS_switchTab('share')};
			twcheese.style.tabInactive(shareTab);
			tabBar.appendChild(shareTab);
			
			content.appendChild(tabBar);
			
			/*==== renamer widget ====*/
			var tagWidget = twcheese.cFRS_createTagWidget();
			content.appendChild(tagWidget);
			
			/*==== filter widget ====*/			
			var filterWidget = twcheese.cFRS_createFilterWidget();
			content.appendChild(filterWidget);

			/*==== share widget ====*/
			var shareWidget = twcheese.cFRS_createShareWidget();
			content.appendChild(shareWidget);
		
		mainContainer.appendChild(content);		
		
		/*==== put main widget into document ====*/
		document.getElementById('paged_view_content').insertBefore(mainContainer ,document.getElementById('cancelform'));
		
		/*==== initialize ====*/		
		if(twcheese.cFRS_config.showWidget)
			twcheese.cFRS_showMainWidget();
		
		twcheese.cFRS_switchTab(twcheese.cFRS_config.tab);
	};

	twcheese.cFRS_createTagWidget = function()
	{
		var tagWidget = document.createElement('div');
		tagWidget.id = 'twcheese_tag_widget';
		tagWidget.style.display = 'none';
		
		var layoutTable = document.createElement('table');
		layoutTable.insertRow(-1);
		layoutTable.rows[0].insertCell(-1);
		layoutTable.rows[0].cells[0].style.verticalAlign = 'top';
		layoutTable.rows[0].insertCell(-1);
		
			/*==== rename button ====*/
			var renameButton = document.createElement('span');
			renameButton.innerHTML = 'Rename';
			renameButton.title = 'Apply a uniform name to ALL shown commands.';
			renameButton.onclick = function(){twcheese.cFRS_openRenamerWidget()};
			twcheese.style.actionButton(renameButton);
			renameButton.style.display = 'block';
			renameButton.style.marginLeft = '30px';
			renameButton.style.marginRight = '30px';
			renameButton.style.marginTop = '30px';
			UI.ToolTip(renameButton);
			layoutTable.rows[0].cells[0].appendChild(renameButton);
			
			/*==== tag button ====*/
			var tagButton = document.createElement('span');
			tagButton.innerHTML = 'Tag';
			tagButton.title = 'Rename commands using filter tags.';
			tagButton.onclick = function(){twcheese.tagCommands(twcheese.cFRS_filters, twcheese.cFRS_config.noOverwrite)};
			twcheese.style.actionButton(tagButton);
			tagButton.style.display = 'block';
			tagButton.style.marginLeft = '30px';
			tagButton.style.marginRight = '30px';
			tagButton.style.marginTop = '30px';
			UI.ToolTip(tagButton);
			layoutTable.rows[0].cells[0].appendChild(tagButton);
			
			/*==== overwrite checkbox ====*/
			var overwriteContainer = document.createElement('div');
			overwriteContainer.style.marginTop = '12px';
				var overwriteChkBox = document.createElement('input');
				overwriteChkBox.type = 'checkbox';
				overwriteChkBox.checked = twcheese.cFRS_config.noOverwrite;
				overwriteChkBox.id = 'twcheese_cFRS_namePrepend';
				overwriteChkBox.onchange = function()
				{
					twcheese.cFRS_config.noOverwrite = this.checked;
					localStorage.setItem('twcheese.cFRS_config', JSON.stringify(twcheese.cFRS_config));
				};
				overwriteChkBox.title = 'Only rename/tag commands that haven\'t been renamed yet.';
				UI.ToolTip(overwriteChkBox);
				overwriteContainer.appendChild(overwriteChkBox);
			layoutTable.rows[0].cells[0].appendChild(overwriteContainer);
			
			var overwriteLabel = document.createElement('span');
			overwriteLabel.innerHTML = 'Only unnamed';
			overwriteContainer.appendChild(overwriteLabel);
			
			/*==== tag settings ====*/
			var tagSettingsContainer = document.createElement('div');
			tagSettingsContainer.style.display = 'inline-block';
			tagSettingsContainer.style.height = '160px';
			tagSettingsContainer.style.overflowY = 'scroll';
			tagSettingsContainer.style.border = '1px solid #7D510F';
			
			var tagSettings = document.createElement('table');
				
				/*==== headers ====*/
				tagSettings.insertRow(-1);
				tagSettings.rows[0].insertCell(-1);
				tagSettings.rows[0].insertCell(-1);
				tagSettings.rows[0].insertCell(-1);
				tagSettings.rows[0].insertCell(-1);
				
				tagSettings.rows[0].cells[0].innerHTML = '<img src="graphic/command/attack.png"></img>';
				tagSettings.rows[0].cells[1].innerHTML = '<img src="graphic/command/support.png"></img>';
				tagSettings.rows[0].cells[2].innerHTML = '<b>Filter Name</b>';
				tagSettings.rows[0].cells[3].innerHTML = '<b>Tag</b>';
				
				/*==== list ====*/
				for(var row = 1; row <= twcheese.cFRS_filters.length; row++)
				{
					tagSettings.insertRow(-1);
					tagSettings.rows[row].insertCell(-1);
					tagSettings.rows[row].insertCell(-1);
					tagSettings.rows[row].insertCell(-1);
					tagSettings.rows[row].insertCell(-1);
					
					/*==== attack checkbox ====*/
					var attkChkBox = document.createElement('input');
					attkChkBox.name = row-1; //indicates position in filter array
					attkChkBox.type = 'checkbox';
					attkChkBox.title = 'Use this filter to tag <b>attacks</b>.';
					if(twcheese.cFRS_filters[row-1].tagAttack)
						attkChkBox.checked = true;
					attkChkBox.onchange = function(){
						twcheese.cFRS_filters[Number(this.name)].tagAttack = this.checked;
						localStorage.setItem('twcheese.cFRS_filters', JSON.stringify(twcheese.cFRS_filters));
					};
					UI.ToolTip(attkChkBox);
					tagSettings.rows[row].cells[0].appendChild(attkChkBox);
					
					/*==== support checkbox ====*/
					var suppChkBox = document.createElement('input');
					suppChkBox.name = row-1; //indicates position in filter array
					suppChkBox.type = 'checkbox';
					suppChkBox.title = 'Use this filter to tag <b>support</b>.';
					if(twcheese.cFRS_filters[row-1].tagSupport)
						suppChkBox.checked = 'checked';
					suppChkBox.onchange = function()
					{
						twcheese.cFRS_filters[Number(this.name)].tagSupport = this.checked;
						localStorage.setItem('twcheese.cFRS_filters', JSON.stringify(twcheese.cFRS_filters));
					};
					UI.ToolTip(suppChkBox);
					tagSettings.rows[row].cells[1].appendChild(suppChkBox);
					
					/*==== filter name ====*/
					tagSettings.rows[row].cells[2].innerHTML = twcheese.cFRS_filters[row-1].name;
					
					/*==== tag ====*/
					var tagInput = document.createElement('input');
					tagInput.name = row-1; //indicates position in filter array
					tagInput.type = 'text';
					tagInput.size = 8;
					tagInput.maxLength = 8;
					tagInput.value = twcheese.cFRS_filters[row-1].tag;
					tagInput.onchange = function()
					{
						twcheese.cFRS_filters[Number(this.name)].tag = this.value;
						localStorage.setItem('twcheese.cFRS_filters', JSON.stringify(twcheese.cFRS_filters));
					};
					tagSettings.rows[row].cells[3].appendChild(tagInput);
				}
			
			tagSettingsContainer.appendChild(tagSettings);				
			layoutTable.rows[0].cells[1].appendChild(tagSettingsContainer);
		
		tagWidget.appendChild(layoutTable);
		return tagWidget;
	};
	
	twcheese.cFRS_createFilterWidget = function()
	{
		var filterWidget = document.createElement('div');
		filterWidget.id = 'twcheese_filter_widget';
		filterWidget.style.display = 'none';
		
		/*==== destination settings ====*/
		var destTable = document.createElement('table');
		destTable.insertRow(-1);
		destTable.insertRow(-1);
		destTable.insertRow(-1);
		
		/*==== arrival time settings ====*/
		var timeTable = document.createElement('table');
		destTable.insertRow(-1);
		destTable.insertRow(-1);
		destTable.insertRow(-1);
		
		/*==== unit settings ====*/
		var unitTable = document.createElement('table');
		unitTable.style.display = 'block';
		unitTable.style.marginLeft = '30px';
		unitTable.insertRow(-1);
		unitTable.insertRow(-1);
		unitTable.insertRow(-1);
		
		for(var i=0; i<12; i++)
		{
			/*==== header ====*/
			unitTable.rows[0].insertCell(-1);
			unitTable.rows[0].cells[i].style.paddingLeft = '6px';
			
			var icon = document.createElement('img');
			icon.src = imagePaths['units'][i];
			unitTable.rows[0].cells[i].appendChild(icon);
			
			var chkBox = document.createElement('input');
			chkBox.name = i; //indicates unit
			chkBox.title = 'Use this unit\'s min & max when filtering.';
			chkBox.type = 'checkbox';
			chkBox.checked = twcheese.cFRS_config.activeFilter.unitsEnabled[i];
			chkBox.onchange = function()
			{
				twcheese.cFRS_config.activeFilter.unitsEnabled[Number(this.name)] = this.checked;
			};
			UI.ToolTip(chkBox);
			unitTable.rows[0].cells[i].appendChild(chkBox);
			
			/*==== min ====*/
			unitTable.rows[1].insertCell(-1);
			
			var input = document.createElement('input');
			input.name = i; //indicates unit
			input.title = 'minimum amount of units';
			input.type = 'text';
			input.size = 5;
			input.maxLength = 5;
			input.value = twcheese.cFRS_config.activeFilter.unitsMin[i];
			input.onchange = function()
			{
				twcheese.cFRS_config.activeFilter.unitsMin[Number(this.name)] = this.value;
			};
			UI.ToolTip(input);
			unitTable.rows[1].cells[i].appendChild(input);			
			
			/*==== max ====*/
			unitTable.rows[2].insertCell(-1);
			
			var input = document.createElement('input');
			input.name = i; //indicates unit
			input.title = 'maximum amount of units';
			input.type = 'text';
			input.size = 5;
			input.maxLength = 5;
			input.value = twcheese.cFRS_config.activeFilter.unitsMax[i];
			input.onchange = function()
			{
				twcheese.cFRS_config.activeFilter.unitsMax[Number(this.name)] = this.value;
			};
			UI.ToolTip(input);
			unitTable.rows[2].cells[i].appendChild(input);
		}
		
		/*==== load button ====*/
		var loadButton = document.createElement('span');
		loadButton.innerHTML = 'Load';
		loadButton.title = 'Load a saved (or default) filter';
		loadButton.onclick = function(){twcheese.cFRS_openLoadWidget()};
		twcheese.style.settingButton(loadButton);
		loadButton.style.display = 'block';
		loadButton.style.marginTop = '15px';
		loadButton.style.marginLeft = '15px';
		loadButton.style.marginBottom = '15px';
		UI.ToolTip(loadButton);
		
		/*==== save button ====*/
		var saveButton = document.createElement('span');
		saveButton.innerHTML = 'Save As';
		saveButton.title = 'Save this filter';
		saveButton.onclick = function(){twcheese.cFRS_openSaveWidget()};
		twcheese.style.settingButton(saveButton);
		saveButton.style.display = 'block';
		saveButton.style.marginLeft = '15px';		
		UI.ToolTip(saveButton);
		
		/*==== apply button ====*/
		var applyButton = document.createElement('span');
		applyButton.innerHTML = 'Apply Filter';
		applyButton.title = 'Apply this filter.';
		applyButton.onclick = function()
		{
			localStorage.setItem('twcheese.cFRS_config', JSON.stringify(twcheese.cFRS_config));
			twcheese.cFRS_filterCommands(twcheese.cFRS_config.activeFilter);
			$('#twcheese_share_widget').replaceWith(twcheese.cFRS_createShareWidget()); //change the "share widget" content
		};
		twcheese.style.actionButton(applyButton);
		applyButton.style.display = 'block';
		applyButton.style.width = '90px';
		applyButton.style.marginLeft = 'auto';
		applyButton.style.marginRight = 'auto';
		applyButton.style.marginTop = '15px';
		UI.ToolTip(applyButton);
		
		
		
		/*==== layout ====*/
		var layout = document.createElement('table');
		layout.insertRow(-1);
		layout.insertRow(-1);
		layout.insertRow(-1);
		layout.rows[0].insertCell(-1);
		layout.rows[0].insertCell(-1);
		layout.rows[1].insertCell(-1);
		layout.rows[2].insertCell(-1);	
		layout.rows[0].cells[1].rowSpan = 2;
		layout.rows[2].cells[0].colSpan = 2;
		
		layout.rows[0].cells[0].appendChild(destTable);
		layout.rows[0].cells[0].appendChild(timeTable);
		layout.rows[1].cells[0].appendChild(unitTable);
		layout.rows[0].cells[1].appendChild(loadButton);
		layout.rows[0].cells[1].appendChild(saveButton);
		layout.rows[2].cells[0].appendChild(applyButton);
				
		filterWidget.appendChild(layout);
			
		return filterWidget;
	};
	
	twcheese.cFRS_createShareWidget = function()
	{
		var commands = twcheese.cFRS_scrapeCommands();
		var visibleCommands = new Array();
		for(var i=0; i<commands.length; i++)
		{
			var addToList = true;
			
			if(twcheese.cFRS_queryMatches)
			{
				if(!twcheese.cFRS_queryMatches[i])
				{
					addToList = false;
				}
			}
			
			if(addToList)
			{
				visibleCommands.push(commands[i]);
			}
		}		
		var postsNeeded = visibleCommands.length / 64;
		var postCommands = new Array();
		for(var i=0; i<postsNeeded; i++)
		{
			postCommands[i] = visibleCommands.slice(i*64,(i+1)*64);
		}
		
		/*==== create widget ====*/
		var shareWidget = document.createElement('div');
		shareWidget.id = 'twcheese_share_widget';
		shareWidget.style.display = 'none';					
		
			/*==== posts ====*/
			var postContainer = document.createElement('div');
			postContainer.style.whiteSpace = 'nowrap';
			postContainer.style.overflowX = 'auto';
			postContainer.style.maxWidth = '900px';
			postContainer.style.overflowY = 'auto';
			postContainer.style.maxHeight = '140px';
			postContainer.style.marginLeft = '15px';
			postContainer.style.marginRight = '15px';
			postContainer.style.marginTop = '15px';
			
			for(var p=0; p<postsNeeded; p++)
			{
				var post = document.createElement('div');
				post.style.display = 'inline-block';
				
				/*==== header ====*/
				var postHeader = document.createElement('span');
				postHeader.innerHTML = 'Post #' + Number(p+1);			
				post.appendChild(postHeader);
				
				/*==== message ====*/
				var postMessage = document.createElement('textarea');
				postMessage.style.display = 'block';
				postMessage.rows = 5;
				postMessage.cols = 5;
				
				var message = '[table][**]destination[||]Arrival time[||][unit]spear[/unit][||][unit]sword[/unit][||][unit]axe[/unit]';
				if(twcheese.gameConfig.archer != 0)
					message += '[||][unit]archer[/unit]';
				message += '[||][unit]spy[/unit][||][unit]light[/unit]';
				if(twcheese.gameConfig.archer != 0)
					message += '[||][unit]marcher[/unit]';
				message += '[||][unit]heavy[/unit][||][unit]ram[/unit][||][unit]catapult[/unit][||][unit]snob[/unit][/**]';
				
				for(var c=0; c<postCommands[p].length; c++)
				{
					var command = postCommands[p][c];
					message += '[*][coord]' + command.destination + '[/coord]';
					message += '[|]' + command.arrivalTime;
					
					/*==== units ====*/
					message += '[|]' + command.troops[0]; //spear
					message += '[|]' + command.troops[1]; //sword
					message += '[|]' + command.troops[2]; //axe
					if(twcheese.gameConfig.archer != 0)
						message += '[|]' + command.troops[3]; //archer
					message += '[|]' + command.troops[4]; //spy
					message += '[|]' + command.troops[5]; //lcav
					if(twcheese.gameConfig.archer != 0)
						message += '[|]' + command.troops[6]; //acav
					message += '[|]' + command.troops[7]; //hcav
					message += '[|]' + command.troops[8]; //ram
					message += '[|]' + command.troops[9]; //cat
					message += '[|]' + command.troops[11]; //snob 
				}
				message += '[/table]';
				
				postMessage.innerHTML = message;
				post.appendChild(postMessage);
				
				postContainer.appendChild(post);
			}
			shareWidget.appendChild(postContainer);
			
			/*==== description ====*/
			var description = document.createElement('span');
			description.innerHTML = 'You may copy & paste this text to your tribal forum to share currently visible commands.';
			description.style.display = 'block';
			description.style.padding = '6px';
			description.style.marginLeft = '15px';
			shareWidget.appendChild(description);		
		return shareWidget;
	};
	
	twcheese.cFRS_openLoadWidget = function()
	{
		var widget = document.createElement('div');
		widget.id = 'twcheese_cFRS_load_widget';
		widget.style.display = 'block';
		widget.style.position = 'fixed';
		widget.style.width = '500px';
		widget.style.height = '470px';
		widget.style.border = '1px solid black';		
		widget.style.top = '80px';
		widget.style.left = '50%';
		widget.style.marginLeft = '-250px';
		widget.style.backgroundColor = '#ebd7ac';
		widget.style.zIndex = 13000;
		widget.style.borderRadius = '4px';
		
		/*==== title bar ====*/
		var titleBar = document.createElement('div');
		twcheese.style.popupTitleBar(titleBar);
		
			/*==== title ====*/
			var title = document.createElement('span');
			title.innerHTML = 'Load Filter';
			title.style.fontWeight = 700;
			title.style.fontSize = '14px';
			title.marginLeft = '10px';
			titleBar.appendChild(title);			
			
		widget.appendChild(titleBar);
		
		/*==== content ====*/
		var content = document.createElement('div');
		
			/*==== list container ====*/
			var listContainer = document.createElement('div');
			listContainer.style.overflowY = 'scroll';
			listContainer.style.border = '1px solid #7D510F';
			listContainer.style.height = '300px';
			listContainer.style.margin = '15px';
			
				/*==== list ====*/
				var list = document.createElement('table');
				list.style.width = '100%';
				for(var row = 0; row < twcheese.cFRS_filters.length; row++)
				{
					list.insertRow(-1);
					list.rows[row].insertCell(-1);
					var item = list.rows[row].cells[0];
					item.name = row; //identify filter
					item.innerHTML = twcheese.cFRS_filters[row].name;
					item.onclick = function()
					{
						if(twcheese.currentSelection)
							twcheese.style.memListItem(twcheese.currentSelection); //return the previous selection to unselected style
							
						twcheese.style.memListItemSelected(this);
						twcheese.currentSelection = this;
						document.getElementById('twcheese_memSelection').innerHTML = twcheese.cFRS_filters[this.name].name;
					};
					twcheese.style.memListItem(item);

					/*==== delete button ====*/
					var delButton = document.createElement('span');
					twcheese.style.delIcon(delButton);
					delButton.style.display = 'block';
					delButton.style.cssFloat = 'right';
					delButton.style.cursor = 'pointer';
					delButton.onclick = function()
					{
						var filterIndex = this.parentNode.name;						
						if(confirm('Delete filter "' + twcheese.cFRS_filters[filterIndex].name + '"?'))
						{
							//remove item from filters
							twcheese.cFRS_filters.splice(filterIndex,1);							
							
							//save filters
							localStorage.setItem('twcheese.cFRS_filters', JSON.stringify(twcheese.cFRS_filters));
							
							//reload list
							$('#twcheese_cFRS_load_widget').remove();
							$('#fader').remove();
							twcheese.cFRS_openLoadWidget();
							
							//reload tagger widget
							$('#twcheese_tag_widget').replaceWith(twcheese.cFRS_createTagWidget());
							this.parentNode.onclick = null;
							twcheese.currentSelection = null;
						}
					};
					item.appendChild(delButton);
				}				
				listContainer.appendChild(list);
			
			content.appendChild(listContainer);
			
			/*==== selection display ====*/
			var selectionDisplay = document.createElement('div');
			selectionDisplay.innerHTML = 'selected filter: ';
			selectionDisplay.style.marginLeft = '20px';
				var selection = document.createElement('span');
				selection.id = 'twcheese_memSelection';
				selection.style.fontWeight = 700;
				selectionDisplay.appendChild(selection);
			content.appendChild(selectionDisplay);
			
			/*==== load button ====*/
			var loadButton = document.createElement('span');
			loadButton.innerHTML = 'Load';
			loadButton.onclick = function()
			{
				if(twcheese.currentSelection)
				{
					twcheese.cFRS_loadFilter(twcheese.cFRS_filters[Number(twcheese.currentSelection.name)]);
					$('#twcheese_cFRS_load_widget').remove();
					$('#fader').remove();
					twcheese.currentSelection = null;
					UI.InfoMessage('Filter loaded.', 3000, 'success');
				}
				else
					UI.InfoMessage('No filter selected.', 3000, 'error');
			};
			twcheese.style.settingButton(loadButton);
			loadButton.style.display = 'block';
			loadButton.style.width = '50px';
			loadButton.style.marginLeft = 'auto';
			loadButton.style.marginRight = 'auto';
			loadButton.style.marginTop = '30px';
			content.appendChild(loadButton);		
		widget.appendChild(content);
		
		document.getElementById('contentContainer').appendChild(widget);
		twcheese.fadeGameContent();
	};
	
	twcheese.cFRS_openSaveWidget = function()
	{		
		var widget = document.createElement('div');
		widget.id = 'twcheese_cFRS_save_widget';
		widget.style.display = 'block';
		widget.style.position = 'fixed';
		widget.style.width = '500px';
		widget.style.height = '470px';
		widget.style.border = '1px solid black';		
		widget.style.top = '80px';
		widget.style.left = '50%';
		widget.style.marginLeft = '-250px';
		widget.style.backgroundColor = '#ebd7ac';
		widget.style.zIndex = 13000;
		widget.style.borderRadius = '4px';
		
		/*==== title bar ====*/
		var titleBar = document.createElement('div');
		twcheese.style.popupTitleBar(titleBar);
		
			/*==== title ====*/
			var title = document.createElement('span');
			title.innerHTML = 'Save Filter';
			title.style.fontWeight = 700;
			title.style.fontSize = '14px';
			title.marginLeft = '10px';
			titleBar.appendChild(title);			
			
		widget.appendChild(titleBar);
		
		/*==== content ====*/
		var content = document.createElement('div');
		
			/*==== list container ====*/
			var listContainer = document.createElement('div');
			listContainer.style.overflowY = 'scroll';
			listContainer.style.border = '1px solid #7D510F';
			listContainer.style.height = '300px';
			listContainer.style.margin = '15px';
			
				/*==== list ====*/
				var list = document.createElement('table');
				list.style.width = '100%';
				for(var row = 0; row < twcheese.cFRS_filters.length; row++)
				{
					list.insertRow(-1);
					list.rows[row].insertCell(-1);
					var item = list.rows[row].cells[0];
					item.name = row; //identify filter
					item.innerHTML = twcheese.cFRS_filters[row].name;
					item.onclick = function()
					{
						if(twcheese.currentSelection)
							twcheese.style.memListItem(twcheese.currentSelection); //return the previous selection to unselected style
							
						twcheese.style.memListItemSelected(this);
						twcheese.currentSelection = this;
						document.getElementById('twcheese_memSelection').value = twcheese.cFRS_filters[this.name].name;
					};
					twcheese.style.memListItem(item);

					/*==== delete button ====*/
					var delButton = document.createElement('span');
					twcheese.style.delIcon(delButton);
					delButton.style.display = 'block';
					delButton.style.cssFloat = 'right';
					delButton.style.cursor = 'pointer';
					delButton.onclick = function()
					{
						var filterIndex = this.parentNode.name;						
						if(confirm('Delete filter "' + twcheese.cFRS_filters[filterIndex].name + '"?'))
						{
							//remove item from filters
							twcheese.cFRS_filters.splice(filterIndex,1);							
							
							//save filters
							localStorage.setItem('twcheese.cFRS_filters', JSON.stringify(twcheese.cFRS_filters));
							
							//reload list
							$('#twcheese_cFRS_save_widget').remove();
							$('#fader').remove();
							twcheese.cFRS_openSaveWidget();
							
							//reload tagger widget
							$('#twcheese_tag_widget').replaceWith(twcheese.cFRS_createTagWidget());
							this.parentNode.onclick = null;
							twcheese.currentSelection = null;
						}
					};
					item.appendChild(delButton);
				}				
				listContainer.appendChild(list);
			
			content.appendChild(listContainer);
			
			/*==== selection display ====*/
			var selectionDisplay = document.createElement('div');
			selectionDisplay.innerHTML = 'filter name: ';
			selectionDisplay.style.marginLeft = '20px';
				var selection = document.createElement('input');
				selection.type = 'text';
				selection.id = 'twcheese_memSelection';
				selection.onchange = function()
				{
					if(twcheese.currentSelection)
					{
						twcheese.style.memListItem(twcheese.currentSelection); //return the previous selection to unselected style
						twcheese.currentSelection = null;
					}					
				}
				selectionDisplay.appendChild(selection);
			content.appendChild(selectionDisplay);
			
			/*==== save button ====*/
			var saveButton = document.createElement('span');
			saveButton.innerHTML = 'Save';
			saveButton.onclick = function()
			{
				if(document.getElementById('twcheese_memSelection').value != '')
				{
					twcheese.cFRS_saveFilter(twcheese.cFRS_config.activeFilter, document.getElementById('twcheese_memSelection').value);
					$('#twcheese_cFRS_save_widget').remove();
					$('#fader').remove();
					twcheese.currentSelection = null;
				}
				else
					UI.InfoMessage('You need to enter a name.', 3000, 'error');
			};
			twcheese.style.settingButton(saveButton);
			saveButton.style.display = 'block';
			saveButton.style.width = '50px';
			saveButton.style.marginLeft = 'auto';
			saveButton.style.marginRight = 'auto';
			saveButton.style.marginTop = '30px';
			content.appendChild(saveButton);		
		widget.appendChild(content);
		
		document.getElementById('contentContainer').appendChild(widget);
		twcheese.fadeGameContent();
	};
	
	twcheese.cFRS_openRenamerWidget = function()
	{
		var widget = document.createElement('div');
		widget.id = 'twcheese_cFRS_renamer_widget';
		widget.style.display = 'block';
		widget.style.position = 'fixed';
		widget.style.width = '500px';
		widget.style.height = '200px';
		widget.style.border = '1px solid black';		
		widget.style.top = '80px';
		widget.style.left = '50%';
		widget.style.marginLeft = '-250px';
		widget.style.backgroundColor = '#ebd7ac';
		widget.style.zIndex = 13000;
		widget.style.borderRadius = '4px';
		
		/*==== title bar ====*/
		var titleBar = document.createElement('div');
		twcheese.style.popupTitleBar(titleBar);
		
			/*==== title ====*/
			var title = document.createElement('span');
			title.innerHTML = 'Rename Commands';
			title.style.fontWeight = 700;
			title.style.fontSize = '14px';
			title.marginLeft = '10px';
			titleBar.appendChild(title);			
			
		widget.appendChild(titleBar);
		
		/*==== content ====*/
		var content = document.createElement('div');
		
			/*==== input ====*/
			var inputContainer = document.createElement('div');
			inputContainer.style.marginLeft = 'auto';
			inputContainer.style.marginRight = 'auto';
			inputContainer.style.width = '200px';
			inputContainer.style.marginTop = '50px';
			
				var inputLabel = document.createElement('span');
				inputLabel.innerHTML = 'name: ';
				inputContainer.appendChild(inputLabel);
				
				var input = document.createElement('input');
				input.type = 'text';
				input.id = 'twcheese_cFRS_name_input';
				input.title = 'This name will be applied to all visible commands.';
				UI.ToolTip(input);
				inputContainer.appendChild(input);
			
			content.appendChild(inputContainer);
			
			/*==== prepend option ====*/
			var prependContainer = document.createElement('div');
			prependContainer.style.marginLeft = 'auto';
			prependContainer.style.marginRight = 'auto';
			prependContainer.style.width = '200px';
			prependContainer.style.padding = '6px';
			
				var prependChkBox = document.createElement('input');
				prependChkBox.type = 'checkbox';
				prependChkBox.checked = twcheese.cFRS_config.namePrepend;
				prependChkBox.id = 'twcheese_cFRS_namePrepend';
				prependChkBox.onchange = function()
				{
					twcheese.cFRS_config.namePrepend = this.checked;
					localStorage.setItem('twcheese.cFRS_config', JSON.stringify(twcheese.cFRS_config));
				};
				prependContainer.appendChild(prependChkBox);
				
				var prependLabel = document.createElement('span');
				prependLabel.innerHTML = 'prepend to current names';
				prependContainer.appendChild(prependLabel);
			content.appendChild(prependContainer);
			
			/*==== rename button ====*/
			var renameButton = document.createElement('span');
			renameButton.innerHTML = 'Rename';
			renameButton.onclick = function()
			{
				if(twcheese_cFRS_name_input.value != '')
				{
					UI.InfoMessage('Renaming all visible commands...', 3000, 'success');
					twcheese.renameCommands(document.getElementById('twcheese_cFRS_name_input').value, twcheese.cFRS_config.namePrepend, twcheese.cFRS_config.noOverwrite)
					$('#twcheese_cFRS_renamer_widget').remove();
					$('#fader').remove();
				}
				else
					UI.InfoMessage('You need to specify a name.', 3000, 'error');
			};
			twcheese.style.actionButton(renameButton);
			renameButton.style.display = 'block';
			renameButton.style.width = '53px';
			renameButton.style.marginLeft = 'auto';
			renameButton.style.marginRight = 'auto';
			renameButton.style.marginTop = '15px';
			UI.ToolTip(renameButton);
			content.appendChild(renameButton);

		widget.appendChild(content);
		
		document.getElementById('contentContainer').appendChild(widget);
		twcheese.fadeGameContent();
	};
	
	twcheese.fadeGameContent = function()
	{
		var fader = document.createElement('div');
		fader.id = 'fader';
		fader.style.position = 'fixed';
		fader.style.height = '100%';
		fader.style.width = '100%';
		fader.style.backgroundColor = 'black';
		fader.style.top = '0px';
		fader.style.left = '0px';
		fader.style.opacity = '0.6';
		fader.style.zIndex = '12000';
		document.body.appendChild(fader);
	};

/*==== widget functions ====*/
	
	twcheese.cFRS_showMainWidget = function()
	{
		var toggleButton = document.getElementById('twcheese_cFRS_toggle_button');
		toggleButton.style.backgroundImage = 'url(\'graphic/minus.png\')';
		$('#twcheese_cFRS_widget_content').show();
		twcheese.cFRS_config.showWidget = true;
		localStorage.setItem('twcheese.cFRS_config', JSON.stringify(twcheese.cFRS_config));
	};
	
	twcheese.cFRS_hideMainWidget = function()
	{
		var toggleButton = document.getElementById('twcheese_cFRS_toggle_button');
		toggleButton.style.backgroundImage = 'url(\'graphic/plus.png\')';
		$('#twcheese_cFRS_widget_content').hide();
		twcheese.cFRS_config.showWidget = false;
		localStorage.setItem('twcheese.cFRS_config', JSON.stringify(twcheese.cFRS_config));
	};
	
	twcheese.cFRS_showTagWidget = function()
	{
		$('#twcheese_tag_widget').show();
	};
	
	twcheese.cFRS_showFilterWidget = function()
	{
		$('#twcheese_filter_widget').show();
	};
	
	twcheese.cFRS_showShareWidget = function()
	{
		$('#twcheese_share_widget').show();
	};
	
	/**
	 *	@param tab:String - name of the active tab
	 */
	twcheese.cFRS_switchTab = function(tab)
	{
		/*==== set tab styles ====*/
		twcheese.style.tabInactive(document.getElementById('twcheese_tab_rename'));
		twcheese.style.tabInactive(document.getElementById('twcheese_tab_filter'));
		twcheese.style.tabInactive(document.getElementById('twcheese_tab_share'));
		twcheese.style.tabActive(document.getElementById('twcheese_tab_' + tab));
		
		/*==== hide widgets ====*/
		$('#twcheese_tag_widget').hide();
		$('#twcheese_filter_widget').hide();
		$('#twcheese_share_widget').hide();
		
		/*==== show related widget ====*/
		switch(tab)
		{
			case 'rename':
				twcheese.cFRS_showTagWidget();
				break;
			
			case 'filter':
				twcheese.cFRS_showFilterWidget();
				break;
			
			case 'share':
				twcheese.cFRS_showShareWidget();
				break;
		}
		
		/*==== save active tab ====*/
		twcheese.cFRS_config.tab = tab;
		localStorage.setItem('twcheese.cFRS_config', JSON.stringify(twcheese.cFRS_config));
	}

/*==== styles ====*/
	
	if(!twcheese.style)
		twcheese.style = {};
	
	/**
	 *	@param element:HTMLElement
	 */
	twcheese.style.tabInactive = function(element)
	{
		element.style.backgroundColor = '#CC9C66'; //active: #FFC582
		element.style.padding = '4px';
		element.style.display = 'inline-block';
		element.style.borderTopLeftRadius = '8px';
		element.style.borderTopRightRadius = '8px';
		element.style.border = '1px solid #7D510F';
		element.style.color = '#603000';
		element.style.fontWeight = '700';
		element.style.marginLeft = '1px';
		element.style.marginRight = '1px';
		element.style.cursor = 'pointer';
		
		element.onmouseover = function()
		{
			element.style.backgroundColor = '#E8B57B';
		};
		element.onmouseout = function()
		{
			element.style.backgroundColor = '#CC9C66';
		};
	};
	
	/**
	 *	@param element:HTMLElement
	 */
	twcheese.style.tabActive = function(element)
	{
		//element.style.backgroundColor = '#FFC582';
		element.style.backgroundColor = '#FFE0A2';
		//element.style.backgroundColor = '#F4E4BC';
		element.style.padding = '4px';
		element.style.display = 'inline-block';
		element.style.borderTopLeftRadius = '8px';
		element.style.borderTopRightRadius = '8px';
		element.style.border = '1px solid #7D510F';
		element.style.borderBottom = 'none';
		element.style.color = '#603000';
		element.style.fontWeight = '700';
		element.style.marginLeft = '1px';
		element.style.marginRight = '1px';
		element.style.cursor = 'default';
		
		element.onmouseover = null;
		element.onmouseout = null;
	};
	
	/**
	 *	@param element:HTMLElement
	 */
	twcheese.style.actionButton = function(element)
	{		
		element.style.border = '1px solid black';
		element.style.padding = '4px 10px';
		element.style.color = '#FFFFFF';
		element.style.fontWeight = '700';
		element.style.cursor = 'pointer';
		element.style.textAlign = 'center';
		element.style.borderRadius = '4px';
		twcheese.style.bgVertGradient(element, '#48C412', '#0F7C0A');
			
		/*==== highlight on hover ====*/
		element.onmouseover = function()
		{
			twcheese.style.bgVertGradient(element, '#12F422', '#18AA09');
		};
		element.onmouseout = function()
		{
			twcheese.style.bgVertGradient(element, '#48C412', '#0F7C0A');
		};
	};
	
	/**
	 *	@param element:HTMLElement
	 */
	twcheese.style.settingButton = function(element)
	{
		element.style.border = '1px solid black';
		element.style.padding = '4px 10px';
		element.style.color = '#FFFFFF';
		element.style.fontWeight = '700';
		element.style.cursor = 'pointer';
		element.style.textAlign = 'center';
		element.style.borderRadius = '4px';
		twcheese.style.bgVertGradient(element, '#CC8829', '#A16C22');
		
		/*==== highlight on hover ====*/
		element.onmouseover = function()
		{
			twcheese.style.bgVertGradient(element, '#F2A941', '#D49031');
		};
		element.onmouseout = function()
		{
			twcheese.style.bgVertGradient(element, '#CC8829', '#A16C22');
		};
	};
	
	/**
	 *	@param element:HTMLElement
	 *	@param topColor:String
	 *	@param bottomColor:String
	 */
	twcheese.style.bgVertGradient = function(element, topColor, bottomColor)
	{
		element.style.backgroundColor = bottomColor;
		var browser;
		if(/Chrome/.test(navigator.userAgent)|| /AppleWebKit/.test(navigator.userAgent))
			browser = 'webkit';
		else if(/Firefox/.test(navigator.userAgent))
			browser = 'moz';
		else if(window.opera)
			browser = 'o';
		else if(/MSIE/.test(navigator.userAgent))
			browser = 'ms';
		
		if(browser)
			element.style.background = '-' + browser + '-linear-gradient(top, ' + topColor + ', ' + bottomColor +')';
	};
	
	/**
	 *	@param element:HTMLElement
	 */
	twcheese.style.popupTitleBar = function(element)
	{
		twcheese.style.bgVertGradient(element, '#DEC378', '#BDA666');
		element.style.height = '22px';
		element.style.padding = '4px';
		
		/*==== exit button ====*/
		var exitButton = document.createElement('span');
		exitButton.style.backgroundImage = 'url("graphic/login_close.png")';
		exitButton.style.height = '20px';
		exitButton.style.width = '20px';
		exitButton.style.display = 'inline-block';
		exitButton.style.cssFloat = 'right';
		exitButton.style.cursor = 'pointer';
		exitButton.onclick = function()
		{
			$(this.parentNode.parentNode).remove();
			$('#fader').remove();
			twcheese.currentSelection = null;
		};
		element.appendChild(exitButton);
	};
	
	/**
	 *	@param element:HTMLElement
	 */
	twcheese.style.memListItem = function(element)
	{
		element.style.border = '1px solid #A89A7D';
		element.style.padding = '4px';
		element.style.backgroundColor = '#DEC9A0';
		element.onmouseover = function()
		{
			element.style.backgroundColor = '#DED4C1';
		};
		element.onmouseout = function()
		{
			element.style.backgroundColor = '#DEC9A0';
		};
	};
	
	/**
	 *	@param element:HTMLElement
	 */
	twcheese.style.memListItemSelected = function(element)
	{
		element.style.backgroundColor = '#CCB893';
		element.onmouseover = null;
		element.onmouseout = null;
	};

	/**
	 *	@param element:HTMLElement
	 */
	twcheese.style.delIcon = function(element)
	{
		element.style.height = '15px';
		element.style.width = '15px';
		element.style.backgroundImage = 'url("'+imagePaths['delete']+'")';
	};
/*==== enhancers ====*/

	twcheese.cFRS_filterCommands = function(filterConfig)
	{
		commands = twcheese.cFRS_scrapeCommands();
		
		//apply filter
		twcheese.cFRS_queryMatches = new Array();
		var commandsTable = document.getElementById('commands_table');
		for(var row=1; row < commandsTable.rows.length-1; row++)
		{
			if(twcheese.cFRS_matchesQuery(commands[row-1], filterConfig))
			{
				$(commandsTable.rows[row]).show();
				twcheese.cFRS_queryMatches[row-1] = true;			
			}
			else
			{
				$(commandsTable.rows[row]).hide();
				twcheese.cFRS_queryMatches[row-1] = false;
			}
		}
		UI.InfoMessage('Filter applied.', 3000, 'success');
	};
	
/*==== twcheese actions ====*/
	
	twcheese.cFRS_saveFilter = function(filter, name)
	{
		//add to list
		filter.name = name;
		var saved = false;
		var allowOverwrite = true;
		for(var i=0; i<twcheese.cFRS_filters.length; i++)
		{
			if(filter.name == twcheese.cFRS_filters[i].name)
			{
				allowOverwrite = confirm('Overwrite existing filter "'+filter.name+'"?');				
				if(allowOverwrite)
				{
					//transfer tag settings
					filter.tag = twcheese.cFRS_filters[i].tag;
					filter.tagAttack = twcheese.cFRS_filters[i].tagAttack;
					filter.tagSupport = twcheese.cFRS_filters[i].tagSupport;
					
					//overwrite
					twcheese.cFRS_filters[i] = JSON.parse(JSON.stringify(filter)); //clone filter instead of referencing it				
					saved = true;
				}
			}
		}
		if(!saved && allowOverwrite)
		{
			//clear any tag settings
			filter.tag = '';
			filter.tagAttack = false;
			filter.tagSupport = false;
			
			twcheese.cFRS_filters.push(JSON.parse(JSON.stringify(filter))); //clone filter instead of referencing it
			saved = true;			
		}
		
		if(saved)
		{
			UI.InfoMessage('Filter saved.', 3000, 'success');
			localStorage.setItem('twcheese.cFRS_filters', JSON.stringify(twcheese.cFRS_filters));		
			
			//save as active filter
			localStorage.setItem('twcheese.cFRS_config', JSON.stringify(twcheese.cFRS_config));
			
			//reload tagger widget
			$('#twcheese_tag_widget').replaceWith(twcheese.cFRS_createTagWidget());
		}
	};
	
	twcheese.cFRS_loadFilter = function(filter)
	{	
		//set to active filter
		twcheese.cFRS_config.activeFilter = JSON.parse(JSON.stringify(filter)); //clone filter instead of referencing it 
		
		//reload filter widget
		$('#twcheese_filter_widget').replaceWith(twcheese.cFRS_createFilterWidget());
		$('#twcheese_filter_widget').show();
	};
	
/*==== TW actions ====*/

	/**
	 *	@param filter:Array - an array of filters
	 */
	twcheese.tagCommands = function(filters, noOverwrite)
	{
		commands = twcheese.cFRS_scrapeCommands();
		
		var commandsTable = document.getElementById('commands_table');		
		for(var row=1; row < commandsTable.rows.length-1; row++)
		{
			//var inputs = $(commandsTable.rows[row]).find('input');
			var changeName = false;
			var newName ='';
			var coords = new String(commands[row-1].destination);
			if(!coords)
				coords = '?';
			
			for(var f=0; f<filters.length; f++)
			{
				var filter = filters[f];
				if(twcheese.cFRS_matchesQuery(commands[row-1], filter))
				{
					if((filter.tagAttack && commands[row-1].type=='attack') || (filter.tagSupport && commands[row-1].type=='support')) 
					{
						newName += filters[f].tag;
						changeName = true;
					}
				}
			}
			if (noOverwrite) {
				if (twcheese.cFRS_commands[row-1].customName) {
					changeName = false;
				}
			}
			console.log('change name: ' + changeName);
			if(changeName)
			{
				newName += ' to ('+coords+')';
				commandId = $(commandsTable.rows[row]).find('.quickedit').attr('data-id');
				twcheese.rename(commandId, newName);
				twcheese.cFRS_commands[row-1].customName = true;
			}
		}
		
		UI.InfoMessage('Tagging Commands...', 3000, 'success');
	};
	
	twcheese.renameCommands = function(name, prepend, noOverwrite)
	{
		commandsTable = document.getElementById('commands_table');
		for(var row=1; row < commandsTable.rows.length-1; row++)
		{
			var changeName = true;
			if(twcheese.cFRS_queryMatches)
			{
				if(!twcheese.cFRS_queryMatches[row-1])
					changeName = false;
			}
			if (noOverwrite) {
				if (twcheese.cFRS_commands[row-1].customName) {
					changeName = false;
				}
			}
			
			if(changeName)
			{			
				var $row = $(commandsTable.rows[row]);
				var commandId = $row.find('.quickedit').attr('data-id');
				
				var coords = $row.find('.quickedit-label').text().match(/[0-9]{1,}\|[0-9]{1,}(?![\s\S]*\|)/);		
				if(!coords)
					coords = '?';
				
				$row.find('.rename-icon').click();
				var newName ='';
				if(prepend) {					
					var oldName = $(commandsTable.rows[row]).find('input[type=text]').val();
					newName = name + oldName;
				} else {
					newName = name + ' to (' + coords + ')';
				}
				$row.find('input[type=text]').val(newName);
				$row.find('input[type=button]').click();
				twcheese.cFRS_commands[row-1].customName = true;
			}
		}
	};
	
	/**
	 *	renames something with the pen&paper icon next to it
	 *	@param	data_id:int			the id for what you want to rename
	 *	@param	new_name:string		the new name
	 */
	twcheese.rename = function(data_id, new_name) {
		$container = $('span[class*="quickedit"][data-id="'+ data_id +'"]');
		$container.find('.rename-icon').click();
		$container.find('input[type=text]').val(new_name);
		$container.find('input[type=button]').click();
	};


/*==== analyzers ====*/

	/**
	 *	returns true if the row fits the criteria to be displayed, false if not
	 */
	twcheese.cFRS_matchesQuery = function(command, filterConfig)
	{
		function matchesUnit(unitIndex)
		{
			if(filterConfig.unitsEnabled[unitIndex])
			{
				if(command.troops[unitIndex] < filterConfig.unitsMin[unitIndex])
					return false;
				if(command.troops[unitIndex] > filterConfig.unitsMax[unitIndex])
					return false;
			}
			return true;
		}
		
		if(twcheese.gameConfig.archer)
		{
			if(!matchesUnit(3)) //archer
				return false;
			if(!matchesUnit(6)) //mounted archer
				return false;
		}
		if(twcheese.gameConfig.paladin)
		{
			if(!matchesUnit(10)) //paladin
				return false;
		}
		
		if(!matchesUnit(0)) //spear
			return false;
		if(!matchesUnit(1)) //sword
			return false;
		if(!matchesUnit(2)) //axe
			return false;
		if(!matchesUnit(4)) //scout
			return false;
		if(!matchesUnit(5)) //lcav
			return false;
		if(!matchesUnit(7)) //hcav
			return false;				
		if(!matchesUnit(8)) //ram
			return false;
		if(!matchesUnit(9)) //cat
			return false;
		if(!matchesUnit(11)) //noble
			return false;		
		
		return true;
	};
	
/*==== scrapers ====*/
	
	twcheese.cFRS_scrapeCommandRow = function(row)
	{
		var command = {};
		
		/*==== units ====*/
		command.troops = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
		
		/** @param cell:Number */
		function cellVal(cell)
		{
			return Number(row.cells[cell].innerHTML);
		}
		
		command.troops[0] = cellVal(0+3); //spear
		command.troops[1] = cellVal(1+3); //sword
		
		if(twcheese.gameConfig.archer == 0) //classic
		{
			command.troops[2] = cellVal(2+3); //axe
			command.troops[4] = cellVal(3+3); //spy
			command.troops[5] = cellVal(4+3); //lcav
			command.troops[7] = cellVal(5+3); //hcav
			command.troops[8] = cellVal(6+3); //ram
			command.troops[9] = cellVal(7+3); //cat
			
			if(twcheese.gameConfig.paladin == 0) //classic without paladin
			{
				command.troops[11] = cellVal(8+3);
			}
			else // classic with paladin
			{
				command.troops[10] = cellVal(8+3);
				command.troops[11] = cellVal(9+3);
			}
		}
		else //new units
		{
			command.troops[2] = cellVal(2+3);
			command.troops[3] = cellVal(3+3);
			command.troops[4] = cellVal(4+3);
			command.troops[5] = cellVal(5+3);
			command.troops[6] = cellVal(6+3);
			command.troops[7] = cellVal(7+3);
			command.troops[8] = cellVal(8+3);
			command.troops[9] = cellVal(9+3);
			
			if(twcheese.gameConfig.paladin == 0) //new units without paladin
			{
				command.troops[11] = cellVal(10+3);
			}
			else
			{
				command.troops[10] = cellVal(10+3);
				command.troops[11] = cellVal(11+3);
			}
		}
		
		/*==== type ====*/
		var icon = $(row).find('img')[0];
		if(icon.src.search('return') != -1)
			command.type = 'return';
		else if(icon.src.search('support') != -1)
			command.type = 'support';
		else
			command.type = 'attack';		
		
		/*==== arrival time ====*/
		command.arrivalTime = twcheese.cFRS_timeRelToAbs(row.cells[2], twcheese.serverTime)
		
		/*=== destination coords ====*/
		var name = $(row).find('.quickedit-label').text();
		command.destination = name.match(/[0-9]{1,}\|[0-9]{1,}(?![\s\S]*\|)/);
		
		/*=== has it already been renamed? ===*/
		command.customName = true;
		if ((name.search('Attack on') != -1) || (name.search('Support for') != -1)) {
			command.customName = false;
		}
		
		return command;
	};
	
	twcheese.requestXML = function(targetUrl)
	{
		var xmlhttp;
		if (window.XMLHttpRequest)
			xmlhttp=new XMLHttpRequest();
		else
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		xmlhttp.open("GET",targetUrl,false);
		xmlhttp.send("");
		
		return xmlhttp.responseXML.documentElement;
	};
	
	twcheese.cFRS_scrapeCommands = function()
	{
		if(!twcheese.cFRS_IS_SCRAPED)
		{
			twcheese.cFRS_commands = new Array();
		
			var commandsTable = document.getElementById('commands_table');
			for(var row=1; row<commandsTable.rows.length-1; row++)
			{
				twcheese.cFRS_commands[row-1] = twcheese.cFRS_scrapeCommandRow(commandsTable.rows[row]);
			}
			
			twcheese.cFRS_IS_SCRAPED = true;
		}
		return twcheese.cFRS_commands;
	};
	
	/**
	 *	@return serverTime:Date();
	 */
	twcheese.getServerTime = function()
	{
		var serverTime = new Date();
		var date = document.getElementById('serverDate').innerHTML;
		var time = document.getElementById('serverTime').innerHTML;
		
		serverTime.setYear(date.split('/')[2]);
		serverTime.setMonth(date.split('/')[1]-1);
		serverTime.setDate(date.split('/')[0]);
		serverTime.setHours(time.split(':')[0]);
		serverTime.setMinutes(time.split(':')[1]);
		serverTime.setSeconds(time.split(':')[2]);
		
		return serverTime;
	};
	
/*==== time functions ====*/
	/**
	 *	@param ele:HTMLElement - an element containing the relative time (today, tomorrow, etc).
	 *	@param sTime:Date - server time
	 *	@return time:String
	 */	
	twcheese.cFRS_timeRelToAbs = function(ele, sTime)
	{
		var ms = $(ele).find('span')[0].innerHTML;
		var text = $(ele).text();		
		var timeString = text.match(/[0-9]{1,2}\:[0-9]{2}\:[0-9]{2}/)[0];
		var hours = timeString.split(':')[0];
		var minutes = timeString.split(':')[1];
		var seconds = timeString.split(':')[2];
		
		/*==== date ====*/
		var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		
		if(text.search('today') != -1)
		{
			var day = sTime.getDate();
			var month = monthNames[sTime.getMonth()];
			var year = sTime.getFullYear();		
		}
		else if(text.search('tomorrow') != -1)
		{
			var now = sTime.getTime();
			var tomorrow = new Date(now + 24*60*60*1000);
			
			var day = tomorrow.getDate();
			var month = monthNames[tomorrow.getMonth()];
			var year = tomorrow.getFullYear();
		}
		else
		{
			var dateString = text.match(/[0-9]{2}.[0-9]{2}./)[0];
			day = dateString.split('.')[0];
			month = monthNames[Number(dateString.split('.')[1]-1)];
			//year = sTime.getFullYear();
		}
			
		var output = month + ' ' + day + ' ' + hours + ':' + minutes + ':' + seconds + ':' + ms;		
		return output;
	};
	
/*==== main ====*/
	if(game_data.screen == 'overview_villages' && game_data.mode == 'commands')
	{
		if(!twcheese.cFRS_IS_LOADED)
		{
			/*==== register ====*/
			var script =
			{
				scriptname: 'commands: filter, rename, share',
				version: 8.16,
				author: 'Nicholas Toby',
				email: 'cheesasaurus@gmail.com',
				broken: false
			};
			$.post(ScriptAPI.url,script);
		
			/*==== load config ====*/
			if(localStorage.getItem('twcheese.cFRS_config'))
				twcheese.cFRS_config = JSON.parse(localStorage.getItem('twcheese.cFRS_config'));
			if(localStorage.getItem('twcheese.cFRS_filters'))
				twcheese.cFRS_filters = JSON.parse(localStorage.getItem('twcheese.cFRS_filters'));	
			twcheese.loadGameConfig();
			
			twcheese.serverTime = twcheese.getServerTime();
			
			/*==== create widget ====*/
			twcheese.cFRS_createMainWidget();
			twcheese.currentSelection = null;
			
			twcheese.cFRS_IS_LOADED = true;
		}
		else
			UI.InfoMessage('This is already active.', 3000, 'error');
	}
	else
		UI.InfoMessage('This may only be used on the Commands overview.', 3000, 'error');