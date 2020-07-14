Javascript:
(function() {
function info() {
	this.informasjon = false;
	this.ferdig = false;
	this.logg = logg;
	this.logg.writeDetailed("Starter");
	this.logg.write("Starting up!");
	
	this.readyFunction = function(myWindow,myReadyFunction){
		that = this;
		this.ready = false;
		this.readyInterval = setInterval(function(){
			that.ready = that.ready||myWindow.document.readyState==="loading"||myWindow.document.readyState==="interactive";
			if(myWindow.document.readyState==="complete"&&that.ready){
				clearInterval(that.readyInterval);
				setTimeout(function() {
					myReadyFunction();
				},1000);
			}
		},10);
	};
	
	this.openPage = function() {
		this.logg.writeDetailed("Åpner side");
		this.switcher = true;
		this.sitter = "";
		if(window.location.href.indexOf("t=")>0) {
			this.logg.writeDetailed("Kv på");
			this.sitter = "&t=" + window.location.href.split("t=")[1].split("&")[0];
		}
		this.page = window.open("/game.php?"+this.sitter+"&screen=overview_villages&mode=units&type=own_home","page","height=300,width=100");

		this.readyFunction(this.page,this.troopInfo);
	};
	
	this.troopInfo = function() {
		this.logg = logg;
		this.troopsHome = function() {
			
			/*Finner index for søkbare enheter*/
			this.searchableUnits = ["spear","sword","archer","heavy"];
			this.searchableUnitsNew = [];
			this.searchableUnitsIndex = [];
			for(this.i=0;this.i<that.page.document.getElementById('units_table').children[0].children[0].children.length-3;this.i++) {
				for(this.o=0;this.o<this.searchableUnits.length;this.o++) {
					if(that.page.document.getElementById('units_table').children[0].children[0].children[this.i+2].children[0].src.split("nit_")[1].split(".pn")[0] == this.searchableUnits[this.o]) {
						this.searchableUnitsIndex = this.searchableUnitsIndex.concat(this.i);
						this.searchableUnitsNew = this.searchableUnitsNew.concat(that.page.document.getElementById('units_table').children[0].children[0].children[this.i+2].children[0].src.split("nit_")[1].split(".pn")[0]);
					}
				}
			}
			this.logg.writeDetailed("Søkbare enhetsindexer funnet");
			
			/* Enheter hjemme*/
			this.unitsHome = [];
			this.unitsHomeTotal = 0;
			for(this.i=0;this.i<that.page.document.getElementById('units_table').children.length-1;this.i++) {
				this.unitsCity = 0;
				for(this.o=0;this.o<this.searchableUnitsIndex.length;this.o++) {
					if(this.searchableUnitsNew[this.o]=="heavy") {
						this.unitsCity = +this.unitsCity + (+that.page.document.getElementById('units_table').children[this.i+1].children[0].children[this.searchableUnitsIndex[this.o]+2].innerHTML*4);
					}else{
						this.unitsCity = +this.unitsCity + +that.page.document.getElementById('units_table').children[this.i+1].children[0].children[this.searchableUnitsIndex[this.o]+2].innerHTML;
					} 
				}
				this.unitsHome = this.unitsHome.concat(this.unitsCity);
			}
			for(this.i=0;this.i<this.unitsHome.length;this.i++) {
				this.unitsHomeTotal += this.unitsHome[this.i];
			}
			this.logg.writeDetailed("Telt alle enheter hjemme");
			this.logg.write("Units at home counted");
			
			that.page.document.getElementsByClassName('vis modemenu')[1].children[0].children[0].children[6].children[0].click();
			that.readyFunction(that.page,this.troopsSupport()/*this.troopsTotal*/); /* <-- haha, wtf??*/
			
		};
		this.troopsSupport = function() {
			
			this.citySupport = []; 
			setTimeout(function() {
				
				/* finne indexen for supportbyene*/
				this.supportedvillageindex = [];
				for(this.i=0;this.i<that.page.document.getElementById('units_table').children[1].children.length;this.i++){
					if(that.page.document.getElementById('units_table').children[1].children[this.i].className.indexOf("row_")>-1) {
						this.supportedvillageindex.push(this.i);
					}
				}
				this.logg.writeDetailed("Funnet indexene for støttebyene");
				
				/*Finner enheter i støtte og koord*/
				for(this.i=0;this.i<this.supportedvillageindex.length;this.i++) {
					if(that.page.document.getElementById('units_table').children[1].children[this.supportedvillageindex[this.i]].outerHTML.indexOf('village_checkbox')>-1) {
						this.funn = false;
						this.o = this.supportedvillageindex[this.i];
						while(!this.funn) {
							if(that.page.document.getElementById('units_table').children[1].children[o].className.indexOf('away')>-1) {
								this.supportfrom = /\d+\|\d+/.exec(that.page.document.getElementById('units_table').children[1].children[this.o].innerHTML);
								this.funn = true;
							}
							this.o--;
						}
						that.supportedvillage = that.page.document.getElementById('units_table').children[1].children[this.supportedvillageindex[this.i]];
						that.supportunits = 0;
						for(this.j=0;this.j<this.searchableUnitsIndex.length;this.j++) {
							if(this.searchableUnitsNew[this.j]=="heavy") {
								that.supportunits += +that.supportedvillage.children[this.searchableUnitsIndex[this.j]+1].innerHTML*4;
							}else{
								that.supportunits += +that.supportedvillage.children[this.searchableUnitsIndex[this.j]+1].innerHTML;
							} 		
						}
						this.supportto = /\d+\|\d+/.exec(that.supportedvillage.children[0].children[0].children[1].children[0].innerHTML);
						this.citySupport[this.i] = this.supportfrom + "\t" + this.supportto + "\t" + that.supportunits;
					}
				}
				this.logg.writeDetailed("Telt alle støttebyene");
				this.logg.write("Units in support counted");
				
				that.page.document.getElementsByClassName('vis modemenu')[1].children[0].children[0].children[0].children[0].click();
				that.readyFunction(that.page,this.troopsTotal);
			},6000); /*Noen trenger lang delay*/

		};
		this.troopsTotal = function() {
			
			/*Enheter på tur*/
			this.unitsTur = [];
			for(this.i=0;this.i<that.page.document.getElementById('units_table').children.length-1;this.i++) {
				this.unitsUtover = 0;
				for(this.o=0;this.o<2;this.o++) {
					for(this.j=0;this.j<this.searchableUnitsIndex.length;this.j++) {
						if(this.searchableUnitsNew[this.j]=="heavy") {
							this.unitsUtover = (+this.unitsUtover + +that.page.document.getElementById('units_table').children[this.i+1].children[this.o+2].children[this.searchableUnitsIndex[this.j]+1].innerHTML*4);
						}else{
							this.unitsUtover = (+this.unitsUtover + +that.page.document.getElementById('units_table').children[this.i+1].children[this.o+2].children[this.searchableUnitsIndex[this.j]+1].innerHTML);
						} 
					}
				}
				this.unitsTur = this.unitsTur.concat(this.unitsUtover);
			}
			this.logg.writeDetailed("Telt enheter på tur");
			this.logg.write("Units on trip counted");
			
			/*Summerer opp enheten og lager meldingsprodukt*/
			this.unitsTotal = [];
			this.unitsTotalTotal = 0;
			this.unitsTurTotal = 0;
			this.koords = [];
			this.product = [];
			for(this.i=0;this.i<this.unitsTur.length;this.i++) {
				this.unitsTurTotal += this.unitsTur[this.i];
				this.unitsTotal[this.i] = this.unitsHome[this.i] + this.unitsTur[this.i];
				this.unitsTotalTotal += this.unitsTotal[this.i];
				this.koords = this.koords.concat(/\d+\|\d+/.exec(that.page.document.getElementById('units_table').children[this.i+1].innerHTML));
				this.product[this.i] = this.koords[this.i] + "\t" + this.unitsHome[this.i] + "\t" + this.unitsTur[this.i] + "\t" +this.unitsTotal[this.i];
			}
			
			
			this.product = game_data.player.name + "\n\nTotal home: "+this.unitsHomeTotal+"\nTotal defence: "+this.unitsTotalTotal+"\nLast updated: "+new Date()+"\nCities\tHome\tAway\tTotal\n"+this.product.join("\n")+"\nSupport from\tSupport to\tAmount\n"+this.citySupport.join("\n");
			that.informasjon = true;
			this.logg.writeDetailed("Summert opp og lagd melding");
		};
		
		this.logg.writeDetailed("Sjekker gruppe");
		this.group = false;
		for(this.i=0;this.i<that.page.document.getElementsByClassName('group-menu-item').length;this.i++) {
			if(that.page.document.getElementsByClassName('group-menu-item')[this.i].innerHTML.indexOf("all")!=-1) {
				this.groupIndex = that.page.document.getElementsByClassName('group-menu-item')[this.i];
				if(that.page.document.getElementsByClassName('group-menu-item')[this.i].innerHTML.indexOf("&lt;")!=-1) {
					this.group = true;
				}
			}
		}
		
		if(this.group) {
			this.logg.writeDetailed("Riktig gruppe");
			this.troopsHome();
		}else{
			this.logg.writeDetailed("Bytter gruppe");
			this.groupIndex.click();
			that.readyFunction(that.page,this.troopsHome);
		}
	};
	
	this.melding = function() {
		that = this;
		this.infoInt = setInterval(function(){
			if(that.informasjon) {
				clearInterval(that.infoInt);
				if(game_data.player.name != "test1") {
					this.logg.writeDetailed("Starter søk etter gammel melding");
					this.logg.write("Searching for old message");
					that.page.document.getElementsByClassName('menu-item')[3].children[0].click();
					that.readyFunction(that.page,that.search);
				}else{
					that.ferdig = true;
				}
			}
		},10);
		
		this.search = function() {
			this.bug1 = "code";
			this.product = "["+this.bug1+"]" + this.product + "[/"+this.bug1+"]";
			this.findSwitch = false;
			this.find = function() {
				this.rad = that.page.document.getElementById('select_all').parentNode.parentNode.parentNode.children;
				for(this.i=0;this.i<this.rad.length-1;this.i++) {
					if(this.rad[this.i+1].children[0].children[1].innerHTML.indexOf("Defence update")!=-1) {
						if(this.rad[this.i+1].children[1].children[1].innerHTML == this.theName) {
							this.mldIndex = this.i+1;
							this.findSwitch = true;
						}	
					}
				}
				if(this.findSwitch) {
					this.logg.writeDetailed("Funnet gammel melding");
					this.logg.write("Message found");
					return true;
				}else{
					this.logg.writeDetailed("Ikke funnet gammel melding");
					this.logg.write("Message not found, making new");
					return false;
				}
			};
			
			if(this.find()) {
				this.rad[this.mldIndex].children[0].children[1].click();
				that.readyFunction(that.page,that.sendMld);
			}else{
				this.sitter = "";
				if(window.location.href.indexOf("t=")>0) {
					this.sitter = "&t=" + window.location.href.split("t=")[1].split("&")[0];
				}
				that.page.location.href='/game.php?'+this.sitter+'&screen=mail&mode=new',"page","height=300,width=100";
				that.readyFunction(that.page,that.newMld);
			}
		};
		
		this.sendMld = function() {
			that.page.IGM.view.beginReply();
			that.page.document.getElementById('message').value= this.product;
			this.logg.writeDetailed("Satt inn melding");
			setTimeout(function() {
				that.page.document.getElementsByClassName('btn')[1].click();
				this.logg.writeDetailed("Sendt");
				this.logg.write("Message sent. Thank you!");
				setTimeout(function() {
					that.page.close();
				},2000);
			},1000)
		};
		
		this.newMld = function() {
			that.page.document.getElementById('to').value = this.theName;
			that.page.document.getElementsByName('subject')[0].value = "Defence update";
			that.page.document.getElementById('message').value = this.product;
			this.logg.writeDetailed("Satt inn melding");
			setTimeout(function() {
				that.page.document.getElementsByClassName('btn')[1].click();
				this.logg.writeDetailed("Sendt");
				this.logg.write("Message sent. Thank you!");
				setTimeout(function() {
					that.page.close();
				},2000);
			},1000)
		};
	};
	
}

function Logg(element){
	this.loggElement = element;
	this.detailed = false;
	this.order = true;
		
	this.clear = function(){
		this.loggElement.innerHTML = "";
	};
	
	this.write = function(text){
		var tid = new Date();
		var text = "[" + ("0" + tid.getHours()).slice(-2) + ":" + ("0" + tid.getMinutes()).slice(-2) + ":" + ("0" + tid.getSeconds()).slice(-2) + "] " + text;
		if(this.loggElement.innerHTML==""){
			this.loggElement.innerHTML = text;
		}else if(this.order){
			this.loggElement.innerHTML = text + "<br>" + this.loggElement.innerHTML;
		}else{
			this.loggElement.innerHTML += "<br>" + text;
		}
		return this;
	};
	
	this.writeDetailed = function(text){
		if(this.detailed){
			this.write(text);
		}
		return this;
	};
	
	this.changeOrder = function(){
		this.order = !this.order;
		this.loggElement.innerHTML = this.loggElement.innerHTML.split("<br>").reverse().join("<br>");
	};
}

document.getElementById("content_value").innerHTML = '<table style="width: 100%"><tbody><tr><td valign="top" style="width: 50%" id="logg"></td><td valign="top" style="width: 50%" id="controlPanel"></td></tr></tbody></table>';
var logg = new Logg(document.getElementById("logg"));
theName = navn;
myInfo = new info();
myInfo.openPage();
myInfo.melding();

	
})()