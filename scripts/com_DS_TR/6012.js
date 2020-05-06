/**
 * @name       Farm Assistent Filter
 * @version    0.1
 * @description  adds a input field to the farm assistant overview in order to filter for villages with at least a certain amount of ress in it.
 * @copyright  TM4rkuS
 
 * changelog:
	* 2013 Oct 13 - changed input size so players can more easily see the number entered - cheesasaurus
	* 2013 Oct 13 - changed 'error prevention' cell check to also work with more cells. My account had 12 cells, probably depends on which premium features are activated. - cheesasaurus
	* 2013 Oct 13 - fixed to detect resource amounts correctly when 1.000+ of a type of resource is included - cheesasaurus
	* 2014 Sep 05 - updated for v 8.26
*/

if(!twcheese)
	var twcheese = {};

//locating the important DOM-Elements
var div = document.getElementById("am_widget_Farm");
var table = $('#plunder_list')[0];
var rows = table.getElementsByTagName("tr");


//variables
var savedMinRess, ressArray, ressInt, cells;


//get last input from local storage
savedMinRess = localStorage.getItem("tm4rkus_savedMinRess");


//add input-field
cells = rows[0].getElementsByTagName("th");
var input = document.createElement("input");
input.size = 6;
input.value = savedMinRess;
input.style.marginRight = "5px";
cells[5].insertBefore(input,cells[5].getElementsByTagName("img")[0]);


//update the list every time the user inserts anything
input.addEventListener("keyup", filter, false);


function filter() {
    savedMinRess = input.value;
    localStorage.setItem("tm4rkus_savedMinRess", savedMinRess);
	
    //iterate through every row
    for (var i = 1; i < rows.length; i++) {
        cells = rows[i].getElementsByTagName("td");
		
        //error prevention
        if (cells.length >= 10) {
			
            /*
			ressArray = cells[5].textContent.split(" ");
			
            //add up ressources
            ressInt = parseInt(ressArray[0]) + parseInt(ressArray[1]) + parseInt(ressArray[2]);
			*/
			
			/*==== scrape and sum resources ====*/
			var cellBackup = String(cells[5].innerHTML);
			var res = $(cells[5]).find('.res, .warn_90, .warn').get();
			var ressInt = 0;
			for(var r=0; r<res.length; r++)
			{
				res[r] = Number($(res[r]).text().replace('.', ''));
				ressInt += res[r];
			}			
			cells[5].innerHTML = cellBackup;
            
            //hide row, if ressources are too low
            if (ressInt < input.value) {
                rows[i].style.display = "none";
            }
            //show row, if otherwise
            else {
                rows[i].style.display = "";
            }
        }
    }
}


filter();