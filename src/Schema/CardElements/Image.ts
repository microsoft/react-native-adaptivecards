import { AbstractElement } from '../Base/AbstractElement';
import { FormElement } from '../Base/FormElement';

export class ImageElement extends FormElement {
    // Required
    public readonly url: string;
    // Optional
    public readonly altText?: string;
    public readonly horizontalAlignment?: 'left' | 'center' | 'right';
    public readonly size?: 'small' | 'medium' | 'large' | 'auto' | 'stretch';
    public readonly style?: 'person' | 'default';

    public readonly children: AbstractElement[] = [];

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValid) {
            this.url = json.url;
            this.altText = json.altText;
            this.horizontalAlignment = json.horizontalAlignment;
            this.size = json.size;
            this.style = json.style;
        }
    }

    protected getRequiredProperties(): Array<string> {
        return ['type', 'url'];
    }
}
