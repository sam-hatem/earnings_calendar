"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const generate_numbering_1 = require("../../utils/generate_numbering");
const parse_heading_1 = require("../../utils/parse_heading");
/**
 * Parses a provided string and returns a list of headings.
 *
 * @private
 * @param text - input text
 * @param onClick - callback which returns a "click" handler
 * @param dict - numbering dictionary
 * @returns list of headings
 */
function getHeadings(text, onClick, dict) {
    // Split the text into lines:
    const lines = text.split('\n');
    // Iterate over the lines to get the header level and text for each line:
    let headings = [];
    let FLG;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        // Don't check for Markdown headings if in a code block:
        if (line.indexOf('```') === 0) {
            FLG = !FLG;
        }
        if (FLG) {
            continue;
        }
        line += lines[i + 1] ? '\n' + lines[i + 1] : '';
        const heading = parse_heading_1.parseHeading(line); // append the next line to capture alternative style Markdown headings
        if (heading) {
            headings.push({
                text: heading.text,
                numbering: generate_numbering_1.generateNumbering(dict, heading.level),
                level: heading.level,
                onClick: onClick(i)
            });
        }
    }
    return headings;
}
exports.getHeadings = getHeadings;
