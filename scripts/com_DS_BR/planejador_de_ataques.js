/* 
	Autor: Fluffy88
	Editado: Gil Penner (Paçoquita)
*/

if(game_data.player.premium == false) {
    UI.InfoMessage('Para utilizar esse script é necessário uma Conta Premium!', 3000, true);
    end();
}

if(game_data.screen != 'overview_villages'){
	UI.InfoMessage('Script deve ser usado na página de vizualizações.', 3000, true);
	end();
}

if(document.getElementById('combined_table') == null) {
	UI.InfoMessage('Script deve ser usado no modo combinado.', 3000, true);
	end();
}

unitnames = {
  "spear":"Lanceiros",
  "sword":"Espadachins",
  "axe":"Barbaros",
  "archer":"Arqueiros",
  "spy":"Exploradores",
  "light":"Cavalaria Leve",
  "marcher":"Arqueiros a Cavalo",
  "heavy":"Cavalaria Pesada",
  "ram":"Arietes",
  "catapult":"Catapultas",
  "knight":"Paladino",
  "snob":"Nobres"
};

function ConverterHora(string) {
	var separar = string.split(" ");
	string = separar[0] + ", " + separar[2] + "/" + separar[1] + "/" + separar[3] + " ás " + separar[4]

	var subistituir_nomes = {"Sun":"Dom", "Mon":"Seg", "Tue":"Ter", "Wed":"Qua", "Thu":"Qui", "Fri":"Sex", "Sat":"Sab", "Jan":"01", "Feb":"02", "Mar":"03", "Apr":"04", "May":"05", "Jun":"06", "Jul":"07", "Aug":"08", "Sep":"09", "Oct":"10", "Nov":"11", "Dec":"12"};
	for (var subistituir in subistituir_nomes) {
		string = string.split(subistituir).join(subistituir_nomes[subistituir]);
	}
	return string;
}

function fnInjectOverviewBar(){
	/* Usa a aldeia atual como padrao */
	var defaultCoords = fnExtractCoords(win.$("title").html());
	
	/* Usa a meia noite doa dia seguinte como padrao */
	var defaultDate = new Date();
	defaultDate.setTime(((Math.floor(defaultDate.getTime()/msPerDay)+1)*minsPerDay + defaultDate.getTimezoneOffset())*msPerMin);
	defaultDate = defaultDate.toString().replace(/\w+\s*/i,"").replace(/(\d*:\d*:\d*)(.*)/i,"$1");
	
	/* Injeta o codigo na pagina */
	fnInjectUnits();
	$('<br/>Coordenada da aldeia: <input id="snipe_coord" value="' + defaultCoords + '" class="text-input inactive" size="4" onFocus="this.select()" /> Data de Chegada: <input id="arrival_time" size="17" class="text-input inactive" value="' + defaultDate + '" onFocus="this.select()" /> <input type="button" value="Ok" onClick="fnCalculateBackTime()" />').appendTo($('#paged_view_content table:first'));
	$('<br/><input type="checkbox" id="pegar_tudo" value="Paçoquita"> <i>Selecionar todas as aldeias.</i>').appendTo($('#paged_view_content table:first'));
	$('<div id="snipe_output"><br/><span>Planejador de ataques ' + version + '<hr></span><br/></div>').appendTo($('#content_value'));
}

function fnExtractCoords(src) {
	var vv=src.match(/\d+\|\d+/ig);
	return (vv?vv[vv.length-1]:null);
}

function fnCalculateDistance(to,from){
	var target = fnExtractCoords(to).match(/(\d+)\|(\d+)/);
	var source = fnExtractCoords(from).match(/(\d+)\|(\d+)/);
	var fields = Math.sqrt(Math.pow(source[1]-target[1],2)+Math.pow(source[2]-target[2],2));
	return fields;
}

function fnDebugLog(msg){win.$("body").append("<span>"+msg+"</span><br/>");}

function fnAjaxRequest(url,sendMethod,params,type){
	var error=null,payload=null;

	win.$.ajax({
		"async":false,
		"url":url,
		"data":params,
		"dataType":type,
		"type":String(sendMethod||"GET").toUpperCase(),
		"error":function(req,status,err){error="ajax: " + status;},
		"success":function(data,status,req){payload=data;}
	});

	if(error){
		throw(error);
	}

	return payload;
}

function fnCreateConfig(name){return win.$(fnAjaxRequest("/interface.php","GET",{"func":name},"xml")).find("config");}
function fnCreateUnitConfig(){return fnCreateConfig("get_unit_info");}
function fnCreateWorldConfig(){return fnCreateConfig("get_config");}

function fnCalculateLaunchTime(source,target,unit,landingTime){
	var distance = fnCalculateDistance(target,source);
	var unitSpeed = unitConfig.find(unit+" speed").text();

	var unitTime = distance*unitSpeed*msPerMin;

	var launchTime = new Date();
	launchTime.setTime(Math.round((landingTime.getTime() - unitTime)/msPerSec)*msPerSec);
	return launchTime;
}

function fnWriteCookie(ele){
	var snipeConfig="";
	win.$("#combined_table tr:first th img[src*=unit_]").each(function(i,e){
		snipeConfig+=win.$("#view_"+e.src.match(/unit\_(.+)\.png?/i)[1]).is(':checked')?"1":"0";
	});

	var cookie_date=new Date(2099,11,11);
	win.document.cookie='$snipe='+snipeConfig+';expires='+cookie_date.toGMTString();
}

function fnInjectUnits(){
	var twCookie=win.document.cookie.match(/\$snipe\=([0|1]*)/i);
	if(twCookie){
		twCookie=twCookie[1];
		for(var ii=0;ii<twCookie.length;ii++){
		}
	}

	win.$("#combined_table tr:first th img[src*=unit_]").each(function(i,e){
		win.$('<input type="checkbox" '+((!twCookie||(twCookie[i]=="1"))?'':'')+' id="view_'+e.src.match(/unit\_(.+)\.png?/i)[1]+'" OnClick="fnWriteCookie(this);"/>').insertBefore(win.$(this));
	});
	
	win.$("#combined_table tr:first th:has(img[src*=unit_])").attr("style","background-color:yellow");
	
	$("#combined_table td:nth-child(2) span.quickedit-vn").each(function(i,e){ 
		$('<input type="checkbox" id="' + $.trim($(e).text()) + '" OnClick="fnWriteCookie(this);"/>').insertBefore($(this));
	})
}
	
function fnExtractUnits(){
	var units=[];

	win.$("#combined_table tr:first th img[src*=unit_]").each(function(i,e){
		units.push(e.src.match(/unit\_(.+)\.png?/i)[1]);
	});
	return units;
}

function copyToClipboard() {
	window.prompt("Copiar planejamento: Ctrl+C, Enter", document.getElementById("resultado_planejador").value);
}
	
function fnCalculateBackTime(){
	var worldConfig = fnCreateWorldConfig();
	var hasChurch = worldConfig && parseInt(worldConfig.find("game church").text()||"0", 10);
	var arrivalTime = new Date(win.$("#arrival_time").val().split(":").slice(0,3).join(":"));
	var target = win.$("#snipe_coord").val();
	var servertime = win.$("#serverTime").html().match(/\d+/g);
	var serverDate = win.$("#serverDate").html().match(/\d+/g);
	serverTime = new Date(serverDate[1]+"/"+serverDate[0]+"/"+serverDate[2]+" "+servertime.join(":"));
	var output = [];
	var ii,troop_count,source,launchTime;
	var units=fnExtractUnits();
	
	/* Loop entre todas as aldeias */
	win.$("#combined_table tr:gt(0)").each(function(i,e){
		source = fnExtractCoords($(this).find("td:eq(1)").html());
		
		if(source != target){
			var isVisible = false;
			
			
			
			/* Processa cada unidade */
			for(ii=0;ii<units.length;ii++) {
				if(win.$("#view_"+units[ii]).is(':checked') && document.getElementById($.trim($(this).find("td:eq(1)").text())).checked || win.$("#view_"+units[ii]).is(':checked') && document.getElementById("pegar_tudo").checked == true) {
					troop_count = parseInt($(this).find("td:eq("+(ii+(hasChurch?9:8))+")").text(),10);
					launchTime=fnCalculateLaunchTime(source,target,units[ii],arrivalTime);
					
					/* Salva as unidades que chegam a tempo*/										
					if(launchTime.getTime() > serverTime.getTime()) {
						isVisible = true;
						
						var hr_convertida = launchTime.toString().replace(/(\d*:\d*:\d*)(.*)/i,"$1")
						hr_convertida = ConverterHora(hr_convertida);
						
						output.push([launchTime.getTime(),"Enviar "+unitnames[units[ii]]+" da aldeia "+source+" para a aldeia "+target+" "+hr_convertida, e]);
					}
				}
			}
		}
		win.$(e).attr("style","display:"+(isVisible?"table-row":"none"));
	});

	/* Organiza as aldeias por ordem de ataque */		
	output = output.sort(function(a,b){return (a[0]-b[0]);});
	for(var qq=0;qq<output.length;qq++){win.$("#combined_table").get(0).tBodies[0].appendChild(output[qq][2]);}

	/* Limpa e atualiza a mensagem atual */
	var srcHTML = "<br/><span>Planejador de ataques " + version + "<hr></span><br/>";
	if(output.length > 0){		
		srcHTML += "<a style=\"padding: 25px 25px;\" onclick=\"copyToClipboard()\" href=\"javascript:void(0)\">Copiar tudo</a><br /><div align=\"center\"><textarea wrap=\"off\" id=\"resultado_planejador\" readonly=\"yes\" cols=\"80\" rows=\"" + (output.length+1) + "\" style=\"width:95%;background-color:transparent;\" onfocus=\"this.select();\">";

		for(ii=0;ii<output.length;ii++){
			srcHTML += output[ii][1] + "\n";
		}

		srcHTML += "</textarea></div>";
	}
	else {
		srcHTML += "<span style=\"color:red;\">Não é possível enviar ataque e/ou apoio com essa unidade dentro do prazo estipulado!</span>";
	}

	srcHTML += "<br/><br/><br/>";
	
	win.$("#snipe_output").html("");
	win.$("#snipe_output").append(win.$(srcHTML));
}


try{
	var author="dalesmckay@gmail.com";
	var minVer="7.0";
	var win=(window.frames.length>0)?window.main:window;

	var ver=win.game_data.version.match(/[\d|\.]+/g);
	if(!ver||(parseFloat(ver[1])<minVer)){
		alert("This script requires v"+minVer+" or higher.\nYou are running: v"+ver[1]);
	}
	else if(win.$("#snipe_output").length <= 0){
		var msPerSec=1000;
		var secsPerMin=60;
		var minsPerHour=60;
		var hrsPerDay=24;
		var msPerMin=msPerSec*secsPerMin;
		var msPerHour=msPerMin*minsPerHour;
		var msPerDay=msPerHour*hrsPerDay;
		var minsPerDay=hrsPerDay*minsPerHour;

		var version='v3.3br';

		var unitConfig=fnCreateUnitConfig();
		fnInjectOverviewBar();
	}
}
catch(objError){
	var dbgMsg="Error: " + String(objError.message||objError);
	alert(dbgMsg);
}