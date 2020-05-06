var sitter = "";
var coords = [];
let gear = "https://raw.githubusercontent.com/oreg-kh/Unit-and-building-simulator/master/gear.png";
let token = atob("ZjRiNDIzZWE4MzgxMDJmZmNkMTdmY2M4MDdmY2Y1MTkxZjlkN2I5Yw==");
var player = game_data.player.name;
var world = game_data.world;
let script = {
    name: "Fast wall destroyer",
    version: "v1.0"
}
let issue = {
    text: ["|Player|World|Script name|Script version|",
           "|---|---|---|---|",
           `|${player}|${world}|${script.name}|${script.version}|`,
           "",
           "Issue:"].join("\n")
};

if (document.URL.match("screen=am_farm")) {

    if (game_data.player.sitter != "0") {
        sitter = "t=" + game_data.player.id + "&";
    }

    if (!sessionStorage.coords) {
        sessionStorage.setItem("coords", "");
    }

    var link = "https://" + window.location.host + "/game.php?" + sitter + "village=";
    function getPage(i, pages) {
        if (i < pages) {
            var url = link + game_data.village.id + "&order=" + "distance" + "&dir=" + "asc" + "&Farm_page=" + i + "&screen=am_farm";
            $.ajax({
                type: 'GET',
                url: url,
                dataType: "html",
                success: function(data) {
                    $('#plunder_list tr', data).slice(2).each(function() {
                        $('#plunder_list tr:last').after("<tr>" + $(this).html() + "</tr>");
                    });
                    setTimeout(function() {
                        getPage(i + 1, pages);
                    }, 1);
                }
            });
        } else {
            toPlace();
        }
    }

    async function toPlace() {
        await getCoords();
        var val = sessionStorage.getItem("coords");
        var coord = JSON.parse(val).coords.length;
        alert("Begyűjtöttem " + coord + "db koordinátát, most irány a gyülekezőhely.");
        TribalWars.redirect("place");
    }

    function totalPages() {
        return Number($(".paged-nav-item").last().text().match(/\d+/)[0]);

    }

    function clearStorage() {
        sessionStorage.clear();
    }

    function storeCoords(coords) {
        var object = {
                "coords":    coords,
        };
        sessionStorage.setItem("coords", JSON.stringify(object));
    }

    function getCoords() {
        clearStorage();
        $("#plunder_list").find("tr").slice(2).each(function(key, val) {
            fal = Number($(val).find("td").eq(6).text().trim());
            src = $(val).find("td").eq(1).find("img")[0].tooltipText;
            title = $(val).find("td").eq(1).find("img").attr("title");
            if ((fal != "?" && fal > 0) || src == "Veszteség:" || title == "Veszteség:" || src == "Losses" || title == "Losses") {
                coord = $(val).find("td").eq(3).text().trim().slice(1, 8);
                coords.push(coord);
            }
        })
        storeCoords(coords);
        return true;
    }
    getPage(1, totalPages());
}

if (document.URL.match("screen=place")) {

    var axe = $("#unit_input_axe").attr("data-all-count"),
        ram = $("#unit_input_ram").attr("data-all-count"),
        catapult = $("#unit_input_catapult").attr("data-all-count"),
        spy = $("#unit_input_spy").attr("data-all-count");

    function clearStorage() {
        sessionStorage.clear();
    }

    function storeCoords(coords) {
        var object = {
                "coords":    coords,
        };
        sessionStorage.setItem("coords", JSON.stringify(object));
    }

    if (axe > (bardos - 1) && ram > (kos - 1) && catapult > (katapult - 1) && spy > (kem - 1)) {

        function addCoords() {
            var val = sessionStorage.getItem("coords");
            var coord = JSON.parse(val).coords[0];
            var x = coord.split("|")[0];
            var y = coord.split("|")[1];

            $('input#inputx').val(x);
            $('input#inputy').val(y);
            $("input[name*='axe']").val(bardos);
            $("input[name*='ram']").val(kos);
            $("input[name*='catapult']").val(katapult);
            $("input[name*='spy']").val(kem);

            var array = JSON.parse(val).coords;
            array.shift();
            storeCoords(array);

            if (!array[0]) {
                clearStorage();
                UI.InfoMessage("Ez az utolsó koordináta, a végére értél.");
            }
        }
        addCoords();
    } else {
        UI.InfoMessage("Válts falut! Elfogytak a szükséges egységek.", 2000);
    }
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