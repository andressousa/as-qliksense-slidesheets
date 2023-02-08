/*!
*
* The MIT License (MIT)
* Copyright (c) 2023
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy of
* this software and associated documentation files (the "Software"), to deal in
* the Software without restriction, including without limitation the rights to
* use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
* the Software, and to permit persons to whom the Software is furnished to do so,
* subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
* FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
* COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
* IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
* CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
* @version v1.0.0
* @link https://github.com/andressousa/as-qliksense-slidesheets
* @author André Sousa
* @license MIT
*/

define([
	 'qlik'
	,'jquery'
	,'./definition'
	,'./support'
	,'css!./style.css'
],
function(
	 qlik
	,$
	,definition
	,support
){
    'use strict';

    return {
		definition: definition,
		support: support,
		paint: function ($element, layout) {

			//clear html
			$element.empty();

			//progress countdown element
			$element.append('<div id="progressCoutdown"><div class="'+layout.progressAnimation+'"></div></div>');

			if(qlik.navigation.getMode() !== 'edit'){

				//setup css styles
				$('body').find('#progressCoutdown div').css({
					'animation-duration': layout.timeDelay + 's',
					'background-color': layout.progressBg,
					'height': layout.progressHeight + 'px'
				});

				//navigation trigger to next sheet
				if( layout.selectedSheet !== null ){
					setTimeout( () => {
						qlik.navigation.gotoSheet( layout.selectedSheet );
					 }, layout.timeDelay * 1000 );
				}
			
			};

			return qlik.Promise.resolve();
		}			
    }
});