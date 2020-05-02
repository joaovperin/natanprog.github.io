/*
Author	: Broken Castle
Website : http://burakdemirer.com
*/

if (game_data.screen!='place' & game_data.try!='confirm'){
	alert('===== Saldırı Zamanlama Scripti =====\n\nBu script sadece "Saldırı Gönder / Destek Gönder" sayfasında çalışır...\n\nAuthor : Broken Castle\n');
	end();
}
function fncLandingTime(){
    var a = $("#date_arrival").closest("tr").prev("tr").find("td:eq(1)").text().match(/\d+/g);
    var b = $("#serverTime").text().match(/\d+/g);
    var c = $("#serverDate").text().match(/\d+/g);
    var d = fncInt($("#dsmLag").val());
    return new Date(Date.UTC(c[2], c[1] - 1, c[0], b[0] - -a[0], b[1] - -a[1], b[2] - (-a[2] - d)))
}
function fncBackTime(){
	var a = $("#date_arrival").closest("tr").prev("tr").find("td:eq(1)").text().match(/\d+/g);
    var b = $("#serverTime").text().match(/\d+/g);
    var c = $("#serverDate").text().match(/\d+/g);
    var d = fncInt($("#dsmLag").val());
    return new Date(Date.UTC(c[2], c[1] - 1, c[0], b[0] - -2*a[0], b[1] - -2*a[1], b[2] - (-2*a[2] - d)))
}
function fncChangeSelecter(){
	if (document.getElementById("selecter").value=="0"){
		var LandingTime = fncLandingTime();
	} 
	else {
		var LandingTime = fncBackTime();
	}
	LandingTime.setUTCMinutes(LandingTime.getUTCMinutes() + 1);
	document.getElementById("dsmDD").value=fncZeroPad(LandingTime.getUTCDate(), 2);
	document.getElementById("dsmMM").value=fncZeroPad(LandingTime.getUTCMonth() + 1, 2);
	document.getElementById("dsmYY").value=LandingTime.getUTCFullYear();
	document.getElementById("dsmHH").value=fncZeroPad(LandingTime.getUTCHours(), 2);
	document.getElementById("dsmNN").value=fncZeroPad(LandingTime.getUTCMinutes(), 2);
	document.getElementById("dsmSS").value=fncZeroPad(LandingTime.getUTCSeconds(), 2);
	Refresh();
}
function Refresh(){
    var landing = fncLandingTime();
    $("#date_arrival").html(fncZeroPad(landing.getUTCDate(), 2) + "/" + fncZeroPad(landing.getUTCMonth() + 1, 2) + "/" + landing.getUTCFullYear() + " " + landing.getUTCHours() + ":" + fncZeroPad(landing.getUTCMinutes(), 2) + ":" +fncZeroPad(landing.getUTCSeconds(), 2));
	var back = fncBackTime();
    $("#BackTime").html(fncZeroPad(back.getUTCDate(), 2) + "/" + fncZeroPad(back.getUTCMonth() + 1, 2) + "/" + back.getUTCFullYear() + " " + back.getUTCHours() + ":" + fncZeroPad(back.getUTCMinutes(), 2) + ":" +fncZeroPad(back.getUTCSeconds(), 2));
	
    $("#dsmCT").html($("#serverDate").text() + " " + $("#serverTime").text());
    var time = new Date(Date.UTC(fncInt($("#dsmYY").val()), fncInt($("#dsmMM").val()) - 1, fncInt($("#dsmDD").val()), fncInt($("#dsmHH").val()), fncInt($("#dsmNN").val()), fncInt($("#dsmSS").val())));
	if (document.getElementById("selecter").value=="0"){
		var second = (time - landing) / 1e3;
	}
	else {
		var second = (time - back) / 1e3;
	}
	document.title=second+" Saniye";
	setInterval(UpdateSec(second),20);
    setTimeout("Refresh()", 100)
}
function UpdateSec(second){
	$("#dsmBT").html('<span style="' + (second < 60 ? "color:red;font-weight:bold;" : "") + '">' + second + " Saniye"  + "</span>");
}
function fncInt(a){
    return parseInt(a || "0", 10)
}
function fncZeroPad(a, b){
    var c = a.toString();
    while (c.length < b){
        c = "0" + c
    }
    return c
}
var DefaultLagSeconds = 0;
if ($("#dsmPlannedTime").length <= 0){
    var LandingTime = fncLandingTime();
	var BackTime = fncBackTime();
    LandingTime.setUTCMinutes(LandingTime.getUTCMinutes() + 2);
	BackTime.setUTCMinutes(BackTime.getUTCMinutes() + 2);
    var srcHTML = "<tr>" + "<td>Dönüş:</td>" + '<td id="BackTime">' + "</td>" + "</tr>" + "<tr>" + "<td>Tarih:</td>" + '<td id="dsmCT">' + $("#serverDate").text() + " " + $("#serverTime").text() + "</td>" + "</tr>" + "<tr>" + "<td>Geri Sayım:</td>" + '<td id="dsmBT"></td>' + "</tr>" + '<tr id="dsmPlannedTime"><th colspan="2">Plan</th></tr>' + "<tr>" + "<td>Azalt:</td>" + "<td>" + '<input id="dsmLag" value="' + DefaultLagSeconds + '" size="2" type="text"/>' + '<span style="margin-left:0.25em;">Saniye</span>' + "</td>" + "</tr>" + "<tr>" + '<td><select onchange ="fncChangeSelecter()" name="selecter" id="selecter" width="50"><option value="0">Varış</option><option value="1">Dönüş</option></select></td>' + "<td>" + '<input id="dsmDD" value="' + fncZeroPad(LandingTime.getUTCDate(), 2) + '" size="2" type="text"/>' + "/" + '<input id="dsmMM" value="' + fncZeroPad(LandingTime.getUTCMonth() + 1, 2) + '" size="2" type="text"/>' + "/" + '<input id="dsmYY" value="' + LandingTime.getUTCFullYear() + '" size="4" type="text"/>' + "<br>" + '<input id="dsmHH" value="' + fncZeroPad(LandingTime.getUTCHours(), 2) + '" size="2" type="text"/>' + ":" + '<input id="dsmNN" value="' + fncZeroPad(LandingTime.getUTCMinutes(), 2) + '" size="2" type="text"/>' + ":" + '<input id="dsmSS" value="' + fncZeroPad(LandingTime.getUTCSeconds(), 2) + '" size="2" type="text"/>' + "</td>" + "</tr>" + '<tr><th colspan="2">Diğer</th></tr>';
    $(srcHTML).insertAfter($("#date_arrival").closest("tr"));
    $("#date_arrival").html(LandingTime)
}
Refresh();