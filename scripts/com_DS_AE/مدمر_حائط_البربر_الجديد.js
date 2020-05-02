/*______________________________________________________________________________
********************************************************************************
WriterScriptIs : Salim Fadhil                                                  *
VersionScript  : 1.1                                                           *
DateWroteScript: 14-04-2020                                                    *
DateUpdateD    : 15-04-2020                                                    *
URL            : https://forum.tribalwars.ae/index.php?members/abu-rajih.40926/*
_______________________________________________________________________________*
********************************************************************************
       ########   ##                    #########             $$  $$  ##       *
      ##      ##  ##                    ##      ##   ######   $$  $$  ##       *
      ##      ##  ##                    ##      ##         #          ##       *
      ##########  ## ####  ##    ##     ##     ##   ########  ##  ##  #######  *
      ##      ##  ###   ## ##    ##     ########    ##    ##  ##  ##  ##    ## *
      ##      ##  ##    ## ##    ##     ##     ##   ##    ##  ##  ##  ##    ## *
      ##      ##  ##   ##  ##    ## $$  ##      ##  ##    ##  ##  ##  ##    ## *
      ##      ##  ######    #####   $$  ##       ## ###### #  ##  ##  ##    ## *
                                                              ##               *
                                                         ##  ##                *
                                                          ####                 *
_______________________________________________________________________________*
*******************************************************************************/

javascript:

(function($) {
    if(window.game_data.screen == 'am_farm' || window.game_data.screen == 'place' || window.game_data.screen == 'report'){
window.RamForWallLevel = {
      '1' : 3,
      '2' : 6,
      '3' : 10,
      '4' : 13,
      '5' : 17,
      '6' : 23,
      '7' : 26,
      '8' : 30,
      '9' : 38,
      '10' : 46,
      '11' : 55,
      '12' : 66,
      '13' : 78,
      '14' : 91,
      '15' : 108,
      '16' : 125,
      '17' : 145,
      '18' : 170,
      '19' : 195,
      '20' : 223
    }

var sign = `
<center>
<table id = 'table'>
<tr>
<th id = 'th' colspan = '2'><b style='font-family:times new roman;font-size:16px;text-align:center;'>تم برمجة السكربت من قبل</b></th>
</tr>

<tr>
<td id = 'td' colspan = '2'><a id="Salim" title = 'Abu.Rajih'  href="https://forum.tribalwars.ae/index.php?members/abu-rajih.40926/" target="_blank">سيد الاساطير</a></td>
</tr>

<tr>
<th id = 'th' colspan="1" > شرح السكربت </th> <th id = 'th' ><a style='font-family:times new roman;font-size:16px;' href="https://forum.tribalwars.ae/index.php?threads/%D9%85%D8%AF%D9%85%D8%B1-%D8%AD%D8%A7%D8%A6%D8%B7-%D8%A7%D9%84%D8%A8%D8%B1%D8%A8%D8%B1-%D8%A7%D9%84%D8%AC%D8%AF%D9%8A%D8%AF-%D9%86%D8%B3%D8%AE%D9%87-%D8%A3%D8%A8%D8%B1%D9%8A%D9%84-2020.97082/" target="_blank">اضغط هنا</a></th>
</tr>

<tr>
<th id = 'th' colspan= '2'>
<iframe style="width:100%;height: 200px;" src="https://www.youtube.com/embed/8_3Vyc-8fOM"></iframe>
</th>
</tr>

</table>
</center>

<style>
#table,#th,#td { border:1px solid black; font-family:times new roman; font-size:16px; text-align:center; width:300px; }
#Salim { font-family:times new roman; font-size: 20px; animation: salim 2s linear infinite; }
@keyframes salim {
0%  {text-shadow:0 0 3px #000;}
15% {text-shadow:0 0 9px #000;}
30% {text-shadow:0 0 3px #000;}
45% {color:rgba(80,80,80,.1);}
60% {text-shadow:0 0 3px #7d5d11;color:#222;}
80% {text-shadow:0 0 9px #000;}
100%{text-shadow:0 0 3px #000;}
}
</style>`;

        if(window.game_data.screen == 'am_farm'){
$('#plunder_list').before(sign);
$('#plunder_list > tbody > tr:nth-child(1) > th:nth-child(10)').after('<th style="text-align:center;" rowspan="2"><img src="https://dsae.innogamescdn.com/asset/bf21430/graphic/unit/unit_ram.png" title="مدمرات حائط" alt="" class=""></th>');
$('#plunder_list > tbody > tr > td:nth-child(11)').after('<td></td>')
$('#plunder_list > tbody > tr').not(':EQ(0) , :EQ(1)').each(function(index , level){
        window.t = $(this);
        level = $.trim($(this).find('td:nth-child(7)').text());

        if(level == 0){
            $(this).find('td:nth-child(7)').css({'color':'#0c0','font-weight':'bold'});
            $(window.t).find('td:nth-child(12)').append('<center><img src="https://dl.dropboxusercontent.com/s/rf6h2niqk5qykyq/%D8%B5%D8%AD.png" title="تم تدميره الى 0" style="width:20px; height:20px;" /></center>');
        }
        else if(level > 0 && level <= 20){
            $(window.t).find('td:nth-child(12)').append('<center><input type="button" class="btn" style="background:url(https://dsae.innogamescdn.com/asset/bf21430/graphic/unit/unit_ram.png) no-repeat 3px 1px, linear-gradient(to bottom, #947a62 0%,#7b5c3d 22%,#6c4824 30%,#6c4824 100%);width:52px;text-align:right;" id="RamAttack" value=' + window.RamForWallLevel[level] + ' /></center>');
        }
        else{
            $(this).find('td:nth-child(7)').css({'color':'#c00','font-weight':'bold'});
            $(window.t).find('td:nth-child(12)').append('<center><span style="font-family:times new roman;color:#c00;font-size:14px;font-weight:bold;">?</span></center>');
        }

  $(this).find('#RamAttack').on('click' , function(){
      sessionStorage.setItem('RamToAttack' , $(this).val());
      var target = $('#plunder_list > tbody > tr:eq('+ (2 + index) +')').find('td:nth-child(4) > a').text();
      var WallLv = $('#plunder_list > tbody > tr:eq('+ (2 + index) +')').find('td:nth-child(7)').text();
      sessionStorage.setItem('WallLevel' , WallLv);
      sessionStorage.setItem('x' , target.split('(')[1].split('|')[0]);
      sessionStorage.setItem('y' , target.split(')')[0].split('|')[1]);
      window.open('/game.php?village='+window.game_data.village.id+'&screen=place','_blank');
  });

});
}

        else if(window.game_data.screen == 'report'){
            $('#attack_spy_buildings_right').after(sign);
            $('#attack_spy_buildings_right > tbody > tr').each(function(){
            if($.trim($(this).find('td:nth-child(1) > span').text()).match(/الحائط/)){
                $(this).find('td:nth-child(2)').css({'color':'#f00','font-weight':'bold'});
              window.Level_Wall = $.trim($(this).find('td:nth-child(2)').text());
                sessionStorage.setItem('WallLevel' , window.Level_Wall);
               $(this).find('td:nth-child(2)').append('<input type="button" class="btn" style="background:url(https://dsae.innogamescdn.com/asset/bf21430/graphic/unit/unit_ram.png) no-repeat 3px 1px, linear-gradient(to bottom, #947a62 0%,#7b5c3d 22%,#6c4824 30%,#6c4824 100%);width:52px;text-align:right;" id="RamToAttack" value=' + window.RamForWallLevel[sessionStorage.WallLevel] + ' />');
                $('#RamToAttack').on('click' , function(){
                    sessionStorage.setItem('RamToAttack', $(this).val());
                    var coord = $('#attack_info_def > tbody > tr:nth-child(2) > td:nth-child(2) > span > a:nth-child(1)').text().split('(')[1];
                    coord = coord.split(')')[0];
                    var x = coord.split('|')[0];
                    var y = coord.split('|')[1];
                    sessionStorage.setItem('x' , x);
                    sessionStorage.setItem('y' , y);
                    window.open('/game.php?village='+window.game_data.village.id+'&screen=place','_blank');
                });
              }
            });

        }

             if(window.game_data.screen == 'place' && !window.location.href.match(/&screen=place&try=confirm/)){
        if(!sessionStorage.RamToAttack && !sessionStorage.x && !sessionStorage.y && !sessionStorage.WallLevel){
          alert('لا توجد قريه لتدمير حائطها!!\n\nتوجه الى مساعد النهب ثم شغل السكربت \n او شغل السكربت من التقرير');
        }else{
       setTimeout(()=>{
           document.querySelector("#unit_input_axe").value = 200;
           document.querySelector('#unit_input_ram').value = sessionStorage.getItem('RamToAttack');
           document.forms[0].x.value = sessionStorage.getItem('x');
           document.forms[0].y.value = sessionStorage.getItem('y');
     },10);

         setTimeout(()=>{
             document.querySelector('#target_attack').click();
         },20);
        }
     }

    if(window.location.href.match(/&screen=place&try=confirm/)){
        $('#default_name_span > a ').click();
        setTimeout(()=>{
            document.querySelector('#new_attack_name').value = sessionStorage.getItem('RamToAttack') + ' محطمة حائط في مهمة خاصة لتدمير ' + sessionStorage.getItem('WallLevel') + ' مستوى حائط ';
        },10);

        setTimeout(()=>{
            document.querySelector("#attack_name_btn").click();
        },15);

        setTimeout(()=>{
            document.querySelector("#troop_confirm_go").click();
        },20);

       }
}else{
window.UI.InfoMessage('السكربت يعمل من مساعد النهب ومن التقرير ' , 3000 , 'error');
}
})(window.jQuery);