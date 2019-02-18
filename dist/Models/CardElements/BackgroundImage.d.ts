import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
export declare class BackgroundImageModel extends AbstractModel {
    type: 'BackgroundImage';
    url: string;
    mode: 'stretch' | 'repeatHorizontally' | 'repeatVertically' | 'repeat';
    horizontalAlignment: 'left' | 'center' | 'right';
    verticalAlignment: 'top' | 'center' | 'bottom';
    constructor(json: any, parent: AbstractModel, context: CardContext);
}
