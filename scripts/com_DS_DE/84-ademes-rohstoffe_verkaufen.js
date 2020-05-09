ScriptAPI.register( '84-Rohstoffe verkaufen', true, 'Ademes', 'support-nur-im-forum@ademes.at' );
Scriptversion = 'MIT-Lizenz - Copyright (c) 2014 Ademes , Version 1.9';
if (top.frames.length > 1){
	var doc = (top.frames[1].document.URL.match('game.php') == 'game.php') ? top.frames[1].document : top.frames[0].document;
} else {
	var doc = document;
};
if (!doc.URL.match('mode=own_offer')){
	UI.InfoMessage('Du musst dich auf dem "Marktplatz - Eigene Angebote" befinden!',3000,true);
} else {
	/* Werte einlesen */
	var Anfang = document.getElementById("content_value").getElementsByClassName("vis");
	var Ressis = new Number(doc.getElementById('market_merchant_max_transport').innerHTML);
	var ResHolz = new Number(doc.getElementById('wood').innerHTML);
	var ResLehm = new Number(doc.getElementById('stone').innerHTML);
	var ResEisen = new Number(doc.getElementById('iron').innerHTML);
	if (doc.getElementById("merchant_exchange")) {
		var Knoten = doc.getElementById("merchant_exchange");
		Knoten.parentNode.removeChild(Knoten);
	}
	/* Variantenwahl */
	if (typeof(Auto) == 'undefined')  ADS_Angebotauto();
	else  if (Auto == 'A' || Auto == 'B') ADS_Angebotausgleich();
};

function ADS_Angebotauto(){	
	/* gewümschte Werte verarbeiten */
	BieteSplit = Biete.split(",");
	SucheSplit = Suche.split(",");
	SucheInput = SucheSplit[0];
	BieteInput = BieteSplit[0];
	BieteHaendler = Math.ceil(BieteSplit[0]/1000)*1000;
	Diff = 1;
	/* Ceckbox Auswahl */
	var ResAbzug = (typeof(Reserve) == 'undefined') ? 0 : Reserve;
	if (BieteSplit[1] == "holz") {
		doc.getElementById("res_sell_wood").checked = true;
		ResMin = ResHolz - ResAbzug;
	} else if (BieteSplit[1] == "lehm") {
		doc.getElementById("res_sell_stone").checked = true,
		ResMin = ResLehm - ResAbzug;
	} else if (BieteSplit[1] == "eisen") {
		doc.getElementById("res_sell_iron").checked = true;
		ResMin = ResEisen - ResAbzug;
	} else if (BieteSplit[1] == "premium") {
		doc.getElementById("res_sell_premium").checked = true;
	}
	if (SucheSplit[1] == "holz") doc.getElementById("res_buy_wood").checked = true;
	else if (SucheSplit[1] == "lehm") doc.getElementById("res_buy_stone").checked = true;
	else if (SucheSplit[1] == "eisen") doc.getElementById("res_buy_iron").checked = true;
	else if (SucheSplit[1] == "premium") doc.getElementById("res_buy_premium").checked = true;
	/* max. Händleranzahl errechnen */
	Multi  = (BieteSplit[1] == "premium") ? Math.min(Math.floor(Ressis/1000),Anzahl) : Math.min(Math.floor(Ressis/1000),Math.floor(Math.min(Math.min(Ressis,BieteHaendler*Anzahl),ResMin)/BieteHaendler));
	ADS_Angeboteingabe();
};

function ADS_Angebotausgleich(){
	ResMin = Math.min(Math.min(ResHolz, ResLehm), ResEisen);
	ResMax = Math.max(Math.max(ResHolz, ResLehm), ResEisen);
	Diff = ResMax - Math.round((ResHolz+ResLehm+ResEisen)/3);
	/* gewümschte Werte verarbeiten */
	if (Auto == 'A') {
		BieteSplit = Biete.split(",");
		SucheSplit = Suche.split(",");
		SucheInput = SucheSplit[0];
		BieteInput = BieteSplit[0];
		BieteHaendler = Math.ceil(BieteSplit[0]/1000)*1000;
	} else if (Auto == 'B') {
		SucheInput = parseInt(1000*Verhaeltnis);
		BieteInput = parseInt(1000);
		BieteHaendler = parseInt(1000);
		Anzahl = "1000";
	}
	/* Ceckbox Auswahl */
	if (ResMax == ResHolz) doc.getElementById("res_sell_wood").checked = true;
	else if (ResMax == ResLehm) doc.getElementById("res_sell_stone").checked = true;
	else if (ResMax == ResEisen) doc.getElementById("res_sell_iron").checked = true;
	if (ResMin == ResHolz) doc.getElementById("res_buy_wood").checked = true;
	else if (ResMin == ResLehm) doc.getElementById("res_buy_stone").checked = true;
	else if (ResMin == ResEisen) doc.getElementById("res_buy_iron").checked = true;
	/* max. Händleranzahl errechnen */
	Multi = Math.round(Math.min(Math.min(Ressis,BieteHaendler*Anzahl),Diff)/BieteHaendler);
	ADS_Angeboteingabe();
};

/* Werte einfügen */
function ADS_Angeboteingabe(){
	if (Multi > 0 && Diff > 0) {
		doc.getElementsByName("multi")[0].value = Multi;
		doc.getElementsByName("max_time")[0].value = Reisedauer;
		doc.getElementsByName("buy")[0].value = SucheInput;
		doc.getElementsByName("sell")[0].value = BieteInput;
		if (typeof(Nichteintragen) == 'undefined') $('#own_offer_form input[type|=submit]').click();
	} else {
		UI.InfoMessage('Fehler! Zuwenig Händler/Rohstoffe vorhanden!',3000,true);
	}
};
