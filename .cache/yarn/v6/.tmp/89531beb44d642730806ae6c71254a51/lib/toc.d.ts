import { IDocumentManager } from '@jupyterlab/docmanager';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { Message } from '@lumino/messaging';
import { Widget } from '@lumino/widgets';
import { TableOfContentsRegistry as Registry } from './registry';
/**
 * Widget for hosting a notebook table of contents.
 */
export declare class TableOfContents extends Widget {
    /**
     * Returns a new table of contents.
     *
     * @param options - options
     * @returns widget
     */
    constructor(options: TableOfContents.IOptions);
    /**
     * Current widget-generator tuple for the ToC.
     */
    get current(): TableOfContents.ICurrentWidget | null;
    set current(value: TableOfContents.ICurrentWidget | null);
    /**
     * Current table of contents generator.
     *
     * @returns table of contents generator
     */
    get generator(): Registry.IGenerator<Widget> | null;
    /**
     * Callback invoked upon an update request.
     *
     * @param msg - message
     */
    protected onUpdateRequest(msg: Message): void;
    /**
     * Callback invoked to re-render after showing a table of contents.
     *
     * @param msg - message
     */
    protected onAfterShow(msg: Message): void;
    private _toolbar;
    private _rendermime;
    private _docmanager;
    private _current;
    private _monitor;
}
/**
 * A namespace for TableOfContents statics.
 */
export declare namespace TableOfContents {
    /**
     * Interface describing table of contents widget options.
     */
    interface IOptions {
        /**
         * Application document manager.
         */
        docmanager: IDocumentManager;
        /**
         * Application rendered MIME type.
         */
        rendermime: IRenderMimeRegistry;
    }
    /**
     * Interface describing the current widget.
     */
    interface ICurrentWidget<W extends Widget = Widget> {
        /**
         * Current widget.
         */
        widget: W;
        /**
         * Table of contents generator for the current widget.
         */
        generator: Registry.IGenerator<W>;
    }
}
