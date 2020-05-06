javascript:

var gear = "https://raw.githubusercontent.com/oreg-kh/Unit-and-building-simulator/master/gear.png";
let token = atob("ZjRiNDIzZWE4MzgxMDJmZmNkMTdmY2M4MDdmY2Y1MTkxZjlkN2I5Yw==");
var player = game_data.player.name;
var world = game_data.world;
let script = {
    name: "Calculator",
    version: "v1.0"
}
let issue = {
    text: ["|Player|World|Script name|Script version|",
           "|---|---|---|---|",
           `|${player}|${world}|${script.name}|${script.version}|`,
           "",
           "Issue:"].join("\n")
};

function initCss(css) {
    $(`<style>${css}</style>`).appendTo("body");
}

content = `
    <div class="main">
        <form name="form">
            <input class="textview" style="text-align: right" name="textview">
        </form>
        <table>
            <tr>
                <td><input class="button" type="button" value="C" onclick="clean()"></td>
                <td><input class="symbol" type="button" value="&#x232b" onclick="back()"></td>
                <td><input class="button" type="button" value="/" onclick="insert(' / ')"></td>
                <td><input class="button" type="button" value="x" onclick="insert(' x ')"></td>
            </tr>
            <tr>
                <td><input class="button" type="button" value="9" onclick="insert('9')"></td>
                <td><input class="button" type="button" value="8" onclick="insert('8')"></td>
                <td><input class="button" type="button" value="7" onclick="insert('7')"></td>
                <td><input class="button" type="button" value="-" onclick="insert(' - ')"></td>
            </tr>
            <tr>
                <td><input class="button" type="button" value="4" onclick="insert('4')"></td>
                <td><input class="button" type="button" value="5" onclick="insert('5')"></td>
                <td><input class="button" type="button" value="6" onclick="insert('6')"></td>
                <td><input class="button" type="button" value="+" onclick="insert(' + ')"></td>
            </tr>
            <tr>
                <td><input class="button" type="button" value="1" onclick="insert('1')"></td>
                <td><input class="button" type="button" value="2" onclick="insert('2')"></td>
                <td><input class="button" type="button" value="3" onclick="insert('3')"></td>
                <td rowspan=5><input class="button" style="height: 106px" type="button" value="=" onclick="equal()"></td>
            </tr>
            <tr>
                <td colspan=2><input class="button" style="width: 106px" type="button" value="0" onclick="insert('0')"></td>
                <td><input class="button" type="button" value="." onclick="insert('.')"></td>
            </tr>
        </table>
    </div>
`;

initCss(`
    .main .button {
        width: 50px;
        height: 50px;
        font-size: 25px;
        margin: 2px;
        cursor: pointer;
        background: #0081AB;
        border: none;
        color: white;
    }
    .main .symbol {
        width: 50px;
        height: 50px;
        font-size: 25px;
        margin: 2px;
        cursor: pointer;
        background: #0081AB;
        border: none;
        color: white;
        padding-bottom: 7px;
    }
    .main .button:hover {
        color: black;
        background: #ffffff;
    }
    .textview {
        width: 217px;
        margin: 5px;
        font-size: 25px;
        padding: 5px;
        border: none;
        color: #607d8b;
        padding: 0px !important;
    }
    .main {
        top: 50%;
        left: 50%;
    }
    .popup_box_content {
        padding-left: 10px !important;
    }
`);

function createMessage(type,message,time) {
    UI[type](message,time);
}

function byebye() {
    createMessage("SuccessMessage","Viszlát legközelebb!",2000);
}

function createHTML() {
    Dialog.show("calculator", content, function() {
        byebye();
    })
}

function insert(num) {
    var value = $(".textview").val();
    $(".textview").val(value + num);
}

function equal() {
    var value = $(".textview").val().replace(/ /g,"").replace(/x/g,"*");
    if (value) {
        $(".textview").val(eval(value));
    }
}

function clean() {
    $(".textview").val("");
}

function back() {
    var value = $(".textview").val();
    var newvalue = value.substring(0, value.length-1);
    $(".textview").val(newvalue)
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
createSideBar()
createHTML()
void(0);