import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from './AbstractModel';

export class ContentModel extends AbstractModel {
    public id: string;
    public spacing: 'none' | 'default' | 'small' | 'medium' | 'large' | 'extraLarge' | 'padding';
    public separator: boolean;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);
        this.id = json.id;
        this.spacing = json.spacing;
        this.separator = json.separator;
    }
}
