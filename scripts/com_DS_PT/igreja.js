var oculto = p;var oculto1=m;var oculto2=g;var p=6;var m=9;var g=12;
MapCanvas.churchData = [igreja];
TWMap.church.displayed = true; 
MapCanvas.init(function ()
{
    if(this.churchData)for(i = 0; i < this.churchData.length; i ++ )this.churchData[i][2] *= this.churchData[i][2]
}
);
TWMap.init(function ()
{
   this.politicalMap.optionToggle = new MapToggleBox(
   {
      id : 'pmap_options'
   }
   );
   this.centerToggle = new MapToggleBox(
   {
      id : 'centercoords', url : this.urls.centerCoords
   }
   );
   this.storeVillage = new TWMapStore(3, 30);
   this.storePolitical = new TWMapStore(3, 600);
   this.storeTiles = new TWMapStore(6, 86400);
   if(this.sectorPrefech)
   {
      this.storeSectorInformation(this.sectorPrefech); this.sectorPrefech = null
   }
   ;
   this.createSecretImageCache();
   this.initMap();
   
   TWMap.updateContinent();
   
   this.context.init();
   var coord = window.location.hash.match(/^#([0-9]+);([0-9]+)$/);
   if(TWMap.map && coord !== null)setTimeout(function()
   {
      TWMap.map.centerPos(coord[1], coord[2])
   }
   , 100);
   setInterval(function()
   {
      var hash = '#' + TWMap.pos[0] + ';' + TWMap.pos[1];
      TWMap.centerList.updateNewBoxes();
      if(hash == window.location.hash)return;
      window.location.replace(hash)
   }
   , 200)
}
);