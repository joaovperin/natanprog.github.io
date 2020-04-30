// This script has been approved by Tribal Wars as of 27/01/2018, ticket t12168060.

var unitPopCounts = [
    1, // sp
    1, // sw
    1, // ax
    1, // ar
    2, // sc
    4, // lc
    5, // ma
    6, // hc
];

var href = window.location.href;
var villaId = /village=([^\&]+)/.exec(href)[1];
var playerContributions = {};

var villaIdCache = {};

var sitterId = /t=(\w+)/.exec(href);
if (sitterId) sitterId = sitterId[1];

var worldHasArchers = false;


if ((href.indexOf('screen=place') < 0 || href.indexOf('mode=units') < 0) && href.indexOf('screen=overview_villages') < 0) {
    if (confirm("This script needs to be ran on the Troops page in your Rally Point or your Combined Overviews page, do you want to go to the Rally Point now?")) {        
        var url = window.location.origin + window.location.pathname;
        url += '?village=' + villaId;
        url += '&screen=place&mode=units';
        window.location.href = url;
    }
    exit();
}

var isOverview = href.indexOf('screen=overview_villages') >= 0;

function showDevWarning($container) {
    //$container.append('<h4>Warning: Developer is currently working on this script, it may break occasionally for up to 30 minutes</h3>');
}




function RequestManager() {
    this.pendingRequests = [];
    this.stats = {
        done: 0,
        pending: 0,
        total: 0,
        numFailed: 0
    }
    this.errorHistory = {};
    this.maxPendingRequests = 2;
    this.refreshDelay = 500;

    this._urlHistory = {};

    this._interval = null;
    this._onFinishedHandler = null;
    this._hasErrors = false;
}

RequestManager.prototype.start = function () {
    if (this._interval) {
        return;
    }

    var self = this;
    var numResponding = 0;

    this._interval = setInterval(() => {
        while (numResponding < self.maxPendingRequests && self.pendingRequests.length > 0) {
            (() => {
                var request = self.pendingRequests[0];
                self.pendingRequests.splice(0, 1);

                if (request.numErrors >= 3) {
                    self.stats.done++;
                    return;
                }

                if (request.beforeRun && !request.beforeRun(request)) {
                    if (!self.pendingRequests.length && numResponding == 0) {
                        self._onFinishedHandler && self._onFinishedHandler();
                    }
                    self.stats.done++;
                    return;
                }

                console.log('Getting ', request);
                numResponding++;

                $.ajax(request)
                    .done((data, result) => {
                        self.stats.done++;
                        var numCompleted = self.stats.done + "/" + self.stats.total;
                        console.log(numCompleted);
                        numResponding--;
                        request.onDone && request.onDone(data, request);

                        if (!self.pendingRequests.length && numResponding == 0) {
                            self._onFinishedHandler && self._onFinishedHandler();
                        }
                    })
                    .fail(() => {
                        console.log('error, requeueing', arguments);
                        request.numErrors++;
                        if (request.numErrors < 3) {
                            self.pendingRequests.push(request);
                            numResponding--;
                        } else {
                            console.log('request failed too many times, stopping requests for ', request);
                            numResponding--;
                            self._hasErrors = true;
                            self.stats.numErrors++;

                            request.onDone && request.onDone(null, request);

                            if (!self.pendingRequests.length && numResponding == 0) {
                                self._onFinishedHandler && self._onFinishedHandler();
                            }
                        }
                    });
            })();
        }
    }, this.refreshDelay);
};

RequestManager.prototype.stop = function () {
    this._interval && clearInterval(this._interval);
};

RequestManager.prototype.addRequest = function (url, callback, beforeRunCallback_) {
    if (this._urlHistory[url]) {
        console.log('Duplicate URL request!');
        debugger;
    } else {
        this._urlHistory[url] = true;
    }

    this.stats.total++;
    this.pendingRequests.push({
        url: url,
        onDone: callback,
        numErrors: 0,
        beforeRun: beforeRunCallback_
    });
};

RequestManager.prototype.addManyRequests = function (urls, urlCallback, allCallback, beforeUrlCallback_) {
    var numCompleted = 0;
    function track(data, request) {
        urlCallback && urlCallback(data, request);
        if (++numCompleted == urls.length) {
            allCallback && allCallback();
        }
    }

    var self = this;
    urls.forEach((url) => {
        self.addRequest(url, track, beforeUrlCallback_);
    });
};

RequestManager.prototype.setFinishedHandler = function (callback) {
    this._onFinishedHandler = callback;
};

RequestManager.prototype.getStats = function () {
    return this.stats;
};

RequestManager.prototype.hasRequests = function () {
    return this.pendingRequests.length > 0;
};

RequestManager.prototype.hasErrors = function () {
    return this._hasErrors;
};


var requestManager = new RequestManager();

requestManager.setFinishedHandler(() => {
    requestManager.stop();
    makeDisplay();
});

$.get(`https://${window.location.host}/page/settings`, (data) => {

    var $settings = $(data);

    var archerStatus =
        $settings
            .filter((i, el) => $(el).text().indexOf("Archers") >= 0)
            .text()
            .replace("Archers", "")
            .trim();
    
    worldHasArchers = archerStatus == "Active";
   
    if (!worldHasArchers) {
        unitPopCounts.splice(3, 1);
    }

    if (isOverview) {

        var $villageRows = $('.overview_table tr.nowrap td:nth-child(2) a:not(.rename-icon)');
        var villaRallyPointUrls = [];
        $villageRows.each((i, el) => {
            var link = $(el).prop('href');
            var id = /village=([\w\d]+)/.exec(link)[1];
            villaRallyPointUrls.push(`${window.location.origin}/game.php?village=${id}&screen=place&mode=units${sitterId ? '&t='+sitterId : ''}`);
        });
    
        console.log('Rally point URLs: ', villaRallyPointUrls);

        requestManager.maxPendingRequests = 2;
        requestManager.addManyRequests(villaRallyPointUrls, (data) => data ? loadPageData($(data), makeDisplay) : null);

    } else {

        requestManager.maxPendingRequests = 5;
        loadPageData($(document), () => {
            makeDisplay(); 
        });

    }

    requestManager.start();
});    

function loadPageData($doc, onLoadDone) {

    var pendingUrls = [];
    var unitEntries = {};

    $doc.find('#units_home tr')
        .filter((i, el) => $(el).find('input').length && $(el).text().indexOf('Foreign') < 0)
        .each((i, el) => {
            var $row = $(el)
            var $link = $row.find('a');
            var villaUrl = $link.prop('href');
            var $tds = $row.find('td');

            var totalPop = 0;
            unitPopCounts.forEach((p, i) => totalPop += p * $($tds[i + 1]).text());

            var id = /id=(\w+)/.exec(villaUrl)[1];
            if (villaIdCache[id]) {
                playerContributions[villaId[id]] += totalPop;
            } else {
                pendingUrls.push(villaUrl);
                unitEntries[villaUrl] = {
                    coord: /(\d+\|\d+)/.exec($link.text())[1],
                    totalPop: totalPop,
                    i: i,
                    id: id,
                    $row: $row
                };
            }
        });

    requestManager.addManyRequests(pendingUrls, (data, request) => {

        makeDisplay();

        var match = /<tr><td>Player:<\/td><td><a href=".+">([\w\s\=\_\-\.]+)/.exec(data);
        if (!match) {
            request.numErrors = 999;
            debugger;
            return;
        }
        //console.log(match);
        var playerName = match[1];
        if (!playerContributions[playerName])
            playerContributions[playerName] = 0;
        playerContributions[playerName] += unitEntries[request.url].totalPop;
        villaIdCache[unitEntries[request.url].id] = playerName;

        //console.log(`Loaded ${numCompleted}/${pendingUrls.length}`);
    }, null, (request) => {
        var id = unitEntries[request.url].id;
        if (villaIdCache[id]) {
            console.log('id was in cache: ', id);
            playerContributions[villaIdCache[id]] += unitEntries[request.url].totalPop;
            return false;
        }
        return true;
    });

    makeDisplay();
}


function makeLoadingMessageDisplay($container) {
    $('#ss-loading').remove();

    var loadingStats = requestManager.getStats();
    var $loadingContainer = $('<div id="ss-loading">');
    $loadingContainer.append(`<p>Loaded ${loadingStats.done}/${loadingStats.total}</p>`);

    $container.append($loadingContainer);
}

function makeContributionsDisplay($container) {
    var $outputTable = $('<table class="vis" style="margin-bottom: 16px; min-height: 200px;">');
    var $header = $('<tr><th>BB Code</th><th>Player</th><th>Total Support Population</th><th></th></tr>');
    $outputTable.append($header);

    var bbCodeContent = [];
    var msgBbCodeContent = [];
    var currentCoordText = /(\d+\|\d+)/.exec($('b.nowrap').text())[1];
    console.log(currentCoordText);
    if (!isOverview) {
        bbCodeContent.push(`[b][size=12]Support Sent to [coord]${currentCoordText}[/coord][/size][/b]`);
    }    
    bbCodeContent.push(`[size=10][i]${$('#serverTime').text()} ${$('#serverDate').text()}[/i][/size]`);
    bbCodeContent.push('[table]');
    bbCodeContent.push('[**]Player[||]Total Support Population[||][/**]');

    if (!isOverview) {
        msgBbCodeContent.push(`[b]Support Sent to [coord]${currentCoordText}[/coord][/b] ([i]${$('#serverTime').text()} ${$('#serverDate').text()}[/i])`);
    }    

    var total = 0;
    for (var prop in playerContributions) {
        if (!playerContributions.hasOwnProperty(prop)) {
            continue;
        }
        total += playerContributions[prop];
    }

    bbCodeContent.push(`[*][b]All[/b][|][b]${total.toLocaleString()}[/b][|]100%`);
    msgBbCodeContent.push(`[b]Total: ${total.toLocaleString()} pop[/b]`);

    function makePercentString(num) {
        return num.toLocaleString(navigator.language, { maximumFractionDigits: 1 });
    }

    for (var prop in playerContributions) {
        if (!playerContributions.hasOwnProperty(prop)) {
            continue;
        }
        var percent = makePercentString(playerContributions[prop] / total * 100);
        bbCodeContent.push(`[*][player]${prop}[/player][|]${playerContributions[prop].toLocaleString()}[|]${percent}%`);
        msgBbCodeContent.push(`[player]${prop}[/player] - ${playerContributions[prop].toLocaleString()} pop (${percent}%)`);
    }

    bbCodeContent.push('[/table]');

    bbCodeContent = `
    <td rowspan='99999' width="250" style="position:relative">
        <div style="width:95%;height:100%;box-sizing:border-box;position:absolute;left:0;right:0;top:0;bottom:0;">
            <em>(Forums)</em>
            <textarea style="width:100%;margin:0;padding:0;min-height:50px" nowrap="nowrap" wrap="off">${bbCodeContent.join('\n')}</textarea>
            <br>
            <br>
            <em>(Private Message)</em>
            <textarea style="width:100%;margin:0;padding:0;min-height:50px" nowrap="nowrap" wrap="off">${msgBbCodeContent.join('\n')}</textarea>
        </div>
    </td>`.trim();

    var counts = [];
    for (var prop in playerContributions) {
        if (!playerContributions.hasOwnProperty(prop)) {
            continue;
        }
        $outputTable.append(`
            <tr>
                <td>${prop}</td>
                <td>${playerContributions[prop].toLocaleString()}</td>
                <td>${makePercentString(playerContributions[prop] / total * 100)}%</td>
            </tr>
        `.replace(/\n/g, '').trim());
    }

    $(`<tr>${bbCodeContent}<td>All</td><td>${total.toLocaleString()}</td><td>100%</td></tr>`).insertAfter($header);

    $container.append($outputTable);
}

function orderRallyPointEntriesByDistance($container, unitEntries) {
    var distances = [];

    unitEntries.forEach((v) => {
        var villaCoord = {
            x: parseInt(v.coord.split('|')[0]),
            y: parseInt(v.coord.split('|')[1])
        };

        var currentCoord = {
            x: parseInt(currentCoordText.split('|')[0]),
            y: parseInt(currentCoordText.split('|')[1])
        };

        var distance = Math.sqrt(
            Math.pow(currentCoord.x - villaCoord.x, 2) +
            Math.pow(currentCoord.y - villaCoord.y, 2)
        );

        distances.push(distance);
    });

    console.log(distances);

    $('.ss-dist-inj').remove();

    var orderedVillas = unitEntries.slice();
    orderedVillas.sort((a, b) => distances[a.i] - distances[b.i]);

    var $foreign = $('input[name=all]').parent().parent();

    orderedVillas.forEach((v) => v.$row.remove());

    orderedVillas.forEach((v) => {
        var $row = v.$row;
        var dist = distances[v.i];

        $row.insertBefore($foreign);
        $row.find('td:first-of-type').append($(`<span class="ss-dist-inj"> - <b>${parseFloat(dist.toFixed(1)).toLocaleString()} fields away</b></span>`));
    });
}

function makeDisplay() {
    //console.log('Making display');

    $('.ss-container').remove();
    var $container = $('<div class="ss-container">');
    showDevWarning($container);
    $container.append($('<h3>Support Info</h3>'));

    var numErrors = requestManager.getStats().numErrors;
    if (numErrors > 0) {
        $container.append(`<p>${numErrors} server requests have failed, probably bot protection`);
    }

    if (requestManager.hasRequests()) {
        makeLoadingMessageDisplay($container);
    } else {

        makeContributionsDisplay($container);
        //orderRallyPointEntriesByDistance($container);
    }

    if (isOverview) {
        $container.insertBefore('#paged_view_content');
    } else {
        $container.insertBefore($($('form')[0]).prev().prev());
    }    
}

//# sourceURL=https://tylercamp.me/tw/support-stats.js