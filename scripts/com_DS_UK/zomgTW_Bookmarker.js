javascript:
$(function()
{
	var doc=document;
	if(window.frames.length >0)
	{
		doc=window.main.document;
	}
	var data=window.game_data;
	var url=window.location;
	if (data.player.sitter=="0")
	{
		var urlPrefix="/game.php?";
	}
	else
	{
		var urlPrefix="/game.php?t="+data.player.id+"&";
	}
	var regex = /view=([0-9]*)/;
	if(data.screen !=='report' || data.mode!=='attack' || regex.test(url))
	{
		window.location.href=urlPrefix+"screen=report&mode=attack";
		return false;
	}
	
	var grp='{"id":"'+data.player.id+'","world":"'+data.world+'","market":"'+data.market+'","bookmarks":['; 
	
	// get report ids from list of reports
	var ar=new Array();
	$('#report_list').find('.quickedit').each(function(key, obj){
		ar.push($(obj).attr('data-id'));
	});
	
	ar.reverse();
	ar.join(",");
	if(ar.length >=1)
	{
		var world=data.world;
		world=world.replace(/[^0-9]/g, "");
		var blah=grp+ar+']}';
		
		//var link="http://zomgtw.net/bookmarker/bookmarker.php?world="+world+"&market="+data.market+"&data="+blah;
		var link="http://zomgtw.hosted.clashrank.com/bookmarker/bookmarker.php?world="+world+"&market="+data.market+"&data="+blah; //fix for zomgtw.net domain being down
		
		var inf=" <div align='center' >Copy the text below then follow the link <br/ > <br/ > <textarea id='stuff' cols=30 rows=4 >"+blah+" </textarea > <br/ > <br/ > <a href='"+link+"' target='_blank' >Save my bookmarks! </a > </div >";
		var str=" <div id='draggy' style='cursor:move;background: #997733;text-align:right;padding-bottom:5px;padding-right:5px;margin-bottom:5px;' > <button id='btn' style='margin-top:5px;font-size:10pt;font-weight:bold;color:#997733;cursor:pointer;background:#D2C09E;padding:3px 5px;border:1px solid white;' onclick=($('#div1').remove());return false; >X </button > </div > <div  style='background:#F7EED3; margin:10px;padding:5px;' >"+inf+" </div >";
		frm=doc.getElementById('ds_body');
		var villageForm=doc.createElement('div');
		villageForm.setAttribute('style', 'min-height:150px;width: 400px;border: 2px solid #997733; background: #F7EED3;padding: 0px 0px 0px 0px;position: absolute; top: 200px;left: 200px;');
		villageForm.id = 'div1';
		villageForm.innerHTML=str;
		frm.appendChild(villageForm);
		$('#div1').draggable({handle: '#draggy'});
		if($("#stuff"))
		{
			$("#stuff").click(function(){
				this.select();
			});
		}
	}
	else
	{
		alert("No reports!");
	}
});
void (0);