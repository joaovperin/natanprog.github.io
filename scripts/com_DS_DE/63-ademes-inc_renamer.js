ScriptAPI.register( '63-Inc-Renamer', true, 'Ademes', 'support-nur-im-forum@ademes.at');
Scriptversion = 'MIT-Lizenz - Copyright (c) 2014 Ademes , Version 1.8';
if (top.frames.length > 1){
	var doc = (top.frames[1].document.URL.match('game.php') == 'game.php') ? top.frames[1].document : top.frames[0].document;
} else {
	var doc = document;
};
if (!doc.URL.match('screen=info_command')){
	UI.InfoMessage('Du musst dich auf der einzelnen "Angriff"-Infoseite befinden!',3000,true);
} else { 
	ADS_Inc_Renamer(doc);
};
function ADS_Inc_Renamer(doc){
	/* Array definieren */
	var e = new Array('Späher','Leichte Kav.','Schwere Kav.','Axt/Speer','Schwert','Ram/Kat','AG'); 
	/* Tabelle ermitteln */
	var t = doc.getElementsByTagName('table');
	for (var i = 0; i < t.length; i++){
		if (t[i].className == 'main'){
			var tm = t[i].getElementsByTagName('tbody')[0];
			break;
		}
	}
	/* Angriffsinfo einlesen */
	if (tm && tm.getElementsByTagName('h2')[0].innerHTML.search(/Angriff\s/) !=-1){
		var ts = tm.getElementsByTagName('table');
		for (var j = 0; j < ts.length; j++){
			if (ts[j].className='vis'){
				var tv = ts[j].getElementsByTagName('tbody')[0];
				var z = tv.getElementsByTagName('tr'); 
				var a = (typeof(p) == 'undefined') ? z[1].getElementsByTagName('td')[2].getElementsByTagName('a')[0].innerHTML : ' ';				
				var s = z[2].getElementsByTagName('td')[1].getElementsByTagName('a')[0].firstChild.nodeValue; 
				var g = z[4].getElementsByTagName('td')[1].getElementsByTagName('a')[0].firstChild.nodeValue; 
				for (var k = z.length-2; k > 2; --k){
					if (z[k].getElementsByTagName('td')[0].firstChild.nodeValue == 'Ankunft:'){
						var Ankunft = z[k].getElementsByTagName('td')[1].innerHTML;
					}
					if (z[k].getElementsByTagName('td')[0].firstChild.nodeValue == 'Ankunft in:'){
						var Dauer = z[k].getElementsByTagName('td')[1].firstChild.firstChild.nodeValue;
					} else {
						tv.removeChild(z[k]);
					}
				}
				break;
			}
		}
		/* Werte erstellen */		
		var h = s.split('(');
		s = h[h.length-1];
		h = s.split(')');
		s = h[0];
		h = g.split('(');
		g = h[h.length-1];
		h = g.split(')');
		g = h[0]; 
		var wx = 0;
		var wy = 0;
		var Typ = s.split(':');
		/* Koordinaten berechnen */		
		if (Typ.length == 3){
			var StKo = s.split(':'); 
			var ZiKo = g.split(':');
			wx = Math.abs(((StKo[0]% 10)*50+(StKo[1]% 10)*5+StKo[2]%5)-((ZiKo[0]% 10)*50+(ZiKo[1]% 10)*5+ZiKo[2]%5));
			wy = Math.abs((Math.floor(StKo[0]/10)*50+Math.floor(StKo[1]/10)*5+Math.floor(StKo[2]/5))-(Math.floor(ZiKo[0]/10)*50+Math.floor(ZiKo[1]/10)*5+Math.floor(ZiKo[2]/5)));
		} else {
			var StKo = s.split('|'); 
			var ZiKo = g.split('|');
			wx = Math.abs(StKo[0]-ZiKo[0]); 
			wy = Math.abs(StKo[1]-ZiKo[1]);
		}
		/* Entfernung berechnen */	
		var w = Math.sqrt(wx*wx+wy*wy);
		/* Angriffsinfo erweitern */
		nr = doc.createElement('tr'); 
		nc = doc.createElement('td');
		nc.colSpan='2';
		nc.innerHTML = 'Entfernung:';
		nr.appendChild(nc.cloneNode(true));
		nc.removeAttribute('colSpan'); 
		nc.innerHTML = w.toFixed(2)+' Felder';
		nr.appendChild(nc);
		nc = nc.cloneNode(false);
		tv.insertBefore(nr.cloneNode(true),z[z.length-1]); 
		/* Tabellenkopf Vorschläge erstellen */
		nt = doc.createElement('table');
		nr = doc.createElement('tr');
		nh = doc.createElement('th'); 
		nh.innerHTML = 'Eineit';
		nr.appendChild(nh.cloneNode(true));
		nh.innerHTML = 'Abschickzeitpunkt'; 
		nr.appendChild(nh.cloneNode(true));
		nh.innerHTML = '&nbsp;Laufzeit&nbsp;'; 
		nr.appendChild(nh.cloneNode(true));
		nh.innerHTML = 'Benennungsvorschlag';
		nr.appendChild(nh.cloneNode(true));
		ie = doc.createElement('input');
		ie.size = '50'; 
		ib = doc.createElement('input');
		ib.type = 'button';
		ib.value = 'OK';
		ib.className = "btn";
		nt.appendChild(nr);
		/* max. Entfernung */
		var maxi = new Array(1500,1500,1500,1500,1500,1500,70); 
		/* Laufzeiten Einheiten und Tabellenvorschlag */
		for (var i = 0; i < e.length; i++){
			if (w <= maxi[i]){
				var t3 = new Array(); 
				var es = Math.round(l[i]*60*w);
				var te = '';
				t3[0] = Math.floor(es/3600);
				t3[1] = Math.floor(es/60)% 60;
				t3[2] = es% 60;
				for (var j = 0; j < 3; j++){
					if (t3[j] < 10){
						te += '0';
					}
					te += t3[j] + ':';
				}
				/* Laufzeit */
				te = te.slice(0,te.length-1);
				/* Milisekunden */
				timess = (Ankunft.substring(43,46)) ? ':' + Ankunft.substring(43,46) : ' ';
				/* Berrechnung Abschickzeitpunkt */
				Subtime = (typeof(u) != 'undefined') ? ' // ST ' + ads_poimt_date(Ankunft,t3,-1) + timess : ' ';
				/* Berrechnung Rückkehrzeitpunkt */
				Retime = (typeof(r) != 'undefined') ? ' // RT ' + ads_poimt_date(Ankunft,t3,1) + timess : ' ';				
				/* Tabelle füllen */		
				if (ads_less_date(Dauer,te)){
					ie.value = n[i] + a + ' (' + s + ') ' + Ankunft.substring(0,17) + timess + Subtime + Retime;
					nr = doc.createElement('tr'); 
					nc = doc.createElement('td');
					nc.innerHTML = e[i];
					nr.appendChild(nc.cloneNode(true)); 
					nc.innerHTML = ads_poimt_date(Ankunft,t3,-1);
					nr.appendChild(nc);
					nr.appendChild(nc.cloneNode(true)); 
					nc.innerHTML = te;
					nr.appendChild(nc);
					nc = doc.createElement('td');
					ie.id = 'editInput' +i;
					nc.appendChild(ie.cloneNode(true)); 
					ii = ib.cloneNode(true);				
					ii.onmousedown = new Function('$(\'.rename-icon\').click();$(\'.quickedit-edit\').find(\'input:first\').val($(\'#editInput'+i+'\').val());$(\'.quickedit-edit\').find(\'input:first\').next().click();');
					nc.appendChild(ii);
					nr.appendChild(nc);
					nt.appendChild(nr);
				}
			}
		}
		/* Tabelle einfügen */
		tv.parentNode.parentNode.appendChild(nt);
	};
	stop();
};
/* Geringste Zeitunterschiede berrechnen*/	
function ads_less_date(time1,time2){
	var hms1 = time1.split(':'); 
	var hms2 = time2.split(':'); 
	for (var i = 0; i < Math.min(hms1.length,hms2.length); i++){
		if (parseInt(hms1[i]) < 10) hms1[i] = hms1[i].slice(Math.min(1,hms1[i].length-1),hms1[i].length);
		if (parseInt(hms2[i]) < 10) hms2[i] = hms2[i].slice(Math.min(1,hms2[i].length-1),hms2[i].length);
	}
	var abs1 = parseInt(hms1[0])*3600+parseInt(hms1[1])*60+parseInt(hms1[2]);
	var abs2 = parseInt(hms2[0])*3600+parseInt(hms2[1])*60+parseInt(hms2[2]);
	return (abs1 < abs2);
};
/* Zeitpunkte berechnen */
function ads_poimt_date(Ankunft,t3,faktor){
	/* Ankunfttext in Datumsformat */
	date_a = new Date('20' + Ankunft.substring(6,8),Ankunft.substring(3,5),Ankunft.substring(0,2),Ankunft.substring(9,11),Ankunft.substring(12,14),Ankunft.substring(15,17));
	date_b = new Date(date_a.getTime() + (faktor * (t3[0] * 60 * 60 * 1000 + t3[1] * 60 * 1000 + t3[2] * 1000)));
	date_c = ('0'+date_b.getDate()).slice(-2) +'.'+ ('0'+date_b.getMonth()).slice(-2) +'. '+ ('0'+date_b.getHours()).slice(-2) +':'+ ('0'+date_b.getMinutes()).slice(-2) +':'+ ('0'+date_b.getSeconds()).slice(-2);	
	return date_c;
};
