javascript:
var backgroundColor = "#36393f";
var titleColor = "#ffffdf";
cssClassesSophie = `
<style>
.sophRowA {
background-color: #32353b;
color: white;
}
.sophRowB {
background-color: #36393f;
color: white;
}
.sophHeader {
background-color: #202225;
font-weight: bold;
color: white;
}
</style>`
$("#contentContainer").eq(0).prepend(cssClassesSophie);
$("#mobileHeader").eq(0).prepend(cssClassesSophie);

html=`
<div>
    <table class='sophHeader' border=0>
        <tr class='sophHeader'>
            <td id="wood"><center>Wood</center></td>
            <td id="clay"><center>Clay</center></td>
            <td id="iron"><center>Iron</center></td>
        </tr>
        <tr class='sophRowA'>
            <td id="wood"><input type="text" id="textWood" cols="6" style="background-color:${backgroundColor};color:${titleColor};border-color:#202225" placeholder="${game_data.village.wood}"></td>
            <td id="clay"><input type="text" id="textClay" cols="6" style="background-color:${backgroundColor};color:${titleColor};border-color:#202225" placeholder="${game_data.village.stone}"></td>
            <td id="iron"><input type="text" id="textIron" cols="6" style="background-color:${backgroundColor};color:${titleColor};border-color:#202225" placeholder="${game_data.village.iron}"></td>
        </tr>
        <tr class='sophRowB'>
            <td colspan=3><center><input type="button" class="btn evt-confirm-btn btn-confirm-yes" id="calculate" onclick="calculateRes()" value="Calculate" "></center></td>
        </tr>
        <tr class='sophRowA'>
            <td colspan=3><center><span id="result"></span></center></td>
        </tr>
    </table>
</div>
`;

$("#contentContainer").eq(0).prepend(html);

var getForecast = function () {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("\t\t First promise");
            ResourcesForecaster.fetchSchedules(window.game_data.village.id, (oSchedule) => {
                window.oSchedule = oSchedule;
                test = ResourcesForecaster.getForecast(new Resources($("#textWood").val(), $("#textClay").val(), $("#textIron").val()), game_data.village, oSchedule.rates, oSchedule.amounts)
            })
        }, 200);
    });
};

var displayResult = function () {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("\t\t Second promise");
            ready = "" + test;
            $("#result").text(ready);
        }, 200);
    });
};

var async_function = async function () {
    const first_promise = await getForecast();
    const second_promise = await displayResult();
}




function calculateRes()
{
async_function();
}