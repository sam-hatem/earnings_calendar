"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const tag_list_1 = require("./tag_list");
/**
 * Tag dropdown React component.
 *
 * @private
 */
class TagsToolComponent extends React.Component {
    /**
     * Returns a component.
     *
     * @param props - component properties
     * @returns component
     */
    constructor(props) {
        super(props);
        /**
         * Changes the dropdown selection state.
         *
         * @param newState - new state
         * @param add - boolean indicating whether to add to selection
         */
        this.changeSelectionState = (newState, add) => {
            let tags = this.state.selected;
            if (add) {
                tags.push(newState);
                this.setState({ selected: tags });
                this.filterTags(tags);
            }
            else {
                let selected = [];
                for (let i = 0; i < tags.length; i++) {
                    if (tags[i] !== newState) {
                        selected.push(tags[i]);
                    }
                }
                this.setState({ selected: selected });
                this.filterTags(selected);
            }
        };
        /**
         * De-selects all tags in the dropdown and clear filters in the ToC.
         */
        this.deselectAll = () => {
            this.setState({ selected: [] });
            this.props.options.updateWidget();
        };
        /**
         * Filters the ToC by according to selected tags.
         *
         * @param selected - selected tags
         */
        this.filterTags = (selected) => {
            this.setState({ selected });
            this.props.options.updateWidget();
        };
        /**
         * Updates filters.
         */
        this.updateFilters = () => {
            let tmp = [];
            let idx = 0;
            let update = false;
            for (let i = 0; i < this.state.selected.length; i++) {
                if (this.props.tags.indexOf(this.state.selected[i]) > -1) {
                    tmp[idx] = this.state.selected[i];
                    idx += 1;
                }
                else if (this.props.options.showTags === true) {
                    update = true;
                }
            }
            if (update) {
                this.filterTags(tmp);
                this.setState({ selected: tmp });
            }
        };
        this.state = {
            selected: this.props.inputFilter
        };
    }
    /**
     * Returns a list of selected tags.
     *
     * @returns tag list
     */
    get filtered() {
        return this.state.selected;
    }
    /**
     * Checks whether a cell has a provided tag.
     *
     * @param tag - tag
     * @param cell - cell reference
     * @returns boolean indicating whether a cell has a provided tag
     */
    containsTag(tag, cell) {
        if (cell === null) {
            return false;
        }
        let tagList = cell.model.metadata.get('tags');
        if (tagList) {
            for (let i = 0; i < tagList.length; i++) {
                if (tagList[i] === tag) {
                    return true;
                }
            }
            return false;
        }
    }
    /**
     * Updates filters.
     */
    componentWillUpdate() {
        this.updateFilters();
    }
    /**
     * Renders the interior of the tag dropdown.
     *
     * @returns rendered component
     */
    render() {
        let jsx = React.createElement("div", { className: "toc-no-tags-div" }, "No Tags Available");
        let text;
        if (this.state.selected.length === 0) {
            text = React.createElement("span", { className: 'toc-filter-button-na' }, " Clear Filters ");
        }
        else if (this.state.selected.length === 1) {
            text = (React.createElement("span", { className: 'toc-filter-button', onClick: () => this.deselectAll() },
                ' ',
                "Clear 1 Filter",
                ' '));
        }
        else {
            text = (React.createElement("span", { className: 'toc-filter-button', onClick: () => this.deselectAll() },
                ' ',
                "Clear ",
                this.state.selected.length,
                " Filters",
                ' '));
        }
        if (this.props.tags && this.props.tags.length > 0) {
            jsx = (React.createElement("div", { className: 'toc-tags-container' },
                React.createElement(tag_list_1.TagListComponent, { tags: this.props.tags, selectionStateHandler: this.changeSelectionState, selectedTags: this.state.selected }),
                text));
        }
        return jsx;
    }
}
exports.TagsToolComponent = TagsToolComponent;
