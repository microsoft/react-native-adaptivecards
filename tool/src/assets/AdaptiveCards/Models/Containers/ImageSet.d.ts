import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ContentModel } from '../Abstract/ContentModel';
import { ImageModel } from '../CardElements/Image';
export declare class ImageSetModel extends ContentModel {
    images: ImageModel[];
    imageSize: 'auto' | 'stretch' | 'small' | 'medium' | 'large';
    constructor(json: any, parent: AbstractModel, context: CardContext);
    readonly children: ImageModel[];
}
