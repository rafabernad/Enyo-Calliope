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

You can use `getValue()` to get Calliope's document html content, and `setValue()` to overwrite it.

Calliope comes with a predefined basic toolbar, that includes commands for font formatting (bold, italic, underline,strikethrough, fontsize), paraghraph alignment and format removing.

You can overwrite the default toolbar with a customized one easily. You just take into account the following

Toolbar Components
------------------

The currently available Toolbar components are:

* `calliope.ToolbarRow`: Aligns vertically ToolbarGroup or ToolbarButton elements.
* `calliope.ToolbarGroup`: Groups horizontally ToolbarButton components. This is the `defaultKind` component for `Toolbar`, if not specified otherwise.
* `calliope.ToolbarIcon`: Default bi-state or single-state button. This is the `defaultKind` component for `ToolbarGroup`. More info below.

But there are more coming:

* `calliope.ToolbarButton`: A captioned button
* `calliope.Input`: An editable Input for Calliope's Toolbar
* `calliope.Label`: A label control to show information

With these current three basic elements, you can make your own toolbars easily:

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
                  
This code creates a Calliope editor with a toolbar with two `ToolbarRow`; the first one shows a `ToolbarGroup` with two custom `ToolbarIcon` inside for "copy" and "paste" actions, and the second one another `ToolbarGroup`with the predefined "bold" `ToolbarIcon`.

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

This code creates a toolbar with one single ToolbarRow, with two `ToolbarGroup` inside it with the same `ToolbarIcon` items setup as the previous example.

Calliope resorts the toolbar structure to match the size, so you don't have to deal with rows if you don't want to.

Predefined and Custom ToolbarIcons
==================================

At this, moment, Calliope comes with a very little predefined set of `ToolbarIcon`:

* `bold`, `italic`, `underline`, `strikeThrough` : Sets formatting for typing, or applies it to selection
* `justifyLeft`, `justifyCenter`, `justifyRight`, `justifyFull`: Applies paragraph justification.
* `removeFormat`: removes formatting for current selection.

These predefined `ToolbarIcon` items include their own graphical assets.

The plan is to improve the predefined buttons set, but meanwhile, you can enable any of the DOM `execCommand` command.

To do so, just declare your custom `ToolbarIcon` with the following properties:

* `src`: the url to the icon graphical asset
* `command`: the DOM command to execute.
* Optional `stateful`: set it to true if the button must show the command state (and the command allows it).

Optionaly, you can use the standard `ToolbarIcon` kind to perform whatever operation you desire it to do, just doesn't specify a `command`, and listent to the `onclick` event:

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

Of course, this is the default behaviour... you can create your derived kinds overwriting the default `ToolbarIcon` `click` handling, to show a dialog or whatever, and of course, share it ;)