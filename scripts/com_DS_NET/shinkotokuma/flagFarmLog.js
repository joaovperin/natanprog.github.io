javascript:

if (window.location.href.indexOf('flags&mode=log') < 0) {
    //relocate
    window.location.assign(game_data.link_base_pure + "flags&mode=log&page=1");
}
var langShinko = {
    "en_DK": {
        "Produced nobleman": "Produced nobleman",
        "Resource production": "Resource production",
        "Recruitment speed": "Recruitment speed",
        "Attack strength": "Attack strength",
        "Defense strength": "Defense strength",
        "Luck": "Luck",
        "Population capacity": "Population capacity",
        "Lower coin costs": "Lower coin costs",
        "Haul capacity": "Haul capacity",
        "Reduced package costs": "Reduced package costs"
    },
    "en_US": {
        "Produced nobleman": "Produced nobleman",
        "Resource production": "Resource production",
        "Recruitment speed": "Recruitment speed",
        "Attack strength": "Attack strength",
        "Defense strength": "Defense strength",
        "Luck": "Luck",
        "Population capacity": "Population capacity",
        "Lower coin costs": "Lower coin costs",
        "Haul capacity": "Haul capacity",
        "Reduced package costs": "Reduced package costs"
    },
    "en_UK": {
        "Produced nobleman": "Produced nobleman",
        "Resource production": "Resource production",
        "Recruitment speed": "Recruitment speed",
        "Attack strength": "Attack strength",
        "Defense strength": "Defense strength",
        "Luck": "Luck",
        "Population capacity": "Population capacity",
        "Lower coin costs": "Lower coin costs",
        "Haul capacity": "Haul capacity",
        "Reduced package costs": "Reduced package costs"
    },
    "nl_NL":
    {
        "Produced nobleman": "Geproduceerde edelman",
        "Resource production": "Grondstoffenproductie",
        "Recruitment speed": "Rekruteringssnelheid",
        "Attack strength": "Aanvalssterkte",
        "Defense strength": "Verdedigingskracht",
        "Luck": "Geluk",
        "Population capacity": "Inwonersaantal",
        "Lower coin costs": "Muntkosten verlagen",
        "Haul capacity": "Buitcapaciteit",
        "Reduced package costs": "?"
    },
    "it_IT":
    {
        "Produced nobleman": "Produzione nobile",
        "Resource production": "Produzione risorse",
        "Recruitment speed": "Velocità reclutamento",
        "Attack strength": "Potenza d'attacco",
        "Defense strength": "Forza di difesa",
        "Luck": "Fortuna",
        "Population capacity": "Aumento della popolazione",
        "Lower coin costs": "Ridotti costi pacchetto",
        "Haul capacity": "Capacità bottino",
        "Reduced package costs": "?"
    },
    "pt_BR": {
        "Produced nobleman": "Nobres produzidos",
        "Resource production": "Produção de recursos",
        "Recruitment speed": "Velocidade de recrutamento",
        "Attack strength": "Força de ataque",
        "Defense strength": "Força de defesa",
        "Luck": "Sorte",
        "Population capacity": "Capacidade da população",
        "Lower coin costs": "Menores custos de moeda",
        "Haul capacity": "Capacidade de saque",
        "Reduced package costs": "?"
    },
    "pt_PT": {
        "Produced nobleman": "Nobres produzidos",
        "Resource production": "Produção de recursos",
        "Recruitment speed": "Velocidade de recrutamento",
        "Attack strength": "Força de ataque",
        "Defense strength": "Força Defesa",
        "Luck": "Sorte",
        "Population capacity": "Capacidade da população",
        "Lower coin costs": "Menores custos de moeda",
        "Haul capacity": "Capacidade de carga",
        "Reduced package costs": "?"
    }

};
var flagPerType = {
    "Resource production": 0,
    "Recruitment speed": 0,
    "Attack strength": 0,
    "Defense strength": 0,
    "Luck": 0,
    "Population capacity": 0,
    "Lower coin costs": 0,
    "Haul capacity": 0
}
URLs = [];
baseURL = "/game.php?&screen=flags&mode=log&page=";
amountOfPages = parseInt($(".paged-nav-item")[$(".paged-nav-item").length - 1].href.match(/page=(\d+)/)[1]);
$("#contentContainer").eq(0).prepend(`
<div id="progressbar" style="width: 100%;
background-color: #36393f;"><div id="progress" style="width: 0%;
height: 35px;
background-color: #4CAF50;
text-align: center;
line-height: 32px;
color: black;"></div>
</div>`);
$("#mobileHeader").eq(0).prepend(`
<div id="progressbar" style="width: 100%;
background-color: #36393f;"><div id="progress" style="width: 0%;
height: 35px;
background-color: #4CAF50;
text-align: center;
line-height: 32px;
color: black;"></div>
</div>`);
for (var i = 0; i <= amountOfPages; i++) {
    URLs.push(baseURL + i);
}
$.getAll = function (
    urls, // array of URLs
    onLoad, // called when any URL is loaded, params (index, data)
    onDone, // called when all URLs successfully loaded, no params
    onError // called when a URL load fails or if onLoad throws an exception, params (error)
) {
    var numDone = 0;
    var lastRequestTime = 0;
    var minWaitTime = 200; // ms between requests
    loadNext();
    function loadNext() {
        if (numDone == urls.length) {
            onDone();
            return;
        }

        let now = Date.now();
        let timeElapsed = now - lastRequestTime;
        if (timeElapsed < minWaitTime) {
            let timeRemaining = minWaitTime - timeElapsed;
            setTimeout(loadNext, timeRemaining);
            return;
        }
        $("#progress").css("width", `${(numDone + 1) / urls.length * 100}%`);
        lastRequestTime = now;
        $.get(urls[numDone])
            .done((data) => {
                try {
                    onLoad(numDone, data);
                    ++numDone;
                    loadNext();
                } catch (e) {
                    onError(e);
                }
            })
            .fail((xhr) => {
                onError(xhr);
            })
    }
};


$.getAll(URLs,
    (i, data) => {
        console.log("Grabbing page " + i);
        /*if ($(data).find("#recaptcha-token").outerHTML!=undefined){
            alert("Triggered captcha! Please restart the script")
            throw Error("Rip");
        }*/

        tempRows = $(data).find("table .vis> tbody > tr");


        for (var j = 0; j < tempRows.length - 2; j++) {
            // Produced nobleman
            if (tempRows[j + 2].children[4].innerText.indexOf(langShinko[game_data.locale]["Produced nobleman"]) > -1) {
                console.log("Found a grey flag!");
                switch (tempRows[j + 2].children[1].innerText) {
                    case langShinko[game_data.locale]["Resource production"]:
                        flagPerType["Resource production"] += 1;
                        break;
                    case langShinko[game_data.locale]["Recruitment speed"]:
                        flagPerType["Recruitment speed"] += 1;
                        break;
                    case langShinko[game_data.locale]["Attack strength"]:
                        flagPerType["Attack strength"] += 1;
                        break;
                    case langShinko[game_data.locale]["Defense strength"]:
                        flagPerType["Defense strength"] += 1;
                        break;
                    case langShinko[game_data.locale]["Luck"]:
                        flagPerType["Luck"] += 1;
                        break;
                    case langShinko[game_data.locale]["Population capacity"]:
                        flagPerType["Population capacity"] += 1;
                        break;
                    case langShinko[game_data.locale]["Lower coin costs"]:
                        flagPerType["Lower coin costs"] += 1;
                        break;
                    case langShinko[game_data.locale]["Haul capacity"]:
                        flagPerType["Haul capacity"] += 1;
                        break;
                    case langShinko[game_data.locale]["Reduced package costs"]:
                        flagPerType["Lower coin costs"] += 1;
                        break;
                    default:
                        throw Error("Can't recognize this flag");
                }
            }


        }

    },
    () => {
        $("#progress").remove();
        var html = "";
        for (var i = 0; i < Object.keys(flagPerType).length; i++) {
            html += `
        <tr>
            <td><img src='/graphic/flags/medium/${i + 1}_1.png' title='${langShinko[game_data.locale][Object.keys(langShinko[game_data.locale])[i + 1]]}'/></td>
            <td>${flagPerType[Object.keys(flagPerType)[i]]}</td>
        </tr>`
        }
        Dialog.show("Log:", `
        <div width="100%">
            <table class="vis" width="100%">
            ${html}
            </table>
        </div>
        `);
        console.table(flagPerType);
    },
    (error) => {
        console.error(error);
    });