(() => {
    if (window.location.href.indexOf("am_farm") < 0) {
        alert('Run this on the Loot Assistant page!');
    }
    console.log('Extracting village info');

    let urls = [];

    $('#inner-border tbody tr[id^="village_"]')
        .filter((i, el) => $(el).find(":nth-child(7)").html() > 0)
        .slice(0, 30)
        .each((i, el) => {
            console.log('Found village ', el);
            var cv = /village=(\w+)/.exec(window.location.href)[1];
            var bv = /village_(\w+)/.exec(el.id)[1];
            var rp = `/game.php?village=${cv}&screen=place&target=${bv}`;
            urls.push(rp);
        });
    
    $('#plunder_list')
        .find('tr')
        .filter((i, el) => $(el).attr('id'))
        .each((i, el) => {
            var wallLevel = $(el).find('td:nth-of-type(7)').text();
            var iconUrl = $(el).find('td:nth-of-type(2) img').attr('src');
            if (wallLevel < 1 || iconUrl.indexOf('green.png') >= 0) {
                return;
            }

            var id = $(el).attr('id').match(/(\d+)/)[1];
            console.log('Found village ' + id);

            var cv = /village=(\w+)/.exec(window.location.href)[1];
            var rp = `/game.php?village=${cv}&screen=place&target=${id}`;
            urls.push(rp);
        });
    
    if (window.barbTroops) {
        let troopsParams =
            Object.keys(window.barbTroops)
                .map(unit => `${unit}=${window.barbTroops[unit]}`)
                .join('&');

        urls = urls.map(url => `${url}&${troopsParams}`);
    }

    console.log('Made URLs: ', urls)

    urls = urls.slice(0, 15);

    urls.forEach((url, i) => setTimeout(() => window.open(url, '_blank'), i * 400));
})();
