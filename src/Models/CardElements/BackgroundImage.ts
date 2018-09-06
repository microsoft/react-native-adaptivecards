import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';

export class BackgroundImageModel extends AbstractModel {
    public url: string;
    public mode: 'stretch' | 'repeatHorizontally' | 'repeatVertically' | 'repeat';
    public horizontalAlignment: 'left' | 'center' | 'right';
    public verticalAlignment: 'top' | 'center' | 'bottom';

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        json.type = 'BackgroundImage';
        super(json, parent, context);

        this.url = json.url;
        this.mode = json.mode;
        this.horizontalAlignment = json.horizontalAlignment;
        this.verticalAlignment = json.verticalAlignment;
    }
}
