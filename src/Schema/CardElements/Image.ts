import { ScopeElement } from '../Abstract/ScopeElement';
import { IElement } from '../Interfaces/IElement';

export class ImageElement extends ScopeElement {
    // Required
    public readonly url: string;
    // Optional
    public readonly altText?: string;
    public readonly horizontalAlignment?: 'left' | 'center' | 'right';
    public readonly size?: 'small' | 'medium' | 'large' | 'auto' | 'stretch';
    public readonly style?: 'person' | 'default';

    public readonly children: IElement[] = [];

    constructor(json: any, parent: IElement) {
        super(json, parent);

        if (this.isValid) {
            this.url = json.url;
            this.altText = json.altText;
            this.horizontalAlignment = json.horizontalAlignment;
            this.size = json.size;
            this.style = json.style;
        }
    }

    public get requiredProperties() {
        return ['type', 'url'];
    }
}
