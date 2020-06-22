if (game_data.mode == 'incomings') {
if ($('#d').length == 0) {
$("body").append(''
+'<div id="d">'
+'	<div id="h">'
+'		<span>Virza\'s Script</span>'
+'		<span id="o"></span>'
+'	</div>'
+'<div id="c">'
+'<h1>Options</h1>'
+'<div class="b">'
+'	<span>Nom:  <input type = "text" id="search" value = "Attaque"/></span>'
+'	<span>Limite: <input type ="text" id="limit" value = "100"/></span>'
+'	<span id="_error" style="color:red"></span>'
+'	<span><button onclick="javascript:opener();void(0);">OK</button></span>'
+'</div>'
+'</div>'
+'<style>'
+'	#d{background:#c1d9ff;border:1px solid #3a5774;font-family:arial;padding:4px;width:19em;margin:auto;position:absolute;left:75%;top:30%;z-index:999999}'
+'	#h{background:#e0edfe;font-size:14px;font-weight:700;padding:4px 20px 4px 10px;cursor:move}'
+'	#o{background:url(http://www.gstatic.com/analytics/iyp/iyp_close_dialog.gif) no-repeat scroll center center transparent;'
+'       cursor:pointer;height:15px;position:absolute;right:10px;top:8px;width:15px}'
+'	#c{background:#fff;font-size:12px}'
+'	.b{padding:5px}'
+'	#d #c span{display:block}'
+'	#d h1{background:none repeat scroll 0 0 #e4e4e4;border-bottom:1px solid #c4c4c4;border-top:1px solid #fff;font-size:13px;line-height:20px;margin:0;outline:medium none;padding:0 4px}'
+'code{font-size:11px;display:block;color:#800}'
+'</style>'
+'</div>'); 
}
$("#d").draggable({      containment:"html",      handle:"#h"  });  
	$("#o").click(function(){ $('#d').remove(); });        
	var m=$(".b:first, #c h1:first").show();
function opener()	{
	var name = document.getElementById('search').value;
	var limit = document.getElementById('limit').value;
	if(!name) {string='#incomings_table tr td:nth-child(1) a:contains("Attaque")';}
	else {string = '#incomings_table tr td:nth-child(1) a:contains("' +name + '")';}
	if(!limit) {
		document.getElementById('_error').innerHTML = '<b>Vous devez indiquer un nombre maximal d\'ouvertures d\'onglets</b>';
		return false;
	}
	$(string).each(function(i)	{
		if(i < limit)	{
			window.open(this);
		}
	});
}} else UI.ErrorMessage('Ce script doit être lancé depuis la liste des attaques', 5000);