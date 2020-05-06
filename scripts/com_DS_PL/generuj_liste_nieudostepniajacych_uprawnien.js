(function() {
  const options = document.querySelectorAll(
    `select[name="player_id"] option[disabled]`
  );
  let mailingList = '';
  options.forEach(option => {
    mailingList += `${option.innerText.split('(brak dostępu)')[0].trim()};`;
  });
  Dialog.show(
    'mailingListModal',
    `<textarea rows="8" cols="30" readonly>${mailingList}</textarea>`
  );
})();