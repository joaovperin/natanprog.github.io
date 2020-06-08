/* 
	Author	: Dale McKay
	Email	: dalesmckay@gmail.com
	Purpose	: To help simplify Tribal Wars scripting by providing a common framework.
	Credit	: 
	Todo	:
	Notes	:
____________________________________________________________

Copyright (C) 2011 Dale McKay, all rights reserved
version 1.0, 10 April 2011

This software is provided 'as-is', without any express or implied warranty. In no event will the author be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:
The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
This notice may not be removed or altered from any source distribution.
____________________________________________________________
*/

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// The following helper objects will be available at run-time:
//		* $.twCache()	- localStorage manipulation
//		* $.twConfig()	- configuration & settings
//		* $.twUtil()	- general helper functions/properties/constants
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
function TEMPLATE(){
	var myself=this;
	
	var script={
		name:'TEMPLATE Script',
		version:1.00,
		minGameVersion:7.00,
		author:{
			name:'YOUR_SCRIPTING_IDENTITY',
			email:'YOUR_EMAIL_ADDRESS'
		},
		runOnce:false
	};
	
	function fnScript(){
		/* >>> WRITE YOUR SCRIPT CODE HERE <<< */
	}
	
	return $.extend({id:'TEMPLATE',execute:function(fwExt){fnScript.call($.extend({},myself,script,fwExt));}},script);
} // TEMPLATE::constructor
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
