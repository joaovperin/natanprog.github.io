	var player = game_data.player.name;
    var world = game_data.world;
    let script = {
        name: "Add report to village note",
        version: "v1.0"
    }
    let issue = {
        text: ["|Player|World|Script name|Script version|",
               "|---|---|---|---|",
               `|${player}|${world}|${script.name}|${script.version}|`,
               "",
               "Issue:"].join("\n")
    };
    let report_code = $("#report_export_code").val();
    let is_buildings_scouted = $("#attack_spy_building_data").length;
    let village_id = $(".village_anchor").eq(1).attr("data-id");
    let object = {};
    let gear = "https://raw.githubusercontent.com/oreg-kh/Unit-and-building-simulator/master/gear.png";
    let token = atob("ZjRiNDIzZWE4MzgxMDJmZmNkMTdmY2M4MDdmY2Y1MTkxZjlkN2I5Yw==");

    function scouted() {
        if (is_buildings_scouted) {
            var data = JSON.parse($("#attack_spy_building_data")[0].value);
            for (var i = 0; i < data.length; i++) {
                Object.defineProperty(object, data[i].name, {value:data[i].level});
            }
            if (object.Wall) {
                wall_level = "Fal szint: " + object.Wall;
            } else {
                wall_level = "Fal szint: " + "0";
            }
        } else {
            wall_level = "Nincs kikémlelt fal!";
        }
        return wall_level;
    }

    async function createNote() {
        var wall_level = await scouted();
        let report = report_code + wall_level;
        let promise =  new Promise(function(resolve, reject) {
            TribalWars.post("api", {ajaxaction: "village_note_edit"}, {"village_id": village_id, "note": report, resolve, reject})
        })
        promise.then(
            function(result) {
                UI.SuccessMessage("A falu sikeresen fel lett címkézve!", 1500);
            },
            function(error) {    
                UI.ErrorMessage("A falu nem lett felcímkézve, próbáld újra!", 1500);
            }
        );
    }
    createNote();

    function sendMessage() {
        createIssue("Hibabejelentesek","oreg-kh","hiba/észrevétel",issue.text,token)
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