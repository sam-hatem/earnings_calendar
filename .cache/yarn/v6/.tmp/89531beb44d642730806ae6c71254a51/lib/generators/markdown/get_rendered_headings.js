"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const generate_numbering_1 = require("../../utils/generate_numbering");
const sanitizer_options_1 = require("../../utils/sanitizer_options");
/**
 * Returns a "click" handler.
 *
 * @private
 * @param heading - heading element
 * @returns "click" handler
 */
function onClick(heading) {
    return () => {
        heading.scrollIntoView();
    };
}
/**
 * Processes an HTML element containing rendered Markdown and returns a list of headings.
 *
 * @private
 * @param node - HTML element
 * @param sanitizer - HTML sanitizer
 * @param dict - numbering dictionary
 * @param numbering - boolean indicating whether to enable numbering
 * @returns list of headings
 */
function getRenderedHeadings(node, sanitizer, dict, numbering = true) {
    let nodes = node.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let headings = [];
    for (let i = 0; i < nodes.length; i++) {
        const heading = nodes[i];
        const level = parseInt(heading.tagName[1], 10);
        let text = heading.textContent ? heading.textContent : '';
        let hide = !numbering;
        // Show/hide numbering DOM element based on user settings:
        if (heading.getElementsByClassName('numbering-entry').length > 0) {
            heading.removeChild(heading.getElementsByClassName('numbering-entry')[0]);
        }
        let html = sanitizer.sanitize(heading.innerHTML, sanitizer_options_1.sanitizerOptions);
        html = html.replace('¶', ''); // remove the anchor symbol
        // Generate a numbering string:
        let nstr = generate_numbering_1.generateNumbering(dict, level);
        // Generate the numbering DOM element:
        let nhtml = '';
        if (!hide) {
            nhtml = '<span class="numbering-entry">' + nstr + '</span>';
        }
        // Append the numbering element to the document:
        heading.innerHTML = nhtml + html;
        headings.push({
            level,
            text: text.replace('¶', ''),
            numbering: nstr,
            html,
            onClick: onClick(heading)
        });
    }
    return headings;
}
exports.getRenderedHeadings = getRenderedHeadings;
