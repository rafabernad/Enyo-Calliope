/*

   Calliope ToolbarIcon v 0.2
   Copyright 2012 Rafael Bernad de Castro

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
   
*/


enyo.kind({
	name : "newness.Calliope.ToolbarSelect.Fontsize",
	kind : "newness.Calliope.ToolbarSelect",
	command : "fontsize",
	classes : "calliope-font-size",
	value : 3,
	options : [{
		content : "30%",
		value : 1
	}, {
		content : "50%",
		value : 2
	}, {
		content : "100%",
		value : 3
	}, {
		content : "120%",
		value : 4
	}, {
		content : "150%",
		value : 5
	}, {
		content : "200%",
		value : 6
	}, {
		content : "300%",
		value : 7
	}]
});
