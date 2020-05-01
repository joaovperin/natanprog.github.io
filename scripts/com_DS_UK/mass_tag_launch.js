script="https://media.innogamescdn.com/com_DS_UK/Scripts/mass_tag.js";
s=document.createElement('script');
s.type='text/javascript';
s.src=script+'?'+Math.floor((new Date()).valueOf()/604800000 + 0);
document.getElementsByTagName('head')[0].appendChild(s);