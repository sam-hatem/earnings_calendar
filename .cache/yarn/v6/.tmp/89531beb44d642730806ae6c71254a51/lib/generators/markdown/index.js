"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const is_markdown_1 = require("../../utils/is_markdown");
const options_manager_1 = require("./options_manager");
const render_1 = require("./render");
const toolbar_generator_1 = require("./toolbar_generator");
const get_headings_1 = require("./get_headings");
const get_rendered_headings_1 = require("./get_rendered_headings");
/**
 * Returns a boolean indicating whether this ToC generator is enabled.
 *
 * @private
 * @param editor - editor widget
 * @returns boolean indicating whether this ToC generator is enabled
 */
function isEnabled(editor) {
    // Only enable this if the editor MIME type matches one of a few Markdown variants:
    return is_markdown_1.isMarkdown(editor.content.model.mimeType);
}
/**
 * Generates a table of contents.
 *
 * @private
 * @param editor - editor widget
 * @returns a list of headings
 */
function generate(editor) {
    let dict = {};
    return get_headings_1.getHeadings(editor.content.model.value.text, onClick, dict);
    /**
     * Returns a "click" handler.
     *
     * @private
     * @param line - line number
     * @returns click handler
     */
    function onClick(line) {
        return () => {
            editor.content.editor.setCursorPosition({
                line: line,
                column: 0
            });
        };
    }
}
/**
 * Returns a ToC generator for Markdown files.
 *
 * @private
 * @param tracker - file editor tracker
 * @param widget - table of contents widget
 * @param sanitizer - HTML sanitizer
 * @returns ToC generator capable of parsing Markdown files
 */
function createMarkdownGenerator(tracker, widget, sanitizer) {
    const options = new options_manager_1.OptionsManager(widget, {
        numbering: true,
        sanitizer
    });
    return {
        tracker,
        usesLatex: true,
        options: options,
        toolbarGenerator: generateToolbar,
        itemRenderer: renderItem,
        isEnabled: isEnabled,
        generate: generate
    };
    /**
     * Returns a toolbar generator.
     *
     * @private
     * @returns toolbar generator
     */
    function generateToolbar() {
        return toolbar_generator_1.toolbar(options);
    }
    /**
     * Renders a table of contents item.
     *
     * @private
     * @param item - heading to render
     * @returns rendered item
     */
    function renderItem(item) {
        return render_1.render(options, item);
    }
}
exports.createMarkdownGenerator = createMarkdownGenerator;
/**
 * Returns a ToC generator for rendered Markdown files.
 *
 * @param tracker - Markdown viewer tracker
 * @param sanitizer - HTML sanitizer
 * @param widget - table of contents widget
 * @returns ToC generator capable of parsing rendered Markdown files
 */
function createRenderedMarkdownGenerator(tracker, widget, sanitizer) {
    const options = new options_manager_1.OptionsManager(widget, {
        numbering: true,
        sanitizer
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
        return toolbar_generator_1.toolbar(options);
    }
    /**
     * Renders a table of contents item.
     *
     * @private
     * @param item - heading to render
     * @returns rendered item
     */
    function renderItem(item) {
        return render_1.render(options, item);
    }
    /**
     * Generates a table of contents.
     *
     * @private
     * @param widget - Markdown document widget
     * @returns a list of headings
     */
    function generate(widget) {
        let dict = {};
        return get_rendered_headings_1.getRenderedHeadings(widget.content.node, sanitizer, dict, options.numbering);
    }
}
exports.createRenderedMarkdownGenerator = createRenderedMarkdownGenerator;
