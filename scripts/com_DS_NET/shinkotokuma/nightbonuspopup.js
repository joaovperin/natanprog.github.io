javascript:

var nightbonus = "";
var test;
mapOverlay = TWMap;
mapOverlay.popup._displayForVillage = TWMap.popup.displayForVillage;
mapOverlay.popup.displayForVillage = function (village, x, y) {
    mapOverlay.popup._displayForVillage(village, x, y);
    if (village.owner != 0) {
        $.get("/game.php?village=4567&screen=info_player&id=" + village.owner, function (data) {
            test = $(data).find("#player_info tr");
            if (village.owner == game_data.player.id) {
                nightBonus = test[test.length - 2].children[1].innerText.trim();
            }
            else {
                nightBonus = test[test.length - 1].children[1].innerText.trim();
            }
        }).done(function () {
            if ($("#nightBonus").length == 0) {
                $('#info_moral_row').eq(0).after('<tr id="nightBonus"><td>Nightbonus:</td><td>' + nightBonus + '</td></tr>'); // extra rij toevoegen aan de popup
            }
        }
        )
    }
}
