"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/**
 * Renders a twist button.
 *
 * @private
 * @param cellRef - cell reference
 * @param collapsed - boolean indicating whether a ToC item is collapsed
 * @param onClick - "click" handler
 * @returns rendered twist button
 */
function twistButton(cellRef, collapsed, onClick) {
    if (collapsed) {
        return (React.createElement("div", { className: "toc-collapse-button", onClick: wrapper },
            React.createElement("div", { className: "toc-twist-placeholder" }, "placeholder"),
            React.createElement("div", { className: "toc-rightarrow-img toc-arrow-img" })));
    }
    return (React.createElement("div", { className: "toc-collapse-button", onClick: wrapper },
        React.createElement("div", { className: "toc-twist-placeholder" }, "placeholder"),
        React.createElement("div", { className: "toc-downarrow-img toc-arrow-img" })));
    /**
     * Callback invoked upon encountering a "click" event.
     *
     * @private
     * @param event - event object
     */
    function wrapper(event) {
        event.stopPropagation();
        onClick(cellRef);
    }
}
exports.twistButton = twistButton;
