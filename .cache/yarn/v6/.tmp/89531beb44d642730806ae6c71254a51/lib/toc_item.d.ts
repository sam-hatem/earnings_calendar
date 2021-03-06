import * as React from 'react';
import { IHeading } from './utils/headings';
/**
 * Interface describing component properties.
 *
 * @private
 */
interface IProperties extends React.Props<TOCItem> {
    /**
     * Heading to render.
     */
    heading: IHeading;
    /**
     * Renders a heading.
     *
     * @param item - heading
     * @returns rendered heading
     */
    itemRenderer: (item: IHeading) => JSX.Element | null;
}
/**
 * Interface describing component state.
 *
 * @private
 */
interface IState {
}
/**
 * React component for a table of contents entry.
 *
 * @private
 */
declare class TOCItem extends React.Component<IProperties, IState> {
    /**
     * Renders a table of contents entry.
     *
     * @returns rendered entry
     */
    render(): JSX.Element | null;
}
/**
 * Exports.
 */
export { TOCItem };
