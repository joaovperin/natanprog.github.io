script = 'https://media.innogamescdn.com/com_DS_UK/Scripts/BRE.js';
s=document.createElement('script');
s.type='text/javascript';
s.src=script+'?'+Math.floor((new Date()).valueOf()/604800000) + 8;
document.getElementsByTagName('head')[0].appendChild(s);
void 0;