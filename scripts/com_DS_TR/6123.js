/*
Author	: Broken Castle
Website : http://burakdemirer.com
*/

if(game_data.screen!='overview_villages'){
	alert('===== Not Temizleme Scripti =====\n\nBu script sadece "Genel Bakış / Kombine veya Üretim" sayfasında çalışır...\n\nAuthor : Broken Castle\n');
	end();
}
function ClearVillageNote(event){
	TribalWars.post('info_village', { ajaxaction: 'edit_notes', id: event.data.village_id }, {note: ''}, function(result) {
		event.data.element.find('span[class*=village_note]').remove();
	});
}
function ClearVillageNoteInit(){
	$('tr.nowrap:has( span[class*=village_note] )').each( function(index) {
		var Element = $(this);
		var DataId = Element.find('.quickedit-vn').attr('data-id');
		$(this).find('span[class*=village_note]').on('click', { village_id : DataId, element : Element },  ClearVillageNote);
	});
}
ClearVillageNoteInit();