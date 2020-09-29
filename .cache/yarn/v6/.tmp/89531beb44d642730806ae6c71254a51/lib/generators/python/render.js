"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/**
 * Renders a Python table of contents item.
 *
 * @private
 * @param item - numbered heading
 * @returns rendered item
 */
function render(item) {
    let fontSizeClass = 'toc-level-size-' + item.level;
    return React.createElement("span", { className: fontSizeClass },
        " ",
        item.text,
        " ");
}
exports.render = render;
