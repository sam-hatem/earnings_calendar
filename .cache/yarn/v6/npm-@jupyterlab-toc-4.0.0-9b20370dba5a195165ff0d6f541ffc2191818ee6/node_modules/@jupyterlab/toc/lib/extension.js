"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("@jupyterlab/application");
const docmanager_1 = require("@jupyterlab/docmanager");
const fileeditor_1 = require("@jupyterlab/fileeditor");
const markdownviewer_1 = require("@jupyterlab/markdownviewer");
const notebook_1 = require("@jupyterlab/notebook");
const rendermime_1 = require("@jupyterlab/rendermime");
const settingregistry_1 = require("@jupyterlab/settingregistry");
const toc_1 = require("./toc");
const generators_1 = require("./generators");
const registry_1 = require("./registry");
require("../style/index.css");
/**
 * Activates the ToC extension.
 *
 * @private
 * @param app - Jupyter application
 * @param docmanager - document manager
 * @param editorTracker - editor tracker
 * @param labShell - Jupyter lab shell
 * @param restorer - application layout restorer
 * @param markdownViewerTracker - Markdown viewer tracker
 * @param notebookTracker - notebook tracker
 * @param rendermime - rendered MIME registry
 * @returns table of contents registry
 */
function activateTOC(app, docmanager, editorTracker, labShell, restorer, markdownViewerTracker, notebookTracker, rendermime, settingRegistry) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create the ToC widget:
        const toc = new toc_1.TableOfContents({ docmanager, rendermime });
        // Create the ToC registry:
        const registry = new registry_1.TableOfContentsRegistry();
        // Add the ToC to the left area:
        toc.title.iconClass = 'jp-TableOfContents-icon jp-SideBar-tabIcon';
        toc.title.caption = 'Table of Contents';
        toc.id = 'table-of-contents';
        labShell.add(toc, 'left', { rank: 700 });
        // Add the ToC widget to the application restorer:
        restorer.add(toc, '@jupyterlab/toc:plugin');
        // Attempt to load plugin settings:
        let settings;
        try {
            settings = yield settingRegistry.load('@jupyterlab/toc:plugin');
        }
        catch (error) {
            console.error(`Failed to load settings for the Table of Contents extension.\n\n${error}`);
        }
        // Create a notebook generator:
        const notebookGenerator = generators_1.createNotebookGenerator(notebookTracker, toc, rendermime.sanitizer, settings);
        registry.add(notebookGenerator);
        // Create a Markdown generator:
        const markdownGenerator = generators_1.createMarkdownGenerator(editorTracker, toc, rendermime.sanitizer);
        registry.add(markdownGenerator);
        // Create a rendered Markdown generator:
        const renderedMarkdownGenerator = generators_1.createRenderedMarkdownGenerator(markdownViewerTracker, toc, rendermime.sanitizer);
        registry.add(renderedMarkdownGenerator);
        // Create a LaTeX generator:
        const latexGenerator = generators_1.createLatexGenerator(editorTracker);
        registry.add(latexGenerator);
        // Create a Python generator:
        const pythonGenerator = generators_1.createPythonGenerator(editorTracker);
        registry.add(pythonGenerator);
        // Update the ToC when the active widget changes:
        labShell.currentChanged.connect(onConnect);
        return registry;
        /**
         * Callback invoked when the active widget changes.
         *
         * @private
         */
        function onConnect() {
            let widget = app.shell.currentWidget;
            if (!widget) {
                return;
            }
            let generator = registry.find(widget);
            if (!generator) {
                // If the previously used widget is still available, stick with it.
                // Otherwise, set the current ToC widget to null.
                if (toc.current && toc.current.widget.isDisposed) {
                    toc.current = null;
                }
                return;
            }
            toc.current = { widget, generator };
        }
    });
}
/**
 * Initialization data for the ToC extension.
 *
 * @private
 */
const extension = {
    id: '@jupyterlab/toc:plugin',
    autoStart: true,
    provides: registry_1.ITableOfContentsRegistry,
    requires: [
        docmanager_1.IDocumentManager,
        fileeditor_1.IEditorTracker,
        application_1.ILabShell,
        application_1.ILayoutRestorer,
        markdownviewer_1.IMarkdownViewerTracker,
        notebook_1.INotebookTracker,
        rendermime_1.IRenderMimeRegistry,
        settingregistry_1.ISettingRegistry
    ],
    activate: activateTOC
};
/**
 * Exports.
 */
exports.default = extension;
