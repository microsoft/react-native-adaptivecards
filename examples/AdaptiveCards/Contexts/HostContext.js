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
        const parsedConfig = ConfigManager.parseConfig(config);
        if (this.config) {
            this.config = this.config.combine(parsedConfig);
        }
        else {
            this.config = parsedConfig;
        }
    }
    getConfig() {
        return this.config;
    }
}
