var _0x3194=['round','&type=coord&request_id=1&limit=5&offset=0','\x0a\x20\x20\x20\x20<div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<table\x20id=\x22dateBox\x22\x20class=\x22sophHeader\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20colspan=\x222\x22\x20style=\x22text-align:center\x22>Mass\x20timed\x20fake\x20finder</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22sophHeader\x22>Target\x20Villages:</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22sophRowA\x22><textarea\x20id=\x22targetCoordinates\x22\x20value=\x22Insert\x20list\x20of\x20coordinates\x20here.\x22\x20class=\x22text-input\x22\x20rows=\x226\x22\x20cols=\x2250\x22\x20onFocus=\x22this.select()\x22\x20/></td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22sophHeader\x22>Hit\x20time:</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22sophRowB\x22><input\x20id=\x22arrival_time\x22\x20size=\x2225\x22\x20class=\x22text-input\x22\x20value=\x22','#targetCoordinates','getTime','</a></td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>','toLocaleString','villages','innerText','\x27\x20class=\x27sophRowA\x27','#mobileHeader','href','#arrival_time','timedFakeDate','distance','length','get','/interface.php?func=get_unit_info','Content','&screen=place&target=','catapult\x20speed','#3e4147','#combined_table\x20tr','>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td><a\x20href=\x22/game.php?&screen=info_village&id=',')\x22\x20style=\x22cursor:\x20pointer;\x22><font\x20color=\x22#40D0E0\x22>Go\x20to\x20rally\x20point</font></td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</tr>','\x20id=\x27','No\x20date\x20found,\x20making\x20new\x20one','match','#serverDate','source','show','value','ram','overview_villages&mode=combined','log','done','assign','&screen=api&ajax=target_selection&input=','Storing\x20landing\x20time','\x0a\x20\x20\x20\x20\x20\x20\x20\x20<tr\x20','.content-border','setTime','#202225','Coord','#serverTime','text','screen=overview_villages&mode=combined','Units','pow','parse','sort','prepend','target','catapult','timeTillFake','timers','</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20onclick=\x22openRallyPage(','attr','\x22/></td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22sophHeader\x22></td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22sophRowA\x22><input\x20type=\x22button\x22\x20class=\x22btn-confirm-yes\x22\x20value=\x22Go\x22\x20onClick=\x22calculateTimedAttacks()\x22\x20/></td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</table>\x0a\x20\x20\x20\x20</div>\x0a','/game.php?village=','toString','\x0a\x20\x20\x20\x20\x20\x20\x20\x20<style>\x0a\x20\x20\x20\x20\x20\x20\x20\x20.sophRowA\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20background-color:\x20#32353b;\x0a\x20\x20\x20\x20\x20\x20\x20\x20color:\x20white;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20.sophRowB\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20background-color:\x20#36393f;\x0a\x20\x20\x20\x20\x20\x20\x20\x20color:\x20white;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20.sophHeader\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20background-color:\x20#202225;\x0a\x20\x20\x20\x20\x20\x20\x20\x20font-weight:\x20bold;\x0a\x20\x20\x20\x20\x20\x20\x20\x20color:\x20white;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20</style>','</table></div>','link_base_pure','units','children','replace','floor','last\x20date\x20is\x20older\x20than\x20right\x20now:\x20','getTimezoneOffset','sqrt','launchTime','location','init','push','\x27\x20class=\x27sophRowB\x27','keep\x20last\x20date:\x20','open','#36393f','setItem','getItem','</span></td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>','#ffffdf','indexOf','tickHandlers'];(function(_0xc75511,_0x31945f){var _0x1e6708=function(_0x4a4bed){while(--_0x4a4bed){_0xc75511['push'](_0xc75511['shift']());}};_0x1e6708(++_0x31945f);}(_0x3194,0x98));var _0x1e67=function(_0xc75511,_0x31945f){_0xc75511=_0xc75511-0x0;var _0x1e6708=_0x3194[_0xc75511];return _0x1e6708;};_0xeb3c57:if(window[_0x1e67('0x5')][_0x1e67('0x1d')][_0x1e67('0x10')](_0x1e67('0x40'))<0x0){window[_0x1e67('0x5')][_0x1e67('0x36')](game_data[_0x1e67('0x51')]+_0x1e67('0x33'));}else{var msPerSec=0x3e8;var secsPerMin=0x3c;var minsPerHour=0x3c;var hrsPerDay=0x18;var msPerMin=msPerSec*secsPerMin;var msPerHour=msPerMin*minsPerHour;var msPerDay=msPerHour*hrsPerDay;var minsPerDay=hrsPerDay*minsPerHour;var defaultDate=new Date();var coordListOwn=[];var testDistances=[];var timedFakeList=[];var units;var ramSpeed;var ramSpeedMs;$['get'](_0x1e67('0x23'),function(_0x282e26){units=_0x282e26;})[_0x1e67('0x35')](function(){ramSpeed=$(units)['find'](_0x1e67('0x26'))[_0x1e67('0x3f')]();ramSpeedMs=ramSpeed*0x3c*0x3e8;});var backgroundColor=_0x1e67('0xb');var borderColor=_0x1e67('0x27');var headerColor=_0x1e67('0x3c');var titleColor=_0x1e67('0xf');cssClassesSophie=_0x1e67('0x4f');$(_0x1e67('0x3a'))['eq'](0x0)[_0x1e67('0x45')](cssClassesSophie);$(_0x1e67('0x1c'))['eq'](0x0)[_0x1e67('0x45')](cssClassesSophie);defaultDate[_0x1e67('0x3b')](((Math[_0x1e67('0x0')](defaultDate[_0x1e67('0x16')]()/msPerDay)+0x1)*minsPerDay+defaultDate[_0x1e67('0x2')]())*msPerMin);defaultDate=defaultDate[_0x1e67('0x4e')]()[_0x1e67('0x54')](/\w+\s*/i,'')[_0x1e67('0x54')](/(\d*:\d*:\d*)(.*)/i,'$1');if(localStorage[_0x1e67('0xd')](_0x1e67('0x1f'))==null){console[_0x1e67('0x34')](_0x1e67('0x2c'));localStorage[_0x1e67('0xc')]('timedFakeDate',defaultDate);}else{console['log']('Date\x20found,\x20checking\x20if\x20older\x20than\x20right\x20now');lastDate=localStorage[_0x1e67('0xd')](_0x1e67('0x1f'));if(Date['parse'](lastDate)<Date[_0x1e67('0x43')](defaultDate)){console[_0x1e67('0x34')](_0x1e67('0x1')+defaultDate);localStorage['setItem'](_0x1e67('0x1f'),defaultDate);}else{console[_0x1e67('0x34')](_0x1e67('0x9')+lastDate);defaultDate=lastDate;localStorage['setItem'](_0x1e67('0x1f'),defaultDate);}}$(_0x1e67('0x1e'))['value']=defaultDate;function calculateDistance(_0xa0cea1,_0x2f9368){var _0x485111=extractCoords(_0xa0cea1)[_0x1e67('0x2d')](/(\d+)\|(\d+)/);var _0x2ef2f2=extractCoords(_0x2f9368)[_0x1e67('0x2d')](/(\d+)\|(\d+)/);var _0x44c0dd=Math[_0x1e67('0x3')](Math['pow'](_0x2ef2f2[0x1]-_0x485111[0x1],0x2)+Math[_0x1e67('0x42')](_0x2ef2f2[0x2]-_0x485111[0x2],0x2));return _0x44c0dd;}function extractCoords(_0x2ffb25){var _0x36eead=_0x2ffb25[_0x1e67('0x2d')](/\d+\|\d+/ig);return _0x36eead?_0x36eead[_0x36eead[_0x1e67('0x21')]-0x1]:null;}function compareDates(_0x3d5756){var _0x3e7cbc=_0x3d5756,_0x2a6119=new Date(),_0x1797c1=new Date(_0x2a6119-_0x3e7cbc),_0x49ae8d=_0x1797c1/0x3e8/0x3c/0x3c;return _0x49ae8d;}function createDateBox(){Dialog[_0x1e67('0x30')](_0x1e67('0x24'),_0x1e67('0x14')+defaultDate+_0x1e67('0x4c'));}function calculateTimedAttacks(){console[_0x1e67('0x34')](_0x1e67('0x38'));localStorage['setItem'](_0x1e67('0x1f'),new Date($(_0x1e67('0x1e'))[0x0][_0x1e67('0x31')]));grabVillageData();targetCoords=parseCoordinates();landTime=new Date($(_0x1e67('0x1e'))[0x0]['value']);serverTimeTemp=$(_0x1e67('0x2e'))[0x0]['innerText']+'\x20'+$(_0x1e67('0x3e'))[0x0][_0x1e67('0x1a')];serverTime=serverTimeTemp[_0x1e67('0x2d')](/^([0][1-9]|[12][0-9]|3[01])[\/\-]([0][1-9]|1[012])[\/\-](\d{4})( (0?[0-9]|[1][0-9]|[2][0-3])[:]([0-5][0-9])([:]([0-5][0-9]))?)?$/);serverDate=Date[_0x1e67('0x43')](serverTime[0x2]+'/'+serverTime[0x1]+'/'+serverTime[0x3]+serverTime[0x4]);for(var _0x3d181c=0x0;_0x3d181c<coordListOwn['length'];_0x3d181c++){for(var _0x5945a3=0x0;_0x5945a3<targetCoords['length'];_0x5945a3++){tempDistance=calculateDistance(targetCoords[_0x5945a3],coordListOwn[_0x3d181c]['Coord']);testDistances[_0x1e67('0x7')]({'source':coordListOwn[_0x3d181c],'target':targetCoords[_0x5945a3],'distance':tempDistance});}}testDistances[_0x1e67('0x44')]((_0x278b31,_0x2a678a)=>parseInt(_0x278b31[_0x1e67('0x20')])>parseInt(_0x2a678a[_0x1e67('0x20')])?0x1:-0x1);for(var _0x3d181c=0x0;_0x3d181c<testDistances[_0x1e67('0x21')];_0x3d181c++){if(testDistances[_0x3d181c][_0x1e67('0x2f')][_0x1e67('0x41')][_0x1e67('0x32')]>0x0||testDistances[_0x3d181c]['source'][_0x1e67('0x41')][_0x1e67('0x47')]>0x0){launchTime=landTime-testDistances[_0x3d181c][_0x1e67('0x20')]*ramSpeedMs;timeTillLaunch=launchTime-serverDate;if(timeTillLaunch>0x0){timedFakeList[_0x1e67('0x7')]({'source':testDistances[_0x3d181c][_0x1e67('0x2f')],'target':testDistances[_0x3d181c][_0x1e67('0x46')],'distance':testDistances[_0x3d181c][_0x1e67('0x20')],'timeTillFake':timeTillLaunch,'launchTime':launchTime});}}}timedFakeList[_0x1e67('0x44')]((_0x45ca02,_0x14148e)=>parseInt(_0x45ca02[_0x1e67('0x48')])>parseInt(_0x14148e[_0x1e67('0x48')])?0x1:-0x1);Dialog['close']();html='\x0a\x20\x20\x20\x20<div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<table\x20class=\x22sophHeader\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr\x20class=\x22sophHeader\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20colspan=\x225\x22\x20style=\x22text-align:center\x22>Mass\x20timed\x20fake\x20finder</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr\x20class=\x22sophHeader\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>Source</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>Target</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>Distance</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>Launch\x20time\x20from\x20now</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>Launch\x20time\x20localy</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>Link\x20to\x20rally\x20page</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>';for(var _0x3d181c=0x0;_0x3d181c<timedFakeList['length'];_0x3d181c++){if(_0x3d181c%0x2==0x0){tempRow=_0x1e67('0x2b')+_0x3d181c+_0x1e67('0x8');}else{tempRow=_0x1e67('0x2b')+_0x3d181c+_0x1e67('0x1b');}tempSecs=Math[_0x1e67('0x0')](parseInt(timedFakeList[_0x3d181c][_0x1e67('0x48')])/0x3e8)%0x3c;if(tempSecs<0xa)tempSecs='0'+tempSecs;tempMins=Math[_0x1e67('0x0')](parseInt(timedFakeList[_0x3d181c][_0x1e67('0x48')])/0x3e8/0x3c);tempHours=Math[_0x1e67('0x0')](tempMins/0x3c);tempMins=tempMins%0x3c;if(tempMins<0xa)tempMins='0'+tempMins;launchDate=new Date(timedFakeList[_0x3d181c][_0x1e67('0x4')]);html+=_0x1e67('0x39')+tempRow+_0x1e67('0x29')+timedFakeList[_0x3d181c][_0x1e67('0x2f')]['ID']+'\x22>'+timedFakeList[_0x3d181c][_0x1e67('0x2f')][_0x1e67('0x3d')]+_0x1e67('0x17')+timedFakeList[_0x3d181c][_0x1e67('0x46')]+'</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>'+Math[_0x1e67('0x12')](timedFakeList[_0x3d181c][_0x1e67('0x20')])+'</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td><span\x20class=\x22timer\x22>'+(tempHours+':'+tempMins+':'+tempSecs)+_0x1e67('0xe')+launchDate[_0x1e67('0x18')]()+_0x1e67('0x4a')+_0x3d181c+','+timedFakeList[_0x3d181c][_0x1e67('0x2f')]['ID']+','+timedFakeList[_0x3d181c][_0x1e67('0x46')][_0x1e67('0x2d')](/(\d+)\|(\d+)/)[0x1]+','+timedFakeList[_0x3d181c][_0x1e67('0x46')][_0x1e67('0x2d')](/(\d+)\|(\d+)/)[0x2]+_0x1e67('0x2a');}html+=_0x1e67('0x50');Dialog[_0x1e67('0x30')]('Content',html);Timing[_0x1e67('0x11')][_0x1e67('0x49')][_0x1e67('0x6')]();}function grabVillageData(){for(var _0x28ceea=0x1;_0x28ceea<$(_0x1e67('0x28'))[_0x1e67('0x21')];_0x28ceea++){tempID=$($(_0x1e67('0x28'))[_0x28ceea][_0x1e67('0x53')][0x1][_0x1e67('0x53')][0x0])[_0x1e67('0x4b')]('data-id');tempCoord=$(_0x1e67('0x28'))[_0x28ceea][_0x1e67('0x53')][0x1]['innerText'][_0x1e67('0x2d')](/(\d+\|\d+)/)[0x0];tempUnits={};for(var _0x42ab76=0x0;_0x42ab76<game_data['units'][_0x1e67('0x21')];_0x42ab76++){tempUnits[game_data[_0x1e67('0x52')][_0x42ab76]]=$(_0x1e67('0x28'))[_0x28ceea][_0x1e67('0x53')][0x8+_0x42ab76][_0x1e67('0x1a')];}coordListOwn['push']({'ID':tempID,'Coord':tempCoord,'Units':tempUnits});}}function parseCoordinates(){targetCoords=$(_0x1e67('0x15'))[0x0][_0x1e67('0x31')]['match'](/\d+\|\d+/g);return targetCoords;}createDateBox();function openRallyPage(_0x37bfd7,_0x188671,_0x3fd8cf,_0x40bc58){temp=$[_0x1e67('0x22')](_0x1e67('0x4d')+_0x188671+_0x1e67('0x37')+_0x3fd8cf+'|'+_0x40bc58+_0x1e67('0x13'),function(_0x41aa50){temp=JSON[_0x1e67('0x43')](_0x41aa50);})[_0x1e67('0x35')](function(_0x496ee7){$('#'+_0x37bfd7)['remove']();window[_0x1e67('0xa')](_0x1e67('0x4d')+_0x188671+_0x1e67('0x25')+temp[_0x1e67('0x19')][0x0]['id']);});}}