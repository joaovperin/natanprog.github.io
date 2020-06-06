var mode = game_data.screen == "overview_villages" ? (game_data.mode || $('#overview_menu').find('td[class="selected"]').find('a').attr('href').match(/mode\=(\w*)/i)[1]) : null;
if (game_data.screen == "overview_villages" && mode == "combined") {
    var destination = game_data.village.coord;
    var worldConfig;
    $.ajax({async: false, url: '/interface.php', data: {func: 'get_config'}, dataType: 'xml', type: 'GET'}).done((response) => {worldConfig = response;}).fail((req, status, err) => { throw('ajax: ' + status); });
    worldConfig = $(worldConfig).find('config');
    var worldSpeed  = worldConfig.find('unit_speed').text() * worldConfig.find('speed').text();
    var speed = {
        spear: 18 / worldSpeed,
        sword: 22 / worldSpeed,
        archer: 18 / worldSpeed,
        axe: 18 / worldSpeed,
        spy: 9 / worldSpeed,
        light: 10 / worldSpeed,
        marcher: 11 / worldSpeed,
        heavy: 11 / worldSpeed,
        ram: 30 / worldSpeed,
        catapult: 30 / worldSpeed,
        knight: 10 / worldSpeed,
        snob: 35 / worldSpeed,
        militia: 0 / worldSpeed
    };
    destination = prompt("Choose destination", destination);
    if (destination) {
        destination = destination.split('|').map(Number);
        var maxDelay = prompt("Select a maximum duration (eg, 3:48:50), leave blank for no maximum limit", "");
        maxDelay = maxDelay ? maxDelay.split(':') : [];
        while (maxDelay.length < 3) maxDelay.unshift(0);
        maxDelay = maxDelay.map(Number);
        var maxDelayTime = (maxDelay[0] * 60 * 60) + (maxDelay[1] * 60) + maxDelay[2];
        var table = $('#combined_table');
        var tableHeaderCells = $("#combined_table").find('th');
        var coordTh = $("#combined_table").find('th:contains(Village)');
        var coordCell = coordTh.index();
        if (coordCell !== -1) {
            var rows = table.find('tr.nowrap');
            rows.each(function(index, element) {
                var cells = $(element).find('td');
                var coord = cells[1].textContent.match(/\d+\|\d+/g);
                coord = coord[coord.length-1].split('|').map(Number);
                var diffX = coord[0] - destination[0];
                var diffY = coord[1] - destination[1];
                var distance = Math.sqrt(diffX * diffX + diffY * diffY);
                var villageId = cells[1].innerHTML.match(/village\=\d+/);
                cells.each(function(index, element) {
                    var $element = $(element)
                    if($element.hasClass('unit-item')) {
                        unit = tableHeaderCells[index].innerHTML.match(/graphic\/unit\/unit_(\w+).png/);
                        if (unit) {
                            unit = unit[1];
                            time = distance * speed[unit] * 60;
                            h = ("0" + Math.floor(time / 3600)).slice(-2);
                            mm = ("0" + Math.floor(time / 60) % 60).slice(-2);
                            s = ("0" + Math.round(time) % 60).slice(-2);
                            res = h + ":" + mm + ":" + s;
                            if ($element.hasClass('hidden')) {
                                element.innerHTML = $element.hasClass('hidden') ? res : '<b>' + element.innerHTML + '</b><br>' + res;
                            } else if (maxDelayTime == 0) {
                                element.innerHTML = '<b>' + element.innerHTML + '</b><br>' + res;
                            } else if (time < maxDelayTime) {
                                element.innerHTML = '<b>' + element.innerHTML + '</b><br>' + res;
                                element.style.color = "green";
                            } else {
                                element.innerHTML = '<b>' + element.innerHTML + '</b><br>' + res;
                                element.style.color = "red";
                            }
                        }
                    }
                });
                element.insertCell(coordCell + 1).innerHTML = '<a href="' + game_data.link_base_pure.replace(/village\=\d*/i, villageId).replace(/screen\=\w*/i, 'screen=place') + '" target="_blank"><img src="graphic/buildings/place.png" alt="Rally point" width="16" height="16"/></a>';
                var distanceCell = element.insertCell(coordCell + 1);
                distanceCell.innerHTML = Math.round(distance * 100) / 100;
                distanceCell.className = "distance_cell";
            });
            $("<th>Distance</th><th>Rp</th>").insertAfter(coordTh);
            rows.sort(function (a, b) {
                return parseFloat($(a).find('.distance_cell').text()) - parseFloat($(b).find('.distance_cell').text());
            }).appendTo(table.find('tbody'));
            for (j = 1; j < table[0].rows.length; j++) {
                table[0].rows[j].className = "nowrap row_" + ((j % 2) ? "b" : "a");
            }
        }
    }
} else {
    location.assign(game_data.link_base_pure + "overview_villages&mode=combined");
}
// javascript:$.getScript("https://programmingtuts.nl/twscripts/proximity.js");void(0);