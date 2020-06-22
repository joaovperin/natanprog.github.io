var Time_Cfg = [6,12]; 
var link = document.URL; 
var link = link + "";   
if(game_data.screen != 'am_farm') {
UI.ErrorMessage('Ce script doit être lancé depuis l\'assistant de pillage.', 5000);} else { 
$("a.farm_icon_c, a.farm_icon_b, a.farm_icon_a").click(function () {
    var ligne = $(this).closest('tr');
    setTimeout(function() {ligne.remove()}, 300);
});
var Main_table, new_element, line, ressource, Time_Cell, Elapsed_Time, Mobile_Index; 
if(mobile == false) 	{ 		Mobile_Index=0; 	} 	
else 	{ 		Mobile_Index=1; 	} 	 
Line_per_data_mob=[1,3]; 	 
Main_table = document.getElementById('am_widget_Farm').children[1].children[1].children[0]; 	
new_element = Main_table.children[1].insertCell(-1); 	
new_element.innerHTML = "pillage"; 
new_element.style.cssText = "text-align: center;";  
var i=2; 
while(i<Main_table.childElementCount-Line_per_data_mob[Mobile_Index]) 	{ 	
line = Main_table.children[i]; 

if(mobile == false) 		{ 		
ressource = line.children[5]; 		
Time_Cell = line.children[4]; 	
} 		else 		{ 		
ressource = line.children[1]; 	
Time_Cell = Main_table.children[i+1].children[0]; 		} 	
new_element = line.insertCell(-1); 	
new_element.style.cssText = "text-align: center;"; 	
new_element.style.cssText += "font-weight: bold;"; 
if(	((mobile == false) && (line.children[3].childElementCount == 1)) || 			((mobile == true) && (line.children[0].children[line.children[0].childElementCount-1].tagName != "IMG"))) 		{ 
if (((mobile == false) && (ressource.childElementCount == '6')) || 				((mobile == true) && (ressource.childElementCount == '12'))) 			{ 
Res = GetRessource(ressource); 				if(Res > Ressource_Cfg) 				{ 	
new_element.innerHTML = Res; 				
i+= Line_per_data_mob[Mobile_Index]; 			
} 				else 				{ 				
for(var j=0;j<Line_per_data_mob[Mobile_Index];j++) 					{ 
Main_table.deleteRow(i); 					} 				} 			} 			else 			{ 		
new_element.innerHTML = "?"; 				i+= Line_per_data_mob[Mobile_Index]; 			} 	
Elapsed_Time = GetTime(Time_Cell); 		
var ht = line.innerHTML;
if(Elapsed_Time>Time_Cfg[1]) 			{ 			
new_element.style.cssText += "background-color: rgb(220, 0, 0);"; 			} 		
else if(Elapsed_Time>Time_Cfg[0]) 			{ 			
new_element.style.cssText += "background-color: rgb(255, 153, 0);"; 			} 	
else 			{ 		
new_element.style.cssText += "background-color: rgb(0, 220, 0);"; 			} 		} 		else 		{ 
for(var j=0;j<Line_per_data_mob[Mobile_Index];j++) 			{ 	
Main_table.deleteRow(i); 			} 		} 	} }  function GetTime(Time_Cell) {
var res = 0; 	var Cell_Content = Time_Cell.innerText; 
var Reg = /le (\d+)\.(\d+)\. à (\d+)\:(\d+)\:(\d+)/g; 
var Result = Cell_Content.split(Reg); 
Today = new Date; 	Report_Date = new Date; 	
if(Result.length == 7) 	{  	
Report_Date.setDate(Result[1]); 
Report_Date.setMonth(Result[2]-1); 	
Report_Date.setHours(Result[3]); 	
Report_Date.setMinutes(Result[4]); 	} 	else 	{ 
Reg = /aujourd\'hui à (\d+)\:(\d+)\:(\d+)/g; 		
Result = Cell_Content.split(Reg); 
if(Result.length == 5) 		{ 		
Report_Date.setHours(Result[1]); 		
Report_Date.setMinutes(Result[2]); 	
} 		else 		{ 		
res = 25*3600*1000; 		} 	} 
res = (Today - Report_Date)/(1000*3600); 
res = res.toFixed(1); 	 
return res; } 
function GetRessource(Res_Cell) { 
var Somme = 0;  	
var Array_Index; 	
if(mobile == false) 	{ 	
Array_Index=[1,3,5]; 	} 	else 	{ 	
Array_Index=[1,4,7]; 	} 
if(Res_Cell.children[Array_Index[0]].innerText.length < 4) 	{ 	
Somme += parseFloat(Res_Cell.children[Array_Index[0]].innerText)/1000; 	} 	else 	{ 	
Somme += parseFloat(Res_Cell.children[Array_Index[0]].innerText); 	}
if(Res_Cell.children[Array_Index[1]].innerText.length < 4) 	{ 	
Somme += parseFloat(Res_Cell.children[Array_Index[1]].innerText)/1000; 	} 	else 	{ 
Somme += parseFloat(Res_Cell.children[Array_Index[1]].innerText); 	}  
if(Res_Cell.children[Array_Index[2]].innerText.length < 4) 	{ 	
Somme += parseFloat(Res_Cell.children[Array_Index[2]].innerText)/1000; 	} 	else 	{ 	
Somme += parseFloat(Res_Cell.children[Array_Index[2]].innerText); 	} 
Somme = Somme.toFixed(3); 	
return Somme;
}