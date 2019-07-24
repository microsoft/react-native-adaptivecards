import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ContentModel } from '../Abstract/ContentModel';
export declare class TextBlockModel extends ContentModel {
    text: string;
    color?: 'default' | 'dark' | 'light' | 'accent' | 'good' | 'warning' | 'attention';
    horizontalAlignment?: 'left' | 'center' | 'right';
    isSubtle?: boolean;
    maxLines?: number;
    size?: 'default' | 'small' | 'medium' | 'large' | 'extralarge';
    weight?: 'default' | 'lighter' | 'bolder';
    wrap?: boolean;
    constructor(json: any, parent: AbstractModel, context: CardContext);
}
