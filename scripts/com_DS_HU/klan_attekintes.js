javascript:

var gear = "https://raw.githubusercontent.com/oreg-kh/Unit-and-building-simulator/master/gear.png";
let token = atob("ZjRiNDIzZWE4MzgxMDJmZmNkMTdmY2M4MDdmY2Y1MTkxZjlkN2I5Yw==");
var player = game_data.player.name;
var world = game_data.world;
let script = {
	name: "Tribe overview",
	version: "v1.0"
}
let issue = {
	text: ["|Player|World|Script name|Script version|",
		"|---|---|---|---|",
		`|${player}|${world}|${script.name}|${script.version}|`,
		"",
		"Issue:"
	].join("\n")
};

function sendMessage() {
	createIssue("Hibabejelentesek", "oreg-kh", "hiba/észrevétel", issue.text, token);
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
			body: issueBody + "\n" + text
		}),
		success: function(msg) {
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
if (game_data.mode == "members_troops") {

	let game = window.image_base;
	let imageSrc = {
		spear: game + "unit/unit_spear.png",
		sword: game + "unit/unit_sword.png",
		archer: game + "unit/unit_archer.png",
		heavy: game + "unit/unit_heavy.png"
	};

	var landzsas,
		kardos,
		bardos,
		ijasz,
		felderito,
		konnyulovas,
		lovasijasz,
		nehezlovas,
		kos,
		katapult,
		lovag,
		nemes_falunkent,
		selector = $("#ally_content .modemenu"),
		selected = $(".input-nicer").find(":selected"),
		idx = 0,
		index = 0;

	// style hozzáadása
	function initCss(css) {
		$(`<style>${css}</style>`).appendTo("body");
	}

	// gombok létrehozása
	function createButtons(buttons) {
		$(".input-nicer").after(buttons);
		moveForm();
	}

	// üzenet létrehozása
	function createMessage(message, time) {
		UI.SuccessMessage(message, time);
	}

	// a form áthelyezése a táblázat fölé
	function moveForm() {
		$("form").insertBefore(selector);
	}

	// létrehoz a táblázat alatt egy sort
	function createSumTable(sum) {
		$(selector).append(`<tbody id="myTable2">${sum}</tbody>`);
	}

	// az összegzés gombra klikkelve összeadja a tábla oszlopokat
	function sumTable() {
		resetTable();
		for (var i = 0; i < 16; i++) {
			for (j = 0; j < $("#myTable").find("tr").length - 1; j++) {
				row = Number($(".column" + i + "").eq(j).text());
				own = Number($(".sum").eq(i).text())
				$(".sum").eq(i).text(own + row);
			}
		}
	}

	// a sumTable() ismételt futtatásakor lenullázza a táblát
	function resetTable() {
		for (var i = 0; i < 16; i++) {
			$(".sum").eq(i).text(0);
		}
	}

	// táblázat egy bizonyos sorának törlése
	function deleteRow(row) {
		var index = row.parentNode.parentNode.sectionRowIndex;
		$("#myTable").find("tr").eq(index).remove();
		storeHTML();
	}

	// táblázat eltárolása
	function storeHTML() {
		var tableContent = selector.find("tbody").eq(1)[0].innerHTML;
		localStorage.setItem("tableContent", tableContent);
		createMessage("Az adatok mentése megtörtént!", 2000);
	}

	// eltárolt adatok törlése localStorage-ból, tábla sorok törlése
	function clearStorage() {
		localStorage.removeItem("tableContent");
		var select = selector.find("tbody:eq(1)").find("tr");
		for (var i = 1; i < select.length; i++) {
			select.eq(i).remove();
		}
		for (var attr in localStorage) {
			if (attr > 0) {
				localStorage.removeItem(attr);
			}
		}
		createMessage("A mentett adatok sikeresen törlésre kerültek!", 2500);
	}

	// az aktuális játékos nevét adja vissza
	function getName() {
		var name = selected.text().trim();
		return name;
	}

	// az aktuális player id-t adja vissza
	function getPlayerId() {
		var id = selected.attr("value");
		return id;
	}

	// ajax-hoz URL-t ad vissza
	function createURL() {
		var url = "https://" +
			location.host +
			game_data.link_base_pure +
			"info_player&id=" +
			getPlayerId();
		return url;
	}

	// a következő gombra klikkelve átugrik a kövi játékosra
	function next() {
		removeDisabledOptions();
		var last = $(".input-nicer").find("option").last().is(":selected");
		if (last) {
			$("#button2").prop("disabled", true);
			createMessage("Elérted az utolsó játékost!", 2000);
		} else {
			selected.next().attr("selected", "selected").trigger("change");
		}
	}

	// eltávolítja a formból azokat a játékosokat, akik nem osztották meg az adataikat
	function removeDisabledOptions() {
		var options = $(".input-nicer").find("option");
		for (var i = 0; i < options.length; i++) {
			var disabled = options.eq(i).is(":disabled");
			if (disabled) {
				options[i].remove();
			}
		}
	}

	// sereg típus és nemes szám eltárolása
	function storeToMap(id, type, nobleman) {
		var object = {
			"type": type,
			"nobleman": nobleman
		};
		localStorage.setItem(id, JSON.stringify(object));
	}

	// fal szint eltárolása
	function storeBuildingsToMap(id, buildingsLevel) {
		var val = localStorage.getItem(id);
		var myObject = JSON.parse(val);
		myObject.buildingsLevel = buildingsLevel;
		localStorage.setItem(id, JSON.stringify(myObject));
	}

	// faluban lévő, beérkező védők és beérkező támadás eltárolása
	function storeDefenseToMap(id, in_village, enroute, incoming_attack) {
		var val = localStorage.getItem(id);
		var myObject = JSON.parse(val);
		myObject.in_village = in_village;
		myObject.enroute = enroute;
		myObject.incoming_attack = incoming_attack;
		localStorage.setItem(id, JSON.stringify(myObject));
	}

	// szöveg átkódolása
	function base64(template) {
		return window.btoa(unescape(encodeURIComponent(template)));
	}

	// számok tagolása
	function numberWithCommas(x) {
		var parts = x.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		return parts.join(".");
	}

	// létrehozza a táblát, attól függően, van-e eltárolva
	function createTable(htmlContent) {
		if (!localStorage.tableContent) {
			selector.append(htmlContent);
		} else {
			selector.append(`<tbody id="myTable" oninput="storeHTML()">` + localStorage.getItem("tableContent") + `</tbody>`);
		}
	}

	// fal és védő oszlop köreinek megváltoztatja a színét
	function changeColor(selector, index, color) {
		$(selector).eq(index).css("background-color", color);
	}

	function show_hide() {
		var column = $('#myTable tr > *:nth-child(18)');
		if (!column.is(":hidden")) {
			column.hide();
		} else {
			column.show();
		}
	}

	initCss(`
        #myTable {
            width:100%;
            white-space:nowrap;
            text-align:center;
        }
        #myTable th:hover {
            cursor:pointer;
            text-decoration:underline;
        }
        #content_value .sum {
            background-color:white;
            width:100%;
            white-space:nowrap;
            text-align:center;
        }
        .hide {
            visibility:hidden;
        }
        #myTable .circle1 {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: red;
            border: 1px solid grey;
        }
        #myTable .circle2 {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: red;
            border: 1px solid grey;
        }
        button:hover {
            cursor:pointer;
        }
        #myTable tr {
            vertical-align: middle;
        }
    `);

	createButtons(`
        <button type="button" id="button1" onclick="save()">Hozzáadás</button>
        <button type="button" id="button2" onclick="next()">Következő</button>
        <button type="button" id="button3" onclick="clearStorage()">Törlés</button>
        <button type="button" id="button4" onclick="sumTable()">Összegzés</button>
        <button type="button" id="button5" onclick="tableToExcel()">Excel</button>
        <button type="button" id="button6" onclick="buildings()">Épületek</button>
        <button type="button" id="button7" onclick="defense()">Védekezés</button>
        <button type="button" id="button8" onclick="show_hide()">Elrejt-Mutat</button>
        <b><code>Created by öreg</code></b>
    `);

	createTable(`
    	<tbody id="myTable" oninput="storeHTML()">
        	<tr>
            	<th onclick="sortTable(0)">Név</th>
            	<th onclick="sortTable(1)">
              		<center>
                		<font color="black">Vegyes</font> <br><span class="icon header population"></span> T = V
              		</center>
            	</th>
           		<th onclick="sortTable(2)">
              		<center>
                		<font color="black">Üres</font> <br><span class="icon header population"></span> 0
              		</center>
                </th>
                <th onclick="sortTable(3)">
                    <center>
                        <font color="red">Teljes nuke</font> <br><span class="icon header population"></span> 19.300+
                    </center>
                </th>
                <th onclick="sortTable(4)">
                    <center>
                        <font color="red">3/4 nuke</font> <br><span class="icon header population"></span> 15.000-19.300
                    </center>
                </th>
                <th onclick="sortTable(5)">
                    <center>
                        <font color="red">1/2 nuke</font> <br><span class="icon header population"></span> 10.000-15.000
                    </center>
                </th>
                <th onclick="sortTable(6)">
                    <center>
                        <font color="red">1/4 nuke</font> <br><span class="icon header population"></span> 5.000-10.000
                    </center>
                </th>
                <th onclick="sortTable(7)">
                    <center>
                        <font color="red">>1/4 nuke</font> <br><span class="icon header population"></span> 1-5.000
                    </center>
                </th>
                <th onclick="sortTable(8)"><font color="gold">Nemes</font></th>
                <th onclick="sortTable(9)"><font color="red">T</font></th>
                <th><b> : </b></th>
                <th onclick="sortTable(11)"><font color="green">V</font></th>
                <th onclick="sortTable(12)">
                    <center>
                        <font color="green">Teljes védő</font> <br><span class="icon header population"></span> 19.300+
                    </center>
                </th>
                <th onclick="sortTable(13)">
                    <center>
                        <font color="green">3/4 védő</font> <br><span class="icon header population"></span> 15.000-19.300
                    </center>
                </th>
                <th onclick="sortTable(14)">
                    <center>
                        <font color="green">1/2 védő</font> <br><span class="icon header population"></span> 10.000-15.000
                    </center>
                </th>
                <th onclick="sortTable(15)">
                    <center>
                        <font color="green">1/4 védő</font> <br><span class="icon header population"></span> 5.000-10.000
                    </center>
                </th>
                <th onclick="sortTable(16)">
                    <center>
                        <font color="green">>1/4 védő</font> <br><span class="icon header population"></span> 1-5.000
                    </center>
                </th>
                <th>
                    <center>
                        <font color="green">Védők</font> <br> lebontásban
                    </center>
                </th>
                <th>
                    <center>Épületek</center>
                </th>
                <th>
                    <center>Védő</center>
                </th>
            </tr>
        </tbody>
    `);

	createSumTable(`
        <tr>
            <td class="hide"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td> : </td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
            <td class="sum"></td>
        </tr>
    `);

	// sorbarendezi a táblázatot a th-ra klikkelve, az adott oszlopnak megfelelően
	function sortTable(n) {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = document.getElementById("myTable");
		switching = true;
		dir = "asc";
		while (switching) {
			switching = false;
			rows = table.getElementsByTagName("tr");
			for (i = 1; i < rows.length - 1; i++) {
				shouldSwitch = false;
				if (n > 0) {
					x = Number(rows[i].getElementsByTagName("td")[n].innerHTML);
					y = Number(rows[i + 1].getElementsByTagName("td")[n].innerHTML);
					console.log(x, y);
				} else {
					x = rows[i].getElementsByTagName("td")[n].getElementsByTagName("a")[0].innerHTML.toLowerCase();
					y = rows[i + 1].getElementsByTagName("td")[n].getElementsByTagName("a")[0].innerHTML.toLowerCase();
					console.log(x, y);
				}
				if (dir == "asc") {
					if (x > y) {
						shouldSwitch = true;
						break;
					}
				} else if (dir == "desc") {
					if (x < y) {
						shouldSwitch = true;
						break;
					}
				}
			}
			if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
				switchcount++;
			} else {
				if (switchcount == 0 && dir == "asc") {
					dir = "desc";
					switching = true;
				}
			}
		}
	}

	// új sor(játékos) hozzáadása a táblához
	function createNewRow() {
		var row = `<tr style="vertical-align: middle;text-align: center">
                       <td class="player_id" name="${getPlayerId()}">
                           <a href=${createURL()} target="_blank">${getName()}</a>
                       </td>
                       <td contenteditable="true" class="column0">${vegyes}</td>
                       <td contenteditable="true" class="column1">${ures}</td>
                       <td contenteditable="true" class="column2">${teljes_nuke}</td>
                       <td contenteditable="true" class="column3">${haromnegyed_nuke}</td>
                       <td contenteditable="true" class="column4">${fel_nuke}</td>
                       <td contenteditable="true" class="column5">${negyed_nuke}</td>
                       <td contenteditable="true" class="column6">${negyedalatt_nuke}</td>
                       <td contenteditable="true" class="column7">${nemes_osszes}</td>
                       <td contenteditable="true" class="column8">${offensive}</td>
                       <td> : </td>
                       <td contenteditable="true" class="column9">${defensive}</td>
                       <td contenteditable="true" class="column10">${teljes_vedo}</td>
                       <td contenteditable="true" class="column11">${haromnegyed_vedo}</td>
                       <td contenteditable="true" class="column12">${fel_vedo}</td>
                       <td contenteditable="true" class="column13">${negyed_vedo}</td>
                       <td contenteditable="true" class="column14">${negyedalatt_vedo}</td>
                       <td contenteditable="true" style="text-align:left">
                           <dl>
                               <dt><a>
                                   <img src=${imageSrc.spear}>&emsp;&nbsp;${numberWithCommas(spear)}</img>
                               </a></dt>
                               <dt><a>
                                   <img src=${imageSrc.sword}>&emsp;&nbsp;${numberWithCommas(sword)}</img>
                               </a></dt>
                               <dt><a>
                                   <img src=${imageSrc.archer}>&emsp;&nbsp;${numberWithCommas(archer)}</img>
                               </a></dt>
                               <dt><a>
                                   <img src=${imageSrc.heavy}>&emsp;&nbsp;${numberWithCommas(heavy)}</img>
                               </a></dt>
                          </dl>
                      </td>
                      <td><span class="circle1"></span></td>
                      <td><span class="circle2"></span></td>
                      <td><input type="button" value="Törlés" onclick="deleteRow(this)"></td>
                  </tr>`;
		selector.find("tbody").eq(1).append(row);
	}

	// megnyit egy excel táblázatot és exportálja a táblázat tartalmát
	function tableToExcel() {
		if ($("#" + "myTable").length == 1 && $("#" + "myTable2").length == 1) {
			table = document.getElementById("myTable").innerHTML;
			sum = document.getElementById("myTable2").innerHTML;
		} else {
			table = document.getElementById("myTable").innerHTML;
			sum = "";
		}
		var tables = table + sum,
			worksheet = "Táblázat",
			uri = `data:application/vnd.ms-excel;base64,`,
			template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>${tables}</table></body></html>`;
		window.location.href = uri + base64(template);
	}

	// fal szintek lekérdezése a táblázatban szereplő játékosok összes falujához
	function buildings() {
		$("body").append(`<div id="tarolo" style="display: none"></div>`);
		var player_id = $(".player_id").eq(idx).attr("name");
		$("#tarolo").load("https://" + location.host + game_data.link_base_pure + "ally&mode=members_buildings&player_id=" + player_id + " .w100", function(responseTxt, statusTxt, xhr) {
			if (statusTxt == "success") {
				for (var k = 0; k < $("#tarolo").find(".w100").find("tr").length - 1; k++) {
					var buildingsLevel = [];
					var id = $("#tarolo").find(".w100").find("tr").eq(k + 1).find("a").attr("href").split("id=")[1];
					for (var j = 2; j < $("#tarolo").find(".w100").find("tr").eq(1).find("td").length; j++) {
						buildingsLevel.push(Number($("#tarolo").find(".w100").find("tr").eq(k + 1).find("td").eq(j).text().trim()));
					}
					storeBuildingsToMap(id, buildingsLevel);
				}
				if (idx < $(".player_id").length) {
					changeColor(".circle1", idx, "green");
					idx++;
					buildings();
				}
			}
			if (statusTxt == "error") {
				alert("Error: " + xhr.status + ": " + xhr.statusText);
			}
		});
	}

	// beérkező erősítés és a faluban lévő védők(tanyahely szerint) lekérdezése a táblázatban szereplő játékosok összes falujához
	function defense() {
		$("body").append(`<div id="tarolo" style="display: none"></div>`);
		var player_id = $(".player_id").eq(index).attr("name");
		$("#tarolo").load("https://" + location.host + game_data.link_base_pure + "ally&mode=members_defense&player_id=" + player_id + " .w100", function(responseTxt, statusTxt, xhr) {
			if (statusTxt == "success") {
				var select = $("#tarolo").find(".w100").find("tr").find("a").length;
				for (var i = 0; i < select; i++) {

					// van íjász
					if (game_data.units[3] == "archer") {

						firstRow = $("#tarolo").find(".w100").find("tr:odd").eq(i).find("td");
						id = firstRow.find("a").attr("href").split("id=")[1];
						spear = Number(firstRow.eq(2).text().trim().replace(".", ""));
						sword = Number(firstRow.eq(3).text().trim().replace(".", ""));
						archer = Number(firstRow.eq(5).text().trim().replace(".", ""));
						heavy = Number(firstRow.eq(9).text().trim().replace(".", ""));
						in_village = spear + sword + archer + heavy * 6;
						incoming_attack = Number(firstRow.last().text().trim().replace(".", ""));

						secondRow = $("#tarolo").find(".w100").find("tr:even").eq(i + 1).find("td");
						spear = Number(secondRow.eq(1).text().trim().replace(".", ""));
						sword = Number(secondRow.eq(2).text().trim().replace(".", ""));
						archer = Number(secondRow.eq(4).text().trim().replace(".", ""));
						heavy = Number(secondRow.eq(8).text().trim().replace(".", ""));
						enroute = spear + sword + archer + heavy * 6;
						storeDefenseToMap(id, in_village, enroute, incoming_attack);

						// nincs íjász
					} else if (game_data.units[3] != "archer") {

						firstRow = $("#tarolo").find(".w100").find("tr:odd").eq(i).find("td");
						id = firstRow.find("a").attr("href").split("id=")[1];
						spear = Number(firstRow.eq(2).text().trim().replace(".", ""));
						sword = Number(firstRow.eq(3).text().trim().replace(".", ""));
						heavy = Number(firstRow.eq(7).text().trim().replace(".", ""));
						in_village = spear + sword + heavy * 6;
						incoming_attack = Number(firstRow.last().text().trim().replace(".", ""));

						secondRow = $("#tarolo").find(".w100").find("tr:even").eq(i + 1).find("td");
						spear = Number(secondRow.eq(1).text().trim().replace(".", ""));
						sword = Number(secondRow.eq(2).text().trim().replace(".", ""));
						heavy = Number(secondRow.eq(6).text().trim().replace(".", ""));
						enroute = spear + sword + heavy * 6;

						storeDefenseToMap(id, in_village, enroute, incoming_attack);
					}
				}
				if (index < $(".player_id").length) {
					changeColor(".circle2", index, "green");
					index++;
					defense();
				}
			}
			if (statusTxt == "error") {
				alert("Error: " + xhr.status + ": " + xhr.statusText);
			}
		});
	}

	// visszaadja milyen típusú a falu
	function select() {
		if (tamado > vedo) {
			offensive += 1;
			if (tamado >= 0 && tamado < 5000) {
				negyedalatt_nuke += 1;
				type = "negyedalatt_nuke";
			}
			if (tamado >= 5000 && tamado < 10000) {
				negyed_nuke += 1;
				type = "negyed_nuke";
			}
			if (tamado >= 10000 && tamado < 15000) {
				fel_nuke += 1;
				type = "fel_nuke";
			}
			if (tamado >= 15000 && tamado < 19300) {
				haromnegyed_nuke += 1;
				type = "haromnegyed_nuke";
			}
			if (tamado >= 19300) {
				teljes_nuke += 1;
				type = "teljes_nuke";
			}
		} else if (tamado < vedo) {
			defensive += 1;
			if (vedo >= 0 && vedo < 5000) {
				negyedalatt_vedo += 1;
				type = "negyedalatt_vedo";
			}
			if (vedo >= 5000 && vedo < 10000) {
				negyed_vedo += 1;
				type = "negyed_vedo";
			}
			if (vedo >= 10000 && vedo < 15000) {
				fel_vedo += 1;
				type = "fel_vedo";
			}
			if (vedo >= 15000 && vedo < 19300) {
				haromnegyed_vedo += 1;
				type = "haromnegyed_vedo";
			}
			if (vedo >= 19300) {
				teljes_vedo += 1;
				type = "teljes_vedo";
			}
		} else if (tamado + vedo == 0) {
			ures += 1;
			type = "üres";
		} else if (tamado == vedo) {
			vegyes += 1;
			type = "vegyes";
		}
	}

	// eldönti milyen típusú a falu és miből-mennyi egység van benne
	function save() {
		ures = 0;
		vegyes = 0;
		offensive = 0;
		defensive = 0;
		teljes_nuke = 0;
		haromnegyed_nuke = 0;
		fel_nuke = 0;
		negyed_nuke = 0;
		negyedalatt_nuke = 0;
		nemes_osszes = 0;
		teljes_vedo = 0;
		haromnegyed_vedo = 0;
		fel_vedo = 0;
		negyed_vedo = 0;
		negyedalatt_vedo = 0;
		spear = 0;
		sword = 0;
		archer = 0;
		heavy = 0;
		length = $(".w100").find("tr").length;
		for (i = 1; i < length; i++) {
			var id = $(".w100").find("tr").eq(i).find("a").attr("href").split("id=")[1];
			var egysegek = $(".w100").find("tr").eq(i).find("td");

			if (game_data.units[3] == "archer") {
			    if (game_data.units.includes("knight")) {
		                tomb = [landzsas, kardos, bardos, ijasz, felderito, konnyulovas, lovasijasz, nehezlovas, kos, katapult, lovag, nemes_falunkent];
				for (k = 0; k < 12; k++) {
				    tomb[k] = Number(egysegek.eq(k + 1)[0].innerText.replace(".", ""));
				}
				nemes_osszes += tomb[tomb.length - 1];
				nemes_falunkent = tomb[tomb.length - 1];
				tamado = tomb[2] + tomb[5] * 4 + tomb[6] * 5 + tomb[7] * 6 + tomb[8] * 5 + tomb[9] * 8;
				vedo = tomb[0] + tomb[1] + tomb[3] + tomb[7] * 6 + tomb[8] * 5 + tomb[9] * 8;
				spear += tomb[0];
				sword += tomb[1];
				archer += tomb[3];
				heavy += tomb[7];
				select();
			    } else {
		                tomb = [landzsas, kardos, bardos, ijasz, felderito, konnyulovas, lovasijasz, nehezlovas, kos, katapult, nemes_falunkent];
				for (k = 0; k < 11; k++) {
				    tomb[k] = Number(egysegek.eq(k + 1)[0].innerText.replace(".", ""));
				}
				nemes_osszes += tomb[tomb.length - 1];
				nemes_falunkent = tomb[tomb.length - 1];
				tamado = tomb[2] + tomb[5] * 4 + tomb[6] * 5 + tomb[7] * 6 + tomb[8] * 5 + tomb[9] * 8;
				vedo = tomb[0] + tomb[1] + tomb[3] + tomb[7] * 6 + tomb[8] * 5 + tomb[9] * 8;
				spear += tomb[0];
				sword += tomb[1];
				archer += tomb[3];
				heavy += tomb[7];
				select();
		            }
			} else {
			    if (game_data.units.includes("knight")) {
		                tomb = [landzsas, kardos, bardos, felderito, konnyulovas, nehezlovas, kos, katapult, lovag, nemes_falunkent];
				for (k = 0; k < 10; k++) {
					tomb[k] = Number(egysegek.eq(k + 1)[0].innerText.replace(".", ""));
				}
				nemes_osszes += tomb[tomb.length - 1];
				nemes_falunkent = tomb[tomb.length - 1];
				tamado = tomb[2] + tomb[4] * 4 + tomb[5] * 6 + tomb[6] * 5 + tomb[7] * 8;
				vedo = tomb[0] + tomb[1] + tomb[5] * 6 + tomb[6] * 5 + tomb[7] * 8;
				spear += tomb[0];
				sword += tomb[1];
				archer = 0;
				heavy += tomb[5];
				select();
			    } else {
		                tomb = [landzsas, kardos, bardos, felderito, konnyulovas, nehezlovas, kos, katapult, nemes_falunkent];
				for (k = 0; k < 9; k++) {
					tomb[k] = Number(egysegek.eq(k + 1)[0].innerText.replace(".", ""));
				}
				nemes_osszes += tomb[tomb.length - 1];
				nemes_falunkent = tomb[tomb.length - 1];
				tamado = tomb[2] + tomb[4] * 4 + tomb[5] * 6 + tomb[6] * 5 + tomb[7] * 8;
				vedo = tomb[0] + tomb[1] + tomb[5] * 6 + tomb[6] * 5 + tomb[7] * 8;
				spear += tomb[0];
				sword += tomb[1];
				archer = 0;
				heavy += tomb[5];
				select();
		 	    }
			}
			storeToMap(id, type, nemes_falunkent);
		}
		// új sor hozzáadása a táblázathoz
		createNewRow(
			getPlayerId(),
			createURL(),
			getName(),
			teljes_nuke,
			haromnegyed_nuke,
			fel_nuke,
			negyed_nuke,
			negyedalatt_nuke,
			nemes_osszes,
			offensive,
			defensive,
			teljes_vedo,
			haromnegyed_vedo,
			fel_vedo,
			negyed_vedo,
			negyedalatt_vedo,
			spear,
			sword,
			archer,
			heavy
		);
		storeHTML();
	}

} else if (game_data.screen == "map") {

	// térkép mozgatás eseménykezelője
	$(window).on("change hashchange", function() {
		indicate()
	})

	// a felső és az alsó szövegdoboz stílusát állítja be
	function style(zindex, left, top, backgroundcolor, opacity, width, height, color, borderradius) {
		var styles = {
			"position": "absolute",
			"z-index": zindex,
			"left": left + "px",
			"top": top + "px",
			"font-size": "8pt",
			"font-weight": "bold",
			"background-color": backgroundcolor,
			"opacity": opacity,
			"width": width,
			"height": height,
			"margin-left": "0px",
			"margin-top": "0px",
			"display": "block",
			"color": color,
			"text-align": "center",
			"border-radius": borderradius
		}
		return styles;
	}

	// gomb, jelölőnégyzet és rádiógomb hozzáadása
	function createHTML(content) {
		$("#content_value").find("h2").after(content);
	}

	createHTML(`
        <button type="button" id="button" title="Táblázat exportálása excelbe!" onclick="tableToExcel()">Excel</button>
            <br>
            <input type="checkbox" id="collect" name="name"></input>
            <label for="collect" title="Bepipálás után a falura kattintva kigyűjti annak adatait a lenti táblázatba!\nCsak annál a falunál működik, amelynek korábban eltároltuk az adatait!">Kigyűjtés</label>
            <br>
            <input type="checkbox" id="own" name="name"></input>
            <label for="own" title="Csak a faluban kiképzett egységeket mutatja!">Falu saját egységei</label>
            <br>
            <input type="checkbox" id="defense" name="name"></input>
            <label for="defense" title="A falu saját védői + a faluban lévő erősítés!">Faluban lévő védők</label>
            <br>
            <select id="select">
                <option selected disabled hidden>Egység/Épület</option>
                <option class="disabled" disabled>Egységek</option>
                <option id="nobleman">Nemes</option>
                <option id="enroute">Beérkező védők</option>
                <option id="incoming_attack">Beérkező támadás</option>
                <option class="disabled" disabled><u>Épületek</u></option>
                <option class="building" id="main" value="main">Főhadiszállás</option>
                <option class="building" id="barracks" value="barracks">Barakk</option>
                <option class="building" id="stable" value="stable">Istálló</option>
                <option class="building" id="garage" value="garage">Műhely</option>
                <option class="building" id="church" value="church">Templom</option>
                <option class="building" id="church_f" value="church_f">Első templom</option>
                <option class="building" id="watchtower" value="watchtower">Őrtorony</option>
                <option class="building" id="snob" value="snob">Akadémia</option>
                <option class="building" id="smith" value="smith">Kovácsműhely</option>
                <option class="building" id="place" value="place">Gyülekezőhely</option>
                <option class="building" id="statue" value="statue">Szobor</option>
                <option class="building" id="market" value="market">Piac</option>
                <option class="building" id="wood" value="wood">Fatelep</option>
                <option class="building" id="stone" value="stone">Agyagbánya</option>
                <option class="building" id="iron" value="iron">Vasbánya</option>
                <option class="building" id="farm" value="farm">Tanya</option>
                <option class="building" id="storage" value="storage">Raktár</option>
                <option class="building" id="hide" value="hide">Rejtekhely</option>
                <option class="building" id="wall" value="wall">Fal</option>
            </select>
    `);

	// letiltja a legördülő listában a adott szerveren nem létező épületeket
	let disableBuildings = [];
	let buildings = ["main", "barracks", "stable", "garage", "church", "church_f", "watchtower", "snob", "smith", "place", "statue", "market", "wood", "stone", "iron", "farm", "storage", "hide", "wall"];
	$.ajax({
		url: `https://${document.domain}/interface.php?func=get_building_info`,
		type: 'GET',
		async: true,
		success: function(xml) {
			for (var i = 0; i < buildings.length; i++) {
				if ($(xml).find(`config > ${buildings[i]}`).length == 0) {
					document.getElementById(buildings[i]).disabled = true;
				}
			}
		}
	});

	// a rádiógombok és a jelölőnégyzeteket szabályozza
	$("#own, #defense, #collect").on("change", function(event) {
		if ($("#own").is(":checked")) {
			document.getElementById("defense").disabled = true;
		}
		if ($("#defense").is(":checked")) {
			document.getElementById("own").disabled = true;
		}
		if (!$("#own").is(":checked") && !$("#defense").is(":checked")) {
			document.getElementById("own").disabled = false;
			document.getElementById("defense").disabled = false;
		}
		if ($("#collect").is(":checked")) {
			bind();
		}
		if (!$("#collect").is(":checked")) {
			unBind();
		}
	})

	// zöld vagy piros körök létrehozása
	function loop(length, left, top, color) {
		for (var i = 0; i < length; i++) {
			if (i > 0) {
				left += 8.4;
			}
			$(`#map_village_${key}`).after($(`<div id=öreg_map_circle${i}_${key}></div>`));
			$(`#öreg_map_circle${i}_${key}`).css(style("6", left, top + 1.5, color, "", "7px", "7px", "black", "7px"));
		}
	}

	// térkép mozgatásakor eltávolítja a korábbi szövegdobozokat
	function reset(param) {
		$(param).remove();
	}

	// felső és alsó szövegdoboz létrehozása és a szöveg beírása
	function indicate() {
		reset("div [id*=öreg_map_]");
		var hossz = $("div [id*=map_village_]");
		for (var i = 0; i < hossz.length; i++) {
			key = hossz[i].id.split("_")[2];
			console.log(key);
			if (localStorage.getItem(key)) {
				var val = localStorage.getItem(key);
				var top = parseInt($(`#map_village_${key}`).css('top'), 10) + 10;
				var left = parseInt($(`#map_village_${key}`).css('left'), 10) + 10;
				if ($("#own").is(":checked")) {
					var sereg_tipus = JSON.parse(val).type;
					console.log(sereg_tipus)
					// create upper box
					$(`#map_village_${key}`).after($(`<div id=öreg_map_upperbox_${key}></div>`));
					$(`#öreg_map_upperbox_${key}`).css(style("5", left, top, "#ffffff", "", "40.5px", "10px", "black", "8px"));
					// create circle
					if (sereg_tipus == "üres") {} else if (sereg_tipus == "vegyes") {
						loop(5, left, top, "#0000ff")
					} else if (sereg_tipus == "teljes_nuke") {
						loop(5, left, top, "#ff0000")
					} else if (sereg_tipus == "haromnegyed_nuke") {
						loop(4, left, top, "#ff0000")
					} else if (sereg_tipus == "fel_nuke") {
						loop(3, left, top, "#ff0000")
					} else if (sereg_tipus == "negyed_nuke") {
						loop(2, left, top, "#ff0000")
					} else if (sereg_tipus == "negyedalatt_nuke") {
						loop(1, left, top, "#ff0000")
					} else if (sereg_tipus == "teljes_vedo") {
						loop(5, left, top, "#008000")
					} else if (sereg_tipus == "haromnegyed_vedo") {
						loop(4, left, top, "#008000")
					} else if (sereg_tipus == "fel_vedo") {
						loop(3, left, top, "#008000")
					} else if (sereg_tipus == "negyed_vedo") {
						loop(2, left, top, "#008000")
					} else if (sereg_tipus == "negyedalatt_vedo") {
						loop(1, left, top, "#008000")
					}
				}
				if ($("#defense").is(":checked")) {
					var suppInVillage = Number(JSON.parse(val).in_village);
					$(`#map_village_${key}`).after($(`<div id=öreg_map_defense_${key}>${suppInVillage}</div>`));
					$(`#öreg_map_defense_${key}`).css(style("5", left, top - 2, "#ffffff", "", "40.5px", "12px", "black", "8px"));
				}
				// create lower box
				if ($("#select :checked")) {
					var selected = $("#select :checked")[0].id;
					if ($("#nobleman").is(":checked")) {
						var nemesdarab = Number(JSON.parse(val)[selected]);
						$(`#map_village_${key}`).after($(`<div id=öreg_map_nobleman_${key}>${nemesdarab}</div>`));
						$(`#öreg_map_nobleman_${key}`).css(style("5", left + 8.4, top + 12, "#ffffff", "", "24px", "12px", "black", "8px"));
					}
					$(".building").not(":disabled").each(function(k, v) {
						if ($(v).is(":checked")) {
							var building = Number(JSON.parse(val).buildingsLevel[k]);
							$(`#map_village_${key}`).after($(`<div id=öreg_map_wall_${key}>${building}</div>`));
							$(`#öreg_map_wall_${key}`).css(style("5", left + 8.4, top + 12, "#ffffff", "", "24px", "12px", "black", "8px"));
						}
					})
					if ($("#enroute").is(":checked")) {
						var support = Number(JSON.parse(val)[selected]);
						$(`#map_village_${key}`).after($(`<div id=öreg_map_enroute_${key}>${support}</div>`));
						$(`#öreg_map_enroute_${key}`).css(style("5", left, top + 12, "#ffffff", "", "40.5px", "12px", "black", "8px"));
					}
					if ($("#incoming_attack").is(":checked")) {
						var attack = Number(JSON.parse(val)[selected]);
						$(`#map_village_${key}`).after($(`<div id=öreg_map_incoming_attack_${key}>${attack}</div>`));
						if (attack > 0) {
							color = "#ff0000";
						} else {
							color = "#ffffff";
						}
						$(`#öreg_map_incoming_attack_${key}`).css(style("5", left, top + 12, color, "", "40.5px", "12px", "black", "8px"));
					}
				}
			}
		}
	}
	indicate()

	// táblázat egy bizonyos sorának törlése
	function deleteRow(row) {
		var index = row.parentNode.parentNode.sectionRowIndex;
		$("#myTable").find("tr").eq(index).remove();
	}

	// térkép alatti táblázat létrehozása
	function createTable(content) {
		$("#map_big").append(content);
	}

	// style hozzáadása
	function initCss(css) {
		$(`<style>${css}</style>`).insertBefore("#myTable");
	}

	// számok tagolása
	function numberWithCommas(x) {
		var parts = x.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		return parts.join(".");
	}

	// saját eseménykezelő használata
	function bind() {
		TWMap.map._handleClick = handleClick;
	}

	// a játék eseménykezelőjének használata
	function unBind() {
		TWMap.map._handleClick = originalHandleClick;
	}

	createTable(`
        <tbody id="myTable" style="text-align:center">
            <tr>
                <th onclick="sortTable(0)">Név</th>
                <th onclick="sortTable(1)">Falu</th>
                <th onclick="sortTable(2)">Bentlévő</th>
                <th onclick="sortTable(3)">Beérkező</th>
                <th onclick="sortTable(4)">Összes</th>
                <th>Jegyzet</th>
            </tr>
        </tbody>
    `);

	initCss(`
        #myTable th:hover {
            cursor:pointer;
            text-decoration:underline;
        }
        button:hover {
            cursor:pointer;
        }
        #myTable .white {
            background-color:white;
            color:black;
        }
        .disabled {
	        font-weight:bold;
            color:red;
        }
    `);

	// eredeti eseménykezelő
	function originalHandleClick(e) {
		if (this.mover && this.mover.moveDirty) {
			return false;
		}
		var pos = this.coordByEvent(e);
		return this.handler.onClick(pos[0], pos[1], e)
	}

	// saját eseménykezelőm
	function handleClick(e) {
		var pos = this.coordByEvent(e);
		var x = pos[0];
		var y = pos[1];
		var a = x * 1000 + y;
		var village = TWMap.villages[a];
		if (typeof village != 'undefined' && localStorage[village.id]) {
			url = "https://" + location.host + game_data.link_base_pure + "info_player&id=" + village.owner;
			$('img#map_village_' + village.id).fadeTo(0, 0.5);

			val = localStorage[village.id];
			console.log(val);

			names = TWMap.players[village.owner].name;
			console.log(names);

			coords = pos.join("|");
			console.log(coords);

			bentlevo = Number(JSON.parse(val).in_village);
			console.log(bentlevo);

			beerkezo = Number(JSON.parse(val).enroute);
			console.log(beerkezo);

			osszes = bentlevo + beerkezo;
			console.log(osszes);

			rows = `<tr>
                        <td>
                            <a href=${url} target="_blank">${names}</a>
                        </td>
                        <td contenteditable="true">${coords}</td>
                        <td contenteditable="true">${numberWithCommas(bentlevo)}</td>
                        <td contenteditable="true">${numberWithCommas(beerkezo)}</td>
                        <td contenteditable="true">${numberWithCommas(osszes)}</td>
                        <td class="white" contenteditable="true"></td>
                        <td><input type="button" value="Törlés" onclick="deleteRow(this)"></td>
                    </tr>`;
			$("#myTable").append(rows);
		}
		return false;
	}

	// sorbarendezi a táblázatot a th-ra klikkelve, az adott oszlopnak megfelelően
	function sortTable(n) {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = document.getElementById("myTable");
		switching = true;
		dir = "asc";
		while (switching) {
			switching = false;
			rows = table.getElementsByTagName("tr");
			for (i = 1; i < rows.length - 1; i++) {
				shouldSwitch = false;
				if (n > 0) {
					x = Number(rows[i].getElementsByTagName("td")[n].innerHTML);
					y = Number(rows[i + 1].getElementsByTagName("td")[n].innerHTML);
					console.log(x, y);
				} else {
					x = rows[i].getElementsByTagName("td")[n].getElementsByTagName("a")[0].innerHTML.toLowerCase();
					y = rows[i + 1].getElementsByTagName("td")[n].getElementsByTagName("a")[0].innerHTML.toLowerCase();
					console.log(x, y);
				}
				if (dir == "asc") {
					if (x > y) {
						shouldSwitch = true;
						break;
					}
				} else if (dir == "desc") {
					if (x < y) {
						shouldSwitch = true;
						break;
					}
				}
			}
			if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
				switchcount++;
			} else {
				if (switchcount == 0 && dir == "asc") {
					dir = "desc";
					switching = true;
				}
			}
		}
	}

	// szöveg kódolása
	function base64(template) {
		return window.btoa(unescape(encodeURIComponent(template)));
	}

	// megnyit egy excel táblázatot és exportálja a táblázat tartalmát
	function tableToExcel() {
		table = document.getElementById("myTable").innerHTML;
		var tables = table,
			worksheet = "Táblázat",
			uri = `data:application/vnd.ms-excel;base64,`,
			template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>${tables}</table></body></html>`;
		window.location.href = uri + base64(template);
	}
}
void(0);