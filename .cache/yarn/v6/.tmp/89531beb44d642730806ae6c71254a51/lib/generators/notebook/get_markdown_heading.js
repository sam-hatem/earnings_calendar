"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const generate_numbering_1 = require("../../utils/generate_numbering");
const parse_heading_1 = require("../../utils/parse_heading");
/**
 * Parses a Markdown string and returns a notebook heading.
 *
 * @private
 * @param text - Markdown string
 * @param onClick - callback which returns a "click" handler
 * @param dict - numbering dictionary
 * @param lastLevel - last level
 * @param cellRef - cell reference
 * @returns notebook heading
 */
function getMarkdownHeading(text, onClick, dict, lastLevel, cellRef) {
    const clbk = onClick(0);
    const heading = parse_heading_1.parseHeading(text);
    if (heading) {
        return {
            text: heading.text,
            level: heading.level,
            numbering: generate_numbering_1.generateNumbering(dict, heading.level),
            onClick: clbk,
            type: 'header',
            cellRef: cellRef,
            hasChild: false
        };
    }
    return {
        text: text,
        level: lastLevel + 1,
        onClick: clbk,
        type: 'markdown',
        cellRef: cellRef,
        hasChild: false
    };
}
exports.getMarkdownHeading = getMarkdownHeading;
