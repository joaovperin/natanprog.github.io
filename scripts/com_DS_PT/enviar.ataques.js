Array.prototype.contains = function(obj)
{
   var i, listed = false;
   for (i = 0; i < this.length; i ++ )
   {
      if (this[i] === obj)
      {
         listed = true;
         break;
      }
   }
   return listed;
}
;
function getGameDoc()
{
   getdoc = window.document;
   if( ! getdoc.URL.match('game\.php'))
   {
      for(var i = 0; i < window.frames.length; i ++ )
      {
         if(window.frames[i].document.URL.match('game\.php'))
         {
            getdoc = window.frames[i].document;
         }
      }
   }
   return getdoc;
}
;
units = Array('axe', 'spy', 'light', 'marcher', 'ram', 'catapult');
doc = getGameDoc();
form = doc.units; inputs = form.getElementsByTagName('input'); for (var i = 0; i < inputs.length; i ++ )
{
   if (inputs[i].type == 'text')
   {
      if (units.contains(inputs[i].name))
      {
         next = inputs[i].nextSibling;
         do
         {
            next = next.nextSibling;
         }
         while (next.nodeType != 1);
         s = next.firstChild.nodeValue;
         insertUnit(form.elements[inputs[i].name], next.firstChild.nodeValue.replace(/\(/g, "").replace(/\)/g, ""));
      }
   }
}
