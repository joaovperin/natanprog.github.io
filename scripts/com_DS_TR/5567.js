/**
 *	Mass Tagger
 *	@version	1.0.0
 *	last updated: April 14, 2014
 *	game compatability:	version	20228 8.21
 *	@author		Nick Toby (cheesasaurus@gmail.com)
 
 ==== pages where this can be used ==== 
 * incoming overview (screen=overview_villages&mode=incomings)
  
 ==== changelog ====
 *	14 apr 2014 - released 
 
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

twcheese.MassTag = {
	widget: {},
	format: '',
	config: {
		options: [
			{
				name:'unit', 
				isim:'Birim <img id="twcheese_sector_help" src="http://cdn.tribalwars.net/graphic/questionmark.png" style="width: 15px; height: 15px" title="Etiketlenen birim sizin etiketleme yaptiginiz süreye göre secilir.Gec zamanda yapilan etiketlemeler hatali olabilir.Her defasinda sadece etiketlenmeyen saldirilari etiketler eski islemlerde oynama yapmaz.">',
				description:'En yavas birime göre birim ismi ekler',
				defaultLabel:' ',
				enabled: true
			}, {
				name:'coords',
				isim:'Koordinat',
				description:'Saldirgan köyün koordinatini ekler',
				defaultLabel:' ',
				enabled: true
			}, {
				name:'player',
				isim:'Oyuncu',
				description:'Saldirgan oyuncunun kullanici adini ekler',
				defaultLabel:' ',
				enabled: true
			}, {
				name:'duration',
				isim:'Süre',
				description:'Etiketlenen birime göre toplam süreyi ekler',
				defaultLabel:' ',
				enabled: false
			}, {
				name:'distance',
				isim:'Mesafe',
				description:'Köyler arasindaki mesafeyi ekler',
				defaultLabel:' ',
				enabled: false
			}, {
				name:'return',
				isim:'Dönüs zamani',
				description:'Gelen saldirinin kendi köyüne dönüs süresini tarih ve saat olarak ekler',
				defaultLabel:' ',
				enabled: false
			}, {
				name:'sent',
				isim:'Gönderilen zaman',
				description:'Gelen saldiri hangi saat ve tarihte atildigini gelen birime göre hesaplar ve ekler',
				defaultLabel:' ',
				enabled: false
			}, {
				name:'arrival',
				isim:'Giris zamani',
				description:'Saldirinin köye giris tarihi ve saatini ekler',
				defaultLabel:' ',
				enabled: false
			}, {
				name:'origin',
				isim:'Saldiran köy',
				description:'Saldiran köyün ismini ekler',
				defaultLabel:' ',
				enabled: false
			}, {
				name:'destination',
				isim:'Hedef köy',
				description:'Hedef köyün ismini ekler ',
				defaultLabel:' ',
				enabled: false
			}
		]	
	},		
	
	init: function () {
		this.loadConfig();
		this.widget = this.createWidget();
		this.preview();
	},

	createWidget: function () {
		console.log('opening config widget');
		
		var widget = document.createElement('div');
		widget.id = 'twcheese_tag_config_container';
		widget.style.display = 'block';
		widget.style.position = 'fixed';
		widget.style.zIndex = 13000;
		widget.style.top = '60px'; //below top menu
		widget.style.left = '50%';
		widget.style.width = '600px';
		widget.style.marginLeft = '-300px';
		widget.style.borderStyle = 'solid';
		widget.style.borderWidth = '1px';
		widget.style.borderRadius = '8px 8px 4px 4px';
		widget.style.borderColor = '#804000 #603000 #402000 #804000';
		widget.style.backgroundColor = '#f7eed3';		
		
			/*==== title bar ====*/				
				var title_bar = document.createElement('div');
				title_bar.style.backgroundColor = '#dfcca6';
				title_bar.style.borderRadius = '8px 8px 0px 0px';
				title_bar.style.cursor = 'move';
				
				/*==== title ====*/
				var title = document.createElement('span');
				title.innerHTML = 'Etiketleme Araci';
				title.style.fontWeight = 700;
				title.style.fontSize = '14px';
				title.marginLeft = '10px';
				title_bar.appendChild(title);
				
				twcheese.style.popupTitleBar(title_bar, function(){
					twcheese.MassTag.closeWidget();
				});
				
				/*==== narcissism ====*/
				var contactEle = document.createElement('span');
				contactEle.innerHTML = '</b>Yapimci Cheesasaurus, Türkçe Çeviri Trafik</b> ';
				contactEle.style.fontSize = '10px';
				contactEle.style.cssFloat = 'right';
				contactEle.style.marginRight = '5px';
				title_bar.appendChild(contactEle);
				
			widget.appendChild(title_bar);
			$(widget).draggable({handle:'.twcheese_title_bar'});				
			
			var content = document.createElement('div');
			content.id = 'twcheese_tag_config';			
			
			/*==== preview ====*/
			var preview_container = document.createElement('div');
			preview_container.innerHTML = '<b>Örnek Görünüm: </b>';
			preview_container.style.margin = '10px';
			
				var preview = document.createElement('span');
				preview.id = 'twcheese_MassTag_preview';				
				preview.innerHTML = 'Trafik';			
				preview_container.appendChild(preview);
				
			content.appendChild(preview_container);			
			
			/*==== config ====*/
			var options = this.config.options;			
			var optionsTable = document.createElement('table');
			optionsTable.style.marginLeft = '10px';
			optionsTable.style.width = '580px';
			optionsTable.id = 'twcheese_config_table';
			
			for(var i=0; i<twcheese.MassTag.config.options.length; i++)
			{
				optionsTable.insertRow(-1);
				optionsTable.rows[i].optionData = options[i];
				optionsTable.rows[i].insertCell(-1);
				optionsTable.className = 'vis';
				
				/*==== checkbox ====*/
				var checkbox = document.createElement('input');
				checkbox.type = 'checkbox';
				checkbox.checked = options[i].enabled;
				checkbox.onchange = function() {
					twcheese.MassTag.preview();
					this.parentNode.parentNode.optionData.enabled = this.checked;
					twcheese.MassTag.saveConfig();
				};
				optionsTable.rows[i].cells[0].appendChild(checkbox);
				
				/*==== custom text ====*/
				optionsTable.rows[i].insertCell(-1);
				var label = document.createElement('input');
				label.type = 'text';
				label.size = 10;
				if(options[i].label != null)
					label.value = options[i].label;
				else
					label.value = options[i].defaultLabel;
				label.onkeyup = function(){					
					twcheese.MassTag.preview();
					if (!this.value) {
						this.parentNode.parentNode.optionData.label = '';
					} else {
						this.parentNode.parentNode.optionData.label = this.value;	
					}									
					twcheese.MassTag.saveConfig();
				};
				optionsTable.rows[i].cells[1].appendChild(label);
				
				/*==== short name ====*/
				optionsTable.rows[i].insertCell(-1);
				optionsTable.rows[i].cells[2].innerHTML = options[i].isim;
				
				/*==== description ====*/
				optionsTable.rows[i].insertCell(-1);
				optionsTable.rows[i].cells[3].innerHTML = options[i].description;
				
				/*==== handles ====*/
				optionsTable.rows[i].insertCell(-1);
				optionsTable.rows[i].cells[4].innerHTML = '<div style="width: 11px; height:11px; background-image: url(' + image_base + 'sorthandle.png); cursor:move" class="qbhandle" title="drag to re-order"> </div>';
			}
			content.appendChild(optionsTable);
			
			/*==== buttons ====*/
			var button_container = document.createElement('div');
			button_container.style = 'text-align:center; margin:10px;';
				/*==== label button ====*/
				var label_button = document.createElement('a');
				label_button.className = 'btn';
				label_button.style.marginRight = '5px';
				label_button.innerHTML = 'Etiketle';
				label_button.onclick = function () {
					twcheese.MassTag.label(twcheese.MassTag.getFormat());
				};
				button_container.appendChild(label_button);
			content.appendChild(button_container);			
			
		widget.appendChild(content);			
		
		document.getElementById('content_value').appendChild(widget);
		$('#twcheese_config_table > tbody').sortable({handle: '.qbhandle', placeholder: 'sortable-placeholder'});
		$('#twcheese_config_table > tbody').on('sortstop', function(){
			twcheese.MassTag.preview();
			twcheese.MassTag.saveConfig();
		});		
		
		return document.getElementById('twcheese_tag_config');
	},
	
	closeWidget: function () {
		$('#twcheese_tag_config_container').remove();
	},
	
	getFormat: function () {
		var format = '';
		var inputs = this.widget.getElementsByTagName('input');
		var rows = this.widget.getElementsByTagName('tr');
		for(var i=0; i<twcheese.MassTag.config.options.length; i++){
			if(inputs[i*2].checked)
			{
				format += inputs[i*2+1].value;
				format += '%'+rows[i].optionData.name+'%';
			}
		}
		return format;
	},
	
	preview: function () {
		document.getElementById('twcheese_MassTag_preview').innerHTML = this.getFormat();
	},
	
	saveConfig: function () {
		var rows = this.widget.getElementsByTagName('tr');
		var options = new Array();
		for (var i=0; i<twcheese.MassTag.config.options.length; i++) {
			options[i] = rows[i].optionData;			
		}
		
		this.config.options = options;
		
		localStorage.setItem('twcheese.MassTag.config',JSON.stringify(this.config));
		console.log('Kaydedildi');
	},
	
	loadConfig: function () {
		if (localStorage.getItem('twcheese.MassTag.config')) {
			this.config = JSON.parse(localStorage.getItem('twcheese.MassTag.config'));
			return true;
		} else {
			return false;
		}
	},
	
	label: function (format) {
		$('#select_all').click();
		$('input[name=label_format]').val(format).parents('form').find('input[name=label]').click();
	}
};

/*==== styles ====*/
if(!twcheese.style)
	twcheese.style = {};

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
twcheese.style.popupTitleBar = function (element, exit_function) {
	element.className = 'twcheese_title_bar';
	twcheese.style.bgVertGradient(element, '#DEC378', '#BDA666');
	element.style.height = '22px';
	element.style.padding = '4px';
	
	/*==== exit button ====*/
	var exit_button = document.createElement('span');
	exit_button.style.backgroundImage = 'url("' + image_base + 'login_close.png")';
	exit_button.style.height = '20px';
	exit_button.style.width = '20px';
	exit_button.style.display = 'inline-block';
	exit_button.style.cssFloat = 'right';
	exit_button.style.cursor = 'pointer';
	exit_button.onclick = exit_function;
	element.appendChild(exit_button);
};

/*==== register ====*/
var script = {
	scriptname: 'Mass Incoming Tagger',
	version: 8.21,
	author: 'Nicholas Toby',
	email: 'cheesasaurus@gmail.com',
	broken: false
};
$.post(ScriptAPI.url,script);

/*==== Main ====*/
if (game_data.screen == 'overview_villages' && game_data.mode == 'incomings') {
	twcheese.MassTag.init();
} else {
	UI.InfoMessage('Gelen Saldirilara Gidiliyor', 3000, 'success');
	document.location = game_data.link_base_pure + 'overview_villages&mode=incomings';
};