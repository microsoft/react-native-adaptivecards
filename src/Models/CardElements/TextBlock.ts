import { CardContext } from '../../Contexts/CardContext';
import { StringUtils } from '../../Utils/StringUtils';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ContentModel } from '../Abstract/ContentModel';

export class TextBlockModel extends ContentModel {
    public text: string;
    public color?: 'default' | 'dark' | 'light' | 'accent' | 'good' | 'warning' | 'attention';
    public horizontalAlignment?: 'left' | 'center' | 'right';
    public isSubtle?: boolean;
    public maxLines?: number;
    public size?: 'default' | 'small' | 'medium' | 'large' | 'extralarge';
    public weight?: 'default' | 'lighter' | 'bolder';
    public wrap?: boolean;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.text = json.text;
        this.color = StringUtils.normalize(json.color);
        this.horizontalAlignment = StringUtils.normalize(json.horizontalAlignment);
        this.isSubtle = json.isSubtle || false;
        this.maxLines = json.maxLines;
        this.size = StringUtils.normalize(json.size);
        this.weight = StringUtils.normalize(json.weight);
        this.wrap = json.wrap || false;
    }
}
