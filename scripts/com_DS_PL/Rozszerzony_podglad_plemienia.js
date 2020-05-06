javascript:
class UrlBuilder
{
    constructor(template)
    {
        this.template = template;
    }

    build(args)
    {
        let result = this.template;
        let keys = Object.keys(args);

        keys.forEach((e) => {
            result = result.replace("{{" + e + "}}", args[e]);
        });

        return result;
    }
}

class App
{
    constructor(config)
    {
        this.config = config;
    }

    load()
    {
        // Set local members
        this.iterator = 0;
        this.members = $('#content_value table').eq(1).find('tr').splice(1);
        this.interval = setInterval($.proxy(this.update, this), 600);

        // Add headers
        let header = $('#content_value table').eq(1).find('tr').eq(0);
        header.find('th:last').after('<th class="nowrap"><a href="#">Rekord farmy</a></th> <th class="nowrap"><a href="#">Rekord zbieractwa</a></th> <th class="nowrap"><a href="#">Odznaczenia</a></th>');
    }

    unload()
    {
        if (this.interval != undefined && this.interval != null)
        {
            clearInterval(this.interval);
        }
    }

    update()
    {
        if (this.iterator >= this.members.length)
        {
            this.unload();
            return;
        }

        this.getData(this.members[this.iterator++]);
    }

    getData(input)
    {
        let player = $(input).find('td:first').text().trim().split('(')[0].trim();
        let url = new UrlBuilder('https://{{world}}.plemiona.pl/game.php?screen=ranking&mode=in_a_day&type={{type}}&name={{name}}');

        // Ask server for data
        // Looted resources
        this.askServer(url.build({ world: game_data.world, type: 'loot_res', name: player }), function (response) {
            response = $(response);
            
            let score = response.find('#in_a_day_ranking_table tr').eq(1).find('td').eq(3).text();
            $(input).find('td:last').after('<td class="lit-item"><b>' + (score.length <= 0 ? "-" : score) + '</b></td>');

            // Scavenge
            app.askServer(url.build({ world: game_data.world, type: 'scavenge', name: player }), function (response) {
                response = $(response);
                
                let score = response.find('#in_a_day_ranking_table tr').eq(1).find('td').eq(3).text();
                $(input).find('td:last').after('<td class="lit-item"><b>' + (score.length <= 0 ? "-" : score) + '</b></td>');
    
                // Awards
                url = new UrlBuilder('https://{{world}}.plemiona.pl/game.php?screen=ranking&mode=awards&name={{name}}')
                app.askServer(url.build({ world: game_data.world, name: player }), function (response) {
                    response = $(response);
                    
                    let result = response.find('#award_ranking_table tr.lit');
                    if (result.size() > 0)
                    {
                        $(input).find('td:last').after('<td class="lit-item">' + result.eq(0).find('td:last').html().trim() + '</td>');
                        return;
                    }
    
                    $(input).find('td:last').after('<td class="lit-item"><i>Ukryto odznaczenia</i></td>');
                });
            });
        });
    }

    askServer(url, callback)
    {
        $.ajax({
            url: url,
            dataType: 'html',
            success: function (d) {
                callback(d);
            }
        });
    }
}

let app = new App({});
app.load();