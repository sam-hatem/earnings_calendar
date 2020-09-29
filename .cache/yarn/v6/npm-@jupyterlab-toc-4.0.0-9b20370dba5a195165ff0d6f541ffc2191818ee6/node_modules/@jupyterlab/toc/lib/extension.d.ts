import { JupyterFrontEndPlugin } from '@jupyterlab/application';
import { ITableOfContentsRegistry } from './registry';
import '../style/index.css';
/**
 * Initialization data for the ToC extension.
 *
 * @private
 */
declare const extension: JupyterFrontEndPlugin<ITableOfContentsRegistry>;
/**
 * Exports.
 */
export default extension;
