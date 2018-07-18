import { HostConfig } from './Types';

export class HostConfigManager {
    private defaultConfig: HostConfig;

    private static sharedInstance: HostConfigManager;

    private constructor() { }

    public static getInstance() {
        if (HostConfigManager.sharedInstance === undefined) {
            HostConfigManager.sharedInstance = new HostConfigManager();
        }
        return HostConfigManager.sharedInstance;
    }

    public static loadConfig() {
        try {
            let rawConfig: any;
            rawConfig = require('./default_config.json');
            return new HostConfig(rawConfig);
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    public static parseConfig(json: any) {
        return new HostConfig(json);
    }

    public getDefaultConfig() {
        if (this.defaultConfig === undefined) {
            this.defaultConfig = HostConfigManager.loadConfig();
        }
        return this.defaultConfig;
    }

    public getConfig(override?: any) {
        let config = this.getDefaultConfig();
        if (config) {
            return config.combine(override);
        }
        return config;
    }
}
