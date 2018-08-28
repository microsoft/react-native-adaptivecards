import { ConfigManager } from '../Config/ConfigManager';
import { HostConfig } from '../Config/Types';

export class HostContext {
    private config: HostConfig;

    private static sharedInstance: HostContext;

    private constructor() {
        this.config = ConfigManager.getInstance().getConfig();
    }

    public static getInstance() {
        if (!this.sharedInstance) {
            this.sharedInstance = new HostContext();
        }
        return this.sharedInstance;
    }

    public applyConfig(config: HostConfig) {
        if (this.config) {
            this.config = this.config.combine(config);
        } else {
            this.config = config;
        }
    }

    public getConfig() {
        return this.config;
    }
}
