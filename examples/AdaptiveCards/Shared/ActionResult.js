import { Info } from './Info';
import { Message } from './Message';
export class ActionResult {
    constructor(message, data) {
        this.message = message;
        this.data = data;
    }
    static get succeed() {
        return new ActionResult(new Message('Action Succeed', 'success'), new Info('Adaptive Renderer', 'Action Succeed'));
    }
}
export class ActionError {
    static get handlerNotFound() {
        return new ActionResult(new Message('Action Failed', 'error'), new Info('Adaptive Renderer', 'Action Handler Not Found'));
    }
}
