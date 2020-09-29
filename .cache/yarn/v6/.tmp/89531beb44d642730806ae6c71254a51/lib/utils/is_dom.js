"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns whether a MIME type corresponds to either HTML or virtual DOM.
 *
 * @private
 * @param mime - MIME type string
 * @returns boolean indicating whether a provided MIME type corresponds to either HTML or virtual DOM
 *
 * @example
 * const bool = isDOM('text/html');
 * // returns true
 *
 * @example
 * const bool = isDOM('text/plain');
 * // returns false
 */
function isDOM(mime) {
    return mime === 'application/vdom.v1+json' || mime === 'text/html';
}
exports.isDOM = isDOM;
