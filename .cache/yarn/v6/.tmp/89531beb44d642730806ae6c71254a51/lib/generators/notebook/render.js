"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const sanitizer_options_1 = require("../../utils/sanitizer_options");
const codemirror_1 = require("./codemirror");
const set_collapsed_state_1 = require("./set_collapsed_state");
const twist_button_1 = require("./twist_button");
/**
 * Renders a notebook table of contents item.
 *
 * @private
 * @param options - generator options
 * @param tracker - notebook tracker
 * @param item - notebook heading
 * @returns rendered item
 */
function render(options, tracker, item) {
    let jsx;
    if (item.type === 'markdown' || item.type === 'header') {
        let fontSizeClass = 'toc-level-size-default';
        let numbering = item.numbering && options.numbering ? item.numbering : '';
        if (item.type === 'header') {
            fontSizeClass = 'toc-level-size-' + item.level;
        }
        if (item.html && (item.type === 'header' || options.showMarkdown)) {
            jsx = (React.createElement("span", { dangerouslySetInnerHTML: {
                    __html: numbering +
                        options.sanitizer.sanitize(item.html, sanitizer_options_1.sanitizerOptions)
                }, className: item.type + '-cell toc-cell-item ' + fontSizeClass }));
            // Render the headers:
            if (item.type === 'header') {
                let collapsed = item.cellRef.model.metadata.get('toc-hr-collapsed');
                // Update the collapsed state of the corresponding notebook cell:
                set_collapsed_state_1.setCollapsedState(tracker, item.cellRef, collapsed);
                // Only render the twist button if configured to enable collapsing behavior:
                if (options.collapsibleNotebooks) {
                    let button = twist_button_1.twistButton(item.cellRef, collapsed || false, onClick);
                    // Render the heading item:
                    jsx = (React.createElement("div", { className: "toc-entry-holder" },
                        button,
                        jsx));
                }
                else {
                    // Render the heading item without the dropdown button:
                    jsx = React.createElement("div", { className: "toc-entry-holder" }, jsx);
                }
            }
            return jsx;
        }
        if (item.type === 'header' || options.showMarkdown) {
            // Render headers/markdown for plain text:
            jsx = (React.createElement("span", { className: item.type + '-cell toc-cell-item ' + fontSizeClass }, numbering + item.text));
            if (item.type === 'header') {
                let collapsed = item.cellRef.model.metadata.get('toc-hr-collapsed');
                if (options.collapsibleNotebooks) {
                    let button = twist_button_1.twistButton(item.cellRef, collapsed || false, onClick);
                    set_collapsed_state_1.setCollapsedState(tracker, item.cellRef, collapsed);
                    jsx = (React.createElement("div", { className: "toc-entry-holder" },
                        button,
                        jsx));
                }
                else {
                    // Render the heading item without the dropdown button:
                    jsx = React.createElement("div", { className: "toc-entry-holder" }, jsx);
                }
            }
            return jsx;
        }
        return null;
    }
    if (item.type === 'code' && options.showCode) {
        // Render code cells:
        return (React.createElement("div", { className: "toc-code-cell-div" },
            React.createElement("div", { className: "toc-code-cell-prompt" }, item.prompt),
            React.createElement("span", { className: 'toc-code-span' },
                React.createElement(codemirror_1.CodeComponent, { sanitizer: options.sanitizer, heading: item }))));
    }
    return null;
    /**
     * Callback invoked upon encountering a "click" event.
     *
     * @private
     * @param cellRef - cell reference
     */
    function onClick(cellRef) {
        let collapsed;
        if (cellRef.model.metadata.has('toc-hr-collapsed')) {
            collapsed = cellRef.model.metadata.get('toc-hr-collapsed');
            cellRef.model.metadata.delete('toc-hr-collapsed');
        }
        else {
            collapsed = false;
            cellRef.model.metadata.set('toc-hr-collapsed', true);
        }
        if (cellRef) {
            // NOTE: we can imagine a future in which this extension combines with a collapsible-header/ings extension such that we can programmatically close notebook "sections" according to a public API specifically intended for collapsing notebook sections. In the meantime, we need to resort to manually "collapsing" sections...
            set_collapsed_state_1.setCollapsedState(tracker, cellRef, !collapsed);
        }
        options.updateWidget();
    }
}
exports.render = render;
