"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/**
 * Abstract class defining a React component containing one tag label.
 *
 * @private
 */
class TagComponent extends React.Component {
    /**
     * Returns a React component.
     *
     * @param props - properties
     * @returns component
     */
    constructor(props) {
        super(props);
    }
    /**
     * Renders a component.
     *
     * @returns rendered component
     */
    render() {
        const tag = this.props.tag;
        return (React.createElement("div", null,
            React.createElement("label", { className: "toc-tag-label", key: new Date().toLocaleTimeString() }, tag)));
    }
}
exports.TagComponent = TagComponent;
