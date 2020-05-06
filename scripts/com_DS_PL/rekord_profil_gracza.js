javascript:
const app = {
    template: 'https://{{world}}.plemiona.pl/game.php?screen=ranking&mode=in_a_day&type={{type}}&name={{search}}',

    load() {
        const dataTypes = [{
            name: "Rekord farmy:",
            url: "loot_res"
        }, {
            name: "Rekord wiosek:",
            url: "loot_vil"
        }, {
            name: "Rekord zbierania:",
            url: "scavenge"
        }];

        // Iterate each type
        dataTypes.forEach((t) => {
            this.getData(this.getUrl(t.url), (e) => {
                $('#player_info tbody').append(`
                    <tr>
                        <td>${t.name}</td>
                        <td>${e.eq(3).text()}, <font color="#6e6e6e">${e.eq(4).text()}</font></td>
                    </tr>
                `);
            });
        });
    },

    getData (target, callback) {
        $.ajax({
            url: target, 
            dataType: 'html', 
            success: function(e) {
                // Get row with score
                let result = $(e).find('#in_a_day_ranking_table tr').eq(1).find('td');
                callback(result);
        }});
    },

    getUrl (target) {
        let playerName = $('#player_info').find('img[src*="player_points"]').parent().text().trim();

        // Prepare URL
        let url = this.template
            .replace("{{world}}",  game_data.world)
            .replace("{{type}}",   target)
            .replace("{{search}}", playerName);

        return url;
    }
};

app.load();