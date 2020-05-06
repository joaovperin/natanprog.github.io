/**
 * I strongly believe that this ingame BBCode add-on will help all players with a broken Caps Lock key stop being
 * regarded as "screamers". People who are under the influence of extreme emotions can quickly improve their message
 * style to "less aggressive").
 *
 * Usage:  add new entry to Quick bar. As "target URL" type:
 * javascript:$.getScript('https://reverie.pl/unscreamer'); void(0);
 * Created by: Pinky and the Brain (nickname change history: grosik42 / Rzut Beretem / Restinguere Lux)
 */
(function () {
    'use strict';
    window.Unscreamer = {
        'sentenceCase': function (string) {
            return window.Unscreamer.lowerCase(string).replace(/(^\w)|\.\s+(\w)/gm, window.Unscreamer.upperCase);
        },
        'lowerCase': function (string) {
            return string.toLowerCase();
        },
        'upperCase': function (string) {
            return string.toUpperCase();
        },
        'fix': function () {
            $('#message').val(window.Unscreamer.sentenceCase($('#message').val()));
        }
    };

    var message = 'Fix the stuck caps lock key';

    if (TribalWars.getGameData().locale === 'pl_PL') {
        message = 'Napraw przytrza&#347;ni&#281;tego caps locka';
    }

    $('<a id="bb_capslock_fix" title="'+message+'" href="#" onclick="Unscreamer.fix(); return false">' +
        ' <span style="display:inline-block; zoom:1; *display:inline; background:url(https://dspl.innogamescdn.com/asset/f261d3e/graphic/bbcodes/bbcodes.png) no-repeat -380px 0px; padding-left: 0px; padding-bottom:0px; margin-right: 2px; margin-bottom:3px; width: 20px; height: 20px">&nbsp;</span>' +
        '</a>').insertAfter('#bb_button_emoji');
})();