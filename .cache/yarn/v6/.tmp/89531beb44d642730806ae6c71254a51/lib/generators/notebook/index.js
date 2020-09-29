"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const is_markdown_1 = require("../../utils/is_markdown");
const is_dom_1 = require("../../utils/is_dom");
const options_manager_1 = require("./options_manager");
const get_code_cell_heading_1 = require("./get_code_cell_heading");
const get_last_heading_level_1 = require("./get_last_heading_level");
const get_markdown_heading_1 = require("./get_markdown_heading");
const get_rendered_html_heading_1 = require("./get_rendered_html_heading");
const append_heading_1 = require("./append_heading");
const append_markdown_heading_1 = require("./append_markdown_heading");
const render_1 = require("./render");
const toolbar_generator_1 = require("./toolbar_generator");
/**
 * Returns a ToC generator for notebooks.
 *
 * @private
 * @param tracker - notebook tracker
 * @param widget - table of contents widget
 * @param sanitizer - HTML sanitizer
 * @returns ToC generator capable of parsing notebooks
 */
function createNotebookGenerator(tracker, widget, sanitizer, settings) {
    let collapsibleNotebooks = true;
    if (settings) {
        collapsibleNotebooks = settings.composite.collapsibleNotebooks;
    }
    const options = new options_manager_1.OptionsManager(widget, tracker, {
        numbering: false,
        collapsibleNotebooks: collapsibleNotebooks,
        sanitizer: sanitizer
    });
    return {
        tracker,
        usesLatex: true,
        options: options,
        toolbarGenerator: generateToolbar,
        itemRenderer: renderItem,
        generate: generate
    };
    /**
     * Returns a toolbar generator.
     *
     * @private
     * @returns toolbar generator
     */
    function generateToolbar() {
        return toolbar_generator_1.toolbar(options, tracker);
    }
    /**
     * Renders a table of contents item.
     *
     * @private
     * @param item - heading to render
     * @returns rendered item
     */
    function renderItem(item) {
        return render_1.render(options, tracker, item);
    }
    /**
     * Generates a table of contents.
     *
     * @private
     * @param panel - notebook widget
     * @returns a list of headings
     */
    function generate(panel) {
        let headings = [];
        let collapseLevel = -1;
        let dict = {};
        // Initialize a variable for keeping track of the previous heading:
        let prev = null;
        // Generate headings by iterating through all notebook cells...
        for (let i = 0; i < panel.content.widgets.length; i++) {
            let cell = panel.content.widgets[i];
            let model = cell.model;
            let collapsed = model.metadata.get('toc-hr-collapsed');
            collapsed = collapsed || false;
            if (model.type === 'code') {
                if (!widget || (widget && options.showCode)) {
                    const onClick = (line) => {
                        return () => {
                            panel.content.activeCellIndex = i;
                            cell.node.scrollIntoView();
                        };
                    };
                    let count = cell.model.executionCount;
                    let executionCount = count !== null ? '[' + count + ']: ' : '[ ]: ';
                    let heading = get_code_cell_heading_1.getCodeCellHeading(model.value.text, onClick, executionCount, get_last_heading_level_1.getLastHeadingLevel(headings), cell);
                    [headings, prev] = append_heading_1.appendHeading(headings, heading, prev, collapseLevel, options.filtered);
                }
                // Iterate over the code cell outputs to check for Markdown or HTML from which we can generate ToC headings...
                for (let j = 0; j < model.outputs.length; j++) {
                    const m = model.outputs.get(j);
                    let dtypes = Object.keys(m.data);
                    dtypes = dtypes.filter(t => is_markdown_1.isMarkdown(t) || is_dom_1.isDOM(t));
                    if (!dtypes.length) {
                        continue;
                    }
                    const onClick = (el) => {
                        return () => {
                            panel.content.activeCellIndex = i;
                            panel.content.mode = 'command';
                            el.scrollIntoView();
                        };
                    };
                    let heading = get_rendered_html_heading_1.getRenderedHTMLHeading(cell.outputArea.widgets[j].node, onClick, sanitizer, dict, get_last_heading_level_1.getLastHeadingLevel(headings), options.numbering, cell);
                    [headings, prev, collapseLevel] = append_markdown_heading_1.appendMarkdownHeading(heading, headings, prev, collapseLevel, options.filtered, collapsed, options.showMarkdown);
                }
                continue;
            }
            if (model.type === 'markdown') {
                let mcell = cell;
                let heading;
                let lastLevel = get_last_heading_level_1.getLastHeadingLevel(headings);
                // If the cell is rendered, generate the ToC items from the HTML...
                if (mcell.rendered && !mcell.inputHidden) {
                    const onClick = (el) => {
                        return () => {
                            if (!mcell.rendered) {
                                panel.content.activeCellIndex = i;
                                el.scrollIntoView();
                            }
                            else {
                                panel.content.mode = 'command';
                                cell.node.scrollIntoView();
                                panel.content.activeCellIndex = i;
                            }
                        };
                    };
                    heading = get_rendered_html_heading_1.getRenderedHTMLHeading(cell.node, onClick, sanitizer, dict, lastLevel, options.numbering, cell);
                    // If not rendered, generate ToC items from the cell text...
                }
                else {
                    const onClick = (line) => {
                        return () => {
                            panel.content.activeCellIndex = i;
                            cell.node.scrollIntoView();
                        };
                    };
                    heading = get_markdown_heading_1.getMarkdownHeading(model.value.text, onClick, dict, lastLevel, cell);
                }
                [headings, prev, collapseLevel] = append_markdown_heading_1.appendMarkdownHeading(heading, headings, prev, collapseLevel, options.filtered, collapsed, options.showMarkdown);
            }
        }
        return headings;
    }
}
exports.createNotebookGenerator = createNotebookGenerator;
