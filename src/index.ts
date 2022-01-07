import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the sy_extension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'sy_extension:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension sy_extension is activated!');
  }
};

export default plugin;
