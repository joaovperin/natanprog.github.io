// This script has been approved by Tribal Wars as of 27/01/2018, ticket t12168060.

console.log('ez-snipe-enhancer');

if (window.ezseInterval) {
    clearInterval(window.ezseInterval);
    window.ezseInterval = null;
}

if (window.ezseColorInterval) {
    clearInterval(window.ezseColorInterval);
    window.ezseColorInterval = null;
}

var $notebookBbCodes = $('textarea[id^=message_');
console.log('notebooks: ', $notebookBbCodes);

if (!$notebookBbCodes.length) {
    alert('No notebook pages were found!');
    exit();
}

$('#ezse-notice').remove();

var $ezseContainer = $(`
<div id="ezse-notice">
    <h3>
        Snipe enhancer loaded
    </h3>
    <label for="ezse-use-local">Show local time?</label>
    <input type="checkbox" id="ezse-use-local">
    <hr style="margin: 25px 0;">
</div>
`.trim()).insertBefore('#content_value h2:first-of-type');

// Determine server-time offset for local time conversion
var serverTimeOffset = (() => {
    var serverTime = getServerTime();
    var utcTime = new Date();

    // ms difference between server time and UTC time
    var timeOffset = serverTime.valueOf() - utcTime.valueOf();


    let MS_PER_HR = 1000 * 60 * 60;
    var hours = Math.round(timeOffset / MS_PER_HR);

    var result = {
        hourOffset: hours
    }

    console.log('Got server/UTC offset: ', result);
    return result;
})();

// Highlight times
$('.bbcodetable td')
    .filter((i, el) => el.innerText.match(/:\d+\d+\d+/))
    .each((i, el) => el.innerHTML = el.innerHTML.replace(/(:\d+\d+\d+)/g, (s, m) => `<strong>${m}</strong>`));

$ezseContainer.find('#ezse-use-local').change((ev) => {
    var $notebook = getCurrentNotebook();
    if ($(ev.target).is(':checked')) {
        updateLocalTimeLaunches($notebook.find('table.bbcodetable'), true);
    } else {
        updateLocalTimeLaunches($notebook.find('table.bbcodetable'), false);
    }
});

updateNotebooks();

function getServerTime() {
    var serverTime = $('#serverTime').text();
    var serverDate = $('#serverDate').text();

    var serverTimeParts = /(\d+):(\d+):(\d+)/.exec(serverTime);
    var serverDateParts = /(\d+)\/(\d+)\/(\d+)/.exec(serverDate);

    var result = new Date();
    result.setUTCHours(parseInt(serverTimeParts[1]));
    result.setUTCMinutes(parseInt(serverTimeParts[2]));
    result.setUTCSeconds(parseInt(serverTimeParts[3]));

    result.setUTCDate(parseInt(serverDateParts[1]));
    result.setUTCMonth(parseInt(serverDateParts[2]) - 1);
    result.setUTCFullYear(parseInt(serverDateParts[3]));

    return result;
}

function getCurrentNotebook() {
    var $result;
    $notebookBbCodes.each((i, el) => {
        if ($result != null) {
            return;
        }
        var $el = $(el);
        var $container = $el.closest('div[id^=memo]');
        if ($container.css('display') == 'none') {
            return;
        } else {
            $result = $container;
        }
    });
    return $result;
}

// Requires date to be in EZ-Snipe format hh:mm:ss:mmmm DD/MM/YYYY
function parseDateText(dateText) {
    var newMatcher = /(\d+):(\d+):(\d+):(\d+)\s+(\d+)\/(\d+)\/(\d+)/;
    var oldMatcher = /(\d+):(\d+):(\d+)\s+(\d+)\/(\d+)\/(\d+)/;
    var isNew = true;
    var match = newMatcher.exec(dateText);
    if (!match) {
        isNew = false;
        match = oldMatcher.exec(dateText);
    }
    if (!match) {
        return null;
    }

    var i = 1;

    var result = new Date();
    result.setUTCHours(parseInt(match[i++]));
    result.setUTCMinutes(parseInt(match[i++]));
    result.setUTCSeconds(parseInt(match[i++]));

    if (isNew) {
        result.setUTCMilliseconds(parseInt(match[i++]));
    }    

    result.setUTCDate(parseInt(match[i++]));
    result.setUTCMonth(parseInt(match[i++]) - 1);
    result.setUTCFullYear(parseInt(match[i++]));

    return result;
}

function parseLocalDateText(dateText) {
    var matcher = /(\d+):(\d+):(\d+):(\d+)\s+(AM|PM)\,\s+(\d+)\/(\d+)\/(\d+)/;
    var match = matcher.exec(dateText);
    if (!match) {
        return null;
    }

    var result = new Date();
    result.setHours(parseInt(match[1]));
    result.setMinutes(parseInt(match[2]));
    result.setSeconds(parseInt(match[3]));
    result.setMilliseconds(parseInt(match[4]));

    if (match[5] == 'AM') {
        result.setHours(match[1] % 12)
    } else if (match[5] == 'PM') {
        result.setHours((match[1] % 12) + 12);
    } else {
        debugger;
        return new Date();
    }

    result.setHours(result.getHours() + serverTimeOffset.hourOffset);

    result.setDate(parseInt(match[6]));
    result.setMonth(parseInt(match[7]) - 1);
    result.setFullYear(parseInt(match[8]));

    return result;
}

function formatDateTime(dateTime) {
    var formatNumber = (num) => num.toString().length == 1 ? "0" + num.toString() : num.toString();
    var utcDay = dateTime.getUTCDate();
    var utcMonth = dateTime.getUTCMonth() + 1;
    var utcYear = dateTime.getUTCFullYear();

    var utcHour = dateTime.getUTCHours();
    var utcMinute = dateTime.getUTCMinutes();
    var utcSecond = dateTime.getUTCSeconds();

    var utcMillisecond = dateTime.getUTCMilliseconds().toString();
    while (utcMillisecond.length < 3) {
        utcMillisecond = '0' + utcMillisecond;
    }

    return `${formatNumber(utcHour)}:${formatNumber(utcMinute)}:${formatNumber(utcSecond)}:${formatNumber(utcMillisecond)} ${formatNumber(utcDay)}/${formatNumber(utcMonth)}/${formatNumber(utcYear)}`;
}

function formatLocalDateTime(dateTime) {
    var formatNumber = (num) => num.toString().length == 1 ? "0" + num.toString() : num.toString();
    var day = dateTime.getDate();
    var month = dateTime.getMonth() + 1;
    var year = dateTime.getFullYear();

    var hour = dateTime.getHours() - serverTimeOffset.hourOffset;
    var minute = dateTime.getMinutes();
    var second = dateTime.getSeconds();

    var millisecond = dateTime.getMilliseconds().toString();
    while (millisecond.length < 3) {
        millisecond = '0' + millisecond;
    }

    var indicator = hour >= 12 ? 'PM' : 'AM';
    hour = (hour + 11) % 12 + 1;

    return `${formatNumber(hour)}:${formatNumber(minute)}:${formatNumber(second)}:${millisecond} ${indicator}, ${formatNumber(day)}/${formatNumber(month)}/${formatNumber(year)}`;
}

function splitTableRow(bbcodeLine) {
    if (bbcodeLine.indexOf('[*]') >= 0) {
        // Table row
        return bbcodeLine.substr(3).split('[|]');
    } else {
        // Table headers
        return bbcodeLine.substring(4, bbcodeLine.length - 5).split('[||]');
    }
}

function makeUpdatedBbCode(existingBbCode) {
    var result = [];
    var lines = existingBbCode.split('\n');
    var inTable = false;
    var launchTimeIndex = -1;
    var currentTime = getServerTime();
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].indexOf('[table]') >= 0) {
            result.push(lines[i]);
            inTable = true;
            launchTimeIndex = -1;
            continue;
        }
        if (lines[i].indexOf('[/table]') >= 0) {
            result.push(lines[i]);
            inTable = false;
            continue;
        }
        if (!inTable) {
            result.push(lines[i]);
            continue;
        }

        var tableRow = splitTableRow(lines[i]);
        //console.log('Row ' + i + ': ', tableRow);

        if (inTable && launchTimeIndex < 0) {
            launchTimeIndex = findLaunchTimeIndex(tableRow);
            if (launchTimeIndex < 0) {
                debugger;
                console.warn("Couldn't find table column containing launch times!");
            }
            result.push(lines[i]);
        } else {
            if (launchTimeIndex < 0) {
                result.push(lines[i]);
            } else {
                var launchTime = parseDateText(tableRow[launchTimeIndex]);
                if (!launchTime) {
                    result.push(lines[i]);
                } else {
                    if (launchTime.valueOf() - currentTime.valueOf() > 0) {
                        result.push(lines[i]);
                    } else {
                        console.log('Removing: ' + lines[i]);
                    }
                }    
            }
        }
    }

    //console.log('makeUpdatedBbCode result: ', result);
    return result.join('\n');
}

function updateLocalTimeLaunches($table, useLocal) {

    var $snipeRows = $table.find('tr');
    var launchTimeIndex = findLaunchTimeIndex($snipeRows.find('th'));

    var $launchTimeEntries = [];

    $snipeRows.each((i, el) => {
        var $el = $(el);
        var $tds = $el.find('td');
        if ($tds.length == 0) {
            return;
        }
 
        var $launchTd = $($tds[launchTimeIndex]);
        $launchTimeEntries.push($launchTd);
    })

    $launchTimeEntries.forEach((el) => {
        var $td = $(el);
        var launchText = $td.text();

        if (useLocal) {
            // Convert from UTC to local time
            var launchTime = parseDateText(launchText);
            var localText = formatLocalDateTime(launchTime);
            $td.text(localText);
        } else {
            // Convert back to UTC from local time
            var launchTime = parseLocalDateText(launchText);
            var utcText = formatDateTime(launchTime);
            $td.text(utcText);
        }
    });
}

function findLaunchTimeIndex(entries) {
    var index = -1;
    for (var i = 0; i < entries.length; i++) {
        var text = entries[i];
        if (!(typeof text == 'string')) {
            // Assume it's a jquery object
            text = $(text).text();
        }

        text = text.toLowerCase();

        if (text.indexOf('launch') >= 0 || text.indexOf('send') >= 0) {
            index = i;
            break;
        }
    }
    return index;
}

function updateTimingsTableColor($table) {
    var launchTimeIndex = -1;
    var inWarningMinuteColor = { r: 255, g: 0, b: 0 };
    var defaultColor = { r: 0, g: 0, b: 0 };
    var currentTime = getServerTime();
    var msPerMinute = 60 * 1000;
    var warningWindowMinutes = 5;
    var usesLocalTime = $('#ezse-use-local').is(':checked');
    window.colorAttenuation = window.colorAttenuation || 0.8;
    $table.find('> tbody > tr')
        .each((i, el) => {
            var $el = $(el);

            var $tds = $el.find('td');
            var $ths = $el.find('th');

            if ($ths.length) {
                launchTimeIndex = findLaunchTimeIndex($ths);
            } else if ($tds.length && launchTimeIndex >= 0) {
                var $launchTime = $($tds[launchTimeIndex]);
                if (usesLocalTime) {
                    var launchTime = parseLocalDateText($launchTime.text());
                } else {
                    var launchTime = parseDateText($launchTime.text());
                }    
                var timeRemaining = launchTime.valueOf() - currentTime.valueOf();

                if (timeRemaining < 0) {
                    $el.remove();
                    console.log('Removed HTML row');
                } else {
                    var normTimeRemaining = timeRemaining / (msPerMinute * warningWindowMinutes);
                    normTimeRemaining = Math.max(0, normTimeRemaining);
                    normTimeRemaining = Math.min(1, normTimeRemaining);
                    normTimeRemaining = Math.floor(normTimeRemaining * 4) / 3;
                    normTimeRemaining = Math.pow(normTimeRemaining, colorAttenuation);
                    var interpolatedColor = {
                        r: (1 - normTimeRemaining) * inWarningMinuteColor.r + normTimeRemaining * defaultColor.r,
                        g: (1 - normTimeRemaining) * inWarningMinuteColor.g + normTimeRemaining * defaultColor.g,
                        b: (1 - normTimeRemaining) * inWarningMinuteColor.b + normTimeRemaining * defaultColor.b
                    };

                    interpolatedColor.r = Math.round(interpolatedColor.r);
                    interpolatedColor.g = Math.round(interpolatedColor.g);
                    interpolatedColor.b = Math.round(interpolatedColor.b);

                    $launchTime.css('color', `rgb(${interpolatedColor.r},${interpolatedColor.g},${interpolatedColor.b})`);
                }
            }
        });
}

window.ezseInterval = setInterval(updateNotebooks, 2000);
window.ezseColorInterval = setInterval(() => {
    updateTimingsTableColor(getCurrentNotebook().find('.bbcodetable'));
}, 500);

function updateNotebooks() {

    // This feature is illegal according to TW support and is currently disabled. It will be replaced with
    // a text-box containing updated BB-code to be entered manually.
    return;

    var $currentNotebook = getCurrentNotebook();
    if ($currentNotebook.find('.edit_row').css('display') != 'none') {
        return;
    }

    //console.log('update');

    var $form = $currentNotebook.find('form');

    var $textarea = $form.find('textarea');
    var bbCode = $textarea.val();
    var updated = makeUpdatedBbCode(bbCode);

    if (updated && bbCode != updated) {
        var noteId = /message_(\d+)/.exec($textarea.prop('id'))[1];

        console.log('Updating BB-code for note ' + noteId);

        // Update notes input box
        $textarea.val(updated);

        var data = new FormData($form[0]);

        // Send updated notes to server
        $.ajax({
            url: $form.attr('action'),
            data: data,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function () {
                console.log('Sent notebook data to server');
            },
            error: function () {
                console.log('Error updating notebook data', arguments);
            }
        });

    } else {
        //console.log('No changes to BB-code, skipping');
    }

    updateTimingsTableColor($currentNotebook.find('.bbcodetable'));
}
//# sourceURL=https://tylercamp.me/tw/ez-snipe-enhancer.js