"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const sanitizer_options_1 = require("../../utils/sanitizer_options");
/**
 * Renders a Markdown table of contents item.
 *
 * @private
 * @param options - generator options
 * @param item - numbered heading
 * @returns rendered item
 */
function render(options, item) {
    let fontSizeClass = 'toc-level-size-' + item.level;
    // Render item numbering:
    let numbering = item.numbering && options.numbering ? item.numbering : '';
    // Render the item:
    let jsx;
    if (item.html) {
        let html = options.sanitizer.sanitize(item.html, sanitizer_options_1.sanitizerOptions);
        jsx = (React.createElement("span", { dangerouslySetInnerHTML: { __html: numbering + html }, className: 'toc-markdown-cell ' + fontSizeClass }));
    }
    else {
        jsx = React.createElement("span", { className: fontSizeClass },
            " ",
            numbering + item.text);
    }
    return jsx;
}
exports.render = render;
