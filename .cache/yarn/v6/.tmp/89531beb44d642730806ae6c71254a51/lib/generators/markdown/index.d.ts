import { ISanitizer } from '@jupyterlab/apputils';
import { IDocumentWidget } from '@jupyterlab/docregistry';
import { FileEditor, IEditorTracker } from '@jupyterlab/fileeditor';
import { IMarkdownViewerTracker, MarkdownDocument } from '@jupyterlab/markdownviewer';
import { TableOfContentsRegistry as Registry } from '../../registry';
import { TableOfContents } from '../../toc';
/**
 * Returns a ToC generator for Markdown files.
 *
 * @private
 * @param tracker - file editor tracker
 * @param widget - table of contents widget
 * @param sanitizer - HTML sanitizer
 * @returns ToC generator capable of parsing Markdown files
 */
declare function createMarkdownGenerator(tracker: IEditorTracker, widget: TableOfContents, sanitizer: ISanitizer): Registry.IGenerator<IDocumentWidget<FileEditor>>;
/**
 * Returns a ToC generator for rendered Markdown files.
 *
 * @param tracker - Markdown viewer tracker
 * @param sanitizer - HTML sanitizer
 * @param widget - table of contents widget
 * @returns ToC generator capable of parsing rendered Markdown files
 */
declare function createRenderedMarkdownGenerator(tracker: IMarkdownViewerTracker, widget: TableOfContents, sanitizer: ISanitizer): Registry.IGenerator<MarkdownDocument>;
/**
 * Exports.
 */
export { createMarkdownGenerator };
export { createRenderedMarkdownGenerator };
