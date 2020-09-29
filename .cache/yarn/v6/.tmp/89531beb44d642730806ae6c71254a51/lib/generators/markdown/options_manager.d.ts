import { ISanitizer } from '@jupyterlab/apputils';
import { TableOfContentsRegistry as Registry } from '../../registry';
import { TableOfContents } from '../../toc';
/**
 * Interface describing constructor options.
 *
 * @private
 */
interface Options {
    /**
     * Boolean indicating whether items should be numbered.
     */
    numbering: boolean;
    /**
     * HTML sanitizer.
     */
    sanitizer: ISanitizer;
}
/**
 * Class for managing Markdown ToC generator options.
 *
 * @private
 */
declare class OptionsManager extends Registry.IOptionsManager {
    /**
     * Returns an options manager.
     *
     * @param widget - table of contents widget
     * @param options - generator options
     * @returns options manager
     */
    constructor(widget: TableOfContents, options: Options);
    /**
     * HTML sanitizer.
     */
    readonly sanitizer: ISanitizer;
    /**
     * Gets/sets ToC generator numbering.
     */
    set numbering(value: boolean);
    get numbering(): boolean;
    /**
     * Initializes options.
     *
     * ## Notes
     *
     * -  This will **not** change notebook meta-data.
     *
     * @param numbering - boolean indicating whether to number items
     */
    initializeOptions(numbering: boolean): void;
    private _numbering;
    private _widget;
}
/**
 * Exports.
 */
export { OptionsManager };
