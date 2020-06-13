javascript:
if (typeof categories == 'undefined') {
    var categories = ["Scavenging", "Trading", "Scouts", "Achievements","Forwarded","Misc"];
}
if (window.location.href.indexOf('screen=report') < 0) {
    //relocate
    window.location.assign(game_data.link_base_pure + "report");
}


//check if folder exists
function moveMail(name) {
    //check if scavenging
    if (name == "Scavenging") {
        //if correct page, run this, this will select all scavenging reports
        $("img[src*='report_scavenging']").parent().prev().find('input').prop("checked", true);
        $('select[name*="group_id"] option:contains("Scavenging")').prop('selected', true);
        $(".btn[name='arch']").click();
    }
    if (name == "Trading") {
        //if correct page, run this, this will select all Trading reports
        $("img[src*='report_trade']").parent().prev().find('input').prop("checked", true);
        $('select[name*="group_id"] option:contains("Trading")').prop('selected', true);
        $(".btn[name='arch']").click();
    }
    if (name == "Scouts") {
        //if correct page, run this, this will select all Scouts reports
        $('.quickedit-label:contains("scouts")').closest(".quickedit.report-title").parent().prev().find('input').prop("checked", true);
        $('select[name*="group_id"] option:contains("Scouts")').prop('selected', true);
        $(".btn[name='arch']").click();
    }
    if (name == "Achievements") {
        //if correct page, run this, this will select all Achievements reports
        $('.quickedit-label:contains("Achievement received")').closest(".quickedit.report-title").parent().prev().find('input').prop("checked", true);
        $('select[name*="group_id"] option:contains("Achievements")').prop('selected', true);
        $(".btn[name='arch']").click();
    }
    if (name == "Forwarded") {
        //if correct page, run this, this will select all Forwarded reports
        $("img[src*='forwarded']").parent().parent().parent().parent().prev().find('input').prop("checked", true);
        $('select[name*="group_id"] option:contains("Forwarded")').prop('selected', true);
        $(".btn[name='arch']").click();
    }
    if (name == "Misc") {
        //if correct page, run this, this will select all random reports
        $("img[src*='report_command_sharing']").parent().prev().find('input').prop("checked", true);
        $("img[src*='report_notes_sharing']").parent().prev().find('input').prop("checked", true);
        $("img[src*='knight.png']").parent().prev().find('input').prop("checked", true);
        $("img[src*='report_ally']").parent().prev().find('input').prop("checked", true);
        $("img[src*='served_player']").parent().prev().find('input').prop("checked", true);
        $("img[src*='player_points']").parent().prev().find('input').prop("checked", true);
        $("img[src*='add_friend']").parent().prev().find('input').prop("checked", true);
        $("img[src*='coinbag']").parent().prev().find('input').prop("checked", true);
        $('.quickedit-label:contains("found a Skill Book")').closest(".quickedit.report-title").parent().prev().find('input').prop("checked", true);
        $('select[name*="group_id"] option:contains("Misc")').prop('selected', true);
        $(".btn[name='arch']").click();
    }
    if (name!="Scavenging" && name!="Trading" && name!="Scouts" && name!="Achievements" && name!="Forwarded" && name!="Misc")
    {
        //custom category filtered on label
        $('.quickedit-label:contains("'+name+'")').closest(".quickedit.report-title").parent().prev().find('input').prop("checked", true);
        $('select[name*="group_id"] option:contains("'+name+'")').prop('selected', true);
        $(".btn[name='arch']").click();
    }
}


function createWindow() {
    if (window.location.href.indexOf('report&mode=groups') > -1) {
        //relocate
        window.location.assign(game_data.link_base_pure + "report");
    }
    html=`
    <div style="width:500px"><center>
        <h1>Choose which reports to sort</h1>
        <hr>`
    $.each(categories,function(nr)
    {
        html+=`<button type="button" class="btn" name="${categories[nr]}" style="padding: 10px;width: 120px" onclick="moveMail('${categories[nr]}')">${categories[nr]}</button>
        <br>`
    })
    html+="<p>Script by Sophie 'Shinko to Kuma'</p></center></div>";
    Dialog.show("content", html);
}

function createFolders() {
    
    if (window.location.href.indexOf("report&mode=groups") > -1) {
        //on folder page
        $.each(categories, function (i) {
            count=0;
            $.each($("#report_group_list input[name*='group_name']"), function (c) {
                if(categories[i]==$("#report_group_list input[name*='group_name']").eq(c).attr("value"))
                {
                    count++;
                    //category exists
                }
            })
            if (count == 0) missingGroup(categories[i]);
        }
        )
    }
    else {
        for (var i = 0; i < categories.length; i++) {
            console.log(categories[i]);
            count = 0;
            for (var p = 0; p < $(".vis:eq(1) a").length; p++) {
                if ($(".vis:eq(1) a")[p].innerText.indexOf(categories[i]) > -1) {
                    count++;
                    console.log("group exists")
                }
            }
            if (count == 0) missingGroup(categories[i]);
        }
    }
    createWindow();
}

function missingGroup(name)
{
    //create group
     Dialog.show("content", `
     <div>
         <h1>Creating folder for: ${name}</h1>
         <form action="/game.php?&screen=report&mode=groups&action=create_group&" method="post">
             <table class="vis">
                 <tbody>
                     <tr>
                         <th>Folder name: ${name}</th>
                         <td><input name="group_name" type="hidden" value="${name}"></td><td><input class="btn" type="submit" value="Create folder"></td>
                     </tr>
                 </tbody>
             </table>
             <input type="hidden" name="h" value="${csrf_token}">
         </form>
     </div>
     `)
    throw Error("missing group");
}

createFolders();