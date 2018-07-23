import { ContentElement } from '../Abstract/ContentElement';
import { IElement } from '../Interfaces/IElement';

export class TextBlockElement extends ContentElement {
    // Required
    public readonly text: string;
    // Optional
    public readonly color?: 'default' | 'dark' | 'light' | 'accent' | 'good' | 'warning' | 'attention';
    public readonly horizontalAlignment?: 'left' | 'center' | 'right';
    public readonly isSubtle?: boolean;
    public readonly maxLines?: number;
    public readonly size?: 'default' | 'small' | 'medium' | 'large' | 'extraLarge';
    public readonly weight?: 'default' | 'lighter' | 'bolder';
    public readonly wrap?: boolean;
    public readonly children: IElement[] = [];

    constructor(json: any, parent: IElement) {
        super(json, parent);

        if (this.isValid) {
            this.text = json.text;
            this.color = json.color;
            this.horizontalAlignment = json.horizontalAlignment;
            this.isSubtle = json.isSubtle || false;
            this.maxLines = json.maxLines;
            this.size = json.size;
            this.weight = json.weight;
            this.wrap = json.wrap || false;
        }
    }

    public get requiredProperties() {
        return ['type', 'text'];
    }
}
