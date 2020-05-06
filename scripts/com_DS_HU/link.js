//
// Tribal-Reports.net
//
function convert(lang, track_m) {
    // by Dan Latocha (tribal-reports.net)
    var raport, d, l, track_c, link;
    if (lang === undefined) lang = 'pl';
    if (track_m === undefined) track_m = 'bookmark';

    if (frames.main !== undefined) {
        d = frames.main.document;
        l = frames.main.location;
    }
    else {
        d = document;
        l = location;
    }

    if (l.href.match("screen=report") != null) {
        if (navigator.userAgent.indexOf("Firefox") != -1)
            raport = getParentByTagName(d.getElementById('attack_info_att'), 'table').innerHTML;
        track_c = 'private';
    }
    else if (l.href.match("public_report") != null) {
        if (navigator.userAgent.indexOf("Firefox") != -1)
            raport = d.getElementById('attack_info_att').parentNode.innerHTML;
        track_c = 'public';
    }
    else {
        if (lang == 'pl') alert('Aby u\u017cyć automatycznego kopiowania musisz przejść na stronę z widokiem raportu! \nLink działa dla prywatnych i publicznych raportów.');
        else alert('To use auto-copy feature you need to go to page with a report! \nThis link works with both private and public reports.');
        return;
    }

    if (navigator.userAgent.indexOf("Firefox") == -1) {
        req = getXMLHttpRequest();
        req.open('GET', l.href, false);
        req.send(null);
        raport = req.responseText;
    }

    raport = raport + '[lang]' + l.href.match("https://(.*?)/(game\.php|public_report)")[1] + '[/lang]';
    raport = htmlspecialchars(raport);

    link = 'http://tribal-reports.net/' + lang + '/';

    if (d.getElementById('tribal_reports_redirect') != null) {
        d.getElementById('tribal_reports_redirect').value = raport;
        d.getElementById('tribal_reports_redirect').action = link;
        d.getElementById('track_m').value = track_m;
    }
    else {
        d.getElementsByTagName('body')[0].innerHTML += "<form method='post' id='tribal_reports_redirect' action='" + link + "' target='_blank'><input type='hidden' name='pre_query' value=\"" + raport + "\"/><input id='track_m' type='hidden' name='track[medium]' value='" + track_m + "' /><input type='hidden' name='track[content]' value='" + track_c + "' /></form>";
    }

    d.getElementById('tribal_reports_redirect').submit();
}

function htmlspecialchars(string) {
    // original htmlentities by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    var histogram = {}, code = 0, tmp_arr = [], i = 0;

    histogram['38'] = 'amp';
    histogram['34'] = 'quot';
    histogram['39'] = '#039';
    histogram['60'] = 'lt';
    histogram['62'] = 'gt';

    for (i = 0; i < string.length; ++i) {
        code = string.charCodeAt(i);
        if (code in histogram) {
            tmp_arr[i] = '&' + histogram[code] + ';';
        } else {
            tmp_arr[i] = string.charAt(i);
        }
    }
    return tmp_arr.join('');
}

function getXMLHttpRequest() {
    var request = false;
    try {
        request = new XMLHttpRequest();
    } catch (err1) {
        try {
            request = new ActiveXObject('Msxml2.XMLHTTP');
        } catch (err2) {
            try {
                request = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (err3) {
                request = false;
            }
        }
    }
    return request;
}

// Getting the closest parent with the given tag name.
function getParentByTagName(obj, tag) {
    var obj_parent = obj.parentNode;
    if (!obj_parent) return false;
    if (obj_parent.tagName.toLowerCase() == tag) return obj_parent;
    else return getParentByTagName(obj_parent, tag);
}