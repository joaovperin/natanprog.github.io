javascript:
if (window.location.href.indexOf('overview_villages&mode=buildings') < 0) {
    window.location.assign(game_data.link_base_pure + "overview_villages&mode=buildings");
}
var langShinko = {
    "en_DK": {
        "today": "today",
        "tomorrow": "tomorrow"
    },
    "it_IT": {
        "today": "oggi",
        "tomorrow": "domani"
    },
    "en_GB": {
        "today": "today",
        "tomorrow": "tomorrow"
    },
    "en_US": {
        "today": "today",
        "tomorrow": "tomorrow"
    },
    "nl_NL": {
        "today": "vandaag",
        "tomorrow": "morgen"
    },
    "pt_PT": {
        "today": "hoje",
        "tomorrow": "amanhã"
    },
}
var underConstruction = $(".order.nodrag");
var timeComplete = [];
var todayPattern = new RegExp(window.lang.aea2b0aa9ae1534226518faaefffdaad.replace('%s', '([\\d\.:]+)'));
var tomorrowPattern = new RegExp(window.lang['57d28d1b211fddbb7a499ead5bf23079'].replace('%s', '([\\d\.:]+)'));
var finalDates = [];
var day = new Date().getUTCDate();
var month = new Date().getUTCMonth() + 1;
var year = new Date().getUTCFullYear();
//var laterDatePattern = new RegExp(window.lang.0cb274c906d622fa8ce524bcfbb7552d.replace('%2', '([\\d\.:]+)'));
//get all titles
for (var i = 0; i < underConstruction.length; i++) {
    timeComplete.push($(underConstruction[i].children[2].children[0]).attr("title"));
}

for (var i = 0; i < timeComplete.length; i++) {
    if (timeComplete[i].indexOf(langShinko[game_data.locale]["today"]) > -1) {
        //complete today
        tempTime = todayPattern.exec(timeComplete[i])[1];
        finalDates.push({ "index": i, "date": Date.parse(month + "/" + day + "/" + year + " " + tempTime) });
    }
    else if (timeComplete[i].indexOf(langShinko[game_data.locale]["tomorrow"]) > -1) {
        //complete tomorrow
        var extraDay = 60 * 60 * 24 * 1000;
        tempTime = tomorrowPattern.exec(timeComplete[i])[1];
        finalDates.push({ "index": i, "date": Date.parse(month + "/" + day + "/" + year + " " + tempTime) + extraDay });
    }
    else {
        //complete on a later date
        console.log("more than 24 hours, skipping")
    }
}
//sorting dates to soonest first
finalDates.sort(function (left, right) { return left.date - right.date; })
serverTimeTemp = $("#serverDate")[0].innerText + " " + $("#serverTime")[0].innerText;
serverTime = serverTimeTemp.match(/^([0][1-9]|[12][0-9]|3[01])[\/\-]([0][1-9]|1[012])[\/\-](\d{4})( (0?[0-9]|[1][0-9]|[2][0-3])[:]([0-5][0-9])([:]([0-5][0-9]))?)?$/)
serverDate = Date.parse(serverTime[2] + "/" + serverTime[1] + "/" + serverTime[3] + serverTime[4]);
html = `<div id="constructionTime" class="vis" border=0><table id="table" width="100%"><tr>
<th colspan=2 width="100% style="text-align:center" ><center><i>Construction time left</i></center></th>
</tr><tr><th width="70%" style="text-align:center">Village</th>
<th width="30%" style="text-align:center">Time left on current building</th></tr>`;
for (var i = 0; i < finalDates.length; i++) {
    timeRemaining = timeConvert(Math.round((finalDates[i].date - serverDate) / 1000 / 60));
    html += `<tr><td><a href="${underConstruction[finalDates[i].index].parentElement.parentElement.parentElement.children[2].children[0].children[0].children[0].href}">${underConstruction[finalDates[i].index].parentElement.parentElement.parentElement.children[2].innerText}</a></td><td align="right" data-time="${Math.round((finalDates[i].date - serverDate) / 1000 / 60)}">${timeRemaining}</td></tr>`
}
html += "</table></div>"
Dialog.show("content", html);

for (var i = 2; i < $("#table tr").length; i++) {
    if ($($("#table tr")[i].children[1]).attr("data-time") <= 3) {
        $($("#table tr")[i]).children('td, th').css('background-color', 'lightgreen')
    }
    if ($($("#table tr")[i].children[1]).attr("data-time") > 3 && $($("#table tr")[i].children[1]).attr("data-time") <= 10) {
        $($("#table tr")[i]).children('td, th').css('background-color', 'yellow')
    }
}

function timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
	if (rhours != 0) {
		return rhours + "h" + rminutes + "m";
	}
	else {
		return rminutes + "m";
	}
}