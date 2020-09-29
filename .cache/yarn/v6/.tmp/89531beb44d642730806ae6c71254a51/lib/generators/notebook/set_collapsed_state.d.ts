import { Cell } from '@jupyterlab/cells';
import { INotebookTracker } from '@jupyterlab/notebook';
/**
 * Collapses or expands ("un-collapses") a notebook cell by either hiding or displaying its section-defined sub-cells (i.e., cells which have lower precedence).
 *
 * @private
 * @param tracker - notebook tracker
 * @param cell - notebook cell
 * @param state - collapsed state (`true` if collapse; `false` if expand)
 */
declare function setCollapsedState(tracker: INotebookTracker, cell: Cell, state: boolean): void;
/**
 * Exports.
 */
export { setCollapsedState };
