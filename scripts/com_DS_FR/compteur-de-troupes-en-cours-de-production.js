/* Fonction : Affiche le total des unités en cours de recrutements 
@author : Virza 
@link : javascript: $.getScript("localisation du script");void(0); 
Correction bugs "cavalerie" & concaténation itérative des résultats" + compatibilité 8.20 : McDonnel 
@author : Ichiro ; "Correction bug avec version 8.32, usage de jQuery" - compatibilite monde avec/sans archer automatique
*/

var UNIT_LIST = ["spear", "sword", "axe", "archer", "spy", "light", "marcher", "heavy", "ram", "catapult"];
function countProduction(constructionTable, sumMap) {
  var inConstruction = sumMap || {};
  $(constructionTable).find("tr .unit_sprite").each(function (_, unitSprite) {
    console.log(unitSprite);
    var unit = $(unitSprite).prop('class').split(/ +/).filter(function (e) {
        return UNIT_LIST.indexOf(e) >= 0;
      });
    unit = unit.length == 1 ? unit[0] : undefined;
    if (!unit) {
      return;
    }
    var td = $(unitSprite).closest('td');
    var countMatch = /([0-9]+)/.exec(td.text());
    console.log(unit, td, +countMatch[0]);
    inConstruction[unit] = (inConstruction[unit] || 0) + (+countMatch[0]);
  });
  return inConstruction;
}

function printResult(inProduction) {
  var unitTable = $("#train_form table")[0];
  $(unitTable).find(".compteur-production").remove();
  for (i = 1; i < unitTable.rows.length - 1; i++) {
    var row = unitTable.rows[i];
    var unitName = $("input", row).prop('name');
    var chiffres = row.cells[2].textContent.split('/');
    var alreadyExisting = parseInt(chiffres[1]);
    row.cells[2].innerHTML += '<span class="compteur-production"> -> <b>' + (alreadyExisting + (inProduction[unitName] || 0)) + '</b></span>';
  }
  unitTable.rows[0].cells[2].innerHTML = 'Dans le village/total -> cumulé';
  $("#train_form tr")[0].cells[2]
}

function Calcul() {
  var inProduction = {};
  countProduction('#trainqueue_wrap_barracks', inProduction);
  countProduction('#trainqueue_wrap_stable', inProduction);
  countProduction('#trainqueue_wrap_garage', inProduction);
  printResult(inProduction);
}

Calcul();