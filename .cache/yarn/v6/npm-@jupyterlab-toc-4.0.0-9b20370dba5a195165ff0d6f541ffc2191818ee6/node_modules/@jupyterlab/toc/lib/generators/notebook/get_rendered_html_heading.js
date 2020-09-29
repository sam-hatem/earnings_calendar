"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const generate_numbering_1 = require("../../utils/generate_numbering");
const sanitizer_options_1 = require("../../utils/sanitizer_options");
/**
 * Returns a notebook heading from an HTML element.
 *
 * @private
 * @param node - HTML element
 * @param onClick - callback which returns a "click" handler
 * @param dict - numbering dictionary
 * @param lastLevel - last level
 * @param numbering - boolean indicating whether to enable numbering
 * @param cellRef - cell reference
 * @returns notebook heading
 */
function getRenderedHTMLHeading(node, onClick, sanitizer, dict, lastLevel, numbering = false, cellRef) {
    let nodes = node.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
    if (nodes.length === 0) {
        return;
    }
    let el = nodes[0];
    if (el.nodeName.toLowerCase() === 'p') {
        if (el.innerHTML) {
            let html = sanitizer.sanitize(el.innerHTML, sanitizer_options_1.sanitizerOptions);
            return {
                level: lastLevel + 1,
                html: html.replace('¶', ''),
                text: el.textContent ? el.textContent : '',
                onClick: onClick(el),
                type: 'markdown',
                cellRef: cellRef,
                hasChild: false
            };
        }
        return;
    }
    if (el.getElementsByClassName('numbering-entry').length > 0) {
        el.removeChild(el.getElementsByClassName('numbering-entry')[0]);
    }
    let html = sanitizer.sanitize(el.innerHTML, sanitizer_options_1.sanitizerOptions);
    html = html.replace('¶', '');
    const level = parseInt(el.tagName[1], 10);
    let nstr = generate_numbering_1.generateNumbering(dict, level);
    let nhtml = '';
    if (numbering) {
        nhtml = '<span class="numbering-entry">' + nstr + '</span>';
    }
    el.innerHTML = nhtml + html;
    return {
        level: level,
        text: el.textContent ? el.textContent : '',
        numbering: nstr,
        html: html,
        onClick: onClick(el),
        type: 'header',
        cellRef: cellRef,
        hasChild: false
    };
}
exports.getRenderedHTMLHeading = getRenderedHTMLHeading;
