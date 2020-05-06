javascript:

function getRepliesFromPage(page_number) {
    var r = new XMLHttpRequest();
    r.open('GET', base_link + page_number, true);

    function processResponse() {
        if (r.readyState == 4 && r.status == 200) {
            requestedBody = document.createElement("body");
            requestedBody.innerHTML = r.responseText;
            var p = $(requestedBody).find('.post');
            var i = page_number == 0 ? 1 : 0;
            for (; i < p.length; ++i) {
                response.push({
                    "author": $(p[i]).find('.igmline > .postheader_left')[0].innerHTML.match(/(id=([^"]+))/)[0].split('=')[1],
                    "text": $(p[i]).find('.text')[0]
                });
            }
            appendInformation("Pobrano odpowiedzi (" + (page_number + 1) + "/" + (max_page + 1) + ")<br>");
            counter++;
            if (counter == max_page) {
                appendInformation("Pobrano wszystkie wymagane dane<br>Przetwarzam listę zapotrzebowań...");
                ParseMainPost();
                appendInformation("Przetworzono listę zapotrzebowań<br>Przetwarzam odpowiedzi...");
                ParseReplies();
                appendInformation("Przetworzono odpowiedzi<br>Odtwarzanie...");
                RebuildDatabase();
            }
        };
    }
    r.onreadystatechange = processResponse;
    r.send(null);
}

function isalnum(code) {
    return (('0' <= code && code <= '9') || ('A' <= code && code <= 'z'));
}

function parseID(id_raw) {
    id = "";
    for (var i = 0; i < id_raw.length; i++)
        if (isalnum(id_raw[i]))
            id += id_raw[i];
    return id.toUpperCase();
}

function getMainPost() {
    var r = new XMLHttpRequest();
    r.open('GET', base_link + '0', true);

    function processResponse() {
        if (r.readyState == 4 && r.status == 200) {
            appendInformation("Pobieranie listy zapotrzebowań...<br>");
            requestedBody = document.createElement("body");
            requestedBody.innerHTML = r.responseText;
            main_post = $(requestedBody).find('.post > .text')[0];
            appendInformation("Pobrano listę zapotrzebowań<br>");
            appendInformation("Zaczynam pobierać listę odpowiedzi...<br>");
            max_page = $($(requestedBody).find('.forum-content > table > tbody> tr > td')[2]).find('a').length;
	    var requestedPage = 0;
            for (var i = 0; i <= max_page; ++i)
		setTimeout(function(){
			getRepliesFromPage(requestedPage++);
		},i*200);
                
        };
    }
    r.onreadystatechange = processResponse;
    r.send(null);
}

function appendInformation(info) {
    var tab = $('#prewencja_hermitowski')[0];
    var r = tab.insertRow(-1);
    var c = r.insertCell(-1);
    c.innerHTML = info;
}

function ParseMainPost() {
    var lines = main_post.innerText.split('\n\n');
    var inserted = false;
    for (var i = 0; i < lines.length; i++) {
        var coords = lines[i].match(/([0-9]{1,3}\|[0-9]{1,3})/g);
        var needs = lines[i].match(/([0-9]*\/[0-9]*)/g);
        if (coords == undefined || needs == undefined) {
            if (inserted) {
                group++;
                inserted = false;
            }
            continue;
        }
        var ID = parseID(lines[i].split(' ')[0]);
        var info = lines[i].substr(lines[i].indexOf(needs[0]) + needs[0].length + 1);
        needs = needs[0].split('/');
        if (map.has(group) == false)
            map.set(group, new Map());
        if (map.get(group).has(ID)) {
            appendInformation("\nW hashmapie znajuduje się już wpis z tym ID (" + ID + ")<br>Ignoruje ten wpis: " + lines[i].substr(0, 25));
            continue;
        }
        map.get(group).set(ID, {
            coords: coords[0],
            actual: Number(needs[0]),
            target: needs[1],
            info: info
        });
        inserted = true;
    }
}

function ParseReplies() {
    for (var i = 0; i < response.length; i++) {
        var lines = response[i].text.innerText.split('\n\n');
        var sum = 0;
        for (var j = 0; j < lines.length; j++)
            sum += parseReply(lines[j]);
        var pId = response[i].author;
        if (player.has(pId))
            player.get(pId).deff += sum;
        else
            player.set(pId, sum);
    }
}

function parseReply(raw_line) {
    if (raw_line.indexOf(escapeChar) != -1)
        raw_line = raw_line.split('&')[0];
    raw_line = raw_line.toUpperCase();
    numbers = raw_line.match(/([0-9]+)/g);
    if (!numbers || numbers.length < 1) {
        console.log("Skipping: " + raw_line + '\n');
        return 0;
    }
    var p = numbers[numbers.length - 1];
    var ids = raw_line.match(/([0-9]+)|([A-Z]+)/g);
    var zig = ids.length - 1;
    while (ids[zig] != p)
        zig--;
    var villages = 0;
    for (var i = 0; i < zig; i++)
        if (update(ids[i], p))
          villages++;

    return villages * Number(p);
}

function update(id, p) {
    for (var g = 0; g <= group; g++) {
        if (map.get(g).has(id)) {
            map.get(g).get(id).actual += Number(p);
            return true;
        }
    }
    console.log("Requested id (" + id + ") not found\n");
    return false;
}

function RebuildDatabase() {
    appendInformation("Do wklejenia na forum:\n");
    var tab = $('#prewencja_hermitowski')[0];
    var output = "";
    for (var g = 0; g <= group; g++) {
        var hashmap = map.get(g);
        var outputN = "";
        for (const v of hashmap) {
            if (v[1].info.length > 0)
                output += v[0] + ' ' + v[1].coords + ' ' + v[1].actual + '/' + v[1].target + ' [color=red]' + v[1].info + '[/color]\r\n';
            else
                outputN += v[0] + ' ' + v[1].coords + ' ' + v[1].actual + '/' + v[1].target + '\r\n';
        }
        output += outputN + '\r\n';
    }
    appendInformation("<textarea rows=4 cols=42 style='font-size: 8pt'>" + output + "</textarea>");
    appendInformation("Statystyki graczy:\n");
    output = "";
    for (const p of player) {
        if (p[1] > 0)
            output += p[0] + ' -> ' + p[1] + '\r\n';
    }
    appendInformation("<textarea rows=4 cols=42 style='font-size: 8pt'>" + output + "</textarea>");
}


if (typeof(HermitowskaPrewencja) === "undefined") {
	UI.ErrorMessage('brak definicji');
} 
else {
	var custom_thread_id = HermitowskaPrewencja.thread_id;
	var custom_forum_id = HermitowskaPrewencja.forum_id;
	var base_link = game_data.link_base_pure + 'forum&screenmode=view_thread&thread_id=' + custom_thread_id + '&forum_id=' + custom_forum_id + "&page=";
	var max_page = -1;
	var counter = -1;
	var group = 0;
	var escapeChar = '&';
	
	response = []; 
	main_post = [];
	map = new Map();
	player = new Map();
	getMainPost();
	Dialog.show("prewencja_hermitowski", "<h2 align='center'>Prewencja by Hermitowski   '</h2><table id='prewencja_hermitowski'></div>");
}