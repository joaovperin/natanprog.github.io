var doc = document;
if(window.frames.length > 0)doc = window.frames[0].document;
var pontos = [];
pontos["spear"] = [4, 1];
pontos["sword"] = [5, 2];
pontos["axe"] = [1, 4];
pontos["archer"] = [5, 2];
pontos["spy"] = [1, 2];
pontos["light"] = [5, 13];
pontos["marcher"] = [6, 12];
pontos["heavy"] = [23, 15];
pontos["ram"] = [4, 8];
pontos["catapult"] = [12, 10];
pontos["knight"] = [40, 20];
pontos["snob"] = [200, 200];
pontos["militia"] = [4, 0];
var rels = 0;
r = doc.getElementsByTagName("table");
for(i = 0; i < r.length; i ++ )
{
   if(r[i].id == "attack_info_att")rels ++ ;
}
if(rels == 0)die("O script deverá ser executado dentro de um relatório");
var atacante = getJogador("attack_info_att");
var abaixas = getBaixas("attack_info_def", "attack_info_def_units", "ODA");
var defensor = getJogador("attack_info_def");
var dbaixas = getBaixas("attack_info_att", "attack_info_att_units", "ODD");
var msg = "";
if(rels > 1)
{
   msg += "FORAM DETECTADOS " + rels.toString() + " RELATORIOS NESTA PAGINA\n";
   msg += "Estas estatisticas são relativas ao relatório encontrado\n\n\n";
}
if(atacante != "---" && atacante == defensor)
{
   msg += "*** AUTO-ATAQUE ***\n\n";
}
if(atacante == "---")
{
   atacante = "(Aldeia de bárbaros)";
}
if(defensor == "---")
{
   defensor = "(Aldeia de bárbaros)";
}
msg +="Calculadora ODD/ODA\n\n"+ "Atacante: " + atacante + "\n";
if(abaixas[2].length > 0)
{
   msg += "  Unidades aniquiladas: " + formatar3(abaixas[1]) + " [" + abaixas[2].toString() + "]\n";
   msg += "  ODA: " + formatar3(abaixas[0]) + "\n";
}
else
{
   msg += "  Unidades aniquiladas: (Removido pelo proprietário)\n";
   msg += "  ODA: (desconhecido)\n";
}
msg += "\n";
msg += "Defensor: " + defensor + "\n";
if(dbaixas[2].length > 0)
{
   msg += "  Unidades aniquiladas: " + formatar3(dbaixas[1]) + " [" + dbaixas[2].toString() + "]\n";
   msg += "  ODD: " + formatar3(dbaixas[0]) + "\n";
}
else
{
   msg += "  Unidades aniquiladas: (Removido pelo proprietário)\n";
   msg += "  ODA: (desconhecido)\n";
}
if(atacante == defensor)
{
   msg += "\n\n";
   msg += "ODA + ODD: " + formatar3(dbaixas[0] + abaixas[0]) + "\n";
}
alert(msg);
die();
function getJogador(oid)
{
   tb = doc.getElementById(oid).rows;
   return tb[0].cells[1].textContent;
}
function getBaixas(oidparent, oid, tipo)
{
   var out = [0, 0, []];
   if(doc.getElementById(oidparent))
   {
      var tbparent = doc.getElementById(oidparent).getElementsByTagName("table");
      for(var t = 0; t < tbparent.length; t ++ )
      {
         if(tbparent[t].id == oid)
         {
            var imagem = tbparent[t].getElementsByTagName("img");
            unidades = [];
            for(var j = 0; j < imagem.length; j ++ )
            {
               nm = imagem[j].getAttribute("src");
               ini = nm.lastIndexOf("_") + 1;
               fin = nm.lastIndexOf(".");
               unidades.push(nm.substr(ini, fin - ini));
            }
            var pos = (tipo == "ODA" ? 0 : 1);
            var tb = tbparent[t].rows;
            if(tb.length > 0)
            {
               baixas = [];
               od = 0;
               odu = 0;
               for(var i = 0; i < tb.length; i ++ )
               {
                  if(tb[i].cells[0].innerHTML == "Baixas:")
                  {
                     for(var j = 1; j < tb[i].cells.length; j ++ )
                     {
                        baixas[j - 1] = tb[i].cells[j].innerHTML;
                        od += parseInt(tb[i].cells[j].innerHTML, 10) * pontos[unidades[j - 1]][pos];
                        odu += parseInt(tb[i].cells[j].innerHTML, 10);
                     }
                     break;
                  }
               }
               if(baixas.length > 0)
               {
                  out = [od, odu, baixas];
               }
            }
         }
      }
   }
   return out;
}
function formatar3(num)
{
   x = num.toString();
   z = "";
   for(var i = x.length - 1; i >= 0; i -- )
   {
      z += x.charAt(i);
   }
   z = z.replace(/(\d{3})/g, "$1" + ".");
   if(z.slice( - 1) == ".")
   {
      z = z.slice(0, - 1);
   }
   x = "";
   for(var i = z.length - 1; i >= 0; i -- )
   {
      x += z.charAt(i);
   }
   return x;
}
function die(msg)
{
   if(msg !== undefined)alert(msg);
   end();void(0);
}
