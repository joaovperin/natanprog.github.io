$('#techs_table tr:not(:first)').each(function(i,e){
  var h = true;
  $(e).find('[class^=rtt]').each(function(i,e){
    if (!$(e).attr('class').match('green')) h = false;
  });
  if (h) e.parentNode.removeChild(e);
});
