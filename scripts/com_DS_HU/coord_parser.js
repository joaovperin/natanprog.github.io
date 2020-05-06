javascript:
var groups = $(".colorgroup-other-entry").length;
$("#village_colors").find("tr:first").find("td").eq(2).after(`<td><textarea id="script_text" placeholder="Koordináták..." rows="10" cols="15" onclick="select()"></textarea></td>`);

for (var i = 0; i < groups; i++) {
    id = $(".colorgroup-other-entry").eq(i).attr("data-id");
    $(".colorgroup-other-entry").eq(i).find("td").eq(3).after(`<td><input type="button" class="btn" value="Exportálás" onclick="get(${id})"></td>`);
}

function get(id) {
    TribalWars.post("map", {ajaxaction: "colorgroup_get_villages"}, {"group_id": id}, function(data) {
        length = data.length;
        for (var j = 0; j < length; j++) {
            coords = data[j].name.match(/\d+\|\d+/)[0];
            $("#script_text").val($("#script_text").val() + coords + "\n");
        }
    });
}

function select() {
    $("#script_text").select();
}
void(0);