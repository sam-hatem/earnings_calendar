"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const registry_1 = require("../../registry");
/**
 * Class for managing Markdown ToC generator options.
 *
 * @private
 */
class OptionsManager extends registry_1.TableOfContentsRegistry.IOptionsManager {
    /**
     * Returns an options manager.
     *
     * @param widget - table of contents widget
     * @param options - generator options
     * @returns options manager
     */
    constructor(widget, options) {
        super();
        this._numbering = options.numbering;
        this._widget = widget;
        this.sanitizer = options.sanitizer;
    }
    /**
     * Gets/sets ToC generator numbering.
     */
    set numbering(value) {
        this._numbering = value;
        this._widget.update();
    }
    get numbering() {
        return this._numbering;
    }
    /**
     * Initializes options.
     *
     * ## Notes
     *
     * -  This will **not** change notebook meta-data.
     *
     * @param numbering - boolean indicating whether to number items
     */
    initializeOptions(numbering) {
        this._numbering = numbering;
        this._widget.update();
    }
}
exports.OptionsManager = OptionsManager;
