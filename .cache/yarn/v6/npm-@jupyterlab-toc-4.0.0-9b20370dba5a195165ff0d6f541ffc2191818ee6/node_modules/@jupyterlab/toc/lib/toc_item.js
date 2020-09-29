"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/**
 * React component for a table of contents entry.
 *
 * @private
 */
class TOCItem extends React.Component {
    /**
     * Renders a table of contents entry.
     *
     * @returns rendered entry
     */
    render() {
        const { heading } = this.props;
        // Create an onClick handler for the TOC item
        // that scrolls the anchor into view.
        const onClick = (event) => {
            event.preventDefault();
            event.stopPropagation();
            heading.onClick();
        };
        let content = this.props.itemRenderer(heading);
        return content && React.createElement("li", { onClick: onClick }, content);
    }
}
exports.TOCItem = TOCItem;
