import { ISanitizer } from '@jupyterlab/apputils';
import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { TableOfContentsRegistry as Registry } from '../../registry';
import { TableOfContents } from '../../toc';
/**
 * Returns a ToC generator for notebooks.
 *
 * @private
 * @param tracker - notebook tracker
 * @param widget - table of contents widget
 * @param sanitizer - HTML sanitizer
 * @returns ToC generator capable of parsing notebooks
 */
declare function createNotebookGenerator(tracker: INotebookTracker, widget: TableOfContents, sanitizer: ISanitizer, settings?: ISettingRegistry.ISettings): Registry.IGenerator<NotebookPanel>;
/**
 * Exports.
 */
export { createNotebookGenerator };
