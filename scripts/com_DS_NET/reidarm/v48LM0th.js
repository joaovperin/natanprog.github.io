
TWMap.graphics = "https://dsen.innogamescdn.com/asset/ef232b3/graphic//map//version2/"; //graphic
//TWMap.graphics = "https://dsgr.innogamescdn.com/asset/d25bbc6/graphic//map/"; //clasic
$("img[id^='map_village']").each(function() {
	var backline = this.src.split("/");
	backline = backline[backline.length -1];
	this.src = TWMap.graphics+ backline;
});