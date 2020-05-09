	

    ScriptAPI.register( '9-Dorfumbenennungsscript - Hauptgebäude', true, 'Harpstennah', 'support-nur-im-forum@arcor.de' );
     
    var compass_a=new Array("N","NO","O","SO","S","SW","W","NW");
    if(typeof(compass_n) != "undefined"){
            compass_a = compass_n;
            }      
    var zentrum = "Z";
    if(typeof(zentrum_n) != "undefined"){
            zentrum = zentrum_n;
            }
    var factor_distance = 1;
    if(typeof(SettingDistance) != "undefined"){
            for ( var i = 0; i < SettingDistance ; i++){
                    factor_distance = factor_distance * 10;
                    }
            }
    var oldName=game_data.village.name;
    var coords=game_data.village.coord.match(/(\d)?(\d)?(\d)?\|(\d)?(\d)?(\d)?/);
    var x1=coords[1];
    var x2=coords[2];
    var x3=coords[3];
    if(x2==undefined){
            x2=x1;x1="0";
    }
    if(x3==undefined){
            x3=x2;
            x2=x1;
            x1="0";
    }
    var x=x1+x2+x3;
    var y1=coords[4];
    var y2=coords[5];
    var y3=coords[6];
    if(y2==undefined){
            y2=y1;
            y1="0";
    }
    if(y3==undefined){
            y3=y2;
            y2=y1;
            y1="0";
    }
    var y=y1+y2+y3;
    var continent=document.getElementById('menu_row2').innerHTML.match(/\(([0-9]+)\|([0-9]+)\) K([0-9]+)/);
    continent=continent[3];
    var vid=game_data.village.id;
    var sector=Math.floor((y % 100)/5)*20+Math.floor((x % 100)/5);
    var field=Math.floor(((y % 100) % 5)*5+((x % 100) % 5));
    field=(field<10)?'0'+field:field;
    sector=((sector<100)&&(sector>9))?'0'+sector:((sector<10)?'00'+sector:sector);
    var oldCoords=continent+":"+sector+":"+field;
    var zentrumX=CentrumCoords.split('|')[0];
    var zentrumY=CentrumCoords.split('|')[1];
    if (zentrumX + zentrumY == 0) {
            var KM = x[0]+"50"+"|"+y[0]+"50";
            var zentrumX = KM.split('|')[0];
            var zentrumY = KM.split('|')[1];
    }
    var radiusIst=Math.sqrt((zentrumX-x)*(zentrumX-x)+(zentrumY-y)*(zentrumY-y));
    var distance = Math.round(radiusIst*factor_distance)/factor_distance;
    var ow = (x > zentrumX) ? compass_a[2] : compass_a[6];
    var ns = (y > zentrumY) ? compass_a[4] : compass_a[0];
    var compas4=radiusIst>=radiusZ?ns+ow:zentrum ;
    var winkel=Math.atan2(y-zentrumY,x-zentrumX)*180/Math.PI;
    winkel=Math.floor((winkel+90+22.5)/45);
    if(winkel<0){
            winkel=winkel+8;
    }
    var compas8=radiusIst>=radiusZ?compass_a[winkel]:zentrum ;
    var anzahl=Number(game_data.player.villages)+summand;
    function ArabischInRoemischLang(ArabischeZahl){
            var EinheitRoemisch=new Array("M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I");
            var EinheitArabisch=new Array(1000,900,500,400,100,90,50,40,10,9,5,4,1);
            var ArabischeZahl=parseInt(ArabischeZahl);
            var RoemischeZahl="";
            if(isNaN(ArabischeZahl)||(ArabischeZahl<=0)){
                    return "Fehler";
            }
            for(var Nr=0;Nr<EinheitArabisch.length;Nr++)while(ArabischeZahl>=EinheitArabisch[Nr]){
                    RoemischeZahl+=EinheitRoemisch[Nr];
                    ArabischeZahl-=EinheitArabisch[Nr];
            }
            return RoemischeZahl;
    }
    var name=vorgabe.split("{old}").join(oldName);
    name=name.split("{xxx}").join(x);
    name=name.split("{yyy}").join(y);
    name=name.split("{x1}").join(x1);
    name=name.split("{x2}").join(x2);
    name=name.split("{x3}").join(x3);
    name=name.split("{y1}").join(y1);
    name=name.split("{y2}").join(y2);
    name=name.split("{y3}").join(y3);
    name=name.split("{k}").join(continent);
    name=name.split("{id}").join(vid);
    name=name.split("{oldCoords}").join(oldCoords);
    name=name.split("{sector}").join(sector);
    name=name.split("{field}").join(field);
    name=name.split("{counter}").join(anzahl);
    name=name.split("{rcounter}").join(ArabischInRoemischLang(anzahl));
    name=name.split("{compass4}").join(compas4);
    name=name.split("{compass8}").join(compas8);
    name=name.split("{distance}").join(distance);
    if(!vorgabe){
            vorgabe="{old}";
    }
    name=name.substring(0,31);
    if (game_data.screen != "main") {
            window.alert("Du musst dich im Hauptgebäude befinden!");
    }else{
                    document.getElementsByName('name')[0].value = name;
            $("input[type|=submit]").click();
    }

