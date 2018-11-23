import { AbstractAction } from './AbstractAction';
export class ViewAction extends AbstractAction {
    constructor(node, payload) {
        super(node);
        this.visible = true;
        this.title = payload.title;
        this.iconUrl = payload.iconUrl;
    }
}
