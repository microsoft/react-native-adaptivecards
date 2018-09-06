import { ConfigManager } from '../Config/ConfigManager';
export class HostContext {
    constructor() {
        this.config = ConfigManager.getInstance().getConfig();
    }
    static getInstance() {
        if (!this.sharedInstance) {
            this.sharedInstance = new HostContext();
        }
        return this.sharedInstance;
    }
    applyConfig(config) {
        if (this.config) {
            this.config = this.config.combine(config);
        }
        else {
            this.config = config;
        }
    }
    getConfig() {
        return this.config;
    }
}
