import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ScopeModel } from '../Abstract/ScopeModel';
export declare class ImageModel extends ScopeModel {
    url: string;
    alt: string;
    horizontalAlignment: 'left' | 'center' | 'right';
    size: 'small' | 'medium' | 'large' | 'auto' | 'stretch';
    style: 'person' | 'default';
    constructor(json: any, parent: AbstractModel, context: CardContext);
    readonly children: (import("../Actions/OpenUrlAction").OpenUrlActionModel | import("../Actions/SubmitAction").SubmitActionModel)[];
}
