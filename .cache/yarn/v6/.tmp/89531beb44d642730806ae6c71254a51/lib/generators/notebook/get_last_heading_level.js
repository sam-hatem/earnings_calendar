"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns the last heading level.
 *
 * @private
 * @param headings - list of notebook headings
 * @returns heading level
 */
function getLastHeadingLevel(headings) {
    if (headings.length > 0) {
        let loc = headings.length - 1;
        while (loc >= 0) {
            if (headings[loc].type === 'header') {
                return headings[loc].level;
            }
            loc -= 1;
        }
    }
    return 0;
}
exports.getLastHeadingLevel = getLastHeadingLevel;
