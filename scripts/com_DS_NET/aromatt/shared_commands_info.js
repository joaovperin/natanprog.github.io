javascript:
if (window.location.href.indexOf('screen=info_command') < 0) {
    UI.ErrorMessage("This only works on command info page");
} else {
    var a = document.createElement('span');
    a.setAttribute("id", "troop_counts");
    $("#content_value").append(a);
    var t = $('#quickedit-rename').attr('data-id');
    Command.pending_details[t] = !0, TribalWars.get("info_command", {
        ajax: "details",
        id: t
    }, function(n) {
        Command.details_cache[t] = n, Command.pending_details[t] = !1, a.innerHTML = (Command.getDetailsHTML(Command.details_cache[t]))
    });
};