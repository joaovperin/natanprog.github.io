javascript:
var regExp = /^0[0-9].*$/;
let disableBuildings = [];
let disableUnits = [];
let config;
let buildings = ["main","barracks","stable","garage","church","church_f","watchtower","snob","smith","place","statue","market","wood","stone","iron","farm","storage","hide","wall"];
let units = ["spear","sword","axe","archer","spy","light","marcher","heavy","ram","catapult","knight","snob","militia"];
let datas = ["max_level","min_level","wood","stone","iron","pop","wood_factor","stone_factor","iron_factor","pop_factor","build_time","build_time_factor"];
let dat = ["build_time","pop","speed","attack","defense","defense_cavalry","defense_archer","carry"];
let firstLevelPoint = [10,16,20,24,10,10,42,512,19,0,24,10,6,6,6,5,6,5,8];
let forumURL = "https://forum.tribalwars.net/index.php?members/oreg.123551";
let gear = "https://raw.githubusercontent.com/oreg-kh/Unit-and-building-simulator/master/gear.png";
let token = atob("ZjRiNDIzZWE4MzgxMDJmZmNkMTdmY2M4MDdmY2Y1MTkxZjlkN2I5Yw==");
const obj = {buildingsObj: {}, unitsObj: {}, world: {}};
let errorText = {
        buildings: "Az épületek adatainak lekérdezése a szerverről sikertelen volt! Próbáld meg később.",
        units: "Az egységek adatainak lekérdezése a szerverről sikertelen volt! Próbáld meg később.",
        unitsCost: "Az egységek nyersanyag költségének lekérdezése a szerverről sikertelen volt! Próbáld meg később.",
        speed: "A szerver sebességének lekérdezése a szerverről sikertelen volt! Próbáld meg később."
};
let prompts = {
        text: [`Ezt a kódot importáláskor lehet használni.`,
               `\n`,
               `\n`,
               `Segítségével elmentheted a profilodat vagy elküldheted másnak.`,
               `\n`,
               `Másolás a vágólapra: CTRL+C.`].join('')
};
let helpTooltip = {
        resource: [`Nyersanyag bónusz:`,
                   `<br/>`,
                   `<br/>`,
                   ` :: Itt adható meg, hány százalékkal van megnövelve a fa, agyag és vas termelése.`].join(''),
        pop: [`Népesség bónusz:`,
                   `<br/>`,
                   `<br/>`,
                   ` :: Itt adható meg, hány százalékkal van megnövelve a tanya kapacitása.`,
                   ` :: Külön beállítható bónuszfalu, zászló és leltáros növelő.`].join(''),
        haul: [`Teherbírás bónusz:`,
                   `<br/>`,
                   `<br/>`,
                   ` :: Itt adható meg, hány százalékkal van megnövelve az egységek szállítási kapacitása.`,
                   ` :: Külön beállítható zászló és leltáros növelő.`].join(''),
        recruit: [`Képzés bónusz:`,
                   `<br/>`,
                   `<br/>`,
                   ` :: Itt adható meg, hány százalékkal van megnövelve a barakk, istálló, műhely és akadémia képzési sebessége.`].join(''),
        market: [`Piac bónusz:`,
                   `<br/>`,
                   `<br/>`,
                   ` :: Itt adható meg, hány százalékkal van megnövelve a kereskedők száma.`,
                   ` :: Külön beállítható bónuszfalu és leltáros növelő.`].join(''),
        storage: [`Raktár bónusz:`,
                   `<br/>`,
                   `<br/>`,
                   ` :: Itt adható meg, hány százalékkal van megnövelve a raktár kapacitása.`,
                   ` :: Külön beállítható bónuszfalu és leltáros növelő.`].join('')
}
let game = window.image_base;
let imageSrc = {
        main: game + "buildings/mid/main3.png",
        barracks: game + "buildings/mid/barracks3.png",
        stable: game + "buildings/mid/stable3.png",
        garage: game + "buildings/mid/garage3.png",
        church: game + "buildings/mid/church3.png",
        church_f: game + "buildings/mid/church1.png",
        watchtower: game + "buildings/mid/watchtower3.png",
        academy: game + "buildings/mid/snob1.png",
        smith: game + "buildings/mid/smith3.png",
        place: game + "buildings/mid/place1.png",
        statue: game + "buildings/mid/statue1.png",
        market: game + "buildings/mid/market3.png",
        timber_camp: game + "buildings/mid/wood3.png",
        clay_pit: game + "buildings/mid/stone3.png",
        iron_mine: game + "buildings/mid/iron3.png",
        farm: game + "buildings/mid/farm3.png",
        warehouse: game + "buildings/mid/storage3.png",
        hide: game + "buildings/mid/hide1.png",
        wall: game + "buildings/mid/wall3.png",
        spear: game + "unit/unit_spear.png",
        sword: game + "unit/unit_sword.png",
        axe: game + "unit/unit_axe.png",
        archer: game + "unit/unit_archer.png",
        spy: game + "unit/unit_spy.png",
        light: game + "unit/unit_light.png",
        marcher: game + "unit/unit_marcher.png",
        heavy: game + "unit/unit_heavy.png",
        ram: game + "unit/unit_ram.png",
        catapult: game + "unit/unit_catapult.png",
        knight: game + "unit/unit_knight.png",
        snob: game + "unit/unit_snob.png",
        militia: game + "unit/unit_militia.png",
        wood: game + "holz.png",
        stone: game + "lehm.png",
        iron: game + "eisen.png",
        header: game + "face.png",
        gold: game + "gold.png",
        popFlag: game + "flags/medium/6_5.png",
        haulFlag: game + "flags/medium/8_5.png",
        inventory: game + "icons/inventory.png",
        bonusVillage: game + "/map/b1_left.png",
        questionMark: game + "questionmark.png",
        time: game + "time.png"
};

content = `
    <div id="myTable">
        <div style="float: left;margin-right:10px">
            <table class="inlineTable modes">
		        <tbody>
			        <tr>
				        <th>Építés</th>
				        <th>Szint</th>
				        <th>Fa</th>
				        <th>Agyag</th>
				        <th>Vas</th>
				        <th>Népesség</th>
				        <th>Pont</th>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.main}>Főhadiszállás</td>
				        <td><input type="number" id="headquarters" class="building" maxlength="2" min="1" max="30" autofocus></td>
				        <td class="woodCost">0</td>
				        <td class="stoneCost">0</td>
				        <td class="ironCost">0</td>
				        <td class="popCost">0</td>
				        <td class="points">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.barracks}>Barakk</td>
				        <td><input type="number" id="barracks" class="building" maxlength="2" min="0" max="25"></td>
				        <td class="woodCost">0</td>
				        <td class="stoneCost">0</td>
				        <td class="ironCost">0</td>
				        <td class="popCost">0</td>
				        <td class="points">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.stable}>Istálló</td>
				        <td><input type="number" id="stable" class="building" maxlength="2" min="0" max="20"></td>
				        <td class="woodCost">0</td>
				        <td class="stoneCost">0</td>
				        <td class="ironCost">0</td>
				        <td class="popCost">0</td>
				        <td class="points">0</td>
                    		</tr>
			        <tr>
				        <td><img src=${imageSrc.garage}>Műhely</td>
				        <td><input type="number" id="garage" class="building" maxlength="2" min="0" max="15"></td>
				        <td class="woodCost">0</td>
				        <td class="stoneCost">0</td>
				        <td class="ironCost">0</td>
				        <td class="popCost">0</td>
				        <td class="points">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.church}>Templom</td>
				        <td><input type="number" id="church" class="building" maxlength="1" min="0" max="3"></td>
				        <td class="woodCost">0</td>
				        <td class="stoneCost">0</td>
				        <td class="ironCost">0</td>
				        <td class="popCost">0</td>
				        <td class="points">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.church_f}>Első templom</td>
				        <td><input type="number" id="church_f" class="building" maxlength="1" min="0" max="1"></td>
				        <td class="woodCost">0</td>
				        <td class="stoneCost">0</td>
				        <td class="ironCost">0</td>
				        <td class="popCost">0</td>
				        <td class="points">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.watchtower}>Őrtorony</td>
				        <td><input type="number" id="watchtower" class="building" maxlength="2" min="0" max="20"></td>
				        <td class="woodCost">0</td>
				        <td class="stoneCost">0</td>
				        <td class="ironCost">0</td>
				        <td class="popCost">0</td>
				        <td class="points">0</td>
			        </tr>
                    		<tr>
				        <td><img src=${imageSrc.academy}>Akadémia</td>
				        <td><input type="number" id="academy" class="building" maxlength="1" min="0" max="1"></td>
				        <td class="woodCost">0</td>
				        <td class="stoneCost">0</td>
				        <td class="ironCost">0</td>
				        <td class="popCost">0</td>
				        <td class="points">0</td>
                    		</tr>
			        <tr>
				        <td><img src=${imageSrc.smith}>Kovácsműhely</td>
				        <td><input type="number" id="smith" class="building" maxlength="2" min="0" max="20"></td>
				        <td class="woodCost">0</td>
				        <td class="stoneCost">0</td>
				        <td class="ironCost">0</td>
				        <td class="popCost">0</td>
				        <td class="points">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.place}>Gyülekezőhely</td>
				        <td><input type="number" id="place" class="building" maxlength="1" min="0" max="1"></td>
				        <td class="woodCost">0</td>
				        <td class="stoneCost">0</td>
				        <td class="ironCost">0</td>
				        <td class="popCost">0</td>
				        <td class="points">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.statue}>Szobor</td>
				        <td><input type="number" id="statue" class="building" maxlength="1" min="0" max="1"></td>
				        <td class="woodCost">0</td>
				        <td class="stoneCost">0</td>
				        <td class="ironCost">0</td>
				        <td class="popCost">0</td>
				        <td class="points">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.market}>Piac</td>
				        <td><input type="number" id="market" class="building" maxlength="2" min="0" max="25"></td>
				        <td class="woodCost">0</td>
				        <td class="stoneCost">0</td>
				        <td class="ironCost">0</td>
				        <td class="popCost">0</td>
				        <td class="points">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.timber_camp}>Favágó</td>
				        <td><input type="number" id="timber_camp" class="building" maxlength="2" min="0" max="30"></td>
				        <td class="woodCost">0</td>
				        <td class="stoneCost">0</td>
				        <td class="ironCost">0</td>
				        <td class="popCost">0</td>
				        <td class="points">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.clay_pit}>Agyagbánya</td>
				        <td><input type="number" id="clay_pit" class="building" maxlength="2" min="0" max="30"></td>
				        <td class="woodCost">0</td>
				        <td class="stoneCost">0</td>
				        <td class="ironCost">0</td>
				        <td class="popCost">0</td>
				        <td class="points">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.iron_mine}>Vasbánya</td>
				        <td><input type="number" id="iron_mine" class="building" maxlength="2" min="0" max="30"></td>
				        <td class="woodCost">0</td>
				        <td class="stoneCost">0</td>
				        <td class="ironCost">0</td>
				        <td class="popCost">0</td>
				        <td class="points">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.farm}>Tanya</td>
				        <td><input type="number" id="farm" class="building" maxlength="2" min="1" max="30"></td>
				        <td class="woodCost">0</td>
				        <td class="stoneCost">0</td>
				        <td class="ironCost">0</td>
				        <td class="popCost">0</td>
				        <td class="points">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.warehouse}>Raktár</td>
				        <td><input type="number" id="warehouse" class="building" maxlength="2" min="1" max="30"</td>
				        <td class="woodCost">0</td>
				        <td class="stoneCost">0</td>
				        <td class="ironCost">0</td>
				        <td class="popCost">0</td>
				        <td class="points">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.hide}>Rejtekhely</td>
				        <td><input type="number" id="hide" class="building" maxlength="2" min="0" max="10"></td>
				        <td class="woodCost">0</td>
				        <td class="stoneCost">0</td>
				        <td class="ironCost">0</td>
				        <td class="popCost">0</td>
				        <td class="points">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.wall}>Fal</td>
				        <td><input type="number" id="wall" class="building" maxlength="2" min="0" max="20"></td>
				        <td class="woodCost">0</td>
				        <td class="stoneCost">0</td>
				        <td class="ironCost">0</td>
				        <td class="popCost">0</td>
				        <td class="points">0</td>
			        </tr>
			        <tr>
				        <td></td>
				        <td style="text-align:center">&#8679</td>
				        <td><img src=${imageSrc.wood}>&nbsp<span id="currentBuildingsWoodCost">0</span></td>
				        <td><img src=${imageSrc.stone}>&nbsp<span id="currentBuildingsStoneCost">0</span></td>
				        <td><img src=${imageSrc.iron}>&nbsp<span id="currentBuildingsIronCost">0</span></td>
				        <td class="crosshatchedright" colspan="2">&#x21E6; Aktuális szintek költségei</td>
			        </tr>
			        <tr>
				        <td class="crosshatchedleft">Minimum szint:</td>
				        <td style="text-align:center"><input type="radio" id="minimum" onclick="minimum()" name="name"></td>
			        </tr>
			        <tr>
				        <td class="crosshatchedright">Maximum szint:</td>
				        <td style="text-align:center"><input type="radio" id="maximum" onclick="maximum()" name="name"></td>
			        </tr>
		        </tbody>
	        </table>
        </div>
        <div style="float: left;margin-right:10px">
	        <table class="inlineTable">
		        <tbody>
			        <tr>
				        <th>Egység</th>
				        <th>Mennyiség</th>
				        <th>Képzési idő</th>
				        <th>Épületenként</th>
				        <th>Szállítási kapacitás</th>
				        <th>Tanyahely</th>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.spear}>Lándzsás</td>
				        <td><input type="number" id="spear" class="unit" maxlength="5" min="0" max="32000"></td>
				        <td>
                            <span>
                                <span class="icon header time"></span>
                                <span class="build_time">00:00:00:00</span>
                            </span>
                        </td>
				        <td class="sumbuildtime" rowspan="4">00:00:00:00</td>
				        <td class="haul">0</td>
				        <td class="pop">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.sword}>Kardos</td>
				        <td><input type="number" id="sword" class="unit" maxlength="5" min="0" max="32000"></td>
				        <td>
                            <span>
                                <span class="icon header time"></span>
                                <span class="build_time">00:00:00:00</span>
                            </span>
                        </td>
				        <td class="haul">0</td>
				        <td class="pop">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.axe}>Bárdos</td>
				        <td><input type="number" id="axe" class="unit" maxlength="5" min="0" max="32000"></td>
				        <td>
                            <span>
                                <span class="icon header time"></span>
                                <span class="build_time">00:00:00:00</span>
                            </span>
                        </td>
				        <td class="haul">0</td>
				        <td class="pop">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.archer}>Íjász</td>
				        <td><input type="number" id="archer" class="unit" maxlength="5" min="0" max="32000"></td>
				        <td>
                            <span>
                                <span class="icon header time"></span>
                                <span class="build_time">00:00:00:00</span>
                            </span>
                        </td>
				        <td class="haul">0</td>
				        <td class="pop">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.spy}>Kém</td>
				        <td><input type="number" id="spy" class="unit" maxlength="5" min="0" max="32000"></td>
				        <td>
                            <span>
                                <span class="icon header time"></span>
                                <span class="build_time">00:00:00:00</span>
                            </span>
                        </td>
                        <td class="sumbuildtime" rowspan="4">00:00:00:00</td>
				        <td class="haul">0</td>
				        <td class="pop">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.light}>Könnyűlovas</td>
				        <td><input type="number" id="light" class="unit" maxlength="5" min="0" max="32000"></td>
				        <td>
                            <span>
                                <span class="icon header time"></span>
                                <span class="build_time">00:00:00:00</span>
                            </span>
                        </td>
				        <td class="haul">0</td>
				        <td class="pop">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.marcher}>Lovasíjász</td>
				        <td><input type="number" id="marcher" class="unit" maxlength="5" min="0" max="32000"></td>
				        <td>
                            <span>
                                <span class="icon header time"></span>
                                <span class="build_time">00:00:00:00</span>
                            </span>
                        </td>
				        <td class="haul">0</td>
				        <td class="pop">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.heavy}>Nehézlovas</td>
				        <td><input type="number" id="heavy" class="unit" maxlength="5" min="0" max="32000"></td>
				        <td>
                            <span>
                                <span class="icon header time"></span>
                                <span class="build_time">00:00:00:00</span>
                            </span>
                        </td>
				        <td class="haul">0</td>
				        <td class="pop">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.ram}>Faltörő kos</td>
				        <td><input type="number" id="ram" class="unit" maxlength="5" min="0" max="32000"></td>
				        <td>
                            <span>
                                <span class="icon header time"></span>
                                <span class="build_time">00:00:00:00</span>
                            </span>
                        </td>
				        <td class="sumbuildtime" rowspan="2">00:00:00:00</td>
				        <td class="haul">0</td>
				        <td class="pop">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.catapult}>Katapult</td>
				        <td><input type="number" id="catapult" class="unit" maxlength="5" min="0" max="32000"></td>
				        <td>
                            <span>
                                <span class="icon header time"></span>
                                <span class="build_time">00:00:00:00</span>
                            </span>
                        </td>
				        <td class="haul">0</td>
				        <td class="pop">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.knight}>Lovag</td>
				        <td><input type="number" id="knight" class="unit" maxlength="5" min="0" max="32000"></td>
				        <td>
                            <span>
                                <span class="icon header time"></span>
                                <span class="build_time">00:00:00:00</span>
                            </span>
                        </td>
				        <td class="crosshatchedright"></td>
				        <td class="haul">0</td>
				        <td class="pop">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.snob}>Nemes</td>
				        <td><input type="number" id="snob" class="unit" maxlength="5" min="0" max="32000"></td>
				        <td>
                            <span>
                                <span class="icon header time"></span>
                                <span class="build_time">00:00:00:00</span>
                            </span>
                        </td>
				        <td class="crosshatchedright"></td>
				        <td class="haul">0</td>
				        <td class="pop">0</td>
			        </tr>
			        <tr class="spaceUnder">
				        <td><img src=${imageSrc.militia}>Milícia</td>
				        <td><input type="number" id="militia" class="unit" maxlength="5" min="0" max="32000"></td>
				        <td>
                            <span>
                                <span class="icon header time"></span>
                                <span class="build_time">00:00:00:00</span>
                            </span>
                        </td>
				        <td class="crosshatchedright"></td>
				        <td class="haul">0</td>
				        <td class="pop">0</td>
			        </tr>
                    <tr class="separator" />
		        </tbody>
            </table>
            <table class="inlineTable bonus">
                <tbody>
			        <tr>
                        <th colspan="3">Nyersanyag bónusz<img src=${imageSrc.questionMark} title="${helpTooltip.resource}" class="tooltip"></th>
                        <th class="space"></th>
                        <th colspan="3">Népesség bónusz<img src=${imageSrc.questionMark} title="${helpTooltip.pop}" class="tooltip"></th>
                        <th class="space"></th>
                        <th colspan="2">Teherbírás bónusz<img src=${imageSrc.questionMark} title="${helpTooltip.haul}" class="tooltip"></th>
                    </tr>
			        <tr>
				        <td><img src=${imageSrc.timber_camp}><input class="bon" id="woodBonus" type="number" min="0" max="500" value="0"></td>
				        <td><img src=${imageSrc.clay_pit}><input class="bon" id="stoneBonus" type="number" min="0" max="500" value="0"></td>
				        <td><img src=${imageSrc.iron_mine}><input class="bon" id="ironBonus" type="number" min="0" max="500" value="0"></td>
                        <td class="space"></td>
				        <td><img src=${imageSrc.bonusVillage}><input class="bon" id="popBonusVillage" type="number" min="0" max="500" value="0"></td>
				        <td><img src=${imageSrc.popFlag}><input class="bon" id="popFlag" type="number" min="0" max="500" value="0"></td>
				        <td><img src=${imageSrc.inventory}><input class="bon" id="popInventory" type="number" min="0" max="500" value="0"></td>
                        <td class="space"></td>
				        <td><img src=${imageSrc.haulFlag}><input class="bon" id="haulFlag" type="number" min="0" max="300" value="0"></td>
				        <td><img src=${imageSrc.inventory}><input class="bon" id="haulInventory" type="number" min="0" max="500" value="0"></td>
                    </tr>
                    <tr class="separator" />
		        </tbody>
            </table>
            <table class="inlineTable bonus">
                <tbody>
                    <tr>
                        <th colspan="4">Képzés bónusz<img src=${imageSrc.questionMark} title="${helpTooltip.recruit}" class="tooltip"></th>
                        <th class="space"></th>
                        <th colspan="2">Piac bónusz<img src=${imageSrc.questionMark} title="${helpTooltip.market}" class="tooltip"></th>
                        <th class="space"></th>
                        <th colspan="2">Raktár bónusz<img src=${imageSrc.questionMark} title="${helpTooltip.storage}" class="tooltip"></th>
                    </tr>
                    <tr>
				        <td><img src=${imageSrc.barracks}><input class="bon" id="barracksBonus" type="number" min="0" max="500" value="0"></td>
				        <td><img src=${imageSrc.stable}><input class="bon" id="stableBonus" type="number" min="0" max="500" value="0"></td>
				        <td><img src=${imageSrc.garage}><input class="bon" id="garageBonus" type="number" min="0" max="500" value="0"></td>
				        <td><img src=${imageSrc.academy}><input class="bon" id="academyBonus" type="number" min="0" max="500" value="0"></td>
                        <td class="space"></td>
				        <td><img src=${imageSrc.bonusVillage}><input class="bon" id="merchantsBonusVillage" type="number" min="0" max="500" value="0"></td>
				        <td><img src=${imageSrc.inventory}><input class="bon" id="merchantsInventory" type="number" min="0" max="500" value="0"></td>
                        <td class="space"></td>
				        <td><img src=${imageSrc.bonusVillage}><input class="bon" id="storageBonusVillage" type="number" min="0" max="500" value="0"></td>
				        <td><img src=${imageSrc.inventory}><input class="bon" id="storageInventory" type="number" min="0" max="500" value="0"></td>
			        </tr>
                    <tr class="separator" />
		        </tbody>
            </table>
            <table class="inlineTable border"">
                <tbody>
                    <tr>
                        <td>
                            <label for="sablon">Profilok: </label>
                            <select id="sablon">
                                <option selected hidden>opciók</option>
                            </select>
                            &nbsp;
                            <input type="button" value="Mentés" onclick="store()">
                            &nbsp;
                            <input type="button" value="Törlés" onclick="removeOptions()">
                            &nbsp;
                            <input type="button" value="Export" onclick="exports()">
                            &nbsp;
                            <input type="button" value="Import" onclick="imports()">
                            <b><code>Created by <a href="${forumURL}" target="_blank">öreg</a></code></b>
                        </td>
                    </tr>
		        </tbody>
            </table>
        </div>
        <div style="float: left;margin-right:10px">
	        <table class="inlineTable modesb">
		        <tbody>
			        <tr>
				        <th colspan="2">Épületek tulajdonságai</th>
			        </tr>
			        <tr>
				        <td style="width: 50%"><img src=${imageSrc.header}>Tanya férőhely</td>
				        <td class="property" id="population" style="width: 50%">0</td>
			        </tr>
			        <tr>
				        <td style="width: 50%"><img src=${imageSrc.header}>Népesség-foglalt férőhely</td>
				        <td class="property" id="locked" style="width: 50%">0</td>
			        </tr>
			        <tr>
				        <td style="width: 50%"><img src=${imageSrc.header}>Népesség-még szabad férőhely</td>
				        <td class="property" id="free" style="width: 50%">0</td>
			        </tr>
			        <tr>
				        <td style="width: 50%"><img src=${imageSrc.gold}>Pontok</td>
				        <td class="property" id="sumPoints" style="width: 50%">0</td>
			        </tr>
			        <tr>
				        <td style="width: 50%"><img src=${imageSrc.hide}>Rejtett nyersanyagok</td>
				        <td class="property" id="hiddenResources" style="width: 50%">0</td>
			        </tr>
			        <tr>
				        <td style="width: 50%"><img src=${imageSrc.market}>Kereskedők száma</td>
				        <td class="property" id="merchants" style="width: 50%">0</td>
			        </tr>
			        <tr>
				        <td style="width: 50%"><img src=${imageSrc.warehouse}>Raktár kapacitás</td>
				        <td class="property" id="capacity" style="width: 50%">0</td>
			        </tr>
			        <tr>
				        <td style="width: 50%"><img src=${imageSrc.wall}>Fal védelmi bónusz</td>
				        <td class="property" id="wallBonus" style="width: 50%">0</td>
			        </tr>
			        <tr>
				        <td style="width: 50%"><img src=${imageSrc.timber_camp}>Fa termelés</td>
				        <td class="property" id="woodProd" style="width: 50%">0</td>
			        </tr>
			        <tr>
				        <td style="width: 50%"><img src=${imageSrc.clay_pit}>Agyag termelés</td>
				        <td class="property" id="stoneProd" style="width: 50%">0</td>
			        </tr>
			        <tr>
				        <td style="width: 50%"><img src=${imageSrc.iron_mine}>Vas termelés</td>
				        <td class="property" id="ironProd" style="width: 50%">0</td>
			        </tr>
                    <tr class="separator" />
		        </tbody>
	        </table>
            <table class="inlineTable modesc">
                <tbody>
			        <tr>
				        <th colspan="6">Költségek</th>
			        </tr>
			        <tr>
				        <td>Egységek</td>
				        <td></td>
				        <td>Épületek</td>
				        <td></td>
				        <td>Teljes</td>
				        <td></td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.wood}></td>
				        <td id="unitsWoodCost">0</td>
				        <td><img src=${imageSrc.wood}></td>
				        <td id="buildingsWoodCost">0</td>
				        <td><img src=${imageSrc.wood}></td>
				        <td id="sumUnitsAndBuildingsWoodCost">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.stone}></td>
				        <td id="unitsStoneCost">0</td>
				        <td><img src=${imageSrc.stone}></td>
				        <td id="buildingsStoneCost">0</td>
				        <td><img src=${imageSrc.stone}></td>
				        <td id="sumUnitsAndBuildingsStoneCost">0</td>
			        </tr>
			        <tr>
				        <td><img src=${imageSrc.iron}></td>
				        <td id="unitsIronCost">0</td>
				        <td><img src=${imageSrc.iron}></td>
				        <td id="buildingsIronCost">0</td>
				        <td><img src=${imageSrc.iron}></td>
				        <td id="sumUnitsAndBuildingsIronCost">0</td>
			        </tr>
		        </tbody>
            </table>
        </div>
    </div>
`;

let player = game_data.player.name;
let world = game_data.world;
let script = {
        name: "Unit and building simulator",
        version: "v1.3"
}
let issue = {
    text: ["|Player|World|Script name|Script version|",
           "|---|---|---|---|",
           `|${player}|${world}|${script.name}|${script.version}|`,
           "",
           "Issue:"].join("\n")
};

function sendMessage() {
    createIssue("Hibabejelentesek","oreg-kh","hiba/észrevétel",issue.text,token)
}

sideBarHTML = `
    <div class="gear" onclick="openNav()"><img src=${gear}></div>
    <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
        <textarea id="issueText" placeholder="Hiba leírása..." rows="10" cols="50"></textarea>
        <button id="sendIssue" type="button" onclick="sendMessage()">Küldés</button>
        </br>
        <textarea id="imageURL" placeholder="Kép link" rows="1" cols="50"></textarea>
        <button id="addURL" type="button" onclick="addURL()">Hozzáadás</button>
    </div>
`;

function addURL() {
    var issueText = $("#issueText");
    var imageURL = $("#imageURL").val();
    issueText.val(issueText.val() + addBBcodeToURL(imageURL));
    clearURL();
}

function clearURL() {
    $("#imageURL").val("");
}

function addBBcodeToURL(url) {
   return `![issue-image](${url})`;
}

function createIssue(repoName, repoOwner, issueTitle, issueBody, accessToken) {
    var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues";
    var text = $("#issueText").val();
    $.ajax({
        url: url,
        type: "POST",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "token " + accessToken);
        },
        data: JSON.stringify({
            title: issueTitle, 
            body: issueBody +"\n" + text
        }),
        success: function(msg){
            UI.SuccessMessage("Az üzeneted sikeresen továbbítottuk!", 5000);        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            UI.ErrorMessage("Valami hiba történt, nem sikerült elküldeni az adatokat!", 5000);
        }
    })
}

function createSideBar() {
    $("body").append(sideBarHTML);
}

function openNav() {
    document.getElementById("mySidenav").style.width = "390px";
}

function closeNav() {
    spinMainIcon(500, 180);
    document.getElementById("mySidenav").style.width = "0px";
}

function createHTML() {
    Dialog.show("calculator", content, function() {
        byebye()
    }),
    createSideBar()
    buildingsInformation()
    unitsInformation()
    configInformation()
    unitsResources()
    loadSelectMenu()
}
createHTML()

function createObject() {
    for (const key of buildings) {
        obj.buildingsObj[key] = new Object;
    }
    for (const key of units) {
        obj.unitsObj[key] = new Object;
    }
    return true;
}

// épületinformációk lekérdezése
function getBuildingsInformation() {
    return $.ajax({
        url: `https://${document.domain}/interface.php?func=get_building_info`,
        type: 'GET',
        async: true,
        success: function(xml) {},
        error: function(xhr, statusText, error) {
            $(".popup_box_container").remove();
            console.log(errorText.buildings + error);
            UI.ErrorMessage(errorText.buildings + error,8000);
        }
    })
}

async function buildingsInformation() {
    await createObject();
    var xml = await getBuildingsInformation();
    for (var i = 0; i < buildings.length; i++) {
        for (var k = 0; k < datas.length; k++) {
            if ($(xml).find(`config > ${buildings[i]}`).length > 0) {
                config = Number($(xml).find(`config > ${buildings[i]} > ${datas[k]}`)[0].innerHTML);
                Object.defineProperty(obj.buildingsObj[buildings[i]], datas[k], {value:config});
                Object.defineProperty(obj.buildingsObj[buildings[i]], "exist", {value:true});
            } else {
                disableBuilding(buildings[i]);
                Object.defineProperty(obj.buildingsObj[buildings[i]], "exist", {value:false});
                if (buildings[i] == "statue") {
                    disableUnit("knight");
                }
            }
        }
    }
}

// egység információk lekérdezése
function getUnitsInformation() {
    return $.ajax({
        url: `https://${document.domain}/interface.php?func=get_unit_info`,
        type: 'GET',
        async: true,
        success: function(xml) {},
        error: function(xhr, statusText, error) {
            $(".popup_box_container").remove();
            console.log(errorText.units + error);
            UI.ErrorMessage(errorText.units + error,8000);
        }
    })
}

async function unitsInformation() {
    await createObject();
    var xml = await getUnitsInformation();
    for (var i = 0; i < units.length; i++) {
        for (var k = 0; k < dat.length; k++) {
            if ($(xml).find(`config > ${units[i]}`).length > 0) {
                config = Number($(xml).find(`config > ${units[i]} > ${dat[k]}`)[0].innerHTML);
                Object.defineProperty(obj.unitsObj[units[i]], dat[k], {value:config});
                Object.defineProperty(obj.unitsObj[units[i]], "exist", {value:true});
            } else {
                if (units[i].includes("archer")) {
                    disableUnit(units[i]);
                    Object.defineProperty(obj.unitsObj[units[i]], "exist", {value:false});
                }
            }
        }
    }
    return true;
}

// szerver sebesség lekérdezése
function getConfigInformation() {
    return $.ajax({
        url: `https://${document.domain}/interface.php?func=get_config`,
        type: 'GET',
        async: true,
        success: function(xml) {},
        error: function(xhr, statusText, error) {
            $(".popup_box_container").remove();
            console.log(errorText.speed + error);
            UI.ErrorMessage(errorText.speed + error,8000);
        }
    })
}

async function configInformation() {
    await createObject();
    var xml = await getConfigInformation();
    config = (Number($(xml).find("config > speed").text()));
    Object.defineProperty(obj.world, "worldSpeed", {value:config});
}

// egység költség lekérdezése
function getUnitsResources() {
    let promise =  new Promise(function(resolve, reject) {
        TribalWars.get("api", {ajax: "data", screen: "unit_info"}, resolve, reject) 
    })
    promise.then(
        function(result) {
            console.log("success")
        },
        function(error) {    
            $(".popup_box_container").remove();
            console.log(errorText.unitsCost);
            UI.ErrorMessage(errorText.unitsCost,8000);
        }
    );
    return promise;
}

async function unitsResources() {
    await createObject();
    await unitsInformation();
    var responseText = await getUnitsResources();
    for (var i = 0; i < units.length; i++) {
        if (obj.unitsObj[units[i]].exist === true) {
            Object.defineProperty(obj.unitsObj[units[i]], "wood", {value:responseText.unit_data[units[i]].wood});
            Object.defineProperty(obj.unitsObj[units[i]], "stone", {value:responseText.unit_data[units[i]].stone});
            Object.defineProperty(obj.unitsObj[units[i]], "iron", {value:responseText.unit_data[units[i]].iron});
        }
    }
}

// style hozzáadása a HTML-hez
function initCss(css) {
    $(`<style>${css}</style>`).appendTo("body");
}

initCss(`
    #popup_box_calculator {
        width: 1500px !important;
    }
    div#myTable {
        overflow-x: auto;
        max-width: 100%;
        display: flex;
        white-space: nowrap;
    }
    table.inlineTable {
        width: auto;
        vertical-align: top;
        border-collapse: collapse;
        border-spacing: 0px;
        margin: 0 10px;
    }
    table.inlineTable th {
        border: 1px solid black;
        padding: 3px;
        text-align: center;
    }
    table.inlineTable td {
        border: 1px solid black;
        padding: 3px;
        text-align: left;
    }
    table.modes img {
        vertical-align: bottom;
        height: 18px;
        width: 22px;
    }
    table.modesb img {
        vertical-align: bottom;
        height: 18px;
        width: 18px;
    }
    table.modesc img {
        vertical-align: bottom;
    }
    table.modes tr:nth-child(8) img {
        width: 18px !important;
    }
    table.modes tr:nth-child(12) img {
        width: 18px !important;
    }
    table.modes tr:nth-child(21) img {
        vertical-align: bottom;
        height: 16px !important;
        width: 18px !important;
    }
    table.bonus tr:first-child img {
        vertical-align: bottom;
        height: 13px;
        width: 13px;
    }
    table.bonus tr:nth-child(2) img {
        vertical-align: bottom;
        margin-right: 1px;
        height: 18px;
        width: 22px;
    }
    table.bonus tr:nth-child(2) input {
        width: 35px;
    }
    table.inlineTable tr:nth-child(even) {
        background-color: #fff5da;
    }
    input.building {
        width: 30px;
    }
    input.unit {
        width: 70px;
    }
    table.inlineTable tr:nth-child(odd) {
        background-color: #f0e2be;
    }
    table tr.separator {
        height: 20px;
    }
    .space {
        background: none !important;
        border: none !important;
        width: 5px;
    }
    .border td {
         border: none !important;
    }
    .crosshatchedright {
        background: repeating-linear-gradient(-45deg,rgba(0, 0, 0, 0.2),
                    rgba(0, 0, 0, 0.2) 5px,
                    rgba(0, 0, 0, 0.3) 5px,
                    rgba(0, 0, 0, 0.3) 8px),
                    url(http://s3-us-west-2.amazonaws.com/s.cdpn.io/3/old_map_@2X.png);
    }
    .crosshatchedleft {
        background: repeating-linear-gradient(45deg,rgba(0, 0, 0, 0.2),
                    rgba(0, 0, 0, 0.2) 5px,
                    rgba(0, 0, 0, 0.3) 5px,
                    rgba(0, 0, 0, 0.3) 8px),
                    url(http://s3-us-west-2.amazonaws.com/s.cdpn.io/3/old_map_@2X.png);
    }
    .sumbuildtime, .haul, .pop, .build_time, .woodCost, .stoneCost, .ironCost, .popCost, .points {
        text-align: center !important;
    }
    .property {
        text-align: right !important;
    }
    .sidenav {
        height: 100%;
        width: 0px;
        position: fixed;
        z-index: 19;
        top: 35px;
        left: 0px;
        background-color: #111;
        overflow-x: hidden;
        transition: 0.5s;
        padding-top: 60px;
    }

    .sidenav a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 25px;
        color: #818181;
        display: block;
        transition: 0.3s;
    }
    .sidenav a:hover {
        color: #f1f1f1;
    }
    .sidenav .closebtn {
        position: absolute;
        top: 0;
        right: 0px;
        font-size: 36px;
        margin-left: 50px;
    }
    @media screen and (max-height: 450px) {
        .sidenav {padding-top: 15px;}
        .sidenav a {font-size: 18px;}
    }
    .gear img {
        z-index: 12000;
        position: absolute;
        top: 3px;
        cursor: pointer;
	    width: 45px;
	    height: 45px;
    }
    textarea {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    button#sendIssue, button#addURL {
        display: block;
        margin-left: auto;
        margin-right: 6.5px; 
        cursor: pointer;
    }
`);

// új opció hozzáadása a legördülő listához
function createOption(option_name) {
  $("#sablon").append(`<option>${option_name}</option>`)
}

// eltárolja az inputokat egy tömbben
function getAllInputValue() {
    var array = [];
    for (var i = 0; i < 48; i++) {
        array.push($("#myTable").find("input").eq(i).val());
    }
    var name = prompt("Kérlek add meg milyen néven szeretnéd menteni a beállításaidat!");
    return {array,name}
}

// eltárolja az inputokat localStorage-ban, hozzáad egy új opciót a profilokhoz
function store() {
    var pre = getAllInputValue();
    name = "öregsaver_" + pre.name;
    var object = {
            "inputs":    pre.array
    };
    localStorage.setItem(name, btoa(JSON.stringify(object)));
    createOption(pre.name);
}

// profilok betöltése a legördülő listába
function loadSelectMenu() {
    for(var key in localStorage) {
        if (key.includes("öregsaver")) {
            createOption(key.split("_")[1]);
        }
    }
}

// a kiválasztott elem eltávolítása a legördülő listából
function removeOptions() {
    var item = $("#sablon").find(":selected");
    var optionName = item.text();
    item.remove();
    for(var key in localStorage) {
        if (key == `öregsaver_${optionName}`) {
            localStorage.removeItem(key);
        }
    } 
}

// a kiválasztott profil exportálása
function exports() {
    var item = $("#sablon").find(":selected");
    var optionName = item.text();
    if (optionName != "opciók") {
        var val = localStorage.getItem(`öregsaver_${optionName}`);
        var key = optionName;
        prompt(prompts.text,key + "," + val);
    }
}

// profil importálása
function imports() {
    var importCode = prompt("Illeszd be az exportáláskor kapott kódot:");
    var key = importCode.split(",")[0];
    var val = importCode.split(",")[1];
    localStorage.setItem(`öregsaver_${key}`, val);
    createOption(key);
}

// eseménykezelő a profil kiválasztásakor
$("#sablon").on("click", function(event) {
    var item = $("#sablon").find(":selected");
    var optionName = item.text();
    if (optionName != "opciók") {
        var val = localStorage.getItem(`öregsaver_${optionName}`);
        var inputs = JSON.parse(atob(val)).inputs;
        for (var i = 0; i < 48; i++) {
            $("#myTable").find("input").eq(i).val(inputs[i]);
        }
    }
    buildingsFunctions();
    unitsFunctions();
    buildingsAndUnitsFunctions();
})

// üzenet létrehozása
function createMessage(type,message,time) {
    UI[type](message,time);
}

// visszaadja, hogy teljesült-e az építéshez szükséges előfeltétel
function buildingsLevel(building,level) {
    return Number($("#" + building).val()) >= level;
}

// engedélyezi az egységet, ha a képzéshez szükséges előfeltételek teljesültek, amelyik egység nem létezik a szerveren, azt nem oldja fel
function enableUnit(unit) {
    if (obj.unitsObj[unit].exist === false) {
        return document.getElementById(unit).disabled = true;
    } else {
        return document.getElementById(unit).disabled = false;
    }
}

// engedélyezi az épületet, ha az építéshez szükséges előfeltételek teljesültek, amelyik épület nem létezik a szerveren, azt nem oldja fel
function enableBuilding(building) {
    if (obj.buildingsObj[building].exist === false) {
        return document.getElementById(building).disabled = true;
    } else {
        if (building == "snob") {
            building = "academy";
        }
        return document.getElementById(building).disabled = false;
    }
}

// egység letiltása
function disableUnit(unit) {
    return document.getElementById(unit).disabled = true;
}

// épület letiltása
function disableBuilding(building) {
    if (building == "snob") {
        building = "academy";
    }
    return document.getElementById(building).disabled = true;
}

// letilt minden egységet, kivéve a lándzsást és a kardost, mert azoknak nincs előfeltétele és minden szerveren léteznek
function resetUnit() {
    for (var i = 2; i < units.length-1; i++) {
        disableUnit(units[i]);
    }
}
resetUnit();

// letilt minden épületet, aminek van előfeltétele
function resetBuilding() {
    var building = ["barracks", "stable", "garage", "church", "watchtower", "academy", "smith", "market", "wall"];
    for (var i = 0; i < building.length; i++) {
        disableBuilding(building[i]);
    }
}
resetBuilding();

// az épület szintek fa költségét számolja
function woodCost() {
    for (var i = 0; i < buildings.length; i++) {
        building_level = Number($(".building").eq(i).val());
        wood = obj.buildingsObj[buildings[i]].wood;
        wood_factor = obj.buildingsObj[buildings[i]].wood_factor;
        if (building_level == 0 || building_level == "") {
            $(".woodCost").eq(i).text(0);
        } else {
            text = Math.round(Math.pow(wood_factor, building_level - 1) * wood);
            $(".woodCost").eq(i).text(numberWithCommas(text));
        }
    }
}

// az épület szintek agyag költségét számolja
function stoneCost() {
    for (var i = 0; i < buildings.length; i++) {
        building_level = Number($(".building").eq(i).val());
        stone = obj.buildingsObj[buildings[i]].stone;
        stone_factor = obj.buildingsObj[buildings[i]].stone_factor;
        if (building_level == 0 || building_level == "") {
            $(".stoneCost").eq(i).text(0);
        } else {
            text = Math.round(Math.pow(stone_factor, building_level - 1) * stone);
            $(".stoneCost").eq(i).text(numberWithCommas(text));
        }
    }
}

// az épület szintek vas költségét számolja
function ironCost() {
    for (var i = 0; i < buildings.length; i++) {
        building_level = Number($(".building").eq(i).val());
        iron = obj.buildingsObj[buildings[i]].iron;
        iron_factor = obj.buildingsObj[buildings[i]].iron_factor;
        if (building_level == 0 || building_level == "") {
            $(".ironCost").eq(i).text(0);
        } else {
            text = Math.round(Math.pow(iron_factor, building_level - 1) * iron);
            $(".ironCost").eq(i).text(numberWithCommas(text));
        }
    }
}

// az épület szintek népesség költségét számolja
function popCost() {
    for (var i = 0; i < buildings.length; i++) {
        building_level = Number($(".building").eq(i).val());
        pop = obj.buildingsObj[buildings[i]].pop;
        pop_factor = obj.buildingsObj[buildings[i]].pop_factor;
        if (building_level == 0 || building_level == "") {
            $(".popCost").eq(i).text(0);
        } else {
            text = Math.round(Math.pow(pop_factor, building_level - 1) * pop);
            $(".popCost").eq(i).text(numberWithCommas(text));
        }
    }
    return true;
}

// az épület szintek pontját számolja
function points() {
    for (var i = 0; i < buildings.length; i++) {
        building_level = Number($(".building").eq(i).val());
        build_time_factor = obj.buildingsObj[buildings[i]].build_time_factor;
        if (building_level == 0 || building_level == "") {
            $(".points").eq(i).text(0);
        } else {
            text = Math.round(Math.pow(build_time_factor, building_level - 1) * firstLevelPoint[i]);
            $(".points").eq(i).text(numberWithCommas(text));
        }
    }
    return true;
}

// a falu pontszámát számolja
async function sumPoints() {
    var result = await points();
    var sum = 0;
    for (var i = 0; i < buildings.length; i++) {
        point = Number($(".points").eq(i).text().replace(".",""));
        sum += point;
    }
    $("#sumPoints").text(numberWithCommas(sum));
}

// a rejtekhely által elrejtett nyersanyagokat számolja
function hiddenResources() {
    hide_level = Number($("#hide").val());
    if (hide_level == 0 || hide_level == "") {
        $("#hiddenResources").text(0);
    } else {
        text = Math.pow((4/3), hide_level - 1) * 150;
        if (hide_level > 7) {
            $("#hiddenResources").text(numberWithCommas(roundToNearestFive(text)));
        } else {
            $("#hiddenResources").text(roundToNearestInteger(text));
        }
    }
}

// a kereskedők számát számolja
function numberOfMerchants() {
    market_level = Number($("#market").val());
    if (market_level >= 10) {
        text = Math.pow(market_level - 10, 2) + 10;
    } else if (market_level == "") {
        text = 0;
    } else {
        text = market_level;
    }
    $("#merchants").text(text);
    return text;
}

// a raktár méretét számolja
function capacity() {
    warehouse_level = Number($("#warehouse").val());
    if (warehouse_level == 0 || warehouse_level == "") {
        $("#capacity").text(0);
    } else {
        text = Math.pow(1.2294934, warehouse_level - 1) * 1000;
        $("#capacity").text(numberWithCommas(roundToNearestInteger(text)));
    }
    return text;
}

// a fal bónuszt számolja
function wallBonus() {
    wall_level = Number($("#wall").val());
    text = (Math.pow(1.037, wall_level) - 1) * 100;
    $("#wallBonus").text(roundToNearestInteger(text) + "%");
}

// a fa termelést számolja
function woodProd() {
    wood_level =  Number($("#timber_camp").val());
    if (wood_level == 0 || wood_level == "") {
        wood = 0;
    } else {
        wood = roundToNearestInteger(Math.pow(1.163118, wood_level - 1) * 30);
    }
    $("#woodProd").text(numberWithCommas(wood));
    return {wood};
}

// a agyag termelést számolja
function stoneProd() {
    stone_level =  Number($("#clay_pit").val());
    if (stone_level == 0 || stone_level == "") {
        stone = 0;
    } else {
        stone = roundToNearestInteger(Math.pow(1.163118, stone_level - 1) * 30);
    }
    $("#stoneProd").text(numberWithCommas(stone));
    return {stone};
}

// a vas termelést számolja
function ironProd() {
    iron_level =  Number($("#iron_mine").val());
    if (iron_level == 0 || iron_level == "") {
        iron = 0;
    } else {
        iron = roundToNearestInteger(Math.pow(1.163118, iron_level - 1) * 30);
    }
    $("#ironProd").text(numberWithCommas(iron));
    return {iron};
}

// a tanyahelyet számolja
function population() {
    pop_level = Number($("#farm").val());
    if (pop_level == 0 || pop_level == "") {
        text = 0;
    } else {
        text = Math.pow(1.172103, pop_level - 1) * 240;
    }
    $("#population").text(numberWithCommas(roundToNearestInteger(text)));
    return text;
}

// az egységek képzési idejét számolja
function buildTimeOfUnit() {
    barracks_level = Number($("#barracks").val());
    stable_level = Number($("#stable").val());
    garage_level = Number($("#garage").val());
    statue_level = Number($("#statue").val());
    academy_level = Number($("#academy").val());

    for (var i = 0; i < units.length; i++) {
        build_time = obj.unitsObj[units[i]].build_time;
        piece = Number($(".unit").eq(i).val());
        if (i < 4) {
            if (!build_time || barracks_level == 0 || barracks_level == "") {
                $(".build_time").eq(i).text("00:00:00:00");
            } else {
                barracksTime = 2/3 * build_time * Math.pow(1.06,-barracks_level) * piece / recruitBonus().barracksBonus;
                text = secondsToDhms(roundUpToNearestInteger(barracksTime));
                $(".build_time").eq(i).text(text);
            }
        }
        if (3 < i && i < 8) {
            if (!build_time || stable_level == 0 || stable_level == "") {
                $(".build_time").eq(i).text("00:00:00:00");
            } else {
                stableTime = 2/3 * build_time * Math.pow(1.06,-stable_level) * piece / recruitBonus().stableBonus;
                text = secondsToDhms(roundUpToNearestInteger(stableTime));
                $(".build_time").eq(i).text(text);
            }
        }
        if (7 < i && i < 10) {
            if (!build_time || garage_level == 0 || garage_level == "") {
                $(".build_time").eq(i).text("00:00:00:00");
            } else {
                garageTime = 2/3 * build_time * Math.pow(1.06,-garage_level) * piece / recruitBonus().garageBonus;
                text = secondsToDhms(roundUpToNearestInteger(garageTime));
                $(".build_time").eq(i).text(text);
            }
        }
        if (i == 10) {
            if (!build_time || statue_level == 0 || statue_level == "") {
                $(".build_time").eq(i).text("00:00:00:00");
            } else {
                text = secondsToDhms(build_time * piece);
                $(".build_time").eq(i).text(text);
            }
        }
        if (i == 11) {
            if (!build_time || academy_level == 0 || academy_level == "") {
                $(".build_time").eq(i).text("00:00:00:00");
            } else {
                academyTime = 2/3 * build_time * Math.pow(1.06,-academy_level) * piece / recruitBonus().academyBonus;
                text = secondsToDhms(roundUpToNearestInteger(academyTime));
                $(".build_time").eq(i).text(text);
            }
        }
        if (i == 12) {
            $(".build_time").eq(i).text("00:00:00:00");
        }
    }
    return true
}

// az egységek teherbírását számolja
function unitsHaul() {
    barracks_level = Number($("#barracks").val());
    stable_level = Number($("#stable").val());
    garage_level = Number($("#garage").val());
    statue_level = Number($("#statue").val());
    academy_level = Number($("#academy").val());

    for (var i = 0; i < units.length; i++) {
        carry = Number(obj.unitsObj[units[i]].carry);
        if (i < 4) {
            if (!carry || barracks_level == 0 || barracks_level == "") {
                $(".haul").eq(i).text(0);
            } else {
                piece = Number($(".unit").eq(i).val());
                text = carry * piece;
                $(".haul").eq(i).text(numberWithCommas(text));
            }
        }
        if (3 < i && i < 8) {
            if (!carry || stable_level == 0 || stable_level == "") {
                $(".haul").eq(i).text(0);
            } else {
                piece = Number($(".unit").eq(i).val());
                text = carry * piece;
                $(".haul").eq(i).text(numberWithCommas(text));
            }
        }
        if (7 < i && i < 10) {
            if (!carry || garage_level == 0 || garage_level == "") {
                $(".haul").eq(i).text(0);
            } else {
                piece = Number($(".unit").eq(i).val());
                text = carry * piece;
                $(".haul").eq(i).text(numberWithCommas(text));
            }
        }
        if (i == 10) {
            if (!carry || statue_level == 0 || statue_level == "") {
                $(".haul").eq(i).text(0);
            } else {
                piece = Number($(".unit").eq(i).val());
                text = carry * piece;
                $(".haul").eq(i).text(numberWithCommas(text));
            }
        }
        if (i == 11) {
            if (!carry || academy_level == 0 || academy_level == "") {
                $(".haul").eq(i).text(0);
            } else {
                piece = Number($(".unit").eq(i).val());
                text = carry * piece;
                $(".haul").eq(i).text(numberWithCommas(text));
            }
        }
        if (i == 12) {
            $(".haul").eq(i).text(0);
        }
    }
}

// az egységek által lefoglalt tanyahelyet számolja
function unitsPop() {
    barracks_level = Number($("#barracks").val());
    stable_level = Number($("#stable").val());
    garage_level = Number($("#garage").val());
    statue_level = Number($("#statue").val());
    academy_level = Number($("#academy").val());

    for (var i = 0; i < units.length; i++) {
        pop = Number(obj.unitsObj[units[i]].pop);
        if (i < 4) {
            if (!pop || barracks_level == 0 || barracks_level == "") {
                $(".pop").eq(i).text(0);
            } else {
                piece = Number($(".unit").eq(i).val());
                text = pop * piece;
                $(".pop").eq(i).text(numberWithCommas(text));
            }
        }
        if (3 < i && i < 8) {
            if (!pop || stable_level == 0 || stable_level == "") {
                $(".pop").eq(i).text(0);
            } else {
                piece = Number($(".unit").eq(i).val());
                text = pop * piece;
                $(".pop").eq(i).text(numberWithCommas(text));
            }
        }
        if (7 < i && i < 10) {
            if (!pop || garage_level == 0 || garage_level == "") {
                $(".pop").eq(i).text(0);
            } else {
                piece = Number($(".unit").eq(i).val());
                text = pop * piece;
                $(".pop").eq(i).text(numberWithCommas(text));
            }
        }
        if (i == 10) {
            if (!pop || statue_level == 0 || statue_level == "") {
                $(".pop").eq(i).text(0);
            } else {
                piece = Number($(".unit").eq(i).val());
                text = pop * piece;
                $(".pop").eq(i).text(numberWithCommas(text));
            }
        }
        if (i == 11) {
            if (!pop || academy_level == 0 || academy_level == "") {
                $(".pop").eq(i).text(0);
            } else {
                piece = Number($(".unit").eq(i).val());
                text = pop * piece;
                $(".pop").eq(i).text(numberWithCommas(text));
            }
        }
        if (i == 12) {
            $(".pop").eq(i).text(0);
        }
    }
    return true
}

// épületenként összegzi az egységek képzési idejét
async function sumBuildTimeOfUnit() {
    var result = await buildTimeOfUnit();
    var seconds = 0;
    var $seconds = 0;
    var $$seconds = 0;
    for (var i = 0; i < units.length; i++) {
        if (i < 4) {
            time = $(".build_time").eq(i).text().split(":");
            seconds += Number(time[0]) * 86400 +  Number(time[1]) * 3600 +  Number(time[2]) * 60 +  Number(time[3]);
            text = secondsToDhms(seconds)
            $(".sumbuildtime").eq(0).text(text);
        }
        if (3 < i && i < 8) {
            time = $(".build_time").eq(i).text().split(":");
            $seconds += Number(time[0]) * 86400 +  Number(time[1]) * 3600 +  Number(time[2]) * 60 +  Number(time[3]);
            text = secondsToDhms($seconds)
            $(".sumbuildtime").eq(1).text(text);
        }
        if (7 < i && i < 10) {
            time = $(".build_time").eq(i).text().split(":");
            $$seconds += Number(time[0]) * 86400 +  Number(time[1]) * 3600 +  Number(time[2]) * 60 +  Number(time[3]);
            text = secondsToDhms($$seconds)
            $(".sumbuildtime").eq(2).text(text);
        }
    }
}

// a foglalt tanyahelyet számolja
async function lockedPop() {
    var lockedsum = 0;
    buildingpop = $(".popCost");
    unitpop = $(".pop");

    var res = await popCost();
    for (var i = 0; i < buildingpop.length; i++) {
        lockedsum += Number(buildingpop.eq(i).text().replace(".", ""));
    }

    var result = await unitsPop();
    for (var i = 0; i < unitpop.length; i++) {
        lockedsum += Number(unitpop.eq(i).text().replace(".", ""));
    }
    $("#locked").text(numberWithCommas(lockedsum));
    return lockedsum;
}

// a szabad tanyahelyet számolja
async function freePop() {
    var res = await popBonus();
    var result = await lockedPop();
    redClass();
    pop = roundDownToNearestInteger(res);

    locked = result;

    free = pop - locked;
    $("#free").text(numberWithCommas(free));
}

// ha a foglalt tanyahely nagyobb, mint a népesség, akkor a foglalt és a szabad tanyahely száma pirosra vált
function redClass() {
    var pop = Number($("#population").text().replace(".",""));
    var locked = Number($("#locked").text().replace(".",""));
    if (locked > pop) {
        $("#locked").addClass("red");
        $("#free").addClass("red");
    } else {
        $("#locked").removeClass("red");
        $("#free").removeClass("red");
    }
}

// kereskedő bónuszt számolja
async function marketBonus() {
    var merchants = await numberOfMerchants();
    var merchantsBonusVillage = Number($("#merchantsBonusVillage").val());
    var merchantsInventory = Number($("#merchantsInventory").val());
    var bonusMerchants = merchants * (merchantsBonusVillage + merchantsInventory) / 100 + merchants;
    $("#merchants").text(roundToNearestInteger(bonusMerchants));
}

// raktárkapacitás bónuszt számolja
async function storageBonus() {
    var storage = await capacity();
    var storageBonusVillage = Number($("#storageBonusVillage").val());
    var storageInventory = Number($("#storageInventory").val());
    var bonusStorage = storage * (storageBonusVillage + storageInventory) / 100 + storage;
    $("#capacity").text(numberWithCommas(roundToNearestInteger(bonusStorage)));
}

// fosztogatás bónuszt számolja
async function haulBonus() {
    var result = await unitsHaul();
    var haul = $(".haul");
    var haulFlag = Number($("#haulFlag").val());
    var haulInventory = Number($("#haulInventory").val());
    for (var i = 0; i < haul.length; i++) {
        oldHaul = Number(haul.eq(i).text().replace(".",""));
        newHaul = oldHaul * (1 + haulFlag / 100) * (1 + haulInventory / 100);
        haul.eq(i).text(numberWithCommas(roundToNearestInteger(newHaul)));
    }
}

// népesség bónuszt számolja
async function popBonus() {
    var result = await population();
    var popBonusVillage = Number($("#popBonusVillage").val());
    var popFlag = Number($("#popFlag").val());
    var popInventory = Number($("#popInventory").val());
    var oldPop = result;
    var newPop = oldPop * (1 + popBonusVillage / 100) * (1 + popFlag / 100) * (1 + popInventory / 100);
    $("#population").text(numberWithCommas(roundDownToNearestInteger(newPop)));
    return newPop;
}

// képzési bónuszt számolja
function recruitBonus() {
    var barracksBonus = 1 + Number($("#barracksBonus").val()) / 100;
    var stableBonus = 1 + Number($("#stableBonus").val()) / 100;
    var garageBonus = 1 + Number($("#garageBonus").val()) / 100;
    var academyBonus = 1 + Number($("#academyBonus").val()) / 100;
    return {barracksBonus, stableBonus, garageBonus, academyBonus}
}

// termelés bónuszt számolja
async function resourceBonus() {
    var woodBaseProd = await woodProd();
    var stoneBaseProd = await stoneProd();
    var ironBaseProd = await ironProd();

    worldSpeed = obj.world.worldSpeed;
    var wood = woodBaseProd.wood * worldSpeed;
    var stone = stoneBaseProd.stone * worldSpeed;
    var iron = ironBaseProd.iron * worldSpeed;

    var woodBonus = Number($("#woodBonus").val());
    var stoneBonus = Number($("#stoneBonus").val());
    var ironBonus = Number($("#ironBonus").val());

    var bonusWoodProduction = wood * (1 + woodBonus / 100);
    var bonusStoneProduction = stone * (1 + stoneBonus / 100);
    var bonusIronProduction = iron * (1 + ironBonus / 100);

    $("#woodProd").text(numberWithCommas(bonusWoodProduction));
    $("#stoneProd").text(numberWithCommas(bonusStoneProduction));
    $("#ironProd").text(numberWithCommas(bonusIronProduction));
}

// az egységek költségét számolja
function unitsCost() {
    var wood = 0;
    var stone = 0;
    var iron = 0;
    for (var i = 0; i < units.length; i++) {
        if (obj.unitsObj[units[i]].exist === true) {
            piece = Number($(".unit").eq(i).val());
            wood += Number(obj.unitsObj[units[i]].wood) * piece;
            stone += Number(obj.unitsObj[units[i]].stone) * piece;
            iron += Number(obj.unitsObj[units[i]].iron) * piece;
        }
    }
    $("#unitsWoodCost").text(numberWithCommas(wood));
    $("#unitsStoneCost").text(numberWithCommas(stone));
    $("#unitsIronCost").text(numberWithCommas(iron));
    return {wood, stone, iron}
}

// az épületek költségét számolja
function buildingsCost() {
    var wood = 0;
    var stone = 0;
    var iron = 0;
    for (var i = 0; i < buildings.length; i++) {
        building_level = Number($(".building").eq(i).val());
        for (var k = 1; k < building_level+1; k++) {  
            $wood = obj.buildingsObj[buildings[i]].wood;
            wood_factor = obj.buildingsObj[buildings[i]].wood_factor;
            if (building_level == 0 || building_level == "") {
                wood += 0
            } else {
                wood += Math.pow(wood_factor, k - 1) * $wood;
            }
        }
    }
    $("#buildingsWoodCost").text(numberWithCommas(Math.round(wood)));

    for (var i = 0; i < buildings.length; i++) {
        building_level = Number($(".building").eq(i).val());
        for (var k = 1; k < building_level+1; k++) {  
            $stone = obj.buildingsObj[buildings[i]].stone;
            stone_factor = obj.buildingsObj[buildings[i]].stone_factor;
            if (building_level == 0 || building_level == "") {
                stone += 0
            } else {
                stone += Math.pow(stone_factor, k - 1) * $stone;
            }
        }
    }
    $("#buildingsStoneCost").text(numberWithCommas(Math.round(stone)));

    for (var i = 0; i < buildings.length; i++) {
        building_level = Number($(".building").eq(i).val());
        for (var k = 1; k < building_level+1; k++) {  
            $iron = obj.buildingsObj[buildings[i]].iron;
            iron_factor = obj.buildingsObj[buildings[i]].iron_factor;
            if (building_level == 0 || building_level == "") {
                iron += 0
            } else {
                iron += Math.pow(iron_factor, k - 1) * $iron;
            }
        }
    }
    $("#buildingsIronCost").text(numberWithCommas(Math.round(iron)));
    return {wood, stone, iron}
}

// az épületek és az egységek költségét összegzi
async function sumUnitsAndBuildingsCost() {
    var buildings = await buildingsCost();
    currentBuildingsCost();
    var units = await unitsCost();
    var wood = units.wood + buildings.wood;
    var stone = units.stone + buildings.stone;
    var iron = units.iron + buildings.iron;

    $("#sumUnitsAndBuildingsWoodCost").text(numberWithCommas(Math.round(wood)));
    $("#sumUnitsAndBuildingsStoneCost").text(numberWithCommas(Math.round(stone)));
    $("#sumUnitsAndBuildingsIronCost").text(numberWithCommas(Math.round(iron)));
}

// aktuális épület szintek költségei
function currentBuildingsCost() {
    var woodCost = $(".woodCost");
    var stoneCost = $(".stoneCost");
    var ironCost = $(".ironCost");
    var wood = 0;
    var stone = 0;
    var iron = 0;
    for (var i = 0; i < woodCost.length; i++) {
        wood += Number(woodCost.eq(i).text().replace(".",""));
        stone += Number(stoneCost.eq(i).text().replace(".",""));
        iron += Number(ironCost.eq(i).text().replace(".",""));
    }
    $("#currentBuildingsWoodCost").text(numberWithCommas(wood));
    $("#currentBuildingsStoneCost").text(numberWithCommas(stone));
    $("#currentBuildingsIronCost").text(numberWithCommas(iron));
}

// ss átváltása nn:óó:pp:ss
function secondsToDhms(seconds) {
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = (d < 10) ? "0" + d + ":" : d + ":";
    var hDisplay = (h < 10) ? "0" + h + ":" : h + ":";
    var mDisplay = (m < 10) ? "0" + m + ":" : m + ":";
    var sDisplay = (s < 10) ? "0" + s : s;
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

function roundToNearestFive(number) {
    return Math.ceil(number/5)*5;
}

function roundToNearestInteger(number) {
    return Math.round(number);
}

function roundDownToNearestInteger(number) {
    return Math.floor(number);
}

function roundUpToNearestInteger(number) {
    return Math.ceil(number);
}

// számok tagolása "."-tal
function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
}

function byebye() {
    createMessage("SuccessMessage","Viszlát legközelebb!",2000)
}

function buildingsFunctions() {
    select(); // OK
    woodCost(); // OK
    stoneCost(); // OK
    ironCost(); // OK
    popCost(); // OK
    sumPoints(); // OK
    hiddenResources(); // OK
    wallBonus(); // OK
    marketBonus(); // OK
    storageBonus(); // OK
    resourceBonus(); // OK
}

function unitsFunctions() {
    unitsPop(); // OK
    sumBuildTimeOfUnit(); // OK
    haulBonus(); // OK
}

function buildingsAndUnitsFunctions() {
    freePop(); // OK
    sumUnitsAndBuildingsCost(); // OK
}

function spinMainIcon(durationMs, deg) {
    $({deg: 0}).animate({deg: deg}, {
        duration: durationMs,
        step: (angle) => {
            $(".gear img").css({
                transform: 'rotate(' + angle + 'deg)'
            });
        }
    });
}

$(".gear").find("img").on("click", function(event) {
    spinMainIcon(500, -180);
})

// épület szint eseménykezelő
$(".building, .unit, .bon").on("keyup input", function(event) {
    var classname = event.target.className;
    var value = event.target.valueAsNumber;
    var min = Number(event.target.min);
    var max = Number(event.target.max);
    var val = event.target.value;
    var id = event.target.id;
    var keyCode = event.keyCode;
   
    if (regExp.test(val) || value > max || value < min || ((keyCode < 7 || keyCode > 9) && (keyCode < 48 || keyCode > 57) && (keyCode < 96 || keyCode > 105))) {
        event.target.value = "";
        if (classname == "building") {
            createMessage("ErrorMessage",`Az épületnek nincs ilyen szintje! Minimum: ${min}, Maximum: ${max}`,1500);
        }
        if (classname == "unit") {
            createMessage("ErrorMessage",`Hibás darabszámot adtál meg! Minimum: ${min}, Maximum: ${max}`,1500);
        }
        if (classname == "bon") {
            createMessage("ErrorMessage",`Hibás értéket adtál meg! Minimum: ${min}, Maximum: ${max}`,1500);
        }
    } else {
        if (classname == "building") {
            buildingsFunctions();
            unitsFunctions();
            buildingsAndUnitsFunctions();
        }
        if (classname == "unit") {
            unitsFunctions();
            buildingsAndUnitsFunctions();
        }
        if (classname == "bon") {
            buildingsFunctions();
            unitsFunctions();
            buildingsAndUnitsFunctions();
        }
    }
})

// minimum rádiógomb eseménykezelő
function minimum() {
    for (var i = 0; i < buildings.length; i++) {
        min_level = obj.buildingsObj[buildings[i]].min_level;
        $(".building").eq(i).val(min_level);
    }
    buildingsFunctions();
    unitsFunctions();
    buildingsAndUnitsFunctions();
}

// maximum rádiógomb eseménykezelő
function maximum() {
    for (var i = 0; i < buildings.length; i++) {
        max_level = obj.buildingsObj[buildings[i]].max_level;
        $(".building").eq(i).val(max_level);
    }
    buildingsFunctions();
    unitsFunctions();
    buildingsAndUnitsFunctions();
}

// épületek és egységek előfeltételeinek vizsgálata
function select() {
    if (buildingsLevel("headquarters",3)) {
        enableBuilding("barracks");
    } else {
        disableBuilding("barracks");
    }
    if (buildingsLevel("headquarters",10) && buildingsLevel("barracks",5) && buildingsLevel("smith",5)) {
        enableBuilding("stable");
    } else {
        disableBuilding("stable");
    }
    if (buildingsLevel("headquarters",10) && buildingsLevel("smith",10)) {
        enableBuilding("garage");
    } else {
        disableBuilding("garage");
    }
    if (buildingsLevel("headquarters",5) && buildingsLevel("farm",5)) {
        enableBuilding("church");
    } else {
        disableBuilding("church");
    }
    if (buildingsLevel("headquarters",20) && buildingsLevel("smith",20) && buildingsLevel("market",10)) {
        enableBuilding("snob");
    } else {
        disableBuilding("snob");
    }
    if (buildingsLevel("headquarters",5) && buildingsLevel("barracks",1)) {
        enableBuilding("smith");
    } else {
        disableBuilding("smith");
    }
    if (buildingsLevel("headquarters",3) && buildingsLevel("warehouse",2)) {
        enableBuilding("market");
    } else {
        disableBuilding("market");
    }
    if (buildingsLevel("barracks",1)) {
        enableBuilding("wall");
    } else {
        disableBuilding("wall");
    }
    if (buildingsLevel("headquarters",5) && buildingsLevel("farm",5)) {
        enableBuilding("watchtower");
    } else {
        disableBuilding("watchtower");
    }
    if (buildingsLevel("smith",2)) {
        enableUnit("axe");
    } else {
        disableUnit("axe");
    }
    if (buildingsLevel("barracks",5) && buildingsLevel("smith",5)) {
        enableUnit("archer");
    } else {
        disableUnit("archer");
    }
    if (buildingsLevel("stable",1)) {
        enableUnit("spy");
    } else {
        disableUnit("spy");
    }
    if (buildingsLevel("stable",3)) {
        enableUnit("light");
    } else {
        disableUnit("light");
    }
    if (buildingsLevel("stable",5)) {
        enableUnit("marcher");
    } else {
        disableUnit("marcher");
    }
    if (buildingsLevel("stable",10) && buildingsLevel("smith",15)) {
        enableUnit("heavy");
    } else {
        disableUnit("heavy");
    }
    if (buildingsLevel("garage",1)) {
        enableUnit("ram");
    } else {
        disableUnit("ram");
    }
    if (buildingsLevel("garage",2) && buildingsLevel("smith",12)) {
        enableUnit("catapult");
    } else {
        disableUnit("catapult");
    }
    if (buildingsLevel("statue",1)) {
        enableUnit("knight");
    } else {
        disableUnit("knight");
    }
    if (buildingsLevel("academy",1) && buildingsLevel("headquarters",20) && buildingsLevel("smith",20) && buildingsLevel("market",10)) {
        enableUnit("snob");
    } else {
        disableUnit("snob");
    }
}
void(0);