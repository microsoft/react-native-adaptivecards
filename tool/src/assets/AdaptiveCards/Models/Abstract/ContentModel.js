import { StringUtils } from '../../Utils/StringUtils';
import { AbstractModel } from './AbstractModel';
export class ContentModel extends AbstractModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.id = json.id;
        this.spacing = StringUtils.normalize(json.spacing);
        this.separator = json.separator;
    }
}
