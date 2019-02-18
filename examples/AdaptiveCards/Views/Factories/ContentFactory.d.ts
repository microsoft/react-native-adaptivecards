/// <reference types="react" />
import { ContentModel } from '../../Models/Abstract/ContentModel';
export declare class ContentFactory {
    static createView(model: ContentModel, index: number, theme: 'default' | 'emphasis'): JSX.Element[];
    static createElement(model: ContentModel, index: number, theme: 'default' | 'emphasis'): JSX.Element;
}
