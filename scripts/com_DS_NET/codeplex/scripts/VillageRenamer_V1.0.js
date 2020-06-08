Javascript:

/*Most of this code is from an edit of Dale's code as shown here - http://forum.tribalwars.net/showpost.php?p=5797656&postcount=561*/


/*
Theses are the different paramaters which can be used by the user

{continent}
{sector}
{field}
{coordKRan}
{index}
{direction}
{x}
{y}
{random}
{randCoordsWithRange}
{randCoordswithRadius}
{randomCoordinatesRadius}
{msgbox}
{distancefromatarget}
{farmSpaceLeft}
{original}
{groupConfig}
*/

var menu = [];
masks.forEach(function (e, i) {
    menu.push((i + 1) + ") " + e[0]);
});


var selID = prompt("Select Template:\n\n\t" + menu.join("\n\t"));

if (selID) {

/*Validation*/
    if (window.x1 === undefined) { x1 = 500; }
    if (window.y1 === undefined) { y1 = 500; }
    if (window.TargetX === undefined) { TargetX = 500; }
    if (window.TargetY === undefined) { TargetY = 500; }
    if (window.XK === undefined) { XK = 500; }
    if (window.YK === undefined) { YK = 500; }
    if (window.xmax === undefined) { xmax = 500; }
    if (window.xmin === undefined) { xmin = 500; }
    if (window.ymax === undefined) { ymax = 500; }
    if (window.ymin === undefined) { ymin = 500; }
    if (window.begining === undefined) { begining = ""; }
    if (window.ending === undefined) { ending = ""; }
    if (window.whattext === undefined) { whattext = ""; }
    if (window.debug === undefined) { debug = 0; }
    if (window.radius === undefined) { radius = 15; }
    if (window.eleDoc === undefined) { eleDoc = (window.frames.length > 0) ? window.main.document : document; }
    if (window.debug === undefined) { debug = 0; }
/*Validation ended*/
    var mask = masks[(parseInt(selID || "4", 10) - 1) % masks.length][1];

    function messageprompt() {/*Prompts the user for the village name*/
        return prompt("Enter Village Name", "ABC");
    }

    if (mask.search(/msgbox/) != -1) {
        whattext = messageprompt();
    }

    if (selID == 5) {
        mask = prompt("Enter your custom variables", "[{continent}-{sector}:{field}]- [{direction}]");
    }

   writer("The format of the mask is '" + mask + "'");
    var padding = 4;
    var randomRange = {
        'min': 0,
        'max': 1000
    };

    function fnExecuteScript() {
        function zeroPad(number, length) {
            var n = number.toString();
            while (n.length < length) {
                n = "0" + n;
            }
            return n;
        }
        function Point(x, y) {
            return {
                'x': x,
                'y': y
            };
        }
        function Rect(top, left, bottom, right) {
            return {
                'top': top,
                'left': left,
                'bottom': bottom,
                'right': right
            };
        }
        function pointInRect(point, rect) {
            return (point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom);
        }
        function fnExtractDetails(x, y) {
            var location = {
                'continent': (Math.floor(y / 100) * 10) + Math.floor(x / 100),
                'direction': '',
                'sector': ((Math.floor(y / 10) % 10) * 10) + (Math.floor(x / 10) % 10),
                'field': ((y % 10) * 10) + (x % 10)
            };
            var position = Point(Math.floor(x / 10) % 10, Math.floor(y / 10) % 10);
            var continent_map = {
                'NW': Rect(0, 0, 2, 2),
                'N': Rect(0, 3, 2, 6),
                'NE': Rect(0, 7, 2, 9),
                'W': Rect(3, 0, 6, 2),
                'C': Rect(3, 3, 6, 6),
                'E': Rect(3, 7, 6, 9),
                'SW': Rect(7, 0, 9, 2),
                'S': Rect(7, 3, 9, 6),
                'SE': Rect(7, 7, 9, 9)
            };
            for (var direction in continent_map) {
                if (continent_map.hasOwnProperty(direction)) {
                    if (pointInRect(position, continent_map[direction])) {
                        location.direction = direction;
                        break;
                    }
                }
            }
            return location;
        }
        function randCoordsWithRange() {/*Will give random coordinates out in a range of X min, Y Min, X Max, Y Max.*/
            xrange = xmax - xmin;
            Nx = r(xrange) + xmin;
            yrange = ymax - ymin;
            Ny = r(yrange) + ymin;
            return Nx + "|" + Ny;
        }

        function RandKVillages(x, y) { /*Will give random coords in a certain K*/
            return x + "" + rand99() + '|' + y + "" + rand99();

        }

        function randCoordswithRadius() { /*Give random coords within a certain range from a given point*/
            rad = rand(radius);
            theta = Math.PI * rand(2) - 1;
            var xs = Math.round(rad * Math.cos(theta)) + x1;
            var ys = Math.round(rad * Math.sin(theta)) + y1;
            return xs + "|" + ys;
        }

        function randomCoordinatesRadius(x, y) {  /*Will generate random coordinates based on the radius of the current village*/
            rad = r(radius);
            theta = Math.PI * rand(2) - 1;
            var xs = Math.round(rad * Math.cos(theta)) + Number(x);
            var ys = Math.round(rad * Math.sin(theta)) + Number(y);
            return xs + "|" + ys;
        }

        function distancefromatarget(DefenderX, DefenderY) { /*Finds number of fields from a target*/
            var distance = Math.round(Math.sqrt((DefenderX - TargetX) * (DefenderX - TargetX) + ((DefenderY - TargetY) * (DefenderY - TargetY))));
            return "F: " + distance;
        }

        function farmSpaceLeft(i) { /*Farm Space in a village*/
            row = i.parentNode.parentNode.parentNode;
            cell = row.cells[7].childNodes[0].innerHTML;
            cell = cell.substring(0, cell.indexOf(' '));
            if (cell < 10) cell = '0000' + cell;
            else if (cell < 100) cell = '000' + cell;
            else if (cell < 1000) cell = '00' + cell;
            else if (cell < 10000) cell = '0' + cell;
            return "Farm Space: " + cell;
        }

        function original(value) {/*This will keep the original village name*/
            return value;
        }

   function groupCon() {
            var villas = $("table").html().match(/[>|&gt;]([^>;]+?)&lt;/);
            for (i = 0; i < groupConfig.length; i++) {
                if (villas[1] == groupConfig[i][0]) {
                   return groupConfig[i][1];
                }
            }
        }

        function rand(a) {/*Random Number*/
            return Math.random() * a;
        }

        function rand99() {
            num = Math.round(Math.random() * 99);
            if (num < 10) num = '0' + num;
            return num;
        }

        function r(a) {/*Rounding*/
            return Math.round(Math.random() * a)
        }

        var inputs = eleDoc.getElementsByTagName('input');
        var ii, id, index, str, mid, x, y, details, newName;
        var count = 1;
        for (ii = 0; ii < inputs.length; ii++) {
         
            id = inputs[ii].id;
            index = id.indexOf('edit_input');
            if (index >= 0) {
                id = id.substring(index + 11);
                var win = (window.frames.length > 0) ? window.main : window;
                str = win.$('#label_text_' + id).html();
                mid = str.lastIndexOf('|');
                x = str.substring(str.lastIndexOf('(') + 1, mid);
                y = str.substring(mid + 1, str.lastIndexOf(')'));

                details = fnExtractDetails(x, y);
                newName = mask
                .replace(/\{groupConfig\}/i, groupCon())
                .replace(/\{continent\}/i, zeroPad(details.continent, 2))
                .replace(/\{direction\}/i, details.direction)
                .replace(/\{sector\}/i, zeroPad(details.sector, 2))
                .replace(/\{field\}/i, zeroPad(details.field, 2))
                .replace(/\{index\}/i, zeroPad(count++, padding))
                .replace(/\{x\}/i, zeroPad(x, 3))
                .replace(/\{y\}/i, zeroPad(y, 3))
                .replace(/\{coordKRan\}/i, RandKVillages(XK, YK))
                .replace(/\{randCoordsWithRange\}/i, randCoordsWithRange())
                .replace(/\{randCoordswithRadius\}/i, randCoordswithRadius())
                .replace(/\{randomCoordinatesRadius\}/i, randomCoordinatesRadius(x, y))
                .replace(/\{msgbox\}/i, whattext)
                .replace(/\{distancefromatarget\}/i, distancefromatarget(x, y))
                .replace(/\{farmSpaceLeft\}/i, farmSpaceLeft(inputs[ii]))
                .replace(/\{original\}/i, original(inputs[ii].value));

                while (newName.match(/\{random\}/i)) {
                    newName = newName.replace(/\{random\}/i, Math.floor(Math.random() * (randomRange.max - randomRange.min)) + randomRange.min);
                }
                var theformat = begining + newName + ending;
                writer("The village " + x + "|" + y + " is going to be renamed from : '" + inputs[ii].value + "' to: '" + theformat + "'");
                inputs[ii].value = theformat;
                inputs[ii + 1].click();
            }
        }
        void (0);
    }
}

/*Thanks to FNF'' code */
function writer(message) {/*Debuging errors*/
    if (debug == 1) {
        var body = eleDoc.getElementsByTagName("body")[0];
        var tbl = eleDoc.createElement("table");
        var tblBody = eleDoc.createElement("tbody");
        var row = eleDoc.createElement("tr");
        var cell = eleDoc.createElement("td");
        cell.innerHTML = message;
        row.appendChild(cell);
        tblBody.appendChild(row);
        tbl.appendChild(tblBody);
        body.appendChild(tbl);
    }
}

/*account options*/
/*Thanks to Dale McKay's code here*/
var _gameVersion = _win.game_data.version.match(/[\d|\.]+/g);
_gameVersion = (_gameVersion ? parseFloat(_gameVersion[1]) : -1);
var _worldConfig = $(fnAjax('/interface.php', 'GET', { 'func': 'get_config' }, 'xml', false)).find('config');
var _unitConfig = $(fnAjax('/interface.php', 'GET', { 'func': 'get_unit_info' }, 'xml', false)).find('config');

var _isPremium = ($('#quickbar_outer').length > 0);
var _hasChurch = (parseInt(_worldConfig.find('game church').text() || '0', 10) > 0);
var _hasPaladin = (parseInt(_worldConfig.find('game knight').text() || '0', 10) > 0);
var _hasArchers = (parseInt(_worldConfig.find('game archer').text() || '0', 10) > 0);
var _hasMilitia = (_unitConfig.find('militia').length > 0);
var _hasVillageNotes = ($('[src*="note.png"],[class*="note-icon"]').length > 0);

writer("=========================");
writer("Account Name: " + window.game_data.player.name);
writer("No. of Villages: " + window.game_data.player.villages);
writer("Group Number: " + window.game_data.village.group);
writer("Premium: " + (_isPremium ? "yes" : "no"));
writer("Church : " + (_hasChurch ? "yes" : "no"));
writer("Statue : " + (_hasPaladin ? "yes" : "no"));
writer("Archer : " + (_hasArchers ? "yes" : "no"));
writer("Militia: " + (_hasMilitia ? "yes" : "no"));
writer("Notes  : " + (_hasVillageNotes ? "yes" : "no"));
writer("Sitter : " + (window.location.href.match(/t\=\d+/i) ? "yes" : "no"));
writer("=========================");
writer("Version: " + window.game_data.version);
writer("World  : " + window.game_data.world);
writer("Screen : " + window.game_data.screen);
writer("Mode   : " + window.game_data.mode);
writer("URL    : " + window.location.href);
writer("Browser: " + navigator.userAgent);
writer("=========================");
writer("=========================");

function fnAjax(url, method, params, type, isAsync) {
    var error = null;
    var payload = null;

    $.ajax({
        'async': isAsync,
        'url': url,
        'data': params,
        'dataType': type,
        'type': String(method || 'GET').toUpperCase(),
        'error': function (req, status, err) { error = 'ajax: ' + status; },
        'success': function (data, status, req) { payload = data; }
    });

    if (error) {
        throw (error);
    }

    return payload;
}

fnExecuteScript();

writer("=========================");
writer("Completed");
writer("=========================");










/*
Future Improvements


renames villages according to a pre-defined list of groups & names (so, if the village is in Group A, they're all called Apples, in Group B Bananas, Group C Cherries and so on) 
Keep orgianal village names or up to a certian characater or last of village names 
name = inputs[i].value;
inputs[i].value = name.slice(name.indexOf(" "), name.length);

displays all villages? with bb codes? with troops? 
production - resources - market - points
predefined village names and custom
javascript:   
var n = ['names', 'go', 'here', 'in', 'this', 'format']; var doc=document;  if(window.frames.length>0)doc=window.main.document;    var inputs=doc.getElementsByTagName('input');  var y=0;  for(i=0;i<inputs.length;i++){      id=inputs[i].id;      index=id.indexOf('edit_input');      if(index!=-1){          y++;      }  }  var names=new Array(y);  var m=n.length;  var f=Math.floor(y/m);  var v=(y/m-f)*m;  var d=0;  for (j=0;j<f;j++){          d=j*m;      for (i=0;i<n.length;i++) {          names[d]=n[i];          d++;      }  }  for (var k=0;k<v;k++){      names[d]=n[k];      d++;  }  for(i=0;i<inputs.length;i++){      id=inputs[i].id;      index=id.indexOf('edit_input');      if(index!=-1){          var r=Math.floor(Math.random()*(names.length-1));          var a=names[r];          inputs[i].value=a;          names.splice(r,1);          inputs[i+1].click();      }  }  end();

*/