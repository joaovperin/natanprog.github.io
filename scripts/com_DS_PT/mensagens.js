if (document.URL.indexOf('&screen=mail') == -1) {
  var x=window.confirm('Você deve executar o script em \n\n Nova mensagem ou em responder a uma mensagem sendo que neste caso só introduz o campo da mensagem. \n\n Redireccionar para mensagens?')
if (x)
window.location="game.php?&screen=mail";
}else{$('input[name^=subject]').val(''+assunto+'');$('#message').val(''+mensagem+'');
}void(0);