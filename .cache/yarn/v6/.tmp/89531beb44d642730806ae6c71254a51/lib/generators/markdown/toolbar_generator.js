"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/**
 * Returns a component for rendering a Markdown table of contents toolbar.
 *
 * @private
 * @param options - generator options
 * @returns toolbar component
 */
function toolbar(options) {
    return class Toolbar extends React.Component {
        /**
         * Returns a component for rendering a Markdown table of contents toolbar.
         *
         * @param props - toolbar properties
         * @returns toolbar component
         */
        constructor(props) {
            super(props);
            this.state = { numbering: false };
            options.initializeOptions(false);
        }
        /**
         * Renders a toolbar.
         *
         * @returns rendered toolbar
         */
        render() {
            const toggleNumbering = () => {
                options.numbering = !options.numbering;
                this.setState({ numbering: options.numbering });
            };
            let icon;
            if (this.state.numbering) {
                icon = (React.createElement("div", { className: "toc-toolbar-auto-numbering-button toc-toolbar-button", onClick: event => toggleNumbering() },
                    React.createElement("div", { role: "text", "aria-label": "Toggle Auto-Numbering", title: "Toggle Auto-Numbering", className: "toc-toolbar-auto-numbering-icon toc-toolbar-icon-selected" })));
            }
            else {
                icon = (React.createElement("div", { className: "toc-toolbar-auto-numbering-button toc-toolbar-button", onClick: event => toggleNumbering() },
                    React.createElement("div", { role: "text", "aria-label": "Toggle Auto-Numbering", title: "Toggle Auto-Numbering", className: "toc-toolbar-auto-numbering-icon toc-toolbar-icon" })));
            }
            return (React.createElement("div", null,
                React.createElement("div", { className: 'toc-toolbar' }, icon)));
        }
    };
}
exports.toolbar = toolbar;
