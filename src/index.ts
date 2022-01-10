import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

import { showDialog, Dialog } from '@jupyterlab/apputils';

import { ILauncher } from '@jupyterlab/launcher';

import { reactIcon } from '@jupyterlab/ui-components';

import { IFileBrowserFactory } from '@jupyterlab/filebrowser';

/**
 * Initialization data for the react-widget extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'context_menu',
  autoStart: true,
  optional: [ILauncher, IFileBrowserFactory],
  activate: (app: JupyterFrontEnd, factory: IFileBrowserFactory) => {
    const { commands } = app;

     commands.addCommand("context_menu:open", {
       label: 'Share Notebook',
       caption: 'Share this notebook within your organization',
       icon: reactIcon,
       execute: () => {
         const file = factory.tracker.currentWidget?.selectedItems().next();

         showDialog({
           title: file?.name,
           body: 'Share' + file?.path,
           buttons: [Dialog.okButton()],
         }).catch((e) => console.log(e));
       },
     });

  },
};

export default extension;