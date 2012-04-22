/*

 Calliope v 0.1
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
	name : 'newness.Calliope',
	kind : enyo.Control,
	classes : "calliope",
	published : {
		selection : null,
		value : '',
		toolbar : null,
		documentCss : "",
		toolbarClass : "",
	},
	handlers : {
		onExecuteCommand : "executeCommand",
		onRefreshButtonState : "refreshButtonState",
		onRefreshButtonValue : "refreshButtonValue",
		onConfigureButton : "configureSupportedCommands"
	},
	defaultToolbar : [{
		showing : false,
		components : [{
			command : "undo"
		}, {
			command : "redo"
		}]
	}, {
		components : [{
			command : "bold"
		}, {
			command : "italic"
		}, {
			command : "strikeThrough"
		}, {
			command : "underline"
		}]
	}, {
		components : [{
			command : "justifyLeft"
		}, {
			command : "justifyCenter"
		}, {
			command : "justifyRight"
		}, {
			command : "justifyFull"
		}]
	}, {
		components : [{
			command : "removeFormat"
		}]
	}],
	components : [{
		tag : 'div',
		classes : "editor-surface",
		components : [{
			name : 'Toolbar',
			tag : 'div',
			classes : "calliope-toolbar",
			defaultKind : "newness.Calliope.ToolbarGroup",
			onmousedown : "toolbarMouseDown"
		}, {
			name : 'Editor',
			tag : 'iframe',
		}]
	}],
	create : function() {
		this.inherited(arguments);
		if(this.container.kind === "onyx.InputDecorator")
			this.container.setTag("div");
		this.documentCssChanged();

	},
	rendered : function() {
		this.inherited(arguments);
		var emptyDocument = '<head><link id="document_stylesheet" type="text/css" rel="stylesheet" href="' + this.documentCss + '" /><head><body></body>'
		this.$.Editor.hasNode().contentWindow.document.open();
		this.$.Editor.hasNode().contentWindow.document.write(emptyDocument);
		this.$.Editor.hasNode().contentWindow.document.close();
		this.$.Editor.hasNode().contentWindow.document.body.contentEditable = true;
		this.editorWindow = this.$.Editor.hasNode().contentWindow;
		this.editor = this.$.Editor.hasNode().contentWindow.document;

		this.editorChangeListener = enyo.bind(this, 'updateToolbarStates');
		this.editorKeyUpListener = enyo.bind(this, 'editorKeyUp');
		this.editorFocusChangeListener = enyo.bind(this, 'updateFocus');
		this.editor.body.onclick = this.editorChangeListener;
		this.editor.body.onkeyup = this.editorKeyUpListener;
		this.editor.body.onfocus = this.editorFocusChangeListener;
		this.editor.body.onblur = this.editorFocusChangeListener;
		this.toolbarClassChanged();
		this.valueChanged();
		this.toolbarChanged();
		this.resizeHandler();
		this.waterfallDown("onConfigureButtons");
	},
	destroy : function() {
		this.editorChangeListener = null;
		this.editorFocusChangeListener = null;
		this.editorKeyUpListener = null;
		this.inherited(arguments);
	},
	getValue : function() {
		return this.editor.body.innerHTML;
	},
	valueChanged : function() {
		this.editor.body.innerHTML = this.value;
	},
	documentCssChanged : function() {
		if(!this.documentCss) {
			this.documentCss = (enyo.path.paths.calliope !== undefined) ? (enyo.path.paths.calliope + "/document.css") : enyo.path.rewrite("document.css");
		}
		if(this.hasNode()) {
			var styleSheetNode = this.$.Editor.hasNode().contentWindow.document.getElementById("document_stylesheet");
			styleSheetNode.setAttribute("href", enyo.path.rewrite(this.documentCss));
		}
	},
	getSelection : function() {
		return this.editorWindow.getSelection();
	},
	toolbarClassChanged : function() {
		if(this.hasNode())
			if(this.tolbarClass)
				this.$.Toolbar.setClassAttribute("calliope-toolbar " + this.toolbarClass);
	},
	toolbarChanged : function() {
		this.$.Toolbar.destroyComponents();
		if(this.toolbar == null) {
			this.$.Toolbar.createComponents(this.defaultToolbar, {
				owner : this
			});
		} else {
			this.$.Toolbar.createComponents(this.toolbar, {
				owner : this
			});
		}
		if(this.$.Toolbar.hasNode())
			this.$.Toolbar.render();
	},
	toolbarMouseDown : function() {
		//this flag prevents the blur event propagation when clicking toolbar components, so InputDecorator doesn't flick
		this._clicking = true;
	},
	editorKeyUp : function(inEvent) {
		this.value = this.editor.body.innerHTML;
		this.updateToolbarStates();
	},
	updateToolbarStates : function(inEvent) {
		this.waterfallDown("onRefreshButtons")
	},
	configureSupportedCommands : function(inToolbar, inButton) {
		if(inButton.command) {
			if(inButton.command === "fullScreen")
				return true;
			try {
				inButton.setShowing(this.editor.queryCommandSupported(inButton.command));
			} catch (e) {
				inButton.setShowing(true);
			}
		}
		return true;
	},
	refreshButtonState : function(inToolbar, inButton) {
		if(inButton.command) {
			inButton.setActive((this.editor.queryCommandState(inButton.command)));
			return true;
		}
	},
	refreshButtonValue : function(inToolbar, inButton) {
		if(inButton.command) {
			inButton.setValue(this.editor.queryCommandValue(inButton.command));
		}
		return true;
	},
	updateFocus : function(inEvent) {
		this.addRemoveClass("calliope-focused", (inEvent.type == 'focus'));
		if(inEvent.type == 'focus') {
			this._clicking = false;
			this.bubble('onfocus');
		} else if(inEvent.type == 'blur') {

			this.selectionHelper();
			if(!this._clicking) {
				this.bubble('onblur');
				return;
			}
			this._clicking = false;
		}
	},
	focus : function() {
		if(this.hasNode()) {
			//Trick to get first time focus done programatically
			if(!this.selection) {
				var range = this.editor.createRange();
				range.setStart(this.editor.body, 0);
				range.setEnd(this.editor.body, 0);
				this.editorWindow.getSelection().addRange(range);
			}
			this.editor.body.focus();
		}
	},
	selectionHelper : function() {
		var selObj = this.editorWindow.getSelection();
		var selRange = selObj.getRangeAt(0);
		selectionStart = selRange.startOffset;
		selectionEnd = selRange.endOffset;
		startNode = selRange.startContainer;
		endNode = selRange.endContainer;
	},
	restoreSelection : function() {
		range = this.editorWindow.createRange();
		range.selectNodeContents(this.editorWindow);
		range.setStart(startNode, selectionStart);
		range.setEnd(endNode, selectionEnd);
		selection = this.editorWindow.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
		this.editor.body.focus();
	},
	executeCommand : function(inSender, inEvent) {
		this.editor.body.focus();
		this.editor.execCommand(inEvent.originator.command, false, ((!inEvent.originator.value) ? null : inEvent.originator.value));
		this.updateToolbarStates();
	},
	resizeHandler : function() {
		this.inherited(arguments);
		if(this.container.kind === "onyx.InputDecorator") {
			this.$.Editor.applyStyle('height', this.hasNode().clientHeight + 'px');
			this.$.Editor.applyStyle('width', this.hasNode().clientWidth + 'px');
			this.editor.body.style.paddingTop = this.$.Toolbar.hasNode().clientHeight + 'px';
		} else {
			this.$.Editor.applyStyle('height', (this.hasNode().clientHeight - this.$.Toolbar.hasNode().clientHeight) + 'px');
			this.$.Editor.applyStyle('width', this.hasNode().clientWidth + 'px');
		}
	}
});
