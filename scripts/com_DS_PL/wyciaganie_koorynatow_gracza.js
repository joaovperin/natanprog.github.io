(function() {
Dialog.show("okienko",`<textarea cols=30 rows=8 readonly>${document.querySelector("#villages_list").innerHTML.match(/(\d+)\|(\d+)/g).join(' ')}</textarea>`)
}())