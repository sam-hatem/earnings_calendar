"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const registry_1 = require("../../registry");
/**
 * Class for managing notebook ToC generator options.
 *
 * @private
 */
class OptionsManager extends registry_1.TableOfContentsRegistry.IOptionsManager {
    /**
     * Returns an options manager.
     *
     * @param widget - table of contents widget
     * @param notebook - notebook tracker
     * @param options - generator options
     * @returns options manager
     */
    constructor(widget, notebook, options) {
        super();
        this._preRenderedToolbar = null;
        this._filtered = [];
        this._showCode = false;
        this._showMarkdown = false;
        this._showTags = false;
        this._collapsible = false;
        this._tagTool = null;
        this._numbering = options.numbering;
        this._widget = widget;
        this._notebook = notebook;
        this._collapsible = options.collapsibleNotebooks;
        this.sanitizer = options.sanitizer;
        this.storeTags = [];
    }
    /**
     * Gets/sets the tag tool component.
     */
    set tagTool(tagTool) {
        this._tagTool = tagTool;
    }
    get tagTool() {
        return this._tagTool;
    }
    /**
     * Sets notebook meta data.
     */
    set notebookMetadata(value) {
        if (this._notebook.currentWidget != null) {
            this._notebook.currentWidget.model.metadata.set(value[0], value[1]);
        }
    }
    /**
     * Gets/sets ToC generator numbering.
     */
    set numbering(value) {
        this._numbering = value;
        this._widget.update();
        this.notebookMetadata = ['toc-autonumbering', this._numbering];
    }
    get numbering() {
        return this._numbering;
    }
    /**
     * Gets the ToC setting specifying whether to allow collapsing notebook cells.
     */
    get collapsibleNotebooks() {
        return this._collapsible;
    }
    /**
     * Toggles whether to show code previews in the table of contents.
     */
    set showCode(value) {
        this._showCode = value;
        this.notebookMetadata = ['toc-showcode', this._showCode];
        this._widget.update();
    }
    get showCode() {
        return this._showCode;
    }
    /**
     * Toggles whether to show Markdown previews in the table of contents.
     */
    set showMarkdown(value) {
        this._showMarkdown = value;
        this.notebookMetadata = ['toc-showmarkdowntxt', this._showMarkdown];
        this._widget.update();
    }
    get showMarkdown() {
        return this._showMarkdown;
    }
    /**
     * Toggles whether to show tags in the table of contents.
     */
    set showTags(value) {
        this._showTags = value;
        this.notebookMetadata = ['toc-showtags', this._showTags];
        this._widget.update();
    }
    get showTags() {
        return this._showTags;
    }
    /**
     * Returns a list of selected tags.
     */
    get filtered() {
        if (this.tagTool) {
            this._filtered = this.tagTool.filtered;
        }
        else if (this.storeTags.length > 0) {
            this._filtered = this.storeTags;
        }
        else {
            this._filtered = [];
        }
        return this._filtered;
    }
    /**
     * Gets/sets a pre-rendered a toolbar.
     */
    set preRenderedToolbar(value) {
        this._preRenderedToolbar = value;
    }
    get preRenderedToolbar() {
        return this._preRenderedToolbar;
    }
    /**
     * Updates a table of contents widget.
     */
    updateWidget() {
        this._widget.update();
    }
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
    initializeOptions(numbering, showCode, showMarkdown, showTags) {
        this._numbering = numbering;
        this._showCode = showCode;
        this._showMarkdown = showMarkdown;
        this._showTags = showTags;
        this._widget.update();
    }
}
exports.OptionsManager = OptionsManager;
