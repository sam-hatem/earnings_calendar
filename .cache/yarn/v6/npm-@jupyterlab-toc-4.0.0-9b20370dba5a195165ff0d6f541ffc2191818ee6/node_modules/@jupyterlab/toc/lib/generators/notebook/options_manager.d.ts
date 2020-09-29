import { ISanitizer } from '@jupyterlab/apputils';
import { INotebookTracker } from '@jupyterlab/notebook';
import { TableOfContentsRegistry as Registry } from '../../registry';
import { TableOfContents } from '../../toc';
import { TagsToolComponent } from './tagstool';
/**
 * Interface describing constructor options.
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
    /**
     * Boolean indicating whether notebook cells are collapsible.
     */
    collapsibleNotebooks: boolean;
    /**
     * Tag tool component.
     */
    tagTool?: TagsToolComponent;
}
/**
 * Class for managing notebook ToC generator options.
 *
 * @private
 */
declare class OptionsManager extends Registry.IOptionsManager {
    /**
     * Returns an options manager.
     *
     * @param widget - table of contents widget
     * @param notebook - notebook tracker
     * @param options - generator options
     * @returns options manager
     */
    constructor(widget: TableOfContents, notebook: INotebookTracker, options: Options);
    /**
     * HTML sanitizer.
     */
    readonly sanitizer: ISanitizer;
    /**
     * Gets/sets the tag tool component.
     */
    set tagTool(tagTool: TagsToolComponent | null);
    get tagTool(): TagsToolComponent | null;
    /**
     * Sets notebook meta data.
     */
    set notebookMetadata(value: [string, any]);
    /**
     * Gets/sets ToC generator numbering.
     */
    set numbering(value: boolean);
    get numbering(): boolean;
    /**
     * Gets the ToC setting specifying whether to allow collapsing notebook cells.
     */
    get collapsibleNotebooks(): boolean;
    /**
     * Toggles whether to show code previews in the table of contents.
     */
    set showCode(value: boolean);
    get showCode(): boolean;
    /**
     * Toggles whether to show Markdown previews in the table of contents.
     */
    set showMarkdown(value: boolean);
    get showMarkdown(): boolean;
    /**
     * Toggles whether to show tags in the table of contents.
     */
    set showTags(value: boolean);
    get showTags(): boolean;
    /**
     * Returns a list of selected tags.
     */
    get filtered(): string[];
    /**
     * Gets/sets a pre-rendered a toolbar.
     */
    set preRenderedToolbar(value: any);
    get preRenderedToolbar(): any;
    /**
     * Updates a table of contents widget.
     */
    updateWidget(): void;
    /**
     * Initializes options.
     *
     * ## Notes
     *
     * -  This will **not** change notebook meta-data.
     *
     * @param numbering - boolean indicating whether to number items
     * @param showCode - boolean indicating whether to show code previews
     * @param showMarkdown - boolean indicating whether to show Markdown previews
     * @param showTags - boolean indicating whether to show tags
     */
    initializeOptions(numbering: boolean, showCode: boolean, showMarkdown: boolean, showTags: boolean): void;
    private _preRenderedToolbar;
    private _filtered;
    private _numbering;
    private _showCode;
    private _showMarkdown;
    private _showTags;
    private _notebook;
    private _collapsible;
    private _widget;
    private _tagTool;
    storeTags: string[];
}
/**
 * Exports.
 */
export { OptionsManager };
