import { Cell } from '@jupyterlab/cells';
import { INotebookHeading } from '../../utils/headings';
/**
 * Returns a "click" handler.
 *
 * @private
 * @param line - line number
 * @returns "click" handler
 */
declare type onClickFactory = (line: number) => () => void;
/**
 * Parses a Markdown string and returns a notebook heading.
 *
 * @private
 * @param text - Markdown string
 * @param onClick - callback which returns a "click" handler
 * @param dict - numbering dictionary
 * @param lastLevel - last level
 * @param cellRef - cell reference
 * @returns notebook heading
 */
declare function getMarkdownHeading(text: string, onClick: onClickFactory, dict: any, lastLevel: number, cellRef: Cell): INotebookHeading;
/**
 * Exports.
 */
export { getMarkdownHeading };
