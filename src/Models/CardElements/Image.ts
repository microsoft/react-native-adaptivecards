import { CardContext } from '../../Contexts/CardContext';
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
        this.horizontalAlignment = json.horizontalAlignment;
        this.size = json.size;
        this.style = json.style;
    }

    public get children() {
        if (this.selectAction) {
            return [this.selectAction];
        } else {
            return [];
        }
    }
}
