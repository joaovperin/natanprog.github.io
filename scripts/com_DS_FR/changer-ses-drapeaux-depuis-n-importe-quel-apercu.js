var link = document.URL + "";
if(link.indexOf('overview_villages')!=-1){
var monde = link.substring(link.indexOf('fr') + 2,link.indexOf('.'));
var pos = link.indexOf('&',link.indexOf('mode')+5);
if(pos!=-1){
var mode = link.substring(link.indexOf('mode')+5,link.indexOf('&',link.indexOf('mode')+5));
}else{
var mode = link.substring(link.indexOf('mode')+5,link.length);
}
var nbb = 1;
var place = 1;
var v = 1;
var nbv = 1;
var nb = 0;
var n = 0;
switch(mode){
case "trader":
mode = "trades";
place = 2;
break;
case "prod":
mode = "production";
break;
case "units":
place = 0;
nbv=0;
break;
case "buildings":
place = 2;
nbv = 2;
nb = 0;
nbb = 0;
break;
case "commands":
nbv = 0;
break;
case "incomings":
nb = 1;
n = 1;
nbv = 0;
break;
}
if(mode=='trades'){
nbv = parseInt(document.getElementById('trades_table').children[0].children[0].children[0].innerHTML);
}else{
var nbt = document.getElementById(mode+'_table').children[n].children[0].children[nbv].innerHTML;
nbv = parseInt(nbt.substring(nbt.indexOf('(')+1,nbt.indexOf(')')));
}
var Main_table = document.getElementById(mode+'_table');
var new_element = Main_table.children[nb].children[0].innerHTML + '<th style="text-align:center;">Drapeau</th>';
Main_table.children[nb].children[0].innerHTML = new_element;
if(mode=='buildings'){
nb = 1;
}
var url = link.substring(0,link.indexOf('&')) + "&mode=tech&group=0&page=-1&screen=overview_villages";
var xhReq=new XMLHttpRequest();
 	xhReq.open("GET", url, false);
 	xhReq.send(null);
var txt = xhReq.responseText; 
var get1 = "		<!-- *********************** ";
var get2 = "CONTENT BELOW";
var get3 = " ************************** -->";
var getf = get1 + get2 + get3;
var pos = txt.indexOf(getf);
txt = txt.substring(pos, txt.length);
var c = false;
if(txt.indexOf('Indication : plus de 1.000 entrées, seulement les premiers 1.000 sont affichés.')!=-1){
c = true;
var a = 0;
while(txt.indexOf(link.substring(0,link.indexOf('&')) +'&mode=tech&group=0&page=' + (a+1) + '&screen=overview_villages')!=-1){
a++;
}
}
var flag = "FlagsOverview.assign_flag_url";
var txt1 = txt.substring(txt.indexOf(flag),txt.indexOf(';',txt.indexOf(flag)));
txt1 = txt1.substring(txt1.indexOf("'") + 1,txt1.length-1);
var content1 = txt1;
flag = "FlagsOverview.unassign_flag_url";
txt1 = txt.substring(txt.indexOf(flag),txt.indexOf(';',txt.indexOf(flag)));
txt1 = txt1.substring(txt1.indexOf("'") + 1,txt1.length-1);
var content2 = txt1;
flag = "FlagsOverview.select_flag_url";
txt1 = txt.substring(txt.indexOf(flag),txt.indexOf(';',txt.indexOf(flag)));
txt1 = txt1.substring(txt1.indexOf("'") + 1,txt1.length-1);
var content3 = txt1;
txt = txt.substring(txt.indexOf('<table id="techs_table" class="vis overview_table"'),txt.length);
txt = txt.substring(0,txt.indexOf('</table>'));
if(c){
for(i=0;i<=a;i++){
url = link.substring(0,link.indexOf('&')) + "&mode=tech&group=0&page=" + (i+1) + "&screen=overview_villages";
var xhReq=new XMLHttpRequest();
 	xhReq.open("GET", url, false);
 	xhReq.send(null);
txtA = xhReq.responseText; 
pos = txtA.indexOf(getf);
txtA = txtA.substring(pos, txtA.length);
txtA = txtA.substring(txtA.indexOf('<table id="techs_table" class="vis overview_table"'),txtA.length);
txtA = txtA.substring(0,txtA.indexOf('</table>'));
txt = txt + txtA;
}
}
for(i=0;i<nbv;i++){
if(mode=='trades'){
var source = document.getElementById(mode+'_table').children[0].children[i+1].children[3].children[0].innerHTML;
var id = source.substring(source.indexOf('=')+1,source.indexOf('&'));
txt1 = txt.substring(txt.indexOf('flag_info_' + id)-8,txt.indexOf("</td",txt.indexOf('flag_info_'+id)));
new_element = Main_table.children[nb].children[1+i].insertCell(-1);
new_element.innerHTML = txt1;
}else if(mode=='units'){
var id = document.getElementById(mode+'_table').children[1+i].children[0].children[0].innerHTML;
id = id.substring(id.indexOf('id')+4,id.indexOf('>')-1);
txt1 = txt.substring(txt.indexOf('flag_info_' + id)-8,txt.indexOf("</td",txt.indexOf('flag_info_'+id)));
new_element = Main_table.children[1+i].children[0].insertCell(-1);
new_element.innerHTML = txt1;
}else if(mode=='commands'){
var source = document.getElementById(mode+'_table').children[nb].children[1+i].children[place].innerHTML;
var id = source.substring(source.indexOf('id')+3,source.lastIndexOf('&'));
txt1 = txt.substring(txt.indexOf('flag_info_' + id)-8,txt.indexOf("</td",txt.indexOf('flag_info_'+id)));
new_element = Main_table.children[nb].children[1+i].insertCell(-1);
new_element.innerHTML = txt1;
}else if(mode=='incomings'){
var source = document.getElementById(mode+'_table').children[nb].children[1+i].children[place].innerHTML;
var id = source.substring(source.indexOf('village')+8,source.indexOf('&'));
txt1 = txt.substring(txt.indexOf('flag_info_' + id)-8,txt.indexOf("</td",txt.indexOf('flag_info_'+id)));
new_element = Main_table.children[nb].children[1+i].insertCell(-1);
new_element.innerHTML = txt1;
}else{
var id = document.getElementById(mode+'_table').children[nb].children[nbb+i].children[place].innerHTML;
id = id.substring(id.indexOf('id')+4,id.indexOf('>')-1);
txt1 = txt.substring(txt.indexOf('flag_info_' + id)-8,txt.indexOf("</td",txt.indexOf('flag_info_'+id)));
new_element = Main_table.children[nb].children[nbb+i].insertCell(-1);
new_element.innerHTML = txt1;
}
}
var FlagsOverview={select_flag_url:content3,assign_flag_url:content1,unassign_flag_url:content2,assignFlag:function(flag_type,level,village_id){$.post(this.assign_flag_url,{flag_type:flag_type,level:level,village_id:village_id},function(data){if(typeof data.error!='undefined'){UI.ErrorMessage(data.error);return};$flag_info=$('#flag_info_'+village_id);$flag_present=$flag_info.find('.flag_present').show();$flag_present.find('img').eq(0).attr('src',data.flag.img_small);$flag_present.find('span').text(data.flag.description_short);$flag_info.find('.flag_none').hide();$('#flags_select_'+village_id).toggle()},'json')},unassignFlag:function(village_id){$.post(this.unassign_flag_url,{village_id:village_id},function(data){if(typeof data.error!='undefined'){UI.ErrorMessage(data.error);return};$flag_info=$('#flag_info_'+village_id);$flag_info.find('.flag_present').hide();$flag_info.find('.flag_none').show();$('#flags_select_'+village_id).hide()},'json')},selectFlag:function(event,village_id){UI.AjaxPopup(event,'flags_select_'+village_id,FlagsOverview.select_flag_url+'&flag_village_id='+village_id,"Sélectionner le drapeau",FlagsOverview.handleSelectFlagContent,{reload:true,saveDragPosition:false})},handleSelectFlagContent:function(content,$content_container){$content_container.html(content);startTimer()}};
}else{
UI.ErrorMessage('Ce script doit être exécuté depuis un aperçu', 5000);
}
void(0);