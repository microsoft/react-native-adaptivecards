import { CardContext } from '../../Contexts/CardContext';
import { StringUtils } from '../../Utils/StringUtils';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ScopeModel } from '../Abstract/ScopeModel';

export class ImageModel extends ScopeModel {
    public url: string;
    public alt: string;
    public horizontalAlignment: 'left' | 'center' | 'right';
    public size: 'small' | 'medium' | 'large' | 'auto' | 'stretch';
    public style: 'person' | 'default';

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.url = json.url;
        this.alt = json.altText;
        this.horizontalAlignment = StringUtils.normalize(json.horizontalAlignment);
        this.size = StringUtils.normalize(json.size);
        this.style = StringUtils.normalize(json.style);
    }

    public get children() {
        if (this.selectAction) {
            return [this.selectAction];
        } else {
            return [];
        }
    }
}
