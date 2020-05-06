javascript:
if (!$('.Hermitowski_42').length) {
    if (game_data.screen == "info_village") {
        var h = $('h3');
        var wsparcie = false;
        for (var zig = 0; zig < h.length; ++zig) {
            if (h[zig].innerText == "Obrona") {
                wsparcie = true;
                var tmp = $('.vis').length;
                t = $('.vis')[tmp - 1].rows;
                l = t.length;
                w = t[1].cells.length - 1;
                var exportText = "<textarea rows='" + w + "' cols='36'>W wiosce " + $('#content_value > table > tbody > tr > td > table > tbody > tr')[2].cells[1].innerText + " mam:\n";
                var wojska = [];
                for (var i = 0; i < w; i++) {
                    wojska.push(0);
                }
                for (var i = 1; i < l; i++) {
                    for (var j = 1; j < w; j++) {
                        wojska[j] += parseInt(t[i].cells[j].innerText);
                    }
                }
                r = $('.vis')[tmp - 1].insertRow(1);
                r.className = "Hermitowski_42";
                wojska[0] = "<b>Razem</b>";
                wojska[w] = "<a class='HERM' href = '#' onclick=\"eksportuj(exportText);\">Eksport</a>";
                var nazwa_jednostki;
                for (var i = 0; i <= w; i++) {
                    WstawKolumne(r, wojska[i]);
                    if (1 <= i && i < w && wojska[i]) {
                        nazwa_jednostki = t[0].cells[i].getElementsByTagName('a')[0].innerHTML.split('"')[3];
                        exportText += "[b]" + nazwa_jednostki + "[/b]" + ": " + wojska[i] + "\n";
                    }
                }
                exportText += "</textarea>";
            }
        }
        if (!wsparcie) UI.InfoMessage("Wydaje się, że nie masz wsparcia w tej wiosce", 1000, 'error');
    } else {
        UI.InfoMessage("Wydaje się, że nie jesteś w przeglądzie wioski", 1000, 'error');
    }
} else {
    $('.Hermitowski_42')[0].remove();
}
 
function WstawKolumne(r, wartosc) {
    c = r.insertCell(-1);
    c.style = "text-align:center";
    if (!wartosc) c.className = "hidden";
    c.innerHTML = wartosc;
}
 
function eksportuj(exportText) {
    Dialog.show("Eksport", exportText);
}