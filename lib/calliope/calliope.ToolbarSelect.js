/*

   Calliope Toolbar Layouts v0.2
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
	name : "newness.Calliope.ToolbarSelect",
	published : {
		stateful : true,
		command : null,
		options : null,
		value : null
	},
	handlers : {
		onRefreshButtons : "refreshButton",
		onConfigureButtons : "configureButton",
		onclick : "click"
	},
	classes : "calliope-toolbar-select",
	components : [{
		classes : "calliope-toolbar-select-inner",
		components : [{
			classes : "calliope-toolbar-select-inner-arrow"
		}, {
			name : "innerText",
			classes : "calliope-toolbar-select-inner-text"
		}]
	}, {
		kind : "Select",
		onchange : "change"
	}],
	_oldValue: null,
	create : function() {
		this.inherited(arguments);
		this.optionsChanged();
	},
	rendered : function() {
		this.inherited(arguments);
		
		this.valueChanged();
	},
	optionsChanged : function() {
		if(this.options) {
			this.$.select.destroyComponents();
			this.$.select.createComponents(this.options, {
				owner : this
			});
			if(this.$.select.hasNode())
				this.$.select.render();
		}
	},
	valueChanged : function() {
		for(var i=0; i<this.options.length; i++ ){
			if(this.options[i].value == this.value) {
				this.$.select.setSelected(i);
				this.$.innerText.setContent(this.options[i].content);
				break;
			}
		}
		if(this.value !== this._oldValue || this._oldValue == null) {
			this._oldValue = this.value;
			//this.bubble("onExecuteCommand");	
		}
	},
	change : function(inSender, inEvent) {
		this.value = this.options[inEvent.target.selectedIndex].value;
		this.$.innerText.setContent(inSender.children[inEvent.target.selectedIndex].content)
		this.bubble("onExecuteCommand");
		return true;
	},
	refreshButton : function() {
		this.bubble("onRefreshButtonValue", this);
	},
	configureButton : function() {
		this.bubble("onConfigureButton", this);
	}
});
