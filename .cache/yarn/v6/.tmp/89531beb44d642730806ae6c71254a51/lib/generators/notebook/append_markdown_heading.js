"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const append_heading_1 = require("./append_heading");
const append_collapsible_heading_1 = require("./append_collapsible_heading");
/**
 * Appends a Markdown notebook heading to a list of headings.
 *
 * @private
 * @param headings - list of notebook headings
 * @param heading - rendered heading
 * @param prev - previous heading
 * @param collapseLevel - collapse level
 * @param tags - filter tags
 * @param collapsed - boolean indicating whether a heading is collapsed
 * @param showMarkdown - boolean indicating whether to show Markdown previews
 * @returns result tuple
 */
function appendMarkdownHeading(heading, headings, prev, collapseLevel, tags, collapsed, showMarkdown) {
    if (heading && heading.type === 'markdown' && showMarkdown) {
        // Append a Markdown preview heading:
        [headings, prev] = append_heading_1.appendHeading(headings, heading, prev, collapseLevel, tags);
    }
    else if (heading && heading.type === 'header') {
        [headings, prev, collapseLevel] = append_collapsible_heading_1.appendCollapsibleHeading(headings, heading, prev, collapseLevel, tags, collapsed);
    }
    return [headings, prev, collapseLevel];
}
exports.appendMarkdownHeading = appendMarkdownHeading;
