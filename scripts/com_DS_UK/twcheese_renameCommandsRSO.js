javascript:
/*	twcheese_renameCommandsRSO.js
 *	Command Renamer - recently sent (outgoing)
 *	version 1.1_04
 *	game compatability: version	8.12
 *	market: uk
 *	author Nick Toby (cheesasaurus@gmail.com)

 *	use script on: game.php?screen=place&mode=command (the commands view of the rally point)
 *	effect: renames all recently sent commands that can still be cancelled
 
 *	Copyright (C) 2011  Nick Toby

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see http://www.gnu.org/licenses/
 */
 
 /*==== imagePaths ====*/
 
	var imagePaths = new Array();
	imagePaths['delete'] = 'http://' + document.domain + '/graphic/delete.png';

/*==== page modifier functions ====*/

	/**
	 *	opens a css popup
	 *	@param	id:String
	 *	@param	title:String
	 *	@param	width:Number
	 *	@param	content:String	a string of HTML to include in the popup
	 */			
	function twcheese_openPopup(id,title,width,content)
	{
		closeThisPopup = function()
		{
			document.getElementById('twcheese_popup_'+id).parentNode.removeChild(document.getElementById('twcheese_popup_'+id));
		};
		
		var popupDiv = document.createElement('div');
		popupDiv.id = 'twcheese_popup_' + id;
				
		popupDiv.style.borderStyle = 'ridge';
		popupDiv.style.borderColor = 'brown';
		popupDiv.style.display = 'block';
		popupDiv.style.position = 'fixed';
		popupDiv.style.zIndex = '99999';
		popupDiv.style.top = '25%';
		popupDiv.style.width = width;
		popupDiv.style.left = '50%';
		popupDiv.style.marginLeft = '-' + Number(width / 2);
		popupDiv.style.backgroundColor = '#f7eed3';		
		
		/*==== title bar ====*/				
		var popupTitleBar = document.createElement('table');
		popupTitleBar.style.backgroundColor = '#dfcca6';
		popupTitleBar.insertRow(-1);
		popupTitleBar.rows[0].insertCell(-1);
		popupTitleBar.rows[0].insertCell(-1);
		popupTitleBar.rows[0].cells[0].innerHTML = '<b>'+title+'</b>';
		popupTitleBar.rows[0].cells[0].width = '100%';
		popupTitleBar.rows[0].cells[1].innerHTML = '<img src="'+imagePaths['delete']+'" alt="X"/>';
		popupTitleBar.rows[0].cells[1].onMouseOver = popupTitleBar.rows[0].cells[1].style.cursor="pointer";
		popupTitleBar.rows[0].cells[1].onclick = closeThisPopup;
		popupTitleBar.rows[0].cells[1].style.color = 'red';
		popupDiv.appendChild(popupTitleBar);
		
		/*==== content ====*/
		var popupContent = document.createElement('div');
		popupContent.innerHTML = content;
		popupDiv.appendChild(popupContent);
		
		/*==== open popup ====*/
		document.body.appendChild(popupDiv);		
	}

	function twcheese_closePopup(id)
	{
		document.getElementById('twcheese_popup_'+id).parentNode.removeChild(document.getElementById('twcheese_popup_'+id));
	}

/*==== renamer functions ====*/
 
	/**
	 *	renames all recently sent commands that can still be cancelled
	 *	@param type:Number 0 signifies all new commands; 1 signifies new attacks only; 2 signifies new support only
	 *	@param label:String The text for the commands to be renamed to.
	 */
	function twcheese_renameCommandsRSO(type,label)
	{
		try{
		var gameDoc = (window.frames.length>0)?window.main.document:document;
		var commands = new Array();
		var commandsTableBody;
		
		/*==== find commands ====*/
		var h3_elements = gameDoc.getElementsByTagName('h3');
		
		for(var i=0; i < h3_elements.length; i++)
		{
			if(h3_elements[i].innerHTML == 'Troop movements')
			{
				if(h3_elements[i].nextSibling)
					commandsTableBody = h3_elements[i].nextSibling.nextSibling.getElementsByTagName('tbody')[0];
			}
		}
		
		if(commandsTableBody)
		{
			/*==== determine which commands need to be renamed ====*/
			for(var i=1; i < commandsTableBody.rows.length; i++)
			{
				if(commandsTableBody.rows[i].cells.length == 4)
				{
					var addCommand = false;
					if(commandsTableBody.rows[i].cells[3].innerHTML.search('cancel') != -1)
					{						
						if(type == 1)
							addCommand = true;
						else if(type == 2)
						{
							if(commandsTableBody.rows[i].getElementsByTagName('img')[0].src.search('attack.png')!=-1)
								addCommand = true;
						}
						else if(type == 3)
						{
							if(commandsTableBody.rows[i].getElementsByTagName('img')[0].src.search('support.png')!=-1)
								addCommand = true;
						}
					}
					
					if(addCommand)
					{
						var text = commandsTableBody.rows[i].getElementsByTagName('span')[0].id;
						commands.push(text.substring(text.indexOf('[')+1,text.indexOf(']')));
					}
				}
			}
			
			/*==== retrieve key required for certain events ====*/
			var text = String(commandsTableBody.rows[1].getElementsByTagName('input')[1].onclick);
			var hash = text.substring(text.indexOf('&h=')+3,text.indexOf('&id'));
			
			/*==== rename commands ====*/
			for(var i=0; i< commands.length; i++)
			{
				document.getElementById('editInput['+commands[i]+']').value = label;
				editSubmit('label['+commands[i]+']', 'labelText['+commands[i]+']', 'edit['+commands[i]+']', 'editInput['+commands[i]+']', game_data.link_base_pure +'&screen=info_command&ajaxaction=edit_own_comment&h='+hash+'&id='+commands[i]+'');
			}
		}
		}
		catch(e)
		{		alert(e);}
	}
	
	function twcheese_renameCommandsPrompt()
	{	
		twcheese_renameAsSelected = function()
		{
			var type = document.getElementById('twcheese_renameCommandsPrompt_type').value;
			var label = document.getElementById('twcheese_renameCommandsPrompt_label').value;
			twcheese_renameCommandsRSO(type,label);
		};
		
		var promptHTML = '<table><tbody><tr><td><table><tbody>';
		promptHTML += '<tr><td>new name:</td><td><input id="twcheese_renameCommandsPrompt_label" type="text" value="NEW"/></td></tr>';
		promptHTML += '<tr><td>type:</td><td><select id="twcheese_renameCommandsPrompt_type">';
		promptHTML += '<option value="1">All</option>';
		promptHTML += '<option value="2">Attacks</option>';
		promptHTML += '<option value="3">Support</option></select></td></tr></tbody></table>';
		promptHTML += '</td><td><button onclick="twcheese_renameAsSelected();">rename</button><br/></td></tr>';
		promptHTML += '</tbody></table>';
		twcheese_openPopup('renameCommandsPrompt','Rename Recently Sent Commands','300',promptHTML);
	}

/*==== main ====*/	
	
	if(game_data.screen == 'place')
	{
		twcheese_renameCommandsPrompt();
	}
	else
		alert('To use this, you must be at the rally point, in the Commands view.');

	timers=[];
	void(0);