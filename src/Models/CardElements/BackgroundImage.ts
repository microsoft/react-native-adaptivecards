import { CardContext } from '../../Contexts/CardContext';
import { StringUtils } from '../../Utils/StringUtils';
import { AbstractModel } from '../Abstract/AbstractModel';

export class BackgroundImageModel extends AbstractModel {
    public type: 'BackgroundImage';
    public url: string;
    public mode: 'stretch' | 'repeatHorizontally' | 'repeatVertically' | 'repeat';
    public horizontalAlignment: 'left' | 'center' | 'right';
    public verticalAlignment: 'top' | 'center' | 'bottom';

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.url = json.url;
        this.mode = StringUtils.toLowerCase(json.mode);
        this.horizontalAlignment = StringUtils.toLowerCase(json.horizontalAlignment);
        this.verticalAlignment = StringUtils.toLowerCase(json.verticalAlignment);
    }
}
