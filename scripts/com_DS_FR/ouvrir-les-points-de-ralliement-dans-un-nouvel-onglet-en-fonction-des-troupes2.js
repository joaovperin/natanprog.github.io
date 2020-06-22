﻿var Opint=Opint||{};Opint.debug=Opint.debug||!1,Opint.settings=Opint.settings||{},function(t){Opint.obj=function(){function e(e){function n(){Opint.debug&&console.info("Opint.settings.game : ",Opint.settings.game),e()}return null!=Opint.settings.game?void n():void t.ajax({type:"GET",url:"/interface.php?func=get_config",dataType:"xml",success:function(e){var i=t(e).find("game"),a=i.find("archer").text(),r=i.find("knight").text();Opint.settings.game={archer:1==a,knight:r>0},n()},error:function(){UI.ErrorMessage("An error occurred while processing XML file.")}})}function n(){var t=[];return t.push(["spear","Lancier"]),t.push(["sword","Porteur d'épée"]),t.push(["axe","Guerrier à la hache"]),1==Opint.settings.game.archer&&t.push(["archer","Archer"]),t.push(["spy","Éclaireur"]),t.push(["light","Cavalerie légère"]),1==Opint.settings.game.archer&&t.push(["marcher","Archer monté"]),t.push(["heavy","Cavalerie Lourde"]),t.push(["ram","Bélier"]),t.push(["catapult","Catapulte"]),1==Opint.settings.game.knight&&t.push(["knight","Paladin"]),t.push(["snob","Noble"]),t}function i(e){var n=3;Opint.settings.game.archer&&(n=4);var i='<table id="opint-settings" style="margin:auto;">';return i+="<tr>",t.each(e,function(t,e){var a=image_base+"unit/unit_"+e[0]+".png";t%n==0&&0!=t&&(i+="</tr><tr>"),i+='<th width="35"><img src="'+a+'" title="'+e[1]+'" alt="" /></th>',i+='<th><input id="opint-'+e[0]+'" type="text" style="width: 40px" value="0"/></th>'}),i+="</tr>",i+="<tr>",i+='<th colspan="'+2*n+'"><input id="opint-snob-c" type="checkbox" /> <span>Pas de nobles</span></th>',i+="</tr>",i+="<tr>",i+='<th colspan="'+2*n+'"><input id="opint-nb" type="text" style="width: 40px" value="20" /> <span>Nombre de villages maximum</span></th>',i+="</tr>",i+="<tr>",i+='<th colspan="'+2*n+'"><a class="btn" href="#" onclick="opint.generate();">Générer</a></th>',i+="</tr>",i+="</table>",t(i)}function a(){o=n(),t("#opint-settings").remove();var e=i(o);t("#paged_view_content").prepend(e)}function r(){var e=[],n=[],i=t("#units_table tr"),a=new Date,r=new Date(2016,6);r>a&&t.each(o,function(n,i){var a=!0;"snob"==i[0]&&t("#opint-snob-c").is(":checked")&&(a=!1),a?e[n]=parseInt(t("#opint-"+i[0]).val()):e[n]=-1});var s=parseInt(t("#opint-nb").val());Opint.debug&&console.info("Nb Villages wanted : ",s);var p=i.filter("tr:gt(0)");Opint.debug&&console.info("Unit rows : ",p);for(var u=0;u<p.length;u++){for(var c=!0,l=t(p[u]).find("td:gt(1)"),g=0;g<e.length;g++){var h=parseInt(t(l[g]).text());if(h<e[g]||-1==e[g]&&h>0){c=!1;break}}if(c&&(Opint.debug&&console.info("Add village : ",p[u]),n.push(l[l.length-1]),n.length>=s)){Opint.debug&&console.info("Limit of "+s+" villages wanted reached, end of search");break}}t.each(n,function(e,n){setTimeout(function(){var e=t(n).find("a").attr("href");""!=e&&(Opint.debug?console.info("Open in new tab : ",e):window.open(e))},200*e)})}function s(){if("overview_villages"==game_data.screen&&"units"==game_data.mode&&-1!=document.URL.indexOf("type=own_home"))e(a);else{var t=game_data.link_base_pure;t=t.substring(0,t.lastIndexOf("&"))+"&mode=units&screen=overview_villages&type=own_home",self.location=t}}var o=null;return{init:s,generate:r}}}(jQuery);var opint=new Opint.obj;opint.init();