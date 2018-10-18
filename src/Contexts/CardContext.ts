import { CardDocument } from './CardDocument';
import { Host } from './Host';

export class CardContext {
    public readonly document: CardDocument;
    public readonly host: Host;
    
    constructor(json: any) { 
        this.document = new CardDocument(json);
        this.host = Host.getInstance();
    }
}
