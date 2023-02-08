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
	,'ng!$q'
], 
function (
	 qlik
	,$
	,$q
){
    'use strict';

	//current app
	var app = qlik.currApp();

	//list all sheets
	var getSheetList = function (){
		var defer = $q.defer();
		app.getAppObjectList(function(data){
			var sheets = [];
			sheets.push({
				value: null,
				label: 'Select'
			});
			var sortedData = _.sortBy( data.qAppObjectList.qItems, function(item){
				return item.qData.rank;
			});
			_.each(sortedData, function(item){
				sheets.push( {
					value: item.qInfo.qId,
					label: item.qMeta.title
				});
			});
			return defer.resolve(sheets);
		} );
		return defer.promise;
	};

	//sheet list option
	var sheetList = {
		type: 		"string",
		component: 	"dropdown",
		label: 		"Go to Sheet",
		ref: 		"selectedSheet",
		options: 	function(){ return getSheetList().then(function(items){ return items; }); }
	};

	//dalay time option
	var timeDelay = {
		type: 			"number",
		label: 			"Duration (seconds)",
		ref: 			"timeDelay",
		defaultValue: 	20,
	};

	//progressbar background color option
	var progressBg = {
		type: 			"string",
		label: 			"Color",
		ref: 			"progressBg",
		defaultValue: 	"#CCCCCC",
	};

	//progressbar height option
	var progressHeight = {
		type: 			"number",
		label: 			"Height",
		ref: 			"progressHeight",
		defaultValue: 	25,
	};
	
	//progressbar nimation option
 	var progressAnimation = {
		type: 			"string",
		component: 		"dropdown",
		label: 			"Direction",
		ref: 			"progressAnimation",
		defaultValue: 	"fw",
		options:[
			 {value: "fw", label: "Right"}
			,{value: "bw", label: "Left"}
		]		
	};	

	return {
		type: "items",
		component: "accordion",
		items: {
			appearence: {
				uses: "settings"
			},
			settings: {
				type: "items",
				label: "Options",
				items: {
					timeDelay: timeDelay, 
					sheetList: sheetList,
					progressAnimation: progressAnimation,
					progressBg: progressBg,
					progressHeight: progressHeight
				}
			}
		}
	}
});