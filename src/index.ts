import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';
import { IFileBrowserFactory } from '@jupyterlab/filebrowser';
import { ICommandPalette, MainAreaWidget, showDialog, Dialog } from '@jupyterlab/apputils';
import { ILauncher } from '@jupyterlab/launcher';
import { runIcon, reactIcon } from '@jupyterlab/ui-components';
import { DogViewerWidget } from './widget';

const commandId = "example-menu";
const open_widget_command = "syapse-widget";
const extension: JupyterFrontEndPlugin<void> = {
  id: commandId,
  autoStart: true,
  requires: [IFileBrowserFactory, ICommandPalette, ILauncher],
  activate: (app: JupyterFrontEnd, factory: IFileBrowserFactory, palette: ICommandPalette, launcher: ILauncher) => {

    app.commands.addCommand(commandId, {
      label: 'Get Dogs!',
      caption: "Example context menu button for file browser's items.",
      icon: runIcon,
      execute: () => {
        // Gets the file object if we have selected a file
        const file = factory?.tracker?.currentWidget?.selectedItems().next();

        showDialog({
          title: file?.name,
          body: new DogViewerWidget(),
          buttons: [Dialog.okButton()],
        }).catch((e) => console.log(e));
      },
    });

    app.commands.addCommand(open_widget_command, {
      label: "Get Page For Dogs!",
      caption: "Get dogs, but in a new widget!",
      icon: reactIcon,
      execute: () => {
        const content = new DogViewerWidget();
        const widget = new MainAreaWidget<DogViewerWidget>({content});

        widget.title.label = "Syapse Dog Viewer";
        widget.title.icon = reactIcon;
        widget.toggleClass("syapse-dog-viewer", true);
        app.shell.add(widget, 'main');
      }
    });

    // Add command to command pallete
    const commandName = "example";
    palette.addItem({command: commandId, category: commandName, args: { origin: 'from palette' }});

    if (launcher) {
      launcher.add({command: open_widget_command})
    }
  },
};

export default extension;