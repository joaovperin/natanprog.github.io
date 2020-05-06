javascript:
var array = [];
var k = 0;
var coord = document.URL.split("#")[1].replace(";","|");
let gear = "https://raw.githubusercontent.com/oreg-kh/Unit-and-building-simulator/master/gear.png";
let token = atob("ZjRiNDIzZWE4MzgxMDJmZmNkMTdmY2M4MDdmY2Y1MTkxZjlkN2I5Yw==");
var player = game_data.player.name;
var world = game_data.world;
let script = {
    name: "Incoming counter",
    version: "v1.1"
}
let issue = {
    text: ["|Player|World|Script name|Script version|",
           "|---|---|---|---|",
           `|${player}|${world}|${script.name}|${script.version}|`,
           "",
           "Issue:"].join("\n")
};
var support = {
        spear: 0,
        sword: 0,
        axe: 0,
        spy: 0,
        archer: 0,
        light: 0,
        marcher: 0,
        heavy: 0,
        ram: 0,
        catapult: 0,
        knight: 0,
        snob: 0
};
var attack = {
        spear: 0,
        sword: 0,
        axe: 0,
        spy: 0,
        archer: 0,
        light: 0,
        marcher: 0,
        heavy: 0,
        ram: 0,
        catapult: 0,
        knight: 0,
        snob: 0
};
var cancel = {
        spear: 0,
        sword: 0,
        axe: 0,
        spy: 0,
        archer: 0,
        light: 0,
        marcher: 0,
        heavy: 0,
        ram: 0,
        catapult: 0,
        knight: 0,
        snob: 0
};
var egyseg = ["Lándzsás",
        "Kardos",
        "Bárdos",
        "Kém",
        "Íjász",
        "Könnyűlovas",
        "Lovasíjász",
        "Nehézlovas",
        "Faltörő kos",
        "Katapult",
        "Lovag",
        "Nemes"
];
var unit = ["spear",
        "sword",
        "axe",
        "spy",
        "archer",
        "light",
        "marcher",
        "heavy",
        "ram",
        "catapult",
        "knight",
        "snob"
];
var content = `
    <textarea id="scriptused_text0" cols="23" rows="15">Erősítés:&#13;&#10;&#13;&#10;</textarea>
    <textarea id="scriptused_text1" cols="23" rows="15">Támadás:&#13;&#10;&#13;&#10;</textarea>
    <textarea id="scriptused_text2" cols="23" rows="15">Visszatérő:&#13;&#10;&#13;&#10;</textarea>
`;
var durationContent = `
    <tr>
        <td>Időtartam:</td>
        <td>
            <input type="text" id="duration" value="24:00:00" placeholder="óó:pp:mp" onkeyup="run()">
        </td>
    </tr>
`;

function run() {
    if (end == true) {
        getIDs();
        end = false;
    }
}

function createDuration() {
    return $("#content_value").find("table").eq(1).find("tr").eq(1).after(durationContent);
}

function interface() {
    if ($("#mobileHeader").is(":visible")) {
        return "#mobileHeader";
    } else {
        return "h2:eq(0)";
    }
}

async function createTextarea() {
    var selector = await interface();
    return $(selector).after(content);
}

function clearThings() {
    array = [];
    $(".response").remove();
    $("textarea#scriptused_text0").remove();
    $("textarea#scriptused_text1").remove();
    $("textarea#scriptused_text2").remove();
}

async function getIDs() {
    var end = false;
    var row = $(".command-row").length;
    if (k == 0) {
        await createDuration();
        k++;
    }
    clearThings();
    for (var i = 0; i < row; i++) {
        var id = $(".icon-container").eq(i).find(".command_hover_details").eq(0).attr("data-command-id");
        var time = $(".command-row").eq(i).find("td").last().text().split(":");
        var timeToSeconds = Number(time[0]) * 3600 +  Number(time[1]) * 60 +  Number(time[2]);
        var splittedOwnTime = $("#duration").val().split(":");
        var ownTimeToSecond = Number(splittedOwnTime[0]) * 3600 +  Number(splittedOwnTime[1]) * 60 +  Number(splittedOwnTime[2]);
        if (timeToSeconds < ownTimeToSecond) {
            array.push(id);
        }
    }
    request(0);
}

function request(i) {
    if (i < array.length) {
        $.ajax({
            url: "https://" + location.host + game_data.link_base_pure + "info_command&ajax=details&id=" + array[i],
            async: true,
            success: function(data) {
                if (data != '{"no_authorization":true}') {
                    $("body").append('<div class="response">' + data + '</div>');
                    $(".response").hide();
                }
                setTimeout(function() {
                    request(i + 1);
                }, 1);
            }
        })
    } else {
        process();
    }
}

function resetObjects() {
    for (const key in support) {
        support[key] = 0;
        attack[key] = 0;
        cancel[key] = 0;
    }
    return true;
}

async function process() {
    await resetObjects();
    $(".response").each(function(k, v) {
        var user = JSON.parse($(v).html());
        // store in objects
        for (const key in user.units) {
            if (user.type == "support") {
                support[key] += Number(user.units[key].count);
            } else if (user.type == "attack") {
                attack[key] += Number(user.units[key].count);
            } else if (user.type == "back" || user.type == "other_back" || user.type == "return") {
                cancel[key] += Number(user.units[key].count);
            }
        }
    });
    fillTextarea();
}

async function fillTextarea() {
    await createTextarea();
    $.each(unit, function(k, v) {
        if (k == unit.length - 1) {
            village = "Ide: " + coord;
        } else {
            village = "";
        }
        $("#scriptused_text0").val($("#scriptused_text0").val() + egyseg[k] + ": " + support[v] + "\n" + village);
        $("#scriptused_text1").val($("#scriptused_text1").val() + egyseg[k] + ": " + attack[v] + "\n" + village);
        $("#scriptused_text2").val($("#scriptused_text2").val() + egyseg[k] + ": " + cancel[v] + "\n" + village);
    })
    end = true;
}

function sendMessage() {
    createIssue("Hibabejelentesek","oreg-kh","hiba/észrevétel",issue.text,token);
}

function addURL() {
    var issueText = $("#issue");
    var imageURL = $("#image").val();
    issueText.val(issueText.val() + addBBcodeToURL(imageURL));
    clearURL();
}

function clearURL() {
    return $("#image").val("");
}

function addBBcodeToURL(url) {
    return `![issue-image](${url})`;
}

function createIssue(repoName, repoOwner, issueTitle, issueBody, accessToken) {
    var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues";
    var text = $("#issue").val();
    $.ajax({
        url: url,
        type: "POST",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "token " + accessToken);
        },
        data: JSON.stringify({
            title: issueTitle, 
            body: issueBody +"\n" + text
        }),
        success: function(msg){
            UI.SuccessMessage("Az üzeneted sikeresen továbbítottuk!", 5000);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            UI.ErrorMessage("Valami hiba történt, nem sikerült elküldeni az adatokat!", 5000);
        }
    })
}

function spinMainIcon(durationMs, deg) {
    $({deg: 0}).animate({deg: deg}, {
        duration: durationMs,
        step: (angle) => {
            $("#gear img").css({
                transform: `rotate(${angle}deg)`
            });
        }
    });
}

 sideBarHTML = `
    <div id="gear" onclick="openSideBar()">
        <img src=${gear}>
    </div>
    <div class="sidenav">
        <div class="sidenav-container">
            <div id="closeButton">
                <a onclick="closeSideBar()">&times</a>
            </div>
            <div id="guide">
                <p>Itt tudod bejelenteni, ha hibát vagy eltérést tapasztalsz a script működésében.</p>
            </div>
            <div id="issueText">
                <textarea id="issue" placeholder="Hiba leírása..." rows="10" cols="50"></textarea>
            </div>
            <div id="sendIssue">
                <button type="button" onclick="sendMessage()">Küldés</button>
            </div>
            </br>
            <div id="imageURL">
                <textarea id="image" placeholder="Kép url" rows="1" cols="50"></textarea>
            </div>
            <div id="addURL">
                <button type="button" onclick="addURL()">Hozzáadás</button>
            </div>
        </div>
    </div>
`;

function createSideBar() {
    $("body").append(sideBarHTML);
}

function openSideBar() {
    spinMainIcon(500, -180);
    $(".sidenav").width(390);
}

function closeSideBar() {
    spinMainIcon(500, 180);
    $(".sidenav").width(0);
}

function initCss(css) {
    $(`<style>${css}</style>`).appendTo("body");
}

initCss(`
    .sidenav {
        height: 100%;
        width: 0px;
        position: fixed;
        z-index: 19;
        top: 35px;
        left: 0px;
        background-color: #111;
        overflow-x: hidden;
        transition: 0.5s;
        padding-top: 60px;
    }
    .sidenav-container {
        display: block;
        margin-left: 5px;
        margin-right: 5px;
    }
    .sidenav a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 25px;
        color: #818181;
        display: block;
        transition: 0.3s;
    }
    .sidenav a:hover {
        color: #f1f1f1;
    }
    #guide p {
        color: #818181;
    }
    #closeButton a {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0px;
        font-size: 36px;
        margin-left: 50px;
    }
    #gear img {
        z-index: 12000;
        position: absolute;
        top: 3px;
        cursor: pointer;
	    width: 45px;
	    height: 45px;
    }
    #sendIssue button, #addURL button {
        cursor: pointer;
    }
`)
createSideBar();
getIDs();
void(0);