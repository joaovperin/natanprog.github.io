javascript:
//reportviewer by Sophie 'Shinko to Kuma'
if (window.location.href.indexOf('&screen=report') < 0) {
    //relocate
    window.location.assign(game_data.link_base_pure + "&screen=report");
}


thisPageURLs = [];
var htmlLinks = [];
thisPageText = $.find(".float_right");
for (var i = 0; i < thisPageText.length; i++) {
    if ($(thisPageText[i]).children().length != 0) {
        htmlLinks.push(thisPageText[i]);
    }
}
console.log(htmlLinks);
for (var k = 0; k < htmlLinks.length; k++) {
    //grab link
    console.log(k);
    thisPageURLs.push(htmlLinks[k].parentElement.lastElementChild.firstElementChild.firstElementChild.href);
}
data = [];
reportHTML = [];


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

        console.log('Getting ', urls[numDone]);
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

count = 0;
var html = `<td></td><td><div id="report" class="map_container ui-widget-content" style="overflow-y: auto;width:500px;height:500px" >`;
$.getAll(thisPageURLs,
    (i, blabla) => {
        console.log($(blabla).find(".report_ReportAttack")[0]);
        if ($(blabla).find(".report_ReportAttack")[0] != undefined) {
            count++;
            reportHTML.push($(blabla).find(".report_ReportAttack")[0]);
            $("#report_list th")[0].innerHTML = `Subject: TOTAL GRABBED REPORTS: ${count} out of ${htmlLinks.length}`;

        }
    },
    () => {
        for (var j = 0; j < reportHTML.length; j++) {
            html += `
            <div style="margin:20px; margin-top:5px"><div class="quotetitle"><b>Report ${j + 1}:</b> <input type="button" value="Show" style="width:45px;font-size:10px;margin:0px;padding:0px;" onclick="if (this.parentNode.parentNode.getElementsByTagName('div')[1].getElementsByTagName('div')[0].style.display != '') { this.parentNode.parentNode.getElementsByTagName('div')[1].getElementsByTagName('div')[0].style.display = '';        this.innerText = ''; this.value = 'Hide'; } else { this.parentNode.parentNode.getElementsByTagName('div')[1].getElementsByTagName('div')[0].style.display = 'none'; this.innerText = ''; this.value = 'Show'; }" /></div><div class="quotecontent"><div style="display: none;">${reportHTML[j].innerHTML}</div></div></div>`

                ;
        }
        html += `</div></td><td></td>`
        $("#report_list").prepend(html);
        $("#report").draggable();
    },
    (error) => {
        console.error(error);
    });





