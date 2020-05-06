/* 
	Yazar(Author)     : Konsantre
	Forum             : http://forum.klanlar.org
	Iletisim(Contact) : konsantre.op@gmail.com

	TribalWars Turkey - JavaScript Moderator
*/

if(window.location.href.indexOf("view=")>-1 && game_data.screen == 'report'){
	var r1 = window.location.search;var r2 = r1.match(/view=\d+/g);var r3 = r2.join('');var Rid = r3.match(/\d+/);
	if (Rid!=$.cookie('KNSaskerkacirma')){$.cookie("KNSaskerkacirma",Rid,{expires:1});UI.InfoMessage('Rapor Scriptte Kaydedildi',4000,'success');}
	else if(Rid==$.cookie('KNSaskerkacirma')){$.removeCookie('KNSaskerkacirma');UI.InfoMessage('Rapor Scriptten Silindi',4000,'error');}}
else{
	if ($.cookie('KNSaskerkacirma')!=null){var Dunya = game_data.world;var Rid = $.cookie("KNSaskerkacirma");
	window.location = ('https://'+Dunya+'.klanlar.org/game.php?screen=place&try=confirm&type=all&report_id='+Rid);end();}
	else if ($.cookie('KNSaskerkacirma')==null){alert('KNS Asker Kaçırıcı kullanımı;\n\nBu uyarıyı alıyorsanız eğer rapor kayıdı yapmamışsınız demektir.\nBu script askerlerinizi kaçırmak için daha önce saldırdığınız bir köyün raporuna ihtiyaç duyar.Tercihen size uzak bir köy olursa daha yararlı olur.Saldırdığınız raporu açıp scripti çalıştırın.Eğer yeşil bir uyarı ekranı çıkar ve raporunuzun kaydedildiğini bildirirse işlem tamamdır.Artık rapor görüntüleme ekranı hariç herhangi bir ekranda scripti çalıştırırsanız, kaydettiğiniz raporunun ait olduğu köye bütün ordunuzu gönderecek bir emir hazırlayacaktır.\n\n*Başka bir rapor üstünde tekrar çalıştırırsanız onu kaydeder\n*Aynı rapor üstünde tekrar çalıştırırsanız onu kayıttan siler.\n*Çalışması için kaydettiğiniz raporu silmemeniz gerekir.\n*Raporları 1 günlük olarak tarayıcı çerezlerinde saklar.\n*Seçtiğiniz raporun saldırı raporu olduğundan emin olun!\n\nİyi oyunlar')}}