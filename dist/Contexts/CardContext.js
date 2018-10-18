import { CardDocument } from './CardDocument';
import { Host } from './Host';
export class CardContext {
    constructor(json) {
        this.document = new CardDocument(json);
        this.host = Host.getInstance();
    }
}
