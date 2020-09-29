"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a code entry notebook heading from a code string.
 *
 * @private
 * @param text - code string
 * @param onClick - callback which returns a "click" handler
 * @param executionCount - execution count
 * @param lastLevel - last heading level
 * @param cellRef - cell reference
 * @returns notebook heading
 */
function getCodeCellHeading(text, onClick, executionCount, lastLevel, cellRef) {
    let headings = [];
    if (text) {
        const lines = text.split('\n');
        const len = Math.min(lines.length, 3);
        let str = '';
        let i = 0;
        for (; i < len - 1; i++) {
            str += lines[i] + '\n';
        }
        str += lines[i];
        headings.push({
            text: str,
            level: lastLevel + 1,
            onClick: onClick(0),
            type: 'code',
            prompt: executionCount,
            cellRef: cellRef,
            hasChild: false
        });
    }
    return headings[0];
}
exports.getCodeCellHeading = getCodeCellHeading;