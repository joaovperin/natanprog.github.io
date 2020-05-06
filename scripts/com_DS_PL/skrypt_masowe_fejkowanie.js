javascript:
coords = "Tu wklej wspolrzedne".split(" ");
index = Math.round(Math.random() * (coords.length - 1));
document.getElementsByClassName("target-input-field target-input-autocomplete ui-autocomplete-input")[0].value = coords[index];

units("spear",0); //Pikinierzy
units("sword",0); //Miecznicy
units("axe",0); //Topornicy
units("archer",0); //Lucznicy
units("spy",0); //Zwiadowcy
units("light",0); //Lekka Kawaleria
units("marcher",0); //Lucznicy na Koniu
units("heavy",0); //Ciezka Kawaleria
units("ram",1); //Tarany
units("catapult",0) //Katapulty
units("snob",0); //Szlachcic

function units(name, value) {
	if(document.getElementById("unit_input_"+name)!== null)
	{document.getElementById("unit_input_"+name).value=value;}}
end;