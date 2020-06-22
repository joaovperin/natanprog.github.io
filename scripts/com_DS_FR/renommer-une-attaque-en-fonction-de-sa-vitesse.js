var fm='{unit}({coords}) {player} D{distance} {sent}';
function RenommeAttaque2(sFormat)
{
	function fnGetConfig(){
		var oRequest=new XMLHttpRequest();
		var sURL="https://"+window.location.hostname+"/interface.php?func=get_config";
		oRequest.open("GET",sURL,0);
		oRequest.send(null);
		if(oRequest.status==200)return oRequest.responseXML;
		alert("Erreur requete XMLHttpRequest : Impossible d'acceder a la config !");
	}
	function print(m)
	{
		d.body.appendChild(d.createTextNode(m));
		d.body.appendChild(d.createElement('br'));
	}
	
	var xmlDoc=fnGetConfig();

	speed_of_world=xmlDoc.getElementsByTagName("speed")[0].childNodes[0].nodeValue;
	speed_of_unit=xmlDoc.getElementsByTagName("unit_speed")[0].childNodes[0].nodeValue;
	c=sFormat;
	p=['Scout','C.L\351','C.Lo','Hache','Ep\351e','B\351lier','***Noble***'];
	d=(window.frames.length>0)?window.main.document:window.document;
	ac="Arriv\351e";
	print("Vitesses : monde="+speed_of_world+" ; unit\351s="+speed_of_unit+".");
    aid = $('#quickedit-rename').attr('data-id');

	function J(e)
	{
		return/\s\(((\d+)\|(\d+))\)\sC/i.exec(e);
	}
	
	function K(e)
	{
		f=parseInt(e,10);
		return(f>9?f:'0'+f);
	}

	function L(g,e)
	{
		return g.getElementsByTagName(e);
	}

	function N(g)
	{
		return g.innerHTML;
	}
	
	function M(g)
	{
		return N(L(g,'a')[0]);
	}
	
	function O()
	{
		return k.insertRow(E++);
	}
	
	function W(f)
	{
		return B.insertCell(f);
	}
	
	function P(g,e)
	{
		g.innerHTML=e;
		return g;
	}
	
	function X(e)
	{
		C=B.appendChild(d.createElement('th'));
		return P(C,e);
	}
	
	function Y(f)
	{
		return K(f/U)+':'+K(f%(U)/T )+':'+K(f%T);
	}
	
	function PS(s)
	{
		return parseInt(s,10);
	}
    
    function getMonthFromString(month){
        nb_for_month = {
            'janvier':1,
            'février':2,
            'mars':3,
            'avril':4,
            'mai':5,
            'juin':6,
            'juillet':7,
            'août':8,
            'sept.':9,
            'octobre':10,
            'novembre':11,
            'décembre':12
        }
        return nb_for_month[month];
     }

	function FD(dt0)
	{
        date_array = dt0.split(' ');
        month = getMonthFromString(date_array[0]);
        day = parseInt(date_array[1]);
        year = parseInt(date_array[2]);
        // 3 in the empty value... 
        full_hour_string = date_array[4];
        full_hour_array = full_hour_string.split(':');
        hour = parseInt(full_hour_array[0]);
        min = parseInt(full_hour_array[1]);
		sec = parseInt(full_hour_array[2]);

        result_date = new Date(year, month, day, hour, min, sec);
        return result_date;
	}
	U=3600;
	T=60;
	R='table';
	S='width';
	s=L(d,R);
	for(j=0;j<s.length;j++) 
	{
		s[j].removeAttribute(S);
		if(s[j].className=='main')
		{
			s=L(L(s[j],'tbody')[0],R);
			break;
		}
	}
	D=0;
	for(j=0;j<s.length;j++) 
	{
		s[j].removeAttribute(S);
		if(s[j].className='vis')
		{
			k=s[j];
			if(t=k.rows) D=t.length;
			break;
		}
	}
	for(E=0;E<D;E++)
	{
		l=t[E];
		m=(u=l.cells)?u.length:0;
		if(m) 
		{
			u[m-1].colSpan=5-m;
			if(N(u[0])==ac+" :")
			{
                Q1=N(u[1]).replace(/<.*/i,'');
				Q=FD(Q1);
			}else{
				if(N(u[0])==ac+' dans :') v=N(u[1]).match(/\d+/ig);
			}
			if(E==1)G=M(u[2]);
			if(E==2)w=J(M(u[1]));
			if(E==4)x=J(M(u[1]));
		}
	}
	y=v[0]*U+v[1]*T+v[2]*1;
	n=w[2]-x[2];
	o=w[3]-x[3];
	F=Math.sqrt(n*n+o*o);
	H=F.toFixed(2);
	E=D-2;
	B=O();
	P(W(0),'Distance :').colSpan=2;
	P(W(1),H+' Cases').colSpan=2;
	B=O();
	X('Unit\351');
	X('Envoy\351');
	X('Dur\351e');
	X('Renommer en');
	c=c.replace(/\{coords\}/i,w[1]).replace(/\{distance\}/i,H).replace(/\{player\}/i,G);
	for(j in p) 
	{
		z=Math.round([9,10,11,18,22,30,35][j]*T*F/speed_of_world/speed_of_unit);
		A=z-y;
		if(A>0)
		{ 
			I=Y(z);
			B=O();
			P(W(0),p[j]);
			P(W(1),A<T&&'maintenant'||A<U&&Math.floor(A/T)+' mins avant'||Y(A)+' avant');
			P(W(2),I);
			C=W(3);

            date_for_label = new Date(Q.getTime()-z*1000).toLocaleString().replace(/(\d*:\d*:\d*)(.*)/i, '$1');
            label=c.replace(/\{duration\}/i, I).replace(/\{sent\}/i, date_for_label).replace(/\{return\}/i, date_for_label).replace(/\{unit\}/i, p[j]).replace(/\{attackID\}/i, aid).replace(/\{attack_id\}/i, aid);;
			var input = document.createElement('input');
			input.id = 'label_input_'+j;
			input.value = label;
			input.size = 60;
			C.appendChild(input);

			var button = document.createElement('input');
			button.name = j;
			button.type = 'button';
			button.className = 'btn';
			button.value = 'OK';
			button.onclick = function() {
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
if (game_data.screen == 'info_command')
RenommeAttaque2(fm);
else
UI.ErrorMessage('Ce script doit être lancé depuis la page d\'information sur une attaque.', 5000);