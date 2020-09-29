"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const toc_item_1 = require("./toc_item");
/**
 * React component for a table of contents tree.
 *
 * @private
 */
class TOCTree extends React.Component {
    /**
     * Renders a table of contents tree.
     */
    render() {
        const Toolbar = this.props.toolbar;
        // Map the heading objects onto a list of JSX elements...
        let i = 0;
        let list = this.props.toc.map(el => {
            return (React.createElement(toc_item_1.TOCItem, { heading: el, itemRenderer: this.props.itemRenderer, key: `${el.text}-${el.level}-${i++}` }));
        });
        return (React.createElement("div", { className: "jp-TableOfContents" },
            React.createElement("header", null, this.props.title),
            Toolbar && React.createElement(Toolbar, null),
            React.createElement("ul", { className: "jp-TableOfContents-content" }, list)));
    }
}
exports.TOCTree = TOCTree;
