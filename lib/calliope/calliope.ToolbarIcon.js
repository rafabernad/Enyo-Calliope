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
	name : "newness.Calliope.ToolbarIcon",
	published : {
		// url path specifying the icon image
		src : "",
		active : false,
		stateful : false,
		command : ""
	},
	handlers : {
		onRefreshButtons : "refreshButton",
		onConfigureButtons : "configureButton",
		onclick : "click"
	},
	classes : "calliope-toolbar-icon",
	//* @protected
	create : function() {
		this.inherited(arguments);
		this.activeChanged();
		this.commandChanged();
		if(this.src) {
			this.srcChanged();
		}
	},
	_clickHandled : false,
	click : function(inSender, inEvent) {
		if(!this._clickHandled) {
			if(!this.command) {
				this._clickHandled = true;
				this.bubble("onclick", this.owner.editor);
			} else {
				this.setActive(this.active);
				inSender.bubble("onExecuteCommand");
			}
			return true;
		} else {
			this._clickHandled = false;
		}
	},
	tap : function() {
		this.setActive(true);
	},
	activeChanged : function() {
		if(this.command) {
			if(this.stateful) {
				this.addRemoveClass("active", this.active);
			}
			this.bubble("onActivate");
		}
	},
	srcChanged : function() {
		this.applyStyle("background-image", "url(" + enyo.path.rewrite(this.src) + ")");
	},
	commandChanged : function() {
		switch (this.command) {
			case "bold":
			case "italic":
			case "strikeThrough":
			case "underline":
			case "justifyLeft":
			case "justifyCenter":
			case "justifyRight":
			case "justifyFull":
				this.stateful = true;
				break;
			case "undo":
			case "redo":
			case "removeFormat":
				this.stateful = false;
		}
		this.addClass(this.command);
	},
	refreshButton : function() {
		if(this.stateful === true)
		this.bubble("onRefreshButtonState", this);
	},
	configureButton : function() {
		this.bubble("onConfigureButton", this);
	}
});
