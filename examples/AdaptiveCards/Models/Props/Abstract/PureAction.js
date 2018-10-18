import { AbstractAction } from './AbstractAction';
export class PureAction extends AbstractAction {
    constructor(node) {
        super(node);
        this.visible = false;
    }
}
