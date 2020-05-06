;(function() {
// dodać opcję aby nie proponowało schodzić poniżej czasu zakończenia ostatniej budowy

		var buildingsToBuild = [];
		$("[id^=main_buildrow]").each((i,s) => {if (s.cells.length == 7) buildingsToBuild.push(s)});

		var v = game_data.village;
		var res = [v.wood_float,v.stone_float,v.iron_float];
		var inc = [v.wood_prod,v.stone_prod,v.iron_prod];
		add = (a,b) => a+b;
		hasEnough = (a,b) => a.every((v,i) => v >= b[i]);
		diff = (a,b) => a.map((v,i) => v - b[i]);
		sum = (a,b) => a.map((v,i) => v + b[i]);

		var shoppingList = [];
		for(var i =0;i<buildingsToBuild.length;i++){
			var cost = [];
			for (var k =0;k<3;k++) 	cost.push(Number(buildingsToBuild[i].cells[1+k].innerText));
			if (hasEnough(res,cost)) continue;
			var needs = [];
			for (var k =0;k<3;k++) needs.push(cost[k]-res[k]);
			//if (Math.max(...cost) > game_data.village.storage_max) continue;
			var currTime = Math.max(...needs.map((v,i) => (v <= 0 ? 0 : v/inc[i])));
			var minTime = Math.max((cost.reduce(add) - res.reduce(add)) / (inc.reduce(add)),0);
		
			//console.log(currTime, minTime);
			var optimal = diff(needs,inc.map(x => x*minTime));
			var waited = diff(needs,inc.map(x => x*currTime));
			shoppingList.push({
				name: buildingsToBuild[i].cells[0].children[1].innerText,
				level:buildingsToBuild[i].cells[0].children[3].innerText,
				optimal: optimal,
				waited : waited,
				currTime: currTime, 
				minTime: minTime
			});
		}
		var gui ='<table width="700" class="vis" id="hermiTabelkaBudowy"><thead><tr><th rowspan="2" width="300">Budynek</th><th colspan="3">Surowce</th><th colspan="3">Czasy</th></tr><tr><th width="300">Drewno</th><th width="300">Glina</th><th width="300">Żelazo</th><th>Obecny</th><th>Minimalny</th><th>Oszczędność</th></tr></thead><tbody></tbody></table>';
		Dialog.show('ht',gui);
		round = v => Math.round(v * 100) / 100;
		woodInfo = v => `<td><span class="icon header wood "> </span>${round(v)}</td>`
		stoneInfo = v => `<td><span class="icon header stone"> </span>${round(v)}</td>`
		ironInfo = v => `<td><span class="icon header iron"> </span>${round(v)}</td>`
		var table = $('#hermiTabelkaBudowy')[0];
		addToTable = info => {
			var r1 = table.insertRow();
			r1.className = 'row_a';
			r1.innerHTML = `<td><strong>${info.name}<strong></td>${woodInfo(info.waited[0])}${stoneInfo(info.waited[1])}${ironInfo(info.waited[2])}<td>${round(info.currTime)}</td><td/><td rowspan="2">${round(info.currTime-info.minTime)}<td/>`;
			var r2 = table.insertRow();
			r2.className = 'row_b';
			r2.innerHTML = `<td>${info.level}</td>${woodInfo(info.optimal[0])}${stoneInfo(info.optimal[1])}${ironInfo(info.optimal[2])}</td><td><td>${round(info.minTime)}</td>`;
			
		}
		shoppingList.forEach(e => addToTable(e));
		

})();