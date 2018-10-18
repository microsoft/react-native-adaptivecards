import { ConfigManager } from '../Configs/ConfigManager';
import { HostConfig } from '../Configs/Types';
import { CardDocument } from './CardDocument';
import { CardHost } from './CardHost';

export class CardContext {
    private hostConfig: HostConfig;
    public readonly document: CardDocument;
    public readonly host: CardHost;
    public updateHandler: () => void;
    public refreshViewHandler: () => void;

    constructor(payload: any, config: any) {
        this.document = new CardDocument(payload);
        this.host = new CardHost();
        this.hostConfig = ConfigManager.getInstance().getConfig(config);
    }

    public updateConfig(config: HostConfig) {
        if (this.hostConfig) {
            this.hostConfig = this.config.combine(config);
        } else {
            this.hostConfig = config;
        }
        this.onUpdate();
    }

    public onUpdate() {
        if (this.updateHandler) {
            this.updateHandler();
        }
    }

    public refreshView() {
        if (this.refreshViewHandler) {
            this.refreshViewHandler();
        }
    }

    public get config() {
        return this.hostConfig;
    }

    public get fit() {
        if (this.document && this.document.model) {
            // tslint:disable-next-line:max-line-length
            return this.document.model.descendsAndSelf.find(current => (current as any).backgroundImage !== undefined) ? 'background' : 'content';
        }
        return 'content';
    }
}
