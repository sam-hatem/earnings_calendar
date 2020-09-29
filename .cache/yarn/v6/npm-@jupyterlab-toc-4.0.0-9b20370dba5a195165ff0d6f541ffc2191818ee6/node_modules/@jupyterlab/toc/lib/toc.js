"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const coreutils_1 = require("@jupyterlab/coreutils");
const widgets_1 = require("@lumino/widgets");
const toc_tree_1 = require("./toc_tree");
/**
 * Timeout for throttling ToC rendering.
 *
 * @private
 */
const RENDER_TIMEOUT = 1000;
/**
 * Widget for hosting a notebook table of contents.
 */
class TableOfContents extends widgets_1.Widget {
    /**
     * Returns a new table of contents.
     *
     * @param options - options
     * @returns widget
     */
    constructor(options) {
        super();
        this._docmanager = options.docmanager;
        this._rendermime = options.rendermime;
    }
    /**
     * Current widget-generator tuple for the ToC.
     */
    get current() {
        return this._current;
    }
    set current(value) {
        // If they are the same as previously, do nothing...
        if (value &&
            this._current &&
            this._current.widget === value.widget &&
            this._current.generator === value.generator) {
            return;
        }
        this._current = value;
        if (this.generator && this.generator.toolbarGenerator) {
            this._toolbar = this.generator.toolbarGenerator();
        }
        // Dispose an old activity monitor if one existed...
        if (this._monitor) {
            this._monitor.dispose();
            this._monitor = null;
        }
        // If we are wiping the ToC, update and return...
        if (!this._current) {
            this.update();
            return;
        }
        // Find the document model associated with the widget:
        const context = this._docmanager.contextForWidget(this._current.widget);
        if (!context || !context.model) {
            throw Error('Could not find a context for the Table of Contents');
        }
        // Throttle the rendering rate of the table of contents:
        this._monitor = new coreutils_1.ActivityMonitor({
            signal: context.model.contentChanged,
            timeout: RENDER_TIMEOUT
        });
        this._monitor.activityStopped.connect(this.update, this);
        this.update();
    }
    /**
     * Current table of contents generator.
     *
     * @returns table of contents generator
     */
    get generator() {
        if (this._current) {
            return this._current.generator;
        }
        return null;
    }
    /**
     * Callback invoked upon an update request.
     *
     * @param msg - message
     */
    onUpdateRequest(msg) {
        let toc = [];
        let title = 'Table of Contents';
        if (this._current) {
            toc = this._current.generator.generate(this._current.widget);
            const context = this._docmanager.contextForWidget(this._current.widget);
            if (context) {
                title = coreutils_1.PathExt.basename(context.localPath);
            }
        }
        let itemRenderer = (item) => {
            return React.createElement("span", null, item.text);
        };
        if (this._current && this._current.generator.itemRenderer) {
            itemRenderer = this._current.generator.itemRenderer;
        }
        let jsx = (React.createElement("div", { className: "jp-TableOfContents" },
            React.createElement("header", null, title)));
        if (this._current && this._current.generator) {
            jsx = (React.createElement(toc_tree_1.TOCTree, { title: title, toc: toc, generator: this.generator, itemRenderer: itemRenderer, toolbar: this._toolbar }));
        }
        ReactDOM.render(jsx, this.node, () => {
            if (this._current &&
                this._current.generator.usesLatex === true &&
                this._rendermime.latexTypesetter) {
                this._rendermime.latexTypesetter.typeset(this.node);
            }
        });
    }
    /**
     * Callback invoked to re-render after showing a table of contents.
     *
     * @param msg - message
     */
    onAfterShow(msg) {
        this.update();
    }
}
exports.TableOfContents = TableOfContents;
