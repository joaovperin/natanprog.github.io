/*
Author :	Broken Castle & Trafik
Contact: burak.demirer.71@gmail.com (Broken Castle)
			dursunkaramustafa@gmail.com (Trafik)
*/

if (game_data.screen !='overview_villages'){document.location =game_data.link_base_pure + 'overview_villages&mode=combined';end()};
if ($('#BT').length>0){viewClose();end()};
var market =game_data.market;var info ='';
if (market =='tr'){info ='B&T - Köy isminiz 3 ila 32 karakter arasında olmalıdır'};
if (market !='tr'){info ='B&T - Village name must be between 3 and 32 characters'};

function gui(){
	var version ='v1.0';
	if (market =='tr'){
		var translate ={
			option01 :'Toplu Köy İsimlendiricisi',
			option02 :'Kıta Numarası',
			option03 :'Köy İsmi',
			option04 :'Köy İsmi Giriniz',
			option05 :'Köy Numarası',
			option06 :'Başlangıç',
			option07 :'Basamak',
			option08 :'Gelişmiş Ayarlar',
			option09 :'Hız',
			option10 :'Yavaş',
			option11 :'Hızlı',
			option12 :'Dil',
			option13 :'İsimlendir',
	}};
	if (market !='tr'){
		var translate ={
			option01 :'Mass Village Renamer',
			option02 :'Continent Number',
			option03 :'Village Name',
			option04 :'Village Name Here',
			option05 :'Village Number',
			option06 :'Start',
			option07 :'Digit',
			option08 :'Settings',
			option09 :'Speed',
			option10 :'Slow',
			option11 :'Fast',
			option12 :'Language',
			option13 :'Rename',
	}};

	$('#inner-border').append("<div id='BT'style='width:250px;left:40%;top:25%;position:fixed;overflow-y:hidden;background-color:#e9d7a9;border-radius:50px 0px;padding:10px;border:10px solid rgba(0,0,0,.1)'><h1 id='showStart'style='font-family:Comic Sans Ms;font-size:150%;text-align:center;color:brown'>Broken Castle & Trafik<br><br>"+ translate.option01 +"<br>"+ version +"</h1><center><b id='showFinish'style=';color:brown;display:none;font-size:100px;'>B&T</b></center><div id='process' style='font-weight:bold;color:#603000;padding:5px 30px;display:none'><a id='close'style='float:right;font-size:20px;margin-right:-35px;margin-top:-15px;cursor:pointer'onclick='viewClose()'>X</a><input id='continentCheck'type='checkbox'><label for='continentCheck'> "+ translate.option02 +"</label><br><input id='nameCheck'type='checkbox'onclick='nameCheck()'><label for='nameCheck'> "+ translate.option03 +"</label><br><input id='nameText'type='text'style='margin-left:25px;display:none'placeholder='"+ translate.option04 +"'><input id='numCheck'type='checkbox'onclick='numCheck()'><label for='numCheck'> "+ translate.option05 +"</label><br><table id='numTable'style='margin-left:25px;display:none'><tr><td><label for='startNum'>"+ translate.option06 +" </label></td><td style='padding-left:20px'><label for='digitNum'>"+ translate.option07 +"</label></td></tr><tr><td><input id='startNum'type='number'min='1'value='1'style='width:50px;display:blok'></td><td style='padding-left:20px'><input id='digitNum'type='number'min='1'max='32'value='3'style='width:50px;display:blok'></td></tr></table><br><label onclick='javascript:document.getElementById(\"settings\").style.display=\"block\"'>> "+ translate.option08 +"</label><div id='settings'style='padding:5px 0px;display:none'><fieldset style='border:1px solid #1F497D;background:#ddd;border-radius:5px;'><legend>"+translate.option09+"</legend>"+ translate.option10 +" <input id='speed'type='range'min='-500'max='-100'value='-300'style='height:10px;width:80px'> "+ translate.option11 +"</fieldset><fieldset  style='border:1px solid #1F497D;background:#ddd;border-radius:5px;'><legend>"+translate.option12+"</legend><a onclick='language_tr()'style='color:red'>TR </a>| <a onclick='language_en()'style='color:blue'>EN </a></fieldset><br></div><br><br><center><a class='btn'onclick='complete()'>"+ translate.option13 +"</a></center></div></div>");
	$('#BT').draggable();$('#showStart').delay(2000).toggle('slow');$('#process').delay(1800).toggle('slow')
};gui();

var coordinates =$('#combined_table').html().match(/\d+\|\d+/g);
var villageId =[];$('#combined_table span[data-id]').each(function(){villageId.push($(this).data('id'))});

function remove(){$('#BT').remove()};
function viewClose(){$('#process').toggle('slow');$('#showFinish').delay(200).toggle('slow');setTimeout(remove,2000)}
function nameCheck(){var nameText =document.getElementById('nameText').style;if (document.getElementById('nameCheck').checked){nameText.display ='block'}else nameText.display ='none'};
function numCheck(){var numTable =document.getElementById('numTable').style;if (document.getElementById('numCheck').checked){numTable.display ='block'}else numTable.display ='none'};
function digitEdit(i,j){var k =i+'';while (k.length<j){k ='0'+k};return k};
function continent(i){var k =coordinates[i];var j ='K'+k[4]+k[0];return j};
function language_tr(){market='tr';info ='B&T - Köy isminiz 3 ila 32 karakter arasında olmalıdır';viewClose();setTimeout(gui,2000)};
function language_en(){market='en';info ='B&T - Village name must be between 3 and 32 characters';viewClose();setTimeout(gui,2000)};
function complete(){
	var i=0;var villageName='';
	var name =document.getElementById('nameText').value;
	var start =document.getElementById('startNum').value;
	var digit =document.getElementById('digitNum').value;
	var speed =-document.getElementById('speed').value;

	function action(){
	if (document.getElementById('continentCheck').checked==true){villageName +=continent(i)+' '};
	if (document.getElementById('nameCheck').checked==true){villageName +=name};
	if (document.getElementById('numCheck').checked==true){villageName +=digitEdit(start,digit)};
	if (2<villageName.length && villageName.length<33){
		$('.quickedit-vn[data-id='+ villageId[i] +']').find('.rename-icon').click();
		$('.quickedit-vn[data-id='+ villageId[i] +']').find('input[type=text]').val(villageName);
		$('.quickedit-vn[data-id='+ villageId[i] +']').find('input[type=button]').click();
		i++;start++;villageName='';
		if (i<document.getElementById('combined_table').rows.length-1){setTimeout(action,speed)}}
	else UI.InfoMessage(info,2000,'error')
	};action()
};