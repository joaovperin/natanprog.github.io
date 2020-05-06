if (game_data.screen === 'place' && ((game_data.mode === null) || (game_data.mode === 'command')))
    +function () {

        let coords = FarmingSettings.coords.trim().split(" ").sort((a, b) => {
            let coord1 = a.split('|');
            let coord2 = b.split('|');
            let x = game_data.village.x;
            let y = game_data.village.y;
            return Math.hypot(coord1[0] - x, coord1[1] - y) - Math.hypot(coord2[0] - x, coord2[1] - y);
        });
        let target = GetIndex(coords.length);
        if (target === -1) {
            let when = Timestamp() - 0 + FarmingSettings.idleTime * 60 * 1000;
            let delay = Math.ceil((when - Date.now()) / 1000);
            let timepoint = new Date(when);
            let hh = timepoint.getHours();
            let mm = ('0' + timepoint.getMinutes()).substr(-2);
            let ss = ('0' + timepoint.getSeconds()).substr(-2);

            UI.ErrorMessage(`Wybrano wszystkie wioski<br/>
            Reset cyklu za ${delay} sekund<br/>
            o ${hh}:${mm}:${ss}`);
            return;
        }
        $('input.target-input-field').val(coords[target]);
        for (let key in FarmingSettings.units) {
            if (FarmingSettings.units.hasOwnProperty(key)) {
                if (game_data.units.indexOf(key) === -1)
                    continue;
                $('input#unit_input_' + key).val(FarmingSettings.units[key]);
            }

        }
    }();
else {
    location = TribalWars.buildURL(null, 'place', {mode: 'command'})
}

function Timestamp(value) {
    let storageKey = game_data.world + '_' + game_data.player.id;
    if (arguments.length === 0) {
        return localStorage.getItem(storageKey);
    }
    return localStorage[storageKey] = value;
}
function GetIndex(maxIndex) {
    let storageKey = game_data.world + game_data.village.id;

    if (FarmingSettings.idleTime > 0 && Timestamp() !== null) {
        if (Timestamp() - 0 + FarmingSettings.idleTime * 60 * 1000 < Date.now())
            localStorage.clear(storageKey);
    }
    if (localStorage.getItem(storageKey) === null) {
        localStorage.setItem(storageKey, 0);
        Timestamp(Date.now());
    }
    let index = localStorage[storageKey] - 0;
    if (index === maxIndex) {
        if (FarmingSettings.idleTime > 0)
            return -1;
        UI.SuccessMessage('Zaczynam wybierać od początku');
        return localStorage[storageKey] = 0;
    } else {
        return localStorage[storageKey]++ - 0;
    }
}