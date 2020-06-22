    var WorldSpeed
    var UnitSpeed



    function getImpactTime(row){
        return  $(row).find('td')[5].innerText; // TODO A Testzer
    }

    function getTimeLeftInSecond(row){
        var TimeString = $(row).find('td')[6].innerText;
        var split = TimeString.split(':');
        return parseInt(split[2])+60*parseInt(split[1])+3600*parseInt(split[0]);
    }

    function getSender(row){
        return $(row).find('td')[3].innerText; // TODO A Testzer
    }

    function getDistance(row){
        var coordAtt = getAttacker(row).split("|")
        var coordDef = getDefender(row).split("|")
        var exactDistance = Math.sqrt(Math.pow(parseInt(coordAtt[0])-parseInt(coordDef[0]),2) + Math.pow(parseInt(coordAtt[1])-parseInt(coordDef[1]),2))
        return exactDistance
    }
    function getDefender(row){
        var a = $(row).find('td')[1].innerText; // TODO A Testzer
        tab = a.split(')');
        return tab[tab.length-2].split('(')[1];
    }

    function getAttacker(row){
        var a = $(row).find('td')[2].innerText; // TODO A Testzer
        tab = a.split(')');
        return tab[tab.length-2].split('(')[1];
    }

    function getTravelTimeInSecond(distance, unit){
    return Math.round(distance * (60*baseUnitSpeed[unit]/WorldSpeed/UnitSpeed));
    }

    function getBackTime(row){
        var impact = conversionImpacttoDate(row)
        var travel = getTravelTimeInSecond(getDistance(row), findAttackSpeed(row))
        var launchDate = new Date(impact.getFullYear(), impact.getMonth(), impact.getDate(), impact.getHours(), impact.getMinutes(), parseInt(impact.getSeconds())+travel)
        var dateStringSplit = launchDate.toString().split(" ")
        return dateStringSplit[1] + ". " + dateStringSplit[2] + ", " + dateStringSplit[4]
    }

    var baseUnitSpeed = {
        "Noble" : 35,
        "B\351lier" : 30,
        "\311p\351e" : 22,
        "Hache" : 18,
        "Lourd" : 11,
        "L\351ger" : 10,
        "\311claireur" : 9,
    }

    function findAttackSpeed(row){
        var TimeLeft = getTimeLeftInSecond(row)
        var distance = getDistance(row)
        var previousUnit = "Noble"

        for(var unit in baseUnitSpeed){
            if(getTravelTimeInSecond(distance, unit)<TimeLeft) return previousUnit
            previousUnit = unit
        }
        return "\311claireur"
    }

    function conversionImpacttoDate(row){
        var impact = getImpactTime(row);
        var tab = impact.split(" ");
        var dateActuelle = new Date();
        console.log(tab);
        switch(tab[0]){
            case "demain" :
                return new Date(dateActuelle.getFullYear(), dateActuelle.getMonth(), parseInt(dateActuelle.getDate())+1, tab[2].split(":")[0], tab[2].split(":")[1], tab[2].split(":")[2]);
            case "le" :
                return new Date(tab[1].split(".")[2], parseInt(tab[1].split(".")[1])-1, tab[1].split(".")[0],tab[3].split(":")[0], tab[3].split(":")[1], tab[3].split(":")[2]);
            default:
                return new Date(dateActuelle.getFullYear(), dateActuelle.getMonth(), dateActuelle.getDate(), tab[1].split(":")[0], tab[1].split(":")[1], tab[1].split(":")[2]);

        }
        throw new Error("Woupsi, erreur conversion de la date d'arrivée")
    }

    function findAttackLaunch(row){
        var impact = conversionImpacttoDate(row);
        var travel = getTravelTimeInSecond(getDistance(row), findAttackSpeed(row));
        var launchDate = new Date(impact.getFullYear(), impact.getMonth(), impact.getDate(), impact.getHours(), impact.getMinutes(), parseInt(impact.getSeconds())-travel)
        var dateStringSplit = launchDate.toString().split(" ")
        return dateStringSplit[1] + ". " + dateStringSplit[2] + ", " + dateStringSplit[4]
    }

    function getFinalString(row){
        return findAttackSpeed(row) + " " + getAttacker(row) + " " + getSender(row) + " " + findAttackLaunch(row) + " | " + getBackTime(row)
    }


    //----------
    function editAttackName($row) {
        var $button = $row.find('.rename-icon');
        $button.click();
    }
    function renameAttackName($row, name) {
        var $input = $row.find('.quickedit-edit input[type="text"]');
        $input.val(name);
    }
    function submitAttackName($row) {
        var $button = $row.find('.quickedit-edit input[type="button"]');
        $button.click();
    }


    function RenameAttack(){
        var i=0;
        $('tr.nowrap').each(function(){
            if ($.trim($(this).find('td')[0].innerText) == "Attaque"){
                setTimeout(delayed, i*50,$(this));
                i++; 
            }
        });
    }

    function delayed(param) {
        editAttackName(param);
        renameAttackName(param, getFinalString(param));
        submitAttackName(param);
    }

    function main(){
        $.ajax({
            type: 'GET',
            url: '/interface.php?func=get_config',
            dataType: 'xml',
            success: function(xml) {
                UnitSpeed = $(xml).find('unit_speed').text();
                WorldSpeed = $(xml).find('speed').text();

                RenameAttack();
            },
            error: function() {
                UI.ErrorMessage('An error occurred while processing XML file.');
            }
        });
    }

    main()