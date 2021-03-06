import { INotebookTracker } from '@jupyterlab/notebook';
import { INotebookHeading } from '../../utils/headings';
import { OptionsManager } from './options_manager';
/**
 * Renders a notebook table of contents item.
 *
 * @private
 * @param options - generator options
 * @param tracker - notebook tracker
 * @param item - notebook heading
 * @returns rendered item
 */
declare function render(options: OptionsManager, tracker: INotebookTracker, item: INotebookHeading): JSX.Element | null;
/**
 * Exports.
 */
export { render };
