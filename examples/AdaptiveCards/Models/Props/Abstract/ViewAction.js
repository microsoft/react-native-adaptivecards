import { AbstractAction } from './AbstractAction';
export class ViewAction extends AbstractAction {
    constructor(node, json) {
        super(node);
        this.visible = true;
        this.title = json.title;
        this.iconUrl = json.iconUrl;
    }
}
