/**
 * renames incomings commands that still have their default names to 'unknown [date hh:mm:ss]'
 * author: Nick Toby (cheesasaurus@gmail.com)
 * last updated: Nov 8, 2012
 * license: do whatever... no restrictions! This can be modified to rename things on a variety of overview pages.
*/
/*==== register ====*/
var script =
{
	scriptname: 'rename untagged incomings to "unknown"',
	version: 8.20,
	author: 'Nicholas Toby',
	email: 'cheesasaurus@gmail.com',
	broken: false
};
$.post(ScriptAPI.url,script);

/*==== rename ====*/
$('.quickedit').each(function(key,incoming){ //each incoming
	$(incoming).find('.rename-icon').click();
	var name = $(incoming).find('input[type=text]').val();
	if (name == 'Attack') {
		$(incoming).find('input[type=text]').val('unknown ['+$('#serverDate').html()+' '+$('#serverTime').html()+']');
	}
	$(incoming).find('input[type=button]').click();
});