import { ConfigManager } from '../Configs/ConfigManager';
import { CardDocument } from './CardDocument';
import { CardHost } from './CardHost';
export class CardContext {
    constructor(payload, config) {
        this.document = new CardDocument(payload);
        this.host = new CardHost();
        this.hostConfig = ConfigManager.getInstance().getConfig(config);
    }
    updateConfig(config) {
        if (this.hostConfig) {
            this.hostConfig = this.config.combine(config);
        }
        else {
            this.hostConfig = config;
        }
        this.onUpdate();
    }
    onUpdate() {
        if (this.updateHandler) {
            this.updateHandler();
        }
    }
    refreshView() {
        if (this.refreshViewHandler) {
            this.refreshViewHandler();
        }
    }
    get config() {
        return this.hostConfig;
    }
    get fit() {
        if (this.document && this.document.model) {
            return this.document.model.descendsAndSelf.find(current => current.backgroundImage !== undefined) ? 'background' : 'content';
        }
        return 'content';
    }
}
