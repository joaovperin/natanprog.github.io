; (() => {
    try {

        //  CHECK CURRENT PAGE

        if (window.location.href.indexOf('screen=info_player') < 0) {
            alert("Run this while viewing a player's overview page!");
        }


        function clearOldElements() {
            if ($('#show-coords').length) {
                $('#show-coords').remove();
            }

            if ($('.__filler').length) {
                $('.__filler').remove();
            }

            if ($('.gc-col').length) {
                $('.gc-col').remove();
            }
        }

        clearOldElements();


        //  GET VILLAGE INFO (coords, points)

        var $villages = $('#villages_list > tbody > tr');

        var coords = [];
        $villages.each((i, el) => {
            var $children = $(el).children();
            var td_i = $children.length == 3 ? 1 : 2;
            var c = $($(el).children()[td_i]).text().trim().split('|');
            //console.log(c);
            c = {
                x: parseInt(c[0]),
                y: parseInt(c[1]),
                points: $($(el).children()[td_i + 1]).text().trim().replace(/\./, ','),
                enabled: true
            };

            coords.push(c);
        });

        console.log(coords);



        //  GET COORD OF CURRENT VILLA

        var localCoord = /(\d+\|\d+)/.exec($('b.nowrap').text())[1].split('|');
        localCoord[0] = parseInt(localCoord[0]); localCoord[1] = parseInt(localCoord[1]);
        localCoord = {
            x: localCoord[0],
            y: localCoord[1]
        };
        console.log('This village is: ', localCoord);




        // MAKE COORDS COPY ORDERED BY DISTANCE

        var dist = (c1, c2) => Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2));

        coords.forEach((c) => {
            console.log('Distance from ' + JSON.stringify(localCoord) + ' to ' + JSON.stringify(c) + ' is ' + dist(c, localCoord));
        });

        var distOrderedCoords = coords.slice();
        distOrderedCoords.sort((a, b) => dist(localCoord, a) - dist(localCoord, b));

        for (i = 0; i < coords.length; i++) {
            coords[i].label = coords[i].x + '|' + coords[i].y;
            distOrderedCoords[i].label = distOrderedCoords[i].x + '|' + distOrderedCoords[i].y;
        }

        console.log(coords);


        // MAKE COORDS COPY ORDERED BY POINTS

        function trimSeparators(num) {
            return num
                .replace(/\./g, '')
                .replace(/,/g, '');
        }

        var pointAscOrderedCoords = coords.slice();
        pointAscOrderedCoords.sort((a, b) => parseFloat(trimSeparators(a.points)) - parseFloat(trimSeparators(b.points)));

        var pointDescOrderedCoords = coords.slice();
        pointDescOrderedCoords.sort((a, b) => parseInt(trimSeparators(b.points)) - parseInt(trimSeparators(a.points)));



        // PREPARE INTERFACE

        var pointSeparator = ' --- ';

        function insertTableColumn($table, $header, $data) {
            $table = $($table);
            $table.find('> thead > tr').prepend($header);

            var $rows = $table.find('> tbody > tr');
            $rows.each((i, el) => {
                var $el = $(el);
                $el.prepend($data[i] || '');
            });
        }

        var selectVillaCheckboxes = [];
        coords.forEach((c, i) => {
            var $entry = $('<td style="text-align: right" class="gc-col"><input type="checkbox" checked></td>');
            var $cbx = $entry.find('input');
            $cbx.change((e) => {
                console.log(e);
                coords[i].enabled = $cbx.prop('checked');
                makeOutput();
            });
            selectVillaCheckboxes.push($entry);
        });
        var $listHeader = $('<th style="width:80px;text-align:right;" class="gc-col">Include <input type="checkbox" id="gc-v-all" checked></th>');
        $listHeader.change((e) => {
            console.log(e);
            var checkAll = $(e.target).prop('checked');
            selectVillaCheckboxes.forEach(($row, i) => {
                $row.find('input').prop('checked', checkAll);
                coords[i].enabled = checkAll;
            });
            makeOutput();
        });
        insertTableColumn('#villages_list', $listHeader, selectVillaCheckboxes);


        var $containerTable = $('<table id="show-coords" class="vis">');
        $containerTable.append('<tr><th colspan="2">Village Coordinates Export (Script)</th></tr>')
        var dataStyle = "width: 80vw; max-width: 50em;  height: 5em; overflow:scroll;";
        var labelStyle = "min-width: 12.5em; text-align: right;";

        var playerName = $('#content_value > h2').text().trim();

        var options = options || {
            useNumbering: true,
            useClaimsTag: true,
            includePoints: true,

            orderBy: 'points (desc)',
            orderByOptions: ['none', 'distance', 'points (asc)', 'points (desc)'],
        };

        var data;

        $containerTable.insertAfter('#player_info');

        for (var i = 0; i < 2; i++)
            $('<br class="__filler">').insertAfter('#player_info');

        makeOptionsUI($containerTable);
        makeOutput();

        function filterByEnabled(array) {
            var result = [];
            array.forEach((e) => e.enabled ? result.push(e) : null);
            return result;
        }
  
        function makeOutput() {
            console.log(options);

            switch (options.orderBy) {
                case 'points (asc)':
                    data = pointAscOrderedCoords;    
                    break;
                    
                case 'points (desc)':
                    data = pointDescOrderedCoords;    
                    break;

                case 'distance':
                    data = distOrderedCoords;    
                    break;

                case 'none':
                    data = coords;    
                    break;
            }

            data = filterByEnabled(data);

            $('#show-coords tr:nth-child(n+3)').remove();

            // selectVillaCheckboxes.forEach(($entry, i) => {
            //     var $cbx = $entry.find('input');
            //     coords[i].enabled = $cbx.prop('checked');
            // });

            makeBbcodeList(data, $containerTable);
            makeBbcodeTable(data, $containerTable);
            makeBigJsString(data, $containerTable);
            makeJsArray(data, $containerTable);
        }
        



        // OPTIONS
        
        function onOptionsChanged() {
            console.log('onOptionsChanged');
            loadOptions();
            console.log(options);
            makeOutput();
        }

        function makeOptionsList(array, selectedOption) {
            var result = '';
            array.forEach((o, i) => {
                var capitalized = o[0].toUpperCase() + o.substr(1);
                result += `<option value="${o}" ${o == selectedOption ? 'selected' : ''}>${capitalized}</options>`;
            });
            return result;
        }

        function loadOptions() {
            var gcNumbering = $('#gc-number').prop('checked');
            var gcSort = $('#gc-sort').val();
            var gcUseClaims = $('#gc-claims').prop('checked');
            var gcIncludePoints = $('#gc-points').prop('checked');

            options.useNumbering = gcNumbering;
            options.orderBy = gcSort;
            options.useClaimsTag = gcUseClaims;
            options.includePoints = gcIncludePoints;
        }

        function makeOptionsUI($table) {
            var $row = $('<tr>');
            var $container = $('<td colspan="5" style="text-align: center">');
            $row.append($container);
            $table.append($row);

            console.log(options);

            var separator = '<div style="display:inline-block;width:0.5em;"></div> | <div style="display:inline-block;width:0.5em;"></div>';

            $container.append(`<label for="gc-claims">Use [claim] instead of [coord]</label><input type="checkbox" id="gc-claims" ${options.useClaimsTag ? "checked" : ""}>`);
            $container.append(separator);
            $container.append(`<label for="gc-number">Numbering</label><input type="checkbox" id="gc-number" ${options.useNumbering ? "checked" : ""}>`);
            $container.append(separator);
            $container.append(`<label for="gc-points">Show points</label><input type="checkbox" id="gc-points" ${options.includePoints ? "checked" : ""}>`);

            $container.append(separator);
            $container.append(`
                <label for="gc-sort">Order by </label>
                <select id="gc-sort">
                    ${makeOptionsList(options.orderByOptions, options.orderBy)}
                </select>
            `.replace(/\n/g, ''));

            $container.find('input').click(onOptionsChanged);
            $container.find('select').change(onOptionsChanged);
        }




        // OUTPUT DATA/ELEMENTS

        function makeBbcodeList(coords, $table) {
            var $row = $('<tr>');
            $row.append(`<td style="${labelStyle}">BB Code<br>(List)</td>`);

            var bbCode = '';
            coords.forEach((co, i) => {
                if (bbCode.length > 0) {
                    bbCode += '\n';
                }
                if (options.useNumbering) {
                    bbCode += i + 1 + '. ';
                }
                if (options.useClaimsTag) {
                    bbCode += `[claim]${co.label}[/claim]`
                } else {
                    bbCode += `[coord]${co.label}[/coord]`;
                }

                if (options.includePoints) {
                    bbCode += pointSeparator + co.points + ' points';
                }
            });

            
            bbCode = `[player]${playerName}[/player]'s Villages\n\n` + bbCode;

            $row.append(`<td><textarea style="${dataStyle}">${bbCode}</textarea></td>`);

            $table.append($row);
        }

        function makeBbcodeTable(coords, $table) {
            var $row = $('<tr>');
            $row.append(`<td style="${labelStyle}">BB Code<br>(Table)</td>`);

            var bbCode = '';

            var header = '';
            var body = '';

            header = `
                [**]
                ${options.useNumbering ? '#[||]' : ''}
                ${options.includePoints ? 'Points[||]' : ''}
                Village
                [/**]
            `.replace(/\s\s/g, '');

            coords.forEach((co, i) => {
                body += '\n[*]';

                if (options.useNumbering) {
                    body += `${i + 1}.[|]`;
                }

                if (options.includePoints) {
                    body += `${co.points}[|]`;
                }
                
                if (options.useClaimsTag) {
                    body += `[claim]${co.label}[/claim]`;
                } else {
                    body += `[coord]${co.label}[/coord]`;
                }
            });



            bbCode = `[player]${playerName}[/player]'s Villages\n\n[table]\n${header}\n${body}\n[/table]`;
            $row.append(`<td><textarea style="${dataStyle}">${bbCode}</textarea></td>`);

            $table.append($row);
        }

        function makeBigJsString(coords, $table) {
            var output = '';
            coords.forEach((c) => output += ' ' + c.label);
            output = output.trim();

            var $row = $('<tr>');
            $row.append(`<td style="${labelStyle}">Script Input<br>(One Big Line)</td>`);
            $row.append(`<td><textarea style="${dataStyle}">"${output}"</textarea></td>`);

            $table.append($row);
        }

        function makeJsArray(coords, $table) {
            var output = [];
            coords.forEach((c) => output.push(c.label));

            var $row = $('<tr>');
            $row.append(`<td style="${labelStyle}">Script Input<br>(Comma-Separated)</td>`);
            $row.append(`<td><textarea style="${dataStyle}">${JSON.stringify(output).replace(/'/g, '')}</textarea></td>`);

            $table.append($row);
        }

    } catch (e) {
        console.error(e);
    }    
})();
//# sourceURL=https://tylercamp.me/tw/get-coords.js