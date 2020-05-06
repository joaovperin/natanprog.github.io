javascript:
 // 
 // stv storage supplier
 // author: DNSTW (stivens)
 // 
var re;
var maxStorage;
var wood_atm,
    stone_atm,
    iron_atm;
var vil;
var capacity;
var bufor;
var wood_av,
    stone_av,
    iron_av;
var inc_wood,
    inc_stone,
    inc_iron;
var wood_needed,
    stone_needed,
    iron_needed;
var inp_wood,
    inp_stone,
    inp_iron;
var asd;
var can_do = false;
var inp;

function getResources() {
    maxStorage = Math.floor(parseInt(game_data.village.storage_max) * 0.93);
    wood_atm = parseInt(game_data.village.wood);
    stone_atm = parseInt(game_data.village.stone);
    iron_atm = parseInt(game_data.village.iron);
}
function getIncoms() {
    re = /\D+/;
    inc_wood = $(document).find("#total_wood .res.wood").html();
    inc_stone = $(document).find("#total_stone .res.stone").html();
    inc_iron = $(document).find("#total_iron .res.iron").html();

    inc_wood = parseInt(inc_wood.replace(re, ''));
    inc_stone = parseInt(inc_stone.replace(re, ''));
    inc_iron = parseInt(inc_iron.replace(re, ''));
}
function veryFirstVill() {
    vil = $("#village_list").find("tbody tr")[0];
    capacity = vil.getAttribute('data-capacity');
    capacity = parseInt(capacity);

    vil = $("#village_list").find("tbody tr .wood")[0];
    wood_av = vil.getAttribute('data-res');
    wood_av = parseInt(wood_av);

    vil = $("#village_list").find("tbody tr .stone")[0];
    stone_av = vil.getAttribute('data-res');
    stone_av = parseInt(stone_av);

    vil = $("#village_list").find("tbody tr .iron")[0];
    iron_av = vil.getAttribute('data-res');
    iron_av = parseInt(iron_av);
}
function getNeeds() {
    wood_needed = maxStorage - wood_atm - inc_wood;
    stone_needed = maxStorage - stone_atm - inc_stone;
    iron_needed = maxStorage - iron_atm - inc_iron;
}
function callIt() {
    inp = $("#village_list tbody tr td input")[0];
    $(inp).trigger('click');

    asd = $("#village_list tbody tr td input")[3];
    $(asd).on('click', function() {
        $(this).closest("tr").remove();
        start();
    });


    inp_wood = $("#village_list tbody tr td input")[0];
    inp_stone = $("#village_list tbody tr td input")[1];
    inp_iron = $("#village_list tbody tr td input")[2];

    getNeeds();

    if (wood_needed > 0 && capacity > 0) {
        bufor = wood_needed;

        if (bufor > wood_av) {
            bufor = wood_av;
        } else {
            bufor = bufor;
        }

        if (bufor > capacity) {
            bufor = capacity;
            capacity = 0;
        } else {
            capacity = capacity - bufor;
        }

    } else {
        bufor = 0;
    }
    $(inp_wood).val(bufor);
    inc_wood += bufor;

    /*#################################*/

    if (stone_needed > 0 && capacity > 0) {
        bufor = stone_needed;
        if (bufor > stone_av) {
            bufor = stone_av;
        } else {
            bufor = bufor;
        }

        if (bufor > capacity) {
            bufor = capacity;
            capacity = 0;
        } else {
            capacity = capacity - bufor;
        }

    } else {
        bufor = 0;
    }


    $(inp_stone).val(bufor);
    inc_stone += bufor;

    /*#################################*/

    if (iron_needed > 0 && capacity > 0) {
        bufor = iron_needed;
        if (bufor > iron_av) {
            bufor = iron_av;
        } else {
            bufor = bufor;
        }

        if (bufor > capacity) {
            bufor = capacity;
            capacity = 0;
        } else {
            capacity = capacity - bufor;
        }

    } else {
        bufor = 0;
    }


    $(inp_iron).val(bufor);
    inc_iron += bufor;

    if ($(inp_iron).val() == 0 && $(inp_stone).val() == 0 && $(inp_wood).val() == 0) {
        UI.InfoMessage('Spichlerz zapełniony', 5000, 'success');
    }
}


function start() {
    can_do = true;
    veryFirstVill();
    callIt();
}
if ((game_data.screen == 'market' && game_data.mode == 'call') || can_do == true) {
    if (document.getElementById("checkbox_hide_traderless").checked == false) {
        UI.InfoMessage('Ukryj wioski bez dostępnych kupców.', 5000, 'error');
    } else {
        getResources();
        getIncoms();
        start();
    }
}
else {
    UI.InfoMessage('Skrypt należy uruchomić z rynku(wezwij).', 5000, 'error');
}