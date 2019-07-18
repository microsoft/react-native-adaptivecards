import { StringUtils } from '../../Utils/StringUtils';
import { AbstractModel } from '../Abstract/AbstractModel';
export class BackgroundImageModel extends AbstractModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.url = json.url;
        this.mode = StringUtils.normalize(json.mode);
        this.horizontalAlignment = StringUtils.normalize(json.horizontalAlignment);
        this.verticalAlignment = StringUtils.normalize(json.verticalAlignment);
    }
}
