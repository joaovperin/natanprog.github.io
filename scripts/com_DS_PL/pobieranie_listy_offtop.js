(function(){
let display = `<textarea id="textarea-units" style="width: 400px;">`;
$('#combined_table').find('tr.nowrap').each(function () {
let villageName = $(this).find('.quickedit-label').text();
let matches = villageName.match(/\d{3}\|\d{3}/g);
var coords = matches[matches.length-1];
let units = $(this).find('.unit-item');
let snob = $(this).find('td').eq(-2).text();
let villageUnits = `${units[2].innerHTML} / ${units[5].innerHTML} / ${units[6].innerHTML} / ${units[8].innerHTML} / ${units[9].innerHTML} / ${snob}`;
display = `${display}${coords} ${villageUnits}\n`
});
display = `${display}</textarea> <br> <button id="copy-button" style="width: 400px;">Skopiuj</button>`;
Dialog.show('show-units', display);
$('#copy-button').on('click', function(){
$('#textarea-units').select();
document.execCommand('copy');
});
})(); void(0);