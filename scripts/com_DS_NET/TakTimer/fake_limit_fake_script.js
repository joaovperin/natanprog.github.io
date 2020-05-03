/*javascript: 
standard_scouts = 50;
coords = '123|456 444|555';
url = document.URL;
cookie_date = new Date(new Date().getTime() + 2419200000);
cookie_name = "fake_limit_world_fake_cookie";
troop_preference =[8,9,0,1,7,4];*/

/*
The below list refers to the troop_preference array above.

The value beside each unit name, corresponds to the number you should enter into the array to use a particular troop type.

The number corresponding to the troop, should be entered in your order of preference.
0 = Spearmen
1 = Swordsman
2 = Axemen
3 = Archers

4 = Scouts
5 = Light Cavalry
6 = Mounted Archers
7 = Heavy Cavalry

8 = Ram
9 = Catapults

10 = Paladin
11 = Snobs
*/

if (url.indexOf('screen=place') == - 1) window.location = "game.php?screen=place&village=" + gd.village.id;

total_preference = troop_preference.length - 1;
selected = 0;

/*Set Functions */

/* Contraction of getElementsByTagName */
function byTag(my, tag)
   {   return my.getElementsByTagName(tag)[0];
   }


/* Loads external XML data into a variable. */
function fnGetConfig(command, type)
   {var oRequest = new XMLHttpRequest();
    var sURL = "http://" + window.location.hostname + "/interface.php?func=get_" + command;
    oRequest.open("GET", sURL, 0);
    oRequest.send(null);
    if (oRequest.status == 200) return oRequest.responseXML;
    alert("Error loading " + type + " data from XML");
   }


/* Returns the build factor of a specificed building_type from the XML storage variable */
function get_factor(building_type)
   {return byTag(byTag(build_xml, building_type), "build_time_factor").firstChild.nodeValue;
   }

function totalPoints(level, base_points, build_time_factor)
   {return (level == 0) ? 0: Math.round(base_points * Math.pow(build_time_factor, level - 1));
   }

function get_building_level(x)
   {return the_buildings_array[buildings[x]];
   }


/* End Set Functions */



function determine_points()
   {build_xml = fnGetConfig("building_info", "Building information");
    var buildings_base_points =  {"main": 10, "barracks": 16, "stable": 20, "garage": 24, "snob": 512, "smith": 19, "place": 0, "statue": 24, "market": 10, 
      "wood": 6, "stone": 6, "iron": 6, "farm": 5, "storage": 6, "hide": 5, "wall": 8, "church": 10, "church_f": 10};
    points =[];
    factor =[];
    levels =[];
    buildings =["main", "farm", "storage", "place", "barracks", "church", "church_f", "smith", "wood", "stone", "iron", "market", "stable", "wall", 
      "garage", "hide", "snob", "statue"];
    the_buildings_array = gd.village.buildings;
    current_points = 0;
    pos_offset = 0;
    for (i = 0;i < buildings.length;i++)
       {levels[i] = get_building_level(i);
        if (buildings[i] != "wood" && buildings[i] != "stone" && buildings[i] != "iron")
           {if (byTag(build_xml, buildings[i]) != undefined)
               {factor[i] = get_factor(buildings[i]);
                points[i] = totalPoints(levels[i], buildings_base_points[buildings[i]], factor[i]);
                current_points = parseInt(current_points) + parseInt(points[i]);
               }
            else 
               {factor[i] = 0;
                points[i] = 0;
               }
           }
        else 
           {if(build_xml.getElementsByTagName("church")[0])
              {pos_offset = pos_offset +2;
              }
            factor[i] = 1.2;
            pos_offset = pos_offset + 1;
            points[i] = totalPoints(levels[i], buildings_base_points[buildings[i]], factor[i]);
            current_points = parseInt(current_points) + parseInt(points[i]);
           }
       }
   }

function get_all_troops()
   {
   function getTroop(a)
       {if (typeof (a) == undefined)
           {           return 0;
           }
        else 
           {           return parseInt(doc.units[a].parentNode.getElementsByTagName("a")[1].innerHTML.match(/\d+/), 10);
           }
       }
    pop =[1, 1, 1, 1, 2, 4, 5, 6, 5, 8, 10, 100];
    available =[getTroop("spear"), getTroop("sword"), getTroop("axe"), 0, getTroop("spy"), getTroop("light"), 0, 
      getTroop("heavy"), getTroop("ram"), getTroop("catapult"), getTroop("knight"), getTroop("snob")];
    if (typeof (doc.forms[0].archer) != "undefined")
       {available[3] = getTroop("archer");
        available[6] = getTroop("marcher");
       }
    troop_fs =[];
    for (i = 0;i < pop.length;i++)
       {troop_fs[i] = Math.round(available[i] / pop[i]);
       }
   }
function select_troops()
   {for (i = 0;i < troop_preference.length;i++)
     {pref_avail[i] = available[troop_preference[i]];
      pref_names[i] = troop_names[troop_preference[i]];
     }
   
    required = Math.ceil(current_points / 100);
    if (available[4] > standard_scouts)
        {for (x=0; x < troop_preference.length; x++)
           {if(troop_preference[x] == 4)
               {actually_insert[x] = standard_scouts;
                selected = standard_scouts*2;
                }
           }
        }
    for (i=0; selected < required && terminate_loop != true; i++)
      {if (j >= troop_preference.length){terminate_loop = true;}
       else
        {if (pref_avail[j] > 0)
          {actually_insert[j] = actually_insert[j] + 1;
           pref_avail[j] = pref_avail[j] - 1;
           selected = selected + pop_by_name[pref_names[j]];
          }
         else
          {j = j+1;
          }
        }
      }
   }

function insert_the_troops()
  {for(i=0; i < troop_preference.length; i++)
    {doc.getElementById("unit_input_" + pref_names[i]).value = actually_insert[i];
    }
  }

function do_coords()
   {coords = coords.split(" ");
    index = 0;
    farmcookie = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
    if (farmcookie != null) index = parseInt(farmcookie[2]);
    if (index >= coords.length) alert('last village');
    if (index >= coords.length) index = 0;
    coords = coords[index];
    coords = coords.split("|");
    index = index + 1;
    document.cookie = cookie_name +'='+ index +";expires=" + cookie_date.toGMTString();
    doc.forms[0].x.value = coords[0];
    doc.forms[0].y.value = coords[1];
    }

/* Set base variables */

doc = (window.frames.length > 0) ? window.main.document: document;
total_preference = troop_preference.length - 1;
selected = 0;
 
if (typeof (main) != 'undefined')
   {$ = main.$;
    gd = main.game_data;
    thestring = main.location.search;
   }
else 
   {gd = game_data;
    thestring = window.location.search;
   }

actually_insert = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
troop_names =["spear", "sword", "axe", "archer", "spy", "light", "marcher", "heavy", "ram", "catapult", "knight", "snob"];
pop_by_name = {"spear": 1, "sword": 1, "axe": 1, "archer": 1, "spy": 2, "light": 4, "marcher": 5, "heavy": 6, "ram": 5, 
  "catapult": 8, "knight": 10, "snob": 100};
j = 0;
selected = 0;
pref_avail = [];
pref_names = [];
terminate_loop = false;

/* End set state variables */

/* Execute script functions */
determine_points();
get_all_troops();
select_troops();
insert_the_troops();
do_coords();

/* End execution of functions */

if (selected < required){alert("INSUFFICIENT TROOPS AVAILABLE TO LAUNCH FAKE ATTACK");}

void (0);