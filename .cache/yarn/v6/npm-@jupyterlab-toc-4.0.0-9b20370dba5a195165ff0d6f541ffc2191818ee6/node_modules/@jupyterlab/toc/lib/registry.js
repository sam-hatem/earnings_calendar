"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const coreutils_1 = require("@lumino/coreutils");
/* tslint:disable */
/**
 * Table of contents registry token.
 */
exports.ITableOfContentsRegistry = new coreutils_1.Token('@jupyterlab/toc:ITableOfContentsRegistry');
/* tslint:enable */
/**
 * Class for registering widgets for which we can generate a table of contents.
 */
class TableOfContentsRegistry {
    constructor() {
        this._generators = [];
    }
    /**
     * Finds a table of contents generator for a widget.
     *
     * ## Notes
     *
     * -   If unable to find a table of contents generator, the method return `undefined`.
     *
     * @param widget - widget
     * @returns table of contents generator
     */
    find(widget) {
        for (let i = 0; i < this._generators.length; i++) {
            const gen = this._generators[i];
            if (gen.tracker.has(widget)) {
                if (gen.isEnabled && !gen.isEnabled(widget)) {
                    continue;
                }
                return gen;
            }
        }
    }
    /**
     * Adds a table of contents generator to the registry.
     *
     * @param generator - table of contents generator
     */
    add(generator) {
        this._generators.push(generator);
    }
}
exports.TableOfContentsRegistry = TableOfContentsRegistry;
/**
 * Static registry methods.
 */
(function (TableOfContentsRegistry) {
    /**
     * Abstract class for managing options affecting how a table of contents is generated for a particular widget type.
     */
    class IOptionsManager {
    }
    TableOfContentsRegistry.IOptionsManager = IOptionsManager;
})(TableOfContentsRegistry = exports.TableOfContentsRegistry || (exports.TableOfContentsRegistry = {}));
