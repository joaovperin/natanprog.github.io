javascript: ALT_TEXT = "(Alt Text) Floating Image (End Alt Text)";
identifier = "Floating Image";
default_x = '100';
default_y = '150';
c_name = "test";
var rememberPositionedInCookie = false;
var rememberPosition_cookieName = 'float_image_' + c_name;
tt = 'http://taktimer.net/scripts/';
abilities =[""];
titles =["Image"];
btn = document.createElement("input", "button");
btn.type = "button";
btn.value = "Click to Overlay";

btn.onclick = function()
   {javascript: main_script();
    void (0);
   };
document.body.appendChild(btn);

function overlayImage()
   {imageOverlay = prompt("Please enter the internet path for the image you want to overlay", 
      "http://www.anonmgur.com/up/7d6792025e0d81f85c58e252229ef517.png");
    imageWidth = parseInt(prompt("please enter the Total number of map fields HORIZONTALLY you want your image to cover (left to right)", "17")) * 53;
    imageHeight = parseInt(prompt("please enter the Total number of map fields VERTICALLY you want your image to cover (Top to Bottom)", "17")) * 38;
    imageBuffer = 0;
    overlayThis = "<img src='" + imageOverlay + "' style='position:absolute; top:" + imageBuffer * 38 + "px; left:" + imageBuffer * 53 + "px; z-index: 1; width:" + imageWidth + "px; height:" + 
      imageHeight + "px; opacity:0.4;'>";
   }
doc = document;

function main_script()
   {
   function set_obj_funcs()
       {insert_this = 
          "<div id='main_float' style='float:left; position: relative;' onclick=\"javascript:doc.getElementById('main_float').style.position='fixed'; void(0);\" class='dragableElement'><table id='float_image_" + 
          identifier + 
          "' class='main' style=\"border:1px; background-color: #b2816a\"><tr><th style=\"width:100%; cursor: move;background-color: #651612; color: #FFFFFF; background-image: url('http://forum.tribalwars.net/tribalwars_v2/other/dark_pattern.gif');\">" + 
          identifier + "</th></tr>";
        col_1 = '#d6c095';
        col_2 = '#e5d0a8';
        col_count = 1;
        for (i = 0;i < abilities.length;i++)
           {if (col_count == 1)
               {color = col_1;
                col_count = 2;
               }
            else if (col_count == 2)
               {color = col_2;
                col_count = 1;
               }
            overlayImage();
            insert_this += overlayThis;
           }
        insert_this += "</table></div>";
        dv = document.createElement("div");
        dv.id = "newDV";
        dv.innerHTML = insert_this;
        document.body.appendChild(dv);
        
run_script(tt + "dragbox/dragable-content.js");
       }
   
    function show_box(label)
       {if (doc.getElementById(label).style.display == "none")
           {doc.getElementById(label).style.display = "inline-table";
           }
        else 
           {/*doc.getElementById(label).style.display = "none";*/
           }
       }
    if (doc.getElementById("float_image_" + identifier))
       {/*show_box("float_image_" + identifier);*/
       }
    else 
       {set_obj_funcs();
       }
   }

function run_script(address)
   {a = doc;
    var b = a.createElement('script');
    b.type = 'text/javascript';
    b.src = address;
    a.getElementsByTagName('head')[0].appendChild(b);
   }


newMapSize = parseInt(prompt("Plz enter map size (1 number) NOWZ!!1!!111ELEVEN!", "50"));
TWMap.resize(newMapSize);
void (0);