import { CardContext } from '../../Contexts/CardContext';
import { StringUtils } from '../../Utils/StringUtils';
import { AbstractModel } from './AbstractModel';

export class ContentModel extends AbstractModel {
    public id: string;
    public spacing: 'none' | 'default' | 'small' | 'medium' | 'large' | 'extralarge' | 'padding';
    public separator: boolean;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);
        this.id = json.id;
        this.spacing = StringUtils.normalize(json.spacing);
        this.separator = json.separator;
    }
}
