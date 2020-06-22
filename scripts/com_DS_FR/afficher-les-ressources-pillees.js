// Show looted resources = slr
var Slr = Slr || {};

Slr.debug = Slr.debug || false;


(function($) {
	
	Slr.obj = function() {
		var _vars;
		
		var prv = {
			reset:function() {
				_vars = {
					wood:0,
					stone:0,
					iron:0,
					nbUrls:0,
					nbUrlsReceived:0
				};
			},
			process:function() {
				// Reset all datas
				prv.reset();
				
				// Check if there are return attacks
				var $showOutgoingUnits = $('#show_outgoing_units');
				//console.log($showOutgoingUnits);
				if ($showOutgoingUnits.find("img[src*='return']").length==0) {
					UI.ErrorMessage('Aucun retour d\'attaque !', 5000);
					return false;
				}
				
				// Find urls and process requests
				var urls = prv.findUrls($showOutgoingUnits);
				prv.request(urls);
			},
			findUrls:function($showOutgoingUnits) {
				var urls = [];
				$showOutgoingUnits.find('tr:gt(0)').each(function() {
					if($(this).find("img[src*='return']").length==0) return true;
					var url = $(this).find('a:eq(0)').attr('href');
					urls.push(url);
				});
        //console.log(urls);
				return urls;
			},
			request:function(urls) {
        // avoid refresh during processing
        if (!Timing.paused)
          Timing.pause(); 
				
				_vars.nbUrls = urls.length;
				
				$.each(urls,function() {
					$.ajax({
						url:this,
					}).done(prv.getLoot);
				});
				
			},
			getLoot:function(response) {
        //console.log(response);
				var $tr = $(response).find('tr:contains("Butin"):last()');
				var $lootSpan = $tr.find('span.nowrap');
				
        //console.log($tr, $lootSpan);
				var loot = {
					wood:0,
					stone:0,
					iron:0
				};
				
				$lootSpan.each(function() {
					var $spanIcon = $(this).find('span.icon');
					var type = $spanIcon.hasClass('wood') ? 'wood' : $spanIcon.hasClass('stone') ? 'stone' : 'iron';
					
					var nb = parseInt($(this).text().replace('.',''));
					if(!isNaN(nb)) loot[type] += nb;
				});
				
				prv.endResponse(loot);
			},
			endResponse:function(loot) {
				_vars.wood += loot.wood;
				_vars.stone += loot.stone;
				_vars.iron += loot.iron;
				_vars.nbUrlsReceived ++;
				
				if(_vars.nbUrlsReceived < _vars.nbUrls) return false;
				
				prv.generate();
			},
			generate:function() {
				var html = '<div class="vis widget" id="show_res">';
					html+= '<h4 class="head">';
						html+= '<img style="float: right; cursor: pointer;" onclick="return VillageOverview.toggleWidget(\'show_res\', this );" src="graphic/minus.png" />';
						html+= 'Ressources entrantes';
					html+= '</h4>';
					html+= '<div style="display: block;" class="widget_content">';
						html+= '<table width="100%"><tbody>';
							html+= '<tr class="nowrap"><td width="70"><span title="Bois" class="icon wood"></span>Bois</td><td><strong id="show_res_wood">0</strong></td></tr>';
							html+= '<tr class="nowrap"><td width="70"><span title="Fer" class="icon stone"></span>Argile</td><td><strong id="show_res_stone">0</strong></td></tr>';
							html+= '<tr class="nowrap"><td width="70"><span title="Fer" class="icon iron"></span>Fer</td><td><strong id="show_res_iron">0</strong></td></tr>';
							html+= '<tr class="nowrap"><td width="70"><span title="Total" class="icon header ressources"></span>Total</td><td><strong id="show_res_total">0</strong></td></tr>';
						html+= '</tbody></table>';
					html+= '</div>';
				html+= '</div>';
				
				var $showRes = $('#show_res');
				
				if($showRes.length ==0) $('#rightcolumn').prepend(html);
				
				$('#show_res_wood').text(_vars.wood);
				$('#show_res_stone').text(_vars.stone);
				$('#show_res_iron').text(_vars.iron);
				$('#show_res_total').text(_vars.wood + _vars.stone + _vars.iron);
				
			}
		};
		
		return {
			init: function() {
				(game_data.screen == 'overview') ? prv.process() : UI.ErrorMessage('Ce script doit être exécuté depuis l\'aperçu d\'un village', 5000);
			}
		};
	};
	
})(jQuery);

var slr = new Slr.obj();
slr.init();