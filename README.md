Calliope is an extensible rich text editor based on [EnyoJS](http://www.enyojs.com).

Calliope gets it's name from the muse of epic poetry in [Greek Mithology](http://en.wikipedia.org/wiki/Calliope), daughter of Zeus and Mnemosyne, and is believed to be Homer's muse, the inspiration for the Odyssey and the Iliad.

Example Usage
-------------

Calliope can be used as a standalone Enyo component:

    enyo.kind({
      name: "CalliopeStandaloneExample",
      kind: "calliope"
    });
	
or integrated with the Onyx library:

    enyo.kind({
      name: "CalliopeOnyxExample",
      kind: "onyx.InputDecorator",
      components: [{
          kind: "calliope"
      }]
    });

Calliope comes with a predefined basic toolbar, that includes commands for font formatting (bold, italic, underline,strikethrough, fontsize), paraghraph alignment and format removing.

You can overwrite the default toolbar with a customized one easily. You just take into account the following

Toolbar Components
------------------

* `calliope.ToolbarRow`: Aligns vertically ToolbarGroup or ToolbarButton elements.
* `calliope.ToolbarGroup`: Groups horizontally ToolbarButton components. This is the `defaultKind` component for `Toolbar`, if not specified otherwise.
* `calliope.ToolbarButton`: Default bi-state or single-state button. This is the `defaultKind` component for `ToolbarGroup`. More info below.

With these three basic elements, you can make your own toolbars easily:

    enyo.kind({
      name: "CustomCalliopeToolbarSample",
      kind: "Onyx.InputDecorator,
      tag: "div",
      components: [{
          kind: "calliope",
          components: [{
              kind: "calliope.ToolbarRow",
              components: [{
                  components: [{
                      src: "copy.png",
                      command: "copy",
                      stateful: false
                  }, {
                      src: "paste.png",
                      command: "paste",
                      stateful: "false"
                  }]
              }]
          }, {
              kind: "calliope.ToolbarRow",
              components: [{
                  components: [{
                      command: "bold"
                    }]
                }]
            }]
        }]
    });
                  
This code creates a Calliope editor with a toolbar with two `ToolbarRow`; the first one shows a `ToolbarGroup` with two custom `ToolbarButton` inside for "copy" and "paste" actions, and the second one another `ToolbarGroup`with the predefined "bold" `ToolbarButton`.

But you don't need to deal with rows, if you don't want to:

    enyo.kind({
      name: "CustomCalliopeToolbarSample",
      kind: "Onyx.InputDecorator,
      tag: "div",
      components: [{
          kind: "calliope",
          components: [{
              components: [{
                  src: "copy.png",
                  command: "copy",
                  stateful: false
              }, {
                  src: "paste.png",
                  command: "paste",
                  stateful: "false"
              }]
          }, {
              components: [{
                  command: "bold"
              }]
          }]
      }]
    });

This code creates a toolbar with one single ToolbarRow, with two `ToolbarGroup` inside it with the same `ToolbarButtons` setup as the previous sample.

Calliope resorts the Toolbar structure to match the size, so you don't have to deal with rows until necessary.

Predefined and Custom ToolbarButtons
-----------------------------

At this, moment, Calliope comes with a very little predefined set of `ToolbarButton`:

* `bold`, `italic`, `underline`, `strikeThrough` : Sets formatting for typing, or applies it to selection
* `justifyLeft`, `justifyCenter`, `justifyRight`, `justifyFull`: Applies paragraph justification.
* `removeFormat`: removes formatting for current selection.

These predefined buttons include their own graphical assets.

The plan is to improve the predefined buttons set, but meanwhile, you can enable any of the DOM `execCommand` command.

To do so, just declare your custom ToolbarButton with the following properties:

* `src`: the url to the icon graphical asset
* `command`: the DOM command to execute.
* Optional `stateful`: set it to false if the button can't show the command state.

Optionaly, you can derive the standard `ToolbarButton` kind to perform whatever operation you desire it to do:

	{
		onclick: "customClickEvent",
		onRefreshButtonState : "customStateRefresh",
		stateful : true
	}
	
* `stateful` tells the button to fire the `onRefreshButtonState` event, so you can apply your customizations.
* `onclick` gets fired whem the user clicks the button, so you can do with it whatever you want it to.

`onclick` event handling is as follows: 

	customClicked: function(inSender, inDocument) {
	
		//inDocument is the editable document.
		
	}