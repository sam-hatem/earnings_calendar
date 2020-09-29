"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const tag_1 = require("./tag");
/**
 * Class for a React component that renders all tags in a list.
 *
 * @private
 */
class TagListComponent extends React.Component {
    /**
     * Returns a React component.
     *
     * @param props - properties
     * @returns component
     */
    constructor(props) {
        super(props);
        /**
         * Toggles whether a tag is selected when clicked.
         *
         * @param name - tag name
         */
        this.selectedTagWithName = (name) => {
            if (this.props.selectedTags.indexOf(name) >= 0) {
                this.props.selectionStateHandler(name, false);
            }
            else {
                this.props.selectionStateHandler(name, true);
            }
        };
        /**
         * Renders a tag component for each tag within a list of tags.
         *
         * @param tags - list of tags
         */
        this.renderTagComponents = (tags) => {
            const selectedTags = this.props.selectedTags;
            const self = this;
            return tags.map((tag, index) => {
                const tagClass = selectedTags.indexOf(tag) >= 0
                    ? 'toc-selected-tag toc-tag'
                    : 'toc-unselected-tag toc-tag';
                return (React.createElement("div", { key: tag, className: tagClass, onClick: event => {
                        self.selectedTagWithName(tag);
                    }, tabIndex: -1 },
                    React.createElement(tag_1.TagComponent, { selectionStateHandler: this.props.selectionStateHandler, selectedTags: this.props.selectedTags, tag: tag })));
            });
        };
        this.state = { selected: this.props.selectedTags };
    }
    /**
     * Renders the list of tags in the ToC tags dropdown.
     *
     * @returns rendered list
     */
    render() {
        let tags = this.props.tags;
        let jsx = null;
        if (tags) {
            jsx = this.renderTagComponents(tags);
        }
        return React.createElement("div", { className: "toc-tag-holder" }, jsx);
    }
}
exports.TagListComponent = TagListComponent;
