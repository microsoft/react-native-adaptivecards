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

    public applyConfig(config: any) {
        const parsedConfig = ConfigManager.parseConfig(config);
        if (this.config) {
            this.config = this.config.combine(parsedConfig);
        } else {
            this.config = parsedConfig;
        }
    }

    public getConfig() {
        return this.config;
    }
}
