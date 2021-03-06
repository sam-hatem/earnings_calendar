"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const tagstool_1 = require("./tagstool");
/**
 * Returns a component for rendering a notebook table of contents toolbar.
 *
 * @private
 * @param options - generator options
 * @param tracker - notebook tracker
 * @returns toolbar component
 */
function toolbar(options, tracker) {
    return class Toolbar extends React.Component {
        /**
         * Returns a component for rendering a notebook table of contents toolbar.
         *
         * @param props - toolbar properties
         * @returns toolbar component
         */
        constructor(props) {
            super(props);
            this.tagTool = null;
            this.state = {
                showCode: true,
                showMarkdown: false,
                showTags: false,
                numbering: false
            };
            if (tracker.currentWidget) {
                // Read saved user settings in notebook meta data:
                tracker.currentWidget.context.ready.then(() => {
                    if (tracker.currentWidget) {
                        tracker.currentWidget.content.activeCellChanged.connect(() => {
                            options.updateWidget();
                        });
                        const numbering = tracker.currentWidget.model.metadata.get('toc-autonumbering');
                        const showCode = tracker.currentWidget.model.metadata.get('toc-showcode');
                        const showMarkdown = tracker.currentWidget.model.metadata.get('toc-showmarkdowntxt');
                        const showTags = tracker.currentWidget.model.metadata.get('toc-showtags');
                        options.initializeOptions(numbering || options.numbering, showCode || options.showCode, showMarkdown || options.showMarkdown, showTags || options.showTags);
                        this.setState({
                            showCode: options.showCode,
                            showMarkdown: options.showMarkdown,
                            showTags: options.showTags,
                            numbering: options.numbering
                        });
                        this.tags = [];
                    }
                });
            }
        }
        /**
         * Toggle whether to show code previews.
         */
        toggleCode() {
            options.showCode = !options.showCode;
            this.setState({ showCode: options.showCode });
        }
        /**
         * Toggle whether to show Markdown previews.
         */
        toggleMarkdown() {
            options.showMarkdown = !options.showMarkdown;
            this.setState({ showMarkdown: options.showMarkdown });
        }
        /**
         * Toggle whether to number headings.
         */
        toggleNumbering() {
            options.numbering = !options.numbering;
            this.setState({ numbering: options.numbering });
        }
        /**
         * Toggle tag dropdown.
         */
        toggleTagDropdown() {
            if (options.showTags && this.tagTool) {
                options.storeTags = this.tagTool.state.selected;
            }
            options.showTags = !options.showTags;
            this.setState({ showTags: options.showTags });
        }
        /**
         * Loads all document tags.
         */
        loadTags() {
            const notebook = tracker.currentWidget;
            if (notebook) {
                const cells = notebook.model.cells;
                const tags = new Set();
                this.tags = [];
                for (let i = 0; i < cells.length; i++) {
                    const cell = cells.get(i);
                    const list = cell.metadata.get('tags');
                    if (Array.isArray(list)) {
                        list.forEach((tag) => tag && tags.add(tag));
                    }
                }
                this.tags = Array.from(tags);
            }
        }
        /**
         * Renders a toolbar.
         *
         * @returns rendered toolbar
         */
        render() {
            const codeIcon = this.state.showCode ? (React.createElement("div", { className: "toc-toolbar-code-button toc-toolbar-button", onClick: event => this.toggleCode() },
                React.createElement("div", { role: "text", "aria-label": "Toggle Code Cells", title: "Toggle Code Cells", className: "toc-toolbar-code-icon toc-toolbar-icon-selected" }))) : (React.createElement("div", { className: "toc-toolbar-code-button toc-toolbar-button", onClick: event => this.toggleCode() },
                React.createElement("div", { role: "text", "aria-label": "Toggle Code Cells", title: "Toggle Code Cells", className: "toc-toolbar-code-icon toc-toolbar-icon" })));
            const markdownIcon = this.state.showMarkdown ? (React.createElement("div", { className: "toc-toolbar-markdown-button toc-toolbar-button", onClick: event => this.toggleMarkdown() },
                React.createElement("div", { role: "text", "aria-label": "Toggle Markdown Text Cells", title: "Toggle Markdown Text Cells", className: "toc-toolbar-markdown-icon toc-toolbar-icon-selected" }))) : (React.createElement("div", { className: "toc-toolbar-markdown-button toc-toolbar-button", onClick: event => this.toggleMarkdown() },
                React.createElement("div", { role: "text", "aria-label": "Toggle Markdown Text Cells", title: "Toggle Markdown Text Cells", className: "toc-toolbar-markdown-icon toc-toolbar-icon" })));
            const numberingIcon = this.state.numbering ? (React.createElement("div", { className: "toc-toolbar-auto-numbering-button toc-toolbar-button", onClick: event => this.toggleNumbering() },
                React.createElement("div", { role: "text", "aria-label": "Toggle Auto-Numbering", title: "Toggle Auto-Numbering", className: "toc-toolbar-auto-numbering-icon toc-toolbar-icon-selected" }))) : (React.createElement("div", { className: "toc-toolbar-auto-numbering-button toc-toolbar-button", onClick: event => this.toggleNumbering() },
                React.createElement("div", { role: "text", "aria-label": "Toggle Auto-Numbering", title: "Toggle Auto-Numbering", className: "toc-toolbar-auto-numbering-icon toc-toolbar-icon" })));
            let tagDropdown = React.createElement("div", null);
            let tagIcon = (React.createElement("div", { className: "toc-toolbar-button" },
                React.createElement("div", { role: "text", "aria-label": "Show Tags Menu", title: "Show Tags Menu", className: "toc-toolbar-tag-icon toc-toolbar-icon" })));
            if (this.state.showTags) {
                this.loadTags();
                const tagTool = (React.createElement(tagstool_1.TagsToolComponent, { tags: this.tags, tracker: tracker, options: options, inputFilter: options.storeTags, ref: tagTool => (this.tagTool = tagTool) }));
                options.tagTool = this.tagTool;
                tagDropdown = React.createElement("div", { className: 'toc-tag-dropdown' },
                    " ",
                    tagTool,
                    " ");
                tagIcon = (React.createElement("div", { role: "text", "aria-label": "Hide Tags Menu", title: "Hide Tags Menu", className: "toc-toolbar-tag-icon toc-toolbar-icon-selected" }));
            }
            return (React.createElement("div", null,
                React.createElement("div", { className: 'toc-toolbar' },
                    codeIcon,
                    markdownIcon,
                    numberingIcon,
                    React.createElement("div", { className: 'toc-tag-dropdown-button', onClick: event => this.toggleTagDropdown() }, tagIcon)),
                tagDropdown));
        }
    };
}
exports.toolbar = toolbar;
