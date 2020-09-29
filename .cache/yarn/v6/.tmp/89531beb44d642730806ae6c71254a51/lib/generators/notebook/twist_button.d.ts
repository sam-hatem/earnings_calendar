import { Cell } from '@jupyterlab/cells';
/**
 * Callback invoked upon encountering a "click" event.
 *
 * @private
 * @param cellRef - cell reference
 */
declare type onClick = (cellRef?: Cell) => void;
/**
 * Renders a twist button.
 *
 * @private
 * @param cellRef - cell reference
 * @param collapsed - boolean indicating whether a ToC item is collapsed
 * @param onClick - "click" handler
 * @returns rendered twist button
 */
declare function twistButton(cellRef: Cell, collapsed: boolean, onClick: onClick): JSX.Element;
/**
 * Exports.
 */
export { twistButton };
