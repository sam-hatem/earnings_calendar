"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const sanitizer_options_1 = require("../../utils/sanitizer_options");
/**
 * Class for rendering a code component.
 *
 * @private
 */
class CodeComponent extends React.Component {
    /**
     * Returns a code component.
     *
     * @param props - component properties
     * @returns code component
     */
    constructor(props) {
        super(props);
        this.state = { heading: props.heading };
    }
    /**
     * Updates code component state.
     *
     * @param props - component properties
     */
    componentWillReceiveProps(nextProps) {
        this.setState({ heading: nextProps.heading });
    }
    /**
     * Renders a code component.
     *
     * @returns rendered component
     */
    render() {
        // Get the current rendered CodeMirror:
        let html = this.state.heading.cellRef.editor.host.innerHTML;
        // Sanitize the HTML:
        html = this.props.sanitizer.sanitize(html, sanitizer_options_1.sanitizerOptions);
        return (React.createElement("div", { className: "cm-toc", dangerouslySetInnerHTML: { __html: html } }));
    }
}
exports.CodeComponent = CodeComponent;
