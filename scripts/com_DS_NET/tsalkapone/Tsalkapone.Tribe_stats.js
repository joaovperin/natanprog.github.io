
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Class: RankingStats
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
function RankingStats(){
	var win=(window.main||self),$=win.$;

	var script={
		id:'32FC2DD8-3B1B-11E1-A8FA-F9F94824019B',
		name:'Εμφάνιση στατιστικών διαγραμμάτων',
		version:1.05,
		minGameVersion:7.00,
		author:{
			name:'Tsalkapone',
			email:'tsalkapone@hotmail.com',
			url:'https://forum.fyletikesmaxes.gr/member.php?27574-tsalkapone',
		},
		credit:'(η αυθεντική έκδοση ανήκει στον: <span style="color:blue;">dalesmckay</span>)',
		runOnce:true
	};

	// ........................................................................
	function fnInt(value){return parseInt(value||'0',10);}
	// ........................................................................
	function fnPrint(msg){
		var myself=this;
	
		if($('#'+script.id).length<=0){
			$('body').append('<div id="'+script.id+'"></div>');
		}
	
		$('#'+script.id).append('<span>'+msg+'</span><br/>');
	} // fnPrint
	// ........................................................................
	function fnPrintVersion(){
		var authorURL=script.author.url?('<a href="'+script.author.url+'" target="_blank">'+script.author.name+'</a>'):script.author.name;
		
		fnPrint("=========================");
		fnPrint(authorURL + "'s " + script.name + ": v" + script.version.toFixed(2) + (script.credit?('<br/>'+script.credit):''));
		fnPrint("=========================");
		fnPrint($.trim($('.server_info').text().match(/\|\s*(.+)/)[1]));
		fnPrint("Όνομα λογαριασμού: "+win.game_data.player.name);
		fnPrint("Επιτηρητής : "+((fnInt(win.game_data.player.sitter_id)>0)?("Ενεργός - "+win.game_data.player.sitter_id):"Ανενεργός"));
		fnPrint("=========================");
		fnPrint("Τρέχουσα έκδοση: "+win.game_data.version);
		fnPrint("Κόσμος  : "+win.game_data.world);
		fnPrint("Screen : "+win.game_data.screen);
		fnPrint("Mode   : "+win.game_data.mode);
		fnPrint("URL    : "+win.location.href);
		fnPrint("Browser: "+navigator.userAgent);
		fnPrint("=========================");
	} // fnPrintVersion
	// ........................................................................
	function fnInjectStatGraphs(config){
		var url=('http://%%MARKET.twstats.com').replace(/\%\%MARKET/ig,(win.game_data.market=='en')?'www':win.game_data.market)+'/image.php';
		var template='%%POINTS%%VILLAGES%%ODA%%ODD';
		var cellTemplate='<td class="dsm%%MODE"%%VISIBLE><img src="%%URL?type=%%TYPEgraph&graph=%%MODE&%%ID&s=%%WORLD" style="width:%%WIDTH;height:%%HEIGHT;"></img></td>';
		var mode=(win.location.href.match(/mode\=(\w+)/i)||[null,'player'])[1];
		var table=$('#'+mode.replace(/awards/i,'award')+'_ranking_table'+(mode.match(/kill\_/i)?'~table:eq(0)':''));
		var srcHTML;
	
		if(table.length<=0){
			table=$('table[class*="vis"]:has(td a[href*="info_player"])');
		}
		if(table.length<=0){
			return;
		}

		// Inject the Checkboxes	
		srcHTML='';
		srcHTML+='<table id="dsmStats" width="100%" class="vis"><tr><th colspan="4"><center><b><font color="darkgreen">'+n5+'</font></b></center></th></tr><tr>';
		srcHTML+=	'<td><input id="cbPoints" type="checkbox" value="dsmpoints"'+(config.showPoints?' checked':'')+'/>&nbsp;<b><font color="maroon">'+n1+'</font></b></td>';
		srcHTML+=	'<td><input id="cbVillages" type="checkbox" value="dsmvillages"'+(config.showVillages?' checked':'')+'/>&nbsp;<b><font color="maroon">'+n2+'</font></b></td>';
		srcHTML+=	'<td><input id="cbODA" type="checkbox" value="dsmoda"'+(config.showODA?' checked':'')+'/>&nbsp;<b><font color="maroon">'+n3+'</font></b></td>';
		srcHTML+=	'<td><input id="cbODD" type="checkbox" value="dsmodd"'+(config.showODD?' checked':'')+'/>&nbsp;<b><font color="maroon">'+n4+'</font></b></td>';
		srcHTML+='</tr></table>';
		$('#tsal_magic').append(srcHTML)
	
		$('#cbPoints').click(function(){$(this).is(':checked')?$('.'+this.value).show('fast'):$('.'+this.value).hide('fast')});
		$('#cbVillages').click(function(){$(this).is(':checked')?$('.'+this.value).show('fast'):$('.'+this.value).hide('fast')});
		$('#cbODA').click(function(){$(this).is(':checked')?$('.'+this.value).show('fast'):$('.'+this.value).hide('fast')});
		$('#cbODD').click(function(){$(this).is(':checked')?$('.'+this.value).show('fast'):$('.'+this.value).hide('fast')});

		// Inject the Column Headers
		srcHTML=template
			.replace(/\%\%POINTS/ig,'<th class="dsmpoints"%%VISIBLE>'+n1+'</th>')
			.replace(/\%\%VILLAGES/ig,'<th class="dsmvillages"%%VISIBLE>'+n2+'</th>')
			.replace(/\%\%ODA/ig,'<th class="dsmoda"%%VISIBLE>'+n3+'</th>')
			.replace(/\%\%ODD/ig,'<th class="dsmodd"%%VISIBLE>'+n4+'</th>')
		;
		var hdr=table.find('tr:eq(0)');
		hdr.html(hdr.html()+srcHTML);

		// Inject the Cells.
		srcHTML=template
			.replace(/\%\%POINTS/ig,config.showPoints?cellTemplate.replace(/\%\%MODE/ig,'points'):'').replace(/\%\%VISIBLE/ig,config.showPoints?'':' style="display:none;"')
			.replace(/\%\%VILLAGES/ig,config.showVillages?cellTemplate.replace(/\%\%MODE/ig,'villages'):'').replace(/\%\%VISIBLE/ig,config.showVillages?'':' style="display:none;"')
			.replace(/\%\%ODA/ig,config.showODA?cellTemplate.replace(/\%\%MODE/ig,'oda'):'').replace(/\%\%VISIBLE/ig,config.showODA?'':' style="display:none;"')
			.replace(/\%\%ODD/ig,config.showODD?cellTemplate.replace(/\%\%MODE/ig,'odd'):'').replace(/\%\%VISIBLE/ig,config.showODD?'':' style="display:none;"')
			.replace(/\%\%URL/ig,url)
			.replace(/\%\%WORLD/ig,win.game_data.world)
			.replace(/\%\%TYPE/ig,mode.match(/ally/i)?'tribe':'player')
			.replace(/\%\%WIDTH/ig,config.width)
			.replace(/\%\%HEIGHT/ig,config.height)
		;
		table.find('tr:gt(0)'+(win.game_data.screen=='ally'?':has(td a[href*="info_player"])':'')).each(function(i,e){
			var id=($(e).find('a:eq(0)').attr('href')||'').match(/id\=\d*/i);
			e.innerHTML+=srcHTML.replace(/\%\%ID/ig,id);
			
			
		});
	} // fnInjectStatGraphs
	// ........................................................................


	return{
		execute:function(config){
			if($('#dsmStats').length>0){
				return;
			}
			
		

			var url=win.location.href;

			if((url.match(/screen\=ally/i)&&url.match(/mode\=members/i))||(['ranking','info_member'].indexOf(win.game_data.screen)>=0)){
				fnInjectStatGraphs(config);
			}
			else if(confirm('Tsalkapone. Εμφάνιση στατιστικών διαγραμμάτων\n\n Το συγκεκριμένο script ενεργοποιείται από:\n1. Τη σελίδα κατάταξης\n2. Τη λίστα μελών μιας φυλής\n\nΕπιθυμείτε αυτόματα ανακατεύθυνση στη σελίδα της κατάταξης;')){
				if(url.match(/screen\=ally/i)){
					win.location=win.game_data.link_base_pure.replace(/screen\=\w*/i,'screen=ally&mode=members');
				}
				else{
					win.location=win.game_data.link_base_pure.replace(/screen\=\w*/i,'screen=ranking');
				}
			}
		}
	};
} // RankingStats::constructor
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 