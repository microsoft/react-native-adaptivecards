import { AbstractModel } from '../Abstract/AbstractModel';
export class BackgroundImageModel extends AbstractModel {
    constructor(json, parent, context) {
        json.type = 'BackgroundImage';
        super(json, parent, context);
        this.url = json.url;
        this.mode = json.mode;
        this.horizontalAlignment = json.horizontalAlignment;
        this.verticalAlignment = json.verticalAlignment;
    }
}
