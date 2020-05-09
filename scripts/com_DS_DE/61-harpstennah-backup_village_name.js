ScriptAPI.register( '61-Backup VillageName', true, 'Harpstennah', 'support-nur-im-forum@arcor.de' );
/* basiert auf das Script von */
if(document.URL.indexOf("screen=overview_villages" )>0){
    var wtd = prompt("Was möchtest Du machen [export] oder [import] ?",'export');
    if(wtd == "import"){
        inputlist();
    }else{
        outputlist();
    }
}else{
    alert("Dieses Skript muss auf einer Dörfer-Übersicht angewendet werden");
}


function outputlist(){
    var vlist = new String();
    var zellen = win.$('#combined_table .quickedit-vn');
    for (var i = 0; i < zellen.length; i++){
        var ID = win.$(zellen).eq(i).attr('data-id');
        var oldName = win.$('#combined_table .quickedit-label').eq(i).attr('data-text');
        vlist = vlist + ID + sep[1] + oldName + sep[0];
    }
    if(vlist){
    output = window.open('','','height=300,width=300');
    output.document.open();
    output.document.write('<textarea rows="10" cols="30" onclick="javascript:select();">'+vlist+'</textarea>');
    output.document.close();
    }
}

function inputlist(){
    var vils = new Array();
    var reply = prompt('Bitte hier die Dörferliste einfügen','');
    p = reply.split(sep[0]);

    for(i=0;i<p.length;i++){
        m = p[i].split(sep[1]);
        vils[m[0]] = m[1];
    }
    var zellen = win.$('#combined_table .quickedit-vn');
    for (var i = 0; i < zellen.length; i++){
        var ID = win.$(zellen).eq(i).attr('data-id');
        var oldName = win.$('#combined_table .quickedit-label').eq(i).attr('data-text');
        var link = zellen[i].getElementsByTagName('a');
        if (ID) {
            if (oldName != vils[ID]) {
                win.$('#combined_table .quickedit-label').eq(i).attr('data-text', vils[ID]);
                $(link[1]).click();
            }
        }   
    }
}