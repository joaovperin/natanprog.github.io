/* 
	SUPPORTED:
		{unit} : the type of unit that you have decided is on its way...
		{coords} : The coordinates of the originating village
		{player} : The originating player
		{duration} : The duration of the attack
		{distance} : The distance of the attack in fields
		{return} : The approximate return time - the attack will return at 0 milliseconds - but still not sure how the rounding or truncating occurs. Useful for back timing attacks.
		{attackID} : The attack ID	(##### {attack_id} on .NET #####)
		{sent} : The sent date and time
	TODO:	
		{arrival} : The arrival date and time
		{origin} : The originating village in full name (xxx|yyy) KYX
		{destination} : The target village in full name (xxx|yyy) KYX
		{destinationxy} : The coordinates of the target village xxx|yyy
	TODO:	
		Display world speed
		Display unit speed


	######################
	Client Launcher (live):
	######################
	
	javascript:$.getScript('http://dl.dropbox.com/u/25377948/twscripts/labelAttacks.js');void(0);
*/

javascript:

/*************************************************
 * begin code for configuration GUI
 * author: Nick Toby (cheesasaurus@gmail.com)
 *************************************************/

if(!twcheese)
	var twcheese={};

twcheese.createTaggerGUI = function()
{	
	var contentContainer = document.createElement('div');
	contentContainer.id = 'twcheese_tag_config_container';
	contentContainer.style.display = 'block';
	contentContainer.style.position = 'fixed';
	contentContainer.style.zIndex = 5000;
	contentContainer.style.top = '60px'; //below top menu
	contentContainer.style.left = '10px';
	contentContainer.style.borderStyle = 'ridge';
	contentContainer.style.borderColor = 'brown';
	contentContainer.style.backgroundColor = '#f7eed3';	
	
	/*==== title bar ====*/				
		var titleBar = document.createElement('table');
		titleBar.style.backgroundColor = '#dfcca6';
		titleBar.insertRow(-1);
		titleBar.rows[0].insertCell(-1);
		titleBar.rows[0].insertCell(-1);
		titleBar.rows[0].cells[0].innerHTML = '<b>Configure Incoming Tagger</b>';
		titleBar.rows[0].cells[0].width = '100%';
		titleBar.rows[0].cells[1].innerHTML = '<img src="graphic/delete.png" alt="X"/>';
		titleBar.rows[0].cells[1].style.cursor="pointer";
		titleBar.rows[0].cells[1].onclick = function(){$('#twcheese_tag_config_container').remove()};
		titleBar.rows[0].cells[1].style.color = 'red';
		contentContainer.appendChild(titleBar);
	
	
	var content = document.createElement('div');
	content.id = 'twcheese_tag_config';
	
	if(localStorage.getItem('twcheese.slowTarget_taggerConfig'))
	{
		var options = JSON.parse(localStorage.getItem('twcheese.slowTarget_taggerConfig'));
		content.config = options;
	}
	else
	{
		content.config = [];
		var options = [
			{
				name:'unit',
				description:'the type of unit that you have decided is on its way...',
				defaultLabel:'U:',
				enabled: true
			},
			{
				name:'coords',
				description:'The coordinates of the originating village',
				defaultLabel:'C:',
				enabled: true
			},
			{
				name:'player',
				description:'The originating player',
				defaultLabel:'P:',
				enabled: true
			},
			{
				name:'duration',
				description:'The duration of the attack',
				defaultLabel:'D:',
				enabled: true
			},
			{
				name:'distance',
				description:'The distance of the attack in fields',
				defaultLabel:'d:',
				enabled: true
			},
			{
				name:'return',
				description:'The approximate return time - the attack will return at 0 milliseconds',
				defaultLabel:'R:',
				enabled: true
			},
			{
				name:'attackID',
				description:'The attack ID',
				defaultLabel:'id:',
				enabled: true
			},
			{
				name:'sent',
				description:'The sent date and time',
				defaultLabel:'S:',
				enabled: true
			},
			{
				name:'arrival',
				description:'The arrival date and time',
				defaultLabel:'A:',
				enabled: true
			},
			{
				name:'origin',
				description:'The originating village in full name (xxx|yyy) KYX',
				defaultLabel:'O:',
				enabled: true
			},
			{
				name:'destinationxy',
				description:'The coordinates of the target village xxx|yyy',
				defaultLabel:'dest:',
				enabled: true
			}
		];
	}
	
	content.getFormat = function()
	{
		var theFormat = '';
		var inputs = this.getElementsByTagName('input');
		var rows = this.getElementsByTagName('tr');
		for(var i=0; i<11; i++){
			if(inputs[i*2].checked)
			{
				theFormat += inputs[i*2+1].value;
				theFormat += '{'+rows[i].optionData.name+'}';
			}
		}
		return theFormat;
	};
	
	content.preview = function()
	{
		document.getElementById('twcheese_tag_preview').innerHTML = this.getFormat();
	};
	
	content.saveConfig = function()
	{
		var rows = this.getElementsByTagName('tr');
		for(var i=0; i<11; i++)
		{
			content.config[i] = rows[i].optionData;
			
		}
		
		localStorage.setItem('twcheese.slowTarget_taggerConfig',JSON.stringify(this.config));
		localStorage.setItem('twcheese.slowTarget_taggerFormat',this.getFormat());
		UI.InfoMessage('Configuration saved.<br/>It will take effect the next time this script is used.',3000,'success');
	};
		
		/*==== preview ====*/
		var preview = document.createElement('span');
		preview.id = 'twcheese_tag_preview';
		preview.innerHTML = 'blahblahblah';
		content.innerHTML = '<b>Preview: </b>';
		content.appendChild(preview);
		
		/*==== save button ====*/
		var saveButton = document.createElement('button');
		saveButton.onclick = function(){content.saveConfig();};
		saveButton.innerHTML = 'Save';
		content.appendChild(saveButton);
		
		/*==== config ====*/		
		var optionsTable = document.createElement('table');
		optionsTable.id = 'twcheese_config_table';
		
		for(var i=0;i<11;i++)
		{
			optionsTable.insertRow(-1);
			optionsTable.rows[i].optionData = options[i];
			optionsTable.rows[i].insertCell(-1);
			optionsTable.className = 'vis';
			
			var checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			checkbox.checked = options[i].enabled;
			checkbox.onchange = function()
			{
				content.preview();
				this.parentNode.parentNode.optionData.enabled = this.checked;
			};
			optionsTable.rows[i].cells[0].appendChild(checkbox);
			
			optionsTable.rows[i].insertCell(-1);
			var label = document.createElement('input');
			label.type = 'text';
			if(options[i].label)
				label.value = options[i].label;
			else
				label.value = options[i].defaultLabel;
			label.onkeyup = function(){
				content.preview();
				this.parentNode.parentNode.optionData.label = this.value;
			};
			optionsTable.rows[i].cells[1].appendChild(label);
			
			optionsTable.rows[i].insertCell(-1);
			optionsTable.rows[i].cells[2].innerHTML = options[i].description;
			
			optionsTable.rows[i].insertCell(-1);
			optionsTable.rows[i].cells[3].innerHTML = '<div style="width: 11px; height:11px; background-image: url(graphic/sorthandle.png); cursor:move" class="qbhandle" title="drag to re-order"> </div>';
		}
		
		content.appendChild(optionsTable);
		
	contentContainer.appendChild(content);
	document.getElementById('content_value').appendChild(contentContainer);
	$('#twcheese_config_table > tbody').sortable({handle: '.qbhandle', placeholder: 'sortable-placeholder'});
	$('#twcheese_config_table > tbody').on('sortstop', function(){content.preview()});
	
	content.preview();	
};

twcheese.createConfigButton = function()
{
	//code recycled from bre help button
	var twcheese_menu = document.createElement('div');
	twcheese_menu.style.textAlign = 'center';

	var twcheese_menu_text = document.createElement('p');
	twcheese_menu_text.style.fontSize = '9pt';
	twcheese_menu_text.innerHTML = 'Config';
	twcheese_menu_text.style.fontWeight = '700';
	twcheese_menu_text.style.marginTop = '3px';
	twcheese_menu_text.style.color = '#422301';
	twcheese_menu.appendChild(twcheese_menu_text);

	twcheese_menu.style.background = 'url("https://dl.dropbox.com/u/1621643/tw/icons/help_background.png")';
	twcheese_menu.style.height = '22px';
	twcheese_menu.style.width = '49px';
	twcheese_menu.style.display = 'block';
	twcheese_menu.style.position = 'fixed';
	twcheese_menu.style.left = '100%';
	twcheese_menu.style.top = '100%';
	twcheese_menu.style.marginTop = '-24px';
	twcheese_menu.style.marginLeft = '-52px';
	twcheese_menu.style.zIndex = '99999999999';
	
	twcheese_menu.onmouseover = function(){this.style.background='url("https://dl.dropbox.com/u/1621643/tw/icons/help_background_highlight.png")'};
	twcheese_menu.onmouseout = function(){this.style.background='url("https://dl.dropbox.com/u/1621643/tw/icons/help_background.png")'};
	

	twcheese_menu.style.cursor = 'pointer';
	twcheese_menu.onclick = function(){twcheese.createTaggerGUI()};

	
	return document.body.appendChild(twcheese_menu);
};

twcheese.createConfigButton();
if(localStorage.getItem('twcheese.slowTarget_taggerFormat'))
	theFormat = localStorage.getItem('twcheese.slowTarget_taggerFormat');

/*************************************************
 * end code for configuration GUI
 * note: the remainder of code is credited to Dale McKay
 *************************************************/

/* *************************************** */
// Borrowed plugin for converting XML to JSON
/* *************************************** */
if(!(window.main||self).jQuery.xml2json){
/*
 ### jQuery XML to JSON Plugin v1.0 - 2008-07-01 ###
 * http://www.fyneworks.com/ - diego@fyneworks.com
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 ###
 Website: http://www.fyneworks.com/jquery/xml-to-json/
*/
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}(';5(10.M)(w($){$.N({11:w(j,k){5(!j)t{};w B(d,e){5(!d)t y;6 f=\'\',2=y,E=y;6 g=d.x,12=l(d.O||d.P);6 h=d.v||d.F||\'\';5(d.G){5(d.G.7>0){$.Q(d.G,w(n,a){6 b=a.x,u=l(a.O||a.P);6 c=a.v||a.F||\'\';5(b==8){t}z 5(b==3||b==4||!u){5(c.13(/^\\s+$/)){t};f+=c.H(/^\\s+/,\'\').H(/\\s+$/,\'\')}z{2=2||{};5(2[u]){5(!2[u].7)2[u]=p(2[u]);2[u][2[u].7]=B(a,R);2[u].7=2[u].7}z{2[u]=B(a)}}})}};5(d.I){5(d.I.7>0){E={};2=2||{};$.Q(d.I,w(a,b){6 c=l(b.14),C=b.15;E[c]=C;5(2[c]){5(!2[c].7)2[c]=p(2[c]);2[c][2[c].7]=C;2[c].7=2[c].7}z{2[c]=C}})}};5(2){2=$.N((f!=\'\'?A J(f):{}),2||{});f=(2.v)?(D(2.v)==\'16\'?2.v:[2.v||\'\']).17([f]):f;5(f)2.v=f;f=\'\'};6 i=2||f;5(k){5(f)i={};f=i.v||f||\'\';5(f)i.v=f;5(!e)i=p(i)};t i};6 l=w(s){t J(s||\'\').H(/-/g,"18")};6 m=w(s){t(D s=="19")||J((s&&D s=="K")?s:\'\').1a(/^((-)?([0-9]*)((\\.{0,1})([0-9]+))?$)/)};6 p=w(o){5(!o.7)o=[o];o.7=o.7;t o};5(D j==\'K\')j=$.S(j);5(!j.x)t;5(j.x==3||j.x==4)t j.F;6 q=(j.x==9)?j.1b:j;6 r=B(q,R);j=y;q=y;t r},S:w(a){6 b;T{6 c=($.U.V)?A 1c("1d.1e"):A 1f();c.1g=W}X(e){Y A L("Z 1h 1i 1j 1k 1l")};T{5($.U.V)b=(c.1m(a))?c:W;z b=c.1n(a,"v/1o")}X(e){Y A L("L 1p Z K")};t b}})})(M);',62,88,'||obj|||if|var|length||||||||||||||||||||||return|cnn|text|function|nodeType|null|else|new|parseXML|atv|typeof|att|nodeValue|childNodes|replace|attributes|String|string|Error|jQuery|extend|localName|nodeName|each|true|text2xml|try|browser|msie|false|catch|throw|XML|window|xml2json|nn|match|name|value|object|concat|_|number|test|documentElement|ActiveXObject|Microsoft|XMLDOM|DOMParser|async|Parser|could|not|be|instantiated|loadXML|parseFromString|xml|parsing'.split('|'),0,{}));
}

function fnPrint(msg){(window.main||self).$('body').append('<span>'+msg+'</span><br/>');}

function RenameAttack()
{
	var script={
		id:'2BE7DDA9-B592-407F-A494-8B244054455C',
		name:'Attack Tagger Script',
		version:1.02,
		minGameVersion:6.50,
		author:{
			name:'dalesmckay',
			email:'dalesmckay@gmail.com',
			url:'http://crosstrigger.com'
		},
		credit:'Based on original Sorting Script from an unKnown source.',
		runOnce:true
	};

	function fnAjax(url,method,params,type,isAsync,callback){
		var payload=null;

		(window.main||self).$.ajax({
			'async':isAsync,
			'url':url,
			'data':params,
			'dataType':type,
			'type':String(method||'GET').toUpperCase(),
			'error':function(req,status,err){throw(status);},
			'success':function(data,status,req){if(!isAsync){payload=data;}if(typeof(callback)=='function'){callback(data,status,req);}}
		});

		if(!isAsync){
			if(typeof(callback)=='function'){
				callback(payload);
			}

			return payload;
		}
	}

	function FetchUnitConfig()
	{
		var unitConfig = null;

		fnAjax('/interface.php','GET',{'func':'get_unit_info'},'xml',false,function(data,status,req){
			unitConfig=(window.main||self).$.xml2json(data);
		});

		return unitConfig;
	}

	var authorURL=script.author.url?('<a href="'+script.author.url+'" target="_blank">'+script.author.name+'</a>'):script.author.name;

	fnPrint('');
	fnPrint('=========================');
	fnPrint(authorURL + '\'s ' + script.name + ': v' + script.version.toFixed(2) + (script.credit?('<br/>'+script.credit):''));
	fnPrint('=========================');

	if((typeof(theFormat)=='undefined')||((window.main||self).$.trim(theFormat)=='')){
		theFormat = '{unit} ({coords}) {player} F{distance} S:{sent} R:{return} id:{attackID}';
	}	
	fnPrint('<span style="font-weight:bold;">Format: </span>'+theFormat);
	
	if((window.main||self).game_data.screen!='info_command'){
		throw('This Script must be run from an Attack Detail Screen');
	}
	
	var unitConfig = FetchUnitConfig();
	//fnPrint(JSON.stringify(unitConfig));
	
	c=theFormat;
	p=["Scout","LC","HC","Axe","Sword","Ram","***Noble***"];
	function V() {
    return 1;
	}
	window.onerror = V;

	function Z() {
		d = (window.main || self).document;
		//aid = d.getElementById('editInput').parentNode.innerHTML.match(/id\=(\d+)/)[1];
		aid = $('#quickedit-rename').attr('data-id');

		function J(e) {
			vv = e.match(/\d+\|\d+/g);
			return (vv ? vv[vv.length - 1].match(/((\d+)\|(\d+))/) : null);
		}

		function K(e) {
			f = parseInt(e, 10);
			return (f > 9 ? f : '0' + f);
		}

		function L(g, e) {
			return g.getElementsByTagName(e);
		}

		function N(g) {
			return g.innerHTML;
		}

		function M(g) {
			return N(L(g, 'a')[0]);
		}

		function O() {
			return k.insertRow(E++);
		}

		function W(f) {
			return B.insertCell(f);
		}

		function P(g, e) {
			g.innerHTML = e;
			return g;
		}

		function X(e) {
			C = B.appendChild(d.createElement('th'));
			return P(C, e);
		}

		function Y(f) {
			return K(f / U) + ':' + K(f % (U) / T) + ':' + K(f % T);
		}
		U = 3600;
		T = 60;
		R = 'table';
		S = 'width';
		s = L(d, R);
		for (j = 0; j < s.length; j++) {
			s[j].removeAttribute(S);
			if (s[j].className == 'main') {
				s = L(L(s[j], 'tbody')[0], R);
				break;
			}
		}
		D = 0;
		for (j = 0; j < s.length; j++) {
			s[j].removeAttribute(S);
			if (s[j].className = 'vis') {
				k = s[j];
				if (t = k.rows) {
					D = t.length;
					break;
				}
			}
		}
		for (E = 0; E < D; E++) {
			l = t[E];
			m = (u = l.cells) ? u.length : 0;
			if (m) {
				u[m - 1].colSpan = 5 - m;
				if (N(u[0]) == 'Arrival:') {
					Q = new Date(N(u[1]).replace(/<.*/i, ''));
				} else {
					if (N(u[0]) == 'Arrival in:') {
						v = N(u[1]).match(/\d+/ig);
					}
				} if (E == 1) {
					G = M(u[2]);
				}
				if (E == 2) {
					w = J(M(u[1]));
				}
				if (E == 4) {
					x = J(M(u[1]));
				}
			}
		}
		y = v[0] * U + v[1] * T + v[2] * 1;
		n = w[2] - x[2];
		o = w[3] - x[3];
		F = Math.sqrt(n * n + o * o);
		H = F.toFixed(2);
		E = D - 2;
		B = O();
		P(W(0), 'Distance:').colSpan = 2;
		P(W(1), H + ' Fields').colSpan = 2;
		B = O();
		
		// headers
		X('Unit');
		X('Sent');
		X('Duration');
		X('Name to');
				
		c = c.replace(/\{coords\}/i, w[1]).replace(/\{distance\}/i, H).replace(/\{player\}/i, G); // this is the name string to work with
		
		//for each unit speed
		for (j in p) {
			z = Math.round([parseFloat(unitConfig.spy.speed), parseFloat(unitConfig.light.speed), parseFloat(unitConfig.heavy.speed), parseFloat(unitConfig.axe.speed), parseFloat(unitConfig.sword.speed), parseFloat(unitConfig.ram.speed), parseFloat(unitConfig.snob.speed)][j] * T * F);
			A = z - y;
			if (A > 0) {
				I = Y(z);
				B = O();
				
				// unit name
				P(W(0), p[j]);
				
				// sent
				P(W(1), A < T && 'just now' || A < U && Math.floor(A / T) + ' mins ago' || Y(A) + ' ago');
				
				// duration
				P(W(2), I);
				
				// renaming interface
				C = W(3);
				
				var label = c.replace(/\{duration\}/i, I).replace(/\{sent\}/i, new Date(Q.valueOf() - z * 1000).toString().replace(/\w+\s*/i, '').replace(/(\d*:\d*:\d*)(.*)/i, '$1')).replace(/\{return\}/i, new Date(Q.valueOf() + z * 1000).toString().replace(/\w+\s*/i, '').replace(/(\d*:\d*:\d*)(.*)/i, '$1')).replace(/\{unit\}/i, p[j]).replace(/\{attackID\}/i, aid).replace(/\{attack_id\}/i, aid);;
				var input = document.createElement('input');
				input.id = 'label_input_'+j;
				input.value = label;
				C.appendChild(input);
				
				var button = document.createElement('input');
				button.name = j;
				button.type = 'button';
				button.className = 'btn';
				button.value = 'OK';
				button.onclick = function() {
					//rename the attack to the selected label
					var label = $('#label_input_'+this.name).val();					
					$container = $('span[class*="quickedit"][data-id="'+ aid +'"]');
					$container.find('.rename-icon').click();
					$container.find('input[type=text]').val(label);
					$container.find('input[type=button]').click();					
				};
				C.appendChild(button);
			}
		}
	}
	Z();
}

try{
	RenameAttack();
	void(0);
}
catch(objError){
	var dbgMsg='<span style="font-weight:bold;">Error: </span>' + String(objError.message||objError);
	fnPrint('<span style="color:red;">'+dbgMsg+'</span>');
	alert((window.main||self).$('<span>'+dbgMsg+'</span>').text());
}