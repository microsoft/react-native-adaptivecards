import { AbstractAction } from './AbstractAction';
export class PureAction extends AbstractAction {
    constructor(node, payload) {
        super(node);
        this.visible = false;
    }
}
