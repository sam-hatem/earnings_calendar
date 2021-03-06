import { Cell } from '@jupyterlab/cells';
import { ISanitizer } from '@jupyterlab/apputils';
import { INumberingDictionary } from '../../utils/numbering_dictionary';
import { INotebookHeading } from '../../utils/headings';
/**
 * Returns a "click" handler.
 *
 * @private
 * @param el - HTML element
 * @returns "click" handler
 */
declare type onClickFactory = (el: Element) => () => void;
/**
 * Returns a notebook heading from an HTML element.
 *
 * @private
 * @param node - HTML element
 * @param onClick - callback which returns a "click" handler
 * @param dict - numbering dictionary
 * @param lastLevel - last level
 * @param numbering - boolean indicating whether to enable numbering
 * @param cellRef - cell reference
 * @returns notebook heading
 */
declare function getRenderedHTMLHeading(node: HTMLElement, onClick: onClickFactory, sanitizer: ISanitizer, dict: INumberingDictionary, lastLevel: number, numbering: boolean | undefined, cellRef: Cell): INotebookHeading | undefined;
/**
 * Exports.
 */
export { getRenderedHTMLHeading };
