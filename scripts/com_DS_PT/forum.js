if (document.URL.indexOf('&screen=forum') == -1) {
  var x=window.confirm('Você deve executar o script no \n\n Fórum da tribo em novo tópico ou em responder a uma mensagem sendo que neste caso só introduz o campo da mensagem. \n\n Redireccionar para Fórum da Tribo?')
if (x)
window.location="game.php?&screen=forum";
}else{$('input[name^=subject]').val(''+titulo+'');$('#message').val(''+texto+'');
}void(0);